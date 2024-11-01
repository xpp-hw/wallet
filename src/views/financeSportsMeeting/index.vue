<template>
  <div class="financeSportsMeeting_content">
    <!-- 抽奖 -->
    <lotteryWrap :guidedPopUpsFlag.sync='guidedPopUpsFlag' :myPrizeFlag.sync='myPrizeFlag' @rulesClick='rulesClick'></lotteryWrap>

    <div class="venue_wrap">
      <!-- 篮球厂 -->
      <basketballFactory @goBrowse='goBrowse'></basketballFactory>
      <!-- 支付中心 -->
      <paymentCenter @goBrowse='goBrowse'></paymentCenter>
      <!-- 信用卡之家 -->
      <creditCardHouse @goBrowse='goBrowse'></creditCardHouse>
      <!-- 足球场 -->
      <footballStadium @goBrowse='goBrowse'></footballStadium>
      <!-- 底部更多项目 -->
      <moreProjects></moreProjects>

      <!-- 浏览弹窗 -->
      <browsingPopUps v-if="browsingPopUpsFlag" @closeBrowsingPopUps='closeBrowsingPopUps' :browsingPageNumber='browsingPageNumber'></browsingPopUps>
      <!-- 首次登陆弹窗 -->
      <firstEntryPopUps v-if="!firstEntryPopUpsFlag" :firstEntryPopUpsFlag.sync='firstEntryPopUpsFlag'></firstEntryPopUps>
      <!-- 引导弹窗 -->
      <guidedPopUps v-if="guidedPopUpsFlag" :guidedPopUpsFlag.sync='guidedPopUpsFlag'></guidedPopUps>
      <!-- 规则 -->
      <rulesPopUps v-if="rulesPopUpsFlag" :rulesPopUpsFlag.sync='rulesPopUpsFlag' :agreementContent='agreementContent'></rulesPopUps>
      <!-- 我的奖品 -->
      <myPrize v-if="myPrizeFlag" :myPrizeFlag.sync='myPrizeFlag'></myPrize>
      <!-- 横屏提示 -->
      <div class="landscapePrompt" v-if="landscapePromptFlag">
        <img src="../../assets/images/financeSportsMeeting/smallBell_icon.png" alt="" srcset="">
        <span>请横屏体验哦～</span>
      </div>
    </div>
  </div>
</template>

<script>
import lotteryWrap from './components/lotteryWrap.vue'
import basketballFactory from './components/basketballFactory'
import paymentCenter from './components/paymentCenter'
import creditCardHouse from './components/creditCardHouse.vue'
import footballStadium from './components/footballStadium.vue'
import moreProjects from './components/moreProjects.vue'
import browsingPopUps from './components/browsingPopUps'
import firstEntryPopUps from './components/firstEntryPopUps.vue'
import guidedPopUps from './components/guidedPopUps.vue'
import rulesPopUps from './components/rulesPopUps.vue'
import myPrize from './components/myPrize'
import { mapState } from 'vuex'
import api from '@/common/apiUrls.js'
export default {
  components:{
    lotteryWrap,
    basketballFactory,
    paymentCenter,
    creditCardHouse,
    footballStadium,
    moreProjects,
    browsingPopUps,
    firstEntryPopUps,
    guidedPopUps,
    rulesPopUps,
    myPrize
  },
  data(){
    return {
      browsingPopUpsFlag:false, //浏览
      browsingPageNumber:1,//浏览开始页码
      firstEntryPopUpsFlag:window.localStorage.getItem('bsWallet.firstEntry'), //首次进入
      guidedPopUpsFlag:false, //引导
      rulesPopUpsFlag:false,//规则
      myPrizeFlag:false,//我的奖品
      landscapePromptFlag:false,//横屏提示
      agreementContent:''//协议内容
    }
  },
   watch:{
    browsingPopUpsFlag:{
      handler(val){
        if(val){
          document.body.style.overflow = 'hidden'
          this.landscapePromptFlag = true
          window.sessionStorage.setItem('browsingPopUpsFlag',true)
          setTimeout(()=>{
            this.landscapePromptFlag = false
          },3000)
        }else{
          document.body.style.overflow = 'auto'
        }
      }
    },
    rulesPopUpsFlag:{
      handler(val){
        if(val){
          document.body.style.overflow = 'hidden'
        }else{
          document.body.style.overflow = 'auto'
        }
      }
    },
    guidedPopUpsFlag:{
      handler(val){
        if(val){
          document.body.style.overflow = 'hidden'
        }else{
          window.scrollTo({ 
              top: 0, 
              behavior: "smooth" 
          });
          document.body.style.overflow = 'auto'
        }
      }
    }
  },
  computed: {
    ...mapState(['financeSportsMeeting'])
  },
  mounted(){
    this.queryTaskList()
    this.getAgreement()
    this.browsingPageNumber = Number(window.sessionStorage.getItem('browsingPageId')) || 1
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
  methods:{
    // 获取协议
    getAgreement() {
        api.huataiAgreement({
            businessCode: 'jrflttlhd'
        }).then((res) => {
            this.agreementContent = res.content.replaceAll(
                'px',
                ''
            );
        });
    },
    // 查询任务列表
    queryTaskList(){
      this.$store.commit('LOADING', true);
      api.financeSportsMeeting.activityTaskQuery().then(res => {
        res.dayActivityConf = res.dayActivityConf.slice(0, 4); //只取4个
        res.dayActivityConf.forEach((item,index) => {
          item.activityId = index + 1
          item.toBeViewed = item.activityTaskInf.filter(item => item.taskSts == '1').length //角标待领取个数
          item.activityTaskInf.forEach(el => {
            el.class = 'activity_banner' + (Math.floor(Math.random() * 7) + 1)
          })
        })
        //是否打开过浏览弹窗
        this.browsingPopUpsFlag = Boolean(window.sessionStorage.getItem('browsingPopUpsFlag'))
        this.$store.commit('SETACTIVITYLIST', res.dayActivityConf)
      }).finally(()=>{
        this.$store.commit('LOADING', false);
      })
    },

    rulesClick(){
      this.rulesPopUpsFlag = true
    },
    goBrowse(val){
      this.browsingPageNumber = val
      this.browsingPopUpsFlag = true
      window.sessionStorage.setItem('browsingPageId',val)
    },
    closeBrowsingPopUps(){
      this.browsingPopUpsFlag = false
    }
  }
}
</script>

<style lang="less" scoped>
.financeSportsMeeting_content{
  background: url('~@/assets/images/financeSportsMeeting/big_bg_2.png') no-repeat;
  background-size: 100% 100%;
  height: 2790px;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 300px 0 0 0;
  box-sizing: border-box;
  .venue_wrap{
    position: relative;
  }
  .landscapePrompt{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 38.4px;
    color: #FFF8D0;
    display: flex;
    align-items: center;
    justify-content: center;
    width:611.81px;;
    background: rgba(0, 0, 0, .7);
    border-radius: 50px;
    letter-spacing: 4px;
    img{
      width: 94px;
      height: 92px;
      margin-right: 20px;
      margin-top:-5px
    }
  }
}
</style>