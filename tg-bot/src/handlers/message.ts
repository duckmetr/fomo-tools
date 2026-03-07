import { Bot } from 'grammy'

import type { Context } from '@/types/context.ts'

export function messageHandler(bot: Bot<Context>) {
  bot.on('message:text', (ctx) => {
    ctx.reply('Echo: ' + ctx.message.text)
  })
}
