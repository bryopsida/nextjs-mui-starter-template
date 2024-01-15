import { UserDTO } from '@/dtos/user'
import { createChildLogger } from '@/factories/logger'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

import cryptoService from '@/services/crypto'

const logger = createChildLogger({
  module: 'service/user'
})

export interface IUserService {
  userExists(username: string): Promise<boolean>
  passwordMatches(username: string, password: string): Promise<boolean>
  createUser(
    username: string,
    password: string,
    email: string
  ): Promise<UserDTO>
  getUser(username: string): Promise<UserDTO | null>
}

export class UserService implements IUserService {
  async getUser(username: string): Promise<UserDTO | null> {
    const { db } = await import('../db/db')
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
    if (user == null || user.length == 0) return null
    const dbRow = user[0]
    return {
      id: dbRow.username,
      username: dbRow.username,
      email: dbRow.email
    }
  }
  async userExists(username: string): Promise<boolean> {
    const { db } = await import('../db/db')
    const dbRec = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
    return dbRec != null && dbRec.length != 0
  }
  async passwordMatches(username: string, password: string): Promise<boolean> {
    const { db } = await import('../db/db')
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
    if (user == null || user.length == 0) return false
    const dbRow = user[0]
    return cryptoService.passwordMatches(password, dbRow.password)
  }
  async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<UserDTO> {
    const { db } = await import('../db/db')
    await db.insert(users).values([
      {
        username: username,
        email: email,
        password: await cryptoService.hashPassword(password)
      }
    ])
    return {
      id: username,
      username,
      email
    }
  }
}

const instance = new UserService()
export default instance
