<template>
  <div class="transaction-result">
    <div class="result-form">
      <span>受理成功</span>
    </div>
    <!-- <div class="title">提交审核，以审核结果为准</div> -->
    <div class="partition"></div>
    <ul>
      <li>
        <span class="leftTitle">产品名称</span>
        <span v-if="rightsType == 'T3Rights'" class="rightContent">
          T3出行打车券包
        </span>
        <span v-else-if="rightsType == 'yhRights'" class="rightContent">
          永辉20元红包礼包
        </span>
      </li>
      <li>
        <span class="leftTitle">支付方式</span>
        <span v-if="modePayment == 'hf'" class="rightContent"> 话费支付 </span>
        <span v-if="modePayment == 'xj'" class="rightContent"> 现金支付 </span>
      </li>
      <li>
        <span class="leftTitle">生效时间</span>
        <span class="rightContent"> 立即生效 </span>
      </li>
      <li>
        <span class="leftTitle">服务状态</span>
        <span class="rightContent"> 以实际结果为准 </span>
      </li>
    </ul>
    <div class="bottom-btn">
      <div
        class="btn_1"
        @click="$router.push(`/flexibleBilling/${rightsType}`)"
      >
        返回首页
      </div>
      <div
        class="btn"
        @click="$router.push(`/flexibleBilling/${rightsType}/myRights`)"
      >
        查看权益
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionResult",
  data() {
    return {
        modePayment:''
    };
  },
  inject: ["rightsType"],
  watch: {
    $route: {
      handler(val) {
        console.log(val);
        this.modePayment = val.query.modePayment
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
.transaction-result {
  height: 100vh;
  background-color: #f0f4fa;
  overflow-y: auto;
  font-family: SourceHanSansCN-Medium;
  padding: 0 41px 0 49px;
  .result-form {
    position: relative;
    width: 466.16px;
    height: 324px;
    background: url("~@/assets/images/flexibleBilling/result-form-bg.png")
      no-repeat;
    background-size: 100% 100%;
    margin: 49px auto 0;
    span {
      position: absolute;
      left: 50%;
      bottom: -10px;
      transform: translateX(-55%);
      font-weight: 500;
      font-size: 45px;
      color: #333333;
      letter-spacing: -1.59px;
    }
  }
  .title {
    margin-top: 27px;
    text-align: center;
    font-weight: 400;
    font-size: 30px;
    color: #999999;
    letter-spacing: -1.06px;
  }
  .partition {
    margin-top: 71px;
    width: 660px;
    height: 1px;
    border: 1px solid #c6c6c6;
  }
  ul {
    margin-top: 50px;
    font-size: 28px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    font-size: 26px;
    color: #999999;
    letter-spacing: 0;
    li {
      display: flex;
      margin: 30px;
      vertical-align: middle;
      .leftTitle {
        width: 25%;
      }
      .rightContent {
        width: 75%;
        text-align: right;
        color: #666666;
      }
    }
  }
  .bottom-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 343px;
    font-family: SourceHanSansCN-Medium;
    font-size: 32px;
    text-align: center;
    .btn_1 {
      width: 330px;
      height: 90px;
      border: 1px solid #979797;
      border-radius: 10px;
      line-height: 90px;
      font-weight: 400;
      color: #666666;
      letter-spacing: -1.13px;
    }
    .btn {
      width: 335px;
      height: 90px;
      margin-left: 25px;
      background: #ff8722;
      border-radius: 10px;
      line-height: 90px;
      font-weight: 500;
      color: #ffffff;
      letter-spacing: -1.13px;
    }
  }
}
</style>