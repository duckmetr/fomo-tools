import { InlineKeyboard } from 'grammy'
import { FOMO_FIGHTERS_REF } from '../config/vars'

import type { Context } from '../types/context.type'

const inlineKeyboard = {
  start: () => new InlineKeyboard().webApp('⚔️ PLAY ⚔️', FOMO_FIGHTERS_REF),
  back: (ctx: Context) => new InlineKeyboard().text(ctx.t('back-btn'))
}

export default inlineKeyboard
