import { createVNode, createTextVNode } from './vnode'

/**
 * Creates a virtual node representing an element node or text node to be created. This function must be imported into any file that contains JSX. Babel uses this function to convert JSX into JavaScript.
 * @typedef {import('./vnode').VNode} VNode
 * @param {string | Function} type
 * @param {Object.<string, any>} [props]
 * @return {VNode}
 */
export function h(type, props, ...children) {
  props = props || {}
  let node
  const tempBox = []
  const childNodes = []
  let length = children.length
  const key = props.key

  while (length-- > 0) tempBox.push(children[length])

  if (props.children) {
    if (tempBox.length <= 0) {
      tempBox.push(props.children)
    }
    delete props.children
  }

  while (tempBox.length > 0) {
    if (Array.isArray((node = tempBox.pop()))) {
      let length = node.length
      while (length-- > 0) {
        tempBox.push(node[length])
      }
    } else if (node === false || node === true || node == null) {
    } else {
      childNodes.push(typeof node === 'object' ? node : createTextVNode(node))
    }
  }

  if (typeof type === 'function') {
    return type(props, childNodes)
  } else {
    return createVNode(type, props, childNodes, null, key)
  }
}
