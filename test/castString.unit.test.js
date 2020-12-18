import { castString } from '../castString.js'

function testStringEmpty (label, aught) {
  return testString(label, aught, '')
}
function testStringSame (aught) {
  return testString(aught, aught, aught)
}
function testString (label, aught, expected) {
  test(label, () => {
    const cast = castString(aught)
    expect(cast).toEqual(expected)
  })
}

describe('castString() - Unit Tests', () => {
  test('it is a function.', () => {
    expect(typeof castString).toEqual('function')
  })
  describe('it returns an empty string when passed', () => {
    testStringEmpty('literal undefined', undefined)
    testStringEmpty('boolean true', true)
    testStringEmpty('boolean false', false)
    testStringEmpty('empty string', '')
    testStringEmpty('null object', null)
    testStringEmpty('empty plain object', {})
    testStringEmpty('empty array', [])
    testStringEmpty('empty Set instance', new Set())
    testStringEmpty('empty Map instance', new Map())
    testStringEmpty('single space', ' ')
    testStringEmpty('double space', '  ')
    testStringEmpty('tripple space', '   ')
    testStringEmpty('single tab', "\t")
    testStringEmpty('double tab', "\t\t")
    testStringEmpty('tripple tab', "\t\t\t")
  })
  describe('it returns its input value when passed', () => {
    testStringSame('comes')
    testStringSame('with')
    testStringSame('the')
    testStringSame('fall')
  })
  describe('it returns its input value when passed', () => {
    testStringSame('Comes')
    testStringSame('with')
    testStringSame('ThE')
    testStringSame('fAlL')
  })
  describe('it returns an altered verison of input when', () => {
    testString('padded with spaces', ' a b c ', 'a b c')
    testString('padded with tabs', "\t\ta b c\t\t", 'a b c')
    testString('passed an integer', 123, '123')
    testString('passed a float', 1.23, '1.23')
  })
})
