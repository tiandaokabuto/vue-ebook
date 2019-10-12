<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('setTest', 2).then(() => {
      console.log(this.book)
    })
  },
  computed: {
    ...mapGetters(['book'])
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const htmlPage = document.querySelector('html')
  let fontSize = window.innerWidth / 10 // 设置字体默认大小
  fontSize = fontSize > 50 ? 50 : fontSize // 最大为50
  htmlPage.style.fontSize = fontSize + 'px'
})
</script>
<style scoped lang="scss">
  @import './assets/style/global';
</style>
