import express from 'express'
import { webhookCallback, API_CONSTANTS } from 'grammy'
import { env } from './config'
import bot from './bot'

import type { Bot } from 'grammy'
import type { Context } from './types/context.type'
import type { Env } from './types/env.type'

type Options = {
  bot: Bot<Context>
  env: Env
  webhook?: {
    port?: number
    path?: string
  }
  updates?: typeof API_CONSTANTS.ALL_UPDATE_TYPES
}

class Launcher {
  private readonly bot
  private readonly env
  private readonly port
  private readonly path
  private readonly updates

  constructor(options: Options) {
    this.bot = options.bot
    this.env = options.env
    this.port = options.webhook?.port ?? 3000
    this.path = options.webhook?.path ?? `/bot/${this.bot.token}`
    this.updates = options.updates ?? ['message']
    this.init()
  }

  private development() {
    this.bot.start({
      onStart: ({ username }) => {
        console.log(`[bot] ENV=${this.env} @${username}`)
      },
      allowed_updates: this.updates
    })
  }

  private production() {
    const app = express()
    app.use(express.json())
    app.use(this.path, webhookCallback(this.bot, 'express'))
    app.listen(this.port, () => {
      console.log(`[bot] ENV=${this.env} PORT:${this.port}`)
    })
  }

  private init() {
    switch (this.env) {
      case 'development':
        this.development()
        break
      case 'production':
        this.production()
        break
      default:
        throw new Error(`[bot] Unknown environment: ${this.env}`)
    }
  }
}

new Launcher({
  bot,
  env: env.NODE_ENV
})
