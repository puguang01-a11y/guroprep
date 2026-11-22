/* School-year helpers (SY 2026–2027) */
const PHRASES={en:[],
  fil:[['Show your answer.','Ipakita ang inyong sagot.'],['Work with your group.','Magtulungan kayo sa grupo.'],['Explain how you got it.','Ipaliwanag kung paano mo nakuha.']],
  ceb:[['Show your answer.','Ipakita ang inyong tubag.'],['Work with your group.','Pagtinabangay mo sa inyong grupo.'],['Explain how you got it.','Ipasabot kung giunsa nimo pagkuha.']]};
function curFor(g){g=+g;if(g<=9)return'MATATAG (Revised K to 10)';if(g===10)return'K to 12 (2016)';if(g===11)return'Strengthened SHS';return'Existing SHS'}
function curNote(g){g=+g;if(g<=9)return'MATATAG (Revised K to 10). In use for Grades 1–9 this school year.';if(g===10)return'K to 12 (2016) for most subjects; MATATAG reaches Grade 10 in SY 2027–2028. Mathematics follows DepEd\'s Grade 10 Three-Term Budget of Work (April 2026).';if(g===11)return'Strengthened SHS. In use nationwide for Grade 11 this school year.';return'Existing SHS. Only pilot schools use the Strengthened SHS for Grade 12. Change this under "More settings" if yours does.'}
function subjectsFor(g){g=+g;
  if(g===1)return['Mathematics','Language','Reading and Literacy','Makabansa','GMRC'];
  if(g<=3)return['Mathematics','Filipino','English','Makabansa','GMRC'].concat(g===3?['Science']:[]);
  if(g<=6)return['Mathematics','English','Filipino','Science','Araling Panlipunan','MAPEH',g===6?'TLE':'EPP','GMRC'];
  if(g<=10)return['Mathematics','English','Filipino','Science','Araling Panlipunan','MAPEH','TLE','Values Education'];
  return[];
}
function termNow(d){const m=d.getMonth()+1,day=d.getDate();if(m>=6&&(m<9||(m===9&&day<=15)))return 1;if((m===9&&day>=16)||m===10||m===11||m===12)return 2;return 3}
/* Instruction start dates from DepEd Order No. 9, s. 2026 (Term 3 start not encoded: no week hint) */
const TERM_START={1:new Date(2026,5,15),2:new Date(2026,8,16)};
function weekNow(term,d){const st=TERM_START[term];if(!st||termNow(d)!==+term)return null;const w=Math.floor((d-st)/(7*864e5))+1;return w>=1&&w<=12?Math.min(w,10):null}
function weekHas(label,w){if(w==null)return false;const m=String(label).split(/[–-]/).map(Number);return m.length===1?m[0]===w:(w>=m[0]&&w<=m[1])}
function phaseSplit(approach,total){
  const P={explicit:[['Review and motivation',.15],['I do: modelling',.25],['We do: guided practice',.25],['You do: worksheet by level',.25],['Wrap-up and exit ticket',.10]],
    '4a':[['Activity',.25],['Analysis',.2],['Abstraction',.2],['Application: worksheet by level and exit ticket',.35]],
    '5e':[['Engage',.1],['Explore',.25],['Explain',.2],['Elaborate: worksheet by level',.3],['Evaluate: exit ticket',.15]]}[approach];
  let used=0;return P.map(([n,f],i)=>{let m=i===P.length-1?total-used:Math.round(total*f);used+=m;return[n,m]})}
