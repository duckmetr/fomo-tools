import { Bot } from 'grammy'

import type { Context } from '../types/context.type'

export function helpCommand(bot: Bot<Context>) {
  bot.command('help', async (ctx) => {
    try {
      await ctx.reply(ctx.t('help-text'), {
        parse_mode: 'HTML'
      })
    } catch (error) {
      console.log(`error: /help command`)
    }
  })
}
