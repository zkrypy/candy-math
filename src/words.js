// ===== Candy Math: maths words (glossary) + Vietnamese question explanations =====
// Each word: id, re (regex source matched in question text), en, vi, ex (example), cat, pic (optional svg)
const SOLIDS = {
  cube: () => svg(90, 90, `<polygon class="paper strokeish" points="15,30 55,30 55,75 15,75"/><polygon class="paper strokeish" points="15,30 35,12 75,12 55,30"/><polygon class="paper strokeish" points="55,30 75,12 75,57 55,75"/>`, 'opt'),
  cuboid: () => svg(120, 80, `<polygon class="paper strokeish" points="10,30 80,30 80,70 10,70"/><polygon class="paper strokeish" points="10,30 30,12 100,12 80,30"/><polygon class="paper strokeish" points="80,30 100,12 100,52 80,70"/>`, 'opt'),
  cylinder: () => svg(80, 100, `<path class="paper strokeish" d="M12 20 L12 80 A28 10 0 0 0 68 80 L68 20"/><ellipse class="paper strokeish" cx="40" cy="20" rx="28" ry="10"/>`, 'opt'),
  cone: () => svg(80, 100, `<path class="paper strokeish" d="M40 8 L68 82 A28 10 0 0 1 12 82 Z"/>`, 'opt'),
  sphere: () => svg(90, 90, `<circle class="paper strokeish" cx="45" cy="45" r="36"/><ellipse fill="none" class="stroke thin" cx="45" cy="45" rx="36" ry="11" stroke-dasharray="4 4"/>`, 'opt'),
  pyramid: () => svg(100, 90, `<polygon class="paper strokeish" points="50,8 10,72 60,82"/><polygon class="paper strokeish" points="50,8 60,82 90,64"/>`, 'opt'),
  prism: () => svg(120, 80, `<polygon class="paper strokeish" points="10,70 30,30 50,70"/><polygon class="paper strokeish" points="30,30 90,14 110,54 50,70"/><line class="stroke" x1="50" y1="70" x2="110" y2="54"/>`, 'opt'),
};
const symPic = () => svg(120, 90, `<polygon class="paper strokeish" points="60,8 104,82 16,82"/><line class="stroke" x1="60" y1="2" x2="60" y2="88" stroke-dasharray="6 5"/>`, 'opt');
const markedTri = (kind) => {
  const t = { equilateral: [[50, 8], [92, 80], [8, 80]], isosceles: [[50, 6], [76, 86], [24, 86]], scalene: [[22, 10], [100, 84], [6, 84]], right: [[14, 10], [14, 84], [90, 84]] }[kind];
  let s = `<polygon class="paper strokeish" points="${ptsStr(t)}"/>`;
  const mk = (a, b) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2; const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy); const nx = (-dy / d) * 6, ny = (dx / d) * 6; return `<line class="stroke" x1="${mx - nx}" y1="${my - ny}" x2="${mx + nx}" y2="${my + ny}"/>`; };
  if (kind === 'equilateral') s += mk(t[0], t[1]) + mk(t[1], t[2]) + mk(t[2], t[0]);
  if (kind === 'isosceles') s += mk(t[0], t[1]) + mk(t[2], t[0]);
  if (kind === 'right') s += `<polyline fill="none" class="stroke" points="14,72 26,72 26,84"/>`;
  return svg(110, 95, s, 'opt');
};
const fracPic = (n, d) => { let s = ''; for (let i = 0; i < d; i++) s += `<rect x="${4 + i * (120 / d)}" y="6" width="${120 / d}" height="34" class="${i < n ? 'shade' : 'paper'}"/>`; return svg(128, 46, s, 'opt'); };
const nlPic = () => numberLine({ from: -5, to: 5, minor: 1, w: 320, ticks: [{ v: -5, bottom: '−5' }, { v: 0, bottom: '0' }, { v: 5, bottom: '5' }, { v: -3, top: '−3' }] });

