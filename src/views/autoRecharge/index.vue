<template>
    <div class="contaion">
        <switchingUsers :isLoginOutPopupShow.sync='isLoginOutPopupShow' ></switchingUsers>
        <div class="top_banner">
            <div class="top_icon">
                <div class="icon_item"></div>
            </div>
        </div>
        <div class="body_contaion">
            <div class="body_item" style="margin-bottom: 0.2rem;">
              <div class="body_item_phone">
                    <p>开通手机号</p>
                    <p v-if="phone">
                        {{ phone.slice(0, 3) }} {{ phone.slice(3, 7) }}
                        {{ phone.slice(7, 11) }}
                         <span @click="isLoginOutPopupShow = true">
                          <img src="../../assets/images/autoRecharge/addressBook_icon.png" alt="">
                          切换用户
                        </span>
                    </p>

                    <div class="botom_border"></div>
                </div>
            </div>
            <div class="body_item" style="margin-bottom: 0.2rem;">
                <div class="body_item_autoRecharge">
                    <!-- <p>易充值话费规则</p> -->
                    <div class="autoRecharge_text" @click="isPickerShow0 = true" >
                        <span style="flex:1">话费余额低于</span>
                        <span style="padding-right:.1rem">{{fromData.limitamount / 100}}元</span>
                        <md-icon name="arrow-right" size="lg"></md-icon>
                    </div>
                    <div class="botom_border"></div>
                    <p style="margin-top: 0.2rem;">每次充值金额</p>
                    <div class="rechargeAmount">
                      <div class="rechargeAmount_item" @click="selectedAmount(item)" v-for="(item,index) in rechargeAmountList" :key="index" :class="{'checkRechargeAmount':item == fromData.fundamount}">
                        <span>¥</span>{{item/100}}
                      </div>
                    </div>
                </div>
            </div>
            <div class="body_item">
                <div class="body_item_bank">
                    <p>免密扣费方式</p>
                    <!-- 微信支付方式 -->
                    <template v-if="yczDisplayInfoList.WECHAT">
                      <div class="body_item_bank_top" >
                        <img src="../../assets/images/autoRecharge/wechart_icon.png" alt="" width="20" srcset=""/>
                        <div style="flex:1">微信支付</div>
                        <md-radio name="wechat" v-model="checkCardNo" size="lg" label="" />
                      </div>
                      <div class="botom_border"></div>
                    </template>
                    <!-- 移动钱包支付方式 -->
                    <template  v-if="yczDisplayInfoList.EACCOUNT">
                      <div class="body_item_bank_top">
                          <img src="../../assets/images/autoRecharge/blank_logo.png" alt="" width="20" srcset=""/>
                          <div>移动钱包</div>
                      </div>
                      <div class="botom_border"></div>
                      <!-- 零钱支付 -->
                      <div class="body_item_bank">
                          <!-- 和包易充值 -->
                          <!-- <div class="bank_box" style="border-bottom: 1px solid #d6d6d6;">
                            <div class="bank_title">零钱账户支付</div>
                              <md-radio
                                      name="hbCheck"
                                      v-model="checkCardNo"
                                      size="lg"
                                      label=""
                                  />
                          </div> -->

                          <div class="bank_box">
                              <div class="bank_title">电子账户支付</div>
                              <template v-if="walletAccount.length !== 0">
                                  <md-icon v-if="showArrowbankZeroFlag" @click="arrowClick('0')" name="arrow-right" size="lg"
                                  ></md-icon>
                                  <md-icon v-else @click="arrowClick('1')" name="arrow-down" size="lg"
                                  ></md-icon>
                              </template>
                              <template v-else>
                                  <md-radio name="openWalletAccount" v-model="checkCardNo" size="lg" label="" />
                              </template>
                          </div>
                          <div class="botom_border" v-if="walletAccount.length !== 0"></div>
                          <md-field title="" class="radio-field" v-if="showbankZeroFlag">
                              <md-radio-list v-model="checkCardNo" icon-position="right" :options="walletAccount" icon-size="lg" @change="banksChange" >
                                  <template slot-scope="{ option, index, selected }">
                                      <div style="display:flex;align-items: center;">
                                          <img :src=" require('@/assets/images/banks/bankimages/icon_' + option.accChannel + '.png') " alt="" />
                                          <div class="custom-brief textBank">
                                              {{ option.accChannel === "CMB" ? "招商银行" : "浦发银行"}}电子账户
                                              <span>({{option.cardno.slice(-4)}})</span>
                                          </div>
                                      </div>
                                  </template>
                              </md-radio-list>
                          </md-field>
                      </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="bottom_contaion">
            <template v-if="!fromData.cardno">
                <md-agree v-model="fromData.readingFlag" size="sm" @change="agreeChange(fromData.readingFlag)">
                    <span class="bottom_text">我已阅读并同意<span @click="slotDialog.open = true">《易充值服务协议》</span></span>
                </md-agree>
                <md-button v-if="fromData.readingFlag" type="primary" round @click="submit">确认</md-button>
                <md-button v-else style="background:#d0d0d0" round @click="noSubmit" >确认</md-button>
            </template>
            <template v-if="fromData.cardno">
                <div class="unbind_wrap">
                  <img src="@/assets/images/autoRecharge/open_autoRecharger.png" alt="">
                  <div class="unbind_text">
                    <p>
                      {{fromData.cardno.includes('WEC') ? '微信自动续费' : ' 电子账户自动续费'}}
                    </p>
                    <p>您已开通话费易充值业务</p>
                  </div>
                  <div class="unbind_btn" @click="goUnbind">
                    去解绑
                  </div>
                </div>
                <!-- <md-button v-if="fromData.readingFlag" type="primary" round @click="relieve">解除绑定</md-button>
                <md-button v-else style="background:#d0d0d0" round @click="noSubmit" >解除绑定</md-button> -->
            </template>
            <span v-if="!fromData.cardno">注：后付费用户，全额代付费用户无法办理话费易充值业务，具体以实际办理为准。</span>
        </div>
        <!-- 充值金额弹窗 -->
        <md-picker
            ref="picker"
            v-model="isPickerShow0"
            :data="pickerData0"
            large-radius
            is-cascade
            @confirm="onPickerConfirm"
            :default-index="pickerDefaultIndex"
            title="话费余额低于"
        ></md-picker>

        <!-- 更换扣费方式弹窗 -->
        <md-popup
          class="inner-popup"
          v-model="basicDialog.open"
          position="bottom"
        >
          <md-popup-title-bar
            large-radius
            title="温馨提示"
            title-align="center"
          ></md-popup-title-bar>
          <div class="popup_content">
            如您需要更换扣费方式，请先将现有的扣费方式解除绑定！
            <div class="btn_wrap">
              <div class="btn1" @click="goUnbind">去解绑</div>
              <div class="btn2" @click="basicDialog.open = false">我知道了</div>
            </div>
          </div>
        </md-popup>
        <!-- 验证码弹窗 -->
        <md-dialog
            title="请输入验证码"
            :closable="true"
            v-model="codeModelDialog.open"
            :btns="codeModelDialog.btns"
        >
            <div class="codeModelTop">我们已向{{ phone.slice(0, 3) }}****{{phone.slice(-4)}}发送验证码请查收并输入验证码
            </div>
            <md-codebox v-model="fromData.smsCode" :mask="false" :maxlength="4" system/>
            <button :disabled="attcode" class="errorTips" @click="getTimeOutShow">
                {{ errorTips }}
            </button>
            <div class="onMessage"> 收不到短信验证码？点击试试
              <span @click="voiceCodeClick" style="color:#007fff" v-if="!voiceCode" >语音验证码</span>
              <span v-else>语音验证码</span>
            </div>
            <!-- 该手机号码已绑定电子账户（0810） 作为扣费方式，请先解除绑定 -->
        </md-dialog>
        <md-dialog
            title="易充值服务协议"
            :closable="false"
            v-model="slotDialog.open"
            :btns="slotDialog.btns"
        >
            <div style="height: 6rem;overflow: scroll;text-align:left;line-height:1.5" v-html="agreementContent"></div>
        </md-dialog>
        <md-dialog
          title="温馨提示"
          :closable="false"
          v-model="allTooOftenDialog.open"
          :btns="allTooOftenDialog.btns"
        >
          操作过于频繁，请稍后重试
        </md-dialog>

    </div>
