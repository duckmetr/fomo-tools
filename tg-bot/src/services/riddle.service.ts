import { getPrismaClient } from './prisma.service'
import { fluent } from '../locales'

type SupportedLocale = 'en' | 'uk'

const KYIV_TIMEZONE = 'Europe/Kyiv'

function formatDateInKyiv(date: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: KYIV_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

export function isTodayInKyiv(date: Date) {
  return formatDateInKyiv(date) === formatDateInKyiv(new Date())
}

export function resolveLocale(languageCode?: string | null): SupportedLocale {
  if (!languageCode) {
    return 'en'
  }

  return languageCode.toLowerCase().startsWith('uk') ? 'uk' : 'en'
}

export function buildDailyRiddleMessage(locale: SupportedLocale, answerText: string) {
  return fluent.translate(locale, 'daily-riddle-broadcast', {
    answerText
  })
}

export async function getTodayAnswerText() {
  const prisma = getPrismaClient()

  if (!prisma) {
    return null
  }

  const recentAnswers = await prisma.answer.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 50,
    select: {
      answerText: true,
      createdAt: true
    }
  })

  const todayAnswer = recentAnswers.find((answer) => isTodayInKyiv(answer.createdAt))
  return todayAnswer?.answerText ?? null
}
