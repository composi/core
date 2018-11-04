const hasOwnProperty = Object.prototype.hasOwnProperty

function safeUnion(types, options) {
  const prefix = (options && options.prefix) || ''
  const prefixSize = prefix.length
  let stripPrefix
  if (prefixSize) {
    stripPrefix = tag =>
      tag &&
      tag.type &&
      tag.type.startsWith(prefix) &&
      tag.type.slice(prefixSize)
  } else {
    stripPrefix = x => x && x.type
  }

  const matcher = (handlers, catchAll) => {
    return function _matcher(tag, context) {
      const tagType = stripPrefix(tag)
      const match = hasOwnProperty.call(handlers, tagType) && handlers[tagType]
      return match ? match(tag.data, context) : catchAll(context)
    }
  }

  const methods = {
    match(tag, handlers, catchAll) {
      return matcher(handlers, catchAll)(tag)
    },
    matcher,
    matches(tag, type) {
      const tagType = stripPrefix(tag)
      return !!(typeof tagType === 'string' && variants[tagType] === type)
    }
  }

  const variants = Object.create(null)
  for (let i = 0; i < types.length; i++) {
    const type = types[i]
    const prefixedType = prefix + type
    variants[type] = data => ({ type: prefixedType, data })
  }

  return { variants, methods }
}

export function union(types, options) {
  const { variants, methods } = safeUnion(types, options)
  for (const key in methods) {
    variants[key] = methods[key]
  }
  return variants
}