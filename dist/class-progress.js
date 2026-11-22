// Plan the change on a snapshot so one storage write commits the whole move.
function planClassMove(saved, active, originalDay, unavailable = []) {
  const entries = structuredClone(saved);
  const first = entries[active];
  const original = first.pack.find(item => item.day === originalDay);
  if (!original || original.outcome === 'Taught') throw Error('Choose an untaught lesson.');
  const start = new Date(first.date+'T12:00:00Z');
  if (start.getUTCDay() !== 1) throw Error('Rescheduling requires a week saved with a Monday start.');
  const dateAt = offset => new Date(start.getTime()+offset*86400000).toISOString().slice(0,10);
  const changes = [];
  let current = first;
  let pending = original;
  let row = first.days[originalDay];
  first.pack = first.pack.filter(item => item !== original);
  first.days[originalDay] = {...row,scheduled:false,id:'',custom:'',focus:''};
  // The recurring timetable survives a one-off cancellation.
  first.timetable ||= saved[active].days.map(d => ({scheduled:d.scheduled,minutes:d.minutes,level:d.level}));
  let previous = first;
  for (let offset=originalDay+1;offset<84;offset++) {
    const day = offset%7;
    if (day>4) continue;
    if (day===0) {
      const date = dateAt(offset);
      const s = first.settings;
      const id = JSON.stringify([date,first.section,s.grade,s.subject,s.subjectOther,s.term]);
      const timetable = previous.timetable || previous.days;
      current = entries[id] || {date,section:first.section,source:previous.source,
        settings:{...previous.settings,week:''},pack:[],
        days:timetable.map(d=>({scheduled:d.scheduled,minutes:d.minutes,level:d.level,id:'',custom:'',focus:''}))};
      previous = current;
      if (!entries[id]) entries[id]=current;
    }
    const slot=current.days[day];
    if (!slot?.scheduled || unavailable.includes(dateAt(offset))) continue;
    const occupied=current.pack.find(item=>item.day===day);
    if (occupied?.outcome==='Taught') continue;
    current.timetable ||= current.days.map(d=>({scheduled:d.scheduled,minutes:d.minutes,level:d.level}));
    const displacedRow={...slot};

    const oldMinutes=row.minutes;
    pending.day=day;
    if (pending===original && pending.followup?.trim()) {
      const reminder='Next meeting focus: '+pending.followup.trim();
      if (!pending.teacher.includes(reminder)) pending.teacher=reminder+'\n\n'+pending.teacher;
    }
    if (pending.outcome==='Carry forward') pending.outcome='Planned';
    current.pack=current.pack.filter(item=>item!==occupied);
    current.pack.push(pending);
    current.pack.sort((a,b)=>a.day-b.day);
    current.days[day]={...row,scheduled:true,minutes:slot.minutes};
    const note = oldMinutes!==slot.minutes ? ' (plan '+oldMinutes+' min; slot '+slot.minutes+' min)' : '';
    changes.push({date:dateAt(offset),week:current.date,title:pending.lesson.title,note});
    if (!occupied) {
      first.moves ||= [];
      first.moves.push({from:dateAt(originalDay),changes});
      return {entries,changes};
    }
    pending=occupied;
    row=displacedRow;
  }
  throw Error('No available class meeting in the next 12 weeks. Review the saved timetable.');
}
