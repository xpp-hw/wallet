<template>
  <div class="accountSigning_container">
    <div class="wrap" v-if="againFlag">
      <p>授权</p>
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
            b2cStatus: '',
            b2cData: {
                realType: '0'
            },
            queryData: {},
            againFlag: false,
            pathStr: ''
        };
    },
    mounted() {
        this.getInfoList();
        this.queryData = this.$route.query || {};
        Object.keys(this.queryData).forEach((item, index) => {
            if (index == Object.keys(this.queryData).length - 1) {
                this.pathStr += `${item}=${this.queryData[item]}`;
            } else {
                this.pathStr += `${item}=${this.queryData[item]}&`;
            }
        });
    },
    methods: {
        close() {
            this.$router.go(-1);
        },
        againClick() {
            this.getInfoList();
        },
        // 获取和包信息
        getInfoList() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.infoList().then((res) => {
                this.$store.commit('LOADING', false);
                this.b2cStatus = res.state;
                this.hbCheck(this.b2cStatus);
            }).catch((err) => {
                this.$store.commit('LOADING', false);
                this.againFlag = true;
            });
        },
        // 和包签约/注册
        hbCheck(type) {
            switch (type) {
                case '1':// 未注册
                    window.location.replace(`https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/hbOpen?${this.pathStr}`);
                    break;
                case '2':// 未授权
                    window.location.replace(`https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/hbEmpower?${this.pathStr}`);
                    break;
                case '3':// 已授权且二次放号
                    window.location.replace(`https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/hbEmpower?${this.pathStr}`);
                    break;
                case '4':// 未签约
                    window.location.replace(`https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/accountSigning?${this.pathStr}`);
                    break;
                case '5':// 已授权
                    if (this.$route.query.symbol === 'onelevel') {
                        window.location.replace(`https://fintech.12580life.com${process.env.BASE_URL}newFortune?parchn=qbsyjhy&gytype=002611`);
                    } else {
                        // 查询用户是否实名
                        this.$store.commit('LOADING', true);
                        api.B2CWallet.certificationInfo().then((res) => {
                            this.$store.commit('LOADING', false);
                            if (res.userType == 'P') {
                                window.location.replace(`https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/bindCard?${this.pathStr}`);
                            } else {
                                this.$store.commit('LOADING', false);
                                window.location.replace(`https://fintech.12580life.com${process.env.BASE_URL}B2CWallet/accountName?${this.pathStr}`);
                            }
                        }).catch((err) => {
                            this.$store.commit('LOADING', false);
                        });
                    }
                    break;
            }
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