const WORDS = [
  // ---- command words (what to do) ----
  { id: 'tick', re: 'tick(?:s)?', en: 'tick (✓)', vi: 'đánh dấu ✓ vào ô hoặc hình đúng', ex: 'Tick all the isosceles triangles = đánh dấu ✓ tất cả tam giác cân.', cat: 'cmd' },
  { id: 'ring', re: 'draw a ring around|ring around|ring', en: 'draw a ring around', vi: 'khoanh tròn', ex: 'Draw a ring around the correct answer = khoanh tròn đáp án đúng.', cat: 'cmd' },
  { id: 'complete', re: 'complete', en: 'complete', vi: 'điền vào chỗ trống cho đủ', ex: 'Complete the sentence = điền nốt chỗ còn thiếu trong câu.', cat: 'cmd' },
  { id: 'explain', re: 'explain(?: your answer| how you know)?', en: 'explain', vi: 'giải thích vì sao (viết lý do)', ex: 'Explain how you know = giải thích vì sao em biết.', cat: 'cmd' },
  { id: 'calculate', re: 'calculate|work out', en: 'calculate / work out', vi: 'tính ra kết quả', ex: 'Calculate 2/3 of 60 = tính 2/3 của 60.', cat: 'cmd' },
  { id: 'describe', re: 'describe', en: 'describe', vi: 'mô tả (nói nó trông thế nào)', ex: 'Describe this pattern = mô tả quy luật này.', cat: 'cmd' },
  { id: 'match', re: 'match(?:es)?', en: 'match', vi: 'nối mỗi cái với cái tương ứng', ex: 'Match each fraction to a percentage = nối mỗi phân số với phần trăm bằng nó.', cat: 'cmd' },
  { id: 'shade', re: 'shade(?:d)?', en: 'shade / shaded', vi: 'tô màu / phần được tô màu', ex: 'Shade 4 more squares = tô thêm 4 ô vuông.', cat: 'cmd' },
  { id: 'join', re: 'join(?:s|ed)?', en: 'join', vi: 'nối (các điểm) / ghép lại', ex: 'Join 3 dots = nối 3 điểm.', cat: 'cmd' },
  { id: 'inorder', re: 'in order|smallest to largest|starting with the smallest', en: 'in order, smallest to largest', vi: 'sắp xếp theo thứ tự từ bé đến lớn', ex: '6.8, 7.6, 7.8 là đã xếp từ bé đến lớn.', cat: 'cmd' },
  { id: 'possible', re: 'possible|could', en: 'possible / could', vi: 'có thể (có nhiều đáp án, chỉ cần viết 1 đáp án đúng)', ex: 'Write a number Eva could choose = viết 1 số mà Eva có thể chọn.', cat: 'cmd' },
  { id: 'all', re: 'all the|all of', en: 'all', vi: 'TẤT CẢ (có thể có nhiều hơn 1 đáp án)', ex: 'Tick all the prime numbers = đánh dấu mọi số nguyên tố, không chỉ 1 số.', cat: 'cmd' },
  { id: 'different', re: 'different', en: 'different', vi: 'khác nhau (không được lặp lại)', ex: 'three different prime numbers = 3 số nguyên tố khác nhau.', cat: 'cmd' },
  { id: 'exactly', re: 'exactly', en: 'exactly', vi: 'đúng bằng (không hơn, không kém)', ex: 'exactly one line of symmetry = có đúng 1 trục đối xứng.', cat: 'cmd' },
  { id: 'identical', re: 'identical|the same', en: 'identical / the same', vi: 'giống hệt nhau', ex: 'three identical boxes = 3 cái hộp giống hệt nhau.', cat: 'cmd' },
  { id: 'statement', re: 'statements?', en: 'statement', vi: 'câu / phép tính được cho sẵn', ex: 'Which statements are true? = câu nào đúng?', cat: 'cmd' },
  { id: 'truefalse', re: 'true|false', en: 'true / false', vi: 'đúng / sai', ex: '4560 ÷ 100 = 45.6 là true (đúng).', cat: 'cmd' },
  // ---- operations ----
  { id: 'total', re: 'total|sum|altogether|in total', en: 'total / sum / altogether', vi: 'tổng: CỘNG tất cả lại', ex: 'two numbers with a total of 5 → 3.68 + 1.32 = 5', cat: 'op' },
  { id: 'multiply', re: 'multipl(?:y|ies|ied)(?: (?:them|it))?(?: together)?', en: 'multiply', vi: 'NHÂN (×), không phải cộng', ex: 'multiplies 17 and 19 together → 17 × 19 = 323', cat: 'op' },
  { id: 'divide', re: 'divide(?:s|d)?(?: by)?|division', en: 'divide', vi: 'CHIA (÷)', ex: '12 divided by 4 = 12 ÷ 4 = 3', cat: 'op' },
  { id: 'share', re: 'shares? (?:\\w+ )?equally|equally', en: 'share equally', vi: 'chia đều (ai cũng được bằng nhau)', ex: 'share 3 bags equally between 10 donkeys → mỗi con 3/10 bao.', cat: 'op' },
  { id: 'subtract', re: 'subtract(?:s|ed)?|take away', en: 'subtract', vi: 'TRỪ (−)', ex: 'subtract 24 from 49 → 49 − 24 = 25', cat: 'op' },
  { id: 'add', re: 'adds?|adding', en: 'add', vi: 'CỘNG (+)', ex: 'add 2 to 5 → 5 + 2 = 7', cat: 'op' },
  { id: 'left', re: 'left(?! to)|the rest|the others', en: 'left / the rest', vi: 'còn lại (thường phải TRỪ)', ex: 'She has $10 and spends $3. How much is left? → 10 − 3 = 7', cat: 'op' },
  { id: 'each', re: 'each', en: 'each', vi: 'mỗi (một cái)', ex: 'Bats cost $42.50 each = mỗi cây gậy giá $42.50.', cat: 'op' },
  { id: 'longer', re: 'longer|shorter', en: 'longer / shorter than', vi: 'dài hơn (cộng thêm) / ngắn hơn (trừ đi)', ex: '2.64 m longer than 16.37 m → 16.37 + 2.64', cat: 'op' },
  { id: 'greater', re: 'greater than|more than|larger than', en: 'greater than / more than (>)', vi: 'lớn hơn (>)', ex: '▲ + 7 is greater than 30 → ▲ + 7 > 30', cat: 'op' },
  { id: 'less', re: 'less than|fewer than|smaller than', en: 'less than (<)', vi: 'nhỏ hơn (<)', ex: '▲ − 7 is less than 20 → ▲ − 7 < 20', cat: 'op' },
  { id: 'between', re: 'between', en: 'between', vi: 'ở giữa (lớn hơn số này, nhỏ hơn số kia)', ex: 'a number between 2 and 3 → 2.35', cat: 'op' },
  { id: 'largest', re: 'largest|greatest|biggest', en: 'largest / greatest', vi: 'lớn nhất', ex: 'the largest number = số lớn nhất', cat: 'op' },
  { id: 'smallest', re: 'smallest', en: 'smallest', vi: 'nhỏ nhất', ex: 'the smallest 3-digit number = số có 3 chữ số nhỏ nhất', cat: 'op' },
  { id: 'half', re: 'half|halves', en: 'half', vi: 'một nửa (½)', ex: 'half of 450 = 225', cat: 'frac' },
  { id: 'quarter', re: 'quarters?', en: 'quarter', vi: 'một phần tư (¼)', ex: 'One quarter of the square is shaded.', cat: 'frac', pic: () => fracPic(1, 4) },
  { id: 'third', re: 'thirds?', en: 'third', vi: 'một phần ba (⅓)', ex: 'one third of 12 = 4', cat: 'frac', pic: () => fracPic(1, 3) },
  { id: 'fifths', re: 'fifths?', en: 'fifth', vi: 'một phần năm (1/5)', ex: 'two fifths = 2/5', cat: 'frac', pic: () => fracPic(2, 5) },
  // ---- numbers ----
  { id: 'digit', re: 'digits?', en: 'digit', vi: 'chữ số (0, 1, 2 … 9)', ex: '4-digit number = số có 4 chữ số, ví dụ 1539.', cat: 'num' },
  { id: 'placevalue', re: 'place value', en: 'place value', vi: 'giá trị theo hàng (hàng trăm, chục, đơn vị…)', ex: 'In 345, the 4 is worth 40.', cat: 'num' },
  { id: 'ones', re: 'ones', en: 'ones', vi: 'hàng đơn vị', ex: '3 ones = 3', cat: 'num' },
  { id: 'tens', re: 'tens', en: 'tens', vi: 'hàng chục', ex: '3 tens = 30', cat: 'num' },
  { id: 'thousands', re: 'thousands|hundreds', en: 'hundreds / thousands', vi: 'hàng trăm / hàng nghìn', ex: '3 thousands = 3000', cat: 'num' },
  { id: 'tenths', re: 'tenths?', en: 'tenths', vi: 'phần mười: chữ số thứ NHẤT sau dấu phẩy', ex: 'In 2.35, the 3 means 3 tenths (0.3).', cat: 'num' },
  { id: 'hundredths', re: 'hundredths?', en: 'hundredths', vi: 'phần trăm: chữ số thứ HAI sau dấu phẩy', ex: 'In 2.35, the 5 means 5 hundredths (0.05).', cat: 'num' },
  { id: 'decimal', re: 'decimal places?|decimals?', en: 'decimal / decimal place', vi: 'số thập phân / chữ số sau dấu phẩy', ex: '6.9 has 1 decimal place. 50.49 has 2 decimal places.', cat: 'num' },
  { id: 'round', re: 'round(?:s|ed|ing)?(?: to the nearest)?|nearest', en: 'round to the nearest', vi: 'làm tròn đến … gần nhất', ex: '35.1 rounded to the nearest whole number is 35.', cat: 'num' },
  { id: 'whole', re: 'whole numbers?', en: 'whole number', vi: 'số tự nhiên (không có phần thập phân)', ex: '5, 12, 100 are whole numbers. 2.5 is not.', cat: 'num' },
  { id: 'regroup', re: 'regroup(?:ed|ing)?', en: 'regroup', vi: 'tách / gộp lại cách khác (vẫn cùng giá trị); khi cộng là "nhớ" sang cột bên trái', ex: '32.23 = 30 + 2.1 + 0.13', cat: 'num' },
  { id: 'negative', re: 'negative|less than 0|below zero', en: 'negative number', vi: 'số âm (nhỏ hơn 0), có dấu −', ex: '−3, −7 are negative numbers.', cat: 'num', pic: nlPic },
  { id: 'countback', re: 'counts? back', en: 'count back', vi: 'đếm lùi (trừ dần)', ex: 'count back in 4s from 17: 17, 13, 9, 5, 1, −3', cat: 'num' },
  { id: 'counton', re: 'counts? on', en: 'count on', vi: 'đếm tiến (cộng dần)', ex: 'count on in 7s from 15: 15, 22, 29', cat: 'num' },
  { id: 'steps', re: 'steps? of|in steps|steps', en: 'in steps of', vi: 'mỗi lần cách nhau …', ex: 'in steps of 5 = mỗi lần cộng/trừ 5', cat: 'num' },
  { id: 'sequence', re: 'sequences?', en: 'sequence', vi: 'dãy số (theo một quy luật)', ex: '23, 15, 7, −1 … is a sequence (−8 each time).', cat: 'num' },
  { id: 'term', re: 'terms?', en: 'term', vi: 'số hạng: một số trong dãy', ex: 'In 3, 12, 21 the 2nd term is 12.', cat: 'num' },
  { id: 'rule', re: 'rule', en: 'rule', vi: 'quy luật', ex: 'Rule: add 7 each time.', cat: 'num' },
  { id: 'consecutive', re: 'consecutive', en: 'consecutive', vi: 'liên tiếp, đứng liền nhau', ex: '6 and 10 are consecutive triangular numbers.', cat: 'num' },
  { id: 'decrease', re: 'decreases?', en: 'decrease', vi: 'giảm đi', ex: 'decreases by 3 each time: 19.5, 16.5, 13.5', cat: 'num' },
  { id: 'odd', re: 'odd', en: 'odd number', vi: 'số lẻ: 1, 3, 5, 7, 9…', ex: '45 is odd.', cat: 'num' },
  { id: 'even', re: 'even', en: 'even number', vi: 'số chẵn: 0, 2, 4, 6, 8…', ex: '46 is even.', cat: 'num' },
  { id: 'prime', re: 'primes?(?: numbers?)?', en: 'prime number', vi: 'số nguyên tố: có ĐÚNG 2 ước là 1 và chính nó. Số 1 KHÔNG phải số nguyên tố.', ex: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29 …', cat: 'num' },
  { id: 'composite', re: 'composite(?: numbers?)?', en: 'composite number', vi: 'hợp số: có NHIỀU HƠN 2 ước', ex: '12 is composite: 1, 2, 3, 4, 6, 12.', cat: 'num' },
  { id: 'factor', re: 'factors?', en: 'factor', vi: 'ước: số chia hết cho nó', ex: 'Factors of 12: 1, 2, 3, 4, 6, 12.', cat: 'num' },
  { id: 'multiple', re: 'multiples?', en: 'multiple', vi: 'bội: kết quả trong bảng nhân', ex: 'Multiples of 5: 5, 10, 15, 20 …', cat: 'num' },
  { id: 'square', re: 'square numbers?|squares (?:her|his) number|squared|squares', en: 'square number / squared', vi: 'số chính phương: một số nhân với CHÍNH NÓ. 8² = 8 × 8 = 64', ex: '1, 4, 9, 16, 25, 36, 49, 64, 81, 100', cat: 'num', pic: () => dotArray(3, 3) },
  { id: 'triangular', re: 'triangular numbers?', en: 'triangular number', vi: 'số tam giác: xếp chấm thành hình tam giác', ex: '1, 3, 6, 10, 15, 21, 28 …', cat: 'num', pic: () => triPatterns([1, 2, 3, 4], 'center', false) },
  { id: 'carroll', re: 'carroll diagram', en: 'Carroll diagram', vi: 'bảng phân loại 2 chiều (có / không có tính chất)', ex: 'rows: multiples of 3 / not; columns: multiples of 5 / not', cat: 'num' },
  { id: 'represent', re: 'represents?|represented by', en: 'represents', vi: 'thay cho, có nghĩa là', ex: '★ represents a number = ★ là một số chưa biết.', cat: 'num' },
  { id: 'value', re: 'values?', en: 'value', vi: 'giá trị (bằng bao nhiêu)', ex: 'the value of ★ = ★ bằng bao nhiêu.', cat: 'num' },
  // ---- data ----
  { id: 'median', re: 'median', en: 'median', vi: 'số ở GIỮA sau khi xếp từ bé đến lớn', ex: '3, 3, 5, 6, 8 → median = 5', cat: 'data' },
  { id: 'mode', re: 'mode', en: 'mode', vi: 'số xuất hiện NHIỀU LẦN NHẤT', ex: '3, 3, 5, 6, 8 → mode = 3', cat: 'data' },
  { id: 'data', re: 'data|results', en: 'data / results', vi: 'số liệu, kết quả thu được', ex: 'Here is their data: 8, 3, 6, 5, 3', cat: 'data' },
  { id: 'mass', re: 'mass(?:es)?', en: 'mass', vi: 'khối lượng (cân nặng), đơn vị g, kg', ex: 'mass of a box = 320 g', cat: 'data' },
  { id: 'balance', re: 'balances?', en: 'balance', vi: 'cân bằng: hai bên nặng bằng nhau', ex: '3 boxes balance 2 cans → 3 × box = 2 × can', cat: 'data' },
  // ---- fractions ----
  { id: 'fraction', re: 'fractions?', en: 'fraction', vi: 'phân số', ex: '3/4: tử số 3, mẫu số 4', cat: 'frac', pic: () => fracPic(3, 4) },
  { id: 'numerator', re: 'numerator', en: 'numerator', vi: 'tử số (số ở TRÊN)', ex: 'In 3/4 the numerator is 3.', cat: 'frac' },
  { id: 'denominator', re: 'denominator', en: 'denominator', vi: 'mẫu số (số ở DƯỚI)', ex: 'In 3/4 the denominator is 4.', cat: 'frac' },
  { id: 'mixed', re: 'mixed numbers?', en: 'mixed number', vi: 'hỗn số: số tự nhiên + phân số', ex: '2 2/3 is a mixed number (= 8/3).', cat: 'frac' },
  { id: 'equivalent', re: 'equivalent', en: 'equivalent', vi: 'bằng nhau (cùng giá trị, viết khác)', ex: '1/2 is equivalent to 2/4, 0.5 and 50%.', cat: 'frac' },
  { id: 'percentage', re: 'percentages?|per cent|percent', en: 'percentage (%)', vi: 'phần trăm: bao nhiêu phần trên 100', ex: '25% = 25/100 = 1/4', cat: 'frac' },
  { id: 'of', re: 'fraction of an amount', en: 'fraction OF a number', vi: '"of" nghĩa là NHÂN: 2/3 of 60 = 60 ÷ 3 × 2', ex: '2/3 of 60 = 40', cat: 'frac' },
  { id: 'numberline', re: 'number line', en: 'number line', vi: 'trục số', ex: 'Each box points to a number on the number line.', cat: 'frac', pic: nlPic },
  // ---- shapes ----
  { id: 'triangle', re: 'triangles?', en: 'triangle', vi: 'hình tam giác (3 cạnh)', ex: '', cat: 'shape', pic: () => SHAPES.eqtri() },
  { id: 'equilateral', re: 'equilateral', en: 'equilateral triangle', vi: 'tam giác ĐỀU: 3 cạnh bằng nhau', ex: 'All 3 sides are the same length.', cat: 'shape', pic: () => markedTri('equilateral') },
  { id: 'isosceles', re: 'isosceles', en: 'isosceles triangle', vi: 'tam giác CÂN: 2 cạnh bằng nhau', ex: 'Two sides are the same length.', cat: 'shape', pic: () => markedTri('isosceles') },
  { id: 'scalene', re: 'scalene', en: 'scalene triangle', vi: 'tam giác THƯỜNG: 3 cạnh khác nhau, 0 trục đối xứng', ex: 'All 3 sides are different lengths.', cat: 'shape', pic: () => markedTri('scalene') },
  { id: 'rightangle', re: 'right-angled|right angle', en: 'right-angled', vi: 'có góc vuông (90°)', ex: '', cat: 'shape', pic: () => markedTri('right') },
  { id: 'quadrilateral', re: 'quadrilaterals?', en: 'quadrilateral', vi: 'tứ giác (4 cạnh)', ex: 'square, rectangle, kite, parallelogram', cat: 'shape', pic: () => SHAPES.kite() },
  { id: 'kite', re: 'kites?', en: 'kite', vi: 'hình cánh diều (1 trục đối xứng)', ex: '', cat: 'shape', pic: () => SHAPES.kite() },
  { id: 'parallelogram', re: 'parallelograms?', en: 'parallelogram', vi: 'hình bình hành', ex: '', cat: 'shape', pic: () => SHAPES.parallelogram() },
  { id: 'pentagon', re: 'pentagons?', en: 'pentagon', vi: 'ngũ giác (5 cạnh)', ex: '', cat: 'shape', pic: () => SHAPES.pentagon() },
  { id: 'hexagon', re: 'hexagons?', en: 'hexagon', vi: 'lục giác (6 cạnh)', ex: '', cat: 'shape', pic: () => SHAPES.hexagon() },
  { id: 'octagon', re: 'octagons?', en: 'octagon', vi: 'bát giác (8 cạnh)', ex: '', cat: 'shape', pic: () => SHAPES.octagon() },
  { id: 'regular', re: 'regular', en: 'regular (shape)', vi: 'đều: mọi cạnh và mọi góc bằng nhau', ex: 'a regular pentagon', cat: 'shape', pic: () => SHAPES.pentagon() },
  { id: 'vertex', re: 'vertex|vertices|corners?', en: 'vertex (vertices)', vi: 'đỉnh (góc của hình)', ex: 'A triangle has 3 vertices.', cat: 'shape' },
  { id: 'polygon', re: 'polygons?', en: 'polygon', vi: 'đa giác: hình phẳng có các cạnh thẳng', ex: '', cat: 'shape' },
  { id: 'tessellate', re: 'tessellat\\w*', en: 'tessellate', vi: 'lát kín: ghép nhiều hình giống nhau KHÔNG có khe hở', ex: 'Squares tessellate. Circles do not.', cat: 'shape', pic: () => svg(120, 80, [0, 1, 2].map((i) => [0, 1].map((j) => `<rect class="paper strokeish" x="${4 + i * 38}" y="${4 + j * 36}" width="38" height="36"/>`).join('')).join(''), 'opt') },
  { id: 'symmetry', re: 'lines? of symmetry|symmetrical|symmetry', en: 'line of symmetry / symmetrical', vi: 'trục đối xứng: gấp theo đường này thì 2 nửa trùng khít', ex: 'A square has 4 lines of symmetry.', cat: 'shape', pic: symPic },
  { id: 'mirror', re: 'mirror line|mirror', en: 'mirror line', vi: 'đường gương, chính là trục đối xứng', ex: '', cat: 'shape', pic: symPic },
  { id: 'reflect', re: 'reflect(?:s|ed|ion)?', en: 'reflect / reflection', vi: 'lật hình qua đường gương (hình đối xứng)', ex: '', cat: 'shape' },
  { id: 'grid', re: 'dotted grid|dotty grid|grid', en: 'grid / dotted grid', vi: 'lưới ô vuông / lưới chấm', ex: '', cat: 'shape' },
  { id: 'pattern', re: 'patterns?', en: 'pattern', vi: 'hình mẫu / quy luật lặp lại', ex: '', cat: 'shape' },
  { id: 'tile', re: 'tiles?', en: 'tile', vi: 'viên gạch (mảnh hình để ghép)', ex: '', cat: 'shape' },
  { id: 'face', re: 'faces?', en: 'face', vi: 'mặt (của hình khối)', ex: 'A cube has 6 faces.', cat: 'solid', pic: () => SOLIDS.cube() },
  { id: 'edge', re: 'edges?', en: 'edge', vi: 'cạnh (của hình khối)', ex: 'A cube has 12 edges.', cat: 'solid' },
  { id: 'net', re: 'net', en: 'net', vi: 'hình khai triển: gấp lại thành hình khối', ex: '', cat: 'solid', pic: () => svg(140, 100, [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]].map(([c, r]) => `<rect class="paper strokeish" x="${4 + c * 32}" y="${4 + r * 30}" width="32" height="30"/>`).join(''), 'opt') },
  { id: 'opposite', re: 'opposite', en: 'opposite faces', vi: 'hai mặt đối diện (song song, không chạm nhau)', ex: 'On a dice, opposite faces add up to 7.', cat: 'solid' },
  { id: 'cube', re: 'cubes?', en: 'cube', vi: 'hình lập phương', ex: '', cat: 'solid', pic: () => SOLIDS.cube() },
  { id: 'cuboid', re: 'cuboids?', en: 'cuboid', vi: 'hình hộp chữ nhật', ex: '', cat: 'solid', pic: () => SOLIDS.cuboid() },
  { id: 'cylinder', re: 'cylinders?', en: 'cylinder', vi: 'hình trụ', ex: '2 circle faces + 1 curved face', cat: 'solid', pic: () => SOLIDS.cylinder() },
  { id: 'cone', re: 'cones?', en: 'cone', vi: 'hình nón', ex: '', cat: 'solid', pic: () => SOLIDS.cone() },
  { id: 'sphere', re: 'spheres?', en: 'sphere', vi: 'hình cầu', ex: '', cat: 'solid', pic: () => SOLIDS.sphere() },
  { id: 'pyramid', re: 'pyramids?', en: 'pyramid', vi: 'hình chóp', ex: '', cat: 'solid', pic: () => SOLIDS.pyramid() },
  { id: 'prism', re: 'prisms?', en: 'prism', vi: 'hình lăng trụ', ex: '', cat: 'solid', pic: () => SOLIDS.prism() },
  { id: 'shape3d', re: '3D shapes?', en: '3D shape', vi: 'hình khối (có chiều dày)', ex: 'cube, cylinder, sphere', cat: 'solid' },
];
// ---- science words (subj: 'sci'); ids start with "sc" so they never clash with maths words ----
// particle boxes used by the science questions and the word pictures
function particles(kind, cls = 'opt') {
  let c = '';
  const dot = (x, y) => `<circle class="shade" cx="${x}" cy="${y}" r="7"/>`;
  if (kind === 'solid') { for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) c += dot(17 + i * 14, 69 - r * 14); }
  else if (kind === 'liquid') { [[16, 70], [30, 68], [45, 70], [59, 67], [74, 70], [88, 69], [22, 56], [37, 55], [52, 54], [67, 56], [82, 55], [29, 42], [60, 41], [44, 42]].forEach(([x, y]) => (c += dot(x, y))); }
  else { [[18, 20], [62, 14], [86, 40], [40, 46], [20, 68], [70, 66]].forEach(([x, y]) => (c += dot(x, y))); }
  return svg(104, 84, `<rect class="paper" x="2" y="2" width="100" height="80"/>${c}`, cls);
}
const SCI_WORDS = [
  // plants
  { id: 'scgerm', re: 'germinat\\w*', en: 'germination', vi: 'sự nảy mầm (hạt bắt đầu mọc)', ex: 'Seeds need water, air and warmth to germinate.', cat: 'plant' },
  { id: 'scseedling', re: 'seedlings?', en: 'seedling', vi: 'cây con (cây non mới mọc từ hạt)', ex: '', cat: 'plant' },
  { id: 'scshoot', re: 'shoots?', en: 'shoot', vi: 'chồi (phần mọc lên trên)', ex: 'Shoots grow up towards the light.', cat: 'plant' },
  { id: 'scroot', re: 'roots?', en: 'root', vi: 'rễ (phần mọc xuống đất)', ex: 'Roots grow down.', cat: 'plant' },
  { id: 'scpollination', re: 'pollinat\\w*', en: 'pollination', vi: 'sự thụ phấn: hạt phấn đi từ bao phấn (anther) sang đầu nhụy (stigma)', ex: 'A to S: Anther to Stigma.', cat: 'plant' },
  { id: 'scpollen', re: 'pollen', en: 'pollen', vi: 'hạt phấn hoa', ex: '', cat: 'plant' },
  { id: 'scfert', re: 'fertilis\\w*', en: 'fertilisation', vi: 'sự thụ tinh: tế bào đực trong hạt phấn kết hợp với tế bào trứng trong noãn', ex: 'Pollination moves pollen. Fertilisation joins cells.', cat: 'plant' },
  { id: 'scovule', re: 'ovules?', en: 'ovule', vi: 'noãn (sau này thành hạt)', ex: '', cat: 'plant' },
  { id: 'scovary', re: 'ovary|ovaries', en: 'ovary', vi: 'bầu nhụy (chứa noãn, sau này thành quả)', ex: '', cat: 'plant' },
  { id: 'scstigma', re: 'stigmas?', en: 'stigma', vi: 'đầu nhụy (phần dính, giữ hạt phấn)', ex: '', cat: 'plant' },
  { id: 'scstyle', re: 'style', en: 'style', vi: 'vòi nhụy (ống dẫn phấn xuống bầu nhụy)', ex: '', cat: 'plant' },
  { id: 'sccarpel', re: 'carpels?', en: 'carpel', vi: 'nhụy hoa, bộ phận CÁI (gồm đầu nhụy, vòi nhụy, bầu nhụy)', ex: '', cat: 'plant' },
  { id: 'scstamen', re: 'stamens?', en: 'stamen', vi: 'nhị hoa, bộ phận ĐỰC (gồm bao phấn và chỉ nhị)', ex: 'Sta-MEN: male part.', cat: 'plant' },
  { id: 'scanther', re: 'anthers?', en: 'anther', vi: 'bao phấn (làm ra hạt phấn)', ex: '', cat: 'plant' },
  { id: 'scfilament', re: 'filaments?', en: 'filament', vi: 'chỉ nhị (cuống giữ bao phấn)', ex: '', cat: 'plant' },
  { id: 'scpetal', re: 'petals?', en: 'petal', vi: 'cánh hoa (thu hút côn trùng)', ex: '', cat: 'plant' },
  { id: 'scsepal', re: 'sepals?', en: 'sepal', vi: 'lá đài (bảo vệ nụ hoa)', ex: '', cat: 'plant' },
  { id: 'scnectar', re: 'nectar', en: 'nectar', vi: 'mật hoa', ex: '', cat: 'plant' },
  { id: 'scscent', re: 'scent|sweet smell', en: 'scent', vi: 'mùi thơm', ex: '', cat: 'plant' },
  { id: 'scdispersal', re: 'dispers\\w*', en: 'seed dispersal', vi: 'sự phát tán hạt (đưa hạt đi xa cây mẹ)', ex: 'By wind, animals, water, explosion, drop and roll.', cat: 'plant' },
  { id: 'scparent', re: 'parent plant', en: 'parent plant', vi: 'cây mẹ', ex: '', cat: 'plant' },
  { id: 'sccompet', re: 'competition', en: 'competition', vi: 'sự cạnh tranh (giành ánh sáng, nước, chỗ)', ex: '', cat: 'plant' },
  { id: 'sclifecycle', re: 'life cycles?', en: 'life cycle', vi: 'vòng đời', ex: '', cat: 'plant' },
  { id: 'screpro', re: 'reproduction', en: 'reproduction', vi: 'sự sinh sản', ex: 'Plants have flowers for reproduction.', cat: 'plant' },
  { id: 'scspores', re: 'spores?', en: 'spore', vi: 'bào tử (dương xỉ, rêu sinh sản bằng bào tử)', ex: '', cat: 'plant' },
  { id: 'scconifer', re: 'conifers?|pine trees?', en: 'conifer', vi: 'cây lá kim (thông), có hạt trong nón, không có hoa', ex: '', cat: 'plant' },
  { id: 'scalgae', re: 'algae', en: 'algae', vi: 'tảo', ex: '', cat: 'plant' },
  { id: 'scmoss', re: 'moss(?:es)?', en: 'moss', vi: 'rêu', ex: '', cat: 'plant' },
  { id: 'scfern', re: 'ferns?', en: 'fern', vi: 'cây dương xỉ', ex: '', cat: 'plant' },
  // sound
  { id: 'scvibrate', re: 'vibrat\\w*', en: 'vibrate', vi: 'rung (chuyển động qua lại thật nhanh)', ex: 'Sound starts when something vibrates.', cat: 'sound' },
  { id: 'scsource', re: 'sound source', en: 'sound source', vi: 'nguồn âm (vật phát ra âm thanh)', ex: '', cat: 'sound' },
  { id: 'scvolume', re: 'volume|loudness', en: 'volume', vi: 'độ to (to hay nhỏ)', ex: 'Bigger vibrations: louder.', cat: 'sound' },
  { id: 'scpitch', re: 'pitch', en: 'pitch', vi: 'độ cao của âm (cao/trầm, bổng/trầm)', ex: 'Faster vibrations: higher pitch.', cat: 'sound' },
  { id: 'scdb', re: 'decibels?|dB', en: 'decibel (dB)', vi: 'đơn vị đo độ to của âm', ex: '', cat: 'sound' },
  { id: 'scmeter', re: 'sound level meter', en: 'sound level meter', vi: 'máy đo độ to của âm', ex: '', cat: 'sound' },
  { id: 'scmuffle', re: 'muffl\\w*', en: 'muffle', vi: 'làm cho âm nhỏ đi', ex: '', cat: 'sound' },
  { id: 'scnoise', re: 'noise pollution', en: 'noise pollution', vi: 'ô nhiễm tiếng ồn', ex: '', cat: 'sound' },
  { id: 'scamp', re: 'amplifiers?', en: 'amplifier', vi: 'bộ khuếch đại (làm tín hiệu mạnh hơn)', ex: '', cat: 'sound' },
  { id: 'scspeaker', re: 'loudspeakers?', en: 'loudspeaker', vi: 'loa', ex: '', cat: 'sound' },
  { id: 'scmic', re: 'microphones?', en: 'microphone', vi: 'micrô (thu âm)', ex: '', cat: 'sound' },
  { id: 'scaircol', re: 'air column', en: 'air column', vi: 'cột không khí (trong ống sáo, chai)', ex: 'Shorter air column: higher note.', cat: 'sound' },
  { id: 'scstringed', re: 'stringed|strings?', en: 'string / stringed instrument', vi: 'dây đàn / nhạc cụ dây (guitar, violin, harp)', ex: '', cat: 'sound' },
  { id: 'scwind', re: 'wind instruments?', en: 'wind instrument', vi: 'nhạc cụ hơi (thổi: sáo, kèn)', ex: '', cat: 'sound' },
  { id: 'sctight', re: 'tighter|tighten\\w*|looser', en: 'tighter / looser', vi: 'căng hơn / chùng hơn', ex: '', cat: 'sound' },
  // matter
  { id: 'scsolid', re: 'solids?', en: 'solid', vi: 'chất rắn', ex: '', cat: 'matter', pic: () => particles('solid') },
  { id: 'scliquid', re: 'liquids?', en: 'liquid', vi: 'chất lỏng', ex: '', cat: 'matter', pic: () => particles('liquid') },
  { id: 'scgas', re: 'gas(?:es)?', en: 'gas', vi: 'chất khí', ex: '', cat: 'matter', pic: () => particles('gas') },
  { id: 'scparticle', re: 'particles?', en: 'particle', vi: 'hạt (rất nhỏ, tạo nên mọi chất)', ex: '', cat: 'matter' },
  { id: 'scmelt', re: 'melting point|melting|melts?', en: 'melting / melting point', vi: 'sự nóng chảy (rắn → lỏng) / nhiệt độ nóng chảy', ex: 'Ice melts at 0 °C.', cat: 'matter' },
  { id: 'scfreeze', re: 'freez\\w*|froze', en: 'freezing', vi: 'sự đông đặc (lỏng → rắn)', ex: 'Pure water freezes at 0 °C.', cat: 'matter' },
  { id: 'scboil', re: 'boiling point|boiling|boils?', en: 'boiling / boiling point', vi: 'sự sôi / nhiệt độ sôi (nhiệt độ chất lỏng biến thành khí)', ex: 'Pure water boils at 100 °C.', cat: 'matter' },
  { id: 'scevap', re: 'evaporat\\w*', en: 'evaporation', vi: 'sự bay hơi (lỏng → khí)', ex: 'Hair dries because water evaporates.', cat: 'matter' },
  { id: 'sccond', re: 'condens\\w*', en: 'condensation', vi: 'sự ngưng tụ (khí → lỏng), ngược với bay hơi', ex: '', cat: 'matter' },
  { id: 'scvapour', re: 'water vapour|vapour', en: 'water vapour', vi: 'hơi nước (nước ở thể khí)', ex: '', cat: 'matter' },
  { id: 'scprecip', re: 'precipitation', en: 'precipitation', vi: 'mưa, tuyết rơi xuống (giáng thủy)', ex: '', cat: 'matter' },
  { id: 'scwcycle', re: 'water cycle', en: 'water cycle', vi: 'vòng tuần hoàn của nước', ex: '', cat: 'matter' },
  { id: 'scdissolve', re: 'dissolv\\w*', en: 'dissolve', vi: 'hòa tan', ex: 'Salt dissolves in water.', cat: 'matter' },
  { id: 'scsoluble', re: 'insoluble|soluble', en: 'soluble / insoluble', vi: 'tan được / không tan được', ex: 'Salt is soluble. Sand is insoluble.', cat: 'matter' },
  { id: 'scsolute', re: 'solutes?', en: 'solute', vi: 'chất tan (chất rắn được hòa tan, ví dụ muối)', ex: '', cat: 'matter' },
  { id: 'scsolvent', re: 'solvents?', en: 'solvent', vi: 'dung môi (chất lỏng hòa tan chất khác, ví dụ nước)', ex: '', cat: 'matter' },
  { id: 'scsolution', re: 'solutions?', en: 'solution', vi: 'dung dịch (chất tan + dung môi, ví dụ nước muối)', ex: '', cat: 'matter' },
  { id: 'scmixture', re: 'mixtures?', en: 'mixture', vi: 'hỗn hợp', ex: '', cat: 'matter' },
  { id: 'screversible', re: 'reversible', en: 'reversible', vi: 'có thể đảo ngược (lấy lại chất ban đầu được)', ex: '', cat: 'matter' },
  { id: 'scroomtemp', re: 'room temperature', en: 'room temperature', vi: 'nhiệt độ phòng (khoảng 20 °C)', ex: '', cat: 'matter' },
  { id: 'scpure', re: 'pure', en: 'pure', vi: 'tinh khiết (không lẫn chất khác)', ex: '', cat: 'matter' },
  { id: 'scpollution', re: 'pollution', en: 'pollution', vi: 'sự ô nhiễm', ex: '', cat: 'matter' },
  // investigations
  { id: 'scfair', re: 'fair test', en: 'fair test', vi: 'thí nghiệm công bằng: chỉ thay đổi MỘT thứ, giữ nguyên các thứ khác', ex: '', cat: 'enq' },
  { id: 'scindep', re: 'independent(?: variable)?', en: 'independent variable', vi: 'biến độc lập: thứ em THAY ĐỔI', ex: '', cat: 'enq' },
  { id: 'scdep', re: 'dependent(?: variable)?', en: 'dependent variable', vi: 'biến phụ thuộc: thứ em ĐO', ex: '', cat: 'enq' },
  { id: 'sccontrol', re: 'control(?: variables?)?', en: 'control variable', vi: 'biến kiểm soát: thứ em GIỮ NGUYÊN', ex: '', cat: 'enq' },
  { id: 'scvariable', re: 'variables?', en: 'variable', vi: 'biến (thứ có thể thay đổi trong thí nghiệm)', ex: '', cat: 'enq' },
  { id: 'scpredict', re: 'predict\\w*', en: 'prediction', vi: 'dự đoán (đoán trước kết quả)', ex: '', cat: 'enq' },
  { id: 'scconclusion', re: 'conclusions?', en: 'conclusion', vi: 'kết luận (nêu quy luật từ kết quả)', ex: '', cat: 'enq' },
  { id: 'scinvest', re: 'investigat\\w*', en: 'investigate', vi: 'làm thí nghiệm tìm hiểu', ex: '', cat: 'enq' },
  { id: 'scevidence', re: 'evidence', en: 'evidence', vi: 'bằng chứng (số liệu chứng minh)', ex: '', cat: 'enq' },
  { id: 'screpeat', re: 'repeats?|reliable', en: 'repeat / reliable', vi: 'làm lại / đáng tin cậy', ex: '', cat: 'enq' },
  { id: 'scrisk', re: 'risks?|minimise', en: 'risk / minimise', vi: 'nguy hiểm / giảm bớt', ex: '', cat: 'enq' },
  { id: 'scequip', re: 'equipment', en: 'equipment', vi: 'dụng cụ', ex: '', cat: 'enq' },
  { id: 'sccyl', re: 'measuring cylinder', en: 'measuring cylinder', vi: 'ống đong (đo thể tích chất lỏng)', ex: '', cat: 'enq' },
  { id: 'scthermo', re: 'thermometers?', en: 'thermometer', vi: 'nhiệt kế', ex: '', cat: 'enq' },
].map((w) => Object.assign(w, { subj: 'sci' }));
WORDS.push(...SCI_WORDS);
const WORD_BY_ID = Object.fromEntries(WORDS.map((w) => [w.id, w]));
const CAT_VI = { cmd: 'Đề bảo em làm gì', op: 'Phép tính', num: 'Số', data: 'Số liệu', frac: 'Phân số', shape: 'Hình phẳng', solid: 'Hình khối', plant: 'Plants · Thực vật', sound: 'Sound · Âm thanh', matter: 'Matter · Chất', enq: 'Thí nghiệm' };
const wordsOf = (subj) => WORDS.filter((w) => (w.subj || 'math') === subj);
const wordTopic = (subj) => (subj === 'sci' ? 10 : 6);

