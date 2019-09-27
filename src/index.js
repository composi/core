export { h } from './h'
export { render } from './render'
export { run } from './runtime'
export { union } from './union'
export { batchEffects } from './effects'
export { Fragment } from './fragment'

/**
 * Make types available to programs that use them.
 */
/**
 * Type of virutal node used to define elements to create.
 * @typedef { import('./vnode').VNode } VNode
 */
/**
 * A program which is executed by the `run` function.
 * @typedef { import('./runtime').Program } Program
 */
/**
 * Message dispatched by the `send` function to the program's `update` method.
 * @typedef { import('./runtime').Message } Message
 */
/**
 * Type of state, which can be of any type.
 * @typedef { import('./runtime').State } State
 */
/**
 * Function for sending messages to the program's `update` method.
 * @typedef { import('./runtime').Send } Send
 */
