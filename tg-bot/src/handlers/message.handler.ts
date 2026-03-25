import { Bot } from 'grammy'
import { buildDailyRiddleMessage, buildLocalizedHappyHourMessage, getTodayAnswerText, resolveLocale } from '../services'

import type { Context } from '../types/context.type'

export function messageHandler(bot: Bot<Context>) {
  bot.on('message:text', async (ctx) => {
    try {
      const messageText = ctx.message.text.trim()
      const riddleButtonText = ctx.t('riddle-btn')
      const hourButtonText = ctx.t('hour-btn')

      if (messageText === hourButtonText) {
        await ctx.reply(buildLocalizedHappyHourMessage(ctx.from?.language_code), {
          parse_mode: 'HTML'
        })
        return
      }

      if (messageText !== riddleButtonText) {
        return
      }

      const todayAnswerText = await getTodayAnswerText()

      if (!todayAnswerText) {
        return
      }

      const locale = resolveLocale(ctx.from?.language_code)

      await ctx.reply(buildDailyRiddleMessage(locale, todayAnswerText), {
        parse_mode: 'HTML'
      })
    } catch (error) {
      console.log('error: message handler')
    }
  })
}
