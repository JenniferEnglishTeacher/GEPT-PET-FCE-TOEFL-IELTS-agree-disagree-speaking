/* GEPT Intermediate Writing — 10 translations (one Chinese sentence at a time, instant feedback)
   + 10 guided essays (3-column grid: structure & key words | my sentence | sample with bold patterns).
   Data: gept-int-data.js (prompts) + gept-int-writing-data.js (GEPT_TR, GEPT_ES). Uses writing-kit.js + speaking-kit.js. */
const W = window.WritingKit;
const UNITS = typeof GEPT_UNITS !== "undefined" ? GEPT_UNITS : [];
const TR = window.GEPT_TR || {}, ES = window.GEPT_ES || {};
const $ = id => document.getElementById(id);
const esc = W.esc;
const bold = s => esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
const plain = s => String(s).replace(/\*\*/g, "");
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const TRKEY = "gept-int-tr-", ROWKEY = "gept-int-es-rows-", DRAFT = "gept-int-es-draft-";

const tasks = [];
UNITS.forEach(u => {
  if (TR[u.id]) tasks.push({ id: `tr-${u.id}`, kind: "translation", unit: u.id, theme: u.theme, prompt: u.translation.prompt });
  if (ES[u.id]) tasks.push({ id: `es-${u.id}`, kind: "essay", unit: u.id, theme: u.theme, prompt: u.essay.prompt });
});
const INFO = {
  translation: { title: "Chinese → English Translation 中譯英", sub: "One sentence at a time: translate the highlighted Chinese sentence, press Check, fix it, then go to the next one. Keep every detail and use the correct tense. 一句一句翻，每句都有立即回饋。" },
  essay: { title: "Guided Essay 英文作文", sub: "Answer both questions — one paragraph for each. Use the grid to build your essay row by row, then join it and polish it. Aim for about 120–150 words." }
};

const tabs = [...document.querySelectorAll("[data-kind]")];
let kind = "all", task = tasks[0], timerApi = null, stopListen = null;

/* ------------------------------------------------------------ sidebar */
function progress(t) {
  if (t.kind === "translation") {
    const st = load(TRKEY + t.unit, {}).st || [];
    const ok = st.filter(x => x === "ok").length;
    return ok ? ` · ✓ ${ok}/${TR[t.unit].length}` : "";
  }
  const n = load(ROWKEY + t.unit, []).filter(x => x && x.trim()).length;
  return n ? ` · ✎ ${n}/${ES[t.unit].flat().length}` : "";
}
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
    b.innerHTML = `<span class="question-id">${t.kind === "translation" ? "譯" : "寫"}</span><span class="question-label">${t.kind === "translation" ? "Translation 中譯英" : "Essay 英文作文"} · Unit ${t.unit}<small style="color:var(--muted)">${progress(t)}</small></span>`;
    b.addEventListener("click", () => select(t.id));
    box.appendChild(b);
  });
}

function stopAudio() {
  if (stopListen) { stopListen(); stopListen = null; }
  try { speechSynthesis.cancel(); } catch {}
  $("trListen").innerHTML = "&#128264; Listen"; $("esListen").innerHTML = "&#128264; Listen";
}

function select(id) {
  stopAudio();
  task = tasks.find(t => t.id === id) || tasks[0];
  const info = INFO[task.kind];
  $("taskMeta").textContent = `Unit ${task.unit} · ${task.theme}`;
  $("taskTitle").textContent = info.title;
  $("taskSub").textContent = info.sub;
  $("trView").hidden = task.kind !== "translation";
  $("esView").hidden = task.kind !== "essay";
  if (timerApi) timerApi.stop();
  if (task.kind === "translation") openTranslation(); else openEssay();
  list();
  try { history.replaceState(null, "", `#${task.id}`); } catch {}
}

/* ------------------------------------------------------------ translation */
let sents = [], cur = 0, state = null, hintN = 0;
const PAST = /\b\w+ed\b|\b(was|were|had|did|went|got|made|saw|said|took|came|ran|bought|felt|thought|told|gave|found|knew|left|met|sat|ate|drank|caught|chose|became|began|brought|kept|fed|grew|could|would|couldn't|wouldn't|didn't|wasn't|weren't|hadn't|spent|stood|won|lost|slept|woke|put|set|rode|wrote|sang|swam|forgot|paid|sold|heard|meant|taught)\b/i;

function trSave() { save(TRKEY + task.unit, state); }

