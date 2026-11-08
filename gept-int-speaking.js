/* GEPT Intermediate Speaking — 100 Q&A questions + 10 picture descriptions.
   Mind map typing box, timer, live transcription, clean transcription. Uses speaking-kit.js + mindmap-kit.js. */
const K = window.SpeakingKit;
const UNITS = typeof GEPT_UNITS !== "undefined" ? GEPT_UNITS : [];
const DRAFT_PREFIX = "gept-int-speak-draft-";

const items = [];
const QA_SAMPLES = typeof GEPT_QA_SAMPLES !== "undefined" ? GEPT_QA_SAMPLES : {};
UNITS.forEach(u => u.speaking.forEach((q, i) => items.push({ id: `qa-${u.id}-${i + 1}`, kind: "qa", unit: u.id, theme: u.theme, n: i + 1, question: q,
  answer: QA_SAMPLES[`${u.id}-${i + 1}`] || "" })));
UNITS.forEach(u => items.push({ id: `pic-${u.id}`, kind: "picture", unit: u.id, theme: u.theme, n: 1,
  question: `Picture Description · Test ${u.id}`, prompts: u.picture.prompts,
  parts: (typeof GEPT_PIC_SAMPLES !== "undefined" && GEPT_PIC_SAMPLES[u.id]) || null,
  answer: ((typeof GEPT_PIC_SAMPLES !== "undefined" && GEPT_PIC_SAMPLES[u.id]) || [u.picture.answer]).join(" "), img: `img/gept-int/test-${u.id}.jpg` }));
/* Original illustrations (T11+): single-picture practice items made from the writing-worksheet illustrations. See gept-int-extra-pictures.js. */
(typeof GEPT_EXTRA_PICS !== "undefined" ? GEPT_EXTRA_PICS : []).forEach(e => items.push({ id: `pic-${e.id}`, kind: "picture", unit: e.id, theme: e.theme, n: 1, extra: true,
  question: `Picture Description · Test ${e.id}`, prompts: e.prompts, parts: e.parts, answer: e.parts.join(" "), img: e.img }));

const TIMES = { qa: [15, 30, 45, 60], picture: [30, 90, 120] };
const DEFAULT_TIME = { qa: 30, picture: 90 };
const BRANCHES = {
  qa: [
    { label: "Answer 回答", hint: "yes / no / my choice in a few words" },
    { label: "Reason 原因", hint: "because …" },
    { label: "Example 例子", hint: "for example / my experience …" },
    { label: "Ending 結尾", hint: "so / that's why …" }
  ],
  picture: [
    { label: "① Place 地點", hint: "This might be … / It looks like …" },
    { label: "② People & actions 人物動作", hint: "who · doing what · why" },
    { label: "③ My opinion / experience 我的經驗", hint: "I have / I think … because …" },
    { label: "④ More details 細節", hint: "clothes · objects · background" }
  ]
};
const TIPS = {
  qa: "① Listen to the sample answer and read along. ② Plan your own ideas in the mind map. ③ Record your answer. GEPT 中級第二部分：每題 15 秒作答。先回答 (Answer)，再給原因 (Reason) 和例子 (Example)，最後一句結尾。Practise with 30–60 seconds to build longer answers.",
  picture: "GEPT 中級第三部分：先用 30 秒看圖和問題，再在 1 分半鐘 (90 sec) 內依序回答四個問題。Answer the four questions in order — do not read the question numbers aloud."
};

const state = { kind: "qa", selectedId: items[0] && items[0].id, duration: 30, remaining: 30, timerId: null, timerEndsAt: null,
  recording: false, segments: [], baseText: "", rawBeforeClean: null, sampleSpans: [], stopListen: null, listening: false, readSampleMode: false, mindMap: null };

const $ = id => document.getElementById(id);
const els = {};
["questionList", "searchInput", "countPill", "questionNumber", "unitTheme", "questionText", "pictureBlock", "pictureImg", "picturePrompts",
  "sampleBlock", "sampleAnswer", "sampleBar", "sampleBarFill", "sampleAccuracy", "speakSampleButton", "readSampleButton", "toggleSampleButton",
  "tipText", "timerDisplay", "timerControls", "recordButton", "resetButton", "statusLine", "transcriptBox", "wordCount",
  "cleanButton", "restoreButton", "copyTranscriptButton", "aiFeedbackButton", "randomButton", "readQuestionButton"].forEach(id => { els[id] = $(id); });
