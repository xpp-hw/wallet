<template>
  <div class="footballStadium">
    <div class="body" :class="financeSportsMeeting.activityList[3].status == '0' ? 'open_bg' : 'close_bg'">
       <div class="title_wrap" v-if="financeSportsMeeting.activityList[3].actMainTitle">
        <div class="title" :class="{'closeTitle': financeSportsMeeting.activityList[3].status == '1'}">{{financeSportsMeeting.activityList[3].actMainTitle}}</div>
        <div class="subscript ellipsis" :class="{'closeSubscript': financeSportsMeeting.activityList[3].status == '1'}">{{financeSportsMeeting.activityList[3].actSubTitle}}</div>
      </div>
      <template v-if="financeSportsMeeting.activityList[3].status == '0'">
        <div class="football_icon"></div>
        <div class="goBrowse_btn" @click="goBrowse">
          <div class="btn_subscript" v-if="financeSportsMeeting.activityList[3].toBeViewed > 0">
            待浏览{{financeSportsMeeting.activityList[3].toBeViewed}}个
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
      this.$emit('goBrowse',this.financeSportsMeeting.activityList[3].activityId)
    }
  }
}
</script>

<style lang="less" scoped>
  .footballStadium{
    position: absolute;
    right: 0;
    top: 1200px;
    .body{
      position: relative;
      .title_wrap{
        position: absolute;
        top: 42px;
        right: 47px;
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
        top: 165px;
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
        top: 165px;
        right: 70px;
      }
      .football_icon{
        background: url('~@/assets/images/financeSportsMeeting/football_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 282px;
        height: 302px;
        position: absolute;
        bottom: 0;
        left: 0;
        animation: run 2s linear infinite;
      }
      @keyframes run {
        0% {
          transform: translate(0, 0);
          opacity: 1;
        }
        80%{
          opacity: 1;
        }
        100% {
          transform: translate(160px, -200px);
          // opacity: .3;
          width: 188px;
          height: 201px;
        }
      }
    }
    .open_bg{
      background: url('~@/assets/images/financeSportsMeeting/footballStadium_open.png') no-repeat;
      background-size: 100% 100%;
      width: 551px;
      height: 714px;
    }
    .close_bg{
      background: url('~@/assets/images/financeSportsMeeting/footballStadium_close.png') no-repeat;
      background-size: 100% 100%;
      width: 551px;
      height: 714px;
    }
  }
</style>