function openTranslation() {
  sents = TR[task.unit];
  state = Object.assign({ a: [], st: [], tr: [] }, load(TRKEY + task.unit, {}));
  const first = sents.findIndex((_, i) => state.st[i] !== "ok");
  cur = first < 0 ? 0 : first;
  timerApi = W.timer($("trTimerHost"), { minutes: [10, 15, 20], start: 15, onEnd: () => { $("trStatus").textContent = "⏰ Time is up! Finish this sentence, then check the whole passage."; } });
  $("trSample").hidden = true; $("trFull").textContent = "Show full sample";
  $("trSample").innerHTML = sents.map(s => bold(s.en)).join(" ");
  showSentence(cur);
  renderAll();
}

function renderPassage() {
  $("trPassage").innerHTML = sents.map((s, i) => `<span class="tr-s${i === cur ? " on" : ""}${state.st[i] ? " " + state.st[i] : ""}" data-i="${i}" title="Sentence ${i + 1}">${esc(s.zh)}</span>`).join("");
  $("trPassage").querySelectorAll(".tr-s").forEach(el => el.addEventListener("click", () => showSentence(Number(el.dataset.i))));
  $("trDots").innerHTML = sents.map((_, i) => `<button type="button" class="${i === cur ? "on " : ""}${state.st[i] || ""}" data-i="${i}" aria-label="Sentence ${i + 1}">${i + 1}</button>`).join("")
    + `<span class="kbd" style="margin-left:6px">${state.st.filter(x => x === "ok").length} / ${sents.length} done 完成</span>`;
  $("trDots").querySelectorAll("button").forEach(b => b.addEventListener("click", () => showSentence(Number(b.dataset.i))));
}

function showSentence(i) {
  try { speechSynthesis.cancel(); } catch {}
  cur = Math.max(0, Math.min(sents.length - 1, i)); hintN = 0;
  const s = sents[cur];
  $("trZh").innerHTML = `<small>Sentence ${cur + 1} of ${sents.length} 第 ${cur + 1} 句</small>${esc(s.zh)}`;
  $("trInput").value = state.a[cur] || "";
  $("trHints").hidden = true; $("trHints").innerHTML = "";
  $("trFb").hidden = true;
  if (state.st[cur] && state.a[cur]) feedback(check(s, state.a[cur]), state.st[cur] === "ok" || (state.tr[cur] || 0) >= 2);
  $("trPrev").disabled = cur === 0;
  $("trNext").textContent = cur === sents.length - 1 ? "Finish ✓" : "Next sentence →";
  countSentence();
  renderPassage();
  $("trInput").focus({ preventScroll: true });
}

