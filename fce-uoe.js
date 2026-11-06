/* FCE (B2 First) Reading & Use of English Parts 1-3 quiz engine.
   Data: window.FCE_UOE = { part1: [...], part2: [...], part3: [...] }
   Task: { id, title, source?, example, paragraphs: ["... (N) _____ ..."],
           items: [{ n, A,B,C,D (part 1), stem (part 3), accept: [..] | null, why? }] } */
(function () {
  const DATA = window.FCE_UOE || { part1: [], part2: [], part3: [] };
  const STORE = 'fce-uoe-progress-' + (window.FCE_UOE_STORE || 'site');
  const PARTS = {
    1: { name: 'Part 1 · Multiple-choice Cloze', short: 'Part 1 選擇克漏字',
         how: 'Read the text and choose the answer (A, B, C or D) which best fits each gap.\n閱讀短文，為每個空格選出最適合的答案。' },
    2: { name: 'Part 2 · Open Cloze', short: 'Part 2 填一個字',
         how: 'Think of the word which best fits each gap. Use only ONE word in each gap.\n每個空格只能填一個字（多為介系詞、冠詞、代名詞、助動詞、連接詞）。' },
    3: { name: 'Part 3 · Word Formation', short: 'Part 3 詞性變化',
         how: 'Use the word in CAPITALS to form a word that fits in the gap.\n把大寫單字改成適合空格的詞形（字首、字尾、名詞、形容詞、副詞、否定…）。' }
  };
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => String(s || '').trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ');

  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { progress = {}; }
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(progress)); } catch {} };

  const params = new URLSearchParams(location.search);
  let part = Number(params.get('part')) || 1;
  if (!PARTS[part]) part = 1;
  let idx = 0;

  const tasks = () => DATA['part' + part] || [];
  const hasKey = t => t.items.every(i => Array.isArray(i.accept) && i.accept.length);

  function renderSidebar() {
    document.querySelectorAll('[data-part]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.part) === part)));
    const term = norm($('#searchInput').value);
    const list = $('#setList');
    list.innerHTML = '';
    tasks().forEach((t, i) => {
      if (term && !norm(t.title + ' ' + (t.source || '')).includes(term)) return;
      const p = progress[t.id];
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'uoe-set' + (i === idx ? ' active' : '');
      b.innerHTML = `<span><b>${i + 1}.</b> ${esc(t.title)}${t.source ? `<em>${esc(t.source)}</em>` : ''}</span>` +
        `<small class="${p && p.score === p.total ? 'done' : ''}">${p ? `${p.score}/${p.total}` : (hasKey(t) ? '' : 'no key')}</small>`;
      b.addEventListener('click', () => { idx = i; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      list.appendChild(b);
    });
    $('#countPill').textContent = tasks().length;
  }

  function control(t, item) {
    const id = `g${item.n}`;
    if (part === 1) {
      const opts = ['A', 'B', 'C', 'D'].map(L => `<option value="${L}">${L} ${esc(item[L])}</option>`).join('');
      return `<label class="uoe-gap"><b>(${item.n})</b><select id="${id}" data-n="${item.n}" aria-label="Gap ${item.n}"><option value="">—</option>${opts}</select></label>`;
    }
    const stem = part === 3 && item.stem ? `<span class="uoe-stem">${esc(item.stem)}</span>` : '';
    return `<label class="uoe-gap"><b>(${item.n})</b><input id="${id}" data-n="${item.n}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Gap ${item.n}${item.stem ? ' – ' + esc(item.stem) : ''}">${stem}</label>`;
  }

  function exampleHtml(t) {
    const ex = t.example;
    if (!ex) return '';
    if (part === 1 && typeof ex === 'object') {
      return `<b>Example (0):</b> ${['A', 'B', 'C', 'D'].map(L => `<span class="${ex.answer === L ? 'uoe-exans' : ''}">${L} ${esc(ex[L])}</span>`).join(' &nbsp; ')}`;
    }
    if (part === 3 && typeof ex === 'object') return `<b>Example (0):</b> ${esc(ex.stem)} → <span class="uoe-exans">${esc(ex.answer)}</span>`;
    return `<b>Example (0):</b> <span class="uoe-exans">${esc(ex)}</span>`;
  }

  function render() {
    const list = tasks();
    if (idx >= list.length) idx = 0;
    const t = list[idx];
    renderSidebar();
    $('#partMeta').textContent = `FCE Reading & Use of English · ${PARTS[part].name}`;
    if (!t) { $('#taskTitle').textContent = 'No sets yet'; $('#passage').innerHTML = ''; return; }
    $('#taskTitle').textContent = `${idx + 1}. ${t.title}`;
    $('#howTo').textContent = PARTS[part].how;
    $('#example').innerHTML = exampleHtml(t);
    const byN = Object.fromEntries(t.items.map(i => [String(i.n), i]));
    $('#passage').innerHTML = t.paragraphs.map(p =>
      `<p>${esc(p).replace(/\((\d{1,2})\)\s*_+/g, (m, n) => n === '0' ? '<span class="uoe-zero">(0) ______</span>' : (byN[n] ? control(t, byN[n]) : m))}</p>`).join('');
    const keyed = hasKey(t);
    $('#checkButton').disabled = !keyed;
    $('#showButton').disabled = !keyed;
    $('#noKey').hidden = keyed;
    $('#feedback').innerHTML = '';
    $('#score').textContent = '';
    $('#prevButton').disabled = idx === 0;
    $('#nextButton').disabled = idx === list.length - 1;
    const url = new URL(location.href); url.searchParams.set('part', part); history.replaceState(null, '', url);
  }

  function value(n) { const el = document.getElementById('g' + n); return el ? el.value : ''; }

  function check(reveal) {
    const t = tasks()[idx];
    let score = 0;
    const rows = t.items.map(item => {
      const el = document.getElementById('g' + item.n);
      const v = value(item.n);
      const ok = item.accept.some(a => norm(a) === norm(v));
      if (ok) score++;
      if (reveal && !ok && el) el.value = part === 1 ? item.accept[0] : item.accept[0];
      if (el) { el.classList.toggle('ok', ok); el.classList.toggle('bad', !ok && !reveal); el.classList.toggle('shown', !ok && reveal); }
      const ans = part === 1 ? `${item.accept[0]} ${esc(item[item.accept[0]] || '')}` : item.accept.map(esc).join(' / ');
      const mark = ok ? '<span class="v ok">✓</span>' : `<span class="v bad">✗</span>`;
      const yours = !ok && v ? ` <span class="yours">your answer: ${esc(part === 1 ? v + ' ' + (item[v] || '') : v)}</span>` : '';
      return `<li>${mark}<b>(${item.n})</b> ${ans}${yours}${item.why ? `<div class="why">${esc(item.why)}</div>` : ''}</li>`;
    });
    if (!reveal) {
      progress[t.id] = { score, total: t.items.length };
      save();
      renderSidebar();
    }
    $('#score').textContent = reveal ? 'Answers shown' : `Score: ${score} / ${t.items.length}`;
    $('#feedback').innerHTML = `<ol class="uoe-fb">${rows.join('')}</ol>`;
  }

  document.querySelectorAll('[data-part]').forEach(b => b.addEventListener('click', () => { part = Number(b.dataset.part); idx = 0; render(); }));
  $('#searchInput').addEventListener('input', renderSidebar);
  $('#checkButton').addEventListener('click', () => check(false));
  $('#showButton').addEventListener('click', () => check(true));
  $('#resetButton').addEventListener('click', () => { const t = tasks()[idx]; delete progress[t.id]; save(); render(); });
  $('#prevButton').addEventListener('click', () => { if (idx > 0) { idx--; render(); } });
  $('#nextButton').addEventListener('click', () => { if (idx < tasks().length - 1) { idx++; render(); } });
  render();
})();
