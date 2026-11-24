const fs=require('fs'),vm=require('vm');
const ctx={console};vm.createContext(ctx);
const src=['logic','words','vi'].map(f=>fs.readFileSync('src/'+f+'.js','utf8').replace(/if \(typeof module[^\n]*\n?/g,'')).join('\n')+'\n;this.out={ORIG,WORDS,VI,glossify,wordQuestion,clozeQuestion,grade,exampleResp,howTo,WORD_RE};';
vm.runInContext(src,ctx);const L=ctx.out;let bad=0;
const ids=new Set();L.WORDS.forEach(w=>{if(ids.has(w.id)){bad++;console.log('dup word',w.id)}ids.add(w.id); if(w.pic) w.pic();});
const miss=L.ORIG.filter(q=>!L.VI[q.id]).map(q=>q.id);const extra=Object.keys(L.VI).filter(k=>!L.ORIG.find(q=>q.id===k));
if(miss.length||extra.length){bad++;console.log('VI missing',miss,'extra',extra)}
let wrapped=0;const hits={};
L.ORIG.forEach(q=>{const g=L.glossify(q.q);(g.match(/data-w="(\w+)"/g)||[]).forEach(m=>{wrapped++;const id=m.slice(8,-1);hits[id]=(hits[id]||0)+1});
 if(/<svg/.test(q.q)) console.log('svg in q',q.id); L.howTo(q);});
for(const w of L.WORDS) for(let i=0;i<20;i++){const q=L.wordQuestion(w); if(!L.grade(q,L.exampleResp(q))||q.opts.length<2||new Set(q.opts).size!==q.opts.length){bad++;console.log('wordq bad',w.id,q.opts);break;}}
for(let i=0;i<200;i++){const q=L.clozeQuestion(); if(!L.grade(q,L.exampleResp(q))){bad++;console.log('cloze bad');break;}}
console.log('words',L.WORDS.length,'wrapped',wrapped,'bad',bad);
console.log('never hit:',L.WORDS.filter(w=>!hits[w.id]).map(w=>w.id).join(' '));
console.log('sample:',L.glossify(L.ORIG.find(q=>q.id==='r2q38a').q));
console.log('sample2:',L.glossify(L.ORIG.find(q=>q.id==='r5q8').q));
