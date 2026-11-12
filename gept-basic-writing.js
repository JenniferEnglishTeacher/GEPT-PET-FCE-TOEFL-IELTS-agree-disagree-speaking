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
const GROUPS = ["睡過頭・上學遲到 Oversleeping & Being Late", "倒楣的一天 Bad-Luck Days", "校園生活與考試 School Life & Tests", "颱風天 Typhoon Days", "下雨天 Rainy Days", "購物 Shopping", "意外與安全 Accidents & Safety", "公德心與鄰居 Manners & Neighbors", "寵物狗狗 Dogs & Pets", "生日派對 Birthday Parties", "出遊旅行 Trips & Outings", "工作與日常作息 Work & Daily Routines"];
const groupSize = g => STORIES.filter(s => s.group === g).length;
const GROUP_LABEL = g => `主題 ${g}｜${GROUPS[g - 1]} (${groupSize(g)})`;
const GROUP_META = g => `主題 ${g}｜${GROUPS[g - 1].split(" ")[0]}`;
const skey = s => s.key || s.no;
let story = STORIES[0], mm = null, timerApi = null, spans = [], stopListen = null, rec = null;
const esc = W.esc;
const bold = s => esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

function list() {
  const term = $("searchInput").value.trim().toLowerCase();
  const shown = STORIES.filter(s => !term || `${s.zh} ${s.en} ${s.prompt} ${s.essay}`.toLowerCase().includes(term) || String(s.no) === term);
  $("countPill").textContent = shown.length;
  const box = $("storyList"); box.innerHTML = "";
  let group = null;
  shown.forEach(s => {
    if (s.group !== group) { const g = document.createElement("div"); g.className = "sw-group"; g.textContent = GROUP_LABEL(s.group); box.appendChild(g); group = s.group; }
    const b = document.createElement("button"); b.type = "button";
    b.className = `question-item${s.no === story.no ? " active" : ""}`;
    b.innerHTML = `<span class="question-id">${s.no}</span><span class="question-label">${esc(s.zh)}<br><small style="color:var(--muted)">${esc(s.en)}</small></span>`;
    b.addEventListener("click", () => select(s.no));
    box.appendChild(b);
  });
}

