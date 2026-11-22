/* ===================== GuroPrep core: math skills (no DOM) ===================== */
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const ri=(r,a,b)=>a+Math.floor(r()*(b-a+1));
const pick=(r,a)=>a[Math.floor(r()*a.length)];
const shuf=(r,a)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt=n=>Number(n).toLocaleString('en-US',{maximumFractionDigits:6});
const peso=n=>'₱'+Number(n).toLocaleString('en-US',{minimumFractionDigits:Number.isInteger(n)?0:2,maximumFractionDigits:2});
const peso2=n=>'₱'+Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const isInt=v=>Number.isFinite(v)&&Math.floor(v)===v;
const okNum=(...v)=>v.every(x=>Number.isFinite(x));
let CTX={place:''};
const place=()=>CTX.place&&CTX.place.trim()?CTX.place.trim():'our barangay';
const Place=()=>{const p=place();return p.charAt(0).toUpperCase()+p.slice(1)};
const NAMES=['Ana','Ben','Carlo','Dina','Elsa','Gino','Hana','Ivan','Joy','Kiko','Lara','Migo','Nina','Paolo','Rosa','Tess'];
const W=(a,w)=>({a,warn:w});
const BAD=w=>({a:'—',warn:w});

/* ---------- number words ---------- */
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
const w99=n=>n<20?ONES[n]:TENS[Math.floor(n/10)]+(n%10?'-'+ONES[n%10]:'');
const w999=n=>{const h=Math.floor(n/100),r=n%100;return(h?ONES[h]+' hundred'+(r?' ':''):'')+(r||!h?w99(r):'')};
function words(n){if(n===0)return'zero';const p=[];const M=Math.floor(n/1e6),T=Math.floor(n/1000)%1000,U=n%1000;if(M)p.push(w999(M)+' million');if(T)p.push(w999(T)+' thousand');if(U)p.push(w999(U));return p.join(' ')}
const ORD1=['zeroth','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth'];
const ORDT=['','','twentieth','thirtieth','fortieth','fiftieth','sixtieth','seventieth','eightieth','ninetieth'];
function ordWords(n){if(n===100)return'one hundredth';if(n<20)return ORD1[n];const t=Math.floor(n/10),o=n%10;return o?TENS[t]+'-'+ORD1[o]:ORDT[t]}
function ordNum(n){const s=n%100;if(s>=11&&s<=13)return n+'th';return n+({1:'st',2:'nd',3:'rd'}[n%10]||'th')}
const PLACES=['ones','tens','hundreds','thousands','ten thousands','hundred thousands','millions'];
const DPLACES=['tenths','hundredths','thousandths','ten-thousandths'];

/* ---------- fractions ---------- */
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a}
const lcm=(a,b)=>a/gcd(a,b)*b;
function fr(n,d){if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return{n:n/g,d:d/g}}
function ffmt(n,d,mixed=true){const f=fr(n,d);if(f.d===1)return String(f.n);if(mixed&&Math.abs(f.n)>f.d){const w=Math.trunc(f.n/f.d),r=Math.abs(f.n%f.d);return`${w} ${r}/${f.d}`}return`${f.n}/${f.d}`}
const opd=(w,n,d)=>w?(n?`${w} ${n}/${d}`:`${w}`):`${n}/${d}`;
const toImp=(w,n,d)=>({n:(w||0)*d+(n||0),d});
const FDEN={2:['half','halves'],3:['third','thirds'],4:['fourth','fourths'],5:['fifth','fifths'],6:['sixth','sixths'],7:['seventh','sevenths'],8:['eighth','eighths'],9:['ninth','ninths'],10:['tenth','tenths'],12:['twelfth','twelfths']};
const fracWords=(n,d)=>FDEN[d]?`${ONES[n]}-${n===1?FDEN[d][0]:FDEN[d][1]}`:null;

/* ---------- decimals (exact, via integers) ---------- */
const pow10=k=>Math.pow(10,k);
const dpOf=x=>{let s=String(x);if(/e/i.test(s))s=Number(x).toFixed(10);const i=s.indexOf('.');if(i<0)return 0;let k=s.length-i-1;if(k>8){s=Number(x).toFixed(8).replace(/0+$/,'');k=s.length-s.indexOf('.')-1}return k};
const sc=(x,k)=>Math.round(x*pow10(k));
function dfmt(i,k,keep){/* integer i scaled by 10^k */const neg=i<0;i=Math.abs(i);let s=String(i).padStart(k+1,'0');let a=k?s.slice(0,s.length-k)+'.'+s.slice(s.length-k):s;if(!keep&&k)a=a.replace(/\.?0+$/,'');const [ip,fp]=a.split('.');return(neg?'-':'')+Number(ip).toLocaleString('en-US')+(fp?'.'+fp:'')}
const dn=x=>dfmt(sc(x,dpOf(x)),dpOf(x));
const randDec=(r,lo,hi,k)=>ri(r,Math.round(lo*pow10(k)),Math.round(hi*pow10(k)))/pow10(k);
function decWords(x){const k=dpOf(x);const ip=Math.trunc(x);const fp=sc(x-ip,k);if(!k)return words(ip);const nm=['','tenth','hundredth','thousandth','ten-thousandth'][k];const fw=words(fp)+' '+nm+(fp===1?'':'s');return ip?`${words(ip)} and ${fw}`:fw}

