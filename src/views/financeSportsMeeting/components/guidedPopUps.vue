<template>
  <div class="guidedPopUps">
    <div class="step1_warp" v-if='show == 1 && step == 1'>
      <div class="title_wrap1" v-if="financeSportsMeeting.activityList[0].actMainTitle">
        <div class="step_title1">{{financeSportsMeeting.activityList[0].actMainTitle}}</div>
        <div class="step_subscript1 ellipsis" :style="{'font-size':financeSportsMeeting.activityList[0].actSubTitle.length > 10 ? 2.7/financeSportsMeeting.activityList[0].actSubTitle.length+'rem' : ''}">{{financeSportsMeeting.activityList[0].actSubTitle}}</div>
      </div>
      <div class="step1_btn">
        <span @click="close">跳过</span>
        <span @click="next(2)">下一站</span>
      </div>
    </div>
    <div class="step2_warp" v-if="show == 2 && step == 2">
      <div class="title_wrap2" v-if="financeSportsMeeting.activityList[1].actMainTitle">
        <div class="step_title2">{{financeSportsMeeting.activityList[1].actMainTitle}}</div>
        <div class="step_subscript2 ellipsis" :style="{'font-size':financeSportsMeeting.activityList[1].actSubTitle.length > 10 ? 2.7/financeSportsMeeting.activityList[1].actSubTitle.length+'rem' : ''}">{{financeSportsMeeting.activityList[1].actSubTitle}}</div>
      </div>
      <div class="step2_btn">
        <span @click="close">跳过</span>
        <span @click="next(3)">下一站</span>
      </div>
    </div>
    <div class="step3_warp" v-if="show == 3 && step == 3">
      <div class="title_wrap3" v-if="financeSportsMeeting.activityList[2].actMainTitle">
        <div class="step_title3">{{financeSportsMeeting.activityList[2].actMainTitle}}</div>
        <div class="step_subscript3 ellipsis" :style="{'font-size':financeSportsMeeting.activityList[2].actSubTitle.length > 10 ? 2.7/financeSportsMeeting.activityList[2].actSubTitle.length+'rem' : ''}">{{financeSportsMeeting.activityList[2].actSubTitle}}</div>
      </div>
      <div class="step3_btn">
        <span @click="close">跳过</span>
        <span @click="next(4)">下一站</span>
      </div>
    </div>
     <div class="step4_warp" v-if="show == 4 && step == 4">
      <div class="title_wrap4" v-if="financeSportsMeeting.activityList[3].actMainTitle">
        <div class="step_title4">{{financeSportsMeeting.activityList[3].actMainTitle}}</div>
        <div class="step_subscript4 ellipsis" :style="{'font-size':financeSportsMeeting.activityList[3].actSubTitle.length > 10 ? 2.7/financeSportsMeeting.activityList[3].actSubTitle.length+'rem' : ''}">{{financeSportsMeeting.activityList[3].actSubTitle}}</div>
      </div>
       <div class="step4_btn">
        <!-- <span @click="close">跳过</span> -->
        <span @click="close">完成</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:['guidedPopUpsFlag'],
  computed: {
    ...mapState(['financeSportsMeeting'])
  },
  data(){
    return{
      step:1,
      show:1,
    }
  },
  created(){
  },
  mounted(){
   
  },
  watch:{
    'step':{
      handler(){
        this.$nextTick(()=>{
          if(this.step==1){
            document.querySelector('.lottery_wrap').scrollIntoView({ behavior: 'smooth' });
            setTimeout(()=>{
              this.show = 1;
            },500)
          }else if(this.step==2){
            document.querySelector('.basketballFactory').scrollIntoView({ behavior: 'smooth' });
            setTimeout(()=>{
              this.show = 2;
            },500)
          }else if(this.step==3){
            document.querySelector('.paymentCenter').scrollIntoView({ behavior: 'smooth' });
            setTimeout(()=>{
              this.show = 3;
            },500)
          }else if(this.step==4){
            document.querySelector('.creditCardHouse').scrollIntoView({ behavior: 'smooth' });
            setTimeout(()=>{
              this.show = 4;
            },500)
          }
        })
      },
      immediate:true
    }
  },
  methods:{
    next(val){
      this.step = val;
    },
    close(){
       this.$emit('update:guidedPopUpsFlag',false)
    }
  }
}
</script>

