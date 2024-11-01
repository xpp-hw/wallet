<template>
  <div class="upside-adver">
    <md-swiper
      ref="swiper"
      :is-prevent="false"
      :useNative-driver="false"
      :has-dots="false"
    >
      <md-swiper-item :key="index" v-for="(item, index) in upsideAdverInfo.list">
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
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UpsideAdver",
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      upsideAdverInfo: (state) => state.newFortune.upsideAdverInfo,
    }),
  },
  inject: ["golink", "walletPageConf"],
  async created() {
    await this.walletPageConf({
      name: "setUpsideAdverInfo",
      infoName:'upsideAdverInfo',
      localType: "03",
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.upside-adver {
  width: 702px;
  height: 250px;
  margin-top: 20px;
  .banner-item {
    float: left;
    width: 100%;
    height: 100%;
    line-height: 250px;
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
</style>