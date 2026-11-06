/* email-writing-data.js — KET / PET / FCE email & letter writing.
   Sources: Jennifer Chen's "Writing Email: purpose sentence patterns (FCE writing)" and
   "Email/Letter Writing (PET/FCE/TOEFL/iTEP) Part 1 Set 2" handouts; a real booking email (personal details removed).
   Bank item format: [pattern, example sentence, 中文] — example may be "" when the pattern is already a full sentence. */

window.EMAIL_STEPS = [
  { n: 1, en: "Address the person", zh: "稱呼", ex: "Dear Ms. Tan, / Hi Lucy,", go: "bank-address" },
  { n: 2, en: "Greet or reply", zh: "問候／回覆來信", ex: "I hope this email finds you well. / Thanks for getting back to me so quickly!", go: "bank-opening" },
  { n: 3, en: "State your purpose", zh: "說明寫信目的", ex: "I am writing to ask for… / Just letting you know…", go: "bank-request" },
  { n: 4, en: "Give details (2–3 points)", zh: "細節：回答每一個要點", ex: "First,… In addition,… For example,…", go: "task-1" },
  { n: 5, en: "Before the end", zh: "結尾前的一句話", ex: "Let me know what you think. / I look forward to seeing you soon.", go: "bank-before-end" },
  { n: 6, en: "Sign off + your name", zh: "結尾敬辭＋署名", ex: "Best regards, / Take care,", go: "bank-signoff" }
];