<style lang="less" scoped>
  .guidedPopUps{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    .step1_warp{
      width: 720px;
      height: 595px;
      background: url('~@/assets/images/financeSportsMeeting/step1.png') no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      left: -22px;
      top: 464px;
      box-sizing: border-box;
      .title_wrap1{
        position: absolute;
        top: 46px;
        right: 157px;
        width: 250px;
        .step_title1{
          font-size: 36px;
          font-weight: bold;
          color: #c13001;
          text-align: center;
          border-radius: 20px;
        }
        .step_subscript1{
          font-size: 27px;
          background: #ffe6f5;
          text-align: center;
          border-radius: 20px;
          color: #b23e07;
          font-weight: 500;
          padding: 4px 0;
          margin-top: 13px;
        }
      }
      .step1_btn{
        color: #fff;
        font-size: 34px;
        margin-top: 695px;
        margin-left: 60px;
        text-align: center;
        span:nth-of-type(1){
          padding: 8px 25px;
          border-radius: 30.15px 30.15px 30.15px 30.15px;
          border: 1px solid;
          margin-right: 50px;
        }
        span:nth-of-type(2){
          padding: 8px 25px;
          border-radius: 30.15px 30.15px 30.15px 30.15px;
          background: #ffffff;
          color: #000;
          font-weight: 500;
        }
      }
    }
    .step2_warp{
      width: 750px;
      height: 740px;
      background: url('~@/assets/images/financeSportsMeeting/step2.png') no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 268px;
      box-sizing: border-box;
      .title_wrap2{
        position: absolute;
        top: 96px;
        right: 50px;
        width: 250px;
        .step_title2{
          font-size: 36px;
          font-weight: bold;
          color: #c13001;
          text-align: center;
          border-radius: 20px;
        }
        .step_subscript2{
          font-size: 27px;
          background: #ffe6f5;
          text-align: center;
          border-radius: 20px;
          color: #b23e07;
          font-weight: 500;
          padding: 4px 0;
          margin-top: 13px;
        }
      }
      .step2_btn{
        color: #fff;
        font-size: 34px;
        margin-top: 855px;
        margin-left: 30px;
        text-align: center;
        span:nth-of-type(1){
          padding: 8px 25px;
          border-radius: 30.15px 30.15px 30.15px 30.15px;
          border: 1px solid;
          margin-right: 50px;
        }
        span:nth-of-type(2){
          padding: 8px 25px;
          border-radius: 30.15px 30.15px 30.15px 30.15px;
          background: #ffffff;
          color: #000;
          font-weight: 500;
        }
      }
    }
    .step3_warp{
      width: 704px;
      height: 676px;
      background: url('~@/assets/images/financeSportsMeeting/step3.png') no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      left: 10px;
      top: 395px;
      box-sizing: border-box;
      .title_wrap3{
        position: absolute;
        top: 46px;
        left: 37px;
        width: 260px;
        .step_title3{
          font-size: 36px;
          font-weight: bold;
          color: #c13001;
          text-align: center;
          border-radius: 20px;
        }
        .step_subscript3{
          font-size: 27px;
          background: #ffe6f5;
          text-align: center;
          border-radius: 20px;
          color: #b23e07;
          font-weight: 500;
          padding: 4px 0;
          margin-top: 13px;
        }
      }
      .step3_btn{
        color: #fff;
        font-size: 34px;
        margin-top: 755px;
        margin-left: 30px;
        text-align: center;
        span:nth-of-type(1){
          padding: 8px 25px;
          border-radius: 30.15px 30.15px 30.15px 30.15px;
          border: 1px solid;
          margin-right: 50px;
        }
        span:nth-of-type(2){
          padding: 8px 25px;
          border-radius: 30.15px 30.15px 30.15px 30.15px;
          background: #ffffff;
          color: #000;
          font-weight: 500;
        }
      }
    }
    .step4_warp{
      width: 571px;
      height: 538px;
      background: url('~@/assets/images/financeSportsMeeting/step4.png') no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      right: 30px;
      bottom: 310px;
      box-sizing: border-box;
      .title_wrap4{
        position: absolute;
        top: 47px;
        right: 20px;
        width: 250px;
        .step_title4{
          font-size: 36px;
          font-weight: bold;
          color: #c13001;
          text-align: center;
          border-radius: 20px;
        }
        .step_subscript4{
          font-size: 27px;
          background: #ffe6f5;
          text-align: center;
          border-radius: 20px;
          color: #b23e07;
          font-weight: 500;
          padding: 4px 0;
          margin-top: 13px;
        }
      }
      .step4_btn{
        color: #fff;
        font-size: 34px;
        margin-top: 600px;
        margin-right: 80px;
        text-align: center;
        span:nth-of-type(1){
          padding: 8px 25px;
          border-radius: 30.15px 30.15px 30.15px 30.15px;
          background: #ffffff;
          color: #000;
          font-weight: 500;
        }
      }
    }
  }
</style>