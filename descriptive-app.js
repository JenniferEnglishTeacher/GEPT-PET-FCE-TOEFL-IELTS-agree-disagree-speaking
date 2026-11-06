/* Descriptive Speaking — model answers with read-along, key words, notes, timed recording,
   transcript clean-up and local feedback. Uses speaking-kit.js. */
const K = window.SpeakingKit;
const prompts = (typeof descriptivePrompts !== "undefined" ? descriptivePrompts : (window.descriptivePrompts || []));
const IELTS_BOT_URL = "https://chatgpt.com/g/g-2DNF8ArXs-grade-your-ielts-speaking";
const DRAFT_PREFIX = "desc-draft-";
const NOTES_PREFIX = "desc-notes-";

const NOTE_FIELDS = [
  { label: "Opening", hint: "what / who you will talk about" },
  { label: "Details", hint: "who · what · where · when" },
  { label: "Feeling / Reason", hint: "why it is special or memorable" },
  { label: "Ending", hint: "one personal reflection" }
];

const $ = sel => document.querySelector(sel);
const els = {
  search: $("#searchInput"), categoryTabs: $("#categoryTabs"), topicList: $("#topicList"), topicCount: $("#topicCount"),
  categoryLabel: $("#categoryLabel"), promptText: $("#promptText"), readPromptBtn: $("#readPromptBtn"),
  modelAnswer: $("#modelAnswer"), rate: $("#rateSelect"), listenBtn: $("#listenBtn"), readAlongBtn: $("#readAlongBtn"), stopSampleBtn: $("#stopSampleBtn"),
  accuracyBox: $("#accuracyBox"), accuracyFill: $("#accuracyFill"), accuracyText: $("#accuracyText"), modelStatus: $("#modelStatus"),
  readKeywordsBtn: $("#readKeywordsBtn"), keywordGrid: $("#keywordGrid"),
  notesGrid: $("#notesGrid"), clearNotesBtn: $("#clearNotesBtn"),
  timeSelect: $("#timeSelect"), timer: $("#timerDisplay"), timerFill: $("#timerFill"),
  recordBtn: $("#recordBtn"), stopBtn: $("#stopBtn"), resetBtn: $("#resetBtn"), speechStatus: $("#speechStatus"), audio: $("#audioPlayback"),
  transcript: $("#transcript"), stats: $("#statsText"),
  cleanBtn: $("#cleanBtn"), restoreBtn: $("#restoreBtn"), copyBtn: $("#copyBtn"), gptBotBtn: $("#gptBotBtn"), botStatus: $("#botStatus"),
};

const categories = ["All", ...new Set(prompts.map(item => item.category))];
let activeCategory = "All";
let active = prompts[0];
let modelSpans = [];
let timer = null, elapsed = 0, mediaRecorder = null, chunks = [];
let segments = [], baseText = "", rawBeforeClean = null;
let answerRec = null, readRec = null, stopListen = null, readAlongMode = false, lastSpoken = "";

const nounMap = K.properNouns(prompts.flatMap(p => [p.title, p.prompt, p.model]));
const cleanText = K.cleaner(nounMap);

function setStatus(node, msg, kind = "") {
  node.innerHTML = msg;
  node.className = node === els.speechStatus ? `status-text ${kind}`.trim() : `status-text compact ${kind}`.trim();
}

/* ---------- rendering ---------- */
function filteredPrompts() {
  const query = els.search.value.trim().toLowerCase();
  return prompts.filter(item => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const haystack = [item.category, item.title, item.prompt, item.model, ...item.keywords].join(" ").toLowerCase();
    return categoryMatch && haystack.includes(query);
  });
}

function renderCategories() {
  els.categoryTabs.innerHTML = "";
  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-tab";
    button.textContent = category === "All" ? `All (${prompts.length})` : category;
    button.setAttribute("aria-pressed", String(category === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = category;
      const first = filteredPrompts()[0];
      renderCategories();
      renderTopics();
      if (first && first !== active) select(first);
    });
    els.categoryTabs.append(button);
  });
}

function renderTopics() {
  const list = filteredPrompts();
  els.topicCount.textContent = `${list.length} shown`;
  els.topicList.innerHTML = "";
  list.forEach(item => {
    const button = document.createElement("button");
    button.className = "topic-button";
    button.type = "button";
    button.innerHTML = `<strong>${K.escapeHtml(item.title)}</strong><br><span>${K.escapeHtml(item.category)}</span>`;
    button.setAttribute("aria-current", String(item === active));
    button.addEventListener("click", () => select(item));
    els.topicList.append(button);
  });
  if (!list.length) els.topicList.innerHTML = '<p class="hint">No matching prompts.</p>';
}

