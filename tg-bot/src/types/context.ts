import type { Context as GrammyContext } from 'grammy'

export type Context = GrammyContext & {
  startTime: number
}