// wrap glossary words in text (skip HTML tags and anything inside <svg> or <table>)
const mkRe = (list) => new RegExp('\\b(' + list.map((w) => `(?<${w.id}>${w.re})`).join('|') + ')\\b', 'gi');
// maths questions: maths words only. Science questions: science words + the maths "command" words (tick, describe, explain...)
const WORD_RE = mkRe(WORDS.filter((w) => (w.subj || 'math') === 'math'));
const WORD_RE_SCI = mkRe([...WORDS.filter((w) => w.subj === 'sci'), ...WORDS.filter((w) => !w.subj && w.cat === 'cmd')]);
function glossify(html, subj = 'math') {
  const RE = subj === 'sci' ? WORD_RE_SCI : WORD_RE;
  const seen = new Set(); let depth = 0;
  return String(html).split(/(<[^>]+>)/).map((seg) => {
    if (seg.startsWith('<')) { if (/^<(svg|table)\b/i.test(seg)) depth++; else if (/^<\/(svg|table)>/i.test(seg)) depth--; return seg; }
    if (depth > 0) return seg;
    return seg.replace(RE, (...args) => {
      const groups = args[args.length - 1]; const id = Object.keys(groups).find((k) => groups[k] !== undefined);
      if (!id || seen.has(id)) return args[0]; seen.add(id);
      return `<span class="gw" role="button" tabindex="0" data-w="${id}">${args[0]}</span>`;
    });
  }).join('');
}

