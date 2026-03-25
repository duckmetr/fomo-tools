import type { Context } from '../types/context.type'
import { getPrismaClient } from './prisma.service'

export async function saveUser(ctx: Context) {
  const prisma = getPrismaClient()
  const user = ctx.from

  if (!prisma || !user) {
    return
  }

  await prisma.user.upsert({
    where: {
      telegramId: BigInt(user.id)
    },
    update: {
      username: user.username ?? null,
      firstName: user.first_name ?? null,
      lastName: user.last_name ?? null,
      languageCode: user.language_code ?? null,
      isBot: user.is_bot
    },
    create: {
      telegramId: BigInt(user.id),
      username: user.username ?? null,
      firstName: user.first_name ?? null,
      lastName: user.last_name ?? null,
      languageCode: user.language_code ?? null,
      isBot: user.is_bot
    }
  })
}
