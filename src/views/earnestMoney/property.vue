<template>
    <div class="coat" v-if="state">
     <div class="triangle"></div>
     <div class="content">
        <div class="title">
            <p>交易时间</p>
            <p>交易金额（元）</p>
            <p>交易类型</p>
        </div>
        <div class="list">
            <div class="line" v-for="(item,index) in assetArr" :key="index">
                <p>{{item.transactionTime}}</p>
                <p>{{item.transactionAmount}}</p>
                <p :style="{color:item.color}">{{item.transactionType}}</p>
            </div>
        </div>
        <div class="btn_box">
            <div :class="type" @click="changeShow">{{state}}</div>
            <div class="bg3" @click="goback">返回</div>
        </div>
     </div>

    <div class="mask" v-if="Toast4">
        <div class="modal3">
            <h2 class="title">请注意</h2>
            <p class="text">提前支取需<span>扣除已发放奖励～</span></p>
            <div class="btn_group">
              <p class="think" @click="Toast4=false"></p>
              <p class="continue"  @click="refund">继续退款</p>
            </div>
        </div>
     </div>
     <div class="mask" v-if="Toast5">
        <div class="modal4">
            <h2 class="title">温馨提示</h2>
            <p class="text">{{cause}}</p>
            <div class="btn_group">
              <p class="cancel" @click="Toast5=false"></p>
              <p class="ok" @click="orderThaw"></p>
            </div>
        </div>
     </div>
    </div>
</template>

<script>
import api from '@/common/apiUrls.js';
import * as store2 from '@/common/localstore';
import { Toast } from 'mand-mobile';

export default {
    props: {
        assetArr: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            state: '我要退款',
            type: 'bg2',
            ordno: '',
            cause: '',
            ordsts: '',
            Toast4: false,
            Toast5: false
        };
    },

    methods: {
        goback() {
            this.$router.push('/earnestMoney');
        },
        changeShow() {
            if (this.state === '我要退款' && this.type === 'bg1') {
                this.Toast4 = true;
            } else if (this.state === '解冻失败' || this.state === '退款失败') {
                this.Toast5 = true;
            }
        },
        refund() {
            this.Toast4 = false;
            this.$store.commit('LOADING', true);
            api.Bzj.payRefund({
                ordno: this.ordno
            })
                .then((data) => {
                    this.orderStsQuery();
                })
                .catch((error) => {
                    Toast.info(error.msgInfo);
                    this.orderStsQuery();
                })
                .finally(() => {
                    this.$store.commit('LOADING', false);
                });
        },
        orderThaw() {
            this.Toast5 = false;
            this.$store.commit('LOADING', true);
            if (this.ordsts == '10') {
                this.refund();
            } else if (this.ordsts == '13') {
                api.Bzj.orderThaw({
                    ordno: this.ordno
                })
                    .then((data) => {
                        if (data.msgCd === 'BUS00000') {
                            this.state = '解冻成功';
                            this.type = 'bg2';
                        } else {
                            Toast.info(data.msgInfo);
                        }
                    })
                    .catch((error) => {
                        Toast.info(error.msgInfo);
                    })
                    .finally(() => {
                        this.orderStsQuery();
                        this.$store.commit('LOADING', false);
                    });
            }
        },

        async orderStsQuery() {
            try {
                this.$store.commit('LOADING', true);
                const data = await api.Bzj.orderStsQuery({
                    mobileNo: store2.default.get('usrmob')
                });
                this.ordno = data.ordno;
                this.cause = data.errmsg;
                this.ordsts = data.ordsts;
                switch (data.ordsts) {
                    case '09':
                    case '07':
                    case '03':
                    case '06':
                    case '01':
                    case '02':
                    case '04':
                        this.type = 'bg2';
                        this.state = '我要退款';
                        break;
                    case '05':
                        this.state = '我要退款';
                        this.type = 'bg1';
                        break;
                    case '12':
                        this.state = '解冻成功';
                        this.type = 'bg2';
                        break;
                    case '08':
                    case '11':
                        this.state = '退款中';
                        this.type = 'bg2';
                        break;
                    case '10':
                    case '13':
                        this.state = '解冻失败';
                        this.type = 'bg1';
                        break;
                    default:
                        this.type = 'bg2';
                        this.state = '我要退款';
                        break;
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.$store.commit('LOADING', false);
            }
        }
    },
    created() {
        this.orderStsQuery();
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
        height: 0 ;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid #ffffff;
        margin-left: 170px;

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
            justify-content: space-evenly;
            align-items: center;
            margin-left: 16px;
            margin-top: 25px;
            p{
                font-weight: 700;
                font-size: 28px;
                text-align: center;
                color: #6f3300 ;
                flex: 1;
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
                p:nth-child(2){
                    width: 120px;
                }
            }
        }
        .btn_box{
            width:680px;
            height: 87px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 51px;
            margin-left: 10px;
            .bg1{
                width: 312px;
                height: 87px;
                border-radius:42.5px;
                background: #fd8420;
                text-align: center;
                line-height: 85px;
                font-weight: 500;
                font-size: 34px;
                color: #fff;
            }
            .bg2{
                width: 312px;
                height: 87px;
                border-radius:42.5px;
                background: #999;
                text-align: center;
                line-height: 85px;
                font-weight: 500;
                font-size: 34px;
                color: #fff;
            }
            .bg3{
                width: 312px;
                height: 87px;
                border-radius:42.5px;
                border: 1px solid #b3b3b3;
                text-align: center;
                line-height: 85px;
                font-weight: 500;
                font-size: 34px;
                color: #b3b3b3;
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
      .modal3{
        width: 596px;
        height: 651px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: url('../../assets/images/bigEarnestMoney/modal1.png') no-repeat;
        background-size: 100% , 100%;
        .title{
          margin-top: 152px;
          margin-bottom: 40px;
          font-weight: 500;
          font-size: 48px;
          text-align: center;
          color: #1c1a1b;
        }
        .text{
          color: #565c5b;
          font-weight: 400;
          width: 487px;
          font-size: 36px;
          margin: 0 auto;
          text-align: center;
          line-height: 60px;
          span{
            color: #f6623c;
          }
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
          .think{
            width: 230px;
            height: 82px;
            background: url(../../assets/images/bigEarnestMoney/think.png) no-repeat;
            background-size: cover;
          }
          .continue{
            width: 230px;
            text-align: center;
            line-height: 82px;
            box-sizing: border-box;
            border: 1px solid #6c6c6c;
            border-radius: 38px;
            color: #f06f03;
            font-size: 32px;
          }
        }
    }
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
          color: #1C1A1B;
        }
        .text{
          color: #565c5b;
          font-weight: 400;
          width: 487px;
          font-size: 36px;
          margin: 0 auto;
          text-align: center;
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
