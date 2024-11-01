<template>
  <div class="listThird">
    <div
      :id="'C0' + (index + 1)"
      class="listThird-item"
      v-for="(item, index) in gridList.list"
      :key="index"
      @click="golink(item.jumpUrl)"
    >
      <div class="item">
        <img :src="item.logo" />
        <div class="cushion"></div>
        <p>
          {{ item.bannerName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GridList",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      gridList: (state) => state.newFortune.gridList,
    }),
  },
  inject: ["golink", "walletPageConf"],
  async created() {
    await this.walletPageConf({
      name: "setGridList",
      infoName: "gridList",
      localType: "02",
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.listThird {
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 702px;
  min-height: 188px;
  background: #fff;
  border-radius: 12px;
  padding: 29px 30px 28px 30px;
  text-align: center;
  .listThird-item:first-of-type {
    margin-left: unset;
  }
  .listThird-item:nth-of-type(6n) {
    margin-left: unset;
  }
  .listThird-item {
    flex: calc(20%-65.5px);
    // flex: calc(20%);
    margin-top: 8px;
    margin-left: 48.63px;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      img {
        width: 76px;
        height: 76px;
      }
      .cushion {
        height: 48px;
      }
      p {
        position: absolute;
        top: 76px;
        margin-top: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        font-size: 24px;
        line-height: 33px;
        color: #333333;
        text-align: center;
        white-space: nowrap;
      }
    }
  }
}
</style>