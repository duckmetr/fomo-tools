import { getPrismaClient } from './prisma.service'
import { buildDailyRiddleMessage, isTodayInKyiv, resolveLocale } from './riddle.service'

import type { Context } from '../types/context.type'

type AnswerPayload = {
  id: number
  answerText: string
  createdAt: Date
}

export async function broadcastRiddleOfTheDay(ctx: Context, answer: AnswerPayload) {
  if (!isTodayInKyiv(answer.createdAt)) {
    return
  }

  const prisma = getPrismaClient()

  if (!prisma) {
    return
  }

  const users = await prisma.user.findMany({
    select: {
      telegramId: true,
      languageCode: true
    }
  })

  for (const user of users) {
    try {
      const locale = resolveLocale(user.languageCode)
      const message = buildDailyRiddleMessage(locale, answer.answerText)

      await ctx.api.sendMessage(user.telegramId.toString(), message, {
        parse_mode: 'HTML'
      })
    } catch (error) {
      console.log(`error: broadcast riddle to user ${user.telegramId}`)
    }
  }
}
