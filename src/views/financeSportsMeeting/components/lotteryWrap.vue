<template>
  <div class="lottery_wrap">
    <div class="lotteryWrap_title">
      <span>每人最多4次抽奖机会</span><span>已抽奖 {{financeSportsMeeting.lotteryNumData.totalLotteryNum}} 次</span>
    </div>
    <div class="lottery_body">
      <div class="lottery_w" v-for="item in 5">
        <div class="lottery_icon" :class="{'check_lottery_yellow_icon': checkLotteryIndex == item && item % 2,'yellow_icon':item % 2,'check_lottery_red_icon': checkLotteryIndex == item && item % 2 == 0}" ></div>
      </div>
    </div>
    <div class="lottery_subscript"></div>
    <div class="lottery_btn">
      <div class="btn1" @click="rulesClick"></div>
      <!-- 抽奖 -->
      <div class="btn2" @click="immediateLotteryDraw" v-if="financeSportsMeeting.lotteryNumData.totalLotteryNum < 4">
        <span>当前可抽奖次数{{financeSportsMeeting.lotteryNumData.availLotteryNum}}次</span>
      </div>
      <div class="btn2_over" v-else></div>
      <div class="btn3" @click="$emit('update:myPrizeFlag', true)"></div>
    </div>
    <!-- 中奖弹窗 -->
    <div class="winningAPrize_wrap" v-if="winningAPrizeFlag">
      <div class="winningAPrize_success" v-if="prizeName"
        :style="{
          backgroundImage: `url(${require('@/assets/images/financeSportsMeeting/' + winningImgUrl)})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'}"
      >
        <div class="msg">{{prizeName}}</div>
        <div class="close_btn" @click='winningAPrizeFlag = false'></div>
      </div>
      <div class="winningAPrize_error" v-else>
        <div class="close_btn" @click='winningAPrizeFlag = false'></div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/common/apiUrls.js'
import { mapState } from 'vuex'
export default {
  props:['guidedPopUpsFlag','myPrizeFlag'],
  computed: {
    ...mapState(['financeSportsMeeting'])
  },
  data(){
    return {
      checkLotteryIndex:0,
      winningAPrizeFlag:false,
      totalData:{
        totalLotteryNum:'0',//累计
        availLotteryNum:'0'//可抽奖
      },
      prizeName:'',
      cancelScrolling:true,
      intTime:null,
      outTime:null,
      prizeType: '2',
      winningImgUrl: 'winningAPrize_success.png'
    }
  },
  mounted(){
    this.queryLotteryNum()
  },
  methods:{
    queryLotteryNum(){
       api.financeSportsMeeting.getLotteryNum().then(res => {
          this.totalData.totalLotteryNum = res.totalLotteryNum || '0'
          this.totalData.availLotteryNum = res.availLotteryNum || '0'
          this.$store.dispatch('setLotteryNumData',JSON.parse(JSON.stringify(this.totalData)));
       })
    },
    rulesClick(){
      this.$emit('rulesClick')
    },
    immediateLotteryDraw(){
      if(this.financeSportsMeeting.lotteryNumData.totalLotteryNum >= '4'){
        return this.$toast.info('抽奖次数已用完')
      }
      // 如果没有可抽奖次数和累积抽奖次数，则弹出引导弹窗
      if(this.financeSportsMeeting.lotteryNumData.availLotteryNum == '0' &&  this.financeSportsMeeting.lotteryNumData.totalLotteryNum == '0'){
        this.$emit('update:guidedPopUpsFlag',true)
      }else{
        if(this.financeSportsMeeting.lotteryNumData.availLotteryNum > '0'){
          this.start()
          api.financeSportsMeeting.dayActivityLottery().then(res => {
            // if(res.prizeName){
            //   this.prizeName = res.prizeName.split('-')[1]
            // }

            // 奖品类型 1:话费 2:流量 3:充值劵 5:权益 6:优惠券 7:优惠券 8:E豆
            this.prizeType = res.pritye

            if(res.priamt) {
              if(this.prizeType == '2') {
                this.winningImgUrl = 'winningAPrize_success.png'
                this.prizeName = res.priamt
              } else if(this.prizeType == '8') {
                this.winningImgUrl = 'winningAPrize_E.png'
                this.prizeName = Number(res.priamt.slice(0,-1)) + '个'
              }
            }

            this.totalData.totalLotteryNum =  this.totalData.totalLotteryNum * 1 + 1
            this.totalData.availLotteryNum = this.totalData.availLotteryNum * 1 - 1
            this.$store.commit('SETLOTTERYNUMDATA',JSON.parse(JSON.stringify(this.totalData)))
          }).catch((err)=>{
            this.$toast.info(err.msgInfo)
            clearInterval(this.intTime)
            clearTimeout(this.outTime)
          })
        }else{
          this.$toast.info('请先浏览任务，获取抽奖机会')
        }
      }
    },
    start(){
      // 模拟抽奖
      this.intTime = setInterval(()=>{
        this.checkLotteryIndex += 1
        if(this.checkLotteryIndex > 5){
          this.checkLotteryIndex = 1
        }
      },100)
      // 随机3000到6000整数
      let random = Math.floor(Math.random()*3000+3000)
      this.outTime = setTimeout(() => {
        clearInterval(this.intTime)
        this.winningAPrizeFlag = true
      },random)
    }
  }
}
</script>

<style lang="less" scoped>
  .lottery_wrap{
    font-size: 28px;
    color: #fff;
    font-weight: 500;
    .lotteryWrap_title{
      display: flex;
      justify-content: space-around;
      padding: 0 70px;
      
    }
    .lottery_body{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;
      padding: 0 50px;
      height: 170px;
      .lottery_w{
        width: 20%;
      }
      .lottery_icon{
        background: url('~@/assets/images/financeSportsMeeting/lottery_red_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 122px;
        height: 164px;
        margin: auto;
      }
      .red_icon{
        background: url('~@/assets/images/financeSportsMeeting/lottery_red_icon.png') no-repeat;
        background-size: 100% 100%;
      }
      .yellow_icon{
        background: url('~@/assets/images/financeSportsMeeting/lottery_yellow_icon.png') no-repeat;
        background-size: 100% 100%;
      }
      .check_lottery_red_icon{
        background: url('~@/assets/images/financeSportsMeeting/check_lottery_red_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 174px;
      }
      .check_lottery_yellow_icon{
        background: url('~@/assets/images/financeSportsMeeting/check_lottery_yellow_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 170px;
      }
    }
    .lottery_subscript{
      width: 258px;
      height: 60px;
      background: url('~@/assets/images/financeSportsMeeting/lottery_subscript.png') no-repeat;
      background-size: 100% 100%;
      margin: 25px auto 0px;
      margin-right: 150px;
    }
    .lottery_btn{
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .subscript{
        width: 100%;
      }
      .btn1{
        width: 131px;
        height: 86px;
        background: url('~@/assets/images/financeSportsMeeting/rules_btn.png') no-repeat;
        background-size: 100% 100%;
        margin-left: -4px;
      }
      .btn2{
        width: 399px;
        height: 124px;
        background: url('~@/assets/images/financeSportsMeeting/right_lottery_btn.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        padding-top: 74px;
        box-sizing: border-box;
        font-size: 22px;
      }
      .btn2_over{
        width: 399px;
        height: 124px;
        background: url('~@/assets/images/financeSportsMeeting/over_btn.png') no-repeat;
        background-size: 100% 100%;
      }
      .btn3{
        width: 131px;
        height: 86px;
        background: url('~@/assets/images/financeSportsMeeting/my_lottery_btn.png') no-repeat;
        background-size: 100% 100%;
        margin-right: -4px;
      }
    }
    .winningAPrize_wrap{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 999;
      .winningAPrize_success{
        width: 950px;
        height: 960px;
        //background: url('~@/assets/images/financeSportsMeeting/winningAPrize_success.png') no-repeat;
        //background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 300px 0;
        box-sizing: border-box;
        .msg{
          color: #EA3828;
          text-align: center;
          font-size: 50px;
          font-weight: 600;
        }
        .close_btn{
          background: url('~@/assets/images/financeSportsMeeting/ok_btn.png') no-repeat;
          background-size: 100% 100%;
          width: 325px;
          height: 118px;
          margin: 250px auto 0;
        }
      }
      .winningAPrize_error{
        width: 578px;
        height: 582px;
        background: url('~@/assets/images/financeSportsMeeting/winningAPrize_error.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-sizing: border-box;
        .close_btn{
          background: url('~@/assets/images/financeSportsMeeting/myPrize_ok.png') no-repeat;
          background-size: 100% 100%;
          width: 360px;
          height: 128px;
          margin: 400px auto 0;
        }
      }
    }
  }
</style>