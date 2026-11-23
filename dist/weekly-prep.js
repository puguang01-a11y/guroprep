(() => {
  const key = 'guroprep.weekly.v1';
  let officeLoader;
  function loadOffice() {
    if (window.GuroOffice) return Promise.resolve();
    if (!officeLoader) officeLoader = new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src='./office-export.js';
      script.onload=()=>window.GuroOffice?resolve():reject(Error('Office exporter did not initialize.'));
      script.onerror=()=>reject(Error('Office exporter could not load. Check that office-export.js was deployed.'));
      document.head.appendChild(script);
    });
    return officeLoader;
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const phases = ['Introduce and model', 'Guided practice', 'Apply with support', 'Independent practice', 'Check and reteach'];
  const defaults = [
    'Start with a short recall prompt. Model the example slowly and ask learners to explain one step.',
    'Review the model. Work one new item together, then ask partners to explain their choices.',
    'Apply the skill in a classroom example. Provide a worked step or sentence starter where needed.',
    'Let learners attempt the practice independently, then compare reasoning in pairs.',
    'Use the exit ticket or rubric to check the goal. Group learners for follow-up using their responses.'
  ];
  const node = (tag, content) => {
    const el = document.createElement(tag);
    if (content !== undefined) el.textContent = content;
    return el;
  };
  const get = id => document.getElementById(id);
  const option = (value, text) => new Option(text, value);
  let entries = {};
  let active = null;
  let fields = [];
  let pack = [];

  function status(text) {
    get('weeklyStatus').textContent = text;
  }
  function readStore() {
    try { return JSON.parse(window.localStorage.getItem(key)) || {}; }
    catch { return {}; }
  }
  function persist() {
    if (!active) return;
    entries[active].pack = pack;
    try {
      const saved = readStore();
      saved[active] = entries[active];
      window.localStorage.setItem(key, JSON.stringify(saved));
    } catch {
      status('Browser storage is unavailable or full. Download the pack before leaving.');
    }
  }
  function updateSavedList() {
    const saved = get('weeklySaved');
    saved.replaceChildren(option('', 'New week'));
    Object.entries(entries).reverse().forEach(([id, entry]) => {
      saved.add(option(id, `${entry.date} · Grade ${entry.settings.grade} ${entry.settings.subject} · Term ${entry.settings.term}${entry.section ? ' · '+entry.section : ''}`));
    });
    saved.value = active || '';
  }
  function makeRows(rows = []) {
    const targets = listFor(S);
    fields = days.map((day, index) => {
      const row = node('fieldset');
      row.append(node('legend', day));
      const scheduled = node('input');
      scheduled.type = 'checkbox';
      scheduled.checked = rows[index]?.scheduled ?? false;
      const slot = node('label','Class meets');
      slot.className = 'weekly-meets';
      slot.prepend(scheduled);
      row.append(slot);
      const minutes = node('input');
      minutes.type = 'number';
      minutes.min = '1';
      minutes.max = '240';
      minutes.value = rows[index]?.minutes || S.duration;
      minutes.required = true;
      const target = node('select');
      target.add(option('', 'No lesson'));
      targets.forEach(c => target.add(option(c.id, (c.w && /^[0-9]/.test(c.w) ? 'Week '+c.w+' · ' : '')+c.title)));
      target.add(option('custom', 'Use my own competency'));
      const custom = node('input');
      custom.type = 'text';
      const focus = node('input');
      focus.type = 'text';
      const mode = node('select');
      ['F', 'C', 'E'].forEach(l => mode.add(option(l, LEVELS[l])));
      const labels = [[minutes, 'Class minutes'], [target, 'Learning competency'], [custom, 'Your competency'], [focus, 'Daily objective or focus'], [mode, 'Practice level']];
      const customLabel = labels.map(([control, title]) => {
        const label = node('label', title);
        label.append(control);
        row.append(label);
        return label;
      })[2];
      const saved = rows[index] || {};
      target.value = saved.id || '';
      custom.value = saved.custom || '';
      focus.value = saved.focus || '';
      mode.value = saved.level || 'C';
      const toggle = () => {
        for (const [control] of labels) control.disabled = !scheduled.checked;
        customLabel.hidden = !scheduled.checked || target.value !== 'custom';
      };
      scheduled.onchange = toggle;
      target.onchange = toggle;
      toggle();
      return {row, target, custom, focus, mode, scheduled, minutes};
    });
    get('weeklyDays').replaceChildren(...fields.map(f => f.row));
  }
  function readRows() {
    return fields.map(({target,custom,focus,mode,scheduled,minutes}) => ({
      scheduled:scheduled.checked, minutes:Number(minutes.value),
      id:target.value, custom:custom.value.trim(), focus:focus.value.trim(), level:mode.value
    }));
  }
  function capture() {
    return Object.fromEntries(['grade','subject','subjectOther','term','duration','nq','approach','lang','place','week','curOverride','paper'].map(k => [k,S[k]]));
  }
  function phaseFor(index,total) {
    if (total===1) return -1;
    return Math.round(index*(phases.length-1)/(total-1));
  }
  function suggest() {
    const targets = listFor(S);
    const selected = compById(S.compId);
    const chosenWeek = Number(String(S.week).match(/\d+/)?.[0]) || Number(String(selected?.w || '').match(/^\d+/)?.[0]);
    const sameWeek = chosenWeek ? targets.filter(c => weekHas(c.w,chosenWeek)) : [];
    const current = sameWeek.length ? sameWeek : selected && targets.includes(selected) ? [selected] : targets.slice(0,1);
    if (!current.length && !S.customComp.trim()) {
      status('Choose a competency in the lesson form or enter a custom competency for each day.');
      return;
    }
    const rows = readRows();
    const count = rows.filter(row => row.scheduled).length;
    if (!count) {
      status('Mark the days when this class actually meets.');
      return;
    }
    let index = 0;
    const sameTarget = current.length <= 1;
    makeRows(rows.map(row => {
      if (!row.scheduled) return row;
      const session = index++;
      const phase = phaseFor(session,count);
      return {...row,
        id:current[Math.floor(session*current.length/count)]?.id || 'custom',
        custom:S.customComp,
        focus:sameTarget ? (phases[phase] || 'Model, practise and check understanding') : '',
        level:row.level
      };
    }));
    status('Suggested '+count+' sessions. Review the daily objectives and add any other targets your class needs this week.');
  }
  function material(lesson, level, focus) {
    const original = S.lesson;
    const originalPlace = CTX.place;
    try {
      S.lesson = lesson;
      CTX.place = lesson.place ?? S.place;
      const w = wsData(level);
      const r = rubricOf(lesson);
      const exit = exitLines().filter(line => !line.startsWith('['));
      return {
        teacher:[
          lesson.title,'Daily focus: '+focus,
          ...planBlocks().map(b => b.x),
          ...(exit.length ? ['Exit ticket', ...exit] : []),
          'Answer key / scoring guidance',
          ...(r ? [r.title,RUBNOTE,...r.rows] : []),
          ...keyData().filter(block=>block.lvl===level || block.lvl==='X').flatMap(block=>[LEVELS[block.lvl],...block.rows.map(item=>item.n+'. '+item.a)])
        ].join('\n'),
        student:[
          'Name: ____________________   Date: __________',
          w.title, w.instr, w.key,
          ...(w.passage ? [w.passage.title,w.passage.text] : []),
          ...w.items.map((item,j) => `${j+1}. ${item.q}${item.nl ? '\n'+item.nl.lo+' ─────────────── '+item.nl.hi : ''}${item.noLine ? '' : '\n   _________________________________________'}`),
          ...(exit.length ? ['Exit ticket',...exit] : []),
          ...(!w.items.length ? ['Add practice questions for this competency in the single-lesson editor.'] : [])
        ].filter(Boolean).join('\n'),
        ready:w.items.length>0 || !!r
      };
    } finally { S.lesson = original; CTX.place = originalPlace; }
  }
  function generate(event) {
    event.preventDefault();
    const rows = readRows();
    const scheduled = rows.filter(row => row.scheduled);
    if (!scheduled.length || scheduled.some(row => !row.id || (row.id === 'custom' && !row.custom))) {
      status('Choose a competency for every class meeting and fill in any custom competency.');
      return;
    }
    const date = get('weeklyDate').value;
    const section = get('weeklyClass').value.trim();
    const settings = capture();
    const id = JSON.stringify([date,section,settings.grade,settings.subject,settings.subjectOther,settings.term]);
    if (entries[id] && !confirm('Replace the saved pack for this class and week, including any edits?')) return;
    get('weeklyCapture').hidden = true;
    const original = {...S};
    const placeBefore = CTX.place;
    let built;
    try {
      let index = 0;
      built = rows.flatMap((row,i) => {
        if (!row.scheduled) return [];
        const phase = phaseFor(index++,scheduled.length);
        const prior = entries[id];
        const existing = prior?.pack.find(item=>item.day===i);
        if (existing && JSON.stringify(prior.days[i])===JSON.stringify(row) &&
            JSON.stringify(settings)===JSON.stringify(prior.settings)) return [existing];
        Object.assign(S, {compId:row.id,customComp:row.custom,duration:row.minutes});
        const lesson = newLesson();
        lesson.place = S.place;
        const focus = row.focus || shortTitle(lesson.title);
        lesson.secs.I += '<p><b>Daily focus:</b> '+esc(focus)+'</p>';
        lesson.secs.L += '<p><b>Teaching note:</b> '+esc(defaults[phase] || 'Model the skill, set a short practice task and check responses before learners leave.')+'</p>';
        return [{day:i,level:row.level,focus,lesson,...material(lesson,row.level,focus)}];
      });
    } catch {
      status('The pack could not be prepared. Try opening the affected competency as a single lesson.');
      return;
    } finally {
      Object.assign(S,original);
      CTX.place = placeBefore;
    }
    active = id;
    pack = built;
    entries[active] = {...entries[active],date,section,settings,source:get('weeklySource').value.trim(),days:rows,pack};
    updateSavedList();
    render();
    status(pack.length+' lessons prepared. Check the lesson drafts and worksheets before class.');
    persist();
  }
  function exportText(kind) {
    const e = entries[active];
    return ['GuroPrep · Weekly '+(kind==='teacher'?'teaching pack':'student worksheets'),
      `Week of ${e.date} · Grade ${e.settings.grade} ${e.settings.subject} · Term ${e.settings.term}${e.section ? ' · '+e.section : ''}`,
      ...pack.map(item => days[item.day]+'\n'+item[kind])].join('\n\n');
  }
  function button(label, callback) {
    const b = node('button', label);
    b.type = 'button';
    b.className = 'btn small ghost';
    b.onclick = callback;
    return b;
  }
  function openLesson(item) {
    if (anyEdits() && !confirm('Open this lesson in the single-lesson editor? Unsaved edits to the current lesson may be replaced.')) return;
    S.lesson = structuredClone(item.lesson);
    showLesson();
    save();
    const target = get('weeklyCapture');
    target.hidden = false;
    target.onclick = () => {
      if (!S.lesson || S.lesson.seed!==item.lesson.seed || S.lesson.title!==item.lesson.title) {
        toast('Reopen this day from the weekly pack before updating it.');
        return;
      }
      if (!confirm('Replace the weekly text for this day with the lesson editor version? Any added levels and direct weekly text edits will be replaced.')) return;
      item.addedLevels = [];
      item.lesson = structuredClone(S.lesson);
      Object.assign(item,material(item.lesson,item.level,item.focus));
      persist();
      render();
      target.hidden = true;
      toast(days[item.day]+' updated in the weekly pack.');
    };
    get('step2').scrollIntoView({behavior:'smooth'});
  }
  function continueWeek() {
    const e = entries[active];
    const next = new Date(e.date+'T12:00:00Z');
    next.setUTCDate(next.getUTCDate()+7);
    const date = next.toISOString().slice(0,10);
    const settings = {...e.settings,week:''};
    const id = JSON.stringify([date,e.section,settings.grade,settings.subject,settings.subjectOther,settings.term]);
    if (entries[id]) { status('Next week already exists. Open it from Saved weeks.'); return; }
    Object.assign(S,settings);
    renderStep1();
    active = null;
    pack = [];
    get('weeklyCapture').hidden = true;
    get('weeklyDate').value = date;
    get('weeklyClass').value = e.section;
    get('weeklySource').value = e.source || '';
    makeRows(e.days.map((row,i) => {
      const prior = e.pack.find(item => item.day === i);
      return prior?.outcome === 'Carry forward' ? {...row,focus:prior.followup || row.focus} :
        {scheduled:(e.timetable || e.days)[i].scheduled,minutes:row.minutes,level:row.level};
    }));
    updateSavedList();
    render();
    status('Class timetable copied. Carried targets stay on their meeting day. Choose the remaining targets before preparing this week.');
  }
  function reschedule(item,skip) {
    try {
      const saved = readStore();
      if (JSON.stringify(saved[active]) !== JSON.stringify(entries[active])) {
        status('Saved data has changed. Reload and reopen this class week before moving a lesson.');
        return;
      }
      const dates = skip.trim() ? skip.trim().split(/[ ,]+/) : [];
      if (dates.some(date=>!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0,10)!==date)) {
        status('Enter dates as YYYY-MM-DD, separated by commas.'); return;
      }
      const move = planClassMove(saved,active,item.day,dates);
      const message = move.changes.map(c=>c.date+' · '+shortTitle(c.title)+c.note).join('\n');
      if (!confirm('Move these lessons for '+(saved[active].section || 'this class')+'? Review dates, especially holidays and term boundaries.\n\n'+message)) return;
      if (JSON.stringify(readStore())!==JSON.stringify(saved)) { status('Another tab updated the planner. Reload before retrying.'); return; }
      window.localStorage.setItem(key,JSON.stringify(move.entries));
      entries=move.entries;
      pack=entries[active].pack;
      get('weeklyCapture').hidden=true;
      makeRows(entries[active].days);
      updateSavedList();
      render();
      status('Saved. Next meeting: '+move.changes[0].date+'. Open Saved weeks to view each changed week.');
    } catch(error) { status('Could not save move. '+error.message); }
  }
  function render() {
    const out = get('weeklyOutput');
    out.replaceChildren();
    if (!active) return;
    const log = entries[active].moves || [];
    if (log.length) {
      const history = node('details');
      history.append(node('summary','Class rescheduling history'));
      for (const move of log) history.append(node('p',move.from+' → '+move.changes.map(c=>c.date+' · '+c.title+c.note).join(' / ')));
      out.append(history);
    }
    if (!pack.length) return;
    const actions = node('div');
    actions.className = 'weekly-actions';
    const entry = entries[active];
    const options = entry.output || {school:'',teacher:'',paper:weeklyPaper[entry.settings.paper]?entry.settings.paper:'short'};
    const settings = node('details');
    settings.append(node('summary','School and export settings'));
    for (const [id,label] of [['school','School name'],['teacher','Teacher name']]) {
      const field=node('label',label),input=node('input'); input.value=options[id];
      input.onchange=()=>{options[id]=input.value.trim();entry.output=options;persist();};field.append(input);settings.append(field);
    }
    const paper=node('select'),paperLabel=node('label','Paper for standard exports');
    for(const [id,format] of Object.entries(weeklyPaper))paper.add(option(id,format.label));
    paper.value=options.paper;paper.onchange=()=>{options.paper=paper.value;entry.output=options;persist();};
    paperLabel.append(paper);settings.append(paperLabel);
    const template=node('input'),fileLabel=node('label','Optional teacher-plan DOCX template. Place {{GUROPREP}} alone in a paragraph where the plan should appear. The template keeps its own paper size.');
    template.type='file';template.accept='.docx';fileLabel.append(template);settings.append(fileLabel);out.append(settings);
    const prefix='GuroPrep-'+entry.date+'-'+(entry.section||'class').replace(/[^a-z0-9_-]/gi,'_');
    async function word(kind,pages) {
      return kind==='teacher' && template.files[0] ? await teacherTemplate(template.files[0],pages) :
        new Uint8Array(await weeklyDocx(pages,options.paper).arrayBuffer());
    }
    for (const [kind,label] of Object.entries(weeklyKinds)) {
      actions.append(button(label+' (.docx)',async()=>{
        try { const data=await word(kind,weeklyPages(entry,kind,options));await saveFile(prefix+'-'+kind+'.docx',new Blob([data],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'})); }
        catch(e){status('Export failed. '+e.message);}
      }),button('Print '+label.toLowerCase()+' / PDF',()=>{
        const win=window.open('','_blank');
        if(!win){status('Allow the print window or download the offline pack.');return;}
        win.opener=null;win.document.write(weeklyPrintable(weeklyPages(entry,kind,options),label,options.paper));win.document.close();win.focus();win.print();
      }));
    }
    for (const [kind,label] of [['teacher','Teacher plan'],['student','Student worksheet']]) {
      actions.append(button('Editable '+label.toLowerCase()+' slides (.pptx)',async()=>{
        try {
          await loadOffice();
          const pages=weeklyPages(entry,kind,options);
          if(!pages.length) {status('Prepare the weekly pack before exporting slides.');return;}
          const blob=await GuroOffice.pptx(pages,label+' · '+entry.date);
          await saveFile(prefix+'-'+kind+'.pptx',blob);
          status('Editable '+label.toLowerCase()+' presentation downloaded.');
        } catch(error) { status('PPTX export failed. '+error.message); }
      }));
    }
    actions.append(button('Download offline week (.zip)',async()=>{
      try {
        const archive=new JSZip();
        for(const [kind,label] of Object.entries(weeklyKinds)) {
          const pages=weeklyPages(entry,kind,options);
          archive.file(kind+'.docx',await word(kind,pages));archive.file(kind+'.html',weeklyPrintable(pages,label,options.paper));
        }
        await saveFile(prefix+'.zip',await archive.generateAsync({type:'blob',compression:'DEFLATE'}));
      } catch(e){status('Offline pack could not be created. '+e.message);}
    }),button('Download editable text',()=>saveFile(prefix+'.txt',new Blob([exportText('teacher'),'\n\n',exportText('student')],{type:'text/plain;charset=utf-8'}))));
    actions.append(button('Prepare following week',continueWeek));
    out.append(actions);
    pack.forEach(item => {
      const panel = node('details');
      panel.append(node('summary',days[item.day]+' · '+shortTitle(item.lesson.title)));
      if (!item.ready) panel.append(node('p','Lesson draft only. Add your own worksheet and answers in the single-lesson editor.'));
      panel.append(button('Edit this day in lesson workspace',()=>openLesson(item)));
      const result = node('label','After class');
      const choice = node('select');
      for (const value of ['Planned','Taught','Carry forward']) choice.add(option(value,value));
      choice.value = item.outcome || 'Planned';
      choice.onchange = () => { item.outcome = choice.value; persist(); };
      result.append(choice);
      const note = node('label','Focus for the next meeting');
      const nextFocus = node('input');
      nextFocus.value = item.followup || '';
      nextFocus.oninput = () => { item.followup = nextFocus.value; persist(); };
      note.append(nextFocus);
      panel.append(result,note);
      const skipLabel = node('label','Skip these dates when choosing destinations (optional)');
      const skip = node('input');
      skip.placeholder='YYYY-MM-DD, YYYY-MM-DD';
      skipLabel.append(skip);
      panel.append(skipLabel,button('Move to next class meeting',()=>reschedule(item,skip.value)));
      const alternatives = ['F','C','E'].filter(level =>
        level !== item.level && !item.addedLevels?.includes(level));
      for (const level of alternatives) {
        const practice = subjectPractice(item.lesson,level);
        if (!practice) continue;
        const preview = node('details');
        preview.append(node('summary','Preview '+LEVELS[level]+' practice'));
        const sample = node('div',practice.student);
        sample.style.whiteSpace = 'pre-wrap';
        preview.append(sample,button('Add '+LEVELS[level]+' worksheet and key',() => {
          item.student += '\n\n'+practice.name+'\n'+practice.student;
          if (!item.teacher.includes('Answer key / scoring guidance')) item.teacher += '\nAnswer key / scoring guidance';
          item.teacher += '\n\n'+practice.name+'\n'+practice.answers;
          (item.addedLevels ||= []).push(level);
          persist();
          render();
          status(LEVELS[level]+' worksheet and answers added to '+days[item.day]+'.');
        }));
        panel.append(preview);
      }
      for (const [kind,label] of [['teacher','Teacher plan and answers'],['student','Student worksheet']]) {
        const field = node('label',label);
        const input = node('textarea');
        input.rows = 8;
        input.value = item[kind];
        input.oninput = () => { item[kind] = input.value; persist(); };
        field.append(input);
        panel.append(field);
      }
      out.append(panel);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    entries = readStore();
    const today = new Date(new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Manila'})+'T00:00:00Z');
    today.setUTCDate(today.getUTCDate() - (today.getUTCDay()+6)%7);
    get('weeklyDate').value = today.toISOString().slice(0,10);
    const captureBtn = button('Update this day in weekly pack',()=>{});
    captureBtn.id = 'weeklyCapture';
    captureBtn.hidden = true;
    get('step2').prepend(captureBtn);
    makeRows();
    updateSavedList();
    for (const selector of ['#gradeChips','#subjectChips','#termChips']) {
      document.querySelector(selector).addEventListener('click', () => makeRows(readRows().map(({scheduled,minutes,level})=>({scheduled,minutes,level}))));
    }
    get('weeklyEveryDay').onclick = () => makeRows(readRows().map(row=>({...row,scheduled:true})));
    get('weeklyFill').onclick = suggest;
    get('weeklyForm').onsubmit = generate;
    get('weeklySaved').onchange = event => {
      captureBtn.hidden = true;
      active = event.target.value || null;
      const e = entries[active];
      pack = e?.pack || [];
      if (e) {
        Object.assign(S,e.settings);
        renderStep1();
        get('weeklyDate').value = e.date;
        get('weeklyClass').value = e.section;
        get('weeklySource').value = e.source || '';
      }
      makeRows(e?.days || []);
      render();
      status(e?'Saved pack loaded.':'Choose a competency for each day or use Suggest lessons.');
    };
  });
})();
