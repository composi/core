import { createVNode, createTextVNode } from './vnode'

/**
 * Creates a virtual node representing an element node or text node to be created. This function must be imported into any file that contains JSX. Babel uses this function to convert JSX into JavaScript.
 * @typedef {import('./types').VNode} VNode
 * @param {string | Function} type
 * @param {Object.<string, any>} [props]
 * @return {VNode}
 */
export function h(type, props, ...children) {
  props = props || {}
  let node
  const tempBox = []
  const childNodes = []
  let {length} = children
  const {key} = props

  while (length-- > 0) tempBox.push(children[length])

  props.children
    ? (tempBox.length <= 0)
    : tempBox.push(props.children)
  props.children && delete props.children

  while (tempBox.length > 0) {
    if (Array.isArray((node = tempBox.pop()))) {
      let {length} = node
      while (length-- > 0) {
        tempBox.push(node[length])
      }
    } else if (node === false || node === true || node == null) {
    } else {
      childNodes.push(typeof node === 'object' ? node : createTextVNode(node))
    }
  }

  return (typeof type === 'function')
    ? type(props, childNodes)
    : createVNode(type, props, childNodes, null, key)
}
