/* GEPT Basic Speaking Practice — uses speaking-kit.js for read-along, clean-up, grammar polish. */
const K = window.SpeakingKit;
const questions = window.GEPT_QUESTIONS || [];
const DRAFT_PREFIX = "gept-basic-draft-";

const state = {
  selectedId: 1,
  duration: 15,
  remaining: 15,
  timerId: null,
  timerEndsAt: null,
  recording: false,
  segments: [],
  baseText: "",
  correctedText: "",
  readChecking: false,
  rawBeforeClean: null,
  sampleSpans: [],
  readSpans: [],
  stopListen: null,
  listening: false,
  readSampleMode: false
};

const els = {};
["questionList", "searchInput", "questionNumber", "questionText", "sampleAnswer", "sampleBar", "sampleBarFill", "sampleAccuracy",
  "questionTip", "practiceSentences", "timerDisplay", "recordButton", "resetButton", "statusLine", "transcriptBox",
  "mistakeReview", "correctedAnswer", "submitButton", "randomButton", "speakSampleButton", "readSampleButton",
  "readAloudButton", "readCheckStatus", "readBar", "readBarFill", "readLegend", "unclearWords",
  "cleanButton", "restoreButton", "copyTranscriptButton", "copySentencesButton"].forEach(id => { els[id] = document.querySelector(`#${id}`); });
els.timeChoices = document.querySelectorAll(".time-choice");

const nounMap = K.properNouns(questions.flatMap(q => [q.question, q.answer]));
const cleanText = K.cleaner(nounMap);
let answerRec = null;
let readRec = null;

function currentQuestion() {
  return questions.find(item => item.id === state.selectedId) || questions[0];
}

function answerTopic(question) {
  return question
    .replace(/^(what|where|when|who|why|how|do|does|did|are|is|can|have|has|tell me about|describe)\b/i, "")
    .replace(/[?.,]/g, "")
    .replace(/\b(you|your|would|could|if|so|or|and|the|a|an)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase() || "this question";
}

function splitSentences(text) {
  return text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s => s.trim()).filter(Boolean) || [];
}

