// Build additional practice from the items already saved with this exact lesson.
function subjectPractice(lesson, level) {
  if (!['Mathematics','English','Science'].includes(lesson.subject) ||
      !isReadyLesson(lesson) || !lesson.items?.[level]?.length) return null;
  const previous = S.lesson;
  const place = CTX.place;
  try {
    S.lesson = lesson;
    CTX.place = lesson.place ?? S.place;
    const sheet = wsData(level);
    const key = keyData().find(block => block.lvl === level);
    if (!key || key.rows.length !== sheet.items.length) return null;
    const context = sheet.passage ? [sheet.passage.title,sheet.passage.text] : [];
    const rubric = rubricOf(lesson);
    const questions = sheet.items.map((item,i) => {
      const lines = [(i+1)+'. '+item.q];
      if (item.nl) lines.push(item.nl.lo+' ───────────────── '+item.nl.hi);
      if (!item.noLine) lines.push('________________________________');
      return lines.join('\n');
    });
    return {
      name:LEVELS[level]+' · '+shortTitle(lesson.title),
      student:[sheet.instr,...context,...questions].filter(Boolean).join('\n'),
      answers:[...key.rows.map(row => row.n+'. '+row.a),
        ...(rubric ? [rubric.title,...rubric.rows] : [])].join('\n')
    };
  } finally { S.lesson = previous; CTX.place = place; }
}
