<template>
    <div class="contains">
        <div class="banks">
            <md-field>
                <md-field-item
                    id="A02"
                    title="提现账户"
                    :content="selectorValue"
                    @click="isSelectorShow = true"
                    arrow
                    solid
                >
                    <img
                        class="bankLogo"
                        slot="left"
                        :src="`../static/images/banks/bankimages/icon_${bankCode}.png`"
                        alt=""
                    />
                </md-field-item>
            </md-field>
        </div>
        <div class="inputMoney">
            <p>提现金额</p>
            <md-input-item
                title=""
                type="money"
                v-model="moneyValue"
                placeholder="请输入提现金额"
                class="transferField"
                @change="atmCheck"
                onpaste="return false"
            >
                <div class="money" slot="left">￥</div>
            </md-input-item>
            <div class="limit" v-show="!limitShow">
                最多可以提现&nbsp;&nbsp;&nbsp;¥ {{ balance }}
            </div>
            <div class="limits" v-show="limitShow">
                输入金额已超出可提现余额
            </div>
            <md-button
                class="transferBtn"
                :type="btnType"
                @click="confirmRecharge"
                >两小时到账，确认提现</md-button
            >
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
                title="选择提现银行"
                title-align="center"
                id="A05"
                @cancel="isSelectorShow = false"
            ></md-popup-title-bar>
            <!-- <div class="pouTitle">
        <img
          id="A05"
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
            <div class="kong"></div>
        </md-popup>
        <md-popup
            v-if="sfot === 1"
            v-model="checkUserPopup"
            :mask-closable="false"
        >
            <div class="checkUserPopup">
                <div class="popupTitle">请输入短信验证码</div>
                <ValidationObserver ref="form" v-slot="{ invalid }">
                    <div class="wapField">
                        <div class="phoneNumber">
                            <div v-if="orgCode == 'BOCM'" class="userMbl">
                                手机号:&nbsp;&nbsp;&nbsp;{{ crpMobile }}
                            </div>
                            <div v-else class="userMbl">
                                手机号:&nbsp;&nbsp;&nbsp;{{ mobileNo }}
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
                            :maxlength="inputNum"
                            @change="watchNo"
                            v-model="formData.smsNo"
                            ref="smsNo"
                        >
                        </InputWithValidation>
                        <!--                        <div-->
                        <!--                            class="voice"-->
                        <!--                            style="-->
                        <!--                                text-align: center;-->
                        <!--                                margin-top: 0.35rem;-->
                        <!--                                margin-bottom: 0.25rem;-->
                        <!--                                font-size: 0.24rem;-->
                        <!--                            "-->
                        <!--                        >-->
                        <!--                            收不到短信验证码？点击试试<span-->
                        <!--                                :style="[-->
                        <!--                                    {-->
                        <!--                                        color: !attcode ? '#1FA3EE' : '#C6C6C6',-->
                        <!--                                    },-->
                        <!--                                    {-->
                        <!--                                        'text-decoration': !attcode-->
                        <!--                                            ? 'underline #1FA3EE'-->
                        <!--                                            : 'none',-->
                        <!--                                    },-->
                        <!--                                ]"-->
                        <!--                                @click="getMsm('vice')"-->
                        <!--                                >语音验证码</span-->
                        <!--                            >-->
                        <!--                        </div>-->
                        <p class="smallTips" v-if="orgCode != 'BOCM'">
                            收不到验证码?请<span class="setUp" @click="setUp(1)"
                                >设置</span
                            >支付密码
                        </p>
                        <div class="btns">
                            <md-button
                                class="cancel"
                                id="A04"
                                @click="cancleChange"
                                >取消</md-button
                            >
                            <md-button
                                class="determine"
                                id="A03"
                                :class="btnconfirm ? 'unbtn' : ''"
                                @click="submitData"
                                >确定</md-button
                            >
                        </div>
                    </div>
                </ValidationObserver>
            </div>
        </md-popup>
        <!-- 密码支付 -->
        <div
            class="passwordPopusMask"
            v-if="sfot === 2"
            :style="{ display: checkUserPopup1 ? 'block' : 'none' }"
        >
            <div class="passwordPopus">
                <p class="popupTitle">请输入支付密码</p>
                <span class="colse" @click="cancleChange">X</span>
                <div class="hr"></div>
                <input
                    type="text"
                    id="tradePin"
                    name="tradePin"
                    v-model="changeVal"
                    maxlength="6"
                    placeholder=""
                />
                <p class="smallTips" v-if="orgCode != 'BOCM'">
                    忘记支付密码?请<span class="setUp" @click="setUp(2)"
                        >找回</span
                    >支付密码
                </p>
            </div>
            <div id="login_keyboard" style="position: relative"></div>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
import InputWithValidation from '@/components/InputWithValidation';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import { Keyou } from '@/common/keyou-crypto-min.js';
import { Toast } from 'mand-mobile';

