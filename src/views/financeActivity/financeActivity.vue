<template>
<div class="warp">
    <div class="top">
      <div class="btnone" @click="bankJump('dxm')"></div>
      <div class="btntwo" @click="bankJump()"></div>
  </div>
    <div class="mid">
      <div class="box">
<!--          <div class="item">-->
<!--              <div class="get" id="C01"  @click="jumpTo('https://fintech.12580life.com/fintech-h5/fortuneCenter/openAccount/khEmpower')"></div>-->
<!--          </div>-->
          <div class="item two">
              <div class="get" id="C02"  @click="jumpTo('https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?dealCh=0yb01&typeId=0yb001&ch=012w')"></div>
          </div>
          <!-- <div class="item three">
              <div class="get" id="C03"  @click="linkBank"></div>
          </div> -->
          <div class="item five">
              <div class="get" id="C01"  @click="jumpTo('https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent')"></div>
          </div>
          <div class="item four">
              <div class="get" id="C04"  @click="jumpTo('https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicHome')"></div>
          </div>
      </div>
    </div>
    <div class="bottom">
        <div class="box">
            <div class="item">
                <div class="sone" @click="jumpTo('https://wap.js.10086.cn/nact/resource/2538/html/index.html')"></div>
            </div>
            <!-- <div class="item two">
                <div class="sone" @click="jumpTo('https://p.12580life.com/fintech-h5/financialmemb/toWechat?code=1001&from=wx_yyqg&sourceId=A012')"></div>
            </div> -->
            <div class="item three">
                <div class="sone" @click="jumpTo('https://fintech.12580life.com/fintech-h5/fortuneCenter/newPeople')"></div>
            </div>
        </div>
        <!-- <div class="boxs" v-if="NJNo">
            <div class="item">
                <div class="get" @click="jumpTo('https://fintech.12580life.com/fintech-h5/healthcare/zeroYuanBuy/index')"></div>
            </div>
        </div> -->
        <div class="share"  @click="sharePage" id="A01"></div>
    </div>
    <div class="shareModel" v-if="isShow">
        <img src="../../assets/images/financeActivity/shareTips.png" alt="">
        <div class="btn" @click="isShow = false">知道了</div>
    </div>
</div>

</template>

<script>

import { initPageJs } from '@/common/Page2435_1_fn.js';
import { getAppsystem, browser } from '@/common/publicFunc.js';
import api from '../../common/apiUrls';

