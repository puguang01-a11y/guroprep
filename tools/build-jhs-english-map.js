const fs=require('fs');
const load=g=>{const src=fs.readFileSync('/home/claude/guroprep/dist/grade'+g+'-curriculum.js','utf8');return eval('('+src.slice(src.indexOf('=')+1).replace(/;\s*(window[\s\S]*)?$/,'')+')')};
const clean=s=>s.replace(/\s+/g,' ').replace(/— \d([a-z])/g,'— $1').replace(/— a(conflict|deictic)/g,'— $1').replace(/— dplot/g,'— plot').replace(/binary opposition 2/,'binary opposition').replace(/ · -\s?/g,': ').replace(/ \/ -\s?/g,', ').replace(/: · /g,': ').trim();
const B=(key,tags,fam)=>['je_bank',tags?{key,tags}:{key},fam];
const T=(kind,fam)=>['e_task',{kind},fam];
function map(l){const m=re=>re.test(l);
 // literary
 if(m(/character vs\. character/))return B('conflict',['cc'],'je_lit');
 if(m(/character vs\. society/))return B('conflict',['cs'],'je_lit');
 if(m(/character vs\. nature/))return B('conflict',['cn'],'je_lit');
 if(m(/character vs\. self/))return B('conflict',['self'],'je_lit');
 if(m(/— characterization$/))return B('characterization',0,'je_lit');
 if(m(/— character$/))return B('character',0,'je_lit');
 if(m(/plot — linear and flashback/))return B('plot',['linear','flashback'],'je_lit');
 if(m(/plot — parallel/))return B('plot',['parallel'],'je_lit');
 if(m(/plot — episodic/))return B('plot',['episodic'],'je_lit');
 if(m(/plot — in medias res/))return B('plot',['medias'],'je_lit');
 if(m(/spectacle, dialogue, and music/))return B('drama',0,'je_lit');
 if(m(/rhyme and meter/))return B('rhyme',0,'je_lit');
 if(m(/structural context — diction/))return B('diction',0,'je_lit');
 if(m(/tone and mood/))return B('tone',0,'je_lit');
 if(m(/structural context — style/))return B('style',0,'je_lit');
 if(m(/patterns and motifs/))return B('motifs',0,'je_lit');
 if(m(/figures of speech and sound devices/))return B('figures',0,'je_lit');
 if(m(/point of view and narrative/))return B('pov',0,'je_lit');
 if(m(/organic unity/))return B('unity',0,'je_lit');
 if(m(/sign and referent/))return B('sign',0,'je_lit');
 if(m(/binary opposition/))return B('binary',0,'je_lit');
 if(m(/biographical context/))return B('biocontext',0,'je_lit');
 if(m(/historical context/))return B('histcontext',0,'je_lit');
 if(m(/sociocultural context/))return B('sociocontext',0,'je_lit');
 if(m(/psychological context/))return B('psychcontext',0,'je_lit');
 if(m(/speaker\/narrator and time/))return B('deictic',['time'],'je_lit');
 if(m(/speaker\/narrator and place/))return B('deictic',['place'],'je_lit');
 if(m(/speaker\/narrator and situation/))return B('deictic',['situation'],'je_lit');
 if(m(/co-text/))return B('cotext',0,'je_lit');
 if(m(/collocation/))return B('collocation',0,'je_lit');
 if(m(/maxims, universal truths/))return B('maxims',0,'je_lit');
 if(m(/selecting the type of literary text/))return B('litpurpose',0,'je_lit');
 if(m(/Compose literary texts/))return T('jlit_compose','je_lit');
 if(m(/Revise the literary texts for coherence/))return B('coherence',0,'je_write');
 if(m(/literary text that reflects culture: — poem\/prose/))return T('jlit_pub_poem','je_lit');
 if(m(/one-act play/))return T('jlit_pub_play','je_lit');
 if(m(/short film/))return T('jlit_pub_film','je_lit');
 // letters
 const L4=l.match(/— letter of (request|inquiry|complaint|application)$/);if(L4&&m(/distinguishing features/))return B('letterfeat',[L4[1]],'je_letter');
 if(m(/Analyze milieus/))return B('letterparts',0,'je_letter');
 if(m(/sender’s voice/))return B('voice',0,'je_letter');
 if(m(/how ethics is established/))return B('ethics',0,'je_letter');
 if(m(/purpose and meaning in writing letters/))return B('letterpurpose',0,'je_letter');
 const C4=l.match(/Compose a letter of (request|inquiry|complaint|application)/);if(C4)return T('jletter_'+C4[1],'je_letter');
 if(m(/Sending letters.*Revise for coherence and cohesion/))return B('letterrevise',0,'je_letter');
 if(m(/Edit for consistency of diction/))return B('letteredit',0,'je_letter');
 if(m(/Send correspondences/))return T('jletter_send','je_letter');
 // informational structures
 const S={'sequence':'seq','comparison':'compare','cause and effect':'cause','problem and solution':'problem','news and press':'news','— features':'feature','research report':'research','expository essay':'essay','persuasive text':'persuasive','opinion editorials':'oped','sports articles':'sports','science and technology articles':'scitech','argumentative text':'argumentative','literature review':'litreview','documentaries and vlogs':'docvlog'};
 if(m(/Examine text structures/)){for(const k in S)if(l.includes(k))return B('structure',[S[k]],'je_info');return null}
 if(m(/Examine linguistic features/))return B('lingfeat',0,'je_info');
 if(m(/discipline-specific words/))return B('discwords',0,'je_info');
 if(m(/visual elements are used/))return B('visual',0,'je_info');
 if(m(/Extract significant/))return B('extract',0,'je_info');
 if(m(/real-world issues/))return B('issues',0,'je_info');
 if(m(/supporting evidence to validate/))return B('evidence',0,'je_info');
 const F={'statements of facts':'fact','statements of opinions':'opinion','fact-based opinions':'factbased','self-evidence':'self','anecdotal evidence':'anecdotal','argument from authority':'authority','empirical evidence':'empirical'};
 if(m(/Distinguish facts from claims/)){for(const k in F)if(l.includes(k))return B('factop',[F[k]],'je_info')}
 if(m(/Evaluate claims/))return B('claims',0,'je_info');
 const P={'testimonials':'testplain','stereotyping':'stereofear','bandwagon':'bandglitter','transfer':'transferhalf','name calling':'namecard','ad nauseum':'nauseajustice'};
 if(m(/propaganda techniques/)){for(const k in P)if(l.includes(k))return B('propaganda',[P[k]],'je_info')}
 if(m(/ethos/))return B('epl',0,'je_info');
 if(m(/Draw inferences/))return B('infer',0,'je_info');
 const N={'— graphs':'graphs','— charts':'charts','infographics':'infographics','graphical organizers':'organizers','photographs':'photos','cartoons':'cartoons'};
 if(m(/non-linear texts/)){for(const k in N)if(l.includes(k))return B('nonlinear',[N[k]],'je_info')}
 if(m(/veracity/))return B('veracity',0,'je_info');
 if(m(/textual evidence/))return B('textevid',0,'je_info');
 if(m(/quality of journalistic/))return B('journal',0,'je_info');
 if(m(/Synthesize/))return B('synth',0,'je_info');
 if(m(/Identify the text type/))return B('texttype',0,'je_info');
 if(m(/Organize significant information/))return B('organize',0,'je_info');
 if(m(/thesis/))return B('thesis',0,'je_info');
 if(m(/Compose the informational text/))return T('jinfo_compose','je_info');
 if(m(/Apply multimodal elements/))return T('jinfo_mm','je_info');
 if(m(/Revise the text for coherence/))return B('coherence',0,'je_write');
 if(m(/Revise the text for cohesion/))return B('cohesion',0,'je_write');
 if(m(/Edit the text for textual consistency/))return B('consist',0,'je_write');
 if(m(/Publish a multimodal informational text/)){const tail=l.split('— ').pop();
   if(/research report/.test(tail))return T('jpub_research','je_info');if(/expository essay/.test(tail))return T('jpub_essay','je_info');if(/expository text, news/.test(tail))return T('jpub_expo','je_info');
   if(/persuasive/.test(tail))return T('jpub_persuasive','je_info');if(/opinion editorials/.test(tail))return T('jpub_journal','je_info');if(/argumentative/.test(tail))return T('jpub_argument','je_info');
   if(/literature review/.test(tail))return T('jpub_litreview','je_info');if(/documentaries/.test(tail))return T('jpub_docvlog','je_info')}
 return null}
