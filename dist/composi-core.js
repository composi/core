(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.composi={})})(this,function(a){"use strict";function b(a,b,c,d,e=null,f=null){return{type:a,props:b,children:c,node:d,flag:f,key:e}}function c(a,c){return b(a,r,s,c,null,q)}function d(a,b){return JSON.stringify(a)!==JSON.stringify(b)}function e(c,a){return Object.assign({},c,a)}function f(a){this.handlers[a.type](a)}function g(a,b,c,d,g){if("key"===b);else if("style"===b&&"object"==typeof d)for(let f in e(c,d)){const c=null==d||null==d[f]?"":d[f];"-"===f[0]?a[b].setProperty(f,c):a[b][f]=c}else"o"===b[0]&&"n"===b[1]?((a.handlers||(a.handlers={}))[b=b.slice(2)]=d)?!c&&a.addEventListener(b,f):a.removeEventListener(b,f):"list"!==b&&"form"!==b&&"type"!==b&&"draggable"!==b&&"spellcheck"!==b&&b in a&&!g?a[b]=null==d?"":d:null==d||!1===d?a.removeAttribute(b):a.setAttribute(b,d)}function h(a,b,c){const d=a.type,e=a.flag===q?document.createTextNode(d):(c=c||"svg"===d)?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d),f=a.props;for(let d in f.onmount&&b.push(function(){f.onmount(e)}),f)g(e,d,null,f[d],c);for(let d=0,f=a.children.length;d<f;d++)e.appendChild(h(a.children[d],b,c));return a.node=e}function i(a){return null==a?null:a.key}function j(a){for(let b=0,c=a.children.length;b<c;b++)j(a.children[b]);const b=a.props.ondestroy;return null!=b&&b(a.node),a.node}function k(a,b){const c=function(){a.removeChild(j(b))},d=b.props&&b.props.onunmount;null==d?c():d(b.node,c)}function l(a,b,c,f,j){if(c===f);else if(null!=c&&c.flag===q&&f.flag===q)c.type!==f.type&&(b.nodeValue=f.type);else if(null==c||c.type!==f.type)b=a.insertBefore(h(f,t,j),b),null!=c&&k(a,c);else{let a,m,n,o;const q=c.props,r=f.props,s=c.children,u=f.children;let v=0,w=0,x=s.length-1,y=u.length-1;for(let a in j=j||"svg"===f.type,e(q,r))if(("value"==a||"selected"==a||"checked"==a?b[a]:q[a])!==r[a]){g(b,a,q[a],r[a],j);const c=r.onupdate;null!=c&&d(q,r)&&t.push(function(){c(b,q,r)})}for(;w<=y&&v<=x&&null!=(n=i(s[v]))&&n===i(u[w]);)l(b,s[v].node,s[v++],u[w++],j);for(;w<=y&&v<=x&&null!=(n=i(s[x]))&&n===i(u[y]);)l(b,s[x].node,s[x--],u[y--],j);if(v>x)for(;w<=y;)b.insertBefore(h(u[w++],t,j),(m=s[v])&&m.node);else if(w>y)for(;v<=x;)k(b,s[v++]);else{let d,e,f;for(d=v,e={},f={};d<=x;d++)null!=(n=s[d].key)&&(e[n]=s[d]);for(;w<=y;){if(n=i(m=s[v]),o=i(u[w]),f[n]||null!=o&&o===i(s[v+1])){null==n&&k(b,m),v++;continue}null==o||c.flag===p?(null==n&&(l(b,m&&m.node,m,u[w],j),w++),v++):(n===o?(l(b,m.node,m,u[w],j),f[o]=!0,v++):null==(a=e[o])?l(b,m&&m.node,null,u[w],j):(l(b,b.insertBefore(a.node,m&&m.node),a,u[w],j),f[o]=!0),w++)}for(;v<=x;)null==i(m=s[v++])&&k(b,m);for(let a in e)null==f[a]&&k(b,e[a])}}return f.node=b}function m(a){return a.nodeType===q?c(a.nodeValue,a):b(a.nodeName.toLowerCase(),r,Array.prototype.map.call(a.childNodes,m),a,null,p)}function n(a,b){!a.vdom&&b.props.onmount&&t.push(function(){b.props.onmount(a)});const c=l(a.parentNode,a,a.vdom||m(a),b).vdom=b;for(;0<t.length;)t.pop()();return c}function o(a){const b=Object.create(null);for(let c=0;c<a.length;){const d=a[c];b[d]=a=>({type:d,data:a}),c++}return{variants:b,match:function(a,b){return a.type?((a,c)=>{const d=a.type,e=u.call(b,d)&&b[d];return e(a.data,c)})(a):(console.error("The message you provided was not valid. Messages have the format: {type: 'whatever', data: 'something'}"),console.error("The tag you provided was:"),void console.dir(a))}}}const p=0,q=3,r={},s=[],t=[],u=Object.prototype.hasOwnProperty,v=(...a)=>(b,c)=>a.map(a=>a&&a(b,c));a.h=function(a,d,...e){d=d||{};let f;const g=[],h=[];let i=e.length;const j=d.key;for(;0<i--;)g.push(e[i]);for(d.children&&(0>=g.length&&g.push(d.children),delete d.children);0<g.length;)if(Array.isArray(f=g.pop()))for(let a=f.length;0<a--;)g.push(f[a]);else if(!1===f||!0===f||null==f);else h.push("object"==typeof f?f:c(f));return"function"==typeof a?a(d,h):b(a,d,h,null,j)},a.render=function(a,b){if(Array.isArray(a))throw"Cannot insert Fragment tag directly into DOM.";let c="";if("string"==typeof b&&(c=b,b=document.querySelector(b)),!b){let a="";c&&(a=` The selector you provided was: "${c}"`),console.error(`@composi/core Error: The second parameter for render function was invalid. Check the selector you provided and make sure that it exists in the DOM before trying to render. ${a}`)}n(b,a)},a.run=function(a){function b(a){if(j)return c(f(i,a,b))}function c(a){a?i=a:d&&(i=d()),g&&k&&("function"==typeof g&&g(l,b),k=!1),e(i,b)}let d=a.init;const e=a.view,f=a.update,g=a.subscriptions||a.subs,h=a.done;let i,j=!0,k=!0;const l=()=>i;return a.send=b,c(i),()=>{j&&(j=!1,h&&h(i))}},a.union=function(...a){const{variants:b,match:c}=o(a);return b.match=c,b},a.batchEffects=v,a.batch=v,a.Fragment=(a,b)=>Array.isArray(a)&&!b?a:b,Object.defineProperty(a,"__esModule",{value:!0})});
//# sourceMappingURL=composi-core.js.map
