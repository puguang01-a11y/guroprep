const form=document.getElementById('pack');
const price=document.getElementById('price');
const downloads=document.getElementById('downloads');
const pesos=cents=>'₱'+(cents/100).toFixed(2);
function rewardCents(count){return count<100?0:Math.min(count,1000)*10;}
function refresh(){
  const n=downloads.valueAsNumber,p=price.valueAsNumber;
  const valid=Number.isSafeInteger(p*100)&&Number.isInteger(p)&&p>0;
  document.getElementById('reward').textContent=Number.isSafeInteger(n)&&n>=0?'Estimated cumulative reward: '+pesos(rewardCents(n)):'Enter a whole number of downloads.';
  const split=valid?'Author '+pesos(p*70)+' · GuroPrep '+pesos(p*30):'Enter a positive whole-peso price.';
  document.getElementById('split').textContent=split;
  document.getElementById('modeNote').textContent=form.elements.listing.value==='paid'?'Proposed price: '+(valid?pesos(p*100)+' per copy. ':'')+split:'Free listing · maximum cumulative reward ₱100.';
}
for(const field of [price,downloads,form.elements.listing])field.addEventListener('input',refresh);
refresh();
form.addEventListener('submit',async event=>{
  event.preventDefault();
  const status=document.getElementById('status'),button=form.querySelector('button');
  button.disabled=true;
  try {
    const f=form.elements,paid=f.listing.value==='paid',p=price.valueAsNumber;
    if(paid && (!Number.isSafeInteger(p*100)||!Number.isInteger(p)||p<1))throw Error('Set a valid whole-peso price above.');
    const file=f.resource.files[0],sample=f.sample.files[0];
    if(!/\.(pdf|docx|pptx)$/i.test(file.name)||file.size>20*1024**2||!file.size)throw Error('Choose a non-empty supported resource up to 20 MB.');
    if(sample && (!/\.(pdf|png|jpe?g)$/i.test(sample.name)||!sample.size||sample.size>5*1024**2))throw Error('Choose a sample PDF or image up to 5 MB.');
    const zip=new JSZip();
    const metadata={author:f.author.value.trim(),title:f.title.value.trim(),gradeSubject:f.gradeSubject.value.trim(),instructions:f.instructions.value.trim(),rightsNotes:f.rights.value.trim(),listing:f.listing.value,pricePHP:paid?p:0,status:'Draft for review; no rights assigned'};
    zip.file('submission.json',JSON.stringify(metadata,null,2));
    zip.file('resource/original.'+file.name.split('.').pop().toLowerCase(),await file.arrayBuffer());
    if(sample)zip.file('preview/sample.'+sample.name.split('.').pop().toLowerCase(),await sample.arrayBuffer());
    const url=URL.createObjectURL(await zip.generateAsync({type:'blob'}));
    const a=document.createElement('a');a.href=url;a.download='GuroPrep-'+(metadata.title.replace(/[^a-z0-9-]/gi,'_').slice(0,75)||'original')+'.zip';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
    status.textContent='Pack downloaded. Share the ZIP with your pilot coordinator for review. No files have been sent.';
  } catch(error){status.textContent=error.message;} finally{button.disabled=false;}
});
