import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.D7Fx348O.js";const o=JSON.parse('{"title":"Pug","description":"","frontmatter":{},"headers":[],"relativePath":"others/pug.md","filePath":"others/pug.md","lastUpdated":1743060732000}'),l={name:"others/pug.md"},p=n(`<h1 id="pug" tabindex="-1">Pug <a class="header-anchor" href="#pug" aria-label="Permalink to &quot;Pug&quot;">​</a></h1><p><a href="https://pugjs.org/api/getting-started.html" target="_blank" rel="noreferrer">Pug</a> 是 HTML 的預處理器<br> 以縮排簡寫 HTML，減少程式碼數量</p><h2 id="安裝" tabindex="-1">安裝 <a class="header-anchor" href="#安裝" aria-label="Permalink to &quot;安裝&quot;">​</a></h2><ul><li>使用 <code>npm install -g pug-cli</code> 全域安裝</li><li>建立 <code>.pug</code> 檔案</li><li>使用 <code>pug 路徑</code> 指令就能編譯出 HTML，路徑可以是檔案或資料夾 <ul><li>加上 <code>-w</code> 會自動偵測變更重新產生 HTML</li><li>加上 <code>-P</code> 會自動格式化輸出的 HTML</li><li>加上 <code>-o 路徑</code> 可以指定輸出位置</li></ul></li></ul><h2 id="基本語法" tabindex="-1">基本語法 <a class="header-anchor" href="#基本語法" aria-label="Permalink to &quot;基本語法&quot;">​</a></h2><p>Pug 使用縮排代表標籤層級，所以編寫時必須注意排版</p><div class="language-pug vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">pug</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//- 這是多行註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  這是多行註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  這是多行註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 這是編譯後會顯示出來的註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  這是編譯後會顯示出來的註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  這是編譯後會顯示出來的註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//- 標籤只剩名字，class 和 id 直接用 . 和 # 加在標籤後</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//- 空一格放內文</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#title.text-white</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> aaa</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//- 若是有 class 或 id 的 div 則可不必加標籤名稱</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.myclass#id</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //- 以縮排代表層級</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hello</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //- 屬性包在標籤後的 () 內</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.text-danger</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://google.com&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Google</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //- 屬性太多時可以換行，但要注意縮排</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  input</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;account&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  )</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //- div 內的純文字以 | 代表同一層</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  | abc123</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- 這是編譯後會顯示出來的註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">這是編譯後會顯示出來的註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">這是編譯後會顯示出來的註解，使用時須注意縮排</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">--&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text-white&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;title&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;aaa&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;myclass&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;hello&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text-danger&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://google.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Google&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">input</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;account&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  abc123</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="vite" tabindex="-1">Vite <a class="header-anchor" href="#vite" aria-label="Permalink to &quot;Vite&quot;">​</a></h2><p>在 Vite 使用則是要多安裝 <code>pug</code></p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>npm install -D pug</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>就能在 <code>&lt;template&gt;</code> 中使用 Pug</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;pug&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">div</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  p Hello World</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,13),e=[p];function t(h,k,r,d,E,g){return a(),i("div",null,e)}const u=s(l,[["render",t]]);export{o as __pageData,u as default};
