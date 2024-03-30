<template>
  <div :id="id" class="tree" :style="{height}" ref="elTree"></div>
</template>

<script setup>
import * as Treeviz from 'treeviz'
import { ref, onMounted } from 'vue'

const elTree = ref(null)

const props = defineProps({
  id: {
    type: String
  },
  height: {
    type: String
  },
  data: {
    type: Array
  }
})

onMounted(() => {
  const tree = Treeviz.create({
    htmlId: props.id,
    idKey: "id",
    hasFlatData: true,
    relationnalField: "father",
    nodeWidth: 90,
    nodeHeight: 50,
    mainAxisNodeSpacing: 1,
    isHorizontal: false,
    hasPan: false,
    hasZoom: false,
    renderNode: function(node) { 
    return `<div class='tree-box' style='height:${node.settings.nodeHeight}px; width:${node.settings.nodeWidth}px;background-color:${node.data.color}'>
        <div>
          <strong>
            ${node.data.text_1}
          </strong>
        </div>
      </div>`;
    },
    linkWidth : (nodeData)=> 5,
    linkShape: "curve",
    linkColor : (nodeData) => "#B0BEC5"
  })
  tree.refresh(props.data)

  const observer = new ResizeObserver(mutations => {
    for (const mutation of mutations) {
      tree.refresh(props.data)
    }
  })
  observer.observe(elTree.value)
})
</script>

<style lang="sass">
.tree
  margin: 10px 0px
  width: 100%
  .tree-box
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    border-radius: 5px
</style>
