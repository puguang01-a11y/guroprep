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

  function styleOf(paragraph, index) {
    const t = paragraph.trim();
    const base = {font:'31px Arial, sans-serif', color:'#182520', indent:0, before:0, rule:false};
    if (index === 0) return {...base, font:'25px Arial, sans-serif', color:'#5a7a6c'};
    if (index === 1) return {...base, font:'bold 40px Georgia, serif', color:'#153d32', before:6};
    if (/^[ILAW]\.\s+[A-Z][A-Z ]+$/.test(t)) return {...base, font:'bold 34px Arial, sans-serif', color:'#20604c', before:22, rule:true};
    if (/^■\s/.test(t)) return {...base, font:'bold 31px Arial, sans-serif', color:'#153d32', before:14};
    if (/^(Objectives|Content|Learning resources|Procedures\b.*)$/.test(t)) return {...base, font:'bold 31px Arial, sans-serif', color:'#20604c', before:10};
    if (/^[A-Z0-9][A-Z0-9 ·:'’\-–()|]+$/.test(t) && /[A-Z]{3}/.test(t) && index > 1) return {...base, font:'bold 31px Arial, sans-serif', color:'#20604c', before:16};
    if (/^\s{2,}/.test(paragraph)) return {...base, indent:56};
    if (/^[•–-]\s/.test(t)) return {...base, indent:24};
    return base;
  }

  function writeLine(line, style) {
    if (y + lineHeight > height - margin) {
      finishPage();
      clearPage();
    }
    ctx.font = style.font;
    ctx.fillStyle = style.color;
    ctx.fillText(line, margin + style.indent, y);
    y += lineHeight;
  }

  clearPage();
  text.split(/\r?\n/).forEach((paragraph, index) => {
    const style = styleOf(paragraph, index);
    if (style.before && y > margin) y += style.before;
    if (style.rule && y + lineHeight * 2 < height - margin) { ctx.fillStyle = '#c9d8cf'; ctx.fillRect(margin, y - 6, width - 2 * margin, 2); }
    ctx.font = style.font;
    const room = width - 2 * margin - style.indent;
    let line = '';
    let lineWidth = 0;
    for (const token of paragraph.trimStart().match(/\s+|\S+/gu) || []) {
      const tokenWidth = ctx.measureText(token).width;
      if (line && lineWidth + tokenWidth > room) {
        writeLine(line.trimEnd(), style);
        ctx.font = style.font;
        line = '';
        lineWidth = 0;
      }
      if (tokenWidth <= room) {
        line += token;
        lineWidth += tokenWidth;
        continue;
      }
      for (const character of token) {
        const characterWidth = ctx.measureText(character).width;
        if (lineWidth + characterWidth > room) {
          writeLine(line, style);
          ctx.font = style.font;
          line = '';
          lineWidth = 0;
        }
        line += character;
        lineWidth += characterWidth;
      }
    }
    writeLine(line.trimEnd(), style);
  });
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
