<template>
  <div class="weChartTerminationOfContract_container">
    <div class="top_banner">
      <div class="top_icon">
        <div class="icon_item"></div>
      </div>
    </div>
    <div class="content">
      <div class="content_item">
        <span>充值方式</span> <span>低额充值</span>
      </div>
      <div class="content_item">
        <span>开通手机号</span> <span>{{mobile}}</span>
      </div>
      <div class="content_item">
        <span>话费余额低于</span> <span>{{fromData.limitamount/100}}元</span>
      </div>
      <div class="content_item">
        <span>每次充值金额</span> <span>{{fromData.fundamount/100}}元</span>
      </div>
      <div class="content_item">
        <span>自动扣费方式</span> <span v-if="fromData.cardno"> {{fromData.cardno.includes('WEC') ? '微信支付' : ' 电子账户支付'}}</span>
      </div>
      <!-- <div class="content_item">
        <span>办理时间</span> <span>低额充值</span>
      </div> -->
      <div class="content_item">
        <span>办理状态</span> <span>已开通</span>
      </div>
    </div>
    <div class="footer">
      <md-agree v-model="readingFlag" size="sm" @change="agreeChange(readingFlag)">
        <span class="bottom_text">我已阅读并同意<span @click="slotDialog.open = true">《易充值服务协议》</span></span>
      </md-agree>
      <md-button type="primary" round @click="relieve">解除绑定</md-button>
      <div style="padding:0 0.2rem">
        <span>注：后付费用户，全额代付费用户无法办理话费易充值业务，具体以实际办理为准。</span>
      </div>
    </div>
    <!-- 易充值用户协议弹窗 -->
    <md-dialog title="易充值服务协议" :closable="false" v-model="slotDialog.open" :btns="slotDialog.btns">
      <div style="height: 6rem;overflow: scroll;text-align:left;line-height:1.5" v-html="agreementContent"></div>
    </md-dialog>
    <!-- 验证码弹窗 -->
    <md-dialog
        title="请输入验证码"
        :closable="true"
        v-model="codeModelDialog.open"
        :btns="codeModelDialog.btns"
    >
        <div class="codeModelTop">我们已向{{ mobile.slice(0, 3) }}****{{mobile.slice(-4)}}发送验证码请查收并输入验证码
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
  </div>
</template>

<script>
import {
    Agree,
    Button
} from 'mand-mobile';
import * as store2 from '@/common/localstore';
import api from '@/common/apiUrls';
import textHtml from './components/textHtml.vue';

