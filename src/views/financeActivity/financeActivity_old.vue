<template>
    <div>
        <div class="activity">
            <!-- <div class="top onlyTwo">
              <div class="btn"  @click="bankJump('pf')" id="B02"></div>
              <div class="tips">
                <img src="../../assets/images/financeActivity/oneHead.gif" alt="">
              </div>
            </div> -->
            <div class="top">
                <!-- <div class="btn"></div>
                <div class="btn"></div> -->
                <!-- <div class="btn_one" @click="bankJump('dxm')" id="B01"></div>
                <div class="btn_two" @click="bankJump('htzq')" id="B02"></div> -->
                <div class="tips">
                    <img src="../../assets/images/financeActivity/oneHead.gif" alt="">
                </div>
                <div class="btnclick"  @click="bankJump('dxm')" id="B01"></div>
                <!-- <div class="btnclick lastBtnclick"  @click="bankJump('nj')" id="B02"></div> -->
            </div>
            <div class="bottom">
                <div class="cont">
                    <div class="card">
                        <div class="list" v-for="(item, idx) in cardListOne" :key="idx" :id="item.id" @click="jumpTo(item.link)">
                            <img :src="item.imgUrl" alt="">
                        </div>
                    </div>
                    <div class="card">
                        <div class="list" v-for="(item, idx) in cardListTwo" :key="idx"  :id="item.id" @click="jumpTo(item.link)">
                            <img :src="item.imgUrl" alt="">
                        </div>
                    </div>
                    <div class="card">
                        <div class="list" v-for="(item, idx) in cardListSecond" :key="idx"  :id="item.id" @click="jumpTo(item.link)">
                            <img :src="item.imgUrl" alt="">
                        </div>
                    </div>
                    <div class="btn" @click="sharePage" id="A02">
                        <img src="../../assets/images/financeActivity/bottom_btn.png" alt="">
                    </div>
                </div>
            </div>
            <div class="share" @click="sharePage" id="A01"></div>
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

export default {
    name: 'financeActivity',
    data() {
        return {
            cardListOne: [
                {
                    imgUrl: require('@/assets/images/financeActivity/item1_2.png'),
                    link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/openAccount/khEmpower?sourceChannel='+(this.$route.query.sourceChannel||''),
                    id: 'C01'
                },
                {   imgUrl: require('@/assets/images/financeActivity/item2_3.png'),
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
            dwTokenId: ''
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
    },
    methods: {
        bankJump(bank) {
            const lastData = this.dwTokenId ? `?tokenid=${this.dwTokenId}` : '';
            if (bank === 'dxm') {
                // window.location.href = `https://mbank5h5.jsbchina.cn/mbank/page/indexJsb.html#page/01/0108/01/P010801.html${lastData}`;
                window.location.href = 'https://poc.51pinzhi.cn/jsm_loan/activity_entry';
            } else {
                // window.location.href = `https://fintech.12580life.com/fintech-h5/tripartite/puFaNuwNumber/activityPage${lastData}`;
                window.location.href = 'https://fintech.12580life.com/fintech-h5/healthcare/transitionPage?pageId=220826151720018002&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
                // window.location.href = 'https://upay.12580life.com/upay/wps/service/tpfNewCuptoActPage.xhtml';
            }
        },
        jumpTo(link) {
            if (link.indexOf('khEmpower') > -1) {
                window.location.href = link + this.getUrlValue();
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
        }
    }
};
</script>

<style scoped lang="less">
.activity{
    position: relative;
    .top{
        width: 100%;
        height: 12.28rem;
        background: url('../../assets/images/financeActivity/top_bg333.png') no-repeat;
        background-size: cover;
        .btn{
            width: 2.06rem;
            height: 0.54rem;
            background: url('../../assets/images/financeActivity/yuan_btn.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 6.34rem;
            left: 1.21rem;
            // z-index: 99;
        }
        .btn_one {
            width: 2.06rem;
            height: 0.54rem;
            position: absolute;
            top: 6.34rem;
            left: 1.21rem;
            z-index: 999;
        }
        .btn_two {
            width: 2.06rem;
            height: 0.54rem;
            position: absolute;
            top: 6.34rem;
            left: 4.18rem;
            z-index: 999;
        }
        .btn:nth-of-type(2){
            left: 4.18rem;
        }
        .btnclick{
            width: 2.06rem;
            height: 0.54rem;
            position: absolute;
            top: 6.3rem;
            left: 2.7rem;
            z-index: 9999;
        }
        .lastBtnclick{
            left: 4.18rem;
        }
        .tips{
            width: 100%;
            width: 30%;
            position: absolute;
            top: 6.4rem;
            left: 55%;
            img{
                width: 100%;
            }
        }
    }
    .onlyTwo{
        background: url('../../assets/images/financeActivity/dxm_bg.png') no-repeat;
        background-size: cover;
        .btn{
            left: 50%;
            transform: translateX(-50%);
        }
        .tips{
            width: 2.5rem;
            top: 6.4rem;
            left: 4.5rem;
            img{
                width: 2.5rem;
                height: 2.5rem;
            }
        }
    }
    .bottom{
        width: 100%;
        height: 20.8rem;
        // background-image: linear-gradient(#F91E41, #FFC8AA);
        background: url('../../assets/images/financeActivity/all_bg.png') no-repeat;
        background-size: cover;
    }
    .cont{
        position: absolute;
        top: 8.9rem;
        .card{
            background: url('../../assets/images/financeActivity/card_one.png') no-repeat;
            background-size: 100% 100%;
            margin: 0 0.25rem;;
            padding: 1.15rem 0.45rem 0.55rem;
            .list{
                width: 6.1rem;
                height: 2.09rem;
                margin-bottom: 0.2rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .list:last-of-type{
                margin-bottom: 0;
            }
        }
        .card:nth-of-type(2){
            background: url('../../assets/images/financeActivity/card_two.png') no-repeat;
            background-size: 100% 100%;
            padding-top: 1.1rem;
            margin-top: 0.4rem;
        }
        .card:nth-of-type(3){
            background: url('../../assets/images/financeActivity/second_bg.png') no-repeat;
            background-size: 100% 100%;
            padding-top: 1.1rem;
            margin-top: 0.4rem;
        }
        .btn{
            width: 4.4rem;
            height: 1.36rem;
            margin: 0.53rem auto 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .share{
        width: 1.01rem;
        height: 0.56rem;
        background: url('../../assets//images/financeActivity/share.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 2.45rem;
        right: 0;
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
