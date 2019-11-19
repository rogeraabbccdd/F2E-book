<template>
  <div>
    <note-abstract
      class="list"
      :data="posts"
      :currentPage="currentPage"
      @currentTag="getCurrentTag" />

    <Pagation
      class="pagation"
      :total="posts.length"
      :currentPage="currentPage"
      @getCurrentPage="getCurrentPage" />
  </div>
</template>

<script>
import NoteAbstract from '@theme/components/NoteAbstract.vue'
import Pagation from '@theme/components/Pagation.vue'
export default {
  name: "list",
  components: {
    NoteAbstract, Pagation
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    posts(){
      let pages = this.$site.pages;
      // get chapter pages
      pages = pages.filter((p)=>{
        return p.title && p.title.match(/Ch\.\d+/g);
      })
      pages = pages.sort((a, b)=>{
        return a.title.match(/\d+/)[0] - b.title.match(/\d+/)[0];
      })
      return pages
    }
  },
  methods: {
    // 获取当前tag
    getCurrentTag (tag) {
      this.$emit('currentTag', tag)
    },
    // 获取当前页码
    getCurrentPage (page) {
      this._setPage(page)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    },
    _setPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
    },
    // 获取时间的数字类型
    _getTimeNum (date) {
      return parseInt(new Date(date.frontmatter.date).getTime())
    }
  }
}
</script>