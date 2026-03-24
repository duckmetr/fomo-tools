import { Env } from '../types/env.type'

export const env = {
  NODE_ENV: process.env.NODE_ENV as Env,
  BOT_TOKEN: process.env.BOT_TOKEN as string
}
