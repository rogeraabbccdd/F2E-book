import{_ as p,E as n,c as h,J as i,w as e,a4 as s,o as k,a as t}from"./chunks/framework.BMi4FJYy.js";const D=JSON.parse('{"title":"邏輯判斷式","description":"","frontmatter":{},"headers":[],"relativePath":"basic/condition.md","filePath":"basic/condition.md","lastUpdated":1772072437000}'),r={name:"basic/condition.md"},E=s("",35),d=s("",8),g=s("",20),c=s("",19);function y(F,o,b,u,m,C){const l=n("ImageFigure"),a=n("FlowChart");return k(),h("div",null,[E,i(l,{src:"/images/ch4/meme.jpg",title:"三元運算子",alt:"三元運算子"},{default:e(()=>[t("三元運算子")]),_:1}),d,i(a,{id:"flowchart_64a56826",code:`st=>start: 開始
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
cond4(yes)->process4->e`,preset:"vue"}),g,i(a,{id:"flowchart_64a56166",code:`st=>start: 開始
cond1=>condition: if
e=>end: 結果
process1=>operation: 執行 else 程式碼
process11=>operation: 判斷式1
process12=>operation: 判斷式2
process13=>operation: 判斷式3
st->cond1
cond1(yes)->process11->process12->process13->e
cond1(no)->process1->e`,preset:"vue"}),c])}const B=p(r,[["render",y]]);export{D as __pageData,B as default};
