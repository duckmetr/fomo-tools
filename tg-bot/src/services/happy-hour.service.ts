import { fluent } from '../locales'
import { getHappyHourSettingStart } from './happy-hour-setting.service'
import { resolveLocale } from './riddle.service'

const UTC_PLUS_2_OFFSET_MS = 2 * 60 * 60 * 1000
const HAPPY_HOUR_START_HOUR = 23
const HAPPY_HOUR_START_MINUTE = 23
const HAPPY_HOUR_DURATION_MS = 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

function toUtcPlus2(date: Date) {
  return new Date(date.getTime() + UTC_PLUS_2_OFFSET_MS)
}

function formatDate(date: Date) {
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}.${month}.${year}`
}

function formatTime(date: Date) {
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatDurationUntil(ms: number) {
  const totalMinutes = Math.max(0, Math.floor(ms / 60000))

  if (totalMinutes < 60) {
    return `${totalMinutes} min`
  }

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`
}

export async function buildLocalizedHappyHourMessage(languageCode?: string | null, now = new Date()) {
  const locale = resolveLocale(languageCode)
  const nowUtcPlus2 = toUtcPlus2(now)
  const manualStartAt = await getHappyHourSettingStart()
  const manualStart = manualStartAt ? toUtcPlus2(manualStartAt) : null

  const defaultStartToday = new Date(
    Date.UTC(
      nowUtcPlus2.getUTCFullYear(),
      nowUtcPlus2.getUTCMonth(),
      nowUtcPlus2.getUTCDate(),
      HAPPY_HOUR_START_HOUR,
      HAPPY_HOUR_START_MINUTE
    )
  )

  const startToday =
    manualStart && nowUtcPlus2 < new Date(manualStart.getTime() + HAPPY_HOUR_DURATION_MS)
      ? manualStart
      : defaultStartToday

  const endToday = new Date(startToday.getTime() + HAPPY_HOUR_DURATION_MS)
  const isActive = nowUtcPlus2 >= startToday && nowUtcPlus2 < endToday
  const nextStart = isActive
    ? new Date(startToday.getTime() + DAY_MS)
    : nowUtcPlus2 < startToday
      ? startToday
      : new Date(startToday.getTime() + DAY_MS)
  const nextEnd = new Date(nextStart.getTime() + HAPPY_HOUR_DURATION_MS)

  if (isActive) {
    return fluent.translate(locale, 'happy-hour', {
      status: 'active',
      activeStart: formatTime(startToday),
      activeEnd: formatTime(endToday),
      remaining: formatDurationUntil(endToday.getTime() - nowUtcPlus2.getTime()),
      nextDate: formatDate(nextStart),
      nextStart: formatTime(nextStart),
      nextEnd: formatTime(nextEnd),
      nextStartsIn: formatDurationUntil(nextStart.getTime() - nowUtcPlus2.getTime())
    })
  }

  return fluent.translate(locale, 'happy-hour', {
    status: 'upcoming',
    nextDate: formatDate(nextStart),
    nextStart: formatTime(nextStart),
    nextEnd: formatTime(nextEnd),
    nextStartsIn: formatDurationUntil(nextStart.getTime() - nowUtcPlus2.getTime())
  })
}