const kindTabs = [...document.querySelectorAll("[data-kind]")];

const nounMap = K.properNouns(UNITS.flatMap(u => [...u.speaking, u.picture.answer]).concat(Object.values(QA_SAMPLES), (typeof GEPT_EXTRA_PICS !== "undefined" ? GEPT_EXTRA_PICS : []).flatMap(e => e.parts)));
const cleanText = K.cleaner(nounMap);
let answerRec = null, readRec = null;

const current = () => items.find(x => x.id === state.selectedId) || items[0];
const words = t => (String(t).trim().match(/\b[\w’'-]+\b/g) || []).length;

/* ---------- list ---------- */
function renderList() {
  const term = els.searchInput.value.trim().toLowerCase();
  const list = items.filter(x => x.kind === state.kind &&
    (!term || `${x.question} ${x.theme} unit ${x.unit} ${(x.prompts || []).join(" ")}`.toLowerCase().includes(term) || String(x.unit) === term));
  els.countPill.textContent = list.length;
  els.questionList.innerHTML = "";
  let lastUnit = null, lastPicGroup = null;
  list.forEach(x => {
    if (x.kind === "picture") {
      const g = x.extra ? "Original illustrations 原創插圖 (T11+)" : "GEPT test-style pictures 模擬試題 (T1–T10)";
      if (g !== lastPicGroup) { const h = document.createElement("div"); h.className = "sw-group"; h.textContent = g; els.questionList.appendChild(h); lastPicGroup = g; }
    }
    if (x.kind === "qa" && x.unit !== lastUnit) {
      const h = document.createElement("div"); h.className = "sw-group"; h.textContent = `Unit ${x.unit} · ${x.theme}`;
      els.questionList.appendChild(h); lastUnit = x.unit;
    }
    const b = document.createElement("button");
    b.type = "button";
    b.className = `question-item${x.id === state.selectedId ? " active" : ""}`;
    const label = x.kind === "qa" ? x.question : `${x.theme}`;
    const num = x.kind === "qa" ? `${x.unit}.${x.n}` : `T${x.unit}`;
    b.innerHTML = `<span class="question-id">${num}</span><span class="question-label">${K.escapeHtml(label)}</span>`;
    b.addEventListener("click", () => select(x.id));
    els.questionList.appendChild(b);
  });
}

function renderTimerChoices() {
  els.timerControls.innerHTML = "";
  TIMES[state.kind].forEach(sec => {
    const b = document.createElement("button");
    b.type = "button"; b.className = `time-choice${sec === state.duration ? " active" : ""}`; b.dataset.seconds = sec;
    b.textContent = sec >= 60 && sec % 60 === 0 ? `${sec / 60} min` : `${sec} sec`;
    b.addEventListener("click", () => { state.duration = sec; renderTimerChoices(); resetTimer(); });
    els.timerControls.appendChild(b);
  });
}

/* ---------- question ---------- */
function renderQuestion() {
  const x = current();
  els.questionNumber.textContent = x.kind === "qa" ? `Unit ${x.unit} · Question ${x.n} of 10` : (x.extra ? `Picture ${x.unit} · Original illustration` : `Unit ${x.unit} · Picture Description`);
  els.unitTheme.textContent = `Theme: ${x.theme}`;
  els.questionText.textContent = x.kind === "qa" ? x.question : "Look at the picture and answer the four questions. 請看圖回答下列四個問題。";
  els.pictureBlock.hidden = x.kind !== "picture";
  els.sampleBlock.hidden = !x.answer;
  els.sampleAnswer.innerHTML = ""; state.sampleSpans = [];
  hideSampleAccuracy();
  if (x.kind === "picture") {
    els.pictureImg.src = x.img;
    els.pictureImg.alt = `GEPT Intermediate picture description, test ${x.unit}`;
    els.picturePrompts.innerHTML = x.prompts.map(p => `<li>${K.escapeHtml(p)}</li>`).join("");
  }
  /* 20 useful sentences (zh + en grid) above the sample answer */
  const sb = $("sentenceBlock"), sg = $("sentenceGrid");
  const sents = x.kind === "picture" && typeof GEPT_PIC_SENTENCES !== "undefined" ? GEPT_PIC_SENTENCES[x.unit] : null;
  sb.hidden = !sents; sg.innerHTML = "";
  if (sents) {
    const GROUPS = ["Q1 地點 Place", "Q2 人物動作 People & actions", "Q3 我的經驗／意見 Experience & opinion", "Q4 細節描述 Details"];
    sents.forEach(([zh, en], i) => {
      if (i % 5 === 0) { const g = document.createElement("div"); g.className = "sent-group"; g.textContent = GROUPS[i / 5] || ""; sg.appendChild(g); }
      const row = document.createElement("div"); row.className = "sent-row";
      row.innerHTML = `<span class="sent-n">${i + 1}</span><span class="sent-zh">${K.escapeHtml(zh)}</span><span class="sent-en"><span class="sent-en-text"></span><small class="sent-acc" hidden></small></span><button type="button" class="sent-speak" title="Listen 聽發音" aria-label="Listen">&#128264;</button><button type="button" class="sent-read" title="Read aloud check 朗讀檢查" aria-label="Read aloud check">&#127908;</button>`;
      const a = { spans: [], spoken: "", btn: row.querySelector(".sent-read"), acc: row.querySelector(".sent-acc") };
      K.wordSpans(row.querySelector(".sent-en-text"), en, a.spans);
      row.querySelector(".sent-speak").addEventListener("click", () => { stopSentenceCheck(false); K.speak(en, 0.92); });
      a.btn.addEventListener("click", () => { if (sentActive === a) stopSentenceCheck(); else startSentenceCheck(a); });
      sg.appendChild(row);
    });
    sg.hidden = false; $("toggleSentencesButton").textContent = "Hide 收合";
  }
  /* second copy of the picture + questions beside the mind map / recorder (sticky), so it stays visible while recording */
  const wp = $("workPicture");
  wp.hidden = x.kind !== "picture";
  if (x.kind === "picture") {
    $("workPictureImg").src = x.img;
    $("workPrompts").innerHTML = x.prompts.map(p => `<li>${K.escapeHtml(p)}</li>`).join("");
  }
  if (x.parts) {
    const spans = [];
    x.parts.forEach((part, i) => {
      const p = document.createElement("span"); p.className = "gi-part";
      const tag = document.createElement("b"); tag.className = "gi-part-tag"; tag.textContent = `Q${i + 1}`;
      tag.title = x.prompts[i] || ""; p.appendChild(tag); p.append(" ");
      K.wordSpans(p, part, spans); els.sampleAnswer.appendChild(p);
    });
    state.sampleSpans = spans;
    els.sampleAnswer.hidden = true; els.toggleSampleButton.textContent = "Show";
  } else if (x.answer) {
    state.sampleSpans = K.wordSpans(els.sampleAnswer, x.answer);
    els.sampleAnswer.hidden = true; els.toggleSampleButton.textContent = "Show";
  }
  els.tipText.textContent = TIPS[x.kind];
  state.mindMap = MindMap.mount($("mindMap"), { key: `gept-int-${x.id}`, center: x.kind === "qa" ? x.question : `Picture ${x.unit}: ${x.theme}`, branches: BRANCHES[x.kind] });
  renderList();
}

function select(id, keepTimer) {
  stopEverything();
  const x = items.find(i => i.id === id) || items[0];
  state.selectedId = x.id;
  if (x.kind !== state.kind) { state.kind = x.kind; kindTabs.forEach(t => t.setAttribute("aria-pressed", String(t.dataset.kind === x.kind))); }
  if (!keepTimer || !TIMES[state.kind].includes(state.duration)) state.duration = DEFAULT_TIME[state.kind];
  renderTimerChoices();
  state.segments = []; state.rawBeforeClean = null; els.restoreButton.hidden = true;
  els.transcriptBox.value = K.store.get(DRAFT_PREFIX + x.id, "");
  updateCount();
  resetTimer();
  renderQuestion();
  try { history.replaceState(null, "", `#${x.id}`); } catch {}
}

/* ---------- timer ---------- */
function resetTimer() {
  clearInterval(state.timerId); state.timerId = null; state.timerEndsAt = null;
  state.remaining = state.duration; els.timerDisplay.textContent = state.remaining; els.timerDisplay.classList.remove("warning");
}
function tick() {
  if (!state.timerEndsAt) return;
  state.remaining = Math.max(0, Math.ceil((state.timerEndsAt - Date.now()) / 1000));
  els.timerDisplay.textContent = state.remaining;
  els.timerDisplay.classList.toggle("warning", state.remaining <= 5);
  if (state.remaining <= 0) { K.beep(); stopRecording(); els.statusLine.textContent = "Time is up. Press Clean Transcription, then copy it for feedback."; }
}
function startTimer() {
  clearInterval(state.timerId);
  state.timerEndsAt = Date.now() + state.duration * 1000;
  els.timerDisplay.classList.remove("warning");
  state.timerId = setInterval(tick, 250); tick();
}

/* ---------- recording ---------- */
const saveDraft = () => { K.store.set(DRAFT_PREFIX + state.selectedId, els.transcriptBox.value); updateCount(); };
const updateCount = () => { els.wordCount.textContent = `${words(els.transcriptBox.value)} words`; };

function startRecording() {
  stopSampleActivity();
  if (!K.SR) { els.statusLine.textContent = "Speech recognition is not available in this browser. Use Chrome or Edge, or type your answer. The timer is running."; startTimer(); return; }
  state.baseText = els.transcriptBox.value.trim();
  state.segments = state.baseText ? [state.baseText] : [];
  state.rawBeforeClean = null; els.restoreButton.hidden = true;
  answerRec = K.recognizer({
    onUpdate(finals, interim) {
      state.segments = (state.baseText ? [state.baseText] : []).concat(finals);
      els.transcriptBox.value = `${state.segments.join(" ")} ${interim}`.trim();
      saveDraft();
    },
    onBlocked(msg) { els.statusLine.textContent = msg; stopRecording(); }
  });
  state.recording = true;
  els.recordButton.classList.add("recording");
  els.recordButton.innerHTML = '<span class="record-dot"></span>Stop Recording';
  els.statusLine.textContent = "Recording in English…";
  startTimer();
  if (!answerRec.start()) els.statusLine.textContent = "Speech-to-text is already active. The timer is still running.";
}
function stopRecording() {
  clearInterval(state.timerId); state.timerId = null; state.timerEndsAt = null;
  if (answerRec) { answerRec.stop(); answerRec = null; }
  if (state.recording && state.segments.length) { els.transcriptBox.value = state.segments.join(" "); saveDraft(); }
  state.recording = false;
  els.recordButton.classList.remove("recording");
  els.recordButton.innerHTML = '<span class="record-dot"></span>Start Recording';
}

function cleanUp() {
  const raw = els.transcriptBox.value.trim();
  if (!raw) { els.statusLine.textContent = "Record or type an answer first."; return; }
  state.rawBeforeClean = raw;
  els.transcriptBox.value = cleanText(raw, state.segments);
  els.restoreButton.hidden = false; saveDraft();
  els.statusLine.textContent = "Cleaned: punctuation, capitals and fillers fixed. Read it once and correct any wrong words.";
}

/* ---------- sample (picture) ---------- */
function hideSampleAccuracy() {
  els.sampleBar.hidden = true; els.sampleAccuracy.hidden = true;
  state.sampleSpans.forEach(w => w.el.classList.remove("ok", "miss", "speaking"));
}
function stopSampleActivity() {
  if (typeof stopSentenceCheck === "function" && sentActive) stopSentenceCheck(false);
  if (state.stopListen) { state.stopListen(); state.stopListen = null; }
  if (state.readSampleMode) {
    if (readRec) { readRec.stop(); readRec = null; }
    state.readSampleMode = false;
    updateSampleBar(K.align(state.sampleSpans, state.lastSampleSpoken || ""), true);
  }
  K.stopSpeech(); state.listening = false;
  els.speakSampleButton.textContent = "🔈 Listen";
  els.readSampleButton.textContent = "🎤 Read-Along Check";
  els.readSampleButton.classList.remove("live");
}
function updateSampleBar(result, final) {
  const sum = K.accuracySummary(result, final, "sample answer");
  els.sampleBar.hidden = false; els.sampleAccuracy.hidden = false;
  els.sampleBarFill.style.width = `${sum.pct}%`;
  els.sampleBarFill.style.background = sum.pct >= 85 ? "var(--good)" : sum.pct >= 65 ? "var(--warm)" : "var(--danger)";
  els.sampleAccuracy.innerHTML = sum.msg;
}
function showSample(show) { els.sampleAnswer.hidden = !show; els.toggleSampleButton.textContent = show ? "Hide" : "Show"; }
function listenSample() {
  if (state.listening) { stopSampleActivity(); return; }
  stopSampleActivity(); hideSampleAccuracy(); showSample(true);
  state.listening = true; els.speakSampleButton.textContent = "■ Stop";
  state.stopListen = K.listenAlong(state.sampleSpans, 0.92, () => { state.listening = false; state.stopListen = null; els.speakSampleButton.textContent = "🔈 Listen"; });
}
function readSample() {
  if (state.readSampleMode) { stopSampleActivity(); return; }
  stopSampleActivity(); stopRecording(); showSample(true);
  if (!K.SR) { els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = "Live checking needs Chrome or Edge."; return; }
  state.sampleSpans.forEach(w => w.el.classList.remove("ok", "miss")); state.lastSampleSpoken = "";
  readRec = K.recognizer({
    onUpdate(finals, interim) { state.lastSampleSpoken = `${finals.join(" ")} ${interim}`; updateSampleBar(K.align(state.sampleSpans, state.lastSampleSpoken), false); },
    onBlocked(msg) { els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = msg; stopSampleActivity(); }
  });
  state.readSampleMode = true;
  els.readSampleButton.textContent = "■ Stop Check"; els.readSampleButton.classList.add("live");
  els.sampleBar.hidden = false; els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = "🎙 Listening… read the sample answer aloud.";
  if (!readRec.start()) { els.sampleAccuracy.textContent = "Could not start the microphone. Try again."; stopSampleActivity(); }
}

/* ---------- read-aloud check for each useful sentence ---------- */
let sentRec = null, sentActive = null;
function showSentenceAccuracy(a, final) {
  const sum = K.accuracySummary(K.align(a.spans, a.spoken || ""), final, "sentence");
  a.acc.hidden = false; a.acc.innerHTML = sum.msg;
}
function stopSentenceCheck(finalize = true) {
  if (sentRec) { sentRec.stop(); sentRec = null; }
  if (sentActive) {
    const a = sentActive; sentActive = null;
    a.btn.innerHTML = "&#127908;"; a.btn.classList.remove("live");
    if (finalize && a.spoken) showSentenceAccuracy(a, true); else if (finalize) a.acc.hidden = true;
  }
}
function startSentenceCheck(a) {
  K.stopSpeech(); stopSentenceCheck(false); stopRecording(); stopSampleActivity();
  if (!K.SR) { a.acc.hidden = false; a.acc.textContent = "Live checking needs Chrome or Edge."; return; }
  a.spans.forEach(w => w.el.classList.remove("ok", "miss")); a.spoken = "";
  sentRec = K.recognizer({
    onUpdate(finals, interim) {
      a.spoken = `${finals.join(" ")} ${interim}`;
      const r = K.align(a.spans, a.spoken); a.acc.hidden = false; a.acc.innerHTML = K.accuracySummary(r, false, "sentence").msg;
      if (r.total > 0 && r.ok === r.total) setTimeout(() => { if (sentActive === a) stopSentenceCheck(); }, 500);
    },
    onBlocked(msg) { a.acc.hidden = false; a.acc.textContent = msg; stopSentenceCheck(false); }
  });
  sentActive = a; a.btn.innerHTML = "&#9632;"; a.btn.classList.add("live");
  a.acc.hidden = false; a.acc.textContent = "\u{1F399} Listening\u2026 read this sentence aloud.";
  if (!sentRec.start()) { a.acc.textContent = "Could not start the microphone. Try again."; stopSentenceCheck(false); }
}
function stopEverything() { stopRecording(); stopSampleActivity(); stopSentenceCheck(false); }

/* ---------- events ---------- */
kindTabs.forEach(tab => tab.addEventListener("click", () => {
  const first = items.find(x => x.kind === tab.dataset.kind);
  if (first) select(first.id);
}));
els.searchInput.addEventListener("input", renderList);
els.recordButton.addEventListener("click", () => {
  if (state.recording) { stopRecording(); els.statusLine.textContent = "Recording stopped. Press Clean Transcription, then copy it for feedback."; }
  else startRecording();
});
els.resetButton.addEventListener("click", () => {
  stopEverything(); state.segments = []; state.rawBeforeClean = null; els.restoreButton.hidden = true;
  els.transcriptBox.value = ""; saveDraft(); resetTimer(); els.statusLine.textContent = "Ready for a new answer.";
});
els.transcriptBox.addEventListener("input", saveDraft);
els.cleanButton.addEventListener("click", cleanUp);
els.restoreButton.addEventListener("click", () => {
  if (state.rawBeforeClean == null) return;
  els.transcriptBox.value = state.rawBeforeClean; state.rawBeforeClean = null; els.restoreButton.hidden = true; saveDraft();
  els.statusLine.textContent = "Original transcription restored.";
});
els.copyTranscriptButton.addEventListener("click", async () => {
  const t = els.transcriptBox.value.trim();
  if (!t) { els.statusLine.textContent = "Nothing to copy yet."; return; }
  els.statusLine.textContent = (await K.copyText(t)) ? "Transcription copied." : "Clipboard was blocked — select the text and copy it manually.";
});
els.aiFeedbackButton.addEventListener("click", async () => {
  if (!els.transcriptBox.value.trim()) { els.statusLine.textContent = "Record or type an answer first."; return; }
  if (state.rawBeforeClean == null) cleanUp(); // always send the clean transcription
  const x = current();
  const prompt = K.feedbackPrompt({
    test: x.kind === "qa" ? "GEPT Intermediate (全民英檢中級) Answer Questions" : "GEPT Intermediate (全民英檢中級) Picture Description",
    level: "CEFR B1",
    question: x.kind === "qa" ? x.question : `Look at the picture (Test ${x.unit}: ${x.theme}) and answer these questions in order:`,
    context: x.kind === "qa" ? [] : x.prompts.map((p, i) => `${i + 1}. ${p}`),
    mindmap: state.mindMap ? state.mindMap.entries() : [],
    transcript: els.transcriptBox.value.trim(), seconds: state.duration
  });
  els.statusLine.textContent = (await K.copyText(prompt)) ? "Copied: question + your mind map + clean transcription. Paste it into Claude or ChatGPT." : "Clipboard was blocked — copy your answer manually.";
});
els.randomButton.addEventListener("click", () => { const pool = items.filter(x => x.kind === state.kind); select(pool[Math.floor(Math.random() * pool.length)].id, true); });
els.readQuestionButton.addEventListener("click", () => { const x = current(); K.speak(x.kind === "qa" ? x.question : "Look at the picture and answer the four questions.", 0.92); });
els.speakSampleButton.addEventListener("click", listenSample);
els.readSampleButton.addEventListener("click", readSample);
els.toggleSampleButton.addEventListener("click", () => showSample(els.sampleAnswer.hidden));

/* ---------- init ---------- */
const start = items.find(x => x.id === decodeURIComponent(location.hash.slice(1))) || items[0];
select(start.id);
if (!K.SR) els.statusLine.textContent = "Live speech typing works in Chrome or Edge. In this browser you can still use the timer and type your answer.";

/* sticky picture panel: collapse / enlarge */
$("workPictureToggle").addEventListener("click", () => {
  const wp = $("workPicture"); const off = wp.classList.toggle("collapsed");
  $("workPictureToggle").textContent = off ? "Show 展開" : "Hide 收合";
});
$("workPictureImg").addEventListener("click", () => $("workPicture").classList.toggle("zoom"));

$("toggleSentencesButton").addEventListener("click", () => {
  const g = $("sentenceGrid"); g.hidden = !g.hidden; $("toggleSentencesButton").textContent = g.hidden ? "Show 展開" : "Hide 收合";
});
