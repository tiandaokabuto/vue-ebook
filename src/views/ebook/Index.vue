<template>
  <div class="ebook">
    <ebook-reader></ebook-reader>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
export default {
  data () {
    return {

    }
  },
  components: {
    EbookReader
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global.scss'
</style>
