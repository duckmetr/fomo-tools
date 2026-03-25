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
   Available commands:
   /start
   /help


daily-riddle-broadcast =
   ❔ RIDDLE OF THE DAY

   Answer: <code>{ $answerText }</code>

   💡 <i>Click on the answer to copy</i>
   🙂 <i>Don't forget to enter in the game!</i>

   ⚙️ Settings: /settings


happy-hour-upcoming =
   ⏰ HAPPY HOUR

   <i>When buying Gems during happy hours, you can get a random bonus of up to 1000%. Minimum bonus 10%</i>

   Next happy hour:

   <blockquote>{ $date }, { $startTime } - { $endTime }
   Starts in: { $startsIn }</blockquote>

   Timezone UTC+2

happy-hour-active =
   ⏰ HAPPY HOUR

   <i>When buying Gems during happy hours, you can get a random bonus of up to 1000%. Minimum bonus 10%</i>

   🔥 NOW ACTIVE

   <blockquote>{ $activeStart } - { $activeEnd }
   Remaining: { $remaining }</blockquote>

   Next happy hour:

   <blockquote>{ $nextDate } { $nextStart } - { $nextEnd }
   It will start in: { $nextStartsIn }</blockquote>

   Timezone UTC+2


## buttons

riddle-btn = Daily Riddle
hour-btn = Happy Hour
settings-btn = Settings

back-btn = ‹ Back
home-btn = « Home