function select(no) {
  if (stopListen) { stopListen(); stopListen = null; $("listenButton").innerHTML = "&#128264; Listen"; }
  stopRead(false); stopWordRec(); if (stopBuilt) { stopBuilt(); stopBuilt = null; }
  ["readBar", "readStatus", "readLegend"].forEach(id => { $(id).hidden = true; });
  story = STORIES.find(s => s.no === no) || STORIES[0];
  $("storyMeta").textContent = `Topic ${story.no} · ${GROUP_META(story.group)}${story.src ? ` · ${story.src}` : ""}`;
  $("storyTitle").textContent = `${story.zh} · ${story.en}`;
  $("storyPrompt").textContent = `題目：${story.prompt}`;
  $("pictureHost").innerHTML = story.img
    ? `<div class="sw-strip"><img src="${story.img}" alt="Three pictures for: ${esc(story.en)}"></div>`
    : `<div class="sw-scenes">${story.scenes.map((t, i) => `<div><b>圖${"一二三"[i]} Picture ${i + 1}</b>${esc(t)}</div>`).join("")}</div>
       <p class="sw-sub" style="margin-top:6px;font-size:13px">（本題沒有圖片，以情境描述代替）</p>`;
  $("writeRef").innerHTML = `<div class="sw-prompt">${esc(`題目：${story.prompt}`)}</div>${$("pictureHost").innerHTML}`;
  mm = MindMap.mount($("mindMap"), { key: `gept-basic-write-${skey(story)}`, center: story.en, branches: BRANCHES, title: "My Story Map 心智圖" });
  const mine = loadMine();
  $("grid").querySelector("tbody").innerHTML = story.rows.map((r, i) =>
    `<tr><td><b>${esc(r[0])}</b><small>${esc(r[1])}</small></td><td>${esc(r[2])}</td><td>${bold(r[3])}</td>`
    + `<td class="sw-mine"><textarea data-i="${i}" spellcheck="true" aria-label="My sentence ${i + 1}" placeholder="${esc(r[2])}">${esc(mine[i] || "")}</textarea></td></tr>`).join("");
  $("builtHost").hidden = true; mineStatus();
  $("essayText").innerHTML = ""; spans = SpeakingKit.wordSpans($("essayText"), story.essay);
  $("essayText").hidden = true; $("essayButton").textContent = "Show";
  $("essayWords").textContent = `(${story.words} words)`;
  $("shortHost").innerHTML = story.short ? `<p class="sw-sub" style="margin:12px 0 6px;font-weight:700">50-word version 英檢初級字數版</p><p class="sw-essay">${esc(story.short)}</p>` : "";
  $("shortHost").hidden = true;
  const vs = $("vocabSection");
  vs.hidden = !(story.vocab || story.patterns);
  if (!vs.hidden) {
    const v = story.vocab || [], half = Math.ceil(v.length / 2);
    const vrows = Array.from({ length: half }, (_, i) => [v[i], v[i + half]]).map(([a, b]) =>
      `<tr>${vcell(a, v.indexOf(a))}<td>${esc(a[1])}</td>${b ? vcell(b, v.indexOf(b)) : "<td></td>"}<td>${b ? esc(b[1]) : ""}</td></tr>`).join("");
    $("vocabHost").innerHTML = (v.length ? `<div class="sw-table-wrap"><table class="sw-grid sw-vocab" id="vocabTable"><thead><tr><th>Word / Phrase</th><th>中文</th><th>Word / Phrase</th><th>中文</th></tr></thead><tbody>${vrows}</tbody></table></div>` : "")
      + (story.patterns ? `<p class="sw-sub" style="margin:14px 0 6px;font-weight:700">Useful Sentence Patterns 實用句型</p><ol style="margin:0;padding-left:22px;line-height:1.9">${story.patterns.map(p => `<li><b>${esc(p[0])}</b> <span style="color:var(--muted)">→ <i>${esc(p[1])}</i></span></li>`).join("")}</ol>` : "");
  }
  $("vocabHide").hidden = !(story.vocab && story.vocab.length);
  $("vocabHide").textContent = "Spelling Test: hide English 拼字測驗";
  if (timerApi) timerApi.stop();
  timerApi = W.timer($("timerHost"), { minutes: [10, 15, 20], start: 15, onEnd: () => { $("saveStatus").textContent = "⏰ Time is up! Finish your sentence and check your writing."; } });
  $("writeBox").value = localStorage.getItem(DRAFT + skey(story)) || "";
  count(); $("feedback").hidden = true;
  list();
  try { history.replaceState(null, "", `#${story.no}`); } catch {}
}
function count() { $("wordCount").textContent = `${W.wordCount($("writeBox").value)} words`; }

