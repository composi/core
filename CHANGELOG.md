# composi/core Changelog

## 1.6.9 (August 27, 2019)

* Updated to use the latest version of @composi/mergeObjects
* This version now properly clones Sets and Maps, as well as merges them together. Of course, you can only merge Sets or Maps. You cannnot merge these with other object types.

## 1.6.8 (August 6, 2019)

* Bumped version for publishing purposes.

## 1.6.7 (August 6, 2019)

## rollup.config.js

* Removed UMD build

## test/fragment.html, test/h.html, test/render.html, test/runtime.html

* Switched from using UMD bundle to load Composi for tests to using ES 6 module syntax.

## 1.6.6 (August 6, 2019)

### package.json

* Updated version of merge-objects dependency due to security vulnerability.

## 1.6.5 (August 6, 2019)

### rollup.config.js

* Added UMB build back in because Mocha tests need it!

## src/runtime.js

* Set initial value for `isFirstRun` to true for first run instead of false since technically it will always be the frist run initially.

## 1.6.4 (August 1, 2019)

### rollup.config.js

* Removed unnecessary UMD bundle from build.

### src/runtime.js

* Switched around properties of program JSDoc type comments to match actual usage. (They were out of order.)


## 1.6.3 (July 4, 2019)

### src/h.js

* Simplified `childNodes` assignment.
* Removed unnecessary parameter in `createVNode` call.
* `createVNode` now has default values of `null` for `key` and `flag` parameters.

### tests/h.html

* Updated tests to reflect changes in `h.js`.


### src/vdom.js

* Improved old and new VNode comparison in `patch` so that `onupdate` lifecycle hook only fires when the props have changed.

### src/vnode.js

* Instead of assigning default value to `createVNode` function inside its body, moved assignment as default value in the call signature itself.
* Marked flag parameter as optional.


## 1.6.2 (June 15, 2019)

### test/render.html

* Added delay for render test that needed a longer delay before accessing the updated DOM.

## 1.6.2 (June 11, 2019)

### package.json, package-lock.json

* Updated merge-objects dependency version.

## 1.6.1 (June 7, 2019)

### src/render.js
* Now taking the VNode passed as an argument to the render function and clone it to save on the component container element as the value of property `previousVNode`.

### src/vdom.js
* Now the `patchElement` function checks the new `previousVNode` property on the parent element to see if the new VNode is identical to the older vision. If they are it exits the patch immediately. Previously, the diff was checking a plain VNode against one which resulted from patching. Problem was, patching made the saved VNode always have DOM values for element, where as a fresh VNode has elements with a value of null. Using `previousVNode` allows the diff to check the resulting new VNode with the previous version before patching adds elements. This allows for quick exiting from the diff if there are no differences.

The save VNode in the `vnode` property of the continer is still used for patching, since it holds the last DOM render information.

## 1.6.0 (June 5, 2019)

### src/vdom.js
* Renamed variables for clarifying their identities better.
* lastChildren = oldVNodeChildren
* lastChildStart = oldVNodeChildStart
* lastChildEnd = oldVNodeChildEnd
* nextChildren = newVNodeChildren
* nextChildStart = newVNodeChildStart
* nextChildEnd = newVNodeChildEnd


## 1.6.0 (May 25, 2019)

### src/runtime.js
* Created a function `getState` that gets exposed to subscriptions. This allows subscription to access the current state of a program. Previously subscriptions got passed a reference to state as their first argument. However, this was state as it was at the time the program started. Subscriptions had no way to know the current state of a program at any given time. Providing subscriptions with `getState` solves this problem. Now an action can change a value in state and a subscription can check for a change in that value in a loop, after which the subscription can do something, such as canceling a loop, etc.
* `getState` is now the first argument of a subscription, followed by `send`:
```javascript
const program = {
  init() {
    return [state]
  }
  subscriptions(getState, send) {
    return effect
  }
}
function effect(getState, send) {
  // Access state from the program:
  const currentState = getState()
  // Do something with currentState...
}
```
* Using `getState` also lets you store any references to a setInterval, web sockets or services that you implement in subscriptions and want to affect from an action. You can expose them on the program's state so you can access them from other actions.

