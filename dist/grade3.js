const gradeThree = {
  sources:{
    pacing:'https://sites.google.com/deped.gov.ph/deped-lrportal/three-term-budget-of-work-bow/grade-3',
    local:'https://sites.google.com/deped.gov.ph/projectgrasp/revised-k-to-10-curriculum'
  },
  books:{},
  packs:{
    English:{
      term:'Term 1',title:'Read words with final consonant blends',
      goal:'Read familiar CVCC words accurately in isolation and in sentences.',
      direction:'Read the words aloud. Keep both sounds at the end of each word.',
      tasks:['Read: hand, lamp, desk, mask.','Read aloud: The lamp is on the desk.','Find and read the two CVCC words in: Lift the gift.'],
      answers:'1. Listen for both final consonants in each word. 2. Check lamp and desk. 3. Lift and gift.',
      support:['Listen to the sounds in lamp, then blend them together.','Read lamp and land. Say the two sounds at the end of each word.'],
      extension:['Read: The dog must jump past the tent. Find four CVCC words.','Write and read a sentence using two of the words.'],
      keys:{Foundation:'1. lamp. 2. lamp ends in /m/ and /p/. Land ends in /n/ and /d/.',Extension:'1. must, jump, past, tent. 2. Check both chosen words and accurate reading.'}
    },
    Filipino:{
      term:'Term 1',title:'Mga salitang madalas gamitin',
      goal:'Makilala at magamit nang wasto ang mga salitang madalas gamitin sa Filipino.',
      direction:'Basahin ang pangungusap. Piliin o sabihin ang salitang angkop sa patlang.',
      tasks:['___ guro ay nagbabasa. (Ang / Sa)','Si Ana ___ si Ben ay naglaro. (at / sa)','Basahin: Si Ana at si Ben ay naglaro sa bakuran. Hanapin ang si, at, at sa.'],
      answers:'1. Ang. 2. at. 3. si (dalawang beses), at, sa.',
      support:['Basahin: Ang bata ay masaya. Ituro ang salitang ang.','Basahin: Si Lito ay nagbabasa. Ituro ang salitang si.'],
      extension:['Sumulat ng pangungusap gamit ang si at sa.','Magdagdag ng isa pang tauhan gamit ang at.'],
      keys:{Foundation:'1. Ang. 2. Si.',Extension:'Halimbawa: Si Mia ay nagbabasa sa silid. Si Mia at si Leo ay nagbabasa sa silid.'}
    },
    Mathematics:{
      term:'Term 1',week:'1',title:'Measure area with square tiles',
      goal:'Represent and estimate the area of squares and rectangles using square units.',
      direction:'Draw a grid or use equal square tiles. Cover the surface with no gaps or overlaps.',
      tasks:['Draw a rectangle with 3 rows of 4 squares. Estimate and then count its area.','Draw a square with 4 rows of 4 squares. What is its area?','Which shape covers more squares? By how many?'],
      answers:'1. 12 square units. 2. 16 square units. 3. The square, by 4 square units.',
      support:['Cover a rectangle with 2 rows of 3 tiles. Count all tiles.','Show two equal rows with 4 tiles in each. What is the area?'],
      extension:['Build two different rectangles with area 12 square units. Record their dimensions.','Explain why counting rows alone does not give area.'],
      keys:{Foundation:'1. 6 square units. 2. 8 square units.',Extension:'1. For example, 2 by 6 and 3 by 4. 2. Each row can contain more than one tile.'}
    },
    Makabansa:{
      term:'Term 1',week:'1–5',title:'Mga lugar na may kuwento',
      goal:'Talakayin ang isang mahalagang lugar, tao o pangyayari sa kasaysayan ng sariling pamayanan.',
      direction:'Gamitin ang larawan, kuwento o sangguniang ipinakita ng guro.',
      tasks:['Tukuyin ang lugar na nasa larawan o kuwento.','Sino o anong pangyayari ang kaugnay nito?','Ipaliwanag kung bakit mahalaga ito sa pamayanan.'],
      answers:'Suriin ang sagot gamit ang lokal na sangguniang pinili ng guro. Inaasahan ang isang tumpak na detalye at malinaw na paliwanag.',
      support:['Pumili ng tamang pangalan mula sa dalawang ibinigay ng guro.','Tapusin: Mahalaga ang lugar na ito dahil ___.'],
      extension:['Maghambing ng dalawang larawan o kuwento tungkol sa lugar. Ano ang nagbago?'],
      keys:{Foundation:'Gamitin ang piniling lokal na sanggunian at tanggapin ang isang tumpak na dahilan.',Extension:'Hanapin ang pagbabagong may batayan sa dalawang sanggunian.'}
    },
    GMRC:{
      term:'Term 1',week:'1',title:'Hilig, kasanayan at tiwala sa sarili',
      goal:'Makilala ang sariling hilig at kakayahan at pumili ng paraan upang mapaunlad ito.',
      direction:'Mag-isip, gumuhit o magsulat ng maikling sagot.',
      tasks:['Magbigay ng isang bagay na gusto mong gawin.','Sabihin ang isang kaya mo nang gawin kaugnay nito.','Pumili ng isang hakbang na susubukan mo ngayong linggo.'],
      answers:'Tanggapin ang angkop na hilig, kaugnay na kakayahan at isang tiyak na hakbang.',
      support:['Pumili: pagguhit, pagbabasa, o iba pang nais mong gawin.','Tapusin: Magsasanay akong ___.'],
      extension:['Ano ang gagawin mo kung mahirap ang unang pagsubok? Sabihin kung sino ang puwedeng tumulong.'],
      keys:{Foundation:'Tanggapin ang angkop na piniling hilig at pagsasanay.',Extension:'Hanapin ang isang makatotohanang hakbang at paraan ng paghingi ng tulong.'}
    },
    Science:{
      term:'Term 1',week:'1–3',title:'Ask a question about rolling',
      goal:'Ask an observable science question and investigate it using simple materials.',
      direction:'Use cardboard, books and the same large ball for each trial. Keep the runway clear.',
      tasks:['Ask a question about how the height of a ramp affects how far the ball rolls.','Try two ramp heights. Use the same ball and release it without pushing.','Record how far it rolled in each trial. What did you observe?'],
      answers:'1. Accept a testable question about ramp height and rolling distance. 2. Check a consistent ball and release method. 3. Accept conclusions supported by the recorded results.',
      support:['Predict which ramp height will make the ball roll farther.','Measure from the same starting mark on the floor for both trials.'],
      extension:['Repeat each trial three times. Compare the results.','Name one thing you kept the same and explain why.'],
      keys:{Foundation:'1. Accept any prediction with a reason. 2. Check that each measurement uses the same floor reference.',Extension:'1. Check repeated observations support the comparison. 2. Examples include keeping the same ball, surface, or release method.'}
    }
  }
};

