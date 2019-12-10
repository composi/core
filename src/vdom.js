import { RECYCLED_NODE, TEXT_NODE, EMPTY_OBJECT, LIFECYCLE } from './constants'
import { createTextVNode, createVNode } from './vnode'

/**
 * Determin whether the old and new props are identical.
 * @typedef {import('./vnode').Props} Props
 * @param {Props} oldVProps
 * @param {Props} newVProps
 */
const areNotEqual = (oldVProps, newVProps) => (JSON.stringify(oldVProps) !== JSON.stringify(newVProps))

/**
 * @typedef {import('./vnode').VNode} VNode
 */
/**
 * Return the combination of two objects of props.
 * @param {Object<string, any>} a
 * @param {Object<string, any>} b
 */
export const mergeObjects = (a, b) => Object.assign({}, a, b)

/**
 * Handle inline events.
 * @param {Event} event
 */
function listener(event) {
  this.handlers[event.type](event)
}
/**
 * Update the properties and attributes of a VNode based on new data.
 * @param {Element} node
 * @param {string} prop
 * @param {any} oldValue
 * @param {any} newValue
 * @param {boolean} isSVG
 * @return {void} undefined
 */
function patchProperty(node, prop, oldValue, newValue, isSVG) {
  if (prop === 'key') {
  } else if (prop === 'style' && typeof newValue === 'object') {
    for (let i in mergeObjects(oldValue, newValue)) {
      const style = newValue == null || newValue[i] == null ? '' : newValue[i]
      i[0] === '-'
        ? node[prop].setProperty(i, style)
        : node[prop][i] = style
    }
  } else if (prop[0] === 'o' && prop[1] === 'n') {
    !((node['handlers'] || (node['handlers'] = {}))[(prop = prop.slice(2))] = newValue)
      ? node.removeEventListener(prop, listener)
      : null;
    (!oldValue)
      ? node.addEventListener(prop, listener)
      : null
  } else if (
    prop !== 'list' &&
    prop !== 'form' &&
    prop !== 'type' &&
    prop !== 'draggable' &&
    prop !== 'spellcheck' &&
    prop in node &&
    !isSVG
  ) {
    node[prop] = newValue == null ? '' : newValue
  } else if (newValue == null || newValue === false) {
    node.removeAttribute(prop)
  } else {
    node.setAttribute(prop, newValue)
  }
}

/**
 * Create node from vnode.
 * @param {VNode} vnode
 * @param {Function[]} LIFECYCLE
 * @param {boolean} isSVG
 */
function createNode(vnode, LIFECYCLE, isSVG) {
  const type = String(vnode.type)
  const node =
    vnode.flag === TEXT_NODE
      ? document.createTextNode(type)
      : (isSVG = isSVG || type === 'svg') // eslint-disable-line no-cond-assign
      ? document.createElementNS('http://www.w3.org/2000/svg', type)
      : document.createElement(type)
  const props = vnode.props
  if (props['onmount']) {
    LIFECYCLE.push(function() {
      props['onmount'](node)
    })
  }

  for (let k in props) {
    patchProperty(/** @type {Element} */ (node), k, null, props[k], isSVG)
  }

  for (let i = 0, len = vnode.children.length; i < len; i++) {
    node.appendChild(createNode(vnode.children[i], LIFECYCLE, isSVG))
  }

  return (vnode.node = /** @type{Element} */ (node))
}

/**
 * Get key of vnode element.
 * @param {VNode} vnode
 * @returns {null | string | number} null | string | number
 */
const getKey = vnode => vnode == null ? null : vnode.key

/**
 * Remove child node.
 * @param {VNode} vnode
 * @returns {Node} node
 */
function removeChildren(vnode) {
  for (let i = 0, length = vnode.children.length; i < length; i++) {
    removeChildren(vnode.children[i])
  }

  const cb = vnode.props['ondestroy']
  cb != null && cb(vnode.node)

  return vnode.node
}

/**
 * Remove element from DOM.
 * @param {Node} parent
 * @param {VNode} vnode
 * @returns {void} undefined
 */
function removeElement(parent, vnode) {
  const remove = function() {
    parent.removeChild(removeChildren(vnode))
  }

  const cb = vnode.props && vnode.props['onunmount']
  cb != null
    ? cb(vnode.node, remove)
    : remove()
}

/**
 * Patch element in DOM according to new props.
 * @param {Node} parent
 * @param {Node} node
 * @param {any} oldVNode
 * @param {any} newVNode
 * @param {boolean} [isSVG]
 */
