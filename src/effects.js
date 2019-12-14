/**
 * @typedef {import('./types').Send} Send
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').State} State
 * @typedef {() => State} GetState
 * @typedef {(send?: Send, getState?: GetState) => any} Effect
 */
/**
 * Function to batch effects together.
 * @param {...Effect} effects
 * @return {(send?: Send, getState?: GetState) => void} Function
 */
export const batchEffects = (...effects) => (getState, send) =>
  effects.map(effect => effect && effect(getState, send))

export const batch = batchEffects
