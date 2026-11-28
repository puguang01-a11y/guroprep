/* GuroPrep Office exports. Editable, local OOXML files, no AI or server required. */
(function () {
  'use strict';
  const O='http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const PKG='http://schemas.openxmlformats.org/package/2006/relationships';
  const P='http://schemas.openxmlformats.org/presentationml/2006/main';
  const A='http://schemas.openxmlformats.org/drawingml/2006/main';
  const NS='xmlns:p="'+P+'" xmlns:a="'+A+'" xmlns:r="'+O+'"';
  const WORD='application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const PPT='application/vnd.openxmlformats-officedocument.presentationml.presentation';
  function safe(s) {
    return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  }
  function zip() {
    if (typeof JSZip === 'undefined') throw Error('The local JSZip library is missing. Reload the page.');
    return new JSZip();
  }
  function relationships(list) {
    return '<Relationships xmlns="'+PKG+'">'+list.map(function(x){
      return '<Relationship Id="'+x[0]+'" Type="'+O+'/'+x[1]+'" Target="'+x[2]+'"/>';
    }).join('')+'</Relationships>';
  }
  function filename(text) {
    return String(text || 'GuroPrep').normalize('NFKC').replace(/[\\/:*?"<>|]/g,'-').replace(/\s+/g,' ').trim().slice(0,72) || 'GuroPrep';
  }
  function sectionLines(parts) {
    return (Array.isArray(parts)?parts:[parts]).map(function(p){ return String(p||'').replace(/\r\n?/g,'\n'); });
  }
  async function docx(parts, paper) {
    const doc=zip(), sections=sectionLines(parts);
    const format=paper==='a4'?[11906,16838]:paper==='long'?[12240,18720]:[12240,15840];
    function paragraphs(text) {
      return text.split('\n').map(function(line) {
        const trim=line.trim();
        const isHeading=/^(I\.|L\.|A\.|W\.)\s+[A-Z][A-Z ]+$/.test(trim) ||
          /^(Objectives|Content|Learning resources|Assessment|Answer key|Worksheets?|Student worksheet|Teacher plan)$/i.test(trim);
        const style=isHeading?'<w:pPr><w:pStyle w:val="Heading2"/><w:spacing w:before="160" w:after="100"/></w:pPr>':'';
        return '<w:p>'+style+'<w:r><w:t xml:space="preserve">'+safe(line)+'</w:t></w:r></w:p>';
      }).join('');
    }
    const body=sections.map(paragraphs).join('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
    doc.file('[Content_Types].xml',
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'+
      '<Default Extension="xml" ContentType="application/xml"/>'+
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'+
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>');
    doc.file('_rels/.rels',relationships([['rId1','officeDocument','word/document.xml']]));
    doc.file('word/_rels/document.xml.rels',relationships([['rId1','styles','styles.xml']]));
    doc.file('word/styles.xml',
      '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'+
      '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/></w:rPr></w:style>'+
      '<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="Heading 2"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:color w:val="153D32"/><w:sz w:val="26"/></w:rPr></w:style></w:styles>');
    doc.file('word/document.xml',
      '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+
      body+'<w:sectPr><w:pgSz w:w="'+format[0]+'" w:h="'+format[1]+'"/>'+
      '<w:pgMar w:top="960" w:bottom="960" w:left="960" w:right="960"/></w:sectPr></w:body></w:document>');
    return doc.generateAsync({type:'blob',compression:'DEFLATE',mimeType:WORD});
  }
  function groupShape() {
    return '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>'+
      '<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>'+
      '<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';
  }
  function shape(id,label,x,y,w,h,lines,size,color) {
    const paragraphs=lines.map(function(line) {
      return '<a:p><a:r><a:rPr lang="en-US" sz="'+size+'">'+
        '<a:solidFill><a:srgbClr val="'+color+'"/></a:solidFill>'+
        '<a:latin typeface="Arial"/></a:rPr><a:t>'+safe(line)+'</a:t></a:r></a:p>';
    }).join('');
    return '<p:sp><p:nvSpPr><p:cNvPr id="'+id+'" name="'+safe(label)+'"/>'+
      '<p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>'+
      '<p:spPr><a:xfrm><a:off x="'+x+'" y="'+y+'"/><a:ext cx="'+w+'" cy="'+h+'"/></a:xfrm>'+
      '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'+
      '<p:txBody><a:bodyPr wrap="square"><a:normAutofit/></a:bodyPr>'+
      '<a:lstStyle/>'+paragraphs+'</p:txBody></p:sp>';
  }
  function wrapLine(line,limit) {
    const clean=String(line).replace(/\t/g,'    ');
    if (clean.length<=limit) return [clean];
    const out=[]; let rest=clean;
    while(rest.length>limit) {
      let cut=rest.lastIndexOf(' ',limit);
      if(cut<Math.floor(limit*.45)) cut=limit;
      out.push(rest.slice(0,cut).trimEnd());
      rest=rest.slice(cut).trimStart();
    }
    out.push(rest);
    return out;
  }
  function contentSlides(parts,title) {
    // One idea per slide: start a new slide at each section heading or labelled step,
    // and never split a paragraph across slides unless it is longer than one slide.
    const MAX=12, slides=[];
    const LABEL=/^(Objectives|Content|Procedures[^:]*|Review[^:]*|Motivation[^:]*|Lesson proper[^:]*|I do[^:]*|We do[^:]*|You do[^:]*|Guided practice[^:]*|Independent practice[^:]*|Assessment[^:]*|Exit ticket[^:]*|Assignment[^:]*|Ways forward[^:]*|Remediation[^:]*|Enrichment[^:]*|Explore|Explain|Elaborate|Evaluate|Engage|Activity|Analysis|Abstraction|Application)\s*:/i;
    const MAJOR=/^([IVX]+|[ILAW])\.\s+\S|^[A-Z][A-Z \u2014-]{5,}$/;
    const tidy=function(t){return t.replace(/^([IVX]+|[ILAW])\.\s+/,'').toLowerCase().replace(/(^|\s)\S/g,function(m){return m.toUpperCase();});};
    sectionLines(parts).forEach(function(part) {
      const raw=part.split('\n');
      const firstIdx=raw.findIndex(function(x){return x.trim();});
      const deck=(firstIdx>=0?raw[firstIdx].trim():(title||'Lesson')).slice(0,74);
      let section=deck, cur=null;
      const flush=function(){ if(cur){ while(cur.lines.length&&!cur.lines[cur.lines.length-1].trim()) cur.lines.pop(); if(cur.lines.length) slides.push(cur);} cur=null; };
      const open=function(name,cont){ flush(); cur={title:(name||deck).slice(0,74)+(cont?' (continued)':''),lines:[]}; };
      open(deck);
      raw.forEach(function(line,idx) {
        if(idx===firstIdx) return;
        const t=line.trim();
        if(!t){ if(cur.lines.length&&cur.lines[cur.lines.length-1].trim()) cur.lines.push(''); return; }
        if(MAJOR.test(t)&&t.length<60){ section=tidy(t); open(section); return; }
        const m=t.match(LABEL);
        if(m&&cur.lines.filter(function(x){return x.trim();}).length>1){ open(section+' \u00b7 '+m[1].replace(/\s*\/.*$/,'').trim()); }
        const wrapped=wrapLine(t,66);
        if(cur.lines.length&&cur.lines.length+wrapped.length>MAX) open(cur.title.replace(/ \(continued\)$/,''),true);
        for(let i=0;i<wrapped.length;i+=MAX){
          if(i) open(cur.title.replace(/ \(continued\)$/,''),true);
          cur.lines.push.apply(cur.lines,wrapped.slice(i,i+MAX));
        }
      });
      flush();
      if(!slides.length) slides.push({title:deck,lines:['Add your lesson content here.']});
    });
    return slides.length?slides:[{title:title||'Lesson',lines:['']}];
  }
  async function pptx(parts,title) {
    const pkg=zip(), slides=contentSlides(parts,title), count=slides.length;
    const master='ppt/slideMasters/slideMaster1.xml';
    const layout='ppt/slideLayouts/slideLayout1.xml';
    const theme='ppt/theme/theme1.xml';
    pkg.file('[Content_Types].xml',
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'+
      '<Default Extension="xml" ContentType="application/xml"/>'+
      '<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>'+
      '<Override PartName="/'+master+'" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>'+
      '<Override PartName="/'+layout+'" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>'+
      '<Override PartName="/'+theme+'" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>'+
      slides.map(function(_,i){return '<Override PartName="/ppt/slides/slide'+(i+1)+'.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>';}).join('')+
      '</Types>');
    pkg.file('_rels/.rels',relationships([['rId1','officeDocument','ppt/presentation.xml']]));
    pkg.file('ppt/presentation.xml',
      '<p:presentation '+NS+'><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>'+
      '<p:sldIdLst>'+slides.map(function(_,i){return '<p:sldId id="'+(256+i)+'" r:id="rId'+(i+2)+'"/>';}).join('')+
      '</p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="screen16x9"/>'+
      '<p:notesSz cx="6858000" cy="9144000"/></p:presentation>');
    pkg.file('ppt/_rels/presentation.xml.rels',relationships(
      [['rId1','slideMaster','slideMasters/slideMaster1.xml']].concat(
        slides.map(function(_,i){return ['rId'+(i+2),'slide','slides/slide'+(i+1)+'.xml'];}))
    ));
    pkg.file(master,'<p:sldMaster '+NS+'><p:cSld><p:spTree>'+groupShape()+'</p:spTree></p:cSld>'+
      '<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>'+
      '<p:clrMap accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" bg1="lt1" bg2="lt2" folHlink="folHlink" hlink="hlink" tx1="dk1" tx2="dk2"/></p:sldMaster>');
    pkg.file('ppt/slideMasters/_rels/slideMaster1.xml.rels',relationships(
      [['rId1','slideLayout','../slideLayouts/slideLayout1.xml'],['rId2','theme','../theme/theme1.xml']]));
    pkg.file(layout,'<p:sldLayout '+NS+' type="blank" preserve="1"><p:cSld name="Blank"><p:spTree>'+
      groupShape()+'</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>');
    pkg.file('ppt/slideLayouts/_rels/slideLayout1.xml.rels',relationships([['rId1','slideMaster','../slideMasters/slideMaster1.xml']]));
    pkg.file(theme,'<a:theme xmlns:a="'+A+'" name="GuroPrep"><a:themeElements>'+
      '<a:clrScheme name="GuroPrep"><a:dk1><a:srgbClr val="000000"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>'+
      '<a:dk2><a:srgbClr val="253D36"/></a:dk2><a:lt2><a:srgbClr val="F4F5ED"/></a:lt2>'+
      [1,2,3,4,5,6].map(function(i){return '<a:accent'+i+'><a:srgbClr val="1D745C"/></a:accent'+i+'>';}).join('')+
      '<a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme>'+
      '<a:fontScheme name="GuroPrep"><a:majorFont><a:latin typeface="Arial"/></a:majorFont>'+
      '<a:minorFont><a:latin typeface="Arial"/></a:minorFont></a:fontScheme>'+
      '<a:fmtScheme name="GuroPrep"><a:fillStyleLst><a:solidFill><a:schemeClr val="accent1"/></a:solidFill></a:fillStyleLst>'+
      '<a:lnStyleLst><a:ln w="12700"><a:solidFill><a:schemeClr val="accent1"/></a:solidFill></a:ln></a:lnStyleLst>'+
      '<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>'+
      '<a:bgFillStyleLst><a:solidFill><a:schemeClr val="lt1"/></a:solidFill></a:bgFillStyleLst>'+
      '</a:fmtScheme></a:themeElements></a:theme>');
    slides.forEach(function(slide,i){
      const body=slide.lines.length?slide.lines:[''];
      pkg.file('ppt/slides/slide'+(i+1)+'.xml',
        '<p:sld '+NS+'><p:cSld><p:spTree>'+groupShape()+
        shape(2,'Lesson title',620000,350000,10950000,850000,[slide.title],3200,'153D32')+
        shape(3,'Editable lesson content',650000,1450000,10850000,4300000,body,1900,'253D36')+
        shape(4,'GuroPrep footer',650000,6200000,10600000,240000,['GuroPrep  |  '+(i+1)+' / '+count],950,'647C72')+
        '</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>');
      pkg.file('ppt/slides/_rels/slide'+(i+1)+'.xml.rels',
        relationships([['rId1','slideLayout','../slideLayouts/slideLayout1.xml']]));
    });
    return pkg.generateAsync({type:'blob',compression:'DEFLATE',mimeType:PPT});
  }
  function download(blob,name) {
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download=filename(name);document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(url);},30000);
  }
  window.GuroOffice={docx:docx,pptx:pptx,download:download,filename:filename,slideCount:function(parts){return contentSlides(parts,'').length;}};
})();