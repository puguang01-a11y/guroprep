const gradeTenCurriculum = {
  ...gradeTenCoreCurriculum,
  ...Object.fromEntries(Object.entries(gradeNineCurriculum).filter(([,group])=>group.schoolScheduled))
};
const gradeTen = {
  sources:{
    pacing:'https://sites.google.com/deped.gov.ph/deped-lrportal/three-term-budget-of-work-bow/grade-10',
    local:'https://sites.google.com/deped.gov.ph/projectgrasp/revised-k-to-10-curriculum'
  },
  books:{},
  packs:{
    'TLE: AFA - Agricultural Crop Production':gradeNine.packs['TLE: AFA - Agricultural Crop Production']
  }
};
const gradeTenActivities={
  'Araling Panlipunan':['Pagsusuri sa kontemporanyong isyu','Gamitin ang dalawang pahayag tungkol sa isang panukala sa transportasyon sa inyong lugar.',[
    ['Tukuyin ang isyung tinatalakay at isang pangkat na maaapektuhan.','Suriin kung ang isyu at pangkat ay makikita sa ibinigay na materyales.'],
    ['Ihambing ang dalawang pahayag. Alin ang may datos at alin ang may opinyon? Ipaliwanag kung bakit mahalagang malaman ang pagkakaiba.','Hanapin ang tiyak na detalye at paliwanag na ang pagsusuri sa ebidensiya ay nakatutulong sa matalinong pagpapasiya.'],
    ['Bumuo ng pansamantalang posisyon. Tukuyin kung anong karagdagang datos ang maaaring magpabago rito.','Tanggapin ang posisyong nakabatay sa sanggunian at malinaw ang limitasyon nito.']]],
  English:['Character conflict and social values','Read: Jessa wanted the school paper to publish names from a leaked attendance list. Ramon argued that the story could address attendance without identifying students. The editors published aggregate data and asked the school to explain its process.',[
    ['What does each character want to publish?','Jessa wants names. Ramon wants to address attendance without identifying students.'],
    ['Explain how the resolution expresses two values. Use details from the text.','Accountability through reporting and requesting an explanation; privacy through publishing aggregate data.'],
    ['Rewrite the editorial decision to prioritise one value differently, then analyse how that shifts the story’s message.','Accept a plausible revision and an explanation connected to the original conflict and outcome.']]],
  Filipino:['Kaligirang pangkasaysayan ng El Filibusterismo','Gamitin ang timeline at pinagkakatiwalaang tala tungkol kay Rizal at sa nobela.',[
    ['Tukuyin sa timeline ang taon ng unang paglalathala ng nobela.','1891.'],
    ['Pumili ng dalawang pangyayari sa timeline at ipaliwanag ang kaugnayan ng isa sa pagkakasulat o paglalathala ng nobela.','Suriin ang tumpak na detalye at paliwanag na may batayan sa tala.'],
    ['Ihiwalay ang isang napatunayang pangyayari sa iyong interpretasyon ng epekto nito sa nobela. Anong sanggunian ang makatutulong upang subukin ang interpretasyon?','Hanapin ang malinaw na pagkakaiba ng katotohanan at interpretasyon at angkop na karagdagang sanggunian.']]],
  MAPEH:['Philippine creative industries','Use two teacher-selected credible sources about Philippine animation, music, design or another creative industry.',[
    ['Name a creative industry from the sources and identify one role in it.','Accept a documented industry and a relevant role, such as animation and storyboard artist.'],
    ['Describe how a technique or medium affects how one creative product is made or distributed. Cite a source.','Check a relevant technique, an accurate explanation and a cited source.'],
    ['Compare an opportunity and a challenge for two Philippine creative industries. Explain how their production practices affect the comparison.','Look for an evidence-based comparison and a meaningful link to production or distribution.']]],
  Mathematics:['Law of sines and the ambiguous case','Label each side with the lowercase letter of its opposite angle. Round angles to the nearest tenth.',[
    ['If A = 30°, B = 90° and a = 7 cm, find b.','b = 14 cm.'],
    ['If A = 35°, a = 12 cm and b = 16 cm, find the possible values of B.','sin B ≈ 0.7648, giving B ≈ 49.9° or 130.1°. Both are valid because A + B < 180°.'],
    ['If A = 40°, a = 10 cm and b = 15 cm, find both possible values of B and C. Explain why each solution is valid.','B ≈ 74.6° or 105.4°. Corresponding C ≈ 65.4° or 34.6°. Both remaining angles are positive.']]],
  Science:['Evidence of chemical reactions','Use the written classroom observations. Discuss what evidence would support formation of a new substance.',[
    ['After two clear liquids are mixed, a solid appears. Name the indicator.','Formation of a precipitate.'],
    ['Classify the indicators in four observations: bubbles form, a solid appears, colour changes, and the mixture warms.','Possible gas release, precipitate formation, colour change and temperature change.'],
    ['Bubbles appear in boiling water and in a mixture that produces a new gas. Explain why bubbles alone do not prove a chemical reaction.','Boiling is a phase change. Gas evidence supports a reaction when the gas is a substance newly formed, supported by additional evidence.']]],
  'Values Education':['Pananagutan at dignidad ng kapuwa','Isaalang-alang ang sitwasyon: may kaklaseng pinagtatawanan sa isang group chat.',[
    ['Tukuyin ang kilos na nakasasama sa dignidad ng kaklase.','Pambubulas o pagpapahiya sa group chat.'],
    ['Ilarawan ang isang responsableng tugon na hindi nagpapalala sa sitwasyon. Ipaliwanag kung paano nito iginagalang ang dignidad ng kaklase.','Halimbawa: huwag makisali, suportahan ang kaklase at humingi ng tulong sa pinagkakatiwalaang guro.'],
    ['Ihambing ang dalawang tugon at bumuo ng maikling plano upang ligtas na matulungan ang kaklase at mapigilan ang pag-uulit.','Suriin ang maingat na paghahambing at praktikal na hakbang na may paggalang sa dignidad at privacy.']]]
};
for (const [area,[title,direction,items]] of Object.entries(gradeTenActivities)) {
  const row=gradeTenCurriculum[area].terms[0][0];
  const [foundation,core,extension]=items;
  gradeTen.packs[area]={
    term:'Term 1',week:/^Weeks? /i.test(row.section) ? row.section : '',
    title,goal:row.label,direction,support:[foundation[0]],tasks:[core[0]],extension:[extension[0]],
    answers:core[1],keys:{Foundation:foundation[1],Extension:extension[1]}
  };
}
