/* KET / PET / FCE email & letter writing — phrase bank, formal/informal game, 10 guided tasks, real-email reading.
   Uses email-writing-data.js, speaking-kit.js (speech), writing-kit.js (timer, word count, grammar checks). */
const W = window.WritingKit, SK = window.SpeakingKit;
const BANK = window.EMAIL_BANK || [], TASKS = window.EMAIL_TASKS || [], REAL = window.EMAIL_REAL, STEPS = window.EMAIL_STEPS || [];
const esc = W.esc;
const $ = id => document.getElementById(id);
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  del: k => { try { localStorage.removeItem(k); } catch {} }
};
const plain = h => String(h).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const TONE = { formal: "Formal 正式", informal: "Informal 非正式", semi: "Neutral 中性" };
const TARGETS = [
  { id: "note", label: "Short note 50–75", min: 50, max: 75 },
  { id: "pet", label: "PET Part 1 · ~100", min: 80, max: 120 },
  { id: "fce", label: "FCE Part 2 · 140–190", min: 140, max: 190 }
];

/* ---------- navigation ---------- */
const NAV = [
  { id: "guide", kind: "start", group: "Start Here 從這裡開始", icon: "1", label: "How to Build an Email 書信結構", search: "structure steps formal informal guide 結構" },
  { id: "game", kind: "start", group: "Start Here 從這裡開始", icon: "?", label: "Game: Formal or Informal? 正式還是非正式", search: "game quiz formal informal 遊戲" },
  ...BANK.map(s => ({ id: `bank-${s.id}`, kind: "bank", group: { Start: "Phrase Bank · Opening 開頭", Purpose: "Phrase Bank · Purpose 寫信目的", End: "Phrase Bank · Ending 結尾" }[s.group],
    icon: s.num || (s.group === "Start" ? "A" : "Z"), label: `${s.en} ${s.zh}`, search: JSON.stringify(s) })),
  ...TASKS.map(t => ({ id: t.id, kind: "task", group: "PET / FCE Writing Tasks 寫作練習", icon: t.n, label: `${t.en} ${t.zh}`, search: `${t.en} ${t.zh} ${t.prompt} ${t.to}` })),
  { id: REAL.id, kind: "task", group: "Real-world Email 真實郵件", icon: "✉", label: `${REAL.title.replace("Real Email: ", "")} ${REAL.zh}`, search: `${REAL.title} ${REAL.zh} disney booking hotel` }
];
let kind = "all", current = null, cleanup = [];

function renderNav() {
  const term = $("searchInput").value.trim().toLowerCase();
  const shown = NAV.filter(n => (kind === "all" || n.kind === kind || (kind === "bank" && n.id === "game")) && (!term || `${n.label} ${n.search}`.toLowerCase().includes(term)));
  $("countPill").textContent = shown.length;
  const box = $("navList"); box.innerHTML = "";
  let last = null;
  shown.forEach(n => {
    if (n.group !== last) { const g = document.createElement("div"); g.className = "sw-group"; g.textContent = n.group; box.appendChild(g); last = n.group; }
    const b = document.createElement("button"); b.type = "button";
    b.className = `question-item${current === n.id ? " active" : ""}`;
    b.innerHTML = `<span class="question-id">${esc(n.icon)}</span><span class="question-label">${esc(n.label)}</span>`;
    b.addEventListener("click", () => go(n.id, true));
    box.appendChild(b);
  });
  if (!shown.length) box.innerHTML = `<p class="em-note" style="padding:8px">No match. 找不到。</p>`;
}

function go(id, focus) {
  cleanup.forEach(f => { try { f(); } catch {} }); cleanup = [];
  if (SK) SK.stopSpeech();
  if (!NAV.some(n => n.id === id)) id = "guide";
  current = id;
  const v = $("view"); v.innerHTML = "";
  if (id === "guide") viewGuide(v);
  else if (id === "game") viewGame(v);
  else if (id.startsWith("bank-")) viewBank(v, BANK.find(s => `bank-${s.id}` === id));
  else if (id === REAL.id) viewReal(v);
  else viewTask(v, TASKS.find(t => t.id === id));
  renderNav();
  try { history.replaceState(null, "", `#${id}`); } catch {}
  if (focus) { window.scrollTo({ top: 0 }); v.focus({ preventScroll: true }); }
}

function sayBtn(text) { return `<button type="button" class="say" title="Listen 聽" aria-label="Listen" data-say="${esc(text)}">&#128264;</button>`; }
function wireSay(root) {
  root.addEventListener("click", e => { const b = e.target.closest("[data-say]"); if (b) { SK.stopSpeech(); SK.speak(b.dataset.say, 0.9); } });
}

