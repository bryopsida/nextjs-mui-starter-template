import pino from 'pino'

const rootLogger = pino({
  browser: {
    asObject: true
  },
  level: 'debug',
  base: {
    env: process.env.NODE_ENV,
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA
  }
})

export function createChildLogger(meta: any): pino.Logger {
  return rootLogger.child(meta)
}
export default rootLogger
