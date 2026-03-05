import{_ as l,I as p,o as h,c as e,a6 as i,J as n}from"./chunks/framework.CBMw8OFm.js";const b=JSON.parse('{"title":"身分驗證","description":"","frontmatter":{},"headers":[],"relativePath":"database/passport.md","filePath":"database/passport.md","lastUpdated":1772607600000}'),k={name:"database/passport.md"};function t(r,s,E,d,g,y){const a=p("FlowChart");return h(),e("div",null,[s[0]||(s[0]=i("",17)),n(a,{id:"flowchart_382ee223",code:`st=>start: 儲存資料
first=>operation: validate
second=>operation: pre-save
third=>operation: save
e=>end: 結束
st->first->second->third->e`,preset:"vue"}),s[1]||(s[1]=i("",5)),n(a,{id:"flowchart_64a570a0",code:`st=>start: 使用者送出登入請求
first=>operation: local 策略驗證
second=>operation: 簽發 JWT
e=>end: 結束
st->first->second->e`,preset:"vue"}),s[2]||(s[2]=i("",11)),n(a,{id:"flowchart_64a56fea",code:`st=>start: 使用者送出請求
first=>operation: JWT 策略驗證身分
second=>operation: 處理請求
e=>end: 結束
st->first->second->e`,preset:"vue"}),s[3]||(s[3]=i("",14)),n(a,{id:"flowchart_64a56f2a",code:`st=>start: axios.get/post/put/delete
first=>operation: axios.interceptors.request
second=>operation: 送出請求
third=>operation: axios.interceptors.response
e=>end: 結束
st->first->second->third->e`,preset:"vue"}),s[4]||(s[4]=i("",4))])}const F=l(k,[["render",t]]);export{b as __pageData,F as default};
