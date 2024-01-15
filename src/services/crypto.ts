import { randomBytes } from 'node:crypto'
import argon2 from 'argon2'
export interface ICryptoService {
  hashPassword(plaintext: string): Promise<string>
  passwordMatches(plaintext: string, hash: string): Promise<boolean>
  createRandomPassword(): Promise<string>
}

export class CryptoService implements ICryptoService {
  createRandomPassword(): Promise<string> {
    return Promise.resolve(randomBytes(16).toString('hex'))
  }
  async hashPassword(plaintext: string): Promise<string> {
    return await argon2.hash(plaintext)
  }
  async passwordMatches(plaintext: string, hash: string) {
    return await argon2.verify(hash, plaintext)
  }
}

const instance = new CryptoService()
export default instance
