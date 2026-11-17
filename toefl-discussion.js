/* toefl-discussion.js — 2026 TOEFL iBT "Write for an Academic Discussion" (10 minutes, 100+ words).
   Professor + David (pro) + Mary (con) prompt, then:
   ①② a 3-column grid for Essay A (agree with David) and Essay B (agree with Mary):
      hints · typing box (type the sample first, then your own sentence) · full-mark sample (hide / show)
   ③ My Answer: 10-minute timer, word counter, quick check and AI-feedback prompt.
   Everything is saved on this device (localStorage). Data: toefl-discussion-data.js */
const W = window.WritingKit, SK = window.SpeakingKit;
const CATS = window.TOEFL_DISCUSSION_CATEGORIES || [];
const TOPICS = window.TOEFL_DISCUSSIONS || [];
const $ = id => document.getElementById(id);
const esc = W.esc;
const load = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const K = { rows: "toefl-disc-rows-", draft: "toefl-disc-draft-" };
const pad = n => String(n).padStart(2, "0");
/* sample markup: [[pattern]] → yellow highlight, **theme word** → bold */
const plain = s => String(s).replace(/\[\[|\]\]|\*\*/g, "");
const markHtml = s => esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="pt">$1</span>').replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const norm = s => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();

let T = TOPICS[0], side = 0, tab = "a", timerApi = null, speaking = false;

/* ---------- sidebar: topics grouped by the 8 categories ---------- */
function list() {
  const term = $("searchInput").value.trim().toLowerCase();
  const hit = t => !term || `${t.title} ${t.zh} ${t.question} ${t.questionZh} ${t.cat}`.toLowerCase().includes(term) || String(t.no) === term;
  const shown = TOPICS.filter(hit);
  $("countPill").textContent = shown.length;
  const host = $("topicList"); host.innerHTML = "";
  const names = CATS.map(c => c.name);
  const groups = CATS.map(c => ({ ...c, items: shown.filter(t => t.cat === c.name) }));
  const other = shown.filter(t => !names.includes(t.cat));
  if (other.length) groups.push({ name: "Other", zh: "其他", items: other });
  groups.forEach(g => {
    if (term && !g.items.length) return;
    const p = document.createElement("p"); p.className = "sw-group"; p.textContent = `${g.name} ${g.zh}`; host.appendChild(p);
    if (!g.items.length) { const e = document.createElement("p"); e.className = "td-empty"; e.textContent = "Coming soon 即將推出"; host.appendChild(e); }
    g.items.forEach(t => {
      const done = [0, 1].map(i => load(K.rows + t.no + "-" + i, []).filter(x => x && x.trim()).length);
      const draft = W.wordCount(load(K.draft + t.no, ""));
      const tags = [done[0] ? `A ✎ ${done[0]}/5` : "", done[1] ? `B ✎ ${done[1]}/5` : "", draft ? `✍ ${draft} words` : ""].filter(Boolean).join(" · ");
      const b = document.createElement("button"); b.type = "button";
      b.className = `question-item${T && t.no === T.no ? " active" : ""}`;
      b.innerHTML = `<span class="question-id">${t.no}</span><span class="question-label">${esc(t.title)}<br><small style="color:var(--muted)">${esc(t.zh)}${tags ? `<br>${tags}` : ""}</small></span>`;
      b.addEventListener("click", () => select(t.no));
      host.appendChild(b);
    });
  });
}

