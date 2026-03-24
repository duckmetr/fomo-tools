import type { Context as GrammyContext } from 'grammy'
import type { FluentContextFlavor } from '@grammyjs/fluent'
import type { TranslationKeys } from './i18n.type'

type CustomFluent = {
  t: (key: TranslationKeys, ...args: any[]) => string
}

type LoggerContext = {
  startTime: number
}

export type Context = GrammyContext & FluentContextFlavor & CustomFluent & LoggerContext
