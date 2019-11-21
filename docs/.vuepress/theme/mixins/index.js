export default {
  methods: {
    _tagColor () {
      // 红、蓝、绿、橙、灰
      const tagColorArr = ['#8bc34a', '#673ab7', '#f47e60', '#ff9800', '#f44336', '#00abc0', '#2196f3', '#67cc86', '#fb9b5f']
      const index = Math.floor(Math.random() * tagColorArr.length)
      return tagColorArr[index]
    },
    _filterPostData (posts) {
      posts = posts.filter(item => {
        const { home, date, publish } = item.frontmatter
        return !(home == true || !item.path.match(/\/views\/.*/g) || publish === false)
      })
      return posts
    },
    _sortPostData (posts) {
      posts.sort((a, b) => {
        return this._getTimeNum(b) - this._getTimeNum(a)
      })
    },
    _sortPostDataName (posts) {
      posts.sort((a, b) => {
        return a.title.localeCompare(b.title);
      })
    },
    // 获取时间的数字类型
    _getTimeNum (date) {
      return parseInt(new Date(date.frontmatter.date).getTime())
    }
  }
}
