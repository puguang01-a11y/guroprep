const fs=require('fs');
const load=g=>{const src=fs.readFileSync('/home/claude/guroprep/dist/grade'+g+'-curriculum.js','utf8');return eval('('+src.slice(src.indexOf('=')+1).replace(/;\s*(window[\s\S]*)?$/,'')+')')};
const out=[];const bow={};
for(let g=3;g<=6;g++){const S=load(g).Science;bow[g]=S.source;[0,1,2].forEach(t=>S.terms[t].forEach((c,i)=>out.push({id:`s${g}-${t+1}-${i}`,subj:'Science',g,t:t+1,w:String(c.section||'').replace(/\(.*?\)/g,'').trim(),title:c.label.replace(/\s+/g,' ').trim(),sk:'s_bank',cfg:{key:t===2?g+'-'+i:g+'-'+(t+1)+'-'+i}})))}
console.log(out.length);out.forEach(o=>console.log(o.id,'|',o.w,'|',o.title.slice(0,90)));
fs.writeFileSync('sci_comps.js','/* Grades 3–6 Science, all terms, competencies (GuroPrep curriculum library, DepEd Three-Term Budget of Work) */\nconst BOW_SCI='+JSON.stringify(bow)+';\nconst SCI_COMPS='+JSON.stringify(out)+';\n');