/* ---------- expressions (exact rational) ---------- */
function evalExpr(src,strict){
  const s=String(src).replace(/×|x|X|\*/g,'*').replace(/÷|\//g,'/').replace(/−|–/g,'-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,m=>'^'+[...m].map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).join('')).replace(/\s+/g,'');
  let i=0;const R=(n,d=1)=>fr(n,d);
  const add=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d),sub=(a,b)=>R(a.n*b.d-b.n*a.d,a.d*b.d),mul=(a,b)=>R(a.n*b.n,a.d*b.d),div=(a,b)=>{if(b.n===0)throw'div0';const q=R(a.n*b.d,a.d*b.n);if(strict&&q.d!==1)throw'frac';return q};
  const num=()=>{let st=i;while(i<s.length&&/[0-9.]/.test(s[i]))i++;if(st===i)throw'num';const t=s.slice(st,i);const k=dpOf(t);return R(sc(parseFloat(t),k),pow10(k))};
  const atom=()=>{if(s[i]==='('){i++;const v=expr();if(s[i]!==')')throw')';i++;return v}if(s[i]==='-'){i++;const v=atom();return R(-v.n,v.d)}return num()};
  const power=()=>{let b=atom();if(s[i]==='^'){i++;const e=atom();if(e.d!==1||e.n<0||e.n>12)throw'exp';let v=R(1);for(let k=0;k<e.n;k++)v=mul(v,b);return v}return b};
  const term=()=>{let v=power();while(s[i]==='*'||s[i]==='/'){const o=s[i++];const w=power();v=o==='*'?mul(v,w):div(v,w)}return v};
  const expr=()=>{let v=term();while(s[i]==='+'||s[i]==='-'){const o=s[i++];const w=term();v=o==='+'?add(v,w):sub(v,w)}return v};
  const v=expr();if(i!==s.length)throw'end';return v;
}
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹';const sup=n=>String(n).split('').map(c=>SUP[+c]).join('');
const prettyExpr=s=>String(s).replace(/\*/g,' × ').replace(/\//g,' ÷ ').replace(/-/g,' − ').replace(/\+/g,' + ').replace(/\^(\d+)/g,(m,d)=>sup(d)).replace(/\s+/g,' ').replace(/\( /g,'(').replace(/ \)/g,')').trim();

/* ---------- helpers for whole-number generation ---------- */
const digitsOf=n=>String(Math.abs(n)).split('').map(Number);
function carries(a,b){const A=digitsOf(a).reverse(),B=digitsOf(b).reverse();let c=0,any=false;for(let i=0;i<Math.max(A.length,B.length);i++){const s=(A[i]||0)+(B[i]||0)+c;c=s>9?1:0;if(c)any=true}return any}
function borrows(a,b){const A=digitsOf(a).reverse(),B=digitsOf(b).reverse();for(let i=0;i<B.length;i++)if((A[i]||0)<B[i])return true;return false}
function uniqN(r,len){const p=shuf(r,[0,1,2,3,4,5,6,7,8,9]);if(p[0]===0)[p[0],p[1]]=[p[1],p[0]];return +p.slice(0,len).join('')}
const roundTo=(n,t)=>Math.floor((n+t/2)/t)*t;
const leadRound=n=>{if(n<10)return n;const t=pow10(String(n).length-1);return roundTo(n,t)};
const placeName=t=>({10:'ten',100:'hundred',1000:'thousand',10000:'ten thousand',100000:'hundred thousand'}[t]);
function sizeRange(max,L){/* magnitude for level */const d=String(max-1).length;const lo=L==='F'?Math.max(1,Math.floor(max/20)):Math.floor(pow10(d-1));return[lo,max]}

/* ===================== SKILLS ===================== */
const SK={};

SK.count={instr:'Write the missing numbers.',fam:'numbers',
  f:p=>p.mode==='seq'?[['start','Start'],['step','Count by'],['dir','Direction','dir']]:[['n','Number']],
  g:(r,L,c)=>{const steps=c.steps||[1];if(steps.length===1&&steps[0]===1&&L!=='F'&&r()<.5)return{mode:pick(r,['more','less']),n:ri(r,1,c.max-1)};
    const step=L==='F'?steps[0]:pick(r,steps);const dir=L==='E'&&r()<.6?-1:1;const span=step*5;const lo=dir>0?0:span,hi=dir>0?c.max-span:c.max;const start=ri(r,Math.ceil(lo/step),Math.floor(hi/step))*step;return{mode:'seq',start,step,dir}},
  t:p=>{if(p.mode==='more')return`What number is 1 more than ${fmt(p.n)}?`;if(p.mode==='less')return`What number is 1 less than ${fmt(p.n)}?`;const s=[0,1,2,3].map(k=>fmt(p.start+p.dir*p.step*k));return`Count ${p.dir>0?'up':'down'}${p.step>1?' by '+p.step+'s':''}: ${s.join(', ')}, ____, ____`},
  a:(p,c)=>{if(p.mode==='more')return W(fmt(p.n+1),p.n+1>c.max?`Goes beyond ${fmt(c.max)}`:'');if(p.mode==='less')return p.n-1<0?BAD('Below 0'):W(fmt(p.n-1));if(!okNum(p.start,p.step)||p.step<=0)return BAD('Enter a start and a step');const a=p.start+p.dir*p.step*4,b=p.start+p.dir*p.step*5;if(Math.min(a,b,p.start)<0)return BAD('Goes below 0');return W(`${fmt(a)}, ${fmt(b)}`,Math.max(a,b)>c.max?`Goes beyond ${fmt(c.max)}`:'')}};

SK.numwords={instr:'Write each number as asked.',fam:'numbers',f:[['n','Number']],
  g:(r,L,c)=>{let n;if(L==='F')n=ri(r,Math.min(11,c.max-1),Math.max(20,Math.floor(c.max/10)));else if(L==='E'&&c.max>=1000){const d=String(c.max-1).length;n=ri(r,pow10(d-1),c.max-1);const s=String(n).split('');s[ri(r,1,s.length-2)]='0';n=+s.join('')}else n=ri(r,Math.max(10,Math.floor(c.max/10)),Math.min(c.max,c.max-1));return{n,mode:L==='F'?'num':(L==='C'?'words':pick(r,['num','words']))}},
  t:p=>p.mode==='num'?`Write in numerals: ${words(p.n)}`:`Write in words: ${fmt(p.n)}`,
  a:(p,c)=>(!isInt(p.n)||p.n<0)?BAD('Enter a whole number'):W(p.mode==='num'?fmt(p.n):words(p.n),p.n>c.max?`Above ${fmt(c.max)}`:'')};

SK.represent={instr:'Fill in the blanks.',fam:'numbers',f:[['n','Number']],
  g:(r,L,c)=>({n:ri(r,L==='F'?Math.min(11,c.max-1):Math.floor(c.max/10),c.max-1),mode:L==='C'?'break':(L==='F'?'build':pick(r,['build','break']))}),
  t:p=>{const s=String(p.n),k=s.length;const parts=s.split('').map((d,i)=>`${d} ${PLACES[k-1-i]}`);if(p.mode==='build')return`${parts.join(', ')} = ____`;return`${fmt(p.n)} = `+s.split('').map((d,i)=>`____ ${PLACES[k-1-i]}`).join(', ')},
  a:p=>{if(!isInt(p.n)||p.n<1)return BAD('Enter a whole number');const s=String(p.n),k=s.length;return W(p.mode==='build'?fmt(p.n):s.split('').map((d,i)=>`${d} ${PLACES[k-1-i]}`).join(', '))}};

SK.expanded={instr:'Write each number in tens and ones.',fam:'numbers',f:[['n','Number']],
  g:(r,L,c)=>({n:ri(r,L==='F'?11:20,Math.min(99,c.max)),mode:L==='E'?'exp':'to'}),
  t:p=>p.mode==='exp'?`Write ${p.n} in expanded form: ____ + ____`:`${p.n} = ____ tens and ____ ones`,
  a:p=>(!isInt(p.n)||p.n<10||p.n>99)?BAD('Use a 2-digit number'):W(p.mode==='exp'?`${Math.floor(p.n/10)*10} + ${p.n%10}`:`${Math.floor(p.n/10)} tens and ${p.n%10} ones`)};

SK.pv={instr:'Answer each question about place value.',fam:'numbers',
  f:p=>p.mode==='digit'?[['n','Number'],['pl','Place','place']]:[['n','Number'],['d','Digit']],
  g:(r,L,c)=>{const n=uniqN(r,c.digits);const s=String(n);if(L==='F')return{mode:'digit',n,pl:ri(r,0,c.digits-1)};return{mode:L==='C'?'value':'place',n,d:+s[ri(r,0,s.length-1)]}},
  t:p=>p.mode==='digit'?`In ${fmt(p.n)}, which digit is in the ${PLACES[p.pl]} place?`:p.mode==='value'?`In ${fmt(p.n)}, what is the value of the digit ${p.d}?`:`In ${fmt(p.n)}, what is the place value of the digit ${p.d}?`,
  a:p=>{const s=String(p.n);if(!isInt(p.n)||p.n<0)return BAD('Enter a whole number');if(p.mode==='digit')return s.length<p.pl+1?BAD('The number has no digit in that place'):W(s[s.length-1-p.pl]);const idx=[...s].map((ch,i)=>ch===String(p.d)?i:-1).filter(i=>i>=0);if(!idx.length)return BAD(`The digit ${p.d} is not in the number`);if(idx.length>1)return BAD(`The digit ${p.d} appears more than once, so the question is unclear`);const pos=s.length-1-idx[0];return W(p.mode==='value'?fmt(p.d*pow10(pos)):PLACES[pos])}};

SK.cmp={instr:'Write >, <, or = on the blank.',fam:'numbers',noLine:true,f:[['a','First number'],['b','Second number']],
  g:(r,L,c)=>{const hi=c.max;if(L==='F'){const a=ri(r,1,hi);let b;do{b=ri(r,1,hi)}while(Math.abs(a-b)<hi/10&&hi>20);return{a,b}}if(L==='C'){const a=ri(r,Math.floor(hi/10),hi-1);let b=a+ri(r,-Math.max(2,Math.floor(hi/100)),Math.max(2,Math.floor(hi/100)));b=Math.max(0,Math.min(hi,b));if(r()<.12)b=a;return{a,b}}if(hi<=100){const a=ri(r,10,hi-1);return{a,b:Math.min(hi,a+ri(r,-5,5))}}const a=uniqN(r,Math.min(6,String(hi-1).length));const s=String(a).split('');const i=ri(r,1,s.length-2>0?s.length-2:1);[s[i],s[i+1]]=[s[i+1],s[i]];return{a,b:+s.join('')}},
  t:p=>`${fmt(p.a)}  ______  ${fmt(p.b)}`,a:p=>okNum(p.a,p.b)?W(p.a>p.b?'>':p.a<p.b?'<':'='):BAD('Enter two numbers')};

SK.order={instr:'Arrange the numbers as asked.',fam:'numbers',f:[['a','A'],['b','B'],['c','C'],['d','D'],['dir','Order','ord']],
  g:(r,L,c)=>{const hi=c.max;const base=L==='E'&&hi>100?ri(r,1,9)*Math.floor(hi/10):0;const span=L==='E'&&hi>100?Math.floor(hi/10):hi;const s=new Set();while(s.size<4)s.add(Math.min(hi,base+ri(r,1,span-1)));const [a,b,c2,d]=[...s];return{a,b,c:c2,d,dir:L==='F'?'asc':pick(r,['asc','desc'])}},
  t:p=>`Arrange from ${p.dir==='asc'?'smallest to largest':'largest to smallest'}: ${[p.a,p.b,p.c,p.d].map(fmt).join(';  ')}`,
  a:p=>{const v=[p.a,p.b,p.c,p.d];if(!okNum(...v))return BAD('Enter four numbers');v.sort((x,y)=>x-y);if(p.dir==='desc')v.reverse();return W(v.map(fmt).join(' ; '))}};

SK.round={instr:'Round each number as asked.',fam:'numbers',
  f:p=>p.mode==='range'?[['x','Rounded value'],['to','Round to','to']]:[['n','Number'],['to','Round to','to']],
  g:(r,L,c)=>{const to=pick(r,c.places);const hi=c.max;if(L==='E'&&r()<.5)return{mode:'range',x:ri(r,1,Math.max(1,Math.floor(hi/to)-1))*to,to};return{mode:L==='F'?'line':'plain',n:ri(r,to+1,hi-1),to}},
  t:p=>{if(p.mode==='range')return`What are the smallest and the largest whole numbers that round to ${fmt(p.x)} (nearest ${placeName(p.to)})?`;if(p.mode==='line'){const lo=Math.floor(p.n/p.to)*p.to;return`${fmt(p.n)} is between ${fmt(lo)} and ${fmt(lo+p.to)}. Which is closer? Round to the nearest ${placeName(p.to)}.`}return`Round ${fmt(p.n)} to the nearest ${placeName(p.to)}.`},
  nl:p=>p.mode==='line'?{lo:Math.floor(p.n/p.to)*p.to,hi:Math.floor(p.n/p.to)*p.to+p.to}:null,
  a:p=>{if(p.mode==='range')return(p.x%p.to||p.x<p.to)?BAD(`Use a multiple of ${fmt(p.to)}`):W(`${fmt(p.x-p.to/2)} and ${fmt(p.x+p.to/2-1)}`);return(!isInt(p.n)||p.n<0)?BAD('Enter a whole number'):W(fmt(roundTo(p.n,p.to)))}};

SK.ordinal={instr:'Answer each question.',fam:'numbers',
  f:p=>p.mode==='line'?[]:[['k','Position']],
  g:(r,L,c)=>{if(c.max<=10||L==='F'){const n=Math.min(c.max,10,ri(r,5,10));const names=shuf(r,NAMES).slice(0,n);return{mode:'line',names:names.join(','),k:ri(r,1,n)}}if(L==='C')return{mode:'after',k:ri(r,1,c.max-1)};return{mode:'words',k:ri(r,11,c.max)}},
  t:p=>p.mode==='line'?`Learners are in line: ${p.names.split(',').join(', ')} (from first to last). Who is ${ordNum(p.k)}?`:p.mode==='after'?`What position comes right after ${ordNum(p.k)}?`:`Write in words: ${ordNum(p.k)}`,
  a:(p,c)=>{if(!isInt(p.k)||p.k<1)return BAD('Enter a position from 1');if(p.mode==='line'){const n=p.names.split(',');return p.k>n.length?BAD('Not that many learners'):W(n[p.k-1])}if(p.mode==='after')return W(ordNum(p.k+1),p.k+1>c.max?`Beyond ${ordNum(c.max)}`:'');return p.k>100?BAD('Up to 100th only'):W(ordWords(p.k))}};

/* ---- addition / subtraction ---- */
function genAdd(r,L,c){const max=c.max;const lim=L==='F'?Math.min(max,max<=20?10:Math.max(20,Math.floor(max/5))):max;const need=c.regroup||'mix';for(let k=0;k<400;k++){let a,b;if(c.b1){a=ri(r,10,Math.min(99,lim-1));b=ri(r,1,9)}else if(max<=20){a=ri(r,0,lim);b=ri(r,0,lim-a)}else{const lo=Math.max(1,Math.floor(lim/10));a=ri(r,lo,lim-lo);b=ri(r,lo,Math.max(lo,lim-a))}if(a+b>max||b<0)continue;const cr=carries(a,b);if(max>20&&need==='no'&&cr)continue;if(max>20&&need==='yes'&&!cr)continue;return{a,b}}return{a:1,b:1}}
function genSub(r,L,c){const max=c.max;const lim=L==='F'?Math.min(max,max<20?10:Math.max(20,Math.floor(max/5))):max;const need=c.regroup||'mix';for(let k=0;k<400;k++){let a,b;if(c.b1){a=ri(r,10,Math.min(99,lim));b=ri(r,1,9)}else if(max<20){a=ri(r,1,lim);b=ri(r,0,a)}else{a=ri(r,Math.max(2,Math.floor(lim/10)),lim);b=ri(r,1,a-1)}if(a>max||b>a)continue;const br=borrows(a,b);if(max>=20&&need==='no'&&br)continue;if(max>=20&&need==='yes'&&!br)continue;return{a,b}}return{a:2,b:1}}
const ADDW=[(a,b,m)=>m?`${pick0(0)} has ${peso(a)} and gets ${peso(b)} more from Lola. How much money does ${pick0(0)} have now?`:`${pick0(0)} picked ${fmt(a)} mangoes. ${pick0(1)} picked ${fmt(b)} mangoes. How many mangoes did they pick in all?`,
  (a,b,m)=>m?`A sari-sari store sold goods worth ${peso(a)} in the morning and ${peso(b)} in the afternoon. How much did it sell in all?`:`${Place()} planted ${fmt(a)} trees last year and ${fmt(b)} trees this year. How many trees were planted in all?`,
  (a,b,m)=>m?`A notebook costs ${peso(a)} and a pen costs ${peso(b)}. How much do they cost together?`:`There are ${fmt(a)} boys and ${fmt(b)} girls in the school program. How many learners are there in all?`];
const SUBW=[(a,b,m)=>m?`${pick0(0)} has ${peso(a)} and buys a snack for ${peso(b)}. How much money is left?`:`${pick0(0)} had ${fmt(a)} marbles and gave ${fmt(b)} marbles to a friend. How many marbles are left?`,
  (a,b,m)=>m?`A bag costs ${peso(a)}. ${pick0(1)} has ${peso(b)}. How much more money is needed?`:`A farmer harvested ${fmt(a)} coconuts and sold ${fmt(b)}. How many coconuts were not sold?`,
  (a,b,m)=>m?`The class fund had ${peso(a)}. The class spent ${peso(b)} for cleaning materials. How much is left in the fund?`:`${Place()} needs ${fmt(a)} chairs for the fiesta. They have ${fmt(b)} chairs. How many more chairs are needed?`];
let _nm=['Ana','Ben'];const pick0=i=>_nm[i];
function withNames(p,fn){_nm=[NAMES[(p.ctx*3)%NAMES.length],NAMES[(p.ctx*5+1)%NAMES.length]];return fn()}
SK.add={instr:'Add.',fam:'operations',noLine:p=>!p.word,work:true,f:[['a','First addend'],['b','Second addend']],
  g:(r,L,c)=>{const p=genAdd(r,L,c);p.word=!!(c.word||L==='E');p.ex=!!c.expanded&&!p.word;p.ctx=ri(r,0,2);return p},
  t:(p,c)=>{if(p.word)return withNames(p,()=>ADDW[p.ctx%3](p.a,p.b,c.money));if(p.ex&&p.a<100&&p.b<100&&p.a>=10)return`${p.a} + ${p.b} = (${Math.floor(p.a/10)*10} + ${Math.floor(p.b/10)*10}) + (${p.a%10} + ${p.b%10}) = ________`;if(p.ex)return`Write each addend in expanded form, then add: ${fmt(p.a)} + ${fmt(p.b)} = ________`;return`${fmt(p.a)} + ${fmt(p.b)} = ________`},
  a:(p,c)=>{if(!okNum(p.a,p.b)||p.a<0||p.b<0)return BAD('Enter whole numbers');const s=p.a+p.b;return W(c.money&&p.word?peso(s):fmt(s),s>c.max?`The sum is more than ${fmt(c.max)}`:'')}};
SK.sub={instr:'Subtract.',fam:'operations',noLine:p=>!p.word,work:true,f:[['a','Minuend'],['b','Subtrahend']],
  g:(r,L,c)=>{const p=genSub(r,L,c);p.word=!!(c.word||L==='E');p.ex=!!c.expanded&&!p.word;p.ctx=ri(r,0,2);return p},
  t:(p,c)=>{if(p.word)return withNames(p,()=>SUBW[p.ctx%3](p.a,p.b,c.money));if(p.ex&&p.a<100)return`${p.a} − ${p.b} = (${Math.floor(p.a/10)*10} − ${Math.floor(p.b/10)*10}) + (${p.a%10} − ${p.b%10}) = ________`;return`${fmt(p.a)} − ${fmt(p.b)} = ________`},
  a:(p,c)=>{if(!okNum(p.a,p.b))return BAD('Enter whole numbers');const d=p.a-p.b;if(d<0)return BAD('The answer is negative. Swap the numbers.');return W(c.money&&p.word?peso(d):fmt(d),p.a>c.max?`Above ${fmt(c.max)}`:'')}};
SK.addsub={instr:'Add or subtract. Show your solution.',fam:'operations',noLine:p=>!p.word,work:true,f:[['a','First number'],['op','Operation','op'],['b','Second number']],
  g:(r,L,c)=>{const op=pick(r,['+','-']);const p=op==='+'?genAdd(r,L,c):genSub(r,L,{...c,max:c.max-1});p.op=op;p.word=!!(c.word||L==='E');p.ctx=ri(r,0,2);return p},
  t:(p,c)=>p.word?withNames(p,()=>(p.op==='+'?ADDW:SUBW)[p.ctx%3](p.a,p.b,c.money)):`${fmt(p.a)} ${p.op==='+'?'+':'−'} ${fmt(p.b)} = ________`,
  a:(p,c)=>{if(!okNum(p.a,p.b))return BAD('Enter whole numbers');const v=p.op==='+'?p.a+p.b:p.a-p.b;if(v<0)return BAD('The answer is negative. Swap the numbers.');return W(c.money&&p.word?peso(v):fmt(v),v>c.max?`The answer is more than ${fmt(c.max)}`:'')}};
SK.missing={instr:'Find the missing number.',fam:'operations',noLine:true,f:[['a','First number'],['b','Second number']],
  g:(r,L,c)=>{const a=ri(r,0,c.max);const b=ri(r,0,c.max-a);return{a,b,form:c.decomp?'decomp':(L==='F'?pick(r,['a+_','_+b']):pick(r,['a+_','_+b','c-_','_-b']))}},
  t:p=>{const c=p.a+p.b;return{'decomp':`${c} is ${p.a} and ____.`,'a+_':`${p.a} + ____ = ${c}`,'_+b':`____ + ${p.b} = ${c}`,'c-_':`${c} − ____ = ${p.a}`,'_-b':`____ − ${p.b} = ${p.a}`}[p.form]},
  a:(p,c)=>{if(!okNum(p.a,p.b)||p.a<0||p.b<0)return BAD('Enter whole numbers');const v={'decomp':p.b,'a+_':p.b,'_+b':p.a,'c-_':p.b,'_-b':p.a+p.b}[p.form];return W(fmt(v),p.a+p.b>c.max?`The total is more than ${c.max}`:'')}};
SK.numsentence={instr:'Complete each number sentence.',fam:'operations',noLine:true,f:[['a','a'],['b','b'],['c','c']],
  g:(r,L,c)=>{const form=pick(r,c.props);const m=c.max;let a=ri(r,1,Math.floor(m/2)),b=ri(r,1,Math.floor(m/2)),cc=ri(r,1,Math.floor(m/3));if(form==='equiv')cc=ri(r,0,a+b);if(form==='equivsub'){a=ri(r,5,m);b=ri(r,0,a);cc=ri(r,a-b,m)}return{a,b,c:cc,form}},
  t:p=>({zero:`${p.a} + 0 = ____`,comm:`${p.a} + ${p.b} = ${p.b} + ____`,assoc:`(${p.a} + ${p.b}) + ${p.c} = ${p.a} + (${p.b} + ____)`,equiv:`${p.a} + ${p.b} = ${p.c} + ____`,equivsub:`${p.a} − ${p.b} = ${p.c} − ____`,commx:`${p.a} × ${p.b} = ${p.b} × ____`}[p.form]),
  a:p=>{if(!okNum(p.a,p.b,p.c))return BAD('Enter numbers');const v={zero:p.a,comm:p.a,assoc:p.c,equiv:p.a+p.b-p.c,equivsub:p.c-(p.a-p.b),commx:p.a}[p.form];return v<0?BAD('No whole-number answer. Change the numbers.'):W(fmt(v))}};
SK.est={instr:'Estimate. Use the rounding rule in each item.',fam:'operations',work:true,f:[['a','First number'],['b','Second number']],
  g:(r,L,c)=>{const op=c.op==='+-'?pick(r,['+','-']):c.op;if(op==='+'||op==='-'){const d=c.digits;const lo=d>=5?10000:1000,hi=d>=5?999999:9999;for(let k=0;k<200;k++){const a=ri(r,lo,hi),b=ri(r,lo,hi);const A=Math.max(a,b),B=Math.min(a,b);if(op==='+'&&A+B>(d>=5?1000000:10000))continue;return{op,a:op==='-'?A:A,b:B}}return{op,a:5000,b:2000}}
    if(op==='×'){if(c.big){const a=ri(r,100,9999),b=ri(r,10,99);if(leadRound(a)*leadRound(b)>=1000000)return{op,a:ri(r,100,999),b};return{op,a,b}}const a=ri(r,15,994),b=r()<.5?ri(r,2,9):ri(r,11,94);return{op,a,b}}
    const B=c.big?pick(r,[3,4,5,6,7,8,9,20,30,40,50,60]):pick(r,[2,3,4,5,6,7,8,9,10,20,30]);const step=10/gcd(B,10);const lo=c.big?Math.ceil(100/B):Math.ceil(20/B),hi=c.big?Math.floor(9990/B):Math.floor(990/B);const q=Math.max(step,Math.round(ri(r,lo,hi)/step)*step);const A0=B*q;const A=A0+ri(r,-4,4);const Bv=B>10?B+ri(r,-4,4):B;return{op:'÷',a:A,b:Bv}},
  t:(p,c)=>{const S={'+':'add','-':'subtract','×':'multiply','÷':'divide'}[p.op];const rule=(p.op==='+'||p.op==='-')?'Round each number to its greatest place value':(p.op==='×'?(c.big?'Round each factor to its greatest place value':'Round each factor to the nearest ten (keep 1-digit numbers)'):'Round the dividend and the divisor to the nearest ten (keep 1-digit divisors)');return`${rule}, then ${S}: ${fmt(p.a)} ${p.op==='-'?'−':p.op} ${fmt(p.b)}`},
  a:(p,c)=>{if(!okNum(p.a,p.b)||p.a<=0||p.b<=0)return BAD('Enter positive whole numbers');let A,B;if(p.op==='+'||p.op==='-'||(p.op==='×'&&c.big)){A=leadRound(p.a);B=leadRound(p.b)}else{A=p.a<10?p.a:roundTo(p.a,10);B=p.b<10?p.b:roundTo(p.b,10)}const sym=p.op==='-'?'−':p.op;let v;if(p.op==='+')v=A+B;else if(p.op==='-')v=A-B;else if(p.op==='×')v=A*B;else{if(B===0)return BAD('Divisor rounds to 0');v=A/B;if(!isInt(v))return W(`${fmt(A)} ÷ ${fmt(B)} ≈ ${fmt(Math.round(v))}`,'The rounded numbers do not divide evenly. Pick other numbers for a cleaner estimate.')}return W(`${fmt(A)} ${sym} ${fmt(B)} = ${fmt(v)}`,v<0?'Negative estimate':'')}};

/* ---- multiplication / division ---- */
SK.mult_table={instr:'Multiply.',fam:'multdiv',noLine:p=>!p.word,f:[['a','Table'],['b','Times']],
  g:(r,L,c)=>({a:pick(r,c.tables),b:ri(r,L==='F'?1:2,10),mode:L==='F'?'rep':(c.word||L==='E'?'word':'plain'),ctx:ri(r,0,2)}),
  t:(p,c)=>{if(p.mode==='rep')return`${Array(Math.max(1,Math.min(10,p.b))).fill(p.a).join(' + ')} = ${p.b} × ${p.a} = ____`;if(p.mode==='word')return[`One pack has ${p.a} pandesal. How many pandesal are in ${p.b} packs?`,`A pencil costs ${peso(p.a)}. How much do ${p.b} pencils cost?`,`There are ${p.b} tables. Each table has ${p.a} chairs. How many chairs in all?`][p.ctx%3];return`${p.b} × ${p.a} = ____`},
  a:p=>okNum(p.a,p.b)?W(p.mode==='word'&&p.ctx%3===1?peso(p.a*p.b):fmt(p.a*p.b)):BAD('Enter numbers')};
SK.equal_groups={instr:'Answer each item.',fam:'multdiv',f:[['g','Groups'],['n','In each group']],
  g:(r,L,c)=>({g:ri(r,2,L==='F'?5:9),n:ri(r,2,L==='F'?5:9),mode:L==='F'?'groups':(L==='C'?'threes':'write')}),
  t:p=>{if(p.mode==='groups')return`${p.g} groups of ${p.n} = ____`;if(p.mode==='threes'){const w=ONES[p.n];return`${p.g} ${w==='six'?'sixes':w+'s'} = ____`}return`Write as repeated addition and as multiplication: ${p.g} groups of ${p.n}`},
  a:p=>{if(!isInt(p.g)||!isInt(p.n)||p.g<1||p.n<1||p.n>19)return BAD('Use whole numbers (1–19 in each group)');const t=p.g*p.n;return W(p.mode==='write'?`${Array(Math.min(p.g,12)).fill(p.n).join(' + ')} = ${t}; ${p.g} × ${p.n} = ${t}`:fmt(t))}};
SK.div_table={instr:'Divide.',fam:'multdiv',noLine:p=>p.mode==='plain'||p.mode==='inv',f:[['A','Dividend'],['a','Divisor']],
  g:(r,L,c)=>{const a=pick(r,c.tables),q=ri(r,L==='F'?1:2,10);let mode=c.word||L==='E'?'word':'plain';if(L==='F')mode=c.inverse?'inv':(c.repsub?'rep':'share');if(c.inverse&&L==='C')mode='inv';return{A:a*q,a,mode,ctx:ri(r,0,2)}},
  t:p=>{if(p.mode==='share')return`${fmt(p.A)} mangoes are shared equally by ${p.a} children. How many mangoes does each child get?`;if(p.mode==='rep')return`Start at ${p.A}. Subtract ${p.a} again and again until you reach 0. How many times did you subtract? (${p.A} ÷ ${p.a} = ____)`;if(p.mode==='inv')return`Since ${p.a} × ${p.A/p.a} = ${p.A}, then ${p.A} ÷ ${p.a} = ____`;if(p.mode==='word')return[`${p.A} learners are grouped into ${p.a} equal teams. How many learners are in each team?`,`${Place()} has ${peso(p.A)} to buy ${p.a} equal gifts. How much is each gift?`,`A rope ${p.A} m long is cut into ${p.a} equal pieces. How long is each piece?`][p.ctx%3];return`${p.A} ÷ ${p.a} = ____`},
  a:p=>{if(!okNum(p.A,p.a)||p.a<=0)return BAD('Enter numbers; divisor must be more than 0');const q=p.A/p.a;if(!isInt(q))return BAD('Does not divide evenly. Change the numbers.');return W(p.mode==='word'&&p.ctx%3===1?peso(q):p.mode==='word'&&p.ctx%3===2?q+' m':fmt(q))}};
SK.missing_md={instr:'Find the missing number.',fam:'multdiv',noLine:true,f:[['a','Table'],['b','Other factor']],
  g:(r,L,c)=>({a:pick(r,c.tables),b:ri(r,2,10),form:pick(r,['_xb','ax_','c/_','_/a'])}),
  t:p=>{const c=p.a*p.b;return{'_xb':`____ × ${p.b} = ${c}`,'ax_':`${p.a} × ____ = ${c}`,'c/_':`${c} ÷ ____ = ${p.b}`,'_/a':`____ ÷ ${p.a} = ${p.b}`}[p.form]},
  a:p=>okNum(p.a,p.b)?W(fmt({'_xb':p.a,'ax_':p.b,'c/_':p.a,'_/a':p.a*p.b}[p.form])):BAD('Enter numbers')};
SK.evenodd={instr:'Write even or odd.',fam:'multdiv',f:[['n','Number']],
  g:(r,L,c)=>({n:ri(r,L==='F'?1:10,c.max),mode:L==='E'?'why':'plain'}),
  t:p=>p.mode==='why'?`Divide ${p.n} by 2. Is ${p.n} even or odd? Explain.`:`Is ${p.n} even or odd?`,
  a:p=>{if(!isInt(p.n)||p.n<0)return BAD('Enter a whole number');const e=p.n%2===0;return W(p.mode==='why'?`${e?'Even':'Odd'}: ${p.n} ÷ 2 = ${Math.floor(p.n/2)}${e?' with no remainder':' remainder 1'}`:(e?'even':'odd'))}};
SK.mult_props={instr:'Complete each number sentence.',fam:'multdiv',noLine:true,f:[['a','a'],['b','b'],['c','c']],
  g:(r,L,c)=>({a:pick(r,[6,7,8,9]),b:ri(r,2,9),c:ri(r,2,9),form:pick(r,L==='F'?['one','zero','comm']:L==='C'?['comm','assoc','one','zero']:['dist','assoc','dist'])}),
  t:p=>({one:`1 × ${p.a} = ____`,zero:`${p.a} × 0 = ____`,comm:`${p.a} × ${p.b} = ${p.b} × ____`,assoc:`(${p.a} × ${p.b}) × ${p.c} = ${p.a} × (${p.b} × ____)`,dist:`${p.a} × (${p.b} + ${p.c}) = (${p.a} × ${p.b}) + (${p.a} × ____)`}[p.form]),
  a:p=>okNum(p.a,p.b,p.c)?W(fmt({one:p.a,zero:0,comm:p.a,assoc:p.c,dist:p.c}[p.form])):BAD('Enter numbers')};
SK.mult={instr:'Multiply. Show your solution.',fam:'multdiv',work:true,noLine:p=>!p.word,f:[['a','First factor'],['b','Second factor']],
  g:(r,L,c)=>{let a,b;const word=c.word||L==='E';if(c.mode==='g3'){if(L!=='F'&&r()<.4){b=pick(r,[10,20,30,40,50,60,70,80,90,100,200,300,400,500,600,700,800]);a=ri(r,12,Math.min(9999,Math.floor(10000/b)))}else{b=ri(r,2,9);a=ri(r,12,999);if(L==='F'){for(let k=0;k<100;k++){a=ri(r,11,444);if(digitsOf(a).every(d=>d*b<10))break}}}}else{if(L==='F'||r()<.5){a=ri(r,100,9999);b=ri(r,2,9)}else{a=ri(r,10,999);b=ri(r,11,99)}if(a*b>1000000)a=Math.floor(1000000/b)}return{a,b,word,ctx:ri(r,0,2)}},
  t:p=>p.word?[`A sack of rice costs ${peso(p.a)}. How much do ${p.b} sacks cost?`,`Each box has ${fmt(p.a)} sheets of paper. How many sheets are in ${p.b} boxes?`,`A jeepney travels ${fmt(p.a)} meters in one trip. How far does it travel in ${p.b} trips?`][p.ctx%3]:`${fmt(p.a)} × ${fmt(p.b)} = ________`,
  a:(p,c)=>{if(!okNum(p.a,p.b)||p.a<0||p.b<0)return BAD('Enter whole numbers');const v=p.a*p.b;const lim=c.mode==='g3'?10000:1000000;return W(p.word&&p.ctx%3===0?peso(v):p.word&&p.ctx%3===2?fmt(v)+' meters':fmt(v),v>lim?`The product is more than ${fmt(lim)}`:'')}};
SK.div={instr:'Divide. Write the remainder if there is one (example: 25 R 3).',fam:'multdiv',work:true,noLine:p=>!p.word,f:[['A','Dividend'],['b','Divisor']],
  g:(r,L,c)=>{const word=!!c.word||L==='E';let A,b;const m=c.mode;if(m==='g3'||m==='g3exact'){const k=m==='g3exact'?0:ri(r,0,2);if(k===0){b=ri(r,2,9);const q=ri(r,L==='F'?3:11,Math.floor(999/b));A=b*q}else if(k===1){b=ri(r,2,9);A=ri(r,11,99);if(A%b===0)A++}else{b=pick(r,[10,100,1000]);const q=ri(r,2,Math.floor(9999/b));A=b*q}}else{if(L==='F'||r()<.5){b=ri(r,2,9);A=ri(r,100,9999)}else{b=ri(r,11,99);A=ri(r,Math.max(100,b*2),999)}if(L==='F')A=A-A%b}return{A,b,word,ctx:ri(r,0,2)}},
  t:p=>p.word?[`${Place()} has ${fmt(p.A)} kg of rice to pack equally into ${p.b} sacks. How many kilograms go in each sack? How many kilograms are left over?`,`${fmt(p.A)} learners will ride ${p.b} buses equally. How many learners ride each bus? How many are left?`,`A school has ${peso(p.A)} to share equally among ${p.b} classrooms. How much does each get? How much is left?`][p.ctx%3]:`${fmt(p.A)} ÷ ${fmt(p.b)} = ________`,
  a:p=>{if(!okNum(p.A,p.b)||p.b<=0||p.A<0)return BAD('Enter whole numbers; divisor more than 0');const q=Math.floor(p.A/p.b),rm=p.A%p.b;return W(rm?`${fmt(q)} R ${rm}`:fmt(q))}};
SK.multistep={instr:'Solve. Write the number sentence and the answer.',fam:'operations',work:true,
  f:p=>[['a','a'],['b','b'],['c','c']],
  g:(r,L,c)=>{const ctx=ri(r,0,2);const big=c.max>=100000;let a,b,cc;if(ctx===0){a=ri(r,2,big?20:9);b=ri(r,big?1000:20,big?20000:250);cc=Math.ceil((a*b+ri(r,1,big?20000:300))/(big?1000:50))*(big?1000:50)}else if(ctx===1){a=ri(r,2,big?30:6);b=ri(r,20,big?45:30);cc=ri(r,2,big?12:5)}else{cc=ri(r,2,big?12:6);const q=ri(r,big?2000:20,big?30000:200);const tot=cc*q;a=ri(r,Math.floor(tot*0.3),Math.floor(tot*0.7));b=tot-a}return{ctx,a,b,c:cc,sentence:!!c.sentence}},
  t:p=>[`${withNames(p,()=>pick0(0))} bought ${p.a} sacks of rice at ${peso(p.b)} each and paid with ${peso(p.c)}. How much is the change?`,`A school has ${p.a} classes with ${p.b} learners each. Each learner gets ${p.c} pencils. How many pencils are needed?`,`${Place()} collected ${peso(p.a)} on Saturday and ${peso(p.b)} on Sunday for the school fund. The money is shared equally among ${p.c} classrooms. How much does each classroom get?`][p.ctx],
  a:p=>{if(!okNum(p.a,p.b,p.c))return BAD('Enter numbers');if(p.ctx===0){const v=p.c-p.a*p.b;return v<0?BAD('Not enough money. Increase the amount paid.'):W(`${fmt(p.c)} − (${p.a} × ${fmt(p.b)}) = ${fmt(v)}; change is ${peso(v)}`)}if(p.ctx===1){const v=p.a*p.b*p.c;return W(`${p.a} × ${p.b} × ${p.c} = ${fmt(v)} pencils`,v>1000000?'Over 1,000,000':'')}if(p.c<=0)return BAD('Classrooms must be more than 0');const v=(p.a+p.b)/p.c;return isInt(v)?W(`(${fmt(p.a)} + ${fmt(p.b)}) ÷ ${p.c} = ${fmt(v)}; ${peso(v)} each`):BAD('Does not share evenly. Change the numbers.')}};
SK.mdas={instr:'Find the value. Follow the order of operations.',fam:'operations',noLine:true,work:true,f:[['expr','Expression','text']],
  g:(r,L,c)=>{const m=c.mode;let e;
    if(m==='addsub'){const n=L==='F'?3:ri(r,3,4);for(let k=0;k<100;k++){const v=[ri(r,10,99)];let s=String(v[0]),t=v[0],ok=true;for(let i=1;i<n;i++){const x=ri(r,5,99);const op=r()<.5?'+':'-';if(op==='-'&&t-x<0){ok=false;break}t=op==='+'?t+x:t-x;s+=op+x}if(ok){e=s;break}}if(!e)e='45+12-30';}
    else if(m==='decimal'){for(let k=0;k<50;k++){const a=randDec(r,1,20,1),b=randDec(r,0.5,5,1),cc=ri(r,2,6),d=randDec(r,0.1,3,1);const s=pick(r,[`${a}+${b}*${cc}`,`${a}*${cc}-${d}`,`(${a}+${b})*${cc}`,`${a}+${b}*${cc}-${d}`]);if(evalExpr(s).n>=0){e=s;break}}if(!e)e='2.5+1.5*2'}
    else{const T=m==='mdas'?['a+b*c','a-b/c','a*b-c/d','a+b*c-d','a/b+c*d']:m==='gmdas'?['(a+b)*c','a*(b-c)+d','(a+b)/c*d','a-(b+c)/d','(a+b)*(c-d)']:['b^2+a*c','(a+b)^2-c','a^3/a+b','c*b^2-a','(b+c)^2/c'];
      for(let k=0;k<300;k++){const t=pick(r,L==='F'?T.slice(0,2):T);const v={a:ri(r,2,m==='gemdas'?5:20),b:ri(r,2,m==='gemdas'?6:12),c:ri(r,2,9),d:ri(r,2,9)};const s=t.replace(/[abcd]/g,x=>v[x]);try{const R=evalExpr(s,true);if(R.d!==1||R.n<0||R.n>100000)continue;e=s;break}catch(err){}}if(!e)e='12+3*4'}
    return{expr:prettyExpr(e),mode:m}},
  t:p=>`${p.expr} = ________`,
  a:(p,c)=>{let v;try{v=evalExpr(p.expr)}catch(e){return BAD('Check the expression (use + − × ÷ ^ and parentheses)')}if(c.mode==='decimal'){const k=[0,1,2,3,4,5,6].find(k=>(v.n*pow10(k))%v.d===0);if(k===undefined)return W(ffmt(v.n,v.d,false),'The answer is not a terminating decimal');return W(dfmt(v.n*pow10(k)/v.d,k),v.n<0?'The answer is negative':'')}if(v.d!==1)return W(ffmt(v.n,v.d),'The answer is not a whole number');return W(fmt(v.n),v.n<0?'The answer is negative':'')}};
SK.exp_form={instr:'Answer each item.',fam:'operations',f:[['b','Base'],['e','Exponent']],
  g:(r,L,c)=>({b:ri(r,2,L==='F'?5:10),e:ri(r,2,L==='F'?3:5),mode:L==='E'?'rev':pick(r,['to','rev'])}),
  t:p=>p.mode==='to'?`Write in exponential form: ${Array(Math.max(1,Math.min(12,p.e))).fill(p.b).join(' × ')}`:`Write as repeated multiplication: ${p.b}${sup(p.e)}`,
  a:p=>(!isInt(p.b)||!isInt(p.e)||p.e<1||p.e>12)?BAD('Use whole numbers (exponent 1–12)'):W(p.mode==='to'?`${p.b}${sup(p.e)}`:Array(p.e).fill(p.b).join(' × '))};
SK.exp_value={instr:'Give the value.',fam:'operations',noLine:true,f:[['b','Base'],['e','Exponent']],
  g:(r,L,c)=>{const b=ri(r,2,L==='F'?5:10);const e=b>=7?2:ri(r,2,L==='F'?3:4);return{b,e}},
  t:p=>`${p.b}${sup(p.e)} = ________`,a:p=>(!isInt(p.b)||!isInt(p.e)||p.e<0||p.e>12)?BAD('Use whole numbers'):W(fmt(Math.pow(p.b,p.e)))};

/* ---- money ---- */
const DENOM=[1,5,10,20,50,100,200,500,1000];
const dname=d=>d>=20&&d!==20?`${peso(d)} bill`:(d===20?`${peso(d)} bill`:`${peso(d)} coin`);
SK.money_count={instr:'Find the total amount.',fam:'money',f:[['c1','How many'],['d1','Peso value','denom'],['c2','How many'],['d2','Peso value','denom']],
  g:(r,L,c)=>{const ds=DENOM.filter(d=>d<=c.max/2||d===c.max&&L!=='F');for(let k=0;k<200;k++){const d1=pick(r,ds),d2=L==='F'?0:pick(r,ds.filter(x=>x!==d1));const c1=ri(r,1,5),c2=d2?ri(r,1,5):0;const tot=c1*d1+c2*d2;if(tot<=c.max&&tot>0)return{c1,d1,c2,d2,mode:L==='E'?'enough':'total',price:roundTo(tot+ri(r,-Math.floor(tot/2),Math.floor(tot/2)),5)||5}}return{c1:2,d1:5,c2:0,d2:0,mode:'total',price:10}},
  t:p=>{const parts=[`${p.c1} piece${p.c1>1?'s':''} of ${dname(p.d1)}`];if(p.d2&&p.c2)parts.push(`${p.c2} piece${p.c2>1?'s':''} of ${dname(p.d2)}`);const s=parts.join(' and ');return p.mode==='enough'?`You have ${s}. Is it enough to buy a toy that costs ${peso(p.price)}? How much do you have?`:`How much money is ${s}?`},
  a:(p,c)=>{if(!DENOM.includes(p.d1)||(p.d2&&!DENOM.includes(p.d2)))return BAD('Use a real peso coin or bill value');const t=p.c1*p.d1+(p.d2?p.c2*p.d2:0);return W(p.mode==='enough'?`${peso(t)}; ${t>=p.price?'Yes, it is enough':'No, not enough'}`:peso(t),t>c.max?`More than ${peso(c.max)}`:'')}};
SK.money_cmp={instr:'Answer each item.',fam:'money',f:[['c1','How many'],['d1','Peso value','denom'],['c2','How many'],['d2','Peso value','denom']],
  g:(r,L,c)=>{const ds=DENOM.filter(d=>d<=c.max);if(L==='E'){const big=pick(r,ds.filter(d=>d>=10)),small=pick(r,ds.filter(d=>d<big&&big%d===0));return{mode:'howmany',c1:1,d1:big,c2:0,d2:small}}for(let k=0;k<200;k++){const d1=pick(r,ds),d2=pick(r,ds);if(d1===d2)continue;const c1=ri(r,1,5),c2=ri(r,1,5);if(c1*d1<=c.max&&c2*d2<=c.max)return{mode:'cmp',c1,d1,c2,d2}}return{mode:'cmp',c1:2,d1:5,c2:1,d2:10}},
  t:p=>p.mode==='howmany'?`How many ${dname(p.d2)}s make ${peso(p.d1)}?`:`Which is more: ${p.c1} × ${dname(p.d1)} or ${p.c2} × ${dname(p.d2)}? Or are they equal?`,
  a:p=>{if(!DENOM.includes(p.d1)||!DENOM.includes(p.d2))return BAD('Use a real peso coin or bill value');if(p.mode==='howmany'){const v=p.d1/p.d2;return isInt(v)?W(fmt(v)):BAD('Does not divide evenly')}const x=p.c1*p.d1,y=p.c2*p.d2;return W(x>y?`${p.c1} × ${dname(p.d1)} (${peso(x)} > ${peso(y)})`:x<y?`${p.c2} × ${dname(p.d2)} (${peso(y)} > ${peso(x)})`:`Equal (${peso(x)})`)}};
SK.money_words={instr:'Write each amount as asked.',fam:'money',f:[['v','Amount (₱)']],
  g:(r,L,c)=>{const pes=ri(r,L==='F'?10:100,c.max-1);const cen=L==='F'?0:pick(r,[0,25,50,75,ri(r,1,99)]);return{v:pes+cen/100,mode:L==='F'?'sym':L==='C'?'words':pick(r,['words','cent'])}},
  t:p=>{if(p.mode==='sym'){const pes=Math.floor(p.v);return`Write using the peso sign (₱): ${words(pes)} pesos`}if(p.mode==='cent'){const cen=Math.round((p.v%1)*100)||50;return`Write ${words(cen)} centavos using the centavo sign (¢).`}return`Write in words: ${peso2(p.v)}`},
  a:p=>{if(!okNum(p.v)||p.v<0)return BAD('Enter an amount');const pes=Math.floor(p.v+1e-9),cen=Math.round((p.v-pes)*100);if(p.mode==='sym')return W(peso2(pes));if(p.mode==='cent')return W(`${cen||50}¢`);return W(`${words(pes)} peso${pes===1?'':'s'}${cen?` and ${words(cen)} centavo${cen===1?'':'s'}`:''}`)}};

/* ---- time ---- */
const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const MDAYS=[31,28,31,30,31,30,31,31,30,31,30,31];
const t12=(h24,m)=>{const ap=h24<12?'a.m.':'p.m.';let h=h24%12;if(h===0)h=12;return`${h}:${String(m).padStart(2,'0')} ${ap}`};
const t24=(h,m)=>`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
SK.clock={instr:'Tell the time.',fam:'time',f:[['h','Hour (1–12)'],['m','Minutes']],
  g:(r,L,c)=>{const ap=c.mode==='minutes'?pick(r,['morning','afternoon','evening']):'';const h=ap==='morning'?ri(r,6,11):ap==='afternoon'?pick(r,[12,1,2,3,4,5]):ap==='evening'?ri(r,6,9):ri(r,1,12);let m=c.mode==='quarter'?pick(r,L==='F'?[0,30]:[0,15,30,45]):ri(r,0,11)*5;return{h,m,mode:L==='E'?'rev':'read',ap}},
  t:p=>{const nx=p.h%12+1;if(p.mode==='rev')return`Where does the minute hand point at ${p.h}:${String(p.m).padStart(2,'0')}? Where is the hour hand?`;const hh=p.m===0?`points to ${p.h}`:(p.m<=20?`is just past ${p.h}`:p.m>=40?`is almost at ${nx}`:`is between ${p.h} and ${nx}`);const mh=p.m===0?'12':String(p.m/5);return`The hour hand ${hh}. The minute hand points to ${mh}.${p.ap?` It is in the ${p.ap}.`:''} What time is it?`},
  a:p=>{if(!isInt(p.h)||p.h<1||p.h>12||!isInt(p.m)||p.m<0||p.m>59||p.m%5)return BAD('Hour 1–12; minutes 0–55 in steps of 5');const mm=String(p.m).padStart(2,'0');if(p.mode==='rev'){const nx=p.h%12+1;return W(`Minute hand on ${p.m===0?12:p.m/5}; hour hand ${p.m===0?'on '+p.h:p.m>=40?'almost at '+nx:'between '+p.h+' and '+nx}`)}const ap=p.ap==='morning'?(p.h===12?' p.m.':' a.m.'):p.ap?' p.m.':'';const extra=!p.ap&&p.m===30?` (half past ${p.h})`:!p.ap&&p.m===15?` (quarter past ${p.h})`:'';return W(`${p.h}:${mm}${ap}${extra}`,p.ap==='evening'&&p.h<6?'Evening times are usually after 6:00':'')}};
SK.days_months={instr:'Answer each question.',fam:'time',f:[],
  g:(r,L,c)=>({mode:pick(r,L==='F'?['dayafter','daybefore']:['dayafter','daybefore','monthafter','monthbefore','nthmonth']),i:ri(r,0,11)}),
  t:p=>{const d=DAYS[p.i%7],m=MONTHS[p.i];return{dayafter:`What day comes after ${d}?`,daybefore:`What day comes before ${d}?`,monthafter:`What month comes after ${m}?`,monthbefore:`What month comes before ${m}?`,nthmonth:`What is the ${ordWords(p.i+1)} month of the year?`}[p.mode]},
  a:p=>W({dayafter:DAYS[(p.i%7+1)%7],daybefore:DAYS[(p.i%7+6)%7],monthafter:MONTHS[(p.i+1)%12],monthbefore:MONTHS[(p.i+11)%12],nthmonth:MONTHS[p.i]}[p.mode])};
SK.calendar={instr:'Use a calendar to answer.',fam:'time',f:[['k','Number']],
  g:(r,L,c)=>({mode:pick(r,L==='F'?['daysfrom','weeks']:['daysfrom','weeks','monthdays','months']),i:ri(r,0,6),k:ri(r,1,L==='F'?6:20),m:ri(r,0,11)}),
  t:p=>({daysfrom:`Today is ${DAYS[p.i]}. What day will it be ${p.k} day${p.k>1?'s':''} from today?`,weeks:`How many days are in ${p.k} week${p.k>1?'s':''}?`,monthdays:`How many days are in ${MONTHS[p.m]}? (not a leap year)`,months:`How many months are in ${p.k} year${p.k>1?'s':''}?`}[p.mode]),
  a:p=>{if(!isInt(p.k)||p.k<0)return BAD('Enter a whole number');return W({daysfrom:DAYS[(p.i+p.k)%7],weeks:fmt(7*p.k),monthdays:String(MDAYS[p.m]),months:fmt(12*p.k)}[p.mode])}};
SK.elapsed={instr:'Solve. Show your solution.',fam:'time',work:true,
  f:p=>p.mode==='days'?[['d1','Start date'],['d2','End date']]:[['sh','Start hour (0–23)'],['sm','Start minutes'],['dh','Hours'],['dm','Minutes']],
  g:(r,L,c)=>{if(c.mode==='days'){const m=ri(r,0,11);const d1=ri(r,1,MDAYS[m]-20);return{mode:'days',m,d1,d2:d1+7*ri(r,1,2)+(L==='E'?ri(r,1,6):0)}}if(c.mode==='g1'){const sh=ri(r,7,15),sm=pick(r,[0,30]);return{mode:'g1',sh,sm,dh:0,dm:pick(r,[15,30,60]),ask:'end'}}const sh=ri(r,6,18),sm=ri(r,0,11)*5;return{mode:'hm',sh,sm,dh:ri(r,0,L==='F'?1:3),dm:pick(r,L==='F'?[15,30,45]:[5,10,15,20,25,35,40,45,50,55]),ask:L==='E'?'dur':'end'}},
  t:p=>{if(p.mode==='days')return`A school project starts on ${MONTHS[p.m]} ${p.d1} and ends on ${MONTHS[p.m]} ${p.d2}. How many days pass from the start date to the end date? Is that more or less than 2 weeks?`;const st=t12(p.sh,p.sm);const dur=(p.dh?`${p.dh} hour${p.dh>1?'s':''}`:'')+(p.dh&&p.dm?' and ':'')+(p.dm?`${p.dm} minutes`:'');if(p.ask==='dur'){const e=(p.sh*60+p.sm+p.dh*60+p.dm)%1440;return`A bus left ${place()} at ${st} and arrived at ${t12(Math.floor(e/60),e%60)}. How long was the trip?`}return[`Recess starts at ${st} and lasts ${dur}. What time does it end?`,`A basketball game starts at ${st} and lasts ${dur}. What time does it end?`][p.sm%2]},
  a:p=>{if(p.mode==='days'){if(!isInt(p.d1)||!isInt(p.d2)||p.d2<p.d1)return BAD('End date must be after the start date');if(p.d2>MDAYS[p.m])return BAD(`${MONTHS[p.m]} has only ${MDAYS[p.m]} days`);const n=p.d2-p.d1;return W(`${n} days (${n>14?'more than':n===14?'exactly':'less than'} 2 weeks)`)}
    if(![p.sh,p.sm,p.dh,p.dm].every(isInt)||p.sh<0||p.sh>23||p.sm<0||p.sm>59)return BAD('Check the hours and minutes');const e=(p.sh*60+p.sm+p.dh*60+p.dm);if(p.ask==='dur')return W(`${p.dh?p.dh+' h ':''}${p.dm} min`);return W(t12(Math.floor(e/60)%24,e%60),e>=1440?'Goes past midnight':'')}};
const TPAIR={'s-min':['seconds','minutes',60],'min-h':['minutes','hours',60],'h-d':['hours','days',24],'d-wk':['days','weeks',7],'mo-yr':['months','years',12]};
SK.time_conv={instr:'Convert.',fam:'time',noLine:true,f:[['v','Value']],
  g:(r,L,c)=>{const pr=pick(r,c.pairs);const f=TPAIR[pr][2];if(L==='E'){return{pr,dir:'mixed',v:f*ri(r,1,5)+ri(r,1,f-1)}}const dir=pick(r,['big2small','small2big']);return{pr,dir,v:dir==='big2small'?ri(r,2,L==='F'?5:12):f*ri(r,2,L==='F'?5:12)}},
  t:p=>{const[s,b]=TPAIR[p.pr];if(p.dir==='big2small')return`${fmt(p.v)} ${b} = ____ ${s}`;if(p.dir==='small2big')return`${fmt(p.v)} ${s} = ____ ${b}`;return`${fmt(p.v)} ${s} = ____ ${b} and ____ ${s}`},
  a:p=>{const[s,b,f]=TPAIR[p.pr];if(!isInt(p.v)||p.v<0)return BAD('Enter a whole number');if(p.dir==='big2small')return W(fmt(p.v*f));if(p.dir==='small2big')return p.v%f?BAD(`Not a whole number of ${b}. Use a multiple of ${f}.`):W(fmt(p.v/f));return W(`${Math.floor(p.v/f)} ${b} and ${p.v%f} ${s}`)}};
SK.h24={instr:'Answer each item.',fam:'time',noLine:p=>p.mode!=='word',f:[['h','Hour (0–23)'],['m','Minutes']],
  g:(r,L,c)=>({h:ri(r,0,23),m:ri(r,0,11)*5,mode:c.word||L==='E'?'word':pick(r,['to24','to12'])}),
  t:p=>{if(p.mode==='to24')return`Write in 24-hour time: ${t12(p.h,p.m)}`;if(p.mode==='to12')return`Write in 12-hour time: ${t24(p.h,p.m)}`;return`A bus leaves Cebu at ${t24(p.h,p.m)}. The trip takes 3 hours and 20 minutes. What time does it arrive (24-hour time)? What is that in 12-hour time?`},
  a:p=>{if(!isInt(p.h)||p.h<0||p.h>23||!isInt(p.m)||p.m<0||p.m>59)return BAD('Hour 0–23, minutes 0–59');if(p.mode==='to24')return W(t24(p.h,p.m));if(p.mode==='to12')return W(t12(p.h,p.m));const e=(p.h*60+p.m+200);const h=Math.floor(e/60)%24,m=e%60;return W(`${t24(h,m)} (${t12(h,m)})${e>=1440?', the next day':''}`)}};
const TZ=[['Tokyo',9],['Seoul',9],['Beijing',8],['Singapore',8],['Bangkok',7],['Jakarta',7],['Dubai',4],['Riyadh',3],['Brisbane',10],['Honolulu',-10]];
SK.tz={instr:'Use the time zones given (UTC). The Philippines is UTC+8.',fam:'time',work:true,f:[['h','Manila hour (0–23)'],['m','Minutes']],
  g:(r,L,c)=>({h:ri(r,0,23),m:pick(r,[0,15,30,45]),ci:ri(r,0,TZ.length-1),mode:c.word||L==='E'?'word':'plain'}),
  t:p=>{const[cn,o]=TZ[p.ci];const os=o>=0?'+'+o:String(o);if(p.mode==='word')return`${withNames({ctx:p.ci},()=>pick0(0))} in Manila wants to call a relative in ${cn} (UTC${os}) at ${t12(p.h,p.m)} Manila time. What time will it be in ${cn}?`;return`When it is ${t12(p.h,p.m)} in Manila (UTC+8), what time is it in ${cn} (UTC${os})?`},
  a:p=>{if(!isInt(p.h)||p.h<0||p.h>23||!isInt(p.m))return BAD('Hour 0–23');const o=TZ[p.ci][1];let t=p.h*60+p.m+(o-8)*60;let day='';if(t<0){t+=1440;day=' (the day before)'}else if(t>=1440){t-=1440;day=' (the next day)'}return W(t12(Math.floor(t/60),t%60)+day)}};

/* ---- measurement ---- */
const UPAIR={'m-cm':['m','cm',100],'km-m':['km','m',1000],'kg-g':['kg','g',1000],'g-mg':['g','mg',1000],'L-mL':['L','mL',1000],'L-cucm':['L','cu. cm',1000],'sqm-sqcm':['sq. m','sq. cm',10000]};
SK.unit_conv={instr:'Convert.',fam:'measure',noLine:p=>!p.word,f:[['v','Value']],
  g:(r,L,c)=>{const pr=pick(r,c.pairs);const f=UPAIR[pr][2];if(c.word||L==='E'){if(c.word){const tot=ri(r,2,9),cut=ri(r,1,f-1);return{pr,dir:'word',v:tot,w:cut}}const dec=pr==='L-cucm'||pr==='sqm-sqcm';return{pr,dir:dec?'decimal':'mixed',v:dec?randDec(r,0.1,9.9,1):ri(r,1,9),w:ri(r,1,f-1)}}const dir=pick(r,['b2s','s2b']);return{pr,dir,v:dir==='b2s'?ri(r,2,L==='F'?9:50):f*ri(r,2,L==='F'?9:30)}},
  t:p=>{const[b,s]=UPAIR[p.pr];if(p.dir==='b2s')return`${fmt(p.v)} ${b} = ____ ${s}`;if(p.dir==='s2b')return`${fmt(p.v)} ${s} = ____ ${b}`;if(p.dir==='mixed')return`${p.v} ${b} ${fmt(p.w)} ${s} = ____ ${s}`;if(p.dir==='decimal')return`${dn(p.v)} ${b} = ____ ${s}`;
    const nm=withNames({ctx:p.v},()=>pick0(0));return{'m-cm':`A ribbon is ${p.v} m long. ${nm} cuts off ${fmt(p.w)} cm. How many centimeters of ribbon are left?`,'km-m':`A barangay road is ${p.v} km long. ${fmt(p.w)} m of it is already cemented. How many meters are not yet cemented?`,'kg-g':`A bag has ${p.v} kg of rice. ${nm} cooks ${fmt(p.w)} g. How many grams of rice are left?`,'g-mg':`A jar has ${p.v} g of salt. ${fmt(p.w)} mg is used. How many milligrams are left?`,'L-mL':`A jug has ${p.v} L of juice. ${nm} pours out ${fmt(p.w)} mL. How many milliliters are left?`,'L-cucm':`A container has ${p.v} L of water. ${fmt(p.w)} cu. cm is used. How many cu. cm are left?`,'sqm-sqcm':`A cloth is ${p.v} sq. m. ${fmt(p.w)} sq. cm is cut off. How many sq. cm are left?`}[p.pr]},
  a:p=>{const[b,s,f]=UPAIR[p.pr];if(!okNum(p.v)||p.v<0)return BAD('Enter a value');if(p.dir==='b2s')return W(fmt(p.v*f));if(p.dir==='s2b'){const v=p.v/f;return isInt(v)?W(fmt(v)):W(dn(+v.toFixed(4)),'Not a whole number')}if(p.dir==='mixed')return W(fmt(p.v*f+p.w)+' '+s,p.w>=f?`${s} should be less than ${f}`:'');if(p.dir==='decimal')return W(fmt(Math.round(p.v*f)));const v=p.v*f-p.w;return v<0?BAD('More was used than there is'):W(`${fmt(v)} ${s}`)}};
SK.len_cmp={instr:'Answer each item.',fam:'measure',f:[['a','First length'],['b','Second length']],
  g:(r,L,c)=>{const hi=c.unit==='hand spans'?20:(c.unit==='cm'?200:900);let a=ri(r,2,hi),b;do{b=ri(r,2,hi)}while(b===a);return{a,b,ctx:ri(r,0,2),word:L==='E'}},
  t:(p,c)=>{const u=c.unit;const O=u==='hand spans'?[['the table','the bench'],['the door','the window'],['the teacher\'s desk','the cabinet']]:u==='cm'?[['the red ribbon','the blue ribbon'],['the pencil case','the ruler'],['the bamboo stick','the broom']]:[['the path to the canteen','the path to the library'],['the walk to the plaza','the walk to the chapel'],['the field','the court']];const o=O[p.ctx%3];if(p.word)return`${o[0].charAt(0).toUpperCase()+o[0].slice(1)} is ${p.a} ${u} long and ${o[1]} is ${p.b} ${u} long. How much longer is the longer one? How long are they together?`;return`${o[0].charAt(0).toUpperCase()+o[0].slice(1)} is ${p.a} ${u} long. ${o[1].charAt(0).toUpperCase()+o[1].slice(1)} is ${p.b} ${u} long. Which is longer? By how many ${u}?`},
  a:(p,c)=>{if(!okNum(p.a,p.b)||p.a<0||p.b<0)return BAD('Enter lengths');const u=c.unit;const O=u==='hand spans'?[['the table','the bench'],['the door','the window'],['the teacher\'s desk','the cabinet']]:u==='cm'?[['the red ribbon','the blue ribbon'],['the pencil case','the ruler'],['the bamboo stick','the broom']]:[['the path to the canteen','the path to the library'],['the walk to the plaza','the walk to the chapel'],['the field','the court']];const o=O[p.ctx%3];const d=Math.abs(p.a-p.b);if(p.word)return W(`${d} ${u} longer; ${p.a+p.b} ${u} together`);return W(p.a===p.b?'They are the same length':`${p.a>p.b?o[0]:o[1]}, by ${d} ${u}`)}};
const UCH={len:[['the length of a pencil','cm'],['the length of the classroom','m'],['the width of a notebook','cm'],['the distance from the gate to the canteen','m'],['the length of an eraser','cm'],['the height of a coconut tree','m']],
  mass:[['a sack of rice','kg'],['a pencil','g'],['a vitamin tablet','mg'],['a mango','g'],['a watermelon','kg'],['a pinch of salt','mg']],
  cap:[['a drinking glass','mL'],['a water drum','L'],['a teaspoon of medicine','mL'],['a bucket','L'],['a bottle of fish sauce','mL'],['a rice cooker pot of water','L']],
  vol:[['the water in a pail','L'],['the space inside a small chalk box','cu. cm'],['the space inside a classroom','cu. m'],['medicine in a dropper','mL'],['the space inside a shoebox','cu. cm'],['the water in a swimming pool','cu. m']]};
SK.unit_choice={instr:'Write the best unit to use.',fam:'measure',f:[],
  g:(r,L,c)=>({i:ri(r,0,UCH[c.kind].length-1)}),
  t:(p,c)=>{const opts={len:'m or cm',mass:'kg, g or mg',cap:'L or mL',vol:'L, mL, cu. cm or cu. m'}[c.kind];return`Which unit (${opts}) would you use to measure ${UCH[c.kind][p.i][0]}?`},
  a:(p,c)=>W(UCH[c.kind][p.i][1])};
SK.meas_cmp={instr:'Compare. Show your solution.',fam:'measure',work:true,f:[['a','First (g or mL)'],['b','Second (g or mL)']],
  g:(r,L,c)=>{const a=ri(r,1,9)*1000*(L==='F'?1:1)+(L==='F'?0:ri(r,0,19)*50),b=ri(r,1,9)*1000+ri(r,0,19)*50;return{a,b:b===a?b+250:b}},
  t:(p,c)=>{const [big,small]=c.kind==='mass'?['kg','g']:['L','mL'];const show=v=>v%1000===0?`${v/1000} ${big}`:(v>1000?`${Math.floor(v/1000)} ${big} ${v%1000} ${small}`:`${v} ${small}`);return c.kind==='mass'?`A bag of sugar has a mass of ${show(p.a)}. A bag of flour has a mass of ${show(p.b)}. Which is heavier? By how many grams?`:`A pitcher holds ${show(p.a)} of water. A jug holds ${show(p.b)}. Which holds more? By how many milliliters?`},
  a:(p,c)=>{if(!okNum(p.a,p.b)||p.a<=0||p.b<=0)return BAD('Enter amounts');const d=Math.abs(p.a-p.b);const u=c.kind==='mass'?'g':'mL';return W(p.a===p.b?'Same':`${c.kind==='mass'?(p.a>p.b?'the sugar':'the flour'):(p.a>p.b?'the pitcher':'the jug')}, by ${fmt(d)} ${u}`)}};

/* ---- geometry: perimeter, area, volume ---- */
SK.perim={instr:'Find the perimeter. Write the unit.',fam:'geometry',work:true,
  f:p=>({tri:[['a','Side 1'],['b','Side 2'],['c','Side 3']],sq:[['a','Side']],rect:[['a','Length'],['b','Width']],quad:[['a','Side 1'],['b','Side 2'],['c','Side 3'],['d','Side 4']],comp:[['a','Side 1'],['b','Side 2'],['c','Side 3'],['d','Side 4'],['e','Side 5']],rectmiss:[['a','Length'],['P','Perimeter']]}[p.s]),
  g:(r,L,c)=>{const s=pick(r,L==='F'?c.shapes.slice(0,2):c.shapes);const u=pick(r,['cm','m']);let p={s,u,word:!!c.word||L==='E',ctx:ri(r,0,1)};if(s==='tri'){let a,b,cc;do{a=ri(r,3,20);b=ri(r,3,20);cc=ri(r,3,20)}while(a+b<=cc||a+cc<=b||b+cc<=a);Object.assign(p,{a,b,c:cc})}else if(s==='sq')p.a=ri(r,2,25);else if(s==='rect'){p.a=ri(r,4,30);p.b=ri(r,2,p.a-1)}else if(s==='quad'){Object.assign(p,{a:ri(r,4,20),b:ri(r,4,20),c:ri(r,4,20),d:ri(r,4,20)})}else Object.assign(p,{a:ri(r,4,15),b:ri(r,4,15),c:ri(r,4,15),d:ri(r,4,15),e:ri(r,4,15)});if(p.word&&s==='rect'&&L==='E'&&r()<.5){p.s='rectmiss';p.P=2*(p.a+p.b)}return p},
  t:p=>{const u=p.u;const nm={tri:`a triangle with sides ${p.a} ${u}, ${p.b} ${u} and ${p.c} ${u}`,sq:`a square with sides of ${p.a} ${u}`,rect:`a rectangle ${p.a} ${u} long and ${p.b} ${u} wide`,quad:`a quadrilateral (not a square or rectangle) with sides ${p.a} ${u}, ${p.b} ${u}, ${p.c} ${u} and ${p.d} ${u}`,comp:`a figure made of a rectangle with a triangle on top. Its outer sides are ${p.a} ${u}, ${p.b} ${u}, ${p.c} ${u}, ${p.d} ${u} and ${p.e} ${u}`}[p.s];if(p.s==='rectmiss')return`A rectangular school garden in ${place()} has a perimeter of ${p.P} ${u}. Its length is ${p.a} ${u}. How wide is it?`;if(p.word)return[`${Place()} will put a fence around a lot shaped like ${nm}. How long is the fence?`,`${withNames({ctx:p.a},()=>pick0(0))} walks once around a garden shaped like ${nm}. How far is the walk?`][p.ctx];return`Find the perimeter of ${nm}.`},
  a:p=>{const u=p.u;const v={tri:[p.a,p.b,p.c],sq:[p.a,p.a,p.a,p.a],rect:[p.a,p.b,p.a,p.b],quad:[p.a,p.b,p.c,p.d],comp:[p.a,p.b,p.c,p.d,p.e]}[p.s];if(p.s==='rectmiss'){const w=(p.P-2*p.a)/2;return w>0?W(`${fmt(w)} ${u}`,isInt(w)?'':'Not a whole number'):BAD('Width would be 0 or less')}if(!v.every(x=>okNum(x)&&x>0))return BAD('Sides must be more than 0');if(p.s==='tri'){const[a,b,c]=v;if(a+b<=c||a+c<=b||b+c<=a)return BAD('These sides cannot make a triangle')}return W(`${fmt(v.reduce((s,x)=>s+x,0))} ${u}`)}};
SK.area_rect={instr:'Find the area. Write the unit (sq. cm or sq. m).',fam:'geometry',work:true,f:[['a','Length'],['b','Width']],
  g:(r,L,c)=>{const u=pick(r,['cm','m']);if(c.tiles||L==='F')return{mode:'tiles',a:ri(r,2,9),b:ri(r,2,9),u:'cm'};const sq=r()<.3;const a=ri(r,2,20);return{mode:(c.word||L==='E')?(r()<.5?'word':'miss'):'plain',a,b:sq?a:ri(r,2,20),u,ctx:ri(r,0,1)}},
  t:p=>{if(p.mode==='tiles')return`A rectangle is covered with 1-cm square tiles. There are ${p.a} tiles in each row and ${p.b} rows. What is its area?`;const shape=p.a===p.b?`a square with sides of ${p.a} ${p.u}`:`a rectangle ${p.a} ${p.u} long and ${p.b} ${p.u} wide`;if(p.mode==='word')return[`The floor of a room in ${place()} is ${shape.replace(/^a /,'')}. What is its area?`,`A vegetable plot is shaped like ${shape}. What is its area?`][p.ctx];if(p.mode==='miss')return`A rectangle has an area of ${p.a*p.b} sq. ${p.u}. Its length is ${p.a} ${p.u}. What is its width?`;return`Find the area of ${shape}.`},
  a:p=>{if(!okNum(p.a,p.b)||p.a<=0||p.b<=0)return BAD('Sides must be more than 0');if(p.mode==='miss')return W(`${fmt(p.b)} ${p.u}`);return W(`${fmt(p.a*p.b)} sq. ${p.u}`)}};
SK.area_pgt={instr:'Find the area. Write the unit.',fam:'geometry',work:true,
  f:p=>p.s==='trap'?[['a','Base 1'],['b','Base 2'],['h','Height']]:[['a','Base'],['h','Height']],
  g:(r,L,c)=>{const s=pick(r,L==='F'?['par','tri']:['par','tri','trap']);const u=pick(r,['cm','m']);let a=ri(r,4,30),b=ri(r,4,30),h=ri(r,3,20);if(s==='tri'&&(a*h)%2)h++;if(s==='trap'&&((a+b)*h)%2)h++;return{s,a,b,h,u,word:!!c.word||L==='E'}},
  t:p=>{const nm={par:`a parallelogram with base ${p.a} ${p.u} and height ${p.h} ${p.u}`,tri:`a triangle with base ${p.a} ${p.u} and height ${p.h} ${p.u}`,trap:`a trapezoid with bases ${p.a} ${p.u} and ${p.b} ${p.u} and height ${p.h} ${p.u}`}[p.s];return p.word?`A lot in ${place()} is shaped like ${nm}. What is its area?`:`Find the area of ${nm}.`},
  a:p=>{if(!okNum(p.a,p.h)||p.a<=0||p.h<=0)return BAD('Values must be more than 0');const v=p.s==='par'?p.a*p.h:p.s==='tri'?p.a*p.h/2:(p.a+p.b)*p.h/2;return W(`${dn(v)} sq. ${p.u}`)}};
const PI=3.14;
const r2=x=>Math.round(x*100)/100;
SK.area_comp={instr:'Find the area of each figure. Use π = 3.14.',fam:'geometry',work:true,
  f:p=>p.s==='rtri'?[['a','Rectangle length'],['b','Rectangle width'],['h','Triangle height']]:p.s==='two'?[['a','Big length'],['b','Big width'],['c','Small length'],['d','Small width']]:[['a','Rectangle length'],['b','Rectangle width']],
  g:(r,L,c)=>{const s=c.circle?pick(r,['rsemi','rtri','two']):pick(r,['rtri','two']);const u=pick(r,['cm','m']);let a=ri(r,6,20),b=ri(r,4,14),h=ri(r,2,10);if((a*h)%2)h++;if(s==='rsemi'&&a%2)a++;return{s,a,b,h,c:ri(r,2,a-1),d:ri(r,2,8),u}},
  t:p=>({rtri:`A figure is made of a rectangle ${p.a} ${p.u} by ${p.b} ${p.u} and a triangle on top. The triangle's base is the ${p.a}-${p.u} side and its height is ${p.h} ${p.u}. What is the total area?`,two:`An L-shaped figure is made of two rectangles: one is ${p.a} ${p.u} by ${p.b} ${p.u}, the other is ${p.c} ${p.u} by ${p.d} ${p.u}. What is the total area?`,rsemi:`A figure is made of a rectangle ${p.a} ${p.u} by ${p.b} ${p.u} and a semicircle on the ${p.a}-${p.u} side (diameter ${p.a} ${p.u}). What is the total area?`}[p.s]),
  a:p=>{if(!okNum(p.a,p.b)||p.a<=0||p.b<=0)return BAD('Values must be more than 0');let v;if(p.s==='rtri')v=p.a*p.b+p.a*p.h/2;else if(p.s==='two')v=p.a*p.b+p.c*p.d;else{const rr=p.a/2;v=p.a*p.b+PI*rr*rr/2}return W(`${dn(r2(v))} sq. ${p.u}`)}};