// ---- vocabulary quiz generator ----
function wordQuestion(w) {
  const subj = w.subj || 'math'; const pool = wordsOf(subj); const t = wordTopic(subj); const sk = subj === 'sci' ? 'swords' : 'words';
  const others = (list) => R.shuffle(list.filter((x) => x.id !== w.id && x.en !== w.en && x.vi !== w.vi)).slice(0, 3);
  const pics = pool.filter((x) => x.pic && x.en !== w.en);
  const k = w.pic && pics.length >= 3 && R.int(0, 2) === 0 ? 2 : R.int(0, 1);
  if (k === 0) { const o = R.shuffle([w, ...others(pool)]); return G(mcq({ t, sk, word: w.id, q: `What does <b>${w.en}</b> mean?`, why: w.ex }, o.map((x) => x.vi), o.indexOf(w))); }
  if (k === 1) { const o = R.shuffle([w, ...others(pool)]); return G(mcq({ t, sk, word: w.id, q: `Which word means: <b>${w.vi}</b>?`, why: w.ex }, o.map((x) => x.en), o.indexOf(w))); }
  const same = pics.filter((x) => x.cat === w.cat);
  const o = R.shuffle([w, ...R.shuffle(same.length >= 3 ? same : pics).slice(0, 3)]);
  return G(mcq({ t, sk, word: w.id, fig: w.pic(), q: 'Which word matches the picture?', why: w.vi }, o.map((x) => x.en), o.indexOf(w)));
}
// sentence fill-ins for command and operation words
const CLOZE = [
  ['Tick two numbers with a ___ of 5. (cộng lại bằng 5)', ['total', 'difference', 'product'], 0],
  ['Anastasia picks two prime numbers and ___ them together. 17 × 19 = 323', ['multiplies', 'adds', 'shares'], 0],
  ['She has $20 and spends $8. How much money is ___? (còn lại)', ['left', 'each', 'altogether'], 0],
  ['Balls cost $7.75 ___. (mỗi quả)', ['each', 'left', 'total'], 0],
  ['Write the numbers in order, starting with the ___. (bé nhất)', ['smallest', 'largest', 'median'], 0],
  ['The ___ is the middle number when the data is in order.', ['median', 'mode', 'total'], 0],
  ['The ___ is the number that appears most often.', ['mode', 'median', 'sum'], 0],
  ['A triangle with two equal sides is called ___.', ['isosceles', 'scalene', 'equilateral'], 0],
  ['A triangle with three different sides is called ___.', ['scalene', 'isosceles', 'equilateral'], 0],
  ['A number with exactly two factors is a ___ number.', ['prime', 'composite', 'square'], 0],
  ['8 × 8 = 64, so 64 is a ___ number.', ['square', 'prime', 'triangular'], 0],
  ['1, 3, 6, 10, 15 are ___ numbers.', ['triangular', 'square', 'prime'], 0],
  ['In 4.37, the digit 3 is in the ___ place.', ['tenths', 'hundredths', 'tens'], 0],
  ['In 4.37, the digit 7 is in the ___ place.', ['hundredths', 'tenths', 'ones'], 0],
  ['Tom counts ___ from 13 in steps of 5: 13, 8, 3, −2.', ['back', 'on', 'up'], 0],
  ['−7 is a ___ number because it is less than 0.', ['negative', 'prime', 'even'], 0],
  ['1/2 is ___ to 50%. (bằng nhau)', ['equivalent', 'greater', 'less'], 0],
  ['In 3/4, the 4 is the ___.', ['denominator', 'numerator', 'digit'], 0],
  ['2 1/3 is a ___ number.', ['mixed', 'negative', 'square'], 0],
  ['Squares fit together with no gaps. They ___.', ['tessellate', 'reflect', 'round'], 0],
  ['Fold along the ___ and the two halves match.', ['line of symmetry', 'number line', 'net'], 0],
  ['Fold a ___ to make a cube.', ['net', 'grid', 'pattern'], 0],
  ['A shape with 6 sides is a ___.', ['hexagon', 'pentagon', 'octagon'], 0],
  ['A shape with 8 sides is an ___.', ['octagon', 'hexagon', 'pentagon'], 0],
  ['Draw a ___ around the correct answer. (khoanh tròn)', ['ring', 'line', 'tick'], 0],
  ['Write a number Eva ___ choose. (có thể, nhiều đáp án)', ['could', 'must', 'did'], 0],
];
const SCLOZE = [
  ['Pollen moves from the anther to the ___. (đầu nhụy)', ['stigma', 'ovary', 'petal'], 0],
  ['The male part of a flower is the ___.', ['stamen', 'carpel', 'sepal'], 0],
  ['The female part of a flower is the ___.', ['carpel', 'stamen', 'petal'], 0],
  ['Moving seeds away from the parent plant is called seed ___.', ['dispersal', 'germination', 'fertilisation'], 0],
  ['The start of growth of a seed is called ___.', ['germination', 'pollination', 'dispersal'], 0],
  ['A fair test changes ___ thing and keeps the other things the same.', ['one', 'two', 'every'], 0],
  ['The thing you measure is the ___ variable.', ['dependent', 'independent', 'control'], 0],
  ['The thing you change is the ___ variable.', ['independent', 'dependent', 'control'], 0],
  ['Sound is made when an object ___.', ['vibrates', 'evaporates', 'dissolves'], 0],
  ['High and low describe the ___ of a sound.', ['pitch', 'volume', 'mass'], 0],
  ['Loud and quiet describe the ___ of a sound.', ['volume', 'pitch', 'temperature'], 0],
  ['Bigger vibrations make a ___ sound.', ['louder', 'higher', 'lower'], 0],
  ['Faster vibrations make a ___ pitch.', ['higher', 'lower', 'louder'], 0],
  ['A tighter string makes a ___ note.', ['higher', 'lower', 'quieter'], 0],
  ['Water turning into water vapour is called ___.', ['evaporation', 'condensation', 'freezing'], 0],
  ['Water vapour turning back into water is called ___.', ['condensation', 'evaporation', 'melting'], 0],
  ['A solid turning into a liquid is called ___.', ['melting', 'freezing', 'boiling'], 0],
  ['Salt dissolves in water. The salt is the ___.', ['solute', 'solvent', 'solution'], 0],
  ['Salt dissolves in water. The water is the ___.', ['solvent', 'solute', 'mixture'], 0],
  ['Salt water is a ___.', ['solution', 'solvent', 'solute'], 0],
  ['Sand does not dissolve in water. Sand is ___.', ['insoluble', 'soluble', 'a solvent'], 0],
  ['Pure water boils at ___ °C.', ['100', '0', '110'], 0],
  ['Pure water freezes at ___ °C.', ['0', '100', '10'], 0],
];
function clozeQuestion(subj = 'math') {
  const sci = subj === 'sci'; const [t, opts, a] = R.pick(sci ? SCLOZE : CLOZE); const o = R.shuffle(opts);
  return G(mcq({ t: sci ? 10 : 6, sk: sci ? 'swords' : 'words', q: t.replace('___', '<b>_____</b>'), why: `Answer: ${opts[a]}` }, o, o.indexOf(opts[a])));
}

if (typeof module !== 'undefined') module.exports = Object.assign(module.exports || {}, { WORDS, glossify, wordQuestion, clozeQuestion, WORD_RE, wordsOf, particles });
