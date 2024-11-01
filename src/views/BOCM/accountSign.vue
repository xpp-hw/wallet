<template>
    <div>
        <div class="container walletsign" id="container">
            <div class="account-index-wrapper">
                <div class="walletsign-info">
                    <p>签约账号</p>
                    <hr>
                    <p>签约手机号 <span>{{showmob}}</span></p>
                    <p>签约卡号 <span>{{accNbr}}</span></p>
                </div>
                <p class="sign-note">此手机号为您当前登录手机号，签约成功后，即可使用当前手机号查看钱包账户</p>
                <div class="checkBox">
                    <label>
                        <p :class="isGou ? 'check' : 'checkOff' " @click="check()"></p>
                    </label>
                    <p>我已阅读并同意<span style="color: #1B7AEE;"><a href="javascript: ;" @click="goXieyi(1)">《交通银行股份有限公司标准个人电子支付业务开通协议》</a></span></p>
                </div>
                <button :class="checkSubmit ? 'getcode' : 'getcode_lock'" :disabled="noClick" id="A02" @click="getcode">{{smsMsg}}</button>
                <!-- <p class="bottom-logo">移动钱包</p> -->
                <div class="loading-toast" id="isZqq" v-if="loading">
                    <img src="@/assets/images/loading-toast.gif" alt="">
                </div>
                <!-- 短信验证码 -->
                <div class="infor_container" v-if="inforShow">
                    <div class="infor_box">
                        <p class="infor_title">您正在操作钱包账户签约</p>
                        <p class="title_note">请输入短信验证码</p>
                        <p class="infor_mobile">
                        已发送短信验证码至<i>{{ crpMobile }}</i>
                        </p>
                        <div class="mobile_box">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <input type="text" v-model="smsCode" class="infor_ipt" maxlength="6" />
                        </div>
                        <button type="button" class="infor_djs" :disabled="send" @click="userDetermine()">
                        重新获取 {{ countdown }}s
                        </button>
                        <div class="infor_buttons">
                            <p class="infor_not" id="A03" @click="inforShow = false">取消</p>
                            <p class="infor_sure" id="A04" :class="btnconfirm ? 'unbtn':''" @click="checkInfor">确定</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';

