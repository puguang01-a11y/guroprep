const gradeElevenPacing = 'https://sites.google.com/deped.gov.ph/lsguide/budgets-of-work/grade-11';
const gradeElevenCoreActivities = {
  'Effective Communication': [
    ['One announcement, two audiences', 'The school library will close at 2 p.m. on Friday for inventory. Learners can return books on Monday without penalty.', 'Underline when the change takes effect and what learners may do on Monday.', 'Rewrite the announcement as a message to a friend and as an email to a parent. Keep both facts accurate.', 'Add a version for a school radio announcement. Explain one tone choice for each audience.', ['Friday at 2 p.m.; return books on Monday without penalty.', 'Both versions preserve the facts. A friend can receive an informal text; an email to a parent uses a greeting and courteous wording.', 'The radio version introduces the library, states the Friday and Monday details clearly, and gives listeners time to note them. Explanations cite a specific language choice.']],
    ['Read an academic field-test summary', 'A class compared seedlings grown in sunlight and shade. After 14 days, the reported averages were 12 cm in sunlight and 7 cm in shade. The sample size was unspecified.', 'Circle the stated purpose and list the measurement, the time span, and the two results.', 'Explain how the numbers and neutral wording support the purpose. Write one sentence that reports the result without overstating it.', 'Rewrite the summary for a student bulletin and include a limitation for readers deciding whether to repeat the study.', ['The summary compares seedling growth over 14 days: 12 cm in sunlight and 7 cm in shade.', 'The numeric comparison and neutral wording report observations. A defensible sentence limits the statement to the class trial.', 'The revised summary explains the result in plain language and flags the unspecified sample size or another visible design limitation.']],
    ['Write a workplace handover', 'The inventory check is complete. Two boxes have unreadable labels. The incoming shift must set those boxes aside and tell the supervisor before dispatch.', 'List what is complete and the two actions due next.', 'Write a brief handover note to the incoming shift. Put the action before the background.', 'Create a spoken version for a noisy workspace. Add a confirmation question that checks understanding.', ['Inventory check complete; set aside the two boxes and notify the supervisor before dispatch.', 'The note names the issue, actions and deadline and uses concise, professional language.', 'The spoken version repeats the deadline and uses a confirmation question such as “Which two actions must happen before dispatch?”']]
  ],
  'Mabisang Komunikasyon': [
    ['Iisang paalala, magkaibang kausap','Ililipat sa silid 12 ang pulong sa Biyernes, alas-tres ng hapon. Dalhin ang tala ng pangkat.','Bilugan ang bagong lugar at oras. Salungguhitan ang dapat dalhin.','Isulat ang paalala bilang mensahe sa kaklase at bilang pormal na anunsiyo sa mga magulang.','Gumawa rin ng bersiyong babasahin sa radyo ng paaralan. Ipaliwanag ang isang pagbabago sa tono.',['Silid 12; Biyernes, alas-tres; tala ng pangkat.','Kumpleto ang tatlong detalye sa dalawang bersiyon. Angkop ang bati at antas ng pormalidad sa kausap.','Malinaw kapag binasa nang malakas ang oras, lugar at dadalhin. May tiyak na paliwanag sa pagbabagong ginawa.']],
    ['Basahin ang ulat ng klase','Sa pagsubok ng isang klase, nakapagtala ang dalawang pangkat ng 18 at 12 na punlang tumubo sa loob ng pitong araw. Hindi nakasaad kung ilang buto ang itinanim.','Tukuyin ang bilang ng punla ng bawat pangkat at ang haba ng obserbasyon.','Tukuyin ang layon ng ulat. Ipaliwanag kung bakit mahalaga ang tiyak na bilang at maingat na pagpili ng salita.','Isulat muli ang ulat para sa pahayagan ng paaralan at isama ang isang limitasyon.',['18 at 12 punla sa loob ng pitong araw.','Nag-uulat ito ng obserbasyon. Nakakatulong ang bilang sa paghahambing at ang maingat na wika upang iwasan ang labis na pahayag.','Nananatili ang datos at nililinaw na walang bilang ng kabuuang buto kaya walang sapat na batayan para ihambing ang porsiyento.']],
    ['Turnover sa pinapasukang pangkat','Nabilang na ang mga kagamitan. May dalawang kahong walang etiketa. Ihiwalay ang mga ito at ipaalam sa tagapangasiwa bago ilabas ang mga kahon.','Ilista ang natapos at ang dalawang dapat gawin.','Bumuo ng maikling mensahe sa susunod na pangkat. Unahin ang aksiyon at panatilihin ang propesyonal na tono.','Gumawa ng pasalitang bersiyon at magdagdag ng tanong na titiyak na naunawaan ang tagubilin.',['Natapos ang pagbibilang; ihiwalay ang dalawang kahon at ipaalam sa tagapangasiwa bago ilabas.','Malinaw ang aksiyon, sino ang aabisuhan, at kailan.','Malinaw ang oras at may tiyak na tanong sa pagkumpirma, gaya ng “Ano ang dalawang kailangang gawin bago ilabas ang mga kahon?”']]
  ],
  'General Mathematics': [
    ['Compare work shifts','Ana earns ₱110 per regular hour. A second role pays ₱125 per regular hour. Use the stated classroom rates.','Find Ana’s gross wage for 8 regular hours.','Compare Ana’s pay for 30 hours with the second role’s pay for 28 hours. Which pays more and by how much?','If Ana works 28 regular hours plus 3 hours at 1.25 times her regular rate, calculate her total and explain when hourly rate alone gives a misleading comparison.',['₱880.','₱3,300 versus ₱3,500; the second role pays ₱200 more.','28 × 110 + 3 × 137.50 = ₱3,492.50. Explain the effect of hours and overtime rates.']],
    ['Model a two-part fare','A classroom fare model charges ₱16 up to 4 km, then ₱2.50 for each additional kilometer. Assume fractional kilometers are charged proportionally.','Find the fare for 3 km and for 4 km.','Write the piecewise fare rule for distance d ≥ 0 and use it to find the fare for 9 km.','A competing model charges ₱12 + ₱2 per kilometer. Find the distance where the two fare models agree on the d > 4 branch and compare them at 2 km.',['₱16 at both distances.','F(d)=16 for 0≤d≤4; F(d)=16+2.50(d−4) for d>4. At 9 km the fare is ₱28.50.','For d>4, 6+2.5d=12+2d gives d=12 km. At 2 km both models charge ₱16.']],
    ['Compare two savings plans','An illustrative account starts at ₱5,000 and earns 4% nominal annual interest. Assume no fees or withdrawals.','Find the first year’s interest and ending balance if interest compounds annually.','Compute the balance after three years with annual compounding. Round only the final answer to centavos.','Compute and compare the three-year balance with quarterly compounding. Explain why the balances differ.',['₱200 in interest; ₱5,200 ending balance.','5000(1.04)³ = ₱5,624.32.','5000(1.01)¹² = ₱5,634.13, or ₱9.81 more. Interest is added to principal more often.']]
  ],
  'General Science': [
    ['Physics at home and on the road','A family uses a fan, a bicycle with brakes, and a pot with a metal base.','Match each device to a process: air movement, friction or heat transfer.','Explain how each process improves an everyday activity. Use one cause-and-effect sentence per device.','Compare two practical changes that could improve fan comfort or bicycle braking. State what evidence would show improvement.',['Fan: air movement; brakes: friction; pot base: heat transfer.','Explanations connect air movement to increased evaporation or cooling comfort, friction to slowing motion, and thermal transfer to heating food.','Answers identify feasible changes and measurable checks, such as comparing stopping distances at the same starting speed under supervised, safe conditions.']],
    ['Evidence of everyday chemical change','A cut apple browns, iron develops rust, and a teacher shows images of bubbles when vinegar contacts baking soda.','Match each example to its most visible observation: darkening, rust layer, or bubbles.','Classify rusting as oxidation and the fizzing as a reaction with gas formation. Explain why seeing bubbles by itself is insufficient evidence of a chemical reaction.','Propose a classroom comparison that distinguishes reaction bubbles from boiling. Include a baseline observation and the result expected in each case.',['Apple: darkening; iron: rust layer; vinegar mixture: bubbles.','Rust is an oxidation product; carbon dioxide is released by the vinegar mixture. Boiling also produces bubbles through a physical change.','A defensible comparison uses teacher-provided examples, records starting conditions such as temperature, and distinguishes vapor from gas produced by new substances.']],
    ['Why Earth can support life','Earth has long-lasting surface liquid water, an atmosphere and an energy supply from the Sun. Mars has a much thinner atmosphere and much colder average surface conditions.','Identify two conditions on Earth that help support life.','Explain how surface water and a suitable temperature range make Earth more favorable to known life. Use one comparison with Mars.','A planet candidate is reported to have a suitable average temperature. Identify two other observations scientists would need before evaluating its habitability.',['Accept liquid water, a suitable temperature range, an atmosphere or an energy source.','Connect liquid water and temperature to conditions for life; compare Earth’s conditions with the thinner atmosphere and colder surface on Mars.','Accept evidence such as water stability, atmospheric composition or pressure, and a usable energy source, with explanations.']]
  ],
  'Life and Career Skills': [
    ['Identify strengths through evidence','In a fictional group project, Mara schedules deadlines, checks sources and helps a quiet teammate contribute.','List two observable actions Mara takes.','Infer two strengths and support each with an observed action. Explain how feedback could test your inference.','Draft a private, one-week goal for a fictional learner to develop a related skill, with an observable progress check.',['Any two actions from the scenario.','Accept time management, information literacy or teamwork, each paired with appropriate evidence and a relevant feedback question.','The goal names a specific action, deadline and observable result without requiring disclosure of personal experiences.']],
    ['Choose a realistic career pathway','A fictional learner is interested in ICT support. Their school has a repair club, and the nearest training centre requires transport and weekend attendance.','Sort the learner’s interest, school club and travel requirement into personal, social or environmental factors.','Compare joining the school club now with seeking weekend training later using interests, cost and access. Recommend a first step.','Suggest one new fact that could reverse the decision and explain how the learner could verify it.',['Interest is personal. School support can be social or environmental with a reason. Transport and schedule are environmental constraints.','A recommendation compares feasible trade-offs and specifies an action, such as confirming club access.','Accept a decision-relevant fact and a credible way to verify it, such as asking the centre about a scholarship or schedule.']],
    ['Evaluate career requirements','A fictional advertisement for an entry-level support role asks for documented training, basic troubleshooting and a sample service log.','List the three requirements from the advertisement.','Make an evidence checklist with one credible way a fictional applicant could demonstrate each requirement.','Compare applying directly with pursuing further training. Identify one fact the applicant must verify before choosing.',['Documented training, basic troubleshooting, and a sample service log.','Possible evidence: training certificate, supervised mock troubleshooting, and an anonymized sample log.','Compare present evidence, time and access. Verify such factors as whether an alternative qualification is accepted or whether training is available locally.']]
  ],
  'Pag-aaral ng Kasaysayan at Lipunang Pilipino': [
    ['Unawain ang kamalayang pangkasaysayan','May lumang larawan ng pamilihan at isang panayam sa matagal nang residente. Magkaiba ang petsa at ang impormasyong makukuha sa dalawang sanggunian.','Tukuyin kung alin ang larawan at alin ang pasalitang salaysay.','Ipaliwanag kung paano magagamit nang magkasama ang dalawang sanggunian upang maunawaan ang pagbabago sa pamilihan.','Bumuo ng tanong na hindi masasagot ng dalawang sanggunian lamang at magmungkahi ng ikatlong sanggunian.',['Larawan: biswal na sanggunian; panayam: pasalitang salaysay.','Ang larawan ay nagpapakita ng itsura sa isang panahon; ang panayam ay maaaring magbigay ng karanasan at konteksto. Dapat suriin ang petsa at pananaw.','May tiyak na tanong at angkop na sanggunian, gaya ng lumang mapa o tala ng munisipyo.']],
    ['Pakikibaka at kolektibong pagkilos','Basahin ang sipi mula sa sangguniang pinili ng guro tungkol sa isang kilusang Pilipino noong panahon ng kolonyalismo.','Tukuyin ang aktor, suliranin at isang tugon ayon sa sipi.','Ipaliwanag kung paano makauugnay ang pagkilos sa pag-usbong ng kamalayang Pilipino. Sumipi ng isang detalye.','Ihambing ang sipi sa isa pang sanggunian mula sa guro. Suriin ang pananaw at isang pagkakaiba sa salaysay.',['Dapat tumugma sa sipi ang aktor, suliranin at tugon.','May malinaw na paliwanag sa kolektibong pagkilos o pagkakakilanlan at may detalyeng sumusuporta rito.','Tukoy ang dalawang pananaw at may sapat na batayan para sa pagkakaibang binanggit.']],
    ['Suriin ang likás-kayang pag-unlad','Nais ng isang kathang-isip na barangay na maglinis ng ilog habang pinangangalagaan ang kabuhayan ng mga pamilyang umaasa rito.','Maglista ng isang layuning pangkapaligiran at isang layuning pangkabuhayan.','Magmungkahi ng isang hakbang na tumutugon sa dalawang layunin. Ipaliwanag ang benepisyo at posibleng kapalit nito.','Magmungkahi ng dalawang panukat na magagamit ng barangay pagkalipas ng tatlong buwan. Sabihin kung paano kukunin ang datos.',['Halimbawa: mas malinis na tubig at patuloy na kita ng mga pamilya.','Makatuwirang hakbang na tinutugunan ang dalawang layunin at kumikilala sa gastos, oras o iba pang kapalit.','Halimbawa: lingguhang bilang ng nakolektang basura at boluntaryong tala ng araw ng hanapbuhay, na may malinaw na paraan ng pagsukat.']]
  ]
};
const gradeEleven = {
  sources: {pacing:gradeElevenPacing},
  books: {},
  packs: {},
  additionalPacks: Object.fromEntries(Object.entries(gradeElevenCoreActivities).map(([subject, lessons])=>[
    subject, lessons.map(([title, setup, foundation, core, extension, answers],term)=>{
      const row=gradeElevenCurriculum[subject].terms[term][0];
      const filipino=['Mabisang Komunikasyon','Pag-aaral ng Kasaysayan at Lipunang Pilipino'].includes(subject);
      return {
        title, term:'Term '+(term+1), week:/^Weeks? \d/i.test(row.section) ? row.section : '',
        rowIndex:0, goal:row.label, direction:setup+' '+(filipino ? 'Basahin ang sitwasyon at sagutin ang gawain.' : 'Read the scenario and respond to the task.'),
        support:[foundation], tasks:[core], extension:[extension],
        keys:{Foundation:'1. '+answers[0], Core:'1. '+answers[1], Extension:'1. '+answers[2]},
        answers:'1. '+answers[1]
      };
    })
  ]))
};


