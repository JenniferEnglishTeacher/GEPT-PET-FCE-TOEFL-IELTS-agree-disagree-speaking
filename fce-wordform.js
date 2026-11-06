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

  function render() {
    const f = DATA[cur];
    sidebar();
    if (!f) return;
    $('#famTitle').textContent = `${cur + 1}. ${f.fam}`;
    $('#members').innerHTML = f.members.map(m => `<div class="wf-mem"><b>${esc(m.form)}</b> <i>${esc(m.pos)}</i><span>${esc(m.zh)}</span></div>`).join('');
    $('#items').innerHTML = f.items.map((it, k) => {
      const m = it.sentence.match(/^(.*?)_{2,}\s*\(\s*([^)]+?)\s*\)(.*)$/s);
      const inp = `<input class="p4-input wf-in" id="in-${esc(it.id)}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Answer ${k + 1}">`;
      const body = m ? `${esc(m[1])}${inp} <span class="uoe-stem">${esc(m[2])}</span>${esc(m[3])}` : esc(it.sentence) + ' ' + inp;
      return `<div class="p4-q"><div class="p4-second wf-s"><b class="wf-n">${k + 1}</b> ${body}</div>
        <div class="p4-actions"><button class="small-button" type="button" data-check="${esc(it.id)}">Check 對答案</button>
        <button class="small-button" type="button" data-show="${esc(it.id)}">Answer 看解答</button></div>
        <div class="p4-result" id="res-${esc(it.id)}" hidden></div></div>`;
    }).join('');
    f.items.forEach(it => document.getElementById('in-' + it.id).addEventListener('keydown', e => { if (e.key === 'Enter') check(it, false); }));
    document.querySelectorAll('[data-check]').forEach(b => b.addEventListener('click', () => check(f.items.find(i => i.id === b.dataset.check), false)));
    document.querySelectorAll('[data-show]').forEach(b => b.addEventListener('click', () => check(f.items.find(i => i.id === b.dataset.show), true)));
    $('#prevButton').disabled = cur === 0;
    $('#nextButton').disabled = cur === DATA.length - 1;
    const url = new URL(location.href); url.searchParams.set('fam', f.fam); history.replaceState(null, '', url);
  }

  function check(it, reveal) {
    const el = document.getElementById('in-' + it.id);
    const res = document.getElementById('res-' + it.id);
    const answers = String(it.answer).split(/\s*\/\s*/).map(norm);
    const v = norm(el.value);
    const ok = !!v && answers.includes(v);
    el.classList.toggle('ok', ok); el.classList.toggle('bad', !ok && !reveal && !!v);
    if (reveal && !ok) el.value = String(it.answer).split(/\s*\/\s*/)[0];
    res.hidden = false;
    res.className = 'p4-result ' + (ok ? 'ok' : reveal ? 'shown' : 'bad');
    res.innerHTML = `${ok ? '<b class="v">✓ Correct!</b> ' : reveal ? '' : '<b class="v">✗ Try again.</b> '}Answer: <b>${esc(it.answer)}</b>${it.note ? `<div class="wf-note">${esc(it.note)}</div>` : ''}`;
    if (ok) { progress[it.id] = 1; save(); sidebar(); }
  }

  $('#searchInput').addEventListener('input', sidebar);
  $('#prevButton').addEventListener('click', () => { if (cur > 0) { cur--; render(); window.scrollTo({ top: 0 }); } });
  $('#nextButton').addEventListener('click', () => { if (cur < DATA.length - 1) { cur++; render(); window.scrollTo({ top: 0 }); } });
  render();
})();
