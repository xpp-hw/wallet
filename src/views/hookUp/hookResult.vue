<template>
   <div class="contains">
      <div class="msgCont">
          <div class="sucLoge" v-if="isSucc === '01'">
              <img src="@/assets/images/recharge/rechargeSuc.png" alt="">
              <p class="suc">挂接成功</p>
              <p class="msg">恭喜挂接成功，您可以在掌厅查看您的数字人民币账户了</p>
          </div>
           <div class="sucLoge" v-else>
              <img src="@/assets/images/recharge/rechargeFail.png" alt="">
              <p class="suc">挂接失败</p>
              <p class="msg">抱歉，挂接失败，您可稍后重新尝试签约</p>
              <p class="reason" v-if="failReason">失败原因：{{failReason}}</p>
          </div>
      </div>

      <md-button class="transferBtn" @click="jumpTo">完成</md-button>
   </div>
</template>

<script>
import Header from '@/components/header';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'rechargeSuccess',
    components: {
        Header
    },
    data() {
        return {
            isSucc: '',
            failReason: ''
        };
    },
    mounted() {
        this.isSucc = this.$route.query.isSucc;
        this.failReason = this.$route.query.reason || '';
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        jumpTo() {
            this.$router.push({ name: 'newFortune' });
        }
    }
};
</script>
<style lang="less" scoped>
  .contains {
    .msgCont {
        height: 408px;
        position: relative;
        .sucLoge {
        height: 365px;
        width: 365px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
            img {
                margin: 67px 90px 38px 90px;
                width: 186px;
            }
            .suc {
                font-size: 36px;
                font-weight: 600;
                color: #333333;
                line-height: 48px;
                margin: auto;
            }
            .msg {
                font-size: 28px;
                font-weight: 500;
                color: #999999;
                line-height: 40px;
                margin: 30px auto 20px;
            }
            .reason{
                font-size: 28px;
                font-weight: 500;
                color: #4196ff;;
                line-height: 40px;
            }
        }
    }
    .transferBtn {
        width: 4rem;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.34rem;
        background: #0195ff;
        border-radius: 10px;
        position: fixed;
        bottom: 3rem;
        left: 50%;
        transform: translateX(-50%);
    }
  }
</style>
