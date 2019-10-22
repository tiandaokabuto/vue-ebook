<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>111</div>
      <div>222</div>
    </scroll>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import Scroll from '../../components/common/Scroll'
import FlapCard from '../../components/home/FlapCard'
import homeMixin from '../../util/homemixin'
import { home } from '../../api/store'
export default {
  data () {
    return {
      scrollTop: 94,
      random: null
    }
  },
  mixins: [homeMixin],
  components: {
    SearchBar,
    Scroll,
    FlapCard
  },
  methods: {
    onScroll (y) {
      this.setOffsetY(y)
      if (y > 0) {
        this.scrollTop = 52
      } else {
        this.scrollTop = 94
      }
      this.$refs.scroll.refresh()
    }
  },
  mounted () {
    home().then(res => {
      if (res.status === 200) {
        const data = res.data
        const randomIndex = Math.floor(Math.random() * data.random.length)
        console.log(randomIndex)
        this.random = data.random[randomIndex]
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global.scss';
.store-home {
  width: 100%;
  height: 100%;
  background: white;
}
</style>
