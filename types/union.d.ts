/**
 * @typedef {Object} MessageUnion
 */
/**
 * Create a union of types for matching up with functions. This is used to define actions for the `update` method of a runtime program.
 * @param {...string} types
 * @returns {MessageUnion} MessageUnion
 */
export function union(...types: string[]): any;
export type MessageUnion = any;
