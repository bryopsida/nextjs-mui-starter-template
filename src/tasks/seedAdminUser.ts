import { createChildLogger } from '@/factories/logger'
import userService from '@/services/user'
import cryptoService from '@/services/crypto'

const logger = createChildLogger({
  modulue: 'tasks/seedAdminUser'
})

export default async function seedAdminUser(): Promise<void> {
  // check if the admin user exists if seed is enabled
  if (
    process.env.RUN_ADMIN_USER_SEED &&
    !(await userService.userExists('admin'))
  ) {
    const password = await cryptoService.createRandomPassword()
    await userService.createUser('admin', password, 'admin@localhost')
    logger.warn(
      `Seed admin user account with ${password} password, this will not be logged again, login and change this!`
    )
  }
}
