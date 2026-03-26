import { Bot } from 'grammy'
import { startCommand } from './start.command'
import { helpCommand } from './help.command'
import { setHourCommand } from './set-hour.command'
import { riddleCommand } from './riddle.command'
import { hourCommand } from './hour.command'
import { donateCommand } from './donate.command'

import type { Context } from '../types/context.type'

function commands(bot: Bot<Context>) {
  const list = [startCommand, helpCommand, setHourCommand, riddleCommand, hourCommand, donateCommand]

  for (const command of list) {
    command(bot)
  }
}

export default commands
