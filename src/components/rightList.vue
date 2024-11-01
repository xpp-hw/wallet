<template>
  <div class="cont">
    <div class="top">
      <div class="top-card">
        <p v-if="rightType.indexOf('Bill') > -1">{{ isCum ? '累计话费(元)' : '已领取金额(元)' }}</p>
        <p v-else-if="rightType.indexOf('Flow') > -1">{{ isCum ? '累计流量(GB)' : '已领取流量(GB)' }}</p>
        <p class="num"> <span v-if="rightType.indexOf('Bill') > -1">￥</span> <span style="font-weight:600;font-size:0.52rem">{{ topNum }}</span></p>
      </div>
    </div>
    <div class="list-cont">
      <div class="cont-tit cont-item">
        <span v-if="rightType.indexOf('Bill') > -1" style="font-weight:500;">{{ isCum ? '话费' : '领取时间' }}</span>
        <span v-else-if="rightType.indexOf('Flow') > -1" style="font-weight:500;">{{ isCum ? '流量' : '领取时间' }}</span>
        <span class="subtitle">展示近3个月明细</span>
      </div>
      <div class="cont-item" v-for="(item, idx) in rightList" :key="idx">
        <div>
          <p v-if="isCum">{{rightType.indexOf('Bill') > -1 ? contTit : contTit2 }}</p>
          <p class="time" :class="isCum ? '' : 'middleTxt'">{{ item.time }}</p>
          <p v-if="item.isSucc == '2'" style="color:red;font-size:0.26rem">领取失败</p>
        </div>
        <div>
          <p class="middleTxt">{{ (isCum ? '+ ' : '') + item.num }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'rightList',
  props: {
    isCum: {
      type: Boolean,
      default: true
    },
    topNum: {
      type: String,
      default: '0.00'
    },
    rightList: {
      type: Array,
      default() {
        return [];
      }
    },
    rightType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      topTit: '累计话费(元)',
      contTit: '话费',
      contTit2: '流量',
    };
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
.cont {
  min-height: 100vh;
  background: #F5F5F5;

  .top {
    background: url('../assets/images/bg.png') no-repeat;
    background-size: 100% 180px;
    padding: 0.4rem 0.18rem;

    .top-card {
      // height: 1.6rem;
      background: #fff;
      border-radius: 0.2rem;
      font-size: 0.34rem;
      font-weight: 500;
      line-height: 0.48rem;
      color: #333333;
      padding: 0.22rem;
    }

    .num {
      color: #F45151;
      margin-top: 0.25rem;
      line-height: 0.73rem;
    }
  }

  .list-cont {
    background: #fff;
    margin: 0 0.18rem 0.18rem;
    padding-bottom: 0.8rem;
    border-radius: 0.2rem;

    .cont-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #EEEEEE;
      padding: 0.22rem 0.35rem;
      color: #333333;
      font-size: 0.32rem;
      line-height: 0.45rem;
      font-weight: 500;

      .subtitle {
        color: #666666;
        font-size: 0.3rem;
      }

      .time {
        color: #999999;
        font-size: 0.24rem;
      }

      .middleTxt {
        font-size: 0.36rem;
        line-height: 0.89rem
      }
    }

    .cont-tit {
      font-size: 0.34rem;
      line-height: 0.48rem;
    }
  }
}</style>
