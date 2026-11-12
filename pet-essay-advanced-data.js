/* pet-essay-advanced-data.js — ADVANCED level (GEPT High-Intermediate / FCE B2 / IELTS 6+, about 280 words) for the 15 agree–disagree topics.
   Built from the teacher's 教師原始版 Google Docs template: ✅/❌ argument grid → 13-row sentence-pattern grid.
   PET_ESSAY_ADV[no] = { args: { agree: [{t, en, zh}], disagree: [...] },  // argument grid (read aloud / type)
                         agree: [[idea hint, model sentence]], disagree: [[...]],  // 13 rows each, **bold** = sentence pattern
                         vocab: [[word, 中文]] } */

window.PET_ESSAY_ADV_ELEMENTS = [
  ["Hook", "開頭：引起注意"],
  ["Background", "背景：議題現況"],
  ["Thesis", "主旨句：立場＋兩個理由"],
  ["Body 1 — Topic sentence", "主題句：理由一"],
  ["Explanation", "說明"],
  ["Example / evidence", "舉例／證據"],
  ["Mini-conclusion", "小結：結果"],
  ["Body 2 — Topic sentence", "主題句：理由二"],
  ["Explanation + example", "說明＋舉例"],
  ["Counterargument — Concession", "反方意見：讓步"],
  ["Rebuttal", "反駁"],
  ["Conclusion — Restate", "結論：重申立場"],
  ["Closing thought", "結語"]
];
window.PET_ESSAY_ADV_PARAS = [[0, 1, 2], [3, 4, 5, 6], [7, 8], [9, 10], [11, 12]];
window.PET_ESSAY_ADV_TEXT = (a, side) => window.PET_ESSAY_ADV_PARAS.map(p => p.map(i => a[side][i][1]).join(" ").replace(/\*\*/g, "")).join("\n\n");

window.PET_ESSAY_ADV = {};

window.PET_ESSAY_ADV[1] = {
  args: {
    agree: [
      { t: "Sleep & the teenage body clock 睡眠與青少年生理時鐘", en: "Teenagers' body clocks naturally shift later, so a 7:30 start forces them to study while their brains are still half asleep.", zh: "青少年的生理時鐘自然偏晚，七點半上課等於逼他們在大腦半睡狀態下學習。" },
      { t: "Better concentration & grades 專注力與成績", en: "Well-rested students concentrate longer and remember more, which is why schools that start later often report higher test scores.", zh: "睡飽的學生專注更久、記得更多，因此晚開始上課的學校常見成績提升。" },
      { t: "Physical & mental health 身心健康", en: "Chronic sleep loss weakens the immune system and is linked to anxiety, so an extra hour protects students' health.", zh: "長期睡眠不足會削弱免疫力並與焦慮有關，多一小時能保護學生健康。" },
      { t: "A proper breakfast 像樣的早餐", en: "With more time in the morning, students can eat breakfast instead of skipping it or grabbing junk food on the way.", zh: "早上多一點時間，學生可以好好吃早餐，而不是跳過或路上隨便買垃圾食物。" }
    ],
    disagree: [
      { t: "Later finish, less free time 放學更晚、自由時間更少", en: "If school starts later, it also ends later, leaving less daylight for sports, clubs and family time.", zh: "上課晚，放學也晚，運動、社團和家庭時間的白天時段就更少。" },
      { t: "Working parents 上班的父母", en: "Most parents must be at work by nine, so a late start creates a childcare gap and transport problems.", zh: "多數父母九點前要上班，晚上課會造成照顧空窗與接送問題。" },
      { t: "Students will just stay up later 學生只會更晚睡", en: "Teenagers who know they can sleep in tend to go to bed even later, so the extra hour is quickly lost.", zh: "知道可以晚起的青少年往往更晚睡，多出來的一小時很快就沒了。" },
      { t: "Discipline for adult life 為成人生活培養紀律", en: "Early mornings train the self-discipline that university lectures and future jobs will demand anyway.", zh: "早起能培養自律，而大學課程和未來工作本來就需要這種紀律。" }
    ]
  },
  agree: [
    ["alarm at 6 a.m. · sleepy classrooms", "**In classrooms across Taiwan,** the first lesson of the day **is often taught to** rows of half-asleep teenagers **who** set their alarms before six."],
    ["7:30 start · homework & cram school until 11 p.m.", "**With** most schools starting at 7:30 and students finishing homework and cram school close to midnight, **it is hardly surprising that** so many of them struggle to stay awake."],
    ["stance: start later · sleep + health", "**For this reason, I firmly agree that** schools should start later in the morning, **because** a later start **not only** improves learning **but also** protects students' health."],
    ["teenage body clock shifts later", "**First and foremost,** starting school later **makes it possible for** teenagers **to** learn when their brains are actually ready."],
    ["melatonin released later · 8–9 hours needed", "**According to** sleep researchers, the teenage body clock naturally shifts later, **which means** that a 7:30 start **forces** students **to** study at a time when they would still be asleep if their bodies had a choice."],
    ["my classmate · falls asleep in the first period", "**Take** my classmate Vivian **as an example.** She goes to bed at midnight, **wakes up at** 5:50 **and** regularly falls asleep during the first period, **no matter how** interesting the lesson is."],
    ["→ more sleep = better memory & grades", "**As a result,** she remembers very little from those morning classes; **had** she **been able to** sleep one more hour, her grades **would** almost certainly **have been** higher."],
    ["health · immune system · anxiety", "**In addition,** a later start **has a considerable impact on** students' physical and mental health."],
    ["breakfast · fewer colds · less stress", "**Rather than** skipping breakfast and rushing out of the door, students **would have time to** eat properly, **and** schools that have made this change **report** fewer sick days **and** lower levels of anxiety among teenagers."],
    ["concession: school finishes later", "**Admittedly,** critics **argue that** a later start simply means a later finish, **leaving** less time for sports and family life."],
    ["rebuttal: 1 hour vs 8 hours of better learning", "**However,** one hour in the afternoon **is a small price to pay for** eight hours of alert, focused learning, **and** schools **could** shorten breaks **to** limit the delay."],
    ["restate: later start = better learning + health", "**In conclusion, I am convinced that** starting school later **would benefit** students far more **than** the traditional early timetable does."],
    ["closing: schools should follow the science", "**Ultimately,** a school **that** respects the science of sleep **is** a school **that** takes learning seriously."]
  ],
  disagree: [
    ["debate: start later? · tired teens", "**Few topics divide** students and parents as sharply **as** the question of **when** the school day should begin."],
    ["cities abroad tried later starts · mixed results", "**Although** some schools overseas **have experimented with** later start times, the results **have been** far less impressive **than** supporters claim."],
    ["stance: keep the current time · family + discipline", "**From my point of view,** schools should **not** start later, **because** a later start **would disrupt** family life **and** teach students the wrong lesson about discipline."],
    ["working parents · 9 a.m. jobs", "**To begin with,** a later school day **is simply incompatible with** the schedules of working parents."],
    ["childcare gap · transport · younger siblings", "**Since** most parents **have to** be at work by nine, a 9:00 or 9:30 start **would leave** younger children unsupervised at home **or** force families to pay for extra childcare."],
    ["my neighbour · drives 2 kids before work", "**My neighbour, for instance,** drops her two children at school at 7:20 **before** driving forty minutes to her office; **if** school **started** an hour later, **she would have no way to** get them there."],
    ["→ stress shifts from students to parents", "**Consequently,** the stress **would** not disappear — it **would** simply **be shifted** from teenagers **to** their parents."],
    ["students will just go to bed later", "**Furthermore,** there **is little evidence that** a later start **actually leads to** more sleep."],
    ["phones · games · 'I can sleep in' · same 6 hours", "**Teenagers who know** they can sleep in **tend to** stay up even later on their phones, **so** the extra hour **is quickly lost**; my cousin's school moved its start to 8:30, **yet** he still gets the same six hours **because** he now games until 1 a.m."],
    ["concession: teenage body clock is real", "**It is true that** teenage body clocks **run** later **than** adults', **and** nobody enjoys a 6 a.m. alarm."],
    ["rebuttal: adult life starts early · build the habit", "**Nevertheless,** university lectures, military service **and** most jobs **start** early, **so** learning **to** manage an early routine **now** **prepares** students **for** the reality of adult life."],
    ["restate: keep the current start time", "**For these reasons, I believe** schools should keep their current start time **rather than** reorganising every family's day around a later timetable."],
    ["closing: the answer is earlier bedtimes, not later schools", "**In the end,** the solution to tired teenagers **lies in** earlier bedtimes, **not** later schools."]
  ],
  vocab: [["body clock", "生理時鐘"], ["concentrate", "專心"], ["chronic", "長期的"], ["immune system", "免疫系統"], ["incompatible with", "與…不相容"], ["unsupervised", "無人看管的"], ["disrupt", "擾亂"], ["self-discipline", "自律"]]
};

window.PET_ESSAY_ADV[2] = {
  args: {
    agree: [
      { t: "Addiction by design 被設計成讓人上癮", en: "Apps and games are deliberately designed to keep users scrolling, and young children have almost no ability to resist.", zh: "App 和遊戲是刻意設計來讓人一直滑的，年幼的孩子幾乎沒有抵抗能力。" },
      { t: "Online dangers 網路危險", en: "Without an adult beside them, children may meet strangers, see violent content or share private information.", zh: "沒有大人在旁，孩子可能遇到陌生人、看到暴力內容或洩露個人資料。" },
      { t: "Development & sleep 發展與睡眠", en: "Screen time replaces outdoor play, reading and face-to-face conversation, and blue light at night ruins sleep.", zh: "螢幕時間取代戶外遊戲、閱讀和面對面交談，夜間藍光也破壞睡眠。" },
      { t: "A basic phone is enough 基本手機就夠了", en: "If safety is the concern, a simple phone or smartwatch without internet lets children call their parents.", zh: "若擔心安全，一支沒有網路的基本手機或智慧手錶就能讓孩子聯絡父母。" }
    ],
    disagree: [
      { t: "Safety & contact 安全與聯絡", en: "A smartphone lets parents locate their child by GPS and lets children call for help in an emergency.", zh: "智慧型手機讓父母能用 GPS 定位孩子，孩子也能在緊急時求助。" },
      { t: "Learning tools 學習工具", en: "Dictionaries, maths apps and English videos turn a phone into a pocket classroom.", zh: "字典、數學 App 和英語影片讓手機變成口袋教室。" },
      { t: "Digital skills for the future 未來的數位能力", en: "Children who learn to use technology responsibly early are better prepared for school and work.", zh: "及早學會負責任地使用科技的孩子，更能為學業和工作做好準備。" },
      { t: "It is about rules, not the device 重點是規範而非裝置", en: "Parental controls and clear time limits solve most problems; banning phones just delays learning self-control.", zh: "家長監控與明確時間限制能解決大部分問題，禁止只會延後學習自我控制。" }
    ]
  },
  agree: [
    ["restaurants · MRT · 6-year-olds with phones", "**It has become a familiar sight** in Taiwan: a six-year-old in a restaurant, head bowed, scrolling through videos on a smartphone **while** the family eats in silence."],
    ["survey: most 10-year-olds own a phone", "**According to recent surveys,** more than half of ten-year-olds **now own** their own smartphone, **and** the age keeps falling."],
    ["stance: no smartphones under 12 · addiction + safety", "**I strongly agree that** children under twelve **should not have** their own smartphones, **since** these devices **are both** highly addictive **and** potentially dangerous."],
    ["designed to be addictive", "**The most serious problem is that** smartphones **are deliberately designed to** capture attention."],
    ["autoplay · likes · children can't resist", "Every app **relies on** autoplay, notifications **and** rewards **to** keep users scrolling, **and** young children, **whose** self-control **is still developing,** **are the least able to** resist them."],
    ["my cousin · 8 · used to play outside", "**My eight-year-old cousin is a case in point.** He **used to** spend afternoons riding his bike, **but** since receiving a phone **he** rarely leaves the sofa."],
    ["→ less exercise · less family talk", "**Consequently,** he **gets** less exercise, **sleeps** badly **and** barely speaks to his family at dinner — **a pattern that** teachers now **describe as** typical."],
    ["online dangers", "**Another compelling reason is that** the internet **exposes** children **to** risks **they cannot** handle."],
    ["strangers · violent content · private photos", "**Without** an adult nearby, a child **may** chat with strangers, **stumble across** violent videos **or** share private photos; **even the strictest** parental controls **cannot** check every message."],
    ["concession: safety · contact parents", "**Admittedly,** many parents **argue that** a phone **keeps** their child safe **and** reachable."],
    ["rebuttal: basic phone / smartwatch", "**However,** a basic phone **or** a smartwatch **without** internet **provides** exactly the same safety **without** the games, the ads **or** the strangers."],
    ["restate: wait until 12+", "**To sum up, I believe** children **are far better off** waiting until their teenage years before owning a smartphone."],
    ["closing: childhood should be spent outdoors", "**A childhood spent** climbing trees and reading books **is worth far more than** one spent staring at a screen."]
  ],
  disagree: [
    ["phones everywhere · banning = unrealistic", "**In a world where** even restaurant menus **are** QR codes, **it is unrealistic to** imagine childhood **without** smartphones."],
    ["some countries ban under 12 · parents worry", "**Although** some parents and politicians **have called for** a ban on smartphones **for** children under twelve, **I believe** this approach **misunderstands** the problem."],
    ["stance: children may have phones · safety + learning", "**In my opinion,** children under twelve **should be allowed to** own a smartphone, **because** the device **keeps** them safe **and** helps them learn, **provided that** parents set clear rules."],
    ["safety: GPS · emergencies", "**First of all,** a smartphone **is** the most effective safety tool **a parent can give** a child."],
    ["locate by GPS · call for help · after cram school", "**With** location sharing, parents **can see** where their child is at any moment, **and** children **can** call **or** message for help **the second** something goes wrong on the way home from cram school."],
    ["my sister · got lost at the night market", "**When** my ten-year-old sister got separated from us at a night market last year, **it was** her phone **that** let us find her **within** five minutes."],
    ["→ independence without fear", "**Thanks to** this, our parents **now allow** her to walk to school alone, **which has made** her far more independent **and** confident."],
    ["learning tools", "**Moreover,** a smartphone **is** a powerful learning tool **when** it is used properly."],
    ["dictionary · maths app · English videos · Duolingo", "My sister **looks up** words **in** an online dictionary, **practises** English **with** Duolingo **and** watches science videos **for** her homework; **in fact,** her English **has improved far more quickly** since she got the phone."],
    ["concession: addictive · online dangers", "**It is true that** games **can be** addictive **and that** the internet **contains** content **unsuitable for** children."],
    ["rebuttal: parental controls · time limits · banning delays self-control", "**Nevertheless,** parental controls **and** a one-hour daily limit **solve** most of these problems, **whereas** a total ban **simply delays** the day **when** a child must learn self-control."],
    ["restate: phones + rules, not a ban", "**In conclusion,** the answer **is not to** ban smartphones **but to** teach children **to** use them responsibly."],
    ["closing: a tool is only as good as its rules", "**After all,** a smartphone **is** a tool, **and** a tool **is only as harmful as** the rules **that** govern it."]
  ],
  vocab: [["deliberately", "刻意地"], ["self-control", "自我控制"], ["notification", "通知"], ["stumble across", "偶然碰到"], ["parental controls", "家長監控"], ["unsuitable for", "不適合"], ["responsibly", "負責任地"], ["be reachable", "聯絡得上"]]
};

