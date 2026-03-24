import { Bot } from 'grammy'
import { env } from './config'
import middlewares from './middlewares'
import commands from './commands'
import handlers from './handlers'
import errors from './errors'

import type { Context } from './types'

const bot = new Bot<Context>(env.BOT_TOKEN)

middlewares(bot)
commands(bot)
handlers(bot)
errors(bot)

export default bot
