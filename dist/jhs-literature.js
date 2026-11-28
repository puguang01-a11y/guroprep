/* GuroPrep · Grades 7–10 English literary texts.
   Original texts written for GuroPrep (stories, poems and a one-act scene), each with
   element-keyed questions (Foundation / Core / Extension), answer keys and a
   Character–Value Organizer. Literary-text competencies whose element has a matching
   text now print the text on the worksheet and use it in the lesson plan. */
(function () {
  if (typeof PASS === 'undefined' || typeof SK === 'undefined' || typeof JENG_COMPS === 'undefined') return;

  const JLIT = [
  /* ---------------- Grade 7 ---------------- */
  {id:'j7s1', g:7, type:'story', title:`The Borrowed Calculator`,
   text:`Mara had never held a scientific calculator before Jomar lent her his. It was silver and heavy, with tiny buttons that clicked like rain on a tin roof. "Just for the quiz," Jomar said. "My father bought it in Cebu. Bring it back by lunch."

During the quiz, Mara solved every problem faster than ever. When the bell rang, she slipped the calculator into her bag and ran to the canteen with her friends. She forgot it was there until she sat down on her bag.

Crack.

She opened the zipper slowly. A thin line ran across the screen like a river on a map. The numbers flickered, then disappeared.

All afternoon, Mara kept her hand on her bag. "Maybe nobody will know," she told herself. "Maybe it was already broken." But she remembered the way Jomar had wiped the screen with his sleeve before handing it to her.

At home, Lola Iska was sorting malunggay leaves on the table. "You are quiet today," she said. "Quiet like a pot before it boils."

Mara said nothing. She looked at her savings in the old coffee jar: one hundred eighty pesos, saved for the school fair.

That night she could not sleep. She thought of two Maras. One kept the secret and enjoyed the fair. The other told the truth and lost her savings. The first Mara was comfortable. The second Mara could look Jomar in the eye.

The next morning she found Jomar by the flagpole. She held out the calculator with both hands. "I broke it," she said. "I sat on it. I'm sorry. I can give you this now, and the rest little by little." She held out the coffee jar.

Jomar stared at the screen for a long time. Then he pushed the jar back toward her. "My father will be angry," he said. "But he will be angrier if he finds out someone lied to me." He paused. "Help me explain it to him. That's enough."

After school, they walked together to Jomar's house. Mara's legs felt heavy, but her chest felt light, as if she had finally set down a sack of rice she had carried all day.

Lola Iska only smiled when Mara told her. "The truth is heavy to carry," she said, "but it is lighter than a lie."`,
   org:{c:`Mara`, a:`Admits to Jomar that she broke his calculator and offers her savings`, v:`Honesty and responsibility`, s:`Mainly individual, but it also protects trust between friends (communal)`, e:`"I broke it," she said. "I sat on it. I'm sorry."`},
   qs:[
    {t:'conflict',L:'F',q:`What is Mara's main problem in the story?`,ok:`She must decide whether to hide or admit that she broke the calculator.`,no:[`She cannot answer the math quiz.`,`She argues with Lola Iska about money.`,`She gets lost on the way to Jomar's house.`]},
    {t:'conflict',L:'C',q:`What type of conflict does Mara face on the night she cannot sleep? Explain using details from the text.`,a:`Character vs. self. She struggles inside between keeping the secret (and her savings) and telling the truth. She imagines "two Maras."`},
    {t:'conflict',L:'E',q:`Besides character vs. self, what other conflict could happen in the story? What value helps resolve it?`,a:`Character vs. character: Jomar (and his father) could be angry with Mara. Honesty and her offer to pay for the damage resolve it; Jomar accepts her apology and asks only for help explaining.`},
    {t:'character',L:'F',q:`Who is the protagonist (main character) of the story?`,ok:`Mara`,no:[`Jomar`,`Lola Iska`,`Jomar's father`]},
    {t:'character',L:'C',q:`What important decision does Mara make, and what value does it show?`,a:`She decides to tell Jomar the truth and offer her savings. It shows honesty and responsibility.`},
    {t:'character',L:'E',q:`Is the value Mara shows individual or communal? Explain with evidence from the text.`,a:`Mainly individual (personal honesty and responsibility), but it also keeps trust between people. Jomar says his father "will be angrier if he finds out someone lied to me."`},
    {t:'characterization',L:'F',q:`Lola Iska says Mara is "quiet like a pot before it boils." What does this show about Mara?`,ok:`She is troubled and holding in strong feelings.`,no:[`She is sleepy.`,`She is hungry.`,`She is excited about the fair.`]},
    {t:'characterization',L:'C',q:`Is Mara a static or a dynamic character? Give evidence.`,a:`Dynamic. At first she hopes "nobody will know," but she changes and tells the truth. At the end, "her chest felt light."`},
    {t:'characterization',L:'C',q:`Give one example of indirect characterization of Jomar and tell what it shows about him.`,a:`He wiped the screen with his sleeve before lending it, so he takes care of his things. OR He pushed the jar back, so he is forgiving and generous.`},
    {t:'plot',L:'F',q:`Number the events in the order they happened: (a) Mara tells Jomar the truth. (b) Mara sits on her bag. (c) Jomar lends Mara his calculator. (d) Mara cannot sleep.`,a:`(c), (b), (d), (a)`},
    {t:'plot',L:'C',q:`What is the climax (turning point) of the story?`,a:`When Mara holds out the calculator and the coffee jar at the flagpole and says, "I broke it."`},
    {t:'plot',L:'E',q:`Is the story told in linear order or with a flashback? Explain with evidence.`,a:`Mostly linear: events go from the quiz to the next day in order. Mara only briefly remembers Jomar wiping the screen; it is a short memory, not a full flashback scene.`},
    {t:'tone',L:'F',q:`What is the mood when Mara hears "Crack" and looks at the screen?`,ok:`worried and tense`,no:[`funny and playful`,`calm and peaceful`,`proud and excited`]},
    {t:'tone',L:'C',q:`How does the mood change from the night Mara cannot sleep to her walk to Jomar's house? Quote words that show the change.`,a:`It changes from anxious ("she could not sleep") to relieved ("her chest felt light").`},
    {t:'figures',L:'F',q:`"A thin line ran across the screen like a river on a map" is an example of ____.`,ok:`simile`,no:[`metaphor`,`personification`,`hyperbole`]},
    {t:'figures',L:'C',q:`Find the onomatopoeia in the story. What is its effect?`,a:`"Crack." Readers can hear the moment the calculator breaks, which makes the scene sudden and dramatic.`},
    {t:'figures',L:'E',q:`Explain the simile "as if she had finally set down a sack of rice she had carried all day."`,a:`Guilt is compared to carrying a heavy sack. Telling the truth takes away the heavy feeling, so Mara feels relief.`},
    {t:'pov',L:'F',q:`From what point of view is the story told?`,ok:`third person, mostly following Mara`,no:[`first person (Mara says "I")`,`second person ("you")`,`third person, following only Jomar`]},
    {t:'pov',L:'C',q:`How does the point of view help readers understand Mara's conflict?`,a:`The narrator shares Mara's thoughts ("Maybe nobody will know"; the "two Maras"), so readers see her inner struggle.`},
    {t:'motifs',L:'C',q:`Which objects appear again and again in the story, and what do they stand for?`,a:`The calculator stands for trust and responsibility. The coffee jar of savings stands for what it costs to make things right.`},
    {t:'maxims',L:'C',q:`Lola Iska says, "The truth is heavy to carry, but it is lighter than a lie." Explain this saying in your own words.`,a:`Telling the truth can be hard at first, but keeping a lie is harder because the guilt stays with you.`},
    {t:'maxims',L:'E',q:`Describe a situation in school where Lola Iska's saying would apply. What would you do?`,a:`Sample answer: Losing a borrowed book or copying a classmate's work. Admit it, apologize and make up for it.`},
    {t:'diction',L:'C',q:`Why does the writer use the word "slipped" when Mara puts the calculator in her bag?`,a:`"Slipped" suggests a quick, careless movement. It shows she was not careful, which leads to the accident.`},
    {t:'unity',L:'C',q:`How does the title "The Borrowed Calculator" connect to the message of the story?`,a:`A borrowed thing carries someone's trust. The story is about keeping that trust by being honest when something goes wrong.`},
    {t:'style',L:'C',q:`Name one feature of the writer's style and give an example from the story.`,a:`Short sentences for impact ("Crack."), similes ("like a river on a map"), or everyday Filipino details (malunggay, savings in a coffee jar).`},
    {t:'sociocontext',L:'C',q:`What Filipino family value is shown through Lola Iska's role in the story?`,a:`Respect for elders and their wisdom: the lola notices Mara's feelings and guides her with a saying.`}
   ]},

  {id:'j7p1', g:7, type:'poem', title:`Market Morning`,
   text:`Before the sun can climb the chapel wall,
the market wakes to Manang Lita's call:
"Bangus! Fresh bangus!" Silver scales on ice
flash back at buyers asking for the price.

The tricycles go putt-putt down the lane,
the canvas roofs still drip with last night's rain;
the kalamansi glow like tiny suns
in baskets carried by the youngest ones.

My mother counts her coins with careful thumbs
and walks past stalls where speakers thump like drums.
She stops at Lolo Ben's, his table bare
except for eggplants, stacked with patient care.

"Why here?" I ask. "The big stall sells them cheap."
She says, "A suki is a friend to keep."
And as we leave, the morning, warm and wide,
walks slowly home with us, right by our side.`,
   org:{c:`The mother`, a:`Buys eggplants from Lolo Ben's small stall instead of the cheaper big stall`, v:`Loyalty and kindness to a regular vendor (suki)`, s:`Communal: it supports a small vendor in the community`, e:`"A suki is a friend to keep."`},
   qs:[
    {t:'rhyme',L:'F',q:`What is the rhyme scheme of each stanza?`,ok:`AABB`,no:[`ABAB`,`ABCB`,`AAAA`]},
    {t:'rhyme',L:'C',q:`Write two pairs of rhyming words from the poem.`,a:`Any two: wall/call, ice/price, lane/rain, suns/ones, thumbs/drums, bare/care, cheap/keep, wide/side.`},
    {t:'rhyme',L:'E',q:`Most lines have ten syllables with a da-DUM beat (iambic pentameter). Mark the stressed beats in "the market wakes to Manang Lita's call." How does the steady beat suit the poem?`,a:`the MAR-ket WAKES to MA-nang LI-ta's CALL (5 beats). The steady rhythm is like footsteps and the busy routine of a market morning.`},
    {t:'figures',L:'F',q:`"The kalamansi glow like tiny suns" is an example of ____.`,ok:`simile`,no:[`metaphor`,`onomatopoeia`,`hyperbole`]},
    {t:'figures',L:'F',q:`Which line has onomatopoeia?`,ok:`The tricycles go putt-putt down the lane`,no:[`My mother counts her coins with careful thumbs`,`She stops at Lolo Ben's, his table bare`,`Before the sun can climb the chapel wall`]},
    {t:'figures',L:'C',q:`Find two examples of personification. What do they do for the poem?`,a:`"the sun can climb the chapel wall," "the market wakes," "the morning ... walks slowly home with us." They make the place and the time feel alive and friendly.`},
    {t:'figures',L:'C',q:`Find one example of alliteration in the poem.`,a:`"counts her coins with careful thumbs" (repeated k sound).`},
    {t:'tone',L:'C',q:`What is the mood of the poem? Quote two images that create it.`,a:`Warm, lively and caring: "glow like tiny suns," "the morning, warm and wide," "right by our side."`},
    {t:'diction',L:'C',q:`Why does the poet describe Lolo Ben's eggplants as "stacked with patient care"?`,a:`It shows Lolo Ben takes pride in his work even though his stall is small and nearly empty. Readers respect him.`},
    {t:'character',L:'C',q:`What value does the mother show by buying from Lolo Ben? Is it individual or communal?`,a:`Loyalty and kindness (care for a regular vendor). It is communal because it supports a small seller in the community.`},
    {t:'sociocontext',L:'C',q:`What Filipino market custom is shown by the word "suki"?`,a:`A suki is a regular buyer–seller relationship built on trust and loyalty. Buyers keep returning to the same vendor.`},
    {t:'maxims',L:'C',q:`Explain the line "A suki is a friend to keep."`,a:`A good relationship with a vendor is worth more than a lower price; loyalty and friendship matter.`},
    {t:'unity',L:'E',q:`How does the last stanza bring the whole poem together?`,a:`It answers the question "Why here?" and gives the message (loyalty and kindness). The morning walking home with them ends the market trip warmly.`},
    {t:'motifs',L:'C',q:`Images of light appear several times (the sun, silver scales, glowing kalamansi). What do they suggest?`,a:`They suggest warmth, hope and a fresh new day.`}
   ]},

  /* ---------------- Grade 8 ---------------- */
  {id:'j8s1', g:8, type:'story', title:`Water for Sitio Malinao`,
   text:`The last drop fell from our faucet on a Tuesday in April. I remember because Tatay was holding his coffee cup under it, waiting, the way you wait for a jeepney that is not coming.

"That's it," he said. "The spring is dry."

Here in Sitio Malinao, we have always gotten our water from the spring on the hill. When I was seven, Tatay carried me there on his shoulders. The water came out of the rocks so cold that it hurt my teeth, and he laughed and said, "This is our gift from the mountain. We take care of it, and it takes care of us." Back then, the hill was green with trees. Now, from our window, I can see the brown patches where the trees were cut for charcoal.

For two weeks, the women of the sitio walked two kilometers to the river with plastic containers. The children carried the small ones. My sister Lyn, who is only nine, carried hers on her head and never complained, though her neck turned red.

Tatay wrote a letter to the barangay asking for a water tank. Nobody answered. He wrote again. Still nothing. "They will come during election time," Mang Rudy said, and everyone laughed, but it was not a happy laugh.

So Tatay called a meeting under the acacia tree. "We cannot wait for others," he said. "If the mountain stopped giving, it is because we stopped giving back."

That Saturday, thirty of us climbed the hill with seedlings from the school nursery. We planted narra, mahogany and bamboo along the dry creek. Some of the older men dug a small catch basin near the spring to hold rainwater. My hands blistered. Lyn sang the whole time.

The rains came in June. The spring did not return right away; it took almost a year. But the catch basin filled, and we shared it by turns, family by family, written on a schedule nailed to the acacia tree.

Now, when I hold my cup under the faucet, I think of the hill. This water is not only from the mountain. It is also from thirty pairs of hands.`,
   org:{c:`Tatay`, a:`Organizes the sitio to replant the hill and build a catch basin after the barangay ignores his letters`, v:`Bayanihan (cooperation), responsibility and care for the environment`, s:`Communal`, e:`"We cannot wait for others." / "If the mountain stopped giving, it is because we stopped giving back."`},
   qs:[
    {t:'conflict',L:'F',q:`What is the main problem in the story?`,ok:`The sitio's spring dries up, and people have no water.`,no:[`Lyn is too young to carry water.`,`Mang Rudy wants to be barangay captain.`,`The school nursery has no seedlings.`]},
    {t:'conflict',L:'C',q:`Identify two types of conflict in the story. Give evidence for each.`,a:`Character vs. nature: the spring dries up after trees are cut and the dry season comes. Character vs. society: the barangay does not answer Tatay's letters.`},
    {t:'conflict',L:'E',q:`How do the people resolve the conflict, and what value does the resolution show?`,a:`They replant the hill, build a catch basin and share the water on a schedule. It shows bayanihan (cooperation) and care for the environment, a communal value.`},
    {t:'character',L:'F',q:`Who leads the community in solving the problem?`,ok:`Tatay`,no:[`Mang Rudy`,`Lyn`,`the barangay captain`]},
    {t:'character',L:'C',q:`What decision does Tatay make after his letters are ignored, and what does it show about him?`,a:`He calls a meeting and organizes the tree planting and catch basin. It shows initiative, leadership and responsibility.`},
    {t:'characterization',L:'C',q:`How does the writer show Lyn's character without describing her directly? Give evidence.`,a:`Through her actions: she carries water on her head and "never complained, though her neck turned red," and she "sang the whole time" while planting. She is strong, patient and cheerful.`},
    {t:'plot',L:'F',q:`Which part of the story is a flashback?`,ok:`When the narrator remembers being carried to the spring at age seven`,no:[`When Tatay writes the letters`,`When the rains come in June`,`When thirty people climb the hill`]},
    {t:'plot',L:'C',q:`Why does the writer include the flashback about the narrator at age seven?`,a:`It shows how green and generous the hill used to be and introduces Tatay's belief, "We take care of it, and it takes care of us." This explains why the spring dried up and prepares the theme.`},
    {t:'plot',L:'E',q:`The story follows two lines of action: waiting for the barangay and acting on their own. How do these parallel lines support the message?`,a:`Waiting brings no result (the letters are ignored), while acting together brings the water back. The contrast shows that cooperation and self-help work.`},
    {t:'deictic',L:'F',q:`In "Here in Sitio Malinao," the word "here" points to ____.`,ok:`the place where the narrator lives`,no:[`the river`,`the barangay hall`,`the reader's own town`]},
    {t:'deictic',L:'C',q:`Who is the speaker, and when is he telling the story? Use clue words from the text.`,a:`Lyn's older brother, a young person from the sitio. He tells it "now," after the events, looking back ("I remember").`},
    {t:'deictic',L:'C',q:`In the last paragraph, what does "This water" refer to? Why does the narrator say it is "from thirty pairs of hands"?`,a:`The water from their faucet now. The community's work (planting trees and building the catch basin) helped bring it back.`},
    {t:'pov',L:'F',q:`From what point of view is the story told?`,ok:`first person`,no:[`second person`,`third person omniscient`,`third person, following Tatay only`]},
    {t:'pov',L:'C',q:`How would the story be different if the barangay captain told it?`,a:`Sample answer: We might learn why the letters were not answered, but we would lose the narrator's feelings about the hardship and the community's hard work.`},
    {t:'figures',L:'F',q:`"the way you wait for a jeepney that is not coming" is a comparison called a ____.`,ok:`simile`,no:[`metaphor`,`personification`,`onomatopoeia`]},
    {t:'figures',L:'C',q:`Explain the personification in "If the mountain stopped giving, it is because we stopped giving back."`,a:`The mountain is treated like a person who gives gifts. It means nature keeps giving only if people take care of it.`},
    {t:'tone',L:'C',q:`What is the tone of Mang Rudy's line "They will come during election time," and of the laugh that follows?`,a:`Sarcastic and bitter. "It was not a happy laugh" shows the people's frustration with officials.`},
    {t:'motifs',L:'C',q:`What image is repeated at the beginning and end of the story? How has its meaning changed?`,a:`Holding a cup under the faucet. At first it shows hopeless waiting; at the end it shows gratitude for shared work.`},
    {t:'diction',L:'C',q:`Why does Tatay call the spring "our gift from the mountain"?`,a:`"Gift" shows the water is something precious given freely, so people should be thankful and take care of it.`},
    {t:'sociocontext',L:'C',q:`What real issues in many Philippine communities does the story reflect?`,a:`Water shortage, cutting trees for charcoal, slow government response, and the tradition of bayanihan.`},
    {t:'unity',L:'E',q:`How do the first and last paragraphs work together to make the story feel complete?`,a:`Both show a cup under the faucet. The story begins with the last drop and ends with water flowing again, now with a new meaning.`},
    {t:'maxims',L:'C',q:`Explain Tatay's saying "We take care of it, and it takes care of us." Give an example from your community.`,a:`If we protect nature, nature provides for us. Sample: planting trees keeps springs flowing and prevents floods.`}
   ]},

  {id:'j8p1', g:8, type:'poem', title:`My Father's Hands`,
   text:`My father's hands are maps of every road
he walked to work before the roosters woke;
each scar a town, each callus is a load
he carried home, and of it never spoke.

They're rough as husk, and yet they softly hold
my sleeping sister like a cup of rice;
they mend the roof against the rain and cold
and never ask if work is worth the price.

Tonight they rest upon the table, still,
two quiet boats pulled up along the shore.
I take them in my own and feel the will
that built this house, this table and this floor.

Someday my hands will crack and harden too,
and someone small will trace them, bone by bone,
and read the roads that I have traveled through,
and learn that love is done, not only shown.`,
   org:{c:`The father`, a:`Works hard every day, mends the roof and cares for his children without complaining`, v:`Hard work, sacrifice and quiet love for family`, s:`Communal (family)`, e:`"each callus is a load / he carried home, and of it never spoke."`},
   qs:[
    {t:'rhyme',L:'F',q:`What is the rhyme scheme of each stanza?`,ok:`ABAB`,no:[`AABB`,`ABBA`,`AAAA`]},
    {t:'rhyme',L:'C',q:`Which words rhyme in the third stanza?`,a:`still / will and shore / floor.`},
    {t:'figures',L:'F',q:`"My father's hands are maps of every road" is an example of ____.`,ok:`metaphor`,no:[`simile`,`onomatopoeia`,`hyperbole`]},
    {t:'figures',L:'C',q:`Explain the metaphor "two quiet boats pulled up along the shore."`,a:`The resting hands are compared to boats brought to shore after a day at sea: the work is done and they are tired and still.`},
    {t:'figures',L:'C',q:`"They're rough as husk" — what figure of speech is this, and what does it show?`,a:`A simile. It shows the father's hands are hard and rough from years of manual work.`},
    {t:'deictic',L:'F',q:`Who is the speaker of the poem?`,ok:`the father's child`,no:[`the father`,`the mother`,`the baby sister`]},
    {t:'deictic',L:'C',q:`What do "Tonight" and "this house" tell you about the time, place and situation of the poem?`,a:`It is evening now, at the family's home. The speaker watches the father resting at the table after work.`},
    {t:'tone',L:'C',q:`What is the speaker's tone toward the father? Quote a line that shows it.`,a:`Admiring, grateful and tender: "I take them in my own and feel the will / that built this house."`},
    {t:'diction',L:'C',q:`Why does the poet use the words "scar" and "callus" instead of only saying "hands"?`,a:`These words show the marks of hard work and pain, so readers see the father's sacrifice.`},
    {t:'motifs',L:'C',q:`The words "maps" and "road" appear at the start and "roads" at the end. What do they suggest?`,a:`Life as a journey of work. The speaker will one day follow the father's path.`},
    {t:'character',L:'C',q:`What value does the father show? Is it individual or communal?`,a:`Hard work and sacrifice for family. It is communal (for the family) because his work supports the household.`},
    {t:'maxims',L:'E',q:`Explain "love is done, not only shown." Relate it to someone in your family.`,a:`Love is proven by actions, not only by words. Sample: a parent who wakes early to cook or work for the family.`},
    {t:'unity',L:'E',q:`How does the last stanza connect the father's past to the speaker's future?`,a:`The speaker imagines having the same worn hands and passing on the lesson to a child, so the father's love continues.`},
    {t:'style',L:'C',q:`Name one feature of the poet's style.`,a:`Extended metaphor (hands as maps and roads), concrete images (husk, cup of rice, boats), regular rhyme and rhythm.`}
   ]},

  /* ---------------- Grade 9 ---------------- */
  {id:'j9s1', g:9, type:'story', title:`The Rice Ledger`,
   text:`When Lola Caring died, she left me a notebook with a cracked brown cover. Inside, in pencil that had faded to the color of smoke, were names and numbers: Pedring — 2 gatang. Aling Sion — 1 gatang. The Sy family — 3 gatang.

"A ledger," my mother said. "From the war."

I was fifteen and had only read about the war in our Araling Panlipunan book: dates, battles, the march from Bataan. The notebook did not have battles. It had rice.

In 1944, Lola was nineteen. Her family owned a small rice field in Pampanga. Soldiers came every month to take most of the harvest, and families who had no fields were starving. Lola's father hid a few sacks under the floor of the granary. Every night, after the curfew bell, Lola lifted the floorboards and measured rice into cloth bags by the light of a single candle.

She wrote down every gatang. Not to collect payment, my mother explained, but so that no one would be forgotten. "Hunger makes people suspicious," Lola once told her. "If everyone can see the list, everyone knows it is fair."

One night, a soldier saw the light. Lola blew out the candle and lay flat on the floor beside the sacks. She heard boots on the ladder. She heard him breathing. Then she heard a voice from the yard: her neighbor Pedring, shouting that a carabao had broken loose. The boots went down. Pedring had seen the soldier and made up the carabao.

The next morning, Lola gave Pedring an extra gatang. In the ledger, beside his name, she wrote only one word: Salamat.

I asked my mother why Lola never talked about the war. My mother was quiet for a while. "Some memories are too heavy to say out loud," she said. "So she wrote them as numbers."

Now the notebook sits on my desk. When I open it, I no longer see numbers. I see a candle in the dark, a girl holding her breath, a neighbor shouting into the night. I see a village that decided, together, that no one would starve alone.

On the last page, Lola had written a line that was not a number at all: "Ang bigas ay hindi akin. Ipinagkatiwala lang." The rice is not mine. It was only entrusted to me.`,
   org:{c:`Lola Caring`, a:`Secretly shares hidden rice with hungry families every night and records every share`, v:`Courage, fairness and generosity (bayanihan)`, s:`Communal`, e:`"If everyone can see the list, everyone knows it is fair."`},
   qs:[
    {t:'histcontext',L:'F',q:`In what historical period does Lola's story take place?`,ok:`the Japanese occupation during World War II`,no:[`the Spanish colonial period`,`Martial Law in the 1970s`,`the American colonial period`]},
    {t:'histcontext',L:'C',q:`How does the historical setting explain why Lola hid the rice and kept a ledger?`,a:`Soldiers took most of the harvest and families without fields were starving. Hiding rice and recording fair shares helped neighbors survive and kept trust among them.`},
    {t:'histcontext',L:'E',q:`How is the war in the notebook different from the war in the narrator's textbook? Why does this difference matter?`,a:`The textbook has dates and battles; the notebook shows ordinary people's courage and hunger. It shows that history also lives in everyday acts of kindness.`},
    {t:'sociocontext',L:'C',q:`What Filipino community value does the ledger show? Is it individual or communal?`,a:`Bayanihan and malasakit: sharing so that "no one would starve alone." It is communal.`},
    {t:'psychcontext',L:'C',q:`Why did Lola write her memories "as numbers" instead of talking about them?`,a:`The memories were painful ("too heavy to say out loud"). Numbers let her keep a record without reliving the fear.`},
    {t:'psychcontext',L:'E',q:`What does Lola's silence about the war suggest about how people cope with frightening experiences?`,a:`People may deal with trauma through silence or indirect ways, such as writing, routines or objects, rather than talking.`},
    {t:'character',L:'F',q:`Who saves Lola from being discovered by the soldier?`,ok:`Pedring`,no:[`Aling Sion`,`Lola's father`,`the narrator's mother`]},
    {t:'character',L:'C',q:`What decision does Lola make every night, and what value does it show?`,a:`She risks her safety to measure and give rice to hungry families. It shows courage, generosity and fairness.`},
    {t:'characterization',L:'C',q:`What does Pedring's made-up story about the carabao reveal about him?`,a:`He is quick-thinking, brave and loyal. He puts himself in danger to protect Lola.`},
    {t:'conflict',L:'C',q:`Identify the main conflict in Lola's story and name its type.`,a:`Character vs. society: the villagers against the soldiers who take their harvest (and against hunger). Lola also faces danger when the soldier climbs the ladder.`},
    {t:'plot',L:'F',q:`Lola's story from 1944 is presented as ____.`,ok:`a flashback within the narrator's present-day story`,no:[`a parallel plot happening at the same time`,`a prediction of the future`,`a dream the narrator has`]},
    {t:'plot',L:'E',q:`The story has a frame: the present (the narrator with the notebook) and the past (Lola in 1944). How does this structure support the theme?`,a:`The narrator learns the meaning of the numbers as the reader does, so the past becomes a lesson for the present: history is kept alive by those who remember it.`},
    {t:'binary',L:'C',q:`Name two binary oppositions in the story. Explain one.`,a:`Light/darkness, hunger/sharing, fear/trust, silence/speech, soldiers/villagers. For example, the single candle in the dark stands for hope in a dangerous time.`},
    {t:'sign',L:'C',q:`The ledger is a sign. Beyond rice and numbers, what is its referent (what does it stand for)?`,a:`Trust, fairness and the community's courage: a record that "no one would be forgotten."`},
    {t:'sign',L:'E',q:`Why does Lola write "Salamat" beside Pedring's name instead of a number?`,a:`His help cannot be measured in rice. The word marks gratitude for saving her life, not a payment.`},
    {t:'cotext',L:'C',q:`What is a "gatang"? Use the co-text (the words around it) to explain how you know.`,a:`A unit for measuring rice. The text lists names with numbers of gatang and says Lola "measured rice into cloth bags."`},
    {t:'collocation',L:'F',q:`Complete the collocation from the story: "after the curfew ____."`,ok:`bell`,no:[`clock`,`flag`,`gate`]},
    {t:'collocation',L:'C',q:`Find two common English collocations in the story and give their meaning.`,a:`"holding her breath" (not breathing because of fear), "broken loose" (escaped), "out loud" (spoken so others can hear).`},
    {t:'figures',L:'C',q:`What does the image "pencil that had faded to the color of smoke" suggest?`,a:`The notebook is very old, and "smoke" reminds readers of war and of memories fading.`},
    {t:'tone',L:'C',q:`What is the mood in the scene with the soldier on the ladder? Which details create it?`,a:`Tense and fearful: she blows out the candle, lies flat, hears "boots on the ladder" and "him breathing."`},
    {t:'maxims',L:'C',q:`Explain "The rice is not mine. It was only entrusted to me."`,a:`What we have is given to us to take care of and share; we are caretakers (stewards), not only owners.`},
    {t:'pov',L:'C',q:`Who tells the story? How does this point of view affect what we know about Lola?`,a:`Lola's grandchild, in first person. We learn about Lola only through the notebook and the mother's memories, so some parts stay mysterious.`},
    {t:'unity',L:'E',q:`How does the line on the last page tie the whole story together?`,a:`It explains why Lola shared the rice and kept the ledger: she saw herself as a caretaker for the community. It turns the numbers into a message.`}
   ]},

  {id:'j9d1', g:9, type:'drama', title:`Overtime (a one-act scene)`,
   text:`CHARACTERS: JOY, 24, a call center agent · NANAY DELIA, 52, her mother · MIKO, 15, Joy's younger brother
SETTING: A small kitchen in a rented apartment in Quezon City, 7:00 a.m. A rice cooker steams on the counter. A wall clock ticks loudly. Outside: tricycles, and a neighbor's radio playing an old OPM love song.

(JOY enters wearing her office ID lanyard, eyes heavy. She drops her bag on a chair.)
NANAY DELIA: You're late again. Third time this week.
JOY: The client had a system outage. They asked us to stay.
NANAY DELIA: (setting down a plate of sinangag and egg) They ask, and you always say yes.
JOY: If I say no, someone else will say yes. And then someone else gets the promotion.
(MIKO enters, school uniform half-buttoned, holding a paper.)
MIKO: Ate, the field trip form. Five hundred. Due tomorrow.
(Silence. The clock ticks. JOY looks at the paper, then at her mother.)
JOY: I'll take another overtime shift.
NANAY DELIA: Joy. When did you last sleep more than four hours?
JOY: (laughing, but tired) Sleep is for people with savings, 'Nay.
NANAY DELIA: (softly) Your father said the same thing. Every day, the same thing. Until the day he did not wake up early anymore.
(JOY stops eating. Outside, the radio switches to a cheerful advertisement. Nobody laughs.)
MIKO: (folding the form) I don't have to go. It's just a museum.
JOY: No. You're going.
NANAY DELIA: Then I will pay half. I can take two more laundry customers.
JOY: 'Nay, your back—
NANAY DELIA: My back, your eyes. (She smiles.) We share. That is how this house stands.
(JOY looks at both of them. She types on her phone and puts it face down.)
MIKO: What did you write?
JOY: I told my team lead I can't do overtime tomorrow. (Pause.) I'm going to sleep. Wake me at two so I can help you with your math.
(MIKO grins. NANAY DELIA covers JOY's plate with another plate to keep it warm. The old love song returns on the neighbor's radio. Lights fade.)`,
   org:{c:`Joy`, a:`Decides to skip tomorrow's overtime so she can rest and help her brother`, v:`Caring for family and for one's own health; sharing responsibility`, s:`Both: individual (her health) and communal (her family)`, e:`"I told my team lead I can't do overtime tomorrow ... Wake me at two so I can help you with your math."`},
   qs:[
    {t:'drama',L:'F',q:`The words in parentheses, such as "(setting down a plate of sinangag and egg)," are called ____.`,ok:`stage directions`,no:[`dialogue`,`a monologue`,`the chorus`]},
    {t:'drama',L:'F',q:`Which part of the play tells the time and place of the action?`,ok:`the setting`,no:[`the list of characters`,`the last line of dialogue`,`the title`]},
    {t:'drama',L:'C',q:`How does the ticking clock add to the spectacle and mood of the scene?`,a:`It is heard in the silence after Miko asks for money. It builds tension and reminds the audience of time and of Joy's lack of sleep.`},
    {t:'drama',L:'C',q:`What is the effect of the neighbor's radio switching to a cheerful advertisement right after Nanay Delia mentions Joy's father?`,a:`The cheerful sound clashes with the sad moment (contrast), so the family's silence feels heavier.`},
    {t:'drama',L:'E',q:`Why does the playwright bring back the old love song at the end?`,a:`It frames the scene (it was playing at the start) and signals warmth and resolution: the family's love holds them together.`},
    {t:'drama',L:'C',q:`How does the dialogue show the family's money problems without stating them directly?`,a:`The 500-peso fee causes silence; Joy offers more overtime; Nanay takes more laundry customers; Joy says, "Sleep is for people with savings."`},
    {t:'conflict',L:'C',q:`What is Joy's conflict? Name its type or types.`,a:`Character vs. self (working more for money vs. resting for her health) and character vs. society (the pressure of long work hours and low income).`},
    {t:'character',L:'C',q:`What decision does Joy make at the end, and what value does it show?`,a:`She refuses tomorrow's overtime so she can sleep and help Miko. It shows she values her health and family time, and that the family shares burdens.`},
    {t:'characterization',L:'C',q:`What does Nanay Delia's line "My back, your eyes. We share." reveal about her?`,a:`She is loving and self-sacrificing; she wants everyone in the family to carry the burden together, not only Joy.`},
    {t:'tone',L:'C',q:`How does the mood change from the beginning to the end of the scene?`,a:`From tense and tired (late again, silence, the father's memory) to warm and hopeful (Miko grins, the plate kept warm, the love song).`},
    {t:'sociocontext',L:'C',q:`What real situation of many young Filipino workers does the play reflect?`,a:`Night-shift call center work, long overtime hours, and being a breadwinner who supports the family.`},
    {t:'psychcontext',L:'E',q:`Why does Joy stop eating when her mother mentions her father? What does this suggest about her feelings?`,a:`The memory hits her hard; she realizes she is repeating her father's pattern. It suggests fear and grief she has not talked about.`}
   ]},

  /* ---------------- Grade 10 ---------------- */
  {id:'j10s1', g:10, type:'story', title:`Signal Number Four`,
   text:`The water was already at Ana's knees when she heard the baby crying.

She had been carrying Lolo Andoy's medicines to the evacuation center at the elementary school, holding the plastic bag above her head like a torch. The wind pushed at her back as if it wanted her to hurry, then shoved her sideways as if it had changed its mind. Somewhere a sheet of galvanized iron screamed loose from a roof and went cartwheeling down the street.

The crying came from the Delgados' house. Ana knew the house: the one with the blue gate and the mango tree that dropped fruit into everyone's yard. She also knew that Mrs. Delgado had told everyone, two days ago, that they would not evacuate. "We survived Yolanda," she had said. "We can survive this."

Ana was a second-year nursing student. In class, they practiced on a plastic mannequin named Juan. Juan never cried. Juan never looked at you with a mother's eyes.

She pushed the blue gate open. Inside, Mrs. Delgado stood on a table with the baby, the water swirling around the table's legs. Her husband was working in Manila. "The ladder," Mrs. Delgado said. "The ladder floated away."

For a moment Ana stood still. She thought of her own mother, who had told her that morning, "Do not be a hero. Just come home." She thought of the medicines. She thought of how small she was against the wind.

Then she took off her backpack, tied Lolo Andoy's medicines high on the mango branch, and held out her arms.

They walked out together, Mrs. Delgado gripping Ana's shoulder, the baby wrapped in a raincoat between them. The water reached their waists. Ana counted her steps out loud to keep from thinking: isa, dalawa, tatlo. Mrs. Delgado began to count with her.

At the school, someone threw them a towel. Someone else handed them coffee. The baby stopped crying and fell asleep against Ana's chest, the way babies do when they decide that the world is safe again.

The next morning, when the sky was the pale gray of a washed pot, Ana went back for the medicines. The mango tree had lost half its branches, but the bag was still there, swinging gently, as if it had been waiting for her.

Lolo Andoy took his pills with a cup of warm water. "You were late," he said.

"I know, Lolo," Ana said. "I had to learn something first."`,
   org:{c:`Ana`, a:`Ties the medicines safely on a branch and rescues Mrs. Delgado and her baby from the flood`, v:`Courage, compassion and service to others`, s:`Communal (helping neighbors), with personal growth`, e:`"Then she took off her backpack, tied Lolo Andoy's medicines high on the mango branch, and held out her arms."`},
   qs:[
    {t:'plot',L:'F',q:`The story begins in the middle of the action ("The water was already at Ana's knees..."). This technique is called ____.`,ok:`in medias res`,no:[`flashback`,`foreshadowing`,`denouement`]},
    {t:'plot',L:'C',q:`After the opening, what background information does the writer give, and why?`,a:`That Ana was bringing Lolo Andoy's medicines to the evacuation center and that Mrs. Delgado refused to evacuate. This explains why Ana is outside and why the family is trapped.`},
    {t:'plot',L:'E',q:`Why might the writer choose to start in medias res instead of at the beginning of Ana's day?`,a:`It pulls readers straight into the danger and suspense; the background is given later only when it is needed.`},
    {t:'conflict',L:'F',q:`Which type of conflict is MOST clearly shown when the wind "shoved her sideways"?`,ok:`character vs. nature`,no:[`character vs. character`,`character vs. society`,`character vs. self`]},
    {t:'conflict',L:'C',q:`Find evidence of character vs. self in the story.`,a:`Ana "stood still," torn between her mother's words ("Do not be a hero. Just come home."), the medicines and her fear, before she decides to help.`},
    {t:'conflict',L:'E',q:`Mrs. Delgado's decision not to evacuate also causes conflict. What does it suggest about some people's attitude toward disasters?`,a:`Overconfidence after surviving past storms ("We survived Yolanda"). People sometimes underestimate warnings and put themselves at risk.`},
    {t:'character',L:'C',q:`What decision does Ana make, and what value does it show?`,a:`She keeps the medicines safe on the mango branch and rescues the mother and baby. It shows courage, compassion and service.`},
    {t:'character',L:'E',q:`Is Ana's value individual or communal? Explain with evidence.`,a:`Communal: she risks herself for her neighbors and walks them to the evacuation center. It is also personal growth: "I had to learn something first."`},
    {t:'characterization',L:'C',q:`Is Ana a static or a dynamic character? What does she "learn"?`,a:`Dynamic. She moves from practicing on a mannequin to caring for real people in danger. She learns that courage means acting even when afraid.`},
    {t:'figures',L:'C',q:`Find the personification of the wind. What is its effect?`,a:`"The wind pushed at her back as if it wanted her to hurry, then shoved her sideways as if it had changed its mind." It makes the wind seem like an unpredictable person and shows the danger.`},
    {t:'figures',L:'C',q:`"the sky was the pale gray of a washed pot" — what mood does this image create?`,a:`A tired, quiet calm after the storm, using an ordinary image from home.`},
    {t:'tone',L:'C',q:`How does the mood change from the beginning to the end? Quote words that show the change.`,a:`From tense and chaotic ("screamed loose," "cartwheeling") to calm and relieved ("fell asleep," "swinging gently").`},
    {t:'motifs',L:'C',q:`What role does counting ("isa, dalawa, tatlo") play in the story?`,a:`Ana counts to stay calm, and Mrs. Delgado joins her. It shows shared courage and moving forward one step at a time.`},
    {t:'sign',L:'C',q:`The medicines tied on the mango branch can be read as a sign. What could they stand for?`,a:`Ana's duty and promise to Lolo Andoy: she does not abandon one responsibility for another. They also suggest hope that waits after the storm.`},
    {t:'binary',L:'C',q:`Identify one binary opposition in the story and explain how the story uses it.`,a:`Practice vs. reality: the mannequin Juan "never cried," but the real baby does. Others: fear/courage, chaos/calm, staying/evacuating.`},
    {t:'cotext',L:'C',q:`Use the co-text to explain what "evacuation center" means in the story.`,a:`A safe place where people stay during a disaster. The text says it is at the elementary school, and people there give towels and coffee.`},
    {t:'collocation',L:'F',q:`Complete the collocation from the story: "a sheet of galvanized ____."`,ok:`iron`,no:[`paper`,`water`,`wood`]},
    {t:'psychcontext',L:'C',q:`Why does Ana count her steps out loud? What does this show about how people handle fear?`,a:`"To keep from thinking." Focusing on a simple task helps people stay calm in danger.`},
    {t:'style',L:'C',q:`Name two features of the writer's style.`,a:`A short, dramatic opening; vivid verbs ("screamed," "shoved," "cartwheeling"); Filipino words (isa, dalawa, tatlo; Lolo); a quiet, slightly humorous ending.`},
    {t:'unity',L:'E',q:`How does the ending with Lolo Andoy ("You were late") connect to the rest of the story?`,a:`It returns to Ana's first errand and shows what she gained: she was late because she chose to save lives, and she learned what courage means.`},
    {t:'sociocontext',L:'C',q:`What Philippine realities does the story reflect?`,a:`Strong typhoons and storm signals, schools used as evacuation centers, memories of Yolanda, and family members working far from home.`},
    {t:'maxims',L:'E',q:`Ana's mother says, "Do not be a hero. Just come home." Is this good advice? Explain using the story.`,a:`Sample answer: It is wise to stay safe, but helping others carefully is also right; Ana stays careful (she counts, keeps the medicines safe) while helping.`},
    {t:'pov',L:'F',q:`From what point of view is the story told?`,ok:`third person, following Ana`,no:[`first person`,`second person`,`third person, following Mrs. Delgado`]}
   ]},

  {id:'j10p1', g:10, type:'poem', title:`Balikbayan Box`,
   text:`It came in March, a cardboard house of tape,
my mother's name in marker, bold and wide;
inside, the smell of somewhere far, the shape
of all the years she'd spent across the tide.

There: chocolates, soap, a brand-new phone,
three shirts a size too large, "for when you grow,"
a jar of lotion, Lola's very own,
and towels folded neatly, row on row.

We emptied it in minutes, then we stood
around the empty box as by a grave.
My brother whispered, "It smells like her," and could
not finish. So we kept the box, to save

the smell, the tape, the letters of her name.
Each year another box comes home to stay;
each year we lift the lid and feel the same:
the box comes home. Our mother stays away.`,
   org:{c:`The mother (an OFW)`, a:`Works abroad and sends a balikbayan box for the family`, v:`Sacrifice and love for family`, s:`Communal (family)`, e:`"three shirts a size too large, 'for when you grow'"`},
   qs:[
    {t:'sign',L:'F',q:`In the poem, the balikbayan box is a sign. Its referent (what it stands for) is MOST likely ____.`,ok:`the mother's love and her absence`,no:[`the family's wealth`,`the shipping company`,`the brother's schoolbooks`]},
    {t:'sign',L:'C',q:`Explain how the meaning of the box changes from the first stanza to the last.`,a:`At first it is a package of gifts ("a cardboard house of tape"). By the end it stands for the mother herself: it comes home in her place and reminds them that she stays away.`},
    {t:'binary',L:'C',q:`Identify two binary oppositions in the poem.`,a:`Home/away, presence/absence, full/empty, gifts/mother.`},
    {t:'binary',L:'E',q:`How does the last line use binary opposition to express the poem's message?`,a:`"The box comes home. Our mother stays away." The thing returns but the person does not; gifts cannot replace a parent's presence.`},
    {t:'rhyme',L:'F',q:`What is the rhyme scheme of each stanza?`,ok:`ABAB`,no:[`AABB`,`ABCB`,`ABBA`]},
    {t:'rhyme',L:'C',q:`The poem runs from stanza 3 into stanza 4 without a stop ("to save / the smell..."). Why might the poet do this?`,a:`This enjambment makes the reader keep going without a pause, like the family holding on to the smell. It links the brother's grief to what they keep.`},
    {t:'figures',L:'F',q:`"a cardboard house of tape" is an example of ____.`,ok:`metaphor`,no:[`simile`,`onomatopoeia`,`personification`]},
    {t:'figures',L:'C',q:`"around the empty box as by a grave" — what is compared, and what feeling does it show?`,a:`The family standing around the empty box is compared to mourners at a grave. It shows grief and loss because the mother is absent.`},
    {t:'tone',L:'C',q:`What is the tone of the poem? Quote two lines that show it.`,a:`Bittersweet and longing: "It smells like her," "the box comes home. Our mother stays away."`},
    {t:'diction',L:'C',q:`Why does the poet include "three shirts a size too large, 'for when you grow'"?`,a:`The mother buys for a future she may not see up close; she does not know their size now. It shows the distance between them and her hope for them.`},
    {t:'motifs',L:'C',q:`The sense of smell is repeated in the poem. Why is it important?`,a:`"the smell of somewhere far," "It smells like her," "to save / the smell." Smell is the closest thing the children have to their mother's presence.`},
    {t:'sociocontext',L:'C',q:`What Filipino experience does the poem reflect?`,a:`Parents working abroad as OFWs, the balikbayan box tradition, and children growing up with relatives such as Lola.`},
    {t:'psychcontext',L:'E',q:`Why can't the brother finish his sentence? What does this suggest about how some children of OFWs feel?`,a:`He is overcome with emotion. It suggests that children may miss their parent deeply even when they receive gifts.`},
    {t:'character',L:'C',q:`What value do the mother's actions show? Is it individual or communal?`,a:`Sacrifice and love for family. It is communal (for the family): she works far away to provide for them.`},
    {t:'unity',L:'E',q:`How do the first and last stanzas mirror each other?`,a:`Both describe the box arriving with her name on it, but the ending reveals the painful truth: every year the box comes, and the mother does not.`}
   ]}
  ];

  const LITKEYS = new Set(['conflict','character','characterization','plot','rhyme','diction','tone','style','motifs','figures','pov','unity','maxims','deictic','drama','sign','binary','cotext','collocation','histcontext','sociocontext','psychcontext']);
  const ORG_LABEL = 'Character–Value Organizer';

  JLIT.forEach(t => PASS.push({id:t.id, g:t.g, type:t.type, title:t.title, text:t.text, events:[], qs:t.qs, org:t.org, jhs:true}));
  window.JLIT = JLIT;

  function jlitFor(g, key) {
    const has = t => t.qs.some(q => q.t === key);
    const same = JLIT.filter(t => t.g === g && has(t));
    if (same.length) return same[0];
    const near = JLIT.filter(has).sort((a, b) => Math.abs(a.g - g) - Math.abs(b.g - g) || b.g - a.g);
    return near[0] || null;
  }
  window.jlitFor = jlitFor;

  function orgItem(T, L) {
    const o = T.org;
    if (!o) return null;
    const blank = '________________';
    const pre = L === 'F';
    const q = `Complete the ${ORG_LABEL} for "${T.title}".\nCharacter: ${pre ? o.c : blank}\nAction or decision: ${blank}\nValue shown: ${blank}\nIndividual or communal? ${blank}\nEvidence from the text (quote): ${blank}`;
    const a = `Character: ${o.c}. Action or decision: ${o.a}. Value shown: ${o.v}. Individual or communal: ${o.s}. Evidence: ${o.e}`;
    return {pid:T.id, q, a};
  }

  const LV = {F:['F'], C:['C','F'], E:['E','C']};
  SK.je_lit_pass = {
    instr:'Read the text. Then answer the questions.',
    fam:'je_lit', f:[], ordered:true,
    pool:(L, c) => {
      const T = PASS.find(p => p.id === c.pid);
      if (!T) return SK.je_bank.pool(L, c);
      const lv = LV[L];
      const withPid = q => Object.assign({pid:T.id}, q);
      const focus = T.qs.filter(q => q.t === c.key && lv.includes(q.L));
      const focusAll = T.qs.filter(q => q.t === c.key);
      const main = (focus.length ? focus : focusAll).map(withPid);
      const others = T.qs.filter(q => q.t !== c.key && lv.includes(q.L)).slice(0, 3).map(withPid);
      const org = orgItem(T, L);
      const bank = (SK.je_bank.pool(L, c) || []).map(withPid);
      return [...main, ...others, ...(org ? [org] : []), ...bank];
    },
    g:(r, L, c) => toItem(r, pick(r, SK.je_lit_pass.pool(L, c))),
    t:p => p.q, a:p => W(p.a)
  };

  let linked = 0;
  for (const c of JENG_COMPS) {
    if (c.fam !== 'je_lit' || c.sk !== 'je_bank' || !c.cfg || !LITKEYS.has(c.cfg.key)) continue;
    const T = jlitFor(c.g, c.cfg.key);
    if (!T) continue;
    c.cfg = Object.assign({}, c.cfg, {pid:T.id});
    c.sk = 'je_lit_pass';
    linked++;
  }
  window.JLIT_LINKED = linked;
})();
