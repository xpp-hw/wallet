<template>
    <div id="app">
       <!-- 掌厅拉起 -->
        <!-- <div
          class="onpenInApp"
          v-if="!$client.JSMCC && !$client.LEADEON && canOpen && routingGuard && !$route.meta.noApp"
        >
          <md-icon
            class="icon"
            name="close"
            color="#333"
            @click="closeApp"
          ></md-icon>
          <img src="../src/assets/images/icon.png" alt="" />
          <div class="text">
            <div class="title_1">中国移动江苏APP</div>
            <div class="title_2">更多服务 更多优惠 7X24在线</div>
          </div>
          <div id="launch-btn" class="openBtn" @click="jumpPage">点击前往</div>
        </div> -->
        <div class="banner_top" v-if="isShow === 1">
            <img src="@/assets/images/laba.gif" />
            <div class="kuang">
                <p v-if="!isLength">{{ bannerTitle }}</p>
                <marquee v-if="isLength" scrollamount="10">{{
                    bannerTitle
                }}</marquee>
            </div>
        </div>
        <!-- noticeEnvironment  1:一级APP 2:江苏移动APP 3:H5页面 -->
        <div class="blackScreen" id="blackScreen" v-if="isShow === 3 && noticeIsShow">
          <!-- <div class="bg">
            <p class="title">{{ noticeTheme }}</p>
            <div id="idContent" class="content" v-html="bannerTitle"></div>
            <div class="close" @click="isShow = 0"></div>
            <div v-if="buttonShowFlag == '1'" class="button" @click="goUrl">{{ buttonName }}</div>
          </div> -->
          <div class="screenBg">
            <div class="navBg">
              <p class="title">{{ noticeTheme }}</p>
            </div>
            <div class="screenContent">
              <div id="idContent" class="content" v-html="bannerTitle" :style="{ maxHeight: screenHeight }"></div>
              <div class="close" @click="isShow = 0"></div>
              <div v-if="buttonShowFlag == '1'" class="button" @click="goUrl">{{ buttonName }}</div>
            </div>
          </div>
        </div>
        <!-- 缓存组件跳转的页面 -->
        <keep-alive>
            <router-view
                v-if="$route.meta.keepAlive && !activityOffline.isShow"
                v-wechat-title="$route.meta.title"
            ></router-view>
        </keep-alive>
        <!-- 非缓存组件跳转页面 -->
        <router-view
            v-if="!$route.meta.keepAlive && !activityOffline.isShow"
            v-wechat-title="$route.meta.title"
        ></router-view>

        <loading ref="loading"></loading>

        <div class="whiteScreen" v-if="isShow === 2">
            <div class="maskBox">
                <div class="kuang">
                    <p class="tips">温馨提示</p>
                    <div class="hr"></div>
                    <div class="contentBox">
                        <p class="content">{{ bannerTitle }}</p>
                    </div>
                    <div class="btn" @click="gohome">知道了</div>
                </div>
            </div>
        </div>

        <!-- 页面蒙层 -->
        <!-- <div
            v-if="isShowTankuang"
            class="mask"
            @touchmove.prevent
            :style="[{ 'z-index': zeroAuto.isShow ? -9999 : 9999 }]"
        > -->
        <div
            v-if="isShowTankuang"
            class="mask"
            @touchmove.prevent
            style="z-index: 9999;"
        >
            <div class="ImgOnmask">
                <div @click="goImgUrl">
                    <img class="Img" :src="frameImg" alt="" />
                </div>
                <div class="xBtn" @click="colseTanKuang"></div>
            </div>
        </div>
        <!-- 活动下线 -->
        <div class="activityOffline" v-if="activityOffline.isShow">
          <div class="activityOffline_icon">
            您访问的活动不在开展时间范围内
          </div>
        </div>
        <!-- 内测页面 -->
        <div class="activityOffline" v-if="testingPage.isShow">
          <div class="testing_icon"></div>
          <p class="testing_text">活动仅限部分内测用户参与</p>
          <div class="testing_btn" @click="goBack">返回</div>
        </div>
        <!-- 活动倒计时 -->
        <div class="financeActivity_wrap" v-if="financeActivityFlag">
          <span>{{financeActivityTime}}</span>
          <span>{{financeActivityTime == 0 ? '已完成任务' : '浏览计时'}}</span>
        </div>
    </div>
