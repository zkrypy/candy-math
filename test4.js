// Science self-test: every worksheet question and practice template must accept its own example answer.
const fs = require('fs'), vm = require('vm'); const ctx = { console }; vm.createContext(ctx);
const src = ['logic', 'words', 'vi', 'gen', 'science'].map((f) => fs.readFileSync('src/' + f + '.js', 'utf8').replace(/if \(typeof module[^\n]*\n?/g, '')).join('\n') + '\n;this.out={ORIG,TOPICS,SKILLS,GEN,SCI_TPL,SCI_NOTES,grade,exampleResp,glossify,wordsOf,wordQuestion,clozeQuestion,howTo,txtMatch};';
vm.runInContext(src, ctx); const L = ctx.out; let bad = 0, n = 0;
const issues = (q) => {
  const e = [];
  if (!L.grade(q, L.exampleResp(q))) e.push('example fails');
  if (!L.SKILLS[q.sk]) e.push('no skill ' + q.sk);
  if (!q.vi) e.push('no vi');
  if (q.k === 'mc' && !(q.a >= 0 && q.a < q.opts.length)) e.push('mc idx');
  if (q.k === 'multi' && (!q.a.length || q.a.some((x) => x < 0) || (q.exact && q.a.length !== q.exact))) e.push('multi a');
  if ((q.k === 'mc' || q.k === 'multi') && new Set(q.opts).size !== q.opts.length) e.push('dup opts');
  if (q.k === 'match' && q.a.some((x) => x < 0)) e.push('match');
  if (q.k === 'rows' && q.rows.some((r) => r.a.some((a) => !r.ch.includes(a)))) e.push('row answer not in choices');
  if (q.k === 'order' && new Set(q.items).size !== q.items.length) e.push('dup order items');
  if (/NaN|undefined|Infinity/.test(JSON.stringify([q.q, q.opts, q.parts && q.parts.map((p) => [p.pre, p.post, p.ex]), q.rows, q.why, q.fig, q.L, q.R, q.items]))) e.push('NaN/undef');
  L.howTo(q); L.glossify(q.q, 'sci');
  return e;
};
const sci = L.ORIG.filter((q) => q.t >= 7);
const ids = new Set(); L.ORIG.forEach((q) => { if (ids.has(q.id)) { bad++; console.log('DUPID', q.id); } ids.add(q.id); });
sci.forEach((q) => { n++; const e = issues(q); if (e.length) { bad++; console.log('ORIG', q.id, e.join(', ')); } });
for (const [sk, list] of Object.entries(L.SCI_TPL)) list.forEach((fn, ti) => {
  for (let i = 0; i < 200; i++) { let q; try { q = fn(); } catch (err) { bad++; console.log('THROW', sk, ti, err.message); return; } n++;
    const e = issues(q); if (!/^Like /.test(q.src)) e.push('no Like'); if (e.length) { bad++; console.log('TPL', sk, ti, e.join(', '), JSON.stringify(q.q).slice(0, 80)); return; } }
});
// every science skill has practice, every unit has notes
Object.keys(L.SKILLS).filter((s) => L.SKILLS[s].t >= 7 && L.SKILLS[s].t <= 9).forEach((s) => { if (!L.GEN[s]) { bad++; console.log('no GEN for', s); } });
[7, 8, 9].forEach((t) => { if (!L.SCI_NOTES[t]) { bad++; console.log('no notes', t); } else L.SCI_NOTES[t].cards.forEach((c) => c.p.forEach((p) => L.glossify(p, 'sci'))); });
// typed answers: accept slips, reject wrong words
const T = [['Condensaton', ['condensation'], true], ['the light', ['light'], true], ['EVAPORATION', ['evaporation'], true], ['melting', ['freezing', 'freeze'], false], ['solute', ['solvent'], false], ['solution', ['solute'], false], ['wind', ['wind', 'wind instrument'], true], ['wing', ['wind'], false]];
T.forEach(([r, acc, ok]) => { if (!!L.txtMatch(r, acc) !== ok) { bad++; console.log('txtMatch', r, acc); } });
// wrong answers must fail
const neg = [['u1q6', [['anther'], ['stigma']]], ['u2q8b', ['220']], ['u3q20b', ['20']], ['u3q1c', ['solute']], ['u3q22c', ['104']], ['u1q10', [3, 2, 0, 1]]];
neg.forEach(([id, r]) => { const q = L.ORIG.find((x) => x.id === id); if (L.grade(q, r)) { bad++; console.log('SHOULD FAIL', id); } });
// science words + quizzes
const ws = L.wordsOf('sci'); for (const w of ws) for (let i = 0; i < 20; i++) { const q = L.wordQuestion(w); if (!L.grade(q, L.exampleResp(q)) || new Set(q.opts).size !== q.opts.length || q.t !== 10) { bad++; console.log('wordq', w.id, q.opts); break; } }
for (let i = 0; i < 200; i++) { const q = L.clozeQuestion('sci'); if (!L.grade(q, L.exampleResp(q))) { bad++; console.log('cloze'); break; } }
if (L.wordsOf('math').some((w) => w.subj)) { bad++; console.log('maths words polluted'); }
const byT = {}; sci.forEach((q) => (byT[q.t] = (byT[q.t] || 0) + 1));
console.log('science orig', sci.length, byT, 'checked', n, 'sci words', ws.length, 'bad', bad);
process.exitCode = bad ? 1 : 0;