function check(s, raw) {
  const text = String(raw).replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
  const keys = s.k.map(([re, hint]) => ({ ok: new RegExp(re, "i").test(text), hint }));
  const warn = [];
  if (/[一-鿿]/.test(text)) warn.push("還有中文字 — 請全部寫成英文。 There are still Chinese characters.");
  (s.b || []).forEach(([re, tip]) => { if (new RegExp(re, "i").test(text)) warn.push(tip); });
  if (s.t === "past" && !PAST.test(text)) warn.push("這件事已經發生了 — 動詞要用過去式 (went, was, -ed…)。 Use the past tense.");
  if (/(^|\s)i(\s|')/.test(text)) warn.push("「我」永遠大寫：I");
  if (/^[a-z]/.test(text)) warn.push("句子開頭要大寫。 Start with a capital letter.");
  if (!/[.!?]["']?$/.test(text)) warn.push("句尾要加標點 ( . ! ? )。 End with punctuation.");
  const mw = W.wordCount(plain(s.en)), uw = W.wordCount(text);
  if (uw < mw * 0.5) warn.push(`句子可能太短（${uw} 字 / 參考答案約 ${mw} 字）— 有沒有漏掉資訊？`);
  const hit = keys.filter(k => k.ok).length;
  return { keys, warn, hit, total: keys.length, pass: hit === keys.length && !warn.length };
}

function feedback(r, reveal) {
  const s = sents[cur], pct = Math.round(100 * r.hit / r.total);
  const cls = pct >= 85 ? "" : pct >= 55 ? "mid" : "low";
  const head = r.pass ? "Excellent! 全對，很棒！" : r.hit === r.total ? "Key points all there — fix the notes below. 重點都有，再修正下面的提醒。" : "Not yet — check the red points, edit, and press Check again. 看紅色提示，修改後再按一次檢查。";
  const missing = r.keys.filter(k => !k.ok), got = r.keys.filter(k => k.ok);
  $("trFb").hidden = false;
  $("trFb").innerHTML = `<div class="tr-score"><span class="score ${cls}">${r.hit}/${r.total}</span><span>${head}</span></div>
    <ul class="tr-keys">
      ${missing.map(k => `<li class="n">✗ ${esc(k.hint)}</li>`).join("")}
      ${r.warn.map(w => `<li class="w">⚠ ${esc(w)}</li>`).join("")}
      ${got.map(k => `<li class="y">✓ ${esc(k.hint.split("→")[0].trim())}</li>`).join("")}
    </ul>
    ${reveal ? `<div class="tr-model"><b style="font-size:13px;color:#0f7c80">參考答案 Model sentence</b> <button type="button" class="small-button" id="trSay" style="padding:2px 10px;margin-left:6px">&#128264;</button><br>${bold(s.en)}</div>`
             : `<p class="kbd" style="margin:10px 0 0">Try once more — the model sentence appears after your 2nd check (or press “Show answer”). 再試一次，第二次檢查後會出現參考答案。</p>`}
    ${r.pass && cur < sents.length - 1 ? `<div class="sw-actions"><button type="button" class="small-button primary-action" id="trGo">Next sentence →</button></div>` : ""}`;
  const say = $("trSay"); if (say) say.addEventListener("click", () => SpeakingKit.speak(plain(s.en), 0.9));
  const go = $("trGo"); if (go) go.addEventListener("click", () => showSentence(cur + 1));
}

function runCheck() {
  const text = $("trInput").value.trim();
  if (!text) { $("trFb").hidden = false; $("trFb").innerHTML = "<p style='margin:0'>Write this sentence in English first. 請先寫這一句。</p>"; return; }
  const r = check(sents[cur], text);
  state.a[cur] = $("trInput").value;
  state.tr[cur] = (state.tr[cur] || 0) + 1;
  state.st[cur] = r.pass ? "ok" : "part";
  trSave();
  feedback(r, r.pass || state.tr[cur] >= 2);
  renderPassage(); renderAll(); list();
}

function countSentence() { $("trCount").textContent = `${W.wordCount($("trInput").value)} words · model ≈ ${W.wordCount(plain(sents[cur].en))}`; }
function renderAll() {
  $("trAll").innerHTML = sents.map((s, i) => state.a[i] && state.a[i].trim() ? esc(state.a[i].trim()) : `<span class="gap">（第 ${i + 1} 句還沒寫）</span>`).join(" ");
  const full = joined();
  $("trWords").textContent = `(${W.wordCount(full)} words · target 45+)`;
}
const joined = () => sents.map((_, i) => (state.a[i] || "").trim()).filter(Boolean).join(" ");

$("trInput").addEventListener("input", () => { state.a[cur] = $("trInput").value; if (state.st[cur] === "ok") state.st[cur] = "part"; trSave(); countSentence(); renderAll(); });
$("trInput").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); runCheck(); } });
$("trCheck").addEventListener("click", runCheck);
$("trShow").addEventListener("click", () => {
  const text = $("trInput").value.trim();
  state.tr[cur] = Math.max(2, state.tr[cur] || 0); trSave();
  if (text) feedback(check(sents[cur], text), true);
  else { $("trFb").hidden = false; $("trFb").innerHTML = `<div class="tr-model"><b style="font-size:13px;color:#0f7c80">參考答案 Model sentence</b><br>${bold(sents[cur].en)}</div><p class="kbd" style="margin:8px 0 0">Now cover it and write it yourself! 現在自己寫一次。</p>`; }
});
$("trHintBtn").addEventListener("click", () => {
  const s = sents[cur], text = $("trInput").value.replace(/[’‘]/g, "'");
  const todo = s.k.filter(([re]) => !new RegExp(re, "i").test(text));
  const pool = todo.length ? todo : s.k;
  hintN = Math.min(pool.length, hintN + 1);
  $("trHints").hidden = false;
  $("trHints").innerHTML = `<span style="background:none;border:none;padding-left:0"><b>💡 ${todo.length ? "Still missing 還缺" : "Key points 重點"}:</b></span>` + pool.slice(0, hintN).map(([, h]) => `<span>${esc(h)}</span>`).join("")
    + (hintN < pool.length ? `<span style="background:none;border:none;color:var(--muted)">(${pool.length - hintN} more — click Hint again)</span>` : "");
});
$("trPrev").addEventListener("click", () => showSentence(cur - 1));
$("trNext").addEventListener("click", () => {
  if (cur < sents.length - 1) return showSentence(cur + 1);
  const left = sents.map((_, i) => i).filter(i => state.st[i] !== "ok");
  $("trStatus").textContent = left.length ? `Almost! Sentences ${left.map(i => i + 1).join(", ")} still need work. 還有第 ${left.map(i => i + 1).join("、")} 句要修改。` : "🎉 All sentences done! Read your whole translation below, then compare with the full sample.";
  $("trAll").scrollIntoView({ behavior: "smooth", block: "center" });
});
$("trFull").addEventListener("click", () => { const s = $("trSample"); s.hidden = !s.hidden; $("trFull").textContent = s.hidden ? "Show full sample" : "Hide full sample"; });
$("trListen").addEventListener("click", () => {
  if (stopListen) { stopAudio(); return; }
  const host = $("trSample"); host.hidden = false; $("trFull").textContent = "Hide full sample";
  host.innerHTML = ""; const spans = [];
  SpeakingKit.wordSpans(host, sents.map(s => plain(s.en)).join(" "), spans);
  $("trListen").textContent = "■ Stop";
  stopListen = SpeakingKit.listenAlong(spans, 0.9, () => { stopListen = null; $("trListen").innerHTML = "&#128264; Listen"; host.innerHTML = sents.map(s => bold(s.en)).join(" "); });
});
$("trReset").addEventListener("click", () => {
  if (!confirm("Delete all your sentences for this passage and start over? 確定要清除這篇的所有句子？")) return;
  state = { a: [], st: [], tr: [] }; trSave(); showSentence(0); renderAll(); list();
});
$("trAI").addEventListener("click", async () => {
  const t = joined();
  if (!t) { $("trStatus").textContent = "Translate some sentences first."; return; }
  const pairs = sents.map((s, i) => `${i + 1}. ${s.zh}\n   → ${(state.a[i] || "(not written)").trim()}`).join("\n");
  const prompt = `Please check my GEPT Intermediate (CEFR B1) Chinese-to-English translation, sentence by sentence.\n\n${pairs}\n\nMy whole translation (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. For each sentence: grammar, tense and word-choice mistakes, with short explanations in Traditional Chinese.\n2. Any missing or wrong information.\n3. A corrected version of the whole passage that stays close to my wording.\n4. A GEPT translation score estimate (0–5) with one reason.`;
  $("trStatus").textContent = (await SpeakingKit.copyText(prompt)) ? "Copied with the Chinese passage. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your translation manually.";
});

/* ------------------------------------------------------------ essay grid */
let rowsFlat = [], esSpans = [];
const esText = u => ES[u].map(p => p.map(r => plain(r[3])).join(" ")).join("\n\n");

function openEssay() {
  const paras = ES[task.unit];
  rowsFlat = paras.flat();
  $("esPrompt").textContent = task.prompt;
  const saved = load(ROWKEY + task.unit, []);
  let i = 0, html = "";
  paras.forEach((p, pi) => {
    html += `<tr class="para"><td colspan="3">Paragraph ${pi + 1} 第${"一二三四"[pi]}段</td></tr>`;
    p.forEach(r => {
      html += `<tr><td><b>${esc(r[0])}</b><small>${esc(r[1])}</small><i>🔑 ${esc(r[2])}</i></td>
        <td><textarea data-row="${i}" aria-label="${esc(r[0])} — my sentence" placeholder="${esc(r[0])}…">${esc(saved[i] || "")}</textarea></td>
        <td>${bold(r[3])}</td></tr>`;
      i++;
    });
  });
  $("esGrid").querySelector("tbody").innerHTML = html;
  $("esGrid").querySelectorAll("textarea").forEach(t => t.addEventListener("input", () => {
    save(ROWKEY + task.unit, [...$("esGrid").querySelectorAll("textarea")].map(x => x.value)); list();
  }));
  const host = $("esSample"); host.innerHTML = ""; esSpans = [];
  paras.forEach(p => { const el = document.createElement("p"); el.className = "sw-essay"; el.style.margin = "0 0 12px"; SpeakingKit.wordSpans(el, p.map(r => plain(r[3])).join(" "), esSpans); host.appendChild(el); });
  host.hidden = true; $("esShow").textContent = "Show";
  $("esWordsSample").textContent = `(${W.wordCount(esText(task.unit))} words)`;
  timerApi = W.timer($("esTimerHost"), { minutes: [20, 25, 30, 40], start: 25, onEnd: () => { $("esStatus").textContent = "⏰ Time is up! Finish your sentence and check your writing."; } });
  $("esWrite").value = localStorage.getItem(DRAFT + task.unit) || "";
  esCount(); $("esFeedback").hidden = true;
}
function esCount() { $("esCount").textContent = `${W.wordCount($("esWrite").value)} words · target 120+`; }

$("esBuild").addEventListener("click", () => {
  const vals = [...$("esGrid").querySelectorAll("textarea")].map(t => t.value.trim());
  let i = 0;
  const text = ES[task.unit].map(p => p.map(() => vals[i++]).filter(Boolean).join(" ")).filter(Boolean).join("\n\n");
  if (!text) { $("esStatus").textContent = "Write some sentences in column 2 first. 請先在第二欄寫句子。"; return; }
  if ($("esWrite").value.trim() && !confirm("Replace the essay below with your grid sentences?")) return;
  $("esWrite").value = text; try { localStorage.setItem(DRAFT + task.unit, text); } catch {}
  esCount();
  $("esStatus").textContent = `Joined ${vals.filter(Boolean).length}/${vals.length} rows into ${ES[task.unit].length} paragraphs. Now polish it below.`;
  $("esWrite").scrollIntoView({ behavior: "smooth", block: "center" });
});
$("esWrite").addEventListener("input", () => { try { localStorage.setItem(DRAFT + task.unit, $("esWrite").value); } catch {} esCount(); });
$("esReview").addEventListener("click", () => W.renderReview($("esFeedback"), W.review($("esWrite").value, esText(task.unit), "essay", 120)));
$("esCol3").addEventListener("click", () => { const g = $("esGrid"); g.classList.toggle("hide-col3"); $("esCol3").textContent = g.classList.contains("hide-col3") ? "Show Column 3" : "Hide Column 3"; });
$("esHints").addEventListener("click", () => { const g = $("esGrid"); g.classList.toggle("hide-hints"); $("esHints").textContent = g.classList.contains("hide-hints") ? "Show key words" : "Hide key words"; });
$("esShow").addEventListener("click", () => { const h = $("esSample"); h.hidden = !h.hidden; $("esShow").textContent = h.hidden ? "Show" : "Hide"; });
$("esListen").addEventListener("click", () => {
  if (stopListen) { stopAudio(); return; }
  $("esSample").hidden = false; $("esShow").textContent = "Hide"; $("esListen").textContent = "■ Stop";
  stopListen = SpeakingKit.listenAlong(esSpans, 0.9, () => { stopListen = null; $("esListen").innerHTML = "&#128264; Listen"; });
});
$("esClear").addEventListener("click", () => {
  if (!confirm("Clear this essay AND your grid sentences for this unit?")) return;
  $("esWrite").value = ""; try { localStorage.removeItem(DRAFT + task.unit); localStorage.removeItem(ROWKEY + task.unit); } catch {}
  $("esGrid").querySelectorAll("textarea").forEach(t => { t.value = ""; });
  esCount(); $("esFeedback").hidden = true; list();
});
$("esAI").addEventListener("click", async () => {
  const t = $("esWrite").value.trim();
  if (!t) { $("esStatus").textContent = "Write your essay first."; return; }
  const prompt = `Please check my GEPT Intermediate (CEFR B1) essay.\n\nPrompt:\n${task.prompt}\n\nMy essay (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. Grammar and word-choice corrections with short explanations in Traditional Chinese.\n2. Comments on content and organisation (did I answer both questions, one paragraph each?).\n3. An improved version that keeps my ideas (B1 level).\n4. A GEPT score estimate (0–5) with one reason.`;
  $("esStatus").textContent = (await SpeakingKit.copyText(prompt)) ? "Copied with the prompt. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your essay manually.";
});

tabs.forEach(b => b.addEventListener("click", () => { kind = b.dataset.kind; tabs.forEach(x => x.setAttribute("aria-pressed", String(x === b))); list(); }));
$("searchInput").addEventListener("input", list);

select((tasks.find(t => t.id === location.hash.slice(1)) || tasks[0]).id);
