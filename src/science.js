// ===== Candy Math: Grade 4 Science (Unit 1 Plants, Unit 2 Sound, Unit 3 States & Properties of Matter) =====
// Worksheet questions copy the school "Science Review" sheets: same wording, same characters, same answer format.
// Drawing tasks become "choose the picture" and "Describe/Explain" tasks become "choose the answer that would get the mark".
// Practice templates (SCI_TPL) clone those questions; only the numbers or the examples change.

TOPICS.push(
  { id: 7, subj: 'sci', name: 'Plants', sheet: 'Unit 1', lid: '1', candy: 'Lime drops', color: 'mint' },
  { id: 8, subj: 'sci', name: 'Sound', sheet: 'Unit 2', lid: '2', candy: 'Grape fizz', color: 'grape' },
  { id: 9, subj: 'sci', name: 'States & Properties of Matter', sheet: 'Unit 3', lid: '3', candy: 'Blue ice', color: 'sky' },
);

Object.assign(SKILLS, {
  flower: { t: 7, en: 'Parts of a flower', vi: 'Bộ phận CÁI (carpel) = stigma + style + ovary (chứa ovule). Bộ phận ĐỰC (stamen) = anther + filament. Petal và sepal không đực, không cái. Mẹo: staMEN = đực.' },
  pollin: { t: 7, en: 'Pollination & fertilisation', vi: 'Pollination: hạt phấn đi từ anther sang stigma (A → S). Fertilisation: tế bào đực trong hạt phấn gặp trứng trong ovule. Ovule thành hạt, ovary thành quả.' },
  cycle: { t: 7, en: 'Life cycle & germination', vi: 'Vòng đời: germination → plant growth → flowering → pollination & fertilisation → fruit and seeds → seed dispersal → lại germination. Hạt nảy mầm cần nước, không khí, độ ấm.' },
  disperse: { t: 7, en: 'Seed dispersal', vi: 'Gió: hạt nhẹ có lông/cánh. Động vật: quả mọng bị ăn, hoặc có móc bám lông. Nước: quả nổi. Nổ: vỏ khô bật ra. Đi xa cây mẹ để bớt tranh giành ánh sáng, nước, chỗ.' },
  pgroup: { t: 7, en: 'Flowering & non-flowering plants', vi: 'Cây có hoa thì làm ra hạt. Dương xỉ (fern) và rêu (moss) không có hoa, sinh sản bằng bào tử. Cây thông (conifer) có hạt trong nón nhưng không có hoa.' },
  enq1: { t: 7, en: 'Plant investigations', vi: 'Thay đổi MỘT thứ (independent), đo kết quả (dependent), giữ nguyên các thứ khác (control). Tìm bằng chứng: so sánh hai đĩa chỉ khác nhau đúng một điều kiện.' },
  vib: { t: 8, en: 'How sound is made and travels', vi: 'Vật rung (vibrate) → rung động truyền qua không khí (rắn, lỏng, khí đều được) → tai nghe. Càng xa nguồn âm thì càng nhỏ.' },
  volpitch: { t: 8, en: 'Volume & pitch', vi: 'Volume (to/nhỏ) = rung MẠNH hay yếu (bigger/smaller). Pitch (cao/trầm) = rung NHANH hay chậm (faster/slower).' },
  instr: { t: 8, en: 'Instruments & changing pitch', vi: 'Dây ngắn hơn, mảnh hơn, căng hơn → rung nhanh hơn → nốt cao hơn. Nhạc cụ hơi: cột không khí ngắn hơn → cao hơn. Gõ chai: càng nhiều nước càng trầm. Thổi chai: càng nhiều nước càng cao.' },
  enq2: { t: 8, en: 'Sound investigations & tables', vi: 'Đọc đúng hàng, đúng cột. Khoảng chênh = cao nhất − thấp nhất. Vật cách âm tốt nhất là vật có số dB NHỎ nhất.' },
  states: { t: 9, en: 'Solids, liquids, gases & particles', vi: 'Rắn: hạt sát nhau, xếp hàng, chỉ rung tại chỗ. Lỏng: hạt sát nhau nhưng trượt qua nhau. Khí: hạt cách xa nhau, chuyển động nhanh khắp nơi.' },
  change: { t: 9, en: 'Changes of state, melting & boiling points', vi: 'Melting rắn → lỏng, freezing lỏng → rắn, evaporation/boiling lỏng → khí, condensation khí → lỏng. Nước tinh khiết: đông đặc 0 °C, sôi 100 °C. Ở 20 °C: dưới nhiệt độ nóng chảy là rắn, giữa hai số là lỏng, trên nhiệt độ sôi là khí.' },
  wcycle: { t: 9, en: 'The water cycle', vi: 'Evaporation (nước bốc hơi lên) → condensation (hơi nước lạnh đi, thành giọt nước trong mây) → precipitation (mưa, tuyết rơi) → nước chảy về sông, hồ, biển.' },
  dissolve: { t: 9, en: 'Dissolving, solutions & separating', vi: 'Solute (chất tan, ví dụ muối) + solvent (dung môi, ví dụ nước) = solution (dung dịch). Lấy lại muối: đun cho nước bay hơi. Cát không tan: dùng giấy lọc.' },
  enq3: { t: 9, en: 'Matter investigations & data', vi: 'Tính lượng giảm = khối lượng lúc đầu − lúc sau. Nhìn bảng tìm quy luật: nhiệt độ cao hơn thì bay hơi nhiều hơn.' },
});

