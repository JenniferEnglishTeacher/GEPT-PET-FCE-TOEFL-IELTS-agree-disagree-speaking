/* Opinion Speaking Practice — structured Position/Reason/Example/Wrap-up with read-along,
   notes, clean-up and grammar check. Uses speaking-kit.js. */
const K = window.SpeakingKit;
const questions = window.GEPT_QUESTIONS || [];
const DRAFT_PREFIX = "opinion-draft-";
const NOTES_PREFIX = "opinion-notes-";

const SECTIONS = [
  { key: "position", label: "Position 立場", note: "My position", color: "#087b66" },
  { key: "reason", label: "Reason 理由", note: "My reasons (1–2)", color: "#4265a0" },
  { key: "example", label: "Example 例子", note: "My example", color: "#8a6f24" },
  { key: "wrapUp", label: "Wrap-up 總結", note: "My wrap-up", color: "#ae4d45" }
];

const state = {
  selectedId: 1,
  duration: 30,
  remaining: 30,
  timerId: null,
  timerEndsAt: null,
  recording: false,
  segments: [],
  baseText: "",
  rawBeforeClean: null,
  scope: "all",
  sections: [],           // [{key, spans}]
  stopListen: null,
  listening: false,
  readSampleMode: false
};

const els = {};
["questionList", "searchInput", "questionNumber", "questionText", "questionTip", "scopeChips", "structureCards",
  "speakSampleButton", "readSampleButton", "sampleBar", "sampleBarFill", "sampleAccuracy", "sampleLegend",
  "practiceSentences", "copySentencesButton", "notesGrid", "clearNotesButton",
  "timerDisplay", "recordButton", "resetButton", "statusLine", "transcriptBox",
  "cleanButton", "restoreButton", "copyTranscriptButton", "aiFeedbackButton", "randomButton"]
  .forEach(id => { els[id] = document.querySelector(`#${id}`); });
els.timeChoices = document.querySelectorAll(".time-choice");

const nounMap = K.properNouns(questions.flatMap(q => [q.question, q.answer]));
const cleanText = K.cleaner(nounMap);
let answerRec = null;
let readRec = null;

const currentQuestion = () => questions.find(item => item.id === state.selectedId) || questions[0];
const typeOf = item => (item.tip || "").split(" ")[0] || "OPINION";

function sectionTexts(item) {
  if (item.structured) {
    return SECTIONS.map(s => ({ ...s, text: item.structured[s.key] || "" })).filter(s => s.text);
  }
  return [{ key: "answer", label: "Sample Answer", note: "My answer", color: "#087b66", text: item.answer }];
}

/* ---------- rendering ---------- */
function renderQuestionList(filter = "") {
  const term = filter.trim().toLowerCase();
  const visible = questions.filter(item => !term || String(item.id) === term || item.question.toLowerCase().includes(term));
  els.questionList.innerHTML = "";
  visible.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `question-item${item.id === state.selectedId ? " active" : ""}`;
    button.innerHTML = `<span class="question-id">${item.id}</span><span class="question-label">${K.escapeHtml(item.question)}</span>`;
    button.addEventListener("click", () => selectQuestion(item.id));
    els.questionList.appendChild(button);
  });
}