/* ---------- select a topic ---------- */
function select(no) {
  stopAudio();
  T = TOPICS.find(t => t.no === no) || TOPICS[0];
  if (!T) { $("topicTitle").textContent = "No discussions yet."; return; }
  const cat = CATS.find(c => c.name === T.cat);
  $("topicMeta").textContent = `Discussion ${pad(T.no)} · ${T.cat}${cat ? " " + cat.zh : ""} · 10 minutes · at least 100 words`;
  $("topicTitle").textContent = T.question;
  $("profHost").innerHTML = `<b class="who">Professor (Dr. Miller) 教授</b>${esc(T.professor)}<br><small style="color:var(--muted)">${esc(T.questionZh)}</small>`;
  $("davidHost").innerHTML = `<b class="who">David · pro side 贊成方</b>${esc(T.david)}`;
  $("maryHost").innerHTML = `<b class="who">Mary · con side 反對方</b>${esc(T.mary)}`;
  const tb = document.querySelectorAll("#tabs button");
  tb[0].textContent = `① ${T.essays[0].label}`; tb[1].textContent = `② ${T.essays[1].label}`;
  if (timerApi) timerApi.stop();
  timerApi = W.timer($("timerHost"), { minutes: [7, 10, 15], start: 10, onEnd: () => { $("saveStatus").textContent = "⏰ Time is up! Finish your sentence and check your answer."; } });
  $("saveStatus").textContent = "TOEFL Academic Discussion · 10 minutes · at least 100 words";
  $("writeBox").value = load(K.draft + T.no, "");
  count(); $("feedback").hidden = true;
  showTab(tab);
  list();
  try { history.replaceState(null, "", `#${T.no}`); } catch {}
}

/* ---------- tabs ---------- */
function showTab(t) {
  tab = t; stopAudio();
  document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === t));
  const pane = t === "write" ? "write" : "grid";
  document.querySelectorAll(".td-pane").forEach(p => { p.hidden = p.dataset.pane !== pane; });
  if (pane === "grid") { side = t === "b" ? 1 : 0; renderGrid(); }
}
$("tabs").addEventListener("click", ev => { const b = ev.target.closest("button[data-tab]"); if (b) showTab(b.dataset.tab); });

/* ---------- ①② grid ---------- */
const essay = () => T.essays[side];
const modelText = () => essay().rows.map(r => plain(r.sample)).join(" ");
function tick(ta) {
  const r = essay().rows[Number(ta.dataset.row)];
  const ok = !!ta.value.trim() && norm(ta.value) === norm(plain(r.sample));
  ta.classList.toggle("match", ok);
  ta.nextElementSibling.textContent = ok ? "✓ Matches the sample — now hide it and try again, or write your own." : "";
}
function gridStatus() {
  const n = [...$("grid").querySelectorAll("textarea")];
  const words = W.wordCount(n.map(t => t.value).join(" "));
  $("gridStatus").textContent = `${n.filter(t => t.value.trim()).length}/${n.length} rows · ${words} words`;
}
function renderGrid() {
  const E = essay(), saved = load(K.rows + T.no + "-" + side, []);
  $("gridTitle").textContent = `${E.label}${E.zh ? " · " + E.zh : ""}`;
  $("grid").querySelector("tbody").innerHTML = E.rows.map((r, i) => `<tr>
    <td><b>${i + 1}. ${esc(r.role)}</b><small>${esc(r.zh)}</small><i>${esc(r.hints)}</i></td>
    <td><textarea data-row="${i}" spellcheck="true" aria-label="${esc(r.role)} — your writing" placeholder="Type the sample sentence, then write your own…">${esc(saved[i] || "")}</textarea><span class="td-tick"></span></td>
    <td>${markHtml(r.sample)}</td></tr>`).join("");
  $("grid").querySelectorAll("textarea").forEach(t => {
    tick(t);
    t.addEventListener("input", () => {
      save(K.rows + T.no + "-" + side, [...$("grid").querySelectorAll("textarea")].map(x => x.value));
      tick(t); gridStatus();
    });
  });
  gridStatus();
  $("essayHost").innerHTML = E.rows.map(r => markHtml(r.sample)).join(" ");
  $("essayHost").hidden = true; $("essayButton").textContent = "Show";
  $("essayWords").textContent = `(${W.wordCount(modelText())} words)`;
}
$("hideCol3").addEventListener("click", () => { const g = $("grid"); g.classList.toggle("hide-col3"); $("hideCol3").textContent = g.classList.contains("hide-col3") ? "Show sample" : "Hide sample"; });
$("hideMarks").addEventListener("click", () => { const g = $("grid"); g.classList.toggle("hide-marks"); $("hideMarks").textContent = g.classList.contains("hide-marks") ? "Show highlights" : "Hide highlights"; });
$("buildButton").addEventListener("click", () => {
  const text = [...$("grid").querySelectorAll("textarea")].map(t => t.value.trim()).filter(Boolean).join(" ");
  if (!text) { $("gridStatus").textContent = "Write in column 2 first. 請先在第二欄寫句子。"; return; }
  if ($("writeBox").value.trim() && !confirm("Replace the text in ③ My Answer with your grid sentences?")) return;
  $("writeBox").value = text; save(K.draft + T.no, text); count(); showTab("write"); list();
});
$("clearGrid").addEventListener("click", () => {
  if (!confirm("Clear everything you typed in column 2 for this essay?")) return;
  try { localStorage.removeItem(K.rows + T.no + "-" + side); } catch {}
  renderGrid(); list();
});
function stopAudio() { if (speaking) { SK.stopSpeech(); speaking = false; } $("listenButton").innerHTML = "&#128264; Listen"; }
$("essayButton").addEventListener("click", () => { const h = $("essayHost"); h.hidden = !h.hidden; $("essayButton").textContent = h.hidden ? "Show" : "Hide"; });
$("listenButton").addEventListener("click", () => {
  if (speaking) { stopAudio(); return; }
  speaking = true; $("listenButton").textContent = "■ Stop"; SK.speak(modelText(), 0.9);
});

