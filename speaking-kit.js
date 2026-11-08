/* speaking-kit.js — shared helpers for Jennifer's speaking practice pages.
   Used by: index.html (Basic), opinion.html, theme.html, descriptive.html.
   Provides: localStorage drafts, read-along word matching, transcript clean-up,
   rule-based grammar polish, text-to-speech with word highlighting, recognition. */
/* ---------- Online class (Google Meet / Zoom) mode ----------
   Problem: Chrome's built-in speech recognition takes the microphone for itself, so a student on
   Google Meet goes silent (and screen sharing can drop) the moment they press Record or Read-Along Check.
   Fix (turned on with the "Online class" button, or a link ending in ?online=1):
   • Chrome that can feed speech recognition a shared mic track → we open the mic once with
     getUserMedia (which Meet can share) and give that track to recognition. Live checking still works.
   • Older browsers → live speech checking is switched off; the timer, sample audio and typing still work,
     and the teacher listens through Meet.
   Runs before every page script, so it covers all pages (including ielts-part2.js, which has its own recognizer). */
(() => {
  const KEY = "jc-online-class";
  let on = false;
  try {
    const q = new URLSearchParams(location.search).get("online");
    if (q === "1" || q === "0") localStorage.setItem(KEY, q);
    on = localStorage.getItem(KEY) === "1";
  } catch {}
  const Native = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  // Chrome versions with on-device speech (SpeechRecognition.available) also accept start(audioTrack).
  const trackOK = !!(Native && typeof Native.available === "function" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  let mode = "off";
  if (on) mode = trackOK ? "shared-mic" : "no-speech";

  if (mode === "shared-mic") {
    let streamP = null;
    const getTrack = () => {
      if (!streamP) streamP = navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
        .catch(err => { streamP = null; throw err; });
      return streamP.then(st => {
        const t = st.getAudioTracks().find(x => x.readyState === "live");
        if (!t) { streamP = null; return getTrack(); }
        return t;
      });
    };
    const fail = (rec, code) => {
      let ev;
      try { ev = new SpeechRecognitionErrorEvent("error", { error: code }); } catch { ev = new Event("error"); ev.error = code; }
      rec.dispatchEvent(ev);
    };
    class MeetSafeRecognition extends Native {
      start() {
        getTrack().then(track => {
          try { super.start(track); } catch (e) { if (!(e && e.name === "InvalidStateError")) fail(this, "audio-capture"); }
        }, () => fail(this, "not-allowed"));
      }
    }
    window.SpeechRecognition = MeetSafeRecognition;
    window.webkitSpeechRecognition = MeetSafeRecognition;
  } else if (mode === "no-speech") {
    try { window.SpeechRecognition = undefined; } catch {}
    try { window.webkitSpeechRecognition = undefined; } catch {}
  }
  window.JCOnlineClass = { on, mode };

  // Floating switch, shown on every page that loads this kit.
  const LABEL = {
    off: "🖥 Online class: OFF",
    "shared-mic": "🖥 Online class: ON",
    "no-speech": "🖥 Online class: ON"
  };
  const NOTE = {
    off: "Turn ON when you use this page during a Google Meet / Zoom class, so your microphone keeps working in the meeting.",
    "shared-mic": "Online class mode is ON: your microphone is shared with Google Meet, so your teacher can still hear you while live checking works. Share your whole screen or window (not 'a tab').",
    "no-speech": "Online class mode is ON: live speech checking is paused so Google Meet keeps your microphone. Read aloud — your teacher listens through Meet. You can still use the timer, Listen, and type your answer. (Update Chrome to get live checking back in this mode.)"
  };
  function addSwitch() {
    if (document.getElementById("jcOnlineSwitch")) return;
    const css = document.createElement("style");
    css.textContent = `#jcOnlineSwitch{position:fixed;right:14px;bottom:14px;z-index:9999;display:flex;flex-direction:column;align-items:flex-end;gap:6px;font:600 13px/1.3 system-ui,sans-serif}
#jcOnlineSwitch button{border:1px solid #b9d6d0;border-radius:999px;padding:8px 14px;background:#fff;color:#0b5e52;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.12);font:inherit}
#jcOnlineSwitch.on button{background:#0f7c80;color:#fff;border-color:#0f7c80}
#jcOnlineSwitch p{display:none;max-width:300px;margin:0;padding:10px 12px;border-radius:8px;background:#fffbe9;border:1px solid #f0dcaa;color:#4a3a10;font-weight:500;box-shadow:0 4px 14px rgba(0,0,0,.12)}
#jcOnlineSwitch:hover p,#jcOnlineSwitch.show p{display:block}
@media print{#jcOnlineSwitch{display:none}}`;
    document.head.appendChild(css);
    const box = document.createElement("div");
    box.id = "jcOnlineSwitch"; if (on) box.className = "on show";
    box.innerHTML = `<p>${NOTE[mode]}</p><button type="button" title="For Google Meet / Zoom classes">${LABEL[mode]}</button>`;
    box.querySelector("button").addEventListener("click", () => {
      try { localStorage.setItem(KEY, on ? "0" : "1"); } catch {}
      const u = new URL(location.href); u.searchParams.delete("online");
      location.replace(u.href); // reload so every page re-reads the microphone setting
    });
    document.body.appendChild(box);
    if (on) setTimeout(() => box.classList.remove("show"), 8000);
  }
  if (document.body) addSwitch(); else document.addEventListener("DOMContentLoaded", addSwitch);

  // In "no-speech" mode the pages show their usual "use Chrome or Edge" notice; replace it with the real reason.
  if (mode === "no-speech") {
    const MSG = "Online class mode: live speech checking is paused so Google Meet keeps your microphone. Speak to your teacher — the timer still runs, and you can type your answer.";
    const OLD = /(not available in this browser|not supported in this browser|needs Chrome or Edge|works in Chrome or Edge)/i;
    const fix = root => {
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let n; (n = w.nextNode());) if (OLD.test(n.nodeValue) && !n.parentNode.closest("#jcOnlineSwitch")) n.nodeValue = MSG;
    };
    const watch = () => { fix(document.body); new MutationObserver(ms => ms.forEach(m => fix(m.target.nodeType === 3 ? m.target.parentNode : m.target)))
      .observe(document.body, { subtree: true, childList: true, characterData: true }); };
    if (document.body) watch(); else document.addEventListener("DOMContentLoaded", watch);
  }
})();

