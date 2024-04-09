import DefaultTheme from 'vitepress/theme'
import googleAnalytics from 'vitepress-plugin-google-analytics'
import FlowChart from '../components/FlowChart.vue'
import Mindmap from '../components/Mindmap.vue'
import PDF from '../components/PDF.vue'
import Tree from '../components/Tree.vue'
import ImageFigure from '../components/ImageFigure.vue'
import $ from 'jquery'
import './custom.sass'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    googleAnalytics({
      id: 'G-SV22CZB2YX',
    }),
    app.component('FlowChart', FlowChart)
    app.component('Mindmap', Mindmap)
    app.component('PDF', PDF)
    app.component('Tree', Tree)
    app.component('ImageFigure', ImageFigure)
    if (!import.meta.env.SSR) {
      window.$ = $
    }
  }
}