</template>

<script>
import * as store2 from '@/common/localstore';
import loading from '@/components/loading';
import agreement from '@/components/agreement';
import cmbagreement from '@/components/cmbagreement';
import pufaClientAccount from '@/components/pufaClientAccount';
import pufaEaccount from '@/components/pufaEaccount';
import pufaEbank from '@/components/pufaEbank';
import pufaFastPay from '@/components/pufaFastPay';
import pufaKhXuzhi from '@/components/pufaKhXuzhi';
import { initWx } from '@/common/isShare';
import api from '@/common/apiUrls';
import { getAppsystem } from '@/common/publicFunc.js';
import { mapState } from 'vuex';
import { init } from '@/common/trnasit.js';

export default {
    name: 'app',
    components: {
        loading,
        agreement,
        cmbagreement,
        pufaClientAccount,
        pufaEaccount,
        pufaEbank,
        pufaFastPay,
        pufaKhXuzhi
    },
    data() {
        return {
            screenHeight: 0,
            bodyHeight: 0,
            shortHeight: 0,
            noticeIsShow: false,
            noticeEnvironment: "",
            buttonJumpUrl: "",
            buttonShowFlag: "",
            buttonName: "",
            noticeTheme: '',
            isShow: 0,
            bannerTitle: '',
            noticePosition: '',
            noticeMessage: '',
            noticeId: '',
            noticeImg: '',
            noticeUrl: '',
            isLength: false,
            appId: null,
            timestamp: null,
            nonceStr: null,
            signature: null,
            isFirstShow: false,
            // firstShow:false,
            isShowTankuang: false,
            isafterGuide: false,
            // flag: store2.default.get('flag'),
            // 首页图片
            frameImg: '',
            // 图片指定链接
            frameUrl: '',
            thisiswalletindex: null,
            canOpen: true,
            routingGuard: true, // 指定路由不显示
            financeActivityFlag:false,//活动10秒倒计时是否显示
            financeActivityTime: 16, //活动10秒倒计时
            invinter: ""
        };
    },
    computed: {
        ...mapState(['zeroAuto', 'firstEnter', 'activityOffline', 'testingPage'])
    },
    created() {
        const app = getAppsystem();
        let url = window.location.href;
        if (window.location.href.indexOf('miniProgramCallback') > -1) {
            this.routingGuard = false;
        } else {
            this.routingGuard = true;
        }
        if (app === 'ios' && url.indexOf('shareToken=') > -1) {
            const urlList = url.split('?')[1].split('&');
            for (let i = 0; i < urlList.length; i += 1) {
                if (urlList[i].indexOf('shareToken=') > -1) {
                    urlList.splice(i, 1);
                    break;
                }
            }
            // eslint-disable-next-line no-const-assign
            url = `${url.split('?')[0]}?${urlList.join('&')}`;
            window.sessionStorage.setItem('refresh', true);
            window.location.assign(url);
        }
    },
    // activated(){
    // this.getIsShowKuang()
    // },
    mounted() {
      
      store2.default.set('locationHref', window.location.href);
      // 调用首次进入展示弹框
      // this.isFirstShow()
      this.afterGuide();
      setTimeout(() => {
            if (
                store2.default.get('isRequiresAuth')
                && store2.default.get('saveEnter')
            ) {
              let pathName = store2.default.get('toPath')
              if((this.$route.path == '*' || this.$route.path == '/' || this.$route.path == '/newFortune') && pathName.indexOf('newFortune') > -1) {
                this.getTankuang()
              } else if(this.$route.path !== '/login') {
                this.getIsShowKuang();
              }
            }
        }, 500);

        if (store2.default.get('toPath') === '/walletCardcente') {
            const timer = setInterval(() => {
                this.thisiswalletindex = store2.default.get('thisiswalletindex');
                if (this.thisiswalletindex) {
                    clearInterval(timer);
                }
            }, 1000);
          }

          

    },
    watch: {
        // $route: 'doc',
        thisiswalletindex: {
          handler(newValue, oldValue) {
            if (newValue) {
              this.afterGuide();
                }
            },
            // 深度监测
            deep: true
        },
        firstEnter: {
            handler(val) {
                console.log(val, 'val');
                setTimeout(() => {
                    if (val.isShow == '1' && window.localStorage.getItem('walletActSts') == '1') {
                    } else {
                        this.doc();
                    }
                }, 500);
            },
            // 深度监测
            deep: true
        },
        'activityOffline.isShow': {
            handler(val) {
                if (val) {
                    document.title = '温馨提示';
                }
            },
            deep: true
        },
        'testingPage.isShow': {
          handler(val) {
            if (val) {
              document.title = '温馨提示';
            }
            },
            deep: true
        },
        // $route: 'isSharingInterface',
        // 监听路由变化,获取路由参数financeActivity=1时，则展示倒计时
        '$route.query': {
            handler(val) {
              let oldAtyId = window.localStorage.getItem('atyId')
              let taskId = this.$route.query.taskId || this.$route.query.taskid
              //防止继续浏览，入参taskId与缓存id对比，不同才倒计时，缓存为空也倒计时
              if(this.$route.query.financeActivity === '1' && (oldAtyId != taskId || !oldAtyId)){
                this.financeActivityFlag = true
                this.startCountdown()
              }
              //如以完成浏览，页码刷新后，则显示已完成
              if(oldAtyId === taskId){
                this.financeActivityFlag = true
                this.financeActivityTime = 0
              }
            },
            deep: true
        }
    },
    methods: {
        goUrl() {
          if(this.buttonJumpUrl) {
            window.location.href = this.buttonJumpUrl
          } else {
            this.isShow = 0;
          }
        },
        goBack() {
          this.$router.go(-1)
        },
        startCountdown(){
          if(this.financeActivityTime > 0){
            this.financeActivityTime --
          }
          setTimeout(()=>{
            if(this.financeActivityTime > 0){
              this.startCountdown()
              if(this.financeActivityTime == 0){
                let params = {
                  atyId:this.$route.query.activityConfId,
                  taskId:this.$route.query.taskId || this.$route.query.taskid
                }
                api.financeSportsMeeting.atyTaskBrowsNotify(params).then(res => {
                  window.localStorage.setItem('atyId',this.$route.query.taskId || this.$route.query.taskid)
                })
              }
            }
          },1000)
        },
        closeApp() {
            this.canOpen = false;
        },
        jumpPage() {
            const url = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[0] : window.location.href;
            this.$router.push({
                name: 'jumpPage',
                query: {
                    pageUrl: url
                }
            });
        },
        isSharingInterface() {
            this.appId = null;
            this.timestamp = null;
            this.nonceStr = null;
            this.signature = null;
            api.sharingInterface({
                shareUrl: window.location.href
            })
                .then((data) => {
                    this.appId = data.appId;
                    this.timestamp = data.timestamp;
                    this.nonceStr = data.nonceStr;
                    this.signature = data.signature;
                    if (this.appId) {
                        initWx(
                            this.appId,
                            this.timestamp,
                            this.nonceStr,
                            this.signature,
                            "",
                            this.$route.meta.describe,
                            "",
                            ""
                        );
                    }
                    if (!this.$client.JSMCC && !this.$client.LEADEON) {
                        init(this.$route.meta.title);
                    }
                })
                .catch((err) => {
                });
        },
        getAesNumber() {
          api.EncryptInviter({})
          .then((data) => {
            this.invinter = data.encryptData;
            this.zeroPakeIsSharing()
          })
        },
        zeroPakeIsSharing(){
          let appId = null;
          let timestamp = null;
          let nonceStr = null;
          let signature = null;

          var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
          var str = "";
          var sum = new Date().getMonth() + 11
          for (let i = 0; i < sum; i++) {
            str += chars[Math.round(Math.random() * (chars.length - 1))];
          }

          let link = ""
          let title = "翻牌赢话费券！"
          let content = "您的好友邀您来翻牌，10元、5元、666MB流量…更多惊喜好礼等你拿！"
          let imgUrl = "https://fintech.12580life.com/fintech/image/wallet/shareBg.png"
          if (process.env.VUE_APP_ENV === "local" || process.env.VUE_APP_ENV === "sit") {
            link = `https://fintech.12580life.com/fintech-uat/fortuneCenter/member/rightsfree?inviter=${this.invinter}&inviteDate=${str}`
          } else {
            link = `https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?inviter=${this.invinter}&inviteDate=${str}`
          }

          api.sharingInterface({
            shareUrl: window.location.href
          })
            .then((data) => {
              appId = data.appId;
              timestamp = data.timestamp;
              nonceStr = data.nonceStr;
              signature = data.signature;

              if (appId) {
                initWx(
                  appId,
                  timestamp,
                  nonceStr,
                  signature,
                  link,
                  content,
                  title,
                  imgUrl
                );
              }
              if (!this.$client.JSMCC && !this.$client.LEADEON) {
                init(this.$route.meta.title);
              }
            })
            .catch((err) => {
              if (!this.$client.JSMCC && !this.$client.LEADEON) {
                init(this.$route.meta.title);
              }
            });
        },
        doc() {
            if (this.noticeId !== null) {
                // id不为空走逻辑
                // 弹框
                if (this.noticePosition === '首页弹窗') {
                    // 图片展示
                    this.frameImg = this.noticeImg;
                    // 图片链接
                    this.frameUrl = this.noticeUrl;
                    this.isShowTankuang = true; // 弹框展示
                } else if (!this.noticePosition) {
                    // 为空啥也不走
                    this.frameImg = '';
                    this.frameUrl = '';
                    this.isShowTankuang = false; // 弹框消失
                    return;
                }
                if (this.noticePosition === '顶部') {
                    this.bannerTitle = this.noticeMessage;
                    this.onLength();
                    this.isShow = 1;
                } else if (this.noticePosition === '全局') {
                    this.bannerTitle = this.noticeMessage;
                    this.isShow = 2;
                } else if (this.noticePosition === '公告提醒') {
                    this.bannerTitle = this.noticeMessage;
                    if(this.bannerTitle) {
                      this.bannerTitle = this.bannerTitle.replace(/font-size/g,'').replace(/font-family/g,'')
                    }
                    this.isShow = 3;
                    setTimeout(() => {
                      this.screenHeight = document.getElementById("blackScreen").offsetHeight * 0.62;
                      this.screenHeight = this.screenHeight + 'px'
                    })
                } else {
                    this.isShow = 0;
                }
            }
            if(this.$route.path == '/member/rightsfree') {
              // 0元包分享
              this.getAesNumber();
            }else if (this.$route.path !== '/login' && this.$route.path !== '/newFortune') {
              this.isSharingInterface();
            }
        },
        // 弹框地址
        goImgUrl() {
            // [公告主题信息]
            const noticeTheme = this.noticeTheme;
            const mobileNo = store2.default.get('usrmob');
            // 调用接口传公告主题字段和关闭按钮信息[两个参数]
            this.getClickStatistics({
                mobileno: mobileNo,
                businessType: '01',
                operType: 2,
                announceSubject: noticeTheme
            });
            window.location.href = this.frameUrl;
        },
        // 关闭弹框
        colseTanKuang() {
            // 弹框消失
            this.isShowTankuang = false;
            const noticeTheme = this.noticeTheme;
            const mobileNo = store2.default.get('usrmob');
            // 调用接口传公告主题字段和关闭按钮信息[两个参数]
            this.getClickStatistics({
                mobileno: mobileNo,
                businessType: '01',
                operType: 1,
                announceSubject: noticeTheme
            });
        },
        // 判断是否是首页路由
        isCenterRoute() {
            const url = window.location.href;
            if (url.indexOf('walletCardcenter') > -1) {
                return true;
            }
            return false;
        },
        afterGuide() {
            const CenterRoute = this.isCenterRoute();
            const thisiswalletindex = store2.default.get('thisiswalletindex');
            if (CenterRoute && thisiswalletindex) {
                // 是首页guide消失
                this.isafterGuide = true;
                return true;
            }
            if (!CenterRoute) {
                this.isafterGuide = true; // 不是首页
                return true;
            }
            this.isafterGuide = false;
            return false; // 是首页guide没有消失
        },
        onLength() {
            if (this.bannerTitle.length > 20) {
                this.isLength = true;
            } else {
                this.isLength = false;
            }
        },
        gohome() {
            const u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                // eslint-disable-next-line no-undef
                satisfaction.showTost('返回上一级');
            } else if (u.indexOf('iPhone') > -1 && this.$client.JSMCC) {
                this.setupWebViewJavascriptBridge((WebViewJavascriptBridge) => {
                    WebViewJavascriptBridge.callHandler(
                        'scGoBack',
                        (response) => {
                            console.log(response);
                        }
                    );
                });
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
            const WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(() => {
                document.documentElementNaNpxoveChild(WVJBIframe);
            }, 0);
            return null;
        },
        getIsShowKuang() {
            const tokenId = store2.default.get('loginSesion');
            api.maintenanceBulletin({
                tokenId,
                pageUrl: `https://fintech.12580life.com/fintech-h5/fortuneCenter${store2.default.get(
                    'toPath'
                )}`,
                mobileNo: store2.default.get('usrmob')
                // pageUrl:'www.baidu.com'
            })
                .then((data) => {
                    this.noticePosition = data.noticePosition;
                    this.noticeMessage = data.noticeMessage;
                    this.noticeId = data.id;
                    this.buttonName = data.buttonName || "我知道了";
                    this.buttonJumpUrl = data.buttonJumpUrl;
                    this.buttonShowFlag = data.buttonShowFlag;
                    //  noticeEnvironment  1:一级APP 2:江苏移动APP 3:H5页面
                    this.noticeEnvironment = data.noticeEnvironment || '0';
                    if(this.$client.LEADEON) {
                      if(this.noticeEnvironment.indexOf('1') > -1) {
                        this.noticeIsShow = true
                      }
                    } else if(this.$client.JSMCC) {
                      if(this.noticeEnvironment.indexOf('2') > -1) {
                        this.noticeIsShow = true
                      }
                    } else {
                      if(this.noticeEnvironment.indexOf('3') > -1) {
                        this.noticeIsShow = true
                      }
                    }

                    this.noticeImg = data.frameImg;
                    this.noticeUrl = data.frameUrl;
                    // 记录公告主题信息
                    this.noticeTheme = data.noticeTheme
                    this.doc();
                })
                .catch((err) => {
                    console.log(err);
                    store2.default.remove('saveEnter');
                });
        },
        getTankuang() {
            const tokenId = store2.default.get('loginSesion');
            let noticeEnvironment = "3"
            if(this.$client.JSMCC) {
              noticeEnvironment = '2'
            } else if(this.$client.LEADEON) {
              noticeEnvironment = '1'
            } else {
              noticeEnvironment = '3'
            }
            api.getFirstPageNotice({
                tokenId,
                pageUrl: `https://fintech.12580life.com/fintech-h5/fortuneCenter${store2.default.get(
                    'toPath'
                )}`,
                mobileNo: store2.default.get('usrmob'),
                pageEnvironment: noticeEnvironment
                // pageUrl:'www.baidu.com'
            })
                .then((data) => {
                    this.noticePosition = data.noticePosition;
                    this.noticeMessage = data.noticeMessage;
                    this.noticeId = data.id;
                    this.buttonName = data.buttonName || "我知道了";
                    this.buttonJumpUrl = data.buttonJumpUrl;
                    this.buttonShowFlag = data.buttonShowFlag;
                    //  noticeEnvironment  1:一级APP 2:江苏移动APP 3:H5页面
                    this.noticeEnvironment = data.noticeEnvironment || '0';
                    if(this.$client.JSMCC) {
                      if(this.noticeEnvironment.indexOf('2') > -1) {
                        this.noticeIsShow = true
                      }
                    } else if(this.$client.LEADEON) {
                      if(this.noticeEnvironment.indexOf('1') > -1) {
                        this.noticeIsShow = true
                      }
                    } else {
                      if(this.noticeEnvironment.indexOf('3') > -1) {
                        this.noticeIsShow = true
                      }
                    }

                    this.noticeImg = data.frameImg;
                    this.noticeUrl = data.frameUrl;
                    // 记录公告主题信息
                    this.noticeTheme = data.noticeTheme
                    this.doc();
                })
                .catch((err) => {
                    console.log(err);
                    store2.default.remove('saveEnter');
                });
        },

        // 首页弹框逻辑
        getClickStatistics(data) {
            api.clickStatistics(data)
                .then((res) => {})
                .catch((err) => {
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        }
    }
};
</script>
<style lang="less">
@import "./assets/common.less";
@import "./assets/rem.less";
.onpenInApp {
  height: 120px;
  line-height: 120px;
  display: flex;
  align-items: center;
  background: #ededed;
  font-size: 28px;
  .icon {
    padding: 0 20px;
  }
  img {
    width: 82px;
    height: 82px;
  }
  .text {
    height: 120px;
    margin-left: 20px;
    flex-grow: 1;
    position: relative;
    .title_1 {
      position: absolute;
      top: -20px;
      font-size: 34px;
      color: red;
      font-weight: 600;
    }
    .title_2 {
      position: absolute;
      top: 20px;
      font-size: 26px;
      color: #848484;
      white-space: nowrap;
    }
  }
  .openBtn {
    width: 190px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: red;
    color: #fff;
    border-radius: 5px;
    margin-right: 20px;
    border: 0;
    font-size: 34px;
  }
}
.whiteBackground {
    background: #ffffff;
}
.grayBackground {
    background: #f5f5f5;
}
.silvBackground {
    background: #f0f4fd;
}
button {
    border: 0;
    outline: none;
}
.md-button.plain.default:after {
    border: none;
}
a {
    text-decoration: none;
}
i {
    font-style: normal;
}
.md-field-item.is-solid .md-field-item-title {
    text-align: left;
    width: 170px;
}
.md-field-item-title,
.md-input-item-input,
.md-field-item-control {
    font-size: 0.3rem;
}
.nodata {
    position: relative;
    background: url(./assets/images/noData.png) no-repeat top center;
    background-size: 220px 275px;
    width: 400px;
    height: 275px;
    margin: 180px auto 0 auto;
    display: block;
    padding: 0 0 150px 0;
}
.nodata::before {
    position: absolute;
    content: "";
    left: 50%;
    transform: translateX(-50%);
    top: 315px;
    text-align: center;
    color: #888;
    white-space: nowrap;
    .px2px(font-size, 15px);
}
// Toast css hack
.md-toast-text {
    white-space: inherit;
    text-overflow: inherit;
    overflow: scroll;
    word-break: break-all;
}
// 带白色遮罩层底部按钮
.whiteBackgroundFixedButtonBox {
    background: #ffffff;
    padding: 32px 90px;
    border-top: 1px solid #e6e6e6;
    position: fixed;
    bottom: 0px;
    right: 0;
    left: 0;
}
// webm唇语全屏专用样式
.webmfullScreen {
    height: 100%;
    body {
        height: 100%;
    }
    #app {
        height: 100%;
        div::nth-of-type(2) {
            height: calc(100% - 96px);
            div {
                height: 100%;
            }
        }
    }
}
.xyPopUp {
    text-align: center;
    .px2px(font-size, 15px);
    a {
        display: block;
        background: #fff;
        height: 80px;
        line-height: 80px;
        color: #c99835;
    }
    .cancelButton {
        background: #ffffff;
        margin-top: 10px;
        color: text-base-color;
        height: 80px;
        line-height: 80px;
    }
}
.buttonBox {
    margin: 60px 30px 30px;
}
.banner_top {
    //position: fixed;
    position: -webkit-sticky;
    position: sticky; /*兼容*/
    display: flex;
    top: 0;
    width: 99.4%;
    height: 60px;
    background: white;
    border: 2px solid #3abaff;
    align-items: center;
    justify-content: space-around;
    z-index: 999;

    img {
        width: 36px;
        height: 36px;
        margin-left: 24px;
        margin-right: 16px;
    }

    .kuang {
        width: 90%;
        line-height: 42px;
        font-size: 30px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #fdba84;
        white-space: nowrap;
        overflow: hidden;

        p {
            display: inline-block;
            width: auto;
        }

        .lunbo {
            animation: 20s lunbo linear infinite normal;
        }
    }

    @keyframes lunbo {
        0% {
            transform: translateX(0px);
        }
        100% {
            transform: translateX(-200%);
        }
    }
}
.whiteScreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: white;
    .maskBox {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: rgba(5, 5, 5, 0.6);
        .kuang {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 5.8rem;
            height: 3.5rem;
            padding: 0.3rem;
            text-align: center;
            background: white;
            border-radius: 0.2rem;
        }
        .tips {
            text-align: center;
            font-size: 0.4rem;
        }
        .hr {
            width: 90%;
            height: 0.01rem;
            margin: 0.3rem auto;
            background-color: #dddddd;
        }
        .contentBox {
            display: flex;
            align-items: center;
            height: 1.5rem;
            overflow-y: scroll;
            .content {
                width: 100%;
                font-size: 0.32rem;
                margin-top: 0.4rem;
            }
        }
        .btn {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0.25rem;
            width: 80%;
            height: 0.8rem;
            margin: auto;
            color: white;
            font-size: 0.32rem;
            line-height: 0.8rem;
            border-radius: 0.1rem;
            background: rgb(1, 149, 255);
        }
    }
}
// 页面蒙层
.mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: hidden;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;

    .ImgOnmask {
        width: 5.48rem;
        height: 7.5rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%;-50%);
        .xBtn {
            width: 0.45rem;
            height: 0.45rem;
            position: absolute;
            top: 0.25rem;
            right: 0.25rem;
            // background: #110903;
        }
        .Img {
            width: 100%;
            height: 100%;
        }
    }
}
    .activityOffline{
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: #fff;
      z-index: 99999;
      .activityOffline_icon{
        width: 480px;
        height: 367px;
        background: url('./assets/images/activityOffline_icon.png') no-repeat;
        background-size:100%;
        margin: 200px auto;
        font-size: 30px;
        box-sizing: border-box;
        color: #666666;
        padding-top: 3.5rem;
        text-align: center;
      }
      .testing_icon {
        width: 313px;
        height: 284px;
        background: url('./assets/images/fortune_new/testing.png') no-repeat;
        background-size:100%;
        margin: 200px auto 0;
      }
      .testing_text {
        font-size: 32px;
        text-align: center;
        color: #606060;
        margin: 52px 0 80px;
      }
      .testing_btn {
        width: 214px;
        height: 70px;
        line-height: 70px;
        border-radius: 35px 35px 35px 35px;
        border: 2px solid #e88a23;
        font-size: 36px;
        text-align: center;
        color: #E88A23;
        letter-spacing: 7px;
        margin: 0 auto;
      }
    }
    .financeActivity_wrap{
      background: url('./assets/images/countdown_icon.png') no-repeat;
      background-size:100%;
      width: 123px;
      height: 137px;
      position: fixed;
      top: 400px;
      left: 0;
      color: #fff;
      font-size: 30px;
      text-align: center;
      padding-top: 55px;
      box-sizing: border-box;
      z-index: 999;
      span:nth-of-type(2){
        display: block;
        margin-top: 18px;
        font-size: 20px;
      }
    }
