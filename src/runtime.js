
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
 * @param {import('./types').Program} program A program to run with five methods: `init`, `view`, `update`, `subscriptions` and `done`.
 * @return {() => void} Function to terminate runtime.
 */
export function run(program) {
  const {init, view, update, subs, done} = program
  const subscriptions = subs || program.subscriptions
  let state
  let isRunning = true
  let isFirstRun = true
  const getState = () => state

  /**
   * Send a message.
   * @param {import('./types').Message} message
   *
   */
  function send(message, data) {
    let msg = message
    /**
     * message is a function from a tagged union that
     * can be called to return a message object.
     */
    isRunning
     && (typeof message === 'function') 
     && (msg = /** @type {Function} */ (message)(data))
    
    return isRunning &&
      updateView(update(state, msg, send))
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
  const updateView = update => {
    update 
      && (state = update) 
      || init 
      && (state = init())
      || (state = undefined)

    isFirstRun
      && subscriptions
      && typeof subscriptions === 'function'
      && subscriptions(send, getState)

    isFirstRun = false
    
    view(state, send)
  }
  updateView(state)

  /**
   * Function to end runtime.
   * @return {void} undefined
   */
  return () => {
    isRunning
      && done
      && done(state)
      
    isRunning = false
  }
}
