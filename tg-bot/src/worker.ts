import { webhookCallback } from 'grammy'
import bot from './bot'

const handleUpdate = webhookCallback(bot, 'cloudflare-mod')

export default {
  fetch(request: Request, env: { DB?: unknown }) {
    ;(globalThis as { DB?: unknown }).DB = env.DB
    return handleUpdate(request)
  }
}
