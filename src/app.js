// ===== Candy Math: UI =====
const $ = (s, el = document) => el.querySelector(s);
const h = (tag, attrs = {}, html = '') => { const e = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) { if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (v !== false && v != null) e.setAttribute(k, v === true ? '' : v); } if (html) e.innerHTML = html; return e; };
const TC = { 1: 'var(--lemon)', 2: 'var(--mint)', 3: 'var(--berry)', 4: 'var(--grape)', 5: 'var(--peach)', 6: 'var(--sky)' };
TOPICS.push({ id: 6, name: 'Maths Words', sheet: 'Vocabulary', candy: 'Sky jellies', color: 'sky' });
SKILLS.words = { t: 6, en: 'Maths words', vi: 'Chạm vào chữ gạch chân trong đề để xem nghĩa tiếng Việt.' };
const coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;

// ---------- progress store (localStorage now, cloud db when available) ----------
const LS = 'candy-math-v1';
const blank = () => ({ v: 1, upd: 0, q: {}, sk: {}, w: {}, look: {}, candies: 0, tests: [] });
let DATA = blank();
try { const s = localStorage.getItem(LS); if (s) DATA = Object.assign(blank(), JSON.parse(s)); } catch (e) {}
let cloud = null, cloudBusy = false, cloudDirty = false, cloudTimer = null;
function save() {
  DATA.upd = Date.now();
  try { localStorage.setItem(LS, JSON.stringify(DATA)); } catch (e) {}
  if (cloud) { cloudDirty = true; clearTimeout(cloudTimer); cloudTimer = setTimeout(pushCloud, 1200); }
}
async function pushCloud() {
  if (!cloud || cloudBusy || !cloudDirty) return;
  cloudBusy = true; cloudDirty = false;
  try { await cloud.set(JSON.parse(JSON.stringify(DATA))); setSync('Saved'); }
  catch (e) { setSync('Saved on this device'); if (e && (e.code === 'invalid_argument' || e.code === 'not_granted')) cloud = null; }
  cloudBusy = false;
  if (cloudDirty) pushCloud();
}
function setSync(t) { const el = $('#sync'); if (el) el.textContent = t; }
async function initCloud() {
  if (!window.claude || !window.claude.use) return;
  try {
    const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    if (!db || !user) return;
    const uid = await user.id(); if (!uid) return;
    const ref = db.doc('progress/' + uid);
    const snap = await Promise.race([ref.get(), new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))]);
    const remote = snap && snap.exists !== false ? snap.data() : null;
    cloud = ref;
    if (remote && (remote.upd || 0) > (DATA.upd || 0)) {
      DATA = Object.assign(blank(), remote);
      try { localStorage.setItem(LS, JSON.stringify(DATA)); } catch (e) {}
      if (VIEW.name === 'home' || VIEW.name === 'report') render();
      updateCandy();
    } else if ((DATA.upd || 0) > ((remote && remote.upd) || 0)) { cloudDirty = true; pushCloud(); }
    setSync('Synced');
  } catch (e) { cloud = null; }
}

function record(q, ok) {
  const now = Date.now();
  if (!q.gen) { const s = DATA.q[q.id] || { r: 0, w: 0 }; ok ? s.r++ : s.w++; s.last = ok ? 1 : 0; s.t = now; DATA.q[q.id] = s; }
  const k = DATA.sk[q.sk] || { r: 0, w: 0 }; ok ? k.r++ : k.w++; DATA.sk[q.sk] = k;
  if (q.word) { const w = DATA.w[q.word] || { r: 0, w: 0 }; ok ? w.r++ : w.w++; w.last = ok ? 1 : 0; DATA.w[q.word] = w; }
  if (ok) DATA.candies++;
  save();
}
const isMistake = (q) => { const s = DATA.q[q.id]; return s ? s.last === 0 : !!q.paper; };
const mastery = (t) => { if (t === 6) return WORDS.filter((w) => DATA.w[w.id] && DATA.w[w.id].last === 1).length / WORDS.length; const qs = ORIG.filter((q) => q.t === t); return qs.filter((q) => DATA.q[q.id] && DATA.q[q.id].last === 1).length / qs.length; };
function weakSkills(t) {
  const list = Object.keys(SKILLS).filter((s) => (t ? SKILLS[s].t === t : true) && GEN[s]);
  return list.map((s) => { const k = DATA.sk[s] || { r: 0, w: 0 }; const paperW = ORIG.filter((q) => q.sk === s && isMistake(q)).length; return { s, w: (k.w + 1 + paperW) / (k.r + 1) }; });
}
function pickWeighted(items) { const tot = items.reduce((a, b) => a + b.w, 0); let r = Math.random() * tot; for (const it of items) { r -= it.w; if (r <= 0) return it.s; } return items[items.length - 1].s; }
const genFor = (skill) => GEN[skill]();

