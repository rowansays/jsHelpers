import { castStringArray } from '../castStringArray.js'
import { mockIterableXyz } from './mocks/iterable.js'

describe('castArray() - Unit Tests', () => {
  test('it is a function', () => {
    expect(typeof castStringArray).toEqual('function')
  })
  test('wraps a string in an array', () => {
    expect(castStringArray('hi there')).toEqual(['hi there'])
  })
  test('copies values of string arrays preserving order.', () => {
    const value = ['a', 'b', 'c']
    const casted = castStringArray(value)
    expect(casted).toEqual(value)
    expect(casted).not.toBe(value)
  })
  test('converts numbers to strings.', () => {
    const value = [1, 2, 3]
    const casted = castStringArray(value)
    expect(casted).toEqual(['1', '2', '3'])
  })
  test('only returns stringable values in a mixed array.', () => {
    const value = [
      null, 'a', undefined, 'b', false, 'c',
      true, 1, [], 2, new Set(), 3, new Map(), mockIterableXyz
    ]
    const casted = castStringArray(value)
    expect(casted).toEqual(['a', 'b', 'c', '1', '2', '3'])
  })
})
