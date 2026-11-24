// ===== Candy Math: pure logic (question bank, generators, grading) =====
// No DOM access here so it can be tested with node.

const R = {
  int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
  pick: (arr) => arr[Math.floor(Math.random() * arr.length)],
  shuffle: (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
};
const round6 = (x) => Math.round(x * 1e6) / 1e6;
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

// number to display string; groups of 3 with spaces for |x| >= 10000 (like the worksheets)
function nf(x) {
  x = round6(x);
  const neg = x < 0; const s = Math.abs(x).toString();
  let [i, d] = s.split('.');
  if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (neg ? '−' : '') + i + (d ? '.' + d : '');
}
const money = (x) => '$' + round6(x).toFixed(2);

// parse a typed answer
function parse(raw) {
  if (raw == null) return null;
  let s = String(raw).trim().replace(/[−–]/g, '-').replace(/[$%,]/g, '').replace(/\s*\/\s*/g, '/');
  if (!s) return null;
  let m = s.match(/^(-?)(\d+)\s+(\d+)\/(\d+)$/);
  if (m) { const d = +m[4]; if (!d) return null; const v = (+m[2] + +m[3] / d) * (m[1] ? -1 : 1); return { v, raw: s, isMixed: true, isFrac: false, num: +m[3], den: d, whole: +m[2] }; }
  m = s.match(/^(-?\d+)\/(\d+)$/);
  if (m) { const d = +m[2]; if (!d) return null; return { v: +m[1] / d, raw: s, isFrac: true, isMixed: false, num: +m[1], den: d }; }
  const t = s.replace(/\s+/g, '');
  m = t.match(/^-?(\d+\.?\d*|\.\d+)$/);
  if (m) { const dp = t.includes('.') ? t.split('.')[1].length : 0; return { v: parseFloat(t), raw: t, isFrac: false, isMixed: false, dp }; }
  return null;
}
const same = (a, b) => Math.abs(a - b) < 1e-9;
const N = (x) => (p) => !!p && same(p.v, x);
const ANY = (...xs) => (p) => !!p && xs.some((x) => same(p.v, x));
const F = (x) => (p) => !!p && same(p.v, x) && (p.isFrac || p.isMixed);
const M = (x) => (p) => !!p && same(p.v, x) && p.isMixed;
const isInt = (p) => !!p && Number.isInteger(p.v) && !p.isFrac && !p.isMixed;
const isPrime = (n) => { if (!Number.isInteger(n) || n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
const isSquare = (n) => Number.isInteger(n) && n > 0 && Number.isInteger(Math.sqrt(n));
const triNum = (n) => (n * (n + 1)) / 2;

// value of a "a/b" or "w a/b" string
function fv(s) { const p = parse(s); return p ? p.v : NaN; }

// ----- topics and skills -----
const TOPICS = [
  { id: 1, name: 'Decimals & Rounding', sheet: 'Revision 1', candy: 'Lemon drops', color: 'lemon' },
  { id: 2, name: 'Sequences & Special Numbers', sheet: 'Revision 2', candy: 'Mint swirls', color: 'mint' },
  { id: 3, name: 'Adding, Subtracting & Averages', sheet: 'Revision 3', candy: 'Strawberry chews', color: 'berry' },
  { id: 4, name: '2D & 3D Shapes, Symmetry', sheet: 'Revision 4', candy: 'Grape gummies', color: 'grape' },
  { id: 5, name: 'Fractions, Decimals & Percentages', sheet: 'Revision 5', candy: 'Peach rings', color: 'peach' },
];

const SKILLS = {
  x10: { t: 1, en: 'Multiply & divide by 10, 100, 1000', vi: 'Nhân 10 thì dời dấu phẩy sang phải 1 chữ số, nhân 100 dời 2, nhân 1000 dời 3. Chia thì dời sang trái.' },
  round: { t: 1, en: 'Rounding decimals', vi: 'Làm tròn đến số nguyên: nhìn chữ số hàng phần mười. Từ 5 trở lên thì làm tròn lên, nhỏ hơn 5 thì giữ nguyên.' },
  roundbig: { t: 1, en: 'Rounding big numbers', vi: 'Tìm chữ số ngay bên phải hàng cần làm tròn. Từ 5 trở lên thì tăng hàng đó thêm 1, còn lại giữ nguyên rồi thay các chữ số phía sau bằng 0.' },
  pv: { t: 1, en: 'Place value in decimals', vi: 'Sau dấu phẩy: chữ số đầu là phần mười (tenths), chữ số thứ hai là phần trăm (hundredths).' },
  order: { t: 1, en: 'Ordering decimals', vi: 'So sánh phần nguyên trước, nếu bằng nhau thì so phần mười, rồi phần trăm.' },
  logic1: { t: 1, en: 'Digit puzzles', vi: 'Đọc từng điều kiện một, gạch bỏ các chữ số không thỏa mãn, rồi chọn số lớn nhất hoặc nhỏ nhất.' },
  seq: { t: 2, en: 'Number sequences', vi: 'Tìm bước nhảy: lấy hai số liền nhau trừ cho nhau. Nếu biết hai số cách nhau k bước thì bước nhảy = hiệu ÷ k.' },
  neg: { t: 2, en: 'Counting back past zero', vi: 'Đếm lùi qua số 0 thì sang số âm: 3 − 5 = −2. Viết dãy số ra rồi đếm từng bước.' },
  tri: { t: 2, en: 'Triangular numbers', vi: 'Số tam giác: 1, 3, 6, 10, 15, 21, 28… Mỗi lần cộng thêm 1 nhiều hơn lần trước (+2, +3, +4…).' },
  sq: { t: 2, en: 'Square numbers', vi: 'Số chính phương = một số nhân với chính nó: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.' },
  prime: { t: 2, en: 'Prime & composite numbers', vi: 'Số nguyên tố có đúng 2 ước là 1 và chính nó. Số 1 không phải số nguyên tố cũng không phải hợp số.' },
  mult: { t: 2, en: 'Multiples & factors', vi: 'Bội (multiple) là kết quả của bảng nhân. Ước (factor) là số chia hết số đó.' },
  negadd: { t: 3, en: 'Adding with negative numbers', vi: 'Hình dung trục số: cộng thì đi sang phải, trừ thì đi sang trái.' },
  decadd: { t: 3, en: 'Adding & subtracting decimals', vi: 'Đặt các dấu phẩy thẳng cột rồi cộng hoặc trừ như số tự nhiên.' },
  avg: { t: 3, en: 'Median & mode', vi: 'Median: sắp xếp từ bé đến lớn rồi lấy số ở giữa. Mode: số xuất hiện nhiều lần nhất.' },
  money: { t: 3, en: 'Word problems', vi: 'Gạch chân các con số, viết từng phép tính một: mua hết bao nhiêu, rồi còn lại bao nhiêu.' },
  algebra: { t: 3, en: 'Symbols & missing numbers', vi: 'Mỗi ký hiệu là một số. Đếm xem có mấy ký hiệu giống nhau, bỏ phần số đi rồi chia đều.' },
  oddeven: { t: 3, en: 'Odd & even reasoning', vi: 'Lẻ + lẻ = chẵn, chẵn + lẻ = lẻ, chẵn + chẵn = chẵn.' },
  tri2d: { t: 4, en: 'Types of triangles', vi: 'Đều (equilateral): 3 cạnh bằng nhau. Cân (isosceles): 2 cạnh bằng nhau. Thường (scalene): 3 cạnh khác nhau.' },
  sym: { t: 4, en: 'Symmetry', vi: 'Gấp hình theo đường đối xứng thì hai nửa phải trùng khít nhau. Mỗi ô tô màu phải có ô "gương" ở phía bên kia.' },
  poly: { t: 4, en: 'Polygons & tessellation', vi: 'Tên theo số cạnh: 5 pentagon, 6 hexagon, 7 heptagon, 8 octagon. Tessellate là ghép khít không có khe hở.' },
  solid: { t: 4, en: '3D shapes & nets', vi: 'Gấp lưới hình lập phương trong đầu: hai ô cách nhau đúng một ô theo hàng thẳng là hai mặt đối diện.' },
  fof: { t: 5, en: 'Fraction of an amount', vi: 'Tìm 3/5 của 20: chia cho mẫu số (20 ÷ 5 = 4) rồi nhân với tử số (4 × 3 = 12).' },
  eqv: { t: 5, en: 'Fractions, decimals & percentages', vi: 'Đổi về phần trăm để so sánh: chia cho 100. Ví dụ 1/4 = 25/100 = 25% = 0.25.' },
  mixed: { t: 5, en: 'Mixed numbers', vi: '8/3: 8 chia 3 được 2 dư 2, vậy 8/3 = 2 2/3. Ngược lại 1 1/3 = 3/3 + 1/3 = 4/3.' },
  fdiv: { t: 5, en: 'Fractions as division', vi: 'a ÷ b = a/b. Chia một phân số cho n thì nhân mẫu số với n: 1/2 ÷ 4 = 1/8.' },
  fadd: { t: 5, en: 'Adding & comparing fractions', vi: 'Quy đồng mẫu số trước, rồi cộng hoặc so sánh tử số.' },
  pct: { t: 5, en: 'Percentages of shapes', vi: 'Đếm số phần được tô trên tổng số phần bằng nhau, rồi đổi phân số đó ra phần trăm.' },
};

// ----- inline helpers for prompt text -----
// [[3/4]] -> stacked fraction, [[2 1/3]] -> mixed number
function fmtText(s) {
  return String(s)
    .replace(/\[\[(-?\d+) (\d+)\/(\d+)\]\]/g, (_, w, n, d) => `<span class="mx">${w}<span class="fr"><span>${n}</span><span>${d}</span></span></span>`)
    .replace(/\[\[(-?\d+)\/(\d+)\]\]/g, (_, n, d) => `<span class="fr"><span>${n}</span><span>${d}</span></span>`);
}
// string "3/4" or "2 1/3" -> [[...]] markup
const fx = (s) => `[[${s}]]`;

// ----- SVG figures -----
const svg = (w, h, inner, cls = '') => `<svg class="fig ${cls}" viewBox="0 0 ${w} ${h}" width="${w}" style="max-width:100%;height:auto" role="img">${inner}</svg>`;
function dotTriangle(n, x0, y0, sp = 18, align = 'center') {
  let s = '';
  for (let r = 0; r < n; r++) {
    const cnt = r + 1;
    for (let c = 0; c < cnt; c++) {
      let x;
      if (align === 'center') x = x0 + (c - (cnt - 1) / 2) * sp;
      else if (align === 'left') x = x0 + c * sp;
      else x = x0 - c * sp;
      s += `<circle class="ink" cx="${x}" cy="${y0 + r * sp}" r="5"/>`;
    }
  }
  return s;
}
function triPatterns(ns, align = 'center', label = true) {
  const sp = 18; let x = 20, s = '';
  const H = Math.max(...ns) * sp + 30;
  ns.forEach((n) => {
    const w = (n - 1) * sp;
    const x0 = align === 'center' ? x + w / 2 : align === 'left' ? x : x + w;
    s += dotTriangle(n, x0, 14 + (Math.max(...ns) - n) * sp, sp, align);
    if (label) s += `<text class="lab" x="${x + w / 2}" y="${H - 2}" text-anchor="middle">${triNum(n)}</text>`;
    x += w + 50;
  });
  return svg(x, H + 4, s);
}
function dotArray(c, r, sp = 16) {
  let s = '';
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) s += `<circle class="ink" cx="${10 + j * sp}" cy="${10 + i * sp}" r="5"/>`;
  return svg(20 + (c - 1) * sp, 20 + (r - 1) * sp, s, 'opt');
}
function polyPts(n, cx, cy, rad, rot = -90) {
  const p = [];
  for (let i = 0; i < n; i++) { const a = ((rot + (360 / n) * i) * Math.PI) / 180; p.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]); }
  return p;
}
const ptsStr = (p) => p.map((q) => q.map((v) => v.toFixed(1)).join(',')).join(' ');
function pentagonParts(parts, shaded) {
  const P = polyPts(5, 80, 84, 70);
  const C = [80, 84];
  let pieces = [];
  if (parts === 5) for (let i = 0; i < 5; i++) pieces.push([C, P[i], P[(i + 1) % 5]]);
  else for (let i = 0; i < 5; i++) { const a = P[i], b = P[(i + 1) % 5]; const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; pieces.push([C, a, m]); pieces.push([C, m, b]); }
  let s = pieces.map((pc, i) => `<polygon points="${ptsStr(pc)}" class="${shaded.includes(i) ? 'shade' : 'paper'}"/>`).join('');
  s += `<circle class="ink" cx="80" cy="84" r="3"/>`;
  return svg(160, 160, s);
}
function numberLine(opts) {
  // opts: {from,to,ticks:[{v,top,bottom}], minor:step, w}
  const W = opts.w || 460, x0 = 30, x1 = W - 30, y = 70;
  const X = (v) => x0 + ((v - opts.from) / (opts.to - opts.from)) * (x1 - x0);
  let s = `<line class="stroke" x1="${x0}" y1="${y}" x2="${x1}" y2="${y}"/>`;
  if (opts.minor) for (let v = opts.from; v <= opts.to + 1e-9; v += opts.minor) s += `<line class="stroke thin" x1="${X(v)}" y1="${y - 6}" x2="${X(v)}" y2="${y + 6}"/>`;
  opts.ticks.forEach((t) => {
    s += `<line class="stroke" x1="${X(t.v)}" y1="${y - 10}" x2="${X(t.v)}" y2="${y + 10}"/>`;
    if (t.top) s += lab(X(t.v), y - 20, t.top);
    if (t.bottom) s += lab(X(t.v), y + 36, t.bottom);
  });
  (opts.arcs || []).forEach((a) => {
    const xa = X(a.from), xb = X(a.to);
    s += `<path class="stroke" fill="none" d="M${xa},${y - 4} Q${(xa + xb) / 2},${y - 50} ${xb},${y - 4}"/>`;
    if (a.label) s += lab((xa + xb) / 2, y - 36, a.label);
  });
  return svg(W, 120, s);
}
function lab(x, y, t) {
  if (t === 'BOX') return `<rect class="box" x="${x - 16}" y="${y - 16}" width="32" height="26" rx="5"/>`;
  if (/^[A-Z]$/.test(t)) return `<rect class="box" x="${x - 16}" y="${y - 16}" width="32" height="26" rx="5"/><text class="lab b" x="${x}" y="${y + 3}" text-anchor="middle">${t}</text>`;
  const m = String(t).match(/^(?:(\d+) )?(\d+)\/(\d+)$/);
  if (m) {
    const w = m[1] ? `<text class="lab" x="${x - 9}" y="${y + 2}" text-anchor="middle">${m[1]}</text>` : '';
    const dx = m[1] ? x + 5 : x;
    return `${w}<text class="lab sm" x="${dx}" y="${y - 6}" text-anchor="middle">${m[2]}</text><line class="stroke thin" x1="${dx - 7}" y1="${y - 2}" x2="${dx + 7}" y2="${y - 2}"/><text class="lab sm" x="${dx}" y="${y + 11}" text-anchor="middle">${m[3]}</text>`;
  }
  return `<text class="lab" x="${x}" y="${y}" text-anchor="middle">${t}</text>`;
}
function triangleFig(p, labels) {
  // p: three points in a 0..100 box
  let s = `<polygon class="paper strokeish" points="${ptsStr(p)}"/>`;
  if (labels) {
    const cx = (p[0][0] + p[1][0] + p[2][0]) / 3, cy = (p[0][1] + p[1][1] + p[2][1]) / 3;
    for (let i = 0; i < 3; i++) {
      const a = p[i], b = p[(i + 1) % 3]; let mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      const dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy) || 1; mx += (dx / d) * 14; my += (dy / d) * 14;
      s += `<text class="lab sm" x="${mx.toFixed(1)}" y="${(my + 4).toFixed(1)}" text-anchor="middle">${labels[i]}</text>`;
    }
  }
  return svg(150, 130, `<g transform="translate(25,15)">${s}</g>`, 'opt');
}
const SHAPES = {
  square: () => svg(90, 90, `<rect class="paper strokeish" x="10" y="10" width="70" height="70"/>`, 'opt'),
  rectangle: () => svg(120, 80, `<rect class="paper strokeish" x="10" y="15" width="100" height="50"/>`, 'opt'),
  hexagon: () => svg(100, 90, `<polygon class="paper strokeish" points="${ptsStr(polyPts(6, 50, 45, 40, 0))}"/>`, 'opt'),
  pentagon: () => svg(100, 95, `<polygon class="paper strokeish" points="${ptsStr(polyPts(5, 50, 52, 42))}"/>`, 'opt'),
  octagon: () => svg(100, 100, `<polygon class="paper strokeish" points="${ptsStr(polyPts(8, 50, 50, 42, -67.5))}"/>`, 'opt'),
  eqtri: () => svg(100, 90, `<polygon class="paper strokeish" points="${ptsStr(polyPts(3, 50, 55, 44))}"/>`, 'opt'),
  isotri: () => svg(100, 100, `<polygon class="paper strokeish" points="50,8 78,92 22,92"/>`, 'opt'),
  scalene: () => svg(110, 90, `<polygon class="paper strokeish" points="14,80 96,80 36,14"/>`, 'opt'),
  circle: () => svg(90, 90, `<circle class="paper strokeish" cx="45" cy="45" r="36"/>`, 'opt'),
  kite: () => svg(90, 110, `<polygon class="paper strokeish" points="45,8 78,40 45,102 12,40"/>`, 'opt'),
  parallelogram: () => svg(130, 80, `<polygon class="paper strokeish" points="35,12 122,12 95,68 8,68"/>`, 'opt'),
  heart: () => svg(100, 90, `<path class="paper strokeish" d="M50 80 C10 52 6 22 28 14 C40 10 48 18 50 26 C52 18 60 10 72 14 C94 22 90 52 50 80Z"/>`, 'opt'),
  semicircle: () => svg(110, 70, `<path class="paper strokeish" d="M10 60 A45 45 0 0 1 100 60 Z"/>`, 'opt'),
  rhombus: () => svg(100, 100, `<polygon class="paper strokeish" points="50,8 88,50 50,92 12,50"/>`, 'opt'),
};
function tableHtml(head, rows) {
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

// ----- question builders -----
// inq: parts = [[pre, ans, post, ex?], ...]; ans: number | "a/b" | "w a/b" | fn (needs ex) | null (question-level check)
function inq(o, parts) {
  const ps = parts.map(([pre, ans, post, ex]) => {
    let fn = ans, e = ex;
    if (typeof ans === 'number') { fn = N(ans); e = e ?? nf(ans); }
    else if (typeof ans === 'string') { const p = parse(ans); fn = p.isMixed ? M(p.v) : p.isFrac ? F(p.v) : N(p.v); e = e ?? ans; }
    return { pre: pre || '', post: post || '', fn, ex: e, wide: o.wide };
  });
  return Object.assign({ k: 'in', parts: ps }, o);
}
const mcq = (o, opts, a) => Object.assign({ k: 'mc', opts, a }, o);
const mul = (o, opts, a) => Object.assign({ k: 'multi', opts, a: a.slice().sort((x, y) => x - y) }, o);
const rowq = (o, rows) => Object.assign({ k: 'rows', rows }, o); // rows: [{t:'.. {} ..', ch:[..], a:[..]}]
const ordq = (o, items, asc = true) => Object.assign({ k: 'order', items, a: items.slice().sort((x, y) => (asc ? fv(x) - fv(y) : fv(y) - fv(x))) }, o);
const matq = (o, L, Rr, a) => Object.assign({ k: 'match', L, R: Rr, a }, o);

// ----- grid helpers (symmetry) -----
const key = (r, c) => r + ',' + c;
function gridSet(cells) { return new Set(cells.map(([r, c]) => key(r, c))); }
function symCount(set, rows, cols) {
  const cells = [...set].map((k) => k.split(',').map(Number));
  const has = (r, c) => set.has(key(r, c));
  let n = 0;
  if (cells.every(([r, c]) => has(r, cols - 1 - c))) n++;
  if (cells.every(([r, c]) => has(rows - 1 - r, c))) n++;
  if (rows === cols) {
    if (cells.every(([r, c]) => has(c, r))) n++;
    if (cells.every(([r, c]) => has(cols - 1 - c, rows - 1 - r))) n++;
  }
  return n;
}
function gridq(o) { return Object.assign({ k: 'grid' }, o); }
// dots: choose points
function dotsq(o) { return Object.assign({ k: 'dots' }, o); }
const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
function triKind(p) {
  const [a, b, c] = p;
  const area = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]));
  if (area < 1e-6) return 'line';
  const s = [d2(a, b), d2(b, c), d2(c, a)];
  const eq = (x, y) => Math.abs(x - y) < 1e-6;
  const pairs = (eq(s[0], s[1]) ? 1 : 0) + (eq(s[1], s[2]) ? 1 : 0) + (eq(s[0], s[2]) ? 1 : 0);
  if (pairs === 3) return 'equilateral';
  if (pairs === 1) return 'isosceles';
  return 'scalene';
}
const sqLattice = (cols, rows, skip = []) => { const p = []; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (!skip.some(([a, b]) => a === r && b === c)) p.push([c, r]); return p; };
const triLattice = (n) => { const p = []; for (let r = 0; r < n; r++) for (let c = 0; c < n - (r % 2 ? 1 : 0); c++) p.push([c + (r % 2 ? 0.5 : 0), r * Math.sqrt(3) / 2]); return p; };
const circle12 = () => { const p = []; for (let i = 0; i < 12; i++) { const a = ((-90 + 30 * i) * Math.PI) / 180; p.push([Math.cos(a) * 3, Math.sin(a) * 3]); } return p; };

