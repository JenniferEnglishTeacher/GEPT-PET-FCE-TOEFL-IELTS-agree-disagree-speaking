/* GEPT Intermediate Writing — 10 Chinese-to-English translations + 10 guided essays. Uses writing-kit.js + mindmap-kit.js. */
const W = window.WritingKit;
const UNITS = typeof GEPT_UNITS !== "undefined" ? GEPT_UNITS : [];
const DRAFT = "gept-int-write-draft-";
const tasks = [];
UNITS.forEach(u => {
  tasks.push({ id: `tr-${u.id}`, kind: "translation", unit: u.id, theme: u.theme, prompt: u.translation.prompt, answer: u.translation.answer });
  tasks.push({ id: `es-${u.id}`, kind: "essay", unit: u.id, theme: u.theme, prompt: u.essay.prompt, answer: u.essay.answer });
});
const INFO = {
  translation: { title: "Chinese → English Translation 中譯英", sub: "Translate the whole passage. Keep every event and detail, and use the correct tense. Suggested time: 15 minutes.", minutes: [10, 15, 20], min: 45 },
  essay: { title: "Guided Essay 英文作文", sub: "Answer every question in the prompt — one paragraph for each. Give reasons and examples. Aim for about 120–150 words. Suggested time: 25–30 minutes.", minutes: [20, 25, 30, 40], min: 120 }
};
const ESSAY_BRANCHES = [
  { label: "Paragraph 1 · Answer Q1 第一段", hint: "my answer to question 1" },
  { label: "Details / Examples 細節例子", hint: "for example … / because …" },
  { label: "Paragraph 2 · Answer Q2 第二段", hint: "my answer to question 2" },
  { label: "Details / Ending 細節結尾", hint: "first … second … / in conclusion …" }
];

const $ = id => document.getElementById(id);
const tabs = [...document.querySelectorAll("[data-kind]")];
let kind = "all", task = tasks[0], timerApi = null, mm = null, sampleSpans = [], stopListen = null;

function list() {
  const term = $("searchInput").value.trim().toLowerCase();
  const shown = tasks.filter(t => (kind === "all" || t.kind === kind) && (!term || `${t.theme} unit ${t.unit} ${t.prompt}`.toLowerCase().includes(term) || String(t.unit) === term));
  $("countPill").textContent = shown.length;
  const box = $("taskList"); box.innerHTML = "";
  let last = null;
  shown.forEach(t => {
    if (t.unit !== last) { const g = document.createElement("div"); g.className = "sw-group"; g.textContent = `Unit ${t.unit} · ${t.theme}`; box.appendChild(g); last = t.unit; }
    const b = document.createElement("button"); b.type = "button";
    b.className = `question-item${t.id === task.id ? " active" : ""}`;
    b.innerHTML = `<span class="question-id">${t.kind === "translation" ? "譯" : "寫"}</span><span class="question-label">${t.kind === "translation" ? "Translation 中譯英" : "Essay 英文作文"} · Unit ${t.unit}</span>`;
    b.addEventListener("click", () => select(t.id));
    box.appendChild(b);
  });
}

