import { Bot } from 'grammy'
import { broadcastRiddleOfTheDay, saveChannelPostAnswer } from '../services'

import type { Context } from '../types/context.type'

const TARGET_CHANNEL_USERNAME = 'hamster_tools'
const REQUIRED_TAGS = ['#fomo', '#fighters', '#fomofighters', '#daily', '#riddle']
const ANSWER_MARKER_REGEX = /answer:\s*([^\r\n]+)/i

function hasRequiredTags(text: string) {
  const normalized = text.toLowerCase()
  return REQUIRED_TAGS.every((tag) => normalized.includes(tag))
}

function extractAnswer(text: string) {
  const match = text.match(ANSWER_MARKER_REGEX)

  if (!match?.[1]) {
    return null
  }

  const answer = match[1].trim()
  return answer.length > 0 ? answer : null
}

export function channelPostHandler(bot: Bot<Context>) {
  bot.on('channel_post', async (ctx) => {
    try {
      const channelPost = ctx.channelPost
      const username = channelPost.chat.username
      const content = ('text' in channelPost && channelPost.text) || ('caption' in channelPost && channelPost.caption) || null

      if (!username || username.toLowerCase() !== TARGET_CHANNEL_USERNAME) {
        return
      }

      if (!content || !hasRequiredTags(content)) {
        return
      }

      const answer = extractAnswer(content)

      if (!answer) {
        return
      }

      const savedAnswer = await saveChannelPostAnswer({
        answerText: answer
      })

      if (!savedAnswer) {
        return
      }

      await broadcastRiddleOfTheDay(ctx, savedAnswer)
    } catch (error) {
      console.log('error: channel post handler')
    }
  })
}
