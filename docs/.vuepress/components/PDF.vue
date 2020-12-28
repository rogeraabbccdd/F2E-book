<template>
  <div ref="pdf"></div>
</template>

<style>
.pdfobject-container { 
  height: 30rem;
  border: 1rem solid rgba(0,0,0,.1);
}
</style>

<script>
import PDFObject from 'pdfobject'

export default {
  name: 'PDF',
  props: {
    src: String
  },
  mounted () {
    PDFObject.embed(this.src, this.$refs.pdf)
  }
}
</script>