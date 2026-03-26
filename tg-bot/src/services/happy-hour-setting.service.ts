import { getPrismaClient } from './prisma.service'

const SINGLE_SETTING_ID = 1

export async function getHappyHourSettingStart() {
  const prisma = getPrismaClient()

  if (!prisma) {
    return null
  }

  const setting = await prisma.happyHourSetting.findUnique({
    where: { id: SINGLE_SETTING_ID },
    select: { startAt: true }
  })

  return setting?.startAt ?? null
}

export async function setHappyHourSettingStart(startAt: Date, setByTelegramId: bigint) {
  const prisma = getPrismaClient()

  if (!prisma) {
    return null
  }

  return prisma.happyHourSetting.upsert({
    where: { id: SINGLE_SETTING_ID },
    create: {
      id: SINGLE_SETTING_ID,
      startAt,
      setByTelegramId
    },
    update: {
      startAt,
      setByTelegramId
    },
    select: {
      startAt: true
    }
  })
}
