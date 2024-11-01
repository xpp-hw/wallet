<template>
    <div class="warp">
        <div class="head">
            <div class="title">
                <div class="left">
                    <div>我的钱包</div>
                    <div class="img" @click="eye = !eye">
                        <img
                            v-if="!eye"
                            src="@/assets/images/uAdd/close@2x.png"
                            alt=""
                        />
                        <img
                            v-else
                            src="@/assets/images/uAdd/open@2x.png"
                            alt=""
                        />
                    </div>
                </div>
                <div class="right" @click="searchAllAccount">
                    <span>查看全部账户</span
                    ><img src="~@/assets/images/uAdd/r.png" alt="" />
                </div>
            </div>
            <div class="box">
                <div class="item">
                    <div class="text">银行卡</div>
                    <div class="number" @click="cardBag">
                        <span v-if="eye">{{ cardNum }}</span>
                        <span v-else>***</span>
                    </div>
                    <div
                        class="icon"
                        v-if="jbShowList.bank"
                        @click="showTips(jbTipsList.bank)"
                    >
                        {{ jbShowList.bank }}
                    </div>
                </div>
                <div class="item">
                    <div class="text">零钱</div>
                    <div class="number" @click="goWallet">
                        <p v-if="eye && isOpen == '00'">开通</p>
                        <p v-else-if="eye && isOpen == '04'">开通中</p>
                        <span v-else-if="eye && isOpen == '01'">{{
                            walletNum
                        }}</span>
                        <span v-else>***</span>
                    </div>
                    <div
                        class="icon"
                        v-if="jbShowList.wallet"
                        @click="showTips(jbTipsList.wallet)"
                    >
                        {{ jbShowList.wallet }}
                    </div>
                </div>
                <div class="item">
                    <div class="text">借钱</div>
                    <div
                        class="number"
                        @click="
                            goWhere(
                                'https://fintech.12580life.com/fintech-h5/loans/loansPublicity?token=' +
                                    token
                            )
                        "
                    >
                        <p v-if="eye">查看</p>
                        <span v-else>***</span>
                    </div>
                </div>
                <div class="item">
                    <div class="text">权益</div>
                    <div
                        class="number"
                        @click="
                            goWhere(
                                'https://fintech.12580life.com/fintech-h5/fortuneCenter/myInterests'
                            )
                        "
                    >
                        <span v-if="eye">{{ hadGetQY }}</span>
                        <span v-else>***</span>
                    </div>
                    <div class="icon" v-if="jbShowList.quanyi">
                        {{ notGetQY }}张待领取
                    </div>
                </div>
            </div>
        </div>
        <div class="exclusive">
            <div class="l">专属权益</div>
            <div
                class="r"
                @click="
                    goWhere(
                        'https://fintech.12580life.com/fintech-h5/fortuneCenter/financeActivity'
                    )
                "
            ></div>
        </div>
        <div class="exclusiveBox">
            <div class="item" v-for="(item, index) in exclusive" :key="index">
                <div class="header" v-if="item.head">
                    <img :src="item.head" alt="" />
                </div>
                <img class="img" :src="item.img" alt="" />
                <div class="icon" v-if="item.icon">
                    {{ item.icon }}
                </div>
                <div class="text">{{ item.text }}</div>
                <div class="get" @click="goWhere(item.url)">{{ item.get }}</div>
            </div>
        </div>
        <div class="exclusive">
            <div class="l">升级权益</div>
        </div>
        <div class="upgrade">
            <div class="item">
                <div style="margin-left: 1.11rem; margin-top: 0.3346rem">
                    <div class="t">省钱包</div>
                    <div class="b">月月享13元支付立减+7元话费券</div>
                </div>
                <div class="btn">敬请期待</div>
            </div>
            <div class="item">
                <div style="margin-left: 1.21rem; margin-top: 0.3049rem">
                    <div class="t">健康无忧</div>
                    <div class="b">健康问诊+10万元意外险</div>
                </div>
                <div
                    class="btn"
                    @click="
                        goWhere(
                            'https://fintech.12580life.com/fintech-h5/healthcare/homeTenBill?token=' +
                                token
                        )
                    "
                >
                    ¥<span>10</span>元/月
                </div>
            </div>
        </div>
        <div class="swiper">
            <md-swiper
                @before-change="beforeChange"
                @after-change="afterChange"
                ref="swiper"
                :is-prevent="false"
                :useNative-driver="false"
            >
                <md-swiper-item
                    :key="$index"
                    v-for="(item, $index) in swiperList"
                >
                    <div class="banner-item" @click="goWhere(item.url)">
                        <img :src="item.img" alt="" />
                    </div>
                </md-swiper-item>
            </md-swiper>
        </div>
        <div class="textPop" v-if="textPopShow">
            <div class="box">
                <p class="title">温馨提示</p>
                <div class="text" v-html="textPop"></div>
                <div class="btn" @click="textPopShow = false">确认</div>
            </div>
        </div>
        <!-- 开始绑定loading效果 -->
        <div v-if="loading" class="loading-toast">
            <img alt="" src="@/assets/images/loading-toast.gif" />
        </div>
    </div>
