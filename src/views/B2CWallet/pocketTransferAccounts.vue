<template>
  <div class="pocketTransferAccounts_caontainer">
    <div class="pocketTransferAccounts_wrap">
      <div class="pocketTransferAccounts_input">
        <p>手机号</p>
        <md-input-item
        v-model="payeeMobile"
          ref="input0"
          placeholder="支持移动、联通、电信手机号"
          is-amount
          :maxlength="11"
          type="phone"
        ></md-input-item>
      </div>
    </div>
    <p class="warry_text">钱将实时转入对方账户，无法退款</p>
    <!-- 充值按钮 -->
    <md-button class="md-raised md-danger footer" :inactive="payeeMobile.length != '11'" @click="nextTo" >下一步</md-button>
    <!-- 未注册弹窗 -->
    <md-dialog
      :closable="false"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      <div style="text-align: center;line-height:1.5">对方未注册和包用户，请确认对方注册和包后再进行交易</div>
    </md-dialog>
  </div>
</template>

<script>
import { Dialog } from 'mand-mobile';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';

export default {
    name: 'pocketTransferAccounts',
    components: {
        [Dialog.name]: Dialog
    },
    data() {
        return {
            payeeMobile: '',
            payeeUserNo: '',
            basicDialog: {
                open: false,
                btns: [
                    {
                        text: '知道了',
                        handler: this.onBasicConfirm
                    }
                ]
            }
        };
    },
    methods: {
        nextTo() {
            if (store2.default.get('usrmob') === this.payeeMobile) {
                this.$toast.info('不支持向本机付款');
                return;
            }
            const params = {
                payeeMobile: this.payeeMobile
            };
            api.B2CWallet.PreCheck(params).then((res) => {
                if (res.msgCd === 'BUS00000') {
                    this.$store.commit('setPayeeMobile', this.payeeMobile);
                    this.$store.commit('setPayeeUserNo', res.payeeUserNo);
                    this.$router.push({
                        name: 'pocketTransferConfirm'
                    });
                } else {
                    this.$toast.info(res.resMsg);
                }
            }).catch((err) => {
                this.$toast.info(err.resMsg);
            });
        },
        onBasicConfirm() {
            this.basicDialog.open = false;
            // this.$router.push({
            //     name: 'pocketTransferAccounts1'
            // });
        }
    }
};
</script>

<style lang="less" scoped>
.pocketTransferAccounts_caontainer {
  height: 100vh;
  background: #F7F7F7;
  padding: 40px 24px 35px;
  box-sizing: border-box;
  .pocketTransferAccounts_wrap {
    background: #fff;
    padding:5px 15px;
    border-radius: 20px;
    font-size: 30px;
    box-sizing: border-box;
    .pocketTransferAccounts_input {
      display: flex;
      align-items: center;
      p {
        font-weight: 500;
        font-size: 30px;
        margin-right: 30px;
        margin-left: 10px;
      }
      /deep/.md-input-item-input {
        font-size: 32px;
        width: 450px;
      }
    }
  }
  .warry_text{
    font-size: 26px;
    color: #A4A4A4;
    margin: 32px 27px;
  }
  .footer{
    margin-top: 350px;
  }
}
</style>
