<template>
  <div class="signingResult_container">
    <div class="opening-account" v-if="!result">
      <img alt="" src="@/assets/images/loading-ing.gif" />
      <p>正在查询</p>
      <p class="tip">
        预计<span style="color: #238ff2">20秒</span>完成签约，请您耐心等待
      </p>
    </div>
    <div class="sign-success" v-if="result == '01'">
      <img src="@/assets/images/wallet-icon3.png" alt="" />
      <p>签约成功</p>
      <p>恭喜，签约成功，您现在可以在此手机号下登录钱包账户了。</p>
      <div class="btn blue_btn" @click="close">完成</div>
    </div>
    <div class="sign-fail"  v-if="result == '02'">
      <img src="@/assets/images/wallet-icon4.png" alt="" />
      <p>签约失败</p>
      <p>正在签约中，请使用其他支付方式</p>
      <div class="btn" @click="close">返回</div>
    </div>
  </div>
</template>
<script>
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            searchIndex: 0,
            jumpUrl: '',
            result: '',
            signJrnNo: '',
            payReturnUrl: ''// 返回地址
        };
    },
    mounted() {
        this.querySts();
        this.signJrnNo = this.$route.query.signjrnno || '';
    },
    methods: {
        signingResult() {
            this.searchIndex += 1;// 记录查询次数，
            api.cupSignStsQuery({ signJrnNo: this.signJrnNo }).then((res) => {
                this.result = res.signSts;
                this.payReturnUrl = res.payReturnUrl;
            });
            this.querySts();
        },
        querySts() {
            if (this.result === '01') {
                console.log('this.jumpUrl', this.jumpUrl);
            } else if (this.searchIndex < 6) {
                const timer = setTimeout(() => {
                    clearTimeout(timer);
                    this.signingResult();
                }, 3000);
            } else if (this.searchIndex >= 6) {
                this.result = '02';
            }
        },
        close() {
            window.location.href = this.payReturnUrl;
        }
    }
};
</script>
<style lang="less" scoped>
.signingResult_container {
  text-align: center;
  padding: 160px 20px;
  font-size: 30px;
  font-weight: bold;
  .opening-account {
    width: 100%;
    margin-top: 0.5rem;
    text-align: center;

    img {
      width: 1.25rem;
      height: 1.25rem;
      display: block;
      margin: 0 auto;
    }

    p:nth-of-type(1) {
      font-size: 0.4rem;
      color: #333;
      padding-top: 0.4rem;
      font-weight: 500;
    }

    .tip {
      font-size: 0.28rem;
      color: #888888;
      padding-top: 0.1rem;
    }
  }
  img {
    width: 200px;
  }
  p {
    margin: 30px 0;
  }
  .btn {
    margin: auto;
    border: 1px solid #a6a6a6;
    padding: 15px 100px;
    border-radius: 10px;
    font-weight: 400;
    margin-top: 60px;
    display: inline-block;
  }
  .blue_btn {
    background: #167de5;
    color: #fff;
    border: none;
    padding: 15px 100px;
  }
}
</style>
