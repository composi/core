import { patch } from './vdom'
import { hydrate } from './vnode'

/**
 * Render a functional component. The first argument is the component to render. This can be either a JSX tag or an `h` function. The second argument is the container to render in. An optional third argument is an element in the document loaded from the server. This will be hydrated with the component provided to render. This third argument can be a DOM referece for that element, or a valid string selector for it.
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
 * @param {Element | string} container
 * @param { Element | string } [hydrateThis]
 * @return {void} undefined
 */
export function render(VNode, container, hydrateThis) {
  if (typeof container === 'string') {
    container = document.querySelector(container)
  } else {
    container = container
  }
  if (!container) {
    console.error(
      '@composi/core Error: You need to provide a valid container to render the component in. Check the element or selector you provided and make sure that it exists in the DOM before trying to render.'
    )
    console.error(
      `@composi/core Message: The container you provided was "${container}"`
    )
    return
  }
  let oldVNode
  if (hydrateThis) {
    if (typeof hydrateThis === 'string') {
      hydrateThis = document.querySelector(hydrateThis)
    }
    oldVNode = hydrate(hydrateThis)
  } else {
    oldVNode = container && Reflect.get(container, 'vnode')
  }
  const vnode = patch(oldVNode, VNode, container)
  container['vnode'] = vnode
}
