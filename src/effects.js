/**
 * @typedef {import('./runtime').Send} Send
 * @typedef {import('./runtime').Message} Message
 * @typedef {Object} State
 * @typedef {() => State} GetState
 * @typedef {(getState: GetState, send: Send) => any} Effect
 */
/**
 * Function to batch effects together.
 * @param {...Effect} effects
 * @return {(getState: GetState, send: Send) => any} Function
 */
export const batchEffects = (...effects) => (getState, send) =>
  effects.map(effect => effect && effect(getState, send))