function renderActive() {
  els.categoryLabel.textContent = active.category;
  els.promptText.textContent = active.prompt;
  els.modelAnswer.innerHTML = "";
  modelSpans = [];
  const p = document.createElement("p");
  K.wordSpans(p, active.model, modelSpans);
  els.modelAnswer.append(p);
  els.accuracyBox.hidden = true;
  els.keywordGrid.innerHTML = "";
  active.keywords.forEach(word => {
    const span = document.createElement("span");
    span.className = "keyword";
    span.textContent = word;
    els.keywordGrid.append(span);
  });
  renderNotes();
}

function renderNotes() {
  const saved = K.store.get(NOTES_PREFIX + active.number, {});
  els.notesGrid.innerHTML = "";
  NOTE_FIELDS.forEach((field, i) => {
    const row = document.createElement("div");
    row.className = "note-row";
    const id = `note-${i}`;
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = field.label;
    const sub = document.createElement("span");
    sub.textContent = field.hint;
    label.append(sub);
    const ta = document.createElement("textarea");
    ta.id = id;
    ta.rows = 2;
    ta.placeholder = "key words / ideas…";
    ta.value = saved[i] || "";
    ta.addEventListener("input", () => {
      const all = K.store.get(NOTES_PREFIX + active.number, {});
      all[i] = ta.value;
      K.store.set(NOTES_PREFIX + active.number, all);
    });
    row.append(label, ta);
    els.notesGrid.append(row);
  });
}

function select(item) {
  stopEverything();
  active = item;
  segments = [];
  elapsed = 0;
  rawBeforeClean = null;
  els.restoreBtn.hidden = true;
  els.transcript.value = K.store.get(DRAFT_PREFIX + item.number, "");
  els.audio.hidden = true;
  els.audio.removeAttribute("src");
  try { history.replaceState(null, "", `#${item.number}`); } catch {}
  renderTopics();
  renderActive();
  resetTimer();
  updateStats();
  setStatus(els.modelStatus, "Listen first, then press <b>Read-Along Check</b> and read the model aloud. Words the computer hears correctly turn green.");
}

/* ---------- model listen + read-along ---------- */
function stopSampleActivity() {
  if (stopListen) { stopListen(); stopListen = null; }
  if (readAlongMode) {
    if (readRec) { readRec.stop(); readRec = null; }
    readAlongMode = false;
    updateAccuracy(K.align(modelSpans, lastSpoken || ""), true);
    setStatus(els.modelStatus, "Stopped. Red words were missed or unclear — click <b>Listen</b> to hear them, then try again.");
  }
  K.stopSpeech();
  els.listenBtn.disabled = false;
  els.readAlongBtn.disabled = false;
  els.stopSampleBtn.disabled = true;
  els.readAlongBtn.classList.remove("live");
  modelSpans.forEach(w => w.el.classList.remove("speaking"));
}

function listenModel() {
  stopSampleActivity();
  modelSpans.forEach(w => w.el.classList.remove("ok", "miss"));
  els.accuracyBox.hidden = true;
  els.listenBtn.disabled = true;
  els.readAlongBtn.disabled = true;
  els.stopSampleBtn.disabled = false;
  setStatus(els.modelStatus, "Listening… follow the highlighted words.", "active");
  stopListen = K.listenAlong(modelSpans, Number(els.rate.value), () => {
    stopListen = null;
    stopSampleActivity();
    setStatus(els.modelStatus, "Finished. Now try <b>Read-Along Check</b> and read it yourself.");
  });
}

function readAlongModel() {
  stopSampleActivity();
  if (!K.SR) { setStatus(els.modelStatus, "Live speech checking needs Chrome or Edge.", "warning"); return; }
  modelSpans.forEach(w => w.el.classList.remove("ok", "miss"));
  els.accuracyBox.hidden = false;
  els.accuracyFill.style.width = "0%";
  lastSpoken = "";
  readRec = K.recognizer({
    onUpdate(finals, interim) {
      lastSpoken = `${finals.join(" ")} ${interim}`;
      updateAccuracy(K.align(modelSpans, lastSpoken), false);
    },
    onBlocked(msg) { setStatus(els.modelStatus, msg, "warning"); stopSampleActivity(); }
  });
  readAlongMode = true;
  els.listenBtn.disabled = true;
  els.readAlongBtn.disabled = true;
  els.stopSampleBtn.disabled = false;
  els.readAlongBtn.classList.add("live");
  setStatus(els.modelStatus, "🎙 Listening… read the model aloud at a natural speed. Press <b>Stop</b> when you finish.", "active");
  if (!readRec.start()) { setStatus(els.modelStatus, "Could not start the microphone. Try again.", "warning"); stopSampleActivity(); }
}

