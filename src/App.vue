<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// const dataO = {
//   a: () => 1,
//   b: () => 2,
//   c: () => 3
// }
// // 扩展运算符实现
// function fn (keys) {
//   const data = {}
//   keys.forEach(key => {
//     if (dataO.hasOwnProperty(key)) {
//       data[key] = dataO[key]
//     }
//   })
//   return data
// }
export default {
  // mounted () {
  //   // this.$store.dispatch('setTest', 2).then(() => {
  //   //   console.log(this.book)
  //   // })
  //   console.log(this.a, this.b)
  // },
  // computed: {
  //   ...mapGetters(['book']),
  //   ...fn(['a', 'b'])
  // }
}
document.addEventListener('DOMContentLoaded', () => {
  const htmlPage = document.querySelector('html')
  let fontSize = window.innerWidth / 10 // 设置字体默认大小
  fontSize = fontSize > 50 ? 50 : fontSize // 最大为50
  htmlPage.style.fontSize = fontSize + 'px'
})
</script>
<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
