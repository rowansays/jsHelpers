import { castArray } from '../castArray.js'
import { mockIterableXyz } from './mocks/iterable.js'

describe('castArray() - Unit Tests', () => {
  test('it is a function.', () => {
    expect(typeof castArray).toEqual('function')
  })
  describe('Parameter 1 - aught {*}', () => {
    describe('it wraps scalar values', () => {
      test('boolean true', () => {
        const target = [true]
        const casted = castArray(true)
        expect(casted).toEqual(target)
        expect(casted).not.toBe(target)
      })
      test('boolean false', () => {
        const target = [false]
        const casted = castArray(false)
        expect(casted).toEqual(target)
        expect(casted).not.toBe(target)
      })
      test('empty string', () => {
        const target = ['']
        const casted = castArray('')
        expect(casted).toEqual(target)
        expect(casted).not.toBe(target)
      })
    })
    describe('it returns an empty array for the following values', () => {
      const target = []
      test('undefined', () => {
        expect(castArray(undefined)).toEqual(target)
      })
      test('null', () => {
        expect(castArray(null)).toEqual(target)
      })
      test('empty plain object', () => {
        expect(castArray({})).toEqual(target)
      })
      test('empty array', () => {
        expect(castArray([])).toEqual(target)
      })
      test("Array with a value of undefined", () => {
        expect(castArray([undefined])).toEqual(target)
      })
      test('empty Set instance', () => {
        expect(castArray(new Set())).toEqual(target)
      })
      test('empty Map instance', () => {
        expect(castArray(new Map())).toEqual(target)
      })
    })
    describe('it returns a copy of input array', () => {
      test("[null]", () => {
        const value = [null]
        const casted = castArray(value)
        expect(casted).toEqual(value)
        expect(casted).not.toBe(value)
      })
      test("[true]", () => {
        const value = [true]
        const casted = castArray(value)
        expect(casted).toEqual(value)
        expect(casted).not.toBe(value)
      })
      test("[false]", () => {
        const value = [false]
        const casted = castArray(value)
        expect(casted).toEqual(value)
        expect(casted).not.toBe(value)
      })
      test("['a']", () => {
        const value = ['a']
        const casted = castArray(value)
        expect(casted).toEqual(value)
        expect(casted).not.toBe(value)
      })
      test("[1]", () => {
        const value = [1]
        const casted = castArray(value)
        expect(casted).toEqual(value)
        expect(casted).not.toBe(value)
      })
    })
    describe('it extracts the values of other objects', () => {
      test("iterable objects", () => {
        const value = mockIterableXyz
        expect(castArray(value)).toEqual(['x', 'y', 'z'])
      })
      test("{ a: 1, b: 2, c: 3 }", () => {
        const value = { a: 1, b: 2, c: 3 }
        expect(castArray(value)).toEqual([1, 2, 3])
      })
      test("new Set([1, 2, 3])", () => {
        const value = new Set([1, 2, 3])
        expect(castArray(value)).toEqual([1, 2, 3])
      })
      test("new Map([['a', 1], ['b', 2], ['c', 3]])", () => {
        const value = new Map([['a', 1], ['b', 2], ['c', 3]])
        expect(castArray(value)).toEqual([1, 2, 3])
      })
    })
  })
  describe('Parameter 2 - filter {function}', () => {
    test("return values of undefined always produces an empty array", () => {
      const value = ['a', 1, false, true]
      const filter = () => undefined
      expect(castArray(value, filter)).toEqual([])
    })
    test("can overwrite all values with a custom value", () => {
      const value = ['a', 1, false, true]
      const filter = () => 'hi'
      expect(castArray(value, filter)).toEqual(['hi', 'hi', 'hi', 'hi'])
    })
    test("accepts the values from the input", () => {
      const value = ['a', 1, false, true]
      const filter = (value) => value
      expect(castArray(value, filter)).toEqual(['a', 1, false, true])
    })
    test('accepts a "value" parameter from the iterating the input', () => {
      const value = ['a', 1, false, true]
      const filter = (value) => value
      expect(castArray(value, filter)).toEqual(['a', 1, false, true])
    })
    test('can be used to filter by type:string', () => {
      const value = ['a', 1, false, true]
      const filter = (value) => typeof value === 'string' ? value : undefined
      expect(castArray(value, filter)).toEqual(['a'])
    })
    test('can be used to filter by type:number', () => {
      const value = ['a', 1, false, true]
      const filter = (value) => typeof value === 'number' ? value : undefined
      expect(castArray(value, filter)).toEqual([1])
    })
    test('can be used to filter by type:boolean', () => {
      const value = ['a', 1, false, true]
      const filter = (value) => typeof value === 'boolean' ? value : undefined
      expect(castArray(value, filter)).toEqual([false, true])
    })
    test('has no effect when not a function', () => {
      const value = ['a', 1, false, true]
      expect(castArray(value, 'I am a string')).toEqual(value)
    })
  })
})
