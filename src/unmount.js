/**
 * Function to unmount a mounted functional component. This deletes the base element of the component from the DOM.
 * @example
 * 
 * ```
 * // First mount component:
 * let title = mount(<Title message='Hello World!'/>, 'header')
 * // Sometime later unmount it by passing the vnode to unmount:
 * unmount(title)
 ```
 * @typedef {import('./vnode').VNode} VNode
 * @param {VNode} vnode The virtual node of the component to unmount.
 * @return {void} undefined
 */
export function unmount(vnode) {
  /**
   * Function to remove the base element of a functional component from the DOM.
   * @return {void} undefined
   */
  function doneUnmounting() {
    vnode.element.parentNode.removeChild(vnode.element)
    vnode.element = null
  }
  if (vnode.props['onunmount']) {
    vnode.props['onunmount'](doneUnmounting, vnode.element)
  } else {
    doneUnmounting()
  }
}
