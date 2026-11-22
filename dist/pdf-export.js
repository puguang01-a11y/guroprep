// Render Unicode text using the same fonts available to the teacher's browser.
function createLessonPdf(text) {
  const width = 1240;
  const height = 1754;
  const margin = 92;
  const lineHeight = 43;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', {alpha:false});
  if (!ctx) throw new Error('Canvas unavailable');
  const pages = [];
  let y;

  function clearPage() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#182520';
    ctx.font = '31px Arial, sans-serif';
    ctx.textBaseline = 'top';
    y = margin;
  }

  function finishPage() {
    const data = atob(canvas.toDataURL('image/jpeg', 0.93).split(',')[1]);
    pages.push(Uint8Array.from(data, character => character.charCodeAt(0)));
  }

  function writeLine(line) {
    if (y + lineHeight > height - margin) {
      finishPage();
      clearPage();
    }
    ctx.fillText(line, margin, y);
    y += lineHeight;
  }

  clearPage();
  for (const paragraph of text.split(/\r?\n/)) {
    let line = '';
    let lineWidth = 0;
    for (const token of paragraph.match(/\s+|\S+/gu) || []) {
      const tokenWidth = ctx.measureText(token).width;
      if (line && lineWidth + tokenWidth > width - 2 * margin) {
        writeLine(line.trimEnd());
        line = '';
        lineWidth = 0;
      }
      if (tokenWidth <= width - 2 * margin) {
        line += token;
        lineWidth += tokenWidth;
        continue;
      }
      for (const character of token) {
        const characterWidth = ctx.measureText(character).width;
        if (lineWidth + characterWidth > width - 2 * margin) {
          writeLine(line);
          line = '';
          lineWidth = 0;
        }
        line += character;
        lineWidth += characterWidth;
      }
    }
    writeLine(line.trimEnd());
  }
  finishPage();

  const chunks = [];
  const encoder = new TextEncoder();
  const offsets = [0];
  let position = 0;
  function append(value) {
    const bytes = typeof value === 'string' ? encoder.encode(value) : value;
    chunks.push(bytes);
    position += bytes.length;
  }
  function object(id, header, stream) {
    offsets[id] = position;
    append(id + ' 0 obj\n' + header);
    if (stream) {
      append('\nstream\n');
      append(stream);
      append('\nendstream');
    }
    append('\nendobj\n');
  }

  append('%PDF-1.4\n');
  object(1, '<< /Type /Catalog /Pages 2 0 R >>');
  object(2, '<< /Type /Pages /Count ' + pages.length + ' /Kids [' +
    pages.map((_, index) => (3 + index * 3) + ' 0 R').join(' ') + '] >>');
  for (const [index, page] of pages.entries()) {
    const id = 3 + index * 3;
    const commands = encoder.encode('q 595 0 0 842 0 0 cm /PageImage Do Q');
    object(id, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /PageImage ' +
      (id + 2) + ' 0 R >> >> /Contents ' + (id + 1) + ' 0 R >>');
    object(id + 1, '<< /Length ' + commands.length + ' >>', commands);
    object(id + 2, '<< /Type /XObject /Subtype /Image /Width ' + width + ' /Height ' + height +
      ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + page.length + ' >>', page);
  }
  const xref = position;
  append('xref\n0 ' + offsets.length + '\n0000000000 65535 f \n');
  for (const offset of offsets.slice(1)) append(String(offset).padStart(10, '0') + ' 00000 n \n');
  append('trailer\n<< /Size ' + offsets.length + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF\n');
  return new Blob(chunks, {type:'application/pdf'});
}
