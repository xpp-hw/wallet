<template>
  <div class="hbActive_container">
    <div class="heard_bg"></div>
    <div class="myPrize" @click="myPrizeCLick"></div>
    <div class="card">
      <div class="hb_1GB_bg">
        <div class="one_subscript"></div>
        <p>全国通用流量</p>
        <p>*支付成功后赠送</p>
      </div>
      <div class="recharge_wrap" @click="subimt">
        <div class="recharge_sub"></div>
        <div class="recharge_btn"></div>
      </div>
    </div>
    <div class="ruls_wrap">
      <div class="ruls_title"></div>
      <div class="t_box" :class="{'t_height':moreFlag}" v-html="agreementContent"></div>
      <div class="more_wrap" @click="moreFlag = true" v-if="!moreFlag">
        展开更多<img src="../../assets/images/bindCardActive/downward_icon.png" alt="">
      </div>
    </div>
    <pop v-if="myPrizeFlag" @closePop='closePop' @toRecharge='toRecharge'></pop>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import pop from './pop.vue';

export default {
    components: {
        pop
    },
    data() {
        return {
            agreementContent: '',
            moreFlag: false,
            myPrizeFlag: false
        };
    },
    mounted() {
        this.getAgreement();
    },
    methods: {

        // 去充值
        subimt() {
            if (this.$client.LEADEON) {
                window.location.href = 'http://wap.js.10086.cn/vw/WSCZYL?payType=23';
            } else {
                window.location.href = 'http://wap.js.10086.cn/vw/WSCZYL?payType=23';
            }
        },
        // 无充值奖品
        toRecharge() {
            this.subimt();
        },
        closePop() {
            this.myPrizeFlag = false;
        },
        myPrizeCLick() {
            this.myPrizeFlag = true;
        },
        getAgreement() {
            api.huataiAgreement({
                businessCode: 'hbzfhdgz'
            }).then((res) => {
                this.agreementContent = res.content.replaceAll(
                    'px',
                    ''
                );
            });
        }
    }
};
</script>

<style lang="less" scoped>
.hbActive_container {
  height: 100vh;
  background: #d6fdfd;
  overflow-y: auto;
  position: relative;
  padding-bottom: 50px;
  .heard_bg {
    background: url("../../assets/images/bindCardActive/hb_bg.png") no-repeat;
    background-size: 100%;
    width: 100%;
    height: 840px;
  }
  .myPrize {
    position: absolute;
    top: 190px;
    right: 0;
    width: 39px;
    height: 106px;
    background: url("../../assets/images/bindCardActive/hb_myPrize.png")
      no-repeat;
    background-size: 100%;
  }
  .card {

    height: 480px;
    background: url("../../assets/images/bindCardActive/hb_card.png") no-repeat;
    background-size: 100%;
    margin: -160px 24px 0;
    padding: 73px 53px 0;
    box-sizing: border-box;
    position: relative;
    .hb_1GB_bg {
      width: 591px;
      height: 188px;
      background: url("../../assets/images/bindCardActive/hb_1GB_bg.png")
        no-repeat;
      background-size: 100%;
      padding: 49px 0;
      box-sizing: border-box;
      text-align: center;
      position: relative;
      line-height: 1.5;
      .one_subscript {
        position: absolute;
        width: 145px;
        height: 51px;
        background: url("../../assets/images/bindCardActive/hb_one_iocn.png")
          no-repeat;
        background-size: 100%;
        top: 0;
        right: 0;
      }
      p {
        padding-left: 50px;
      }
      p:nth-child(2) {
        font-weight: 600;
        font-size: 36.65px;
        color: #333333;
      }
      p:nth-child(3) {
        font-weight: 400;
        font-size: 30.18px;
        color: #72777b;
      }
    }
    .recharge_wrap {
      position: absolute;
      bottom: -80px;
      .recharge_sub {
        width: 236px;
        height: 70px;
        background: url("../../assets/images/bindCardActive/hb_10_icon.png")
          no-repeat;
        background-size: 100%;
        display: flex;
        float: right;
        margin-top: -40px;
        margin-right: 20px;
      }
      .recharge_btn {
        margin: auto;
        width: 574px;
        height: 163px;
        background: url("../../assets/images/bindCardActive/hb_recharge_btn.png")
          no-repeat;
        background-size: 100%;
      }
    }
  }
  .ruls_wrap{
    position: relative;
    margin: auto;
    background: #fff;
    padding: 83px 13px 36px;
    margin: 100px 24px 0;
    border-radius: 16px 16px 16px 16px;
    .ruls_title{
      width: 319px;
      height: 61px;
       background: url("../../assets/images/bindCardActive/hb_rule.png")
          no-repeat;
        background-size: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
    }
    .t_box{
      height: 425px;
      overflow: hidden;
      line-height: 1.5;
      font-size: 24px;
    }
    .t_height{
      height: 100%;
    }
    .more_wrap{
      margin-top: 30px;
      text-align: center;
      img{
        width: 21px;
        margin-left: 10px;
      }
    }
  }
}
</style>
