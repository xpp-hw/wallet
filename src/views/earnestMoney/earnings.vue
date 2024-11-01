<template>
    <div class="coat">
     <div class="triangle"></div>
     <div class="content">
        <div class="title">
            <p>时间</p>
            <p>奖励</p>
            <p>状态</p>
        </div>
        <div class="list">
            <div class="line" v-for="(item,index) in equityArr" :key="index">
                <p>{{item.receiveTime}}</p>
                <p :style="{color:'#FF601A'}">{{item.actAmt}}</p>
                <p @click="reissue(item)" :style="item.receiveStuatus==='发放失败'?{color:'#FF601A'}:{color:'#04BD3D'}">{{item.receiveStuatus}}</p>
            </div>
        </div>
     </div>
     <div class="mask" v-if="Toast5">
        <div class="modal4">
            <h2 class="title">温馨提示</h2>
            <p class="p1">奖品发放失败。是否发起重试</p>
            <p class="text">{{cause}}</p>
            <div class="btn_group">
              <p class="cancel" @click="Toast5=false"></p>
              <p class="ok" @click="rightsEquities"></p>
            </div>
        </div>
     </div>
    </div>
</template>

<script>

import api from '@/common/apiUrls.js';
import { Toast } from 'mand-mobile';

export default {
    props: {
        equityArr: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            Toast5: false,
            cause: '',
            id: '',
            itemData: {}
        };
    },
    computed: {
    },
    methods: {
        reissue(item) {
            this.itemData = item;
            if (item.receiveStuatus === '发放失败') {
                this.Toast5 = true;
                this.id = item.id;
            }
        },
        rightsEquities() {
            this.Toast5 = false;
            this.$store.commit('LOADING', true);
            api.Bzj.rightsEquities({
                benefitId: this.id
            })
                .then((data) => {
                    if (data.msgCd === 'BUS00000') {
                        this.itemData.receiveStuatus = '已发放';
                    }
                })
                .catch((error) => {
                    Toast.info(error.msgInfo);
                })
                .finally(() => {
                    this.$store.commit('LOADING', false);
                });
        }
    },
    mounted() {

    }
};
</script>

<style lang="less" scoped>
.coat{
    width: 702px;
    height: 845px;
    margin-left: 24px;
    .triangle{
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid #ffffff;
        margin-left: 530px;
    }
    .content{
        width: 702px;
        height: 845px;
        background-color: #ffffff !important;
        border-radius: 20px;
        overflow: hidden;
        .title{
            width: 670px;
            height: 82px;
            background-color: #fff9e7;
            border-radius: 16px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-left: 16px;
            margin-top: 25px;
            p{
                font-weight: 700;
                font-size: 28px;
                text-align: center;
                color: #6f3300 ;
            }
        }
        .list{
            width:  670px;
            height:506px;
            overflow-y: auto;
            margin-left: 16px;
            .line{
                width: 670px;
                height: 52px;
                display: flex;
                justify-content: space-around;
                font-weight: 500;
                font-size: 24px;
                text-align: center;
                color: #676767;
                margin-top: 31px;
                border-bottom: 1px solid #ebebeb;

              p{
                flex: 1;
            }
            }
        }
    }
}

.mask{
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      .modal4{
        width: 596px;
        height: 651px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: url(../../assets/images/bigEarnestMoney/modal1.png) no-repeat;
        background-size: 100% 100%;
        .title{
          margin-top: 152px;
          margin-bottom: 40px;
          font-weight: 500;
          font-size: 48px;
          text-align: center;
          color: #1c1a1b;
        }
        .p1{
          text-align: center;
          font-size: 40px;
          margin-bottom: 20px;
        }
        .text{
          color: #565c5b;
          font-weight: 400;
          width: 487px;
          font-size: 36px;
          margin: 0 auto;
          text-align: center;
          margin-bottom: 60px;
          line-height: 60px;
        }
        .btn_group{
          width: 480px;
          height: 82px;
          margin: 0 auto;
          display: flex;
          position: absolute;
          left: 60px;
          top: 480px;
          justify-content: space-between;
          align-items: center;
          .cancel{
            width: 230px;
            height: 82px;
            background: url(../../assets/images/bigEarnestMoney/cancel.png) no-repeat;
            background-size: cover;
          }
          .ok{
            width: 230px;
            height: 82px;
            background: url(../../assets/images/bigEarnestMoney/ok.png) no-repeat;
            background-size: cover;
          }
        }
      }
}
</style>
