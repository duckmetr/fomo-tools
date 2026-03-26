import { Bot } from 'grammy'
import { buildDailyRiddleMessage, getTodayAnswerText, resolveLocale } from '../services'

import type { Context } from '../types/context.type'

export function riddleCommand(bot: Bot<Context>) {
  bot.command('riddle', async (ctx) => {
    try {
      const answerText = await getTodayAnswerText()

      if (!answerText) {
        return
      }

      const locale = resolveLocale(ctx.from?.language_code)

      await ctx.reply(buildDailyRiddleMessage(locale, answerText), {
        parse_mode: 'HTML'
      })
    } catch (error) {
      console.log('error: /riddle command')
    }
  })
}
