/**
 * Create a virtual node with the provided properties.
 * @param {string | Function} type
 * @param {Composi.Props} props
 * @param {Composi.Children} children
 * @param {Element} node
 * @param {string | number | null} key
 * @param {number | null} [flag]
 * @return {Composi.VNode} VNode
 */
export function createVNode(type: TimerHandler, props: {} | {
    [x: string]: any;
}, children: Composi.VNode[], node: Element, key?: string | number, flag?: number): Composi.VNode;
/**
 * Create a virtual text node.
 * @param {string} value
 * @param {Element} [node]
 * @return {Composi.VNode} VNode
 */
export function createTextVNode(value: string, node?: Element): Composi.VNode;
import * as Composi from "./types";
