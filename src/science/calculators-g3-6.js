/* GuroPrep Science Grades 3–6, Terms 1–2. Loads after src/science-jhs/calculators.js (JSG) and src/science/items-and-activities-g3-6-term3.js (SCIB). Keys are grade-term-index. */
/* ===================== Elementary Science Terms 1–2: computed items (answers calculated) ===================== */
{const P=(r,a)=>a[Math.floor(r()*a.length)];const N=x=>Number(x).toLocaleString('en-US',{maximumFractionDigits:2});
 /* length: mm, cm, m (Grade 3) */
 JSG.elen=(r,L)=>{const t=L==='F'?P(r,[0,1]):L==='C'?P(r,[1,2]):P(r,[2,3]);
  if(t===0){const a=P(r,[6,7,8,9,10,11,12,13,14,15]),b=P(r,[2,3,4,5]);const it=P(r,[['pencil','crayon'],['leaf','flower'],['ribbon','string'],['book','notebook']]);return{q:`A ${it[0]} is ${a} cm long. A ${it[1]} is ${a-b} cm long. How much longer is the ${it[0]}?`,a:`${a} − ${a-b} = ${b} cm`}}
  if(t===1){const c=P(r,[2,3,4,5,6,8,12,15]);return P(r,[0,1])?{q:`1 cm = 10 mm. How many millimeters are in ${c} cm?`,a:`${c} × 10 = ${c*10} mm`}:{q:`1 cm = 10 mm. A twig is ${c*10} mm long. How many centimeters is that?`,a:`${c*10} ÷ 10 = ${c} cm`}}
  if(t===2){const m=P(r,[2,3,4,5,6,10]);return P(r,[0,1])?{q:`1 m = 100 cm. A garden plot is ${m} m long. How many centimeters is that?`,a:`${m} × 100 = ${m*100} cm`}:{q:`1 m = 100 cm. A rope is ${m*100} cm long. How many meters is that?`,a:`${m*100} ÷ 100 = ${m} m`}}
  const h1=P(r,[3,4,5,6]),d=P(r,[2,3,4]),days=P(r,[3,4,5]);return{q:`A seedling is ${h1} cm tall. It grows ${d} cm each day. How tall will it be after ${days} days if it keeps growing this way?`,a:`${h1} + ${d} × ${days} = ${h1+d*days} cm`}};
 /* volume: mL, L (Grade 5) */
 JSG.evol=(r,L)=>{const t=L==='F'?P(r,[0,1]):L==='C'?P(r,[1,2]):P(r,[2,3]);
  if(t===0){const a=P(r,[20,25,30,35,40,45,50]),b=P(r,[10,15,20,25]);return{q:`A measuring cylinder has ${a} mL of water. You pour in ${b} mL more. How much water is in it now?`,a:`${a} + ${b} = ${a+b} mL`}}
  if(t===1){const l=P(r,[2,3,4,5]);return P(r,[0,1])?{q:`1 L = 1,000 mL. How many milliliters are in ${l} L?`,a:`${l} × 1,000 = ${N(l*1000)} mL`}:{q:`1 L = 1,000 mL. A water jug holds ${N(l*1000+500)} mL. How many liters is that?`,a:`${N(l*1000+500)} ÷ 1,000 = ${l}.5 L`}}
  if(t===2){const s=P(r,[250,330,500]),k=P(r,[2,3,4]);return{q:`A bottle holds ${s} mL. How many milliliters do ${k} full bottles hold? Is that more or less than 1 L?`,a:`${s} × ${k} = ${N(s*k)} mL; ${s*k>1000?'more than':s*k===1000?'exactly':'less than'} 1 L`}}
  const a=P(r,[40,50,60,70]),d=P(r,[8,12,15,18,20]);const o=P(r,['stone','marble','small toy']);return{q:`The water in a measuring cylinder is at ${a} mL. When a ${o} is dropped in, the water rises to ${a+d} mL. What is the volume of the ${o}?`,a:`${a+d} − ${a} = ${d} mL (the ${o} takes up ${d} mL of space)`}};
 /* mass: mg, g, kg (Grade 5) */
 JSG.emass=(r,L)=>{const t=L==='F'?P(r,[0,1]):L==='C'?P(r,[1,2]):P(r,[2,3]);
  if(t===0){const k=P(r,[2,3,4,5,10]);return{q:`1 kg = 1,000 g. How many grams are in ${k} kg?`,a:`${k} × 1,000 = ${N(k*1000)} g`}}
  if(t===1){const g=P(r,[1500,2500,3500,4500]);return{q:`1 kg = 1,000 g. A bag of mangoes has a mass of ${N(g)} g. What is its mass in kilograms?`,a:`${N(g)} ÷ 1,000 = ${N(g/1000)} kg`}}
  if(t===2){const k=P(r,[2,3,5]),u=P(r,[250,500,750]);return{q:`A sack has ${k} kg of rice. The family cooks ${u} g. How many grams of rice are left?`,a:`${N(k*1000)} − ${u} = ${N(k*1000-u)} g`}}
  const e=P(r,[150,200,250]),f=P(r,[350,400,500]);return{q:`An empty bottle has a mass of ${e} g. Filled with water, its mass is ${e+f} g. What is the mass of the water? What does this show about liquids?`,a:`${e+f} − ${e} = ${f} g. Liquids have mass.`}};
 /* temperature in °C (Grades 5–6) */
 JSG.etemp=(r,L)=>{const t=L==='F'?0:L==='C'?P(r,[0,1]):P(r,[1,2]);
  if(t===0){const a=P(r,[25,26,27,28,29,30]),d=P(r,[5,10,15,20]);return{q:`Water in a cup is ${a} °C. After heating, it is ${a+d} °C. By how many degrees did its temperature go up?`,a:`${a+d} − ${a} = ${d} °C`}}
  if(t===1){const a=P(r,[60,70,80,90]),d=P(r,[10,15,20,25]);return{q:`Hot water is ${a} °C. After 10 minutes on the table, it is ${a-d} °C. How many degrees did it cool?`,a:`${a} − ${a-d} = ${d} °C`}}
  const s=P(r,[26,28,30]);const x=[s,s+P(r,[6,8,10]),s+P(r,[14,16,18])];return{q:`A thermometer in heated water reads ${x[0]} °C at 0 min, ${x[1]} °C at 2 min and ${x[2]} °C at 4 min. How much did the temperature rise in all? In which 2 minutes did it rise more?`,a:`${x[2]} − ${x[0]} = ${x[2]-x[0]} °C in all; it rose ${x[1]-x[0]} °C in the first 2 minutes and ${x[2]-x[1]} °C in the next 2 minutes, so ${x[1]-x[0]>x[2]-x[1]?'the first 2 minutes':x[1]-x[0]<x[2]-x[1]?'the last 2 minutes':'both equally'}.`}};
 /* speed = distance ÷ time (Grade 4) */
 JSG.espeed=(r,L)=>{const t=L==='F'?0:L==='C'?P(r,[0,1]):P(r,[1,2]);
  const who=P(r,[['toy car','m','s'],['snail','cm','min'],['jeepney','km','h'],['runner','m','s'],['bicycle','m','s']]);const U={s:'second',min:'minute',h:'hour'}[who[2]];
  const v=who[0]==='jeepney'?P(r,[20,30,40]):who[0]==='snail'?P(r,[2,3,4,5]):who[0]==='runner'?P(r,[3,4,5,6]):P(r,[2,3,4,5]);const tm=P(r,[2,3,4,5,6]);
  if(t===0)return{q:`A ${who[0]} moves ${v*tm} ${who[1]} in ${tm} ${U}s. How far does it move in 1 ${U}? (This is its speed.)`,a:`${v*tm} ÷ ${tm} = ${v} ${who[1]} each ${U} (${v} ${who[1]}/${who[2]})`};
  if(t===1)return{q:`A ${who[0]} moves ${v} ${who[1]} every ${U}. How far will it go in ${tm} ${U}s?`,a:`${v} × ${tm} = ${v*tm} ${who[1]}`};
  const a=P(r,[12,15,20,24]),ta=P(r,[3,4,6]),tb=P(r,[2,4,5]);const sa=a/ta,sb=a/tb;return{q:`Toy car A travels ${a} m in ${ta} s. Toy car B travels ${a} m in ${tb} s. Find each speed. Which car is faster?`,a:`A: ${a} ÷ ${ta} = ${N(sa)} m/s; B: ${a} ÷ ${tb} = ${N(sb)} m/s. ${sa>sb?'Car A':sa<sb?'Car B':'Neither (same speed)'} is faster.`}};
 /* lever balance with equal coins on a ruler (Grade 6) */
 JSG.elever=(r,L)=>{const pairs=[[2,6,3,4],[3,4,2,6],[4,3,2,6],[6,2,3,4],[2,8,4,4],[4,4,2,8],[3,6,2,9],[6,3,9,2]];const p=P(r,pairs);const t=L==='F'?0:L==='C'?P(r,[0,1]):P(r,[1,2]);
  if(t===0)return{q:`A ruler balances on a pencil (fulcrum). ${p[0]} coins sit ${p[1]} cm to the left of the fulcrum. How many coins at ${p[3]} cm to the right will balance it?`,a:`${p[0]} × ${p[1]} = ${p[0]*p[1]}; ${p[0]*p[1]} ÷ ${p[3]} = ${p[2]} coins`};
  if(t===1)return{q:`${p[0]} coins sit ${p[1]} cm left of the fulcrum. Where must you put ${p[2]} coins on the right so the ruler balances?`,a:`${p[0]} × ${p[1]} = ${p[0]*p[1]}; ${p[0]*p[1]} ÷ ${p[2]} = ${p[3]} cm from the fulcrum`};
  const near=P(r,[20,25,30]),far=near*P(r,[2,3]);return{q:`A load sits 10 cm from the fulcrum of a lever. Compare pushing down ${near} cm and ${far} cm from the fulcrum. Which needs less force? About how many times less?`,a:`Pushing at ${far} cm needs less force, about ${far/near} times less, because the effort is ${far/near} times farther from the fulcrum (force × distance stays the same).`}};
 /* wave speed = frequency × wavelength (Grade 6) */
 JSG.ewave=(r,L)=>{const f=P(r,[1,2,3,4,5]),w=P(r,[2,3,4,5,10]);const t=L==='E'?P(r,[1,2]):P(r,[0,1]);
  if(t===0)return{q:`A water wave has a frequency of ${f} wave${f>1?'s':''} per second (${f} Hz) and a wavelength of ${w} cm. What is its speed? (speed = frequency × wavelength)`,a:`${f} × ${w} = ${f*w} cm/s`};
  if(t===1)return{q:`You count ${f*10} waves passing a leaf in 10 seconds. What is the frequency?`,a:`${f*10} ÷ 10 = ${f} wave${f>1?'s':''} per second (${f} Hz)`};
  return{q:`A wave moves at ${f*w} cm/s and its wavelength is ${w} cm. What is its frequency?`,a:`${f*w} ÷ ${w} = ${f} Hz`}};
}
