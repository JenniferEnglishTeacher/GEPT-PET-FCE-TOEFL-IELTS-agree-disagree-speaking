const fs=require("fs"),path=require("path");
const REPO="/home/claude/gept-pet-fce-toefl-ielts-agree-disagree-speaking";
global.window={};require(REPO+"/gept-basic-writing-data.js");const S=window.GEPT_BASIC_STORIES;
const DIMS=JSON.parse(fs.readFileSync(__dirname+"/dims.json","utf8"));
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,ShadingType,AlignmentType,ImageRun,BorderStyle,Footer,PageNumber,LevelFormat,PageBreak,VerticalAlign}=require("docx");
const GROUPS=["睡過頭・上學遲到 Oversleeping & Being Late","倒楣的一天 Bad-Luck Days","校園生活與考試 School Life & Tests","颱風天 Typhoon Days","下雨天 Rainy Days","購物 Shopping","意外與安全 Accidents & Safety","公德心與鄰居 Manners & Neighbors","寵物狗狗 Dogs & Pets","生日派對 Birthday Parties","出遊旅行 Trips & Outings","工作與日常作息 Work & Daily Routines"];
const TEAL="0F7C80",BROWN="7A4B00",DARK="0B5E61",FONT={ascii:"Arial",hAnsi:"Arial",cs:"Arial",eastAsia:"Microsoft JhengHei"};
const W=11906-1700; // content width
// sizes in half-points — large for elementary students
const SZ={title:44,h:36,sub:30,body:30,table:28,small:24,essay:30};
const r=(t,o={})=>new TextRun({text:t,font:FONT,size:o.size||SZ.body,bold:o.bold,italics:o.italics,color:o.color});
const boldRuns=(t,o={})=>String(t).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(seg=>seg.startsWith("**")?r(seg.slice(2,-2),{...o,bold:true,color:o.boldColor||DARK}):r(seg,o));
const P=(children,o={})=>new Paragraph({children,alignment:o.align,spacing:o.noLine?{before:o.before??0,after:o.after??120}:{before:o.before??0,after:o.after??120,line:o.line||300},keepNext:o.keepNext,shading:o.fill?{type:ShadingType.CLEAR,fill:o.fill,color:"auto"}:undefined,border:o.border,indent:o.indent,numbering:o.numbering,pageBreakBefore:o.pageBreak});
const B={style:BorderStyle.SINGLE,size:4,color:"CFE3DF"};const BORD={top:B,bottom:B,left:B,right:B};
const cell=(children,w,o={})=>new TableCell({children:Array.isArray(children)?children:[children],width:{size:w,type:WidthType.DXA},borders:BORD,shading:o.fill?{type:ShadingType.CLEAR,fill:o.fill,color:"auto"}:undefined,margins:{top:80,bottom:80,left:110,right:110},verticalAlign:o.va});
const table=(widths,rows)=>new Table({width:{size:widths.reduce((a,b)=>a+b),type:WidthType.DXA},columnWidths:widths,rows});
const hdr=(texts,widths)=>new TableRow({tableHeader:true,children:texts.map((t,i)=>cell(P([r(t,{bold:true,color:"FFFFFF",size:SZ.small})],{after:0}),widths[i],{fill:TEAL}))});
const H=(t,o={})=>P([r(t,{bold:true,color:TEAL,size:o.size||SZ.sub})],{before:o.before??240,after:100,keepNext:true});
const body=[];
// cover
body.push(P([r("全民英檢初級寫作｜三格連環圖",{bold:true,color:TEAL,size:SZ.title})],{align:AlignmentType.CENTER,before:600}));
body.push(P([r("GEPT Elementary Writing: 3-Picture Stories",{bold:true,size:SZ.h,color:"333333"})],{align:AlignmentType.CENTER}));
body.push(P([r("49 topics · 每題含實用單字、實用句型、句型表、範文 · CEFR A1–A2",{size:SZ.body,color:"666666"})],{align:AlignmentType.CENTER,after:300}));
body.push(H("寫作公式 Story Formula",{size:SZ.h}));
const FW=[3000,W-3000];
const formula=[["1 人物介紹 Who","S is a 年齡-year-old 職業."],["2 喜好/個性 Hobby","S likes to V / S is adj."],["3 圖一 Picture 1","時間 + 地點 + 動作 + 心情 because"],["4 圖二 Picture 2","When S Ved, ... / S found that ..."],["5 圖三 Picture 3","When S arrived ..., / As a result, ..."],["6 萬用結尾 Ending","S has learned an important lesson. / For him, it was the 最高級 ..."]];
body.push(table(FW,formula.map(([a,b],i)=>new TableRow({children:[cell(P([r(a,{bold:true,color:TEAL,size:SZ.table})],{after:0}),FW[0],{fill:i%2?"F4FAFA":undefined}),cell(P([r(b,{color:BROWN,size:SZ.table})],{after:0}),FW[1],{fill:i%2?"F4FAFA":undefined})]}))));
// contents
body.push(P([r("目錄 Contents",{bold:true,color:TEAL,size:SZ.h})],{pageBreak:true,after:120}));
const CW=[900,3500,W-900-3500];
const crow=[hdr(["No.","題目","Title"],CW)];let g0=null;
S.forEach(s=>{if(s.group!==g0){g0=s.group;crow.push(new TableRow({children:[new TableCell({columnSpan:3,width:{size:W,type:WidthType.DXA},borders:BORD,shading:{type:ShadingType.CLEAR,fill:"E3F2F2",color:"auto"},margins:{top:60,bottom:60,left:110,right:110},children:[P([r(`主題 ${s.group}｜${GROUPS[s.group-1]}`,{bold:true,color:DARK,size:SZ.small})],{after:0})]})]}));}
 crow.push(new TableRow({cantSplit:true,children:[cell(P([r(String(s.no),{bold:true,size:SZ.small})],{after:0}),CW[0]),cell(P([r(s.zh,{size:SZ.small})],{after:0}),CW[1]),cell(P([r(s.en,{size:SZ.small})],{after:0}),CW[2])]}));});
