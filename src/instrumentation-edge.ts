import { createChildLogger } from './factories/logger'

const logger = createChildLogger({
  module: 'instrumentation-edge'
})

async function register() {
  await import('./instrumentation-shared')
}

register()
  .then(() => {
    logger.info('Completed edge runtime startup tasks')
  })
  .catch((err) => {
    logger.error('Error while running edge runtime startup tasks')
  })
