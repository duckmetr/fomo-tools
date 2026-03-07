import { InlineKeyboard } from 'grammy'

export function mainKeyboard() {
  return new InlineKeyboard().text('🎮 Play', 'play').row().text('📊 Stats', 'stats')
}
