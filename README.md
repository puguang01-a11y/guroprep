# GuroPrep

Teacher preparation workspace and curriculum library for Philippine schools.

## Deploy

Upload the contents of `dist/` to the website's document root, keeping all filenames together. Serve the directory over HTTPS. There is no build step.

- `index.html` is the lesson workspace and includes a Classroom tools link. Edit the current lesson plan, worksheet, or answer key in the on-page editor, then download an editable DOCX or PPTX (in addition to legacy RTF/PDF).
- `classroom-tools.html` includes weekly planning, differentiated practice, class rescheduling, editable Word documents, editable teacher/worksheet PPTX presentations and downloadable offline packs. Keep the full `dist/` directory structure, including `vendor/`. Single-lesson jsPDF export loads jsPDF from cdnjs.
- `office-export.js` is the browser-only DOCX/PPTX generator. Deploy it together with `vendor/jszip.min.js`; these exports do not require a backend or AI API. The exported Word paragraphs and PowerPoint text boxes are editable. Images, complex tables and custom school PPT themes are not included in this initial version.
- `prototype/`, `src/` and `tools/` retain the original v3 prototype, curriculum source and generation scripts. The current pilot deployment files are in `dist/`.

Current teacher pilot: https://guroprep-teacher-pilot.puguang.chatgpt.site/

## Lesson workspace v4 (teacher pilot feedback, Nov 2026)

`index.html` now prepares a complete lesson from the selected competency, so teachers no longer type each part:

- **Auto-filled, editable lesson.** Choosing a grade, learning area, term and competency fills in the title, three objectives (cognitive, psychomotor, affective), materials, a learning-resources list, every procedure step for the chosen approach (Explicit Teaching, 4A’s, 5E’s, Inquiry, or the early-grades sequence: warm-up and review, motivation, I do, We do, group or pair activity, You do, reflection) with minutes that add up to the lesson length, an assessment set (oral questions, formative checks, exit ticket, written task, performance task with rubric, success criteria) and ways forward. Fields the teacher has edited are never replaced without asking; **Refill suggestions from the competency** redrafts on request.
- **Worksheet with three activities.** Activity 1 (Try it), Activity 2 (Practice), Activity 3 (Challenge) and an exit ticket, with an answer key. Items are not repeated within a lesson.
- **Ready content for Mathematics, English and Science, Grades 1–10 (2,109 competencies).** `lesson-engine.js` (built from `src/` with `python3 tools/build-lesson-engine.py`) supplies original items, passages, hands-on activities and lesson-family text, matched to each row of `gradeN-curriculum.js`. Other learning areas get complete general activities (in Filipino for Filipino, Makabansa, GMRC, Araling Panlipunan and Values Education) plus any existing activity pack for that competency, with a note to add textbook items.
- **Formatted view.** The Lesson plan, Worksheet and Answer key tabs open in a formatted view (ILAW sections, timed steps, activity headings, clickable links). **Edit text** switches to the plain editor. Print, PDF and DOCX use the same headings.
- **Simpler form.** Removed Practice level, Load activity and Week pacing. Added a lesson-duration choice and more Materials source options (GuroPrep ready lesson, school textbook or module, DepEd exemplar or activity sheet, SLM/ADM, own notes). Backup import no longer filters the file picker, so `.json` backups show on Android and Windows.
- Files: `lesson-engine.js`, `lesson-builder.js` (`window.GuroLesson`), `workspace-auto.js`; updated `index.html`, `pdf-export.js`, `office-export.js`. No backend or AI service is required.

Checks: all 2,109 Mathematics/English/Science competencies built with all five approaches and four lesson lengths (10,545 builds) — every lesson has the full ILAW structure, minutes add up, and no item repeats within a lesson (97 small-pool competencies get one or two activities instead of repeating items). In the browser, 1,404 sampled lessons across Grades 1–12 and every learning area and term prepared with no errors; PDF, DOCX, PPTX, RTF, backup download and import were tested.

## Office export smoke test

1. Open `index.html`, prepare a lesson, edit text in the Lesson plan tab and download DOCX/PPTX. Open both in Microsoft Word/PowerPoint (or compatible software) and confirm the text is editable.
2. Repeat from Worksheet and Answer key tabs. Confirm exported material corresponds to the selected tab.
3. In `classroom-tools.html#weeklyPrep`, prepare a week and download editable teacher-plan and student-worksheet PPTX. Confirm they have separate contents; do not show answer keys to students.
4. Verify PDF, RTF, existing weekly DOCX, ZIP, local saves and import/export still work.
5. Always deploy the complete `dist/` directory. GitHub changes do not automatically update the ChatGPT Sites pilot.
