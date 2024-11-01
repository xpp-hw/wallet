<template>
  <div class="page-marketing">
    <img
      loading="lazy"
      class="page-marketing-image"
      :src="require('@/assets/images/marketing/my.png')"
      @click="recordClick"
    />
    <div class="page-marketing-main">
      <div class="main-content">
        <div>单日限享一次 每人可享2次</div>
        <div class="main-content-list">
          <img
            class="main-content-hb"
            loading="lazy"
            :src="
              require(status > 0
                ? '@/assets/images/marketing/hb-used.png'
                : '@/assets/images/marketing/hb.png')
            "
          />
          <img
            class="main-content-hb"
            loading="lazy"
            :src="
              require(status > 1
                ? '@/assets/images/marketing/hb2-used.png'
                : '@/assets/images/marketing/hb2.png')
            "
          />
        </div>
        <div class="main-content-progress">
          <div class="progress-icon-state">
            <div class="progress-icon-state-item" ref="proItemRef">
              <img
                class="icon-image-money"
                loading="lazy"
                :src="
                  require(status == 0
                    ? '@/assets/images/marketing/money.png'
                    : '@/assets/images/marketing/money1.png')
                "
              />
              <div class="progress-icon-text" v-if="status > 0">已参与</div>
              <img
                class="progress-icon-text1"
                loading="lazy"
                v-else
                :src="require('@/assets/images/marketing/canyu.png')"
              />
            </div>
            <div class="progress-icon-state-item progress-icon-state-item1">
              <img
                class="icon-image-money"
                loading="lazy"
                :src="
                  require(status > 1
                    ? '@/assets/images/marketing/money1.png'
                    : '@/assets/images/marketing/money.png')
                "
              />
              <div class="progress-icon-text" v-if="status > 1">已参与</div>
              <img
                class="progress-icon-text1"
                loading="lazy"
                v-else
                :src="require('@/assets/images/marketing/canyu.png')"
              />
            </div>
          </div>
          <div class="main-content-progress-line" ref="processLineRef">
            <div
              class="main-content-progress-fill"
              :style="{ width: processWidth }"
            ></div>
          </div>
        </div>
        <img
          class="icon-image-submit"
          loading="lazy"
          :src="require('@/assets/images/marketing/btns.png')"
          @click="investClick"
        />
      </div>
    </div>
    <div class="page-marketing-text">
      <p>1、活动时间：即日起至2024年12月31日</p>
      <p>
        2、活动对象：仅限成功使用招行一网通充值的江苏移动号码(无线公话、无线商话、全额代付家庭副号除外)
      </p>
      <p>
        3、参与方式：活动期间，成功使用招行一网通充值即赠送1元话费（限用户登录且为本人充值）
      </p>
      <p>4、参与次数：单用户每日限1次，活动期间限2次</p>
      <p>5、赠送话费3个工作日内自动充至用户的优惠账本</p>
      <p>
        6、该活动不与优惠券叠加享受，以优惠券使用为准，更多解释详见充值需知-“充值赠送券的使用说明”
      </p>
      <p>
        7、用户在享受活动奖品优惠期间不得办理销户、过户、报停业务。客户参与活动即视为理解并同意本活动细则
      </p>
    </div>
    <md-popup v-model="investShow.center">
      <div class="invest-body">
        <div class="invest-body-content">
          <div>您已成功参与该活动</div>
          <div>继续充值仍可享受日常优惠～</div>
          <div class="invest-body-content-ft">
            <div class="ft-button ft-button-plain" @click="investCancel">
              取消
            </div>
            <div class="ft-button" @click="investConfirm">继续充值</div>
          </div>
        </div>
      </div>
    </md-popup>
  </div>
