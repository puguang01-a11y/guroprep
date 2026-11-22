const fs=require('fs');
const load=g=>{const src=fs.readFileSync('/home/claude/guroprep/dist/grade'+g+'-curriculum.js','utf8');return eval('('+src.slice(src.indexOf('=')+1).replace(/;\s*(window[\s\S]*)?$/,'')+')')};
const reg=fs.readFileSync('jhs_reg.js','utf8');const JMAP=eval('('+reg.slice(reg.indexOf('const JMAP=')+11).replace(/;\s*$/,'')+')');
const src=['jhs1.js','jhs2.js','jhs3.js','jhs4.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n');
const famOfKey=k=>{const m=src.match(new RegExp('J\\.'+k+'=\\{fam:\'(\\w+)\''));if(m)return m[1];if(/J\.\w+=J\.(\w+)/.test(src)){const mm=src.match(new RegExp('J\\.'+k+'=J\\.(\\w+)'));if(mm)return famOfKey(mm[1])}return['sampling','graphchoice','misleading','statreport'].includes(k)?'j_stat':'j_geom'};
const ST={j_geom:'Measurement and Geometry',j_trig:'Measurement and Geometry',j_stat:'Data and Probability'};
const out=[],bow={};let bad=0;
for(let g=7;g<=10;g++){const M=load(g).Mathematics;bow[g]=M.source;M.terms.forEach((T,ti)=>{const keys=JMAP[g+'-'+(ti+1)];if(!keys||keys.length!==T.length){console.log('LEN MISMATCH',g,ti+1,keys&&keys.length,T.length);bad++}
 T.forEach((c,i)=>{const k=keys[i];out.push({id:`m${g}-${ti+1}-${i}`,g,t:ti+1,w:String(c.section).replace(/^Weeks? /,'').replace(' to ','–'),strand:ST[famOfKey(k)]||'Number and Algebra',title:c.label.replace(/\s*·\s*/g,' ').replace(/\s+/g,' ').trim(),sk:'j_'+k,cfg:{}})})})}
console.log('comps',out.length,'bad',bad);
fs.writeFileSync('jhs_comps.js','/* Grades 7–10 Mathematics competencies (DepEd Three-Term Budget of Work, April 2026) mapped to JHS skills */\nObject.assign(BOW_MATH,'+JSON.stringify(bow)+');\nconst JHS_COMPS='+JSON.stringify(out)+';\n');
