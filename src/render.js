import { patch } from './vdom'

/**
 * Render a functional component. The first argument is the component to render. This can be either a JSX tag or an `h` function. The second argument is the element to hydrate or update. During the first render, the target element is hydrated with the component provided. Further updates patch the existing element based on the virtual DOM.
 * @example
 *
 * ```
 * // Render Title tag into section:
 * render(<Title message='Hello World!'/>, 'section')
 * // Update the title component 5 seconds later:
 * setTimeout(() => {
 *   render(<Title message='Hello Everyone!'/>, 'section')
 * }, 5000)
 * ```
 * @typedef {import('./vnode').VNode} VNode
 * @param {VNode} vnode
 * @param {Element | string} target
 * @return {void} undefined
 */
export function render(vnode, target) {
  let oldTarget = ''
  if (typeof target === 'string') {
    oldTarget = target
    target = document.querySelector(target)
  }
  if (!target) {
    let msg = ''
    if (oldTarget) msg = ` The selector you provided was: "${oldTarget}"`
    console.error(
      `@composi/core Error: The second parameter for render function was invalid. Check the selector you provided and make sure that it exists in the DOM before trying to render. ${msg}`
    )
  }
  patch(target, vnode)
}
