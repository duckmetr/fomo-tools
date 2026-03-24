import { Bot } from 'grammy'
import { startCommand } from './start.command'
import { helpCommand } from './help.command'

import type { Context } from '../types/context.type'

function commands(bot: Bot<Context>) {
  const list = [startCommand, helpCommand]

  for (const command of list) {
    command(bot)
  }
}

export default commands
