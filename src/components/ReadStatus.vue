<template>
  <div class="view-status">
    <img :src="icon" alt="">
    <div class="view-content">
      <div v-show="currentTime < maxTime" class="view-progress-bg">
        <div class="view-progress" :style="progressStyle"></div>
      </div>
      <div v-if="isFinish"  class="view-text" style="font-size:0.3rem;top:0.2rem">完成</div>
      <div v-else>
        <div class="view-text" v-if="currentTime < maxTime">浏览{{15-currentTime}}秒<br/>得10保额</div>
        <div class="view-text" v-else @click="handleClick">获得10保额<br/>点我领取奖励</div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        isFinish: {
            type: Boolean,
            default: false
        },
        icon: String,
        time: {
            type: [Number, String],
            default: 0
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            maxTime: 15,
            currentTime: this.time,
            text: '浏览15秒<br/>得10保额'
        };
    },
    computed: {
        progressStyle() {
            const total = this.maxTime;
            let w = this.time / total * 100;
            w = w > 100 ? 100 : w;
            return {
                width: `${w}%`
            };
        }
    },
    methods: {
        handleClick() {
            this.$emit('receive');
        }
    },
    watch: {
        time(v) {
            if (v >= this.maxTime) {
                this.text = '获得10保额<br/>点我领取奖励';
            }
            this.currentTime = v;
        }
    }
};
</script>
<style lang="less" scoped>
.view-status{
  position: fixed;
  z-index: 999;
  right: 0;
  top: 50%;
  width: 160px;
  img{
    width: 100%;
    height: auto;
  }
  .view-content{
    position: relative;
    margin: 0 10px;
    height: 86px;
    background-color: rgba(0, 0, 0, .6);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    text-align: center;
  }
  .view-progress-bg{
    height: 15px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #7e65fb;
    margin-bottom: 2px;
  }
  .view-progress{
    height: 15px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .6);
  }
  .view-text{
    position: absolute;
    bottom: 10px;
    left: 50%;
    font-size: 0.24rem;
    color: #fff;
    transform: translateX(-50%) scale(.8);
    white-space: nowrap;
  }
}
</style>
