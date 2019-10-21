<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="(settingVisible === 2) && menuVisible">
      <div class="setting-progress">
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper" @click="preSection">
            <span class="icon-back"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            ref="progress"
          />
          <div class="progress-icon-wrapper" @click="nextSection">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTime}}</span>
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable eslint(vue/return-in-computed-property) */
import ebookMixin from '../../util/mixin'
export default {
  data () {
    return {}
  },
  computed: {
    getReadTime () {
      return this.$t('book.haveRead').replace('$1', this.getReadTimeByMinute(this.fileName))
    }
  },
  mixins: [ebookMixin],
  methods: {
    onProgressChange (progress) { // 进度条发生变化时渲染
      this.setProgress(progress).then(() => {
        this.displayProgress()
      })
    },
    onProgressInput (progress) { // 拖动进度条时也会渲染
      this.setProgress(progress).then(() => {
        this.displayProgress()
      })
    },
    displayProgress () {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      this.display(cfi)
    },
    preSection () {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    nextSection () {
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    displaySection () {
      const sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      width: 100%;
      height: px2rem(10);
      font-size: px2rem(12);
      left: 0;
      bottom: px2rem(5);
      @include center;
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .progress {
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
        background-size: 0 100%;
        margin: 0 px2rem(10);
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
      .progress-icon-wrapper {
        font-size: px2rem(20)
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      top: px2rem(8);
      width: 100%;
      color: #333;
      font-size: px2rem(12);
      text-align: center;
      @include center;
      box-sizing: border-box;
      padding: 0 px2rem(10);
      .progress-section-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