window.PET_ESSAY_ADV[3] = {
  args: {
    agree: [
      { t: "Equality & less bullying 平等、減少霸凌", en: "When everyone wears the same clothes, nobody can show off expensive brands, so poorer students are less likely to be teased.", zh: "大家穿一樣，沒人能炫耀名牌，較貧困的學生比較不會被嘲笑。" },
      { t: "Saves time and money 省時省錢", en: "Uniforms end the daily 'what to wear' problem and cost far less than a wardrobe of fashionable clothes.", zh: "制服解決每天「要穿什麼」的問題，也比一整櫃時髦衣服便宜得多。" },
      { t: "School identity & safety 學校認同與安全", en: "A uniform builds pride in the school and makes it easy to spot strangers on campus or students off campus.", zh: "制服建立學校認同感，也容易辨認校園內的陌生人或校外的學生。" },
      { t: "Focus on learning, not fashion 專注學習而非時尚", en: "Without a fashion competition every morning, students arrive calmer and ready to study.", zh: "少了每天早上的時尚競賽，學生到校更平靜、更能專心讀書。" }
    ],
    disagree: [
      { t: "Freedom of expression 表達自由", en: "Clothes are part of a teenager's identity, and uniforms take away one of the few ways students can express themselves.", zh: "衣著是青少年身分的一部分，制服拿走了學生少數能表達自我的方式之一。" },
      { t: "Comfort and climate 舒適與氣候", en: "Thick uniforms are unbearable in Taiwan's humid summers and too thin in winter, which harms concentration.", zh: "厚重制服在台灣潮濕的夏天令人難受，冬天又太薄，影響專注。" },
      { t: "Hidden costs 隱藏成本", en: "Families still have to buy several sets of uniforms, PE kits and winter jackets, often from one expensive supplier.", zh: "家庭仍須購買多套制服、體育服和冬季外套，且常只能向單一昂貴廠商購買。" },
      { t: "Equality is only skin-deep 平等只是表面", en: "Students still judge each other by shoes, phones and bags, so uniforms do not really remove social differences.", zh: "學生仍會以鞋子、手機和書包互相評價，制服並沒有真正消除社會差異。" }
    ]
  },
  agree: [
    ["Monday morning · same white shirts", "**Walk past** any junior high school in Taiwan at 7:30 **and** you will see hundreds of students **dressed in** identical white shirts and navy trousers."],
    ["some schools allow free dress · debate", "**In recent years,** a number of schools **have relaxed** their dress codes, **prompting** a heated debate **over whether** uniforms still have a place in modern education."],
    ["stance: uniforms yes · equality + focus", "**I am firmly of the opinion that** students **should** wear school uniforms, **as** uniforms **promote** equality **and** help students **focus on** what really matters."],
    ["equality · no brand competition", "**The strongest argument in favour of** uniforms **is that** they **put** every student **on an equal footing**."],
    ["poorer students · teased · designer labels", "**When** everyone wears the same clothes, nobody **can** show off designer labels, **and** students from less wealthy families **are far less likely to be** teased **for** what they cannot afford."],
    ["my old school · free dress · girl mocked for cheap shoes", "**At my previous school, which had no uniform,** a classmate **was mocked for** wearing the same cheap sneakers every day **until** she stopped coming to school."],
    ["→ uniforms remove this pressure", "**Uniforms would have removed** that pressure entirely, **allowing** her **to** be judged **by** her character **rather than** her clothes."],
    ["saves time & money · focus", "**In addition,** uniforms **save** families a surprising amount of time and money."],
    ["5 min vs 20 min · no fashion shopping · calmer mornings", "**Instead of** spending twenty minutes **deciding** what to wear, students **can be** out of the door in five, **and** parents **no longer need to** buy a new wardrobe every season; **as a result,** mornings **are** calmer **and** students **arrive** ready to learn."],
    ["concession: self-expression", "**Of course,** some people **claim that** uniforms **suppress** teenagers' individuality."],
    ["rebuttal: express through ideas · clubs · hair · weekends", "**Yet** students **can** express themselves **through** their ideas, their clubs **and** their hairstyles, **not to mention** the clothes they wear every weekend."],
    ["restate: uniforms = fairer, calmer schools", "**All things considered,** school uniforms **create** fairer and calmer schools, **which is why** I believe every school should keep them."],
    ["closing: what we learn matters more than what we wear", "**At the end of the day,** what students **learn** matters far more **than** what they **wear**."]
  ],
  disagree: [
    ["sweating in July · thick uniform", "**Anyone who has sat** through a July afternoon **in** a thick polyester uniform **knows** how little it has to do with learning."],
    ["uniforms traditional in Taiwan · reconsidered abroad", "**While** uniforms **have long been** a tradition in Taiwanese schools, many countries **have abandoned** them, **and** their students **learn** just as well."],
    ["stance: no uniforms · freedom + comfort", "**I therefore disagree that** all students **should** wear uniforms, **because** uniforms **restrict** self-expression **and** are **far from** practical."],
    ["freedom of expression · identity", "**To begin with,** clothing **is** one of the few ways teenagers **can** express **who** they are."],
    ["adolescence = finding identity · uniform = silence", "**Adolescence is** precisely the time **when** young people **explore** their identity, **yet** uniforms **tell them** every morning **that** their individuality **does not matter**."],
    ["my cousin · international school · free dress · confident", "**My cousin, who attends a school without uniforms,** **has become** noticeably more confident **since** she **was allowed to** choose her own clothes, **and** her teachers **say** it has not affected her studies at all."],
    ["→ responsibility: choosing appropriately", "**What is more,** choosing appropriate clothes **teaches** students **to** make sensible decisions — **a skill that** no uniform **can** provide."],
    ["comfort · climate · hidden costs", "**Secondly,** uniforms **are** uncomfortable **and**, **contrary to popular belief,** not even cheap."],
    ["humid summer · 3 sets · PE kit · jacket · one supplier", "In Taiwan's humid summers, students **sweat through** thick shirts **and** struggle to concentrate, **while** parents **still have to** buy three sets of uniforms, a PE kit **and** a winter jacket **from** a single supplier **that** charges **whatever it likes**."],
    ["concession: equality · less bullying", "**Supporters of uniforms often point out that** they **prevent** bullying **over** clothes."],
    ["rebuttal: shoes, phones, bags · teach respect instead", "**However,** students **who want to** compare wealth **simply switch to** shoes, phones **and** bags, **so** the real solution **is to** teach respect, **not to** standardise shirts."],
    ["restate: dress code, not uniform", "**In conclusion,** schools **should** replace uniforms **with** a simple dress code **that** allows comfort **and** personal choice."],
    ["closing: students are individuals, not a uniform crowd", "**After all,** a school **should** educate individuals, **not** produce a crowd of identical shirts."]
  ],
  vocab: [["identical", "完全相同的"], ["on an equal footing", "立足點平等"], ["mock", "嘲弄"], ["suppress", "壓抑"], ["individuality", "個性"], ["polyester", "聚酯纖維（布料）"], ["supplier", "供應商"], ["standardise", "標準化"]]
};

window.PET_ESSAY_ADV[4] = {
  args: {
    agree: [
      { t: "Stress and sleep 壓力與睡眠", en: "Hours of homework after an eight-hour school day leave students exhausted, anxious and short of sleep.", zh: "上了八小時課還要寫好幾小時作業，學生筋疲力盡、焦慮又睡不夠。" },
      { t: "Quality beats quantity 質重於量", en: "Research shows that beyond about an hour a day, extra homework adds almost nothing to learning.", zh: "研究顯示每天超過一小時後，額外作業對學習幾乎沒有幫助。" },
      { t: "Time for other skills 其他能力的時間", en: "Sports, music, reading and family chores teach teamwork and responsibility that worksheets cannot.", zh: "運動、音樂、閱讀和家事能培養作業單無法教的團隊合作與責任感。" },
      { t: "Copying is not learning 抄寫不是學習", en: "Much homework is mechanical copying, which students rush through or copy from classmates.", zh: "許多作業只是機械式抄寫，學生匆匆了事或直接抄同學的。" }
    ],
    disagree: [
      { t: "Practice makes permanent 練習才會牢固", en: "Skills like maths and grammar only stick with repeated practice outside the classroom.", zh: "數學、文法等技能必須在課堂外反覆練習才會牢固。" },
      { t: "Responsibility & time management 責任感與時間管理", en: "Homework teaches students to plan, meet deadlines and work without a teacher watching.", zh: "作業教學生規劃、守期限，並在沒有老師監督下工作。" },
      { t: "Free time is not used wisely 自由時間不會被善用", en: "Without homework, most teenagers would spend the extra hours on games and short videos, not sports.", zh: "沒有作業，多數青少年會把時間花在遊戲和短影音，而不是運動。" },
      { t: "Preparation for exams 為考試準備", en: "The 會考 and university entrance exams reward students who have practised consistently for years.", zh: "會考和大學入學考試獎勵的是多年持續練習的學生。" }
    ]
  },
  agree: [
    ["11 p.m. · still at the desk", "**It is eleven o'clock at night, and** in bedrooms across the country, teenagers **are still bent over** their desks."],
    ["8 hours at school + 3 hours homework", "**Having already spent** eight hours at school **and** two more at cram school, many students **face** another three hours of worksheets **before** they can sleep."],
    ["stance: less homework · health + real learning", "**I therefore agree that** schools **should** assign less homework, **because** excessive homework **damages** students' health **and** adds surprisingly little **to** their learning."],
    ["stress & sleep", "**The most obvious problem is that** heavy homework **robs** teenagers **of** sleep and peace of mind."],
    ["< 7 hours sleep · anxiety · exhaustion", "**Doctors recommend** at least eight hours of sleep **for** teenagers, **yet** surveys **show** that most Taiwanese students **get** fewer than seven, **largely because** homework **keeps** them up late."],
    ["my friend Amy · midnight for a week · got sick", "**My friend Amy, for example,** did homework **until** midnight **for** an entire week before the mid-term exams **and** ended up **so** exhausted **that** she caught a fever **and** missed the exams altogether."],
    ["→ homework defeated its own purpose", "**Ironically,** the homework **that** was supposed to help her **prevented** her **from** taking the test at all."],
    ["quality > quantity · research", "**Furthermore,** more homework **does not** mean more learning."],
    ["beyond 1 hour = no gain · copying · rushing", "**Research from** several universities **suggests that** beyond about an hour a day, extra homework **produces** almost no improvement **in** grades; **instead,** tired students **rush through** worksheets **or** copy answers **from** classmates, **which** teaches them nothing."],
    ["concession: practice is necessary", "**Admittedly,** some practice **is** essential, **especially** in subjects like maths **and** grammar."],
    ["rebuttal: 30 focused minutes > 3 hours of copying", "**But** thirty minutes of focused practice **is worth far more than** three hours of mechanical copying, **and** teachers **could easily** design shorter, smarter tasks."],
    ["restate: less but better homework", "**In conclusion,** schools **should** give students **less but better** homework, **so that** they **can** sleep, exercise **and** actually remember what they study."],
    ["closing: a rested mind learns more", "**A rested mind, after all, learns far more than** an exhausted one."]
  ],
  disagree: [
    ["complaints about homework · every generation", "**Every generation of** students **has complained about** homework, **and** every generation **has benefited from** it."],
    ["calls to cut homework · Finland example", "**Recently,** some educators **have called for** schools **to** cut homework dramatically, **pointing to** countries like Finland **as** models."],
    ["stance: homework is necessary · practice + responsibility", "**Nevertheless, I disagree that** schools **should** reduce homework, **since** regular homework **is essential for** mastering skills **and** developing responsibility."],
    ["practice makes permanent", "**First of all,** real learning **happens** through practice, **not** just through listening."],
    ["maths · grammar · 45-min lesson not enough", "A forty-five-minute lesson **introduces** a new maths formula **or** grammar rule, **but** students **only** master it **by** applying it **repeatedly on** their own **at** home."],
    ["my brother · stopped doing English homework · grades fell", "**When** my brother **stopped** doing his English homework last semester, his test scores **dropped from** ninety **to** sixty-five **within** two months, **despite** attending every class."],
    ["→ practice outside class is irreplaceable", "**This clearly shows that** classroom time alone **cannot replace** independent practice."],
    ["responsibility · time management", "**Secondly,** homework **teaches** skills **that** go far beyond the subject itself."],
    ["planning · deadlines · no teacher · free time → games", "**Completing** assignments **without** a teacher watching **trains** students **to** plan their time **and** meet deadlines, **whereas** teenagers **with** no homework **tend to** spend the extra hours **on** games and short videos **rather than** on sports or reading."],
    ["concession: too much homework causes stress", "**It cannot be denied that** excessive homework **causes** stress **and** sleep loss."],
    ["rebuttal: fix the design, not the amount", "**However,** the solution **is to** design better homework, **not to** abolish it; thirty minutes per subject, **well planned,** **is** both manageable **and** effective."],
    ["restate: keep meaningful homework", "**For these reasons, I believe** schools **should** keep assigning meaningful homework **rather than** cutting it."],
    ["closing: discipline today, freedom tomorrow", "**The discipline** students **build** tonight **is** the freedom **they will enjoy** in the future."]
  ],
  vocab: [["excessive", "過多的"], ["rob sb of sth", "剝奪"], ["exhausted", "筋疲力盡的"], ["mechanical", "機械式的"], ["master", "精通"], ["apply", "應用"], ["meet a deadline", "趕上期限"], ["abolish", "廢除"]]
};

