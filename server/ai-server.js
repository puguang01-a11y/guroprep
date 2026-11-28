#!/usr/bin/env node
/* GuroPrep server helper:
   1) AI drafts of the "L — Learning experience" steps of a lesson plan (/api/ai/...)
   2) Privacy-friendly usage statistics (/api/stats/event) — no cookies, no raw IPs stored
   3) Move Up Academy teacher applications (/api/apply)
   4) Admin summary and CSV export, protected by ADMIN_KEY (/api/admin/...)
   - No dependencies (Node 18+). Listens on 127.0.0.1 only; Nginx forwards /api/ to it.
   - The OpenAI key is read from the environment (systemd EnvironmentFile), never from the repo.
   - Daily limits per visitor and for the whole site keep costs predictable.
   - Teachers' text is sent to OpenAI to make the draft and is not stored here. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const KEY = process.env.OPENAI_API_KEY || '';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const API_URL = process.env.OPENAI_URL || 'https://api.openai.com/v1/chat/completions';
const PORT = +(process.env.PORT || 3001);
const PER_IP = +(process.env.DAILY_LIMIT_PER_IP || 15);
const TOTAL = +(process.env.DAILY_LIMIT_TOTAL || 500);
const TZ_OFFSET_MIN = 8 * 60; // Philippine time (UTC+8) for the daily reset
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const STATE = process.env.STATE_DIRECTORY || process.env.GUROPREP_STATE || '/var/lib/guroprep';

let day = '', used = 0, byIp = new Map();
function today() { return new Date(Date.now() + TZ_OFFSET_MIN * 60000).toISOString().slice(0, 10); }
function roll() { const d = today(); if (d !== day) { day = d; used = 0; byIp = new Map(); } }
function left(ip) { roll(); return Math.max(0, Math.min(PER_IP - (byIp.get(ip) || 0), TOTAL - used)); }

function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': Buffer.byteLength(body)});
  res.end(body);
}
const str = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, max);
const lines = (v, max) => String(v == null ? '' : v).replace(/\r/g, '').replace(/[\u0000-\u0009\u000b-\u001f]+/g, ' ').replace(/\n{2,}/g, '\n').trim().slice(0, max);

function buildPrompt(b) {
  const phases = b.phases.map((p, i) => `${i + 1}. ${p.name} (${p.min} min)`).join('\n');
  const system = [
    'You are an experienced Filipino public school teacher and DepEd lesson-plan writer.',
    'You write the "Learning experience" (procedures) part of a lesson plan that a busy teacher can use tomorrow.',
    'Rules:',
    '- Follow the DepEd curriculum (MATATAG / K to 12) and the given learning competency exactly.',
    '- Write one step for each phase, in the same order, and fit the minutes given.',
    '- Each step: what the teacher says or does, what learners do, and at least one sample question with the expected answer. 60–140 words per step.',
    '- Assume a large class (40+ learners), no internet and few devices: use the chalkboard, manila paper, cut-outs, pairs and small groups.',
    '- Use simple, clear English. Use Filipino places, names, foods and situations; prefer the given local context.',
    '- If a reading text title is given, use that text (it is printed on the worksheet). Do not invent a different text.',
    '- Keep it consistent with the worksheet: the guided and independent practice should prepare learners for it.',
    '- Do not use real learners\' names. Do not mention AI.',
    'Reply with JSON only: {"materials": string, "steps": [string, ...], "key_question": string}. "steps" must have exactly as many items as there are phases.'
  ].join('\n');
  const user = [
    `Grade: ${b.grade}`, `Subject: ${b.subject}`, b.term ? `Term/Quarter: ${b.term}` : '',
    `Learning competency: ${b.competency}`,
    b.objectives ? `Objectives:\n${b.objectives}` : '',
    `Lesson approach: ${b.approach}`, `Phases:\n${phases}`,
    b.local ? `Local context: ${b.local}` : '',
    b.text ? `Reading text on the worksheet: ${b.text}` : '',
    b.sample ? `Sample worksheet item: ${b.sample}` : '',
    b.idea ? `The teacher's own idea or request (follow it if it fits the competency): ${b.idea}` : ''
  ].filter(Boolean).join('\n');
  return {system, user};
}

async function draft(b) {
  const {system, user} = buildPrompt(b);
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 60000);
  try {
    const r = await fetch(API_URL, {
      method: 'POST', signal: ctl.signal,
      headers: {'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({model: MODEL, temperature: 0.7, max_tokens: 1800, response_format: {type: 'json_object'},
        messages: [{role: 'system', content: system}, {role: 'user', content: user}]})
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error('upstream'); e.detail = (j.error && j.error.message) || ('HTTP ' + r.status); throw e; }
    const out = JSON.parse(j.choices[0].message.content);
    const steps = Array.isArray(out.steps) ? out.steps.map(s => str(s, 1500)) : [];
    if (steps.length !== b.phases.length || steps.some(s => !s)) throw Object.assign(new Error('format'), {detail: 'Unexpected answer format'});
    return {materials: str(out.materials, 400), steps, key_question: str(out.key_question, 300), model: MODEL};
  } finally { clearTimeout(timer); }
}


/* ---------------- Usage statistics ---------------- */
// Stored per Philippine day: page views, events, grade/subject counts and short visitor hashes.
// Hashes use a secret salt that changes every week, so visitors cannot be followed across weeks.
const STATS_FILE = path.join(STATE, 'stats.json');
const APPS_FILE = path.join(STATE, 'applications.jsonl');
let stats = {secret: '', days: {}};
try { stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8')); } catch (e) {}
if (!stats.secret) stats.secret = crypto.randomBytes(24).toString('hex');
if (!stats.days) stats.days = {};
let dirty = true;
function saveStats() {
  if (!dirty) return;
  try {
    const keep = Object.keys(stats.days).sort().slice(-120);
    const days = {}; for (const d of keep) days[d] = stats.days[d];
    stats.days = days;
    fs.mkdirSync(STATE, {recursive: true});
    fs.writeFileSync(STATS_FILE + '.tmp', JSON.stringify(stats));
    fs.renameSync(STATS_FILE + '.tmp', STATS_FILE);
    dirty = false;
  } catch (e) { console.error('stats save failed', e.message); }
}
setInterval(saveStats, 60000).unref();
for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => { dirty = true; saveStats(); process.exit(0); });

