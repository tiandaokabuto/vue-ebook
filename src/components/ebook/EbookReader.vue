<template>
  <div class="ebook-reader">
    <div id="reader"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import ebookMixin from '../../util/mixin'
import { flatten } from '../../util/book'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from '../../util/localStorage'
export default {
  data () {
    return {}
  },
  mixins: [ebookMixin], // mixin进行复用
  components: {},
  methods: {
    // 初始化电子书
    initEpub () {
      const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
      this.ebook = new Epub(url)
      this.setCurrentBook(this.ebook)
      this.initRendition()
      this.initGesture()
      this.parseBook()
      this.ebook.ready.then(() => {
        return this.ebook.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)).then(locations => {
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      })
    },
    initRendition () {
      this.rendition = this.ebook.renderTo('reader', {
        // 得到一个rendition对象
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default'
      })
      const location = getLocation(this.fileName)
      console.log(location)
      this.display(location, () => { // epub电子书实现原理是使用iframe标签
        this.initFontFamily()
        this.initFontSize()
        this.initTheme()
      })
      // 载入字体库
      this.rendition.hooks.content.register(contents => {
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
        )
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
        )
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
        )
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
        )
      })
    },
    parseBook () {
      this.ebook.loaded.cover.then(cover => { // 获取电子书的封面
        this.ebook.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.ebook.loaded.metadata.then(metadata => { // 获取电子书的书名和作者
        this.setMetadata(metadata)
      })
      this.ebook.loaded.navigation.then(nav => { // 获取电子书的目录
        // 目录是树状结构，要把它转换为一维数组的结构
        // console.log([].concat(...[1, 2, 3])) 实现思路
        const navItem = flatten(nav.toc)
        function find (item, level = 0) {
          return !item.parent ? level : find(navItem.filter(parentItem =>
            parentItem.id === item.parent)[0], ++level)
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        console.log(navItem)
        this.setNavigation(navItem)
      })
    },
    initGesture () {
      this.rendition.on('touchstart', event => {
        // 绑定一个触摸事件
        this.touchStartX = event.changedTouches[0].clientX // 获取触摸的横坐标
        this.startTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        // 绑定一个触摸事件
        this.offSetX = event.changedTouches[0].clientX - this.touchStartX // 偏移量
        this.useTime = event.timeStamp - this.startTime // 用时
        if (this.offSetX > 40 && this.useTime < 500) {
          // 往左划
          this.prevPage() // 上一页
        } else if (this.offSetX < -40 && this.useTime < 500) {
          // 往右滑
          this.nextPage() // 下一页
        } else {
          // 两者都不是
          this.showTitleAndMenu() // 展示标题栏跟菜单栏
        }
        // event.preventDefault() // 禁止事件默认方法调用
        event.stopPropagation() // 禁止传播
      })
    },
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, 16)
      } else {
        this.setDefaultFontSize(fontSize)
      }
      this.currentBook.rendition.themes.fontSize(fontSize)
    },
    initFontFamily () {
      let fontFamily = getFontFamily(this.fileName)
      if (!fontFamily) {
        // 首次打开没有该字段的值
        saveFontFamily(this.fileName, 'Default')
      } else {
        this.setDefaultFontFamily(fontFamily)
      }
      this.currentBook.rendition.themes.font(fontFamily)
    },
    initTheme () {
      this.themeList.forEach(theme => { // 注册主题
        this.currentBook.rendition.themes.register(theme.name, theme.style)
      })
      let theme = getTheme(this.fileName)
      if (!theme) {
        saveTheme(this.fileName, 'Default')
      } else {
        this.setDefaultTheme(theme)
      }
      this.currentBook.rendition.themes.select(this.defaultTheme)
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    showTitleAndMenu () {
      this.setMenuVisible(!this.menuVisible)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
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
