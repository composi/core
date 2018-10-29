/**
 * The @composi/runtime.
 * @typedef {any[]} State
 * @typedef {Function} Effect
 * @typedef {Object<string, any>} Program
 * @prop {Array<State, Effect>} Program.init
 * @prop {function} Program.update
 * @prop {function} Program.view
 * @prop {function} [Program.done]
 * @param {Program} program
 * @return {() => void} Function to terminate runtime.
 */
export function run(program) {
  const update = program.update
  const view = program.view
  const done = program.done
  let state
  let isRunning = true

  /**
   * Send a message.
   * @param {*} message A message of any type.
   * @return {void} undefined
   */
  function send(message) {
    if (isRunning) {
      change(update(message, state))
    }
  }

  /**
   * Handle changes to state and executing effects.
   * @param {any[]} change
   * @return {void} undefined
   */
  function change(change) {
    state = change[0]
    let effect = change[1]
    if (effect) {
      effect(send)
    }
    view(state, send)
  }

  change(program.init)

  /**
   * Function to end runtime.
   * @return {void} undefined
   */
  function end() {
    if (isRunning) {
      isRunning = false
      if (done) {
        done(state)
      }
    }
  }
  return end
}
