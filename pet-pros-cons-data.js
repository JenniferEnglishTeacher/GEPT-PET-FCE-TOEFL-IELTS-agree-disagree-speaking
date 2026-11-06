/* pet-pros-cons-data.js — PET (B1) / KET advantages-and-disadvantages essays, about 200 words.
   Topics 1–15 match the Agree/Disagree set; 16–25 are new. Teacher's model sentences in column 3 (**bold** = sentence pattern);
   students write their OWN pros & cons essay in column 2 — the ✎ ideas in column 1 give different pros/cons to use.
   Loaded by pet-pros-cons.html together with the shared engine pet-essay.js (same globals as pet-essay-data.js). */

window.PET_ESSAY_CFG = {
  store: "pet-pc-",
  suffix: " Write an essay about both sides and give your opinion.",
  kind: "advantages-and-disadvantages essay",
  position: "",
  aiCheck: "Do I give at least two advantages and two disadvantages with examples, and a clear conclusion?"
};

window.PET_ESSAY_ELEMENTS = [
  ["Hook", "開頭背景"],
  ["Thesis", "主旨句：有利有弊"],
  ["Pros — Topic sentence", "優點主題句"],
  ["Pro 1 + explain", "優點一＋說明"],
  ["Example", "舉例"],
  ["Pro 2", "優點二"],
  ["Cons — Topic sentence", "缺點主題句"],
  ["Con 1 + explain", "缺點一＋說明"],
  ["Con 2", "缺點二"],
  ["Conclusion", "結論＋個人看法"]
];
window.PET_ESSAY_PARAS = [[0, 1], [2, 3, 4, 5], [6, 7, 8], [9]];

