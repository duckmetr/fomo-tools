import { Keyboard } from 'grammy'
import { PREMIUM_EMOJI } from '../config/emoji'

import type { Context } from '../types/context.type'

const mainKeyboard = {
  main: (ctx: Context) =>
    new Keyboard()
      .text(ctx.t('riddle-btn'))
      .icon(PREMIUM_EMOJI['❔'])
      .text(ctx.t('hour-btn'))
      .icon(PREMIUM_EMOJI['⏰'])
      .row()
      .text(ctx.t('settings-btn'))
      .icon(PREMIUM_EMOJI['⚙️'])
      .resized()
}

export default mainKeyboard
