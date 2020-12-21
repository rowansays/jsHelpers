import { isIterable } from '../isIterable.js'
import { mockIterableXyz } from './mocks/iterable.js'

describe('isIterable()', () => {
  test('it is a function.', () => {
    expect(typeof isIterable).toEqual('function')
  })
  describe('Data types', () => {
    test('returns false for undefined', () => {
      expect(isIterable()).toBe(false)
    })
    test('returns false for boolean', () => {
      expect(isIterable(true)).toBe(false)
      expect(isIterable(false)).toBe(false)
    })
    test('returns false for number', () => {
      expect(isIterable(NaN)).toBe(false)
      expect(isIterable(Infinity)).toBe(false)
      expect(isIterable(1234)).toBe(false)
      expect(isIterable(1.234)).toBe(false)
    })
    test('returns true for string', () => {
      expect(isIterable('')).toBe(true)
    })
    test('returns false for bigint', () => {
      expect(isIterable(1234n)).toBe(false)
    })
    test('returns false for symbol', () => {
      expect(isIterable(Symbol())).toBe(false)
    })
  })
  describe('Structural types', () => {
    test('returns false for Object', () => {
      expect(isIterable({})).toBe(false)
    })
    test('returns true for Array', () => {
      expect(isIterable([])).toBe(true)
    })
    test('returns true for Set', () => {
      expect(isIterable(new Set())).toBe(true)
    })
    test('returns true for Map', () => {
      expect(isIterable(new Map())).toBe(true)
    })
    test('returns true for TypedArray', () => {
      expect(isIterable(new BigInt64Array())).toBe(true)
      expect(isIterable(new BigUint64Array())).toBe(true)
      expect(isIterable(new Float32Array())).toBe(true)
      expect(isIterable(new Float64Array())).toBe(true)
      expect(isIterable(new Int8Array())).toBe(true)
      expect(isIterable(new Int16Array())).toBe(true)
      expect(isIterable(new Int32Array())).toBe(true)
      expect(isIterable(new Uint8Array())).toBe(true)
      expect(isIterable(new Uint8ClampedArray())).toBe(true)
      expect(isIterable(new Uint16Array())).toBe(true)
      expect(isIterable(new Uint32Array())).toBe(true)
    })
    test('returns false for Date', () => {
      expect(isIterable(new Date())).toBe(false)
    })
    test('returns false for arrow functions', () => {
      expect(isIterable(() => {})).toBe(false)
    })
  })
  describe('Structural Root Primitive', () => {
    test('returns false for null', () => {
      expect(isIterable(null)).toBe(false)
    })
  })
  describe('Custom', () => {
    test('returns true for custom iterable object', () => {
      expect(isIterable(mockIterableXyz)).toBe(true)
    })
  })
})
