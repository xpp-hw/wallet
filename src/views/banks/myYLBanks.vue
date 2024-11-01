<template>
    <div class="contains">
        <pull-refresh :isrefresh="isrefresh" @refresh="getYLnwewBank">
            <div class="mainContain">
                <div class="bindingCard">
                    <div class="bindingTitle">
                        我的卡 <span>（共{{ bankData.length }}张）</span>
                    </div>
                    <div
                        v-for="(item, index) in bankData"
                        :id="index > 8 ? 'F' + (index + 1) : 'F0' + (index + 1)"
                        :key="index"
                        class="bindingImg"
                        @click="changeBankStatus(item)"
                    >
                        <img
                            :src="item.backImage ? item.backImage : defaultBg"
                            alt=""
                            class="bankImg"
                        />
                        <div class="imgCont">
                            <img :src="item.logoImage" alt="" />
                            <span>{{ item.bnknm }}</span>
                        </div>
                        <div class="text">
                            <p>
                                <span class="name">{{ item.bnknm }}</span
                                >{{ item.cardtyp }}
                            </p>
                            <p>{{ item.cardno }}</p>
                        </div>
                    </div>
                    <!-- <div v-if="bankData.length === 0" class="noBank"  @click="addBank">
                        <div class="cont">
                            <p class="title">南京银行N Card银联信用卡</p>
                            <p>首次绑定充话费随机送10-30元</p>
                        </div>
                        <div class="btn">去绑定</div>
                    </div> -->
                </div>
                <!-- <div id="B01" class="addBank" @click="addBank">
                    <div v-if="bankData.length == 0" class="jiaobiao"></div>
                </div> -->

                <!-- <div class="newCard pdd">
                    <p class="title">新办卡享优惠</p>
                    <div class="cardBg bg1">
                        <div class="card card1"></div>
                        <div class="detail">
                            <p>江苏银行联名信用卡</p>
                            <p>领300元话费流量</p>
                        </div>
                        <div class="btn" @click="goReceive(1)"></div>
                    </div>
                    <div class="cardBg bg3">
                        <div class="card card3"></div>
                        <div class="detail">
                            <p>宁波银行联名信用卡</p>
                            <p>新客办卡得500元权益</p>
                        </div>
                        <div class="btn" @click="goReceive(3)"></div>
                    </div>
                </div> -->
                <!-- <div class="bottom">
                    <p
                        id="B06"
                        class="problem"
                        @click="$router.push({ name: 'problemDetail' })"
                    >
                        常见问题
                    </p>
                </div> -->
            </div>
        </pull-refresh>

        <!-- 删除银联绑定的银行卡 -->
        <md-popup
            v-model="defaultDeleteShow"
            class="defaultAnddelete"
            position="bottom"
        >
            <div class="pouContain">
                <div
                    id="B02"
                    class="setDefault"
                    style="text-align: center"
                    @click="orbabay"
                >
                    解除绑定
                </div>
                <div
                    id="B03"
                    class="deleteBank"
                    style="text-align: center"
                    @click="noUnBindCard"
                >
                    取消
                </div>
            </div>
        </md-popup>
        <!-- 删除银行卡输入手机号 -->
        <md-dialog
            :id="msgDialog.btns.id"
            v-model="msgDialog.open"
            :btns="msgDialog.btns"
            :closable="false"
            class="msgDialog"
            title="请输入短信验证码"
        >
            <p class="msgTips">已发送至开户银行卡预留手机号</p>
            <!--            <md-codebox v-model="msgCode" :mask="false" :maxlength="4" system />-->
            <div
                style="
                    height: 0.75rem;
                    margin-top: 20px;
                    border-radius: 5px;
                    border: 1px solid #ededed;
                    position: relative;
                    width: 90%;
                    margin: 20px auto;
                "
            >
                <input
                    class="removeNumStyle"
                    style="
                        width: 50%;
                        height: 95%;
                        border: none;
                        padding-left: 10px;
                        padding-top: 1px;
                        border-top-left-radius: 30px;
                    "
                    type="number"
                    novalidate="novalidate"
                    pattern="[0-9]*"
                    v-model="msgCode"
                    oninput="if(value.length>4)value=value.slice(0,4)"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                />

                <md-button
                    class="smsBtn"
                    style="
                        width: 42%;
                        height: 100%;
                        display: inline-block;
                        border-radius: 0;
                        box-sizing: border-box;
                        border-top-right-radius: 5px;
                        border-bottom-right-radius: 5px;
                        position: absolute;
                        right: 0;
                    "
                    :type="!attcode ? 'default' : 'disabled'"
                    :style="buttonStyle ? '{color:#fff}' : '{color: #238ff2}'"
                    @click="getTimeOutShow"
                    >{{ errorTips }}
                </md-button>
            </div>
            <!--            <div class="voice">收不到短信验证码？点击试试<span :class="{blue:!attcode}" @click="getVideShow">语音验证码</span></div>-->
            <!--            <button-->
            <!--                :disabled="attcode"-->
            <!--                class="errorTips"-->
            <!--                @click="getTimeOutShow"-->
            <!--            >-->
            <!--                {{ errorTips }}-->
            <!--            </button>-->
        </md-dialog>
        <div v-if="babyPop" class="babyPopup">
            <div class="box">
                <div class="top">温馨提示</div>
                <div class="mid">
                    当前的账户是"小宝花"付款的主账户，删除后将无法付款，确认是否进行删除？
                </div>
                <div class="bottom">
                    <div class="left" @click="noUnBindCard">取消</div>
                    <div class="right" @click="unBindCard">确认</div>
                </div>
            </div>
        </div>
        <babycheck
            v-if="babyGetCode"
            :Hfbtype="'02'"
            @closeCodeModel="closeCodeModel"
        ></babycheck>
    </div>
