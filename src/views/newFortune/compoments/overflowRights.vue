<template>
  <div class="overflowRights">
    <div class="text">
      <span>超值权益</span>
      <span @click="golink('https://fintech.12580life.com/fintech-h5/healthcare/insuranceMall/home?channelCode=bxzq&parchn=xbxzq&gytype=002660')">更多<md-icon name="arrow-right" size="sm"></md-icon></span>
    </div>
    <div class="overflow">
      <div
        v-for="(item, index) in overflowInfo.list"
        class="overflow-item"
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
import { mapState } from 'vuex';

export default {
    name: 'OverflowRights',
    data() {
        return {};
    },
    computed: {
        ...mapState({
            overflowInfo: state => state.newFortune.overflowInfo
        })
    },
    inject: ['golink', 'walletPageConf'],
    async created() {
        await this.walletPageConf({
            name: 'setOverflowInfo',
            infoName: 'overflowInfo',
            localType: '07'
        });
    },
    methods: {}
};
</script>

<style lang="less" scoped>
.overflowRights {
  width: 702px;
  min-height: 386px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  .text {
    margin-top: 20px;
    margin-left: 20px;
    line-height: 45px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 32px;
    color: #25282a;
    letter-spacing: 0.6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span:nth-child(2) {
      font-size: 26px;
      color: #999999;
      letter-spacing: 0.4px;
      margin-right: 15px;
    }
  }
  .overflow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 13px;
    padding: 0 14px;
    min-height: 120px;
    .overflow-item {
      flex: 0 0 calc(33.3%);
      margin-top: 5px;
      .item-bg {
        width: 216px;
        height: 280px;
        margin: 0 auto;
      }
    }
  }
}
</style>
