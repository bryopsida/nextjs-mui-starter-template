import { createChildLogger } from './factories/logger'
import runDbMigrations from './tasks/runDbMigrations'
import seedAdminUser from './tasks/seedAdminUser'
const logger = createChildLogger({
  module: 'instrumentation-node'
})

async function register() {
  await import('./instrumentation-shared')
  logger.info('Running DB Migrations')
  runDbMigrations()
  logger.info('Finished Running DB Migrations')
  seedAdminUser()
}

register()
  .then(() => {
    logger.info('Completed node runtime startup tasks')
  })
  .catch((err) => {
    logger.error('Error while running node runtime startup tasks')
  })
