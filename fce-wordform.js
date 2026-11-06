/* 詞類變化 word formation — single sentences grouped by word family.
   Data: window.FCE_WF = [{ fam, members: [{form,pos,zh}], items: [{id, sentence "… ____ (stem) …", stem, answer "a / b", note}] }] */
(function () {
  const DATA = window.FCE_WF || [];
  const STORE = 'fce-wordform-progress';
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => String(s || '').trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ');
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { progress = {}; }
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(progress)); } catch {} };
  const want = new URLSearchParams(location.search).get('fam');
  let cur = Math.max(0, DATA.findIndex(f => f.fam === want));

  function sidebar() {
    const term = norm($('#searchInput').value);
    const host = $('#famList');
    host.innerHTML = '';
    let letter = '';
    DATA.forEach((f, i) => {
      const text = (f.fam + ' ' + f.members.map(m => m.form + ' ' + m.zh).join(' ')).toLowerCase();
      if (term && !text.includes(term)) return;
      const L = f.fam[0].toUpperCase();
      if (L !== letter && !term) { const h = document.createElement('div'); h.className = 'p4-group'; h.textContent = L; host.appendChild(h); letter = L; }
      const done = f.items.filter(it => progress[it.id]).length;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'p4-cat' + (i === cur ? ' active' : '');
      b.innerHTML = `<span><b>${esc(f.fam)}</b><em>${esc(f.members.slice(0, 3).map(m => m.form).join(' · '))}</em></span><small class="${done === f.items.length ? 'done' : ''}">${done}/${f.items.length}</small>`;
      b.addEventListener('click', () => { cur = i; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      host.appendChild(b);
    });
    $('#countPill').textContent = DATA.reduce((n, f) => n + f.items.length, 0);
  }

  // ---- pronunciation ----
  let voice = null;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang));
    voice = vs.find(v => /en[-_]US/i.test(v.lang) && /Google|Samantha|Aria|Jenny|Natural/i.test(v.name)) || vs.find(v => /en[-_]US/i.test(v.lang)) || vs[0] || null;
  }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.addEventListener?.('voiceschanged', pickVoice); }
  function speak(text, el) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.85; if (voice) u.voice = voice;
    if (el) { el.classList.add('speaking'); u.onend = u.onerror = () => el.classList.remove('speaking'); }
    speechSynthesis.speak(u);
  }

  // ---- tap-to-fill state ----
  let selWord = null;   // word chosen in the bank
  let armed = null;     // blank tapped before choosing a word
  let filled = {};      // item id -> word

  function bankWords(f) {
    const seen = new Map();
    const add = w => { const k = norm(w); if (k && !seen.has(k)) seen.set(k, w.toLowerCase() === w ? w : w.toLowerCase()); };
    f.members.forEach(m => add(m.form));
    f.items.forEach(it => {
      const alts = String(it.answer).split(/\s*\/\s*/);
      if (!alts.some(a => seen.has(norm(a)))) add(alts[0]);
    });
    return [...seen.values()].sort((a, b) => a.localeCompare(b));
  }

  function display(it, w) {
    // match capitalisation of the expected answer (e.g. sentence-initial "Absolutely")
    const a = String(it.answer);
    return a[0] && a[0] !== a[0].toLowerCase() ? w[0].toUpperCase() + w.slice(1) : w;
  }

  function paintBank() {
    document.querySelectorAll('.wf-chip').forEach(c => c.classList.toggle('sel', c.dataset.w === selWord));
    document.querySelectorAll('.wf-blank').forEach(b => b.classList.toggle('armed', b.dataset.id === armed));
  }

  function fill(it, w) {
    const b = document.getElementById('in-' + it.id);
    const res = document.getElementById('res-' + it.id);
    b.classList.remove('ok', 'bad'); res.hidden = true;
    if (w == null) { delete filled[it.id]; b.textContent = '\u00a0'; b.classList.remove('filled'); }
    else { filled[it.id] = display(it, w); b.textContent = filled[it.id]; b.classList.add('filled'); }
  }

  function render() {
    const f = DATA[cur];
    sidebar();
    if (!f) return;
    selWord = null; armed = null; filled = {};
    $('#famTitle').textContent = `${cur + 1}. ${f.fam}`;
    $('#members').innerHTML = f.members.map(m => `<button type="button" class="wf-mem" data-say="${esc(m.form)}" title="Listen 聽發音"><b>${esc(m.form)}</b> <i>${esc(m.pos)}</i><span>${esc(m.zh)}</span></button>`).join('');
    document.querySelectorAll('.wf-mem').forEach(b => b.addEventListener('click', () => speak(b.dataset.say, b)));
    $('#bank').innerHTML = bankWords(f).map(w => `<button type="button" class="wf-chip" data-w="${esc(w)}">${esc(w)}</button>`).join('');
    $('#items').innerHTML = f.items.map((it, k) => {
      const m = it.sentence.match(/^(.*?)_{2,}\s*\(\s*([^)]+?)\s*\)(.*)$/s);
      const inp = `<button type="button" class="wf-blank" id="in-${esc(it.id)}" data-id="${esc(it.id)}" aria-label="Blank ${k + 1}">&nbsp;</button>`;
      const body = m ? `${esc(m[1])}${inp} <span class="uoe-stem">${esc(m[2])}</span>${esc(m[3])}` : esc(it.sentence) + ' ' + inp;
      return `<div class="p4-q"><div class="p4-second wf-s"><b class="wf-n">${k + 1}</b> ${body}</div>
        <div class="p4-actions"><button class="small-button" type="button" data-check="${esc(it.id)}">Check 對答案</button>
        <button class="small-button" type="button" data-show="${esc(it.id)}">Answer 看解答</button></div>
        <div class="p4-result" id="res-${esc(it.id)}" hidden></div></div>`;
    }).join('');
    const byId = id => f.items.find(i => i.id === id);
    document.querySelectorAll('.wf-chip').forEach(c => c.addEventListener('click', () => {
      const w = c.dataset.w;
      if (armed) { fill(byId(armed), w); armed = null; selWord = null; }
      else selWord = selWord === w ? null : w;
      paintBank();
    }));
    document.querySelectorAll('.wf-blank').forEach(b => b.addEventListener('click', () => {
      const it = byId(b.dataset.id);
      if (selWord) { fill(it, selWord); selWord = null; armed = null; }
      else if (filled[it.id]) { fill(it, null); armed = null; }
      else armed = armed === it.id ? null : it.id;
      paintBank();
    }));
    document.querySelectorAll('[data-check]').forEach(b => b.addEventListener('click', () => check(byId(b.dataset.check), false)));
    document.querySelectorAll('[data-show]').forEach(b => b.addEventListener('click', () => check(byId(b.dataset.show), true)));
    $('#prevButton').disabled = cur === 0;
    $('#nextButton').disabled = cur === DATA.length - 1;
    const url = new URL(location.href); url.searchParams.set('fam', f.fam); history.replaceState(null, '', url);
  }

  function check(it, reveal) {
    const el = document.getElementById('in-' + it.id);
    const res = document.getElementById('res-' + it.id);
    const answers = String(it.answer).split(/\s*\/\s*/).map(norm);
    const v = norm(filled[it.id]);
    const ok = !!v && answers.includes(v);
    if (reveal && !ok) { filled[it.id] = String(it.answer).split(/\s*\/\s*/)[0]; el.textContent = filled[it.id]; el.classList.add('filled'); }
    el.classList.toggle('ok', ok); el.classList.toggle('bad', !ok && !reveal && !!v);
    res.hidden = false;
    res.className = 'p4-result ' + (ok ? 'ok' : reveal ? 'shown' : 'bad');
    res.innerHTML = `${ok ? '<b class="v">✓ Correct!</b> ' : reveal ? '' : v ? '<b class="v">✗ Try again.</b> ' : '<b class="v">Choose a word first. 請先選字。</b> '}${ok || reveal ? `Answer: <b>${esc(it.answer)}</b>${it.note ? `<div class="wf-note">${esc(it.note)}</div>` : ''}` : ''}`;
    if (ok) { progress[it.id] = 1; save(); sidebar(); }
  }

  $('#searchInput').addEventListener('input', sidebar);
  $('#prevButton').addEventListener('click', () => { if (cur > 0) { cur--; render(); window.scrollTo({ top: 0 }); } });
  $('#nextButton').addEventListener('click', () => { if (cur < DATA.length - 1) { cur++; render(); window.scrollTo({ top: 0 }); } });
  render();
})();