SK.circle_parts={instr:'Answer each item.',fam:'geometry',noLine:false,f:[['v','Value']],
  g:(r,L,c)=>({mode:pick(r,['r2d','d2r']),v:ri(r,2,30)*(1),u:pick(r,['cm','m'])}),
  t:p=>p.mode==='r2d'?`A circle has a radius of ${p.v} ${p.u}. What is its diameter?`:`A circle has a diameter of ${p.v} ${p.u}. What is its radius?`,
  a:p=>okNum(p.v)&&p.v>0?W(`${dn(p.mode==='r2d'?p.v*2:p.v/2)} ${p.u}`):BAD('Enter a value')};
SK.pi_ratio={instr:'Divide the circumference by the diameter. Round to the nearest hundredth.',fam:'geometry',f:[['C','Circumference'],['d','Diameter']],
  g:(r,L,c)=>{const d=ri(r,5,40);const C=Math.round(d*3.14159*10)/10;return{C,d}},
  t:p=>`A circular lid has a circumference of ${dn(p.C)} cm and a diameter of ${p.d} cm. What is C ÷ d?`,
  a:p=>okNum(p.C,p.d)&&p.d>0?W(dfmt(Math.round(p.C/p.d*100),2,true)):BAD('Enter values')};
SK.circle={instr:'Use π = 3.14. Write the unit.',fam:'geometry',work:true,f:[['v','Radius or diameter']],
  g:(r,L,c)=>{const find=c.find||pick(r,['C','A']);const giv=find==='A'?'r':pick(r,['r','d']);const word=!!c.word||L==='E';return{find,giv,v:ri(r,2,word&&find==='C'?60:20),u:word?(find==='C'?'cm':'m'):pick(r,['cm','m']),word}},
  t:p=>{const g=p.giv==='r'?`a radius of ${p.v} ${p.u}`:`a diameter of ${p.v} ${p.u}`;const what=p.find==='C'?'circumference':'area';return p.word?(p.find==='C'?`A circular table top has ${g}. How long is the edging needed to go around it?`:`A circular garden in ${place()} has ${g}. What is its area?`):`A circle has ${g}. Find its ${what}.`},
  a:p=>{if(!okNum(p.v)||p.v<=0)return BAD('Enter a value');const rr=p.giv==='r'?p.v:p.v/2;return W(p.find==='C'?`${dn(r2(2*PI*rr))} ${p.u}`:`${dn(r2(PI*rr*rr))} sq. ${p.u}`)}};
