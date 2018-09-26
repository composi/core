import { createVNode, createTextVNode } from './vnode'
import { ELEMENT_NODE } from './constants'

/**
 * Creates a virtual node representing a node or text node to be created.
 * @typedef {import('./vnode').VNode} VNode
 * @param {string | Function} type
 * @param {Object.<string, any>} props
 * @return {VNode}
 */
export function h(type, props, ...children) {
  let node
  const tempBox = []
  const childNodes = []
  let length = children.length
  props = props || {}
  const key = props.key

  while (length-- > 0) tempBox.push(children[length])

  if (props.children != null) {
    if (tempBox.length <= 0) {
      tempBox.push(props.children)
    }
    delete props.children
  }

  while (tempBox.length > 0) {
    if (Array.isArray((node = tempBox.pop()))) {
      for (length = node.length; length-- > 0; ) {
        tempBox.push(node[length])
      }
    } else if (node === false || node === true || node == null) {
    } else {
      childNodes.push(typeof node === 'object' ? node : createTextVNode(node))
    }
  }
  delete props.key

  if (typeof type === 'function') {
    return type(props, (props.children = childNodes))
  } else {
    return createVNode(type, props, childNodes, null, key, ELEMENT_NODE)
  }
}
