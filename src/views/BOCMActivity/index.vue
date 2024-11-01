<template>
  <div class="BOCM-activity">
    <div class="top-activity">
      <!-- 活动规则 -->
      <div class="activity-rule" @click="showRulePopup"></div>
    </div>
    <!-- 开户话费券 -->
    <div class="ticket">
      <div class="ticket-10">
        <div class="wuxi"></div>
      </div>
      <!-- 领券 -->
      <div
        v-if="isGetTicketBtn"
        class="ticket-get-btn"
        @click="handleGetTicketQuery"
      ></div>
      <!-- 去使用 -->
      <div v-else class="ticket-go-use-btn" @click="handleGoUse"></div>
    </div>
    <!-- 用户权益 -->
    <div class="uesr-benefit">
      <div class="benefit-content">
        <div class="GB-flow benefit-box">
          <div class="GB-flow-btn btn-box" @click="goToBenefit('1GB')"></div>
        </div>
        <div class="ticket5 benefit-box">
          <div
            class="GB-flow-btn_2 btn-box"
            @click="goToBenefit('5element')"
          ></div>
        </div>
        <div class="ticket2 benefit-box">
          <div
            class="GB-flow-btn_2 btn-box"
            @click="goToBenefit('2element')"
          ></div>
        </div>
      </div>
    </div>
    <!-- 开始绑定loading效果 -->
    <div v-if="loading" class="loading-toast">
      <img alt="" src="@/assets/images/loading-toast.gif" />
    </div>
    <div
      class="md-example-child md-example-child-toast md-example-child-toast-7"
    >
      <md-toast ref="toast">
        <md-activity-indicator :size="20" color="yellow" text-color="white">
          暂未开通交通银行电子账户，即将进入开户页面
        </md-activity-indicator>
      </md-toast>
    </div>
    <activity-status-popup
      v-if="isPopup"
      :isPopup.sync="isPopup"
      :statusType="statusType"
    ></activity-status-popup>
  </div>
</template>

