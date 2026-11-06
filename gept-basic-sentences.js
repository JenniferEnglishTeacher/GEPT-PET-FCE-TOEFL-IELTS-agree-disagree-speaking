/* GEPT Basic writing — sentence practice (Part 1 改寫 · Part 2 合併 · Part 3 重組).
   Each section = one grammar sub-category. Every question: type the full sentence → See Answer → instant ✓/✗.
   Wrong answers must be rewritten correctly before they count as fixed. Progress is saved on this device. */
const DATA = window.GEPT_BASIC_SENTENCES || {};
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const bold = s => esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
const plain = s => String(s).replace(/\*\*/g, "");
const HOW = {
  "1": "依提示把原句改寫成新句子，在框內寫出「完整的句子」(包括提示字與標點)，再按 See Answer。",
  "2": "把兩個句子依提示合併成一句，在框內寫出「完整的句子」(包括提示字與標點)，再按 See Answer。",
  "3": "用所有提示字詞重組成有意義的句子，不可增減字詞。可以點提示字詞放進答案框，寫出「完整的句子」後按 See Answer。"
};
let part = "1", secIndex = 0, sections = [];

/* ---------- progress ---------- */
const KEY = q => `gept-basic-sent:${part}:${q}`;
const getS = q => { try { return localStorage.getItem(KEY(q)) || ""; } catch { return ""; } };
const setS = (q, v) => { try { v ? localStorage.setItem(KEY(q), v) : localStorage.removeItem(KEY(q)); } catch {} };
const qids = set => [set.id, ...set.variants.map((_, k) => set.id + "abc"[k])];

/* ---------- answer checking ---------- */
const CONTR = [[/\bcan't\b/g, "cannot"], [/\bwon't\b/g, "will not"], [/\bshan't\b/g, "shall not"], [/n't\b/g, " not"],
  [/'ll\b/g, " will"], [/'ve\b/g, " have"], [/'re\b/g, " are"], [/\bi'm\b/g, "i am"], [/\bcan not\b/g, "cannot"],
  [/\b(it|that|what|there|he|she|who|where|here)'s\b/g, "$1 is"], [/'d\b/g, " would"]];
