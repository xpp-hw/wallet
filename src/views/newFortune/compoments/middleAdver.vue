<template>
  <div class="middle-adver">
    <div class="left-swiper">
      <div v-if="middleAdverLeftInfo.list.length >= 2" class="tip">
        {{ currentIndex + "/" + middleAdverLeftInfo.list.length }}
      </div>
      <md-swiper
        ref="swiper"
        :is-prevent="false"
        :useNative-driver="false"
        :has-dots="false"
        @after-change="afterChange"
      >
        <md-swiper-item
          :key="item.sortNo"
          v-for="item in middleAdverLeftInfo.list"
        >
          <div
            class="banner-item"
            :style="{
              backgroundImage: `url(${item.logo})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
            @click="golink(item.jumpUrl)"
          ></div>
        </md-swiper-item>
      </md-swiper>
    </div>
    <div class="right-hotspot">
      <div
        class="item top"
        :style="{
          backgroundImage: `url(${middleAdverRightInfo.list[0].logo})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
        @click="golink(middleAdverRightInfo.list[0].jumpUrl)"
      ></div>
      <div
        class="item bottom"
        :style="{
          backgroundImage: `url(${middleAdverRightInfo.list[1].logo})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
        @click="golink(middleAdverRightInfo.list[1].jumpUrl)"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // 中部广告位
  name: "MiddleAdver",
  data() {
    return {
      currentIndex: "",
    };
  },
  computed: {
    ...mapState({
      middleAdverLeftInfo: (state) => state.newFortune.middleAdverLeftInfo,
      middleAdverRightInfo: (state) => state.newFortune.middleAdverRightInfo,
    }),
  },
  inject: ["golink", "walletPageConf"],
  async created() {
    await this.walletPageConf({
      name: "",
      infoName: "",
      localType: "04",
    });
  },
  methods: {
    afterChange(from, to) {
      this.currentIndex = (from + 1).toString();
    },
  },
};
</script>

<style lang="less" scoped>
.middle-adver {
  width: 702px;
  height: 400px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-swiper {
    position: relative;
    width: 344px;
    height: 400px;
    .tip {
      position: absolute;
      top: 369px;
      left: 290px;
      width: 46px;
      height: 25px;
      opacity: 0.5;
      background: #000000;
      border-radius: 12.5px;
      z-index: 999;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
      text-align: center;
    }
    .banner-item {
      float: left;
      width: 100%;
      height: 100%;
      line-height: 400px;
      text-align: center;
      font-size: 28px;
      color: #fff;
      box-align: center;
      align-items: center;
      box-pack: center;
      justify-content: center;
      text-decoration-line: none;
    }
  }
  .right-hotspot {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 344px;
    height: 400px;
    .item {
      width: 344px;
      height: 193px;
    }
    .bottom {
      margin-top: 14px;
    }
  }
}
</style>