// ---------- jar picture ----------
function jarSvg(t, frac) {
  const slots = []; const rowsY = [124, 110, 96, 82, 68, 54];
  rowsY.forEach((y, ri) => (ri % 2 ? [35, 53, 71, 89] : [26, 44, 62, 80, 98]).forEach((x) => slots.push([x, y])));
  const n = Math.round(frac * slots.length);
  let candies = '';
  for (let i = 0; i < n; i++) {
    const [x, y] = slots[i]; const tone = i % 3 === 0 ? 'opacity="0.75"' : '';
    if (i % 4 === 1) candies += `<g transform="translate(${x},${y}) rotate(${(i * 37) % 60 - 30})"><polygon points="-12,-5 -7,0 -12,5" style="fill:${TC[t]}"/><polygon points="12,-5 7,0 12,5" style="fill:${TC[t]}"/><ellipse rx="8" ry="6" style="fill:${TC[t]}" ${tone}/></g>`;
    else candies += `<circle cx="${x}" cy="${y}" r="7.5" style="fill:${TC[t]}" ${tone}/><circle cx="${x - 2.5}" cy="${y - 2.5}" r="2" fill="#fff" opacity="0.7"/>`;
  }
  return `<svg class="jarsvg" viewBox="0 0 120 140" aria-hidden="true">
    <rect x="34" y="6" width="52" height="16" rx="6" style="fill:${TC[t]}"/>
    <rect x="30" y="20" width="60" height="10" rx="4" style="fill:var(--line)"/>
    <path d="M30 30 C14 34 10 44 10 58 L10 118 C10 130 18 136 30 136 L90 136 C102 136 110 130 110 118 L110 58 C110 44 106 34 90 30 Z" style="fill:var(--glass);stroke:var(--line)" stroke-width="3"/>
    <clipPath id="jc${t}"><path d="M30 30 C14 34 10 44 10 58 L10 118 C10 130 18 136 30 136 L90 136 C102 136 110 130 110 118 L110 58 C110 44 106 34 90 30 Z"/></clipPath>
    <g clip-path="url(#jc${t})">${candies}</g>
    <path d="M20 56 C20 48 24 42 30 40" stroke="#fff" stroke-width="4" fill="none" opacity="0.6" stroke-linecap="round"/>
    <text x="60" y="18" text-anchor="middle" font-family="var(--font-display)" font-size="11" font-weight="700" fill="#3a1f43">${t}</text>
  </svg>`;
}
const logo = `<svg viewBox="0 0 40 40" aria-hidden="true"><polygon points="2,12 10,20 2,28" style="fill:var(--berry)"/><polygon points="38,12 30,20 38,28" style="fill:var(--berry)"/><circle cx="20" cy="20" r="12" style="fill:var(--berry)"/><path d="M12 16 Q20 10 28 16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/><circle cx="16" cy="22" r="2" fill="#fff" opacity="0.8"/></svg>`;

// ---------- views ----------
let VIEW = { name: 'home' };
const app = () => $('#app');
function shell(inner) {
  app().innerHTML = `<header class="bar"><div class="wrap bar-in"><button class="brand" id="home" aria-label="Home">${logo}<span>Candy Math</span></button><span class="spacer"></span><span class="sync" id="sync"></span><span class="pill" id="candy" title="Candies earned">${candyIcon()} <span id="cn">${DATA.candies}</span></span></div></header><main class="wrap" id="main"></main>`;
  $('#home').onclick = () => go({ name: 'home' });
  $('#main').append(...(Array.isArray(inner) ? inner : [inner]));
}
const candyIcon = () => `<svg width="20" height="20" viewBox="0 0 40 40" aria-hidden="true"><polygon points="2,12 10,20 2,28" style="fill:var(--accent)"/><polygon points="38,12 30,20 38,28" style="fill:var(--accent)"/><circle cx="20" cy="20" r="11" style="fill:var(--accent)"/></svg>`;
function updateCandy(bump) { const el = $('#cn'); if (el) el.textContent = DATA.candies; if (bump) { const p = $('#candy'); p.classList.remove('bump'); void p.offsetWidth; p.classList.add('bump'); } }
function go(v) { if (TIMER) { clearInterval(TIMER); TIMER = null; } VIEW = v; render(); window.scrollTo(0, 0); }
function render() {
  if (VIEW.name === 'home') return renderHome();
  if (VIEW.name === 'quiz') return renderQuiz();
  if (VIEW.name === 'result') return renderResult();
  if (VIEW.name === 'report') return renderReport();
  if (VIEW.name === 'words') return renderWords();
}