function norm(s, loose) {
  let t = plain(s).replace(/[‘’`´]/g, "'").replace(/[“”]/g, '"').replace(/＿+|_+/g, " ").replace(/\s+/g, " ").trim();
  t = t.replace(/\s+([,.?!;:])/g, "$1").replace(/\(\s+/g, "(");
  if (!loose) return t;
  t = t.toLowerCase();
  CONTR.forEach(([re, r]) => { t = t.replace(re, r); });
  t = t.replace(/\bnt\$\s*/g, "nt$").replace(/[.?!]+$/, "").replace(/\s+/g, " ").trim();
  return t;
}
function check(input, answer) {
  const a = norm(input, false), b = norm(answer, false);
  if (!a) return { ok: false, empty: true };
  if (a === b) return { ok: true };
  if (norm(input, true) === norm(answer, true)) {
    const notes = [];
    if (a.replace(/[.?!]+$/, "") !== b.replace(/[.?!]+$/, "") && a.toLowerCase() === b.toLowerCase()) notes.push("大小寫 capital letters");
    if ((a.match(/[.?!]$/) || [""])[0] !== (b.match(/[.?!]$/) || [""])[0]) notes.push("句尾標點 end punctuation");
    if (!notes.length) notes.push("縮寫形式 contractions (both are OK)");
    return { ok: true, note: notes.join("、") };
  }
  return { ok: false };
}
/* word-level diff: what to remove (red) / what to add (green) */
function diff(user, model) {
  const A = norm(user, false).split(" "), B = norm(model, false).split(" ");
  const n = A.length, m = B.length, L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  const eq = (x, y) => x.toLowerCase().replace(/[.,?!]$/, "") === y.toLowerCase().replace(/[.,?!]$/, "");
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = eq(A[i], B[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const out = []; let i = 0, j = 0;
  while (i < n && j < m) {
    if (eq(A[i], B[j])) { out.push(esc(B[j])); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) out.push(`<del>${esc(A[i++])}</del>`);
    else out.push(`<ins>${esc(B[j++])}</ins>`);
  }
  while (i < n) out.push(`<del>${esc(A[i++])}</del>`);
  while (j < m) out.push(`<ins>${esc(B[j++])}</ins>`);
  return out.join(" ");
}

/* ---------- sections (sub-categories) ---------- */
function buildSections() {
  sections = [];
  (DATA[part]?.blocks || []).forEach((b, bi) => b.subs.forEach(s => sections.push({ block: b.name, bi, name: s.name, sets: s.sets })));
}
const secDone = sec => sec.sets.reduce((n, set) => n + qids(set).filter(q => getS(q)).length, 0);
const secTotal = sec => sec.sets.length * 4;

function sidebar() {
  const term = $("searchInput").value.trim().toLowerCase();
  const box = $("blockList"); box.innerHTML = "";
  let lastBlock = null, shown = 0;
  sections.forEach((sec, i) => {
    if (term) {
      const hay = `${sec.block} ${sec.name} ${sec.sets.map(s => JSON.stringify(s)).join(" ")}`.toLowerCase();
      if (!hay.includes(term)) return;
    }
    if (sec.block !== lastBlock) {
      const h = document.createElement("div"); h.className = "bs-block"; h.textContent = `${sec.bi + 1}｜${sec.block}`; box.appendChild(h); lastBlock = sec.block;
    }
    const done = secDone(sec), total = secTotal(sec);
    const b = document.createElement("button"); b.type = "button"; b.className = `bs-sub${i === secIndex ? " active" : ""}`;
    b.innerHTML = `<span>${esc(sec.name)}</span><small class="${done === total ? "done" : ""}">${done === total ? "✓ " : ""}${done}/${total}</small>`;
    b.addEventListener("click", () => { secIndex = i; render(); window.scrollTo({ top: 0, behavior: "smooth" }); });
    box.appendChild(b); shown++;
  });
  $("countPill").textContent = sections.reduce((n, s) => n + s.sets.length * 4, 0);
  if (!shown) box.innerHTML = `<p class="bs-note" style="padding:8px">No match.</p>`;
}

function blankify(stem) { return esc(stem).replace(/_{3,}|＿+/g, '<span class="blank"></span>'); }
function questionHTML(q) {
  if (part === "1") return `<div class="bs-q">${esc(q.orig)}<br><span class="stem">→ ${blankify(q.stem)}</span></div>`;
  if (part === "2") return `<div class="bs-q">${q.sents.map(esc).join("<br>")}<br><span class="stem">→ ${blankify(q.stem)}</span></div>`;
  return `<div class="bs-q"><span class="stem">${blankify(q.stem)}</span></div>
    <div class="bs-chunks">${q.chunks.map(c => `<button type="button" class="bs-chunk">${esc(c)}</button>`).join("")}</div>`;
}
/* reorder: start the answer box with the stem words so students only arrange the chunks */
function starter(q) {
  if (part !== "3") return "";
  const before = q.stem.split(/_{3,}|＿+/)[0].trim();
  return before ? before + " " : "";
}

function card(set, qid, q, ans, label, isVar) {
  const el = document.createElement("div"); el.className = "bs-card"; el.dataset.q = qid;
  const st = getS(qid);
  el.innerHTML = `
    <div><span class="bs-tag${isVar ? " var" : ""}">${label}</span>${isVar ? `<span class="bs-note">${esc(q.tag || "類似題")}</span>` : `<span class="bs-note">${esc(set.src)}</span>`}
      <span class="bs-status"></span></div>
    ${questionHTML(q)}
    <div class="bs-answer-row">
      <textarea class="bs-input" rows="1" spellcheck="false" placeholder="Write the complete sentence 寫出完整句子"></textarea>
      <button type="button" class="small-button primary-action see">See Answer</button>
    </div>
    <div class="bs-result" hidden></div>
    <div class="bs-retry" hidden><label>✍️ 再寫一次正確答案 Write the correct answer again:</label>
      <div class="bs-answer-row"><textarea class="bs-input retry" rows="1" spellcheck="false"></textarea>
      <button type="button" class="small-button again">Check</button></div></div>
    <div class="bs-expl" hidden>${set.expl.map(bold).join("<br>")}</div>`;
  const input = el.querySelector(".bs-input"), result = el.querySelector(".bs-result"), retry = el.querySelector(".bs-retry"),
    retryInput = el.querySelector(".retry"), status = el.querySelector(".bs-status"), expl = el.querySelector(".bs-expl");
  input.value = starter(q);
  const showStatus = s => {
    status.className = `bs-status ${s === "ok" ? "ok" : s === "wrong" ? "bad" : s === "fixed" ? "fixed" : ""}`;
    status.textContent = s === "ok" ? " ✓ 答對" : s === "wrong" ? " ✗ 待訂正" : s === "fixed" ? " ✓ 已訂正" : "";
  };
  showStatus(st);
  const grow = t => { t.style.height = "auto"; t.style.height = Math.max(44, t.scrollHeight + 2) + "px"; };
  [input, retryInput].forEach(t => t.addEventListener("input", () => grow(t)));
  const see = () => {
    const r = check(input.value, ans);
    if (r.empty) { input.focus(); input.placeholder = "Please write your answer first 請先作答"; return; }
    result.hidden = false; expl.hidden = false;
    input.classList.toggle("ok", r.ok); input.classList.toggle("bad", !r.ok);
    if (r.ok) {
      result.className = "bs-result ok";
      result.innerHTML = `<span class="verdict">✓ Correct! 答對了</span>${r.note ? ` <span class="bs-note">(注意 ${esc(r.note)})</span>` : ""}<span class="bs-model">${bold(ans)}</span>`;
      retry.hidden = true;
      if (getS(qid) !== "fixed") { setS(qid, "ok"); showStatus("ok"); }
    } else {
      result.className = "bs-result bad";
      result.innerHTML = `<span class="verdict">✗ Not quite. 答錯了</span>
        <span class="bs-model">正確答案：${bold(ans)}</span>
        <span class="bs-model bs-diff bs-note">你的答案修改：${diff(input.value, ans)}</span>`;
      retry.hidden = false; retryInput.value = ""; retryInput.classList.remove("ok", "bad"); retryInput.focus();
      setS(qid, "wrong"); showStatus("wrong");
    }
    refresh();
  };
  el.querySelector(".see").addEventListener("click", see);
  input.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); see(); } });
  const again = () => {
    const r = check(retryInput.value, ans);
    if (r.empty) return;
    retryInput.classList.toggle("ok", r.ok); retryInput.classList.toggle("bad", !r.ok);
    if (r.ok) { setS(qid, "fixed"); showStatus("fixed"); retry.querySelector("label").textContent = "✓ 訂正完成！Well done."; retry.querySelector("label").style.color = "var(--good)"; refresh(); }
    else retry.querySelector("label").textContent = "✗ 還不對，看清楚正確答案再寫一次 Try again:";
  };
  el.querySelector(".again").addEventListener("click", again);
  retryInput.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); again(); } });
  if (part === "3") {
    el.querySelectorAll(".bs-chunk").forEach(b => b.addEventListener("click", () => {
      const v = input.value.replace(/\s+$/, "");
      input.value = (v ? v + " " : "") + b.textContent + " "; b.classList.add("used"); grow(input); input.focus();
    }));
    input.addEventListener("input", () => { if (input.value.trim() === starter(q).trim()) el.querySelectorAll(".bs-chunk").forEach(b => b.classList.remove("used")); });
  }
  return el;
}

function render() {
  const sec = sections[secIndex]; if (!sec) return;
  $("partTitle").textContent = DATA[part].title;
  $("subMeta").textContent = `${DATA[part].title} · ${sec.bi + 1}｜${sec.block}`;
  $("subTitle").textContent = sec.name;
  $("howTo").textContent = HOW[part] + "\n答錯的題目要把正確答案再寫一次才算訂正完成。(Enter = See Answer)";
  const host = $("questionHost"); host.innerHTML = "";
  sec.sets.forEach((set, si) => {
    const box = document.createElement("section"); box.className = "bs-set";
    box.innerHTML = `<div class="bs-set-head"><b>Set ${si + 1}</b><button type="button" class="small-button tip">解析 Grammar tip</button></div>`;
    const tip = document.createElement("div"); tip.className = "bs-expl"; tip.hidden = true; tip.innerHTML = set.expl.map(bold).join("<br>");
    box.querySelector(".tip").addEventListener("click", () => { tip.hidden = !tip.hidden; });
    box.appendChild(tip);
    box.appendChild(card(set, set.id, set.q, set.ans, "原題", false));
    set.variants.forEach((v, k) => box.appendChild(card(set, set.id + "abc"[k], v, v.ans, `類似題 ${"abc"[k]}`, true)));
    host.appendChild(box);
  });
  $("prevButton").disabled = secIndex === 0;
  $("nextButton").disabled = secIndex === sections.length - 1;
  refresh();
  try { history.replaceState(null, "", `?part=${part}#${secIndex + 1}`); } catch {}
}
function refresh() {
  const sec = sections[secIndex]; if (!sec) return;
  const done = secDone(sec), total = secTotal(sec);
  const wrong = sec.sets.reduce((n, set) => n + qids(set).filter(q => getS(q) === "wrong").length, 0);
  $("progressBar").style.width = `${Math.round(done / total * 100)}%`;
  $("progressText").textContent = `${done}/${total} answered${wrong ? ` · ${wrong} to fix 待訂正` : ""}`;
  sidebar();
}

function setPart(p, sec = 0) {
  part = DATA[p] ? p : "1";
  document.querySelectorAll("[data-part]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.part === part)));
  buildSections(); secIndex = Math.min(Math.max(0, sec), sections.length - 1); render();
}
document.querySelectorAll("[data-part]").forEach(b => b.addEventListener("click", () => setPart(b.dataset.part)));
$("searchInput").addEventListener("input", sidebar);
$("prevButton").addEventListener("click", () => { if (secIndex > 0) { secIndex--; render(); window.scrollTo({ top: 0 }); } });
$("nextButton").addEventListener("click", () => { if (secIndex < sections.length - 1) { secIndex++; render(); window.scrollTo({ top: 0 }); } });
$("resetButton").addEventListener("click", () => {
  if (!confirm("Clear your answers for this section? 清除本節作答紀錄？")) return;
  sections[secIndex].sets.forEach(set => qids(set).forEach(q => setS(q, ""))); render();
});

const params = new URLSearchParams(location.search);
setPart(params.get("part") || "1", (Number(location.hash.slice(1)) || 1) - 1);
