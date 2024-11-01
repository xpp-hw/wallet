<template>
  <div class="authentication">
    <!-- 密码验证 -->
    <passwordPage
      :dataList="lis"
      v-on:childByVal="childByVal"
      v-if="msg == 1"
    ></passwordPage>
    <!-- 身份验证 -->
    <div class="verification" v-if="msg == 2">
      <!-- 进度条 -->
      <!-- <ul class="progressBar">
        <li class="IDverification">
          <img src="../../assets/images/身份验证/身份证验证.png" />
          <span style="color: #0195ff">身份证验证</span>
        </li>
        <li
          class="strip"
          :style="{ background: IsShortMessage ? '#0195ff' : '#cdcdcd' }"
        ></li>
        <li class="shortMessage">
          <img
            :src="
              IsShortMessage
                ? require('../../assets/images/身份验证/短信验证.png')
                : require('../../assets/images/身份验证/短信未验证.png')
            "
          />
          <span :style="{ color: IsShortMessage ? '#0195ff' : '#999999' }"
            >短信验证</span
          >
        </li>
      </ul> -->
      <!-- 输入身份证 -->
      <p class="title">验证身份证号</p>
      <input
        type="text"
        id="Inputkuang"
        @input="InputChange"
        v-model="InputVal"
        placeholder="请输入您的身份证号"
        maxlength="18"
      />
      <!-- 输入验证码 -->
      <!-- <ul class="VerificationCode" v-if="IsShortMessage">
        <li>
          <span>手机号</span>
          <p>{{ phone }}</p>
          <span
            class="obtain"
            :style="{
              background: attcode ? '#e9e9e9' : '#0195ff',
              color: attcode ? '#888888' : 'white',
            }"
            @click="obtain"
            >{{ smsText }}</span
          >
        </li>
        <li class="hr"></li>
        <li>
          <span>验证码</span>
          <input
            type="number"
            id="numCode"
            placeholder="请输入验证码"
            maxlength="6"
            @input="numcode"
            v-model="numVal"
          />
        </li>
      </ul> -->
      <!-- 验证 -->
      <div
        class="btn"
        :style="{ background: isColor ? '#0195ff' : 'rgb(217,217,217)' }"
        @click="compare"
      >
        验证
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mand-mobile";
import api from "@/common/apiUrls";
import * as store2 from "@/common/localstore";
import passwordPage from "../../components/passwordPage.vue";

