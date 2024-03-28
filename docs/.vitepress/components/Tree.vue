<template>
  <div :id="this.tree.id" class="tree" :style="{height: this.tree.height}"></div>
</template>

<script>
import * as Treeviz from 'treeviz';

export default {
  name: "tree",
  props: {
    tree: Object
  },
  mounted() {
    let tree = Treeviz.create({
      htmlId: this.tree.id,
      idKey: "id",
      hasFlatData: true,
      relationnalField: "father",
      nodeWidth: 100,
      nodeHeight: 50,
      mainAxisNodeSpacing: 1,
      isHorizontal: false,
      hasPan: true,
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
    });
    tree.refresh(this.tree.data);
  }
}
</script>

<style lang="stylus">
.tree
  margin: 10px 0px;
  width: 100%;
  .tree-box
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:5px;

</style>