/* ---------- ③ my answer ---------- */
function count() {
  const n = W.wordCount($("writeBox").value);
  $("wordCount").textContent = `${n} words${n >= 100 ? " ✓" : " · aim for 100+"}`;
}
$("writeBox").addEventListener("input", () => { save(K.draft + T.no, $("writeBox").value); count(); });
$("reviewButton").addEventListener("click", () => {
  const t = $("writeBox").value;
  const r = W.review(t, T.essays.map(e => e.rows.map(x => plain(x.sample)).join(" ")).join(" "), "essay", 100);
  if (t.trim()) {
    if (!/\b(david|mary)\b/i.test(t)) { r.issues.push("Mention David or Mary and respond to their idea (While Mary is right that…, I believe…). 要回應同學的觀點。"); r.score = Math.max(0, r.score - 8); }
    if (!/\b(i (agree|disagree|side|believe|think)|in my (view|opinion)|from my perspective)\b/i.test(t)) { r.issues.push("State your position clearly in the first sentence (I agree with David's argument that… / I side with Mary on this issue.). 第一句就表明立場。"); r.score = Math.max(0, r.score - 8); }
    if (!/\b(for example|for instance|such as)\b/i.test(t)) { r.issues.push("Add a specific example (For example, … / For instance, …). 加入具體例子。"); r.score = Math.max(0, r.score - 6); }
  }
  W.renderReview($("feedback"), r);
});
$("clearButton").addEventListener("click", () => {
  if ($("writeBox").value.trim() && !confirm("Clear your answer?")) return;
  $("writeBox").value = ""; try { localStorage.removeItem(K.draft + T.no); } catch {}
  count(); $("feedback").hidden = true; list();
});
$("aiButton").addEventListener("click", async () => {
  const t = $("writeBox").value.trim();
  if (!t) { $("saveStatus").textContent = "Write your answer first. 請先寫下你的回答。"; return; }
  const prompt = `Please check my TOEFL iBT "Write for an Academic Discussion" response (10 minutes, at least 100 words).\n\nProfessor: ${T.professor}\nDavid: ${T.david}\nMary: ${T.mary}\n\nMy response (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. An estimated score (0–5) with a short reason\n2. Grammar and vocabulary corrections (show my sentence → corrected sentence)\n3. Whether I stated a clear position, added a NEW idea, gave an example and responded to David or Mary\n4. A corrected version that keeps my ideas\nPlease explain in English with Traditional Chinese (繁體中文) notes.`;
  const ok = await SK.copyText(prompt);
  $("saveStatus").textContent = ok === false ? "Could not copy — please copy your answer manually." : "✓ Copied! Paste it into your AI tool for feedback. 已複製，可貼到 AI 工具。";
});

$("searchInput").addEventListener("input", list);
const first = Number((location.hash || "").slice(1));
select(TOPICS.some(t => t.no === first) ? first : (TOPICS[0] || {}).no);