window.PET_ESSAY_ADV[5] = {
  args: {
    agree: [
      { t: "Comparison & self-esteem 比較與自尊", en: "Feeds full of perfect bodies and perfect holidays make teenagers feel ugly, boring and left out.", zh: "滿是完美身材與完美假期的動態讓青少年覺得自己醜、無聊、被排除在外。" },
      { t: "Time and sleep 時間與睡眠", en: "Endless scrolling steals hours from homework, exercise and sleep, often late into the night.", zh: "無止境地滑手機偷走寫作業、運動和睡眠的時間，常常到深夜。" },
      { t: "Cyberbullying 網路霸凌", en: "Cruel comments and group chats follow victims home, so there is no escape after the school bell.", zh: "惡毒留言和群組聊天會跟著受害者回家，放學後也無處可逃。" },
      { t: "Misinformation 錯誤資訊", en: "Teenagers absorb fake news and dangerous challenges from influencers they trust more than teachers.", zh: "青少年從比老師更信任的網紅那裡吸收假新聞和危險挑戰。" }
    ],
    disagree: [
      { t: "Connection and support 連結與支持", en: "Social media keeps friends in touch across distances and helps shy or isolated teens find people like them.", zh: "社群媒體讓遠距離的朋友保持聯繫，幫助害羞或孤立的青少年找到同類。" },
      { t: "Learning and creativity 學習與創造力", en: "Teenagers learn languages, coding, cooking and art from free videos and share their own work with the world.", zh: "青少年從免費影片學語言、程式、烹飪和藝術，並與世界分享自己的作品。" },
      { t: "Voice and awareness 發聲與意識", en: "Young people organise charity drives and raise awareness about climate change and mental health online.", zh: "年輕人在網路上組織公益活動，提升對氣候變遷與心理健康的關注。" },
      { t: "The problem is use, not the tool 問題在使用方式而非工具", en: "With time limits and media literacy lessons, the benefits clearly outweigh the risks.", zh: "有了時間限制與媒體素養教育，好處顯然大於風險。" }
    ]
  },
  agree: [
    ["check phone 100 times a day", "**The average teenager** checks social media **more than** a hundred times a day, **often** before even getting out of bed."],
    ["Instagram · TikTok · YouTube · part of life", "**Platforms such as** Instagram, TikTok **and** YouTube **have become** so woven into daily life **that** it is easy to forget **how recently** they appeared."],
    ["stance: more harm than good · self-esteem + time", "**Despite their popularity, I agree that** social media **does more harm than good** for teenagers, **chiefly because** it **damages** self-esteem **and** devours time."],
    ["comparison · self-esteem", "**The most damaging effect of** social media **is** the constant comparison **it** invites."],
    ["filtered photos · perfect lives · ugly & boring", "**Because** people **post only** their most flattering photos **and** happiest moments, teenagers **end up measuring** their ordinary lives **against** a highlight reel **that** does not exist, **and** they inevitably feel ugly **or** boring."],
    ["girl in my class · fewer likes · stopped posting", "**A girl in my class, for instance,** deleted her account **after** her photos **received** fewer likes **than** her friends'; she **had convinced herself that** nobody liked her."],
    ["→ anxiety · withdrawal · depression statistics", "**Such experiences are far from rare:** studies **link** heavy social media use **to** rising rates of anxiety **and** depression **among** teenage girls in particular."],
    ["time · sleep", "**Equally serious is** the amount of time social media **consumes**."],
    ["scroll for hours · 2 a.m. · homework · grades", "**It is remarkably easy to** scroll for three hours **without** noticing, **and** many students **admit to** watching short videos **until** two in the morning, **which** wrecks **both** their sleep **and** their grades."],
    ["concession: keep in touch · learn skills", "**Supporters argue that** social media **keeps** friends connected **and** teaches useful skills."],
    ["rebuttal: real friendships are offline · benefits small vs costs", "**While this is partly true,** genuine friendships **are built** face to face, **and** the occasional useful video **hardly compensates for** the anxiety and lost sleep."],
    ["restate: harm outweighs good", "**On balance, therefore,** the harm social media causes teenagers **clearly outweighs** its benefits."],
    ["closing: log off and live", "**Teenagers who** log off **gain** something no app can offer: time **to** live their own lives."]
  ],
  disagree: [
    ["adults blame social media for everything", "**Whenever** teenagers **are** unhappy, adults **are quick to blame** social media."],
    ["headlines about harm · ignore the benefits", "**Newspapers** **are full of** stories **about** addiction and anxiety, **yet** they **rarely mention** the millions of young people **for whom** these platforms **are** a source of friendship, learning **and** opportunity."],
    ["stance: more good than harm · connection + learning", "**I disagree that** social media **does more harm than good**; **used wisely,** it **connects** teenagers **and** opens doors **that** previous generations never had."],
    ["connection & support", "**In the first place,** social media **keeps** young people connected **in ways that** matter."],
    ["friends who moved · shy teens find community", "**When** a close friend **moves** to another city, a group chat **keeps** the friendship alive, **and** shy **or** isolated teenagers **can find** communities **of** people **who** share their interests **and** understand them."],
    ["my friend in Canada · daily contact · still close", "**My best friend moved to Canada two years ago,** **but because** we message each other every day **and** share videos, **we are** as close **as** ever."],
    ["→ loneliness reduced, not increased", "**Far from** making teenagers lonely, **then,** social media **can be** the very thing **that** prevents loneliness."],
    ["learning · creativity · voice", "**In addition,** social media **is** an extraordinary classroom **and** stage."],
    ["learn coding/English from videos · share art · charity drives", "Teenagers **learn** English, coding **and** cooking **from** free tutorials, **share** their drawings **with** thousands of viewers **and** organise charity drives **that** would be impossible offline; **one student at my school** raised NT$50,000 **for** a stray-animal shelter **through** a single Instagram post."],
    ["concession: comparison · wasted time", "**It is undeniable that** endless scrolling **wastes** time **and that** comparing oneself **with** filtered photos **can** hurt."],
    ["rebuttal: use, not tool · time limits · media literacy", "**However,** these **are** problems **of** how the tool **is used, not** of the tool itself; **with** time limits **and** media-literacy lessons, the benefits **far outweigh** the risks."],
    ["restate: good outweighs harm", "**To conclude,** social media **does** teenagers **more good than harm**, **provided that** they **learn to** use it thoughtfully."],
    ["closing: teach them to swim, don't ban the pool", "**Rather than** banning the pool, **we should** teach teenagers **to** swim."]
  ],
  vocab: [["self-esteem", "自尊"], ["flattering", "討好的、美化的"], ["highlight reel", "精華片段"], ["inevitably", "不可避免地"], ["devour", "吞噬"], ["compensate for", "彌補"], ["isolated", "孤立的"], ["media literacy", "媒體素養"]]
};

window.PET_ESSAY_ADV[6] = {
  args: {
    agree: [
      { t: "Hours disappear 時間不知不覺消失", en: "'One more game' easily turns into three hours, and homework, sleep and sport are pushed aside.", zh: "「再玩一場」很容易變成三小時，作業、睡眠和運動都被擠掉。" },
      { t: "Health damage 健康傷害", en: "Hours in a chair hurt eyes, backs and sleep, and gamers often live on junk food.", zh: "長時間坐著傷害眼睛、背部和睡眠，玩家也常靠垃圾食物過活。" },
      { t: "Designed to hook players 設計來勾住玩家", en: "Loot boxes, daily rewards and endless levels are built to keep players spending time and money.", zh: "戰利品箱、每日獎勵和無盡關卡都是設計來讓玩家持續花時間和金錢。" },
      { t: "Virtual achievements 虛擬成就", en: "A level-50 character brings nothing to real life; the same hours could build real skills.", zh: "一個 50 級的角色對現實毫無幫助，同樣的時間可以培養真正的技能。" }
    ],
    disagree: [
      { t: "Relaxation 放鬆", en: "After a long school day, an hour of gaming is a healthy way to relax, just like watching TV or listening to music.", zh: "上了一整天課後，玩一小時遊戲是健康的放鬆方式，就像看電視或聽音樂。" },
      { t: "Teamwork & problem-solving 團隊合作與解決問題", en: "Team games require communication, planning and quick decisions under pressure.", zh: "團隊遊戲需要溝通、規劃和在壓力下快速決策。" },
      { t: "Learning & careers 學習與職涯", en: "Games teach English, history and strategy, and e-sports, game design and streaming are real careers.", zh: "遊戲能教英文、歷史和策略，電競、遊戲設計和實況是真實的職業。" },
      { t: "Balance, not ban 平衡而非禁止", en: "Any hobby becomes harmful without limits; the problem is excess, not gaming itself.", zh: "任何嗜好沒有節制都會有害，問題在於過度而不是遊戲本身。" }
    ]
  },
  agree: [
    ["most popular hobby · 3 hours a day", "**For millions of teenagers,** the first thing they do after school **is** switch on a game console **or** open a mobile game."],
    ["industry bigger than movies · parents worry", "**With** the gaming industry **now** larger than the film and music industries combined, **it is no wonder** parents **are** worried **about** how much time their children spend playing."],
    ["stance: mostly a waste · time + health", "**Although** games can be entertaining, **I agree that** playing them **is largely a waste of time**, **because** they **swallow** hours **that** should go to more valuable activities **and** harm players' health."],
    ["hours disappear", "**The central problem is that** games **are designed to** make time disappear."],
    ["one more game → 3 hours · homework last minute", "**Once** a student **starts** playing, 'one more game' **easily turns into** three hours, **since** every level, reward **and** daily bonus **is engineered to** keep players hooked; homework **is left** until the last minute **and** sleep **is cut short**."],
    ["my brother · summer · gamed until 3 a.m.", "**My brother is a perfect example.** He **played** online games **every night** last summer, **often until** three in the morning, **and** finished none of his summer assignments."],
    ["→ all-nighter before school · angry parents · bad grades", "**The result was** an all-night panic **before** school restarted, furious parents **and** a first-semester report card **that** he **is still** embarrassed about."],
    ["health damage", "**Moreover,** heavy gaming **takes a toll on** physical health."],
    ["eyes · back · junk food · no exercise", "**Sitting in front of** a screen **for** hours **strains** the eyes and back, **and** gamers **tend to** live on instant noodles and soft drinks; **compared with** an hour of basketball, an hour of gaming **offers** almost no exercise."],
    ["concession: teamwork · relaxation", "**Supporters of gaming** **insist that** team games **teach** cooperation **and** help students relax."],
    ["rebuttal: sports teach teamwork too + exercise · relaxation ≠ 4 hours", "**While this may be true,** a basketball team **teaches** the same cooperation **and** keeps players fit, **and** relaxation **does not require** four hours in front of a screen."],
    ["restate: mostly wasted time", "**In conclusion,** video games **consume** far more **than** they give back, **and** most of the time spent on them **is** simply wasted."],
    ["closing: real levels are in real life", "**The only levels** worth climbing, **after all,** **are** the ones in real life."]
  ],
  disagree: [
    ["parents: 'stop wasting time' · every household", "**'Stop wasting your time on that game!'** **is** probably the most common sentence heard in Taiwanese households after dinner."],
    ["gaming = normal hobby · 3 billion players", "**Yet** gaming **is now** a mainstream hobby **enjoyed by** three billion people, **and** treating it **as** a waste of time **ignores** what it actually offers."],
    ["stance: not a waste · relaxation + skills", "**I disagree that** video games **are** a waste of time; **played in moderation,** they **help** students relax **and** develop valuable skills."],
    ["relaxation", "**To begin with,** everyone **needs** a way **to** unwind **after** a long day."],
    ["8 hours school + cram school · 1 hour of play · same as TV", "**After** eight hours of lessons **and** two more at cram school, an hour of gaming **is** no different **from** watching a drama **or** listening to music, **except that** it is active **rather than** passive."],
    ["my own experience · one hour · reduces stress", "**Personally,** I **play** for an hour each evening, **and** I **find** it clears my head **so** completely **that** I **return to** my homework calmer **and** more focused."],
    ["→ balance leads to better study", "**Far from** wasting time, **then,** a short gaming break **actually improves** the quality of the study time **that** follows."],
    ["teamwork · problem-solving · careers", "**Furthermore,** many games **teach** skills **that** school rarely does."],
    ["team games: communicate, plan, decide fast · English · strategy · e-sports careers", "Team games **require** players **to** communicate, plan **and** make split-second decisions **under** pressure; strategy games **teach** history and resource management; **and** my classmate **learned** most of his English **from** chatting **with** international teammates — **a skill that** has since earned him a place on a school e-sports team."],
    ["concession: addiction · health", "**Admittedly,** some players **lose control** **and** sacrifice sleep, exercise **and** grades."],
    ["rebuttal: excess is the problem · same with any hobby · set limits", "**However,** the same **can be said of** any hobby, **from** reading **to** basketball; the problem **lies in** excess, **not** in gaming itself, **and** a simple time limit **solves** it."],
    ["restate: valuable in moderation", "**In short,** video games **are** a worthwhile use of time **as long as** they **are** balanced **with** study and exercise."],
    ["closing: a game well played teaches more than an hour wasted scrolling", "**An hour of** strategy and teamwork **teaches** far more **than** an hour of mindless scrolling ever could."]
  ],
  vocab: [["engineered to", "被設計來"], ["hooked", "上癮的"], ["take a toll on", "對…造成損害"], ["strain", "使緊繃、損傷"], ["in moderation", "適度地"], ["unwind", "放鬆"], ["split-second", "瞬間的"], ["excess", "過度"]]
};