$("writeBox").addEventListener("input", () => { try { localStorage.setItem(DRAFT + skey(story), $("writeBox").value); } catch {} count(); });
$("reviewButton").addEventListener("click", () => W.renderReview($("feedback"), W.review($("writeBox").value, story.essay, "story", 50)));
$("hideCol3").addEventListener("click", () => {
  const g = $("grid"); g.classList.toggle("hide-col3");
  $("hideCol3").textContent = g.classList.contains("hide-col3") ? "Show Column 3" : "Hide Column 3 (try it yourself)";
});
$("essayButton").addEventListener("click", () => { const e = $("essayText"); e.hidden = !e.hidden; $("shortHost").hidden = e.hidden; $("essayButton").textContent = e.hidden ? "Show" : "Hide"; });
$("listenButton").addEventListener("click", () => {
  stopRead();
  if (stopListen) { stopListen(); stopListen = null; $("listenButton").innerHTML = "&#128264; Listen"; return; }
  $("essayText").hidden = false; $("shortHost").hidden = false; $("essayButton").textContent = "Hide"; $("listenButton").textContent = "■ Stop";
  stopListen = SpeakingKit.listenAlong(spans, 0.9, () => { stopListen = null; $("listenButton").innerHTML = "&#128264; Listen"; });
});
$("clearButton").addEventListener("click", () => {
  if (!$("writeBox").value.trim() || confirm("Clear this draft?")) { $("writeBox").value = ""; try { localStorage.removeItem(DRAFT + skey(story)); } catch {} count(); $("feedback").hidden = true; }
});
$("aiButton").addEventListener("click", async () => {
  const t = $("writeBox").value.trim();
  if (!t) { $("saveStatus").textContent = "Write your story first."; return; }
  const notes = mm ? mm.text() : "";
  const prompt = `Please check my GEPT Basic (CEFR A2) 3-picture story writing.\n\nTopic: ${story.prompt}\n${story.scenes ? `Pictures: ${story.scenes.map((s, i) => `(${i + 1}) ${s}`).join(" ")}\n` : ""}${notes ? `\nMy plan:\n${notes}\n` : ""}\nMy story (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. Grammar and spelling corrections (especially past tense) with short explanations in Traditional Chinese.\n2. Did I describe all three pictures? What is missing?\n3. An improved version at A2 level that keeps my ideas.\n4. A GEPT Basic writing score estimate (0–5) with one reason.`;
  $("saveStatus").textContent = (await SpeakingKit.copyText(prompt)) ? "Copied with the topic. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your story manually.";
});
$("searchInput").addEventListener("input", list);

/* Optional read-aloud check on the model essay (speech-to-text, Chrome/Edge) */
function showRead(final) {
  const heard = rec ? `${rec.finals.join(" ")} ${rec.lastInterim || ""}` : "";
  const res = SpeakingKit.accuracySummary(SpeakingKit.align(spans, heard), final, "essay");
  $("readStatus").innerHTML = res.msg; $("readBarFill").style.width = `${res.pct}%`;
}
function stopRead(final = true) {
  if (!rec) return;
  rec.stop(); if (final) showRead(true);
  rec = null; $("readButton").innerHTML = "&#127908; Read Aloud (optional)";
}
$("readButton").addEventListener("click", () => {
  if (rec) { stopRead(); return; }
  if (!SpeakingKit.SR) { $("readStatus").hidden = false; $("readStatus").textContent = "Read-aloud needs Chrome or Edge with a microphone."; return; }
  if (stopListen) { stopListen(); stopListen = null; $("listenButton").innerHTML = "&#128264; Listen"; }
  $("essayText").hidden = false; $("shortHost").hidden = false; $("essayButton").textContent = "Hide";
  ["readBar", "readStatus", "readLegend"].forEach(id => { $(id).hidden = false; });
  spans.forEach(w => w.el.classList.remove("ok", "miss"));
  rec = SpeakingKit.recognizer({
    onUpdate: () => showRead(false),
    onBlocked: msg => { $("readStatus").textContent = msg; stopRead(false); }
  });
  if (!rec || !rec.start()) { $("readStatus").textContent = "Could not start the microphone."; rec = null; return; }
  $("readStatus").textContent = "Listening… read the essay aloud from the start."; $("readBarFill").style.width = "0";
  $("readButton").textContent = "■ Stop Reading";
});

