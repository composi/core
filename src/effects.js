/**
 * Map effects to ease composition of runtime programs.
 * @param {Function} effect
 * @param {Function} callback
 * @return {Function} Function
 */
export function mapEffect(effect, callback) {
  if (!effect) {
    return
  }
  return send =>
    function intercept(message) {
      send(callback(message))
      return effect(intercept)
    }
}

/**
 * Function to batch effects together.
 * @param {Function[]} effects
 * @return {Function} Function
 */
export const batchEffects = effects => send =>
  effects.map(effect => effect(send))