export default {
    name: 'financeActivity',
    data() {
        return {
            cardListOne: [
                {
                    imgUrl: require('@/assets/images/financeActivity/item1_2.png'),
                    link: `https://fintech.12580life.com/fintech-h5/fortuneCenter/openAccount/khEmpower?sourceChannel=${this.$route.query.sourceChannel || ''}`,
                    id: 'C01'
                },
                {
                    imgUrl: require('@/assets/images/financeActivity/item2_3.png'),
                    link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?dealCh=0yb01&typeId=0yb001&ch=012w',
                    id: 'C02'
                },
                {
                    imgUrl: require('@/assets/images/financeActivity/item3_2.png'),
                    link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent',
                    id: 'C03'
                },
                {
                    imgUrl: require('@/assets/images/financeActivity/item4_3.png'),
                    link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicHome',
                    id: 'C04'
                }
            ],
            cardListTwo: [
                {
                    imgUrl: require('@/assets/images/financeActivity/item5.png'),
                    link: 'https://wap.js.10086.cn/nact/resource/2538/html/index.html',
                    id: 'D01'
                },
                {
                    imgUrl: require('@/assets/images/financeActivity/item6.png'),
                    link: 'https://wap.js.10086.cn/nact/resource/2482/html/index.html',
                    id: 'D02'
                }
            ],
            cardListSecond: [
                // {
                //     imgUrl: require('@/assets/images/financeActivity/carOwner.png'),
                //     link: 'https://fintech.12580life.com/fintech-h5/tripartite/automobileInsurance',
                //     id: ''
                // },
                {
                    imgUrl: require('@/assets/images/financeActivity/car.png'),
                    link: 'https://fintech.12580life.com/fintech-h5/healthcare/zeroYuanBuy/index',
                    id: 'E01'
                }
            ],
            isCanShare: true,
            typeId: 'financeActivity',
            isShow: false,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_A02'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_B02'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_C02'
                },
                {
                    id: 'C03',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_C03'
                },
                {
                    id: 'C04',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_C04'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_D02'
                },
                {
                    id: 'D03',
                    touchCode: 'WAP_T_FINANCEACTIVITY_01_D03'
                }
            ],
            dwTokenId: '',
            NJNo: false
        };
    },
    mounted() {
        if (this.$route.query.typeId) {
            this.typeId = this.$route.query.typeId;
        }
        if (this.$route.query.tokenid) {
            this.dwTokenId = this.$route.query.tokenid;
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);
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
        this.isNj();
    },
    methods: {
        // linkBank() {
        //     this.$router.push({
        //         name: 'newBanksPhoneBill'
        //     });
        // },
        bankJump(bank) {
            const lastData = this.dwTokenId ? `?tokenid=${this.dwTokenId}` : '';
            if (bank === 'dxm') {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/insurance/saveMoneyIndex';
            } else {
                // window.location.href = `https://fintech.12580life.com/fintech-h5/tripartite/puFaNuwNumber/activityPage${lastData}`;
                window.location.href = `https://fintech.12580life.com/fintech-h5/healthcare/transitionPage?pageId=230620134827029002&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
                // window.location.href = 'https://upay.12580life.com/upay/wps/service/tpfNewCuptoActPage.xhtml';
            }
        },
        jumpTo(link) {
            if (link.indexOf('khEmpower') > -1) {
                window.location.href = `${link + this.getUrlValue()}&sourceChannel=${this.$route.query.sourceChannel || ''}`;
            } else {
                // window.location.href = link;
                if (!browser.versions.JSMCC) {
                    if (link.indexOf('WalletToActPage') > -1) {
                        this.$router.push({
                            name: 'browserJump',
                            query: {
                                jumpUrl: link
                            }
                        });
                    } else {
                        const lastData = this.dwTokenId ? `?tokenid=${this.dwTokenId}` : '';
                        window.location.href = link + lastData;
                    }
                } else {
                    window.location.href = link;
                }
            }
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
                const title = '金融活动聚合页';
                if (app === 'ios') {
                    window.location.href = `ecmcwebshare://mobilePhoneMall??content=${content}#shareUrl=${window.location.href}#title=${title}`;
                } else if (app === 'android') {
                    window.clientObject.newShare(content, window.location.href, title, '');
                }
            }
        },
        // 地址参数
        getUrlValue() {
            if (window.location.href.indexOf('?') > -1) {
                const urlLast = window.location.href.split('?')[1];
                if (window.location.href.indexOf('typeId') > -1) {
                    return `?${urlLast}`;
                }
                return `?typeId=${this.typeId}&${urlLast}`;
            }
            return `?typeId=${this.typeId}`;
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
        },

        isNj() {
            api.getUserNo().then((res) => {
                console.log(res.cityNo);
                if (res.cityNo == '14') {
                    this.NJNo = true;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};
</script>

<style scoped lang="less">
.warp{
    width: 100%;
    min-height: 100vh;
    background:rgba(202,229,255,1) url("~@/assets/images/financeActivity/top_new4.png") no-repeat;
    background-size: 100% auto;
    .top{
        width: 100%;
        height: 719px;
        display: flex;
        flex-direction: column;
        .btnone{
            width: 186px;
            height: 47px;
            border-radius: 47px;
            margin-top: 327px;
            margin-left: 355px;
        }
        .btntwo{
            width: 186px;
            height: 47px;
            border-radius: 47px;
            margin-top:127px;
            margin-left: 355px;
        }
    }
    .mid{
        width: 100%;
        height: 828px;
        background: url("~@/assets/images/financeActivity/mid_bg.png") no-repeat  bottom;
        background-size: 100% auto;
        display: flex;
        justify-content: center;
        .box{
            width: 701px;
            height: 807px;
            background: url("~@/assets/images/financeActivity/new_one.png") no-repeat;
            background-size: 100% auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding-top: 94px;
            box-sizing: border-box;

            .item{
                width: 669px;
                height: 221px;
                background: url("~@/assets/images/financeActivity/newItem1.png") no-repeat;
                background-size: 100% auto;
                .get{
                    width: 118px;
                    height: 119px;
                    background: url("~@/assets/images/financeActivity/git.png") no-repeat;
                    background-size: 100% auto;
                    margin: 63px 0 0 531px ;
                }
            }
            .two{
                background: url("~@/assets/images/financeActivity/newItem2.png") no-repeat;
                background-size: 100% auto;
            }
            // .three{
            //     background: url("~@/assets/images/financeActivity/newItem3_1.png") no-repeat;
            //     background-size: 100% auto;
            // }
            .four{
                background: url("~@/assets/images/financeActivity/newItem4.png") no-repeat;
                background-size: 100% auto;
            }
            .five{
                background: url("~@/assets/images/financeActivity/onecent_2.png") no-repeat;
                background-size: 100% auto;
            }
        }
    }
    .bottom{
        width: 750px;
        height: 984px;
        background: rgba(202,229,255,1);
        display: flex;
        flex-direction: column;
        align-items: center;
        //justify-content: center;
        flex-wrap: wrap;
        padding-top: 11px;
        box-sizing: border-box;

        .box{
            width: 703px;
            height: 530px;
            background: url("~@/assets/images/financeActivity/new_two.png") no-repeat;
            background-size: 100% auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding-top: 101px;
            box-sizing: border-box;
            border-radius: 30px;
            .item{
                width: 669px;
                height: 189px;
                background: url("~@/assets/images/financeActivity/newItem5.png") no-repeat;
                background-size: 100% auto;
                .sone{
                    width: 125px ;
                    height: 57px;
                    background: url("~@/assets/images/financeActivity/sone.png") no-repeat;
                    background-size: 100% auto;
                    margin: 75px 0 0 529px;
                }
            }
            .two{
                background: url("~@/assets/images/financeActivity/newItem6.png") no-repeat;
                background-size: 100% auto;
            }
            .three{
                background: url("~@/assets/images/financeActivity/newItem7.png") no-repeat;
                background-size: 100% auto;
            }

        }
        .boxs{
            width: 703px;
            height: 343px;
            background: url("~@/assets/images/financeActivity/new_three.png") no-repeat;
            background-size: 100% auto;
            margin-top: 26px;
            display: flex;
            justify-content: center;
            padding-top: 100px;
            box-sizing: border-box;
            .item{
                width: 669px;
                height: 189px;
                background: url("~@/assets/images/financeActivity/newItem8.png") no-repeat;
                background-size: 100% auto;
                .get{
                    width: 125px ;
                    height: 57px;
                    background: url("~@/assets/images/financeActivity/sone.png") no-repeat;
                    background-size: 100% auto;
                    margin: 75px 0 0 529px;
                }
            }
        }
        .share{
            width: 583px;
            height: 133px;
            margin-top: 26px;
            background: url("~@/assets/images/financeActivity/new_share.png") no-repeat;
            background-size: 100% auto;
        }
    }
}
.shareModel{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.7);
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
</style>
