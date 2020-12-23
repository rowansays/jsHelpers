import { isIterableObject } from './isIterableObject.js'

/**
 * Cast a value to an array
 *
 * This function is mutually recursive with maybePush().
 *
 * @param {*} aught - The value to cast.
 * @param {function} [filter] - A function to be called for every item. When this
 *   function returns undefined the value will not be included in the output
 *   array.
 * @param {string} [mode] - When "recursive" castArray() will iterate through
 *   all iterable values and extract any value that passes the filter.
 *
 * @return {Array}
 */
export function castArray (aught, filter, mode) {
  if (typeof aught === 'undefined') {
    return []
  }

  // Wrap all other scalar values in arrays.
  aught = typeof aught === 'object' ? aught : [aught]

  // Choose looping strategy.
  const output = []
  if (!!aught && typeof aught.forEach === 'function') {
    aught.forEach(x => { maybePush(filter, output, x, mode) })
  } else if (isIterableObject(aught)) {
    for (const x of aught) { maybePush(filter, output, x, mode) }
  } else {
    maybePush(filter, output, aught, mode)
  }

  return output
}

function isLoopable (aught) {
  return !!aught && typeof aught.forEach === 'function' && isIterableObject(aught)
}

/**
 * This function is mutually recursive with castArray().
 */
function maybePush (filter, array, value, mode) {
  const defaultFilter = x => x
  filter = typeof filter === 'function' ? filter : defaultFilter

  if (filter !== defaultFilter) {
    const filteredValue = filter(value, array)
    if (typeof filteredValue !== 'undefined') {
      array.push(filteredValue)
    } else if (mode === 'recursive' && isLoopable(value)) {
      array.push(...castArray(value, filter, mode))
    }
  } else {
    array.push(value)
  }
}
