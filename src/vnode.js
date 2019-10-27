import { EMPTY_OBJECT, EMPTY_ARRAY, TEXT_NODE } from './constants'

/**
 * @typedef {Object<string, any> | {}} Props
 * @prop {Children} Props.children
 * @prop {(Element) => void} [Props.onmount]
 * @prop {(Element, Object, Object) => void} [Props.onupdate]
 * @prop {(Element, (State) => void) => void} [Props.onunmount]
 */
/**
 * @typedef {VNode[]} Children
 */
/**
 * @typedef {string | number | Function} Type
 * @typedef {number | string | null} Key
 * @typedef {Object | {}} VNode
 * @prop {Type} type
 * @prop {Props} props
 * @prop {Children} children
 * @prop {Element} node
 * @prop {Key} [key]
 * @prop {number} flag
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
