var a=0,b=3,c={},d=[],e=[];function f(a,b,c,d){var e=4<arguments.length&&arguments[4]!==void 0?arguments[4]:null,f=5<arguments.length&&arguments[5]!==void 0?arguments[5]:null;return{type:a,props:b,children:c,node:d,flag:f,key:e}}function g(a,e){return f(a,c,d,e,null,b)}function i(a,b){b=b||{};for(var c,d=[],e=[],h=arguments.length,i=Array(2<h?h-2:0),j=2;j<h;j++)i[j-2]=arguments[j];for(var k=i.length,l=b.key;0<k--;)d.push(i[k]);for(b.children&&(0>=d.length&&d.push(b.children),delete b.children);0<d.length;)if(Array.isArray(c=d.pop()))for(var m=c.length;0<m--;)d.push(c[m]);else if(!1===c||!0===c||null==c);else e.push("object"==typeof c?c:g(c));return"function"==typeof a?a(b,e):f(a,b,e,null,l)}function h(c,a){return Object.assign({},c,a)}function j(a){this.handlers[a.type](a)}function l(a,b,c,d,e){if("key"===b);else if("style"===b&&"object"==typeof d)for(var f in h(c,d)){var g=null==d||null==d[f]?"":d[f];"-"===f[0]?a[b].setProperty(f,g):a[b][f]=g}else"o"===b[0]&&"n"===b[1]?((a.handlers||(a.handlers={}))[b=b.slice(2).toLowerCase()]=d)?!c&&a.addEventListener(b,j):a.removeEventListener(b,j):"list"!==b&&"form"!==b&&"type"!==b&&"draggable"!==b&&"spellcheck"!==b&&b in a&&!e?a[b]=null==d?"":d:null==d||!1===d?a.removeAttribute(b):a.setAttribute(b,d)}function m(a,c,d){var e=a.flag===b?document.createTextNode(a.type):(d=d||"svg"===a.type)?document.createElementNS("http://www.w3.org/2000/svg",a.type):document.createElement(a.type),f=a.props;for(var g in f.onmount&&c.push(function(){f.onmount(e)}),f)l(e,g,null,f[g],d);for(var h=0,j=a.children.length;h<j;h++)e.appendChild(m(a.children[h],c,d));return a.node=e}function n(a){return null==a?null:a.key}function o(a){for(var b=0,c=a.children.length;b<c;b++)o(a.children[b]);var d=a.props.ondestroy;return null!=d&&d(a.node),a.node}function p(a,b){var c=function(){a.removeChild(o(b))},d=b.props&&b.props.onunmount;null==d?c():d(b.node,c)}function q(c,d,f,g,j){if(f===g);else null!=f&&f.flag===b&&g.flag===b?f.type!==g.type&&(d.nodeValue=g.type):null==f||f.type!==g.type?(d=c.insertBefore(m(g,e,j),d),null!=f&&p(c,f)):function(){var b,c,k,o,r=f.props,s=g.props,t=f.children,u=g.children,v=0,w=0,x=t.length-1,y=u.length-1;for(var z in j=j||"svg"===g.type,h(r,s))("value"==z||"selected"==z||"checked"==z?d[z]:r[z])!==s[z]&&function(){l(d,z,r[z],s[z],j);var a=s.onupdate;null!=a&&e.push(function(){a(d,r,s)})}();for(;w<=y&&v<=x&&null!=(k=n(t[v]))&&k===n(u[w]);)q(d,t[v].node,t[v++],u[w++],j);for(;w<=y&&v<=x&&null!=(k=n(t[x]))&&k===n(u[y]);)q(d,t[x].node,t[x--],u[y--],j);if(v>x)for(;w<=y;)d.insertBefore(m(u[w++],e,j),(c=t[v])&&c.node);else if(w>y)for(;v<=x;)p(d,t[v++]);else{var i,A,B;for(i=v,A={},B={};i<=x;i++)null!=(k=t[i].key)&&(A[k]=t[i]);for(;w<=y;){if(k=n(c=t[v]),o=n(u[w]),B[k]||null!=o&&o===n(t[v+1])){null==k&&p(d,c),v++;continue}null==o||f.flag===a?(null==k&&(q(d,c&&c.node,c,u[w],j),w++),v++):(k===o?(q(d,c.node,c,u[w],j),B[o]=!0,v++):null==(b=A[o])?q(d,c&&c.node,null,u[w],j):(q(d,d.insertBefore(b.node,c&&c.node),b,u[w],j),B[o]=!0),w++)}for(;v<=x;)null==n(c=t[v++])&&p(d,c);for(var C in A)null==B[C]&&p(d,A[C])}}();return g.node=d}function r(d){return d.nodeType===b?g(d.nodeValue,d):f(d.nodeName.toLowerCase(),c,Array.prototype.map.call(d.childNodes,r),d,null,a)}function s(a,b){!a.vdom&&b.props.onmount&&e.push(function(){b.props.onmount(a)});for(var c=q(a.parentNode,a,a.vdom||r(a),b).vdom=b;0<e.length;)e.pop()();return c}function t(a,b){if(Array.isArray(a))throw"Cannot insert Fragment tag directly into DOM.";var c="";if("string"==typeof b&&(c=b,b=document.querySelector(b)),!b){var d="";c&&(d=` The selector you provided was: "${c}"`),console.error(`@composi/core Error: The second parameter for render function was invalid. Check the selector you provided and make sure that it exists in the DOM before trying to render. ${d}`)}s(b,a)}function u(a){function b(a){if(j)return c(g(d,a,b))}function c(a){a?d=a:e&&(d=e()),h&&k&&("function"==typeof h&&h(l,b),k=!1),f(d,b)}var d,e=a.init,f=a.view,g=a.update,h=a.subscriptions||a.subs,i=a.done,j=!0,k=!0,l=()=>d;return a.send=b,c(d),()=>{j&&(j=!1,i&&i(d))}}var v=Object.prototype.hasOwnProperty;function w(a){for(var b=Object.create(null),c=a=>a&&a.type,d=(a,b)=>(d,e)=>{var f=c(d),g=v.call(a,f)&&a[f];return g?g(d.data,e):b(e)},e=0,f=function(){var c=a[e];b[c]=a=>({type:c,data:a}),e++};e<a.length;)f();return{variants:b,match:function(a,b,c){return d(b,c)(a)}}}function x(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];var d=w(b),e=d.variants,f=d.match;return e.match=f,e}var y=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return(a,c)=>b.map(b=>b&&b(a,c))},z=(a,b)=>Array.isArray(a)&&!b?a:b;export{i as h,t as render,u as run,x as union,y as batchEffects,z as Fragment};
//# sourceMappingURL=composi-core.mjs.map
