<template>
  <div class="historyContaion">
    <div class="tip">
      <div v-for="(item,index) in tipList" @click="tipClick(item,index)" class="tip_item" :key="index" :class="tipIndex === index ? 'checkBlue':''">
        {{item.name}}
      </div>
    </div>
    <div class="body">
      <div class="body_box" v-for="item in dataList">
        <div class="item_top">
       <p>签约时间：{{item.time}}</p>
       <p>订单号：{{item.dno}}</p>
        </div>
        <div class="item_bottom">
         <p>
          <span>自动充值阈值</span> <span>10元</span>
         </p>
          <p>
          <span>自动缴费金额</span> <span>50元</span>
         </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            tipIndex: 0,
            tipList: [
                {
                    name: '签约记录'
                },
                {
                    name: '解约记录'
                }
            ],
            dataList: [
                {
                    time: '2022年11月30日 16:12:59',
                    dno: '20221130161259100367'
                },
                {
                    time: '2022年11月30日 16:12:59',
                    dno: '20221130161259100367'
                },
                {
                    time: '2022年11月30日 16:12:59',
                    dno: '20221130161259100367'
                }
            ]
        };
    },
    methods: {
        tipClick(item, index) {
            this.tipIndex = index;
        }
    }
};
</script>
<style lang="less" scoped>
.historyContaion{
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 40px;
  font-size: 26px;
  background: #F9F9FA;
  .tip{
    display: flex;
    border-radius: 8px;
      background: #E6E6E7;
    .tip_item{
      width: 50%;
      height: 90px;
      font-size: 36px;
      line-height: 90px;
      color: #2574FE;
      text-align: center;

    }
    .checkBlue{
      background: #2574FE;
      color: #fff;
      border-radius: 8px;
    }
  }
  .body{
    .body_box{
      margin-top: 30px;
      border-radius: 12px;
      box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.054);
      .item_top{
        background: #F0F6FF;
        border-radius: 12px 12px 0 0;
        padding: 23px;
        color: #737475;
        line-height: 2;
      }
      .item_bottom{
        border-radius:0 0 12px 12px;
        padding:19px 23px;
        line-height: 2;
        font-size: 30px;
        color: #3B3B3B;
        background: #fff;
        p{
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-last-child(1){
            color: #2574FE;
          }
        }
      }
    }
  }
}
</style>
