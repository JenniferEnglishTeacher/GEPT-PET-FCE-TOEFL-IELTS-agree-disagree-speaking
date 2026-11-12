/* pet-essay-data.js — PET (B1) / KET agree–disagree essays, about 200 words.
   Teacher writes AGREE (model sentences, **bold** = sentence pattern); students write DISAGREE using the same patterns.
   rows[i] = [disagree idea hint, AGREE model sentence(s)] in the order of PET_ESSAY_ELEMENTS.
   The model essay = rows joined into 4 paragraphs (PET_ESSAY_PARAS). */

window.PET_ESSAY_ELEMENTS = [
  ["Hook", "開頭背景"],
  ["Thesis", "主旨句：表明立場"],
  ["Body 1 — Topic sentence", "主題句：理由一"],
  ["Explain", "說明"],
  ["Example", "舉例"],
  ["Effect", "結果"],
  ["Body 2 — Topic sentence", "主題句：理由二"],
  ["Explain + example", "說明＋舉例"],
  ["Contrast", "讓步／反方意見"],
  ["Conclusion", "結論"]
];
window.PET_ESSAY_PARAS = [[0, 1], [2, 3, 4, 5], [6, 7], [8, 9]];

window.PET_ESSAYS = [
 {
  no: 1, theme: "School Life 校園生活", en: "Should Schools Start Later?", zh: "學校應該晚一點上課嗎？",
  prompt: "Some people think schools should start later in the morning. Do you agree or disagree?",
  rows: [
   ["early start = good habit for life", "**These days,** many students **have to** get up before six o'clock **to** get to school on time."],
   ["I disagree that schools should start later", "**In my opinion, I agree that** schools should start later in the morning **for two reasons.**"],
   ["students should learn to go to bed early", "**First of all, one main reason is that** teenagers need more sleep."],
   ["parents start work early and drive kids to school", "Many students go to bed late **because** they have a lot of homework and cram school classes. **If** school **starts** at 7:30, they **will** only **get** about six hours of sleep."],
   ["Take my cousin for example…", "**Take** my classmate Ben **for example.** He **is so tired that** he often falls asleep in math class."],
   ["students have more free time after school", "**As a result,** he **finds it hard to** focus, and his grades **have got worse**."],
   ["finishing late = less time for sports / cram school", "**What's more,** starting later **can help** students **stay** healthy."],
   ["school ends later → get home in the dark", "**With** an extra hour in the morning, students **have time to** eat a proper breakfast **instead of** skipping it. They **are also less likely to** catch colds **when** they are not tired all the time."],
   ["Although later school sounds nice, …", "**Although** some people **say that** students will finish school later, **I still think** more sleep **is worth it**."],
   ["In conclusion, I disagree…", "**In conclusion,** schools should start later **because** it **not only** helps students learn better **but also** keeps them healthy. **I hope** our school **will** try this idea soon."]
  ],
  vocab: [["focus", "專心"], ["tired", "疲累的"], ["proper breakfast", "像樣的早餐"], ["skip", "略過、不吃"], ["catch a cold", "感冒"], ["grades", "成績"], ["cram school", "補習班"], ["be worth it", "值得"]]
 },
 {
  no: 2, theme: "Technology 科技", en: "No Smartphones for Children Under 12", zh: "十二歲以下孩童不該有智慧型手機",
  prompt: "Some people think children under 12 should not have their own smartphones. Do you agree or disagree?",
  rows: [
   ["phones are a normal tool today", "**Nowadays, it is common to see** young children playing with smartphones in restaurants and on the MRT."],
   ["I disagree… children should have phones", "**Personally, I agree that** children under twelve **should not have** their own smartphones."],
   ["phones keep children safe / contact parents", "**To begin with, the biggest problem is that** smartphones **are** very addictive."],
   ["parents can call or find them by GPS", "Many games and video apps **are designed to** keep users watching. Young children **cannot easily control themselves, so** they **spend hours** on the screen **without noticing**."],
   ["For instance, my cousin uses a map app…", "**For instance,** my eight-year-old cousin **used to** play outside every day, **but now** he **only wants to** watch videos on his phone."],
   ["This means that parents worry less", "**This means that** he **gets less exercise** and **does not talk much** with his family. **Even at dinner,** he **keeps** his eyes **on** the screen."],
   ["learning apps help children study", "**Another reason is that** the internet **can be dangerous** for children."],
   ["English / math apps, online dictionaries", "**Without** an adult nearby, a child **might** see violent videos **or** chat with strangers **who** want to trick them. **It is hard for** parents **to** check everything on a child's phone."],
   ["Some may argue that phones are addictive. However…", "**Some people may argue that** children **need** phones **to** contact their parents. **However,** a simple phone **without** the internet **is enough for** that."],
   ["To sum up, children are better off with…", "**To sum up,** children under twelve **are better off without** smartphones, **because** they **need** time **to** play, read **and** stay safe."]
  ],
  vocab: [["addictive", "使人上癮的"], ["be designed to", "被設計來"], ["control oneself", "控制自己"], ["violent", "暴力的"], ["stranger", "陌生人"], ["trick", "欺騙"], ["contact", "聯絡"], ["be better off", "情況較好"]]
 },
 {
  no: 3, theme: "School Life 校園生活", en: "School Uniforms", zh: "學生應該穿制服嗎？",
  prompt: "Some people think all students should wear school uniforms. Do you agree or disagree?",
  rows: [
   ["many students hate their uniforms", "**In Taiwan, most** junior high school students **are required to** wear school uniforms."],
   ["I strongly believe students should NOT…", "**I strongly believe that** students **should** wear uniforms, **and here is why.**"],
   ["uniforms are uncomfortable", "**The first reason is that** uniforms **save** students **a lot of time and money**."],
   ["too hot in summer, too cold in winter", "**Instead of** worrying about **what to wear** every morning, students **can just** put on their uniform **and** leave. Parents **also don't have to** buy many fashionable clothes."],
   ["For example, my sister sweats in her uniform…", "**For example,** my sister **used to spend** twenty minutes **choosing** clothes **before** she went to her old school, **which** had no uniform."],
   ["Because of this, she can't focus in class", "**Because of this,** she **was often** late **and** felt stressed **before** class even started. Now, **with** a uniform, she **gets ready in** five minutes."],
   ["clothes show who we are (personal style)", "**Secondly,** uniforms **make** everyone **feel equal**."],
   ["students can't show their creativity", "**When** everyone **wears the same** clothes, nobody **can show off** expensive brands, **and** poorer students **are less likely to be** laughed at. Uniforms **also make** students **feel proud of** their school."],
   ["It is true that uniforms save time. Even so…", "**It is true that** uniforms **are not always** comfortable. **Even so,** schools **can choose** soft **and** light material."],
   ["All in all, students should choose their own clothes", "**All in all,** I **believe** school uniforms **are a good idea because** they **save time, save money and** bring students **closer together**. **I hope** every school **will keep** them."]
  ],
  vocab: [["be required to", "被要求"], ["fashionable", "時髦的"], ["stressed", "有壓力的"], ["equal", "平等的"], ["show off", "炫耀"], ["brand", "品牌"], ["be laughed at", "被嘲笑"], ["material", "布料、材料"]]
 },
 {
  no: 4, theme: "School Life 校園生活", en: "Less Homework", zh: "學校應該少出功課嗎？",
  prompt: "Some people think schools should give students less homework. Do you agree or disagree?",
  rows: [
   ["homework is part of learning", "**After** a long day at school, many students **still have** two or three hours of homework **to do**."],
   ["From my point of view, homework is necessary", "**From my point of view,** schools **should give** students **less** homework."],
   ["homework helps students remember lessons", "**My first reason is that** too much homework **causes** stress."],
   ["practice makes perfect", "Students **spend** about eight hours at school **every day**. **When** they get home, they **are already** tired, **but** they **have to** keep working **until** late at night. Many of them **sleep less than** seven hours."],
   ["A good example is my friend who reviews…", "**A good example is** my friend Amy. She **once** did homework **until** midnight **for a whole week**."],
   ["In the end, she got full marks", "**In the end,** she **got sick and had to** stay at home for two days. **Her teacher said that** no homework **is worth** your health."],
   ["homework teaches responsibility", "**Besides,** students **need** free time **to** develop other skills."],
   ["without homework, students just play games", "**If** they **had** less homework, they **could** play sports, learn music **or** help their parents at home. **These activities are just as important as** schoolwork **because** they **teach** us teamwork **and** responsibility."],
   ["Of course, too much homework is tiring. But…", "**Of course,** some homework **is useful for** reviewing lessons. **But** a little practice **is better than** a lot of copying."],
   ["In conclusion, homework should stay", "**In conclusion,** less homework **would make** students **happier and healthier**, **and** they **would** still **learn** well. **I hope** teachers **will think about** this."]
  ],
  vocab: [["cause", "造成"], ["stress", "壓力"], ["midnight", "午夜"], ["develop", "培養、發展"], ["skill", "技能"], ["teamwork", "團隊合作"], ["responsibility", "責任感"], ["review", "複習"]]
 },
 {
  no: 5, theme: "Social Media 社群媒體", en: "Social Media Does More Harm Than Good", zh: "社群媒體對青少年弊大於利",
  prompt: "Some people think social media does more harm than good for teenagers. Do you agree or disagree?",
  rows: [
   ["social media is part of modern life", "**Almost every** teenager **I know** uses Instagram, TikTok **or** YouTube every day, **and some check** it **more than** fifty times."],
   ["I disagree… it does more good than harm", "**I agree that** social media **does more harm than good** for teenagers."],
   ["helps us keep in touch with friends", "**First,** social media **makes** many young people **feel bad about** themselves."],
   ["chat with classmates, share news", "**On** these apps, people **only post** their best photos **and** happiest moments. **When** teenagers **compare** their own lives **with** these perfect pictures, they **may feel** ugly **or** boring."],
   ["For example, I talk with my friend in Canada…", "**For example,** a girl in my class **stopped** posting photos **because** she **got** fewer likes **than** her friends."],
   ["As a result, we are still close friends", "**As a result,** she **became** less confident **and didn't want to** join group activities. She **felt that nobody** liked her."],
   ["we can learn new things online", "**Second,** social media **wastes** a lot of time."],
   ["cooking, drawing, English videos", "**It is easy to** scroll for hours **without realizing** it. **Instead of** studying or sleeping, many students **stay up late** watching short videos, **which is bad for** both their grades **and** their health. Some students **even** check their phones **in the middle of** the night."],
   ["Admittedly, it wastes time. Nevertheless…", "**Admittedly,** social media **helps** us **keep in touch with** friends. **Nevertheless,** the problems **are much bigger than** the benefits."],
   ["For these reasons, social media is helpful", "**For these reasons,** I **think** teenagers **should** use social media **less and** spend more time **in the real world**."]
  ],
  vocab: [["post", "張貼"], ["compare A with B", "把A與B比較"], ["confident", "有自信的"], ["scroll", "滑（螢幕）"], ["without realizing", "不知不覺"], ["stay up late", "熬夜"], ["keep in touch with", "與…保持聯絡"], ["benefit", "好處"]]
 },
 {
  no: 6, theme: "Entertainment 娛樂", en: "Video Games Are a Waste of Time", zh: "打電動是浪費時間嗎？",
  prompt: "Some people think playing video games is a waste of time. Do you agree or disagree?",
  rows: [
   ["games are a great way to relax", "**Video games are** one of the most popular hobbies **among** teenagers **today**."],
   ["In my view, games are NOT a waste of time", "**In my view,** playing video games **is mostly a waste of time.**"],
   ["games help us relax after school", "**The main reason is that** games **take time away from** more important things."],
   ["after studying all day, we need a break", "**Once** students **start** playing, they **often can't stop**. One more game **easily turns into** three hours, **and** homework **is left** until the last minute."],
   ["Take my brother as an example. He feels…", "**Take** my brother **as an example.** He **played** online games **every night during** the summer vacation, **sometimes until** three in the morning."],
   ["As a result, he felt happy and less stressed", "**As a result,** he **didn't finish** his summer homework **and had to** stay up all night **before** school started. His parents **were** very angry."],
   ["games teach teamwork and planning", "**In addition,** video games **are not good for** our bodies."],
   ["team games: talk, plan, solve problems together", "**Sitting in front of** a screen **for hours can hurt** our eyes **and** our back. **Compared with** playing basketball **or** going hiking, gaming **gives** us **almost no** exercise. Some gamers **also eat** junk food **while** they play."],
   ["Some believe games hurt our eyes. While…", "**Some people believe that** games **can teach** teamwork. **While this may be true,** real sports **teach** teamwork **too, and** they **are** much healthier."],
   ["To conclude, games are fun and useful", "**To conclude, although** games **are** fun, they **waste** too much time **and are bad for** our health, **so** we **should** play them **less**."]
  ],
  vocab: [["hobby", "嗜好"], ["take time away from", "佔用…的時間"], ["the last minute", "最後一刻"], ["vacation", "假期"], ["hurt", "傷害"], ["compared with", "和…相比"], ["exercise", "運動"], ["healthy", "健康的"]]
 },
 {
  no: 7, theme: "School Life 校園生活", en: "Learning Online at Home", zh: "在家線上學習比到校上課好嗎？",
  prompt: "Some people think learning online at home is better than going to school. Do you agree or disagree?",
  rows: [
   ["school is more than lessons", "**During** the COVID-19 pandemic, many students **studied** online **at home for weeks**, **and** many of them **found** it **surprisingly** helpful."],
   ["I disagree… going to school is better", "**I agree that** learning online at home **can be better than** going to school."],
   ["at school we make real friends", "**First and foremost,** online learning **saves** a lot of time."],
   ["talk, play, eat lunch together", "Students **don't need to** take the bus **or wait in** traffic. **Instead,** they **can use** that time **to** sleep more **or** review their lessons."],
   ["For instance, my best friend and I met…", "**For instance,** my friend Leo **lives** far from school **and spends** two hours **on the bus** every day."],
   ["When we studied online, I felt lonely", "**When** he **studied** online, he **had** much more energy **and** his test scores **went up**. He **also said that** he **felt** less stressed."],
   ["it is easier to focus in a classroom", "**Another advantage is that** students **can learn at their own speed.**"],
   ["at home: phone, bed, games all around", "**If** they **don't understand** something, they **can** watch the video **again and again**. **In a real classroom, it is often** too embarrassing **to** ask the teacher **to** repeat it. **With** online videos, **nobody knows how many times** you **watch** them."],
   ["On the other hand, online saves time. However…", "**On the other hand,** students **may feel** lonely **at home**. **However,** they **can still** meet friends **after** class **or on weekends**."],
   ["In short, school is the best place to learn", "**In short,** online learning **is** more **convenient and flexible, so** I **believe** it **is** better **for** many students."]
  ],
  vocab: [["pandemic", "大流行病"], ["traffic", "交通"], ["energy", "精力"], ["advantage", "優點"], ["at one's own speed", "按自己的速度"], ["embarrassing", "令人尷尬的"], ["convenient", "方便的"], ["flexible", "有彈性的"]]
 },
 {
  no: 8, theme: "Daily Life 日常生活", en: "Teenagers and Part-Time Jobs", zh: "青少年應該打工嗎？",
  prompt: "Some people think teenagers should have a part-time job. Do you agree or disagree?",
  rows: [
   ["students' main job is studying", "**In many countries, it is normal for** high school students **to** work part-time **after school**."],
   ["I think teenagers should NOT have a job", "**I think** teenagers **should** have a part-time job, **as long as** it **doesn't affect** their studies."],
   ["a job takes time away from studying", "**To start with,** a part-time job **teaches** teenagers **the value of money**."],
   ["tired after work → no energy for homework", "**When** students **earn** money **by themselves,** they **understand how hard** their parents work. They **also learn to save** money **instead of** spending it **on** things they don't need."],
   ["For example, my cousin worked at a shop and…", "**For example,** my cousin **worked at** a bubble tea shop **last summer**."],
   ["After that, her grades went down", "**After that,** she **stopped** asking her parents **for** money **and saved enough to** buy her own laptop. She **felt** very **proud of** herself."],
   ["teenagers need time to rest and have fun", "**Moreover,** working **helps** teenagers **gain** useful skills."],
   ["clubs, sports, family time", "**At work,** they **have to** talk **to** customers, solve problems **and be on time**. **These skills will be useful when** they **look for** a real job **in the future**. **For example,** my cousin **learned to** stay calm **when** customers **were** angry."],
   ["Some say a job teaches money skills. However…", "**Some parents worry that** a job **will make** their children **too tired to** study. **However,** working **only** a few hours **on weekends is not** a problem."],
   ["Overall, teenagers should focus on school", "**Overall,** a part-time job **can help** teenagers **grow up and become** more **responsible**. **I would like to** find one **myself** next year."]
  ],
  vocab: [["part-time job", "兼職、打工"], ["as long as", "只要"], ["affect", "影響"], ["earn", "賺取"], ["the value of money", "金錢的價值"], ["customer", "顧客"], ["be on time", "準時"], ["responsible", "負責任的"]]
 },
 {
  no: 9, theme: "Tech Trends 科技趨勢", en: "Using AI for Homework", zh: "學生可以用AI寫功課嗎？",
  prompt: "Some people think students should be allowed to use AI (like ChatGPT) to help with their homework. Do you agree or disagree?",
  rows: [
   ["AI is popular, but is it good for learning?", "**AI tools like** ChatGPT **have become** very popular **in the last few years**."],
   ["In my opinion, students should NOT…", "**In my opinion,** students **should be allowed to** use AI **to help with** their homework."],
   ["students stop thinking for themselves", "**The first reason is that** AI **can be** a patient teacher."],
   ["AI gives the answer, so students don't think", "**When** students **get stuck on** a math problem late at night, **there is often** no one **to** ask. AI **can explain** the steps **again and again until** they **understand**."],
   ["For example, a classmate copied AI answers…", "**For example,** I **used** AI **to check** my English writing last month. It **showed me where** my grammar mistakes **were and why**."],
   ["Thanks to this, he failed the real test", "**Thanks to this,** my writing **got** much better, **and** I **got** a higher score **on** my test. My teacher **was surprised by** my progress."],
   ["AI is sometimes wrong", "**Besides,** students **will need** AI skills **in the future**."],
   ["AI can make up facts; students may believe them", "Many jobs today **already** use AI **to** work faster. **If** students **learn how to** use it wisely **now,** they **will be** more **prepared for** the future. **For example,** engineers **and** designers **use** AI **every day**."],
   ["Of course, AI can explain things. That is why…", "**Of course,** some students **might** just copy the answers. **That is why** teachers **should** teach them **how to** use AI honestly."],
   ["In conclusion, homework should be done alone", "**In conclusion,** AI **is a useful tool, and** students **should be allowed to** use it **in the right way**."]
  ],
  vocab: [["be allowed to", "被允許"], ["patient", "有耐心的"], ["get stuck on", "卡在…"], ["explain", "解釋"], ["grammar mistake", "文法錯誤"], ["wisely", "明智地"], ["be prepared for", "為…做好準備"], ["honestly", "誠實地"]]
 },
 {
  no: 10, theme: "School Life 校園生活", en: "Ban Phones in Classrooms", zh: "教室應該禁止手機嗎？",
  prompt: "Some people think mobile phones should be banned in classrooms. Do you agree or disagree?",
  rows: [
   ["phones are useful learning tools", "**In many schools,** students **keep** their phones **in their pockets during** lessons."],
   ["I disagree that phones should be banned", "**I agree that** mobile phones **should be banned in** classrooms."],
   ["phones help us look things up quickly", "**The most important reason is that** phones **distract** students **from** learning."],
   ["dictionary, photos of the board, research", "**Even when** a phone **is** on silent, students **keep** checking messages **and** games. **It is impossible to pay full attention to** the teacher **while** you **are** looking at a screen."],
   ["For example, last term we used phones to…", "**For example,** last term a classmate of mine **was** watching videos **under** his desk **during** English class, **and** the teacher **didn't notice**."],
   ["Because of that, the lesson was more fun", "**Because of that,** he **missed** the teacher's instructions **and did** the wrong homework. He **got** a low score **for** it."],
   ["parents need to contact children", "**What's more, without** phones, students **talk to each other more**."],
   ["emergencies, changes of plan", "**At** break time, **instead of** staring at their screens, students **can** chat, play games **together or** go outside. **This helps** them **make** real friends. **Last year, after** our school **banned** phones, my class **became** much **friendlier**."],
   ["Some think phones distract students. But…", "**Some people think that** students **need** phones **in case of** emergencies. **But** they **can always use** the school office phone."],
   ["For these reasons, teach students to use phones well", "**For these reasons,** I **believe** banning phones **in** classrooms **will help** students **learn more and get along better**. **I hope** more schools **will follow** this rule."]
  ],
  vocab: [["ban", "禁止"], ["distract", "使分心"], ["on silent", "靜音"], ["pay attention to", "注意"], ["instruction", "指示"], ["stare at", "盯著"], ["in case of", "萬一、以防"], ["get along", "相處融洽"]]
 },
 {
  no: 11, theme: "Entertainment 娛樂", en: "Short Videos Are Bad for Children", zh: "短影音對孩子不好嗎？",
  prompt: "Some people think watching short videos (like TikTok) is bad for children. Do you agree or disagree?",
  rows: [
   ["short videos can be fun and useful", "**Short videos on** TikTok **and** YouTube Shorts **are everywhere these days**."],
   ["Personally, I believe they are NOT bad", "**Personally, I believe that** watching too many short videos **is bad for** children."],
   ["children can learn new things quickly", "**To begin with,** short videos **make it harder for** children **to** concentrate."],
   ["science facts, English words, cooking tips", "Most short videos **are less than** one minute long, **so** children **get used to** changing quickly **from one thing to another**. **After a while,** a forty-five-minute lesson **feels too long**."],
   ["For instance, my brother learned to draw from…", "**For instance,** my little brother **can watch** short videos **for an hour, but** he **can't read** a book **for more than** five minutes."],
   ["As a result, he became good at drawing", "**As a result,** his reading **is getting worse, and** he **gets bored easily in** class. His teacher **often has to** call his name **twice**."],
   ["short videos help children relax", "**On top of that, not all** short videos **are** suitable **for** children."],
   ["a few videos after homework = a nice break", "Some videos **show** dangerous challenges **or use** bad language. Young children **may copy what they see without** knowing **it is** wrong. **For example,** a boy **I know hurt** his arm **after copying** a jump **from** a video."],
   ["It is true some videos are bad. Still…", "**It is true that** some videos **are** educational. **Still,** children **can learn much more from** books **and** longer programs."],
   ["In conclusion, parents should guide, not ban", "**In conclusion,** parents **should limit how much** short video content their children **watch**, **instead of** letting them watch **for hours**."]
  ],
  vocab: [["concentrate", "專心"], ["get used to", "習慣於"], ["bored", "感到無聊的"], ["suitable", "合適的"], ["challenge", "挑戰"], ["copy", "模仿"], ["educational", "有教育性的"], ["limit", "限制"]]
 },
 {
  no: 12, theme: "School Life 校園生活", en: "Sports for Every Student", zh: "每位學生都應該參加運動嗎？",
  prompt: "Some people think every student should be required to do a sport at school. Do you agree or disagree?",
  rows: [
   ["not everyone enjoys sports", "Many students **spend most of the day sitting at** a desk."],
   ["I disagree that sports should be required", "**I strongly agree that every** student **should be required to** do a sport **at school**."],
   ["students should choose their own hobbies", "**First,** doing sports **keeps** students **fit and healthy**."],
   ["music, art, coding are also good", "Regular exercise **makes** our hearts **and** muscles **stronger**. **It also helps** us **sleep better and feel less** stressed **before** exams. **Doctors say that** teenagers **need at least** one hour of exercise **a day**."],
   ["For example, my friend hates sports and…", "**For example, since** I **joined** the school badminton team, I **have rarely been** sick."],
   ["In fact, she feels nervous and unhappy", "**In fact,** I **also feel** more awake **in** class **after** practice. My grades **have even improved** a little."],
   ["students already have too little time", "**Second,** team sports **teach** students **important life lessons**."],
   ["practice after school = less time to study", "**When** students **play** basketball **or** volleyball, they **learn how to** work **as a team, follow** rules **and deal with** losing. **These lessons are hard to** learn **from** textbooks. **For example, after** losing a big game, our team **learned to try harder** next time."],
   ["Some say sports keep us healthy. However…", "**Some students may say that** they **are not good at** sports. **However,** there **are many kinds of** sports, **so everyone can find one they enjoy**."],
   ["To sum up, sports should be a choice", "**To sum up,** sports **are good for both** our bodies **and** our minds, **so** they **should be** part of every student's life."]
  ],
  vocab: [["be required to", "被要求"], ["fit", "健康的、強健的"], ["regular", "規律的"], ["muscle", "肌肉"], ["rarely", "很少"], ["awake", "清醒的"], ["deal with", "處理、面對"], ["textbook", "課本"]]
 },
 {
  no: 13, theme: "Daily Life 日常生活", en: "Pocket Money for Chores", zh: "做家事應該拿零用錢嗎？",
  prompt: "Some people think children should get pocket money only when they do chores. Do you agree or disagree?",
  rows: [
   ["family members should help each other", "**In many families,** children **are given** pocket money **every week**."],
   ["In my opinion, chores should NOT be paid", "**In my opinion,** children **should get** pocket money **only when** they **do** chores."],
   ["helping at home is everyone's duty", "**The first reason is that** this **teaches** children **that** money **comes from** work."],
   ["parents don't get paid for cooking", "**If** children **get** money **for nothing,** they **may think** money **is easy to get**. **But when** they **have to** wash the dishes **or take out** the trash, they **learn that every** dollar **is earned**."],
   ["For example, my friend only cleans when paid…", "**For example,** my parents **give** me fifty dollars **every time** I **clean** the bathroom."],
   ["Because of this, he won't help for free", "**Because of this,** I **think twice before** I **spend** my money **on** snacks. **Instead,** I **save** it **for** books I really want."],
   ["pocket money is for learning to plan", "**Furthermore,** chores **help** children **become** more **independent**."],
   ["kids need money for lunch, bus, books", "Children **who do** housework **learn how to** cook, clean **and take care of** themselves. **This will be** very **helpful when** they **live alone in the future**. My older brother, **who did** chores **as a child**, **now cooks for himself at** university."],
   ["Some say a reward encourages kids. I understand…", "**Some people say that** children **should** help **at home without being paid**. **I understand** this idea, **but** a small reward **can encourage** them **to** help more."],
   ["All things considered, chores ≠ a job", "**All things considered,** paying children **for** chores **is a good way to** teach them **about** money **and** responsibility."]
  ],
  vocab: [["pocket money", "零用錢"], ["chores", "家事"], ["take out the trash", "倒垃圾"], ["earn", "賺得"], ["think twice", "三思"], ["independent", "獨立的"], ["take care of", "照顧"], ["encourage", "鼓勵"]]
 },
 {
  no: 14, theme: "Tech Trends 科技趨勢", en: "E-books vs. Paper Books", zh: "電子書比紙本書好嗎？",
  prompt: "Some people think e-books are better than paper books for students. Do you agree or disagree?",
  rows: [
   ["many people still love paper books", "**More and more** people **are** reading books **on** tablets **and** phones **instead of** paper."],
   ["I disagree… paper books are better", "**I agree that** e-books **are better than** paper books **for** students."],
   ["screens hurt our eyes", "**First of all,** e-books **are much more convenient**."],
   ["reading on a screen for hours = tired eyes", "One tablet **can hold hundreds of** books, **so** students **don't need to** carry heavy bags. They **can also** download a new book **in seconds without** going to a bookstore. Many e-books **are also cheaper than** paper ones."],
   ["For example, on a long trip I read a paper book…", "**For example, on** my trip to Japan last year, I **took** ten e-books **with me on** my phone."],
   ["This way, my eyes didn't hurt / no battery problem", "**This way,** I **never got bored on** the plane **or on** the train. **It was much easier than** carrying a heavy bag **of** books."],
   ["paper books help us remember more", "**Another advantage is that** e-books **have** useful functions."],
   ["no notifications, can write notes on pages", "**If** you **don't know** a word, you **can just** tap it **to see** its meaning. **You can also make** the letters **bigger, which is great for** people **with** poor eyesight. Some e-books **can even read** the story **aloud**."],
   ["Some prefer e-books. Even so…", "**Some people prefer** the feeling of real paper. **Even so,** e-books **save** trees, **which is better for** the environment."],
   ["In conclusion, paper books are the better choice", "**In conclusion,** e-books **are light, cheap and easy to use, so** they **are the better choice** **for** today's students."]
  ],
  vocab: [["tablet", "平板電腦"], ["convenient", "方便的"], ["hold", "容納"], ["download", "下載"], ["function", "功能"], ["tap", "輕觸"], ["eyesight", "視力"], ["environment", "環境"]]
 },
 {
  no: 15, theme: "School Life 校園生活", en: "Are Cram Schools Necessary?", zh: "補習班是必要的嗎？",
  prompt: "Some people think cram schools are necessary for students. Do you agree or disagree?",
  rows: [
   ["students are too busy and tired", "**In Taiwan, it is very common for** students **to go to** cram school **after** class, **especially before** big exams."],
   ["I disagree that cram schools are necessary", "**I agree that** cram schools **are necessary for** many students."],
   ["cram schools are expensive", "**The main reason is that** cram schools **give** students **extra help**."],
   ["thousands of dollars a month for parents", "**In a** big class **at school,** teachers **don't have enough time to** help **every** student. **At** cram school, classes **are smaller, so** students **can** ask more questions."],
   ["For instance, my friend went to three cram schools…", "**For instance,** I **was weak at** math **in** seventh grade, **so** my parents **sent** me **to** a math cram school."],
   ["After a few months, she was too tired to learn", "**After** a few months, **I finally understood** the lessons, **and** my grades **went up from** sixty **to** eighty-five. **My parents were so happy that** they **took** me **out for** dinner."],
   ["students can study on their own", "**In addition,** cram schools **help** students **prepare for** important exams."],
   ["free online videos, school teachers, study groups", "Cram school teachers **know exactly what kinds of** questions **appear on** big exams **like** the CAP. They **also give** students **a lot of** practice tests, **which build** their confidence. **With** this practice, students **feel** less nervous **on** the exam day."],
   ["Admittedly, cram schools give extra help. But…", "**Admittedly,** cram schools **can be** expensive **and** tiring. **But for** students **who need** help, **the benefits are worth the cost**."],
   ["Overall, students don't need cram schools", "**Overall,** cram schools **play an important role in** helping students **succeed and reach** their goals."]
  ],
  vocab: [["cram school", "補習班"], ["extra", "額外的"], ["be weak at", "不擅長"], ["prepare for", "準備"], ["practice test", "模擬考"], ["confidence", "自信"], ["cost", "費用"], ["succeed", "成功"]]
 },
 {"no": 16, "theme": "Entertainment 娛樂", "en": "Movie Theater or Streaming at Home?", "zh": "電影院還是在家串流看電影？", "prompt": "Some people prefer to see a new film in a movie theater, while others prefer to watch it on streaming platforms at home. Which do you prefer?", "labels": {"agree": "THEATER 電影院", "disagree": "STREAMING 在家串流"}, "rows": [["streaming at home is popular now", "**These days,** many people **watch** films **on** Netflix **or** other streaming platforms **at** home."], ["I prefer streaming at home", "**However, I prefer to** see films **in** a movie theater **for two reasons.**"], ["streaming is cheaper", "**First of all, one main reason is that** the big screen **makes** films **more exciting.**"], ["one month of streaming = one ticket", "The screen **is** huge **and** the sound **is** loud, **so** I **feel like** I **am** inside the story. **Also,** my phone **is** off, **so** I **can** focus **on** the whole film."], ["Take my family for example…", "**Take** the film Dune **for example.** **When** I watched it **in** IMAX, the desert storm **felt so real that** I **forgot** where I was."], ["we save money every month", "**As a result,** I **still remember** every scene **of** that film."], ["watching at home is more comfortable", "**What's more,** going **to** the cinema **is** a fun activity **with** friends."], ["no noisy people · my own sofa · pause anytime", "**We** laugh **and** scream **together with** the audience, **and after** the film **we** talk **about** it **over** dinner. **It is much more fun than** watching **alone on** a sofa."], ["Although the big screen is exciting, …", "**Although** some people **say that** tickets **are** expensive, **I still think** a good film **is worth it.**"], ["In conclusion, I prefer streaming…", "**In conclusion,** I **prefer** the movie theater **because** it **not only** makes films more exciting **but also** gives me great memories **with** my friends."]], "vocab": [["screen", "螢幕"], ["surround sound", "環繞音效"], ["focus on", "專心於"], ["audience", "觀眾"], ["ticket", "電影票"], ["subscription", "訂閱"], ["streaming platform", "串流平台"], ["be worth it", "值得"]]},
 {"no": 17, "theme": "Technology 科技", "en": "Will AI Make College Degrees Useless?", "zh": "人工智慧會讓大學學歷沒用嗎？", "prompt": "Some people think artificial intelligence (AI) will make college and university degrees useless. Do you agree or disagree?", "rows": [["AI can be wrong; university teaches thinking", "**These days,** AI tools **like** ChatGPT **can** answer almost any question **in** seconds."], ["I disagree that AI makes degrees useless", "**In my opinion, I agree that** AI **is making** college degrees less useful **for two reasons.**"], ["university teaches us how to think", "**First of all, one main reason is that** people **can** learn almost anything **from** AI **for free.**"], ["AI answers are sometimes wrong", "University **is** very expensive **and** takes four years. **If** you **use** AI, you **can** learn **at** home, **at** any time **you like.**"], ["Take my sister for example…", "**Take** my cousin **for example.** He **learned** how to make websites **with** AI **in** only six months."], ["she learned to check facts at university", "**As a result,** he **found** a good job **without** a university degree."], ["doctors and engineers need degrees", "**What's more,** many companies **care more about** skills **than** degrees."], ["no one wants a doctor who learned from AI", "They **want to** see what you **can do**, **so** a good portfolio **is** sometimes **more important than** a certificate. **Some** big companies **have** even **stopped** asking **for** degrees."], ["Although AI is useful, …", "**Although** doctors **and** lawyers **still need** degrees, **I still think** most people **can** learn **with** AI **instead.**"], ["In conclusion, I disagree…", "**In conclusion,** AI **is making** degrees less useful **because** it **not only** teaches us **for free but also** helps us **get** jobs **with** real skills."]], "vocab": [["degree", "學位"], ["university", "大學"], ["expensive", "昂貴的"], ["for free", "免費"], ["skill", "技能"], ["portfolio", "作品集"], ["certificate", "證書"], ["company", "公司"]]},
 {"no": 18, "theme": "Technology 科技", "en": "Will AI Replace Human Workers?", "zh": "人工智慧會取代人類勞工嗎？", "prompt": "Some people think artificial intelligence (AI) will replace human workers. Do you agree or disagree?", "rows": [["new technology always creates new jobs", "**These days,** AI **can** answer questions, write reports **and** even drive cars."], ["I disagree that AI will replace workers", "**In my opinion, I agree that** AI **will replace** many human workers **for two reasons.**"], ["AI will create new jobs", "**First of all, one main reason is that** AI **is** cheaper **and** faster **than** people."], ["computers created jobs like app designer", "It **can** work all day **and** all night, **and** it **never** gets tired **or** asks **for** a holiday. **So** companies **can** save a lot of money."], ["Take my aunt for example…", "**Take** the supermarket **near** my home **for example.** **Now** it **has** self-checkout machines **instead of** cashiers."], ["she learned new skills and got a better job", "**As a result,** many cashiers **have lost** their jobs."], ["people need kind nurses and teachers", "**What's more,** AI **can** do **more and more** difficult work."], ["AI is a tool that helps workers", "It **can** write emails, translate **and** even write computer code. **This means that** office workers **are not** safe **either.**"], ["Although some jobs will go, …", "**Although** some people **say that** AI **will create** new jobs, **I still think** it **will take away** more jobs **than** it **creates.**"], ["In conclusion, I disagree…", "**In conclusion,** AI **will replace** many workers **because** it **is not only** cheaper **but also** able to do many kinds of work. **We should** start learning new skills **now.**"]], "vocab": [["replace", "取代"], ["worker", "勞工"], ["company", "公司"], ["save money", "省錢"], ["cashier", "收銀員"], ["self-checkout", "自助結帳"], ["lose a job", "失業"], ["skill", "技能"]]}
];

window.PET_ESSAY_TEXT = e => window.PET_ESSAY_PARAS
  .map(p => p.map(i => e.rows[i][1]).join(" ").replace(/\*\*/g, "")).join("\n\n");
