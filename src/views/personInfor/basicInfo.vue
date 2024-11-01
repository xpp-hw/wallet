<template>
    <div :style="{ display: 'block' }" class="concent" style="display: none">
        <md-field>
            <md-cell-item title="昵称">
                <span slot="right" class="ellipsis">{{ userName }}</span>
            </md-cell-item>
            <!-- 后续做支付密码功能时再上 -->
            <md-cell-item
                v-if="jy === '1' && IsPassword !== 3"
                :title="IsPassword == 1 ? '支付密码' : '支付密码设置'"
                arrow
                @click="therePassword"
            >
                <span slot="right" class="ellipsis">{{ email }}</span>
            </md-cell-item>

            <md-cell-item arrow title="常见问题" @click="goproblem">
                <span slot="right" class="ellipsis">{{ email }}</span>
            </md-cell-item>
            <md-cell-item v-if="jy === '1' && myBanks.length > 0" arrow title="电子账户销户" @click="goxh">
                <span slot="right" class="ellipsis">{{ email }}</span>
            </md-cell-item>

            <md-cell-item v-if="callStatus" arrow title="关闭话费宝" @click="goClose"></md-cell-item>
            <md-cell-item v-if="isShowSet" arrow title="设置默认电子账户" @click="$router.push({ name: 'looseChange' })"></md-cell-item>
            <!--        //小宝花-->
            <md-cell-item v-if="babyFlower" arrow title="关闭小宝花" @click="isCloseBaby=true">
                <span slot="right" class="ellipsis">{{ email }}</span>
            </md-cell-item>
<!--            //流量宝-->
            <md-cell-item  v-if="callStatusGB" arrow title="关闭流量宝" @click="goCloseGB">
                <span slot="right" class="ellipsis">{{ email }}</span>
            </md-cell-item>
            <!--        -->
        </md-field>
        <!-- 点击零钱销户提示 -->
        <md-popup v-model="noCanCancel">
            <div class="tipsModel">
                <div class="loseTitle">温馨提示</div>
                <p> 您存在话费宝账户未关闭，无法进行销户操作。 如需继续操作，请先关闭话费宝哦~</p>
                <md-button size="small" type="default" @click="noCanCancel = false">知道了</md-button>
            </div>
        </md-popup>
        <md-popup v-model="noCanCancelGB">
            <div class="tipsModel">
                <div class="loseTitle">温馨提示</div>
                <p> 您存在流量宝账户未关闭，无法进行销户操作。 如需继续操作，请先关闭流量宝哦~</p>
                <md-button size="small" type="default" @click="noCanCancelGB = false">知道了</md-button>
            </div>
        </md-popup>
        <md-popup v-model="noGetReactive">
            <div class="tipsModel">
                <div class="loseTitle">温馨提示</div>
                <p>您的话费宝账户存在话费未领取！</p>
                <div class="btnCont">
                    <md-button size="small" type="default" @click="giveupReactive">放弃领取</md-button>
                    <md-button size="small" type="default" @click="GetReactive">马上领取</md-button>
                </div>
            </div>
        </md-popup>
        <md-popup v-model="noGetReactiveGB">
            <div class="tipsModel">
                <div class="loseTitle">温馨提示</div>
                <p>您的流量宝账户存在流量未领取！</p>
                <div class="btnCont">
                    <md-button size="small" type="default" @click="giveupReactiveGB">放弃领取</md-button>
                    <md-button size="small" type="default" @click="GetReactiveGB">马上领取</md-button>
                </div>
            </div>
        </md-popup>
        <md-popup v-model="isCloseCall">
            <div class="tipsModel">
                <div class="loseTitle">温馨提示</div>
                <p>确认关闭话费宝账户吗？</p>
                <div class="btnCont">
                    <md-button size="small" type="default" @click="closeCall">确认</md-button>
                    <md-button size="small" type="default" @click="isCloseCall = false">取消</md-button>
                </div>
            </div>
        </md-popup>
        <md-popup v-model="isCloseGB">
            <div class="tipsModel">
                <div class="loseTitle">温馨提示</div>
                <p>确认关闭流量宝吗？</p>
                <div class="btnCont">
                    <md-button size="small" type="default" @click="closeCall">确认</md-button>
                    <md-button size="small" type="default" @click="isCloseGB = false">取消</md-button>
                </div>
            </div>
        </md-popup>

        <md-popup v-model="cancleOnlyCMB">
            <div class="tipsModel">
                <div class="loseTitle">温馨提示</div>
                <p style="text-align:left;">您当前的钱包开户机构来源于招商银行，请使用{{phoneNum}}登录招商银行APP，进入【我的】-【银行卡】-【联名钱包】-【移动钱包】，点击【注销】进行销户。</p>
                <div class="btnCont">
                    <md-button size="small" type="default" @click="cancleOnlyCMB = false">知道了</md-button>
                </div>
            </div>
        </md-popup>
        <!--        //小宝花-->
        <md-popup v-model="isCloseBaby">
            <div class="tipsModel">
                <div class="loseTitle">温馨提示</div>
                <p>确认关闭小宝花账户吗？</p>
                <div class="btnCont">
                    <md-button size="small" type="default" @click="isCloseBaby = false">取消</md-button>
                    <md-button size="small" type="default" @click="closeBaby">确认</md-button>
                </div>
            </div>
        </md-popup>
        <!--        -->
        <check-code-model v-if="showCodeCheck" :Hfbtype="Hfbtype" @closeCodeModel="closeCodeModel"></check-code-model>
        <check-code-modelGB v-if="showCodeCheckGB" :Hfbtype="'02'" @closeCodeModel="closeCodeModelGB"></check-code-modelGB>
        <getCode v-if="showBabyCode" :Hfbtype="baby" @closeCodeModel="close"></getCode>
        <div class="tips">移动钱包</div>
    </div>
