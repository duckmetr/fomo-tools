import { Bot } from 'grammy'
import { buildLocalizedHappyHourMessage } from '../services'

import type { Context } from '../types/context.type'

export function hourCommand(bot: Bot<Context>) {
  bot.command('hour', async (ctx) => {
    try {
      await ctx.reply(await buildLocalizedHappyHourMessage(ctx.from?.language_code), {
        parse_mode: 'HTML'
      })
    } catch (error) {
      console.log('error: /hour command')
    }
  })
}
