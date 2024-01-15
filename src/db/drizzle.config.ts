import path from 'path'
const ROOT_PATH = new URL(path.dirname(import.meta.url)).pathname

const config = {
  schema: path.resolve(ROOT_PATH, 'schema.ts'),
  out: path.resolve(ROOT_PATH, 'migrations'),
  driver: 'better-sqlite',
  dbCredentials: {
    url: path.resolve(ROOT_PATH, 'data/local.sqlite')
  },
  verbose: true,
  strict: true
}
export default config
