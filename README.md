# Composi

 1. [Introduction](#Introduction)
 2. [Installation](#Installation)
 3. [h](#h)
 4. [render](#render)
 5. [Keys](#Keys)
 6. [Lifecycle Hooks](#Lifecycle-Hooks)
 7. [onmount](#onmount)
 *  [Accessing the Component's DOM](#Accessing-the-Component's-DOM)
 *  [Event Delegation](#Event-Delegation)
 8. [onupdate](#onupdate)
 9. [onunmount](#onunmount)
10. [hydrate](#hydrate)
11. [unmount](#unmount)
12. [Summary](#Summary)

## Introduction

Composi is a framework for creating desktop and mobile apps. With Composi you can create a dynamic website with reactive components, a progressive web app, or a hybrid app for mobile app stores. Visit the [website](https://composi.github.io).

Composi core is small, barely 2KB gzipped. It therefore loads fast. Its virtual DOM updates components efficiently and quickly. It has an API very similar to React, while mainting it's emphasis on simplicity, size, and ease of learning. In fact, you can learn everything you need to know to build apps with Composi core in an hour.

Composi core supports functional components. You use props to pass in values, data or events. A functional component can have child components. And a parent can pass props down to its children. There is no two-way data binding. Data flows down from parent to child.

A component's markup is written with JSX. This means you can create custom tags to organize your component's DOM structure. If you prefer, you can instead use the `h` function to define the component's markup with hyperscript. In fact, at build time the JSX is converted to `h` functions.

Unlike React, properties are standard HTML versions--`class` instead of `className`, etc., and inline events are lowercase, not camel case. However, self-closing tags do need to have a final back slash to be valid.

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
    'nav',
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
let title = render(Title('World'), 'header')
```

If there are not props for an element, you can use `{}`. You could also just use null, but {} is two characters shorter.

The above hyperscript function is equivalent to the following JSX:

```javascript
const Title({greet}) {
  return (
    <nav class='heading'>
      <h1 title={greet}>Hello, {greet}!</h1>
    </nav>
  )
}

// Render component:
let title = render(<Title greet='World' />, 'header')
```

JSX will always be more compact and readable than writing out a hyperscript function. However, you can pick the style you prefer.

## render

You use the `render` function to mount and update a functional component. It takes two to three arguments. For the first render you only need to pass two arguments--the comonent to render and the container to insert it in:

```javascript
import { h, render } from '@composi/core'

function Title({greet}) {
  return (
    <nav>
      <h1>Hello, {greet}!</h1>
    </nav>
  )
}

// Mount the component:
render(<Title greet='Everybody'/>, document.body)
```

When providing a container to render in, you can use either a DOM node reference, or a valid selector value:

```javascript
// Mount the component in header tag:
render(<Title greet='Everybody'/>, document.querySelector('header'))

// Or just pass in a selector:
render(<Title greet='Everybody'/>, 'header')
```

The `render` function returns a vitual node representing the current state of the component. If you are going to update a component after its initial render, you'll want to capture the initial render in a variable so you can reuse it in further renders. In fact, each time you render a functional component you'll need to capture its state in the variable again. Notice how we do this below:

```javascript
import { h, render } from '@composi/core'

function Title({greet}) {
  return (
    <nav>
      <h1>Hello, {greet}!</h1>
    </nav>
  )
}

// Mount the component.
// Capture component reference in variable `title`.
let title = render(<Title greet='Joe'/>, document.body)

// Update the component 5 seconds later.
// Notice how we pass variable `title` from above as third argument.
setTimeout(() => {
  title = render(<Title greet='Everybody Else'/>, document.body, title)
}, 5000)
```

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
let list = render(<List data={fruits} />, document.body)
```

## Lifecycle Hooks

Composi core provides three lifecycle hooks. These are registred on the element that you want to track. The expect a callback to execute when they occur. Each callback will get certain arguments passed to it based on which lifecyle hook it is.

1. [onmount](#onmount)
2. [onupdate](#onupdate)
3. [onunmount](#onunmount)

## onmount

The `onmount` lifecycle hook lets you do something right after a component is mounted. It also gives you access to the element on which the hook is registered.

*  [Accessing the Component's DOM](#Accessing-the-Component's-DOM)
*  [Event Delegation](#Event-Delegation)

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
      // Notice how we pass the clock reference as last argument.
      clock = render(<Clock />, document.body, clock)
    }),
    1000
  )
}

// Mount clock.
// Capture first render in variable `clock`.
// We'll reuse this reference in initClock funciton above.
let clock = render(<Clock />, document.body)
```
In the above example, the component will be updated every second. But only the text node with the time value will change due to virtual DOM patching.

Since we are re-rendering the clock every second, we recapture the result as well. This enables Composi to update the DOM efficiently, keeping DOM thrashing to a minimal.

### Accessing the Component's DOM

You can also use `onmount` to access the DOM of the component to set focus on an input:

```javascript
import { h, render } from '@composi/core'

function Form() {
  function init(form) {
    form.querySelector('input').focus()
  }
  return (
    <form onmount={form => init(form)}>
      <p>
        <input type='text' />
      </p>
      <p>
        <button type='submit'>Add</button>
      </p>
    </form>
  )
}
```

When the above component renders, the input will have focus.

### Event Delegation

You can similarly use the `onmount` lifecyle to set up event delegation. This is handy for situations where you need to handle events on a long list of items. Having an inline even on each item is inefficient. Event delegation reduces this to just one event for the list. 

```javascript 
import { h, render } from '@composi/core'

function List({data}) {
  function init(list) {
    list.addEventListener('click', e => {
      // Check that the user click on a list item:
      e.target.nodeName === 'LI' && alert(`You selected: ${e.target.textContent}.`)
    })
  }
  return (
    <ul onmount={list => init(list)}>
      {
        data.map(item => <li>{item.value}</li>)
      }
    </ul>
  )
}
```

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

// Mount component:
let title = render(<Title greet='World'/>, document.body)

// Update component in 5 seconds:
setTimeout(() => {
  title = render(<Title greet='World'/>, document.body, title)
}, 5000)
```

## onunmount

This gets two arguments--`done` and the element it is on. `done` is a callback that you will need to call after you finish whatever you are doing. Calling `done()` allows the unmount to continue. Failing to call it will prevent the element from being removed from the DOM. This can lead to serious problems when Composi tries to reconcile the DOM with the virtual DOM.

#### Example

```javascript
import { h, render } from '@composi/core'

function List({data}) {
  function deleteItem(id) {
    const newData = data.filter(item => item.id != id)
    list = render(<List data={fruits}/>, document.body, list)
  }

  // Animate list item when deleted.
  function animate(item, done) {
    item.style.cssText = 'transition: all .5s ease-out; height: 0px; transform: translateX(-300px);'
    // Don't forget to call `done()` or the element won't be removed!
    done()
  }
  return (
    <ul>
      {
        data.map(item => <li key={item.id} onunmount={(item, done) => animate(item, done)}>
          <span>{item.value}</span>
          <button class='delete' onclick={() => deleteItem(item.id)}>X</button>
        </li>)
      }
    </ul>
  )
}

let list = render(<List data={fruits}/>, document.body)
```

## hydrate

You can hydrate server-rendered content. Composi core lets you create a virtual DOM based on the server content and then update that with your functional component.

To hydrate content you'll need to import it from Composi core. Then use it to convert the DOM node into a virtual node and pass it as the third argument of the `render` function.

```javascript
import { h, render, hydrate } from '@composi/core'

// Convert server-rendered list into a virtual node:
serverList = hydrate('#list)

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
let list = render(<List data={fruits} />, 'section', serverList)
```

## unmount

You can unmount a component using the `unmount` function. This takes one argument--the virtual node of the rendered component. This is the value you have stored in a variable when you render a component. 

Most of the time you should be able to unmount a component using conditional logic. For that rare case when this won't work, you can use this. Removing a component with `unmount` deletes its structure from the DOM and reduces the variable value to null. If you need to, you can pass that variable to the `render` function later to remount the component. After doing so the component will works as it did before.

### Example

```javascript
import { h, render, unmount } from '@composi/core'

function Title({greet}) {
  return (
    <nav>
      <h1>Hello, {greet}!</h1>
    </nav>
  )
}

// Render component:
let title = render(<Title greet='World' />, 'header')

// Sometime later unmount the component:
unmount(title)

// Sometime later remount component:
title = render(<Title greet='Everyone' />, 'header', title)
```

## Summary

Composi is all about components. These provide a great way to organize your code into modular and reusable chunks. The virtual DOM means you never have to touch the DOM to change the structure.

Because Composi uses JSX, there are many similarities to React patterns. Please note that Composi is not a React clone. It is not trying to be compatible with React and the React ecosystem the way Preact and Inferno do. Composi core does not have PropTypes. Events are not synthetic. Functional component have three lifecycle hooks, whereas React functional components have none. However, because of using a virtual DOM and JSX, the similarities are greater than the differences. The API is very small--comprising four functions: `h`, `render`, `hydrate` and `unmount`, and three lifecycle hooks that are similar to the ones React has for class components. If you are familiar with React, Inferno or Preact, you can note the differences and be productive with Composi core in less than an hour. 
