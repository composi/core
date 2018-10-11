import { RECYCLED_NODE, TEXT_NODE, XLINK_NS, SVG_NS } from './constants'
import { mergeObjects } from '@composi/merge-objects'
import { getType } from '@composi/get-type'

/**
 * Event proxy for inline events.
 * @param {Event} event
 * @return {any} any
 */
function eventProxy(event) {
  return event.currentTarget['events'][event.type](event)
}

/**
 * Get the key value of a virtual node.
 * @typedef {import('./vnode').VNode} VNode
 * @param {VNode} node
 * @return {string | number | null}
 */
function getKey(node) {
  return node == null ? null : node.key
}

/**
 * Create a map of keyed nodes.
 * @typedef {import('./vnode').Children} Children
 * @param {Children} children
 * @param {number} start
 * @param {number} end
 * @return {Object.<string, any>} Object.<string, any>
 */
function createKeyMap(children, start, end) {
  let startCount = start
  const out = {}
  let key
  let node

  for (; startCount <= end; startCount++) {
    if ((key = (node = children[startCount]).key) != null) {
      out[key] = node
    }
  }

  return out
}

/**
 * Update the properties and attributes of a VNode based on new data.
 * @param {Element} element
 * @param {string} prop
 * @param {any} oldValue
 * @param {any} newValue
 * @param {boolean} isSVG
 * @return {void} undefined
 */
function setProp(element, prop, oldValue, newValue, isSVG) {
  let __prop = prop
  let oldVal = oldValue
  if (oldVal === newValue) return
  if (__prop === 'style' && getType(newValue) === 'Object') {
    for (let i in mergeObjects(oldVal, newValue)) {
      const style = newValue == null || newValue[i] == null ? '' : newValue[i]
      if (i[0] === '-') {
        element[__prop].setProperty(i, style)
      } else {
        element[__prop][i] = style
      }
    }
  } else if (__prop !== 'key') {
    if (__prop === 'className') __prop = 'class'

    if (__prop[0] === 'o' && __prop[1] === 'n') {
      if (!element['events']) element['events'] = {}
      __prop = __prop.slice(2).toLowerCase()
      if (!oldVal) oldVal = element['events'][__prop]
      element['events'][__prop] = newValue

      if (newValue == null) {
        element.removeEventListener(__prop, eventProxy)
      } else if (oldVal == null) {
        element.addEventListener(__prop, eventProxy)
      }
    } else {
      const nullOrFalse =
        newValue == null ||
        newValue === false ||
        newValue === 'no' ||
        newValue === 'off'

      if (
        __prop in element &&
        __prop !== 'list' &&
        __prop !== 'type' &&
        __prop !== 'draggable' &&
        __prop !== 'spellcheck' &&
        __prop !== 'translate' &&
        !isSVG
      ) {
        element[__prop] = newValue == null ? '' : newValue
        if (nullOrFalse) {
          element.removeAttribute(__prop)
        }
      } else {
        if (__prop === 'xlink-href' || __prop === 'xlinkHref') {
          element.setAttributeNS(XLINK_NS, 'href', newValue)
          element.setAttribute('href', newValue)
        } else {
          if (nullOrFalse) {
            element.removeAttribute(__prop)
          } else {
            element.setAttribute(__prop, newValue)
          }
        }
      }
    }
  }
}

/**
 * Create an element, either node or text, from a VNode.
 * @typedef {Function[]} Lifecycle
 * @param {VNode} vnode
 * @param {Lifecycle} lifecycle
 * @param {boolean} [isSVG]
 * @return {Element}
 */
export function createElement(vnode, lifecycle, isSVG) {
  let __isSVG = isSVG
  let element
  if (vnode.flag === TEXT_NODE) {
    element = document.createTextNode(/** @type {string} */ (vnode.type))
  } else {
    if ((__isSVG = __isSVG || vnode.type === 'svg')) {
      element = document.createElementNS(
        SVG_NS,
        /** @type {string} */ (vnode.type)
      )
    } else {
      element = document.createElement(/** @type {string} */ (vnode.type))
    }
  }

  const props = vnode.props
  if (props['onmount']) {
    lifecycle.push(function() {
      props['onmount'](element)
    })
  }

  for (let i = 0, length = vnode.children.length; i < length; i++) {
    element.appendChild(createElement(vnode.children[i], lifecycle, __isSVG))
  }

  for (let prop in props) {
    setProp(/** @type {Element} */ (element), prop, null, props[prop], __isSVG)
  }

  return (vnode.element = /** @type {Element} */ (element))
}

