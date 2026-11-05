/* Opinion & Topic Speaking — one page for 120 opinion questions (Position/Reason/Example/Wrap-up)
   and 27 topic-board prompts (viewpoints + Argument/Explanation/Example/Effect/Wrap-up model).
   Read-along, notes beside the timer, transcript clean-up, AI-feedback copy. Uses speaking-kit.js. */
const K = window.SpeakingKit;
const DRAFT_PREFIX = "opinion-draft-";
const NOTES_PREFIX = "opinion-notes-";
const VIEW_PREFIX = "opinion-view-";

const OPINION_SECTIONS = [
  { key: "position", label: "Position 立場", note: "My position", color: "#087b66" },
  { key: "reason", label: "Reason 理由", note: "My reasons (1–2)", color: "#4265a0" },
  { key: "example", label: "Example 例子", note: "My example", color: "#8a6f24" },
  { key: "wrapUp", label: "Wrap-up 總結", note: "My wrap-up", color: "#ae4d45" }
];
const TOPIC_SECTIONS = [
  { key: "argument", marker: "Argument", label: "Argument 論點", note: "My argument", color: "#087b66" },
  { key: "explanation", marker: "Explanation", label: "Explanation 解釋", note: "Why (explanation)", color: "#4265a0" },
  { key: "example", marker: "Concrete example", label: "Example 例子", note: "My example", color: "#8a6f24" },
  { key: "effect", marker: "Effect", label: "Effect 影響", note: "Effect / result", color: "#6b3fa0" },
  { key: "wrapUp", marker: "Wrap-up", label: "Wrap-up 總結", note: "My wrap-up", color: "#ae4d45" }
];

const slug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ---------- unified item list ---------- */
const items = [
  ...(window.GEPT_QUESTIONS || []).map(q => ({
    key: String(q.id), kind: "opinion", badge: String(q.id), question: q.question, tip: q.tip || "",
    type: (q.tip || "").split(" ")[0] || "OPINION", structured: q.structured, answer: q.answer, patterns: q.patterns || []
  })),
  ...(window.THEME_TOPICS || []).map((t, i) => ({
    key: `t-${slug(t.title)}`, kind: "topic", badge: `T${i + 1}`, question: t.prompt, title: t.title,
    tip: `TOPIC BOARD 主題討論 · ${t.title}`, type: "TOPIC", viewpoints: t.viewpoints
  }))
];
const counts = { opinion: items.filter(i => i.kind === "opinion").length, topic: items.filter(i => i.kind === "topic").length };

const state = {
  key: items[0] ? items[0].key : "1",
  filter: "all",
  view: 0,
  duration: 30,
  remaining: 30,
  timerId: null,
  timerEndsAt: null,
  recording: false,
  segments: [],
  baseText: "",
  rawBeforeClean: null,
  scope: "all",
  sections: [],
  stopListen: null,
  listening: false,
  readSampleMode: false
};

const els = {};
["questionList", "searchInput", "kindTabs", "countPill", "questionNumber", "questionText", "questionTip",
  "viewpointBlock", "viewpointGrid", "viewChips", "scopeChips", "structureCards",
  "speakSampleButton", "readSampleButton", "sampleBar", "sampleBarFill", "sampleAccuracy", "sampleLegend",
  "sentencesBlock", "practiceSentences", "copySentencesButton", "notesGrid", "clearNotesButton",
  "timerDisplay", "recordButton", "resetButton", "statusLine", "transcriptBox",
  "cleanButton", "restoreButton", "copyTranscriptButton", "aiFeedbackButton", "randomButton", "teacherNote"]
  .forEach(id => { els[id] = document.querySelector(`#${id}`); });
els.timeChoices = document.querySelectorAll(".time-choice");

const nounMap = K.properNouns(items.flatMap(i => [i.question, i.answer || "", ...(i.viewpoints || []).flatMap(v => [v.title, ...v.bullets, ...v.keywords])]));
const cleanText = K.cleaner(nounMap);
let answerRec = null;
let readRec = null;

const current = () => items.find(i => i.key === state.key) || items[0];

/* ---------- topic model answer (ported from the Theme page) ---------- */
function canPhrase(note) {
  const text = String(note || "").trim();
  const lower = text.toLowerCase();
  if (!text) return "develop a clearer answer";
  if (lower.startsWith("customized ") || lower.startsWith("personalized ")) return `create ${lower}`;
  if (lower.startsWith("better ")) return `build ${lower}`;
  if (lower.startsWith("high ")) return `access ${lower}`;
  if (lower.startsWith("lower ")) return `enjoy ${lower}`;
  if (lower.startsWith("cheaper ")) return `choose ${lower}`;
  if (/^(reduce|improve|support|protect|increase|develop|build|track|adjust|study|learn|revise|avoid|save|use|receive|prepare|connect|communicate|practice|earn|compare|access|share|give|make|help|detect|automate|analyze|replace|raise|spread|create|teach|invest|enjoy|choose|limit|cost|ignore|encourage|copy|harm|miss|interrupt|delay|may|take|require|press|cause|collect|shape|show|favor|solo|group|travel)\b/.test(lower)) return lower;
  return `develop ${lower}`;
}