.blackScreen {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(2, 2, 2, 0.6);
  z-index: 999;
  .bg_nav {
    width: 587px;
    height: 204px;
    background: url('~@/assets/images/gonggao_nav.png') no-repeat;
    background-size: 100%;
  }
  .bg {
    position: relative;
    width: 587px;
    height: 744px;
    background: url('~@/assets/images/gonggao_bg.png') no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    padding: 100px 50px 0 50px;
  }
  .title {
    font-size: 34px;
    text-align: center;
    color: #001534 100%;
    letter-spacing: 3px;
    font-weight: 600;
    margin-bottom: 35px;
  }
  .content {
    color: #59636e;
    font-size: 26px;
    //height: 400px;
    //overflow: scroll;
    line-height: 1.8;
    word-break: break-word;
    //max-height: 800px;
    overflow: scroll;
  }
  .content_2 {
    position: absolute;
    z-index: -1;
    top: 50px;
    left: 50px;
    width: 488px;
    color: #59636e;
    font-size: 26px;
    overflow: scroll;
    line-height: 1.8;
    word-break: break-word;
    max-height: 600px;
  }
  .close {
    position: absolute;
    top: -50px;
    right: -20px;
    width: 44px;
    height: 44px;
    background: url('~@/assets/images/close_icon.png') no-repeat;
    background-size: 100%;
  }
  .button {
    width: 400px;
    height: 90px;
    line-height: 90px;
    border-radius: 50px;
    background: linear-gradient(to right, #1E5AFD, #00E0FD);
    color: #ffffff;
    text-align: center;
    letter-spacing: 3px;
    font-size: 35px;
    font-weight: 600;
    margin: 50px auto;
  }
  .screenBg {
    position: relative;
  }
  .navBg {
    width: 587px;
    height: 204px;
    background: url('~@/assets/images/gonggao_nav.png') no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    padding: 100px 50px 0 50px;
  }
  .screenContent {
    width: 587px;
    min-height: 100px;
    border-radius: 0 0 50px 50px;
    margin: -50px 0 0 0;
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 0 50px;
    overflow: auto;
  }
}
</style>
