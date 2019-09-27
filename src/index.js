export { h } from './h'
export { render } from './render'
export { run } from './runtime'
export { union } from './union'
export { batchEffects } from './effects'
export { Fragment } from './fragment'

/**
 * The following import is a hack to force TypeScript to properly
 * understand JSDoc types defined in the vnode.js file that are used by
 * fragment.js, h.js, render.js and vdom.js.
 * When TypeScript gets updated to handle this import properly, this will be removed.
 */
import { createVNode } from './vnode' // eslint-disable-line no-unused-vars
/**
 * Make Program type importable to projects.
 */
/**
 * @typedef { import('./runtime').Program } Program
 */
