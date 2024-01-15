import { runMigrations } from '@/db/migrate'

export default async function runDbMigrations(): Promise<void> {
  if (process.env.RUN_DB_MIGRATIONS) {
    return await runMigrations()
  }
}
