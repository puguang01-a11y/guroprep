/* GuroPrep lesson builder: turns a DepEd competency (plus ready content when available) into a complete,
   editable ILAW lesson — objectives, learning resources, full procedures, assessment set, ways forward,
   and a worksheet with three activities and an answer key. Runs in the browser; no AI service needed. */
(function () {
  'use strict';
  const FIL_AREAS = /^(Filipino|Makabansa|GMRC|Araling Panlipunan|Values Education|Edukasyon sa Pagpapakatao|EsP|Mabisang Komunikasyon)/i;
  const filLabel = t => /\b(ang|ng|mga|sa|Natutukoy|Naipaliliwanag|Nasusuri|Nailalarawan|Nakabubuo|Natatalakay|Naisasagawa|Napaghahambing)\b/.test(t);
  const isFil = (area, label) => FIL_AREAS.test(area || '') || filLabel(label || '');
  const cap = t => t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
  const lc = t => t ? t.charAt(0).toLowerCase() + t.slice(1) : t;
  const trimDot = t => String(t || '').trim().replace(/[.;:]+$/, '');
  const MCQ = /\s{2}\(a\)/;
  const stripOpts = q => String(q).split(MCQ)[0].trim();

  const BASE = /^(identify|describe|explain|analy[sz]e|compare|classify|determine|solve|use|apply|create|compose|write|read|recognize|illustrate|represent|find|demonstrate|evaluate|interpret|infer|construct|perform|measure|estimate|investigate|discuss|differentiate|distinguish|give|state|list|name|express|organize|plan|design|predict|summarize|show|follow|observe|infer|recall|retell|sequence|locate|draw|convert|order|round|add|subtract|multiply|divide|simplify|graph|prove|translate|derive|calculate|relate|make|produce|deliver|present|conduct|cite|categorize|examine|assess|formulate|appreciate|value|practice|participate|respond|select|tell|ask|answer|spell|pronounce|extract|note|paraphrase|synthesi[sz]e|critique|argue|defend|justify|propose|edit|revise|proofread|listen|view|watch|compute|check|verify|collect|record|sort|match|label|count|tally|encode|decode|model|carry|explore|identify|develop|engage|build|communicate|connect)\b/i;
  /* short topic from a long competency label */
  function topicOf(label) {
    let t = String(label || '').replace(/\s*·.*$/, '');
    if (t.includes(' — ')) { const s = t.split(' — ').map(x => x.trim()).filter(Boolean); t = s.length > 2 ? s[s.length - 2].replace(/:$/, '') + ': ' + s[s.length - 1] : s[s.length - 1]; }
    t = trimDot(t).replace(/\s*\((?:e\.g\.|such as)[^)]*\)/gi, '');
    const fil = t.replace(/^(Na[a-z-]+|Nai[a-z-]+|Nak[a-z-]+)(\s*(,|at)\s*(Na[a-z-]+))*\s+/i, '');
    const before0 = t;
    if (fil !== t) t = fil.replace(/^(ang|ng)\s+/i, '');
    else { for (let k = 0; k < 4; k++) { const before = t; t = t.replace(BASE, '').replace(/^\s*,?\s*using [^,]+,\s*/i, ' ').replace(/^\s*,?\s*(?:and|or)\s+/i, '').replace(/^\s*,\s*/, '').trim(); if (!BASE.test(t)) break; if (t === before) break; } if (!t) t = before0; }
    t = t.replace(/^(the|a|an)\s+/i, '');
    if (t.length > 60) { const cut = t.slice(20).search(/,\s*such as|\s+using\s|\s+to\s+(?!the\b)|\s+in order\s|\s+through\s|;\s/); if (cut >= 0) t = t.slice(0, 20 + cut); }
    t = t.replace(/[,;:\s]+$/, '');
    return t.length > 140 ? t.slice(0, 137).replace(/\s+\S*$/, '') + '…' : t;
  }
  /* objective verb phrase from the competency */
  function cognitive(label) {
    const raw = trimDot(String(label || '').replace(/\s*·.*$/, ''));
    const segs = raw.split(/\s+—\s+/).map(x => x.trim().replace(/[.:;,]+$/, '')).filter(Boolean);
    const fw = x => x.split(' ')[0];
    let i = /ing$/i.test(fw(segs[0] || '')) ? segs.findIndex((x, k) => k > 0 && BASE.test(x)) : 0;
    if (i < 0) {
      const w = (segs[0] || raw).split(' '); const g = w[0];
      if (/ing$/i.test(g)) { let b = g.slice(0, -3); if (/(at|iz|lv|rv|us|ag|ur)$/i.test(b)) b += 'e'; if (/([^aeiou])\1$/i.test(b)) b = b.slice(0, -1); segs[0] = [b].concat(w.slice(1)).join(' '); i = 0; }
      else return 'show understanding of ' + lc(raw);
    }
    let core = lc(segs[i]);
    const rest = segs.slice(i + 1);
    if (rest.length) { const last = rest[rest.length - 1]; core = core.replace(/\s+within$/, ''); core += BASE.test(last) ? ', and ' + lc(last) : ', focusing on ' + rest.slice(-2).map(lc).join(': '); }
    return core.replace(/\s+/g, ' ');
  }

  /* minutes per phase (weights) */
  function minutes(weights, total) {
    const sum = weights.reduce((a, b) => a + b, 0);
    const m = weights.map(w => Math.max(2, Math.round(w * total / sum)));
    m[m.length - 1 > 3 ? 3 : 0] += total - m.reduce((a, b) => a + b, 0);
    return m;
  }

  const APPROACH = {
    primary: { names: ['Warm-up and review', 'Motivation', 'Teacher modeling (I do)', 'Guided practice (We do)', 'Group or pair activity', 'Independent practice (You do)', 'Reflection'], w: [4, 4, 8, 8, 8, 8, 3], map: ['warm', 'motive', 'model', 'guided', 'group', 'indep', 'reflect'] },
    'Explicit Teaching': { names: ['Review / introduction', 'Motivation', 'Lesson proper / teacher modeling', 'Guided practice', 'Group or pair activity', 'Independent practice', 'Reflection / synthesis'], w: [4, 4, 9, 8, 8, 8, 4], map: ['warm', 'motive', 'model', 'guided', 'group', 'indep', 'reflect'] },
    '4A’s': { names: ['Preliminaries / review', 'Activity', 'Analysis', 'Abstraction', 'Application', 'Reflection'], w: [4, 10, 7, 8, 12, 4], map: ['warm', 'group4a', 'analysis', 'model', 'indepApply', 'reflect'] },
    '5E’s': { names: ['Engage', 'Explore', 'Explain', 'Elaborate', 'Evaluate'], w: [6, 11, 9, 12, 7], map: ['engage', 'group4a', 'model', 'indepApply', 'evaluate'] },
    'Inquiry-Based Learning': { names: ['Question / orientation', 'Investigate', 'Interpret evidence', 'Discuss findings', 'Apply / reflect'], w: [6, 13, 8, 8, 10], map: ['engage', 'group4a', 'analysis', 'model', 'indepApply'] }
  };

  /* ---------- English text blocks ---------- */
  const EN = {
    warm: c => [
      `• Greet the class and do a 1-minute energizer (e.g., a quick "Stand up if…" game about the last lesson).`,
      `• Review: ask 2–3 quick questions about the previous lesson. Let learners answer on show-me boards or by thumbs up/down.`,
      c.pre.length ? `• Quick check of what learners already know:\n${c.pre.map((q, i) => `   ${i + 1}. ${q}`).join('\n')}` : `• Ask: "What do you already know about ${c.topic}?" Write 3–4 answers on the board.`].join('\n'),
    motive: c => [
      `• ${c.fam.motivation[0] || `Show a picture, object or short situation from daily life connected to ${c.topic}. Ask: "What do you notice? What do you wonder?"`}`,
      `• Key question for today: "${c.fam.key || `Why is learning about ${c.topic} useful in our daily life?`}"`,
      `• Tell learners the lesson target in simple words: "Today, we will ${c.obj}."`,
      c.vocab ? `• Pre-teach key words: ${c.vocab}.` : ''].filter(Boolean).join('\n'),
    model: c => [
      c.box && c.box.kind === 'passage' ? `• Read aloud "${c.box.title}" (printed on the worksheet) while learners follow.` : '',
      `• ${c.fam.model || `Explain ${c.topic} using a clear example on the board. Think aloud so learners hear how you decide each step.`}`,
      c.example ? `• Worked example: ${c.example.q}\n   Think aloud: read the item, find the key information, apply the idea, then check.\n   Answer: ${c.example.a}` : `• Show one worked example step by step: (1) read the task, (2) find the key information, (3) apply the idea, (4) check the answer.`,
      `• Key idea to remember: ${c.fam.rule || `write a one-sentence rule or definition for ${c.topic} on the board.`}`,
      `• Check: "Show thumbs up if you can explain the first step to a seatmate."`].filter(Boolean).join('\n'),
    guided: c => [
      `• ${c.fam.guided[0] || 'Do the first items together. Learners answer on show-me boards; discuss each answer before moving on.'}`,
      c.guidedItems.length ? `• Items to do together (answers for the teacher):\n${c.guidedItems.map((x, i) => `   ${i + 1}. ${x.q} → ${x.a}`).join('\n')}` : '',
      `• Discussion questions:\n   – ${c.fam.key || `What is ${c.topic}?`}\n   – How did you get your answer? What clue helped you?\n   – Where can we see or use this in ${c.place}?`,
      `• Give hints only when needed. Fade support as learners get the items right.`].filter(Boolean).join('\n'),
    group: c => [
      `• Form groups by readiness. Each group does one worksheet activity and then presents one answer:`,
      `   – Activity 1 (Try it): learners who need more support, with the teacher.`,
      `   – Activity 2 (Practice): most learners, in pairs.`,
      `   – Activity 3 (Challenge): learners ready for more, working on their own and then explaining to the class.`,
      c.fam.guided[1] && !(c.box && c.box.kind === 'activity') ? `• Group task idea: ${c.fam.guided[1]}` : '',
      c.box && c.box.kind === 'activity' && !(c.fam.guided[0] || '').includes(c.box.text) ? `• Hands-on activity: ${c.box.text}` : '',
      `• Roles: leader, writer, checker, reporter. Give a time signal 2 minutes before the end.`].filter(Boolean).join('\n'),
    indep: c => [
      `• Each learner answers Activity 2 on the worksheet alone (Activity 1 or 3 if more suitable).`,
      `• Walk around. Note common mistakes and help 2–3 learners who are stuck with a hint, not the answer.`,
      `• Early finishers try Activity 3 or write their own item for a classmate.`].join('\n'),
    reflect: c => [
      `• Ask 2–3 learners to say the key idea in their own words.`,
      `• Generalization: ${c.fam.rule || `Learners complete: "${cap(c.topic)} means…"`}`,
      `• Sentence frames: "Today I learned… / I can use this when… / I am still unsure about…"`,
      `• Give the 3-item exit ticket (see Assessment).`].join('\n'),
    /* 4A's / 5E's / inquiry variants */
    group4a: c => [
      c.box && c.box.kind === 'activity' ? `• Hands-on activity: ${c.box.text}` : c.box ? `• Learners read "${c.box.title}" in pairs.` : '',
      `• ${c.fam.guided[0] || `In groups, learners explore a short task about ${c.topic} and record what they notice.`}`,
      c.guidedItems.length ? `• Starter items for the groups:\n${c.guidedItems.map((x, i) => `   ${i + 1}. ${stripOpts(x.q)}`).join('\n')}` : '',
      `• Roles: leader, writer, checker, reporter.`].filter(Boolean).join('\n'),
    analysis: c => [
      `• Groups report. Ask:\n   – What did you do first? What did you notice?\n   – ${c.fam.key || `What does this show about ${c.topic}?`}\n   – Which answer was hardest? Why?`,
      c.guidedItems.length ? `• Check the starter items together:\n${c.guidedItems.map((x, i) => `   ${i + 1}. ${x.a}`).join('\n')}` : '',
      `• Correct misconceptions on the spot and record good explanations on the board.`].filter(Boolean).join('\n'),
    indepApply: c => [
      `• Learners answer the worksheet: Activity 1 (Try it), Activity 2 (Practice) and Activity 3 (Challenge) as far as they can.`,
      c.fam.enrich ? `• Real-life application: ${c.fam.enrich}` : `• Real-life application: learners give an example of ${c.topic} in ${c.place}.`,
      `• Walk around and give quick feedback. Collect Activity 2 as a written check.`].join('\n'),
    engage: c => [EN.warm(c), EN.motive(c)].join('\n'),
    evaluate: c => [`• Learners answer Activity 2 on their own, then the 3-item exit ticket.`, `• Reflection frames: "Today I learned… / I can use this when… / I am still unsure about…"`].join('\n')
  };
  /* ---------- Filipino text blocks ---------- */
  const FIL = {
    warm: c => [
      `• Batiin ang klase at magsagawa ng maikling energizer (1 minuto).`,
      `• Balik-aral: magtanong ng 2–3 maikling tanong tungkol sa nakaraang aralin. Pasagutin gamit ang show-me board o thumbs up/down.`,
      c.pre.length ? `• Paunang pagsusuri:\n${c.pre.map((q, i) => `   ${i + 1}. ${q}`).join('\n')}` : `• Itanong: "Ano na ang alam ninyo tungkol sa ${c.topic}?" Isulat sa pisara ang 3–4 na sagot.`].join('\n'),
    motive: c => [
      `• Magpakita ng larawan, bagay o maikling sitwasyon mula sa pang-araw-araw na buhay na may kaugnayan sa ${c.topic}. Itanong: "Ano ang napapansin ninyo?"`,
      `• Pangunahing tanong: "Bakit mahalagang pag-aralan ang ${c.topic}?"`,
      `• Ipaliwanag ang layunin ng aralin sa simpleng salita.`].join('\n'),
    model: c => [
      c.box ? `• Basahin nang malakas ang "${c.box.title}" habang sumusunod ang mga mag-aaral.` : '',
      `• Ipaliwanag ang aralin gamit ang malinaw na halimbawa sa pisara. Mag-think aloud upang marinig ng mga mag-aaral kung paano ka nagpapasya sa bawat hakbang.`,
      c.example ? `• Halimbawa: ${c.example.q}\n   Sagot: ${c.example.a}` : `• Ipakita ang isang halimbawa nang hakbang-hakbang: (1) basahin ang gawain, (2) hanapin ang mahalagang impormasyon, (3) ilapat ang aralin, (4) suriin ang sagot.`,
      `• Isulat sa pisara ang pangunahing ideya ng aralin sa isang pangungusap.`].filter(Boolean).join('\n'),
    guided: c => [
      `• Sabay-sabay na sagutin ang unang mga aytem. Pag-usapan ang bawat sagot bago magpatuloy.`,
      c.guidedItems.length ? `• Mga aytem na sabay na gagawin (sagot para sa guro):\n${c.guidedItems.map((x, i) => `   ${i + 1}. ${x.q} → ${x.a}`).join('\n')}` : '',
      `• Mga tanong sa talakayan:\n   – Ano ang natutuhan natin tungkol sa ${c.topic}?\n   – Paano mo nakuha ang sagot?\n   – Saan natin ito makikita o magagamit sa ${c.place}?`].filter(Boolean).join('\n'),
    group: c => [
      `• Hatiin ang klase ayon sa kahandaan. Bawat pangkat ay gagawa ng isang gawain sa worksheet at mag-uulat:`,
      `   – Gawain 1 (Subukan): mga nangangailangan ng tulong, kasama ang guro.`,
      `   – Gawain 2 (Pagsasanay): karamihan ng mag-aaral, magkapares.`,
      `   – Gawain 3 (Hamon): mga handa sa mas mataas na gawain.`,
      `• Mga tungkulin: lider, tagasulat, tagasuri, tagapag-ulat.`].join('\n'),
    indep: c => [
      `• Sasagutin ng bawat mag-aaral ang Gawain 2 nang mag-isa.`,
      `• Umikot sa silid at tulungan ang mga nahihirapan gamit ang pahiwatig, hindi ang sagot.`,
      `• Ang maagang matapos ay susubok sa Gawain 3.`].join('\n'),
    reflect: c => [
      `• Ipasabi sa 2–3 mag-aaral ang pangunahing ideya sa sarili nilang salita.`,
      `• Pagbuo ng paglalahat: "Ang ${c.topic} ay…"`,
      `• Pagninilay: "Natutuhan ko ngayon… / Magagamit ko ito kapag… / Hindi pa ako sigurado sa…"`,
      `• Ibigay ang 3-aytem na exit ticket.`].join('\n'),
    group4a: c => [`• Pangkatang gawain tungkol sa ${c.topic}. Itala ang mga napansin.`, c.guidedItems.length ? `• Panimulang aytem:\n${c.guidedItems.map((x, i) => `   ${i + 1}. ${stripOpts(x.q)}`).join('\n')}` : '', `• Mga tungkulin: lider, tagasulat, tagasuri, tagapag-ulat.`].filter(Boolean).join('\n'),
    analysis: c => [`• Pag-uulat ng mga pangkat. Itanong:\n   – Ano ang una ninyong ginawa? Ano ang napansin ninyo?\n   – Ano ang ipinapakita nito tungkol sa ${c.topic}?\n   – Aling bahagi ang pinakamahirap? Bakit?`, `• Iwasto agad ang maling akala.`].join('\n'),
    indepApply: c => [`• Sasagutin ng mga mag-aaral ang Gawain 1, 2 at 3 sa worksheet.`, `• Paglalapat sa buhay: magbigay ng halimbawa ng ${c.topic} sa ${c.place}.`].join('\n'),
    engage: c => [FIL.warm(c), FIL.motive(c)].join('\n'),
    evaluate: c => [`• Sagutin ang Gawain 2 nang mag-isa at ang 3-aytem na exit ticket.`, `• Pagninilay: "Natutuhan ko ngayon… / Magagamit ko ito kapag…"`].join('\n')
  };

  /* performance task by subject family */
  function performance(subject, topic, fil, rubric) {
    if (rubric) return { task: `Do the task card for your level (see worksheet).`, rubric: rubric.rows, title: rubric.title };
    if (fil) return { task: `Gumawa ng maikling output (poster, talata o presentasyon) na nagpapakita ng pag-unawa sa ${topic} gamit ang halimbawa mula sa inyong pamayanan.`, rubric: ['Nilalaman: wasto at kumpleto', 'Paliwanag: malinaw at may batayan', 'Pagkamalikhain at kaayusan', 'Paggamit ng wika'] };
    if (/math/i.test(subject)) return { task: `Solve a real-life problem about ${topic} (e.g., at the market, school canteen or barangay). Show your solution and explain each step to a partner.`, rubric: ['Correct answer', 'Clear steps or model', 'Explanation in words', 'Checks the answer'] };
    if (/science/i.test(subject)) return { task: `In groups, make a poster or short demonstration that explains ${topic} using what you observed. Include one real-life example.`, rubric: ['Science ideas are correct', 'Uses observations or data', 'Clear explanation', 'Teamwork and safety'] };
    if (/english|reading|language/i.test(subject)) return { task: `Write a short paragraph or give a 1-minute talk that shows ${topic}. Use an example from your own reading or life.`, rubric: ['Content is correct and on topic', 'Organization', 'Language use', 'Delivery or neatness'] };
    return { task: `Make a short output (poster, paragraph or demonstration) that shows your understanding of ${topic} with an example from your community.`, rubric: ['Content is correct and complete', 'Clear explanation', 'Creativity and organization', 'Language use'] };
  }

  function generic(topic, fil) {
    if (fil) return [
      { title: 'Gawain 1 · Subukan', instr: 'Basahin at sagutin.', items: [[`Ano ang natutuhan mo tungkol sa ${topic}? Ipaliwanag sa sariling salita.`, 'Iba-iba ang sagot; suriin kung tama ang kahulugan ayon sa aralin.'], [`Magbigay ng isang halimbawa ng ${topic}.`, 'Iba-iba ang sagot.'], [`Isulat ang dalawang mahalagang salita mula sa aralin at ang kahulugan nito.`, 'Iba-iba ang sagot.']] },
      { title: 'Gawain 2 · Pagsasanay', instr: 'Sagutin nang buo.', items: [[`Ipaliwanag kung bakit mahalagang pag-aralan ang ${topic}.`, 'Iba-iba ang sagot; hanapin ang malinaw na dahilan.'], [`Paano mo maiuugnay ang ${topic} sa buhay sa inyong pamayanan?`, 'Iba-iba ang sagot.'], [`Paghambingin ang dalawang halimbawa ng ${topic}.`, 'Iba-iba ang sagot.']] },
      { title: 'Gawain 3 · Hamon', instr: 'Gawin ang gawain.', items: [[`Gumawa ng maikling talata, dayagram o poster tungkol sa ${topic}.`, 'Gamitin ang rubric.'], [`Bumuo ng sariling tanong tungkol sa ${topic} at sagutin ito.`, 'Iba-iba ang sagot.']] }];
    return [
      { title: 'Activity 1 · Try it', instr: 'Read and answer.', items: [[`What did you learn about ${topic}? Explain in your own words.`, 'Answers vary; check that the meaning matches the lesson.'], [`Give one example of ${topic}.`, 'Answers vary.'], [`Write two key words from the lesson and what they mean.`, 'Answers vary.']] },
      { title: 'Activity 2 · Practice', instr: 'Answer in complete sentences.', items: [[`Explain why learning about ${topic} is important.`, 'Answers vary; look for a clear reason.'], [`How can you connect ${topic} to life in your community?`, 'Answers vary.'], [`Compare two examples of ${topic}. How are they alike and different?`, 'Answers vary.']] },
      { title: 'Activity 3 · Challenge', instr: 'Do the task.', items: [[`Make a short paragraph, diagram or poster about ${topic}.`, 'Use the rubric.'], [`Write your own question about ${topic} and answer it.`, 'Answers vary.']] }];
  }

  /**
   * build(ctx) → lesson object
   * ctx: {grade, gradeLabel, subject, term, competency, approach, duration, place, engine (GuroEngine.build result) | null,
   *       pack: {goal,direction,tasks,support,extension,keys,answers} | null, practice: ['q|a','q|a','q|a'] | null,
   *       sourceLink, exemplars:[[label,url]], textbook, materialsKind}
   */
  function build(ctx) {
    const E = ctx.engine && ctx.engine.ready ? ctx.engine : null;
    const fil = isFil(ctx.subject, ctx.competency) && !(E && /English|Mathematics|Science/.test(ctx.subject));
    const topic = E ? topicOf(E.title) : topicOf(String(ctx.competency || '').replace(/(^|—\s)\d(?=[a-z])/g, '$1'));
    const label = E ? E.title : String(ctx.competency || '').replace(/(^|—\s)\d(?=[a-z])/g, '$1');
    const obj = cognitive(label);
    const fam = Object.assign({ motivation: [], guided: [] }, ctx.engine ? ctx.engine.fam : {});
    if (/^\[/.test(fam.model || '')) { for (const k of ['materials', 'model', 'rule', 'reteach', 'enrich', 'key']) if (/^\[/.test(fam[k] || '')) fam[k] = ''; fam.motivation = fam.motivation.filter(x => !/^\[/.test(x)); fam.guided = fam.guided.filter(x => !/^\[/.test(x)); }
    const place = ctx.place || (fil ? 'ating barangay' : 'our barangay');

    /* worksheet activities */
    let acts, exit = [], box = E ? E.box : null, rubric = E ? E.rubric : null;
    const it = (q, a) => [q, a];
    const used = new Set(), keyOf = x => String(x.q).trim();
    const tpl = x => String(x.q).replace(/\d[\d,.]*/g, '#').replace(/\(a\)[\s\S]*$/, '').trim();
    const take = (pools, n) => { const out = [], tp = new Set();
      for (const pass of [0, 1]) for (const pool of pools) for (const x of pool || []) {
        if (out.length >= n) break; const k = keyOf(x); if (used.has(k)) continue;
        if (pass === 0 && tp.has(tpl(x))) continue; used.add(k); tp.add(tpl(x)); out.push(x); }
      return out; };
    let pre = [], guidedItems = [], example = null;
    if (E && !E.task) {
      const I = E.items;
      if (E.example) { example = E.example; used.add(keyOf(example)); }
      const U = new Set([].concat(I.F, I.C, I.E, I.X).map(keyOf).filter(k => !used.has(k))).size;
      const reserve = U >= 20 ? 2 : U >= 15 ? 1 : 0;
      if (reserve) { pre = take([I.F, I.C], reserve).map(x => x.q); guidedItems = take([I.C, I.F, I.E], reserve); }
      const q = U >= 17 ? [5, 5, 4] : [Math.max(1, Math.ceil(U / 3)), Math.max(1, Math.ceil(U / 3)), Math.max(1, U - 2 * Math.ceil(U / 3))];
      const fillUp = (got, pools, n) => { const seen = new Set(got.map(keyOf)); for (const pool of pools) for (const x of pool || []) { if (got.length >= n) break; if (!seen.has(keyOf(x))) { seen.add(keyOf(x)); got.push(x); } } return got; };
      const A1 = fillUp(take([I.F, I.C], q[0]), [I.F, I.C], 1), A2 = take([I.C, I.F, I.E], q[1]), A3 = take([I.E, I.C, I.F], q[2]);
      exit = take([I.X, I.C, I.E], 3); if (exit.length < 3) exit = fillUp(exit, [I.X, A2, A1], 3); exit = exit.map(x => it(x.q, x.a));
      if (!guidedItems.length) guidedItems = A1.slice(0, 2);
      acts = [
        { title: 'Activity 1 · Try it', instr: 'Answer each item. Ask your teacher for help if you need it.', items: A1.map(x => it(x.q, x.a)) },
        { title: 'Activity 2 · Practice', instr: 'Answer each item on your own.', items: A2.map(x => it(x.q, x.a)) },
        { title: 'Activity 3 · Challenge', instr: 'Answer each item. Explain your thinking.', items: A3.map(x => it(x.q, x.a)) }].filter(a => a.items.length);
    } else if (E && E.task) {
      const I = E.items;
      const T1 = take([I.F, I.C, I.E], 1), T2 = take([I.C, I.F, I.E], 1), T3 = take([I.E, I.C, I.F], 1);
      T1.push(...take([I.F, I.C], 1)); T2.push(...take([I.C, I.E], 1));
      acts = [['Activity 1 · Try it', T1], ['Activity 2 · Practice', T2], ['Activity 3 · Challenge', T3]]
        .map(([t, list]) => ({ title: t, instr: 'Do the task. Your teacher will use the rubric.', items: list.map(x => it(x.q, x.a)) })).filter(a => a.items.length);
    } else if (ctx.pack && (ctx.pack.tasks || []).length) {
      const P = ctx.pack, keyLines = String(P.answers || '').split(/\n/).filter(Boolean);
      const lv = (arr, title) => ({ title, instr: P.direction || 'Answer each item.', items: (arr || []).map((q, i) => it(q, keyLines[i] ? keyLines[i].replace(/^\d+\.\s*/, '') : 'See the lesson; accept answers that match the competency.')) });
      acts = [lv(P.support, fil ? 'Gawain 1 · Subukan' : 'Activity 1 · Try it'), lv(P.tasks, fil ? 'Gawain 2 · Pagsasanay' : 'Activity 2 · Practice'), lv(P.extension, fil ? 'Gawain 3 · Hamon' : 'Activity 3 · Challenge')].filter(a => a.items.length);
      const K = Object.assign({ Core: P.answers }, P.keys || {}); const order = [P.support, P.tasks, P.extension].map((a, i) => (a || []).length ? ['Foundation', 'Core', 'Extension'][i] : null).filter(Boolean); acts.forEach((a, i) => { if (K[order[i]]) a.keyText = K[order[i]]; });
    } else if (ctx.practice && ctx.practice.length) {
      acts = ctx.practice.map((s, i) => { const [q, a] = String(s).split('|'); return { title: [fil ? 'Gawain 1 · Subukan' : 'Activity 1 · Try it', fil ? 'Gawain 2 · Pagsasanay' : 'Activity 2 · Practice', fil ? 'Gawain 3 · Hamon' : 'Activity 3 · Challenge'][i], instr: fil ? 'Basahin at sagutin.' : 'Read the task and show or explain your answer.', items: [it(q.trim(), (a || '').trim())] }; });
    }
    const generated = !acts;
    if (!acts) acts = generic(topic, fil);
    if (!exit.length) exit = fil ? [[`Isulat ang isang bagay na natutuhan mo ngayon tungkol sa ${topic}.`, 'Iba-iba ang sagot.'], [`Magbigay ng isang halimbawa na may kaugnayan sa ${topic}.`, 'Iba-iba ang sagot.'], ['Anong bahagi ng aralin ang hindi mo pa lubos na naiintindihan?', 'Iba-iba ang sagot; gamitin sa remediation.']]
      : [[`Write one thing you learned today about ${topic}.`, 'Answers vary.'], [`Give one example related to ${topic}.`, 'Answers vary.'], ['Which part of today’s lesson is still unclear to you?', 'Answers vary; use this for reteaching.']];
    const flat = acts.flatMap(a => a.items);
    const c = { topic, obj, fam, place, box, example, pre, guidedItems, subjectWord: lc(ctx.subject || 'the lesson'), vocab: '' };
    const T = fil ? FIL : EN;

    /* procedures */
    const ap = APPROACH[ctx.approach] || APPROACH['Explicit Teaching'];
    const mins = minutes(ap.w, Number(ctx.duration) || 50);
    const procedures = ap.names.map((n, i) => ({ label: n, minutes: mins[i], text: `(${mins[i]} min)\n` + T[ap.map[i]](c) }));

    /* objectives */
    const objectives = fil ? {
      cognitive: `Sa pagtatapos ng aralin, ang mga mag-aaral ay inaasahang ${obj}.`,
      psychomotor: `Makagagawa ng gawain o output na nagpapakita ng ${topic}, nang mag-isa o kasama ang pangkat.`,
      affective: `Makapagpapakita ng pakikiisa, paggalang sa ideya ng iba at pagpapahalaga sa ${topic} sa pang-araw-araw na buhay.`
    } : {
      cognitive: `By the end of the lesson, learners will be able to ${obj}.`,
      psychomotor: /science/i.test(ctx.subject) ? `Carry out the activity safely, record observations and present results to the class.` : /math/i.test(ctx.subject) ? `Show solutions using models, drawings or written steps, and explain them to a partner.` : `Produce a short oral or written output that applies ${topic}.`,
      affective: /science/i.test(ctx.subject) ? `Show curiosity, honesty in recording data and care for others' safety during the activity.` : /math/i.test(ctx.subject) ? `Show persistence in solving problems and respect for classmates' ways of solving.` : `Show respect for others' ideas and confidence in sharing their own.`
    };

    /* learning resources */
    const famMat = fam.materials && !/^\[/.test(fam.materials) ? fam.materials : '';
    const resources = [
      fil ? `Worksheet (Gawain 1–3) at susi sa pagwawasto — kasama sa GuroPrep` : `Worksheet with Activities 1–3 and answer key (prepared by GuroPrep)`,
      box ? (box.kind === 'passage' ? `Reading passage: "${box.title}" (printed on the worksheet)` : `Hands-on activity sheet (printed on the worksheet)`) : '',
      fil ? `Exit ticket slips (3 aytem)` : `Exit ticket slips (3 items)`,
      famMat ? `Materials: ${famMat}` : (fil ? `Materials: pisara, tisa o marker, manila paper, larawan o tunay na bagay na may kaugnayan sa aralin` : `Materials: board and chalk or markers, manila paper, pictures or real objects connected to the lesson`),
      fil ? `Visual aid: tsart ng pangunahing ideya at mga halimbawa` : `Visual aid: chart of the key idea and worked example`,
      fil ? `Graphic organizer: concept map o T-chart para sa talakayan` : /science/i.test(ctx.subject) ? `Graphic organizer: observation and data table` : /math/i.test(ctx.subject) ? `Graphic organizer: problem-solving steps chart (Understand, Plan, Solve, Check)` : `Graphic organizer: concept map or T-chart for the discussion`,
      fil ? `Slides: i-download ang editable PPTX ng planong ito (opsiyonal)` : `Slides: download the editable PPTX of this plan (optional)`,
      ctx.textbook ? `Textbook or module: ${ctx.textbook}` : (fil ? `Textbook o module: isulat ang pamagat at pahina` : `Textbook or module: write the title and pages your school uses`),
      ctx.sourceLink ? `DepEd curriculum source: ${ctx.sourceLink}` : '',
      ...(ctx.exemplars || []).slice(0, 3).map(([l, u]) => `DepEd lesson exemplar: ${l} — ${u}`)].filter(Boolean);

    /* assessment */
    const perf = performance(ctx.subject, topic, fil, rubric);
    const oral = fil ? [`Ano ang natutuhan natin tungkol sa ${topic}?`, `Paano mo nakuha ang iyong sagot?`, `Saan mo ito magagamit sa ${place}?`] : [fam.key || `What did we learn today about ${topic}?`, `How did you get your answer? Explain your steps.`, `Where can you use this in ${place}?`];
    const assessment = fil ? [
      `Mga tanong na pasalita:\n${oral.map(q => '• ' + q).join('\n')}`,
      `Formative check habang nagkaklase:\n• Thumbs up/down pagkatapos ng pagmomodelo\n• Show-me board para sa 2 aytem sa guided practice\n• Pag-ikot at paggamit ng checklist habang pangkatang gawain`,
      `Exit ticket (3 aytem, huling 5 minuto):\n${exit.map((x, i) => `${i + 1}. ${x[0]}`).join('\n')}`,
      `Nakasulat na gawain: Worksheet Gawain 2 (iwawasto gamit ang susi)`,
      `Performance task: ${perf.task}\nRubric (4–3–2–1): ${perf.rubric.join(' · ')}`,
      `Pamantayan ng tagumpay: hindi bababa sa 7 sa 10 mag-aaral ang may 2 sa 3 tamang sagot sa exit ticket.`].join('\n\n') : [
      `Oral questions:\n${oral.map(q => '• ' + q).join('\n')}`,
      `Formative checks during class:\n• Thumbs up/down after modeling\n• Show-me boards for 2 items in guided practice\n• Walk around with a checklist during group work`,
      `Exit ticket (3 items, last 5 minutes):\n${exit.map((x, i) => `${i + 1}. ${x[0]}`).join('\n')}`,
      `Written task: Worksheet Activity 2 (score with the answer key)`,
      `Performance task: ${perf.task}\nRubric (score 4–3–2–1 for each): ${perf.rubric.join(' · ')}`,
      `Success criteria: at least 7 in 10 learners get 2 of 3 exit-ticket items right.`].join('\n\n');

    const next = fil ? [
      `Remediation: maliit na pangkat bukas — ${(fam.reteach || '').replace(/^Small group:\s*/i, '') || 'gamitin ang mas simpleng halimbawa at kongkretong bagay bago bumalik sa worksheet.'}`,
      `Enrichment: ${fam.enrich || 'gumawa ng sariling tanong at ipasagot sa kaklase.'}`,
      `Takdang-aralin: magbigay ng isang halimbawa ng ${topic} sa tahanan o pamayanan.`].join('\n') : [
      `Reteaching: small group tomorrow — ${(fam.reteach || '').replace(/^Small group:\s*/i, '') || 'use a simpler example and concrete materials before returning to the worksheet.'}`,
      `Enrichment: ${fam.enrich || 'write your own item and give it to a classmate.'}`,
      `Assignment: practise today’s lesson at home — answer 3 items like those in Activity 2, or find a real-life example of ${topic} and write 2–3 sentences about it.`].join('\n');

    /* worksheet markup for the editor fields: "## " heading, "> " instructions, item lines */
    const sheetLines = [], keyLines = [];
    if (box) { sheetLines.push('## ' + (box.kind === 'passage' ? 'Read: ' + box.title : (fil ? 'Gawain bago sumagot' : 'Activity (do this first)')), '> ' + box.text.replace(/\n+/g, ' ')); }
    acts.forEach(a => {
      sheetLines.push('## ' + a.title, '> ' + a.instr, ...a.items.map(x => x[0]));
      keyLines.push('## ' + a.title, ...(a.keyText ? [a.keyText] : a.items.map(x => x[1])));
    });
    sheetLines.push('## ' + (fil ? 'Exit ticket' : 'Exit ticket'), ...exit.map(x => x[0]));
    keyLines.push('## Exit ticket', ...exit.map(x => x[1]));
    if (rubric || generated || flat.some(x => /use the rubric|gamitin ang rubric/i.test(x[1]))) keyLines.push('## Rubric (4–3–2–1)', ...perf.rubric.map(r => '• ' + r));

    return {
      topic, fil, generated, objectives, procedures, assessment, next,
      materials: famMat || (fil ? 'Pisara, manila paper, larawan o tunay na bagay, worksheet' : 'Board, manila paper, pictures or real objects, worksheet'),
      resources, instructions: fil ? 'Basahin ang panuto ng bawat gawain at sagutin.' : 'Read the directions for each activity and answer.',
      sheet: sheetLines.join('\n'), key: keyLines.join('\n'),
      note: generated ? (fil ? 'Pangkalahatang gawain ang inihanda dahil wala pang handang aytem para sa kasanayang ito. Palitan o dagdagan mula sa inyong aklat.' : 'General activities were prepared because this competency has no ready-made items yet. Replace or add items from your textbook.') : ''
    };
  }

  /* worksheet markup → numbered text */
  function renderSheet(markup, withLines) {
    let n = 0; const out = [];
    for (const raw of String(markup || '').split(/\r?\n/)) {
      const line = raw.trim(); if (!line) continue;
      if (line.startsWith('## ')) { n = 0; out.push('', line.slice(3).toUpperCase()); continue; }
      if (line.startsWith('> ')) { out.push(line.slice(2)); continue; }
      if (line.startsWith('• ')) { out.push(line); continue; }
      if (/^\d+[.)]\s/.test(line)) { out.push(line); continue; }
      n++; out.push(n + '. ' + line + (withLines ? '\n    ______________________________' : ''));
    }
    return out.join('\n').trim();
  }
  window.GuroLesson = { build, renderSheet, topicOf, isFil, APPROACH };
})();