function buildTopicModel(prompt, seconds, view) {
  const keywords = view.keywords || [];
  const bullets = view.bullets || [];
  const kw1 = keywords[0] || view.title.toLowerCase();
  const kw2 = keywords[1] || "practical benefits";
  const b1 = canPhrase(bullets[0] || "handle the situation more effectively");
  const b2 = canPhrase(bullets[1] || "make better decisions");
  const b3 = canPhrase(bullets[2] || "achieve a positive result");
  const b4 = canPhrase(bullets[3] || "develop stronger confidence");
  if (seconds <= 45) {
    return {
      argument: `I believe ${view.title.toLowerCase()} is the strongest point for this topic.`,
      explanation: "It matters because it gives students a clear and practical benefit.",
      example: `For example, when students answer "${prompt}", they can explain how people can ${b1} and ${b2}.`,
      effect: "As a result, the answer becomes more specific and easier to follow.",
      wrapUp: `Overall, ${kw1} is useful because it helps students give a focused and confident response.`
    };
  }
  if (seconds <= 75) {
    return {
      argument: `I believe ${view.title.toLowerCase()} is the strongest viewpoint for this topic.`,
      explanation: `The main reason is that it gives students a practical way to discuss the issue with clear content and useful vocabulary, such as ${kw1} and ${kw2}.`,
      example: `For example, when students answer "${prompt}", they can say that people can ${b1}. They can also mention that this helps them ${b2}.`,
      effect: "As a result, the response sounds more organized, realistic, and convincing.",
      wrapUp: "Overall, this viewpoint is effective because it combines a clear argument, a concrete example, and a meaningful result within a short speaking time."
    };
  }
  return {
    argument: `I believe ${view.title.toLowerCase()} is a strong and reasonable viewpoint for this topic.`,
    explanation: `This idea is important because it connects the question to a real situation and gives students enough content to develop their answer. Instead of only saying the topic is good or bad, students can use more precise words such as ${kw1}, ${kw2}, and ${keywords[2] || "long-term improvement"}.`,
    example: `For example, when answering "${prompt}", a student could explain that people can ${b1}. In addition, they may ${b2}, so the benefit becomes easier to understand.`,
    effect: `As a result, this viewpoint can ${b3}, and it may also help people ${b4}. This makes the answer sound more complete and more academic.`,
    wrapUp: "Overall, a full-mark response should present one clear argument, explain the reason, give a concrete example, describe the effect, and end with a confident conclusion."
  };
}

function sectionTexts(item) {
  if (item.kind === "topic") {
    const view = item.viewpoints[state.view] || item.viewpoints[0];
    const model = buildTopicModel(item.question, state.duration, view);
    return TOPIC_SECTIONS.map(s => ({ ...s, text: model[s.key] }));
  }
  if (item.structured) return OPINION_SECTIONS.map(s => ({ ...s, text: item.structured[s.key] || "" })).filter(s => s.text);
  return [{ key: "answer", label: "Sample Answer", note: "My answer", color: "#087b66", text: item.answer }];
}

/* ---------- sidebar ---------- */
function renderTabs() {
  els.kindTabs.innerHTML = "";
  [["all", `All (${items.length})`], ["opinion", `Opinion (${counts.opinion})`], ["topic", `Topics (${counts.topic})`]].forEach(([val, label]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = label;
    b.setAttribute("aria-pressed", String(state.filter === val));
    b.addEventListener("click", () => {
      state.filter = val;
      renderTabs();
      renderQuestionList(els.searchInput.value);
      const first = visibleItems(els.searchInput.value)[0];
      if (first && current().kind !== val && val !== "all") selectItem(first.key);
    });
    els.kindTabs.append(b);
  });
  els.countPill.textContent = String(state.filter === "all" ? items.length : counts[state.filter]);
}

function visibleItems(filter = "") {
  const term = filter.trim().toLowerCase();
  return items.filter(item => (state.filter === "all" || item.kind === state.filter) && (!term ||
    item.badge.toLowerCase() === term ||
    [item.question, item.title || "", ...(item.viewpoints || []).flatMap(v => [v.title, ...v.keywords])].join(" ").toLowerCase().includes(term)));
}

