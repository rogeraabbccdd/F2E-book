import{j as o,ak as p,al as u,am as l,an as c,ao as f,ap as d,aq as m,ar as h,as as A,at as g,Y as v,d as P,u as _,l as w,z as R,au as y,av as C,aw as E,ax as T}from"./chunks/framework.DWhUQBuX.js";import{R as b}from"./chunks/theme.5OozL3It.js";function i(e){if(e.extends){const a=i(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=i(b),S=P({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=_();return w(()=>{R(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&y(),C(),E(),s.setup&&s.setup(),()=>T(s.Layout)}});async function D(){globalThis.__VITEPRESS__=!0;const e=x(),a=j();a.provide(u,e);const t=l(e.route);return a.provide(c,t),a.component("Content",f),a.component("ClientOnly",d),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:m}),{app:a,router:e,data:t}}function j(){return h(S)}function x(){let e=o,a;return A(t=>{let n=g(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=v(()=>import(n),[])),o&&(e=!1),r},s.NotFound)}o&&D().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{D as createApp};