window.EMAIL_BANK = [
  { id: "address", group: "Start", en: "Addressing the Person", zh: "稱呼對方",
    formal: [
      ["Dear Mr./Mrs./Ms. [Last Name],", "Dear Mr. Smith,", "親愛的史密斯先生："],
      ["To Whom It May Concern,", "", "致相關人士："],
      ["Dear Sir or Madam,", "", "敬啟者：（不知道對方姓名時）"]
    ],
    informal: [
      ["Hi/Dear [First Name],", "Hi Lucy,", "嗨，Lucy："],
      ["Hey [First Name]!", "Hey Zach!", "嘿，Zach！"],
      ["Hi everyone, / Dear classmates,", "", "大家好：／親愛的同學們："]
    ] },
  { id: "opening", group: "Start", en: "Opening Lines", zh: "開頭問候",
    formal: [
      ["I hope this email finds you well.", "", "希望您一切安好。"],
      ["I trust that you are doing well.", "", "相信您一切都好。"],
      ["I am writing to you regarding your email/request/inquiry…", "I am writing to you regarding your inquiry about the summer course.", "我寫信給您是關於您先前的郵件／要求／詢問……"],
      ["Thank you for your prompt reply.", "", "感謝您的迅速回覆。"],
      ["I am contacting you to inquire about…", "I am contacting you to inquire about the school trip.", "我聯繫您是為了詢問……"]
    ],
    informal: [
      ["How have you been lately?", "", "你最近好嗎？"],
      ["It’s been a while since we last spoke.", "", "我們好一陣子沒聊了。"],
      ["I was just thinking about you and decided to drop you an email.", "", "我剛好想到你，就決定寫封信給你。"],
      ["Hope you’re doing awesome!", "", "希望你一切都很棒！"],
      ["Just wanted to check in and see how you’re doing.", "", "只是想問候一下，看看你最近怎麼樣。"]
    ] },
  { id: "reply", group: "Start", en: "Replying to an Email", zh: "回覆來信",
    formal: [
      ["Thank you for your email dated [date].", "Thank you for your email dated 3 May.", "感謝您 5 月 3 日的來信。"],
      ["I appreciate your prompt response to my previous email.", "", "感謝您迅速回覆我上一封郵件。"],
      ["In response to your query/question about…", "In response to your question about the timetable, the class starts at 9 a.m.", "針對您關於……的詢問……"],
      ["I am pleased to receive your update.", "", "很高興收到您的最新消息。"],
      ["Thank you for bringing this matter to my attention.", "", "感謝您讓我注意到這件事。"]
    ],
    informal: [
      ["Thanks for getting back to me so quickly!", "", "謝謝你這麼快就回覆我！"],
      ["Got your message, thanks!", "", "收到你的訊息了，謝謝！"],
      ["Hey! It was so good to hear from you.", "", "嘿！很高興收到你的來信。"],
      ["I was just thinking about you when your email popped up.", "", "我才剛想到你，你的信就來了。"],
      ["Thanks for the update, I was wondering about that.", "", "謝謝你告訴我最新消息，我正好在想這件事。"]
    ] },
  { id: "reply-vacation", group: "Start", en: "Reply: Your Friend Had a Great Vacation", zh: "回信：朋友說假期很棒",
    informal: [
      ["Wow, sounds like you had an amazing time! Tell me more!", "", "哇，聽起來你玩得很開心！多告訴我一些！"],
      ["I loved seeing your vacation photos — looks like you had a blast!", "", "我好喜歡你的假期照片——看起來你玩得超開心！"],
      ["So happy to hear you had a great vacation! What was the highlight?", "", "很高興你有個很棒的假期！最精彩的是什麼？"],
      ["Your trip sounds incredible — I’m all ears for the details!", "", "你的旅行聽起來太棒了，我洗耳恭聽細節！"],
      ["I got your email and wow, your vacation sounded like a dream!", "", "我收到你的信了，哇，你的假期聽起來像一場夢！"],
      ["Reading about your vacation made me feel like I was there with you!", "", "讀到你的假期經歷，讓我覺得好像我也在那裡！"],
      ["Glad to hear you had such a wonderful time. I need all the details!", "", "很高興你玩得這麼愉快。我要知道所有細節！"],
      ["Your vacation sounds like it was a total adventure. Spill the beans!", "", "你的假期聽起來完全是一場冒險。快說說看！"],
      ["I was so excited to read about your vacation adventures. Which part was your favorite?", "", "讀到你的假期冒險我好興奮。你最喜歡哪一部分？"],
      ["Hey, your vacation update made my day! Can’t wait to hear more about it.", "", "嘿，你的假期消息讓我一整天都很開心！迫不及待想聽更多。"]
    ] },
  { id: "reply-visit", group: "Start", en: "Reply: Your Friend Plans to Visit You", zh: "回信：朋友計畫來找你",
    informal: [
      ["I was thrilled to hear you’re planning a trip here!", "", "聽說你計畫來這裡旅行，我太興奮了！"],
      ["What fantastic news that you’re considering visiting!", "", "你考慮來玩真是太好的消息了！"],
      ["It made my day to hear about your travel plans to my country.", "", "聽到你計畫來我的國家旅行，讓我開心了一整天。"],
      ["I’m so excited you’re thinking of coming here; I’ve got loads of suggestions!", "", "你考慮來這裡讓我好興奮；我有很多建議！"],
      ["Your message about visiting here was the highlight of my week!", "", "你說要來玩的訊息是我這週最開心的事！"],
      ["I can’t wait to show you around — there are so many places we can explore!", "", "我迫不及待要帶你四處逛逛，有好多地方可以探索！"],
      ["Reading about your plans to visit here has got me all excited to play tour guide.", "", "讀到你要來的計畫，讓我好想當你的導遊。"],
      ["How wonderful that you’re planning to visit! Do you have any areas in mind?", "", "你計畫來訪真是太棒了！你有想去哪些地方嗎？"],
      ["I’ve already started thinking about all the cool places I want to show you.", "", "我已經開始想要帶你去哪些很酷的地方了。"],
      ["Your upcoming visit is going to be so much fun; I’ve got plenty of recommendations.", "", "你這次來訪一定會很好玩；我有很多推薦。"]
    ] },

  { id: "request", group: "Purpose", num: 1, en: "Making a Request", zh: "提出請求",
    formal: [
      ["I'm writing to ask for…", "I'm writing to ask for your notes from yesterday's biology class.", "我寫信是想請你借我昨天生物課的筆記。"],
      ["Could you please…?", "Could you please lend me your textbook over the weekend?", "你週末可以借我你的課本嗎？"],
      ["I'd really appreciate it if you could…", "I'd really appreciate it if you could help me with the math homework.", "如果你能幫我做數學作業，我會非常感激。"],
      ["Is there any chance you could…?", "Is there any chance you could swap shifts with me for the school fair duty?", "你有沒有可能和我交換校園園遊會的值班時段？"]
    ],
    informal: [
      ["Can/Could you…?", "Can you send me the pics from the trip?", "你可以把旅行的照片傳給我嗎？"],
      ["Would you mind V-ing…?", "Would you mind checking this document for me?", "你介意幫我檢查這份文件嗎？"],
      ["Just wondering if you could…", "Just wondering if you could help me with my homework.", "只是想問你能不能幫我寫作業。"],
      ["Can you do me a favor? Would you help me V…?", "Can you do me a favor? Would you give me some ideas about what gift to send?", "可以幫我個忙嗎？你能給我一些送禮的點子嗎？"]
    ] },
  { id: "inform", group: "Purpose", num: 2, en: "Giving Information", zh: "告知資訊",
    formal: [
      ["I am writing to inform you that…", "I am writing to inform you that the school science fair will be held on April 15th in the main hall.", "我寫信是要通知您，學校科展將於 4 月 15 日在大禮堂舉行。"],
      ["It has come to our attention that…", "It has come to our attention that some participants are not clear about the submission requirements for the art competition.", "我們注意到有些參賽者不清楚美術比賽的繳件規定。"],
      ["Please be advised that…", "Please be advised that the venue for the debate club meeting has been changed to Room 204.", "請注意，辯論社開會地點已改到 204 教室。"],
      ["I would like to update you on…", "I would like to update you on the schedule for the volunteer event; it will start at 9 a.m. this Saturday at the community park.", "我想告訴您志工活動的最新時程：本週六上午 9 點在社區公園開始。"]
    ],
    informal: [
      ["Just letting you know…", "Just letting you know that the science club meeting is set for this Friday at 4 p.m. in Room 202.", "跟你說一聲，科學社這週五下午 4 點在 202 教室開會。"],
      ["Heads up…", "Heads up, the date for the school play has been moved to April 15th.", "先提醒你，校園話劇的日期已改到 4 月 15 日。"],
      ["FYI…", "FYI, basketball practice will start half an hour early tomorrow.", "供你參考，籃球隊明天提早半小時練習。"],
      ["Quick update for you…", "Quick update for you: the debate club has moved to the library's main hall.", "快速更新一下：辯論社改到圖書館大廳了。"]
    ] },
  { id: "apologize", group: "Purpose", num: 3, en: "Apologizing", zh: "道歉",
    formal: [
      ["I would like to apologize for…", "I would like to apologize for missing our group study session.", "我想為錯過我們的小組讀書會道歉。"],
      ["Please accept our sincerest apologies for…", "Please accept our sincerest apologies for the mix-up with the event dates.", "活動日期搞混了，請接受我們最誠摯的歉意。"],
      ["We regret to inform you that…", "We regret to inform you that the school trip has been postponed.", "我們很遺憾地通知您，校外教學已延期。"],
      ["I am terribly sorry for…", "I am terribly sorry for the confusion over the homework assignment.", "作業的事造成混淆，我非常抱歉。"],
      ["I must extend my apologies for…", "I must extend my apologies for not returning your book on time.", "沒有準時還你的書，我必須向你致歉。"],
      ["We deeply regret any inconvenience caused by…", "We deeply regret any inconvenience caused by the last-minute change to the rehearsal schedule.", "彩排時間臨時更改造成不便，我們深感抱歉。"],
      ["Please accept our apologies for any disturbance caused by…", "Please accept our apologies for any disturbance caused by the noise during our club activities.", "社團活動的噪音造成打擾，請接受我們的道歉。"],
      ["I hope you can forgive me/us for…", "I hope you can forgive us for the error in the team lineup announcement.", "希望你能原諒我們在隊員名單公告上的錯誤。"]
    ],
    informal: [
      ["(I’m really) Sorry about…", "Sorry about the mess in the kitchen.", "廚房弄得一團亂，抱歉。"],
      ["My bad for…", "My bad for forgetting to call you back.", "忘了回你電話，是我不好。"],
      ["Oops, sorry for…", "Oops, sorry for sending the wrong link.", "哎呀，傳錯連結了，抱歉。"],
      ["Oops, didn’t mean to…", "Oops, didn’t mean to spoil the movie for you.", "哎呀，我不是故意爆雷的。"],
      ["So sorry for causing…", "So sorry for causing any confusion.", "造成混淆，真的很抱歉。"]
    ] },
  { id: "ask-info", group: "Purpose", num: 4, en: "Requesting Information", zh: "詢問資訊",
    formal: [
      ["Could you please provide me with…?", "Could you please provide me with the list of materials needed for the science project?", "可以請您提供科學專題所需材料的清單嗎？"],
      ["I would like to inquire about…", "I would like to inquire about the schedule for the school band practice sessions.", "我想詢問學校樂隊的練習時間表。"],
      ["May I ask for…?", "May I ask for the details of the upcoming field trip?", "可以告訴我即將到來的校外教學細節嗎？"],
      ["I am seeking information on…", "I am seeking information on how to join the school's debate team.", "我想了解如何加入學校辯論隊。"]
    ],
    informal: [
      ["Can you tell me about…?", "Can you tell me about the trip details?", "你可以告訴我旅行的細節嗎？"],
      ["Got any info on…?", "Got any info on the party this weekend?", "你有這週末派對的消息嗎？"],
      ["Do you know…?", "Do you know when they’re releasing the new album?", "你知道他們什麼時候發新專輯嗎？"],
      ["Need some details on…", "Need some details on the homework assignment.", "我需要一些作業的細節。"]
    ] },
  { id: "confirm", group: "Purpose", num: 5, en: "Confirming Details", zh: "確認細節",
    formal: [
      ["I am writing to confirm…", "I am writing to confirm our group study session at the library tomorrow at 3 p.m.", "我寫信是要確認我們明天下午 3 點在圖書館的讀書會。"],
      ["Could you please confirm…?", "Could you please confirm the list of materials we need for the science project?", "可以請您確認科學專題需要的材料清單嗎？"],
      ["I would like to confirm…", "I would like to confirm the time for our basketball practice this Saturday.", "我想確認這週六籃球隊練習的時間。"],
      ["It is my understanding that…; could you confirm?", "It is my understanding that the deadline for our art project is next Monday; could you confirm?", "據我了解，美術作品的截止日是下週一，可以請您確認嗎？"]
    ],
    informal: [
      ["Just to make sure…", "Just to make sure, we’re still on for 7 p.m., right?", "確認一下，我們還是約 7 點，對吧？"],
      ["Can you double-check…?", "Can you double-check the movie time?", "你可以再確認一下電影時間嗎？"],
      ["We’re good for… right?", "We’re good for dinner at your place on Saturday, right?", "週六去你家吃晚餐沒問題吧？"],
      ["Is… still happening?", "Is the beach trip on Sunday still happening?", "星期天的海邊之旅還照常嗎？"]
    ] },
  { id: "opinion", group: "Purpose", num: 6, en: "Expressing Opinions", zh: "表達意見",
    formal: [
      ["I believe that…", "I believe that we should reconsider our strategy.", "我相信我們應該重新考慮我們的策略。"],
      ["It is my opinion that…", "It is my opinion that the current policy needs changes.", "我認為目前的政策需要修改。"],
      ["From my perspective,…", "From my perspective, the project was a success.", "從我的角度來看，這個專案很成功。"],
      ["I would argue that…", "I would argue that more resources are necessary for this plan.", "我認為這個計畫需要更多資源。"]
    ],
    informal: [
      ["I think…", "I think we should go for it.", "我覺得我們應該去做。"],
      ["In my view/opinion,…", "In my view, the movie was just okay.", "在我看來，這部電影還好而已。"],
      ["To me,…", "To me, it feels like we're moving too fast.", "對我來說，感覺我們進展太快了。"],
      ["Honestly / To be honest / Frankly speaking, I feel…", "Honestly, I feel that we could use a break.", "老實說，我覺得我們需要休息一下。"]
    ] },
  { id: "offer-help", group: "Purpose", num: 7, en: "Offering Help", zh: "提供協助",
    formal: [
      ["Should you require any further assistance, please do not hesitate to contact me.", "", "如果您需要進一步的協助，請隨時與我聯繫。"],
      ["I would be more than happy to…", "I would be more than happy to provide you with more information.", "我非常樂意提供您更多資訊。"],
      ["Please let me know if there’s anything else I can do for you.", "", "如果還有我能為您做的事，請告訴我。"],
      ["I am available to…", "I am available to discuss this matter at your earliest convenience.", "在您方便時，我隨時可以討論這件事。"]
    ],
    informal: [
      ["Need a hand with…?", "Need a hand with your project?", "需要我幫忙做你的專題嗎？"],
      ["Just shout if you need anything.", "", "需要什麼儘管說。"],
      ["Happy to help if you need it.", "", "如果你需要，我很樂意幫忙。"],
      ["I can do that for you if you want.", "", "如果你想的話，我可以幫你做。"]
    ] },
  { id: "suggest", group: "Purpose", num: 8, en: "Making Suggestions", zh: "提出建議",
    formal: [
      ["Might I suggest that…", "Might I suggest that we consider a different approach?", "我可以建議我們考慮不同的方法嗎？"],
      ["Have you considered…?", "Have you considered the effects of this decision?", "您考慮過這個決定的影響嗎？"],
      ["I would suggest/recommend V-ing… / that S (should) V…", "I would recommend conducting a survey on this topic.", "我會建議針對這個主題做一份問卷調查。"]
    ],
    informal: [
      ["Why not try V-ing…?", "Why not try the new restaurant on Main Street?", "何不試試主街上的新餐廳？"],
      ["How about / What about V-ing…?", "How about meeting up earlier?", "我們早一點見面怎麼樣？"],
      ["You could (always) V…", "You could always join us for the movie.", "你隨時可以跟我們一起去看電影。"],
      ["What if we…?", "What if we postpone the meeting until everyone can attend?", "如果我們把會議延到大家都能參加的時候呢？"]
    ] },
  { id: "ask-feedback", group: "Purpose", num: "8+", en: "Asking for Feedback on Your Idea", zh: "提出想法並詢問對方意見",
    informal: [
      ["I’m thinking of/about V-ing…. What are your thoughts?", "I’m thinking of starting a study group for the finals. What are your thoughts?", "我在考慮為期末考成立讀書會。你覺得呢？"],
      ["I suggest (that) we V…. How does that sound?", "I suggest we meet online to discuss the project next Wednesday. How does that sound?", "我建議我們下週三線上討論專題。聽起來如何？"],
      ["Regarding/As for the…, I’m planning to V…. Any suggestions?", "Regarding the school day activities, I'm planning to organize a charity run for our community. Any suggestions?", "關於校慶活動，我計畫為社區辦一場慈善路跑。有什麼建議嗎？"],
      ["Let’s V…. Do you agree? / What do you say?", "Let's move the rehearsal to Friday evening so everyone can come. What do you say?", "我們把彩排改到週五晚上，讓大家都能來。你覺得呢？"],
      ["I’m wondering if we can/should V…. Can I get your input?", "I'm wondering if we should write about environmental awareness for the school paper. Can I get your input?", "我在想要不要為校刊寫環保意識的文章。可以給我一些意見嗎？"],
      ["We could/can V…. What's your take on this?", "We could use the school auditorium for the charity concert. What's your take on this?", "我們可以用學校禮堂辦慈善音樂會。你怎麼看？"],
      ["I’m planning to V…. Is this okay with you?", "I’m planning to start the club meetings at 4 p.m. instead of 3:30. Is this okay with you?", "我打算把社團會議從 3:30 改到 4 點開始。你可以嗎？"],
      ["If we V-ed…, would you be on board?", "If we organized a coding workshop, would you be on board?", "如果我們辦一場程式設計工作坊，你會參加嗎？"]
    ] },
  { id: "thanks", group: "Purpose", num: 9, en: "Expressing Gratitude", zh: "表達感謝",
    formal: [
      ["I would like to express my sincere gratitude for…", "I would like to express my sincere gratitude for your support during the project.", "我想對您在專案期間的支持表達誠摯的感謝。"],
      ["Please accept my deepest thanks for…", "Please accept my deepest thanks for your guidance.", "請接受我對您指導的深深感謝。"],
      ["I am most grateful for…", "I am most grateful for the opportunity to work with your team.", "我非常感激有機會與您的團隊合作。"],
      ["Your support has been invaluable to me.", "Your support has been invaluable to me, and I cannot thank you enough.", "您的支持對我來說非常寶貴，我感激不盡。"]
    ],
    informal: [
      ["Thanks a ton for…", "Thanks a ton for helping me move last weekend.", "超級謝謝你上週末幫我搬家。"],
      ["I really appreciate…", "I really appreciate all the advice you’ve given me.", "我真的很感謝你給我的所有建議。"],
      ["You’re a lifesaver for…", "You’re a lifesaver for fixing my computer.", "你幫我修好電腦，真是我的救星。"],
      ["Can’t thank you enough for…", "Can’t thank you enough for the birthday surprise.", "生日驚喜讓我感激不盡。"]
    ] },
  { id: "invite", group: "Purpose", num: 10, en: "Inviting", zh: "邀請",
    formal: [
      ["I would be thrilled if you could join us for…", "I would be thrilled if you could join us for our school's annual talent show.", "如果您能來參加我們學校的年度才藝表演，我會非常開心。"],
      ["You are warmly invited to…", "You are warmly invited to the premiere of our school play this Thursday evening.", "誠摯邀請您參加本週四晚上我們校園話劇的首演。"],
      ["Your presence would be greatly appreciated at…", "Your presence would be greatly appreciated at the student council fundraising event next month.", "誠摯期盼您出席下個月的學生會募款活動。"],
      ["It would be our pleasure to have you at…", "It would be our pleasure to have you at our debate team's final round.", "若您能蒞臨我們辯論隊的決賽，將是我們的榮幸。"]
    ],
    informal: [
      ["Wanna come to…?", "Wanna come to my place for a movie night?", "要不要來我家看電影？"],
      ["How about hanging out at…?", "How about hanging out at the new cafe this weekend?", "這週末去新開的咖啡店坐坐怎麼樣？"],
      ["You’re invited to…", "You’re invited to my birthday party next Friday.", "邀請你來參加我下週五的生日派對。"],
      ["Feel free to join us for…", "Feel free to join us for a hike on Saturday.", "週六歡迎一起來健行。"]
    ] },
  { id: "decline", group: "Purpose", num: 11, en: "Declining an Invitation or Request", zh: "婉拒邀請或請求",
    formal: [
      ["I regret to inform you that I am unable to attend…", "I regret to inform you that I am unable to attend the meeting on Thursday.", "很遺憾通知您，我無法出席週四的會議。"],
      ["Unfortunately, I must decline your invitation due to…", "Unfortunately, I must decline your invitation due to a prior commitment.", "很可惜，因為已有其他安排，我必須婉拒您的邀請。"],
      ["After careful consideration, I have decided…", "After careful consideration, I have decided not to apply for the position.", "經過仔細考慮，我決定不申請這個職位。"],
      ["I appreciate the offer, but…", "I appreciate the offer, but I must say no at this time.", "謝謝您的好意，但這次我必須婉拒。"]
    ],
    informal: [
      ["Sorry, can’t make it because…", "Sorry, can’t make it because I’ve got another thing planned.", "抱歉，我不能去，因為我已經有別的安排。"],
      ["Wish I could, but…", "Wish I could, but I’m swamped this week.", "真希望能去，但我這週忙翻了。"],
      ["Would love to, but…", "Would love to, but I’ve already got plans.", "很想去，但我已經有計畫了。"],
      ["Can’t this time — how about next…?", "Can’t this time — how about next weekend?", "這次不行，下週末怎麼樣？"]
    ] },
  { id: "concern", group: "Purpose", num: 12, en: "Expressing Concerns About a Proposal", zh: "對提議表達疑慮",
    formal: [
      ["I have some reservations about…", "I have some reservations about the proposed changes to the school uniform policy.", "我對校服規定的修改提案有些保留。"],
      ["It is my concern that…", "It is my concern that the new lunch schedule might not allow enough time for students to eat.", "我擔心新的午餐時間表可能不夠讓學生吃飯。"],
      ["I am apprehensive about…", "I am apprehensive about starting the new grading system by next semester.", "我對下學期就實施新評分制度感到擔憂。"],
      ["There are concerns regarding…", "There are concerns regarding the safety measures for the upcoming school trip.", "大家對即將到來的校外教學安全措施有些疑慮。"]
    ],
    informal: [
      ["Not sure about…", "Not sure about moving the art club to Friday afternoons.", "我不太確定要把美術社改到週五下午。"],
      ["Is it just me, or…?", "Is it just me, or does the new project timeline seem a bit rushed?", "只有我這麼覺得嗎？新的專題時程好像有點趕。"],
      ["Kinda worried about…", "Kinda worried about how much the yearbook is going to cost this year.", "有點擔心今年畢業紀念冊要花多少錢。"],
      ["Do you think it’s a good idea to…?", "Do you think it’s a good idea to have exams right after the holiday break?", "你覺得放完假馬上考試是好主意嗎？"]
    ] },
  { id: "clarify", group: "Purpose", num: 13, en: "Clarifying Ideas / Activity Details", zh: "釐清想法或活動細節",
    formal: [
      ["Could you elaborate on…?", "Could you elaborate on the goals of the new community service program?", "您能詳細說明新社區服務計畫的目標嗎？"],
      ["I would like further clarification on…", "I would like further clarification on the requirements for the debate competition.", "我想進一步了解辯論比賽的參賽規定。"],
      ["It would be helpful to have more details about…", "It would be helpful to have more details about the schedule for the science fair.", "如果能有科展時程的更多細節，會很有幫助。"],
      ["Could you specify…?", "Could you specify the materials needed for the art project?", "您能具體說明美術作品需要哪些材料嗎？"]
    ],
    informal: [
      ["What’s the deal with…?", "What’s the deal with the new lunch menu? Are we getting more options?", "新的午餐菜單是怎麼回事？我們會有更多選擇嗎？"],
      ["Can you give more info on…?", "Can you give more info on the trip next month? Where are we staying?", "可以多說一點下個月旅行的事嗎？我們住哪裡？"],
      ["How does… work exactly?", "How does signing up for the talent show work exactly? Do we need to audition?", "才藝表演到底要怎麼報名？需要試鏡嗎？"],
      ["Any idea about…?", "Any idea about how long the workshop is going to last?", "你知道工作坊會進行多久嗎？"]
    ] },
  { id: "activity-ideas", group: "Purpose", num: 14, en: "Offering Activity / Trip Ideas", zh: "提出活動或旅行點子",
    formal: [
      ["I would like to propose…", "I would like to propose an environmental clean-up day as a school-wide activity.", "我想提議舉辦全校性的環境清潔日。"],
      ["It might be beneficial to consider…", "It might be beneficial to consider a cultural exchange program with our sister school.", "考慮和姊妹校進行文化交流計畫可能會有幫助。"],
      ["An idea worth exploring could be…", "An idea worth exploring could be a technology workshop for students interested in coding.", "一個值得探討的點子是為喜歡寫程式的學生辦科技工作坊。"],
      ["Have we thought about…?", "Have we thought about organizing a charity concert to raise money for local shelters?", "我們有沒有想過辦一場慈善音樂會，為當地收容所募款？"]
    ],
    informal: [
      ["What if we…?", "What if we organized a movie marathon for charity?", "如果我們辦一場慈善電影馬拉松呢？"],
      ["How cool would it be to…?", "How cool would it be to have a school-wide scavenger hunt?", "全校一起玩尋寶遊戲會有多酷？"],
      ["Should we try…?", "Should we try setting up a student art exhibit in the library?", "我們要不要試著在圖書館辦學生美展？"],
      ["Why don’t we…?", "Why don’t we plan a beach clean-up as a fun way to earn community service hours?", "我們何不計畫淨灘，當作有趣的服務學習時數？"]
    ] },
  { id: "bring-items", group: "Purpose", num: 15, en: "Suggesting What to Bring for a Class Trip", zh: "建議校外教學要帶的物品",
    formal: [
      ["I would recommend that all students bring…", "I would recommend that all students bring reusable water bottles and sun protection for our field trip to the national park.", "我建議所有學生去國家公園校外教學時帶環保水瓶和防曬用品。"],
      ["It is advisable for participants to include… in their packing list.", "It is advisable for participants to include a first-aid kit and a flashlight in their packing list for the camping trip.", "建議參加者把急救包和手電筒列入露營的行李清單。"],
      ["Please make sure to bring…", "Please make sure to bring your ID and any necessary medicine for the trip.", "請務必攜帶身分證件和旅途中需要的藥品。"]
    ],
    informal: [
      ["Don’t forget to bring…", "Don’t forget to bring your cameras and snacks for the road trip!", "別忘了帶相機和路上吃的零食！"],
      ["Make sure you pack…", "Make sure you pack comfy shoes because we’ll be doing a lot of walking.", "記得帶舒服的鞋子，因為我們會走很多路。"],
      ["You might want to take…", "You might want to take a raincoat or an umbrella, just in case it rains.", "你可能要帶件雨衣或雨傘，以防下雨。"]
    ] },
  { id: "taiwan-places", group: "Purpose", num: 16, en: "Where to Take a Foreign Friend in Taiwan", zh: "推薦外國朋友在台灣去哪裡玩",
    formal: [
      ["I highly recommend visiting…", "I highly recommend visiting the National Palace Museum in Taipei to see the richness of Chinese imperial art.", "我強烈推薦參觀台北故宮博物院，感受中國皇家藝術之美。"],
      ["An essential site to include in your itinerary is…", "An essential site to include in your itinerary is Taroko Gorge, known for its breathtaking natural beauty.", "行程中一定要安排太魯閣峽谷，那裡以壯麗的自然景色聞名。"],
      ["For a unique cultural experience, consider visiting…", "For a unique cultural experience, consider visiting the indigenous villages in Hualien.", "想要獨特的文化體驗，可以考慮參觀花蓮的原住民部落。"]
    ],
    informal: [
      ["You’ve gotta check out…", "You’ve gotta check out Jiufen! It feels like stepping into an animated movie.", "你一定要去九份！感覺就像走進動畫電影裡。"],
      ["Don’t miss out on…", "Don’t miss out on the night markets, especially Shilin Night Market for amazing street food.", "別錯過夜市，尤其是士林夜市的美味小吃。"],
      ["Make sure to visit… for some cool pics.", "Make sure to visit Ximending for some cool pics and trendy shopping.", "一定要去西門町拍些酷照、逛逛潮店。"]
    ] },
  { id: "social-activities", group: "Purpose", num: 17, en: "Suggesting Social Activities for a Class Trip", zh: "建議校外教學的團體活動",
    formal: [
      ["It would be beneficial to organize…", "It would be beneficial to organize team-building games to encourage teamwork among students.", "辦團隊建立活動有助於促進學生之間的合作。"],
      ["I propose including…", "I propose including a cultural exchange with local students to help us understand the area better.", "我提議加入和當地學生的文化交流，讓我們更了解當地。"],
      ["An engaging activity would be…", "An engaging activity would be a scavenger hunt around the historical sites of the city.", "一個有趣的活動是在城市古蹟周圍進行尋寶遊戲。"]
    ],
    informal: [
      ["How about we do…?", "How about we do a beach clean-up? It’s fun and we get to help the environment.", "我們去淨灘怎麼樣？好玩又能幫助環境。"],
      ["Let’s try…", "Let’s try karaoke night! It’s a great way to relax after a day of sightseeing.", "我們來試試卡拉 OK 之夜！觀光一整天後放鬆一下。"],
      ["Why not organize…?", "Why not organize a photo contest? Everyone can share their best shots from the trip.", "何不辦個攝影比賽？大家可以分享旅行中最棒的照片。"]
    ] },
  { id: "disagree", group: "Purpose", num: 18, en: "Disagreeing with a Proposal (and Why)", zh: "不同意提議並說明原因",
    formal: [
      ["While I appreciate the idea of…, I have reservations about… due to…", "While I appreciate the idea of a beach clean-up, I have reservations about doing it during winter due to safety concerns.", "雖然我認同淨灘的想法，但因為安全考量，我對冬天進行有所保留。"],
      ["I understand the appeal of…; however, I believe it overlooks…", "I understand the appeal of a school camping trip; however, I believe it overlooks whether all students can take part.", "我理解露營的吸引力；但我認為它忽略了是否每位學生都能參加。"],
      ["After careful consideration, I must disagree with… due to…", "After careful consideration, I must disagree with the proposed date for the talent show due to the exam schedule.", "經過仔細考慮，因為考試時程，我必須反對才藝表演的提議日期。"],
      ["It is my belief that… might not… because of…", "It is my belief that a new student club might not succeed because it overlaps with existing clubs.", "我認為新社團可能不會成功，因為和現有社團重疊。"],
      ["I am concerned that the proposal for… overlooks…", "I am concerned that the proposal for an outdoor music festival overlooks noise rules.", "我擔心戶外音樂節的提案忽略了噪音規定。"],
      ["Despite its potential benefits, I find… hard to support because of…", "Despite its potential benefits, I find a school-wide online game tournament hard to support because of concerns about screen time.", "儘管有好處，但因為擔心螢幕時間，我很難支持全校線上遊戲比賽。"]
    ],
    informal: [
      ["I get the fun part of…, but have we thought about…?", "I get the fun part of a movie marathon night, but have we thought about how late it would go?", "我懂電影馬拉松之夜的樂趣，但我們想過會弄到多晚嗎？"],
      ["Honestly, … sounds cool, but I'm not sure about…", "Honestly, a bake sale sounds cool, but I'm not sure about doing it during finals week.", "老實說，義賣烘焙聽起來很酷，但我不確定期末考週辦好不好。"],
      ["Your idea of… is great, but what about…?", "Your idea of a study group is great, but what about the noise in the cafeteria?", "你讀書會的點子很棒，但餐廳的噪音怎麼辦？"],
      ["I love the idea of…, but aren't we forgetting about…?", "I love the idea of a beach party, but aren't we forgetting about jellyfish season?", "我喜歡海灘派對的點子，但我們是不是忘了水母季？"],
      ["… sounds amazing, but have we considered…?", "A school play sounds amazing, but have we considered the workload for the drama club?", "校園話劇聽起來很棒，但我們考慮過戲劇社的工作量嗎？"],
      ["Not sure about…. What if…?", "Not sure about a costume contest at the school fair. What if it leaves out people who can't afford costumes?", "我不確定園遊會辦變裝比賽好不好。如果買不起服裝的人沒辦法參加怎麼辦？"]
    ] },
  { id: "alternatives", group: "Purpose", num: 19, en: "Offering Alternatives to the Original Plan", zh: "提出替代方案",
    formal: [
      ["May I suggest… as an alternative to…?", "May I suggest an indoor environmental project as an alternative to the beach clean-up during the colder months?", "天氣較冷時，我可以建議用室內環保專案取代淨灘嗎？"],
      ["Considering…, an alternative solution might be to…", "Considering the accessibility issue, an alternative solution might be to organize a virtual camping experience.", "考慮到參與的問題，替代方案可以是辦一場線上露營體驗。"],
      ["To avoid…, it would be wise to consider…", "To avoid a clash with the exam schedule, it would be wise to consider moving the talent show to a later date.", "為了避免和考試撞期，把才藝表演延後會比較明智。"],
      ["An alternative that is worth considering is…", "An alternative that is worth considering is creating a small group within an existing club instead of forming a new club.", "值得考慮的替代方案是在現有社團內成立小組，而不是新成立社團。"],
      ["I propose we explore the possibility of… as an alternative to…", "I propose we explore the possibility of a silent disco as an alternative to the outdoor music festival.", "我提議我們考慮用無聲派對取代戶外音樂節。"],
      ["Another option we might consider is…", "Another option we might consider is organizing smaller, class-based online game tournaments.", "另一個可考慮的選項是辦規模較小、以班級為單位的線上遊戲比賽。"]
    ],
    informal: [
      ["What if we did… instead of…?", "What if we did a series of short movie nights instead of a marathon? That way, it wouldn't go too late.", "如果我們辦幾場短的電影之夜而不是馬拉松呢？這樣就不會弄到太晚。"],
      ["Maybe we could…?", "Maybe we could do a virtual bake sale during finals? We could share recipes and photos online.", "也許期末考期間可以辦線上烘焙義賣？我們可以在網路上分享食譜和照片。"],
      ["How about finding…?", "How about finding a quieter spot for the study group, like the library's study rooms?", "幫讀書會找個安靜一點的地方怎麼樣，例如圖書館的自習室？"],
      ["Instead of…, why not have…?", "Instead of a beach party during jellyfish season, why not have a pool party at the community center?", "與其在水母季辦海灘派對，何不在社區中心辦泳池派對？"],
      ["For…, maybe we could…?", "For the school play, maybe we could spread the tasks across more clubs to lighten the load on the drama club?", "校園話劇的部分，也許可以把工作分給更多社團，減輕戲劇社的負擔？"],
      ["What if… allows…?", "What if the costume contest allows homemade or borrowed costumes so everyone can take part?", "如果變裝比賽允許自製或借來的服裝，讓每個人都能參加呢？"]
    ] },
  { id: "your-ideas-feedback", group: "Purpose", num: 20, en: "Asking for Feedback on Your Suggestions", zh: "請對方回饋你的建議",
    formal: [
      ["I would greatly appreciate your thoughts on…", "I would greatly appreciate your thoughts on the proposed indoor environmental project.", "非常希望聽到您對室內環保專案提議的想法。"],
      ["Could I kindly ask for your feedback on…?", "Could I kindly ask for your feedback on organizing a virtual camping experience?", "可以請您對辦線上露營體驗給些回饋嗎？"],
      ["Your insights on… would be invaluable to us.", "Your insights on rescheduling the talent show would be invaluable to us.", "您對才藝表演改期的看法對我們非常寶貴。"],
      ["I am eager to hear your opinion on…", "I am eager to hear your opinion on creating a small group within an existing club.", "我很想聽聽您對在現有社團內成立小組的意見。"],
      ["Please share your thoughts on…", "Please share your thoughts on a silent disco as an alternative to the outdoor music festival.", "請分享您對以無聲派對取代戶外音樂節的想法。"],
      ["I would appreciate your perspective on…", "I would appreciate your perspective on organizing class-based online game tournaments.", "希望了解您對辦班級線上遊戲比賽的看法。"]
    ],
    informal: [
      ["What do you guys think about…?", "What do you guys think about breaking up the movie marathon into shorter nights?", "你們覺得把電影馬拉松分成幾個短的晚上怎麼樣？"],
      ["Would… be too crazy? Love to hear your thoughts!", "Hey, would a virtual bake sale during finals be too crazy? Love to hear your thoughts!", "嘿，期末考期間辦線上烘焙義賣會不會太瘋狂？很想聽聽你們的想法！"],
      ["What are your thoughts on…?", "What are your thoughts on using the library's study rooms for our group sessions?", "你們覺得用圖書館自習室開讀書會怎麼樣？"],
      ["… — yay or nay?", "Pool party instead of beach party during jellyfish season — yay or nay?", "水母季改辦泳池派對——贊成還是反對？"],
      ["How do you all feel about…?", "How do you all feel about spreading the school play work across more clubs?", "大家覺得把校園話劇的工作分給更多社團怎麼樣？"],
      ["Would… work for everyone?", "Would making the costume contest more inclusive with homemade costumes work for everyone?", "讓變裝比賽接受自製服裝、讓更多人參加，大家覺得可行嗎？"]
    ] },
  { id: "update", group: "Purpose", num: 21, en: "Updating Information", zh: "更新資訊",
    formal: [
      ["I am writing to inform you of a recent update regarding…", "I am writing to inform you of a recent update regarding the schedule for final exams.", "我寫信是要通知您期末考時間表的最新更動。"],
      ["Please be advised that…", "Please be advised that the location for the school play has been changed to the auditorium.", "請注意，校園話劇的地點已改到禮堂。"],
      ["It is important to note that…", "It is important to note that the deadline for club registration has been moved up to next Friday.", "請特別注意，社團報名截止日已提前到下週五。"],
      ["We wish to notify you that…", "We wish to notify you that the theme for this year's prom will be “Starry Night”.", "我們在此通知您，今年舞會的主題是「星夜」。"]
    ],
    informal: [
      ["Just a heads up,…", "Just a heads up, we’re switching the history project presentation to online.", "先跟你說一聲，歷史專題報告改成線上了。"],
      ["BTW (by the way),…", "BTW, soccer practice has been moved to 4 p.m. on Thursdays.", "順便說一下，足球練習改到週四下午 4 點。"],
      ["Quick update for you:…", "Quick update for you: the math competition has been moved to March 15th.", "快速更新：數學競賽改到 3 月 15 日了。"]
    ] },

  { id: "before-end", group: "End", en: "Before the End: Last Lines", zh: "結尾前的最後一句",
    sets: [
      { en: "You look forward to an upcoming event", zh: "期待即將到來的活動", items: [
        ["I’m eagerly looking forward to our event next week and can’t wait to see it all come together.", "", "我非常期待下週的活動，等不及看到一切順利完成。"],
        ["Counting down the days until the event — it’s going to be unforgettable!", "", "倒數活動的日子——一定會很難忘！"],
        ["Looking forward to the conference this Friday — it’s sure to be interesting.", "", "期待這週五的研討會——一定很有收穫。"],
        ["I look forward to meeting/seeing you soon.", "", "期待很快見到你。"],
        ["I can’t wait to have fun with you.", "", "等不及要跟你一起玩了。"] ] },
      { en: "You would like to hear from the person", zh: "希望對方回信", items: [
        ["I’d love to hear your thoughts on this whenever you have a moment.", "", "你有空時，很想聽聽你的想法。"],
        ["Your input would be greatly appreciated; please let me know your thoughts at your earliest convenience.", "", "非常感謝您的意見；方便時請告訴我您的想法。"],
        ["I’m keen to hear your perspective, so please feel free to share your thoughts.", "", "我很想知道你的看法，歡迎分享。"] ] },
      { en: "You would like the person’s feedback", zh: "希望對方給回饋", items: [
        ["Let me know what you think, OK?", "", "告訴我你的想法，好嗎？"],
        ["Tell me what you think about my ideas.", "", "告訴我你對我的點子有什麼想法。"],
        ["Feel free to talk to me about your thoughts.", "", "有任何想法都可以跟我說。"],
        ["Looking forward to your feedback — your ideas always mean a lot to me.", "", "期待你的回饋——你的想法對我總是很重要。"],
        ["Please let me know what you think; your feedback would mean a lot to me.", "", "請告訴我你的想法；你的回饋對我很重要。"] ] },
      { en: "You would like to see him/her soon", zh: "希望很快見面", items: [
        ["Hoping to see you soon — it’s been too long since we last met.", "", "希望很快見到你——上次見面已經太久了。"],
        ["Can’t wait to catch up in person; let’s make it happen soon!", "", "等不及要當面聊聊；我們快點約吧！"],
        ["Looking forward to our next meet-up; hopefully it’s just around the corner.", "", "期待下次見面，希望很快就能見到。"] ] },
      { en: "It’s great to talk to him/her", zh: "很高興和對方聊天", items: [
        ["It was fantastic catching up with you — let’s do it again soon.", "", "跟你聊近況真開心——我們很快再聊。"],
        ["Always a pleasure chatting with you; I look forward to our next conversation.", "", "跟你聊天總是很愉快，期待下次再聊。"],
        ["Great talking to you, as always. Can’t wait for our next chat.", "", "一如往常，跟你聊得很開心。等不及下次再聊。"] ] }
    ] },
  { id: "signoff", group: "End", en: "Sign-offs", zh: "結尾敬辭",
    formal: [
      ["Yours sincerely,", "", "敬上（知道對方姓名時，英式）"],
      ["Yours faithfully,", "", "敬上（Dear Sir or Madam 開頭時，英式）"],
      ["Sincerely,", "", "敬上（美式）"],
      ["Best regards,", "", "祝好"],
      ["Respectfully yours,", "", "謹上"],
      ["With appreciation,", "", "謹致謝意"],
      ["Warmest regards,", "", "致上最溫暖的問候"]
    ],
    informal: [
      ["Cheers,", "", "乾杯／祝好（英式口語）"],
      ["Best wishes,", "", "祝一切順利"],
      ["Send my regards to your family,", "", "代我向你的家人問好"],
      ["Warmly,", "", "溫暖的祝福"],
      ["Take care,", "", "保重"],
      ["Talk soon,", "", "很快再聊"],
      ["See you soon,", "", "很快見"],
      ["Love,", "", "愛你的（家人、好朋友）"]
    ] }
];

