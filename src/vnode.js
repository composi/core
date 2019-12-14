import {EMPTY_OBJECT, EMPTY_ARRAY, TEXT_NODE} from './constants'
import * as Composi from './types' // eslint-disable-line no-unused-vars

/**
 * Create a virtual node with the provided properties.
 * @param {string | Function} type
 * @param {Composi.Props} props
 * @param {Composi.Children} children
 * @param {Element} node
 * @param {string | number | null} key
 * @param {number | null} [flag]
 * @return {Composi.VNode} VNode
 */
export function createVNode(
  type,
  props,
  children,
  node,
  key = null,
  flag = null
) {
  return {
    type,
    props,
    children,
    node,
    flag,
    key
  }
}

/**
 * Create a virtual text node.
 * @param {string} value
 * @param {Element} [node]
 * @return {Composi.VNode} VNode
 */
export function createTextVNode(value, node) {
  return createVNode(value, EMPTY_OBJECT, EMPTY_ARRAY, node, null, TEXT_NODE)
}
