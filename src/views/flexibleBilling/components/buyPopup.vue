<template>
  <div class="buy-popup">
    <div v-show="isPopupShow" class="popup-bg">
      <!-- 订购弹出层 -->
      <div class="popup">
        <div class="popup-title">温馨提示</div>
        <div class="border"></div>
        <div class="popup-content">
          <div class="popup-tip">
            您的号码
            <span style="color: #f6783b">{{ phone }}</span>
            即将开通：
          </div>
          <div class="content">
            <div class="popup-info">
              <div>业务名称：</div>
              <div style="color: #909192">{{ businessName }}</div>
            </div>
            <div class="popup-info">
              <div>业务资费：</div>
              <div style="color: #fc1513">1元 / 月</div>
            </div>
            <div class="popup-info">
              <div>当前状态：</div>
              <div style="color: #909192">未开通</div>
            </div>
            <div class="popup-info">
              <div>生效方式：</div>
              <div style="color: #909192">立即生效</div>
            </div>
            <div class="popup-info">
              <div>详情：</div>
              <div id="isDetails">
                一、业务介绍
                <br />省心财经1元版产品包含华泰证券授权提供的理财资讯，专属权益包括但不限于华泰证券提供的理财盲盒等。
                <br />二、资费标准
                <br />资费1元/月，订购后立即扣费，按月自动续订，次月起每月月初一次性扣费
                <br />三、生失效时间 开通：立即生效 关闭：次月失效 四、温馨提示
                      <br />1、省心财经1元版产品，标准资费1元/月，订购后立即扣费，如用户不主动退订，则次月自动续订，次月起每月月初一次性扣费，成功扣费后，可享有每日财经资讯、每月理财盲盒等专属权益。产品续订期间，用户每月可至中国移动江苏APP或“会员任我选”微信公众号领取一次理财盲盒，领取资格有效期至每月月底，不可补领，当月不能更换、共享、转赠已领取的权益。
                      <br />2、华泰证券为订购用户提供每日财经资讯，每月抽取理财盲盒等专属权益。江苏移动根据自身及华泰证券的业务发展情况，有权对产品提供的形式和内容进行调整，并将通过门户网站提前公告。如公告后您继续使用本产品，即表明您已接受本产品调整内容。
                      <br />3、江苏移动基于华泰证券合法授权，向客户提供相关权益。为向客户提供更好的服务，将通过营业网点、网站、APP、短信、彩信、5G消息、电话、电子邮件、信函、即时通信、公开媒体等方式向客户发送社会公益、通信服务、业务使用、客户权益、诈骗风险警示、市场活动、优惠促销等信息及进行沟通互动。
                      <br />4、江苏移动有权对产品相关服务、功能、界面等进行更新、修改。当您采用接受本产品服务的形式，即表明您已接受本产品的全部修改，修改内容以最新展示说明为准，不再另行通知。
                      <br />5、本产品自订购起有效期为一年，江苏移动有权在有效期截至后修改资费方案。如需修改，我公司将在修改前两个月通知客户，客户可以选择修改后的资费方案或江苏移动提供的其他资费方案，如无需修改，则本产品顺延一年，顺延次数不限。双方特殊约定的除外。
                      <br />6、相关财经资讯内容、理财盲盒服务均由华泰证券股份有限公司提供，用户如有疑议，可拨打华泰公司客服电话95597。
              </div>
            </div>
            <div class="popup-read">
              <span
                :class="isCheckAgreement ? 'choose' : 'noChoose'"
                @click="setCheckAgreement"
              ></span>
              <span>
                我已阅读并接受
                <a
                  style="color: #54a7f7"
                  href="javascript:;"
                  @click="showAgreement"
                >
                  《{{ agreementName }}》
                </a>
              </span>
            </div>
            <!-- <div class="yzm-tip">验证码：</div> -->
            <div class="yzm">
              <input
                v-model="smsCode"
                type="number"
                placeholder="请输入4位验证码"
                oninput="if(this.value.length > 4) this.value = this.value.slice(0,4)"
              />
              <div
                :class="isSendCode && voiceMsg == '' ? 'reget' : 'disabled'"
                @click="send()"
              >
                <span>{{ codeMsg }}</span>
                <span>{{ isSendCode ? "" : "S" }}</span>
              </div>
            </div>
            <!-- <div class="voice">
              收不到短信验证码？点击试试
              <a
                :class="isSendVoice ? 'voiceA voiceColor' : 'voiceA'"
                href="javascript:;"
                @click="getVoice()"
              >
                语音验证码
              </a>
              <span class="voiceColor"> &nbsp;&nbsp;{{ voiceMsg }} </span>
              <span class="voiceColor">{{ voiceMsg != "" ? "S" : "" }}</span>
            </div> -->
            <div class="popup-bottom">
              <div class="left-btn" @click="close">取消</div>
              <div class="right-btn" @click="confirm">确定</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 业务受理单 -->
    <div v-if="isBusiness" class="popup-bg">
      <div class="popBox-inner-bill">
        <div class="popBox-head">
          <span>业务受理单</span>
        </div>
        <div class="popBox-body">
          <div class="bill-info">
            <div>
              <img src="@/assets/images/newRights/img_1.png" class="logo" />
            </div>
            <p>{{ datey.y + "年" + datey.m + "月" + datey.d + "日" }}</p>
            <p>手机号码：{{ phone }}</p>
            <p>客户姓名/名称：{{ userName.slice(0, 1) + "**" }}</p>
            <div class="info-scroll" ref="infoscroll">
              鉴权方式：本机本卡
              <br />
              受理类型：业务办理
              <br />
              受理时间：{{ dates }}
              <br />
              受理渠道：江苏移动掌上营业厅（wap）
              <br />
              商品名称：省心财经1元版
              <br />
              业务详情：
              <br />
              <!-- 操作DOM，异步插入协议内容 -->
              <div id="isContent"></div>
              <!-- <br />已经生效的产品不能业务回退。 -->
              <!-- <br /> -->
              <!-- <span class="info-important">
              甲方在勾选已阅读并同意业务协议后即表示已经阅读并已理解本协议
            </span> -->
              <!-- <br /> -->
              甲方：{{ userName.slice(0, 1) + "**" }}
              <br />乙方：中国移动通信集团江苏有限公司
              <img alt="" src="@/assets/images/newRights/img.png" />
              <br />
            </div>
          </div>
        </div>
        <span class="bottom-tips"></span>
        <div
          class="btn"
          :style="{ background: isDaojishi ? '#dbdbdb' : '#0098ff' }"
          @click="readUesrAgreement"
        >
          我已阅读并同意
          <span v-if="daojishi && isDaojishi">({{ daojishi }})</span>
        </div>
      </div>
    </div>
    <!-- 电话告知弹框 -->
    <!-- <div class="tankuang" v-if="isCallCode">
      <div class="call-code">
        <div class="title">语音验证码</div>
        <div class="border"></div>
        <p class="codeTip">我们将以电话的方式告知您验证码，请注意接听</p>
        <div class="btn" @click="iSee">我知道了</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import api from "@/common/apiUrls";
