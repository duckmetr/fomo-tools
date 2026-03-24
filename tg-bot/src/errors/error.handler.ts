import { Bot, GrammyError, HttpError } from 'grammy'

import type { Context } from '../types/context.type'

export function errorHandler(bot: Bot<Context>) {
  bot.catch(({ ctx, error }) => {
    console.error(`[bot] Error while handling update ${ctx.update.update_id}`)

    if (error instanceof GrammyError) {
      console.error('GrammyError:', error.description)
    } else if (error instanceof HttpError) {
      console.error('HttpError:', error)
    } else {
      console.error('UnknownError:', error)
    }
  })
}
