// Step 3 (browser, same tab, after __asr.status==='done' and after pasting units.js which sets window.__U).
// Aligns the script to the recognised words and returns a short report.
// Result: window.__encp = pages of ~900 chars; read __encp[0], __encp[1], ... and join them with no separator.
(function () {
  const norm = w => w.toLowerCase().replace(/’/g, "'").replace(/[^a-z0-9']/g, '').replace(/^'+|'+$/g, '');
  const o = __asr.out, W = [];
  for (let i = 0; i < o.length; i++) { const t = o[i][2].trim(); if (t === '(speaking') { i += 3; continue; } if (/^[\[\]\(]|^Silence$/.test(t)) continue; W.push(o[i]); }
  W.sort((a, b) => a[0] - b[0]);
  const A = []; W.forEach(x => x[2].trim().split(/\s+|—|-/).map(norm).filter(Boolean).forEach(w => A.push([w, x[0], x[1]])));
  const S = []; __U.forEach((u, ui) => u[1].forEach((l, li) => l.split(' ').filter(Boolean).forEach(w => S.push([w, ui, li]))));
  const n = S.length, m = A.length, tr = new Uint8Array((n + 1) * (m + 1));
  let prev = new Int32Array(m + 1), cur = new Int32Array(m + 1);
  for (let j = 0; j <= m; j++) { prev[j] = -j; tr[j] = 2; }
  for (let i = 1; i <= n; i++) { cur[0] = -i; tr[i * (m + 1)] = 1; const si = S[i - 1][0];
    for (let j = 1; j <= m; j++) { let d = prev[j - 1] + (si === A[j - 1][0] ? 3 : -1), u = prev[j] - 1, l = cur[j - 1] - 1, b = d, k = 0; if (u > b) { b = u; k = 1; } if (l > b) { b = l; k = 2; } cur[j] = b; tr[i * (m + 1) + j] = k; }
    const t = prev; prev = cur; cur = t; }
  const mt = new Int32Array(n).fill(-1); let i = n, j = m;
  while (i > 0 && j > 0) { const k = tr[i * (m + 1) + j]; if (k === 0) { if (S[i - 1][0] === A[j - 1][0]) mt[i - 1] = j - 1; i--; j--; } else if (k === 1) i--; else j--; }
  const segs = __segs;
  const snapS = t => { for (const s of segs) { if (s[0] - 0.06 <= t && t <= s[1] + 0.06) return Math.max(0, s[0] - 0.12); if (s[0] > t) break; } return Math.max(0, t - 0.15); };
  const snapE = t => { for (const s of segs) { if (s[0] - 0.06 <= t && t <= s[1] + 0.06) return s[1] + 0.15; if (s[0] > t) break; } return t + 0.3; };
  const back = (t, dur) => { let acc = 0, st = t; for (let k = segs.length - 1; k >= 0; k--) { const s = segs[k]; if (s[1] > t - 0.05) continue; if (st - s[1] > 2.2) break; acc += s[1] - s[0]; st = s[0]; if (acc >= dur * 0.8) break; } return Math.max(0, st - 0.12); };
  const fwd = (t, dur) => { let acc = 0, en = t; const cap = t + dur * 1.6; for (const s of segs) { if (s[0] < t + 0.05) continue; if (s[0] - en > 2.2) break; acc += Math.min(s[1], cap) - s[0]; en = Math.min(s[1], cap); if (acc >= dur * 0.8 || en >= cap) break; } return en + 0.15; };
  const res = {}, rep = []; let si = 0;
  __U.forEach((u, ui) => {
    const L = u[1].map(() => ({idx: []})); while (si < n && S[si][1] === ui) { L[S[si][2]].idx.push(si); si++; }
    const est = k => u[1][k].split(' ').length * 0.33 + 0.4;
    let lt = L.map(x => { const mm = x.idx.filter(k => mt[k] >= 0).map(k => A[mt[k]]); const r = mm.length / Math.max(1, x.idx.length); return mm.length && r >= 0.34 ? [mm[0][1], mm[mm.length - 1][2], r] : null; });
    let last = -1; lt = lt.map((x, k) => { if (!x) return null; if (x[0] < last - 0.5 || x[1] - x[0] > est(k) * 2.5 + 2) return null; last = x[1]; return x; });
    const known = lt.map((x, k) => x ? k : -1).filter(k => k >= 0);
    if (!known.length) { rep.push(u[0] + ' NONE'); return; }
    const lines = lt.map((x, k) => x ? [Math.max(0, x[0] - 0.15), Math.min(x[1] + 0.2, x[0] + est(k) * 2 + 1)] : null);
    lines[known[0]][0] = Math.min(lines[known[0]][0], snapS(lt[known[0]][0]));
    for (let k = known[0] - 1; k >= 0; k--) { const nx = lines[k + 1][0]; lines[k] = [back(nx, est(k)), nx]; }
    for (let k = known[known.length - 1] + 1; k < lines.length; k++) { const pv = lines[k - 1][1]; lines[k] = [pv, fwd(pv - 0.2, est(k))]; }
    for (let k = 0; k < lines.length; k++) if (!lines[k]) { const p = lines[k - 1]; let nx = null; for (let q = k + 1; q < lines.length; q++) if (lines[q]) { nx = lines[q]; break; } lines[k] = [p[1], nx ? nx[0] : p[1] + est(k)]; }
    // an unmatched "Question N." line sits in the speech segment right before the next line
    // (the Chinese 第N題 comes first, then English "Question N.")
    for (let k = 1; k < lines.length - 1; k++) {
      if (lt[k] || !u[1][k].startsWith('question')) continue;
      const nx = lines[k + 1][0]; const ps = segs.filter(s => s[1] <= nx + 0.05).pop();
      if (ps && ps[0] > lines[k - 1][0]) { lines[k] = [ps[0] - 0.1, ps[1] + 0.15]; if (lines[k - 1][1] > lines[k][0]) lines[k - 1][1] = Math.min(lines[k - 1][1], lines[k][0]); }
    }
    for (let k = 1; k < lines.length; k++) { if (lines[k][0] < lines[k - 1][0] + 0.05) lines[k][0] = lines[k - 1][0] + 0.05; if (lines[k][1] < lines[k][0] + 0.3) lines[k][1] = lines[k][0] + 0.3; }
    const le = lines[lines.length - 1]; le[1] = Math.max(le[1], Math.min(snapE(le[1] - 0.25), le[1] + 1.5));
    res[u[0]] = lines;
    const bad = lt.map((x, k) => x ? null : k).filter(v => v != null);
    rep.push(u[0] + (bad.length ? ':' + bad.join(',') : ''));
  });
  window.__res = res;
  window.__enc = Object.keys(res).map(k => k + '=' + res[k].map(l => Math.round(l[0] * 10) + ',' + Math.round(l[1] * 10)).join(' ')).join('|');
  window.__encp = []; for (let p = 0; p < __enc.length; p += 900) __encp.push(__enc.slice(p, p + 900));
  window.__rep = 'matched ' + [...mt].filter(x => x >= 0).length + '/' + n + ' | unmatched lines: ' + rep.join(' ') + ' | pages ' + __encp.length;
})();
__rep;
