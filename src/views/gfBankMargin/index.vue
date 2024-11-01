<template>
  <div class="gfBankMargin_container">
    <div class="rules" @click="rulesFlag = true">活动规则</div>
    <div class="gfBankMargin_body">
      <div class="gfBankMargin_item1">
        <div class="gfBankMargin_item1_body" :style="freezeStatus === '0' ? 'height:7.9rem':'height:7.5rem'">
         <!-- 未办理按钮 -->
        <div v-if="freezeStatus === '0'" @click="rightNewOpen" class="gfBankMargin_item1_btn">
          <span class="tip">每人限参与1次</span>
        </div>
        <!-- 已办理按钮 -->
        <div class="gfBankMargin_item1_btn_wrap" v-else>
          <div class="my_margin_btn" @click="marginClick"></div>
          <div class="my_prize_btn" @click="queryfreezeDataList"></div>
        </div>
        </div>

      </div>
      <div class="gfBankMargin_item2"></div>
    </div>
    <pop v-if="popFlag" @closePop='closePop' :freezeDataList='freezeDataList'></pop>
    <rules v-if="rulesFlag" @closePop='closePop' :rulesContent='rulesContent'></rules>
  </div>

</template>

<script>
import api from '@/common/apiUrls';
import pop from './compoments/pop.vue';
import rules from './compoments/rules.vue';

export default {
    components: {
        pop,
        rules
    },
    data() {
        return {
            popFlag: false,
            rulesFlag: false,
            freezeStatus: '0',
            rulesContent: ''
        };
    },
    mounted() {
        this.queryStatus();
        this.queryRules();
    },
    created() {
      api.getEncrypt({})
      .then((data) => {
        let emsKey = data.encryptKey || ''
        if(process.env.VUE_APP_ENV == 'local' || process.env.VUE_APP_ENV == 'sit') {
          gdp('setUserId', emsKey); // 此处填写用户手机号
        } else {
          if(this.$client.LEADEON) {
            gdp('setUserId', emsKey); // 此处填写用户手机号
          }
        }
      })
    },
    methods: {

        rightNewOpen() {
            window.location.href = 'https://wap.cgbchina.com.cn/h5-mobilebank-web/h5/cashDeposit/apply/productList?HMBA_STACK_HASH=1698397685&srcChannel=MB&merchantNo=HFB&sChannel=HFB&needContractNo=Y';
        },
        marginClick() {
            window.location.href = 'https://wap.cgbchina.com.cn/h5-mobilebank-web/h5/cashDeposit/idVerify/index?srcChannel=MB&HMBA_STACK_HASH=1698301194&faceFlag=LS&trade_BranchNo=&merchantNo=HFB&channel=400&sChannel=HFB&backUrl=%2FcashDeposit%2FmyCashDeposit%2FcashDepositList';
        },
        prizeClick() {
            this.popFlag = true;
        },
        closePop() {
            this.popFlag = false;
            this.rulesFlag = false;
        },
        queryStatus() {
            this.$store.commit('LOADING', true);
            api.freezeStatusCheck().then((res) => {
                this.freezeStatus = res.data.freezeStatus;// 0-未冻结；1-已冻结
            }).catch(() => {

            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        queryfreezeDataList() {
            this.$store.commit('LOADING', true);
            api.freezeDataList().then((res) => {
                this.popFlag = true;
                this.freezeDataList = res.data.list;
            }).catch(() => {
                this.$toast.info('系统开小差了，请重新尝试~');
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        queryRules() {
            api.huataiAgreement({
                businessCode: 'cgbhfbhd',
                businessType: 'WHOLE'
            }).then((res) => {
                this.rulesContent = res.content.replaceAll('px', '');
            });
        }
    }
};
</script>

<style lang="less" scoped>
.gfBankMargin_container{
  background: #ffe7d3 url('../../assets/images/gfBankMargin/gfBankMargin_bg.png') no-repeat;
  background-size: 100%;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 594px 24px 0;
  overflow: hidden;
  position: relative;
  .gfBankMargin_bg{}
  .rules{
    border-radius: 24.5px 0 0 24.5px;
    background: #ff0052;
    position: absolute;
    right: -1px;
    top: 25px;
    color: #fff;
    border: 1px solid #fbfbfb;
    padding:5px 10px;
    box-sizing: border-box;
    font-size: 22px;
  }
  .gfBankMargin_body{
    width: 100%;
    box-sizing: border-box;
    .gfBankMargin_item1{
      width:  100%;
      // padding: 20px;
      background: #fff;
      box-shadow: 1px 2px 6px 0 #ffdfc11a;
      border-radius: 28px;
      box-sizing: border-box;
      .gfBankMargin_item1_body{
        background: url('../../assets/images/gfBankMargin/deposit_bg.png') no-repeat;
        background-size: 100%;
        height: 780px;
        // padding: 67px 24px 0 99px;
        display: flex;
        justify-content: space-between;
        color: #B84C1C;
        font-size: 26px;
        box-sizing: border-box;
        padding-top: 590px;
      }
      .gfBankMargin_item1_btn{
        background: url('../../assets/images/gfBankMargin/right_new_btn.png') no-repeat;
        background-size: 100%;
        height: 145px;
        width: 463px;
        margin:10px auto 0;
        text-align: right;
        position: relative;
        .tip{
          padding: 8px 20px;
          font-size: 25px;
          color: #fff;
          background-image: linear-gradient(90deg, #fc6275 0%, #fe0957 100%);
          border-radius: 35px 30px 30px 0;
          border: 1px solid #fff;
          position: absolute;
          top: -5px;
          right: -10px;
        }
      }
      .gfBankMargin_item1_btn_wrap{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .my_margin_btn{
          background: url('../../assets/images/gfBankMargin/my_margin_btn.png') no-repeat;
          background-size: 100%;
          height: 136px;
          width: 316px;
        }
        .my_prize_btn{
          background: url('../../assets/images/gfBankMargin/my_prize_btn.png') no-repeat;
          background-size: 100%;
          height: 136px;
          width: 316px;
        }
      }
    }
    .gfBankMargin_item2{
      background: url('../../assets/images/gfBankMargin/flowpath_bg.png') no-repeat;
      background-size: 100%;
      height: 314px;
      margin-top: 15px;
    }
  }
}
</style>
