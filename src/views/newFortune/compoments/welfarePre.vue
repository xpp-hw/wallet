<template>
  <div class="welfarePre">
    <div class="text">更多福利</div>
    <div class="icon"></div>
    <div class="welfare">
      <div
        v-for="(item, index) in welfarePreInfo.list"
        class="welfare-item"
        :key="index"
      >
        <div
          class="item-bg"
          :style="{
            backgroundImage: `url(${item.logo})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }"
          @click="golink(item.jumpUrl)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WelfarePre",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      welfarePreInfo: (state) => state.newFortune.welfarePreInfo,
    }),
  },
  inject: ["golink", "walletPageConf"],
  async created() {
    await this.walletPageConf({
      name: "setWelfarePreInfo",
      infoName: "welfarePreInfo",
      localType: "05",
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.welfarePre {
  position: relative;
  margin-top: 20px;
  width: 702px;
  min-height: 212px;
  background-image: linear-gradient(174deg, #eef6ff 0%, #fdfeff 93%);
  border-radius: 10px;
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
  .icon {
    position: absolute;
    top: 8px;
    left: 546px;
    width: 117px;
    height: 117px;
    opacity: 0.24;
    background-image: linear-gradient(179deg, #aae6ff 0%, #e5f5ff 55%);
  }
  .welfare {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 13px;
    padding: 0 14px;
    min-height: 120px;

    .welfare-item {
      flex: 0 0 calc(33.3%);
      margin-top: 5px;
      .item-bg {
        width: 220px;
        height: 120px;
        margin: 0 auto;
      }
    }
  }
}
</style>