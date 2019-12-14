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
export function run(program: import("./types").Program): () => void;
