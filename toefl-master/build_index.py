#!/usr/bin/env python3
"""Rebuild the "TOEFL Writing Master – Index 總目錄" Google Doc in place.

Usage:
  python3 toefl-master/build_index.py <progress.md> <docids.json> <endIndex> <outdir>

- progress.md : the task list in this folder.
- docids.json : {"Email – Apology / Absence": "<current Google Doc id>", ...}
  built each run from a Drive listing of the output folder (scratch file, do
  not commit it).
- endIndex    : the index doc's current end index (last body element's
  endIndex from Google_Docs read_doc).
- outdir      : where to write requests-1.json, requests-2.json, ...
  Send each file's array, in order, as one Google_Docs update_doc call on the
  index doc. The first file deletes the whole body and inserts the new text;
  the rest apply headings and links.
"""
import datetime, json, os, re, sys

DOC_URL = "https://docs.google.com/document/d/{}/edit"
SITE = "https://jenniferenglishteacher.github.io/gept-pet-fce-toefl-ielts-agree-disagree-speaking/"
EM = [("Apology / Absence", "道歉／缺席"), ("Request", "請求"),
      ("Complaint / Problem", "抱怨／問題"), ("Inquiry / Information", "詢問資訊"),
      ("Invitation / Reply", "邀請／回覆"), ("Advice / Suggestion", "建議"),
      ("Application / Job", "應徵／工作"), ("Thanks / Follow-up", "感謝／追蹤")]
DI = [("Education", "教育"), ("Technology & AI", "科技與 AI"),
      ("Social media & influencers", "社群媒體與網紅"), ("Environment", "環境"),
      ("Government & society", "政府與社會"), ("Work & economy", "工作與經濟"),
      ("Health & lifestyle", "健康與生活方式"), ("Ethics & culture", "倫理與文化")]

def u16(s):
    return len(s.encode("utf-16-le")) // 2

def main():
    prog, docids_f, end_index, outdir = sys.argv[1:5]
    end_index = int(end_index)
    ids = json.load(open(docids_f, encoding="utf-8"))
    try:
        from zoneinfo import ZoneInfo
        today = datetime.datetime.now(ZoneInfo("Asia/Taipei")).date()
    except Exception:
        today = datetime.date.today()

    emails, discs = [], []
    for ln in open(prog, encoding="utf-8"):
        m = re.match(r"(\d+) \| (Email|Discussion) \| ([^|]+?) \| (.+) \| \S+\s*$", ln)
        if m:
            (emails if m[2] == "Email" else discs).append((m[1], m[3].strip(), m[4].strip()))

    parts, paras, links = [], [], []
    pos = 1  # insertion starts at body index 1

    def add(line, style=None, link_spans=()):
        nonlocal pos
        parts.append(line + "\n")
        end = pos + u16(line) + 1
        if style:
            paras.append((style, pos, end))
        for a, b, url in link_spans:
            links.append((pos + a, pos + b, url))
        pos = end

    def span(line, sub, url):
        i = line.find(sub)
        return (u16(line[:i]), u16(line[:i]) + u16(sub), url)

    cat_url = lambda kind, cat: DOC_URL.format(ids[f"{kind} – {cat}"]) if f"{kind} – {cat}" in ids else None

    add("2026 新制 TOEFL Writing Master – Index 總目錄", style="TITLE")
    add(f"All prompts and samples so far: {len(emails)} emails（Write an Email · 7 minutes）and "
        f"{len(discs)} academic discussions（Write for an Academic Discussion · 10 minutes）. "
        f"Each link opens the category doc, where every task has its prompt and two samples in 3-column "
        f"tables（提示字 · 學生書寫區 · 範文）; full scenarios are in the category docs. Updated 更新日期：{today}.")
    w = "Practice website 線上練習：TOEFL Academic Discussion Essay ｜ Dashboard 網站首頁"
    add(w, link_spans=[span(w, "TOEFL Academic Discussion Essay", SITE + "toefl-discussion.html"),
                       span(w, "Dashboard 網站首頁", SITE + "dashboard.html")])

    add("Category docs 分類文件", style="HEADING_2")
    for kind, cats, rows in (("Email", EM, emails), ("Discussion", DI, discs)):
        for cat, zh in cats:
            n = sum(1 for r in rows if r[1] == cat)
            line = f"{kind} – {cat} {zh}（{n}）"
            url = cat_url(kind, cat)
            add(line, link_spans=[span(line, f"{kind} – {cat}", url)] if url else ())

    for kind, cats, rows, head in (
            ("Email", EM, emails, f"Email prompts 書信題目（{len(emails)}）"),
            ("Discussion", DI, discs, f"Discussion questions 學術討論題目（{len(discs)}）")):
        add(head, style="HEADING_2")
        zh_of = dict(cats)
        for no, cat, rest in rows:
            # title only (the full scenario lives in the category doc), hyperlinked to it
            title = rest.split(" (", 1)[0] if " (" in rest else rest
            line = f"{no}｜{cat} {zh_of.get(cat, '')}｜{title}"
            url = cat_url(kind, cat)
            sp = []
            if url:
                off = u16(line) - u16(title)
                sp = [(off, off + u16(title), url)]
            add(line, link_spans=sp)

    text = "".join(parts)[:-1]  # drop the final newline
    reqs = []
    if end_index > 2:
        reqs.append({"deleteContentRange": {"range": {"startIndex": 1, "endIndex": end_index - 1}}})
    reqs.append({"insertText": {"location": {"index": 1}, "text": text}})
    for style, a, b in paras:
        reqs.append({"updateParagraphStyle": {"range": {"startIndex": a, "endIndex": b},
                     "paragraphStyle": {"namedStyleType": style}, "fields": "namedStyleType"}})
    for a, b, url in links:
        reqs.append({"updateTextStyle": {"range": {"startIndex": a, "endIndex": b},
                     "textStyle": {"link": {"url": url}, "underline": True,
                                   "foregroundColor": {"color": {"rgbColor": {"red": 0.06, "green": 0.33, "blue": 0.8}}}},
                     "fields": "link,underline,foregroundColor"}})

    os.makedirs(outdir, exist_ok=True)
    # split by serialized size so each requests file stays small enough to paste
    LIMIT = 34000
    n, batch, size = 0, [], 2
    def flush():
        nonlocal n, batch, size
        if batch:
            n += 1
            with open(os.path.join(outdir, f"requests-{n}.json"), "w", encoding="utf-8") as f:
                json.dump(batch, f, ensure_ascii=False)
            batch, size = [], 2
    for r in reqs:
        j = len(json.dumps(r, ensure_ascii=False)) + 2
        if batch and size + j > LIMIT:
            flush()
        batch.append(r); size += j
    flush()
    print(f"{len(emails)} emails, {len(discs)} discussions, {n} request file(s), "
          f"insert {u16(text)} utf-16 units")

if __name__ == "__main__":
    main()
