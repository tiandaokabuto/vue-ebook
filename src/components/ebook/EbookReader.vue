<template>
  <div class="ebook-reader">
    <div id="reader">

    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['book'])
  },
  components: {

  },
  methods: {
    // 初始化电子书
    initEpub () {
      const url = 'http://192.168.43.145:8081/epub/' + this.book + '.epub'
      this.ebook = new Epub(url)
      this.rendition = this.ebook.renderTo('reader', { // 得到一个rendition对象
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      })
      this.rendition.display() // epub电子书实现原理是使用iframe标签
      console.log(this.rendition)
      console.log(this.ebook)
      this.rendition.on('touchstart', (event) => { // 绑定一个触摸事件
        this.touchStartX = event.changedTouches[0].clientX // 获取触摸的横坐标
        this.startTime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => { // 绑定一个触摸事件
        this.offSetX = event.changedTouches[0].clientX - this.touchStartX // 偏移量
        this.useTime = event.timeStamp - this.startTime // 用时
        if (this.offSetX > 40 && this.useTime < 500) { // 往左划
          this.prevPage()
        } else if (this.offSetX < -40 && this.useTime < 500) { // 往右滑
          this.nextPage()
        } else { // 两者都不是
          this.showTitleAndMenu()
        }
        event.preventDefault() // 禁止事件默认方法调用
        event.stopPropagation() // 禁止传播
      })
    }
  },
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(() => {
      this.initEpub()
    })
    // console.log(`${baseUrl}${this.fileName}.epub`) // 电子书路径
  }
}
</script>

<style lang="scss" scoped>
</style>
