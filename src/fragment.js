/**
 * Returns a group of sibling elements for inclusion in another JSX tag.
 * @typedef {import('./vnode').VNode} VNode
 * @typedef {import('./vnode').Props} Props
 * @typedef {import('./vnode').Children} Children
 * @param {Props} props
 * @return {Children} children
 */
/**
 * A tag to enable returning sibling elements. This is useful for returning list items to render in a list or table cells to render in a table row.
 * @example
 *
 * ```
 * <Fragment>
 *   <li>A</li>
 *   <li>B</li>
 *   <li>C</li>
 * </Fragment>
 ```
 * Or functionally:
 * ```
 * Fragment(null, [
 *   h('li', {}, 'A'),
 *   h('li', {}, 'B'),
 *   h('li', {}, 'C')
 * ])
 ```
 * @param {Object} [props] When using Fragment as a function, props is the first argument. Provide either null or {} as the value for props.
 * @param {Children} [children] The siblings to return with the Fragment. This will be an array of sibling elements.
 * @return {VNode[]} An array of virtual nodes.
 */
export const Fragment = (props, children) =>
  Array.isArray(props) && !children ? props : children
