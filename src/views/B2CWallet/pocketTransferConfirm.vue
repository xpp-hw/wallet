<template>
  <div class="pocketTransferConfirm_container">
    <div class="pocketTransferConfirm_wrap">
      <div class="top_wrap">
        <img src="../../assets/images/B2Cwallet/people_icon.png" alt="">
        <span v-if="payeeData.payeeMobile">{{payeeData.payeeMobile.slice(0,3)}}****{{payeeData.payeeMobile.slice(-4)}}</span>
      </div>
      <p>金额</p>
      <div class="pocketTransferConfirm_input">
        <p>¥</p>
        <md-input-item
          v-model="payAmount"
          placeholder="请输入转账金额（元）"
          is-amount
          :maxlength="10"
          size="normal"
          type="money"
           @input='OnInput($event)'
        ></md-input-item>
      </div>
      <div class="prompt_wrap">
        <p class="left_text">到账时间</p>
        <div>
          <p>预计2小时内到账</p>
          <p>直接转入对方账户，不支持退款</p>
        </div>
      </div>
      <!-- 备注 -->
      <div class="notes_wrap">
        <p class="left_text">备注</p>
        <md-input-item
          v-model="remark"
          placeholder="20以内选填"
          is-amount
          :maxlength="20"
          size="normal"
          type="text"
        ></md-input-item>
      </div>
    </div>
    <div class="pocketRecharge_btn">
      <!-- 充值按钮 -->
      <md-button class="md-raised md-danger" :inactive="!payAmount || payAmount <= 0" @click="nextTo">下一步</md-button>
      <p class="rules">
        根据银行规则、支付业务场景、交易风险等级会有限额限制，具体以交易结果为准哦～
      </p>
    </div>
    <md-dialog
      :closable="false"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      <p style="line-height:1.8;text-align:center;color:#333333">请输入收款人姓名的最后一个字以确认对方身份信息</p>
    <div style="display: flex;justify-content: center;margin-top:.4rem">
     <span style="font-size:.84rem;margin:0 0.3rem;">{{custName}} </span><input v-model="payeeName" type="text" style="width: 1.47rem;height: .74rem;border:1px solid;border-radius:.1rem;padding: 0.16rem 0.5rem;box-sizing: border-box;font-size: .4rem;font-weight: 500;">
    </div>
    </md-dialog>
  </div>
</template>

<script>
import { Dialog } from 'mand-mobile';
import { mapState } from 'vuex';
import api from '@/common/apiUrls';

export default {
    components: {
        [Dialog.name]: Dialog
    },
    computed: {
        ...mapState(['payeeData'])
    },

    data() {
        return {
            payAmount: '',
            payeeName: '',
            custName: '*',
            remark: '', // 备注
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
            foreignToken: ''
        };
    },
    mounted() {
        this.querypayeeName();
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
            this.$store.commit('LOADING', true);
            api.B2CWallet.tokenApply({ tokenType: '02' }).then((res) => {
                this.foreignToken = res.foreignToken;
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        // 下一步
        nextTo() {
            this.basicDialog.open = true;
        },
        querypayeeName() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.payeeName({ payeeUserNo: this.payeeData.payeeUserNo }).then((res) => {
                this.custName = res.custName;
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        onBasicCancel() {
            this.basicDialog.open = false;
        },
        onBasicConfirm() {
            this.$store.commit('LOADING', true);

            api.B2CWallet.payeeNameCheck({ payeeUserNo: this.payeeData.payeeUserNo, payeeName: this.custName + this.payeeName.trim() }).then(((res) => {
                // 成功之后调取转账接口
                if (res.msgCd === 'BUS00000') {
                    const params = {
                        payAmount: this.payAmount,
                        payeeMobile: this.payeeData.payeeMobile,
                        remark: this.remark,
                        successPageUrl: `https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/pocketResult?statusType=03`
                    };
                    api.B2CWallet.accountTransfer(params).then((res) => {
                        this.basicDialog.open = false;
                        const { payUrl } = res;
                        window.location.replace(`${payUrl}&ssoToken=${this.foreignToken}&navShow=N`);
                    }).catch((err) => {
                        this.$toast.info(err.resMsg);
                    }).finally(() => {
                        this.$store.commit('LOADING', false);
                    });
                }
            })).catch((err) => {
                this.$store.commit('LOADING', false);
                this.$toast.info(err.resMsg);
            }).finally(() => {

            });
        }
    }
};
</script>

<style lang="less" scoped>
.pocketTransferConfirm_container {
  height: 100vh;
  background: #f7f7f7;
  padding: 40px 24px 35px;
  box-sizing: border-box;
  .pocketTransferConfirm_wrap {
    background: #fff;
    padding: 25px;
    border-radius: 20px;
    font-size: 30px;
    .top_wrap{
      display: flex;
      align-items: center;
      margin-bottom: 65px;
      font-size: 36px;
      img{
        margin-right: 36px;
        width: 76px;
        height: 76px;
      }
    }
    .pocketTransferConfirm_input {
      display: flex;
      align-items: center;
      margin-top: 30px;
      border-bottom: 1px solid #e5e5e5;
      p {
        font-weight: 500;
        font-size: 50px;
        margin-right: 30px;
        margin-left: 10px;
      }
      /deep/.md-input-item-input {
        font-size: 40px;
        width: 560px;
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
  .prompt_wrap{
    font-size: 26px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    line-height: 1.8;
    padding: 25px 0;
    .left_text{
      width: 1.5rem;
    }
    div{
      p:nth-of-type(2){
        color: #A5A4A4;
      }
    }
  }
  .notes_wrap{
     display: flex;
      align-items: center;
      font-size: 26px;
      .left_text{
      width: 1.5rem;
    }
     /deep/.md-input-item-input {
        // font-size: 40px;
        width: 560px;
        border-bottom: none;
      }
  }
}
</style>
