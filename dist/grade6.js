const gradeSix = {
  sources:{
    pacing:'https://sites.google.com/deped.gov.ph/deped-lrportal/three-term-budget-of-work-bow/grade-6',
    local:'https://sites.google.com/deped.gov.ph/projectgrasp/revised-k-to-10-curriculum'
  },
  books:{},
  packs:{}
};
const gradeSixActivities={
  'Araling Panlipunan':[0,'Layunin at paglaganap ng Katipunan','Gamitin ang sipi o timeline na pinili ng guro tungkol sa Katipunan.',[
    ['Tukuyin ang isang layunin ng Katipunan mula sa sanggunian.','Halimbawa: makamit ang kalayaan mula sa pamamahalang kolonyal ng Espanya.'],
    ['Ipaliwanag ang isang layunin at isang paraan ng paglaganap ng Katipunan. Magbigay ng batayan.','Tanggapin ang tumpak na paliwanag na may detalyeng mula sa sanggunian, gaya ng pagrekrut sa pamamagitan ng mga lokal na sangay.'],
    ['Iugnay ang isang aral na nasa sipi sa layunin ng samahan. Ano ang ebidensiya mo?','Suriin kung malinaw ang ugnayan at tama ang detalyeng sinipi o binanggit.']]],
  English:[0,'Story grammar and character choices','Read: Before the class exhibit opened, Ben noticed that the labels had fallen off two models. He asked his teammates to match their notes to each model. They replaced the labels just before the first visitors arrived.',[
    ['Identify the main character and the setting.','Ben; at the class exhibit before it opened.'],
    ['Identify the problem, Ben’s response and the outcome.','Labels fell off; Ben asked his teammates to match the notes to the models; they replaced the labels in time.'],
    ['Explain how one character choice connects the problem to the outcome. Support it with a detail.','Ben consults the team notes, which lets them identify the correct labels before visitors arrive.']]],
  'TLE: AFA / FCS / IA':[0,'Branches of fishery arts','Use classroom examples of capture, aquaculture and fish processing.',[
    ['Which is aquaculture: raising tilapia in a pond or catching wild fish at sea?','Raising tilapia in a pond.'],
    ['Classify catching wild fish, raising milkfish in pens and drying fish for sale.','Capture fisheries; aquaculture; fish processing.'],
    ['Explain how two branches can work together to deliver a fish product to customers.','Example: aquaculture raises fish; processing preserves it for transport and sale.']]],
  'TLE: ICT':[0,'Safe and responsible web conferencing','Role-play a practice call with the teacher’s approved classroom setup.',[
    ['Before turning on your microphone, what is one respectful action?','Wait for your turn or use the raise-hand feature.'],
    ['Join a practice meeting, take a turn speaking and end the call. Show how you protect personal information.','Use the approved meeting link, mute when needed and keep private information out of the chat and camera view.'],
    ['Role-play receiving a meeting link from an unknown sender. Explain how you would verify it.','Do not use the unverified link. Ask a teacher or trusted adult and verify through the known school channel.']]],
  Filipino:[1,'Kahulugan ng kasabihan','Basahin ang kasabihan at iugnay ito sa isang sitwasyon.',[
    ['Ano ang ibig sabihin ng “Nasa Diyos ang awa, nasa tao ang gawa”?','Mahalaga rin ang sariling pagkilos at pagsisikap.'],
    ['Iugnay ang “Kung may tiyaga, may nilaga” sa mag-aaral na nagsasanay araw-araw.','Ang tiyaga sa pagsasanay ay maaaring humantong sa pagbuti o tagumpay.'],
    ['Pumili ng isang kasabihan at ipaliwanag ang aral at isang sitwasyong angkop dito.','Hanapin ang wastong di-literal na kahulugan at isang tiyak na halimbawang tumutugma sa aral.']]],
  GMRC:[0,'Pagpapaunlad at pagbabahagi ng talento','Pumili ng kakayahang nais mong paunlarin, o gumamit ng kathang-isip na halimbawa.',[
    ['Magbigay ng isang kakayahan at isang paraan ng pagsasanay.','Tanggapin ang angkop na kakayahan at praktikal na pagsasanay.'],
    ['Paano magagamit ng isang mahilig gumuhit ang kaniyang talento upang makatulong sa klase?','Halimbawa: gumawa ng malinaw na larawan para sa poster ng grupo.'],
    ['Magplano ng dalawang hakbang sa pagpapaunlad ng talento at isang paraan ng pagbabahagi nito nang may paggalang.','Suriin kung tiyak, magagawa at magalang ang lahat ng hakbang.']]],
  MAPEH:[0,'History and creative works','Use a teacher-selected creative work from the Revolutionary or American period and a source about its context.',[
    ['Name the period and one visible or audible detail of the work.','Check the period and detail against the teacher’s sources.'],
    ['Connect one historical event or idea to a feature or purpose of the selected work.','Accept a supported connection between context and an observable feature or documented purpose.'],
    ['Compare the work with a teacher-selected example from the other period. Cite one feature from each and explain a difference.','Check accurate observations and a cautious explanation grounded in both sources.']]],
  Mathematics:[0,'Which shapes tessellate?','Trace or cut several copies of a shape. Cover a surface with no gaps or overlaps.',[
    ['Place four identical squares together. Are there gaps at their shared corner?','No. Four 90° angles meet in a full turn.'],
    ['Test identical squares and identical circles. Which tessellates? Explain what happens at the joins.','Squares tessellate. Identical circles leave gaps.'],
    ['Test identical equilateral triangles. How many corners can meet around a point? Explain how this helps cover the surface.','Six 60° corners make 360°. Repeating the arrangement can cover the plane without gaps or overlaps.']]],
  Science:[0,'Changes of state','Draw boxes for solid, liquid and gas. Label arrows with the process.',[
    ['What is the change from ice to liquid water called?','Melting.'],
    ['Label solid → liquid, liquid → gas, gas → liquid, and liquid → solid.','Melting, evaporation, condensation, and freezing.'],
    ['Use a diagram to explain droplets on the outside of a cold cup. Then show what could happen to the droplets on a warm day.','Water vapour in nearby air condenses into droplets on the cold surface. The droplets may later evaporate.']]]
};
for (const [area,[index,title,direction,items]] of Object.entries(gradeSixActivities)) {
  const row=gradeSixCurriculum[area].terms[0][index];
  const [foundation,core,extension]=items;
  gradeSix.packs[area]={
    term:'Term 1',week:/^Weeks? /i.test(row.section) ? row.section : '',
    title,goal:row.label,direction,support:[foundation[0]],tasks:[core[0]],extension:[extension[0]],
    answers:core[1],keys:{Foundation:foundation[1],Extension:extension[1]}
  };
}
