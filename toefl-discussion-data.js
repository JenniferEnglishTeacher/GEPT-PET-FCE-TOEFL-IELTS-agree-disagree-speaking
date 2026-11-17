/* toefl-discussion-data.js — 2026 TOEFL iBT "Write for an Academic Discussion" (10 minutes, 100+ words).
   One entry per discussion; `cat` must be one of TOEFL_DISCUSSION_CATEGORIES. David = pro side, Mary = con side.
   essays[0] agrees with David, essays[1] agrees with Mary; each has 5 rows:
   Position · New reason · Example · Respond to the other student · Conclusion.
   In `sample`: [[...]] = universal sentence pattern 萬用句型 (yellow highlight), **...** = theme word 主題單字 (bold).
   Add new discussions at the end of TOEFL_DISCUSSIONS (before the closing bracket). */
window.TOEFL_DISCUSSION_CATEGORIES = [
  { name: "Education", zh: "教育" },
  { name: "Technology & AI", zh: "科技與 AI" },
  { name: "Social media & influencers", zh: "社群媒體與網紅" },
  { name: "Environment", zh: "環境" },
  { name: "Government & society", zh: "政府與社會" },
  { name: "Work & economy", zh: "工作與經濟" },
  { name: "Health & lifestyle", zh: "健康與生活方式" },
  { name: "Ethics & culture", zh: "倫理與文化" }
];
window.TOEFL_DISCUSSIONS = [
  {
    no: 1, cat: "Education",
    title: "Mandatory STEAM Courses", zh: "STEAM 課程必修",
    question: "Should STEAM courses be mandatory for all university students?", questionZh: "大學應該把 STEAM 課程列為全體學生的必修嗎？",
    professor: "This week we are discussing how universities should prepare students for a world shaped by artificial intelligence. Some universities now require every student, whatever their major, to take STEAM courses (science, technology, engineering, arts and mathematics). Supporters say that all graduates need technological literacy, while critics argue that students should be free to concentrate on their own field. Should STEAM courses be mandatory for all university students? Why or why not?",
    david: "I think STEAM courses should be mandatory. AI now affects every job, so students in all majors need basic scientific and technological literacy to understand how it works. These courses also train problem-solving and creativity, which employers value in the modern workforce.",
    mary: "I disagree with David. Universities should respect academic diversity and personal interests. Not every student plans to work in a technology-related field, and required STEAM courses take time away from major-specific learning. Besides, critical thinking and ethics can be developed through humanities courses too.",
    essays: [
      { side: "David", label: "Essay A — Agree with David", zh: "支持必修", rows: [
        { role: "Position", zh: "表明立場", hints: "agree with David 同意 David / mandatory 必修的 / technological literacy 科技素養 / no longer optional 不再是可有可無",
          sample: "[[I agree with David's argument that]] **STEAM courses** should be **mandatory** for all university students, [[because]] **technological literacy** [[is no longer optional]]." },
        { role: "New reason", zh: "補充新理由", hints: "I would add that 我想補充 / do more than… 不只是 / informed citizens 有判斷力的公民 / algorithms 演算法 / AI-generated content AI 生成內容 / misinformation 假訊息",
          sample: "[[I would add that]] these courses [[do more than]] prepare students for jobs: [[they also help them become]] **informed citizens**. People who understand data and **algorithms** can judge **AI-generated content** more carefully and [[are less likely to]] be fooled by **misinformation**." },
        { role: "Example", zh: "舉例", hints: "my cousin 我的表姊 / history major 歷史系學生 / required data science course 必修資料科學課 / check statistics 查證統計數據 / use AI tools responsibly 負責任地使用 AI 工具",
          sample: "[[For example,]] my cousin, a **history major**, took a required **data science course** in her first year. [[As a result,]] she learned to check the **statistics** in news reports, and she now uses **AI tools** responsibly when she does research." },
        { role: "Respond to Mary", zh: "回應對方", hints: "While … is right that 雖然…說得對 / time for their own major 主修 / foundation courses 基礎課程 / depth 深度 / common toolkit 共同的基本能力",
          sample: "[[While Mary is right that]] students need time for their own **major**, [[I believe]] one or two **foundation courses** would not reduce that **depth**; they would simply give every graduate a common **toolkit**." },
        { role: "Conclusion", zh: "結論", hints: "For these reasons 基於這些理由 / compulsory 強制的 / so that 以便 / left behind 落後 / AI-driven society AI 驅動的社會",
          sample: "[[For these reasons,]] universities should make basic **STEAM education** **compulsory** [[so that no]] student [[is left behind]] in an **AI-driven society**." },
      ] },
      { side: "Mary", label: "Essay B — Agree with Mary", zh: "反對必修", rows: [
        { role: "Position", zh: "表明立場", hints: "side with Mary 支持 Mary / forcing … to 強迫 / does more harm than good 弊大於利",
          sample: "[[I side with Mary on this issue.]] [[In my view,]] forcing every student to take **STEAM courses** [[does more harm than good]]." },
        { role: "New reason", zh: "補充新理由", hints: "The main reason is that 主要原因是 / forced to study 被迫學習 / no connection to their goals 與目標無關 / memorise 死背 / extra workload 額外課業負擔 / academic pressure 學業壓力",
          sample: "[[The main reason is that]] students learn little from subjects they are forced to study. When a course has no connection to their goals, many simply **memorise** enough to pass the exam, and the extra **workload** [[adds to]] their **academic pressure**." },
        { role: "Example", zh: "舉例", hints: "my older brother 我哥哥 / music major 音樂系學生 / compulsory programming class 必修程式課 / struggle with 吃力 / practice time dropped 練習時間減少 / forgot after the final exam 期末考後就忘了",
          sample: "[[For instance,]] my older brother, a **music major**, had to take a compulsory **programming class**. He spent hours struggling with it, his practice time dropped, and he forgot almost everything after the **final exam**." },
        { role: "Respond to David", zh: "回應對方", hints: "Although … makes a valid point that 雖然…說得有道理 / this can be handled by + V-ing 這可以靠…解決 / optional workshops 選修工作坊 / instead of 而不是 / required courses 必修課",
          sample: "[[Although David makes a valid point that]] AI affects every job, [[this can be handled by]] offering short **optional workshops** on **AI tools** [[instead of]] full **required courses**." },
        { role: "Conclusion", zh: "結論", hints: "Therefore 因此 / encourage 鼓勵 / without + V-ing 而不… / otherwise 否則 / risk + V-ing 冒…的風險 / skilled graduates 有能力的畢業生",
          sample: "[[Therefore,]] universities should encourage **technological literacy** without making it **compulsory**; [[otherwise, they risk]] producing stressed students [[rather than]] skilled **graduates**." },
      ] },
    ]
  },
];
