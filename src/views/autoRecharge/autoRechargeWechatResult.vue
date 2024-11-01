<template>
  <div class="weChartTerminationOfContract_container">
    <!-- 查询中 -->
    <div class="loading_container top_center" v-if="signSts === '00'">
      <img class="loadingImg" src="@/assets/images/autoRecharge/loading_new.png" alt="" srcset=""/>
      <p>{{type === 'terminationOfContract' ? '解约中':'签约中'}}</p>
      <div @click="clickToSearch" class="search_btn">{{type === 'terminationOfContract' ? '查询解约结果':'查询签约结果'}}</div>
    </div>

    <!-- 成功 -->
    <div v-if="signSts !== '00' && dealSts == 'SUCCESS'" class="success_container top_center"></div>

    <!-- 失败 -->
    <div v-if="dealSts == 'FAIL'" class="error_container top_center"></div>

    <!-- 状态查询 -->
    <div class="status_container" v-if="signSts !== '00' && dealSts !== ''">
      <div class="status_text">
        <span>微信易充值续费</span>
        <span v-if="type === 'terminationOfContract'" :style="signSts === '02'? 'color:#07AB23' : 'color:#FC821D'">{{ signSts === '02' ? '解约成功' : '解约失败'}}</span>
        <span v-else :style="signSts == '01'? 'color:#07AB23' : 'color:#FC821D'">{{ signSts == '01' ? '签约成功' : '签约失败'}}</span>
      </div>
       <div class="status_text">
        <span>话费易充值业务</span>
        <span v-if="type === 'terminationOfContract'" :style="dealSts === 'SUCCESS' ? 'color:#07AB23' : 'color:#FC821D'">{{ dealSts === 'SUCCESS' ? '关闭成功' : '关闭失败'}}</span>
        <span v-else :style="dealSts === 'SUCCESS' ? 'color:#07AB23' : 'color:#FC821D'">{{dealSts === 'SUCCESS' ? '开通成功' : '开通失败'}}</span>
      </div>
    </div>
    <!-- 失败原因 -->
    <div class="err_mag_container" v-if='dealMsg'>
      <p>失败原因</p>
      <span>{{dealMsg}}</span>
    </div>

    <!-- 返回按钮 -->
    <div v-if="dealSts" class="footer_container">
      <div class="prompt_container" v-if="dealSts == 'FAIL' && signSts">
        <img src="../../assets/images/autoRecharge/exclamationMark_icon.png" alt="">
           <span v-if="type === 'terminationOfContract'">您可以返回首页重新办理解约！</span>
           <span v-else>您可以返回首页重新办理签约！</span>
      </div>
      <div class="prompt_container" v-if="dealSts == 'SUCCESS' && !signSts">
        <img src="../../assets/images/autoRecharge/exclamationMark_icon.png" alt="">
            您可以进入微信APP-我的-服务-钱包-支付设置-自动续费中，主动关闭话费易充值的自动续费授权。
      </div>
      <div class="back_url" @click="backToTheBeginning">
        返回首页
      </div>

    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';