function practiceSentencesFor(item) {
  if (item.patterns && item.patterns.length) return item.patterns;
  const sentences = splitSentences(item.answer);
  const topic = answerTopic(item.question);
  const first = sentences[0] || "I can answer this question clearly.";
  const second = sentences[1] || "It is a simple answer, but I can add one detail.";
  return [
    { pattern: "I think (answer) because (reason).", example: first },
    { pattern: "It is/They are (a feature or description).", example: second },
    { pattern: "There is/are (feature/detail), so (result).", example: `There are many things to say about ${topic}, so I can give one clear example.` },
    { pattern: "For example, (specific detail).", example: `For example, ${first.charAt(0).toLowerCase()}${first.slice(1)}` },
    { pattern: "In my opinion, (your idea) is (adjective) because (reason).", example: `In my opinion, ${topic} is important because it helps me speak more naturally.` }
  ];
}

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
  els.questionNumber.textContent = `Question ${item.id}`;
  els.questionText.textContent = item.question;
  els.sampleAnswer.innerHTML = "";
  state.sampleSpans = K.wordSpans(els.sampleAnswer, item.answer);
  hideSampleAccuracy();
  els.questionTip.textContent = item.tip ? `Tip: ${item.tip}` : "";
  els.practiceSentences.innerHTML = "";
  practiceSentencesFor(item).forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="pattern-line">${K.escapeHtml(entry.pattern)}</div><div class="example-line">e.g. ${K.escapeHtml(entry.example)}</div>`;
    els.practiceSentences.appendChild(li);
  });
  renderQuestionList(els.searchInput.value);
}

function hideSampleAccuracy() {
  els.sampleBar.hidden = true;
  els.sampleAccuracy.hidden = true;
  state.sampleSpans.forEach(w => w.el.classList.remove("ok", "miss", "speaking"));
}

function resetFeedbackBoxes() {
  els.mistakeReview.textContent = "Submit your answer to check grammar.";
  els.correctedAnswer.textContent = "Click Submit Answer after recording.";
  els.readCheckStatus.textContent = "Submit an answer first, then read the corrected version aloud.";
  els.readBar.hidden = true;
  els.readLegend.hidden = true;
  els.unclearWords.innerHTML = "";
  state.readSpans = [];
}

function selectQuestion(id) {
  stopEverything();
  state.selectedId = id;
  state.segments = [];
  state.correctedText = "";
  state.rawBeforeClean = null;
  els.restoreButton.hidden = true;
  els.transcriptBox.value = K.store.get(DRAFT_PREFIX + id, "");
  resetFeedbackBoxes();
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
    els.statusLine.textContent = "Time is up. Clean up your transcript, then click Submit Answer.";
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

/* ---------- recording the answer ---------- */
function startRecording() {
  stopReadAloudCheck();
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
    onBlocked(msg) {
      els.statusLine.textContent = msg;
      stopRecording();
    }
  });
  state.recording = true;
  els.mistakeReview.textContent = "Recording your answer...";
  els.correctedAnswer.textContent = "Click Submit Answer after recording.";
  els.recordButton.classList.add("recording");
  els.recordButton.innerHTML = '<span class="record-dot"></span>Stop Recording';
  els.statusLine.textContent = "Recording in English...";
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

/* ---------- clean up transcript ---------- */
function cleanUpTranscript() {
  const current = els.transcriptBox.value.trim();
  if (!current) { els.statusLine.textContent = "Record or type an answer first."; return; }
  state.rawBeforeClean = current;
  els.transcriptBox.value = cleanText(current, state.segments);
  els.restoreButton.hidden = false;
  saveDraft();
  els.statusLine.textContent = "Cleaned. Read it once, fix any wrong words, then click Submit Answer.";
}

/* ---------- submit: grammar polish + diff ---------- */
function submitAnswer() {
  stopRecording();
  stopReadAloudCheck();
  const transcript = els.transcriptBox.value.trim();
  if (!transcript) {
    els.mistakeReview.textContent = "Please record or type an answer first.";
    els.correctedAnswer.textContent = "Please record or type an answer first.";
    return;
  }
  const { text, notes } = K.grammarPolish(transcript);
  state.correctedText = text;
  const { originalHtml, correctedHtml } = K.diffHtml(transcript, text);
  const noteHtml = notes.length
    ? `<div class="correction-notes"><strong>Likely grammar fixes:</strong><ul>${notes.map(n => `<li>${K.escapeHtml(n)}</li>`).join("")}</ul></div>`
    : `<div class="correction-notes"><strong>No major rule-based grammar issue was found.</strong> Check fluency and ideas next.</div>`;
  els.mistakeReview.innerHTML = `${originalHtml || "No answer submitted."}${noteHtml}`;
  els.correctedAnswer.innerHTML = correctedHtml || "Please submit an answer first.";
  els.readCheckStatus.textContent = "Click Read Aloud and read the corrected answer out loud.";
  els.readBar.hidden = true;
  els.readLegend.hidden = true;
  els.unclearWords.innerHTML = "";
  els.statusLine.textContent = "Answer submitted. Now read the corrected version aloud.";
}

/* ---------- read-aloud check on corrected answer ---------- */
function startReadAloudCheck() {
  stopRecording();
  stopSampleActivity();
  if (!state.correctedText) {
    els.readCheckStatus.textContent = "Submit an answer first, then read the corrected version aloud.";
    return;
  }
  if (!K.SR) { els.readCheckStatus.textContent = "Live checking needs Chrome or Edge."; return; }
  els.correctedAnswer.innerHTML = "";
  state.readSpans = K.wordSpans(els.correctedAnswer, state.correctedText);
  els.readBar.hidden = false;
  els.readLegend.hidden = false;
  els.readBarFill.style.width = "0%";
  els.unclearWords.innerHTML = "";
  let spoken = "";
  readRec = K.recognizer({
    onUpdate(finals, interim) {
      spoken = `${finals.join(" ")} ${interim}`;
      state.lastReadSpoken = spoken;
      const result = K.align(state.readSpans, spoken);
      updateReadBar(result, false);
    },
    onBlocked(msg) { els.readCheckStatus.textContent = msg; stopReadAloudCheck(); }
  });
  state.readChecking = true;
  state.lastReadSpoken = "";
  els.readAloudButton.textContent = "Stop Check";
  els.readAloudButton.classList.add("live");
  els.readCheckStatus.textContent = "Listening. Read the corrected answer clearly.";
  document.querySelector(".readcheck-box")?.classList.add("active");
  if (!readRec.start()) els.readCheckStatus.textContent = "Read-aloud check could not start. Try again.";
}

function updateReadBar(result, final) {
  const sum = K.accuracySummary(result, final, "answer");
  els.readBarFill.style.width = `${sum.pct}%`;
  els.readBarFill.style.background = sum.pct >= 85 ? "var(--good)" : sum.pct >= 65 ? "var(--warm)" : "var(--danger)";
  els.readCheckStatus.innerHTML = sum.msg;
}

function stopReadAloudCheck() {
  if (!state.readChecking) return;
  if (readRec) { readRec.stop(); readRec = null; }
  state.readChecking = false;
  const result = K.align(state.readSpans, state.lastReadSpoken || "");
  updateReadBar(result, true);
  const missed = state.readSpans.filter(w => w.el.classList.contains("miss")).map(w => w.el.textContent.replace(/[^A-Za-z'’-]+/g, "")).filter(Boolean);
  els.unclearWords.innerHTML = "";
  if (state.lastReadSpoken) {
    if (!missed.length) {
      const chip = document.createElement("span");
      chip.className = "word-chip clear";
      chip.textContent = "All words clear";
      els.unclearWords.appendChild(chip);
    } else {
      [...new Set(missed)].slice(0, 24).forEach(word => {
        const chip = document.createElement("span");
        chip.className = "word-chip";
        chip.textContent = word;
        els.unclearWords.appendChild(chip);
      });
    }
  }
  els.readAloudButton.textContent = "Read Aloud";
  els.readAloudButton.classList.remove("live");
  document.querySelector(".readcheck-box")?.classList.remove("active");
}

/* ---------- sample answer: listen + read-along ---------- */
function stopSampleActivity() {
  if (state.stopListen) { state.stopListen(); state.stopListen = null; }
  if (state.readSampleMode) {
    if (readRec) { readRec.stop(); readRec = null; }
    state.readSampleMode = false;
    const result = K.align(state.sampleSpans, state.lastSampleSpoken || "");
    updateSampleBar(result, true);
  }
  K.stopSpeech();
  state.listening = false;
  els.speakSampleButton.textContent = "🔈 Listen";
  els.readSampleButton.textContent = "🎤 Read-Along Check";
  els.readSampleButton.classList.remove("live");
  state.sampleSpans.forEach(w => w.el.classList.remove("speaking"));
}

function listenSample() {
  if (state.listening) { stopSampleActivity(); return; }
  stopSampleActivity();
  hideSampleAccuracy();
  state.listening = true;
  els.speakSampleButton.textContent = "■ Stop";
  state.stopListen = K.listenAlong(state.sampleSpans, 0.9, () => {
    state.listening = false;
    state.stopListen = null;
    els.speakSampleButton.textContent = "🔈 Listen";
  });
}

function updateSampleBar(result, final) {
  const sum = K.accuracySummary(result, final, "sample answer");
  els.sampleBar.hidden = false;
  els.sampleAccuracy.hidden = false;
  els.sampleBarFill.style.width = `${sum.pct}%`;
  els.sampleBarFill.style.background = sum.pct >= 85 ? "var(--good)" : sum.pct >= 65 ? "var(--warm)" : "var(--danger)";
  els.sampleAccuracy.innerHTML = sum.msg;
}

function readSample() {
  if (state.readSampleMode) { stopSampleActivity(); return; }
  stopSampleActivity();
  stopRecording();
  stopReadAloudCheck();
  if (!K.SR) { els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = "Live checking needs Chrome or Edge."; return; }
  state.sampleSpans.forEach(w => w.el.classList.remove("ok", "miss"));
  state.lastSampleSpoken = "";
  readRec = K.recognizer({
    onUpdate(finals, interim) {
      state.lastSampleSpoken = `${finals.join(" ")} ${interim}`;
      updateSampleBar(K.align(state.sampleSpans, state.lastSampleSpoken), false);
    },
    onBlocked(msg) { els.sampleAccuracy.hidden = false; els.sampleAccuracy.textContent = msg; stopSampleActivity(); }
  });
  state.readSampleMode = true;
  els.readSampleButton.textContent = "■ Stop Check";
  els.readSampleButton.classList.add("live");
  els.sampleBar.hidden = false;
  els.sampleAccuracy.hidden = false;
  els.sampleAccuracy.textContent = "🎙 Listening… read the sample answer aloud.";
  if (!readRec.start()) { els.sampleAccuracy.textContent = "Could not start the microphone. Try again."; stopSampleActivity(); }
}

function stopEverything() {
  stopRecording();
  stopReadAloudCheck();
  stopSampleActivity();
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
    els.statusLine.textContent = "Recording stopped. Clean up your transcript, then click Submit Answer.";
  } else {
    startRecording();
  }
});

els.resetButton.addEventListener("click", () => {
  stopEverything();
  state.segments = [];
  state.correctedText = "";
  state.rawBeforeClean = null;
  els.restoreButton.hidden = true;
  els.transcriptBox.value = "";
  K.store.set(DRAFT_PREFIX + state.selectedId, "");
  resetFeedbackBoxes();
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

els.submitButton.addEventListener("click", submitAnswer);
els.randomButton.addEventListener("click", () => selectQuestion(questions[Math.floor(Math.random() * questions.length)].id));
els.speakSampleButton.addEventListener("click", listenSample);
els.readSampleButton.addEventListener("click", readSample);
els.readAloudButton.addEventListener("click", () => {
  if (state.readChecking) stopReadAloudCheck();
  else startReadAloudCheck();
});
els.copySentencesButton.addEventListener("click", async () => {
  const text = practiceSentencesFor(currentQuestion())
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
