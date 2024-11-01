<template>
  <div class="flexible-billing">
    <!-- 开始绑定loading效果 -->
    <div v-if="loading" class="loading-toast">
      <img alt="" src="@/assets/images/loading-toast.gif" />
    </div>

    <rights-content :noSensitiveMobile="noSensitiveMobile"> </rights-content>
    <!-- 立即订购 -->
    <div v-if="isShowBuy" class="buy">
      <div class="buy-bg">
        <div class="select-payment">
          <button
            :class="{ selected: isSelectTelephone }"
            @click="telephoneCharge"
          >
            <div class="yes"></div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <div class="telephone-icon"></div>
              <span>话费支付</span>
            </div>
          </button>
          <button :class="{ selected: isSelectCash }" @click="cashPayment">
            <div class="yes"></div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <div class="cash-icon"></div>
              <span>现金支付</span>
            </div>
          </button>
        </div>
        <button class="buy-immediately" @click="immediatelyBuy">
          立即订购（10元）
        </button>
      </div>
    </div>
    <!-- 我的权益 -->
    <div v-else class="my-rights">
      <button
        class="my-rights-btn"
        @click="$router.push(`/flexibleBilling/${rightsType}/myRights`)"
      >
        我的权益
      </button>
    </div>
    <!-- 订购弹出层 -->
    <buy-popup
      v-if="isBuyPopup"
      :isBuyPopup.sync="isBuyPopup"
      :phone="noSensitiveMobile"
    ></buy-popup>
  </div>
</template>