/* ---------- guide ---------- */
function viewGuide(v) {
  v.innerHTML = `<p class="eyebrow">Start Here 從這裡開始</p>
    <h2>How to Build an Email 一封英文書信的結構</h2>
    <p class="sw-sub">Every KET, PET and FCE email follows the same six steps. Click a step to see the sentence patterns. 點每一步看句型。</p>
    <div class="em-steps">${STEPS.map(s => `<button type="button" class="em-step" data-go="${s.go}"><span class="n">${s.n}</span><b>${esc(s.en)}</b>${esc(s.zh)}<small>${esc(s.ex)}</small></button>`).join("")}</div>
    <section class="sw-section"><h3>Formal or informal? 正式還是非正式？</h3>
      <div class="sw-table-wrap"><table class="em-compare">
        <tr><th class="k">Check 檢查</th><th class="f">Formal 正式 (teacher, school, company)</th><th class="i">Informal 非正式 (friend, classmate, family)</th></tr>
        <tr><td>Greeting 稱呼</td><td>Dear Ms. Tan, / Dear Sir or Madam,</td><td>Hi Lucy, / Hey Zach!</td></tr>
        <tr><td>Purpose 目的</td><td>I am writing to inform you that…</td><td>Just letting you know… / Heads up!</td></tr>
        <tr><td>Grammar 文法</td><td>Full forms: I am, I would, do not</td><td>Contractions: I’m, I’d, don’t</td></tr>
        <tr><td>Asking 請求</td><td>Could you please…? / I would be grateful if…</td><td>Can you…? / Would you mind V-ing…?</td></tr>
        <tr><td>Before the end 結尾前</td><td>I look forward to hearing from you.</td><td>Can’t wait to see you! / Let me know, OK?</td></tr>
        <tr><td>Sign-off 結尾敬辭</td><td>Yours sincerely, / Best regards,</td><td>Take care, / See you soon, / Love,</td></tr>
      </table></div>
      <p class="em-note">Yours sincerely = you know the name (Dear Ms. Tan). Yours faithfully = you don’t (Dear Sir or Madam). 知道姓名用 sincerely；不知道用 faithfully。</p>
    </section>
    <section class="sw-section"><h3>How to use this page 怎麼練習</h3>
      <ol style="line-height:1.9;margin:0;padding-left:22px">
        <li><b>Phrase Bank 句型庫</b> — 22 purposes, formal and informal. Turn on <i>Self-test</i> to hide the examples and quiz yourself. 🔊 listens.</li>
        <li><b>Game</b> — decide if each sentence is formal or informal.</li>
        <li><b>Writing Tasks 寫作</b> — 10 PET/FCE prompts. Click a pattern to put it in your email, write with the timer, then <i>Check My Email</i> and compare with the model.</li>
        <li><b>Real Email 真實郵件</b> — read a real booking email, answer 8 questions, then write a reply to the support desk.</li>
      </ol>
      <div class="sw-actions"><button class="small-button primary-action" type="button" data-go="task-1">Start Task 1 &rarr;</button><button class="small-button" type="button" data-go="game">Play the Game</button><button class="small-button" type="button" data-go="bank-request">Open the Phrase Bank</button></div>
    </section>`;
  v.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go, true)));
}

