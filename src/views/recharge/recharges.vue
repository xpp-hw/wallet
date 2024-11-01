<template>
    <div class="contains">
        <div class="banks">
            <md-field>
                <md-field-item
                    id="A06"
                    title="支付账户"
                    :content="selectorValue"
                    @click="isSelectorShow = true"
                    arrow
                    solid
                >
                    <img
                        v-if="bankCode"
                        class="bankLogo"
                        slot="left"
                        :src="`../static/images/banks/bankimages/icon_${bankCode}.png`"
                        alt="icon"
                    />
                </md-field-item>
            </md-field>
        </div>
        <div class="inputMoney">
            <p>充值金额</p>
            <md-input-item
                title=""
                type="money"
                v-model="moneyValue"
                placeholder="请输入充值金额"
                class="transferField"
                @change="atmCheck"
                onpaste="return false"
            >
                <div class="money" slot="left">￥</div>
            </md-input-item>
            <div class="limit" v-if="orgName != '交通银行'">钱包充值限额2000</div>
            <md-button
                class="transferBtn"
                :type="btnType"
                id="A01"
                @click="confirmRecharge"
                >确认转入</md-button
            >
            <div class="guid" @click="goGuid" id="A04">
                <span>手动转账指引</span>
                <img src="../../assets/images/arrow.png" alt="" />
            </div>
            <div class="tips">移动钱包</div>
        </div>
        <md-popup
            class="isSelectorShow"
            v-model="isSelectorShow"
            position="bottom"
        >
            <md-popup-title-bar
                only-close
                large-radius
                title="选择支付银行"
                title-align="center"
                @cancel="isSelectorShow = false"
            ></md-popup-title-bar>
            <!-- <div class="pouTitle">
        <img
          @click="isSelectorShow = false"
          src="../../assets/images/banks/close.png"
          alt=""
        />
        <span>选择支付银行</span>
      </div> -->
            <div
                class="pouContain"
                v-for="(item, index) in payWaysData"
                :key="index"
                @click="onSelectorChoose(item)"
            >
                <div>
                    <img
                        :src="`../static/images/banks/bankimages/icon_${item.bankCode}.png`"
                        alt=""
                    />
                    <span>{{
                        `${item.bankName} (尾号${item.cardNo.substring(
                            item.cardNo.length - 4,
                            item.cardNo.length
                        )})`
                    }}</span>
                </div>
            </div>
            <div class="kong"></div>
        </md-popup>
        <md-popup v-model="checkUserPopup" :mask-closable="false">
            <div class="checkUserPopup">
                <div class="popupTitle">请输入短信验证码</div>
                <ValidationObserver ref="form" slot="{ invalid }">
                    <div class="wapField">
                        <div class="phoneNumber">
                            <div v-if="orgCode == 'BOCM'" class="userMbl">
                                手机号:&nbsp;&nbsp;&nbsp;{{ crpMobile }}
                            </div>
                            <div v-else class="userMbl">
                                手机号:&nbsp;&nbsp;&nbsp;{{ userMbl }}
                            </div>
                            <button
                                class="getCode"
                                slot="right"
                                :disabled="attcode"
                                @click="confirmCodeClick"
                            >
                                {{ smsText }}
                            </button>
                        </div>
                        <InputWithValidation
                            class="yard"
                            type="digit"
                            title="验证码"
                            placeholder="请输入验证码"
                            name="验证码"
                            :rules="rules"
                            clearable
                            :maxlength= inputNum
                            @change="watchNo"
                            v-model="formData.smsNo"
                            ref="smsNo"
                        >
                        </InputWithValidation>
                        <!--                        <div class="voice">-->
                        <!--                            收不到短信验证码？点击试试<span-->
                        <!--                                :class="{ blue: !attcode }"-->
                        <!--                                @click=""-->
                        <!--                                >语音验证码</span-->
                        <!--                            >-->
                        <!--                        </div>-->
                        <div class="btns">
                            <md-button
                                class="cancel"
                                id="A03"
                                @click="cancleChange"
                                >取消</md-button
                            >
                            <md-button
                                class="determine"
                                id="A04"
                                :class="btnconfirm ? 'unbtn' : ''"
                                @click="submitData"
                                >确定</md-button
                            >
                        </div>
                    </div>
                </ValidationObserver>
            </div>
        </md-popup>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import debounce from 'lodash/debounce';
import InputWithValidation from '@/components/InputWithValidation';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';