/* ---------- Useful Words & Phrases: 🔊 listen · 🎤 say it · ⌨ type it ---------- */
const VOCAB = () => story.vocab || [];
const sayText = w => w.replace(/\([^)]*\)/g, "").replace(/\s*\/\s*/g, ", ").trim();
const norm = t => String(t).toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9/' ]+/g, " ").replace(/\s+/g, " ").trim();
// Accepted answers: the whole phrase, or any one part split on "/".
function answers(w) {
  const base = norm(w), parts = base.split("/").map(x => x.trim()).filter(Boolean);
  return [...new Set([base.replace(/\s*\/\s*/g, " "), ...parts])];
}
function vcell(item, i) {
  return `<td class="vw" data-v="${i}"><div class="vw-row"><b>${esc(item[0])}</b>`
    + `<button class="vbtn" data-act="say" type="button" title="Listen 聽發音">&#128264;</button>`
    + `<button class="vbtn" data-act="rec" type="button" title="Read aloud 唸唸看">&#127908;</button>`
    + `<button class="vbtn" data-act="type" type="button" title="Type it 打字練習">&#9000;</button>`
    + `<span class="vw-result"></span></div>`
    + `<div class="vw-type" hidden><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type the word…"><button class="vbtn" data-act="check" type="button">Check</button></div></td>`;
}
let wordRec = null, wordTimer = null;
function stopWordRec() {
  if (wordTimer) { clearTimeout(wordTimer); wordTimer = null; }
  if (wordRec) { try { wordRec.r.abort(); } catch {} wordRec.btn.classList.remove("on"); wordRec = null; }
}
function result(cell, ok, msg) { const r = cell.querySelector(".vw-result"); r.className = `vw-result ${ok ? "ok" : "no"}`; r.textContent = msg; }
function sayCheck(cell, btn) {
  const was = wordRec && wordRec.btn === btn; stopWordRec(); if (was) return;
  if (!SpeakingKit.SR) { result(cell, false, "Use Chrome / Edge"); return; }
  SpeakingKit.stopSpeech();
  const target = VOCAB()[cell.dataset.v][0], ok = answers(target);
  const r = new SpeakingKit.SR(); r.lang = "en-US"; r.continuous = false; r.interimResults = true; r.maxAlternatives = 3;
  let heard = "", done = false;
  const pass = h => ok.some(a => { const ws = a.split(" "), hs = ` ${norm(h)} `; return ws.every(x => hs.includes(` ${x} `)); });
  const finish = () => {
    if (done) return; done = true; stopWordRec();
    if (!heard) result(cell, false, "沒聽到，再試一次");
    else if (pass(heard)) result(cell, true, `✔ Great! “${heard}”`);
    else result(cell, false, `✘ heard “${heard}”`);
  };
  r.onresult = e => {
    for (let i = 0; i < e.results.length; i++) for (let k = 0; k < e.results[i].length; k++) {
      const t = e.results[i][k].transcript.trim();
      if (pass(t)) { heard = t; finish(); return; }
      if (k === 0) heard = t;
    }
    if (e.results[e.results.length - 1].isFinal) finish();
  };
  r.onerror = e => { if (["not-allowed", "service-not-allowed", "audio-capture"].includes(e.error)) { done = true; stopWordRec(); result(cell, false, "Allow the microphone"); } };
  r.onend = finish;
  try { r.start(); } catch { result(cell, false, "Mic busy, try again"); return; }
  wordRec = { r, btn }; btn.classList.add("on"); result(cell, true, "Listening… 請說"); cell.querySelector(".vw-result").className = "vw-result";
  wordTimer = setTimeout(() => { try { r.stop(); } catch {} }, 6000);
}
function typeCheck(cell) {
  const inp = cell.querySelector("input"), v = norm(inp.value).replace(/\s*\/\s*/g, " ");
  if (!v) { inp.focus(); return; }
  const good = answers(VOCAB()[cell.dataset.v][0]).includes(v);
  inp.classList.toggle("ok", good); inp.classList.toggle("no", !good);
  if (good) { cell.classList.add("shown"); result(cell, true, "✔ Correct!"); SpeakingKit.speak(sayText(VOCAB()[cell.dataset.v][0]), 0.85); }
  else result(cell, false, "✘ Try again");
}
$("vocabHost").addEventListener("click", e => {
  const btn = e.target.closest(".vbtn"); if (!btn) return;
  const cell = btn.closest(".vw"), word = VOCAB()[cell.dataset.v][0];
  if (btn.dataset.act === "say") { stopWordRec(); SpeakingKit.speak(sayText(word), 0.85); }
  else if (btn.dataset.act === "rec") sayCheck(cell, btn);
  else if (btn.dataset.act === "type") { const box = cell.querySelector(".vw-type"); box.hidden = !box.hidden; if (!box.hidden) box.querySelector("input").focus(); }
  else if (btn.dataset.act === "check") typeCheck(cell);
});
$("vocabHost").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches(".vw-type input")) { e.preventDefault(); typeCheck(e.target.closest(".vw")); } });
$("vocabHide").addEventListener("click", () => {
  const t = $("vocabTable"); if (!t) return;
  const on = t.classList.toggle("hide-en");
  t.querySelectorAll(".vw").forEach(c => { c.classList.remove("shown"); c.querySelector(".vw-type").hidden = !on; const i = c.querySelector("input"); i.value = ""; i.className = ""; c.querySelector(".vw-result").textContent = ""; });
  $("vocabHide").textContent = on ? "Show English 顯示英文" : "Spelling Test: hide English 拼字測驗";
});