function renderSelectedQuestion() {
  const item = currentQuestion();
  if (!item) return;
  els.questionNumber.textContent = `Question ${item.id} · ${typeOf(item)}`;
  els.questionText.textContent = item.question;
  els.questionTip.textContent = item.tip || "";

  const sections = sectionTexts(item);
  els.structureCards.innerHTML = "";
  state.sections = sections.map(section => {
    const card = document.createElement("section");
    card.className = "structure-card";
    card.style.setProperty("--c", section.color);
    card.dataset.key = section.key;
    const h = document.createElement("h3");
    h.textContent = section.label;
    const listenBtn = document.createElement("button");
    listenBtn.type = "button";
    listenBtn.className = "small-button";
    listenBtn.textContent = "🔈";
    listenBtn.title = `Listen to ${section.label}`;
    h.appendChild(listenBtn);
    const p = document.createElement("p");
    const spans = K.wordSpans(p, section.text);
    card.append(h, p);
    els.structureCards.appendChild(card);
    listenBtn.addEventListener("click", () => listenSection(section.key));
    return { key: section.key, spans };
  });

  els.scopeChips.innerHTML = "";
  const chipDefs = [["all", "Whole answer"], ...sections.map(s => [s.key, s.label.split(" ")[0]])];
  if (chipDefs.length <= 2) chipDefs.length = 1; // single-section answers need no chips
  chipDefs.forEach(([val, label]) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.dataset.scope = val;
    chip.textContent = label;
    chip.addEventListener("click", () => { stopSampleActivity(); state.scope = val; applyScope(); });
    els.scopeChips.appendChild(chip);
  });
  applyScope();

  els.practiceSentences.innerHTML = "";
  (item.patterns || []).forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="pattern-line">${K.escapeHtml(entry.pattern)}</div><div class="example-line">e.g. ${K.escapeHtml(entry.example)}</div>`;
    els.practiceSentences.appendChild(li);
  });

  renderNotes(item, sections);
  renderQuestionList(els.searchInput.value);
}

function renderNotes(item, sections) {
  const saved = K.store.get(NOTES_PREFIX + item.id, {});
  els.notesGrid.innerHTML = "";
  sections.forEach((section, i) => {
    const row = document.createElement("div");
    row.className = "note-row";
    row.style.setProperty("--c", section.color);
    const id = `note-${i}`;
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = section.note;
    const ta = document.createElement("textarea");
    ta.id = id;
    ta.placeholder = "key words / ideas…";
    ta.value = saved[i] || "";
    ta.addEventListener("input", () => {
      const all = K.store.get(NOTES_PREFIX + item.id, {});
      all[i] = ta.value;
      K.store.set(NOTES_PREFIX + item.id, all);
    });
    row.append(label, ta);
    els.notesGrid.appendChild(row);
  });
}

function applyScope() {
  [...els.scopeChips.children].forEach(chip => chip.setAttribute("aria-pressed", String(chip.dataset.scope === state.scope)));
  [...els.structureCards.children].forEach(card => card.classList.toggle("dim", state.scope !== "all" && card.dataset.key !== state.scope));
  allSpans().forEach(w => w.el.classList.remove("ok", "miss", "speaking"));
  hideSampleAccuracy();
}

const allSpans = () => state.sections.flatMap(s => s.spans);
const scopedSpans = () => (state.scope === "all" ? allSpans() : (state.sections.find(s => s.key === state.scope)?.spans || []));

function hideSampleAccuracy() {
  els.sampleBar.hidden = true;
  els.sampleAccuracy.hidden = true;
  els.sampleLegend.hidden = true;
}

function selectQuestion(id) {
  stopEverything();
  state.selectedId = id;
  state.scope = "all";
  state.segments = [];
  state.rawBeforeClean = null;
  els.restoreButton.hidden = true;
  els.transcriptBox.value = K.store.get(DRAFT_PREFIX + id, "");
  resetTimer();
  renderSelectedQuestion();
  try { history.replaceState(null, "", `#${id}`); } catch {}
}

/* ---------- timer ---------- */
function resetTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.timerEndsAt = null;
  state.remaining = state.duration;
  els.timerDisplay.textContent = state.remaining;
  els.timerDisplay.classList.remove("warning");
}

function updateTimerDisplay() {
  if (!state.timerEndsAt) return;
  state.remaining = Math.max(0, Math.ceil((state.timerEndsAt - Date.now()) / 1000));
  els.timerDisplay.textContent = state.remaining;
  els.timerDisplay.classList.toggle("warning", state.remaining <= 5);
  if (state.remaining <= 0) {
    K.beep();
    stopRecording();
    els.statusLine.textContent = "Time is up. Clean up your transcript, then copy it for feedback.";
  }
}

function startTimer() {
  clearInterval(state.timerId);
  state.remaining = state.duration;
  state.timerEndsAt = Date.now() + state.duration * 1000;
  els.timerDisplay.textContent = state.remaining;
  els.timerDisplay.classList.remove("warning");
  state.timerId = setInterval(updateTimerDisplay, 250);
}

/* ---------- recording ---------- */
function startRecording() {
  stopSampleActivity();
  if (!K.SR) {
    els.statusLine.textContent = "Speech recognition is not available in this browser. Try Chrome or Edge, or type your answer.";
    startTimer();
    return;
  }
  state.baseText = els.transcriptBox.value.trim();
  state.segments = state.baseText ? [state.baseText] : [];
  state.rawBeforeClean = null;
  els.restoreButton.hidden = true;
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
  els.statusLine.textContent = "Recording in English... Follow your notes: Position → Reason → Example → Wrap-up.";
  startTimer();
  if (!answerRec.start()) els.statusLine.textContent = "Speech-to-text is already active. The timer is still running.";
}

