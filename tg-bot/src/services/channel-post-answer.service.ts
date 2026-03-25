import { getPrismaClient } from './prisma.service'

type SaveChannelPostAnswerInput = {
  answerText: string
}

export async function saveChannelPostAnswer(input: SaveChannelPostAnswerInput) {
  const prisma = getPrismaClient()

  if (!prisma) {
    return null
  }

  return prisma.answer.create({
    data: {
      answerText: input.answerText
    },
    select: {
      id: true,
      answerText: true,
      createdAt: true
    }
  })
}