window.PET_ESSAYS = [
 {
  no: 1, theme: "School Life 校園生活", en: "Starting School Later", zh: "晚一點上學的優缺點",
  prompt: "What are the advantages and disadvantages of starting school later in the morning?",
  rows: [
   ["a news report / survey says…", "**These days,** some schools **are thinking about** starting classes **at** nine o'clock **instead of** seven thirty."],
   ["…has both good and bad sides", "**Like most changes, this idea has both advantages and disadvantages.**"],
   ["There are some advantages.", "**On the one hand, there are several benefits.**"],
   ["less traffic in the morning", "**The biggest advantage is that** students **can get** more sleep. Teenagers **need about** nine hours of sleep, **but** many of them **only get** six **because of** homework **and** cram school."],
   ["my sister / a friend…", "**For example,** my classmate Ben **is so tired that** he **often** falls asleep **in** the first class. **With** an extra hour, he **would be able to** focus **much better**."],
   ["teachers are more awake too", "**Another benefit is that** students **would have time to** eat breakfast **at home, which keeps** them healthy **and** full of energy."],
   ["However, there are some disadvantages.", "**On the other hand, there are also some drawbacks.**"],
   ["get home in the dark — less safe", "**One problem is that** school **would finish later**. **As a result,** students **would have less time for** sports, clubs **and** homework **in the evening**. Some students **might even have to** walk home **in the dark**."],
   ["cram schools must change their times", "**In addition,** many parents **start** work early, **so it would be difficult for** them **to** drive their children **to** school."],
   ["I think the drawbacks are bigger…", "**In conclusion,** starting school later **has both pros and cons**. **Personally, I think** the benefits **are greater, because** good sleep **is the key to** learning."]
  ],
  vocab: [["benefit", "好處"], ["drawback", "缺點"], ["focus", "專心"], ["energy", "精力"], ["be able to", "能夠"], ["be the key to", "是…的關鍵"]]
 },
 {
  no: 2, theme: "Technology 科技", en: "Children Having Smartphones", zh: "孩童擁有智慧型手機的優缺點",
  prompt: "What are the advantages and disadvantages of young children having smartphones?",
  rows: [
   ["phones are everywhere today", "**Today, more and more** children **get** their first smartphone **before** they **are** ten."],
   ["…has both good and bad sides", "**Giving** young children smartphones **has both good and bad sides.**"],
   ["Let's start with the advantages.", "**Let's start with the advantages.**"],
   ["video-call family who live far away", "**First,** a smartphone **helps** children **stay safe**. **If** they **get lost or miss** the bus, they **can** call their parents **right away**."],
   ["my brother video-calls grandma…", "**For instance,** my cousin **once** got off **at** the wrong MRT station, **but** she **used** a map app **to** find her way home. **Without** a phone, she **would have been** very scared."],
   ["take photos for school projects", "**Also,** there **are** many learning apps, **so** children **can** practise English **and** math **in a fun way**. **For example,** my sister **uses** an app **to** learn ten new English words **every day**."],
   ["However, … some disadvantages.", "**However, smartphones also have some disadvantages.**"],
   ["hurt eyes / poor sleep", "**The main problem is that** they **are** very addictive. Many children **spend hours** watching videos **instead of** playing outside **or** reading. Some of them **even** use their phones **in bed until** midnight."],
   ["expensive, easy to lose or break", "**What's worse,** children **might** see violent videos **or** chat with strangers online, **which can be** dangerous. **It is not easy for** parents **to** check everything."],
   ["wait until 12 / use a simple phone", "**To sum up,** smartphones **can be** useful, **but** parents **should set** clear rules **about how and when** their children **use** them. **For example,** phones **could stay in** the living room **at night**."]
  ],
  vocab: [["get lost", "迷路"], ["right away", "立刻"], ["addictive", "使人上癮的"], ["violent", "暴力的"], ["stranger", "陌生人"], ["set rules", "訂規則"]]
 },
 {
  no: 3, theme: "School Life 校園生活", en: "School Uniforms", zh: "學校制服的優缺點",
  prompt: "What are the advantages and disadvantages of wearing school uniforms?",
  rows: [
   ["most schools / some schools…", "**In Taiwan, almost all** junior high schools **ask** students **to** wear uniforms."],
   ["…bring both advantages and disadvantages", "**School uniforms bring both advantages and disadvantages.**"],
   ["let's look at the good points", "**To begin with, let's look at the good points.**"],
   ["feel proud of the school / safer on trips", "**One advantage is that** uniforms **save** time **and** money. Students **don't have to** think **about what to wear, and** parents **don't need to** buy **lots of** clothes."],
   ["on a school trip, teachers find us easily", "**For example,** my sister **used to spend** twenty minutes **choosing** clothes **every morning, but now** she **gets ready in** five."],
   ["fewer arguments with parents", "**Another advantage is that** uniforms **make** everyone **look equal, so** nobody **can show off** expensive brands. **This way,** students **from** poor families **don't feel** left out."],
   ["…have some downsides", "**On the other hand, uniforms have some downsides.**"],
   ["uniforms can be expensive too", "**For one thing,** they **are not always** comfortable. **In** summer, some uniforms **are too hot, and in** winter, they **are not warm enough**. Many students **feel** uncomfortable **during** P.E. class **because of** this."],
   ["can't dress for the weather", "**For another,** students **cannot show** their personal style, **which makes** some of them **feel less** creative. **For example,** my friend **loves** fashion, **but** she **can only** wear her own clothes **on** weekends."],
   ["casual clothes once a week", "**All in all,** uniforms **have both pros and cons**. **In my opinion,** they **are** a good idea **if** schools **choose** comfortable ones. **Maybe** students **could** wear their own clothes **once a week**."]
  ],
  vocab: [["uniform", "制服"], ["show off", "炫耀"], ["brand", "品牌"], ["downside", "缺點"], ["comfortable", "舒適的"], ["personal style", "個人風格"]]
 },
 {
  no: 4, theme: "School Life 校園生活", en: "Homework", zh: "回家作業的優缺點",
  prompt: "What are the advantages and disadvantages of homework for students?",
  rows: [
   ["students get homework every day", "**Most** students **in** Taiwan **have** homework **every day**."],
   ["…has both advantages and disadvantages", "**Homework has both advantages and disadvantages.**"],
   ["First, let's consider the benefits.", "**First, let's consider the benefits.**"],
   ["parents can see what we learn", "**The main advantage is that** homework **helps** students **remember what** they **learned in** class. **Without** practice, **it is easy to forget** new words **and** math rules. **As the saying goes,** practice **makes** perfect."],
   ["my friend practises math every night…", "**For example, when** I **do** my English worksheet **every night,** I **can remember** the new words **much better**. Last week, I **got** full marks **on** the vocabulary quiz."],
   ["prepares us for tests", "**Besides,** homework **teaches** students **to** manage their time **and** work **on their own**. **These skills will be** very useful **when** they **go to** university."],
   ["However, … cause problems", "**However, too much homework can cause problems.**"],
   ["some just copy answers from friends", "**One disadvantage is that** it **causes** stress. Some students **stay up until** midnight **to finish** everything, **and** they **feel** tired **the next day**. **As a result,** they **cannot** concentrate **in** class."],
   ["no time to read for fun", "**Another drawback is that** students **have less time for** hobbies, sports **and** family. **For example,** my cousin **had to** quit the basketball team **because** he **had too much** homework. **Moreover,** some students **just copy** answers **from** friends, **so** they **don't** learn anything."],
   ["less but better homework", "**In conclusion,** homework **is** useful, **but** teachers **should give the right amount so that** students **can** still rest."]
  ],
  vocab: [["remember", "記得"], ["manage time", "管理時間"], ["on one's own", "獨立地"], ["stress", "壓力"], ["midnight", "午夜"], ["the right amount", "適當的量"]]
 },
 {
  no: 5, theme: "Social Media 社群媒體", en: "Social Media for Teenagers", zh: "社群媒體對青少年的優缺點",
  prompt: "What are the advantages and disadvantages of social media for teenagers?",
  rows: [
   ["Instagram, TikTok, YouTube…", "**Almost every** teenager **uses** social media **like** Instagram **or** TikTok **today**."],
   ["…positive and negative effects", "**Social media has both positive and negative effects on** young people."],
   ["On the positive side, …", "**On the positive side, social media has some benefits.**"],
   ["find people with the same hobby", "**First,** it **helps** teenagers **keep in touch with** friends **and** family. They **can** share photos **and** chat **anytime, even when** they **live far apart**."],
   ["my cousin sells drawings online…", "**For example,** I **talk to** my best friend **in** Canada **on** Instagram **every week, so** we **are still** close."],
   ["follow news and events", "**Second,** teenagers **can learn** new things, **such as** cooking, drawing **or** English, **from** short videos. **I have learned to** cook simple dishes **this way**."],
   ["On the negative side, …", "**On the negative side, there are some serious problems.**"],
   ["mean comments / cyberbullying", "**To begin with,** social media **can make** teenagers **feel bad about** themselves. **When** they **compare** their lives **with** other people's perfect photos, they **may feel** unhappy. Some teenagers **even** receive mean comments **from** strangers."],
   ["privacy: strangers can see our photos", "**Also, it is easy to** waste hours **scrolling, which is bad for** sleep **and** schoolwork. **For example,** my cousin **often** watches videos **until** two in the morning, **and** he **is always** sleepy **at** school."],
   ["set a daily time limit", "**In short,** social media **is** a useful tool, **but** teenagers **need to** use it **carefully and in moderation**. **Setting** a daily time limit **is a good idea**."]
  ],
  vocab: [["keep in touch with", "保持聯絡"], ["compare A with B", "比較"], ["scroll", "滑（螢幕）"], ["privacy", "隱私"], ["in moderation", "適度地"], ["effect", "影響"]]
 },
 {
  no: 6, theme: "Entertainment 娛樂", en: "Video Games", zh: "打電動的優缺點",
  prompt: "What are the advantages and disadvantages of playing video games?",
  rows: [
   ["one of the most popular hobbies", "**Playing** video games **is one of the most popular** hobbies **among** teenagers."],
   ["There are both advantages and disadvantages to…", "**There are both advantages and disadvantages to** playing video games."],
   ["Let's look at the advantages first.", "**Let's look at the advantages first.**"],
   ["make new friends", "**One advantage is that** games **help** us **relax**. **After** a long day **at** school, **playing** a game **for** half an hour **can make** us **feel** better."],
   ["my friend learned English words from a game…", "**For instance,** my brother **plays** a soccer game **with** his friends online **after finishing** his homework, **and** it **helps** him **forget** his stress. **It is** his favorite part of the day."],
   ["quick thinking and fast reactions", "**Moreover,** some games **teach** teamwork **and** problem-solving skills. **In team games,** players **have to** talk **to** each other **and** plan **together**."],
   ["However, … some disadvantages", "**However, games also have some disadvantages.**"],
   ["spending money on game items", "**The main disadvantage is that** they **can be** addictive. Many players **say** \"one more game\" **and then play for** hours, **so** they **don't finish** their homework. Some players **also spend a lot of** money **on** game items."],
   ["violent games", "**Besides,** sitting **in front of** a screen **for a long time is bad for** our eyes **and** our backs. Some games **are also** violent, **which is not suitable for** children."],
   ["play only on weekends", "**To conclude,** video games **can be** fun **and** useful, **as long as** we **don't play** them **too much**. **One hour a day is enough**."]
  ],
  vocab: [["relax", "放鬆"], ["stress", "壓力"], ["teamwork", "團隊合作"], ["problem-solving", "解決問題的"], ["addictive", "使人上癮的"], ["as long as", "只要"]]
 },
 {
  no: 7, theme: "School Life 校園生活", en: "Online Learning", zh: "線上學習的優缺點",
  prompt: "What are the advantages and disadvantages of learning online at home?",
  rows: [
   ["since the pandemic…", "**Since** the COVID-19 pandemic, online learning **has become** very common."],
   ["…has both pros and cons", "**Learning online at home has both pros and cons.**"],
   ["On the one hand, …", "**On the one hand, online learning has many advantages.**"],
   ["study anywhere, even when sick", "**First,** it **is** very convenient. Students **don't need to** travel **to** school, **so** they **can** sleep longer **and save** time. **It is also** helpful **on** typhoon days **when** schools **are closed**."],
   ["on typhoon days…", "**For example,** my friend Leo **lives** far from school. **When** he **studied** online, he **saved** two hours **a day**."],
   ["use online tools and videos", "**Second,** students **can** watch recorded lessons **again and again until** they **understand** them. **This is especially helpful for** students **who learn** slowly."],
   ["On the other hand, …", "**On the other hand, online learning has some drawbacks.**"],
   ["internet problems", "**One disadvantage is that** students **may feel** lonely. They **can't** chat **with** classmates **or** play **together at** break time. Many students **said** they **missed** their friends **during** the pandemic."],
   ["teachers can't see who is listening", "**Another problem is that it is hard to** focus **at home, because** phones, games **and** beds **are all around**. **In addition, if** the internet **is** slow, students **may miss** important parts of the lesson."],
   ["mix online and classroom learning", "**In conclusion,** online learning **is** useful, **but I believe** going **to** school **is** still **important for** making friends. **Maybe** schools **could mix** both ways."]
  ],
  vocab: [["pandemic", "大流行病"], ["convenient", "方便的"], ["recorded lesson", "錄影課程"], ["lonely", "孤單的"], ["focus", "專心"], ["drawback", "缺點"]]
 },
 {
  no: 8, theme: "Daily Life 日常生活", en: "Part-Time Jobs for Teenagers", zh: "青少年打工的優缺點",
  prompt: "What are the advantages and disadvantages of teenagers having part-time jobs?",
  rows: [
   ["in many countries / in Taiwan…", "**In many countries,** teenagers **work** part-time **after school or on** weekends."],
   ["…brings both benefits and problems", "**Having a part-time job brings both benefits and problems.**"],
   ["First, let's look at the benefits.", "**First, let's look at the benefits.**"],
   ["become more independent", "**The first benefit is that** teenagers **learn** the value of money. **When** they **earn** it **themselves,** they **think twice before** spending it. They **also become** more independent."],
   ["my friend worked at a restaurant…", "**For example,** my cousin **worked at** a bubble tea shop **last summer, and** she **saved enough to** buy her own laptop. She **was so proud of** herself."],
   ["meet new people", "**Also,** teenagers **can learn** useful skills, **such as** talking **to** customers **and** being **on time**. They **can also** meet people **from** different backgrounds."],
   ["However, … some disadvantages", "**However, there are also some disadvantages.**"],
   ["less sleep, lower grades", "**The biggest disadvantage is that** a job **takes** time **away from** studying. **After** working **for** four hours, **it is hard to** do homework well. **As a result,** their grades **may** go down."],
   ["low pay / bosses may not be fair", "**In addition,** some jobs **are** tiring **or even** dangerous **for** young people. **For example,** some fast-food workers **have to** work **near** hot oil. **Besides,** the pay **is often** very low."],
   ["work only in summer vacation", "**To sum up,** a part-time job **can be** a good experience, **but** students **should not** work **too many** hours. **In my opinion,** working **during** summer vacation **is the best choice**."]
  ],
  vocab: [["part-time", "兼職的"], ["the value of money", "金錢的價值"], ["earn", "賺取"], ["think twice", "三思"], ["customer", "顧客"], ["tiring", "累人的"]]
 },
 {
  no: 9, theme: "Tech Trends 科技趨勢", en: "Using AI for Schoolwork", zh: "用AI做功課的優缺點",
  prompt: "What are the advantages and disadvantages of students using AI for schoolwork?",
  rows: [
   ["ChatGPT, Gemini, Claude…", "**AI tools like** ChatGPT **have become** popular **with** students **in the last few years**."],
   ["…has both advantages and disadvantages", "**Using AI for schoolwork has both advantages and disadvantages.**"],
   ["On the positive side, …", "**On the positive side, AI can be very helpful.**"],
   ["saves time searching", "**First,** AI **can explain** difficult ideas **in simple words**. **When** students **get stuck,** they **can ask** questions **at any time**."],
   ["my friend used AI to plan a science project…", "**For example,** I **used** AI **to check** my English writing **last month, and** it **showed me where** my grammar mistakes **were**. **Thanks to** AI, I **made fewer** mistakes **in** my next essay."],
   ["practise English speaking with AI", "**Second, learning to use** AI **now will help** students **in** their future jobs. Many companies **already** use AI **every day**."],
   ["On the negative side, …", "**On the negative side, AI also causes some problems.**"],
   ["teachers can't tell who wrote it", "**The most serious problem is that** some students **just copy** the answers. **If** they **don't think for themselves,** they **won't** really **learn** anything. Teachers **also find it hard to** tell **who** really **wrote** the homework."],
   ["students become lazy", "**What's more,** AI **is not always** right. **Sometimes** it **gives** wrong information, **and** students **may believe** it. **For example,** my friend **once** wrote a report **with** AI, **and** half of the facts **were** wrong."],
   ["use AI as a teacher, not a copy machine", "**In conclusion,** AI **is** a powerful tool, **but** students **should** use it **honestly and check what** it **says**."]
  ],
  vocab: [["explain", "解釋"], ["get stuck", "卡住"], ["grammar mistake", "文法錯誤"], ["for oneself", "自己（思考）"], ["information", "資訊"], ["honestly", "誠實地"]]
 },
 {
  no: 10, theme: "School Life 校園生活", en: "Phones in the Classroom", zh: "教室裡使用手機的優缺點",
  prompt: "What are the advantages and disadvantages of allowing phones in classrooms?",
  rows: [
   ["some schools allow, others ban…", "Some schools **let** students **keep** their phones **in** class, **while others** ban them."],
   ["…has both pros and cons", "**Allowing phones in classrooms has both pros and cons.**"],
   ["On the one hand, …", "**On the one hand, phones can be useful.**"],
   ["online quizzes / learning apps", "**One advantage is that** students **can** look things up quickly. **If** they **don't know** a word, they **can** check an online dictionary **in seconds**. **This saves a lot of** time."],
   ["our English class used Kahoot…", "**For example, in** our science class, we **used** our phones **to** take photos **of** plants **for** a project. **It was much more fun than** drawing them **by hand**."],
   ["check the school timetable", "**In addition,** parents **can** contact their children **in case of** an emergency. **This makes** parents **feel** safer."],
   ["On the other hand, …", "**On the other hand, phones can cause problems.**"],
   ["cheating on tests", "**The main disadvantage is that** phones **distract** students. Many students **check** messages **or** play games **instead of** listening **to** the teacher. Some students **even** use their phones **to** cheat **on** tests."],
   ["phones get stolen or broken", "**Also, at** break time, students **stare at** their screens **instead of** talking **to** each other. **As a result,** they **don't** make many real friends."],
   ["let teachers decide", "**All in all,** phones **can help** learning, **but I think** schools **should** collect them **unless** the teacher **needs** them **for** an activity. Teachers **should be able to** decide **what is best for** their class."]
  ],
  vocab: [["look up", "查詢"], ["in case of", "萬一"], ["emergency", "緊急情況"], ["distract", "使分心"], ["stare at", "盯著"], ["unless", "除非"]]
 },
 {
  no: 11, theme: "Entertainment 娛樂", en: "Short Videos", zh: "短影音的優缺點",
  prompt: "What are the advantages and disadvantages of children watching short videos (like TikTok)?",
  rows: [
   ["TikTok, Reels, YouTube Shorts…", "**Short videos on** TikTok **and** YouTube Shorts **are extremely popular with** children."],
   ["…has both good and bad points", "**Watching short videos has both good and bad points.**"],
   ["Let's start with the good points.", "**Let's start with the good points.**"],
   ["follow the news quickly", "**First,** short videos **are** a quick **and** fun **way to** learn. **In** just one minute, children **can learn** a science fact **or** a new English phrase. **It is** a great way **to** learn **without** feeling bored."],
   ["my sister learned a dance…", "**For example,** my little brother **learned how to** fold a paper plane **from** a thirty-second video."],
   ["share funny videos with family", "**Second, watching** a few funny videos **can help** children **relax after** homework. Families **can also** share funny videos **and** laugh **together**."],
   ["However, … some bad points", "**However, there are also some bad points.**"],
   ["children watch until late at night", "**The biggest problem is that** short videos **make it hard for** children **to** concentrate. **After** watching many short clips, a long lesson **feels** boring. **For example,** my cousin **can't** sit still **for more than** ten minutes **in** class."],
   ["too many ads", "**Furthermore, not all** videos **are** suitable **for** children. Some **show** dangerous challenges **or use** bad language. **In addition, there are too many** ads, **and** children **may want to** buy everything **they see**."],
   ["choose educational channels", "**To conclude,** short videos **are not all bad, but** parents **should** limit **how much** their children **watch**. They **should also** choose educational channels."]
  ],
  vocab: [["extremely", "非常地"], ["phrase", "片語"], ["concentrate", "專心"], ["clip", "影片片段"], ["suitable", "合適的"], ["limit", "限制"]]
 },
 {
  no: 12, theme: "School Life 校園生活", en: "Compulsory School Sports", zh: "規定學生做運動的優缺點",
  prompt: "What are the advantages and disadvantages of making every student do a sport at school?",
  rows: [
   ["in some schools, every student must…", "**In some schools,** every student **must** join a sports team."],
   ["…has both advantages and disadvantages", "**Making sports compulsory has both advantages and disadvantages.**"],
   ["First, there are clear benefits.", "**First, there are clear benefits.**"],
   ["less stress before exams", "**The main benefit is that** sports **keep** students **fit and healthy**. Regular exercise **makes** our bodies **stronger and helps** us **sleep better**. **It also helps** students **feel less** stressed **before** exams."],
   ["my friend made new friends on the team…", "**For example, since** I **joined** the badminton team, I **have rarely been** sick. I **also feel** more awake **in** class **after** practice."],
   ["learn to follow rules", "**What's more,** team sports **teach** students **how to** work **together and deal with** losing. **These are** important lessons **for** life."],
   ["However, … some drawbacks", "**However, compulsory sports also have some drawbacks.**"],
   ["sports injuries", "**One drawback is that not everyone enjoys** sports. Students **who are not good at** them **may feel** embarrassed **or** stressed. **For example,** my friend **hates** running **because** she **is always** the last one, **and** the others **laugh at** her."],
   ["too tired to study", "**Another drawback is that** practice **takes** time **away from** other interests, **such as** music **or** art. Some students **may also** get hurt **during** practice **or feel too tired to** study."],
   ["offer many kinds of sports", "**In conclusion,** sports **are** good **for** students, **but** schools **should give** them **a choice of** activities. **For example,** students **could choose from** dancing, swimming **or** hiking."]
  ],
  vocab: [["compulsory", "強制的"], ["fit", "健康的"], ["regular", "規律的"], ["rarely", "很少"], ["deal with", "面對"], ["embarrassed", "尷尬的"]]
 },
 {
  no: 13, theme: "Daily Life 日常生活", en: "Pocket Money for Chores", zh: "做家事拿零用錢的優缺點",
  prompt: "What are the advantages and disadvantages of paying children pocket money for doing chores?",
  rows: [
   ["in many families…", "**In many families,** children **get** pocket money **for doing** chores **at home**."],
   ["…has both pros and cons", "**Paying children for chores has both pros and cons.**"],
   ["On the one hand, …", "**On the one hand, there are some advantages.**"],
   ["learn to save for something big", "**First,** it **teaches** children **that** money **comes from** work. They **learn to** value **every** dollar **they earn**. **This will help** them **when** they **grow up**."],
   ["my friend saved for a bike…", "**For example,** my parents **give** me fifty dollars **every time** I **clean** the bathroom, **so** I **think twice before** buying snacks. **I am saving for** a new bike."],
   ["parents get more help at home", "**Second,** children **learn** useful life skills, **like** cooking **and** cleaning, **and become** more independent. **At the same time,** parents **get** more help **at home**."],
   ["On the other hand, …", "**On the other hand, there are some disadvantages.**"],
   ["family members should help for free", "**One problem is that** children **may only help when** they **are paid**. **If** there **is no** money, they **might refuse to** do anything. **This is not how** a family **should** work."],
   ["arguments about how much to pay", "**Another problem is that it can become** expensive **for** parents **with** several children. Parents **and** children **may also** argue **about how much to** pay."],
   ["pay only for extra jobs", "**To sum up,** paying **for** chores **can teach** responsibility, **but** children **should also** help **because** they **are part of** the family. **In my opinion,** parents **should** pay **only for** extra jobs, **like** washing the car."]
  ],
  vocab: [["chores", "家事"], ["pocket money", "零用錢"], ["value", "珍惜"], ["independent", "獨立的"], ["refuse to", "拒絕"], ["responsibility", "責任感"]]
 },
 {
  no: 14, theme: "Tech Trends 科技趨勢", en: "E-books", zh: "電子書的優缺點",
  prompt: "What are the advantages and disadvantages of reading e-books instead of paper books?",
  rows: [
   ["tablets, phones, e-readers", "**More and more** students **read** books **on** tablets **and** phones **these days**."],
   ["…compared with paper books", "**E-books have both advantages and disadvantages compared with** paper books."],
   ["Let's look at the advantages first.", "**Let's look at the advantages first.**"],
   ["cheaper / save trees", "**One advantage is that** e-books **are** very convenient. One tablet **can hold** hundreds of books, **so** students **don't need to** carry heavy bags. E-books **are also often** cheaper **and save** trees."],
   ["my teacher shares e-books with the class", "**For example, on** my trip **to** Japan, I **took** ten e-books **on** my phone **without** carrying **anything extra**. My bag **was much lighter**."],
   ["read in the dark", "**Also,** e-books **have** useful functions. **You can** tap a word **to see** its meaning **or make** the letters bigger. Some e-books **can even read** the story **aloud**."],
   ["However, … some disadvantages", "**However, e-books also have some disadvantages.**"],
   ["the battery runs out", "**The main disadvantage is that** reading **on** a screen **for a long time can hurt** our eyes **and make** us tired. **What's more, if** the battery **runs out, you can't** read **at all**."],
   ["harder to remember what we read", "**In addition, it is easy to** get distracted **by** messages **and** games **on** the same device. Some studies **say that** we **remember less when** we **read on** a screen."],
   ["paper books feel more real", "**In conclusion,** both kinds of books **have** their place. **I prefer** e-books **for** travel, **but** paper books **for** studying. Paper books **just feel** more real **to me**."]
  ],
  vocab: [["tablet", "平板電腦"], ["convenient", "方便的"], ["function", "功能"], ["tap", "輕觸"], ["distracted", "分心的"], ["device", "裝置"]]
 },
 {
  no: 15, theme: "School Life 校園生活", en: "Cram Schools", zh: "補習班的優缺點",
  prompt: "What are the advantages and disadvantages of going to cram school?",
  rows: [
   ["very common in Taiwan…", "**In Taiwan, it is very common for** students **to go to** cram school **after** class."],
   ["…has both benefits and drawbacks", "**Cram schools have both benefits and drawbacks.**"],
   ["First, there are some benefits.", "**First, there are some benefits.**"],
   ["study with friends", "**One benefit is that** students **get** extra help. Classes **are** smaller, **so** teachers **can answer** more questions. Students **can also** study **with** their friends."],
   ["my friend improved in English…", "**For instance,** I **was weak at** math **in** seventh grade, **but after** going **to** a cram school **for** a few months, my grades **went up from** sixty **to** eighty-five."],
   ["teachers know exam tricks", "**Another benefit is that** cram schools **give** students **lots of** practice tests, **which build** their confidence **for** big exams. Cram school teachers **often know what kinds of** questions **appear on** the CAP."],
   ["However, … some drawbacks", "**However, there are also some drawbacks.**"],
   ["students depend on cram school", "**The biggest drawback is that** cram schools **are** expensive. Some parents **spend** thousands of dollars **every month**. **This is** a heavy burden **for** many families."],
   ["less sleep", "**What's more,** students **come home** late **and feel** exhausted, **so** they **have** no time **to** rest **or** play. Some students **even depend on** cram school **too much and** stop studying **on their own**."],
   ["try free online classes first", "**All in all,** cram schools **can be** helpful, **but** students **should** only go **if** they **really need** them. Free online classes **are also** a good choice."]
  ],
  vocab: [["cram school", "補習班"], ["extra", "額外的"], ["be weak at", "不擅長"], ["practice test", "模擬考"], ["confidence", "自信"], ["exhausted", "精疲力盡的"]]
 },
 {
  no: 16, theme: "Daily Life 日常生活", en: "Online Shopping", zh: "網路購物的優缺點",
  prompt: "What are the advantages and disadvantages of shopping online?",
  rows: [
   ["clothes, books, snacks, games…", "**Nowadays,** many people, **including** teenagers, **buy** clothes, books **and** snacks online."],
   ["…has both advantages and disadvantages", "**Online shopping has both advantages and disadvantages.**"],
   ["On the one hand, …", "**On the one hand, it has several advantages.**"],
   ["read reviews from other buyers", "**First,** it **is** very convenient. **You can** shop **at any time, even at** midnight, **without** leaving your home. **There is no need to** wait **in line**."],
   ["my dad buys books online…", "**For example,** last week I **ordered** a birthday present **for** my mom **on** my phone, **and** it **arrived the next day**. **It was so easy!**"],
   ["more choices than in stores", "**Second, it is easy to** compare prices, **so** shoppers **can often** find cheaper products. Shoppers **can also** read reviews **from** other buyers **before** they **decide**."],
   ["On the other hand, …", "**On the other hand, online shopping also has some disadvantages.**"],
   ["scams / fake products", "**One disadvantage is that you can't** try things **on**. **Sometimes** clothes **look** great **in** photos **but don't** fit **when** they **arrive**. **Even worse,** some online shops **sell** fake products."],
   ["too much packaging = waste", "**Another disadvantage is that it is too easy to** spend money. **With** just one click, people **often** buy things **they don't really need**. **On top of that,** online shopping **creates a lot of** packaging waste."],
   ["check reviews first", "**In conclusion,** online shopping **is** convenient, **but** we **should** think carefully **before** we **click** \"buy\". **It is a good idea to** check reviews **first**."]
  ],
  vocab: [["order", "訂購"], ["arrive", "送達"], ["compare prices", "比價"], ["product", "產品"], ["try on", "試穿"], ["fit", "合身"]]
 },
 {
  no: 17, theme: "Daily Life 日常生活", en: "Having a Pet", zh: "養寵物的優缺點",
  prompt: "What are the advantages and disadvantages of having a pet?",
  rows: [
   ["dogs, cats, rabbits, fish…", "Many families **in** Taiwan **keep** dogs, cats **or** other pets."],
   ["…both joys and responsibilities", "**Having a pet brings both joys and responsibilities.**"],
   ["Let's start with the advantages.", "**Let's start with the advantages.**"],
   ["dogs make us exercise", "**The main advantage is that** pets **make** us happy. **After** a bad day, **playing with** a dog **or** cat **can make** us **feel** relaxed. Dogs **also make** us **go out and** exercise **every day**."],
   ["my cat sleeps next to me…", "**For example, whenever** I **come home,** my dog Lucky **runs to** the door **and wags** his tail, **which** always **makes** me **smile**."],
   ["lonely people feel less alone", "**Besides, taking care of** a pet **teaches** children **to be** responsible. **For instance,** my little brother **feeds** Lucky **every morning before** school."],
   ["However, … some disadvantages", "**However, keeping a pet also has some disadvantages.**"],
   ["pets can be noisy or messy", "**First,** pets **cost a lot of** money. Food, toys **and** visits **to** the vet **can be** expensive. **When** my dog **got** sick last year, we **spent over** ten thousand dollars."],
   ["some people are allergic to fur", "**Second,** pets **need** time **and** attention **every day**. **When** the family **goes on** vacation, someone **has to** look after them. **In addition,** pets **can be** noisy **or** messy."],
   ["adopt, don't buy", "**To sum up,** a pet **can be** a wonderful friend, **but** we **should** think carefully **before** we **bring** one home. **If possible, it is better to** adopt a pet **than** buy one."]
  ],
  vocab: [["pet", "寵物"], ["relaxed", "放鬆的"], ["wag", "搖（尾巴）"], ["responsible", "負責任的"], ["vet", "獸醫"], ["look after", "照顧"]]
 },
 {
  no: 18, theme: "Social Media 社群媒體", en: "Becoming a YouTuber / Influencer", zh: "當網紅的優缺點",
  prompt: "What are the advantages and disadvantages of being a YouTuber or influencer?",
  rows: [
   ["many teenagers dream of…", "Many teenagers **today dream of becoming** YouTubers **or** influencers."],
   ["…bright sides and dark sides", "**Being an influencer has both bright sides and dark sides.**"],
   ["On the bright side, …", "**On the bright side, there are some attractive advantages.**"],
   ["free products from companies", "**First,** influencers **can earn** money **by doing what they love, such as** gaming, cooking **or** traveling. Some companies **even** send them free products."],
   ["my friend makes drawing videos…", "**For example,** a famous Taiwanese YouTuber **started by** filming food reviews **in** his bedroom, **and now** he **has** over a million followers. He **even** travels **around** the world **for free**."],
   ["flexible working hours", "**Second,** they **can** share their ideas **with** people **all over the world and even** help others. **Also,** they **can** choose their own working hours."],
   ["On the dark side, …", "**On the dark side, the job also has some disadvantages.**"],
   ["pressure to post every day", "**One problem is that** the income **is not** stable. **If** people **stop** watching your videos, **you may earn almost nothing**. **There is also a lot of** pressure **to** post new videos **every day**."],
   ["fans follow you everywhere", "**Another problem is that** influencers **often get** mean comments online, **and** they **have** very little privacy. Some fans **even** follow them **in** the street."],
   ["keep studying as a backup plan", "**In conclusion,** being an influencer **may look** easy, **but it is actually a lot of** hard work. **If** you **want to** become an influencer, **you should** keep studying **as** a backup plan."]
  ],
  vocab: [["influencer", "網紅"], ["attractive", "吸引人的"], ["follower", "追蹤者"], ["income", "收入"], ["stable", "穩定的"], ["privacy", "隱私"]]
 },
 {
  no: 19, theme: "Social Media 社群媒體", en: "Making Friends Online", zh: "網路交友的優缺點",
  prompt: "What are the advantages and disadvantages of making friends online?",
  rows: [
   ["games, groups, apps…", "**Thanks to** the internet, **it is** easy **to** make friends **with** people **we have never met**."],
   ["…has both advantages and disadvantages", "**Making friends online has both advantages and disadvantages.**"],
   ["First, let's look at the advantages.", "**First, let's look at the advantages.**"],
   ["learn about other cultures", "**One advantage is that you can** meet people **who share** your interests. **Even if no one in** your class **likes** your hobby, **you can** find friends online. **You can also** learn **about** other cultures."],
   ["my cousin plays games with a friend in Korea…", "**For example,** I **met** a girl **from** Japan **in** an online drawing group, **and** we **now practise** English **together**."],
   ["talk anytime", "**Also,** shy people **may find it easier to** talk online **than face to face**. **You can** chat **with** online friends **at any time**."],
   ["However, … some dangers", "**However, online friendships also have some dangers.**"],
   ["mean messages / cyberbullying", "**The biggest danger is that** some people **lie about who** they **are**. A \"teenager\" online **might actually be** an adult **with** bad intentions. Some people **also** send mean messages **because** they **think nobody knows who** they **are**."],
   ["friendships can end with one click", "**Moreover,** spending too much time **with** online friends **may make** us **spend less time with** friends **in real life**."],
   ["tell your parents about online friends", "**To conclude,** online friends **can be** great, **but** we **should never** share personal information **or** meet them **alone**. **It is also a good idea to** tell your parents **about** them."]
  ],
  vocab: [["share interests", "有共同興趣"], ["shy", "害羞的"], ["face to face", "面對面"], ["lie about", "謊報"], ["intention", "意圖"], ["personal information", "個人資料"]]
 },
 {
  no: 20, theme: "School Life 校園生活", en: "Studying Abroad", zh: "出國留學的優缺點",
  prompt: "What are the advantages and disadvantages of studying abroad?",
  rows: [
   ["the UK, the USA, Japan, Australia…", "**Every year,** many Taiwanese students **go abroad to** study."],
   ["…has both advantages and disadvantages", "**Studying abroad has both advantages and disadvantages.**"],
   ["On the one hand, …", "**On the one hand, there are many benefits.**"],
   ["more choices of universities", "**The biggest benefit is that** students **can** improve their foreign language quickly, **because** they **have to** use it **every day**. **When** they **order** food **or** take the bus, they **have to** speak the language."],
   ["my friend joined a summer camp in the UK…", "**For example,** my cousin **studied in** Australia **for** a year, **and now** she **speaks** English **like a native speaker**. She **also made** friends **from** many different countries."],
   ["make friends from many countries", "**Also,** students **can** experience a new culture **and become** more independent. They **have to** cook, clean **and** solve problems **by themselves**."],
   ["On the other hand, …", "**On the other hand, there are some difficulties.**"],
   ["culture shock / different food", "**First,** studying abroad **is** very expensive. Tuition, rent **and** plane tickets **cost a lot of** money. **Not many** families **can afford** it."],
   ["far from family in an emergency", "**Second,** students **may feel** homesick **and** lonely, **especially in** the first few months. The food **and** weather **may be** very **different from** Taiwan, **and it can take time to** get used to them."],
   ["try a short summer program first", "**In conclusion,** studying abroad **is** a great experience, **but** students **should** prepare well **before** they **go**. **Taking** a short summer program **first is a good way to** find out **if** studying abroad **is right for** you."]
  ],
  vocab: [["abroad", "在國外"], ["native speaker", "母語人士"], ["culture", "文化"], ["tuition", "學費"], ["rent", "房租"], ["homesick", "想家的"]]
 },
 {
  no: 21, theme: "Daily Life 日常生活", en: "Eating Fast Food", zh: "吃速食的優缺點",
  prompt: "What are the advantages and disadvantages of eating fast food?",
  rows: [
   ["burgers, fried chicken, pizza…", "**Fast food restaurants like** McDonald's **are very popular with** teenagers."],
   ["…has both advantages and disadvantages", "**Eating fast food has both advantages and disadvantages.**"],
   ["Let's look at the advantages first.", "**Let's look at the advantages first.**"],
   ["open late / found everywhere", "**One advantage is that** fast food **is** quick **and** convenient. Busy students **can** get a meal **in** just a few minutes. Many fast food restaurants **are also** open **late at night**."],
   ["my family eats there on busy weekends…", "**For example, on** days **when** I **have** cram school **right after** class, I **often** grab a burger **on the way**. **It takes less than** five minutes."],
   ["a fun place to meet friends", "**Another advantage is that** fast food **is** usually cheap **and tastes** good. **It is also** a fun place **to** meet friends **after** school."],
   ["However, … serious disadvantages", "**However, fast food also has some serious disadvantages.**"],
   ["lots of plastic waste", "**The main disadvantage is that** it **is** unhealthy. Most fast food **has a lot of** oil, salt **and** sugar, **but not many** vegetables. Fried food **also makes** us **feel** sleepy **and** heavy."],
   ["expensive if you eat it every day", "**In addition, eating** fast food **too often can lead to** health problems **in the future**. **On top of that,** fast food **creates a lot of** plastic waste."],
   ["choose salads and water", "**To sum up,** fast food **is** fine **once in a while, but it should not replace** healthy home-cooked meals. **When** we **eat** fast food, we **can** choose salads **and** water **instead of** fries **and** soda."]
  ],
  vocab: [["convenient", "方便的"], ["grab", "匆忙拿取"], ["on the way", "在途中"], ["lead to", "導致"], ["once in a while", "偶爾"], ["replace", "取代"]]
 },
 {
  no: 22, theme: "Daily Life 日常生活", en: "Living in a Big City", zh: "住在大城市的優缺點",
  prompt: "What are the advantages and disadvantages of living in a big city?",
  rows: [
   ["Taipei, Kaohsiung, Taichung…", "**More and more** people **are moving to** big cities **like** Taipei."],
   ["…has both pros and cons", "**Living in a big city has both pros and cons.**"],
   ["On the one hand, …", "**On the one hand, city life has many advantages.**"],
   ["more good schools and hospitals", "**First,** transportation **is** very convenient. **With** the MRT **and** buses, **you can** go **almost anywhere** quickly **and** cheaply. **There are also** more good schools **and** hospitals **in** big cities."],
   ["my grandparents' village has only one bus…", "**For example,** I **can get to** school, the library **and** the cinema **in less than** twenty minutes. **In contrast,** my grandparents' village **has only** one bus **every** hour."],
   ["more job chances", "**Second,** there **are lots of** things **to do, such as** museums, concerts **and** night markets. **What's more,** cities **offer** more job opportunities."],
   ["On the other hand, …", "**On the other hand, city life also has some disadvantages.**"],
   ["small apartments", "**One disadvantage is that** the cost of living **is** high. Rent **and** food **in** the city **are much more expensive than in** the countryside. Many families **can only afford** small apartments."],
   ["traffic jams", "**Another disadvantage is that** cities **are** crowded **and** noisy, **and** the air **is often** polluted. **During** rush hour, traffic jams **are** common, **and it is hard to** find a seat **on** the MRT."],
   ["I'd rather live in the countryside because…", "**In conclusion,** big cities **are** exciting places **to** live, **but** some people **prefer** the quiet countryside."]
  ],
  vocab: [["transportation", "交通"], ["the cost of living", "生活費"], ["countryside", "鄉下"], ["crowded", "擁擠的"], ["noisy", "吵雜的"], ["polluted", "受污染的"]]
 },
 {
  no: 23, theme: "School Life 校園生活", en: "After-School Clubs", zh: "參加課後社團的優缺點",
  prompt: "What are the advantages and disadvantages of joining after-school clubs?",
  rows: [
   ["basketball, drama, robotics…", "Most schools **offer** clubs **like** basketball, drama **and** robotics **after** class."],
   ["…has both benefits and drawbacks", "**Joining after-school clubs has both benefits and drawbacks.**"],
   ["First, let's consider the benefits.", "**First, let's consider the benefits.**"],
   ["learn teamwork / leadership", "**One benefit is that** students **can** discover new interests **and** talents **outside** the classroom. They **can also learn** teamwork **and** leadership."],
   ["my brother joined the robotics club…", "**For example,** my friend **joined** the drama club **just for fun, but now** she **wants to be** an actor. She **has already** acted **in** three school plays."],
   ["looks good for senior high applications", "**Another benefit is that** clubs **help** students **make** friends **from** other classes **and** grades. **Moreover, being in** a club **looks good on** applications **for** senior high school."],
   ["However, … some drawbacks", "**However, there are also some drawbacks.**"],
   ["pressure to win competitions", "**The main drawback is that** clubs **take** time. **If** students **join too many,** they **may not have enough** time **for** homework **and** sleep. **As a result,** they **may feel** tired **and** stressed."],
   ["parents must pick children up late", "**Also,** some clubs **cost** money **for** uniforms, equipment **or** trips. **Besides,** some clubs **feel a lot of** pressure **to** win competitions, **and** parents **have to** pick their children **up** late."],
   ["join one club you really enjoy", "**All in all,** clubs **are** a great part of school life, **as long as** students **choose just** one **or** two. **The most important thing is to** choose a club **you really enjoy**."]
  ],
  vocab: [["offer", "提供"], ["discover", "發現"], ["talent", "才能"], ["just for fun", "只是為了好玩"], ["equipment", "設備"], ["as long as", "只要"]]
 },
 {
  no: 24, theme: "School Life 校園生活", en: "School Trips", zh: "校外教學的優缺點",
  prompt: "What are the advantages and disadvantages of school trips?",
  rows: [
   ["museums, farms, other cities…", "**Every year,** many schools **take** students **on** trips **to** museums, farms **or** other cities."],
   ["…has both advantages and disadvantages", "**School trips have both advantages and disadvantages.**"],
   ["Let's start with the advantages.", "**Let's start with the advantages.**"],
   ["a break from normal lessons", "**The biggest advantage is that** students **learn by** seeing **and** doing things, **not just by** reading textbooks. **It is also** a nice break **from** normal lessons."],
   ["our class visited a tea farm…", "**For example, on** our trip **to** the science museum, I **finally understood how** electricity **works by** doing an experiment **myself**. **It was much more interesting than** reading **about it**."],
   ["learn to be independent", "**What's more,** trips **give** classmates **a chance to** spend time **together and become** closer friends. They **can also learn to be** more independent."],
   ["On the other hand, …", "**On the other hand, school trips also have some disadvantages.**"],
   ["students miss lessons", "**One disadvantage is that** they **can be** expensive **for** some families, **especially if** the trip **lasts** several days. **Also,** students **miss** a few days of lessons."],
   ["long bus rides / bad weather", "**Another disadvantage is that** teachers **have to** look after many students **at once, which is** stressful **and sometimes** unsafe. **For example, during** our trip **to** Tainan, one student **got lost for** an hour."],
   ["choose trips close to school", "**In conclusion,** school trips **are worth it if** they **are** well planned **and not too** expensive. Schools **should also** choose places **that are not too** far away."]
  ],
  vocab: [["experiment", "實驗"], ["electricity", "電"], ["a chance to", "一個…的機會"], ["last", "持續"], ["at once", "同時"], ["be worth it", "值得"]]
 },
 {
  no: 25, theme: "Tech Trends 科技趨勢", en: "Translation Apps for Learning English", zh: "用翻譯App學英文的優缺點",
  prompt: "What are the advantages and disadvantages of using translation apps to learn English?",
  rows: [
   ["Google Translate, DeepL…", "**Translation apps like** Google Translate **are on almost every** student's phone."],
   ["…has both pros and cons", "**Using translation apps to learn English has both pros and cons.**"],
   ["On the one hand, …", "**On the one hand, these apps are very helpful.**"],
   ["help us talk to tourists", "**First,** they **are** fast. **In** just one second, students **can** find **the meaning of** a new word **or** sentence. They **can also help** us **talk to** tourists."],
   ["my mom used one in Korea…", "**For example, when** I **read** an English comic book, I **use** an app **to** check words I **don't know, so** I **can** enjoy the story."],
   ["camera translation for menus and signs", "**Second,** many apps **can** read words **aloud, so** students **can** learn the correct pronunciation. Some apps **can even** translate menus **and** signs **with** the camera."],
   ["On the other hand, …", "**On the other hand, translation apps have some disadvantages.**"],
   ["students copy app translations for homework", "**The main disadvantage is that** they **are not always** correct. **Sometimes** they **translate word by word, and** the sentence **sounds** strange. Some students **also** copy app translations **for** their homework."],
   ["we don't learn grammar", "**What's more, if** students **depend on** the app **too much,** they **will** stop thinking **in** English **themselves**. They **also won't** learn grammar well."],
   ["try guessing first, then check", "**To sum up,** translation apps **are** useful tools, **but** students **should** use them **only when** they **really need** help. **It is better to** guess the meaning **first and then** check it."]
  ],
  vocab: [["translation", "翻譯"], ["meaning", "意思"], ["pronunciation", "發音"], ["word by word", "逐字地"], ["depend on", "依賴"], ["correct", "正確的"]]
 }
];

window.PET_ESSAY_TEXT = e => window.PET_ESSAY_PARAS
  .map(p => p.map(i => e.rows[i][1]).join(" ").replace(/\*\*/g, "")).join("\n\n");
