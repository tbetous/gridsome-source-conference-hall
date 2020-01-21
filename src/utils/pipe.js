/**
 * Create a functional pipe to process an event
 */
module.exports = event => ({
  apply: (...functions) => functions.reduce((result, fn) => fn(result), event)
})
