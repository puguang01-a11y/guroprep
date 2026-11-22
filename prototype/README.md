# GuroPrep v3 prototype

This folder holds a working single-file prototype (`index.html`). The live pilot site in `dist/` is unchanged.

The prototype was built to try new features and content before the dev team moves them into the official site.

## What the prototype does

- **Three-step start.** The teacher picks a grade, a subject and a competency. The curriculum version is set from the grade.
- **Official competency lists.** Grades 1–6 Mathematics follow DepEd's Three-Term Budget of Work (SY 2026–2027). Competencies are listed by term and week, and the current week is highlighted.
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
| `src/shared.js` | School-year helpers: curriculum by grade, subjects, term and week detection, and how lesson time is split across approaches. |

## Checks run

- Every math competency was generated 150 times per level (1.15 million questions). None had an empty answer, an error or a warning.
- A separate check recomputed 143,797 answers by a different method (fractions, decimals, order of operations, rounding, division, geometry, time zones, probability). All of them matched.
- In a browser test, 72 lessons were prepared across Grades 1–6 and Terms 1–3, items were edited, and all files were downloaded, with no errors.