export default {
  inject: ["reload"],
  components: {
    passwordPage,
  },
  data() {
    return {
      lis: {
        briefVal: "",
        isTitle: "请输入原支付密码",
      },
      msg: this.$route.params.a,
      // IsShortMessage: false, // 下一步
      InputVal: "",
      numVal: "",
      phone: store2.default.get("usrmob"),
      isColor: false,
      smsText: "",
      timer: null,
      attcode: true,
      sec: 61,
    };
  },
  mounted() {
    console.log(this.$route.params.a);
    if (this.$route.params.a == 1) {
      window.document.title = "修改支付密码";
    } else if (this.$route.params.a == 2) {
      window.document.title = "重置支付密码";
    }
  },
  methods: {
    //  重置密码校验
    childByVal(val) {
      store2.default.set("mima", val.mima);
      const title = 2;
      api.paymentApi
        .PaymentPasswordVerification({
          encpwd: val.mima,
          usrid: store2.default.get("usrmob"), // store2.default.get("usrmob");
        })
        .then((data) => {
          console.log(data);
          if (data.code == "RMP0000") {
            this.$router.push({
              path: `/setPassword/${title}`,
            });
          } else {
            Toast.info("原支付密码输入有误，请重新输入");
            this.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    InputChange() {
      if (this.InputVal.length === 18) {
        this.isColor = true;
      }
    },
    compare() {
      console.log("验证操作", this.InputVal, this.phone);
      let title = 3;
      // 支付密码变更信息校验
      api.paymentApi
        .ModifyVerification({
          idCard: this.InputVal,
          usrid: this.phone,
        })
        .then((data) => {
          console.log(data);
          if (data.isSuccess === "SUCCESS") {
            this.$router.push({
              path: `/setPassword/${title}`,
            });
          } else {
            this.$toast.info("请输入正确的身份证号");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.info("请输入正确的身份证号");
        });
    },
    // 点击获取验证码
    // obtain() {
    //     if (!this.timer) {
    //         this.attcode = true;
    //         this.timesContral();
    //         this.timer = setInterval(this.timesContral, 1000);
    //     }
    // },
    // timesContral() {
    //     if (this.sec > 0 && this.sec <= 61) {
    //         this.sec -= 1;
    //         if (this.sec !== 0) {
    //             this.attcode = true;
    //             this.smsText = `${this.sec} s`;
    //         } else {
    //             clearInterval(this.timer);
    //             this.attcode = false;
    //             this.smsText = '获取验证码';
    //             this.sec = 61;
    //             this.timer = null;
    //         }
    //     }
    // }
  },
};
</script>

<style lang="less" scoped>
.authentication {
  height: 100vh;
  background-color: #f5f5f5;

  .verification {
    .title {
      height: 56px;
      font-size: 40px;
      font-weight: 500;
      text-align: center;
      color: #333333;
      line-height: 56px;
      padding-top: 80px;
      padding-bottom: 80px;
      margin: auto;
    }
    .progressBar {
      display: flex;
      width: 750px;
      height: 270px;
      align-items: center;
      justify-content: center;

      li {
        display: flex;
        margin: 10px;
        flex-direction: column;
        align-items: center;
      }

      li img {
        width: 79px;
        height: 79px;
      }

      li span {
        width: 160px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        line-height: 45px;
        margin-top: 20px;
      }

      .strip {
        width: 300px;
        height: 4px;
        margin-bottom: 70px;
        background: #cdcdcd;
        border-radius: 5px;
      }
    }

    #Inputkuang {
      width: 100vw;
      height: 111px;
      border: none;
      background: #ffffff;
      font-size: 32px;
      font-family: SourceHanSansCN, SourceHanSansCN-Regular;
      font-weight: 400;
      text-align: left;
      line-height: 111px;
      letter-spacing: -1px;
      padding-left: 20px;
      caret-color: #0195ff;
    }

    .VerificationCode {
      background: #ffffff;

      li:nth-child(1),
      li:nth-child(3) {
        display: flex;
        width: 100vw;
        height: 110px;
        font-size: 32px;
        align-items: center;
        margin-left: 30px;
        font-family: SourceHanSansCN, SourceHanSansCN-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        letter-spacing: -1px;

        p {
          margin-left: 70px;
        }

        .obtain {
          position: absolute;
          display: inline-block;
          width: 194px;
          height: 68px;
          right: 50px;
          //   background: #e9e9e9;
          border-radius: 8px;
          font-size: 30px;
          font-family: PingFangSC, PingFangSC-Regular;
          text-align: center;
          //   color: #888888;
          line-height: 68px;
        }

        #numCode {
          margin-left: 70px;
          height: 110px;
          font-size: 32px;
          font-family: SourceHanSansCN, SourceHanSansCN-Regular;
          text-align: left;
          color: #d9d9d9;
          line-height: 110px;
          letter-spacing: -1px;
        }
      }

      .hr {
        width: 692px;
        height: 2px;
        margin: auto;
        border: 1px solid #dadada;
      }
    }

    .btn {
      width: 650px;
      height: 90px;
      margin: auto;
      //   background: #0195ff;
      border-radius: 8px;
      font-size: 36px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
      line-height: 90px;
      margin-top: 100px;
    }
  }
  input::-webkit-input-placeholder {
    color: #d9d9d9;
  }
  input::-moz-input-placeholder {
    color: #d9d9d9;
  }
  input::-ms-input-placeholder {
    color: #d9d9d9;
  }
}
</style>
