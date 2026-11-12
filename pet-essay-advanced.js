/* pet-essay-advanced.js — ADVANCED level (B2 / GEPT High-Intermediate / IELTS 6+) for pet-essay.html.
   1) Argument grid (✅ agree / ❌ disagree): listen, read aloud (speech check), type along.
   2) 13-row sentence-pattern grid: student picks AGREE or DISAGREE, writes in column 2,
      column 3 shows the teacher's sample on the SAME side (can be hidden), ✎ ideas can be hidden.
   3) Two model essays (listen-along), B2 vocab, timer, checker, AI prompt.
   Listens for the "pet-topic" event from pet-essay.js. Level + side are remembered on this device. */
(() => {
  const K = window.SpeakingKit, W = window.WritingKit, ADV = window.PET_ESSAY_ADV || {};
  const EL = window.PET_ESSAY_ADV_ELEMENTS, PARAS = window.PET_ESSAY_ADV_PARAS, TEXT = window.PET_ESSAY_ADV_TEXT;
  const $ = id => document.getElementById(id), esc = W.esc;
  const bold = s => esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v)); } catch {} };
  const ROWS = "pet-adv-rows-", DRAFT = "pet-adv-draft-", LEVEL = "pet-essay-level", SIDE = "pet-adv-side";
  const DEFAULT_LABEL = { agree: "AGREE 贊成", disagree: "DISAGREE 反對" };
  let SIDE_LABEL = DEFAULT_LABEL;
  function applyLabels() {
    SIDE_LABEL = (topic && topic.labels) || DEFAULT_LABEL;
    document.querySelectorAll("[data-lbl]").forEach(el => { el.textContent = SIDE_LABEL[el.dataset.lbl]; });
  }

  let topic = null, adv = null, side = load(SIDE, "agree"), level = load(LEVEL, "basic");
  let essaySpans = { agree: [], disagree: [] }, stopEssay = null, playingSide = null, timerApi = null;
  let argRec = null, argActive = null, argStop = null;

  const basic = $("basicMain"), advanced = $("advMain");

  /* ---------- level switch ---------- */
  function setLevel(l) {
    level = l; save(LEVEL, l);
    document.querySelectorAll("[data-level]").forEach(b => b.classList.toggle("active", b.dataset.level === l));
    basic.hidden = l !== "basic"; advanced.hidden = l !== "advanced";
    document.body.classList.toggle("adv-mode", l === "advanced");
    if (l === "advanced") render(); else { stopAll(); if (topic) renderBasicArgs(); }
    try { history.replaceState(null, "", `#${topic ? topic.no : 1}${l === "advanced" ? "-adv" : ""}`); } catch {}
  }
  document.querySelectorAll("[data-level]").forEach(b => b.addEventListener("click", () => setLevel(b.dataset.level)));

  /* ---------- stop audio / mic ---------- */
  function stopEssayAudio() { if (stopEssay) { stopEssay(); stopEssay = null; } playingSide = null; document.querySelectorAll("[data-listen]").forEach(b => { b.innerHTML = "&#128264; Listen"; }); }
  function stopArgCheck() { if (argRec) { argRec.stop(); argRec = null; } if (argActive) { argActive.btn.textContent = "🎤 Read"; argActive.btn.classList.remove("live"); } argActive = null; if (argStop) { argStop(); argStop = null; } }
  function stopAll() { stopEssayAudio(); stopArgCheck(); K.stopSpeech(); }

  /* ---------- 1. argument grid ---------- */
  function argCell(a, s, i) {
    return `<div class="adv-arg" data-side="${s}" data-i="${i}">
      <b>${esc(a.t)}</b>
      <p class="adv-arg-en"></p>
      <p class="adv-arg-zh">${esc(a.zh)}</p>
      <div class="adv-arg-tools">
        <button type="button" class="small-button" data-act="listen" title="Listen 聽">&#128264; Listen</button>
        <button type="button" class="small-button" data-act="read" title="Read aloud check 朗讀檢查">🎤 Read</button>
        <button type="button" class="small-button" data-act="type" title="Type the sentence 打字練習">⌨ Type</button>
      </div>
      <small class="adv-arg-acc" hidden></small>
      <div class="adv-type" hidden><textarea rows="2" spellcheck="false" placeholder="Type the sentence above, then compare…"></textarea><div class="adv-type-out"></div></div>
    </div>`;
  }
  function renderArgs(host, args) {
    host.innerHTML = `<div class="adv-arg-col adv-col-agree"><h4>✅ ${esc(SIDE_LABEL.agree)} — key arguments</h4>${args.agree.map((a, i) => argCell(a, "agree", i)).join("")}</div>
      <div class="adv-arg-col adv-col-disagree"><h4>${SIDE_LABEL === DEFAULT_LABEL ? "❌" : "✅"} ${esc(SIDE_LABEL.disagree)} — key arguments</h4>${args.disagree.map((a, i) => argCell(a, "disagree", i)).join("")}</div>`;
    host.querySelectorAll(".adv-arg").forEach(cell => {
      const a = args[cell.dataset.side][Number(cell.dataset.i)];
      const spans = K.wordSpans(cell.querySelector(".adv-arg-en"), a.en);
      const acc = cell.querySelector(".adv-arg-acc"), typeBox = cell.querySelector(".adv-type"), ta = typeBox.querySelector("textarea"), out = typeBox.querySelector(".adv-type-out");
      cell.querySelector('[data-act="listen"]').addEventListener("click", () => { stopAll(); K.speak(a.en, 0.9); });
      const readBtn = cell.querySelector('[data-act="read"]');
      readBtn.addEventListener("click", () => {
        if (argActive && argActive.btn === readBtn) { stopArgCheck(); return; }
        stopAll();
        if (!K.SR) { acc.hidden = false; acc.textContent = "Live checking needs Chrome or Edge. You can still listen and type."; return; }
        spans.forEach(w => w.el.classList.remove("ok", "miss"));
        argRec = K.recognizer({
          onUpdate(finals, interim) {
            const r = K.align(spans, `${finals.join(" ")} ${interim}`);
            acc.hidden = false; acc.innerHTML = K.accuracySummary(r, false, "sentence").msg;
            if (r.total > 0 && r.ok === r.total) setTimeout(() => { if (argActive && argActive.btn === readBtn) { acc.innerHTML = K.accuracySummary(r, true, "sentence").msg; stopArgCheck(); } }, 400);
          },
          onBlocked(msg) { acc.hidden = false; acc.textContent = msg; stopArgCheck(); }
        });
        argActive = { btn: readBtn }; readBtn.textContent = "■ Stop"; readBtn.classList.add("live");
        acc.hidden = false; acc.textContent = "🎙 Listening… read the sentence aloud.";
        if (!argRec.start()) { acc.textContent = "Could not start the microphone. Try again."; stopArgCheck(); }
      });
      cell.querySelector('[data-act="type"]').addEventListener("click", () => { typeBox.hidden = !typeBox.hidden; if (!typeBox.hidden) ta.focus(); });
      ta.addEventListener("input", () => {
        const typed = ta.value;
        if (!typed.trim()) { out.innerHTML = ""; return; }
        const target = K.wordsFrom(a.en).map(K.normalizeWord).filter(Boolean), got = K.wordsFrom(typed).map(K.normalizeWord).filter(Boolean);
        let ok = 0; got.forEach((w, i) => { if (target[i] === w) ok++; });
        const done = got.length >= target.length && ok === target.length;
        const d = K.diffHtml(typed, a.en);
        out.innerHTML = `<div>${d.originalHtml}</div><small>${ok}/${target.length} words correct${done ? " — ✅ Perfect! 完全正確" : " · yellow = different from the sample"}</small>`;
      });
    });
  }

  /* ---------- 2. writing grid ---------- */
  function setSide(s) {
    side = s; save(SIDE, s);
    document.querySelectorAll("[data-side-pick]").forEach(b => b.classList.toggle("active", b.dataset.sidePick === s));
    renderGrid(); loadDraft();
  }
  document.querySelectorAll("[data-side-pick]").forEach(b => b.addEventListener("click", () => setSide(b.dataset.sidePick)));

  function renderGrid() {
    const rows = load(ROWS + topic.no + "-" + side, []);
    $("advSideWrite").textContent = SIDE_LABEL[side]; $("advSideSample").textContent = SIDE_LABEL[side];
    $("advWriteLabel").innerHTML = `My Essay — <span class="pe-stance ${side === "agree" ? "pe-agree" : "pe-disagree"}">${SIDE_LABEL[side]}</span> 我的作文`;
    $("advGrid").querySelector("tbody").innerHTML = adv[side].map((r, i) =>
      `<tr><td><b>${esc(EL[i][0])}</b><small>${esc(EL[i][1])}</small><i>✎ idea: ${esc(r[0])}</i></td>
       <td><textarea data-row="${i}" aria-label="${esc(EL[i][0])} — my sentence" placeholder="Your ${esc(EL[i][0].toLowerCase())}…">${esc(rows[i] || "")}</textarea></td>
       <td>${bold(r[1])}</td></tr>`).join("");
    $("advGrid").querySelectorAll("textarea").forEach(t => t.addEventListener("input", () => {
      save(ROWS + topic.no + "-" + side, [...$("advGrid").querySelectorAll("textarea")].map(x => x.value));
    }));
  }
  $("advBuild").addEventListener("click", () => {
    const rows = [...$("advGrid").querySelectorAll("textarea")].map(t => t.value.trim());
    const text = PARAS.map(p => p.map(i => rows[i]).filter(Boolean).join(" ")).filter(Boolean).join("\n\n");
    if (!text) { $("advSaveStatus").textContent = "Write some sentences in column 2 first. 請先在第二欄寫句子。"; return; }
    if ($("advWrite").value.trim() && !confirm("Replace the essay below with your grid sentences?")) return;
    $("advWrite").value = text; save(DRAFT + topic.no + "-" + side, text); countWords();
    $("advSaveStatus").textContent = `Joined ${rows.filter(Boolean).length}/13 rows into 5 paragraphs. Now polish it below.`;
    $("advWrite").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  $("advHideCol3").addEventListener("click", () => {
    const g = $("advGrid"); g.classList.toggle("hide-col3");
    $("advHideCol3").textContent = g.classList.contains("hide-col3") ? "Show Column 3" : "Hide Column 3";
  });
  $("advHideHints").addEventListener("click", () => {
    const g = $("advGrid"); g.classList.toggle("hide-hints");
    $("advHideHints").textContent = g.classList.contains("hide-hints") ? "Show ✎ ideas" : "Hide ✎ ideas";
  });

  /* ---------- 3. model essays ---------- */
  function renderEssays() {
    ["agree", "disagree"].forEach(s => {
      const host = $(`advEssay-${s}`); host.innerHTML = ""; essaySpans[s] = [];
      PARAS.forEach(p => {
        const el = document.createElement("p"); el.className = "sw-essay"; el.style.margin = "0 0 12px";
        K.wordSpans(el, p.map(i => adv[s][i][1]).join(" "), essaySpans[s]); host.appendChild(el);
      });
      host.hidden = true; $(`advShow-${s}`).textContent = "Show";
      $(`advWords-${s}`).textContent = `(${W.wordCount(TEXT(adv, s))} words)`;
    });
  }
  document.querySelectorAll("[data-show]").forEach(b => b.addEventListener("click", () => {
    const h = $(`advEssay-${b.dataset.show}`); h.hidden = !h.hidden; b.textContent = h.hidden ? "Show" : "Hide";
  }));
  document.querySelectorAll("[data-listen]").forEach(b => b.addEventListener("click", () => {
    const s = b.dataset.listen;
    if (playingSide === s) { stopEssayAudio(); return; }
    stopAll();
    $(`advEssay-${s}`).hidden = false; $(`advShow-${s}`).textContent = "Hide"; b.textContent = "■ Stop"; playingSide = s;
    stopEssay = K.listenAlong(essaySpans[s], 0.9, () => { stopEssay = null; playingSide = null; b.innerHTML = "&#128264; Listen"; });
  }));

  /* ---------- 4. my essay ---------- */
  const countWords = () => { $("advWordCount").textContent = `${W.wordCount($("advWrite").value)} words`; };
  function loadDraft() { $("advWrite").value = localStorage.getItem(DRAFT + topic.no + "-" + side) || ""; countWords(); $("advFeedback").hidden = true; }
  $("advWrite").addEventListener("input", () => { save(DRAFT + topic.no + "-" + side, $("advWrite").value); countWords(); });
  $("advReview").addEventListener("click", () => W.renderReview($("advFeedback"), W.review($("advWrite").value, TEXT(adv, side), "essay", 250)));
  $("advClear").addEventListener("click", () => {
    if (!confirm(`Clear your ${SIDE_LABEL[side]} essay AND grid sentences for this topic?`)) return;
    $("advWrite").value = ""; try { localStorage.removeItem(DRAFT + topic.no + "-" + side); localStorage.removeItem(ROWS + topic.no + "-" + side); } catch {}
    $("advGrid").querySelectorAll("textarea").forEach(t => { t.value = ""; }); countWords(); $("advFeedback").hidden = true;
  });
  $("advAi").addEventListener("click", async () => {
    const t = $("advWrite").value.trim();
    if (!t) { $("advSaveStatus").textContent = "Write your essay first."; return; }
    const prompt = `Please check my B2-level (Cambridge FCE / GEPT High-Intermediate / IELTS Task 2) agree-disagree essay.\n\nTask: ${topic.prompt} Write about 250–300 words.\nMy position: ${side.toUpperCase()}.\n\nMy essay (${W.wordCount(t)} words):\n${t}\n\nPlease give me:\n1. Grammar, vocabulary and punctuation corrections with short explanations in Traditional Chinese.\n2. Is my thesis clear? Do I have two developed reasons with examples, a counterargument with a rebuttal, and a conclusion?\n3. Which academic sentence patterns (e.g. "Not only … but also", "Admittedly … However", "Rather than + V-ing") could I add?\n4. An improved B2 version (about 280 words) that keeps my ideas and position.\n5. A score estimate: FCE (Content, Communicative Achievement, Organisation, Language: 0–5 each) and an IELTS band.`;
    $("advSaveStatus").textContent = (await K.copyText(prompt)) ? "Copied with the task. Paste it to Claude or ChatGPT." : "Clipboard was blocked — copy your essay manually.";
  });

  /* ---------- render on topic change ---------- */
  function render() {
    if (!topic) return;
    stopAll();
    adv = ADV[topic.no];
    if (!adv) { advanced.innerHTML = `<p class="sw-sub">Advanced content for this topic is coming soon.</p>`; return; }
    $("advMeta").textContent = `Topic ${topic.no} / ${(window.PET_ESSAYS || []).length || 15} · ${topic.theme} · Advanced B2–C1 · about 280–300 words`;
    $("advTitle").textContent = `${topic.en} · ${topic.zh}`;
    $("advPrompt").textContent = `${topic.prompt} Give reasons and examples, and consider the opposite view.\nWrite about 250–300 words.`;
    renderArgs($("advArgs"), adv.args);
    document.querySelectorAll("[data-side-pick]").forEach(b => b.classList.toggle("active", b.dataset.sidePick === side));
    renderGrid();
    $("advVocab").innerHTML = adv.vocab.map(v => `<span><b>${esc(v[0])}</b>${esc(v[1])}</span>`).join("");
    renderEssays();
    if (timerApi) timerApi.stop();
    timerApi = W.timer($("advTimer"), { minutes: [30, 40, 60], start: 40, onEnd: () => { $("advSaveStatus").textContent = "⏰ Time is up! Finish your sentence and check your writing."; } });
    $("advSaveStatus").textContent = "B2 · aim for 250–300 words · 5 paragraphs";
    loadDraft();
  }

  /* ---------- basic (B1) argument grid ---------- */
  function renderBasicArgs() {
    const host = $("basicArgs"), args = (window.PET_ESSAY_ARGS_B1 || {})[topic.no];
    if (!host) return;
    if (!args) { host.closest("section").hidden = true; return; }
    host.closest("section").hidden = false; stopAll(); renderArgs(host, args);
  }
  function onTopic() { applyLabels(); if (level === "advanced") render(); else renderBasicArgs(); }
  document.addEventListener("pet-topic", e => { topic = e.detail; onTopic(); });
  if (/-adv$/.test(location.hash)) level = "advanced";
  // pet-essay.js has already selected the topic by the time this script runs.
  if (window.PET_CURRENT_TOPIC) topic = window.PET_CURRENT_TOPIC;
  applyLabels();
  setLevel(level);
})();