// ===================== ORIGINAL QUESTIONS (from the worksheets) =====================
const ORIG = [];
const add = (q) => ORIG.push(q);

// ---------- Topic 1: Revision 1 ----------
(function () {
  const T = 1, S = (n) => `Revision 1 · Q${n}`;
  add(rowq({ id: 'r1q1', t: T, sk: 'x10', src: S(1), q: 'Which statements are true? Which are false?' }, [
    { t: '325 ÷ 10 = 3.25 {}', ch: ['True', 'False'], a: ['False'] },
    { t: '503 700 ÷ 1000 = 50.37 {}', ch: ['True', 'False'], a: ['False'] },
    { t: '2690 × 100 = 26 900 {}', ch: ['True', 'False'], a: ['False'] },
    { t: '4560 ÷ 100 = 45.6 {}', ch: ['True', 'False'], a: ['True'] },
    { t: '101 × 10 = 1010 {}', ch: ['True', 'False'], a: ['True'] },
  ]));
  add(mul({ id: 'r1q2', t: T, sk: 'round', src: S(2), q: 'Which numbers round to 5? Tick all of them.' }, ['4.3', '4.5', '4.7', '4.9', '5.1', '5.3', '5.5'], [1, 2, 3, 4, 5]));
  add(inq({ id: 'r1q3', t: T, sk: 'x10', src: S(3), q: 'Complete the blanks.' }, [['200 ×', 5, '= 1000'], ['200 =', 20, '× 10']]));
  add(mul({ id: 'r1q4', t: T, sk: 'pv', src: S(4), q: 'Which statements could be regrouped as 32.23? Tick all of them.', why: '30 + 2.1 + 0.13 = 32.23 and 20 + 12.1 + 0.13 = 32.23' }, ['30 + 2.1 + 0.13', '30 + 12.1 + 1.13', '20 + 2.1 + 1.13', '20 + 12.1 + 0.13'], [0, 3]));
  add(inq({ id: 'r1q5', t: T, sk: 'pv', src: S(5), q: 'Write a decimal number between 2 and 3 which has exactly 3 tenths and 5 hundredths.' }, [['', 2.35, '']]));
  add(inq({ id: 'r1q6', t: T, sk: 'pv', src: S(6), q: 'Write a decimal number in each blank.' }, [['3 ones 4 tenths 5 hundredths =', 3.45, ''], ['3 tens 4 ones 5 tenths =', 34.5, ''], ['3 tens 4 tenths 5 hundredths =', 30.45, '']]));
  add(inq({ id: 'r1q7', t: T, sk: 'round', src: S(7), q: 'Eva chooses a number with 1 decimal place. Her number rounds to 7 when rounded to the nearest whole number. Write a number that Eva could choose.', why: 'Any number from 6.5 to 7.4 works.' }, [['', (p) => !!p && p.dp === 1 && p.v >= 6.5 - 1e-9 && p.v < 7.5 - 1e-9, '', '6.8']]));
  add(inq({ id: 'r1q8', t: T, sk: 'pv', src: S(8), q: 'Samira is thinking of a number between −10 and 0. It has 4 hundredths and no tenths. The ones digit is 6. Write down Samira\'s number as a decimal.', why: 'Between −10 and 0 means negative: −6.04' }, [['', -6.04, '']]));
  add(inq({ id: 'r1q9', t: T, sk: 'logic1', src: S(9), q: 'Anastasia chooses a 4-digit number. The digits are all odd. The digits are all different. Her number rounds to 1500 when rounded to the nearest 100. Write the largest number that Anastasia could choose.', why: 'Numbers that round to 1500 go from 1450 to 1549. Odd digits only, so the hundreds digit is 5. Tens: odd, below 5, not 1 or 5 → 3. Ones: largest odd digit left → 9. Answer 1539.' }, [['', 1539, '']]));
  const t10 = ['0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '20', '30', '40', '50', '60', '70', '80', '90'];
  add(mul({ id: 'r1q10', t: T, sk: 'pv', src: S(10), cols: 9, q: 'Draw a ring around four numbers that have a total of 37.52', why: '30 + 7 + 0.5 + 0.02 = 37.52' }, t10, [t10.indexOf('30'), t10.indexOf('7'), t10.indexOf('0.5'), t10.indexOf('0.02')]));
  add(inq({ id: 'r1q11', t: T, sk: 'round', src: S(11), q: 'Write a number in each box to make each sentence correct.', why: '35.1 → 35. 58.5 to 58.9 round to 59. 24.5 → 25. 0.0 to 0.4 round to 0.' }, [
    ['35.1 rounded to the nearest whole number is', 35, ''],
    ['58.', (p) => isInt(p) && p.v >= 5 && p.v <= 9 && p.raw.length === 1, 'rounded to the nearest whole number is 59', '7'],
    ['24.5 rounded to the nearest whole number is', 25, ''],
    ['0.', (p) => isInt(p) && p.v >= 0 && p.v <= 4 && p.raw.length === 1, 'rounded to the nearest whole number is 0', '3'],
  ]));
  add(inq({ id: 'r1q12', t: T, sk: 'x10', src: S(12), q: 'Write the correct number in the box.' }, [['', 1000, '× 1000 = 1 000 000']]));
  add(inq({ id: 'r1q13', t: T, sk: 'x10', src: S(13), q: 'Calculate.' }, [['8.7 ÷ 10 =', 0.87, ''], ['1694 ÷ 100 =', 16.94, '']]));
  add(mcq({ id: 'r1q14', t: T, sk: 'roundbig', src: S(14), q: 'The distance around the equator is 40 075 kilometres. A boy says: "I round 40 075 to the nearest 100, to the nearest 1000 and to the nearest 10 000. The answers are all the same." Is he correct?' }, [
    'Yes, they are all 40 000.',
    'No. To the nearest 100 it is 40 100, but to the nearest 1000 and 10 000 it is 40 000.',
    'No. All three answers are different.',
  ], 1));
  add(inq({ id: 'r1q15', t: T, sk: 'x10', src: S(15), q: 'Carlos shows the number 0.58 on a place value chart. He multiplies 0.58 by 10. What number does the chart show now?' }, [['0.58 × 10 =', 5.8, '']]));
  add(ordq({ id: 'r1q16', t: T, sk: 'order', src: S(16), q: 'Write the numbers in order from smallest to largest.' }, ['7.8', '8.6', '6.8', '7.6', '8.7']));
  add(inq({ id: 'r1q17', t: T, sk: 'round', src: S(17), q: 'What is the smallest number with 1 decimal place that gives 10 when rounded to the nearest whole number?', why: '9.5 rounds up to 10. 9.4 rounds down to 9.' }, [['', 9.5, '']]));
  add(mul({ id: 'r1q18', t: T, sk: 'round', src: S(18), q: 'Hassan rounds some measurements to the nearest centimetre. Tick all the answers that are wrong.', why: '2.6 → 3, 2.5 → 3, 1.4 → 1' }, ['A: 2.3 cm → 2 cm', 'B: 1.8 cm → 2 cm', 'C: 2.6 cm → 2 cm', 'D: 2.5 cm → 2 cm', 'E: 1.4 cm → 2 cm'], [2, 3, 4]));
  add(inq({ id: 'r1q19', t: T, sk: 'round', src: S(19), q: 'What is the largest decimal number with 2 decimal places that gives 50 when rounded to the nearest whole number?', why: '50.49 rounds down to 50. 50.50 would round up to 51.' }, [['', 50.49, '']]));
  add(inq({ id: 'r1q20', t: T, sk: 'round', src: S(20), q: 'What is the smallest decimal number with 2 decimal places that gives 50 when rounded to the nearest whole number?', why: '49.50 rounds up to 50. 49.49 would round down to 49.' }, [['', 49.5, '', '49.50']]));
  add(inq({
    id: 'r1q21', t: T, sk: 'logic1', src: S(21), q: 'Lily thinks of a 4-digit number. "My number has 8 ones and 3 thousands. The sum of the 4 digits is 12."<br>(a) Write a number Lily could be thinking of.<br>(b) Lily multiplies her number by 10. How many tens does the new number have?',
    why: '3 + 8 = 11, so the other two digits add to 1: 3108 or 3018. 3108 × 10 = 31 080, which is 3108 tens.',
    check: (ps) => { const a = ps[0], b = ps[1]; if (!isInt(a) || !isInt(b)) return false; const s = String(a.v); return s.length === 4 && s[0] === '3' && s[3] === '8' && [...s].reduce((x, y) => x + +y, 0) === 12 && b.v === a.v; },
  }, [['(a)', null, '', '3108'], ['(b)', null, 'tens', '3108']]));
  add(mcq({ id: 'r1q22', t: T, sk: 'pv', src: S(22), q: 'Which statement is equivalent to 30.83?' }, ['3 + 0 + 0.8 + 0.3', '30 + 0 + 0.8 + 0.3', '3 + 0 + 0.8 + 0.03', '30 + 0 + 0.8 + 0.03'], 3));
  add(mcq({ id: 'r1q23', t: T, sk: 'pv', src: S(23), q: 'In which number does the digit 3 represent 3 tenths?' }, ['234.5', '123.45', '12.34', '1.23'], 2));
  add(inq({ id: 'r1q24', t: T, sk: 'x10', src: S(24), q: 'Write the correct number in each box.', why: '37 × 100 ÷ 10 = 370, and 370 × 10 = 3700. 14.07 × 100 ÷ 10 = 140.7, and 14 070 ÷ 100 = 140.7' }, [['37 × 100 ÷ 10 ×', 10, '= 3700'], ['14.07 × 100 ÷ 10 =', 14070, '÷ 100']]));
  add(inq({ id: 'r1q25', t: T, sk: 'round', src: S(25), q: 'Round 106.3 to the nearest whole number.' }, [['', 106, '']]));
  add(mul({ id: 'r1q26', t: T, sk: 'roundbig', src: S(26), q: 'Tick all the numbers that round to 1 500 000 when rounded to the nearest 100 000.', why: 'Look at the ten-thousands digit. 1 540 000 → 1 500 000 and 1 450 000 → 1 500 000 (5 rounds up).' }, ['1 405 000', '1 540 000', '1 054 000', '1 045 000', '1 450 000'], [1, 4]));
  add(ordq({ id: 'r1q27', t: T, sk: 'order', src: S(27), q: 'Write the numbers in order, starting with the smallest.' }, ['3.2', '0.8', '2.6', '6.1', '2.3']));
})();

// ---------- Topic 2: Revision 2 ----------
(function () {
  const T = 2, S = (n) => `Revision 2 · Q${n}`;
  add(inq({ id: 'r2q1', t: T, sk: 'tri', src: S(1), fig: triPatterns([1, 2, 3]), q: 'Here are the first three triangular numbers. How many dots does the fourth triangular number have?', why: 'Add a new row of 4 dots: 6 + 4 = 10' }, [['', 10, 'dots']]));
  add(inq({ id: 'r2q2', t: T, sk: 'seq', src: S(2), q: 'The sequence continues in the same way. Write the missing numbers.', why: 'The step is +50.' }, [['', -50, ', 0, 50, 100,'], ['', 150, '']]));
  add(inq({ id: 'r2q3', t: T, sk: 'seq', src: S(3), q: 'The sequence continues in the same way. Write the missing numbers.', why: 'The step is −8: 7 − 8 = −1, −1 − 8 = −9' }, [['23, 15, 7,', -1, ','], ['', -9, '']]));
  add(inq({
    id: 'r2q4a', t: T, sk: 'prime', src: S('4a'), q: 'Write three different prime numbers with a total of 45.',
    why: 'For example 3 + 13 + 29 = 45 or 5 + 17 + 23 = 45.',
    check: (ps) => ps.every((p) => isInt(p) && isPrime(p.v)) && new Set(ps.map((p) => p.v)).size === 3 && ps.reduce((s, p) => s + p.v, 0) === 45,
  }, [['', null, '+', '3'], ['', null, '+', '13'], ['', null, '= 45', '29']]));
  add(inq({
    id: 'r2q4b', t: T, sk: 'prime', src: S('4b'), q: 'Write two different prime numbers with a total of 45.',
    why: '45 is odd, so one of the primes must be 2 (the only even prime): 2 + 43.',
    check: (ps) => ps.every((p) => isInt(p) && isPrime(p.v)) && ps[0].v !== ps[1].v && ps[0].v + ps[1].v === 45,
  }, [['', null, '+', '2'], ['', null, '= 45', '43']]));
  add(inq({ id: 'r2q5', t: T, sk: 'tri', src: S('5a'), q: 'Find the missing terms in the sequence.', why: '+2, +3, +4, then +5, +6, +7' }, [['1, 3, 6, 10,', 15, ','], ['', 21, ','], ['', 28, '']]));
  add(mcq({ id: 'r2q5b', t: T, sk: 'tri', src: S('5b'), q: 'What is the rule for the sequence 1, 3, 6, 10, 15 …?' }, ['Add 3 each time', 'Add 2, then 3, then 4 … (add one more each time)', 'Multiply by 2 each time', 'They are square numbers'], 1));
  add(inq({
    id: 'r2q6', t: T, sk: 'tri', src: S(6), q: 'Two consecutive triangular numbers total a square number. Write an example.',
    why: 'Triangular numbers: 1, 3, 6, 10, 15, 21. For example 6 + 10 = 16 = 4 × 4.',
    check: (ps) => { if (!ps.every(isInt)) return false; const [a, b, c] = ps.map((p) => p.v); for (let n = 1; n < 60; n++) if (triNum(n) === a && triNum(n + 1) === b) return a + b === c && isSquare(c); return false; },
  }, [['', null, '+', '6'], ['', null, '=', '10'], ['', null, '', '16']]));
  add(inq({ id: 'r2q7', t: T, sk: 'seq', src: S(7), q: 'Jamila\'s number cards decrease by the same amount each time. Write the missing numbers.', why: '19.5 to 10.5 is 3 steps: 9 ÷ 3 = 3. Each step is −3.' }, [['19.5,', 16.5, ','], ['', 13.5, ', 10.5,'], ['', 7.5, '']]));
  add(inq({
    id: 'r2q8', t: T, sk: 'sq', src: S(8), q: 'Fill in each box with a square number.',
    why: 'For example 9 + 16 = 25 or 36 + 64 = 100.',
    check: (ps) => ps.every((p) => isInt(p) && isSquare(p.v)) && ps[0].v + ps[1].v === ps[2].v,
  }, [['', null, '+', '9'], ['', null, '=', '16'], ['', null, '', '25']]));
  add(inq({
    id: 'r2q9', t: T, sk: 'mult', src: S(9), fig: tableHtml(['', 'Multiples of ▢A', 'Not multiples of ▢A'], [['<b>Multiples of ▢B</b>', '30, 105', '12, 36'], ['<b>Not multiples of ▢B</b>', '10, 25', '34, 13']]),
    q: 'Jamila sorts numbers in a Carroll diagram. What numbers go in box A and box B?', why: '30, 105, 10, 25 are multiples of 5. 30, 105, 12, 36 are multiples of 3.',
  }, [['A =', 5, ''], ['B =', 3, '']]));
  add(mcq({ id: 'r2q10', t: T, sk: 'prime', src: S(10), q: 'Is 43 a composite number?' }, ['Yes, because 43 has more than two factors.', 'No. 43 is prime: its only factors are 1 and 43.', 'Yes, because 43 is an odd number.'], 1));
  add(mcq({ id: 'r2q11', t: T, sk: 'mult', src: S(11), q: '"Any multiple of 100 is a multiple of 25." True or false?' }, ['True, because 100 = 4 × 25.', 'False, because 25 is odd.', 'False, because 100 is not in the 25 times table.'], 0));
  add(mcq({ id: 'r2q12', t: T, sk: 'prime', src: S(12), q: 'Tom says, "1 is not a prime number nor a composite number." Do you agree with Tom?' }, ['Yes. 1 has only one factor, so it is neither prime nor composite.', 'No. 1 is a prime number.', 'No. 1 is a composite number.'], 0));
  add(inq({ id: 'r2q13', t: T, sk: 'sq', src: S(13), q: 'Samira thinks of a number. She squares her number and subtracts 24. Her answer is 25. What number does Samira think of?', why: '25 + 24 = 49, and 7 × 7 = 49.' }, [['', 7, '']]));
  add(mcq({ id: 'r2q14', t: T, sk: 'prime', src: S(14), q: 'Is 1 a prime number?' }, ['Yes, because it can be divided by 1 and itself.', 'No. A prime number has exactly two factors, but 1 has only one factor.'], 1));
  add(inq({ id: 'r2q15', t: T, sk: 'neg', src: S(15), q: 'Tom counts back from 13 in steps of 5. Jerry counts back from 14 in steps of 7. What is the first number that they both say?', why: 'Tom: 13, 8, 3, −2, −7 … Jerry: 14, 7, 0, −7 …' }, [['', -7, '']]));
  add(inq({ id: 'r2q16', t: T, sk: 'seq', src: S(16), q: 'The same number is added each time. Fill the gaps and write the term that comes after 19.', why: '−5 to 19 is 3 steps: 24 ÷ 3 = 8.' }, [['−5,', 3, ','], ['', 11, ', 19,'], ['', 27, '']]));
  add(inq({ id: 'r2q17', t: T, sk: 'neg', src: S(17), q: 'Tom counts back in 4s starting at 17. Write the first two numbers less than 0 that Tom will say.', why: '17, 13, 9, 5, 1, −3, −7' }, [['', -3, 'and'], ['', -7, '']]));
  add(inq({ id: 'r2q18', t: T, sk: 'mult', src: S(18), q: 'Write a multiple of 5 that is greater than 5 and less than 30 and is also a factor of 30.', why: '10 or 15' }, [['', ANY(10, 15), '', '10']]));
  add(inq({ id: 'r2q19', t: T, sk: 'sq', src: S('19a'), q: 'Find the missing terms in the sequence.' }, [['1, 4, 9, 16,', 25, ','], ['', 36, ','], ['', 49, '']]));
  add(mcq({ id: 'r2q19b', t: T, sk: 'sq', src: S('19b'), q: 'What is the rule for 1, 4, 9, 16, 25 …?' }, ['They are square numbers: 1×1, 2×2, 3×3 …', 'Add 3 each time', 'Multiply by 4', 'They are triangular numbers'], 0));
  add(mul({ id: 'r2q20', t: T, sk: 'prime', src: S(20), q: 'Pat writes a prime number in the box: 15 < ▢ < 30. Tick all the prime numbers Pat could write.' }, ['17', '19', '21', '23', '25', '27', '29'], [0, 1, 3, 6]));
  add(inq({ id: 'r2q21', t: T, sk: 'seq', src: S(21), q: 'The sequence continues in the same way. Write the missing numbers.' }, [['13, 6, −1,', -8, ','], ['', -15, '']]));
  add(inq({
    id: 'r2q22', t: T, sk: 'neg', src: S(22), q: 'Pierre counts back in 3s starting at 20. Write two numbers between 0 and −9 that Pierre will say.',
    why: '20, 17, 14, 11, 8, 5, 2, −1, −4, −7',
    check: (ps) => ps.every((p) => isInt(p) && [-1, -4, -7].includes(p.v)) && ps[0].v !== ps[1].v,
  }, [['', null, 'and', '-1'], ['', null, '', '-4']]));
  add(inq({ id: 'r2q23', t: T, sk: 'sq', src: S(23), q: 'Samira squares her number and subtracts 12. Her answer is 37. What number does she think of?', why: '37 + 12 = 49 = 7 × 7' }, [['', 7, '']]));
  add(inq({ id: 'r2q24', t: T, sk: 'seq', src: S(24), q: 'The same number is added each time. Fill the gaps and write the term that comes after 29.', why: '5 to 29 is 3 steps: 24 ÷ 3 = 8.' }, [['5,', 13, ','], ['', 21, ', 29,'], ['', 37, '']]));
  add(inq({ id: 'r2q25', t: T, sk: 'seq', src: S(25), q: 'Rule: <b>add 2 to the previous term and multiply the answer by 7</b>. Mia\'s first term is 4.9. Calculate her 3rd term.', why: '2nd: (4.9 + 2) × 7 = 48.3. 3rd: (48.3 + 2) × 7 = 352.1' }, [['', 352.1, '']]));
  add(inq({ id: 'r2q26', t: T, sk: 'tri', src: S(26), fig: triPatterns([1, 2, 3], 'left'), q: 'Here are the first three triangular numbers drawn as staircases. How many dots does the 5th triangular number have?', why: '1 + 2 + 3 + 4 + 5 = 15' }, [['', 15, 'dots']]));
  add(inq({ id: 'r2q27', t: T, sk: 'seq', src: S(27), q: 'This sequence decreases by the same amount each time. Complete it.', why: 'The step is −12.' }, [['', 53, ', 41, 29, 17, 5,'], ['', -7, '']]));
  add(mul({ id: 'r2q28a', t: T, sk: 'sq', src: S('28a'), q: 'Eva joins her 9 square tiles to make a large square. Tick the children who can also join ALL their tiles to make a large square.', why: '4 = 2 × 2 and 64 = 8 × 8 are square numbers.' }, ['Gabriella: 4 tiles', 'Safia: 15 tiles', 'Angelique: 33 tiles', 'Anastasia: 64 tiles'], [0, 3]));
  add(inq({ id: 'r2q28b', t: T, sk: 'sq', src: S('28b'), q: 'Jamila says, "I can join all of my square tiles to make a different large square from Eva\'s (9 tiles)." How many tiles could Jamila have?', why: 'Any square number except 9: 4, 16, 25, 36 …' }, [['Jamila has', (p) => isInt(p) && isSquare(p.v) && p.v > 1 && p.v !== 9, 'tiles', '16']]));
  add(inq({ id: 'r2q29', t: T, sk: 'tri', src: S(29), fig: triPatterns([1, 2, 3]), q: 'Safia builds shapes with tiles: 1 tile, 3 tiles, 6 tiles …<br>(a) How many tiles does she add to the 3rd shape to make the 4th?<br>(b) How many tiles are in the 7th shape?', why: '(a) the 4th row has 4 tiles. (b) 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28' }, [['(a)', 4, 'tiles'], ['(b)', 28, 'tiles']]));
  add(inq({ id: 'r2q30', t: T, sk: 'tri', src: S(30), q: 'Carlos uses bricks to make steps: 1 brick for the 1st step, 3 bricks for the 2nd, 6 bricks for the 3rd. How many bricks for the 6th step?', why: '1, 3, 6, 10, 15, 21' }, [['', 21, 'bricks']]));
  add(inq({ id: 'r2q32', t: T, sk: 'seq', src: S(32), q: 'Here is part of a sequence: 20, 27, 34 … Write the smallest 3-digit number in the sequence.', why: 'Keep adding 7: … 90, 97, 104.' }, [['', 104, '']]));
  add(inq({ id: 'r2q33', t: T, sk: 'sq', src: S(33), q: 'Write a number in the box to make the statement correct.', why: '8 × 8 = 64' }, [['', 8, '² = 64']]));
  add(inq({
    id: 'r2q34', t: T, sk: 'sq', src: S(34), q: 'Yuri shows two different square numbers with counters. He uses 20 counters in total. Which two square numbers?',
    why: '16 + 4 = 20 (a 4 × 4 square and a 2 × 2 square)',
    check: (ps) => ps.every(isInt) && [ps[0].v, ps[1].v].sort((a, b) => a - b).join() === '4,16',
  }, [['', null, '+', '16'], ['', null, '= 20', '4']]));
  add(inq({ id: 'r2q35', t: T, sk: 'seq', src: S(35), q: 'The 1st term of a sequence is 3 and the 5th term is 39. The steps are all the same size. Write the 6th term.', why: '1st to 5th is 4 steps: 36 ÷ 4 = 9. 3, 12, 21, 30, 39, 48' }, [['', 48, '']]));
  add(inq({ id: 'r2q36', t: T, sk: 'neg', src: S(36), q: 'Naomi counts back from 105 in steps of 8. Samira counts on from 15 in steps of 7.<br>(i) Write the first negative number that Naomi says.<br>(ii) Write the number that both Samira and Naomi say.', why: 'Naomi: 105, 97, 89, 81, 73, 65, 57 … 9, 1, −7. Samira: 15, 22, 29, 36, 43, 50, 57.' }, [['(i)', -7, ''], ['(ii)', 57, '']]));
  add(inq({ id: 'r2q37', t: T, sk: 'seq', src: S(37), q: 'The sequence 18, ▢, ▢, ▢, ▢, 53 has steps of constant size. Write the number that comes after 53.', why: '18 to 53 is 5 steps: 35 ÷ 5 = 7. 53 + 7 = 60' }, [['', 60, '']]));
  add(inq({ id: 'r2q38a', t: T, sk: 'prime', src: S('38a'), q: 'Here are some numbers: 15, 16, 17, 18, 19. Anastasia picks the two prime numbers and <b>multiplies</b> them together. Write her answer.', why: '17 × 19 = 323' }, [['', 323, '']]));
  add(mcq({ id: 'r2q38b', t: T, sk: 'prime', src: S('38b'), q: 'Is 323 (= 17 × 19) a prime number?' }, ['No. 323 = 17 × 19, so it has more than two factors.', 'Yes, because 323 is odd.', 'Yes, because it is made from two prime numbers.'], 0));
  add(inq({ id: 'r2q39', t: T, sk: 'seq', src: S(39), q: 'Rajiv counts on in steps of 8. The first 3-digit number he says is 103. Write the first 4-digit number he says.', why: '103 + 8 × 112 = 999, then 999 + 8 = 1007' }, [['', 1007, '']]));
  add(mul({ id: 'r2q40', t: T, sk: 'sq', src: S(40), q: 'Tick each pattern that represents a square number.', why: '16 (4 × 4) and 4 (2 × 2) are square. 12 and 6 are not.' }, [dotArray(4, 4), dotArray(4, 3), dotArray(2, 3), dotArray(2, 2), dotArray(3, 2)], [0, 3]));
})();

// ---------- Topic 3: Revision 3 ----------
(function () {
  const T = 3, S = (n) => `Revision 3 · Q${n}`;
  const cards = ['396', '8', '132', '660'];
  add(rowq({ id: 'r3q1', t: T, sk: 'money', src: S(1), q: 'Use the numbers 396, 8, 132 and 660 to complete the information.', why: '8 floors × 132 rooms = 1056 rooms = 396 + 660', check: (resp) => { const v = resp.map((x) => +x[0]); return new Set(v).size === 4 && v[0] < v[1] && v[0] * v[1] === v[2] + v[3]; } }, [
    { t: 'There are {} floors in a hotel.', ch: cards, a: ['8'] },
    { t: 'Each floor has {} rooms.', ch: cards, a: ['132'] },
    { t: 'There are {} rooms in use.', ch: cards, a: ['396'] },
    { t: 'There are {} rooms not in use.', ch: cards, a: ['660'] },
  ]));
  add(mul({ id: 'r3q2a', t: T, sk: 'negadd', src: S('2a'), exact: 2, q: 'Number cards: 1840, 84, −1084, −84. Tick the <b>two</b> numbers with a total of 0.' }, ['1840', '84', '−1084', '−84'], [1, 3]));
  add(mul({ id: 'r3q2b', t: T, sk: 'negadd', src: S('2b'), exact: 2, q: 'Number cards: 1840, 84, −1084, −84. Tick the <b>two</b> numbers with a total of −1000.', why: '84 + (−1084) = −1000' }, ['1840', '84', '−1084', '−84'], [1, 2]));
  add(inq({ id: 'r3q3', t: T, sk: 'decadd', src: S(3), q: 'Write the smallest number that can be subtracted from 316 to give a 2-digit answer.', why: 'The largest 2-digit number is 99: 316 − 99 = 217' }, [['', 217, '']]));
  add(inq({ id: 'r3q4', t: T, sk: 'money', src: S(4), q: 'A teacher has $497.50. She buys 10 bats and 1 ball. Bats cost $42.50 each. Balls cost $7.75 each. How much money does she have left?', why: '10 × 42.50 = 425. 425 + 7.75 = 432.75. 497.50 − 432.75 = 64.75' }, [['$', 64.75, '', '64.75']]));
  add(mcq({ id: 'r3q5', t: T, sk: 'decadd', src: S(5), q: 'Naomi turns two digit cards over: ▢63 + ▢68 = 531. She says, "You cannot be sure what the numbers on the hidden cards are." Why is she correct?' }, ['63 + 68 = 131, so the hidden digits must add to 4. 0+4, 1+3, 2+2, 3+1 and 4+0 all work.', 'The hidden digits must be 5 and 3.', 'Because you cannot add numbers you cannot see.'], 0));
  const sym = ['<', '=', '>'];
  add(rowq({ id: 'r3q6', t: T, sk: 'decadd', src: S(6), q: 'Choose <, = or > for each statement.', why: '2.77 > 2.66, and 4.5 = 4.5' }, [{ t: '2.34 + 0.43 {} 1.55 + 1.11', ch: sym, a: ['>'] }, { t: '5.4 − 0.9 {} 6.4 − 1.9', ch: sym, a: ['='] }]));
  add(rowq({ id: 'r3q7', t: T, sk: 'negadd', src: S(7), q: 'Choose <, = or > for each statement.', why: '−5 + 30 = 25 and 5 − 30 = −25. −8 + 8 = 0 and 16 − 8 = 8.' }, [{ t: '−5 + 30 {} 5 − 30', ch: sym, a: ['>'] }, { t: '−8 + 8 {} 16 − 8', ch: sym, a: ['<'] }]));
  add(inq({ id: 'r3q8', t: T, sk: 'decadd', src: S(8), q: 'Complete the number statement.' }, [['36.43 = 36.4 +', 0.03, '']]));
  add(inq({ id: 'r3q9', t: T, sk: 'algebra', src: S(9), q: 'Gabriella adds three 3-digit numbers. The same digit goes in every box:<br><b>2▢9 + ▢21 + 14▢ = 92▢</b><br>What is the digit?', why: '259 + 521 + 145 = 925' }, [['▢ =', 5, '']]));
  add(inq({
    id: 'r3q10', t: T, sk: 'oddeven', src: S(10), q: 'Carlos: "When I add two numbers the answer is even." Rajiv: "I know that you added two even numbers." Write an addition that shows Rajiv is wrong.',
    why: 'Two odd numbers also make an even number, for example 3 + 5 = 8.',
    check: (ps) => ps.every(isInt) && ps[0].v % 2 !== 0 && ps[1].v % 2 !== 0 && ps[0].v + ps[1].v === ps[2].v,
  }, [['', null, '+', '3'], ['', null, '=', '5'], ['', null, '', '8']]));
  add(mul({ id: 'r3q11', t: T, sk: 'decadd', src: S(11), exact: 2, q: 'Tick two numbers with a total of 5.' }, ['2.68', '3.32', '3.68', '1.32', '2.42'], [2, 3]));
  add(inq({
    id: 'r3q12', t: T, sk: 'algebra', src: S(12), q: 'Three identical boxes balance with two identical cans. Each item has a mass between 300 and 500 grams. Write possible masses.',
    why: '3 × box = 2 × can. For example 3 × 320 = 960 = 2 × 480.',
    check: (ps) => { const [b, c] = ps; return !!b && !!c && b.v > 300 && b.v < 500 && c.v > 300 && c.v < 500 && same(3 * b.v, 2 * c.v); },
  }, [['box =', null, 'g', '320'], ['can =', null, 'g', '480']]));
  const pm = ['+', '−'];
  add(rowq({ id: 'r3q16', t: T, sk: 'negadd', src: S(16), q: 'Choose + or − for each box to make the statements correct.', why: '−509 + 9 = −500 = −491 − 9. −9 + 509 = 500 = 491 + 9.' }, [{ t: '−509 {} 9 = −491 {} 9', ch: pm, a: ['+', '−'] }, { t: '−9 {} 509 = 491 {} 9', ch: pm, a: ['+', '+'] }]));
  add(inq({
    id: 'r3q17', t: T, sk: 'decadd', src: S(17), q: 'Lily has six digit cards: 2, 3, 4, 5, 6, 7. Use each card once to make a 3-digit + 3-digit addition with <b>no regrouping</b> (no column adds to 10 or more).',
    why: 'Pair 2 with 7, 3 with 6 and 4 with 5, for example 234 + 765 = 999.',
    check: (ps) => { if (!ps.every(isInt)) return false; const a = String(ps[0].v), b = String(ps[1].v); if (a.length !== 3 || b.length !== 3) return false; if ([...a, ...b].sort().join('') !== '234567') return false; for (let i = 0; i < 3; i++) if (+a[i] + +b[i] > 9) return false; return true; },
  }, [['', null, '+', '234'], ['', null, '', '765']]));
  add(inq({ id: 'r3q18', t: T, sk: 'money', src: S(18), q: 'Youssef\'s longest throw is 16.37 m. Mike\'s is 2.64 m longer than Youssef\'s. Oliver\'s is 4.36 m shorter than Mike\'s. How long is Oliver\'s longest throw?', why: 'Mike: 16.37 + 2.64 = 19.01. Oliver: 19.01 − 4.36 = 14.65' }, [['', 14.65, 'metres']]));
  add(inq({ id: 'r3q19', t: T, sk: 'decadd', src: S(19), q: 'Write a different number in each box.' }, [['0.45 = 0.4 +', 0.05, ''], ['0.45 = 0.3 +', 0.15, '']]));
  add(mcq({ id: 'r3q20', t: T, sk: 'oddeven', src: S(20), q: '■ and ★ are two different odd numbers. Safia writes ■ + ■ + ★. She says, "The answer could be odd or even." Is Safia correct?' }, ['No. ■ + ■ is even, and even + odd is always odd.', 'Yes. It depends which odd numbers you choose.', 'No. The answer is always even.'], 0));
  add(inq({ id: 'r3q21', t: T, sk: 'algebra', src: S(21), q: 'A beanie costs ▲ and a cap costs ●.<br>▲ + ▲ + ● = $18<br>● = ▲ + ▲<br>Find each price.', why: '● is worth two ▲, so 4 ▲ = $18 and ▲ = $4.50' }, [['▲ = $', 4.5, '', '4.50'], ['● = $', 9, '']]));
  add(inq({ id: 'r3q22', t: T, sk: 'algebra', src: S(22), q: '★ + 5 + ★ + ★ = 317. What is the value of ★?', why: '317 − 5 = 312, and 312 ÷ 3 = 104' }, [['★ =', 104, '']]));
  add(inq({
    id: 'r3q23', t: T, sk: 'oddeven', src: S(23), q: 'Ahmed has more pencils than Yuri. Ahmed has an even number of pencils. Yuri has 45 pencils, and together they have more than 60. Write two possible numbers for Ahmed.',
    why: 'Ahmed has more than 45 and an even number: 46, 48, 50 …',
    check: (ps) => ps.every((p) => isInt(p) && p.v > 45 && p.v % 2 === 0) && ps[0].v !== ps[1].v,
  }, [['', null, 'or', '46'], ['', null, '', '48']]));
  add(mul({ id: 'r3q24', t: T, sk: 'algebra', src: S(24), q: '▲ + 7 is greater than 30. ▲ − 7 is less than 20. Tick all the possible values of ▲.', why: '▲ > 23 and ▲ < 27' }, ['22', '23', '24', '25', '26', '27', '28'], [2, 3, 4]));
  add(inq({ id: 'r3q25', t: T, sk: 'avg', src: S('25a'), q: 'Anastasia\'s running times (minutes): 32, 31, 28, 25, 30, 31, 29. Write her median time.', why: 'In order: 25, 28, 29, 30, 31, 31, 32. The middle one is 30.' }, [['', 30, 'minutes']]));
  add(inq({ id: 'r3q25b', t: T, sk: 'avg', src: S('25b'), fig: tableHtml(['Song', 'Time (seconds)'], [['Happy', 150], ['The long walk', 200], ['Jump and sing', 100], ['Smile at me', 120], ['Hip hop beat', 180], ['Sunny salsa song', 150], ['Dance with me', 200], ['Moon and stars', 200]]), q: 'A radio station plays eight songs. Write the mode of the times.' }, [['', 200, 'seconds']]));
  add(inq({ id: 'r3q26', t: T, sk: 'avg', src: S(26), q: 'People seen on the way to school: 8, 3, 6, 5, 3.', why: 'In order: 3, 3, 5, 6, 8' }, [['Median =', 5, ''], ['Mode =', 3, '']]));
  add(inq({ id: 'r3q27', t: T, sk: 'avg', src: S(27), fig: tableHtml(['Rabbit', 'Height (cm)'], [['Clover', 65], ['Buttercup', 80], ['Carrot top', 85], ['Hoppy', 60], ['Bouncer', 90], ['Pogo', 85], ['Dandelion', 80], ['Thumper', 75], ['Eric', 85]]), q: 'What is the mode of the heights jumped?' }, [['', 85, 'cm']]));
  add(inq({ id: 'r3q28a', t: T, sk: 'avg', src: S('28a'), q: 'Eva\'s quiz marks: 17, 16, 12, 18, 14, 20, 15. Write Eva\'s median mark.', why: '12, 14, 15, 16, 17, 18, 20' }, [['', 16, '']]));
  add(inq({
    id: 'r3q28b', t: T, sk: 'avg', src: S('28b'), q: 'Yuri\'s median mark is 17. He does two more quizzes with two different marks, and his median is still 17. Write two marks he could get.',
    why: 'One mark must be 17 or less and the other 17 or more, for example 16 and 18.',
    check: (ps) => ps.every((p) => !!p) && ps[0].v !== ps[1].v && Math.min(ps[0].v, ps[1].v) <= 17 && Math.max(ps[0].v, ps[1].v) >= 17,
  }, [['', null, 'and', '16'], ['', null, '', '18']]));
  add(inq({ id: 'r3q29', t: T, sk: 'avg', src: S(29), fig: tableHtml(['Animal', 'A', 'B', 'C', 'D', 'E'], [['Age (years)', 9, 5, 8, 4, 4], ['Mass (kg)', 12, 9, 8, 16, 21]]), q: '(a) Mode of the ages. (b) Median mass.', why: 'Masses in order: 8, 9, 12, 16, 21' }, [['(a)', 4, 'years'], ['(b)', 12, 'kg']]));
  add(inq({ id: 'r3q31', t: T, sk: 'decadd', src: S(31), q: 'Work out.' }, [['7.41 − 2.36 + 1.43 =', 6.48, ''], ['463 − 217 + 135 =', 381, ''], ['1.32 + 2.14 =', 3.46, '']]));
  add(inq({
    id: 'r3q32', t: T, sk: 'avg', src: S(32), q: 'Safia takes 5 spelling tests. The median is 5 and the mode is 6. Two of her scores are 5 and 6. Write possible values for the other three scores.',
    why: 'She needs another 6 (for the mode) and two scores below 5, for example 3, 4, 5, 6, 6.',
    check: (ps) => { if (!ps.every(isInt)) return false; const all = [5, 6, ...ps.map((p) => p.v)].sort((a, b) => a - b); if (all[2] !== 5) return false; const c = {}; all.forEach((x) => (c[x] = (c[x] || 0) + 1)); const mx = Math.max(...Object.values(c)); const modes = Object.keys(c).filter((k) => c[k] === mx); return modes.length === 1 && +modes[0] === 6; },
  }, [['', null, ',', '6'], ['', null, ',', '3'], ['', null, '', '4']]));
  add(inq({ id: 'r3q33', t: T, sk: 'algebra', src: S(33), q: '■ is the price of a chocolate bar.<br>■ + ■ + ■ = $36<br>What is ■ + ■ + ■ + ■?', why: '36 ÷ 3 = 12, and 12 × 4 = 48' }, [['$', 48, '']]));
  add(inq({
    id: 'r3q34', t: T, sk: 'algebra', src: S(34), q: '▲ is the mass of a box and ● is the mass of a tin.<br>▲ + ▲ + ● + ● = 20 kg<br>Write a possible pair of values.',
    why: '▲ + ● = 10, for example 6 and 4.',
    check: (ps) => ps.every((p) => !!p && p.v > 0) && same(2 * ps[0].v + 2 * ps[1].v, 20),
  }, [['▲ =', null, 'kg', '6'], ['● =', null, 'kg', '4']]));
})();

// ---------- Topic 4: Revision 4 ----------
(function () {
  const T = 4, S = (n) => `Revision 4 · Q${n}`;
  const triA = triangleFig([[40, 0], [62, 0], [51, 100]]), triB = triangleFig([[0, 20], [100, 60], [10, 90]]), triC = triangleFig([[10, 10], [10, 90], [90, 90]]), triD = triangleFig([[50, 0], [100, 90], [0, 90]]), triE = triangleFig([[0, 30], [30, 30], [100, 90]]);
  add(mul({ id: 'r4q2', t: T, sk: 'tri2d', src: S(2), q: 'Tick all the isosceles triangles.', why: 'An isosceles triangle has two equal sides.' }, [triA, triB, triC, triD, triE], [0, 2, 3]));
  const C12 = circle12();
  add(dotsq({ id: 'r4q3a', t: T, sk: 'tri2d', src: S('3a'), pts: C12, ring: true, need: 3, q: 'This circle has 12 equally spaced points. Tap 3 points to make an <b>equilateral</b> triangle.', why: 'Use every 4th point, like 12, 4 and 8 on a clock.', check: (sel) => triKind(sel.map((i) => C12[i])) === 'equilateral', ex: [0, 4, 8] }));
  add(dotsq({ id: 'r4q3b', t: T, sk: 'tri2d', src: S('3b'), pts: C12, ring: true, need: 3, q: 'Tap 3 points to make a <b>scalene</b> triangle.', why: 'All three gaps around the circle must be different, for example 3, 4 and 5 steps.', check: (sel) => triKind(sel.map((i) => C12[i])) === 'scalene', ex: [0, 3, 7] }));
  const L9 = sqLattice(3, 3, [[1, 1]]);
  add(dotsq({ id: 'r4q4', t: T, sk: 'tri2d', src: S(4), pts: L9, need: 3, q: 'Tap 3 dots to make an <b>isosceles</b> triangle.', check: (sel) => triKind(sel.map((i) => L9[i])) === 'isosceles', ex: [0, 2, 6] }));
  add(mcq({ id: 'r4q6', t: T, sk: 'poly', src: S(6), fig: SHAPES.octagon(), q: 'Anastasia draws two straight lines inside an octagon, from vertex to vertex, to make two triangles and a third shape. The lines do not cross. What is the third shape?', why: 'Each triangle cuts off one corner: 8 − 2 = 6 corners left.' }, ['pentagon', 'hexagon', 'heptagon', 'octagon'], 1));
  add(mul({ id: 'r4q7', t: T, sk: 'poly', src: 'Like Revision 4 · Q7', q: 'Tick each shape that tessellates (fits together with no gaps).' }, [SHAPES.square(), SHAPES.hexagon(), SHAPES.circle(), SHAPES.pentagon(), SHAPES.eqtri(), SHAPES.heart()], [0, 1, 4]));
  const L9b = sqLattice(3, 3);
  add(dotsq({ id: 'r4q9', t: T, sk: 'tri2d', src: S(9), pts: L9b, need: 3, q: 'Tap 3 dots to make a <b>scalene</b> triangle.', why: 'All three sides must be different lengths.', check: (sel) => triKind(sel.map((i) => L9b[i])) === 'scalene', ex: [0, 1, 5] }));
  add(gridq({
    id: 'r4q10', t: T, sk: 'sym', src: S(10), rows: 6, cols: 6, diag: true, given: [[1, 3], [2, 2], [2, 3], [3, 2], [4, 3]], need: 2,
    q: 'The mirror line is the diagonal. Shade <b>two</b> more squares to complete the symmetrical pattern.', why: 'Swap row and column: (1,3) ↔ (3,1) and (4,3) ↔ (3,4).',
    check: (all) => { for (const k of all) { const [r, c] = k.split(',').map(Number); if (!all.has(key(c, r))) return false; } return true; }, ex: [[3, 1], [3, 4]],
  }));
  let cb = ''; for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) cb += `<rect x="${c * 22}" y="${r * 22}" width="22" height="22" class="${(r + c) % 2 === 0 ? 'shade' : 'paper'} gridl"/>`;
  add(mcq({ id: 'r4q13', t: T, sk: 'sym', src: S(13), fig: svg(176, 110, cb), q: 'How many lines of symmetry does this rectangle have?', why: 'Only the horizontal line through the middle row works. With 8 columns, folding left to right swaps the colours.' }, ['0', '1', '2', '4'], 1));
  add(mcq({ id: 'r4q14', t: T, sk: 'sym', src: S(14), q: 'Which quadrilateral has exactly one line of symmetry?' }, [SHAPES.square(), SHAPES.rectangle(), SHAPES.kite(), SHAPES.parallelogram()], 2));
  add(gridq({
    id: 'r4q16a', t: T, sk: 'sym', src: S('16a'), rows: 4, cols: 8, given: [[0, 2], [0, 5], [1, 1], [2, 6]], need: 4,
    q: 'Shade <b>4</b> more squares so that the shape has exactly 2 lines of symmetry.', check: (all) => symCount(all, 4, 8) === 2, ex: [[1, 6], [2, 1], [3, 2], [3, 5]],
  }));
  add(gridq({
    id: 'r4q19', t: T, sk: 'sym', src: S(19), rows: 4, cols: 5, given: [[0, 1], [1, 2], [1, 4], [3, 1]], need: 2,
    q: 'Shade <b>two</b> more squares so that the shape has exactly one line of symmetry.', why: 'Use the horizontal mirror line between rows 2 and 3.', check: (all) => symCount(all, 4, 5) === 1, ex: [[2, 2], [2, 4]],
  }));
  const net = (cells) => svg(4 * 44 + 4, 3 * 44 + 4, cells.map(([c, r, n]) => `<rect class="paper strokeish" x="${2 + c * 44}" y="${2 + r * 44}" width="44" height="44"/><text class="lab b" x="${24 + c * 44}" y="${30 + r * 44}" text-anchor="middle">${n}</text>`).join(''));
  add(inq({ id: 'r4q21', t: T, sk: 'solid', src: S(21), fig: net([[0, 0, 8], [1, 0, 6], [1, 1, 4], [2, 1, 3], [3, 1, 7], [2, 2, 5]]), q: 'Here is the net of a cube. The numbers on opposite faces always have the same total. What is that total?', why: 'All six numbers add to 33. Three pairs: 33 ÷ 3 = 11 (8+3, 6+5, 4+7).' }, [['', 11, '']]));
  add(inq({ id: 'r4q25', t: T, sk: 'sym', src: S(25), q: 'Complete the sentence.' }, [['A scalene triangle has', 0, 'lines of symmetry.']]));
  add(mcq({ id: 'r4q23m', t: T, sk: 'solid', src: S(23), q: 'Mike has a 3D shape with exactly three faces. Two of the faces are circles. What is Mike\'s shape?' }, ['cone', 'cylinder', 'sphere', 'cube'], 1));
  const TL = triLattice(6);
  add(dotsq({ id: 'r4q28', t: T, sk: 'tri2d', src: S(28), pts: TL, need: 3, q: 'This is a dotted grid of triangles. Tap 3 dots to make an <b>equilateral</b> triangle.', check: (sel) => triKind(sel.map((i) => TL[i])) === 'equilateral', ex: [0, 1, 6] }));
})();

