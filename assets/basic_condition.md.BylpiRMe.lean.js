import{_ as h,I as l,o as e,c as k,a6 as i,J as a,w as t,a as r}from"./chunks/framework.CBMw8OFm.js";const u=JSON.parse('{"title":"邏輯判斷式","description":"","frontmatter":{},"headers":[],"relativePath":"basic/condition.md","filePath":"basic/condition.md","lastUpdated":1756715904000}'),E={name:"basic/condition.md"};function d(g,s,c,y,F,b){const p=l("ImageFigure"),n=l("FlowChart");return e(),k("div",null,[s[1]||(s[1]=i("",35)),a(p,{src:"/images/ch4/meme.jpg",title:"三元運算子",alt:"三元運算子"},{default:t(()=>[...s[0]||(s[0]=[r("三元運算子",-1)])]),_:1}),s[2]||(s[2]=i("",8)),a(n,{id:"flowchart_64a56826",code:`st=>start: 開始
cond1=>condition: if
cond2=>condition: else if
cond3=>condition: else if
cond4=>condition: else
e=>end: 結果
process1=>operation: 執行區塊內程式碼
process2=>operation: 執行區塊內程式碼
process3=>operation: 執行區塊內程式碼
process4=>operation: 執行區塊內程式碼

st->cond1
cond1(yes)->process1->e
cond1(no)->cond2
cond2(yes)->process2->e
cond2(no)->cond3
cond3(yes)->process3->e
cond3(no)->cond4
cond4(yes)->process4->e`,preset:"vue"}),s[3]||(s[3]=i("",20)),a(n,{id:"flowchart_64a56166",code:`st=>start: 開始
cond1=>condition: if
e=>end: 結果
process1=>operation: 執行 else 程式碼
process11=>operation: 判斷式1
process12=>operation: 判斷式2
process13=>operation: 判斷式3
st->cond1
cond1(yes)->process11->process12->process13->e
cond1(no)->process1->e`,preset:"vue"}),s[4]||(s[4]=i("",19))])}const m=h(E,[["render",d]]);export{u as __pageData,m as default};
