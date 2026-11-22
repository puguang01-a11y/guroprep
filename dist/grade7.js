const gradeSeven = {
  sources:{
    pacing:'https://sites.google.com/deped.gov.ph/lsguide',
    local:'https://sites.google.com/deped.gov.ph/projectgrasp/revised-k-to-10-curriculum'
  },
  books:{},
  packs:{}
};
const gradeSevenActivities={
  'Araling Panlipunan':['Heograpiya at sinaunang pamayanan','Gamitin ang mapang pisikal ng Pilipinas at Timog-Silangang Asya na ibinigay ng guro.',[
    ['Tukuyin ang isang kapatagan at isang baybayin sa mapa.','Suriin ang dalawang lokasyon sa mapa.'],
    ['Ipaliwanag kung paano maaaring nakaimpluwensiya ang baybayin sa paglalakbay at kalakalan ng sinaunang pamayanan.','Maaaring pinadali ng daungan at rutang pandagat ang paglalakbay at palitan ng produkto.'],
    ['Ihambing ang isang pamayanang baybayin at isang pamayanang nasa loob ng lupain. Gamitin ang mapa at isang sangguniang pangkasaysayan.','Hanapin ang tumpak na pagkakaiba at paliwanag na may ebidensiya; iwasang ituring ang heograpiya bilang tanging sanhi.']]],
  English:['Character conflict and community values','Read: Mara wanted their group to spend its whole budget on a banner. Jo argued that supplies should be shared with the neighbouring class. After hearing both views, they agreed to make a smaller banner and lend the spare materials.',[
    ['Who disagrees, and what does each person want?','Mara wants a banner using the full budget. Jo wants to share the supplies.'],
    ['Identify the kind of conflict and explain how the ending expresses a value.','Character versus character. The compromise expresses cooperation or generosity, supported by lending the spare supplies.'],
    ['Explain how a different ending might express a different value. Refer to a detail from the original.','Accept a coherent alternate ending, a different or shifted value, and a relevant original detail.']]],
  'TLE: AFA / FCS / IA':['Agriculture careers and enterprise','Consider a local vegetable supply chain.',[
    ['Name one job involved in producing or selling vegetables.','Example: grower, nursery worker or market vendor.'],
    ['Compare two agriculture jobs. Describe one skill and responsibility for each.','Example: growers manage planting and harvest; market vendors track stock and customer demand.'],
    ['Propose a small agriculture-related enterprise. Explain who it serves and what resource or risk to check first.','Accept a feasible idea, clear customer and relevant practical consideration such as seasonality, spoilage or startup cost.']]],
  'TLE: ICT':['ICT careers and services','Compare familiar roles in software, technical support and digital media.',[
    ['Which role is most directly responsible for producing a video advertisement: video editor or network technician?','Video editor.'],
    ['Compare software development and technical support. Give a skill and a possible school or community need for each.','Examples: programming to build a booking app; troubleshooting to help a school restore normal device use.'],
    ['Choose an ICT service for a local organisation. Compare two possible approaches and justify your choice using skills, cost or demand.','Check practical options, at least one relevant criterion and a supported choice.']]],
  Filipino:['Panitikan sa Panahon ng Katutubo','Gamitin ang maikling sipi at tala ng guro tungkol sa katutubong panitikan.',[
    ['Tukuyin ang isang anyo ng panitikan na binanggit sa tala.','Tanggapin ang anyong nasa sanggunian, gaya ng epiko, bugtong o awiting-bayan.'],
    ['Magtala ng dalawang detalye tungkol sa konteksto at ipaliwanag kung paano naipasa ang tekstong binasa.','Suriin ang mga detalyeng batay sa tala. Halimbawa: maaaring naipasa sa pasalitang pagsasalaysay o pag-awit.'],
    ['Ihambing ang pasalitang pagtatanghal at nakasulat na bersiyon ng teksto. Ipaliwanag kung anong detalye ang kailangang patunayan sa sanggunian.','Magbigay ng makabuluhang paghahambing at tukuyin ang detalyeng dapat beripikahin, gaya ng pinagmulan o paraan ng pagtatanghal.']]],
  'Values Education':['Maingat na paghuhusga','May kumakalat na mensaheng naninisi sa isang kaklase, ngunit walang malinaw na pinagmulan.',[
    ['Ano ang isang dapat suriin bago maniwala sa mensahe?','Halimbawa: pinagmulan, ebidensiya o konteksto.'],
    ['Ano ang gagawin mo bago ibahagi ang mensahe? Ipaliwanag kung paano nito iginagalang ang katotohanan at kapuwa.','Huwag ipasa habang hindi beripikado. Suriin ang ebidensiya o lumapit sa guro; iwasang makasira sa kaklase.'],
    ['Isaalang-alang ang dalawang posibleng tugon at ang bunga ng bawat isa. Piliin ang mas maingat at ipaliwanag.','Hanapin ang paghahambing, matibay na batayan at tugong nag-iingat sa katotohanan at kapakanan ng kapuwa.']]],
  MAPEH:['Contemporary Southeast Asian arts and identity','Use two works provided by the teacher, one from the Philippines and one from another Southeast Asian country.',[
    ['Name one observable visual or performing element in either work.','Accept a detail present in the chosen work.'],
    ['Compare one element in each work and describe how it can express a community’s identity.','Check accurate observations and an interpretation supported by the provided context.'],
    ['Explain how an artist adapts a familiar form for a contemporary audience. Support your explanation and avoid generalising to an entire country.','Look for evidence from the work and context, and a careful explanation of adaptation and identity.']]],
  Mathematics:['Regular and irregular polygons','Use a ruler and protractor. Mark equal sides and angles where appropriate.',[
    ['Draw a closed figure with five sides. Name it and say whether it is necessarily regular.','Pentagon. It is regular only if its sides and angles are all equal.'],
    ['Construct a regular hexagon and sketch an irregular hexagon. Measure or mark evidence that distinguishes them.','Regular hexagon: six equal sides and six 120° interior angles. Irregular hexagon: six sides but unequal sides or angles.'],
    ['Compare a regular octagon with a regular decagon. Find their interior angles and explain how those measurements can guide a drawing.','135° and 144°. Mark equal sides and turn by the corresponding exterior angles, 45° and 36°.']]],
  Science:['Models and phenomena we cannot see directly','Use a simple drawing of dots to represent particles in a sealed container.',[
    ['What do the dots represent?','Particles that are too small to see directly in this model.'],
    ['Use two sketches to show why a gas can fill more space in a larger container. Name one limitation of the model.','The same number of dots can spread farther apart; drawn dots do not show exact particle size, scale or motion.'],
    ['Suggest an observation your particle model could help explain, and distinguish the observation from the model.','Example: air in a closed syringe takes up less volume when gently compressed. Plunger motion is observable; reduced particle spacing is the model’s explanation.']]]
};
for (const [area,[title,direction,items]] of Object.entries(gradeSevenActivities)) {
  const row=gradeSevenCurriculum[area].terms[0][0];
  const [foundation,core,extension]=items;
  gradeSeven.packs[area]={
    term:'Term 1',week:/^Weeks? /i.test(row.section) ? row.section : '',
    title,goal:row.label,direction,support:[foundation[0]],tasks:[core[0]],extension:[extension[0]],
    answers:core[1],keys:{Foundation:foundation[1],Extension:extension[1]}
  };
}
