<template>
  <div class="browsingPopUps">
    <div class="sign">
      <div class="content">
        <!-- 向左翻页 -->
        <div class="towardsTheLeft" @click="towardsTheLeftClick">
          <img v-if="current == 1" src="@/assets/images/financeSportsMeeting/towardsTheLeft_close_icon.png" alt="">
          <img v-else src="@/assets/images/financeSportsMeeting/towardsTheLeft_open_icon.png" alt="">
          <p v-if="current != 1">上一站</p>
        </div>
        <!-- 书籍 -->
        <div class="secretary secretary_none" v-if="info.status == '1' ">
          <div class="secretary_title">
            <span v-if="(!flowTotal_E && !flowTotal) || flowTotal">
              HI，你累计抽中<span style="color:#EE621D">{{flowTotal}}MB</span>流量
              <span v-if="flowTotal_E">、<span style="color:#EE621D">{{flowTotal_E}}</span>个E豆</span>
            </span>
            <span v-if="flowTotal_E && !flowTotal">HI，你累计抽中<span style="color:#EE621D">{{flowTotal_E}}</span>个E豆</span>
            <span class="last2">抽奖机会{{financeSportsMeeting.lotteryNumData.availLotteryNum}}次</span>
            <span class="last3" @click="close">回主页抽奖</span>
          </div>
          <div class="secretary_body">
            <img v-if="rightFlippingFlag" class="toTheRight_flipping" src="@/assets/images/financeSportsMeeting/toTheRight_flipping.gif" alt="">
            <img v-if='leftFlippingFlag' class="towardsTheLeft_flipping" src="@/assets/images/financeSportsMeeting/towardsTheLeft_flipping.gif" alt="">
          </div>
        </div>
        <div class="secretary" v-else>
          <div class="secretary_title">
            <span v-if="(!flowTotal_E && !flowTotal) || flowTotal">
              HI，你累计抽中<span style="color:#EE621D">{{flowTotal}}MB</span>流量
              <span v-if="flowTotal_E">、<span style="color:#EE621D">{{flowTotal_E}}</span>个E豆</span>
            </span>
            <span v-if="flowTotal_E && !flowTotal">HI，你累计抽中<span style="color:#EE621D">{{flowTotal_E}}</span>个E豆</span>
            <span class="last2">抽奖机会{{financeSportsMeeting.lotteryNumData.availLotteryNum}}次</span>
            <span class="last3" @click="close">回主页抽奖</span>
          </div>
          <div class="secretary_body">
            <img v-if="rightFlippingFlag" class="toTheRight_flipping" src="@/assets/images/financeSportsMeeting/toTheRight_flipping.gif" alt="">
            <img v-if='leftFlippingFlag' class="towardsTheLeft_flipping" src="@/assets/images/financeSportsMeeting/towardsTheLeft_flipping.gif" alt="">
            <!-- 左侧活动 -->
            <div class="activityTags">
              <div class="activity_text">待浏览<span >{{ taskNum }} </span>个</div>
              <div v-for="(item,index) in info.activityTaskInf" :class="item.class" class="activity_banner" :key="index">
                <div class="item_title">
                  <p :style="{'font-size':item.tmainTitle.length > 10 ? 2.7/item.tmainTitle.length+'rem' : ''}">{{item.tmainTitle}}</p>
                  <p>{{item.tsubTitle}}</p>
                </div>
                <div @click="browseClick(item)" class="item_btn" :class="item.taskSts == '1' ? 'canBrowse' : 'ntCanBrowse'">
                  {{item.taskSts == '1' ? '去浏览' : '已浏览'}}
                </div>
              </div>
            </div>
            <!-- 书钉 -->
            <div class="bookStaples"></div>
            <!-- 书籍介绍 -->
            <div class="activityIntroduction">
              <div class="digitalPositioning">{{ info.activityTaskInf.length }}</div>
              <img :src="require('@/assets/images/financeSportsMeeting/activityIntroduction_img'+ activityId +'.png') " alt="">
            </div>
          </div>
        </div>
        <!-- 向右翻页 -->
        <div class="toTheRight" @click="toTheRightClick">
          <img v-if="current == total" src="@/assets/images/financeSportsMeeting/towardsTheLeft_close_icon.png" alt="">
          <img v-else src="@/assets/images/financeSportsMeeting/towardsTheLeft_open_icon.png" alt="">
          <p v-if="current != total">下一站</p>
        </div>
      </div>
      <div class="pageNumber_warp">
        <div class="pageNumber_strip">
          <div v-for="item in total" class="item_block" :style="{width:100 / total + '%'}" :key="item" :class="{checkBlock:item == current}"></div>
        </div>
        <div class="pageNumber_block">
          {{current}}/{{total}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="@/common/jquery.min.js"></script>
<script type="text/javascript" src="@/common/turn.js"></script>
<script>
import { mapState } from 'vuex'
import api from '@/common/apiUrls.js'
export default {
  props:['browsingPageNumber'],
  computed: {
    ...mapState(['financeSportsMeeting'])
  },
  data(){
    return {
      rightFlippingFlag:false,
      leftFlippingFlag:false,
      total:4,
      current:1,//当前页码
      activityId:1,//选中id
      info:{
        activityTaskInf:[]
      },//选中对象
      taskNum:0,//可浏览任务数
      currentList:[],
      flowTotal:0,
      flowTotal_E:0,
    }
  },
  mounted() {
    let data = JSON.parse(JSON.stringify(this.financeSportsMeeting.activityList))
    // let financeSportsMeetingCopy = data.filter(item => item.status == '0')
    let financeSportsMeetingCopy = data.filter(item => item.status)
    this.total = financeSportsMeetingCopy.length
    //获取以启用活动id，到对应集合里
    this.financeSportsMeeting.activityList.forEach(item => {
      if(item.status){
        this.currentList.push(item.activityId)
      }
    })
    this.activityId = this.browsingPageNumber
    this.current = this.currentList.indexOf(this.browsingPageNumber) + 1
    this.setInfo(this.browsingPageNumber)
    this.queryMyPrize()
  },
  methods:{
    //去浏览
    browseClick(item){
      if(item.taskSts == '1'){
        if(item.jumpLink.includes('?')){
          window.location.href = item.jumpLink + '&financeActivity=1&activityConfId='+ this.info.activityConfId + '&taskId=' + item.taskId
        }else{
          window.location.href = item.jumpLink + '?financeActivity=1&activityConfId='+ this.info.activityConfId + '&taskId=' + item.taskId
        }
      }else{
        return
      }
    },
    //匹配对应活动的任务和可浏览任务格式
    setInfo(id){
      console.log(this.financeSportsMeeting,'000')
      this.info = this.financeSportsMeeting.activityList.find(item => item.activityId == id)
      this.taskNum = this.info.activityTaskInf.filter(item => item.taskSts == '1').length 
    },
    // 向左翻页
    towardsTheLeftClick(){
      setTimeout(()=>{
        this.current -- 
        // 最后一页
        if(this.current === 0){
          this.current = 1
        }
        //根据以获得的启用id集合，通过下标获取到对应的多动id
        this.activityId = this.currentList[this.current - 1]
        this.setInfo(this.activityId)
        window.sessionStorage.setItem('browsingPageId', this.activityId)
      },600)
      if(this.current >1){
        this.leftFlipping()
      }
    },
    // 向右翻页
    toTheRightClick(){
      setTimeout(()=>{
        this.current ++
        // 最后一页
        if(this.current > this.total){
          this.current = this.total
        }
        //根据以获得的启用id集合，通过下标获取到对应的多动id
        this.activityId = this.currentList[this.current - 1]
        this.setInfo(this.activityId)
        window.sessionStorage.setItem('browsingPageId', this.activityId)
      },600)
      if(this.current < this.total){
        this.rightFlipping()
      }
    },
    // 向右翻页动画
    rightFlipping(){
      this.rightFlippingFlag = true
      setTimeout(()=>{
        this.rightFlippingFlag = false
      },500)
    },
    // 向左翻页动画
    leftFlipping(){
      this.leftFlippingFlag = true
      setTimeout(()=>{
        this.leftFlippingFlag = false
      },600)
    },
    close(){
      window.sessionStorage.removeItem('browsingPopUpsFlag')
      this.$emit('closeBrowsingPopUps')
    },
    queryMyPrize(){
      api.financeSportsMeeting.getPrizeInfoList().then(res => {
        // ordTye 1:话费 2:流量 3:充值劵 5:权益 6:优惠券 7:优惠券 8:E豆
        let total = 0
        let total_E = 0;
        res.prizeTjnInfo.forEach(item => {
          if(item.ordTye == '02') {
            if(item.ordAmt.replace(/\D/g, "") == '1'){
              total += 1024
            }else{
              total += item.ordAmt.replace(/\D/g, "")*1
            }
          } else if(item.ordTye == '08') {
            total_E += Number(item.ordAmt.slice(0,-1))
          }

        })
        this.dataList = res.prizeTjnInfo
        this.flowTotal = total;
        this.flowTotal_E = total_E;
      })
    }
  }
}
</script>

<style lang="less" scoped>

@media screen  {
  .browsingPopUps {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .7);
    color: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 24px;
  }
  .sign {
    -webkit-transform: rotate(90deg);
    -webkit-transform-origin: 0% 0%; /*1.重置旋转中心*/
    -moz-transform: rotate(90deg);
    -moz-transform-origin: 0% 0%;
    -ms-transform: rotate(90deg);
    -ms-transform-origin: 0% 0%;
    position: absolute;
    transform: rotate(90deg);
    transform-origin: 0% 0%;
    width: 100vh; /*2.利用 vh 重置 ‘宽度’ */
    height: 100vw; /* 3.利用 vw 重置 ‘高度’ */
    top: 0;
    left: 100vw; /* 4.旋转后页面超出屏幕，重置页面定位位置 */
  }
  .content{
    padding-right: 30px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .towardsTheLeft{
      position: absolute;
      left: 40px;
      top: 50%;
      transform: translate(0,-50%);
      width: 88px;
      height: 124px;
      padding: 60px 10px;
      z-index: 1;
      font-size: 24px;
      text-align: center;
      font-weight: bold;
      img{
        width: 100%;
        height: 100%;
        margin-bottom: 10px;
      }
    }
    .secretary_none {
      background: url('~@/assets/images/financeSportsMeeting/secretary_bg_new.png') no-repeat !important;
      //background-size: 100% 100%;
      //width: 1300px;
      //height: 708px;
      //margin: auto;
      //position: relative;
    }
    .secretary{
      background: url('~@/assets/images/financeSportsMeeting/secretary_bg.png') no-repeat;
      background-size: 100% 100% !important;
      width: 1300px;
      height: 708px;
      margin: auto;
      position: relative;
      .secretary_title{
        color: #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 46px 210px 0 230px;
        box-sizing: border-box;
        span:nth-of-type(1){
          flex: 1;
          font-weight: 500;
        }
        .last2{
          display: inline-block;
          width: 197px;
          height: 52px;
          border-radius: 26px;
          background: #f4bd57;
          text-align: center;
          line-height: 52px;
          font-weight: 500;
          color: #fff;
        }
        .last3{
          display: inline-block;
          width: 186px;
          height: 44px;
          border-radius: 26px;
          // 渐变色
          background-image: linear-gradient(to top, #fe692d 20%, #fece7f 100%);
          text-align: center;
          line-height: 44px;
          font-weight: 500;
          color: #fff;
          border: 4px solid #fe9f47;
          margin-left: 10px;
        }
      }
      .secretary_body{
        display: flex;
        justify-content: space-between;
        padding: 35px 97px;
        .activityTags{
          padding: 15px 0 20px 90px;
          width: 500px;
          box-sizing: border-box;
          overflow-y: auto;
          height: 470px;
          .activity_text{
            color: #000;
            text-align: center;
            margin-bottom: 15px;
            font-weight: 500;
            font-size: 24px;
            span{
              color: #EE621D;
              font-size: 26px;
            }
          }
          .activity_banner{
            width: 405px;
            height: 115px;
            padding: 25px 15px 25px 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &+.activity_banner{
              margin-top: 20px;
            }
            .item_title{
              line-height: 1.5;
              font-size: 22px;
              p:nth-of-type(1){
                font-size: 26px;
                font-weight: 800;
              }
            }
            .item_btn{
              width: 98px;
              height: 39px;
              border-radius:20px;
              text-align: center;
              line-height: 39px;
            }
            .canBrowse{
              background: #fefbdb;
              color: #83320F;
            }
            .ntCanBrowse{
              background: #D1D1D1;
              color: #fff;
            }
          }
        }
        .bookStaples{
          position: absolute;
          top: 50%;
          left: 51.5%;
          transform: translate(-50%, -50%);
          background: url('~@/assets/images/financeSportsMeeting/bookStaples_icon.png') no-repeat;
          background-size: 100% 100%;
          width: 92px;
          height: 353px;
          z-index: 1;
        }
        .activityIntroduction{
          position: relative;
          .digitalPositioning{
            position: absolute;
            color: #a93f1e;
            left: 200px;
            bottom: 169px;
            font-size: 27px;
            background: #fefde6;
          }
          img{
            width: 526px;
            height: 495px;
          }
        }
      }
      .toTheRight_flipping{
        position: absolute;
        top: 51%;
        left: 50%;
        width: 1650px;
        height: 770px;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
      .towardsTheLeft_flipping{
        position: absolute;
        top: 51%;
        left: 50%;
        width: 1590px;
        height: 750px;
        transform: translate(-50%, -50%);
        z-index: 2;
      }
    }
    .toTheRight{
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translate(0,-50%);
      width: 88px;
      height: 124px;
      padding: 60px 0;
      z-index: 1;
      font-size: 24px;
      text-align: center;
      font-weight: bold;
      img{
        width: 100%;
        height: 100%;
        transform: rotate(180deg);
        margin-bottom: 10px;
      }
    }
  }
  .pageNumber_warp{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    align-items: center;
    .pageNumber_strip{
      width: 204px;
      height: 22px;
      border-radius: 11px 11px 11px 11px;
      background: #307ae9;
      display: flex;
      margin-right: 20px;
      .item_block{
        width: 25%;
        height: 22px;
      }
      .checkBlock{
        background: #fff;
        border-radius: 11px 11px 11px 11px;
      }
    }
    .pageNumber_block{
      width: 103px;
      height: 38px;
      background: url('~@/assets/images/financeSportsMeeting/pageNumber_block.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 38px;
    }
  }
}

.activity_banner1{
  background: url('~@/assets/images/financeSportsMeeting/banner_1.png') no-repeat;
  background-size: 100% 100%;
}
.activity_banner2{
  background: url('~@/assets/images/financeSportsMeeting/banner_2.png') no-repeat;
  background-size: 100% 100%;
}
.activity_banner3{
  background: url('~@/assets/images/financeSportsMeeting/banner_3.png') no-repeat;
  background-size: 100% 100%;
}
.activity_banner4{
  background: url('~@/assets/images/financeSportsMeeting/banner_4.png') no-repeat;
  background-size: 100% 100%;
}
.activity_banner5{
  background: url('~@/assets/images/financeSportsMeeting/banner_5.png') no-repeat;
  background-size: 100% 100%;
}
.activity_banner6{
  background: url('~@/assets/images/financeSportsMeeting/banner_6.png') no-repeat;
  background-size: 100% 100%;
}

.activity_banner7{
  background: url('~@/assets/images/financeSportsMeeting/banner_7.png') no-repeat;
  background-size: 100% 100%;
}
</style>