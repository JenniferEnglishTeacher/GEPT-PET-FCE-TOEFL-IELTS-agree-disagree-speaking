/* KET / PET / FCE / TOEFL email, letter & essay writing — phrase bank, formal/informal game, two levels of guided tasks (essays: fce-essay.html), real-email reading.
   Level 1: short notes 50–100 words (iTEP Set 1)   Level 2: FCE / TOEFL emails 150–180 words (iTEP Set 2 + Cambridge B2 First Part 2)
   FCE essays live on their own page: fce-essay.html.
   Uses email-writing-data.js + email-writing-fce-data.js, speaking-kit.js (speech), writing-kit.js (timer, word count, grammar checks). */
const W = window.WritingKit, SK = window.SpeakingKit;
const BANK = window.EMAIL_BANK || [], REAL = window.EMAIL_REAL, STEPS = window.EMAIL_STEPS || [];
const NOTES = window.EMAIL_NOTES || [], SET2 = window.EMAIL_TASKS || [], FCE = window.EMAIL_FCE || [], ESSAYS = [], FRAMES = window.FCE_FRAMES || [];
const esc = W.esc;
const $ = id => document.getElementById(id);
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  del: k => { try { localStorage.removeItem(k); } catch {} }
};
const plain = h => String(h).replace(/<i class="step">[^<]*<\/i>/g, "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const TONE = { formal: "Formal 正式", informal: "Informal 非正式", semi: "Neutral 中性" };
const TARGETS = [
  { id: "note", label: "Short note 50–75", min: 50, max: 75, mins: [5, 10, 15] },
  { id: "pet", label: "PET · 80–120", min: 80, max: 120, mins: [10, 15, 20] },
  { id: "fce", label: "FCE / TOEFL · 150–180", min: 150, max: 180, mins: [20, 30, 40] },
  { id: "itep", label: "iTEP essay · 175–225", min: 175, max: 225, mins: [20, 30, 40] },
  { id: "essay", label: "FCE essay · 220–250", min: 220, max: 250, mins: [30, 40, 50] }
];
const TARGETS_FOR = { note: ["note", "pet", "fce"], email: ["pet", "fce"], essay: ["itep", "essay"] };

/* Two levels. Each task carries .type so the shared views know how to behave. */
NOTES.forEach(t => { t.type = "note"; t.level = 1; });
SET2.forEach(t => { t.type = "email"; t.level = 2; t.source = t.source || "iTEP Set 2 · extended model"; });
for (const t of [...NOTES, ...SET2, ...FCE, ...ESSAYS]) if (!t.words) t.words = W.wordCount(plain(t.els.map(e => `${e.html || ""} ${e.signoff || ""} ${e.name || ""}`).join(" ")));
FCE.forEach(t => { t.type = "email"; t.level = 2; });
ESSAYS.forEach(t => { t.type = "essay"; t.level = 3; });
const LEVELS = [
  { id: "level-1", n: 1, kind: "note", en: "Short Notes", zh: "短信", words: "50–100 words", tasks: NOTES, group: "Level 1 · KET / PET Short Notes 短信 50–100 字",
    sub: "iTEP Part 1 · 10 purposes (thank-you, apology, request, complaint…). One clear purpose, 5 minutes, match the tone to the reader. 一個目的、五分鐘、語氣要配合收件人。" },
  { id: "level-2", n: 2, kind: "email", en: "FCE / TOEFL Emails", zh: "FCE / TOEFL 書信", words: "150–180 words", tasks: [...SET2, ...FCE], group: "Level 2 · FCE / TOEFL Emails 書信 150–180 字",
    sub: "17 emails: 10 school-life notes written at full length + 7 Cambridge B2 First Part 2 replies to a friend. Answer every point, use the bold B2 patterns, 150–180 words. 回答每一點、用粗體句型、150–180 字。" }
];
const ALL_TASKS = [...NOTES, ...SET2, ...FCE, ...ESSAYS];
const levelOf = t => LEVELS[t.level - 1];

/* ---------- navigation ---------- */
const NAV = [
  { id: "guide", kind: "start", group: "Start Here 從這裡開始", icon: "1", label: "How to Build an Email 書信結構", search: "structure steps formal informal guide 結構 levels" },
  { id: "game", kind: "start", group: "Start Here 從這裡開始", icon: "?", label: "Game: Formal or Informal? 正式還是非正式", search: "game quiz formal informal 遊戲" },
  ...BANK.map(s => ({ id: `bank-${s.id}`, kind: "bank", group: { Start: "Phrase Bank · Opening 開頭", Purpose: "Phrase Bank · Purpose 寫信目的", End: "Phrase Bank · Ending 結尾" }[s.group],
    icon: s.num || (s.group === "Start" ? "A" : "Z"), label: `${s.en} ${s.zh}`, search: JSON.stringify(s) })),
  ...LEVELS.flatMap(L => [
    { id: L.id, kind: L.kind, group: L.group, icon: "☰", label: `All ${L.tasks.length} prompts 總覽 · ${L.words}`, search: `${L.en} ${L.zh} overview grid all prompts ${L.words}` },
    ...L.tasks.map((t, i) => ({ id: t.id, kind: L.kind, group: L.group, icon: i + 1, label: `${t.en} ${t.zh}`, search: `${t.en} ${t.zh} ${t.prompt || t.topic} ${t.to || ""} ${t.source || ""}` }))
  ]),
  { id: REAL.id, kind: "email", group: "Real-world Email 真實郵件", icon: "✉", label: `${REAL.title.replace("Real Email: ", "")} ${REAL.zh}`, search: `${REAL.title} ${REAL.zh} disney booking hotel` }
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
  const L = LEVELS.find(l => l.id === id), t = ALL_TASKS.find(x => x.id === id);
  if (id === "guide") viewGuide(v);
  else if (id === "game") viewGame(v);
  else if (id.startsWith("bank-")) viewBank(v, BANK.find(s => `bank-${s.id}` === id));
  else if (id === REAL.id) viewReal(v);
  else if (L) viewLevel(v, L);
  else if (t) viewTask(v, t);
  renderNav();
  try { history.replaceState(null, "", `#${id}`); } catch {}
  if (focus) { window.scrollTo({ top: 0 }); v.focus({ preventScroll: true }); }
}
const wireGo = root => root.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go, true)));

