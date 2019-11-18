<template>
  <div :id="this.mindData.options.container" class="mindmap"></div>
</template>

<style>
.mindmap {
  width: 100%;
  height: 450px;
  overflow: auto;
}

jmnode {
  font: unset !important;
}
</style>

<script>
import jsMind from "jsmind"
import "jsmind/style/jsmind.css";

export default {
  name: "Mindmap",
  props: {
    mindData: Object
  },
  mounted() {
    let jm = new jsMind(this.mindData.options);
    jm.show(this.mindData.mind);
  }
}
</script>