export default {
    name: 'recharges',
    components: {
        mdHeader,
        InputWithValidation
    },
    data() {
        return {
            rules: 'required|smsNo',
            inputNum: 4,
            accountNo: this.$route.query.accountNo,
            bankIco: '',
            selectorValue: '',
            bankNub: '',
            bankCode: '',
            boundCardId: '',
            bankName: '',
            cardNo: '',
            payWaysData: [],
            moneyValue: '',
            btnType: 'disabled', // default
            isSelectorShow: false,
            checkUserPopup: false,
            userMbl: store2.default
                .get('usrmob')
                .replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            crpMobile: '',
            smsText: '60',
            sec: 60,
            timer: null,
            formData: {
                smsNo: ''
            },
            attcode: true,
            smsJrn: '',
            isDisable: false,
            btnconfirm: true,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_RECHARGE_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_RECHARGE_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLET_RECHARGE_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_WALLET_RECHARGE_A04'
                },
                {
                    id: 'A05',
                    touchCode: 'WAP_T_WALLET_RECHARGE_A05'
                },
                {
                    id: 'A06',
                    touchCode: 'WAP_T_WALLET_RECHARGE_A06'
                }
            ],
            isclick: false,
            orgCode: '',
            deviceid: '',
            typeId: ''
        };
    },
    watch: {
        moneyValue: {
            handler(val) {
                this.btnType = Number(val) > 0 ? 'default' : 'disabled';
            }
        }
    },
    mounted() {
        this.getBankInfo();
        Object.keys(this.formData).forEach((name) => {
            this.$watch(
                `formData.${name}`,
                debounce(function checkValidate() {
                    if (this.formData.smsNo.length === this.inputNum) {
                        this.$refs.form.validate();
                    }
                }, 500)
            );
        });
        let arr = [];
        const agentStr = navigator.userAgent;
        if (agentStr.indexOf('deviceid') >= 0) {
            arr = agentStr.split('deviceid=');
            arr = arr[1].split('&');
            this.deviceid = arr[0];
        }
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.orgCode = this.$route.query.orgCode || '';
        this.orgName = this.$route.query.orgName || '';
        if (this.orgName == '交通银行') {
            this.inputNum = 6;
            this.rules = 'required|smsNo_6';
        }
        this.queryCrpmobile();
    },
    methods: {
        queryCrpmobile() {
            if (!JSON.parse(window.sessionStorage.getItem('crpMobile')) && this.orgCode == 'BOCM') {
                api.qrySmallChangeAcc({})
                    .then((data) => {
                        data.list.forEach((res) => {
                            if (res.orgCode == 'BOCM') {
                                window.sessionStorage.setItem(
                                    'crpMobile',
                                    JSON.stringify(res.crpmobile)
                                );
                                this.crpMobile = res.crpmobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                            }
                        });
                    });
            } else if (JSON.parse(window.sessionStorage.getItem('crpMobile'))) {
                this.crpMobile = JSON.parse(window.sessionStorage.getItem('crpMobile')).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
        },
        getBankInfo() {
            // 获取银行列表
            api.rechargeApi
                .queryBankList({ orgCode: this.orgCode })
                .then((data) => {
                    if (
                        data.boundCardInfoDTOS
                        && data.boundCardInfoDTOS.length > 0
                    ) {
                        data.boundCardInfoDTOS.forEach((i) => {
                            if (i.defaultFlag === '00') {
                                this.selectorValue = `${
                                    i.bankName
                                } (尾号${i.cardNo.substring(
                                    i.cardNo.length - 4,
                                    i.cardNo.length
                                )})`;
                                this.boundCardId = i.boundCardId;
                                this.bankName = i.bankName;
                                this.cardNo = i.cardNo;
                                this.bankCode = i.bankCode;
                            }
                        });
                        this.payWaysData = data.boundCardInfoDTOS;
                    }
                })
                .catch((data) => {
                    this.$toast.info(
                        data.msgInfo || '查询失败，请稍后再试',
                        3000,
                        true
                    );
                });
        },
        confirmRecharge() {
            // 确认转入

            this.getMsm();
            // this.checkUserPopup = true;
        },
        onSelectorChoose(option) {
            this.selectorValue = `${
                option.bankName
            } (尾号${option.cardNo.substring(
                option.cardNo.length - 4,
                option.cardNo.length
            )})`;
            this.boundCardId = option.boundCardId;
            this.bankName = option.bankName;
            this.cardNo = option.cardNo;
            this.isSelectorShow = false;
            this.bankCode = option.bankCode;
            this.bankIco = option.bankCode;
        },
        atmCheck(name, value) {
            if (value) {
                let amtReg = /^([1-9][\d]{0,5}|0{0,1})(\.|\.\d{0,2})?$/;
                if (this.orgCode == 'BOCM') {
                    amtReg = /^([1-9][\d]{0,9}|0{0,1})(\.|\.\d{0,2})?$/;
                }
                if (!amtReg.test(value)) {
                    if (Number(value) >= 1) {
                        this.$nextTick(() => {
                            this.moneyValue = value.substring(1, value.length);
                        });
                    } else {
                        this.$nextTick(() => {
                            this.moneyValue = value.substring(
                                0,
                                value.length - 1
                            );
                        });
                    }
                } else {
                    if (this.orgCode == 'BOCM') {
                        if (Number(value) > 100000000) {
                            this.$nextTick(() => {
                                this.moneyValue = value.substring(
                                    0,
                                    value.length - 1
                                );
                            });
                        }
                    } else {
                        if (Number(value) > 2000) {
                            this.$nextTick(() => {
                                this.moneyValue = value.substring(
                                    0,
                                    value.length - 1
                                );
                            });
                        }
                    }
                }
                if (
                    value.toString().split('.').length > 1
                    && value.toString().split('.')[1].length > 2
                ) {
                    // 检查小数点后是否等于2位
                    this.$nextTick(() => {
                        this.moneyValue = value.substring(0, value.length - 1);
                    });
                }
            }
        },
        watchNo() {
            if (this.formData.smsNo.length === this.inputNum) {
                this.btnconfirm = false;
            } else {
                this.btnconfirm = true;
            }
        },
        goGuid() {
            this.$router.push({
                name: 'rechargeGuide',
                query: {
                    accountNo: this.$route.query.accountNo
                }
            });
        },
        getMsm() {
            // 获取验证码
            const params = {};
            const that = this;
            if (that.$client.LEADEON) {
                // 一级掌厅
                leadeon.getUserInfo({
                    debug: false,
                    success(res) {
                        const { imei } = res; // imei, 3.8 新增
                        if (that.$client.IOS) {
                            params.deviceIDFA = imei;
                        } else {
                            params.deviceIMEI = imei;
                        }
                        that.queryMsm(params);
                    }
                });
            } else if (this.$client.JSMCC) {
                // 江苏营业厅
                if (this.$client.IOS) {
                    params.deviceIDFA = this.deviceid;
                } else {
                    params.deviceIMEI = this.deviceid;
                }
                this.queryMsm(params);
            } else {
                this.queryMsm({});
            }
        },
        queryMsm(obj) {
            if (!this.isclick) {
                this.isclick = true;
                let fullCardNo;
                store2.default.get('qbBankListsInfo').forEach((data) => {
                    console.log(data);
                    if (data.orgCode == 'BOCM') {
                        fullCardNo = data.fullAccNbr;
                    }
                });
                if (fullCardNo) {
                    console.log(fullCardNo);
                } else {
                    fullCardNo = this.cardNo;
                }
                // 获取验证码
                api.rechargeApi
                    .queryMsm({
                        organizationCode: this.bankCode,
                        boundCardId: this.boundCardId, // 银行卡ID
                        amount: this.moneyValue, // 充值金额
                        bankName: this.bankName,
                        cardNo: this.cardNo,
                        // cardNo: fullCardNo,
                        ...obj
                    })
                    .then((data) => {
                        this.smsJrn = data.smsJrn;
                        this.checkUserPopup = true;
                        this.codeClick();
                        this.isclick = false;
                    })
                    .catch((data) => {
                        this.isclick = false;
                        this.$toast.info(
                            data.msgInfo || '查询失败，请稍后再试',
                            3000,
                            true
                        );
                    });
            }
        },
        codeClick() {
            if (!this.timer) {
                this.attcode = true;
                this.timesContral();
                this.timer = setInterval(this.timesContral, 1000);
            }
        },
        confirmCodeClick() {
            if (!this.timer) {
                this.getMsm();
            }
        },
        timesContral() {
            if (this.sec > 0 && this.sec <= 60) {
                this.sec -= 1;
                if (this.sec !== 0) {
                    this.attcode = true;
                    this.smsText = `${this.sec} s`;
                } else {
                    clearInterval(this.timer);
                    this.attcode = false;
                    this.smsText = '获取验证码';
                    this.sec = 60;
                    this.timer = null;
                }
            }
        },
        cancleChange() {
            this.checkUserPopup = false;
            this.formData.smsNo = '';
        },
        submitData() {
            this.isDisable = true;
            this.btnconfirm = true;
            api.rechargeApi
                .submitRecharge({
                    smsCode: this.formData.smsNo,
                    smsJrn: this.smsJrn
                })
                .then(() => {
                    this.$router.push({
                        name: 'rechargeTransition',
                        query: {
                            smsCode: this.formData.smsNo,
                            smsJrn: this.smsJrn,
                            accountNo: this.$route.query.accountNo,
                            typeId: this.typeId
                        }
                    });
                })
                .catch((data) => {
                    this.$toast.info(data.msgInfo || '请稍后再试', 3000, true);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.contains {
    .banks {
        .md-field {
            padding: 0 0.3rem;
            border: none;
            background-color: #f5f5f5;
            .bankLogo {
                width: 44px;
                height: 44px;
                opacity: 1;
            }
        }
    }
    .inputMoney {
        height: calc(100vh - 198px);
        background: #ffffff;
        border-radius: 46px 46px 0px 0px;
        padding-left: 30px;
        padding-right: 30px;
        p {
            height: 135px;
            // width: 120px;
            font-size: 30px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 135px;
        }
        /deep/.md-input-item.left .md-input-item-input,
        .md-input-item.left .md-input-item-fake {
            text-align: left;
            font-size: 40px;
        }
        .money {
            width: 28px;
            height: 50px;
            opacity: 1;
            font-size: 50px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 50px;
            margin-right: 26px;
        }
        .limit {
            margin-top: 20px;
            height: 37px;
            opacity: 1;
            font-size: 26px;
            font-weight: 400;
            text-align: left;
            color: #666666;
            line-height: 37px;
        }
        .transferBtn {
            margin-top: 91px;
        }
        .guid {
            width: 300px;
            margin: 40px auto 0;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                font-weight: 500;
                text-align: left;
                color: #0195ff;
            }
            img {
                width: 20px;
                height: 21px;
                margin-left: 10px;
            }
        }
        .tips {
            width: auto;
            height: 50px;
            opacity: 1;
            font-size: 36px;
            font-weight: 500;
            text-align: center;
            color: #d7d7d7;
            line-height: 50px;
            letter-spacing: -1px;
            margin: 417px auto 82px;
        }
    }
    .checkUserPopup {
        width: 640px;
        opacity: 1;
        background: #ffffff;
        border-radius: 8px;
        .popupTitle {
            height: 90px;
            font-size: 34px;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 90px;
        }
        .wapField {
            padding: 25px;
            .phoneNumber {
                height: 80px;
                display: flex;
                justify-content: space-between;
                padding-top: 25px;
                padding-right: 20px;
                border-top: 2px solid #f5f5f5;
                border-bottom: 2px solid #f5f5f5;
                .userMbl {
                    width: 350px;
                    height: 54px;
                    opacity: 1;
                    font-size: 30px;
                    font-weight: 400;
                    text-align: left;
                    color: #333333;
                    line-height: 54px;
                }
                .getCode {
                    text-align: center;
                    font-size: 28px;
                    font-weight: 400;
                    color: #667afa;
                    background: #ffffff;
                    border: 0;
                    width: 150px;
                    height: 54px;
                    opacity: 1;
                    border: 1px solid #238ff2;
                    border-radius: 9px;
                }
            }
            .voice {
                margin-left: 35px;
                margin-top: 25px;
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
            .btns {
                margin-top: 30px;
                padding-left: 30px;
                padding-right: 30px;
                display: flex;
                justify-content: space-between;
                .cancel {
                    width: 242px;
                    height: 75px;
                    opacity: 1;
                    border: 1px solid #0195ff;
                    border-radius: 10px;
                    background: #ffffff;
                    font-size: 32px;
                    font-weight: 400;
                    text-align: left;
                    color: #0195ff;
                    line-height: 75px;
                    letter-spacing: -1px;
                }
                .determine {
                    width: 242px;
                    height: 75px;
                    font-size: 32px;
                }
            }
        }
    }
    /deep/.selector-header {
        height: 106px;
        border: 1px solid #d5d5d5;
        display: flex;
        justify-content: left;
        align-items: center;
        img {
            width: 30px;
            height: 30px;
            opacity: 1;
            margin-left: 24px;
            margin-right: 209px;
        }
        span {
            display: inline-block;
            width: 180px;
            opacity: 1;
            font-size: 30px;
            font-weight: 400;
            text-align: left;
            color: #333333;
        }
    }
    /deep/.md-cell-item-content {
        -webkit-box-flex: 1;
        -webkit-flex: 1 1 0%;
        flex: 1 1 0%;
        color: #111a34;
        font-size: 0.32rem;
        line-height: 1.2;
        font-size: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
        .bankIco {
            width: 44px;
            height: 44px;
            opacity: 1;
        }
        .itemName {
            opacity: 1;
            font-family: SourceHanSansCN, SourceHanSansCN-Regular;
            font-weight: 400;
            text-align: left;
            color: #333333;
            margin-left: 16px;
        }
    }
}
/deep/.isSelectorShow {
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
            font-weight: 500;
            text-align: left;
            color: #333333;
            margin-left: 209px;
            font-size: 30px;
            font-weight: 400;
        }
    }
    .pouContain {
        height: 98px;
        background: #ffffff;
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
            font-weight: 500;
            text-align: left;
            color: #333333;
            margin-left: 209px;
            font-size: 30px;
            font-weight: 400;
        }
    }
    .kong {
        height: 98px;
        background-color: #ffffff;
    }
}
.unbtn {
    background: #8ec4f6;
    pointer-events: none;
}
</style>