function sayBtn(text) { return `<button type="button" class="say" title="Listen 聽" aria-label="Listen" data-say="${esc(text)}">&#128264;</button>`; }
function wireSay(root) {
  root.addEventListener("click", e => { const b = e.target.closest("[data-say]"); if (b) { SK.stopSpeech(); SK.speak(b.dataset.say, 0.9); } });
}

/* ---------- guide ---------- */
function viewGuide(v) {
  v.innerHTML = `<p class="eyebrow">Start Here 從這裡開始</p>
    <h2>How to Build an Email 一封英文書信的結構</h2>
    <p class="sw-sub">Every KET, PET, FCE and TOEFL email follows the same six steps. Click a step to see the sentence patterns. 點每一步看句型。</p>
    <div class="em-steps">${STEPS.map(s => `<button type="button" class="em-step" data-go="${s.go}"><span class="n">${s.n}</span><b>${esc(s.en)}</b>${esc(s.zh)}<small>${esc(s.ex)}</small></button>`).join("")}</div>
    <section class="sw-section"><h3>Two levels 兩個級別</h3>
      <div class="em-levels">${LEVELS.map(L => `<button type="button" class="em-level l${L.n}" data-go="${L.id}"><span class="n">Level ${L.n}</span><b>${esc(L.en)} ${esc(L.zh)}</b><span class="w">${esc(L.words)} · ${L.tasks.length} tasks</span><small>${esc(L.sub)}</small></button>`).join("")}</div>
      <div class="sw-table-wrap" style="margin-top:12px"><table class="em-compare">
        <tr><th class="k">Exam 考試</th><th>Task 題型</th><th>Length 字數</th><th>Time 時間</th><th>Level here</th></tr>
        <tr><td>KET / iTEP Part 1</td><td>Short note or letter for one situation</td><td>50–75 words</td><td>5 min</td><td>Level 1</td></tr>
        <tr><td>PET Part 1</td><td>Reply to an email, 4 notes to answer</td><td>about 100 words</td><td>~20 min</td><td>Level 1 → 2</td></tr>
        <tr><td>FCE Part 2 / TOEFL</td><td>Email or letter answering every point</td><td>140–190 words (aim 150–180)</td><td>~40 min</td><td>Level 2</td></tr>
        <tr><td>FCE Part 1 / iTEP Part 2</td><td>Opinion essay with 3 body paragraphs</td><td>220–250 words (iTEP 175–225)</td><td>40 min (iTEP 20)</td><td><a href="fce-essay.html" target="_blank" rel="noopener">FCE Essays page</a></td></tr>
      </table></div>
    </section>
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
        <li><b>Level 1–3 Tasks 寫作</b> — open a level to see the grid of all prompts, then pick one. Click a pattern to put it in your writing, write with the timer, <i>Check</i>, then compare with the model (<b>bold</b> = sentence pattern, <span class="kw">yellow</span> = topic vocabulary).</li>
        <li><b>Real Email 真實郵件</b> — read a real booking email, answer 8 questions, then write a reply to the support desk.</li>
      </ol>
      <div class="sw-actions"><button class="small-button primary-action" type="button" data-go="level-2">Level 2: FCE / TOEFL Emails &rarr;</button><button class="small-button" type="button" data-go="level-1">Level 1: Short Notes</button><a class="small-button" href="fce-essay.html" target="_blank" rel="noopener">FCE Essays page &rarr;</a><button class="small-button" type="button" data-go="game">Play the Game</button><button class="small-button" type="button" data-go="bank-request">Open the Phrase Bank</button></div>
    </section>`;
  wireGo(v);
}

