import { castArray } from './castArray.js'
import { castString } from './castString.js'

/**
 * Cast a value to an array of strings.
 *
 * @param {*} aught - The value to cast.
 *
 * @return {String[]}
 */
export function castStringArray (aught) {
  return castArray(aught, (x) => {
    const string = castString(x)
    return string === '' ? undefined : string
  })
}