function isoWeek(dstr) {
  const d = new Date(dstr + 'T00:00:00Z'); const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3); const y = d.getUTCFullYear();
  const w1 = new Date(Date.UTC(y, 0, 4)); return `${y}-W${String(1 + Math.round(((d - w1) / 864e5 - 3 + ((w1.getUTCDay() + 6) % 7)) / 7)).padStart(2, '0')}`;
}
function visitorHash(ip, ua, d) {
  return crypto.createHash('sha256').update(stats.secret + '|' + isoWeek(d) + '|' + ip + '|' + ua).digest('hex').slice(0, 12);
}
function dayRec(d) {
  return stats.days[d] || (stats.days[d] = {views: {}, events: {}, subjects: {}, visitors: [], active: []});
}
const evByIp = new Map(); let evDay = '';
const PAGES = new Set(['home', 'classroom-tools', 'about', 'careers', 'teacher-originals', 'admin']);
const EVENTS = new Set(['lesson_prepared', 'download', 'ai_draft', 'weekly_pack', 'workspace_prepare', 'apply_click', 'apply_submit']);
function recordEvent(ip, ua, b) {
  const d = today(); if (d !== evDay) { evDay = d; evByIp.clear(); }
  const n = (evByIp.get(ip) || 0) + 1; evByIp.set(ip, n); if (n > 400) return;
  const rec = dayRec(d); const h = visitorHash(ip, ua, d);
  const type = str(b.type, 30);
  if (type === 'view') {
    const page = str(b.page, 30); if (!PAGES.has(page)) return;
    rec.views[page] = (rec.views[page] || 0) + 1;
    if (!rec.visitors.includes(h)) rec.visitors.push(h);
  } else if (EVENTS.has(type)) {
    const key = type === 'download' ? 'download:' + str(b.detail, 20) : type;
    rec.events[key] = (rec.events[key] || 0) + 1;
    if (type === 'lesson_prepared' || type === 'workspace_prepare' || type === 'ai_draft' || type === 'download') {
      if (!rec.active.includes(h)) rec.active.push(h);
      if (!rec.visitors.includes(h)) rec.visitors.push(h);
    }
    if (type === 'lesson_prepared' || type === 'workspace_prepare') {
      const gs = `Grade ${str(b.grade, 6)} · ${str(b.subject, 40)}`; rec.subjects[gs] = (rec.subjects[gs] || 0) + 1;
    }
  } else return;
  dirty = true;
}
function summary() {
  const days = Object.keys(stats.days).sort();
  const last = days.slice(-30).reverse().map(d => {
    const r = stats.days[d], e = r.events, sum = o => Object.values(o).reduce((a, b) => a + b, 0);
    const downloads = Object.entries(e).filter(([k]) => k.startsWith('download:')).reduce((a, [, v]) => a + v, 0);
    return {day: d, views: sum(r.views), visitors: r.visitors.length, activeTeachers: r.active.length,
      lessons: (e.lesson_prepared || 0) + (e.workspace_prepare || 0), aiDrafts: e.ai_draft || 0, downloads,
      weeklyPacks: e.weekly_pack || 0, applyClicks: e.apply_click || 0, applications: e.apply_submit || 0};
  });
  const weeks = {};
  for (const d of days) {
    const w = isoWeek(d); const r = stats.days[d];
    weeks[w] = weeks[w] || {visitors: new Set(), active: new Set(), lessons: 0, applications: 0};
    r.visitors.forEach(h => weeks[w].visitors.add(h)); r.active.forEach(h => weeks[w].active.add(h));
    weeks[w].lessons += (r.events.lesson_prepared || 0) + (r.events.workspace_prepare || 0);
    weeks[w].applications += r.events.apply_submit || 0;
  }
  const weekly = Object.keys(weeks).sort().slice(-12).reverse().map(w => ({week: w, visitors: weeks[w].visitors.size, activeTeachers: weeks[w].active.size, lessons: weeks[w].lessons, applications: weeks[w].applications}));
  const subj = {};
  for (const d of days.slice(-30)) for (const [k, v] of Object.entries(stats.days[d].subjects)) subj[k] = (subj[k] || 0) + v;
  const topSubjects = Object.entries(subj).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([name, lessons]) => ({name, lessons}));
  const pages = {};
  for (const d of days.slice(-30)) for (const [k, v] of Object.entries(stats.days[d].views)) pages[k] = (pages[k] || 0) + v;
  return {generated: new Date().toISOString(), days: last, weekly, topSubjects, pages30: pages, applicationsTotal: readApps().length};
}

