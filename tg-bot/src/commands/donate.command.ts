import { Bot } from 'grammy'
import { env } from '../config'
import { resolveLocale } from '../services'

import type { Context } from '../types/context.type'

export function donateCommand(bot: Bot<Context>) {
  bot.command('donate', async (ctx) => {
    try {
      const wallet = env.DONATE_TON_WALLET?.trim()

      if (!wallet) {
        const locale = resolveLocale(ctx.from?.language_code)
        const text = locale === 'uk' ? 'Гаманець для донату не налаштований.' : 'Donate wallet is not configured.'
        await ctx.reply(text)
        return
      }

      await ctx.reply(ctx.t('donate', { wallet }), {
        parse_mode: 'HTML'
      })
    } catch (error) {
      console.log('error: /donate command')
    }
  })
}
