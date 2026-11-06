/* PET / KET essay engine (about 200 words) — shared by pet-essay.html (agree/disagree) and pet-pros-cons.html (pros & cons; window.PET_ESSAY_CFG).
   Teacher's AGREE sentences (bold = pattern) in column 3; students type the DISAGREE side row by row in column 2,
   then join the rows into a 4-paragraph essay. Drafts are saved on this device. */
const W = window.WritingKit;
const ESSAYS = window.PET_ESSAYS || [], EL = window.PET_ESSAY_ELEMENTS, PARAS = window.PET_ESSAY_PARAS;
const CFG = Object.assign({ store: "pet-essay-", suffix: " Write an essay giving your opinion.", kind: "opinion essay", position: "My position: DISAGREE.\n", aiCheck: "Is my opinion clear? Do I have two reasons with examples, a contrast and a conclusion?" }, window.PET_ESSAY_CFG || {});
const ROWKEY = CFG.store + "rows-", DRAFT = CFG.store + "draft-";
const $ = id => document.getElementById(id);
const esc = W.esc;
const bold = s => esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v)); } catch {} };
let topic = ESSAYS[0], spans = [], stopListen = null, timerApi = null;

function list() {
  const term = $("searchInput").value.trim().toLowerCase();
  const shown = ESSAYS.filter(e => !term || `${e.en} ${e.zh} ${e.theme} ${e.prompt}`.toLowerCase().includes(term) || String(e.no) === term);
  $("countPill").textContent = shown.length;
  const box = $("topicList"); box.innerHTML = "";
  shown.forEach(e => {
    const done = load(ROWKEY + e.no, []).filter(t => t && t.trim()).length;
    const b = document.createElement("button"); b.type = "button";
    b.className = `question-item${e.no === topic.no ? " active" : ""}`;
    b.innerHTML = `<span class="question-id">${e.no}</span><span class="question-label">${esc(e.en)}<br><small style="color:var(--muted)">${esc(e.zh)} · ${esc(e.theme.split(" ")[0])}${done ? ` · ✎ ${done}/10` : ""}</small></span>`;
    b.addEventListener("click", () => select(e.no));
    box.appendChild(b);
  });
}

function stopAudio() { if (stopListen) { stopListen(); stopListen = null; } $("listenButton").innerHTML = "&#128264; Listen"; }

function select(no) {
  stopAudio();
  topic = ESSAYS.find(e => e.no === no) || ESSAYS[0];
  $("topicMeta").textContent = `Topic ${topic.no} / ${ESSAYS.length} · ${topic.theme} · PET B1 · about 200 words`;
  $("topicTitle").textContent = `${topic.en} · ${topic.zh}`;
  $("topicPrompt").textContent = `${topic.prompt}${CFG.suffix}\nWrite about 200 words.`;
  const rows = load(ROWKEY + topic.no, []);
  $("grid").querySelector("tbody").innerHTML = topic.rows.map((r, i) =>
    `<tr><td><b>${esc(EL[i][0])}</b><small>${esc(EL[i][1])}</small><i>✎ idea: ${esc(r[0])}</i></td>
     <td><textarea data-row="${i}" aria-label="${esc(EL[i][0])} — my disagree sentence" placeholder="Your ${esc(EL[i][0].toLowerCase())}…">${esc(rows[i] || "")}</textarea></td>
     <td>${bold(r[1])}</td></tr>`).join("");
  $("grid").querySelectorAll("textarea").forEach(t => t.addEventListener("input", () => {
    const all = [...$("grid").querySelectorAll("textarea")].map(x => x.value);
    save(ROWKEY + topic.no, all); list();
  }));
  $("vocabHost").innerHTML = topic.vocab.map(v => `<span><b>${esc(v[0])}</b>${esc(v[1])}</span>`).join("");
  const host = $("essayHost"); host.innerHTML = ""; spans = [];
  PARAS.forEach(p => {
    const el = document.createElement("p"); el.className = "sw-essay"; el.style.margin = "0 0 12px";
    SpeakingKit.wordSpans(el, p.map(i => topic.rows[i][1]).join(" "), spans);
    host.appendChild(el);
  });
  host.hidden = true; $("essayButton").textContent = "Show";
  $("essayWords").textContent = `(${W.wordCount(window.PET_ESSAY_TEXT(topic))} words)`;
  if (timerApi) timerApi.stop();
  timerApi = W.timer($("timerHost"), { minutes: [20, 30, 40], start: 30, onEnd: () => { $("saveStatus").textContent = "⏰ Time is up! Finish your sentence and check your writing."; } });
  $("writeBox").value = localStorage.getItem(DRAFT + topic.no) || "";
  count(); $("feedback").hidden = true;
  list();
  try { history.replaceState(null, "", `#${topic.no}`); } catch {}
}
function count() { $("wordCount").textContent = `${W.wordCount($("writeBox").value)} words`; }

