/* TOEFL Speaking Interview — 50 topics × 4 questions.
   Mind map typing box (bubbles = the question's answer structure), structure / patterns / vocabulary,
   model answer with Listen + Read-Along Check, timer, live transcription, clean transcription,
   Copy for AI Feedback. Uses speaking-kit.js + mindmap-kit.js. */
const K = window.SpeakingKit;
const TOPICS = window.TOEFL_TOPICS || [];
const DRAFT_PREFIX = "toefl-draft-";
const TIMES = [20, 30, 45, 60, 90];

/* ---------- data clean-up ---------- */
const cleanModel = t => String(t).replace(/\s*■.*$/, "").trim();
// Structure arrives split: ["Direct answer:", "state platform", "Brief reason:", ...] → ["Direct answer: state platform", ...]
function pairStructure(list) {
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const s = String(list[i]).trim();
    if (/:$/.test(s) && i + 1 < list.length && !/:$/.test(String(list[i + 1]).trim())) { out.push(`${s} ${String(list[i + 1]).trim()}`); i++; }
    else out.push(s);
  }
  return out.filter(Boolean);
}
function defaultTime(timing) {
  const nums = (String(timing).match(/\d+/g) || []).map(Number);
  const max = nums.length ? Math.max(...nums) : 45;
  return TIMES.reduce((best, t) => (Math.abs(t - max) < Math.abs(best - max) ? t : best), TIMES[0]);
}

const items = TOPICS.flatMap(t => t.questions.map((q, i) => ({
  key: `${t.number}-q${i + 1}`, topicNumber: t.number, topicTitle: t.title, category: t.category, qIndex: i,
  id: q.id, type: q.type, timing: q.timing, prompt: q.prompt, structure: pairStructure(q.structure || []),
  patterns: (q.patterns || []).map(p => p.replace(/^"|"$/g, "")), vocabulary: q.vocabulary || [], model: cleanModel(q.modelAnswer || "")
})));
const categories = ["All", ...new Set(TOPICS.map(t => t.category))];

const state = { category: "All", key: items[0] && items[0].key, duration: 45, remaining: 45, timerId: null, timerEndsAt: null,
  recording: false, segments: [], baseText: "", rawBeforeClean: null, sampleSpans: [], stopListen: null, listening: false,
  readSampleMode: false, lastSampleSpoken: "", mindMap: null };

const $ = id => document.getElementById(id);
const els = {};
["questionList", "searchInput", "countPill", "categoryTabs", "topicLabel", "questionTabs", "questionMeta", "questionText",
  "structureList", "patternList", "vocabList", "sampleAnswer", "sampleBar", "sampleBarFill", "sampleAccuracy", "sampleLegend",
  "speakSampleButton", "readSampleButton", "toggleSampleButton", "timerDisplay", "timerControls", "recordButton", "resetButton",
  "statusLine", "transcriptBox", "wordCount", "cleanButton", "restoreButton", "copyTranscriptButton", "aiFeedbackButton",
  "randomButton", "readQuestionButton"].forEach(id => { els[id] = $(id); });

const nounMap = K.properNouns(items.flatMap(x => [x.prompt, x.model]));
const cleanText = K.cleaner(nounMap);
let answerRec = null, readRec = null;

