<template>
  <div class="pop_container">
    <!-- 弹窗 -->
    <div class="pop">
      <div class="pop_title">
        <span>我的奖品</span>
      </div>
      <template v-if="freezeDataList.length > 0">
        <div class="pop_content_title">
          <div
            class="title_item"
            v-for="(item, index) in titleList"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="pop_content">
          <div
            class="pop_content_item"
            v-for="(item, index) in freezeDataList"
            :key="index"
          >
            <div v-if="item.sendTime">{{ item.sendTime.slice(0,4) }}/{{ item.sendTime.slice(4,6) }}/{{ item.sendTime.slice(6,8) }}</div>
            <div>{{ item.activityPrice  }}元话费</div>
            <div>{{ statusData[item.status] }}</div>
          </div>
          <div  v-if="freezeDataList.length > 0" class="close" @click="close"></div>
        </div>
      </template>
      <template v-else>
        <div class="no_data">
          这里空空的～
          <div @click="close" class="no_btn">
            <img src="../../../assets/images/gfBankMargin/ok_btn.png" alt="" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        freezeDataList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            titleList: [
                {
                    name: '时间'
                }, {
                    name: '奖品名称'
                }, {
                    name: '状态'
                }
            ],
            statusData: {
                '00': '待处理',
                '01': '待发放',
                '02': '已处理',
                '03': '发放中',
                '04': '已发放',
                '05': '发放失败'
            }
        };
    },
    methods: {
        close() {
            this.$emit('closePop');
        }
    }
};
</script>

<style lang="less" scoped>
.pop_container {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  .pop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 547px;
    height: 696px;
    background: url("../../../assets/images/gfBankMargin/pop1_bg.png") no-repeat;
    background-size: 100%;
    padding: 266px 20px 0;
    box-sizing: border-box;
    .pop_title {
      text-align: center;
      font-size: 40px;
      font-weight: 500;
      color: #7c1f06;
    }
    .pop_content {
      height: 240px;
      overflow-y: auto;
      .pop_content_item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 14px 0;
        font-weight: 500;
        div{
           text-align: center;
          font-size: 24px;
          color: #823713;
        }
        div:nth-child(1){
          width: 30%;
        }
        div:nth-child(2){
          width: 40%;
        }
        div:nth-child(3){
          width: 30%;
        }
        div:nth-of-type(3){
          color: red;
        }
      }
    }
    .pop_content_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      .title_item {
        padding: 13px 47px;
        background-image: linear-gradient(to bottom, #ffdbc1 32%, #fff7ef 100%);
      }
    }
    .no_data {
      text-align: center;
      font-size: 30px;
      color: #af2500;
      margin-top: 70px;
      .no_btn {
        width: 316px;
        height: 146px;
        margin: 100px auto 0;
        img {
          width: 100%;
        }
      }
    }
  }
  .close {
    width: 66px;
    height: 66px;
    background: url("../../../assets/images/gfBankMargin/close_btn.png")
      no-repeat;
    background-size: 100%;
    position: absolute;
    bottom: -130px;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
