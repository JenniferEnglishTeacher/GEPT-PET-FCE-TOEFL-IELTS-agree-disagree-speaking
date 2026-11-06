/* GEPT Basic Writing — 3-picture stories with a 3-column sentence-pattern grid, mind map, timer and model essay. */
const W = window.WritingKit;
const STORIES = window.GEPT_BASIC_STORIES || [];
const DRAFT = "gept-basic-write-draft-";
const BRANCHES = [
  { label: "Who 人物 + 喜好", hint: "name · age · job · likes to …" },
  { label: "圖一 Picture 1", hint: "One day / Last …, when, where, what" },
  { label: "圖二 Picture 2", hint: "When … / found that … / felt …" },
  { label: "圖三 + 結尾 Picture 3 & Ending", hint: "In the end … / learned a lesson" }
];
const $ = id => document.getElementById(id);
const PART_LABEL = { A: "Part A · 講義整合 (14)", B: "Part B · 新增題目 (10)", C: "Part C · 附件新增 + 模擬試題 (24)" };
const PART_META = { A: "Part A 講義整合", B: "Part B 新增題目", C: "Part C 附件新增" };
let story = STORIES[0], mm = null, timerApi = null, spans = [], stopListen = null;
const esc = W.esc;
const bold = s => esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

function list() {
  const term = $("searchInput").value.trim().toLowerCase();
  const shown = STORIES.filter(s => !term || `${s.zh} ${s.en} ${s.prompt} ${s.essay}`.toLowerCase().includes(term) || String(s.no) === term);
  $("countPill").textContent = shown.length;
  const box = $("storyList"); box.innerHTML = "";
  let part = null;
  shown.forEach(s => {
    if (s.part !== part) { const g = document.createElement("div"); g.className = "sw-group"; g.textContent = PART_LABEL[s.part]; box.appendChild(g); part = s.part; }
    const b = document.createElement("button"); b.type = "button";
    b.className = `question-item${s.no === story.no ? " active" : ""}`;
    b.innerHTML = `<span class="question-id">${s.no}</span><span class="question-label">${esc(s.zh)}<br><small style="color:var(--muted)">${esc(s.en)}</small></span>`;
    b.addEventListener("click", () => select(s.no));
    box.appendChild(b);
  });
}

function select(no) {
  if (stopListen) { stopListen(); stopListen = null; }
  story = STORIES.find(s => s.no === no) || STORIES[0];
  $("storyMeta").textContent = `Topic ${story.no} · ${PART_META[story.part]}${story.src ? ` · ${story.src}` : ""}`;
  $("storyTitle").textContent = `${story.zh} · ${story.en}`;
  $("storyPrompt").textContent = `題目：${story.prompt}`;
  $("pictureHost").innerHTML = story.img
    ? `<div class="sw-strip"><img src="${story.img}" alt="Three pictures for: ${esc(story.en)}"></div>`
    : `<div class="sw-scenes">${story.scenes.map((t, i) => `<div><b>圖${"一二三"[i]} Picture ${i + 1}</b>${esc(t)}</div>`).join("")}</div>
       <p class="sw-sub" style="margin-top:6px;font-size:13px">（本題沒有圖片，以情境描述代替）</p>`;
  mm = MindMap.mount($("mindMap"), { key: `gept-basic-write-${story.no}`, center: story.en, branches: BRANCHES, title: "My Story Map 心智圖" });
  $("grid").querySelector("tbody").innerHTML = story.rows.map(r =>
    `<tr><td><b>${esc(r[0])}</b><small>${esc(r[1])}</small></td><td>${esc(r[2])}</td><td>${bold(r[3])}</td></tr>`).join("");
  $("essayText").innerHTML = ""; spans = SpeakingKit.wordSpans($("essayText"), story.essay);
  $("essayText").hidden = true; $("essayButton").textContent = "Show";
  $("essayWords").textContent = `(${story.words} words)`;
  if (timerApi) timerApi.stop();
  timerApi = W.timer($("timerHost"), { minutes: [10, 15, 20], start: 15, onEnd: () => { $("saveStatus").textContent = "⏰ Time is up! Finish your sentence and check your writing."; } });
  $("writeBox").value = localStorage.getItem(DRAFT + story.no) || "";
  count(); $("feedback").hidden = true;
  list();
  try { history.replaceState(null, "", `#${story.no}`); } catch {}
}
function count() { $("wordCount").textContent = `${W.wordCount($("writeBox").value)} words`; }

$("writeBox").addEventListener("input", () => { try { localStorage.setItem(DRAFT + story.no, $("writeBox").value); } catch {} count(); });
$("reviewButton").addEventListener("click", () => W.renderReview($("feedback"), W.review($("writeBox").value, story.essay, "story", 50)));
$("hideCol3").addEventListener("click", () => {
  const g = $("grid"); g.classList.toggle("hide-col3");
  $("hideCol3").textContent = g.classList.contains("hide-col3") ? "Show Column 3" : "Hide Column 3 (try it yourself)";
});
$("essayButton").addEventListener("click", () => { const e = $("essayText"); e.hidden = !e.hidden; $("essayButton").textContent = e.hidden ? "Show" : "Hide"; });
$("listenButton").addEventListener("click", () => {
  if (stopListen) { stopListen(); stopListen = null; $("listenButton").innerHTML = "&#128264; Listen"; return; }
  $("essayText").hidden = false; $("essayButton").textContent = "Hide"; $("listenButton").textContent = "■ Stop";
  stopListen = SpeakingKit.listenAlong(spans, 0.9, () => { stopListen = null; $("listenButton").innerHTML = "&#128264; Listen"; });
});
$("clearButton").addEventListener("click", () => {
  if (!$("writeBox").value.trim() || confirm("Clear this draft?")) { $("writeBox").value = ""; try { localStorage.removeItem(DRAFT + story.no); } catch {} count(); $("feedback").hidden = true; }
});
$("aiButton").addEventListener("click", async () => {
  const t = $("writeBox").value.trim();
  if (!t) { $("saveStatus").textContent = "Write your story first."; return; }
  const notes = mm ? mm.text() : "";
  const prompt = `Please check my GEPT Basic (CEFR A2) 3-picture story writing.\n\nTopic: ${story.prompt}\n${story.scenes ? `Pictures: ${story.scenes.map((s, i) => `(${i + 1}) ${s}`).join(" ")}\n` : ""}${notes ? `\nMy plan:\n${notes}\n` : ""}\nMy story (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. Grammar and spelling corrections (especially past tense) with short explanations in Traditional Chinese.\n2. Did I describe all three pictures? What is missing?\n3. An improved version at A2 level that keeps my ideas.\n4. A GEPT Basic writing score estimate (0–5) with one reason.`;
  $("saveStatus").textContent = (await SpeakingKit.copyText(prompt)) ? "Copied with the topic. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your story manually.";
});
$("searchInput").addEventListener("input", list);

select(Number(location.hash.slice(1)) || 1);