SK.volume={instr:'Find the volume. Write the unit.',fam:'geometry',work:true,f:[['l','Length'],['w','Width'],['h','Height']],
  g:(r,L,c)=>{const cube=r()<.3;const l=ri(r,2,c.cubes?8:30);return{l,w:cube?l:ri(r,2,c.cubes?6:30),h:cube?l:ri(r,2,c.cubes?5:30),mode:c.cubes?'cubes':(c.cap?'cap':(c.word||L==='E'?'word':'plain')),u:c.cap?'cm':pick(r,['cm','m'])}},
  t:p=>{const box=p.l===p.w&&p.w===p.h?`a cube with edges of ${p.l} ${p.u}`:`a rectangular prism ${p.l} ${p.u} long, ${p.w} ${p.u} wide and ${p.h} ${p.u} high`;if(p.mode==='cubes')return`How many 1-cm cubes are needed to fill a box ${p.l} cm long, ${p.w} cm wide and ${p.h} cm high?`;if(p.mode==='cap')return`An aquarium is ${p.l} cm long, ${p.w} cm wide and ${p.h} cm high. How many liters of water can it hold? (1 L = 1 000 cu. cm)`;if(p.mode==='word')return`A storage box is shaped like ${box}. What is its volume?`;return`Find the volume of ${box}.`},
  a:p=>{if(!okNum(p.l,p.w,p.h)||p.l<=0||p.w<=0||p.h<=0)return BAD('Values must be more than 0');const v=p.l*p.w*p.h;if(p.mode==='cubes')return W(`${fmt(v)} cubes`);if(p.mode==='cap')return W(`${dn(v/1000)} L`);return W(`${fmt(v)} cu. ${p.u}`)}};
