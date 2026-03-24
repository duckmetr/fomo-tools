import { Middleware } from 'grammy'

import type { Context } from '../types/context.type'

export const logger: Middleware<Context> = async (ctx, next) => {
  console.log('UPDATE:', ctx.update)
  await next()
}

// bot.use(async (ctx, next) => {
//   console.log('UPDATE:', ctx.update)
//   await next()
// })