function patchNode(parent, node, oldVNode, newVNode, isSVG) {
  if (oldVNode === newVNode) {
  } else if (
    oldVNode != null
      && oldVNode.flag === TEXT_NODE
      && newVNode.flag === TEXT_NODE
  ) {
    if (oldVNode.type !== newVNode.type) {
      node.nodeValue = newVNode.type
    }
  } else if (oldVNode == null || oldVNode.type !== newVNode.type) {
    node = parent.insertBefore(createNode(newVNode, LIFECYCLE, isSVG), node)
    if (oldVNode != null) {
      removeElement(parent, oldVNode)
    }
  } else {
    let tmpVKid
    let oldVKid

    let oldKey
    let newKey

    const oldVProps = oldVNode.props
    const newVProps = newVNode.props

    const oldVKids = oldVNode.children
    const newVKids = newVNode.children

    let oldHead = 0
    let newHead = 0
    let oldTail = oldVKids.length - 1
    let newTail = newVKids.length - 1

    isSVG = isSVG || newVNode.type === 'svg'

    for (let i in mergeObjects(oldVProps, newVProps)) {
      (
        (i === 'value' || i === 'selected' || i === 'checked'
          ? node[i]
          : oldVProps[i]) !== newVProps[i]
      )
        && (() => {
          patchProperty(
          /** @type{Element} */(node),
            i,
            oldVProps[i],
            newVProps[i],
            isSVG
          )
          const cb = newVProps.onupdate
          cb != null
            && (areNotEqual(oldVProps, newVProps))
            && LIFECYCLE.push(function () {
              cb(node, oldVProps, newVProps)
            })
        })()
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = getKey(oldVKids[oldHead])) == null ||
        oldKey !== getKey(newVKids[newHead])
      ) {
        break
      }

      patchNode(
        node,
        oldVKids[oldHead].node,
        oldVKids[oldHead++],
        newVKids[newHead++],
        isSVG
      )
    }

    while (newHead <= newTail && oldHead <= oldTail) {
      if (
        (oldKey = getKey(oldVKids[oldTail])) == null ||
        oldKey !== getKey(newVKids[newTail])
      ) {
        break
      }

      patchNode(
        node,
        oldVKids[oldTail].node,
        oldVKids[oldTail--],
        newVKids[newTail--],
        isSVG
      )
    }

    if (oldHead > oldTail) {
      while (newHead <= newTail) {
        node.insertBefore(
          createNode(newVKids[newHead++], LIFECYCLE, isSVG),
          (oldVKid = oldVKids[oldHead]) && oldVKid.node
        )
      }
    } else if (newHead > newTail) {
      while (oldHead <= oldTail) {
        removeElement(node, oldVKids[oldHead++])
      }
    } else {
      let i
      let keyed
      let newKeyed
      for (i = oldHead, keyed = {}, newKeyed = {}; i <= oldTail; i++) {
        if ((oldKey = oldVKids[i].key) != null) {
          keyed[oldKey] = oldVKids[i]
        }
      }

      while (newHead <= newTail) {
        oldKey = getKey((oldVKid = oldVKids[oldHead]))
        newKey = getKey(newVKids[newHead])

        if (
          newKeyed[oldKey] ||
          (newKey != null && newKey === getKey(oldVKids[oldHead + 1]))
        ) {
          if (oldKey == null) {
            removeElement(node, oldVKid)
          }
          oldHead++
          continue
        }

        if (newKey == null || oldVNode.flag === RECYCLED_NODE) {
          if (oldKey == null) {
            patchNode(
              node,
              oldVKid && oldVKid.node,
              oldVKid,
              newVKids[newHead],
              isSVG
            )
            newHead++
          }
          oldHead++
        } else {
          if (oldKey === newKey) {
            patchNode(node, oldVKid.node, oldVKid, newVKids[newHead], isSVG)
            newKeyed[newKey] = true
            oldHead++
          } else {
            if ((tmpVKid = keyed[newKey]) != null) {
              patchNode(
                node,
                node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node),
                tmpVKid,
                newVKids[newHead],
                isSVG
              )
              newKeyed[newKey] = true
            } else {
              patchNode(
                node,
                oldVKid && oldVKid.node,
                null,
                newVKids[newHead],
                isSVG
              )
            }
          }
          newHead++
        }
      }

      while (oldHead <= oldTail) {
        (getKey((oldVKid = oldVKids[oldHead++])) == null)
          && removeElement(node, oldVKid)
      }

      for (let i in keyed) {
        (newKeyed[i] == null)
          && removeElement(node, keyed[i])
      }
    }
  }

  return (newVNode.node = node)
}

function recycleNode(node) {
  return node.nodeType === TEXT_NODE
    ? createTextVNode(node.nodeValue, node)
    : createVNode(
        node.nodeName.toLowerCase(),
        EMPTY_OBJECT,
        Array.prototype.map.call(node.childNodes, recycleNode),
        node,
        null,
        RECYCLED_NODE
      )
}

/**
 * Patch DOM with virtual node from functional component.
 * @param {Node} node
 * @param {VNode} vdom
 */
export function patch(node, vdom) {
  if (!node['vdom']) {
    if (vdom.props['onmount']) {
      LIFECYCLE.push(function() {
        vdom.props['onmount'](node)
      })
    }
  }
  const vnode = (patchNode(
    node.parentNode,
    node,
    node['vdom'] || recycleNode(node),
    vdom
  )['vdom'] = vdom)
  while (LIFECYCLE.length > 0) LIFECYCLE.pop()()
  return vnode
}
