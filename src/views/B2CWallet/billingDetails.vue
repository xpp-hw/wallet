<template>
  <div class="billingDetails_container">
    <p class="billingDetails_title">余额<span v-if="data.orderType">{{data.orderType === '01' ? '充值' : data.orderType === '02' ? '转账' :'提现' }}</span></p>
    <p class="billingDetails_money"><span v-if="data.orderAmt">{{ data.orderType === '01' ? '+' : '-' }}{{data.orderAmt}}</span></p>
    <div class="billingDetails_item">
      <p>交易类型</p>
      <p><span v-if="data.orderType">{{ data.orderType === '01' ? '收入' : '支出' }}</span></p>
    </div>
     <div class="billingDetails_item">
      <p>交易时间</p>
      <p>{{data.orderDate}}</p>
    </div>
     <div class="billingDetails_item">
      <p>流水单号</p>
      <p>{{data.id}}</p>
    </div>
     <div class="billingDetails_item" v-if="data.orderType === '03' || data.orderType === '01'">
      <p>{{data.orderType === '03'?'提现':'充值'}}卡号</p>
      <p>{{data.bankCardNo}}</p>
    </div>
     <div class="billingDetails_item" v-if="data.orderType === '02'">
      <p>收款号码</p>
      <p>{{data.payeeMobile}}</p>
    </div>
     <div class="billingDetails_item" v-if="data.orderType === '02'">
      <p>备注</p>
      <p>{{data.remark}}</p>
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    name: 'billingDetails',
    data() {
        return {
            data: {

            }
        };
    },
    mounted() {
        // 订单类型orderType: 01:充值 02:转账 03:提现 ,
        // this.data = this.$route.query;
        this.query();
    },
    methods: {
        query() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.orderResult(this.$route.query.id).then((res) => {
                this.data = res;
            }).catch((err) => {
                this.status = '02';
                this.resMsg = err.resMsg;
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        }
    }
};
</script>

<style lang="less" scoped>
  .billingDetails_container{
    padding: 35px 24px;
    text-align: center;
    height: 100vh;
    background: #f2f3f4;
    .billingDetails_title{
      font-size: 34px;
      color: #333333;
    }
    .billingDetails_money{
      font-weight: 700;
      font-size: 56.4px;
      color: #050505;
      margin: 24px 0 110px;
    }
    .billingDetails_item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 1px solid #E5E5E5;
      p:nth-of-type(1){
        color: #ACACAC;
      }
       p:nth-of-type(2){
        color: #333333;
        font-weight: 500;
      }
    }
  }
</style>
