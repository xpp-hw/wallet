<template>
  <div class="rulesPopUps">
    <div class="content_warp">
      <div class="title">
        <span>规则说明</span>
        <div class="close" @click="close"></div>
      </div>
      <div class="rulesContent">
        <div v-html="agreementContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rulesPopUps',
  props: ['rulesPopUpsFlag','agreementContent'],
  data() {
    return {
    }
  },
  methods: {
    close(){
      this.$emit('update:rulesPopUpsFlag', false)
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
  .rulesPopUps{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .5);
    .content_warp{
      position: absolute;
      bottom: 0;
      left: 0;
      height: 870px;
      width: 100%;
      background: #fff;
      border-radius: 25px 25px 0 0;
      animation: moveUp .3s linear;
      @keyframes moveUp {
        0% {
          bottom: -870px;
        }
        100% {
          bottom: 0;
        }
      }
      .title{
        background: url('~@/assets/images/financeSportsMeeting/rules_title.png') no-repeat;
        background-size: 100% 100%;
        height: 120px;
        width: 100%;
        text-align: center;
        font-size: 36px;
        font-weight: 600;
        line-height: 120px;
        .close{
          position: absolute;
          top: 40px;
          right: 30px;
          width: 39px;
          height: 39px;
          background: url('~@/assets/images/financeSportsMeeting/rules_close.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .rulesContent{
        padding:0 40px 20px 40px;
        font-size: 28px;
        height: 700px;
        overflow-y: auto;
      }
    }
  }
</style>