/* ---------- Column 4: my sentences → complete story ---------- */
const MINE = "gept-basic-mine-";
let stopBuilt = null;
function loadMine() { try { return JSON.parse(localStorage.getItem(MINE + skey(story))) || []; } catch { return []; } }
function mineBoxes() { return [...$("grid").querySelectorAll(".sw-mine textarea")]; }
function mineStatus() {
  const b = mineBoxes(), n = b.filter(x => x.value.trim()).length;
  $("mineStatus").textContent = `${n} / ${b.length} sentences written 已寫 ${n} 句`;
}
$("grid").addEventListener("input", e => {
  if (!e.target.matches(".sw-mine textarea")) return;
  try { localStorage.setItem(MINE + skey(story), JSON.stringify(mineBoxes().map(x => x.value))); } catch {}
  mineStatus();
});
function tidy(t) {
  t = t.trim().replace(/\s+/g, " "); if (!t) return "";
  t = t.charAt(0).toUpperCase() + t.slice(1);
  return /[.!?]["”’)]*$/.test(t) ? t : `${t}.`;
}
$("buildStory").addEventListener("click", () => {
  const parts = mineBoxes().map(x => tidy(x.value)).filter(Boolean);
  if (!parts.length) { $("mineStatus").textContent = "請先在 Column 4 寫下你的句子 Write your sentences in Column 4 first."; return; }
  const text = parts.join(" ");
  $("builtText").textContent = text;
  $("builtWords").textContent = `(${W.wordCount(text)} words)`;
  $("builtHost").hidden = false;
  $("builtHost").scrollIntoView({ behavior: "smooth", block: "nearest" });
});
$("builtListen").addEventListener("click", () => {
  if (stopBuilt) { stopBuilt(); stopBuilt = null; $("builtListen").innerHTML = "&#128264; Listen"; return; }
  const host = $("builtText"), text = host.textContent; host.innerHTML = "";
  const sp = SpeakingKit.wordSpans(host, text);
  $("builtListen").textContent = "■ Stop";
  stopBuilt = SpeakingKit.listenAlong(sp, 0.9, () => { stopBuilt = null; $("builtListen").innerHTML = "&#128264; Listen"; });
});
$("builtCopy").addEventListener("click", () => {
  const text = $("builtText").textContent.trim(); if (!text) return;
  const box = $("writeBox");
  if (box.value.trim() && box.value.trim() !== text && !confirm("Replace what is already in \"Your Story\"? 要取代「我的作文」裡原本的內容嗎？")) return;
  box.value = text; try { localStorage.setItem(DRAFT + skey(story), text); } catch {} count();
  $("feedback").hidden = true;
  box.scrollIntoView({ behavior: "smooth", block: "center" }); box.focus();
  $("saveStatus").textContent = "✔ Your sentences are now in the box. Edit them, then press Check My Writing.";
});
$("clearMine").addEventListener("click", () => {
  if (!mineBoxes().some(x => x.value.trim()) || !confirm("Clear all your Column 4 sentences? 清除第四欄所有句子？")) return;
  mineBoxes().forEach(x => { x.value = ""; }); try { localStorage.removeItem(MINE + skey(story)); } catch {}
  $("builtHost").hidden = true; mineStatus();
});

select(Number(location.hash.slice(1)) || 1);
