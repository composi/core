/**
 * Used to determine if a vnode should be recycled.
 * @type {number}
 */
export const RECYCLED_NODE: number;
/**
 * Used in a vnode to indicate that it is a DOM node.
 * @type {number}
 */
export const ELEMENT_NODE: number;
/**
 * Used in a vnode to indicate that it is a text node.
 * @type {number}
 */
export const TEXT_NODE: number;
/**
 * Namespace for SVG elements with `xlink:href` attributes.
 * @type {string}
 */
export const XLINK_NS: string;
/**
 * Namespace for SVG elements.
 * @type {string}
 */
export const SVG_NS: string;
/**
 * An empty object. Used as placeholder for `props` in VNode.
 * @type {{}} EMPTY_OBJECT
 */
export const EMPTY_OBJECT: {};
/**
 * An empty array. Used for access to array methods.
 * @type {any[]} EMPTY_ARRAY
 */
export const EMPTY_ARRAY: any[];
/**
 * An array to store lifecycle hooks.
 * @type {any[]} LIFECYCLE
 */
export const LIFECYCLE: any[];