export default {
    name: 'accountSign',
    components: {
        mdHeader
    },
    data() {
        return {
            noClick: false,
            signMsgMerTranNo: '',
            accNbr: '',
            fullAccNbr: '',
            accountType: '',
            fullCrpName: '',
            checkSubmit: false,
            isGou: false,
            mobile: '',
            showmob: '',
            crpMobile: '',
            inforShow: false,
            // 倒计时秒数
            countdown: 60,
            // 定时器
            timer: null,
            smsMsg: '获取验证码',
            // 发送按钮可否点击
            send: false,
            smsCode: '',
            loading: false,
            btnconfirm: true,
            smsjrn: '', // 短信下发时会返回短信流水
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_WALLETSIGN_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_WALLETSIGN_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLET_WALLETSIGN_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_WALLET_WALLETSIGN_A04'
                }
            ],
            typeid: '',
            acctyp: ''
        };
    },
    watch: {
        smsCode: {
            handler(val) {
                this.btnconfirm = !(val && val.length === 6);
            }
        }
    },
    mounted() {
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
        }
        document.body.style.backgroundColor = '#f5f5f5';
        if(store2.default.get('isFalseSign')){
            this.isGou = true;
            store2.default.remove('isFalseSign');
            this.checkBtn();
        }
    },
    created() {
        this.acctyp = this.$route.query.acctyp || '';
        this.mobile = store2.default.get('usrmob');
        this.queryBankTyp()
        this.queryAccount()
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.queryCrpmobile()
        this.showmob = this.mobile.slice(0,3) + "****" + this.mobile.slice(7,11)
    },
    methods: {
        queryCrpmobile() {
            if(!JSON.parse(window.sessionStorage.getItem("crpMobile"))) {
                api.qrySmallChangeAcc({})
                .then(data => {
                    data.list.forEach(res => {
                        if(res.orgCode == "BOCM") {
                            window.sessionStorage.setItem(
                                "crpMobile",
                                JSON.stringify(res.crpmobile)
                            )
                            this.crpMobile = res.crpmobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                        }
                    })
                })
            } else {
                this.crpMobile = JSON.parse(window.sessionStorage.getItem("crpMobile")).replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
            }
        },
        queryAccount() {
            if(store2.default.get('qbBankListsInfo') && store2.default.get('qbBankListsInfo').length > 0) {
                store2.default.get('qbBankListsInfo').forEach(data => {
                    console.log(data)
                    if(data.orgCode == "BOCM") {
                        this.accNbr = data.accNbr;
                        this.fullAccNbr = data.fullAccNbr;
                        this.fullCrpName = data.fullCrpName;
                    }
                })
            } else if(!store2.default.get('qbBankListsInfo') || store2.default.get('qbBankListsInfo').length < 1) {
                api.qrySmallChangeAcc({})
                .then(data => {
                    console.log("++++++++++",data)
                    data.list.forEach(res => {
                        if(res.orgCode == "BOCM") {
                            this.accNbr = res.accNbr;
                            this.fullAccNbr = res.fullAccNbr;
                            this.fullCrpName = res.fullCrpName;
                        }
                    })
                })
                .catch(err => {
                })
            }
        },
        queryBankTyp() {
            api.banksApi.queryBankType({
                accNo: this.fullAccNbr
            })
            .then(res => {
                console.log(res);
                if(res.fbankCardType == "借记卡") {
                    this.accountType = "DEBITCARD"
                } else {
                    this.accountType = "CREDITCARD"
                }
            })
        },
        checkBtn() {
            if(this.isGou) {
                this.checkSubmit = true;
            } else {
                this.checkSubmit = false;
            }
        },
        goXieyi(a) {
            this.$store.commit("bcmSign", true);
            this.$router.push({
                name: "comprehensive",
                query: {
                    ...this.$route.query,
                    orShowQi: false,
                    orShow: false,
                    bcmShow: false,
                    signShow: true,
                    val: a,
                },
            });
        },
        check() {
            if(store2.default.get('signxieyi')) {
                this.isGou = !this.isGou;
                this.checkBtn();
            } else {
                this.goXieyi(1)
            }
        },
        getcode() {
            // this.loading = true;
            this.$store.commit("LOADING",true);
            this.noClick = true;
            api.BOCM.SMS({
                // accountName: this.fullCrpName,
                // accountName: "涵燕郑佩",
                // accountNo: this.fullAccNbr,
                // accountNo: "6222620111000107739",
                mobileNo: this.mobile,
                // mobileNo: "18625415191",
                // mobileNo: "13867200235",
                // certType: "IDENTITY",
                // certNo: "360322198706178146",
                // accountType: this.accountType,
                // tranScene: "B2C-API-BOCOM",
                // shareMode: "01"
            })
                .then((data) => {
                    this.$store.commit("LOADING",false);
                    console.log(data);
                    this.userDetermine();
                    this.smsjrn = data.smstjn;
                    this.inforShow = true;
                    this.signMsgMerTranNo = data.signMsgMerTranNo
                })
                .catch((err) => {
                    this.$store.commit("LOADING",false);
                    this.noClick = false;
                    if (err.msgCd !== 'BUS00000') {
                        this.$toast.info(err.msgInfo);
                        if (err.msgCd === 'BUS20017') {
                            // 用户未登录，跳转登录
                        }
                    }
                });
        },
        userDetermine() {
            if (!this.timer) {
                this.getValidStr();
                this.timer = setInterval(this.getValidStr, 1000);
            }
        },
        getValidStr() {
            if (this.countdown > 0 && this.countdown <= 60) {
                this.countdown -= 1;
                if (this.countdown !== 0) {
                    this.send = true;
                    this.smsMsg = `${this.countdown}秒后重新获取`;
                } else {
                    clearInterval(this.timer);
                    this.send = false;
                    this.countdown = 60;
                    this.smsMsg = '获取验证码';
                    this.timer = null;
                    this.noClick = false;
                }
            }
        },
        checkInfor() {
            this.btnconfirm = true;
            if (this.smsCode.length === 6) {
                api.BOCM.Signed({
                    // accountNo: this.fullAccNbr,
                    // accountNo: "6222601010023962828",
                    mobileNo: this.mobile,
                    // mobileNo: "18625415191",
                    // accountType: this.accountType,
                    // certType: "IDENTITY",
                    // certNo: "320830199908190818",
                    // certNo: "230103199212185691",
                    // accountName: this.fullCrpName,
                    // accountName: "夏冬贰参伍",
                    signMsgText: this.smsCode,
                    // msgNo: "146001"
                    signMsgMerTranNo: this.signMsgMerTranNo
                })
                    .then((data) => {
                        console.log(data);
                        if(data.msgCd == "BUS00000") {
                            this.$router.push(
                                {
                                    name: 'signResult',
                                    query: {
                                        result: "1",
                                        typeId: this.typeid
                                    }
                                }
                            );
                        } else {
                            this.$router.push(
                                {
                                    name: 'signResult',
                                    query: {
                                        result: "0",
                                        reason: data.msgInfo,
                                        typeId: this.typeid
                                    }
                                }
                            );
                        }
                    })
                    .catch((err) => {
                        if (err.msgCd === 'BUS20017') {
                            // 用户未登录，跳转登录
                        } else {
                            // if (err.msgInfo.indexOf('短信') !== -1 || err.msgInfo.indexOf('验证码') !== -1) {
                            //     this.$toast.info(err.msgInfo);
                            // } else {
                            //     this.$router.push(
                            //         {
                            //             name: 'walletSignResult',
                            //             query: {
                            //                 result: 1,
                            //                 reason: err.msgInfo
                            //             }
                            //         }
                            //     );
                            // }
                            this.$router.push(
                                {
                                    name: 'signResult',
                                    query: {
                                        result: "0",
                                        reason: err.msgInfo,
                                        typeId: this.typeid
                                    }
                                }
                            );
                        }
                    });
            }
        }
    }
};
</script>

