import DefaultTheme from 'vitepress/theme'
import FlowChart from '../components/FlowChart.vue'
import Mindmap from '../components/Mindmap.vue'
import PDF from '../components/PDF.vue'
import Tree from '../components/Tree.vue'
import $ from 'jquery'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('FlowChart', FlowChart)
    app.component('Mindmap', Mindmap)
    app.component('PDF', PDF)
    app.component('Tree', Tree)
    window.$ = $
  }
}