/**
 * Map effects to enable composition of runtime programs.
 * @param {Function} effect
 * @param {Function} callback
 * @return {Function} Function
 */
export function mapEffect(effect, callback) {
  return send => intercept => message => {
    send(callback(message))
    return effect(intercept)
  }
}

/**
 * Function to batch effects together.
 * @param {Function[]} effects
 * @return {Function} Function
 */
export const batchEffects = effects => (state, send) =>
  effects.map(effect => effect && effect(state, send))
