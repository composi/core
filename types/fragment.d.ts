export function Fragment(props?: any, children?: import("./types").VNode[]): import("./types").VNode[];
/**
 * Returns a group of sibling elements for inclusion in another JSX tag.
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
/**
 * Returns a group of sibling elements for inclusion in another JSX tag.
 */
export type Props = {} | {
    [x: string]: any;
};
/**
 * Returns a group of sibling elements for inclusion in another JSX tag.
 */
export type Children = import("./types").VNode[];
