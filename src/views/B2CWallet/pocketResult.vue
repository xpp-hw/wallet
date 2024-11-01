<template>
  <div class="pocketResult_container">
    <!-- 加载中 -->
    <div v-if="status === '00'" class="load_icon"></div>
    <!-- 成功 -->
    <div v-if="status === '03'" class="success_icon"></div>
    <!-- 申请成功 -->
    <div  v-if="status === '01'" class="apply_icon"></div>
    <!-- 失败 -->
    <div  v-if="status === '02'" class="error_icon"></div>
    <div v-if="status === '00'" class="title">{{statusData[statusType]}}中，请稍等<span class="dot">...</span></div>
    <div v-if="status === '03'"  class="title">{{statusData[statusType]}}成功</div>
    <div v-if="status === '01'"  class="title">{{statusData[statusType]}}申请成功，等待银行处理</div>

    <!-- 提示信息 -->
    <p v-if="status !== '00'" class="sur_title">{{resMsg}}</p>

    <!-- 列表 -->
    <div v-if="status !== '00' && status !== '02'" class="data_wrap">
      <div class="data_item" v-for="(item, index) in dataList" :key="index">
        <span class="name" >{{ item.name }}</span>
        <span class="content">{{ item.content }}</span>
      </div>
    </div>
    <!-- 按钮 -->
    <div v-if="status !== '00'" class="btn" @click="$router.push({name:'myMoney'})">完成</div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    // statusType 04:充值 05：提现 03:转账
    data() {
        const statusData = {
            '04': '充值',
            '05': '提现',
            '03': '转账'
        };
        const bankType = {
            '04': '支付银行',
            '05': '到账银行',
            '03': '收款号码'
        };
        return {
            status: '00', // 订单状态 00:初始化 01:处理中 02:失败 03:成功 04:已退款 ,
            resMsg: '',
            dataList: [
                {
                    name: `${statusData[this.$route.query.statusType]}金额`,
                    content: ''
                },
                {
                    name: `${bankType[this.$route.query.statusType]}`,
                    content: ''
                },
                {
                    name: '流水单号',
                    content: this.$route.query.orderId
                }
            ],
            statusType: this.$route.query.statusType,
            statusData,
            queryNum: 0
        };
    },
    mounted() {
        this.queryResult();
    },
    methods: {
        queryResult() {
            api.B2CWallet.orderResult(this.$route.query.orderId).then((res) => {
            // 订单状态  01:处理中 02:失败 03:成功 04:已退款 ,
                this.dataList[0].content = `¥${res.orderAmt}`;
                this.dataList[1].content = res.bankCardNo || res.payeeMobile;
                this.resMsg = res.orderState === '03' ? '您可在账单中查询您的交易记录～' : '预计2小时到账，请以银行处理为准！';
                if (res.orderState !== '03' && this.queryNum < 5) {
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        this.queryNum += 1;
                        this.queryResult();
                    }, 5000);
                } else {
                    this.status = res.orderState;
                }
            }).catch((err) => {
                this.status = '02';
                this.resMsg = err.resMsg;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.pocketResult_container {
  padding: 0 42px;
  box-sizing: border-box;
  .load_icon {
    background: url("../../assets/images/B2Cwallet/load_icon.png") no-repeat;
    background-size: 100%;
    height: 175px;
    width: 256px;
    margin: 80px auto 72px;
  }
  .success_icon {
    background: url("../../assets/images/B2Cwallet/success_icon.png") no-repeat;
    background-size: 100%;
    height: 177px;
    width: 256px;
    margin: 80px auto 72px;
  }
  .error_icon {
    background: url("../../assets/images/B2Cwallet/error_icon.png") no-repeat;
    background-size: 100%;
    height: 177px;
    width: 256px;
    margin: 80px auto 72px;
  }
  .apply_icon {
    background: url("../../assets/images/B2Cwallet/apply_icon.png") no-repeat;
    background-size: 100%;
    height: 212px;
    width: 278px;
    margin: 80px auto 72px;
  }
  .data_wrap {
    font-size: 28px;
    .data_item {
      padding: 30px 0;
      border-bottom: 0.5px solid #ebebeb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span:nth-of-type(1) {
        color: #68696a;
      }
      span:nth-of-type(2) {
        color: #333535;
        font-weight: 500;
      }
    }
    .data_item:nth-last-child(1) {
      border: none;
    }
  }
  .btn {
    width: 100%;
    height: 80px;
    background: #26A1FC;
    border-radius: 10px;
    color: #fff;
    font-size: 36px;
    font-weight: 500;
    margin-top: 200px;
    line-height: 80px;
    text-align: center;
    &:active {
      background: #0088f0;
    }
  }
}
.title {
  font-size: 44px;
  color: #333333;
  display: flex;
  justify-content: center;
}
.sur_title {
  text-align: center;
  font-weight: 400;
  font-size: 28px;
  color: #a2a3a4;
  margin: 20px 0;
}
.dot {
  font-family: simsun; /*固定字体避免设置的宽度无效*/
  animation: dot 1s infinite step-start;
  display: inline-block;
  width: 1.5em;
  vertical-align: bottom; /*始终让省略号在文字的下面*/
  overflow: hidden;
}
@keyframes dot {
  /*动态改变显示宽度, 但始终让总占据空间不变, 避免抖动*/
  0% {
    width: 0;
    margin-right: 1.5em;
  }
  33% {
    width: 0.5em;
    margin-right: 1em;
  }
  66% {
    width: 1em;
    margin-right: 0.5em;
  }
  100% {
    width: 1.5em;
    margin-right: 0;
  }
}
</style>
