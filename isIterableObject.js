/**
 * Can the provided value be used in a for of loop?
 *
 * @param {*} aught - The value to test.
 *
 * @return {boolean} True if the value is iterable; false otherwise.
 */
export function isIterableObject (aught) {
  return aught !== null &&
    typeof aught !== 'undefined' &&
    typeof aught !== 'string' &&
    typeof aught[Symbol.iterator] === 'function'
}
