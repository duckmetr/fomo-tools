import { Bot } from 'grammy'

import type { Context } from '@/types/context.ts'

export function startCommand(bot: Bot<Context>) {
  bot.command('start', (ctx) => {
    ctx.reply('🚀 Bot started!')
  })
}
