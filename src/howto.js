// ===== Candy Math: "Cách làm bài" — how to answer each kind of question (Maths + Science) =====
// Command words table + one card per question type (picture, 2–3 steps, a real worksheet example, the trap) + a quick quiz.
// Examples are taken from the school revision sheets so the child sees the exact wording again.

const hpic = {
  tick: () => svg(150, 86, ['4.3', '4.5', '5.1'].map((t, i) => `<rect class="paper" x="8" y="${6 + i * 27}" width="20" height="20" rx="4"/>${i ? `<path class="stroke" fill="none" d="M12 ${16 + i * 27} l5 6 l9 -12" style="stroke-width:3"/>` : ''}<text class="lab" x="40" y="${21 + i * 27}">${t}</text>`).join('') + `<text class="lab sm" x="96" y="48">tick ALL</text>`),
  ring: () => svg(150, 60, ['0.5', '7', '30'].map((t, i) => `<text class="lab" x="${26 + i * 46}" y="36" text-anchor="middle">${t}</text>`).join('') + `<ellipse fill="none" class="stroke" cx="72" cy="31" rx="20" ry="16" style="stroke-width:2.5"/>`),
  tf: () => svg(170, 60, `<text class="lab sm" x="6" y="22">325 ÷ 10 = 3.25</text><rect class="box" x="6" y="32" width="50" height="22" rx="5"/><text class="lab sm" x="31" y="48" text-anchor="middle">True</text><rect class="shade" x="62" y="32" width="50" height="22" rx="5"/><text class="lab sm" x="87" y="48" text-anchor="middle" style="fill:var(--card)">False</text><text class="lab sm" x="120" y="48">32.5!</text>`),
  box: () => svg(190, 50, `<rect class="box" x="6" y="12" width="40" height="28" rx="5"/><text class="lab" x="54" y="32">× 1000 = 1 000 000</text>`),
  could: () => svg(170, 60, `<line class="stroke" x1="10" y1="34" x2="160" y2="34"/>${[6.5, 6.8, 7, 7.4].map((v, i) => `<circle class="shade" cx="${20 + i * 40}" cy="34" r="6"/><text class="lab sm" x="${20 + i * 40}" y="56" text-anchor="middle">${v}</text>`).join('')}<text class="lab sm" x="85" y="18" text-anchor="middle">all of these work</text>`),
  edge: () => svg(190, 60, `<line class="stroke" x1="10" y1="30" x2="180" y2="30"/><line class="stroke" x1="95" y1="16" x2="95" y2="44" style="stroke-width:3"/><text class="lab sm" x="95" y="12" text-anchor="middle">50.5</text><text class="lab sm" x="50" y="54" text-anchor="middle">→ 50</text><text class="lab sm" x="140" y="54" text-anchor="middle">→ 51</text><circle class="shade" cx="85" cy="30" r="5"/><text class="lab sm" x="70" y="24" text-anchor="middle">50.49</text>`),
  order: () => svg(170, 74, ['6.8', '7.6', '7.8'].map((t, i) => `<text class="lab" x="60" y="${22 + i * 22}" text-anchor="end">${t}</text>`).join('') + `<line class="stroke thin" x1="47" y1="6" x2="47" y2="70" stroke-dasharray="3 3"/><text class="lab sm" x="74" y="44">line up the</text><text class="lab sm" x="74" y="58">decimal points</text>`),
  seq: () => svg(200, 60, ['19.5', '?', '?', '10.5'].map((t, i) => `<text class="lab" x="${22 + i * 52}" y="44" text-anchor="middle">${t}</text>`).join('') + [0, 1, 2].map((i) => `<path class="stroke" fill="none" d="M${30 + i * 52} 26 Q${48 + i * 52} 8 ${66 + i * 52} 26"/><text class="lab sm" x="${48 + i * 52}" y="12" text-anchor="middle">−3</text>`).join('')),
  explain: () => svg(200, 60, `<rect class="box" x="6" y="8" width="56" height="44" rx="8"/><text class="lab" x="34" y="36" text-anchor="middle">No.</text><text class="lab sm" x="72" y="26">+ the reason</text><text class="lab sm" x="72" y="44">+ the numbers</text>`),
  word: () => svg(200, 60, `<text class="lab sm" x="6" y="22">$20 − $7.75 × 2</text><line class="stroke" x1="6" y1="28" x2="40" y2="28" style="stroke:var(--accent);stroke-width:3"/><line class="stroke" x1="60" y1="28" x2="100" y2="28" style="stroke:var(--accent);stroke-width:3"/><text class="lab sm" x="6" y="50">1 step = 1 line</text>`),
  shade: () => svg(150, 60, Array.from({ length: 10 }, (_, i) => `<rect class="${i < 3 ? 'shade' : 'paper'}" x="${6 + i * 13}" y="12" width="13" height="26"/>`).join('') + `<text class="lab sm" x="70" y="56" text-anchor="middle">3 of 10 = 30%</text>`),
  fair: () => svg(250, 64, [['CHANGE', 'independent', 'var(--sky)'], ['MEASURE', 'dependent', 'var(--mint)'], ['SAME', 'control', 'var(--lemon)']].map(([a, b, c], i) => `<rect x="${4 + i * 82}" y="6" width="76" height="52" rx="12" style="fill:${c}"/><text class="lab sm" x="${42 + i * 82}" y="30" text-anchor="middle" style="fill:#2b1631">${a}</text><text class="lab sm" x="${42 + i * 82}" y="48" text-anchor="middle" style="fill:#2b1631">${b}</text>`).join('')),
  table: () => svg(220, 92, `<rect class="paper" x="4" y="4" width="210" height="84"/><rect x="146" y="4" width="68" height="84" style="fill:var(--accent);opacity:0.3"/><text class="lab sm" x="40" y="22" text-anchor="middle">instrument</text><text class="lab sm" x="110" y="22" text-anchor="middle">lowest</text><text class="lab sm" x="180" y="22" text-anchor="middle">highest</text><line class="stroke thin" x1="4" y1="30" x2="214" y2="30"/>${[['oboe', 220, 880], ['tuba', 55, 220]].map(([n, a, b], i) => `<text class="lab sm" x="40" y="${50 + i * 22}" text-anchor="middle">${n}</text><text class="lab sm" x="110" y="${50 + i * 22}" text-anchor="middle">${a}</text><text class="lab sm" x="180" y="${50 + i * 22}" text-anchor="middle">${b}</text>`).join('')}`),
  chart: () => barChart(['A', 'B', 'C', 'D'], [18, 3, 2, 15], { max: 20, step: 5, bw: 34 }),
  cycle: () => svg(160, 120, `<circle fill="none" class="stroke" cx="80" cy="60" r="42" stroke-dasharray="6 5"/>${[[80, 18, 'evaporation'], [122, 60, ''], [80, 102, ''], [38, 60, '']].map(([x, y]) => `<circle class="shade" cx="${x}" cy="${y}" r="7"/>`).join('')}<polygon class="ink" points="118,38 128,44 116,48"/><text class="lab sm" x="80" y="64" text-anchor="middle">follow →</text><text class="lab sm" x="80" y="12" text-anchor="middle">start?</text>`),
  bottles: () => { const b = (x, f) => `<rect class="shade" x="${x}" y="${100 - 70 * f}" width="34" height="${70 * f}"/><path class="stroke" fill="none" d="M${x + 11} 6 L${x + 11} 20 Q${x} 24 ${x} 34 L${x} 100 L${x + 34} 100 L${x + 34} 34 Q${x + 34} 24 ${x + 23} 20 L${x + 23} 6"/>`; return svg(290, 108, b(8, 0.2) + b(52, 0.75) + `<text class="lab sm" x="100" y="40">TAP: more water → LOWER</text><text class="lab sm" x="100" y="80">BLOW: more water → HIGHER</text>`); },
  thermo: () => svg(260, 80, `<line class="stroke" x1="10" y1="34" x2="250" y2="34" style="stroke-width:4"/>${[[40, '0', 'melts'], [130, '20', 'room'], [220, '100', 'boils']].map(([x, t, l]) => `<line class="stroke" x1="${x}" y1="24" x2="${x}" y2="44"/><text class="lab sm" x="${x}" y="18" text-anchor="middle">${t} °C</text><text class="lab sm" x="${x}" y="62" text-anchor="middle">${l}</text>`).join('')}<text class="lab b" x="175" y="62" text-anchor="middle">liquid</text><text class="lab b" x="20" y="74" text-anchor="start">← solid</text><text class="lab b" x="250" y="74" text-anchor="end">gas →</text>`),
  minus: () => svg(200, 56, `<text class="lab" x="8" y="24">start − end</text><text class="lab" x="8" y="48">25 − 13 = 12 g</text>`),
  because: () => svg(220, 60, `<rect class="paper" x="4" y="8" width="88" height="44" rx="8"/><text class="lab sm" x="48" y="34" text-anchor="middle">what happens</text><text class="lab b" x="110" y="35" text-anchor="middle">+</text><rect class="box" x="126" y="8" width="90" height="44" rx="8"/><text class="lab sm" x="171" y="34" text-anchor="middle">because …</text>`),
};