</template>

<script>
import Header from '@/components/header';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import pullRefresh from '@/components/pullRefresh.vue';
import babycheck from '@/views/babyFlower/getCode.vue';

export default {
    name: 'myYLBanks',
    components: {
        Header,
        pullRefresh,
        babycheck
    },
    data() {
        return {
            babyGetCode: false,
            organizationCode: '',
            defaultBcImgUrl: '',
            imageUrl: '',
            defaultBankNub: '',
            defaultBankName: '',
            bankData: [],
            defaultDeleteShow: false, // 设置卡删除弹窗
            boundCardId: '',
            clickBank: '',
            bankCode: '',
            msgDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        id: 'B05',
                        handler: () => {
                            this.msgDialog.open = false;
                            this.msgCode = '';
                        }
                    },
                    {
                        text: '提交',
                        id: 'B04',
                        handler: () => {
                            this.commitDeleteBank();
                        }
                    }
                ]
            },
            msgCode: '',
            codesendTips: store2.default
                .get('usrmob')
                .replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            errorTips: '60',
            sec: 61,
            attcode: true,
            delcard: false,
            smsJrn: '', // 短信流水
            whichCard: {}, // 表示哪张卡
            smsButtonFlag: false, // 提交
            buttonTxt: '重新获取', // 按钮文案
            buttonType: false, // 按钮可不可点击disabled;default
            buttonStyle: false, // 控制按钮文案颜色
            loading: false,
            defaultBg: require('../../assets/images/banks/default_bg.png'),
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A04'
                },
                {
                    id: 'A05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A05'
                },
                {
                    id: 'A06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A06'
                },
                {
                    id: 'A07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A07'
                },
                {
                    id: 'A08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A08'
                },
                {
                    id: 'A09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A09'
                },
                {
                    id: 'A10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_A10'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_B04'
                },
                {
                    id: 'B05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_B05'
                },
                {
                    id: 'B06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYYLBANKS_B06'
                }
            ],
            isrefresh: false,
            babyPop: false,
            babyList: []
        };
    },
    watch: {
        msgCode: {
            handler(val) {
                this.msgDialog.btns[1].disabled = !(val && val.length === 4);
            }
        }
    },
    mounted() {
        this.queryBankList();
        this.getbaby();
    },
    created() {
        console.log(this.$route.meta.pageName);
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        goReceive(index) {
            if (index == 1) {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/healthcare/transitionPage?pageId=230620134827029002&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
            } else if (index == 2) {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/livelihoodBank?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
            } else if (index == 3) {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankJointly?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
            }
        },
        seeElectroniCard() {
            this.basicDialog.open = true;
        },
        queryBankList(val) {
            // 获取绑定卡列表
            if (!store2.default.get('ylBankListsInfo') || val === 'new') {
                api.newBank
                    .acpList({})
                    .then((res) => {
                        store2.default.set('ylBankListsInfo', res.usrBnkInfos);
                        if (res.usrBnkInfos && res.usrBnkInfos.length > 0) {
                            this.bankData = res.usrBnkInfos.filter((item) => {
                                if (
                                    (item.accFlg && item.accFlg === '04')
                                    || (item.accFlg && item.accFlg === '05')
                                ) {
                                    return true;
                                }
                            });
                        }
                    })
                    .catch((data) => {
                        this.$toast.info(
                            data.msgInfo || '查询失败，请稍后再试',
                            3000,
                            true
                        );
                    });
            } else {
                this.bankData = store2.default
                    .get('ylBankListsInfo')
                    .filter((item) => {
                        if (
                            (item.accFlg && item.accFlg === '04')
                            || (item.accFlg && item.accFlg === '05')
                        ) {
                            return true;
                        }
                    });
            }
        },
        changeBankStatus(e) {
            this.defaultDeleteShow = true;
            this.clickBank = `${e.bnknm} (尾号${e.cardno.substring(
                e.cardno.length - 4,
                e.cardno.length
            )})`;
            this.boundCardId = e.boundCardId;
            this.whichCard = e; // 哪张卡
        },
        timesContral() {
            this.attcode = true;
            const timer = setInterval(() => {
                this.sec = this.sec - 1;
                this.errorTips = `${this.sec} s`;
                if (this.sec === 0) {
                    clearInterval(timer);
                    this.errorTips = '重新获取';
                    this.attcode = false;
                    this.sec = 61;
                }
            }, 1000);
        },
        // 提交删除银行卡
        commitDeleteBank() {
            console.log('************提交');
            this.msgDialog.btns[1].disabled = true;
            this.loading = true;
            api.newBank
                .acpRescin({
                    smsJrn: this.smsJrn, // 短信流水[上一接口返回]
                    smsCode: this.msgCode, // 短信验证码
                    accFlg: this.whichCard.accFlg // 绑卡列表返回
                })
                .then(() => {
                    this.loading = false;
                    this.queryBankList('new');
                    this.msgDialog.open = false;
                    this.$toast.info('银行卡删除成功', 3000, true);
                    this.getYLnwewBank();
                })
                .catch((data) => {
                    this.loading = false;
                    this.$toast.info(
                        data.msgInfo || '快看看，出错啦',
                        3000,
                        true
                    );
                });
        },
        addBank() {
            if (
                this.$route.query.dealChn !== ''
                && this.$route.query.dealChn !== undefined
            ) {
                // debugger
                this.$router.push({
                    name: 'addNewBanks',
                    query: {
                        dealChn: this.$route.query.dealChn
                    }
                });
            } else {
                // debugger
                this.$router.push({
                    name: 'addNewBanks',
                    query: {
                        dealChn: '10010'
                    }
                });
            }
        },
        // 解除绑定前判断是否是小宝花账号
        orbabay() {
            this.defaultDeleteShow = false;
            let isbaby = false; // 是否是宝宝卡
            console.log(this.whichCard.cardid);
            this.babyList.forEach((item) => {
                if (item == this.whichCard.cardid) {
                    isbaby = true;
                }
            });
            if (isbaby) {
                this.babyPop = true;
            } else {
                this.unBindCard();
            }
        },
        closeBaby() {
            this.babyGetCode = true;
            this.babyPop = false;
        },
        closeCodeModel(data) {
            this.babyGetCode = false;
            window.location.reload();
        },
        // 解除绑定卡片
        unBindCard() {
            this.babyPop = false;
            this.msgDialog.open = true;
            this.unBindsms({ cardId: this.whichCard.cardid }); // 下发验证码接口
            // 调用倒计时方法
            this.timesContral();
            this.msgDialog.btns[1].disabled = true;
        },
        // 取消解除绑定卡片
        noUnBindCard() {
            this.defaultDeleteShow = false;
            this.babyPop = false;
            this.whiteCard = '';
        },
        // 解绑下发验证码smsJrn
        unBindsms(data) {
            api.newBank
                .acpRescindSms(data)
                .then((res) => {
                    this.smsJrn = res.smsJrn; // 返回短信流水
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        // 倒计时效果
        timeOutShow() {
            // 重新获取按钮
            let timer = null;
            let a = 10;
            this.buttonTxt = `重新获取${a}s`;
            // alert(timer)  //null
            if (!timer) {
                timer = setInterval(() => {
                    console.log(a);
                    a -= 1;
                    this.buttonTxt = `重新获取${a}s`;
                    // 重新获取有几秒展示就不可点击
                    this.buttonType = false;
                    this.buttonStyle = false;
                    if (a === 0) {
                        clearInterval(timer);
                        timer = null;
                        this.buttonTxt = '重新获取';
                        this.buttonType = true;
                        this.buttonStyle = true;
                    }
                }, 1000);
            }
        },
        // 重新获取文案变倒计时效果再次发送验证码
        getTimeOutShow() {
            if (this.errorTips === '重新获取') {
                // 调用倒计时方法
                this.timesContral();
                this.unBindsms({ cardId: this.whichCard.cardid }); // 下发验证码接口
            }
        },
        // 语音验证码
        getVideShow() {
            if (this.errorTips === '重新获取') {
                // 调用倒计时方法
                this.timesContral();
                this.unBindsms({ cardId: this.whichCard.cardid, smsType: '1' }); // 下发验证码接口
            }
        },
        // 重新获取银联银行卡信息
        getYLnwewBank() {
            this.isrefresh = true;
            this.bankData.splice(0);
            api.wapAcplist({ refreshFlag: '1' })
                .then((res) => {
                    this.isrefresh = false;
                    store2.default.set('ylBankListsInfo', res.usrBnkInfos);
                    if (res.usrBnkInfos && res.usrBnkInfos.length > 0) {
                        const arr = res.usrBnkInfos.filter((item) => {
                            if (
                                (item.accFlg && item.accFlg === '04')
                                || (item.accFlg && item.accFlg === '05')
                            ) {
                                return true;
                            }
                        });
                        this.bankData = Object.assign({}, arr);
                    }
                })
                .catch((err) => {
                    this.isrefresh = false;
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        // 获取小宝花账号
        getbaby() {
            api.accountInfoQuery()
                .then((res) => {
                    console.log(res.list);
                    res.list.forEach((item) => {
                        this.babyList.push(item.dePayAccount);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.contains {
    .mainContain {
        padding-left: 30px;
        padding-right: 30px;
        min-height: 100vh;
        position: relative;

        .bindingCard {
            .bindingTitle {
                height: 95px;
                line-height: 95px;
                font-size: 30px;
                font-weight: 500;
                text-align: left;
                color: #3a3a3a;

                span {
                    font-size: 24px;
                    color: #787878;
                }
            }

            .imgCont {
                display: flex;
                align-self: center;
                position: absolute;
                top: 30px;
                left: 40px;

                img {
                    width: 30px;
                    height: 30px;
                }

                span {
                    line-height: 30px;
                    margin-left: 10px;
                    color: #fff;
                }
            }

            .bindingImg {
                width: 650px;
                height: 160px;
                background: #f7f4fe;
                border-radius: 12px;
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                position: relative;
                font-size: 24px;
                .bankImg {
                    width: 200px;
                    height: 126px;
                }

                .text {
                    flex-grow: 1;
                    margin-left: 20px;
                    font-size: 24px;
                    color: #7c7c7c;

                    .name {
                        font-size: 30px;
                        color: #4d4d4d;
                        margin-right: 20px;
                    }

                    p:last-of-type {
                        margin-top: 10px;
                    }
                }
            }

            .noBank {
                height: 160px;
                display: flex;
                margin-bottom: 0.2rem;
                justify-content: space-between;
                align-items: center;
                position: relative;
                background: url("../../assets/images/banks/bankXC.png")
                    no-repeat;
                background-size: 100% 100%;

                .cont {
                    margin-left: 207px;
                    font-size: 20px;
                    font-weight: 500;
                    color: #cc6200;

                    .title {
                        font-size: 28px;
                        font-weight: 600;
                        color: #bf6824;
                        margin-bottom: 20px;
                    }
                }

                .btn {
                    width: 110px;
                    height: 50px;
                    line-height: 50px;
                    border: 2px solid #f09949;
                    border-radius: 8px;
                    font-size: 24px;
                    text-align: center;
                    color: #f09949;
                    background: #fff;
                    margin-right: 30px;
                }
            }
        }

        .addBank {
            position: relative;
            margin-top: 30px;
            width: 6.86rem;
            height: 86px;
            opacity: 1;
            //border: 2px solid #0195ff;
            //border-radius: 14px;
            background: url("../../assets/images/banks/addBtn_2.png") no-repeat;
            background-size: 100%;
            font-size: 34px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 36px;
                height: 36px;
                margin-right: 20px;
            }

            span {
                font-weight: 500;
                text-align: left;
                color: #0195ff;
                font-size: 30px;
            }
            .jiaobiao {
                position: absolute;
                top: 0;
                right: 0;
                width: 206px;
                height: 50px;
                background: url("../../assets/images/banks/jiaobiao_2.png")
                    no-repeat;
                background-size: 100%;
            }
        }
        .pdd {
            padding-bottom: 100px;
        }
        .newCard {
            margin: 48px 0 0 0;
            .title {
                font-size: 30px;
                font-weight: 500;
                color: #3a3a3a;
            }
            .cardBg {
                position: relative;
                display: flex;
                width: 690px;
                height: 170px;
                margin-top: 20px;
                overflow: hidden;
                .detail {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    margin-left: 27px;
                    p:nth-of-type(1) {
                        color: #414141;
                        font-size: 30px;
                        font-weight: 500;
                    }
                    p:nth-of-type(2) {
                        color: #73787d;
                        font-size: 22px;
                        font-weight: 500;
                    }
                }
                .btn {
                    position: absolute;
                    right: 24px;
                    bottom: 45px;
                    width: 134px;
                    height: 36px;
                    background: url("../../assets/images/banks/cardBtn_1.png")
                        no-repeat;
                    background-size: 100%;
                }
            }
            .card {
                width: 202px;
                height: 134px;
                margin: 18px 0 0 21px;
            }
            .card1 {
                background: url("../../assets/images/banks/newBank_1.png")
                    no-repeat;
                background-size: 100%;
            }
            .card2 {
                background: url("../../assets/images/banks/newBank_2.png")
                    no-repeat;
                background-size: 100%;
            }
            .card3 {
                background: url("../../assets/images/banks/newBank_3.png")
                    no-repeat;
                background-size: 100%;
            }
            .bg1 {
                background: url("../../assets/images/banks/bankBg_1.png")
                    no-repeat;
                background-size: 100%;
                margin-top: 48px;
            }
            .bg2 {
                background: url("../../assets/images/banks/bankBg_2.png")
                    no-repeat;
                background-size: 100%;
            }
            .bg3 {
                background: url("../../assets/images/banks/bankBg_3.png")
                    no-repeat;
                background-size: 100%;
            }
        }

        .bottom {
            text-align: center;
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);

            .problem {
                font-weight: 400;
                font-size: 0.22rem;
                color: #0098ff;
                letter-spacing: 0;
                padding: 10px;
            }
        }
    }
}

/deep/ .lookEle {
    .pouContain {
        background: #ffffff;
        width: 620px;
        padding: 30px 30px 50px 30px;
        border-radius: 20px;

        .title {
            font-size: 30px;
            display: flex;
            justify-content: left;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 30px;

            span {
                display: inline-block;
                width: 100%;
                text-align: center;
                font-weight: 500;
                color: #333333;
                // margin-left: 25px;
                font-size: 30px;
            }

            img {
                width: 36px;
                height: 36px;
            }
        }

        .tipss {
            height: 138px;
            opacity: 1;
            font-size: 36px;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 138px;
            border-bottom: 1px solid #e1e1e1;
            font-size: 36px;
        }

        .btns {
            height: 65px;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;

            .setDefault {
                width: 280px;
                height: 75px;
                opacity: 1;
                background: #0195ff;
                border-radius: 8px;
                text-align: center;
                line-height: 75px;
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
            }

            .deleteBank {
                width: 280px;
                height: 75px;
                opacity: 1;
                background: #0195ff;
                border-radius: 8px;
                text-align: center;
                line-height: 75px;
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
            }
        }
    }
}

/deep/ .defaultCard {
    .pouTitle {
        border-radius: 36px 36px 0px 0px;
        background: #ffffff;
        height: 106px;
        width: 100%;
        font-size: 30px;
        display: flex;
        justify-content: left;
        align-items: center;

        span {
            font-weight: 500;
            text-align: left;
            color: #333333;
            margin-left: 275px;
            font-size: 30px;
            font-weight: 400;
        }

        img {
            margin-left: 30px;
            width: 36px;
            height: 36px;
        }
    }

    .containPop {
        height: 200px;
        opacity: 1;
        background: #ffffff;
        font-size: 28px;
        font-weight: 400;
        text-align: left;
        color: #333333;
        padding-top: 30px;
        padding-left: 77px;
        padding-right: 77px;
        border-top: 1px solid #d5d5d5;
    }
}

/deep/ .defaultAnddelete {
    .pouTitle {
        border-radius: 36px 36px 0px 0px;
        background: #ffffff;
        height: 106px;
        width: 100%;
        font-size: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
        border: 1px solid #d5d5d5;

        img {
            margin-left: 30px;
            width: 36px;
            height: 36px;
        }

        span {
            width: 100%;
            text-align: center;
            font-weight: 500;
            color: #333333;
            font-size: 30px;
            font-weight: 400;
        }
    }

    .pouContain {
        // height: 265px;
        background: #ffffff;

        .setDefault {
            height: 96px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }

        .deleteBank {
            height: 96px;
            opacity: 1;
            background: #ffffff;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }
    }
}

/deep/ .deletePop {
    .pouContain {
        background: #ffffff;
        width: 620px;
        padding: 30px 30px 50px 30px;
        border-radius: 15px;

        .title {
            font-size: 30px;
            display: flex;
            justify-content: left;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 30px;

            span {
                width: 100%;
                text-align: center;
                font-weight: 500;
                // text-align: left;
                color: #333333;
                // margin-left: 275px;
                font-size: 30px;
                font-weight: 400;
            }

            img {
                width: 36px;
                height: 36px;
            }
        }

        .tipss {
            height: 138px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            line-height: 138px;
            border-bottom: 1px solid #e1e1e1;
        }

        .btns {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;

            .setDefault {
                width: 280px;
                height: 75px;
                opacity: 1;
                background: #0195ff;
                border-radius: 8px;
                text-align: center;
                line-height: 75px;
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
            }

            .deleteBank {
                width: 280px;
                height: 75px;
                opacity: 1;
                background: #0195ff;
                border-radius: 8px;
                text-align: center;
                line-height: 75px;
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
            }
        }
    }
}

// 短信验证码
.msgDialog {
    /deep/ .md-popup {
        .voice {
            //margin-left: 35px;
            margin-top: 35px;
            margin-bottom: 20px;

            font-size: 24px;
            font-weight: 500;
            span {
                color: #c6c6c6;
            }
            .blue {
                color: #1fa3ee;
                text-decoration: underline #1fa3ee;
            }
        }
        .md-popup-box {
            .md-dialog-content {
                width: 640px;
                border-radius: 20px;

                .md-dialog-body {
                    color: #13252e;
                    font-size: 30px;
                    text-align: center;
                    padding: 0;
                    min-height: 430px;
                    display: unset;

                    .md-dialog-title {
                        font-size: 32px;
                        color: #333;
                        font-weight: 600;
                        margin: 60px 0 20px;
                    }

                    .msgTips {
                        font-size: 26px;
                        color: #999;
                    }
                    //.removeNumStyle::-webkit-outer-spin-button,
                    //.removeNumStyle::-webkit-inner-spin-button {
                    //    -webkit-appearance: none !important;
                    //    margin: 0;
                    //}
                    //.smsBtn {
                    //    width: 42%;
                    //    height: 100%;
                    //    display: inline-block;
                    //    border-radius: 0;
                    //    box-sizing: border-box;
                    //    border-top-right-radius: 5px;
                    //    border-bottom-right-radius: 5px;
                    //    position: absolute;
                    //    right: 0;
                    //}
                    .errorTips {
                        background: #ffffff;
                        width: 200px;
                        margin-left: 220px;
                        margin-bottom: 20px;
                    }

                    .md-codebox-wrapper {
                        margin: 40px 0 30px;

                        .md-codebox {
                            .md-codebox-box:last-child {
                                margin-right: 0;
                            }

                            .md-codebox-box {
                                &:before {
                                    border-bottom: none;
                                }

                                flex: 0 1 80px;
                                width: 80px;
                                height: 80px;
                                // background: #F5F5F5;
                                border: 2px solid #0195ff !important;
                                border-radius: 8px;
                                margin-right: 15px;
                                color: #333;
                                font-size: 42px;
                                font-weight: 600;
                                margin-left: 0;
                                line-height: 80px !important;
                                // border: none;
                            }
                        }
                    }

                    .errorTips {
                        color: #0195ff;
                        font-size: 24px;
                        word-break: break-all;
                        height: 50px;
                    }
                }

                .md-dialog-actions {
                    &::after {
                        border: none;
                    }
                    .md-dialog-btn {
                        color: #0195ff;
                        width: 2.8rem;
                        opacity: 1;
                        background: #ffffff;
                        border: 0.02rem solid #0195ff;
                        border-radius: 0.08rem;
                        font-weight: 500;
                        height: 0.75rem;
                        margin-top: 0.2rem;
                        margin-right: 30px;
                        margin-left: 30px;
                        &.disabled {
                            background: #bce0fa !important;
                            color: #ffffff !important;
                            border: none !important;
                        }
                    }

                    .md-dialog-btn:last-child {
                        // color: #0195ff;
                        width: 200px;
                        height: 0.75rem;
                        opacity: 1;
                        background: #0195ff;
                        border-radius: 8px;
                        margin-top: 0.2rem;
                        margin-bottom: 40px;
                        margin-right: 30px;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}

.babyPopup {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
        width: 650px;
        height: 400px;
        box-sizing: border-box;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;
        flex-wrap: wrap;
        border-radius: 20px;

        .top {
            font-size: 36px;
        }

        .mid {
            font-size: 32px;
        }

        .bottom {
            width: 100%;
            padding: 0 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            div {
                width: 200px;
                height: 80px;
                border: 2px solid #ffab00;
                border-radius: 10px;
                text-align: center;
                line-height: 80px;
                font-size: 32px;
                color: #ffab00;
            }

            .right {
                background: #ffab00;
                color: white;
            }
        }
    }
}
</style>
