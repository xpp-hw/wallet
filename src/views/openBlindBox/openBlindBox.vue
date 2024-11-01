<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2022-09-23 09:30:39
 * @LastEditors: zhf 1914689669@.com
 * @LastEditTime: 2023-07-25 17:20:56
 * @FilePath: \wallet\src\views\openBlindBox\openBlindBox.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="box">

            <div class="share" @click="sharePage"></div>
            <div class="myPrize" @click="goPrize"></div>
            <div class="prize"></div>
            <div class="openBtn" @click="openBox"></div>
            <div class="rules">
                <div class="text">
                    <p>1、活动时间：即日起-2023年12月31日</p>
                    <p>2、活动内容：</p>
                    <p>(1)用户支付1元参与盲盒抽奖，单个用户（同一江苏移动手机号）每月可参与4次抽盲盒活动；</p>
                    <p>(2)开奖商品以页面显示为准，中奖用户请在我的奖品页面，查看或领取对应奖品，部分奖品存在过期。若有效期未使用，视为自动放弃。</p>
                    <p>3.由于网络异常、销户等原因导致抽奖失败的，将原路退款。若退款失败的，请联系移动客服，并提供参与活动的手机号码及参与活动截图。</p>
                    <p>4.奖品内容：</p>
                    <p>(1)1元话费：3个工作日内自动充值到被充值用户的手机号下。此话费不可转赠，不可兑换现金，赠送的话费不提供发票；</p>
                    <p>(2)3元话费：3个工作日内自动充值到被充值用户的手机号下。此话费不可转赠，不可兑换现金，赠送的话费不提供发票；</p>
                    <p>(3)5元话费：3个工作日内自动充值到被充值用户的手机号下。此话费不可转赠，不可兑换现金，赠送的话费不提供发票；</p>
                    <p>(4)888Mb流量：3个工作日内自动充值到被充值用户的手机号下，此流量不可转赠，不可兑换现金，赠送的话费不提供发票；</p>
                    <p>(5)1G流量：3个工作日内自动充值到被充值用户的手机号下，此流量不可转赠，不可兑换现金，赠送的话费不提供发票；</p>
                    <p>(6)3G流量：3个工作日内自动充值到被充值用户的手机号下，此流量不可转赠，不可兑换现金，赠送的话费不提供发票；</p>
                    <p>(7)灵犀保险（含5元话费）：仅针对全球通用户，每月仅可参与一次。用户获得灵犀保险后，需主动访问领取页面，领取对应的权益。活动侧不负责灵犀保险的发放。客户参与活动即视为理解并同意本活动细则。</p>
                </div>
            </div>

            <!-- 弹框 -->
            <div class="tankuang" v-if="tankuang">
                <!-- 5元充值券 -->
                <div class="tickets" v-if="fiveYuan">
                    <div class="fiveYuan">
                        <div class="goBtn" @click="goActivity()"></div>
                    </div>
                    <div class="close" @click="(tankuang = false),(fiveYuan = false)"></div>
                </div>
                <!-- 3元充值券 -->
                <div class="tickets" v-if="threeYuan">
                    <div class="threeYuan">
                        <div class="goBtn" @click="goActivity()"></div>
                    </div>
                    <div class="close" @click="(tankuang = false),(threeYuan = false)"></div>
                </div>
                <!-- 1元充值券 -->
                <div class="tickets" v-if="oneYuan">
                    <div class="oneYuan">
                        <div class="goBtn" @click="goActivity()"></div>
                    </div>
                    <div class="close" @click="(tankuang = false),(oneYuan = false)"></div>
                </div>
                <!-- 5GB流量券 -->
                <div class="tickets" v-if="fiveGB">
                    <div class="fiveGB">
                        <div class="goBtn" @click="goActivity()"></div>
                    </div>
                    <div class="close" @click="(tankuang = false),(fiveGB = false)"></div>
                </div>
                <!-- 1GB流量券 -->
                <div class="tickets" v-if="oneGB">
                    <div class="oneGB">
                        <div class="goBtn" @click="goActivity()"></div>
                    </div>
                    <div class="close" @click="(tankuang = false),(oneGB = false)"></div>
                </div>
                <!-- 888M流量券 -->
                <div class="tickets" v-if="eightMB">
                    <div class="eightMB">
                        <div class="goBtn" @click="goActivity()"></div>
                    </div>
                    <div class="close" @click="(tankuang = false),(eightMB = false)"></div>
                </div>
                <!-- 灵犀保险 -->
                <div class="tickets" v-if="lingxi">
                    <div class="lingxi">
                        <div class="goBtn" @click="goActivity('insurance')"></div>
                    </div>
                    <div class="close" @click="(tankuang = false),(lingxi = false)"></div>
                </div>
            </div>

            <div class="shareModel" v-if="isShow">
                <img src="~@/assets/images/openBlindBox/shareTips.png" alt="">
                <div class="btn" @click="isShow = false">知道了</div>
            </div>

            <!-- loading...... -->
            <div v-if="loading" class="loading-toast">
                <img alt="" src="@/assets/images/loading-toast.gif"/>
              </div>

        </div>
    </div>
