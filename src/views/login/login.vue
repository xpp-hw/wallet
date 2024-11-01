<template>
  <div>
    <md-popup v-model="reLogin">
      <div class="tipsModel">
        <div class="loseTitle">温馨提示</div>
        <p>您的登录已超时，请退出重新登录</p>
        <div class="btnCont">
          <md-button type="default" size="small" @click="refreshLogin">知道了</md-button>
        </div>
      </div>
    </md-popup>
    <md-popup v-model="loginError">
      <div class="tipsModel">
        <div class="loseTitle">温馨提示</div>
        <p>登录失败，请稍后重新尝试</p>
        <div class="btnCont">
          <md-button type="default" size="small" @click="leavePage">知道了</md-button>
        </div>
      </div>
    </md-popup>
  </div>
</template>

<script>
// import qs from 'qs';
import api from "@/common/apiUrls";
import { getCookie } from "@/common/cookie";
// import api from '@/common/apiUrls';
import * as store2 from "@/common/localstore";

export default {
  name: "login",
  data() {
    this.msgTimeout = null;
    return {
      reLogin: false,
      loginError: false,
      redirect: "",
      reason: "",
    };
  },
  created() {
    this.reason = this.$route.query.reason;
    this.redirect = this.$route.query.redirect;
    if (this.reason) {
      this.loginError = true;
    } else {
      this.login();
    }
  },
  mounted() {
    const cmtokenid = getCookie("cmtokenid");
    let token = "";

    const localCmtokenid = store2.default.get("localCmtokenid", cmtokenid);
    // 客户端刷新tokenid则更新本地token缓存
    if (localCmtokenid !== cmtokenid) {
      store2.default.set("localCmtokenid", cmtokenid);
      store2.default.set("loginSesion", null);
    }

    if (cmtokenid != null && cmtokenid !== "") {
      store2.default.set("localCmtokenid", cmtokenid);
      api.banksApi
        .queryToken({
          tokenId: cmtokenid,
        })
        .then((data) => {
          console.log(data);
          token = data.body.sessionId;
          store2.default.set("loginSesion", token);
          if (data.body.loginName) {
            store2.default.set("usrmob", data.body.loginName.split("-")[1]);
            // eslint-disable-next-line no-undef
            setCookieNotTimeOut(
              "userMobileForBigData",
              data.body.loginName.split("-")[1]
            );
          }
          this.$router.push({
            path: this.redirect,
          });
        });
    }
  },
  methods: {
    login() {
      const u = navigator.userAgent;
      const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; // android终端或者uc浏览器
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      const isIpad = u.indexOf("iPad") > -1; // 是否iPad
      const isIPhone = u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1; // 是否为iPhone或者QQHD浏览器
      const isJSMCC = u.toLowerCase().indexOf("jsmcc") > -1;
      if (!isJSMCC) {
        this.reLogin = true;
        return;
      }
      if (isAndroid) {
        window.buy.buyImmediately();
      } else if (isIOS || isIPhone || isIpad) {
        window.location.href = "phonestore://jumpToLogin";
      }
      setTimeout(() => {
        this.reLogin = true;
      }, 2000);
    },
    refreshLogin() {
      const u = navigator.userAgent;
      const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; // android终端或者uc浏览器
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      const isIpad = u.indexOf("iPad") > -1; // 是否iPad
      const isIPhone = u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1; // 是否为iPhone或者QQHD浏览器
      const isJSMCC = u.toLowerCase().indexOf("jsmcc") > -1;
      if (!isJSMCC) {
        let url = this.redirect
          ? window.location.href.split("/login")[0] + this.redirect
          : window.location.href.replace("/login", "/index");
        if (url && url.indexOf("tokenid") > -1) {
          const urlList = url.split("?")[1].split("&");
          for (let i = 0; i < urlList.length; i += 1) {
            if (urlList[i].indexOf("tokenid") > -1) {
              urlList.splice(i, 1);
              break;
            }
          }
          // eslint-disable-next-line no-const-assign
          url = `${url.split("?")[0]}?${urlList.join("&")}`;
        }
        url = encodeURIComponent(url);
        window.sessionStorage.setItem("jsmcc", true);
        window.location.href = `https://wap.js.10086.cn/vw/JRGY/DLTZ?autoauth=jtauth&redirectURL=${url}`;
        return;
      }
      // if (window.sessionStorage.getItem('jsmcc')) {
      //     window.sessionStorage.removeItem('jsmcc');
      // }
      if (isAndroid) {
        window.native_obj.finishCurrentWebView();
      } else if (isIOS || isIPhone || isIpad) {
        this.closeBage();
      }
    },
    leavePage() {
      if (this.$client.JSMCC) {
        if (this.$client.ANDROID) {
          // 安卓端
          window.native_obj.finishCurrentWebView();
        } else if (this.$client.IOS) {
          // IOS端
          this.closeBage();
        }
      } else if (this.$client.WEIXIN) {
        WeixinJSBridge.call("closeWindow");
      } else {
        window.opener = null;
        window.open(" ", "_self"); // 注意空格别忘打
        window.close();
      }
    },
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        // eslint-disable-next-line no-undef
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      const WVJBIframe = document.createElement("iframe");
      WVJBIframe.style.display = "none";
      WVJBIframe.src = "https://__bridge_loaded__";
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(() => {
        document.documentElementNaNpxoveChild(WVJBIframe);
      }, 0);
      return null;
    },
    closeBage() {
      // 调用方式
      this.setupWebViewJavascriptBridge((WebViewJavascriptBridge) => {
        WebViewJavascriptBridge.callHandler("scGoBack");
      });
    },
  },
};
</script>

<style scoped lang="less">
.writeIMEI {
  margin: 3rem 0 1rem;
  font-size: 40px;
  line-height: 40px;
  color: #333333;
  text-align: center;
  font-weight: 600;
}
.form {
  /deep/ .md-field-item {
    &.is-solid {
      .md-field-item-content {
        .md-field-item-left {
          width: 180px;
        }
      }
    }
  }
}
.smsCodeBtn {
  height: 44px;
  width: 250px;
  box-sizing: border-box;
  padding-left: 30px;
  line-height: 48px;
  font-size: 34px;
  border-left: 2px solid #eee;
  a {
    text-decoration: none;
    color: #0195ff;
  }
}
.commBtn {
  padding: 0;
  border: none;
  outline: none;
  font-size: 34px;
  background-color: #fff;
  &.actBtn {
    opacity: 1;
    background: rgba(1, 149, 255, 0.4);
    border-radius: 8px;
  }
}
.blockButtonBox {
  margin-top: 1rem;
  padding: 0 50px;
}
.tipsModel {
  width: 6rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 0.3rem;
  .loseTitle {
    width: 100%;
    height: 0.6rem;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.38rem;
    text-align: center;
    border-bottom: 0.01rem solid #e1e1e1;
  }
  p {
    font-size: 0.3rem;
    margin: 0.5rem auto;
    text-align: center;
  }
  .md-button.small {
    width: 2rem;
    margin: auto;
  }
  .btnCont {
    display: flex;
  }
}
</style>
