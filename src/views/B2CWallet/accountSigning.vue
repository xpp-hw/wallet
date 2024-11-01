<template>
  <div class="accountSigning_container">
    <div class="wrap">
      <p>签约提醒</p>
      <p>您的手机号<span v-if="mobile">{{mobile.slice(0,3)}}****{{mobile.slice(-4)}}</span>下存在移动钱包账户，点击确认，签约账户；</p>
      <p>签约成功后，您可查看您的钱包账户。</p>
      <div class="foot">
        <div class="btn" @click="close">取消</div>
        <div class="btn1"  @click="submit">确认签约</div>
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
            mobile: store2.default.get('usrmob')
        };
    },
    mounted() {
    },
    methods: {
        close() {
            this.$router.go(-1);
        },
        againClick() {
            this.queryUrl();
        },
        submit() {
            this.$router.push({
                name: 'walletSign',
                query: {
                    acctyp: '03',
                    ...this.$route.query
                }
            });
        }
    }

};
</script>
<style lang="less" scoped>
  .accountSigning_container{
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
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
      p{
        &:nth-child(1){
          font-size: 35px;
          font-weight: bold;
        }
        &:nth-child(2){
           font-size: 30px;
           line-height: 1.5;
           margin-top: 40px;
        }
        &:nth-child(3){
           font-size: 30px;
           line-height: 1.5;
           margin-bottom:  50px;
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