window.PET_ESSAY_ADV[7] = {
  args: {
    agree: [
      { t: "Learn at your own pace 依自己的步調學習", en: "Students can pause, rewind and rewatch lessons instead of being rushed or bored in a class of thirty.", zh: "學生可以暫停、倒帶、重看，而不必在三十人的班級裡被催促或感到無聊。" },
      { t: "No commute, more sleep 不用通勤、更多睡眠", en: "Cutting the daily commute saves an hour or more for sleep, exercise or hobbies.", zh: "省下每天通勤，多出一小時以上可以睡覺、運動或發展嗜好。" },
      { t: "Access to the best teachers 接觸最好的老師", en: "A student in a small town can learn from the best teachers in Taipei or anywhere in the world.", zh: "小鎮的學生也能向台北甚至全世界最好的老師學習。" },
      { t: "Fewer distractions and less bullying 較少干擾與霸凌", en: "Home has no noisy classmates, no peer pressure and no bullying in the corridors.", zh: "家裡沒有吵鬧的同學、沒有同儕壓力，也沒有走廊上的霸凌。" }
    ],
    disagree: [
      { t: "Social skills 社交能力", en: "School teaches cooperation, friendship and conflict resolution, which a screen cannot replace.", zh: "學校教合作、友誼和解決衝突，螢幕無法取代。" },
      { t: "Discipline and motivation 紀律與動機", en: "Most teenagers lack the self-discipline to study alone at home surrounded by beds, games and snacks.", zh: "多數青少年缺乏在家獨自讀書的自律，身邊又有床、遊戲和零食。" },
      { t: "Hands-on learning 動手做的學習", en: "Science experiments, PE, music and art need real equipment, real space and real teammates.", zh: "科學實驗、體育、音樂和美術需要真實的器材、空間和隊友。" },
      { t: "Inequality 不平等", en: "Not every family has a quiet room, a fast connection or a parent at home to help.", zh: "不是每個家庭都有安靜的房間、快速網路或在家協助的父母。" }
    ]
  },
  agree: [
    ["pandemic · everyone learned online", "**During the pandemic,** millions of students **discovered** that a bedroom **could become** a classroom overnight."],
    ["schools back to normal · but online learning grew", "**Although** schools **have since** returned to normal, online courses **have continued to** grow, **and** many students **now ask whether** going to school **is** still necessary."],
    ["stance: online at home is better · pace + access", "**In my view,** learning online at home **is** better **than** attending school, **because** it **allows** students **to** learn at their own pace **and** gives them access **to** the best teachers available."],
    ["learn at own pace", "**The greatest advantage of** online learning **is** flexibility."],
    ["pause · rewind · rewatch · class of 30 rushed or bored", "**In** a class of thirty, a teacher **has to** move at one speed, **so** fast learners **are** bored **while** slower ones **are** left behind; online, a student **can** pause, rewind **and** rewatch a difficult explanation **as many times as** necessary."],
    ["my experience · maths video · replayed 3 times", "**When** I struggled with quadratic equations last year, **I** replayed an online lesson three times **and** finally understood it, **something** I **could never have asked** my teacher **to** do."],
    ["→ deeper understanding · less anxiety", "**As a result,** I **understood** the topic **more deeply** **and** felt far less anxious **than** I **would have** in a crowded classroom."],
    ["access to the best teachers · no commute", "**Furthermore,** online learning **removes** the limits of geography."],
    ["small town → Taipei teachers · 1 hour commute saved · sleep", "A student in a small town **can** learn **from** the best teachers in Taipei **or** even abroad, **and** the hour **saved** on commuting **can be spent** on sleep, exercise **or** reading — **three things** most Taiwanese students badly need."],
    ["concession: social skills · motivation", "**Critics rightly point out that** school **teaches** social skills **and that** some students **lack** the discipline **to** study alone."],
    ["rebuttal: clubs & sports for socialising · discipline can be learned", "**Nevertheless,** friendships **can be** built **through** clubs and sports, **and** self-discipline **is** a skill **that** online learners **develop faster** precisely **because** they **have to**."],
    ["restate: online learning is better", "**In conclusion,** learning online at home **offers** flexibility and quality **that** a traditional school **simply cannot match**."],
    ["closing: the classroom of the future is anywhere", "**The classroom of the future** **is not** a building — **it is** wherever a curious student **opens** a laptop."]
  ],
  disagree: [
    ["lockdown memory · screens all day", "**Most students still remember** the long months of lockdown **when** every lesson **arrived through** a screen."],
    ["some say home learning is better · but experience says otherwise", "**Some people now claim that** learning online at home **is** better **than** going to school, **yet** the experience of those months **tells a very different story**."],
    ["stance: school is better · social + motivation", "**I strongly disagree with** this view, **because** school **provides** social growth **and** structure **that** no screen **can** replace."],
    ["social skills", "**Above all,** school **is where** young people **learn to** live with others."],
    ["teamwork · friendship · conflict · group projects", "Group projects, lunch breaks **and** even arguments **teach** cooperation, empathy **and** conflict resolution, **and** these lessons **cannot be downloaded**."],
    ["my cousin · home-schooled online for a year · anxious", "**My cousin, who studied online for a year,** **became so** anxious about meeting people **that** she **found it hard to** order food in a restaurant, **let alone** make new friends."],
    ["→ loneliness · worse mental health", "**Her experience is not unusual:** surveys **show** that loneliness **and** depression **rose sharply** among teenagers **while** schools were closed."],
    ["discipline & motivation", "**In addition,** very few teenagers **have** the self-discipline **that** online learning **demands**."],
    ["bed · games · snacks · camera off · hands-on subjects", "**Surrounded by** a bed, a game console **and** a fridge, most students **switch off** their cameras **and** drift away, **and** subjects like chemistry, PE **and** music **lose** all meaning **without** real equipment, real space **and** real teammates."],
    ["concession: own pace · no commute", "**It is true that** online learning **lets** students **learn** at their own pace **and** saves commuting time."],
    ["rebuttal: videos can supplement school, not replace it · inequality", "**However,** recorded lessons **work best as** a supplement **to** school, **not** a replacement, **and** many families **have** neither a quiet room **nor** a reliable connection."],
    ["restate: going to school is better", "**All things considered,** going to school **remains** far better **than** learning online at home."],
    ["closing: education is about people, not pixels", "**Education, in the end,** **is about** people, **not** pixels."]
  ],
  vocab: [["flexibility", "彈性"], ["rewind", "倒帶"], ["geography", "地理（限制）"], ["commute", "通勤"], ["empathy", "同理心"], ["conflict resolution", "衝突解決"], ["drift away", "分心、飄走"], ["supplement", "補充"]]
};

window.PET_ESSAY_ADV[8] = {
  args: {
    agree: [
      { t: "Money sense 金錢觀念", en: "Earning NT$180 an hour teaches the real value of money far better than any lecture from parents.", zh: "時薪 180 元的親身體驗比父母的任何說教都更能教會金錢的價值。" },
      { t: "Responsibility & soft skills 責任感與軟實力", en: "Being on time, serving difficult customers and working in a team build maturity and confidence.", zh: "準時、應對難纏的客人、團隊合作，培養成熟與自信。" },
      { t: "Career exploration 職涯探索", en: "A part-time job shows teenagers what work they enjoy — or hate — before they choose a university major.", zh: "打工讓青少年在選科系前知道自己喜歡或討厭什麼工作。" },
      { t: "Independence 獨立", en: "Teenagers who earn their own money depend less on parents and make more thoughtful purchases.", zh: "自己賺錢的青少年較不依賴父母，花錢也更深思熟慮。" }
    ],
    disagree: [
      { t: "Studies come first 課業優先", en: "Late shifts leave students exhausted in class, and grades fall just when exams matter most.", zh: "晚班讓學生在課堂上筋疲力盡，成績在考試最重要的時候下滑。" },
      { t: "Exploitation and safety 剝削與安全", en: "Young workers are often underpaid, given dangerous tasks or asked to work illegal hours.", zh: "年輕勞工常被低薪、分配危險工作或要求違法的工時。" },
      { t: "Lost youth 失去的青春", en: "Teenage years should be spent on sports, friendships and hobbies, not on folding T-shirts for minimum wage.", zh: "青春應該花在運動、友誼和嗜好上，而不是為了最低工資摺 T 恤。" },
      { t: "Low-skill work teaches little 低技能工作學不到什麼", en: "Serving bubble tea for 20 hours a week builds few skills compared with a club, an internship or volunteering.", zh: "每週 20 小時做手搖飲，比起社團、實習或志工能學到的技能很少。" }
    ]
  },
  agree: [
    ["bubble tea shop · student behind the counter", "**Behind the counter of** almost every bubble-tea shop in Taiwan **stands** a teenager **in** a school uniform, **earning** pocket money **after** class."],
    ["parents divided · studies vs experience", "**Parents are divided on whether** this is a valuable experience **or** a dangerous distraction **from** studying."],
    ["stance: yes, part-time jobs · money sense + responsibility", "**I agree that** teenagers **should** have a part-time job, **as** it **teaches** the value of money **and** builds responsibility **in ways** school never can."],
    ["money sense", "**First and foremost,** earning money **changes the way** teenagers **think about** spending it."],
    ["NT$180/hour · 2 hours for a game skin · lectures don't work", "**A student who has** stood for two hours **to** earn NT$360 **thinks twice before** spending it **on** a game skin **or** a fourth cup of milk tea, **whereas** no number of lectures **from** parents **has** the same effect."],
    ["my brother · convenience store · saved for laptop", "**My brother, who works weekends at a convenience store,** **saved for** six months **to** buy his own laptop **and** now **takes** better care of it **than** anything our parents **ever** bought him."],
    ["→ budgeting · independence", "**Consequently,** he **has learned to** budget, **to** wait **and to** rely on himself — **lessons** that **will** last a lifetime."],
    ["responsibility · soft skills · career", "**Secondly,** a part-time job **develops** maturity **and** real-world skills."],
    ["on time · difficult customers · teamwork · discover career", "**Arriving** on time, **handling** rude customers **and** cooperating **with** colleagues **build** confidence **and** patience, **and** a few months **in** a restaurant **or** a shop **often reveal** what kind of work a teenager **enjoys** — **or** hates — **before** they **choose** a university major."],
    ["concession: studies suffer · exploitation", "**Admittedly,** some students **work** so many hours **that** their grades suffer, **and** some employers **exploit** young workers."],
    ["rebuttal: limit hours · 8–10 hrs/week · laws protect", "**However,** the answer **is** a sensible limit of eight **to** ten hours a week **and** proper labour protection, **not** a ban **on** working altogether."],
    ["restate: part-time jobs are valuable", "**In conclusion,** a part-time job **is** one of the most valuable lessons a teenager **can** have outside the classroom."],
    ["closing: first pay slip = first step to adulthood", "**A first pay slip, after all, is** a first step **into** adulthood."]
  ],
  disagree: [
    ["teen working late at the night market · exam tomorrow", "**It is ten o'clock on a school night, and** a sixteen-year-old **is still** frying chicken at a night-market stall **with** a chemistry test the next morning."],
    ["more teens working · parents encourage", "**More and more** teenagers **are taking** part-time jobs, **often with** their parents' encouragement, **in the belief that** work **builds** character."],
    ["stance: no part-time jobs · studies + exploitation", "**I disagree that** teenagers **should** have a part-time job, **because** work **competes with** education **and** exposes young people **to** exploitation."],
    ["studies come first", "**The most obvious objection is that** a job **steals** time **and** energy **from** studying."],
    ["late shifts · tired in class · grades fall · exams matter", "**After** a four-hour evening shift, no student **can** concentrate **on** homework, **and** the next morning **is spent** half asleep in class; **since** the 會考 **and** university entrance exams **decide** a teenager's future, **even** a small drop in grades **can have** lasting consequences."],
    ["my classmate · fast food · grades 85 → 60 · quit", "**My classmate Leo** worked **at** a fast-food restaurant **for** one semester; his average **fell from** 85 **to** 60, **and** he **eventually had to** quit **to** catch up."],
    ["→ money earned < future lost", "**The few thousand dollars** he **earned** **were** nothing **compared with** the scholarship he **nearly lost**."],
    ["exploitation · safety · lost youth", "**Furthermore,** teenage workers **are** easy targets **for** exploitation."],
    ["underpaid · illegal hours · dangerous tasks · youth should be sports & friends", "Young employees **are** frequently underpaid, asked **to** work illegal hours **or** given dangerous tasks **because** they **do not know** their rights, **and** the hours **they** spend folding T-shirts **for** minimum wage **are** hours **stolen from** sports, friendships **and** the hobbies **that** make youth worth having."],
    ["concession: money sense · responsibility", "**It is often argued that** jobs **teach** responsibility **and** the value of money."],
    ["rebuttal: clubs, volunteering, internships teach more", "**Yet** school clubs, volunteering **and** summer internships **teach** the same lessons **without** the exhaustion, **and** a weekly allowance **managed** carefully **teaches** budgeting **just as well**."],
    ["restate: focus on school during the week", "**For these reasons,** teenagers **should** focus on their education **and** leave paid work **for** the holidays **or** for later."],
    ["closing: there will be 40 years to work", "**There will be** forty years **to** work; **there are** only a few **to** be young."]
  ],
  vocab: [["distraction", "分心的事物"], ["think twice", "三思"], ["budget", "做預算"], ["maturity", "成熟"], ["exploit", "剝削"], ["labour protection", "勞動保障"], ["consequence", "後果"], ["allowance", "零用錢"]]
};

window.PET_ESSAY_ADV[9] = {
  args: {
    agree: [
      { t: "A 24-hour tutor 全天候家教", en: "AI explains a maths step or a grammar rule instantly, at midnight, as many times as needed.", zh: "AI 能在半夜即時解釋一個數學步驟或文法規則，想問幾次都可以。" },
      { t: "Feedback, not answers 回饋而非答案", en: "Used well, AI checks a draft, points out errors and suggests better words without writing the essay.", zh: "用得好的話，AI 能檢查草稿、指出錯誤、建議更好的用字，而不是代寫作文。" },
      { t: "Equal access 平等取得", en: "Students who cannot afford cram schools or private tutors get the same help as wealthy classmates.", zh: "付不起補習班或家教的學生也能獲得與富裕同學相同的協助。" },
      { t: "A skill for the future 未來的能力", en: "Every future job will involve AI, so learning to use it well at school is essential preparation.", zh: "未來每份工作都會用到 AI，在學校學會善用它是必要的準備。" }
    ],
    disagree: [
      { t: "The struggle is the learning 掙扎才是學習", en: "If AI does the thinking, students skip the effort that actually builds understanding and memory.", zh: "如果 AI 代替思考，學生就跳過了真正建立理解與記憶的努力。" },
      { t: "Cheating and dishonesty 作弊與不誠實", en: "Most students use AI to copy whole answers, so homework no longer shows what they can do.", zh: "多數學生用 AI 直接抄整個答案，作業不再能反映他們的真實能力。" },
      { t: "Errors and bias 錯誤與偏見", en: "AI confidently invents facts and makes mistakes that students cannot detect.", zh: "AI 會自信地編造事實與犯錯，而學生無法分辨。" },
      { t: "Dependence 依賴", en: "Students who rely on AI panic in exams where no AI is allowed.", zh: "依賴 AI 的學生在不能用 AI 的考試中會慌張失措。" }
    ]
  },
  agree: [
    ["midnight · stuck on a maths problem · ChatGPT", "**It is midnight, the cram-school teacher is asleep, and** a student **is stuck on** a maths problem **that** nobody **can** explain — **except** an AI."],
    ["schools ban AI · students use it anyway", "**Many schools have responded to** tools **like** ChatGPT **by** banning them, **yet** surveys **show** that most students **use** them anyway."],
    ["stance: allow AI · tutor + fairness", "**I agree that** students **should be allowed to** use AI **to help with** homework, **provided that** they use it **as** a tutor **rather than** a ghost-writer."],
    ["24-hour tutor", "**The most powerful argument for** AI **is that** it **is** a patient, tireless tutor **available** twenty-four hours a day."],
    ["explain again · different way · no embarrassment", "**Unlike** a busy teacher **with** thirty students, an AI **can** explain the same grammar rule five times **in** five different ways **without** sighing, **and** shy students **can** ask questions **they would be** too embarrassed **to** ask in class."],
    ["my experience · relative clauses · AI examples", "**When** I **could not** understand relative clauses, I **asked** an AI **for** ten example sentences **about** my favourite basketball team, **and** the rule **finally** made sense."],
    ["→ the teacher's time freed for harder questions", "**As a result,** I **arrived** at school **with** better questions, **and** my teacher **could spend** her time **on** the problems **that** truly needed her."],
    ["equal access · future skill", "**In addition,** AI **makes** help **fairer** **and** prepares students **for** the future."],
    ["no cram school? same help · every job uses AI · learn to prompt", "Students **whose** families **cannot afford** private tutors **now receive** the same support **as** their wealthy classmates, **and since** almost every future job **will involve** AI, **learning to** ask it good questions **and** check its answers **is** a skill **as** essential **as** typing."],
    ["concession: copying · cheating", "**Of course,** some students **will** simply copy **whatever** the AI produces."],
    ["rebuttal: clear rules · show your prompts · in-class writing", "**However,** clear rules — **such as** submitting the prompts used **or** writing final drafts **in** class — **can** prevent cheating **while** keeping the benefits."],
    ["restate: AI as a tool, with rules", "**In conclusion,** schools **should** teach students **to** use AI responsibly **rather than** pretending it does not exist."],
    ["closing: calculators didn't end maths", "**Calculators did not end** mathematics, **and** AI **will not end** learning."]
  ],
  disagree: [
    ["essay written in 10 seconds · 'done'", "**A whole essay in ten seconds, and** the student **simply** copies it **into** the homework file **and** calls it done."],
    ["AI everywhere · schools debate", "**Since** AI tools **became** freely available, teachers **have struggled to** tell **which** homework **was** written **by** students **and which by** machines."],
    ["stance: do not allow AI · skips learning + dishonesty", "**I disagree that** students **should be allowed to** use AI **for** homework, **because** it **removes** the very effort **that** produces learning **and** makes dishonesty effortless."],
    ["struggle = learning", "**The fundamental problem is that** learning **happens** in the struggle."],
    ["memory built by effort · AI answer = nothing retained", "**When** a student **wrestles with** a maths problem **for** twenty minutes, the brain **builds** connections **that** last; **when** an AI **supplies** the answer instantly, nothing **is** retained, **and** the homework **becomes** a performance **rather than** practice."],
    ["classmate · AI essays all semester · failed in-class writing", "**A classmate of mine** submitted AI-written English essays **all** semester **and** received high marks, **only to** fail the in-class writing test **because** he **had never actually** written a paragraph himself."],
    ["→ exams expose the gap", "**The exam, in other words,** **revealed** what the homework **had hidden**."],
    ["dishonesty · errors · dependence", "**Moreover,** AI **encourages** dishonesty **and** blind trust."],
    ["copy whole answers · invented facts · can't detect · panic in exams", "Most students **do not** use AI **to** check a draft; they **use** it **to** produce one, **and because** AI **confidently invents** dates, quotations **and** facts, students **copy** errors **they cannot** detect — **then** panic **when** they **face** an exam **without** it."],
    ["concession: a useful tutor · fair access", "**Supporters argue that** AI **is** a free tutor **that** helps students **who** cannot afford cram schools."],
    ["rebuttal: teachers, classmates, libraries · tutor ≠ homework", "**Nevertheless,** teachers, classmates **and** libraries **already provide** that help, **and** a tutor **who** does the homework **for** you **is not** a tutor at all."],
    ["restate: keep AI out of homework", "**To sum up,** homework **should** remain the student's own work, **and** AI **should** stay out of it."],
    ["closing: a mind that never struggles never grows", "**A mind that never struggles,** **after all,** **never grows**."]
  ],
  vocab: [["ghost-writer", "代筆者"], ["tireless", "不知疲倦的"], ["embarrassed", "尷尬的"], ["essential", "必要的"], ["wrestle with", "與…搏鬥"], ["retain", "保留、記住"], ["invent", "捏造"], ["detect", "察覺"]]
};