function stopRecording() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.timerEndsAt = null;
  if (answerRec) { answerRec.stop(); answerRec = null; }
  if (state.recording && state.segments.length) {
    els.transcriptBox.value = state.segments.join(" ");
    saveDraft();
  }
  state.recording = false;
  els.recordButton.classList.remove("recording");
  els.recordButton.innerHTML = '<span class="record-dot"></span>Start Recording';
}

const saveDraft = () => K.store.set(DRAFT_PREFIX + state.selectedId, els.transcriptBox.value);

/* ---------- clean up + submit ---------- */
function cleanUpTranscript() {
  const current = els.transcriptBox.value.trim();
  if (!current) { els.statusLine.textContent = "Record or type an answer first."; return; }
  state.rawBeforeClean = current;
  els.transcriptBox.value = cleanText(current, state.segments);
  els.restoreButton.hidden = false;
  saveDraft();
  els.statusLine.textContent = "Cleaned. Read it once, fix any wrong words, then copy it for feedback.";
}

/* ---------- model answer: listen + read-along ---------- */
function stopSampleActivity() {
  if (state.stopListen) { state.stopListen(); state.stopListen = null; }
  if (state.readSampleMode) {
    if (readRec) { readRec.stop(); readRec = null; }
    state.readSampleMode = false;
    updateSampleBar(K.align(scopedSpans(), state.lastSampleSpoken || ""), true);
  }
  K.stopSpeech();
  state.listening = false;
  els.speakSampleButton.textContent = "🔈 Listen";
  els.readSampleButton.textContent = "🎤 Read-Along Check";
  els.readSampleButton.classList.remove("live");
  allSpans().forEach(w => w.el.classList.remove("speaking"));
}

function listenSection(key) {
  stopSampleActivity();
  state.scope = key;
  applyScope();
  state.listening = true;
  els.speakSampleButton.textContent = "■ Stop";
  state.stopListen = K.listenAlong(scopedSpans(), 0.92, () => {
    state.listening = false;
    state.stopListen = null;
    els.speakSampleButton.textContent = "🔈 Listen";
  });
}

function listenSample() {
  if (state.listening) { stopSampleActivity(); return; }
  stopSampleActivity();
  state.listening = true;
  els.speakSampleButton.textContent = "■ Stop";
  state.stopListen = K.listenAlong(scopedSpans(), 0.92, () => {
    state.listening = false;
    state.stopListen = null;
    els.speakSampleButton.textContent = "🔈 Listen";
  });
}

function updateSampleBar(result, final) {
  const sum = K.accuracySummary(result, final, state.scope === "all" ? "answer" : "section");
  els.sampleBar.hidden = false;
  els.sampleAccuracy.hidden = false;
  els.sampleLegend.hidden = false;
  els.sampleBarFill.style.width = `${sum.pct}%`;
  els.sampleBarFill.style.background = sum.pct >= 85 ? "var(--good)" : sum.pct >= 65 ? "var(--warm)" : "var(--danger)";
  els.sampleAccuracy.innerHTML = sum.msg;
}

function readSample() {
  if (state.readSampleMode) { stopSampleActivity(); return; }
  stopSampleActivity();
  stopRecording();
  if (!K.SR) { els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = "Live checking needs Chrome or Edge."; return; }
  scopedSpans().forEach(w => w.el.classList.remove("ok", "miss"));
  state.lastSampleSpoken = "";
  readRec = K.recognizer({
    onUpdate(finals, interim) {
      state.lastSampleSpoken = `${finals.join(" ")} ${interim}`;
      updateSampleBar(K.align(scopedSpans(), state.lastSampleSpoken), false);
    },
    onBlocked(msg) { els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = msg; stopSampleActivity(); }
  });
  state.readSampleMode = true;
  els.readSampleButton.textContent = "■ Stop Check";
  els.readSampleButton.classList.add("live");
  els.sampleBar.hidden = false;
  els.sampleAccuracy.hidden = false;
  els.sampleAccuracy.textContent = "🎙 Listening… read the highlighted part aloud.";
  if (!readRec.start()) { els.sampleAccuracy.textContent = "Could not start the microphone. Try again."; stopSampleActivity(); }
}

function stopEverything() {
  stopRecording();
  stopSampleActivity();
}

