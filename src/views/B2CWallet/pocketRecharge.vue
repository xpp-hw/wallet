<template>
  <div class="pocketRecharge_container">
    <div class="pocketRecharge_wrap">
      <p>金额</p>
      <div class="pocketRecharge_input">
        <p>¥</p>
        <md-input-item
          v-model="payAmount"
          ref="input0"
          placeholder="请输入充值金额（元）"
          is-amount
          :maxlength="11"
          size="normal"
          type="money"
          @input='OnInput($event)'
        ></md-input-item>
      </div>
    </div>
    <div class="pocketRecharge_changePay">
      <p>付款方式</p>
      <div class="pay_bank" @click="showSelector">
        <div class="pay_bank_item">
          <template v-if="banksList.length == 0">
            <div class="pay_bank_item_icon" >
              <img
                src="../../assets/images/B2Cwallet/add_bank_icon.png"
                alt=""
              />
            </div>
            <div class="pay_bank_item_text">添加新卡支付<span style="color:#757575;font-size: 0.24rem;">（仅支持借记卡）</span></div>
          </template>
          <template v-else>
             <div class="pay_bank_item_icon">
              <img
                v-if="banksList.length > 0"
                :src="defaultBankData.iconPath"
                alt=""
              />
              </div>
              <div class="pay_bank_item_text" v-if="banksList.length > 0">{{defaultBankData.bankName}}{{defaultBankData.bankCardType}} ({{defaultBankData.bankCardNo.slice(-4)}})</div>
          </template>
        </div>
      </div>
    </div>
    <div class="pocketRecharge_btn">
      <!-- 充值按钮 -->
      <md-button class="md-raised md-danger" @click="recharge" :inactive='!payAmount || !defaultBankData.agreementNo || payAmount <= 0' >下一步</md-button>
      <p class="rules">
        根据银行规则、支付业务场景、交易风险等级会有限额限制，具体以交易结果为准哦～
      </p>
    </div>
    <!-- 银行卡选择器 -->
    <bankChange v-if="isSelectorShow" :banksList='banksList' :defaultBankData='defaultBankData' @banksClose='banksClose' @onSelectorChoose='onSelectorChoose'></bankChange>
  </div>
</template>

<script>
import {
    InputItem, Field, Icon, Toast, Selector, FieldItem
} from 'mand-mobile';
import api from '@/common/apiUrls';
import bankChange from './compoments/bankChange.vue';

