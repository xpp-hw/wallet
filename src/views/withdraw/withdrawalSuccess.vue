<template>
    <div class="contains">
        <div v-if="isSucc == '00'">
            <img class="okImg" src="../../assets/images/withdrawal/suc.png" alt="">
            <p class="suc">提现申请成功，等待银行处理</p>
            <p class="msg">预计2小时内到账，请以银行处理为准</p>
        </div>
        <div class="sucLoge"  v-if="isSucc == '01'">
                <img  class="okImg"  src="../../assets/images/recharge/rechargeSuc.png" alt="">
                <p class="suc">提现成功</p>
                <p class="msg">您可在账单中查询您的交易记录</p>
            </div>
        <md-field>
            <md-detail-item title="提现金额" :content=" '￥' + amount" />
            <md-detail-item title="到账银行" :content="payBank" />
            <md-detail-item title="流水单号" :content="orderId" />
        </md-field>
        <md-button class="transferBtn" id="A01" @click="jumpTo">完成</md-button>
        <div class="tips">移动钱包</div>
    </div>
</template>

<script>
import Header from '@/components/header';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';

export default {
    name: 'withdrawalSuccess',
    components: {
        Header
    },
    data() {
        return {
            amount: this.$route.query.amount,
            payBank: this.$route.query.payBank,
            orderId: this.$route.query.orderId,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_WIDTHDRAWALSUCCESS_A01'
                }
            ],
            isSucc: ''
        };
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.isSucc = this.$route.query.isSucc;
        this.getNewWallet();
    },
    methods: {
        jumpTo() {
            if (window.sessionStorage.getItem('backPage')) {
                this.$router.push({ name: window.sessionStorage.getItem('backPage') });
            } else {
                this.$router.go(-2);
            }
            window.sessionStorage.removeItem('backPage');
        },
        // 充值后重新获取账户余额
        getNewWallet() {
            const changeList = [];
            api.qrySmallChangeAcc({ refreshFlag: '1' }).then((res) => {
                // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                const walletNum = Number(res.totalBalance).toFixed(2);
                res.list.forEach((item) => {
                    if (item.fullAccNbr && item.defaultAccFlg === '01' && item.orgCode !== 'ICBC-DIGICCY') {
                        changeList.unshift(item);
                    } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                        changeList.push(item);
                    }
                });
                store2.default.set('walletNum', walletNum);
                store2.default.set('qbBankListsInfo', changeList);
            }).catch((err) => {
                console.log(err.msgInfo);
                // this.$toast.info(err.msgInfo);
            });
        }
    }
};
</script>
<style lang="less" scoped>
  .contains {
    .okImg {
       margin: 67px 288px 38px 288px ;
       width: 174px;
    //    height: 138px;
       opacity: 1;
    }
    .suc {
         height: 48px;
         opacity: 1;
         font-size: 34px;
         font-weight: 500;
         text-align: center;
         color: #333333;
         line-height: 48px;
         margin: auto;
    }
    .msg {
         height: 37px;
         opacity: 1;
         font-size: 26px;
         font-weight: 400;
         text-align: center;
         color: #999999;
         line-height: 37px;
         margin: 7px auto 84px;
    }
    .transferBtn {
        width: 686px;
        height: 90px;
        opacity: 1;
        background: #0195ff;
        border-radius: 10px;
        margin: 67px auto 0;
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
        margin: 318px auto 0;
    }
  }
</style>
