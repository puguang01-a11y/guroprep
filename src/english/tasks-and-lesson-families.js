/* ===================== English: performance tasks with rubrics ===================== */
const RUB={
 speak:['Content: ideas are clear and on topic','Delivery: speaks with correct pronunciation, volume and pace','Language: uses correct words and sentences','Confidence: faces the audience and uses good posture'],
 read:['Accuracy: reads words correctly','Speed: reads at a steady pace, not too fast or slow','Expression: uses correct pitch, pauses and feeling','Understanding: can answer a question about what was read'],
 write:['Content: ideas are complete and on topic','Organization: has a clear beginning, middle and end (or correct parts)','Language: correct grammar, spelling and word choice','Mechanics: correct capital letters and punctuation; neat handwriting'],
 nonverbal:['Uses the cue correctly for the situation','The cue matches the words and the feeling','The cue is clear to the audience','Respects others (culture-sensitive and appropriate)'],
 view:['Identifies the visual elements correctly','Explains the meaning or purpose clearly','Gives evidence from the visual','Uses correct and respectful language'],
 create:['Purpose is clear','Uses the elements learned (color, space, lines, text, sound or motion)','Message is easy to understand','Original, neat and complete']};
const RUBNOTE='Score each criterion 4 (excellent), 3 (good), 2 (fair), or 1 (needs help).';
const TK={
 fluency:['Read the story aloud to a partner. Then switch.','Read the first paragraph aloud three times. Try to read faster and smoother each time.','Read a short text aloud to the class with feeling (expression).'],
 intonation:['Read these with the correct rising or falling voice: "Are you ready?" / "I am ready." / "What a surprise!"','Say "You won the prize." as a statement, then as a question, then as an exclamation.','Read a short dialogue with a partner. Pause at commas and stop at periods.'],
 legible:['Copy five words from the word list neatly. Leave a small space between words.','Write three sentences about your family. Use neat letters and correct spacing.','Write the word list in alphabetical order with your best handwriting.'],
 polite:['Role-play: You meet your teacher in the morning. Greet her politely.','Role-play: You borrow a pencil from a classmate. Ask and say thank you.','Role-play: You bump into someone in the hallway. Say sorry and offer help.','Role-play: A visitor comes to your classroom. Welcome the visitor politely.'],
 retell:['Retell a fable you know (for example, "The Monkey and the Turtle") in your own words.','Retell the story you read today to a partner using "first, next, then, finally."','Retell a legend from your province in five sentences.'],
 express:['Talk about a place in your barangay that you like. Tell what you see, hear and do there.','Tell your group about one thing you learned in Science or Math this week.','Share your ideas about how to keep your community clean.'],
 react:['Write three sentences telling what you think about the main character and why.','Would you like to live in the setting of the story? Write why or why not.','Write a short letter to the main character giving advice.'],
 react_topic:['Write four sentences about this topic: "Should children help with chores at home?"','Write your reaction to this topic: "Our school should have a garden." Give two reasons.','Write what you think about using cell phones in class. Give one reason.'],
 summary:['Write a summary of the story in three sentences: beginning, middle and end.','Summarize the story in five sentences using "first, next, then, after that, finally."','Write a one-paragraph summary of a story you read this week.'],
 tt_procedure:['Write the steps for cooking rice. Use first, next, then and finally.','Write how to wash your hands properly in five steps.','Write the steps for planting a seed.'],
 tt_description:['Describe your classroom. Tell what it looks like and where things are.','Describe your favorite fruit using at least four describing words.','Describe a festival in your town.'],
 tt_explanation:['Explain why we need to drink water every day.','Explain why leaves fall from some trees.','Explain how a rainbow is formed in four sentences.'],
 tt_narrative:['Write a short story about a lost pet. Include characters, a setting, a problem and a solution.','Write a story that begins with "The power went out during the storm..."','Write a story about a surprise birthday party.'],
 tt_recount:['Write about what you did last weekend. Use time words (first, then, after that).','Recount a school activity you joined this year.','Recount a trip you took with your family.'],
 tt_news:['Write a short news report about an event in your school. Answer who, what, when, where, why and how.','Write a news report about a clean-up drive in your barangay.','Write a headline and a short news report about your class winning a contest.'],
 tt_persuasive:['Write a paragraph persuading your classmates to bring reusable water bottles. Give three reasons.','Write a letter to your principal asking for more books in the library. Give reasons.','Make a poster with a slogan that persuades people to save water.'],
 letter:['Write a friendly letter to a classmate inviting them to your birthday party.','Write an excuse letter to your teacher because you were absent yesterday.','Write a thank-you letter to a person who helped you.'],
 ibc:['Write a short paragraph about your favorite place with an introduction, a body and a conclusion.','Write three paragraphs about "My Dream Job": introduction, body and conclusion.','Write about how to stay healthy. Use an introduction, a body with three tips, and a conclusion.'],
 relevant:['Write five facts about the Philippine eagle. Keep only information that is about the topic.','Read a short text and cross out the sentences that are not about the topic.','Give a short talk about recycling. Include only important information.'],
 evidence:['Write a paragraph saying why reading is important. Support each reason with a fact or example.','Choose a topic (for example, school uniforms). State your idea and give two pieces of evidence.','Read the text again. Find two sentences that support the main idea.'],
 nonverbal:['Role-play: show surprise, then sadness, using only your face.','Act out "Come here," "Stop," and "Very good!" using gestures only.','Tell a short story to a partner while keeping good eye contact.','Show a friendly handshake and a high-five. Discuss when each one is appropriate.','Stand and speak in front of the class with good posture.','Role-play a scene: decide where each actor stands (blocking) and how close they should be (proxemics).'],
 viewing:['Look at a poster or picture your teacher shows. What colors are used? What do they make you feel?','Look at an advertisement. What is its purpose? Who is it for?','Look at a picture. Is it real or make-believe? How do you know?','Look at a photo. What do the lines and shapes help you notice?'],
 create_visual:['Make a poster about saving water using colors, space and a short slogan.','Draw a comic strip with four frames about a good deed.','Design a book cover for the story you read.'],
 multimedia:['Watch a short video or TV ad your teacher shows. What is its purpose? Who is the target audience?','Name the multimedia elements in a video: pictures, words, sound, music, motion.','Compare a printed ad and a video ad for the same product. Which is more convincing? Why?'],
 create_mm:['With your group, plan a short slide show about your barangay. List the pictures, text and sound you will use.','Make a storyboard for a 30-second video about road safety.','Create a short animation plan (drawings in frames) showing how a seed grows.'],
 survey:['Make an online survey form with three questions about your classmates\' favorite fruits.','Plan a survey about how your classmates go to school. Write the questions and answer choices.','Make a survey form for a school event. Include a title, instructions and four questions.'],
 sentences:['Say five simple sentences about yourself and your family.','Write three simple sentences about your school.','Use these words in simple sentences: river, market, festival.'],
 words_use:['Use five sight words or high-frequency words in your own sentences.','Write a sentence using a math word (sum, difference, equal) and a science word (plant, water, sun).','Make a word wall of five content words you learned this week.']
};
const TKRUB={fluency:'read',intonation:'read',legible:'write',polite:'speak',retell:'speak',express:'speak',react:'write',react_topic:'write',summary:'write',tt_procedure:'write',tt_description:'write',tt_explanation:'write',tt_narrative:'write',tt_recount:'write',tt_news:'write',tt_persuasive:'write',letter:'write',ibc:'write',relevant:'write',evidence:'write',nonverbal:'nonverbal',viewing:'view',create_visual:'create',multimedia:'view',create_mm:'create',survey:'create',sentences:'speak',words_use:'write'};
SK.e_task={instr:'Do the task. Your teacher will use the rubric.',fam:'e_task',f:[],work:true,ordered:true,task:true,
  pool:(L,c)=>{const P=TK[c.kind]||[];return P.map(q=>({q,a:'Teacher-scored with the rubric.'}))},
  g:(r,L,c)=>{const P=TK[c.kind]||['Task'];return{q:pick(r,P),a:'Teacher-scored with the rubric.'}},
  t:p=>p.q,a:p=>W(p.a),rubric:c=>({title:{read:'Reading aloud',write:'Writing',speak:'Speaking',nonverbal:'Non-verbal communication',view:'Viewing',create:'Creating'}[TKRUB[c.kind]],rows:RUB[TKRUB[c.kind]]})};
