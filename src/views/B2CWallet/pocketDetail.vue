<template>
  <div class="pocketDetail_container">
    <div class="title_wrap">
      <div class="title_item" v-for="(item,index) in titleList" :key="item" @click="handleChange(item,index)">
        <span :class="handleIndex === index ? 'active_text' : ''">{{ item }}</span>
        <div :class="handleIndex === index ? 'active' : ''"></div>
      </div>
    </div>
    <div class="pocketDetail_body">
      <div class="pocketDetail_item" v-for="(item,index) in dataList" :key="index" @click="check(item)">
        <div class="pocketDetail_item_left">
         <span>{{ item.orderType === '01' ? '充值' : item.orderType === '02' ? '转账' :'提现' }}</span><span :style="orderStateType[item.orderState].color">{{orderStateType[item.orderState].name}}</span>
          <p>{{item.orderDate}}</p>
        </div>
        <div class="pocketDetail_item_right" :style="item.orderType === '01' ? 'color:#26A1FC' : ''">
          {{ item.orderType === '01' ? '+' : '-' }}{{ item.orderAmt }}
          <div class="arrow_right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {

    data() {
        return {
            titleList: ['全部', '支出', '收入'],
            handleIndex: 0,
            dataList: [],
            dataListCopy: [],
            orderStateType: {
                '00': { name: '待处理', color: 'color:#198cff;background:#d9eaff' },
                '01': { name: '处理中', color: 'color:#198cff;background:#d9eaff' },
                '02': { name: '失败', bg: '', color: '' },
                '03': { name: '成功', color: 'color:#2aa354;background:#d5ffd9' },
                '04': { name: '已退款', color: 'color:#2aa354;background:#d5ffd9' }
            }
        };
    },
    mounted() {
        this.queryOrderList();
    },
    methods: {
        queryOrderList() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.orderList().then((res) => {
                // 订单类型orderType: 01:充值 02:转账 03:提现 ,
                // orderState (string, optional): 订单状态 00:待处理 01:处理中 02:失败 03:成功 04:已退款 ,
                this.dataList = res.list;
                this.dataListCopy = res.list;
            }).catch(() => {

            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        handleChange(item, index) {
            this.handleIndex = index;
            if (item === '支出') {
                this.dataList = this.dataListCopy.filter(i => i.orderType !== '01');
            } else if (item === '收入') {
                this.dataList = this.dataListCopy.filter(i => i.orderType === '01');
            } else {
                this.dataList = this.dataListCopy;
            }
        },
        check(item) {
            this.$router.push({
                name: 'billingDetails',
                query: {
                    id: item.id
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.pocketDetail_container {
  overflow: hidden;
  .title_wrap {
    // height: 100px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32px;
    padding-top:30px;
    .title_item {
      position: relative;
      width: 33.33%;
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 0.5px solid #eaeaea;
      box-sizing: border-box;
      .active_text{
        font-weight: bold;
        color: #0871ff;
      }
      .active {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 0;
        width: 64px;
        height: 4px;
        background: #0871ff;
        border-radius: 3.5px;
      }
    }
  }
  .pocketDetail_body{
    height: 1200px;
    overflow-y: auto;
    .pocketDetail_item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 30px;
      padding: 25px 0;
      border-bottom: 0.5px solid #eaeaea;
      letter-spacing: 0.5px;
      .pocketDetail_item_left{
        line-height: 1.5;
        font-size: 24px;
        span:nth-of-type(1){
          font-size: 30px;
        }
        span:nth-of-type(2){
          background: #FFF2EA;
          color: #FA6C22;
          padding: 2px 5px;
          border-radius: 2px;
          margin-left: 10px;
        }
        p{
          color: #979797;

        }
      }
      .pocketDetail_item_right{
          font-weight: 500;
          font-size: 30px;
          display: flex;
          align-items: center;
          .arrow_right{
            width: 18px;
            height: 18px;
            border-left: 3px solid #939393;
            border-bottom: 3px solid #939393;
            transform: rotate(-135deg);
            border-radius: 2px;
            margin-left: 10px;
          }
      }
    }
  }
}
</style>
