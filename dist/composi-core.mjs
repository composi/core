var a=0,b=1,c=3,d="http://www.w3.org/1999/xlink",e="http://www.w3.org/2000/svg",f={},g=[],i=[];function j(a,b,c,d,e,f){return e||(e=null),{type:a,props:b,children:c,element:d,key:e,flag:f}}function k(a,b){return b||(b=null),j(a,f,g,b,null,c)}function l(a){for(var b,c=0;c<a.childNodes.length;c++)b=a.childNodes[c],8!==b.nodeType&&(3!==b.nodeType||/\S/.test(b.nodeValue))?1===b.nodeType&&l(b):(a.removeChild(b),c--)}function m(b){return"string"==typeof b&&(b=document.querySelector(b)),l(b),b.nodeType===c?k(b.nodeValue,b):j(b.nodeName.toLowerCase(),f,g.map.call(b.childNodes,m),b,null,a)}function n(a,c){c=c||{};for(var d,e=[],f=[],g=arguments.length,h=Array(2<g?g-2:0),i=2;i<g;i++)h[i-2]=arguments[i];for(var l=h.length,m=c.key;0<l--;)e.push(h[l]);for(c.children&&(0>=e.length&&e.push(c.children),delete c.children);0<e.length;)if(Array.isArray(d=e.pop()))for(var n=d.length;0<n--;)e.push(d[n]);else if(!1===d||!0===d||null==d);else f.push("object"==typeof d?d:k(d));return"function"==typeof a?a(c,c.children=f):j(a,c,f,null,m,b)}function h(...a){function c(a,b=new WeakMap){if(Object(a)!==a)return a;if(b.has(a))return b.get(a);const d=a instanceof Date?new Date(a):a instanceof RegExp?new RegExp(a.source,a.flags):a.constructor?new a.constructor:Object.create(null);return b.set(a,d),Object.assign(d,...Object.keys(a).map(d=>({[d]:c(a[d],b)})))}return(Array.isArray(a[0])?a.unshift([]):a.unshift({}),Array.isArray(a[0]))?a.reduce((d,a)=>Array.prototype.concat(d,c(a))):"object"==typeof a[0]?a.reduce((d,a)=>Object.assign(d,c(a))):void 0}function o(a){return a.currentTarget.events[a.type](a)}function p(a){return null==a?null:a.key}function q(a,b,c){for(var d,e,f={};b<=c;)null!=(d=(e=a[b]).key)&&(f[d]=e),b++;return f}function r(a,b,c,e,f){if("key"!==b)if("style"===b&&"object"==typeof e)for(var g in h(c,e)){var i=null==e||null==e[g]?"":e[g];"-"===g[0]?a[b].setProperty(g,i):a[b][g]=i}else if("o"===b[0]&&"n"===b[1])b=b.slice(2).toLowerCase(),a.events||(a.events={}),a.events[b]=e,null==e?a.removeEventListener(b,o):null==c&&a.addEventListener(b,o);else{"list"!==b&&"form"!==b&&"type"!==b&&"draggable"!==b&&"spellcheck"!==b&&b in a&&!f?a[b]=null==e?"":e:null==e||!1===e?a.removeAttribute(b):"xlink-href"===b||"xlinkHref"===b?(a.setAttributeNS(d,"href",e),a.setAttribute("href",e)):a.setAttribute(b,e)}}function s(a,b){var d=a.flag===c?document.createTextNode(a.type):(b=b||"svg"===a.type)?document.createElementNS(e,a.type):document.createElement(a.type);var f=a.props;f.onmount&&i.push(function(){f.onmount(d)});for(var g=0,h=a.children.length;g<h;)d.appendChild(s(a.children[g],b)),g++;for(var j in f)r(d,j,null,f[j],b);return a.element=d}function t(a){for(var b=0,c=a.children.length;b<c;)t(a.children[b]),b++;return a.element}function u(a,b){var c=function(){a.removeChild(t(b))},d=b.props&&b.props.onunmount;null==d?c():d(c,b.element)}function v(b,c,d,e){for(var f in h(c,d))("value"==f||"checked"==f||"selected"==f?b[f]:c[f])!==d[f]&&r(b,f,c[f],d[f],e);var g=b.vnode&&b.vnode.type===a?d.onmount:d.onupdate;null!=g&&i.push(function(){g(b,c,d)})}function w(b,d,e,f,g){if(null!=e&&e.flag===c&&f.flag===c)e.type!==f.type&&(d.nodeValue=f.type);else if(null==e||e.type!==f.type){var h=b.insertBefore(s(f,g),d);null!=e&&u(b,e),d=h}else if(f!==e){v(d,e.props,f.props,g=g||"svg"===f.type);for(var i,j,k,l,m=e.children,n=0,o=m.length-1,r=f.children,t=0,x=r.length-1;t<=x&&n<=o&&(k=p(m[n]),l=p(r[t]),null!=k&&k===l);)w(d,m[n].element,m[n],r[t],g),n++,t++;for(;t<=x&&n<=o&&(k=p(m[o]),l=p(r[x]),null!=k&&k===l);)w(d,m[o].element,m[o],r[x],g),o--,x--;if(n>o)for(;t<=x;)d.insertBefore(s(r[t++],g),(j=m[n])&&j.element);else if(t>x)for(;n<=o;)u(d,m[n++]);else{for(var y=q(m,n,o),z={};t<=x;){if(k=p(j=m[n]),l=p(r[t]),z[k]||null!=l&&l===p(m[n+1])){null==k&&u(d,j),n++;continue}null==l||e.flag===a?(null==k&&(w(d,j&&j.element,j,r[t],g),t++),n++):(k===l?(w(d,j.element,j,r[t],g),z[l]=!0,n++):null==(i=y[l])?w(d,j&&j.element,null,r[t],g):(w(d,d.insertBefore(i.element,j&&j.element),i,r[t],g),z[l]=!0),t++)}for(;n<=o;)null==p(j=m[n++])&&u(d,j);for(var A in y)null==z[A]&&u(d,y[A])}}return d&&(f.element=d),f}class x{constructor(){this.message="Cannot insert Fragment tag directly into DOM.",this.toString=function(){return this.message}}}function y(a,b,c){if("string"==typeof c&&(c=document.querySelector(c)),Array.isArray(b))throw new x;if(w(c,a&&a.element,a,b),b!==a)for(;0<i.length;)i.pop()();return b}function z(a,b,c){if(b="string"==typeof b?document.querySelector(b):b,!b)return console.error("@composi/core Error: You need to provide a valid container to render the component in. Check the element or selector you provided and make sure that it exists in the DOM before trying to render."),void console.error(`@composi/core Message: The container you provided was "${b}"`);var d;c?("string"==typeof c&&(c=document.querySelector(c)),d=b&&b.vnode||m(c)):d=b&&b.vnode;var e=y(d,a,b);b.vnode=e}function A(a,b){return B(a)||C(a,b)||D()}function B(a){if(Array.isArray(a))return a}function C(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function D(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function E(a){function b(a){j&&c(f(d,a,b))}function c(c){var f,i=a.init();if(c){var j=A(c,2);d=j[0],e=j[1]}else if(i&&i.length){var l=A(i,2);d=l[0],e=l[1],h&&!k&&(f=h(d,b),"function"==typeof f&&f(d,b),k=!0)}else d=[];e&&e(d,b),g(d,b)}var d,e,f=a.update,g=a.view,h=a.subscriptions||a.subs,i=a.done,j=!0,k=!1;return a.send=b,c(d),()=>{j&&(j=!1,i&&i(d))}}var F=Object.prototype.hasOwnProperty;function G(a){for(var b=Object.create(null),c=a=>a&&a.type,d=(a,b)=>(d,e)=>{var f=c(d),g=F.call(a,f)&&a[f];return g?g(d.data,e):b(e)},e=0,f=function(){var c=a[e];b[c]=a=>({type:c,data:a}),e++};e<a.length;)f();return{variants:b,match:function(a,b,c){return d(b,c)(a)}}}function H(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];var d=G(b),e=d.variants,f=d.match;return e.match=f,e}var I=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return(a,c)=>b.map(b=>b&&b(a,c))},J=(a,b)=>Array.isArray(a)&&!b?a:b;export{n as h,z as render,E as run,H as union,I as batchEffects,J as Fragment};
//# sourceMappingURL=composi-core.mjs.map