window.SpeakingKit = (() => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  /* ---------- storage ---------- */
  const store = {
    get(key, fallback) { try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} },
  };

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.2, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      o.start(); o.stop(ctx.currentTime + 0.5);
    } catch {}
  }

  async function copyText(text) {
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch {}
    const box = document.createElement("textarea");
    box.value = text; box.style.position = "fixed"; box.style.left = "-9999px";
    document.body.append(box); box.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch {}
    box.remove(); return ok;
  }

  const escapeHtml = text => String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  /* ---------- word normalisation for read-along matching ---------- */
  const ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
  const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  function numWords(n) {
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
    if (n < 1000) return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + numWords(n % 100) : "");
    if (n < 10000) return numWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + numWords(n % 1000) : "");
    return String(n);
  }
  function normParts(raw) {
    let w = raw.toLowerCase().replace(/[’‘`]/g, "'").replace(/%/g, " percent").replace(/&/g, " and ")
      .replace(/\bcan't\b/g, "can not").replace(/\bwon't\b/g, "will not").replace(/n't\b/g, " not")
      .replace(/'re\b/g, " are").replace(/'ve\b/g, " have").replace(/'ll\b/g, " will").replace(/'m\b/g, " am").replace(/'d\b/g, " would");
    const out = [];
    w.split(/[\s\-–—\/]+/).forEach(piece => {
      piece = piece.replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "").replace(/^'+|'+$/g, "");
      if (!piece) return;
      if (/^\d+$/.test(piece) && piece.length <= 4) { numWords(Number(piece)).split(" ").forEach(x => out.push(x)); return; }
      out.push(piece);
    });
    return out;
  }
  const stem = w => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w);

  /* ---------- word spans (for highlighting) ---------- */
  // Splits text into word <span class="w"> elements appended to parent.
  // Supports **bold** markup. Returns [{el, parts}].
  function wordSpans(parent, text, collect = []) {
    String(text).split(/(\*\*[^*]+\*\*)/).forEach(seg => {
      if (!seg) return;
      const bold = seg.startsWith("**") && seg.endsWith("**");
      const body = bold ? seg.slice(2, -2) : seg;
      const host = bold ? parent.appendChild(document.createElement("strong")) : parent;
      body.split(/(\s+)/).forEach(tok => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { host.append(tok); return; }
        const span = document.createElement("span");
        span.className = "w"; span.textContent = tok;
        host.append(span);
        collect.push({ el: span, parts: normParts(tok) });
      });
    });
    return collect;
  }

  /* ---------- read-along alignment (LCS) ---------- */
  // Marks spans green (.ok) / red (.miss up to the furthest word read). Returns {ok, reach, total}.
  function align(spans, spokenText) {
    const sTok = []; spans.forEach((w, wi) => w.parts.forEach(p => sTok.push({ n: stem(p), wi })));
    const hTok = normParts(spokenText).map(stem);
    const n = sTok.length, m = hTok.length;
    const matchedWord = new Uint8Array(spans.length);
    if (n && m) {
      const W = m + 1, dp = new Uint16Array((n + 1) * W);
      for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++)
        dp[i * W + j] = sTok[i - 1].n === hTok[j - 1] ? dp[(i - 1) * W + j - 1] + 1 : Math.max(dp[(i - 1) * W + j], dp[i * W + j - 1]);
      let i = n, j = m;
      // Backtrack preferring the EARLIEST matching sample word (students read from the start),
      // so a repeated word like "every … every … every" is credited at the right place.
      while (i > 0 && j > 0) {
        const up = dp[(i - 1) * W + j];
        if (sTok[i - 1].n === hTok[j - 1] && up < dp[i * W + j]) { matchedWord[sTok[i - 1].wi] = 1; i--; j--; }
        else if (up >= dp[i * W + j - 1]) i--; else j--;
      }
    }
    let reach = -1; matchedWord.forEach((v, i) => { if (v) reach = i; });
    let ok = 0;
    spans.forEach((w, i) => {
      w.el.classList.remove("ok", "miss");
      if (matchedWord[i]) { w.el.classList.add("ok"); ok++; }
      else if (i < reach) w.el.classList.add("miss");
    });
    return { ok, reach: reach + 1, total: spans.length };
  }

  function accuracySummary({ ok, reach, total }, final, what = "text") {
    const pct = reach > 0 ? Math.round((ok / reach) * 100) : 0;
    const coverage = total ? Math.round((reach / total) * 100) : 0;
    let msg = reach
      ? `<b>Accuracy ${pct}%</b> — ${ok} of ${reach} words recognised${final ? ` · you read ${coverage}% of the ${what}` : ""}.`
      : "Start reading…";
    if (final && reach) {
      msg += pct >= 90 ? " Excellent, clear pronunciation!"
        : pct >= 75 ? " Good. Practise the red words, then try again."
        : " Slow down a little and say each red word clearly.";
    }
    return { pct, coverage, msg };
  }

  /* ---------- text-to-speech ---------- */
  function pickVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /en-GB/i.test(v.lang) && /Google|Natural|Online/i.test(v.name)) || voices.find(v => /en-GB/i.test(v.lang)) ||
      voices.find(v => /en-US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang)) || null;
  }
  function speak(text, rate = 0.92) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(); if (v) u.voice = v;
    u.lang = v ? v.lang : "en-GB"; u.rate = rate;
    speechSynthesis.speak(u);
  }
  // Reads spans aloud, highlighting the current word (.speaking). Returns a cancel function.
  function listenAlong(spans, rate, onDone) {
    if (!("speechSynthesis" in window) || !spans.length) { onDone && onDone(); return () => {}; }
    speechSynthesis.cancel();
    let active = true;
    const clear = () => spans.forEach(w => w.el.classList.remove("speaking"));
    // Chunk into sentences: Chrome truncates long utterances.
    const chunks = []; let cur = [];
    spans.forEach((w, i) => { cur.push(w); if (/[.!?]["”’)]*$/.test(w.el.textContent) || i === spans.length - 1) { chunks.push(cur); cur = []; } });
    const voice = pickVoice();
    chunks.forEach((chunk, ci) => {
      const offsets = []; let text = "";
      chunk.forEach(w => { offsets.push(text.length); text += w.el.textContent + " "; });
      const u = new SpeechSynthesisUtterance(text.trim());
      if (voice) u.voice = voice; u.lang = voice ? voice.lang : "en-GB"; u.rate = rate;
      const mark = idx => { if (!active) return; clear(); if (chunk[idx]) chunk[idx].el.classList.add("speaking"); };
      u.onstart = () => mark(0);
      u.onboundary = e => { if (e.name && e.name !== "word") return; let k = 0; while (k + 1 < offsets.length && offsets[k + 1] <= e.charIndex) k++; mark(k); };
      if (ci === chunks.length - 1) u.onend = () => { if (active) { active = false; clear(); onDone && onDone(); } };
      speechSynthesis.speak(u);
    });
    return () => { active = false; speechSynthesis.cancel(); clear(); };
  }
  const stopSpeech = () => { if ("speechSynthesis" in window) speechSynthesis.cancel(); };

  /* ---------- speech recognition (auto-restarting) ---------- */
  function recognizer({ onUpdate, onBlocked }) {
    if (!SR) return null;
    const r = new SR();
    r.lang = "en-US"; r.continuous = true; r.interimResults = true; r.maxAlternatives = 1;
    const api = { finals: [], running: false };
    r.onresult = e => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) { if (t.trim()) api.finals.push(t.trim()); } else interim += t;
      }
      api.lastInterim = interim.trim();
      onUpdate && onUpdate(api.finals, api.lastInterim);
    };
    r.onerror = e => {
      if (["not-allowed", "service-not-allowed", "audio-capture"].includes(e.error)) {
        api.running = false;
        onBlocked && onBlocked(`Microphone or speech typing was blocked (${e.error}). Use Chrome or Edge and allow the microphone.`);
      }
    };
    r.onend = () => { if (api.running) { try { r.start(); } catch {} } };
    api.start = () => { api.finals = []; api.lastInterim = ""; api.running = true; try { r.start(); } catch { return false; } return true; };
    api.stop = () => {
      api.running = false;
      if (api.lastInterim) {
        api.finals.push(api.lastInterim);
        api.lastInterim = "";
        onUpdate && onUpdate(api.finals, "");
      }
      r.onend = null; try { r.stop(); } catch {}
    };
    return api;
  }

  /* ---------- transcript clean-up (punctuation, caps, fillers) ---------- */
  const NOT_PROPER = new Set("i bear desert dome lodge wharf shorts threads reels jade nov oct qs nt d earth may will us it so march okay ok".split(" "));
  const SEED_NOUNS = ["I", "English", "Chinese", "Mandarin", "Taiwanese", "Taiwan", "Taipei", "Tainan", "Taichung", "Kaohsiung", "Japan", "Japanese", "Korea", "Korean", "America", "American", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "January", "February", "April", "June", "July", "August", "September", "October", "November", "December", "Christmas", "YouTube", "YouTuber", "Instagram", "TikTok", "Facebook", "ChatGPT", "AI", "MRT", "IELTS", "GEPT", "TOEFL", "TV", "NBA", "GPS", "CEFR"];
  // Harvest proper nouns from page texts: words that never appear in lowercase in the corpus.
  function properNouns(corpusTexts, seed = SEED_NOUNS) {
    const map = new Map();
    seed.forEach(w => map.set(w.toLowerCase(), w));
    const corpus = corpusTexts.map(t => String(t).replace(/\*\*/g, ""));
    const lowerSeen = new Set((corpus.join(" ").match(/\b[a-z][a-z’']*/g) || []).map(w => w.toLowerCase()));
    corpus.forEach(text => text.split(/(?<=[.!?])\s+/).forEach(sentence => sentence.split(/\s+/).slice(1).forEach(tok => {
      const w = tok.replace(/^[^A-Za-z]+|[^A-Za-z’']+$/g, "").replace(/[’']s$/, "");
      const lw = w.toLowerCase();
      if (/^[A-Z][A-Za-z]+$/.test(w) && !lowerSeen.has(lw) && !NOT_PROPER.has(lw) && !map.has(lw)) map.set(lw, w);
    })));
    return map;
  }

  const FILLERS = /\b(?:u+m+|u+h+m*|e+r+m*|hmm+|ah+|uh-huh|mm+)\b[,.]?\s*/gi;
  const CONTRACTIONS = { im: "I'm", ive: "I've", dont: "don't", doesnt: "doesn't", didnt: "didn't", cant: "can't", couldnt: "couldn't", wouldnt: "wouldn't", shouldnt: "shouldn't", isnt: "isn't", wasnt: "wasn't", arent: "aren't", werent: "weren't", havent: "haven't", hasnt: "hasn't", wont: "won't", youre: "you're", theyre: "they're", thats: "that's", whats: "what's", theres: "there's", hes: "he's", shes: "she's" };
  const MARKERS = ["okay so", "ok so", "alright so", "well", "basically", "honestly", "actually", "personally", "first", "firstly", "second", "secondly", "third", "finally", "lastly", "however", "besides", "also", "anyway", "overall", "in conclusion", "for example", "for instance", "on the other hand", "on the one hand", "to be honest", "in my opinion", "as a result", "in the end", "at first", "after that", "on top of that", "in addition", "moreover", "that said", "of course", "in general", "to sum up", "looking ahead", "luckily", "unfortunately", "surprisingly", "still", "even so"]
    .sort((a, b) => b.length - a.length);
  const QUESTION_START = /^(do|does|did|is|are|was|were|can|could|would|will|should|have|has|why|how come)\b/i;

  function cleaner(nounMap) {
    function cleanSentence(s) {
      s = s.replace(FILLERS, "").replace(/\s+/g, " ").trim();
      if (!s) return "";
      s = s.replace(/\b(\w+)(?:\s+\1\b)+/gi, "$1"); // the the → the
      s = s.replace(/\b[a-z]+\b/gi, w => {
        const lw = w.toLowerCase();
        if (CONTRACTIONS[lw]) return CONTRACTIONS[lw];
        if (lw === "i") return "I";
        return nounMap.get(lw) || w;
      });
      s = s.replace(/\bi'(m|ve|d|ll)\b/gi, (_, x) => `I'${x.toLowerCase()}`);
      s = s.replace(/\s+(but|so that|so I|so we|so it|so they|so he|so she|so you)\b/g, (m, w) => `, ${w}`);
      s = s.replace(/,\s*,/g, ",");
      const low = s.toLowerCase();
      for (const mk of MARKERS) {
        if (low.startsWith(mk + " ") && !low.startsWith(mk + ",")) {
          const rest = s.slice(mk.length + 1);
          s = / so$/.test(mk) ? `${s.slice(0, mk.length - 3)}, so ${rest}` : `${s.slice(0, mk.length)}, ${rest}`;
          break;
        }
      }
      s = s.replace(/^\s*[,;]\s*/, "");
      s = s.charAt(0).toUpperCase() + s.slice(1);
      if (!/[.!?]$/.test(s)) s += QUESTION_START.test(s) && s.split(" ").length < 14 ? "?" : ".";
      return s;
    }
    // segments: optional array of speech-recognition result chunks (pause-based sentence hints)
    return function clean(text, segments = null) {
      const current = String(text).trim();
      if (!current) return "";
      const pieces = segments && segments.length && current === segments.join(" ").trim()
        ? segments.flatMap(seg => seg.split(/(?<=[.!?])\s+/))
        : current.split(/(?<=[.!?])\s+|\n+/);
      return pieces.map(cleanSentence).filter(Boolean).join(" ")
        .replace(/\s+([,.!?])/g, "$1").replace(/([.!?])\s*([a-z])/g, (m, p, c) => `${p} ${c.toUpperCase()}`);
    };
  }

  /* ---------- rule-based grammar polish (from GEPT Basic page) ---------- */
  const GRAMMAR_RULES = [
    { pattern: /\bi\b/g, value: "I", note: "Capitalize the pronoun I." },
    { pattern: /\bim\b/gi, value: "I am", note: "Use the full form: I am." },
    { pattern: /\bive\b/gi, value: "I have", note: "Use the full form: I have." },
    { pattern: /\bid\b/gi, value: "I would", note: "Use the full form: I would." },
    { pattern: /\bdont\b/gi, value: "do not", note: "Use do not." },
    { pattern: /\bdoesnt\b/gi, value: "does not", note: "Use does not." },
    { pattern: /\bdidnt\b/gi, value: "did not", note: "Use did not." },
    { pattern: /\bcant\b/gi, value: "cannot", note: "Use cannot." },
    { pattern: /\bwont\b/gi, value: "will not", note: "Use will not." },
    { pattern: /\bisnt\b/gi, value: "is not", note: "Use is not." },
    { pattern: /\barent\b/gi, value: "are not", note: "Use are not." },
    { pattern: /\bwasnt\b/gi, value: "was not", note: "Use was not." },
    { pattern: /\bwerent\b/gi, value: "were not", note: "Use were not." },
    { pattern: /\bgonna\b/gi, value: "going to", note: "Use going to in formal speaking." },
    { pattern: /\bwanna\b/gi, value: "want to", note: "Use want to in formal speaking." },
    { pattern: /\bkinda\b/gi, value: "kind of", note: "Use kind of in formal speaking." },
    { pattern: /\bcuz\b/gi, value: "because", note: "Use because." },
    { pattern: /\bme and my ([a-z]+)/gi, value: "my $1 and I", note: "Put I after the other person as the subject." },
    { pattern: /\bmore better\b/gi, value: "better", note: "Do not use more before better." },
    { pattern: /\bmore easier\b/gi, value: "easier", note: "Do not use more before easier." },
    { pattern: /\bmore cheaper\b/gi, value: "cheaper", note: "Do not use more before cheaper." },
    { pattern: /\bvery like\b/gi, value: "really like", note: "Use really like, not very like." },
    { pattern: /\bI am agree\b/gi, value: "I agree", note: "Use I agree." },
    { pattern: /\bI born\b/gi, value: "I was born", note: "Use was born." },
    { pattern: /\bI very\b/gi, value: "I am very", note: "Add be before an adjective." },
    { pattern: /\bI so\b/gi, value: "I am so", note: "Add am before so + adjective." },
    { pattern: /\bI go to home\b/gi, value: "I go home", note: "Do not use to before home." },
    { pattern: /\bgo to there\b/gi, value: "go there", note: "Do not use to before there." },
    { pattern: /\blisten music\b/gi, value: "listen to music", note: "Use listen to." },
    { pattern: /\bdiscuss about\b/gi, value: "discuss", note: "Discuss does not need about." },
    { pattern: /\bexplain me\b/gi, value: "explain to me", note: "Use explain to me." },
    { pattern: /\bprefer ([a-z][a-z ]{1,30}) than ([a-z][a-z ]{1,30})(?=[,.!?]|$)/gi, value: "prefer $1 to $2", note: "Use prefer A to B." },
    { pattern: /\bI am (student|teacher|engineer|doctor|nurse|artist|designer|worker|person)\b/gi, value: "I am a $1", note: "Add a/an before singular countable nouns." },
    { pattern: /\bHe is (student|teacher|engineer|doctor|nurse|artist|designer|worker|person)\b/gi, value: "He is a $1", note: "Add a/an before singular countable nouns." },
    { pattern: /\bShe is (student|teacher|engineer|doctor|nurse|artist|designer|worker|person)\b/gi, value: "She is a $1", note: "Add a/an before singular countable nouns." },
    { pattern: /\bIt make me\b/gi, value: "It makes me", note: "Use makes with it." },
    { pattern: /\bIt help me\b/gi, value: "It helps me", note: "Use helps with it." },
    { pattern: /\bHe like\b/gi, value: "He likes", note: "Add -s for he/she/it in present tense." },
    { pattern: /\bShe like\b/gi, value: "She likes", note: "Add -s for he/she/it in present tense." },
    { pattern: /\bIt seem\b/gi, value: "It seems", note: "Add -s for it in present tense." },
    { pattern: /\bpeople is\b/gi, value: "people are", note: "People is plural." },
    { pattern: /\bstudents is\b/gi, value: "students are", note: "Students is plural." },
    { pattern: /\bmany student\b/gi, value: "many students", note: "Use a plural noun after many." },
    { pattern: /\bmany people lives\b/gi, value: "many people live", note: "Use live with plural people." },
    { pattern: /\ba lot of homework are\b/gi, value: "a lot of homework is", note: "Homework is uncountable." },
    { pattern: /\bhomeworks\b/gi, value: "homework", note: "Homework is uncountable." },
    { pattern: /\binformations\b/gi, value: "information", note: "Information is uncountable." },
    { pattern: /\badvices\b/gi, value: "advice", note: "Advice is uncountable." }
  ];

  function capSentence(s) {
    const compact = s.replace(/\s+/g, " ").trim();
    if (!compact) return "";
    const withPeriod = /[.!?]$/.test(compact) ? compact : `${compact}.`;
    return withPeriod.charAt(0).toUpperCase() + withPeriod.slice(1);
  }

  function grammarPolish(text) {
    let result = String(text).trim();
    const notes = [];
    if (!result) return { text: "", notes };
    GRAMMAR_RULES.forEach(({ pattern, value, note }) => {
      pattern.lastIndex = 0;
      if (pattern.test(result)) {
        notes.push(note);
        pattern.lastIndex = 0;
        result = result.replace(pattern, value);
      }
    });
    result = result.replace(/\s+/g, " ").replace(/\s+([,.!?])/g, "$1").replace(/([.!?])(?=[A-Za-z])/g, "$1 ").trim();
    const chunks = (result.match(/[^.!?]+[.!?]*|$/g) || []).map(p => p.trim()).filter(Boolean).map(capSentence);
    return { text: chunks.join(" "), notes: [...new Set(notes)] };
  }

  /* ---------- original vs corrected diff (green/mark highlighting) ---------- */
  const wordsFrom = text => text.match(/[A-Za-z]+(?:'[A-Za-z]+)?|[0-9]+|[^\sA-Za-z0-9]/g) || [];
  const normalizeWord = word => word.toLowerCase().replace(/[^a-z0-9]/g, "");
  function diffHtml(original, corrected) {
    const a = wordsFrom(original), b = wordsFrom(corrected);
    const an = a.map(normalizeWord), bn = b.map(normalizeWord);
    const rows = an.length + 1, cols = bn.length + 1;
    const table = Array.from({ length: rows }, () => Array(cols).fill(0));
    for (let i = an.length - 1; i >= 0; i--) for (let j = bn.length - 1; j >= 0; j--)
      table[i][j] = an[i] && an[i] === bn[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    const aM = new Set(), bM = new Set();
    let i = 0, j = 0;
    while (i < an.length && j < bn.length) {
      if (an[i] && an[i] === bn[j]) { aM.add(i); bM.add(j); i++; j++; }
      else if (table[i + 1][j] >= table[i][j + 1]) i++; else j++;
    }
    const originalHtml = a.map((w, k) => (normalizeWord(w) && !aM.has(k) ? `<mark>${escapeHtml(w)}</mark>` : escapeHtml(w))).join(" ").replace(/\s+([,.!?;:])/g, "$1");
    const correctedHtml = b.map((w, k) => (normalizeWord(w) && !bM.has(k) ? `<span class="corrected-word">${escapeHtml(w)}</span>` : escapeHtml(w))).join(" ").replace(/\s+([,.!?;:])/g, "$1");
    return { originalHtml, correctedHtml };
  }


  /* ---------- "Copy for AI Feedback" prompt (shared by every speaking page) ----------
     opts: { test, level, question, context: [lines], mindmap: [{clue, hint, text}], transcript, seconds } */
  function feedbackPrompt(opts) {
    const o = opts || {};
    const context = (o.context || []).filter(Boolean);
    const mm = (o.mindmap || []).filter(e => e && e.clue);
    const typed = mm.filter(e => e.text);
    const realHint = h => h && !/^key words/i.test(h) && !/^stage \d+$/i.test(h);
    const mmLines = mm.length
      ? mm.map(e => `- ${e.clue}${realHint(e.hint) ? ` (clue: ${e.hint})` : ""}: ${e.text || "(left blank)"}`).join("\n")
      : "(no mind map on this page)";
    const testName = /speaking/i.test(o.test || "") ? o.test : `${o.test || "English"} speaking`;
    return `Here is my oral response to the ${testName} question prompt, my mind map text for my response, and the clean transcription of my speech to text. Please provide a clear improved revision, highlighting in **bold** every revision you made.

=== 1. ${testName} question prompt ===
${o.question || ""}${context.length ? `\n${context.join("\n")}` : ""}${o.seconds ? `\nTime limit: ${o.seconds} seconds` : ""}

=== 2. My mind map (leading clues → what I typed before speaking) ===
${typed.length ? mmLines : `${mmLines}\n(I did not type any mind map notes this time.)`}

=== 3. Clean transcription of my speech-to-text response ===
${o.transcript || ""}

=== What I need ===
1. An improved revision of my response. Keep my own ideas, structure and voice. Fix grammar, word choice and transitions, and add a missing example or conclusion if needed. Put **every change or addition in bold** so I can see exactly what was revised.
2. A short list of the main corrections (my words → revised words), each with a one-line reason.
3. One tip comparing my mind map plan with what I actually said (anything I planned but forgot to say).
Keep the language natural for a ${o.level || "CEFR B1"} learner. Use "First" and "Second", not "Firstly" or "Secondly".`;
  }

  return { SR, store, fmt, beep, copyText, escapeHtml, normParts, stem, wordSpans, align, accuracySummary, pickVoice, speak, listenAlong, stopSpeech, recognizer, properNouns, cleaner, grammarPolish, feedbackPrompt, diffHtml, wordsFrom, normalizeWord };
})();
