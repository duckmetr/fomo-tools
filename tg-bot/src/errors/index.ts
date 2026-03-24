import { Bot } from 'grammy'
import { errorHandler } from './error.handler'

import type { Context } from '../types/context.type'

function errors(bot: Bot<Context>) {
  const list = [errorHandler]

  for (const error of list) {
    error(bot)
  }
}

export default errors