$("buildButton").addEventListener("click", () => {
  const rows = [...$("grid").querySelectorAll("textarea")].map(t => t.value.trim());
  const text = PARAS.map(p => p.map(i => rows[i]).filter(Boolean).join(" ")).filter(Boolean).join("\n\n");
  if (!text) { $("saveStatus").textContent = "Write some sentences in column 2 first. 請先在第二欄寫句子。"; return; }
  if ($("writeBox").value.trim() && !confirm("Replace the essay below with your grid sentences?")) return;
  $("writeBox").value = text; save(DRAFT + topic.no, text); count();
  $("saveStatus").textContent = `Joined ${rows.filter(Boolean).length}/10 rows into 4 paragraphs. Now polish it below.`;
  $("writeBox").scrollIntoView({ behavior: "smooth", block: "center" });
});
$("writeBox").addEventListener("input", () => { save(DRAFT + topic.no, $("writeBox").value); count(); });
$("reviewButton").addEventListener("click", () => W.renderReview($("feedback"), W.review($("writeBox").value, window.PET_ESSAY_TEXT(topic), "essay", 180)));
$("hideCol3").addEventListener("click", () => {
  const g = $("grid"); g.classList.toggle("hide-col3");
  $("hideCol3").textContent = g.classList.contains("hide-col3") ? "Show Column 3" : "Hide Column 3";
});
$("hideHints").addEventListener("click", () => {
  const g = $("grid"); g.classList.toggle("hide-hints");
  $("hideHints").textContent = g.classList.contains("hide-hints") ? "Show ✎ ideas" : "Hide ✎ ideas";
});
$("essayButton").addEventListener("click", () => { const h = $("essayHost"); h.hidden = !h.hidden; $("essayButton").textContent = h.hidden ? "Show" : "Hide"; });
$("listenButton").addEventListener("click", () => {
  if (stopListen) { stopAudio(); return; }
  $("essayHost").hidden = false; $("essayButton").textContent = "Hide"; $("listenButton").textContent = "■ Stop";
  stopListen = SpeakingKit.listenAlong(spans, 0.9, () => { stopListen = null; $("listenButton").innerHTML = "&#128264; Listen"; });
});
$("clearButton").addEventListener("click", () => {
  if (!confirm("Clear this essay AND your grid sentences for this topic?")) return;
  $("writeBox").value = ""; try { localStorage.removeItem(DRAFT + topic.no); localStorage.removeItem(ROWKEY + topic.no); } catch {}
  $("grid").querySelectorAll("textarea").forEach(t => { t.value = ""; });
  count(); $("feedback").hidden = true; list();
});
$("aiButton").addEventListener("click", async () => {
  const t = $("writeBox").value.trim();
  if (!t) { $("saveStatus").textContent = "Write your essay first."; return; }
  const prompt = `Please check my Cambridge B1 Preliminary (PET) ${CFG.kind}.\n\nTask: ${topic.prompt}${CFG.suffix} Write about 200 words.\n${CFG.position || ""}\nMy essay (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. Grammar, spelling and punctuation corrections with short explanations in Traditional Chinese.\n2. ${CFG.aiCheck}\n3. Better linking words or sentence patterns I could use (B1 level).\n4. An improved B1 version (about 200 words) that keeps my ideas.\n5. A PET writing score estimate (Content, Communicative Achievement, Organisation, Language: 0–5 each).`;
  $("saveStatus").textContent = (await SpeakingKit.copyText(prompt)) ? "Copied with the task. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your essay manually.";
});
$("searchInput").addEventListener("input", list);

select(Number(location.hash.slice(1)) || 1);
