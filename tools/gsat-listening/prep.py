"""Step 1. Extract one JCEE listening test and prepare the files for alignment.

usage: python3 prep.py <slug> <path-to-JCEE-repo>/listening <workdir>
writes <workdir>/data.json, <workdir>/units.js (window.__U=...), <workdir>/meta.json
"""
import json, re, sys, os

slug, src, work = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(work, exist_ok=True)
html = open(os.path.join(src, slug + '.html'), encoding='utf-8').read()
i = html.index('var DATA=') + 9
d, _ = json.JSONDecoder().raw_decode(html[i:])
audio = sorted(set(re.findall(r'src="(https://www\.ceec\.edu\.tw[^"]+\.mp3)"', html)))
assert len(audio) == 1, audio

def norm(w):
    w = w.lower().replace('’', "'")
    w = re.sub(r"[^a-z0-9']", '', w)
    return w.strip("'")

def toks(t):
    return [x for x in (norm(y) for y in re.split(r"\s+|—|-|…", t)) if x]

SPL = re.compile(r'(?<!\bMr\.)(?<!\bMrs\.)(?<!\bMs\.)(?<!\bDr\.)(?<=[.?!”])\s+(?=[A-Z“"(])')

def subs(script):
    out = []
    for line in script:
        m = re.match(r'^(M|W):\s*', line)
        sp = m.group(1) if m else ''
        body = line[m.end():] if m else line
        parts = SPL.split(body) if len(body) > 90 else [body]
        merged = []
        for p in parts:
            if merged and (len(p) < 18 or len(merged[-1]) < 14):
                merged[-1] += ' ' + p
            else:
                merged.append(p)
        for k, p in enumerate(merged):
            out.append([sp if k == 0 else '', p])
    return out

U, imgs = [], []
for sec in d:
    ex = sec.get('example')
    if ex:
        ex['sub'] = subs(ex['script'])
        U.append([sec['id'] + '-ex', [' '.join(toks(x[1])) for x in ex['sub']]])
        if ex.get('img'): imgs.append(ex['img'])
    for u in sec['units']:
        u['sub'] = subs(u['script'])
        U.append([u['id'], [' '.join(toks(x[1])) for x in u['sub']]])
        imgs += u.get('img') or []

json.dump(d, open(os.path.join(work, 'data.json'), 'w'), ensure_ascii=False)
open(os.path.join(work, 'units.js'), 'w').write('window.__U=' + json.dumps(U, separators=(',', ':'), ensure_ascii=False) + ';')
json.dump({'audio': audio[0], 'imgs': imgs}, open(os.path.join(work, 'meta.json'), 'w'))
print('audio', audio[0])
print('units', len(U), 'lines', sum(len(x[1]) for x in U), 'imgs', len(imgs))