<style scoped lang="less">
.walletsign-info{
    width: 650px;
    height: 288px;
    margin: 24px auto 0;
    padding: 0 25px;
    border-radius: 10px;
    background:#fff;
    overflow: hidden;
}
.walletsign-info p:nth-of-type(1){
    font-size:.36rem;
    color:#333;
    font-weight:600;
    margin: 38px 0 20px 0;
    line-height: 50px;
}
.walletsign-info p:nth-of-type(2) {
    font-size:.28rem;
    color:#333;
    margin: 40px 0 30px 0;
    line-height: 40px;
}
.walletsign-info p:nth-of-type(3) {
    font-size:.28rem;
    color:#333;
    line-height: 40px;
}
.walletsign-info p:nth-of-type(2) span {
    padding-left:.4rem;
}
.walletsign-info p:nth-of-type(3) span {
    padding-left:.66rem;
}
.sign-note{
    width:6.87rem;
    margin:0 auto;
    font-size:.28rem;
    color:#6A7693;
    line-height:1.5;
    padding-top:.4rem;
}
.checkBox {
    display: flex;
    margin: 47px 0 0 30px;
    color: #979899;
    font-size: 24px;
    a {
        color: #1B7AEE;
    }
}
.checkOff {
    width: 30px;
    height: 30px;
    background: url("../../assets/images/check-off.png") no-repeat;
    background-size: 100%;
    margin-right: 10px;
    margin-top: -2px;
    border-radius: 50%;
}
.check {
    width: 30px;
    height: 30px;
    background: url("../../assets/images/check-on.png") no-repeat;
    background-size: 100%;
    margin-right: 10px;
    margin-top: -2px;
    border-radius: 50%;
}
.getcode{
    position: fixed;
    bottom:1.7rem;
    left:50%;
    transform: translateX(-50%);
    width:6.6rem;
    height:1rem;
    background:#0195ff;
    border-radius:.5rem;
    color:#fff;
    font-size:.36rem;
    border:none;
}
.getcode_lock{
    position: fixed;
    bottom:1.7rem;
    left:50%;
    transform: translateX(-50%);
    width:6.6rem;
    height:1rem;
    background:#CBCCD0;
    border-radius:.5rem;
    color:#fff;
    font-size:.36rem;
    border:none;
    pointer-events: none;
}
.bottom-logo{
    position: fixed;
    bottom:.82rem;
    text-align:center;
    color:#d7d7d7;
    font-size:.36rem;
    width:100%;
}
.infor_container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
    .infor_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 6.9rem;
        background: #ffffff;
        border-radius: 0.15rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        box-sizing: border-box;
    }
    .infor_title {
        font-size: 0.3rem;
        color: #333333;
        padding-top: 0.4rem;
        padding-bottom: 0.2rem;
        border-bottom: 0.02rem solid #e4e4e4;
        margin-bottom: 0.2rem;
    }
    .title_note{
        font-size: 0.4rem;
        color: #333333;
        font-weight: 700;
        padding-top: 0.2rem;
        margin-bottom: 0.2rem;
    }
    .infor_mobile {
        font-size: 0.3rem;
        color: #999999;
        i{
            font-style: normal;
        }
    }
    .mobile_box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 0.8rem;
        margin-bottom: 0.2rem;
        margin-top:.2rem;
        p {
            width: 0.82rem;
            height: 0.6rem;
            font-size: 0.32rem;
            color: #000000;
            text-align: center;
            border-bottom: 0.02rem solid #dbdbdb;
            margin: 0 0.1rem;
        }
    }
    .infor_ipt {
        position: absolute;
        left: 0;
        top: 0;
        width: 108%;
        height: 100%;
        border: 0;
        outline: none;
        font-size: 0.32rem;
        color: #000000;
        letter-spacing: 0.85rem;
        text-indent: 0.5rem;
        background: transparent;
        z-index: 46;
        color: transparent;
        caret-color: transparent;
        text-shadow: 0 0 0 #000;
    }
    .infor_main {
        width: 100%;
    }

    .infor_bototm {
        width: 100%;
        height: 0.76rem;
    }
    .infor_djs {
        font-size: 0.24rem;
        color: #999999;
        border: 0;
        background: none;
        display: block;
        margin-bottom: 0.2rem;
    }
    .infor_buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 0.35rem;
        padding-top: 0.15rem;
        p {
            width: 2.9rem;
            height: 0.82rem;
            border-radius: 0.15rem;
            font-size: 0.36rem;
            text-align: center;
            line-height: 0.82rem;
        }
        .infor_not {
            color: #999999;
            background: #ffffff;
            border: 0.02rem solid #828282;
        }

        .infor_sure {
            color: #ffffff;
            background: #238ff2;
        }
        .unbtn{
            background: #8ec4f6;
            pointer-events:none;
        }
    }
}
.loading-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 1.2rem;
    z-index: 999;
    border: 999px solid transparent;
}
</style>