const current = () => items.find(x => x.key === state.key) || items[0];
const wordsIn = t => (String(t).trim().match(/\b[\w’'-]+\b/g) || []).length;
const shortCat = c => c.replace("School Life - Multi-Background", "Multi-Background");

/* ---------- sidebar ---------- */
function renderTabs() {
  els.categoryTabs.innerHTML = "";
  categories.forEach(c => {
    const n = c === "All" ? TOPICS.length : TOPICS.filter(t => t.category === c).length;
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip";
    b.textContent = `${shortCat(c)} (${n})`;
    b.setAttribute("aria-pressed", String(state.category === c));
    b.addEventListener("click", () => {
      state.category = c; renderTabs(); renderList();
      const first = visibleTopics()[0];
      if (first && current().category !== c && c !== "All") select(`${first.number}-q1`);
    });
    els.categoryTabs.append(b);
  });
}

function visibleTopics() {
  const term = els.searchInput.value.trim().toLowerCase();
  return TOPICS.filter(t => (state.category === "All" || t.category === state.category) &&
    (!term || String(t.number) === term ||
      [t.title, t.category, ...t.questions.flatMap(q => [q.prompt, q.type, ...(q.vocabulary || [])])].join(" ").toLowerCase().includes(term)));
}

function renderList() {
  const list = visibleTopics();
  els.countPill.textContent = list.length;
  els.questionList.innerHTML = "";
  const cur = current();
  list.forEach(t => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `question-item${cur && cur.topicNumber === t.number ? " active" : ""}`;
    b.innerHTML = `<span class="question-id">${t.number}</span><span class="question-label">${K.escapeHtml(t.title)}<span class="topic-sub">${K.escapeHtml(shortCat(t.category))}</span></span>`;
    b.addEventListener("click", () => select(`${t.number}-q1`));
    els.questionList.append(b);
  });
  if (!list.length) els.questionList.innerHTML = '<p class="notes-hint" style="padding:10px">No matching topics.</p>';
}

/* ---------- main ---------- */
function renderQuestion() {
  const x = current();
  els.topicLabel.textContent = `Topic ${x.topicNumber} · ${x.topicTitle}`;
  els.questionTabs.innerHTML = "";
  items.filter(q => q.topicNumber === x.topicNumber).forEach(q => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "q-tab"; b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", String(q.key === x.key));
    b.innerHTML = `<strong>${q.id}</strong><span>${K.escapeHtml(q.type)}</span><small>${K.escapeHtml(q.timing)}</small>`;
    b.addEventListener("click", () => select(q.key));
    els.questionTabs.append(b);
  });
  els.questionMeta.innerHTML = `${K.escapeHtml(x.category)} · ${x.id} ${K.escapeHtml(x.type)} <span class="timing-badge">⏱ ${K.escapeHtml(x.timing)}</span>`;
  els.questionText.textContent = x.prompt;

  const branches = (x.structure.length ? x.structure : ["Answer", "Reason", "Example", "Ending"]).slice(0, 6)
    .map(s => { const [label, ...rest] = s.split(":"); return { label: label.trim(), hint: rest.join(":").trim() || "key words…" }; });
  state.mindMap = MindMap.mount($("mindMap"), { key: `toefl-${x.key}`, center: x.prompt, branches });

  els.structureList.innerHTML = x.structure.map(s => `<li>${K.escapeHtml(s)}</li>`).join("");
  els.patternList.innerHTML = x.patterns.map(p => `<li>${K.escapeHtml(p)}</li>`).join("");
  els.vocabList.innerHTML = x.vocabulary.map(v => `<span data-v="${K.escapeHtml(v.toLowerCase())}">${K.escapeHtml(v)}</span>`).join("");

  els.sampleAnswer.innerHTML = "";
  state.sampleSpans = K.wordSpans(els.sampleAnswer, x.model);
  els.sampleAnswer.hidden = true;
  els.toggleSampleButton.textContent = "Show";
  hideSampleAccuracy();
  renderList();
  markVocab();
}

function hideSampleAccuracy() {
  els.sampleBar.hidden = true; els.sampleAccuracy.hidden = true; els.sampleLegend.hidden = true;
  state.sampleSpans.forEach(w => w.el.classList.remove("ok", "miss", "speaking"));
}

function markVocab() {
  const t = ` ${els.transcriptBox.value.toLowerCase()} `;
  [...els.vocabList.children].forEach(s => s.classList.toggle("used", t.includes(s.dataset.v)));
}

/* ---------- timer ---------- */
function renderTimes() {
  els.timerControls.innerHTML = "";
  els.timerControls.style.gridTemplateColumns = "repeat(3, minmax(54px, 1fr))";
  TIMES.forEach(sec => {
    const b = document.createElement("button");
    b.type = "button"; b.className = `time-choice${sec === state.duration ? " active" : ""}`;
    b.textContent = sec >= 60 ? `${sec / 60 === 1 ? "1 min" : "90 sec"}` : `${sec} sec`;
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
      saveDraft(); updateCount(); markVocab();
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
  updateCount(); markVocab();
}
const saveDraft = () => K.store.set(DRAFT_PREFIX + state.key, els.transcriptBox.value);
const updateCount = () => { const n = wordsIn(els.transcriptBox.value); els.wordCount.textContent = `${n} word${n === 1 ? "" : "s"}`; };

/* ---------- model answer: listen + read-along ---------- */
function updateSampleBar(result, final) {
  const sum = K.accuracySummary(result, final, "model answer");
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
  state.stopListen = K.listenAlong(state.sampleSpans, 0.92, () => { state.listening = false; state.stopListen = null; els.speakSampleButton.textContent = "🔈 Listen"; });
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
  els.sampleAccuracy.textContent = "🎙 Listening… read the model answer aloud.";
  if (!readRec.start()) { els.sampleAccuracy.textContent = "Could not start the microphone. Try again."; stopSampleActivity(); }
}

/* ---------- select ---------- */
function select(key) {
  const x = items.find(i => i.key === key);
  if (!x) return;
  stopRecording(); stopSampleActivity();
  state.key = key;
  state.duration = defaultTime(x.timing);
  state.segments = []; state.rawBeforeClean = null; els.restoreButton.hidden = true;
  els.transcriptBox.value = K.store.get(DRAFT_PREFIX + key, "");
  renderTimes(); resetTimer(); renderQuestion(); updateCount();
  try { history.replaceState(null, "", `#${key}`); } catch {}
}

/* ---------- AI feedback (Jennifer's correction format) ---------- */
function aiPrompt() {
  const x = current();
  return K.feedbackPrompt({
    test: "TOEFL Speaking Interview", level: "CEFR B1–B2", question: x.prompt,
    context: [`Topic: ${x.topicTitle}`, `Question type: ${x.id} ${x.type} (suggested time ${x.timing})`, `Answer structure: ${x.structure.join(" → ")}`, `Target vocabulary: ${x.vocabulary.join(", ")}`],
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
  els.transcriptBox.value = ""; saveDraft(); updateCount(); markVocab();
  els.statusLine.textContent = "Ready for a new answer."; resetTimer();
});
els.transcriptBox.addEventListener("input", () => { saveDraft(); updateCount(); markVocab(); });
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
els.speakSampleButton.addEventListener("click", listenSample);
els.readSampleButton.addEventListener("click", readSample);
els.toggleSampleButton.addEventListener("click", () => {
  const hide = !els.sampleAnswer.hidden;
  if (hide) stopSampleActivity();
  els.sampleAnswer.hidden = hide; els.toggleSampleButton.textContent = hide ? "Show" : "Hide";
});
els.readQuestionButton.addEventListener("click", () => K.speak(current().prompt, 0.92));
els.randomButton.addEventListener("click", () => {
  const pool = items.filter(x => state.category === "All" || x.category === state.category);
  select(pool[Math.floor(Math.random() * pool.length)].key);
});
window.addEventListener("hashchange", () => { const k = location.hash.slice(1); if (k && k !== state.key) select(k); });

/* ---------- init ---------- */
renderTabs();
const startKey = items.some(i => i.key === location.hash.slice(1)) ? location.hash.slice(1) : (items[0] && items[0].key);
select(startKey);
if (!K.SR) els.statusLine.textContent = "Live speech typing is not supported in this browser. Open this page in Chrome or Edge, or type your answer.";
