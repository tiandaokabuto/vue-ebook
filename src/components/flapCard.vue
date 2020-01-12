<template>
  <div class="flap-card-wrapper">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}">
        <div class="flap-card-semi-circle">
          <div class="flap-card-semi-circle-left" :style="semiCricelStyle(item, 'left')" ref="left"></div>
          <div class="flap-card-semi-circle-right" :style="semiCricelStyle(item, 'right')" ref="right"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <div class="icon-close"></div>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '..//utils/mixin'
  export default {
    props: {
      data: Object
    },
    mixins: [storeHomeMixin],
    data() {
      return {
        pointList: [],
        flapCardList: [
          {
            r: 255,
            g: 102,
            _g: 102,
            b: 159,
            imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 100,
            rotateDegree: 0
          },
          {
            r: 74,
            g: 171,
            _g: 171,
            b: 255,
            imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 99,
            rotateDegree: 0
          },
          {
            r: 255,
            g: 198,
            _g: 198,
            b: 102,
            imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 98,
            rotateDegree: 0
          },
          {
            r: 255,
            g: 102,
            _g: 102,
            b: 159,
            imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 97,
            rotateDegree: 0
          },
          {
            r: 59,
            g: 201,
            _g: 201,
            b: 22,
            imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
            imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
            backgroundSize: '50% 50%',
            zIndex: 96,
            rotateDegree: 0
          }
        ],
        front: 0,
        back: 1,
        intervalTime: 25,
        runPointAnimation: false,
        runFlapCardAnimation: false,
        runBookCardAnimation: false,
        ifShowBookCard: false,
        ifShowFlapCard: true,
        ifShowPoint: true
      }
    },
    methods: {
      close () {

      },
      semiCricelStyle(item, direction) {
        return {
          backgroundColor: `rgb(${item.r} ,${item.g} ,${item.b})`,
          backgroundImage: direction === 'left' ? item.imgLeft : item.imgRight,
          backgroundSize: item.backgroundSize
        }
      },
      rotate(index, type) { // 转动卡片
        const item = this.flapCardList[index]
        let dom
        if (type === 'front') {
          dom = this.$refs.right[index]
        } else {
          dom = this.$refs.left[index]
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`
        dom.style.backgroundColor = `rgb(${item.r} ,${item._g} ,${item.b})`
      },
      flapCardRotate () {
        const frontCard = this.flapCardList[this.front]
        const backCard = this.flapCardList[this.back]
        frontCard.rotateDegree += 10 // 正面的卡片右边慢慢翻转
        frontCard._g -= 5 // 正面的卡片右边颜色加深
        backCard.rotateDegree -= 10 // 背面卡片左边与正面卡右边同时翻转
        if (backCard.rotateDegree < 90) {
          backCard._g += 5
        }
        // 背面卡左边到达90之后背面卡进行显示，继续回归原位（180到0）
        if (frontCard.rotateDegree === 90 && backCard.rotateDegree === 90) {
          backCard.zIndex += 2
        }
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        // 转动完之后，背面卡左边角度为0（原位），正面卡右边为180
        if (frontCard.rotateDegree === 180 && backCard.rotateDegree === 0) {
          this.next() // 继续翻动下一张
        }
      },
      next () {
        const frontCard = this.flapCardList[this.front]
        const backCard = this.flapCardList[this.back]
        frontCard.rotateDegree = 0
        frontCard._g = frontCard.g
        backCard.rotateDegree = 0
        backCard._g = backCard.g
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        this.front++
        this.back++
        const len = this.flapCardList.length
        if (this.front >= len) {
          this.front = 0
        }
        if (this.back >= len) {
          this.back = 0
        }
        // 动态修改z-index
        // 100 --> 96
        // 99 --> 100
        // 98 --> 99
        // 97 --> 98
        // 96 --> 97
        this.flapCardList.forEach((item, index) => {
          // if (item.zIndex === 100) {
          //   item.zIndex = 96
          // } else if (item.zIndex === 99) {
          //   item.zIndex = 100
          // } else if (item.zIndex === 98) {
          //   item.zIndex = 99
          // } else if (item.zIndex === 97) {
          //   item.zIndex = 98
          // } else if (item.zIndex === 96) {
          //   item.zIndex = 97
          // }
          item.zIndex = 100 - ((index - this.front + len) % len)
        })
        this.prepare()
      },
      prepare () { // 设置前面卡片翻转时，背面卡片的准备
        const backCard = this.flapCardList[this.back]
        backCard.rotateDegree = 180
        backCard._g = backCard.g - 5 * 9
        this.rotate(this.back, 'back') // 把背面卡的左边转到与正面卡右边同一位置
      },
      startFlapCardAnimation() {
        this.prepare()
        setInterval(() => {
          this.flapCardRotate()
        }, this.intervalTime)
      }
    },
    mounted() {
      this.startFlapCardAnimation()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/styles/global";
  @import "../assets/styles/flapCard";
  .flap-card-wrapper {
    @include absCenter;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    @include center;
    .flap-card-bg {
      width: px2rem(64);
      height: px2rem(64);
      background:white;
      position: relative;
      border-radius: px2rem(5);
      .flap-card {
        width: px2rem(48);
        height: px2rem(48);
        @include absCenter;
        .flap-card-semi-circle {
          width: 100%;
          height: 100%;
          display: flex;

          .flap-card-semi-circle-left {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center right;
            border-radius: px2rem(24) 0 0 px2rem(24);
            transform-origin: right; // 转动轴
            backface-visibility: hidden;
          }
          .flap-card-semi-circle-right {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center left;
            border-radius: 0 px2rem(24) px2rem(24) 0;
            transform-origin: left; // 转动轴
            backface-visibility: hidden;
          }
        }
      }
    }
    .close-btn-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(30);
        z-index: 1100;
        width: 100%;
        @include center;
        .icon-close {
          display: inline-block;
          width: px2rem(45);
          height: px2rem(45);
          font-size: px2rem(25);
          color: white;
          background: #333;
          border-radius: 50%;
          @include center;
        }
      }
  }
</style>
