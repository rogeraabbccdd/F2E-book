<template>
  <div :id="mindData.options.container" class="mindmap"></div>
</template>

<style lang="sass">
.mindmap
  width: 100%
  height: 450px
  overflow: auto
  
jmnode
  font: unset !important
</style>

<script setup>
import "jsmind/style/jsmind.css"
import { onMounted } from 'vue'

const props = defineProps({
  mindData: {
    type: Object
  }
})

onMounted(async () => {
  const { default: jsMind } = await import("jsmind")
  console.log(jsMind)
  const jm = new jsMind(props.mindData.options);
  jm.show(props.mindData.mind);
})
</script>