<template>
  <div class="ebook-reader">
    <div id="reader">

    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import ebookMixin from '../../util/mixin'
export default {
  data () {
    return {

    }
  },
  mixins: [ebookMixin], // mixin进行复用
  components: {

  },
  methods: {
    // 初始化电子书
    initEpub () {
      const url = 'http://192.168.43.145:8081/epub/' + this.fileName + '.epub'
      this.ebook = new Epub(url)
      this.rendition = this.ebook.renderTo('reader', { // 得到一个rendition对象
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      })
      this.rendition.display() // epub电子书实现原理是使用iframe标签
      this.rendition.on('touchstart', (event) => { // 绑定一个触摸事件
        this.touchStartX = event.changedTouches[0].clientX // 获取触摸的横坐标
        this.startTime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => { // 绑定一个触摸事件
        this.offSetX = event.changedTouches[0].clientX - this.touchStartX // 偏移量
        this.useTime = event.timeStamp - this.startTime // 用时
        if (this.offSetX > 40 && this.useTime < 500) { // 往左划
          this.prevPage() // 上一页
        } else if (this.offSetX < -40 && this.useTime < 500) { // 往右滑
          this.nextPage() // 下一页
        } else { // 两者都不是
          this.showTitleAndMenu() // 展示标题栏跟菜单栏
        }
        // event.preventDefault() // 禁止事件默认方法调用
        event.stopPropagation() // 禁止传播
      })
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    showTitleAndMenu () {
      this.changeMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      this.changeMenuVisible(false)
    }
  },
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
    // console.log(`${baseUrl}${this.fileName}.epub`) // 电子书路径
  }
}
</script>

<style lang="scss" scoped>
</style>
