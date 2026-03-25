import { Fluent } from '@moebius/fluent'
import { useFluent } from '@grammyjs/fluent'
import { PREMIUM_EMOJI } from '../config/vars'
import { useCustomEmoji } from '../utils/emoji'

let en: string
let uk: string

try {
  en = (await import('./en.ftl')).default
  uk = (await import('./uk.ftl')).default
} catch {
  const fs = await import('node:fs')
  en = fs.readFileSync('./src/locales/en.ftl', 'utf8')
  uk = fs.readFileSync('./src/locales/uk.ftl', 'utf8')
}

const bundleOptions = {
  useIsolating: false,
  transform: useCustomEmoji(PREMIUM_EMOJI)
}

const fluent = new Fluent()

await fluent.addTranslation({
  locales: 'en',
  source: en,
  bundleOptions
})

await fluent.addTranslation({
  locales: 'uk',
  source: uk,
  bundleOptions
})

const i18n = useFluent({
  fluent,
  defaultLocale: 'en'
})

export { i18n, fluent }
