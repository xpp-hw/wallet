<template>
  <div class="saveMoneyActive_container">
    <div class="top_bg">
      <div class="receive_history" @click="historyClick"></div>
      <div class="receiveBtn" @click="receive"></div>
    </div>
    <div class="foot_bg">
      <div class="rules_bg">
        <div class="rules_title"></div>
        <rulesText></rulesText>
      </div>
    </div>

    <md-popup v-model="isPopupShow" :mask-closable="false">
      <div class="popContent">
        活动已下线
      </div>
    </md-popup>

    <pop v-if="popFlag" :popNum='popNum' :historyList='historyList' @closeBox='closeBox' :errMsg='errMsg'></pop>
  </div>
</template>

<script>
import api from '@/common/apiUrls.js';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import rulesText from './compoments/rulesText.vue';
import pop from './compoments/pop.vue';
import { Popup } from "mand-mobile";

export default {
    components: {
        rulesText,
        pop,
        [Popup.name]: Popup
    },
    data() {
        return {
            popFlag: false,
            popNum: 1, // 状态弹窗
            historyList: [],
            errMsg: '',
            touchArr: [],
            isPopupShow: false,
        };
    },
    mounted() {

      let nowdateTime = new Date().getTime()
      let offTime = '2023/12/31 23:59:59'
      // let offTime = '2023/12/18 13:46:25'
      offTime = new Date(offTime).getTime()
      console.log(nowdateTime,offTime,"---+++")
      if(nowdateTime > offTime) {
        this.isPopupShow = true;
        return
      }

      this.queryHistory();
      initPageJs(this.$route.meta.pageName, this.touchArr, this.$route.meta.attributes);
    },
    methods: {
        historyClick() {
            if (this.historyList.length === 0) {
                this.popNum = 5;
            } else {
                this.popNum = 6;
            }
            this.popFlag = true;
        },
        closeBox() {
            this.popFlag = false;
        },
        queryHistory() {
            api.thirtyPrizeList().then((res) => {
                this.historyList = res.list.filter(item => item.state == '1');
            });
        },
        receive() {
            if (new Date().getTime() >= new Date('2023-12-31 24:00:00').getTime()) {
                this.popNum = 7;
                this.popFlag = true;
                return;
            }
            this.$store.commit('LOADING', true);
            api.receiveThirty().then((res) => {
                // 0:成功 1:日领取次数超限 2:用户总领取次数超限 3:用户当月领取超限 4:未办理省钱包业务 5:账单未出账 6:营销中心发奖预校验未通过 7:奖品发放失败
                switch (res.state) {
                    case '0':
                        this.popNum = 1;
                        this.queryHistory();
                        break;
                    case '1':
                        this.popNum = 10;
                        break;
                    case '2':
                        this.popNum = 3;
                        break;
                    case '3':
                        this.popNum = 2;
                        break;
                    case '4':
                        this.popNum = 4;
                        break;
                    case '5':
                        this.errMsg = '您办理的业务当月账单未出，请出账后再来领取话费哦~';
                        this.popNum = 9;
                        break;
                    case '6':
                        this.errMsg = res.errMsg || '领取失败~';
                        this.popNum = 8;
                        break;
                    case '7':
                        this.errMsg = res.errMsg || '领取失败~';
                        this.popNum = 8;
                        break;
                    case '8':
                        this.errMsg = '您好，每日10:00开抢，请届时登录页面参与，谢谢！';
                        this.popNum = 8;
                        break;
                }
                this.$store.commit('LOADING', false);
                this.popFlag = true;
            }).catch((err) => {
                this.$store.commit('LOADING', false);
                this.$toast.info('系统出差了～');
            });
        }
    }
};
</script>

<style lang="less" scoped>
.saveMoneyActive_container {
  background-image: linear-gradient(to bottom, #ffffff 0%, #febc50 100%);
  .top_bg {
    height: 830px;
    background: url("../../assets/images/saveMoneyActive/top_bg.png") no-repeat;
    background-size: 100%;
    position: relative;
    .receiveBtn {
      height: 162px;
      width: 511px;
      background: url("../../assets/images/saveMoneyActive/receive_btn.png")
        no-repeat;
      background-size: 100%;
      position: absolute;
      bottom: -110px;
      left: 55%;
      transform: translate(-50%);
    }
    .receive_history{
      height: 54px;
      width: 144px;
      background: url("../../assets/images/saveMoneyActive/receive_history.png")
        no-repeat;
      background-size: 100%;
      position: absolute;
      top: 20px;
      right: 0;
    }
  }
  .foot_bg{
    padding:120px 24px;
    .rules_bg{
      border: 15px solid #ffe2a2;
      border-radius: 40px;
      background: #ffffff;
      box-shadow: 0 -3px 0px 0px rgba(255, 255, 255, 100%);
      padding: 100px 23px 52px;
      position: relative;
      .rules_title{
        height: 63px;
        width: 331px;
        background: url("../../assets/images/saveMoneyActive/rules_title.png")
          no-repeat;
        background-size: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
}
.popContent {
  width: 350px;
  height: 180px;
  line-height: 180px;
  background: #fff;
  border-radius: 20px;
  font-size: 40px;
  font-weight: 500;
  text-align: center;
}
</style>
