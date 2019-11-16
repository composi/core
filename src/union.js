const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * @typedef {Object} Tag
 * @prop {string} type
 * @prop {any} [data]
 */
/**
 * @param {Tag} tag
 * @param {Object<string, Function>} handlers
 */
function match(tag, handlers) {
  if (!tag.type) {
    console.error(
      "The message you provided was not valid. Messages have the format: {type: 'whatever', data: 'something'}"
    )
    console.error('The tag you provided was:')
    console.dir(tag)
    return
  }
  return ((tag, context) => {
    const type = tag.type
    const match = hasOwnProperty.call(handlers, type) && handlers[type]
    return match(tag.data, context)
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
