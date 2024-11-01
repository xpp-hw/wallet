<template>
    <div class="box">
        <div class="rules" id="A01" @click="(tankuang = true), (showRules = true)"></div>
        <!-- 立即领取 -->
        <div class="lijilingqu" id="B01" v-if="lingquNow" @click="getRigntNew()" ref="lijilingqu"></div>
        <!-- 不符合条件 -->
        <div class="bufuhe" id="C01" v-if="bufuhe" @click="(tankuang = true), (sorry = true)"></div>
        <!-- 已领取 -->
        <div class="yilingqu" id="D01" v-if="yilingqu" @click="(tankuang = true), (yicanyu = true)"></div>
        <!-- 弹框 -->
        <div class="tankuang" v-if="tankuang">
            <!-- 领取成功 -->
            <div class="lingqu_suc" v-if="lingqu_suc">
                <div class="suc_bg"></div>
                <div class="go" @click="go"></div>
                <div class="chongzhi" @click="chongzhi"></div>
                <div class="close" @click="lingquSuc"></div>
            </div>
            <!-- 很遗憾 不符合 -->
            <div class="sorry" v-if="sorry">
                <div class="sorry_bg"></div>
                <div class="toSee" @click="SorrytoSee"></div>
                <div class="close" @click="lingquSorry"></div>
            </div>
            <!-- 领取失败 -->
            <div class="lingqu_fail" v-if="lingqu_fail">
                <div class="fail_bg"></div>
                <div class="haode" @click="lingquFail"></div>
                <div class="close" @click="lingquFail"></div>
            </div>
            <!-- 温馨提示 已参与 -->
            <div class="yicanyu" v-if="yicanyu">
                <div class="canyu_bg"></div>
                <div class="toSee" @click="toSee"></div>
                <div class="close" @click="yicanyuClick"></div>
            </div>
            <div class="showRules" v-if="showRules">
                <div class="rules_bg"></div>
                <div class="rulesText">
                    <p class="textTitle">一、活动时间</p>
                    <p>即日起-本月底</p>
                    <p class="textTitle">二、活动对象</p>
                    <p>江苏掌厅充值新用户（无线公话、无线商话、全额代付家庭副号）， 是否符合以活动页提示为准</p>
                    <p class="textTitle">三、活动内容</p>
                    <p>活动期间，江苏掌厅充值新用户可在活动页领取1张10元充值券，符合条件的用户享1次领取机会，奖品数量有限，领完即止。充值券当月有效，过期不予补发。</p>
                    <p class="textTitle">四、办理渠道</p>
                    <p>此APP</p>
                    <p class="textTitle">五、注意事项</p>
                    <p>
                        1、充值优惠券限本机号码充值使用，无法为他人充值，不可叠加其他充值优惠活动使用。优惠券不支持转赠和提现，需在有效期内使用，到期失效，不予补发。<br>
                        2、使用充值优惠券，充值的本金可以开具发票，获赠的话费不提供发票。使用充值券充值的本金进入营销案现金账本，优惠所得话费进入优惠账本，均不可用于话费支付。<br>
                        3、充值优惠券可能与资费产品、业务套餐、营销活动存在冲突，领取与使用均以实际页面提示为准。更多说明详见江苏掌厅优惠券中心通用规则或充值中心-充值需知。<br>
                        4、参与活动的客户如因欠费停机、主动停机、销户、过户或办理与活动存在冲突的业务等因素造成无法获得奖品的情况，移动公司不予补发。<br>
                        5、中奖用户在享受活动奖品优惠期间不得办理销户、过户、报停业务。<br>
                        6、中国移动江苏公司有权在法律允许的范围内对活动规则作出适当调整。详询10086。<br>
                        7、通过本软件参加的商业活动与Apple Inc.无关。
                    </p>
                </div>
                <div class="close" @click="(tankuang = false), (showRules = false)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import api from '../../common/apiUrls';