const gradeElevenOfficialMaterials = {
  "Effective Communication": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Effective-Communication_LAS.pdf"
    ],
    [
      2,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Effective-Communication-Term-2-LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Effective-Communication_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Effective-Communication-Term-2-LE.pdf"
    ]
  ],
  "Contemporary Literature 1": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Contemporary-Literature-1_LAS-1.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Contemporary-Literature-1_LE-1.pdf"
    ]
  ],
  "Creative Composition 1": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Creative-Composition-1_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Creative-Composition-1_LE.pdf"
    ]
  ],
  "Filipino 1 (Wika at Komunikasyon sa Akademikong Filipino)": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Filipino-1_LAS-1.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Filipino-1_LE-1.pdf"
    ]
  ],
  "Introduction to the Philosophy of Human Person": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Introduction-to-the-Philosopy-of-the-Human-Person_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Introduction-to-the-Philosophy-of-the-Human-Person_LE.pdf"
    ]
  ],
  "Malikhaing Pagsulat": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Malikhaing-Pagsulat_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Malikhaing-Pagsulat_LE.pdf"
    ]
  ],
  "Philippine Governance (Philippine Politics and Governance)": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Philippine-Governance-Philippine-Politics-and-Governance_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Philippine-Governance-Philippine-Politics-and-Governance_LE.pdf"
    ]
  ],
  "Social Sciences (Theory and Practice)": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Social-Sciences-Theory-and-Practice_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Social-Scienes-Theory-and-Practice_LE.pdf"
    ]
  ],
  "Business 1 (Basic Accounting)": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Business-1_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Business-1_LE-1.pdf"
    ]
  ],
  "Introduction to Organization and Management": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Introduction-to-Organization-and-Management_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Introduction-to-Organization-and-Management_LE-1.pdf"
    ]
  ],
  "Biology 1": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Biology-1_LAS-1.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Biology-1_LE.pdf"
    ]
  ],
  "Chemistry 1": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Chemistry-1_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Chemistry-1_LE.pdf"
    ]
  ],
  "Earth and Space Science 1": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Earth-and-Space-1_LAS-1.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Earth-and-Space-1_LE.pdf"
    ]
  ],
  "Finite Mathematics 1": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Finite-Math-1_LAS-1.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Finite-Math-1_LE.pdf"
    ]
  ],
  "Finite Mathematics 2": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Finite-Math-2_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Finite-Math-2_LE.pdf"
    ]
  ],
  "Physics 1": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Physics-1_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Physics-1_LE.pdf"
    ]
  ],
  "Human Movement 1 (Basic Anatomy in Sports and Exercise)": [
    [
      1,
      "Learning activity sheet",
      "https://www.deped.gov.ph/wp-content/uploads/Human-Movement-1_LAS.pdf"
    ],
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Human-Movement-1_LE.pdf"
    ]
  ],
  "General Mathematics": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/General-Mathematics_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/General-Mathematics-Term-2-LE.pdf"
    ]
  ],
  "General Science": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/General-Science_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/General-Science-Term-2-LE.pdf"
    ]
  ],
  "Life and Career Skills": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Life-and-Career-Skills_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Life-and-Career-Skills-Term-2-LE.pdf"
    ]
  ],
  "Mabisang Komunikasyon": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Mabisang-Komunikasyon_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Mabisang-Komunikasyon-LE-Term-2.pdf"
    ]
  ],
  "Pag-aaral ng Kasaysayan at Lipunang Pilipino": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Pag-aaral-ng-Kasaysayan-at-Lipunang-Pilipino_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Pag-aaral-ng-Kasaysayan-at-Lipunang-Pilipino-Term-2-LE.pdf"
    ]
  ],
  "Agricultural Crops Production": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Agricultural-Crops-Production_1st-Term_LE.pdf"
    ]
  ],
  "Agro-Entrepreneurship": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Agro-entrepreneurship_1st-Term_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Agro-entrepreneurship_2nd-Term_LE.pdf"
    ]
  ],
  "Food Processing": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Food-Processing_Gr.-11_Term-1_LE.pdf"
    ]
  ],
  "Organic Agriculture Production": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Organic-Agriculture-Production-Gr.11-Term-1-LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Organic-Agriculture-Production-Gr.11-Term-2-LE.pdf"
    ]
  ],
  "Bakery Operations": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Bakery-Operations_1st-Term_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Bakery-Operations_2nd-Term_LE-1.pdf"
    ]
  ],
  "Food and Beverage Operation": [
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Food-and-Beverage-Operations-2nd-Term-LE.pdf"
    ]
  ],
  "Hotel Operations (Front Office Services)": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Hotel-Operations-Front-Office-Services_Term-1_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Hotel-Operations-Front-Office-Services_Term-2_LE.pdf"
    ]
  ],
  "Kitchen Operations": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Kitchen-Operations_1st-Term_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Kitchen-Operations_2nd-Term_LE.pdf"
    ]
  ],
  "Tourism Services": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Tourism-Services-1st-Term-LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Tourism-Services-2nd-Term-LE.pdf"
    ]
  ],
  "Domestic Refrigeration and Air-Conditioning Servicing": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Domestic-Refrigeration-and-Air-Conditioning-Servicing-_1st-Term_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Domestic-Refrigeration-and-Air-Conditioning-Servicing-_2nd-Term_LE.pdf"
    ]
  ],
  "Photovoltaic Systems Installation": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Photovoltaic-Systems-Installation_1st-Term_LE.pdf"
    ],
    [
      2,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Photovoltaic-Systems-Installation_2nd-Term_LE.pdf"
    ]
  ],
  "Computer Systems Servicing": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Computer-Systems-Servicing_1st-Term_LE.pdf"
    ]
  ],
  "Contact Center Services": [
    [
      1,
      "Lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Contact-Center-Servicing_1st-Term_LE.pdf"
    ]
  ]
};
