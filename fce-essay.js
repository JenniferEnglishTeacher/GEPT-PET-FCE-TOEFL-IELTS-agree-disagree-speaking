/* fce-essay.js — B2 First (FCE) Writing Part 1 essays (220–250 words).
   ① 3-column pattern grid (role + pattern · my sentence · model sentence) → join into an essay
   ② Pattern Check: model essay with the sentence patterns blanked, instant check
   ③ Typing Game: type the model essay sentence by sentence (WPM, accuracy, score, memory mode)
   ④ My Essay: timer + FCE checker (length, paragraphs, notes, opinion, patterns, formality) + AI-feedback prompt
   Everything is saved on this device (localStorage). Data: fce-essay-data.js */
const W = window.WritingKit, SK = window.SpeakingKit;
const ESSAYS = window.FCE_ESSAYS || [];
const $ = id => document.getElementById(id);
const esc = W.esc;
const load = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const K = { rows: "fce-essay-rows-", draft: "fce-essay-draft-", cloze: "fce-essay-cloze-", game: "fce-essay-game-" };
const plain = segs => segs.map(s => s[0]).join("");
const segHtml = segs => segs.map(([t, k]) => k === "p" ? `<span class="p">${esc(t)}</span>` : k === "v" ? `<span class="v">${esc(t)}</span>` : esc(t)).join("");
const norm = s => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();

let E = ESSAYS[0], flat = [], spans = [], stopListen = null, timerApi = null, tab = "grid";

/* ---------- sidebar ---------- */
function list() {
  const term = $("searchInput").value.trim().toLowerCase();
  const shown = ESSAYS.filter(e => !term || `${e.title} ${e.zh} ${e.topic} ${e.notes.join(" ")}`.toLowerCase().includes(term) || String(e.no) === term);
  $("countPill").textContent = shown.length;
  $("topicList").innerHTML = "";
  shown.forEach(e => {
    const n = e.sections.reduce((a, s) => a + s.rows.length, 0);
    const done = load(K.rows + e.no, []).filter(t => t && t.trim()).length;
    const cz = load(K.cloze + e.no, null), gm = load(K.game + e.no + "-all", null);
    const tags = [done ? `✎ ${done}/${n}` : "", cz ? `填空 ${cz}%` : "", gm ? `⌨ ${gm.score}` : ""].filter(Boolean).join(" · ");
    const b = document.createElement("button"); b.type = "button";
    b.className = `question-item${e.no === E.no ? " active" : ""}`;
    b.innerHTML = `<span class="question-id">${e.no}</span><span class="question-label">${esc(e.title)}<br><small style="color:var(--muted)">${esc(e.zh)} · ${esc(e.test)}${tags ? `<br>${tags}` : ""}</small></span>`;
    b.addEventListener("click", () => select(e.no));
    $("topicList").appendChild(b);
  });
}

/* ---------- select ---------- */
function modelText(e = E) { return e.sections.map(s => s.rows.map(r => plain(r.segs)).join(" ")).join("\n\n"); }

function select(no) {
  stopAudio(); gameStop(true);
  E = ESSAYS.find(e => e.no === no) || ESSAYS[0];
  flat = []; E.sections.forEach((s, si) => s.rows.forEach((r, ri) => flat.push({ ...r, si, ri, sec: s.head })));
  $("topicMeta").textContent = `Essay ${E.no} / ${ESSAYS.length} · ${E.test} · B2 First Writing Part 1 · 220–250 words`;
  $("topicTitle").textContent = `${E.title} · ${E.zh}`;
  $("topicPrompt").textContent = `In your English class you have been talking about this topic. Now your English teacher has asked you to write an essay.\n${E.topic}\nWrite about the notes below and give reasons for your point of view. Write 220–250 words.`;
  $("notesHost").innerHTML = E.notes.map((n, i) => `<div><b>Note ${i + 1}${i === 2 ? " · your own idea 自己的想法" : ""}</b>${esc(n)}</div>`).join("");
  renderGrid(); renderEssay(); renderCloze(); gameSetup();
  if (timerApi) timerApi.stop();
  timerApi = W.timer($("timerHost"), { minutes: [30, 40, 45], start: 40, onEnd: () => { $("saveStatus").textContent = "⏰ Time is up! Finish your sentence and check your essay."; } });
  $("writeBox").value = load(K.draft + E.no, "");
  count(); $("feedback").hidden = true;
  list();
  try { history.replaceState(null, "", `#${E.no}`); } catch {}
}