const out=[],bow={},un=[];
for(let g=7;g<=10;g++){const E=load(g).English;bow[g]=E.source;E.terms.forEach((T,ti)=>T.forEach((c,i)=>{const lab=clean(c.label);const r=map(lab);if(!r)un.push(g+'-'+(ti+1)+'-'+i+' '+lab);const [sk,cfg,fam]=r||[null,{},null];
 const dom=c.section&&c.section.trim()?c.section.trim().toLowerCase().replace(/^./,x=>x.toUpperCase()):'Literary text';
 out.push({id:`je${g}-${ti+1}-${i}`,subj:'English',g,t:ti+1,w:dom,title:lab,sk,cfg,fam})}))}
console.log('total',out.length,'unmapped',un.length);un.forEach(u=>console.log(' U',u));
const cnt={};out.forEach(o=>{const k=o.sk==='e_task'?'task':o.sk?'ready':'none';cnt[k]=(cnt[k]||0)+1});console.log(cnt);
fs.writeFileSync('jeng_comps.js','/* Grades 7–10 English competencies (DepEd Three-Term Budget of Work) mapped to JHS English banks and tasks */\nObject.assign(BOW_ENG,'+JSON.stringify(bow)+');\nconst JENG_COMPS='+JSON.stringify(out)+';\n');