SK.surface={instr:'Find the surface area. Write the unit.',fam:'geometry',work:true,f:[['l','Length'],['w','Width'],['h','Height']],
  g:(r,L,c)=>{const cube=L==='F'||r()<.3;const l=ri(r,2,20);return{l,w:cube?l:ri(r,2,20),h:cube?l:ri(r,2,20),u:pick(r,['cm','m']),word:!!c.word||L==='E'}},
  t:p=>{const box=p.l===p.w&&p.w===p.h?`a cube with edges of ${p.l} ${p.u}`:`a rectangular prism ${p.l} ${p.u} long, ${p.w} ${p.u} wide and ${p.h} ${p.u} high`;return p.word?`How much paper is needed to cover all the faces of a gift box shaped like ${box}?`:`Find the surface area of ${box}.`},
  a:p=>{if(!okNum(p.l,p.w,p.h)||p.l<=0||p.w<=0||p.h<=0)return BAD('Values must be more than 0');return W(`${fmt(2*(p.l*p.w+p.l*p.h+p.w*p.h))} sq. ${p.u}`)}};
const BASES={3:'triangular',4:'rectangular',5:'pentagonal',6:'hexagonal'};
SK.solid_facts={instr:'Answer each item.',fam:'geometry',f:[],
  g:(r,L,c)=>({n:ri(r,3,6),kind:pick(r,['prism','pyramid']),ask:pick(r,['faces','edges','vertices'])}),
  t:p=>`How many ${p.ask} does a ${BASES[p.n]} ${p.kind} have?`,
  a:p=>{const v=p.kind==='prism'?{faces:p.n+2,edges:3*p.n,vertices:2*p.n}:{faces:p.n+1,edges:2*p.n,vertices:p.n+1};return W(String(v[p.ask]))}};
SK.angle_type={instr:'Write acute, right, or obtuse.',fam:'geometry',f:[['deg','Degrees']],
  g:(r,L,c)=>({deg:pick(r,[ri(r,10,85),90,ri(r,95,175)])}),t:p=>`An angle measures ${p.deg}°. Is it acute, right, or obtuse?`,
  a:p=>(!okNum(p.deg)||p.deg<=0||p.deg>=180)?BAD('Use 1° to 179°'):W(p.deg<90?'acute':p.deg===90?'right':'obtuse')};
const SFACT={g1:[['How many sides does a triangle have?','3'],['How many corners does a square have?','4'],['How many sides does a rectangle have?','4'],['Which shape has 3 sides and 3 corners: triangle, square or rectangle?','triangle'],['A square and a rectangle both have 4 sides. How is a square different?','All 4 sides of a square are equal'],['How many corners does a triangle have?','3']],
  g4:[['How many sides and angles does a quadrilateral have?','4 sides, 4 angles'],['How many right angles does a rectangle have?','4'],['How many pairs of parallel sides does a parallelogram have?','2'],['What is the sum of the angles of a triangle?','180°'],['A square has how many equal sides?','4'],['Which quadrilateral has exactly one pair of parallel sides?','trapezoid'],['What is the sum of the angles of a quadrilateral?','360°']]};
SK.shape_facts={instr:'Answer each question.',fam:'geometry',f:[],g:(r,L,c)=>({i:ri(r,0,SFACT[c.set].length-1)}),t:(p,c)=>SFACT[c.set][p.i][0],a:(p,c)=>W(SFACT[c.set][p.i][1])};
SK.tri_class={instr:'Classify each triangle.',fam:'geometry',f:p=>p.by==='sides'?[['a','Side 1'],['b','Side 2'],['c','Side 3']]:[['a','Angle 1'],['b','Angle 2'],['c','Angle 3']],
  g:(r,L,c)=>{if(r()<.5){const t=pick(r,['eq','iso','sca']);let a=ri(r,3,15),b=a,cc=a;if(t==='iso'){do{cc=ri(r,2,2*a-1)}while(cc===a)}if(t==='sca'){do{b=ri(r,3,15);cc=ri(r,3,15)}while(b===a||cc===a||cc===b||a+b<=cc||a+cc<=b||b+cc<=a)}return{by:'sides',a,b,c:cc}}const t=pick(r,['acu','rig','obt']);let a,b,cc;if(t==='rig'){a=90;b=ri(r,20,70);cc=90-b}else if(t==='obt'){a=ri(r,95,150);b=ri(r,10,180-a-10);cc=180-a-b}else{do{a=ri(r,40,85);b=ri(r,40,85);cc=180-a-b}while(cc>=90||cc<=0)}return{by:'angles',a,b,c:cc}},
  t:p=>p.by==='sides'?`A triangle has sides of ${p.a} cm, ${p.b} cm and ${p.c} cm. Is it equilateral, isosceles, or scalene?`:`A triangle has angles of ${p.a}°, ${p.b}° and ${p.c}°. Is it acute, right, or obtuse?`,
  a:p=>{const{a,b,c}=p;if(!okNum(a,b,c)||a<=0||b<=0||c<=0)return BAD('Values must be more than 0');if(p.by==='sides'){if(a+b<=c||a+c<=b||b+c<=a)return BAD('These sides cannot make a triangle');return W(a===b&&b===c?'equilateral':(a===b||b===c||a===c)?'isosceles':'scalene')}if(a+b+c!==180)return BAD('The angles must add up to 180°');const m=Math.max(a,b,c);return W(m<90?'acute':m===90?'right':'obtuse')}};
const QUADS=[['4 equal sides and 4 right angles','square'],['opposite sides equal and 4 right angles, but not all sides equal','rectangle'],['4 equal sides but no right angles','rhombus'],['2 pairs of parallel sides, opposite sides equal, no right angles','parallelogram'],['exactly 1 pair of parallel sides','trapezoid']];
SK.quad_class={instr:'Name the quadrilateral.',fam:'geometry',f:[],g:(r,L,c)=>({i:ri(r,0,QUADS.length-1)}),t:p=>`A quadrilateral has ${QUADS[p.i][0]}. What is it?`,a:p=>W(QUADS[p.i][1])};
const DIRS=['north','east','south','west'];
SK.turn={instr:'Answer each item.',fam:'geometry',f:[],g:(r,L,c)=>({d:ri(r,0,3),t:pick(r,L==='F'?['half']:['half','qcw','qccw']),nm:ri(r,0,NAMES.length-1)}),
  t:p=>`${NAMES[p.nm]} is facing ${DIRS[p.d]}. Then ${NAMES[p.nm]} makes a ${{half:'half turn',qcw:'quarter turn clockwise',qccw:'quarter turn counterclockwise'}[p.t]}. Which direction is ${NAMES[p.nm]} facing now?`,
  a:p=>W(DIRS[(p.d+{half:2,qcw:1,qccw:3}[p.t])%4])};

/* ---- fractions ---- */
const FOODS=['bibingka','pizza','leche flan','cassava cake','papaya','sheet of paper'];
SK.frac_part={instr:'Write the fraction.',fam:'fractions',f:[['n','Parts taken'],['d','Equal parts']],
  g:(r,L,c)=>{const d=pick(r,c.dens);const n=c.unit||L==='F'?1:ri(r,1,d-1);return{n,d,food:ri(r,0,FOODS.length-1),mode:L==='E'&&!c.unit?'left':'eat',nm:ri(r,0,NAMES.length-1)}},
  t:p=>`A ${FOODS[p.food]} is cut into ${p.d} equal parts. ${NAMES[p.nm]} ${p.food===5?'colors':'eats'} ${p.n} part${p.n>1?'s':''}. What fraction ${p.mode==='left'?'is left':`did ${NAMES[p.nm]} ${p.food===5?'color':'eat'}`}?`,
  a:p=>(!isInt(p.n)||!isInt(p.d)||p.d<1||p.n<0||p.n>p.d)?BAD('Parts taken must be 0 to the number of parts'):W(p.mode==='left'?`${p.d-p.n}/${p.d}`:`${p.n}/${p.d}`)};
SK.frac_words={instr:'Write each fraction as asked.',fam:'fractions',f:[['n','Numerator'],['d','Denominator']],
  g:(r,L,c)=>{const d=pick(r,[2,3,4,5,6,8].filter(x=>!(x===2&&!c.unit)));return{n:c.unit?1:ri(r,1,d-1),d,mode:pick(r,['tonum','towords'])}},
  t:p=>p.mode==='tonum'?`Write as a fraction: ${fracWords(p.n,p.d)||'?'}`:`Write in words: ${p.n}/${p.d}`,
  a:p=>{const w=fracWords(p.n,p.d);if(!w||p.n<1||p.n>=p.d)return BAD('Use a proper fraction with denominator 2, 3, 4, 5, 6 or 8');return W(p.mode==='tonum'?`${p.n}/${p.d}`:w)}};
SK.frac_cmp={instr:'Write >, <, or = on the blank.',fam:'fractions',noLine:p=>p.mode!=='hq',f:[['n1','Numerator 1'],['d1','Denominator 1'],['n2','Numerator 2'],['d2','Denominator 2']],
  g:(r,L,c)=>{if(c.type==='halfquarter'){const s=r()<.5;return{mode:'hq',n1:1,d1:s?2:4,n2:1,d2:s?4:2,food:ri(r,0,4)}}if(c.type==='unit'){let a=pick(r,[2,3,4,5,6,8]),b;do{b=pick(r,[2,3,4,5,6,8])}while(b===a);return{n1:1,d1:a,n2:1,d2:b}}for(let k=0;k<100;k++){const d1=ri(r,2,c.maxd||10),d2=ri(r,2,c.maxd||10);if(d1===d2)continue;const n1=ri(r,1,d1-1),n2=ri(r,1,d2-1);if(L!=='E'&&n1*d2===n2*d1)continue;return{n1,d1,n2,d2}}return{n1:1,d1:2,n2:2,d2:3}},
  t:p=>p.mode==='hq'?`Which is bigger: ${p.n1}/${p.d1} of a ${FOODS[p.food]} or ${p.n2}/${p.d2} of the same ${FOODS[p.food]}?`:`${p.n1}/${p.d1}  ______  ${p.n2}/${p.d2}`,
  a:p=>{if(![p.n1,p.d1,p.n2,p.d2].every(isInt)||p.d1<=0||p.d2<=0)return BAD('Use whole numbers; denominators more than 0');const x=p.n1*p.d2,y=p.n2*p.d1;if(p.mode==='hq')return W(x>y?`${p.n1}/${p.d1}`:x<y?`${p.n2}/${p.d2}`:'They are equal');return W(x>y?'>':x<y?'<':'=')}};
SK.frac_count={instr:'Answer each item.',fam:'fractions',f:[['k','Number']],
  g:(r,L,c)=>{const d=pick(r,c.dens);const mode=pick(r,['inwholes','towholes']);return{d,mode,k:mode==='inwholes'?ri(r,1,5):d*ri(r,1,5)}},
  t:p=>{const nm=p.d===2?'halves':'quarters';return p.mode==='inwholes'?`How many ${nm} are in ${p.k} whole${p.k>1?'s':''}?`:`${p.k} ${nm} make how many wholes?`},
  a:p=>{if(!isInt(p.k)||p.k<0)return BAD('Enter a whole number');if(p.mode==='inwholes')return W(String(p.k*p.d));return p.k%p.d?W(ffmt(p.k,p.d),'Not a whole number of wholes'):W(String(p.k/p.d))}};
SK.frac_order={instr:'Arrange the fractions as asked.',fam:'fractions',f:[['n1','n1'],['d1','d1'],['n2','n2'],['d2','d2'],['n3','n3'],['d3','d3'],['dir','Order','ord']],
  g:(r,L,c)=>{const dir=L==='F'?'asc':pick(r,['asc','desc']);if(c.type==='unit'){const ds=shuf(r,[2,3,4,5,6,8]).slice(0,3);return{n1:1,d1:ds[0],n2:1,d2:ds[1],n3:1,d3:ds[2],dir}}if(c.type==='similar'){const d=pick(r,[4,5,6,8]);const ns=shuf(r,Array.from({length:d-1},(_,i)=>i+1)).slice(0,3);return{n1:ns[0],d1:d,n2:ns[1],d2:d,n3:ns[2],d3:d,dir}}for(let k=0;k<200;k++){const ds=[ri(r,2,10),ri(r,2,10),ri(r,2,10)];if(new Set(ds).size<3)continue;const ns=ds.map(d=>ri(r,1,d-1));const vals=ns.map((n,i)=>n/ds[i]);if(new Set(vals.map(v=>v.toFixed(6))).size<3)continue;return{n1:ns[0],d1:ds[0],n2:ns[1],d2:ds[1],n3:ns[2],d3:ds[2],dir}}return{n1:1,d1:2,n2:1,d2:3,n3:3,d3:4,dir}},
  t:p=>`Arrange from ${p.dir==='asc'?'smallest to largest':'largest to smallest'}: ${p.n1}/${p.d1};  ${p.n2}/${p.d2};  ${p.n3}/${p.d3}`,
  a:p=>{const F=[[p.n1,p.d1],[p.n2,p.d2],[p.n3,p.d3]];if(!F.every(([n,d])=>isInt(n)&&isInt(d)&&d>0))return BAD('Use whole numbers; denominators more than 0');F.sort((x,y)=>x[0]*y[1]-y[0]*x[1]);if(p.dir==='desc')F.reverse();const dup=new Set(F.map(([n,d])=>(n/d).toFixed(9))).size<3;return W(F.map(([n,d])=>`${n}/${d}`).join(' ; '),dup?'Two fractions are equal':'')}};
SK.frac_gt1={instr:'Answer each item.',fam:'fractions',f:[['n','Numerator'],['d','Denominator']],
  g:(r,L,c)=>{const d=ri(r,2,8);return L==='E'?{mode:'whole',n:d,d}:{mode:'cmp1',n:pick(r,[d,d+ri(r,1,d),ri(r,1,d-1)]),d}},
  t:p=>p.mode==='whole'?`Write 1 whole as a fraction with denominator ${p.d}.`:`Is ${p.n}/${p.d} less than 1, equal to 1, or greater than 1?`,
  a:p=>(!isInt(p.n)||!isInt(p.d)||p.d<=0)?BAD('Use whole numbers'):W(p.mode==='whole'?`${p.d}/${p.d}`:p.n<p.d?'less than 1':p.n===p.d?'equal to 1':'greater than 1')};
SK.frac_kind={instr:'Write proper, improper, or mixed number.',fam:'fractions',f:[['w','Whole (0 if none)'],['n','Numerator'],['d','Denominator']],
  g:(r,L,c)=>{const d=ri(r,2,10);const k=pick(r,['p','i','m']);return k==='p'?{w:0,n:ri(r,1,d-1),d}:k==='i'?{w:0,n:ri(r,d,3*d),d}:{w:ri(r,1,5),n:ri(r,1,d-1),d}},
  t:p=>`${opd(p.w,p.n,p.d)}`,a:p=>(!isInt(p.n)||!isInt(p.d)||p.d<=0)?BAD('Use whole numbers'):W(p.w?'mixed number':p.n<p.d?'proper fraction':'improper fraction')};
