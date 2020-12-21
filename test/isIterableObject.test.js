import { isIterableObject } from '../isIterableObject.js'
import { mockIterableXyz } from './mocks/iterable.js'

describe('isIterableObject()', () => {
  test('it is a function.', () => {
    expect(typeof isIterableObject).toEqual('function')
  })
  describe('Data types', () => {
    test('returns false for undefined', () => {
      expect(isIterableObject()).toBe(false)
    })
    test('returns false for boolean', () => {
      expect(isIterableObject(true)).toBe(false)
      expect(isIterableObject(false)).toBe(false)
    })
    test('returns false for number', () => {
      expect(isIterableObject(NaN)).toBe(false)
      expect(isIterableObject(Infinity)).toBe(false)
      expect(isIterableObject(1234)).toBe(false)
      expect(isIterableObject(1.234)).toBe(false)
    })
    test('returns false for string', () => {
      expect(isIterableObject('')).toBe(false)
    })
    test('returns false for bigint', () => {
      expect(isIterableObject(1234n)).toBe(false)
    })
    test('returns false for symbol', () => {
      expect(isIterableObject(Symbol())).toBe(false)
    })
  })
  describe('Structural types', () => {
    test('returns false for Object', () => {
      expect(isIterableObject({})).toBe(false)
    })
    test('returns true for Array', () => {
      expect(isIterableObject([])).toBe(true)
    })
    test('returns true for Set', () => {
      expect(isIterableObject(new Set())).toBe(true)
    })
    test('returns true for Map', () => {
      expect(isIterableObject(new Map())).toBe(true)
    })
    test('returns true for TypedArray', () => {
      expect(isIterableObject(new BigInt64Array())).toBe(true)
      expect(isIterableObject(new BigUint64Array())).toBe(true)
      expect(isIterableObject(new Float32Array())).toBe(true)
      expect(isIterableObject(new Float64Array())).toBe(true)
      expect(isIterableObject(new Int8Array())).toBe(true)
      expect(isIterableObject(new Int16Array())).toBe(true)
      expect(isIterableObject(new Int32Array())).toBe(true)
      expect(isIterableObject(new Uint8Array())).toBe(true)
      expect(isIterableObject(new Uint8ClampedArray())).toBe(true)
      expect(isIterableObject(new Uint16Array())).toBe(true)
      expect(isIterableObject(new Uint32Array())).toBe(true)
    })
    test('returns false for Date', () => {
      expect(isIterableObject(new Date())).toBe(false)
    })
    test('returns false for arrow functions', () => {
      expect(isIterableObject(() => {})).toBe(false)
    })
  })
  describe('Structural Root Primitive', () => {
    test('returns false for null', () => {
      expect(isIterableObject(null)).toBe(false)
    })
  })
  describe('Custom', () => {
    test('returns true for custom iterable object', () => {
      expect(isIterableObject(mockIterableXyz)).toBe(true)
    })
  })
})
