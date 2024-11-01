<template>
  <div class="pop_container">
    <div class="pop_wrap">
      <div class="close_icon" v-if="closeType" @click="closeBox"></div>
      <!-- 领取成功 -->
      <div class="pop1" v-if="popNum === 1">
        <div class="ok_btn" @click="closeBox"></div>
      </div>
      <!-- 不可重复领取 -->
      <div class="pop2" v-if="popNum === 2">
        <div class="ok_btn" @click="closeBox"></div>
      </div>
      <!-- 已经领满 -->
      <div class="pop3" v-if="popNum === 3">
        <div class="ok_btn" @click="closeBox"></div>
      </div>
       <!-- 温馨提示去开通省钱包 -->
      <div class="pop4" v-if="popNum === 4">
        <div class="open_btn" @click="openCLick"></div>
      </div>
       <!-- 领取记录空 -->
      <div class="pop5" v-if="popNum === 5">
        <div class="ok_btn" @click="closeBox"></div>
      </div>
       <!-- 领取记录有值 -->
      <div class="pop6" v-if="popNum === 6">
        <div class="history_wrap">
          <div v-for="(item,index) in historyList" :key="index" class="history_item">
          <div>{{item.date.slice(0,4)}}-{{item.date.slice(4,6)}}-{{item.date.slice(6,8)}}</div>
          <div>10元话费</div>
          <div style="color:#FF3140">已领取</div>
          </div>
        </div>
        <div class="history_top_position">
         <div class="history_top">
          <div v-for="item in historyTop" :key="item">
            {{item}}
          </div>
        </div>
        </div>
        <div class="ok_btn" @click="closeBox"></div>
      </div>
       <!-- 活动已结束～ -->
      <div class="pop7" v-if="popNum === 7">
        <p>活动已结束～</p>
        <div class="ok_btn" @click="closeBox"></div>
      </div>
      <!-- 领取失败 -->
      <div class="pop8" v-if="popNum === 8">
         <p>{{errMsg}}</p>
        <div style="position: absolute;bottom:0;left:.7rem" class="ok_btn" @click="closeBox"></div>
      </div>
      <!-- 账单未出账 -->
      <div class="pop9" v-if="popNum === 9">
        <p>{{errMsg}}</p>
        <div style="position: absolute;bottom:0;left:.7rem" class="ok_btn" @click="closeBox"></div>
      </div>
       <!-- 当日已领完 -->
      <div class="pop10" v-if="popNum === 10">
        <div  class="ok_btn" @click="closeBox"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        popNum: {
            type: Number,
            default: () => null
        },
        historyList: {
            type: Array,
            default: () => []
        },
        errMsg: {
            type: String,
            default: () => ''
        }
    },
    computed: {
        closeType() {
            return this.popNum === 3 || this.popNum === 4 || this.popNum === 6;
        }
    },
    data() {
        return {
            historyTop: ['时间', '奖品', '状态']
        };
    },
    methods: {
        closeBox() {
            this.$emit('closeBox');
        },
        openCLick() {
            window.location.href = 'https://fintech.12580life.com/fintech-h5/insurance/saveMoneyIndex';
        }
    }
};
</script>

<style lang="less" scoped>
  .pop_container{
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
    box-sizing: border-box;
    color: #991500;
    text-align: center;
    font-size: 32px;
    line-height: 1.8;
    .pop_wrap{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .close_icon{
        background: url('../../../assets/images/saveMoneyActive/close_icon.png') no-repeat;
        background-size: 100%;
        width: 57px;
        height: 57px;
        position: absolute;
        top: -120px;
        right: 0;
      }
      .pop1{
        background: url('../../../assets/images/saveMoneyActive/pop1.png') no-repeat;
        background-size: 100%;
        width: 622px;
        height: 573px;
        padding: 389px 0 0 0;
        box-sizing: border-box;
      }
      .pop2{
        background: url('../../../assets/images/saveMoneyActive/pop2.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 514px;
        padding: 289px 0 0 0;
        box-sizing: border-box;
      }
      .pop3{
        background: url('../../../assets/images/saveMoneyActive/pop3.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 544px;
        padding: 329px 0 0 0;
        box-sizing: border-box;
      }
      .pop4{
        background: url('../../../assets/images/saveMoneyActive/pop4.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 708px;
        padding: 539px 0 0 0;
        box-sizing: border-box;
      }
      .pop5{
        background: url('../../../assets/images/saveMoneyActive/pop5.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 708px;
        padding: 349px 0 0 0;
        box-sizing: border-box;
      }
      .pop6{
        background: url('../../../assets/images/saveMoneyActive/pop6.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 708px;
        padding: 160px 16px 0 16px;
        box-sizing: border-box;
        color: #363838;
        .history_top_position{

        }
        .history_top{
          display: flex;
          font-size: 32px;
          justify-content: space-between;
          position: absolute;
          width: 100%;
          padding: 0 16px;
          box-sizing: border-box;
          top: 85px;
          left: 0;
          div{
            font-weight: 800;
            color: #9A3F0C;
            box-sizing: border-box;
            width: 30%;
            text-align: center;
            padding: 5px 10px;
            background-image: linear-gradient(to top, #ffffff 0%, #fff3d1 100%);
            opacity: .8;
          }
        }
        .history_wrap{
          height: 250px;
          overflow-y: auto;
          clear: both;
          .history_item{
              font-size: 28px;
              display: flex;
              div{
                width: 33.3%;
                text-align: center;
                line-height: 2;
              }
          }
        }
      }
      .pop7{
        background: url('../../../assets/images/saveMoneyActive/pop7.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 544px;
        padding: 251px 0 0 0;
        box-sizing: border-box;
        p{
          padding-bottom: 61px;
        }
      }
       .pop8{
        background: url('../../../assets/images/saveMoneyActive/pop8.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 544px;
        padding: 161px 60px 0 60px;
        box-sizing: border-box;
      }
      .pop9{
        background: url('../../../assets/images/saveMoneyActive/pop9.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 544px;
        padding: 174px 60px 0 60px;
        box-sizing: border-box;
      }
      .pop10{
        background: url('../../../assets/images/saveMoneyActive/pop10.png') no-repeat;
        background-size: 100%;
        width: 568px;
        height: 544px;
        padding: 259px 60px 0 60px;
        box-sizing: border-box;
      }
      .ok_btn{
         background: url('../../../assets/images/saveMoneyActive/ok_btn.png') no-repeat;
        background-size: 100%;
        width: 418px;
        height: 181px;
        margin:auto;
      }
      .open_btn{
         background: url('../../../assets/images/saveMoneyActive/open_btn.png') no-repeat;
        background-size: 100%;
        width: 418px;
        height: 181px;
        margin:auto;
      }
    }
  }
</style>
