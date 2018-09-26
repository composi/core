import { patch } from './vdom'

/**
 * A function to update a functional component already mounted in the DOM. The first argument can be either a JSX tag or an h function.
 * @example
 *
 * ```
 * // Update Title tag into section:
 * const element = mount(<Title message='Hello World!'/>, 'section')
 * // Pass the captured element to the render function:
 * render(<Title message='Hello Everyone!'/>, element, 'header')
 * ```
 * @typedef {import('./vnode').VNode} VNode
 * @param {VNode} newVNode
 * @param {Element | string} container
 * @param {VNode} [oldVNode]
 * @return {VNode} VNode
 */
export function render(newVNode, container, oldVNode) {
  return patch(newVNode, container, oldVNode)
}
