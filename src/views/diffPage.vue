<template>
    <div class="container-bg">
        <div class="container-main">
            <div class="top-wrap"></div>
            <!-- 异网用户手机号 -->
            <div class="yw-iphone">
                {{ ywIphone }}
                <span class="welconme-info">江苏移动欢迎您</span>
            </div>
            <!-- 南京银行 -->
            <div class="njyh-wrap" id="A01" @click="goNjyh"></div>
            <!-- 我要借钱 -->
            <div class="jq-wrap">
                <ul>
                    <li class="bank-item">
                        <div class="item-btn" id="B01" @click="goBankJsyh">
                            立即申请
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="item-btn" id="B02" @click="goBankNbyh">
                            立即申请
                        </div>
                    </li>
                    <li class="bank-item">
                        <div class="item-btn" id="B03" @click="goBankHbzf">
                            立即申请
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 我要办卡 -->
            <div class="banka-wrap">
                <ul>
                    <li class="banka-item">
                        <div class="item-btn" id="C01" @click="goNjyhXyk">
                            立即申请
                        </div>
                    </li>
                    <!-- <li class="banka-item">
                        <div class="item-btn" id="C02" @click="goNjyhXyk">
                            立即申请
                        </div>
                    </li>
                    <li class="banka-item">
                        <div class="item-btn" id="C03" @click="goNjyhXyk">
                            立即申请
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import * as store2 from "@/common/localstore";
import { initPageJs } from "@/common/Page2435_1_fn.js";

export default {
    name: "ywPage",

    data() {
        return {
            ywIphone: "",
            // ywShow: false
            touchArr: [
                {
                    id: "A01",
                    touchCode: "WAP_T_DIFFPAGE_01_A01",
                },
                {
                    id: "B01",
                    touchCode: "WAP_T_DIFFPAGE_01_B01",
                },
                {
                    id: "B02",
                    touchCode: "WAP_T_DIFFPAGE_01_B02",
                },
                {
                    id: "B03",
                    touchCode: "WAP_T_DIFFPAGE_01_B03",
                },
                {
                    id: "B04",
                    touchCode: "WAP_T_DIFFPAGE_01_B04",
                },
                {
                    id: "B05",
                    touchCode: "WAP_T_DIFFPAGE_01_B05",
                },
                {
                    id: "B06",
                    touchCode: "WAP_T_DIFFPAGE_01_B06",
                },
                {
                    id: "B07",
                    touchCode: "WAP_T_DIFFPAGE_01_B07",
                },
                {
                    id: "B08",
                    touchCode: "WAP_T_DIFFPAGE_01_B08",
                },
                {
                    id: "B09",
                    touchCode: "WAP_T_DIFFPAGE_01_B09",
                },
                {
                    id: "B10",
                    touchCode: "WAP_T_DIFFPAGE_01_B10",
                },
                {
                    id: "C01",
                    touchCode: "WAP_T_DIFFPAGE_01_C01",
                },
                {
                    id: "C02",
                    touchCode: "WAP_T_DIFFPAGE_01_C02",
                },
                {
                    id: "C03",
                    touchCode: "WAP_T_DIFFPAGE_01_C03",
                },
                {
                    id: "C04",
                    touchCode: "WAP_T_DIFFPAGE_01_C04",
                },
                {
                    id: "C05",
                    touchCode: "WAP_T_DIFFPAGE_01_C05",
                },
                {
                    id: "C06",
                    touchCode: "WAP_T_DIFFPAGE_01_C06",
                },
                {
                    id: "C07",
                    touchCode: "WAP_T_DIFFPAGE_01_C07",
                },
                {
                    id: "C08",
                    touchCode: "WAP_T_DIFFPAGE_01_C08",
                },
                {
                    id: "C09",
                    touchCode: "WAP_T_DIFFPAGE_01_C09",
                },
                {
                    id: "C10",
                    touchCode: "WAP_T_DIFFPAGE_01_C10",
                },
            ],
        };
    },
    mounted() {
        if (this.$route.query.loansMobile) {
            console.log("路由上的号码---", this.$route.query.loansMobile);
            this.ywIphone = this.$route.query.loansMobile;
        } else if (
            store2.default.get("yWMobile") !== null &&
            store2.default.get("yWMobile") !== undefined &&
            store2.default.get("yWMobile") !== ""
        ) {
            this.ywIphone = store2.default.get("yWMobile");
        }
        // if(this.$client.JSMCC){
        //   this.ywShow = true

        // }else{
        //   this.ywShow = false
        // }
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        goNjyh() {
            // window.location.href = "http://183.207.110.250:8011/test/fintech-h5/loans/transitionPage?tokenId=2022012114181641348"
            window.location.href =
                'https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2022012114181641348&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
        },
        goBankJsyh() {
            // window.location.href = "http://183.207.110.250:8011/test/fintech-h5/loans/transitionPage?tokenId=2022052714045069610"
            window.location.href =
                'https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2022052714045069610&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
        },
        goBankNbyh() {
            // window.location.href = "http://183.207.110.250:8011/test/fintech-h5/loans/transitionPage?tokenId=2021112517571176105"
            window.location.href =
                'https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2021112517571176105&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
        },
        goBankHbzf() {
            // window.location.href = "http://183.207.110.250:8011/test/fintech-h5/loans/transitionPage?tokenId=2022052719300057494"
            window.location.href =
                'https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2022052719300057494&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
        },
        goNjyhXyk() {
            window.location.href =
                "https://upay.12580life.com/upay/wps/service/NewCupToBannerPage.xhtml?PAG_TYP=1";
        },
    },
};
</script>

