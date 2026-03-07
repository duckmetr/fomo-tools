import { Bot, GrammyError, HttpError } from 'grammy'
import { run } from '@grammyjs/runner'
import { env } from '@/config/env.ts'
import { logger } from '@/middlewares/logger.ts'
import { startCommand } from '@/commands/start.ts'
import { helpCommand } from '@/commands/help.ts'
import { messageHandler } from '@/handlers/message.ts'

import type { Context } from '@/types/context.ts'

const bot = new Bot<Context>(env.BOT_TOKEN)

bot.use(logger)

startCommand(bot)
helpCommand(bot)

messageHandler(bot)

bot.catch(({ ctx, error }) => {
  console.error(`[bot] [GlobalError] Error while handling update ${ctx.update.update_id}:`)
  if (error instanceof GrammyError) {
    console.error('[bot] [GrammyError] Error in request:', error.description)
  } else if (error instanceof HttpError) {
    console.error('[bot] [HttpError] Could not contact Telegram:', error)
  } else {
    console.error('[bot] [UnknownError] Unknown error:', error)
  }
})

run(bot)

console.log('🤖 Bot started')