import { parseTime } from "@/common/publicFunc";
import * as store2 from "@/common/localstore";
export default {
  name: "buyPopup",
  data() {
    return {
      isCallCode: false,
      isBusiness: false,
      isPopupShow: false,
      isCheckAgreement: false,
      smsCode: "",
      codeMsg: "发送验证码",
      isSendCode: true, // 默认可以发送验证码
      isSendVoice: false, // 默认不可发送语音
      isBusiness: false,
      isDaojishi: false,
      isNeedSend: false,
      judgeIsLingquNoBuy: false,
      daojishi: "",
      voiceMsg: "",
      agreementName: "",
      agreementContent: "",
      businessName: "",
      userName: "",
      dates: "",
      datey: {
        y: "",
        m: "",
        d: "",
      },
      timer: null,
      timerCode: null,
      timerVoice: null,
    };
  },
  inject: ["rightsType"],
  props: {
    phone: {
      type: String,
      required: true,
    },
    isBuyPopup: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isBusiness(val, oldval) {
      if (val) {
        // 隐藏订购弹出层
        this.isPopupShow = false;
        this.$nextTick(() => {
          // 排在受理单dom渲染任务之后
          document.getElementById("isContent").innerHTML =
            this.agreementContent;
          if (!this.isCheckAgreement) {
            this.isDaojishi = true;
            this.daojishi = 3;
            this.timer = setInterval(() => {
              this.daojishi -= 1;
              if (this.daojishi == 0) {
                this.daojishi = "";
                clearInterval(this.timer);
                this.isDaojishi = false;
              }
            }, 1000);
          }
        });
      }
    },
    isPopupShow: {
      handler(val, oldval) {
        if (val) {
          this.datey.y = new Date().getFullYear();
          this.datey.m = new Date().getMonth() + 1;
          this.datey.d = new Date().getDate();
          this.parseTimes();
        }
        console.log(val);
      },
      immediate: true,
      deep: true,
    },
    codeMsg(val, oldval) {
      if (val == "重新获取") {
        console.log(val);
        // 可以点击获取语音验证
        this.isSendVoice = true;
      } else {
        this.isSendVoice = false;
      }
      console.log(val);
    },
  },
  mounted() {
    this.parseTimes();
  },
  created() {
    this.huataiQueryAgreementList();
    this.isPopupShow = this.isBuyPopup;
  },
  methods: {
    parseTimes() {
      this.dates = parseTime(new Date());
    },
    iSee() {
      this.tankuang = false;
      this.isCallCode = false;
      this.isPopupShow = true;
      // this.closeTankuang();
    },
    // 取消
    close() {
      this.isPopupShow = false; // 隐藏订购
      this.isCheckAgreement = false; // 取消勾选
      this.isNeedSend = false;
      this.smsCode = "";
      this.failedMsgInfo = "";
      this.$emit("update:isBuyPopup", false);
    },
    // 确定
    async confirm() {
      // 未勾选
      if (!this.isCheckAgreement) {
        // 显示业务受理单
        this.$toast.info("请先阅读并同意用户协议");
        // this.isBusiness = true;
        // this.isNeedSend = true;
        return;
      }
      if (this.smsCode == "") {
        this.$toast.info("请输入短信验证码");
        return;
      }
      try {
        const data = await api.huataiWalletSmsCodeVerify({
          mobileNo: this.phone,
          smsCode: this.smsCode,
        });
        if (data.msgCd == "BUS00000") {
          this.close();
          this.tankuang = true;
          this.isBuySucceed = true;
          this.$router.push({
            path: `/flexibleBilling/${this.rightsType}/transactionResult`,
            params: {
              modePayment: "hf",
            },
          });
        } else {
          this.close();
          this.tankuang = true;
          this.isBuyfailed = true;
          this.failedMsgInfo = data.msgInfo;
          // this.$toast.info(data.msgInfo);
        }
        console.log(data);
      } catch (error) {
        console.log(error);
        this.$toast.info(error.msgInfo);
      }
    },
    // 设置复选框
    setCheckAgreement() {
      if (this.isCheckAgreement) {
        // 取消勾选
        this.isCheckAgreement = false;
      } else {
        // this.isPopupShow = false;
        // 显示业务受理单
        this.isBusiness = true;
      }
    },
    // 显示业务受理单
    showAgreement() {
      this.isBusiness = true;
    },
    // 我已阅读并同意
    readUesrAgreement() {
      if (this.isDaojishi) return;
      this.isPopupShow = true; // 显示订购
      this.isCheckAgreement = true; // 勾选
      if (this.isNeedSend && this.smsCode == "") {
        this.send();
        this.isNeedSend = false;
      }
      this.isBusiness = false;
    },
    // 协议内容
    async huataiQueryAgreementList() {
      this.$store.commit("LOADING", true);
      // 显示订购弹出层
      //   this.isPopupShow = true;
      try {
        const data = await api.huataiQueryAgreementList();
        this.agreementName = data.data.agreementList[0].agreementName;
        this.businessName = data.data.agreementList[0].businessName;
        this.agreementContent = data.data.agreementList[0].agreementContent;
        document.getElementById("isDetails").innerHTML = this.agreementContent;
        console.log(data.data);
      } catch (error) {
        this.$toast.info(error.msgInfo);
        console.log(error);
      } finally {
        //   window.location.href = "https://wap.js.10086.cn/vw/navbar/busdetail/SXCJ";
        this.$store.commit("LOADING", false);
        // this.closeTankuang();
      }
    },
    // 下发短信
    async send() {
      if (!this.isCheckAgreement) {
        this.$toast.info("请先阅读并同意用户协议");
        return;
      }
      // 互斥语音验证
      if (!this.isSendCode || this.voiceMsg != "") return;
      this.isSendVoice = false;
      try {
        const data = await api.huataiWalletSmsCode({
          mobileNo: store2.default.get("usrmob"),
        });
        if (data.msgCd == "BUS00000") {
          this.codeMsg = 60;
          this.isSendCode = false;
          this.timerCode = setInterval(() => {
            this.codeMsg -= 1;
            if (this.codeMsg == 0) {
              this.codeMsg = "重新获取";
              this.isSendCode = true;
              clearInterval(this.timerCode);
            }
          }, 1000);
        }
        console.log(data);
      } catch (error) {
        this.$toast.info(error.msgInfo);
        console.log(error);
      }
    },
    // 获取语音短信
    async getVoice() {
      if (!this.isCheckAgreement) {
        this.$toast.info("请先阅读并同意用户协议");
        return;
      }
      // 互斥下发短信
      if (!this.isSendVoice) return;

      try {
        const data = await api.huataiWalletVoiceSmsCode({
          mobileNo: store2.default.get("usrmob"),
        });
        if (data.msgCd == "BUS00000") {
          this.voiceMsg = 60;
          this.isSendVoice = false;
          this.timerVoice = setInterval(() => {
            this.voiceMsg -= 1;
            if (this.voiceMsg == 0) {
              this.voiceMsg = "";
              this.isSendVoice = true;
              clearInterval(this.timerVoice);
            }
          }, 1000);
          this.isPopupShow = false;
          this.tankuang = true;
          this.isCallCode = true;
        }
        console.log(data);
      } catch (error) {
        this.$toast.info(error.msgInfo);
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.buy-popup {
  width: 100%;
  height: 100%;
}
.tankuang {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(2, 2, 2, 0.8);
  z-index: 999;
  .call-code {
    width: 590px;
    height: 400px;
    background: #ffffff;
    border-radius: 10px;
    padding: 0 45px;
    .title {
      font-size: 38px;
      color: #333333;
      text-align: center;
      line-height: 53px;
      margin: 24px 0;
    }
    .border {
      width: 600px;
      height: 1px;
      background: #e5e6e5;
    }
    .codeTip {
      text-align: center;
      font-size: 28px;
      margin: 61px 0 67px 0;
    }
    .btn {
      margin: 0 auto;
      width: 530px;
      height: 70px;
      background: #0098ff;
      border-radius: 8px;
      font-size: 32px;
      color: #ffffff;
      line-height: 70px;
      text-align: center;
    }
  }
}
.popup-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(2, 2, 2, 0.8);
  z-index: 999;
  .popup {
    width: 600px;
    max-height: 1050px;
    border-radius: 16px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    letter-spacing: 0;
    padding: 0 40px;
    background: #feffff;
    transition: transform 0.3s, -webkit-transform 0.3s;
    .popup-title {
      font-size: 38px;
      text-align: center;
      margin: 24px 0;
    }
    .border {
      width: 600px;
      height: 1px;
      background: #e5e6e5;
    }
    .popup-content {
      border-radius: 10px;
      background: #ffffff;
      border: 1px solid transparent;
      .popup-tip {
        font-size: 30px;
        font-weight: 700;
        text-align: left;
        color: #333333;
        margin: 12px 0 10px 0;
      }
      .popup-info {
        display: flex;
        align-items: center;
        margin-top: 10px;
        & div:nth-child(1) {
          width: 130px;
          text-align: right;
        }
        #isDetails {
          width: 75%;
          height: 150px;
          overflow-y: auto;
        }
      }
      .popup-read {
        display: flex;
        margin: 30px auto;
        .choose {
          width: 24px;
          height: 24px;
          background: url("~@/assets/images/choose.png") no-repeat;
          background-size: 100%;
          margin: 6px 10px 0 0;
        }
        .noChoose {
          width: 24px;
          height: 24px;
          background: url("~@/assets/images/noChoose.png") no-repeat;
          background-size: 100%;
          margin: 6px 10px 0 0;
        }
        p {
          font-size: 22px;
          color: #999999;
        }
      }
      //   .yzm-tip {
      //     font-weight: 500;
      //     font-size: 24px;
      //     text-align: left;
      //     color: #3f4041 100%;
      //     margin-bottom: 20px;
      //   }
      .yzm {
        width: 590px;
        height: 78px;
        border: 2px solid #dbdbdb;
        border-radius: 39px;
        display: flex;
        justify-content: space-between;
        input {
          margin: 8px 0 0 20px;
          outline: none;
          width: 300px;
          height: 60px;
          border: none;
          //color: #D2D2D2;
          font-size: 28px;
        }
        .reget {
          color: #333333;
          font-size: 28px;
          line-height: 78px;
          margin-right: 30px;
          pointer-events: visible;
        }
        .disabled {
          pointer-events: none;
          color: #999999;
          font-size: 28px;
          line-height: 78px;
          margin-right: 30px;
        }
      }
      .voice {
        font-size: 24px;
        margin: 20px 0 30px 0;
        .voiceA {
          color: #999999;
          text-decoration: underline;
          pointer-events: none;
        }
        .voiceColor {
          color: #ff7723;
          pointer-events: visible;
        }
      }
      .popup-bottom {
        display: flex;
        margin-bottom: 40px;
        .left-btn {
          width: 280px;
          height: 75px;
          background: #ffffff;
          border: 2px solid #0098ff;
          border-radius: 8px;
          font-size: 32px;
          color: #0098ff;
          line-height: 75px;
          text-align: center;
          margin-right: 40px;
        }
        .right-btn {
          width: 280px;
          height: 75px;
          background: #0098ff;
          border-radius: 8px;
          font-size: 32px;
          color: #ffffff;
          line-height: 75px;
          text-align: center;
        }
      }
    }
  }
  .popBox-inner-bill {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    color: #666;
    text-align: left;
    background: #fff;
    border-radius: 5px;
    .bottom-tips {
      display: block;
      width: 394px;
      height: 23px;
      margin: 5px auto;
      background-size: 100% 100%;
    }
    .popBox-head {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 20px 30px;
      position: relative;
      text-align: center;
      border-bottom: 1px solid #0195ff;
      // line-height: 0.4rem;
      font-size: 32px;
      color: #0195ff;
    }
    .popBox-body {
      padding: 0.2rem 0.2rem;
      font-size: 29px;
      line-height: 180%;
      color: #666;
      .bill-info {
        line-height: 1.5;
        font-size: 29px;
        div {
          font-size: 29px;
        }
        p {
          font-size: 29px;
        }
        .logo {
          width: 2.4rem;
          height: 0.72rem;
          display: block;
        }
      }
    }

    p {
      border-bottom: 1px solid #e5e5e5;
      padding: 0.1rem 0;
      font-size: 29px;
    }
    .info-scroll {
      overflow-y: scroll;
      height: 5rem;
      font-size: 29px;
      #reach2 {
        // position: absolute;
        // top: -4px;
        // left: -4px;
        width: 634px;
        height: 495px;
        word-wrap: break-word;
      }
    }
    .sec2-main__item.is-cur {
      display: block;
    }
    .info-important {
      margin: 0.1rem 0;
      display: inline-block;
    }
    .logo-left {
      float: left;
    }
    em {
      font-size: 0.22rem;
      width: 50%;
      float: right;
      color: #999;
    }
    .popBox-foot {
      text-align: center;
      padding: 10px 0 20px 0;
    }
    .btn {
      width: 500px;
      height: 75px;
      color: #ffffff;
      line-height: 75px;
      border-radius: 8px;
      font-size: 32px;
      text-align: center;
      margin: auto;
      margin-bottom: 20px;
    }
  }
}
</style>