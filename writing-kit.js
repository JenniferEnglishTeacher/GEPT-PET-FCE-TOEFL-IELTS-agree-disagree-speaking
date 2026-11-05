/* writing-kit.js — shared helpers for the writing pages: countdown timer, word count, instant offline writing coach.
   The coach rules come from the former GEPT Intermediate Writing & Speaking Studio. */
window.WritingKit = (() => {
  const wordCount = t => (String(t).trim().match(/\b[\w’'-]+\b/g) || []).length;
  const sentenceCount = t => (String(t).match(/[.!?]+(?:\s|$)/g) || []).length || (String(t).trim() ? 1 : 0);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  /* mm:ss countdown. host gets: clock, minute choices, start/pause, reset. */
  function timer(host, { minutes = [10, 15, 20], start = minutes[0], onEnd } = {}) {
    let total = start * 60, left = total, id = null, endsAt = null;
    host.classList.add("sw-timer");
    host.innerHTML = `<span class="clock">00:00</span>
      ${minutes.map(m => `<button type="button" class="time-choice" data-m="${m}">${m} min</button>`).join("")}
      <button type="button" class="small-button primary-action" data-act="go">▶ Start</button>
      <button type="button" class="small-button" data-act="reset">Reset</button>`;
    const clock = host.querySelector(".clock"), go = host.querySelector('[data-act="go"]');
    const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    const draw = () => { clock.textContent = fmt(left); clock.classList.toggle("warning", left <= 60 && left > 0 || left === 0 && !!endsAt); };
    const mark = () => host.querySelectorAll("[data-m]").forEach(b => b.classList.toggle("active", Number(b.dataset.m) * 60 === total));
    const stop = () => { clearInterval(id); id = null; endsAt = null; go.textContent = "▶ Start"; };
    const tick = () => {
      left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)); draw();
      if (left <= 0) { stop(); clock.classList.add("warning"); window.SpeakingKit && SpeakingKit.beep(); onEnd && onEnd(); }
    };
    go.addEventListener("click", () => {
      if (id) { stop(); return; }
      if (left <= 0) left = total;
      endsAt = Date.now() + left * 1000; id = setInterval(tick, 250); go.textContent = "❚❚ Pause";
    });
    host.querySelector('[data-act="reset"]').addEventListener("click", () => { stop(); left = total; draw(); clock.classList.remove("warning"); });
    host.querySelectorAll("[data-m]").forEach(b => b.addEventListener("click", () => { stop(); total = left = Number(b.dataset.m) * 60; mark(); draw(); clock.classList.remove("warning"); }));
    mark(); draw();
    return { stop };
  }

  /* Instant writing coach (offline). mode: translation | essay | story */
  function review(text, sample, mode, minWords) {
    const words = wordCount(text), sentences = sentenceCount(text), issues = [];
    let score = 100;
    if (!text.trim()) return { score: 0, issues: ["Please write your answer first. 請先寫下你的答案。"] };
    const min = minWords || (mode === "essay" ? 120 : mode === "translation" ? 45 : 50);
    if (words < min) { issues.push(`Develop your answer further: ${words} words now; aim for at least ${min}. 內容再多寫一些。`); score -= 22; }
    else issues.push(`Good length: ${words} words.`);
    if (sentences < (mode === "essay" ? 6 : 4)) { issues.push("Use more complete sentences to organise your ideas."); score -= 12; }
    if (/(^|[\s.!?])i(\s|')/.test(text)) { issues.push('Capitalise the pronoun “I”.'); score -= 6; }
    if (/(^|[.!?]\s+)[a-z]/.test(text)) { issues.push("Start every sentence with a capital letter."); score -= 6; }
    if (/\b(he|she|it)\s+(go|do|have|want|like|need|say|think|make|take)\b/i.test(text)) { issues.push("Check third-person singular verbs (he/she/it + -s)."); score -= 7; }
    if (/\b(didn't|did not|doesn't|does not|don't|do not)\s+\w+ed\b/i.test(text)) { issues.push("After did not / does not / do not, use the base form of the verb."); score -= 7; }
    if (/\b(can|could|should|would|will|must)\s+to\b/i.test(text)) { issues.push("A modal verb is followed by the base verb without “to”."); score -= 7; }
    if (/\b(people|students|they|we)\s+(is|was|has)\b/i.test(text)) { issues.push("Check subject–verb agreement with plural subjects."); score -= 7; }
    if (mode === "story") {
      const present = (text.match(/\b(goes|go|is|are|has|have|sees|see|buys|feel|feels|gets)\b/gi) || []).length;
      const past = (text.match(/\b\w+ed\b|\b(went|was|were|had|saw|bought|felt|got|took|came|ran|made|said|found|thought)\b/gi) || []).length;
      if (present > past) { issues.push("A picture story happened in the past — use the past tense (went, was, saw, felt…). 看圖寫作要用過去式。"); score -= 10; }
      if (!/\b(when|after|because|so|then|finally|in the end|one day|last)\b/i.test(text)) { issues.push("Add time words and linkers: One day, When…, After…, because, so, In the end."); score -= 8; }
    }
    if (mode === "essay" && !/\b(because|for example|for instance|however|therefore|first|second|also|furthermore|in conclusion)\b/i.test(text)) { issues.push("Add linking words: for example, however, therefore, in conclusion."); score -= 8; }
    if (!/[.!?]["”']?$/.test(text.trim())) { issues.push("End your last sentence with punctuation."); score -= 4; }
    const long = text.split(/[.!?]+/).filter(s => wordCount(s) > 32).length;
    if (long) { issues.push(`${long} sentence${long > 1 ? "s are" : " is"} longer than 32 words — consider splitting.`); score -= Math.min(10, long * 4); }
    const rep = [...text.toLowerCase().matchAll(/\b(\w+)\s+\1\b/g)].map(m => m[1]);
    if (rep.length) { issues.push(`Repeated word: ${[...new Set(rep)].join(", ")}.`); score -= 5; }
    if (sample) {
      const stop = new Set("the a an and or to of in on at for is are was were it that this with as i he she they we".split(" "));
      const sw = new Set((sample.toLowerCase().match(/\b[a-z']{4,}\b/g) || []).filter(w => !stop.has(w)));
      const uw = new Set(text.toLowerCase().match(/\b[a-z']{4,}\b/g) || []);
      const overlap = [...sw].filter(w => uw.has(w)).length / Math.max(1, sw.size);
      if (mode === "translation" && overlap < .18) { issues.push("Your wording is very different from the sample. Check that every event and detail is translated."); score -= 10; }
      else if (overlap >= .28) issues.push("You covered many key ideas from the sample. 👍");
    }
    if (issues.length === 1 && score >= 95) issues.push("Grammar and structure look strong. Revise once for more precise vocabulary.");
    return { score: Math.max(0, Math.min(100, score)), issues };
  }

  function renderReview(panel, result) {
    panel.hidden = false;
    panel.innerHTML = `<div><span class="score">${result.score}</span><b>Instant writing coach</b> <small style="color:var(--muted)">— quick check of length, grammar and organisation. For a full correction use “Copy for AI Feedback”.</small></div>
      <ul>${result.issues.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
  }

  return { wordCount, sentenceCount, timer, review, renderReview, esc };
})();