</template>
<script>
import {
    Picker,
    Field,
    RadioList,
    Icon,
    Agree,
    Button,
    Toast,
    Dialog,
    Captcha,
    Radio,
    InputItem,
    Landscape,
    Popup
} from 'mand-mobile';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import switchingUsers from '@/components/switchingUsers';
import { option } from './index';
import statePage from './components/statePage.vue';
import textHtml from './components/textHtml.vue';

export default {
    name: 'autoRecharge',
    components: {
        [Field.name]: Field,
        [RadioList.name]: RadioList,
        [Picker.name]: Picker,
        [Icon.name]: Icon,
        [Agree.name]: Agree,
        [Button.name]: Button,
        [Dialog.name]: Dialog,
        [Captcha.name]: Captcha,
        [Radio.name]: Radio,
        [InputItem.name]: InputItem,
        [Landscape.name]: Landscape,
        [Popup.name]: Popup,
        statePage,
        textHtml,
        switchingUsers
    },
    data() {
        return {
            statePageFlag: false,
            attcode: true, // 验证码状态
            voiceCode: true, // 语音验证码状态
            errorTips: '60S后可重新获取短信',
            sec: 61,
            // 协议
            slotDialog: {
                open: false,
                btns: [
                    {
                        text: '确认',
                        handler: this.onSlotConfirm
                    }
                ]
            },
            basicDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        handler: this.onBasicCancel
                    },
                    {
                        text: '确认操作',
                        handler: this.onBasicConfirm
                    }
                ]
            },
            codeModelDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        handler: this.onCodeModelCancel
                    },
                    {
                        text: '确定',
                        handler: this.onCodeModelConfirm
                    }
                ]
            },
            fromData: {
                readingFlag: false,
                fundamount: 5000, // 话费易充值值金额
                limitamount: 1000, // 话费低于金额
                cardno: null, // 绑定卡号
                bindingCard: '', // 绑定的卡号
                smsCode: '', // 验证码
                bnkcd: '01' // 办卡类型
            },
            checkCardNo: '', // 选中卡号
            showArrowbankZeroFlag: false, // 零钱图标不同展示
            showbankZeroFlag: true, // 零钱支付隐藏显示
            showArrowbankFlag: false, // 银行卡图标不同展示
            showbankFlag: true, // 银行卡支付隐藏显示
            isPickerShow0: false,
            phone: store2.default.get('usrmob'),
            // phone: '13812754052',
            pickerData0: option,
            pickerValue0: '',
            title: '话费低于10元，易充值值50元',
            walletAccount: [],
            banks: [],
            smsType: '0', // 验证码类型   0：短信   1：语音
            oprType: '0', // 操作类型    0：开通  1：退订
            smsJrn: '', // 短信流水
            successType: '', // 办理状态
            touchArr: [],
            timer: null,
            hbsignSts: '00', // 和包签约关系
            signJrnNo: '', // 和包易充值NO
            b2cStatus: '1', // 1.未注册 2.未授权 3.已授权且二次放号 4.未签约 5.已签约
            bindCard: [], // 和包绑卡列表
            rechargeAmountList: [5000, 10000, 20000, 30000, 50000],
            pickerDefaultIndex: [0],
            yczModelConfInfos: [], // 易充值模板，提交需要，提交模板id
            whetherToSignAContractOnWechat: false, // 微信是否调取签约接口
            agreementContent: '', // 协议内容
            yczDisplayInfoList: {
                EACCOUNT: '1002'
            },
            allTooOftenDialog: {
                open: false,
                btns: [
                    {
                        text: '返回首页',
                        handler: this.backHome
                    }
                ]
            },
            isLoginOutPopupShow: false
        };
    },

    watch: {
        // 与选择的银行卡相比较，展示不同的按钮
        checkCardNo: {
            handler(val) {
                if (val === 'wechat' && this.fromData.bindingCard.includes('WEC')) {

                } else if (val != this.fromData.bindingCard && this.fromData.bindingCard) {
                    this.basicDialog.open = true;
                }
            },
            deep: true
        }
    },
    computed: {
        payMethod() {
            if (this.$client.WEIXIN) {
                return 'WECHAT';
            }
            return '';
        }
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    mounted() {
        this.$store.commit('LOADING', true);
        this.easyPayDisplayQuery();
        this.query();
        this.queryEasyPayTempQuery();
        this.getAgreement();
        if (window.sessionStorage.getItem('whetherToSignAContractOnWechat') == 'true') {
            this.$router.push({
                name: 'autoRechargeWechatResult'
            });
        }
        // // 监听app切屏
        // window.addEventListener('visibilitychange', this.handleResize);
        // this.queryCmpayGetSignUrl();
        // 和包签约关系
        // this.cmpaySignStsQuery();
        // this.getInfoList();
        // if (this.$route.query.signJrnNo) {
        // this.hbqueryResult();
        // }
    },
    methods: {
        // 支付方式显示与隐藏
        easyPayDisplayQuery() {
            api.autoRecharge.easyPayDisplayQuery().then((res) => {
                res.yczDisplayInfoList.forEach((item) => {
                    this.yczDisplayInfoList[item.capCnl] = item.displayId;
                });
            });
        },
        // 获取协议
        getAgreement() {
            api.huataiAgreement({
                businessCode: 'HFYCZ'
            }).then((res) => {
                this.agreementContent = res.content.replaceAll(
                    'px',
                    ''
                );
            });
        },
        // 微信签约地址
        weChartCmpayGetSignUrl(data) {
            this.$store.commit('LOADING', true);
            const params = {
                smsJrn: data.smsJrn,
                smsCode: data.smsCode,
                cardno: data.checkCardNo,
                limitamount: data.limitamount,
                fundamount: data.fundamount,
                bnkcd: 'WECHAT',
                modelNo: data.modelNo,
                dealChn: this.$client.LEADEON ? 'leadeon' : this.$client.JSMCC ? 'jsmcc' : this.payMethod == 'WECHAT' ? 'WECHAT' : '',
                fxMobile: this.$route.query.fxmobile || this.$route.query.fxMobile,
                signEnv: this.payMethod
            };
            api.autoRecharge.wechatGetSignUrl(params).then((res) => {
                window.sessionStorage.setItem('whetherToSignAContractOnWechat', 'true');
                setTimeout(() => {
                    window.location.href = res.redirectUrl;
                }, 500);
            }).catch((err) => {
                this.$toast.info(err.msgInfo);
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        // 去解绑
        goUnbind() {
            this.$router.push({
                name: 'weChatTerminationOfContract',
                query: this.fromData
            });
        },
        // 查询模板
        queryEasyPayTempQuery() {
            api.autoRecharge.easyPayTempQuery().then((res) => {
                this.yczModelConfInfos = res.yczModelConfInfos;
            });
        },
        // 选中的充值金额
        selectedAmount(item) {
            this.fromData.fundamount = item;
        },
        // 和包签约结果查询
        hbqueryResult() {
            api.autoRecharge.usrSignStsQuery({ signJrnNo: this.$route.query.signJrnNo }).then((res) => {
                if (res.signSts === '01') {
                    this.$toast.info('签约成功,点击“确认“按钮，继续办理话费易充值业务.');
                } else {
                    this.$toast.info('签约失败');
                }
            });
        },
        // 和包签约/注册
        hbCheckStatus(type) {
            switch (type) {
                case '1':// 未注册
                    this.$router.push({ name: 'hbOpen', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}autoRecharge` } });
                    break;
                case '2':// 未授权
                    this.$router.push({ name: 'hbEmpower', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}autoRecharge` } });
                    break;
                case '3':// 已授权且二次放号
                    this.$router.push({ name: 'hbEmpower', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}autoRecharge` } });
                    break;
                case '4':// 未签约
                    this.$router.push({ path: '/B2CWallet/accountSigning', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}autoRecharge` } });
                    break;
                case '5':// 已授权
                    // 查询用户是否实名
                    this.$store.commit('LOADING', true);
                    api.B2CWallet.certificationInfo().then((res) => {
                        if (res.userType == 'P') {
                            if (this.bindCard.length === 0) {
                                this.$toast.info('您暂未绑定银行卡，正在跳转绑卡页面！');
                                setTimeout(() => {
                                    this.$router.push({ name: 'bindCard', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}autoRecharge` } });
                                }, 1500);
                            } else {
                                if (this.hbsignSts === '00') {
                                    // 获取签约地址
                                    this.queryCmpayGetSignUrl();
                                } else {
                                    this.codeModelDialog.open = true;
                                    this.voiceCode = true;
                                    this.timesContral();
                                }
                            }
                        } else {
                            this.$toast.info('您暂未实名，正在跳转实名页面！');
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'accountName',
                                    query: {
                                        backUrl: `https://fintech.12580life.com${process.env.BASE_URL}autoRecharge`
                                    }
                                });
                            }, 1500);
                        }
                    }).catch((err) => {
                    }).finally(() => {
                        this.$store.commit('LOADING', false);
                    });
                    break;
            }
        },

        // 获取和包信息
        getInfoList() {
            api.B2CWallet.infoList().then((res) => {
                this.b2cStatus = res.state;
                this.bindCard = res.bankCardList;
            }).catch((err) => {
                this.b2cStatus = err.state;
            });
        },
        // 和包签约状态查询
        cmpaySignStsQuery() {
            api.autoRecharge.cmpaySignStsQuery().then((res) => {
                // signSts 00 未签约  01 已签约
                this.hbsignSts = res.signSts;
                this.signJrnNo = res.signJrnNo;
            });
        },
        noSubmit() {
            this.$toast.info('请勾选并同意协议');
        },
        agreeChange(val) {
            if (val) {
                this.slotDialog.open = true;
            }
        },
        // 确定提交
        async submit() {
            if (!this.checkCardNo) {
                this.$toast.info('请选择扣费方式');
                return;
            }
            try {
                this.$store.commit('LOADING', true);
                const res = await api.autoRecharge.checkbusinessdeal();
                this.$store.commit('LOADING', false);
                if (res.msgCd === 'BUS00000') {
                    if (res.verifyflg !== '1') {
                        this.$toast.info('校验失败，该手机号无法办理话费易充值业务！');
                        return;
                    }
                } else {
                    this.$toast.info('校验失败，该手机号无法办理话费易充值业务！');
                    return;
                }
            } catch (e) {
                this.$store.commit('LOADING', false);
                this.$toast.info('校验失败，该手机号无法办理话费易充值业务！');
                return;
            }

            if (this.checkCardNo === 'openWalletAccount') {
                this.$toast.info(
                    '该手机号暂未开通移动钱包，即将跳转到钱包开通页面'
                );
                setTimeout(() => {
                    this.$router.push({
                        name: 'khEmpower',
                        query: {
                            orgCode: 'CMB',
                            typeId: 'hfzdc',
                            parchn: this.$route.query.parchn,
                            gytype: this.$route.query.gytype
                        }
                    });
                }, 1000);
                return;
            }
            if (this.checkCardNo === 'hbCheck' && this.hbsignSts !== '01') {
                this.hbCheckStatus(this.b2cStatus);
                return;
            }
            this.fromData.smsCode = '';
            this.smsType = '0';
            this.codeModelDialog.open = true;
            this.voiceCode = true;
            this.timesContral();
        },
        // 获取签约地址
        queryCmpayGetSignUrl() {
            api.autoRecharge.cmpayGetSignUrl().then((res) => {
                window.location.href = res.merchantSignUrl;
            });
        },
        // 解除绑定
        relieve() {
            this.fromData.smsCode = '';
            this.smsType = '0';
            this.oprType = '1';
            this.codeModelDialog.open = true;
            this.attcode = true;
            this.voiceCode = true;
            this.timesContral();
        },
        query() {
            const params = {
                mobileNo: this.phone
            };
            api.autoRecharge.queryAcc(params).then((res) => {
                this.walletAccount = [];
                this.banks = [];
                res.usrBnkInfos.forEach((item) => {
                    item.value = item.cardno;
                    if (item.accChannel !== 'BCOM') {
                        if (item.accTyp === '01') {
                            this.walletAccount.push(item);
                        } else {
                            this.banks.push(item);
                        }
                    }
                });
                this.getwalletEpayQuery();
            });
        },
        getwalletEpaySms() {
            const params = {
                userid: this.phone,
                smsType: this.smsType || '0',
                oprType: this.oprType || '0'
            };

            api.autoRecharge.walletEpaySms(params).then((res) => {
                this.smsJrn = res.smsJrn;
            });
        },
        // 易充值关系查询
        getwalletEpayQuery() {
            this.fromData.cardno = '';
            this.$store.commit('LOADING', true);
            api.autoRecharge.walletEpayQuery({ userid: this.phone })
                .then((res) => {
                    this.$store.commit('LOADING', false);
                    this.fromData.limitamount = res.limitamount || 1000;
                    this.fromData.fundamount = res.fundamount || 5000;
                    option[0].forEach((item, index) => {
                        if (item.value == this.fromData.limitamount) {
                            this.pickerDefaultIndex = [index];
                        }
                    });
                    this.fromData.cardno = res.cardno || '';
                    const arr = [...this.walletAccount, ...this.banks];
                    if (this.fromData.cardno) {
                        if (this.fromData.cardno.includes('WEC')) {
                            this.checkCardNo = 'wechat';
                            this.fromData.bindingCard = this.fromData.cardno;
                        } else if (this.fromData.cardno.length > 25) { // 大于25位则是和包易充值关系
                            this.checkCardNo = 'hbCheck';
                            this.fromData.bindingCard = this.fromData.cardno;
                        } else {
                            arr.forEach((item) => {
                                if (
                                    item.cardno.includes(
                                        this.fromData.cardno.slice(0, 4)
                                    )
                                && item.cardno.includes(
                                    this.fromData.cardno.slice(-4)
                                )
                                ) {
                                    this.fromData.bindingCard = item.cardno;
                                    this.checkCardNo = item.cardno;
                                    if (item.accTyp === '01') {
                                        if (item.bnkcd === 'SPDB') {
                                            this.fromData.bnkcd = 'SPDBWALLET';
                                        } else {
                                            this.fromData.bnkcd = 'CMBWALLET';
                                        }
                                    } else {
                                        this.fromData.bnkcd = 'NEWCUP';
                                    }
                                }
                            });
                        }
                        if(!this.fromData.bindingCard){
                            Dialog.alert({
                                title: '温馨提示',
                                content:'您在其它渠道已开通自动充业务，若需解约可联系10086~',
                                confirmText: '确定',
                                onConfirm: () =>  window.history.go(-1)
                            });
                           return
                        }
                    } else {
                        // 未绑定
                        this.fromData.bindingCard = '';
                        this.checkCardNo = '';
                    }
                })
                .catch((err) => {
                    this.allTooOftenDialog.open = true;
                    this.$store.commit('LOADING', false);
                });
        },
        // 语音验证码
        voiceCodeClick() {
            if (this.fromData.cardno) {
                this.smsType = '1';
                this.oprType = '1';
            } else {
                this.smsType = '1';
                this.oprType = '0';
            }
            this.attcode = true;
            this.voiceCode = true;
            this.timesContral();
            this.$toast.info('我们将以电话方式告知您的验证码，请注意接听～');
        },

        // 更换扣费方式弹窗确定
        onBasicConfirm() {
            this.smsType = '0';
            this.oprType = '0';
            this.basicDialog.open = false;
            this.codeModelDialog.open = true;
            this.getTimeOutShow();
        },
        onSlotConfirm() {
            this.fromData.readingFlag = true;
            this.slotDialog.open = false;
        },
        // 重新获取验证码
        getTimeOutShow() {
            this.attcode = true;
            this.voiceCode = true;
            this.timesContral();
        },
        timesContral() {
            if (this.sec === 61) {
                if (this.voiceCode) {
                    this.voiceCode = true;
                    this.getwalletEpaySms();
                }
                this.attcode = true;
                this.timer = setInterval(() => {
                    this.sec = this.sec - 1;
                    this.errorTips = `${this.sec}S后可重新获取短信`;
                    if (this.sec === 0) {
                        clearInterval(this.timer);
                        this.errorTips = '重新获取';
                        this.attcode = false;
                        this.voiceCode = false;
                        this.sec = 61;
                    }
                }, 1000);
            }
        },
        // 重新倒计时
        againTimer() {
            this.sec = 61;
            clearInterval(this.timer);
            this.timesContral();
        },
        arrowClick(type) {
            if (type === '0') {
                this.showbankZeroFlag = true;
                this.showArrowbankZeroFlag = false;
            } else {
                this.showbankZeroFlag = false;
                this.showArrowbankZeroFlag = true;
            }
        },
        arrowbankClick(type) {
            if (type === '0') {
                this.showbankFlag = true;
                this.showArrowbankFlag = false;
            } else {
                this.showbankFlag = false;
                this.showArrowbankFlag = true;
            }
        },
        banksChange(option) {
            console.log(option);
            if (option.accTyp === '01') {
                if (option.bnkcd === 'SPDB') {
                    this.fromData.bnkcd = 'SPDBWALLET';
                } else {
                    this.fromData.bnkcd = 'CMBWALLET';
                }
            } else {
                this.fromData.bnkcd = 'NEWCUP';
            }
        },
        // 验证码确定
        onCodeModelConfirm() {
            if (!this.fromData.smsCode) {
                this.$toast.info('请输入验证码！');
                return;
            }
            this.setWalletEpayDeal();
        },
        // 签约或解约
        setWalletEpayDeal() {
            const { modelNo = '' } = this.yczModelConfInfos.filter(item => item.limitAmount == this.fromData.limitamount && item.fundAmount == this.fromData.fundamount)[0];
            const params = {
                smsJrn: this.smsJrn,
                smsCode: this.fromData.smsCode,
                cardno: this.checkCardNo,
                limitamount: this.fromData.limitamount,
                fundamount: this.fromData.fundamount,
                opertype: this.oprType === '1' ? '2' : '1',
                // bnkcd: 'CMBWALLET'
                bnkcd: this.checkCardNo === 'hbCheck' ? 'CMPACC' : this.fromData.bnkcd,
                modelNo,
                dealChn: this.$client.LEADEON ? 'leadeon' : this.$client.JSMCC ? 'jsmcc' : ''
            };
            // 微信签约
            if (this.checkCardNo === 'wechat') {
                this.weChartCmpayGetSignUrl(params);
                return;
            }
            const arr = [...this.walletAccount, ...this.banks];
            if (this.fromData.cardno) {
                arr.forEach((item) => {
                    if (
                        item.cardno.includes(
                            this.fromData.cardno.slice(0, 4)
                        )
                        && item.cardno.includes(this.fromData.cardno.slice(-4))
                    ) {
                        params.cardno = item.cardno;
                    }
                });
            } else {
                params.cardno = this.checkCardNo;
            }
            params.cardno = this.checkCardNo === 'hbCheck' ? this.signJrnNo : params.cardno;
            this.$store.commit('LOADING', true);
            api.autoRecharge
                .walletEpayDeal(params)
                .then((res) => {
                    this.$store.commit('LOADING', false);
                    if (this.oprType === '1') {
                        this.successType = '1';
                    } else {
                        this.successType = '2';
                    }
                    this.codeModelDialog.open = false;
                    this.$router.push({
                        name: 'autoRechargeResult',
                        query: {
                            successType: this.successType
                        }
                    });
                    this.sec = 61;
                    this.query();
                })
                .catch((err) => {
                    this.$store.commit('LOADING', false);
                    this.$toast.info(err.msgInfo);
                    this.codeModelDialog.open = false;
                });
        },
        onPickerConfirm(value) {
            this.fromData.limitamount = value[0].value;
        },
        closeStatePage() {
            this.sec = 61;
            clearInterval(this.timer);
            this.statePageFlag = false;
        },
        addNewbank() {
            window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/newBanks/addNewBanks?dealChn=hfzdc&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
        },
        backHome() {
            window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/newFortune';
        }
    }
};
</script>
<style lang="less" scoped>
.contaion {
    width: 100%;
    height: 100vh;
    background: #F7F7F7;
    font-size: 30px;
    overflow-y: auto;
    position: relative;
    padding-bottom: 30px;
    .top_banner {
        height: 450px;
        background-image: url("../../assets/images/autoRecharge/top_image.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        // background: blue;
        display: flex;
        align-items: flex-end;
        padding: 0 30px;
        .top_icon {
            display: flex;
            justify-content: space-between;
            // padding: 15px;
            width: 100%;
            height: 200px;
            margin-bottom: -30px;
            border-radius: 20px;
            background-image: url("../../assets/images/autoRecharge/banner_image.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            // .icon_item {
            //     width: 32%;
            //     background: #f1f1f1;
            //     border-radius: 20px;
            // }
        }
    }
    .body_contaion {
        margin-top: 50px;
        padding: 0 30px;
        .body_item {
            background: #fff;
            padding: 10px 20px 30px;
            border-radius: 20px;
            .body_item_phone {
                p:nth-child(1) {
                    width: 100%;
                    margin-top: 20px;
                    font-size: 25px;
                    color: #aaa;
                }
                p:nth-child(2) {
                    font-size: 45px;
                    font-weight: bold;
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                      font-weight: 400;
                      font-size: 26px;
                      color: #999999;
                      line-height: 45px;
                      display: flex;
                      align-items: center;
                      img{
                        width: 35px;
                        height: 40px;
                        margin-right: 12px;
                      }
                    }
                }
            }
            .body_item_autoRecharge {
                .autoRecharge_text {
                    margin-top: 20px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    // font-weight: 500;
                    .md-icon.icon-font {
                        // padding-right: 30px;
                    }
                }
                p:nth-child(1) {
                    width: 100%;
                    margin-top: 20px;
                    font-size: 25px;
                    color: #aaa;
                }
                .rechargeAmount{
                  display: flex;
                  // justify-content: space-between;
                  flex-wrap: wrap;
                  .rechargeAmount_item + .rechargeAmount_item{
                    margin-left: 20px;
                  }
                  .rechargeAmount_item{
                    width: 31%;
                    background: #F6F8FB;
                    border-radius: 6px;
                    padding: 20px 0;
                    text-align: center;
                    margin-top: 20px;
                    font-size: 38px;
                    span{
                      font-size: 24px;
                      margin-right: 5px;
                    }
                    &:nth-child(4){
                      margin-left: 0;
                    }
                  }
                  .checkRechargeAmount{
                    color: #007fff;
                    background: url('../../assets/images/autoRecharge/checkRechargeAmount_bg.png') no-repeat;
                    background-size: 100% 100%;
                  }
                }
            }
            .body_item_bank {
                img {
                    width: 45px;
                    height: 45px;
                }
                p:nth-child(1) {
                    margin-top: 20px;
                    margin-bottom: 15px;
                    font-size: 25px;
                    color: #aaa;
                }
                .body_item_bank_top {
                    display: flex;
                    align-items: center;
                    margin-top: 30px;
                    padding-bottom: 10px;
                    font-weight: 500;
                    div {
                        margin-left: 20px;
                    }
                    .md-radio{
                      margin-top: 0;
                      margin-bottom: 0;
                    }
                }
                .body_item_bank {
                    .bank_box {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 30px 0px 10px 30px;
                        font-weight: 500;
                        .bank_title {
                        }
                    }
                }
                .textBank {
                    font-size: 30px;
                    margin-left: 10px;
                }
                /deep/.md-cell-item {
                    font-size: 10px;
                    border-bottom: 1px solid rgb(214, 214, 214);
                }
            }
            .addBank {
                padding: 30px 30px 0 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 30px;
                .tip_bank {
                    display: flex;
                    align-items: center;
                    img {
                        width: 37px;
                        height: 100%;
                        padding: 3px;
                    }
                    span {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
    .bottom_contaion {
        padding: 20px 30px 40px 30px;
        .bottom_text {
            font-size: 22px;
            color: #aaa;
            span {
                color: #007fff;
            }
        }
        .md-button {
            margin: 20px 0;
        }
        span {
            font-size: 22px;
            color: #aaa;
        }
        .md-agree {
            font-size: 20px;
        }
        /deep/.md-agree-content {
            margin-left: -0.15rem;
        }
        .unbind_wrap{
          background: #FFFFFF;
          border-radius: 24px;
          // margin-bottom: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 38px 19px 32px 46px;
          img{
            width: 84px;
            height: 99px;
            // margin-top:10px
          }
          .unbind_text{
            line-height: 1.5;
            margin-top: -10px;
            p:nth-of-type(1){
              font-weight: 500;
              font-size: 30px;
              color: #333333;
            }
             p:nth-of-type(2){
              font-weight: 400;
              font-size: 26px;
              color: #979899;
            }
          }
          .unbind_btn{
            width: 138px;
            background: #5b8dff;
            color: #fff;
            height: 58px;
            border-radius: 29px;
            font-size: 28px;
            font-weight: 500;
            line-height: 58px;
            text-align: center;
          }
        }
    }
    .botom_border {
        width: 100%;
        margin: 20px 0 0 0;
        border-bottom: 1px solid rgb(214, 214, 214);
    }
    .md-field {
        padding: 0px;
        padding-left: 30px;
    }
}
.codeModelTop {
    margin-bottom: 20px;
}
.errorTips {
    background: #fff;
    color: #007fff;
    margin: 30px 0 30px 0;
}
.onMessage {
    font-size: 24px;
}
/deep/.md-dialog-body {
    text-align: center;
}
/deep/.md-codebox-box {
    border: 0.5px solid #c4c4c4;
    border-radius: 5px;
}
/deep/.md-codebox {
    justify-content: space-around;
    .is-active {
        border: 1px solid #65baff;
    }
}
/deep/.md-captcha-footer {
    justify-content: center;
    .md-captcha-brief {
        display: none;
    }
}
.popup_content{
    padding: 60px 70px;
    border-top: 1px solid #E5E5E5;
    font-size: 32px;
    color: #848587;
    line-height: 1.5;
    .btn_wrap{
      margin: 100px auto;
      display: flex;
      justify-content: space-around;
      .btn1{
        width: 220px;
        height: 70px;
        border-radius: 40px;
        border:1px solid #007fff;
        color: #007fff;
        line-height: 70px;
        text-align: center;
      }
      .btn2{
        width: 220px;
        height: 70px;
        border-radius: 40px;
        background: #007fff;
        color: #fff;
        line-height: 70px;
        text-align: center;
      }
    }
}

</style>
