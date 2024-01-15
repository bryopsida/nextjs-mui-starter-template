import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { dirname } from 'node:path'
import { mkdir } from 'node:fs/promises'
import config from './drizzle.config'

export async function runMigrations() {
  // ensure the directory exists
  const dataDir = dirname(config.dbCredentials.url)
  await mkdir(dataDir, {
    recursive: true
  })
  const { db, connection } = await import('./db')

  // This will run migrations on the database, skipping the ones already applied
  migrate(db, { migrationsFolder: config.out })
}
