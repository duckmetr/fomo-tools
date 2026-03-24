import { Bot } from 'grammy'

import type { Context } from '../types/context.type'

export function messageHandler(bot: Bot<Context>) {
  bot.on('message:text', async (ctx) => {
    try {
      await ctx.reply('Echo: ' + ctx.message.text)
    } catch (error) {
      console.log(`error: /help handler`)
    }
  })
}
