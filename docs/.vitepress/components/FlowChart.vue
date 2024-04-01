<template>
  <div
    :class="{ 'loading': loading, [preset]: preset }"
    class="vitepress-flowchart"
    ref="flowchartEl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg" 
      x="0px" y="0px" viewBox="0 0 30 30"
      style="enable-background:new 0 0 50 50;"
      class="vitepress-flowchart-loading-icon"
      v-if="loading"
    >
      <rect x="0" y="13" width="4" height="5" >
        <animate attributeName="height" attributeType="XML"
          values="5;21;5"
          begin="0s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML"
          values="13; 5; 13"
          begin="0s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="13" width="4" height="5" >
        <animate attributeName="height" attributeType="XML"
          values="5;21;5"
          begin="0.15s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML"
          values="13; 5; 13"
          begin="0.15s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="13" width="4" height="5">
        <animate attributeName="height" attributeType="XML"
          values="5;21;5"
          begin="0.3s" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML"
          values="13; 5; 13"
          begin="0.3s" dur="0.6s" repeatCount="indefinite" />
      </rect>
    </svg>
  </div>
</template>

<script setup>
import presets from '../plugins/flowchart/presets/index'
import { ref, onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  preset: {
    type: String,
    default: 'vue'
  }
})

const loading = ref(false)
const flowchartEl = ref(null)

onMounted(() => {
  const preset = presets[props.preset]
  if (!preset) {
    console.warn(`[vitepress-plugin-flowchart] Unknown preset: ${props.preset}`)
    return
  }

  const code = props.code
  flowchartEl.value.setAttribute('id', props.id)
  const delay = () => new Promise(resolve => setTimeout(resolve, 500))
  Promise.all([
    import(/* webpackChunkName: "flowchart" */ 'flowchart.js'),
    delay(),
  ]).then(([flowchart]) => {
    const { parse } = flowchart.default
    const svg = parse(code)
    svg.drawSVG(props.id, preset)
    loading.value = false
  })
})
</script>

<style lang="sass">
.vitepress-flowchart
  text-align: center
  font-size: 0px
  min-height: 200px
  display: flex
  justify-content: center
  align-items: center
  transition: all 1s
  padding: 10px
  & > svg
    max-width: 100%
    height: auto
  &.loading
    background-color: #f3f6f8

.vitepress-flowchart
  &.vue
    .start-element, .end-element, .operation-element, .parallel-element
      rx: 5px
      ry: 5px

.vitepress-flowchart-loading-icon
  width: 40px
  height: 40px
  fill: #3eaf7c
</style>