/* ---------- tabs ---------- */
function showTab(t) {
  tab = t;
  document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === t));
  document.querySelectorAll(".fe-pane").forEach(p => { p.hidden = p.dataset.pane !== t; });
  if (t !== "game") gameStop(true);
}
$("tabs").addEventListener("click", ev => { const b = ev.target.closest("button[data-tab]"); if (b) showTab(b.dataset.tab); });

/* ---------- ① grid ---------- */
function renderGrid() {
  const saved = load(K.rows + E.no, []);
  let i = 0, html = "";
  E.sections.forEach(s => {
    html += `<tr class="sec"><td colspan="3">${esc(s.head)}${s.zh ? ` · ${esc(s.zh)}` : ""}</td></tr>`;
    s.rows.forEach(r => {
      html += `<tr><td><b>${esc(r.role)}</b><small>${esc(r.zh)}</small>${r.pats.length ? `<i>句型 ${esc(r.pats.join(" · "))}</i>` : ""}</td>
        <td><textarea data-row="${i}" aria-label="${esc(r.role)} — my sentence" placeholder="${esc(r.pats[0] ? r.pats[0] + " …" : "Your " + r.role.toLowerCase() + " …")}">${esc(saved[i] || "")}</textarea></td>
        <td>${segHtml(r.segs)}</td></tr>`;
      i++;
    });
  });
  $("grid").querySelector("tbody").innerHTML = html;
  $("gridStatus").textContent = "";
  $("grid").querySelectorAll("textarea").forEach(t => t.addEventListener("input", () => {
    save(K.rows + E.no, [...$("grid").querySelectorAll("textarea")].map(x => x.value)); list();
  }));
}
$("buildButton").addEventListener("click", () => {
  const vals = [...$("grid").querySelectorAll("textarea")].map(t => t.value.trim());
  const paras = E.sections.map((s, si) => flat.map((f, i) => f.si === si ? vals[i] : "").filter(Boolean).join(" ")).filter(Boolean);
  if (!paras.length) { $("gridStatus").textContent = "Write some sentences in column 2 first. 請先在第二欄寫句子。"; return; }
  if ($("writeBox").value.trim() && !confirm("Replace the essay in ④ My Essay with your grid sentences?")) return;
  $("writeBox").value = paras.join("\n\n"); save(K.draft + E.no, $("writeBox").value); count();
  showTab("write");
  $("saveStatus").textContent = `Joined ${vals.filter(Boolean).length}/${flat.length} rows into ${paras.length} paragraphs. Now polish it and press Check.`;
});
$("hideCol3").addEventListener("click", () => { const g = $("grid"); g.classList.toggle("hide-col3"); $("hideCol3").textContent = g.classList.contains("hide-col3") ? "Show Column 3" : "Hide Column 3"; });
$("hideVocab").addEventListener("click", () => { const g = $("grid"); g.classList.toggle("hide-vocab"); $("hideVocab").textContent = g.classList.contains("hide-vocab") ? "Show highlights" : "Hide highlights"; });

/* model essay + listen */
function renderEssay() {
  const host = $("essayHost"); host.innerHTML = ""; spans = [];
  E.sections.forEach(s => {
    const el = document.createElement("p"); el.className = "sw-essay"; el.style.margin = "0 0 12px";
    SK.wordSpans(el, s.rows.map(r => plain(r.segs)).join(" "), spans);
    host.appendChild(el);
  });
  host.hidden = true; $("essayButton").textContent = "Show";
  $("essayWords").textContent = `(${W.wordCount(modelText())} words)`;
}
function stopAudio() { if (stopListen) { stopListen(); stopListen = null; } $("listenButton").innerHTML = "&#128264; Listen"; }
$("essayButton").addEventListener("click", () => { const h = $("essayHost"); h.hidden = !h.hidden; $("essayButton").textContent = h.hidden ? "Show" : "Hide"; });
$("listenButton").addEventListener("click", () => {
  if (stopListen) { stopAudio(); return; }
  $("essayHost").hidden = false; $("essayButton").textContent = "Hide"; $("listenButton").textContent = "■ Stop";
  stopListen = SK.listenAlong(spans, 0.9, () => { stopListen = null; $("listenButton").innerHTML = "&#128264; Listen"; });
});

