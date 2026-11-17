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
  {
    no: 2, cat: "Technology & AI",
    title: "AI-Generated Images and Videos", zh: "AI 生成的圖片與影片",
    question: "Will AI-generated images and videos have a positive or a negative influence on society?", questionZh: "AI 生成的圖片與影片對社會的影響是正面還是負面？",
    professor: "This week we are looking at generative AI. Today, anyone can create realistic images and videos in seconds simply by typing a short description. Some people welcome this technology because it makes creative work faster and cheaper, while others worry that it will fill the internet with fake content and threaten the jobs of human creators. Do you think AI-generated images and videos will have a positive or a negative influence on society? Why?",
    david: "I believe AI-generated images and videos will have a positive influence. They allow creators to produce high-quality content quickly and at a lower cost. For example, teachers can use AI visuals to explain complex ideas more clearly, and filmmakers can create realistic scenes without expensive equipment. This makes creativity accessible to everyone.",
    mary: "I disagree with David. AI-generated content can easily be misused to spread misinformation, manipulate public opinion, or create fake videos that look real, which makes it harder to trust what we see online. Moreover, if AI replaces human creators, it may reduce job opportunities and weaken the value of original work.",
    essays: [
      { side: "David", label: "Essay A — Agree with David", zh: "正面影響", rows: [
        { role: "Position", zh: "表明立場", hints: "agree with David's view 同意 David 的看法 / AI-generated 由 AI 生成的 / positive influence 正面影響 / open … to far more people 讓更多人能參與",
          sample: "[[I agree with David's view that]] **AI-generated images and videos** [[will have a positive influence on]] society, [[as]] they open **creative work** to far more people." },
        { role: "New reason", zh: "補充新理由", hints: "I would add that 我想補充 / small businesses 小型企業 / charities 慈善團體 / compete with 與…競爭 / big budgets 龐大預算 / professional advertising 專業廣告 / reach a wide audience 觸及廣大受眾",
          sample: "[[I would add that]] this technology [[also helps]] **small businesses** and **charities** compete with large companies. [[In the past, only]] organisations with big **budgets** could afford professional **advertising**; [[now anyone with]] a good idea can reach a wide **audience**." },
        { role: "Example", zh: "舉例", hints: "my aunt 我阿姨 / runs a bakery 經營麵包店 / could never afford to 一直負擔不起 / hire a designer 請設計師 / AI tool AI 工具 / posters 海報 / online orders 線上訂單 / increased noticeably 明顯增加",
          sample: "[[For example,]] my aunt runs a small bakery, and she could never afford to hire a **designer**. Recently, she started using an **AI tool** to create posters and short videos for **social media**. [[As a result,]] her online orders increased noticeably within a few months." },
        { role: "Respond to Mary", zh: "回應對方", hints: "While … is right that 雖然…說得對 / misinformation 假訊息 / this problem can be reduced by + V-ing 這個問題可以靠…減少 / clear labels 清楚標示 / media literacy 媒體識讀",
          sample: "[[While Mary is right that]] fake videos can spread **misinformation**, [[I believe this problem can be reduced by]] requiring clear **labels** on **AI-generated content** and by teaching **media literacy** at school." },
        { role: "Conclusion", zh: "結論", hints: "For these reasons 基於這些理由 / embrace 欣然接受 / regulate wisely 明智地規範 / rather than 而不是 / fear 害怕",
          sample: "[[For these reasons,]] society should embrace this technology and **regulate** it wisely [[rather than]] fear it." },
      ] },
      { side: "Mary", label: "Essay B — Agree with Mary", zh: "負面影響", rows: [
        { role: "Position", zh: "表明立場", hints: "side with Mary 支持 Mary / In my view 依我之見 / pose a serious threat to 對…構成嚴重威脅",
          sample: "[[I side with Mary on this issue.]] [[In my view,]] **AI-generated images and videos** [[pose a serious threat to]] society." },
        { role: "New reason", zh: "補充新理由", hints: "Another point worth mentioning is that 另一個值得一提的點是 / criminals 罪犯 / powerful tool 強大的工具 / scammers 詐騙者 / copy a face and voice 複製臉和聲音 / be deceived 被騙",
          sample: "[[Another point worth mentioning is that]] this technology gives **criminals** a powerful new tool. **Scammers** can now copy a person's face and voice from a few photos or clips online, [[so even]] careful people may be **deceived**." },
        { role: "Example", zh: "舉例", hints: "a friend of my mother's 我媽媽的朋友 / video call 視訊通話 / appeared to be from 看起來是…打來的 / urgently 緊急地 / so … that 如此…以致於 / convincing 逼真的 / transfer her savings 匯出存款 / deepfake 深偽影片",
          sample: "[[For instance,]] a friend of my mother's received a **video call** that appeared to be from her son, who said he urgently needed money. The face and voice were [[so]] convincing [[that]] she almost transferred her savings before she discovered it was a **deepfake**." },
        { role: "Respond to David", zh: "回應對方", hints: "Although … makes a valid point that 雖然…說得有道理 / AI visuals AI 影像 / save time and money 省時省錢 / these benefits mean little if 如果…這些好處就沒什麼意義 / can no longer 不再能 / believe what they see 相信所見",
          sample: "[[Although David makes a valid point that]] **AI visuals** save time and money for teachers and filmmakers, [[these benefits mean little if]] people can no longer believe what they see." },
        { role: "Conclusion", zh: "結論", hints: "Therefore 因此 / unless 除非 / strict laws 嚴格的法律 / punish misuse 懲罰濫用 / is likely to 很可能 / do more harm than good 弊大於利",
          sample: "[[Therefore, unless]] strict **laws** are introduced to punish **misuse**, **AI-generated content** [[is likely to do more harm than good.]]" },
      ] },
    ]
  },
  {
    no: 3, cat: "Social media & influencers",
    title: "Social Media Influencers and Young People", zh: "網紅對年輕人的影響",
    question: "Do social media influencers have a mainly positive or a mainly negative influence on young people?", questionZh: "社群媒體網紅對年輕人的影響主要是正面還是負面？",
    professor: "This week we are discussing digital media and society. Social media influencers now reach millions of young followers every day, and many teenagers seem to trust them more than traditional celebrities or advertisements. Some people see influencers as inspiring role models who share useful knowledge, while others believe they encourage materialism and unrealistic lifestyles. In your opinion, do social media influencers have a mainly positive or a mainly negative influence on young people? Why?",
    david: "I think influencers have a mainly positive influence. Many of them share free, practical knowledge about topics such as fitness, cooking, study skills and personal finance in a way that is easy to understand. They also show young people that it is possible to turn a passion into a career through creativity and hard work.",
    mary: "I see it differently. Many influencers are paid to promote products, yet their recommendations sound like friendly advice, so young followers are easily persuaded to buy things they do not need. In addition, the perfect bodies and luxurious lifestyles they display are often edited or staged, which can damage teenagers' self-esteem.",
    essays: [
      { side: "David", label: "Essay A — Agree with David", zh: "正面影響", rows: [
        { role: "Position", zh: "表明立場", hints: "agree with David that 同意 David 所說的 / influencer 網紅 / mainly positive influence 主要是正面影響",
          sample: "[[I agree with David that]] **social media influencers** [[have a mainly positive influence on]] young people." },
        { role: "New reason", zh: "補充新理由", hints: "In addition to the points … raised 除了…提到的論點之外 / talk openly about 公開談論 / exam stress 考試壓力 / failure 失敗 / followers 追蹤者 / realise they are not alone 明白自己並不孤單",
          sample: "[[In addition to the points David raised,]] **influencers** often talk openly about personal difficulties [[such as]] exam stress and failure. Hearing these honest stories [[helps]] young **followers** realise that they are not alone." },
        { role: "Example", zh: "舉例", hints: "Take … as an example 以…為例 / used to 以前總是 / anxious 焦慮的 / study vlogger 讀書型影音創作者 / entrance exam 入學考試 / Inspired by 受…啟發 / study routine 讀書作息 / confidence 自信",
          sample: "[[Take my cousin as an example.]] She [[used to]] feel very anxious before every exam. Last year, she began following a **study vlogger** who shared how she had once failed her university entrance exam. [[Inspired by]] her, my cousin adopted a similar study routine, and her grades and confidence improved." },
        { role: "Respond to Mary", zh: "回應對方", hints: "… is right to point out that …指出…是對的 / promote products 推銷產品 / sponsorship 業配、贊助 / However, this problem can be addressed by 然而這個問題可以透過…解決 / stricter 更嚴格的 / disclosure rules 揭露規定",
          sample: "[[Mary is right to point out that]] some influencers promote products without being honest about **sponsorship**. [[However, this problem can be addressed by]] stricter **disclosure rules**." },
        { role: "Conclusion", zh: "結論", hints: "Overall 整體而言 / with a little guidance on 只要在…方面稍加引導 / whom to follow 該追蹤誰 / gain far more than they lose 得到的遠多於失去的",
          sample: "[[Overall, I believe that]] with a little guidance on choosing whom to **follow**, young people [[gain far more than they lose from]] **influencers**." },
      ] },
      { side: "Mary", label: "Essay B — Agree with Mary", zh: "負面影響", rows: [
        { role: "Position", zh: "表明立場", hints: "share …'s concern 和…有同樣的擔憂 / From my perspective 從我的觀點來看 / mainly negative influence 主要是負面影響",
          sample: "[[I share Mary's concern.]] [[From my perspective,]] **social media influencers** [[have a mainly negative influence on]] young people." },
        { role: "New reason", zh: "補充新理由", hints: "What neither student mentioned is that 兩位同學都沒提到的是 / quick and effortless 又快又不費力 / fame 名氣 / income 收入 / unnecessary 不必要的 / go viral 爆紅 / realistic career plan 實際可行的職涯規劃",
          sample: "[[What neither student mentioned is that]] **influencers** make success look quick and effortless. Because **followers** only see the **fame** and the income, some teenagers [[start to believe that]] studying is unnecessary and that **going viral** is a realistic career plan." },
        { role: "Example", zh: "舉例", hints: "A good example is 一個很好的例子是 / film videos 拍影片 / in the hope of + V-ing 希望能… / stay up late 熬夜 / fewer than 少於 / subscribers 訂閱者 / drop sharply 大幅下滑",
          sample: "[[A good example is]] one of my younger brother's classmates. He spent several hours every day filming videos [[in the hope of]] becoming famous, so he often stayed up late and stopped doing his homework. A year later, his **channel** had fewer than a hundred **subscribers**, and his grades had dropped sharply." },
        { role: "Respond to David", zh: "回應對方", hints: "… makes a fair point that …說得有道理 / practical knowledge 實用知識 / Nevertheless 儘管如此 / educational content 教育性內容 / tend to 往往 / attract fewer views 吸引較少觀看數 / entertainment 娛樂 / advertising 廣告",
          sample: "[[David makes a fair point that]] some influencers share practical knowledge. [[Nevertheless,]] such **educational content** [[tends to]] attract far fewer **views** than entertainment and **advertising**." },
        { role: "Conclusion", zh: "結論", hints: "In conclusion 總之 / until 直到…之前 / view … critically 以批判眼光看待 / online content 網路內容 / outweigh the benefits 大於好處",
          sample: "[[In conclusion, until]] young people learn to view **online content** critically, the harm influencers cause [[will outweigh the benefits.]]" },
      ] },
    ]
  },
  {
    no: 4, cat: "Environment",
    title: "Environment or Economic Growth", zh: "環保與經濟成長的取捨",
    question: "Should governments prioritize environmental protection over economic growth?", questionZh: "政府應該把環境保護看得比經濟成長更重要嗎？",
    professor: "This week we are looking at environmental policy. Economic growth creates new jobs and gives people money that they can use to improve their lives. On the other hand, a healthy environment can be enjoyed by both ourselves and future generations. These two goals often seem to conflict, for example when a government must decide whether to approve a new factory or protect a forest. If a government had to choose, should it prioritize environmental protection over economic growth? Why or why not?",
    david: "I think the environment should come first. Economic growth is important, but not at the expense of the planet. Governments should shift towards more environmentally friendly practices, such as investing in renewable energy like solar and wind power. We will all live much healthier lives if the air, water and land around us are clean.",
    mary: "I understand David's point, but I believe economic growth has to be the priority. We need a strong economy to create jobs, reduce poverty and improve standards of living. Not only that, but when companies grow stronger and more profitable, they can afford to develop new technologies that solve our environmental problems.",
    essays: [
      { side: "David", label: "Essay A — Agree with David", zh: "環保優先", rows: [
        { role: "Position", zh: "表明立場", hints: "agree with David that 同意 David 所說的 / prioritize A over B 把 A 看得比 B 重要 / environmental protection 環境保護 / economic growth 經濟成長",
          sample: "[[I agree with David that]] governments should [[prioritize]] **environmental protection** [[over]] **economic growth**." },
        { role: "New reason", zh: "補充新理由", hints: "In addition to his point about 除了他關於…的論點之外 / I would add that 我想補充 / hidden costs 隱藏成本 / be polluted by 被…污染 / industrial development 工業發展 / suffer from 罹患 / asthma 氣喘 / lung cancer 肺癌 / place a heavy burden on 對…造成沉重負擔 / healthcare system 醫療體系",
          sample: "[[In addition to his point about]] clean energy, [[I would add that]] a damaged environment creates enormous hidden costs. When air and water are **polluted** by **industrial development**, more people [[suffer from]] serious illnesses [[such as]] asthma and lung cancer, [[which places a heavy burden on]] the **healthcare system**." },
        { role: "Example", zh: "舉例", hints: "For example 例如 / industrial zone 工業區 / Although 雖然 / bring jobs 帶來工作機會 / breathing problems 呼吸道問題 / a great deal of 大量的 / medical treatment 醫療",
          sample: "[[For example,]] my grandparents live near an **industrial zone** in southern Taiwan. [[Although]] the factories have brought jobs, many of their neighbors have developed breathing problems, and families spend [[a great deal of]] money on medical treatment." },
        { role: "Respond to Mary", zh: "回應對方", hints: "… raised the relevant point that …提出了一個相關的論點 / profitable 有利潤的 / but she does not mention that 但她沒有提到 / arrive far too late 來得太遲 / floods 水災 / heatwaves 熱浪 / right now 此時此刻",
          sample: "[[Mary raised the relevant point that]] profitable companies may develop new technologies to solve environmental problems, [[but she does not mention that]] these solutions might arrive far too late. People are already suffering from **floods** and **heatwaves** right now." },
        { role: "Conclusion", zh: "結論", hints: "Therefore 因此 / the foundation of …的基礎 / healthy society 健康的社會 / sustainable 永續的",
          sample: "[[Therefore, I believe that]] a clean environment is [[the foundation of]] a healthy society and a **sustainable** economy." },
      ] },
      { side: "Mary", label: "Essay B — Agree with Mary", zh: "經濟優先", rows: [
        { role: "Position", zh: "表明立場", hints: "In my opinion 依我之見 / should be prioritized over 應優先於 / so I agree with 所以我同意",
          sample: "[[In my opinion,]] **economic growth** [[should be prioritized over]] **environmental protection**, [[so I agree with Mary.]]" },
        { role: "New reason", zh: "補充新理由", hints: "What neither student mentioned is that 兩位同學都沒提到的是 / environmental regulations 環保法規 / push … to 迫使…去 / move overseas 外移到海外 / As a result 結果 / unemployment rate 失業率 / while 而 / pollution 污染",
          sample: "[[What neither student mentioned is that]] very strict **environmental regulations** often push factories to move overseas. [[As a result,]] the **unemployment rate** rises at home, [[while]] the **pollution** simply moves to another country." },
        { role: "Example", zh: "舉例", hints: "Take … as an example 以…為例 / textile factory 紡織工廠 / emission rules 排放規定 / sharply increase costs 使成本大幅增加 / move production abroad 把生產線移到國外 / along with 連同 / co-workers 同事 / lose one's job 失業",
          sample: "[[Take my uncle as an example.]] He worked at a textile factory for twenty years. When new **emission rules** sharply increased its costs, the owner moved production abroad, and my uncle, [[along with]] three hundred co-workers, lost his job." },
        { role: "Respond to David", zh: "回應對方", hints: "… makes a fair point that …說得有道理 / renewable energy 再生能源 / However, he does not mention that 然而他沒有提到 / depend on 取決於 / solar and wind power 太陽能與風力 / stable supply of electricity 穩定的電力供應 / industry 產業",
          sample: "[[David makes a fair point that]] **renewable energy** can make the environment cleaner. [[However, he does not mention that]] **solar and wind power** [[depend on]] the weather, so they cannot yet provide a stable supply of electricity for industry." },
        { role: "Conclusion", zh: "結論", hints: "Hence 因此 / only when + S + V + can + S + V 唯有…才能…（倒裝） / afford to 負擔得起 / invest in 投資 / green technology 綠色科技 / For this reason 基於這個理由 / the advantages of A outweigh its disadvantages A 的優點勝過缺點",
          sample: "[[Hence, only when]] a country has a strong economy [[can it afford to]] invest in **green technology**. [[For this reason, the advantages of]] economic growth [[outweigh its disadvantages.]]" },
      ] },
    ]
  },
];
