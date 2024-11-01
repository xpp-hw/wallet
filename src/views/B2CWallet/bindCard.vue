<template>
  <div class="accountSigning_container">
    <div class="wrap" v-if="againFlag">
      <p>添加银行卡</p>
      <p>接口请求失败，请重试。</p>
      <div class="foot">
        <div class="btn" @click="close">取消</div>
        <div class="btn1"  @click="againClick">重新获取</div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            againFlag: false,
            returnUrl: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/B2CWallet/myMoney'
        };
    },
    mounted() {
        this.dealChn = this.$route.query.dealChn;
        this.ZFbackID = this.$route.query.ZFbackID || '';
        this.returnUrl = this.$route.query.backUrl;
        this.getBackUrl({
            dealChn: this.dealChn
        });
        this.queryInfo();
    },
    methods: {
        queryInfo() {
            // 查询用户是否实名
            this.$store.commit('LOADING', true);
            api.B2CWallet.certificationInfo().then((res) => {
                this.$store.commit('LOADING', false);
                if (res.userType === 'P') {
                    this.getToken();
                } else {
                    this.$router.push({
                        name: 'accountName',
                        query: this.$route.query,
                        replace: true
                    });
                }
            }).catch((err) => {
                this.$store.commit('LOADING', false);
            });
        },
        // 返回地址
        getBackUrl(data) {
            api.newBank
                .backUrl(data)
                .then((res) => {
                    if (res.backUrl && this.ZFbackID) {
                        this.returnUrl = `${res.backUrl}?ORD_NO=${this.ZFbackID}`;
                    } else if (res.backUrl) {
                        this.returnUrl = res.backUrl;
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        getToken() {
            api.B2CWallet.tokenApply({ tokenType: '01' }).then((res) => {
                this.againFlag = false;
                const url = `https://www.cmpay.com/front-msa/bind-bank-card/quickBind?RETURN_FLG=5&RETURN_URL=${this.returnUrl}&typeId=10010&ssoToken=${res.foreignToken}&SUBMIT_TYPE=ajax&HEADER_FLG=1`;
                window.location.replace(url);
            }).catch((err) => {
                this.againFlag = true;
            });
        },
        close() {
            window.location.href = this.returnUrl;
        },
        againClick() {
            this.getToken();
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