</template>

<script>
import { initPageJs } from '@/common/Page2435_1_fn.js';
import { getAppsystem, browser } from '@/common/publicFunc.js';
import api from '@/common/apiUrls.js';
import * as store2 from '@/common/localstore';

export default {
    name: 'openBlindBox',
    data() {
        return {
            loading: false,
            timeOut: null,
            isShow: false,
            fiveYuan: false,
            threeYuan: false,
            oneYuan: false,
            oneGB: false,
            fiveGB: false,
            eightMB: false,
            lingxi: false,
            tankuang: false,
            reciveStatus: '',
            ordno: '',
            receiveSts: '',
            usrSts: '',
            timeNum: 0,
            timer: null
        };
    },
    mounted() {
        const u = navigator.userAgent;
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        const isIpad = u.indexOf('iPad') > -1; // 是否iPad
        const isIPhone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1; // 是否为iPhone或者QQHD浏览器
        const isJSMCC = u.toLowerCase().indexOf('jsmcc') > -1;
        if (isJSMCC && (isIOS || isIPhone || isIpad)) {
            // eslint-disable-next-line no-unused-vars
            const data = { iewcontrollertitle: '话费派对' };
            // eslint-disable-next-line no-shadow
            this.setupWebViewJavascriptBridge((data, WebViewJavascriptBridge) => {
                WebViewJavascriptBridge.callHandler('viewcontrollertitle');
            });
        }
        this.usrOnePayAccStsQuery();
        this.ordno = this.$route.query.ordno || '';
        store2.default.get('ordno');
        const abc = store2.default.get('ordno');
        console.log(this.ordno, '+++++++++++', abc);
        if (this.ordno === abc) {
            console.log(11111111);
        } else {
            store2.default.set('ordno', this.ordno);
            this.usrRightDetailsQuery(this.ordno);
            console.log(store2.default.set('ordno', this.ordno));
        }
        // 支付完成带有订单号
        // if(this.ordno && (this.ordno != store2.default.get('ordno'))) {
        //     this.usrRightDetailsQuery(this.ordno);
        // }
        console.log('---ordno---', this.ordno);
    },
    methods: {
        usrRightDetailsQuery(ordno) {
            this.timeNum += 1;
            /* 抽奖状态查询 */
            api.blindBox.usrRightDetailsQuery({
                sessionid: ordno
            })
                .then((res) => {
                    console.log(res);
                    // store2.default.set('receiveSts',res.receiveSts);
                    if (res.receiveSts == '01') {
                        if (this.timer) {
                            clearInterval(this.timer);
                        }
                        this.tankuang = true;
                        if (res.prizeName.indexOf('3元') > -1) {
                            this.threeYuan = true;
                        } else if (res.prizeName.indexOf('5元') > -1) {
                            this.fiveYuan = true;
                        } else if (res.prizeName.indexOf('1G') > -1) {
                            this.oneGB = true;
                        } else if (res.prizeName.indexOf('3G') > -1) {
                            this.fiveGB = true;
                        } else if (res.prizeName.indexOf('灵犀') > -1) {
                            this.lingxi = true;
                        } else if (res.prizeName.indexOf('1元') > -1) {
                            this.oneYuan = true;
                        } else if (res.prizeName.indexOf('888') > -1) {
                            this.eightMB = true;
                        }
                    } else if (res.receiveSts == '00') {
                        if (!this.timer) {
                            this.timer = setInterval(() => {
                                if (this.timeNum >= 4) {
                                    clearInterval(this.timer);
                                }
                                this.usrRightDetailsQuery(ordno);
                            }, 3000);
                        }
                    }
                })
                .catch((err) => {
                    console.log('', err);
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                });
        },
        usrOnePayAccStsQuery() {
            /* 查询活动状态 */
            api.blindBox.usrOnePayAccStsQuery()
                .then((res) => {
                    console.log('---', res);
                    this.usrSts = res.usrSts;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        openBox() {
            if (this.usrSts != '01') {
                if (this.usrSts == '00') {
                    this.$toast.info('无充值记录');
                }
                if (this.usrSts == '02') {
                    this.$toast.info('活动失效');
                }
                if (this.usrSts == '03') {
                    this.$toast.info('活动过期');
                }
                if (this.usrSts == '04') {
                    this.$toast.info('库存不足');
                }
                return;
            }
            this.loading = true;
            // 防抖
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }
            this.timeOut = setTimeout(() => {
                /* 下单 */
                api.blindBox.rightPayOrder({ rightCode: '10024',parentChannel: this.$route.query.parchn || "",
                childChannel: this.$route.query.gytype || ""  })
                    .then((res) => {
                        console.log(res);
                        this.loading = false;
                        // store2.default.remove('receiveSts')
                        window.location.href = res.payurl;
                    })
                    .catch((err) => {
                        this.loading = false;
                        this.$toast.info(err.msgInfo);
                        console.log(err);
                    });
            }, 1000);
        },
        goActivity(index) {
            if (index == 'insurance') {
                store2.default.set('loginSesion', null);
                window.location.href = `https://fintech.12580life.com/fintech-h5/activity/lingxiInsurance?parchn${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            } else {
                this.$router.push({
                    name: 'prizeList',
                    query: {
                        parchn: this.$route.query.parchn,
                        gytype: this.$route.query.gytype,
                    }
                });
            }
        },
        goPrize() {
            this.$router.push({
                name: 'prizeList',
                query: {
                    parchn: this.$route.query.parchn,
                    gytype: this.$route.query.gytype,
                }
            });
        },
        // 分享功能
        sharePage() {
            // this.isShow = true;
            const u = navigator.userAgent;
            const app = getAppsystem();
            // 判断是否是微信环境
            if (navigator.userAgent.indexOf('MicroMessenger') > -1) { // 微信内
                this.isShow = true;
            } else if (u.toLowerCase().indexOf('jsmcc') > -1) { // 掌厅内
                const content = '我在掌厅发现一个内容很不错，就想分享给你看看。';
                const title = '1元拆盲盒';
                if (app === 'ios') {
                    window.location.href = `ecmcwebshare://mobilePhoneMall??content=${content}#shareUrl=${window.location.href}#title=${title}`;
                } else if (app === 'android') {
                    window.clientObject.newShare(content, window.location.href, title, '');
                }
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
            console.log(window.WVJBCallbacks);
            const WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(() => {
                document.documentElementNaNpxoveChild(WVJBIframe);
            }, 0);
            return true;
        }
    }
};
</script>

<style scoped lang="less">
    .box {
        position: relative;
        width: 750px;
        height: 1840px;
        background: url('~@/assets/images/openBlindBox/bg.png') no-repeat;
        background-size: 100% 100%;
        .share{
            position: absolute;
            top: 20px;
            right: 0;
            width: 35px;
            height: 70px;
            background: url('~@/assets/images/openBlindBox/share.png') no-repeat;
            background-size: 100% 100%;
            z-index: 999;
        }
        .myPrize {
            position: absolute;
            top: 100px;
            right: 0;
            width: 35px;
            height: 120px;
            background: url('~@/assets/images/openBlindBox/myPrize.png') no-repeat;
            background-size: 100% 100%;
            z-index: 999;
        }
        .prize {
            position: absolute;
            top: -120px;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('~@/assets/images/openBlindBox/prize.gif') no-repeat;
            background-size: 100% 100%;
        }
        .openBtn {
            position: absolute;
            top: 1250px;
            left: 50%;
            transform: translateX(-50%);
            width: 474px;
            height: 134px;
            background: url('~@/assets/images/openBlindBox/openBtn.png') no-repeat;
            background-size: 100% 100%;
            z-index: 999;
        }
        .rules {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 696px;
            height: 390px;
            background: url('~@/assets/images/openBlindBox/rules.png') no-repeat;
            background-size: 100% 100%;
            .text {
                width: 600px;
                height: 265px;
                margin: 0 auto;
                margin-top: 95px;
                font-size: 24px;
                line-height: 36px;
                color: #1F2242;
                font-weight: 500;
                overflow-y: scroll;
            }
        }

        .tankuang {
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 100%;
            background: rgba(2, 2, 2, 0.7);
            z-index: 999;
            .tickets {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                .fiveYuan {
                    position: relative;
                    width: 696px;
                    height: 692px;
                    background: url('~@/assets/images/openBlindBox/5yuan.png') no-repeat;
                    background-size: 100% 100%;
                }
                .threeYuan {
                    position: relative;
                    width: 696px;
                    height: 692px;
                    background: url('~@/assets/images/openBlindBox/3yuan.png') no-repeat;
                    background-size: 100% 100%;
                }
                .oneYuan {
                    position: relative;
                    width: 696px;
                    height: 692px;
                    background: url('~@/assets/images/openBlindBox/1Yuan.png') no-repeat;
                    background-size: 100% 100%;
                }
                .fiveGB {
                    position: relative;
                    width: 696px;
                    height: 692px;
                    background: url('~@/assets/images/openBlindBox/3GB.png') no-repeat;
                    background-size: 100% 100%;
                }
                .oneGB {
                    position: relative;
                    width: 696px;
                    height: 692px;
                    background: url('~@/assets/images/openBlindBox/1GB.png') no-repeat;
                    background-size: 100% 100%;
                }
                .eightMB {
                    position: relative;
                    width: 696px;
                    height: 692px;
                    background: url('~@/assets/images/openBlindBox/eightMB.png') no-repeat;
                    background-size: 100% 100%;
                }
                .lingxi {
                    position: relative;
                    width: 696px;
                    height: 692px;
                    background: url('~@/assets/images/openBlindBox/lingxi.png') no-repeat;
                    background-size: 100%;
                }
                .goBtn {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 430px;
                    height: 110px;
                }
            }
            .close {
                width: 88px;
                height: 88px;
                margin-top: 3px;
                background: url('~@/assets/images/openBlindBox/close.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    .shareModel{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 9999;
        background: rgba(2, 2, 2, 0.7);
        img{
          width: 5.37rem;
          height: 2.77rem;
          margin-left: 1.53rem;
          margin-top: 0.1rem;
        }
        .btn{
          width: 1.5rem;
          line-height: 0.6rem;
          border: 0.01rem solid #fff;
          color: #fff;
          border-radius: 0.1rem;
          margin: auto;
          text-align: center;
          font-size: 0.28rem;
        }
    }
    .loading-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 999;
        border: 999px solid transparent;

        img {
            width: 1.2rem;
        }
    }
</style>