<style lang="less">
.container-bg {
    width: 100%;
    height: 100%;
    font-family: PingFang-SC, -apple-system-font, Helvetica Neue, sans-serif;
}
.container-main {
    background: url("../assets/images/ywBg.jpg") no-repeat;
    background-size: 100% 100%;
    height: 1669px;
    .top-wrap {
        position: relative;
        height: 614px;
    }
    .yw-iphone {
        font-size: 34px;
        color: #1d1e20;
        position: absolute;
        left: 130px;
        top: 60px;
    }
    .welconme-info {
        font-size: 18px;
        margin-left: 40px;
        border: 1px solid #1d1e20;
        padding: 5px 10px;
        text-align: center;
        border-radius: 20px 20px 20px 20px;
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
    }
    .njyh-wrap {
        width: 540px;
        height: 88px;
        position: absolute;
        top: 475px;
        left: 110px;
    }
    .jq-wrap {
        height: 576px;
        padding-top: 96px;

        .bank-item {
            height: 190px;
            position: relative;
            .item-btn {
                width: 190px;
                height: 51px;
                background-image: linear-gradient(
                    90deg,
                    #758efb 0%,
                    #4a74f8 100%
                );
                border-radius: 44px;
                border-radius: 25px;
                color: #fff;
                position: absolute;
                right: 50px;
                top: 60px;
                line-height: 51px;
                text-align: center;
            }
        }
    }
    .banka-wrap {
        padding-top: 92px;
        .banka-item {
            height: 205px;
            margin-bottom: 20px;
            position: relative;
            .item-btn {
                width: 152px;
                height: 40px;
                background-image: linear-gradient(
                    90deg,
                    #758efb 0%,
                    #4a74f8 100%
                );
                border-radius: 35px;
                border-radius: 20px;
                color: #fff;
                position: absolute;
                right: 100px;
                top: 110px;
                line-height: 40px;
                text-align: center;
            }
        }
    }
}
.yw-main {
    padding-top: 264px;
    text-align: center;

    .dw-img {
        width: 530px;
        height: 482px;
    }
    .dw-wrap {
        width: 306px;
        height: 89px;
        border: 2px solid #979797;
        border-radius: 50px;
        font-weight: Bold;
        font-size: 34px;
        color: #333333;
        margin: 50px auto 30px;
        line-height: 89px;
    }
    .dw-info {
        font-weight: Bold;
        font-size: 30px;
        color: #333333;
        line-height: 60px;
    }
}
</style>