/* ---------- ② pattern check (cloze) ---------- */
let blanks = [];
function renderCloze() {
  blanks = [];
  const html = E.sections.map(s => `<p><b class="sec">${esc(s.head)}</b>${s.rows.map(r => r.segs.map(([t, k]) => {
    if (k !== "p" || !/[a-z]{2,}/i.test(t)) return esc(t);
    const m = t.match(/^(\s*)(.*?)([\s,.;:]*)$/s);
    const ans = m[2], i = blanks.length; blanks.push(ans);
    return `${esc(m[1])}<input data-b="${i}" size="${Math.max(4, ans.length + 1)}" autocomplete="off" spellcheck="false" aria-label="blank ${i + 1}">${esc(m[3])}`;
  }).join("")).join(" ")}</p>`).join("");
  $("clozeHost").innerHTML = html;
  const bank = [...new Set(blanks)].sort(() => Math.random() - .5);
  $("bankHost").innerHTML = bank.map(b => `<span data-w="${esc(norm(b))}">${esc(b)}</span>`).join("");
  $("bankHost").hidden = true; $("bankButton").textContent = "Show word bank";
  hints = false; $("hintButton").textContent = "First-letter hints";
  const best = load(K.cloze + E.no, null);
  $("clozeScore").textContent = `${blanks.length} blanks${best != null ? ` · best ${best}%` : ""}`;
  $("clozeHost").querySelectorAll("input").forEach(inp => inp.addEventListener("keydown", ev => {
    if (ev.key === "Enter") { ev.preventDefault(); const all = [...$("clozeHost").querySelectorAll("input")]; const nx = all[all.indexOf(inp) + 1]; nx ? nx.focus() : clozeCheck(); }
  }));
}
let hints = false;
$("hintButton").addEventListener("click", () => {
  hints = !hints; $("hintButton").textContent = hints ? "Hide hints" : "First-letter hints";
  $("clozeHost").querySelectorAll("input").forEach(inp => { const a = blanks[inp.dataset.b]; inp.placeholder = hints ? a.split(" ").map(w => w[0] + "…").join(" ") : ""; });
});
$("bankButton").addEventListener("click", () => { const b = $("bankHost"); b.hidden = !b.hidden; $("bankButton").textContent = b.hidden ? "Show word bank" : "Hide word bank"; });
function clozeCheck() {
  let ok = 0; const inputs = [...$("clozeHost").querySelectorAll("input")];
  const usedOk = new Set();
  inputs.forEach(inp => {
    const good = norm(inp.value) === norm(blanks[inp.dataset.b]);
    inp.classList.toggle("ok", good); inp.classList.toggle("bad", !good && inp.value.trim() !== "");
    if (good) { ok++; usedOk.add(norm(inp.value)); }
  });
  $("bankHost").querySelectorAll("span").forEach(s => s.classList.toggle("used", usedOk.has(s.dataset.w)));
  const pct = Math.round(ok / Math.max(1, inputs.length) * 100);
  const best = Math.max(pct, load(K.cloze + E.no, 0) || 0); save(K.cloze + E.no, best);
  $("clozeScore").textContent = `${ok} / ${inputs.length} correct · ${pct}%${pct === 100 ? " 🎉 Perfect!" : ""} · best ${best}%`;
  list();
}
$("clozeCheck").addEventListener("click", clozeCheck);
$("clozeShow").addEventListener("click", () => {
  $("clozeHost").querySelectorAll("input").forEach(inp => {
    if (inp.classList.contains("ok")) return;
    const s = inp.nextElementSibling;
    if (!(s && s.classList.contains("fe-ans"))) inp.insertAdjacentHTML("afterend", `<span class="fe-ans">→ ${esc(blanks[inp.dataset.b])}</span>`);
  });
});
$("clozeReset").addEventListener("click", renderCloze);

