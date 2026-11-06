/* GEPT Basic/Intermediate Speaking: What-if Scenarios — 100 questions.
   "What would you do if…" (Q1–40) and "Your friend…, what would you say?" (Q41–100).
   Mind map typing box, 5 sentence patterns, sample answer with Listen + Read-Along Check, timer,
   live transcription, clean transcription, Copy for AI Feedback. Uses speaking-kit.js + mindmap-kit.js. */
const K = window.SpeakingKit;
const items = window.SCENARIO_ITEMS || [];
const DRAFT_PREFIX = "scenario-draft-";
const TIMES = [15, 30, 45, 60, 90];

const KINDS = {
  do: { label: "What would you do? 你會怎麼做", short: "What would you do?",
    branches: [
      { label: "Feeling 感受", hint: "I would feel … (sorry / excited / worried)" },
      { label: "First action 先做什麼", hint: "First, I would …" },
      { label: "Next step 接著", hint: "Then / If …, I would …" },
      { label: "Reason / Lesson 原因・收穫", hint: "because … / Next time, I …" }
    ],
    tip: "情境題「如果…你會怎麼做？」：先說感受 (I would feel …)，再說第一步行動 (First, I would …)，接著下一步或備案 (If …, I would …)，最後說原因或學到什麼。全程用 <b>I would + 原形動詞</b>。" },
  say: { label: "What would you say? 你會說什麼", short: "What would you say?",
    branches: [
      { label: "Show I understand 同理", hint: "I know … / That must be …" },
      { label: "What I would say 說的話", hint: "I would say, '…'" },
      { label: "Advice / Help 建議・幫忙", hint: "Why don't you … / I can …" },
      { label: "Encourage 鼓勵", hint: "Don't give up … / I believe in you" }
    ],
    tip: "情境題「朋友…你會說什麼？」：先表示理解對方的心情 (I know this is hard)，再直接說出你會說的話 (I would say, '…')，接著給建議或幫忙，最後一句鼓勵。用 <b>I would say, '…'</b> 開頭最自然。" }
};

const state = { kind: "all", n: items[0] ? items[0].n : 1, duration: 30, remaining: 30, timerId: null, timerEndsAt: null,
  recording: false, segments: [], baseText: "", rawBeforeClean: null, sampleSpans: [], stopListen: null, listening: false,
  readSampleMode: false, lastSampleSpoken: "", mindMap: null };

const $ = id => document.getElementById(id);
const els = {};
["questionList", "searchInput", "countPill", "categoryTabs", "topicLabel", "questionMeta", "questionText",
  "practiceSentences", "copySentencesButton", "tipText", "sampleAnswer", "sampleBar", "sampleBarFill", "sampleAccuracy", "sampleLegend",
  "speakSampleButton", "readSampleButton", "toggleSampleButton", "timerDisplay", "timerControls", "recordButton", "resetButton",
  "statusLine", "transcriptBox", "wordCount", "cleanButton", "restoreButton", "copyTranscriptButton", "aiFeedbackButton",
  "randomButton", "readQuestionButton"].forEach(id => { els[id] = $(id); });

const nounMap = K.properNouns(items.flatMap(x => [x.question, x.answer, ...x.patterns.map(p => p.example)]));
const cleanText = K.cleaner(nounMap);
let answerRec = null, readRec = null;