* Never use this to directly change a program's state. Instead send the data as the value of a message for an action to handle.

### src/vdom.js
* Refactored `updateElement` function to handle `onmount` and `onupdate` separately. Previously both were getting passed the same parameters: `element`, `oldProps` and `newProps`. Passing props as arguments for `onmount` makes no sense. Added a conditional so `onmount` only gets passed a reference to the mounted element. `onupdate` still gets `element`, `oldProps` and `newProps`.

### test/runtime.html
* Updated runtime test to use the new `getState` function in subscriptions.

### README.md
* Fixed erroneous urls. These were pointing to older version of Composi in a different Github group. Now they point to the correct repository.


## 1.5.0 (May 8, 2019)

### src/vdom.js
* Switched parameters around for unmount lifecycle hook. The correct order is function(element, done). This makes unmount feel more inline with onmount and onupdate, which get the element as the first argument.

### test/render.html
* Updated onmount lifecycle test for changes to onunmount parameter order.

### README.md
* Updated README to document changes to onunmount parameter order.

## 1.4.0 (May 7, 2019) - no version change

### README.md
* Documented new union function call signature.

## 1.4.0 (May 7, 2019)

### src/effects.js
* Changed batchEffects argument to not require enclosing effects in array. Use of spread operator means just passing in effects separated by commas: `const batchedEffects = batchEffects(effect1, effect2, effect3)`
* Same thing when batching subscriptions: `const batchedSupcriptions = batchEffects(sub1, sub2, sub3)`

### src/union.js
* Changed union argument to not require enclosing message names in array. Use of spread operator means just passing in messages separated by commas: `const Msg = union('updateInputValue', 'addItem', 'deleteItem')`.

### src/vdom.js
* Added back in empty block conditional check for comparing oldVNode and newVNode in patchElement function. This helps prevent certain edge cases where a vnode might be undefined, particularly when dealing with creating new text nodes.
* Moved function `removeWhiteSpaceNodes` before `hydrate` function to avoid need for hoisting.

### test/runtime.html
* Updated tests to use new arrayless arguments for union and batchEffects functions.

## 1.3.8 (May 6, 2019)

### src/vdom.js - setProp function
* Added in read-only attributes to setProp function to set this is properties instead of attributes.

### test/render.html
* Updated render tests to check read-only attributes being set.

### src/vdom.js - removeChildren function
* Renamed node variable to vnode in removeChildren function, since that’s what it is.

## 1.3.7 (Apr 29, 2019)

### src/index.js
* Hydrate gets used internally by the render function when a third argument for the element to hydrate is provided, so no need to expose it.

### test/render.html
* Updated render test to reflect this change.

## 1.3.6 (Apr 28, 2019)

### src/vdom.js
* Removed empty check for oldVNode and newVNode equality and instead added check for their inequality at end.

## 1.3.5 (Apr 27, 2019) - no version change

### package.json && package-lock.json
* Removed unnecessary, unused dependency: @composi/get-type.

## 1.3.5 (Apr 26, 2019)

### src/effects.js
* Removed unused mapEffects function. Was never used by anything, so time to go.

### src/render.js
* Added check in hydration to see if container has a ‘vnode’ property. If it does, we know this has already been hydrated and use it. Otherwise we hydrate the element. This prevents unnecessarily re-hydrating a component by mistake.

### src/vdom.js
* updateElement function now also checks for ‘selected’ value for updating properties.

### src/vnode.js
* Rolled functionality of ‘vnodeFromChild’ directly into hydrate function. No need for separate function.

## 1.3.4 (Apr 17, 2019)

### src/vnode.js
* Previously a vnode element property could be null or undefined. They are now always null by default.
* Added new function: removeWhiteSpaceNodes. This is used during hydration to remove whitespace nodes before creating a virtual node. That way, if the server-rendered node is the same as the client-rendered vnode, they should match, reducing patch work.

### test/h.html
* Updated h test for vnode changes.

## 1.3.3 (Apr 13, 2019) - no version change

### src/vnode.js
* Use TEXT_NODE for nodeValue of 3.

## 1.3.3 (Apr 9, 2019)