<script>
import api from "@/common/apiUrls";
import * as store2 from "@/common/localstore";
import { Toast, ActivityIndicator } from "mand-mobile";
import activityStatusPopup from "./compoments/activityStatusPopup.vue";
export default {
  name: "BOCMActivity",
  data() {
    return {
      loading: false,
      isGetTicketBtn: true,
      isPopup: false,
      statusType: "",
      newUserFlag: {},
      accessSource: '00'
    };
  },

  components: {
    activityStatusPopup,
    [Toast.component.name]: Toast.component,
    [ActivityIndicator.name]: ActivityIndicator,
  },
  created() {
    this.activityQueryRecord();
  },
  mounted() {
  },
  methods: {
    // 领券按钮,先调 新户标识查询接口
    async handleGetTicketQuery() {
      let mobileNo = store2.default.get("usrmob");
      try {
        this.loading = true;
        const data = await api.BOCMActivity.newUserFlagQuery({
          mobileNo,
          orgCode: "BOCM",
        });
        this.newUserFlag = data;
        console.log("actSts", data.actSts);
        console.log("parFlag", data.parFlag);
        // actSts 钱包开通状态 1:已开户 0：未开户
        // parFlag 是否可参与 0:是 1：否
        if (this.newUserFlag.parFlag == "0" && this.newUserFlag.actSts == "1") {
          // 可参与且开户状态为已开户，调用领取
          this.getTicket();
        } else if (
          this.newUserFlag.parFlag == "0" &&
          this.newUserFlag.actSts == "0"
        ) {
          // 可参与且开户状态为未开户，再判断新户
          api
            .firstCheck({
              orgCode: "BOCM",
              mblNo: mobileNo,
            })
            .then((res) => {
              if (res.isNewFlag === "1" || res.isNewFlag === 1) {
                // 新户， 2秒后页面自动跳转交行开户页面
                this.$refs.toast.show();
                setTimeout(() => {
                  this.$refs.toast.hide();
                  this.$router.push({
                    path: "/openAccount/khEmpower",
                    query: {
                      typeId: "bcmact",
                      orgCode: "BOCM",
                      parchn: this.$route.query.parchn,
                      gytype: this.$route.query.gytype,
                    },
                  });
                }, 2000);
              } else {
                // 销过户的情况下，未开户状态，直接调领取
                this.getTicket();
              }
            })
            .catch((err) => {
              this.$toast.info(err.msgInfo || "请稍后再试", 3000, true);
            });
        } else if (
          this.newUserFlag.parFlag == "1" &&
          this.newUserFlag.actSts == "0"
        ) {
          // 不可参与且开户状态为未开户，点击【取消】按钮，则隐藏弹框，点击【继续开通】按钮则页面跳转交行开户页
          this.statusType = "parFlag1ActSts0";
          this.isPopup = true;
        } else if (
          this.newUserFlag.parFlag == "1" &&
          this.newUserFlag.actSts == "1"
        ) {
          // 不可参与且开户状态为已开户，点击【取消】按钮,隐藏弹框，点击【立即前往】按钮跳转财富中心页面
          this.statusType = "parFlag1ActSts1";
          this.isPopup = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // 调用领券
    async getTicket() {
      // 生产环境：ATY230509007279015
      // 测试环境：ATY230508000128005
      let activityNo = "";
      let mobileNo = store2.default.get("usrmob");
      if(this.$client.LEADEON) {
        this.accessSource = '01'
      } else if(this.$client.JSMCC) {
        this.accessSource = '02'
      } else {
        this.accessSource = '00'
      }
      if (
        process.env.VUE_APP_ENV == "local" ||
        process.env.VUE_APP_ENV == "sit"
      ) {
        activityNo = "ATY230508000128005";
      } else if (process.env.VUE_APP_ENV == "prod") {
        activityNo = "ATY230509007279015";
      }
      try {
        const data = await api.BOCMActivity.receive({
          mobileNo,
          orgCode: "BOCM",
          activityNo,
          parentChannel: this.$route.query.parchn || "",
          childChannel: this.$route.query.gytype || "",
          accessSource: this.accessSource
        });
        if (data.msgCd == "BUS00000") {
          // 记录是成功状态，显示领取成功
          this.statusType = "success";
          this.isPopup = true;
          this.isGetTicketBtn = false;
        } else {
          this.$toast.info(data.msgInfo, 3000, false);
        }
        console.log(data);
        // 领取失败则当前页面toast提示后台返回的失败原因且3秒后自动隐藏
      } catch (error) {
        this.$toast.info(error.msgInfo, 3000, true);
        console.log(error);
      }
    },
    // 权益领取记录查询
    async activityQueryRecord() {
      this.loading = true;
      console.log(process.env.VUE_APP_ENV);
      // 生产环境：ATY230509007279015
      // 测试环境：ATY230508000128005
      let atyIdList = [];
      let mobileNo = store2.default.get("usrmob");
      if (
        process.env.VUE_APP_ENV == "local" ||
        process.env.VUE_APP_ENV == "sit"
      ) {
        atyIdList.push("ATY230508000128005");
      } else if (process.env.VUE_APP_ENV == "prod") {
        atyIdList.push("ATY230509007279015");
      }

      try {
        const data = await api.BOCMActivity.walletOpenActivityQuery({
          mobileNo,
          orgCode: "BOCM",
          atyIdList,
        });
        this.handleStatusJudge(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // 领取记录查询的结果处理
    handleStatusJudge(data) {
      console.log(data);
      // 错误白名单
      let errorList = [
        "当前机构未配置开户活动,无法发放",
        "当前开户机构不在白名单",
        "访问数据库异常",
        "风控规则检查不通过",
        "该用户为内部员工号，无法领取权益",
        "活动不存在或状态不合法",
        "活动已过期",
        "获取用户信息接口请求失败",
        "减库存操作失败",
        "现阶段活动领取操作太频繁，请稍后再试",
      ];
      if (
        data.msgCd == "BUS00000" &&
        (!data.prizeTjnInfo || data.prizeTjnInfo.length == 0)
      ) {
        // 成功无记录，显示领取按钮
        this.isGetTicketBtn = true;
      } else if (data.msgCd == "BUS00000" && data.prizeTjnInfo.length !== 0) {
        // 成功有记录
        switch (data.prizeTjnInfo[0].receive_stuatus) {
          case "success":
            // 记录是成功状态，显示使用按钮
            this.isGetTicketBtn = false;
            break;
          case "fail":
            // 记录是失败状态
            // if (errorList.includes(data.prizeTjnInfo[0].error_msg)) {
              // 失败原因包含，显示领取按钮
              this.isGetTicketBtn = true;
            // } else {
              // 失败原因不包含，显示使用按钮
              // this.isGetTicketBtn = false;
            // }
            break;
          case "init":
            // 记录是待领取状态，显示领取按钮
            this.isGetTicketBtn = true;
            break;
          case "receiving":
            // 记录是领取中状态，显示使用按钮
            this.isGetTicketBtn = false;
            break;
          default:
            // 默认，显示领取按钮
            this.isGetTicketBtn = true;
            break;
        }
      } else {
        if (errorList.includes(data.msgInfo)) {
          // 失败，原因包含在内，显示领取按钮
          this.isGetTicketBtn = true;
        } else {
          // 失败，原因不包含，显示使用按钮
          this.isGetTicketBtn = false;
        }
      }
    },
    // 去使用按钮
    handleGoUse() {
      window.location.href =
        "https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html?cardType=0&useType=1&rm=ydc";
    },
    // 显示规则弹框
    showRulePopup() {
      this.statusType = "activityRule";
      this.isPopup = true;
    },
    // 去权益页
    goToBenefit(type) {
      if (type == "1GB") {
        this.$router.push({
          path: "oneCent",
          query: {
            typeId: "bcmact",
            parchn: this.$route.query.parchn,
            gytype: this.$route.query.gytype,
          },
        });
      } else if ("2element" || type == "5element") {
        this.$router.push({
          path: "/member/rightsfree",
          query:{
            parchn: this.$route.query.parchn,
            gytype: this.$route.query.gytype,
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.BOCM-activity {
  height: 100%;
  overflow-y: auto;
  background: #ffe8b6;
  position: relative;
  .top-activity {
    width: 750px;
    height: 619px;
    background: url("../../assets/images/BOCMActivity/top-bg2.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .activity-rule {
      position: absolute;
      top: 114px;
      right: 0;
      width: 97px;
      height: 38px;
      background: url("../../assets/images/BOCMActivity/activity-rule.png")
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .ticket {
    width: 722px;
    height: 472px;
    background: url("../../assets/images/BOCMActivity/ticket-10-bg.png")
      no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 480px;
    left: 50%;
    transform: translateX(-50%);
    .ticket-10 {
      position: relative;
      width: 663px;
      height: 206px;
      background: url("../../assets/images/BOCMActivity/ticket-10.png")
        no-repeat;
      background-size: 100% 100%;
      margin: 113px auto 0;
      .wuxi {
        position: absolute;
        top: -5px;
        right: -10px;
        width: 112px;
        height: 112px;
        background: url("../../assets/images/BOCMActivity/wuxi.png") no-repeat;
        background-size: 100%;
      }
    }
    .ticket-get-btn {
      width: 533px;
      height: 130px;
      background: url("../../assets/images/BOCMActivity/ticket-get-btn.png")
        no-repeat;
      background-size: 100% 100%;
      margin: 10px auto 0;
    }
    .ticket-go-use-btn {
      width: 533px;
      height: 130px;
      background: url("../../assets/images/BOCMActivity/ticket-go-use-btn.png")
        no-repeat;
      background-size: 100% 100%;
      margin: 10px auto 0;
    }
  }
  .uesr-benefit {
    width: 722px;
    height: 517px;
    background: url("../../assets/images/BOCMActivity/uesr-benefit-bg.png")
      no-repeat;
    background-size: 100% 100%;
    margin: 348px auto 43px;
    overflow: hidden;
    .benefit-content {
      height: 304px;
      margin: 177px auto 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .benefit-box {
        width: 216px;
        height: 304px;
      }
      .btn-box {
        width: 183px;
        height: 60px;
        margin: 223px auto 0;
      }
      .GB-flow-btn {
        background: url("../../assets/images/BOCMActivity/GB-flow-btn.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .GB-flow-btn_2 {
        background: url("../../assets/images/BOCMActivity/limitBtn.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .GB-flow {
        background: url("../../assets/images/BOCMActivity/GB-flow-bg.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .ticket5 {
        background: url("../../assets/images/BOCMActivity/ticket5-bg.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .ticket2 {
        background: url("../../assets/images/BOCMActivity/ticket2-bg.png")
          no-repeat;
        background-size: 100% 100%;
        .get-me-btn {
          background: url("../../assets/images/BOCMActivity/get-me-btn.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .loading-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 999;
    border: 999px solid transparent;

    img {
      width: 1.2rem;
    }
  }
  ::v-deep .md-example-child {
    .md-toast {
      .md-toast-content {
        font-size: 21px !important;
      }
    }
  }
}
</style>