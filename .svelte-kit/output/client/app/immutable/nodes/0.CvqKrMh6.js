import{s as j,a as q,u as w,g as P,b as z,c as B}from"../chunks/scheduler.CtbWrGNo.js";import{S as C,i as D,e as m,s as L,c as d,a as b,d as f,f as O,l as g,g as v,h as y,p as I,q as M,m as N,t as T,b as U,n as E}from"../chunks/index.DsKBCyxL.js";import{e as $}from"../chunks/each.D6YF6ztN.js";import{p as V}from"../chunks/stores.D-CER0mO.js";const Y="always",F=!0,W=Object.freeze(Object.defineProperty({__proto__:null,prerender:F,trailingSlash:Y},Symbol.toStringTag,{value:"Module"}));function k(r,a,l){const o=r.slice();return o[4]=a[l],o}function A(r){let a,l,o=r[4].title+"",u,i;return{c(){a=m("li"),l=m("a"),u=T(o),i=L(),this.h()},l(n){a=d(n,"LI",{class:!0});var t=b(a);l=d(t,"A",{href:!0,class:!0});var h=b(l);u=U(h,o),h.forEach(f),i=O(t),t.forEach(f),this.h()},h(){g(l,"href",r[4].path),g(l,"class","svelte-d320bb"),E(l,"current",r[0].url.pathname==r[4].path),g(a,"class","svelte-d320bb")},m(n,t){v(n,a,t),y(a,l),y(l,u),y(a,i)},p(n,t){t&3&&E(l,"current",n[0].url.pathname==n[4].path)},d(n){n&&f(a)}}}function G(r){let a,l,o,u,i,n=$(r[1]),t=[];for(let e=0;e<n.length;e+=1)t[e]=A(k(r,n,e));const h=r[3].default,c=q(h,r,r[2],null);return{c(){a=m("nav"),l=m("ul");for(let e=0;e<t.length;e+=1)t[e].c();o=L(),u=m("body"),c&&c.c(),this.h()},l(e){a=d(e,"NAV",{class:!0});var _=b(a);l=d(_,"UL",{class:!0});var s=b(l);for(let S=0;S<t.length;S+=1)t[S].l(s);s.forEach(f),_.forEach(f),o=O(e),u=d(e,"BODY",{});var p=b(u);c&&c.l(p),p.forEach(f),this.h()},h(){g(l,"class","svelte-d320bb"),g(a,"class","svelte-d320bb")},m(e,_){v(e,a,_),y(a,l);for(let s=0;s<t.length;s+=1)t[s]&&t[s].m(l,null);v(e,o,_),v(e,u,_),c&&c.m(u,null),i=!0},p(e,[_]){if(_&3){n=$(e[1]);let s;for(s=0;s<n.length;s+=1){const p=k(e,n,s);t[s]?t[s].p(p,_):(t[s]=A(p),t[s].c(),t[s].m(l,null))}for(;s<t.length;s+=1)t[s].d(1);t.length=n.length}c&&c.p&&(!i||_&4)&&w(c,h,e,e[2],i?z(h,e[2],_,null):P(e[2]),null)},i(e){i||(I(c,e),i=!0)},o(e){M(c,e),i=!1},d(e){e&&(f(a),f(o),f(u)),N(t,e),c&&c.d(e)}}}function H(r,a,l){let o;B(r,V,t=>l(0,o=t));let{$$slots:u={},$$scope:i}=a;const n=[{title:"Simran Parwani",path:"/"},{title:"About",path:"/about"}];return r.$$set=t=>{"$$scope"in t&&l(2,i=t.$$scope)},[o,n,i,u]}class X extends C{constructor(a){super(),D(this,a,H,G,j,{})}}export{X as component,W as universal};