window.PET_ESSAY_ADV[10] = {
  args: {
    agree: [
      { t: "Attention is everything 專注就是一切", en: "A single notification breaks concentration for several minutes, and most students check their phones dozens of times a lesson.", zh: "一則通知就會打斷專注好幾分鐘，多數學生一節課查看手機數十次。" },
      { t: "Cheating and photos 作弊與拍照", en: "Phones make it easy to photograph tests, share answers and film classmates without consent.", zh: "手機讓拍考卷、傳答案、未經同意拍攝同學變得輕而易舉。" },
      { t: "Social interaction 社交互動", en: "Phone-free classrooms force students to talk to each other instead of scrolling in silence.", zh: "無手機的教室迫使學生彼此交談，而不是默默滑手機。" },
      { t: "Equal classroom 平等的教室", en: "Without phones, nobody shows off the newest model and nobody feels left out.", zh: "沒有手機，沒人炫耀最新機型，也沒人覺得被排擠。" }
    ],
    disagree: [
      { t: "A learning tool 學習工具", en: "Phones give instant access to dictionaries, calculators, polls and research during lessons.", zh: "手機提供字典、計算機、投票和研究資料的即時取用。" },
      { t: "Emergencies and family 緊急狀況與家庭", en: "Parents need to reach children about pick-ups or emergencies, and students may need to call for help.", zh: "父母需要聯絡孩子接送或緊急事務，學生也可能需要求助。" },
      { t: "Teaching self-control 教導自我控制", en: "Banning phones avoids the real lesson: learning when to put them away.", zh: "禁止手機迴避了真正的課題：學會何時該收起手機。" },
      { t: "Unenforceable 難以執行", en: "Bans create endless conflict and hidden use, wasting teachers' time on policing instead of teaching.", zh: "禁令製造無止境的衝突與偷用，浪費老師的時間在管控而非教學。" }
    ]
  },
  agree: [
    ["teacher explaining · heads down · screens glowing", "**A teacher explains** a difficult grammar point **while** a third of the class **stares at** glowing screens **under** their desks."],
    ["countries ban phones · Taiwan debate", "**Countries such as** France **and** the Netherlands **have already banned** phones **in** classrooms, **and** Taiwan **is now debating whether** to follow."],
    ["stance: ban phones · attention + social", "**I agree that** mobile phones **should be banned** in classrooms, **because** they **destroy** concentration **and** weaken the social life **that** a classroom depends on."],
    ["attention", "**The most compelling reason is that** attention **is** the foundation of learning, **and** phones **shatter** it."],
    ["notification → minutes to refocus · 50 checks per lesson", "**Research shows that** a single notification **breaks** concentration **for** several minutes, **and** many students **check** their phones dozens of times a lesson, **which means** they **never** fully engage **with** anything."],
    ["my school · phone pouches · test scores up", "**When** my school **introduced** locked phone pouches last year, the average test score **in** my class **rose by** nearly ten points **within** a semester."],
    ["→ even students admit they focus better", "**Even** the students **who** complained the loudest **now admit** they **focus** better **and** finish their work faster."],
    ["social interaction · cheating", "**Furthermore,** a phone-free classroom **is** a healthier **and** fairer place."],
    ["break time: talking not scrolling · no test photos · no filming", "**Without** phones, students **actually talk to** each other **between** lessons **instead of** scrolling in silence, **and** teachers **no longer** worry **about** photographed tests, shared answers **or** classmates **being filmed** without consent."],
    ["concession: learning tool · emergencies", "**Admittedly,** phones **can** serve **as** dictionaries **or** calculators, **and** parents **like to** reach their children **in** emergencies."],
    ["rebuttal: school tablets · office phone · pouches open at break", "**However,** school tablets **do** the same job **under** a teacher's control, **and** an emergency call **can** always **reach** the school office; **phones** can be returned **at** break time."],
    ["restate: ban phones in class", "**In conclusion,** banning phones **in** classrooms **gives** students **back** the attention **and** the human contact **that** learning requires."],
    ["closing: a classroom should be the one place you look up", "**A classroom should be** the one place **where** everyone **looks up**."]
  ],
  disagree: [
    ["students use phones for everything · banning = step backwards", "**Teenagers today** carry a library, a calculator **and** a translator **in** their pockets, **and** some adults **want to** lock it all away."],
    ["bans spreading · but do they work?", "**Phone bans are spreading** across schools, **yet** few people **ask whether** they actually teach students anything."],
    ["stance: no ban · tool + self-control", "**I disagree that** mobile phones **should be banned** in classrooms, **since** they **are** powerful learning tools **and** a ban **avoids** the real lesson **of** self-control."],
    ["learning tool", "**To begin with,** a phone **is** the most flexible learning tool **a** student owns."],
    ["dictionary · Kahoot · photos of the board · research", "**In** an English lesson, students **can** look up a word **in** seconds; **in** science, they **can** photograph the whiteboard, answer a live quiz **or** check a fact **that** the textbook **gets** wrong — **all** without the school **spending** a cent **on** tablets."],
    ["my English teacher · Kahoot & Quizlet · class loves it", "**My English teacher uses** Kahoot **and** Quizlet **on** our phones **every** week, **and** vocabulary scores **in** our class **are** the highest **in** the grade."],
    ["→ engagement up when phones are part of the lesson", "**Far from** being a distraction, **then,** phones **have made** her lessons the ones **we** look forward to most."],
    ["self-control · unenforceable", "**More importantly,** a ban **teaches** the wrong lesson."],
    ["adults must manage phones at work · hidden use · teachers as police", "Students **will** spend their adult lives **managing** phones **at** work **and** at home, **so** learning **when** to put the phone away **is** a skill school **should** teach; a ban **simply drives** phones **under** the desk **and** turns teachers **into** police officers."],
    ["concession: distraction · cheating", "**It is true that** notifications **break** concentration **and that** phones **make** cheating easier."],
    ["rebuttal: phones face-down rule · collected during tests", "**But** a simple 'phones face-down **unless** asked' rule **and** collecting phones **during** tests **solve** both problems **without** a blanket ban."],
    ["restate: manage, don't ban", "**In short,** schools **should** teach students **to** manage their phones, **not** confiscate them."],
    ["closing: you cannot teach self-control by removing every temptation", "**Self-control cannot be taught** **by** removing every temptation."]
  ],
  vocab: [["shatter", "粉碎"], ["engage with", "投入"], ["consent", "同意"], ["pouch", "小袋"], ["confiscate", "沒收"], ["blanket ban", "全面禁止"], ["temptation", "誘惑"], ["flexible", "彈性的"]]
};

window.PET_ESSAY_ADV[11] = {
  args: {
    agree: [
      { t: "Shrinking attention spans 注意力越來越短", en: "A brain trained on 15-second clips finds a 40-minute lesson or a 200-page book unbearable.", zh: "習慣 15 秒影片的大腦，會覺得 40 分鐘的課或 200 頁的書難以忍受。" },
      { t: "Addictive design 成癮設計", en: "Infinite scroll and autoplay are built to keep children swiping; there is no natural stopping point.", zh: "無限滑動和自動播放是為了讓孩子一直滑，沒有自然的停止點。" },
      { t: "Inappropriate content 不適當內容", en: "Algorithms push dangerous challenges, adult content and misinformation to very young viewers.", zh: "演算法把危險挑戰、成人內容和錯誤資訊推給非常年幼的觀眾。" },
      { t: "Lost sleep and play 失去的睡眠與遊戲", en: "Hours of scrolling replace sleep, outdoor play and reading, which growing bodies and minds need.", zh: "好幾小時的滑手機取代了成長中身心所需的睡眠、戶外遊戲和閱讀。" }
    ],
    disagree: [
      { t: "Bite-sized learning 小份量學習", en: "Short videos explain science, history and English in ways that are fast, visual and fun.", zh: "短影音用快速、視覺化又有趣的方式解釋科學、歷史和英文。" },
      { t: "Creativity 創造力", en: "Children learn to film, edit, write scripts and perform, and share their work with a real audience.", zh: "孩子學會拍攝、剪輯、寫腳本和表演，並與真實觀眾分享作品。" },
      { t: "Culture and connection 文化與連結", en: "Short videos are how children share jokes, music and trends with friends; banning them means isolation.", zh: "短影音是孩子和朋友分享笑話、音樂和潮流的方式，禁止等於孤立。" },
      { t: "Supervision, not prohibition 監督而非禁止", en: "With kids' modes, time limits and parents watching alongside, the risks are manageable.", zh: "有兒童模式、時間限制和家長陪看，風險是可以控制的。" }
    ]
  },
  agree: [
    ["child swiping · 15-second clips · 2 hours", "**Give a seven-year-old** a tablet **and** within minutes she **will be** swiping through fifteen-second videos **at** a speed **that** would exhaust an adult."],
    ["TikTok · YouTube Shorts · Reels · under-10s", "**Short-video platforms such as** TikTok, YouTube Shorts **and** Instagram Reels **were designed for** teenagers **and** adults, **yet** their heaviest users **are now** children **under** ten."],
    ["stance: bad for children · attention + content", "**I agree that** watching short videos **is** bad **for** children, **because** it **shortens** their attention span **and** exposes them **to** content **they are** far too young **to** handle."],
    ["attention span", "**The most worrying effect is** on children's ability **to** concentrate."],
    ["15-second brain · 40-minute lesson · books unbearable", "**A brain that** is rewarded **every** fifteen seconds **with** a new clip **learns to** expect constant stimulation, **so that** a forty-minute lesson **or** a chapter book **feels** unbearably slow **by** comparison."],
    ["my nephew · can't finish a picture book · 'boring'", "**My six-year-old nephew,** **who** watches Shorts **every** evening, **now abandons** picture books **after** two pages **and** calls everything **that** does not move 'boring'."],
    ["→ teachers report restless classes", "**Teachers across the country** **report** the same pattern: restless classes **that** cannot sit **through** a story."],
    ["addictive design · inappropriate content · sleep", "**In addition,** short-video apps **are** both addictive **and** unsafe."],
    ["infinite scroll · no stopping point · dangerous challenges · 11 p.m.", "**Infinite scroll** **removes** every natural stopping point, **so** children **swipe** until a parent **takes** the device away; **meanwhile,** algorithms **push** dangerous challenges **and** adult content **to** viewers **who** are far too young **to** judge them, **often** late **into** the night **when** they **should** be asleep."],
    ["concession: educational clips · creativity", "**Admittedly,** some short videos **explain** science **or** history **in** clever ways, **and** older children **enjoy** making their own."],
    ["rebuttal: same lessons in books/longer videos · creativity ≠ endless feed", "**However,** the same lessons **are available** in books **and** longer videos **without** the endless feed, **and** creativity **does not require** an algorithm **feeding** a child **two hours** of clips a day."],
    ["restate: keep children away from short videos", "**In conclusion,** parents **should** keep young children **away from** short-video apps **until** they **are** old enough **to** control them."],
    ["closing: childhood should last longer than 15 seconds", "**A childhood, after all, deserves** attention spans longer **than** fifteen seconds."]
  ],
  disagree: [
    ["parents panic about every new medium", "**Every generation of parents** **has panicked about** a new medium — comics, television, video games — **and** short videos **are** simply the latest."],
    ["short videos = main way kids consume media", "**Although** critics **describe** TikTok **and** YouTube Shorts **as** poison **for** young minds, **short videos** **have become** the main way children **learn, laugh and** connect."],
    ["stance: not bad · learning + creativity (with supervision)", "**I disagree that** watching short videos **is** bad **for** children; **with** sensible supervision, **they are** a valuable source **of** learning **and** creativity."],
    ["bite-sized learning", "**First of all,** short videos **teach** children **in** a form **that** suits **how** they learn."],
    ["science in 60 sec · visual · English clips · curiosity", "A sixty-second clip **can** show a volcano erupting, explain **why** the sky is blue **or** teach five English phrases **with** pictures **and** music, **and** children **remember** these lessons **far** better **than** a page of text **because** they **are** visual **and** fun."],
    ["my cousin · 9 · learned about dinosaurs & English from Shorts", "**My nine-year-old cousin** **knows** more **about** dinosaurs **and** space **than** I did **at** fifteen, **and** she **picked up** most of her English vocabulary **from** short cartoon clips **she** watches **with** her mother."],
    ["→ curiosity leads to books", "**Far from** replacing books, the videos **made** her curious enough **to** borrow five dinosaur books **from** the library."],
    ["creativity · culture · connection", "**Secondly,** short videos **turn** children **from** passive viewers **into** creators."],
    ["film · edit · script · perform · share jokes with friends · isolation if banned", "Children **learn to** plan a story, film it, edit it **and** perform **in front of** a real audience, **and** sharing jokes, songs **and** trends **with** classmates **is** how friendship works today — a child **who is** banned **from** all of it **is** simply left out."],
    ["concession: attention span · inappropriate content", "**It is true that** endless scrolling **can** shorten attention spans **and that** some content **is** unsuitable **for** children."],
    ["rebuttal: kids' mode · time limits · watch together", "**Nevertheless,** kids' modes, daily time limits **and** parents **watching alongside** **manage** these risks **effectively,** **just as** they do **for** television."],
    ["restate: supervised short videos are fine", "**On balance,** short videos **watched with** guidance **do** children **more good than harm**."],
    ["closing: the screen is not the enemy; neglect is", "**The screen is not** the enemy — **unsupervised** screen time **is**."]
  ],
  vocab: [["stimulation", "刺激"], ["unbearably", "難以忍受地"], ["restless", "坐不住的"], ["algorithm", "演算法"], ["medium", "媒介"], ["passive", "被動的"], ["supervision", "監督"], ["manageable", "可控制的"]]
};

