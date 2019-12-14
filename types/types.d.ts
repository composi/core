export type Props = {} | {
    [x: string]: any;
};
export type Children = VNode[];
export type Type = string | number | Function;
export type Key = string | number;
export type VNode = {
    type?: string | number | Function;
    props?: {} | {
        [x: string]: any;
    };
    children?: VNode[];
    node?: Element;
    key?: string | number;
    flag?: number;
};
export type Tag = {
    type: string;
    data?: any;
};
export type Message = {
    type: string;
    data?: any;
};
export type Send = (msg?: Function | Message, data?: any) => Message;
export type GetState = () => any;
/**
 * Simple or complex types for application state.
 */
export type State = any;
/**
 * Return result of program init method.
 */
export type InitResult = any;
/**
 * A program to run.
 */
export type Program = {
    /**
     * Method to set up initial state.
     */
    init: () => any;
    /**
     * Method to present the current application state.
     */
    view: (state: any, send?: (msg?: Function | Message, data?: any) => Message) => void;
    /**
     * Method to capture messages sent from view or subscriptions. According to the message, an action will transform application state and pass it the the program view method.
     */
    update: (state: any, msg?: Message, send?: (msg?: Function | Message, data?: any) => Message) => any;
    /**
     * Method to run effects when the program starts. These run independently from the rest of the program.
     */
    subscriptions?: (send?: (msg?: Function | Message, data?: any) => Message, getState?: () => any) => void;
    /**
     * Shortcut for subscriptions.
     */
    subs?: (send?: (msg?: Function | Message, data?: any) => Message, getState?: () => any) => void;
    /**
     * Method to do clean up when shutting down a program.
     */
    done?: (state: any) => void;
    /**
     * A static send function for dispatching message to a program. Used with routers and in composition.
     */
    send?: (msg?: Function | Message, data?: any) => Message;
};
