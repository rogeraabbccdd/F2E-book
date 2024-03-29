import DefaultTheme from 'vitepress/theme'
import FlowChart from '../../components/FlowChart.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('FlowChart', FlowChart)
  }
}