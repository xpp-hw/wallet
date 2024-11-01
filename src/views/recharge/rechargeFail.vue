<template>
   <div class="contains">
        <div class="sucMsg">
            <div class="sucLoge">
                <img src="../../assets/images/recharge/rechargeFail.png" alt="">
                <p class="suc">充值失败</p>
                <p class="msg">您可在账单中查询您的充值记录</p>
            </div>
        </div>
        <p class="reasonTxt" v-if="linkIndex<0">失败原因：{{reason}}</p>
        <p class="reasonTxt" v-else style="color:#999">
            失败原因：{{reason.slice(0,linkIndex)}}
            <span class="linkText" @click="goGuid">手工转账</span>
            {{reason.slice(linkIndex+4)}}
        </p>
        <md-field>
            <md-detail-item title="充值金额" :content="amount" />
            <md-detail-item title="支付银行" :content="payBank" />
            <md-detail-item title="流水单号" :content="orderId" />
        </md-field>
        <md-button class="transferBtn" id="A01" @click="$router.push({ name: 'recharges' })">重新发起充值</md-button>
            <div class="guid" @click="goGuid">
               <span>手动转账指引</span>
               <img src="../../assets/images/arrow.png" alt="">
            </div>
        <div class="tips">移动钱包</div>
   </div>
</template>

<script>
import Header from '@/components/header';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'rechargeFail',
    components: {
        Header
    },
    data() {
        return {
            reason: this.$route.query.resultMsg,
            amount: this.$route.query.amount,
            payBank: this.$route.query.bankInfo,
            orderId: this.$route.query.orderNo,
            accountNo: this.$route.query.accountNo,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_RECHARGEFAIL_A01'
                }
            ],
            linkIndex: -1
        };
    },
    mounted() {
        if (!this.reason) {
            this.reason = '您的绑定卡暂不支持充值，请使用绑定银行卡转账至钱包账户';
        }
        this.linkIndex = this.reason.indexOf('手工转账');
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        goGuid() {
            this.$router.push({
                name: 'rechargeGuide',
                query: {
                    accountNo: this.accountNo
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
  .contains {
    .sucMsg {
        height: 408px;
        position: relative;
        .sucLoge {
            // height: 365px;
            width: 365px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            img {
                margin: 67px 90px 38px 90px;
                width: 186px;
                height: 127px;
                opacity: 1;
            }
            .suc {
                width: 136px;
                height: 48px;
                opacity: 1;
                font-size: 34px;
                font-weight: 500;
                text-align: left;
                color: #333333;
                line-height: 48px;
                margin: auto;
            }
            .msg {
                width: 364px;
                height: 37px;
                opacity: 1;
                font-size: 26px;
                font-weight: 400;
                text-align: left;
                color: #999999;
                line-height: 37px;
                margin: 10px auto 0;
            }
        }
    }
    .transferBtn {
        width: 686px;
        height: 90px;
        opacity: 1;
        background: #0195ff;
        border-radius: 10px;
        margin: 67px auto 0;
    }
    .guid {
        margin-top: 40px;
        font-size: 30px;
        display: flex;
        justify-content:center;
        align-items: center;
        span {
            font-weight: 500;
            text-align: left;
            color: #0195ff;
        }
        img{
            width: 20px;
            height: 21px;
            margin-left: 5px;
        }
    }
    .tips {
        width: 300px;
        height: 50px;
        opacity: 1;
        font-size: 36px;
        font-weight: 500;
        text-align: center;
        color: #d7d7d7;
        line-height: 50px;
        letter-spacing: -1px;
        margin: 174px auto 0;
    }
    .reasonTxt{
        width: 550px;
        font-size: 26px;
        font-weight: 400;
        text-align: center;
        line-height: 37px;
        margin: -20px auto 20px;
        color: #0195ff;
    }
    .linkText{
        color: #0195ff;
    }
  }
</style>
