var a=0,b=1,c=3,d="http://www.w3.org/1999/xlink",e="http://www.w3.org/2000/svg",f={},g=[];function i(a,b,c,d,e,f){return{type:a,props:b,children:c,element:d,key:e,flag:f}}function j(a,b){return i(a,f,g,b,null,c)}function k(b){return"string"==typeof b&&(b=document.querySelector(b)),i(b.nodeName.toLowerCase(),f,g.map.call(b.childNodes,l),b,null,a)}function l(a){return 3===a.nodeType?j(a.nodeValue,a):k(a)}function m(a,c){c=c||{};for(var d,e=[],f=[],g=arguments.length,h=Array(2<g?g-2:0),k=2;k<g;k++)h[k-2]=arguments[k];for(var l=h.length,m=Reflect.get(c,"key");0<l--;)e.push(h[l]);for(Reflect.get(c,"children")&&(0>=e.length&&e.push(c.children),delete c.children);0<e.length;)if(Array.isArray(d=e.pop()))for(var n=d.length;0<n--;)e.push(d[n]);else if(!1===d||!0===d||null==d);else f.push("object"==typeof d?d:j(d));return"function"==typeof a?a(c,c.children=f):i(a,c,f,null,m,b)}function h(...a){function c(a,b=new WeakMap){if(Object(a)!==a)return a;if(b.has(a))return b.get(a);const d=a instanceof Date?new Date(a):a instanceof RegExp?new RegExp(a.source,a.flags):a.constructor?new a.constructor:Object.create(null);return b.set(a,d),Object.assign(d,...Object.keys(a).map(d=>({[d]:c(a[d],b)})))}return(Array.isArray(a[0])?a.unshift([]):a.unshift({}),Array.isArray(a[0]))?a.reduce((d,a)=>Array.prototype.concat(d,c(a))):"object"==typeof a[0]?a.reduce((d,a)=>Object.assign(d,c(a))):void 0}function n(a){return a.currentTarget.events[a.type](a)}function o(a){return null==a?null:a.key}function p(a,b,c){for(var d,e,f={};b<=c;)null!=(d=(e=a[b]).key)&&(f[d]=e),b++;return f}function q(a,b,c,e,f){if("key"===b);else if("style"===b)for(var g in h(c,e)){var i=null==e||null==e[g]?"":e[g];"-"===g[0]?a[b].setProperty(g,i):a[b][g]=i}else if("o"===b[0]&&"n"===b[1])b=b.slice(2).toLowerCase(),a.events||(a.events={}),a.events[b]=e,null==e?a.removeEventListener(b,n):null==c&&a.addEventListener(b,n);else{var j=null==e||!1===e;b in a&&"list"!==b&&"type"!==b&&"draggable"!==b&&"spellcheck"!==b&&"translate"!==b&&!f?(a[b]=null==e?"":e,j&&a.removeAttribute(b)):"xlink-href"===b||"xlinkHref"===b?(a.setAttributeNS(d,"href",e),a.setAttribute("href",e)):j?a.removeAttribute(b):a.setAttribute(b,e)}}function r(a,b,d){var f=a.flag===c?document.createTextNode(a.type):(d=d||"svg"===a.type)?document.createElementNS(e,a.type):document.createElement(a.type);var g=a.props;g.onmount&&b.push(function(){g.onmount(f)});for(var h=0,i=a.children.length;h<i;)f.appendChild(r(a.children[h],b,d)),h++;for(var j in g)q(f,j,null,g[j],d);return a.element=f}function s(a){for(var b=0,c=a.children.length;b<c;)s(a.children[b]),b++;return a.element}function t(a,b){var c=function(){a.removeChild(s(b))},d=b.props&&b.props.onunmount;null==d?c():d(c,b.element)}function u(a,b,c,d,e,f){for(var g in h(b,c))("value"==g||"checked"==g?a[g]:b[g])!==c[g]&&q(a,g,b[g],c[g],e);var i=f?c.onmount:c.onupdate;null!=i&&d.push(function(){i(a,b,c)})}function v(b,d,e,f,g,h){if(f===e);else if(null!=e&&e.flag===c&&f.flag===c)e.type!==f.type&&(d.nodeValue=f.type);else if(null==e||e.type!==f.type){var i=b.insertBefore(r(f,g,h),d);null!=e&&t(b,e),d=i}else{u(d,e.props,f.props,g,h=h||"svg"===f.type,e.flag===a);for(var j,k,l,m,n=e.children,q=0,s=n.length-1,w=f.children,x=0,y=w.length-1;x<=y&&q<=s&&(l=o(n[q]),m=o(w[x]),null!=l&&l===m);)v(d,n[q].element,n[q],w[x],g,h),q++,x++;for(;x<=y&&q<=s&&(l=o(n[s]),m=o(w[y]),null!=l&&l===m);)v(d,n[s].element,n[s],w[y],g,h),s--,y--;if(q>s)for(;x<=y;)d.insertBefore(r(w[x++],g,h),(k=n[q])&&k.element);else if(x>y)for(;q<=s;)t(d,n[q++]);else{for(var z=p(n,q,s),A={};x<=y;){if(l=o(k=n[q]),m=o(w[x]),A[l]||null!=m&&m===o(n[q+1])){null==l&&t(d,k),q++;continue}null==m||e.flag===a?(null==l&&(v(d,k&&k.element,k,w[x],g,h),x++),q++):(l===m?(v(d,k.element,k,w[x],g,h),A[m]=!0,q++):null==(j=z[m])?v(d,k&&k.element,null,w[x],g,h):(v(d,d.insertBefore(j.element,k&&k.element),j,w[x],g,h),A[m]=!0),x++)}for(;q<=s;)null==o(k=n[q++])&&t(d,k);for(var B in z)null==A[B]&&t(d,z[B])}}return d&&(f.element=d),f}class w{constructor(){this.message="Cannot insert Fragment tag directly into DOM.",this.toString=function(){return this.message}}}function x(a,b,c){var d=[];if("string"==typeof c&&(c=document.querySelector(c)),Array.isArray(b))throw new w;if(v(c,a&&a.element,a,b,d),b!==a)for(;0<d.length;)d.pop()();return b}function y(a,b,c){if(b="string"==typeof b?document.querySelector(b):b,!b)return console.error("@composi/core Error: You need to provide a valid container to render the component in. Check the element or selector you provided and make sure that it exists in the DOM before trying to render."),void console.error(`@composi/core Message: The container you provided was "${b}"`);var d;c?("string"==typeof c&&(c=document.querySelector(c)),d=k(c)):d=b&&Reflect.get(b,"vnode");var e=x(d,a,b);b.vnode=e}function z(a,b){return A(a)||B(a,b)||C()}function A(a){if(Array.isArray(a))return a}function B(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function C(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function D(a){function b(a){j&&c(f(d,a))}function c(c){var f,i=a.init();if(c){var j=z(c,2);d=j[0],e=j[1]}else if(i&&i.length){var l=z(i,2);d=l[0],e=l[1],h&&!k&&(f=h(d,b),f&&f())}else d=[];e&&e(),g(d,b),k=!0}var d,e,f=a.update,g=a.view,h=a.subscriptions||a.subs,i=a.done,j=!0,k=!1;return a.send=b,c(d),()=>{j&&(j=!1,i&&i(d))}}var E=Object.prototype.hasOwnProperty;function F(a){for(var b=Object.create(null),c=a=>a&&a.type,d=(a,b)=>(d,e)=>{var f=c(d),g=E.call(a,f)&&a[f];return g?g(d.data,e):b(e)},e=0,f=function(){var c=a[e];b[c]=a=>({type:c,data:a}),e++};e<a.length;)f();return{variants:b,match:function(a,b,c){return d(b,c)(a)}}}function G(a){var b=F(a),c=b.variants,d=b.match;return c.match=d,c}function H(a,b){return c=>d=>e=>(c(b(e)),a(d))}var I=a=>b=>a.map(a=>a&&a(b));export{m as h,y as render,k as hydrate,D as run,G as union,H as mapEffect,I as batchEffects};
//# sourceMappingURL=composi-core.mjs.map