window.PET_ESSAY_ADV[12] = {
  args: {
    agree: [
      { t: "Health crisis 健康危機", en: "One in four Taiwanese teenagers is overweight; compulsory sport is the only exercise many students get.", zh: "台灣四分之一的青少年過重，必修運動是許多學生唯一的運動。" },
      { t: "Better brains 更好的大腦", en: "Exercise improves memory, mood and concentration, so sporty students often study better, not worse.", zh: "運動改善記憶、情緒和專注力，愛運動的學生常常讀得更好而非更差。" },
      { t: "Teamwork and resilience 團隊合作與韌性", en: "Sport teaches losing gracefully, supporting teammates and trying again after failure.", zh: "運動教人優雅地輸、支持隊友、失敗後再試一次。" },
      { t: "Habits for life 終身習慣", en: "Students who find a sport they enjoy at school keep exercising as adults.", zh: "在學校找到喜歡運動的學生，成年後會持續運動。" }
    ],
    disagree: [
      { t: "Forced sport breeds hatred 被迫運動只會讓人討厭", en: "Students forced to run laps in the heat learn to hate exercise, not love it.", zh: "被迫在高溫下跑圈的學生只會學到討厭運動，而不是愛上它。" },
      { t: "Not everyone is athletic 不是人人都擅長運動", en: "Students with asthma, disabilities or simply no talent are humiliated in compulsory competitions.", zh: "有氣喘、身心障礙或單純沒天分的學生在必修競賽中會感到羞辱。" },
      { t: "Time and priorities 時間與優先順序", en: "Hours of required sport steal time from music, art, coding and studying for exams.", zh: "被要求的運動時數偷走音樂、美術、程式和準備考試的時間。" },
      { t: "Choice works better 選擇更有效", en: "Offering dance, yoga, hiking or cycling as options gets more students moving than forcing one sport.", zh: "提供舞蹈、瑜珈、健行或騎車等選項，比強迫一種運動更能讓學生動起來。" }
    ]
  },
  agree: [
    ["PE class · half the class sitting in the shade", "**In many PE lessons,** half the class **sits in** the shade **with** a doctor's note **while** the other half **plays** basketball."],
    ["overweight teens rising · phones · cram school", "**With** one in four Taiwanese teenagers **now** overweight **and** most of them **spending** their evenings **at** cram school **or** on their phones, schools **are asking whether** sport **should** become compulsory."],
    ["stance: require a sport · health + character", "**I firmly agree that** every student **should be required to** do a sport **at** school, **because** regular exercise **protects** health **and** builds character **in ways that** the classroom cannot."],
    ["health · brains", "**The most urgent reason is** health."],
    ["only exercise many get · memory · mood · concentration", "**For** many students, a school sport **is** the only exercise **they** get all week, **and** the benefits **go far beyond** the body: exercise **improves** memory, mood **and** concentration, **which is why** sporty students **often** study better, **not** worse."],
    ["my class · morning run · fewer sick days · grades", "**After** my school **introduced** a compulsory twenty-minute morning run, students **in** my class **took** fewer sick days **and** our average grades **actually improved** **by** the end of the year."],
    ["→ healthy body, sharper mind", "**A healthier body, it turned out,** **meant** a sharper mind."],
    ["teamwork · resilience · habits", "**Furthermore,** sport **teaches** lessons **that** no textbook contains."],
    ["losing gracefully · support teammates · try again · lifelong habit", "**Losing** a match **gracefully,** **supporting** a teammate **who** made a mistake **and** trying again **after** failure **build** resilience **and** empathy, **and** students **who** discover a sport **they** enjoy **at** school **tend to** keep exercising **for** the rest of their lives."],
    ["concession: not everyone athletic · forced = hated", "**Admittedly,** not every student **is** athletic, **and** being forced **to** run laps **in** the July heat **can** make some teenagers **hate** exercise."],
    ["rebuttal: wide choice · dance, yoga, hiking · participation not performance", "**However,** 'a sport' **can** mean dance, yoga, table tennis **or** hiking, **and** schools **should** grade participation, **not** performance, **so that** everyone **can** find something **they** enjoy."],
    ["restate: compulsory sport benefits all", "**In conclusion,** requiring every student **to** do a sport **is** one of the best investments **a** school **can** make."],
    ["closing: a strong mind needs a strong body", "**A strong mind, after all, needs** a strong body **to** carry it."]
  ],
  disagree: [
    ["asthmatic student · forced to run · humiliated", "**Picture a student with** asthma **being** forced **to** run 1,600 metres **while** her classmates **wait** and laugh."],
    ["schools consider compulsory sport · good intentions", "**Schools that want to** make sport compulsory **have** good intentions, **but** good intentions **do not** make a policy work."],
    ["stance: do not require · forced ≠ love · time", "**I disagree that** every student **should be required to** do a sport, **because** forced exercise **breeds** resentment **rather than** fitness, **and** students **have** other priorities **that** deserve respect."],
    ["forced sport breeds hatred", "**To begin with,** compulsion **is** the surest way **to** make teenagers **hate** something."],
    ["laps in the heat · graded on speed · humiliation · asthma / disability", "**Students who are** graded **on** how fast they run **or** how many goals they score **learn** only **that** sport **means** humiliation, **and** those **with** asthma, disabilities **or** simply no talent **suffer** most; **once** they leave school, they **never** exercise again."],
    ["my sister · compulsory swimming · still afraid of water", "**My sister was forced to** take swimming classes **for** three years **and** was mocked **for** being slow; **today,** at twenty, she **still** refuses **to** go near a pool."],
    ["→ the opposite of the intended result", "**The requirement achieved** exactly the opposite **of** what it intended."],
    ["time · priorities · choice", "**Secondly,** compulsory sport **takes** time **from** things **that** matter **to** individual students."],
    ["music · art · coding · exams · choice works better: dance, yoga, cycling", "A violinist, a young programmer **or** a student preparing for the 會考 **has** every right **to** spend her afternoons **on** her own goals, **and** schools **that** offer a wide menu of options — dance, yoga, cycling, hiking — **get** far more students moving **than** those **that** impose one sport **on** everyone."],
    ["concession: health crisis · exercise helps the brain", "**It is undeniable that** teenage obesity **is** rising **and that** exercise **benefits** the brain **as well as** the body."],
    ["rebuttal: encourage, don't force · PE + clubs + walking to school", "**Nevertheless,** encouragement **works** better **than** force: good PE lessons, attractive clubs **and** safe routes **for** walking **or** cycling **to** school **improve** health **without** a single forced lap."],
    ["restate: offer sport, do not require it", "**In conclusion,** schools **should** offer sport generously **but** never require it."],
    ["closing: you cannot force someone to love moving", "**Nobody has ever been forced** **into** loving exercise."]
  ],
  vocab: [["compulsory", "強制的、必修的"], ["overweight", "過重的"], ["resilience", "韌性"], ["participation", "參與"], ["resentment", "怨恨"], ["humiliation", "羞辱"], ["impose", "強加"], ["obesity", "肥胖"]]
};

window.PET_ESSAY_ADV[13] = {
  args: {
    agree: [
      { t: "Money must be earned 錢必須靠努力賺", en: "Linking pocket money to chores teaches the basic rule of adult life: income follows effort.", zh: "把零用錢和家事連結，教導成人世界的基本規則：收入來自努力。" },
      { t: "Responsibility at home 在家的責任", en: "Children who are paid for chores actually do them, and the house runs better for everyone.", zh: "有報酬的孩子真的會做家事，整個家運作得更順。" },
      { t: "Budgeting skills 理財能力", en: "Earning a set amount teaches children to save, plan and compare prices.", zh: "賺到固定金額讓孩子學會儲蓄、規劃和比價。" },
      { t: "Appreciation of parents 感謝父母", en: "Washing dishes for NT$20 makes children realise how much unpaid work their parents do.", zh: "洗碗賺 20 元讓孩子明白父母做了多少沒有報酬的工作。" }
    ],
    disagree: [
      { t: "Family is not a job 家庭不是工作", en: "Chores are a shared duty; paying for them teaches children that helping the family is optional.", zh: "家事是共同責任，付錢做家事會讓孩子覺得幫忙家庭是可有可無的。" },
      { t: "'How much will you pay me?' 「你要給我多少？」", en: "Once chores have a price, children refuse to help unless they are paid.", zh: "一旦家事有了價格，孩子沒有報酬就拒絕幫忙。" },
      { t: "Unfair to poorer families 對較窮的家庭不公平", en: "Children in wealthy homes earn more for the same work; pocket money should not depend on parents' income.", zh: "富裕家庭的孩子做同樣的事賺得更多，零用錢不該取決於父母收入。" },
      { t: "Allowance teaches budgeting anyway 零用錢本身就能教理財", en: "A fixed allowance teaches saving and planning without turning the home into a workplace.", zh: "固定零用錢就能教儲蓄和規劃，不必把家變成職場。" }
    ]
  },
  agree: [
    ["Sunday · 'can I have NT$500?' · hand out", "**'Can I have five hundred dollars?'** **is** a question most Taiwanese parents **hear** every weekend, **usually** from a child **who** has not lifted a finger all week."],
    ["many parents give money freely · others link to chores", "**While** some families **hand out** pocket money **automatically,** others **have begun to** link it **to** chores, **and** the two approaches **produce** very different children."],
    ["stance: pocket money only for chores · value of money + responsibility", "**I agree that** children **should** receive pocket money **only when** they do chores, **because** this **teaches** the value of money **and** responsibility **at** the same time."],
    ["money must be earned", "**The strongest argument is that** earning money **is** the most basic lesson **of** adult life."],
    ["income follows effort · nobody pays adults for existing", "**Nobody pays** adults **for** simply existing; income **follows** effort, **and** a child **who** learns this **at** eight **will not be** shocked **by** it **at** eighteen."],
    ["my family · NT$20 per task · my brother's behaviour changed", "**In my family,** each chore **has** a price — twenty dollars **for** the dishes, fifty **for** cleaning the bathroom — **and** since this system **began,** my younger brother **has stopped** asking **for** money **and** started asking **for** work."],
    ["→ saving for a bike · learned patience", "**He is now saving for** a bicycle, **and** he **has learned** patience **and** planning **that** no lecture **could** have taught him."],
    ["responsibility at home · appreciation", "**Secondly,** paid chores **make** children **genuine** contributors **to** the household."],
    ["chores actually done · realise parents' unpaid work", "**Children who are** paid **for** chores **actually do** them, **so** the house **runs** more smoothly; **more importantly,** washing dishes **for** twenty dollars **makes** a child **realise** how much unpaid work **their** parents do **every** single day."],
    ["concession: family duty · 'how much will you pay?'", "**Critics warn that** children **may** refuse **to** help **unless** they **are** paid, **since** family duties **should** be free."],
    ["rebuttal: basic duties unpaid · extra tasks paid", "**However,** a sensible system **separates** basic duties, **such as** tidying one's own room, **from** extra tasks **that** earn money, **so** children **learn** both generosity **and** the value **of** work."],
    ["restate: link money to chores", "**To conclude,** linking pocket money **to** chores **prepares** children **for** the real world **far** better **than** a weekly gift ever could."],
    ["closing: money earned is money understood", "**Money earned, after all, is** money understood."]
  ],
  disagree: [
    ["child: 'how much will you pay me?' · mother shocked", "**'How much will you pay me?'** asked the ten-year-old **when** her mother **asked** her **to** set the table — **and** the mother **realised** something had gone wrong."],
    ["popular parenting advice · chores for cash", "**Paying children for chores** **has become** popular parenting advice, **promoted** in books **and** online **as** a way **to** teach the value of money."],
    ["stance: no · family duty + budgeting without pay", "**I disagree that** children **should** get pocket money **only when** they do chores, **because** this approach **turns** family life **into** a business **and** is unnecessary **for** teaching money skills."],
    ["family is not a job", "**The fundamental problem is that** a family **is not** a workplace."],
    ["shared duty · helping = optional · refuse without pay", "**Chores are** a shared responsibility **that** everyone **does because** they **live** together, **and** the moment they **are** given a price, children **learn** that helping **is** optional — **something** you **do** only **when** the pay **is** right."],
    ["my cousin · paid system · refused to help grandmother", "**My cousin, who grew up** with a chore-payment system, **once refused to** carry groceries **for** our grandmother **because,** **as** he put it, 'nobody **is** paying me'."],
    ["→ kindness replaced by calculation", "**The system had replaced** kindness **with** calculation."],
    ["unfair · allowance teaches budgeting anyway", "**Furthermore,** paying for chores **is** both unfair **and** unnecessary."],
    ["rich kids earn more for same work · fixed allowance teaches saving", "**Children in** wealthy homes **earn** far more **for** the same work **than** children **in** poorer ones, **and** a fixed weekly allowance **teaches** saving, planning **and** comparing prices **just as well,** **without** turning every dish **into** a transaction."],
    ["concession: money must be earned · motivation", "**Supporters argue that** children **must** learn **that** money **comes from** effort."],
    ["rebuttal: part-time jobs later · chores are about love", "**That lesson, however, belongs to** a part-time job **at** sixteen, **not** to a seven-year-old **being paid** to hug her own responsibilities; chores **should** teach love, **not** economics."],
    ["restate: allowance and chores should be separate", "**In conclusion,** pocket money **and** chores **should remain** separate, **so that** children **help** because they care, **not** because they **are** paid."],
    ["closing: a family runs on love, not invoices", "**A family runs on** love, **not** invoices."]
  ],
  vocab: [["lift a finger", "動一根手指（幫忙）"], ["contributor", "貢獻者"], ["household", "家庭、家務"], ["generosity", "慷慨"], ["optional", "可選擇的"], ["transaction", "交易"], ["calculation", "算計"], ["invoice", "帳單"]]
};

