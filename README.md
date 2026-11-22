# GuroPrep

Teacher preparation workspace and curriculum library for Philippine schools.

## Deploy

Upload the contents of `dist/` to the website's document root, keeping all filenames together. Serve the directory over HTTPS. There is no build step.

- `index.html` is the lesson workspace and includes a Classroom tools link.
- `classroom-tools.html` includes weekly planning, differentiated practice, class rescheduling, editable Word documents and downloadable offline packs. Keep the full `dist/` directory structure, including `vendor/`. Single-lesson jsPDF export loads jsPDF from cdnjs.
- `prototype/`, `src/` and `tools/` retain the original v3 prototype, curriculum source and generation scripts. The current pilot deployment files are in `dist/`.

Current teacher pilot: https://guroprep-teacher-pilot.puguang.chatgpt.site/
