<template>
<div>
  <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': shadowVisible}">
    <transition name="title-move">
      <div class="search-bar-title-wrapper" v-show="titleVisible">
        <div class="title-text-wrapper">
          <span class="title-text title">{{$t('home.title')}}</span>
        </div>
        <div class="title-icon-shake-wrapper" @click="showFlapCard">
          <span class="icon-shake icon"></span>
        </div>
      </div>
    </transition>
    <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}">
      <span class="icon-back icon" @click="back"></span>
    </div>
    <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}" >
      <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
      <div class="search-bar-input">
        <span class="icon-search icon"></span>
        <input type="text" class="input" :placeholder="$t('home.hint')"
        v-model="searchText" @click="showHotSearch">
      </div>
    </div>
  </div>
  <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
</div>
</template>

<script>
import homeMixin from '../../util/homemixin'
import HotSearchList from './HotSearchList'
export default {
  data () {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: true,
      hotSearchVisible: false
    }
  },
  mixins: [homeMixin],
  components: {
    HotSearchList
  },
  methods: {
    back () {
      this.hideHotSearch()
    },
    hideTitle () {
      this.titleVisible = false
    },
    showTitle () {
      this.titleVisible = true
    },
    hideShadow () {
      this.shadowVisible = true
    },
    showShadow () {
      this.shadowVisible = false
    },
    hideHotSearch () {
      this.hotSearchVisible = false
      if (this.offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    showHotSearch () {
      this.hideTitle()
      this.hideShadow()
      this.hotSearchVisible = true
      this.$nextTick(() => { // DOM更新循环结束之后执行延迟回调，此时才能让滚动条回到顶部
        this.$refs.hotSearch.reset()
      })
    },
    showFlapCard () {
      this.setFlapCardVisible(true)
    }
  },
  watch: {
    offsetY (y) {
      if (y > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    hotSearchOffsetY (y) {
      if (y > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/global.scss';
.search-bar{
  position: relative;
  width: 100%;
  z-index: 101;
  height: px2rem(94);
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-title {
    height: px2rem(52);
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .search-bar-title-wrapper {
    width: 100%;
    height: px2rem(42);
    position: absolute;
    top: 0;
    left: 0;
    .title-text-wrapper {
      top: 0;
      height: px2rem(42);
      @include center;
    }
    .title-icon-shake-wrapper {
      position: absolute;
      top: 0;
      right: px2rem(15);
      height: px2rem(42);
      @include center;
    }
  }
  .title-icon-back-wrapper {
    position: absolute;
    top: 0;
    left: px2rem(15);
    height: px2rem(42);
    z-index: 101;
    @include center;
    transition: height .2s linear;
    &.hide-title {
      height: px2rem(52);
    }
  }
  .search-bar-input-wrapper {
    width: 100%;
    height: px2rem(52);
    padding: px2rem(10);
    box-sizing: border-box;
    position: absolute;
    top: px2rem(42);
    left: 0;
    transition: top .2s linear;
    display: flex;
    &.hide-title {
      top: 0;
    }
    .search-bar-blank {
      flex: 0 0 0;
      width: 0;
      transition: all .2s linear;
      &.hide-title {
        flex: 0 0 px2rem(31);
        width: px2rem(31);
      }
    }
    .search-bar-input {
      flex: 1;
      width: 100%;
      background: #f4f4f4;
      box-sizing: border-box;
      padding: px2rem(5) px2rem(15);
      border-radius: px2rem(20);
      border: px2rem(1) solid #eee;
      @include left;
      .icon-search {
        color: #999
      }
      .input {
        width: 100%;
        height: px2rem(22);
        background: transparent;
        border: none;
        font-size: px2rem(12);
        color: #666;
        margin-left: px2rem(10);
        &:focus {
          outline: none;
        }
        &::placeholder {
          color: #999;
        }
      }
    }
  }
}
</style>
