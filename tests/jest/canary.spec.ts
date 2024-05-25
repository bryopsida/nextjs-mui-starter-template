// should always pass as long as jest is correctly configured
import { describe, expect, it } from '@jest/globals'

describe('canary', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(true).toBeTruthy()
  })
})
