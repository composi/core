const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Create a union of string tags.
 * @param {string[]} types
 */
function createUnion(types) {
  const variants = Object.create(null)
  let checkTag = x => x && x.type

  const matcher = (handlers, catchAll) => {
    return (tag, context) => {
      const tagType = checkTag(tag)
      const match = hasOwnProperty.call(handlers, tagType) && handlers[tagType]
      return match ? match(tag.data, context) : catchAll(context)
    }
  }

  function match(tag, handlers, catchAll) {
    return matcher(handlers, catchAll)(tag)
  }

  let idx = 0
  while (idx < types.length) {
    const type = types[idx]
    variants[type] = data => ({ type, data })
    idx++
  }

  return { variants, match }
}

/**
 * Create a union of types for matching up with functions. This is used to define actions for the `update` method of a runtime program.
 * @param {...string} types
 */
export function union(...types) {
  const { variants, match } = createUnion(types)
  variants.match = match
  return variants
}
