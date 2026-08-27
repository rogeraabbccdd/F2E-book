import{_ as e,I as h,o as k,c as t,a6 as a,J as n,j as l,a as p}from"./chunks/framework.CBMw8OFm.js";const F=JSON.parse('{"title":"身分驗證","description":"","frontmatter":{},"headers":[],"relativePath":"database/passport.md","filePath":"database/passport.md","lastUpdated":1773111604000}'),r={name:"database/passport.md"};function E(d,s,g,c,y,b){const i=h("FlowChart");return k(),t("div",null,[s[0]||(s[0]=a("",38)),n(i,{id:"flowchart_64a568a2",code:`st=>start: axios.get() axios.post 等地方
first=>operation: 請求攔截器 interceptors.request
second=>operation: 送出
third=>operation: 回應攔截器 interceptors.response
e=>end: await axios.get 等地方
st->first->second->third->e`,preset:"vue"}),s[1]||(s[1]=l("p",null,[p("因為有更新請求，所以每次使用 AT 時都需要判斷是不是更新中"),l("br"),p(" 避免重複傳送更新請求")],-1)),n(i,{id:"flowchart_64a56870",code:`stA=>start: Request A 發送
cond401=>condition: 回傳 401?
e_ok_a=>end: A 結束
op_refresh=>operation: 啟動 Refresh Token
io_bc=>inputoutput: Request B, C 陸續發送
cond_refreshing=>condition: 正在 Refresh?
e_ok_bc=>end: B C 結束
sub_wait=>subroutine: B C 暫存請求並進入等待
op_done=>operation: Refresh 完成
e_retry=>end: A, B, C 重新發送 Request
stA->cond401
cond401(yes)->op_refresh
cond401(no)->e_ok_a
op_refresh->io_bc
io_bc->cond_refreshing
cond_refreshing(yes)->sub_wait
cond_refreshing(no)->e_ok_bc
sub_wait->op_done
op_done->e_retry`,preset:"vue"}),s[2]||(s[2]=a("",1))])}const u=e(r,[["render",E]]);export{F as __pageData,u as default};