// ---------------- figures ----------------
const tbl = tableHtml;
function boxText(x, y, w, h, lines, cls = 'paper') {
  const ty = y + h / 2 - ((lines.length - 1) * 15) / 2 + 5;
  return `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/>` + lines.map((l, i) => `<text class="lab sm" x="${x + w / 2}" y="${ty + i * 15}" text-anchor="middle">${l}</text>`).join('');
}
const arrowDown = (x1, y1, x2, y2) => `<line class="stroke" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2 - 6}"/><polygon class="ink" points="${x2 - 4},${y2 - 7} ${x2 + 4},${y2 - 7} ${x2},${y2}"/>`;
function keyFig() {
  let s = boxText(240, 6, 110, 28, ['living things']);
  s += `<line class="stroke" x1="295" y1="34" x2="295" y2="46"/><line class="stroke" x1="135" y1="46" x2="455" y2="46"/>`;
  s += arrowDown(135, 46, 135, 60) + arrowDown(455, 46, 455, 60);
  s += boxText(70, 60, 130, 28, ['do <tspan font-weight="800">not</tspan> make seeds']) + boxText(390, 60, 130, 28, ['make seeds']);
  s += arrowDown(80, 88, 80, 104) + arrowDown(190, 88, 190, 104) + arrowDown(400, 88, 400, 104) + arrowDown(510, 88, 510, 104);
  s += boxText(30, 104, 100, 48, ['have no true', 'roots, stems', 'or leaves']) + boxText(140, 104, 100, 48, ['have roots,', 'stems and', 'leaves']);
  s += boxText(350, 104, 100, 48, ['no flowers']) + boxText(460, 104, 100, 48, ['flowers']);
  s += arrowDown(190, 152, 190, 170) + arrowDown(400, 152, 400, 170) + arrowDown(510, 152, 510, 170);
  s += boxText(150, 170, 80, 26, ['<tspan font-weight="800">ferns</tspan>'], 'paper') + boxText(360, 170, 80, 26, ['<tspan font-weight="800">conifers</tspan>'], 'paper') + boxText(470, 170, 80, 26, ['<tspan font-weight="800">tulips</tspan>'], 'paper');
  s += `<line class="stroke" x1="80" y1="152" x2="80" y2="212"/><line class="stroke" x1="80" y1="212" x2="190" y2="212"/>` + arrowDown(80, 212, 80, 226) + arrowDown(190, 212, 190, 226);
  s += boxText(35, 226, 90, 34, ['grow', 'in water']) + boxText(145, 226, 90, 34, ['grow on', 'land']);
  s += arrowDown(80, 260, 80, 276) + arrowDown(190, 260, 190, 276);
  s += boxText(40, 276, 80, 26, ['<tspan font-weight="800">algae</tspan>'], 'paper') + boxText(150, 276, 80, 26, ['<tspan font-weight="800">mosses</tspan>'], 'paper');
  return svg(590, 308, s);
}
// flower diagram; lab = {part: letter}. parts: stigma style ovary anther filament petal sepal
function flowerFig(lab = {}) {
  let s = `<line class="stroke" x1="150" y1="150" x2="150" y2="205" style="stroke-width:5"/>`;
  s += `<path class="paper" d="M150 150 L112 160 L128 138 Z"/><path class="paper" d="M150 150 L188 160 L172 138 Z"/>`;
  s += `<ellipse class="paper" cx="92" cy="112" rx="50" ry="20" transform="rotate(-28 92 112)"/><ellipse class="paper" cx="208" cy="112" rx="50" ry="20" transform="rotate(28 208 112)"/>`;
  s += `<ellipse class="paper" cx="150" cy="128" rx="20" ry="24"/>`;
  [[142, 122], [158, 122], [150, 136], [142, 138], [158, 138]].forEach(([x, y]) => (s += `<circle class="shade" cx="${x}" cy="${y}" r="3.5"/>`));
  s += `<line class="stroke" x1="150" y1="104" x2="150" y2="50" style="stroke-width:4"/><ellipse class="shade" cx="150" cy="46" rx="11" ry="6"/>`;
  s += `<line class="stroke" x1="134" y1="140" x2="112" y2="62"/><ellipse class="shade" cx="110" cy="56" rx="7" ry="11"/>`;
  s += `<line class="stroke" x1="166" y1="140" x2="188" y2="62"/><ellipse class="shade" cx="190" cy="56" rx="7" ry="11"/>`;
  const at = { stigma: [150, 44, 230, 22], style: [151, 78, 250, 70], ovary: [168, 132, 262, 160], anther: [104, 52, 34, 34], filament: [121, 100, 30, 86], petal: [70, 122, 28, 150], sepal: [122, 154, 70, 194] };
  for (const [part, L] of Object.entries(lab)) { const [px, py, lx, ly] = at[part]; s += `<line class="stroke thin" x1="${px}" y1="${py}" x2="${lx}" y2="${ly}"/>${lab_(lx, ly, L)}`; }
  return svg(300, 212, s);
}
function lab_(x, y, t) { return `<rect class="box" x="${x - 14}" y="${y - 13}" width="28" height="24" rx="5"/><text class="lab b" x="${x}" y="${y + 4}" text-anchor="middle">${t}</text>`; }
// seedling pots. kinds per position: 'tall' (taller, yellow), 'healthy', 'lean' (growing to the right)
function potsFig(kinds) {
  let s = '';
  kinds.forEach((k, i) => {
    const x = 20 + i * 130;
    s += `<polygon class="paper" points="${x},120 ${x + 90},120 ${x + 78},170 ${x + 12},170"/>${lab(x + 45, 160, 'ABC'[i])}`;
    for (let j = 0; j < 7; j++) {
      const bx = x + 12 + j * 11;
      if (k === 'tall') s += `<path class="stroke" fill="none" d="M${bx} 120 L${bx + (j - 3) * 2} 30"/><ellipse class="paper" cx="${bx + (j - 3) * 2 + (j % 2 ? 8 : -8)}" cy="${30}" rx="7" ry="3"/>`;
      else if (k === 'lean') s += `<path class="stroke" fill="none" d="M${bx} 120 Q${bx + 4} 95 ${bx + 26} 82"/><ellipse class="shade" cx="${bx + 30}" cy="80" rx="7" ry="4"/>`;
      else s += `<path class="stroke" fill="none" d="M${bx} 120 L${bx} 88"/><ellipse class="shade" cx="${bx - 5}" cy="86" rx="7" ry="4"/><ellipse class="shade" cx="${bx + 5}" cy="86" rx="7" ry="4"/>`;
    }
  });
  if (kinds.includes('lean')) s += `<text class="lab sm" x="${20 + kinds.indexOf('lean') * 130 + 112}" y="20" text-anchor="end">light →</text>`;
  return svg(400, 180, s);
}
// glass bottles with water; lv = fraction filled per bottle
function bottlesFig(lv, left, right) {
  let s = '';
  lv.forEach((f, i) => {
    const x = 90 + i * 70, top = 40, bot = 160, hgt = (bot - top) * f;
    s += `<rect class="shade" x="${x}" y="${bot - hgt}" width="44" height="${hgt}"/>`;
    s += `<path class="stroke" fill="none" d="M${x + 14} 8 L${x + 14} 26 Q${x} 30 ${x} 44 L${x} ${bot} L${x + 44} ${bot} L${x + 44} 44 Q${x + 44} 30 ${x + 30} 26 L${x + 30} 8"/>`;
    s += lab(x + 22, 184, 'ABCDE'[i]);
  });
  if (left) s += `<text class="lab sm" x="44" y="90" text-anchor="middle">${left[0]}</text><text class="lab sm" x="44" y="106" text-anchor="middle">${left[1]}</text>`;
  if (right) s += `<text class="lab sm" x="${90 + lv.length * 70 + 30}" y="90" text-anchor="middle">${right[0]}</text><text class="lab sm" x="${90 + lv.length * 70 + 30}" y="106" text-anchor="middle">${right[1]}</text>`;
  return svg(90 + lv.length * 70 + 70, 200, s);
}
function barChart(labels, vals, o = {}) {
  const max = o.max, step = o.step, bw = o.bw || 52; const x0 = 46, y0 = 150, top = 14; const W = x0 + 10 + labels.length * bw + 6;
  const Y = (v) => y0 - (v / max) * (y0 - top);
  let s = '';
  for (let v = 0; v <= max + 1e-9; v += step) s += `<line class="stroke thin" x1="${x0}" y1="${Y(v)}" x2="${W - 4}" y2="${Y(v)}" opacity="0.3"/><text class="lab sm" x="${x0 - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`;
  labels.forEach((l, i) => { const x = x0 + 8 + i * bw; s += `<rect class="shade" x="${x}" y="${Y(vals[i])}" width="${bw - 16}" height="${y0 - Y(vals[i])}"/><text class="lab sm" x="${x + (bw - 16) / 2}" y="${y0 + 17}" text-anchor="middle">${l}</text>`; });
  s += `<line class="stroke" x1="${x0}" y1="${top - 6}" x2="${x0}" y2="${y0}"/><line class="stroke" x1="${x0}" y1="${y0}" x2="${W - 4}" y2="${y0}"/>`;
  if (o.title) s += `<text class="lab sm" x="${W / 2}" y="${y0 + 34}" text-anchor="middle">${o.title}</text>`;
  return svg(W, o.title ? 192 : 172, s, o.cls || '');
}
function lineChart(labels, vals, o) {
  const x0 = 46, y0 = 170, top = 14, gap = 30, W = x0 + 20 + labels.length * gap; const Y = (v) => y0 - ((v - o.min) / (o.max - o.min)) * (y0 - top);
  let s = '';
  for (let v = o.min; v <= o.max; v += o.step) s += `<text class="lab sm" x="${x0 - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text><line class="stroke thin" x1="${x0}" y1="${Y(v)}" x2="${W}" y2="${Y(v)}" opacity="0.25"/>`;
  const pts = vals.map((v, i) => [x0 + 18 + i * gap, Y(v)]);
  s += `<polyline fill="none" class="stroke" points="${pts.map((p) => p.join(',')).join(' ')}"/>` + pts.map(([x, y]) => `<rect class="ink" x="${x - 3}" y="${y - 3}" width="6" height="6"/>`).join('');
  labels.forEach((l, i) => (s += `<text class="lab sm" x="${x0 + 18 + i * gap}" y="${y0 + 17}" text-anchor="middle">${l}</text>`));
  s += `<line class="stroke" x1="${x0}" y1="${top - 6}" x2="${x0}" y2="${y0}"/><line class="stroke" x1="${x0}" y1="${y0}" x2="${W}" y2="${y0}"/>`;
  return svg(W, 192, s);
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// four bar charts: the right one plus three with a mistake. Returns {opts, a}
function chartChoices(labels, vals, o) {
  const wrong = [];
  const swap = (i, j) => { const v = vals.slice(); [v[i], v[j]] = [v[j], v[i]]; return v; };
  for (let i = 0; i < vals.length; i++) for (let j = i + 1; j < vals.length; j++) if (vals[i] !== vals[j]) wrong.push(swap(i, j));
  const shift = vals.map((v, i) => (i === vals.length - 1 ? Math.max(o.step, v - o.step) : v)); if (shift.join() !== vals.join()) wrong.push(shift);
  const picks = R.shuffle(wrong.filter((w, i, arr) => arr.findIndex((x) => x.join() === w.join()) === i)).slice(0, 3);
  const all = R.shuffle([vals, ...picks]);
  return { opts: all.map((v) => barChart(labels, v, Object.assign({ cls: 'chart', bw: 40 }, o))), a: all.indexOf(vals) };
}

// ---------------- worksheet questions ----------------
(function () {
  const U = (u, n) => `Unit ${u} Review · Q${n}`, N = (u) => `Unit ${u} Exam Notes`;
  // ===== Unit 1: Plants =====
  let T = 7; const S1 = (n) => U(1, n);
  const KEY = ['algae', 'mosses', 'ferns', 'conifers', 'tulips'];
  add(rowq({ id: 'u1q1a', t: T, sk: 'pgroup', src: S1(1), fig: keyFig(), q: 'Mike finds this key in a book. Use the key to answer these questions. Complete the table to group the living things into those that do <b>not</b> make seeds and those that make seeds.', why: 'Algae, mosses and ferns do not make seeds. Conifers and tulips make seeds.', vi: ['Mike có một khóa phân loại sinh vật.', 'Mỗi loại: KHÔNG làm ra hạt hay CÓ làm ra hạt?'] },
    KEY.map((k, i) => ({ t: `${k} {}`, ch: ['do not make seeds', 'make seeds'], a: [i < 3 ? 'do not make seeds' : 'make seeds'] }))));
  add(mcq({ id: 'u1q1b', t: T, sk: 'pgroup', src: S1(1), fig: keyFig(), q: 'Which living thing in the key has flowers?', vi: ['Dùng khóa phân loại.', 'Sinh vật nào có hoa?'] }, KEY, 4));
  add(mcq({ id: 'u1q1c', t: T, sk: 'pgroup', src: S1(1), fig: keyFig(), q: 'Describe <b>one</b> difference between algae and mosses.', why: 'In the key, algae grow in water and mosses grow on land.', vi: ['Dùng khóa: tảo và rêu đều không có rễ, thân, lá thật.', 'Tảo khác rêu ở điểm nào?'] },
    ['Algae grow in water. Mosses grow on land.', 'Algae make seeds. Mosses do not make seeds.', 'Mosses have flowers. Algae do not have flowers.', 'Algae have roots, stems and leaves. Mosses do not.'], 0));
  add(mul({ id: 'u1q2', t: T, sk: 'disperse', src: S1(2), exact: 2, q: 'The picture shows a sycamore tree and some sycamore seeds. Sycamore seeds need to travel as far from the tree as possible. Write down two reasons why.', why: 'Seedlings need room. Spreading seeds reduces competition for light, water and space.', vi: ['Hạt cây sung dâu (sycamore) cần bay càng xa cây mẹ càng tốt.', 'Chọn 2 lý do.'] },
    ['The young plants get more light.', 'The young plants get more water and space.', 'The seeds get bigger when they travel.', 'The parent tree needs all the seeds near it.', 'The seeds need to stay dry.'], [0, 1]));
  add(ordx({ id: 'u1q3a', t: T, sk: 'pollin', src: S1(3), q: 'The picture shows a seed. Describe how seeds are formed. Put the steps in order.', why: 'Pollination moves pollen. Fertilisation joins cells. The ovule becomes the seed.', vi: ['Một hạt.', 'Hạt được tạo ra thế nào? Xếp các bước theo đúng thứ tự.', 'Bấm các bước theo thứ tự, bước đầu tiên trước.'] },
    ['Pollen moves from an anther to a stigma.', 'A pollen tube grows down the style to the ovary.', 'A male cell joins an egg cell in an ovule.', 'The ovule becomes a seed.'], 'Tap the steps in order, first step first'));
  add(txtq({ id: 'u1q3b', t: T, sk: 'cycle', src: S1(3), q: 'Seeds need water to germinate. Write down <b>one</b> other factor seeds need to germinate.', why: 'Conditions needed: water, air and warmth.', vi: ['Hạt cần nước để nảy mầm.', 'Viết thêm MỘT điều kiện khác (tiếng Anh).'] },
    [['', ['warmth', 'warm', 'heat', 'air', 'oxygen', 'a warm place', 'warm temperature', 'the right temperature'], '']]));
  const mia = tbl(['dish', 'number of seeds in each dish', 'light or dark', 'warm or cold', 'number of seeds germinated'], [['A', 10, 'light', 'warm', 8], ['B', 8, 'light', 'cold', 1], ['C', 10, 'dark', 'warm', 7], ['D', 9, 'dark', 'cold', 0]]);
  const miaQ = 'Mia investigates seed germination. Mia has four dishes A, B, C and D. Into each dish she puts filter paper, cotton wool, seeds and 3 cm³ of water. She puts the dishes in different places for five days. Here are her results.';
  add(mcq({ id: 'u1q4a', t: T, sk: 'enq1', src: S1(4), fig: mia, q: miaQ + ' What is the <b>dependent</b> variable in Mia\'s investigation?', why: 'The dependent variable is what you measure: the number of seeds germinated.', vi: ['Mia thử 4 đĩa hạt ở chỗ sáng/tối, ấm/lạnh.', 'Biến phụ thuộc (thứ Mia ĐO) là gì?'] },
    ['the number of seeds germinated', 'light or dark', 'warm or cold', 'the 3 cm³ of water'], 0));
  add(mcq({ id: 'u1q4b', t: T, sk: 'enq1', src: S1(4), fig: mia, q: 'Mia\'s investigation is <b>not</b> a fair test. Describe how Mia improves her investigation to make it a fair test.', why: 'The dishes have 10, 8, 10 and 9 seeds. The number of seeds must be the same in every dish.', vi: ['Thí nghiệm của Mia KHÔNG công bằng.', 'Mia cần sửa gì? (Nhìn cột số hạt trong mỗi đĩa.)'] },
    ['Put the same number of seeds in each dish.', 'Put all the dishes in the same place.', 'Use a different amount of water in each dish.', 'Leave the dishes for one day only.'], 0));
  add(rowq({ id: 'u1q4c', t: T, sk: 'enq1', src: S1(4), fig: mia, q: 'Use the results in the table to complete the sentences.', why: 'Warm dishes A and C: 8 and 7 germinated. Cold dishes B and D: 1 and 0. Dark dish C still had 7 germinate.', vi: ['Bảng kết quả của Mia.', 'Điều kiện nào CẦN để hạt nảy mầm? Điều kiện nào KHÔNG cần?'] },
    [{ t: 'A condition needed for these seeds to germinate is {}', ch: ['light', 'warmth'], a: ['warmth'] }, { t: 'A condition <b>not</b> needed for these seeds to germinate is {}', ch: ['light', 'warmth'], a: ['light'] }]));
  add(mcq({ id: 'u1q4d', t: T, sk: 'enq1', src: S1(4), fig: mia, q: 'A condition needed for these seeds to germinate is warmth. The evidence in the table is…', vi: ['Hạt cần độ ấm.', 'Bằng chứng nào trong bảng cho thấy điều đó?'] },
    ['In the warm dishes (A and C) 8 and 7 seeds germinated. In the cold dishes (B and D) only 1 and 0 germinated.', 'In the light dishes (A and B) 8 and 1 seeds germinated.', 'Dish D had 9 seeds in it.', 'Dish C was dark and warm.'], 0));
  add(mcq({ id: 'u1q4e', t: T, sk: 'enq1', src: S1(4), fig: mia, q: 'A condition <b>not</b> needed for these seeds to germinate is light. The evidence in the table is…', vi: ['Hạt KHÔNG cần ánh sáng.', 'Bằng chứng nào trong bảng?'] },
    ['Dish C was in the dark but 7 seeds still germinated, almost as many as dish A (8) in the light.', 'Dish B was in the light and only 1 seed germinated.', 'Dish D was dark and cold and 0 seeds germinated.', 'Dish A had 10 seeds.'], 0));
  add(rowq({ id: 'u1q5', t: T, sk: 'disperse', src: S1(5), fig: tbl(['plant', 'description', 'type of seed dispersal'], [['A', 'seeds are large and lightweight so they float', '<b>water</b>'], ['B', 'seeds have tiny hooks on them so they attach to things', '?'], ['C', 'seeds have wings and are lightweight so they move in air', '?'], ['D', 'seeds are found inside fruits so they are eaten', '?']]), q: 'Plants are adapted to disperse seeds in different ways. Complete the table to identify the type of seed dispersal for each description.', vi: ['Bảng mô tả hạt của 4 cây. Cây A đã làm mẫu: water.', 'Hạt của B, C, D phát tán bằng cách nào?'] },
    [{ t: 'B: tiny hooks {}', ch: ['water', 'wind', 'animals', 'explosion'], a: ['animals'] }, { t: 'C: wings, lightweight {}', ch: ['water', 'wind', 'animals', 'explosion'], a: ['wind'] }, { t: 'D: inside fruits that are eaten {}', ch: ['water', 'wind', 'animals', 'explosion'], a: ['animals'] }]));
  const PARTS6 = ['anther', 'filament', 'ovary', 'sepal', 'stigma', 'style'];
  add(rowq({ id: 'u1q6', t: T, sk: 'flower', src: S1(6), fig: flowerFig({ stigma: 'X', anther: 'Y' }), q: 'The diagram shows parts of a flower. Name part X and part Y. Choose from the list.', vi: ['Hình bông hoa có ghi X và Y.', 'X là bộ phận gì? Y là bộ phận gì?'] },
    [{ t: 'part X {}', ch: PARTS6, a: ['stigma'] }, { t: 'part Y {}', ch: PARTS6, a: ['anther'] }]));
  add(ordx({ id: 'u1q7', t: T, sk: 'cycle', src: S1(7), q: 'Flowering plants have a life cycle. Put the words in the correct order. Two of them have been done for you: seed production comes before seed dispersal.', why: 'pollination → fertilisation → seed production → seed dispersal → germination', vi: ['Vòng đời cây có hoa.', 'Xếp các giai đoạn theo đúng thứ tự.', 'Bấm theo thứ tự, giai đoạn đầu tiên trước.'] },
    ['pollination', 'fertilisation', 'seed production', 'seed dispersal', 'germination'], 'Tap the stages in order, first stage first'));
  const pri = tbl(['flower model', 'description of flowers', 'number of insects in 1 hour'], [['A', 'closed petals', 18], ['B', 'thin spiky petals', 3], ['C', 'small rounded petals', 2], ['D', 'long flat petals', 15]]);
  const priQ = 'Priya and Rajiv investigate pollination of flowers by insects. They make models of four different flowers. They count the number of insects near each model. Here are their results.';
  const pc = chartChoices(['A', 'B', 'C', 'D'], [18, 3, 2, 15], { max: 20, step: 2 });
  add(mcq({ id: 'u1q8a', t: T, sk: 'enq1', src: S1(8), fig: pri, q: priQ + ' Which bar chart shows their results correctly?', vi: ['Bảng số côn trùng đến mỗi mô hình hoa trong 1 giờ.', 'Biểu đồ cột nào vẽ ĐÚNG số liệu?'] }, pc.opts, pc.a));
  add(mcq({ id: 'u1q8b', t: T, sk: 'pollin', src: S1(8), fig: pri, q: 'Which description of flowers attracts the most insects?', why: 'Model A (closed petals) had 18 insects, the most.', vi: ['Bảng kết quả.', 'Kiểu cánh hoa nào thu hút NHIỀU côn trùng nhất?'] }, ['closed petals', 'thin spiky petals', 'small rounded petals', 'long flat petals'], 0));
  add(mcq({ id: 'u1q8c', t: T, sk: 'enq1', src: S1(8), fig: pri, q: 'Priya says "Small rounded petals do NOT attract many insects for pollination." Describe how the results show this.', vi: ['Priya nói cánh tròn nhỏ KHÔNG thu hút nhiều côn trùng.', 'Kết quả nào chứng minh điều đó?'] },
    ['Model C (small rounded petals) had only 2 insects in 1 hour, the fewest of all.', 'Model C had 18 insects, the most of all.', 'Model B had 3 insects in 1 hour.', 'Model A had closed petals.'], 0));
  add(mcq({ id: 'u1q9a', t: T, sk: 'pollin', src: S1(9), q: 'Plants have flowers. Why do plants have flowers?', why: 'Flowers make seeds, so they are for reproduction.', vi: ['', 'Cây có hoa để làm gì?'] }, ['excretion', 'growth', 'nutrition', 'reproduction', 'respiration'], 3));
  add(mcq({ id: 'u1q9b', t: T, sk: 'flower', src: S1(9), fig: flowerFig({ anther: 'A', stigma: 'B', ovary: 'C', sepal: 'D', petal: 'E' }), q: 'Flowers have male and female organs. The diagram shows the parts of a flower. Which labelled part of the flower is a male organ?', why: 'A is the anther. It is part of the stamen (male).', vi: ['Hình bông hoa có ghi A, B, C, D, E.', 'Chữ nào chỉ bộ phận ĐỰC?'] }, ['A', 'B', 'C', 'D', 'E'], 0));
  add(matq({ id: 'u1q10', t: T, sk: 'disperse', src: S1(10), q: 'The pictures show different seeds. Draw a line from each <b>seed</b> to the way it is <b>dispersed</b>.', vi: ['4 loại hạt: mâm xôi đen, dừa, hoa violet, sung dâu.', 'Nối mỗi loại hạt với cách nó phát tán.'] },
    ['blackberry', 'coconut', 'violet', 'sycamore'], ['burst open', 'carried in the wind', 'eaten by birds', 'float on water', 'attach to animal'], [2, 3, 0, 1]));
  const FP = ['female part', 'male part', 'not male, not female'];
  add(rowq({ id: 'u1q11', t: T, sk: 'flower', src: S1(11), q: 'Flowers have different parts. Complete the table by writing down each part in the correct column.', why: 'Female: carpel, ovary, stigma. Male: anther, stamen. Neither: petal.', vi: ['6 bộ phận của hoa.', 'Mỗi bộ phận là bộ phận cái, đực, hay không phải cả hai?'] },
    [['anther', 1], ['carpel', 0], ['ovary', 0], ['petal', 2], ['stamen', 1], ['stigma', 0]].map(([p, i]) => ({ t: `${p} {}`, ch: FP, a: [FP[i]] }))));
  const POTS = ['tall', 'healthy', 'lean'];
  const potRows = (kinds) => [{ t: 'Plant seedlings are growing to the right. They have healthy green leaves. {}', ch: ['A', 'B', 'C'], a: ['ABC'[kinds.indexOf('lean')]] }, { t: 'Plant seedlings are taller. They have yellow leaves. {}', ch: ['A', 'B', 'C'], a: ['ABC'[kinds.indexOf('tall')]] }, { t: 'Plant seedlings look healthy. They have green leaves. {}', ch: ['A', 'B', 'C'], a: ['ABC'[kinds.indexOf('healthy')]] }];
  add(rowq({ id: 'u1q12a', t: T, sk: 'cycle', src: S1(12), fig: potsFig(POTS), q: 'Oliver has three pots of plant seedlings. He labels them with the letters A, B and C. Complete the table to match the <b>letter</b> to the correct <b>description</b>.', vi: ['Oliver có 3 chậu cây con A, B, C.', 'Ghép mỗi mô tả với đúng chậu.'] }, potRows(POTS)));
  add(txtq({ id: 'u1q12b', t: T, sk: 'cycle', src: S1(12), fig: potsFig(POTS), q: 'Complete this sentence about one of the pots of seedlings.', why: 'Shoots grow up towards the light.', vi: ['Cây con trong chậu C mọc nghiêng sang phải.', 'Vì sao? Điền một từ.'] }, [['The seedlings are growing to the right because they grow towards the', ['light', 'sunlight', 'sun', 'the light'], '.']]));
  add(mul({ id: 'u1q13a', t: T, sk: 'pollin', src: S1(13), exact: 2, q: 'Insects can pollinate flowers. The flowers attract insects. Tick (✓) the <b>two</b> features of flowers that attract insects for pollination.', why: 'Insect-pollinated flowers have bright petals, scent and nectar.', vi: ['Hoa thu hút côn trùng đến thụ phấn.', 'Chọn 2 đặc điểm thu hút côn trùng.'] }, ['bright petals', 'green leaves', 'seed pod', 'small petals', 'sweet smell'], [0, 4]));
  add(mcq({ id: 'u1q13b', t: T, sk: 'pollin', src: S1(13), q: 'Describe how the insect takes the pollen to another flower. Circle the correct answer.', why: 'Insect-pollinated flowers have sticky pollen.', vi: ['', 'Côn trùng mang hạt phấn sang hoa khác bằng cách nào?'] }, ['the insect drinks the pollen', 'the insect eats the pollen', 'the insect holds the pollen in its hands', 'the pollen sticks to the insect'], 3));
  const safQ = 'Safia investigates germination. Safia chooses two seeds, puts the seeds in a cup with cotton wool, pours water into the cup using a jug and waits for the seeds to germinate.';
  add(mcq({ id: 'u1q14a', t: T, sk: 'enq1', src: S1(14), q: safQ + ' Safia only uses two seeds. Why is it a good idea to use <b>more</b> seeds?', vi: ['Safia chỉ dùng 2 hạt.', 'Vì sao nên dùng NHIỀU hạt hơn?'] }, ['Some seeds may not germinate, so more seeds give more reliable results.', 'More seeds use less water.', 'Two seeds are too heavy for the cup.', 'More seeds make the cup warmer.'], 0));
  add(mcq({ id: 'u1q14b', t: T, sk: 'cycle', src: S1(14), q: 'Describe how Safia knows the seeds have germinated.', why: 'Germination: the seed coat splits and the first root grows down, then the shoot grows up.', vi: ['', 'Làm sao Safia biết hạt đã nảy mầm?'] }, ['The seed coat splits and a root (then a shoot) grows out.', 'The seed gets smaller and disappears.', 'The water turns green.', 'The seed floats to the top.'], 0));
  add(mcq({ id: 'u1q14c', t: T, sk: 'enq1', src: S1(14), q: 'Safia wants to make some measurements in this investigation. Write down <b>one</b> thing she measures.', vi: ['Safia muốn đo một thứ.', 'Thứ nào đo được (bằng dụng cụ đo)?'] }, ['the volume of water she pours in', 'the colour of the cup', 'the name of the seeds', 'how happy the seeds look'], 0));
  const VARS = ['change (independent)', 'measure (dependent)', 'keep the same (control)'];
  add(rowq({ id: 'u1n1', t: T, sk: 'enq1', src: N(1), q: 'A fair test changes one thing and keeps the other things the same. A class tests how the amount of water affects seed germination. Sort each thing.', why: 'Change: water. Measure: number of seeds that germinate. Keep the same: seed type, number of seeds.', vi: ['Lớp thử xem lượng nước ảnh hưởng thế nào đến việc nảy mầm.', 'Mỗi thứ: thay đổi, đo, hay giữ nguyên?'] },
    [['the amount of water', 0], ['the number of seeds that germinate', 1], ['the type of seed', 2], ['the number of seeds in each pot', 2]].map(([t, i]) => ({ t: `${t} {}`, ch: VARS, a: [VARS[i]] }))));
  add(ordx({ id: 'u1n2', t: T, sk: 'cycle', src: N(1), q: 'Germination is the start of growth of a seed. Put the steps of germination in order.', why: 'Memory tip: roots grow down, shoots grow up towards the light.', vi: ['Các bước nảy mầm.', 'Xếp theo thứ tự.', 'Bấm theo thứ tự, bước đầu tiên trước.'] },
    ['The seed absorbs water and swells.', 'The seed coat splits.', 'The first root grows down.', 'The shoot grows up.', 'Leaves open and a seedling grows.'], 'Tap the steps in order, first step first'));
  add(rowq({ id: 'u1n3', t: T, sk: 'pgroup', src: N(1), q: 'Flowering plants make flowers and seeds. Non-flowering plants do not make flowers. Sort the plants.', why: 'Ferns and mosses make spores. Pine trees make seeds in cones but have no flowers.', vi: ['Cây có hoa và cây không có hoa.', 'Mỗi cây thuộc nhóm nào?'] },
    [['rose', 0], ['fern', 1], ['sunflower', 0], ['moss', 1], ['bean plant', 0], ['pine tree', 1]].map(([p, i]) => ({ t: `${p} {}`, ch: ['flowering', 'non-flowering'], a: [['flowering', 'non-flowering'][i]] }))));

  // ===== Unit 2: Sound =====
  T = 8; const S2 = (n) => U(2, n);
  const lily = tbl(['surface', 'loudness of sound'], [['A', 8], ['B', 3], ['C', 9], ['D', 3], ['E', 1]]);
  const lilyQ = 'Lily investigates how different surfaces affect the loudness of sound. She drops a pen onto a surface and listens to the sound it makes. Lily describes the loudness of the sound using numbers. Number 1 is the quietest and number 10 is the loudest. Here are her results.';
  add(mcq({ id: 'u2q1a', t: T, sk: 'enq2', src: S2(1), fig: lily, q: lilyQ + ' Which surface made the <b>loudest</b> sound? Circle the correct answer.', vi: ['Lily thả bút lên 5 mặt khác nhau. Số 1 nhỏ nhất, 10 to nhất.', 'Mặt nào phát ra tiếng TO nhất?'] }, ['A', 'B', 'C', 'D', 'E'], 2));
  const lc = chartChoices(['A', 'B', 'C', 'D', 'E'], [8, 3, 9, 3, 1], { max: 10, step: 2 });
  add(mcq({ id: 'u2q1b', t: T, sk: 'enq2', src: S2(1), fig: lily, q: 'Complete the bar chart to show the loudness of sound for each material. Which bar chart is correct?', vi: ['Bảng kết quả của Lily.', 'Chọn biểu đồ cột vẽ ĐÚNG.'] }, lc.opts, lc.a));
  add(txtq({ id: 'u2q1c', t: T, sk: 'vib', src: S2(1), q: 'Complete these sentences about sound. Loud and quiet describe the volume of a sound.', vi: ['To và nhỏ là "volume" của âm.', 'Âm thanh tạo ra khi vật làm gì? Cao và trầm gọi là gì?'] },
    [['Sound is made when an object', ['vibrates', 'vibrate', 'vibrating'], '.'], ['High and low describe the', ['pitch'], 'of a sound.']]));
  add(mcq({ id: 'u2q2a', t: T, sk: 'vib', src: S2(2), q: 'Hassan uses cymbals to make a sound. Hassan hits the cymbals together. Describe how the cymbals make the sound Hassan hears.', why: 'Source vibrates → vibrations travel → ears hear.', vi: ['Hassan đập hai cái chũm chọe vào nhau.', 'Âm thanh được tạo ra và đến tai Hassan thế nào?'] },
    ['The cymbals vibrate. The vibrations travel through the air to Hassan\'s ears.', 'The cymbals get hot and the heat makes a sound.', 'Air comes out of the cymbals and goes into Hassan\'s mouth.', 'The cymbals stop moving and this makes the sound.'], 0));
  add(mul({ id: 'u2q2b', t: T, sk: 'instr', src: S2(2), q: 'The picture shows some different musical instruments. Circle <b>all</b> the musical instruments that use strings to make a sound.', why: 'Violin, harp and guitar have strings.', vi: ['6 nhạc cụ.', 'Chọn TẤT CẢ nhạc cụ có dây.'] }, ['drum kit', 'trumpet', 'violin', 'harp', 'guitar', 'saxophone'], [2, 3, 4]));
  const bot = bottlesFig([0.15, 0.35, 0.55, 0.8], ['highest', 'pitch'], ['lowest', 'pitch']);
  const botQ = 'Lily investigates the pitch of sound. She fills four glass bottles with different amounts of water. Lily then hits each bottle with a stick and compares the pitch. Lily then draws a diagram to show her results.';
  add(mcq({ id: 'u2q3a', t: T, sk: 'instr', src: S2(3), fig: bot, q: botQ + ' Which bottle contained the most air? Circle the correct answer.', vi: ['Lily gõ vào 4 chai có lượng nước khác nhau.', 'Chai nào chứa nhiều KHÔNG KHÍ nhất?'] }, ['A', 'B', 'C', 'D'], 0));
  add(mcq({ id: 'u2q3b', t: T, sk: 'enq2', src: S2(3), fig: bot, q: 'What is the dependent variable in this investigation?', why: 'Lily changes the amount of water and measures (compares) the pitch.', vi: ['', 'Biến phụ thuộc (thứ Lily ĐO, so sánh) là gì?'] }, ['the pitch of the sound', 'the amount of water', 'the size of the bottle', 'the stick'], 0));
  add(mcq({ id: 'u2q3c', t: T, sk: 'instr', src: S2(3), fig: bot, q: 'Write down a conclusion for this investigation.', why: 'When you tap the bottles, the glass vibrates with the water. More water gave a lower note.', vi: ['A ít nước nhất có âm cao nhất. D nhiều nước nhất có âm trầm nhất.', 'Kết luận là gì?'] },
    ['The more water in the bottle, the lower the pitch.', 'The more water in the bottle, the higher the pitch.', 'All the bottles make the same pitch.', 'The more air in the bottle, the lower the pitch.'], 0));
  add(mcq({ id: 'u2q3d', t: T, sk: 'volpitch', src: S2(3), fig: bot, q: 'Lily wants to make the volume of the sound louder. Describe how she does this.', why: 'Hit harder → bigger vibrations → louder.', vi: ['Lily muốn tiếng TO hơn.', 'Lily phải làm gì?'] }, ['Hit the bottle harder.', 'Add more water to the bottle.', 'Hit the bottle more gently.', 'Use a smaller bottle.'], 0));
  add(txtq({ id: 'u2q4a', t: T, sk: 'instr', src: S2(4), q: 'Marcus is playing the recorder. What type of musical instrument is the recorder?', vi: ['Marcus thổi sáo dọc (recorder).', 'Sáo là loại nhạc cụ gì? (Gõ tiếng Anh.)'] }, [['', ['wind', 'wind instrument', 'woodwind', 'woodwind instrument'], '']]));
  add(mcq({ id: 'u2q4b', t: T, sk: 'instr', src: S2(4), q: 'How does Marcus play high notes on the recorder?', why: 'Uncover holes to shorten the air column: short air column, high note.', vi: ['', 'Marcus thổi nốt cao bằng cách nào?'] }, ['He uncovers holes so the air column is shorter.', 'He covers all the holes so the air column is longer.', 'He blows more gently.', 'He holds the recorder upside down.'], 0));
  add(txtq({ id: 'u2q5a', t: T, sk: 'change', src: S2(5), q: 'Sofia dried her hair with a hairdryer before she went to a party. Which process made Sofia\'s hair dry?', vi: ['Sofia sấy tóc.', 'Quá trình nào làm tóc khô? (Gõ tiếng Anh.)'] }, [['', ['evaporation', 'evaporating', 'evaporate'], '']]));
  add(mcq({ id: 'u2q5b', t: T, sk: 'change', src: S2(5), q: 'What happened to the particles of water in Sofia\'s hair to make the process happen?', why: 'Hair dries when water particles escape into the air.', vi: ['', 'Các hạt nước trên tóc đã thế nào?'] }, ['They got more energy, moved faster and escaped into the air.', 'They slowed down and turned into ice.', 'They sank deeper into her hair.', 'They got bigger and heavier.'], 0));
  add(txtq({ id: 'u2q5c', t: T, sk: 'change', src: S2(5), q: 'Name the opposite process to the process that made Sofia\'s hair dry.', why: 'The opposite of evaporation is condensation (gas to liquid).', vi: ['', 'Quá trình NGƯỢC với bay hơi tên là gì?'] }, [['', ['condensation', 'condensing', 'condense'], '']]));
  add(txtq({ id: 'u2q6', t: T, sk: 'dissolve', src: S2(6), q: 'What is a mixture of a liquid and a soluble solid called?', vi: ['', 'Hỗn hợp chất lỏng + chất rắn tan được gọi là gì?'] }, [['', ['solution'], '']]));
  add(txtq({ id: 'u2q7a', t: T, sk: 'instr', src: S2(7), q: 'Arun is playing the guitar. What type of musical instrument is the guitar?', vi: ['Arun chơi đàn guitar.', 'Guitar là loại nhạc cụ gì?'] }, [['', ['stringed', 'string', 'strings', 'stringed instrument', 'string instrument'], '']]));
  add(rowq({ id: 'u2q7b', t: T, sk: 'instr', src: S2(7), q: 'Answer these questions about Arun\'s guitar.', why: 'Longer, thicker or looser → lower. Shorter, thinner or tighter → higher.', vi: ['', 'Dây dày hay mảnh cho nốt trầm? Muốn nốt cao thì căng hay chùng dây?'] },
    [{ t: 'Do the thicker or thinner strings give a lower note? {}', ch: ['thicker', 'thinner'], a: ['thicker'] }, { t: 'If Arun wants to play a higher note, does he make the string tighter or looser? {}', ch: ['tighter', 'looser'], a: ['tighter'] }]));
  add(mcq({ id: 'u2q7c', t: T, sk: 'instr', src: S2(7), q: 'Explain why making the string tighter makes a higher note.', why: 'Exam tip: use "because" and say what happens to the vibrations.', vi: ['', 'Vì sao dây căng hơn thì nốt cao hơn?'] },
    ['Because a tighter string vibrates faster, so the pitch is higher.', 'Because a tighter string vibrates more slowly, so the pitch is higher.', 'Because a tighter string makes bigger vibrations, so it is louder.', 'Because a tighter string is thicker.'], 0));
  const pitch = tbl(['musical instrument', 'lowest pitch in units', 'highest pitch in units'], [['clarinet', 230, 880], ['guitar', 40, 990], ['oboe', 220, 880], ['trombone', 110, 440], ['tuba', 55, 220]]);
  const INS = ['clarinet', 'guitar', 'oboe', 'trombone', 'tuba'];
  add(mcq({ id: 'u2q8a', t: T, sk: 'enq2', src: S2(8), fig: pitch, q: 'The table shows the lowest pitch and highest pitch of five musical instruments. Which musical instrument has 220 units as its <b>lowest</b> pitch?', why: 'Look in the "lowest" column. The tuba\'s HIGHEST is 220, not its lowest.', vi: ['Bảng cao độ thấp nhất và cao nhất của 5 nhạc cụ.', 'Nhạc cụ nào có cao độ THẤP NHẤT là 220?'] }, INS, 2));
  add(inq({ id: 'u2q8b', t: T, sk: 'enq2', src: S2(8), fig: pitch, q: 'What is the <b>highest</b> pitch of the trombone?', vi: ['', 'Cao độ CAO NHẤT của trombone là bao nhiêu?'] }, [['', 440, 'units']]));
  add(mcq({ id: 'u2q8c', t: T, sk: 'enq2', src: S2(8), fig: pitch, q: 'Which musical instrument has the largest difference in pitch?', why: 'Difference = highest − lowest. Guitar: 990 − 40 = 950, the largest.', vi: ['', 'Nhạc cụ nào có khoảng chênh (cao nhất − thấp nhất) LỚN nhất?'] }, INS, 1));
  add(mcq({ id: 'u2n1', t: T, sk: 'vib', src: N(2), q: 'You hit a drum. What vibrates? How do the vibrations reach your ears?', why: 'Give both steps when asked how you hear a sound.', vi: ['Em đánh trống.', 'Cái gì rung? Rung động đến tai em thế nào?'] },
    ['The drum skin vibrates. The vibrations travel through the air to my ears.', 'The drumstick gets hot. The heat travels to my ears.', 'My ears vibrate first, then the drum.', 'The drum skin stays still. The sound comes from the stick.'], 0));
  add(mcq({ id: 'u2n2', t: T, sk: 'volpitch', src: N(2), q: 'A sound gets louder. Do the vibrations get bigger or faster?', why: 'Volume: size of vibration. Pitch: speed of vibration.', vi: ['Âm thanh to lên.', 'Rung động MẠNH hơn hay NHANH hơn?'] }, ['bigger', 'faster'], 0));
  add(inq({ id: 'u2n3', t: T, sk: 'enq2', src: N(2), q: 'Be a table detective. The highest pitch is 500 units and the lowest is 120 units. What is the difference?', why: '500 − 120 = 380', vi: ['Cao nhất 500, thấp nhất 120.', 'Khoảng chênh là bao nhiêu?'] }, [['', 380, 'units']]));
  add(rowq({ id: 'u2n4', t: T, sk: 'enq2', src: N(2), q: 'Fair test: Which material muffles sound best? Sort each thing.', why: 'The lowest reading shows the best muffling.', vi: ['Thí nghiệm: vật liệu nào cách âm tốt nhất?', 'Mỗi thứ: thay đổi, đo, hay giữ nguyên?'] },
    [['the material around the buzzer', 0], ['the sound level outside the box (dB)', 1], ['the buzzer and its setting', 2], ['the distance to the sound level meter', 2], ['the thickness of the material', 2]].map(([t, i]) => ({ t: `${t} {}`, ch: VARS, a: [VARS[i]] }))));

  // ===== Unit 3: States & Properties of Matter =====
  T = 9; const S3 = (n) => U(3, n);
  const mikeQ = 'Mike dissolves 5.0 g of salt in 100 cm³ of water.';
  add(mcq({ id: 'u3q1a', t: T, sk: 'dissolve', src: S3(1), q: mikeQ + ' Write down the piece of equipment Mike uses to measure 5.0 g of salt.', vi: ['Mike hòa tan 5.0 g muối trong 100 cm³ nước.', 'Dụng cụ nào cân 5.0 g muối?'] }, ['balance', 'measuring cylinder', 'thermometer', 'ruler'], 0));
  add(mcq({ id: 'u3q1b', t: T, sk: 'dissolve', src: S3(1), q: 'Write down the piece of equipment Mike uses to <b>accurately</b> measure 100 cm³ of water.', vi: ['', 'Dụng cụ nào đo CHÍNH XÁC 100 cm³ nước?'] }, ['measuring cylinder', 'balance', 'thermometer', 'beaker with no marks'], 0));
  add(txtq({ id: 'u3q1c', t: T, sk: 'dissolve', src: S3(1), q: 'Salt dissolves in water to make a mixture. The salt is the solute. What is the name given to the water in the mixture?', vi: ['Muối là chất tan (solute).', 'Nước trong hỗn hợp gọi là gì?'] }, [['', ['solvent'], '']]));
  add(txtq({ id: 'u3q1d', t: T, sk: 'dissolve', src: S3(1), q: 'What is the name given to a mixture of a solid dissolved in water?', vi: ['', 'Hỗn hợp chất rắn hòa tan trong nước gọi là gì?'] }, [['', ['solution'], '']]));
  add(mcq({ id: 'u3q1e', t: T, sk: 'dissolve', src: S3(1), q: 'Dissolving salt in water is a reversible process. Describe how to separate this mixture to get dry salt.', why: 'Filtering cannot take out dissolved salt. Evaporate the water and the salt is left.', vi: ['Hòa tan muối có thể đảo ngược.', 'Làm sao lấy lại muối khô?'] },
    ['Heat the solution so the water evaporates. The salt is left behind.', 'Filter the solution. The salt stays on the filter paper.', 'Freeze the solution. The salt floats to the top.', 'Stir the solution faster.'], 0));
  const miaE = tbl(['temperature of water in °C', 'mass of water at start in g', 'mass of water after 24 hours in g', 'decrease in mass of water in g'], [[20, 25, 23, 2], [25, 25, 22, 3], [30, 25, 21, '?'], [35, 25, 19, '?'], [40, 25, 13, '?']]);
  const miaEQ = 'Evaporation is one of the processes in the water cycle. Mia says, "I predict that water will evaporate faster if the temperature of the water is hotter." Mia puts 25 g of water into a beaker, keeps the temperature at 20 °C for 24 hours and finds the mass of the water left. She repeats the experiment using four different temperatures of water.';
  add(mcq({ id: 'u3q2a', t: T, sk: 'enq3', src: S3(2), q: miaEQ + ' Mia always uses 25 g of water. Write down <b>one other</b> variable that must <b>not</b> be changed in the experiment.', vi: ['Mia luôn dùng 25 g nước.', 'Thêm MỘT thứ phải GIỮ NGUYÊN?'] },
    ['the size of the beaker', 'the temperature of the water', 'the mass of water after 24 hours', 'the decrease in mass'], 0));
  add(mcq({ id: 'u3q2b', t: T, sk: 'enq3', src: S3(2), q: 'What is the <b>dependent</b> variable in this investigation?', vi: ['', 'Biến phụ thuộc (thứ Mia ĐO) là gì?'] }, ['the decrease in mass of water', 'the temperature of the water', 'the mass of water at the start', 'the time (24 hours)'], 0));
  add(inq({ id: 'u3q2c', t: T, sk: 'enq3', src: S3(2), fig: miaE, q: 'Look at her results. Complete the table by calculating the decrease in mass of water for 30, 35 and 40 °C.', why: '25 − 21 = 4, 25 − 19 = 6, 25 − 13 = 12', vi: ['Bảng khối lượng nước lúc đầu và sau 24 giờ.', 'Tính lượng giảm = lúc đầu − sau 24 giờ.'] }, [['30 °C:', 4, 'g'], ['35 °C:', 6, 'g'], ['40 °C:', 12, 'g']]));
  add(mcq({ id: 'u3q2d', t: T, sk: 'change', src: S3(2), fig: miaE, q: 'Explain why the mass of water decreases in each experiment.', vi: ['', 'Vì sao khối lượng nước giảm?'] }, ['Some water evaporates and goes into the air as water vapour.', 'The beaker leaks.', 'The water freezes.', 'The water turns into salt.'], 0));
  add(mcq({ id: 'u3q2e', t: T, sk: 'enq3', src: S3(2), fig: tbl(['temperature in °C', 20, 25, 30, 35, 40], [['decrease in mass in g', 2, 3, 4, 6, 12]]), q: 'Mia made this prediction: "I predict that water will evaporate faster if the temperature of the water is hotter." Is her prediction correct? Explain your answer using information from the results table.', vi: ['Dự đoán: nước nóng hơn bay hơi nhanh hơn.', 'Đúng không? Dùng số liệu để giải thích.'] },
    ['Yes. The hotter the water, the bigger the decrease: 2 g at 20 °C but 12 g at 40 °C.', 'No. The decrease was the same at every temperature.', 'No. The water at 20 °C evaporated the most.', 'Yes, because the mass at the start was 25 g every time.'], 0));
  add(mul({ id: 'u3q3a', t: T, sk: 'wcycle', src: S3(3), exact: 3, q: 'Water vapour is one gas found in this layer of air. Write down the names of <b>three other</b> gases found in this layer of air.', vi: ['Hơi nước là một khí trong không khí.', 'Chọn 3 khí KHÁC có trong không khí.'] }, ['nitrogen', 'oxygen', 'carbon dioxide', 'sand', 'salt', 'iron'], [0, 1, 2]));
  add(mcq({ id: 'u3q3b', t: T, sk: 'wcycle', src: S3(3), q: 'Some gases are in the layer of air because of pollution. Describe the meaning of the word <b>pollution</b>.', vi: ['', 'Ô nhiễm (pollution) nghĩa là gì?'] }, ['Harmful substances that people add to the air, water or land.', 'Clean air with lots of oxygen.', 'Water vapour in the clouds.', 'Rain that falls on mountains.'], 0));
  const carlos = '<ul><li>dissolves other substances such as salt and sugar</li><li>expands when it solidifies</li><li>has a boiling point of 100 °C</li><li>has a melting point of 10 °C</li><li>is blue in colour</li><li>makes steam when it is heated</li></ul>';
  add(mcq({ id: 'u3q4a', t: T, sk: 'change', src: S3(4), fig: carlos, q: 'Carlos investigates the properties of a liquid. He writes a list of the properties of the liquid. Carlos thinks the liquid is pure water. Tick (✓) to show if Carlos is correct.', vi: ['Carlos liệt kê tính chất một chất lỏng và nghĩ đó là nước tinh khiết.', 'Carlos đúng không?'] }, ['Yes', 'No'], 1));
  add(mul({ id: 'u3q4b', t: T, sk: 'change', src: S3(4), fig: carlos, exact: 2, q: 'Write down <b>two</b> reasons for your answer.', vi: ['Chất lỏng của Carlos không phải nước tinh khiết.', 'Chọn 2 lý do.'] }, ['Pure water melts at 0 °C, not 10 °C.', 'Pure water has no colour. It is not blue.', 'Pure water boils at 100 °C.', 'Pure water expands when it freezes.'], [0, 1]));
  const sl = svg(330, 100, `<g transform="translate(4,4)">${particles('solid', '').replace(/<svg[^>]*>|<\/svg>/g, '')}</g><g transform="translate(222,4)">${particles('liquid', '').replace(/<svg[^>]*>|<\/svg>/g, '')}</g><line class="stroke" x1="112" y1="30" x2="214" y2="30"/><polygon class="ink" points="214,25 222,30 214,35"/><text class="lab sm" x="166" y="22" text-anchor="middle">process A</text><line class="stroke" x1="118" y1="62" x2="220" y2="62"/><polygon class="ink" points="118,57 110,62 118,67"/><text class="lab sm" x="166" y="80" text-anchor="middle">process B</text><text class="lab sm" x="56" y="98" text-anchor="middle">solid</text><text class="lab sm" x="274" y="98" text-anchor="middle">liquid</text>`);
  add(txtq({ id: 'u3q5a', t: T, sk: 'change', src: S3(5), fig: sl, q: 'There are three states of matter: solid, liquid and gas. The diagrams show the particle models of a solid and a liquid. Write down the names of process A and process B.', vi: ['A: rắn → lỏng. B: lỏng → rắn.', 'Tên quá trình A và B?'] }, [['A', ['melting', 'melt', 'melts'], ''], ['B', ['freezing', 'freeze', 'freezes', 'solidifying'], '']]));
  add(mcq({ id: 'u3q5b', t: T, sk: 'states', src: S3(5), fig: sl, q: 'The particle model of a solid is different to that of a liquid. Describe <b>one difference</b> between the particle model of a solid and of a liquid.', vi: ['', 'MỘT điểm khác nhau giữa hạt chất rắn và hạt chất lỏng?'] },
    ['In a solid the particles are in rows and only vibrate. In a liquid they can move past each other.', 'In a solid the particles are far apart. In a liquid they touch.', 'Liquid particles are bigger than solid particles.', 'There are no particles in a liquid.'], 0));
  add(mcq({ id: 'u3q5c', t: T, sk: 'states', src: S3(5), fig: sl, q: 'Describe <b>one similarity</b> between the particle model of a solid and of a liquid.', vi: ['', 'MỘT điểm GIỐNG nhau?'] }, ['In both, the particles are close together (touching).', 'In both, the particles move freely and fast.', 'In both, the particles are far apart.', 'In both, the particles are in neat rows.'], 0));
  add(mcq({ id: 'u3q5d', t: T, sk: 'states', src: S3(5), q: 'Draw the particle model for a gas in the box. Which box shows a gas?', vi: ['', 'Hình nào là hạt chất KHÍ?'] }, [particles('solid'), particles('liquid'), particles('gas')], 2));
  add(txtq({ id: 'u3q6a', t: T, sk: 'change', src: S3(6), q: 'Boiling and evaporation are similar processes. Complete the sentence.', vi: ['', 'Điền: nhiệt độ sôi là nhiệt độ mà chất ... biến thành chất ...'] }, [['The boiling point of a substance is the', ['temperature', 'temp'], 'at which'], ['a', ['liquid'], 'becomes a'], ['', ['gas', 'vapour', 'vapor'], '.']]));
  add(mcq({ id: 'u3q6b', t: T, sk: 'states', src: S3(6), q: 'The evaporation of water makes water vapour. What happens to the speed of the water particles during evaporation? Use ideas about the particle model.', vi: ['', 'Khi bay hơi, tốc độ của hạt nước thế nào?'] }, ['It increases. The particles move faster.', 'It decreases. The particles slow down.', 'It stays the same.', 'The particles stop moving.'], 0));
  add(mcq({ id: 'u3q6c', t: T, sk: 'states', src: S3(6), q: 'The speed of evaporation of water increases as the temperature increases. Explain why, using ideas about the particle model.', vi: ['Nóng hơn thì bay hơi nhanh hơn.', 'Giải thích bằng mô hình hạt.'] }, ['The particles get more energy and move faster, so more of them escape from the surface.', 'The particles get bigger and push each other out.', 'The particles slow down and sink.', 'Heat makes the water heavier.'], 0));
  add(txtq({ id: 'u3q6d', t: T, sk: 'change', src: S3(6), q: 'Write down the name of the process which is the reverse of evaporation.', vi: ['', 'Quá trình NGƯỢC với bay hơi?'] }, [['', ['condensation', 'condensing', 'condense'], '']]));
  add(rowq({ id: 'u3q7a', t: T, sk: 'dissolve', src: S3(7), q: 'Which of these sentences about dissolving are true and which are false?', why: 'Sand does not dissolve, so not all solids dissolve.', vi: ['4 câu về hòa tan.', 'Mỗi câu đúng hay sai?'] },
    [['All solids dissolve in water.', 'False'], ['Dissolving is a reversible process.', 'True'], ['Liquids that dissolve substances are called solvents.', 'True'], ['Solids dissolved in liquids are called solutes.', 'True']].map(([t, a]) => ({ t: `${t} {}`, ch: TF, a: [a] }))));
  add(mcq({ id: 'u3q7b', t: T, sk: 'change', src: S3(7), q: 'Water is a liquid at room temperature. Describe what happens to water when it cools to a temperature below 0 °C.', vi: ['', 'Nước lạnh dưới 0 °C thì thế nào?'] }, ['It freezes and turns into ice (a solid). It expands.', 'It boils and turns into a gas.', 'It evaporates.', 'It stays a liquid.'], 0));
  const pt = svg(300, 290, `<g transform="translate(98,4)">${particles('gas', '').replace(/<svg[^>]*>|<\/svg>/g, '')}</g><text class="lab sm" x="150" y="102" text-anchor="middle">gas</text><g transform="translate(98,170)">${particles('solid', '').replace(/<svg[^>]*>|<\/svg>/g, '')}</g><rect class="box" x="110" y="112" width="80" height="36" rx="5"/><text class="lab sm" x="150" y="134" text-anchor="middle">liquid</text><text class="lab b" x="40" y="124" text-anchor="middle">1 ↑</text><text class="lab b" x="262" y="124" text-anchor="middle">↓ 2</text><text class="lab b" x="44" y="168" text-anchor="middle">melting ↑</text><text class="lab b" x="256" y="168" text-anchor="middle">↓ freezing</text><rect class="box" x="118" y="260" width="64" height="26" rx="5"/><text class="lab b" x="150" y="278" text-anchor="middle">3 = ?</text>`);
  add(rowq({ id: 'u3q8a', t: T, sk: 'change', src: S3(8), fig: pt, q: 'The diagram shows the particle theory. Temperature increases from the bottom to the top. Complete the diagram.', vi: ['Sơ đồ 3 thể. Đi lên là nóng hơn.', 'Điền tên quá trình 1 (lỏng → khí), 2 (khí → lỏng) và thể 3 ở dưới cùng.'] },
    [{ t: 'label 1 (liquid → gas) {}', ch: ['evaporation', 'condensation', 'melting'], a: ['evaporation'] }, { t: 'label 2 (gas → liquid) {}', ch: ['evaporation', 'condensation', 'freezing'], a: ['condensation'] }, { t: 'label 3 (the state at the bottom) {}', ch: ['solid', 'liquid', 'gas'], a: ['solid'] }]));
  add(mcq({ id: 'u3q8b', t: T, sk: 'states', src: S3(8), q: 'Include a drawing of the particles inside the liquid. Which box shows the particles in a liquid?', vi: ['', 'Hình nào là hạt chất LỎNG?'] }, [particles('solid'), particles('liquid'), particles('gas')], 1));
  const subs = tbl(['substance', 'melting point in °C', 'boiling point in °C', 'solid, liquid or gas at room temperature?'], [['A', '−7', 58, 'liquid'], ['B', 328, 1750, '?'], ['C', 0, 100, '?'], ['D', 114, 183, '?'], ['E', '−101', '−34', '?']]);
  const SLG = ['solid', 'liquid', 'gas'];
  add(rowq({ id: 'u3q9a', t: T, sk: 'change', src: S3(9), fig: subs, q: 'The table shows some information about different substances. Room temperature is usually 20 °C. Substance A is a liquid at room temperature. Complete the table to show the state of all the substances at room temperature.', why: 'At 20 °C: below the melting point → solid; between the two → liquid; above the boiling point → gas.', vi: ['Nhiệt độ phòng là 20 °C. A là chất lỏng (đã làm mẫu).', 'B, C, D, E là rắn, lỏng hay khí ở 20 °C?'] },
    [['B', 'solid'], ['C', 'liquid'], ['D', 'solid'], ['E', 'gas']].map(([l, a]) => ({ t: `substance ${l} {}`, ch: SLG, a: [a] }))));
  add(mcq({ id: 'u3q9b', t: T, sk: 'change', src: S3(9), fig: subs, q: 'Which substance is water? Write down <b>one</b> reason for your answer.', vi: ['', 'Chất nào là nước? Vì sao?'] }, ['C, because it melts at 0 °C and boils at 100 °C.', 'A, because it is a liquid at room temperature.', 'E, because it is a gas.', 'B, because it has the highest boiling point.'], 0));
  add(ordx({ id: 'u3q10a', t: T, sk: 'wcycle', src: S3(10), q: 'Aiko draws a diagram of the water cycle. Aiko has <b>not</b> drawn the arrows on her diagram. Put the labels in the order of the water cycle. Start with evaporation.', vi: ['Sơ đồ vòng tuần hoàn nước chưa có mũi tên.', 'Xếp các nhãn theo thứ tự, bắt đầu từ evaporation.', 'Bấm theo thứ tự, evaporation trước.'] },
    ['evaporation', 'condensation', 'precipitation', 'water collects in seas and lakes'], 'Tap the labels in order, starting with evaporation'));
  add(mcq({ id: 'u3q10b', t: T, sk: 'wcycle', src: S3(10), q: 'Complete this sentence about water. Most of the water on Earth is <b>not</b> pure because…', vi: ['', 'Vì sao phần lớn nước trên Trái Đất KHÔNG tinh khiết?'] }, ['it has other substances (like salt) dissolved in it.', 'it is frozen.', 'it is in the clouds.', 'it is too warm.'], 0));
  const RAIN = [20, 15, 250, 275, 140, 15, 10, 12, 22, 148, 153, 55], TEMP = [22, 23.1, 23.6, 23.3, 22.6, 21, 20.2, 20.7, 22.7, 23.4, 22.4, 21.3];
  add(mcq({ id: 'u3q11a', t: T, sk: 'wcycle', src: S3(11), fig: barChart(MONTHS.map((m) => m[0]), RAIN, { max: 300, step: 50, bw: 30, title: 'month · precipitation in mm' }), q: 'Chart A shows the monthly precipitation for one country. Which month has the highest precipitation?', vi: ['Biểu đồ A: lượng mưa mỗi tháng.', 'Tháng nào mưa nhiều nhất?'] }, ['Mar', 'Apr', 'Oct', 'Nov'], 1));
  add(mcq({ id: 'u3q11b', t: T, sk: 'wcycle', src: S3(11), fig: barChart(MONTHS.map((m) => m[0]), RAIN, { max: 300, step: 50, bw: 30, title: 'chart A · precipitation in mm' }) + lineChart(MONTHS.map((m) => m[0]), TEMP, { min: 18, max: 24, step: 1 }), q: 'Chart B shows the monthly temperature for the same country. Look at chart A and chart B. Describe the relationship between precipitation and temperature.', why: 'Mar–Apr and Oct–Nov are the warmest months and also the wettest.', vi: ['Biểu đồ A: lượng mưa. Biểu đồ B: nhiệt độ.', 'Mưa và nhiệt độ liên quan với nhau thế nào?'] },
    ['Months with higher temperatures have more precipitation.', 'Months with lower temperatures have more precipitation.', 'There is no pattern.', 'Precipitation is the same every month.'], 0));
  const chenQ = 'Chen investigates how fast salt dissolves in water. Chen adds 1 g of salt to 50 cm³ of water and stirs the mixture, writes down the time it takes for the salt to completely dissolve, and repeats this using fresh water, increasing the temperature each time.';
  add(mcq({ id: 'u3q12a', t: T, sk: 'enq3', src: S3(12), q: chenQ + ' Write down the scientific question that Chen is trying to answer.', vi: ['Chen đo thời gian muối tan, mỗi lần tăng nhiệt độ nước.', 'Chen đang muốn trả lời câu hỏi khoa học nào?'] },
    ['Does the temperature of the water change how fast salt dissolves?', 'Does salt dissolve in water?', 'How much salt is in the sea?', 'Does stirring change how fast salt dissolves?'], 0));
  add(mcq({ id: 'u3q12b', t: T, sk: 'dissolve', src: S3(12), q: 'What equipment does Chen use to measure the mass of 1 g of salt?', vi: ['', 'Dụng cụ cân 1 g muối?'] }, ['balance', 'measuring cylinder', 'thermometer', 'stopwatch'], 0));
  add(mcq({ id: 'u3q12c', t: T, sk: 'enq3', src: S3(12), q: 'Chen wants to improve his investigation. He repeats the investigation. Explain how this improves his investigation.', vi: ['Chen làm lại thí nghiệm.', 'Làm lại giúp gì?'] }, ['He can check his results are reliable and spot any results that do not fit.', 'It makes the salt dissolve faster.', 'It uses more water.', 'It makes the water hotter.'], 0));
  add(mcq({ id: 'u3q12d', t: T, sk: 'enq3', src: S3(12), q: 'Describe <b>one</b> risk in Chen\'s investigation <b>and</b> describe how to minimise this risk.', vi: ['', 'MỘT nguy hiểm và cách giảm nguy hiểm?'] },
    ['Risk: hot water can burn him. Minimise: let an adult pour it and do not touch hot equipment.', 'Risk: salt is poisonous to touch. Minimise: do not use salt.', 'Risk: the water may freeze. Minimise: heat it more.', 'Risk: stirring is noisy. Minimise: wear ear defenders.'], 0));
  const SV = ['It evaporates and goes into the air as a gas.', 'It is left behind in the dish as a solid.'];
  add(rowq({ id: 'u3q13a', t: T, sk: 'dissolve', src: S3(13), q: 'Blessy wants to separate a solvent from a solute. She heats the solution in an evaporating dish. Explain what happens to the solvent <b>and</b> to the solute.', vi: ['Blessy đun dung dịch.', 'Dung môi (nước) thế nào? Chất tan (muối) thế nào?'] }, [{ t: 'the solvent {}', ch: SV, a: [SV[0]] }, { t: 'the solute {}', ch: SV, a: [SV[1]] }]));
  const WC = ['evaporation', 'condensation', 'precipitation'];
  add(rowq({ id: 'u3q13b', t: T, sk: 'wcycle', src: S3(13), q: 'Complete the diagram of the water cycle. Name each arrow.', vi: ['Sơ đồ vòng tuần hoàn nước.', 'Đặt tên cho mỗi mũi tên.'] },
    [{ t: 'the arrow going up from the lake to the sky {}', ch: WC, a: ['evaporation'] }, { t: 'the arrow at the top, where water vapour forms clouds {}', ch: WC, a: ['condensation'] }, { t: 'the arrow coming down as rain {}', ch: WC, a: ['precipitation'] }]));
  const oli = tbl(['solid', 'observation'], [['A', 'blue liquid with <b>no</b> solid'], ['B', 'white liquid with solid'], ['C', 'clear liquid with <b>no</b> solid'], ['D', 'solid sinks'], ['E', 'clear liquid with <b>no</b> solid']]);
  add(mcq({ id: 'u3q14a', t: T, sk: 'enq3', src: S3(14), q: 'Oliver investigates if different solids dissolve in water. He adds 1 g of a solid to 30 cm³ of water and stirs the mixture. He repeats this for each solid. Write down <b>one</b> control variable in his investigation.', vi: ['Oliver thử 5 chất rắn có tan trong nước không.', 'MỘT thứ được GIỮ NGUYÊN?'] }, ['the volume of water (30 cm³)', 'the type of solid', 'what he observes', 'the colour of the liquid'], 0));
  add(rowq({ id: 'u3q14b', t: T, sk: 'dissolve', src: S3(14), fig: oli, q: 'Here are his results. Oliver groups the solids into those that dissolve and those that do <b>not</b> dissolve.', why: 'No solid left means it dissolved. A coloured liquid can still be a solution.', vi: ['Bảng quan sát.', 'Chất nào TAN, chất nào KHÔNG tan?'] },
    [['A', 0], ['B', 1], ['C', 0], ['D', 1], ['E', 0]].map(([l, i]) => ({ t: `solid ${l} {}`, ch: ['dissolve', 'do not dissolve'], a: [['dissolve', 'do not dissolve'][i]] }))));
  add(txtq({ id: 'u3q14c', t: T, sk: 'dissolve', src: S3(14), q: 'Complete the sentences.', vi: ['', 'Hỗn hợp chất rắn tan trong chất lỏng gọi là gì? Chất rắn tan trong chất lỏng gọi là gì?'] }, [['A mixture of a dissolved solid in a liquid is called a', ['solution'], '.'], ['A solid that dissolves in a liquid is called a', ['solute', 'soluble solid', 'soluble'], '.']]));
  add(rowq({ id: 'u3q15a', t: T, sk: 'change', src: S3(15), q: 'Which of these statements about water are true and which are false?', vi: ['4 câu về nước.', 'Mỗi câu đúng hay sai?'] },
    [['the boiling point of pure water is 110 °C', 'False'], ['pure water freezes at 0 °C', 'True'], ['water expands when it freezes', 'True'], ['water is a liquid at room temperature', 'True']].map(([t, a]) => ({ t: `${t} {}`, ch: TF, a: [a] }))));
  add(txtq({ id: 'u3q15b', t: T, sk: 'states', src: S3(15), q: 'Water vapour is a gas. Write down the name of another substance that is a gas at room temperature.', vi: ['Hơi nước là chất khí.', 'Viết tên MỘT chất khí khác ở nhiệt độ phòng.'] }, [['', ['oxygen', 'nitrogen', 'carbon dioxide', 'air', 'helium', 'hydrogen', 'argon', 'co2'], '']]));
  add(txtq({ id: 'u3q16a', t: T, sk: 'wcycle', src: S3(16), fig: tbl(['from', 'process', 'to'], [['water vapour in clouds', 'process A', 'water droplets in clouds'], ['sea water', 'process B', 'water vapour in clouds']]), q: 'The diagram shows a simple water cycle. What is the name of process A? What is the name of process B?', vi: ['A: hơi nước → giọt nước. B: nước biển → hơi nước.', 'Tên quá trình A và B?'] }, [['process A', ['condensation', 'condensing'], ''], ['process B', ['evaporation', 'evaporating'], '']]));
  add(mcq({ id: 'u3q16b', t: T, sk: 'wcycle', src: S3(16), q: 'Sea water contains dissolved salt. Explain why the water vapour in clouds does <b>not</b> contain any salt.', vi: ['Nước biển có muối.', 'Vì sao hơi nước trong mây không có muối?'] }, ['Only the water evaporates. The salt is left behind in the sea.', 'Salt evaporates faster than water.', 'The salt freezes in the clouds.', 'Rain washes the salt out of the clouds.'], 0));
  add(mcq({ id: 'u3q16c', t: T, sk: 'wcycle', src: S3(16), q: 'Sometimes clouds make snow rather than rain. Explain why.', vi: ['', 'Vì sao đôi khi mây tạo ra tuyết thay vì mưa?'] }, ['The air in the clouds is colder than 0 °C, so the water droplets freeze into ice.', 'The clouds are too warm.', 'There is salt in the clouds.', 'The water evaporates in the clouds.'], 0));
  add(mcq({ id: 'u3q17', t: T, sk: 'wcycle', src: S3(17), fig: tbl(['', ''], [['water in rivers, lakes and sea', '→ process A →'], ['water vapour in air', '→ process B →'], ['water droplets in clouds', '→ rain →']]), q: 'The diagram shows a simple water cycle. Explain how water vapour in the air becomes water droplets. Include in your answer the name of process B.', vi: ['Process B: hơi nước → giọt nước trong mây.', 'Giải thích và gọi tên process B.'] },
    ['The water vapour cools down and condenses into water droplets. Process B is condensation.', 'The water vapour heats up and evaporates. Process B is evaporation.', 'The water vapour freezes. Process B is freezing.', 'The water vapour melts. Process B is melting.'], 0));
  const MP = ['The temperature at which a solid melts and becomes a liquid.', 'The temperature at which a liquid becomes a gas.', 'The temperature at which a gas becomes a liquid.', 'How hot a liquid is.'];
  add(mcq({ id: 'u3q18a', t: T, sk: 'change', src: S3(18), q: 'Mercury is a silver liquid with a low melting point and a high boiling point. What is the meaning of the words <b>melting point</b>?', vi: ['Thủy ngân là kim loại lỏng.', 'Nhiệt độ nóng chảy (melting point) nghĩa là gì?'] }, MP, 0));
  add(txtq({ id: 'u3q18b', t: T, sk: 'change', src: S3(18), q: 'Mercury is a dangerous metal. It forms a poisonous vapour at room temperature. What is the name of the process that makes this vapour?', vi: ['Thủy ngân tạo ra hơi độc ở nhiệt độ phòng.', 'Quá trình đó tên là gì?'] }, [['', ['evaporation', 'evaporating'], '']]));
  add(mcq({ id: 'u3q18c', t: T, sk: 'change', src: S3(18), q: 'Mercury vapour can be changed back into mercury liquid. Suggest how this could be done.', vi: ['', 'Làm sao biến hơi thủy ngân lại thành chất lỏng?'] }, ['Cool the vapour down so it condenses.', 'Heat the vapour more.', 'Add water to the vapour.', 'Stir the vapour.'], 0));
  const bp = tbl(['liquid', 'boiling point in °C'], [['liquid A', 80], ['liquid B', 20], ['liquid C', 70], ['salt solution', 110], ['water', 100]]);
  add(mcq({ id: 'u3q19a', t: T, sk: 'change', src: S3(19), fig: bp, q: 'Mia uses the internet to find out about the boiling points of some liquids. She writes the information in this table. What happens to the boiling point of water when salt is added?', vi: ['Bảng nhiệt độ sôi.', 'Thêm muối vào nước thì nhiệt độ sôi thế nào?'] }, ['It goes up (from 100 °C to 110 °C).', 'It goes down.', 'It stays the same.', 'The water cannot boil.'], 0));
  const bc = chartChoices(['A', 'B', 'C', 'salt', 'water'], [80, 20, 70, 110, 100], { max: 120, step: 20 });
  add(mcq({ id: 'u3q19b', t: T, sk: 'enq3', src: S3(19), fig: bp, q: 'Mia draws a bar chart of the boiling points. Complete the bar chart. Which bar chart is correct?', vi: ['', 'Biểu đồ cột nào vẽ ĐÚNG?'] }, bc.opts, bc.a));
  add(mcq({ id: 'u3q19c', t: T, sk: 'enq3', src: S3(19), fig: bp, q: 'Which liquid in the table has the lowest boiling point?', vi: ['', 'Chất lỏng nào có nhiệt độ sôi THẤP nhất?'] }, ['liquid A', 'liquid B', 'liquid C', 'salt solution', 'water'], 1));
  const sea = tbl(['number of days', 'mass of beaker with pure water in g', 'mass of beaker with sea water in g'], [[0, '50.0', '50.0'], [5, '30.0', '38.0']]);
  const seaQ = 'Mia investigates the speed of evaporation of pure water and sea water. She uses 20 cm³ of pure water at 25 °C in one beaker. She measures the masses of the two beakers at the start, leaves the equipment for five days, then measures the masses again. Here are her results.';
  add(inq({ id: 'u3q20a', t: T, sk: 'enq3', src: S3(20), fig: sea, q: seaQ + ' Mia wants to do a fair test. What <b>volume</b> of sea water does she use? What should be the <b>temperature</b> of the sea water?', why: 'Fair test: the same as the pure water, 20 cm³ at 25 °C.', vi: ['Mia so sánh nước tinh khiết (20 cm³, 25 °C) với nước biển.', 'Để công bằng, nước biển cần bao nhiêu cm³ và bao nhiêu °C?'] }, [['volume:', 20, 'cm³'], ['temperature:', 25, '°C']]));
  add(inq({ id: 'u3q20b', t: T, sk: 'enq3', src: S3(20), fig: sea, q: 'After five days some water has evaporated from the sea water. How many grams of water has evaporated?', why: '50.0 − 38.0 = 12 g', vi: ['', 'Nước biển đã bay hơi mất bao nhiêu gam?'] }, [['', 12, 'g']]));
  add(mcq({ id: 'u3q20c', t: T, sk: 'enq3', src: S3(20), fig: sea, q: 'Mia predicts: "I predict the sea water will evaporate faster than the pure water." Is Mia\'s prediction correct? Explain how you can tell from her results.', vi: ['Mia đoán nước biển bay hơi nhanh hơn.', 'Đúng không? Dùng số liệu.'] },
    ['No. The pure water lost 20 g but the sea water lost only 12 g.', 'Yes. The sea water lost 20 g.', 'Yes. Salty water always evaporates faster.', 'No. Both lost the same mass.'], 0));
  add(mcq({ id: 'u3q21', t: T, sk: 'change', src: S3(21), q: 'Perfumes have a boiling point above room temperature. What is the meaning of the words <b>boiling point</b>?', vi: ['', 'Nhiệt độ sôi (boiling point) nghĩa là gì?'] }, [MP[1], MP[0], MP[2], MP[3]], 0));
  const aikoQ = 'Aiko puts 1.0 g of salt into 20 cm³ of water to make a salt solution. She finds that the boiling point of the salt solution is 104 °C.';
  add(inq({ id: 'u3q22a', t: T, sk: 'change', src: S3(22), q: aikoQ + ' What is the boiling point of pure water?', vi: ['Nước muối của Aiko sôi ở 104 °C.', 'Nước tinh khiết sôi ở bao nhiêu °C?'] }, [['', 100, '°C']]));
  add(mcq({ id: 'u3q22b', t: T, sk: 'change', src: S3(22), q: 'What is the effect of adding salt on the boiling point of water?', vi: ['', 'Thêm muối thì nhiệt độ sôi thế nào?'] }, ['It makes the boiling point higher.', 'It makes the boiling point lower.', 'It has no effect.', 'It stops the water boiling.'], 0));
  add(inq({ id: 'u3q22c', oneOf: true, t: T, sk: 'change', src: S3(22), q: 'Aiko adds 2.0 g of salt to 20 cm³ of water to make a more concentrated salt solution. Predict the boiling point of this more concentrated salt solution.', why: 'More salt → higher boiling point, so above 104 °C (about 108 °C).', vi: ['Bây giờ dùng 2.0 g muối (nhiều hơn).', 'Dự đoán nhiệt độ sôi (số lớn hơn 104).'] }, [['', (p) => !!p && p.v > 104 && p.v <= 120, '°C', '108']]));
  add(inq({ id: 'u3q22d', t: T, sk: 'dissolve', src: S3(22), q: 'Aiko heats the more concentrated salt solution until all of the water has gone. How many grams of salt are left behind?', why: 'The salt does not evaporate: all 2.0 g is left.', vi: ['Đun đến khi hết nước.', 'Còn lại bao nhiêu gam muối?'] }, [['', 2, 'g']]));
})();

// ---------------- practice templates (clone the worksheet questions) ----------------
const SCI_TPL = {
  flower: [
    () => { // U1 Q11
      const pool = [['anther', 1], ['filament', 1], ['stamen', 1], ['carpel', 0], ['ovary', 0], ['stigma', 0], ['style', 0], ['ovule', 0], ['petal', 2], ['sepal', 2]];
      const FP = ['female part', 'male part', 'not male, not female']; const pick = R.shuffle(pool).slice(0, 6);
      return V('Unit 1 Review · Q11', rowq({ t: 7, sk: 'flower', q: 'Flowers have different parts. Complete the table by writing down each part in the correct column.', vi: ['6 bộ phận của hoa.', 'Bộ phận cái, đực, hay không phải cả hai?'] }, pick.map(([p, i]) => ({ t: `${p} {}`, ch: FP, a: [FP[i]] }))));
    },
    () => { // U1 Q6 / Q9
      const parts = R.shuffle(['stigma', 'style', 'ovary', 'anther', 'filament', 'petal', 'sepal']).slice(0, 2); const lab = { [parts[0]]: 'X', [parts[1]]: 'Y' }; const list = R.shuffle([...new Set([...parts, ...R.shuffle(['anther', 'filament', 'ovary', 'sepal', 'stigma', 'style', 'petal']).slice(0, 4)])]).slice(0, 6);
      if (!parts.every((p) => list.includes(p))) return SCI_TPL.flower[1]();
      return V('Unit 1 Review · Q6', rowq({ t: 7, sk: 'flower', fig: flowerFig(lab), q: 'The diagram shows parts of a flower. Name part X and part Y. Choose from the list.', vi: ['Hình bông hoa có X và Y.', 'X là gì? Y là gì?'] }, [{ t: 'part X {}', ch: list, a: [parts[0]] }, { t: 'part Y {}', ch: list, a: [parts[1]] }]));
    },
    () => { // U1 Q9b
      const ask = R.pick([['male', ['anther', 'filament']], ['female', ['stigma', 'style', 'ovary']]]);
      const right = R.pick(ask[1]); const others = R.shuffle(['petal', 'sepal', ...(ask[0] === 'male' ? ['stigma', 'ovary', 'style'] : ['anther', 'filament'])]).slice(0, 3);
      const parts = R.shuffle([right, ...others]); const lab = {}; parts.forEach((p, i) => (lab[p] = 'ABCD'[i]));
      return V('Unit 1 Review · Q9', mcq({ t: 7, sk: 'flower', fig: flowerFig(lab), q: `Flowers have male and female organs. The diagram shows the parts of a flower. Which labelled part of the flower is a ${ask[0]} organ?`, why: `${'ABCD'[parts.indexOf(right)]} is the ${right}.`, vi: ['Hình bông hoa có ghi A, B, C, D.', `Chữ nào chỉ bộ phận ${ask[0] === 'male' ? 'ĐỰC' : 'CÁI'}?`] }, ['A', 'B', 'C', 'D'], parts.indexOf(right)));
    },
    () => { // U1 Exam Notes: parts of a flower
      const JOB = [['anther', 'makes the pollen'], ['filament', 'holds up the anther'], ['stigma', 'is the sticky part that holds pollen'], ['style', 'is the tube that takes pollen to the ovary'], ['ovary', 'holds the eggs (ovules)'], ['ovule', 'can become a seed'], ['petal', 'attracts pollinators'], ['sepal', 'protects the flower bud']];
      const [p, job] = R.pick(JOB); const o = R.shuffle([job, ...R.shuffle(JOB.filter((x) => x[0] !== p)).slice(0, 3).map((x) => x[1])]);
      return V('Unit 1 Exam Notes', mcq({ t: 7, sk: 'flower', q: `What is the job of the ${p}? The ${p}…`, vi: ['', `Bộ phận "${p}" làm nhiệm vụ gì?`] }, o, o.indexOf(job)));
    },
  ],
  pollin: [
    () => { // U1 Q13a
      const yes = R.shuffle(['bright petals', 'sweet smell', 'nectar']).slice(0, 2), no = R.shuffle(['green leaves', 'seed pod', 'small petals', 'no scent', 'smooth light pollen']).slice(0, 3);
      const o = R.shuffle([...yes, ...no]);
      return V('Unit 1 Review · Q13', mul({ t: 7, sk: 'pollin', exact: 2, q: 'Insects can pollinate flowers. The flowers attract insects. Tick (✓) the <b>two</b> features of flowers that attract insects for pollination.', vi: ['', 'Chọn 2 đặc điểm thu hút côn trùng.'] }, o, yes.map((y) => o.indexOf(y))));
    },
    () => { // U1 Exam Notes: insect or wind pollinated
      const pool = R.shuffle([['bright or white petals', 0], ['scent and nectar', 0], ['sticky pollen', 0], ['small petals or no petals', 1], ['no scent or nectar', 1], ['lots of light, smooth pollen', 1]]).slice(0, 5);
      const C = ['insect-pollinated', 'wind-pollinated'];
      return V('Unit 1 Exam Notes', rowq({ t: 7, sk: 'pollin', q: 'Is each feature found in insect-pollinated flowers or wind-pollinated flowers?', vi: ['', 'Đặc điểm của hoa thụ phấn nhờ côn trùng hay nhờ gió?'] }, pool.map(([t, i]) => ({ t: `${t} {}`, ch: C, a: [C[i]] }))));
    },
    () => { // U1 Q3a
      const q = ORIG.find((x) => x.id === 'u1q3a');
      return V('Unit 1 Review · Q3', ordx({ t: 7, sk: 'pollin', q: q.q, vi: q.vi }, q.items, q.ohint));
    },
    () => { // U1 Exam Notes: pollination vs fertilisation
      const ask = R.pick(['pollination', 'fertilisation']);
      const o = R.shuffle(['the movement of pollen from an anther to a stigma', 'when a male cell from pollen joins an egg cell in an ovule', 'moving seeds away from the parent plant', 'the start of growth of a seed']);
      const a = ask === 'pollination' ? 'the movement of pollen from an anther to a stigma' : 'when a male cell from pollen joins an egg cell in an ovule';
      return V('Unit 1 Exam Notes', mcq({ t: 7, sk: 'pollin', q: `What is ${ask}? ${ask[0].toUpperCase() + ask.slice(1)} is…`, why: 'Pollination moves pollen. Fertilisation joins cells.', vi: ['', `"${ask}" là gì?`] }, o, o.indexOf(a)));
    },
  ],
  cycle: [
    () => { // U1 Q7 + exam tip: the first stage is not always at the top
      const C = ['germination', 'plant growth', 'flowering', 'pollination and fertilisation', 'fruit and seed production', 'seed dispersal'];
      const k = R.int(0, 5); const items = C.slice(k).concat(C.slice(0, k));
      return V('Unit 1 Review · Q7', ordx({ t: 7, sk: 'cycle', q: `Flowering plants have a life cycle. It repeats. Start with <b>${items[0]}</b> and put the stages in order.`, why: C.join(' → ') + ' → (again)', vi: ['Vòng đời lặp lại, không phải lúc nào cũng bắt đầu từ germination.', `Bắt đầu từ "${items[0]}", xếp các giai đoạn tiếp theo.`, 'Bấm theo thứ tự.'] }, items, `Tap the stages in order, starting with ${items[0]}`));
    },
    () => { // U1 Q3b
      const C = [['water', ['water', 'moisture']], ['air', ['air', 'oxygen']], ['warmth', ['warmth', 'warm', 'heat', 'a warm place']]];
      const g = R.int(0, 2); const acc = C.filter((_, i) => i !== g).flatMap((x) => x[1]);
      return V('Unit 1 Review · Q3', txtq({ t: 7, sk: 'cycle', q: `Seeds need ${C[g][0]} to germinate. Write down <b>one</b> other factor seeds need to germinate.`, why: 'Conditions needed: water, air and warmth.', vi: [`Hạt cần ${C[g][0]} để nảy mầm.`, 'Viết thêm MỘT điều kiện khác.'] }, [['', acc, '']]));
    },
    () => { // U1 Q12
      const kinds = R.shuffle(['tall', 'healthy', 'lean']);
      const rows = [{ t: 'Plant seedlings are growing to the right. They have healthy green leaves. {}', ch: ['A', 'B', 'C'], a: ['ABC'[kinds.indexOf('lean')]] }, { t: 'Plant seedlings are taller. They have yellow leaves. {}', ch: ['A', 'B', 'C'], a: ['ABC'[kinds.indexOf('tall')]] }, { t: 'Plant seedlings look healthy. They have green leaves. {}', ch: ['A', 'B', 'C'], a: ['ABC'[kinds.indexOf('healthy')]] }];
      return V('Unit 1 Review · Q12', rowq({ t: 7, sk: 'cycle', fig: potsFig(kinds), q: `${who()} has three pots of plant seedlings labelled A, B and C. Complete the table to match the <b>letter</b> to the correct <b>description</b>.`, vi: ['3 chậu cây con.', 'Ghép mô tả với đúng chậu.'] }, rows));
    },
    () => { // U1 Exam Notes: germination steps
      const q = ORIG.find((x) => x.id === 'u1n2');
      return V('Unit 1 Exam Notes', ordx({ t: 7, sk: 'cycle', q: q.q, vi: q.vi, why: q.why }, q.items, q.ohint));
    },
  ],
  disperse: [
    () => { // U1 Q10
      const P = [['dandelion', 'carried in the wind'], ['sycamore', 'carried in the wind'], ['coconut', 'float on water'], ['blackberry', 'eaten by birds'], ['cherry', 'eaten by birds'], ['burdock (burs)', 'attach to animal'], ['bean pod', 'burst open'], ['violet', 'burst open']];
      const pick = []; const used = new Set(); for (const p of R.shuffle(P)) { if (!used.has(p[1]) && pick.length < 4) { pick.push(p); used.add(p[1]); } }
      const Rr = ['burst open', 'carried in the wind', 'eaten by birds', 'float on water', 'attach to animal'];
      return V('Unit 1 Review · Q10', matq({ t: 7, sk: 'disperse', q: 'The pictures show different seeds. Draw a line from each <b>seed</b> to the way it is <b>dispersed</b>.', vi: ['4 loại hạt.', 'Nối mỗi hạt với cách phát tán.'] }, pick.map((p) => p[0]), Rr, pick.map((p) => Rr.indexOf(p[1]))));
    },
    () => { // U1 Q5
      const D = [['seeds are large and lightweight so they float', 'water'], ['seeds have tiny hooks on them so they attach to things', 'animals'], ['seeds have wings and are lightweight so they move in air', 'wind'], ['seeds are found inside fruits so they are eaten', 'animals'], ['seeds have light hairs so they are blown away', 'wind'], ['a dry pod bursts open and throws the seeds out', 'explosion'], ['the fruit is waterproof and floats', 'water']];
      const pick = R.shuffle(D).slice(0, 4); const ch = ['water', 'wind', 'animals', 'explosion'];
      return V('Unit 1 Review · Q5', rowq({ t: 7, sk: 'disperse', q: 'Plants are adapted to disperse seeds in different ways. Complete the table to identify the type of seed dispersal for each description.', vi: ['Mô tả hạt.', 'Phát tán nhờ nước, gió, động vật hay tự nổ?'] }, pick.map(([t, a], i) => ({ t: `${'ABCD'[i]}: ${t} {}`, ch, a: [a] }))));
    },
    () => { // U1 Q2
      const tree = R.pick(['sycamore tree', 'dandelion plant', 'coconut palm', 'bean plant']); const q = ORIG.find((x) => x.id === 'u1q2');
      return V('Unit 1 Review · Q2', mul({ t: 7, sk: 'disperse', exact: 2, q: `The seeds of a ${tree} need to travel as far from the parent plant as possible. Write down two reasons why.`, why: q.why, vi: ['Hạt cần đi xa cây mẹ.', 'Chọn 2 lý do.'] }, q.opts, q.a));
    },
  ],
  pgroup: [
    () => { // U1 Q1
      const asks = [['Which living thing in the key has flowers?', 'tulips'], ['Which living thing in the key makes seeds but has no flowers?', 'conifers'], ['Which living thing has roots, stems and leaves but does not make seeds?', 'ferns'], ['Which living thing grows in water?', 'algae'], ['Which living thing has no true roots, stems or leaves and grows on land?', 'mosses']];
      const [q, a] = R.pick(asks); const o = ['algae', 'mosses', 'ferns', 'conifers', 'tulips'];
      return V('Unit 1 Review · Q1', mcq({ t: 7, sk: 'pgroup', fig: keyFig(), q: `${R.pick(['Mike', 'Chen', 'Naomi', 'Oliver'])} finds this key in a book. ${q}`, vi: ['Khóa phân loại.', 'Đi theo các mũi tên để tìm.'] }, o, o.indexOf(a)));
    },
    () => { // U1 Exam Notes: flowering / non-flowering
      const P = [['rose', 0], ['sunflower', 0], ['bean plant', 0], ['tulip', 0], ['apple tree', 0], ['daisy', 0], ['fern', 1], ['moss', 1], ['pine tree', 1]];
      const pick = R.shuffle(P).slice(0, 5); const C = ['flowering', 'non-flowering'];
      if (pick.every((p) => p[1] === pick[0][1])) return SCI_TPL.pgroup[1]();
      return V('Unit 1 Exam Notes', rowq({ t: 7, sk: 'pgroup', q: 'Flowering plants make flowers and seeds. Non-flowering plants do not make flowers. Sort the plants.', vi: ['', 'Cây có hoa hay không có hoa?'] }, pick.map(([t, i]) => ({ t: `${t} {}`, ch: C, a: [C[i]] }))));
    },
  ],
  enq1: [
    () => { // U1 Q4: germination dishes
      const f = R.pick(['warmth', 'light']); const n = 10; const rows = []; const combos = [['light', 'warm'], ['light', 'cold'], ['dark', 'warm'], ['dark', 'cold']];
      combos.forEach(([l, w], i) => { const good = f === 'warmth' ? w === 'warm' : l === 'light'; rows.push(['ABCD'[i], n, l, w, good ? R.int(6, 10) : R.int(0, 1)]); });
      const notNeeded = f === 'warmth' ? 'light' : 'warmth';
      return V('Unit 1 Review · Q4', rowq({ t: 7, sk: 'enq1', fig: tbl(['dish', 'number of seeds in each dish', 'light or dark', 'warm or cold', 'number of seeds germinated'], rows), q: `${who()} investigates seed germination. Each dish has 10 seeds, cotton wool and 3 cm³ of water. Use the results in the table to complete the sentences.`, why: `The dishes with ${f} had many seeds germinate. ${notNeeded === 'light' ? 'Light' : 'Warmth'} made little difference.`, vi: ['Bảng 4 đĩa hạt.', 'Điều kiện nào CẦN, điều kiện nào KHÔNG cần?'] },
        [{ t: 'A condition needed for these seeds to germinate is {}', ch: ['light', 'warmth'], a: [f] }, { t: 'A condition <b>not</b> needed is {}', ch: ['light', 'warmth'], a: [notNeeded] }]));
    },
    () => { // U1 Q8
      const D = R.shuffle(['closed petals', 'thin spiky petals', 'small rounded petals', 'long flat petals']); const v = R.shuffle([R.int(14, 20), R.int(9, 13), R.int(4, 8), R.int(1, 3)]);
      const most = R.pick([true, false]); const idx = v.indexOf(most ? Math.max(...v) : Math.min(...v));
      return V('Unit 1 Review · Q8', mcq({ t: 7, sk: 'enq1', fig: tbl(['flower model', 'description of flowers', 'number of insects in 1 hour'], D.map((d, i) => ['ABCD'[i], d, v[i]])), q: `${two().join(' and ')} investigate pollination of flowers by insects. Which description of flowers attracts the ${most ? 'most' : 'fewest'} insects?`, vi: ['Bảng số côn trùng.', `Kiểu hoa nào thu hút ${most ? 'NHIỀU' : 'ÍT'} côn trùng nhất?`] }, D, idx));
    },
    () => { // U1 Q8a: bar chart
      const v = [R.int(1, 10) * 2, R.int(1, 10) * 2, R.int(1, 10) * 2, R.int(1, 10) * 2]; if (new Set(v).size < 3) return SCI_TPL.enq1[2]();
      const c = chartChoices(['A', 'B', 'C', 'D'], v, { max: 20, step: 2 });
      return V('Unit 1 Review · Q8', mcq({ t: 7, sk: 'enq1', fig: tbl(['flower model', 'number of insects in 1 hour'], v.map((x, i) => ['ABCD'[i], x])), q: 'They count the number of insects near each model. Which bar chart shows their results correctly?', vi: ['Bảng số côn trùng.', 'Biểu đồ cột nào vẽ ĐÚNG?'] }, c.opts, c.a));
    },
    () => { // U1 Exam Notes: fair test
      const VARS = ['change (independent)', 'measure (dependent)', 'keep the same (control)'];
      const set = R.pick([[['the temperature', 0], ['the number of seeds that germinate', 1], ['the type of seed', 2], ['the amount of water', 2]], [['the amount of water', 0], ['the number of seeds that germinate', 1], ['the temperature', 2], ['the number of seeds', 2]], [['light or dark', 0], ['the height of the seedlings after 10 days', 1], ['the type of seed', 2], ['the amount of water', 2]]]);
      return V('Unit 1 Exam Notes', rowq({ t: 7, sk: 'enq1', q: `A class tests how ${set[0][0]} affects seeds. Sort each thing.`, vi: ['Thí nghiệm công bằng.', 'Thay đổi, đo, hay giữ nguyên?'] }, R.shuffle(set).map(([t, i]) => ({ t: `${t} {}`, ch: VARS, a: [VARS[i]] }))));
    },
  ],
  vib: [
    () => { // U2 Exam Notes quick practice
      const P = [['hit a drum', 'The drum skin vibrates.'], ['pluck a guitar string', 'The string vibrates.'], ['clash two cymbals', 'The metal of the cymbals vibrates.'], ['blow a recorder', 'The air inside the recorder vibrates.'], ['tap a glass bottle', 'The glass vibrates.']];
      const [act, a] = R.pick(P); const o = R.shuffle([a, ...R.shuffle(P.filter((x) => x[1] !== a)).slice(0, 2).map((x) => x[1]), 'Nothing vibrates. The sound just appears.']);
      return V('Unit 2 Exam Notes', mcq({ t: 8, sk: 'vib', q: `You ${act}. What vibrates?`, vi: ['', 'Cái gì rung?'] }, o, o.indexOf(a)));
    },
    () => { // U2 Exam Notes: how sound reaches us
      const S = R.shuffle([['Sound can travel through solids, like a desk.', 'True'], ['Sound can travel through water.', 'True'], ['Sound travels through the air.', 'True'], ['Sound gets louder further from its source.', 'False'], ['Sound is made when something vibrates.', 'True'], ['Sound cannot travel through liquids.', 'False']]).slice(0, 4);
      return V('Unit 2 Exam Notes', rowq({ t: 8, sk: 'vib', q: 'Which statements are true? Which are false?', vi: ['', 'Mỗi câu đúng hay sai?'] }, S.map(([t, a]) => ({ t: `${t} {}`, ch: TF, a: [a] }))));
    },
    () => { // U2 Exam Notes: Source, travel, ear
      return V('Unit 2 Exam Notes', ordx({ t: 8, sk: 'vib', q: `${who()} hears a bell ring. Put the steps in order.`, why: 'Memory tip: "Source, travel, ear!"', vi: ['', 'Xếp các bước từ lúc chuông kêu đến lúc nghe thấy.', 'Bấm theo thứ tự.'] }, ['The bell vibrates.', 'The vibrations travel through the air.', 'The vibrations reach the ear.'], 'Tap the steps in order, first step first'));
    },
  ],
  volpitch: [
    () => { // U2 Exam Notes quick practice
      const P = [['louder', 'bigger', 'Volume: size of vibration.'], ['quieter', 'smaller', 'Volume: size of vibration.'], ['higher in pitch', 'faster', 'Pitch: speed of vibration.'], ['lower in pitch', 'slower', 'Pitch: speed of vibration.']];
      const [ch, a, why] = R.pick(P); const o = ['bigger', 'smaller', 'faster', 'slower'];
      return V('Unit 2 Exam Notes', mcq({ t: 8, sk: 'volpitch', q: `A sound gets ${ch}. What happens to the vibrations?`, why, vi: [`Âm thanh ${ch}.`, 'Rung động thay đổi thế nào?'] }, o, o.indexOf(a)));
    },
    () => { // U2 Q1a
      const v = R.shuffle([R.int(8, 10), R.int(5, 7), R.int(3, 4), R.int(1, 2), R.int(3, 7)]); const loud = R.pick([true, false]);
      const target = loud ? Math.max(...v) : Math.min(...v); if (v.filter((x) => x === target).length > 1) return SCI_TPL.volpitch[1]();
      return V('Unit 2 Review · Q1', mcq({ t: 8, sk: 'volpitch', fig: tbl(['surface', 'loudness of sound'], v.map((x, i) => ['ABCDE'[i], x])), q: `${who()} drops a pen onto different surfaces. Number 1 is the quietest and number 10 is the loudest. Which surface made the <b>${loud ? 'loudest' : 'quietest'}</b> sound?`, vi: ['Số 1 nhỏ nhất, 10 to nhất.', `Mặt nào tiếng ${loud ? 'TO' : 'NHỎ'} nhất?`] }, ['A', 'B', 'C', 'D', 'E'], v.indexOf(target)));
    },
    () => { // U2 Exam Notes: make it louder / quieter
      const P = [['picks up sound', 'microphone'], ['boosts the signal', 'amplifier'], ['plays the sound out loud', 'loudspeaker'], ['protect your ears from loud noise', 'ear defenders']];
      const [d, a] = R.pick(P); const o = R.shuffle(P.map((x) => x[1]));
      return V('Unit 2 Exam Notes', mcq({ t: 8, sk: 'volpitch', q: `Which of these ${d}?`, vi: ['', 'Thiết bị nào?'] }, o, o.indexOf(a)));
    },
    () => { // U2 Q3d
      const loud = R.pick([true, false]); const o = ['Hit it harder.', 'Hit it more gently.', 'Add more water.', 'Use a bigger stick but hit it the same.'];
      return V('Unit 2 Review · Q3', mcq({ t: 8, sk: 'volpitch', q: `${who()} hits a glass bottle with a stick. ${'She'} wants to make the volume of the sound ${loud ? 'louder' : 'quieter'}. Describe how she does this.`, why: loud ? 'Hit harder → bigger vibrations → louder.' : 'Hit gently → smaller vibrations → quieter.', vi: ['', `Làm sao cho tiếng ${loud ? 'TO' : 'NHỎ'} hơn?`] }, o, loud ? 0 : 1));
    },
  ],
  instr: [
    () => { // U2 Q2b
      const S = ['violin', 'harp', 'guitar', 'cello', 'ukulele'], W = ['trumpet', 'saxophone', 'recorder', 'flute', 'clarinet'], P = ['drum kit', 'cymbals', 'xylophone'];
      const kind = R.pick([['strings', S], ['air (wind instruments)', W]]); const o = R.shuffle([...R.shuffle(S).slice(0, 2), ...R.shuffle(W).slice(0, 2), ...R.shuffle(P).slice(0, 2)]);
      return V('Unit 2 Review · Q2', mul({ t: 8, sk: 'instr', q: `Circle <b>all</b> the musical instruments that use ${kind[0]} to make a sound.`, vi: ['', 'Chọn TẤT CẢ nhạc cụ đúng loại.'] }, o, o.map((x, i) => (kind[1].includes(x) ? i : -1)).filter((i) => i >= 0)));
    },
    () => { // U2 Q7 + notes
      const P = R.shuffle([['a shorter string', 'higher'], ['a longer string', 'lower'], ['a thinner string', 'higher'], ['a thicker string', 'lower'], ['a tighter string', 'higher'], ['a looser string', 'lower'], ['a shorter air column', 'higher'], ['a longer air column', 'lower']]).slice(0, 4);
      return V('Unit 2 Review · Q7', rowq({ t: 8, sk: 'instr', q: 'Does each change make a higher or a lower note? Everything else stays the same.', why: 'Short, thin, tight: pitch takes flight!', vi: ['', 'Nốt cao hơn hay trầm hơn?'] }, P.map(([t, a]) => ({ t: `${t} {}`, ch: ['higher', 'lower'], a: [a] }))));
    },
    () => { // U2 Q3 + exam trap: blow or tap
      const lv = R.shuffle([0.15, 0.35, 0.55, 0.8]); const tap = R.pick([true, false]); const high = R.pick([true, false]);
      const most = lv.indexOf(Math.max(...lv)), least = lv.indexOf(Math.min(...lv));
      const ans = tap ? (high ? least : most) : high ? most : least;
      return V('Unit 2 Review · Q3', mcq({ t: 8, sk: 'instr', fig: bottlesFig(lv), q: `${who()} ${tap ? 'hits each bottle with a stick' : 'blows across the top of each bottle'}. Which bottle makes the ${high ? 'highest' : 'lowest'} pitch?`, why: tap ? 'Tapping: the glass vibrates with the water. More water → lower note.' : 'Blowing: the air vibrates. More water → shorter air column → higher note.', vi: [tap ? 'GÕ vào chai.' : 'THỔI qua miệng chai.', `Chai nào âm ${high ? 'CAO' : 'TRẦM'} nhất?`] }, ['A', 'B', 'C', 'D'], ans));
    },
    () => { // U2 Q4b
      const high = R.pick([true, false]); const o = ['Uncover holes so the air column is shorter.', 'Cover more holes so the air column is longer.', 'Blow more gently.', 'Hold the recorder upside down.'];
      return V('Unit 2 Review · Q4', mcq({ t: 8, sk: 'instr', q: `${who()} is playing the recorder. How do you play ${high ? 'high' : 'low'} notes on the recorder?`, vi: ['', `Thổi nốt ${high ? 'cao' : 'trầm'} bằng cách nào?`] }, o, high ? 0 : 1));
    },
  ],
  enq2: [
    () => { // U2 Q8
      const names = R.shuffle(['clarinet', 'guitar', 'oboe', 'trombone', 'tuba', 'violin', 'flute']).slice(0, 5);
      const rows = names.map(() => { const lo = R.int(4, 25) * 10; return [lo, lo + R.int(15, 80) * 10]; });
      const diffs = rows.map(([a, b]) => b - a); const mx = Math.max(...diffs); if (diffs.filter((d) => d === mx).length > 1) return SCI_TPL.enq2[0]();
      const fig = tbl(['musical instrument', 'lowest pitch in units', 'highest pitch in units'], names.map((n, i) => [n, ...rows[i]]));
      const k = R.int(0, 2);
      if (k === 0) { const i = R.int(0, 4); if (rows.filter((r) => r[0] === rows[i][0]).length > 1) return SCI_TPL.enq2[0](); return V('Unit 2 Review · Q8', mcq({ t: 8, sk: 'enq2', fig, q: `Which musical instrument has ${rows[i][0]} units as its <b>lowest</b> pitch?`, vi: ['', `Nhạc cụ nào có cao độ THẤP NHẤT là ${rows[i][0]}?`] }, names, i)); }
      if (k === 1) { const i = R.int(0, 4); return V('Unit 2 Review · Q8', inq({ t: 8, sk: 'enq2', fig, q: `What is the <b>highest</b> pitch of the ${names[i]}?`, vi: ['', `Cao độ CAO NHẤT của ${names[i]}?`] }, [['', rows[i][1], 'units']])); }
      return V('Unit 2 Review · Q8', mcq({ t: 8, sk: 'enq2', fig, q: 'Which musical instrument has the largest difference in pitch?', why: 'Difference = highest − lowest.', vi: ['', 'Nhạc cụ nào có khoảng chênh lớn nhất?'] }, names, diffs.indexOf(mx)));
    },
    () => { // U2 Exam Notes: table detective
      const hi = R.int(30, 99) * 10, lo = R.int(5, 25) * 10;
      return V('Unit 2 Exam Notes', inq({ t: 8, sk: 'enq2', q: `The highest pitch is ${hi} units and the lowest is ${lo} units. What is the difference?`, why: `${hi} − ${lo} = ${hi - lo}`, vi: ['', 'Khoảng chênh = cao nhất − thấp nhất.'] }, [['', hi - lo, 'units']]));
    },
    () => { // U2 Exam Notes: muffling
      const M = R.shuffle(['foam', 'cotton wool', 'newspaper', 'bubble wrap', 'cloth']).slice(0, 4); const v = R.shuffle([R.int(40, 48), R.int(50, 56), R.int(58, 64), R.int(66, 72)]);
      return V('Unit 2 Exam Notes', mcq({ t: 8, sk: 'enq2', fig: tbl(['material around the buzzer', 'sound level outside the box in dB'], M.map((m, i) => [m, v[i]])), q: `${who()} tests which material muffles sound best. Which material muffles sound best?`, why: 'The lowest reading shows the best muffling.', vi: ['Bảng số dB.', 'Vật liệu nào cách âm tốt nhất?'] }, M, v.indexOf(Math.min(...v))));
    },
  ],
  states: [
    () => { // U3 Q5d / Q8b
      const k = R.pick(['solid', 'liquid', 'gas']); const o = R.shuffle(['solid', 'liquid', 'gas']);
      return V('Unit 3 Review · Q5', mcq({ t: 9, sk: 'states', q: `Which box shows the particles in a <b>${k}</b>?`, vi: ['', `Hình nào là hạt chất ${k === 'solid' ? 'RẮN' : k === 'liquid' ? 'LỎNG' : 'KHÍ'}?`] }, o.map((x) => particles(x)), o.indexOf(k)));
    },
    () => { // U3 Q5b/c + notes
      const S = R.shuffle([['In a solid, the particles are in a fixed pattern.', 'True'], ['In a gas, the particles are far apart.', 'True'], ['In a liquid, the particles can move past each other.', 'True'], ['In a solid, the particles are far apart.', 'False'], ['In a gas, the particles are in neat rows.', 'False'], ['When water evaporates, its particles move faster.', 'True'], ['In a liquid, the particles are close together.', 'True']]).slice(0, 4);
      return V('Unit 3 Review · Q5', rowq({ t: 9, sk: 'states', q: 'Which statements about particles are true and which are false?', vi: ['', 'Mỗi câu đúng hay sai?'] }, S.map(([t, a]) => ({ t: `${t} {}`, ch: TF, a: [a] }))));
    },
    () => { // U3 Q15b
      return V('Unit 3 Review · Q15', txtq({ t: 9, sk: 'states', q: 'Write down the name of a substance that is a gas at room temperature.', vi: ['', 'Tên MỘT chất khí ở nhiệt độ phòng.'] }, [['', ['oxygen', 'nitrogen', 'carbon dioxide', 'air', 'helium', 'hydrogen', 'water vapour', 'argon', 'co2'], '']]));
    },
  ],
  change: [
    () => { // U3 Q9
      const make = (st) => { if (st === 'solid') { const m = R.int(30, 400); return [m, m + R.int(50, 1500)]; } if (st === 'liquid') { const m = R.int(-40, 10); return [m, R.int(40, 300)]; } const b = R.int(-200, 5); return [b - R.int(10, 100), b]; };
      const states = R.shuffle(['solid', 'liquid', 'gas', R.pick(['solid', 'liquid', 'gas'])]); const SLG = ['solid', 'liquid', 'gas'];
      const rows = states.map((s) => make(s)); const show = (n) => (n < 0 ? '−' + -n : n);
      return V('Unit 3 Review · Q9', rowq({ t: 9, sk: 'change', fig: tbl(['substance', 'melting point in °C', 'boiling point in °C'], rows.map((r, i) => ['ABCD'[i], show(r[0]), show(r[1])])), q: 'Room temperature is usually 20 °C. Show the state of each substance at room temperature.', why: 'At 20 °C: below the melting point → solid; between the two → liquid; above the boiling point → gas.', vi: ['20 °C.', 'Rắn, lỏng hay khí?'] }, states.map((s, i) => ({ t: `substance ${'ABCD'[i]} {}`, ch: SLG, a: [s] }))));
    },
    () => { // U3 Q5a, Q6d, Q18b
      const P = [['A solid turns into a liquid.', ['melting', 'melt']], ['A liquid turns into a solid.', ['freezing', 'freeze', 'solidifying']], ['A liquid turns into a gas.', ['evaporation', 'evaporating', 'boiling']], ['A gas turns into a liquid.', ['condensation', 'condensing']], ['Puddles dry up on a sunny day.', ['evaporation', 'evaporating']], ['Water droplets form on a cold window.', ['condensation', 'condensing']], ['Ice cream turns runny in the sun.', ['melting', 'melt']], ['Water in a freezer turns to ice.', ['freezing', 'freeze']]];
      const [d, acc] = R.pick(P);
      return V('Unit 3 Review · Q5', txtq({ t: 9, sk: 'change', q: `${d} What is the name of this process?`, vi: ['', 'Tên quá trình (gõ tiếng Anh).'] }, [['', acc, '']]));
    },
    () => { // U3 Q22
      const g = R.pick([1, 2, 3]); const bp = 100 + g * R.pick([2, 3, 4]); const more = g + R.pick([1, 2]);
      return V('Unit 3 Review · Q22', inq({ t: 9, sk: 'change', oneOf: true, q: `${who()} puts ${g}.0 g of salt into 20 cm³ of water. The boiling point of the salt solution is ${bp} °C. Then ${more}.0 g of salt is added to 20 cm³ of water to make a more concentrated solution. Predict the boiling point of the more concentrated salt solution.`, why: `More salt → higher boiling point, so above ${bp} °C.`, vi: ['Nhiều muối hơn.', `Dự đoán nhiệt độ sôi (lớn hơn ${bp}).`] }, [['', (p) => !!p && p.v > bp && p.v <= bp + 25, '°C', String(bp + 4)]]));
    },
    () => { // U3 Q15a
      const S = R.shuffle([['the boiling point of pure water is 110 °C', 'False'], ['the boiling point of pure water is 100 °C', 'True'], ['pure water freezes at 0 °C', 'True'], ['pure water freezes at 10 °C', 'False'], ['water expands when it freezes', 'True'], ['water is a liquid at room temperature', 'True'], ['pure water is blue', 'False'], ['adding salt makes the boiling point of water higher', 'True']]).slice(0, 4);
      return V('Unit 3 Review · Q15', rowq({ t: 9, sk: 'change', q: 'Which of these statements about water are true and which are false?', vi: ['', 'Đúng hay sai?'] }, S.map(([t, a]) => ({ t: `${t} {}`, ch: TF, a: [a] }))));
    },
  ],
  wcycle: [
    () => { // U3 Q10a
      const C = ['evaporation', 'condensation', 'precipitation', 'water collects in seas and lakes']; const k = R.int(0, 3); const items = C.slice(k).concat(C.slice(0, k));
      return V('Unit 3 Review · Q10', ordx({ t: 9, sk: 'wcycle', q: `${who()} draws a diagram of the water cycle. Start with <b>${items[0]}</b> and put the labels in order.`, vi: ['Vòng tuần hoàn nước.', `Bắt đầu từ "${items[0]}".`, 'Bấm theo thứ tự.'] }, items, `Tap the labels in order, starting with ${items[0]}`));
    },
    () => { // U3 Q16a
      const P = [['water vapour in clouds', 'water droplets in clouds', ['condensation', 'condensing']], ['sea water', 'water vapour in the air', ['evaporation', 'evaporating']], ['water droplets in clouds', 'water on the ground', ['precipitation', 'rain', 'raining']]];
      const [a, b, acc] = R.pick(P);
      return V('Unit 3 Review · Q16', txtq({ t: 9, sk: 'wcycle', fig: tbl(['from', '', 'to'], [[a, '→ process X →', b]]), q: 'The diagram shows part of a simple water cycle. What is the name of process X?', vi: [`${a} → ${b}.`, 'Tên quá trình X?'] }, [['process X:', acc, '']]));
    },
    () => { // U3 Q11a
      const vals = MONTHS.map(() => R.int(1, 28) * 10); const mx = Math.max(...vals); if (vals.filter((v) => v === mx).length > 1) return SCI_TPL.wcycle[2]();
      const i = vals.indexOf(mx); const o = R.shuffle([MONTHS[i], ...R.shuffle(MONTHS.filter((_, j) => j !== i)).slice(0, 3)]);
      return V('Unit 3 Review · Q11', mcq({ t: 9, sk: 'wcycle', fig: barChart(MONTHS.map((m) => m[0]), vals, { max: 300, step: 50, bw: 30, title: 'month · precipitation in mm' }), q: 'The chart shows the monthly precipitation for one country. Which month has the highest precipitation?', vi: ['Biểu đồ lượng mưa (J F M A M J J A S O N D).', 'Tháng nào mưa nhiều nhất?'] }, o, o.indexOf(MONTHS[i])));
    },
  ],
  dissolve: [
    () => { // U3 Q1c/d, Q14c
      const P = R.pick([['salt', 'water'], ['sugar', 'water'], ['sugar', 'tea'], ['salt', 'warm water']]); const ask = R.int(0, 2);
      const q = ask === 0 ? `${P[0][0].toUpperCase() + P[0].slice(1)} dissolves in ${P[1]} to make a mixture. The ${P[1]} is the solvent. What is the name given to the ${P[0]}?` : ask === 1 ? `${P[0][0].toUpperCase() + P[0].slice(1)} dissolves in ${P[1]} to make a mixture. The ${P[0]} is the solute. What is the name given to the ${P[1]}?` : `${P[0][0].toUpperCase() + P[0].slice(1)} dissolves in ${P[1]}. What is the name given to the mixture?`;
      return V('Unit 3 Review · Q1', txtq({ t: 9, sk: 'dissolve', q, vi: ['', 'Solute, solvent hay solution?'] }, [['', [['solute'], ['solvent'], ['solution']][ask], '']]));
    },
    () => { // U3 Q14b
      const obs = R.shuffle([['clear liquid with <b>no</b> solid', 0], ['blue liquid with <b>no</b> solid', 0], ['solid sinks', 1], ['white liquid with solid', 1], ['green liquid with <b>no</b> solid', 0], ['solid floats on top', 1]]).slice(0, 5);
      if (obs.every((o) => o[1] === obs[0][1])) return SCI_TPL.dissolve[1]();
      const C = ['dissolve', 'do not dissolve'];
      return V('Unit 3 Review · Q14', rowq({ t: 9, sk: 'dissolve', fig: tbl(['solid', 'observation'], obs.map((o, i) => ['ABCDE'[i], o[0]])), q: `${who()} adds 1 g of each solid to 30 cm³ of water and stirs. Group the solids into those that dissolve and those that do <b>not</b> dissolve.`, vi: ['Bảng quan sát.', 'Tan hay không tan?'] }, obs.map((o, i) => ({ t: `solid ${'ABCDE'[i]} {}`, ch: C, a: [C[o[1]]] }))));
    },
    () => { // U3 Q1e + separating
      const k = R.pick(['salt', 'sand', 'sugar']); const o = ['Heat it so the water evaporates. The solid is left behind.', 'Filter it. The solid stays on the filter paper.', 'Freeze it.', 'Stir it faster.'];
      return V('Unit 3 Review · Q1', mcq({ t: 9, sk: 'dissolve', q: `${who()} mixes ${k} with water. Describe how to get the dry ${k} back.`, why: k === 'sand' ? 'Sand is insoluble, so filtering works.' : `${k[0].toUpperCase() + k.slice(1)} dissolves, so filtering cannot take it out. Evaporate the water.`, vi: ['', `Làm sao lấy lại ${k} khô?`] }, o, k === 'sand' ? 1 : 0));
    },
    () => { // U3 Q1a/b
      const P = R.pick([[`${R.int(2, 9)}.0 g of salt`, 'balance'], [`${R.int(5, 20) * 10} cm³ of water`, 'measuring cylinder'], ['the temperature of the water', 'thermometer'], ['the time it takes to dissolve', 'stopwatch']]);
      const o = R.shuffle(['balance', 'measuring cylinder', 'thermometer', 'stopwatch']);
      return V('Unit 3 Review · Q1', mcq({ t: 9, sk: 'dissolve', q: `Write down the piece of equipment ${who()} uses to measure ${P[0]}.`, vi: ['', 'Dụng cụ đo nào?'] }, o, o.indexOf(P[1])));
    },
  ],
  enq3: [
    () => { // U3 Q2c
      const temps = [20, 25, 30, 35, 40]; let d = 1; const dec = temps.map(() => (d += R.int(1, 3))); const start = 25; const after = dec.map((x) => start - x);
      return V('Unit 3 Review · Q2', inq({ t: 9, sk: 'enq3', fig: tbl(['temperature of water in °C', 'mass of water at start in g', 'mass of water after 24 hours in g', 'decrease in mass in g'], temps.map((t, i) => [t, start, after[i], i < 2 ? dec[i] : '?'])), q: `${who()} puts 25 g of water into a beaker at different temperatures for 24 hours. Complete the table by calculating the decrease in mass of water for 30, 35 and 40 °C.`, why: 'Decrease = mass at start − mass after 24 hours.', vi: ['', 'Lượng giảm = lúc đầu − sau 24 giờ.'] }, [2, 3, 4].map((i) => [`${temps[i]} °C:`, dec[i], 'g'])));
    },
    () => { // U3 Q20
      const pure = R.int(12, 24), sea = R.int(5, pure - 3);
      return V('Unit 3 Review · Q20', inq({ t: 9, sk: 'enq3', fig: tbl(['number of days', 'mass with pure water in g', 'mass with sea water in g'], [[0, '50.0', '50.0'], [5, (50 - pure).toFixed(1), (50 - sea).toFixed(1)]]), q: `${who()} investigates the speed of evaporation of pure water and sea water. How many grams of water evaporated from each beaker after five days?`, why: `Pure: 50 − ${50 - pure} = ${pure}. Sea: 50 − ${50 - sea} = ${sea}. The pure water evaporated faster.`, vi: ['', 'Mỗi cốc mất bao nhiêu gam nước?'] }, [['pure water:', pure, 'g'], ['sea water:', sea, 'g']]));
    },
    () => { // U3 Q19c
      const L = ['liquid A', 'liquid B', 'liquid C', 'salt solution', 'water']; const v = [R.int(3, 9) * 10, R.int(1, 5) * 10 + 5, R.int(4, 9) * 10 + 5, R.int(103, 115), 100];
      const lo = R.pick([true, false]); const t = lo ? Math.min(...v) : Math.max(...v);
      return V('Unit 3 Review · Q19', mcq({ t: 9, sk: 'enq3', fig: tbl(['liquid', 'boiling point in °C'], L.map((l, i) => [l, v[i]])), q: `Which liquid in the table has the ${lo ? 'lowest' : 'highest'} boiling point?`, vi: ['', `Nhiệt độ sôi ${lo ? 'THẤP' : 'CAO'} nhất?`] }, L, v.indexOf(t)));
    },
    () => { // U3 Q12a
      const F = R.pick([['the temperature of the water', 'Does the temperature of the water change how fast salt dissolves?'], ['how much it is stirred', 'Does stirring change how fast salt dissolves?'], ['the size of the salt grains', 'Does the size of the grains change how fast salt dissolves?']]);
      const o = R.shuffle([F[1], 'Does salt dissolve in water?', 'How much salt is in the sea?', 'Is salt white?']);
      return V('Unit 3 Review · Q12', mcq({ t: 9, sk: 'enq3', q: `${who()} times how long salt takes to dissolve, changing ${F[0]} each time. Write down the scientific question being answered.`, vi: ['', 'Câu hỏi khoa học là gì?'] }, o, o.indexOf(F[1])));
    },
  ],
};
for (const k of Object.keys(SCI_TPL)) { TPL[k] = SCI_TPL[k]; GEN[k] = () => R.pick(SCI_TPL[k])(); }
SKILL_GEN.push(...Object.keys(SCI_TPL).filter((k) => !SKILL_GEN.includes(k)));

// ---------------- exam notes (from the school notes; Unit 3 written from the review sheet) ----------------
const SCI_NOTES = {
  7: { src: 'From "Grade 4 Science Unit 1 – Exam Notes: Plants"', cards: [
    { h: 'Flowering and non-flowering plants', p: ['<b>Flowering plants</b> make flowers and seeds, and often form fruit around the seeds. Examples: rose, sunflower, bean plant.', '<b>Non-flowering plants</b> do not make flowers. Ferns and mosses make spores. Pine trees make seeds in cones. Examples: fern, moss, pine tree.'], vi: 'Cây có hoa thì có hạt. Dương xỉ, rêu dùng bào tử. Cây thông có hạt trong nón nhưng không có hoa.' },
    { h: 'Parts of a flower', p: ['<b>Female part (carpel):</b> ovary holds the eggs; ovule can become a seed; stigma is the sticky part holding pollen; style is the tube taking pollen to the ovary.', '<b>Male part (stamen):</b> anther makes the pollen; filament holds the anther. (Sta-MEN, like antlers on a male deer.)', '<b>No gender:</b> petals attract pollinators; sepals protect the flower bud.'], vi: 'Cái = carpel (stigma, style, ovary, ovule). Đực = stamen (anther, filament). Petal hút côn trùng, sepal bảo vệ nụ.' },
    { h: 'The flowering plant life cycle', p: ['A life cycle shows the stages of a living thing. It repeats.', 'Germination → plant growth → flowering → pollination and fertilisation → fruit and seed production (the ovary forms fruit, ovules form seeds) → seed dispersal → germination again.', '<b>Exam tip:</b> follow the arrows. They might not give you stage 1 at the top.'], vi: 'Vòng đời lặp lại. Đọc theo mũi tên, đừng nghĩ giai đoạn đầu luôn ở trên cùng.' },
    { h: 'Pollination', p: ['Pollination is the movement of pollen from an anther to a stigma of the same kind of flower.', '<b>Insect-pollinated flowers:</b> bright or white petals, often scent and nectar, sticky pollen.', '<b>Wind-pollinated flowers:</b> small petals or no petals, no scent or nectar, lots of light, smooth pollen.', '<b>Memory tip:</b> A to S: pollen moves from the Anther to the Stigma.'], vi: 'Thụ phấn: phấn đi từ anther đến stigma. Hoa côn trùng: sặc sỡ, thơm, có mật, phấn dính. Hoa gió: nhỏ, không mùi, phấn nhẹ.' },
    { h: 'Fertilisation, fruit and seeds', p: ['Fertilisation happens when a male cell from pollen joins an egg cell in an ovule.', 'Fruit has two jobs: it protects the seeds and it can help to spread them.', '<b>Pollination moves pollen. Fertilisation joins cells.</b>'], vi: 'Thụ tinh: tế bào đực gặp trứng trong noãn. Quả bảo vệ hạt và giúp phát tán hạt.' },
    { h: 'Seed dispersal', p: ['Seed dispersal means moving seeds away from the parent plant.', '<b>Why is this important?</b> Seedlings need room. Spreading seeds reduces competition for light, water and space.', '<b>Wind:</b> light seeds with hairs or wings (dandelion). <b>Animals:</b> juicy fruit, hooks or spines (berries, burs). <b>Water:</b> waterproof fruit that floats (coconut). <b>Explosion:</b> a dry pod bursts open (bean pod). <b>Drop and roll:</b> a round fruit falls and rolls (apple).'], vi: 'Hạt đi xa cây mẹ để cây con có đủ ánh sáng, nước, chỗ. 5 cách: gió, động vật, nước, nổ, rơi lăn.' },
    { h: 'Seed germination', p: ['Germination is the start of growth of a seed.', '1. The seed absorbs water and swells. 2. The seed coat splits. 3. The first root grows down. 4. The shoot grows up. 5. Leaves open and a seedling grows.', '<b>Conditions needed:</b> water, air, warmth.', '<b>Memory tip:</b> roots grow down. Shoots grow up towards the light.'], vi: 'Nảy mầm cần nước, không khí, độ ấm. Rễ mọc xuống, chồi mọc lên về phía ánh sáng.' },
    { h: 'Scientific enquiry and fair tests', p: ['A fair test changes one thing and keeps the other things the same.', '<b>Change (independent):</b> change one thing, e.g. water or temperature.', '<b>Measure (dependent):</b> measure the result, e.g. the number of seeds that germinate.', '<b>Keep the same (control):</b> keep everything else the same, e.g. seed type, number of seeds.'], vi: 'Thay đổi 1 thứ, đo kết quả, giữ nguyên các thứ còn lại.' },
  ] },
  8: { src: 'From "Unit 2: Sound – Grade 4 Exam Notes"', cards: [
    { h: 'How is sound made?', p: ['<b>Key idea:</b> sound starts when something vibrates.', 'A vibration is a quick movement back and forth. The object making the sound is the <b>sound source</b>. When cymbals clash, the metal vibrates.', '<b>Why did the rice jump?</b> The tray vibrated. The vibrations travelled through the air and made the plastic wrap vibrate. The moving wrap made the rice grains jump.'], vi: 'Âm thanh bắt đầu khi vật rung. Vật phát ra âm là nguồn âm.' },
    { h: 'How does sound reach us?', p: ['<b>Source vibrates → vibrations travel → ears hear.</b>', 'Sound travels through solids (a desk), liquids (water) and gases (air). In many solids, close particles pass vibrations along easily. Sound usually gets quieter farther from its source.', '<b>Memory tip:</b> say "Source, travel, ear!" and tap three fingers.', '<b>Exam tip:</b> give both steps when asked how you hear a sound.'], vi: 'Nguồn rung → rung động truyền đi → tai nghe. Âm truyền qua rắn, lỏng, khí; càng xa càng nhỏ.' },
    { h: 'Volume and pitch', p: ['<b>Volume</b> is loud or quiet: the size of the vibration. Bigger vibrations → louder. Smaller → quieter. A <b>sound level meter</b> measures sound level in <b>decibels (dB)</b>.', '<b>Pitch</b> is high or low: the speed of the vibration. Faster → higher pitch. Slower → lower pitch. Bats can make sounds too high for us to hear; elephants, too low.', '<b>Memory tip:</b> BIG wiggle for volume, FAST wiggle for pitch. Loud, low sound: wiggle big and slowly!'], vi: 'To/nhỏ = rung mạnh/yếu. Cao/trầm = rung nhanh/chậm.' },
    { h: 'Make it louder, make it quieter', p: ['Hit harder or pluck harder → bigger vibrations. A <b>microphone</b> picks up sound, an <b>amplifier</b> boosts the signal and a <b>loudspeaker</b> plays it.', 'To <b>muffle</b> sound means to make it quieter: ear defenders, carpets, curtains, wall fillings, a vehicle silencer. Unwanted noise such as traffic is <b>noise pollution</b>. Loud noise can harm hearing.'], vi: 'Gõ mạnh hơn thì to hơn. Muffle = làm nhỏ tiếng. Tiếng ồn giao thông là ô nhiễm tiếng ồn.' },
    { h: 'Changing pitch', p: ['<b>Stringed instruments</b> (guitar, violin, harp): shorter, thinner or tighter → faster vibrations → higher pitch. Longer, thicker or looser → lower pitch. Press a string to shorten the part that vibrates. Turn a peg to tighten or loosen it.', '<b>Wind instruments</b> (recorder, flute): the air vibrates. Shorter air column → higher pitch. Uncover the right holes on a recorder to shorten the air column and play a higher note.', '<b>Memory chant:</b> "Short, thin, tight: pitch takes flight!"'], vi: 'Dây ngắn, mảnh, căng → nốt cao. Cột không khí ngắn → nốt cao.' },
    { h: 'Exam trap: blow or tap?', p: ['<b>Blow across a bottle:</b> more water leaves less air. The shorter air column gives a higher note.', '<b>Tap the bottles:</b> the glass vibrates with the water. More water gave a lower note.', '<b>Read the method and follow the results shown.</b>'], vi: 'THỔI: nhiều nước → cao hơn. GÕ: nhiều nước → trầm hơn. Đọc kỹ đề là thổi hay gõ.' },
    { h: 'Fair tests and results', p: ['<b>Which material muffles sound best?</b> Change: the material around the buzzer. Measure: the sound level outside the box (dB). Keep the same: buzzer, setting, box, lid, material thickness and distance to the meter. The lowest reading shows the best muffling.', '<b>Bar chart:</b> label both axes, use equal steps and exact bar heights.', '<b>Table detective:</b> find the right row and column. For a range, take the highest minus the lowest.', '<b>Exam tip:</b> name it, say what happens; for explain, add why. In a conclusion, state the pattern.'], vi: 'Số dB nhỏ nhất = cách âm tốt nhất. Khoảng chênh = cao nhất − thấp nhất.' },
    { h: 'Bonus: other science in the review', p: ['Hair dries when water particles escape into the air (<b>evaporation</b>). The opposite is <b>condensation</b> (gas to liquid). A soluble solid dissolved in a liquid forms a <b>solution</b>.'], vi: 'Bay hơi ↔ ngưng tụ. Chất rắn tan trong chất lỏng tạo thành dung dịch.' },
  ] },
  9: { src: 'Written from the "Science Review – Unit 3" sheet (no school notes for Unit 3 yet)', cards: [
    { h: 'Solids, liquids and gases', p: ['<b>Solid:</b> particles close together in a fixed pattern; they only vibrate. Keeps its shape.', '<b>Liquid:</b> particles close together but can move past each other. Flows and takes the shape of its container.', '<b>Gas:</b> particles far apart, moving fast in all directions. Fills its container. Gases in air: nitrogen, oxygen, carbon dioxide, water vapour.'], vi: 'Rắn: hạt sát, xếp hàng, rung tại chỗ. Lỏng: hạt sát, trượt qua nhau. Khí: hạt xa nhau, bay khắp nơi.' },
    { h: 'Changes of state', p: ['<b>Melting:</b> solid → liquid. <b>Freezing:</b> liquid → solid.', '<b>Evaporation / boiling:</b> liquid → gas. <b>Condensation:</b> gas → liquid (the reverse of evaporation).', 'When water evaporates, the particles get more energy and move faster. The hotter the water, the faster it evaporates.'], vi: 'Nóng chảy, đông đặc, bay hơi, ngưng tụ. Nóng hơn thì bay hơi nhanh hơn.' },
    { h: 'Melting point and boiling point', p: ['The <b>melting point</b> is the temperature at which a solid becomes a liquid. The <b>boiling point</b> is the temperature at which a liquid becomes a gas.', 'Pure water freezes (melts) at 0 °C and boils at 100 °C. It is colourless and expands when it freezes.', 'Adding salt makes the boiling point higher (salt water boils above 100 °C).', 'At room temperature (20 °C): below the melting point → solid; between the two → liquid; above the boiling point → gas.'], vi: 'Nước tinh khiết: 0 °C và 100 °C. Thêm muối thì sôi ở nhiệt độ cao hơn.' },
    { h: 'The water cycle', p: ['<b>Evaporation:</b> the Sun heats water in seas and lakes; it becomes water vapour.', '<b>Condensation:</b> water vapour cools and becomes water droplets in clouds.', '<b>Precipitation:</b> rain (or snow, when the clouds are below 0 °C) falls. Water flows back into rivers, lakes and seas.', 'Only the water evaporates, so clouds have no salt. Most water on Earth is not pure because substances are dissolved in it.'], vi: 'Bay hơi → ngưng tụ → mưa → về sông hồ biển. Muối không bay hơi nên mây không có muối.' },
    { h: 'Dissolving and solutions', p: ['<b>Solute:</b> the solid that dissolves (salt). <b>Solvent:</b> the liquid that dissolves it (water). <b>Solution:</b> the mixture (salt water).', 'Soluble solids dissolve; insoluble solids (sand) do not. Not all solids dissolve in water.', 'Dissolving is reversible. Heat the solution: the solvent evaporates and the solute is left behind as a solid. The mass of salt stays the same.', 'Insoluble solids are separated with a filter.'], vi: 'Chất tan + dung môi = dung dịch. Đun cho nước bay hơi để lấy lại muối. Lọc để tách cát.' },
    { h: 'Investigations', p: ['Use a <b>balance</b> to measure mass (g), a <b>measuring cylinder</b> for volume (cm³), a <b>thermometer</b> for temperature.', 'Fair test: change one thing, measure one thing, keep the rest the same (e.g. same volume of water, same mass of solid).', 'Repeat the investigation to make results reliable and spot odd results.', 'Risk: hot water can burn. Minimise it: take care, let an adult pour.', 'Decrease in mass = mass at the start − mass at the end.'], vi: 'Cân đo khối lượng, ống đong đo thể tích, nhiệt kế đo nhiệt độ. Làm lại để kết quả đáng tin cậy.' },
  ] },
};
if (typeof module !== 'undefined') module.exports = Object.assign(module.exports || {}, { SCI_TPL, SCI_NOTES });
