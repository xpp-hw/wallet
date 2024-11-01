<template>
   <div
      class="select_wrap"
      @click="banksClose"
    >
      <div class="select_body" @click.stop="">
        <div class="select_title">
          <div class="select-arrow" @click="banksClose"></div>
          <div class="select_text">请选择付款方式</div>
        </div>
        <div class="select_item">
          <div class="select_item_list">
            <div
              class="select_item_body"
              v-for="(item, index) in bankCardList"
              :key="index"
              @click="onSelectorChoose(item)"
            >
              <img
                :src="item.iconPath"
                alt=""
              />
              <div class="selector_item_text">{{item.bankName}}{{item.bankCardType}}（{{item.bankCardNo.slice(-4)}}）</div>
              <div :class="{ check: item.agreementNo == defaultBankData.agreementNo }"></div>
            </div>
          </div>
        </div>
        <div class="selector-footer">
          <div class="footer_wrap" :style="bankCardList.length === 0 ? 'border-radius:.16rem' : ''" @click="addBank">
            <img
              src="../../../assets/images/B2Cwallet/add_bank_icon.png"
              alt=""
              srcset=""
            />
            <div style="flex: 1">添加银行卡<span style="color:#757575;font-size: 0.24rem;">（仅支持借记卡）</span></div>
            <div class="select-arrow"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    props: {
        banksList: {
            type: Array,
            default() {
                return [];
            }
        },
        defaultBankData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            bankCardList: []
        };
    },
    watch: {
        banksList: {
            handler(val) {
                this.bankCardList = val.filter(item => item.bankCardType === '借记卡');
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 点击选择支付方式
        onSelectorChoose(item) {
            this.$emit('onSelectorChoose', item);
            setTimeout(() => {
                this.banksClose();
            }, 500);
        },
        banksClose() {
            this.$emit('banksClose');
        },
        // 添加银行卡
        addBank() {
            this.$store.commit('LOADING', true);
            const RETURN_URL = window.location.href;
            api.B2CWallet.tokenApply({ tokenType: '01' }).then((res) => {
                this.$store.commit('LOADING', false);
                const url = `https://www.cmpay.com/front-msa/bind-bank-card/quickBind?RETURN_FLG=5&RETURN_URL=${RETURN_URL}&typeId=10010&ssoToken=${res.foreignToken}&SUBMIT_TYPE=ajax&HEADER_FLG=1`;
                window.location.href = url;
            }).catch((err) => {
                this.$store.commit('LOADING', false);
            });
        }
    }

};
</script>

<style lang="less" scoped>
.select_wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  box-sizing: border-box;
  .select_body {
    animation: scale 1s;
    max-height: 540px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 25px 25px 0 0;
    background: #f5f5f5;
    padding: 43px 24px 110px;
    box-sizing: border-box;
    .select_title {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 36px;
      .select-arrow {
        width: 20px;
        height: 20px;
        border-left: 5px solid #939393;
        border-bottom: 5px solid #939393;
        transform: rotate(45deg);
        border-radius: 2px;
      }
      .select_text {
        width: 90%;
        text-align: center;
      }
    }
    .select_item {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 36px;
      .select_item_list {
        background: #fff;
        border-radius: 16px 16px 0 0;
        padding: 0 20px;
        .select_item_body {
          display: flex;
          align-items: center;
          font-size: 30px;
          padding: 26px 0;
          border-bottom: 1px solid #f5f5f5;
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
            background: url("../../../assets/images/B2Cwallet/check_icon.png")
              no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .selector-footer {
    width: 100%;
    box-sizing: border-box;
    padding: 0 24px;
    position: absolute;
    bottom: 32px;
    left: 0;
    .footer_wrap {
      border-radius: 0 0 16px 16px;
      background: #fff;
      height: 80px;
      font-size: 30px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 26px 25px;
      img {
        width: 32px;
        height: 32px;
        margin-right: 15px;
      }
      .select-arrow {
        width: 16px;
        height: 16px;
        border-left: 5px solid #939393;
        border-bottom: 5px solid #939393;
        transform: rotate(-135deg);
        border-radius: 2px;
      }
    }
  }
  }

}
@keyframes scale {
  0% {
    transform: translateY(400px);
  }
  // 50% {
  //   transform: translateY(30px);
  // }
  100% {
    transform: translateY(0px);
  }
}
</style>
