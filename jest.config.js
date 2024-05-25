/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/tests/**'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/tests/playwright/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
}