<script>
import * as store2 from "@/common/localstore";
import rightsContent from "./components/rightsContent.vue";
import buyPopup from "./components/buyPopup.vue";
import api from "@/common/apiUrls";
export default {
  name: "FlexibleBilling",
  data() {
    return {
      isShowBuy: true,
      isSelectTelephone: false,
      isSelectCash: true,
      isBuyPopup: false,
      loading: false,
      mobile: "",
      noSensitiveMobile: "",
      toPath: "",
      payType: "",
    };
  },
  inject: ["rightsType", "rights"],
  components: {
    rightsContent,
    buyPopup,
  },
  watch: {
    $route: {
      handler(val) {
        console.log(val);
        this.toPath = val.path;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.mobile = store2.default.get("usrmob");
    this.noSensitiveMobile = this.mobile.replace(
      /(\d{3})\d{4}(\d{4})/,
      "$1****$2"
    );
    this.queryProductInfo();
    this.payCheck();
    // console.log(this.$route);
  },
  mounted() {},
  methods: {
    async queryProductInfo() {
      this.loading = true;
      try {
        const data = await api.flexibleBilling.queryProductInfo({
          productId: this.rights.productId,
        });
        this.payType = data.productInfoDTOList[0].payType;
        console.log(data.productInfoDTOList[0]);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async payCheck() {
      try {
        const data = await api.flexibleBilling.payCheck({
          productId: this.rights.productId,
        });
        if (data.msgCd == "BUS00000") {
          this.isShowBuy = true;
        } else {
          this.isShowBuy = false;
        }
        console.log(data);
      } catch (error) {
        if (error.msgCd == "BUS033110") {
          // 库存不足
          this.isShowBuy = true;
        } else {
          this.isShowBuy = false;
        }
        console.log(error);
      }
    },
    telephoneCharge() {
      this.isSelectCash = false;
      this.isSelectTelephone = true;
    },
    cashPayment() {
      this.isSelectTelephone = false;
      this.isSelectCash = true;
    },
    async immediatelyBuy() {
      if (this.isSelectTelephone) {
        if (!this.payType.includes("2")) {
          this.$toast.info("系统升级中~ 敬请期待！");
          return;
        }
        this.isBuyPopup = true;
      } else {
        if (!this.payType.includes("3")) {
          this.$toast.info("系统升级中~ 敬请期待！");
          return;
        }
        let pageUrl = "";
        if (process.env.VUE_APP_ENV == "local") {
          pageUrl = `http://localhost:8080/fintech-h5/fortuneCenter/flexibleBilling/${this.rightsType}/transactionResult?modePayment=xj`;
        } else if (process.env.VUE_APP_ENV == "sit") {
          // pageUrl = `https://fintech.12580life.com/fintech-uat/fortuneCenter/flexibleBilling/${this.rightsType}/transactionResult?modePayment=xj`;
          pageUrl = `http://183.207.110.250:8011/fintech-uat/fortuneCenter/flexibleBilling/${this.rightsType}/transactionResult?modePayment=xj`;
        } else if (process.env.VUE_APP_ENV == "prod") {
          pageUrl = `https://fintech.12580life.com/fintech-h5/fortuneCenter/flexibleBilling/${this.rightsType}/transactionResult?modePayment=xj`;
        } else {
          pageUrl = `https://fintech.12580life.com/fintech-h5/fortuneCenter/flexibleBilling/${this.rightsType}/transactionResult?modePayment=xj`;
        }
        try {
          this.loading = true;

          const data = await api.flexibleBilling.payApply({
            productId: this.rights.productId,
            pageUrl,
          });
          console.log(data);
          if (data.payUrl) {
            window.location.href = data.payUrl;
          }
        } catch (error) {
          console.log(error);
          if (error.msgCd == "BUS033110") {
            // 库存不足
            this.$toast.info(error.msgInfo);
          }
        } finally {
          this.loading = false;
        }
        console.log(pageUrl);
      }
    },
  },
};
</script>

<style scoped lang="less">
.flexible-billing {
  height: 100vh;
  background-color: #f0f4fa;
  overflow-y: auto;
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
  .my-rights {
    padding: 40px 20px 50px;
    .my-rights-btn {
      width: 710px;
      height: 80px;
      background-image: linear-gradient(147deg, #fefbe8 0%, #fff9d4 100%);
      border: 1px solid #867500;
      border-radius: 20px;
      font-family: SourceHanSansCN-Medium;
      font-weight: 500;
      font-size: 32px;
      color: #54490a;
      letter-spacing: 0;
    }
  }
  .buy {
    padding: 40px 20px 30px;
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
    color: #54490a;
    .buy-bg {
      width: 710px;
      height: 250px;
      background: #ffffff;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      .select-payment {
        display: flex;
        justify-content: space-between;
        height: 110px;
        margin: 20px 0;
        button {
          width: 325px;
          height: 110px;
          background-image: linear-gradient(147deg, #fefbe8 0%, #fff9d4 100%);
          border: 1px solid #fff4ab;
          border-radius: 20px;
          font-size: 28px;
          letter-spacing: -0.99px;
        }
        & button:nth-child(2) {
          margin-left: 20px;
        }
        .selected {
          border: 3px solid #e6cc19;
          position: relative;
          .yes {
            position: absolute;
            right: -1px;
            bottom: -1px;
            width: 40px;
            height: 40px;
            display: inline-block;
            background: #e6cc19;
            border-radius: 20.5px 0 20px 0;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            &::after {
              content: "";
              display: block;
              position: absolute;
              left: 60%;
              top: 20%;
              // transform: translate(-50%, -50%);
              width: 20.93px;
              height: 11.95px;
              border: 4px solid #fff;
              border-radius: 4px;
              border-top: none;
              border-right: none;
              -ms-transform: rotate(-45deg) translate(-50%, -50%);
              -webkit-transform: rotate(-45deg) translate(-50%, -50%);
              -moz-transform: rotate(-45deg) translate(-50%, -50%);
              transform: rotate(-45deg) translate(-50%, -50%);
            }
          }
        }
        .cash-icon {
          width: 52.92px;
          height: 57.11px;
          background: url("~@/assets/images/flexibleBilling/cash-icon.png")
            no-repeat;
          background-size: 100% 100%;
        }
        .telephone-icon {
          width: 52.92px;
          height: 57.11px;
          background: url("~@/assets/images/flexibleBilling/telephone-icon.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      .buy-immediately {
        width: 670px;
        height: 80px;
        background-image: linear-gradient(147deg, #fefbe8 0%, #fff9d4 100%);
        border: 1px solid #867500;
        border-radius: 20px;
        font-size: 32px;
        letter-spacing: 0;
      }
    }
  }
}
</style>