export default {
    data() {
        return {
            type: '', // 签解约类型
            weChatSignJrnNo: '',
            count: 0,
            signSts: '00', // 签约状态 00签约中 01 已签约
            dealSts: '', // FAIL SUCCESS
            dealMsg: '', // 办理失败原因
            mobile: store2.default.get('usrmob')
        };
    },
    mounted() {
        this.type = this.$route.query.type;
        window.sessionStorage.setItem('whetherToSignAContractOnWechat', 'false');

        if (this.type === 'terminationOfContract') {
            const timer = setTimeout(() => {
                clearTimeout(timer);
                this.getwalletEpayQuery();
            }, 2000);
        } else {
            const timer = setTimeout(() => {
                clearTimeout(timer);
                this.wechatSignUserQuery();
            }, 4000);
        }
    },
    methods: {
        // 查询易充值关系
        async  getwalletEpayQuery() {
            const res = await api.autoRecharge.walletEpayQuery({ userid: this.mobile });
            const res2 = await api.autoRecharge.wechatSignUserQuery();
            // 微信签约查询判断
            if (!res2.signJrnNo) {
                this.signSts = '02';
            } else {
                this.signSts = '';
                this.dealMsg = '您可以返回首页重新办理签约！新办理签约！';
            }
            // 易充值值办理查询判断
            if (!res.cardno) {
                this.dealSts = 'SUCCESS';
            } else {
                this.dealSts = 'FAIL';
                this.dealMsg = '您可以返回首页重新办理签约！新办理签约！';
            }
        },
        // 点击查询结果
        clickToSearch() {
            if (this.type === 'terminationOfContract') {
                this.getwalletEpayQuery();
            } else {
                this.queryState();
            }
        },
        // 微信签约signJrnNo
        wechatSignUserQuery() {
            api.autoRecharge.wechatSignUserQuery().then((res) => {
                this.weChatSignJrnNo = res.signJrnNo; // 解约需要的流水号
                this.queryState();
            });
        },
        // 查询状态
        queryState() {
            api.autoRecharge.wechatSignStsQuery({ signJrnNo: this.weChatSignJrnNo }).then((res) => {
                if (res.signSts && res.dealSts) {
                    this.signSts = res.signSts;
                    this.dealSts = res.dealSts;
                    this.dealMsg = res.dealMsg;
                } else {
                    this.queryStateLoop();
                }
            }).catch((err) => {
                // this.signSts = '02';
                // this.dealSts = 'FAIL';
                // this.dealMsg = '无有效的签约信息';
                const timer = setTimeout(() => {
                    clearTimeout(timer);
                    this.wechatSignUserQuery();
                }, 5000);
            });
        },
        // 每5秒查询一次，查询6次
        queryStateLoop() {
            const timer = setTimeout(() => {
                this.count += 1;
                clearTimeout(timer);
                if (this.count >= 7) {
                    this.signSts = '02';
                    this.dealSts = 'FAIL';
                    this.dealMsg = '系统繁忙，请稍后再试！';
                } else {
                    this.queryState();
                }
            }, 5000);
        },
        backToTheBeginning() {
            const url = `https://fintech.12580life.com${process.env.BASE_URL}autoRecharge`;
            window.location.replace(url);
        }
    }
};
</script>

<style lang="less" scoped>
.weChartTerminationOfContract_container {
  width: 100%;
  height: 100vh;
  background: #f7f7f7;
  padding-top: 100px;
  .top_center {
    margin: 0 auto;
  }
  .loading_container {
    background: url("../../assets/images/autoRecharge/loading.png") no-repeat
      center center;
    background-size: 100% 100%;
    width: 265px;
    height: 160px;
    text-align: center;
    position: relative;
    p {
      margin: 95px 0 170px;
      font-size: 36px;
      font-weight: 500;
    }
    .search_btn {
      width: 500px;
      height: 80px;
      line-height: 80px;
      background: #5c8dff;
      border-radius: 50px;
      color: #fff;
      font-size: 30px;
      font-weight: 500;
      position: absolute;
      top: 570px;
      left: 50%;
      transform: translate(-50%);
    }
    .loadingImg {
      animation-name: rotate;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      width: 160px;
      height: 160px;
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .success_container {
    background: url("../../assets/images/autoRecharge/relieve_icon.png")
      no-repeat center center;
    background-size: 100% 100%;
    width: 410px;
    height: 265px;
  }
  .error_container{
    background: url("../../assets/images/autoRecharge/error_icon.png")
      no-repeat center center;
    background-size: 100% 100%;
    width: 410px;
    height: 265px;
  }
  .status_container{
    margin: 0 auto;
    width: 60%;
    margin-top: 53px;
    font-size: 36px;
    .status_text{
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      span:nth-of-type(2){
        font-weight: bold;
      }
    }
    .status_text + .status_text{
      border-top: 1px dashed #999;
    }
  }
  .err_mag_container{
    margin: 0 auto;
    width: 90%;
    margin-top: 75px;
    font-size: 32px;
    background: #fff;
    text-align: center;
    padding: 18px 42px 27px;
    box-sizing: border-box;
    border-radius: 12px;
    line-height: 1.5;
    span{
      text-align: center;
      font-size: 28px;
      color: #999;
      display: block;
    }
  }
  .prompt_container{
   font-size: 28px;
   color: #999999;
   display: flex;
   align-content: center;
   justify-content: center;
   line-height: 1.5;
  //  width: 100%;
   padding: 20px 60px;
  //  position: absolute;
  //   top: 950px;
  //   left: 50%;
  //   transform: translate(-50%);
    img{
      width: 32px;
      height: 32px;
      margin-right: 18px;
    }
  }
  .footer_container{
    position: absolute;
    top: 1000px;
    left: 50%;
    transform: translate(-50%);
    width: 100%;
  }
  .back_url{
    width: 520px;
    height: 80px;
    line-height: 80px;
    background: #5c8dff;
    border-radius: 50px;
    color: #fff;
    font-size: 33px;
    font-weight: 500;
    margin: 0 auto;
    text-align: center;

  }
}
</style>
