<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-07-24 17:44:55
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-08-27 15:47:25
 * @FilePath: \wallet\src\views\financeSportsMeeting\components\firstEntryPopUps.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="firstEntryPopUps">
    <div class="step1_warp">
      <div class="step1_btn" @click="submit"></div>
    </div>
  </div>
</template>

<script>
export default {
  props:['firstEntryPopUpsFlag'],
  mounted(){
    window.scrollTo(0, 0)
  },
  methods:{
    submit(){
      this.$emit('update:firstEntryPopUpsFlag', true)
      window.localStorage.setItem('bsWallet.firstEntry',true)
    }
  }
}
</script>

<style lang="less" scoped>
  .firstEntryPopUps{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    .step1_warp{
      width: 549px;
      height: 720px;
      background: url('~@/assets/images/financeSportsMeeting/firstEntry_new.png') no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      padding: 550px 97px 0 92px;
      box-sizing: border-box;
      .step1_btn{
        width: 360px;
        height: 128px;
        background: url('~@/assets/images/financeSportsMeeting/firstEntry_btn.png') no-repeat center center;
        background-size: 100% 100%;
        
      }
    }
  }
</style>