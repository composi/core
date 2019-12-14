/**
 * Creates a virtual node representing an element node or text node to be created. This function must be imported into any file that contains JSX. Babel uses this function to convert JSX into JavaScript.
 * @typedef {import('./types').VNode} VNode
 * @param {string | Function} type
 * @param {Object.<string, any>} [props]
 * @return {VNode}
 */
export function h(type: TimerHandler, props?: {
    [x: string]: any;
}, ...children: any[]): import("./types").VNode;
/**
 * Creates a virtual node representing an element node or text node to be created. This function must be imported into any file that contains JSX. Babel uses this function to convert JSX into JavaScript.
 */
export type VNode = {
    type?: string | number | Function;
    props?: {} | {
        [x: string]: any;
    };
    children?: import("./types").VNode[];
    node?: Element;
    key?: string | number;
    flag?: number;
};
