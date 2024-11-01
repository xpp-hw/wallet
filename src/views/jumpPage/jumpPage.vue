<template>
  <div id="app">
    <!-- 微信拉起提示内容 -->
    <div class="modelTip" v-if="isShow">
      <img v-if="$client.ANDROID" src="@/assets/images/Android.png" alt="">
      <img v-else src="@/assets/images/IOS.png" alt="">
    </div>
  </div>
</template>
<script>

export default {
    name: 'jumpPage',
    data() {
        return {
            pageUrl: '',
            isShow: false
        };
    },
    created() {
        debugger;
        this.pageUrl = this.$route.query.pageUrl;
        if (!this.$client.JSMCC && !this.$client.WEIXIN) {
            window.location.href = this.pageUrl;
        } else {
            this.isShow = true;
        }
    }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
// #app {
//   padding-top: 88px;
// }
.md-field-item-title {
  color: #666;
}
.onpenInApp{
  height: 120px;
  line-height: 120px;
  display: flex;
  align-items: center;
  background: #ededed;
  font-size: 28px;
  .icon{
    padding: 0 20px;
  }
  img{
    width: 77px;
    height: 77px;
  }
  .text{
    margin-left: 20px;
    flex-grow: 1;
  }
  .openBtn{
    width: 190px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: #169bd7;
    color: #fff;
    border-radius: 5px;
    margin-right: 20px;
    border: 0;
  }
}
.modelTip{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
