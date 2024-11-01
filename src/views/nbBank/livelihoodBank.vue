<template>
    <div class="warp">
        <div class="banner">
            <div class="top" id="A01" @click="openPop('ruler')"></div>
            <div class="bottom" @click="openPop('prize')" id="C01"></div>
        </div>
        <div class="main">
            <div class="newCard">
                <div class="left">
                    <img
                        src="@/assets/images/nbBank/livelihoodBank/newCard.png"
                        alt=""
                    />
                </div>
                <div class="right">
                    <h3>新卡招募礼</h3>
                    <p>
                        新户核卡60日内，首刷任意金额，<b style="color: red"
                            >送100元话费</b
                        >。仅限活动期间本页面申卡新户。
                    </p>
                    <div
                        class="btn"
                        :class="{ already: newCard == 2 }"
                        @click="getReceive('2', 'newCard')"
                        :id="newCard ? 'E01' : ''"
                    ></div>
                </div>

                <div class="bottom">
                    <p>
                        ·达标后需在页面主动领取话费，30天内领取有效，过期失效后无法再次领取。
                    </p>
                    <p>·办卡预留手机号须为江苏移动手机号码方可领取相关权益。</p>
                </div>
            </div>
            <div class="newCard month">
                <div class="left">
                    <img
                        src="@/assets/images/nbBank/livelihoodBank/20yuan.png"
                        alt=""
                    />
                </div>
                <div class="right">
                    <h3>月月刷卡礼</h3>
                    <p style="white-space: nowrap">
                        新户核卡次月起任意刷卡1笔满99元，<span>送20元话费</span>。
                    </p>
                    <p>
                        限活动期间本页面申卡新户，每月限领一次，活动期间最多领取三次，活动截止日期为6月30日。
                    </p>
                    <div
                        class="btn"
                        @click="getReceive('3', 'monthBuy')"
                        :class="{ already: monthBuy == 2 }"
                        :id="monthBuy ? 'E02' : ''"
                    ></div>
                </div>

                <div class="bottom">
                    <p>
                        ·达标客户需次月在页面主动领取，30天内领取有效，过期失效后无法再次领取。
                    </p>
                    <p>·办卡预留手机号须为江苏移动手机号码方可领取相关权益。</p>
                </div>
            </div>
            <div class="item">
                <img
                    src="@/assets/images/nbBank/livelihoodBank/gif.png"
                    alt=""
                />
                <div class="text newSty">
                    <h3>优惠礼</h3>
                    <p>全国万家特惠美食商户，满减优惠低至5折。</p>
                </div>
            </div>
            <div class="item itemtwo">
                <img
                    src="@/assets/images/nbBank/livelihoodBank/gif2.png"
                    alt=""
                />
                <div class="text newSty">
                    <h3>年费优惠</h3>
                    <p>新户首年免年费，刷卡达标免次年年费。</p>
                </div>
            </div>
            <div class="item itemthree">
                <img
                    src="@/assets/images/nbBank/livelihoodBank/gif3.png"
                    alt=""
                />
                <div class="text">
                    <h3>出行礼</h3>
                    <p>24小时免费道路救援;</p>
                    <p>享机场停车、贵宾厅、豪华酒店服务等。</p>
                </div>
            </div>
            <div class="fotter">
                <!-- <p style="margin-bottom: 0.1rem">
                    *我同意民生银行将我的手机号码提供给江苏移动用于发放话费奖品。
                </p> -->
                <p>
                    *以上活动详情详见活动规则，产品功能或权益活动可能因限时或限量等情况调整。详情及对应更新请以民生银行信用卡中心官方网站为准。
                </p>
            </div>
        </div>
        <!-- <div class="float" v-if="newCard == 0">
            <div @click="getCard" id="B01">
                <img
                    src="@/assets/images/nbBank/livelihoodBank/get_2.png"
                    alt=""
                />
            </div>
            <p>我同意民生银行将我的手机号码提供给江苏移动用于发放话费奖品。</p>
        </div> -->
        <pop
            :type="type"
            :list="list"
            v-if="popShow"
            @closePop="closePop"
        ></pop>
        <div class="suctost" v-if="sucTost">
            <img src="@/assets/images/nbBank/livelihoodBank/suc.png" alt="" />
            <p>领取成功</p>
        </div>
        <div class="loading" v-if="loading">
            <img alt="" src="@/assets/images/loading.gif" />
        </div>
    </div>
</template>

<script>
import pop from '@/views/nbBank/pop.vue';
import * as store2 from '@/common/localstore';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import { Toast } from 'mand-mobile';
import api from '@/common/apiUrls';

