# Jennifer Chen's GEPT/KET/PET/TOEFL/IELTS speaking and writing website

Live site: https://jenniferenglishteacher.github.io/GEPT-PET-FCE-TOEFL-IELTS-agree-disagree-speaking/dashboard.html

## Speaking (every page: mind map typing box · timer · live transcription · clean transcription)
- `index.html` — GEPT Basic Speaking (200 questions)
- `gept-int-speaking.html` — GEPT Intermediate Speaking (100 Q&A + 10 picture descriptions)
- `opinion.html` — Opinion & Topic Speaking
- `descriptive.html` — Descriptive Speaking
- `ielts-part2.html` — IELTS Speaking Part 2

## Writing
- `gept-basic-sentences.html?part=1|2|3` — GEPT Basic Writing Part 1 句子改寫 / Part 2 合併 / Part 3 重組: 238 questions × (original + 3 similar), grouped by grammar block → sub-category, instant check, wrong answers must be rewritten (Word file with answer key in `downloads/`)
- `gept-basic-writing.html` — GEPT Basic Writing Part 4: 49 three-picture stories (grouped into 12 situation themes) with a 3-column sentence-pattern grid and 150-word model essays (Word file in `downloads/`)
- `gept-int-writing.html` — GEPT Intermediate Writing: 10 translations + 10 essays

## Reading & Use of English
- `fce-uoe.html?part=1|2|3` — FCE (B2 First) Use of English Part 1 multiple-choice cloze / Part 2 open cloze / Part 3 word formation: 17 original texts per part (8 gaps each), instant check with English + 繁中 explanations. Data in `fce-uoe-data.js`, engine `fce-uoe.js`, styles `fce-uoe.css`.
- `fce-part4.html?cat=A1` — FCE Use of English Part 4 key word transformation in 28 grammar-pattern categories: 常考句型/例句 grid first, then questions (key-word + word-count check). Data `fce-part4-data.js` (published exam questions excluded), engine `fce-part4.js`.

Shared code: `speaking-kit.js` (speech recognition, transcript clean-up, read-along), `mindmap-kit.js` + `mindmap.css` (mind map typing box), `writing-kit.js` (writing timer, instant writing check).
The GEPT Intermediate content was merged from the former `GEPT-intermediate-writing-speaking` site.
