/* Theme Speaking topic board — viewpoints, model response read-along, timed recording,
   transcript clean-up and local grading. Uses speaking-kit.js. */
const K = window.SpeakingKit;
const topics = window.THEME_TOPICS || [];
const IELTS_BOT_URL = "https://chatgpt.com/g/g-2DNF8ArXs-grade-your-ielts-speaking";
const DRAFT_PREFIX = "theme-draft-";

const $ = sel => document.querySelector(sel);
const els = {
  topicList: $("#topicList"), topicCount: $("#topicCount"), search: $("#searchInput"),
  topicTitle: $("#topicTitle"), promptText: $("#promptText"), readPromptBtn: $("#readPromptBtn"),
  viewpointGrid: $("#viewpointGrid"), viewChips: $("#viewChips"), modelText: $("#modelText"),
  listenBtn: $("#listenBtn"), readAlongBtn: $("#readAlongBtn"), stopSampleBtn: $("#stopSampleBtn"),
  accuracyBox: $("#accuracyBox"), accuracyFill: $("#accuracyFill"), accuracyText: $("#accuracyText"), modelStatus: $("#modelStatus"),
  timeSelect: $("#timeSelect"), timer: $("#timerDisplay"), timerFill: $("#timerFill"),
  recordBtn: $("#recordBtn"), stopBtn: $("#stopBtn"), resetBtn: $("#resetBtn"), speechStatus: $("#speechStatus"), audio: $("#audioPlayback"),
  transcript: $("#transcript"), stats: $("#statsText"), cleanBtn: $("#cleanBtn"), restoreBtn: $("#restoreBtn"), copyBtn: $("#copyBtn"),
  gptBotBtn: $("#gptBotBtn"), botStatus: $("#botStatus"),
};

const slug = title => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const nounMap = K.properNouns(topics.flatMap(t => [t.title, t.prompt, ...t.viewpoints.flatMap(v => [v.title, ...v.bullets, ...v.keywords])]));
const cleanText = K.cleaner(nounMap);

let activeTopic = topics[0];
let activeView = 0;
let modelSpans = [];
let timer = null, elapsed = 0, mediaRecorder = null, chunks = [];
let segments = [], baseText = "", rawBeforeClean = null;
let answerRec = null, readRec = null, stopListen = null, readAlongMode = false, lastSpoken = "";

function setStatus(node, msg, kind = "") {
  node.innerHTML = msg;
  node.className = node === els.botStatus || node === els.accuracyText || node === els.modelStatus ? `status-text compact ${kind}`.trim() : `status-text ${kind}`.trim();
}

const allKeywords = (topic = activeTopic) => topic.viewpoints.flatMap(view => view.keywords);

function targetWords(seconds) {
  if (seconds <= 30) return 65;
  if (seconds <= 45) return 85;
  if (seconds <= 60) return 115;
  if (seconds <= 90) return 155;
  if (seconds <= 120) return 200;
  return 250;
}

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

function buildModelResponse(prompt, seconds, view) {
  const keywords = view.keywords || [];
  const bullets = view.bullets || [];
  const kw1 = keywords[0] || view.title.toLowerCase();
  const kw2 = keywords[1] || "practical benefits";
  const b1 = canPhrase(bullets[0] || "handle the situation more effectively");
  const b2 = canPhrase(bullets[1] || "make better decisions");
  const b3 = canPhrase(bullets[2] || "achieve a positive result");
  const b4 = canPhrase(bullets[3] || "develop stronger confidence");

  if (seconds <= 45) {
    return `**Argument:** I believe ${view.title.toLowerCase()} is the strongest point for this topic. **Explanation:** It matters because it gives students a clear and practical benefit. **Concrete example:** For example, when students answer "${prompt}", they can explain how people can ${b1} and ${b2}. **Effect:** As a result, the answer becomes more specific and easier to follow. **Wrap-up:** Overall, ${kw1} is useful because it helps students give a focused and confident response.`;
  }
  if (seconds <= 75) {
    return `**Argument:** I believe ${view.title.toLowerCase()} is the strongest viewpoint for this topic. **Explanation:** The main reason is that it gives students a practical way to discuss the issue with clear content and useful vocabulary, such as ${kw1} and ${kw2}. **Concrete example:** For example, when students answer "${prompt}", they can say that people can ${b1}. They can also mention that this helps them ${b2}. **Effect:** As a result, the response sounds more organized, realistic, and convincing. **Wrap-up:** Overall, this viewpoint is effective because it combines a clear argument, a concrete example, and a meaningful result within a short speaking time.`;
  }
  return `**Argument:** I believe ${view.title.toLowerCase()} is a strong and reasonable viewpoint for this topic. **Explanation:** This idea is important because it connects the question to a real situation and gives students enough content to develop their answer. Instead of only saying the topic is good or bad, students can use more precise words such as ${kw1}, ${kw2}, and ${keywords[2] || "long-term improvement"}. **Concrete example:** For example, when answering "${prompt}", a student could explain that people can ${b1}. In addition, they may ${b2}, so the benefit becomes easier to understand. **Effect:** As a result, this viewpoint can ${b3}, and it may also help people ${b4}. This makes the answer sound more complete and more academic. **Wrap-up:** Overall, a full-mark response should present one clear argument, explain the reason, give a concrete example, describe the effect, and end with a confident conclusion.`;
}

