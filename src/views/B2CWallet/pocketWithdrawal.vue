<template>
  <div class="pocketWithdrawal_container">
     <div class="pocketWithdrawal_changePay">
      <p>到账银行卡</p>
      <div class="pay_bank" @click="showSelector">
        <div class="pay_bank_item"  v-if="banksList.length > 0">
          <div class="pay_bank_item_icon">
            <img
                :src="defaultBankData.iconPath"
                alt=""
              />
          </div>
          <div class="pay_bank_item_text">{{defaultBankData.bankName}}{{defaultBankData.bankCardType}} ({{defaultBankData.bankCardNo.slice(-4)}})</div>
          <div class="arrow"></div>
        </div>
      </div>
    </div>
    <div class="pocketWithdrawal_wrap">
      <p>提现金额</p>
      <div class="pocketWithdrawal_input">
        <p>¥</p>
        <md-input-item
          ref="input0"
          v-model="payAmount"
          placeholder="请输入提现金额（元）"
          is-amount
          :maxlength="11"
          size="normal"
          type="money"
          @input='OnInput($event)'
        ></md-input-item>
      </div>
        <div class="pocketWithdrawal_input_bottom_text">
          <p>本次最多可提现{{WalletData.settleBalance}}元</p>
          <p @click="allwithdrawal">全部提现</p>
        </div>
    </div>
    <div class="worry_text">预计2小时到账</div>
    <div class="pocketWithdrawal_btn">
      <!-- 充值按钮 -->
      <md-button type="primary" :inactive='!payAmount || payAmount <= 0' @click="withdrawal">下一步</md-button>
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
    name: 'pocketWithdrawal',
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
            payAmount: null,
            defaultBankData: {},
            WalletData: {},
            foreignToken: ''
        };
    },
    mounted() {
        this.getInfoList();
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
        getSSOToken() {
            api.B2CWallet.tokenApply({ tokenType: '05' }).then((res) => {
                this.foreignToken = res.foreignToken;
            }).finally(() => {
            });
        },
        // 获取和包信息
        getInfoList() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.infoList().then((res) => {
                this.WalletData = res;
                this.$store.commit('LOADING', false);
                res.bankCardList = res.bankCardList.filter(item => item.bankCardType === '借记卡');
                this.defaultBankData = res.bankCardList ? res.bankCardList[0] : {};
                this.banksList = res.bankCardList || [];
            }).catch((err) => {
                this.$store.commit('LOADING', false);
                this.b2cStatus = err.state;
            });
        },
        // 全部提现
        allwithdrawal() {
            this.payAmount = this.WalletData.settleBalance;
        },
        // 下一步
        withdrawal() {
            if (this.payAmount > Number(this.WalletData.settleBalance)) {
                this.$toast.info('提现金额不能大于可提现金额');
                return;
            }
            this.$store.commit('LOADING', true);
            const params = {
                agreementNo: this.defaultBankData.agreementNo,
                payAmount: this.payAmount,
                cardBankCode: this.defaultBankData.cardBankCode,
                bankCardNo: this.defaultBankData.bankCardNo,
                successPageUrl: `https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/pocketResult?statusType=05`,
                userNo: this.WalletData.userNo
            };
            api.B2CWallet.withdraw(params).then((res) => {
                const { payUrl } = res;
                window.location.href = `${payUrl}&ssoToken=${this.foreignToken}&navShow=N`;
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        // 银行卡点击选择
        onSelectorChoose(item) {
            this.defaultBankData = item;
        },
        // 显示支付方式弹窗
        showSelector() {
            this.isSelectorShow = true;
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
.pocketWithdrawal_container {
  background: #f7f7f7;
  height: 100vh;
  padding: 30px 24px;
  box-sizing: border-box;
  .pocketWithdrawal_wrap {
    background: #fff;
    padding: 25px;
    border-radius: 20px;
    font-size: 30px;
    .pocketWithdrawal_input {
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
    .pocketWithdrawal_input_bottom_text{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 26px;
      color: #A4A4A4;
      margin-top: 25px;
      p:nth-of-type(2){
        color: #2281FF;
      }
    }
  }
  .worry_text{
    padding: 20px 36px;
    color: #A4A4A4;
    font-size: 26px;
  }
  .pocketWithdrawal_changePay {
    // display: flex;
    // justify-content: space-between;
    padding: 10px 20px 57px ;
    font-size: 30px;
    p{
      margin-bottom: 27px;
    }
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
        flex: 1;
      }
      .arrow{
         width: 18px;
          height: 18px;
          border-left: 5px solid #939393;
          border-bottom: 5px solid #939393;
          transform: rotate(-135deg);
          border-radius: 2px;
      }
    }
  }
  .pocketWithdrawal_btn {
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
