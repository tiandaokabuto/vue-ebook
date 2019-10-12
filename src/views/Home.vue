<template>
  <div class="home">
    <div id="read">

    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
global.Epub = Epub
export default {
  name: 'Home',
  mounted () {
    this.book = new Epub('/中国绘画史.epub')
    this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
  }
}
</script>
