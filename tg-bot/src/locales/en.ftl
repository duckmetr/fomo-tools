### en = en-US

## texts

greeting =
   👋 Hi! I'm a bot for the game <a href="{ $refLink }">Fomo Fighters</a>

   📋 Available commands:
   <blockquote>/riddle - answer to the daily riddle
   /hour   - happy hour information
   /donate - support the project</blockquote>

   📢 Channel: @hamster_tools


help-text =
   📋 Available commands:
   /start
   /help
   /settings
   /riddle
   /hour
   /donate


daily-riddle-broadcast =
   ❔ RIDDLE OF THE DAY

   Answer: <code>{ $answerText }</code>

   💡 <i>Click on the answer to copy</i>
   🙂 <i>Don't forget to enter in the game</i>


happy-hour =
   ⏰ HAPPY HOUR
   { $status ->
      [active]
         🔥 ACTIVE NOW
         <blockquote>{ $activeStart }-{ $activeEnd }
         Remaining: { $remaining }</blockquote>
      *[upcoming] { "" }
   }
   🗓 Next happy hour:
   <blockquote>{ $nextDate } • { $nextStart }-{ $nextEnd }
   It will start in: { $nextStartsIn }</blockquote>

   💡 <i>When buying Gems during happy hours, you can get a random bonus of up to 1000%. Minimum bonus 10%</i>


settings =
   ⚙️ Settings

   😎 <i>Keep Calm</i>


donate =
   🎁 SUPPORT THE PROJECT

   <i>Thank you for your interest in our project</i>

   💎 Donate to the TON wallet:
   <code>{ $wallet }</code>


## buttons

riddle-btn = Daily Riddle
hour-btn = Happy Hour
settings-btn = Settings

back-btn = ‹ Back
home-btn = « Home