/* ---------- phrase bank ---------- */
function card(item) {
  const [p, e, z] = item;
  const say = e || p;
  return `<div class="em-card">${sayBtn(say)}<div class="pat">${esc(p)}</div>${e ? `<div class="ex">${esc(e)}</div>` : ""}<div class="zh">${esc(z)}</div></div>`;
}
function viewBank(v, s) {
  const hasF = !!(s.formal && s.formal.length), hasI = !!(s.informal && s.informal.length);
  let show = store.get("email-bank-show") || "both";
  const self = store.get("email-bank-selftest") === "1";
  const label = s.num ? `Purpose ${s.num} 目的 ${s.num}` : { Start: "Opening 開頭", End: "Ending 結尾" }[s.group];
  v.innerHTML = `<p class="eyebrow">Phrase Bank 句型庫 · ${esc(label)}</p>
    <h2>${esc(s.en)} <span style="color:var(--muted);font-weight:600">${esc(s.zh)}</span></h2>
    <div class="em-toolbar">
      ${hasF && hasI ? `<button class="chip" type="button" data-show="both">Both 兩者</button><button class="chip" type="button" data-show="formal">Formal 正式</button><button class="chip" type="button" data-show="informal">Informal 非正式</button>` : ""}
      <button class="chip" type="button" id="selfBtn" aria-pressed="${self}">&#128064; Self-test 遮住例句</button>
      <span class="em-note" id="selfNote" ${self ? "" : "hidden"}>Say the example first, then tap the card to check. 先說出例句，再點卡片看答案。</span>
    </div>
    <div id="bankBody" class="${self ? "selftest" : ""}"></div>
    <section class="sw-section"><h3><span>Try it 試試看</span></h3>
      <p class="em-note" style="margin-top:0">Write 2–3 of your own sentences with the patterns above. 用上面的句型寫 2–3 句自己的句子。</p>
      <textarea id="tryBox" class="sw-write" style="min-height:120px" spellcheck="true" placeholder="e.g. Could you please send me the notes from today’s class?"></textarea>
      <div class="sw-actions"><button class="small-button" type="button" id="tryAi">&#129302; Copy for AI Feedback</button><span class="em-note" id="tryStatus"></span></div>
    </section>
    <section class="sw-section"><div class="em-links" id="nextLinks"></div></section>`;
  const body = $("bankBody");
  const draw = () => {
    if (s.sets) { body.innerHTML = s.sets.map(set => `<div class="em-set-title">${esc(set.en)} · ${esc(set.zh)}</div>${set.items.map(card).join("")}`).join(""); return; }
    const cols = [];
    if (hasF && show !== "informal") cols.push(`<div class="em-col formal"><h3><span class="tone formal">Formal 正式</span></h3>${s.formal.map(card).join("")}</div>`);
    if (hasI && show !== "formal") cols.push(`<div class="em-col informal"><h3><span class="tone informal">Informal 非正式</span></h3>${s.informal.map(card).join("")}</div>`);
    body.innerHTML = `<div class="em-cols${cols.length === 1 ? " one" : ""}">${cols.join("")}</div>`;
    v.querySelectorAll("[data-show]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.show === show)));
  };
  draw();
  v.querySelectorAll("[data-show]").forEach(b => b.addEventListener("click", () => { show = b.dataset.show; store.set("email-bank-show", show); draw(); }));
  $("selfBtn").addEventListener("click", () => {
    const on = !body.classList.contains("selftest");
    body.classList.toggle("selftest", on); $("selfBtn").setAttribute("aria-pressed", String(on)); $("selfNote").hidden = !on;
    store.set("email-bank-selftest", on ? "1" : "0"); body.querySelectorAll(".em-card.shown").forEach(c => c.classList.remove("shown"));
  });
  body.addEventListener("click", e => { if (e.target.closest("[data-say]")) return; const c = e.target.closest(".em-card"); if (c && body.classList.contains("selftest")) c.classList.toggle("shown"); });
  wireSay(body);
  const key = `email-try-${s.id}`;
  $("tryBox").value = store.get(key) || "";
  $("tryBox").addEventListener("input", () => store.set(key, $("tryBox").value));
  $("tryAi").addEventListener("click", async () => {
    const t = $("tryBox").value.trim();
    if (!t) { $("tryStatus").textContent = "Write your sentences first. 請先寫句子。"; return; }
    const prompt = `I am a KET/PET/FCE student practising email sentence patterns for "${s.en}" (${s.zh}).\n\nMy sentences:\n${t}\n\nPlease:\n1. Correct grammar and word choice, with short explanations in Traditional Chinese.\n2. Tell me if each sentence is formal or informal, and if it fits an email.\n3. Give one better version of each sentence (CEFR A2–B2).`;
    $("tryStatus").textContent = (await SK.copyText(prompt)) ? "Copied. Paste it to Claude or ChatGPT." : "Clipboard blocked — copy manually.";
  });
  const idx = BANK.indexOf(s), prev = BANK[idx - 1], next = BANK[idx + 1];
  const related = TASKS.filter(t => t.links.includes(s.id));
  $("nextLinks").innerHTML = [
    prev ? `<button class="small-button" type="button" data-go="bank-${prev.id}">&larr; ${esc(prev.en)}</button>` : "",
    next ? `<button class="small-button" type="button" data-go="bank-${next.id}">${esc(next.en)} &rarr;</button>` : "",
    ...related.map(t => `<button class="small-button primary-action" type="button" data-go="${t.id}">✍ Use it: Task ${t.n} ${esc(t.en)}</button>`)
  ].join("");
  $("nextLinks").querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go, true)));
}