window.EMAIL_TASKS = [
 {
  "id": "task-1",
  "n": 1,
  "en": "Thank-You Note",
  "zh": "感謝信",
  "tone": "semi",
  "to": "your club captain",
  "links": [
   "thanks",
   "before-end"
  ],
  "prompt": "Your club captain organized a successful end-of-semester showcase event and worked hard to bring the whole club together for the performance. Write a thank-you note to your club captain.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear [Name],",
     "Hi [Name], I just wanted to say…",
     "Dear Captain [Name],",
     "Hello [Name],"
    ],
    "html": "Dear Captain Vanessa,"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I am writing to thank you for all the effort you put into…",
     "I wanted to take a moment to express my sincere appreciation for…",
     "On behalf of the whole club, I would like to thank you for…",
     "I just wanted to say a huge thank you for…"
    ],
    "html": "<b>I am writing to thank you</b> for all the effort you put into organizing our end-of-semester showcase. The event was truly memorable, and it would not have happened without your leadership."
   },
   {
    "el": "Details",
    "pats": [
     "The way you… really brought the whole group together because…",
     "I especially appreciated how you… even when things were difficult.",
     "From planning the rehearsals to coordinating the costumes/props, you…",
     "What stood out to me most was how you always made everyone feel…"
    ],
    "html": "<b>What stood out to me most</b> was how you held so many extra rehearsals and made sure every single member felt included and confident on stage. <b>The way you coordinated everything</b> — from the performance order to the sound setup — showed how much you genuinely care about this club."
   },
   {
    "el": "Closing",
    "pats": [
     "We are so lucky to have you as our captain because…",
     "I hope you know how much the club appreciates everything you do.",
     "Please know that your hard work did not go unnoticed.",
     "Thank you once again for making this event so special for all of us."
    ],
    "html": "<b>Please know that your hard work did not go unnoticed.</b> Every club member is truly grateful. Thank you for being such an inspiring captain — we could not have done it without you."
   },
   {
    "el": "Sign-off",
    "pats": [
     "With gratitude,",
     "Warmly,",
     "Your club member,",
     "With much appreciation,"
    ],
    "html": "",
    "signoff": "With much appreciation,",
    "name": "Elena Ng"
   }
  ]
 },
 {
  "id": "task-2",
  "n": 2,
  "en": "Apology Note",
  "zh": "道歉信",
  "tone": "informal",
  "to": "your group members",
  "links": [
   "apologize",
   "offer-help"
  ],
  "prompt": "You submitted your research section of a group project too late, and as a result your group received a low score. Write an apology note to the other members of your group and explain how you will make it up to them.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear [Name], [Name], and [Name],",
     "Hi team,",
     "Dear group members,",
     "To my project group,"
    ],
    "html": "Dear Marcus, Priya, and Wei Ling,"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I am writing to sincerely apologize for…",
     "I want to say how truly sorry I am for…",
     "I owe all of you a genuine apology for…",
     "I am deeply sorry for the situation I caused by…"
    ],
    "html": "<b>I owe all of you a genuine apology</b> for submitting my research section two days late. I know that my delay directly affected our group's final score, and I feel terrible about that."
   },
   {
    "el": "Acknowledgement of Impact",
    "pats": [
     "I fully understand that because of my lateness, the group…",
     "I realize that my actions were unfair to all of you because you…",
     "You all worked so hard and on time, and my delay let you down.",
     "It was completely my fault, and I take full responsibility for…"
    ],
    "html": "<b>I fully understand that</b> because of my lateness, you were unable to review and proofread the full report before submission, which cost us marks we could have earned. <b>You all worked so hard</b> and on time, and my delay was completely unfair to you."
   },
   {
    "el": "Make-Up Plan",
    "pats": [
     "To make it up to you, I would like to…",
     "I am prepared to… to help improve our final grade.",
     "If it is still possible, I would be happy to… to make amends.",
     "I plan to speak to the teacher about… and I will take full responsibility."
    ],
    "html": "<b>To make it up to you</b>, I plan to speak to Mr. Lim personally and take full responsibility for the delay. I would also like to offer to take on the bulk of our next group assignment so you have a lighter workload. <b>I am prepared to</b> do whatever it takes to restore the team's trust."
   },
   {
    "el": "Closing / Sign-off",
    "pats": [
     "I promise this will not happen again.",
     "Once again, I am truly sorry for letting the group down.",
     "I value your friendship and I hope you can forgive me.",
     "Apologetically,"
    ],
    "html": "<b>Once again, I am truly sorry</b> for letting the group down. I value each of you as teammates and friends, and I will work hard to earn back your trust.",
    "signoff": "Apologetically,",
    "name": "Josh Tan"
   }
  ]
 },
 {
  "id": "task-3",
  "n": 3,
  "en": "Explanation / Excuse",
  "zh": "說明缺席原因",
  "tone": "formal",
  "to": "the student council chairperson",
  "links": [
   "decline",
   "apologize",
   "offer-help"
  ],
  "prompt": "You have to miss a charity volunteering weekend organized by the student council due to a family commitment. Write a note to the student council chairperson explaining your absence and proposing a way to make up for it.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear [Title] [Name],",
     "Dear [Name],",
     "To the Student Council Chairperson,",
     "Dear Student Council President,"
    ],
    "html": "Dear Student Council Chairperson, Amelia,"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I am writing to explain why I am unable to attend…",
     "I regret to inform you that I will not be able to participate in…",
     "I am writing to let you know that I have to miss… and to explain why.",
     "I would like to inform you that, unfortunately, I cannot attend…"
    ],
    "html": "<b>I regret to inform you</b> that I am unable to attend the charity volunteering weekend on 24–25 May due to a prior family commitment that I cannot reschedule."
   },
   {
    "el": "Explanation",
    "pats": [
     "The reason I am unable to attend is that…",
     "Unfortunately, this commitment has been planned since… and cannot be changed.",
     "My family has a long-scheduled… that I am expected to attend.",
     "This is a family obligation that I was only recently informed cannot be postponed."
    ],
    "html": "<b>The reason I am unable to attend is that</b> my family has a long-scheduled reunion trip out of town that weekend, which my grandparents have planned for the past three months. This is an obligation I cannot change at short notice."
   },
   {
    "el": "Make-Up Plan",
    "pats": [
     "I would like to make up for my absence by…",
     "To compensate, I am happy to… at a time that suits the council.",
     "I propose to contribute by… so that the event is still fully supported.",
     "I would be glad to help with… either before or after the event weekend."
    ],
    "html": "<b>I would like to make up for my absence</b> by volunteering an additional full day at the charity centre on a weekday during the June school holidays. I am also happy to help with any preparation work, such as packing donation boxes or creating posters, before the weekend."
   },
   {
    "el": "Closing / Sign-off",
    "pats": [
     "I hope you understand and I am sorry for any inconvenience this causes.",
     "Please let me know how I can best contribute despite my absence.",
     "I am committed to the council's efforts and I hope to make up for this fully.",
     "Respectfully,"
    ],
    "html": "<b>I am truly committed to the council's efforts</b> and I sincerely hope to make up for this absence fully. Please let me know if my proposed plan is acceptable.",
    "signoff": "Respectfully,",
    "name": "Daryl Chua"
   }
  ]
 },
 {
  "id": "task-4",
  "n": 4,
  "en": "Making a Suggestion",
  "zh": "提出建議",
  "tone": "formal",
  "to": "the teacher in charge of clubs (CCA)",
  "links": [
   "suggest",
   "activity-ideas",
   "your-ideas-feedback"
  ],
  "prompt": "Your school does not have a club for AI content creation. Write a note to the teacher-in-charge of co-curricular activities (CCA) suggesting the formation of a new AI Content Creation Club.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear [Title] [Name],",
     "To the CCA Coordinator,",
     "Dear Ms./Mr. [Name],",
     "Dear Teacher-in-charge of CCAs,"
    ],
    "html": "Dear Ms. Phua,"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I am writing to propose the creation of a new club at our school.",
     "I would like to suggest starting a new CCA that I believe many students would benefit from.",
     "I am a student at [school] and I would like to formally propose the establishment of…",
     "I am writing to recommend the introduction of a new club focused on…"
    ],
    "html": "<b>I am writing to propose</b> the creation of a new club at our school — an AI Content Creation Club — which I believe would be extremely popular and beneficial for students in today's digital world."
   },
   {
    "el": "Details / Suggestion",
    "pats": [
     "The club would focus on… and allow students to…",
     "I envision a club where members could… using tools such as…",
     "Members would learn practical skills including…, which are highly valuable because…",
     "This club would give students the opportunity to… which is especially relevant because…"
    ],
    "html": "<b>The club would focus on</b> teaching students how to use AI tools responsibly to create content such as short videos, blog posts, social media graphics, and digital storytelling. <b>Members would learn practical skills</b> including prompt writing, image generation, video editing, and ethical AI use — skills that are increasingly in demand in universities and the workplace."
   },
   {
    "el": "Why It Matters",
    "pats": [
     "This is particularly relevant because many students are already using AI tools informally…",
     "A structured club would ensure students learn to use these tools responsibly and creatively.",
     "Given how rapidly AI is changing the world, equipping students with these skills is essential.",
     "I believe this club would attract a large number of interested students because…"
    ],
    "html": "<b>Given how rapidly AI is changing the world</b>, I believe it is important for our school to equip students with the knowledge to use these technologies creatively and responsibly, rather than leaving them to explore unsupervised."
   },
   {
    "el": "Closing / Sign-off",
    "pats": [
     "I hope you will consider my proposal seriously.",
     "I would be happy to help set up the club and find interested students.",
     "Please let me know if you would like to discuss this idea further.",
     "Yours sincerely,"
    ],
    "html": "<b>I would be happy to help</b> recruit founding members and draft a simple club constitution if that would be helpful. I hope you will consider this proposal and I look forward to your response.",
    "signoff": "Yours sincerely,",
    "name": "Rachel Yeo, Sec 3A"
   }
  ]
 },
 {
  "id": "task-5",
  "n": 5,
  "en": "Invitation",
  "zh": "邀請信",
  "tone": "informal",
  "to": "two close classmates",
  "links": [
   "invite",
   "ask-feedback"
  ],
  "prompt": "A classmate you are close to is transferring to a school in another country next month. You are planning a small farewell gathering for them. Write an invitation note to two other close classmates asking them to join.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear [Name] and [Name],",
     "Hi [Name] and [Name]!",
     "Hey both,",
     "Dear friends,"
    ],
    "html": "Hi Chloe and Ben!"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I am writing to invite you to…",
     "As you probably know, [Name] is leaving soon, so I am planning…",
     "I wanted to let you know that I am organizing a small farewell gathering for…",
     "I think we should do something special for [Name] before they leave, and I am planning…"
    ],
    "html": "<b>As you probably know</b>, Jamie is moving to Canada next month, and I really feel we should give her a proper send-off. <b>I am organizing</b> a small farewell gathering and I would love for you both to be there."
   },
   {
    "el": "Details",
    "pats": [
     "I am planning to… at [place] on [day], [date], from [time] to [time].",
     "It will be a casual / small / surprise gathering at…",
     "I thought we could… to make it extra special for [Name].",
     "There will be… and I was thinking we could also…"
    ],
    "html": "<b>I am planning to</b> host it at my place on Saturday, 31 May, from 4 p.m. to 7 p.m. It will be a relaxed afternoon with some food, games, and time to celebrate Jamie. <b>I thought we could</b> each prepare a short message or memory to share with her so she has something to take with her."
   },
   {
    "el": "Closing / Request",
    "pats": [
     "Please let me know if you can make it by…",
     "Do reply by [date] so I can plan the food and activities.",
     "I really hope you can both be there — it would mean a lot to Jamie.",
     "Let me know if you have any ideas to make it even more special!"
    ],
    "html": "<b>Please let me know if you can make it</b> by Wednesday so I can finalize the food and decorations. I really hope you can both come — it would mean so much to Jamie to have her closest friends there to say goodbye properly!"
   },
   {
    "el": "Sign-off",
    "pats": [
     "Your classmate,",
     "Can't wait to celebrate together,",
     "Warmly,",
     "See you there,"
    ],
    "html": "",
    "signoff": "Can't wait to celebrate together,",
    "name": "Sophia"
   }
  ]
 },
 {
  "id": "task-6",
  "n": 6,
  "en": "Making a Request",
  "zh": "提出請求",
  "tone": "formal",
  "to": "your English teacher",
  "links": [
   "request",
   "ask-info"
  ],
  "prompt": "You would like to join your school's Advanced Placement (AP) or Honors English class next semester. Write a note to your English teacher requesting to be considered for the class.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear [Title] [Name],",
     "Dear Ms./Mr. [Name],",
     "To [Title] [Name]:",
     "Dear [Name],"
    ],
    "html": "Dear Ms. Tan,"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I am writing to request consideration for…",
     "I would like to formally apply to join…",
     "I am writing to express my interest in enrolling in…",
     "I would like to ask if I may be considered for a place in…"
    ],
    "html": "<b>I am writing to formally express my interest</b> in being considered for the AP / Honors English class starting next semester. I believe I am ready for the additional challenge and would benefit greatly from the program."
   },
   {
    "el": "Self-Case / Evidence",
    "pats": [
     "I believe I am a strong candidate because…",
     "Over the past semester, I have… which I feel demonstrates my readiness.",
     "My recent grades in English have been…, and I am passionate about…",
     "In addition to my academic performance, I have also…"
    ],
    "html": "<b>I believe I am a strong candidate because</b> I have consistently scored above 85% in English assessments this year and genuinely enjoy challenging myself with analytical essays and literature. <b>In addition</b>, I have been an active member of the school's Reading Club and have completed several independent research essays beyond the regular curriculum."
   },
   {
    "el": "Commitment / Request",
    "pats": [
     "I am fully committed to the additional workload that this class requires.",
     "I understand that AP/Honors English demands more, and I am prepared to…",
     "I would be grateful if you could… so that I can…",
     "Could you please advise me on… or let me know if there is a formal process for…"
    ],
    "html": "<b>I am fully committed to the additional workload</b> this class requires and I am willing to put in extra effort both inside and outside the classroom. <b>Could you please advise me</b> on the application process or let me know if there is anything I can do to demonstrate my readiness, such as a writing sample or an interview?"
   },
   {
    "el": "Closing / Sign-off",
    "pats": [
     "Thank you for considering my request.",
     "I would be truly grateful for the opportunity.",
     "I look forward to hearing from you at your earliest convenience.",
     "Yours sincerely,"
    ],
    "html": "<b>Thank you sincerely for taking the time to consider my request.</b> I would be truly grateful for the opportunity and I look forward to your response.",
    "signoff": "Yours sincerely,",
    "name": "Nadia Binte Rashid"
   }
  ]
 },
 {
  "id": "task-7",
  "n": 7,
  "en": "Complaint",
  "zh": "抱怨／反映問題",
  "tone": "formal",
  "to": "the student council",
  "links": [
   "concern",
   "suggest",
   "opinion"
  ],
  "prompt": "You have noticed that many students in your school leave large amounts of uneaten food on their trays every day, which is causing serious food waste in the school canteen. Write a note to the school's student council raising this concern and suggesting what can be done.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear Student Council,",
     "Dear [Title] [Name],",
     "To the Student Council President,",
     "Dear Student Leaders,"
    ],
    "html": "Dear Student Council President,"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I am writing to raise a concern about a problem I have observed in our school canteen.",
     "I would like to bring to your attention a growing issue that I feel needs urgent action.",
     "As a concerned student, I am writing to report a problem that affects our school community.",
     "I am writing on behalf of several students who are troubled by…"
    ],
    "html": "<b>I am writing to bring to your attention</b> a growing problem I have observed in our school canteen: a significant amount of food is being wasted every day because students take more than they can eat and leave trays full of unfinished meals."
   },
   {
    "el": "Details / Evidence",
    "pats": [
     "On a daily basis, I have noticed that…",
     "For example, during lunch last week, I observed that…",
     "This is a serious problem because… and it also means that…",
     "The scale of this issue is significant: on most days,…"
    ],
    "html": "<b>On a daily basis</b>, I have observed students discarding full portions of rice, vegetables, and drinks without eating them. <b>This is a serious problem because</b> it not only wastes food that could feed others, but it also increases our school's environmental footprint and sends the wrong message about sustainability to our community."
   },
   {
    "el": "Suggestions",
    "pats": [
     "I would suggest that the student council consider…",
     "One possible solution would be to…",
     "It might also help to… in order to raise awareness about…",
     "I recommend implementing… as this has been effective in other schools."
    ],
    "html": "<b>I would suggest</b> that the student council introduce a 'Take What You Eat' campaign with posters in the canteen reminding students to order only what they can finish. <b>It might also help to</b> introduce a monthly food waste tracker displayed in the canteen so the whole school can see the impact of their choices and feel motivated to reduce waste."
   },
   {
    "el": "Closing / Sign-off",
    "pats": [
     "I hope the student council will take this issue seriously.",
     "I would be happy to help organize an awareness campaign if needed.",
     "Please feel free to contact me if you would like to discuss this further.",
     "Yours sincerely,"
    ],
    "html": "<b>I hope the student council will take this issue seriously</b>. I would be happy to assist with organizing any awareness initiatives. Thank you for your time and leadership.",
    "signoff": "Yours sincerely,",
    "name": "Kai Lim, Sec 3B"
   }
  ]
 },
 {
  "id": "task-8",
  "n": 8,
  "en": "Congratulations Note",
  "zh": "祝賀信",
  "tone": "informal",
  "to": "your best friend",
  "links": [
   "thanks",
   "before-end"
  ],
  "prompt": "Your best friend's school robotics and coding team just won first place in a nationwide competition. Write a congratulations note to your best friend.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear [Name],",
     "Hey [Name]!",
     "Hi [Name], I just heard the incredible news!",
     "Dear [Name], Congratulations!"
    ],
    "html": "Hey Zach!"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I just heard that your team won first place — congratulations!",
     "I am so thrilled to hear about your team's incredible achievement at…",
     "I wanted to be one of the first to congratulate you on winning…",
     "Oh my goodness — first place in the national competition! Congratulations!"
    ],
    "html": "<b>I am so thrilled to hear</b> that your robotics and coding team took first place in the National Schools Tech Challenge! I genuinely could not be prouder of you right now."
   },
   {
    "el": "Praise / Acknowledgement",
    "pats": [
     "This is such a well-deserved achievement because you have…",
     "I have seen how hard you and your team worked for this — all those late nights really paid off.",
     "You have always had an incredible talent for… and this proves it.",
     "What makes this even more impressive is that…"
    ],
    "html": "<b>This is such a well-deserved achievement</b>. I have watched you spend countless weekends debugging your code, rebuilding your robot, and pushing through every setback with such determination. <b>What makes this even more impressive</b> is that you competed against teams from schools across the entire country — and you won."
   },
   {
    "el": "Personal Message",
    "pats": [
     "I have always known you were destined for something like this because…",
     "You inspire me so much — seriously, watching you follow your passion makes me want to…",
     "I remember when you first started building robots in Sec 1, and now look at you!",
     "This is just the beginning — I cannot wait to see what you achieve next."
    ],
    "html": "<b>I remember when you first started building robots in Year 1</b> and thought it was the coolest thing I had ever seen. Now you are a national champion. <b>This is just the beginning</b> — I genuinely cannot wait to see what incredible things you build next."
   },
   {
    "el": "Closing / Sign-off",
    "pats": [
     "I am so proud to call you my best friend.",
     "Let's celebrate properly — the treat is on me!",
     "Please send my congratulations to the whole team as well.",
     "Your biggest fan,"
    ],
    "html": "<b>Please send my congratulations to the whole team</b> as well — they all deserve it. And you and I absolutely need to celebrate properly this weekend. Treat is on me!",
    "signoff": "Your biggest fan always,",
    "name": "Alex"
   }
  ]
 },
 {
  "id": "task-9",
  "n": 9,
  "en": "Reminder Note",
  "zh": "提醒通知",
  "tone": "semi",
  "to": "your classmates",
  "links": [
   "inform",
   "bring-items",
   "update"
  ],
  "prompt": "You are the class leader. Your class has an upcoming field trip next week. Write a reminder note to your classmates with the key itinerary details and a list of things they must prepare and bring.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear classmates,",
     "Hi everyone,",
     "To all 4A students,",
     "Hello Class 3C,"
    ],
    "html": "Hi everyone,"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "This is a reminder about our upcoming class field trip on…",
     "Just a quick note to remind everyone of the key details for next week's field trip.",
     "I wanted to send a reminder about the field trip to [destination] on [date].",
     "As class leader, I am writing to remind all of you about…"
    ],
    "html": "<b>As class leader</b>, I am writing to remind all of you about our upcoming field trip to the Science Centre this coming Thursday, 29 May. Please read through the details carefully."
   },
   {
    "el": "Itinerary / Details",
    "pats": [
     "Here is a summary of the day's schedule:…",
     "Please note the following key timings: we depart at… and return by…",
     "The field trip will run from… to… and we will visit…",
     "Our schedule for the day is as follows:…"
    ],
    "html": "<b>Here is the schedule for the day:</b> We will assemble at the school hall at 7:45 a.m. sharp. The bus departs at 8:15 a.m. and we arrive at approximately 9:00 a.m. The guided tour runs from 9:30 a.m. to 12:30 p.m., followed by a packed lunch break. We return to school by 3:00 p.m."
   },
   {
    "el": "Preparation / Reminders",
    "pats": [
     "Please remember to bring the following items:…",
     "All students must ensure they have… before the day of the trip.",
     "A few important reminders: please make sure you…",
     "Do not forget to… as this is compulsory / required for the trip."
    ],
    "html": "<b>Please remember to bring the following:</b> your signed parental consent form (must be handed to me by Wednesday), your student pass or ID, a bottle of water, a packed lunch or money for the canteen, a notebook for the workshop activity, and comfortable shoes. <b>Do not forget</b> that all phones must be on silent during the guided tour."
   },
   {
    "el": "Closing / Sign-off",
    "pats": [
     "If you have any questions, please come and see me before Thursday.",
     "Let's make this a great trip — see you all there!",
     "Please pass this message on to anyone who may have missed it.",
     "Class Leader,"
    ],
    "html": "<b>If you have any questions</b>, please come and see me or message me before Wednesday. Let's make this a great trip — see you all there!",
    "signoff": "Class Leader,",
    "name": "Nur Aisyah Binte Hassan"
   }
  ]
 },
 {
  "id": "task-10",
  "n": 10,
  "en": "Recommendation",
  "zh": "推薦信",
  "tone": "informal",
  "to": "a new transfer student",
  "links": [
   "suggest",
   "opinion",
   "offer-help"
  ],
  "prompt": "A new transfer student at your school asks for your recommendation for an elective course. You want to recommend either the Public Speaking & Presentation course or the Debate elective. Write a note giving your recommendation and reasons.",
  "els": [
   {
    "el": "Greeting",
    "pats": [
     "Dear [Name],",
     "Hi [Name], welcome to the school!",
     "Hey [Name]!",
     "Dear [Name], great to meet you!"
    ],
    "html": "Hi Ethan, welcome to the school!"
   },
   {
    "el": "Opening Purpose",
    "pats": [
     "I am writing to recommend an elective course that I think you would really benefit from.",
     "Since you asked for my advice on electives, I would strongly recommend…",
     "I wanted to share my personal recommendation for an elective that I think would be perfect for you.",
     "Based on your interests, I would highly recommend choosing…"
    ],
    "html": "<b>Since you asked for my advice</b> on elective courses, I would like to strongly recommend the Public Speaking and Presentation elective — it is honestly one of the best decisions I made at this school."
   },
   {
    "el": "Description / What to Expect",
    "pats": [
     "In this course, students learn how to… and develop skills in…",
     "The course involves… and you will have plenty of opportunities to…",
     "What I love most about this elective is that…",
     "Unlike many academic subjects, this course is very…"
    ],
    "html": "<b>In this course</b>, you learn how to structure and deliver persuasive speeches, present ideas confidently in front of an audience, and handle Q&amp;A sessions. <b>What I love most about this elective</b> is that every lesson is hands-on — you are on your feet and speaking from week one, which builds confidence faster than any other class I have taken."
   },
   {
    "el": "Why It Suits You / Benefits",
    "pats": [
     "I think this would be perfect for you because…",
     "This course is especially useful if you plan to… in the future.",
     "The skills you develop here will help you in… and beyond.",
     "I recommend this over… because… which is more relevant to…"
    ],
    "html": "<b>This course is especially useful</b> if you ever plan to pursue any field that involves communication — from business and law to science and education. <b>The skills you develop here</b> — clarity, confidence, and the ability to engage an audience — will benefit you in almost every subject and future career. I also recommend it over the Debate elective if you are newer to public speaking, as this course builds foundational confidence first."
   },
   {
    "el": "Closing / Sign-off",
    "pats": [
     "I hope this helps you make your decision!",
     "Feel free to ask me more about it — I am happy to tell you more.",
     "I think you would really enjoy it and I am sure you will do brilliantly.",
     "Your new classmate,"
    ],
    "html": "<b>Feel free to ask me more about it</b> anytime — I would be happy to share my experience. I genuinely think you will enjoy it and get a lot out of it. Good luck choosing!",
    "signoff": "Your new classmate,",
    "name": "Sally Huang"
   }
  ]
 }
];

