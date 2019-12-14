export function batchEffects(...effects: ((send?: (msg?: Function | import("./types").Message, data?: any) => import("./types").Message, getState?: () => any) => any)[]): (send?: (msg?: Function | import("./types").Message, data?: any) => import("./types").Message, getState?: () => any) => void;
export function batch(...effects: ((send?: (msg?: Function | import("./types").Message, data?: any) => import("./types").Message, getState?: () => any) => any)[]): (send?: (msg?: Function | import("./types").Message, data?: any) => import("./types").Message, getState?: () => any) => void;
export type Send = (msg?: Function | import("./types").Message, data?: any) => import("./types").Message;
export type Message = {
    type: string;
    data?: any;
};
export type State = any;
export type GetState = () => any;
export type Effect = (send?: (msg?: Function | import("./types").Message, data?: any) => import("./types").Message, getState?: () => any) => any;