/* ---------- formal / informal game ---------- */
function viewGame(v) {
  const pool = [];
  BANK.forEach(s => ["formal", "informal"].forEach(k => (s[k] || []).forEach(([p, e]) => {
    const text = e || p;
    if (s.id === "signoff" || s.id === "address" || /\[|…/.test(text)) return;
    pool.push({ text, tone: k, topic: s.en });
  })));
  let round = [], i = 0, score = 0, best = Number(store.get("email-game-best") || 0);
  v.innerHTML = `<p class="eyebrow">Game 遊戲</p><h2>Formal or Informal? 正式還是非正式？</h2>
    <p class="sw-sub">10 sentences from the phrase bank. Would you write it to a teacher/company (formal) or a friend (informal)?</p>
    <div class="em-game">
      <div class="em-meta" style="justify-content:center"><span id="gProg"></span><span class="em-score" id="gScore"></span><span id="gBest"></span></div>
      <div class="em-bar"><span id="gBar"></span></div>
      <div class="sent" id="gSent"></div>
      <div class="btns"><button type="button" class="f" data-t="formal">Formal 正式</button><button type="button" class="i" data-t="informal">Informal 非正式</button></div>
      <div class="res" id="gRes"></div>
      <div class="sw-actions" style="justify-content:center"><button class="small-button primary-action" type="button" id="gNext" hidden>Next &rarr;</button><button class="small-button" type="button" id="gSay">&#128264; Listen</button></div>
    </div>`;
  const btns = [...v.querySelectorAll("[data-t]")];
  const start = () => { round = [...pool].sort(() => Math.random() - .5).slice(0, 10); i = 0; score = 0; show(); };
  const show = () => {
    const q = round[i];
    $("gProg").textContent = `Question ${i + 1} / ${round.length}`; $("gScore").textContent = `Score ${score}`; $("gBest").textContent = best ? `Best ${best}/10` : "";
    $("gBar").style.width = `${i / round.length * 100}%`;
    $("gSent").textContent = q.text; $("gRes").innerHTML = ""; $("gNext").hidden = true; btns.forEach(b => b.disabled = false);
  };
  btns.forEach(b => b.addEventListener("click", () => {
    const q = round[i], ok = b.dataset.t === q.tone;
    if (ok) score++;
    btns.forEach(x => x.disabled = true);
    $("gScore").textContent = `Score ${score}`;
    $("gRes").innerHTML = `${ok ? "✅ Correct! 答對了！" : "❌ Not quite. 再想想。"} It is <b>${q.tone === "formal" ? "formal 正式" : "informal 非正式"}</b> — from <i>${esc(q.topic)}</i>.`;
    $("gNext").hidden = false; $("gNext").textContent = i === round.length - 1 ? "See my score" : "Next →"; $("gNext").focus();
  }));
  $("gNext").addEventListener("click", () => {
    i++;
    if (i < round.length) { show(); return; }
    if (score > best) { best = score; store.set("email-game-best", String(best)); }
    $("gBar").style.width = "100%"; btns.forEach(b => b.disabled = true);
    $("gSent").textContent = `${score} / 10 ${score >= 9 ? "🏆 Excellent!" : score >= 7 ? "👍 Good job!" : "Keep practising! 再練習一次！"}`;
    $("gRes").innerHTML = ""; $("gNext").textContent = "Play again ↻"; $("gNext").onclick = () => { $("gNext").onclick = null; start(); };
  });
  $("gSay").addEventListener("click", () => { if (round[i]) { SK.stopSpeech(); SK.speak(round[i].text, 0.9); } });
  start();
}

/* ---------- email checker ---------- */
function checkEmail(text, tone, target) {
  const issues = [], good = [];
  let score = 100;
  if (!text.trim()) return { score: 0, issues: ["Please write your email first. 請先寫信。"] };
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const words = W.wordCount(text);
  const paras = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const first = lines[0] || "", lastLines = lines.slice(-3).join(" ");
  if (/^(dear|hi|hello|hey|to whom|good (morning|afternoon)|to all|to my)\b/i.test(first)) {
    good.push("Greeting ✓"); if (!/[,!:]$/.test(first)) { issues.push(`Put a comma after the greeting: “${first.replace(/[.\s]*$/, "")},” 稱呼後加逗號。`); score -= 3; }
  } else { issues.push("Start with a greeting on its own line: Dear Ms. Tan, / Hi Lucy, 第一行要先稱呼對方。"); score -= 12; }
  if (/\b(regards|sincerely|faithfully|wishes|warmly|take care|cheers|love|see you|talk soon|respectfully|appreciation|gratitude|yours|your (friend|classmate|biggest|new)|class leader|apologetically|can'?t wait)\b/i.test(lastLines)) good.push("Sign-off ✓");
  else { issues.push("End with a sign-off and your name: Best regards, / Take care, + name. 結尾要有敬辭和署名。"); score -= 12; }
  if (/[,!]$/.test(lines[lines.length - 1] || "")) { issues.push("Write your name on the last line, after the sign-off. 敬辭下一行寫名字。"); score -= 4; }
  if (paras.length < 4) { issues.push(`Use paragraphs (now ${paras.length}). Leave a blank line between greeting / purpose / details / closing / sign-off. 分段，段落之間空一行。`); score -= 8; }
  else good.push(`${paras.length} paragraphs ✓`);
  const body = paras.slice(1, 3).join(" ");
  if (!/\b(I am writing|I'?m writing|I wanted to|I would like to|I'?d like to|just wanted|I am contacting|just letting you know|heads up|I owe|congratulations|thank you for|thanks (a ton |so much )?for|as you (probably )?know|since you asked|this is (a|just a) (friendly |quick )?reminder|I regret|I just heard|I am so)\b/i.test(body)) {
    issues.push("Say why you are writing near the start: I am writing to… / I just wanted to… 開頭要說明寫信目的。"); score -= 8;
  } else good.push("Purpose sentence ✓");
  if (!/\b(look(ing)? forward|let me know|hope to|hope you|can'?t wait|see you|hear from you|feel free|please contact|if you have any questions|thank you (again|once again|for your time|in advance)|once again)\b/i.test(paras.slice(-3).join(" "))) {
    issues.push("Add a ‘before the end’ line: I look forward to hearing from you. / Let me know what you think! 結尾前加一句。"); score -= 6;
  }
  const contr = (text.match(/\b\w+'(m|re|s|ve|d|ll|t)\b|\b\w+’(m|re|s|ve|d|ll|t)\b/gi) || []).filter(c => !/^(let'?s|let’s)$/i.test(c));
  const slang = text.match(/\b(hey|gonna|wanna|kinda|gotta|btw|lol|yeah|yay|my bad|awesome|guys|pics|omg)\b/gi) || [];
  if (tone === "formal") {
    if (contr.length > 1) { issues.push(`Formal email: write full forms (I'm → I am, don't → do not). Found: ${[...new Set(contr)].slice(0, 5).join(", ")}. 正式信少用縮寫。`); score -= 6; }
    if (slang.length) { issues.push(`Too informal for this reader: ${[...new Set(slang.map(s => s.toLowerCase()))].join(", ")}. 用字太口語。`); score -= 8; }
    if (/dear sir or madam|to whom it may concern/i.test(text) && /yours sincerely/i.test(text)) { issues.push("Dear Sir or Madam → Yours faithfully (not Yours sincerely)."); score -= 4; }
    if (/^(hi|hey|hello)\b/i.test(first)) { issues.push("For a teacher or office, ‘Dear Mr./Ms. …,’ is safer than Hi/Hey."); score -= 4; }
  }
  if (tone === "informal") {
    if (/yours faithfully|to whom it may concern|dear sir or madam/i.test(text)) { issues.push("Too formal for a friend. Try: Hi …, / Take care, / See you soon, 寫給朋友不用這麼正式。"); score -= 6; }
    if (!contr.length && words > 40) issues.push("Tip: to a friend, contractions sound natural (I’m, can’t, it’s). 寫給朋友可用縮寫。");
  }
  if (words < target.min) { issues.push(`Too short: ${words} words. Aim for ${target.min}–${target.max}. 字數不足。`); score -= words < target.min * .7 ? 15 : 8; }
  else if (words > target.max * 1.15) { issues.push(`Too long for this target: ${words} words (aim ${target.min}–${target.max}). Cut extra details. 字數太多。`); score -= 6; }
  else good.push(`${words} words ✓`);
  const g = W.review(text, null, "email", 1).issues.filter(m => !/^(Good length|Develop your answer|Use more complete|Grammar and structure look|End your last sentence)/.test(m));
  g.forEach(m => { issues.push(m); score -= 4; });
  if (!issues.length) issues.push("Great email! Read it aloud once more and check spelling. 很棒！再朗讀一次檢查拼字。");
  return { score: Math.max(0, Math.min(100, score)), issues, good };
}

/* ---------- writing area (tasks + real email) ---------- */
function writingArea(v, cfg) {
  /* cfg: { key, tone, to, prompt, purpose, modelText, modelHtml, defaultTarget } */
  let target = TARGETS.find(t => t.id === (store.get(`${cfg.key}-target`) || cfg.defaultTarget)) || TARGETS[0];
  const sec = document.createElement("section");
  sec.className = "sw-section";
  sec.innerHTML = `<h3><span>Your Email 我的書信</span><span id="timerHost"></span></h3>
    <div class="em-targets">Target 字數目標: ${TARGETS.map(t => `<button class="chip" type="button" data-target="${t.id}">${t.label}</button>`).join("")}</div>
    <textarea id="writeBox" class="sw-write" spellcheck="true" style="margin-top:8px;min-height:280px" placeholder="Dear …,&#10;&#10;I am writing to …&#10;&#10;…&#10;&#10;Best regards,&#10;Your name&#10;&#10;(Click a pattern above to add it here. Saved automatically on this device.)"></textarea>
    <div class="sw-meta"><span id="saveStatus">Draft saved on this device</span><span id="wordCount"></span></div>
    <div class="sw-actions">
      <button class="small-button primary-action" type="button" id="checkBtn">&#9989; Check My Email</button>
      <button class="small-button" type="button" id="outlineBtn">&#128221; Add Outline</button>
      <button class="small-button" type="button" id="modelBtn">Show Model Email</button>
      <button class="small-button" type="button" id="listenBtn">&#128264; Listen to Model</button>
      <button class="small-button" type="button" id="aiBtn">&#129302; Copy for AI Feedback</button>
      <button class="small-button" type="button" id="clearBtn">Clear</button>
    </div>
    <div id="feedback" class="sw-feedback" hidden></div>
    <section class="sw-section" id="modelSec" hidden><h3>Model Email 範文 <small style="font-weight:400;color:var(--muted);font-size:13px">(sentence patterns in bold)</small></h3><div class="em-model" id="modelBox"></div>
      <p class="em-note">The model is a full, extended version. Borrow its patterns, then keep your own email to the word target. 範文較長，學句型、字數依目標調整。</p></section>`;
  v.appendChild(sec);
  const box = $("writeBox"), DK = `${cfg.key}-draft`;
  box.value = store.get(DK) || "";
  const count = () => { $("wordCount").textContent = `${W.wordCount(box.value)} words · target ${target.min}–${target.max}`; };
  const markT = () => sec.querySelectorAll("[data-target]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.target === target.id)));
  sec.querySelectorAll("[data-target]").forEach(b => b.addEventListener("click", () => { target = TARGETS.find(t => t.id === b.dataset.target); store.set(`${cfg.key}-target`, target.id); markT(); count(); }));
  markT(); count();
  const mins = target.id === "fce" ? [20, 30, 40] : [10, 15, 20];
  const timer = W.timer($("timerHost"), { minutes: mins, start: mins[1], onEnd: () => { $("saveStatus").textContent = "⏰ Time is up! Finish your sentence, then check your email."; } });
  cleanup.push(() => timer.stop());
  box.addEventListener("input", () => { store.set(DK, box.value); $("saveStatus").textContent = "Draft saved on this device"; count(); });
  $("modelBox").innerHTML = cfg.modelHtml;
  $("checkBtn").addEventListener("click", () => {
    const r = checkEmail(box.value, cfg.tone, target);
    const fb = $("feedback"); fb.hidden = false;
    fb.innerHTML = `<div><span class="score">${r.score}</span><b>Email checker 書信檢查</b> <small style="color:var(--muted)">— greeting, purpose, paragraphs, tone, sign-off, length and common grammar. For full corrections use “Copy for AI Feedback”.</small></div>
      ${r.good && r.good.length ? `<p style="margin:10px 0 0;color:var(--good);font-weight:700">${r.good.map(esc).join(" · ")}</p>` : ""}
      <ul>${r.issues.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  });
  $("outlineBtn").addEventListener("click", () => {
    if (box.value.trim() && !confirm("Add the outline below your writing?")) return;
    const o = cfg.outline || "Dear …,\n\n[Why you are writing]\n\n[Details]\n\n[Before the end]\n\n[Sign-off],\n[Your name]";
    box.value = box.value.trim() ? `${box.value.trim()}\n\n${o}` : o; box.dispatchEvent(new Event("input")); box.focus();
  });
  $("modelBtn").addEventListener("click", () => { const s = $("modelSec"); s.hidden = !s.hidden; $("modelBtn").textContent = s.hidden ? "Show Model Email" : "Hide Model Email"; });
  let speaking = false;
  $("listenBtn").addEventListener("click", () => {
    if (speaking) { SK.stopSpeech(); speaking = false; $("listenBtn").innerHTML = "&#128264; Listen to Model"; return; }
    $("modelSec").hidden = false; $("modelBtn").textContent = "Hide Model Email";
    SK.stopSpeech(); SK.speak(cfg.modelText, 0.92); speaking = true; $("listenBtn").textContent = "■ Stop";
    const poll = setInterval(() => { if (!speechSynthesis.speaking) { clearInterval(poll); speaking = false; const b = $("listenBtn"); if (b) b.innerHTML = "&#128264; Listen to Model"; } }, 500);
    cleanup.push(() => clearInterval(poll));
  });
  $("aiBtn").addEventListener("click", async () => {
    const t = box.value.trim();
    if (!t) { $("saveStatus").textContent = "Write your email first. 請先寫信。"; return; }
    const prompt = `Please check my English email for the Cambridge ${target.id === "fce" ? "B2 First (FCE)" : "B1 Preliminary (PET) / A2 Key (KET)"} writing test.\n\nTask (${cfg.purpose}; reader: ${cfg.to}; tone: ${TONE[cfg.tone]}):\n${cfg.prompt}\n\nMy email (${W.wordCount(t)} words; target ${target.min}–${target.max}):\n${t}\n\nPlease give me:\n1. Grammar, spelling and word-choice corrections with short explanations in Traditional Chinese.\n2. Did I answer every point of the task? Is the tone right for the reader?\n3. Better sentence patterns I could use (opening, purpose, before the end, sign-off).\n4. An improved version that keeps my ideas.\n5. A Cambridge-style score (Content, Communicative Achievement, Organisation, Language: 0–5 each).`;
    $("saveStatus").textContent = (await SK.copyText(prompt)) ? "Copied with the task. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your email manually.";
  });
  $("clearBtn").addEventListener("click", () => { if (!box.value.trim() || confirm("Clear this email?")) { box.value = ""; store.del(DK); count(); $("feedback").hidden = true; } });
  return box;
}
function insertAt(box, text) {
  const s = box.selectionStart ?? box.value.length, e = box.selectionEnd ?? s;
  const before = box.value.slice(0, s), after = box.value.slice(e);
  const pad = before && !/[\s]$/.test(before) ? " " : "";
  box.value = before + pad + text + after;
  const pos = (before + pad + text).length;
  box.focus(); box.setSelectionRange(pos, pos);
  box.dispatchEvent(new Event("input"));
}
const chipText = (el, p) => {
  const t = p.replace(/^\s+|\s+$/g, "");
  if (/^greeting/i.test(el)) return t.replace(/\s*I just wanted to say…$/, "") + "\n\n";
  if (/sign-?off/i.test(el) && /,$/.test(t) && t.split(" ").length <= 5) return "\n\n" + t + "\n";
  return t + " ";
};

/* ---------- task view ---------- */
function viewTask(v, t) {
  const model = [];
  t.els.forEach(e => { if (e.html) model.push(e.html); if (e.signoff) model.push(`${esc(e.signoff)}\n${esc(e.name)}`); });
  const modelHtml = model.join("\n\n");
  v.innerHTML = `<p class="eyebrow">PET / FCE Writing Task ${t.n} · ${esc(t.en)} ${esc(t.zh)}</p>
    <h2>${esc(t.en)} <span style="color:var(--muted);font-weight:600">${esc(t.zh)}</span></h2>
    <div class="em-meta"><span>To 收件人: <b>${esc(t.to)}</b></span><span class="tone ${t.tone}">${TONE[t.tone]}</span></div>
    <div class="sw-prompt">${esc(t.prompt)}</div>
    <section class="sw-section">
      <h3><span>Plan with the patterns 用句型規劃</span><span><button class="small-button" type="button" id="colBtn">Show model sentences</button></span></h3>
      <div class="sw-table-wrap"><table class="sw-grid em-plan hide-col3" id="planTable">
        <tr><th style="width:16%">Part 段落</th><th style="width:40%">Key Sentence Patterns — click to add 點句型加入</th><th>Model Writing 範例</th></tr>
        ${t.els.map(e => `<tr><td><b>${esc(e.el)}</b></td><td>${e.pats.map(p => `<button type="button" class="pchip" data-el="${esc(e.el)}" data-p="${esc(p)}">${esc(p)}</button>`).join("")}</td><td>${e.html || ""}${e.signoff ? `${e.html ? "<br><br>" : ""}${esc(e.signoff)}<br>${esc(e.name)}` : ""}</td></tr>`).join("")}
      </table></div>
      <p class="em-hint">Tip: replace … and [Name] with your own ideas. 把 … 和 [Name] 換成你自己的內容。</p>
    </section>
    <section class="sw-section"><h3>More phrases for this email 相關句型庫</h3><div class="em-links">${t.links.map(id => { const s = BANK.find(b => b.id === id); return s ? `<button class="small-button" type="button" data-go="bank-${s.id}">${esc(s.en)} ${esc(s.zh)}</button>` : ""; }).join("")}</div></section>`;
  v.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go, true)));
  const outline = t.els.map(e => /greeting/i.test(e.el) ? "Dear …," : /sign-?off/i.test(e.el) && !/closing/i.test(e.el) ? "[Sign-off],\n[Your name]" : /closing \/ sign-?off/i.test(e.el) ? `[${e.el.split("/")[0].trim()}]\n\n[Sign-off],\n[Your name]` : `[${e.el}]`).join("\n\n");
  const box = writingArea(v, { key: `email-${t.id}`, tone: t.tone, to: t.to, prompt: t.prompt, purpose: t.en, modelHtml, modelText: plain(modelHtml), defaultTarget: "note", outline });
  v.querySelectorAll(".pchip").forEach(b => b.addEventListener("click", () => insertAt(box, chipText(b.dataset.el, b.dataset.p))));
  $("colBtn").addEventListener("click", () => { const tb = $("planTable"); tb.classList.toggle("hide-col3"); $("colBtn").textContent = tb.classList.contains("hide-col3") ? "Show model sentences" : "Hide model sentences"; });
  const i = TASKS.indexOf(t);
  const nav = document.createElement("section"); nav.className = "sw-section";
  nav.innerHTML = `<div class="em-links">${i > 0 ? `<button class="small-button" type="button" data-go="${TASKS[i - 1].id}">&larr; Task ${i}</button>` : ""}${i < TASKS.length - 1 ? `<button class="small-button" type="button" data-go="${TASKS[i + 1].id}">Task ${i + 2} &rarr;</button>` : `<button class="small-button" type="button" data-go="${REAL.id}">Real Email &rarr;</button>`}</div>`;
  v.appendChild(nav);
  nav.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go, true)));
}

/* ---------- real email ---------- */
function viewReal(v) {
  const r = REAL, done = {};
  v.innerHTML = `<p class="eyebrow">Real-world Email 真實郵件 · Reading + Writing</p>
    <h2>${esc(r.title.replace("Real Email: ", ""))} <span style="color:var(--muted);font-weight:600">${esc(r.zh)}</span></h2>
    <p class="sw-sub">A real automatic email from a hotel booking. Read it, notice the formal patterns, answer 8 questions, then write to the support desk.</p>
    <div class="em-mail">
      <div class="em-mail-head"><div><b>From</b> ${esc(r.from)}</div><div><b>Subject</b> ${esc(r.subject)}</div><div><b>Date</b> ${esc(r.date)}</div></div>
      <div class="em-mail-body">${r.paras.map(p => `<p>${esc(p)}</p>`).join("")}</div>
    </div>
    <p class="em-note">Personal details (name, reservation numbers, email address, price) have been removed. 個人資料已移除。</p>
    <section class="sw-section"><h3><span>Read along 跟讀</span><span><button class="small-button" type="button" id="readMail">&#128264; Listen to the Email</button></span></h3></section>
    <section class="sw-section"><h3>Notice the language 注意這些句型</h3>
      <div class="sw-table-wrap"><table class="sw-grid"><tr><th>Pattern 句型</th><th>中文</th><th>Why it is used 用途</th></tr>
      ${r.notice.map(([p, z, w]) => `<tr><td><b>${esc(p)}</b></td><td>${esc(z)}</td><td>${esc(w)}</td></tr>`).join("")}</table></div>
    </section>
    <section class="sw-section"><h3><span>Reading check 閱讀測驗</span><span class="em-score" id="qScore">0 / ${r.quiz.length}</span></h3><div id="quiz"></div>
      <div class="sw-actions"><button class="small-button" type="button" id="qReset">↻ Try again</button></div></section>
    <section class="sw-section"><h3>Writing task 寫作：${esc(r.task.zh)}</h3>
      <div class="em-meta"><span>To 收件人: <b>${esc(r.task.to)}</b></span><span class="tone formal">${TONE.formal}</span></div>
      <div class="sw-prompt">${esc(r.task.prompt)}</div>
      <p class="em-hint" style="margin-top:10px">Click a pattern to add it 點句型加入：</p>
      <div class="em-cols" style="margin-top:6px">${[0, 1].map(c => `<div>${r.task.pats.filter((_, k) => k % 2 === c).map(p => `<button type="button" class="pchip" data-p="${esc(p)}">${esc(p)}</button>`).join("")}</div>`).join("")}</div>
    </section>`;
  const drawQuiz = () => {
    let right = 0; Object.keys(done).forEach(k => delete done[k]);
    $("qScore").textContent = `0 / ${r.quiz.length}`;
    $("quiz").innerHTML = r.quiz.map((q, n) => `<div class="em-q" data-q="${n}"><div class="qt">${n + 1}. ${esc(q.q)}</div><div class="qz">${esc(q.zh)}</div>
      <div class="em-opts">${q.opts.map((o, k) => `<button type="button" data-k="${k}">${"ABCD"[k]}. ${esc(o)}</button>`).join("")}</div><div class="em-why" hidden></div></div>`).join("");
    $("quiz").querySelectorAll(".em-q").forEach(qe => qe.querySelectorAll("[data-k]").forEach(b => b.addEventListener("click", () => {
      const n = Number(qe.dataset.q), q = r.quiz[n], k = Number(b.dataset.k);
      if (done[n]) return; done[n] = true;
      qe.querySelectorAll("[data-k]").forEach(x => { x.disabled = true; if (Number(x.dataset.k) === q.a) x.classList.add("right"); });
      if (k !== q.a) b.classList.add("wrong"); else right++;
      const why = qe.querySelector(".em-why"); why.hidden = false; why.textContent = `${k === q.a ? "✅" : "❌"} ${q.why}`;
      $("qScore").textContent = `${right} / ${r.quiz.length}${Object.keys(done).length === r.quiz.length ? (right === r.quiz.length ? " 🏆" : "") : ""}`;
    })));
  };
  drawQuiz();
  $("qReset").addEventListener("click", drawQuiz);
  let reading = false;
  $("readMail").addEventListener("click", () => {
    if (reading) { SK.stopSpeech(); reading = false; $("readMail").innerHTML = "&#128264; Listen to the Email"; return; }
    SK.speak(r.paras.slice(1).join(" ").replace(/\[[^\]]+\]/g, ""), 0.92); reading = true; $("readMail").textContent = "■ Stop";
    const poll = setInterval(() => { if (!speechSynthesis.speaking) { clearInterval(poll); reading = false; const b = $("readMail"); if (b) b.innerHTML = "&#128264; Listen to the Email"; } }, 500);
    cleanup.push(() => clearInterval(poll));
  });
  const modelHtml = esc(r.task.model).replace(/(I am writing to inquire about|My reservation number is|Unfortunately|Could you please confirm whether|I would also like to know|Thank you in advance for your help\.|I look forward to hearing from you\.|may I)/g, "<b>$1</b>");
  const box = writingArea(v, { key: "email-real-booking", tone: "formal", to: r.task.to, prompt: r.task.prompt, purpose: "Requesting information", modelHtml, modelText: r.task.model, defaultTarget: "pet",
    outline: "Dear Sir or Madam,\n\n[Who you are + reservation number]\n\n[Your problem + questions]\n\n[Before the end]\n\nYours faithfully,\n[Your name]" });
  v.querySelectorAll(".pchip").forEach(b => b.addEventListener("click", () => insertAt(box, /^Yours/.test(b.dataset.p) ? "\n\nYours faithfully,\n" : b.dataset.p + " ")));
}

/* ---------- boot ---------- */
const tabs = [...document.querySelectorAll("[data-kind]")];
tabs.forEach(b => b.addEventListener("click", () => { kind = b.dataset.kind; tabs.forEach(x => x.setAttribute("aria-pressed", String(x === b))); renderNav(); }));
$("searchInput").addEventListener("input", renderNav);
window.addEventListener("hashchange", () => { const id = location.hash.slice(1); if (id && id !== current) go(id, true); });
go(location.hash.slice(1) || "guide");