function select(id) {
  if (stopListen) { stopListen(); stopListen = null; }
  task = tasks.find(t => t.id === id) || tasks[0];
  const info = INFO[task.kind];
  $("taskMeta").textContent = `Unit ${task.unit} · ${task.theme}`;
  $("taskTitle").textContent = info.title;
  $("taskSub").textContent = info.sub;
  $("taskPrompt").textContent = task.prompt;
  const mmHost = $("mindMap");
  if (task.kind === "essay") { mmHost.hidden = false; mm = MindMap.mount(mmHost, { key: `gept-int-${task.id}`, center: `Unit ${task.unit} essay: ${task.theme}`, branches: ESSAY_BRANCHES, title: "My Essay Plan 心智圖" }); }
  else { mmHost.hidden = true; mm = null; }
  if (timerApi) timerApi.stop();
  timerApi = W.timer($("timerHost"), { minutes: info.minutes, start: info.minutes[1] || info.minutes[0], onEnd: () => { $("saveStatus").textContent = "⏰ Time is up! Finish your last sentence, then check your writing."; } });
  $("writeBox").value = localStorage.getItem(DRAFT + task.id) || "";
  count();
  $("feedback").hidden = true;
  $("sampleSection").hidden = true; $("sampleButton").textContent = "Show Sample Answer";
  $("sampleText").innerHTML = ""; sampleSpans = SpeakingKit.wordSpans($("sampleText"), task.answer);
  $("sampleText").style.whiteSpace = "pre-line";
  list();
  try { history.replaceState(null, "", `#${task.id}`); } catch {}
}

function count() { $("wordCount").textContent = `${W.wordCount($("writeBox").value)} words · target ${INFO[task.kind].min}+`; }

$("writeBox").addEventListener("input", () => { try { localStorage.setItem(DRAFT + task.id, $("writeBox").value); } catch {} $("saveStatus").textContent = "Draft saved on this device"; count(); });
$("reviewButton").addEventListener("click", () => W.renderReview($("feedback"), W.review($("writeBox").value, task.answer, task.kind, INFO[task.kind].min)));
$("sampleButton").addEventListener("click", () => { const s = $("sampleSection"); s.hidden = !s.hidden; $("sampleButton").textContent = s.hidden ? "Show Sample Answer" : "Hide Sample Answer"; });
$("listenButton").addEventListener("click", () => {
  if (stopListen) { stopListen(); stopListen = null; $("listenButton").innerHTML = "&#128264; Listen to Sample"; return; }
  $("sampleSection").hidden = false; $("sampleButton").textContent = "Hide Sample Answer";
  $("listenButton").textContent = "■ Stop";
  stopListen = SpeakingKit.listenAlong(sampleSpans, 0.92, () => { stopListen = null; $("listenButton").innerHTML = "&#128264; Listen to Sample"; });
});
$("clearButton").addEventListener("click", () => {
  if (!$("writeBox").value.trim() || confirm("Clear this draft?")) { $("writeBox").value = ""; try { localStorage.removeItem(DRAFT + task.id); } catch {} count(); $("feedback").hidden = true; }
});
$("aiButton").addEventListener("click", async () => {
  const t = $("writeBox").value.trim();
  if (!t) { $("saveStatus").textContent = "Write your answer first."; return; }
  const notes = mm ? mm.text() : "";
  const prompt = task.kind === "translation"
    ? `Please check my GEPT Intermediate (CEFR B1) Chinese-to-English translation.\n\nChinese passage:\n${task.prompt}\n\nMy translation (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. Mistakes in grammar, tense and word choice, with short explanations in Traditional Chinese.\n2. Any missing or wrong information.\n3. A corrected version that stays close to my translation.\n4. A GEPT score estimate (0–5) with one reason.`
    : `Please check my GEPT Intermediate (CEFR B1) essay.\n\nPrompt:\n${task.prompt}\n${notes ? `\nMy plan:\n${notes}\n` : ""}\nMy essay (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. Grammar and word-choice corrections with short explanations in Traditional Chinese.\n2. Comments on content and organisation (did I answer every question?).\n3. An improved version that keeps my ideas (B1 level).\n4. A GEPT score estimate (0–5) with one reason.`;
  $("saveStatus").textContent = (await SpeakingKit.copyText(prompt)) ? "Copied with the prompt. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your writing manually.";
});
tabs.forEach(b => b.addEventListener("click", () => { kind = b.dataset.kind; tabs.forEach(x => x.setAttribute("aria-pressed", String(x === b))); list(); }));
$("searchInput").addEventListener("input", list);

select((tasks.find(t => t.id === location.hash.slice(1)) || tasks[0]).id);
