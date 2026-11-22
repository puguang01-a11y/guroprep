# GuroPrep v3 prototype

This folder holds a working single-file prototype (`index.html`). The live pilot site in `dist/` is unchanged.

The prototype was built to try new features and content before the dev team moves them into the official site.

## What the prototype does

- **Three-step start.** The teacher picks a grade, a subject and a competency. The curriculum version is set from the grade.
- **Official competency lists.** Grades 1–6 Mathematics follow DepEd's Three-Term Budget of Work (SY 2026–2027). Competencies are listed by term and week, and the current week is highlighted.
- **English Grades 2–6, Term 3.** All 300 competencies come from `dist/grade*-curriculum.js`. 214 have ready worksheets (word study, grammar, vocabulary, figures of speech, and reading comprehension with original passages). 86 are speaking, writing or viewing tasks with task cards and a 4-point rubric. Grade 1 has no English subject under MATATAG; Language and Reading and Literacy are taught in the learners' first language.
- **Teacher feedback on every question.** Teachers can rate an item 👍 (good), 👎 (needs work) or ⚠ (answer is wrong), or use ✏️ to edit the question and answer. Edits flow into the answer key and the downloads. All item feedback exports as a CSV (`Download question feedback`) for the team to review.
- **ILAW lesson plan** (DepEd Order No. 016, s. 2026). Each section is editable, and "Redo" redrafts only one section.
- **Worksheets.** Each competency has Foundation, Core and Extension worksheets plus a 3-item exit ticket. Math answers are computed. When a teacher changes a number, the answer updates.
- **Downloads.** Worksheets, answer key and lesson plan as PDF (short, long or A4 paper, 1 or 2 copies per page), and one editable `.docx` with everything.
- **Pilot feedback.** Active prep time is measured automatically, and the feedback exports as CSV.

## Source files (for integration)

| File | Contents |
|---|---|
| `src/math/skills.js` | Question generators and answer checkers for all math skills (no DOM). |
| `src/math/competencies-g1-6.js` / `.json` | 306 official Grade 1–6 Math competencies (term, week, strand, text) mapped to a skill and its settings. `skill: null` means template only (drawings or hands-on work). |
| `src/math/lesson-families.js` | ILAW plan building blocks by topic: materials, motivation, modelling, group work, reteach, enrichment. |
| `src/english/generators.js` | English skills built by rules (verb tenses, subject-verb agreement, voice, adjective order, adverb degrees, compound and complex sentences, phonics, prefixes, suffixes, roots). |
| `src/english/item-banks.js` | Original item banks (point of view, sound devices, figures of speech, fact and opinion, author's purpose, text types, propaganda, context clues, references, complements, and more). |
| `src/english/passages.js` | Original reading passages for Grades 2–6, with questions tagged by skill and event lists for sequencing. |
| `src/english/tasks-and-lesson-families.js` | Task cards, rubrics, and ILAW plan blocks for English. |
| `src/english/competencies-g2-6-term3.js` / `.json` | 300 English Term 3 competencies mapped to a skill (`ready`, `task` or `template`). Rebuild with `node tools/build-english-map.js`. |
| `src/shared.js` | School-year helpers: curriculum by grade, subjects, term and week detection, and how lesson time is split across approaches. |

## Checks run

- English: 241,540 generated items. None was empty, every multiple-choice answer letter matched its option, and no worksheet repeated an item. A sample of every rule-built skill was also reviewed by hand, and the issues found were fixed (capitalization after time words, sentence parts by sentence type, adjective order, and ambiguous pronoun items).

- Every math competency was generated 150 times per level (1.15 million questions). None had an empty answer, an error or a warning.
- A separate check recomputed 143,797 answers by a different method (fractions, decimals, order of operations, rounding, division, geometry, time zones, probability). All of them matched.
- In a browser test, 72 lessons were prepared across Grades 1–6 and Terms 1–3, items were edited, and all files were downloaded, with no errors.
