import { castArray } from '../castArray.js'
import {
  mockIterableMixed,
  mockIterableNamedObjects,
  mockIterableIntegers,
  mockIterableXyz
} from './mocks/iterable.js'

describe('castArray', () => {
  it('is a function.', () => {
    expect(typeof castArray).toEqual('function')
  })
})
describe('castArray()', () => {
  it('returns an empty array.', () => {
    expect(castArray()).toEqual([])
  })
})
describe('castArray(aught)', () => {
  it('returns empty array for undefined', () => {
    expect(castArray()).toMatchObject([])
  })
  it('wraps booleans in an array', () => {
    expect(castArray(true)).toMatchObject([true])
    expect(castArray(false)).toMatchObject([false])
  })
  it('wraps numbers in an array', () => {
    expect(castArray(NaN)).toMatchObject([NaN])
    expect(castArray(Infinity)).toMatchObject([Infinity])
    expect(castArray(1234)).toMatchObject([1234])
    expect(castArray(1.234)).toMatchObject([1.234])
  })
  it('wraps strings in an array', () => {
    expect(castArray('')).toMatchObject([''])
    expect(castArray('abc')).toMatchObject(['abc'])
  })
  it('wraps a bigint in an array', () => {
    expect(castArray(1234n)).toMatchObject([1234n])
  })
  it('wraps a symbol in an array', () => {
    const s = Symbol()
    expect(castArray(s)).toMatchObject([s])
  })
  it('wraps null in an array', () => {
    expect(castArray(null)).toMatchObject([null])
  })
  describe('Array', () => {
    it('creates an new empty array from an empty array', () => {
      const a = []
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b).toMatchObject(a)
    })
    it('extracts undefined values into a new array', () => {
      const a = [undefined, undefined, undefined]
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b).toMatchObject(a)
    })
    it('extracts boolean values into a new array', () => {
      const a = [true, false, true, false]
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b).toMatchObject(a)
    })
    it('extracts numeric values into a new array', () => {
      const a = [123, 1.23, NaN, Infinity]
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b).toMatchObject(a)
    })
    it('extracts bigints into a new array', () => {
      const a = [1n, 2n ,3n]
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b).toMatchObject(a)
    })
    it('extracts symbols into a new array', () => {
      const s1 = Symbol()
      const s2 = Symbol()
      const s3 = Symbol()
      const a = [s1, s2, s3]
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b[0]).toBe(s1)
      expect(b[1]).toBe(s2)
      expect(b[2]).toBe(s3)
    })
    it('extracts null values into a new array', () => {
      const a = [null, null, null]
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b).toMatchObject(a)
    })
    it('extracts strings into a new array', () => {
      const a = ['a', 'b', 'c']
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b).toMatchObject(a)
    })
    it('extracts references to arrays into a new array', () => {
      const o1 = [1, 2, 3]
      const o2 = [4, 5, 6]
      const o3 = [7, 8, 9]
      const a = [o1, o2, o3]
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b[0]).toBe(o1)
      expect(b[1]).toBe(o2)
      expect(b[2]).toBe(o3)
    })
    it('extracts references to object literals into a new array', () => {
      const o1 = { name: 'All work and' }
      const o2 = { name: 'no play makes' }
      const o3 = { name: 'jack a dull boy' }
      const a = [o1, o2, o3]
      const b = castArray(a)
      expect(b).not.toBe(a)
      expect(b[0]).toBe(o1)
      expect(b[1]).toBe(o2)
      expect(b[2]).toBe(o3)
    })
  })
  describe('Set', () => {
    it('returns an empty array for an empty Set', () => {
      const a = new Set()
      const b = castArray(a)
      expect(b).toMatchObject([])
    })
    it('extracts numeric values', () => {
      const a = new Set([1, 2, 3])
      const b = castArray(a)
      expect(b).toMatchObject([1, 2, 3])
    })
    it('extracts string values', () => {
      const a = new Set(['a', 'b', 'c'])
      const b = castArray(a)
      expect(b).toMatchObject(['a', 'b', 'c'])
    })
    it('extracts object literal references', () => {
      const o1 = { name: 'All work and' }
      const o2 = { name: 'no play makes' }
      const o3 = { name: 'jack a dull boy' }
      const a = new Set([o1, o2, o3])
      const b = castArray(a)
      expect(b[0]).toBe(o1)
      expect(b[1]).toBe(o2)
      expect(b[2]).toBe(o3)
    })
  })
  describe('Map', () => {
    it('returns an empty array for an empty Map', () => {
      const a = new Map()
      const b = castArray(a)
      expect(b).toMatchObject([])
    })
    it('extracts numeric values', () => {
      const a = new Map([['a', 1], ['b', 2], ['c', 3]])
      const b = castArray(a)
      expect(b).toMatchObject([1, 2, 3])
    })
    it('extracts string values', () => {
      const a = new Map([['a', 'a'], ['b', 'b'], ['c', 'c']])
      const b = castArray(a)
      expect(b).toMatchObject(['a', 'b', 'c'])
    })
    it('extracts object literal references', () => {
      const o1 = { name: 'All work and' }
      const o2 = { name: 'no play makes' }
      const o3 = { name: 'jack a dull boy' }
      const a = new Map([ ['a', o1], ['b', o2], ['c', o3] ])
      const b = castArray(a)
      expect(b[0]).toBe(o1)
      expect(b[1]).toBe(o2)
      expect(b[2]).toBe(o3)
    })
  })
  describe('Iterable', () => {
    it('extracts numeric values', () => {
      const a = castArray(mockIterableIntegers)
      expect(a).toMatchObject([1, 2, 3])
    })
    it('extracts string values', () => {
      const a = castArray(mockIterableXyz)
      expect(a).toMatchObject(['x', 'y', 'z'])
    })
    it('extracts plain objects', () => {
      const a = castArray(mockIterableNamedObjects)
      expect(a).toMatchObject([
        { name: 'Kitten' },
        { name: 'Bunny' },
        { name: 'Spider' }
      ])
    })
  })
})
describe('castArray(aught, filter)', () => {
  it('no value is saved when filter returns undefined', () => {
    const value = ['a', 1, false, true]
    const removeEverything = () => undefined
    const removeA = (x) => x === 'a' ? undefined : x
    const remove1 = (x) => x === 1 ? undefined : x
    const removeF = (x) => x === false ? undefined : x
    const removeT = (x) => x === true ? undefined : x
    expect(castArray(value, removeEverything)).toEqual([])
    expect(castArray(value, removeA)).toEqual([1, false, true])
    expect(castArray(value, remove1)).toEqual(['a', false, true])
    expect(castArray(value, removeF)).toEqual(['a', 1, true])
    expect(castArray(value, removeT)).toEqual(['a', 1, false])
  })
  it('can overwrite all values with a custom value', () => {
    const value = ['a', 1, false, true]
    const filter = () => 'hi'
    expect(castArray(value, filter)).toEqual(['hi', 'hi', 'hi', 'hi'])
  })
  it('accepts the values from the input', () => {
    const value = ['a', 1, false, true]
    const filter = (value) => value
    expect(castArray(value, filter)).toEqual(['a', 1, false, true])
  })
  it('can be used to filter by type:string', () => {
    const value = ['a', 1, false, true]
    const filter = (value) => typeof value === 'string' ? value : undefined
    expect(castArray(value, filter)).toEqual(['a'])
  })
  it('can be used to filter by type:number', () => {
    const value = ['a', 1, false, true]
    const filter = (value) => typeof value === 'number' ? value : undefined
    expect(castArray(value, filter)).toEqual([1])
  })
  it('can be used to filter by type:boolean', () => {
    const value = ['a', 1, false, true]
    const filter = (value) => typeof value === 'boolean' ? value : undefined
    expect(castArray(value, filter)).toEqual([false, true])
  })
  it('has no effect when not a function', () => {
    const value = ['a', 1, false, true]
    expect(castArray(value, undefined)).toEqual(value)
    expect(castArray(value, null)).toEqual(value)
    expect(castArray(value, false)).toEqual(value)
    expect(castArray(value, true)).toEqual(value)
    expect(castArray(value, 'abc')).toEqual(value)
    expect(castArray(value, 12345)).toEqual(value)
    expect(castArray(value, 1234n)).toEqual(value)
    expect(castArray(value, Symbol())).toEqual(value)
    expect(castArray(value, {})).toEqual(value)
    expect(castArray(value, [])).toEqual(value)
    expect(castArray(value, new Map())).toEqual(value)
    expect(castArray(value, new Set())).toEqual(value)
  })
  it('does not recurse', () => {
    const a = [1, 2, 3, 'a', 'b', ['c']]
    const b = castArray(a, x => typeof x === 'string' ? x : undefined)
    expect(b.length).toEqual(2)
    expect(b[0]).toEqual('a')
    expect(b[1]).toEqual('b')
  })
})
describe('castArray(aught, filter, mode)', () => {
  it('walks nested arrays to find strings', () => {
    const a = [
      [1, 2n, 3.0, ['Hello']],
      [1, 2n, 3.0, [['World']]],
      [1, 2n, 3.0, [[['I\'m your wild girl']]]],
    ]
    const filter = x => typeof x === 'string' ? x : undefined
    const b = castArray(a, filter, 'recursive')
    expect(b[0]).toEqual('Hello')
    expect(b[1]).toEqual('World')
    expect(b[2]).toEqual('I\'m your wild girl')
  })
  it('walks nested sets to find strings', () => {
    const a = new Set([
      new Set( [1, 2n, 3.0, new Set(['Hello']) ]),
      new Set( [1, 2n, 3.0, new Set(['World']) ]),
      new Set( [1, 2n, 3.0, new Set(['I\'m your wild girl']) ]),
    ])

    const filter = x => typeof x === 'string' ? x : undefined
    const b = castArray(a, filter, 'recursive')
    expect(b[0]).toEqual('Hello')
    expect(b[1]).toEqual('World')
    expect(b[2]).toEqual('I\'m your wild girl')
  })
})