/* ---------- ③ typing game ---------- */
const typeable = s => s.replace(/\s*[—–]\s*/g, " - ").replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/…/g, "...").replace(/~/g, "about ");
let G = null, gTick = null;
function gameSetup() {
  const sel = $("gPart");
  sel.innerHTML = `<option value="all">Whole essay (${flat.length} sentences)</option>` + E.sections.map((s, i) => `<option value="${i}">${esc(s.head)} (${s.rows.length})</option>`).join("");
  gameReset();
}
function gameQueue() {
  const p = $("gPart").value;
  return flat.filter(f => p === "all" || f.si === Number(p)).map(f => {
    // map pattern character ranges for underline display
    let txt = "", marks = [];
    f.segs.forEach(([t, k]) => { const tt = typeable(t); for (let i = 0; i < tt.length; i++) marks.push(k === "p"); txt += tt; });
    return { text: txt, marks, role: f.role, sec: f.sec };
  });
}
function bestKey() { return K.game + E.no + "-" + $("gPart").value; }
function gameReset() {
  gameStop(true);
  G = { q: gameQueue(), i: 0, on: false, t0: 0, ms: 0, correct: 0, typed: 0, errors: 0, score: 0, peeks: 0, missed: [], sentErr: 0 };
  $("typeBox").value = ""; $("typeBox").disabled = true;
  $("gResult").hidden = true; $("gStart").textContent = "▶ Start";
  const b = load(bestKey(), null);
  $("bestHost").textContent = b ? `Best: ${b.score} pts · ${b.wpm} WPM · ${b.acc}%` : "No best score yet";
  drawTarget(); stats();
}
function gameStop(silent) { if (gTick) { clearInterval(gTick); gTick = null; } if (G) G.on = false; if (!silent) $("gStart").textContent = "▶ Start"; }
function stats() {
  const s = Math.floor((G.on ? Date.now() - G.t0 : G.ms) / 1000);
  $("gTime").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const min = Math.max(1 / 60, s / 60);
  $("gWpm").textContent = G.correct ? Math.round(G.correct / 5 / min) : 0;
  $("gAcc").textContent = `${G.typed ? Math.round((G.typed - G.errors) / G.typed * 100) : 100}%`;
  $("gSent").textContent = `${G.i}/${G.q.length}`;
  $("gScore").textContent = G.score;
  $("gBar").style.width = `${G.i / Math.max(1, G.q.length) * 100}%`;
}
function drawTarget() {
  const cur = G.q[G.i];
  if (!cur) { $("gTarget").innerHTML = ""; $("gRole").textContent = ""; return; }
  $("gRole").textContent = `${cur.sec} · ${cur.role}`;
  const v = $("typeBox").value;
  $("gTarget").innerHTML = [...cur.text].map((ch, i) => {
    const cls = i < v.length ? (v[i] === ch ? "ok" : "bad") : i === v.length ? "cur" : "todo";
    return `<span class="${cls}${cur.marks[i] ? " pp" : ""}">${ch === " " && cls === "bad" ? "␣" : esc(ch)}</span>`;
  }).join("");
  $("gTarget").classList.toggle("blur", $("gBlur").checked && G.on);
}
$("gStart").addEventListener("click", () => {
  if (G.on) { G.ms = Date.now() - G.t0; gameStop(); $("typeBox").disabled = true; $("gStart").textContent = "▶ Resume"; drawTarget(); return; }
  if (G.i >= G.q.length) gameReset();
  G.on = true; G.t0 = Date.now() - G.ms; $("typeBox").disabled = false; $("typeBox").focus();
  $("gStart").textContent = "❚❚ Pause"; gTick = setInterval(stats, 250); drawTarget();
  $("gMsg").textContent = $("gBlur").checked ? "Memory mode: hold Ctrl to peek (each peek costs points). Press Enter to finish a sentence." : "Go! Press Enter to finish a sentence.";
});
$("typeBox").addEventListener("input", ev => {
  if (!G.on) return;
  const cur = G.q[G.i], v = $("typeBox").value.replace(/\n/g, "");
  if (v !== $("typeBox").value) $("typeBox").value = v;
  if (ev.inputType && ev.inputType.startsWith("insert")) {
    const p = v.length - 1;
    G.typed++;
    if (v[p] !== cur.text[p]) { G.errors++; G.sentErr++; }
  }
  drawTarget();
  if (v === cur.text) nextSentence(false);
});
$("typeBox").addEventListener("keydown", ev => {
  if (ev.key === "Enter") { ev.preventDefault(); if (!G.on) return;
    const cur = G.q[G.i], v = $("typeBox").value;
    if (v.length < cur.text.length * 0.8) { $("gMsg").textContent = "Keep going — finish the sentence first."; return; }
    nextSentence(false);
  }
});
function nextSentence(skipped) {
  const cur = G.q[G.i], v = $("typeBox").value;
  let right = 0; for (let i = 0; i < Math.min(v.length, cur.text.length); i++) if (v[i] === cur.text[i]) right++;
  if (skipped) right = 0;
  G.correct += right;
  const acc = right / cur.text.length;
  const mult = $("gBlur").checked ? 2 : 1;
  const pts = Math.round(right * acc * mult);
  G.score += pts;
  if (acc < 1) G.missed.push({ text: cur.text, typed: skipped ? "(skipped)" : v });
  $("gMsg").textContent = skipped ? "Skipped." : acc === 1 ? `✔ Perfect sentence! +${pts}` : `+${pts} · ${Math.round(acc * 100)}% of characters correct`;
  G.i++; G.sentErr = 0; $("typeBox").value = "";
  if (G.i >= G.q.length) return gameEnd();
  drawTarget(); stats();
}
$("gSkip").addEventListener("click", () => { if (G.on && G.q[G.i]) nextSentence(true); });
function gameEnd() {
  G.ms = Date.now() - G.t0; gameStop(); stats(); drawTarget();
  $("typeBox").disabled = true; $("gStart").textContent = "↻ Play again";
  const min = Math.max(1 / 60, G.ms / 60000), wpm = Math.round(G.correct / 5 / min);
  const acc = G.typed ? Math.round((G.typed - G.errors) / G.typed * 100) : 0;
  const stars = acc >= 97 && wpm >= 30 ? "★★★" : acc >= 90 ? "★★☆" : "★☆☆";
  const prev = load(bestKey(), null), isBest = !prev || G.score > prev.score;
  if (isBest) save(bestKey(), { score: G.score, wpm, acc });
  $("gResult").hidden = false;
  $("gResult").innerHTML = `<b style="font-size:20px;color:#0f7c80">${stars} Finished! ${G.score} points${isBest ? " · 🏆 New best!" : ""}</b>
    <p style="margin:6px 0">${wpm} WPM · ${acc}% accuracy · ${$("gTime").textContent} · ${G.q.length - G.missed.length}/${G.q.length} perfect sentences${$("gBlur").checked ? " · memory mode ×2" : ""}</p>
    ${G.missed.length ? `<details><summary>Sentences to practise again (${G.missed.length})</summary><ul style="line-height:1.6">${G.missed.map(m => `<li><b>${esc(m.text)}</b><br><small style="color:#c0392b">You typed: ${esc(m.typed)}</small></li>`).join("")}</ul></details>` : ""}`;
  $("bestHost").textContent = `Best: ${Math.max(G.score, prev ? prev.score : 0)} pts`;
  list();
}
$("gPart").addEventListener("change", gameReset);
$("gBlur").addEventListener("change", () => { drawTarget(); });
document.addEventListener("keydown", ev => { if (ev.key === "Control" && G && G.on && $("gBlur").checked) { $("gTarget").classList.remove("blur"); G.score = Math.max(0, G.score - 5); G.peeks++; stats(); } });
document.addEventListener("keyup", ev => { if (ev.key === "Control" && G && G.on) drawTarget(); });

