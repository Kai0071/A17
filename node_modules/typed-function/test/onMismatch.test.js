var assert = require('assert');
var typed = require('../typed-function');

describe('onMismatch handler', () => {
  const square = typed('square', {
    number: x => x*x,
    string: s => s + s
  })

  it('should replace the return value of a mismatched call', () => {
    typed.onMismatch = () => 42
    assert.strictEqual(square(5), 25)
    assert.strictEqual(square('yo'), 'yoyo')
    assert.strictEqual(square([13]), 42)
  })

  const myErrorLog = []
  it('should allow error logging', () => {
    typed.onMismatch = (name, args, signatures) => {
      myErrorLog.push(typed.createError(name, args, signatures))
      return null
    }
    square({the: 'circle'})
    square(7)
    square('me')
    square(1,2)
    assert.strictEqual(myErrorLog.length, 2)
    assert('data' in myErrorLog[0])
  })

  it('should allow changing the error', () => {
    typed.onMismatch = name => { throw Error('Problem with ' + name) }
    assert.throws(() => square(['one']), /Problem with square/)
  })

  it('should allow a return to standard behavior', () => {
    typed.onMismatch = typed.throwMismatchError
    assert.throws(() => square('be', 'there'), TypeError)
  })
})