### package.json & package-lock.json
* Update to use latest version of @composi/merge-objects 1.2.3.

## 1.3.2 (Apr 4, 2019)

### package.json & package-lock.json
* Updated version of merge-objects dependency to 1.2.2.

## 1.3.1 (Apr 3, 2019)

### src/effects.js
* batchEffects was not passing state and send to effects.
* This batched subscriptions in particular were not getting access to state and send properly because of flaw in batchEffects.
* batchEffects now exposes state and send to its effects.

### test/runtime.html
* Updated runtime tests to use new exposed state and send parameters in effects.

## 1.3.0 (Mar 31, 2019)

### src/runtime.js
* Enabled effects to have access to program state.
* Exposed send function to effects.
* Gave subscriptions access to state.
* Exposed send function to subscriptions.

### test/runtime.html
* Added tests for changes to effects and subscriptions.

## 1.2.0 (Mar 24, 2019)

### src/fragment.js
* Previous Fragment was a separate package. Now it is part of Composi core.
* Updated Fragment to handle a single argument of an array of nodes.

### src/index.js
* Fragment being exported as part of composi/core

### test/fragment.js & test/index.js
* Added tests for Fragment.

## 1.1.9 (Mar 20, 2019)

### src/vdom.js
* Removed unnecessry prop type checks from setProp function.
* Simplified check for null or false in props to detemine when to remove attribute in setProp function.
* Removed unnecessary isRecycled check from updateElement function.
* Removed check for RECYCLED_NODE from patchElement function.

## 1.1.8 (Mar 5, 2019)
### src/runtime.js
* Fixed bug affecting subscriptions in runtime programs. 1. The send function wasn't getting passed to batched effects when used as subscriptions. Fixed.

### test/runtime.html
* Added test for batched subscriptions.

## 1.1.7 (Mar 3, 2019) - no code changes
* Version bump for changes to how lifecycle hooks are implemented.

### README.md
* Minor edits to README.

## 1.1.6 (Feb 28, 2019)

### src/constants.js
* Created a constant named LIFECYCLE. This is for holding lifecycle hooks.

### src/vdom.js
* Refactored all methods to use the new constant LIFECYCLE.

## 1.1.6 (Feb 22, 2019) - no version change

### src/render.js
* Text formatting clean up.

## 1.1.6 (Feb 22, 2019) - no version change

### src/render.js
* Added param type VNode for render function.

## 1.1.6 (Feb 18, 2019)

### src/vdom.js
* Style prop should accept either an object of properties and values or a string of normal CSS to define component styles.

## 1.1.5 (Feb 16, 2019) - no version change

### src/union.js
* Cleanup of union function code.

## 1.1.5 (Feb 5, 2019) - no version change

### src/package.json
* Added gzip for ES6 module version (mjs).

## 1.1.5 (Feb 2, 2019) - no version change

### test/runtime.html
* Fixed runtime test that needed longer delay to finalize result for assertion.

## 1.1.5 (Jan 15, 2019) - no version change

### src/vnode.js
* Mention in JSDoc comment that hydrate creates a virtual node from a DOM element.

## 1.1.5 (Jan 13, 2019)

### LICENSE
* Updated license date.

## 1.1.4 (Dec 20, 2018)

### src/runtime.js
* When the program subscriptions method was empty, encluding it caused throws during runtime in browser because there is no subscription to invoke.
* Resolved this by checking that the program includes a subscription and also returns an effect to execute.

## 1.1.3 (Dec 19, 2018)

### package.json * package-locked.json
* Bumped dependency versions.

## 1.1.2 (Dec 14, 2018)

### src/runtime.js
* Subscriptions now get state and send passed to them automatically, just like view. This lets you access state from a subscription, and send a message to an effect when necessary.

### test/runtime.html
* Updated runtime tests to subscription changes.

## 1.1.1 (Dec 14, 2018) - no version change

### src/vdom.js
* Fixed typo in JSDoc comment.

## 1.1.1 (Dec 13, 2018)

### src/runtime.js
* subscriptions were being re-executed every time there was a state change. They should only run during program startup. Fixed.

