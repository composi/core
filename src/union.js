/**
 * Helper function for testing whether message type exists on actions object.
 */
const {hasOwnProperty} = Object


/**
 * @param {import('./types').Tag} tag
 * @param {Object<string, Function>} handlers
 * @param {() => void} [catchAll]
 */
function match(tag, handlers, catchAll) {
  const {type, data} = tag
  return type
    ? (type => {
      const match = hasOwnProperty.call(handlers, type) && handlers[type]
      return match
        ? match(data)
        : catchAll
        ? catchAll()
        : console.error(
          `The message you sent has no matching action method. Check the spelling for the message or the action method. The message type was "${type}".`
        )
    })(type)
    : (() => {
      console.error(
        "The message you provided was not valid. Messages have the format: {type: 'whatever', data?: 'something'}"
      )
      console.error('The tag you provided was:')
      console.dir(tag)
    })()
}

/**
 * Create a union of string tags.
 * @param {string[]} types
 * @returns {Object<string, any>} Object
 */
function createUnion(types) {
  const variants = Object.create(null)

  let idx = 0
  while (idx < types.length) {
    const type = types[idx]
    type === 'match'
      && console.error(
        `The message type you provided was "match". This cannot be used since it would override the message union's own match method. Please change it to something else, such as "matchName", etc.`
      )

    variants[type] = data => ({ type, data })
    idx++
  }

  return { variants, match }
}

/**
 * @typedef {Object} MessageUnion
 */

/**
 * Create a union of types for matching up with functions. This is used to define actions for the `update` method of a runtime program.
 * @param {...string} types
 * @returns {MessageUnion} MessageUnion
 */
export function union(...types) {
  const { variants, match } = createUnion(types)
  variants.match = match
  return variants
}
