import { Bot } from 'grammy'
import { messageHandler } from './message.handler'
import { channelPostHandler } from './channel-post.handler'
import { errorHandler } from '../errors/error.handler'

import type { Context } from '../types/context.type'

function commands(bot: Bot<Context>) {
  const list = [messageHandler, channelPostHandler, errorHandler]

  for (const handler of list) {
    handler(bot)
  }
}

export default commands
