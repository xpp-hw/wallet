<template>
  <div class="warp">
    <div class="content">
      <div class="img">
        <img
          v-if="state == 1"
          alt=""
          src="@/assets/images/newRights/true.png"
        />
        <img
          v-if="state == 0"
          alt=""
          src="@/assets/images/newRights/false.png"
        />
      </div>
      <div v-if="state == 1" class="h3">恭喜业务办理成功</div>
      <div v-if="state == 0" class="h3">业务办理失败</div>
      <div v-if="state == 1" class="text">
        <div class="item">
          <div class="left">业务名称：</div>
          <div class="right">移动钱包</div>
        </div>
        <div class="item">
          <div class="left">业务资费：</div>
          <div class="right" style="color: red; font-weight: bold">0元/月</div>
        </div>
        <div class="item">
          <div class="left">业务内容：</div>
          <div class="right">成功开通后，用户可享移动钱包专属权益</div>
        </div>
        <div class="item">
          <div class="left">生效时间：</div>
          <div class="right">立即生效</div>
        </div>
      </div>
      <div v-if="state == 0" class="text">
        <div class="item">
          <div class="left">失败原因：</div>
          <div class="right">{{ msgInfo }}</div>
        </div>
      </div>
      <div v-if="state == 1" class="button" @click="rightsBtnFun()">
        查看权益
      </div>
      <div v-if="state == 0" class="button" @click="rightsBtnFun()">
        返回首页
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'results',
  components: {},
  data() {
    return {
      state: 'fail',
      msgInfo: '',
      isDisabled: false
    };
  },
  mounted() {
    this.state = this.$route.query.state;
    this.msgInfo = this.$route.query.msgInfo;
  },
  methods: {
    rightsBtnFun() {
      let inviterCode = this.$route.query.inviter;
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      var str = "";
      var sum = new Date().getMonth() + 11
      for (let i = 0; i < sum; i++) {
        str += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      this.$router.push({
        name: 'rightsfree',
        query: {
          resState: this.state,
          inviter: inviterCode,
          inviteDate: str
        }
      });
      // window.location.href =
      // "http://localhost:8080/fintech-h5/fortuneCenter/member/rightsfree";
      // this.$router.push("rightsfree");
      // window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html';
    },
  }
};
</script>

<style lang="less" scoped>
.warp {
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;

  .content {
    width: 100%;
    background: url("~@/assets/images/newRights/flow/resultsbg.png") no-repeat;
    background-size: 100% auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .img {
      width: 131px;
      height: 131px;
      margin-top: 49px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .h3 {
      width: 100%;
      font-weight: 900;
      font-size: 46px;
      color: white;
      margin-top: 44px;
      text-align: center;
    }

    .text {
      width: 650px;
      height: 633px;
      margin-top: 55px;
      border-radius: 20px 20px 20px 20px;
      background: rgba(255, 255, 255, 1);
      padding-top: 54px;
      box-sizing: border-box;

      .item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 36px;
        border-bottom: 2px solid #e5e5e5;

        .left {
          width: 212px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9b9a9a;
          padding-left: 33px;
        }

        .right {
          width: 394px;
          color: #404040;
          margin: 30px 0;
          line-height: 50px;
        }
      }

      .item:last-child {
        border-bottom: none;
      }
    }

    .button {
      width: 500px;
      height: 80px;
      margin-top: 38px;
      border-radius: 40px 40px 40px 40px;
      background: rgba(0, 179, 255, 1);
      color: white;
      font-weight: 500;
      font-size: 36px;
      text-align: center;
      line-height: 80px;
    }
  }
}
</style>
