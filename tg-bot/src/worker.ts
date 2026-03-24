import { webhookCallback } from 'grammy'
import bot from './bot'

export default {
  fetch: webhookCallback(bot, 'cloudflare-mod')
}