## 1.1.0 (Dec 13, 2018) - no version change

### src/vdom.js
* Clarification in JSDoc comment about subscriptions as method of runtime program.

## 1.1.0 (Dec 13, 2018)

### src/runtime.js
* Added shortcut `subs` for subscriptions. Less typing, less likely to misspell.

### test/runtime.html
* Added test for use of subs for subscriptions.

## 1.0.0 (Nov 30, 2018) - no version change

### src/runtime.js
* Isolated subscription execution to avoid overwritting effects from update.

## 1.0.0 (Nov 30, 2018) - no version change

### test/runtime.html
* Updated runtime test for addition of subscriptions.

## 1.0.0 (Nov 30, 2018)

### src/runtime.js
* Added Subscriptions API. Subscriptions provide way to run effects when a runtime program first starts.

### src/runtime.js
* Update signature now takes state first, then message.

### test/runtime.html
* Updated runtime tests to reflect API changes.

### README.md
* Updated README for new signature for update function.

## 0.10.3 (Nov 30, 2018)
* Removed dist version to avoid conflicts when merging V1 branch.

## 0.10.3 (Nov 30, 2018)
* Latest build.

## 1.0.0-beta.0 (Nov 30, 2018) - no version change

### src/effects.js & src/runtime.js
* Added Subscriptions API.
* The subscriptions method is for setting up effects that run during the program start. These are the same as running an effect as the second value of the array returned by init. However, subscriptions does the same thing in a more explicit way. Easier for people to understand how to implement startup subscriptions when the name is subscriptions.

## 1.0.0-beta.0 (Nov 27, 2018) - no version change

### src/runtime.js
* Updated order for parameters in update function.

### test/runtime.html
* Updated tests for update function parameter order changes.

### README.md
* Documented changes to update function parameter order.

## 1.0.0-beta.0 (Nov 27, 2018) - no version change

### src/runtime.js
* update funtion parameter order is reversed. Changes match init and view parameter order where state is the first value, followed by effect, send or message.

## 1.0.0-beta.0 (Nov 27, 2018)

### src/runtime.js
* update function parameter order reversed so that state comes first.

## 0.10.3 (Nov 27, 2018)

### package.json & package-locked.json
** Bumped version or npm-run to avoid security vulnerability.

### src/render.js
* Renamed private variable from `cont` to `container` for understability.

## 0.10.2 (Nov 26, 2018) - no version change

### README.md
* Fixed menu typo.

## 0.10.2 (Nov 25, 2018)

### src/union.js
* Simplified code for tagged unions.

### src/runtime.js
* Added more detail for JSDoc comments.

## 0.10.1 (Nov 23, 2018)

### package.json & package-locked.json
* Added mjs version for use in browsers.

### README.md
* Added information about how to use mjs module version in the browser.

## 0.10.0 (Nov 12, 2018)

### src/runtime.js
* Exposing "send" as program static function of program allows sending message to program update method from other contexts. This was introduced to facilitate easier integration with @composi/router. Now in a router action you can send a message to the program to affect state which the program update actions can deal with for rendering the proper subview for the route.

### test/runtime.js
* Added test for static version of send function.

## 0.9.6 (Nov 9, 2018) - no version change

### package.json & package-latest.json
* Updated to latest version of prettier.

## 0.9.6 (Nov 9, 2018)

### src/effects.js
* batchEffects was sometimes failing when an argument was falsy. Fixed.

## 0.9.5 (Nov 5, 2018) - no version change

### README.md
* Fixed bad links.

## 0.9.5 (Nov 4, 2018) - no version change

### src/effects.js
* Simplified mapEffect function by using arrow function.

## 0.9.5 (Nov 4, 2018)

### src/mapEffects.js
* Renamed mapEffects.js to effect.js

### src/index.js
* Updated import of renamed effects.js functions.

### src/effects.js
* Added new function: batchEffects. This allows you to batch effects together. When they are executed in the order they are batched.

### test/runtime.html
* Added test for batched effects.

## 0.9.4 (Nov 4, 2018) - no version change

### src/runtime.js
* Reverted order change in updateView function that introduced bug.

## 0.9.4 (Nov 4, 2018) - no version change

