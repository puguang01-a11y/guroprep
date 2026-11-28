#!/usr/bin/env node
/* GuroPrep AI helper — drafts the "L — Learning experience" steps of a lesson plan.
   - No dependencies (Node 18+). Listens on 127.0.0.1 only; Nginx forwards /api/ to it.
   - The OpenAI key is read from the environment (systemd EnvironmentFile), never from the repo.
   - Daily limits per visitor and for the whole site keep costs predictable.
   - Teachers' text is sent to OpenAI to make the draft and is not stored here. */
'use strict';
const http = require('http');

const KEY = process.env.OPENAI_API_KEY || '';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const API_URL = process.env.OPENAI_URL || 'https://api.openai.com/v1/chat/completions';
const PORT = +(process.env.PORT || 3001);
const PER_IP = +(process.env.DAILY_LIMIT_PER_IP || 15);
const TOTAL = +(process.env.DAILY_LIMIT_TOTAL || 500);
const TZ_OFFSET_MIN = 8 * 60; // Philippine time (UTC+8) for the daily reset

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
server.listen(PORT, '127.0.0.1', () => console.log(`GuroPrep AI listening on 127.0.0.1:${PORT}, model ${MODEL}, key ${KEY ? 'set' : 'MISSING'}`));
