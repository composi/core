import {
  EMPTY_OBJECT,
  EMPTY_ARRAY,
  TEXT_NODE,
  RECYCLED_NODE
} from './constants'

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
 * @property {Element} VNode.element
 * @property {Key} [VNode.key]
 * @property {number} VNode.flag
 */
/**
 * Create a virtual node with the provided properties.
 * @param {string | Function} type
 * @param {Props} props
 * @param {Children} children
 * @param {Element} element
 * @param {string | number | null} key
 * @param {number} flag
 * @return {VNode} VNode
 */
export function createVNode(type, props, children, element, key, flag) {
  if (!key) key = null
  return {
    type,
    props,
    children,
    element,
    key,
    flag
  }
}

/**
 * Create a virtual text node.
 * @param {string} text
 * @param {Element} [element]
 * @return {VNode} VNode
 */
export function createTextVNode(text, element) {
  if (!element) element = null
  return createVNode(text, EMPTY_OBJECT, EMPTY_ARRAY, element, null, TEXT_NODE)
}

/**
 * Create a virtual node represeting a DOM element and its children.
 * @param {Element} element
 * @return {VNode} VNode
 */
export function hydrate(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element)
  }
  // Clean node before using:
  removeWhiteSpaceNodes(element)

  return element.nodeType === TEXT_NODE
    ? createTextVNode(element.nodeValue, element)
    : createVNode(
        element.nodeName.toLowerCase(),
        EMPTY_OBJECT,
        EMPTY_ARRAY.map.call(element.childNodes, hydrate),
        element,
        null,
        RECYCLED_NODE
      )
}

/**
 * Function to remove whitespace nodes from DOM element.
 * This is to avoid unnecessary inclusion of
 * whitespace nodes in virtual node when hydrating.
 * @param {Element | Node} node
 * @returns {void} undefined
 */
function removeWhiteSpaceNodes(node) {
  for (let n = 0; n < node.childNodes.length; n++) {
    const child = node.childNodes[n]
    if (
      child.nodeType === 8 ||
      (child.nodeType === 3 && !/\S/.test(child.nodeValue))
    ) {
      node.removeChild(child)
      n--
    } else if (child.nodeType === 1) {
      removeWhiteSpaceNodes(child)
    }
  }
}