function renderHome() {
  const frag = h('div');
  const mistakes = ORIG.filter(isMistake).length;
  frag.append(h('section', { class: 'hello' }, `<h1>Grade 4 Maths: End of Semester 1</h1><p>Fill every jar with candy before the test!</p>`));
  const jars = h('section', { class: 'jars' });
  TOPICS.forEach((tp) => {
    const m = mastery(tp.id); const n = tp.id === 6 ? WORDS.length : ORIG.filter((q) => q.t === tp.id).length;
    const c = h('div', { class: 'jar' }, `${jarSvg(tp.id, m)}<h3>${tp.name}</h3><div class="meta">${tp.sheet} · ${Math.round(m * n)}/${n} ${tp.id === 6 ? 'known' : 'solved'}</div>`);
    const acts = h('div', { class: 'acts' });
    if (tp.id === 6) acts.append(h('button', { class: 'btn', onclick: () => go({ name: 'words' }) }, 'Word list'), h('button', { class: 'btn soft', onclick: startWords }, 'Quiz'));
    else acts.append(h('button', { class: 'btn', onclick: () => startWorksheet(tp.id) }, 'Worksheet'), h('button', { class: 'btn soft', onclick: () => startPractice(tp.id) }, 'Practice'));
    c.append(acts); jars.append(c);
  });
  frag.append(jars);
  const big = h('section', { class: 'big-acts' });
  const mt = h('button', { class: 'action', onclick: startMock }, `<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="31" r="21" style="fill:var(--grape)"/><circle cx="28" cy="31" r="16" style="fill:var(--card)"/><rect x="25" y="4" width="6" height="8" rx="2" style="fill:var(--grape)"/><path d="M28 31 L28 20 M28 31 L36 35" style="stroke:var(--ink)" stroke-width="3" stroke-linecap="round"/></svg><div><h3>Mock test</h3><p>20 mixed questions, timed, no hints</p></div>`);
  const fx = h('button', { class: 'action', onclick: startMistakes, disabled: false }, `<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="24" style="fill:var(--berry)"/><path d="M17 29 L25 37 L40 20" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><div><h3>Fix my mistakes</h3><p>${mistakes ? `${mistakes} worksheet question${mistakes > 1 ? 's' : ''} to fix, plus practice on weak spots` : 'Nothing left to fix. Practise your weakest skills'}</p></div>`);
  big.append(mt, fx);
  frag.append(big);
  const foot = h('div', { class: 'foot' });
  foot.append(h('button', { class: 'link', onclick: () => go({ name: 'report' }) }, 'Progress report'));
  frag.append(foot);
  shell(frag);
}

// ---------- sessions ----------
function startWorksheet(t) {
  const qs = ORIG.filter((q) => q.t === t);
  const todo = qs.filter((q) => !(DATA.q[q.id] && DATA.q[q.id].last === 1));
  const list = todo.length ? todo.concat(qs.filter((q) => !todo.includes(q))) : qs.slice();
  startQuiz({ title: TOPICS[t - 1].name, mode: 'learn', qs: list.slice(0, todo.length || list.length) });
}
function startPractice(t) {
  const w = weakSkills(t); const qs = []; for (let i = 0; i < 10; i++) qs.push(genFor(pickWeighted(w)));
  startQuiz({ title: TOPICS[t - 1].name + ': practice', mode: 'learn', qs });
}
function startMistakes() {
  const m = R.shuffle(ORIG.filter(isMistake)).slice(0, 15);
  const w = weakSkills().sort((a, b) => b.w - a.w).slice(0, 6); const g = []; for (let i = 0; i < (m.length ? 5 : 12); i++) g.push(genFor(pickWeighted(w)));
  startQuiz({ title: 'Fix my mistakes', mode: 'learn', qs: m.concat(g) });
}
function startMock() {
  const qs = [];
  TOPICS.filter((tp) => tp.id !== 6).forEach((tp) => {
    R.shuffle(ORIG.filter((q) => q.t === tp.id && q.k !== 'grid' && q.k !== 'dots')).slice(0, 2).forEach((q) => qs.push(q));
    const sk = Object.keys(SKILLS).filter((s) => SKILLS[s].t === tp.id); R.shuffle(sk).slice(0, 2).forEach((s) => qs.push(genFor(s)));
  });
  startQuiz({ title: 'Mock test', mode: 'test', qs: R.shuffle(qs) });
}
function startWords() {
  const items = WORDS.map((w) => { const st = DATA.w[w.id]; const base = w.cat === 'cmd' || w.cat === 'op' ? 2 : 1; const k = !st ? 1.5 : st.last === 0 ? 3 : 0.4; return { s: w.id, w: base * k * (1 + (DATA.look[w.id] || 0) * 0.3) }; });
  const qs = []; const used = new Set();
  while (qs.length < 7) { const id = pickWeighted(items); if (used.has(id)) continue; used.add(id); qs.push(wordQuestion(WORD_BY_ID[id])); }
  for (let i = 0; i < 3; i++) qs.push(clozeQuestion());
  startQuiz({ title: 'Maths words', mode: 'learn', qs: R.shuffle(qs) });
}
let TIMER = null;
function startQuiz(s) {
  if (!s.qs.length) return;
  VIEW = { name: 'quiz', s: Object.assign(s, { i: 0, results: [], started: Date.now(), candies: 0 }) };
  newQ(); render(); window.scrollTo(0, 0);
}
function newQ() {
  const s = VIEW.s; const q = s.qs[s.i];
  s.cur = { q, tries: 0, done: false, hint: false, fb: null, resp: emptyResp(q), focus: 0, sel: null };
}
function emptyResp(q) {
  switch (q.k) { case 'in': return q.parts.map(() => ''); case 'mc': return null; case 'multi': return []; case 'rows': return q.rows.map((r) => r.a.map(() => null)); case 'order': return []; case 'match': return q.L.map(() => null); case 'grid': return new Set(); case 'dots': return []; }
}