</template>

<script>
// import mdHeader from '@/components/mdHeader';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import checkCodeModel from '@/components/checkCodeModel.vue';
import checkCodeModelGB from '@/views/traffic/checkCode.vue';
import getCode from '@/views/babyFlower/getCode.vue';

export default {
    name: 'basicInfo',
    components: {
        checkCodeModel,
        getCode,
        checkCodeModelGB
    },
    data() {
        return {
            isCloseGB: false,
            phoneNum: '',
            imageUrl: require('@/assets/images/persioninfo/avatar.png'),
            userName: '',
            userLevel: '',
            mobileNo: '',
            email: '',
            emailVal: false,
            jy: '0',
            ifxh: '',
            IsPassword: '',
            title: 1,
            callStatus: false, // 话费宝开启状态
            callStatusGB: false,
            noCanCancel: false,
            noCanCancelGB: false,
            noGetReactive: false,
            noGetReactiveGB: false,
            isCloseCall: false,
            showCodeCheck: false, // 验证码弹框开启状态
            showCodeCheckGB: false, // 验证码弹框开启状态
            Hfbtype: '02',
            isShowSet: false,
            usrmob: '',
            myBanks: [],
            mySHubi: [],
            cancleOnlyCMB: false, // 只有招商账户，零钱销户时的提示
            isShowDigiShow: false,
            babyFlower: false, // 有无小宝花
            isCloseBaby: false,
            showBabyCode: false,
            baby: '02'
        };
    },
    created() {
        this.usrmob = store2.default.get('usrmob') || '';
        this.userName = store2.default.get('nickname') || '';
        this.phoneNum = store2.default.get('usrmob').replace(/(\d{3})\d*(\d{4})/, '$1****$2');
        // this.getDigiStatue();
    },
    mounted() {
        // this.personalDetailsQry();
        this.jy = this.$route.query.jyparams;
        this.ifxh = this.$route.query.pfparams;
        this.isShowSet = this.$route.query.isShowSet === '01';

        this.myBanks = this.$route.query.banks.split(',')
            .filter(item => item !== 'ICBC-DIGICCY');
        this.mySHubi = this.$route.query.banks.split(',')
            .filter(item => item === 'ICBC-DIGICCY');
        if (this.jy === '1') {
            // 查询用户是否设置支付密码
            api.paymentApi
                .StatusQuery({
                    entryTx: '',
                    mobileNo: this.usrmob // store2.default.get("usrmob");
                })
                .then((data) => {
                    console.log(data.pwdsts, '支付密码状态');
                    if (data.pwdsts === '00') {
                        this.IsPassword = 2;
                    } else if (data.pwdsts === '01') {
                        this.IsPassword = 1;
                    } else if (data.pwdsts === '02') {
                        this.IsPassword = 1;
                        this.$toast.info('您的密码已锁定', 3000);
                    } else if (data.pwdsts === '03') {
                        this.IsPassword = 1;
                        this.$toast.info('您的密码已冻结', 3000);
                    }
                })
                .catch((err) => {
                    if (err.pwdsts === null) {
                        this.IsPassword = 3;
                        this.$toast.info(err.msgInfo, 3000);
                    }
                });
        }
        // 获取话费宝状态
        api.hfb.qualificationChk({
            entryTx: '',
            mobileNo: this.usrmob
        })
            .then((res) => {
                if (res.code === '02') {
                    this.callStatus = true;
                } else {
                    this.callStatus = false;
                }
            });
        // 流量宝开通
        api.llb.discharge()
            .then((res) => {
                // console.log(res.code);
                if (res.code === '02') {
                    this.callStatusGB = true;
                } else {
                    this.callStatusGB = false;
                }
            });
        // 查询有无小宝花
        api.accountInfoQuery()
            .then((res) => {
                this.babyFlower = true;
                console.log(res);
            })
            .catch((err) => {
                this.babyFlower = false;
            });
    },
    methods: {
        goproblem() {
            this.$router.push({
                name: 'problemDetail'
            });
        },
        goxh() {
            if (this.callStatus) {
                this.noCanCancel = true;
            } else if (this.callStatusGB) {
                this.noCanCancelGB = true;
            } else {
                // 零钱销户，根据不同账户信息判断
                this.myBanks = this.myBanks.filter(item => item !== 'ICBC-DIGICCY');
                console.log(this.myBanks);
                if (this.myBanks.length === 1 && this.myBanks[0].toUpperCase() === 'CMB') {
                    this.cancleOnlyCMB = true;
                } else if (this.myBanks.length === 1 && this.myBanks[0].toUpperCase() === 'SPDB') {
                    this.$router.push({
                        name: 'accountCancellation',
                        query: {
                            orgCode: this.myBanks[0].toUpperCase()
                        }
                    });
                } else {
                    this.$router.push({
                        name: 'looseWallet'
                    });
                }
            }
        },
        therePassword() {
            if (this.IsPassword == 1) {
                console.log(this.IsPassword);
                this.$router.push({
                    name: 'changePassword'
                });
            } else if (this.IsPassword == 2) {
                console.log(this.IsPassword);
                this.$router.push({
                    path: `/setPassword/${this.title}`
                });
            } else if (this.IsPassword == 3) {
                console.log('状态查询失败');
            }
        },
        // 关闭话费宝弹框
        goClose() {
            api.hfb.initInfo()
                .then((res) => {
                    if (res.pendingIncome > 0) {
                        // 有余额
                        this.noGetReactive = true;
                    } else {
                        // 没有余额
                        this.showCodeCheck = true;
                        // this.isCloseCall = true;
                    }
                });
        },
        //
        goCloseGB() {
            api.llb.initInfo()
                .then((res) => {
                    console.log(res.lastFlow);
                    if (res.lastFlow > 0) {
                        // 有余额
                        console.log('you');
                        this.noGetReactiveGB = true;
                    } else {
                        // 没有余额
                        console.log('没有');
                        this.showCodeCheckGB = true;
                        // this.isCloseCall = true;
                    }
                });
        },
        // 放弃领取
        giveupReactive() {
            this.noGetReactive = false;
            this.showCodeCheck = true;
            // this.isCloseCall = true;
        },
        giveupReactiveGB() {
            this.noGetReactiveGB = false;
            this.showCodeCheckGB = true;
            console.log('‘关闭流量宝’');
            // this.isCloseCall = true;
        },
        // 短信验证
        closeCodeModel(val) {
            this.showCodeCheck = false;
            if (val === 'succ') {
                // 验证通过，已关闭话费宝
                this.callStatus = false;
            }
        },
        // 短信验证
        closeCodeModelGB(val) {
            this.showCodeCheckGB = false;
            if (val === 'succ') {
                // 验证通过，已关闭话费宝
                this.callStatusGB = false;
            }
        },
        // 马上领取
        GetReactive() {
            this.noGetReactive = false;
            this.$router.push({
                name: 'viewBenefits'
            });
        },
        // 马上领
        GetReactiveGB() {
            this.noGetReactiveGB = false;
            window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicHome?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
        },
        // 关闭话费宝
        closeCall() {
            // api.hfb.closePin().then(() => {
            //     this.callStatus = false;
            //     this.isCloseCall = false;
            //     this.$toast.info('关闭话费宝成功');
            // }).catch((err) => {
            //     this.$toast.info(err.msgInfo);
            // });
        },
        getDigiStatue() {
            api.digiccyApi.getInfo()
                .then((res) => {
                    this.usrmob = res.data.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                    if (res.data.walletStatus === '1') {
                        // 已开户
                        this.isShowDigiShow = true;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.$toast.info(err.msgInfo);
                });
        },
        // 关闭小宝花
        closeBaby() {
            this.isCloseBaby = false;
            this.showBabyCode = true;
            console.log(1);
        },
        close(val) {
            this.showBabyCode = false;
            if (val === 'succ') {
                // 验证通过，已关闭话费宝
                this.babyFlower = false;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.concent {
    /deep/ .md-field {
        font-size: 32px;
        padding: 0;
        min-width: 0;

        .md-field-content {
            .md-cell-item {
                margin: 0 30px;

                .md-cell-item-body {
                    min-height: 120px;
                    padding-top: 0;
                    padding-bottom: 0;

                    .md-cell-item-content {
                        color: #000;
                        font-size: 30px;
                        flex: none;
                    }

                    .md-cell-item-right {
                        min-width: 0;
                        flex: 1 1 0;
                        font-size: 26px;
                        height: 120px;
                        line-height: 120px;
                        margin-left: 0;
                        padding: 0 0 0 100px;

                        .ellipsis {
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }

                        .headImg {
                            width: 63px;
                            height: 63px;
                            object-fit: contain;
                            border-radius: 50%;
                        }

                        .starImg {
                            width: 30px;
                            height: 30px;
                            margin-left: 8px;
                        }
                    }
                }

                .md-cell-item-body:before {
                    border-bottom: 1px solid #f2f2f2;
                }
            }
        }
    }

    .tips {
        width: 300px;
        height: 50px;
        opacity: 1;
        font-size: 36px;
        font-weight: 500;
        text-align: center;
        color: #d2d2d2;
        line-height: 50px;
        margin: 519px auto 0px;
    }
}

.tipsModel {
    width: 6rem;
    background-color: #fff;
    border-radius: 10px;
    padding: .3rem;

    .loseTitle {
        width: 100%;
        height: .6rem;
        text-align: center;
        line-height: .4rem;
        font-size: .38rem;
        text-align: center;
        border-bottom: 0.01rem solid #E1E1E1;
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
