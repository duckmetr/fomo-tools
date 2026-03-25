### uk = uk-UA

## texts

greeting =
   👋 Привіт! Я бот для гри <a href="{ $refLink }">Fomo Fighters</a>

   📋 Доступні команди:
   <blockquote>/riddle - відповідь на загадку дня
   /hour   - інформація про щасливу годину
   /donate - підтримати проєкт</blockquote>

   📢 Канал: @hamster_tools


help-text =
   Доступні команди:
   /start
   /help


daily-riddle-broadcast =
   ❔ ЩОДЕННА ЗАГАДКА

   Відповідь: <code>{ $answerText }</code>

   💡 <i>Натисни на відповідь, щоб скопіювати</i>
   🙂 <i>Не забудь ввести її в грі!</i>

   ⚙️ Налаштування: /settings


happy-hour-upcoming =
   ⏰ ЩАСЛИВА ГОДИНА

   <i>Під час купівлі Gems у щасливі години ти можеш отримати випадковий бонус до 1000%. Мінімальний бонус 10%</i>

   Наступна щаслива година:

   <blockquote>{ $date }, { $startTime }-{ $endTime }
   Почнеться через: { $startsIn }</blockquote>

   Часовий пояс UTC+2

happy-hour-active =
   ⏰ ЩАСЛИВА ГОДИНА

   <i>Під час купівлі Gems у щасливі години ти можеш отримати випадковий бонус до 1000%. Мінімальний бонус 10%</i>

   🔥 АКТИВНО ЗАРАЗ 🔥

   <blockquote>{ $activeStart } - { $activeEnd }
   Залишилось: { $remaining }</blockquote>

   Наступна щаслива година:

   <blockquote>{ $nextDate } { $nextStart } - { $nextEnd }
   Почнеться через: { $nextStartsIn }</blockquote>

   Часовий пояс UTC+2


## buttons

riddle-btn = Щоденна Загадка
hour-btn = Щаслива Година
settings-btn = Налаштування

back-btn = ‹ Назад
home-btn = « Головна