SK.frac_mixed={instr:'Rewrite each number as asked.',fam:'fractions',noLine:false,f:p=>p.mode==='toMixed'?[['n','Numerator'],['d','Denominator']]:[['w','Whole'],['n','Numerator'],['d','Denominator']],
  g:(r,L,c)=>{const d=ri(r,2,10);if(r()<.5){let n=ri(r,d+1,5*d);if(n%d===0)n++;return{mode:'toMixed',n,d,w:0}}return{mode:'toImp',w:ri(r,1,6),n:ri(r,1,d-1),d}},
  t:p=>p.mode==='toMixed'?`Write ${p.n}/${p.d} as a mixed number.`:`Write ${opd(p.w,p.n,p.d)} as an improper fraction.`,
  a:p=>{if(![p.n,p.d].every(isInt)||p.d<=0)return BAD('Use whole numbers');if(p.mode==='toMixed'){if(p.n<=p.d)return BAD('Use an improper fraction');const w=Math.floor(p.n/p.d),rm=p.n%p.d;return W(rm?`${w} ${rm}/${p.d}`:String(w),rm?'':'This is a whole number')}return W(`${p.w*p.d+p.n}/${p.d}`)}};
SK.frac_between={instr:'Answer each item.',fam:'fractions',f:[['n','Numerator'],['d','Denominator']],
  g:(r,L,c)=>{const d=pick(r,[2,4,5,10]);let n=ri(r,d+1,4*d);if(n%d===0)n++;return{n,d}},
  t:p=>`On a number line, ${p.n}/${p.d} is between which two whole numbers?`,
  a:p=>{if(!isInt(p.n)||!isInt(p.d)||p.d<=0)return BAD('Use whole numbers');if(p.n%p.d===0)return W(`It is exactly ${p.n/p.d}`);const w=Math.floor(p.n/p.d);return W(`${w} and ${w+1}`)}};
SK.frac_equiv={instr:'Find the missing number.',fam:'fractions',noLine:p=>p.mode!=='two',f:[['n','Numerator'],['d','Denominator'],['k','Multiply by']],
  g:(r,L,c)=>{const d=ri(r,2,9),n=ri(r,1,d-1),k=ri(r,2,6);return{n,d,k,mode:L==='E'?'two':pick(r,['num','den'])}},
  t:p=>p.mode==='num'?`${p.n}/${p.d} = ____/${p.d*p.k}`:p.mode==='den'?`${p.n}/${p.d} = ${p.n*p.k}/____`:`Write two fractions equivalent to ${p.n}/${p.d} (multiply by 2 and by 3).`,
  a:p=>{if(![p.n,p.d,p.k].every(isInt)||p.d<=0||p.k<=0)return BAD('Use whole numbers');return W(p.mode==='num'?String(p.n*p.k):p.mode==='den'?String(p.d*p.k):`${p.n*2}/${p.d*2} and ${p.n*3}/${p.d*3}`)}};
SK.frac_simplest={instr:'Write each fraction in simplest form.',fam:'fractions',noLine:false,f:[['n','Numerator'],['d','Denominator']],
  g:(r,L,c)=>{const d0=ri(r,2,9),n0=ri(r,1,d0-1);const f=fr(n0,d0);const k=ri(r,2,L==='F'?3:8);return{n:f.n*k,d:f.d*k}},
  t:p=>`${p.n}/${p.d}`,a:p=>(!isInt(p.n)||!isInt(p.d)||p.d<=0)?BAD('Use whole numbers'):W(ffmt(p.n,p.d,false))};
function genFracOperand(r,c,kind){const d=ri(r,2,c.maxd||10);if(kind==='p')return[0,ri(r,1,d-1),d];if(kind==='m')return[ri(r,1,5),ri(r,1,d-1),d];return[ri(r,1,6),0,1]}
SK.frac_as={instr:'Add or subtract. Write the answer in simplest form.',fam:'fractions',work:true,noLine:p=>!p.word,
  f:[['w1','Whole 1'],['n1','Numerator 1'],['d1','Denominator 1'],['op','Operation','op'],['w2','Whole 2'],['n2','Numerator 2'],['d2','Denominator 2']],
  g:(r,L,c)=>{const forms=c.mixed&&L!=='F'?[['p','p'],['m','m'],['m','p'],['w','p'],['w','m']]:[['p','p']];const md=c.maxd||10;const co=d=>{if(c.type==='similar')return ri(r,1,d-1);let n;do{n=ri(r,1,d-1)}while(gcd(n,d)!==1);return n};const mk=(k,d)=>k==='p'?[0,co(d),d]:k==='m'?[ri(r,1,5),co(d),d]:[ri(r,1,6),0,d];for(let k=0;k<300;k++){const [k1,k2]=pick(r,forms);const d1=ri(r,2,md);const d2=c.type==='similar'?d1:ri(r,2,md);if(c.type!=='similar'&&d1===d2)continue;let a=mk(k1,d1),b=mk(k2,d2);const op=pick(r,['+','-']);const A=toImp(...a),B=toImp(...b);const x=A.n*B.d,y=B.n*A.d;if(op==='-'&&x===y)continue;if(op==='-'&&x<y)[a,b]=[b,a];return{w1:a[0],n1:a[1],d1:a[2],op,w2:b[0],n2:b[1],d2:b[2],word:!!c.word||L==='E',ctx:ri(r,0,2)}}return{w1:0,n1:1,d1:4,op:'+',w2:0,n2:2,d2:4}},
  t:p=>{const A=opd(p.w1,p.n1,p.d1),B=opd(p.w2,p.n2,p.d2);if(p.word)return p.op==='+'?[`${NAMES[p.ctx]} bought ${A} kg of rice and ${B} kg of sugar. How many kilograms were bought in all?`,`A carpenter used ${A} m of wood in the morning and ${B} m in the afternoon. How many meters were used in all?`,`${NAMES[p.ctx+3]} walked ${A} km to school and ${B} km to the market. What is the total distance walked?`][p.ctx%3]:[`${NAMES[p.ctx]} had ${A} m of ribbon and used ${B} m. How much ribbon is left?`,`A jug had ${A} L of juice. ${B} L was served. How much juice is left?`,`${Place()} had ${A} sacks of rice. ${B} sacks were given away. How many sacks are left?`][p.ctx%3];return`${A} ${p.op==='+'?'+':'−'} ${B} = ________`},
  a:p=>{const v=[p.w1,p.n1,p.d1,p.w2,p.n2,p.d2];if(!v.every(isInt)||p.d1<=0||p.d2<=0||v.some(x=>x<0))return BAD('Use whole numbers; denominators more than 0');const A=toImp(p.w1,p.n1,p.d1),B=toImp(p.w2,p.n2,p.d2);const n=p.op==='+'?A.n*B.d+B.n*A.d:A.n*B.d-B.n*A.d;if(n<0)return BAD('The answer is negative. Swap the numbers.');return W(ffmt(n,A.d*B.d))}};
SK.frac_word3={instr:'Solve. Write the answer in simplest form.',fam:'fractions',work:true,
  f:[['w1','Whole 1'],['n1','Num 1'],['d1','Den 1'],['w2','Whole 2'],['n2','Num 2'],['d2','Den 2'],['w3','Whole 3'],['n3','Num 3'],['d3','Den 3']],
  g:(r,L,c)=>{for(let k=0;k<200;k++){const a=[ri(r,1,4),ri(r,1,3),pick(r,[2,4])],b=[ri(r,0,2),ri(r,1,2),pick(r,[3,6])],cc=[ri(r,0,2),ri(r,1,4),pick(r,[4,8])];[a,b,cc].forEach(x=>{if(x[1]>=x[2])x[1]=x[2]-1});const A=toImp(...a),B=toImp(...b),C=toImp(...cc);const v=A.n/A.d+B.n/B.d-C.n/C.d;if(v>0)return{w1:a[0],n1:a[1],d1:a[2],w2:b[0],n2:b[1],d2:b[2],w3:cc[0],n3:cc[1],d3:cc[2],ctx:ri(r,0,1)}}return{w1:2,n1:1,d1:2,w2:1,n2:1,d2:3,w3:1,n3:1,d3:4,ctx:0}},
  t:p=>{const A=opd(p.w1,p.n1,p.d1),B=opd(p.w2,p.n2,p.d2),C=opd(p.w3,p.n3,p.d3);return[`${NAMES[p.w1]} bought ${A} kg of pork and ${B} kg of chicken. ${C} kg was cooked for lunch. How many kilograms of meat are left?`,`A water jug has ${A} L. ${NAMES[p.w2+4]} adds ${B} L, then pours out ${C} L. How much water is in the jug now?`][p.ctx%2]},
  a:p=>{const v=[p.w1,p.n1,p.d1,p.w2,p.n2,p.d2,p.w3,p.n3,p.d3];if(!v.every(isInt)||[p.d1,p.d2,p.d3].some(d=>d<=0))return BAD('Use whole numbers; denominators more than 0');const A=toImp(p.w1,p.n1,p.d1),B=toImp(p.w2,p.n2,p.d2),C=toImp(p.w3,p.n3,p.d3);const D=A.d*B.d*C.d;const n=A.n*B.d*C.d+B.n*A.d*C.d-C.n*A.d*B.d;return n<0?BAD('The answer is negative'):W(ffmt(n,D))}};
function genMulDivOperand(r,mixed,kind,dens){const d=dens?pick(r,dens):ri(r,2,9);let n;do{n=ri(r,1,d-1)}while(gcd(n,d)!==1);if(kind==='w')return[ri(r,2,9),0,1];if(kind==='m')return[ri(r,1,4),n,d];return[0,n,d]}
const MDF=[['w1','Whole 1'],['n1','Num 1'],['d1','Den 1'],['w2','Whole 2'],['n2','Num 2'],['d2','Den 2']];
SK.frac_mul={instr:'Multiply. Write the answer in simplest form.',fam:'fractions',work:true,noLine:p=>p.mode==='plain',f:MDF,
  g:(r,L,c)=>{const kinds=c.mixed?[['p','w'],['w','m'],['m','m'],['p','m'],['m','p']]:[['p','p']];const [k1,k2]=pick(r,L==='F'&&c.mixed?[['p','w']]:kinds);const word=!!c.word||L==='E';const a=genMulDivOperand(r,c.mixed,k1,word?[2,4]:null),b=genMulDivOperand(r,c.mixed,k2);const o={w1:a[0],n1:a[1],d1:a[2],w2:b[0],n2:b[1],d2:b[2],mode:word?'word':(c.mode==='model'||L==='F'?'of':'plain'),ctx:ri(r,0,1)};if(o.mode==='word'&&o.ctx===1){o.w1=0;if(!o.n1){o.n1=1;o.d1=pick(r,[2,4])}}return o},
  t:p=>{const A=opd(p.w1,p.n1,p.d1),B=opd(p.w2,p.n2,p.d2);if(p.mode==='of')return`What is ${A} of ${B}? (${A} × ${B})`;if(p.mode==='word')return[`A recipe needs ${B} cups of flour for one batch. How much flour is needed for ${A} batch${p.w1>1||p.n1>p.d1?'es':''}?`,`A piece of land is ${B} hectares. ${A} of it is planted with corn. How many hectares are planted with corn?`][p.ctx%2];return`${A} × ${B} = ________`},
  a:p=>{const v=[p.w1,p.n1,p.d1,p.w2,p.n2,p.d2];if(!v.every(isInt)||p.d1<=0||p.d2<=0)return BAD('Use whole numbers; denominators more than 0');const A=toImp(p.w1,p.n1,p.d1),B=toImp(p.w2,p.n2,p.d2);return W(ffmt(A.n*B.n,A.d*B.d))}};
SK.frac_div={instr:'Divide. Write the answer in simplest form.',fam:'fractions',work:true,noLine:p=>p.mode==='plain',f:MDF,
  g:(r,L,c)=>{if(c.mode==='model'||L==='F'){const d=pick(r,[2,3,4,5,6,8]);return{w1:ri(r,1,5),n1:0,d1:1,w2:0,n2:1,d2:d,mode:'howmany'}}const kinds=c.mixed?[['w','p'],['p','w'],['m','p'],['m','m'],['p','m']]:[['p','p']];const word=!!c.word||L==='E';const [k1,k2]=pick(r,word?[['w','p'],['m','p'],['w','m']]:kinds);let a=genMulDivOperand(r,c.mixed,k1),b=genMulDivOperand(r,c.mixed,k2,word?[2,3,4]:null);const A=toImp(...a),B=toImp(...b);if(A.n*B.d<B.n*A.d)[a,b]=[b,a];return{w1:a[0],n1:a[1],d1:a[2],w2:b[0],n2:b[1],d2:b[2],mode:word?'word':'plain',ctx:ri(r,0,1)}},
  t:p=>{const A=opd(p.w1,p.n1,p.d1),B=opd(p.w2,p.n2,p.d2);if(p.mode==='howmany')return`How many ${B}s are in ${A}? (${A} ÷ ${B})`;if(p.mode==='word')return[`How many ${B}-meter pieces can be cut from a ribbon ${A} meters long?`,`A container has ${A} L of water. Each glass holds ${B} L. How many glasses can be filled? (The answer may be a mixed number.)`][p.ctx%2];return`${A} ÷ ${B} = ________`},
  a:p=>{const v=[p.w1,p.n1,p.d1,p.w2,p.n2,p.d2];if(!v.every(isInt)||p.d1<=0||p.d2<=0)return BAD('Use whole numbers; denominators more than 0');const A=toImp(p.w1,p.n1,p.d1),B=toImp(p.w2,p.n2,p.d2);if(B.n===0)return BAD('Cannot divide by 0');const q=ffmt(A.n*B.d,A.d*B.n);if(p.mode==='word'){const whole=Math.floor(A.n*B.d/(A.d*B.n));return W(`${q} (${whole} full ${p.ctx%2?'glass'+(whole===1?'':'es'):'piece'+(whole===1?'':'s')})`)}return W(q)}};

/* ---- factors & multiples ---- */
const factorsOf=n=>{const f=[];for(let i=1;i<=n;i++)if(n%i===0)f.push(i);return f};
SK.multiples={instr:'Answer each item.',fam:'factors',f:[['n','Number'],['k','How many / other number']],
  g:(r,L,c)=>{const n=ri(r,2,12);return L==='F'?{mode:'list',n,k:5}:L==='C'?{mode:'is',n,k:n*ri(r,2,9)+(r()<.4?ri(r,1,n-1):0)}:{mode:'between',n,k:ri(r,20,60)}},
  t:p=>p.mode==='list'?`List the first ${p.k} multiples of ${p.n}.`:p.mode==='is'?`Is ${p.k} a multiple of ${p.n}?`:`List the multiples of ${p.n} between ${p.k} and ${p.k+30}.`,
  a:p=>{if(!isInt(p.n)||!isInt(p.k)||p.n<=0||p.k<0)return BAD('Use whole numbers');if(p.mode==='list')return W(Array.from({length:Math.min(p.k,15)},(_,i)=>p.n*(i+1)).join(', '));if(p.mode==='is')return W(p.k%p.n===0?`Yes (${p.n} × ${p.k/p.n})`:'No');const out=[];for(let x=p.k+1;x<p.k+30;x++)if(x%p.n===0)out.push(x);return W(out.join(', ')||'none',p.k+30>100?'Goes above 100':'')}};
SK.factors={instr:'List all the factors.',fam:'factors',f:[['n','Number']],
  g:(r,L,c)=>({n:pick(r,L==='F'?[6,8,10,12,15,16,18,20]:[24,28,30,32,36,40,42,45,48,50,54,56,60,64,72,80,84,90,96,100])}),
  t:p=>`List all the factors of ${p.n}.`,a:p=>(!isInt(p.n)||p.n<1)?BAD('Use a whole number'):W(factorsOf(p.n).join(', '),p.n>100?'Above 100':'')};
const DIVR={2:n=>['last digit is even',n%2===0],3:n=>[`digit sum ${digitsOf(n).reduce((a,b)=>a+b,0)}`,n%3===0],4:n=>[`last two digits ${n%100}`,n%4===0],5:n=>['last digit is 0 or 5',n%5===0],6:n=>['divisible by both 2 and 3',n%6===0],8:n=>[`last three digits ${n%1000}`,n%8===0],9:n=>[`digit sum ${digitsOf(n).reduce((a,b)=>a+b,0)}`,n%9===0],10:n=>['last digit is 0',n%10===0],11:n=>['alternating digit sum',n%11===0],12:n=>['divisible by both 3 and 4',n%12===0]};
SK.divis={instr:'Use the divisibility rules.',fam:'factors',f:[['n','Number'],['d','Divisor']],
  g:(r,L,c)=>{const sets=[[2,5,10],[3,6,9],[4,8,11,12]];const d=pick(r,L==='F'?sets[0]:L==='C'?sets[0].concat(sets[1]):[].concat(...sets));const n=r()<.55?d*ri(r,12,300):ri(r,100,3000);return{n,d}},
  t:p=>`Is ${fmt(p.n)} divisible by ${p.d}? Explain using the rule.`,
  a:p=>{if(!DIVR[p.d])return BAD('Use 2, 3, 4, 5, 6, 8, 9, 10, 11 or 12');if(!isInt(p.n)||p.n<0)return BAD('Use a whole number');const[why,yes]=DIVR[p.d](p.n);return W(`${yes?'Yes':'No'} (${why})`)}};
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
SK.prime={instr:'Write prime or composite.',fam:'factors',f:[['n','Number']],
  g:(r,L,c)=>({n:ri(r,2,c.max||100)}),t:p=>`Is ${p.n} prime or composite?`,
  a:p=>{if(!isInt(p.n)||p.n<2)return BAD('Use a whole number 2 or more');if(isPrime(p.n))return W('prime');const f=factorsOf(p.n);return W(`composite (${f[1]} × ${p.n/f[1]})`)}};
SK.gcf={instr:'Find the GCF. Show your method.',fam:'factors',work:true,f:[['a','First number'],['b','Second number']],
  g:(r,L,c)=>{const g=ri(r,2,L==='F'?6:12);let a=g*ri(r,1,8),b=g*ri(r,1,8);if(a===b)b+=g;return{a,b}},
  t:p=>`Find the common factors and the GCF of ${p.a} and ${p.b}.`,
  a:p=>{if(!isInt(p.a)||!isInt(p.b)||p.a<1||p.b<1)return BAD('Use whole numbers');const cf=factorsOf(Math.min(p.a,p.b)).filter(x=>p.a%x===0&&p.b%x===0);return W(`Common factors: ${cf.join(', ')}; GCF = ${gcd(p.a,p.b)}`)}};
SK.lcm={instr:'Find the LCM. Show your method.',fam:'factors',work:true,f:[['a','First number'],['b','Second number']],
  g:(r,L,c)=>{let a=ri(r,2,L==='F'?10:15),b=ri(r,2,L==='F'?10:15);if(a===b)b++;return{a,b}},
  t:p=>`List the first few common multiples of ${p.a} and ${p.b}, then find the LCM.`,
  a:p=>{if(!isInt(p.a)||!isInt(p.b)||p.a<1||p.b<1)return BAD('Use whole numbers');const l=lcm(p.a,p.b);return W(`Common multiples: ${l}, ${2*l}, ${3*l}; LCM = ${l}`)}};
SK.gcflcm_word={instr:'Solve. Decide if you need the GCF or the LCM.',fam:'factors',work:true,f:[['a','First number'],['b','Second number']],
  g:(r,L,c)=>{const k=pick(r,['gcf','lcm']);if(k==='gcf'){const g=ri(r,3,12);let a=g*ri(r,2,6),b=g*ri(r,2,6);if(a===b)b+=g;return{k,a,b}}let a=ri(r,4,20),b=ri(r,4,20);if(a===b)b+=2;return{k,a,b}},
  t:p=>p.k==='gcf'?`${NAMES[p.a%NAMES.length]} has ${p.a} mangoes and ${p.b} bananas to put into identical fruit baskets with nothing left over. What is the greatest number of baskets that can be made?`:`Two jeepneys leave the terminal at the same time. One leaves every ${p.a} minutes and the other every ${p.b} minutes. After how many minutes will they leave together again?`,
  a:p=>(!isInt(p.a)||!isInt(p.b)||p.a<1||p.b<1)?BAD('Use whole numbers'):W(p.k==='gcf'?`${gcd(p.a,p.b)} baskets (GCF)`:`${lcm(p.a,p.b)} minutes (LCM)`)};

