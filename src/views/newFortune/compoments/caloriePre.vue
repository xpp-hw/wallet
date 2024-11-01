<template>
  <div class="caloriePre">
    <div class="text">热卡专区</div>
    <!-- <div class="caloriePre-swiper">
      <md-swiper ref="swiper" :is-prevent="false" :useNative-driver="false">
        <md-swiper-item
          :key="index"
          v-for="(item, index) in caloriePreInfo.list"
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
    </div> -->

    <div
      class="caloriePre-swiper"
      :key="index"
      v-for="(item, index) in caloriePreInfo.list"
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
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CaloriePre",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      caloriePreInfo: (state) => state.newFortune.caloriePreInfo,
    }),
  },
  inject: ["golink", "walletPageConf"],
  async created() {
    await this.walletPageConf({
      name: "setCaloriePreInfo",
      infoName: "caloriePreInfo",
      localType: "06",
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.caloriePre {
  width: 702px;
  //height: 283px;
  margin-top: 20px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  .text {
    margin-top: 18px;
    margin-left: 20px;
    line-height: 45px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 32px;
    color: #25282a;
    letter-spacing: 0.6px;
    text-align: left;
  }
  .caloriePre-swiper {
    width: 674px;
    height: 177px;
    margin: 13px auto 0;
    /deep/ .md-swiper-indicators {
      bottom: -20px;
    }
    .banner-item {
      float: left;
      width: 674px;
      height: 177px;
      line-height: 177px;
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
}
</style>