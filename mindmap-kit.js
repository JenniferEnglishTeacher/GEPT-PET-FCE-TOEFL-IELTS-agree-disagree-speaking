/* mindmap-kit.js — "My Mind Map" typing box shared by every speaking and writing page.
   Usage: const mm = MindMap.mount(container, { key, center, branches: [{label, hint}], title });
          mm.text()  -> plain-text notes (for "Copy for AI Feedback")
   Notes are saved on this device (localStorage) per question key. */
window.MindMap = (() => {
  const PREFIX = "jc-mindmap:";
  const DEFAULT_BRANCHES = [
    { label: "Answer 回答", hint: "your main idea in a few words" },
    { label: "Reason 原因", hint: "because ..." },
    { label: "Example 例子", hint: "for example ... / my experience" },
    { label: "Ending 結尾", hint: "so / in short ..." }
  ];
  const read = key => { try { return JSON.parse(localStorage.getItem(PREFIX + key)) || {}; } catch { return {}; } };
  const write = (key, val) => { try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); } catch {} };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function shortCenter(text) {
    const t = String(text || "").replace(/\s+/g, " ").trim();
    return t.length > 90 ? t.slice(0, 87) + "…" : t;
  }

  function mount(container, opts = {}) {
    const branches = opts.branches && opts.branches.length ? opts.branches : DEFAULT_BRANCHES;
    const key = opts.key || "default";
    let saved = read(key);
    container.innerHTML = `
      <div class="mm-head">
        <span class="mm-title">&#129504; ${esc(opts.title || "My Mind Map 心智圖")}</span>
        <span class="mm-actions">
          <button type="button" class="mm-btn" data-act="copy">Copy</button>
          <button type="button" class="mm-btn" data-act="clear">Clear</button>
        </span>
      </div>
      <p class="mm-hint">Type <b>key words only</b> in each bubble before you speak or write. Your notes stay on this device.</p>
      <div class="mm-board" data-n="${branches.length}">
        <div class="mm-center"><span>${esc(shortCenter(opts.center || "Topic"))}</span></div>
        ${branches.map((b, i) => `
          <label class="mm-branch mm-b${i}">
            <span class="mm-label">${esc(b.label)}</span>
            <textarea rows="2" data-i="${i}" placeholder="${esc(b.hint || "")}">${esc(saved[i] || "")}</textarea>
          </label>`).join("")}
      </div>`;
    container.classList.add("mindmap");
    const areas = [...container.querySelectorAll("textarea")];
    areas.forEach(a => a.addEventListener("input", () => {
      saved = read(key); saved[a.dataset.i] = a.value; write(key, saved);
    }));
    const api = {
      text() {
        const s = read(key);
        return branches.map((b, i) => (s[i] && s[i].trim() ? `- ${b.label}: ${s[i].trim()}` : "")).filter(Boolean).join("\n");
      }
    };
    container.querySelector('[data-act="clear"]').addEventListener("click", () => {
      if (!areas.some(a => a.value.trim()) || confirm("Clear your mind map for this question?")) {
        write(key, {}); areas.forEach(a => { a.value = ""; });
      }
    });
    container.querySelector('[data-act="copy"]').addEventListener("click", async e => {
      const txt = `${opts.center || ""}\n${api.text()}`.trim();
      try { await navigator.clipboard.writeText(txt); e.target.textContent = "Copied ✓"; }
      catch { e.target.textContent = "Blocked"; }
      setTimeout(() => { e.target.textContent = "Copy"; }, 1400);
    });
    return api;
  }
  return { mount, DEFAULT_BRANCHES };
})();
