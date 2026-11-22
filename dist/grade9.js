const gradeNine = {
  sources:{
    pacing:'https://sites.google.com/deped.gov.ph/lsguide',
    local:'https://sites.google.com/deped.gov.ph/projectgrasp/revised-k-to-10-curriculum'
  },
  books:{},
  packs:{}
};
const gradeNineActivities={
  'Araling Panlipunan':['Limitadong yaman at pagpili','May takdang badyet ang paaralan para sa hardin at pagtitipid ng tubig.',[
    ['Ano ang limitadong yaman sa sitwasyon?','Ang badyet ng paaralan.'],
    ['Pumili sa pagbili ng dagdag na punla o pag-aayos ng tagas. Tukuyin ang alternatibong isinuko.','Ang hindi piniling opsiyon ang opportunity cost kung ito ang pinakamainam na alternatibo.'],
    ['Ihambing ang dalawang opsiyon ayon sa agarang gastos at pangmatagalang epekto sa tubig. Ipagtanggol ang iyong pagpili.','Suriin ang parehong pamantayan at ang paliwanag kung paano susuporta ang pagpili sa likas-kayang pag-unlad.']]],
  English:['Character conflict and communal values','Read: Ana asked the council to fund more library lights. Leo argued that the same money should open a free weekend study room. They agreed to light one shared room and reserve two free weekend sessions.',[
    ['Name the characters and what each initially wants.','Ana wants more library lights. Leo wants free weekend access.'],
    ['Identify the conflict and explain a community value shown by the decision.','Character versus character. The compromise supports fair access or cooperation. Cite the shared room or free sessions.'],
    ['Explain how funding only one proposal could change the value expressed. Support your reading with details.','Accept a reasoned interpretation linking the alternate ending to the original goals and resolution.']]],
  Filipino:['Kaligirang pangkasaysayan ng panitikan','Gamitin ang timeline at sipi ng guro tungkol sa Kasarinlan, Aktibismo at Batas-Militar.',[
    ['Ayusin ang tatlong pangyayari ayon sa petsang nakasaad sa timeline.','Suriin ang pagkakasunod batay sa ibinigay na mga petsa.'],
    ['Iugnay ang isang detalye mula sa sipi sa isang pangyayari sa timeline.','Hanapin ang tumpak na pangyayari at malinaw na paliwanag na batay sa sipi.'],
    ['Paano makaiiba ang konteksto sa interpretasyon ng sipi? Banggitin ang limitasyon ng iyong ebidensiya.','Suriin ang ugnayan ng konteksto at teksto at ang makatwirang pagkilala sa hindi pa tiyak.']]],
  MAPEH:['Contemporary arts and cultural influence','Use a teacher-selected local work and one international work in a similar medium.',[
    ['Name one technique you can observe.','Accept an accurate visual or performing technique from either work.'],
    ['Compare the techniques and explain one way the Filipino work expresses a local identity.','Check a concrete similarity or difference and a supported link to local context.'],
    ['Evaluate a claim that the local work was influenced by the international work. What evidence would distinguish influence from coincidence?','Look for documented contact, chronology or attribution, plus a clear account of what visual similarity can and cannot establish.']]],
  Mathematics:['Geometric objects and notation','Use a ruler and label your diagram.',[
    ['Draw point A and segment AB. Mark the endpoints.','A is a point; segment AB has endpoints A and B.'],
    ['Sketch line AB, ray AB and angle ABC. Indicate the vertex and directions.','Line extends both ways, ray starts at A and passes through B, and ABC has vertex B.'],
    ['Draw a plane P with noncollinear points A, B and C. Draw rays BA and BC and explain why swapping B and A in ray BA changes the ray.','The vertex is B, and ray BA starts at B. Ray AB starts at A and extends in a different direction.']]],
  Science:['Inertia and unbalanced forces','Consider a toy car on a classroom track.',[
    ['What tends to happen to a car at rest if the net force is zero?','It stays at rest.'],
    ['Explain why a rolling car slows down on carpet instead of maintaining its speed.','Friction acts against motion, giving a nonzero net force and reducing speed.'],
    ['Compare two carts moving side by side at constant speed. One receives a brief sideways push. Explain their later motion.','The unchanged cart continues at the same speed and direction if net force is zero. The pushed cart changes velocity during the push.']]],
  'Values Education':['Pagpapahalaga at kamalayan sa sarili','Isaalang-alang ang sitwasyon: may kagrupo kang gustong ipasa agad ang gawa kahit may napansing maling datos.',[
    ['Tukuyin ang isang pagpapahalagang naaapektuhan.','Halimbawa: katapatan o pananagutan.'],
    ['Ipaliwanag kung paano makatutulong ang pagpapahalaga upang makita ang sarili mong reaksyon at magpasya.','Tanggapin ang pagninilay sa reaksyon at tugong nakabatay sa katapatan, gaya ng pagwawasto muna.'],
    ['Ihambing ang dalawang posibleng tugon at tukuyin kung anong gawi ang nais mong paunlarin.','Suriin ang dalawang makatwirang tugon at malinaw na ugnayan ng piniling gawi sa pagpapahalaga.']]],
  'TLE: AFA - Agricultural Crop Production':['Inventory for crop production','Use a fictional school garden inventory.',[
    ['Is a hand trowel a material or a tool?','A tool.'],
    ['Make an inventory table for seed packets, hand trowels and a watering can. Include category, quantity and condition.','Each item has a category and recorded quantity and condition. Seeds are materials; trowels and watering cans are hand tools.'],
    ['Two tools are listed but only one is present. Write the correction and explain how to document the discrepancy.','Record expected and actual counts, date and item condition; report the difference to the responsible teacher.']]]
};
for (const [area,[title,direction,items]] of Object.entries(gradeNineActivities)) {
  const row=gradeNineCurriculum[area].terms[0][0];
  const [foundation,core,extension]=items;
  gradeNine.packs[area]={
    term:'Term 1',week:/^Weeks? /i.test(row.section) ? row.section : '',
    title,goal:row.label,direction,support:[foundation[0]],tasks:[core[0]],extension:[extension[0]],
    answers:core[1],keys:{Foundation:foundation[1],Extension:extension[1]}
  };
}
