// Step 2 (browser). Run in a Chrome tab whose URL IS the CEEC mp3 (same origin, so fetch works).
// Starts speech recognition in the background; poll window.__asr.status until 'done' (about 15-35 min).
// The tab stops answering while a chunk is being decoded; a poll that times out is normal, just poll again.
window.__asr = {status: 'loading', out: [], t0: Date.now(), k: 0};
(async () => { try {
  const buf = await fetch(location.href).then(r => r.arrayBuffer());
  const ab = await new OfflineAudioContext(1, 16000, 16000).decodeAudioData(buf);
  const ch = ab.getChannelData(0);
  // energy-based speech segments (20 ms frames)
  const hop = 320, e = [];
  for (let i = 0; i + hop <= ch.length; i += hop) { let s = 0; for (let j = i; j < i + hop; j++) s += ch[j] * ch[j]; e.push(Math.sqrt(s / hop)); }
  const so = [...e].sort((a, b) => a - b);
  const lo = so[Math.floor(e.length * 0.1)], hi = so[Math.floor(e.length * 0.98)], th = lo + (hi - lo) * 0.04;
  const segs = []; let st = -1, last = -1;
  for (let i = 0; i < e.length; i++) { if (e[i] > th) { if (st < 0) st = i; last = i; } else if (st >= 0 && i - last > 15) { if (last - st > 5) segs.push([st * 0.02, (last + 1) * 0.02]); st = -1; } }
  if (st >= 0) segs.push([st * 0.02, (last + 1) * 0.02]);
  window.__segs = segs; window.__dur = ab.duration;
  const chunks = [];
  for (const s of segs) { const c = chunks[chunks.length - 1]; if (c && s[1] - c[0] <= 18 && s[0] - c[1] < 1.2) c[1] = s[1]; else chunks.push([s[0], s[1]]); }
  window.__chunks = chunks.map(c => [Math.max(0, c[0] - 0.3), c[1] + 0.3]);
  const T = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1');
  const p = await T.pipeline('automatic-speech-recognition', 'Xenova/whisper-base.en', {dtype: 'q8'});
  __asr.status = 'running';
  for (const c of __chunks) {
    const piece = ch.slice(Math.floor(c[0] * 16000), Math.floor(c[1] * 16000));
    const r = await p(piece, {return_timestamps: 'word', max_new_tokens: 90, no_repeat_ngram_size: 4});
    const len = c[1] - c[0];
    (r.chunks || []).forEach(w => {
      const a = w.timestamp[0], b = w.timestamp[1] ?? a;
      if (a > len + 0.5) return;           // timestamp outside this chunk = garbage, drop it
      __asr.out.push([+(a + c[0]).toFixed(2), +(Math.min(b, len) + c[0]).toFixed(2), w.text]);
    });
    __asr.k++;
    await new Promise(r => setTimeout(r, 40));
  }
  __asr.status = 'done';
} catch (e) { __asr.status = 'error:' + e; } })();
'started';