// ---------- quiz rendering ----------
function renderQuiz() {
  const s = VIEW.s, c = s.cur, q = c.q;
  const top = h('div', { class: 'qtop' });
  top.append(h('h2', {}, s.title));
  const tr = h('div', { class: 'track', 'aria-label': `Question ${s.i + 1} of ${s.qs.length}` });
  s.qs.forEach((_, i) => tr.append(h('i', { class: i < s.results.length ? (s.results[i] ? 'ok' : 'no') : i === s.i ? 'now' : '' })));
  top.append(tr);
  if (s.mode === 'test') { const tm = h('span', { class: 'timer', id: 'tm' }); top.append(tm); }
  const card = h('section', { class: 'card' });
  const chips = h('div', { class: 'chips' });
  chips.append(h('span', { class: 'chip' }, `${s.i + 1} / ${s.qs.length}`));
  chips.append(h('span', { class: 'chip' }, q.gen ? (q.src && q.src !== 'Practice' ? q.src + ' · new numbers' : 'New practice question') : q.src));
  if (!q.gen && s.mode === 'learn' && isMistake(q)) chips.append(h('span', { class: 'chip warn' }, (DATA.q[q.id] ? 'Missed last time' : 'Missed on paper')));
  card.append(chips);
  const gl = (t) => fmtText(q.t === 6 ? t : glossify(t));
  card.append(h('div', { class: 'prompt' }, gl(q.q)));
  if (q.fig) card.append(h('div', { class: 'figwrap' }, fmtText(q.fig)));
  card.append(widget(q, c, gl));
  if (c.read && !c.done) card.append(readBox(q));
  if (c.fb) card.append(c.fb);
  const acts = h('div', { class: 'qacts' });
  if (!c.done) {
    acts.append(h('button', { class: 'btn big', id: 'check', onclick: check }, s.mode === 'test' ? 'Submit' : 'Check'));
    if (s.mode === 'learn' && q.t !== 6 && !c.read) acts.append(h('button', { class: 'btn soft', onclick: () => { c.read = true; renderQuiz(); } }, 'Đề hỏi gì?'));
    if (s.mode === 'learn' && !c.hint) acts.append(h('button', { class: 'btn soft', onclick: () => { c.hint = true; c.fb = hintBox(q); renderQuiz(); } }, 'Gợi ý'));
  } else acts.append(h('button', { class: 'btn big', id: 'next', onclick: next }, s.i + 1 < s.qs.length ? 'Next' : 'Finish'));
  if (s.mode === 'learn' && !c.done) acts.append(h('button', { class: 'link', onclick: () => giveUp() }, 'Show answer'));
  card.append(acts);
  const back = h('div', { class: 'foot' }); back.append(h('button', { class: 'link', onclick: () => go({ name: 'home' }) }, s.mode === 'test' ? 'Stop the test' : 'Back to jars'));
  shell([top, card, back]);
  if (s.mode === 'test') { const tick = () => { const el = $('#tm'); if (!el) return; const sec = Math.floor((Date.now() - s.started) / 1000); el.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`; }; tick(); clearInterval(TIMER); TIMER = setInterval(tick, 1000); }
  const fi = $('.ans.on'); if (fi && !coarse) fi.focus({ preventScroll: true });
}
function readBox(q) {
  const v = q.vi || VI[q.id]; const rows = [];
  if (v && v[0]) rows.push(['Cho biết', v[0]]);
  if (v && v[1]) rows.push(['Hỏi', v[1]]);
  rows.push(['Cách trả lời', (v && v[2]) || howTo(q)]);
  if (!v) rows.push(['Mẹo', 'Chạm vào chữ gạch chân để xem nghĩa tiếng Việt.']);
  return h('div', { class: 'feedback read' }, rows.map(([k, t]) => `<div><b>${k}:</b> ${fmtText(t.replace(/(\d+)\/(\d+)/g, '[[$1/$2]]'))}</div>`).join(''));
}
function hintBox(q) { return h('div', { class: 'feedback hint' }, `<div><b>Gợi ý:</b> ${SKILLS[q.sk].vi}</div>`); }

function widget(q, c, gl = fmtText) {
  const lock = c.done;
  const mark = c.markResult; // undefined | true | false after check
  const cls = (base) => base + (lock && mark !== undefined ? (mark ? ' ok' : ' no') : '');
  switch (q.k) {
    case 'in': {
      const box = h('div', { class: 'parts' });
      q.parts.forEach((p, i) => {
        const row = h('div', { class: 'part' });
        if (p.pre) row.append(h('span', {}, gl(p.pre)));
        const inp = h('input', { class: cls('ans' + (i === c.focus && !lock ? ' on' : '')), value: c.resp[i], 'aria-label': `Answer ${i + 1}`, autocomplete: 'off', inputmode: coarse ? 'none' : 'text', readonly: lock || false, size: Math.max(4, String(c.resp[i]).length + 1) });
        inp.addEventListener('input', () => { c.resp[i] = inp.value; inp.size = Math.max(4, inp.value.length + 1); });
        inp.addEventListener('focus', () => { c.focus = i; document.querySelectorAll('.ans').forEach((e, j) => e.classList.toggle('on', j === i && !lock)); });
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); if (i + 1 < q.parts.length) document.querySelectorAll('.ans')[i + 1].focus(); else check(); } });
        row.append(inp);
        if (p.post) row.append(h('span', {}, gl(p.post)));
        box.append(row);
      });
      if (!lock) box.append(keypad(q, c));
      return box;
    }
    case 'mc': case 'multi': {
      const multi = q.k === 'multi';
      const allText = q.opts.every((o) => !/<svg/.test(o));
      const dense = !!q.cols;
      const box = h('div', { class: 'opts' + (dense ? ' dense' : allText && q.opts.some((o) => o.length > 18) ? ' text' : '') });
      if (dense) box.style.setProperty('--cols', q.cols);
      q.opts.forEach((o, i) => {
        const sel = multi ? c.resp.includes(i) : c.resp === i;
        let k = 'opt' + (sel ? ' sel' : '');
        if (lock && c.reveal) { const right = multi ? q.a.includes(i) : q.a === i; if (right) k += ' ok'; else if (sel) k += ' no'; }
        const b = h('button', { class: k, 'aria-pressed': sel ? 'true' : 'false', disabled: lock || false }, (multi && !dense ? `<span class="tick">${sel ? '✓' : ''}</span>` : '') + `<span>${fmtText(o)}</span>`);
        b.onclick = () => {
          if (multi) { const j = c.resp.indexOf(i); if (j >= 0) c.resp.splice(j, 1); else { if (q.exact && c.resp.length >= q.exact) c.resp.shift(); c.resp.push(i); } }
          else c.resp = i;
          renderQuiz();
        };
        box.append(b);
      });
      if (multi && q.exact) { const w = h('div'); w.append(box, h('div', { class: 'count' }, `Choose ${q.exact}`)); return w; }
      return box;
    }
    case 'rows': {
      const box = h('div', { class: 'rowq' });
      q.rows.forEach((r, ri) => {
        const line = h('div', { class: 'rowline' }); const bits = r.t.split('{}');
        bits.forEach((b, bi) => {
          if (b) line.append(h('span', {}, gl(b)));
          if (bi < bits.length - 1) {
            const ok = lock && c.reveal ? c.resp[ri][bi] === r.a[bi] : null;
            const seg = h('div', { class: 'seg' + (ok === true ? ' ok' : ok === false ? ' no' : ''), role: 'group' });
            r.ch.forEach((ch) => seg.append(h('button', { class: c.resp[ri][bi] === ch ? 'sel' : '', disabled: lock || false, onclick: () => { c.resp[ri][bi] = ch; renderQuiz(); } }, fmtText(/\//.test(ch) ? fx(ch) : ch))));
            line.append(seg);
          }
        });
        box.append(line);
      });
      return box;
    }
    case 'order': {
      const box = h('div', { class: 'rowq' });
      const slots = h('div', { class: cls('order-slots') });
      c.resp.forEach((it, i) => slots.append(h('button', { class: 'ochip', disabled: lock || false, onclick: () => { c.resp.splice(i, 1); renderQuiz(); } }, it)));
      if (!c.resp.length) slots.append(h('span', { class: 'count' }, 'Tap the numbers from smallest to largest'));
      const pool = h('div', { class: 'order-pool' });
      if (!lock) (c.pool || (c.pool = R.shuffle(q.items))).forEach((it) => { if (!c.resp.includes(it)) pool.append(h('button', { class: 'ochip', onclick: () => { c.resp.push(it); renderQuiz(); } }, it)); });
      box.append(slots, pool);
      return box;
    }
    case 'match': {
      const palette = ['var(--lemon)', 'var(--mint)', 'var(--grape)', 'var(--peach)', 'var(--berry)'];
      const box = h('div', { class: 'match' });
      const L = h('div', { class: 'col' }), Rc = h('div', { class: 'col' });
      q.L.forEach((l, i) => {
        const r = c.resp[i]; let k = 'mitem' + (c.sel === i ? ' sel' : '');
        if (lock && c.reveal) k += r === q.a[i] ? ' ok' : ' no';
        L.append(h('button', { class: k, disabled: lock || false, onclick: () => { c.sel = i; renderQuiz(); } }, `<span>${fmtText(l)}</span>${r != null ? `<span class="tag" style="background:${palette[i]}">${i + 1}</span>` : '<span></span>'}`));
      });
      q.R.forEach((rr, j) => {
        const owner = c.resp.indexOf(j);
        Rc.append(h('button', { class: 'mitem', disabled: lock || false, onclick: () => { if (c.sel == null) return; c.resp = c.resp.map((x) => (x === j ? null : x)); c.resp[c.sel] = j; const nx = c.resp.indexOf(null); c.sel = nx >= 0 ? nx : null; renderQuiz(); } }, `<span>${fmtText(rr)}</span>${owner >= 0 ? `<span class="tag" style="background:${palette[owner]}">${owner + 1}</span>` : '<span></span>'}`));
      });
      if (c.sel == null && !lock && c.resp.includes(null)) c.sel = c.resp.indexOf(null);
      box.append(L, Rc);
      const w = h('div', { class: 'rowq' }); w.append(h('div', { class: 'count' }, 'Tap an item on the left, then its partner on the right'), box);
      return w;
    }
    case 'grid': {
      const cs = q.small ? 28 : 44; const W = q.cols * cs + 4, H = q.rows * cs + 4;
      let s = '';
      const given = new Set(q.given.map(([r, cc]) => r + ',' + cc));
      for (let r = 0; r < q.rows; r++) for (let cc = 0; cc < q.cols; cc++) {
        const k = r + ',' + cc; const cl = given.has(k) ? 'given' : c.resp.has(k) ? (lock && c.reveal && c.markResult ? 'exp' : 'mine') : '';
        s += `<rect class="cell ${cl}" data-k="${k}" x="${2 + cc * cs}" y="${2 + r * cs}" width="${cs}" height="${cs}"/>`;
      }
      if (q.diag) s += `<line class="mirror" x1="2" y1="2" x2="${W - 2}" y2="${H - 2}"/>`;
      const wrap = h('div', { class: 'figwrap' }, `<svg class="board" viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;height:auto">${s}</svg>`);
      if (!lock) wrap.querySelector('svg').addEventListener('click', (e) => { const k = e.target.getAttribute && e.target.getAttribute('data-k'); if (!k || given.has(k)) return; if (c.resp.has(k)) c.resp.delete(k); else c.resp.add(k); renderQuiz(); });
      const w = h('div', { class: 'rowq' }); w.append(wrap, h('div', { class: 'count' }, `Shaded ${c.resp.size} of ${q.need}`));
      return w;
    }
    case 'dots': {
      const pts = q.pts; const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      const minX = Math.min(...xs), minY = Math.min(...ys), maxX = Math.max(...xs), maxY = Math.max(...ys);
      const sc = q.ring ? 40 : 56; const pad = 30;
      const X = (p) => pad + (p[0] - minX) * sc, Y = (p) => pad + (p[1] - minY) * sc;
      const W = (maxX - minX) * sc + pad * 2, H = (maxY - minY) * sc + pad * 2;
      let s = '';
      if (q.ring) s += `<circle class="ring" cx="${X([0, 0])}" cy="${Y([0, 0])}" r="${3 * sc}"/>`;
      if (c.resp.length >= 2) s += `<polygon class="tri" points="${c.resp.map((i) => X(pts[i]) + ',' + Y(pts[i])).join(' ')}"/>`;
      pts.forEach((p, i) => { const sel = c.resp.includes(i); s += `<circle class="dot ${sel ? 'sel' : ''}" cx="${X(p)}" cy="${Y(p)}" r="${sel ? 9 : 6}"/><circle class="hit" data-i="${i}" cx="${X(p)}" cy="${Y(p)}" r="20"/>`; });
      const wrap = h('div', { class: 'figwrap' }, `<svg class="board" viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;height:auto">${s}</svg>`);
      if (!lock) wrap.querySelector('svg').addEventListener('click', (e) => { const i = e.target.getAttribute && e.target.getAttribute('data-i'); if (i == null) return; const n = +i; const j = c.resp.indexOf(n); if (j >= 0) c.resp.splice(j, 1); else { if (c.resp.length >= q.need) c.resp.shift(); c.resp.push(n); } renderQuiz(); });
      const w = h('div', { class: 'rowq' }); w.append(wrap, h('div', { class: 'count' }, `Chosen ${c.resp.length} of ${q.need} points. Tap a point again to remove it.`));
      return w;
    }
  }
  return h('div');
}
function keypad(q, c) {
  const kp = h('div', { class: 'keypad', 'aria-label': 'Number keypad' });
  const keys = ['7', '8', '9', '⌫', '4', '5', '6', '/', '1', '2', '3', '−', '0', '.', 'space', 'next'];
  keys.forEach((k) => {
    const label = k === 'space' ? 'gap' : k === 'next' ? 'next ▸' : k;
    kp.append(h('button', { class: k.length > 1 && k !== '⌫' ? 'k-wide' : '', 'aria-label': k === 'space' ? 'space (for mixed numbers)' : k === 'next' ? 'next box' : k, onclick: (e) => {
      e.preventDefault(); const i = c.focus; let v = c.resp[i] || '';
      if (k === '⌫') v = v.slice(0, -1);
      else if (k === 'next') { c.focus = (i + 1) % q.parts.length; renderQuiz(); return; }
      else if (k === 'space') v += ' ';
      else v += k === '−' ? '-' : k;
      c.resp[i] = v; const inp = document.querySelectorAll('.ans')[i]; if (inp) { inp.value = v; inp.size = Math.max(4, v.length + 1); }
    } }, label));
  });
  return kp;
}

