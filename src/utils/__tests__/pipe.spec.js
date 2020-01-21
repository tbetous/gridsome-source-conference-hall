const pipe = require('../pipe')

describe('pipe', () => {
  it('should works', () => {
    const add = b => a => a + b
    expect(pipe(2).apply(add(1), add(2), add(3))).toBe(8)
  })
})
