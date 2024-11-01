<template>
  <div class="paymentCenter">
    <div class="body" :class="financeSportsMeeting.activityList[1].status == '0' ? 'open_bg' : 'close_bg'">
      <div class="title_wrap" v-if="financeSportsMeeting.activityList[1].actMainTitle">
        <div class="title" :class="{'closeTitle': financeSportsMeeting.activityList[1].status == '1'}">{{financeSportsMeeting.activityList[1].actMainTitle}}</div>
        <div class="subscript ellipsis" :class="{'closeSubscript': financeSportsMeeting.activityList[1].status == '1'}">{{financeSportsMeeting.activityList[1].actSubTitle}}</div>
      </div>
      <template v-if="financeSportsMeeting.activityList[1].status == '0'">
        <div class="goBrowse_btn" @click="goBrowse">
          <div class="btn_subscript" v-if="financeSportsMeeting.activityList[1].toBeViewed > 0">
            待浏览{{financeSportsMeeting.activityList[1].toBeViewed}}个
          </div>
        </div>
      </template>
      <template v-else>
        <div class="toBeOpened_btn"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['financeSportsMeeting'])
  },
  methods:{
    goBrowse(){
      this.$emit('goBrowse',this.financeSportsMeeting.activityList[1].activityId)
    },
  }
}
</script>

<style lang="less" scoped>
  .paymentCenter{
    position: absolute;
    right: 0;
    top: 300px;
    .body{
      position: relative;
      .title_wrap{
        position: absolute;
        top: 50px;
        right: 46px;
        width: 250px;
        .title{
          font-size: 36px;
          font-weight: bold;
          color: #c13001;
          text-align: center;
          border-radius: 20px;
        }
        .subscript{
          font-size: 27px;
          background: #ffe6f5;
          text-align: center;
          border-radius: 20px;
          color: #b23e07;
          font-weight: 500;
          padding: 4px 0;
          margin-top: 13px;
        }
        .closeTitle{
          color: #e99e88;
        }
        .closeSubscript{
          background: #fff2f9;
          color: #e1a58a;
        }
      }
      .goBrowse_btn{
        background: url('~@/assets/images/financeSportsMeeting/goBrowse_btn.png') no-repeat;
        background-size: 100% 100%;
        width: 207px;
        height: 72px;
        position: absolute;
        top: 170px;
        right: 70px;
        .btn_subscript{
          position: absolute;
          top: -15px;
          right: -20px;
          font-size: 18px;
          background: #f94300;
          color: #fff;
          border-radius: 20px 20px 20px 0;
          height: 33px;
          line-height: 33px;
          border: 2px solid #fff;
          padding: 0 10px;
          font-weight: 500;
        }
      }
      .toBeOpened_btn{
        background: url('~@/assets/images/financeSportsMeeting/toBeOpened_btn.png') no-repeat;
        background-size: 100% 100%;
        width: 207px;
        height: 72px;
        position: absolute;
        top: 170px;
        right: 70px;
      }
    }
    .open_bg{
      background: url('~@/assets/images/financeSportsMeeting/paymentCenter_open.png') no-repeat;
      background-size: 100% 100%;
      width: 400px;
      height: 714px;
    }
    .close_bg{
      background: url('~@/assets/images/financeSportsMeeting/paymentCenter_close.png') no-repeat;
      background-size: 100% 100%;
      width: 400px;
      height: 714px;
    }
  }
</style>