// ===== Candy Math: practice generators that clone the worksheet questions =====
// Every template copies a real worksheet question (wording, characters, answer format); only the numbers change.
// `like` names the worksheet question it is modelled on. `vi` = [cho biết, hỏi] for the "Đề hỏi gì?" help.
const NAMES = ['Samira', 'Eva', 'Rajiv', 'Lily', 'Anastasia', 'Naomi', 'Oliver', 'Youssef', 'Carlos', 'Safia', 'Jamila', 'Gabriella', 'Angelique', 'Chen', 'Mia', 'Hassan', 'Yuri', 'Ahmed', 'Pierre', 'Mike'];
const who = () => R.pick(NAMES);
const two = () => { const a = R.shuffle(NAMES); return [a[0], a[1]]; };
const V = (like, o) => G(Object.assign({ src: 'Like ' + like }, o));
const fr = (n, d) => fx(n + '/' + d);
const TF = ['True', 'False'];
const SYM = ['<', '=', '>'];
const cmp = (a, b) => (a > b + 1e-9 ? '>' : a < b - 1e-9 ? '<' : '=');
function bruteUnique(test, lo, hi) { const ok = []; for (let x = lo; x <= hi; x++) if (test(x)) ok.push(x); return ok; }

const TPL = {
  // ---------------- Revision 1 ----------------
  x10: [
    () => { // R1 Q1
      const rows = []; const ops = R.shuffle([['÷', 10], ['÷', 1000], ['×', 100], ['÷', 100], ['×', 10]]);
      ops.forEach(([op, p]) => {
        const n = op === '÷' ? (p === 1000 ? R.int(101, 999) * 100 + R.pick([0, 700, 300]) : R.int(101, 9999)) : R.pick([R.int(11, 999), R.int(1001, 4999)]);
        const right = round6(op === '÷' ? n / p : n * p); const ok = R.int(0, 2) > 0 ? !(R.int(0, 1)) : true;
        const shown = ok ? right : round6(R.pick([right * 10, right / 10]));
        rows.push({ t: `${nf(n)} ${op} ${nf(p)} = ${nf(shown)} {}`, ch: TF, a: [same(shown, right) ? 'True' : 'False'] });
      });
      return V('Revision 1 · Q1', rowq({ t: 1, sk: 'x10', q: 'Which statements are true? Which are false?', vi: ['5 phép nhân, chia với 10, 100, 1000.', 'Mỗi phép tính đúng (True) hay sai (False)?'] }, rows));
    },
    () => { // R1 Q3
      const a = R.pick([200, 300, 400, 500, 250, 120]); const k = R.pick([2, 4, 5, 10]); const m = R.pick([10, 100].filter((x) => a % x === 0));
      return V('Revision 1 · Q3', inq({ t: 1, sk: 'x10', q: 'Complete the blanks.', vi: ['', `${a} nhân mấy thì được ${a * k}? ${a} bằng mấy nhân ${m}?`] }, [[`${a} ×`, k, `= ${nf(a * k)}`], [`${a} =`, a / m, `× ${m}`]]));
    },
    () => { // R1 Q13
      const x = R.int(11, 99) / 10, y = R.int(1001, 9999);
      return V('Revision 1 · Q13', inq({ t: 1, sk: 'x10', q: 'Calculate.', vi: ['', `Tính ${nf(x)} ÷ 10 và ${nf(y)} ÷ 100.`] }, [[`${nf(x)} ÷ 10 =`, round6(x / 10), ''], [`${nf(y)} ÷ 100 =`, round6(y / 100), '']]));
    },
    () => { // R1 Q12
      const p = R.pick([10, 100, 1000]); const v = R.pick([10, 100, 1000, R.int(2, 99) * 10]); const N = v * p;
      return V('Revision 1 · Q12', inq({ t: 1, sk: 'x10', q: 'Write the correct number in the box.', vi: ['', `Số nào nhân ${nf(p)} thì được ${nf(N)}?`] }, [['', v, `× ${nf(p)} = ${nf(N)}`]]));
    },
    () => { // R1 Q24
      const a = R.int(12, 89), p = R.pick([100, 1000]), q = R.pick([10, 100].filter((x) => x < p));
      const b = R.int(1001, 9999) / 100;
      return V('Revision 1 · Q24', inq({ t: 1, sk: 'x10', q: 'Write the correct number in each box to complete each statement.', why: `${a} × ${p} ÷ ${q} × ${q} = ${nf(a * p)}. ${nf(b)} × 100 ÷ 10 = ${nf(b * 10)} = ${nf(b * 1000)} ÷ 100`, vi: ['Hai phép tính có ô trống.', 'Điền số để hai bên bằng nhau.'] }, [[`${a} × ${nf(p)} ÷ ${q} ×`, q, `= ${nf(a * p)}`], [`${nf(b)} × 100 ÷ 10 =`, round6(b * 1000), '÷ 100']]));
    },
    () => { // R1 Q15
      const x = R.int(11, 99) / 100, p = R.pick([10, 100]); const n = who();
      return V('Revision 1 · Q15', inq({ t: 1, sk: 'x10', q: `${n} uses counters to show the number ${nf(x)} on a place value chart. ${n} multiplies ${nf(x)} by ${p}. What number does the chart show now?`, vi: [`${n} có số ${nf(x)} và nhân với ${p}.`, 'Kết quả là bao nhiêu?'] }, [[`${nf(x)} × ${p} =`, round6(x * p), '']]));
    },
  ],
  round: [
    () => { // R1 Q2
      const n = R.int(2, 30); const opts = [-0.7, -0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((d) => round6(n + d));
      const a = opts.map((x, i) => (Math.floor(x + 0.5 + 1e-9) === n ? i : -1)).filter((i) => i >= 0);
      return V('Revision 1 · Q2', mul({ t: 1, sk: 'round', q: `Which numbers round to ${n}? Tick all of them.`, vi: ['7 số thập phân.', `Số nào làm tròn đến số nguyên gần nhất thì được ${n}?`] }, opts.map(nf), a));
    },
    () => { // R1 Q11
      const a = R.int(10, 90), b = R.int(1, 4), c = R.int(10, 90), d = R.int(10, 90);
      return V('Revision 1 · Q11', inq({ t: 1, sk: 'round', q: 'Write a number in each box to make each sentence correct.', vi: ['4 câu về làm tròn đến số nguyên gần nhất.', 'Điền số vào mỗi ô cho đúng.'] }, [
        [`${a}.${b} rounded to the nearest whole number is`, a, ''],
        [`${c}.`, (p) => isInt(p) && p.v >= 5 && p.v <= 9 && p.raw.length === 1, `rounded to the nearest whole number is ${c + 1}`, '7'],
        [`${d}.5 rounded to the nearest whole number is`, d + 1, ''],
        ['0.', (p) => isInt(p) && p.v >= 0 && p.v <= 4 && p.raw.length === 1, 'rounded to the nearest whole number is 0', '2'],
      ]));
    },
    () => { // R1 Q19 / Q20
      const n = R.int(10, 99); const big = R.int(0, 1) === 1;
      return V(`Revision 1 · Q${big ? 19 : 20}`, inq({ t: 1, sk: 'round', q: `What is the ${big ? 'largest' : 'smallest'} decimal number with 2 decimal places that gives ${n} when rounded to the nearest whole number?`, why: big ? `${n}.49 rounds down to ${n}. ${n}.50 would round up to ${n + 1}.` : `${n - 1}.50 rounds up to ${n}. ${n - 1}.49 would round down to ${n - 1}.`, vi: [`Số có 2 chữ số sau dấu phẩy, làm tròn thì được ${n}.`, `Số ${big ? 'LỚN' : 'NHỎ'} NHẤT như vậy là bao nhiêu?`] }, [['', big ? round6(n + 0.49) : n - 0.5, '', big ? `${n}.49` : `${n - 1}.50`]]));
    },
    () => { // R1 Q7
      const n = R.int(3, 40); const p = who();
      return V('Revision 1 · Q7', inq({ t: 1, sk: 'round', q: `${p} chooses a number with 1 decimal place. The number rounds to ${n} when rounded to the nearest whole number. Write a number that ${p} could choose.`, why: `Any number from ${n - 1}.5 to ${n}.4 works.`, vi: [`Số của ${p} có 1 chữ số sau dấu phẩy. Làm tròn đến số nguyên thì được ${n}.`, `Viết 1 số ${p} có thể chọn.`] }, [['', (x) => !!x && x.dp === 1 && x.v >= n - 0.5 - 1e-9 && x.v < n + 0.5 - 1e-9, '', `${n}.2`]]));
    },
    () => { // R1 Q17
      const n = R.int(5, 60);
      return V('Revision 1 · Q17', inq({ t: 1, sk: 'round', q: `What is the smallest number with 1 decimal place that gives ${n} when rounded to the nearest whole number?`, vi: [`Số có 1 chữ số sau dấu phẩy, làm tròn thì được ${n}.`, 'Số NHỎ NHẤT như vậy là bao nhiêu?'] }, [['', n - 0.5, '']]));
    },
    () => { // R1 Q18
      const L = ['A', 'B', 'C', 'D', 'E']; const target = R.int(2, 9); const opts = []; const a = [];
      L.forEach((l, i) => { const x = round6(target - 0.7 + R.int(0, 13) / 10); const r = Math.floor(x + 0.5 + 1e-9); const shown = R.int(0, 1) ? r : target; opts.push(`${l}: ${nf(x)} cm → ${shown} cm`); if (shown !== r) a.push(i); });
      if (!a.length) return TPL.round[5]();
      return V('Revision 1 · Q18', mul({ t: 1, sk: 'round', q: `${who()} rounds some measurements to the nearest centimetre. Tick all the answers that are wrong.`, vi: ['Một bạn làm tròn các số đo đến cm gần nhất. Có câu bạn ấy làm sai.', 'Chọn những câu làm SAI.'] }, opts, a));
    },
    () => { // R1 Q25
      const x = round6(R.int(100, 999) + R.int(1, 9) / 10);
      return V('Revision 1 · Q25', inq({ t: 1, sk: 'round', q: `Round ${nf(x)} to the nearest whole number.`, vi: ['', `Làm tròn ${nf(x)} đến số nguyên gần nhất.`] }, [['', Math.floor(x + 0.5 + 1e-9), '']]));
    },
  ],
  roundbig: [
    () => { // R1 Q26
      const A = R.int(1, 8), B = R.int(5, 9), C = B - 1; const T = A * 1e6 + B * 1e5;
      const perms = [[B, C, 0], [B, 0, C], [C, B, 0], [C, 0, B], [0, B, C], [0, C, B]];
      const nums = R.shuffle(perms).slice(0, 5).map(([x, y, z]) => A * 1e6 + x * 1e5 + y * 1e4 + z * 1e3);
      const a = nums.map((x, i) => (Math.floor(x / 1e5 + 0.5) * 1e5 === T ? i : -1)).filter((i) => i >= 0);
      if (!a.length) return TPL.roundbig[0]();
      return V('Revision 1 · Q26', mul({ t: 1, sk: 'roundbig', q: `Draw a ring around all the numbers that round to ${nf(T)} when rounded to the nearest 100 000.`, why: 'Look at the ten-thousands digit: 5 or more rounds up.', vi: ['5 số lớn.', `Số nào làm tròn đến hàng trăm nghìn thì được ${nf(T)}? (có thể nhiều số)`] }, nums.map(nf), a));
    },
    () => { // R1 Q14
      const n = R.int(10, 98) * 1000 + R.int(1, 9) * 10 + R.int(0, 9) + R.pick([0, 500, 400, 600]);
      const r = (to) => Math.floor(n / to + 0.5) * to;
      return V('Revision 1 · Q14', inq({ t: 1, sk: 'roundbig', q: `Round ${nf(n)} to the nearest 100, to the nearest 1000 and to the nearest 10 000.`, vi: ['', `Làm tròn ${nf(n)} đến hàng trăm, hàng nghìn và hàng chục nghìn.`] }, [['nearest 100:', r(100), ''], ['nearest 1000:', r(1000), ''], ['nearest 10 000:', r(10000), '']]));
    },
  ],
  pv: [
    () => { // R1 Q6
      const a = R.int(1, 9), b = R.int(1, 9), c = R.int(1, 9);
      return V('Revision 1 · Q6', inq({ t: 1, sk: 'pv', q: 'Write a decimal number in each blank.', vi: ['Các hàng: đơn vị, chục, phần mười, phần trăm.', 'Ghép lại thành số thập phân.'] }, [
        [`${a} ones ${b} tenths ${c} hundredths =`, round6(a + b / 10 + c / 100), ''], [`${a} tens ${b} ones ${c} tenths =`, round6(a * 10 + b + c / 10), ''], [`${a} tens ${b} tenths ${c} hundredths =`, round6(a * 10 + b / 10 + c / 100), '']]));
    },
    () => { // R1 Q5
      const w = R.int(1, 20), t = R.int(1, 9), h2 = R.int(1, 9);
      return V('Revision 1 · Q5', inq({ t: 1, sk: 'pv', q: `Write a decimal number between ${w} and ${w + 1} which has exactly ${t} tenths and ${h2} hundredths.`, vi: [`Số nằm giữa ${w} và ${w + 1}, có ${t} phần mười và ${h2} phần trăm.`, 'Viết số thập phân đó.'] }, [['', round6(w + t / 10 + h2 / 100), '']]));
    },
    () => { // R1 Q22
      const a = R.int(1, 9), c = R.int(1, 9), d = R.int(1, 9); const v = `${a}0.${c}${d}`;
      const o = [`${a} + 0 + 0.${c} + 0.${d}`, `${a}0 + 0 + 0.${c} + 0.${d}`, `${a} + 0 + 0.${c} + 0.0${d}`, `${a}0 + 0 + 0.${c} + 0.0${d}`];
      return V('Revision 1 · Q22', mcq({ t: 1, sk: 'pv', q: `Draw a ring around the statement that is equivalent to ${v}`, vi: ['4 cách tách số.', `Cách nào bằng ${v}?`] }, o, 3));
    },
    () => { // R1 Q23
      const d = R.int(1, 9); const others = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== d));
      const nums = [`${others[0]}${d}${others[1]}.${others[2]}`, `${others[3]}${others[4]}${d}.${others[5]}${others[6]}`, `${others[7]}${others[0]}.${d}${others[1]}`, `${others[2]}.${others[3]}${d}`];
      const places = ['tens', 'ones', 'tenths', 'hundredths']; const want = R.int(0, 3);
      return V('Revision 1 · Q23', mcq({ t: 1, sk: 'pv', q: `Here are some numbers. Draw a ring around the number where the digit ${d} represents ${d} ${places[want]}.`, vi: ['4 số thập phân.', `Ở số nào, chữ số ${d} nằm ở hàng ${['chục', 'đơn vị', 'phần mười', 'phần trăm'][want]}?`] }, nums, want));
    },
    () => { // R1 Q4
      const a = R.int(2, 8), b = R.int(1, 9), c = R.int(1, 9), d = R.int(1, 9); const T = `${a}${b}.${c}${d}`;
      const last0 = `0.${c - 1}${d}`.replace(/^0\.0/, '0.0'), last1 = `${1 + (c - 1) / 10 + d / 100}`;
      const o = [`${a}0 + ${b}.1 + ${nf(round6((c - 1) / 10 + d / 100))}`, `${a}0 + 1${b}.1 + ${nf(round6(1 + (c - 1) / 10 + d / 100))}`, `${a - 1}0 + ${b}.1 + ${nf(round6(1 + (c - 1) / 10 + d / 100))}`, `${a - 1}0 + 1${b}.1 + ${nf(round6((c - 1) / 10 + d / 100))}`];
      void last0; void last1;
      const val = (s) => round6(s.split(' + ').reduce((x, y) => x + parseFloat(y), 0)); const ans = o.map((s, i) => (same(val(s), +T) ? i : -1)).filter((i) => i >= 0);
      return V('Revision 1 · Q4', mul({ t: 1, sk: 'pv', q: `Which statements could be regrouped as ${T}? Tick all of them.`, vi: ['4 cách tách số.', `Cách nào cộng lại bằng đúng ${T}?`] }, o, ans));
    },
    () => { // R1 Q8
      const h2 = R.int(1, 9), o = R.int(1, 9); const n = who();
      return V('Revision 1 · Q8', inq({ t: 1, sk: 'pv', q: `${n} is thinking of a number between −10 and 0. It has ${h2} hundredths and no tenths. The ones digit is ${o}. Write down ${n}'s number as a decimal.`, vi: [`Số nằm giữa −10 và 0, nên là số ÂM. Có ${h2} phần trăm, 0 phần mười, hàng đơn vị là ${o}.`, 'Viết số đó.'] }, [['', -round6(o + h2 / 100), '']]));
    },
    () => { // R1 Q10
      const t = R.int(1, 9) * 10, o = R.int(1, 9), te = R.int(1, 9), hu = R.int(1, 9); const T = round6(t + o + te / 10 + hu / 100);
      const tbl = ['0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '20', '30', '40', '50', '60', '70', '80', '90'];
      return V('Revision 1 · Q10', mul({ t: 1, sk: 'pv', cols: 9, exact: 4, q: `Draw a ring around four numbers that have a total of ${nf(T)}`, vi: ['Một bảng số.', `Chọn đúng 4 số cộng lại bằng ${nf(T)}.`] }, tbl, [tbl.indexOf(String(t)), tbl.indexOf(String(o)), tbl.indexOf(nf(te / 10)), tbl.indexOf(nf(hu / 100))]));
    },
  ],
  order: [
    () => { // R1 Q16 / Q27
      const ds = R.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3); const all = []; ds.forEach((x) => ds.forEach((y) => { if (x !== y) all.push(`${x}.${y}`); }));
      const items = R.shuffle(all).slice(0, 5);
      return V('Revision 1 · Q16', ordq({ t: 1, sk: 'order', q: 'Write the numbers in order from smallest to largest.', vi: ['5 số thập phân.', 'Xếp từ BÉ đến LỚN.'] }, items));
    },
  ],
  logic1: [
    () => { // R1 Q21
      const th = R.int(1, 7), on = R.int(1, 9); const rest = R.int(1, 6); const S = th + on + rest; const n = who();
      const ok = (x) => { const s = String(x); return s.length === 4 && +s[0] === th && +s[3] === on && [...s].reduce((a, b) => a + +b, 0) === S; };
      const ex = `${th}${rest}0${on}`;
      return V('Revision 1 · Q21', inq({ t: 1, sk: 'logic1', q: `${n} thinks of a 4-digit number. "My number has ${on} ones and ${th} thousands. The sum of the 4 digits is ${S}."<br>(a) Write a number that ${n} could be thinking of.<br>(b) ${n} multiplies the number by 10 to make a new number. Write the number of tens the new number has.`, why: `The hundreds and tens digits add to ${rest}. × 10 means the number of tens is the old number.`, vi: [`Số có 4 chữ số: hàng nghìn là ${th}, hàng đơn vị là ${on}, tổng 4 chữ số là ${S}.`, '(a) Viết 1 số như vậy. (b) Nhân với 10 thì số mới có bao nhiêu CHỤC?'], check: (ps) => isInt(ps[0]) && isInt(ps[1]) && ok(ps[0].v) && ps[1].v === ps[0].v }, [['(a)', null, '', ex], ['(b)', null, 'tens', ex]]));
    },
    () => { // R1 Q9
      for (let tries = 0; tries < 40; tries++) {
        const R0 = R.int(1, 9) * 1000 + R.pick([1, 3, 5, 7, 9]) * 100; const big = R.int(0, 1) === 1;
        const ok = bruteUnique((x) => { const s = String(x); return s.length === 4 && [...s].every((c) => '13579'.includes(c)) && new Set(s).size === 4 && Math.floor(x / 100 + 0.5) * 100 === R0; }, R0 - 50, R0 + 49);
        if (!ok.length) continue;
        const ans = big ? ok[ok.length - 1] : ok[0]; const n = who();
        return V('Revision 1 · Q9', inq({ t: 1, sk: 'logic1', q: `${n} chooses a 4-digit number. The digits are all odd. The digits are all different. The number rounds to ${nf(R0)} when rounded to the nearest 100. Write the ${big ? 'largest' : 'smallest'} number that ${n} could choose.`, why: `Numbers that round to ${nf(R0)} go from ${nf(R0 - 50)} to ${nf(R0 + 49)}. Use only odd digits, all different.`, vi: [`Số có 4 chữ số, các chữ số đều LẺ và KHÁC nhau. Làm tròn đến hàng trăm thì được ${nf(R0)}.`, `Số ${big ? 'LỚN' : 'NHỎ'} NHẤT có thể là bao nhiêu?`] }, [['', ans, '']]));
      }
      return TPL.logic1[0]();
    },
  ],
  // ---------------- Revision 2 ----------------
  seq: [
    () => { // R2 Q3 / Q21
      const step = R.int(5, 12), a = R.int(2 * step + 1, 3 * step + 8); const t = [0, 1, 2, 3, 4].map((i) => a - i * step);
      return V('Revision 2 · Q3', inq({ t: 2, sk: 'seq', q: 'Here is a sequence. The sequence continues in the same way. Write the correct number in each box.', why: `The step is −${step}.`, vi: [`Dãy ${t.slice(0, 3).join(', ')} … và cứ tiếp tục như vậy.`, 'Tìm 2 số tiếp theo.'] }, [[`${t.slice(0, 3).map(nf).join(', ')},`, t[3], ','], ['', t[4], '']]));
    },
    () => { // R2 Q2
      const step = R.pick([20, 25, 50, 100, 30, 40]); const t = [-1, 0, 1, 2, 3].map((i) => i * step);
      return V('Revision 2 · Q2', inq({ t: 2, sk: 'seq', q: 'Here is part of a sequence. The sequence continues in the same way. Write the missing numbers in the boxes.', vi: [`Dãy ?, 0, ${step}, ${2 * step}, ? và cứ tiếp tục như vậy.`, 'Tìm số đầu và số cuối.'] }, [['', t[0], `, 0, ${step}, ${2 * step},`], ['', t[4], '']]));
    },
    () => { // R2 Q16 / Q24
      const step = R.int(4, 12), a = R.int(-9, 9); const t = [0, 1, 2, 3, 4].map((i) => a + i * step);
      return V('Revision 2 · Q24', inq({ t: 2, sk: 'seq', q: `Here is part of a sequence. The sequence is made by adding a number to the previous term. The same number is added each time. Fill the gaps and write the term that comes after ${nf(t[3])}.`, why: `${nf(t[0])} to ${nf(t[3])} is 3 steps: ${t[3] - t[0]} ÷ 3 = ${step}.`, vi: [`Dãy ${nf(t[0])}, ?, ?, ${nf(t[3])}. Mỗi lần cộng cùng một số.`, `Điền 2 số còn thiếu và số đứng sau ${nf(t[3])}.`] }, [[`${nf(t[0])},`, t[1], ','], ['', t[2], `, ${nf(t[3])},`], ['', t[4], '']]));
    },
    () => { // R2 Q35
      const step = R.int(3, 15), a = R.int(1, 20);
      return V('Revision 2 · Q35', inq({ t: 2, sk: 'seq', q: `Here are the 1st and 5th terms in a sequence: ${a} … ${a + 4 * step}. The sequence has steps of constant size. Write the 6th term in the sequence.`, why: `1st to 5th is 4 steps: ${4 * step} ÷ 4 = ${step}.`, vi: [`Số thứ 1 là ${a}, số thứ 5 là ${a + 4 * step}. Các bước nhảy bằng nhau.`, 'Số thứ 6 là bao nhiêu?'] }, [['', a + 5 * step, '']]));
    },
    () => { // R2 Q32
      const s = R.int(6, 13), a = R.int(10, 40); let x = a; while (x < 100) x += s;
      return V('Revision 2 · Q32', inq({ t: 2, sk: 'seq', q: `Here is part of a sequence: ${a}, ${a + s}, ${a + 2 * s} … The sequence continues in the same way. Write the smallest 3-digit number in the sequence.`, vi: [`Dãy ${a}, ${a + s}, ${a + 2 * s} … (mỗi lần cộng ${s}).`, 'Số có 3 chữ số NHỎ NHẤT trong dãy là số mấy?'] }, [['', x, '']]));
    },
    () => { // R2 Q39
      const s = R.int(6, 13); let first3 = R.int(100, 100 + s - 1); let x = first3; while (x < 1000) x += s; const n = who();
      return V('Revision 2 · Q39', inq({ t: 2, sk: 'seq', q: `${n} counts on in steps of ${s}. The first 3-digit number ${n} says is ${first3}. Write the first 4-digit number ${n} says.`, vi: [`${n} đếm tiến, mỗi lần thêm ${s}. Số có 3 chữ số đầu tiên là ${first3}.`, 'Số có 4 chữ số đầu tiên là số mấy?'] }, [['', x, '']]));
    },
    () => { // R2 Q25
      const add2 = R.int(1, 4), m = R.int(2, 5), t1 = R.int(11, 59) / 10; const t2 = round6((t1 + add2) * m), t3 = round6((t2 + add2) * m); const n = who();
      return V('Revision 2 · Q25', inq({ t: 2, sk: 'seq', q: `Here is a rule for producing a number sequence: <b>Add ${add2} to the previous term and multiply the answer by ${m}</b>. ${n} follows this rule. The first term is ${nf(t1)}. Calculate the 3rd term.`, why: `2nd: (${nf(t1)} + ${add2}) × ${m} = ${nf(t2)}. 3rd: (${nf(t2)} + ${add2}) × ${m} = ${nf(t3)}`, vi: [`Quy luật: lấy số trước cộng ${add2}, rồi nhân với ${m}. Số thứ nhất là ${nf(t1)}.`, 'Tính số thứ 3.'] }, [['', t3, '']]));
    },
    () => { // R2 Q7
      const step = R.int(2, 6) / 2, a = R.int(14, 30) + 0.5; const t = [0, 1, 2, 3, 4].map((i) => round6(a - i * step)); const n = who();
      return V('Revision 2 · Q7', inq({ t: 2, sk: 'seq', q: `${n} makes a number sequence using number cards. The numbers on the cards decrease by the same amount each time. Write the missing numbers.`, why: `${nf(t[0])} to ${nf(t[3])} is 3 steps: ${nf(round6(t[0] - t[3]))} ÷ 3 = ${nf(step)}.`, vi: ['Các thẻ số giảm đều mỗi lần.', 'Tìm các số còn thiếu.'] }, [[`${nf(t[0])},`, t[1], ','], ['', t[2], `, ${nf(t[3])},`], ['', t[4], '']]));
    },
    () => { // R2 Q27
      const step = R.int(6, 15), last = R.int(-6, 9); const t = [5, 4, 3, 2, 1, 0].map((i) => last + i * step);
      return V('Revision 2 · Q27', inq({ t: 2, sk: 'seq', q: 'This sequence decreases by the same amount each time. Write a number in each box to complete this sequence.', vi: [`Dãy giảm đều: ?, ${t.slice(1, 5).join(', ')}, ?`, 'Tìm số đầu và số cuối.'] }, [['', t[0], `, ${t.slice(1, 5).map(nf).join(', ')},`], ['', t[5], '']]));
    },
    () => { // R2 Q37
      const step = R.int(3, 9), a = R.int(5, 30); const b = a + 5 * step;
      return V('Revision 2 · Q37', inq({ t: 2, sk: 'seq', q: `Here is part of a sequence: ${a}, ▢, ▢, ▢, ▢, ${b}. The sequence has steps of constant size and continues in the same way. Write the number that comes after ${b}.`, why: `${a} to ${b} is 5 steps: ${b - a} ÷ 5 = ${step}.`, vi: [`Dãy ${a}, ?, ?, ?, ?, ${b}. Các bước nhảy bằng nhau.`, `Số đứng sau ${b} là số mấy?`] }, [['', b + step, '']]));
    },
  ],
  neg: [
    () => { // R2 Q17
      const s = R.int(3, 9), a = R.int(10, 40); const out = []; let x = a; while (out.length < 2) { x -= s; if (x < 0) out.push(x); } const n = who();
      return V('Revision 2 · Q17', inq({ t: 2, sk: 'neg', q: `${n} counts back in ${s}s starting at ${a}. Write down the first two numbers less than 0 that ${n} will count.`, vi: [`${n} đếm lùi từ ${a}, mỗi lần bớt ${s}.`, 'Hai số ĐẦU TIÊN nhỏ hơn 0 là số mấy?'] }, [['', out[0], 'and'], ['', out[1], '']]));
    },
    () => { // R2 Q15
      for (let k = 0; k < 50; k++) {
        const [p, q2] = two(); const a = R.int(10, 25), s = R.int(3, 7), b = R.int(10, 25), t = R.int(3, 9); if (s === t) continue;
        const A = new Set(); for (let i = 0; i < 40; i++) A.add(a - i * s); let first = null; for (let i = 1; i < 40; i++) { const v = b - i * t; if (A.has(v) && v < Math.min(a, b)) { first = v; break; } }
        if (first === null || first > 5) continue;
        return V('Revision 2 · Q15', inq({ t: 2, sk: 'neg', q: `${p} counts back from ${a} in steps of ${s}. ${q2} counts back from ${b} in steps of ${t}. What is the first number that they both say?`, why: `${p}: ${[0, 1, 2, 3, 4].map((i) => nf(a - i * s)).join(', ')} … ${q2}: ${[0, 1, 2, 3].map((i) => nf(b - i * t)).join(', ')} …`, vi: [`${p} đếm lùi từ ${a}, mỗi lần bớt ${s}. ${q2} đếm lùi từ ${b}, mỗi lần bớt ${t}.`, 'Số ĐẦU TIÊN cả hai cùng đọc là số mấy?'] }, [['', first, '']]));
      }
      return TPL.neg[0]();
    },
    () => { // R2 Q22
      const s = R.int(3, 5), a = R.int(12, 30), L = R.int(8, 12); const said = []; for (let x = a; x > -L; x -= s) if (x < 0 && x > -L) said.push(x); const n = who();
      if (said.length < 2) return TPL.neg[0]();
      return V('Revision 2 · Q22', inq({ t: 2, sk: 'neg', q: `${n} counts back in ${s}s starting at ${a}. Write down two numbers between 0 and −${L} that ${n} will count.`, why: said.map(nf).join(', '), vi: [`${n} đếm lùi từ ${a}, mỗi lần bớt ${s}.`, `Viết 2 số nằm giữa 0 và −${L} mà bạn ấy đọc.`], check: (ps) => ps.every((p) => isInt(p) && said.includes(p.v)) && ps[0].v !== ps[1].v }, [['', null, 'and', String(said[0])], ['', null, '', String(said[1])]]));
    },
    () => { // R2 Q36 (i)
      const s = R.int(6, 9), a = R.int(80, 120); let x = a; while (x >= 0) x -= s; const n = who();
      return V('Revision 2 · Q36', inq({ t: 2, sk: 'neg', q: `${n} counts back from ${a} in steps of ${s}. Write the first negative number that ${n} says.`, vi: [`${n} đếm lùi từ ${a}, mỗi lần bớt ${s}.`, 'Số âm đầu tiên là số mấy?'] }, [['', x, '']]));
    },
  ],
  tri: [
    () => { // R2 Q29
      const k = R.int(3, 6), n = R.int(6, 10); const p = who();
      return V('Revision 2 · Q29', inq({ t: 2, sk: 'tri', fig: triPatterns([1, 2, 3]), q: `${p} builds shapes with tiles. The number of tiles in each shape makes a number sequence: 1 tile, 3 tiles, 6 tiles …<br>(a) How many tiles does ${p} add to the ${k}th shape to make the ${k + 1}th shape?<br>(b) How many tiles are in the ${n}th shape?`, why: `(a) the new row has ${k + 1} tiles. (b) 1 + 2 + … + ${n} = ${triNum(n)}`, vi: ['Hình 1 có 1 viên, hình 2 có 3 viên, hình 3 có 6 viên.', `(a) Từ hình ${k} sang hình ${k + 1} thêm mấy viên? (b) Hình thứ ${n} có bao nhiêu viên?`] }, [['(a)', k + 1, 'tiles'], ['(b)', triNum(n), 'tiles']]));
    },
    () => { // R2 Q30
      const n = R.int(5, 10); const p = who();
      return V('Revision 2 · Q30', inq({ t: 2, sk: 'tri', q: `${p} uses bricks to make steps. ${p} uses 1 brick for the 1st step, 3 bricks for the 2nd step and 6 bricks for the 3rd step. ${p} continues making steps in the same way. How many bricks will ${p} use for the ${n}th step?`, why: `1, 3, 6, 10, 15, 21, 28, 36, 45, 55`, vi: ['Bậc 1 dùng 1 viên, bậc 2 dùng 3 viên, bậc 3 dùng 6 viên.', `Bậc thứ ${n} cần bao nhiêu viên?`] }, [['', triNum(n), 'bricks']]));
    },
    () => { // R2 Q1 / Q26
      const n = R.int(4, 7);
      return V('Revision 2 · Q26', inq({ t: 2, sk: 'tri', fig: triPatterns([1, 2, 3], R.pick(['center', 'left'])), q: `Here is the spatial pattern for the first three triangular numbers. How many dots does the ${n}th triangular number have?`, vi: ['Hình chấm của 3 số tam giác đầu tiên: 1, 3, 6.', `Số tam giác thứ ${n} có bao nhiêu chấm?`] }, [['', triNum(n), 'dots']]));
    },
    () => { // R2 Q5
      const k = R.int(1, 4); const shown = [0, 1, 2, 3].map((i) => triNum(k + i));
      return V('Revision 2 · Q5', inq({ t: 2, sk: 'tri', q: 'Find the missing terms in the sequence.', vi: [`Dãy ${shown.join(', ')} …`, 'Tìm 3 số tiếp theo.'] }, [[`${shown.join(', ')},`, triNum(k + 4), ','], ['', triNum(k + 5), ','], ['', triNum(k + 6), '']]));
    },
  ],
  sq: [
    () => { // R2 Q13 / Q23
      const n = R.int(4, 12), sub = R.int(5, 40); const p = who();
      return V('Revision 2 · Q23', inq({ t: 2, sk: 'sq', q: `${p} thinks of a number. ${p} squares the number and subtracts ${sub}. The answer is ${n * n - sub}. Write the number ${p} thinks of.`, why: `${n * n - sub} + ${sub} = ${n * n} = ${n} × ${n}`, vi: [`${p} lấy số của mình nhân với chính nó, rồi trừ ${sub}, được ${n * n - sub}.`, 'Số đó là số mấy?'] }, [['', n, '']]));
    },
    () => { // R2 Q33
      const n = R.int(3, 12);
      return V('Revision 2 · Q33', inq({ t: 2, sk: 'sq', q: 'Write a number in the box to make the statement correct.', vi: ['▢² nghĩa là ▢ × ▢.', `Số nào nhân với chính nó thì được ${n * n}?`] }, [['', n, `² = ${n * n}`]]));
    },
    () => { // R2 Q40
      const dims = R.shuffle([[2, 2], [3, 3], [4, 4], [3, 2], [4, 3], [2, 4], [5, 2], [3, 4]]).slice(0, 5);
      if (!dims.some(([c, r]) => c === r)) dims[0] = [3, 3];
      return V('Revision 2 · Q40', mul({ t: 2, sk: 'sq', q: 'Draw a ring around each pattern that represents a square number.', vi: ['5 hình xếp chấm.', 'Hình nào xếp thành hình VUÔNG (số chính phương)?'] }, dims.map(([c, r]) => dotArray(c, r)), dims.map(([c, r], i) => (c === r ? i : -1)).filter((i) => i >= 0)));
    },
    () => { // R2 Q28a
      const ppl = R.shuffle(NAMES).slice(0, 4); const nums = R.shuffle([4, 16, 25, 36, 49, 64, 81, 100, 12, 15, 20, 24, 33, 40, 50]).slice(0, 4);
      if (!nums.some(isSquare)) nums[0] = 25;
      return V('Revision 2 · Q28', mul({ t: 2, sk: 'sq', q: 'Eva has 9 square tiles. She joins all her square tiles to make a large square. Tick the names of the children who can join all of their square tiles to make a large square.', vi: ['Eva có 9 viên gạch vuông, ghép được thành 1 hình vuông to (3 × 3).', 'Bạn nào cũng ghép HẾT gạch thành 1 hình vuông to được?'] }, ppl.map((p, i) => `${p}: ${nums[i]} tiles`), nums.map((x, i) => (isSquare(x) ? i : -1)).filter((i) => i >= 0)));
    },
    () => { // R2 Q34
      const sq = [1, 4, 9, 16, 25, 36, 49]; const sums = {}; sq.forEach((a, i) => sq.forEach((b, j) => { if (i < j) (sums[a + b] = sums[a + b] || []).push([a, b]); }));
      const uniq = Object.keys(sums).filter((k) => sums[k].length === 1 && +k > 10); const N = +R.pick(uniq); const [a, b] = sums[N][0]; const p = who();
      return V('Revision 2 · Q34', inq({ t: 2, sk: 'sq', q: `${p} arranges counters to show the spatial patterns for two different square numbers. ${p} uses a total of ${N} counters. Which two square numbers?`, why: `${a} + ${b} = ${N}`, vi: [`${p} dùng ${N} viên bi để xếp 2 hình vuông khác nhau.`, 'Đó là 2 số chính phương nào?'], check: (ps) => ps.every(isInt) && [ps[0].v, ps[1].v].sort((x, y) => x - y).join() === [a, b].join() }, [['', null, '+', String(b)], ['', null, `= ${N}`, String(a)]]));
    },
    () => { // R2 Q19
      const k = R.int(1, 5); const shown = [0, 1, 2, 3].map((i) => (k + i) ** 2);
      return V('Revision 2 · Q19', inq({ t: 2, sk: 'sq', q: 'Find the missing terms in the sequence.', vi: [`Dãy ${shown.join(', ')} …`, 'Tìm 3 số tiếp theo.'] }, [[`${shown.join(', ')},`, (k + 4) ** 2, ','], ['', (k + 5) ** 2, ','], ['', (k + 6) ** 2, '']]));
    },
  ],
  prime: [
    () => { // R2 Q20
      const a = R.int(10, 60), b = a + R.int(12, 18); const opts = []; for (let x = a + 1; x < b; x++) if (x % 2 === 1 && x % 5 !== 0) opts.push(x);
      const p = who(); const ans = opts.map((x, i) => (isPrime(x) ? i : -1)).filter((i) => i >= 0);
      if (!ans.length) return TPL.prime[0]();
      return V('Revision 2 · Q20', mul({ t: 2, sk: 'prime', q: `${p} writes a prime number in the box: ${a} < ▢ < ${b}. Tick all the prime numbers ${p} could write.`, vi: [`${p} viết một số nguyên tố lớn hơn ${a} và nhỏ hơn ${b}.`, 'Chọn TẤT CẢ các số có thể viết.'] }, opts.map(String), ans));
    },
    () => { // R2 Q38a
      for (let k = 0; k < 60; k++) {
        const s = R.int(10, 60); const ns = [0, 1, 2, 3, 4].map((i) => s + i); const pr = ns.filter(isPrime); if (pr.length !== 2) continue;
        const p = who();
        return V('Revision 2 · Q38', inq({ t: 2, sk: 'prime', q: `Here are some numbers: ${ns.join(', ')}. ${p} picks the two prime numbers and multiplies them together. Write ${p}'s answer.`, why: `${pr[0]} × ${pr[1]} = ${pr[0] * pr[1]}`, vi: [`Các số ${ns.join(', ')}. Lấy 2 số nguyên tố rồi NHÂN với nhau (không phải cộng).`, 'Kết quả là bao nhiêu?'] }, [['', pr[0] * pr[1], '']]));
      }
      return TPL.prime[0]();
    },
    () => { // R2 Q4b
      const ps = [5, 7, 11, 13, 17, 19, 29, 31, 37, 41, 43, 59, 61, 71, 73]; const N = 2 + R.pick(ps);
      return V('Revision 2 · Q4', inq({ t: 2, sk: 'prime', q: `Write two different prime numbers with a total of ${N}.`, why: `${N} is odd, so one prime must be 2: 2 + ${N - 2}.`, vi: ['', `Tìm 2 số nguyên tố KHÁC nhau, cộng lại bằng ${N}.`], check: (q) => q.every((p) => isInt(p) && isPrime(p.v)) && q[0].v !== q[1].v && q[0].v + q[1].v === N }, [['', null, '+', '2'], ['', null, `= ${N}`, String(N - 2)]]));
    },
    () => { // R2 Q4a
      const N = R.pick([31, 33, 35, 39, 41, 45, 49, 51, 55, 57]);
      let ex = null; for (let a = 3; a < N && !ex; a++) for (let b = a + 1; b < N && !ex; b++) { const c = N - a - b; if (c > b && isPrime(a) && isPrime(b) && isPrime(c)) ex = [a, b, c]; }
      return V('Revision 2 · Q4', inq({ t: 2, sk: 'prime', q: `Write three different prime numbers with a total of ${N}.`, why: `For example ${ex.join(' + ')} = ${N}.`, vi: ['', `Tìm 3 số nguyên tố KHÁC nhau, cộng lại bằng ${N}.`], check: (q) => q.every((p) => isInt(p) && isPrime(p.v)) && new Set(q.map((p) => p.v)).size === 3 && q.reduce((s, p) => s + p.v, 0) === N }, [['', null, '+', String(ex[0])], ['', null, '+', String(ex[1])], ['', null, `= ${N}`, String(ex[2])]]));
    },
    () => { // R2 Q10
      const n = R.pick([21, 27, 29, 31, 33, 37, 39, 41, 47, 49, 51, 53, 57, 59, 61, 63, 67, 69, 71, 77, 79, 87, 89, 91, 97]); const pr = isPrime(n);
      let f = 0; if (!pr) for (let i = 2; i < n; i++) if (n % i === 0) { f = i; break; }
      const o = [`Yes. ${n} has more than two factors.`, `No. ${n} is prime: its only factors are 1 and ${n}.`, `Yes, because ${n} is an odd number.`];
      return V('Revision 2 · Q10', mcq({ t: 2, sk: 'prime', q: `Is ${n} a composite number?`, why: pr ? `${n} only divides by 1 and ${n}.` : `${n} = ${f} × ${n / f}`, vi: ['', `${n} có phải là hợp số không?`] }, o, pr ? 1 : 0));
    },
  ],
  mult: [
    () => { // R2 Q18
      for (let k = 0; k < 30; k++) {
        const a = R.pick([2, 3, 4, 5, 6]), b = a * R.pick([4, 6, 8, 10, 12]); const ok = []; for (let x = a + 1; x < b; x++) if (x % a === 0 && b % x === 0) ok.push(x);
        if (!ok.length) continue;
        return V('Revision 2 · Q18', inq({ t: 2, sk: 'mult', q: `Write a multiple of ${a} greater than ${a} and less than ${b} that is also a factor of ${b}.`, why: `Possible answers: ${ok.join(', ')}`, vi: [`Số đó là bội của ${a}, lớn hơn ${a}, nhỏ hơn ${b}, và là ước của ${b}.`, 'Viết số đó.'] }, [['', ANY(...ok), '', String(ok[0])]]));
      }
      return TPL.mult[1]();
    },
    () => { // R2 Q9
      const [A, B] = R.pick([[5, 3], [5, 2], [3, 2], [4, 3], [5, 4], [3, 7]]); const p = who();
      const pick2 = (f) => { const out = []; while (out.length < 2) { const x = R.int(6, 120); if (f(x) && !out.includes(x)) out.push(x); } return out; };
      const c11 = pick2((x) => x % A === 0 && x % B === 0), c12 = pick2((x) => x % A !== 0 && x % B === 0), c21 = pick2((x) => x % A === 0 && x % B !== 0), c22 = pick2((x) => x % A !== 0 && x % B !== 0);
      const fits = (k, yes, no) => k > 1 && yes.every((x) => x % k === 0) && no.every((x) => x % k !== 0);
      return V('Revision 2 · Q9', inq({
        t: 2, sk: 'mult', fig: tableHtml(['', 'Multiples of ▢A', 'Not multiples of ▢A'], [['<b>Multiples of ▢B</b>', c11.join(', '), c12.join(', ')], ['<b>Not multiples of ▢B</b>', c21.join(', '), c22.join(', ')]]),
        q: `${p} sorts some numbers using a Carroll diagram. Fill in the boxes A and B.`, vi: ['Bảng phân loại: theo cột là "bội của A / không phải bội của A", theo hàng là "bội của B / không phải".', 'A và B là số mấy?'],
        check: (ps) => isInt(ps[0]) && isInt(ps[1]) && fits(ps[0].v, [...c11, ...c21], [...c12, ...c22]) && fits(ps[1].v, [...c11, ...c12], [...c21, ...c22]),
      }, [['A =', null, '', String(A)], ['B =', null, '', String(B)]]));
    },
    () => { // R2 Q11
      const [X, Y] = R.pick([[100, 25], [100, 20], [50, 10], [60, 15], [100, 30], [40, 6], [30, 4], [80, 20]]); const tr = X % Y === 0;
      const o = tr ? [`True, because ${X} = ${X / Y} × ${Y}.`, `False, because ${Y} is not a factor of ${X}.`, `False, because ${X} is not in the ${Y} times table.`] : [`True, because both are even.`, `False, because ${X} is not a multiple of ${Y}. ${X} itself is not in the ${Y} times table.`, `True, because ${X} = ${Y} × 2.`];
      return V('Revision 2 · Q11', mcq({ t: 2, sk: 'mult', q: `"Any multiple of ${X} is a multiple of ${Y}." Is this statement true or false?`, vi: [`Câu: "Mọi bội của ${X} đều là bội của ${Y}."`, 'Câu này đúng hay sai?'] }, o, tr ? 0 : 1));
    },
  ],
  // ---------------- Revision 3 ----------------
  negadd: [
    () => { // R3 Q7
      const a = R.int(2, 30), b = R.int(2, 40), c = R.int(2, 30), d = R.int(2, 40), e = R.int(2, 15), f = R.int(2, 20);
      return V('Revision 3 · Q7', rowq({ t: 3, sk: 'negadd', q: 'Here are three symbols: < , = , >. Write the correct symbol in each box.', why: `−${a} + ${b} = ${-a + b}, ${c} − ${d} = ${c - d}. −${e} + ${e} = 0, ${f + e} − ${e} = ${f}.`, vi: ['Hai cặp phép tính có số âm.', 'Điền <, = hoặc >.'] }, [{ t: `−${a} + ${b} {} ${c} − ${d}`, ch: SYM, a: [cmp(-a + b, c - d)] }, { t: `−${e} + ${e} {} ${f + e} − ${e}`, ch: SYM, a: [cmp(0, f)] }]));
    },
    () => { // R3 Q2
      const x = R.int(20, 99), y = R.int(1001, 1999); const T = x - y; const cards = R.shuffle([String(y + x * 10), String(x), nf(-y), nf(-x)]);
      const two0 = [cards.indexOf(String(x)), cards.indexOf(nf(-x))], twoT = [cards.indexOf(String(x)), cards.indexOf(nf(-y))];
      const part = R.int(0, 1);
      return V('Revision 3 · Q2', mul({ t: 3, sk: 'negadd', exact: 2, q: `Here are some number cards: ${cards.join(', ')}. Tick the <b>two</b> numbers with a total of ${part ? nf(T) : '0'}.`, vi: [`4 thẻ số: ${cards.join(', ')}.`, `Chọn 2 số cộng lại bằng ${part ? nf(T) : '0'}.`] }, cards, part ? twoT : two0));
    },
    () => { // R3 Q16
      const a = R.int(100, 900), b = R.int(2, 9); const c = a - 2 * b;
      return V('Revision 3 · Q16', rowq({ t: 3, sk: 'negadd', q: 'Write + or − in each box to make these statements correct.', why: `−${a} + ${b} = ${-a + b} = −${c} − ${b}. −${b} + ${a} = ${a - b} = ${a - 2 * b} + ${b}.`, vi: ['Hai phép tính có ô trống.', 'Điền + hoặc − cho đúng.'] }, [{ t: `−${a} {} ${b} = −${c} {} ${b}`, ch: ['+', '−'], a: ['+', '−'] }, { t: `−${b} {} ${a} = ${a - 2 * b} {} ${b}`, ch: ['+', '−'], a: ['+', '+'] }]));
    },
  ],
  decadd: [
    () => { // R3 Q31
      const a = R.int(400, 899) / 100, b = R.int(100, 399) / 100, c = R.int(100, 299) / 100, d = R.int(300, 699), e = R.int(100, 299), f = R.int(100, 299), g = R.int(100, 399) / 100, h2 = R.int(100, 399) / 100;
      return V('Revision 3 · Q31', inq({ t: 3, sk: 'decadd', q: 'Work out.', vi: ['', 'Tính 3 phép tính.'] }, [[`${nf(a)} − ${nf(b)} + ${nf(c)} =`, round6(a - b + c), ''], [`${d} − ${e} + ${f} =`, d - e + f, ''], [`${nf(g)} + ${nf(h2)} =`, round6(g + h2), '']]));
    },
    () => { // R3 Q19
      const a = R.int(2, 9), b = R.int(1, 9); const v = round6(a / 10 + b / 100);
      return V('Revision 3 · Q19', inq({ t: 3, sk: 'decadd', q: 'Write a different number in each box to complete the statements.', vi: ['', 'Tìm các số còn thiếu.'] }, [[`${nf(v)} = 0.${a} +`, round6(b / 100), ''], [`${nf(v)} = 0.${a - 1} +`, round6(v - (a - 1) / 10), '']]));
    },
    () => { // R3 Q11
      const N = R.int(3, 9); const x = round6(R.int(110, 290) / 100 + (N - 5)); const y = round6(N - x);
      const opts = R.shuffle([x, y, round6(x - 1), round6(y + 1 - 0.36), round6(N - x + 0.1)].map(nf)); const ans = [opts.indexOf(nf(x)), opts.indexOf(nf(y))];
      if (new Set(opts).size < 5 || ans.includes(-1) || x <= 0 || y <= 0) return TPL.decadd[0]();
      return V('Revision 3 · Q11', mul({ t: 3, sk: 'decadd', exact: 2, q: `Tick (✓) two numbers with a total of ${N}.`, vi: ['5 số thập phân.', `Chọn 2 số cộng lại bằng ${N}.`] }, opts, ans));
    },
    () => { // R3 Q6
      const a = R.int(100, 400) / 100, b = R.int(10, 99) / 100, c = R.int(100, 300) / 100, d = R.int(50, 150) / 100, e = R.int(30, 90) / 10, f = R.int(2, 9) / 10;
      const g = round6(e + 1), h2 = round6(f + 1);
      return V('Revision 3 · Q6', rowq({ t: 3, sk: 'decadd', q: 'Here is a list of symbols: < = >. Write one of the symbols in each box.', vi: ['Hai cặp phép tính với số thập phân.', 'Điền <, = hoặc >.'] }, [{ t: `${nf(a)} + ${nf(b)} {} ${nf(c)} + ${nf(d)}`, ch: SYM, a: [cmp(round6(a + b), round6(c + d))] }, { t: `${nf(e)} − ${nf(f)} {} ${nf(g)} − ${nf(h2)}`, ch: SYM, a: [cmp(round6(e - f), round6(g - h2))] }]));
    },
    () => { // R3 Q3
      const n = R.int(150, 499);
      return V('Revision 3 · Q3', inq({ t: 3, sk: 'decadd', q: `Write the smallest number that can be subtracted from ${n} to give a 2-digit answer.`, why: `The largest 2-digit number is 99: ${n} − 99 = ${n - 99}`, vi: [`Lấy ${n} trừ đi một số, kết quả phải có 2 chữ số.`, 'Số bị trừ NHỎ NHẤT là số mấy?'] }, [['', n - 99, '']]));
    },
    () => { // R3 Q8
      const a = R.int(10, 90), b = R.int(1, 9), c = R.int(1, 9);
      return V('Revision 3 · Q8', inq({ t: 3, sk: 'decadd', q: 'Complete the number statement.', vi: [`${a}.${b}${c} = ${a}.${b} + ?`, 'Tìm số còn thiếu.'] }, [[`${a}.${b}${c} = ${a}.${b} +`, round6(c / 100), '']]));
    },
    () => { // R3 Q9
      for (let k = 0; k < 200; k++) {
        const d = R.int(1, 9); const mk = () => { const pos = R.int(0, 2); const dg = [R.int(1, 9), R.int(0, 9), R.int(0, 9)]; dg[pos] = d; return { dg, pos }; };
        const A = mk(), B = mk(), C = mk(); const val = (o, x) => { const g = o.dg.slice(); g[o.pos] = x; return g[0] * 100 + g[1] * 10 + g[2]; };
        const S = val(A, d) + val(B, d) + val(C, d); const ss = String(S); if (ss.length !== 3 || !ss.includes(String(d))) continue;
        const sp = ss.indexOf(String(d));
        const sols = bruteUnique((x) => { if (A.pos === 0 && x === 0) return false; const s2 = val(A, x) + val(B, x) + val(C, x); const t = String(s2); return t.length === 3 && +t[sp] === x && t.split('').every((ch, i) => i === sp || ch === ss[i]); }, 0, 9);
        if (sols.length !== 1) continue;
        const show = (o) => o.dg.map((x, i) => (i === o.pos ? '▢' : x)).join(''); const sum = ss.split('').map((x, i) => (i === sp ? '▢' : x)).join('');
        const p = who();
        return V('Revision 3 · Q9', inq({ t: 3, sk: 'algebra', q: `${p} adds three 3-digit numbers together. Write the same digit in each box to make the calculation correct:<br><b>${show(A)} + ${show(B)} + ${show(C)} = ${sum}</b>`, why: `${val(A, d)} + ${val(B, d)} + ${val(C, d)} = ${S}`, vi: ['Các ô điền CÙNG một chữ số.', 'Chữ số đó là số mấy?'] }, [['▢ =', d, '']]));
      }
      return TPL.decadd[0]();
    },
  ],
  avg: [
    () => { // R3 Q26
      const n = 5; const v = []; for (let i = 0; i < n; i++) v.push(R.int(2, 12)); const m = R.pick(v); v[R.int(0, 4)] = m;
      const s = v.slice().sort((a, b) => a - b); const cnt = {}; v.forEach((x) => (cnt[x] = (cnt[x] || 0) + 1)); const mx = Math.max(...Object.values(cnt)); const modes = Object.keys(cnt).filter((k) => cnt[k] === mx);
      if (modes.length !== 1 || mx < 2) return TPL.avg[0]();
      const p = who();
      return V('Revision 3 · Q26', inq({ t: 3, sk: 'avg', q: `${p} and friends record the number of people they see on the way to school. Here is their data: ${v.join(', ')}. Write the correct number to complete each statement.`, why: `In order: ${s.join(', ')}`, vi: [`Số người gặp trên đường đi học: ${v.join(', ')}.`, 'Tìm median và mode.'] }, [['The median of the number of people is', s[2], '.'], ['The mode of the number of people is', +modes[0], '.']]));
    },
    () => { // R3 Q25
      const v = []; for (let i = 0; i < 7; i++) v.push(R.int(24, 36)); const s = v.slice().sort((a, b) => a - b); const p = who();
      return V('Revision 3 · Q25', inq({ t: 3, sk: 'avg', q: `${p} records the time it takes to run around the park each day, to the nearest minute: ${v.join(', ')}. Write ${p}'s median time.`, why: `In order: ${s.join(', ')}. The middle one is ${s[3]}.`, vi: [`Thời gian chạy trong 7 ngày: ${v.join(', ')}.`, 'Tìm median (số ở giữa sau khi xếp từ bé đến lớn).'] }, [['', s[3], 'minutes']]));
    },
    () => { // R3 Q27
      const names = ['Clover', 'Buttercup', 'Carrot top', 'Hoppy', 'Bouncer', 'Pogo', 'Dandelion', 'Thumper', 'Eric'];
      const mode = R.int(12, 18) * 5; const vals = [mode, mode, mode]; while (vals.length < 9) { const x = R.int(12, 18) * 5; if (x !== mode && vals.filter((y) => y === x).length < 2) vals.push(x); }
      const v = R.shuffle(vals);
      return V('Revision 3 · Q27', inq({ t: 3, sk: 'avg', fig: tableHtml(['Name of rabbit', 'Height jumped (cm)'], names.map((n, i) => [n, v[i]])), q: 'Rabbits take part in a high jump competition. Here are the results. What is the mode of the heights jumped?', vi: ['Bảng độ cao nhảy của 9 chú thỏ.', 'Tìm mode (số xuất hiện nhiều lần nhất).'] }, [['', mode, 'centimetres']]));
    },
    () => { // R3 Q29
      const ages = [R.int(2, 12), R.int(2, 12), R.int(2, 12), 0, 0]; const m = R.int(2, 12); ages[3] = m; ages[4] = m; const A = R.shuffle(ages);
      const cnt = {}; A.forEach((x) => (cnt[x] = (cnt[x] || 0) + 1)); const mx = Math.max(...Object.values(cnt)); const modes = Object.keys(cnt).filter((k) => cnt[k] === mx);
      if (modes.length !== 1) return TPL.avg[3]();
      const mass = R.shuffle([0, 0, 0, 0, 0].map(() => R.int(5, 30))); const ms = mass.slice().sort((a, b) => a - b);
      return V('Revision 3 · Q29', inq({ t: 3, sk: 'avg', fig: tableHtml(['Animal', 'A', 'B', 'C', 'D', 'E'], [['Age (years)', ...A], ['Mass (kg)', ...mass]]), q: 'Here is the age and mass of five animals.<br>(a) Write the mode of the animal ages.<br>(b) Write the median mass.', why: `Masses in order: ${ms.join(', ')}`, vi: ['Bảng tuổi và cân nặng của 5 con vật.', '(a) Mode của tuổi. (b) Median của cân nặng.'] }, [['(a)', +modes[0], 'years'], ['(b)', ms[2], 'kg']]));
    },
    () => { // R3 Q28a
      const v = []; while (v.length < 7) { const x = R.int(10, 20); if (!v.includes(x)) v.push(x); } const s = v.slice().sort((a, b) => a - b); const p = who();
      return V('Revision 3 · Q28', inq({ t: 3, sk: 'avg', q: `${p} does a quiz each week. Here are ${p}'s marks: ${v.join(', ')}. Write ${p}'s median mark.`, why: s.join(', '), vi: [`Điểm của ${p}: ${v.join(', ')}.`, 'Tìm median.'] }, [['', s[3], '']]));
    },
  ],
  money: [
    () => { // R3 Q4
      const n = R.pick([5, 10, 10, 20]), p = R.int(20, 45) + R.pick([0.5, 0.25, 0.75, 0]), q = R.int(3, 9) + R.pick([0.75, 0.25, 0.5]);
      const cost = round6(n * p + q); const have = round6(Math.ceil((cost + 20) / 10) * 10 + R.pick([0.5, 0, 0.25]));
      return V('Revision 3 · Q4', inq({ t: 3, sk: 'money', q: `A teacher has ${money(have)}. She buys ${n} bats and 1 ball. Bats cost ${money(p)} each. Balls cost ${money(q)} each. How much money does she have left?`, why: `${n} × ${money(p)} = ${money(n * p)}. ${money(n * p)} + ${money(q)} = ${money(cost)}. ${money(have)} − ${money(cost)} = ${money(have - cost)}`, vi: [`Cô có ${money(have)}. Cô mua ${n} cây gậy, mỗi cây ${money(p)}, và 1 quả bóng giá ${money(q)}.`, 'Cô còn lại bao nhiêu tiền?'] }, [['$', round6(have - cost), '', round6(have - cost).toFixed(2)]]));
    },
    () => { // R3 Q18
      const [a, b, c] = R.shuffle(NAMES).slice(0, 3); const x = R.int(1000, 2500) / 100, d1 = R.int(100, 400) / 100, d2 = R.int(100, 500) / 100;
      const m = round6(x + d1), o = round6(m - d2);
      return V('Revision 3 · Q18', inq({ t: 3, sk: 'money', q: `${a}, ${b} and ${c} each throw a ball. ${a}'s longest throw is ${nf(x)} metres. ${b}'s longest throw is ${nf(d1)} metres longer than ${a}'s. ${c}'s longest throw is ${nf(d2)} metres shorter than ${b}'s. Calculate the length of ${c}'s longest throw.`, why: `${b}: ${nf(x)} + ${nf(d1)} = ${nf(m)}. ${c}: ${nf(m)} − ${nf(d2)} = ${nf(o)}`, vi: [`${a} ném ${nf(x)} m. ${b} ném XA HƠN ${a} ${nf(d1)} m. ${c} ném NGẮN HƠN ${b} ${nf(d2)} m.`, `${c} ném xa bao nhiêu mét?`] }, [['', o, 'metres']]));
    },
    () => { // R3 Q1
      const f = R.int(4, 9), r = R.int(100, 160); const tot = f * r; const u = R.int(Math.floor(tot * 0.3), Math.floor(tot * 0.7)); const v = tot - u;
      const cards = R.shuffle([f, r, u, v].map(String)); if (new Set(cards).size < 4) return TPL.money[2]();
      return V('Revision 3 · Q1', rowq({ t: 3, sk: 'money', q: `Write these numbers in the boxes to complete the information: ${cards.join(', ')}.`, why: `${f} floors × ${r} rooms = ${tot} rooms = ${u} + ${v}`, vi: ['Khách sạn: số tầng × số phòng mỗi tầng = phòng đang dùng + phòng không dùng.', 'Đặt mỗi số vào đúng câu.'], check: (resp) => { const [F, Rr, U, Vv] = resp.map((x) => +x[0]); return new Set(resp.map((x) => x[0])).size === 4 && F < Rr && F * Rr === U + Vv; } }, [
        { t: 'There are {} floors in a hotel.', ch: cards, a: [String(f)] }, { t: 'Each floor has {} rooms.', ch: cards, a: [String(r)] }, { t: 'There are {} rooms in use.', ch: cards, a: [String(u)] }, { t: 'There are {} rooms not in use.', ch: cards, a: [String(v)] }]));
    },
  ],
  algebra: [
    () => { // R3 Q22
      const v = R.int(20, 200), k = R.int(2, 15);
      return V('Revision 3 · Q22', inq({ t: 3, sk: 'algebra', q: `★ represents a number. ★ + ${k} + ★ + ★ = ${3 * v + k}. Calculate the value of ★.`, why: `${3 * v + k} − ${k} = ${3 * v}, and ${3 * v} ÷ 3 = ${v}`, vi: [`★ + ${k} + ★ + ★ = ${3 * v + k}.`, '★ bằng bao nhiêu?'] }, [['★ =', v, '']]));
    },
    () => { // R3 Q33
      const p = R.int(4, 15), a = R.int(2, 4), b = a + R.int(1, 2);
      return V('Revision 3 · Q33', inq({ t: 3, sk: 'algebra', q: `The price of a bar of chocolate, in dollars, is represented by ■.<br>${Array(a).fill('■').join(' + ')} = $${a * p}<br>Write the value of ${Array(b).fill('■').join(' + ')}.`, why: `${a * p} ÷ ${a} = ${p}, and ${p} × ${b} = ${p * b}`, vi: [`Giá ${a} thanh sô-cô-la là $${a * p}.`, `${b} thanh giá bao nhiêu?`] }, [['$', p * b, '']]));
    },
    () => { // R3 Q21
      const T = R.pick([12, 14, 18, 20, 22, 26, 30, 34]); const b = T / 4;
      return V('Revision 3 · Q21', inq({ t: 3, sk: 'algebra', q: `▲ and ● represent the prices of two different hats. Complete each statement.<br>▲ + ▲ + ● = $${T}<br>● = ▲ + ▲`, why: `● is worth two ▲, so 4 ▲ = $${T} and ▲ = $${money(b).slice(1)}`, vi: [`▲ + ▲ + ● = $${T} và ● = ▲ + ▲.`, 'Mỗi loại mũ giá bao nhiêu?'] }, [['▲ = $', b, '', b.toFixed(2)], ['● = $', 2 * b, '']]));
    },
    () => { // R3 Q24
      const a = R.int(3, 12), lo = R.int(20, 40), c = R.int(3, 12); const L = lo - a, H = R.int(L + 3, L + 5); const d = H - c; const vals = bruteUnique((x) => x + a > lo && x - c < d, L - 1, H + 1);
      const opts = []; for (let x = L - 1; x <= H + 1; x++) opts.push(x);
      return V('Revision 3 · Q24', mul({ t: 3, sk: 'algebra', q: `A number is represented by ▲. ▲ + ${a} is greater than ${lo}. ▲ − ${c} is less than ${d}. Tick all the possible values of ▲.`, why: `▲ > ${lo - a} and ▲ < ${d + c}`, vi: [`▲ + ${a} lớn hơn ${lo}. ▲ − ${c} nhỏ hơn ${d}.`, 'Chọn TẤT CẢ các số ▲ có thể là.'] }, opts.map(String), vals.map((v) => opts.indexOf(v))));
    },
    () => { // R3 Q12
      const [a, b] = R.pick([[3, 2], [4, 3], [5, 4], [5, 3]]); const lo = 300, hi = 600;
      let ex = null; for (let x = lo + 1; x < hi && !ex; x++) { const y = (a * x) / b; if (Number.isInteger(y) && y > lo && y < hi && x % 5 === 0) ex = [x, y]; }
      if (!ex) return TPL.algebra[0]();
      return V('Revision 3 · Q12', inq({ t: 3, sk: 'algebra', q: `${a} identical boxes balance with ${b} identical cans. Each item has a mass between ${lo} and ${hi} grams. Write possible masses for the boxes and cans.`, why: `${a} × box = ${b} × can, for example ${a} × ${ex[0]} = ${b} × ${ex[1]}.`, vi: [`${a} hộp giống nhau nặng bằng ${b} lon giống nhau. Mỗi món nặng từ ${lo} g đến ${hi} g.`, 'Mỗi hộp và mỗi lon có thể nặng bao nhiêu?'], check: (ps) => ps.every((p) => !!p && p.v > lo && p.v < hi) && same(a * ps[0].v, b * ps[1].v) }, [['box =', null, 'g', String(ex[0])], ['can =', null, 'g', String(ex[1])]]));
    },
    () => { // R3 Q34
      const k = R.int(6, 20);
      return V('Revision 3 · Q34', inq({ t: 3, sk: 'algebra', q: `▲ represents the mass of a wooden box in kg. ● represents the mass of a tin in kg.<br>▲ + ▲ + ● + ● = ${2 * k} kg<br>Write a possible pair of values for ▲ and ●.`, why: `▲ + ● = ${k}`, vi: [`▲ + ▲ + ● + ● = ${2 * k} kg.`, 'Viết một cặp số ▲, ● có thể đúng.'], check: (ps) => ps.every((p) => !!p && p.v > 0) && same(ps[0].v + ps[1].v, k) }, [['▲ =', null, 'kg', String(k - 3)], ['● =', null, 'kg', '3']]));
    },
  ],
  oddeven: [
    () => { // R3 Q20
      const forms = [['■ + ■ + ★', 'odd', '■ + ■ is even, and even + odd is odd.'], ['■ + ★', 'even', 'odd + odd is always even.'], ['■ + ■ + ★ + ★', 'even', 'even + even is even.'], ['■ + ★ + ★', 'odd', '★ + ★ is even, and odd + even is odd.']];
      const [f, res, why] = R.pick(forms); const p = who(); const claimOdd = R.int(0, 1) === 1;
      const o = [`No. The answer is always ${res}.`, 'Yes. It depends which odd numbers you choose.', `No. The answer is always ${res === 'odd' ? 'even' : 'odd'}.`];
      return V('Revision 3 · Q20', mcq({ t: 3, sk: 'oddeven', q: `■ and ★ represent two different odd numbers. ${p} writes ${f}. ${p} says, "The answer could be odd or even." Is ${p} correct?`, why, vi: [`■ và ★ là 2 số LẺ khác nhau. ${p} nói ${f} có thể ra số lẻ hoặc chẵn.`, `${p} nói đúng không?`] }, o, 0)); void claimOdd;
    },
    () => { // R3 Q10
      const [p, q2] = two();
      return V('Revision 3 · Q10', inq({ t: 3, sk: 'oddeven', q: `${p} and ${q2} are adding numbers. ${p}: "When I add two numbers the answer is even." ${q2}: "I know that you added two even numbers." Write a digit in each box to make an addition that shows that ${q2} is wrong.`, why: 'Two odd numbers also make an even number, for example 3 + 5 = 8.', vi: [`${q2} nói: "Cộng 2 số ra số chẵn thì chắc chắn 2 số đó đều chẵn."`, `Viết một phép cộng chứng minh ${q2} nói SAI.`], check: (ps) => ps.every(isInt) && ps[0].v % 2 !== 0 && ps[1].v % 2 !== 0 && ps[0].v + ps[1].v === ps[2].v }, [['', null, '+', '3'], ['', null, '=', '5'], ['', null, '', '8']]));
    },
    () => { // R3 Q23
      const [p, q2] = two(); const y = R.int(21, 59) | 1; const tot = y + R.int(5, 15);
      return V('Revision 3 · Q23', inq({ t: 3, sk: 'oddeven', q: `${p} and ${q2} have some pencils. ${p} has more pencils than ${q2}. ${p} has an even number of pencils. ${q2} has ${y} pencils, and together they have more than ${tot}. Write two possible numbers of pencils for ${p}.`, why: `${p} has more than ${y} and an even number: ${y + 1}, ${y + 3} …`, vi: [`${p} có NHIỀU bút hơn ${q2}, và số bút của ${p} là số CHẴN. ${q2} có ${y} cây.`, `Viết 2 số bút ${p} có thể có.`], check: (ps) => ps.every((x) => isInt(x) && x.v > y && x.v % 2 === 0 && x.v + y > tot) && ps[0].v !== ps[1].v }, [['', null, 'or', String(y + 1 + (y + 1 + y > tot ? 0 : 10))], ['', null, '', String(y + 3 + (y + 1 + y > tot ? 0 : 10))]]));
    },
  ],
  // ---------------- Revision 4 ----------------
  tri2d: [
    () => { // R4 Q2
      const kinds = R.shuffle(['iso', 'iso', 'sca', 'sca', R.pick(['iso', 'sca'])]); const want = R.pick(['isosceles', 'scalene']);
      const make = (k) => { const ang = R.int(0, 359) * Math.PI / 180; let p; if (k === 'iso') { const w = R.int(25, 60), hgt = R.int(60, 95); p = [[0, -hgt / 2], [w / 2, hgt / 2], [-w / 2, hgt / 2]]; } else { p = [[-45, 30], [45, 40], [R.int(-30, 20), -45]]; } const rot = p.map(([x, y]) => [50 + x * Math.cos(ang) - y * Math.sin(ang), 50 + x * Math.sin(ang) + y * Math.cos(ang)]); return { p: rot, k: triKind(rot) }; };
      const tris = kinds.map(make); if (tris.some((t) => t.k === 'equilateral' || t.k === 'line')) return TPL.tri2d[0]();
      return V('Revision 4 · Q2', mul({ t: 4, sk: 'tri2d', q: `Tick (✓) all the ${want} triangles.`, why: want === 'isosceles' ? 'An isosceles triangle has two equal sides.' : 'A scalene triangle has three different sides.', vi: ['5 hình tam giác.', `Chọn TẤT CẢ tam giác ${want === 'isosceles' ? 'CÂN (2 cạnh bằng nhau)' : 'THƯỜNG (3 cạnh khác nhau)'}.`] }, tris.map((t) => triangleFig(t.p)), tris.map((t, i) => (t.k === want ? i : -1)).filter((i) => i >= 0)));
    },
    () => { // R4 Q3
      const C = circle12(); const want = R.pick(['equilateral', 'scalene', 'isosceles']); const ex = { equilateral: [1, 5, 9], scalene: [0, 3, 7], isosceles: [0, 3, 9] }[want];
      return V('Revision 4 · Q3', dotsq({ t: 4, sk: 'tri2d', pts: C, ring: true, need: 3, q: `Here is a circle with 12 equally spaced points marked. Draw ${want === 'isosceles' ? 'an' : want === 'equilateral' ? 'an' : 'a'} ${want} triangle by joining 3 of the points.`, vi: ['Hình tròn có 12 điểm cách đều nhau.', `Chọn 3 điểm tạo thành tam giác ${{ equilateral: 'ĐỀU', scalene: 'THƯỜNG', isosceles: 'CÂN (không phải đều)' }[want]}.`], check: (sel) => triKind(sel.map((i) => C[i])) === want, ex }));
    },
    () => { // R4 Q4 / Q9
      const L = sqLattice(4, 3); const want = R.pick(['isosceles', 'scalene']);
      const ex = want === 'isosceles' ? [0, 2, 9] : [0, 1, 6];
      return V(`Revision 4 · Q${want === 'isosceles' ? 4 : 9}`, dotsq({ t: 4, sk: 'tri2d', pts: L, need: 3, q: `Join dots to draw ${want === 'isosceles' ? 'an' : 'a'} ${want} triangle.`, vi: ['Một lưới chấm.', `Chọn 3 chấm tạo thành tam giác ${want === 'isosceles' ? 'CÂN' : 'THƯỜNG'}.`], check: (sel) => triKind(sel.map((i) => L[i])) === want, ex }));
    },
  ],
  sym: [
    () => { // R4 Q16a / Q19
      const rows = R.pick([4, 5]), cols = R.pick([5, 6, 7, 8]); const want = R.pick([1, 2]);
      const cells = new Set(); const orbit = (r, c) => (want === 2 ? [[r, c], [r, cols - 1 - c], [rows - 1 - r, c], [rows - 1 - r, cols - 1 - c]] : R.pick([[[r, c], [rows - 1 - r, c]], [[r, c], [r, cols - 1 - c]]]));
      const mode = want === 1 ? R.int(0, 1) : 0; let tries = 0;
      while (cells.size < 6 && tries++ < 60) { const r = R.int(0, rows - 1), c = R.int(0, cols - 1); const o = want === 2 ? orbit(r, c) : mode ? [[r, c], [rows - 1 - r, c]] : [[r, c], [r, cols - 1 - c]]; o.forEach(([a, b]) => cells.add(key(a, b))); }
      const all = [...cells]; if (symCount(new Set(all), rows, cols) !== want) return TPL.sym[0]();
      const need = want === 2 ? 4 : 2; const hide = R.shuffle(all).slice(0, need); const given = all.filter((k) => !hide.includes(k)).map((k) => k.split(',').map(Number));
      if (!given.length || symCount(new Set(given.map(([r, c]) => key(r, c))), rows, cols) === want) return TPL.sym[0]();
      return V(`Revision 4 · Q${want === 2 ? '16' : '19'}`, gridq({ t: 4, sk: 'sym', rows, cols, given, need, q: `Here is a shape made of squares. Shade ${need === 2 ? 'two' : need} more squares so that the shape has exactly ${want === 1 ? 'one line' : '2 lines'} of symmetry.`, vi: [`Lưới ô vuông có sẵn ${given.length} ô tô màu.`, `Tô thêm ${need} ô để hình có ĐÚNG ${want} trục đối xứng.`], check: (s) => symCount(s, rows, cols) === want, ex: hide.map((k) => k.split(',').map(Number)) }));
    },
    () => { // R4 Q25
      const [nm, n] = R.pick([['scalene triangle', 0], ['isosceles triangle', 1], ['equilateral triangle', 3], ['square', 4], ['rectangle', 2], ['regular hexagon', 6]]);
      return V('Revision 4 · Q25', inq({ t: 4, sk: 'sym', q: 'Complete the sentence.', vi: ['', `Hình ${nm} có mấy trục đối xứng?`] }, [[`A ${nm} has`, n, 'lines of symmetry.']]));
    },
    () => { // R4 Q13
      const rows = R.pick([3, 4, 5, 6]), cols = R.pick([5, 6, 7, 8].filter((c) => c !== rows)); let cb = '';
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cb += `<rect x="${c * 22}" y="${r * 22}" width="22" height="22" class="${(r + c) % 2 === 0 ? 'shade' : 'paper'} gridl"/>`;
      const n = (rows % 2 === 1 ? 1 : 0) + (cols % 2 === 1 ? 1 : 0); const o = ['0', '1', '2', '4'];
      return V('Revision 4 · Q13', mcq({ t: 4, sk: 'sym', fig: svg(cols * 22, rows * 22, cb), q: 'Here is a rectangle made with white squares and shaded squares. How many lines of symmetry does it have?', why: 'A fold works only if the colours match on both sides. With an even number of rows (or columns), that fold swaps the colours.', vi: ['Hình chữ nhật có các ô màu xen kẽ.', 'Hình này có mấy trục đối xứng?'] }, o, o.indexOf(String(n))));
    },
    () => { // R4 Q10
      const N = 6; const cells = new Set(); while (cells.size < 6) { const r = R.int(0, N - 1), c = R.int(0, N - 1); cells.add(key(r, c)); cells.add(key(c, r)); }
      const off = [...cells].filter((k) => { const [r, c] = k.split(',').map(Number); return r !== c; }); if (off.length < 2) return TPL.sym[3]();
      const pairOwner = R.shuffle(off); const hide = []; for (const k of pairOwner) { const [r, c] = k.split(',').map(Number); if (!hide.includes(key(c, r)) && hide.length < 2) hide.push(k); }
      const given = [...cells].filter((k) => !hide.includes(k)).map((k) => k.split(',').map(Number));
      return V('Revision 4 · Q10', gridq({ t: 4, sk: 'sym', rows: N, cols: N, diag: true, given, need: 2, q: 'Draw a cross in two more squares to complete this symmetrical pattern. The mirror line is the diagonal.', vi: ['Lưới ô vuông có đường gương chéo.', 'Tô thêm 2 ô để hình đối xứng qua đường chéo.'], check: (all) => { for (const k of all) { const [r, c] = k.split(',').map(Number); if (!all.has(key(c, r))) return false; } return true; }, ex: hide.map((k) => k.split(',').map(Number)) }));
    },
    () => { // R4 Q14
      const want = R.pick([[1, 'kite'], [2, 'rectangle'], [4, 'square'], [0, 'parallelogram']]); const shapes = ['square', 'rectangle', 'kite', 'parallelogram'];
      return V('Revision 4 · Q14', mcq({ t: 4, sk: 'sym', q: `Which quadrilateral has exactly ${['no lines', 'one line', 'two lines', '', 'four lines'][want[0]]} of symmetry?`, vi: ['4 hình tứ giác.', `Hình nào có ĐÚNG ${want[0]} trục đối xứng?`] }, shapes.map((s) => SHAPES[s]()), shapes.indexOf(want[1])));
    },
  ],
  poly: [
    () => { // R4 Q6
      const [nm, n, art] = R.pick([['hexagon', 6, 'a'], ['heptagon', 7, 'a'], ['octagon', 8, 'an']]); const left = n - 2; const names = { 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon' };
      const o = ['quadrilateral', 'pentagon', 'hexagon', 'heptagon']; const p = who();
      return V('Revision 4 · Q6', mcq({ t: 4, sk: 'poly', fig: SHAPES[nm] ? SHAPES[nm]() : svg(100, 100, `<polygon class="paper strokeish" points="${ptsStr(polyPts(n, 50, 52, 42))}"/>`, 'opt'), q: `Here is ${art} ${nm}. ${p} draws two straight lines inside the ${nm} to make two triangles and a third shape. Both lines start and finish at a vertex. The lines do not cross. Write the name of the third shape.`, why: `Each triangle cuts off one corner: ${n} − 2 = ${left} sides.`, vi: [`Kẻ 2 đường thẳng trong hình ${nm}, nối đỉnh với đỉnh, được 2 tam giác và 1 hình nữa.`, 'Hình thứ ba tên là gì?'] }, o, o.indexOf(names[left])));
    },
    () => { // R4 Q7
      const pool = [['square', 1], ['hexagon', 1], ['eqtri', 1], ['rectangle', 1], ['parallelogram', 1], ['circle', 0], ['pentagon', 0], ['heart', 0], ['semicircle', 0], ['octagon', 0]];
      const pick6 = R.shuffle(pool).slice(0, 6); if (!pick6.some((x) => x[1]) || pick6.every((x) => x[1])) return TPL.poly[1]();
      return V('Revision 4 · Q7', mul({ t: 4, sk: 'poly', q: 'Write a tick (✓) on each of the shapes that tessellate.', vi: ['6 hình.', 'Hình nào ghép kín mặt phẳng, không có khe hở?'] }, pick6.map(([s]) => SHAPES[s]()), pick6.map((x, i) => (x[1] ? i : -1)).filter((i) => i >= 0)));
    },
  ],
  solid: [
    () => { // R4 Q21
      const S = R.int(9, 20); const a = R.shuffle([...Array(S - 1).keys()].map((x) => x + 1).filter((x) => x * 2 !== S)).slice(0, 3);
      const vals = { '0,0': a[0], '2,1': S - a[0], '1,0': a[1], '2,2': S - a[1], '1,1': a[2], '3,1': S - a[2] };
      if (new Set(Object.values(vals)).size < 6) return TPL.solid[0]();
      const fig = svg(4 * 44 + 4, 3 * 44 + 4, Object.entries(vals).map(([k, n]) => { const [c, r] = k.split(',').map(Number); return `<rect class="paper strokeish" x="${2 + c * 44}" y="${2 + r * 44}" width="44" height="44"/><text class="lab b" x="${24 + c * 44}" y="${30 + r * 44}" text-anchor="middle">${n}</text>`; }).join(''));
      return V('Revision 4 · Q21', inq({ t: 4, sk: 'solid', fig, q: 'Here is the net of a cube. The numbers on opposite faces of the cube always have the same total. Write the total of the numbers on each pair of opposite faces.', why: `All six numbers add to ${3 * S}. Three pairs: ${3 * S} ÷ 3 = ${S}.`, vi: ['Hình khai triển hình lập phương. Hai mặt đối diện luôn có cùng một tổng.', 'Tổng đó là bao nhiêu?'] }, [['', S, '']]));
    },
    () => { // R4 Q23 (Mike)
      const facts = [['exactly three faces. Two of the faces are circles', 'cylinder'], ['exactly two faces. One of the faces is a circle', 'cone'], ['exactly six faces. All the faces are squares', 'cube'], ['exactly five faces. One face is a square and four faces are triangles', 'square-based pyramid'], ['exactly five faces. Two faces are triangles and three faces are rectangles', 'triangular prism'], ['exactly one curved face and no edges', 'sphere']];
      const [d, ans] = R.pick(facts); const o = R.shuffle(['cylinder', 'cone', 'cube', 'sphere', 'square-based pyramid', 'triangular prism'].filter((x) => x !== ans)).slice(0, 3).concat(ans); const oo = R.shuffle(o); const p = who();
      return V('Revision 4 · Q23', mcq({ t: 4, sk: 'solid', q: `${p} has a 3D shape with ${d}. Write the name of ${p}'s shape.`, vi: ['Mô tả các mặt của một hình khối.', 'Đó là hình gì?'] }, oo, oo.indexOf(ans)));
    },
    () => { // R4 Q24
      const a = R.int(1, 6);
      return V('Revision 4 · Q24', inq({ t: 4, sk: 'solid', q: `The numbers on the opposite faces of a dice add up to 7. Which number is on the face opposite ${a}?`, vi: ['Hai mặt đối diện của xúc xắc cộng lại bằng 7.', `Mặt đối diện với mặt ${a} là số mấy?`] }, [['', 7 - a, '']]));
    },
  ],
  // ---------------- Revision 5 + fractions sheet ----------------
  fof: [
    () => { // R5 Q2
      const d = R.pick([3, 4, 5, 8, 10]); const n = R.int(1, d - 1); const tot = d * R.int(2, 8); const fn = ['', '', '', 'thirds', 'quarters', 'fifths', '', '', 'eighths', '', 'tenths'][d];
      const word = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'][n] + ' ' + (n === 1 ? fn.replace(/s$/, '').replace('quarter', 'quarter') : fn);
      return V('Revision 5 · Q2', inq({ t: 5, sk: 'fof', q: `There are ${tot} fruit trees in a garden. ${word} of the trees are apple trees. The others are pear trees. How many pear trees are there?`, why: `${tot} ÷ ${d} × ${n} = ${(tot / d) * n} apple trees. ${tot} − ${(tot / d) * n} = ${tot - (tot / d) * n}`, vi: [`Có ${tot} cây. ${n}/${d} số cây là cây táo, còn lại là cây lê.`, 'Có bao nhiêu cây LÊ?'] }, [['', tot - (tot / d) * n, 'pear trees']]));
    },
    () => { // F10
      const k = R.pick([4, 5, 6, 8]), used = R.int(3, 9) * k + R.pick([0, k]); const tot = used * k; const left = tot - used; const p = who();
      return V('Fractions sheet · Q10', inq({ t: 5, sk: 'fof', q: `${p} has a ball of string and a parcel. ${p} uses ${fr(1, k)} of the string to tie the parcel. ${p} uses ${used} cm of string.<br>(a) Write the length of string left in centimetres.<br>(b) Write the length of string left in metres.`, why: `The whole string is ${used} × ${k} = ${tot} cm. Left: ${tot} − ${used} = ${left} cm = ${nf(left / 100)} m`, vi: [`Dùng 1/${k} cuộn dây, hết ${used} cm.`, 'Còn lại bao nhiêu cm? Đổi ra mét là bao nhiêu?'] }, [['(a)', left, 'cm'], ['(b)', round6(left / 100), 'm']]));
    },
    () => { // F18
      const D = R.int(2, 5), [n, d] = R.pick([[3, 10], [1, 5], [1, 4], [2, 5], [1, 10], [3, 5]]); const cents = D * 100 * n / d; if (!Number.isInteger(cents)) return TPL.fof[2]();
      const fruits = ['orange', 'mango', 'lemon', 'grapefruit', 'pineapple', 'apple']; const ans = R.pick(fruits); const prices = {}; const used = new Set([cents]);
      fruits.forEach((f) => { if (f === ans) prices[f] = cents; else { let x; do { x = R.int(5, 99); } while (used.has(x)); used.add(x); prices[f] = x; } });
      const p = who();
      return V('Fractions sheet · Q18', mcq({ t: 5, sk: 'fof', fig: tableHtml(['Fruit', 'Price each'], fruits.map((f) => [f, prices[f] + ' cents'])), q: `${p} has $${D}. ${p} spends ${fr(n, d)} of the money on one piece of fruit. Write down the piece of fruit ${p} buys.`, why: `$${D} = ${D * 100} cents. ${D * 100} ÷ ${d} × ${n} = ${cents} cents`, vi: [`${p} có $${D} và tiêu ${n}/${d} số tiền để mua 1 loại quả.`, 'Bạn ấy mua quả gì?'] }, fruits, fruits.indexOf(ans)));
    },
    () => { // F29
      const d = R.pick([3, 4, 5, 6, 8, 10]), n = R.int(1, d - 1), N = d * R.int(3, 15);
      return V('Fractions sheet · Q29', inq({ t: 5, sk: 'fof', q: `Calculate. ${fr(n, d)} of ${N}`, why: `${N} ÷ ${d} = ${N / d}, × ${n} = ${(N / d) * n}`, vi: ['', `Tính ${n}/${d} của ${N}.`] }, [['', (N / d) * n, '']]));
    },
    () => { // R5 Q8
      const [a, b] = R.pick([[7, 10], [3, 4], [2, 5], [3, 5], [5, 6]]), [c, d] = R.pick([[2, 3], [1, 2], [3, 4], [1, 3]]); const X = b * R.int(2, 9); const N = (a * X) / b; const M = (N * d) / c;
      if (!Number.isInteger(N) || !Number.isInteger(M)) return TPL.fof[4]();
      return V('Revision 5 · Q8', inq({ t: 5, sk: 'fof', q: `Write a number in the box to make the statement correct. ${fr(a, b)} of $▢ = ${fr(c, d)} of $${M}`, why: `${c}/${d} of ${M} = ${N}. ${N} ÷ ${a} × ${b} = ${X}`, vi: [`${a}/${b} của một số tiền bằng ${c}/${d} của $${M}.`, 'Số tiền đó là bao nhiêu?'] }, [['▢ =', X, '']]));
    },
    () => { // R5 Q3
      const k = R.pick([2, 3, 4, 5]), x = R.int(2, 9); const S = x + k * x; const p = who(); const w = { 2: 'one half', 3: 'one third', 4: 'one quarter', 5: 'one fifth' }[k];
      return V('Revision 5 · Q3', inq({ t: 5, sk: 'fof', q: `${p} is thinking of two numbers. They are both whole numbers. One number is ${w} of the other number. The sum of the numbers is ${S}. Write the numbers ${p} is thinking of.`, why: `Small + ${k} × small = ${k + 1} × small = ${S}, so small = ${x} and big = ${k * x}.`, vi: [`Hai số tự nhiên. Số này bằng 1/${k} số kia. Tổng là ${S}.`, 'Hai số đó là số mấy?'], check: (ps) => ps.every(isInt) && [ps[0].v, ps[1].v].sort((a, b) => a - b).join() === [x, k * x].join() }, [['', null, 'and', String(x)], ['', null, '', String(k * x)]]));
    },
    () => { // R5 Q5
      const g = R.int(2, 9) * 100 + R.pick([0, 50]); const p = who();
      const o = [`${g} × 2`, `${g} × ${fr(1, 2)}`, `${g} ÷ ${fr(1, 2)}`, `${g} ÷ 10`, `${g} ÷ 2`];
      return V('Revision 5 · Q5', mul({ t: 5, sk: 'fof', q: `${p} makes pastry. ${p} uses half as much butter as flour, and uses ${g} grams of flour. Draw a ring around all the calculations that give the mass of butter.`, why: `Half of ${g} = ${g} × ½ = ${g} ÷ 2 = ${g / 2}`, vi: [`Lượng bơ bằng MỘT NỬA lượng bột. Bột nặng ${g} g.`, 'Chọn TẤT CẢ phép tính ra đúng lượng bơ.'] }, o, [1, 4]));
    },
  ],
  eqv: [
    () => { // F28
      const [n, d] = R.pick([[4, 10], [3, 10], [7, 10], [1, 4], [3, 4], [2, 5], [3, 5], [1, 2], [9, 20], [6, 25]]); const pc = R.pick([20, 30, 45, 60, 75, 80, 5, 15]);
      return V('Fractions sheet · Q28', inq({ t: 5, sk: 'eqv', q: `Write ${fr(n, d)} as a percentage. Write ${pc}% as a decimal.`, vi: ['', `Đổi ${n}/${d} ra phần trăm. Đổi ${pc}% ra số thập phân.`] }, [[`${fr(n, d)} =`, (n / d) * 100, '%'], [`${pc}% =`, pc / 100, '']]));
    },
    () => { // F31
      const lo = R.pick([[2, 5, 40], [1, 4, 25], [3, 10, 30], [3, 5, 60], [1, 5, 20]]); const [n, d, L] = lo; const H = L + 10;
      return V('Fractions sheet · Q31', inq({ t: 5, sk: 'eqv', q: `Write a whole number in the box to make the statement correct: ${nf(H / 100)} > ▢% > ${fr(n, d)}`, why: `${nf(H / 100)} = ${H}% and ${n}/${d} = ${L}%, so ${L + 1} to ${H - 1}.`, vi: [`${nf(H / 100)} > ▢% > ${n}/${d}`, 'Điền một số tự nhiên vào ô cho đúng.'] }, [['', (p) => isInt(p) && p.v > L && p.v < H, '%', String(L + 5)]]));
    },
    () => { // F12
      const pool = [[15, 25, 60], [7, 20, 35], [1, 4, 25], [3, 5, 60], [9, 10, 90], [3, 20, 15], [11, 25, 44], [1, 5, 20], [7, 10, 70], [3, 4, 75], [2, 5, 40], [9, 20, 45]];
      let pick; do { pick = R.shuffle(pool).slice(0, 3); } while (new Set(pick.map((x) => x[2])).size < 3);
      const Rr = R.shuffle(pick.map((x) => x[2] + '%'));
      return V('Fractions sheet · Q12', matq({ t: 5, sk: 'eqv', q: 'Draw lines to match each fraction to an equivalent percentage.', vi: ['3 phân số và 3 số phần trăm.', 'Nối mỗi phân số với số phần trăm bằng nó.'] }, pick.map(([n, d]) => fr(n, d)), Rr, pick.map((x) => Rr.indexOf(x[2] + '%'))));
    },
    () => { // F37
      const [n, d] = R.pick([[1, 2], [1, 4], [3, 4], [1, 5], [3, 10], [2, 5]]); const x = R.int(1, 9) / 10;
      return V('Fractions sheet · Q37', inq({ t: 5, sk: 'eqv', q: 'Write a number in each box to complete the sentences.', vi: ['', `${n}/${d} bằng bao nhiêu %? ${nf(x)} bằng bao nhiêu %?`] }, [[`${fr(n, d)} =`, (n / d) * 100, '%'], [`${nf(x)} =`, Math.round(x * 100), '%']]));
    },
    () => { // F14
      const [a, b] = R.pick([[3, 4], [2, 3], [1, 2], [2, 5], [3, 5]]); const odd = R.int(0, 1) === 1; const lim = R.pick([20, 25, 30]);
      const ok = []; for (let k = 1; k * b < lim; k++) if ((k * a) % 2 === (odd ? 1 : 0)) ok.push([k * a, k * b]);
      if (!ok.length) return TPL.eqv[4]();
      const p = who();
      return V('Fractions sheet · Q14', inq({ t: 5, sk: 'eqv', q: `${p} is thinking of a fraction. "My fraction is equivalent to ${fr(a, b)}. The denominator is less than ${lim}. The numerator is an ${odd ? 'odd' : 'even'} number." Write the fraction.`, why: `Fractions equal to ${a}/${b}: ${ok.map(([n, d]) => n + '/' + d).join(', ')} work.`, vi: [`Phân số bằng ${a}/${b}, mẫu số nhỏ hơn ${lim}, tử số là số ${odd ? 'LẺ' : 'CHẴN'}.`, 'Đó là phân số nào?'] }, [['', (x) => !!x && x.isFrac && same(x.v, a / b) && x.den < lim && Math.abs(x.num) % 2 === (odd ? 1 : 0), '', `${ok[ok.length - 1][0]}/${ok[ok.length - 1][1]}`]]));
    },
  ],
  mixed: [
    () => { // F25
      const d = R.int(2, 9), w = R.int(1, 5), n = R.int(1, d - 1); if (gcd(n, d) !== 1) return TPL.mixed[0]();
      return V('Fractions sheet · Q25', inq({ t: 5, sk: 'mixed', q: `Write ${fr(w * d + n, d)} as a mixed number.`, why: `${w * d + n} ÷ ${d} = ${w} remainder ${n}`, vi: ['', `Viết ${w * d + n}/${d} thành hỗn số.`] }, [['', `${w} ${n}/${d}`, '']]));
    },
    () => { // F36
      const d = R.int(2, 9), w = R.int(1, 4), n = R.int(1, d - 1); if (gcd(n, d) !== 1) return TPL.mixed[1]();
      return V('Fractions sheet · Q36', inq({ t: 5, sk: 'mixed', q: 'Write a number in the box to complete the sentence.', why: `${w} = ${w * d}/${d}, so ${w} ${n}/${d} = ${w * d + n}/${d}`, vi: ['', `${w} ${n}/${d} bằng bao nhiêu phần ${d}?`] }, [[`${fx(w + ' ' + n + '/' + d)} =`, w * d + n, `/ ${d}`]]));
    },
    () => { // R5 Q1
      const w = R.int(1, 3), [n, d] = R.pick([[1, 2], [1, 4], [3, 4], [1, 3], [2, 3]]); const v = w + n / d;
      const opts = [[(w * d + n) * 2, d * 2], [d * 2, (w * d + n) * 2], [w * d + n, d], [d * 3, (w * d + n) * 3], `${w} ${n * 2}/${d * 2}`, `${w} ${n}/${d * 2}`].map((x) => (typeof x === 'string' ? x : x.join('/')));
      const o = R.shuffle(opts); const a = o.map((x, i) => (same(fv(x), v) ? i : -1)).filter((i) => i >= 0);
      return V('Revision 5 · Q1', mul({ t: 5, sk: 'mixed', q: `Draw a ring around all the numbers that are equivalent to ${fx(w + ' ' + n + '/' + d)}.`, vi: ['6 số.', `Chọn TẤT CẢ các số bằng ${w} ${n}/${d}.`] }, o.map(fx), a));
    },
  ],
  fdiv: [
    () => { // F13
      const a = R.int(2, 7), b = R.int(a + 1, 12); if (gcd(a, b) !== 1) return TPL.fdiv[0](); const p = who(); const an = R.pick(['donkeys', 'goats', 'horses', 'rabbits']);
      return V('Fractions sheet · Q13', inq({ t: 5, sk: 'fdiv', q: `${p} has ${b} ${an}. ${p} shares ${a} bags of food equally between the ${an}. "In total each animal will get ▢ of a bag of food." Write a fraction to complete the sentence.`, why: `${a} ÷ ${b} = ${a}/${b}`, vi: [`Chia đều ${a} bao thức ăn cho ${b} con vật.`, 'Mỗi con được bao nhiêu phần của một bao?'] }, [['', `${a}/${b}`, 'of a bag']]));
    },
    () => { // F11 / F30
      const k = R.pick([2, 3, 4]), n = R.int(2, 6); const p = who(); const [thing, unit, cont] = R.pick([['a tub of ice cream', 'tub', 'bowls'], ['litre of juice', 'litre', 'glasses'], ['a pizza', 'pizza', 'plates']]);
      const part = { 2: 'half', 3: 'one third of', 4: 'one quarter of' }[k];
      return V('Fractions sheet · Q30', inq({ t: 5, sk: 'fdiv', q: `${p} has ${part} ${thing}. ${p} shares it equally into ${n} ${cont}. Write the fraction of the whole ${unit} in each of the ${cont}.`, why: `1/${k} ÷ ${n} = 1/${k * n}`, vi: [`Có 1/${k} ${unit}, chia đều vào ${n} phần.`, 'Mỗi phần bằng bao nhiêu của cả cái?'] }, [['', `1/${k * n}`, '']]));
    },
    () => { // F26
      const a = R.int(1, 9), b = R.int(a + 1, 12);
      return V('Fractions sheet · Q26', inq({ t: 5, sk: 'fdiv', q: `Write the fraction that represents ${a} ÷ ${b}.`, vi: ['', `${a} ÷ ${b} bằng phân số nào?`] }, [['', `${a}/${b}`, '']]));
    },
    () => { // F35
      const n = R.int(1, 4), d = R.int(n + 1, 9);
      return V('Fractions sheet · Q35', inq({ t: 5, sk: 'fdiv', q: `Write a number in each box to complete the sentence. ${fr(n, d)} is equivalent to ▢ divided by ▢.`, why: `${n}/${d} = ${n} ÷ ${d}`, vi: ['', `${n}/${d} bằng số nào chia cho số nào?`], check: (ps) => ps.every(isInt) && ps[1].v !== 0 && same(ps[0].v / ps[1].v, n / d) }, [['', null, 'divided by', String(n)], ['', null, '', String(d)]]));
    },
    () => { // F17
      const [a, b] = R.pick([[1, 6], [1, 8], [3, 7], [2, 9]]), [c, d] = R.pick([[6, 10], [5, 8], [4, 9], [7, 10]]);
      const Rr = R.shuffle([`${b} ÷ ${a}`, `${a} ÷ ${b}`, `${c} ÷ ${d}`, `${d} ÷ ${c}`]);
      return V('Fractions sheet · Q17', matq({ t: 5, sk: 'fdiv', q: 'Draw a line to match each fraction to the equivalent calculation.', vi: ['2 phân số và 4 phép chia.', 'Nối mỗi phân số với phép chia bằng nó.'] }, [fr(a, b), fr(c, d)], Rr, [Rr.indexOf(`${a} ÷ ${b}`), Rr.indexOf(`${c} ÷ ${d}`)]));
    },
  ],
  fadd: [
    () => { // F20
      const [a, b] = R.pick([[3, 4], [1, 2], [2, 3], [1, 4], [2, 5]]); const m = R.pick([2, 3]); const d = b * m; const c = R.int(1, d - 1); const tot = a * m + c; const p = who();
      if (gcd(c, d) !== 1) return TPL.fadd[0]();
      return V('Fractions sheet · Q20', inq({ t: 5, sk: 'fadd', q: `${p} runs ${fr(a, b)} kilometre and stops for a rest. Then ${p} runs a further ${fr(c, d)} of a kilometre. Write the distance ${p} runs altogether.`, why: `${a}/${b} = ${a * m}/${d}. ${a * m}/${d} + ${c}/${d} = ${tot}/${d}`, vi: [`Chạy ${a}/${b} km, nghỉ, rồi chạy thêm ${c}/${d} km.`, 'Chạy TẤT CẢ bao nhiêu km?'] }, [['', F(tot / d), 'kilometres', `${tot}/${d}`]]));
    },
    () => { // F21
      const [a, b] = R.pick([[2, 3], [3, 4], [1, 2], [3, 5]]); const m = R.pick([2, 3, 4]); const d = b * m; let c = a * m + R.pick([-1, 1]); if (c <= 0) c = 1; const p = who();
      const claimShorter = true; const truth = a / b < c / d; void claimShorter;
      const o = [`No. ${fr(a, b)} = ${fr(a * m, d)}, which is ${a * m > c ? 'more' : 'less'} than ${fr(c, d)}.`, `Yes, because ${c} is bigger than ${a}.`, `No, because ${b} is smaller than ${d}.`];
      const right = truth ? 1 : 0; const o2 = truth ? [`Yes. ${fr(a, b)} = ${fr(a * m, d)}, which is less than ${fr(c, d)}.`, `No, because ${a} is smaller than ${c}.`, `No, because ${b} is smaller than ${d}.`] : o;
      return V('Fractions sheet · Q21', mcq({ t: 5, sk: 'fadd', q: `${p} has a piece of ribbon. ${p} says, "${fr(a, b)} of the ribbon is shorter than ${fr(c, d)} of the ribbon." Is ${p} correct?`, vi: [`${p} nói: "${a}/${b} sợi ruy băng ngắn hơn ${c}/${d} sợi ruy băng."`, `${p} nói đúng không?`] }, o2, truth ? 0 : 0)); void right;
    },
    () => { // F38
      const [a, b] = R.pick([[2, 15], [1, 6], [1, 10], [3, 20]]), [c, d] = R.pick([[1, 3], [1, 2], [2, 5]]); if (a / b >= c / d) return TPL.fadd[2]();
      const L = b * d / gcd(b, d); const lo = (a * L) / b, hi = (c * L) / d; if (hi - lo < 2) return TPL.fadd[2]();
      return V('Fractions sheet · Q38', inq({ t: 5, sk: 'fadd', q: `Write a fraction in the box to make the statement correct: ${fr(a, b)} < ▢ < ${fr(c, d)}`, why: `${a}/${b} = ${lo}/${L} and ${c}/${d} = ${hi}/${L}, so ${lo + 1}/${L} works.`, vi: ['', `Tìm một phân số lớn hơn ${a}/${b} và nhỏ hơn ${c}/${d}.`] }, [['', (p) => !!p && p.isFrac && p.v > a / b + 1e-9 && p.v < c / d - 1e-9, '', `${lo + 1}/${L}`]]));
    },
    () => { // R5 Q6
      const a = R.int(1, 5), b = R.int(1, 4); const end = a / 10 + b / 5; if (end >= 1) return TPL.fadd[3]();
      return V('Revision 5 · Q6', inq({ t: 5, sk: 'fadd', fig: numberLine({ from: 0, to: 1, ticks: [{ v: 0, bottom: '0' }, { v: a / 10, bottom: `${a}/10` }, { v: end, bottom: 'BOX' }], arcs: [{ from: 0, to: a / 10, label: `${a}/10` }, { from: a / 10, to: end, label: `${b}/5` }] }), q: 'Write the missing fraction in the box.', why: `${b}/5 = ${2 * b}/10, so ${a}/10 + ${2 * b}/10 = ${a + 2 * b}/10`, vi: [`Trên trục số: đi từ 0 thêm ${a}/10, rồi thêm ${b}/5.`, 'Ô cuối là phân số nào?'] }, [['', F(end), '', `${a + 2 * b}/10`]]));
    },
  ],
  pct: [
    () => { // R5 Q7 / F19
      const parts = R.pick([5, 10]); const sh = R.int(1, parts - 1); const idx = R.shuffle([...Array(parts).keys()]).slice(0, sh);
      return V(parts === 10 ? 'Revision 5 · Q7' : 'Fractions sheet · Q19', inq({ t: 5, sk: 'pct', fig: pentagonParts(parts, idx), q: `Here is a regular pentagon. It is divided into ${parts === 10 ? 'ten' : 'five'} equal parts. What percentage of the pentagon is shaded?`, why: `${sh}/${parts} = ${(sh / parts) * 100}/100 = ${(sh / parts) * 100}%`, vi: [`Hình ngũ giác đều chia thành ${parts} phần bằng nhau.`, 'Phần tô màu chiếm bao nhiêu phần trăm?'] }, [['', (sh / parts) * 100, '%']]));
    },
    () => { // F27
      const p = R.int(2, 12);
      return V('Fractions sheet · Q27', gridq({ t: 5, sk: 'pct', rows: 10, cols: 10, given: [], need: p, small: true, q: `Here is a shape made of 100 squares. Shade ${p}% of the shape.`, why: `${p}% = ${p} out of 100`, vi: ['Hình có 100 ô vuông.', `Tô ${p}% hình (tức là ${p} ô).`], check: (s) => s.size === p, ex: [...Array(p).keys()].map((i) => [Math.floor(i / 10), i % 10]) }));
    },
    () => { // F15
      const n = R.int(2, 5), per = R.pick([1, 2]); let tiles = '';
      for (let i = 0; i < n; i++) { const x = 4 + i * 60; const tris = [[`${x},4 ${x + 60},4 ${x + 30},34`], [`${x},64 ${x + 60},64 ${x + 30},34`], [`${x},4 ${x},64 ${x + 30},34`], [`${x + 60},4 ${x + 60},64 ${x + 30},34`]]; const sh = per === 1 ? [i % 2 ? 1 : 0] : [0, 1]; tiles += `<rect class="paper strokeish" x="${x}" y="4" width="60" height="60"/>${sh.map((k) => `<polygon class="shade" points="${tris[k][0]}"/>`).join('')}<line class="stroke thin" x1="${x}" y1="4" x2="${x + 60}" y2="64"/><line class="stroke thin" x1="${x + 60}" y1="4" x2="${x}" y2="64"/>`; }
      const p = who();
      return V('Fractions sheet · Q15', inq({ t: 5, sk: 'pct', fig: svg(n * 60 + 8, 68, tiles), q: `${per === 1 ? 'One quarter' : 'Half'} of this square tile is shaded. ${p} joins ${n} tiles to make a rectangle. What percentage of the rectangle is shaded?`, why: `${per * n} of ${4 * n} triangles: ${per * n}/${4 * n} = ${per * 25}%`, vi: [`Mỗi viên gạch tô ${per === 1 ? '1/4' : '1/2'}. Ghép ${n} viên thành hình chữ nhật.`, 'Phần tô màu chiếm bao nhiêu phần trăm?'] }, [['', per * 25, '%']]));
    },
  ],
};
for (const k of Object.keys(TPL)) GEN[k] = () => R.pick(TPL[k])();
if (typeof module !== 'undefined') module.exports = Object.assign(module.exports || {}, { TPL });
