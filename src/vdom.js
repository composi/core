import {
  RECYCLED_NODE,
  TEXT_NODE,
  XLINK_NS,
  SVG_NS,
  LIFECYCLE
} from './constants'
import { mergeObjects } from '@composi/merge-objects'

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
 * @param {VNode} vnode
 * @return {string | number | null}
 */
function getKey(vnode) {
  return vnode == null ? null : vnode.key
}

/**
 * Create a map of keyed nodes.
 * @typedef {import('./vnode').Children} Children
 * @param {Children} children
 * @param {number} startCount
 * @param {number} end
 * @return {Object.<string, any>} Object.<string, any>
 */
function createKeyMap(children, startCount, end) {
  const out = {}
  let key
  let vnode

  while (startCount <= end) {
    if ((key = (vnode = children[startCount]).key) != null) {
      out[key] = vnode
    }
    startCount++
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
  if (prop === 'key') {
    return
  } else if (prop === 'style' && typeof newValue === 'object') {
    for (let i in mergeObjects(oldValue, newValue)) {
      const style = newValue == null || newValue[i] == null ? '' : newValue[i]
      if (i[0] === '-') {
        element[prop].setProperty(i, style)
      } else {
        element[prop][i] = style
      }
    }
  } else {
    if (prop[0] === 'o' && prop[1] === 'n') {
      prop = prop.slice(2).toLowerCase()

      if (!element['events']) element['events'] = {}

      element['events'][prop] = newValue

      if (newValue == null) {
        element.removeEventListener(prop, eventProxy)
      } else if (oldValue == null) {
        element.addEventListener(prop, eventProxy)
      }
    } else {
      let nullOrFalse = newValue == null || newValue === false

      if (prop !== 'list' && prop in element && !isSVG) {
        element[prop] = newValue == null ? '' : newValue
      } else if (nullOrFalse) {
        element.removeAttribute(prop)
      } else {
        if (prop === 'xlink-href' || prop === 'xlinkHref') {
          element.setAttributeNS(XLINK_NS, 'href', newValue)
          element.setAttribute('href', newValue)
        } else {
          element.setAttribute(prop, newValue)
        }
      }
    }
  }
}

/**
 * Create an element, either node or text, from a VNode.
 * @typedef {Function[]} Lifecycle
 * @param {VNode} vnode
 * @param {boolean} [isSVG]
 * @return {Element} Element
 */
function createElement(vnode, isSVG) {
  let element
  if (vnode.flag === TEXT_NODE) {
    element = document.createTextNode(/** @type {string} */ (vnode.type))
  } else {
    if ((isSVG = isSVG || vnode.type === 'svg')) {
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
    LIFECYCLE.push(function() {
      props['onmount'](element)
    })
  }
  let idx = 0
  const length = vnode.children.length
  while (idx < length) {
    element.appendChild(createElement(vnode.children[idx], isSVG))
    idx++
  }

  for (let prop in props) {
    setProp(/** @type {Element} */ (element), prop, null, props[prop], isSVG)
  }

  return (vnode.element = /** @type {Element} */ (element))
}

/**
 * Remove children from a node.
 * @param {VNode} node
 * @return {Element}
 */
function removeChildren(node) {
  let idx = 0
  const length = node.children.length
  while (idx < length) {
    removeChildren(node.children[idx])
    idx++
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
  const done = function() {
    parent.removeChild(removeChildren(vnode))
  }

  const cb = vnode.props && vnode.props['onunmount']
  if (cb != null) {
    cb(done, vnode.element)
  } else {
    done()
  }
}

/**
 * Update an element based on new prop values.
 * @typedef {import('./vnode').Props} Props
 * @param {Element} element
 * @param {Props} oldProps
 * @param {Props} newProps
 * @param {boolean} isSVG
 * @return {void} undefined
 */
function updateElement(element, oldProps, newProps, isSVG) {
  for (let prop in mergeObjects(oldProps, newProps)) {
    if (
      (prop === 'value' || prop === 'checked'
        ? element[prop]
        : oldProps[prop]) !== newProps[prop]
    ) {
      setProp(element, prop, oldProps[prop], newProps[prop], isSVG)
    }
  }

  const cb =
    element['vnode'] && Reflect.get(element['vnode'], 'type') === RECYCLED_NODE
      ? newProps['onmount']
      : newProps['onupdate']
  if (cb != null) {
    LIFECYCLE.push(function() {
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
 * @param {boolean} [isSVG]
 * @return {VNode}
 */
function patchElement(parent, element, oldVNode, newVNode, isSVG) {
  if (newVNode === oldVNode) {
  } else if (
    oldVNode != null &&
    oldVNode.flag === TEXT_NODE &&
    newVNode.flag === TEXT_NODE
  ) {
    if (oldVNode.type !== newVNode.type) {
      element.nodeValue = /** @type {any} */ (newVNode.type)
    }
  } else if (oldVNode == null || oldVNode.type !== newVNode.type) {
    const newElement = parent.insertBefore(
      createElement(newVNode, isSVG),
      element
    )

    if (oldVNode != null) removeElement(parent, oldVNode)

    element = newElement
  } else {
    updateElement(
      element,
      oldVNode.props,
      newVNode.props,
      (isSVG = isSVG || newVNode.type === 'svg')
    )

    let savedNode
    let childNode

    let lastKey
    let lastChildren = oldVNode.children
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
        element,
        lastChildren[lastChildStart].element,
        lastChildren[lastChildStart],
        nextChildren[nextChildStart],
        isSVG
      )

      lastChildStart++
      nextChildStart++
    }

    while (nextChildStart <= nextChildEnd && lastChildStart <= lastChildEnd) {
      lastKey = getKey(lastChildren[lastChildEnd])
      nextKey = getKey(nextChildren[nextChildEnd])

      if (lastKey == null || lastKey !== nextKey) break

      patchElement(
        element,
        lastChildren[lastChildEnd].element,
        lastChildren[lastChildEnd],
        nextChildren[nextChildEnd],
        isSVG
      )

      lastChildEnd--
      nextChildEnd--
    }

    if (lastChildStart > lastChildEnd) {
      while (nextChildStart <= nextChildEnd) {
        element.insertBefore(
          createElement(nextChildren[nextChildStart++], isSVG),
          (childNode = lastChildren[lastChildStart]) && childNode.element
        )
      }
    } else if (nextChildStart > nextChildEnd) {
      while (lastChildStart <= lastChildEnd) {
        removeElement(element, lastChildren[lastChildStart++])
      }
    } else {
      const lastKeyed = createKeyMap(lastChildren, lastChildStart, lastChildEnd)
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
            removeElement(element, childNode)
          }
          lastChildStart++
          continue
        }

        if (nextKey == null || oldVNode.flag === RECYCLED_NODE) {
          if (lastKey == null) {
            patchElement(
              element,
              childNode && childNode.element,
              childNode,
              nextChildren[nextChildStart],
              isSVG
            )
            nextChildStart++
          }
          lastChildStart++
        } else {
          if (lastKey === nextKey) {
            patchElement(
              element,
              childNode.element,
              childNode,
              nextChildren[nextChildStart],
              isSVG
            )
            nextKeyed[nextKey] = true
            lastChildStart++
          } else {
            if ((savedNode = lastKeyed[nextKey]) != null) {
              patchElement(
                element,
                element.insertBefore(
                  savedNode.element,
                  childNode && childNode.element
                ),
                savedNode,
                nextChildren[nextChildStart],
                isSVG
              )
              nextKeyed[nextKey] = true
            } else {
              patchElement(
                element,
                childNode && childNode.element,
                null,
                nextChildren[nextChildStart],
                isSVG
              )
            }
          }
          nextChildStart++
        }
      }

      while (lastChildStart <= lastChildEnd) {
        if (getKey((childNode = lastChildren[lastChildStart++])) == null) {
          removeElement(element, childNode)
        }
      }

      for (let key in lastKeyed) {
        if (nextKeyed[key] == null) {
          removeElement(element, lastKeyed[key])
        }
      }
    }
  }

  if (element) {
    newVNode.element = element
  }
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
export function patch(oldVNode, newVNode, container) {
  if (typeof container === 'string') {
    container = document.querySelector(container)
  }

  if (Array.isArray(newVNode)) throw new FragmentError()
  patchElement(container, oldVNode && oldVNode.element, oldVNode, newVNode)

  if (newVNode !== oldVNode) {
    while (LIFECYCLE.length > 0) LIFECYCLE.pop()()
  }

  return newVNode
}
