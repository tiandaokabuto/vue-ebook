<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow':!menuVisible || settingVisible >= 0}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <setting-font></setting-font>
    <setting-font-family></setting-font-family>
    <setting-theme></setting-theme>
    <setting-progress></setting-progress>
  </div>
</template>

<script>
import ebookMixin from '../../util/mixin'
import SettingFont from './EbookSettingFont'
import SettingFontFamily from './EbookSettingFontFamily'
import SettingTheme from './EbookSettingTheme'
import SettingProgress from './EbookSettingProgress'
export default {
  data () {
    return {}
  },
  mixins: [ebookMixin],
  components: {
    SettingFont,
    SettingFontFamily,
    SettingTheme,
    SettingProgress
  },
  methods: {
    showSetting (key) {
      this.setSettingVisible(key)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress,
      .icon-menu,
      .icon-bright,
      .icon-A {
        font-size: px2rem(20);
      }
    }
  }
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 101;
    width: 100%;
    height: px2rem(60);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background: white;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(30);
        box-sizing: border-box;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
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
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        color: #333;
        font-size: px2rem(12);
        text-align: center;
      }
    }
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.8);
  }
}
</style>
