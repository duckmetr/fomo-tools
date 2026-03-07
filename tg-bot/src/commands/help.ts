import { Bot } from 'grammy'

import type { Context } from '@/types/context.ts'

export function helpCommand(bot: Bot<Context>) {
  bot.command('help', (ctx) => {
    ctx.reply('Available commands:\n/start\n/help')
  })
}