* Checked in dist versions that got missed in previous checkin.

## 0.9.4 (Nov 4, 2018)  - no version change

### src/runtime.js
* Refactor of updateView function.

## 0.9.4 (Nov 4, 2018) - no version change

### src/index.js
* Tests require that hydrate be exported!

### src/runtime.js
* Simplified how run function returns.

## 0.9.4 (Nov 4, 2018) - no version change

### src/index.js
* No need to export hydrate function.

## 0.9.4 (Nov 4, 2018)

### src/h.js
* Refactored to use while loop instead of for.

### src/union.js
* Refactored to use while loop instead of for.
* Use arrow function to return union.

## 0.9.3 (Nov 4, 2018)

### src/runtime.js
* Renamed private variable from change to updateView.

## 0.9.2 (Nov 4, 2018) - no version change

### dist/composi-core2.js
* Removed this file - giblet.

## 0.9.2 (Nov 4, 2018)

### src/render.js
* Added error checking for when user provides invalid container for render function.
* Composi will now log an error and bail when an invalid container argument is used with the render function. Will output an error message detailing the reason for failure to render, along with the selector used.

### test/render.html
* Fixed bug in runtime test.

## 0.9.1 (Nov 4, 2018)

### src/runtime.js
* Refactored runtime so init method can be a NOOP.
* Normally program.init needs to return an array. But now you can make a default program with noop methods:
```javascript
const program = {
  init() {},
  view() {},
  update() {}
}
```

### test/runtime.html
* Update test for null init return value.

## 0.9.0 (Nov 3, 2018)

### src/runtime.js
* Updated how the run function handles state.
* Previously a program's init was just an array assignment. Now its a function that returns a tuple of state and effect: init() { return [state, effect]}

### test/runtime.html
* Updated init tests for changes to how it returns state.

### README.md
* Updated to include changes to how init returns state.

## 0.8.6 (Nov 2, 2018)

### src/vdom.js
* Fixed onupdate bug. onupdate was not getting passed the previous props. Fixed.

## 0.8.5 (Nov 2, 2018) - no version change

### README.md
* README edit.

## 0.8.5 (Nov 1, 2018) - no version change
* Checkin dist build. Was missed in last checkin.

## 0.8.5 (Nov 1, 2018)

### src/runtime.js
* Modified return of state by update actions to enable immutable data.  Previously an action just returned state to the view. Now when you return state, it also reassigns it to the program's state. This lets you clone the state inside the action, make changes and then return it. In so doing you update the program state and the view.

### package.json & package-locked.js
* Update dependency on @composi/merge-objects to latest version.

## 0.8.4 (Oct 31, 2018)

### src/h.js
* Fixed issue for SVG image rendering. Needed to restore empty block in h function.

## 0.8.4 (Oct 23, 2018)
* Checked in dist build, left out in last checkin.

## 0.8.2 (Oct 29, 2018)

### src/vdom.js
* Fixed returning null for component bug. patch function was trying to attach element to vnode even when the vnode was null. Fixed by checking if element exists first.

## 0.8.1 (Oct 29, 2018)

### src/index.js
* Added export of mapEffects.

## 0.8.0 (Oct 29, 2018)
* Add runtime for creating encapsulated programs with state management.

### src/runtime.js
* Added new file. This exposes run function. This creates a runtime for a program. This provides a Redux-style state manager for functional components.
* A runtime program has four parts:
1. Init: holds state and runs effects at startup.
2. update: handles actions for modifying application state.
3. view: creates representation of state.
4. done: method to cleanup environment before program stops.

### src/mapEffect.js
* Added new file.
* mapEffect makes it easy to share an effect between a parent program and a child program for inter-program communication.

### src/union.js
* Added new file.
* The function “union” creates tagged unions. These are used to simplify invoking update actions from the view and handling them in the program’s update method.

### test/runtime.js
* Added new file. Includes tests for new runtime environment for program state management.

## 0.7.2 (Oct 22, 2018) - no version change

### src/h.js
* No empty blocks.

## 0.7.2 (Oct 20, 2018)
* General clean up. Set Eslint to allow reassignment of parameters, enabling elimination of a bunch of variables.

