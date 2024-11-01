<template>
   <div class="contains">
       <div class="sucMsg">
            <div class="sucLoge" v-if="isSucc === '00'" style="width:100%;text-align:center;">
                <img src="../../assets/images/withdrawal/suc.png" alt="">
                <p class="suc" style="width:100%;text-align:center;">充值申请成功，等待银行处理</p>
                <p class="msg" style="width:100%;text-align:center;">预计2小时到账，请以银行处理为准</p>
            </div>
            <div class="sucLoge"  v-else>
                <img src="../../assets/images/recharge/rechargeSuc.png" alt="">
                <p class="suc">充值成功</p>
                <p class="msg">您可在账单中查询您的充值记录</p>
            </div>
        </div>
        <md-field>
          <md-detail-item title="充值金额" :content=" '￥' + amount" />
          <md-detail-item title="支付银行" :content="payBank" />
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
    name: 'rechargeSuccess',
    components: {
        Header
    },
    data() {
        return {
            amount: this.$route.query.amount,
            payBank: this.$route.query.bankInfo,
            orderId: this.$route.query.orderNo,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_RECHARGESUCCESS_A01'
                }
            ],
            isSucc: '',
            typeId: ''
        };
    },
    mounted() {
        this.isSucc = this.$route.query.isSucc;
        this.typeId = this.$route.query.typeId || '';
        this.getNewWallet();
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        jumpTo() {
            if (window.sessionStorage.getItem('backPage')) {
                this.$router.push({ name: window.sessionStorage.getItem('backPage') });
            } else {
                if (this.typeId == 'ztczzx') {
                    if (this.$client.LEADEON) {
                        if (this.$client.ANDROID) {
                            window.location.href = 'https://touch.10086.cn/i/reapp/v2.0/pages/recharge/recharge.html';
                        } else {
                            window.open('https://touch.10086.cn/i/reapp/v2.0/pages/recharge/recharge.html', '__blank');
                        }
                    } else {
                        window.location.href = 'http://wap.js.10086.cn/vw/WSCZYL';
                    }
                } else {
                    this.$router.go(-2);
                }
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
                store2.default.set('walletNum', '0.00');
                store2.default.set('qbBankListsInfo', []);
                console.log(err.msgInfo);
                // this.$toast.info(err.msgInfo);
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
        margin: 329px auto 0;
    }
  }
</style>
