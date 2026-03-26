import { Env } from '../types/env.type'

export const env = {
  NODE_ENV: process.env.NODE_ENV as Env,
  BOT_TOKEN: process.env.BOT_TOKEN as string,
  ADMIN_ID: process.env.ADMIN_ID as string,
  DONATE_TON_WALLET: process.env.DONATE_TON_WALLET as string
}
