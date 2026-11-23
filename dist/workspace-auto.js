/* GuroPrep workspace: fills the whole lesson from the selected competency (editable), and shows a formatted view.
   Loaded after the main workspace script; uses its helpers (get, value, grades, selectedGradeOne, …). */
(function () {
  'use strict';
  const AUTO_KEY = 'guroprep-autofill';
  const FIELDS = ['title', 'objective', 'psychomotor', 'affective', 'materials', 'resourcesList', 'assessment', 'next', 'instructions', 'questions', 'answers'];
  let auto = { fields: {}, proc: {} };
  try { auto = Object.assign(auto, JSON.parse(localStorage.getItem(AUTO_KEY) || '{}')); } catch (e) { /* storage unavailable */ }
  const keep = () => { try { localStorage.setItem(AUTO_KEY, JSON.stringify(auto)); } catch (e) { /* ignore */ } };
  const norm = t => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\b\d\b/g, '').replace(/\s+/g, ' ').trim();
  const cap = t => t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
  const sizeBox = el => { if (el && el.tagName === 'TEXTAREA') { el.style.height = 'auto'; el.style.height = Math.min(520, el.scrollHeight + 4) + 'px'; } };

  /* a field counts as "untouched" when it is empty or still holds the last suggestion */
  const untouched = id => { const v = get(id).value.trim(); return !v || v === (auto.fields[id] || '').trim(); };
  const procUntouched = (fmt, i) => { const v = (procedureNotes[fmt] || [])[i] || ''; return !v.trim() || v.trim() === ((auto.proc[fmt] || [])[i] || '').trim(); };
  function hasEdits() {
    if (FIELDS.some(id => !untouched(id))) return true;
    return Object.keys(procedures).some(fmt => (procedureNotes[fmt] || []).some((_, i) => !procUntouched(fmt, i)));
  }

  function defaultDuration() {
    const g = grades.indexOf(value('grade'));
    return g <= 3 ? '40' : g <= 6 ? '45' : g <= 10 ? '50' : '60';
  }

  function context() {
    const row = selectedGradeOne();
    if (!row) return null;
    const area = value('g1area');
    const curriculum = primaryCurriculum()[area];
    const gradeNum = grades.indexOf(value('grade'));
    const termNum = curriculum.schoolScheduled ? 1 : getTermIndex() + 1;
    const index = Number(value('g1competency'));
    let engine = null;
    if (window.GuroEngine && gradeNum >= 1 && gradeNum <= 10) {
      const comp = GuroEngine.find(gradeNum, area, termNum, index);
      if (comp) { GuroEngine.setPlace(''); engine = GuroEngine.build(comp, (Date.now() % 1e9) | 0, 10); }
    }
    let pack = null;
    try { pack = primaryActivities(area).find(p => norm(p.goal) === norm(row.label)) || null; } catch (e) { pack = null; }
    let practice = null;
    try { practice = selectedCompetencyPractice(); } catch (e) { practice = null; }
    const exemplars = (row.exemplars || []).map(id => (curriculum.exemplars || {})[id]).filter(Boolean);
    return {
      grade: gradeNum, subject: area, term: termNum, competency: row.label, approach: procedureFormat(),
      duration: value('ownDuration') || defaultDuration(), engine, pack, practice, exemplars,
      sourceLink: curriculum.source, textbook: value('reference')
    };
  }

  const KIND_NOTE = {
    'own:textbook': 'Use examples and exercises from your school textbook; write the pages above.',
    'own:exemplar': 'Use the DepEd lesson exemplar or activity sheet linked under the competency.',
    'own:slm': 'Use the matching DepEd self-learning module (SLM/ADM) pages for extra practice.',
    'own:teacher': 'Add your own notes, pictures and realia for this lesson.'
  };

  function setField(id, val, force) {
    if (!force && !untouched(id)) return false;
    get(id).value = val; auto.fields[id] = val; sizeBox(get(id)); return true;
  }

  function fill(force) {
    if (value('mode') === 'math') return;
    const ctx = context();
    if (!ctx) return;
    if (force && hasEdits() && !window.confirm('Replace your edits with new suggestions for this competency?')) return;
    const L = GuroLesson.build(ctx);
    const kind = KIND_NOTE[value('mode')];
    if (ctx.engine && ctx.engine.title) get('competency').value = competencyReference(ctx.engine.title);
    setField('title', cap(L.topic), force);
    setField('objective', L.objectives.cognitive, force);
    setField('psychomotor', L.objectives.psychomotor, force);
    setField('affective', L.objectives.affective, force);
    setField('materials', L.materials, force);
    setField('resourcesList', (kind ? [kind] : []).concat(L.resources.filter(r => !/^Materials:/.test(r))).join('\n'), force);
    setField('assessment', L.assessment, force);
    setField('next', L.next, force);
    setField('instructions', L.instructions, force);
    setField('questions', L.sheet, force);
    setField('answers', L.key, force);
    /* procedures for every teaching approach, so switching approach keeps a full plan */
    for (const fmt of Object.keys(procedures)) {
      const built = fmt === ctx.approach ? L : GuroLesson.build(Object.assign({}, ctx, { approach: fmt }));
      const texts = built.procedures.map(p => p.text);
      procedureNotes[fmt] = procedureNotes[fmt] || [];
      auto.proc[fmt] = auto.proc[fmt] || [];
      texts.forEach((t, i) => { if (force || procUntouched(fmt, i)) { procedureNotes[fmt][i] = t; auto.proc[fmt][i] = t; } });
    }
    keep();
    renderProcedures();
    sizeAll();
    const msg = L.note || (ctx.engine && ctx.engine.ready ? 'Lesson filled in with ready activities for this competency. Review, edit if needed, then press Prepare materials.' : 'Lesson filled in from the competency. Review, edit if needed, then press Prepare materials.');
    get('g1status').textContent = msg;
    save();
  }

  function sizeAll() { document.querySelectorAll('#settings textarea').forEach(sizeBox); }

  /* events */
  const prevComp = get('g1competency').onchange;
  get('g1competency').onchange = () => { if (prevComp) prevComp(); if (hasEdits() && value('title') && !window.confirm('Fill in the lesson for the new competency? Your edits in the lesson fields will be replaced.')) return; fill(true); };
  get('refill').onclick = () => fill(true);
  get('ownDuration').addEventListener('change', () => fillProcsOnly());
  function fillProcsOnly() {
    const ctx = context(); if (!ctx) return;
    for (const fmt of Object.keys(procedures)) {
      const built = GuroLesson.build(Object.assign({}, ctx, { approach: fmt }));
      procedureNotes[fmt] = procedureNotes[fmt] || [];
      built.procedures.forEach((p, i) => {
        const cur = procedureNotes[fmt][i] || '';
        if (!cur.trim()) procedureNotes[fmt][i] = p.text; else if (/^\(\d+ min\)/.test(cur)) procedureNotes[fmt][i] = cur.replace(/^\(\d+ min\)/, `(${p.minutes} min)`);
        if (auto.proc[fmt] && auto.proc[fmt][i] && /^\(\d+ min\)/.test(auto.proc[fmt][i])) auto.proc[fmt][i] = auto.proc[fmt][i].replace(/^\(\d+ min\)/, `(${p.minutes} min)`);
      });
    }
    keep(); renderProcedures(); sizeAll(); save();
  }
  get('grade').addEventListener('change', () => { get('ownDuration').value = defaultDuration(); });
  get('method').addEventListener('change', () => { renderProcedures(); sizeAll(); });
  document.getElementById('procedureFields').addEventListener('input', e => sizeBox(e.target));
  get('settings').addEventListener('input', e => sizeBox(e.target));

  /* procedure boxes: taller so the full step is readable */
  const baseRender = renderProcedures;
  window.renderProcedures = renderProcedures = function () { baseRender(); document.querySelectorAll('#procedureFields textarea').forEach(t => { t.rows = 4; sizeBox(t); }); };

  /* ---------- formatted view ---------- */
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const LABEL = /^(Cognitive|Psychomotor|Affective \/ values|Topic|Learning competency|Oral questions|Mga tanong na pasalita|Formative checks during class|Formative check habang nagkaklase|Exit ticket[^:]*|Written task|Nakasulat na gawain|Performance task|Rubric[^:]*|Success criteria|Pamantayan ng tagumpay|Reteaching|Remediation|Enrichment|Assignment|Takdang-aralin|Materials|Textbook or module|Answer|Sagot|Key idea to remember|Worked example|Halimbawa)(:)/;
  function formatted(text) {
    const lines = String(text || '').split(/\r?\n/);
    const out = []; let list = null;
    const close = () => { if (list) { out.push('</ul>'); list = null; } };
    lines.forEach((raw, i) => {
      const line = raw.replace(/\s+$/, ''); const t = line.trim();
      if (!t) { close(); return; }
      if (i === 0) { out.push(`<div class="fv-eyebrow">${esc(t)}</div>`); return; }
      if (i === 1) { out.push(`<h2 class="fv-title">${esc(t)}</h2>`); return; }
      let m;
      if ((m = t.match(/^([ILAW])\.\s+([A-Z][A-Z ]+)$/))) { close(); out.push(`<h3 class="fv-sec fv-${m[1]}"><span>${m[1]}</span>${esc(m[2])}</h3>`); return; }
      if ((m = t.match(/^■\s+(.*?)(\s+\((\d+) min\))?$/))) { close(); out.push(`<h4 class="fv-phase">${esc(m[1])}${m[3] ? `<em>${m[3]} min</em>` : ''}</h4>`); return; }
      if (/^(Objectives|Content|Learning resources|Procedures\b.*)$/.test(t)) { close(); out.push(`<h4 class="fv-sub">${esc(t)}</h4>`); return; }
      if (/^[A-Z0-9][A-Z0-9 ·:'’\-–()]+$/.test(t) && t.length > 3 && /[A-Z]{3}/.test(t)) { close(); out.push(`<h4 class="fv-act">${esc(t)}</h4>`); return; }
      if (/^_{5,}$/.test(t)) { out.push('<div class="fv-line"></div>'); return; }
      if ((m = t.match(/^[•–-]\s+(.*)$/))) { const nested = /^\s{2,}/.test(line); if (!list) { out.push('<ul>'); list = true; } out.push(`<li${nested ? ' class="fv-n"' : ''}>${lab(m[1])}</li>`); return; }
      if (/^\s{2,}\d+\.\s/.test(line)) { if (!list) { out.push('<ul>'); list = true; } out.push(`<li class="fv-n fv-num">${lab(t)}</li>`); return; }
      close();
      if ((m = t.match(/^(\d+)\.\s+(.*)$/))) { out.push(`<p class="fv-item"><b>${m[1]}.</b> ${lab(m[2])}</p>`); return; }
      out.push(`<p>${lab(t)}</p>`);
    });
    close();
    return out.join('');
  }
  const link = h => h.replace(/https?:\/\/[^\s<]+/g, u => `<a href="${u}" target="_blank" rel="noopener">open link</a>`);
  function lab(t) { const m = t.match(LABEL); return link(m ? `<b>${esc(m[1])}:</b>${esc(t.slice(m[0].length))}` : esc(t).replace(/(_{5,})/g, '<span class="fv-blank">$1</span>')); }

  const editor = get('editor');
  const bar = document.createElement('div'); bar.className = 'fv-bar';
  bar.innerHTML = '<button type="button" id="viewFormatted" aria-pressed="true">Formatted view</button><button type="button" id="viewEdit" aria-pressed="false">Edit text</button>';
  const view = document.createElement('div'); view.id = 'formattedView'; view.className = 'fv'; view.setAttribute('aria-live', 'polite');
  editor.before(bar, view);
  let mode = 'view';
  function paint() {
    const text = editor.value;
    view.innerHTML = text.trim() ? formatted(text) : '<p class="fv-empty">Choose a grade, learning area and competency. GuroPrep fills in the lesson; press <b>Prepare materials</b> to see it here.</p>';
    view.hidden = mode !== 'view'; editor.hidden = mode === 'view';
    get('viewFormatted').setAttribute('aria-pressed', String(mode === 'view')); get('viewEdit').setAttribute('aria-pressed', String(mode !== 'view'));
  }
  get('viewFormatted').onclick = () => { mode = 'view'; paint(); };
  get('viewEdit').onclick = () => { mode = 'edit'; paint(); editor.focus(); };
  view.ondblclick = () => { mode = 'edit'; paint(); editor.focus(); };
  editor.addEventListener('input', () => { if (mode === 'view') paint(); });
  const baseShow = show;
  window.show = show = function (tab, focus) { baseShow(tab, focus); paint(); };
  const baseBrowserPrint = get('browserPrint').onclick;
  get('browserPrint').onclick = () => { const p = get('print'); p.innerHTML = formatted(draft[current]); p.classList.add('fv'); window.print(); };
  void baseBrowserPrint;

  /* first paint and sizing */
  if (!value('ownDuration')) get('ownDuration').value = defaultDuration();
  renderProcedures();
  sizeAll();
  paint();
  window.GuroWorkspace = { fill, formatted };
})();