/* ---------- ④ my essay + FCE check ---------- */
function count() { $("wordCount").textContent = `${W.wordCount($("writeBox").value)} words`; }
$("writeBox").addEventListener("input", () => { save(K.draft + E.no, $("writeBox").value); count(); });
const STOP = new Set("the a an and or to of in on at for is are it they their them what when how much your own idea with from about".split(" "));
function fceCheck(text) {
  const out = [], words = W.wordCount(text);
  const paras = text.split(/\n+/).map(p => p.trim()).filter(Boolean);
  const low = text.toLowerCase();
  const tick = (ok, msg) => out.push(`${ok ? "✅" : "⚠️"} ${msg}`);
  tick(words >= 220 && words <= 260, `Length: ${words} words ${words < 220 ? "— too short, aim for 220–250. 字數不足" : words > 260 ? "— a bit long, aim for 220–250. 字數偏多" : "(target 220–250) 字數合適"}`);
  tick(paras.length >= 5, `Paragraphs: ${paras.length} ${paras.length >= 5 ? "" : "— use 5: introduction, 3 body paragraphs, conclusion. 請分五段（按 Enter 換段）"}`);
  tick(/\b(in my (opinion|view)|from my perspective|i (strongly |firmly )?(believe|think|agree|disagree|feel)|personally)\b/.test(low), "Clear opinion in the introduction 表明立場 (From my perspective, I strongly believe…)");
  E.notes.forEach((n, i) => {
    if (i === 2 && /own idea/i.test(n)) { tick(paras.length >= 5, "Note 3: add your own idea in a third body paragraph 自己的想法"); return; }
    const keys = (n.toLowerCase().match(/[a-z]{4,}/g) || []).filter(w => !STOP.has(w));
    const hit = keys.filter(w => low.includes(w.slice(0, Math.max(4, w.length - 2))));
    tick(hit.length > 0, `Note ${i + 1} “${n}” ${hit.length ? "is covered" : "— not found yet. 提示 " + (i + 1) + " 還沒寫到"}`);
  });
  tick(/\b(in conclusion|to sum up|to conclude|all in all|overall)\b/.test(low), "Conclusion signal 結論 (In conclusion, …)");
  const pats = [...new Set(flat.flatMap(f => f.pats).map(p => p.toLowerCase().replace(/[,.]$/, "")).filter(p => p.length >= 6))];
  const used = pats.filter(p => low.includes(p));
  tick(used.length >= 6, `Sentence patterns from the model: ${used.length} used${used.length ? ` (${used.slice(0, 8).join(" · ")}${used.length > 8 ? " …" : ""})` : ""}${used.length < 6 ? ". Try: " + pats.filter(p => !used.includes(p)).slice(0, 4).join(" · ") : ""}`);
  const linkers = ["first and foremost", "to explain", "for example", "for instance", "as a result", "consequently", "therefore", "thus", "however", "in contrast", "admittedly", "moreover", "furthermore", "what is more", "on the other hand", "finally", "beyond", "similarly"];
  const lk = linkers.filter(l => low.includes(l));
  tick(lk.length >= 5, `Linking words: ${lk.length} different ${lk.length < 5 ? "— vary them: For example, As a result, Therefore, However, Admittedly…" : "👍"}`);
  const contr = text.match(/\b\w+(n't|'re|'ll|'ve|'m|'d)\b/gi) || [];
  tick(!contr.length, contr.length ? `Contractions in a formal essay: ${[...new Set(contr)].slice(0, 5).join(", ")} → write in full (do not, it is…). 正式文體避免縮寫` : "No contractions — good formal style 正式文體");
  const ithink = (low.match(/\bi think\b/g) || []).length;
  if (ithink > 2) tick(false, `“I think” used ${ithink} times — vary: From my perspective / I firmly believe / In my view.`);
  return out;
}
$("reviewButton").addEventListener("click", () => {
  const t = $("writeBox").value;
  W.renderReview($("feedback"), W.review(t, modelText(), "essay", 220));
  if (!t.trim()) return;
  $("feedback").insertAdjacentHTML("beforeend", `<h4 style="margin:14px 0 4px;color:#0f7c80">B2 First checklist FCE 檢核表</h4><ul class="fe-checklist">${fceCheck(t).map(x => `<li>${esc(x)}</li>`).join("")}</ul>`);
});
$("clearButton").addEventListener("click", () => {
  if (!confirm("Clear this essay?")) return;
  $("writeBox").value = ""; try { localStorage.removeItem(K.draft + E.no); } catch {}
  count(); $("feedback").hidden = true;
});
$("aiButton").addEventListener("click", async () => {
  const t = $("writeBox").value.trim();
  if (!t) { $("saveStatus").textContent = "Write your essay first."; return; }
  const prompt = `Please check my Cambridge B2 First (FCE) Writing Part 1 essay.\n\nTask: ${E.topic}\nNotes: 1) ${E.notes[0]} 2) ${E.notes[1]} 3) ${E.notes[2]}\nWrite 220–250 words.\n\nMy essay (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. Grammar, spelling and punctuation corrections with short explanations in Traditional Chinese.\n2. Did I cover both notes and add my own idea? Is my opinion clear and is the essay well organised?\n3. Better B2 linking words, sentence patterns and vocabulary I could use.\n4. An improved B2 version (220–250 words) that keeps my ideas.\n5. A B2 First score estimate (Content, Communicative Achievement, Organisation, Language: 0–5 each).`;
  $("saveStatus").textContent = (await SK.copyText(prompt)) ? "Copied with the task. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your essay manually.";
});
$("searchInput").addEventListener("input", list);

select(Number(location.hash.slice(1)) || 1);
