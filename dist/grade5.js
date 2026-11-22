const gradeFive = {
  sources:{
    pacing:'https://sites.google.com/deped.gov.ph/deped-lrportal/three-term-budget-of-work-bow/grade-5',
    local:'https://sites.google.com/deped.gov.ph/projectgrasp/revised-k-to-10-curriculum'
  },
  books:{},
  packs:{}
};
const gradeFiveActivities={
  'Araling Panlipunan':[0,'Mga batayan ng kasaysayan','Gamitin ang isang lumang larawan at isang salaysay tungkol sa parehong lugar.',[
    ['Alin ang maaaring sanggunian sa kasaysayan: lumang larawan o hulang walang batayan?','Lumang larawan.'],
    ['Ano ang isang detalye na makikita sa larawan at isang detalyeng matututuhan sa salaysay?','Tanggapin ang magkahiwalay na detalyeng sinusuportahan ng mga sanggunian.'],
    ['Kung magkaiba ang petsang ibinigay ng dalawang sanggunian, ano ang susuriin mo bago magpasya?','Suriin ang pinagmulan, petsa at layunin ng bawat isa at maghanap ng karagdagang ebidensiya.']]],
  English:[0,'Story structure','Read: When the library lost power, Pia noticed a student could not finish reading. Pia moved the reading group to a shaded table outside. The group finished its story before the bell.',[
    ['Who is the main character, and where does the story begin?','Pia; in the library.'],
    ['Identify the problem, the action that addresses it and the outcome.','Power goes out; Pia moves the group; they finish reading.'],
    ['Explain how the setting affects Pia’s choice, and suggest an alternative supported by the story.','The power outage limits indoor reading. Accept a feasible alternative such as using daylight beside a window.']]],
  'EPP: AFA / FCS / IA':[0,'Mga sangay ng animal production','Basahin ang bawat halimbawa at uriin ito.',[
    ['Saang pangkat kabilang ang pag-aalaga ng manok: poultry o pag-aalaga ng baka?','Poultry.'],
    ['Ihambing ang pag-aalaga ng manok at baka. Magbigay ng produkto mula sa bawat isa.','Poultry: halimbawa, itlog. Pag-aalaga ng baka: halimbawa, gatas.'],
    ['Ipaliwanag kung bakit maaaring magkaiba ang mga pasilidad para sa dalawang sangay ng pag-aalaga ng hayop.','Banggitin ang kaugnay na pangangailangan, gaya ng laki, tirahan o pakain.']]],
  'EPP: ICT':[0,'Netiquette sa group chat','Pumili ng magalang at responsableng tugon online.',[
    ['Ano ang magalang na tugon kapag hindi ka sang-ayon sa kaklase online?','Halimbawa: Naiintindihan ko ang punto mo. Iba ang palagay ko dahil ___.'],
    ['Isulat muli nang magalang: “MALI YAN. WAG KANG MAG-POST.”','Halimbawa: Maaari ba nating suriin muli ang impormasyon bago ito ibahagi?'],
    ['Nais mong i-forward ang mensahe at larawan ng kaklase. Ano ang dapat mong suriin muna?','Humingi ng pahintulot, iwasang magbahagi ng pribadong datos at tiyaking angkop at totoo ang nilalaman.']]],
  Filipino:[1,'Pagwawangis at pagsasatao','Suriin ang kahulugan ng tayutay sa bawat pangungusap.',[
    ['Ano ang tayutay sa “Sumasayaw ang mga dahon sa hangin”?','Pagsasatao.'],
    ['Uriin at ipaliwanag: “Ilaw ng tahanan si Lola.” “Bumulong ang hangin sa gabi.”','Pagwawangis: inihahambing si Lola sa ilaw. Pagsasatao: binibigyan ng kilos ng tao ang hangin.'],
    ['Sumulat ng isang pagwawangis at isang pagsasatao tungkol sa inyong pamayanan. Ipaliwanag ang literal na kahulugan ng bawat isa.','Tanggapin ang direktang paghahambing at ang pagbibigay ng katangiang pantao sa bagay, na parehong may malinaw na paliwanag.']]],
  GMRC:[0,'Pag-iingat at pagpapahalaga sa sarili','Piliin ang kilos at ipaliwanag kung paano ito nagpapakita ng pagpapahalaga sa sarili.',[
    ['Ano ang isang mabuting gawi na magagawa mo bago pumasok sa paaralan?','Halimbawa: maghanda nang maaga at maglaan ng oras sa pagkain at pahinga.'],
    ['May kaklase na gustong maglaro sa delikadong bahagi ng bakuran. Paano ka tatanggi at magmumungkahi ng ibang lugar?','Hanapin ang mahinahong pagtanggi at isang ligtas na alternatibo.'],
    ['Gumawa ng simpleng plano na may dalawang gawaing nakatutulong sa iyo. Ipaliwanag kung paano mo masusubaybayan ang mga ito.','Dalawang konkretong gawain at paraan ng pagsubaybay, gaya ng checklist.']]],
  MAPEH:[0,'Forms and functions in local arts','Use a teacher-selected example of early Philippine art from your region.',[
    ['Name one material, instrument or movement you notice.','Accept an observable feature from the selected example.'],
    ['Describe the form and material or medium, and give one documented purpose of the work.','Check the observed features and a purpose supported by the teacher’s source.'],
    ['Compare two teacher-provided examples. Explain how a difference in form or material serves a different purpose.','Look for one accurate contrast and a supported explanation.']]],
  Mathematics:[1,'Convert 12-hour and 24-hour time','Show whether each time is before or after noon.',[
    ['Write 3:20 p.m. using the 24-hour clock.','15:20.'],
    ['Convert 00:45 and 12:10 to 12-hour time, and 8:35 p.m. to 24-hour time.','12:45 a.m.; 12:10 p.m.; 20:35.'],
    ['A ferry leaves at 23:40 and arrives at 00:25 the next day. Give both times in 12-hour format and find the duration.','11:40 p.m. and 12:25 a.m.; 45 minutes.']]],
  Science:[0,'Matter has mass and takes up space','Use water, a cup and an inflated balloon as examples.',[
    ['Does water take up space in a cup?','Yes; it occupies part of the cup.'],
    ['How can you show that water has mass and takes up space using a cup and a scale?','Compare the mass of the empty and filled cup; observe the space filled by water.'],
    ['Someone says air is not matter because it is invisible. Use an inflated balloon and the idea of mass to respond.','Air occupies space in a balloon and has mass. Visibility is not a requirement for matter.']]]
};
for (const [area,[index,title,direction,items]] of Object.entries(gradeFiveActivities)) {
  const row=gradeFiveCurriculum[area].terms[0][index];
  const [foundation,core,extension]=items;
  gradeFive.packs[area]={
    term:'Term 1',week:/^Weeks? /i.test(row.section) ? row.section : '',
    title,goal:row.label,direction,support:[foundation[0]],tasks:[core[0]],extension:[extension[0]],
    answers:core[1],keys:{Foundation:foundation[1],Extension:extension[1]}
  };
}
