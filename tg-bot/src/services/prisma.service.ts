import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '../../generated/prisma/client'

type DbContainer = {
  DB?: unknown
}

let prisma: InstanceType<typeof PrismaClient> | null = null
let activeDb: unknown = null

function getDatabaseBinding() {
  return (globalThis as DbContainer).DB ?? null
}

export function getPrismaClient() {
  const db = getDatabaseBinding()

  if (!db) {
    return null
  }

  if (!prisma || activeDb !== db) {
    const adapter = new PrismaD1(db as never)
    prisma = new PrismaClient({ adapter })
    activeDb = db
  }

  return prisma
}
