/* IELTS Speaking Part 2 — Monologue practice */
(() => {
  const DATA = window.IELTS_PART2 || [];
  const $ = sel => document.querySelector(sel);
  const IELTS_BOT_URL = "https://chatgpt.com/g/g-2DNF8ArXs-grade-your-ielts-speaking";
  const BRANCH_COLORS = ["#176b5b", "#4265a0", "#ae4d45", "#8a6f24"];
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  const el = {
    search: $("#searchInput"), themeTabs: $("#themeTabs"), topicList: $("#topicList"), topicCount: $("#topicCount"),
    themeLabel: $("#themeLabel"), cueTitle: $("#cueTitle"), cueList: $("#cueList"), readCueBtn: $("#readCueBtn"),
    mindMap: $("#mindMap"), sample: $("#sampleAnswer"), scopeChips: $("#scopeChips"), rate: $("#rateSelect"),
    listenBtn: $("#listenBtn"), readAlongBtn: $("#readAlongBtn"), stopSampleBtn: $("#stopSampleBtn"),
    accuracyBox: $("#accuracyBox"), accuracyFill: $("#accuracyFill"), accuracyText: $("#accuracyText"), sampleStatus: $("#sampleStatus"),
    followUps: $("#followUpList"), notesGrid: $("#notesGrid"), prepBtn: $("#prepBtn"), prepStatus: $("#prepStatus"), clearNotesBtn: $("#clearNotesBtn"),
    timeSelect: $("#timeSelect"), timer: $("#timerDisplay"), timerFill: $("#timerFill"), recordBtn: $("#recordBtn"), stopBtn: $("#stopBtn"), resetBtn: $("#resetBtn"),
    speechStatus: $("#speechStatus"), audio: $("#audioPlayback"), transcript: $("#transcript"), stats: $("#statsText"),
    cleanBtn: $("#cleanBtn"), restoreBtn: $("#restoreBtn"), copyBtn: $("#copyBtn"), botBtn: $("#botBtn"), transcriptStatus: $("#transcriptStatus"),
  };

  const themes = ["All", ...new Set(DATA.map(d => d.theme))];
  let activeTheme = "All";
  let active = DATA[0];
  let scope = "all"; // "all" or paragraph index
  let wordSpans = []; // [{el, parts:[norm], para}]

  /* ---------- storage helpers ---------- */
  const store = {
    get(key, fallback) { try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} },
  };

  function setStatus(node, msg, kind = "") {
    node.innerHTML = msg;
    node.classList.remove("warning", "active");
    if (kind) node.classList.add(kind);
  }
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const plain = md => md.replace(/\*\*/g, "");
  const shortTheme = t => t.split(" & ")[0].replace("Social Media", "Social Media");

  /* ---------- word normalisation (for read-along matching) ---------- */
  const ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
  const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  function numWords(n) {
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
    if (n < 1000) return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + numWords(n % 100) : "");
    if (n < 10000) return numWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + numWords(n % 1000) : "");
    return String(n);
  }
  function normParts(raw) {
    let w = raw.toLowerCase().replace(/[’‘`]/g, "'").replace(/%/g, " percent").replace(/&/g, " and ")
      .replace(/\bcan't\b/g, "can not").replace(/\bwon't\b/g, "will not").replace(/n't\b/g, " not")
      .replace(/'re\b/g, " are").replace(/'ve\b/g, " have").replace(/'ll\b/g, " will").replace(/'m\b/g, " am").replace(/'d\b/g, " would");
    const out = [];
    w.split(/[\s\-–—\/]+/).forEach(piece => {
      piece = piece.replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "").replace(/^'+|'+$/g, "");
      if (!piece) return;
      if (/^\d+$/.test(piece) && piece.length <= 4) { numWords(Number(piece)).split(" ").forEach(x => out.push(x)); return; }
      out.push(piece);
    });
    return out;
  }
  const stem = w => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w);

  /* ---------- proper-noun list for transcript clean-up ---------- */
  const NOT_PROPER = new Set("i bear desert dome lodge wharf shorts threads reels jade nov oct qs nt d earth may will us it so march okay ok".split(" "));
  const properNouns = new Map();
  ["I", "English", "Chinese", "Mandarin", "Taiwanese", "Taiwan", "Taipei", "Japan", "Japanese", "Korea", "Korean", "America", "American", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "January", "February", "April", "June", "July", "August", "September", "October", "November", "December", "Christmas", "YouTube", "YouTuber", "Instagram", "TikTok", "Facebook", "ChatGPT", "AI", "MRT", "IELTS", "TV", "NBA", "GPS"].forEach(w => properNouns.set(w.toLowerCase(), w));
  (() => {
    // Harvest names from the sample texts, but only words that never appear in lowercase (avoids "Station", "Main", "Mountain"…).
    const corpus = DATA.flatMap(d => [d.title, ...d.sample, ...d.notes.map(n => n.text), ...d.followUps.flatMap(f => [f.q, f.a])]).map(plain);
    const lowerSeen = new Set((corpus.join(" ").match(/\b[a-z][a-z’']*/g) || []).map(w => w.toLowerCase()));
    corpus.forEach(text => text.split(/(?<=[.!?])\s+/).forEach(sentence => sentence.split(/\s+/).slice(1).forEach(tok => {
      const w = tok.replace(/^[^A-Za-z]+|[^A-Za-z’']+$/g, "").replace(/[’']s$/, "");
      const lw = w.toLowerCase();
      if (/^[A-Z][A-Za-z]+$/.test(w) && !lowerSeen.has(lw) && !NOT_PROPER.has(lw) && !properNouns.has(lw)) properNouns.set(lw, w);
    })));
  })();

  /* ---------- rendering ---------- */
  function filtered() {
    const q = el.search.value.trim().toLowerCase();
    return DATA.filter(d => (activeTheme === "All" || d.theme === activeTheme) &&
      [d.theme, d.themeZh, d.title, ...d.cues, ...d.notes.map(n => n.text), ...d.sample].join(" ").toLowerCase().includes(q));
  }

  function renderThemes() {
    el.themeTabs.innerHTML = "";
    themes.forEach(t => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "category-tab";
      b.textContent = t === "All" ? `All (${DATA.length})` : shortTheme(t);
      b.setAttribute("aria-pressed", String(t === activeTheme));
      b.addEventListener("click", () => {
        activeTheme = t; renderThemes(); renderTopics();
        const first = filtered()[0]; if (first && first !== active) select(first);
      });
      el.themeTabs.append(b);
    });
  }

  function renderTopics() {
    const list = filtered();
    el.topicCount.textContent = `${list.length} shown`;
    el.topicList.innerHTML = "";
    list.forEach(item => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "topic-button";
      b.setAttribute("aria-current", String(item === active));
      const s = document.createElement("span"); s.className = "set"; s.textContent = `${shortTheme(item.theme)} · ${item.setLabel}`;
      const t = document.createElement("span"); t.textContent = item.title.replace(/^Describe /, "").replace(/\.$/, "");
      t.style.textTransform = "none";
      b.append(s, t);
      b.addEventListener("click", () => { select(item); if (window.innerWidth <= 980) el.cueTitle.scrollIntoView({ behavior: "smooth", block: "start" }); });
      el.topicList.append(b);
    });
    if (!list.length) el.topicList.innerHTML = '<p class="hint">No matching cue cards.</p>';
  }

  function appendRich(parent, md, collect, paraIndex) {
    md.split(/(\*\*[^*]+\*\*)/).forEach(seg => {
      if (!seg) return;
      const bold = seg.startsWith("**") && seg.endsWith("**");
      const text = bold ? seg.slice(2, -2) : seg;
      const host = bold ? parent.appendChild(document.createElement("strong")) : parent;
      text.split(/(\s+)/).forEach(tok => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { host.append(tok); return; }
        if (!collect) { host.append(tok); return; }
        const span = document.createElement("span");
        span.className = "w"; span.textContent = tok;
        host.append(span);
        collect.push({ el: span, parts: normParts(tok), para: paraIndex });
      });
    });
  }

  function renderCue() {
    el.themeLabel.textContent = `${active.theme} ${active.themeZh} · ${active.setLabel}`;
    el.cueTitle.textContent = active.title;
    el.cueList.innerHTML = "";
    active.cues.forEach(c => { const li = document.createElement("li"); li.textContent = c; el.cueList.append(li); });
  }

  function renderMindMap() {
    el.mindMap.innerHTML = "";
    const center = document.createElement("div");
    center.className = "mm-center";
    center.textContent = active.title.replace(/^Describe /, "").replace(/\.$/, "").replace(/^./, c => c.toUpperCase());
    el.mindMap.append(center);
    active.notes.forEach((n, i) => {
      const box = document.createElement("div");
      box.className = "mm-branch"; box.style.setProperty("--c", BRANCH_COLORS[i % 4]);
      const m = n.label.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
      const h = document.createElement("h3");
      h.textContent = `${i + 1}. ${m ? m[1] : n.label}`;
      if (m) { const sm = document.createElement("small"); sm.textContent = m[2]; h.append(sm); }
      const ul = document.createElement("ul");
      n.text.split(/;\s+|\s+–\s+/).filter(Boolean).forEach(part => { const li = document.createElement("li"); li.textContent = part.trim(); ul.append(li); });
      box.append(h, ul);
      el.mindMap.append(box);
    });
  }

  function renderSample() {
    el.sample.innerHTML = "";
    wordSpans = [];
    active.sample.forEach((para, i) => {
      const p = document.createElement("p");
      p.dataset.para = i;
      appendRich(p, para, wordSpans, i);
      el.sample.append(p);
    });
    el.scopeChips.innerHTML = "";
    [["all", "Whole answer"], ...active.sample.map((_, i) => [String(i), `Paragraph ${i + 1}`])].forEach(([val, label]) => {
      const c = document.createElement("button");
      c.type = "button"; c.className = "chip"; c.textContent = label;
      c.setAttribute("aria-pressed", String(String(scope) === val));
      c.addEventListener("click", () => { stopSample(); scope = val; renderSampleScope(); });
      el.scopeChips.append(c);
    });
    renderSampleScope();
  }

  function renderSampleScope() {
    [...el.scopeChips.children].forEach(c => c.setAttribute("aria-pressed", String(c.textContent === (scope === "all" ? "Whole answer" : `Paragraph ${Number(scope) + 1}`))));
    [...el.sample.children].forEach(p => p.classList.toggle("dim", scope !== "all" && p.dataset.para !== String(scope)));
    wordSpans.forEach(w => w.el.classList.remove("ok", "miss", "speaking"));
    el.accuracyBox.hidden = true;
  }
  const scopedSpans = () => (scope === "all" ? wordSpans : wordSpans.filter(w => String(w.para) === String(scope)));

  function renderFollowUps() {
    el.followUps.innerHTML = "";
    (active.followUps || []).forEach((f, i) => {
      const box = document.createElement("div"); box.className = "fu";
      const h = document.createElement("h3"); h.textContent = `Q${i + 1}. ${f.q}`;
      const btn = document.createElement("button"); btn.type = "button"; btn.className = "ghost-button"; btn.textContent = "🔈 Listen";
      btn.addEventListener("click", () => speakText(`${f.q} ${plain(f.a)}`));
      h.append(btn);
      const p = document.createElement("p"); appendRich(p, f.a, null);
      box.append(h, p); el.followUps.append(box);
    });
  }

  function renderNotes() {
    const saved = store.get(`ielts-p2-notes-${active.id}`, {});
    el.notesGrid.innerHTML = "";
    active.cues.forEach((cue, i) => {
      const row = document.createElement("div"); row.className = "note-row";
      const id = `note-${i}`;
      const label = document.createElement("label"); label.htmlFor = id;
      label.textContent = cue.replace(/^and /, "").replace(/\.$/, "").replace(/^./, c => c.toUpperCase());
      const sub = document.createElement("span"); sub.textContent = `Stage ${i + 1}`; label.append(sub);
      const ta = document.createElement("textarea"); ta.id = id; ta.rows = 2;
      ta.placeholder = "key words / ideas…";
      ta.value = saved[i] || "";
      ta.addEventListener("input", () => { const all = store.get(`ielts-p2-notes-${active.id}`, {}); all[i] = ta.value; store.set(`ielts-p2-notes-${active.id}`, all); });
      row.append(label, ta); el.notesGrid.append(row);
    });
  }

  function select(item) {
    stopSample(); if (rec.mode === "speak") stopSpeaking(); stopPrep();
    active = item; scope = "all";
    try { history.replaceState(null, "", `#${item.id}`); } catch {}
    renderTopics(); renderCue(); renderMindMap(); renderSample(); renderFollowUps(); renderNotes();
    rawBeforeClean = null; el.restoreBtn.hidden = true;
    el.transcript.value = store.get(`ielts-p2-draft-${active.id}`, "");
    segments = []; lastAutoValue = null; elapsed = 0;
    el.audio.hidden = true; el.audio.removeAttribute("src");
    resetTimer(); updateStats();
    setStatus(el.sampleStatus, "Listen first, then press <b>Read-Along Check</b> and read the answer aloud. Words the computer hears correctly turn green.");
  }

  /* ---------- text-to-speech ---------- */
  let ttsActive = false;
  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /en-GB/i.test(v.lang) && /Google|Natural|Online/i.test(v.name)) || voices.find(v => /en-GB/i.test(v.lang)) ||
      voices.find(v => /en-US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
  }
  function speakText(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(); if (v) u.voice = v;
    u.lang = v ? v.lang : "en-GB"; u.rate = Number(el.rate.value);
    speechSynthesis.speak(u);
  }
  function listenSample() {
    if (!("speechSynthesis" in window)) { setStatus(el.sampleStatus, "This browser cannot read text aloud.", "warning"); return; }
    stopSample();
    const spans = scopedSpans();
    // chunk into sentences (Chrome cuts off long utterances)
    const chunks = []; let cur = [];
    spans.forEach((w, i) => { cur.push(w); if (/[.!?]["”’)]*$/.test(w.el.textContent) || i === spans.length - 1) { chunks.push(cur); cur = []; } });
    ttsActive = true; el.stopSampleBtn.disabled = false; el.listenBtn.disabled = true; el.readAlongBtn.disabled = true;
    setStatus(el.sampleStatus, "Listening… follow the highlighted words.", "active");
    const voice = pickVoice();
    chunks.forEach((chunk, ci) => {
      const offsets = []; let text = "";
      chunk.forEach(w => { offsets.push(text.length); text += w.el.textContent + " "; });
      const u = new SpeechSynthesisUtterance(text.trim());
      if (voice) u.voice = voice; u.lang = voice ? voice.lang : "en-GB"; u.rate = Number(el.rate.value);
      const mark = idx => { wordSpans.forEach(w => w.el.classList.remove("speaking")); if (chunk[idx]) chunk[idx].el.classList.add("speaking"); };
      u.onstart = () => mark(0);
      u.onboundary = e => { if (e.name && e.name !== "word") return; let k = 0; while (k + 1 < offsets.length && offsets[k + 1] <= e.charIndex) k++; mark(k); };
      if (ci === chunks.length - 1) u.onend = () => { if (ttsActive) { stopSample(); setStatus(el.sampleStatus, "Finished. Now try <b>Read-Along Check</b> and read it yourself."); } };
      speechSynthesis.speak(u);
    });
  }

  /* ---------- speech recognition (shared) ---------- */
  const rec = { inst: null, mode: null, finals: [], onUpdate: null };
  function startRecognition(mode, onUpdate) {
    if (!SR) return false;
    stopRecognition();
    const r = new SR();
    r.lang = "en-US"; r.continuous = true; r.interimResults = true; r.maxAlternatives = 1;
    rec.inst = r; rec.mode = mode; rec.finals = []; rec.onUpdate = onUpdate;
    r.onresult = e => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) { if (t.trim()) rec.finals.push(t.trim()); } else interim += t;
      }
      rec.onUpdate && rec.onUpdate(rec.finals, interim.trim());
    };
    r.onerror = e => {
      if (["not-allowed", "service-not-allowed", "audio-capture"].includes(e.error)) {
        const msg = `Microphone or speech typing was blocked (${e.error}). Use Chrome or Edge and allow the microphone.`;
        if (rec.mode === "speak") stopSpeaking(msg, "warning"); else { stopSample(); setStatus(el.sampleStatus, msg, "warning"); }
      }
    };
    r.onend = () => { if (rec.inst === r) { try { r.start(); } catch {} } }; // keep listening until we stop
    try { r.start(); } catch { return false; }
    return true;
  }
  function stopRecognition() {
    const r = rec.inst; rec.inst = null; rec.mode = null;
    if (r) { r.onend = null; r.onresult = null; r.onerror = null; try { r.stop(); } catch {} }
  }

  /* ---------- read-along accuracy check ---------- */
  let alignQueued = false, lastSpoken = "";
  function readAlong() {
    if (!SR) { setStatus(el.sampleStatus, "Live speech checking needs Chrome or Edge (desktop or Android).", "warning"); return; }
    stopSample();
    scopedSpans().forEach(w => w.el.classList.remove("ok", "miss", "speaking"));
    el.accuracyBox.hidden = false; updateAccuracy(0, 0, scopedSpans().length);
    const ok = startRecognition("read", (finals, interim) => {
      lastSpoken = `${finals.join(" ")} ${interim}`;
      if (!alignQueued) { alignQueued = true; requestAnimationFrame(() => { alignQueued = false; align(lastSpoken, false); }); }
    });
    if (!ok) { setStatus(el.sampleStatus, "Could not start the microphone. Try again.", "warning"); return; }
    el.readAlongBtn.disabled = true; el.listenBtn.disabled = true; el.stopSampleBtn.disabled = false;
    el.readAlongBtn.classList.add("live");
    setStatus(el.sampleStatus, "🎙 Listening… read the answer aloud at a natural speed. Press <b>Stop</b> when you finish.", "active");
  }

  function align(spokenText, final) {
    const spans = scopedSpans();
    const sTok = []; spans.forEach((w, wi) => w.parts.forEach(p => sTok.push({ n: stem(p), wi })));
    const hTok = normParts(spokenText).map(stem);
    const n = sTok.length, m = hTok.length;
    const matchedWord = new Uint8Array(spans.length);
    if (n && m) {
      const W = m + 1, dp = new Uint16Array((n + 1) * W);
      for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++)
        dp[i * W + j] = sTok[i - 1].n === hTok[j - 1] ? dp[(i - 1) * W + j - 1] + 1 : Math.max(dp[(i - 1) * W + j], dp[i * W + j - 1]);
      let i = n, j = m;
      while (i > 0 && j > 0) {
        if (sTok[i - 1].n === hTok[j - 1]) { matchedWord[sTok[i - 1].wi] = 1; i--; j--; }
        else if (dp[(i - 1) * W + j] >= dp[i * W + j - 1]) i--; else j--;
      }
    }
    let last = -1; matchedWord.forEach((v, i) => { if (v) last = i; });
    const reach = last;
    let ok = 0;
    spans.forEach((w, i) => {
      w.el.classList.remove("ok", "miss");
      if (matchedWord[i]) { w.el.classList.add("ok"); ok++; }
      else if (i < reach) w.el.classList.add("miss");
    });
    updateAccuracy(ok, reach + 1, spans.length, final);
  }
  function updateAccuracy(ok, read, total, final) {
    const pct = read > 0 ? Math.round((ok / read) * 100) : 0;
    el.accuracyFill.style.width = `${pct}%`;
    el.accuracyFill.style.background = pct >= 85 ? "var(--ok)" : pct >= 65 ? "var(--gold)" : "var(--danger)";
    const coverage = total ? Math.round((read / total) * 100) : 0;
    el.accuracyText.innerHTML = read
      ? `<b>Accuracy ${pct}%</b> — ${ok} of ${read} words recognised${final ? ` · you read ${coverage}% of the ${scope === "all" ? "answer" : "paragraph"}` : ""}.` +
        (final ? (pct >= 90 ? " Excellent, clear pronunciation!" : pct >= 75 ? " Good. Practise the red words, then try again." : " Slow down a little and say each red word clearly.") : "")
      : "Start reading…";
  }

  function stopSample() {
    const wasReading = rec.mode === "read";
    if (wasReading) { stopRecognition(); align(lastSpoken, true); setStatus(el.sampleStatus, "Stopped. Red words were missed or unclear — click <b>Listen</b> to hear them, then try again."); }
    if (ttsActive || (window.speechSynthesis && speechSynthesis.speaking)) { ttsActive = false; speechSynthesis.cancel(); }
    wordSpans.forEach(w => w.el.classList.remove("speaking"));
    el.readAlongBtn.disabled = false; el.listenBtn.disabled = false; el.stopSampleBtn.disabled = true;
    el.readAlongBtn.classList.remove("live");
    lastSpoken = wasReading ? lastSpoken : "";
  }

  /* ---------- 1-minute prep timer ---------- */
  let prepTimer = null;
  function startPrep() {
    if (prepTimer) { stopPrep(); return; }
    let left = 60;
    el.prepBtn.textContent = "■ Stop Prep";
    const tick = () => setStatus(el.prepStatus, `Preparation time: <b>${fmt(left)}</b> — write key words only.`, "active");
    tick();
    prepTimer = setInterval(() => {
      left--; tick();
      if (left <= 0) { stopPrep(); setStatus(el.prepStatus, "Time's up! Start speaking now. ➜", "active"); beep(); }
    }, 1000);
    el.notesGrid.querySelector("textarea")?.focus();
  }
  function stopPrep() { clearInterval(prepTimer); prepTimer = null; el.prepBtn.innerHTML = "&#9201; 1-min Prep"; }
  function beep() {
    try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(); const g = ctx.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(.2, ctx.currentTime); g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .5);
      o.start(); o.stop(ctx.currentTime + .5); } catch {}
  }

  /* ---------- speaking: timer + recording + live transcript ---------- */
  let timer = null, remaining = 120, elapsed = 0, mediaRecorder = null, chunks = [];
  let segments = [], baseText = "", lastAutoValue = null, rawBeforeClean = null, lastInterim = "";

  function resetTimer() {
    clearInterval(timer); timer = null;
    remaining = Number(el.timeSelect.value);
    el.timer.textContent = fmt(remaining); el.timer.classList.remove("warn");
    el.timerFill.style.width = "0%";
  }
  async function startSpeaking() {
    stopSample(); stopPrep(); if (window.speechSynthesis) speechSynthesis.cancel();
    if (!SR && !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      setStatus(el.speechStatus, "This browser cannot record. Please open the page in Chrome or Edge, or type your answer.", "warning"); return;
    }
    rawBeforeClean = null; el.restoreBtn.hidden = true;
    baseText = el.transcript.value.trim(); lastInterim = "";
    segments = baseText ? [baseText] : [];
    resetTimer(); elapsed = 0;
    el.recordBtn.disabled = true; el.recordBtn.classList.add("live"); el.stopBtn.disabled = false;
    el.audio.hidden = true; el.audio.removeAttribute("src");
    const total = remaining;
    timer = setInterval(() => {
      remaining--; elapsed++;
      el.timer.textContent = fmt(Math.max(remaining, 0));
      el.timer.classList.toggle("warn", remaining <= 10);
      el.timerFill.style.width = `${Math.min(100, (elapsed / total) * 100)}%`;
      updateStats();
      if (remaining <= 0) { beep(); stopSpeaking("⏰ Time's up! Now press <b>Clean Up Transcript</b>, check it, and copy it."); }
    }, 1000);

    let audioOn = false;
    try {
      if (navigator.mediaDevices && window.MediaRecorder) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunks = []; mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
        mediaRecorder.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          if (chunks.length) { el.audio.src = URL.createObjectURL(new Blob(chunks, { type: chunks[0].type || "audio/webm" })); el.audio.hidden = false; }
        };
        mediaRecorder.start(); audioOn = true;
      }
    } catch (err) { setStatus(el.speechStatus, `Microphone blocked: ${err.message}. You can still type.`, "warning"); }
    if (!timer) return; // stopped while waiting for permission

    const live = startRecognition("speak", (finals, interim) => {
      lastInterim = interim;
      segments = (baseText ? [baseText] : []).concat(finals);
      const v = `${segments.join(" ")} ${interim}`.trim();
      el.transcript.value = v; lastAutoValue = segments.join(" ");
      el.transcript.scrollTop = el.transcript.scrollHeight;
      updateStats();
    });
    setStatus(el.speechStatus, live ? (audioOn ? "🎙 Recording and typing your speech live…" : "🎙 Typing your speech live (audio playback not available).")
      : audioOn ? "Recording audio. Live typing is not supported in this browser — type your answer after speaking." : "Type your answer in the box below.", live ? "active" : "warning");
  }
  function stopSpeaking(msg = "Stopped. Press <b>Clean Up Transcript</b>, check it, then copy it.", kind = "") {
    clearInterval(timer); timer = null;
    if (rec.mode === "speak") stopRecognition();
    if (lastInterim) { segments.push(lastInterim); lastInterim = ""; }
    if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
    mediaRecorder = null;
    el.recordBtn.disabled = false; el.recordBtn.classList.remove("live"); el.stopBtn.disabled = true;
    setStatus(el.speechStatus, msg, kind);
    if (segments.length) { lastAutoValue = segments.join(" "); el.transcript.value = lastAutoValue; }
    saveDraft(); updateStats();
  }
  function updateStats() {
    const words = el.transcript.value.trim().split(/\s+/).filter(Boolean).length;
    const wpm = elapsed >= 10 ? ` · ${Math.round(words / (elapsed / 60))} words/min` : "";
    el.stats.textContent = words ? `${words} words${elapsed ? ` in ${fmt(elapsed)}` : ""}${wpm}` : "";
  }
  const saveDraft = () => store.set(`ielts-p2-draft-${active.id}`, el.transcript.value);

  /* ---------- transcript clean-up ---------- */
  const FILLERS = /\b(?:u+m+|u+h+m*|e+r+m*|hmm+|ah+|uh-huh|mm+)\b[,.]?\s*/gi;
  const CONTRACTIONS = { im: "I'm", ive: "I've", dont: "don't", doesnt: "doesn't", didnt: "didn't", cant: "can't", couldnt: "couldn't", wouldnt: "wouldn't", shouldnt: "shouldn't", isnt: "isn't", wasnt: "wasn't", arent: "aren't", werent: "weren't", havent: "haven't", hasnt: "hasn't", wont: "won't", youre: "you're", theyre: "they're", thats: "that's", whats: "what's", theres: "there's", hes: "he's", shes: "she's" };
  const MARKERS = ["okay so", "ok so", "alright so", "well", "basically", "honestly", "actually", "personally", "first", "firstly", "second", "secondly", "third", "finally", "lastly", "however", "besides", "also", "anyway", "overall", "in conclusion", "for example", "for instance", "on the other hand", "on the one hand", "to be honest", "in my opinion", "as a result", "in the end", "at first", "after that", "on top of that", "in addition", "moreover", "that said", "of course", "in general", "to sum up", "looking ahead", "luckily", "unfortunately", "surprisingly", "still", "even so"]
    .sort((a, b) => b.length - a.length);
  const QUESTION_START = /^(do|does|did|is|are|was|were|can|could|would|will|should|have|has|why|how come)\b/i;

  function cleanSentence(s) {
    s = s.replace(FILLERS, "").replace(/\s+/g, " ").trim();
    if (!s) return "";
    s = s.replace(/\b(\w+)(?:\s+\1\b)+/gi, "$1"); // the the → the
    s = s.replace(/\b[a-z]+\b/gi, w => {
      const lw = w.toLowerCase();
      if (CONTRACTIONS[lw]) return CONTRACTIONS[lw];
      if (lw === "i") return "I";
      return properNouns.get(lw) || w;
    });
    s = s.replace(/\bi'(m|ve|d|ll)\b/gi, (_, x) => `I'${x.toLowerCase()}`);
    s = s.replace(/\s+(but|so that|so I|so we|so it|so they|so he|so she|so you)\b/g, (m, w) => `, ${w}`);
    s = s.replace(/,\s*,/g, ",");
    const low = s.toLowerCase();
    for (const mk of MARKERS) {
      if (low.startsWith(mk + " ") && !low.startsWith(mk + ",")) {
        const rest = s.slice(mk.length + 1);
        s = / so$/.test(mk) ? `${s.slice(0, mk.length - 3)}, so ${rest}` : `${s.slice(0, mk.length)}, ${rest}`;
        break;
      }
    }
    s = s.replace(/^\s*[,;]\s*/, "");
    s = s.charAt(0).toUpperCase() + s.slice(1);
    if (!/[.!?]$/.test(s)) s += QUESTION_START.test(s) && s.split(" ").length < 14 ? "?" : ".";
    return s;
  }
  function cleanTranscript() {
    const current = el.transcript.value.trim();
    if (!current) { setStatus(el.transcriptStatus, "Record or type your answer first.", "warning"); return; }
    rawBeforeClean = current;
    // Use the pause-based segments from speech recognition when the text hasn't been edited; otherwise split on punctuation.
    const pieces = lastAutoValue && current === lastAutoValue.trim() && segments.length
      ? segments.flatMap(seg => seg.split(/(?<=[.!?])\s+/))
      : current.split(/(?<=[.!?])\s+|\n+/);
    const cleaned = pieces.map(cleanSentence).filter(Boolean).join(" ")
      .replace(/\s+([,.!?])/g, "$1").replace(/([.!?])\s*([a-z])/g, (m, p, c) => `${p} ${c.toUpperCase()}`);
    el.transcript.value = cleaned;
    lastAutoValue = null; el.restoreBtn.hidden = false; saveDraft(); updateStats();
    setStatus(el.transcriptStatus, "✨ Cleaned. Computers are not perfect — read it once, fix any wrong words, then press <b>Copy</b>.", "active");
  }

  async function copyText(text) {
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch {}
    const box = document.createElement("textarea"); box.value = text; box.style.position = "fixed"; box.style.left = "-9999px";
    document.body.append(box); box.select(); const ok = document.execCommand("copy"); box.remove(); return ok;
  }
  function botPrompt() {
    const notes = store.get(`ielts-p2-notes-${active.id}`, {});
    const label = c => c.replace(/^and /, "").replace(/\.$/, "").replace(/^./, x => x.toUpperCase());
    return window.SpeakingKit.feedbackPrompt({
      test: "IELTS Speaking Part 2 (long turn)", level: "IELTS band 6–7 (CEFR B1–B2)",
      question: active.title,
      context: ["You should say:", ...active.cues.map(c => `- ${c}`), `My actual speaking time: ${elapsed ? fmt(elapsed) : "not timed"} (target: 1–2 minutes)`],
      mindmap: active.cues.map((c, i) => ({ clue: label(c), hint: `Stage ${i + 1}`, text: (notes[i] || "").trim() })),
      transcript: el.transcript.value.trim(), seconds: Number(el.timeSelect.value)
    });
  }


  /* ---------- events ---------- */
  el.search.addEventListener("input", renderTopics);
  el.readCueBtn.addEventListener("click", () => speakText(`${active.title} You should say: ${active.cues.join(", ")}`));
  el.listenBtn.addEventListener("click", listenSample);
  el.readAlongBtn.addEventListener("click", readAlong);
  el.stopSampleBtn.addEventListener("click", stopSample);
  el.prepBtn.addEventListener("click", startPrep);
  el.clearNotesBtn.addEventListener("click", () => {
    if (!confirmClear("notes")) return;
    store.set(`ielts-p2-notes-${active.id}`, {}); renderNotes();
  });
  el.timeSelect.addEventListener("change", () => { if (!timer) resetTimer(); });
  el.recordBtn.addEventListener("click", startSpeaking);
  el.stopBtn.addEventListener("click", () => stopSpeaking());
  el.resetBtn.addEventListener("click", () => {
    if (timer) stopSpeaking();
    if (el.transcript.value.trim() && !confirmClear("transcript")) return;
    el.transcript.value = ""; segments = []; lastAutoValue = null; rawBeforeClean = null; elapsed = 0;
    el.restoreBtn.hidden = true; el.audio.hidden = true; el.audio.removeAttribute("src");
    resetTimer(); saveDraft(); updateStats();
    setStatus(el.speechStatus, "Ready. Chrome or Edge works best for live speech typing.");
  });
  el.transcript.addEventListener("input", () => { saveDraft(); updateStats(); });
  el.cleanBtn.addEventListener("click", cleanTranscript);
  el.restoreBtn.addEventListener("click", () => {
    if (rawBeforeClean == null) return;
    el.transcript.value = rawBeforeClean; rawBeforeClean = null; el.restoreBtn.hidden = true; saveDraft(); updateStats();
    setStatus(el.transcriptStatus, "Original transcript restored.");
  });
  el.copyBtn.addEventListener("click", async () => {
    if (!el.transcript.value.trim()) { setStatus(el.transcriptStatus, "Nothing to copy yet.", "warning"); return; }
    const ok = await copyText(el.transcript.value.trim());
    setStatus(el.transcriptStatus, ok ? "📋 Copied! Paste it into your document or chat to get feedback." : "Could not copy automatically — select the text and copy it manually.", ok ? "active" : "warning");
  });
  el.botBtn.addEventListener("click", async () => {
    if (!el.transcript.value.trim()) { setStatus(el.transcriptStatus, "Record or type your answer first.", "warning"); return; }
    if (rawBeforeClean == null) cleanTranscript(); // always send the clean transcription
    const ok = await copyText(botPrompt());
    setStatus(el.transcriptStatus, ok ? "Copied: cue card + your notes + clean transcription. Paste it into the IELTS bot that just opened (or into Claude)." : "Could not copy automatically — copy your transcript manually.", ok ? "active" : "warning");
    window.open(IELTS_BOT_URL, "_blank", "noopener");
  });
  function confirmClear(what) { return window.confirm(`Clear your ${what} for this cue card?`); }

  /* ---------- init ---------- */
  const fromHash = DATA.find(d => d.id === location.hash.slice(1));
  renderThemes();
  select(fromHash || DATA[0]);
  if (!SR) setStatus(el.speechStatus, "Live speech typing is not supported in this browser. Open the page in Chrome or Edge, or type your answer.", "warning");
})();
