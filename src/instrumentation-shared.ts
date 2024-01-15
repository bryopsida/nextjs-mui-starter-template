import { createChildLogger } from './factories/logger'
import runDbMigrations from '@/tasks/runDbMigrations'

const logger = createChildLogger({
  module: 'instrumentation-shared'
})