</template>

<script>
import { Dialog, Swiper, SwiperItem } from 'mand-mobile';
import * as url from 'url';
import * as store2 from '@/common/localstore';
import api from '../../common/apiUrls';
import router, { delectQueryString } from '../../router';

export default {
    name: 'uAdd',
    computed: {
        url() {
            return url;
        }
    },
    components: {
        [Swiper.name]: Swiper,
        [SwiperItem.name]: SwiperItem
    },
    data() {
        const uAddLogin = this.$route.query.token;
        return {
            token: '',
            ylBankList: [],
            eye: false,
            cardNum: 0,
            isOpen: '',
            walletNum: 0.0,
            hadGetQY: 0,
            notGetQY: 0,
            jbShowList: {
                // 角标是否显示
                wallet: '',
                hebao: '',
                bank: '',
                quanyi: ''
            },
            jbTipsList: {
                // 角标文案
                wallet: '',
                hebao: '',
                bank: '',
                quanyi: ''
            },
            textPopShow: false,
            textPop: '',
            exclusive: [
                {
                    head: require('@/assets/images/uAdd/h1.png'),
                    img: require('@/assets/images/uAdd/p1.png'),
                    icon: '',
                    text: '1GB流量',
                    get: '¥ 0.01',
                    url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent'
                },
                {
                    head: '',
                    img: require('@/assets/images/uAdd/p10.png'),
                    icon: '',
                    text: '最高80元',
                    get: '赚话费',
                    url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/gfBankMargin'
                },
                {
                    head: '',
                    img: require('@/assets/images/uAdd/p11.png'),
                    icon: '',
                    text: '6.6元话费',
                    get: '去查看',
                    url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/telephoneCharges/newDescription'
                },
                {
                    head: '',
                    img: require('@/assets/images/uAdd/p4.png'),
                    icon: '月月抽',
                    text: '抽20元话费券',
                    get: '¥ 1/月',
                    url: 'https://fintech.12580life.com/fintech-h5/insurance/worryFinance'
                },
                {
                    head: '',
                    img: require('@/assets/images/uAdd/p5.png'),
                    icon: '5GB/月免费领',
                    text: '流量宝',
                    get: '去参与',
                    url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicHome'
                },
                {
                    head: '',
                    img: require('@/assets/images/uAdd/p6.png'),
                    icon: '',
                    text: '话费易充值',
                    get: '去办理',
                    url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/autoRecharge'
                },
                {
                    head: '',
                    img: require('@/assets/images/uAdd/p7.png'),
                    icon: '',
                    text: '最高可贷20万',
                    get: '去领取',
                    url:
                        `https://fintech.12580life.com/fintech-h5/loans/loansPublicity?token=${
                            uAddLogin}`
                },
                {
                    head: '',
                    img: require('@/assets/images/uAdd/p8.png'),
                    icon: '',
                    text: '享专属理财券',
                    get: '去办理',
                    url:
                        `https://fintech.12580life.com/fintech-h5/loans/htPfEmpower?pageId=221103134703024001&token=${
                            uAddLogin}`
                },
                {
                    head: '',
                    img: require('@/assets/images/uAdd/p9.png'),
                    icon: '',
                    text: '赠3万电动车险',
                    get: '去办理',
                    url:
                        `https://fintech.12580life.com/fintech-h5/healthcare/homePage?token=${
                            uAddLogin}`
                }
            ],
            swiperList: [
                {
                    img: require('@/assets/images/uAdd/swiper1.png'),
                    url:
                        `https://fintech.12580life.com/fintech-h5/healthcare/transitionPage?pageId=230620134827029002&token=${
                            uAddLogin}`
                }
                // {
                //     img: require('@/assets/images/uAdd/swiper2.png'),
                //     url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/livelihoodBank'
                // },
                // {
                //     img: require('@/assets/images/uAdd/swiper3.png'),
                //     url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankJointly'
                // }
            ],
            loading: true
        };
    },
    mounted() {
        window.triggerSwiper0 = () => {
            this.goto();
        };
        window.triggerSwiper1 = () => {
            this.play();
        };
        window.triggerSwiper2 = () => {
            this.stop();
        };
    },
    created() {
        if (this.$route.query.token) {
            this.loginAll();
        }
        this.rightAccountQuery();
        this.wapAcplist();
        this.qrySmallChangeAcc();
        if (
            window.sessionStorage.getItem('ujbShowList')
            && window.sessionStorage.getItem('ujbTipsList')
        ) {
            // this.jbShowList = JSON.parse(
            //     window.sessionStorage.getItem("ujbShowList")
            // );
            // this.jbTipsList = JSON.parse(
            //     window.sessionStorage.getItem("ujbTipsList")
            // );
            // console.log('[you]')
            // this.loading = false;
        }
    },
    methods: {
        loginAll() {
            // 保险登录
            api.uAddHealthcareTokenLogin({
                token: this.$route.query.token,
                userFlag: '2'
            }).then((res) => {
                const obj = {
                    dataType: typeof (res.body.sessionId),
                    content: res.body.sessionId,
                    type: 'session',
                    datetime: new Date().getTime()
                };
                window.sessionStorage.setItem('healthCare-access_token', JSON.stringify(obj));
            });
            // 省钱包登录
            api.uAddInsuranceTokenLogin({
                token: this.$route.query.token,
                userFlag: '2'
            }).then((data) => {
                window.localStorage.setItem('insurance-Wallet.loginSesion', data.body.sessionId);
                setTimeout(() => {
                    window.localStorage.setItem('insurance-Wallet.loginSesion', data.body.sessionId);
                }, 100);
                window.localStorage.setItem('insurance-Wallet.uAddLoginToken', this.$route.query.token);
                window.localStorage.setItem('insurance-Wallet.usrmob', data.body.loginName.split('-')[2]);
            });
            // 贷款登录
            api.uAddLoansTokenLogin({
                token: this.$route.query.token,
                userFlag: '2'
            })
                .then((data) => {
                    window.localStorage.setItem('bsLoans.loginSesion', data.body.sessionId);
                });
        },
        setValue(id, value) {
            document.querySelector(id)
                && (document.querySelector(id).innerHTML = value);
        },
        beforeChange(from, to) {
            this.setValue('#valueSwiper0', from);
            this.setValue('#valueSwiper1', to);
        },
        afterChange(from, to) {
            this.setValue('#valueSwiper2', from);
            this.setValue('#valueSwiper3', to);
        },
        fn(index) {
            this.setValue('#valueSwiper4', index);
        },
        goto() {
            this.$refs.swiper.goto(2);
        },
        play() {
            this.$refs.swiper.play();
        },
        stop() {
            this.$refs.swiper.stop();
        },
        goWhere(url) {
            window.location.href = url;
        },
        // 银行卡数量
        wapAcplist() {
            api.wapAcplist({})
                .then((res) => {
                    this.ylBankList = res.usrBnkInfos.filter((item) => {
                        if (
                            (item.accFlg && item.accFlg === '04')
                            || (item.accFlg && item.accFlg === '05')
                        ) {
                            return true;
                        }
                    });
                    this.cardNum = this.ylBankList.length || 0;
                    store2.default.set('ylBankListsInfo', this.ylBankList);
                })
                .catch((err) => {
                    console.log(err);
                });
            // 获取卡面信息
            api.cardImageQuery({ accountType: '01' })
                .then((res) => {
                    const imgList = res.list;
                    store2.default.set('bankImgList', imgList);
                })
                .catch((err) => {
                    store2.default.set('bankImgList', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        // 零钱
        qrySmallChangeAcc() {
            api.qrySmallChangeAcc()
                .then((res) => {
                    // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                    // console.log(res);
                    this.isOpen = res.openFlag;
                    const Num = res.list.filter(item => item.defaultAccFlg == '01');
                    if (Num.length > 0) {
                        this.walletNum = Number(Num[0].balanceamt).toFixed(2);
                    }
                    // 查询角标信息
                    this.queryCornerContent(res.openFlag);
                })
                .catch((err) => {});
        },
        goWallet() {
            if (this.isOpen === '00') {
                let tyid;
                if (this.$route.query.typeId) {
                    tyid = this.$route.query.typeId;
                } else {
                    tyid = '10010';
                }
                this.$router.push({
                    name: 'khEmpower',
                    query: {
                        typeId: tyid,
                        sourcechannel: this.$route.query.sourcechannel || ''
                    }
                });
            } else if (this.isOpen === '01') {
                this.$router.push({
                    name: 'moveWallet'
                });
            }
        },
        // 查看银联银行卡
        cardBag() {
            // this.$router.push({
            //     name: "myYLBanks",
            // });
            if (
                this.$route.query.dealChn !== ''
                && this.$route.query.dealChn !== undefined
            ) {
                this.$router.push({
                    name: 'myYLBanks',
                    query: {
                        dealChn: this.$route.query.dealChn
                    }
                });
            } else {
                this.$router.push({
                    name: 'myYLBanks',
                    query: {
                        dealChn: '10010'
                    }
                });
            }
        },
        // 查看全部账户列表
        searchAllAccount() {
            if (this.$route.query.typeId && this.$route.query.sourcechannel) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        typeId: this.$route.query.typeId,
                        sourcechannel: this.$route.query.sourcechannel
                    }
                });
            } else if (this.$route.query.typeId) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        typeId: this.$route.query.typeId
                    }
                });
            } else if (this.$route.query.sourcechannel) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        sourcechannel: this.$route.query.sourcechannel
                    }
                });
            } else if (this.$route.query.dealChn) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        dealChn: this.$route.query.dealChn
                    }
                });
            } else {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen
                    }
                });
            }
        },
        // 权益数量
        rightAccountQuery() {
            api.rightAccountQuery({})
                .then((res) => {
                    res.list.forEach((item) => {
                        this.qyList = res.list;
                        if (item.receiveSts === '1') {
                            this.hadGetQY += 1;
                        } else {
                            this.notGetQY += 1;
                        }
                    });
                    store2.default.set('qyList', this.qyList);
                })
                .catch((err) => {});
        },
        // 获取角标信息
        queryCornerContent(defaultAccFlg) {
            api.cornerContentQuery({})
                .then((res) => {
                    res.list.forEach((item) => {
                        if (
                            item.accountType === '01'
                            && item.showFlag === '1'
                            && item.businessType === '01'
                            && defaultAccFlg != '01'
                        ) {
                            // 钱包
                            this.jbShowList.wallet = item.angularContent;
                            this.jbTipsList.wallet = item.atyDesc || '';
                        } else if (
                            item.accountType === '02'
                            && item.showFlag === '1'
                            && item.businessType === '01'
                        ) {
                            // 银行卡
                            this.jbShowList.bank = item.angularContent;
                            this.jbTipsList.bank = item.atyDesc || '';
                        } else if (
                            item.accountType === '03'
                            && item.showFlag === '1'
                            && item.businessType === '01'
                        ) {
                            // 权益
                            this.jbShowList.quanyi = item.angularContent;
                            this.jbTipsList.quanyi = item.atyDesc || '';
                        } else if (
                            item.accountType === '04'
                            && item.showFlag === '1'
                            && item.businessType === '01'
                        ) {
                            // 和包
                            this.jbShowList.hebao = item.angularContent;
                            this.jbTipsList.hebao = item.atyDesc || '';
                        }
                        // console.log(this.jbTipsList);
                        window.sessionStorage.setItem(
                            'ujbShowList',
                            JSON.stringify(this.jbShowList)
                        );
                        window.sessionStorage.setItem(
                            'ujbTipsList',
                            JSON.stringify(this.jbTipsList)
                        );
                        this.loading = false;
                    });
                })
                .catch((err) => {
                    this.getJKResult += 1;
                    store2.default.set('usrmob', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        // 展示角标
        showTips(text) {
            this.textPop = text;
            this.textPopShow = true;
        }
    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.head {
    width: 702px;
    height: 304.82px;
    background: linear-gradient(
        to bottom,
        #3073f5 0%,
        #3073f5 37%,
        white 38%,
        white 100%
    );
    background-size: 100% auto;
    border-radius: 17.41px;
    margin-top: 25px;
    .title {
        width: 100%;
        height: 92.82px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 39.18px;
            color: #ffffff;
            margin-left: 28px;
            .img {
                margin-left: 15px;
                width: 28px;
                //height: 28px;
                img {
                    width: 100%;
                    //height: 100%;
                }
            }
        }
        .right {
            width: 213.29px;
            height: 50.06px;
            background: #2c64ee;
            border-radius: 15.23px;
            font-size: 26.12px;
            color: #ffffff;
            display: flex;
            align-items: center;
            margin-right: 16.5px;
            padding-left: 20px;
            box-sizing: border-box;
            img {
                width: 12.19px;
                height: 21.76px;
                margin-left: 8px;
                margin-top: -2px;
            }
        }
    }
    .box {
        width: 100%;
        height: 212px;
        background-image: linear-gradient(180deg, #e2efff 0%, #ffffff 100%);
        box-shadow: 0 4px 9px 0 #e9eef2;
        border-radius: 17.54px;
        //background-size: 100% auto;
        display: flex;
        align-items: center;
        .item {
            flex: 0 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            &::before {
                content: "";
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 2.18px;
                height: 120.79px;
                background-image: linear-gradient(
                    180deg,
                    rgba(255, 255, 255, 0) 0%,
                    #e1eaf6 54%,
                    rgba(255, 255, 255, 0) 100%
                );
            }
            .text {
                font-weight: 600;
                font-size: 32.65px;
                color: #3b4049;
            }
            .number {
                font-weight: 700;
                font-size: 34.82px;
                color: #3b4049;
                margin-top: 16.67px;
                p {
                    width: 78.35px;
                    height: 32.65px;
                    border: 1px solid #3b4049;
                    border-radius: 16.16px;
                    font-weight: 500;
                    font-size: 21.76px;
                    color: #3b4049;
                    text-align: center;
                    line-height: 32.65px;
                }
                span {
                    display: block;
                    width: 78.35px;
                    height: 32.65px;
                    text-align: center;
                    line-height: 32.65px;
                    border: 1px solid transparent;
                }
            }
            .icon {
                position: absolute;
                left: 50%;
                top: 35px;
                height: 24.48px;
                width: auto;
                white-space: nowrap;
                background-image: linear-gradient(
                    90deg,
                    #fd8026 0%,
                    #ff3c1a 100%,
                    #ff2b36 100%
                );
                border-radius: 10.2px 10.2px 10.2px 0;
                font-size: 16px;
                color: #ffffff;
                padding: 0 8px;
                display: flex;
                align-items: center;
            }
        }
        .item:last-child {
            &::before {
                content: "";
                width: 0;
                height: 0;
            }
        }
    }
}
.exclusive {
    margin: 18px 0;
    width: 702px;
    height: 48px;
    display: flex;
    justify-content: space-between;
    .l {
        height: 48px;
        font-weight: 600;
        font-size: 32.35px;
        color: #333333;
        line-height: 48px;
    }
    .r {
        height: 48px;
        width: 48px;
        background: url("~@/assets/images/uAdd/gengduo.png") no-repeat;
        background-size: 100% auto;
        background-position: center;
    }
}
.exclusiveBox {
    width: 702px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
        width: 219.98px;
        height: 261.78px;
        background-image: linear-gradient(180deg, #fdfdfd 0%, #f8f9fb 100%);
        border: 1px solid #e8ebee;
        border-radius: 13.2px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .header {
            position: absolute;
            left: 0;
            top: 0;
            img {
                width: 78px;
                height: 30px;
            }
        }
        .img {
            width: 91px;
            height: 99px;
            margin-top: 35px;
        }
        .icon {
            position: absolute;
            top: 32px;
            left: 101px;
            height: 26.4px;
            width: auto;
            background-image: linear-gradient(
                90deg,
                #fd8331 0%,
                #f95d72 63%,
                #fe4243 100%,
                #ff2b36 100%
            );
            border-radius: 11px 11px 11px 0;
            font-size: 16.18px;
            color: #ffffff;
            padding: 0 5px;
            line-height: 26.4px;
        }
        .text {
            margin-top: 10px;
            font-size: 28.04px;
            color: #333333;
            font-weight: bold;
        }
        .get {
            width: 138.59px;
            height: 41.8px;
            background: #f9d4b5;
            border-radius: 20.9px;
            font-weight: 600;
            font-size: 25.88px;
            color: #904d29;
            text-align: center;
            line-height: 41.8px;
            margin-top: 16px;
        }
    }
}
.upgrade {
    width: 692px;
    display: flex;
    justify-content: space-between;
    .item {
        width: 329px;
        height: 263px;
        .t {
            font-size: 32.91px;
            color: #6f471b;
        }
        .b {
            font-size: 21.94px;
            color: #ef5b13;
            margin-top: 5px;
        }
        .btn {
            width: 169.68px;
            height: 42.45px;
            background-image: linear-gradient(180deg, #f9e7d9 0%, #f2c1a0 100%);
            border-radius: 21.32px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 19.74px;
            color: #863008;
            span {
                font-size: 34.55px;
                display: block;
                margin: 0 5px;
                font-weight: bold;
            }
        }
    }
    .item:nth-child(1) {
        background: url("~@/assets/images/uAdd/upL.png") no-repeat;
        background-size: 100% auto;
        .b {
            width: 204.02px;
            height: 60px;
        }
        .btn {
            margin-top: 58.9px;
            margin-left: 73.73px;
        }
    }
    .item:nth-child(2) {
        background: url("~@/assets/images/uAdd/upR.png") no-repeat;
        background-size: 100% auto;
        .b {
            width: 195.24px;
            height: 60px;
        }
        .btn {
            margin-top: 61.2px;
            margin-left: 85.65px;
        }
    }
}
.swiper {
    width: 702px;
    height: 178px;
    margin-top: 29.93px;
    margin-bottom: 91px;
    /deep/.md-swiper {
        width: 702px;
        height: 178px;
        .banner-item {
            width: 702px;
            height: 178px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    /deep/.md-swiper-indicators {
        .md-swiper-indicator {
            width: 11.54px;
            height: 11.7px;
            background: #ffffff;
            border-radius: 50%;
        }
        .md-swiper-indicator-active {
            background: #2f86f6;
        }
    }
}
.textPop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
        width: 5rem;
        border-radius: 0.2rem;
        background: #fff;
        padding-bottom: 0.2rem;
        .title {
            text-align: center;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.36rem;
            font-weight: 500;
            border-bottom: 1px solid #00aaee;
        }
        .text {
            min-height: 0.8rem;
            padding: 0.2rem;
            overflow: auto;
            font-size: 0.26rem;
            line-height: 0.4rem;
            white-space: pre-line;
            word-break: break-all;
        }
        .btn {
            width: 3rem;
            height: 0.6rem;
            line-height: 0.6rem;
            color: #fff;
            background: #00aaee;
            text-align: center;
            margin: 0.2rem auto 0;
            font-size: 0.36rem;
            border-radius: 0.2rem;
        }
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
