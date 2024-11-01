<template>
  <div class="my-prize">
    <div class="my-prize-content">
      <div class="my-prize-title"  v-if="dataList.length > 0">
        <div v-for="item in title" :key="item">
          {{item}}
        </div>
      </div>
      <div class="my-prize-data" v-if="dataList.length > 0">
        <div v-for="(item,index) in dataList" :key="index" class="item_data">
          <div>{{item.ordDate}}</div>
          <div>{{item.ordAmt}}</div>
          <div style="color: #EE7431">已发放</div>
        </div>
      </div>
      <div class="not-data" v-else>
        <p>您还未参与抽奖，这里没有奖品哦～</p>
        <p>参与浏览达标即得抽奖机会！</p>
      </div>
      <div class="foot-btn" @click="$emit('update:myPrizeFlag', false)"></div>
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls.js'
export default {
  props:['myPrizeFlag'],
  data() {
    return {
      title:['时间','奖品','状态'],
      dataList:[]
    }
  },
  created() {
    this.query()
  },
  methods: {
    query(){
      api.financeSportsMeeting.getPrizeInfoList().then(res => {
        res.prizeTjnInfo.forEach(item => {
          item.ordDate = item.ordDate.slice(0,4) + '-' + item.ordDate.slice(5,7) + '-' + item.ordDate.slice(8,10)
        })
        this.dataList = res.prizeTjnInfo
        if(this.dataList.length > 0) {
          this.dataList.forEach(data => {
            if(data.ordTye == '08' ) {
              data.ordAmt = Number(data.ordAmt.slice(0,-1)) + '个E豆'
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .my-prize{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    .my-prize-content{
      background: url('~@/assets/images/financeSportsMeeting/myPrize_bg.png') no-repeat;
      background-size: 100% 100%;
      width: 602px;
      height: 752px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 262px 18px 55px 30px;
      box-sizing: border-box;
      color: #000;
      .my-prize-title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        div+div{
          width: 30%;
        }
        div{
          width: 35%;
          text-align: center;
          background-image: linear-gradient(0deg, #ffffff 0%, #dcf7fe 100%);
          color: #176b89;
          font-size: 30px;
          height: 50px;
          line-height: 50px;
          border-radius: 8px;
          font-weight: bold;
        }
      }
      .my-prize-data{
        height: 240px;
        overflow-y: auto;
        margin-bottom: 10px;
        .item_data{
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          div+div{
            width: 30%;
          }
          div{
            width: 35%;
            text-align: center;
            font-size: 30px;
            height: 50px;
            line-height: 50px;
          }
        }
      }
      .not-data{
        height: 260px;
        text-align: center;
        font-size: 30px;
        padding-top: 40px;
        line-height: 2;
        font-weight: 500;
      }
      .foot-btn{
        background: url('~@/assets/images/financeSportsMeeting/myPrize_ok.png') no-repeat;
        background-size: 100% 100%;
        width: 360px;
        height: 128px;
        margin: auto;
      }
    }
  }
</style>