gradeThree.additionalPacks = {
  English: [
    {
      term:'Term 2', title:'Read two-syllable VCCV words', goal:'Read common VCCV words accurately.',
      direction:'Mark where the word breaks into syllables, then read it aloud.',
      support:['Read rab–bit. Point to each syllable.','Split napkin into two syllables.'],
      tasks:['Split and read basket, kitten and sunset.','Read: The kitten sat in the basket. Underline the two VCCV words.'],
      extension:['Split and read magnet and picnic.','Write a sentence containing both words and read it aloud.'],
      answers:'1. bas-ket, kit-ten, sun-set. 2. kitten, basket.',
      keys:{Foundation:'1. rab-bit. 2. nap-kin.',Extension:'1. mag-net, pic-nic. 2. Check that both words are used sensibly and read accurately.'}
    },
    {
      term:'Term 3', title:'Words about our country', goal:'Use vocabulary relating to a national theme.',
      direction:'Use the words flag, citizen and community to complete the activities.',
      support:['Which word names a person who belongs to a country?','Which word names a symbol that can be raised on a pole?'],
      tasks:['Complete: A ___ is a symbol of a country.','Complete: People who live or work together in a place make up a ___.','Use citizen in a sentence about caring for a public place.'],
      extension:['Write a short invitation to a community clean-up. Use citizen and community.','Explain why a flag is called a symbol.'],
      answers:'1. flag. 2. community. 3. Example: A citizen can help keep the park clean.',
      keys:{Foundation:'1. citizen. 2. flag.',Extension:'1. Look for a clear invitation and appropriate use of both words. 2. It stands for or represents a country or group.'}
    }
  ],
  Filipino: [
    {
      term:'Term 2',title:'Mga salita sa pakikipagkapuwa',goal:'Gamitin ang mga salitang kaugnay ng GMRC sa pangungusap.',
      direction:'Pumili mula sa paggalang, pagtulong at pakikinig.',
      support:['Alin ang ginagawa kapag may nagsasalita: pakikinig o pagtulong?','Alin ang ipinakikita kapag inaalalayan mo ang kaklase: pagtulong o pakikinig?'],
      tasks:['Anong salita ang angkop kapag hinihintay mong matapos magsalita ang iba?','Anong salita ang angkop kapag inalalayan mo ang kaklase sa pagdadala ng libro?','Sumulat ng halimbawa ng paggalang sa talakayan.'],
      extension:['Gumawa ng dalawang linyang usapan na nagpapakita ng paggalang at pakikinig.','Ipaliwanag kung paano makikita ang dalawang asal sa usapan.'],
      answers:'1. Pakikinig. 2. Pagtulong. 3. Halimbawa: Makikinig ako sa opinyon ng kaklase bago ako sumagot.',
      keys:{Foundation:'1. Pakikinig. 2. Pagtulong.',Extension:'Hanapin ang magalang na pananalita at tugong nagpapakitang naunawaan ang sinabi ng kasama.'}
    },
    {
      term:'Term 3',title:'Mga salita tungkol sa bansa',goal:'Gamitin ang pamilyar na talasalitaan tungkol sa sarili at bansa.',
      direction:'Basahin ang bawat sitwasyon at ipaliwanag ang iyong sagot.',
      support:['Piliin: Ang Pilipinas ay isang (bansa / silid).','Piliin: Ang lugar na tinitirhan natin ay bahagi ng isang (pamayanan / lapis).'],
      tasks:['Gamitin ang bansa sa pangungusap tungkol sa Pilipinas.','Gamitin ang pamayanan sa pangungusap tungkol sa lugar ninyo.','Gamitin ang tumutulong sa pangungusap tungkol sa isang gawain sa inyong lugar.'],
      extension:['Sumulat ng dalawang magkaugnay na pangungusap gamit ang bansa at pamayanan.','Idagdag ang isang konkretong gawaing maitutulong mo.'],
      answers:'Tanggapin ang wastong gamit ng bawat salita. Halimbawa: Ang Pilipinas ang ating bansa. May silid-aklatan sa aming pamayanan. Tumutulong ako sa paglilinis ng bakuran.',
      keys:{Foundation:'1. bansa. 2. pamayanan.',Extension:'Hanapin ang dalawang angkop na gamit at isang tiyak na gawaing kayang gawin ng bata.'}
    }
  ],
  Mathematics: [
    {
      term:'Term 2',week:'1',title:'Estimate and measure mass',goal:'Estimate and measure mass using appropriate units and tools.',
      direction:'Use a classroom scale. Record the estimate, the reading and the unit.',
      support:['Choose a likely unit for a schoolbag: g or kg.','Choose a likely unit for an eraser: g or kg.'],
      tasks:['Estimate the mass of an eraser in grams, then measure it.','Estimate the mass of a filled schoolbag in kilograms, then measure it on a suitable scale.','Which estimate was closer? Compare after expressing both errors in the same unit.'],
      extension:['A bag was estimated at 2 kg. It reads 2,300 g. What is the difference in grams?','Explain why it helps to zero the scale before measuring.'],
      answers:'1–2. Confirm that the estimate and observed reading use the stated unit. 3. Convert errors to the same unit, then choose the smaller absolute difference.',
      keys:{Foundation:'1. kg. 2. g.',Extension:'1. 300 g. 2. Zeroing avoids counting an offset or the mass of an empty container.'}
    },
    {
      term:'Term 3',week:'1',title:'Use the 6 to 9 times tables',goal:'Multiply using the 6, 7, 8 and 9 times tables.',
      direction:'Use arrays, equal groups or known facts to explain your thinking.',
      support:['Draw 3 groups of 6. How many dots?','Draw 2 groups of 7. How many dots?'],
      tasks:['Find 6 × 7 and 7 × 8.','Find 8 × 9 and 9 × 6.','There are 7 trays with 9 cups on each. How many cups altogether?'],
      extension:['Find two different multiplication facts with product 54.','Use 8 × 10 to explain how to find 8 × 9.'],
      answers:'1. 42 and 56. 2. 72 and 54. 3. 63 cups.',
      keys:{Foundation:'1. 18. 2. 14.',Extension:'1. 6 × 9 and 9 × 6. 2. 80 − 8 = 72.'}
    }
  ],
  Makabansa: [
    {
      term:'Term 2',week:'1–2',title:'Kapaligiran at kultura',goal:'Ipaliwanag ang isang ugnayan ng lokal na kapaligiran at kultura.',
      direction:'Gamitin ang mga halimbawa mula sa larawan o kalagayang ipinaliwanag ng guro.',
      support:['Piliin: Sa pamayanang malapit sa dagat, alin ang maaaring hanapbuhay: pangingisda o paggawa ng sapatos?','Anong bahagi ng kapaligiran ang tumutulong dito?'],
      tasks:['Tukuyin ang isang katangian ng lokal na kapaligiran.','Magbigay ng isang lokal na gawain na may kaugnayan dito.','Ipaliwanag kung paano nakatutulong ang kapaligiran sa gawaing iyon.'],
      extension:['Maghambing ng pamayanang malapit sa dagat at pamayanang nasa kabundukan.','Ipaliwanag kung paano maaaring magkaiba ang kanilang mga gawain.'],
      answers:'Hanapin ang tiyak na katangian, gawaing may kaugnayan at malinaw na paliwanag. Halimbawa: Ang dagat ay maaaring pagkunan ng isda para sa pagkain at kabuhayan.',
      keys:{Foundation:'1. Pangingisda. 2. Dagat.',Extension:'Tanggapin ang makatwirang halimbawa para sa dalawang kapaligiran. Iwasang ituring na pare-pareho ang lahat ng pamayanan.'}
    },
    {
      term:'Term 3',week:'1',title:'Pagkilala sa pagka-Pilipino',goal:'Ipaliwanag ang pagka-Pilipino gamit ang mga halimbawa ng pagkakakilanlan at pakikilahok.',
      direction:'Magbigay ng mga halimbawang nakita o natutuhan sa klase.',
      support:['Magbanggit ng isang wikang ginagamit sa Pilipinas.','Magbigay ng halimbawa ng pagtutulungan sa inyong lugar.'],
      tasks:['Magbigay ng dalawang halimbawa ng pagkakakilanlang Pilipino.','Paano maaaring magkaiba ang wika o kaugalian ng dalawang Pilipino?','Ano ang isang gawaing makatutulong sa inyong pamayanan?'],
      extension:['Maghambing ng dalawang kaugalian mula sa magkaibang lugar.','Ipaliwanag kung paano iginagalang ang dalawang kaugalian.'],
      answers:'Tanggapin ang mga tumpak na halimbawa at konkretong gawaing pampamayanan. Kilalanin ang pagkakaiba-iba ng mga wika at kaugalian.',
      keys:{Foundation:'Halimbawa: Cebuano o Filipino, at pagtutulungan sa paglilinis ng paaralan.',Extension:'Hanapin ang dalawang tumpak na halimbawa at magalang na paliwanag.'}
    }
  ],
  GMRC: [
    {
      term:'Term 2',week:'1',title:'Magpasensiya sa kapuwa',goal:'Gumamit ng mahinahon at magalang na tugon sa isang sitwasyon kasama ang kapuwa.',
      direction:'Basahin ang sitwasyon. Sabihin ang gagawin at sasabihin mo.',
      support:['May kaklase pang gumagamit ng lapis na hihiramin mo. Hihintay ka ba o aagawin ito?','Sabihin: Maaari ko bang hiramin pagkatapos mo?'],
      tasks:['May kaklase na matagal matapos sa pagsagot. Ano ang maaari mong sabihin?','May sumingit sa pila. Paano mo siya kakausapin nang mahinahon?','Bakit nakatutulong ang mahinahong tugon?'],
      extension:['Gumanap sa isang maikling usapan kung saan may hindi pagkakaunawaan sa pangkat.','Ipaliwanag kung anong salita o kilos ang nakatulong para magkaayos.'],
      answers:'Hanapin ang magalang na paghihintay, mahinahong pagpapaalala, at dahilan kung bakit nakatutulong ito sa pag-uusap.',
      keys:{Foundation:'1. Maghintay. 2. Pakinggan ang magalang na paghiling.',Extension:'Tanggapin ang magalang na salita o kilos na may malinaw na epekto sa pag-uusap.'}
    },
    {
      term:'Term 3',week:'2',title:'Gamitin muli ang mga bagay',goal:'Pumili ng ligtas na paraan ng muling paggamit ng isang bagay kasama ang kapuwa.',
      direction:'Gumamit ng malinis at ligtas na materyales sa klase.',
      support:['Alin ang puwedeng gamitin muli: malinis na karton o basag na salamin?','Magbigay ng isang bagong gamit ng karton.'],
      tasks:['Pumili ng malinis na bagay na hindi na ginagamit.','Iguhit ang bagong gamit nito.','Ipaliwanag kung paano kayo magtutulungan sa paggawa.'],
      extension:['Ihambing ang muling paggamit at pagre-recycle ng papel.','Sabihin kung kailan mas praktikal na gamitin muna muli ang papel.'],
      answers:'Hanapin ang ligtas na materyal, kapaki-pakinabang na bagong gamit at tiyak na paraan ng pagtutulungan.',
      keys:{Foundation:'1. Malinis na karton. 2. Halimbawa: lalagyan ng mga kard.',Extension:'Ang reuse ay paggamit muli ng bagay. Ang recycling ay pagproseso nito upang maging bagong materyal o produkto. Halimbawa ng reuse: gamitin ang likod ng papel bago i-recycle.'}
    }
  ],
  Science: [
    {
      term:'Term 2',week:'1–2',title:'Living and non-living things',goal:'Distinguish living and non-living things in the local environment.',
      direction:'Observe without touching unfamiliar plants or animals.',
      support:['Which is living: a growing seedling or a stone?','Name something a growing seedling does that a stone does not.'],
      tasks:['Classify a growing grass plant, a bird, a pebble and a metal spoon.','Give one observation about the plant that supports your classification.','Why is a rolling ball still non-living?'],
      extension:['A toy dog moves when switched on. What evidence would you use to distinguish it from a real dog?','Give another example where movement alone could mislead you.'],
      answers:'1. Living: grass and bird. Non-living: pebble and spoon. 2. Example: new leaves appear as it grows. 3. The ball moves when something acts on it, and it does not show the life processes of an organism.',
      keys:{Foundation:'1. Seedling. 2. It grows and develops.',Extension:'1. A real dog grows and responds as a living organism, while the toy operates through its mechanism. 2. Examples include a rolling wheel or a moving cloud.'}
    },
    {
      term:'Term 3',week:'1–5',title:'Sound comes from vibrations',goal:'Describe how sound is produced and heard in familiar situations.',
      direction:'Work quietly. Tap a ruler lightly with its end held over a desk, or watch the teacher demonstrate.',
      support:['Watch the end of the ruler after a light tap. Does it move back and forth?','Can you hear it when it moves?'],
      tasks:['Describe what you see and hear when the ruler is tapped lightly.','Touch the ruler gently to stop its motion. What changes?','Explain how another person nearby can hear the sound.'],
      extension:['Compare a gentle tap with a slightly firmer tap. How does the sound change?','Explain why the ruler becomes quiet when it stops moving.'],
      answers:'1. The ruler vibrates and makes sound. 2. Its vibration and sound stop or become weaker. 3. The vibration travels through air to the listener.',
      keys:{Foundation:'1. Yes. 2. A sound can be heard if the vibration is strong enough.',Extension:'1. A firmer tap usually makes a louder sound. 2. Without the ongoing vibration, it stops producing that sound.'}
    }
  ]
};
