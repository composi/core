/**
 * The @composi/runtime.
 * @typedef {any} State
 * @typedef {Function} Effect
 * @typedef {Object<string, any>} Program
 * @prop {Function} Program.init
 * @prop {Function} Program.update
 * @prop {Function} Program.view
 * @prop {Function} [Program.done]
 * @param {Program} program
 * @return {() => void} Function to terminate runtime.
 */
export function run(program) {
  const update = program.update
  const view = program.view
  const done = program.done
  let state, effect
  let isRunning = true

  /**
   * Send a message.
   * @param {any} message A message of any type.
   * @return {void} undefined
   */
  function send(message) {
    if (isRunning) {
      updateView(update(message, state))
    }
  }

  /**
   * Handle changes to state and executing effects.
   * @param {any[]} update
   * @return {void} undefined
   */
  function updateView(update) {
    let init = program.init()
    if (update) {
      ;[state, effect] = update
    } else if (init && init.length) {
      ;[state, effect] = init
    } else {
      state = []
    }
    if (effect) {
      effect(send)
    }
    view(state, send)
  }

  updateView(state)

  /**
   * Function to end runtime.
   * @return {void} undefined
   */
  function endProgram() {
    if (isRunning) {
      isRunning = false
      if (done) {
        done(state)
      }
    }
  }
  return endProgram
}
