<template>
   <div class="contains">
        <div class="sucMsg">
            <div class="sucLoge">
                <img src="../../assets/images/withdrawal/fail.png" alt="">
                <p class="suc">提现失败</p>
            </div>
        </div>
        <p class="reasonTxt" v-if="linkIndex<0">失败原因：{{reason}}</p>
        <p class="reasonTxt" v-else style="color:#999">
            失败原因：{{reason.slice(0,linkIndex)}}
            <span class="linkText" @click="goGuid">手工转账</span>
            {{reason.slice(linkIndex+4)}}
        </p>
        <md-button class="transferBtn" id="A01" @click="$router.push({ name: 'changeWithdrawal' })">重新发起</md-button>
        <div class="tips">移动钱包</div>
   </div>
</template>

<script>
import Header from '@/components/header';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'withdrawalFail',
    components: {
        Header
    },
    data() {
        return {
            reason: this.$route.query.resultMsg,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_WIDTHDRAWALFAIL_A01'
                }
            ],
            linkIndex: '-1'
        };
    },
    mounted() {
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
        if (!this.reason) {
            this.reason = '您的绑定卡暂不支持提现，请更换银行卡';
        }
        this.linkIndex = this.reason.indexOf('手工转账');
    },
    methods: {
    }
};
</script>
<style lang="less" scoped>
  .contains {
    .sucMsg {
        height: 408px;
        position: relative;
        .sucLoge {
            height: 365px;
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
                margin: 65px auto 0;
            }
        }
    }
    .transferBtn {
        width: 686px;
        height: 90px;
        opacity: 1;
        background: #0195ff;
        border-radius: 10px;
        margin: 130px auto 0;
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
        margin: 452px auto 0;
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
  }
</style>
