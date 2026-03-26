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
   📋 Доступні команди:
   /start
   /help
   /settings
   /riddle
   /hour
   /donate


daily-riddle-broadcast =
   ❔ ЩОДЕННА ЗАГАДКА

   Відповідь: <code>{ $answerText }</code>

   💡 <i>Натисни на відповідь, щоб скопіювати</i>
   🙂 <i>Не забудь ввести її в грі</i>


happy-hour =
   ⏰ ЩАСЛИВА ГОДИНА
   { $status ->
      [active]
         🔥 АКТИВНО ЗАРАЗ
         <blockquote>{ $activeStart }-{ $activeEnd }
         Залишилось: { $remaining }</blockquote>
      *[upcoming] { "" }
   }
   🗓 Наступна щаслива година:
   <blockquote>{ $nextDate } • { $nextStart }-{ $nextEnd }
   Почнеться через: { $nextStartsIn }</blockquote>

   💡 <i>Під час купівлі Gems у щасливі години ти можеш отримати випадковий бонус до 1000%. Мінімальний бонус 10%</i>


settings =
   ⚙️ Налаштування

   😎 <i>Повний Чіл</i>


donate =
   🎁 ПІДТРИМАТИ ПРОЄКТ

   <i>Дякуємо за ваш інтерес до нашого проєкту</i>

   💎 Задонатити на гаманець TON:
   <code>{ $wallet }</code>


## buttons

riddle-btn = Щоденна Загадка
hour-btn = Щаслива Година
settings-btn = Налаштування

back-btn = ‹ Назад
home-btn = « Головна