/* ---------- level overview: the compiled grid of prompts ---------- */
function viewLevel(v, L) {
  const isEssay = L.kind === "essay";
  const rows = L.tasks.map((t, i) => isEssay
    ? `<tr><td><b>${i + 1}</b><small>${esc(t.source || "")}</small></td><td><b>${esc(t.en)}</b><br><small>${esc(t.zh)}</small></td><td>${esc(t.topic)}<div class="em-notes">${t.notes.map(n => `<span>${esc(n)}</span>`).join("")}</div></td><td>${t.words}</td><td><button class="small-button primary-action" type="button" data-go="${t.id}">Open &rarr;</button></td></tr>`
    : `<tr><td><b>${i + 1}</b><small>${esc(t.source || "iTEP Set 1")}</small></td><td><b>${esc(t.en)}</b><br><small>${esc(t.zh)}</small></td><td><span class="tone ${t.tone}">${TONE[t.tone]}</span><br><small>To ${esc(t.to)}</small></td><td>${esc(t.prompt)}${t.points ? `<div class="em-notes">${t.points.map(p => `<span>${esc(p)}</span>`).join("")}</div>` : ""}</td><td>${t.words}</td><td><button class="small-button primary-action" type="button" data-go="${t.id}">Open &rarr;</button></td></tr>`).join("");
  v.innerHTML = `<p class="eyebrow">Level ${L.n} · ${esc(L.words)}</p>
    <h2>${esc(L.en)} <span style="color:var(--muted);font-weight:600">${esc(L.zh)}</span></h2>
    <p class="sw-sub">${esc(L.sub)}</p>
    <section class="sw-section"><h3><span>All ${L.tasks.length} prompts 題目總覽</span><span class="em-note">Model length = words in the sample ${isEssay ? "essay" : "email"}</span></h3>
      <div class="sw-table-wrap"><table class="sw-grid em-overview">
        <tr><th style="width:7%">#</th><th style="width:17%">${isEssay ? "Topic 主題" : "Purpose 目的"}</th><th style="width:${isEssay ? "46" : "14"}%">${isEssay ? "Question + notes 題目與要點" : "Reader 收件人"}</th>${isEssay ? "" : '<th>Prompt 題目</th>'}<th style="width:7%">Model</th><th style="width:9%"></th></tr>
        ${rows}
      </table></div>
    </section>
    ${L.n >= 2 ? `<section class="sw-section"><h3>B2 sentence patterns in the models 範文中的高分句型 <small style="font-weight:400;color:var(--muted);font-size:13px">(shown in <b>bold</b>; the checker counts how many you use)</small></h3>
      <div class="em-frames">${FRAMES.map(f => `<span>${esc(f)}</span>`).join("")}</div></section>` : ""}
    <section class="sw-section"><div class="em-links">${L.n > 1 ? `<button class="small-button" type="button" data-go="level-${L.n - 1}">&larr; Level ${L.n - 1}</button>` : ""}<button class="small-button primary-action" type="button" data-go="${L.tasks[0].id}">Start ${esc(L.tasks[0].en)} &rarr;</button>${L.n < LEVELS.length ? `<button class="small-button" type="button" data-go="level-${L.n + 1}">Level ${L.n + 1} &rarr;</button>` : ""}</div></section>`;
  wireGo(v);
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
  const related = ALL_TASKS.filter(t => (t.links || []).includes(s.id)).slice(0, 4);
  $("nextLinks").innerHTML = [
    prev ? `<button class="small-button" type="button" data-go="bank-${prev.id}">&larr; ${esc(prev.en)}</button>` : "",
    next ? `<button class="small-button" type="button" data-go="bank-${next.id}">${esc(next.en)} &rarr;</button>` : "",
    ...related.map(t => `<button class="small-button primary-action" type="button" data-go="${t.id}">✍ Use it: L${t.level} ${esc(t.en)}</button>`)
  ].join("");
  wireGo($("nextLinks"));
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

/* ---------- B2 pattern counter (shared by email + essay checkers) ---------- */
const FRAME_RX = [
  [/\b(enable|allow)(s|ed)?\s+\w+(\s+\w+)?\s+to\b/i, "enable / allow sb to V"],
  [/\bprovid(e|es|ed|ing)\s+\w+(\s+\w+)?\s+with\b/i, "provide sb with N"],
  [/\bmak(e|es|ing)\s+it\s+(easier|harder|more difficult|difficult|hard|possible|more enjoyable)\s+for\b/i, "make it easier for sb to V"],
  [/\bit\s+is\s+(important|difficult|beneficial|impossible|essential|natural|reasonable|more effective)\s+for\b/i, "It is important for sb to V"],
  [/\bhave\s+(the|a)\s+(chance|opportunity)\s+to\b/i, "have the chance to V"],
  [/\b(as a result|consequently|therefore|thus)\b/i, "As a result / Therefore"],
  [/\b(for example|for instance)\b/i, "For example"],
  [/\b(compared to|in contrast|on the other hand|however)\b/i, "Compared to / In contrast / However"],
  [/\b(is|are|be)\s+more\s+likely\s+to\b/i, "be more likely to V"],
  [/\bbenefi(t|ts|ted)\s+from\b|\b(is|are|be)\s+(more\s+)?beneficial\b|\bbrings?\s+more\s+benefits\b/i, "benefit from / be more beneficial"],
  [/\bha(s|ve|d)\s+a\s+(more\s+)?(positive|negative)\s+impact\s+on\b/i, "have a positive impact on N"],
  [/\bthe\s+best\s+way\s+to\b/i, "the best way to V"],
  [/\b(improv|enhanc|boost)(e|es|ed|ing)\b/i, "improve / enhance / boost"],
  [/\b(through|by)\s+\w+ing\b|\bthrough\s+(the|a|an|shared|daily|music)\b/i, "through N / by V-ing"],
  [/\bit\s+is\s+(well known|well documented|estimated|clear)\s+that\b/i, "It is well known that"]
];
const countFrames = text => FRAME_RX.filter(([rx]) => rx.test(text)).map(([, n]) => n);

/* ---------- email checker ---------- */
function checkEmail(text, tone, target, cfg) {
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
  if (/\b(regards|sincerely|faithfully|wishes|warmly|take care|cheers|love|see you|talk soon|respectfully|appreciation|gratitude|yours|your (friend|classmate|biggest|new)|class leader|apologetically|can'?t wait|best|write back soon|good luck)\b/i.test(lastLines)) good.push("Sign-off ✓");
  else { issues.push("End with a sign-off and your name: Best regards, / Take care, + name. 結尾要有敬辭和署名。"); score -= 12; }
  if (/[,!]$/.test(lines[lines.length - 1] || "")) { issues.push("Write your name on the last line, after the sign-off. 敬辭下一行寫名字。"); score -= 4; }
  const minParas = target.id === "fce" ? 5 : 4;
  if (paras.length < minParas) { issues.push(`Use paragraphs (now ${paras.length}). ${target.id === "fce" ? "Greeting / opening / one paragraph per point / closing / sign-off." : "Leave a blank line between greeting / purpose / details / closing / sign-off."} 分段，段落之間空一行。`); score -= 8; }
  else good.push(`${paras.length} paragraphs ✓`);
  const body = paras.slice(1, 3).join(" ");
  if (!/\b(I am writing|I'?m writing|I wanted to|I would like to|I'?d like to|just wanted|I am contacting|just letting you know|heads up|I owe|congratulations|thank you for|thanks (a ton |so much )?for|as you (probably )?know|since you asked|this is (a|just a) (friendly |quick )?reminder|I regret|I just heard|I am so|I'?m so|how exciting|great to hear|thanks for your (email|message|letter)|I (totally|completely) (understand|get)|let me (answer|help)|I can (totally |really )?(relate|understand))\b/i.test(body)) {
    issues.push("Say why you are writing near the start: I am writing to… / Thanks for your email — … 開頭要說明寫信目的或回應來信。"); score -= 8;
  } else good.push("Purpose / reply sentence ✓");
  if (!/\b(look(ing)? forward|let me know|hope to|hope you|hope this helps|can'?t wait|see you|hear from you|feel free|please contact|if you have any questions|thank you (again|once again|for your time|in advance)|once again|good luck|write back|you'?ve got this)\b/i.test(paras.slice(-3).join(" "))) {
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
  if (cfg && cfg.points) {
    const ticked = cfg.points.filter((_, i) => store.get(`${cfg.key}-pt${i}`) === "1").length;
    if (ticked < cfg.points.length) { issues.push(`Points covered: ${ticked} / ${cfg.points.length}. Tick each point in the checklist after you answer it — FCE marks every point. 每一點都要回答並勾選。`); score -= (cfg.points.length - ticked) * 5; }
    else good.push("All points ticked ✓");
  }
  if (target.id === "fce") {
    const used = countFrames(text);
    if (used.length >= 3) good.push(`${used.length} B2 patterns ✓ (${used.slice(0, 4).join(", ")})`);
    else { issues.push(`Only ${used.length} B2 pattern${used.length === 1 ? "" : "s"} so far — borrow some bold ones from the grid: enable sb to V, provide sb with, make it easier for sb to, As a result,… 多用粗體句型。`); score -= 5; }
  }
  const g = W.review(text, null, "email", 1).issues.filter(m => !/^(Good length|Develop your answer|Use more complete|Grammar and structure look|End your last sentence)/.test(m));
  g.forEach(m => { issues.push(m); score -= 4; });
  if (!issues.length) issues.push("Great email! Read it aloud once more and check spelling. 很棒！再朗讀一次檢查拼字。");
  return { score: Math.max(0, Math.min(100, score)), issues, good };
}

/* ---------- essay checker ---------- */
function checkEssay(text, target, t) {
  const issues = [], good = [];
  let score = 100;
  if (!text.trim()) return { score: 0, issues: ["Please write your essay first. 請先寫作文。"] };
  const words = W.wordCount(text);
  const paras = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  if (paras.length < 5) { issues.push(`Use 5 paragraphs (now ${paras.length}): introduction, three body paragraphs, conclusion. Leave a blank line between them. 五段：導論、三段主體、結論。`); score -= 10; }
  else good.push(`${paras.length} paragraphs ✓`);
  const intro = paras[0] || "", concl = paras[paras.length - 1] || "", bodies = paras.slice(1, -1);
  if (/\b(I (strongly |firmly )?(believe|think|agree|disagree)|from my perspective|in my (opinion|view)|I am convinced)\b/i.test(intro)) good.push("Opinion in the introduction ✓");
  else { issues.push("State your opinion in the introduction: From my perspective, I strongly believe that… 導論要先表態。"); score -= 8; }
  if (/\b(in conclusion|to conclude|to sum up|overall|all in all)\b/i.test(concl)) good.push("Conclusion signal ✓");
  else { issues.push("Start the last paragraph with In conclusion, … and restate your opinion. 結論用 In conclusion 並重述立場。"); score -= 8; }
  const noEx = bodies.filter(p => !/\b(for example|for instance|such as|when my|at my school|in my (school|class|experience)|research shows|studies show|recently|last year)\b/i.test(p)).length;
  if (bodies.length && noEx) { issues.push(`${noEx} body paragraph${noEx > 1 ? "s have" : " has"} no example. Each body: Topic sentence → Explain → Example → Effect. 每段都要有例子。`); score -= noEx * 5; }
  else if (bodies.length) good.push("Examples in every body paragraph ✓");
  const noEff = bodies.filter(p => !/\b(as a result|consequently|therefore|thus|this means|which means|so that|leads? to|led to)\b/i.test(p)).length;
  if (bodies.length && noEff) { issues.push(`${noEff} body paragraph${noEff > 1 ? "s lack" : " lacks"} an effect sentence: As a result, … / Therefore, … 加上結果句。`); score -= noEff * 4; }
  if (t && t.notes) {
    const miss = t.notes.filter(n => !/own idea/i.test(n)).filter(n => { const kw = n.toLowerCase().match(/[a-z]{4,}/g) || []; return kw.length && !kw.some(k => text.toLowerCase().includes(k.slice(0, 5))); });
    if (miss.length) { issues.push(`Did you write about: ${miss.join("; ")}? Both notes must be covered, plus your own idea. 兩個提示要點都要寫到。`); score -= miss.length * 6; }
    else good.push("Both notes covered ✓");
  }
  const used = countFrames(text);
  if (used.length >= 5) good.push(`${used.length} B2 patterns ✓ (${used.slice(0, 5).join(", ")})`);
  else { issues.push(`${used.length} B2 pattern${used.length === 1 ? "" : "s"} so far — aim for 5+: enable sb to V, provide sb with, make it easier for sb to, be more likely to, have a positive impact on, Compared to… 多用粗體高分句型。`); score -= 6; }
  if (words < target.min) { issues.push(`Too short: ${words} words. Aim for ${target.min}–${target.max}. 字數不足。`); score -= words < target.min * .75 ? 15 : 8; }
  else if (words > target.max * 1.12) { issues.push(`Over length: ${words} words (aim ${target.min}–${target.max}). Examiners stop reading at the limit. 字數太多。`); score -= 6; }
  else good.push(`${words} words ✓`);
  const g = W.review(text, null, "essay", 1).issues.filter(m => !/^(Good length|Develop your answer|Use more complete|Grammar and structure look|End your last sentence|Add linking words)/.test(m));
  g.forEach(m => { issues.push(m); score -= 4; });
  if (!issues.length) issues.push("Strong essay! Read it once more for spelling and article/plural errors. 很棒！再檢查拼字、冠詞與複數。");
  return { score: Math.max(0, Math.min(100, score)), issues, good };
}

/* ---------- writing area (tasks, essays, real email) ---------- */
function writingArea(v, cfg) {
  /* cfg: { key, type: note|email|essay, tone, to, prompt, purpose, modelText, modelHtml, defaultTarget, outline, points, task } */
  const type = cfg.type || "email";
  const targets = TARGETS.filter(t => (TARGETS_FOR[type] || TARGETS_FOR.email).includes(t.id));
  let target = targets.find(t => t.id === (store.get(`${cfg.key}-target`) || cfg.defaultTarget)) || targets[0];
  const sec = document.createElement("section");
  sec.className = "sw-section";
  const isEssay = type === "essay";
  sec.innerHTML = `<h3><span>${isEssay ? "Your Essay 我的作文" : "Your Email 我的書信"}</span><span id="timerHost"></span></h3>
    <div class="em-targets">Target 字數目標: ${targets.map(t => `<button class="chip" type="button" data-target="${t.id}">${t.label}</button>`).join("")}</div>
    <textarea id="writeBox" class="sw-write" spellcheck="true" style="margin-top:8px;min-height:${isEssay ? 360 : 280}px" placeholder="${isEssay ? "Introduction with your opinion…&#10;&#10;Body 1: topic sentence → explain → example → effect&#10;&#10;Body 2…&#10;&#10;Body 3 (your own idea)…&#10;&#10;In conclusion, …" : "Dear …,&#10;&#10;I am writing to …&#10;&#10;…&#10;&#10;Best regards,&#10;Your name"}&#10;&#10;(Click a pattern above to add it here. Saved automatically on this device.)"></textarea>
    <div class="sw-meta"><span id="saveStatus">Draft saved on this device</span><span id="wordCount"></span></div>
    <div class="sw-actions">
      <button class="small-button primary-action" type="button" id="checkBtn">&#9989; Check My ${isEssay ? "Essay" : "Email"}</button>
      <button class="small-button" type="button" id="outlineBtn">&#128221; Add Outline</button>
      <button class="small-button" type="button" id="modelBtn">Show Model ${isEssay ? "Essay" : "Email"}</button>
      <button class="small-button" type="button" id="listenBtn">&#128264; Listen to Model</button>
      <button class="small-button" type="button" id="aiBtn">&#129302; Copy for AI Feedback</button>
      <button class="small-button" type="button" id="clearBtn">Clear</button>
    </div>
    <div id="feedback" class="sw-feedback" hidden></div>
    <section class="sw-section" id="modelSec" hidden><h3>Model ${isEssay ? "Essay" : "Email"} 範文 <small style="font-weight:400;color:var(--muted);font-size:13px">(<b>bold</b> = sentence pattern · <span class="kw">yellow</span> = topic vocabulary${cfg.modelWords ? ` · ${cfg.modelWords} words` : ""})</small></h3><div class="em-model" id="modelBox"></div>
      <p class="em-note">${isEssay ? "Borrow the patterns and the paragraph plan, but use your own examples. 借句型與段落架構，例子要自己想。" : "Borrow its patterns, then keep your own email to the word target. 學句型、字數依目標調整。"}</p></section>`;
  v.appendChild(sec);
  const box = $("writeBox"), DK = `${cfg.key}-draft`;
  box.value = store.get(DK) || "";
  const count = () => { $("wordCount").textContent = `${W.wordCount(box.value)} words · target ${target.min}–${target.max}`; };
  const markT = () => sec.querySelectorAll("[data-target]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.target === target.id)));
  let timer = null;
  const makeTimer = () => {
    if (timer) timer.stop();
    timer = W.timer($("timerHost"), { minutes: target.mins, start: target.mins[1], onEnd: () => { $("saveStatus").textContent = "⏰ Time is up! Finish your sentence, then check your writing."; } });
  };
  sec.querySelectorAll("[data-target]").forEach(b => b.addEventListener("click", () => { target = targets.find(t => t.id === b.dataset.target); store.set(`${cfg.key}-target`, target.id); markT(); count(); makeTimer(); }));
  markT(); count(); makeTimer();
  cleanup.push(() => timer && timer.stop());
  box.addEventListener("input", () => { store.set(DK, box.value); $("saveStatus").textContent = "Draft saved on this device"; count(); });
  $("modelBox").innerHTML = cfg.modelHtml;
  $("checkBtn").addEventListener("click", () => {
    const r = isEssay ? checkEssay(box.value, target, cfg.task) : checkEmail(box.value, cfg.tone, target, cfg);
    const fb = $("feedback"); fb.hidden = false;
    fb.innerHTML = `<div><span class="score">${r.score}</span><b>${isEssay ? "Essay checker 作文檢查" : "Email checker 書信檢查"}</b> <small style="color:var(--muted)">— ${isEssay ? "paragraphs, opinion, examples, effects, notes covered, B2 patterns, length and common grammar" : "greeting, purpose, paragraphs, tone, sign-off, points, patterns, length and common grammar"}. For full corrections use “Copy for AI Feedback”.</small></div>
      ${r.good && r.good.length ? `<p style="margin:10px 0 0;color:var(--good);font-weight:700">${r.good.map(esc).join(" · ")}</p>` : ""}
      <ul>${r.issues.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  });
  $("outlineBtn").addEventListener("click", () => {
    if (box.value.trim() && !confirm("Add the outline below your writing?")) return;
    const o = cfg.outline || "Dear …,\n\n[Why you are writing]\n\n[Details]\n\n[Before the end]\n\n[Sign-off],\n[Your name]";
    box.value = box.value.trim() ? `${box.value.trim()}\n\n${o}` : o; box.dispatchEvent(new Event("input")); box.focus();
  });
  $("modelBtn").addEventListener("click", () => { const s = $("modelSec"); s.hidden = !s.hidden; $("modelBtn").textContent = `${s.hidden ? "Show" : "Hide"} Model ${isEssay ? "Essay" : "Email"}`; });
  let speaking = false;
  $("listenBtn").addEventListener("click", () => {
    if (speaking) { SK.stopSpeech(); speaking = false; $("listenBtn").innerHTML = "&#128264; Listen to Model"; return; }
    $("modelSec").hidden = false; $("modelBtn").textContent = `Hide Model ${isEssay ? "Essay" : "Email"}`;
    SK.stopSpeech(); SK.speak(cfg.modelText, 0.92); speaking = true; $("listenBtn").textContent = "■ Stop";
    const poll = setInterval(() => { if (!speechSynthesis.speaking) { clearInterval(poll); speaking = false; const b = $("listenBtn"); if (b) b.innerHTML = "&#128264; Listen to Model"; } }, 500);
    cleanup.push(() => clearInterval(poll));
  });
  $("aiBtn").addEventListener("click", async () => {
    const t = box.value.trim();
    if (!t) { $("saveStatus").textContent = `Write your ${isEssay ? "essay" : "email"} first. 請先寫。`; return; }
    const exam = target.id === "essay" ? "Cambridge B2 First (FCE) Writing Part 1 essay" : target.id === "itep" ? "iTEP Writing Part 2 opinion essay" : target.id === "fce" ? "Cambridge B2 First (FCE) Part 2 / TOEFL email" : "Cambridge B1 Preliminary (PET) / A2 Key (KET) email";
    const prompt = isEssay
      ? `Please check my English essay for the ${exam}.\n\nEssay question:\n${cfg.prompt}\nNotes to cover: ${(cfg.task.notes || []).join("; ")}\n\nMy essay (${W.wordCount(t)} words; target ${target.min}–${target.max}):\n${t}\n\nPlease give me:\n1. Grammar, spelling and word-choice corrections with short explanations in Traditional Chinese.\n2. Did I cover both notes and add my own idea? Does every body paragraph have Topic sentence → Explain → Example → Effect?\n3. Which B2 sentence patterns did I use well (enable sb to V, provide sb with, make it easier for sb to, As a result, Compared to…) and where could I add more?\n4. An improved version that keeps my ideas and stays within ${target.min}–${target.max} words.\n5. A Cambridge-style score (Content, Communicative Achievement, Organisation, Language: 0–5 each).`
      : `Please check my English email for the ${exam} writing test.\n\nTask (${cfg.purpose}; reader: ${cfg.to}; tone: ${TONE[cfg.tone]}):\n${cfg.prompt}${cfg.points ? `\nPoints I must cover: ${cfg.points.join("; ")}` : ""}\n\nMy email (${W.wordCount(t)} words; target ${target.min}–${target.max}):\n${t}\n\nPlease give me:\n1. Grammar, spelling and word-choice corrections with short explanations in Traditional Chinese.\n2. Did I answer every point of the task? Is the tone right for the reader?\n3. Better sentence patterns I could use (opening, purpose, before the end, sign-off${target.id === "fce" ? "; B2 patterns such as enable sb to V, provide sb with, make it easier for sb to, As a result" : ""}).\n4. An improved version that keeps my ideas.\n5. A Cambridge-style score (Content, Communicative Achievement, Organisation, Language: 0–5 each).`;
    $("saveStatus").textContent = (await SK.copyText(prompt)) ? "Copied with the task. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your writing manually.";
  });
  $("clearBtn").addEventListener("click", () => { if (!box.value.trim() || confirm(`Clear this ${isEssay ? "essay" : "email"}?`)) { box.value = ""; store.del(DK); count(); $("feedback").hidden = true; } });
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

/* ---------- task view: notes (L1), emails (L2), essays (L3) ---------- */
function viewTask(v, t) {
  const L = levelOf(t), isEssay = t.type === "essay";
  const model = [];
  t.els.forEach(e => { if (e.html) model.push(e.html); if (e.signoff) model.push(`${esc(e.signoff)}\n${esc(e.name)}`); });
  const modelHtml = model.join("\n\n");
  const i = L.tasks.indexOf(t);
  let head;
  if (isEssay) {
    head = `<p class="eyebrow">Level 3 · FCE Essay ${i + 1} · ${esc(t.source || "")}</p>
      <h2>${esc(t.en)} <span style="color:var(--muted);font-weight:600">${esc(t.zh)}</span></h2>
      <div class="em-meta"><span>Write an essay 寫一篇作文</span><span class="tone semi">Formal / neutral 正式</span><span>220–250 words · 40 min</span></div>
      <div class="sw-prompt"><b>${esc(t.topic)}</b></div>
      <div class="em-notes big">${t.notes.map((n, k) => `<span><b>Note ${k + 1}</b> ${esc(n)}</span>`).join("")}</div>
      <p class="em-hint">Write about the two notes and add your own idea (Body 3). Each body paragraph: Topic sentence → Explain → Example → Effect → Wrap-up. 兩個要點＋自己的想法。</p>`;
  } else if (t.friend) {
    head = `<p class="eyebrow">Level 2 · FCE / TOEFL Email ${i + 1} · ${esc(t.source || "")}</p>
      <h2>${esc(t.en)} <span style="color:var(--muted);font-weight:600">${esc(t.zh)}</span></h2>
      <div class="em-meta"><span>Reply to 回信給: <b>${esc(t.to)}</b></span><span class="tone ${t.tone}">${TONE[t.tone]}</span><span>150–180 words</span></div>
      <div class="em-mail"><div class="em-mail-head"><div><b>From</b> ${esc(t.friend)}</div><div><b>Subject</b> ${esc(t.en)}</div></div><div class="em-mail-body"><p>Hi!</p>${t.prompt.split("\n").map(p => `<p>${esc(p)}</p>`).join("")}<p>Write back soon,<br>${esc(t.friend)}</p></div></div>
      <section class="sw-section" style="margin-top:12px"><h3><span>Points to answer 要回答的要點</span><span class="em-note">tick each one when it is in your email</span></h3>
        <div class="em-points">${t.points.map((p, k) => `<label><input type="checkbox" data-pt="${k}"> <b>${k + 1}.</b> ${esc(p)}</label>`).join("")}</div></section>`;
  } else {
    head = `<p class="eyebrow">Level ${L.n} · ${esc(L.en)} ${i + 1} · ${esc(t.source || "iTEP Set 1")}</p>
      <h2>${esc(t.en)} <span style="color:var(--muted);font-weight:600">${esc(t.zh)}</span></h2>
      <div class="em-meta"><span>To 收件人: <b>${esc(t.to)}</b></span><span class="tone ${t.tone}">${TONE[t.tone]}</span><span>${esc(L.words)}</span></div>
      <div class="sw-prompt">${esc(t.prompt)}</div>`;
  }
  v.innerHTML = `${head}
    <section class="sw-section">
      <h3><span>Plan with the patterns 用句型規劃</span><span><button class="small-button" type="button" id="colBtn">Show model ${isEssay ? "paragraphs" : "sentences"}</button></span></h3>
      <div class="sw-table-wrap"><table class="sw-grid em-plan hide-col3${isEssay ? " essay" : ""}" id="planTable">
        <tr><th style="width:16%">${isEssay ? "Paragraph 段落" : "Part 段落"}</th><th style="width:${isEssay ? 30 : 40}%">Key Sentence Patterns — click to add 點句型加入</th><th>Model Writing 範例</th></tr>
        ${t.els.map(e => `<tr><td><b>${esc(e.el)}</b>${e.flow ? `<small>◆ ${esc(e.flow)}</small>` : ""}</td><td>${e.pats.map(p => `<button type="button" class="pchip" data-el="${esc(e.el)}" data-p="${esc(p)}">${esc(p)}</button>`).join("")}</td><td>${(e.html || "").replace(/\n/g, "<br>")}${e.signoff ? `${e.html ? "<br><br>" : ""}${esc(e.signoff)}<br>${esc(e.name)}` : ""}</td></tr>`).join("")}
      </table></div>
      <p class="em-hint">Tip: replace … / N / V / sb / [Name] with your own ideas. 把 … 、N、V、sb 和 [Name] 換成你自己的內容。</p>
    </section>
    ${t.links && t.links.length ? `<section class="sw-section"><h3>More phrases for this ${isEssay ? "essay" : "email"} 相關句型庫</h3><div class="em-links">${t.links.map(id => { const s = BANK.find(b => b.id === id); return s ? `<button class="small-button" type="button" data-go="bank-${s.id}">${esc(s.en)} ${esc(s.zh)}</button>` : ""; }).join("")}</div></section>` : ""}`;
  wireGo(v);
  const key = `email-${t.id}`;
  v.querySelectorAll("[data-pt]").forEach(cb => {
    cb.checked = store.get(`${key}-pt${cb.dataset.pt}`) === "1";
    cb.addEventListener("change", () => store.set(`${key}-pt${cb.dataset.pt}`, cb.checked ? "1" : "0"));
  });
  const outline = isEssay
    ? `[Introduction: topic + your opinion]\n\n[Body 1: ${t.notes[0] || "note 1"} — topic sentence → explain → example → effect]\n\n[Body 2: ${t.notes[1] || "note 2"} — topic sentence → explain → example → effect]\n\n[Body 3: your own idea]\n\nIn conclusion, [restate your opinion]`
    : t.els.map(e => /greeting/i.test(e.el) ? "Dear …," : /sign-?off/i.test(e.el) && !/closing/i.test(e.el) ? "[Sign-off],\n[Your name]" : /closing \/ sign-?off/i.test(e.el) ? `[${e.el.split("/")[0].trim()}]\n\n[Sign-off],\n[Your name]` : `[${e.el}]`).join("\n\n");
  const box = writingArea(v, { key, type: t.type, tone: t.tone || "semi", to: t.to || "the examiner", prompt: isEssay ? t.topic : t.prompt, purpose: t.en, modelHtml, modelText: plain(modelHtml), modelWords: t.words,
    defaultTarget: isEssay ? "essay" : t.type === "note" ? "note" : "fce", outline, points: t.points, task: t });
  v.querySelectorAll(".pchip").forEach(b => b.addEventListener("click", () => insertAt(box, chipText(b.dataset.el, b.dataset.p))));
  $("colBtn").addEventListener("click", () => { const tb = $("planTable"); tb.classList.toggle("hide-col3"); $("colBtn").textContent = `${tb.classList.contains("hide-col3") ? "Show" : "Hide"} model ${isEssay ? "paragraphs" : "sentences"}`; });
  const nav = document.createElement("section"); nav.className = "sw-section";
  const prev = L.tasks[i - 1], next = L.tasks[i + 1];
  nav.innerHTML = `<div class="em-links"><button class="small-button" type="button" data-go="${L.id}">☰ Level ${L.n} grid</button>${prev ? `<button class="small-button" type="button" data-go="${prev.id}">&larr; ${esc(prev.en)}</button>` : ""}${next ? `<button class="small-button primary-action" type="button" data-go="${next.id}">${esc(next.en)} &rarr;</button>` : L.n < LEVELS.length ? `<button class="small-button primary-action" type="button" data-go="level-${L.n + 1}">Level ${L.n + 1} &rarr;</button>` : `<button class="small-button" type="button" data-go="${REAL.id}">Real Email &rarr;</button>`}</div>`;
  v.appendChild(nav);
  wireGo(nav);
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
  const box = writingArea(v, { key: "email-real-booking", type: "email", tone: "formal", to: r.task.to, prompt: r.task.prompt, purpose: "Requesting information", modelHtml, modelText: r.task.model, defaultTarget: "pet",
    outline: "Dear Sir or Madam,\n\n[Who you are + reservation number]\n\n[Your problem + questions]\n\n[Before the end]\n\nYours faithfully,\n[Your name]" });
  v.querySelectorAll(".pchip").forEach(b => b.addEventListener("click", () => insertAt(box, /^Yours/.test(b.dataset.p) ? "\n\nYours faithfully,\n" : b.dataset.p + " ")));
}

/* ---------- boot ---------- */
const tabs = [...document.querySelectorAll("[data-kind]")];
tabs.forEach(b => b.addEventListener("click", () => { kind = b.dataset.kind; tabs.forEach(x => x.setAttribute("aria-pressed", String(x === b))); renderNav(); }));
$("searchInput").addEventListener("input", renderNav);
window.addEventListener("hashchange", () => { const id = location.hash.slice(1); if (id && id !== current) go(id, true); });
go(location.hash.slice(1) || "guide");
