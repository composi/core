const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * @typedef {Object} Tag
 * @prop {string} type
 * @prop {any} [data]
 */
/**
 * @param {Tag} tag
 * @param {Object<string, Function>} handlers
 * @param {() => void} [catchAll]
 */
function match(tag, handlers, catchAll) {
  if (!tag.type) {
    console.error(
      "The message you provided was not valid. Messages have the format: {type: 'whatever', data?: 'something'}"
    )
    console.error('The tag you provided was:')
    console.dir(tag)
    return
  }
  return (tag => {
    const { type, data } = tag
    const match = hasOwnProperty.call(handlers, type) && handlers[type]
    return match
      ? match(data)
      : catchAll
      ? catchAll()
      : console.error(
          `The message you sent has no matching action method. Check the spelling for the message or the action method. The message type was "${type}".`
        )
  })(tag)
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
    if (type === 'match') {
      console.error(
        `The message type you provided was "match". This cannot be used since it would override the message union's own match method. Please change it to something else, such as "matchName", etc.`
      )
    }
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
