(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.composi={})})(this,function(a){"use strict";function b(a,b,c,d,e,f){return{type:a,props:b,children:c,element:d,key:e,flag:f}}function c(a,c){return b(a,z,A,c,null,w)}function d(a){return"string"==typeof a&&(a=document.querySelector(a)),b(a.nodeName.toLowerCase(),z,A.map.call(a.childNodes,e),a,null,v)}function e(a){return 3===a.nodeType?c(a.nodeValue,a):d(a)}function f(...a){function c(a,b=new WeakMap){if(Object(a)!==a)return a;if(b.has(a))return b.get(a);const d=a instanceof Date?new Date(a):a instanceof RegExp?new RegExp(a.source,a.flags):a.constructor?new a.constructor:Object.create(null);return b.set(a,d),Object.assign(d,...Object.keys(a).map(d=>({[d]:c(a[d],b)})))}return(Array.isArray(a[0])?a.unshift([]):a.unshift({}),Array.isArray(a[0]))?a.reduce((d,a)=>Array.prototype.concat(d,c(a))):"object"==typeof a[0]?a.reduce((d,a)=>Object.assign(d,c(a))):void 0}function g(a){return a.currentTarget.events[a.type](a)}function h(a){return null==a?null:a.key}function i(a,b,c){const d={};let e,f;for(;b<=c;)null!=(e=(f=a[b]).key)&&(d[e]=f),b++;return d}function j(a,b,c,d,e){if("key"===b);else if("style"===b)for(let e in f(c,d)){const c=null==d||null==d[e]?"":d[e];"-"===e[0]?a[b].setProperty(e,c):a[b][e]=c}else if("o"===b[0]&&"n"===b[1])b=b.slice(2).toLowerCase(),a.events||(a.events={}),a.events[b]=d,null==d?a.removeEventListener(b,g):null==c&&a.addEventListener(b,g);else{let c=null==d||!1===d;b in a&&"list"!==b&&"type"!==b&&"draggable"!==b&&"spellcheck"!==b&&"translate"!==b&&!e?(a[b]=null==d?"":d,c&&a.removeAttribute(b)):"xlink-href"===b||"xlinkHref"===b?(a.setAttributeNS(x,"href",d),a.setAttribute("href",d)):c?a.removeAttribute(b):a.setAttribute(b,d)}}function k(a,b,c){let d=a.flag===w?document.createTextNode(a.type):(c=c||"svg"===a.type)?document.createElementNS(y,a.type):document.createElement(a.type);const e=a.props;e.onmount&&b.push(function(){e.onmount(d)});let f=0;for(const e=a.children.length;f<e;)d.appendChild(k(a.children[f],b,c)),f++;for(let f in e)j(d,f,null,e[f],c);return a.element=d}function l(a){let b=0;for(const c=a.children.length;b<c;)l(a.children[b]),b++;return a.element}function m(a,b){const c=function(){a.removeChild(l(b))},d=b.props&&b.props.onunmount;null==d?c():d(c,b.element)}function n(a,b,c,d,e,g){for(let h in f(b,c))("value"==h||"checked"==h?a[h]:b[h])!==c[h]&&j(a,h,b[h],c[h],e);const h=g?c.onmount:c.onupdate;null!=h&&d.push(function(){h(a,b,c)})}function o(a,b,c,d,e,f){if(d===c);else if(null!=c&&c.flag===w&&d.flag===w)c.type!==d.type&&(b.nodeValue=d.type);else if(null==c||c.type!==d.type){const g=a.insertBefore(k(d,e,f),b);null!=c&&m(a,c),b=g}else{n(b,c.props,d.props,e,f=f||"svg"===d.type,c.flag===v);let a,g,j,l,p=c.children,q=0,r=p.length-1;const s=d.children;let t=0,u=s.length-1;for(;t<=u&&q<=r&&(j=h(p[q]),l=h(s[t]),null!=j&&j===l);)o(b,p[q].element,p[q],s[t],e,f),q++,t++;for(;t<=u&&q<=r&&(j=h(p[r]),l=h(s[u]),null!=j&&j===l);)o(b,p[r].element,p[r],s[u],e,f),r--,u--;if(q>r)for(;t<=u;)b.insertBefore(k(s[t++],e,f),(g=p[q])&&g.element);else if(t>u)for(;q<=r;)m(b,p[q++]);else{const d=i(p,q,r),k={};for(;t<=u;){if(j=h(g=p[q]),l=h(s[t]),k[j]||null!=l&&l===h(p[q+1])){null==j&&m(b,g),q++;continue}null==l||c.flag===v?(null==j&&(o(b,g&&g.element,g,s[t],e,f),t++),q++):(j===l?(o(b,g.element,g,s[t],e,f),k[l]=!0,q++):null==(a=d[l])?o(b,g&&g.element,null,s[t],e,f):(o(b,b.insertBefore(a.element,g&&g.element),a,s[t],e,f),k[l]=!0),t++)}for(;q<=r;)null==h(g=p[q++])&&m(b,g);for(let a in d)null==k[a]&&m(b,d[a])}}return b&&(d.element=b),d}function p(a,b,c){const d=[];if("string"==typeof c&&(c=document.querySelector(c)),Array.isArray(b))throw new B;if(o(c,a&&a.element,a,b,d),b!==a)for(;0<d.length;)d.pop()();return b}function q(a,b){return r(a)||s(a,b)||t()}function r(a){if(Array.isArray(a))return a}function s(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function u(a,b){const c=b&&b.prefix||"",d=c.length,e=Object.create(null);let f=d?a=>a&&a.type&&a.type.startsWith(c)&&a.type.slice(d):a=>a&&a.type;const g=(a,b)=>(c,d)=>{const e=f(c),g=C.call(a,e)&&a[e];return g?g(c.data,d):b(d)},h={match(a,b,c){return g(b,c)(a)},matcher:g,matches(a,b){const c=f(a);return!("string"!=typeof c||e[c]!==b)}};for(let d=0;d<a.length;){const b=a[d];e[b]=a=>({type:c+b,data:a}),d++}return{variants:e,methods:h}}const v=0,w=3,x="http://www.w3.org/1999/xlink",y="http://www.w3.org/2000/svg",z={},A=[];class B{constructor(){this.message="Cannot insert Fragment tag directly into DOM.",this.toString=function(){return this.message}}}const C=Object.prototype.hasOwnProperty;a.h=function(a,d,...e){d=d||{};let f;const g=[],h=[];let i=e.length;const j=Reflect.get(d,"key");for(;0<i--;)g.push(e[i]);for(Reflect.get(d,"children")&&(0>=g.length&&g.push(d.children),delete d.children);0<g.length;)if(Array.isArray(f=g.pop()))for(let a=f.length;0<a--;)g.push(f[a]);else if(!1===f||!0===f||null==f);else h.push("object"==typeof f?f:c(f));return"function"==typeof a?a(d,d.children=h):b(a,d,h,null,j,1)},a.render=function(a,b,c){let e;if(e="string"==typeof b?document.querySelector(b):b,!e)return console.error("@composi/core Error: You need to provide a valid container to render the component in. Check the element or selector you provided and make sure that it exists in the DOM before trying to render."),void console.error(`@composi/core Message: The container you provided was "${b}"`);let f;c?("string"==typeof c&&(c=document.querySelector(c)),f=d(c)):f=e&&Reflect.get(e,"vnode");const g=p(f,a,e);e.vnode=g},a.hydrate=d,a.run=function(a){function b(a){i&&c(d(a,g))}function c(c){let d=a.init();if(c){var f=q(c,2);g=f[0],h=f[1]}else if(d&&d.length){var i=q(d,2);g=i[0],h=i[1]}else g=[];h&&h(b),e(g,b)}const d=a.update,e=a.view,f=a.done;let g,h,i=!0;return c(g),()=>{i&&(i=!1,f&&f(g))}},a.union=function(a,b){const c=u(a,b),d=c.variants,e=c.methods;for(const c in e)d[c]=e[c];return d},a.mapEffect=function(a,b){return a?c=>function d(e){return c(b(e)),a(d)}:void 0},Object.defineProperty(a,"__esModule",{value:!0})});
//# sourceMappingURL=composi-core.js.map
