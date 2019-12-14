/**
 * Render a functional component. The first argument is the component to render. This can be either a JSX tag or an `h` function. The second argument is the element to hydrate or update. During the first render, the target element is hydrated with the component provided. Further updates patch the existing element based on the virtual DOM.
 * @example
 *
 * ```
 * // Render Title tag into section:
 * render(<Title message='Hello World!'/>, 'section')
 * // Update the title component 5 seconds later:
 * setTimeout(() => {
 *   render(<Title message='Hello Everyone!'/>, 'section')
 * }, 5000)
 * ```
 * @typedef {import('./types').VNode} VNode
 * @param {VNode} vnode
 * @param {Element | string} target
 * @return {void} undefined
 */
export function render(vnode: import("./types").VNode, target: string | Element): void;
/**
 * Render a functional component. The first argument is the component to render. This can be either a JSX tag or an `h` function. The second argument is the element to hydrate or update. During the first render, the target element is hydrated with the component provided. Further updates patch the existing element based on the virtual DOM.
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