body.push(table(CW,crow));
// topics
const VW=[2900,(W/2)-2900];const V4=[VW[0],VW[1],VW[0],VW[1]];
const GW=[2300,3000,W-5300];
S.forEach(s=>{
 body.push(P([r(`主題 ${s.group}｜${GROUPS[s.group-1]}`,{bold:true,color:"FFFFFF",size:SZ.small})],{pageBreak:true,fill:TEAL,after:120}));
 body.push(P([r(`Topic ${s.no}｜${s.zh}  `,{bold:true,color:TEAL,size:SZ.h}),r(s.en,{bold:true,size:SZ.h,color:"333333"})],{after:100,keepNext:true}));
 String(s.prompt).split(/\n+/).forEach((l,i)=>body.push(P([r(i?l:`題目：${l}`,{size:SZ.body})],{fill:"FFF8E6",after:i===String(s.prompt).split(/\n+/).length-1?160:0,line:340})));
 if(s.img){const [w,h]=DIMS[s.img];const maxW=W/1440*96,maxH=260;let dw=maxW,dh=dw*h/w;if(dh>maxH){dh=maxH;dw=dh*w/h;}
  body.push(P([new ImageRun({type:"jpg",data:fs.readFileSync(path.join(REPO,s.img)),transformation:{width:Math.round(dw),height:Math.round(dh)},altText:{title:s.en,description:`Three pictures: ${s.en}`,name:s.en}})],{align:AlignmentType.CENTER,after:160,noLine:true}));}
 else {const SW=Math.floor(W/3);body.push(table([SW,SW,SW],[new TableRow({children:s.scenes.map((t,i)=>cell([P([r(`圖${"一二三"[i]} Picture ${i+1}`,{bold:true,color:BROWN,size:SZ.table})],{align:AlignmentType.CENTER,after:60}),P([r(t,{size:SZ.table})],{align:AlignmentType.CENTER,after:0})],SW,{fill:"FFF8E6"}))})]));}
 // vocab
 body.push(H("Useful Words & Phrases 實用單字片語"));
 const v=s.vocab||[],half=Math.ceil(v.length/2);
 const vr=[hdr(["Word / Phrase","中文","Word / Phrase","中文"],V4)];
 for(let i=0;i<half;i++){const a=v[i],b=v[i+half],f=i%2?"F4FAFA":undefined;
  vr.push(new TableRow({cantSplit:true,children:[cell(P([r(a[0],{bold:true,color:TEAL,size:SZ.table})],{after:0}),V4[0],{fill:f}),cell(P([r(a[1],{size:SZ.table})],{after:0}),V4[1],{fill:f}),cell(P([r(b?b[0]:"",{bold:true,color:TEAL,size:SZ.table})],{after:0}),V4[2],{fill:f}),cell(P([r(b?b[1]:"",{size:SZ.table})],{after:0}),V4[3],{fill:f})]}));}
 body.push(table(V4,vr));
 // patterns
 body.push(H("Useful Sentence Patterns 實用句型"));
 (s.patterns||[]).forEach((p,i)=>{body.push(P([r(`${i+1}. `,{bold:true,size:SZ.body}),r(p[0],{bold:true,size:SZ.body})],{after:20,line:320,keepNext:true,indent:{left:400,hanging:400}}));
  body.push(P([r("→ "+p[1],{italics:true,size:SZ.body,color:"555555"})],{after:120,line:320,indent:{left:400}}));});
 // grid
 body.push(H("Sentence Patterns 句型表"));
 const gr=[hdr(["Column 1｜元素 & 關鍵字","Column 2｜句型","Column 3｜例句"],GW)];
 s.rows.forEach((x,i)=>{const f=i%2?"F4FAFA":undefined;gr.push(new TableRow({cantSplit:true,children:[cell([P([r(x[0],{bold:true,color:TEAL,size:SZ.table})],{after:30}),P([r(x[1],{size:SZ.small,color:"666666"})],{after:0})],GW[0],{fill:f}),cell(P([r(x[2],{color:BROWN,size:SZ.table})],{after:0}),GW[1],{fill:f}),cell(P(boldRuns(x[3],{size:SZ.table}),{after:0}),GW[2],{fill:f})]}));});
 body.push(table(GW,gr));
 // essay
 body.push(P([r("範文 Model Essay  ",{bold:true,color:TEAL,size:SZ.sub}),r(`(${s.words} words)`,{size:SZ.small,color:"666666"})],{before:240,after:100,keepNext:true}));
 body.push(P(boldRuns(s.essay,{size:SZ.essay}),{fill:"E3F2F2",line:380,after:160,indent:{left:120,right:120},border:{left:{style:BorderStyle.SINGLE,size:24,color:TEAL,space:6}}}));
 if(s.short){body.push(P([r("50-word version 英檢初級字數版",{bold:true,color:TEAL,size:SZ.sub})],{before:120,after:100,keepNext:true}));
  body.push(P(boldRuns(s.short,{size:SZ.essay}),{fill:"E3F2F2",line:380,indent:{left:120,right:120},border:{left:{style:BorderStyle.SINGLE,size:24,color:TEAL,space:6}}}));}
});
const doc=new Document({creator:"Jennifer Chen",title:"GEPT Basic Writing: 3-Picture Stories",styles:{default:{document:{run:{font:"Arial",size:SZ.body}}}},
 sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:850,right:850,bottom:850,left:850}}},
 footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"GEPT 初級寫作｜三格連環圖  ",font:FONT,size:18,color:"888888"}),new TextRun({children:[PageNumber.CURRENT],font:FONT,size:18,color:"888888"})]})]})},children:body}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync(process.argv[2],b);console.log("ok",b.length)});
