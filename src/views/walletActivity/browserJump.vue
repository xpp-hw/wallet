<template>
  <div class="main">
    <div class="zt_dwn">
      <p class="zt_download" @click="openURL">立即打开</p>
      <p>如未安装请点击<a style="color: blue; " @click="cm();">下载</a></p>
      <p>如已安装未自动跳转，请<a class="zt_reload" @click="refresh" style="color: blue;">刷新</a></p>
    </div>
    <div v-if="isAndroid" class="androidBg"></div>
    <div v-if="isIos" class="iosBg"></div>
  </div>
</template>

<script>
import {
    getAppsystem, browser, isWeiXinScene, appJumpTo
} from '@/common/publicFunc.js';

export default {
    data() {
        return {
            app: '',
            isAndroid: false,
            isIos: false,
            jumpUrl: ''
        };
    },
    mounted() {
        this.app = getAppsystem();
        if (this.app === 'ios') {
            this.isIos = true;
        } else if (this.app === 'android') {
            this.isAndroid = true;
        }
        this.jumpUrl = this.$route.query.jumpUrl;
        if (!browser.versions.JSMCC && !isWeiXinScene()) {
            // this.$router.push({
            //     name: 'browserJump'
            // });
            this.isIos = false;
            this.isAndroid = false;
        }
    },
    methods: {
        cm() {
            const app = getAppsystem();
            if (app === 'ios') {
                window.location = 'https://itunes.apple.com/cn/app/id446332125?mt=8&t';
            } else {
                window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.jsmcc';
            }
        },
        openURL() {
            appJumpTo(this.jumpUrl, '活动页');
        },
        refresh() {
            this.$router.go(0);
        }
    }
};
</script>

<style lang="less">
.main{
  width: 100%;
  height: 9.07rem;
  background: url('../../assets/images/activity/ztbg.jpg') no-repeat;
  background-size: 100% 100%;
  .zt_dwn{
    position: fixed;
    top: 9.07rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
  p{
    width: 5.96rem;
    line-height: 2;
    font-size: 0.3rem;
  }
  .zt_download{
    background: #6894e8;
    color: #fff;
    border-radius: 0.2rem;
    height: 0.75rem;
    line-height: 0.75rem;
    font-size: 0.28rem;
    margin-bottom: 0.12rem;
  }
}
.androidBg{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: url('../../assets/images/activity/Android.png') no-repeat;
  background-size: 100% 100%;
}
.iosBg{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: url('../../assets/images/activity/IOS.png') no-repeat;
  background-size: 100% 100%;
}
</style>
