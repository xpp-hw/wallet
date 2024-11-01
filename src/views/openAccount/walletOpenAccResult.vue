<template>
    <div>
        <div id="container" class="container openaccount">
            <div class="account-index-wrapper">
                <div class="open-progress">
                    <div class="progress-pic">
                        <img alt="" src="@/assets/images/progress1.png" />
                        <div class="progress-line actline"></div>
                        <img alt="" src="@/assets/images/progress4.png" />
                        <div class="progress-line actline"></div>
                        <img alt="" src="@/assets/images/progress5.png" />
                    </div>
                    <div class="txt-progress">
                        <span class="act-progress">银行卡</span
                        ><span class="act-progress" style="margin-right: 0.2rem"
                            >短信验证</span
                        ><span class="act-progress" style="margin-right: 0.1rem"
                            >完成</span
                        >
                    </div>
                </div>
                <div v-if="opening" class="opening-account">
                    <img alt="" src="@/assets/images/loading-ing.gif" />
                    <p>正在开户</p>
                    <p class="tip">
                        预计<span style="color: #238ff2">20秒</span
                        >完成开户，请您耐心等待
                    </p>
                </div>
                <div v-if="success" class="open-acc-success">
                    <div class="success-info">
                        <img
                            alt=""
                            class="icon"
                            src="@/assets/images/opening-success2.png"
                        />
                        <p class="h3">恭喜,成功开通钱包账户！</p>
                        <p class="h4" v-if="typeid =='hfzdc'">请继续办理话费自动充业务～</p>
                    </div>
                    <a
                        id="E01"
                        class="success-index"
                        href="javascript:;"
                        @click="gohome"
                        >{{typeid =='hfzdc' ? '去办理' : '完成'}}</a>
                    <div v-if="hasad" class="success-ad">
                        <img
                            alt=""
                            class="banner_img"
                            src="@/assets/images/wallet_banner.png"
                        />
                        <img
                            alt=""
                            class="banner_img"
                            src="@/assets/images/wallet_banner.png"
                        />
                    </div>
                    <div class="activityBox">
                        <div class="center">
                            <p class="activeTitle">流量特惠</p>
                            <!-- <p>1分钱抢福利</p> -->
                            <div class="rightBox">
                                <div
                                    v-for="(item, idx) in rightList"
                                    :id="item.id"
                                    :key="idx"
                                    class="item"
                                    @click="goActivity(item)"
                                >
                                    <div class="btn">{{item.btn}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="fail" class="open-acc-fail">
                    <div class="success-info">
                        <img
                            alt=""
                            class="icon"
                            src="@/assets/images/opening-error2.png"
                        />
                        <p class="h3">{{ failreason }}</p>
                        <!-- <p class="h4">点击按钮，选择其他开户银行，重新开通。</p> -->
                    </div>
                    <a
                        id="E02"
                        class="success-index"
                        href="javascript:;"
                        @click="gokaihu"
                        >重新发起</a
                    >
                </div>
                <!-- 待定 -->
                <div v-if="undetermined" class="open-acc-success">
                        <div class="success-info">
                        <img alt=""
                             class="icon"
                             src="@/assets/images/withdrawal/suc.png">
                        <p class="h3">开户申请成功，等待银行处理</p>
                        <!-- <p class="h4">您可以使移动钱包充值话费，购买理财等。</p> -->
                    </div>
                    <a
                        id="E01"
                        class="success-index"
                        href="javascript:;"
                        @click="gohome"
                        >完成</a>
                    <div v-if="hasad" class="success-ad">
                        <img
                            alt=""
                            class="banner_img"
                            src="@/assets/images/wallet_banner.png"
                        />
                        <img
                            alt=""
                            class="banner_img"
                            src="@/assets/images/wallet_banner.png"
                        />
                    </div>
                    <div class="activityBox">
                        <div class="center">
                            <p class="activeTitle">流量特惠</p>
                            <div class="rightBox">
                                <div
                                    v-for="(item, idx) in rightList"
                                    :id="item.id"
                                    :key="idx"
                                    class="item"
                                    @click="goActivity(item)"
                                >
                                    <div class="btn">{{item.btn}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
        <!--        <div-->
        <!--            v-if="isModelShow && success"-->
        <!--            id="D01"-->
        <!--            class="model"-->
        <!--            @click="isModelShow = false"-->
        <!--        >-->
        <!--            <div class="content">-->
        <!--                <div id="C01" class="btn" @click.stop="goActivity">-->
        <!--                    开心收下-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->
        <md-dialog
            title="温馨提示"
            :closable="true"
            v-model="basicDialog.open"
            :btns="basicDialog.btns"
        >
            您需要签约交通银行快捷支付才能正常使用账户哦~
        </md-dialog>
        <activityStatusPopup
          v-if="isActivityPopup"
          :isPopup.sync="isActivityPopup"
          :statusType="statusType"
          :isFromWalletOpenAccResult='true'
          @closePopupShowBasicDialog='showBasicDialog'
        ></activityStatusPopup>
    </div>
</template>

<script>
import Header from '@/components/header';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import activityStatusPopup from '../BOCMActivity/compoments/activityStatusPopup.vue';

export default {
    name: 'walletOpenAccResult',
    components: {
        Header,
        activityStatusPopup
    },
    data() {
        return {
            zero: false,
            basicDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        handler: this.basicCancel
                    },
                    {
                        text: '去签约',
                        handler: this.basicConfirm
                    }
                ]
            },
            opening: true,
            success: false,
            fail: false,
            undetermined: false,
            mobile: '',
            timer: '',
            failreason: '抱歉,您暂时无法开通此银行钱包账户！',
            openfail: '',
            typeid: '', // 渠道号
            hasad: false,
            gourl: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/newFortune',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLETOPENACCRESULT_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLETOPENACCRESULT_01_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLETOPENACCRESULT_01_A03'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_WALLETOPENACCRESULT_01_B01'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_WALLETOPENACCRESULT_01_C01'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_WALLETOPENACCRESULT_01_D01'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_WALLETOPENACCRESULT_01_E01'
                },
                {
                    id: 'E02',
                    touchCode: 'WAP_T_WALLETOPENACCRESULT_01_E02'
                }
            ],
            orgcode: '',
            fxmobile: '',
            rightList: [
                {
                    btn: '马上抢',
                    url: 'oneCent',
                    id: 'A03'
                }
            ],
            isModelShow: false,
            isBannerShow: false,
            linkUrlName: 'oneCent',
            ZFbackID: '',
            isActivityPopup: false,
            statusType: 'openSuccess',
            intervalIndex: 0
        };
    },
    created() {
        this.getZero();
        this.mobile = store2.default.get('usrmob');
        this.openfail = this.$route.query.openfail;
        this.orgcode = this.$route.query.orgcode;
        console.log(this.openfail);
        console.log(this.$route.query.failreason);
        // this.isModelShow =
        //     this.$route.query.isFistOpen &&
        //     this.$route.query.isFistOpen === "1";
        this.isBannerShow = this.$route.query.isFistOpen
            && this.$route.query.isFistOpen === '1';
        console.log('isBannerShow', this.isBannerShow);
        // 支付项目返回地址id
        this.ZFbackID = this.$route.query.ZFbackID || '';
        if (this.$route.query.typeId || this.$route.query.typeid) {
            this.typeid = this.$route.query.typeId || this.$route.query.typeid;
            this.fxmobile = this.$route.query.fxmobile;
        }
        if (this.$route.query.openfail === 1) {
            this.failreason = this.$route.query.failreason;
            this.opening = false;
            this.success = false;
            this.fail = true;
        } else {
            this.checkstatus();
            this.getStsData();
            this.getBackurl();
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.getNewWallet();
        // 查询有无领取过元券
        api.getWalletOpenPrizeInfo({
            activityId: 'ATY220330000840534',
            chnNo: '02',
            mobNo: this.mobile
        })
            .then((res) => {
                if (res.msgCd === 'BUS00000') {
                    // this.isModelShow = false;
                    console.log(1);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        basicCancel() {
            this.basicDialog.open = false;
        },
        basicConfirm() {
            this.$router.push({
                name: 'accountSign',
                query: {
                    typeId: this.typeid,
                    fxmobile: this.fxmobile,
                    orgCode: this.orgcode,
                    ZFbackID: this.ZFbackID
                }
            });
        },
        bottomGo() {
            window.location.href = 'https://wap.js.10086.cn/vw/WSCZYL';
        },
        gohome() {
            window.sessionStorage.removeItem('userInfo');
            if (this.ZFbackID) {
                setTimeout(() => {
                    window.location.href = `${this.gourl}?ORD_NO=${this.ZFbackID}`;
                }, 2000);
            } else {
                window.location.href = this.gourl;
            }
        },
        gokaihu() {
            if (this.$route.query.orgcode == 'BOCM') {
                console.log('zzzzzz');
                this.$router.push({
                    name: 'submitID',
                    query: {
                        typeId: this.typeid,
                        fxmobile: this.fxmobile,
                        orgCode: this.orgcode,
                        ZFbackID: this.ZFbackID
                    }
                });
                return;
            }
            this.$router.push({
                name: 'walletAccount',
                query: {
                    typeId: this.typeid,
                    fxmobile: this.fxmobile,
                    orgCode: this.orgcode,
                    ZFbackID: this.ZFbackID
                }
            });
        },
        getStsData() {
            if (!this.timer) {
                this.timer = setInterval(() => {
                    if (this.intervalIndex >= 20) {
                        this.opening = false;
                        this.success = false;
                        this.fail = false;
                        this.undetermined = true;
                        clearInterval(this.timer);
                        return;
                    }
                    this.intervalIndex += 5;
                    this.checkstatus();
                }, 5000);
            }
        },
        showBasicDialog(isShowDialog) {
            // 关闭交行活动弹框后，继续弹签约
            this.basicDialog.open = isShowDialog;
        },
        checkstatus() {
            const data = {
                orgCode: this.orgcode,
                mobile: this.mobile
            };
            api.getIndexCode(data)
                .then((res) => {
                    if (res.accountStatus === '01') {
                        // 已开户
                        if (this.orgcode == 'BOCM' && !store2.default.get('signAlready')) {
                            // 第一次开户 先弹活动
                            // if (this.isBannerShow) {
                            //     this.isActivityPopup = true;
                            //     this.opening = false;
                            //     this.success = true;
                            //     this.fail = false;
                            //     this.undetermined = false;
                            //     clearInterval(this.timer);
                            //     return;
                            // }
                            this.basicDialog.open = true;
                        } else if (this.orgcode == 'BOCM') {
                            // if (this.isBannerShow) {
                            //     // 弹活动
                            //     this.isActivityPopup = true;
                            // }
                        }
                        this.opening = false;
                        this.success = true;
                        this.fail = false;
                        this.undetermined = false;
                        clearInterval(this.timer);
                        if (!JSON.parse(window.sessionStorage.getItem('crpMobile'))) {
                            api.qrySmallChangeAcc({})
                                .then((data) => {
                                    data.list.forEach((res) => {
                                        if (res.orgCode == 'BOCM') {
                                            window.sessionStorage.setItem(
                                                'crpMobile',
                                                JSON.stringify(res.crpmobile)
                                            );
                                        }
                                    });
                                });
                        }
                    } else if (res.accountStatus === '03') {
                        // 已冻结
                        this.opening = false;
                        this.success = false;
                        this.fail = true;
                        this.undetermined = false;

                        clearInterval(this.timer);
                    } else if (res.accountStatus === '04') {
                        // 开户中
                        this.opening = true;
                        this.success = false;
                        this.fail = false;
                        this.undetermined = false;
                    } else if (res.accountStatus === '09') {
                        // 开户失败
                        this.opening = false;
                        this.success = false;
                        this.fail = true;
                        this.undetermined = false;

                        api.openResult({ orgCode: this.orgcode }).then(
                            (result) => {
                                if (result.errorMsg) {
                                    this.failreason = result.errorMsg;
                                }
                            }
                        );
                        clearInterval(this.timer);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if (err.msgCd !== 'BUS00000') {
                        if (err.msgCd === '-53') {
                            this.opening = false;
                            this.success = false;
                            this.fail = true;
                            this.undetermined = false;

                            this.failreason = '银行系统维护中，请次日重试';
                        } else {
                            this.opening = false;
                            this.success = false;
                            this.fail = true;
                            this.undetermined = false;

                            this.failreason = err.msgInfo;
                        }
                    }
                    clearInterval(this.timer);
                });
        },
        // 根据typeId获取返回地址
        getBackurl() {
            let testBody = '';
            if (
                process.env.VUE_APP_ENV == 'local'
              || process.env.VUE_APP_ENV == 'sit'
            ) {
                testBody = 'test';
            } else if (process.env.VUE_APP_ENV == 'prod') {
                testBody = 'pro';
            }
            api.getBackAddress({
                typeId: this.typeid,
                fxmobile: this.fxmobile,
                testBody, // 生产是pro,测试是test
                encryptParam: '',
                entryTx: ''
            })
                .then((data) => {
                    console.log(data);
                    if (data.resultObj) {
                        this.gourl = data.resultObj;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        goActivity(item) {
            this.$router.push({
                name: item.url
            });
        },
        goActivity2() {
            window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html';
        },
        // 重新获取钱包账户信息
        getNewWallet() {
            const changeList = [];
            api.qrySmallChangeAcc({ refreshFlag: '1' })
                .then((res) => {
                    // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                    const walletNum = Number(res.totalBalance).toFixed(2);
                    res.list.forEach((item) => {
                        if (
                            item.fullAccNbr
                            && item.defaultAccFlg === '01'
                            && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            changeList.unshift(item);
                        } else if (
                            item.fullAccNbr
                            && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            changeList.push(item);
                        }
                    });
                    store2.default.set('walletNum', walletNum);
                    store2.default.set('qbBankListsInfo', changeList);
                })
                .catch((err) => {
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        // 获取零元包状态
        getZero() {
            api.indexZero().then((res) => {
                if (res.firstOpenFlg == '0') {
                    this.zero = true;
                }
            });
        },
        // 去零元包
        goZero() {
            window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
        }
    }
};
</script>
<style lang="less" scoped>
.open-progress {
    width: 100%;
    height: 2.7rem;
    background: #fff;

    .progress-pic {
        width: 6.4rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        margin-bottom: 0.28rem;

        img {
            width: 0.79rem;
            height: 0.79rem;
            margin-top: 0.75rem;
        }

        div {
            width: 2rem;
            height: 0.04rem;
            background: #cdcdcd;
            border-radius: 0.05rem;
            margin-top: 0.7rem;
            margin-top: 0.7rem;
            margin-left: 0.05rem;
            margin-right: 0.05rem;
        }

        .actline {
            background: #0195ff;
        }
    }

    .txt-progress {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 6.4rem;
        margin: 0 auto;

        span {
            color: #999;
            font-size: 0.32rem;
        }

        .act-progress {
            color: #0195ff;
        }
    }
}

.opening-account {
    width: 100%;
    margin-top: 0.5rem;
    text-align: center;

    img {
        width: 1.25rem;
        height: 1.25rem;
        display: block;
        margin: 0 auto;
    }

    p:nth-of-type(1) {
        font-size: 0.4rem;
        color: #333;
        padding-top: 0.4rem;
        font-weight: 500;
    }

    .tip {
        font-size: 0.28rem;
        color: #888888;
        padding-top: 0.1rem;
    }
}

.open-acc-success,
.open-acc-fail {
    width: 100%;
    margin-top: 0.4rem;
    text-align: center;
}

.success-info {
    img {
        width: 1.24rem;
        height: 1.24rem;
        margin-bottom: 0.39rem;
        display: block;
        margin: 0 auto;
    }

    .h3 {
        color: #333;
        font-size: 0.4rem;
        margin-top: 0.39rem;
    }

    .h4 {
        color: #666;
        font-size: 0.28rem;
        margin-top: 0.2rem;
    }
}

.success-index {
    width: 5.1rem;
    height: 0.9rem;
    opacity: 1;
    background: #0195ff;
    border-radius: 0.1rem;
    display: block;
    color: #fff;
    text-align: center;
    line-height: 0.9rem;
    margin: 0 auto;
    margin-top: 0.69rem;
    margin-bottom: 30px;
    font-size: 0.36rem;
    text-decoration: none;
}

.success-ad {
    margin-top: 1rem;
    width: 100%;
    margin-bottom: 1rem;

    img {
        width: 6.9rem;
        margin: 0 auto;
        display: block;
        height: 2rem;
        margin-top: 0.2rem;
    }
}

.activityBox {
    background: #f6f5fa;
    padding-top: 34px;
    min-height: 700px;

    .center {
        background: #fff;
        padding-top: 30px;
        line-height: 1.5;
        .activeTitle::before{
          display: inline-block;
          content: '';
          width: 20px;
          height: 20px;
          background: #FFF4E0;
          transform: rotate(45deg);
          border-radius: 5px;
          margin-right: 30px;
        }
        .activeTitle::after{
          display: inline-block;
          content: '';
          width: 20px;
          height: 20px;
          background: #FFF4E0;
          transform: rotate(45deg);
          border-radius: 5px;
          margin-left: 30px;
        }
        p:first-of-type {
            font-size: 24px;
            color: #a4a4a4;
        }

        p:last-of-type {
            color: #A83512;
            margin-bottom: 10px;
            font-size: 32px;
            font-weight: 600;
        }

        .rightBox {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            padding-bottom: 40px;
            margin-top: 20px;
            .item {
                width: 642px;
                height: 154px;
                background: url("../../assets/images/openResult/right_item_bg.png") no-repeat;
                background-size: 100%;
                border-radius: 5px;
                padding: 40px 40px 40px 480px;
                box-sizing: border-box;
                display: flex;
                align-items: center;

                p {
                    color: #a4a4a4;
                    font-size: 24px;
                    font-weight: 400;
                }

                .title {
                    font-size: 30px;
                    color: #000;
                    span {
                        color: #ec4f36;
                        font-weight: 600;
                        font-size: 38px;
                    }
                }

                .btn {
                    width: 116px;
                    height: 46px;
                    background-image: linear-gradient(266deg, #f49a67 0%, #ea693e 100%);
                    color: #fff;
                    line-height: 46px;
                    border-radius: 30px;
                    font-size: 22px;
                }
            }
        }
    }

    .bottom {
        width: 100%;
        height: 186px;
        background: url("../../assets/images/openResult/bottom.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 34px;
        margin-bottom: 100px;
        position: relative;

        img {
            width: 168px;
            height: 51px;
            position: absolute;
            top: 70px;
            left: 500px;
        }
    }
}

.model {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, 0.5);

    .content {
        width: 596px;
        height: 710px;
        background: url("../../assets/images/openResult/tankuang.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: 245px;
        left: 50%;
        transform: translateX(-50%);

        .btn {
            width: 343px;
            height: 80px;
            background: #ef522c;
            border-radius: 47px;
            position: relative;
            text-align: center;
            font-size: 36px;
            color: #fff;
            line-height: 80px;
            top: 580px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
.zeroBox {
    width: 750px;
    height: 188px;
    margin: 36px auto 0;
    background: url("~@/assets/images/newBanks/fiveYuan.png") no-repeat;
    background-size: 100% 100%;
}
</style>
