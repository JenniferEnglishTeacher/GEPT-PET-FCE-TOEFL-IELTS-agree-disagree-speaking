/* FCE Use of English Part 4 — key word transformation by grammar pattern.
   Data: window.FCE_P4 = { groups: [{ name, cats: [{ id, en, zh, rows: [{ pattern, examples: [..] }],
         questions: [{ id, first, key, second, answers: [..] }] }] }] } */
(function () {
  const DATA = window.FCE_P4 || { groups: [] };
  const STORE = 'fce-part4-progress';
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const bold = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b class="p4-hl">$1</b>');
  const norm = s => String(s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/[.,!?;:"]/g, ' ')
    .replace(/\bdon't\b/g, 'do not').replace(/\bdoesn't\b/g, 'does not').replace(/\bdidn't\b/g, 'did not')
    .replace(/\bisn't\b/g, 'is not').replace(/\baren't\b/g, 'are not').replace(/\bwasn't\b/g, 'was not').replace(/\bweren't\b/g, 'were not')
    .replace(/\bhaven't\b/g, 'have not').replace(/\bhasn't\b/g, 'has not').replace(/\bhadn't\b/g, 'had not')
    .replace(/\bcan't\b/g, 'cannot').replace(/\bcouldn't\b/g, 'could not').replace(/\bwouldn't\b/g, 'would not')
    .replace(/\bshouldn't\b/g, 'should not').replace(/\bwon't\b/g, 'will not').replace(/\bmustn't\b/g, 'must not')
    .replace(/\bi'm\b/g, 'i am').replace(/\bit's\b/g, 'it is').replace(/\bthey're\b/g, 'they are').replace(/\bwe're\b/g, 'we are')
    .replace(/\byou're\b/g, 'you are').replace(/\bhe's\b/g, 'he is').replace(/\bshe's\b/g, 'she is').replace(/\bi've\b/g, 'i have')
    .replace(/\bi'd\b/g, 'i would').replace(/\s+/g, ' ').trim();
  // expand "a (b) c / d" into every accepted string
  function variants(ans) {
    const out = new Set();
    String(ans || '').split(/\s+\/\s+|\s*;\s*/).forEach(alt => {
      let list = [''];
      alt.split(/(\([^)]*\))/).forEach(part => {
        if (/^\(.*\)$/.test(part)) { const o = part.slice(1, -1); list = list.flatMap(x => [x, /\S$/.test(x) ? x + o : x + ' ' + o + ' ']); }
        else list = list.map(x => x + part);
      });
      list.forEach(x => out.add(norm(x)));
    });
    return [...out].filter(Boolean);
  }

  const cats = DATA.groups.flatMap(g => g.cats.map(c => ({ ...c, group: g.name })));
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { progress = {}; }
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(progress)); } catch {} };
  let cur = Math.max(0, cats.findIndex(c => c.id === new URLSearchParams(location.search).get('cat')));

  function sidebar() {
    const term = $('#searchInput').value.trim().toLowerCase();
    const host = $('#catList');
    host.innerHTML = '';
    let lastG = '';
    cats.forEach((c, i) => {
      const text = (c.id + ' ' + c.en + ' ' + c.zh + ' ' + c.rows.map(r => r.pattern).join(' ')).toLowerCase();
      if (term && !text.includes(term)) return;
      if (c.group !== lastG) { const h = document.createElement('div'); h.className = 'p4-group'; h.textContent = c.group; host.appendChild(h); lastG = c.group; }
      const done = c.questions.filter(q => progress[q.id]).length;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'p4-cat' + (i === cur ? ' active' : '');
      b.innerHTML = `<span><b>${esc(c.id)}</b> ${esc(c.en)}<em>${esc(c.zh)}</em></span><small class="${done && done === c.questions.length ? 'done' : ''}">${done}/${c.questions.length}</small>`;
      b.addEventListener('click', () => { cur = i; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      host.appendChild(b);
    });
    $('#countPill').textContent = cats.reduce((n, c) => n + c.questions.length, 0);
  }

  function render() {
    const c = cats[cur];
    sidebar();
    if (!c) return;
    $('#catMeta').textContent = `FCE Use of English Part 4 · ${c.group}`;
    $('#catTitle').textContent = `${c.id}  ${c.en}`;
    $('#catZh').textContent = c.zh;
    $('#grid').innerHTML = c.rows.length ? `<table class="p4-grid"><thead><tr><th>常考句型 Pattern</th><th>例句 Examples</th></tr></thead><tbody>${
      c.rows.map(r => `<tr><td>${r.pattern.split('\n').filter(x => x.trim()).map(x => `<div>${bold(x)}</div>`).join('')}</td><td>${
        r.examples.map(x => `<div class="ex">${bold(x)}</div>`).join('')}</td></tr>`).join('')}</tbody></table>` : '';
    $('#qCount').textContent = `Questions 練習題 (${c.questions.length})`;
    $('#questions').innerHTML = c.questions.map((q, k) => {
      const parts = esc(q.second).split(/_{3,}/);
      const input = `<input class="p4-input" id="in-${esc(q.id)}" data-q="${esc(q.id)}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Answer ${k + 1}">`;
      return `<div class="p4-q" id="q-${esc(q.id)}"><div class="p4-first"><b>${k + 1}</b> ${esc(q.first)}</div>
        <div class="p4-key">${esc(q.key)}</div>
        <div class="p4-second">${parts.length > 1 ? parts[0] + input + parts.slice(1).join('') : esc(q.second) + ' ' + input}</div>
        <div class="p4-actions"><button class="small-button" type="button" data-check="${esc(q.id)}">Check 對答案</button>
        <button class="small-button" type="button" data-show="${esc(q.id)}">Answer 看解答</button><span class="p4-count" id="wc-${esc(q.id)}"></span></div>
        <div class="p4-result" id="res-${esc(q.id)}" hidden></div></div>`;
    }).join('');
    c.questions.forEach(q => {
      const el = document.getElementById('in-' + q.id);
      el.addEventListener('input', () => { const n = el.value.trim() ? el.value.trim().split(/\s+/).length : 0; document.getElementById('wc-' + q.id).textContent = n ? `${n} word${n > 1 ? 's' : ''}` : ''; });
      el.addEventListener('keydown', e => { if (e.key === 'Enter') check(q, false); });
    });
    document.querySelectorAll('[data-check]').forEach(b => b.addEventListener('click', () => check(c.questions.find(q => q.id === b.dataset.check), false)));
    document.querySelectorAll('[data-show]').forEach(b => b.addEventListener('click', () => check(c.questions.find(q => q.id === b.dataset.show), true)));
    $('#prevButton').disabled = cur === 0;
    $('#nextButton').disabled = cur === cats.length - 1;
    const url = new URL(location.href); url.searchParams.set('cat', c.id); history.replaceState(null, '', url);
  }

  function check(q, reveal) {
    const el = document.getElementById('in-' + q.id);
    const res = document.getElementById('res-' + q.id);
    const v = norm(el.value);
    const ok = !!v && q.answers.some(a => variants(a).includes(v));
    const words = el.value.trim() ? el.value.trim().split(/\s+/).length : 0;
    const keyUsed = norm(el.value).split(' ').includes(norm(q.key));
    let tip = '';
    if (!reveal && !ok && v) {
      if (!keyUsed) tip = `Use the key word <b>${esc(q.key)}</b> without changing it. 必須使用關鍵字且不可變形。`;
      else if (words < 2 || words > 5) tip = 'Use 2–5 words, including the key word. 須填 2–5 個字（含關鍵字）。';
      else tip = 'Not quite — compare with the model answer. 再比較一下參考答案。';
    }
    el.classList.toggle('ok', ok); el.classList.toggle('bad', !ok && !reveal && !!v);
    res.hidden = false;
    res.className = 'p4-result ' + (ok ? 'ok' : reveal ? 'shown' : 'bad');
    res.innerHTML = `${ok ? '<b class="v">✓ Correct!</b> ' : reveal ? '' : '<b class="v">✗</b> '}${tip ? tip + '<br>' : ''}<span>Answer: <b>${q.answers.map(esc).join('</b> / <b>')}</b></span>`;
    if (ok) { progress[q.id] = 1; save(); sidebar(); }
  }

  $('#searchInput').addEventListener('input', sidebar);
  $('#prevButton').addEventListener('click', () => { if (cur > 0) { cur--; render(); window.scrollTo({ top: 0 }); } });
  $('#nextButton').addEventListener('click', () => { if (cur < cats.length - 1) { cur++; render(); window.scrollTo({ top: 0 }); } });
  render();
})();