// ---------- checking ----------
function respFor(q, c) { return q.k === 'in' ? c.resp.map((x) => String(x || '')) : c.resp; }
function incomplete(q, c) {
  switch (q.k) {
    case 'in': return c.resp.some((x) => !String(x || '').trim());
    case 'mc': return c.resp == null;
    case 'multi': return q.exact ? c.resp.length !== q.exact : c.resp.length === 0;
    case 'rows': return c.resp.some((r) => r.some((x) => x == null));
    case 'order': return c.resp.length !== q.items.length;
    case 'match': return c.resp.some((x) => x == null);
    case 'grid': return c.resp.size !== q.need;
    case 'dots': return c.resp.length !== q.need;
  }
}
function check() {
  const s = VIEW.s, c = s.cur, q = c.q;
  if (incomplete(q, c)) {
    let msg = 'Answer every part first.';
    if (q.k === 'in' && c.resp.some((x) => String(x || '').trim() && !parse(x))) msg = 'Type a number, like 12, 3.5, −4, 3/4 or 2 1/3.';
    if (q.k === 'grid') msg = `Shade exactly ${q.need} square${q.need > 1 ? 's' : ''}.`;
    if (q.k === 'dots') msg = `Choose exactly ${q.need} points.`;
    c.fb = h('div', { class: 'feedback hint' }, msg); renderQuiz(); return;
  }
  if (q.k === 'in' && c.resp.some((x) => !parse(x))) { c.fb = h('div', { class: 'feedback hint' }, 'Type a number, like 12, 3.5, −4, 3/4 or 2 1/3. For a mixed number use the gap key: 2 1/3.'); renderQuiz(); return; }
  const ok = grade(q, respFor(q, c));
  c.tries++;
  if (s.mode === 'test') {
    s.results.push(ok); record(q, ok); if (ok) { s.candies++; updateCandy(true); }
    c.done = true; c.markResult = ok; c.reveal = false; c.fb = null; next(); return;
  }
  if (ok) {
    if (c.tries === 1) { record(q, true); s.candies++; updateCandy(true); burst(); }
    s.results.push(c.tries === 1);
    c.done = true; c.markResult = true; c.reveal = true;
    c.fb = h('div', { class: 'feedback ok' }, `<div>${R.pick(['Sweet! That is right.', 'Correct! One more candy for the jar.', 'Yes! Well done.', 'Perfect!'])}${c.tries > 1 ? ' (on the second try)' : ''}</div>${q.why ? `<div class="why">${fmtText(q.why)}</div>` : ''}`);
  } else if (c.tries === 1) {
    record(q, false);
    c.fb = h('div', { class: 'feedback no' }, `<div>Not quite. Have another go.</div><div class="why"><b>Gợi ý:</b> ${SKILLS[q.sk].vi}</div>`); c.hint = true;
  } else { reveal(false); return; }
  renderQuiz();
}
function giveUp() { const c = VIEW.s.cur; if (c.tries === 0) record(c.q, false); reveal(true); }
function reveal() {
  const s = VIEW.s, c = s.cur, q = c.q;
  s.results.push(false);
  c.done = true; c.markResult = true; c.reveal = true;
  const ex = exampleResp(q); c.resp = q.k === 'in' ? ex.slice() : ex;
  const extra = q.k === 'in' && q.check ? ' This is one possible answer.' : q.k === 'grid' || q.k === 'dots' ? ' This is one way to do it.' : '';
  c.fb = h('div', { class: 'feedback no' }, `<div>Here is the answer.${extra}</div>${q.why ? `<div class="why">${fmtText(q.why)}</div>` : ''}<div class="why"><b>Gợi ý:</b> ${SKILLS[q.sk].vi}</div>`);
  renderQuiz();
}
function next() {
  const s = VIEW.s;
  if (s.i + 1 >= s.qs.length) { s.secs = Math.round((Date.now() - s.started) / 1000); if (s.mode === 'test') { DATA.tests.push({ d: Date.now(), score: s.results.filter(Boolean).length, total: s.qs.length, secs: s.secs }); save(); } go({ name: 'result', s }); return; }
  s.i++; newQ(); renderQuiz(); window.scrollTo(0, 0);
}
function burst() {
  const b = $('#check') || $('#next'); const p = $('#candy'); if (!b || !p) return;
  const r = b.getBoundingClientRect(), t = p.getBoundingClientRect();
  const cols = [TC[1], TC[2], TC[3], TC[4], TC[5]];
  for (let i = 0; i < 8; i++) {
    const d = h('div', { class: 'burst' }); d.style.background = cols[i % 5]; d.style.left = r.left + r.width / 2 + 'px'; d.style.top = r.top + 'px'; document.body.append(d);
    const dx = t.left + t.width / 2 - (r.left + r.width / 2), dy = t.top - r.top;
    d.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx * 0.5 + (i - 4) * 18}px, ${dy * 0.4 - 60}px) scale(1.3)`, opacity: 1, offset: 0.4 }, { transform: `translate(${dx}px, ${dy}px) scale(0.4)`, opacity: 0.2 }], { duration: 750 + i * 40, easing: 'ease-in-out' }).onfinish = () => d.remove();
  }
}

// ---------- results ----------
function renderResult() {
  const s = VIEW.s; const right = s.results.filter(Boolean).length; const n = s.qs.length;
  const box = h('section', { class: 'result' });
  const msg = right === n ? 'A full jar! Amazing.' : right / n >= 0.8 ? 'Great work!' : right / n >= 0.5 ? 'Good effort. Keep practising!' : 'Every mistake is a lesson. Let\'s fix them!';
  box.append(h('div', { class: 'jarsvg-wrap' }, jarSvg(s.mode === 'test' ? 3 : (s.qs[0] && s.qs[0].t) || 1, right / n)));
  box.append(h('div', { class: 'score' }, `${right}/${n}`));
  box.append(h('h2', {}, msg));
  if (s.mode === 'test') box.append(h('p', { class: 'count' }, `Time: ${Math.floor(s.secs / 60)} min ${s.secs % 60} s`));
  const list = h('div', { class: 'rlist' });
  s.qs.forEach((q, i) => list.append(h('div', { class: 'rrow' }, `<b class="${s.results[i] ? 'ok' : 'no'}">${s.results[i] ? '✓' : '✗'}</b><span>${(q.gen ? 'Practice · ' : q.src + ' · ') + q.q.replace(/<[^>]+>/g, ' ').replace(/\[\[([^\]]+)\]\]/g, '$1')}</span>`)));
  box.append(list);
  const acts = h('div', { class: 'qacts' });
  if (s.results.some((x) => !x)) acts.append(h('button', { class: 'btn big', onclick: startMistakes }, 'Fix my mistakes'));
  acts.append(h('button', { class: 'btn big soft', onclick: () => go({ name: 'home' }) }, 'Back to jars'));
  box.append(acts);
  shell(box);
}
function renderReport() {
  const box = h('section', { class: 'report' });
  box.append(h('h1', {}, 'Progress report'));
  const tests = DATA.tests.slice(-5).reverse();
  if (tests.length) box.append(h('div', { class: 'rt' }, `<h3>Mock tests</h3>${tests.map((t) => `<div class="sk"><span>${new Date(t.d).toLocaleDateString()} · ${Math.floor(t.secs / 60)} min</span><span class="meter"><i style="width:${(t.score / t.total) * 100}%;background:var(--grape)"></i></span><span class="n">${t.score}/${t.total}</span></div>`).join('')}`));
  TOPICS.filter((tp) => tp.id !== 6).forEach((tp) => {
    const rows = Object.keys(SKILLS).filter((s) => SKILLS[s].t === tp.id).map((s) => {
      const k = DATA.sk[s] || { r: 0, w: 0 }; const tot = k.r + k.w; const pct = tot ? Math.round((k.r / tot) * 100) : null;
      return `<div class="sk"><span>${SKILLS[s].en}</span><span class="meter"><i style="width:${pct || 0}%;background:${TC[tp.id]}"></i></span><span class="n">${pct == null ? 'not yet' : pct + '%'}</span></div>`;
    }).join('');
    const left = ORIG.filter((q) => q.t === tp.id && isMistake(q)).map((q) => q.src.replace(/^.*· /, '')).join(', ');
    box.append(h('div', { class: 'rt' }, `<h3>${tp.sheet}: ${tp.name} · ${Math.round(mastery(tp.id) * 100)}% solved</h3>${rows}${left ? `<p class="count">Still to fix: ${left}</p>` : ''}`));
  });
  const looked = Object.entries(DATA.look || {}).sort((a, b) => b[1] - a[1]).slice(0, 12).filter(([id]) => WORD_BY_ID[id]);
  const weakW = WORDS.filter((w) => DATA.w[w.id] && DATA.w[w.id].last === 0).map((w) => w.en);
  box.append(h('div', { class: 'rt' }, `<h3>Maths words · ${WORDS.filter((w) => DATA.w[w.id] && DATA.w[w.id].last === 1).length}/${WORDS.length} known</h3>${looked.length ? `<p>Most looked-up: ${looked.map(([id, n]) => `${WORD_BY_ID[id].en} (${n})`).join(', ')}</p>` : '<p class="count">No words looked up yet.</p>'}${weakW.length ? `<p class="count">Still confused: ${weakW.join(', ')}</p>` : ''}`));
  const reset = h('div', { class: 'foot' });
  const rb = h('button', { class: 'link' }, 'Start over (clear all progress)');
  rb.onclick = () => { if (rb.dataset.armed) { DATA = blank(); save(); go({ name: 'home' }); } else { rb.dataset.armed = '1'; rb.textContent = 'Tap again to clear everything'; } };
  reset.append(rb); box.append(reset);
  shell(box);
}

// ---------- word popup ----------
function openWord(id) {
  const w = WORD_BY_ID[id]; if (!w) return;
  DATA.look[id] = (DATA.look[id] || 0) + 1; save();
  closeWord();
  const sh = h('div', { class: 'sheet-bg', id: 'wsheet', onclick: (e) => { if (e.target.id === 'wsheet') closeWord(); } });
  const card = h('div', { class: 'sheet', role: 'dialog', 'aria-label': w.en });
  card.innerHTML = `<div class="sheet-head"><h2>${w.en}</h2><button class="btn soft" id="wclose">Đóng</button></div><p class="sheet-vi">${w.vi}</p>${w.pic ? `<div class="figwrap">${w.pic()}</div>` : ''}${w.ex ? `<p class="sheet-ex">${fmtText(w.ex.replace(/(\d+)\/(\d+)/g, '[[$1/$2]]'))}</p>` : ''}<p class="count">${CAT_VI[w.cat]}</p>`;
  sh.append(card); document.body.append(sh);
  $('#wclose').onclick = closeWord; $('#wclose').focus();
}
function closeWord() { const e = $('#wsheet'); if (e) e.remove(); }
document.addEventListener('click', (e) => { const g = e.target.closest && e.target.closest('.gw'); if (g) { e.preventDefault(); e.stopPropagation(); openWord(g.dataset.w); } }, true);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeWord(); if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('gw')) { e.preventDefault(); openWord(e.target.dataset.w); } });

function renderWords() {
  const box = h('section', { class: 'report' });
  box.append(h('div', { class: 'hello' }, `<h1>Maths words</h1><p>Chạm vào một từ để xem nghĩa và hình minh họa.</p>`));
  const qa = h('div', { class: 'qacts' }); qa.append(h('button', { class: 'btn big', onclick: startWords }, 'Word quiz')); box.append(qa);
  Object.keys(CAT_VI).forEach((cat) => {
    const list = WORDS.filter((w) => w.cat === cat); const sec = h('div', { class: 'rt' });
    sec.append(h('h3', {}, CAT_VI[cat]));
    const wrap = h('div', { class: 'wordchips' });
    list.forEach((w) => { const st = DATA.w[w.id]; const cls = st ? (st.last === 1 ? ' known' : ' weak') : ''; wrap.append(h('button', { class: 'wchip' + cls, onclick: () => openWord(w.id) }, w.en)); });
    sec.append(wrap); box.append(sec);
  });
  shell(box);
}

render();
initCloud();
