const gradeTwelvePilotPolicy = 'https://www.deped.gov.ph/2026/05/28/may-28-2026-dm-036-s-2026-pilot-implementation-of-the-strengthened-senior-high-school-curriculum-for-grade-12-in-school-year-2026-2027/';
const gradeTwelveImmersionPolicy = 'https://www.deped.gov.ph/wp-content/uploads/DO_s2026_023r-1.pdf';
const gradeTwelvePacing = 'https://sites.google.com/deped.gov.ph/lsguide/budgets-of-work/grade-12';
const gradeTwelveStrengthened = {...gradeElevenAcademic,...gradeTwelveTechPro};

const gradeTwelveLegacyCompetencies = {
  'Practical Research 2': [
    ['CS_RS12-Ia-c-1','Describe the characteristics, strengths, weaknesses and kinds of quantitative research.'],
    ['CS_RS12-Ia-c-2','Illustrate the importance of quantitative research across fields.'],
    ['CS_RS12-Ia-c-3','Differentiate kinds of variables and their uses.'],
    ['CS_RS12-Id-e-1','Design a research study useful in daily life.'],
    ['CS_RS12-Id-e-2','Write a research title.'],
    ['CS_RS12-Id-e-3','Describe the background of the research.'],
    ['CS_RS12-Id-e-4','State research questions.'],
    ['CS_RS12-Id-e-5','Indicate the scope and delimitation of the study.']
  ],
  'Inquiries, Investigations, and Immersion': [
    ['Brainstorming for Research Topics','Prepare a plan and focus on issues and ideas in the learner’s field.'],
    ['Identifying the Problem and Asking the Question','Formulate the research problem and present its written statement.'],
    ['Reading on Related Studies','Select, cite and synthesize related literature.']
  ],
  'Work Immersion': [
    ['Pre-Immersion','Discuss expected workplace behaviour, including workplace ethics, safety and confidentiality.'],
    ['Immersion Proper','Perform the school-approved duties required by the assigned workplace.'],
    ['Post-Immersion','Organize and present evidence of learning from the work immersion experience.']
  ],
  'Empowerment Technologies (for the Strand)': [
    ['CS_ICT11/12-ICTPT-Ia-b-1','Compare online platforms, sites and content for a specific class objective or situational challenge.'],
    ['CS_ICT11/12-ICTPT-Ia-b-2','Apply standards of online safety, security, ethics and etiquette when using ICT.'],
    ['CS_ICT11/12-ICTPT-Ia-b-3','Use the internet for credible research and information gathering.']
  ],
  'Entrepreneurship': [
    ['CS_EP11/12ENTREP-0a-1','Identify the market problem or need to be met.'],
    ['CS_EP11/12ENTREP-0a-2','Propose products or services that could meet the identified need.'],
    ['CS_EP11/12ENTREP-0a-3','Analyze the market need.']
  ]
};
for (const [name,rows] of Object.entries(gradeTwelveLegacyCompetencies)) {
  gradeTwelveLegacy[name].terms=[rows.map(([section,label],index)=>({section,label,index:String(index),exemplars:[]}))];
}

