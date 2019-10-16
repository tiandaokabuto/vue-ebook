<template>
  <transition name="family-slide-up">
    <div class="ebook-family-list" v-show="fontFamilyVisible">
      <div class="ebook-family-title">
        <div class="ebook-family-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-family-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-family-list-wrapper">
        <div
          class="ebook-family-item"
          v-for="(item, index) in fontFamilyList"
          :key="index"
          @click="setFontFamily(item.font)"
        >
          <div class="ebook-family-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div>
          <div class="ebook-family-item-check" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ebookMixin from '../../util/mixin'
import { FONT_FAMILY } from '../../util/book'
import { saveFontFamily } from '../../util/localStorage'
export default {
  data () {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  mixins: [ebookMixin],
  components: {},
  methods: {
    hide () {
      this.setFontFamilyVisible(false)
    },
    isSelected (item) {
      return this.defaultFontFamily === item.font
    },
    setFontFamily (fontFamily) {
      this.setDefaultFontFamily(fontFamily)
      if (fontFamily === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(fontFamily)
      }
      saveFontFamily(this.fileName, fontFamily)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.ebook-family-list {
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  font-size: 0;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-family-title {
    position: relative;
    text-align: center;
    padding: px2rem(15);
    border-bottom: px2rem(1) solid #b8b9bb;
    box-sizing: border-box;
    @include center;
    .ebook-family-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
    .ebook-family-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      @include center;
      .icon-down2 {
        font-size: px2rem(16);
        font-weight: bold;
      }
    }
  }
  .ebook-family-list-wrapper {
    .ebook-family-item {
      display: flex;
      padding: px2rem(15);
      .ebook-family-item-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-family-item-check {
        flex: 1;
        text-align: right;
        .icon-check {
          font-size: px2rem(14);
          font-weight: bold;
          color: #346cb9;
        }
      }
    }
  }
}
</style>
