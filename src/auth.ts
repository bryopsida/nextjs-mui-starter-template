import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import userService from '@/services/user'

export const config: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (
          credentials == null ||
          credentials.username == null ||
          credentials.password == null
        )
          return null
        if (
          !(await userService.passwordMatches(
            credentials?.username,
            credentials?.password
          ))
        )
          return null
        return await userService.getUser(credentials.username)
      }
    })
  ]
}

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}
