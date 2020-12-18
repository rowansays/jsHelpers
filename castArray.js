/**
 * Cast a value to an array
 *
 * @param {*} aught - The value to cast.
 * @param {function} func - A function to be called for every item. When this
 *   function returns undefined the value will not be included in the output
 *   array.
 *
 * @return {Array}
 */
export function castArray (aught, filter) {
  // Wrap scalar values in arrays.
  aught = typeof aught === 'object' ? aught : [aught]

  // Null objects become empty arrays.
  aught = aught === null ? [] : aught

  // Choose looping strategy.
  const output = []
  if (typeof aught.forEach === 'function') {
    aught.forEach(x => { maybePush(filter, output, x) })
  } else if (Symbol.iterator in Object(aught)) {
    for (let x of aught) { maybePush(filter, output, x) }
  } else {
    for (let x in aught) { maybePush(filter, output, aught[x]) }
  }

  return output
}

function maybePush (filter, array, value) {
  filter = typeof filter === 'function' ? filter : x => x
  const clean = filter(value, array)
  if (typeof clean !== 'undefined') {
    array.push(clean)
  }
}
