<template>
  <div>
    <div class="switchingUsers">
      <span v-if="mobile">尊敬的{{mobile.slice(0, 3)}}****{{mobile.slice(7, 11)}}用户，您好!</span><span @click="loginOut">【退出】</span>
    </div>
    <md-popup v-model="isLoginOutPopupShow" position="bottom" :mask-closable='false'>
      <md-popup-title-bar title="温馨提示" large-radius></md-popup-title-bar>
      <div class="popup_content">
        <p class="text">确认退出并返回登录页面？</p>
        <button class="btn1" @click="cancel">否</button>
        <button class="btn2" @click="submit">是</button>
      </div>
    </md-popup>
  </div>
</template>

<script>
import * as store2 from '@/common/localstore';
import { Popup, PopupTitleBar } from 'mand-mobile';

export default {
    name: 'switchingUsers',
    components: {
        [Popup.name]: Popup,
        [PopupTitleBar.name]: PopupTitleBar
    },
    props: {
        isLoginOutPopupShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            mobile: store2.default.get('usrmob')
        };
    },
    methods: {
        // 登出
        loginOut() {
            this.$emit('update:isLoginOutPopupShow', true);
        },
        submit() {
            window.sessionStorage.clear();
            window.localStorage.clear();
            this.$toast.info('正在退出...');
            if (this.$client.LEADEON) {
                leadeon.quitLogin();
                setTimeout(() => {
                    leadeon.showLogin();
                }, 1000);
            } else {
                const pageUrl = encodeURIComponent(
                    this.delectQueryString(window.location.href, 'tokenid')
                );
                const url = `https://wap.js.10086.cn/login.thtml?redirectURL=https://wap.js.10086.cn/vw/JRGY/DLTZ?autoauth=jtauth&redirectURL=${pageUrl}`;
                setTimeout(() => {
                    window.location.assign(url);
                }, 1000);
            }
        },
        cancel() {
            this.$emit('update:isLoginOutPopupShow', false);
        },
        delectQueryString(url, paraName) {
            const arrObj = url.split('?');
            if (arrObj.length > 1) {
                const arrPara = arrObj[1].split('&');
                let arr = [];
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split('=');
                    if (arr != null && arr[0] === paraName) {
                        arrPara.splice(i, 1);
                        // eslint-disable-next-line no-plusplus
                        i--;
                    }
                }
                if (arrPara.length === 0) {
                    return arrObj[0];
                }
                return `${arrObj[0]}?${arrPara.join('&')}`;
            }
            return url;
        }
    }
};
</script>

<style lang="less" scoped>
    .switchingUsers{
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%);
      padding: 10px 30px;
      background: rgba(0, 0, 0, .5);
      color: #fff;
      font-size: 28px;
      border-radius: 0 0 20px 20px;
      width: max-content;
      span:nth-of-type(2){
        margin-left: 35px;
        color: #99D0FF;
      }
    }
    .popup_content{
      background: #fff;
      padding: 49px 120px 183px;
      text-align: center;
      font-size: 32px;
      .text{
        margin-bottom: 100px;
      }
      .btn1{
        width: 225px;
        height: 72px;
        background: #fff;
        border: 1px solid #007FFF;
        border-radius: 49.5px;
        color: #007FFF;
        margin-right: 40px;
      }
      .btn2{
        width: 225px;
        height: 72px;
        background: #007FFF;
        border-radius: 49.5px;
        color: #fff;
      }
    }
</style>
