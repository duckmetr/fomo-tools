import { Bot } from 'grammy'
import { i18n } from '../locales'

import type { Context } from '../types/context.type'

function middlewares(bot: Bot<Context>) {
  const list = [i18n]

  for (const middleware of list) {
    bot.use(middleware)
  }
}

export default middlewares
