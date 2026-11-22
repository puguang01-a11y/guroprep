const fs=require('fs');
const load=g=>{const src=fs.readFileSync('/home/claude/guroprep/dist/grade'+g+'-curriculum.js','utf8');return eval('('+src.slice(src.indexOf('=')+1).replace(/;\s*(window[\s\S]*)?$/,'')+')')};
const out=[],bow={};
for(let g=7;g<=10;g++){const S=load(g).Science;bow[g]=S.source;S.terms.forEach((T,ti)=>T.forEach((c,i)=>out.push({id:`js${g}-${ti+1}-${i}`,subj:'Science',g,t:ti+1,w:String(c.section||'').replace(/^Weeks? /,'').replace(' to ','–'),title:c.label.replace(/\s*·\s*/g,' ').replace(/\s+/g,' ').trim(),sk:'s_bank',cfg:{key:`${g}-${ti+1}-${i}`}})))}
fs.writeFileSync('jsci_comps.js','/* Grades 7–10 Science competencies (DepEd Three-Term Budget of Work) */\nObject.assign(BOW_SCI,'+JSON.stringify(bow)+');\nconst JSCI_COMPS='+JSON.stringify(out)+';\n');console.log(out.length);
