<template>
  <div class="activity-status-popup">
    <!-- 领取成功 -->
    <div
      class="popup-bg-success get-success-bg"
      v-show="statusType == 'success'"
    >
      <div class="popup-close" @click="closePopup"></div>
      <div class="success-title">恭喜您<br />成功领取10元充值券～</div>
      <div class="go-use" @click="goUse"></div>
    </div>
    <!-- 开通成功 -->
    <div
      class="popup-bg-success open-success-bg"
      v-show="statusType == 'openSuccess'"
    >
      <div
        v-if="isFromWalletOpenAccResult"
        class="popup-close"
        @click="showBasicDialog"
      ></div>
      <div v-else class="popup-close" @click="closePopup"></div>
      <div class="success-title">恭喜您<br />成功获得10元充值券～</div>
      <div class="go-use" @click="goUse"></div>
    </div>
    <!-- 开户和未开户 -->
    <div
      class="popup-account"
      v-show="
        statusType == 'parFlag1ActSts0' || statusType == 'parFlag1ActSts1'
      "
    >
      <div v-if="statusType == 'parFlag1ActSts0'" class="account-title">
        您非首次开通交行钱包<br />继续开通无法享受10元话费券～
      </div>
      <div v-else class="account-title">
        您已开通交行钱包账户<br />请前往【财富中心】专区看看其他活动吧~
      </div>
      <div class="popup-bottom">
        <div class="cancel" @click="closePopup"></div>
        <div
          v-if="statusType == 'parFlag1ActSts0'"
          class="go-on-opne-btn"
          @click="goToKhEmpower"
        ></div>
        <div v-else class="go-to" @click="goTo"></div>
      </div>
    </div>
    <!-- 活动规则 -->
    <div class="popup-activity-rule" v-show="statusType == 'activityRule'">
      <div class="popup-close" @click="closePopup"></div>
      <div class="activity-rule-content" v-html="rulesContent.replace(/px/g,'').replace(/微软雅黑/g,'')"></div>
    </div>
  </div>
</template>

<script>
import api from "@/common/apiUrls";

export default {
  name: "",
  data() {
    return {
      rulesContent: '',
    };
  },
  props: {
    isPopup: {
      type: Boolean,
      // require: true,
    },
    statusType: {
      type: String,
      require: true,
    },
    isFromWalletOpenAccResult: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.queryRules()
  },
  methods: {
    queryRules() {
      this.$store.commit('LOADING', true);
      api.huataiAgreement({
        businessCode: "jhxhhd",
        businessType: 'WHOLE'
      })
      .then((res) => {
        this.$store.commit('LOADING', false);
        this.rulesContent = res.content;
      })
      .catch(() => {
        this.$store.commit('LOADING', false);
      })
    },
    closePopup() {
      this.$emit("update:isPopup", false);
    },
    showBasicDialog() {
      // 给开户结果页使用
      this.$emit("closePopupShowBasicDialog", true);
      this.$emit("update:isPopup", false);
    },
    goUse() {
      window.location.href =
        "https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html?cardType=0&useType=1&rm=ydc";
    },
    goToKhEmpower() {
      // 跳转交行开户页
      this.$router.push({
        path: "/openAccount/khEmpower",
        query: {
          typeId: "bcmact",
          orgCode: "BOCM",
        },
      });
    },
    goTo() {
      // 跳转财富中心页面
      this.$router.push({
        path: "/newFortune",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.activity-status-popup {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(2, 2, 2, 0.6);
  z-index: 999;
  .popup-close {
    position: absolute;
    right: 0;
    top: -67px;
    z-index: 2;
    display: inline-block;
    width: 51px;
    height: 51px;
    background: url(../../../assets/images/bank_close_icon.png) no-repeat;
    background-size: 100% 100%;
  }
  .get-success-bg {
    background: url("../../../assets/images/BOCMActivity/get-success-bg.png")
      no-repeat;
    background-size: 100% 100%;
  }
  .open-success-bg {
    background: url("../../../assets/images/BOCMActivity/open-success-bg.png")
      no-repeat;
    background-size: 100% 100%;
  }
  .popup-bg-success {
    width: 556px;
    height: 668px;
    position: relative;
    .success-title {
      width: 351px;
      height: 86px;
      color: #888b8c;
      font-weight: 400;
      font-face: Source Han Sans CN;
      font-size: 29px;
      text-align: center;
      line-height: 54px;
      letter-spacing: 5px;
      margin: 176px auto 0;
    }
    .go-use {
      width: 354px;
      height: 89px;
      margin: 255px auto 0;
      background: url("../../../assets/images/BOCMActivity/go-use.png")
        no-repeat;
      background-size: 100% 100%;
    }
  }

  .popup-account {
    width: 556px;
    height: 558px;
    background: url("../../../assets/images/BOCMActivity/tips-bg.png") no-repeat;
    background-size: 100% 100%;
    .account-title {
      width: 477px;
      height: 92px;
      color: #888b8c;
      font-weight: 400;
      font-face: Source Han Sans CN;
      font-size: 28px;
      line-height: 60px;
      margin: 213px auto 0;
      text-align: center;
    }
    .popup-bottom {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 97px auto 0;
      .cancel {
        width: 234px;
        height: 89px;
        background: url("../../../assets/images/BOCMActivity/cancel.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .go-on-opne-btn {
        width: 234px;
        height: 89px;
        background: url("../../../assets/images/BOCMActivity/go-on-opne-btn.png")
          no-repeat;
        background-size: 100% 100%;
      }
      .go-to {
        width: 234px;
        height: 89px;
        background: url("../../../assets/images/BOCMActivity/go-to.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .popup-activity-rule {
    width: 602px;
    height: 709px;
    background: url("../../../assets/images/BOCMActivity/activity-rule-bg.png")
      no-repeat;
    background-size: 100% 100%;
    position: relative;
    .activity-rule-content {
      line-height: 1.5;
      font-size: 28px;
      width: 506px;
      height: 549px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      overflow-y: auto;
      .rule-title {
        color: #275070ff;
        font-weight: 700;
        font-face: Source Han Sans CN;
        font-size: 26px;
        text-align: left;
        line-height: 47.5px;
      }
      .rule-description {
        color: #275070ff;
        font-weight: 400;
        font-face: Source Han Sans CN;
        font-size: 26px;
        text-align: left;
        line-height: 47.5px;
      }
    }
  }
}
</style>