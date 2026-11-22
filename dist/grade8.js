const gradeEight = {
  sources:{
    pacing:'https://sites.google.com/deped.gov.ph/lsguide',
    local:'https://sites.google.com/deped.gov.ph/cidhubdatabase/lr-materials'
  },
  books:{},
  packs:{}
};
const gradeEightActivities={
  'Araling Panlipunan':['Heograpiya at pamumuhay','Gamitin ang pisikal na mapa at tala ng guro tungkol sa dalawang pamayanan.',[
    ['Tukuyin ang isang ilog at isang kabundukan sa mapa.','Suriin ang dalawang tamang lokasyon sa mapa.'],
    ['Ihambing ang dalawang lugar. Ipaliwanag kung paano maaaring makaapekto ang anyong lupa o tubig sa transportasyon at kabuhayan.','Halimbawa: maaaring magsilbing ruta ang ilog, samantalang maaaring kailanganin ang ibang daan sa matarik na lugar.'],
    ['Pumili ng dalawang posibleng lokasyon para sa isang pamilihan. Ihambing ang pakinabang at hamon sa bawat isa gamit ang mapa.','Hanapin ang dalawang mapatutunayang detalye sa mapa at isang makatwirang paliwanag sa pagpili.']]],
  English:['Conflict and values','Read: Lina wanted to rehearse alone after class. Sam asked the group to stay because one member had missed practice. Lina agreed to a short group rehearsal, then stayed a little longer to practise her solo.',[
    ['What do Lina and Sam want?','Lina wants to rehearse alone. Sam wants the group to stay and help a member catch up.'],
    ['Identify the conflict and explain what value the resolution expresses. Cite a detail.','Character versus character. Accept cooperation or fairness supported by the shared rehearsal and time for the solo.'],
    ['Rewrite the ending so that it expresses a different priority, then explain how the changed resolution affects the story’s message.','Check a plausible alternate resolution and a clear comparison of the values expressed.']]],
  'TLE: AFA / FCS / IA':['Aquaculture and fisheries','Consider a fishpond and a boat catching wild fish.',[
    ['Which example is aquaculture?','Raising fish in a pond.'],
    ['Explain how fish farming and catching wild fish are related to fisheries and how they differ.','Both are part of fisheries. Aquaculture raises aquatic organisms under managed conditions; capture fisheries harvest wild stocks.'],
    ['A community needs a steady fish supply. Compare one opportunity and one environmental consideration for aquaculture and capture fisheries.','Check meaningful contrasts, such as managed production and water quality for farms, or demand and pressure on wild stocks for capture fisheries.']]],
  'TLE: ICT':['Assess tools for online marketing','Use a fictional school fair with a printed flyer, an official web page and a scheduled social post.',[
    ['Which option can display the full event schedule online: the school web page or the printed flyer by itself?','The school web page.'],
    ['Compare an official web page and a social post for reaching families. Give a strength and limitation of each.','Examples: web page keeps stable details but needs visitors; social posts can reach followers quickly but may be missed in a feed.'],
    ['Choose a two-channel plan for the fair and name a non-personal measure to check whether it worked.','Give a sensible plan and a measure such as aggregate page views or event attendance without collecting student information.']]],
  Filipino:['Kaligirang pangkasaysayan ng Propaganda at Himagsikan','Gamitin ang timeline at sipi ng tekstong pinili ng guro.',[
    ['Tukuyin sa timeline kung aling pangyayari ang nauna.','Suriin kung tama ang pagbasa sa petsa at pagkakasunod.'],
    ['Pumili ng dalawang pangyayari at ipaliwanag ang kaugnayan ng isa sa tekstong binasa.','Hanapin ang wastong detalye at malinaw na ugnayang may batayan sa sipi.'],
    ['Ipaliwanag kung paano makatutulong ang konteksto ng panahon sa pagbasa ng isang pahayag sa teksto. Magbigay ng ebidensiya.','Suriin ang tumpak na konteksto, kaugnay na sipi, at lohikal na paliwanag.']]],
  'Values Education':['Kamalayan sa emosyon','Gamitin ang kathang-isip na sitwasyon: nakatanggap ang isang mag-aaral ng komentong hindi niya inaasahan.',[
    ['Magbigay ng isang emosyon at isang posibleng palatandaan sa katawan.','Tanggapin ang makatwirang pares, gaya ng kaba at mabilis na tibok ng puso.'],
    ['Paghiwalayin ang nararamdaman, iniisip at nagawa ng tauhan. Magmungkahi ng maingat na tugon.','Suriin ang malinaw na pagkakaiba at tugong nagbibigay ng oras upang mag-isip o humingi ng paglilinaw.'],
    ['Ihambing ang agarang pagsagot at paghinto muna upang suriin ang emosyon. Ipaliwanag ang maaaring bunga ng bawat tugon.','Hanapin ang dalawang posibleng bunga at isang makatwirang paliwanag na may paggalang sa kapuwa.']]],
  MAPEH:['Emerging Asian performing and visual arts','Use two teacher-selected works from Asian countries and record the source for each.',[
    ['Identify one visible or audible feature of either work.','Accept an observable feature, such as colour, movement, rhythm or digital imagery.'],
    ['Compare a performing or visual feature in two works. Describe how a newer tool or format is used.','Check two accurate observations and a supported example of the newer tool or format.'],
    ['Explain how one work combines an established form with a contemporary medium or audience. Support the explanation with evidence.','Check a clear link between form, medium or audience and evidence from the work or teacher-provided source.']]],
  Mathematics:['Mean, median and mode','Show your calculations. Sort a list before finding the median.',[
    ['Find the mean of 4, 6 and 8.','6.'],
    ['Find the mean, median and mode of 2, 4, 4, 6, 9.','Mean 5; median 4; mode 4.'],
    ['Compare the mean and median of 3, 4, 4, 5, 6 with those of 3, 4, 4, 5, 24. Which measure changes less and why?','The mean changes from 4.4 to 8, but the median stays 4. The middle position does not move when only the largest value increases.']]],
  Science:['Trace food through the digestive tract','Use a teacher-provided labelled digestive-system diagram.',[
    ['Place the mouth, esophagus and stomach in the order that food reaches them.','Mouth → esophagus → stomach.'],
    ['Trace food from mouth to anus. Give one example each of mechanical processing, secretion, chemical digestion and absorption.','Mouth → esophagus → stomach → small intestine → large intestine → rectum → anus. Examples: chewing, saliva secretion, enzyme breakdown and nutrient uptake in the small intestine.'],
    ['Explain why the liver and pancreas are shown even though food does not pass through them. Distinguish absorption from elimination.','They provide substances that assist digestion. Absorption moves substances into the body; elimination removes undigested residue.']]]
};
for (const [area,[title,direction,items]] of Object.entries(gradeEightActivities)) {
  const row=gradeEightCurriculum[area].terms[0][0];
  const [foundation,core,extension]=items;
  gradeEight.packs[area]={
    term:'Term 1',week:/^Weeks? /i.test(row.section) ? row.section : '',
    title,goal:row.label,direction,support:[foundation[0]],tasks:[core[0]],extension:[extension[0]],
    answers:core[1],keys:{Foundation:foundation[1],Extension:extension[1]}
  };
}