window.PET_ESSAY_ADV[14] = {
  args: {
    agree: [
      { t: "Light and convenient 輕便方便", en: "One tablet holds every textbook, so students no longer carry 8-kilogram school bags.", zh: "一台平板裝下所有課本，學生不必再背 8 公斤的書包。" },
      { t: "Search, highlight, dictionary 搜尋、畫線、字典", en: "Students can search a chapter instantly, tap a word for its meaning and never lose their notes.", zh: "學生能即時搜尋章節、點一下查字義，筆記也永不遺失。" },
      { t: "Cheaper and greener 更便宜、更環保", en: "E-books cost less, are updated instantly and save millions of trees every year.", zh: "電子書更便宜、能即時更新，每年省下數百萬棵樹。" },
      { t: "Accessibility 無障礙", en: "Adjustable fonts, read-aloud and translation help students with weak eyesight or dyslexia.", zh: "可調字體、朗讀和翻譯功能幫助視力不佳或閱讀障礙的學生。" }
    ],
    disagree: [
      { t: "Deeper reading on paper 紙本閱讀更深入", en: "Studies show readers remember and understand more from paper, especially long or difficult texts.", zh: "研究顯示讀者從紙本記得和理解更多，尤其是長篇或艱深的文章。" },
      { t: "No distractions 沒有干擾", en: "A paper book cannot show notifications, games or videos; a tablet always can.", zh: "紙本書不會跳出通知、遊戲或影片，平板永遠會。" },
      { t: "Eyes and sleep 眼睛與睡眠", en: "Hours of screen reading strain the eyes, and blue light before bed disrupts sleep.", zh: "長時間看螢幕傷眼，睡前藍光也擾亂睡眠。" },
      { t: "No battery, no Wi-Fi, no fee 不用電池、網路和費用", en: "Paper works anywhere, lasts decades and can be lent or resold; digital files can vanish or be locked.", zh: "紙本到處都能用、可用數十年、能借能賣；數位檔案可能消失或被鎖住。" }
    ]
  },
  agree: [
    ["8 kg schoolbag · 7 a.m.", "**Every morning,** thousands of junior high students **drag** eight-kilogram schoolbags **onto** crowded buses, **their** shoulders **bent** under textbooks **they** will open **for** only one lesson."],
    ["schools trial tablets · Taiwan digital learning", "**With** the Ministry of Education **now** supplying tablets **to** schools, the question **of whether** e-books **should** replace paper **has become** urgent."],
    ["stance: e-books are better · convenience + tools", "**In my opinion,** e-books **are** better **than** paper books **for** students, **because** they **are** far more convenient **and** offer learning tools **that** paper simply cannot."],
    ["light & convenient", "**The most obvious advantage is** convenience."],
    ["one tablet = all books · no forgotten textbook · notes never lost", "**A single** 400-gram tablet **holds** every textbook, dictionary **and** workbook a student needs, **so** nobody **forgets** the right book **or** loses their notes, **and** homework **can be done** on the MRT, **at** a café **or** in bed."],
    ["my school · tablets · bag 8 kg → 2 kg · back pain gone", "**Since my school switched to** e-textbooks last year, my bag **has shrunk from** eight kilograms **to** two, **and** the back pain **that** used to bother me **has** disappeared."],
    ["→ small change, daily difference", "**A small change, perhaps, but one that** makes **a** difference **every** single day."],
    ["search · dictionary · accessibility · green", "**Even more importantly,** e-books **make** studying smarter."],
    ["search a chapter · tap word · adjust font · read aloud · cheaper · trees", "Students **can** search an entire chapter **in** seconds, tap any word **for** its meaning, enlarge the font **or** have the text read aloud — tools **that** help weak readers **and** students **with** poor eyesight **enormously** — **and** e-books **cost** less **and** save millions of trees **every** year."],
    ["concession: distraction · eye strain · remember more on paper", "**Admittedly,** screens **invite** distraction, **tire** the eyes **and,** **according to** some studies, **lead to** slightly weaker memory **than** paper."],
    ["rebuttal: e-ink readers · focus modes · habits improve", "**However,** e-ink readers **are** as gentle **on** the eyes **as** paper, focus modes **block** notifications, **and** the memory gap **shrinks** as students **get used to** reading on screens."],
    ["restate: e-books are the better choice", "**In conclusion,** e-books **are** the better choice **for** today's students: lighter, cheaper **and** packed **with** tools **that** paper **cannot** offer."],
    ["closing: the best book is the one you always have with you", "**The best textbook, after all, is** the one **you** always have **with** you."]
  ],
  disagree: [
    ["smell of a new book · pencil underlining", "**There is something about** the weight of a paper book **and** the scratch of a pencil **underlining** a key sentence **that** no screen **has ever** replaced."],
    ["schools push tablets · 'modern' · but evidence?", "**Schools are rushing to** replace paper **with** tablets **in the name of** modernisation, **yet** the evidence **suggests** that students **learn** better **from** paper."],
    ["stance: paper is better · deeper reading + no distractions", "**I disagree that** e-books **are** better **than** paper books **for** students, **because** paper **supports** deeper reading **and** keeps distraction **out of** the study desk."],
    ["deeper reading", "**The most important reason is that** students **understand and remember** more **when** they read **on** paper."],
    ["studies · long/difficult texts · mental map of the page · scrolling", "**Numerous studies** **have found that** readers **of** paper **score higher** on comprehension tests, **especially with** long **or** difficult texts, **because** the physical page **gives** the brain a map — **you** remember **that** the formula **was** at the top of the left page, **not** somewhere **in** an endless scroll."],
    ["my experience · history on tablet → paper · grades up", "**I studied history** **on** a tablet **for** one semester **and** my scores **fell**; **when** I **went back to** the paper textbook **and** my highlighter, **they** recovered **within** a month."],
    ["→ the medium matters", "**The medium, it turns out,** **matters** as much **as** the content."],
    ["no distractions · eyes · sleep", "**Furthermore,** a paper book **is** the only study tool **that** cannot interrupt you."],
    ["tablet = games, notifications · blue light · eye strain · 'just one video'", "**A tablet is** also a games console, a messaging app **and** a video player, **and** 'just one video' **turns into** an hour; **on top of that,** screen reading **strains** the eyes **and** blue light **before** bed **wrecks** sleep, **whereas** a paper book **asks** nothing **of** you **but** attention."],
    ["concession: heavy bags · search · cheaper", "**It cannot be denied that** paper textbooks **are** heavy **and that** e-books **are** searchable **and** cheaper."],
    ["rebuttal: lockers · lighter editions · paper lasts, no battery, resell", "**Yet** lockers **and** lighter editions **solve** the weight problem, **and** paper **needs** no battery, no Wi-Fi **and** no subscription — it **works** in a power cut, **lasts** decades **and** can be lent **to** a younger brother."],
    ["restate: paper remains better for learning", "**All things considered,** paper books **remain** the better tool **for** serious study."],
    ["closing: technology should serve reading, not replace it", "**Technology should serve** reading, **not** replace the page."]
  ],
  vocab: [["convenience", "便利"], ["enlarge", "放大"], ["enormously", "極大地"], ["distraction", "干擾"], ["comprehension", "理解"], ["medium", "媒介"], ["subscription", "訂閱"], ["interrupt", "打斷"]]
};

window.PET_ESSAY_ADV[15] = {
  args: {
    agree: [
      { t: "Large classes, little attention 大班制、少關注", en: "With 30 students per class, teachers cannot help each one; cram schools fill the gap.", zh: "一班 30 人，老師無法照顧每個人，補習班填補了這個空缺。" },
      { t: "Exam skills 考試技巧", en: "The 會考 and 學測 reward test technique, and cram schools teach it systematically.", zh: "會考和學測獎勵考試技巧，而補習班有系統地教導這些技巧。" },
      { t: "Catching up and getting ahead 補救與超前", en: "Weak students catch up and strong students go beyond the textbook, which school rarely allows.", zh: "弱的學生能補救，強的學生能超越課本，這在學校很少做得到。" },
      { t: "Structure and supervision 結構與監督", en: "Working parents cannot supervise homework; cram schools provide a quiet place and a routine.", zh: "上班的父母無法監督功課，補習班提供安靜的環境與固定作息。" }
    ],
    disagree: [
      { t: "Exhaustion 筋疲力盡", en: "School until five and cram school until ten leaves no time for sleep, exercise or thinking.", zh: "學校上到五點、補習到十點，沒有時間睡覺、運動或思考。" },
      { t: "Dependence, not learning 依賴而非學習", en: "Students stop paying attention at school because they know the cram school will re-teach it.", zh: "學生在學校不再專心，因為知道補習班會再教一遍。" },
      { t: "Inequality 不平等", en: "Cram schools cost thousands a month, so wealthy families buy advantages poorer ones cannot.", zh: "補習班每月花費數千元，富裕家庭買到較窮家庭無法擁有的優勢。" },
      { t: "Memorising, not thinking 背誦而非思考", en: "Cram schools drill answers and tricks, not curiosity, creativity or real understanding.", zh: "補習班操練答案和技巧，而不是好奇心、創造力或真正的理解。" }
    ]
  },
  agree: [
    ["9 p.m. · Nanyang Street · students pouring out", "**At nine o'clock every weeknight,** thousands of students **pour out of** the cram schools **of** Taipei's Nanyang Street, **their** bags **full of** practice tests."],
    ["Taiwan: most students attend · criticised · but endure", "**Cram schools have been criticised for** decades **as** a symptom **of** an unhealthy education system, **yet** they **continue to** thrive **because** families **find** them useful."],
    ["stance: necessary · attention + exam skills", "**I agree that** cram schools **are** necessary **for** most students, **since** they **provide** the individual attention **and** exam preparation **that** schools **cannot**."],
    ["large classes, little attention", "**To begin with,** public schools **are** simply too crowded **to** help every student."],
    ["30 per class · 45 min · no time for questions · fill the gap", "**With** thirty students **per** class **and** forty-five minutes **per** lesson, a teacher **cannot** stop **to** explain a formula **a third time,** **and** students **who** fall behind **stay** behind; cram schools, **with** smaller classes **and** tutors **available** after class, **fill** exactly this gap."],
    ["my cousin · failed maths · cram school · passed 會考", "**My cousin was failing** maths **in** eighth grade **until** his parents **sent** him **to** a cram school **where** the tutor **spent** twenty minutes **on** his specific mistakes **each** week."],
    ["→ passed 會考 with a B+ · confidence", "**A year later** he **passed** the 會考 **with** a B+, **and,** **more importantly,** he **stopped** believing **he** was 'bad **at** maths'."],
    ["exam skills · structure", "**In addition,** cram schools **teach** the test **itself** — **and** the test decides the future."],
    ["會考/學測 reward technique · time management · working parents · quiet place", "**Since** the 會考 **and** 學測 **reward** technique **as much as** knowledge, learning **to** manage time **and** recognise question types **is** essential, **and** for the many students **whose** parents **work** until eight, a cram school **also offers** a quiet desk **and** a routine **that** an empty apartment **cannot**."],
    ["concession: exhaustion · cost", "**Admittedly,** cram schools **are** expensive, **and** students **who** attend **until** ten **are** exhausted."],
    ["rebuttal: choose 2 subjects · scholarships · cost of failing is higher", "**However,** families **can** limit attendance **to** one **or** two weak subjects, many cram schools **offer** discounts, **and** the cost **of** failing an exam **that** shapes a career **is** far higher **than** a few thousand dollars a month."],
    ["restate: necessary, used wisely", "**In conclusion,** cram schools **are** a necessary part **of** education in Taiwan **as long as** they **are** used wisely."],
    ["closing: until schools change, cram schools fill the gap", "**Until** schools **can** give every child individual attention, cram schools **will** remain necessary."]
  ],
  disagree: [
    ["student asleep on the bus at 10 p.m.", "**A fourteen-year-old** **asleep on** the bus **at** ten o'clock **at** night, a maths workbook **sliding off** her lap — **this is** what 'necessary' **looks like** in Taiwan."],
    ["80% attend · parents fear falling behind", "**Around eighty per cent of** students **attend** cram schools, **not because** they **need** to, **but because** their parents **are afraid** of what happens **if** they **don't**."],
    ["stance: not necessary · exhaustion + dependence", "**I disagree that** cram schools **are** necessary, **because** they **exhaust** students, **create** dependence **and** replace real understanding **with** memorised tricks."],
    ["exhaustion", "**The most visible cost is** exhaustion."],
    ["school till 5 · cram till 10 · homework · 6 hrs sleep · no exercise", "**A student who leaves** school **at** five, **sits in** a cram school **until** ten **and then** does homework **until** midnight **sleeps** six hours, **exercises** never **and** has **no** time left **to** think, read **or** simply be a teenager."],
    ["my classmate · 4 cram schools · fainted · grades fell", "**My classmate attends** four cram schools; last spring she **fainted** in PE **from** lack of sleep, **and** her grades **actually fell** **because** she **was** too tired **to** absorb anything."],
    ["→ more hours, less learning", "**More hours, in other words, produced** less learning."],
    ["dependence · memorising · inequality", "**Worse still,** cram schools **undermine** real education."],
    ["stop listening at school · re-taught later · drill tricks · NT$8000/month · wealth buys advantage", "Students **stop** paying attention **in** class **because** they **know** the material **will be** re-taught **at** night; tutors **drill** answer patterns **rather than** curiosity; **and** at NT$8,000 **a** month **per** subject, wealthy families **simply buy** advantages **that** poorer students **can** never afford."],
    ["concession: large classes · exam skills", "**It is true that** school classes **are** large **and that** exams **reward** technique."],
    ["rebuttal: self-study, free online lessons, school tutoring work as well", "**Nevertheless,** disciplined self-study, free online lessons **and** after-school help **from** school teachers **achieve** the same results — **the** top student **in** my grade **has never** set foot **in** a cram school."],
    ["restate: not necessary", "**In conclusion,** cram schools **are** a habit, **not** a necessity, **and** students **would** learn more **with** fewer of them."],
    ["closing: tired minds don't learn", "**Education should wake** young minds **up,** **not** send them **to** sleep **on** the bus."]
  ],
  vocab: [["thrive", "興盛"], ["fall behind", "落後"], ["technique", "技巧"], ["routine", "固定作息"], ["exhaust", "使筋疲力盡"], ["dependence", "依賴"], ["undermine", "削弱"], ["drill", "反覆操練"]]
};

