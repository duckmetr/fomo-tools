import 'dotenv/config'

export const env = {
  BOT_TOKEN: process.env.BOT_TOKEN!,
  NODE_ENV: process.env.NODE_ENV || 'development'
}
