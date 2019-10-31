/**
 * @typedef {Object<string, any>} Message
 * @prop {string} type
 * @prop {any} [data]
 * @typedef {(msg?: Message) => Message} Send
 * @typedef {() => State} GetState
 */
/**
 * @typedef {any} State Simple or complex types for application state.
 */
/**
 * @typedef {State | void} InitResult Return result of program init method.
 */
/**
 * @typedef {Object<string, any>} Program A program to run.
 * @prop {() => InitResult} init Method to set up initial state.
 * @prop {(state: State, send?: Send) => void} view Method to present the current application state.
 * @prop {(state: State, msg?: Message, send?: Send) => any} update Method to capture messages sent from view or subscriptions. According to the message, an action will transform application state and pass it the the program view method.
 * @prop {(getState: GetState, send: Send) => void} [subscriptions] Method to run effects when the program starts. These run independently from the rest of the program.
 * @prop {(getState: () => State, send: Send) => void} [subs] Shortcut for subscriptions.
 * @prop {(state: State) => void} [done] Method to do clean up when shutting down a program.
 * @prop {Send} [send] A static send function for dispatching message to a program. Used with routers and in composition.
 */
/**
 * The @composi/runtime.
 * @example
 *
 * ```
 * // Create a runtime program
 * const program = {
 *   // Define state:
 *   init() {
 *     return [{count: 0}]
 *   },
 *   // Define view to render.
 *   // Notice event to send message 'incr'.
 *   view(state, send) {
 *      return render(<div onclick={send('incr')}>The count is: {state.count}</div>, document.body)
 *   },
 *   // Define action to update state:
 *   update(state, msg) {
 *     if (msg === 'incr') {
 *        return [state.count++]
 *     }
 *   }
 * }
 * // Run the program:
 * run(program)
 * ```
 * @param {Program} program A program to run with five methods: `init`, `view`, `update`, `subscriptions` and `done`.
 * @return {() => void} Function to terminate runtime.
 */
export function run(program) {
  let init = program.init
  const view = program.view
  const update = program.update
  const subscriptions = program.subscriptions || program.subs
  const done = program.done
  let state
  let isRunning = true
  let isFirstRun = true
  const getState = () => state

  /**
   * Send a message.
   * @param {Message} message
   *
   */
  function send(message) {
    if (isRunning) {
      return updateView(update(state, message, send))
    }
  }

  /**
   * Expose send as static function on program object.
   * This is to let you send messages to the program
   * from other contexts, such as in a @composi/router action.
   */
  program['send'] = send

  /**
   * Handle changes to state and executing effects.
   * @param {any} update
   * @return {void} undefined
   */
  function updateView(update) {
    if (update) {
      state = update
    } else if (init) {
      state = init()
    }
    if (subscriptions && isFirstRun) {
      if (typeof subscriptions === 'function') subscriptions(getState, send)
      isFirstRun = false
    }
    view(state, send)
  }
  updateView(state)

  /**
   * Function to end runtime.
   * @return {void} undefined
   */
  return () => {
    if (isRunning) {
      isRunning = false
      if (done) {
        done(state)
      }
    }
  }
}