// ---------- Topic 5: Revision 5 + fractions sheet ----------
(function () {
  const T = 5, S = (n) => `Revision 5 · Q${n}`, FS = (n) => `Fractions sheet · Q${n}`;
  add(mul({ id: 'r5q1', t: T, sk: 'mixed', src: S(1), q: `Tick all the numbers that are equivalent to ${fx('1 1/2')}.`, why: '6/4 = 1 2/4 = 1 1/2. 15/10 = 1 5/10 = 1 1/2. 1 4/8 = 1 1/2.' }, [fx('6/4'), fx('4/6'), fx('10/15'), fx('15/10'), fx('1 4/8'), fx('1 3/8')], [0, 3, 4]));
  add(inq({ id: 'r5q2', t: T, sk: 'fof', src: S(2), q: 'There are 20 fruit trees in a garden. Two fifths of the trees are apple trees. The others are pear trees. How many pear trees are there?', why: '20 ÷ 5 × 2 = 8 apple trees. 20 − 8 = 12' }, [['', 12, 'pear trees']]));
  add(inq({ id: 'r5q3', t: T, sk: 'fof', src: S(3), q: 'Oliver is thinking of two whole numbers. One number is one third of the other. The sum of the numbers is 16. What are the numbers?', why: 'Small + 3 × small = 4 × small = 16, so small = 4 and big = 12.', check: (ps) => ps.every(isInt) && [ps[0].v, ps[1].v].sort((a, b) => a - b).join() === '4,12' }, [['', null, 'and', '4'], ['', null, '', '12']]));
  add(inq({ id: 'r5q4', t: T, sk: 'eqv', src: S(4), fig: numberLine({ from: 0, to: 1, minor: 0.05, ticks: [{ v: 0, top: '0', bottom: '0' }, { v: 0.4, top: '0.4', bottom: 'A' }, { v: 0.5, top: '0.5', bottom: '5/10' }, { v: 0.75, top: 'B', bottom: '3/4' }, { v: 1, top: '1', bottom: '1' }] }), q: 'The number line shows decimals above and fractions below. What goes in box A (a fraction) and box B (a decimal)?' }, [['A =', F(0.4), '', '4/10'], ['B =', 0.75, '']]));
  add(mul({ id: 'r5q5', t: T, sk: 'fof', src: S(5), q: 'Mia uses half as much butter as flour. She uses 450 g of flour. Tick all the calculations that give the mass of butter.', why: 'Half of 450 = 450 × ½ = 450 ÷ 2 = 225' }, ['450 × 2', `450 × ${fx('1/2')}`, `450 ÷ ${fx('1/2')}`, '450 ÷ 10', '450 ÷ 2'], [1, 4]));
  add(inq({ id: 'r5q6', t: T, sk: 'fadd', src: S(6), fig: numberLine({ from: 0, to: 1, ticks: [{ v: 0, bottom: '0' }, { v: 0.5, bottom: '5/10' }, { v: 0.9, bottom: 'BOX' }], arcs: [{ from: 0, to: 0.5, label: '5/10' }, { from: 0.5, to: 0.9, label: '2/5' }] }), q: 'Write the missing fraction in the box.', why: '2/5 = 4/10, so 5/10 + 4/10 = 9/10' }, [['', '9/10', '']]));
  add(inq({ id: 'r5q7', t: T, sk: 'pct', src: S(7), fig: pentagonParts(10, [0, 1, 5, 6]), q: 'This regular pentagon is divided into ten equal parts. What percentage is shaded?', why: '4/10 = 40/100 = 40%' }, [['', 40, '%']]));
  add(inq({ id: 'r5q8', t: T, sk: 'fof', src: S(8), q: `${fx('7/10')} of $▢ = ${fx('2/3')} of $210`, why: '2/3 of 210 = 140. 140 ÷ 7 × 10 = 200' }, [['▢ =', 200, '']]));
  // fractions sheet
  const unit = (kind, x) => { const a = `<rect class="paper strokeish" x="${x}" y="4" width="48" height="48"/>`; if (kind === 'full') return a + `<line class="stroke thin" x1="${x + 24}" y1="4" x2="${x + 24}" y2="52"/><line class="stroke thin" x1="${x}" y1="28" x2="${x + 48}" y2="28"/>`; if (kind === 'half') return `<rect class="paper strokeish" x="${x}" y="4" width="24" height="48"/><line class="stroke thin" x1="${x}" y1="28" x2="${x + 24}" y2="28"/>`; return `<rect class="paper strokeish" x="${x}" y="28" width="24" height="24"/>`; };
  const diag = (parts) => { let x = 4, s = ''; parts.forEach((k) => { s += unit(k, x); x += (k === 'full' ? 48 : 24) + 10; }); return svg(x, 56, s); };
  const sqOpts = ['3', fx('5/4'), fx('2 1/2'), fx('1 1/4'), fx('10/4'), fx('12/4')];
  add(mul({ id: 'f9a', t: T, sk: 'mixed', src: FS(9), fig: diag(['full', 'full', 'half']), q: 'Each big square is 1 whole (4 small squares). Tick the <b>two</b> numbers this diagram shows.', why: '1 + 1 + ½ = 2½ = 10/4' }, sqOpts, [2, 4]));
  add(mul({ id: 'f9b', t: T, sk: 'mixed', src: FS(9), fig: diag(['full', 'quarter']), q: 'Each big square is 1 whole (4 small squares). Tick the <b>two</b> numbers this diagram shows.', why: '1 + ¼ = 1¼ = 5/4' }, sqOpts, [1, 3]));
  add(inq({ id: 'f10', t: T, sk: 'fof', src: FS(10), q: 'Youssef uses 1/5 of his string to tie a parcel. He uses 48 cm of string.<br>(a) How much string is left in centimetres?<br>(b) How much is left in metres?', why: 'The whole string is 48 × 5 = 240 cm. Left: 240 − 48 = 192 cm = 1.92 m' }, [['(a)', 192, 'cm'], ['(b)', 1.92, 'm']]));
  add(inq({ id: 'f11', t: T, sk: 'fdiv', src: FS(11), q: 'Chen has half a tub of ice cream. He shares it equally into four bowls. What fraction of the whole tub is in each bowl?', why: '½ ÷ 4 = 1/8' }, [['', '1/8', '']]));
  add(matq({ id: 'f12', t: T, sk: 'eqv', src: FS(12), q: 'Match each fraction to an equivalent percentage.', why: '15/25 = 60/100, 7/20 = 35/100, 1/4 = 25/100' }, [fx('15/25'), fx('7/20'), fx('1/4')], ['25%', '60%', '35%'], [1, 2, 0]));
  add(inq({ id: 'f13', t: T, sk: 'fdiv', src: FS(13), q: 'Rajiv shares three bags of food equally between ten donkeys. What fraction of a bag does each donkey get?', why: '3 ÷ 10 = 3/10' }, [['', '3/10', 'of a bag']]));
  add(inq({ id: 'f14', t: T, sk: 'eqv', src: FS(14), q: `Naomi's fraction is equivalent to ${fx('3/4')}. The denominator is less than 20. The numerator is an odd number. Write her fraction.`, why: '3/4 = 6/8 = 9/12 = 12/16. 9/12 has an odd numerator.' }, [['', (p) => !!p && p.isFrac && same(p.v, 0.75) && p.den < 20 && p.num % 2 === 1, '', '9/12']]));
  let tiles = ''; [0, 1, 2].forEach((i) => { const x = 4 + i * 60; const top = i !== 1; tiles += `<rect class="paper strokeish" x="${x}" y="4" width="60" height="60"/><polygon class="shade" points="${top ? `${x},4 ${x + 60},4 ${x + 30},34` : `${x},64 ${x + 60},64 ${x + 30},34`}"/><line class="stroke thin" x1="${x}" y1="4" x2="${x + 60}" y2="64"/><line class="stroke thin" x1="${x + 60}" y1="4" x2="${x}" y2="64"/>`; });
  add(inq({ id: 'f15', t: T, sk: 'pct', src: FS(15), fig: svg(188, 68, tiles), q: 'One quarter of each square tile is shaded. Yuri joins three tiles to make a rectangle. What percentage of the rectangle is shaded?', why: '3 of 12 triangles: 3/12 = 1/4 = 25%' }, [['', 25, '%']]));
  add(matq({ id: 'f17', t: T, sk: 'fdiv', src: FS(17), q: 'Match each fraction to the equivalent calculation.' }, [fx('1/6'), fx('6/10')], ['6 ÷ 1', '6 ÷ 10', '10 ÷ 6', '1 ÷ 6'], [3, 1]));
  add(mcq({ id: 'f18', t: T, sk: 'fof', src: FS(18), fig: tableHtml(['Fruit', 'Price each'], [['orange', '30 cents'], ['mango', '60 cents'], ['lemon', '9 cents'], ['grapefruit', '90 cents'], ['pineapple', '99 cents'], ['apple', '33 cents']]), q: `Oliver has $3. He spends ${fx('3/10')} of his money on one piece of fruit. Which fruit does he buy?`, why: '$3 = 300 cents. 300 ÷ 10 × 3 = 90 cents' }, ['orange', 'mango', 'grapefruit', 'pineapple'], 2));
  add(inq({ id: 'f19', t: T, sk: 'pct', src: FS(19), fig: pentagonParts(5, [2, 3]), q: 'Here is a regular pentagon with its centre marked. What percentage is shaded?', why: '2/5 = 40/100 = 40%' }, [['', 40, '%']]));
  add(inq({ id: 'f20', t: T, sk: 'fadd', src: FS(20), q: `Angelique runs ${fx('3/4')} km, rests, then runs a further ${fx('5/8')} km. How far does she run altogether?`, why: '3/4 = 6/8. 6/8 + 5/8 = 11/8 = 1 3/8' }, [['', F(11 / 8), 'km', '11/8']]));
  add(mcq({ id: 'f21', t: T, sk: 'fadd', src: FS(21), q: `Oliver says, "${fx('2/3')} of the ribbon is shorter than ${fx('7/12')} of the ribbon." Is he correct?` }, [`No. ${fx('2/3')} = ${fx('8/12')}, which is more than ${fx('7/12')}.`, 'Yes, because 7 is bigger than 2.', 'Yes, because twelfths are bigger than thirds.'], 0));
  const crd = ['7/2', '3/2', '2/3', '2 1/3', '3/3'];
  add(rowq({ id: 'f22', t: T, sk: 'eqv', src: FS(22), fig: numberLine({ from: 0, to: 3, minor: 1 / 6, ticks: [{ v: 0, bottom: '0' }, { v: 1, bottom: '1' }, { v: 2, bottom: '2' }, { v: 3, bottom: '3' }, { v: 2 / 3, top: 'A' }, { v: 1.5, top: 'B' }, { v: 7 / 3, top: 'C' }] }), q: 'Choose the number card for each box.', why: 'A is 2 of 3 parts between 0 and 1. B is halfway between 1 and 2. C is 1 part past 2.' }, [
    { t: 'A = {}', ch: crd, a: ['2/3'] }, { t: 'B = {}', ch: crd, a: ['3/2'] }, { t: 'C = {}', ch: crd, a: ['2 1/3'] },
  ]));
  add(rowq({ id: 'f23', t: T, sk: 'eqv', src: FS(23), q: 'Safia has cards 1, 2, 1, 2. Choose cards to make the statement correct.', why: '10% < 1/5 (= 20%) < 0.3 (= 30%)' }, [{ t: '{}0%  <  {}/5  <  0.3', ch: ['1', '2'], a: ['1', '1'] }]));
  add(inq({ id: 'f24', t: T, sk: 'eqv', src: FS(24), fig: numberLine({ from: 0, to: 1, minor: 0.1, ticks: [{ v: 0, top: '0', bottom: '0%' }, { v: 0.1, top: '0.1', bottom: 'A' }, { v: 0.5, top: '0.5', bottom: '50%' }, { v: 1, top: 'B', bottom: '100%' }] }), q: 'Write the missing numbers.' }, [['A =', 10, '%'], ['B =', 1, '']]));
  add(inq({ id: 'f25', t: T, sk: 'mixed', src: FS(25), q: `Write ${fx('8/3')} as a mixed number.`, why: '8 ÷ 3 = 2 remainder 2' }, [['', '2 2/3', '']]));
  add(inq({ id: 'f26', t: T, sk: 'fdiv', src: FS(26), q: 'Write the fraction that represents 4 ÷ 5.' }, [['', '4/5', '']]));
  add(gridq({ id: 'f27', t: T, sk: 'pct', src: FS(27), rows: 10, cols: 10, given: [], need: 3, small: true, q: 'Here is a shape made of 100 squares. Shade 3% of the shape.', why: '3% = 3 out of 100', check: (all) => all.size === 3, ex: [[0, 0], [0, 1], [0, 2]] }));
  add(inq({ id: 'f28', t: T, sk: 'eqv', src: FS(28), q: 'Convert.' }, [[`${fx('4/10')} =`, 40, '%'], ['60% =', 0.6, '(decimal)']]));
  add(inq({ id: 'f29', t: T, sk: 'fof', src: FS(29), q: `Calculate ${fx('2/3')} of 60.` }, [['', 40, '']]));
  add(inq({ id: 'f30', t: T, sk: 'fdiv', src: FS(30), q: 'Eva shares ½ litre of juice equally into 5 glasses. How much juice is in each glass? Give a fraction of a litre.', why: '½ ÷ 5 = 1/10' }, [['', '1/10', 'litre']]));
  add(inq({ id: 'f31', t: T, sk: 'eqv', src: FS(31), q: `Write a whole number to make this correct: 0.5 > ▢% > ${fx('2/5')}`, why: '0.5 = 50% and 2/5 = 40%, so 41 to 49.' }, [['', (p) => isInt(p) && p.v > 40 && p.v < 50, '%', '45']]));
  add(inq({ id: 'f35', t: T, sk: 'fdiv', src: FS(35), q: `Complete: ${fx('1/4')} is equivalent to ▢ divided by ▢.`, why: '1/4 = 1 ÷ 4', check: (ps) => ps.every(isInt) && ps[1].v !== 0 && same(ps[0].v / ps[1].v, 0.25) }, [['', null, 'divided by', '1'], ['', null, '', '4']]));
  add(inq({ id: 'f36', t: T, sk: 'mixed', src: FS(36), q: 'Write a number in the box.', why: '1 = 3/3, so 1 1/3 = 4/3' }, [[`${fx('1 1/3')} =`, 4, '/ 3']]));
  add(inq({ id: 'f37', t: T, sk: 'eqv', src: FS(37), q: 'Write a number in each box.' }, [[`${fx('1/2')} =`, 50, '%'], ['0.4 =', 40, '%']]));
  add(inq({ id: 'f38', t: T, sk: 'fadd', src: FS(38), q: `Write a fraction that makes this correct: ${fx('2/15')} < ▢ < ${fx('1/3')}`, why: '1/3 = 5/15, so 3/15 or 4/15 work.' }, [['', (p) => !!p && p.isFrac && p.v > 2 / 15 + 1e-9 && p.v < 1 / 3 - 1e-9, '', '3/15']]));
})();

