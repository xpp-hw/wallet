<template>
  <div class="accountSigning_container">
    <div class="wrap" v-if="againFlag">
      <p>签约</p>
      <p>接口请求失败，请重试。</p>
      <div class="foot">
        <div class="btn" @click="close">取消</div>
        <div class="btn1"  @click="againClick">重新获取</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as store2 from '@/common/localstore';
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            mobile: store2.default.get('usrmob'),
            searchIndex: 0,
            jumpUrl: '',
            bankDate: {
                payOrdNo: '', // 签约订单号
                bankCd: '', // 银行编码(非必传)
                cardTyp: '', // 卡类型
                dealChn: '', // 签约渠道(自定义)
                payReturnUrl: ''// 返回地址
            },
            againFlag: false

        };
    },
    mounted() {
        this.bankDate.payOrdNo = this.$route.query.payOrdNo || '';
        this.bankDate.bankCd = this.$route.query.bankCd;
        this.bankDate.cardTyp = this.$route.query.cardTyp || '';
        this.bankDate.dealChn = this.$route.query.dealChn || '';
        this.bankDate.payReturnUrl = this.$route.query.payReturnUrl || '';
        this.queryUrl();
    },
    methods: {
        close() {
            this.$router.go(-1);
        },
        againClick() {
            this.queryUrl();
        },
        // 银联签约获取链接
        queryUrl() {
            this.$store.commit('LOADING', true);
            api.cupSignGetlink(this.bankDate).then((res) => {
                if (res.msgCd === 'BUS00000') {
                    this.againFlag = false;
                    this.jumpUrl = res.contractUrl;
                    if (this.jumpUrl) {
                        window.location.href = this.jumpUrl;
                    }
                } else {
                    this.againFlag = true;
                }
            }).catch((err) => {
                this.againFlag = true;
            }).finally((res) => {
                this.$store.commit('LOADING', false);
            });
        }
    }

};
</script>
<style lang="less" scoped>
  .accountSigning_container{
    height: 100vh;
    background: rgba(214, 214, 214, 0.20);
    position: relative;
    .wrap{
      width: 85%;
      padding: 30px 60px 50px 60px;
      background: #fff;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      box-sizing: border-box;
      text-align: center;
      border-radius: 10px;
      box-shadow: 0 6px 24px 2px rgba(214, 214, 214, 0.50);
      p{
        &:nth-child(1){
          font-size: 35px;
          font-weight: bold;
        }
        &:nth-child(2){
           font-size: 30px;
           line-height: 1.5;
           margin: 20px 0 40px;
        }
      }
      .foot{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 30px;
        .btn{
          padding: 15px 70px;
          border: 0.5px solid #333;
          border-radius: 8px;
          color: #333;
        }
        .btn1{
          padding: 16px 50px;
          background: #1e86f6;
          border-radius: 8px;
          color: #fff;
        }
      }
    }
  }
</style>
