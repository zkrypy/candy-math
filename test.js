const L = (()=>{const L=require('./src/logic.js');const fs=require('fs');if(fs.existsSync('./src/paper.js'))eval(fs.readFileSync('./src/paper.js','utf8').replace('const PAPER','var PAPER').replace('ORIG.','L.ORIG.'));return L;})();
let bad = 0, n = 0;
const chk = (q, tag) => { n++; const r = L.exampleResp(q); if (!L.grade(q, r)) { bad++; console.log('FAIL', tag, q.id, q.sk, JSON.stringify(q.q).slice(0,90), JSON.stringify(r instanceof Set ? [...r] : r)); }
  if (q.k==='mc' && (q.a<0||q.a>=q.opts.length)) { bad++; console.log('BADIDX', tag, q.id); }
  if (!L.SKILLS[q.sk]) { bad++; console.log('NOSKILL', q.id, q.sk); } };
L.ORIG.forEach(q => chk(q, 'orig'));
const ids = new Set(); L.ORIG.forEach(q => { if (ids.has(q.id)) console.log('DUPID', q.id); ids.add(q.id); });
for (const s of L.SKILL_GEN) for (let i = 0; i < 300; i++) { try { chk(L.GEN[s](), 'gen:' + s); } catch (e) { bad++; console.log('THROW', s, e.message); break; } }
// negative tests: wrong answers must fail
const neg = [['r1q8',['6.04']],['r2q3',['-9','-11']],['r1q20',['49.49']],['f20',['1.375']],['r3q32',['5','6','6']],['r2q8',['1','3','4']]];
for (const [id, resp] of neg) { const q = L.ORIG.find(x => x.id === id); if (L.grade(q, resp)) { bad++; console.log('SHOULD FAIL', id); } }
console.log('orig', L.ORIG.length, 'checked', n, 'bad', bad);
const byT = {}; L.ORIG.forEach(q => byT[q.t] = (byT[q.t]||0)+1); console.log(byT, 'paper-wrong', L.ORIG.filter(q=>q.paper).length);