export default {
    name: 'pocketRecharge',
    components: {
        [InputItem.name]: InputItem,
        [Icon.name]: Icon,
        [Selector.name]: Selector,
        [Field.name]: Field,
        [FieldItem.name]: FieldItem,
        bankChange
    },
    data() {
        return {
            value: '',
            isSelectorShow: false,
            banksList: [],
            selectorValue: '',
            defaultBankData: {},
            userType: '', // P等于已实名
            payAmount: null, // 充值金额
            foreignToken: ''
        };
    },
    mounted() {
        // this.getInfoList();
        this.getSSOToken();
    },
    methods: {
        OnInput(e) {
            if (e > 99999999) {
                this.payAmount = 99999999;
            } else if (e.indexOf('.') < 0 && e < 99999999) {
                this.payAmount = parseFloat(e);
            } else {
                if (/^\d+\.\d{3}$/.test(e)) {
                    this.payAmount = Number(Number(e).toFixed(2));
                }
            }
        },
        // 获取充值tolen
        getSSOToken(item) {
            this.$store.commit('LOADING', true);
            api.B2CWallet.tokenApply({ tokenType: '04' }).then((res) => {
                this.$store.commit('LOADING', false);
                this.foreignToken = res.foreignToken;
                // const tourl = `${item.url}?ssoToken=${this.b2cData.foreignToken}&navShow=N`;
                // window.location.href = tourl;
            }).catch((err) => {

            }).finally(() => {
                this.getInfoList();
            });
        },

        // 银行卡点击选择
        onSelectorChoose(item) {
            this.defaultBankData = item;
        },
        // 获取和包信息
        getInfoList() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.infoList().then((res) => {
                this.$store.commit('LOADING', false);
                res.bankCardList = res.bankCardList.filter(item => item.bankCardType === '借记卡');
                this.defaultBankData = res.bankCardList ? res.bankCardList[0] : {};
                this.banksList = res.bankCardList || [];
            }).catch((err) => {
                this.$store.commit('LOADING', false);
                this.b2cStatus = err.state;
            });
            // 查询用户是否实名
            api.B2CWallet.certificationInfo().then((res) => {
                this.userType = res.userType;
            });
        },
        // 充值按钮
        recharge() {
            this.$store.commit('LOADING', true);
            const params = {
                agreementNo: this.defaultBankData.agreementNo,
                bankCardCode: this.defaultBankData.cardBankCode,
                payAmount: this.payAmount,
                bankCardNo: this.defaultBankData.bankCardNo,
                successPageUrl: `https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/pocketResult?statusType=04`
            };
            api.B2CWallet.recharge(params).then((res) => {
                const { payUrl } = res;
                window.location.href = `${payUrl}&ssoToken=${this.foreignToken}&navShow=N`;
            }).catch((err) => {
                this.$toast.info(err.resMsg);
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        // 显示支付方式弹窗
        showSelector() {
            // 去绑卡
            if (this.banksList.length === 0) {
                this.$store.commit('LOADING', true);
                const RETURN_URL = window.location.href;
                if (this.userType == 'P') {
                    api.B2CWallet.tokenApply({ tokenType: '01' }).then((res) => {
                        this.$store.commit('LOADING', false);
                        const url = `https://www.cmpay.com/front-msa/bind-bank-card/quickBind?RETURN_FLG=5&RETURN_URL=${RETURN_URL}&typeId=10010&ssoToken=${res.foreignToken}&SUBMIT_TYPE=ajax&HEADER_FLG=1`;
                        window.location.href = url;
                    }).catch((err) => {
                        this.$store.commit('LOADING', false);
                    });
                } else {
                    this.$store.commit('LOADING', false);
                    this.$router.push({
                        name: 'accountName'
                    });
                }
            } else {
                this.isSelectorShow = true;
            }
        },
        banksClose() {
            this.isSelectorShow = false;
        }

    }
};

</script>

<style lang="less" scoped>
.one {
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0);
  width: 100%;
  height: 100vh;
  .two {
    width: 100%;
    height: 400px;
    position: absolute;
    bottom: 0;
    .three {
      width: 100%;
      height: 100%;
      background: rgb(252, 252, 252);
      opacity: 1;
      .four {
        max-height: 200px;
        width: 100%;
        overflow-y: auto;
        background: #fff;
        padding: 0 20px;
        // border-radius: 16px 16px 0 0;
        margin-top: 36px;
      }
    }
  }
}
.pocketRecharge_container {
  background: #f7f7f7;
  height: 100vh;
  padding: 30px 24px;
  box-sizing: border-box;
  .pocketRecharge_wrap {
    background: #fff;
    padding: 25px;
    border-radius: 20px;
    font-size: 30px;
    .pocketRecharge_input {
      display: flex;
      align-items: center;
      margin-top: 30px;
      p {
        font-weight: 500;
        font-size: 50px;
        margin-right: 30px;
        margin-left: 10px;
      }
      /deep/.md-input-item-input {
        font-size: 50px;
        width: 560px;
      }
    }
  }
  .pocketRecharge_changePay {
    display: flex;
    justify-content: space-between;
    padding: 47px 20px;
    font-size: 30px;
    align-items: center;
    .pay_bank {
      .pay_bank_item {
        display: flex;
        align-items: center;
      }
      .pay_bank_item_icon {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .pay_bank_item_text {
        &::after {
          display: inline-block;
          content: "";
          width: 18px;
          height: 18px;
          border-left: 5px solid #939393;
          border-bottom: 5px solid #939393;
          transform: rotate(-135deg);
          border-radius: 2px;
          margin-left: 10px;
        }
      }
    }
  }
  .pocketRecharge_btn {
    line-height: 1.5;
    margin-top: 300px;
    p {
      margin-top: 25px;
      font-size: 22px;
      color: #acacac;
    }
  }
  .selector-item-body {
    display: flex;
    align-items: center;
    font-size: 30px;
    .selector_item_text {
      flex: 1;
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .check {
      width: 30px;
      height: 20px;
      background: url("../../assets/images/B2Cwallet/check_icon.png") no-repeat;
      background-size: 100%;
    }
  }
}

</style>
