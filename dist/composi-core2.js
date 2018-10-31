(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.composi={})})(this,function(a){"use strict";function b(a,b,c,d,e,f){return{type:a,props:b,children:c,element:d,key:e,flag:f}}function c(a,c){return b(a,v,w,c,null,s)}function d(a){return"string"==typeof a&&(a=document.querySelector(a)),b(a.nodeName.toLowerCase(),v,w.map.call(a.childNodes,e),a,null,r)}function e(a){return 3===a.nodeType?c(a.nodeValue,a):d(a)}function f(...a){function c(a,b=new WeakMap){if(Object(a)!==a)return a;if(b.has(a))return b.get(a);const d=a instanceof Date?new Date(a):a instanceof RegExp?new RegExp(a.source,a.flags):a.constructor?new a.constructor:Object.create(null);return b.set(a,d),Object.assign(d,...Object.keys(a).map(d=>({[d]:c(a[d],b)})))}return a.unshift({}),a.reduce((d,a)=>Object.assign(d,c(a)))}function g(a){return a.currentTarget.events[a.type](a)}function h(a){return null==a?null:a.key}function i(a,b,c){const d={};let e,f;for(;b<=c;b++)null!=(e=(f=a[b]).key)&&(d[e]=f);return d}function j(a,b,c,d,e){if("key"===b);else if("style"===b)for(let e in f(c,d)){const c=null==d||null==d[e]?"":d[e];"-"===e[0]?a[b].setProperty(e,c):a[b][e]=c}else if("o"===b[0]&&"n"===b[1])b=b.slice(2).toLowerCase(),a.events||(a.events={}),a.events[b]=d,null==d?a.removeEventListener(b,g):null==c&&a.addEventListener(b,g);else{let c=null==d||!1===d;b in a&&"list"!==b&&"type"!==b&&"draggable"!==b&&"spellcheck"!==b&&"translate"!==b&&!e?(a[b]=null==d?"":d,c&&a.removeAttribute(b)):"xlink-href"===b||"xlinkHref"===b?(a.setAttributeNS(t,"href",d),a.setAttribute("href",d)):c?a.removeAttribute(b):a.setAttribute(b,d)}}function k(a,b,c){let d=a.flag===s?document.createTextNode(a.type):(c=c||"svg"===a.type)?document.createElementNS(u,a.type):document.createElement(a.type);const e=a.props;e.onmount&&b.push(function(){e.onmount(d)});for(let e=0,f=a.children.length;e<f;e++)d.appendChild(k(a.children[e],b,c));for(let f in e)j(d,f,null,e[f],c);return a.element=d}function l(a){for(let b=0,c=a.children.length;b<c;b++)l(a.children[b]);return a.element}function m(a,b){const c=function(){a.removeChild(l(b))},d=b.props&&b.props.onunmount;null==d?c():d(c,b.element)}function n(a,b,c,d,e,g){for(let h in f(b,c))("value"==h||"checked"==h?a[h]:b[h])!==c[h]&&j(a,h,b[h],c[h],e);const h=g?c.onmount:c.onupdate;null!=h&&d.push(function(){h(a,b)})}function o(a,b,c,d,e,f){if(d===c);else if(null!=c&&c.flag===s&&d.flag===s)c.type!==d.type&&(b.nodeValue=d.type);else if(null==c||c.type!==d.type){const g=a.insertBefore(k(d,e,f),b);null!=c&&m(a,c),b=g}else{n(b,c.props,d.props,e,f=f||"svg"===d.type,c.flag===r);let a,g,j,l,p=c.children,q=0,s=p.length-1;const t=d.children;let u=0,v=t.length-1;for(;u<=v&&q<=s&&(j=h(p[q]),l=h(t[u]),null!=j&&j===l);)o(b,p[q].element,p[q],t[u],e,f),q++,u++;for(;u<=v&&q<=s&&(j=h(p[s]),l=h(t[v]),null!=j&&j===l);)o(b,p[s].element,p[s],t[v],e,f),s--,v--;if(q>s)for(;u<=v;)b.insertBefore(k(t[u++],e,f),(g=p[q])&&g.element);else if(u>v)for(;q<=s;)m(b,p[q++]);else{const d=i(p,q,s),k={};for(;u<=v;){if(j=h(g=p[q]),l=h(t[u]),k[j]||null!=l&&l===h(p[q+1])){null==j&&m(b,g),q++;continue}null==l||c.flag===r?(null==j&&(o(b,g&&g.element,g,t[u],e,f),u++),q++):(j===l?(o(b,g.element,g,t[u],e,f),k[l]=!0,q++):null==(a=d[l])?o(b,g&&g.element,null,t[u],e,f):(o(b,b.insertBefore(a.element,g&&g.element),a,t[u],e,f),k[l]=!0),u++)}for(;q<=s;)null==h(g=p[q++])&&m(b,g);for(let a in d)null==k[a]&&m(b,d[a])}}return b&&(d.element=b),d}function p(a,b,c){const d=[];if("string"==typeof c&&(c=document.querySelector(c)),Array.isArray(b))throw new x;if(o(c,a&&a.element,a,b,d),b!==a)for(;0<d.length;)d.pop()();return b}function q(a,b){const c=b&&b.prefix||"",d=c.length;let e=d?a=>a&&a.type&&a.type.startsWith(c)&&a.type.slice(d):a=>a&&a.type;const f=(a,b)=>function(c,d){const f=e(c),g=y.call(a,f)&&a[f];return g?g(c.data,d):b(d)},g={match(a,b,c){return f(b,c)(a)},matcher:f,matches(a,b){const c=e(a);return!("string"!=typeof c||h[c]!==b)}},h=Object.create(null);for(let d=0;d<a.length;d++){const b=a[d];h[b]=a=>({type:c+b,data:a})}return{variants:h,methods:g}}const r=0,s=3,t="http://www.w3.org/1999/xlink",u="http://www.w3.org/2000/svg",v={},w=[];class x{constructor(){this.message="Cannot insert Fragment tag directly into DOM.",this.toString=function(){return this.message}}}const y=Object.prototype.hasOwnProperty;a.h=function(a,d,...e){d=d||{};let f;const g=[],h=[];let i=e.length;const j=Reflect.get(d,"key");for(;0<i--;)g.push(e[i]);for(Reflect.get(d,"children")&&(0>=g.length&&g.push(d.children),delete d.children);0<g.length;)if(Array.isArray(f=g.pop()))for(i=f.length;0<i--;)g.push(f[i]);else if(!1===f||!0===f||null==f);else h.push("object"==typeof f?f:c(f));return"function"==typeof a?a(d,d.children=h):b(a,d,h,null,j,1)},a.render=function(a,b,c){"string"==typeof b&&(b=document.querySelector(b));let e;c?("string"==typeof c&&(c=document.querySelector(c)),e=d(c)):e=Reflect.get(b,"vnode");const f=p(e,a,b);b.vnode=f},a.hydrate=d,a.run=function(a){function b(a){i&&c(e(a,h))}function c(a){h=a[0];let c=a[1];c&&c(b),f(h,b)}function d(){i&&(i=!1,g&&g(h))}const e=a.update,f=a.view,g=a.done;let h,i=!0;return c(a.init),d},a.union=function(a,b){const c=q(a,b),d=c.variants,e=c.methods;for(const c in e)d[c]=e[c];return d},a.mapEffect=function(a,b){return a?c=>function d(e){return c(b(e)),a(d)}:void 0},Object.defineProperty(a,"__esModule",{value:!0})});