/* Real-world email: an automatic booking confirmation. Names, numbers and addresses are replaced with placeholders. */
window.EMAIL_REAL = {
  id: "real-booking",
  title: "Real Email: A Theme Park Hotel Booking",
  zh: "真實郵件：主題樂園度假套裝行程確認信",
  from: "Online Reservations Desk <reservations@[resort].jp>",
  subject: "Important Information from Tokyo Disney Resort",
  date: "7 February",
  paras: [
    "Mr./Ms. [Your Name]\nReservation Number: [XXXXXXXXX]\nReservation Date: 27 November (Wed)",
    "Thank you for booking with the Tokyo Disney Resort Vacation Package.",
    "Please make sure to pick up your Vacation Package Kit before entering the park. A Vacation Package Kit includes park tickets, Attraction Tickets, and other offerings that can be used during your stay. You can pick up your kit one day before your check-in date after 3:00 p.m. at the counter of the hotel you booked on your Tokyo Disney Resort Vacation Package.",
    "When picking up your Vacation Package Kit, please present this email copy or your final itinerary for your Tokyo Disney Resort Vacation Package, as well as the passport belonging to the representative member for the reservation.",
    "Details of Your Tokyo Disney Resort Vacation Package Booking\nPlan Name: Fantasy Springs: Enjoy Attractions — 2 DAYS\nDate: 12 February (Wed)\nNumber of Persons in Party: Adult 2 Person(s)\nPayment Method: Credit card",
    "We are looking forward to seeing you at Tokyo Disney Resort, Where Dreams Come True.",
    "Contact Us: Online Reservations / Purchasing Support Desk\nNote: This is an automatic email message. Please do not respond to this email."
  ],
  notice: [
    ["Thank you for booking with…", "感謝您透過……訂購", "Opening: thank the customer first. 先感謝顧客。"],
    ["Please make sure to V…", "請務必……", "A polite but firm instruction. 禮貌但明確的指示。"],
    ["You can V… one day before… after 3:00 p.m.", "您可以在……前一天下午三點後……", "Giving information: time + place. 告知資訊：時間＋地點。"],
    ["When V-ing…, please present…", "……時，請出示……", "Instruction with a time clause. 用時間子句給指示。"],
    ["…, as well as…", "……以及……", "Adds one more required item. 再加上一項。"],
    ["We are looking forward to seeing you at…", "我們期待在……見到您", "Before the end: look forward to an event. 結尾前：期待見面。"],
    ["Please do not respond to this email.", "請勿回覆此郵件", "Automatic emails: use the Contact Us desk instead. 自動郵件不能回覆。"]
  ],
  quiz: [
    { q: "What is the main purpose of this email?", zh: "這封信的主要目的是什麼？",
      opts: ["To sell a new ticket to the customer", "To give important information about picking up the package kit", "To cancel the customer’s booking", "To ask the customer to pay again"], a: 1,
      why: "The email gives information (Giving Information 告知資訊): how, when and where to pick up the Vacation Package Kit." },
    { q: "What is inside the Vacation Package Kit?", zh: "套裝組合裡面有什麼？",
      opts: ["Park tickets, Attraction Tickets and other offerings", "Only a hotel room key", "A passport and a credit card", "Free meals for two days"], a: 0,
      why: "“A Vacation Package Kit includes park tickets, Attraction Tickets, and other offerings…”" },
    { q: "When is the EARLIEST time you can pick up the kit?", zh: "最早什麼時候可以領取？",
      opts: ["On the check-in day at 9:00 a.m.", "Two days before check-in", "One day before the check-in date, after 3:00 p.m.", "Right after entering the park"], a: 2,
      why: "“You can pick up your kit one day before your check-in date after 3:00 p.m.”" },
    { q: "Where do you pick up the kit?", zh: "在哪裡領取？",
      opts: ["At the park entrance", "At the airport", "At the counter of the hotel you booked", "At the Online Support Desk"], a: 2,
      why: "“…at the counter of the hotel you booked on your Vacation Package.”" },
    { q: "What must you show when you pick up the kit?", zh: "領取時要出示什麼？",
      opts: ["Only your credit card", "This email or the final itinerary, plus the passport of the representative member", "Your school ID", "Nothing — just say your name"], a: 1,
      why: "“…please present this email copy or your final itinerary…, as well as the passport belonging to the representative member.”" },
    { q: "How many people are in the party?", zh: "這次訂購幾位？",
      opts: ["One adult", "Two adults", "Two adults and one child", "Four people"], a: 1,
      why: "“Number of Persons in Party: Adult 2 Person(s)”" },
    { q: "You have a question about the booking. What should you do?", zh: "如果對訂單有疑問，應該怎麼做？",
      opts: ["Reply to this email", "Contact the Online Reservations / Purchasing Support Desk", "Write to the hotel counter by post", "Ask at the park entrance"], a: 1,
      why: "“This is an automatic email message. Please do not respond to this email.” Use the Contact Us desk." },
    { q: "Which sentence is the polite “before the end” line?", zh: "哪一句是結尾前的禮貌句？",
      opts: ["Please make sure to pick up your kit.", "Payment Method: Credit card", "We are looking forward to seeing you at Tokyo Disney Resort.", "Reservation Date: 27 November"], a: 2,
      why: "“We are looking forward to seeing you…” = You look forward to an upcoming event. 期待見面。" }
  ],
  task: {
    en: "Write to the Support Desk", zh: "寫信給客服：詢問領取時間", tone: "formal", to: "the Online Support Desk",
    prompt: "You have booked this package. Your flight arrives in Tokyo late, so you will reach the hotel at about 10:00 p.m. on the day before check-in. Write an email to the Support Desk.\n• Say who you are and give your reservation number.\n• Explain your problem.\n• Ask if you can still pick up the kit that night, or the next morning.\n• Ask what you need to bring.",
    pats: ["I am writing to inquire about…", "My reservation number is…", "Unfortunately, my flight… so I will not arrive until…", "Could you please confirm whether…?", "I would also like to know…", "Thank you in advance for your help.", "I look forward to hearing from you.", "Yours faithfully, / Best regards,"],
    model: "Dear Sir or Madam,\n\nI am writing to inquire about picking up my Vacation Package Kit. My reservation number is 123456789, and my check-in date is 12 February.\n\nUnfortunately, my flight lands late on 11 February, so I will not arrive at the hotel until about 10:00 p.m. Could you please confirm whether the hotel counter will still be open at that time? If not, may I pick up the kit on the morning of 12 February before we enter the park?\n\nI would also like to know if I need to bring anything apart from this email and my passport.\n\nThank you in advance for your help. I look forward to hearing from you.\n\nYours faithfully,\n[Your Name]"
  }
};