function updateAccuracy(result, final) {
  const sum = K.accuracySummary(result, final, "model answer");
  els.accuracyBox.hidden = false;
  els.accuracyFill.style.width = `${sum.pct}%`;
  els.accuracyFill.style.background = sum.pct >= 85 ? "var(--ok, #1f7a4d)" : sum.pct >= 65 ? "var(--gold)" : "var(--danger)";
  els.accuracyText.innerHTML = sum.msg;
}

/* ---------- speaking ---------- */
function resetTimer() {
  clearInterval(timer);
  timer = null;
  els.timer.textContent = K.fmt(Number(els.timeSelect.value));
  els.timer.classList.remove("warn");
  els.timerFill.style.width = "0%";
}

async function startRecording() {
  stopSampleActivity();
  if (!K.SR && !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    setStatus(els.speechStatus, "This browser cannot record. Please open the page in Chrome or Edge, or type your answer.", "warning");
    return;
  }
  rawBeforeClean = null;
  els.restoreBtn.hidden = true;
  baseText = els.transcript.value.trim();
  segments = baseText ? [baseText] : [];
  resetTimer();
  elapsed = 0;
  const total = Number(els.timeSelect.value);
  let remaining = total;
  els.recordBtn.disabled = true;
  els.recordBtn.classList.add("live");
  els.stopBtn.disabled = false;
  els.audio.hidden = true;
  els.audio.removeAttribute("src");
  timer = setInterval(() => {
    remaining--; elapsed++;
    els.timer.textContent = K.fmt(Math.max(remaining, 0));
    els.timer.classList.toggle("warn", remaining <= 10);
    els.timerFill.style.width = `${Math.min(100, (elapsed / total) * 100)}%`;
    updateStats();
    if (remaining <= 0) { K.beep(); stopRecording("⏰ Time's up! Now press <b>Clean Up Transcript</b>, check it, and copy it."); }
  }, 1000);

  let audioOn = false;
  try {
    if (navigator.mediaDevices && window.MediaRecorder) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        if (chunks.length) { els.audio.src = URL.createObjectURL(new Blob(chunks, { type: chunks[0].type || "audio/webm" })); els.audio.hidden = false; }
      };
      mediaRecorder.start();
      audioOn = true;
    }
  } catch (err) { setStatus(els.speechStatus, `Microphone blocked: ${err.message}. You can still type.`, "warning"); }
  if (!timer) return;

  answerRec = K.SR ? K.recognizer({
    onUpdate(finals, interim) {
      segments = (baseText ? [baseText] : []).concat(finals);
      els.transcript.value = `${segments.join(" ")} ${interim}`.trim();
      els.transcript.scrollTop = els.transcript.scrollHeight;
      saveDraft();
      updateStats();
    },
    onBlocked(msg) { setStatus(els.speechStatus, msg, "warning"); }
  }) : null;
  const live = answerRec ? answerRec.start() : false;
  setStatus(els.speechStatus, live ? (audioOn ? "🎙 Recording and typing your speech live…" : "🎙 Typing your speech live (audio playback not available).")
    : audioOn ? "Recording audio. Live typing is not supported in this browser — type your answer after speaking." : "Type your answer in the box.", live ? "active" : "warning");
}

function stopRecording(msg = "Stopped. Press <b>Clean Up Transcript</b>, check it, then copy it for feedback.", kind = "") {
  clearInterval(timer);
  timer = null;
  if (answerRec) { answerRec.stop(); answerRec = null; }
  if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
  mediaRecorder = null;
  els.recordBtn.disabled = false;
  els.recordBtn.classList.remove("live");
  els.stopBtn.disabled = true;
  setStatus(els.speechStatus, msg, kind);
  if (segments.length) els.transcript.value = segments.join(" ");
  saveDraft();
  updateStats();
}

function updateStats() {
  const words = els.transcript.value.trim().split(/\s+/).filter(Boolean).length;
  els.stats.textContent = words ? `${words} words${elapsed ? ` in ${K.fmt(elapsed)}` : ""}` : "";
}

const saveDraft = () => { if (active) K.store.set(DRAFT_PREFIX + active.number, els.transcript.value); };

function stopEverything() {
  stopSampleActivity();
  if (timer || answerRec) stopRecording();
}

