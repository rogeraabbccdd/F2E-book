<template>
  <div ref="pdf"></div>
</template>

<style lang="sass">
.pdfobject-container
  height: 30rem
  border: 1rem solid rgba(0,0,0,.1)
</style>

<script setup>
import PDFObject from 'pdfobject'
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: {
    type: String
  }
})

const pdf = ref(null)

onMounted(() => {
  PDFObject.embed(props.src, pdf.value)
})
</script>