const gradeTwelveExistingActivities = {
  'Practical Research 2': [
    [2,'Variables in a reading study','A class compares silent reading scores of two groups after 15 minutes of practice daily. One group reads on paper and one reads on tablets; both answer the same quiz.','Identify the measured outcome and the two conditions.','Classify the independent and dependent variables. Give one other variable the teacher should keep consistent.','Explain why one group having more practice days would make interpretation harder. Propose an adjustment.', ['Outcome: quiz score. Conditions: paper and tablet reading.','Independent: reading medium. Dependent: quiz score. Keep time, text difficulty, testing conditions or the quiz consistent.','Extra days could influence scores independently of the medium. Equalize instructional days or explicitly account for them in the design.']],
    [6,'Make an observation into a research question','The canteen has long waits on some days. A fictional class can count arriving learners or record queue length using anonymous totals.','Name two quantities that the class could record.','Write a focused research question with a measurable outcome, setting and observation period.','Write a second question with a comparison. Explain how to make that comparison fair.', ['Examples: arrivals per minute and queue length at set times.','Example: What is the average queue length at the school canteen at 12:00 over five school days?','A defensible comparison might use two windows of equal duration on the same days and collect counts consistently.']]
  ],
  'Inquiries, Investigations, and Immersion': [
    [1,'Frame a school waste research problem','A school proposes a recycling corner. Its initial note says that plastic waste is a problem, but includes no measurements.','Point out what information is missing and name one source.','Draft a short problem statement specifying the setting, an evidence gap and one measurable research question.','Add two limits on the intended claim and explain how they affect interpretation.', ['Missing: baseline amount or frequency. Possible source: anonymous counts from a school-approved waste audit.','Accept a feasible problem with context, a gap and a question that can be answered using safe, school-approved observations.','Accept location, days, waste categories or measurement limits with a clear explanation of generalizability.']]
  ],
  'Work Immersion': [
    [0,'Respond to a workplace scenario','A fictional learner sees a damaged cord near a reception desk. Another trainee wants to share a photo that includes a guest record.','Name the safety concern and the privacy concern.','Write the next actions for each issue and identify the appropriate supervisor or designated contact.','Write a two-sentence incident note that includes useful facts and protects personal information.', ['Possible electrical hazard and disclosure of guest data.','Keep clear, do not handle the cord, and tell the designated supervisor. Do not share the photo; report the privacy concern using the site procedure.','State the time, place and observation, plus who was notified. Omit guest names and identifying details.']]
  ],
  'Empowerment Technologies (for the Strand)': [
    [2,'Check the source before citing','A learner finds a screenshot of an unattributed flood map, a dated municipal advisory and a classmate’s repost.','Identify which item gives an identifiable publisher and date.','Make a verification checklist and explain which item you would cite first for the local advisory.','Explain what you would do if the dated advisory and an official update disagree.', ['The dated municipal advisory.','Check publisher, location, publication date, original link and whether it has been superseded. Prefer the original official advisory if applicable.','Check publication times, whether the newer item explicitly updates the earlier one, and whether they cover the same area. Cite the applicable version.']]
  ],
  'Entrepreneurship': [
    [0,'Identify a market need near school','After-school learners wait 20 minutes at a transport stop. An interview sample suggests that some bring their own snacks and others want low-cost choices.','Write the possible customer group and one problem mentioned.','Formulate one market need as a testable statement and identify evidence that could support or refute it.','Design a brief anonymous comparison of demand at two times and explain one source of bias.', ['After-school commuters; limited suitable low-cost snack options is a possible problem.','A useful answer identifies a price range, time and target group, then proposes counts or voluntary anonymous responses.','Collect comparable responses at both times using the same wording. Possible bias includes asking only one friend group or only current buyers.']]
  ]
};
const gradeTwelvePilotActivities = {
  'Computer Systems Servicing': [
    [1,'Map the components of a computer system','A training workstation has a processor, RAM, storage and a monitor. At startup the operating system loads from storage.','Match each item to processing, temporary memory, persistent storage or output.','Explain the role of each component when opening a spreadsheet and saving a file.','Compare replacing a small storage drive with adding RAM. Explain which change addresses each of two separate symptoms.', ['Processor: processing; RAM: temporary memory; storage: persistent storage; monitor: output.','The processor executes instructions; the active program and data are held in RAM; saved files remain in storage; the monitor displays results.','Low free disk space points to storage. Heavy multitasking that repeatedly exceeds available working memory points to RAM.']]
  ],
  'Tourism Services': [
    [2,'Connect local tourism stakeholders','A fictional Cebu heritage walk needs a site custodian, a local guide, transport and a school coordinator. A community heritage group wants visitor behaviour explained before arrival.','Match each stakeholder with one responsibility.','Draw a responsibility map for a school visit and name the handoff between the coordinator and the guide.','Revise the map when access changes because of a local event. Show who confirms current information and whom they notify.', ['Custodian: access rules; guide: interpretation; transport: pickup and route; coordinator: group arrangements; heritage group: local guidance.','A complete map routes confirmed rules from the custodian to the guide and coordinator, who brief participants.','Confirm with the site custodian or official organizer. Update the coordinator, guide, transport and visitors as appropriate.']]
  ],
  'Agro-Entrepreneurship': [
    [1,'Compare local produce markets','A fictional growers’ group can sell 30 bunches to a school canteen at ₱14 per bunch with ₱50 transport, or sell 26 at a barangay market at ₱18 per bunch with ₱100 stall and transport costs.','Find revenue before the stated costs for each option.','Find revenue minus the stated costs for both options. Recommend one using the figures and one practical consideration.','Compute the minimum whole number of bunches the market must sell to exceed the canteen result. Explain one uncertainty.', ['Canteen: ₱420. Market: ₱468.','Canteen: ₱370; market: ₱368. The initial canteen result is ₱2 higher. Consider demand or reliability.','18n − 100 > 370, so at least 27. Consider unsold stock or fluctuating demand.']]
  ],
  'Hotel Operations (Front Office Services)': [
    [1,'Handle a front-office service request','A fictional guest arrives before check-in. Their room is still being cleaned. The front office can offer luggage storage with the approved claim procedure.','List what the employee knows and one approved option.','Write a service response that acknowledges the need, checks information and offers the approved option.','Adapt your response to a delay with no reliable completion time. Explain how you would keep the guest informed.', ['Room not ready; approved luggage storage is available.','Acknowledge the wait, offer luggage storage through the approved procedure, and explain how the next update will be given.','Give a clear update time or contact method without promising a room readiness time that has not been confirmed.']]
  ],
  'Events Management Services': [
    [2,'Choose a theme for a school exhibit','A school plans a 90-minute exhibit for Grade 10 visitors. Its goals are to explain local livelihoods and have each group produce a short reflection. Available space is one classroom.','List the audience, two goals and one constraint.','Propose a theme and explain why two activities fit the theme, audience and room.','Adapt the plan for an audience twice as large without exceeding room capacity or time.', ['Grade 10 visitors; explain local livelihoods and produce a reflection; one classroom or 90 minutes.','A workable theme connects activities to local livelihoods and gives students a concrete opportunity to reflect.','Accept rotating groups, a staggered entry plan or parallel activities outside the room with school approval. Maintain time and access constraints.']]
  ]
};
function gradeTwelveActivityResources(curriculum, spec) {
  const packs=Object.fromEntries(Object.entries(spec).map(([subject,activities])=>[
    subject, activities.map(([index,title,setup,foundation,core,extension,answers])=>{
      const row=curriculum[subject].terms[0][index];
      return {rowIndex:index,title,goal:row.label,week:/^Weeks? \d/i.test(row.section) ? row.section : '',
        direction:setup+' Read the scenario and answer the question.',
        support:[foundation],tasks:[core],extension:[extension],
        answers:'1. '+answers[1],
        keys:{Foundation:'1. '+answers[0],Core:'1. '+answers[1],Extension:'1. '+answers[2]}};
    })
  ]));
  return {sources:{},books:{},packs:{},additionalPacks:packs};
}
const gradeTwelveResources={
  legacy:gradeTwelveActivityResources(gradeTwelveLegacy,gradeTwelveExistingActivities),
  new:gradeTwelveActivityResources(gradeTwelveStrengthened,gradeTwelvePilotActivities)
};