// ===================== GENERATORS (similar questions, new numbers) =====================
let gid = 0;
const G = (o) => Object.assign({ id: 'g' + (++gid), gen: true, src: 'Practice' }, o);
const GEN = {
  x10() {
    const p = R.pick([10, 100, 1000]); const op = R.pick(['×', '÷']);
    const n = op === '×' ? R.pick([R.int(2, 99) / 10, R.int(10, 999) / 100, R.int(3, 99)]) : R.pick([R.int(10, 9999), R.int(11, 999) / 10]);
    const ans = round6(op === '×' ? n * p : n / p);
    return G(inq({ t: 1, sk: 'x10', q: 'Calculate.', why: `${op === '×' ? 'Move the digits left' : 'Move the digits right'} by ${String(p).length - 1} place${p > 10 ? 's' : ''}.` }, [[`${nf(n)} ${op} ${nf(p)} =`, ans, '']]));
  },
  round() {
    const kind = R.int(0, 2);
    if (kind === 0) { const x = R.int(10, 999) + R.int(1, 9) / 10; return G(inq({ t: 1, sk: 'round', q: `Round ${nf(x)} to the nearest whole number.` }, [['', Math.round(x), '']])); }
    if (kind === 1) { const n = R.int(3, 80); const big = R.pick([true, false]); return G(inq({ t: 1, sk: 'round', q: `What is the ${big ? 'largest' : 'smallest'} number with 2 decimal places that rounds to ${n} (nearest whole number)?`, why: big ? `${n}.49 rounds down to ${n}.` : `${n - 1}.50 rounds up to ${n}.` }, [['', big ? n + 0.49 : n - 0.5, '', big ? `${n}.49` : `${n - 1}.50`]])); }
    const n = R.int(2, 20); const opts = R.shuffle([n - 0.6, n - 0.5, n - 0.2, n + 0.3, n + 0.5, n + 0.4, n - 1.5].map(round6)).slice(0, 6);
    const a = opts.map((x, i) => (Math.round(x + 1e-9) === n ? i : -1)).filter((i) => i >= 0);
    if (!a.length) return GEN.round();
    return G(mul({ t: 1, sk: 'round', q: `Tick all the numbers that round to ${n}.` }, opts.map(nf), a));
  },
  roundbig() {
    const to = R.pick([10, 100, 1000, 10000, 100000]); const n = R.int(to * 3, to * 99) + R.int(0, to - 1);
    const ans = Math.round(n / to) * to;
    return G(inq({ t: 1, sk: 'roundbig', q: `Round ${nf(n)} to the nearest ${nf(to)}.` }, [['', ans, '']]));
  },
  pv() {
    const k = R.int(0, 2);
    if (k === 0) { const t = R.int(1, 9), o = R.int(0, 9), te = R.int(0, 9), h = R.int(1, 9); const parts = [[t, 'tens'], [o, 'ones'], [te, 'tenths'], [h, 'hundredths']].filter((p) => p[0] > 0); const v = round6(t * 10 + o + te / 10 + h / 100); return G(inq({ t: 1, sk: 'pv', q: 'Write the decimal number.' }, [[parts.map((p) => p.join(' ')).join(' ') + ' =', v, '']])); }
    if (k === 1) {
      const d = R.int(1, 9); const places = ['tens', 'ones', 'tenths', 'hundredths']; const want = R.int(0, 3);
      const nums = [0, 1, 2, 3].map((pos) => { const digs = [R.int(1, 9), R.int(0, 9), R.int(0, 9), R.int(0, 9)].map((x) => (x === d ? (x % 9) + 1 : x)); digs[pos] = d; return `${digs[0]}${digs[1]}.${digs[2]}${digs[3]}`; });
      return G(mcq({ t: 1, sk: 'pv', q: `In which number does the digit ${d} represent ${d} ${places[want]}?` }, nums, want));
    }
    const a = R.int(10, 90) + R.int(1, 9) / 10, b = R.int(1, 9) / 100; const tot = round6(a + b);
    return G(inq({ t: 1, sk: 'pv', q: 'Complete the number statement.' }, [[`${nf(tot)} = ${nf(a)} +`, b, '']]));
  },
  order() {
    const base = R.int(1, 8); const set = new Set(); while (set.size < 5) set.add(round6(base + R.int(-10, 25) / 10 + (R.int(0, 1) ? R.int(1, 9) / 100 : 0)));
    const items = [...set].filter((x) => x > 0).map(nf); if (items.length < 4) return GEN.order();
    return G(ordq({ t: 1, sk: 'order', q: 'Write the numbers in order from smallest to largest.' }, items));
  },
  logic1() {
    const th = R.int(1, 7), on = R.int(1, 9); const sum = th + on + R.int(1, 8);
    const rest = sum - th - on;
    return G(inq({ t: 1, sk: 'logic1', q: `A 4-digit number has ${th} thousands and ${on} ones. The sum of its digits is ${sum}. Write a number it could be.`, why: `The hundreds and tens digits must add to ${rest}.`, check: (ps) => { const p = ps[0]; if (!isInt(p)) return false; const s = String(p.v); return s.length === 4 && +s[0] === th && +s[3] === on && [...s].reduce((a, b) => a + +b, 0) === sum; } }, [['', null, '', `${th}${Math.min(rest, 9)}${rest - Math.min(rest, 9)}${on}`]]));
  },
  seq() {
    const step = R.pick([-12, -9, -8, -7, -6, -5, 4, 6, 7, 8, 9, 11, 25, 50]); const start = R.int(-20, 60);
    const terms = [0, 1, 2, 3, 4, 5].map((i) => start + i * step);
    const k = R.int(0, 2);
    if (k === 0) { const gaps = [R.pick([0, 1]), 5]; return G(inq({ t: 2, sk: 'seq', q: 'The sequence continues in the same way. Write the missing numbers.', why: `The step is ${step > 0 ? '+' : '−'}${Math.abs(step)}.` }, [[gaps[0] === 0 ? '' : nf(terms[0]) + ',', terms[gaps[0]], ', ' + terms.slice(gaps[0] + 1, 5).map(nf).join(', ') + ','], ['', terms[5], '']])); }
    if (k === 1) return G(inq({ t: 2, sk: 'seq', q: `The 1st term is ${nf(terms[0])} and the 4th term is ${nf(terms[3])}. The steps are all the same size. What is the 5th term?`, why: `3 steps: (${nf(terms[3])} − ${nf(terms[0])}) ÷ 3 = ${step}` }, [['', terms[4], '']]));
    const s2 = Math.abs(step); const first3 = R.int(100, 100 + s2 - 1); let a0 = first3; while (a0 - s2 > 0) a0 -= s2;
    return G(inq({ t: 2, sk: 'seq', q: `Here is a sequence: ${a0}, ${a0 + s2}, ${a0 + 2 * s2} … Write the smallest 3-digit number in the sequence.` }, [['', first3, '']]));
  },
  neg() {
    const st = R.int(10, 40), s = R.int(3, 9);
    let x = st; while (x >= 0) x -= s;
    return G(inq({ t: 2, sk: 'neg', q: `Count back from ${st} in steps of ${s}. What is the first negative number you say?`, why: `${st}, ${st - s}, ${st - 2 * s} … keep going past 0.` }, [['', x, '']]));
  },
  tri() {
    const n = R.int(4, 10);
    return R.pick([true, false])
      ? G(inq({ t: 2, sk: 'tri', q: `Triangular numbers start 1, 3, 6, 10 … What is the ${n}th triangular number?`, why: `1 + 2 + … + ${n} = ${triNum(n)}` }, [['', triNum(n), '']]))
      : G(inq({ t: 2, sk: 'tri', q: `Shapes use 1, 3, 6, 10 … tiles. How many tiles are added to the ${n - 1}th shape to make the ${n}th shape?` }, [['', n, 'tiles']]));
  },
  sq() {
    const n = R.int(3, 12); const k = R.int(0, 2);
    if (k === 0) return G(inq({ t: 2, sk: 'sq', q: 'Write a number in the box.' }, [['', n, `² = ${n * n}`]]));
    if (k === 1) { const sub = R.int(5, 40); return G(inq({ t: 2, sk: 'sq', q: `Samira squares her number and subtracts ${sub}. Her answer is ${n * n - sub}. What is her number?`, why: `${n * n - sub} + ${sub} = ${n * n} = ${n} × ${n}` }, [['', n, '']])); }
    const opts = R.shuffle([n * n, n * n + 1, (n - 1) * n, 4 * n, n * n - 2, (n + 1) ** 2]).slice(0, 5);
    const a = opts.map((x, i) => (isSquare(x) ? i : -1)).filter((i) => i >= 0);
    if (!a.length) return GEN.sq();
    return G(mul({ t: 2, sk: 'sq', q: 'Tick all the square numbers.' }, opts.map(String), a));
  },
  prime() {
    const lo = R.int(10, 60); const opts = []; for (let x = lo; x < lo + 10; x++) opts.push(x);
    const a = opts.map((x, i) => (isPrime(x) ? i : -1)).filter((i) => i >= 0);
    if (!a.length) return GEN.prime();
    return G(mul({ t: 2, sk: 'prime', q: 'Tick all the prime numbers.' }, opts.map(String), a));
  },
  mult() {
    const a = R.pick([3, 4, 5, 6]), b = a * R.pick([4, 6, 8, 10]);
    const ok = []; for (let x = a + 1; x < b; x++) if (x % a === 0 && b % x === 0) ok.push(x);
    if (!ok.length) return GEN.mult();
    return G(inq({ t: 2, sk: 'mult', q: `Write a multiple of ${a} that is greater than ${a}, less than ${b}, and is a factor of ${b}.`, why: `Possible answers: ${ok.join(', ')}` }, [['', ANY(...ok), '', String(ok[0])]]));
  },
  negadd() {
    const a = R.int(-20, 20), b = R.int(-20, 30), c = R.int(-20, 20), d = R.int(-20, 30);
    const L = a + b, Rv = c - d; const s = L > Rv ? '>' : L < Rv ? '<' : '=';
    const show = (x, y, op) => `${nf(x)} ${op} ${y < 0 && op === '+' ? '(' + nf(y) + ')' : nf(Math.abs(y) === y ? y : y)}`;
    return G(rowq({ t: 3, sk: 'negadd', q: 'Choose <, = or >.', why: `${nf(L)} and ${nf(Rv)}` }, [{ t: `${show(a, b, '+')} {} ${show(c, d, '−')}`, ch: ['<', '=', '>'], a: [s] }]));
  },
  decadd() {
    const a = R.int(100, 999) / 100, b = R.int(100, 999) / 100, c = R.int(10, 99) / 100;
    const big = Math.max(a, b) + 1, small = Math.min(a, b);
    return G(inq({ t: 3, sk: 'decadd', q: 'Work out.' }, [[`${nf(round6(big))} − ${nf(small)} + ${nf(c)} =`, round6(big - small + c), '']]));
  },
  avg() {
    const n = R.pick([5, 7, 9]); const vals = []; for (let i = 0; i < n; i++) vals.push(R.int(2, 30));
    const dup = R.pick(vals); vals[R.int(0, n - 1)] = dup; vals[R.int(0, n - 1)] = dup;
    const sorted = vals.slice().sort((x, y) => x - y); const med = sorted[(n - 1) / 2];
    const cnt = {}; vals.forEach((v) => (cnt[v] = (cnt[v] || 0) + 1)); const mx = Math.max(...Object.values(cnt)); const modes = Object.keys(cnt).filter((k) => cnt[k] === mx);
    if (modes.length > 1) return G(inq({ t: 3, sk: 'avg', q: `Data: ${vals.join(', ')}. What is the median?`, why: `In order: ${sorted.join(', ')}` }, [['', med, '']]));
    return G(inq({ t: 3, sk: 'avg', q: `Data: ${vals.join(', ')}.`, why: `In order: ${sorted.join(', ')}` }, [['Median =', med, ''], ['Mode =', +modes[0], '']]));
  },
  money() {
    const n = R.int(3, 9), p = R.int(8, 45) + R.pick([0, 0.25, 0.5, 0.75]), q = R.int(2, 9) + R.pick([0.25, 0.5, 0.75]);
    const cost = n * p + q; const have = Math.ceil(cost / 50) * 50 + R.pick([0, 0.5, 20]);
    return G(inq({ t: 3, sk: 'money', q: `A coach has ${money(have)}. She buys ${n} balls at ${money(p)} each and 1 pump at ${money(q)}. How much money is left?`, why: `${n} × ${money(p)} = ${money(n * p)}. Add ${money(q)} = ${money(cost)}. ${money(have)} − ${money(cost)} = ${money(have - cost)}` }, [['$', round6(have - cost), '', round6(have - cost).toFixed(2)]]));
  },
  algebra() {
    const k = R.int(2, 4), v = R.int(12, 150), extra = R.int(2, 20);
    return G(inq({ t: 3, sk: 'algebra', q: `${Array(k).fill('★').join(' + ')} + ${extra} = ${k * v + extra}. What is ★?`, why: `${k * v + extra} − ${extra} = ${k * v}, and ${k * v} ÷ ${k} = ${v}` }, [['★ =', v, '']]));
  },
  oddeven() {
    const c = R.pick([['odd', 'odd'], ['odd', 'even'], ['even', 'even'], ['odd', 'odd', 'odd'], ['even', 'odd', 'odd'], ['odd', 'even', 'even']]);
    const res = c.filter((x) => x === 'odd').length % 2 === 0 ? 'even' : 'odd';
    const ex = { odd: [3, 7, 5], even: [4, 6, 8] }; const used = { odd: 0, even: 0 }; const nums = c.map((x) => ex[x][used[x]++]);
    return G(mcq({ t: 3, sk: 'oddeven', q: `Add ${c.map((x) => (x === 'odd' ? 'an odd number' : 'an even number')).join(' + ')}. Is the answer odd or even?`, why: `For example ${nums.join(' + ')} = ${nums.reduce((a, b) => a + b, 0)}` }, ['always odd', 'always even', 'it could be either'], res === 'odd' ? 0 : 1));
  },
  tri2d() {
    const kind = R.pick(['equilateral', 'isosceles', 'scalene']);
    let s; if (kind === 'equilateral') { const a = R.int(3, 9); s = [a, a, a]; } else if (kind === 'isosceles') { const a = R.int(4, 9); let b = R.int(3, 9); if (b === a) b = a - 1; s = R.shuffle([a, a, b]); } else { const a = R.int(4, 7); s = R.shuffle([a, a + 1, a + 2]); }
    const pts = { equilateral: [[50, 0], [100, 86], [0, 86]], isosceles: [[50, 0], [85, 95], [15, 95]], scalene: [[30, 0], [100, 90], [0, 90]] }[kind];
    return G(mcq({ t: 4, sk: 'tri2d', fig: triangleFig(pts, s.map((x) => x + ' cm')), q: 'What type of triangle has these side lengths?' }, ['equilateral', 'isosceles', 'scalene'], ['equilateral', 'isosceles', 'scalene'].indexOf(kind)));
  },
  sym() {
    if (R.int(0, 1)) {
      const shapes = [['square', 4], ['rectangle', 2], ['eqtri', 3], ['isotri', 1], ['scalene', 0], ['hexagon', 6], ['kite', 1], ['parallelogram', 0], ['rhombus', 2], ['pentagon', 5]];
      const [s, n] = R.pick(shapes);
      const opts = [...new Set([n, 0, 1, 2, 4, 6, 3, 5].filter((x, i, arr) => arr.indexOf(x) === i))].slice(0, 4); if (!opts.includes(n)) opts[3] = n;
      const o = R.shuffle(opts);
      return G(mcq({ t: 4, sk: 'sym', fig: SHAPES[s](), q: 'How many lines of symmetry does this shape have?' }, o.map(String), o.indexOf(n)));
    }
    // grid: build a symmetric pattern then hide some cells
    const rows = R.pick([4, 6]), cols = R.pick([5, 6, 8]); const want = R.pick([1, 2]);
    const cells = new Set(); const orbit = (r, c) => (want === 2 ? [[r, c], [r, cols - 1 - c], [rows - 1 - r, c], [rows - 1 - r, cols - 1 - c]] : [[r, c], [rows - 1 - r, c]]);
    let tries = 0; while (cells.size < 6 && tries++ < 50) orbit(R.int(0, rows - 1), R.int(0, cols - 1)).forEach(([r, c]) => cells.add(key(r, c)));
    const all = [...cells]; if (symCount(new Set(all), rows, cols) !== want) return GEN.sym();
    const need = R.int(2, Math.min(3, all.length - 2)); const hide = R.shuffle(all).slice(0, need);
    const given = all.filter((k) => !hide.includes(k)).map((k) => k.split(',').map(Number));
    if (symCount(new Set(given.map(([r, c]) => key(r, c))), rows, cols) === want) return GEN.sym();
    return G(gridq({ t: 4, sk: 'sym', rows, cols, given, need, q: `Shade <b>${need}</b> more squares so that the shape has exactly ${want === 1 ? 'one line' : '2 lines'} of symmetry.`, check: (s) => symCount(s, rows, cols) === want, ex: hide.map((k) => k.split(',').map(Number)) }));
  },
  poly() {
    const names = [[3, 'triangle'], [4, 'quadrilateral'], [5, 'pentagon'], [6, 'hexagon'], [7, 'heptagon'], [8, 'octagon']];
    const [n, name] = R.pick(names.slice(2));
    if (R.int(0, 1)) { const o = R.shuffle(names.slice(2).map((x) => x[1])); return G(mcq({ t: 4, sk: 'poly', q: `What is the name of a polygon with ${n} sides?` }, o, o.indexOf(name))); }
    const cut = R.int(1, 2); const left = n - cut; const nm = names.find((x) => x[0] === left);
    if (!nm || left < 4) return GEN.poly();
    const o = names.map((x) => x[1]).slice(1, 5);
    return G(mcq({ t: 4, sk: 'poly', q: `Draw ${cut === 1 ? 'one line' : 'two lines'} inside ${name === 'octagon' ? 'an' : 'a'} ${name}, from vertex to vertex, to cut off ${cut === 1 ? 'one triangle' : 'two triangles'} at the corners. The lines do not cross. What is the shape left in the middle?`, why: `Each cut removes one corner: ${n} − ${cut} = ${left} sides` }, o, o.indexOf(nm[1])));
  },
  solid() {
    const facts = [
      ['a cube', 6, 12, 8], ['a cuboid', 6, 12, 8], ['a square-based pyramid', 5, 8, 5], ['a triangular prism', 5, 9, 6], ['a triangular-based pyramid (tetrahedron)', 4, 6, 4],
    ];
    const k = R.int(0, 2);
    if (k === 0) { const [nm, f, e, v] = R.pick(facts); const what = R.pick([['faces', f], ['edges', e], ['vertices', v]]); return G(inq({ t: 4, sk: 'solid', q: `How many ${what[0]} does ${nm} have?` }, [['', what[1], '']])); }
    if (k === 1) { const a = R.int(1, 6); return G(inq({ t: 4, sk: 'solid', q: `Opposite faces of a dice add up to 7. Which number is opposite ${a}?` }, [['', 7 - a, '']])); }
    const d = R.pick([['It has 2 circular faces and 1 curved face.', 'cylinder'], ['It has 1 circular face and 1 curved face that comes to a point.', 'cone'], ['It has 1 curved surface and no edges.', 'sphere'], ['It has 6 square faces.', 'cube'], ['It has a square base and 4 triangular faces.', 'square-based pyramid'], ['It has 2 triangular faces and 3 rectangular faces.', 'triangular prism']]);
    const o = R.shuffle(['cylinder', 'cone', 'sphere', 'cube', 'square-based pyramid', 'triangular prism'].filter((x) => x !== d[1])).slice(0, 3).concat(d[1]); const oo = R.shuffle(o);
    return G(mcq({ t: 4, sk: 'solid', q: `${d[0]} What 3D shape is it?` }, oo, oo.indexOf(d[1])));
  },
  fof() {
    const den = R.pick([3, 4, 5, 8, 10]), num = R.int(1, den - 1); const unit = R.int(3, 15); const tot = den * unit;
    if (gcd(num, den) !== 1) return GEN.fof();
    if (R.int(0, 1)) return G(inq({ t: 5, sk: 'fof', q: `Calculate ${fx(num + '/' + den)} of ${tot}.`, why: `${tot} ÷ ${den} = ${unit}, × ${num} = ${unit * num}` }, [['', unit * num, '']]));
    return G(inq({ t: 5, sk: 'fof', q: `There are ${tot} sweets. ${fx(num + '/' + den)} of them are strawberry. The rest are lemon. How many lemon sweets are there?`, why: `Strawberry: ${tot} ÷ ${den} × ${num} = ${unit * num}. Lemon: ${tot} − ${unit * num} = ${tot - unit * num}` }, [['', tot - unit * num, 'lemon sweets']]));
  },
  eqv() {
    const pairs = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [7, 20], [11, 20], [3, 25], [12, 25], [9, 50]];
    const [n, d] = R.pick(pairs); const pc = (n / d) * 100;
    const k = R.int(0, 2);
    if (k === 0) return G(inq({ t: 5, sk: 'eqv', q: 'Write the fraction as a percentage.', why: `${n}/${d} = ${pc}/100` }, [[`${fx(n + '/' + d)} =`, pc, '%']]));
    if (k === 1) return G(inq({ t: 5, sk: 'eqv', q: 'Write the percentage as a decimal.' }, [[`${pc}% =`, round6(pc / 100), '']]));
    const lo = R.int(2, 8) * 10; return G(inq({ t: 5, sk: 'eqv', q: `Write a whole number to make this correct: ${nf(lo / 100 + 0.1)} > ▢% > ${nf(lo / 100)}`, why: `${nf(lo / 100)} = ${lo}%` }, [['', (p) => isInt(p) && p.v > lo && p.v < lo + 10, '%', String(lo + 5)]]));
  },
  mixed() {
    const d = R.int(2, 9), w = R.int(1, 5), n = R.int(1, d - 1);
    if (gcd(n, d) !== 1) return GEN.mixed();
    if (R.int(0, 1)) return G(inq({ t: 5, sk: 'mixed', q: `Write ${fx((w * d + n) + '/' + d)} as a mixed number.`, why: `${w * d + n} ÷ ${d} = ${w} remainder ${n}` }, [['', `${w} ${n}/${d}`, '']]));
    return G(inq({ t: 5, sk: 'mixed', q: 'Write a number in the box.', why: `${w} = ${w * d}/${d}, so add ${n}: ${w * d + n}/${d}` }, [[`${fx(w + ' ' + n + '/' + d)} =`, w * d + n, `/ ${d}`]]));
  },
  fdiv() {
    if (R.int(0, 1)) { const a = R.int(1, 9), b = R.int(a + 1, 12); return G(inq({ t: 5, sk: 'fdiv', q: `Write the fraction that represents ${a} ÷ ${b}.` }, [['', `${a}/${b}`, '']])); }
    const base = R.pick([2, 3, 4]), n = R.int(2, 6);
    return G(inq({ t: 5, sk: 'fdiv', q: `${fx('1/' + base)} of a pizza is shared equally between ${n} children. What fraction of the whole pizza does each child get?`, why: `1/${base} ÷ ${n} = 1/${base * n}` }, [['', `1/${base * n}`, '']]));
  },
  fadd() {
    const d1 = R.pick([2, 3, 4, 5]), mult = R.pick([2, 3]); const d2v = d1 * mult; const n1 = R.int(1, d1 - 1), n2 = R.int(1, d2v - 1);
    if (R.int(0, 1)) {
      const tot = n1 * mult + n2;
      return G(inq({ t: 5, sk: 'fadd', q: `Calculate ${fx(n1 + '/' + d1)} + ${fx(n2 + '/' + d2v)}.`, why: `${n1}/${d1} = ${n1 * mult}/${d2v}. ${n1 * mult}/${d2v} + ${n2}/${d2v} = ${tot}/${d2v}` }, [['', F(tot / d2v), '', `${tot}/${d2v}`]]));
    }
    const A = n1 / d1, B = n2 / d2v; const s = A > B + 1e-9 ? '>' : A < B - 1e-9 ? '<' : '=';
    return G(rowq({ t: 5, sk: 'fadd', q: 'Choose <, = or >.', why: `${n1}/${d1} = ${n1 * mult}/${d2v}` }, [{ t: `[[${n1}/${d1}]] {} [[${n2}/${d2v}]]`, ch: ['<', '=', '>'], a: [s] }]));
  },
  pct() {
    if (R.int(0, 1)) { const parts = R.pick([5, 10]); const sh = R.int(1, parts - 1); const idx = R.shuffle([...Array(parts).keys()]).slice(0, sh); return G(inq({ t: 5, sk: 'pct', fig: pentagonParts(parts, idx), q: `This regular pentagon is divided into ${parts} equal parts. What percentage is shaded?`, why: `${sh}/${parts} = ${(sh / parts) * 100}%` }, [['', (sh / parts) * 100, '%']])); }
    const p = R.pick([2, 4, 5, 6, 8, 10, 12]);
    return G(gridq({ t: 5, sk: 'pct', rows: 10, cols: 10, given: [], need: p, small: true, q: `Shade ${p}% of this 100-square grid.`, check: (s) => s.size === p, ex: [...Array(p).keys()].map((i) => [Math.floor(i / 10), i % 10]) }));
  },
};
const SKILL_GEN = Object.keys(GEN);

