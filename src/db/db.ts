import { drizzle } from 'drizzle-orm/better-sqlite3'
import { createChildLogger } from '@/factories/logger'
import Database from 'better-sqlite3'
import * as schema from './schema'
import config from './drizzle.config'

const logger = createChildLogger({
  module: 'db/db'
})

export const connection = new Database(config.dbCredentials.url, {
  verbose: (msg: unknown, ...args: unknown[]) => {
    logger.trace(msg as any, args as any[])
  }
})

export const db = drizzle(connection, { schema })
