import{_ as t,I as p,o as k,c as r,a6 as i,J as a,w as e,a as h}from"./chunks/framework.CBMw8OFm.js";const F=JSON.parse('{"title":"迴圈","description":"","frontmatter":{},"headers":[],"relativePath":"basic/loop.md","filePath":"basic/loop.md","lastUpdated":1756716572000}'),d={name:"basic/loop.md"};function c(E,s,g,o,b,y){const n=p("FlowChart"),l=p("ImageFigure");return k(),r("div",null,[s[2]||(s[2]=i("",4)),a(n,{id:"flowchart_382ee147",code:`st=>start: 開始
start=>operation: i = 初始值
cond=>condition: 符合執行條件
code=>inputoutput: 執行
plus=>operation: i++
e=>end: 結束

st->start
start->cond
cond(yes)->code->plus
plus(left)->cond
cond(no)->e`,preset:"vue"}),s[3]||(s[3]=i("",13)),a(l,{src:"/images/ch5/while_alive.png",alt:"while 迴圈範例",title:"while 迴圈範例"},{default:e(()=>[...s[0]||(s[0]=[h("while 迴圈範例",-1)])]),_:1}),a(n,{id:"flowchart_382ee222",code:`st=>start: 開始
cond=>condition: 檢查條件
code=>inputoutput: 執行
e=>end: 結束

st->cond
cond(yes)->code
code(left)->cond
cond(no)->e`,preset:"vue"}),s[4]||(s[4]=i("",4)),a(n,{id:"flowchart_382ee242",code:`st=>start: 開始
cond=>condition: 檢查條件
code=>inputoutput: 執行
e=>end: 結束

st->code
code->cond
cond(yes)->code
cond(no, left)->e`,preset:"vue"}),s[5]||(s[5]=i("",3)),a(l,{src:"/images/ch5/while.jpg",alt:"while 與 do while 差異",title:"while 與 do while 差異"},{default:e(()=>[...s[1]||(s[1]=[h("while 與 do while 差異",-1)])]),_:1}),s[6]||(s[6]=i("",14))])}const m=t(d,[["render",c]]);export{F as __pageData,m as default};