/* ---------- AI feedback prompt (matches Jennifer's correction format) ---------- */
function aiFeedbackPrompt() {
  const item = currentQuestion();
  const notes = K.store.get(NOTES_PREFIX + item.id, {});
  const sections = sectionTexts(item);
  const noteLines = sections.map((s, i) => (notes[i] ? `- ${s.note}: ${notes[i]}` : "")).filter(Boolean).join("\n");
  return `Please correct my opinion speaking response.

Question: ${item.question}
Question type: ${typeOf(item)}
Time limit: ${state.duration} seconds
${noteLines ? `\nMy notes:\n${noteLines}\n` : ""}
My transcript (speech-to-text):
${els.transcriptBox.value.trim()}

Please give me:
1. My original response with proper punctuation and spelling.
2. A short summary: main thesis → supporting argument, examples, effects, conclusion.
3. Grammar corrections.
4. Transition corrections: add or fix transitions I omitted or misused. Use "First" and "Second", not "Firstly" or "Secondly".
5. An improved version that keeps my own structure, with a formal opening thesis, added examples where I gave none, and a brief, precise conclusion. Put important words and transitions in bold.`;
}

/* ---------- events ---------- */
els.searchInput.addEventListener("input", () => renderQuestionList(els.searchInput.value));

els.timeChoices.forEach(button => {
  button.addEventListener("click", () => {
    state.duration = Number(button.dataset.seconds);
    els.timeChoices.forEach(choice => choice.classList.toggle("active", choice === button));
    resetTimer();
  });
});

els.recordButton.addEventListener("click", () => {
  if (state.recording) {
    stopRecording();
    els.statusLine.textContent = "Recording stopped. Clean up your transcript, then copy it for feedback.";
  } else {
    startRecording();
  }
});

els.resetButton.addEventListener("click", () => {
  stopEverything();
  state.segments = [];
  state.rawBeforeClean = null;
  els.restoreButton.hidden = true;
  els.transcriptBox.value = "";
  K.store.set(DRAFT_PREFIX + state.selectedId, "");
  els.statusLine.textContent = "Ready for a new answer.";
  resetTimer();
});

els.transcriptBox.addEventListener("input", saveDraft);
els.cleanButton.addEventListener("click", cleanUpTranscript);
els.restoreButton.addEventListener("click", () => {
  if (state.rawBeforeClean == null) return;
  els.transcriptBox.value = state.rawBeforeClean;
  state.rawBeforeClean = null;
  els.restoreButton.hidden = true;
  saveDraft();
  els.statusLine.textContent = "Original transcript restored.";
});
els.copyTranscriptButton.addEventListener("click", async () => {
  if (!els.transcriptBox.value.trim()) { els.statusLine.textContent = "Nothing to copy yet."; return; }
  const ok = await K.copyText(els.transcriptBox.value.trim());
  els.statusLine.textContent = ok ? "Transcript copied." : "Clipboard was blocked — select the text and copy it manually.";
});
els.aiFeedbackButton.addEventListener("click", async () => {
  if (!els.transcriptBox.value.trim()) { els.statusLine.textContent = "Record or type an answer first."; return; }
  const ok = await K.copyText(aiFeedbackPrompt());
  els.statusLine.textContent = ok ? "Copied with the question and your notes. Paste it to Claude or ChatGPT for full feedback." : "Clipboard was blocked — copy the transcript manually.";
});

els.randomButton.addEventListener("click", () => selectQuestion(questions[Math.floor(Math.random() * questions.length)].id));
els.speakSampleButton.addEventListener("click", listenSample);
els.readSampleButton.addEventListener("click", readSample);
els.clearNotesButton.addEventListener("click", () => {
  if (!window.confirm("Clear your notes for this question?")) return;
  K.store.set(NOTES_PREFIX + state.selectedId, {});
  renderNotes(currentQuestion(), sectionTexts(currentQuestion()));
});
els.copySentencesButton.addEventListener("click", async () => {
  const text = (currentQuestion().patterns || [])
    .map((entry, index) => `${index + 1}. ${entry.pattern}\ne.g. ${entry.example}`)
    .join("\n\n");
  const ok = await K.copyText(text);
  els.statusLine.textContent = ok ? "Practice sentences copied." : "Clipboard access was blocked, but the sentences are still shown above.";
});

/* ---------- init ---------- */
const hashId = Number(location.hash.slice(1));
state.selectedId = questions.some(q => q.id === hashId) ? hashId : (questions[0] ? questions[0].id : 1);
els.transcriptBox.value = K.store.get(DRAFT_PREFIX + state.selectedId, "");
renderQuestionList();
renderSelectedQuestion();
resetTimer();
if (!K.SR) els.statusLine.textContent = "Live speech typing is not supported in this browser. Open this page in Chrome or Edge, or type your answer.";
