import { Middleware } from 'grammy'

import type { Context } from '@/types/context.ts'

export const logger: Middleware<Context> = async (ctx, next) => {
  console.log('update:', ctx.update.update_id)
  await next()
}
