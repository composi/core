import { EMPTY_OBJECT, EMPTY_ARRAY, TEXT_NODE } from './constants'

/**
 * @typedef {Object.<string, any> | {}} Props
 * @property {Children} Props.children
 */
/**
 * @typedef {VNode[]} Children
 */
/**
 * @typedef {string | number | Function} Type
 * @typedef {number | string | null} Key
 * @typedef {Object.<string, any>} VNode
 * @property {Type} VNode.type
 * @property {Props} VNode.props
 * @property {Children} VNode.children
 * @property {Element} VNode.node
 * @property {Key} [VNode.key]
 * @property {number} VNode.flag
 */
/**
 * Create a virtual node with the provided properties.
 * @param {string | Function} type
 * @param {Props} props
 * @param {Children} children
 * @param {Element} node
 * @param {string | number | null} key
 * @param {number} [flag]
 * @return {VNode} VNode
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
 * @return {VNode} VNode
 */
export function createTextVNode(value, node) {
  return createVNode(value, EMPTY_OBJECT, EMPTY_ARRAY, node, null, TEXT_NODE)
}
