<template>
  <div class="my-rights">
    <!-- 开始绑定loading效果 -->
    <div v-if="loading" class="loading-toast">
      <img alt="" src="@/assets/images/loading-toast.gif" />
    </div>
    <div v-if="rightsList.length == 0" class="kkry"></div>
    <template v-else>
      <div class="rights-item" v-for="item in rightsList" :key="item.id">
        <div class="item-top">
          <div
            class="top-icon"
            :style="{
              backgroundImage: `url(${require('@/assets/images/flexibleBilling/' +
                icons.get(item.productId) +
                '-icon.png')})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          ></div>
          <div class="top-title">{{ item.productName }}</div>
        </div>
        <div class="item-content">
          <div
            class="item-ticket"
            :style="{
              backgroundImage: `url(${require('@/assets/images/flexibleBilling/' +
                icons.get(item.productId) +
                '-icon-bg.png')})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            <div class="ticket-content">
              <div class="ticket-content-text">
                <div class="text1">{{ item.benefitItemName }}</div>
                <div v-if="item.receiveTime" class="text2">
                  领取时间：{{
                    item.receiveTime.slice(0, 4) +
                    "年" +
                    item.receiveTime.slice(4, 6) +
                    "月" +
                    item.receiveTime.slice(6, 8) +
                    "日"
                  }}
                </div>
                <div v-else class="text2"></div>
              </div>
              <div class="ticket-content-btn">
                <button
                  v-if="
                    item.orderStatus == '2' ||
                    item.orderStatus == '3' ||
                    item.orderStatus == '4' ||
                    item.orderStatus == '6'
                  "
                  @click="userBenefitReceive(item)"
                  :style="{
                    background: '#0098FF',
                  }"
                >
                  去领取
                </button>
                <button
                  v-else-if="item.orderStatus == '5'"
                  :style="{
                    background: '#c0c2c0',
                  }"
                >
                  已失效
                </button>
                <button
                  v-else
                  :style="{
                    background: '#ee8452',
                  }"
                >
                  生效中
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-if="isTankuang" class="tankuang">
      <div v-if="success" class="success">
        <div class="title">温馨提示</div>
        <div class="fu-title">
          您的权益领取<span style="color: #0098ff">成功</span>
        </div>
        <button class="confirm" @click="closeTankuang">确定</button>
        <div class="bank_close" @click="closeTankuang"></div>
      </div>
      <div v-if="fail" class="fail">
        <div class="title">温馨提示</div>
        <div class="fu-title">
          您的权益领取<span style="color: #ff0000">失败</span>
        </div>
        <button class="confirm" @click="closeTankuang">确定</button>
        <div class="bank_close" @click="closeTankuang"></div>
      </div>
      <div v-if="drawing" class="drawing">
        <div class="title">温馨提示</div>
        <div class="fu-title">领取中，请稍后</div>
        <button class="confirm" @click="closeTankuang">确定</button>
        <div class="bank_close" @click="closeTankuang"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as store2 from "@/common/localstore";
import api from "@/common/apiUrls";
export default {
  name: "myRights",
  data() {
    return {
      rightsList: [],
      loading: false,
      isTankuang: false,
      success: false,
      fail: false,
      drawing: false,
    };
  },
  created() {
    this.queryBenefitInfo();
  },
  inject: ["productIds", "icons"],
  methods: {
    closeTankuang() {
      this.success = false;
      this.fail = false;
      this.drawing = false;
      this.isTankuang = false;
      this.queryBenefitInfo();
    },
    // 查询权益
    async queryBenefitInfo() {
      this.loading = true;
      try {
        const data = await api.flexibleBilling.queryBenefitInfo({
          mobile: store2.default.get("usrmob"),
          productList: this.productIds,
        });
        this.rightsList = data.list || [];
        console.log(data.list);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // 领取权益
    async userBenefitReceive(item) {
      // 订单状态 1-成功、2-失败、3-处理中、4-待领取、5-退订、6-领取中
      if (item.orderStatus == "3" || item.orderStatus == "6") {
        this.isTankuang = true;
        this.drawing = true;
        return;
      }
      try {
        this.$store.commit("LOADING", true);
        let params = {
          mobileNo: store2.default.get("usrmob"),
          productBenefitId: item.productBenefitId,
        };
        console.log(params);
        const data = await api.flexibleBilling.userBenefitReceive(params);
        if (data.msgCd == "BUS00000") {
          //   this.$toast.info("领取成功！");
          this.isTankuang = true;
          this.success = true;
        } else {
          //   this.$toast.info("领取失败！");
          this.isTankuang = true;
          this.fail = true;
        }
        console.log(data.benefitInfoDTOList);
      } catch (error) {
        this.$toast.info("网络开小差了，请稍后重试");
        console.log(error);
      } finally {
        this.$store.commit("LOADING", false);
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-rights {
  height: 100vh;
  background-color: #f0f4fa;
  overflow-y: auto;
  padding: 0 20px;
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
    .success,
    .fail,
    .drawing {
      position: relative;
      width: 600px;
      height: 375px;
      border-radius: 16px;
      background: url("~@/assets/images/flexibleBilling/confirm-bg.png")
        no-repeat;
      background-size: 100%;
      .title {
        font-family: PingFang-SC-Bold;
        font-weight: 700;
        font-size: 40px;
        color: #333333;
        text-align: center;
        margin-top: 55px;
      }
      .fu-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 34px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        margin-top: 46px;
      }
      .confirm {
        position: absolute;
        bottom: 61px;
        left: 50%;
        transform: translateX(-50%);
        width: 220px;
        height: 60px;
        background: #0098ff;
        border-radius: 8px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 32px;
        color: #ffffff;
      }
      .bank_close {
        position: absolute;
        left: 50%;
        bottom: -130px;
        transform: translateX(-50%);
        width: 51px;
        height: 51px;
        background: url("~@/assets/images/worryFinance/close.png") no-repeat;
        z-index: 1000;
        background-size: 100% 100%;
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
  .kkry {
    width: 466.16px;
    height: 367px;
    background: url("~@/assets/images/flexibleBilling/kkry-bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 51px auto 0;
  }
  .rights-item {
    width: 710px;
    height: 259px;
    background: #ffffff;
    box-shadow: 0 3px 9px 0 #e3e3e3;
    border-radius: 10px;
    margin: 30px 0;
    overflow: hidden;
    .item-top {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .top-icon {
        width: 82px;
        height: 82px;
        margin-left: 16px;
      }
      .top-title {
        font-family: PingFang-SC-Bold;
        font-weight: 700;
        font-size: 32px;
        color: #313131;
      }
    }
    .item-content {
      display: flex;
      justify-content: flex-end;
      .item-ticket {
        display: flex;
        // justify-content: flex-end;
        box-sizing: border-box;
        width: 576px;
        height: 140px;
        margin-right: 21px;
        padding-left: 160px;
        .ticket-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-family: PingFang-SC-Bold;
          font-weight: 700;
          .ticket-content-text {
            .text1 {
              font-size: 32px;
              color: #333333;
            }
            .text2 {
              margin-top: 16px;
              font-weight: 400;
              font-size: 18px;
              color: #999999;
            }
          }
          .ticket-content-btn {
            margin-right: 20px;
            font-size: 28px;
            color: #ffffff;
            button {
              width: 120px;
              height: 46px;
              background: #0098ff;
              border-radius: 23px;
            }
          }
        }
      }
    }
  }
}
</style>