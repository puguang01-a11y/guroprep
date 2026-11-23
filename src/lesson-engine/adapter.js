/* ---- GuroPrep lesson engine adapter: look up a DepEd competency by grade/subject/term/row and build ready content ---- */
const _ALL=COMPS.map(c=>Object.assign({subj:'Mathematics'},c)).concat(JHS_COMPS.map(c=>Object.assign({subj:'Mathematics'},c)),ENG_COMPS,JENG_COMPS,SCI_COMPS,JSCI_COMPS);
const _BYROW={};
for(const c of _ALL){let key;if(c.subj==='Mathematics'&&c.g<=6)key=__MATHMAP[c.id];else{const p=c.id.split('-');key=c.g+'-'+c.t+'-'+p[p.length-1]}if(key)_BYROW[c.subj+'|'+key]=c}
function _fam(c){if(c.fam&&FAMINFO[c.fam])return FAMINFO[c.fam];if(c.sk&&SK[c.sk]&&c.subj==='Science'){const B=FAMINFO.science,a=(SCIB[c.cfg.key]||{}).act||'';return Object.assign({},B,{guided:B.guided.map(x=>x.replace('ACTIVITY',a))})}if(c.sk&&SK[c.sk])return FAMINFO[SK[c.sk].fam]||STRAND_TPL;return FAMINFO[{[MG]:'geometry',[NA]:'numbers',[DP]:'data'}[c.strand]]||STRAND_TPL}
const _txt=(c,it)=>({q:itemText(c,it),a:itemAns(c,it).a});
function build(c,seed,nq){
  seed=seed|0;nq=nq||6;const ready=!!(c.sk&&SK[c.sk]);const task=c.sk==='e_task';
  const out={id:c.id,title:c.title,subject:c.subj,grade:c.g,term:c.t,ready,task,items:{F:[],C:[],E:[],X:[]},fam:_fam(c),box:null,rubric:null,example:null};
  if(ready){const raw={};['F','C','E'].forEach((lv,i)=>raw[lv]=makeItems(c,lv,nq,seed+i*101));raw.X=task?[]:makeItems(c,'C',6,seed+999);
    for(const lv in raw)out.items[lv]=raw[lv].map(it=>_txt(c,it));
    let pid=null;for(const lv of ['C','F','E'])for(const it of raw[lv])if(!pid&&it.p&&it.p.pid)pid=it.p.pid;
    if(pid){const P=PASS.find(x=>x.id===pid);out.box={title:P.title,text:P.text,kind:'passage'}}
    else if(c.subj==='Science'&&SCIB[c.cfg.key]&&SCIB[c.cfg.key].act)out.box={title:'Hands-on activity',text:SCIB[c.cfg.key].act,kind:'activity'};
    if(task)out.rubric=SK.e_task.rubric(c.cfg);
    if(!task&&!SK[c.sk].ordered){const ex=makeItems(c,'C',1,seed+555)[0];if(ex)out.example=_txt(c,ex)}}
  const f=out.fam,fill=t=>String(t||'').replace(/\{place\}/g,place()).replace(/\{Place\}/g,place().charAt(0).toUpperCase()+place().slice(1));
  out.fam={key:fill(f.key),materials:fill(f.materials),motivation:[].concat(f.motivation||[]).map(fill),model:fill(f.model),guided:[].concat(f.guided||[]).map(fill),rule:fill(f.rule),reteach:fill(f.reteach),enrich:fill(f.enrich)};
  return out}
return{
  version:'2026-11-23',
  find:(grade,subject,term,row)=>_BYROW[subject+'|'+grade+'-'+term+'-'+row]||null,
  build,
  setPlace:p=>{CTX.place=p||''},
  count:()=>Object.keys(_BYROW).length};