</template>
<script>
import api from "@/common/apiUrls";
import * as store2 from "@/common/localstore";
export default {
  data() {
    return {
      investShow: {},
      status: 0,
      processWidth: 0,
    };
  },
  mounted() {
    this.getOrderCountQuery();
  },
  created() {
    api.getEncrypt({})
    .then((data) => {
      let emsKey = data.encryptKey || ''
      if(process.env.VUE_APP_ENV == 'local' || process.env.VUE_APP_ENV == 'sit') {
        gdp('setUserId', emsKey); // 此处填写用户手机号
      } else {
        if(this.$client.LEADEON) {
          gdp('setUserId', emsKey); // 此处填写用户手机号
        }
      }
    })
  },
  methods: {
    getOrderCountQuery() {
      api
        .orderCountQuery({
          queryTyp: "01",
        })
        .then((res) => {
          this.status = parseInt(res.queryCount);
          this.getProgreeWidth();
        });
    },
    getOrderParaSubmit() {
      if (this.$client.ANDROID) {
        window.location.href =
          "https://touch.10086.cn/i/reapp/v2.0/pages/recharge/recharge.html";
      } else {
        window.open(
          "https://touch.10086.cn/i/reapp/v2.0/pages/recharge/recharge.html",
          "__blank"
        );
      }
    },
    getProgreeWidth() {
      if (this.status == 1) {
        this.processWidth =
          this.$refs.processLineRef.offsetWidth -
          this.$refs.proItemRef.offsetWidth / 2 +
          "px";
        return;
      }
      if (this.status >= 2) {
        this.processWidth = "100%";
        return;
      }
      this.processWidth = this.$refs.proItemRef.offsetWidth / 2 + "px";
    },

    investClick() {
      if (this.status > 0) {
        this.$set(this.investShow, "center", true);
        return;
      }
      this.getOrderParaSubmit();
    },
    investCancel() {
      this.$set(this.investShow, "center", false);
    },
    investConfirm() {
      this.investCancel();
      this.getOrderParaSubmit();
    },
    recordClick() {
      this.$router.push({
        name: "marketingRecord",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.page-marketing {
  &-main {
    background: url("~@/assets/images/marketing/bgImg.png");
    background-size: cover;
  }
  &-text {
    background: url("~@/assets/images/marketing/bgImg1.png");
    background-size: 100% 100%;
    padding: 40px 60px 80px;
    line-height: 40px;
    font-size: 24px;
    color: #666;
    transform: translateY(-2px);
    box-sizing: border-box;
  }
  &-main,
  &-text {
    width: 100%;
    background-repeat: no-repeat;
  }
  &-image {
    width: 118px;
    height: 121px;
    position: fixed;
    top: 348px;
    right: 0;
    z-index: 1;
  }
  .main-content {
    width: 100%;
    padding: 0 70px;
    box-sizing: border-box;
    font-size: 30px;
    color: #643152;
    letter-spacing: 2;
    text-align: center;
    padding-top: 100%;
  }
  .main-content-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 26px 0 12px;
  }
  .main-content-progress {
    padding: 32px 0 76px;
    position: relative;
    &-line {
      height: 16px;
      border-radius: 50px;
      background: #e6e1fb;
      overflow: hidden;
    }
    &-fill {
      transition: width 0.2s linear;
      height: 100%;
      background-image: linear-gradient(to right, #fffcac, #fa6eaa);
      overflow: hidden;
      border-radius: 50px;
    }
  }
  .progress-icon-state {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 8px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .progress-icon-state-item {
    width: 260px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .progress-icon-text {
      font-size: 26px;
      color: #402332;
      height: 42px;
      border-radius: 50px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      background: #dedee2;
    }
    .progress-icon-text,
    .progress-icon-text1 {
      margin-top: 28px;
    }
    .progress-icon-text1 {
      width: 122px;
      height: 42px;
    }
  }
}
.invest-body {
  width: 602px;
  height: 630px;
  background: url("~@/assets/images/marketing/modal-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 280px 56px 0;
  box-sizing: border-box;
  &-content {
    color: #512d40;
    font-size: 32px;
    text-align: center;
  }
  .invest-body-content-ft {
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin-top: 108px;
    .ft-button {
      flex: 0.4;
      border: 1px solid #ff538c;
      background: #ff538c;
      border-radius: 50px;
      padding: 0 28px;
      height: 76px;
      color: #fff;
      font-size: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      &-plain {
        background: transparent;
        color: #ff538c;
      }
    }
  }
}
.main-content-hb {
  width: 260px;
  height: 274px;
}
.icon-image-money {
  width: 58px;
  height: 58px;
}
.icon-image-submit {
  width: 482px;
  height: 120px;
  margin: 54px 0;
}
</style>