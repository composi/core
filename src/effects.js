/**
 * Function to batch effects together.
 * @param {...Function} effects
 * @return {Function} Function
 */
export const batchEffects = (...effects) => (state, send) =>
  effects.map(effect => effect && effect(state, send))