// ===================== GRADING =====================
// response shapes: in: [strings]; mc: idx; multi: [idx]; rows: [[choice]]; order: [items]; match: [rightIdx]; grid: Set of "r,c" (added); dots: [idx]
function grade(q, resp) {
  try {
    switch (q.k) {
      case 'in': {
        const ps = resp.map(parse);
        if (ps.some((p) => !p)) return false;
        if (q.check) return !!q.check(ps);
        return q.parts.every((pt, i) => pt.fn(ps[i]));
      }
      case 'mc': return resp === q.a;
      case 'multi': { const s = resp.slice().sort((a, b) => a - b); return s.length === q.a.length && s.every((x, i) => x === q.a[i]); }
      case 'rows': if (q.check) return !!q.check(resp); return q.rows.every((r, i) => r.a.every((x, j) => resp[i] && resp[i][j] === x));
      case 'order': return resp.length === q.a.length && resp.every((x, i) => x === q.a[i]);
      case 'match': return q.a.every((x, i) => resp[i] === x);
      case 'grid': {
        if (resp.size !== q.need) return false;
        const all = new Set([...q.given.map(([r, c]) => key(r, c)), ...resp]);
        return !!q.check(all);
      }
      case 'dots': return resp.length === q.need && !!q.check(resp);
    }
  } catch (e) { return false; }
  return false;
}
// the example response (used for "show answer" and self-tests)
function exampleResp(q) {
  switch (q.k) {
    case 'in': return q.parts.map((p) => p.ex);
    case 'mc': return q.a;
    case 'multi': return q.a.slice();
    case 'rows': return q.rows.map((r) => r.a.slice());
    case 'order': return q.a.slice();
    case 'match': return q.a.slice();
    case 'grid': return new Set(q.ex.map(([r, c]) => key(r, c)));
    case 'dots': return q.ex.slice();
  }
}

if (typeof module !== 'undefined') module.exports = { ORIG, GEN, SKILL_GEN, SKILLS, TOPICS, grade, exampleResp, parse };