/* lesson-plan families for English */
Object.assign(FAMINFO,{
 e_read:{key:'What happened in the text, and how do you know?',materials:'Copies of the reading text (on the worksheet), chart paper, worksheet',
  motivation:['Show the title of the text. Ask: "What do you think this text will be about?" Write predictions on the board.','Ask learners about a similar experience (a lost toy, a storm, a trip) before reading.'],
  model:'Read the text aloud while learners follow. Stop at key parts and think aloud about how you find the answer in the text.',
  guided:['Pairs read the text again and underline the parts that answer two questions.','Groups make a story map or outline of the text on chart paper and present it.'],
  rule:'Look back at the text to find evidence for your answer.',reteach:'Small group: read the text in short parts and answer one question after each part.',enrich:'Write a different ending or a short text of your own using the same skill.'},
 e_lit:{key:'What does the writer do with words, and why?',materials:'Sentence strips, short texts or poems, worksheet',
  motivation:['Read a short poem or ad aloud. Ask: "Which words caught your attention? Why?"','Show two sentences that say the same thing in different ways. Ask which one is more interesting.'],
  model:'Show one example. Point to the words that give the clue and explain your answer.',
  guided:['Pairs sort sentence strips into groups and explain their choices.','Groups find one example in a story or song (not copied) and share it.'],
  rule:'Look for the clue words that show the device, purpose or type.',reteach:'Small group: work with only two choices at a time.',enrich:'Write your own example and let a classmate identify it.'},
 e_grammar:{key:'Which form is correct here, and why?',materials:'Sentence strips, word cards, chart of rules, worksheet',
  motivation:['Show a sentence with a mistake. Ask: "What sounds wrong? How can we fix it?"','Play a quick game: learners stand up if the sentence is correct and sit down if it is not.'],
  model:'Show the rule with two examples on the board. Underline the words that change.',
  guided:['Pairs complete 3 sentences and check each other using the rule chart.','Groups build sentences from word cards and read them aloud.'],
  rule:'Check the subject and the time words, then choose the correct form.',reteach:'Small group: use simpler sentences and one rule at a time.',enrich:'Write a short paragraph using the grammar point at least four times.'},
 e_vocab:{key:'What does this word mean, and what helped you find out?',materials:'Word cards, dictionary or reference books, worksheet',
  motivation:['Show an unfamiliar word in a sentence. Ask learners to guess its meaning from the other words.','Play "word detective": find clues in a sentence that explain a hard word.'],
  model:'Think aloud: read the sentence, find the clue, and say the meaning in your own words.',
  guided:['Pairs find the meaning of 3 words using the clues and share their answers.','Groups make a word map (word, meaning, example, picture).'],
  rule:'Use the clues around the word (examples, opposites, commas, word parts) to find its meaning.',reteach:'Small group: use pictures and real objects with the words.',enrich:'Use three new words in sentences about your barangay.'},
 e_phonics:{key:'What sounds do you hear?',materials:'Word cards, letter tiles or cards, picture cards, worksheet',
  motivation:['Sing or chant a short rhyme. Ask learners to clap on the rhyming words.','Show picture cards and say the words slowly. Ask what sounds they hear.'],
  model:'Say the word slowly, tap each sound, then blend the sounds together.',
  guided:['Pairs sort word cards by pattern or rhyme.','Groups build new words with letter tiles by changing one sound.'],
  rule:'Listen to each sound and look at the letter pattern.',reteach:'Small group: work with two-sound and three-sound words using letter tiles.',enrich:'Make a list of 5 words with the same pattern and read them to a partner.'},
 e_task:{key:'How will you show what you learned?',materials:'Task cards, rubric, sample output, paper or props',
  motivation:['Show a sample of a good output (a letter, a short talk or a poster). Ask: "What makes it good?"','Act out a short situation and ask learners what they noticed.'],
  model:'Do part of the task in front of the class. Point to each rubric criterion as you go.',
  guided:['Groups practice the task and give each other feedback using the rubric.','Pairs plan the task together before doing it alone.'],
  rule:'Use the rubric to check your work before you finish.',reteach:'Small group: break the task into smaller steps with a model for each step.',enrich:'Do a more challenging version of the task or help a classmate.'}});
const LITK=['pov','onomatopoeia','alliteration','assonance','consonance','simile','metaphor','personification','hyperbole','irony','fantasy','factop3','purpose','texttype','propaganda'];
const VOCK=['ctx_ex','ctx_an','ctx_ap','ctx_gist','ctx_pun','reference','synant','vocab_env','vocab_nat','vocab_math','vocab_sci','sight'];
for(const k of EBK)SK['b_'+k].fam=LITK.includes(k)?'e_lit':VOCK.includes(k)?'e_vocab':'e_grammar';
['e_rhyme','e_onset','e_pattern'].forEach(k=>SK[k].fam='e_phonics');['e_root','e_prefix','e_suffix'].forEach(k=>SK[k].fam='e_vocab');
