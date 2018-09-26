(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.composi = {})));
}(this, (function (exports) { 'use strict';

  /**
   * Used to determine if a vnode should be recycled.
   * @type {number}
   */
  const RECYCLED_NODE = 0;
  /**
   * Used in a vnode to indicate that it is a DOM node.
   * @type {number}
   */

  const ELEMENT_NODE = 1;
  /**
   * Used in a vnode to indicate that it is a text node.
   * @type {number}
   */

  const TEXT_NODE = 3;
  /**
   * Namespace for SVG elements with `xlink:href` attributes.
   * @type {string}
   */

  const XLINK_NS = 'http://www.w3.org/1999/xlink';
  /**
   * Namespace for SVG elements.
   * @type {string}
   */

  const SVG_NS = 'http://www.w3.org/2000/svg';
  /**
   * An empty object. Used as placeholder for `props` in VNode.
   * @type {{}} EMPTY_OBJECT
   */

  const EMPTY_OBJECT = {};
  /**
   * An empty array. Used for access to array methods.
   * @type {any[]} EMPTY_ARRAY
   */

  const EMPTY_ARRAY = [];

  /**
   * @typedef {Object.<string, any> | {}} Props
   * @property {Children} Props.children
   */

  /**
   * @typedef {VNode[]} Children
   */

  /**
   * @typedef {string | number | Function} Type
   * @typedef {number | string | null} Key
   * @typedef {Object.<string, any>} VNode
   * @property {Type} VNode.type
   * @property {Props} VNode.props
   * @property {Children} VNode.children
   * @property {Element} VNode.element
   * @property {Key} [VNode.key]
   * @property {number} VNode.flag
   */

  /**
   * Create a virtual node with the provided properties.
   * @param {string | Function} type
   * @param {Props} props
   * @param {Children} children
   * @param {Element} element
   * @param {string | number | null} key
   * @param {number} flag
   * @return {VNode} VNode
   */

  function createVNode(type, props, children, element, key, flag) {
    return {
      type,
      props,
      children,
      element,
      key,
      flag
    };
  }
  /**
   * Create a virtual text node.
   * @param {string} text
   * @param {Element} [element]
   * @return {VNode} VNode
   */

  function createTextVNode(text, element) {
    return createVNode(text, EMPTY_OBJECT, EMPTY_ARRAY, element, null, TEXT_NODE);
  }
  /**
   * Create a virtual node represeting an element and its children.
   * @param {Element} element
   * @return {VNode} VNode
   */

  function hydrate(element) {
    if (typeof element === 'string') element = document.querySelector(element);
    return createVNode(element.nodeName.toLowerCase(), EMPTY_OBJECT, EMPTY_ARRAY.map.call(element.childNodes, vnodeFromChild), element, null, RECYCLED_NODE);
  }
  /**
   * Cycle through the child nodes of an element and create virtual nodes of them.
   * @param {Element} element
   * @return {VNode}
   */

  function vnodeFromChild(element) {
    if (element.nodeType === 3) {
      return createTextVNode(element.nodeValue, element);
    } else {
      return hydrate(element);
    }
  }

  /**
   * Creates a virtual node representing a node or text node to be created.
   * @typedef {import('./vnode').VNode} VNode
   * @param {string | Function} type
   * @param {Object.<string, any>} props
   * @return {VNode}
   */

  function h(type, props, ...children) {
    let node;
    const tempBox = [];
    const childNodes = [];
    let length = children.length;
    props = props || {};
    const key = props.key;

    while (length-- > 0) tempBox.push(children[length]);

    if (props.children != null) {
      if (tempBox.length <= 0) {
        tempBox.push(props.children);
      }

      delete props.children;
    }

    while (tempBox.length > 0) {
      if (Array.isArray(node = tempBox.pop())) {
        for (length = node.length; length-- > 0;) {
          tempBox.push(node[length]);
        }
      } else if (node === false || node === true || node == null) ; else {
        childNodes.push(typeof node === 'object' ? node : createTextVNode(node));
      }
    }

    delete props.key;

    if (typeof type === 'function') {
      return type(props, props.children = childNodes);
    } else {
      return createVNode(type, props, childNodes, null, key, ELEMENT_NODE);
    }
  }

  /**
   * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
   *
   * @param {Object.<string, any>[]} objects
   * @return {Object.<string, any>} Object.<string, any>
   */
  function mergeObjects(...objects) {
    // Clone both objects:
    const clones = objects.map(obj => JSON.parse(JSON.stringify(obj)));
    // Merge objects:
    return clones.reduce((a, b) => Object.assign({}, a, b))
  }

  /**
   * Determine the type of the provided argument.
   * @param {*} value
   * @return {string} string
   */
  function getType(value) {
    // Trap for NaN:
    if (typeof value === 'number' && isNaN(value)) {
      return 'NaN'
    } else {
      return new RegExp('\\[object (.*)]').exec(toString.call(value))[1]
    }
  }

  /**
   * Event proxy for inline events.
   * @param {Event} event
   * @return {any} any
   */

  function eventProxy(event) {
    return event.currentTarget['events'][event.type](event);
  }
  /**
   * Get the key value of a virtual node.
   * @typedef {import('./vnode').VNode} VNode
   * @param {VNode} node
   * @return {string | number | null}
   */


  function getKey(node) {
    return node == null ? null : node.key;
  }
  /**
   * Create a map of keyed nodes.
   * @typedef {import('./vnode').Children} Children
   * @param {Children} children
   * @param {number} start
   * @param {number} end
   * @return {Object.<string, any>} Object.<string, any>
   */


  function createKeyMap(children, start, end) {
    const out = {};
    let key;
    let node;

    for (; start <= end; start++) {
      if ((key = (node = children[start]).key) != null) {
        out[key] = node;
      }
    }

    return out;
  }
  /**
   * Update the properties and attributes of a VNode based on new data.
   * @param {Element} element
   * @param {string} prop
   * @param {any} oldValue
   * @param {any} newValue
   * @param {boolean} isSVG
   * @return {void} undefined
   */


  function setProp(element, prop, oldValue, newValue, isSVG) {
    if (oldValue === newValue) return;

    if (prop === 'style' && getType(newValue) === 'Object') {
      for (let i in mergeObjects(oldValue, newValue)) {
        const style = newValue == null || newValue[i] == null ? '' : newValue[i];

        if (i[0] === '-') {
          element[prop].setProperty(i, style);
        } else {
          element[prop][i] = style;
        }
      }
    } else if (prop !== 'key') {
      if (prop === 'className') prop = 'class';

      if (prop[0] === 'o' && prop[1] === 'n') {
        if (!element['events']) element['events'] = {};
        prop = prop.slice(2).toLowerCase();
        if (!oldValue) oldValue = element['events'][prop];
        element['events'][prop] = newValue;

        if (newValue == null) {
          element.removeEventListener(prop, eventProxy);
        } else if (oldValue == null) {
          element.addEventListener(prop, eventProxy);
        }
      } else {
        const nullOrFalse = newValue == null || newValue === false || newValue === 'no' || newValue === 'off';

        if (prop in element && prop !== 'list' && prop !== 'type' && prop !== 'draggable' && prop !== 'spellcheck' && prop !== 'translate' && !isSVG) {
          element[prop] = newValue == null ? '' : newValue;

          if (nullOrFalse) {
            element.removeAttribute(prop);
          }
        } else {
          if (prop === 'xlink-href' || prop === 'xlinkHref') {
            element.setAttributeNS(XLINK_NS, 'href', newValue);
            element.setAttribute('href', newValue);
          } else {
            if (nullOrFalse) {
              element.removeAttribute(prop);
            } else {
              element.setAttribute(prop, newValue);
            }
          }
        }
      }
    }
  }
  /**
   * Create an element, either node or text, from a VNode.
   * @typedef {Function[]} Lifecycle
   * @param {VNode} vnode
   * @param {Lifecycle} lifecycle
   * @param {boolean} [isSVG]
   * @return {Element}
   */


  function createElement(vnode, lifecycle, isSVG) {
    let element;

    if (vnode.flag === TEXT_NODE) {
      element = document.createTextNode(
      /** @type {string} */
      vnode.type);
    } else {
      if (isSVG = isSVG || vnode.type === 'svg') {
        element = document.createElementNS(SVG_NS,
        /** @type {string} */
        vnode.type);
      } else {
        element = document.createElement(
        /** @type {string} */
        vnode.type);
      }
    }

    const props = vnode.props;

    if (props['onmount']) {
      lifecycle.push(function () {
        props['onmount'](element);
      });
    }

    for (let i = 0, length = vnode.children.length; i < length; i++) {
      element.appendChild(createElement(vnode.children[i], lifecycle, isSVG));
    }

    for (let prop in props) {
      setProp(
      /** @type {Element} */
      element, prop, null, props[prop], isSVG);
    }

    return vnode.element =
    /** @type {Element} */
    element;
  }
  /**
   * Remove children from a node.
   * @param {VNode} node
   * @return {Element}
   */

  function removeChildren(node) {
    for (let i = 0, length = node.children.length; i < length; i++) {
      removeChildren(node.children[i]);
    }

    return node.element;
  }
  /**
   * Remove an element from the DOM.
   * @param {Element} parent
   * @param {VNode} vnode
   * @return {void} undefined
   */


  function removeElement(parent, vnode) {
    function done() {
      if (parent && parent.nodeType) parent.removeChild(removeChildren(vnode));
    }

    const cb = vnode.props && vnode.props['onunmount'];

    if (cb != null) {
      cb(done, vnode.element);
    } else {
      done();
    }
  }
  /**
   * Update and element based on new prop values.
   * @typedef {import('./vnode').Props} Props
   * @param {Element} element
   * @param {Props} oldProps
   * @param {Props} newProps
   * @param {Lifecycle} lifecycle
   * @param {boolean} isSVG
   * @param {boolean} isRecycled
   * @return {void} undefined
   */


  function updateElement(element, oldProps, newProps, lifecycle, isSVG, isRecycled) {
    for (let prop in mergeObjects(oldProps, newProps)) {
      if ((prop === 'value' || prop === 'checked' ? element[prop] : oldProps[prop]) !== newProps[prop]) {
        setProp(element, prop, oldProps[prop], newProps[prop], isSVG);
      }
    }

    const cb = isRecycled ? newProps['onmount'] : newProps['onupdate'];

    if (cb != null) {
      lifecycle.push(function () {
        cb(element, oldProps, newProps);
      });
    }
  }
  /**
   * Patch an element based on differences between its old VNode and its new one.
   * @param {Element} parent
   * @param {Element} element
   * @param {VNode} oldVNode
   * @param {VNode} newVNode
   * @param {Lifecycle} lifecycle
   * @param {boolean} [isSVG]
   * @return {VNode}
   */


  function patchElement(parent, element, oldVNode, newVNode, lifecycle, isSVG) {
    // Abort if vnodes are identical.
    if (newVNode === oldVNode) ; else if (oldVNode != null && oldVNode.flag === TEXT_NODE && newVNode.flag === TEXT_NODE) {
      if (oldVNode.type !== newVNode.type) {
        element.nodeValue =
        /** @type {string} */
        newVNode.type;
      }
    } else if (oldVNode == null || oldVNode.type !== newVNode.type) {
      const newElement = parent.insertBefore(createElement(newVNode, lifecycle, isSVG), element);
      if (oldVNode != null) removeElement(parent, oldVNode);
      element = newElement;
    } else {
      updateElement(element, oldVNode.props, newVNode.props, lifecycle, isSVG = isSVG || newVNode.type === 'svg', oldVNode.flag === RECYCLED_NODE);
      let savedNode;
      let childNode;
      let lastKey;
      const lastChildren = oldVNode.children;
      let lastChildStart = 0;
      let lastChildEnd = lastChildren.length - 1;
      let nextKey;
      const nextChildren = newVNode.children;
      let nextChildStart = 0;
      let nextChildEnd = nextChildren.length - 1;

      while (nextChildStart <= nextChildEnd && lastChildStart <= lastChildEnd) {
        lastKey = getKey(lastChildren[lastChildStart]);
        nextKey = getKey(nextChildren[nextChildStart]);
        if (lastKey == null || lastKey !== nextKey) break;
        patchElement(element, lastChildren[lastChildStart].element, lastChildren[lastChildStart], nextChildren[nextChildStart], lifecycle, isSVG);
        lastChildStart++;
        nextChildStart++;
      }

      while (nextChildStart <= nextChildEnd && lastChildStart <= lastChildEnd) {
        lastKey = getKey(lastChildren[lastChildEnd]);
        nextKey = getKey(nextChildren[nextChildEnd]);
        if (lastKey == null || lastKey !== nextKey) break;
        patchElement(element, lastChildren[lastChildEnd].element, lastChildren[lastChildEnd], nextChildren[nextChildEnd], lifecycle, isSVG);
        lastChildEnd--;
        nextChildEnd--;
      }

      if (lastChildStart > lastChildEnd) {
        while (nextChildStart <= nextChildEnd) {
          element.insertBefore(createElement(nextChildren[nextChildStart++], lifecycle, isSVG), (childNode = lastChildren[lastChildStart]) && childNode.element);
        }
      } else if (nextChildStart > nextChildEnd) {
        while (lastChildStart <= lastChildEnd) {
          removeElement(element, lastChildren[lastChildStart++]);
        }
      } else {
        let lastKeyed = createKeyMap(lastChildren, lastChildStart, lastChildEnd);
        const nextKeyed = {};

        while (nextChildStart <= nextChildEnd) {
          lastKey = getKey(childNode = lastChildren[lastChildStart]);
          nextKey = getKey(nextChildren[nextChildStart]);

          if (nextKeyed[lastKey] || nextKey != null && nextKey === getKey(lastChildren[lastChildStart + 1])) {
            if (lastKey == null) {
              removeElement(element, childNode);
            }

            lastChildStart++;
            continue;
          }

          if (nextKey == null || oldVNode.flag === RECYCLED_NODE) {
            if (lastKey == null) {
              patchElement(element, childNode && childNode.element, childNode, nextChildren[nextChildStart], lifecycle, isSVG);
              nextChildStart++;
            }

            lastChildStart++;
          } else {
            if (lastKey === nextKey) {
              patchElement(element, childNode.element, childNode, nextChildren[nextChildStart], lifecycle, isSVG);
              nextKeyed[nextKey] = true;
              lastChildStart++;
            } else {
              if ((savedNode = lastKeyed[nextKey]) != null) {
                patchElement(element, element.insertBefore(savedNode.element, childNode && childNode.element), savedNode, nextChildren[nextChildStart], lifecycle, isSVG);
                nextKeyed[nextKey] = true;
              } else {
                patchElement(element, childNode && childNode.element, null, nextChildren[nextChildStart], lifecycle, isSVG);
              }
            }

            nextChildStart++;
          }
        }

        while (lastChildStart <= lastChildEnd) {
          if (getKey(childNode = lastChildren[lastChildStart++]) == null) {
            removeElement(element, childNode);
          }
        }

        for (let key in lastKeyed) {
          if (nextKeyed[key] == null) {
            removeElement(element, lastKeyed[key]);
          }
        }
      }
    }

    newVNode.element = element;
    return newVNode;
  }
  /**
   * Function to either mount an element the first time or patch it in place. This behavior depends on the value of the old VNode. If it is null, a new element will be created, otherwise it compares the new VNode with the old one and patches it.
   * @param {VNode} newVNode
   * @param {Element | string} container
   * @param {VNode} [oldVNode]
   * @return {VNode} VNode
   */

  function patch(newVNode, container, oldVNode) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }

    const lifecycle = [];

    if (!oldVNode) {
      const el = createElement(newVNode, lifecycle);
      container.appendChild(el);
      newVNode.element = el;
    } else {
      patchElement(container, oldVNode['element'], oldVNode, newVNode, lifecycle);
    }

    if (newVNode !== oldVNode) {
      while (lifecycle.length > 0) lifecycle.pop()();
    }

    newVNode.element['isMounted'] = true;
    return newVNode;
  }

  /**
   * A function to update a functional component already mounted in the DOM. The first argument can be either a JSX tag or an h function.
   * @example
   *
   * ```
   * // Update Title tag into section:
   * const element = mount(<Title message='Hello World!'/>, 'section')
   * // Pass the captured element to the render function:
   * render(<Title message='Hello Everyone!'/>, element, 'header')
   * ```
   * @typedef {import('./vnode').VNode} VNode
   * @param {VNode} newVNode
   * @param {Element | string} container
   * @param {VNode} [oldVNode]
   * @return {VNode} VNode
   */

  function render(newVNode, container, oldVNode) {
    return patch(newVNode, container, oldVNode);
  }

  /**
   * Function to unmount a mounted functional component. This deletes the base element of the component from the DOM.
   * @example
   * 
   * ```
   * // First mount component:
   * let title = mount(<Title message='Hello World!'/>, 'header')
   * // Sometime later unmount it by passing the vnode to unmount:
   * unmount(title)
   ```
   * @typedef {import('./vnode').VNode} VNode
   * @param {VNode} vnode The virtual node of the component to unmount.
   * @return {void} undefined
   */
  function unmount(vnode) {
    /**
     * Function to remove the base element of a functional component from the DOM.
     * @return {void} undefined
     */
    function doneUnmounting() {
      vnode.element.parentNode.removeChild(vnode.element);
      vnode.element = null;
    }

    if (vnode.props['onunmount']) {
      vnode.props['onunmount'](doneUnmounting, vnode.element);
    } else {
      doneUnmounting();
    }
  }

  exports.h = h;
  exports.render = render;
  exports.unmount = unmount;
  exports.hydrate = hydrate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=composi.js.map
