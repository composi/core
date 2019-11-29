# Composi

![GitHub top language](https://img.shields.io/github/languages/top/badges/shields.svg)
![npm (scoped)](https://img.shields.io/npm/v/@composi/core.svg)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

 1. [Introduction](#Introduction)
 2. [Installation](#Installation)
 3. [h](#h)
 4. [render](#render)
 5. [Component Replaces Target Element](#Component-Replaces-Target-Element)
 6. [Keys](#Keys)
 7. [Lifecycle Hooks](#Lifecycle-Hooks)
 8. [onmount](#onmount)
    *  [Accessing the Component's DOM](#Accessing-the-Component's-DOM)
 9. [onupdate](#onupdate)
10. [onunmount](#onunmount)
11. [run](#run)
12. [Default Program](#Default-Program)
13. [Optional Program Methods](#Optional-Methods)
14. [Actions for Update](#Actions-for-Update)
15. [Tagged Unions](#Tagged-Unions)
16. [Summary](#Summary)

## Introduction

Composi is a framework for creating desktop and mobile apps. With Composi you can create a dynamic website with reactive components, a progressive web app, or a hybrid app for mobile app stores. Visit the [website](https://composi.github.io).

Composi core is small, barely 2KB gzipped. It therefore loads fast. Its virtual DOM updates components efficiently and quickly. It has an API very similar to React, while mainting it's emphasis on simplicity, size, and ease of learning. In fact, you can learn everything you need to know to build apps with Composi core in an hour.

Composi core supports functional components. You use props to pass in values, data or events. A functional component can have child components. And a parent can pass props down to its children. There is no two-way data binding. Data flows down from parent to child.

A component's markup is written with JSX. This means you can create custom tags to organize your component's DOM structure. If you prefer, you can instead use the `h` function to define the component's markup with hyperscript. In fact, at build time the JSX is converted to `h` functions.

Unlike React, properties are standard HTML versions--`class` instead of `className`, etc., and inline events are lowercase, not camel case. However, self-closing tags do need to have a final back slash to be valid.

## CDN

If you want, you can load @composi/core from a CDN and use it in the browser without a need to install anything or have a build process. You can do this for fast prototyping. This works on any modern evergreen browser: Chrome, Edge, Firefox or Safari. To do this, create a folder and in it create an index.html file and a JavaScript file. At the top of the JavaScript file you will import @composi/core as follows:

```javascript
import { h, render, run, union } from 'https://unpkg.com/@composi/core@0.10.0/dist/composi-core.mjs?module'
import { htm } from 'https://unpkg.com/htm.mjs?module'
import { mergeObjects } from 'https://unpkg.com/@composi/merge-objects@1.1.0/src/index.js?module'
```

Visit the website for more details on how to use [@composi/core in the browser](https://composi.github.io/en/docs/core/cdn.html) when loading from a CDN.

## Installation

To add Composi core to your project, install from NPM:

```sh
npm i -D @composi/core
```

After installing, you can import the `h` and `render` functions to create function components and render them to the DOM. Continue reading to learn how to use them.

## h

A hyperscript function that lets you define virtual nodes. When you transpile your code with Babel, it uses this function to convert JSX into virtual nodes that Composi core understands. It takes from one to three arguments:

1. type--the element name: div, p, ul, etc.
2. props--an object literal of key/value pairs
3. children--an array of child nodes, either text or other virtual nodes.

### Example

```javascript
import { h, render } from '@composi/core'

const Title(greet) {
  return h(
    'header',
    {
      class: 'heading'
    },
    [
      h(
        'h1',
        {
          title: greet
        },
        [
          'Hello, ',
          greet,
          '!'
        ]
      )
    ]
  )
}

// Render component:
let title = render(Title('World'), '.header')
```

If there are not props for an element, you can use `{}`. You could also just use null, but {} is two characters shorter.

The above hyperscript function is equivalent to the following JSX:

```javascript
const Title({greet}) {
  return (
    <header class='heading'>
      <h1 title={greet}>Hello, {greet}!</h1>
    </header>
  )
}

// Render component:
let title = render(<Title greet='World' />, 'header')
```

JSX will always be more compact and readable than writing out a hyperscript function. However, you can pick the style you prefer.

## render

You use the `render` function to mount and update a functional component. It takes two arguments: the component to render, and the container to render it in.

```javascript
import { h, render } from '@composi/core'

function Title({greet}) {
  return (
    <header>
      <h1>Hello, {greet}!</h1>
    </header>
  )
}

// Mount the component:
render(<Title greet='Everybody'/>, document.querySelector('#title'))
```

When providing a container to render in, you can use either a DOM node reference, or a valid selector value:

```javascript
// Mount the component on header tag:
render(<Title greet='Everybody'/>, document.querySelector('header'))

// Or just pass in a selector:
render(<Title greet='Everybody'/>, 'header')
```

The first time the `render` processes a component, it caches the component's vnode on its container. For all other renders, the `render` function grabs the vnode from the container to diff and patch the DOM agains the newest version of the component.

```javascript
import { h, render } from '@composi/core'

function Title({greet}) {
  return (
    <header>
      <h1>Hello, {greet}!</h1>
    </header>
  )
}

// Render the component the first time.
render(<Title greet='Joe'/>, 'header')

// Update the component 5 seconds later.
setTimeout(() => {
  render(<Title greet='Everybody Else'/>, 'header')
}, 5000)
```

## Component Replaces Target Element

When you use the `render` function, Composi takes the DOM element you provide and hydrates it with the functional component. As such, it is not practically to render a component directly into the document body. You'll need to provide a stub element to render your app. Something like this will work fine:

```html
<body>
  <div id='app'></div>
</body>
```

Then you could target it like this:

```javascript
render(<App {...{state}}/>, '#app')
```

If you want to be able to output several different components into the same container, such as the body tag above, just provide a separate stub for each component that you want to render.


## Keys

For repetitive siblings, such as lists, Composi core lets you use keys to uniquely identify each item in the collection. If the collection is state, you do not need to use keys. However, if you intend to delete or otherwise change the order of items in the collection, you'll want to provide keys for each item. This helps Composi core track the DOM elements with the virtual DOM against the changed data. Not providing keys can result in unpredictable re-renders of the collection in the DOM.

Keys must be unique values for that colleciton. Many databases already provide ids or uuids for items in a collection. Check you datasource. Using array index values as keys should not be done. If you delete or change the order of the array items, the index values will not match the array items. This will lead to unpredictable rendering of the colleciton in the DOM. Avoid this. Instead, if you data does not have ids already, use some scheme to add ids before passing the data to the functional component.

When you assign a key to a list item, it does not get added to the actual rendered element. It is only a property of the virtual node.

### Example

```javascript

import { h, render } from '@composi/core'

// List component.
// Notice how we assign a key directly on the list item:
function List({data}) {
  return (
    <ul>
      {
        data.map(item => <li key={item.key}>{item.value}</li>)
      }
    </ul>
  )
}

// Notice the unique id for each item in the array:
const fruits = [
  {
    id: 101,
    value: 'Apples'
  },
  {
    id: 102,
    value: 'Oranges'
  },
  {
    id: 103,
    value: 'Bananas'
  }
]

// Render the list:
render(<List data={fruits} />, document.querySelector('#list'))
```

## Lifecycle Hooks

Composi core provides three lifecycle hooks. These are registred on the element that you want to track. The expect a callback to execute when they occur. Each callback will get certain arguments passed to it based on which lifecyle hook it is.

1. [onmount](#onmount)
2. [onupdate](#onupdate)
3. [onunmount](#onunmount)

## onmount

The `onmount` lifecycle hook lets you do something right after a component is mounted. It also gives you access to the element on which the hook is registered.

*  [Accessing the Component's DOM](#Accessing-the-Component's-DOM)

`onmount` gets one argument--the element that the hook is on. This lets you do things such as setting up event listeners, starting timers, or accessing the element's child nodes.


#### Example

```javascript
import { h, render } from '@composi/core'

// Define clock component:
function Clock({time}) {
  if (!time) time = new Date()
  return (
    <div onmount={initClock}>
      <h3>The Current Time</h3>
      <p>It is {time.toLocaleTimeString()}.</p>
    </div>
  )
}

// Start tick interval after mount:
function initClock() {
  const timerId = setInterval(
    () => {
      // Re-render the clock at each tick.
      render(<Clock />, '#clock')
    }),
    1000
  )
}

// Mount the clock.
render(<Clock />, '#clock')
```
In the above example, the component will be updated every second. But only the text node with the time value will change due to virtual DOM patching.

Since we are re-rendering the clock every second, we recapture the result as well. This enables Composi to update the DOM efficiently, keeping DOM thrashing to a minimal.

### Accessing the Component's DOM

You can also use `onmount` to access the DOM of the component to set focus on an input:

```javascript
import { h, render } from '@composi/core'

function Form() {
  function setFocus(input) {
    input.focus()
  }
  return (
    <form >
      <p>
        <input onmount={setFocus} type='text' />
      </p>
      <p>
        <button type='submit'>Add</button>
      </p>
    </form>
  )
}
```

When the above component renders, the input will have focus.

## onupdate

This gets three arguments--the element the hook is on, the old props and the new props.


#### Example

```javascript
import { h, render } from '@composi/core'

function Title({greet}) {
  function announce(el, oldProps, newProps) {
    console.log(`The old value was: ${oldProps.greet}. The new value is: ${newProps.greet}.`)
  }
  return (
    <nav>
      <h1 onupdate={announce}>Hello, {greet}!</h1>
    </nav>
  )
}

// Mount the component:
render(<Title greet='World'/>, 'header')

// Update component in 5 seconds:
setTimeout(() => {
  render(<Title greet='World'/>, document.body, title)
}, 5000)
```
### About Props
When `onupdate` fires on an element, it only has access to the props that were assigned to that element. So, in order to access whatever data you want to be checking, make sure that data is available on that element as a prop. The prop doesn't need to be actually used with that element.

## onunmount

This gets two arguments--the element the hook is registered on and `done`, which is a callback that you will need to call after you finish whatever you are doing. Calling `done()` allows the unmount to continue. Failing to call it will prevent the element from being removed from the DOM. This can lead to serious problems when Composi tries to reconcile the DOM with the virtual DOM.

#### Example

```javascript
import { h, render } from '@composi/core'

function List({data}) {
  function deleteItem(id) {
    // Because we are reassigning the filerted results,
    // the variable fruits needs to be initialized with `let`, not `const`.
    // Otherwise you'd get an error about assigning to a read only property.
    fruits = data.filter(item => item.id != id)
    render(<List data={fruits}/>, '#list')
  }

  // Animate list item when deleted.
  function animate(item, done) {
    item.style.cssText = 'transition: all 1s ease-out; height: 0px; transform: translateX(-300px);'
    // Don't forget to call `done()` or the element won't be removed!
    // Use setTimeout to delay the remove until after the animation ends.
    setTimeout(() => done(), 1000)
  }
  return (
    <ul>
      {
        data.map(item => <li key={item.id} onunmount={animate}>
          <span>{item.value}</span>
          <button class='delete' onclick={() => deleteItem(item.id)}>X</button>
        </li>)
      }
    </ul>
  )
}

render(<List data={fruits}/>, '#list')
```

## hydration

Since the `render` function uses an existing DOM element, hydration is built in--no need for something special. This means you can have Content created on the server. Then when the browser loads, have Composi target it as the node for the component in the `render` function.

```javascript
import { h, render } from '@composi/core'

// Convert server-rendered list into a virtual node:

function List({data}) {
  return (
    <ul>
      {
        data.map(item => <li key={item.key}>{item.value}</li>)
      }
    </ul>
  )
}

const fruits = [
  {
    key: 101,
    value: 'Apples'
  },
  {
    key: 102,
    value: 'Oranges'
  }
]

// Pass in serverList virtual node as third argument.
// This will let Composi patch the DOM by calculating the difference between the functional component and serverList.
let list = render(<List data={fruits} />, '#server-genereated-content')
```

## Run

@composi/core run creates a runtime for Redux-style state management for functional components. To use it, you do need to import it:

```javascript
import { h, render, run } from '@composi/core'
```

Run takes one argument, the program to run. This is where it gets interesting. A program has five methods. The first three are required, the last two are optional:

1. init
2. update
3. view
4. subscriptions - optional
5. done - optional

Init is a function that returns the program's state and optionally an effect to run at startup. That's why its called init.

Update is like a Redux reducer. It executes various actions conditionally. The can modify and return the programs state. When it returns the state, it gets passed to the view.

View is a function that can return some kind of presentation of the state. This is where you would use render to output a functional component.

## Default Program

With `init`, `view` and `update` you have everything you need to make a valid program that you can run:


```javascript
import { h, render, run } from '@composi/core'
// Minimal valid program to run:
const program = {
  init() {},
  update() {},
  view() {}
}
run(program)
```
## Optional Program Methods

Subscriptions is an optional method that contains effects to run when the program starts. Using @composi/core's `batchEffects` function it is possible to run more than one effect at the same time, say, start a timer and fetch data at the same time. Subscriptions is optional. In fact, it's just a more convenient and explicit way of running an effect the same way passing an effect as the second value in `init` is. Many people will feel more comfortable using a dedicated function for subscriptions that simply tagging on an extra value to `init`.

Done is an optional method that allows you to do clean when you stop a program, such as stopping timers, animations, etc. When you pass a program to `run`, it returns a function that you can use to stop a program. The following is a simple program that does only one thing--it starts a setInterval. At any time we can stop the program and terminate the interval. Notice how we use `done` to do this.


```javascript
import { h, render, run } from '@composi/core'

const section = document.querySelector('#clock')

// Define clock component for view:
function Clock(state) {
  return (
    <h2>The time is {state}</h2>
  )
}

// Define effect to run at program start.
// It will start a loop that runs every second,
// sending a message to the update function.
// Put it after state in init:
let setIntervalID
function startLoop(getState, send) {
  let count = 0
  setIntervalID = setInterval(() => {
    console.log(count++)
    send('update-time')
  }, 1000)
}

// Define funtion to stop setInterval:
function stopLoop() {
  clearInterval(setIntervalID)
}

function action(state, msg) {
  if (msg === 'update-time') {
    state = new Date().toLocaleTimeString()
    // Return new state to re-render view:
    return [state]
  }
}

// Assemble program:
const program = {
  init() {
    return [new Date().toLocaleTimeString()]
  },
  view(state) {
    return render(Clock(state), '#clock')
  },
  update(state, msg, send) {
    return action(state, msg)
  },
  // Setup subscription:
  subscriptions(getState, send) {
    return startLoop
  }
  // ADD DONE METHOD FOR EFFECT CLEANUP:
  done() {
    stopLoop()
  }
}

// Run program.
// While doing so, capture program in stopProgram variable,
// so we can stop it.
const stopProgram = run(program)
// Some time later we stop the program.
// Doing so invokes the `done` function, thereby terminating the loop.
stopProgram()
```


Each property expects certain arguments.

Init is a function that returns an array. The first entry in that array is the state for the program. The second entry, which is optional, is an effect to run at startup. This might be a setInterval timer, or a code to fetch data.

Update get two arguments: message and state. Message is any message sent to it by the view. Message get sent when events are triggered in the UI, possibly by the user.

View gets passed two arguments: state and send. The state is used by the view's template function to render. The send function is used to send messages from the view to the update method. You let the update method know what action occured and any data that the action might need.

Here's an simple clicker example:

```javascript
import { h, render, run } from '@composi/core'
const section = document.querySelector('section')

// Counter for view:
function Counter({state, send}) {
  return (
    <p>
      <button class='counter' onclick={() => send()}>{state}</button>
    </p>
  )
}

// Assemble program:
const program = {
  // Set initial state:
  init() {
    return [0]
  },
  update(state, msg) {
    return [state + 1]
  },
  view(state, send) {
    return render(<Counter {...{state, send}} />, '#counter')
  }
}

// Run program:
run(program)
```

[Live example on Codepen](https://codepen.io/rbiggs/pen/EOYOEJ)

## Actions for Update

The above example was very simplistic, but it shows how to send a message from the view to the update method. Although we sent a message, it was not of any value, so it was undefined. If your program is very simple and only has one action like this, then you can just send an empty message. However, if your program needs more than one action/message, you'll need to use a standard interface for the messages you send. In the following Todo list example we implement several actions for the update method by sending message objects that we can test to see which one was received:

```javascript
import { h, render, run } from '@composi/core'

const section = document.querySelector('section')

// State for program:
const state = {
  newKey: 104,
  inputVal: '',
  fruits: [
    {
      key: 101,
      value: 'Apples'
    },
    {
      key: 102,
      value: 'Oranges'
    },
    {
      key: 103,
      value: 'Bananas'
    }
  ]
}

// Actions for Update:
function actions(state, msg) {
  switch (msg.type) {
    case 'add-item':
      const value = msg.inputValue
      if (value) {
        state.fruits.push({ key: state.newKey++, value })
        return [state]
      } else {
        alert('Please provide a value!')
        return [state]
      }
      break
    case 'delete-item':
      state.fruits = state.fruits.filter(item => item.key != msg.key)
      return [state]
      break
  }
}

// Functional list component for view:
function List({state, send}) {
  let inputValue
  const focusInput = input => {
    input.focus()
  }
  const getInputValue = e => (inputValue = e.target.value)
  return (
    <div class='list-container'>
      <p class='list-form'>
        <input value={state.inputVal} onupdate={focusInput} onchange={getInputValue} type="text"/>
        <button class='add-item' onclick={() => send({type: 'add-item', inputValue})}>Add</button>
      </p>
      <ul>
        {
          state.fruits.map(item => (
            <li key={item.key}>
              <span>{item.value}</span>
              <button class="delete-item" onclick={() => send({
                type: 'delete-item',
                key: item.key
              })}>X</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

// Assemble program together:
const program = {
  init() {
    return [state]
  },
  update(state, msg) {
    return actions(state, msg)
  },
  view(state, send) {
    return render(<List {...{state, send}} />, '#todo-list')
  }
}

// Run program:
run(program)
```

[Live example on Codepen](https://codepen.io/rbiggs/pen/gBZEQp?editors=1010)

In the above example, we now have a dedicated actions function that handles different possible updates: add-item, delete-item. Notice that an action always returns state:
```javascript
return [state]
```
If an action fails to return state, the program will throw an exception and the view will fail to render. Even if you make no changes to state, you have to return it.

The program's view method gets two arguments, the state and the send function. This is used interally by the runtime. You use it in the view to send messages to the update method. These messages can be objects with a type and data for the action to use.

Although this is manageable, we can make this actions and events more implicit by using tagged unions. This is explained next.

## Tagged Unions

@composi/core's `union` function lets you create tagged unions. A tagged union allows you to associate one value with another value. For actions and events this will match the sent message type to the action function to run.

The union function takes a variable number of arguments, separated by commas. This returns a tagged union object. It has a method called `match` that allows you to check what union you are dealing with a run a function.

Here's the previous todo list redone using tagged unions. Notice that in the view, when we send, we send a tagged union function. This makes it clearer what the event is doing. When we pass a tagged union function to an event's send method, it invokes that function to get a message object with a type and data to the update function. So tagged unions are doing the same as we did in the first example of the todo list, but the show what is being invoked inside the update function.

```javascript
import { h, render, run } from '@composi/core'

const section = document.querySelector('section')

// The State.
// An object defining the state for the app.
const state = {
  newKey: 104,
  inputValue: '',
  fruits: [
    {
      key: 101,
      value: 'Apples'
    },
    {
      key: 102,
      value: 'Oranges'
    },
    {
      key: 103,
      value: 'Bananas'
    }
  ]
}

// Tagged union for actions,
// This will match string values to functions.
// Capture the union in the Msg object.
const Msg = union('updateInputValue', 'addItem', 'deleteItem')

// Desturcture tagged union variables:
const {updateInputValue, addItem, deleteItem} = Msg


// Business Logic.
// Intercept actions dispatched by view.
// Use those actions to transform state.
// Then return the new state.
// That will cause the view to update.
function actions(state, msg, send) {
  return Msg.match(msg, {
    updateInputValue: value => {
      state.inputValue = value
      return [state]
    }
    addItem: () => {
      if (state.inputValue) {
        state.fruits.push({ key: state.newKey++, value: state.inputValue })
        return [state]
      } else {
        alert('Please provide a value!')
      }
    },
    deleteItem: key => {
      state.fruits = state.fruits.filter(item => item.key != key)
      return [state]
    }
  })
}

// The view: a list component.
// I knows nothing about state or update.
// It catches user interactions and
// dispatches the results.
// It also uses lifecycle events to handle
// visual effects, such as input focus.
function List({state, send}) {
  let inputValue
  const focusInput = input => {
    input.focus()
  }
  return (
    <div class='list-container'>
      <p class='list-form'>
        <input
          value={state.inputValue}
          onupdate={focusInput}
          oninput={e => send(updateInputValue(e.target.value))} type="text"
        />
        <button class='add-item' onclick={() => send(addItem())}>Add</button>
      </p>
      <ul>
        {
          state.fruits.map(item => (
            <li key={item.key}>
              <span>{item.value}</span>
              <button
                class="deleteItem"
                onclick={() => send(deleteItem(item.key))}
              >X</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

// Assemble program to run:
const program = {
  init() {
    return [state]
  },
  view(state, send) {
    return render(<List state={...{state, send}} />, '#todo-list')
  },
  update(state, msg, send) {
    return actions(state, msg, send)
  }
}

// Run program:
run(program)
```
[Live example on Codepen](https://codepen.io/rbiggs/pen/zMOmON)

As you can see in the above example, tagged unions make the connection between view events and update actions more implicit.


### No Matching Message

By default if you pass a message whose type does have a match in the action methods provided, the union will log an error alerting you to this fact. This can happen is you send a message object and mispell the message type.

You can override this behavior and provide your own default behavior for what to do when there is no match. To do so, just provide an optional third argument to the Message Union match method:

```javascript
function actions(state, msg, send) {
  const prevState = {...state}
  return Msg.match(
    msg,
    {
      DoIt: () => {
        prevState.successMessage = 'We are doing it!'
        return prevState
      }
    },
    () => {
      prevState.errorMessage = `Ooops! I got the following message: ${msg.type}. Is this a typo?`)
      return prevState
    }
  )
}
```

## Summary

Composi is all about components. These provide a great way to organize your code into modular and reusable chunks. The virtual DOM means you never have to touch the DOM to change the structure.

Because Composi uses JSX, there are many similarities to React patterns. Please note that Composi is not a React clone. It is not trying to be compatible with React and the React ecosystem the way Preact and Inferno do. Composi core does not have PropTypes. Events are not synthetic. Functional component have three lifecycle hooks, whereas React functional components have none. However, because of using a virtual DOM and JSX, the similarities are greater than the differences. The API is very small--comprising two functions: `h` and `render` and three lifecycle hooks that are similar to the ones React has for class components. If you are familiar with React, Inferno or Preact, you can note the differences and be productive with Composi core in less than a half hour.
