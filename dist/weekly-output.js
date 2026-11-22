const weeklyPaper = {
  short:{label:'Short · 8.5 × 11 in',size:'8.5in 11in',w:12240,h:15840},
  long:{label:'Long · 8.5 × 13 in',size:'8.5in 13in',w:12240,h:18720},
  a4:{label:'A4',size:'210mm 297mm',w:11906,h:16838}
};
const weeklyKinds = {teacher:'Teacher plan',student:'Student worksheets',answers:'Answer key'};
function weeklyPages(entry,kind,options) {
  return entry.pack.map(item=>{
    const lines=item.teacher.split('\n');
    const boundary=lines.findIndex(line=>line.trim()==='Answer key / scoring guidance');
    const content=kind==='student'?item.student:kind==='teacher'?
      (boundary<0?item.teacher:lines.slice(0,boundary).join('\n')):
      (boundary<0?'Answer section missing. Review the edited teacher plan.':lines.slice(boundary+1).join('\n').trim());
    const date=new Date(entry.date+'T12:00:00Z');
    date.setUTCDate(date.getUTCDate()-(date.getUTCDay()+6)%7+item.day);
    return [options.school,weeklyKinds[kind],options.teacher,'Grade '+entry.settings.grade+' · '+(entry.settings.subjectOther && entry.settings.subject==='Other'?entry.settings.subjectOther:entry.settings.subject)+' · Term '+entry.settings.term,
      entry.section,date.toISOString().slice(0,10),kind==='student'?'':entry.source,content].filter(Boolean).join('\n');
  });
}
function weeklyPrintable(pages,title,paper) {
  const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  return '<!doctype html><html lang="en"><meta charset="utf-8"><title>'+escape(title)+'</title><style>@page{size:'+weeklyPaper[paper].size+';margin:16mm}body{color:black;background:white;font:11pt/1.4 Arial,sans-serif}section{white-space:pre-wrap;overflow-wrap:anywhere}section+section{break-before:page;margin-top:2em}@media print{section+section{margin-top:0}}</style><body>'+pages.map(p=>'<section>'+escape(p)+'</section>').join('')+'</body></html>';
}
async function teacherTemplate(file,pages) {
  const zip=await JSZip.loadAsync(await file.arrayBuffer());
  const path='word/document.xml',part=zip.file(path);
  if (!part) throw Error('Choose a Word .docx file.');
  const ns='http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  const doc=new DOMParser().parseFromString(await part.async('string'),'application/xml');
  const paragraphs=[...doc.getElementsByTagNameNS(ns,'p')];
  const markers=paragraphs.filter(p=>[...p.getElementsByTagNameNS(ns,'t')].map(t=>t.textContent).join('').trim()==='{{GUROPREP}}');
  if (markers.length!==1) throw Error('Put {{GUROPREP}} in one paragraph by itself in the school template.');
  const marker=markers[0];
  pages.forEach((page,i)=>page.split('\n').forEach((line,j)=>{
    const p=doc.createElementNS(ns,'w:p');
    const formatting=[...marker.children].find(child=>child.localName==='pPr');
    if(formatting)p.append(formatting.cloneNode(true));
    const run=doc.createElementNS(ns,'w:r');
    if(i && !j){const br=doc.createElementNS(ns,'w:br');br.setAttributeNS(ns,'w:type','page');run.append(br);}
    const t=doc.createElementNS(ns,'w:t');t.setAttributeNS('http://www.w3.org/XML/1998/namespace','xml:space','preserve');t.textContent=line;run.append(t);p.append(run);marker.parentNode.insertBefore(p,marker);
  }));
  marker.remove();
  zip.file(path,new XMLSerializer().serializeToString(doc));
  return zip.generateAsync({type:'uint8array',compression:'DEFLATE'});
}
