# GuroPrep

Teacher preparation workspace and curriculum library for Philippine schools.

## Deploy

Upload the contents of `dist/` to the website's document root, keeping all filenames together. Serve the directory over HTTPS. There is no build step.

- `index.html` is the lesson workspace and includes a Classroom tools link. Edit the current lesson plan, worksheet, or answer key in the on-page editor, then download an editable DOCX or PPTX (in addition to legacy RTF/PDF).
- `classroom-tools.html` includes weekly planning, differentiated practice, class rescheduling, editable Word documents, editable teacher/worksheet PPTX presentations and downloadable offline packs. Keep the full `dist/` directory structure, including `vendor/`. Single-lesson jsPDF export loads jsPDF from cdnjs.
- `office-export.js` is the browser-only DOCX/PPTX generator. Deploy it together with `vendor/jszip.min.js`; these exports do not require a backend or AI API. The exported Word paragraphs and PowerPoint text boxes are editable. Images, complex tables and custom school PPT themes are not included in this initial version.
- `prototype/`, `src/` and `tools/` retain the original v3 prototype, curriculum source and generation scripts. The current pilot deployment files are in `dist/`.

Current teacher pilot: https://guroprep-teacher-pilot.puguang.chatgpt.site/

## Office export smoke test

1. Open `index.html`, prepare a lesson, edit text in the Lesson plan tab and download DOCX/PPTX. Open both in Microsoft Word/PowerPoint (or compatible software) and confirm the text is editable.
2. Repeat from Worksheet and Answer key tabs. Confirm exported material corresponds to the selected tab.
3. In `classroom-tools.html#weeklyPrep`, prepare a week and download editable teacher-plan and student-worksheet PPTX. Confirm they have separate contents; do not show answer keys to students.
4. Verify PDF, RTF, existing weekly DOCX, ZIP, local saves and import/export still work.
5. Always deploy the complete `dist/` directory. GitHub changes do not automatically update the ChatGPT Sites pilot.
