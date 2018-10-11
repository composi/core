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
 * }, 5000)```
 * @typedef {import('./vnode').VNode} VNode
 * @param {Element | string} container
 * @param {VNode} VNode
 * @return {void} undefined
 */
export function render(VNode, container, hydrateThis) {
  let __container = container
  if (typeof __container === 'string') {
    __container = document.querySelector(/** @type {string} */ (container))
  }
  // Hydrate an existing element.
  if (hydrateThis) {
    let hyd = hydrateThis
    if (typeof hyd === 'string') {
      hyd = /** @type {Element} */ (__container).querySelector(hyd)
    }
    hyd = hydrate(hyd)
    __container['vnode'] = patch(__container, VNode, hyd)
  } else if (__container['vnode']) {
    // Patch an already rendered component.
    patch(__container, VNode, __container['vnode'])
    __container['vnode'] = VNode
  } else {
    // Render component first time.
    __container['vnode'] = patch(__container, VNode)
  }
}
