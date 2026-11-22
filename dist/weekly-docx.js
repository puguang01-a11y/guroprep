// Minimal, uncompressed Open Packaging Convention archive. No network dependency.
function weeklyDocx(sections,paper="short") {
  const enc = new TextEncoder();
  const xml = value => String(value).replace(/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu,'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  const paragraphs = sections.map(section => section.split('\n').map(line =>
    '<w:p><w:r><w:t xml:space="preserve">'+xml(line)+'</w:t></w:r></w:p>').join('')
  ).join('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
  const files = {
    '[Content_Types].xml':'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
    '_rels/.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    'word/document.xml':'<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paragraphs+'<w:sectPr><w:pgSz w:w="'+weeklyPaper[paper].w+'" w:h="'+weeklyPaper[paper].h+'"/><w:pgMar w:top="907" w:bottom="907" w:left="907" w:right="907"/></w:sectPr></w:body></w:document>'
  };
  const local=[], central=[];
  let offset=0, size=0;
  function header(signature,fields) {
    const buf=new Uint8Array(4+fields.reduce((sum,[width])=>sum+width,0));
    const view=new DataView(buf.buffer);
    view.setUint32(0,signature,true);
    let pos=4;
    for(const [width,value] of fields){ if(width===2)view.setUint16(pos,value,true);else view.setUint32(pos,value,true);pos+=width; }
    return buf;
  }
  for(const [path,source] of Object.entries(files)){
    const name=enc.encode(path), bytes=enc.encode(source);
    let crc=-1;
    for(const byte of bytes){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}
    const common=[[2,20],[2,0],[2,0],[2,0],[2,33],[4,~crc],[4,bytes.length],[4,bytes.length],[2,name.length],[2,0]];
    const first=header(0x04034b50,common);
    const next=header(0x02014b50,[[2,20],...common,[2,0],[2,0],[2,0],[4,0],[4,offset]]);
    local.push(first,name,bytes);central.push(next,name);
    offset+=first.length+name.length+bytes.length;size+=next.length+name.length;
  }
  return new Blob([...local,...central,header(0x06054b50,[[2,0],[2,0],[2,3],[2,3],[4,size],[4,offset],[2,0]])],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
}
