module.exports = {
  plugins: ['cursor-effects', 'ribbon', 'reading-progress', 'demo-block', 'vuepress-plugin-code-copy', 'register-components', 'flowchart', 'vuepress-plugin-smooth-scroll'],
  title: "泰山職訓前端班課程講義",
  base: '/F2E-book/',
  description: "進入 JavaScript 的世界",
  dest: "public",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    ['script', { src: 'https://code.jquery.com/jquery-3.4.1.min.js' }],
  ],
  themeConfig: {
    postOrder: "name",
    themePicker: true,
    defaultDark: true,
    footerTheme: false,
    footerYear: false,
    footerCustom: "Made with ❤ by Kento",
    GAID: "UA-131804412-12",
    nav: [
      {
        text: "首頁",
        link: "/",
        icon: "reco-home"
      },
      {
        text: "章節",
        link: "/views/",
        icon: "reco-menu"
      },
      {
        text: "標籤",
        link: "/tag/",
        icon: "reco-tag"
      },
      {
        text: "GitHub",
        link: "https://github.com/rogeraabbccdd/F2E-book",
        icon: "reco-github"
      },
      {
        text: "課程報名",
        link: "https://ttms.etraining.gov.tw/eYVTR/SearchYoung/Detail?BCM_SNO=123514",
        icon: "reco-mail"
      }
    ],
    search: true,
    searchMaxSuggestions: 10,
    sidebar: "auto",
    lastUpdated: "Last Updated",
    author: "Kento",
    startYear: "2019"
  },
  markdown: {
    lineNumbers: true
  }
};