export default {
    name: 'changeWithdrawal',
    components: {
        InputWithValidation
    },
    data() {
        return {
            rules: "required|smsNo",
            inputNum: 4,
            bankCode: "",
            bankIco: "",
            selectorValue: "",
            payWaysData: "",
            isSelectorShow: false,
            boundCardId: '',
            bankName: '',
            cardNo: '',
            moneyValue: '',
            balance: this.$route.query.amounts,
            limitShow: false,
            btnType: 'disabled', // default
            // 原样式
            checkUserPopup: false,
            checkUserPopup1: false,
            // 测试样式
            //   checkUserPopup: true,
            mobileNo: store2.default
                .get("usrmob")
                .replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
            crpMobile: "",
            smsJrn: "",
            formData: {
                smsNo: ''
            },
            attcode: true,
            smsText: '',
            sec: 61,
            timer: null,
            btnconfirm: true,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_RECHARGEWIDTHDRAWAL_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_RECHARGEWIDTHDRAWAL_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLET_RECHARGEWIDTHDRAWAL_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_WALLET_RECHARGEWIDTHDRAWAL_A04'
                },
                {
                    id: 'A05',
                    touchCode: 'WAP_T_WALLET_RECHARGEWIDTHDRAWAL_A05'
                }
            ],
            sfot: 1,
            KeyouCryptography: null,
            changeVal: '',
            mima: '',
            isclick: false,
            orgCode: '',
            deviceid: '',
            fullCardno: "",
        };
    },
    watch: {
        moneyValue: {
            handler(val) {
                // console.log(val);
                // 原判断
                this.btnType = Number(val) > 0 ? 'default' : 'disabled';
            }
        },
        checkUserPopup1(newVal) {
            console.log(newVal);
        }
    },
    mounted() {
        this.orgCode = this.$route.query.orgCode || "";
        this.queryCrpmobile()
        if(this.orgCode == "BOCM") {
            this.inputNum = 6
            this.rules = "required|smsNo_6"
        }
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

        store2.default.get("qbBankListsInfo").forEach(data =>  {
            if(data.orgCode == "BOCM") {
                this.fullCardno = data.fullAccNbr
            }
        })

        // 支付密码状态查询
        api.paymentApi
            .StatusQuery({
                entryTx: '',
                mobileNo: store2.default.get('usrmob')
            })
            .then((data) => {
                console.log(data.pwdsts);
                if (data.pwdsts === '01' && this.orgCode != "BOCM") {
                    this.sfot = 2;
                } else {
                    this.sfot = 1;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    created() {
        let arr = [];
        const agentStr = navigator.userAgent;
        if (agentStr.indexOf('deviceid') >= 0) {
            arr = agentStr.split('deviceid=');
            arr = arr[1].split('&');
            this.deviceid = arr[0];
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        queryCrpmobile() {
            if(!JSON.parse(window.sessionStorage.getItem("crpMobile")) && this.orgCode == "BOCM") {
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
            } else if(JSON.parse(window.sessionStorage.getItem("crpMobile"))) {
                this.crpMobile = JSON.parse(window.sessionStorage.getItem("crpMobile")).replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
            }
        },
        // 是否设置支付密码 跳转路由
        setUp(y) {
            if (y === 1) {
                this.$router.push({
                    path: '/setPassword/1'
                });
            } else {
                this.$router.push({
                    name: 'changePassword'
                });
            }
        },
        getBankInfo() {
            // 获取银行列表
            api.banksApi
                .queryBankList({ orgCode: this.orgCode })
                .then((data) => {
                    // console.log('全部卡', data.boundCardInfoDTOS);
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
                                this.bankIco = i.bankCode;
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
        getMsm(type) {
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
                        that.queryMsm(type, params);
                    }
                });
            } else if (that.$client.JSMCC) {
                // 江苏营业厅
                if (that.$client.IOS) {
                    params.deviceIDFA = that.deviceid;
                } else {
                    params.deviceIMEI = that.deviceid;
                }
                that.queryMsm(type, params);
            } else {
                that.queryMsm(type);
            }
        },
        getMsm2() {
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
                        that.queryMsm2(params);
                    }
                });
            } else if (this.$client.JSMCC) {
                // 江苏营业厅
                if (this.$client.IOS) {
                    params.deviceIDFA = this.deviceid;
                } else {
                    params.deviceIMEI = this.deviceid;
                }
                this.queryMsm2(params);
            } else {
                this.queryMsm2();
            }
        },
        queryMsm(type, obj) {
            let data;
            // if(this.orgCode == "BOCM") {
            //     this.cardNo = this.fullCardno
            // }
            if (type) {
                data = {
                    organizationCode: this.bankCode,
                    boundCardId: this.boundCardId, // 银行卡ID
                    bankName: this.bankName,
                    cardNo: this.cardNo,
                    amount: this.moneyValue, //
                    smsType: '1',
                    ...obj
                };
            } else {
                data = {
                    organizationCode: this.bankCode,
                    boundCardId: this.boundCardId, // 银行卡ID
                    bankName: this.bankName,
                    cardNo: this.cardNo,
                    amount: this.moneyValue, // 充值金额
                    ...obj
                };
            }
            console.log('**************');
            // 获取验证码
            if (!this.isclick) {
                console.log('-------');
                this.isclick = true;
                api.changeWithdrowApi
                    .queryMsm(data)
                    .then((data) => {
                        this.codeClick();
                        this.smsJrn = data.smsJrn;
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
        queryMsm2(obj) {
            api.changeWithdrowApi
                .queryMsm({
                    organizationCode: this.bankCode,
                    boundCardId: this.boundCardId, // 银行卡ID
                    bankName: this.bankName,
                    cardNo: this.cardNo,
                    amount: this.moneyValue, // 充值金额
                    checkType: '02',
                    ...obj
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getPassWord() {
            // 获取支付密码
            if (this.KeyouCryptography == null) {
                this.KeyouCryptography = Keyou();
            }
            // eslint-disable-next-line max-len
            const license = 'JjE2MzAwNTc4NzQ3MDkmMTY2MTU5Mzg3NDcwOSZVbmlvbl9LZXlvdSZpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBVjRBQUFBeUNBWUFBQUFVYXJPUEFBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBeVpwVkZoMFdFMU1PbU52YlM1aFpHOWlaUzU0YlhBQUFBQUFBRHcvZUhCaFkydGxkQ0JpWldkcGJqMGk3N3UvSWlCcFpEMGlWelZOTUUxd1EyVm9hVWg2Y21WVGVrNVVZM3ByWXpsa0lqOCtJRHg0T25odGNHMWxkR0VnZUcxc2JuTTZlRDBpWVdSdlltVTZibk02YldWMFlTOGlJSGc2ZUcxd2RHczlJa0ZrYjJKbElGaE5VQ0JEYjNKbElEVXVOaTFqTVRNNElEYzVMakUxT1RneU5Dd2dNakF4Tmk4d09TOHhOQzB3TVRvd09Ub3dNU0FnSUNBZ0lDQWdJajRnUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0Z1BISmtaanBFWlhOamNtbHdkR2x2YmlCeVpHWTZZV0p2ZFhROUlpSWdlRzFzYm5NNmVHMXdQU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2SWlCNGJXeHVjenA0YlhCTlRUMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMMjF0THlJZ2VHMXNibk02YzNSU1pXWTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl6Vkhsd1pTOVNaWE52ZFhKalpWSmxaaU1pSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5ESURJd01UY2dLRmRwYm1SdmQzTXBJaUI0YlhCTlRUcEpibk4wWVc1alpVbEVQU0o0YlhBdWFXbGtPak15TURnME9FTTBNRGN4T0RFeFJVTTVRVFUzUkRNek9UQXpSa1JCTnpGRklpQjRiWEJOVFRwRWIyTjFiV1Z1ZEVsRVBTSjRiWEF1Wkdsa09qTXlNRGcwT0VNMU1EY3hPREV4UlVNNVFUVTNSRE16T1RBelJrUkJOekZGSWo0Z1BIaHRjRTFOT2tSbGNtbDJaV1JHY205dElITjBVbVZtT21sdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNk16SXdPRFE0UXpJd056RTRNVEZGUXpsQk5UZEVNek01TUROR1JFRTNNVVVpSUhOMFVtVm1PbVJ2WTNWdFpXNTBTVVE5SW5odGNDNWthV1E2TXpJd09EUTRRek13TnpFNE1URkZRemxCTlRkRU16TTVNRE5HUkVFM01VVWlMejRnUEM5eVpHWTZSR1Z6WTNKcGNIUnBiMjQrSUR3dmNtUm1PbEpFUmo0Z1BDOTRPbmh0Y0cxbGRHRStJRHcvZUhCaFkydGxkQ0JsYm1ROUluSWlQejRCMDdHeUFBQXVzVWxFUVZSNDJ1eGRCMWpVeU52UEZtQXAwc0dDaDRnVndkNnd0eE83bmdWVTBCTVZzYU1vMkJBTElvSmdBU3QyVVR6RnMyRHZnbUlGUlRvQ2draFJLVXB2Vy9MTkc1STFyTHNVYWQ3LzI1Y25ENXRra2t3bU0rLzgzanFNL01JU1RFcDFSMDBVT2RKR2tKS1VwQ1NSM29aR0dqQ2x6U0FsS1VsSlNnMUxVc1lySlNsSlNVcFN4aXNsS1VsSlNsTEdLeVVwU1VsS1VwSXlYaWxKU1VwU2tqTGVlaUZGZVRucHhDQWxLVW5wZjQ3WXYwdEZGQlRrbURkamM4ZmZTOG9mR1pWWllwUlN5R3ZKRStCc1RUbFdWZ2NOdVRpVDFrM3VXblJUUDFkY1ZNcVRmallwU1VsSy8yVmkvQTUrdk43dmN1ME92ODVjbUpCVzFCYmpDY29Qd244dTJ2ZzRocFdoLy9Kc3JIVUg1WStiaDdmWU9yV2Q0cW5mdFVHbGZyeFNrcEtVS2lQdzQyMVV4aHVWeXplMnV2VHhhR1JjbmhHbWhNQTNrNEZoUlFqUXFzcGlYWm9yaExkUmwwdGtNeG04YnlWODlUZGZpbnJreE9hcVlpVjhiTlNJRnZlT1R0VmJvTWJnZjVJeVhpbjlseWs0T0tSTDkrN2RvdGxzdGxTU0krbng0NENSdzRZTnZmKy96SGdiVGRYd3ovc0NhK3VMSDcyeFVqNkdOWlhIc0t3U3JJazJwMkRaOEJiN3pZM1VmUFdVR0pIMDhnSVdXL2wrWXI3SjdoY1p0bmZ2cFpub1JuMVB2bVRWWWFxSmp0eGxhVmV0bkE0ZE92elBoOFRFa1doYXc2d1hXbmRwMTdadHVxU3lSNDRlT3hJWEZ6ZWxpWkxTZHdlSERRWjF5UkI0UEI3Yno4OXZRMTVlZm9kRml4WmFpSjVQUzB0VHM3VmRsZEcrUS92UCtxMzEvUzBzekZmTHljbVZOWFI3aFlhR2RyeDM3LzRaSFIyZDJ4cWFHbUZqUm8rK1ZOZlBFQWdFekVPSEQxOGFOR2pnWDF1MmJBMUZoM28wUnQ4NGMrYnNqdkR3Q0tzSkU4Wk42OXUzNzR1NmJPOVRwMDk3cEtha2pqWTBNdlRxMWJQWGxULythSmxaMVRVdlhyem8yNjlmdjNzVEprd1UvUDMzMzZ0TVRhZDUxdlU3WDc5KzQrOEpFOGI3Tk9xZ0JNVGIwTnZ5MnluN3NCVXZjV3pqR3h6Yi9CYkhWcnpBcDU3L2NDa3RyNnhGZGE0L0ZaWnRpZG05d3JGWkFmam13TTliRytNZEpHM0hqaDJ6c2wyMTZsdENRa0xMMzRYeHpyZXlLa2IvY05pS2k0c3JoZVMycTFaL284clc5cm53ck50MzdrejEycmZ2T3R5M2JkdTIxSDN4SzFldVdJdVdQMzc4eENIcXZNMktGYmxjTHJkUmdFRlVWSFFicWg0THJCY1cxOGN6K0h3K2M5VG8wUUxxT1UrZVBCblNHTy9hcFV0WDRUZUJDYm91NzQwbWxBVHEza0ZCendaVzU1cWx5NWJsVTllWW1VM24xam5nTzM5K0k5eWJIQk9OaG5nYmxDbVZDQVNjMGFmamIyUExudVBZdGxBY1d4ZU1ZL2F2OFYzUHY2NFNMUnY1dGNqSTQra1hPNnZyeVVmbit5Y2Zkd3BJMy9UMFkvNUE2bnh5UVptdXdhNklHR3pxUTl6U1Avbms3OEIwMzc5LzM1N3FOSzFiNitOSGpodzlRVy93dW1Ba3BhV2xzb0NXYW5MTnRtM09NVkFuaTFtenEwUXo3dTRlTDZEc2tDRkRCVFY1UmxGUmtjSkdSOGRQcTFiYmZWdThaR2xCWDJOam5NUGg0RFFtTHR5R0R4OGgyT2E4UFZMMEhoUWpXclI0Y1dGalQxWlVYVHk5dkc3WDF6TlNVMU8xTkRRMGhQMkZaUGdOUnJ0MzczbE0veTcyOW11eTZ2TCtycTZ1YitHK2YwMmVYQzJwQ1pDb2FGL1p0MisvZjEycWRlajNualRwTDM1RHQzbURxeG95ZVV6OU1mdWliNzlQeUcrUHRWREFzT3hTVEs2SlRObVYyVzBuRDJvbWU0c3FoOHZLS2krKzh2R1E3N3RzYzZ3UWZTOEdFcEJ4MUU2bGFCeklzYmIyYUsvODFubVVqdU9nNW5LM1hpOXFaekJEVy83bXFWUHhsdmtsZk9WVDQxdE1iY3pCS2lzclc0Wm03SUlEKy9jckpTVWxZdGJXQytaYVdzNjFNRGVmYVdaaVl1Sy9mYnRMTEdJNitrYWRqZkxMeXNyWU5iZ3ZMeTB0WFRIeHd3Zlc5Qmt6K1ZldlhHYUxER0FWaEpoV3NObnNJZ0ZlMFZORlRsWW01OGJObTNwRXVaUVU5c1dMLzY0Z0VKZEFJRTh2eDJSZ1BCa1ptWUlIRHg4YXdYNVdWaGJEejgvUGpzRmdja1hMQWlrcUtLU1BHemYyTEpQSkpCZzBFbEZMbmo5NzN2TFJvNGNNY2U4d2NOQWdmUFdxVlV2YXQrL3cwTkN3VXp3cVYrSDhwY3VYbDArZE1vVzRWbGRYTng0aDRrWDUrZm10eFU0K1pWdzE4NWt6VmlvcUtoYUpZMllNQmtPQTR6Z1AvUmM3UWFGelVHZDJTVW1Kdkw2K2ZqcjFEaFZVQWZ6eVEwMlVtaVRVVjM5cDJiSmxKbUkyYzVEWWV4cjZpNHFLY2w1RDlkWFhyNE83OWVuVGV5aEdxSjhXRlNjbmYrUzR1Ky9VT0hmdTNDWnpjM09udW5qR2g4UWtBL2cvZHN4WW42dFhybFJaM25tNzgybVNZWWRPbkRqUnRFdVhMZ25MbHkrYkNPcVEyYk5ucmE5dGZZeU1ET09ndlM5ZXZIak14K2UwakwvL1ZXYnMrOWlFME5CUWcrN2R1OGMySks5b0VPTmFaQzdmZU16eCtOczUzMHBVTVcwMGhqOFhZZnF0bEJKdnoycy9wb1VzSGtlVmk4MFg5SnJpazNBbEpibWdKYWFGSkdJT0M4UHl1WVJYZzZ5bUhPSGtnQ2Vndm9tNHk0cnArbDdPZ3pRSkpyTGkzcGZqSjN3UzVwbVp0L0U3UHJiNTlNWmt2bUJjUXg5MjJxclZxeSttZkNxMy9TRTBnNkdCeFFDeDllZ1I3N3F3dmpIRURLTFFobnpQRGgwN1l1OWpZeXZVNC9idE85TURBZ0s4RUVONWlSaWFYN3YyN1I0SEJqN1pzc0JxL2dJazJwVWNQM1pNWHRMOUFDRy9ldm15V3M5R1piRW5nWUZ5NHZTUk5XbGptQXpRZmRqaUdDK2djcGhFamg4L2NYaisvSG1MYTlJMkwxKys3QjBYRnpjTjhmMUtwUVlXaTFtTU1BWGJ3c0xjRWZiUnBMZ1NUUWJOS3JzR3pSbk1kdTNhWGU3WHI5K3IybncvOU82Q29LZFBHWXBLU2xoaFFRR0ROR2pkSS90VGQ5U2YzdFgwbmdoTXlHWmtaS2hvYW1ybW80bGJidFNvMFRsUlVaRVlta1FYang4Ly9oaWN6OG5Ka1VjVEgwdzYyZlJyTnpnNHBMcHMzNjdUdlhzUDFINHZpRzk3K2ZLVjVWT21UUGFDODJmUCttNmJOY3RpVTEzMVgwZkh6Y25idG0zVnBmcnkrWC8rYVREbTJ5Q0k5MkY2NlY5L25ZeS9RbkJOTFRUdTBncXhmbDNWWDk2ZTAyNE1pOHZORVE3YVR5Vm1abWNTTGhER3RwYUs1UWUvRm1NeWFuSzgvVlAwbGs3cW9ISU5EcjM2WE5USDdmSG50WjdINDJ4Q1B4VjB1Mm1oTjhUVHBObDhKUTZyd092b2V4dnRKaklaT3dacExtOU01bXRxYXZwdmVucTZ6cXhaczFOaDhPN2R1MmNTSW16QWdQNEhtamJWTnBPVmtTMldsWlBMWTVBeWp5eENtcWxwYVYxMzcvSlFnK3Z0N2RkbU5XL2VMTEtNeTFVaUJpaVR5U3N0TFcxU1dscldSRm01U2JxOXZWMkY1Nm1xcW53Yk8yNGNNY2psNVJWd1BwOHZQTWVSazhORFFvTFpDUWtKR0JKcnNSRWovdVFoQk11Z2w2R1hEWDBYeWtZTUZZTUJPWEtrQ1IvVkRVZjFZUHhnRml5c3VMaUkwYmx6NXl3M1Y5Y0sxNDhaTS9vQytuZUJmdXpZc2VOOFV0OHJzYTl0M3JJMVlldVd6Y1F6dHpsdEMwQklsWXZxSjBlZGw1R1ZLY3JQeS85ajQwWUhROWhIeU5sZWtoRW9Nek5EcHJyZkNVa1FESEZNdDdZVUhoNnhHS1NkbXZlYmFYdXJKY0s3N1J5Ty92WCsxZm9oS2F6MDFLbVR4RGM5ZStiTTRzbVRKMlBnUlVCSmE5T25Udy85RmVhTG1LNGlZcWdab3NmUi9VRjNmNGphWDdIU05oZTZMYlVQUmpqTE9YTjA0TGVuNTk3aDFMZEZUSGZmN3QxN3BxeGFaVHNVTVYzSFBYczlqVzFYcmpDcGkyK0VtRzZyVFp1M0pEbHQzYUlIL1gyNWpVMDAxb0FCWmZYR2VPVTRzckxIM21WYkxibVFkQUJ4RGd4VGtjV3c5RUpzOG9DbVYzMG02a3pHdUQvMDV0N2hlWFoyRjVQY01WbFVEcEF1K081K0tjYmE2aWtsWExkc042RWxCME16VVRtakdONUM3dHB3QzcxcjNvWnFkbmFIWTl6Ylp4Ui9qbDdYMVdEN1lLMFZESFNaNTdIM051MjFPUEZ6T3lwNU5TYnpiZEdpUlhwZVhwN3FuVHQzUmlPbVMwd2FxSE1CeDdRVFAxakR1eURHR3dhL3pjMW5ERWF6YjB4MW45VytmWHVBMWl4SjV6ZHRRaDNNYVlzZU1GMC92d3VWTWlhWEhUdkNONnhmM3hrOUh4ZFZhZERwMXMyYjFhb2JqODlYcU96OHFWT25QUzB0NXhCNnRnTUhEdXdpMitnbjh2SHhjVVAvRFB2M0g0Q1ptWmw1U0xxZnd3YUhIdloyOXNxeXNySjVrbEVqeml3cExWSGh5SEZ5RVhNUlcwWlJVUkhtUklhYW1scFlUYjg5UW53Z2ZSQ01kKzI2ZFJtYUdwcUpYQjVYc2VJa3g4bVdrWkhKS3l3cytJTlFiYUE2U1JyNFRDWUx6YnNscXR1Y25OcnllRHhNU1VrcDlWZjc1Yng1ODB0UG5EZ3VTK3A0QXhCVFBFeWQyK1hob1JVU0VsSU1rc2ZVYVZORC9mMnZ6WjgwYWVLSkd0eWUyYVZMVjZ5b3FCQ0RpWjVvUnpTWjZyWFNnd2tSdGFrU1NINWdEeEJPcW9HQmdjT0dEQm15bXRUeHpoazhlUEJqK2cwUjB4MEdSci9GaXhmTlFFeDM1TUtGaTRxc3JLeU1lL2Z1RlY3Yk1ZcVlibXN3NXNGa0EraC9xNVBUKzgyYk5uWDRUelBlekNLZUpzRjBRVGVyaGI3emx5SnN3U2lkWTd1SE4xMVFBZTA4eTlxMSszcktLdkRkeFJUWjVjRVNDT2tPNjZVWjREK3I3U1JHV1puWUFiU3dtNHFIb1ZQUHlERnU0YmViT2J6NW1yaTFlMnZuSVZvck1ndTRtamE3SXoxN2V2UUo2YUxNZk42WXpGZFptZERaK1ZXbmJHcHFhc3NmdjlPQUc4VFVWVDE0ZkM3QmJPbklWUkp4dVZ4Q0hWQlNYTUtvaTJjanhFeDhQemFML1pPWHhHSHZJNmNSMHdXRENsaXpDNERwN2o5dzhJcUdodnFibVRObU9GUGx3SERYdkhtTE5RUWpXN3NXbUlIRTU5VjBRSjYvNExmdVRjaWIxUnlPWEJHQ3Z3S0V0dm1JTWJOT25qeEJNTUViTjI1NE9qbHRzK1Z5ZVNMcUN4enIwNmVQb3ppM0pBWURFNktLNWN1V0dZRXV0NDRtY3h4SlVvUSt2cWJYeHNYSHQ5amt1Q2taTVYxaXpDTW1Fd2RNcmNKa3dPR1VSRVZGdDUweWRVb0NvRURVenNmMzdOazd3OVoyWmJWUXByYTJkdjZyVnkvbEVaV0E0UTZRNnBMRlM3UGMzZDIwU0V3TS9Wd05TVCtLUjQ5NEU2NWpDSlE4RXFva0l5TlhiWFIwZE9iekJXeWFmYU1vS3p0YnFBLzE5ajRzZi9yMHFUQjNENC9uNWpOblR0VFIwY211VFp2dTNiTkhMU1k2cGd3a1U4UjAyNE9heU5qWU9MamVtVU45V3ZuUFJIeWJCYTVpMklJZ2ZOM0R0QjJpNTgwdkpma1NIZzViM3VLWWF4aU9iVUwvMGY2OEs4bkhSY3QreVh2WDdWNmN2YnQvbExYM3EwOWVOZ0lCbHczSG8zTEtPbUcyTDNGczFVczh0WmpYRW83MU9oQWREUHNsZkFHbm9UMGJmcFZ1M3J3NWx0UTg0QWhwekt2TGIvejMzM05BZE1QLzBOVWxtTitEaHcvSGRPL2VnL0FlRUxVYXIxdTMvak9VQldzNytOMVc5eGxwYVdrcVlOaUNhMENYQnhzY0oxMlU4Qmt6WmhMTUNNNlhsSlJ3d0NCSXVRNGhWSVNUT3M0VjJBOTNzMFYwbEFiSEFPM1VkZjlIaVBRckpzYnpvam9iNlFIeUUvbjVYYlNqeWtCYml5dmpzV3QzSUhoOWdCZklzMmZQQjFaall0WkNqSTI0NTRFREJ5L1dhSEk1ZjJGZGg0NGRoZlhlWE83bUpaSEEyTlNyVjI5aGVmQ0dJVDBPcWsyTGx5d3BnR3ZCTUNidS9MMTc5eWJCUkFKbFFMOUxlZE5JMnFBT3ZyN25uTWkrUW16Z25nanRGNStRMEtJMmZjRDd5SkhUMUQzcm80ODFpSTZYSlZPZ0dmYjV6Q3dqemNWNy85SlhPSHQwWG52TzExeHVzeFU5VlozcDVhWmRTcmw3OTNXbUNSRThJWVBBUlI2WGlGcmJhcWEvZVZWUDFRcFcxZkFNcnpVUEV0YnRLT0VKbUN4R2VUUnhjTXJCeFZNN243UFFsZW4wTnNXbDd4OXR0NFI4YUxraEpPWGJ6ajRhankzMWUydTRSSllPT0JiM0xHQ1dYcytHUUxjSDl1MWQxN05uenhEZ2E5aHZSaVltSnE2ZERBM0hxS3FveEMxYXRCQXJMaXJXQ2cxOWl3YllXd1hVNlN1MHo0UUpFMHk3ZHVzNmxDTW5sd0ZHa09yUzJiTytEOWF1WGRQckovM3Q1azNrNFA4SCtock9acGQzT1RTd3NaQ1FZQWFvRUZSVVZOOERpbTNWcWxVZ21neUtEaDg2cEFCNndYL09uOWVNam9wZXNHMmJreXlVMzcxN2x5WkNQSFhhTnNPR0RWdWlvcUxpS01PV0tSWUlCR3dtaTFuR1lyTEt6cHc1TXhUYUNQU1JyWFIxUTVFa29NUmlzNHRLaW9zMXRtelpiQWdpZjhzL1dvclZ0NVNVRkd0UnZ3Vjh2cXk0TW9FQkFRUFJCSVNCWHQ5MDJ0VFNxdXFKeXNwbFpKU3JUM055YzZzbERrTkF5b0dEQnlObXpKaXVJMlQ0SHJ1ZTJObXRydFJuR05SY2lORnJiOWpna0FiV2Y5K3paMkE3dlhqSjBvTWovL3pUYnNxVXlaVitCSEI1bEpPVFV5VDExbHRuejU1VlVkSTU3TzJMK3FRNS9QNXI4aFMreS9idExXRXlidFZLZHhscTQ5SWZiVmZ1TmdsZU5acWFHbUYvamhoeE96ZzQ1TjlEaHc0Rmc3b0UxQm14c1RFcUN2THlwYlhwQTY5ZXZwcEJSOVF3RVE0WTBEL29QNFY0QzBxL05MTy9pZUUzWTVidEUzZStpQzlRNkhzazloV0JkTGUvSzBlNmExNFQyNm53YkV2Ujh0ZWlyWTZ1dTQzaGJvL1ZjTThnZmJTMXh2YytiWVU3b0dOYjdtRjR4T2R6NWxBdWk0dHJLcXdQTG1TdkRlYkNmbllaWHgxYitoejNmSjFwVTk4b0Y0bWo0ekdoYitBay8vdjM3Ly81T3lGZVVRTHZBK3BaTlVVeWt1amd3WU1YQVVVRFVxSTJzSnhUejBITURhZWZweEN3T0VMaTdUMDYyb0h5OGZIeHVnMDVXVkdCQlJBQThwTitqczJ1Tk9nQnhIcG8xeHMzYjFvQXNoYzlUd1lURVBjQTk2M3ExQWZVTFlocEJycTZ1cjJGKzFaV0ZnSlhRSktobzF6WVNEL1dHaEVwZVZTNHo5aHg0L2hRRCtpblVWSFI3VVN2b1VzdVVHK3dHNUErd3hqcDIwNmNBN1Q2cTk4SDZtVlhCMzdIWkZ0V2VML2xOamIxNnRaWEw0Z1g1NmwrbWRQVFo0NW4wTitudFpVTW96cXF6eFhPanZGNWdoNm1SNk12ZmtqSzF5ZDhlU0UzUTJZSkpxUEk1dDJhMTM2TXNaYk1neCs2blRMbEMrR1RyMFIvZlRoY1cwa0hZekZsTVFiNksrSGxZTVhjSEV4TFNSZkxMdnFFSFhsbDdqdWptNnR1RjYyVnJtbk92WFMwTm9Sa3R0NFZrNW0wMmtETGY2WGhwRWtuNC8wbmQraHlWWTB0cUxlOERvR0JnY0lCNk8vdlB4RTJoQnh2V0ZsWkhSMDNidHl0M3kwT244VmlDY1VwRlJYbDVMcTQ1NUlsUzB6RkhRZjFCcmpWVFo0OHBlelVxWk5Db3dwQ3UwVFlyRGl2QWpVMU5kQnZqNFRmVTZlWjh2ZnUyZE84cW5CVE1JeGN2WEsxdmJ6OEQ0ODFoRjV4ZVU3NWZsbFpHZWl2aFhwcnZvQ1BsWldXWVFhZERIam5mSDFsUkVWdGhQcUkzOSt5djNWRi80UWh3OUhSMFcwNmRlcEUvSmFSa1JHclcycmZyaDJFWkVzTVNiMSs0enB4dnlGRGh1TFY5WmxWVUZDQWIxWXBVZ1dkNmZVYk55NmhpVW9IM0xoRTZjM2J0NnNSdyt5TWx4dnlxaVQwZm9XWldkbFJvc2R2M2J6SlJCczAwUEZMbHkvYndOQ21uMy85K3JVanFVNzRLekl5cWowWWEzOUlHRU8zdUxudDdQejgrZk1lR2hvYXFXaVNmZmc5SjBjZldCN1VpOFZpY2hsTUJsOUxVek5jWEo4Q05IM3c0S0hibVpsWnlTN2JuVnQ0dU8rc1ZiKzlmT255VDhiRGZWNWVUU0N3d3RDdzA0Zi9CT0l0NVFsa3c3K1dkSUhmanhQVzdiQzZDSWowN0N6cS9GblErVm9INGRqNkVCeHpDOGV4bFM5eDdSMWhYeU96U296bzkvbFc5RUYvLzdPT01ZQnFQWi9xRVp0WFVCdmM2UUViMy81SW9UQWsxZHY2ZTFHU1hrck9DK01UcndjOG0rZUg0YmRpbCsramtDKzI2aFhlKzFCTU1PeHZDRWpmRHQ0VjlZMTZFZk1kREdpWFBuUHE2T2lrVlJXaVc1ZUlGOFIyOElmdDMzOEFFWGttYVFQa1NUMEx5b3NyQTVGYnNEbUxpVENyTHAwNGNYSWY5Unh6QzR0S3d6K2hvM3Q1ZWQwMk5EUVMxZzI4TWFyN0xFb1AvSXRiQmFKSE9BVUVCSXlVZEE3OHAydmFKaUQrVTlkRFRvaTZITXQwSkkyUjBZZWdZM1p5MnZhK0ZtMGo3Q2NwS2FsYTRJSkZJWDdTZG9CSmtnamdOeGlyNERjcFFkQjExbXFWUFkrS25JVHhBLzY4RUdBRHY4bm96enFSRE5GRTFadTYxODJidHl6SXNVcnNJNVQrcnI1NGJwMGpYaGttZ3pmT0wvSG14a0c2Mjh6YmJWbWZXZmlocmRleldXZVdEeEF3V3l1YitVelNWemg3eWE1ejBkUlRjWmV3Nk8rWWZsZjF4Q2ZXSFllb01QaEM5NWp2WlNFRC8zazM0WHBSMlhmVnBrM2FZQUtjajRBeEM2SGJENWlDakdyT2pHN1hKNmpMOWc2QzVsR1ZhZjdSMVBEaEFCV08xUm0vc0gzTGlybmZWVTMwajgxT2RlN3pSMHU3NXltMkR4V1A3aG1odmFBWVkybFQ3bWoxUlQxNjlYMXk5dHlGSjRHUEg0eTNzYkh4VEV4TTFFZGk1RXl3OERZVWtzM0l6REttQlNGVXl5dUJMQyt4Ykk4ZVBkVi90VDRYL0M0c3BYNmpkaUJRUHhoQ0lFa1BFdE9ISlNZbS9aV1ptZGtIaWViZGV2YnN3UUdkWjduZWJ6SmZTMHViR3hVZDlRY1lYaWFNSHorMXFvQ0JSWXNXOVRXYmJ0YUdBLzdSREFhdmZIQ25EYU9DRXc0ZVBQaXZvYUhoUWFvOGw4ZURRYXdneitIa0RSMDZ0TUs5ZUR5dUVEYWp5Yk9DZHdrZExjcklzRXRFUmZ3REJ3N2VyY3lGenRaMmxaQlpQMzRjY01qVmJhZlNyNG1XQXBhK3Z2NDV1bXZkd0lFRGdyeVBIUEZaWTcvbTcvVWJOb1Nzc2JmckN4TEZxZE9uUjZ4ZHUyNDJRczE1cVA1MG4yeHVZV0docXF2cmptYms1RlhXdGwzYjkwZ1NFTllmb1UrOHBLUlVFVjM3alpRNldzT0VjK1BHelN2OUIvU3o4L0U1WGRIV2NmRGdsYVZMbG1EYlhYWkVPR3hZRDc3alg4bG5FU0h6Nzk2RmRlclJvM3NrMnYrT0psa01rRG1hb1BjM2I5NDhDS0hka3BBM2I3WWloTnkxZlljT3BZR0JBVmhzYkt3ZUZVU0JtUGhMOERnZ2czZEFDcWlWdDhpKy9mc0pyeWZ3Yng4MXl1UUNTS2JnRHcrSUhrbFpYY0ZBRE5Hby93a2Q3N2FuWHpaaVM1N2h5UVc0THV5ZkRqRzV1K0JmREE5Sk9ieUlLdk00cFdEb29ndUpoN0pMK2VyMGE2Ty9YcHptZEovRmQzckFJaEF1Z1hhRDlQR05kd0Q1dGs3NlZoamZWdEp6d2VOaExrSytmbUdtRjJIL3hSZUJNVGJ2Q1g0cTdKdGxRM3MxZ0Y3cjVNbVRsZzJ0NHdVMEJrbEE0SHBJUWlOdUEvMnVWM24rQWNMTEFYUmxvSStrenNPMXNGRTZUaEsxMXBqdTNicy9nWTVnSU9rTjZHNGhKd0V3WDJDOG9pZ0hyUFlnZXNMMTlNUStOYzFOUVJFNDVvdERXMVhSL2ZzUGhIVkhDRldEZm83OE5zUTVVZjBtV1JadnFFMWNBaDlvSzNGNjE2cllPR3hVT0xra3F1bzdBR3BVVVZFbDh6NnN6WVJjRFpDM1E3VGVsTWNMaVdvaDRJZEowOTFDOGlSaEVodnc1aEJ0YnlyWmtxZzBVaE9pNTRYWTZ1UWtWSlVjUFhiOENIVWNmTXovTXpyZWxUMVVuWjhtTlIzVXlqa2tPZCt4TTJPS3diVlJPRGJoL3VHWGl3N043cEdwMmFPWnZYTXZkWFpBci9FdEFqRGVEK2t6SnZ2WXN1c3h5L2JKeXloaFNySk5FYkxnbzdmSHNZejhSRXhmdmUvcm1kMXZqaE53bFlUSzlOZlp2T0ZYWG1WTzN2RlhxL1ZZV1ZsQlA1MXQ5Z295bXBrbmd0ZTZzWmd5dmliNkp5eU9MTysrMFBKSStFbWpqZDBqT3lnelF4b0tlWkw2dUZNTnJic2xmVmpEcThHUVFNUWEzYk5uTHo3ZGdiNmlaYnZIY2RLaUxQY3JkVG50NDFNaGxhS1hwNmN5cGJkZHNXSkZDa0lWTEFnbEJlOEZTQUU0ZXN6b2E1TW1UclFHbjFkZ3ZyYTJLemsvOU1GdnVpQkcvb2NJcjJCcWFXbkZWUlpvNHVmblp3di96UzBzUXNMRHF4OEhrWlNVTkprMHNJRnZhaTc5WEZaV1ZtOGE0aTBWMFUwWE96dHZqMElNU2dieVJkRFBLU2twcGQrNWUyZlkzVHQzR0tST09rNUdScWFVeitQTC9LeGJaUmZuNU9RMnA1Q294YXpaM001R2hwRmNMcThjaVRNWWZBR2ZMNGNZMEQvZ0Qwc25VbWNlWDkxM3BldXNjM0p6RFNzclcxV1UzOXUzYnpmbTVwWUhvN3E3dTJtaWY1cjA4NEFzQncwZXdxZFFaRWxwdWE4NGFtOXdCMHNscFlZS0lkT1U5Q0t1dmZGYTVNOUQ0RU00UHMxbnpoeTJlVk81alhPdTVad2xkcXRYTDREMzhQWDFoUWpZRmY4SnhGdFF4bGVDL3hvdTc3TDFQU0krVU1kOVF5ZjZneTcyZXZSQ2I5RnJIc1N2MjdFZVBCY0MxQkhTTGZkYzJQV2tCYjd1Rm9hZmZ6ZkpYNER6bWZUeWQ1THlSMlByZzNIczcwQzgzWjdJK01TY1VuM3EzT3VVZmN2bVhjVHdlM0UybnJBLy9uektkYlBMSHkvOGYvUGpCZmNjOERTSWo0Ly9LVDBsbWYyTDhKOFVkeTJsbDRPTjlFbkZ0bTUxaXE4S0VZbERFOVMyMHRZMjUreFpYeWRxbjdKSWs4aFlTSFNQaTZvMk1zV2ZSRU1UVlE2WUM5MXdCcyt1ekp1QThxb1FoeWdwdlRWNERJRHZjazIrQ2VoSjRWcElrMWxWV2RKWGx5aGZXRmlvVUYrVE5Za2lpZWRBTHViYTNDc3lNcW9kZUtDQUx5eDRQWUQvTVBVZTRxUU9LZ01jbktPOFhTZzBTN1U5WFJkTWZVZXFET1NYK0NXbVc5Nyt4RDNjM0hiK0ZDeEI2bmVyN0dPMVFieDF6bmlXM0VrNWNDOHh6NFJnUWl0ZTRJTzlZd09wYzFjajU1NEVnOXZwTjhNZkptVGROVW42OW1qNDVRZ0xYMUFsZUFRMkl4Z3VNTjZkQVJyNGVzUjBiOGYrN0pMbUcvbk5uSEEvVzRzWTc4NXdIRnYrQXNjY1F2RDQ3QktoR3VMVnAzM0w1aU1tSDVhK2J4bnNCNmNYOVdvTXhqdCsvUGpycTFldjNwV1JrYUZOaVZjTnhYakpkSWJFL1U2ZVBPVkpGeGNwUjN6UnRKWGlSRzNvM0tTUkMzeHc4Ymk0dUNyZHV1akdPMnFEL0FDaW5SNGkxK2pYZ1hzV1ZiZVJJMDBFd093aG9BUEVWdGdjSFRjbGsyNW9oRnFpc2pTYmtLSVNFNU4zbFdUNGxhYTlYTHUyUEtpQ0RDYXBRSlE3MU5ScHBqWHlWS0dlQys5VlZWbm9LMVM2U0hqdkJoQ1dpR2NCbzZ6dGplaHFBM0tpNnlpSjhTSkpoMStWR3FXdUdTOU12TlQ5SUlCRFhKQVFQSk5LYVVvR2t2eitxZ2JqRm9xdlRMemYzODNmMUptUjZOeXpqYjdOcXc5bXNzemJmbWE2WTBhMFBqUlhoZlBIcDh1UlRwdmlNaDROVjVKcmdwWHhDekZOeFZZWUEyTVNXMzVwT2xiQ0s4WW1kUEt3NzZ5MXJFSk0vcEdJdkZXckx5VHV3amhzc0t4aHNBd1EwRGhEdFZzcUhGWWVaVURycExGZy82d2VXVnFIWHk3ZnQybEUyNFNPS3NQdU5MVFkvL0hqUnoxRTQyL2N1SUVoZEdVZUVSRUJMalZaRGZGc1FERmR1M1laRGIvQkVOR3RXMWVoT3NIdjRyOXJLRWY4M3IxN3VZdTduc2ZueWY0d3dEREx1bmZ2Q3RGSDNoQTBzR0NCOWNmUzBsS09wQ1ExVk1JYklGUk83czZkdTdNZzlMU29xSWdZa0RiTGwwOEFKdlQ1ODJmbG5qMTY3S0xyWTAxTVRGYURnUTJjNmk5ZitsZFduR2hMTXNObVM1Y3RBMUdkSjRseGFXbHBFNnFKYWRPbXpUcCs3Smp3M01RSjQwMDkzSGMrQ2d3TVlBQVR0YlplTUU4TTRpY0NJTkQzZXlSR3oxbGoxUXZvTFNkUG5rem9pcmR2Mzk3ai92MTdsWlozY2RrUm5aMWRIZ2xyYVRuSEdJbnR2OVFQSUJsL1NNaWJXWXFLaXVreXNqS0Z1QUN2TU40aGpXaFdkbGJYbVRObVVDcVdHUUVCQVcrS2kwc3FHbFFaR0ErdXpjdlBiNjNmdXZXZHlwTG5zRmlzQ3Qvc3k5ZXZFdFVYNkIySlB2SGc0Y094QmgwN1BsZFhWeTg5ZmRybitLSkZDODBGZ3ZveGhtOTFjb3FnZnUvYXZkdFJuS3RueTVZdHYyOXozaDdsdU5IQkVOd2VBUUJzM3J5cFhaMVdwRDVRWDU4VGNhKzBYY08rd3UrQTFNS2hzRkxFaE5QeDE2bnpvV2tuNWtId2crTmRETjlMdW90QlVNUW10TC85b1h4eHpOZkxVMFR2YVhzbmRRKzIvRG1PT2I3Qk1iZXc4akRqcGMveGhUYy9lVXVxaDg4Yms3dnVBVnFaalJFeWJHZG41MDdOckdpd2JXaElWUU9KcWdpeFRSU2hVa1lyVXN5clVsVkFxUUlnMm9nNkppbDcvN0ZqeDRVclNGQkp0YWx3VEVudVpHQVFKRkdkTURSVVVyMUk5NjBxWGJHb0JOK1NFbkJUS3lPQWNWRVVvZEZGYjFKZFVkRVNYaDVpTGRHVlN0ejcwWkhjaXBXMk9XRGNsQlJLVEgvSDdTNDdhcFVJaGd6WHJWT0RuaVQxVkZXR1NsTE5Vc0ZJUjZsZXhQVTltbkd0emhBdjNhMnVxaUFKVU85QTBBOVZYbExvODIrRGVJR0M1clFkSkd2M3VuVHU5ZlNMSnllME1QMTNVM2ZUYVZ2ZVhqVGw0N2N2VHRjZDAxYlYvSVJWbjA3UjE2TG5ua3pMaXhFT29KWXFuU01uRzUyMVVHUjJxTkRoTEsrblg3cjA5TXNVVEpzRHlkQXhyQUNOcDV3eWJNTlVQWmYxZmRVZEtxQ0Z3TXdkMDN0clhXaWpnTDJiMGZYeTFLVHZqNFkzTk5xRndheW1wa1lzYldOZ1lCRHI0T0RnMGxEUGh0d0RicTZ1aE5IaTBLSERFOG5NWlVMZHJiR3hNV0cwR2pkdTNNMjdkOFFMQWdpTkRxVis2N1hXZTBQb2hSY3R0TmkwZVV0L1NLT0hFQ1JuL1FhSDlCMHUyNFV4OHBDVHdjcHEvZ3pLaUxKMTZ4WmRkL2VkbUNqS0VoSHBWSkM0R1FhaHVVRG9ucC9obnVDMytUamc4WGJUYWRNbURCNDhPSkFxNzdaekoyRWdoYlNaa25LbmdrdVhwcFlXVWY5MWE5ZjJFNWVBZSszYU5VWmJ0bXd1aHNDT1BYczlnVWtQb2FrN2lJQUdDRkVXNThLR1VMOFNhV2lxbGdnS3JtbUlXYVVoQ2FncGFtKzI1OTQ5b0JjR2FXUTA1QU1lT25Sb3FxR2g0UkgwcnE1Z2tCczBhRENSVnhuT09XeFkzNlUyZlFFaHQwZElaRjhwTDg4cGs1V1Y0NHA2SmJDWUxINVJjU0VIc25QQnZwblpkSjYrdm41V0daZjdFNnFIOFBHaXdrSU82ay9uYTFJSEpTVkZRcnpLK0pwQnJHN3k3UG16M2hmOC9MYWdRODVJWWlFeXdFR2lJcjFXdWcrWlRCWTNLQ2hvYm4yTUN6TDFKS3dRZzRFYjIwNDNOKzE5WHBJVEdFS1NmUVEyemdINmh2M1pzMmV0UXlEa3VZbkp5T3QxVXFINlFuNzNrL1AveE13RGNLZWdMNXNJM1d6MGQzUFk3Mzh3NWhta3dJTmpBZ0dQSGY3NTdLekFSS2RONFo5OXpVWHZrVkhDMCs1em1Bd3ZkZzR0RHkvZUVJeERVaHlQbHhsMm91Vk5mT0x2QXJwV2RRbjdIcGxSYk5RWXkvK1VvNko5eTZpWmtnd25ybmZqR3VnN3llVjB5dlduNVFpMUF0R0RERWdrSVphb0pWc3dNdVJUSEpvVzFUMENJcUQwa25UREZhbkhsWWg0SVNRWGRIMzBwWUNvcEQ2Z2c2UENYQkdESkF4ZW9Ic1RkZkdpRTNVdFZ1NEtwZ1pCQmRDZWdGUmg0SU5oRVpaOG9jcEFuY0VRS2ZwK1lCd1NkMzhxaWRDdnJNVUdvai9vVVNFSnR6ZzlPRVpML3RMQVdLR0NJZlZYQ2ZTbDBLOUFVZ0RwQnhBN2ZWMDVhb05rTncycDQ2VW5MWUtOUk9IVklyTGZFdGRCZ3A2NkNMR3Y5elhYMWo5TzM0Rk5mNFQ3eHVRUVRQVkNiSTRaNFluZ0doYi91WVRYckxKcjMyVVVkOU54QzAvRGJGN2dtRXZGbkE0K0VkLytwcGZONWZLVmUzdkhCaE9HTmxCRFdEN0JEUTdIeGpRVzQ5WFcxaWFNTXdnOVZEdmtzTGFNbDh4WEsxRWNwS3NLU0t1OVpCMGphZFVGNWlBcWlvUHZKSGhMaUxzT0JweG94RTlWakZjY1FWZ29hWXpEWVhEU0krQWtlU1BBb0NjSGE0M0ZaOUlRVnlISEFOMFRnazVVUnJXNldCY09JcWZJdHZ5SjhZSkxuVGhWUjEwVCtaN0VjMGtmMWw4bVVuMGl0bzFoZ29PMS84QnZuSnJvSU9jRDliN2dKUUlibGJHTVlyejBTTDlmWWJ5a3dWQllEOUszdTlvRTBYb1VvS2dNMVB4V2pCYzJZbkZMaXdEOFdtTGVSTmkvblp3L0dsc1lSQ3h5ZVM4cDMwVGNOWmRpY3FZd1lBWGkxYTl3YkVkWStZWlFMbWZ6bStLSHlRWEQ2V1UvRlhCMTIrMk9pQ2NZdEd0NU9UV1hkOThmZmN3ZjNoaU0xOXZiMjVyNlFKNmVuamJWL1JnUEh6NGMva092ZW05U1RUOG1PSnBEaHhCbmliOTE2N2JRUll2czdKVVNHU1pjSnhiZFgyRzhGSkg2WG1HSEozVjBFdFU3OUZWdDZVd01VREI0UklCSEJURFhKMCtmRG9IeXBBNVlxTytqZEk3aTJwQWlzbXlkcFErRVNLL0tKZ1Y0SG9UTDFxY2hGcXNqZHpLUWppaXZGR2hMUUx5US9sSlNYNExRZGt3a2VROFp0Q0RVOGRLRFVpaDdSWFVaTHowWUFqYXlMalVtY2p4VytDNGc4UUZUL20wWkwyd2Rka1c4eCtZRTRwZmljd21qV1doMlNUZlpEY0dsZ0V5dHJuODYraUt0MERpN2lLZitNYWRVYjkxRGhKSVJVeVpXSUFaR0Nobk1FSkxWOVloSWpzb3U2VVMvNytzdlJYM1VuTjk5eDJ4ZmxaZEZ6TGZWcm9qa0Q3bGwrbzIxMHJDYW10cDMrREJNSnBPZm01dXJUQ25xazVPVGRXSEx5OHRURnZjeFlLVUtqQlkzTG9tNWdGRUpObkZacjhSYTFLOWV0YVppNXlHcUNId3RxOVFUays1VTFYRjlxb3FxTXE1VnhrZ2gybzFxRTlBcFYzVU5lRE1BVWdJbUMrSmxWYmtRb0czSUtENk1sQktJWjFVMm9NQTRobFVqcDIxbEJBd0QwQitGN21DRENDL0l3QWFNQmlRU2VqNWN5dWhZRis1ZVloaHZuU0ZlU25WRWwwcklySEppM2Ntb2lZNGVhVWNaQkNuR1M3bWowWTJkVlRGZVFOU1VPMkYxSnUzcUVOZ2RSSmt2UkdHNnV1ME1ya3h0MTZpTU41Y25VTmJlRnZvVjFBd25JOHREZVBQNEF1V0JSMk9mWWpNZUU4bHlGTjNEY2FaTFdEbktwUktqTzRUZzJKTG4rUEFUY1E5Qm5WQUJGYi9QbVVLY3QzdGRyb3BZOWh6djZ4M3o2bnNaWDdXeG1DN2RrOEhDd2tJb2pwQit0RGhsU1FlOWwyaENHaXBFbHhMeHhaV2hEOGJxaUR0MFgxN1FqVXF5cElzU3BYOGt4ZXBhRVltaXFzMTRBWTFDWjRaT1RkV2QxRG5YRzNuUjJxa3lVUlFtVUlwWmVIanNlbFlqZzNQUXM0R0F1T2s2YUdweUUvZE1ZQjZBaGlsVVNHM2d4d3lyUDB0NnppK0dWMWNyWlBoWEdiRWt4a3U5RzEybEFwT2hpRmVERmdBQmtFTEk4R0dNU3FRa3luaEJSUVVxR2xIOU9VeHlkZkV1b0FJVVZUdUFLcXlteUxmQmxuZG5scGJsUmRoMzd0ekZJekppcmt2NHlmU2xCaTFzdXFtNDNEYlhHM1RVU0czVnRrZWZIYjhuRmFnU01ZRGd0WkJUN3Fram95ckxzNS9TYXVmNmZob09XQmx0amJhd1hEdTdTeC9kaWJMS01oaVdYb1JOSGRqMDhxa0pPbFBwYTdrMUpMMSsrV3k0aDRlSGNFQXNYYnIwZ0srdkx5V0NDYTMvWUVsSFc2VUpiRWdyZjZWbENnb0xXMG82QjhZRHY0c1gvVmJZMkhCSW5UTWtLcDhJaWFURk1aT0RodzdkaCtUZmJCbDJRVlJrMUFncTJYZ1RwU1lGdFcyWHIxKy85aWQwc0Z4ZUJlYnc0TUdEQ1h5K2dJT2tnSWtGQlFVdFB5Uis2UGsrOXIzQzRFR0RoTzhOb2NSV1ZsWUxhcmp1VjQwSUppY2JHeHZDNXhtOEt1aHJ2a0UraVZldlh6dkRVdlo1ZWZsdDBBVFlIZnc2Z1hSMWRhOUlNcUFGaDRSWTV1YmtHa0Q0YTlMSHBGNXYzNzV0TW5EZ2dBcmZFM3lWUjQ4YWRRRzhSY1Q1OWNJeVBPamZaR0FtM3Q3ZS9vaWhqSWIxeWlDaFBOcmNwMDR6ZGZYeTNOdFVkT2tiMEhVanRKY0E0Y2pvbTVaV3BpdGlzWmc4MURmVm5iZHRLeGVwNzk5M1JaUGVMR3I1SjFHU1liUEx2bVo4MVVQdnBtamNyOTlwNndWVzFyVnBlOHFyUVZsWjVSdThKNUwwRnFJMjN3cm5xTVZSeVdXVG1wWWJmWGNRcXBGaHc0YVdNOXF5VW1YUlNTY2lJbUlnNVNVRGRPalE0Zk9MRnkrYVdSZDlCZnJoNjlmQmIrM3Q3ZCtDSHppazlieCsvUm9MYlRXK0Y3dWhHSk1DbjVjUnRhYXo0Y0I5MFU4ZDlrWnRqNXVwMzJIL3FHWnpGblJSMmIyNHQ5YkJhN0U1RTEra0ZmWDdWc2hUWjhzd2VIMjA1WVBIR0tqZVVtZFZ6S083L082WGs2Y2VmN2JFMU9YS0Y4WE1Mc1hzSjdieTJEUkF3eDVySkpKbE0yU1hMVnQyZ05vM05EU003dCsvdjNDOXR6Ly9IT0dBMEF0Ym5pT2ZDa0VCZUMyQ3pCa01CakRMRmtaR1B6SnQwY25kdytQWnlKRi85cWYySWR1UzQ4YU4vU1ZsOTRJQmpzUmJ3NzE3OWxSUVhZQkwyTml4WTh5aHM5ZUdVbE5TOU9GL1dIZ1l1NkpPKzlFUk56ZFhiWEhYV0ZyT0xVUHQ1d3ZCRGIvU3FhdXJ5ckJkdGVvN21weUl3WXVRSkkvdUhrZE1QRTJhZkxhM3Mrc3ZldTNpSlVzS3pjeE1QU1FoVG5UUGJWU1FDcDJRMUlJUEdUSWtzbGZQbm80bUppYitWNjljcnJLZVpLREtHQkRaVC92NEJDRW1TUVNHYUdscGxxcXJxLzlrNENQeklQenhLMjF5OUlnM1ROUzlxbE5XVlUxdEd2cFhKZU9GMVU3RUhTZXoxQkdUa2JLeWNnNjBHNVdGak94L0ZieEd3SGg4K2NxVjFZTUhEMkpSd1NVYTZob1ZjbEtRbVFEbFFDcUFDZXFmOCtjZDZXdjMxUVZCOEFpYUZCVFdyRjJiMGFkM253T1FRZTJYeG5GdDhndjhFcE5Ta0pPZDZKTncvZTZOVHlaR0E1dEdualRUbjl1eEdnbHMzdWZ3ZXkzd1R6NGFHcFBialZndUtCZjFMeFlETzJyV2VzR01Ea3JIc0VZa2ppeUwvZUhEaDdiWHJsMmI2T1RrNUlnUWxKZUxpNHREWTlRRlZtMjllKy9lbVoxdWJqb2JIRForaEpWVXE3b0dSS1dPQmgwenRMVzBzZEZqeGhTMmI5ZnUxZENoUTVaSzhwV3RxYW9oSmlabVd0T21UVCtzVzd1bU54MXBJOVJZQ0lNSWt0RU1HejQ4dDFNbkEvK3VYYnJzYjRqRkJnRVo3dHExK3dVc1Y5UzZ0VDRXRlBSVUZhSEgzSjhtTW5lUEYvYjJkc2JnMXp0dzBNQmNBd01ELzRYVzFuT3FlbWVFQmhlQXBERmg0c1FTSTBPajU0YUduYnlBMmRhMjNxQUREWDMzYnVIdVhSN3FraVlVSDU4emUzaDh2anlUd2FpejhDOHFXVTFCWVlGZXlxZFVZL1ErNXl3dDUxU3Btb0Q4SExBME96a3BzYWhvUk5EZFVnbU9Ycng0WVF6QUFGd0swVVJ2YUcxdC9kMXF2bFZmOUF3aFl5V1QrU1NRWUFIYnVORXhhdU5HQnlOSkJzTzB0TlJPZGRIZTlVR2dhbWh3eGt1Ujg4dHNOemZmeERXWVBBdWJiNkp6WWw1M2plUDlXaXErTEN3dXJXRFFpY3ptR1o5OGx6MzN5T3RNYXlKRVdGV09XSVc0dVk3Q2x3dXoya3p2cnNaKzhqczFhbDVPZGdzSVEwU01KcU14NndHVzRwcXN1QXN4N0ZwYVd1bEl0TXR0cURwQ1ZGeFdWbVozVTFOVEYwbmh2L1ZOb0ZQVTB0U0tobHkyNHM3RE1qNFpYelAwKy9mdjk3eXE3RngwcHU1LzdkcGloSWpPVjdWeXh2ODZRVDhNQ2dyeVFHZzBjOEVDcTlsVVNERzBVV2pvdTA1OFBrK3VhOWV1RVlCV3dTc2lLZW1qRHAzaDBnbjhmL1B6ODl2MDdkdkh1YktzZEw4N05TcmpKWFJvWDh2R3p2ZExPdjdsM2JkbXNCU1FmbHZseEs3YW5IQjVOck9vaENmZ2hHY1VkMGxJTDI2TEZYSXhUSW5NemNBVllKTjdhMTQ5TmxWdnZpeWY5KzEzYTlRbWloeE1TbEtTa3BSK1c4WUx4T2JJY2JZK1R0L3MrdlRMT2l5MXFId0pZVENhd1hwc3NQb3dpN1JKb0dPOVd5dUYyQTFvNmo1V1g4SHZkMjFVS2VPVmtwU2s5TnN6WG9xeXVReTlDMkhmeklMU2lnYkY1NWExemVjS2xCVVE4bTJqTEpQUVRadnpibHc3bFp2ZHRHV0NmdmRHbFRKZUtVbEpTdjhaeGl0S2NuS3lzcVdsWldYL3RVYVZNbDRwU1VsS1ZURmU1dTlhdWY4aTA1V1NsS1FrcGVvUVU5b0VVcEtTbEtRa1pieFNrcEtVcENSbHZGS1NrcFNrSkNVcDQ1V1NsS1FrSlNuamxaS1VwQ1FsS1ZXUC9rK0FBUURUYzVZYVNFYTBlZ0FBQUFCSlJVNUVya0pnZ2c9PS1NTnBCalkxL05JVlZZcWJ6d01qbnh1UEd6bkV6bjJwck9qSkQ3RUFER2ZFRGxrWElLdndCb0FjZ05waVBCaXhWZmV1eDBPbDlpdjR1RXpqM3NoWW1KcHlpMnk5clZDVCs3RUxiTFdQUnJWT01mZytyQndyRzU3NGhjTDczTWY5d3J0Mmh5L3N6Q3ZrUlRZUUQvMFYrTXR4WDNqSjF3MXh1cmx1bFk2eDdzYmM9';
            const options = {
                parentNodePC: '#login_keyboard', // PC端键盘弹出后对应的父元素节点 id
                isOpenKeyboardTitleMD: true, // 控制移动端键盘的标题栏是否显示
                opacityMD: '0', // 移动端遮罩层的透明度
                allowRealKeyboardInputPC: false, // PC端键盘允许通过物理键盘输入
                heightMD: document.body.clientHeight * 0.4,
                keyboardFontPC: '2em Verdana, Sans-Serif'
            };
            const keyboradRandom = {
                numberRandomMD: false // 数字键盘随机控制
            };
            const numberKeyboard = new this.KeyouCryptography.Keyboard(
                'commonStyle',
                6,
                false,
                keyboradRandom,
                license,
                options
            );
            // 绑定键盘
            numberKeyboard.bind('tradePin', true);
            // 键盘显示事件
            //   numberKeyboard.show();
            if (this.checkUserPopup1 === false) {
                numberKeyboard.hide();
            }
            numberKeyboard.onSure((event) => {
                const SM2pk = '127B605073FC29CFA45AF932A282ED19CF5556CC479C6E003AFED63112DC004AE466E2C32D57A202686420D09D129E5FB19D6BB0E33248D8442A4003C1DD38FF';
                if (event.length === 6) {
                    this.btnconfirm = false;
                    // 获取密码密文
                    const ciphertext = numberKeyboard.getCipherWithSM2(
                        SM2pk,
                        false
                    );
                    this.mima = String(ciphertext.ciphertext);
                    // 支付密码可用时的逻辑判断与接口请求
                    api.changeWithdrowApi
                        .submitWithdrow({
                            encPwd: this.mima,
                            mobileNo: store2.default.get('usrmob')
                        })
                        .then((data) => {
                            console.log(data);
                            if (data.code == '交易成功') {
                                this.$router.push({
                                    name: 'withdrawalTransition',
                                    query: {
                                        smsCode: this.formData.smsNo,
                                        smsJrn: this.smsJrn
                                    }
                                });
                            } else {
                                this.$toast.info(data.code);
                            }
                        })
                        .catch((err) => {
                            this.$toast.info(
                                err.msgInfo || '请稍后再试',
                                3000,
                                true
                            );
                        });
                } else {
                    this.btnconfirm = true;
                    Toast.info('请输入6位数字密码');
                }
            });
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
            this.bankCode = option.bankCode;
            this.isSelectorShow = false;
            this.bankIco = option.bankIco;
        },
        atmCheck(name, value) {
            if (value) {
                let newVal = '';
                const amtReg = /^([1-9][\d]{0,5}|0{0,1})(\.|\.\d{0,2})?$/;
                if (!amtReg.test(value)) {
                    if (Number(value) >= 1 && Number(value) < 10) {
                        // 第一位输0第二位输数字
                        this.$nextTick(() => {
                            newVal = value.substring(1, value.length);
                            if (this.balance > Number(newVal)) {
                                this.moneyValue = value.substring(
                                    1,
                                    value.length
                                );
                            } else {
                                this.moneyValue = '';
                                this.limitShow = true;
                            }
                        });
                    } else {
                        this.$nextTick(() => {
                            newVal = value.substring(0, value.length - 1);
                            if (Number(newVal) > this.balance) {
                                this.atmCheck(name, newVal);
                            } else {
                                this.moneyValue = value.substring(
                                    0,
                                    value.length - 1
                                );
                            }
                        });
                    }
                } else {
                    if (Number(value) > this.balance) {
                        this.$nextTick(() => {
                            // this.moneyValue = value.substring(0, value.length - 1);
                            newVal = value.substring(0, value.length - 1);
                            if (Number(newVal) > this.balance) {
                                this.atmCheck(name, newVal);
                            } else {
                                this.moneyValue = value.substring(
                                    0,
                                    value.length - 1
                                );
                                this.limitShow = true;
                            }
                        });
                    } else {
                        this.limitShow = false;
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
        confirmRecharge() {
            if (this.sfot === 1) {
                this.checkUserPopup = true;
                this.getMsm();
            } else if (this.sfot === 2) {
                this.getMsm2();
                this.checkUserPopup1 = true;
                this.getPassWord();
            } else {
                this.checkUserPopup = false;
                this.checkUserPopup1 = false;
            }
        },
        codeClick() {
            // this.timesContral();
            if (!this.timer) {
                this.attcode = true;
                this.timesContral();
                this.timer = setInterval(this.timesContral, 1000);
            }
        },
        confirmCodeClick() {
            this.getMsm();
        },
        cancleChange() {
            this.checkUserPopup = false;
            this.checkUserPopup1 = false;
        },
        submitData() {
            //   没有设置支付密码时的短信验证请求
            this.btnconfirm = true;
            api.changeWithdrowApi
                .submitWithdrow({
                    smsCode: this.formData.smsNo,
                    smsJrn: this.smsJrn
                })
                .then(() => {
                    // console.log('提交0', data);
                    // this.withdrowResult();
                    this.$router.push({
                        name: 'withdrawalTransition',
                        query: {
                            smsCode: this.formData.smsNo,
                            smsJrn: this.smsJrn
                        }
                    });
                })
                .catch((data) => {
                    this.$toast.info(data.msgInfo || '请稍后再试', 3000, true);
                });
        },
        timesContral() {
            if (this.sec > 0 && this.sec <= 61) {
                this.sec -= 1;
                if (this.sec !== 0) {
                    this.attcode = true;
                    this.smsText = `${this.sec} s`;
                } else {
                    clearInterval(this.timer);
                    this.attcode = false;
                    this.smsText = '获取验证码';
                    this.sec = 61;
                    this.timer = null;
                }
            }
        },
        withdrowResult() {
            api.changeWithdrowApi
                .submitWithdrowResult({
                    smsCode: this.formData.smsNo,
                    smsJrn: this.smsJrn
                })
                .then((data) => {
                    if (data.transStatus === '02') {
                        // 跳转失败页
                        if (this.timer) {
                            clearInterval(this.timer);
                        }
                        this.$router.push({
                            name: 'withdrawalFail',
                            query: {
                                resultMsg: data.resultMsg
                            }
                        });
                    } else if (data.transStatus === '03') {
                        // 跳转成功
                        if (this.timer) {
                            clearInterval(this.timer);
                        }
                        this.$router.push({
                            name: 'withdrawalSuccess',
                            query: {
                                amount: data.amount,
                                payBank: data.bankInfo,
                                orderId: data.orderNo,
                                isSucc: '01'
                            }
                        });
                    } else {
                        this.addNum += 1;
                        if (!this.timer) {
                            this.timer = setInterval(() => {
                                this.withdrowResult();
                            }, 5000);
                        } else {
                            if (this.addNum > 2) {
                                this.$router.push({
                                    name: 'withdrawalSuccess',
                                    query: {
                                        amount: data.amount,
                                        payBank: data.bankInfo,
                                        orderId: data.orderNo,
                                        isSucc: '00'
                                    }
                                });
                            }
                        }
                    }
                })
                .catch((data) => {
                    this.$toast.info(data.msgInfo || '请稍后再试', 3000, true);
                });
        }
    }
};
</script>
<style lang="less" scoped>
@import "../../common/commonStyle.css";

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
            font-size: 50px;
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
        .limits {
            margin-top: 20px;
            height: 37px;
            opacity: 1;
            font-size: 26px;
            font-weight: 400;
            text-align: left;
            color: #ff1414;
            line-height: 37px;
        }
        .transferBtn {
            margin-top: 91px;
        }
        .tips {
            width: 300px;
            height: 50px;
            opacity: 1;
            font-size: 36px;
            font-weight: 500;
            text-align: center;
            color: #d7d7d7;
            line-height: 50px;
            letter-spacing: -1px;
            margin: 497px auto 82px;
        }
    }
    .checkUserPopup {
        width: 640px;
        opacity: 1;
        background: #ffffff;
        border-radius: 8px;

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
        }
    }
    .popupTitle {
        height: 90px;
        font-size: 34px;
        font-weight: 500;
        text-align: center;
        color: #333333;
        line-height: 90px;
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
        padding-left: 30px;
        padding-right: 30px;
        img {
            width: 36px;
            height: 36px;
        }
        span {
            font-weight: 500;
            text-align: left;
            color: #333333;
            margin-left: 20px;
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
.smallTips {
    //   width: 408px;
    height: 42px;
    font-size: 30px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    margin: 20px auto;
    color: #666666;
    line-height: 42px;
}
.setUp {
    color: #238ff2;
}
#tradePin {
    display: block;
    width: 85%;
    height: 88px;
    font-size: 30px;
    margin: auto;
    padding-left: 20px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 40px;
    border: 1px solid #e5e5e5;
}
.passwordPopusMask {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);

    .passwordPopus {
        position: absolute;
        top: 250px;
        left: 30px;
        width: 640px;
        padding: 25px;
        border-radius: 8px;
        background-color: #ffffff;
    }
    .hr {
        width: 600px;
        height: 1px;
        margin-bottom: 50px;
        background: #e6e6e6;
    }
    .colse {
        position: absolute;
        top: 30px;
        right: 40px;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 40px;
        color: #999999;
    }
}
</style>