/* ---------------- Teacher applications ---------------- */
const APPLY_FIELDS = {
  name: 100, email: 120, mobile: 30, location: 100, currentWork: 60, school: 120, subjects: 120, yearsTeaching: 10,
  onlineExperience: 20, onlineYears: 10, availability: 200, internet: 60, equipment: 120, facebook: 120, about: 1200
};
const applyByIp = new Map(); let applyDay = '';
function readApps() {
  try { return fs.readFileSync(APPS_FILE, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)); } catch (e) { return []; }
}
function csvCell(v) { let t = String(v == null ? '' : v); if (/^[=+\-@]/.test(t)) t = "'" + t; return '"' + t.replace(/"/g, '""') + '"'; }
function appsCsv() {
  const cols = ['submitted', ...Object.keys(APPLY_FIELDS), 'consent'];
  return '﻿' + [cols.join(','), ...readApps().map(a => cols.map(c => csvCell(a[c])).join(','))].join('\r\n');
}
function adminOk(req) {
  const k = String(req.headers['x-admin-key'] || '');
  if (!ADMIN_KEY || k.length !== ADMIN_KEY.length) return false;
  return crypto.timingSafeEqual(Buffer.from(k), Buffer.from(ADMIN_KEY));
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { reject(Object.assign(new Error('too large'), {code: 413})); req.destroy(); } else chunks.push(c); });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const ip = String(req.headers['x-real-ip'] || req.socket.remoteAddress || '');
  const url = (req.url || '').split('?')[0];
  let counted = false;
  try {
    if (req.method === 'GET' && url === '/api/ai/status') return send(res, 200, {enabled: !!KEY, remaining: KEY ? left(ip) : 0});
    const ua = String(req.headers['user-agent'] || '').slice(0, 200);
    if (req.method === 'POST' && url === '/api/stats/event') {
      try { recordEvent(ip, ua, JSON.parse(await readBody(req, 2000))); } catch (e) {}
      res.writeHead(204); return res.end();
    }
    if (req.method === 'POST' && url === '/api/apply') {
      let b; try { b = JSON.parse(await readBody(req, 8000)); } catch (e) { return send(res, 400, {error: 'Bad request'}); }
      if (b.website) return send(res, 200, {ok: true}); // spam trap
      const d = today(); if (d !== applyDay) { applyDay = d; applyByIp.clear(); }
      if ((applyByIp.get(ip) || 0) >= 3) return send(res, 429, {error: 'Too many applications from this connection today. Please try again tomorrow.'});
      const a = {submitted: new Date().toISOString()};
      for (const [k, max] of Object.entries(APPLY_FIELDS)) a[k] = k === 'about' ? lines(b[k], max) : str(b[k], max);
      a.consent = b.consent === true ? 'yes' : '';
      if (!a.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.email) || !/^[+0-9 ()-]{7,20}$/.test(a.mobile) || !a.location || !a.consent)
        return send(res, 400, {error: 'Please fill in your name, a valid email, mobile number and location, and tick the consent box.'});
      fs.mkdirSync(STATE, {recursive: true});
      fs.appendFileSync(APPS_FILE, JSON.stringify(a) + '\n', {mode: 0o600});
      applyByIp.set(ip, (applyByIp.get(ip) || 0) + 1);
      recordEvent(ip, ua, {type: 'apply_submit'});
      console.log(`${a.submitted} application received`);
      return send(res, 200, {ok: true});
    }
    if (url.startsWith('/api/admin/')) {
      if (!adminOk(req)) return send(res, 401, {error: 'Wrong admin key'});
      if (req.method === 'GET' && url === '/api/admin/summary') { saveStats(); return send(res, 200, summary()); }
      if (req.method === 'GET' && url === '/api/admin/applications') return send(res, 200, {applications: readApps().reverse()});
      if (req.method === 'GET' && url === '/api/admin/applications.csv') {
        const body = appsCsv();
        res.writeHead(200, {'Content-Type': 'text/csv; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Disposition': 'attachment; filename="move-up-teacher-applications.csv"'});
        return res.end(body);
      }
      return send(res, 404, {error: 'Not found'});
    }
    if (req.method !== 'POST' || url !== '/api/ai/lesson-steps') return send(res, 404, {error: 'Not found'});
    if (!KEY) return send(res, 503, {error: 'AI is not set up on this server yet.'});
    if (left(ip) <= 0) return send(res, 429, {error: used >= TOTAL ? 'GuroPrep has reached today\'s AI limit. Please try again tomorrow.' : `You have used today's ${PER_IP} AI drafts. Please try again tomorrow.`, remaining: 0});
    let b;
    try { b = JSON.parse(await readBody(req, 16000)); } catch (e) { return send(res, e.code === 413 ? 413 : 400, {error: 'Bad request'}); }
    const phases = Array.isArray(b.phases) ? b.phases.slice(0, 8).map(p => ({name: str(p && p.name, 60), min: Math.max(1, Math.min(120, +(p && p.min) || 5))})).filter(p => p.name) : [];
    const clean = {
      grade: str(b.grade, 20), subject: str(b.subject, 60), term: str(b.term, 20), competency: str(b.competency, 600),
      objectives: lines(b.objectives, 600), approach: str(b.approach, 40) || 'explicit', phases, local: str(b.local, 80),
      text: str(b.text, 120), sample: str(b.sample, 400), idea: str(b.idea, 500)
    };
    if (!clean.grade || !clean.subject || !clean.competency || !phases.length) return send(res, 400, {error: 'Choose a competency first.'});
    roll(); used++; byIp.set(ip, (byIp.get(ip) || 0) + 1); counted = true;
    const out = await draft(clean);
    console.log(`${new Date().toISOString()} ok ${clean.grade}/${clean.subject} used=${used}`);
    send(res, 200, Object.assign(out, {remaining: left(ip)}));
  } catch (e) {
    if (counted) { used = Math.max(0, used - 1); byIp.set(ip, Math.max(0, (byIp.get(ip) || 1) - 1)); } // failed drafts don't count
    console.error(`${new Date().toISOString()} error ${e.message} ${e.detail || ''}`);
    send(res, 502, {error: 'The AI draft could not be made right now. Please try again in a minute.'});
  }
});
server.listen(PORT, '127.0.0.1', () => console.log(`GuroPrep helper listening on 127.0.0.1:${PORT}, model ${MODEL}, AI key ${KEY ? 'set' : 'MISSING'}, admin key ${ADMIN_KEY ? 'set' : 'MISSING'}, data in ${STATE}`));