export default {
    components: {
        [Agree.name]: Agree,
        [Button.name]: Button,
        textHtml
    },
    data() {
        return {
            attcode: true, // 验证码状态
            voiceCode: true, // 语音验证码状态
            errorTips: '60S后可重新获取短信',
            sec: 61,
            readingFlag: false,
            fromData: {},
            slotDialog: {
                open: false,
                btns: [
                    {
                        text: '确认',
                        handler: this.onSlotConfirm
                    }
                ]
            },
            mobile: store2.default.get('usrmob'),
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
            smsType: '0', // 验证码类型   0：短信   1：语音
            oprType: '0', // 操作类型    0：开通  1：退订
            smsJrn: '', // 短信流水
            cmpaySignJrnNo: '', // 和包签约流水号
            weChatSignJrnNo: '', // 微信签约流水号
            agreementContent: ''// 协议内容
        };
    },
    mounted() {
        this.fromData = this.$route.query;
        this.fromData.smsCode = '';
        this.getAgreement();
        if (this.fromData.bindingCard.includes('WEC')) {
            this.wechatSignUserQuery(); // 微信
        } else if (this.fromData.bindingCard.length > 25) {
            this.cmpaySignStsQuery(); // 和包
        }
    },
    computed: {
        payType() {
            if (this.fromData.bindingCard.includes('WEC')) {
                return 'WECHAT'; // 微信
            } if (this.fromData.bindingCard.length > 25) {
                return 'CMPACC'; // 和包
            }
            return 'DZZH'; // 电子账户
        }
    },
    methods: {
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
        // 微信签约signJrnNo
        wechatSignUserQuery() {
            api.autoRecharge.wechatSignUserQuery().then((res) => {
                this.weChatSignJrnNo = res.signJrnNo; // 解约需要的流水号
            });
        },
        // 和包签约状态查询
        cmpaySignStsQuery() {
            api.autoRecharge.cmpaySignStsQuery().then((res) => {
                this.cmpaySignJrnNo = res.signJrnNo; // 解约需要的流水号
            });
        },
        // 解约
        setWalletEpayDeal() {
            const params = {
                smsJrn: this.smsJrn,
                smsCode: this.fromData.smsCode,
                cardno: this.payType === 'WECHAT' ? this.weChatSignJrnNo : this.payType === 'CMPACC' ? this.cmpaySignJrnNo : this.fromData.bindingCard,
                limitamount: this.fromData.limitamount,
                fundamount: this.fromData.fundamount,
                opertype: '2',
                bnkcd: this.payType === 'WECHAT' ? 'WECHAT' : this.payType === 'CMPACC' ? 'CMPACC' : this.fromData.bnkcd,
                dealChn: this.$client.LEADEON ? 'leadeon' : this.$client.JSMCC ? 'jsmcc' : ''
            };
            // params.cardno = params.bnkcd === 'CMPACC' ? this.signJrnNo : params.cardno;
            this.$store.commit('LOADING', true);
            api.autoRecharge
                .walletEpayDeal(params)
                .then((res) => {
                    this.codeModelDialog.open = false;
                    if (this.fromData.bindingCard.includes('WEC')) {
                        this.$router.push({
                            name: 'autoRechargeWechatResult',
                            query: {
                                type: 'terminationOfContract' // 解约
                            }
                        });
                    } else {
                        this.$router.push({
                            name: 'autoRechargeResult',
                            query: {
                                successType: '1'
                            }
                        });
                    }
                    this.sec = 61;
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                    this.codeModelDialog.open = false;
                }).finally(() => {
                    this.$store.commit('LOADING', false);
                });
        },
        // 验证码确定
        onCodeModelConfirm() {
            if (!this.fromData.smsCode) {
                this.$toast.info('请输入验证码！');
                return;
            }
            this.setWalletEpayDeal();
        },
        // 重新获取验证码
        getTimeOutShow() {
            this.attcode = true;
            this.voiceCode = true;
            this.timesContral();
        },
        // 语音验证码
        voiceCodeClick() {
            this.smsType = '1';
            this.oprType = '1';
            this.attcode = true;
            this.voiceCode = true;
            this.timesContral();
            this.$toast.info('我们将以电话方式告知您的验证码，请注意接听～');
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
        // 获取验证码
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
        agreeChange(val) {
            if (val) {
                this.slotDialog.open = true;
            }
        },
        relieve() {
            if (this.readingFlag) {
                this.fromData.smsCode = '';
                this.smsType = '0';
                this.oprType = '1';
                this.codeModelDialog.open = true;
                this.attcode = true;
                this.voiceCode = true;
                this.timesContral();
            } else {
                this.slotDialog.open = true;
            }
        },
        onSlotConfirm() {
            this.readingFlag = true;
            this.slotDialog.open = false;
        }
    }
};
</script>

<style lang="less" scoped>
.weChartTerminationOfContract_container {
  width: 100%;
  height: 100vh;
  background: #f7f7f7;
  .top_banner {
    height: 400px;
    background-image: url("../../assets/images/autoRecharge/top_image.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // background: blue;
    display: flex;
    align-items: flex-end;
    padding: 0 30px;
    .top_icon {
      width: 100%;
      height: 200px;
      margin-bottom: -50px;
      border-radius: 20px;
      background-image: url("../../assets/images/autoRecharge/banner_image.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .content {
    padding: 0 22px;
    margin: 80px 30px 38px 30px;
    background: #fff;
    border-radius: 24px;
    font-size: 26px;
    color: #9b9b9b;
    .content_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 27px 0 30px;
      span:nth-of-type(2) {
        font-size: 28px;
        color: #333333;
        font-weight: 500;
      }
    }
    .content_item + .content_item {
      border-top: 1px solid #eeeeee;
    }
  }
  .footer{
    padding: 0 22px;
    .bottom_text {
      font-size: 22px;
      color: #aaa;
      span {
          color: #007fff;
      }
    }
    .md-button {
      margin: 20px auto;
      width: 670px;
    }
    span {
      font-size: 22px;
      color: #aaa;
    }
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
</style>