const current = () => items.find(x => x.n === state.n) || items[0];
const wordsIn = t => (String(t).trim().match(/\b[\w’'-]+\b/g) || []).length;

/* ---------- sidebar ---------- */
function renderTabs() {
  els.categoryTabs.innerHTML = "";
  [["all", `All (${items.length})`], ["do", `What would you do? (${items.filter(x => x.kind === "do").length})`],
    ["say", `What would you say? (${items.filter(x => x.kind === "say").length})`]].forEach(([k, label]) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = label;
    b.setAttribute("aria-pressed", String(state.kind === k));
    b.addEventListener("click", () => {
      state.kind = k; renderTabs(); renderList();
      const first = visible()[0];
      if (first && k !== "all" && current().kind !== k) select(first.n);
    });
    els.categoryTabs.append(b);
  });
}

function visible() {
  const term = els.searchInput.value.trim().toLowerCase();
  return items.filter(x => (state.kind === "all" || x.kind === state.kind) &&
    (!term || String(x.n) === term || `q${x.n}` === term || `${x.question} ${x.tag} ${x.answer}`.toLowerCase().includes(term)));
}

function renderList() {
  const list = visible();
  els.countPill.textContent = list.length;
  els.questionList.innerHTML = "";
  let lastKind = null;
  list.forEach(x => {
    if (state.kind === "all" && x.kind !== lastKind) {
      const h = document.createElement("div");
      h.className = "sw-group";
      h.textContent = KINDS[x.kind].label;
      els.questionList.append(h);
      lastKind = x.kind;
    }
    const b = document.createElement("button");
    b.type = "button";
    b.className = `question-item${x.n === state.n ? " active" : ""}`;
    b.innerHTML = `<span class="question-id">${x.n}</span><span class="question-label">${K.escapeHtml(x.question)}<span class="topic-sub">${K.escapeHtml(x.tag)}</span></span>`;
    b.addEventListener("click", () => select(x.n));
    els.questionList.append(b);
  });
  if (!list.length) els.questionList.innerHTML = '<p class="notes-hint" style="padding:10px">No matching questions.</p>';
}

/* ---------- main ---------- */
function renderQuestion() {
  const x = current();
  const kind = KINDS[x.kind];
  els.topicLabel.textContent = `Question ${x.n} · ${kind.short}`;
  els.questionMeta.innerHTML = `${K.escapeHtml(kind.label)} <span class="timing-badge">${K.escapeHtml(x.tag)}</span>`;
  els.questionText.textContent = x.question;
  state.mindMap = MindMap.mount($("mindMap"), { key: `scenario-${x.n}`, center: x.question, branches: kind.branches });
  els.practiceSentences.innerHTML = "";
  x.patterns.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="pattern-line">${K.escapeHtml(p.pattern)}</div><div class="example-line">e.g. ${K.escapeHtml(p.example)}</div>`;
    els.practiceSentences.append(li);
  });
  els.tipText.innerHTML = kind.tip;
  els.sampleAnswer.innerHTML = "";
  state.sampleSpans = K.wordSpans(els.sampleAnswer, x.answer);
  els.sampleAnswer.hidden = true;
  els.toggleSampleButton.textContent = "Show";
  hideSampleAccuracy();
  renderList();
}

function hideSampleAccuracy() {
  els.sampleBar.hidden = true; els.sampleAccuracy.hidden = true; els.sampleLegend.hidden = true;
  state.sampleSpans.forEach(w => w.el.classList.remove("ok", "miss", "speaking"));
}

/* ---------- timer ---------- */
function renderTimes() {
  els.timerControls.innerHTML = "";
  els.timerControls.style.gridTemplateColumns = "repeat(3, minmax(54px, 1fr))";
  TIMES.forEach(sec => {
    const b = document.createElement("button");
    b.type = "button"; b.className = `time-choice${sec === state.duration ? " active" : ""}`;
    b.textContent = sec === 60 ? "1 min" : `${sec} sec`;
    b.addEventListener("click", () => { if (state.recording) return; state.duration = sec; renderTimes(); resetTimer(); });
    els.timerControls.append(b);
  });
}
function resetTimer() {
  clearInterval(state.timerId); state.timerId = null; state.timerEndsAt = null;
  state.remaining = state.duration; els.timerDisplay.textContent = state.remaining; els.timerDisplay.classList.remove("warning");
}
function tick() {
  if (!state.timerEndsAt) return;
  state.remaining = Math.max(0, Math.ceil((state.timerEndsAt - Date.now()) / 1000));
  els.timerDisplay.textContent = state.remaining;
  els.timerDisplay.classList.toggle("warning", state.remaining <= 5);
  if (state.remaining <= 0) { K.beep(); stopRecording(); els.statusLine.textContent = "Time is up. Clean your transcription, then copy it for feedback."; }
}
function startTimer() {
  clearInterval(state.timerId);
  state.remaining = state.duration; state.timerEndsAt = Date.now() + state.duration * 1000;
  els.timerDisplay.textContent = state.remaining; els.timerDisplay.classList.remove("warning");
  state.timerId = setInterval(tick, 250);
}

/* ---------- recording ---------- */
function startRecording() {
  stopSampleActivity();
  if (!K.SR) { els.statusLine.textContent = "Speech recognition is not available in this browser. Try Chrome or Edge, or type your answer."; startTimer(); return; }
  state.baseText = els.transcriptBox.value.trim();
  state.segments = state.baseText ? [state.baseText] : [];
  state.rawBeforeClean = null; els.restoreButton.hidden = true;
  answerRec = K.recognizer({
    onUpdate(finals, interim) {
      state.segments = (state.baseText ? [state.baseText] : []).concat(finals);
      els.transcriptBox.value = `${state.segments.join(" ")} ${interim}`.trim();
      saveDraft(); updateCount();
    },
    onBlocked(msg) { els.statusLine.textContent = msg; stopRecording(); }
  });
  state.recording = true;
  els.recordButton.classList.add("recording");
  els.recordButton.innerHTML = '<span class="record-dot"></span>Stop Recording';
  els.statusLine.textContent = "Recording… follow your mind map.";
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
  updateCount();
}
const saveDraft = () => K.store.set(DRAFT_PREFIX + state.n, els.transcriptBox.value);
const updateCount = () => { const c = wordsIn(els.transcriptBox.value); els.wordCount.textContent = `${c} word${c === 1 ? "" : "s"}`; };

/* ---------- sample answer: listen + read-along ---------- */
function updateSampleBar(result, final) {
  const sum = K.accuracySummary(result, final, "sample answer");
  els.sampleBar.hidden = false; els.sampleAccuracy.hidden = false; els.sampleLegend.hidden = false;
  els.sampleBarFill.style.width = `${sum.pct}%`;
  els.sampleBarFill.style.background = sum.pct >= 85 ? "var(--good)" : sum.pct >= 65 ? "var(--warm)" : "var(--danger)";
  els.sampleAccuracy.innerHTML = sum.msg;
}
function stopSampleActivity() {
  if (state.stopListen) { state.stopListen(); state.stopListen = null; }
  if (state.readSampleMode) {
    if (readRec) { readRec.stop(); readRec = null; }
    state.readSampleMode = false;
    updateSampleBar(K.align(state.sampleSpans, state.lastSampleSpoken || ""), true);
  }
  K.stopSpeech();
  state.listening = false;
  els.speakSampleButton.textContent = "🔈 Listen";
  els.readSampleButton.textContent = "🎤 Read-Along Check";
  els.readSampleButton.classList.remove("live");
  state.sampleSpans.forEach(w => w.el.classList.remove("speaking"));
}
function showSample() { els.sampleAnswer.hidden = false; els.toggleSampleButton.textContent = "Hide"; }
function listenSample() {
  if (state.listening) { stopSampleActivity(); return; }
  stopSampleActivity(); showSample(); hideSampleAccuracy();
  state.listening = true; els.speakSampleButton.textContent = "■ Stop";
  state.stopListen = K.listenAlong(state.sampleSpans, 0.9, () => { state.listening = false; state.stopListen = null; els.speakSampleButton.textContent = "🔈 Listen"; });
}
function readSample() {
  if (state.readSampleMode) { stopSampleActivity(); return; }
  stopSampleActivity(); stopRecording(); showSample();
  if (!K.SR) { els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = "Live checking needs Chrome or Edge."; return; }
  state.sampleSpans.forEach(w => w.el.classList.remove("ok", "miss"));
  state.lastSampleSpoken = "";
  readRec = K.recognizer({
    onUpdate(finals, interim) { state.lastSampleSpoken = `${finals.join(" ")} ${interim}`; updateSampleBar(K.align(state.sampleSpans, state.lastSampleSpoken), false); },
    onBlocked(msg) { els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = msg; stopSampleActivity(); }
  });
  state.readSampleMode = true;
  els.readSampleButton.textContent = "■ Stop Check"; els.readSampleButton.classList.add("live");
  els.sampleBar.hidden = false; els.sampleAccuracy.hidden = false;
  els.sampleAccuracy.textContent = "🎙 Listening… read the sample answer aloud.";
  if (!readRec.start()) { els.sampleAccuracy.textContent = "Could not start the microphone. Try again."; stopSampleActivity(); }
}

/* ---------- select ---------- */
function select(n) {
  const x = items.find(i => i.n === Number(n));
  if (!x) return;
  stopRecording(); stopSampleActivity();
  state.n = x.n;
  state.segments = []; state.rawBeforeClean = null; els.restoreButton.hidden = true;
  els.transcriptBox.value = K.store.get(DRAFT_PREFIX + x.n, "");
  resetTimer(); renderQuestion(); updateCount();
  try { history.replaceState(null, "", `#${x.n}`); } catch {}
}

/* ---------- AI feedback ---------- */
function aiPrompt() {
  const x = current();
  return K.feedbackPrompt({
    test: "GEPT Basic/Intermediate situation (What-if scenario)", level: "CEFR A2–B1", question: x.question,
    context: [`Task: ${x.tag}`],
    mindmap: state.mindMap ? state.mindMap.entries() : [],
    transcript: els.transcriptBox.value.trim(), seconds: state.duration
  });
}

/* ---------- events ---------- */
els.searchInput.addEventListener("input", renderList);
els.recordButton.addEventListener("click", () => {
  if (state.recording) { stopRecording(); els.statusLine.textContent = "Recording stopped. Clean your transcription, then copy it for feedback."; }
  else startRecording();
});
els.resetButton.addEventListener("click", () => {
  stopRecording(); stopSampleActivity();
  state.segments = []; state.rawBeforeClean = null; els.restoreButton.hidden = true;
  els.transcriptBox.value = ""; saveDraft(); updateCount();
  els.statusLine.textContent = "Ready for a new answer."; resetTimer();
});
els.transcriptBox.addEventListener("input", () => { saveDraft(); updateCount(); });
function cleanUp() {
  const t = els.transcriptBox.value.trim();
  if (!t) { els.statusLine.textContent = "Record or type an answer first."; return; }
  state.rawBeforeClean = t;
  els.transcriptBox.value = cleanText(t, state.segments);
  els.restoreButton.hidden = false; saveDraft(); updateCount();
  els.statusLine.textContent = "Cleaned. Read it once, fix any wrong words, then copy it for feedback.";
}
els.cleanButton.addEventListener("click", cleanUp);
els.restoreButton.addEventListener("click", () => {
  if (state.rawBeforeClean == null) return;
  els.transcriptBox.value = state.rawBeforeClean; state.rawBeforeClean = null; els.restoreButton.hidden = true;
  saveDraft(); updateCount(); els.statusLine.textContent = "Original transcript restored.";
});
els.copyTranscriptButton.addEventListener("click", async () => {
  if (!els.transcriptBox.value.trim()) { els.statusLine.textContent = "Nothing to copy yet."; return; }
  const ok = await K.copyText(els.transcriptBox.value.trim());
  els.statusLine.textContent = ok ? "Transcript copied." : "Clipboard was blocked — select the text and copy it manually.";
});
els.aiFeedbackButton.addEventListener("click", async () => {
  if (!els.transcriptBox.value.trim()) { els.statusLine.textContent = "Record or type an answer first."; return; }
  if (state.rawBeforeClean == null) cleanUp(); // always send the clean transcription
  const ok = await K.copyText(aiPrompt());
  els.statusLine.textContent = ok ? "Copied: question + your mind map + clean transcription. Paste it into Claude or ChatGPT." : "Clipboard was blocked — copy the transcript manually.";
});
els.copySentencesButton.addEventListener("click", async () => {
  const text = current().patterns.map((p, i) => `${i + 1}. ${p.pattern}\ne.g. ${p.example}`).join("\n\n");
  const ok = await K.copyText(text);
  els.statusLine.textContent = ok ? "Sentence patterns copied." : "Clipboard was blocked — the patterns are still shown on the page.";
});
els.speakSampleButton.addEventListener("click", listenSample);
els.readSampleButton.addEventListener("click", readSample);
els.toggleSampleButton.addEventListener("click", () => {
  const hide = !els.sampleAnswer.hidden;
  if (hide) stopSampleActivity();
  els.sampleAnswer.hidden = hide; els.toggleSampleButton.textContent = hide ? "Show" : "Hide";
});
els.readQuestionButton.addEventListener("click", () => K.speak(current().question, 0.9));
els.randomButton.addEventListener("click", () => {
  const pool = items.filter(x => state.kind === "all" || x.kind === state.kind);
  select(pool[Math.floor(Math.random() * pool.length)].n);
});
window.addEventListener("hashchange", () => { const k = Number(location.hash.slice(1)); if (k && k !== state.n) select(k); });

/* ---------- init ---------- */
renderTabs();
renderTimes();
const startN = Number(location.hash.slice(1));
select(items.some(i => i.n === startN) ? startN : (items[0] && items[0].n));
if (!K.SR) els.statusLine.textContent = "Live speech typing is not supported in this browser. Open this page in Chrome or Edge, or type your answer.";
