<script setup>
import { onUpdated, onMounted } from 'vue'
import '../.vitepress/plugins/demo-block/style.scss'
import { webController } from '../.vitepress/plugins/demo-block/main'

const props = defineProps()

onMounted(() => {
  window.$VUEPRESS_DEMO_BLOCK = SETTINGS
    webController()
})

onUpdated(() => {
  webController()
})
</script>