window.PET_ESSAY_ADV[16] = {"args": {"agree": [{"t": "Immersive Experience 沉浸式體驗", "en": "Watching a film in a theater offers an immersive experience that no living room can match. A giant screen, surround sound and a completely dark room pull viewers into the story and shut out the outside world.", "zh": "在電影院看電影能提供客廳無法比擬的沉浸式體驗。巨大的銀幕、環繞音效與全暗的空間把觀眾拉進故事，隔絕外界的一切。"}, {"t": "Full Concentration 全神貫注", "en": "A theater allows audiences to give a film their full attention. Phones are switched off, there is no pause button and no household chores calling, so viewers follow every detail of the plot.", "zh": "電影院讓觀眾能全神貫注地看電影。手機關機、沒有暫停鍵、也沒有家事打擾，觀眾能跟上劇情的每個細節。"}, {"t": "A Shared Social Event 共同的社交活動", "en": "Going to the cinema is a social event rather than just a way to watch a film. Laughing, gasping and clapping together with a crowd makes every emotion stronger, and a night out with friends creates lasting memories.", "zh": "去電影院是一場社交活動，而不只是看一部電影。和一群觀眾一起大笑、驚呼、鼓掌會放大每一種情緒，和朋友出門看電影也能留下長久的回憶。"}, {"t": "Supporting the Film Industry 支持電影產業", "en": "Buying cinema tickets directly supports filmmakers and local cinemas. Box-office income decides which films get sequels and whether smaller productions can be made, and it keeps cinema staff employed.", "zh": "買電影票能直接支持電影創作者與在地戲院。票房收入決定哪些電影能拍續集、小成本電影能否開拍，也讓戲院員工保住工作。"}], "disagree": [{"t": "Convenience and Flexibility 方便與彈性", "en": "Streaming allows people to watch films whenever and wherever they like. Viewers can pause, rewind or finish a film tomorrow, with no travel and no fixed showtimes.", "zh": "串流讓人隨時隨地都能看電影。觀眾可以暫停、倒帶，或明天再看完，不必出門、也不用配合固定場次。"}, {"t": "Lower Cost 花費較低", "en": "Streaming is much cheaper than going to the cinema. One monthly subscription costs about the same as a single ticket, yet it offers thousands of films and series for the whole family.", "zh": "串流比去電影院便宜得多。一個月的訂閱費約等於一張電影票，卻提供全家數千部電影與影集。"}, {"t": "Comfort and Privacy 舒適與隱私", "en": "Watching at home is more comfortable and private. Viewers can relax on their own sofa, eat their own food and avoid noisy audiences, kicking seats or phones lighting up in the dark.", "zh": "在家看電影更舒適、更有隱私。觀眾可以窩在自家沙發、吃自己的食物，避開吵鬧的觀眾、踢椅背的人和黑暗中亮起的手機。"}, {"t": "A Huge Choice 選擇多元", "en": "Streaming platforms offer a much wider range of content than cinemas. Besides new releases, they include classic films, documentaries, foreign dramas and independent works that cinemas rarely show.", "zh": "串流平台提供的內容比電影院多元得多。除了新片，還有經典電影、紀錄片、外國影集和電影院很少放映的獨立作品。"}]}, "agree": [["lights dim · phones off · story begins", "**There is something magical about** the moment **when** the lights dim, the phones go dark and a story fills a screen ten metres wide."], ["streaming platforms · cinemas closing?", "**With the rise of** streaming platforms such as Netflix and Disney+, **an increasing number of** people **now** wait for films to appear on their televisions, **and** some predict that cinemas **will** soon disappear."], ["stance: theater · immersion + shared event", "**Nevertheless, I firmly prefer** watching films in a theater, **because** it **offers** a level of immersion that no living room can match **and** turns a film **into** a shared experience."], ["immersion · full attention", "**First and foremost,** a cinema **provides** the conditions a film needs **to** work its magic."], ["giant screen · surround sound · no pause · no phone", "**Not only does** a giant screen with surround sound **pull** viewers into the story, **but** the dark room **also** removes the distractions of home, **so that** every detail of the plot **receives** full attention."], ["thriller at home · checked phone · missed clue", "**When I watched** a complex thriller at home last year, **I checked** my phone **so** often **that** I missed the key clue; **by contrast, I remember** every scene of the film I saw in an IMAX theater."], ["→ understood & remembered better", "**As a result,** films watched in a cinema **are** understood **and** remembered **far more** deeply **than** those watched on a sofa."], ["social event · shared emotion", "**In addition,** going to the cinema **is** a social event **rather than** simply a way to watch a film."], ["laugh & gasp with strangers · opening night · cheer", "Laughing, gasping **and** clapping together with hundreds of strangers **makes** every emotion stronger; **on the opening night of** a superhero film, **for example,** the whole audience **cheers** when the hero appears — **an atmosphere that is impossible to** recreate at home."], ["opponents: expensive · inconvenient", "**Admittedly,** opponents **argue that** cinema tickets **are** expensive **and** showtimes inconvenient."], ["occasional treat · weekday discounts", "**However,** a few hundred dollars once a month **is a small price to pay for** an evening that **is** genuinely memorable, **and** weekday discounts **make** it **more affordable than** many people **realise**."], ["theater = better experience", "**In conclusion, although** streaming **is** convenient, **I am convinced that** the cinema **remains** the best place to experience a film."], ["a film is an event, not background noise", "**Ultimately,** a great film **is meant to be** experienced, **not merely** watched."]], "disagree": [["Friday night · own sofa · thousands of films", "**Imagine** finishing a long week, **settling into** your own sofa **and** choosing from thousands of films **with** a single click."], ["subscriptions overtook tickets · pandemic", "**Since** the pandemic, streaming subscriptions **have overtaken** cinema ticket sales in many countries, **and** the habit of watching new releases at home **shows no sign of** fading."], ["stance: streaming · convenience/cost + choice/comfort", "**Personally, I prefer** watching films on streaming platforms, **as** they **are** far more convenient **and** affordable, **and** they **offer** a level of choice and comfort that cinemas **cannot** match."], ["convenience · cost", "**To begin with,** streaming **fits** modern lifestyles **far better than** fixed showtimes do."], ["pause · rewind · subscription = one ticket", "Viewers **can** pause, rewind **or** finish a film the next day, **and** a monthly subscription **costs** about the same **as** a single ticket, **whereas** a cinema trip **requires** travel, fixed times **and** expensive snacks."], ["family of four · NT$1,500 vs < NT$400", "**For instance,** my family of four **spends** over NT$1,500 on tickets and popcorn **for** one night out, **whereas** our streaming plan **costs** less than NT$400 a month."], ["→ more films, less money", "**Consequently,** we **watch** far more films **for** far less money."], ["choice · comfort", "**Furthermore,** streaming platforms **offer** a much wider range of content **in** a far more comfortable setting."], ["classics · documentaries · foreign series · no noisy audience", "**Besides** new releases, they **include** classic films, documentaries **and** foreign series **that** cinemas rarely show — **I discovered** Spanish thrillers and Japanese anime this way — **and** at home **there is no one** talking, kicking seats **or** lighting up a phone in the dark."], ["theater: big screen · atmosphere", "**It is true that** a cinema **offers** a bigger screen **and** a lively atmosphere."], ["large TVs · soundbars · film night with friends", "**Nevertheless,** today's large televisions **and** soundbars **have** greatly **narrowed the gap**, **and** inviting friends **over for** a film night **creates** an atmosphere **that is** just as warm."], ["streaming = smarter choice", "**All things considered, I believe** streaming **is** the smarter **and** more enjoyable way to watch films today."], ["the best seat = your own sofa", "**After all,** the best seat in the house **is** often your own."]], "vocab": [["immersive", "沉浸式的"], ["surround sound", "環繞音效"], ["distraction", "使人分心的事物"], ["atmosphere", "氛圍"], ["subscription", "訂閱"], ["affordable", "負擔得起的"], ["narrow the gap", "縮小差距"], ["recreate", "重現"]]};

window.PET_ESSAY_ADV[17] = {"args": {"agree": [{"t": "Knowledge Is Free and Instant 知識免費又即時", "en": "AI has made specialised knowledge free and instantly available. Students can ask an AI tutor to explain calculus, law or coding at any hour, so a university is no longer the only gateway to expert knowledge.", "zh": "人工智慧讓專業知識變得免費又能即時取得。學生隨時都能請 AI 家教解釋微積分、法律或程式設計，大學不再是取得專業知識的唯一管道。"}, {"t": "Skills Go Out of Date Quickly 技能快速過時", "en": "Degrees cannot keep up with the speed at which AI is changing jobs. A four-year programme may teach skills that are automated before students even graduate.", "zh": "學位跟不上人工智慧改變工作的速度。四年的課程所教的技能，可能在學生畢業前就已被自動化取代。"}, {"t": "Employers Value Skills over Certificates 雇主重視技能勝於文憑", "en": "Employers are increasingly hiring for proven skills rather than diplomas. Portfolios, online certificates and real projects show what a candidate can actually do.", "zh": "雇主越來越看重實際技能，而非文憑。作品集、線上證書和實際專案更能展現求職者的真正能力。"}, {"t": "High Cost, Low Return 成本高、報酬低", "en": "The cost of a degree is becoming hard to justify. Tuition, rent and four years without income add up, while AI-powered courses cost little or nothing.", "zh": "取得學位的成本越來越難以合理化。學費、房租加上四年沒有收入，累積起來非常可觀，而 AI 輔助課程幾乎免費。"}], "disagree": [{"t": "Critical Thinking and Judgement 批判思考與判斷力", "en": "University develops critical thinking that AI cannot replace. Students learn to question evidence, compare theories and argue logically — exactly the skills needed to check whether an AI answer is correct.", "zh": "大學培養的批判思考能力是人工智慧無法取代的。學生學會質疑證據、比較理論、有邏輯地論證，這正是判斷 AI 答案是否正確所需的能力。"}, {"t": "Professional Qualifications 專業資格", "en": "Many careers legally require a degree. Society will not allow unqualified people to practise medicine, law, engineering or teaching, however good their AI tools are.", "zh": "許多職業在法律上要求具備學位。無論 AI 工具多好，社會都不會允許不具資格的人從事醫療、法律、工程或教學工作。"}, {"t": "Hands-on Learning and Research 實作學習與研究", "en": "Universities offer laboratories, equipment and research opportunities that a screen cannot provide. Students work with expert professors on real experiments, often creating the technology that AI itself is built on.", "zh": "大學提供螢幕無法提供的實驗室、設備和研究機會。學生與專業教授一起進行真實實驗，常常正是在創造 AI 賴以建立的技術。"}, {"t": "Networks and Soft Skills 人脈與軟實力", "en": "University builds networks and social skills that last a lifetime. Group projects, clubs and internships teach teamwork, leadership and communication, and classmates often become future colleagues and partners.", "zh": "大學建立的人脈與社交能力能受用一生。小組專題、社團和實習培養團隊合作、領導力和溝通能力，同學也常成為未來的同事與合作夥伴。"}]}, "agree": [["degree = passport to a career", "**Not long ago,** a university degree **was regarded as** a passport to a secure and well-paid career."], ["AI explains, codes, writes · is it worth it?", "**Today, however,** AI tools **can** explain any subject, write computer code **and** draft reports in seconds, **prompting many people to ask whether** four years of expensive study **are** still worth it."], ["stance: agree · free knowledge + skills over certificates", "**I largely agree that** AI **is making** traditional degrees far less valuable, **because** expert knowledge **is now** freely available **and** employers **care more about** skills **than** certificates."], ["AI breaks university's monopoly on knowledge", "**First and foremost,** AI **has broken** the university's monopoly **on** knowledge."], ["AI tutor · any hour · no tuition fee", "Students **can** ask an AI tutor **to** explain calculus, law **or** programming **at** any hour **and** receive instant, personalised feedback, **which means that** expert teaching **is no longer** locked behind an expensive tuition fee."], ["my cousin · web design in 6 months · earns more", "**My cousin, for instance,** taught himself web design **with** an AI assistant **in** six months, **and** he now earns more **than** many of his friends **who** spent four years studying the same subject."], ["→ same knowledge at a fraction of the cost", "**As a result,** the knowledge **that** once justified a degree **can now be acquired at a fraction of** the cost."], ["employers hire for skills, not diplomas", "**In addition,** employers **are increasingly hiring for** proven skills **rather than** diplomas."], ["AI changes jobs fast · portfolio · Google & IBM", "**Since** AI **changes** jobs **faster than** any curriculum **can be updated,** a portfolio of real projects **says far more about** a candidate **than** a certificate earned years earlier; **indeed,** companies **such as** Google **and** IBM **have removed** degree requirements **for** many positions."], ["concession: doctors & lawyers need degrees", "**Admittedly,** professions **such as** medicine **and** law **will continue to** require formal qualifications."], ["rebuttal: small minority · AI reshaping them too", "**However,** these fields **represent** only a small share of the job market, **and even there,** AI **is reshaping** how professionals **are trained.**"], ["restate: degrees losing value", "**In conclusion, although** degrees **will not disappear overnight, I am convinced that** AI **is steadily eroding** their value **for** most careers."], ["what you can do > where you studied", "**In the future,** what you **can do** **will matter far more than** where you **studied**."]], "disagree": [["every new technology · 'end of university'", "**Every time** a new technology **appears,** **someone predicts** the end of the university."], ["TV, internet, online courses · universities still popular", "**Television, the internet and online courses were all expected to** replace higher education, **yet** universities **are** more popular **than** ever, **and** there **is little reason to believe that** AI **will be** any different."], ["stance: disagree · critical thinking + professions", "**I strongly disagree that** AI **will make** degrees useless, **since** university **develops** the critical thinking **that** AI cannot provide **and** remains essential **for** professional careers."], ["stronger AI → need people who judge it", "**To begin with,** the more powerful AI **becomes,** the more we **need** people **who can** judge its answers."], ["question evidence · compare theories · spot errors", "A degree **trains** students **to** question evidence, compare competing theories **and** build logical arguments **over** several years — **precisely the skills required to** recognise **when** an AI tool **is** confidently wrong."], ["classmate · fake quotation · professor taught source-checking", "**Last semester, for example,** a chatbot **gave** my classmate a fake quotation **for** her history report; **it was only because** her professor **had taught** her **to** check primary sources **that** she **noticed** the error."], ["→ critical thinking more valuable than ever", "**Far from** becoming useless, **then,** the critical thinking **developed** at university **is becoming** more valuable **than** ever **in a world** flooded **with** machine-generated information."], ["many careers legally require a degree", "**Furthermore,** many careers **still legally require** a degree."], ["surgery · bridges · court · AI researchers have degrees", "**No matter how** advanced AI **becomes,** society **will not allow** unqualified people **to** perform surgery, design bridges **or** defend clients in court; **moreover,** the researchers **who** create AI **almost all hold** advanced degrees **themselves.**"], ["concession: self-taught programmers hired", "**It is true that** some technology companies **now hire** self-taught programmers."], ["rebuttal: exceptions · graduates earn more", "**Nevertheless,** these cases **remain** exceptions **rather than** the rule, **and** statistics **in most countries show that** graduates **still earn** considerably more **over** their lifetime **and are** less likely **to** lose their jobs **during** economic downturns."], ["restate: AI changes teaching, not value", "**For these reasons, I believe** AI **will change** how universities teach **and** what students study **rather than** make their degrees worthless."], ["AI gives answers; education teaches questions", "**AI can supply answers, but only** education **teaches us** which questions **to ask.**"]], "vocab": [["monopoly", "壟斷"], ["acquire", "獲得"], ["at a fraction of the cost", "以極少的成本"], ["portfolio", "作品集"], ["erode", "侵蝕"], ["critical thinking", "批判思考"], ["qualification", "資格"], ["considerably", "相當地"]]};
