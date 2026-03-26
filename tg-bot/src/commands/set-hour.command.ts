import { Bot } from 'grammy'
import { env } from '../config'
import { resolveLocale, setHappyHourSettingStart } from '../services'

import type { Context } from '../types/context.type'

const UTC_PLUS_2_OFFSET_MS = 2 * 60 * 60 * 1000
const INPUT_REGEX = /^(\d{2})\.(\d{2})\.(\d{4})\s+(\d{2}):(\d{2})$/

function buildText(locale: 'en' | 'uk', key: 'forbidden' | 'usage' | 'invalid' | 'saved') {
  const dictionary = {
    en: {
      forbidden: 'Access denied.',
      usage: 'Usage: <code>/sethour DD.MM.YYYY HH:mm</code>\nExample: <code>/sethour 27.03.2026 21:15</code>',
      invalid: 'Invalid date/time. Use format: <code>DD.MM.YYYY HH:mm</code>',
      saved: 'Saved. Happy Hour starts at <code>{date} {time}</code> (UTC+2).'
    },
    uk: {
      forbidden: 'Немає доступу.',
      usage: 'Формат: <code>/sethour DD.MM.YYYY HH:mm</code>\nПриклад: <code>/sethour 27.03.2026 21:15</code>',
      invalid: 'Некоректна дата/час. Використай формат: <code>DD.MM.YYYY HH:mm</code>',
      saved: 'Збережено. Щаслива година починається о <code>{date} {time}</code> (UTC+2).'
    }
  } as const

  return dictionary[locale][key]
}

function parseUtcPlus2InputToUtc(raw: string) {
  const match = raw.trim().match(INPUT_REGEX)

  if (!match) {
    return null
  }

  const [, dayText, monthText, yearText, hourText, minuteText] = match
  const day = Number(dayText)
  const month = Number(monthText)
  const year = Number(yearText)
  const hour = Number(hourText)
  const minute = Number(minuteText)

  const utcTime = Date.UTC(year, month - 1, day, hour, minute) - UTC_PLUS_2_OFFSET_MS
  const parsed = new Date(utcTime)
  const parsedUtcPlus2 = new Date(parsed.getTime() + UTC_PLUS_2_OFFSET_MS)

  const isValid =
    parsedUtcPlus2.getUTCFullYear() === year &&
    parsedUtcPlus2.getUTCMonth() === month - 1 &&
    parsedUtcPlus2.getUTCDate() === day &&
    parsedUtcPlus2.getUTCHours() === hour &&
    parsedUtcPlus2.getUTCMinutes() === minute

  if (!isValid) {
    return null
  }

  return parsed
}

export function setHourCommand(bot: Bot<Context>) {
  bot.command('sethour', async (ctx) => {
    try {
      const locale = resolveLocale(ctx.from?.language_code)
      const adminId = env.ADMIN_ID?.trim()
      const fromId = ctx.from?.id?.toString()

      if (!adminId || !fromId || fromId !== adminId) {
        await ctx.reply(buildText(locale, 'forbidden'), { parse_mode: 'HTML' })
        return
      }

      const rawArgs = (ctx.match ?? '').toString().trim()

      if (!rawArgs) {
        await ctx.reply(buildText(locale, 'usage'), { parse_mode: 'HTML' })
        return
      }

      const startAt = parseUtcPlus2InputToUtc(rawArgs)

      if (!startAt) {
        await ctx.reply(buildText(locale, 'invalid'), { parse_mode: 'HTML' })
        return
      }

      const saved = await setHappyHourSettingStart(startAt, BigInt(fromId))

      if (!saved) {
        await ctx.reply('Database unavailable.')
        return
      }

      const [date, time] = rawArgs.split(/\s+/)
      await ctx.reply(buildText(locale, 'saved').replace('{date}', date).replace('{time}', time), {
        parse_mode: 'HTML'
      })
    } catch (error) {
      console.log('error: /sethour command')
    }
  })
}