/* ---------- rendering ---------- */
function renderTopics() {
  const query = els.search.value.trim().toLowerCase();
  const filtered = topics.filter(topic => [topic.title, topic.prompt, ...allKeywords(topic)].join(" ").toLowerCase().includes(query));
  els.topicCount.textContent = `${filtered.length} shown`;
  els.topicList.innerHTML = "";
  filtered.forEach(topic => {
    const button = document.createElement("button");
    button.className = "topic-button";
    button.type = "button";
    button.textContent = topic.title;
    button.setAttribute("aria-current", String(topic === activeTopic));
    button.addEventListener("click", () => selectTopic(topic));
    els.topicList.append(button);
  });
  if (!filtered.length) els.topicList.innerHTML = '<p class="hint">No matching topics.</p>';
}

function renderActiveTopic() {
  els.topicTitle.textContent = activeTopic.title;
  els.promptText.textContent = activeTopic.prompt;
  els.viewpointGrid.innerHTML = "";
  activeTopic.viewpoints.forEach(view => {
    const section = document.createElement("section");
    section.className = "viewpoint";
    section.innerHTML = `
      <h3>${K.escapeHtml(view.title)}</h3>
      <ul>${view.bullets.map(item => `<li>${K.escapeHtml(item)}</li>`).join("")}</ul>
      <div class="keywords">${view.keywords.map(word => `<span class="keyword">${K.escapeHtml(word)}</span>`).join("")}</div>
    `;
    els.viewpointGrid.append(section);
  });
  els.viewChips.innerHTML = "";
  activeTopic.viewpoints.forEach((view, i) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = view.title;
    chip.setAttribute("aria-pressed", String(i === activeView));
    chip.addEventListener("click", () => { stopSampleActivity(); activeView = i; renderActiveTopic(); });
    els.viewChips.append(chip);
  });
  renderModel();
}

function renderModel() {
  const view = activeTopic.viewpoints[activeView] || activeTopic.viewpoints[0];
  const text = buildModelResponse(activeTopic.prompt, Number(els.timeSelect.value), view);
  els.modelText.innerHTML = "";
  modelSpans = [];
  text.split(/(?=\*\*(?:Argument|Explanation|Concrete example|Effect|Wrap-up):\*\*)/).forEach(part => {
    if (!part.trim()) return;
    const p = document.createElement("p");
    K.wordSpans(p, part.trim(), modelSpans);
    els.modelText.append(p);
  });
  els.accuracyBox.hidden = true;
}

