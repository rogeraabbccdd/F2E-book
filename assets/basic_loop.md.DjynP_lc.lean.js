import{_ as h,E as l,c as t,J as s,w as p,a4 as i,o as k,a as e}from"./chunks/framework.BMi4FJYy.js";const D=JSON.parse('{"title":"迴圈","description":"","frontmatter":{},"headers":[],"relativePath":"basic/loop.md","filePath":"basic/loop.md","lastUpdated":1772072437000}'),r={name:"basic/loop.md"},d=i("",4),c=i("",13),E=i("",4),o=i("",3),g=i("",14);function b(y,u,F,m,C,v){const a=l("FlowChart"),n=l("ImageFigure");return k(),t("div",null,[d,s(a,{id:"flowchart_382ee147",code:`st=>start: 開始
start=>operation: i = 初始值
cond=>condition: 符合執行條件
code=>inputoutput: 執行
plus=>operation: i++
e=>end: 結束

st->start
start->cond
cond(yes)->code->plus
plus(left)->cond
cond(no)->e`,preset:"vue"}),c,s(n,{src:"/images/ch5/while_alive.png",alt:"while 迴圈範例",title:"while 迴圈範例"},{default:p(()=>[e("while 迴圈範例")]),_:1}),s(a,{id:"flowchart_382ee222",code:`st=>start: 開始
cond=>condition: 檢查條件
code=>inputoutput: 執行
e=>end: 結束

st->cond
cond(yes)->code
code(left)->cond
cond(no)->e`,preset:"vue"}),E,s(a,{id:"flowchart_382ee242",code:`st=>start: 開始
cond=>condition: 檢查條件
code=>inputoutput: 執行
e=>end: 結束

st->code
code->cond
cond(yes)->code
cond(no, left)->e`,preset:"vue"}),o,s(n,{src:"/images/ch5/while.jpg",alt:"while 與 do while 差異",title:"while 與 do while 差異"},{default:p(()=>[e("while 與 do while 差異")]),_:1}),g])}const _=h(r,[["render",b]]);export{D as __pageData,_ as default};
