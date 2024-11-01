<template>
<div class="couponSreceive_container">
  <div class="body">
    <div class="body_item" v-for="(item,index) in dataList" :key="index">
      <div class="item_title">{{item.name}}</div>
      <div class="item">
        <p></p>
        <div class="item_btn" @click="receive(item)">{{!receiveFlag ? '立即领取' : '已领取'}}</div>
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
            dataList: [
                {
                    name: '江苏移动和包券兑换银联券测试',
                    icon: 'icon-youhui',
                    url: '/pages/coupon/coupon'
                }
            ],
            receiveFlag: false
        };
    },
    mounted() {
        this.queryList();
    },
    methods: {
        queryList() {
            this.$store.commit('LOADING', true);
            api.cmpayUnionpaylist({ atyId: 'ATY231206000221025' }).then((res) => {
                if (res.prizeList.length > 0) {
                    this.receiveFlag = true;
                }
            }).catch((err) => {
                this.$toast.info(err.resMsg);
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        receive(item) {
            if (!this.receiveFlag) {
                this.$store.commit('LOADING', true);
                api.cmpayReceive({ atyId: 'ATY231206000221025' }).then((res) => {
                    this.$toast.info(res.resMsg);
                    this.queryList();
                }).catch((err) => {
                    this.$toast.info(err.resMsg);
                }).finally(() => {
                    this.$store.commit('LOADING', false);
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
  .couponSreceive_container{
    height: 100%;
    box-sizing: border-box;
    padding: 40px 40px;
     .body_item{
      padding: 20px 30px 20px 200px;
      height: 1.9rem;
      box-shadow: 2px 3px 8px 0 #e5e5e5;
      margin-bottom: 30px;
      border-radius: 20px;
      background: url('../../assets/images/banks/zsqyBg.png') no-repeat;
      background-size: 100%;
      box-sizing: border-box;
      .item_title{
        height: 100px;
        line-height: 1.5;
        font-size: 30px;
        font-weight: 500;
      }
      .item{
        display: flex;
        align-items: center;
        p{
          flex: 1;
          color: red;
          font-size: 38px;
          font-weight: 500;
        }
        .item_btn{
          padding: 10px 30px;
          background: #ff9217;
          color: #fff;
          border-radius: 10px;
        }
      }

    }
    .no_list{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      font-size: 40px;
      color: #969696;
    }
  }
</style>