/**
 * Remove children from a node.
 * @param {VNode} node
 * @return {Element}
 */
function removeChildren(node) {
  for (let i = 0, length = node.children.length; i < length; i++) {
    removeChildren(node.children[i])
  }
  return node.element
}

/**
 * Remove an element from the DOM.
 * @param {Element} parent
 * @param {VNode} vnode
 * @return {void} undefined
 */
function removeElement(parent, vnode) {
  function done() {
    if (parent && parent.nodeType) parent.removeChild(removeChildren(vnode))
  }

  const cb = vnode.props && vnode.props['onunmount']
  if (cb != null) {
    cb(done, vnode.element)
  } else {
    done()
  }
}

/**
 * Update and element based on new prop values.
 * @typedef {import('./vnode').Props} Props
 * @param {Element} element
 * @param {Props} oldProps
 * @param {Props} newProps
 * @param {Lifecycle} lifecycle
 * @param {boolean} isSVG
 * @param {boolean} isRecycled
 * @return {void} undefined
 */
function updateElement(
  element,
  oldProps,
  newProps,
  lifecycle,
  isSVG,
  isRecycled
) {
  for (let prop in mergeObjects(oldProps, newProps)) {
    if (
      (prop === 'value' || prop === 'checked'
        ? element[prop]
        : oldProps[prop]) !== newProps[prop]
    ) {
      setProp(element, prop, oldProps[prop], newProps[prop], isSVG)
    }
  }

  const cb = isRecycled ? newProps['onmount'] : newProps['onupdate']
  if (cb != null) {
    lifecycle.push(function() {
      cb(element, oldProps, newProps)
    })
  }
}

/**
 * Patch an element based on differences between its old VNode and its new one.
 * @param {Element} parent
 * @param {Element} element
 * @param {VNode} oldVNode
 * @param {VNode} newVNode
 * @param {Lifecycle} lifecycle
 * @param {boolean} [isSVG]
 * @return {VNode}
 */
