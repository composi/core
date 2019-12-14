/**
 * Patch DOM with virtual node from functional component.
 * @param {Node} node
 * @param {VNode} vdom
 */
export function patch(node: Node, vdom: import("./types").VNode): import("./types").VNode;
export function mergeObjects(a: {
    [x: string]: any;
}, b: {
    [x: string]: any;
}): {
    [x: string]: any;
} & {
    [x: string]: any;
};
/**
 * Determin whether the old and new props are identical.
 */
export type Props = {} | {
    [x: string]: any;
};
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