function renderQuestionList(filter = "") {
  const visible = visibleItems(filter);
  els.questionList.innerHTML = "";
  visible.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `question-item${item.key === state.key ? " active" : ""}${item.kind === "topic" ? " topic-item" : ""}`;
    const label = item.kind === "topic" ? `<strong>${K.escapeHtml(item.title)}</strong><br>${K.escapeHtml(item.question)}` : K.escapeHtml(item.question);
    button.innerHTML = `<span class="question-id">${item.badge}</span><span class="question-label">${label}</span>`;
    button.addEventListener("click", () => selectItem(item.key));
    els.questionList.appendChild(button);
  });
  if (!visible.length) els.questionList.innerHTML = '<p class="notes-hint" style="padding:10px">No matching questions.</p>';
}

/* ---------- main panel ---------- */
function renderSelected() {
  const item = current();
  if (!item) return;
  els.questionNumber.textContent = item.kind === "topic" ? `Topic ${item.badge.slice(1)} · ${item.title}` : `Question ${item.badge} · ${item.type}`;
  els.questionText.textContent = item.question;
  els.questionTip.textContent = item.tip;

  // viewpoints (topics only)
  els.viewpointBlock.hidden = item.kind !== "topic";
  els.viewpointGrid.innerHTML = "";
  els.viewChips.innerHTML = "";
  if (item.kind === "topic") {
    item.viewpoints.forEach((view, i) => {
      const card = document.createElement("section");
      card.className = `viewpoint-card${i === state.view ? " picked" : ""}`;
      card.innerHTML = `<h3>${K.escapeHtml(view.title)}</h3>
        <ul>${view.bullets.map(b => `<li>${K.escapeHtml(b)}</li>`).join("")}</ul>
        <div class="vp-keywords">${view.keywords.map(k => `<span>${K.escapeHtml(k)}</span>`).join("")}</div>`;
      card.addEventListener("click", () => pickView(i));
      els.viewpointGrid.append(card);
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = view.title;
      chip.setAttribute("aria-pressed", String(i === state.view));
      chip.addEventListener("click", () => pickView(i));
      els.viewChips.append(chip);
    });
  }

  renderModel();

  // practice sentences (opinion only)
  els.sentencesBlock.hidden = !(item.patterns && item.patterns.length);
  els.practiceSentences.innerHTML = "";
  (item.patterns || []).forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="pattern-line">${K.escapeHtml(entry.pattern)}</div><div class="example-line">e.g. ${K.escapeHtml(entry.example)}</div>`;
    els.practiceSentences.appendChild(li);
  });

  els.teacherNote.innerHTML = item.kind === "topic"
    ? "Pick ONE viewpoint and follow: Argument &rarr; Explanation &rarr; Example &rarr; Effect &rarr; Wrap-up. Record, press <b>Clean Up Transcript</b>, fix any wrong words, then use <b>Copy for AI Feedback</b>."
    : "Follow the structure: Position &rarr; Reason &rarr; Example &rarr; Wrap-up. Record, press <b>Clean Up Transcript</b>, fix any wrong words, then use <b>Copy for AI Feedback</b> for a full correction.";

  renderNotes();
  renderQuestionList(els.searchInput.value);
}

function renderModel() {
  const sections = sectionTexts(current());
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
  if (chipDefs.length <= 2) chipDefs.length = 1;
  if (!chipDefs.some(([v]) => v === state.scope)) state.scope = "all";
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
}

function pickView(i) {
  stopSampleActivity();
  state.view = i;
  K.store.set(VIEW_PREFIX + state.key, i);
  [...els.viewpointGrid.children].forEach((c, k) => c.classList.toggle("picked", k === i));
  [...els.viewChips.children].forEach((c, k) => c.setAttribute("aria-pressed", String(k === i)));
  renderModel();
}

function notesKey() { return NOTES_PREFIX + state.key; }

function migrateThemeData(item) {
  // Notes/drafts typed on the old Theme page (before the merge) move over once.
  if (item.kind !== "topic") return;
  const old = item.key.slice(2);
  if (K.store.get(notesKey(), null) == null) {
    const oldNotes = K.store.get(`theme-notes-${old}`, null);
    if (oldNotes) {
      const mapped = {};
      [0, 1, 2, 3, 4].forEach(i => { if (oldNotes[i]) mapped[i] = oldNotes[i]; });
      K.store.set(notesKey(), mapped);
      if (oldNotes.view != null) K.store.set(VIEW_PREFIX + item.key, oldNotes.view);
    }
  }
  if (!K.store.get(DRAFT_PREFIX + item.key, "")) {
    const oldDraft = K.store.get(`theme-draft-${old}`, "");
    if (oldDraft) K.store.set(DRAFT_PREFIX + item.key, oldDraft);
  }
}

function renderNotes() {
  const sections = sectionTexts(current());
  const saved = K.store.get(notesKey(), {});
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
      const all = K.store.get(notesKey(), {});
      all[i] = ta.value;
      K.store.set(notesKey(), all);
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

function selectItem(key) {
  const item = items.find(i => i.key === key);
  if (!item) return;
  stopEverything();
  state.key = key;
  state.scope = "all";
  state.view = item.kind === "topic" ? Number(K.store.get(VIEW_PREFIX + key, 0)) || 0 : 0;
  migrateThemeData(item);
  state.segments = [];
  state.rawBeforeClean = null;
  els.restoreButton.hidden = true;
  els.transcriptBox.value = K.store.get(DRAFT_PREFIX + key, "");
  resetTimer();
  renderSelected();
  try { history.replaceState(null, "", `#${key}`); } catch {}
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
  els.statusLine.textContent = current().kind === "topic"
    ? "Recording... Follow your notes: Argument → Explanation → Example → Effect → Wrap-up."
    : "Recording... Follow your notes: Position → Reason → Example → Wrap-up.";
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

const saveDraft = () => K.store.set(DRAFT_PREFIX + state.key, els.transcriptBox.value);

function cleanUpTranscript() {
  const text = els.transcriptBox.value.trim();
  if (!text) { els.statusLine.textContent = "Record or type an answer first."; return; }
  state.rawBeforeClean = text;
  els.transcriptBox.value = cleanText(text, state.segments);
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

function startListening() {
  state.listening = true;
  els.speakSampleButton.textContent = "■ Stop";
  state.stopListen = K.listenAlong(scopedSpans(), 0.92, () => {
    state.listening = false;
    state.stopListen = null;
    els.speakSampleButton.textContent = "🔈 Listen";
  });
}

function listenSection(key) {
  stopSampleActivity();
  state.scope = key;
  applyScope();
  startListening();
}

function listenSample() {
  if (state.listening) { stopSampleActivity(); return; }
  stopSampleActivity();
  startListening();
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

/* ---------- AI feedback prompt (Jennifer's correction format) ---------- */
function aiFeedbackPrompt() {
  const item = current();
  const notes = K.store.get(notesKey(), {});
  const sections = sectionTexts(item);
  const noteLines = sections.map((s, i) => (notes[i] ? `- ${s.note}: ${notes[i]}` : "")).filter(Boolean).join("\n");
  const header = item.kind === "topic"
    ? `Topic: ${item.title}\nQuestion: ${item.question}\nMy chosen viewpoint: ${(item.viewpoints[state.view] || {}).title || ""}\nReference viewpoints:\n${item.viewpoints.map(v => `- ${v.title}: ${v.bullets.join("; ")} (key words: ${v.keywords.join(", ")})`).join("\n")}`
    : `Question: ${item.question}\nQuestion type: ${item.type}`;
  return `Please correct my opinion speaking response.

${header}
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
    if (state.recording) return;
    resetTimer();
    if (current().kind === "topic") { stopSampleActivity(); renderModel(); } // topic model length follows the time
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
  K.store.set(DRAFT_PREFIX + state.key, "");
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

els.randomButton.addEventListener("click", () => {
  const pool = visibleItems("");
  selectItem(pool[Math.floor(Math.random() * pool.length)].key);
});
els.speakSampleButton.addEventListener("click", listenSample);
els.readSampleButton.addEventListener("click", readSample);
els.clearNotesButton.addEventListener("click", () => {
  if (!window.confirm("Clear your notes for this question?")) return;
  K.store.set(notesKey(), {});
  renderNotes();
});
els.copySentencesButton.addEventListener("click", async () => {
  const text = (current().patterns || []).map((entry, index) => `${index + 1}. ${entry.pattern}\ne.g. ${entry.example}`).join("\n\n");
  const ok = await K.copyText(text);
  els.statusLine.textContent = ok ? "Practice sentences copied." : "Clipboard access was blocked, but the sentences are still shown above.";
});
window.addEventListener("hashchange", () => {
  const key = decodeURIComponent(location.hash.slice(1));
  if (key && key !== state.key && items.some(i => i.key === key)) selectItem(key);
});

/* ---------- init ---------- */
const hashKey = decodeURIComponent(location.hash.slice(1));
const startKey = items.some(i => i.key === hashKey) ? hashKey : (items[0] ? items[0].key : "1");
if (startKey.startsWith("t-")) state.filter = "topic";
renderTabs();
selectItem(startKey);
if (!K.SR) els.statusLine.textContent = "Live speech typing is not supported in this browser. Open this page in Chrome or Edge, or type your answer.";
