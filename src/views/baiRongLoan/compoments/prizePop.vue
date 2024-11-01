<template>
  <div class="prize_container">
    <!-- 奖品列表 -->
    <div class="prize_wrap" v-if="prizeList.length > 0">
      <div class="prize_list">
        <div class="prize_item" v-for="(item, index) in prizeList" :key="index">
          <div class="prize_name">{{ activityData[item.atyId] }}</div>
          <div :class="item.sts === '1' ? 'blue' : 'orange'">
            {{ item.sts === '1' ? "领取成功" : "领取失败" }}
          </div>
          <div v-if="item.fihTm">{{ item.fihTm.slice(0,4) }}-{{ item.fihTm.slice(4,6) }}-{{ item.fihTm.slice(6,8) }}</div>
        </div>
      </div>
      <div class="prize_btn" @click="closePrize"></div>
    </div>
    <div class="no_prize_list" v-else>
      <div class="prize_btn" @click="closePrize"></div>
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            prizeList: [],
            activityData: {
                // 测试id
                ATY230321000117514: '5GB流量',
                ATY230321000117521: '20元话费',
                ATY231025000203501: '10GB流量',
                // 生产id
                ATY230321007275553: '5GB流量',
                ATY230321007275560: '20元话费',
                ATY231025007317606: '10GB流量'
            }
        };
    },
    mounted() {
        this.getMyPrizeList();
    },
    methods: {
        getMyPrizeList() {
            api.baiRong.getMyPrizeList().then((res) => {
                this.prizeList = res.data;
            });
        },
        closePrize() {
            this.$emit('closePrize');
        }
    }
};
</script>

<style lang="less" scoped>
.prize_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  .prize_wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 574px;
    height: 684px;
    background: url("../../../assets/images/baiRongLoan/prize_list_bg.png")
      no-repeat;
    background-size: 100%;
    padding: 337px 37px 64px;
    box-sizing: border-box;
    .prize_list {
      height: 200px;
      overflow-y: auto;
      margin-bottom: 20px;
      .prize_item {
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        line-height: 1.5;
        border-bottom: 1px solid #dcdcdc;
        padding: 10px 0;
        div:nth-of-type(1) {
          font-weight: bold;
          width: 140px;
          text-align: center;
          display: flex;
          align-items: center;
        }
        div:nth-of-type(2) {
          font-weight: bold;
           display: flex;
          align-items: center;
        }
         div:nth-of-type(3) {
           display: flex;
          align-items: center;
        }
      }
    }
  }
  .no_prize_list {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 566px;
    height: 540px;
    background: url("../../../assets/images/baiRongLoan/prize_not_bg.png")
      no-repeat;
    background-size: 100%;
    padding: 387px 37px 64px;
    box-sizing: border-box;
  }
  .blue {
    color: #096fed;
  }
  .orange {
    color: #ff783c;
  }
  .prize_btn {
    background: url("../../../assets/images/baiRongLoan/back_btn.png") no-repeat;
    background-size: 100%;
    height: 81px;
    width: 291px;
    margin: auto;
  }
}
</style>