export default {
    data() {
        return {
            // sorryTankuang: false,
            // yicanyuTankuang: false,
            /* 按钮 */
            yilingqu: false,
            lingquNow: false,
            bufuhe: false,
            /* 弹框 */
            tankuang: false,
            lingqu_suc: false,
            sorry: false,
            lingqu_fail: false,
            yicanyu: false,
            showRules: false,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_NEWPEOPLE_01_A01'
                }, {
                    id: 'B01',
                    touchCode: 'WAP_T_NEWPEOPLE_01_B01'
                }, {
                    id: 'C01',
                    touchCode: 'WAP_T_NEWPEOPLE_01_C01'
                }, {
                    id: 'D01',
                    touchCode: 'WAP_T_NEWPEOPLE_01_D01'
                }
            ],
            accessSource: '00'
        };
    },
    created() {
        // 查询是否为新用户
        this.getNewuser();
        initPageJs(this.$route.meta.pageName, this.touchArr);
        // this.getTest();
        if (this.$client.LEADEON) {
            this.accessSource = '01';
        } else if (this.$client.JSMCC) {
            this.accessSource = '02';
        } else {
            this.accessSource = '00';
        }
    },
    beforeRouteEnter(to, from, next) {
        if (to.name == 'newPeople') {
            api.queryNewuser()
                .then((res) => {
                    console.log('---', res);
                    if (res.usrTyp == '01') {
                    /* 不满足 */
                        this.bufuhe = true;
                    // this.sorryTankuang = true;
                    } else if (res.usrTyp == '02') {
                    /* 满足未领取 */
                        this.lingquNow = true;
                    } else if (res.usrTyp == '03') {
                    /* 已领取 */
                        this.yilingqu = true;
                    // this.yicanyuTankuang = true;
                    }
                })
                .catch((err) => {
                    console.log('+++', err);
                    if (err.usrTyp == '01') {
                    /* 不满足 */
                        this.bufuhe = true;
                    // this.sorryTankuang = true;
                    } else if (err.usrTyp == '02') {
                    /* 满足未领取 */
                        this.lingquNow = true;
                    } else if (err.usrTyp == '03') {
                    /* 已领取 */
                        this.yilingqu = true;
                    // this.yicanyuTankuang = true;
                    }
                });
        }
        next();
    },
    methods: {
        lingquFail() {
            this.tankuang = false;
            this.lingqu_fail = false;
            this.$router.go(0);
        },
        lingquSuc() {
            this.tankuang = false;
            this.lingqu_suc = false;
            this.$router.go(0);
        },
        lingquSorry() {
            this.tankuang = false;
            this.sorry = false;
            this.$router.go(0);
        },
        yicanyuClick() {
            this.tankuang = false;
            this.yicanyu = false;
            this.$router.go(0);
        },
        go() {
            this.lingqu_suc = false;
            this.takuang = false;
            window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html?cardType=0&useType=1&ch=';
        },
        toSee() {
            this.tankuang = false;
            this.yicanyu = false;
            window.location.href = 'https://wap.js.10086.cn/mb_nact/new/agilefront/apublish/740766908158402591/740766908158402593.html';
        },
        SorrytoSee() {
            this.tankuang = false;
            this.sorry = false;
            window.location.href = 'https://wap.js.10086.cn/mb_nact/new/agilefront/apublish/740766908158402591/740766908158402593.html';
        },
        chongzhi() {
            this.lingqu_suc = false;
            this.tankuang = false;
            window.location.href = 'https://wap.js.10086.cn/vw/WSCZYL?ch=2401';
        },
        // 查询是否为新用户
        getNewuser() {
            this.yilingqu = false;
            this.lingquNow = false;
            this.bufuhe = false;
            api.queryNewuser()
                .then((res) => {
                    console.log('---', res);
                    if (res.usrTyp == '01') {
                    /* 不满足 */
                        this.bufuhe = true;
                    // this.sorryTankuang = true;
                    } else if (res.usrTyp == '02') {
                    /* 满足未领取 */
                        this.lingquNow = true;
                    } else if (res.usrTyp == '03') {
                    /* 已领取 */
                        this.yilingqu = true;
                    // this.yicanyuTankuang = true;
                    }
                })
                .catch((err) => {
                    console.log('+++', err);
                    if (err.usrTyp == '01') {
                    /* 不满足 */
                        this.bufuhe = true;
                    // this.sorryTankuang = true;
                    } else if (err.usrTyp == '02') {
                    /* 满足未领取 */
                        this.lingquNow = true;
                    } else if (err.usrTyp == '03') {
                    /* 已领取 */
                        this.yilingqu = true;
                    // this.yicanyuTankuang = true;
                    }
                });
        },
        // 新用户领取权益
        getRigntNew() {
            this.lingqu_suc = false;
            this.sorry = false;
            this.lingqu_fail = false;
            this.yicanyu = false;
            this.showRules = false;
            this.$refs.lijilingqu.className = 'pointerNone';
            // this.getNewuser();
            // if(this.sorryTankuang) {
            //     this.tankuang = true;
            //     this.sorry = true;
            // } else if(this.yicanyuTankuang) {
            //     this.tankuang = true;
            //     this.yicanyu = true;
            // }

            api.getRigntNew({
                parentChannel: this.$route.query.parchn || '',
                childChannel: this.$route.query.gytype || '',
                accessSource: this.accessSource
            })
                .then((res) => {
                    this.$refs.lijilingqu.className = 'pointerAuto';
                    console.log('---', res);
                    if (res.rightSts == '01') {
                    /* 领取成功 */
                        this.tankuang = true;
                        this.lingqu_suc = true;
                    } else if (res.rightSts == '02') {
                    /* 领取失败 */
                        this.tankuang = true;
                        this.lingqu_fail = true;
                    }
                })
                .catch((err) => {
                    this.$refs.lijilingqu.className = 'pointerAuto';
                    console.log('+++', err);
                    this.tankuang = true;
                    this.lingqu_fail = true;
                });
        },
        /* mock数据模拟 */
        getTest(test) {
            axios.get('/user/userInfo')
                .then((res) => {
                    console.log('zzzzzzz', res);
                    if (res.data.usrTyp == '02') {
                        console.log('-------------', this.yilingqu);
                        /* 满足未领取 */
                        this.lingquNow = true;
                    }
                    if (test == 1) {
                        if (res.data.rightSts == '01') {
                        /* 领取成功 */
                            this.tankuang = true;
                            this.lingqu_suc = true;
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.tankuang = true;
                    this.lingqu_fail = true;
                });
        }
    }
};
</script>

<style lang="less" scoped>
.box {
    position: relative;
    width: 750px;
    height: 1512px;
    background: url("../../assets/images/newPeople/bg.png") no-repeat;
    background-size: 100%;

    .rules {
        position: absolute;
        right: 0;
        top: 380px;
        background: url("../../assets/images/newPeople/rules.png") no-repeat;
        background-size: 100%;
        width: 61px;
        height: 148px;
    }

    .lijilingqu {
        position: absolute;
        left: 85px;
        bottom: 220px;
        background: url("../../assets/images/newPeople/lingquBtn.png") no-repeat;
        background-size: 100%;
        width: 588px;
        height: 113px;
    }

    .bufuhe {
        position: absolute;
        left: 85px;
        bottom: 220px;
        width: 588px;
        height: 113px;
        background: url("../../assets/images/newPeople/bufuhe.png") no-repeat;
        background-size: 100%;
    }

    .yilingqu {
        position: absolute;
        left: 85px;
        bottom: 220px;
        width: 588px;
        height: 113px;
        background: url("../../assets/images/newPeople/yilingqu.png") no-repeat;
        background-size: 100%;
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
    .lingqu_suc {
        position: relative;
        .suc_bg {
            width: 512px;
            height: 543px;
            background: url("../../assets/images/newPeople/suc_bg.png") no-repeat;
            background-size: 100%;
        }
        .go {
            position: absolute;
            top: 280px;
            left: 337px;
            width: 80px;
            height: 80px;
        }
        .chongzhi {
            position: absolute;
            top: 425px;
            left: 115px;
            width: 305px;
            height: 73px;
            background: url("../../assets/images/newPeople/chongzhi.png") no-repeat;
            background-size: 100%;
        }
        .close {
            position: absolute;
            top: 600px;
            left: 240px;
            width: 54px;
            height: 54px;
            background: url('../../assets/images/newPeople/close.png') no-repeat;
            background-size: 100%;
        }
    }
    .sorry {
        position: relative;
        .sorry_bg {
            width: 512px;
            height: 543px;
            background: url("../../assets/images/newPeople/sorry.png") no-repeat;
            background-size: 100%;
        }
        .toSee {
            position: absolute;
            top: 390px;
            left: 115px;
            width: 305px;
            height: 73px;
            background: url("../../assets/images/newPeople/toSee.png") no-repeat;
            background-size: 100%;
        }
        .close {
            position: absolute;
            top: 600px;
            left: 235px;
            width: 54px;
            height: 54px;
            background: url('../../assets/images/newPeople/close.png') no-repeat;
            background-size: 100%;
        }
    }
    .lingqu_fail {
        position: relative;
        .fail_bg {
            width: 512px;
            height: 490px;
            background: url("../../assets/images/newPeople/fail_bg.png") no-repeat;
            background-size: 100%;
        }
        .haode {
            position: absolute;
            top: 350px;
            left: 125px;
            width: 271px;
            height: 73px;
            background: url("../../assets/images/newPeople/haode.png") no-repeat;
            background-size: 100%;
        }

        .close {
            position: absolute;
            top: 580px;
            left: 238px;
            width: 54px;
            height: 54px;
            background: url("../../assets/images/newPeople/close.png") no-repeat;
            background-size: 100%;
        }
    }
    .yicanyu {
        position: relative;
        .canyu_bg {
            width: 512px;
            height: 570px;
            background: url("../../assets/images/newPeople/canyu_bg.png") no-repeat;
            background-size: 100%;
        }
        .toSee {
            position: absolute;
            top: 425px;
            left: 115px;
            width: 305px;
            height: 73px;
            background: url("../../assets/images/newPeople/toSee.png") no-repeat;
            background-size: 100%;
        }
        .close {
            position: absolute;
            top: 620px;
            left: 240px;
            width: 54px;
            height: 54px;
            background: url("../../assets/images/newPeople/close.png") no-repeat;
            background-size: 100%;
        }
    }
    .showRules {
        position: relative;
        .rules_bg {
            width: 509px;
            height: 599px;
            background: url('../../assets/images/newPeople/rules_bg.png') no-repeat;
            background-size: 100%;
        }
        .close {
            position: absolute;
            top: 670px;
            left: 238px;
            width: 54px;
            height: 54px;
            background: url('../../assets/images/newPeople/close.png') no-repeat;
            background-size: 100%;
        }
        .rulesText {
            position: absolute;
            top: 60px;
            left: 40px;
            width: 430px;
            height: 500px;
            white-space: normal;
            word-wrap: break-word;
            overflow-y: scroll;
            color: #c36639;
            font-size: 30px;
            font-weight: 500;
            line-height: 40px;
            .textTitle {
                font-weight: 900;
            }
        }
    }
}
.pointerNone {
    position: absolute;
    left: 85px;
    bottom: 220px;
    background: url("../../assets/images/newPeople/lingquBtn.png") no-repeat;
    background-size: 100%;
    width: 588px;
    height: 113px;
    pointer-events:none
}
.pointerAuto {
    position: absolute;
    left: 85px;
    bottom: 220px;
    background: url("../../assets/images/newPeople/lingquBtn.png") no-repeat;
    background-size: 100%;
    width: 588px;
    height: 113px;
    pointer-events:auto
}
</style>
