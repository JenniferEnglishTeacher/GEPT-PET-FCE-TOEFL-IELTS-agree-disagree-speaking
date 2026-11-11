# GSAT Listening 學測英聽 — add one test page

Turns one JCEE listening test (https://staresto-create.github.io/JCEE-vocab-questions/listening/) into a
per-question page with per-sentence subtitles, at `gsat-listening/<year>-<slug>.html`, and adds a card for it
to `dashboard.html` (GSAT Listening section, one year group per test).

The audio stays on the CEEC site (the page seeks inside the official mp3). Subtitle timings come from
speech recognition run **inside the user's Chrome** (the sandbox cannot reach ceec.edu.tw), aligned to the
JCEE script.

Files here: `queue.json` (what to build, in order), `prep.py`, `asr.js`, `align.js`, `build.py`, `template.html`.

## Steps

1. **Pick the test.** The first entry in `queue.json` whose `out` file does not exist in `gsat-listening/`.
   If none is left, everything is done: say so and stop.
2. **Get the source.** `git clone --depth 1 https://github.com/staresto-create/JCEE-vocab-questions /tmp/jcee`
3. **Prep.** `python3 tools/gsat-listening/prep.py <slug> /tmp/jcee/listening <work>` — prints the mp3 URL.
4. **Speech recognition (Chrome).** Open a new tab at the mp3 URL. Run the full text of `asr.js` with the
   JavaScript tool. Then poll every ~35 s with
   `await new Promise(r=>setTimeout(r,35000));JSON.stringify({s:__asr.status,k:__asr.k,of:__chunks.length})`
   until `s` is `done` (15–35 min). Polls that time out ("renderer unresponsive") are normal while a chunk is
   decoding — poll again. If `s` starts with `error`, report it and stop.
5. **Align.** In the same tab run, in ONE call, the full text of `<work>/units.js` followed by the full text of
   `align.js`. It returns a report: matched words (expect ≥90 %), unmatched lines per unit, page count.
6. **Copy the timings out.** Tool output is cut at ~1000 characters, so read `__encp[0]`, `__encp[1]`, …
   one page per call and write them joined with **no separator** to `<work>/enc.txt` (one line).
7. **Build.** `python3 tools/gsat-listening/build.py <slug> <work> /tmp/jcee/listening`.
   It stops on a MISMATCH (a page was copied wrong — recheck step 6).
   It lists `check …` lines whose length looks wrong. For each, look at the audio around that time in the tab:
   `const f=(a,b)=>__segs.filter(s=>s[1]>a&&s[0]<b).map(s=>s[0].toFixed(1)+'-'+s[1].toFixed(1)).join(' ');`
   `const g=(a,b)=>__asr.out.filter(x=>x[0]>a&&x[0]<b).map(x=>x[0].toFixed(0)+x[2].trim()).join(' ');`
   Facts that help: before every "Question N." the recording says 第N題 in Chinese (one short segment), then
   English "Question N." (next segment), then the question. Grouped questions (21–22, 33–36 …) have ~12–15 s
   of answer time between them. Fix the numbers in `enc.txt` (tenths of a second) and rebuild. A line that is
   off by a second or two is acceptable; a line that is off by more, or a whole unit that is wrong, is not.
8. **Publish.** Commit `gsat-listening/` and `dashboard.html` to `main`, push. Wait ~1 min, open
   `https://jenniferenglishteacher.github.io/GEPT-PET-FCE-TOEFL-IELTS-agree-disagree-speaking/gsat-listening/<out>`
   in the tab, click one unit's `.play` button with JS, wait 4 s, confirm `aud.currentTime` is inside that
   unit's time range and the audio is playing, then pause it. Close the tab.
9. **Report** in Traditional Chinese, briefly: which test was added, its URL, and any line whose timing you
   could not fix.
