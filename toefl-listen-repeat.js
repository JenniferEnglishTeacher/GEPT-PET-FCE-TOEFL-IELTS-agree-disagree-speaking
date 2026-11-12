/* TOEFL Speaking Task 1 — Listen and Repeat practice
   Data: window.TOEFL_LR = [{n, adv, v, s:[[startSec, en, zh], ...]}]
   Storage: toefl-lr-wrong (saved 錯題), toefl-lr-best (best score per sentence), toefl-lr-last */
(function () {
  'use strict';
  const SETS = (window.TOEFL_LR || []).slice().sort((a, b) => a.n - b.n);
  const label = s => s.name || String(s.n);
  const $ = s => document.querySelector(s);
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  let wrong = LS.get('toefl-lr-wrong', []);          // ["348-2", ...]
  let best = LS.get('toefl-lr-best', {});            // {"348-2-repeat": 85}
  const state = { filter: 'all', mode: 'repeat', setIdx: 0, q: 0, items: [], results: {} };

  /* ---------- text helpers ---------- */
  const ONES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const TENS = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  function numWords(n) {
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
    if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numWords(n % 100) : '');
    if (n < 10000) return numWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + numWords(n % 1000) : '');
    return String(n);
  }
  const ORD = { '1st': 'first', '2nd': 'second', '3rd': 'third', '4th': 'fourth', '5th': 'fifth', '6th': 'sixth', '7th': 'seventh', '8th': 'eighth', '9th': 'ninth', '10th': 'tenth' };
  // normalise one word for comparison
  function key(w) {
    w = w.toLowerCase().replace(/[’‘`]/g, "'").replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '');
    if (ORD[w]) return ORD[w];
    if (w === 'ok') return 'okay';
    if (w === 'percent' || w === '%') return 'percent';
    return w;
  }
  // split a sentence into comparable tokens (numbers become words, times split)
  function tokens(text) {
    const out = [];
    text.replace(/(\d+):(\d\d)/g, (m, h, mm) => h + ' ' + (mm === '00' ? "o'clock" : mm))
      .replace(/%/g, ' percent').replace(/&/g, ' and ').replace(/[—–-]/g, ' ')
      .split(/\s+/).forEach(raw => {
        const k = key(raw);
        if (!k) return;
        if (/^\d+$/.test(k)) numWords(+k).split(' ').forEach(x => out.push(x));
        else out.push(k.replace(/'s$/, "'s"));
      });
    return out;
  }
  const eq = (a, b) => a === b || a.replace(/'/g, '') === b.replace(/'/g, '') || (a + 's' === b) || (b + 's' === a);

  /* Word-level LCS: which displayed words of the target were said correctly */
  function compare(target, said) {
    const disp = target.split(/\s+/).filter(Boolean);
    // map displayed word -> token positions
    const tgt = []; const owner = [];
    disp.forEach((d, i) => tokens(d).forEach(t => { tgt.push(t); owner.push(i); }));
    const sd = tokens(said);
    const n = tgt.length, m = sd.length;
    const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
      dp[i][j] = eq(tgt[i], sd[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const hit = new Array(n).fill(false); const usedSaid = new Array(m).fill(false);
    let i = 0, j = 0;
    while (i < n && j < m) {
      if (eq(tgt[i], sd[j])) { hit[i] = true; usedSaid[j] = true; i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
    }
    const wordOk = disp.map(() => true);
    hit.forEach((h, k) => { if (!h) wordOk[owner[k]] = false; });
    const okCount = wordOk.filter(Boolean).length;
    const extras = sd.filter((_, k) => !usedSaid[k]);
    return { disp, wordOk, pct: disp.length ? Math.round(okCount / disp.length * 100) : 0, extras };
  }

  /* 3 key words per sentence: the longest content words, kept in sentence order */
  const STOP = new Set('a an the and or but if so to of in on at by for from with as is are was were be been being am do does did have has had will would can could should may might must shall this that these those there here it its it\'s they them their we our you your he she his her him i me my not no yes all any some each every than then into onto about over after before up out off very also just only more most much many such please our us what which who whom whose when where why how'.split(' '));
  function keyWords(en) {
    const words = en.split(/\s+/);
    const cand = [];
    words.forEach((w, i) => {
      const core = w.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, '');
      const k = core.toLowerCase();
      if (core.length >= 3 && !STOP.has(k) && !/^\d/.test(core)) cand.push({ i, core, len: core.length });
    });
    if (cand.length < 3) words.forEach((w, i) => {
      const core = w.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, '');
      if (core.length >= 2 && !cand.some(c => c.i === i)) cand.push({ i, core, len: core.length / 10 });
    });
    return cand.sort((a, b) => b.len - a.len || a.i - b.i).slice(0, 3).sort((a, b) => a.i - b.i);
  }

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- audio ---------- */
  let voice = null;
  function pickVoice() {
    const vs = speechSynthesis.getVoices().filter(v => /^en[-_]US/i.test(v.lang));
    voice = vs.find(v => /Google US English/i.test(v.name)) || vs.find(v => /Samantha|Aria|Jenny|Guy|Natural/i.test(v.name)) || vs[0] || null;
  }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speakTTS(text, done) {
    if (!('speechSynthesis' in window)) { alert('This browser cannot play the AI voice. 請改用「Original video」。'); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; if (voice) u.voice = voice;
    u.rate = +$('#rate').value;
    u.onend = () => done && done();
    speechSynthesis.speak(u);
  }
  // YouTube original audio
  let yt = null, ytReady = false, ytVid = null, ytStopTimer = null, ytQueue = null;
  function loadYT() {
    if (window.YT && window.YT.Player) return makePlayer();
    if (document.getElementById('ytApi')) return;
    const s = document.createElement('script'); s.id = 'ytApi'; s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
    window.onYouTubeIframeAPIReady = makePlayer;
  }
  function makePlayer() {
    if (yt) return;
    $('#ytBox').hidden = false;
    yt = new YT.Player('ytPlayer', {
      width: 320, height: 180, playerVars: { playsinline: 1, controls: 0, rel: 0 },
      events: {
        onReady: () => { ytReady = true; if (ytQueue) { const q = ytQueue; ytQueue = null; playYT(q.vid, q.start, q.dur, q.done); } },
        onStateChange: e => { if (e.data === YT.PlayerState.PLAYING && ytStopTimer === null && ytQueue === null) {} }
      }
    });
  }
  function playYT(vid, start, dur, done) {
    if (!ytReady) { ytQueue = { vid, start, dur, done }; loadYT(); return; }
    clearTimeout(ytStopTimer);
    const rate = +$('#rate').value;
    if (ytVid !== vid) { yt.loadVideoById({ videoId: vid, startSeconds: start }); ytVid = vid; }
    else { yt.seekTo(start, true); yt.playVideo(); }
    try { yt.setPlaybackRate(rate); } catch {}
    ytStopTimer = setTimeout(() => { yt.pauseVideo(); ytStopTimer = null; done && done(); }, (dur / rate) * 1000 + 600);
  }
  function play(item, done) {
    if ($('#voiceSrc').value === 'yt' && item.v && item.t != null) {
      const words = item.en.split(/\s+/).length;
      playYT(item.v, Math.max(0, item.t - 0.3), Math.min(9, 1.0 + words * 0.36), done);
    } else speakTTS(item.en, done);
  }

  let actx = null;
  function beep() {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain();
      o.frequency.value = 880; g.gain.value = 0.15; o.connect(g); g.connect(actx.destination);
      o.start(); o.stop(actx.currentTime + 0.25);
    } catch {}
  }

  /* ---------- speech recognition ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null, recOn = false;
  function startRec(onLive, onEnd) {
    if (!SR) return false;
    rec = new SR(); rec.lang = 'en-US'; rec.interimResults = true; rec.continuous = true; rec.maxAlternatives = 1;
    let finalText = '', lastInterim = '', silence = null, hardStop = setTimeout(() => stopRec(), 16000);
    rec.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += ' ' + e.results[i][0].transcript; else interim += e.results[i][0].transcript;
      }
      lastInterim = interim;
      onLive((finalText + ' ' + interim).trim());
      clearTimeout(silence); silence = setTimeout(() => stopRec(), 2600);
    };
    rec.onerror = ev => { if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') alert('Microphone blocked. 請允許麥克風,或按「Type it」改用打字。'); };
    rec.onend = () => { clearTimeout(silence); clearTimeout(hardStop); recOn = false; onEnd((finalText + ' ' + lastInterim).trim()); };
    try { rec.start(); recOn = true; } catch { return false; }
    return true;
  }
  function stopRec() { if (rec && recOn) { try { rec.stop(); } catch {} } }

  /* ---------- items ---------- */
  function setItems(set) {
    return set.s.map((r, i) => ({ id: set.n + '-' + (i + 1), n: set.n, lab: label(set), i: i + 1, t: r[0], en: r[1], zh: r[2], v: set.v, adv: set.adv }));
  }
  function wrongItems() {
    const out = [];
    wrong.forEach(id => {
      const k = id.lastIndexOf('-'); const n = Number(id.slice(0, k)), i = Number(id.slice(k + 1));
      const set = SETS.find(s => s.n === n);
      if (set && set.s[i - 1]) out.push(setItems(set)[i - 1]);
    });
    return out;
  }
  function isSaved(id) { return wrong.includes(id); }
  function toggleSave(id) {
    if (isSaved(id)) wrong = wrong.filter(x => x !== id); else wrong.push(id);
    LS.set('toefl-lr-wrong', wrong);
    $('#wrongCount').textContent = wrong.length;
    if (state.filter === 'wrong') renderList();
  }
  function recordBest(id, mode, pct) {
    const k = id + '-' + mode;
    if (best[k] == null || pct > best[k]) { best[k] = pct; LS.set('toefl-lr-best', best); }
  }
  function setDone(set) {
    return set.s.every((_, i) => best[set.n + '-' + (i + 1) + '-repeat'] >= 80 || best[set.n + '-' + (i + 1) + '-type'] === 100);
  }

  /* ---------- sidebar ---------- */
  function visibleSets() {
    const term = $('#find').value.trim().toLowerCase();
    return SETS.filter(s => (state.filter !== 'adv' || s.adv) &&
      (!term || label(s).toLowerCase() === term.replace('#', '') || s.s.some(r => r[1].toLowerCase().includes(term) || (r[2] || '').includes(term))));
  }
  function renderList() {
    const ol = $('#setList'); ol.innerHTML = '';
    if (state.filter === 'wrong') {
      const li = document.createElement('li');
      li.innerHTML = `<button type="button" aria-current="true"><span>📕 錯題本 Saved sentences</span><span class="badge">${wrong.length}</span></button>`;
      li.firstChild.onclick = () => openWrong();
      ol.appendChild(li);
      return;
    }
    let lastGrp = null;
    visibleSets().forEach(s => {
      const g = Math.floor((Math.floor(s.n) - 1) / 50);
      if (g !== lastGrp) { lastGrp = g; const h = document.createElement('li'); h.className = 'grp'; h.textContent = `#${g * 50 + 1}–${g * 50 + 50}`; ol.appendChild(h); }
      const li = document.createElement('li');
      const cur = state.items.length && state.items[0].n === s.n && state.filter !== 'wrong';
      li.innerHTML = `<button type="button"${cur ? ' aria-current="true"' : ''}><span>Practice #${label(s)}${s.adv ? ' ⭐' : ''}</span><span class="badge">${setDone(s) ? '✓' : ''}</span></button>`;
      li.firstChild.onclick = () => { openSet(SETS.indexOf(s)); closeMenu(); };
      ol.appendChild(li);
    });
    const curBtn = ol.querySelector('[aria-current="true"]'); if (curBtn) curBtn.scrollIntoView({ block: 'nearest' });
  }

  /* ---------- open ---------- */
  function openSet(idx) {
    state.setIdx = Math.max(0, Math.min(SETS.length - 1, idx));
    const set = SETS[state.setIdx];
    state.items = setItems(set); state.q = 0; state.results = {}; state.wrongMode = false;
    $('#setTitle').textContent = `Practice #${label(set)}${set.adv ? ' ⭐ Advanced' : ''}`;
    $('#setSub').textContent = `${set.s.length} sentences · 聽一次,然後完整複述 · Listen once, then repeat exactly`;
    LS.set('toefl-lr-last', set.n);
    history.replaceState(null, '', '#' + label(set));
    renderList(); render();
  }
  function openWrong() {
    state.items = wrongItems(); state.q = 0; state.results = {}; state.wrongMode = true;
    $('#setTitle').textContent = '📕 錯題本 Saved Sentences';
    $('#setSub').textContent = state.items.length ? `${state.items.length} saved sentences · 答對後可按 ★ 移出錯題本` : '';
    render(); closeMenu();
  }

  /* ---------- render ---------- */
  function render() {
    const box = $('#practice');
    if (!state.items.length) {
      box.innerHTML = `<div class="empty">${state.wrongMode ? '錯題本是空的。練習時按 <b>★ Save 錯題</b> 收藏難句。<br>No saved sentences yet — press ★ Save during practice.' : 'No sentences.'}</div>`;
      return;
    }
    if (state.mode === 'read') return renderRead(box);
    const dots = state.items.map((it, k) => {
      const r = state.results[k + state.mode];
      const cls = ['', k === state.q ? 'cur' : '', r == null ? '' : r >= (state.mode === 'type' ? 100 : 80) ? 'good' : 'bad'].join(' ');
      return `<button type="button" class="${cls}" data-k="${k}" aria-label="Sentence ${k + 1}">${k + 1}</button>`;
    }).join('');
    box.innerHTML = `<div class="dots">${dots}</div><div class="card" id="card"></div><div id="sum"></div>`;
    box.querySelectorAll('.dots button').forEach(b => b.onclick = () => { stopRec(); state.q = +b.dataset.k; render(); });
    if (state.mode === 'repeat') renderRepeat(); else renderType();
    renderSummary();
  }
  function head(it) {
    return `<div class="qnum"><span>Sentence ${state.q + 1} / ${state.items.length}${state.wrongMode ? ` <span class="level">· from #${it.lab}</span>` : ''}</span><span class="level">${it.adv ? '⭐ Advanced' : ''}</span></div>`;
  }
  function starBtn(it) { return `<button type="button" class="btn star${isSaved(it.id) ? ' saved' : ''}" id="star">${isSaved(it.id) ? '★ Saved 已存錯題' : '☆ Save 錯題'}</button>`; }
  function nextBtn() { return state.q < state.items.length - 1 ? '<button type="button" class="btn alt" id="next">Next 下一題 →</button>' : (!state.wrongMode && state.setIdx < SETS.length - 1 ? '<button type="button" class="btn alt" id="nextSetBtn">Next set 下一組 →</button>' : ''); }
  function wireCommon(it) {
    $('#star').onclick = () => { toggleSave(it.id); $('#star').outerHTML = starBtn(it); wireStar(it); };
    const nx = $('#next'); if (nx) nx.onclick = () => { stopRec(); state.q++; render(); };
    const ns = $('#nextSetBtn'); if (ns) ns.onclick = () => openSet(state.setIdx + 1);
  }
  function wireStar(it) { $('#star').onclick = () => { toggleSave(it.id); $('#star').outerHTML = starBtn(it); wireStar(it); }; }

  function coloured(res) {
    return res.disp.map((w, k) => `<span class="w ${res.wordOk[k] ? 'ok' : 'miss'}">${esc(w)}</span>`).join(' ');
  }

  /* Listen & Repeat */
  function renderRepeat() {
    const it = state.items[state.q];
    const test = $('#testMode').checked;
    const showZh = $('#showZh').checked;
    const card = $('#card');
    card.innerHTML = head(it) +
      `<div class="target${test ? ' hidden-text' : ''}" id="tgt">${test ? 'Listen, then repeat the sentence. 先聽,再完整複述。' : esc(it.en)}</div>` +
      `<p class="zh" id="zh"${showZh && !test ? '' : ' hidden'}>${esc(it.zh || '')}</p>` +
      `<div class="btns">
        <button type="button" class="btn" id="listen">▶ Listen 聽</button>
        <button type="button" class="btn rec" id="speak"${SR ? '' : ' disabled title="Speech recognition not supported"'}>🎤 Speak 說</button>
        <button type="button" class="btn alt" id="typeit">⌨️ Type it 打字</button>
        <button type="button" class="btn alt" id="reveal">👀 Show 顯示句子</button>
        ${starBtn(it)} ${nextBtn()}
      </div>
      <div class="live" id="live"></div>
      <div id="typeBox" hidden><textarea class="typeit" id="typed" placeholder="Type exactly what you heard… 打出你聽到的句子"></textarea><div class="btns"><button type="button" class="btn" id="checkTyped">Check 檢查</button></div></div>
      <div id="res"></div>
      ${SR ? '' : '<p class="hint">This browser has no speech recognition — use Chrome / Edge / Safari, or press “Type it”. 此瀏覽器不支援語音辨識。</p>'}`;
    wireCommon(it);
    $('#listen').onclick = () => play(it, () => {
      if ($('#autoRec').checked && SR && !recOn && document.body.contains($('#speak'))) { beep(); setTimeout(() => $('#speak').click(), 450); }
    });
    $('#reveal').onclick = () => { $('#tgt').className = 'target'; $('#tgt').textContent = it.en; if ($('#showZh').checked || true) $('#zh').hidden = !it.zh; };
    $('#typeit').onclick = () => { $('#typeBox').hidden = false; $('#typed').focus(); };
    $('#checkTyped').onclick = () => showResult(it, $('#typed').value, true);
    $('#speak').onclick = () => {
      const b = $('#speak');
      if (recOn) { stopRec(); return; }
      speechSynthesis && speechSynthesis.cancel();
      $('#live').textContent = '🎙️ Listening… speak now 請開始說';
      const ok = startRec(t => { $('#live').textContent = '🎙️ ' + t; }, said => {
        b.classList.remove('on'); b.textContent = '🎤 Speak again 再說一次';
        $('#live').textContent = '';
        showResult(it, said, false);
      });
      if (ok) { b.classList.add('on'); b.textContent = '⏹ Stop 停止'; }
    };
  }
  function showResult(it, said, typed) {
    const res = compare(it.en, said || '');
    const k = state.q + 'repeat';
    state.results[k] = Math.max(state.results[k] || 0, res.pct);
    recordBest(it.id, 'repeat', res.pct);
    const cls = res.pct >= 80 ? 'good' : res.pct >= 50 ? 'mid' : 'low';
    const msg = res.pct === 100 ? 'Perfect! 完美!' : res.pct >= 80 ? 'Great — fix the red words. 很好,注意紅字。' : 'Listen again and try again. 再聽一次,再試一次。';
    $('#tgt').className = 'target'; $('#tgt').innerHTML = coloured(res);
    $('#zh').hidden = !it.zh;
    $('#res').innerHTML = `<div class="result"><span class="score ${cls}">${res.pct}%</span><b>${msg}</b>
      <div class="said">${typed ? 'You typed 你打的' : 'You said 你說的'}: “${esc(said || '(nothing heard 沒有聽到聲音)')}”</div>
      ${res.extras.length ? `<div class="said">Extra / wrong words 多說或說錯: <span class="extra">${esc(res.extras.join(' '))}</span></div>` : ''}
      <div class="btns"><button type="button" class="btn alt" id="again">🔁 Try again 再試一次</button></div></div>`;
    $('#again').onclick = () => { renderRepeat(); };
    if (res.pct < 80 && !isSaved(it.id)) $('#star').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 500, iterations: 2 });
    updateDots(); renderSummary();
  }

  /* Listen & Type 3 key words */
  function renderType() {
    const it = state.items[state.q];
    const kws = keyWords(it.en);
    const words = it.en.split(/\s+/);
    const html = words.map((w, i) => {
      const k = kws.find(x => x.i === i);
      if (!k) return esc(w);
      const pre = w.slice(0, w.indexOf(k.core)), post = w.slice(w.indexOf(k.core) + k.core.length);
      return `${esc(pre)}<input type="text" data-ans="${esc(k.core)}" style="width:${Math.max(5, k.core.length + 2)}ch" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="key word">${esc(post)}`;
    }).join(' ');
    $('#card').innerHTML = head(it) +
      `<p class="hint">Listen and type the 3 missing key words. 聽音檔,填入 3 個關鍵字。</p>
      <div class="blankline" id="bl">${html}</div>
      <p class="zh" id="zh"${$('#showZh').checked ? '' : ' hidden'}>${esc(it.zh || '')}</p>
      <div class="btns">
        <button type="button" class="btn" id="listen">▶ Listen 聽</button>
        <button type="button" class="btn" id="check">Check 檢查</button>
        <button type="button" class="btn alt" id="again">🔁 Try again 再試一次</button>
        ${starBtn(it)} ${nextBtn()}
      </div><div id="res"></div>`;
    wireCommon(it);
    const inputs = [...$('#bl').querySelectorAll('input')];
    $('#listen').onclick = () => { play(it); inputs[0] && inputs[0].focus(); };
    inputs.forEach((inp, k) => inp.addEventListener('keydown', e => { if (e.key === 'Enter') { if (inputs[k + 1]) inputs[k + 1].focus(); else $('#check').click(); } }));
    $('#again').onclick = () => {
      inputs.forEach(i => { if (i.classList.contains('wrong')) { i.value = ''; i.classList.remove('wrong'); } });
      $('#bl').querySelectorAll('.fix').forEach(f => f.remove());
      $('#res').innerHTML = ''; play(it);
    };
    $('#check').onclick = () => {
      $('#bl').querySelectorAll('.fix').forEach(f => f.remove());
      let right = 0;
      inputs.forEach(inp => {
        const ok = key(inp.value.trim()) === key(inp.dataset.ans);
        inp.classList.toggle('right', ok); inp.classList.toggle('wrong', !ok);
        if (ok) right++;
        else { const f = document.createElement('span'); f.className = 'fix'; f.textContent = '(' + inp.dataset.ans + ')'; inp.after(f); }
      });
      const pct = Math.round(right / inputs.length * 100);
      const k = state.q + 'type';
      state.results[k] = Math.max(state.results[k] || 0, pct);
      recordBest(it.id, 'type', pct);
      $('#zh').hidden = !it.zh;
      $('#res').innerHTML = `<div class="result"><span class="score ${pct === 100 ? 'good' : pct >= 60 ? 'mid' : 'low'}">${right} / ${inputs.length}</span><b>${pct === 100 ? 'All correct! 全對!' : '紅色是錯字,按 Try again 再聽再打。Red = wrong; press Try again.'}</b></div>`;
      if (pct < 100 && !isSaved(it.id)) $('#star').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 500, iterations: 2 });
      updateDots(); renderSummary();
    };
  }

  /* Read view */
  function renderRead(box) {
    box.innerHTML = `<table class="read-table"><tbody>${state.items.map((it, k) => `<tr><td>${k + 1}</td><td><div class="en">${esc(it.en)}</div><div class="zhc">${esc(it.zh || '')}</div></td><td style="width:90px;white-space:nowrap"><button type="button" data-k="${k}" class="pl" aria-label="Play">▶</button> <button type="button" data-k="${k}" class="sv" aria-label="Save" title="錯題">${isSaved(it.id) ? '★' : '☆'}</button></td></tr>`).join('')}</tbody></table>`;
    box.querySelectorAll('.pl').forEach(b => b.onclick = () => play(state.items[+b.dataset.k]));
    box.querySelectorAll('.sv').forEach(b => b.onclick = () => { toggleSave(state.items[+b.dataset.k].id); b.textContent = isSaved(state.items[+b.dataset.k].id) ? '★' : '☆'; });
  }

  function updateDots() {
    document.querySelectorAll('.dots button').forEach(b => {
      const k = +b.dataset.k, r = state.results[k + state.mode];
      b.classList.toggle('good', r != null && r >= (state.mode === 'type' ? 100 : 80));
      b.classList.toggle('bad', r != null && r < (state.mode === 'type' ? 100 : 80));
    });
  }
  function renderSummary() {
    const vals = state.items.map((_, k) => state.results[k + state.mode]).filter(v => v != null);
    const s = $('#sum'); if (!s) return;
    if (vals.length < state.items.length) { s.innerHTML = ''; return; }
    const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    s.innerHTML = `<div class="summary">Set finished 本組完成 — average accuracy 平均正確率 ${avg}%. Sentences in red dots: practise again or save to 錯題本.</div>`;
    if (!state.wrongMode) renderList();
  }

  /* ---------- controls ---------- */
  function closeMenu() { $('#side').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', 'false'); }
  $('#menuBtn').onclick = () => { const o = $('#side').classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', String(o)); };
  document.querySelectorAll('.side-tabs button').forEach(b => b.onclick = () => {
    state.filter = b.dataset.f;
    document.querySelectorAll('.side-tabs button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    if (state.filter === 'wrong') { openWrong(); renderList(); }
    else { renderList(); if (state.wrongMode) openSet(state.setIdx); }
  });
  $('#find').addEventListener('input', renderList);
  document.querySelectorAll('.modes button').forEach(b => b.onclick = () => {
    stopRec(); state.mode = b.dataset.mode;
    document.querySelectorAll('.modes button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
    render();
  });
  $('#prevSet').onclick = () => openSet(state.setIdx - 1);
  $('#nextSet').onclick = () => openSet(state.setIdx + 1);
  const saveOpts = () => LS.set('toefl-lr-opts', { zh: $('#showZh').checked, test: $('#testMode').checked, auto: $('#autoRec').checked, voice: $('#voiceSrc').value, rate: $('#rate').value });
  ['#showZh', '#testMode'].forEach(id => $(id).addEventListener('change', () => { saveOpts(); render(); }));
  $('#autoRec').addEventListener('change', saveOpts);
  ['#voiceSrc', '#rate'].forEach(id => $(id).addEventListener('change', () => { saveOpts(); if ($('#voiceSrc').value === 'yt') loadYT(); }));
  const opts = LS.get('toefl-lr-opts', null);
  if (opts) { $('#showZh').checked = !!opts.zh; $('#testMode').checked = opts.test !== false; $('#autoRec').checked = opts.auto !== false; $('#voiceSrc').value = opts.voice || 'tts'; $('#rate').value = opts.rate || '1'; if (opts.voice === 'yt') loadYT(); }

  $('#wrongCount').textContent = wrong.length;
  const h = decodeURIComponent(location.hash.slice(1));
  const want = h ? SETS.find(s => label(s) === h) : SETS.find(s => s.n === LS.get('toefl-lr-last', null));
  const idx = want ? SETS.indexOf(want) : -1;
  openSet(idx >= 0 ? idx : 0);
})();
window.addEventListener('hashchange', () => { const h = decodeURIComponent(location.hash.slice(1)); const i = (window.TOEFL_LR || []).slice().sort((a, b) => a.n - b.n).findIndex(s => (s.name || String(s.n)) === h); if (i >= 0) document.querySelectorAll('.set-list button')[0] && location.reload(); });
