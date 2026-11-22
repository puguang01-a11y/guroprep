const gradeFour = {
  sources:{
    pacing:'https://sites.google.com/deped.gov.ph/deped-lrportal/three-term-budget-of-work-bow/grade-4',
    local:'https://sites.google.com/view/cebucitylrsite3/matatag-les-and-las/grade-4/mathematics-4',
    delivery:'https://www.depedncr.com.ph/wp-content/uploads/2024/08/RM-No.-788-s.-2024-Forthcoming-Delivery-of-Grades-4-7-and-SHS-Textbooks-and-Teachers-Manual.pdf',
    phoenix:'https://www.phoenix.com.ph/realistic-math-basic-beyond-breakthroughs-second-edition-matatag-grade-4/'
  },
  books:{
    Mathematics:[
      ['Mathematics for Everyday Life 4','Forems Corporation (supplier)','DepEd delivery record · school adoption unverified','delivery'],
      ['Integrative Math Proficient and Mathtatag 21st Century Learners','FEP / SIBS (suppliers)','DepEd delivery record · school adoption unverified','delivery'],
      ['Realistic Math Basic, Beyond, Breakthroughs','Phoenix Publishing House','Publisher catalogue · MATATAG second edition','phoenix']
    ]
  },
  packs:{}
};
const gradeFourActivities = {
  'Araling Panlipunan':[0,0,'Lokasyon ng Pilipinas','Gamitin ang mapa o atlas na pinili ng guro.',[
    ['Hanapin ang Pilipinas sa mapa ng Asya. Saang bahagi ng Asya ito matatagpuan?','Timog-Silangang Asya.'],
    ['Sa mapa, tukuyin ang lokasyon ng Pilipinas kaugnay ng Taiwan. Pagkatapos, basahin ang koordinado ng Maynila sa atlas.','Nasa timog ng Taiwan ang Pilipinas. Ang Maynila ay humigit-kumulang 15° hilaga at 121° silangan, o 15° N at 121° E.'],
    ['Ipaliwanag kung bakit magkaiba ang paglalarawang “timog ng Taiwan” at ang pagbibigay ng latitud at longhitud.','Ang una ay relatibong lokasyon. Ang ikalawa ay tumutukoy sa posisyon sa pamamagitan ng mga koordinado.']]],
  English:[0,0,'Story elements','Read the original story: Lani brought a seedling to the school garden. A dry spell left its leaves drooping. She asked her classmates to share watering duties. By Friday, the plant stood upright again.',[
    ['Who is the main character? Where does the story happen?','Lani, in the school garden.'],
    ['What is the problem? What does Lani do to solve it?','A dry spell leaves the plant drooping. She asks classmates to share watering duties.'],
    ['Draw a story map with character, setting, problem, action and outcome. Show how the action leads to the outcome.','The map names Lani and the garden, the dry spell, the shared watering plan and the plant recovering.']]],
  'EPP: AFA / FCS / IA':[0,0,'Agrikultura sa pamayanan','Basahin ang sitwasyon at ipaliwanag ang sagot.',[
    ['Alin ang gawaing pang-agrikultura: pagtatanim ng pechay o pagkukumpuni ng bisikleta?','Pagtatanim ng pechay.'],
    ['Ihambing ang pagtatanim ng gulay at pag-aalaga ng manok. Anong uri ng gawaing pang-agrikultura ang bawat isa?','Paghahalaman o pagtatanim ang una; pag-aalaga ng hayop ang ikalawa.'],
    ['Magmungkahi ng simpleng proyekto sa paghahalaman para sa paaralan. Ipaliwanag ang kailangan at pakinabang nito.','Tanggapin ang praktikal na panukala, gaya ng pechay sa paso, na may lupa, liwanag, tubig at paraan ng pag-aalaga.']]],
  'EPP: ICT':[0,0,'Mga gamit ng computing device','Pumili ng angkop na kagamitan at ipaliwanag ang gamit nito.',[
    ['Alin ang mas angkop sa pag-type ng isang ulat: computer o ruler?','Computer.'],
    ['Magbigay ng dalawang gawaing magagawa sa computer o tablet at ipaliwanag kung paano ito nakatutulong.','Halimbawa: pag-type ng ulat para madaling baguhin at pagguhit ng diagram para malinaw na maipakita ang ideya.'],
    ['May computer at tablet ang isang pangkat. Alin ang pipiliin para sa mahabang ulat at alin para sa pagkuha ng larawan? Ipaliwanag.','Makatwiran ang computer na may keyboard para sa ulat at tablet na may camera para sa larawan. Tanggapin ang iba pang pagpiling may dahilan.']]],
  Filipino:[0,0,'Pagkakasunod-sunod sa pabula','Basahin ang pabula. Nakakita ang maya ng binhi. Hinukay niya ang lupa. Itinanim niya ang binhi. Diniligan niya ito araw-araw. Tumubo ang halaman. Ibinahagi niya ang mga bunga sa mga kaibigan.',[
    ['Ano ang nakita ng maya? Ano ang huli niyang ginawa?','Binhi; ibinahagi niya ang mga bunga.'],
    ['Ayusin: diniligan, ibinahagi, nakita, tumubo, hinukay, itinanim. Alin ang nagpapakita ng pagiging mapagbigay?','Nakita, hinukay, itinanim, diniligan, tumubo, ibinahagi. Ang pagbabahagi ng bunga.'],
    ['Magbigay ng bagong pamagat at ibang wakas na mauugnay sa mga naunang pangyayari. Tukuyin ang isang bahaging pantasya.','Tanggapin ang angkop na pamagat at lohikal na wakas. Halimbawa ng pantasya: ang maya ay nagtanim at nag-alaga ng halaman na parang tao.']]],
  GMRC:[0,0,'Pagpapasiya at pag-unawa sa kapuwa','Basahin ang sitwasyon. Walang kapareha si Isa sa gawain at mukhang malungkot siya.',[
    ['Ano ang maaari mong itanong kay Isa nang magalang?','Halimbawa: Gusto mo bang sumali sa grupo namin?'],
    ['Ano ang dalawang pagpipilian mo? Pumili ng isang paraan ng pagtulong at ipaliwanag ang dahilan.','Tanggapin ang dalawang posibleng kilos at isang magalang na tugong isinasaalang-alang ang damdamin ni Isa.'],
    ['Kung nais muna ni Isa na mapag-isa, paano mo igagalang ang sagot niya at maipakikitang handa kang tumulong?','Halimbawa: bigyan siya ng espasyo at sabihing maaari siyang lumapit kung nais niyang sumali.']]],
  MAPEH:[0,0,'Elements in a local creative work','Use a teacher-selected performance or artwork from the province.',[
    ['Name one sound, movement or visual detail you noticed.','Accept an observable detail, such as a repeating beat, raised arms or a repeated colour.'],
    ['Describe two elements and explain how one helped create a mood or idea.','Check two details from the work and a plausible link from one element to a mood or idea.'],
    ['Change one element, such as the pace or colour. Explain how the audience might experience the work differently.','Accept a clear proposed change and a reason tied to its possible effect.']]],
  Mathematics:[0,0,'Model acute, right and obtuse angles','Use two paper strips with one shared endpoint or draw the angles.',[
    ['Make a right angle and compare it with the corner of a sheet of paper.','The angles match at 90°.'],
    ['Model a right angle, an angle smaller than it and an angle larger than it but less than a straight angle. Label each.','Right; acute; obtuse.'],
    ['Sketch 40°, 90° and 125° angles. Sort them and explain the two boundaries for an obtuse angle.','Acute, right, obtuse. An obtuse angle is greater than 90° and less than 180°.']]],
  Science:[0,0,'Scientist and invention evidence','Use a teacher-provided museum, university or textbook source about a scientist.',[
    ['Write the scientist’s name and name one invention credited in the source.','Verify both against the chosen source.'],
    ['Identify an invention and explain what problem it was intended to address. Name the source.','Check an accurate match, an evidence-based purpose and a named source.'],
    ['Compare two sources on the same invention. Record one point of agreement and one detail you would check further.','Check both sources support the agreement and the student identifies an unresolved detail or a claim needing stronger evidence.']]]
};
for (const [area,[term,index,title,direction,items]] of Object.entries(gradeFourActivities)) {
  const row=gradeFourCurriculum[area].terms[term][index];
  const [foundation,core,extension]=items;
  gradeFour.packs[area]={
    term:'Term '+(term+1),week:/^Weeks? /i.test(row.section) ? row.section : '',
    title,goal:row.label,direction,support:[foundation[0]],tasks:[core[0]],extension:[extension[0]],
    answers:core[1],keys:{Foundation:foundation[1],Extension:extension[1]}
  };
}
