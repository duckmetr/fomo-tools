import { Bot } from 'grammy'
import { FOMO_FIGHTERS_REF } from '../config/vars'
import { mainKeyboard } from '../keyboards'

import type { Context } from '../types/context.type'

export function startCommand(bot: Bot<Context>) {
  bot.command('start', async (ctx) => {
    try {
      await ctx.reply(ctx.t('greeting', { refLink: FOMO_FIGHTERS_REF }), {
        reply_markup: mainKeyboard.main(ctx),
        parse_mode: 'HTML'
      })
    } catch (error) {
      console.log(`error: /start command`)
    }
  })
}