const HOWTO = {
  math: {
    words: [
      ['Tick all / Tick two', 'Đánh dấu ✓ TẤT CẢ / đúng HAI', 'all = có thể nhiều hơn 1; two = đúng 2', 'Which numbers round to 5? Tick all of them.'],
      ['Draw a ring around', 'Khoanh tròn', 'khoanh đúng số lượng đề hỏi', 'Draw a ring around four numbers that have a total of 37.52'],
      ['Write / Write down', 'Viết ra', 'chỉ cần đáp án', 'Write the correct number in the box.'],
      ['Calculate', 'Tính', 'tính ra con số', 'Calculate. 8.7 ÷ 10 ='],
      ['Complete', 'Hoàn thành, điền vào', 'điền hết các ô trống', 'Complete the blanks.'],
      ['Explain / Explain how you know', 'Giải thích', 'trả lời + lý do + con số', 'Is he correct? Explain how you know.'],
      ['could', 'có thể (nhiều đáp án đúng)', 'chọn MỘT số thỏa mãn mọi điều kiện', 'Write a number that Eva could choose.'],
      ['largest / smallest', 'lớn nhất / nhỏ nhất', 'tìm số ở sát "biên"', 'the largest number with 2 decimal places that gives 50'],
      ['in order, starting with the smallest', 'xếp thứ tự, bắt đầu từ số bé nhất', 'bé → lớn', 'Write the numbers in order.'],
      ['total / difference / each / left', 'tổng / hiệu / mỗi / còn lại', 'chọn đúng phép tính', 'How much money is left?'],
    ],
    cards: [
      { h: 'Tick all · Tick two', pic: 'tick', steps: ['Đọc xem đề bảo chọn TẤT CẢ (all) hay đúng bao nhiêu (two, four).', 'Kiểm tra TỪNG đáp án một, đừng dừng ở đáp án đúng đầu tiên.', 'Đếm lại số dấu ✓ trước khi nộp.'], ex: 'Which numbers round to 5? Tick all of them. (Revision 1 · Q2)', trap: '4.5 cũng làm tròn thành 5! Nhiều bạn chỉ chọn 5.1 và 4.7.' },
      { h: 'Draw a ring around', pic: 'ring', steps: ['Gạch chân con số đề cho (ví dụ total 37.52).', 'Tách số đó theo hàng: 30 + 7 + 0.5 + 0.02.', 'Khoanh đúng số lượng đề yêu cầu.'], ex: 'Draw a ring around four numbers that have a total of 37.52 (Revision 1 · Q10)', trap: 'Đề nói four thì khoanh đúng 4, không hơn không kém.' },
      { h: 'True or false?', pic: 'tf', steps: ['Tự tính phép tính ra giấy nháp.', 'So kết quả của em với số trong đề.', 'Giống thì True, khác thì False.'], ex: '325 ÷ 10 = 3.25 → False, vì 325 ÷ 10 = 32.5 (Revision 1 · Q1)', trap: 'Đừng đoán. Mỗi dòng phải tính.' },
      { h: 'Write a number in the box', pic: 'box', steps: ['Ô trống là số chưa biết.', 'Dùng phép ngược: nhân ↔ chia, cộng ↔ trừ.', 'Thay số vào kiểm tra lại.'], ex: '▢ × 1000 = 1 000 000 → 1 000 000 ÷ 1000 = 1000 (Revision 1 · Q12)', trap: 'Đếm số 0 cẩn thận.' },
      { h: '"could" — many right answers', pic: 'could', steps: ['Gạch chân mọi điều kiện (1 decimal place, rounds to 7…).', 'Chọn MỘT số thử, kiểm tra đủ từng điều kiện.', 'Chỉ cần viết một đáp án đúng.'], ex: 'Eva chooses a number with 1 decimal place. It rounds to 7. Write a number Eva could choose. → 6.8 (Revision 1 · Q7)', trap: 'Số 7 không có chữ số thập phân nên không được.' },
      { h: 'Largest / smallest that…', pic: 'edge', steps: ['Tìm "ranh giới" (50.5 là chỗ đổi sang 51).', 'Largest thì lấy số ngay DƯỚI ranh giới, smallest thì lấy số ĐÚNG ranh giới hoặc ngay trên.', 'Kiểm tra số chữ số thập phân đề yêu cầu.'], ex: 'Largest with 2 decimal places that rounds to 50 → 50.49 (Revision 1 · Q19)', trap: '50.5 làm tròn thành 51, không phải 50.' },
      { h: 'In order', pic: 'order', steps: ['Viết các số thẳng dấu phẩy.', 'So phần nguyên trước, rồi phần mười, rồi phần trăm.', 'Đọc đề: smallest first hay largest first?'], ex: '7.8, 8.6, 6.8, 7.6, 8.7 → 6.8, 7.6, 7.8, 8.6, 8.7 (Revision 1 · Q16)', trap: 'Chú ý chiều: starting with the smallest.' },
      { h: 'Sequences', pic: 'seq', steps: ['Tìm bước nhảy: hiệu hai số liền nhau.', 'Nếu thiếu số ở giữa: hiệu ÷ số bước.', 'Đi tiếp hoặc lùi lại theo đúng bước đó.'], ex: '19.5, ?, ?, 10.5: (19.5 − 10.5) ÷ 3 = 3, mỗi bước −3 (Revision 2 · Q7)', trap: 'Đếm lùi qua 0 thì sang số âm: 3 − 5 = −2.' },
      { h: 'Explain · Is he correct?', pic: 'explain', steps: ['Trả lời Yes hoặc No trước.', 'Viết lý do bằng chữ.', 'Đưa con số ra làm bằng chứng.'], ex: 'Is he correct? → No. To the nearest 100 it is 40 100, but to the nearest 1000 it is 40 000. (Revision 1 · Q14)', trap: 'Chỉ viết "No" thì mất điểm phần giải thích.' },
      { h: 'Word problems', pic: 'word', steps: ['Gạch chân các con số và từ khóa (each, left, total).', 'Mỗi dòng một phép tính.', 'Ghi đơn vị ($, cm, g) ở đáp án.'], ex: 'each = mỗi cái (nhân), left = còn lại (trừ), total = tổng (cộng)', trap: 'Bài nhiều bước: đừng dừng ở phép tính đầu tiên.' },
      { h: 'Shade · percentages of shapes', pic: 'shade', steps: ['Đếm tổng số phần BẰNG NHAU.', 'Đếm số phần được tô.', 'Viết phân số rồi đổi ra %: 3/10 = 30%.'], ex: 'Shade 30% of the shape → 30 of the 100 squares (Fractions sheet)', trap: 'Các phần phải bằng nhau mới đếm được.' },
    ],
    quiz: [
      ['The question says <b>Tick all</b>. How many answers can you choose?', ['one or more', 'exactly one', 'exactly two'], 0],
      ['The question says <b>Tick two</b>. How many answers do you choose?', ['exactly two', 'one or more', 'all of them'], 0],
      ['"Write a number Eva <b>could</b> choose." What does <b>could</b> tell you?', ['There are many right answers. Write one that fits.', 'There is only one right answer.', 'You must write all the answers.'], 0],
      ['The question says <b>Is he correct? Explain how you know.</b> Which answer gets the mark?', ['No. 40 075 to the nearest 100 is 40 100, not 40 000.', 'No.', 'Yes, because he is good at maths.'], 0],
      ['▢ × 100 = 4500. How do you find the box?', ['4500 ÷ 100', '4500 × 100', '4500 − 100'], 0],
      ['What is the largest number with 2 decimal places that rounds to 30?', ['30.49', '30.5', '29.99'], 0],
      ['Write the numbers in order, <b>starting with the smallest</b>: 3.2, 0.8, 2.6', ['0.8, 2.6, 3.2', '3.2, 2.6, 0.8', '2.6, 0.8, 3.2'], 0],
      ['"She has $20 and buys 2 balls at $7.75 <b>each</b>. How much is <b>left</b>?" Which plan is right?', ['7.75 × 2, then 20 − that', '20 − 7.75', '20 + 7.75 × 2'], 0],
      ['19.5, ▢, ▢, 10.5 go down by the same amount. What is each step?', ['−3', '−9', '−4.5'], 0],
      ['"325 ÷ 10 = 3.25". True or false?', ['False, it is 32.5', 'True', 'False, it is 3250'], 0],
    ],
  },
  sci: {
    words: [
      ['Name / Write down', 'Gọi tên / viết ra', 'một từ hoặc cụm từ khoa học', 'What is the name of process B? → condensation'],
      ['Describe', 'Mô tả', 'chuyện gì xảy ra, theo từng bước', 'Describe how the cymbals make the sound.'],
      ['Explain', 'Giải thích', 'chuyện gì xảy ra + because (vì sao)', 'Explain why making the string tighter makes a higher note.'],
      ['Predict', 'Dự đoán', 'một kết quả hoặc con số + lý do', 'Predict the boiling point of the more concentrated solution.'],
      ['Conclusion', 'Kết luận', 'câu quy luật: The more …, the …', 'The more water, the lower the pitch.'],
      ['Evidence', 'Bằng chứng', 'trích SỐ LIỆU trong bảng', 'Dish C was dark but 7 seeds germinated.'],
      ['Suggest', 'Đề xuất', 'một ý hợp lý, không cần học thuộc', 'Suggest how this could be done.'],
      ['Tick two / Circle', 'Đánh dấu hai / khoanh tròn', 'đúng số lượng đề yêu cầu', 'Tick the two features that attract insects.'],
      ['dependent variable', 'biến phụ thuộc', 'thứ em ĐO', 'the number of seeds germinated'],
      ['control variable', 'biến kiểm soát', 'thứ em GIỮ NGUYÊN', 'the volume of water'],
    ],
    cards: [
      { h: 'Fair test: 3 buttons', pic: 'fair', steps: ['CHANGE (independent): thứ em thay đổi.', 'MEASURE (dependent): thứ em đo hoặc đếm.', 'SAME (control): mọi thứ khác phải giữ nguyên.'], ex: 'Mia changes light/dark and warm/cold. She measures the number of seeds germinated. (Unit 1 Review · Q4)', trap: 'Hỏi "dependent" = hỏi "em ĐO cái gì?". Mia để số hạt mỗi đĩa khác nhau nên không công bằng.' },
      { h: 'Read a table', pic: 'table', steps: ['Đọc đề tìm từ khóa: lowest hay highest?', 'Chỉ tay vào đúng CỘT, rồi đúng HÀNG.', 'Khoanh con số, đọc lại câu hỏi.'], ex: 'Which instrument has 220 units as its lowest pitch? → oboe (Unit 2 Review · Q8)', trap: 'Tuba cũng có số 220 nhưng ở cột highest!' },
      { h: 'Draw or choose a bar chart', pic: 'chart', steps: ['Ghi tên cả hai trục.', 'Chia thang đều (0, 5, 10, 15…).', 'Vẽ đỉnh cột cao đúng bằng số trong bảng.'], ex: 'Priya: A 18, B 3, C 2, D 15 insects (Unit 1 Review · Q8)', trap: 'Kiểm tra từng cột khớp đúng chữ A, B, C, D.' },
      { h: 'Cycle diagrams', pic: 'cycle', steps: ['Đi theo chiều mũi tên.', 'Giai đoạn đầu tiên KHÔNG phải lúc nào cũng ở trên cùng.', 'Đọc mũi tên đi từ đâu đến đâu để gọi tên.'], ex: 'pollination → fertilisation → seed production → seed dispersal → germination (Unit 1 Review · Q7)', trap: 'Vòng tuần hoàn nước: evaporation → condensation → precipitation → collection.' },
      { h: 'Explain = what + because', pic: 'because', steps: ['Viết chuyện gì xảy ra.', 'Thêm "because" và lý do khoa học (vibrations, particles…).', 'Có bảng số liệu thì trích số.'], ex: 'A tighter string vibrates faster, so the pitch is higher. (Unit 2 Review · Q7)', trap: 'Chỉ viết "it is higher" là thiếu phần because.' },
      { h: 'Blow or tap the bottle?', pic: 'bottles', steps: ['Đọc phương pháp: thổi (blow) hay gõ (tap)?', 'Gõ: thủy tinh rung cùng nước, nhiều nước thì TRẦM hơn.', 'Thổi: không khí rung, nhiều nước thì cột khí ngắn nên CAO hơn.'], ex: 'Lily hits each bottle with a stick: A (least water) highest pitch (Unit 2 Review · Q3)', trap: 'Làm theo kết quả trong hình, đừng làm theo trí nhớ.' },
      { h: 'Solid, liquid or gas at 20 °C?', pic: 'thermo', steps: ['Đặt 20 °C lên thước nhiệt độ.', '20 dưới nhiệt độ nóng chảy: solid. Giữa hai số: liquid.', '20 trên nhiệt độ sôi: gas.'], ex: 'E melts −101 °C, boils −34 °C → 20 °C is above both → gas (Unit 3 Review · Q9)', trap: 'Số âm nhỏ hơn 0: −34 nhỏ hơn 20.' },
      { h: 'Calculate from a table', pic: 'minus', steps: ['Lượng giảm = lúc đầu − lúc sau.', 'Khoảng chênh = cao nhất − thấp nhất.', 'Ghi đơn vị (g, °C, units).'], ex: '25 g at start, 13 g after 24 hours → 12 g (Unit 3 Review · Q2)', trap: 'Đọc đúng hàng nhiệt độ đề hỏi.' },
    ],
    quiz: [
      ['The question says <b>Explain</b>. Which answer gets the mark?', ['A tighter string vibrates faster, so the pitch is higher.', 'It is higher.', 'Because it is tight.'], 0],
      ['The question says <b>Name</b> process B. What do you write?', ['one science word, like condensation', 'a long story', 'a number'], 0],
      ['What is the <b>dependent</b> variable?', ['the thing you measure', 'the thing you change', 'the things you keep the same'], 0],
      ['What is a <b>control</b> variable?', ['something you keep the same', 'something you measure', 'something you change'], 0],
      ['Which is a good <b>conclusion</b>?', ['The more water in the bottle, the lower the pitch.', 'Bottle A was first.', 'I liked this test.'], 0],
      ['The question asks for <b>evidence</b> in the table. What do you write?', ['the numbers from the table that show it', 'what you think', 'the title of the table'], 0],
      ['A table has a "lowest" and a "highest" column. The question asks about the <b>lowest</b>. Where do you look?', ['only in the lowest column', 'in both columns', 'in the highest column'], 0],
      ['Lily <b>taps</b> bottles. Which bottle gives the lowest note?', ['the one with the most water', 'the one with the least water', 'they are all the same'], 0],
      ['A substance melts at 114 °C and boils at 183 °C. What is it at 20 °C?', ['solid', 'liquid', 'gas'], 0],
      ['25 g of water at the start, 19 g after 24 hours. What is the decrease?', ['6 g', '44 g', '19 g'], 0],
      ['A life cycle diagram starts at the bottom. What do you do?', ['follow the arrows from the stage they give you', 'always start at the top', 'read it backwards'], 0],
    ],
  },
};
SKILLS.hmath = { t: 6, en: 'How to answer (Maths)', vi: 'Đọc kỹ từ ra lệnh trong đề: tick all, could, explain…' };
SKILLS.hsci = { t: 10, en: 'How to answer (Science)', vi: 'Name = 1 từ. Describe = chuyện gì xảy ra. Explain = chuyện gì xảy ra + because.' };
function howtoQuestion(subj, item) {
  const [q, opts, a] = item; const o = R.shuffle(opts);
  return G(mcq({ t: subj === 'sci' ? 10 : 6, sk: subj === 'sci' ? 'hsci' : 'hmath', src: 'Cách làm bài', q, why: 'Answer: ' + opts[a] }, o, o.indexOf(opts[a])));
}
if (typeof module !== 'undefined') module.exports = Object.assign(module.exports || {}, { HOWTO, hpic, howtoQuestion });