function selectTopic(topic) {
  stopEverything();
  saveDraft();
  activeTopic = topic;
  activeView = 0;
  segments = [];
  elapsed = 0;
  rawBeforeClean = null;
  els.restoreBtn.hidden = true;
  els.transcript.value = K.store.get(DRAFT_PREFIX + slug(topic.title), "");
  els.audio.hidden = true;
  els.audio.removeAttribute("src");
  try { history.replaceState(null, "", `#${slug(topic.title)}`); } catch {}
  renderTopics();
  renderActiveTopic();
  resetTimer();
  updateStats();
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
  stopListen = K.listenAlong(modelSpans, 0.92, () => {
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
  const sum = K.accuracySummary(result, final, "model");
  els.accuracyBox.hidden = false;
  els.accuracyFill.style.width = `${sum.pct}%`;
  els.accuracyFill.style.background = sum.pct >= 85 ? "var(--ok, #1f7a4d)" : sum.pct >= 65 ? "var(--gold)" : "var(--danger)";
  els.accuracyText.innerHTML = sum.msg;
}

/* ---------- speaking: timer + audio + live transcript ---------- */
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
    if (remaining <= 0) { K.beep(); stopRecording("⏰ Time's up! Now press <b>Clean Up Transcript</b>, check it, and copy it for feedback."); }
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
  if (!timer) return; // stopped while waiting for permission

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

function stopRecording(msg = "Stopped. Press <b>Clean Up Transcript</b>, check it, then send it for feedback.", kind = "") {
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
  const target = targetWords(Number(els.timeSelect.value));
  els.stats.textContent = words ? `${words} words${elapsed ? ` in ${K.fmt(elapsed)}` : ""} · target ≈ ${target}` : "";
}

const saveDraft = () => { if (activeTopic) K.store.set(DRAFT_PREFIX + slug(activeTopic.title), els.transcript.value); };

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
  setStatus(els.botStatus, "✨ Cleaned. Read it once, fix any wrong words, then send it for feedback.", "active");
}

/* ---------- IELTS bot ---------- */
function buildIeltsBotPrompt() {
  const viewpointText = activeTopic.viewpoints.map(view => [
    `Viewpoint: ${view.title}`,
    `Bullet ideas: ${view.bullets.join("; ")}`,
    `Key words: ${view.keywords.join(", ")}`,
  ].join("\n")).join("\n\n");
  return `Please grade and revise my speaking response.

Test style: IELTS / iTEP / TOEFL speaking practice
Topic: ${activeTopic.title}
Prompt: ${activeTopic.prompt}
Time limit: ${Number(els.timeSelect.value)} seconds

My voice-typed response:
${els.transcript.value.trim()}

Teacher reference content:
${viewpointText}

Please provide:
1. A fair speaking score. Do not be overly strict for a CEFR B1-B2 learner.
2. Organized feedback on fluency/coherence, vocabulary, grammar, and topic development.
3. A polished revision of my original response. Keep my meaning, but add clear structure words, improve grammar, and replace overly casual expressions with more polished terms.
4. A full-mark model answer for the same time limit, based on my response and the topic reference content.
5. Useful phrases and key words I should reuse next time.`;
}

async function openIeltsBot() {
  if (!els.transcript.value.trim()) {
    setStatus(els.botStatus, "Please record, voice-type, or type a response first.", "warning");
    els.transcript.focus();
    return;
  }
  const ok = await K.copyText(buildIeltsBotPrompt());
  setStatus(els.botStatus, ok ? "Copied. The IELTS grading bot is opening. Paste the prompt into ChatGPT." : "Could not copy automatically. Please copy manually.", ok ? "active" : "warning");
  window.open(IELTS_BOT_URL, "_blank", "noopener");
}

/* ---------- events ---------- */
els.readPromptBtn.addEventListener("click", () => {
  const words = activeTopic.viewpoints
    .map(view => `${view.title}. ${view.bullets.join(". ")}. Key words: ${view.keywords.join(", ")}.`)
    .join(" ");
  K.speak(`${activeTopic.prompt}. ${words}`, 0.92);
});
els.listenBtn.addEventListener("click", listenModel);
els.readAlongBtn.addEventListener("click", readAlongModel);
els.stopSampleBtn.addEventListener("click", stopSampleActivity);
els.timeSelect.addEventListener("change", () => { if (!timer) { resetTimer(); renderModel(); updateStats(); } });
els.recordBtn.addEventListener("click", startRecording);
els.stopBtn.addEventListener("click", () => stopRecording());
els.resetBtn.addEventListener("click", () => {
  if (timer) stopRecording();
  if (els.transcript.value.trim() && !window.confirm("Clear your transcript for this topic?")) return;
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
const fromHash = topics.find(t => slug(t.title) === location.hash.slice(1));
activeTopic = fromHash || topics[0];
els.transcript.value = K.store.get(DRAFT_PREFIX + slug(activeTopic.title), "");
renderTopics();
renderActiveTopic();
resetTimer();
updateStats();
if (!K.SR) setStatus(els.speechStatus, "Live speech typing is not supported in this browser. Open the page in Chrome or Edge, or type your answer.", "warning");