export function patchElement(
  parent,
  element,
  oldVNode,
  newVNode,
  lifecycle,
  isSVG
) {
  let __element = element
  let __isSVG = isSVG
  // Abort if vnodes are identical.
  if (newVNode === oldVNode) {
  } else if (
    oldVNode != null &&
    oldVNode.flag === TEXT_NODE &&
    newVNode.flag === TEXT_NODE
  ) {
    if (oldVNode.type !== newVNode.type) {
      __element.nodeValue = /** @type {string} */ (newVNode.type)
    }
  } else if (oldVNode == null || oldVNode.type !== newVNode.type) {
    const newElement = parent.insertBefore(
      createElement(newVNode, lifecycle, __isSVG),
      __element
    )

    if (oldVNode != null) removeElement(parent, oldVNode)

    __element = newElement
  } else {
    updateElement(
      __element,
      oldVNode.props,
      newVNode.props,
      lifecycle,
      (__isSVG = __isSVG || newVNode.type === 'svg'),
      oldVNode.flag === RECYCLED_NODE
    )

    let savedNode
    let childNode

    let lastKey
    const lastChildren = oldVNode.children
    let lastChildStart = 0
    let lastChildEnd = lastChildren.length - 1

    let nextKey
    const nextChildren = newVNode.children
    let nextChildStart = 0
    let nextChildEnd = nextChildren.length - 1

    while (nextChildStart <= nextChildEnd && lastChildStart <= lastChildEnd) {
      lastKey = getKey(lastChildren[lastChildStart])
      nextKey = getKey(nextChildren[nextChildStart])

      if (lastKey == null || lastKey !== nextKey) break

      patchElement(
        __element,
        lastChildren[lastChildStart].element,
        lastChildren[lastChildStart],
        nextChildren[nextChildStart],
        lifecycle,
        __isSVG
      )

      lastChildStart++
      nextChildStart++
    }

    while (nextChildStart <= nextChildEnd && lastChildStart <= lastChildEnd) {
      lastKey = getKey(lastChildren[lastChildEnd])
      nextKey = getKey(nextChildren[nextChildEnd])

      if (lastKey == null || lastKey !== nextKey) break

      patchElement(
        __element,
        lastChildren[lastChildEnd].element,
        lastChildren[lastChildEnd],
        nextChildren[nextChildEnd],
        lifecycle,
        __isSVG
      )

      lastChildEnd--
      nextChildEnd--
    }

    if (lastChildStart > lastChildEnd) {
      while (nextChildStart <= nextChildEnd) {
        __element.insertBefore(
          createElement(nextChildren[nextChildStart++], lifecycle, __isSVG),
          (childNode = lastChildren[lastChildStart]) && childNode.element
        )
      }
    } else if (nextChildStart > nextChildEnd) {
      while (lastChildStart <= lastChildEnd) {
        removeElement(__element, lastChildren[lastChildStart++])
      }
    } else {
      let lastKeyed = createKeyMap(lastChildren, lastChildStart, lastChildEnd)
      const nextKeyed = {}

      while (nextChildStart <= nextChildEnd) {
        lastKey = getKey((childNode = lastChildren[lastChildStart]))
        nextKey = getKey(nextChildren[nextChildStart])

        if (
          nextKeyed[lastKey] ||
          (nextKey != null &&
            nextKey === getKey(lastChildren[lastChildStart + 1]))
        ) {
          if (lastKey == null) {
            removeElement(__element, childNode)
          }
          lastChildStart++
          continue
        }

        if (nextKey == null || oldVNode.flag === RECYCLED_NODE) {
          if (lastKey == null) {
            patchElement(
              __element,
              childNode && childNode.element,
              childNode,
              nextChildren[nextChildStart],
              lifecycle,
              __isSVG
            )
            nextChildStart++
          }
          lastChildStart++
        } else {
          if (lastKey === nextKey) {
            patchElement(
              __element,
              childNode.element,
              childNode,
              nextChildren[nextChildStart],
              lifecycle,
              __isSVG
            )
            nextKeyed[nextKey] = true
            lastChildStart++
          } else {
            if ((savedNode = lastKeyed[nextKey]) != null) {
              patchElement(
                __element,
                __element.insertBefore(
                  savedNode.element,
                  childNode && childNode.element
                ),
                savedNode,
                nextChildren[nextChildStart],
                lifecycle,
                __isSVG
              )
              nextKeyed[nextKey] = true
            } else {
              patchElement(
                __element,
                childNode && childNode.element,
                null,
                nextChildren[nextChildStart],
                lifecycle,
                __isSVG
              )
            }
          }
          nextChildStart++
        }
      }

      while (lastChildStart <= lastChildEnd) {
        if (getKey((childNode = lastChildren[lastChildStart++])) == null) {
          removeElement(__element, childNode)
        }
      }

      for (let key in lastKeyed) {
        if (nextKeyed[key] == null) {
          removeElement(__element, lastKeyed[key])
        }
      }
    }
  }

  newVNode.element = __element
  return newVNode
}

/**
 * Class to throw error message when attempting to insert Fragement tag directly into DOM.
 * @return {string} message
 */
export class FragmentError {
  constructor() {
    this.message = 'Cannot insert Fragment tag directly into DOM.'
    this.toString = function() {
      return this.message
    }
  }
}

/**
 * Function to either mount an element the first time or patch it in place. This behavior depends on the value of the old VNode. If it is null, a new element will be created, otherwise it compares the new VNode with the old one and patches it.
 * @param {Element | string} container
 * @param {VNode} newVNode
 * @param {VNode} [oldVNode]
 * @return {VNode} VNode
 */
export function patch(container, newVNode, oldVNode) {
  let __container = container
  if (typeof __container === 'string') {
    __container = document.querySelector(__container)
  }
  const lifecycle = []

  if (!oldVNode) {
    if (Array.isArray(newVNode)) throw new FragmentError()
    const el = createElement(newVNode, lifecycle)
    __container.appendChild(el)
    newVNode.element = el
  } else {
    patchElement(
      __container,
      oldVNode['element'],
      oldVNode,
      newVNode,
      lifecycle
    )
  }

  if (newVNode !== oldVNode) {
    while (lifecycle.length > 0) lifecycle.pop()()
  }

  newVNode.element['isMounted'] = true
  return newVNode
}