/* ---- decimals ---- */
function uniqDec(r,ip,dp){const d=shuf(r,[1,2,3,4,5,6,7,8,9,0]);if(d[0]===0)[d[0],d[1]]=[d[1],d[0]];const s=d.slice(0,ip).join('')+'.'+d.slice(ip,ip+dp).join('');if(/0$/.test(s)){return +(s.slice(0,-1)+d[ip+dp])}return +s}
SK.dec_pv={instr:'Answer each question about place value.',fam:'decimals',f:p=>p.mode==='digit'?[['x','Number'],['pl','Place','dplace']]:[['x','Number'],['d','Digit']],
  g:(r,L,c)=>{const x=uniqDec(r,ri(r,1,2),c.dp);const s=String(x).split('.')[1];if(L==='F')return{mode:'digit',x,pl:ri(r,0,c.dp-1)};return{mode:L==='C'?'value':'place',x,d:+s[ri(r,0,s.length-1)]}},
  t:p=>p.mode==='digit'?`In ${dn(p.x)}, which digit is in the ${DPLACES[p.pl]} place?`:p.mode==='value'?`In ${dn(p.x)}, what is the value of the digit ${p.d}?`:`In ${dn(p.x)}, what is the place value of the digit ${p.d}?`,
  a:p=>{if(!okNum(p.x))return BAD('Enter a number');const s=dn(p.x).replace(/,/g,'');const [ip,fp='']=s.split('.');if(p.mode==='digit')return fp.length<p.pl+1?BAD('No digit in that place'):W(fp[p.pl]);const idx=[...fp].map((ch,i)=>ch===String(p.d)?i:-1).filter(i=>i>=0);if(ip.includes(String(p.d)))return BAD(`The digit ${p.d} is also in the whole-number part`);if(!idx.length)return BAD('That digit is not in the decimal part');if(idx.length>1)return BAD('The digit appears more than once');const k=idx[0];return W(p.mode==='value'?dfmt(p.d,k+1):DPLACES[k])}};
SK.dec_words={instr:'Write each number as asked.',fam:'decimals',f:[['x','Number']],
  g:(r,L,c)=>{const k=ri(r,1,c.dp);let x=randDec(r,0,L==='F'?9:99,k);if(dpOf(x)===0)x+=1/pow10(k);x=+x.toFixed(k);return{x,mode:L==='F'?'toNum':pick(r,['toNum','toWords'])}},
  t:p=>p.mode==='toNum'?`Write as a decimal: ${decWords(p.x)}`:`Write in words: ${dn(p.x)}`,
  a:p=>okNum(p.x)&&p.x>=0?W(p.mode==='toNum'?dn(p.x):decWords(p.x)):BAD('Enter a number')};
SK.dec_frac={instr:'Convert. Write fractions in simplest form.',fam:'decimals',f:p=>p.mode==='f2d'?[['n','Numerator'],['d','Denominator']]:[['x','Decimal']],
  g:(r,L,c)=>{if(r()<.5){const d=c.any?pick(r,[2,4,5,8,10,20,25,50,100]):pick(r,[10,100]);return{mode:'f2d',n:ri(r,1,d-1),d}}const k=c.any?ri(r,1,3):ri(r,1,2);let x=randDec(r,0.01,0.99,k);if(x===0)x=0.5;return{mode:'d2f',x}},
  t:p=>p.mode==='f2d'?`Write ${p.n}/${p.d} as a decimal.`:`Write ${dn(p.x)} as a fraction in simplest form.`,
  a:p=>{if(p.mode==='f2d'){if(!isInt(p.n)||!isInt(p.d)||p.d<=0)return BAD('Use whole numbers');let d=p.d;let k=0;const g=fr(p.n,p.d);let dd=g.d;while(dd%2===0)dd/=2;while(dd%5===0)dd/=5;if(dd!==1)return W(dn(+(p.n/p.d).toFixed(4)),'Not a terminating decimal');while(((g.n*pow10(k))%g.d)!==0)k++;return W(dfmt(g.n*pow10(k)/g.d,k))}if(!okNum(p.x))return BAD('Enter a decimal');const k=dpOf(p.x);const f=fr(sc(p.x,k),pow10(k));return W(`${sc(p.x,k)}/${pow10(k)}${f.d!==pow10(k)?' = '+ffmt(f.n,f.d,false):''}`)}};
SK.dec_cmp={instr:'Compare or order the decimals.',fam:'decimals',noLine:p=>p.mode==='cmp',f:p=>p.mode==='cmp'?[['a','First'],['b','Second']]:[['a','A'],['b','B'],['c','C'],['d','D']],
  g:(r,L,c)=>{const k=c.dp;const base=ri(r,0,9);const mk=()=>+(base+ri(r,1,pow10(k)-1)/pow10(k)).toFixed(k);if(L==='E'){const s=new Set();while(s.size<4)s.add(mk());const [a,b,cc,d]=[...s];return{mode:'order',a,b,c:cc,d,dir:pick(r,['asc','desc'])}}let a=mk(),b=mk();if(L==='F')b=+(a+ri(r,1,3)*(r()<.5?-1:1)).toFixed(k);return{mode:'cmp',a,b:b<0?a+1:b}},
  t:p=>p.mode==='cmp'?`${dn(p.a)}  ______  ${dn(p.b)}`:`Arrange from ${p.dir==='asc'?'smallest to largest':'largest to smallest'}: ${[p.a,p.b,p.c,p.d].map(dn).join(';  ')}`,
  a:p=>{if(p.mode==='cmp')return okNum(p.a,p.b)?W(p.a>p.b?'>':p.a<p.b?'<':'='):BAD('Enter numbers');const v=[p.a,p.b,p.c,p.d];if(!okNum(...v))return BAD('Enter four numbers');v.sort((x,y)=>x-y);if(p.dir==='desc')v.reverse();return W(v.map(dn).join(' ; '))}};
SK.dec_round={instr:'Round as asked.',fam:'decimals',noLine:true,f:[['x','Number'],['to','Places','dto']],
  g:(r,L,c)=>{const to=L==='F'?c.to[0]:pick(r,c.to);const k=Math.max(c.dp,to+1);let x=randDec(r,0,99,k);if(sc(x,k)%10===0)x=+(x+1/pow10(k)).toFixed(k);return{x,to}},
  t:p=>`Round ${dn(p.x)} to the nearest ${['whole number','tenth','hundredth','thousandth'][p.to]}.`,
  a:p=>{if(!okNum(p.x)||p.x<0)return BAD('Enter a number');const k=Math.max(dpOf(p.x),p.to);const i=sc(p.x,k);const f=pow10(k-p.to);return W(dfmt(Math.floor((i+f/2)/f),p.to,true))}};
SK.dec_between={instr:'Answer each item.',fam:'decimals',f:[['x','Number']],
  g:(r,L,c)=>{let x=randDec(r,0,9,1);if(sc(x,1)%10===0)x=+(x+0.3).toFixed(1);return{x}},
  t:p=>`On a number line, ${dn(p.x)} is between which two whole numbers? Which one is it closer to?`,
  a:p=>{if(!okNum(p.x)||p.x<0)return BAD('Enter a number');const w=Math.floor(p.x);if(p.x===w)return W(`It is exactly ${w}`);const f=sc(p.x-w,4);return W(`${w} and ${w+1}; ${f===5000?'exactly halfway':'closer to '+(f>5000?w+1:w)}`)}};
SK.dec_as={instr:'Add or subtract. Show your solution.',fam:'decimals',work:true,noLine:p=>!p.word,f:p=>p.word?[['a','Amount'],['b','First cost'],['c','Second cost']]:[['a','First number'],['op','Operation','op'],['b','Second number']],
  g:(r,L,c)=>{if(c.word||L==='E'){const k=c.money?2:c.dp;const a=c.money?ri(r,3,20)*50:randDec(r,10,99,k);const b=c.money?ri(r,1000,a*100*0.4|0)/100:randDec(r,1,a/3,k);const cc=c.money?ri(r,500,a*100*0.4|0)/100:randDec(r,1,a/3,k);return{word:true,money:!!c.money,a,b,c:cc,ctx:ri(r,0,2)}}const k1=ri(r,1,c.dp),k2=ri(r,1,c.dp);let a=randDec(r,1,L==='F'?20:500,k1),b=randDec(r,0.1,L==='F'?9:300,k2);const op=pick(r,['+','-']);if(op==='-'&&b>a)[a,b]=[b,a];return{a,b,op}},
  t:p=>p.word?(p.money?`${NAMES[p.ctx]} had ${peso2(p.a)} and bought fish for ${peso2(p.b)} and vegetables for ${peso2(p.c)}. How much money is left?`:`A tank had ${dn(p.a)} L of water. ${dn(p.b)} L was used in the morning and ${dn(p.c)} L in the afternoon. How much water is left?`):`${dn(p.a)} ${p.op==='+'?'+':'−'} ${dn(p.b)} = ________`,
  a:p=>{if(p.word){if(!okNum(p.a,p.b,p.c))return BAD('Enter numbers');const k=Math.max(dpOf(p.a),dpOf(p.b),dpOf(p.c));const v=sc(p.a,k)-sc(p.b,k)-sc(p.c,k);if(v<0)return BAD('Not enough. Increase the first amount.');return W(p.money?peso2(v/pow10(k)):dfmt(v,k)+' L')}if(!okNum(p.a,p.b))return BAD('Enter numbers');const k=Math.max(dpOf(p.a),dpOf(p.b));const v=p.op==='+'?sc(p.a,k)+sc(p.b,k):sc(p.a,k)-sc(p.b,k);return v<0?BAD('The answer is negative. Swap the numbers.'):W(dfmt(v,k))}};
SK.dec_mul={instr:'Multiply. Show your solution.',fam:'decimals',work:true,noLine:p=>!p.word,f:[['a','First factor'],['b','Second factor']],
  g:(r,L,c)=>{if(c.word||L==='E'){return{word:true,a:ri(r,100,400)+pick(r,[0,0.5]),b:ri(r,1,5)+pick(r,[0,0.5]),ctx:ri(r,0,1)}}if(L==='F')return{a:randDec(r,0.1,50,ri(r,1,2)),b:ri(r,2,9)};return{a:randDec(r,0.1,50,ri(r,1,2)),b:randDec(r,0.1,20,ri(r,1,2))}},
  t:p=>p.word?[`Pork costs ${peso2(p.a)} per kilogram. How much do ${dn(p.b)} kg cost?`,`Galunggong costs ${peso2(p.a)} per kilogram. How much do ${dn(p.b)} kg cost?`][p.ctx%2]:`${dn(p.a)} × ${dn(p.b)} = ________`,
  a:p=>{if(!okNum(p.a,p.b))return BAD('Enter numbers');const k1=dpOf(p.a),k2=dpOf(p.b);const v=sc(p.a,k1)*sc(p.b,k2);const k=k1+k2;if(p.word){const cents=Math.round(v/pow10(k-2));return W(peso2(cents/100),(v%pow10(Math.max(0,k-2)))?'Rounded to the nearest centavo':'')}return W(dfmt(v,k))}};
function repDec(n,d){const ip=Math.floor(n/d);let rem=n%d;const seen={};let digs='';while(rem&&!(rem in seen)&&digs.length<12){seen[rem]=digs.length;rem*=10;digs+=Math.floor(rem/d);rem%=d}if(!rem)return{text:`${ip}.${digs}`,rep:false};const st=seen[rem];const nonrep=digs.slice(0,st),rp=digs.slice(st);return{text:`${ip}.${nonrep}${rp}${rp}${rp}...`,rep:true,rp}}
SK.dec_div={instr:'Divide. Show your solution.',fam:'decimals',work:true,noLine:p=>!p.word,f:[['a','Dividend'],['b','Divisor']],
  g:(r,L,c)=>{if(c.mode==='g6'&&!c.word&&L!=='E'){if(r()<.5){const b=pick(r,[3,6,7,9,11,12]);let a=ri(r,1,30);if(a%b===0)a++;return{a,b,kind:'rep'}}const k=ri(r,2,9);const m=10/gcd(k,10);const q=m*ri(r,1,8);return{a:q*k/10,b:k/10,kind:'bydec'}}
    if(c.word||L==='E'){const b=ri(r,2,12);const q=randDec(r,0.1,5,2);return{word:true,a:+(b*q).toFixed(2),b,ctx:ri(r,0,1)}}
    if(r()<.5){const b=pick(r,[2,4,5,8,10,20,25]);let a=ri(r,1,99);return{a,b}}const b=ri(r,2,15);const q=randDec(r,0.01,9,ri(r,1,3));const a=+(b*q).toFixed(2);if(dpOf(a)>2||Math.abs(a-b*q)>1e-9)return{a:+(b*0.25).toFixed(2),b};return{a,b}},
  t:p=>p.word?[`A bamboo pole ${dn(p.a)} m long is cut into ${p.b} equal pieces. How long is each piece?`,`${dn(p.a)} kg of sugar is shared equally among ${p.b} families. How much does each family get?`][p.ctx%2]:`${dn(p.a)} ÷ ${dn(p.b)} = ________`,
  a:p=>{if(!okNum(p.a,p.b)||p.b===0)return BAD('Enter numbers; divisor not 0');const k=Math.max(dpOf(p.a),dpOf(p.b));const N=sc(p.a,k),D=sc(p.b,k);const g=fr(N,D);let dd=g.d;while(dd%2===0)dd/=2;while(dd%5===0)dd/=5;if(dd!==1){const rd=repDec(g.n,g.d);return W(`${rd.text} (repeating)`)}let e=0;while((g.n*pow10(e))%g.d!==0)e++;const s=dfmt(g.n*pow10(e)/g.d,e);return W(p.word?s+(p.ctx%2?' kg':' m'):s,e>3&&!p.word?'More than 3 decimal places':'')}};
SK.dec_mental={instr:'Find the answer mentally.',fam:'decimals',noLine:true,f:[['x','Number'],['m','Multiply/divide by']],
  g:(r,L,c)=>{const op=c.op;const m=op==='×'?pick(r,[10,100,1000,0.1,0.01,0.001]):pick(r,[0.1,0.01,0.001,10,100,1000]);const x=op==='÷'&&m<1?randDec(r,0.001,99,ri(r,1,4)):randDec(r,0.01,99,ri(r,1,2));return{x,m,op}},
  t:p=>`${dn(p.x)} ${p.op} ${dn(p.m)} = ________`,
  a:p=>{if(!okNum(p.x,p.m)||p.m===0)return BAD('Enter numbers');const kx=dpOf(p.x),km=dpOf(p.m);const X=sc(p.x,kx),M=sc(p.m,km);if(p.op==='×')return W(dfmt(X*M,kx+km));const g=fr(X*pow10(km),M*pow10(kx));let e=0;while((g.n*pow10(e))%g.d!==0&&e<10)e++;return W(dfmt(g.n*pow10(e)/g.d,e))}};
SK.dec_est={instr:'Round each number to the nearest whole number, then estimate.',fam:'decimals',noLine:true,f:[['a','First'],['b','Second']],
  g:(r,L,c)=>{if(c.op==='×')return{op:'×',a:randDec(r,1,30,1),b:randDec(r,1,12,1)};const B=ri(r,2,9),q=ri(r,2,12);const A=B*q;const jit=x=>+(x+pick(r,[-0.3,-0.2,-0.1,0.1,0.2,0.3,0.4])).toFixed(1);return{op:'÷',a:jit(A),b:jit(B)}},
  t:p=>`Estimate: ${dn(p.a)} ${p.op} ${dn(p.b)}`,
  a:p=>{if(!okNum(p.a,p.b))return BAD('Enter numbers');const A=Math.round(p.a),B=Math.round(p.b);if(p.op==='×')return W(`${A} × ${B} = ${A*B}`);if(B===0)return BAD('Divisor rounds to 0');const v=A/B;return W(isInt(v)?`${A} ÷ ${B} = ${v}`:`${A} ÷ ${B} ≈ ${dn(+v.toFixed(1))}`)}};

/* ---- data & probability ---- */
const CATS=[['Mango','Banana','Pineapple','Papaya','Lanzones'],['Monday','Tuesday','Wednesday','Thursday','Friday'],['June','July','August','September','October'],['Grade 3','Grade 4','Grade 5','Grade 6','Kinder']];
SK.table_read={instr:'Use the table to answer.',fam:'data',work:true,f:p=>p.s===2?[['v1','A1'],['v2','A2'],['v3','A3'],['v4','A4'],['v5','A5'],['w1','B1'],['w2','B2'],['w3','B3'],['w4','B4'],['w5','B5']]:[['v1','1'],['v2','2'],['v3','3'],['v4','4'],['v5','5']],
  g:(r,L,c)=>{const cat=c.time?pick(r,[1,2]):pick(r,[0,1,3]);const s=c.series||1;const mk=()=>{let v;do{v=Array.from({length:5},()=>ri(r,5,60))}while(new Set(v).size<5);return v};const v=mk(),w=mk();const qs=s===2?['diff2','total2','maxA','compare']:['max','min','total','diff'];const p={cat,s,q:pick(r,L==='F'?qs.slice(0,2):qs),i:ri(r,0,4),j:ri(r,0,4)};if(p.i===p.j)p.j=(p.i+2)%5;if(v[p.i]<v[p.j])[p.i,p.j]=[p.j,p.i];v.forEach((x,k)=>p['v'+(k+1)]=x);w.forEach((x,k)=>p['w'+(k+1)]=x);return p},
  t:p=>{const C=CATS[p.cat];const V=[1,2,3,4,5].map(k=>p['v'+k]),Wv=[1,2,3,4,5].map(k=>p['w'+k]);const head=p.cat===0?'Fruits sold at a sari-sari store':p.cat===1?'Learners absent this week':p.cat===2?'Rainy days per month':'Learners who joined the clean-up drive';const tbl=p.s===2?`${head} — Section A: ${C.map((x,k)=>`${x} ${V[k]}`).join(', ')}. Section B: ${C.map((x,k)=>`${x} ${Wv[k]}`).join(', ')}.`:`${head}: ${C.map((x,k)=>`${x} ${V[k]}`).join(', ')}.`;const q={max:`Which has the most?`,min:`Which has the least?`,total:`What is the total?`,diff:`How many more is ${C[p.i]} than ${C[p.j]}? (Answer as a difference.)`,diff2:`For ${C[p.i]}, how many more does the bigger section have?`,total2:`What is the total of Section A and Section B for ${C[p.i]}?`,maxA:`In which category does Section B have the most?`,compare:`In how many categories is Section A higher than Section B?`}[p.q];return`${tbl} ${q}`},
  a:p=>{const C=CATS[p.cat];const V=[1,2,3,4,5].map(k=>p['v'+k]),Wv=[1,2,3,4,5].map(k=>p['w'+k]);if(!V.every(x=>okNum(x))||(p.s===2&&!Wv.every(x=>okNum(x))))return BAD('Enter all values');const arg=(a,f)=>{const m=f(...a);const idx=a.map((x,k)=>x===m?k:-1).filter(k=>k>=0);return idx.map(k=>C[k]).join(' and ')};switch(p.q){case'max':return W(arg(V,Math.max));case'min':return W(arg(V,Math.min));case'total':return W(String(V.reduce((a,b)=>a+b,0)));case'diff':return W(String(Math.abs(V[p.i]-V[p.j])),V[p.i]<V[p.j]?`${C[p.i]} is actually less`:'');case'diff2':return W(String(Math.abs(V[p.i]-Wv[p.i])));case'total2':return W(String(V[p.i]+Wv[p.i]));case'maxA':return W(arg(Wv,Math.max));case'compare':return W(String(V.filter((x,k)=>x>Wv[k]).length))}return BAD('?')}};
