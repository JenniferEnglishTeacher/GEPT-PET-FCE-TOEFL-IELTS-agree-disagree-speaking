"""Step 4. Build the page from the alignment, copy images, add the dashboard card.

usage: python3 build.py <slug> <workdir> <path-to-JCEE-repo>/listening
needs <workdir>/data.json, meta.json (from prep.py) and enc.txt (the joined __encp pages).
Run from anywhere; paths are resolved relative to the site repo (two levels up from this file).
"""
import json, os, re, shutil, sys

slug, work, src = sys.argv[1], sys.argv[2], sys.argv[3]
here = os.path.dirname(os.path.abspath(__file__))
repo = os.path.dirname(os.path.dirname(here))
q = {x['slug']: x for x in json.load(open(os.path.join(here, 'queue.json')))}[slug]
d = json.load(open(os.path.join(work, 'data.json')))
meta = json.load(open(os.path.join(work, 'meta.json')))

# --- timings
T = {}
for part in open(os.path.join(work, 'enc.txt')).read().strip().split('|'):
    k, v = part.split('=')
    T[k] = [[int(a) / 10, int(b) / 10] for a, b in (x.split(',') for x in v.split())]
subs = {}
for s in d:
    if s.get('example'): subs[s['id'] + '-ex'] = s['example']['sub']
    for u in s['units']: subs[u['id']] = u['sub']
problems = []
for k, v in subs.items():
    if len(T.get(k, [])) != len(v):
        problems.append(f'MISMATCH {k}: {len(T.get(k, []))} timings vs {len(v)} lines')
        continue
    for i, ((a, b), (sp, t)) in enumerate(zip(T[k], v)):
        est = len(t.split()) * 0.33 + 0.4
        if b - a > est * 2.2 + 1 or b - a < est * 0.45:
            problems.append(f'check {k} line {i}: {a:.1f}-{b:.1f}s ({b-a:.1f}s, expected ~{est:.1f}s) {t[:60]}')
if any(p.startswith('MISMATCH') for p in problems):
    sys.exit('\n'.join(problems))
times = {k: {'s': v[0][0], 'e': round(v[-1][1] + 0.2, 2), 'lines': v} for k, v in T.items()}

# --- page
t = open(os.path.join(here, 'template.html'), encoding='utf-8').read()
t = (t.replace('__NAME__', q['name']).replace('__SLUG__', slug).replace('__Y__', str(q['year']))
      .replace('__AUDIO__', meta['audio'])
      .replace('__DATA__', json.dumps(d, ensure_ascii=False, separators=(',', ':')))
      .replace('__TIMES__', json.dumps(times, separators=(',', ':'))))
assert not re.findall(r'__[A-Z]+__', t)
os.makedirs(os.path.join(repo, 'gsat-listening', 'img'), exist_ok=True)
open(os.path.join(repo, 'gsat-listening', q['out']), 'w', encoding='utf-8').write(t)
for im in meta['imgs']:
    shutil.copy(os.path.join(src, 'img', im), os.path.join(repo, 'gsat-listening', 'img', im))

# --- dashboard card (appended as a new year group at the end of the GSAT Listening section)
p = os.path.join(repo, 'dashboard.html')
h = open(p, encoding='utf-8').read()
if f'gsat-listening/{q["out"]}' not in h:
    start = h.index('<section class="skill" data-skill="gsat-listening">')
    end = h.index('</section>', start)
    card = f'''      <h3 class="year-head">{q['year']} 年度</h3>
      <div class="grid">
      <article data-id="gsat-listening-{q['year']}-{slug}" data-category="gsat tests" style="--accent:#b0472e">
        <div class="meta"><span>GSAT Listening &middot; {q['year']} 年度</span><span class="count">40 questions</span></div>
        <h2>英聽{q['name']}</h2>
        <p>大考中心公布的{q['name']}，五大題四十題。每一題有自己的播放鍵，只播那一題；字幕逐句亮起，點一句就從那一句重聽，也能只播一句。對完答案看解析、誘答與容易聽錯的地方。</p>
        <div class="details"><span>逐題播放 &middot; 0.75&times; / 0.9&times; / 1&times;</span><span>逐句字幕 + 中文解析</span></div>
        <a class="open" href="gsat-listening/{q['out']}" target="_blank" rel="noopener"><span>Start {q['name']}</span><span class="arrow" aria-hidden="true">&rarr;</span></a>
      </article>
      </div>
    '''
    h = h[:end] + card + h[end:]
    open(p, 'w', encoding='utf-8').write(h)
print('built', q['out'], len(t), 'bytes')
print('\n'.join(problems) if problems else 'no timing warnings')
