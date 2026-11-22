# GuroPrep

Teacher preparation workspace and curriculum library for Philippine schools.

## Deploy

Upload the contents of `dist/` to the website's document root, keeping all filenames together. Serve the directory over HTTPS. There is no build step.

- `index.html` is the lesson workspace and includes a Classroom tools link.
- `classroom-tools.html` is the v3 classroom workspace with elementary and junior-high Math, English and Science materials. Its PDF and Word exports load jsPDF and JSZip from cdnjs.
- `prototype/`, `src/` and `tools/` retain the original v3 prototype, curriculum source and generation scripts. When releasing a new prototype build, copy the updated self-contained `prototype/index.html` to `dist/classroom-tools.html`.

Current teacher pilot: https://guroprep-teacher-pilot.puguang.chatgpt.site/