/* ---------- clean up ---------- */
function cleanUpTranscript() {
  const current = els.transcript.value.trim();
  if (!current) { setStatus(els.botStatus, "Record or type an answer first.", "warning"); return; }
  rawBeforeClean = current;
  els.transcript.value = cleanText(current, segments);
  els.restoreBtn.hidden = false;
  saveDraft();
  updateStats();
  setStatus(els.botStatus, "✨ Cleaned. Computers are not perfect — read it once, fix any wrong words, then copy it.", "active");
}

/* ---------- IELTS bot ---------- */
function buildBotPrompt() {
  const notes = K.store.get(NOTES_PREFIX + active.number, {});
  return K.feedbackPrompt({
    test: "iTEP / IELTS-style descriptive", level: "CEFR B1", question: active.prompt,
    context: [`Category: ${active.category}`, `Useful key words and phrases: ${active.keywords.join(", ")}`],
    mindmap: NOTE_FIELDS.map((f, i) => ({ clue: f.label, hint: f.hint, text: (notes[i] || "").trim() })),
    transcript: els.transcript.value.trim(), seconds: Number(els.timeSelect.value)
  });
}

async function openIeltsBot() {
  if (!els.transcript.value.trim()) {
    setStatus(els.botStatus, "Please record, voice-type, or type a response first.", "warning");
    els.transcript.focus();
    return;
  }
  if (rawBeforeClean == null) cleanUpTranscript(); // always send the clean transcription
  const ok = await K.copyText(buildBotPrompt());
  setStatus(els.botStatus, ok ? "Copied: prompt + your notes + clean transcription. The IELTS bot is opening — paste it there (or into Claude)." : "Could not copy automatically. Please copy manually.", ok ? "active" : "warning");
  window.open(IELTS_BOT_URL, "_blank", "noopener");
}

/* ---------- events ---------- */
els.readPromptBtn.addEventListener("click", () => K.speak(active.prompt, Number(els.rate.value)));
els.readKeywordsBtn.addEventListener("click", () => K.speak(active.keywords.join(". "), 0.82));
els.listenBtn.addEventListener("click", listenModel);
els.readAlongBtn.addEventListener("click", readAlongModel);
els.stopSampleBtn.addEventListener("click", stopSampleActivity);
els.clearNotesBtn.addEventListener("click", () => {
  if (!window.confirm("Clear your notes for this prompt?")) return;
  K.store.set(NOTES_PREFIX + active.number, {});
  renderNotes();
});
els.timeSelect.addEventListener("change", () => { if (!timer) resetTimer(); });
els.recordBtn.addEventListener("click", startRecording);
els.stopBtn.addEventListener("click", () => stopRecording());
els.resetBtn.addEventListener("click", () => {
  if (timer) stopRecording();
  if (els.transcript.value.trim() && !window.confirm("Clear your transcript for this prompt?")) return;
  els.transcript.value = "";
  segments = [];
  elapsed = 0;
  rawBeforeClean = null;
  els.restoreBtn.hidden = true;
  els.audio.hidden = true;
  els.audio.removeAttribute("src");
  resetTimer();
  saveDraft();
  updateStats();
  setStatus(els.speechStatus, "Ready. Chrome or Edge works best for live speech typing.");
});
els.transcript.addEventListener("input", () => { saveDraft(); updateStats(); });
els.cleanBtn.addEventListener("click", cleanUpTranscript);
els.restoreBtn.addEventListener("click", () => {
  if (rawBeforeClean == null) return;
  els.transcript.value = rawBeforeClean;
  rawBeforeClean = null;
  els.restoreBtn.hidden = true;
  saveDraft();
  updateStats();
  setStatus(els.botStatus, "Original transcript restored.");
});
els.copyBtn.addEventListener("click", async () => {
  if (!els.transcript.value.trim()) { setStatus(els.botStatus, "Nothing to copy yet.", "warning"); return; }
  const ok = await K.copyText(els.transcript.value.trim());
  setStatus(els.botStatus, ok ? "📋 Copied! Paste it into your document or chat to get feedback." : "Could not copy automatically — select the text and copy it manually.", ok ? "active" : "warning");
});
els.gptBotBtn.addEventListener("click", openIeltsBot);
els.search.addEventListener("input", renderTopics);

/* ---------- init ---------- */
const fromHash = prompts.find(p => String(p.number) === location.hash.slice(1));
active = fromHash || prompts[0];
if (fromHash) activeCategory = "All";
els.transcript.value = K.store.get(DRAFT_PREFIX + active.number, "");
renderCategories();
renderTopics();
renderActive();
resetTimer();
updateStats();
if (!K.SR) setStatus(els.speechStatus, "Live speech typing is not supported in this browser. Open the page in Chrome or Edge, or type your answer.", "warning");
