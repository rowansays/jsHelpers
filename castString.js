/**
 * Coerce a value to a string.
 *
 * @param {mixed} aught Any value.
 * @return {Array} A string.
 */
export function castString (aught) {
  // Coerce numbers to strings.
  aught = typeof aught === 'number' ? String(aught) : aught

  // Return trimmed value of string or empty.
  return typeof aught === 'string' ? aught.trim() : ''
}