export default {
    name: 'livelihoodBank',
    components: {
        pop,
        Toast
    },
    data() {
        return {
            loading: false,
            popShow: false,
            sucTost: false,
            type: '',
            list: [{
                ordTye: '03', ordAmt: 9, ordDate: 10, sts: 2
            }],
            channel: '',
            lock: false,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_A02'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_B01'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_C02'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_D02'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_E01'
                },
                {
                    id: 'E02',
                    touchCode: 'WAP_T_LIVELIHOODBANK_01_E02'
                }
            ],
            newCard: '',
            monthBuy: '',
            usrmobile: '',
            notMonth: '',
            floatShow: true
        };
    },
    created() {
        this.usrmobile = store2.default.get('usrmob');
        this.channel = this.$route.query.channel || '009bOn';
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.getPrizeInfo();
        this.getCreditCardActInfo();
    },
    methods: {
        // 关闭弹窗
        closePop() {
            this.popShow = false;
            this.BodyScroll(this.popShow);
        },
        // 打开弹窗
        openPop(type) {
            this.type = type;
            this.popShow = true;
            this.BodyScroll(this.popShow);
        },
        // 阻止蒙层下滚动
        BodyScroll(popShow) {
            if (!popShow) {
                // 不显示
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
            } else {
                // 显示
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            }
        },
        // 领取错误
        get(atyType) {
            switch (atyType) {
                case '2':
                    Toast.info('未达标 当前无法领取');
                    this.lock = false;
                    break;
                case '3':
                    if (this.notMonth == null) {
                        Toast.info('未达标 当前无法领取');
                    } else {
                        Toast.info(`${this.notMonth}未达标 当前无法领取`);
                    }

                    this.lock = false;
                    break;
            }
        },
        // 申请信用卡
        getCard() {
            const url = `https://s.creditcard.cmbc.com.cn/${this.channel}`;
            // switch (this.channel) {
            //     case "ZY-CLJS1":
            //         url = "https://s.creditcard.cmbc.com.cn/009bOn";
            //         break;
            //     case "ZY-CLJS2":
            //         url = "https://s.creditcard.cmbc.com.cn/009bOp";
            //         break;
            //     case "ZY-CLJS3":
            //         url = "https://s.creditcard.cmbc.com.cn/009bOt";
            //         break;
            //     default:
            //         url = "https://s.creditcard.cmbc.com.cn/009bOn";
            // }
            console.log(url);
            window.location.href = url;
        },
        // 达标情况
        getCreditCardActInfo() {
            api.getCreditCardActInfo({
                mobNo: this.usrmobile,
                orgCode: 'CMBC'
            })
                .then((res) => {
                    console.log('****', res.monthFlag);
                    // if (res.monthFlag != 0) {
                    //     this.monthBuy = false;
                    // }
                    // if (res.firstBrushFlag == 1) {
                    //     this.floatShow = false;
                    // } else if (res.firstBrushFlag == 2) {
                    //     this.floatShow = false;
                    //     this.newCard = false;
                    // }
                    this.monthBuy = res.monthFlag;
                    this.newCard = res.firstBrushFlag;
                    this.notMonth = res.notMonth;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 活动领取记录查询
        getPrizeInfo() {
            api.Bank.getPrizeInfo({
                userMobile: this.usrmobile,
                orgCode: 'CMBC'
            })
                .then((res) => {
                    console.log(res.prizeTjnInfo);
                    this.list = res.prizeTjnInfo.filter(item => item.sts != 0);
                    console.log(77777777, this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 权益领取发放接口
        getReceive(atyType, state) {
            if (this[state] == 2) return;
            this.loading = true;
            api.getCreditCardActInfo({
                mobNo: this.usrmobile,
                orgCode: 'CMBC'
            })
                .then((res) => {
                    console.log('****', res.monthFlag);
                    this.monthBuy = res.monthFlag;
                    this.newCard = res.firstBrushFlag;
                    this.notMonth = res.notMonth;
                    if (this[state] == 0) {
                        this.loading = false;
                        this.get(atyType);
                        return;
                    }
                    if (this.lock) return;
                    this.lock = true;
                    api.Bank.getReceive({
                        userMobile: this.usrmobile,
                        orgCode: 'CMBC',
                        atyType
                    })
                        .then((res) => {
                            console.log(res);
                            this.sucTost = true;
                            this.getCreditCardActInfo();
                            this.getPrizeInfo();
                            setTimeout(() => {
                                this.sucTost = false;
                            }, 2000);
                            this.lock = false;
                            this.loading = false;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.lock = false;
                            this.loading = false;
                            Toast.info(err.msgInfo);
                        });
                })
                .catch((err) => {
                    Toast.info(err.msgInfo);
                    console.log(err);
                    this.loading = false;
                });

            // if (state == 2) return;
            // if (state == 0) {
            //     this.get(atyType);
            //     return;
            // }
            // if (this.lock) return;
            // this.loading = true;
            // this.lock = true;
            // api.Bank.getReceive({
            //     userMobile: this.usrmobile,
            //     orgCode: "CMBC",
            //     atyType: atyType,
            // })
            //     .then((res) => {
            //         console.log(res);
            //         this.sucTost = true;
            //         setTimeout(() => {
            //             this.sucTost = false;
            //         }, 2000);
            //         this.getCreditCardActInfo();
            //         this.lock = false;
            //         this.loading = false;
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }
    }
};
</script>

<style scoped lang="less">
.warp {
    width: 100vw;
    //height: 100vh;
    background: url("~@/assets/images/nbBank/livelihoodBank/banner_2.png")
        no-repeat;
    background-size: 100% auto;
    span {
        color: #ff0000;
        font-size: 23px;
        font-weight: bolder;
    }
    .banner {
        width: 100%;
        height: 522px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .top {
            width: 40px;
            height: 124px;
            margin-top: 81px;
            background: url("~@/assets/images/nbBank/livelihoodBank/rule.png")
                no-repeat;
            background-size: 100% auto;
        }

        .bottom {
            width: 40px;
            height: 164px;
            margin-top: 16px;
            background: url("~@/assets/images/nbBank/livelihoodBank/prize.png")
                no-repeat;
            background-size: 100% auto;
        }
    }

    .main {
        width: 100%;
        height: 1487px;
        background: url("~@/assets/images/nbBank/livelihoodBank/bg_3.png")
            no-repeat;
        background-size: 100% 100%;
        padding: 108px 32px 0 55px;
        box-sizing: border-box;

        .newCard {
            width: 663px;
            height: 276px;
            display: flex;
            flex-wrap: wrap;

            .left {
                width: 114px;
                height: 191px;
                margin-right: 28px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .right {
                width: 521px;
                height: 191px;
                h3 {
                    //margin-top: 5px;
                    margin-bottom: 10px;
                    font-weight: 700;
                    font-size: 33.34px;
                    color: #af0039;
                }

                p {
                    color: rgba(56, 56, 57, 1);
                    font-weight: 400;
                    font-size: 23px;
                    //margin-top: 5px;
                    line-height: 35px;
                }

                .btn {
                    margin-top: 12px;
                    width: 221px;
                    height: 61px;
                    background: url("~@/assets/images/nbBank/livelihoodBank/hfbt.png")
                        no-repeat;
                    background-size: 100% auto;
                }
                .already {
                    background: url("~@/assets/images/nbBank/livelihoodBank/already.png")
                        no-repeat;
                    background-size: 100% auto;
                }
            }

            .bottom {
                color: rgba(128, 121, 117, 1);
                font-weight: 400;
                font-size: 18px;
                flex: 1;
                margin-top: 28px;
                p {
                    line-height: 30px;
                }
            }
        }

        .month {
            margin-top: 69px;
            height: 303px;
            .left {
                width: 114px;
                height: 221px;
            }

            .right {
                width: 521px;
                height: 221px;
                .btn {
                    margin-top: 10px;
                }
            }

            .bottom {
                margin-top: 28px;
            }
        }

        .item {
            display: flex;
            //width: 573px;
            height: 123px;
            margin-top: 74px;
            img {
                width: 113px;
                height: 113px;
                margin-right: 26px;
            }

            .text {
                h3 {
                    font-weight: 700;
                    font-size: 33.34px;
                    color: #af0039;
                    margin-bottom: 18px;
                }

                p {
                    color: rgba(56, 56, 57, 1);
                    font-weight: 400;
                    font-size: 23px;
                }
            }
            .newSty {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
        .itemtwo {
            margin-top: 50px;
        }
        .itemthree {
            margin-top: 57px;
            img {
                width: 113px;
                height: 127px;
            }
            .text {
                p {
                    margin-bottom: 10px;
                }
            }
        }
        .fotter {
            margin-top: 93px;
            color: rgba(255, 255, 255, 1);
            font-weight: 400;
            font-size: 20px;
            line-height: 28px;
        }
    }
    .float {
        width: 100%;
        height: 150px;
        background: rgba(255, 255, 255, 1);
        position: sticky;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 547px;
            height: 79px;
            margin-top: 16px;
        }
        p {
            margin-top: 10px;
            font-weight: 500;
            font-size: 20px;
            color: #1d3759;
        }
    }
}
.suctost {
    width: 464px;
    height: 116px;
    border-radius: 20px 20px 20px 20px;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 596px;
    left: 143px;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 58px;
        height: 59px;
        margin-right: 25px;
    }
    p {
        font-weight: 500;
        font-size: 38px;
        color: #ffffff;
    }
}
.loading {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    img {
        width: 160px;
        height: 160px;
    }
}
</style>
