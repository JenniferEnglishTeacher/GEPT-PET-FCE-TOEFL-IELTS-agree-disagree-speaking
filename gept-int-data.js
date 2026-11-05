/* GEPT Intermediate (全民英檢中級) — 10 units: translation, essay, 10 speaking questions, picture description.
   Merged from the former GEPT-intermediate-writing-speaking site. */
const GEPT_UNITS = [
  {
    id: 1,
    theme: "Healthy choices & daily life",
    translation: {
      prompt: "氣象預報說週末是好天氣，所以爸爸建議全家人利用這機會去山上露營。我們把帳篷塞進大包包裡，然後開車到老爸在網路上訂好的營地。那裡的景色非常壯觀。我們把帳篷搭起來，然後爸爸做了一頓簡單的晚飯，但卻非常好吃。晚上我們圍坐在營火旁觀賞晴朗夜空中的流星。這真是一次令人難忘的露營之旅。",
      answer: "The forecasters said the weather would be nice over the weekend, so Dad suggested that the whole family take the opportunity to go camping in the mountains. We stuffed the tents in huge bags and drove to the campsite Dad had booked online. The view from up there was amazing. We pitched our tents, and Dad made a simple yet delicious meal. At nighttime, we sat around the campfire and watched the shooting stars in the clear sky. It was definitely a camping trip to remember."
    },
    essay: {
      prompt: "當我們在發育時，最需要的就是吃得健康、吃得營養。尤其是在求學階段，我們更需要關注學校所提供的餐點。請寫一篇文章回答：\n1. 請問你在學校吃的是健康的餐點嗎？\n2. 學校該如何鼓勵學生吃得健康？",
      answer: "Most of the meals that I have at school are quite healthy. They typically contain lots of vegetables, including carrots, cabbage, and broccoli, and good-quality protein such as fish, eggs, and tofu. We are usually given lots of fruit, too. However, the lunches sometimes include less healthy options like fried chicken, hamburgers, and overly processed food such as sausages.\n\nThe best way for schools to promote healthy eating is to teach their students about the benefits of a balanced diet. They should tell them how important it is to eat a variety of freshly cooked ingredients. They should educate them about the dangers of consuming too much salt and fat, and they should discuss the need to monitor our sugar intake."
    },
    speaking: [
      "If you were struggling to concentrate on a task, what would you do?",
      "Do you enjoy eating great food? What is the best meal that you have ever eaten?",
      "Would you like to own an electric car? Why or why not?",
      "Your friend is moving from the city to the countryside. What would you say to him?",
      "How important do you think table manners are in today's world?",
      "What do you think is the main benefit of learning a second language?",
      "You notice a leak in the ceiling of your apartment. What will you do about it?",
      "Do you order fast food often? What are the pros and cons of eating fast food?",
      "If you could visit any country in the world, where would you choose to go?",
      "How big of a role do you think technology should play in education?"
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的這些人在做什麼？", "你曾經利用過這樣的服務嗎？為什麼？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "The photo shows a man delivering a package to a woman at her door. The man, wearing a mask and gloves, is a delivery driver and is handing the item to the woman. The woman is standing at the door and accepting the package. This is a very common situation these days. Internet shopping is hugely popular, so thousands of delivery drivers deliver countless packages to people every single day. I use this kind of service on occasion. However, as I am not usually at home when my items are delivered, my mom tends to sign for and accept the packages. I think that it is a fast and convenient way to receive goods, and it avoids the need to travel to a store personally."
    }
  },
  {
    id: 2,
    theme: "Personality & social life",
    translation: {
      prompt: "朗達（Rhonda）在最新款的 iPhone 發售當天就跑去排隊買。她買到了當天那家分店的最後一支 iPhone，超興奮，迫不及待想回家開始連上 Wi-Fi 玩一整天的遊戲。很不巧她錯過了一班公車，而且下一班一小時後才會來！當她終於到家時，她的同事打電話邀她一起去打籃球。朗達勉為其難地答應去打球，但她真正想做的是玩她的新手機啊！",
      answer: "Rhonda got in the long line to buy the newest iPhone model on the day it was released. She was so excited when she got the last iPhone available in the Apple Store that day, and she couldn't wait to get home, connect to Wi-Fi, and play games for the rest of the day. Unfortunately, she missed her bus and the next one didn't arrive until an hour later! When she finally got home, her colleagues called her asking her to play basketball with them. Rhonda reluctantly agreed to play, but what she really wanted was to play with her new smartphone!"
    },
    essay: {
      prompt: "有些人在閒暇的時候特別喜歡主動去認識不同的朋友，有些人則只喜歡與自己相處。請寫一篇文章回答：\n1. 你是外向的人還是內向的人？\n2. 你喜歡與人社交嗎？為什麼？",
      answer: "An extrovert is someone who enjoys being with other people, while an introvert favors being alone. I would definitely describe myself as the former. I can cope with spending time on my own, but I prefer group activities: I am comfortable with public speaking, I am a member of the school drama club, and I love team sports more than solitary leisure activities.\n\nI enjoy socializing with other people. Not only do I frequently organize events for my friends, but I also attend parties where I don't know many people. I am happy chatting to strangers and can strike up a conversation with almost anyone. This is probably because I come from a large family, so I'm used to attending events with lots of people."
    },
    speaking: [
      "Do you like Halloween? Do you enjoy wearing costumes on that night?",
      "Have you ever experienced a power outage? How did you react?",
      "Have you ever lost your phone? Tell me what happened.",
      "The person next to you in the library is being noisy. What will you do?",
      "Should homework be banned? Please explain your answer.",
      "What characteristics make a really good friend? Do you have a friend like that?",
      "Name a sport that is popular in your country. Do you like to play it or watch it?",
      "Is there a famous person that you admire? Tell me about him or her.",
      "Do you think children should have privacy? Why or why not?",
      "How important do you think it is to have a fixed daily routine?"
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的這些人在做什麼？", "你喜歡去這種場所嗎？你會有怎樣的感受？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "This is a photograph taken in a clothing store. Two women are standing and one man is sitting. There are multiple items of clothing hung in the background. One of the women is pointing to a blouse she is holding. Her body language implies she is seeking the man's opinion. The smile on her face indicates she is enjoying the experience in the store. I enjoy shopping for clothes, too. Purchasing a new sweater or pair of jeans makes me feel happy and content. Of course, I can't always afford to buy new clothes, but even simply trying them on is a very satisfying activity. I especially enjoy going with my friends so that we can comment on each other's choices and encourage each other to try different styles."
    }
  },
  {
    id: 3,
    theme: "Charity & travel memories",
    translation: {
      prompt: "彼得（Peter）退休時很擔心人生會失去目標。因此他決定要參與慈善志工服務。雖然捐錢又快又簡單，但他想要奉獻他的時間。他選擇了一間幫助窮苦、三餐不繼民眾的地方慈善機構。他首先主辦了一場烘焙義賣來募款。後來他協助將超市捐贈的食物打包裝盒。彼得感到很滿足，因為他可以在社區裡幫助那些需要幫助的人。",
      answer: "When Peter retired, he was concerned about lacking a purpose in life, so he decided to volunteer for charity. Rather than donating money, which was quick and easy, he wanted to give his time. He chose a local charity that helped the poor and hungry. First, he organized a bake sale to raise money. Then, he helped pack boxes of food that had been donated by supermarkets. Peter felt content that he was able to assist those in need in his community."
    },
    essay: {
      prompt: "每到旅遊旺季的期間，各地都充滿著觀光客，大家都想趁機放鬆一下，並且為自己留下美好的回憶。請寫一篇文章回答：\n1. 你旅行時喜歡買紀念品嗎？為什麼？\n2. 如果有，哪一個紀念品對你來說最特別？如果沒有，你會以什麼方式回憶每次的旅行？",
      answer: "I love traveling, from day trips in Taiwan to two-week-long vacations abroad. Wherever I go, I like to buy a souvenir. It's usually inexpensive small things—typically a fridge magnet or a miniature model of a building. Nevertheless, it helps me remember the trip and the fun time I had with my friends or family.\n\nThe souvenir that I consider the most special is a snow globe of Mount Fuji in Japan. It is a relatively simple souvenir, but I feel a deep emotional connection to it. That's because my grandma bought it for me, and that trip to Japan was the only vacation I went on with my grandparents."
    },
    speaking: [
      "What do you do to prevent yourself from catching a cold or the flu?",
      "Have you ever volunteered for a charity? Why or why not?",
      "Do you follow a religion? Do you find this helpful in your daily life?",
      "What is your favorite way to exercise? Tell me why.",
      "When you go outside, how do you protect yourself from the sun?",
      "Name an unusual hobby that you want to try. Why would you like to try it?",
      "Are video games good or bad for children?",
      "What was your most unforgettable vacation?",
      "Would you rather read a book or watch a movie? Tell me why.",
      "Are you or do you want to be a vegetarian? Why or why not?"
    ],
    picture: {
      prompts: ["圖片中的這些人在做什麼？", "這可能是什麼地方？", "你時常從事這樣的活動嗎？為什麼？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "The image shows two women in a restaurant enjoying a meal. The women are obviously good friends as they appear to be laughing and joking with one another. The restaurant is very clean and quite casual, with a wooden table and partially tiled wall. The meal on the table consists of two bowls of soup or noodles and two plates of side dishes, such as tofu. I often share a light meal with friends. In fact, there is nothing that gives me more pleasure than trying out new restaurants and sampling simple but tasty food. I am happy doing it alone, but it's much more fun with friends or classmates who share my passion."
    }
  },
  {
    id: 4,
    theme: "AI & modern city life",
    translation: {
      prompt: "我週末時去了一個農民市集，是個在地農民把農產品直接銷售給大眾的地方。那裡有非常多攤販兜售各式各樣的食物，看起來都很好吃的樣子，香味撲鼻而來。我試吃了幾樣我最喜歡的東西：有起司、有香腸，也喝了在地生產的葡萄酒。我買了些新鮮蔬果，這個禮拜就不愁沒有營養的食材可煮了！如果你家附近有農民市集的話，我強烈建議去那裡逛逛。",
      answer: "I went to a farmers' market on the weekend. It's a place where local farmers sell their produce directly to the public. There were loads of vendors offering an enormous variety of food that looked tasty and smelled delightful. I sampled some of my favorites—cheese and sausages—and also drank locally produced wine. I bought some fresh fruit and vegetables so that I have nutritious ingredients to cook with this week. If there's a farmers' market in your area, I highly recommend checking it out."
    },
    essay: {
      prompt: "最近這幾年，許多企業紛紛投入發展人工智慧，也有許多人開始將人工智慧應用在生活中。請寫一篇文章回答：\n1. 就你所知，使用人工智慧的好處與壞處分別是什麼？\n2. 你有在使用人工智慧協助你嗎？為什麼？",
      answer: "I have read about artificial intelligence (AI) in the news a lot recently. It can process huge amounts of data very quickly. This can help us complete tasks more efficiently. However, it can make mistakes and generate false content. There are also privacy concerns, and some people are worried that it will take their jobs.\n\nI have used AI at home to assist me with my homework. For instance, I asked ChatGPT to collect and summarize information for me when I was about to write a paper. This helped me process huge amounts of information quickly before I began writing. As long as I keep my own critical-thinking skills and do not rely on AI too much, it is a very useful tool."
    },
    speaking: [
      "Do you think pets should be allowed in restaurants? Why or why not?",
      "When was the last time that you did something challenging?",
      "Do you think that everyone should know how to cook?",
      "Your friend tells you that he or she is struggling to stay motivated in class. What would you say to him or her?",
      "Would you prefer to create an item yourself or buy it ready-made?",
      "What is your idea of the perfect day? Describe it to me.",
      "What are some of the best ways you can think of to save money?",
      "Would you rather take an online course or an in-person course?",
      "Which skill would you most like to learn? Tell me about it.",
      "What do you usually do when you commute? Tell me about it."
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的這些人在做什麼？", "你覺得這麼做安全嗎？為什麼？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "The picture shows two women crossing a city street on a rainy day. They are both carrying umbrellas to shelter from the rain. They are using a pedestrian crossing and have 25 seconds left to get to the opposite side. Behind them, a taxi is driving across, having doubtless waited until the pedestrians were safely out of the way. Other vehicles, including another taxi and a bus, are waiting to do the same. According to a recently revised law, pedestrians on the crossing have the right of way, and any vehicles that don't yield will be fined. The drivers of the vehicles need to stop for pedestrians before making the turn to proceed with their trip."
    }
  },
  {
    id: 5,
    theme: "Responsibility & culture",
    translation: {
      prompt: "艾蜜莉亞（Amelia）的鄰居臨時要去出差，於是拜託她在此期間幫忙顧一下他的狗狗。艾蜜莉亞想到要照顧另一個生命，感到有點惶恐，但她覺得該幫鄰居的忙，所以就答應承擔這個責任。接下來七天，她遛狗、餵狗，還跟狗狗玩。原本艾蜜莉亞並未期待會跟那隻狗產生感情。然而他們倆很快就成了最好的朋友。當艾蜜莉亞的鄰居回來後，她立刻就去領養了一隻小狗！",
      answer: "Amelia's neighbor, who had to go on a last-minute business trip, asked her to take care of his dog when he was away. Amelia felt a bit anxious at the thought of taking care of another living being, but she agreed to take on the responsibility because she thought she should help her neighbor. In the following seven days, she walked the dog, fed him, and played with him. Amelia hadn't expected to bond with the dog. However, they became best friends very quickly. Right after her neighbor came back, Amelia went and adopted a puppy for herself!"
    },
    essay: {
      prompt: "在博物館與美術館等地，一年四季都會有各類的展覽供民眾參觀，多多參觀展覽是個增廣見聞的好方法。請寫一篇文章回答：\n1. 你喜歡參觀各類展覽嗎？為什麼？\n2. 你上一次參觀展覽是什麼時候？展覽的主題是什麼？",
      answer: "Going to exhibitions is one of my favorite hobbies. I always check the news and social media for the latest exhibitions in town. Design exhibitions, for example, give me the chance to check out the latest ideas by local and international designers and discover new trends. Science exhibitions, meanwhile, provide me with the opportunity to learn about interesting topics.\n\nAn exhibition I went to recently featured the renowned Dutch artist Vincent van Gogh. Instead of being shown in the traditional way, his paintings were displayed on huge screens on the walls and the floor. This method allowed visitors to become immersed in the works of art. It was a unique and interactive experience that I will never forget."
    },
    speaking: [
      "Do you think it is healthy to use social media every day?",
      "Are you a persuasive person? Why or why not?",
      "Do you worry about climate change? Tell me why or why not.",
      "Are you allergic to anything? How do you cope with the allergy?",
      "Is keeping up with the latest fashion trends important to you?",
      "Would you say that eating healthily or exercising is more important?",
      "Do you think that college students should take part-time jobs?",
      "Do you think that there's still a gender bias in some industries? Why or why not?",
      "How big of an impact does advertising have on your purchasing decisions?",
      "If you are feeling particularly stressed, what do you do about it?"
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的這些人在做什麼？", "你曾經嘗試過這樣的活動嗎？為什麼？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "In this photo, several people are walking along a narrow mountain path. They are obviously quite high up in the mountains, and there is a steep drop to their right. The hikers are all wearing helmets, holding onto a rope, and staying close to the left side of the path. All of this gives the impression that the route is potentially dangerous. I myself have been on several easy, low-level hikes over the years, but I have never participated in the activity shown in this photograph. I am concerned about developing altitude sickness, and I am a little scared of heights. Therefore, I can't see myself doing it any time in the future."
    }
  },
  {
    id: 6,
    theme: "Travel skills & city choices",
    translation: {
      prompt: "傑洛米（Jeremy）第一次去巴黎的時候，以為可以光靠手機就能在市區各地趴趴走。他打算利用咖啡館和餐廳裡的免費 Wi-Fi 來規劃他從景點 A 到景點 B 的路線。然而他沒注意到他的手機沒電了，而他正在一處鳥不生蛋的郊區！於是他不得不轉換到替代方案：他得要去買一本地圖！",
      answer: "The first time Jeremy went to Paris, he assumed he could rely solely on his smartphone to find his way around the city. He intended to use the free Wi-Fi in cafés and restaurants to plot his route from one tourist attraction to the next. However, he didn't notice that his phone was dead until it was too late, and he was in the middle of nowhere in the suburbs! He therefore had to switch to an alternative solution: he had to buy a map book!"
    },
    essay: {
      prompt: "各地的城市有各自不同的特色與魅力，有些城市生活很方便，有些則非常有文藝氣息。請寫一篇文章回答：\n1. 一個適合居住的城市需要有哪些條件？\n2. 你未來想要搬到哪裡住？",
      answer: "A great city should have plenty of restaurants serving a variety of food. It should have a lot of entertainment options, from movie theaters and concert venues to museums and galleries. It must also have plenty of green spaces where you can escape the hustle and bustle of urban life. It also needs to have an efficient and reliable public transportation system.\n\nIn the future, I would love to move to Taichung. I think it checks all of those boxes: it has countless local and international dining options; it has the National Taichung Theater and the National Taiwan Museum of Fine Arts; it has tons of parks; and it has an impressive public transportation network."
    },
    speaking: [
      "Do you prefer to brush your teeth first thing in the morning or after breakfast?",
      "Should people always tell the truth? Why or why not?",
      "Which music genre do you prefer? Tell me about it.",
      "A friend tells you his or her favorite season is winter. How would you respond?",
      "Do you think that students should be allowed to use calculators in exams?",
      "What is your favorite cultural tradition in your country? Please explain.",
      "Could you tell me about a time when you learned from your mistakes?",
      "If you were to move to a different country, how would you make new friends?",
      "Do you think celebrities have a mainly positive or negative influence on young people?",
      "What would you do if someone interrupted you all the time? Please explain."
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的這些人在做什麼？", "你時常這麼做嗎？為什麼？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "This image shows a woman and a man in a bright, clean building. The woman is walking up the stairs, carrying a bag on her right arm and holding the handle of a small suitcase in her left hand. The man is a cleaner and is holding a dustpan and a broom. The two are making friendly eye contact, and the man may be offering the woman his assistance. I have been to places like this, such as hotels and apartment buildings, with bags and suitcases before. However, I have always chosen to use the elevator rather than take the stairs. If the elevator wasn't available, I would expect someone working there to help me with at least some of my bags."
    }
  },
  {
    id: 7,
    theme: "Confidence & school life",
    translation: {
      prompt: "我向來都是個運動不行的人。我從來沒喜歡過學校的體育課，而且會刻意避免加入任何球隊。不過最近我發覺我很會跑。我跟幾個朋友在拼命跑要趕上捷運的末班車時，才意識到這個事實。我輕鬆趕上了車，但我的朋友全都沒趕上！這給了我自信，於是我就去練跑步。我現在每週跑三次，每次跑超過五公里。",
      answer: "I had never been athletic. I never liked PE classes at school, and I avoided joining any sports teams on purpose. However, I recently discovered that I was good at running. I became aware of this when I was dashing with several friends to catch the last MRT train. I caught the train with ease, but all of my friends missed it! This gave me confidence, and I started to practice running. Now I run three times a week, and I run over five kilometers each time."
    },
    essay: {
      prompt: "校園內的霸凌事件層出不窮，我們應該正視這個問題，讓校園成為學生快樂成長的地方。請寫一篇文章回答：\n1. 你在學校曾遭遇過霸凌嗎？\n2. 你會怎麼解決校園內的霸凌問題？",
      answer: "Personally, I haven't been bullied at school, but one of my close friends has. He struggled with schoolwork, so several smart students began to pick on him. They teased him by stealing his notebook and doodling on it, and they laughed at his answers to the teachers' questions during class. The situation made him very depressed and didn't stop until I stepped in and told a teacher about it.\n\nIf I were in charge of the school system, I would address the issue of bullying by raising awareness of the damage it can cause. This could be in the form of specific lessons that draw attention to the problem and give students a chance to talk openly about it. I think open communication in the school environment is key to stopping bullying once and for all."
    },
    speaking: [
      "Could you tell me about a time when you helped someone?",
      "Do you collect specific items as a hobby?",
      "Would you ever consider taking public speaking classes? Why or why not?",
      "What would be the first thing that you would do if you won the lottery?",
      "What are you prohibited from doing in your family? Tell me about it.",
      "A friend asks about your most memorable childhood experience. What would you tell him or her?",
      "Try to imagine life if the internet simply disappeared. How do you think you would feel?",
      "Do you ever use coupons to pay for items? Why or why not?",
      "What is the best advice that you have ever received?",
      "How important is it to you to spend lots of time outdoors?"
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的人在做什麼？", "你時常從事這樣的休閒活動嗎？為什麼？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "In this picture, a man is sitting by the side of a river. To protect himself from the sun, he is wearing a hat and sitting under an umbrella. On one side of him is a fishing rod, and on the other is a life ring. He is sitting on a cooler, which is used to store his bait and any fish that he might catch. My grandfather has taken me fishing a couple of times in the past. He finds the hobby to be rewarding and relaxing. However, I have to confess that I consider it quite boring. Sitting still for ages while waiting for the fish to bite and possibly catching nothing isn't something I would choose to do on my own."
    }
  },
  {
    id: 8,
    theme: "Trying new things",
    translation: {
      prompt: "我哥哥喬許（Josh）說他想在他生日那天早起看日出。我問他為什麼會有這種願望，他回答說他向來都睡很晚，從沒看過日出。於是在他生日當天，我們起了個大早，然後踏上通往公寓大樓屋頂的樓梯。我起初感到有點煩又很想睡覺，但當我看到喬許看著日出時臉上充滿了喜悅之情時，這些負面情緒就逐漸消失了。這是我與哥哥共享的美好時刻。",
      answer: "My brother Josh said that he wanted to get up early on his birthday to watch the sun rise. I asked him how that wish came about, and he replied that he had always slept late and never saw a sunrise. So, on his birthday, we woke up early and ascended the stairs to the roof of our apartment building. I initially felt somewhat annoyed and sleepy, but when I saw the joy on Josh's face as he watched the sun rise, those feelings faded away. It was a wonderful moment I shared with my brother."
    },
    essay: {
      prompt: "西諺有云：「滾石不生苔。」我們要時時保有求知慾、挑戰自己，讓自己去學習不同的新事物。請寫一篇文章回答：\n1. 請講述一個你嘗試新事物的時機點。\n2. 你學到了什麼？",
      answer: "Last year, my mom put me in charge of cooking for the family. She and my dad both had to work late on a regular basis back then, so it made sense for me to take on the responsibility. Also, she thought it was an ideal opportunity for me to build up an important life skill.\n\nAt first, I felt quite stressed because I had never cooked before. However, over time, I gained a lot of confidence. I learned from scratch how to prepare, season, and cook a variety of ingredients and turn them into delicious meals. The experience also helped me develop multitasking skills, which enabled me to get several dishes ready at the same time."
    },
    speaking: [
      "Would you describe yourself as a morning person? Why or why not?",
      "Do you think that we rely on technology too much these days?",
      "Is there a food that you would like to eat but have never tried?",
      "What would you say are some benefits of reading every day?",
      "Are you interested in art? Please tell me why or why not.",
      "Do you think it's necessary to wear a watch nowadays? Why or why not?",
      "Would you be happy to do a job that involved working lots of overtime?",
      "Do you sleep like a log, or are you a light sleeper?",
      "Are you an organized person? How could you become more organized?",
      "What are the characteristics of a good listener? Do you consider yourself a good listener?"
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的這些人在做什麼？", "這樣很重要嗎？為什麼？你也會這麼做嗎？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "The photograph shows four people collecting trash at a campground. Two men are bending down and picking up polystyrene containers to place in a garbage bag. Two women, who are also holding several garbage bags, are walking somewhere. They are apparently cleaning up after themselves after camping. The four people are being responsible campers. It is common sense that we should leave no trash behind after a picnic or a camping activity. But many people ignore the rules and leave a mess, sometimes even causing disasters like forest fires. I would never want to be irresponsible like those people. My family and I always clean up the trash after we camp or have a picnic. I think that's the least we can do for the environment."
    }
  },
  {
    id: 9,
    theme: "Education & personal style",
    translation: {
      prompt: "亞伯特（Albert）覺得自己平日的穿著打扮有點乏味，於是決定改變造型。他跑去理髮店要求剪個新髮型，於是理髮師剃掉了亞伯特腦後與兩側的頭髮。亞伯特又選擇剃掉他留了十年的絡腮鬍，改成八字鬍。然後他跑去一間服飾店，買了各式各類的潮服與配飾。看來亞伯特是鐵了心要改變他的外貌了。",
      answer: "Albert felt bored with his usual look, so he decided to change his style. He went to the barber's and asked for a new haircut. The barber shaved off the hair on the back and sides of his head. Albert also chose to get rid of his beard, which he had grown for a decade, and changed to a mustache. He then went to a clothing store and bought a bunch of fashionable clothes and accessories. It seems like Albert was really determined to transform his look."
    },
    essay: {
      prompt: "許多人在求學階段，最後往往會選擇就讀大學，以期望有更好的未來與就業機會。請寫一篇文章回答：\n1. 請問你覺得讀大學的好處在哪裡？\n2. 你覺得每個人都應該可以免費上大學嗎？為什麼？",
      answer: "Going to college helps young people become more independent. It expands their knowledge, encourages them to think critically, and allows them to meet new people. It can also help them to prepare for their future careers and give them a better chance of getting higher pay. However, I don't think a college education should be free for everyone.\n\nThere are several reasons for this. Firstly, the cost would be too much of a burden for taxpayers. Secondly, college is not suitable for everyone. Making it free would attract too many people who would otherwise be more successful in non-academic careers. Thirdly, if a college education were free, degrees would lose their value because everyone would have one. This would make it difficult for employers to eliminate job candidates during the recruitment process."
    },
    speaking: [
      "Do you keep a journal? Please tell me why or why not.",
      "If you could have any job in the world, what would it be?",
      "Do you think that you handle criticism well? Please explain.",
      "How often do you listen to music, and what device do you use?",
      "Do you agree that parents should limit screen time for their children?",
      "What are the best ways of making a good first impression on someone?",
      "An article you read says that recycling should be compulsory. What do you think of this idea?",
      "If you wanted to buy something expensive, would you use a credit card to pay for it?",
      "Do you know your neighbors? Do you think it is important to know them?",
      "If a friend invited you on a day trip to the zoo, how would you respond?"
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的是什麼人？他們在做什麼？", "你會想要嘗試相同的工作嗎？為什麼？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "In this picture, three people are wading through a rice field in a rural area. The rice paddy is wet and muddy, so they seem to be having difficulty moving in it. I assume that all of them are rice farmers and are in the middle of a day's work, and I can see that all the rice shoots are arranged neatly. I am fascinated by this kind of activity. Since a majority of people live and work in big cities now, they might have forgotten what traditional farming in the countryside looks like. I don't think I have the ability to do this day in and day out, but I would definitely like to give it a try. It would be very interesting to experience this way of life."
    }
  },
  {
    id: 10,
    theme: "Money & responsible choices",
    translation: {
      prompt: "希臘是以歷史遺跡聞名的國家。所以當莎夏（Sasha）去那裡時，想要盡可能看到越多遺跡越好。在首都市區內，她造訪了山丘上的若干座古代建築物，其中一座是祭拜某位女神的神廟。她也跑去參觀了一個市集的遺跡，古代的人們會在那裡交易商品與觀看表演。莎夏對於所看到的一切都感到不可思議，決定未來還要再造訪這片土地。",
      answer: "Greece is a country famous for its historical sites, so Sasha wanted to see as many of them as possible when she went there. In the capital city, she visited several ancient buildings on a hill. One of these structures was a temple devoted to a goddess. She also went to see the remains of a market where the ancient people traded goods and watched performances. Sasha was so fascinated by everything she saw that she decided to revisit the land in the future."
    },
    essay: {
      prompt: "許多人長大後才有機會開始理財，而理財不單單只是儲蓄而已，還包含投資與預算規畫等等，我們從小就應該開始培養正確的理財觀念。請寫一篇文章回答：\n1. 你認為學校應該教育學生如何理財嗎？\n2. 請說明原因。",
      answer: "Schools should definitely teach their students about managing their money. Skills such as budgeting, saving, and investing are a vital part of adult life. If children aren't educated about them, they may face serious problems in later years. For example, they may borrow too much money but not be able to pay it back. This could lead to more debts piling up, and they won't be able to afford a house or even a car. It may very likely hurt their relationships, too. Furthermore, they won't be able to save enough money for old age, which might leave them financially vulnerable once they retire. Learning about all of this at an early age will encourage them to develop responsible financial habits throughout their lives."
    },
    speaking: [
      "Could you tell me about a time when you felt very lucky?",
      "If it was raining outside, how would you spend your day?",
      "Have you ever filed a complaint? If not, what might make you complain?",
      "Do you think that you get a sufficient amount of sleep each night?",
      "Would you rather be a team leader or just a member?",
      "When was the last time you took time off due to illness? Tell me about it.",
      "Should it be mandatory to vote in elections? Why or why not?",
      "How would you advise a friend or family member to be more environmentally friendly?",
      "Do you prefer to eat alone or with others? Please explain your answer.",
      "Do you subscribe to any publications? Do you think that it is worth doing?"
    ],
    picture: {
      prompts: ["這可能是什麼地方？", "圖片中的人在做什麼？她為什麼這麼做？", "你認為這麼做好嗎？", "如果還有時間，請詳細描述圖片中的景物。"],
      answer: "This photo shows a woman eating lunch at her desk while looking at her laptop. She is in a very nice office, but she obviously has too much work to do. Otherwise, she would be eating in a restaurant with her colleagues. Her meal, which seems to be fried chicken and a cup of bubble milk tea, looks delicious but unhealthy. It's not an issue if she only does this occasionally. However, if having a bento with a sweet drink at her desk while working happens on a daily basis, I reckon she might have a problem. It is important that people take a break from work. During their lunch break, office workers should get out of the office, take some exercise, and choose a healthy meal."
    }
  }
];