const gradeTwelveOfficialMaterials = {
  "Agricultural Crops Production": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Agricultural-Crops-Production_G12_LE.pdf"
    ]
  ],
  "Agro-Entrepreneurship": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Agro-entrepreneurship_Gr.12_LE.pdf"
    ]
  ],
  "Food Processing": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Food-Processing_Gr.-12_LE.pdf"
    ]
  ],
  "Organic Agriculture Production": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Organic-Agriculture-Production-Gr.12-LE.pdf"
    ]
  ],
  "Bakery Operations": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Bakery-Operations_Gr-12_LE.pdf"
    ]
  ],
  "Hotel Operations (Front Office Services)": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Hotel-Operations-Front-Office-Services_Gr.-12_LE.pdf"
    ]
  ],
  "Hotel Operations (Housekeeping Services)": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Hotel-Operations-Housekeeping-Services_Grade-12_LEs.pdf"
    ]
  ],
  "Kitchen Operations": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Kitchen-Operations_Gr.-12_LE.pdf"
    ]
  ],
  "Tourism Services": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Tourism-Services-Grade-12-LE.pdf"
    ]
  ],
  "Domestic Refrigeration and Air-Conditioning Servicing": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Domestic-Refrigeration-and-Air-Conditioning-Servicing-_G12_LE.pdf"
    ]
  ],
  "Mechatronics": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Mechatronics_G12_LE.pdf"
    ]
  ],
  "Photovoltaic Systems Installation": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Photovoltaic-Systems-Installation_Grade-12_LE.pdf"
    ]
  ],
  "Computer Systems Servicing": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Computer-Systems-Servicing_Grade-12_LE.pdf"
    ]
  ],
  "Contact Center Services": [
    [
      0,
      "Grade 12 lesson exemplar",
      "https://www.deped.gov.ph/wp-content/uploads/Contact-Center-Servicing_Gr.12_LE.pdf"
    ]
  ]
};