### src/vdom.js
* Refactored virtual DOM functions, fixing some erroneous flag uses.

### src/vnode.js
* Minor code cleanup and variable renaming.

### src/h.js
* Switched to using Reflect.get to get properites from objects. Reflect doesn't throw if the property doesn't exist.

### src/render.js
* Simplified render function.

## 0.7.1 (Oct 18, 2018)

### src/render.js
* Added hydrateThis as type parameter in JSDoc comments.

## 0.7.0 (Oct 18, 2018) - no version change

### src/render.html
* Fixed lifecycle tests that were failing.

## 0.7.0 (Oct 18, 2018)
* Refactored patch algorithm for simplicity.
1. `render` now takes two arguments, the component and its container.
2. No need for mount, `render` mounts and updates the component.
3. Removed separate `unmount` function. Was not useful and was too problematic. Instead use boolean logic to manage when a component renders.
4. `render` function now caches the last rendered vnode on the component’s container. Each time you render a component, it checks the container for the cache and uses that to patch the DOM efficiently.
5. Only one component can be rendered in a container, but you can make a parent wrapper to compose many components to render them all in one container.
6. To hydrate a server-rendered element, pass its DOM reference or string selector as the third argument for `render`.
7. Updated tests for all changes.

### src/unmount.js
* Deleted file as no longer necessary. See above changes to API.

## 0.6.0 (Oct 9, 2018) - no vesion change

### src/unmount.js & src/vdom.js
* Refactored code to fix eslint error about parameter reassignment.

## 0.6.0 (Oct 9, 2018)

### src/vdom.js
* Previously the patch algo returned a vnode which you had to capture and return to the next render.
* Now patch returns the element base of the component. As such, you capture on the first render only. After that, just render.
* You do need to pass the component element as the thrid parameter during re-renders, but no re-capture any more.
* Changes to patch required updates to render, unmount, hydrate, removeElement and updateElement.

### test/render.html
* Updated tests for changes.

## 0.5.5 (Oct 5, 2018)

### src/vdom.js
* Fixed error in JSDoc coment for setProp function.

### package.json & package-locked.json
* Updated @composi get-type and merge-objects to latest versions.

## 0.5.4 (Oct 5, 2018)

### .eslintrc.json
* Updated eslint rules.

### src/h.js, src/vdom.js, src/vnode.js
* Updated source code to resolve Eslint errors.

### package.json & package-locked.json
* Updated @composi/merge-objects to version 1.0.6 to resolve issues with merge bugs.

## 0.5.3 (Oct 4, 2018)
* Bumped version for publishing to NPM.

## 0.5.2 (Oct 4, 2018) - no version change

### package.json
* Added publishConfig for publishing to NPM.

## 0.5.2 (Oct 4, 2018) - no version change

### package.json & package-locked.json
* Updted to use latest version of @composi/merge-objects.

## 0.5.2 (Sep 27, 2018)

### package.json & package-locked.json
* Made @composi/get-type and @composi/merge-objects as dependencies.

## 0.5.1 (Sep 26, 2018)

### src/vdom.js
* Added error catching for attempt to render array of elements into DOM.

### test/render.html
* Updated render test for array error.

### src/h.js
* Props in h function should be optional.

### rollup.config.js
* Rollup now creating minified dist version.

## 0.5.0 (Sep 26, 2018) - no version change

### package.json
* Updated package name for scoped NPM package.

## 0.5.0 (Sep 26, 2018) - no version change

### README.md
* Fixed typo in README.

## 0.5.0 (Sep 26, 2018)

* Converted Composi into scoped packages. @composi/core encompasses the virtual DOM and functional components.

1. constants.js are values used by @composi/core.
2. h.js provides hypersrcipt function for defining virtual nodes.
3. vnode.js provides functions to create virtual element nodes and virtual text nodes.
4. vdom.js provides virtual DOM for diffing and patching the DOM.
5. render.js provides function to mount function components in the DOM and update them in place.
6. unmount.js provides function to remove a mounted component form the DOM.
7. Included mocha/chai tests for h, render, lifecycle hooks and unmount.