SK.pictograph={instr:'Use the pictograph to answer. Each * is one symbol.',fam:'data',f:[['k','Each symbol stands for'],['a','Symbols 1'],['b','Symbols 2'],['c','Symbols 3'],['d','Symbols 4']],
  g:(r,L,c)=>{const k=pick(r,c.scale);const p={k,a:ri(r,1,8),b:ri(r,1,8),c:ri(r,1,8),d:ri(r,1,8),q:pick(r,L==='F'?['count','most']:['count','more','total','most']),i:ri(r,0,3),j:ri(r,0,3)};if(p.j===p.i)p.j=(p.i+1)%4;const S=[p.a,p.b,p.c,p.d];if(S[p.i]<S[p.j])[p.i,p.j]=[p.j,p.i];return p},
  t:p=>{const C=CATS[0].slice(0,4);const S=[p.a,p.b,p.c,p.d];const g=C.map((x,k)=>`${x}: ${'*'.repeat(Math.max(0,Math.min(20,S[k])))}`).join(' | ');const key=p.k>1?`Each * = ${p.k} learners.`:'Each * = 1 learner.';const j=p.j===p.i?(p.i+1)%4:p.j;const q={count:`How many learners chose ${C[p.i]}?`,more:`How many more learners chose ${C[p.i]} than ${C[j]}?`,total:'How many learners answered in all?',most:'Which fruit was chosen the most?'}[p.q];return`Favorite fruits — ${g}. ${key} ${q}`},
  a:p=>{const C=CATS[0].slice(0,4);const S=[p.a,p.b,p.c,p.d].map(x=>x*p.k);if(![p.a,p.b,p.c,p.d,p.k].every(isInt))return BAD('Use whole numbers');const j=p.j===p.i?(p.i+1)%4:p.j;switch(p.q){case'count':return W(String(S[p.i]));case'more':return W(String(Math.abs(S[p.i]-S[j])),S[p.i]<S[j]?`${C[p.i]} is actually fewer`:'');case'total':return W(String(S.reduce((a,b)=>a+b,0)));case'most':{const m=Math.max(...S);return W(C.filter((x,k)=>S[k]===m).join(' and '))}}return BAD('?')}};
SK.likely={instr:'Answer each item.',fam:'data',f:[['a','Red'],['b','Blue'],['c','Yellow']],
  g:(r,L,c)=>{const k=pick(r,['cert','imp','more','less','eq']);let a=ri(r,1,8),b=ri(r,1,8),cc=L==='E'?ri(r,1,6):0;if(k==='cert'){b=0;cc=0}else if(k==='imp'){a=0;b=ri(r,2,8)}else if(k==='eq'){b=a}else if(k==='more'){b=ri(r,1,Math.max(1,a-1));if(b>=a)a=b+2}else{a=ri(r,1,3);b=a+ri(r,2,5)}return{a,b,c:cc,mode:L==='E'?'which':'one'}},
  t:p=>`A bag has ${[[p.a,'red'],[p.b,'blue'],[p.c,'yellow']].filter(x=>x[0]>0).map(x=>x[0]+' '+x[1]).join(', ').replace(/, ([^,]*)$/,' and $1')} marble${p.a+p.b+p.c>1?'s':''}${p.a===0?' (no red marbles)':''}. ${p.mode==='which'?'Which color is most likely to be picked? Which is least likely?':'Is picking a red marble certain, impossible, more likely, less likely, or equally likely compared to blue?'}`,
  a:p=>{if(![p.a,p.b,p.c].every(x=>isInt(x)&&x>=0)||p.a+p.b+p.c===0)return BAD('Use whole numbers; at least one marble');if(p.mode==='which'){const v=[['red',p.a],['blue',p.b],['yellow',p.c]];const mx=Math.max(p.a,p.b,p.c),mn=Math.min(p.a,p.b,p.c);return W(`Most likely: ${v.filter(x=>x[1]===mx).map(x=>x[0]).join(', ')}; least likely: ${v.filter(x=>x[1]===mn).map(x=>x[0]).join(', ')}${mn===0?' (impossible)':''}`)}if(p.a===p.a+p.b+p.c)return W('certain');if(p.a===0)return W('impossible');return W(p.a>p.b?'more likely':p.a<p.b?'less likely':'equally likely')}};
SK.prob={instr:'Write the probability as a fraction in simplest form.',fam:'data',f:p=>p.s==='bag'?[['a','Red'],['b','Blue'],['c','Green']]:[],
  g:(r,L,c)=>{const s=pick(r,L==='F'?['coin','die']:['die','bag','spinner']);return{s,a:ri(r,1,6),b:ri(r,1,6),c:ri(r,1,6),ev:ri(r,0,3),col:ri(r,0,2)}},
  t:p=>{if(p.s==='coin')return'A coin is tossed. What is the probability of getting heads?';if(p.s==='die')return`A die is rolled. What is the probability of getting ${['an even number','a number greater than 4','a 3','a number less than 3'][p.ev]}?`;if(p.s==='spinner')return`A spinner has 8 equal parts numbered 1 to 8. What is the probability of landing on ${['an odd number','a number greater than 5','the number 8','a multiple of 3'][p.ev]}?`;return`A bag has ${p.a} red, ${p.b} blue and ${p.c} green marbles. What is the probability of picking a ${['red','blue','green'][p.col]} marble?`},
  a:p=>{if(p.s==='coin')return W('1/2');if(p.s==='die'){const f=[3,2,1,2][p.ev];return W(ffmt(f,6,false))}if(p.s==='spinner'){const f=[4,3,1,2][p.ev];return W(ffmt(f,8,false))}const t=p.a+p.b+p.c;if(![p.a,p.b,p.c].every(x=>isInt(x)&&x>=0)||t===0)return BAD('Use whole numbers');const f=[p.a,p.b,p.c][p.col];return W(f===0?'0 (impossible)':ffmt(f,t,false))}};
const GCH=[['the temperature in Cebu every day for one week','line graph'],['the favorite fruits of Grade 5 learners','bar graph'],['the height of a plant measured every week','line graph'],['the number of boys and girls in each section','bar graph'],['the price of rice every month for a year','line graph'],['the number of books read by each group','bar graph']];
SK.graph_choice={instr:'Write bar graph or line graph.',fam:'data',f:[],g:(r,L,c)=>({i:ri(r,0,GCH.length-1)}),t:p=>`Which graph is better to show ${GCH[p.i][0]}?`,a:p=>W(GCH[p.i][1])};
SK.pie={instr:'Answer using the pie graph data.',fam:'data',work:true,f:[['t','Total'],['p1','% 1'],['p2','% 2'],['p3','% 3']],
  g:(r,L,c)=>{let a=ri(r,2,10)*5,b=ri(r,2,8)*5;if(a+b>85)b=85-a;let cc=100-a-b;if(cc>a)[a,cc]=[cc,a];return{t:pick(r,[40,60,80,100,120,200,400]),p1:a,p2:b,p3:cc,q:c.interp?pick(r,['count','diff']):pick(r,['angle','count']),i:ri(r,0,2)}},
  t:p=>{const C=['walk','ride a jeepney','ride a tricycle'];const d=`In a survey of ${p.t} learners on how they go to school: ${p.p1}% walk, ${p.p2}% ride a jeepney, ${p.p3}% ride a tricycle.`;return`${d} ${{angle:`What angle should the "${C[p.i]}" part of the pie graph have?`,count:`How many learners ${C[p.i]}?`,diff:`How many more learners walk than ride a tricycle?`}[p.q]}`},
  a:p=>{const P=[p.p1,p.p2,p.p3];if(!P.every(x=>okNum(x))||!okNum(p.t))return BAD('Enter numbers');const s=P.reduce((a,b)=>a+b,0);if(s!==100)return BAD(`Percents add up to ${s}%, not 100%`);if(p.q==='angle')return W(`${dn(P[p.i]*3.6)}°`);const cnt=x=>x*p.t/100;if(p.q==='count'){const v=cnt(P[p.i]);return W(dn(v),isInt(v)?'':'Not a whole number of learners')}const v=cnt(p.p1)-cnt(p.p3);return W(dn(v),v<0?'More ride a tricycle':'')}};

/* ---- patterns ---- */
const PSYM=[['A','B'],['a','b','c'],['1','2'],['red','blue'],['clap','stomp'],['circle','square','triangle'],['2','4','6']];
SK.pattern_rep={instr:'Write the next two terms.',fam:'patterns',f:[],g:(r,L,c)=>{const u=PSYM[ri(r,0,PSYM.length-1)];return{u:u.join('|'),reps:2,extra:ri(r,0,u.length-1)}},
  t:p=>{const u=p.u.split('|');const seq=[];for(let k=0;k<p.reps*u.length+p.extra;k++)seq.push(u[k%u.length]);return`${seq.join(', ')}, ____, ____`},
  a:p=>{const u=p.u.split('|');const n=p.reps*u.length+p.extra;return W(`${u[n%u.length]}, ${u[(n+1)%u.length]}`)}};
SK.pattern_inc={instr:'Write the missing terms.',fam:'patterns',f:[['start','Start'],['step','Step'],['dir','Direction','dir']],
  g:(r,L,c)=>{const step=ri(r,L==='F'?1:2,L==='F'?5:25);const dir=r()<.5?1:-1;const start=dir>0?ri(r,1,c.max-step*6):ri(r,step*6,c.max);return{start,step,dir,mode:L==='E'?'middle':'next'}},
  t:p=>{const s=[0,1,2,3,4,5].map(k=>p.start+p.dir*p.step*k);if(p.mode==='middle')return`${s[0]}, ${s[1]}, ____, ${s[3]}, ____, ${s[5]}`;return`${s.slice(0,4).join(', ')}, ____, ____`},
  a:p=>{if(!okNum(p.start,p.step))return BAD('Enter numbers');const s=[0,1,2,3,4,5].map(k=>p.start+p.dir*p.step*k);if(Math.min(...s)<0)return BAD('Goes below 0');return W(p.mode==='middle'?`${s[2]}, ${s[4]}`:`${s[4]}, ${s[5]}`)}};
SK.pattern_rule={instr:'Describe the rule, then give the next term.',fam:'patterns',f:[['start','Start'],['step','Step'],['type','Rule','rule']],
  g:(r,L,c)=>{const type=L==='F'?'add':pick(r,['add','sub','mul']);const step=type==='mul'?ri(r,2,3):ri(r,2,15);const start=type==='sub'?ri(r,step*5,200):ri(r,1,type==='mul'?5:50);return{start,step,type}},
  t:p=>{const s=[p.start];for(let k=1;k<4;k++)s.push(p.type==='add'?s[k-1]+p.step:p.type==='sub'?s[k-1]-p.step:s[k-1]*p.step);return`${s.join(', ')}, ...`},
  a:p=>{if(!okNum(p.start,p.step))return BAD('Enter numbers');let v=p.start;for(let k=0;k<4;k++)v=p.type==='add'?v+p.step:p.type==='sub'?v-p.step:v*p.step;if(v<0)return BAD('Goes below 0');return W(`${{add:'Add',sub:'Subtract',mul:'Multiply by'}[p.type]} ${p.step}; next term ${fmt(v)}`)}};
SK.pattern_combo={instr:'Find the missing terms.',fam:'patterns',f:[],
  g:(r,L,c)=>{const L2=ri(r,2,3);const dir=r()<.7?1:-1;const st=dir>0?ri(r,1,4):ri(r,6,9);return{L2,dir,st,miss:ri(r,L2*2,L2*3-1),explain:!!c.explain}},
  t:p=>{const lets='abc'.slice(0,p.L2);const seq=[];for(let k=0;k<p.L2*3+1;k++){seq.push(`${p.st+p.dir*Math.floor(k/p.L2)}${lets[k%p.L2]}`)}const shown=seq.map((s,k)=>k===p.miss?'____':s);return p.explain?`Explain how this pattern is made: ${seq.slice(0,p.L2*3).join(', ')}, ...`:`${shown.join(', ')}, ____`},
  a:p=>{const lets='abc'.slice(0,p.L2);const term=k=>`${p.st+p.dir*Math.floor(k/p.L2)}${lets[k%p.L2]}`;if(p.explain)return W(`The letters repeat ${lets.split('').join(', ')}; the number ${p.dir>0?'goes up':'goes down'} by 1 after each group of ${p.L2}`);return W(`${term(p.miss)}; ${term(p.L2*3+1)}`)}};

/* ---- ratio & percent ---- */
SK.ratio={instr:'Write each ratio in simplest form.',fam:'ratio',f:[['a','Boys'],['b','Girls']],
  g:(r,L,c)=>{const g=ri(r,2,6);return{a:g*ri(r,1,6),b:g*ri(r,1,6),kind:pick(r,['pp','pw']),word:!!c.word||L==='E'}},
  t:p=>p.word?`A class has ${p.a} boys and ${p.b} girls. ${p.kind==='pp'?'What is the ratio of boys to girls?':'What is the ratio of girls to all learners?'} If 2 more classes have the same numbers, how many learners are there in the 3 classes?`:`A class has ${p.a} boys and ${p.b} girls. What is the ratio of ${p.kind==='pp'?'boys to girls':'girls to all learners'}?`,
  a:p=>{if(!isInt(p.a)||!isInt(p.b)||p.a<0||p.b<0||p.a+p.b===0)return BAD('Use whole numbers');const x=p.kind==='pp'?fr(p.a,p.b):fr(p.b,p.a+p.b);const rs=`${x.n}:${x.d}`;if(!p.word)return W(rs);return W(`${rs}; ${3*(p.a+p.b)} learners`)}};
SK.ratio_frac={instr:'Answer each item.',fam:'ratio',f:[['a','First'],['b','Second']],
  g:(r,L,c)=>{let a=ri(r,1,7),b=ri(r,1,9);if(a===b)b++;const g=gcd(a,b);return{a:a/g,b:b/g,mode:pick(r,['r2f','f2r'])}},
  t:p=>p.mode==='r2f'?`The ratio of red to blue beads is ${p.a}:${p.b}. What fraction of all the beads are red?`:`${p.a}/${p.a+p.b} of the marbles are red; the rest are blue. What is the ratio of red to blue marbles?`,
  a:p=>(!isInt(p.a)||!isInt(p.b)||p.a<0||p.b<0)?BAD('Use whole numbers'):W(p.mode==='r2f'?ffmt(p.a,p.a+p.b,false):(()=>{const f=fr(p.a,p.b);return`${f.n}:${f.d}`})())};
SK.ratio_equiv={instr:'Answer each item.',fam:'ratio',noLine:p=>p.mode==='miss',f:[['a','a'],['b','b'],['k','Multiplier']],
  g:(r,L,c)=>{const a=ri(r,1,9),b=ri(r,1,9);return{a,b,k:ri(r,2,8),mode:L==='E'?'check':'miss',bad:r()<.4}},
  t:p=>p.mode==='miss'?`${p.a}:${p.b} = ${p.a*p.k}:____`:`Are ${p.a}:${p.b} and ${p.a*p.k}:${p.b*p.k+(p.bad?1:0)} equivalent ratios?`,
  a:p=>{if(![p.a,p.b,p.k].every(isInt)||p.b<=0)return BAD('Use whole numbers');if(p.mode==='miss')return W(String(p.b*p.k));const y=p.b*p.k+(p.bad?1:0);return W(p.a*y===p.b*p.a*p.k?'Yes':'No')}};
SK.ratio_times={instr:'Answer each item.',fam:'ratio',f:[['a','First'],['b','Second']],
  g:(r,L,c)=>{const b=ri(r,1,5),k=ri(r,2,6);return{a:b*k,b,mode:pick(r,['times','ratio'])}},
  t:p=>p.mode==='times'?`The ratio of Ana's savings to Ben's savings is ${p.a}:${p.b}. How many times larger are Ana's savings than Ben's?`:`A mango tree is ${p.a/p.b} times as tall as a calamansi plant. What is the ratio of their heights?`,
  a:p=>{if(!okNum(p.a,p.b)||p.b<=0)return BAD('Enter numbers');const k=p.a/p.b;return W(p.mode==='times'?`${dn(+k.toFixed(2))} times`:`${dn(+k.toFixed(2))}:1`)}};
SK.proportion={instr:'Solve using ratio and proportion.',fam:'ratio',work:true,f:[['a','Amount 1'],['b','Cost 1'],['c','Amount 2']],
  g:(r,L,c)=>{const unit=ri(r,2,60)*(r()<.5?5:1);const a=ri(r,2,6);let cc=ri(r,2,12);if(cc===a)cc++;return{a,b:a*unit,c:cc,ctx:ri(r,0,2)}},
  t:p=>[`If ${p.a} kg of rice cost ${peso(p.b)}, how much do ${p.c} kg cost?`,`A jeepney uses ${p.a} L of diesel for ${fmt(p.b)} km. How far can it go on ${p.c} L?`,`${p.a} notebooks cost ${peso(p.b)}. How much do ${p.c} notebooks cost?`][p.ctx%3],
  a:p=>{if(!okNum(p.a,p.b,p.c)||p.a<=0)return BAD('Enter numbers');const v=p.b*p.c/p.a;const s=isInt(v)?fmt(v):dn(+v.toFixed(2));return W(p.ctx%3===1?`${s} km`:peso(+v.toFixed(2)),isInt(v)?'':'Not a whole number')}};
SK.percent={instr:'Answer each item.',fam:'ratio',f:p=>p.mode==='f2p'?[['n','Numerator'],['d','Denominator']]:p.mode==='of'?[['v','Percent'],['t','Total']]:[['v','Value']],
  g:(r,L,c)=>{const mode=pick(r,L==='E'?['of','p2f','f2p']:['f2p','p2d','d2p','p2f']);if(mode==='f2p'){const d=pick(r,[2,4,5,10,20,25,50]);return{mode,n:ri(r,1,d-1),d}}if(mode==='of')return{mode,v:pick(r,[10,20,25,50,75,5,40]),t:pick(r,[20,40,80,100,120,200,60])};return{mode,v:ri(r,1,99)}},
  t:p=>({f2p:`Write ${p.n}/${p.d} as a percent.`,p2d:`Write ${p.v}% as a decimal.`,d2p:`Write ${dn(p.v/100)} as a percent.`,p2f:`Write ${p.v}% as a fraction in simplest form.`,of:`What is ${p.v}% of ${p.t}?`}[p.mode]),
  a:p=>{if(p.mode==='f2p'){if(!isInt(p.n)||!isInt(p.d)||p.d<=0)return BAD('Use whole numbers');const v=p.n*100/p.d;return W(`${dn(+v.toFixed(2))}%`,isInt(v)?'':'Not a whole-number percent')}if(!okNum(p.v))return BAD('Enter a number');if(p.mode==='p2d')return W(dfmt(sc(p.v,dpOf(p.v)),dpOf(p.v)+2));if(p.mode==='d2p')return W(`${dn(p.v)}%`);if(p.mode==='p2f')return W(ffmt(sc(p.v,dpOf(p.v)),100*pow10(dpOf(p.v)),false));const v=p.v*p.t/100;return W(dn(+v.toFixed(2)))}};

/* ---- field option lists ---- */
const OPTS={place:()=>PLACES.slice(0,6).map((p,j)=>[j,p]),dplace:()=>DPLACES.slice(0,3).map((p,j)=>[j,p]),op:()=>[['+','+ add'],['-','− subtract']],dir:()=>[[1,'up / increasing'],[-1,'down / decreasing']],ord:()=>[['asc','smallest to largest'],['desc','largest to smallest']],to:()=>[[10,'ten'],[100,'hundred'],[1000,'thousand'],[10000,'ten thousand'],[100000,'hundred thousand']],dto:()=>[[0,'whole number'],[1,'tenth'],[2,'hundredth'],[3,'thousandth']],denom:()=>DENOM.map(d=>[d,peso(d)]),rule:()=>[['add','add'],['sub','subtract'],['mul','multiply']]};

/* ---- items ---- */
function makeItems(comp,level,n,seed){const s=SK[comp.sk];const r=rng(seed);const out=[];for(let i=0;i<n;i++)out.push({p:s.g(r,level,comp.cfg||{})});return out}
function itemText(comp,it){return SK[comp.sk].t(it.p,comp.cfg||{})}
function itemAns(comp,it){try{return SK[comp.sk].a(it.p,comp.cfg||{})}catch(e){return BAD('Check the numbers')}}
function itemFields(comp,it){const f=SK[comp.sk].f;return typeof f==='function'?f(it.p):f}
const flag=(v,p)=>typeof v==='function'?!!v(p):!!v;
function itemMeta(comp,it){const s=SK[comp.sk];return{noLine:flag(s.noLine,it.p),work:flag(s.work,it.p),nl:s.nl?s.nl(it.p):null}}
