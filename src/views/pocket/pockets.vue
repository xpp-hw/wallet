<template>
   <div class="contains">
       <div class="name">零钱(元)</div>
       <div class="amount">{{amounts}}</div>
       <div class="bill" id="A02" @click="$router.push({ name: 'pockDetails' })">
            <span>零钱账单</span>
            <img src="../../assets/images/arrows.png" alt="">
        </div>
        <!-- <div class="recharge" id="A03" @click="$router.push({ name: 'recharges' })">充值</div> -->
        <div class="recharge" id="A03" @click="toRecharge()">充值</div>
        <div class="withdraw" id="A04" @click="toChangeWithdrawal()">提现</div>
        <div class="problem" @click="$router.push({ name: 'problemDetail' })">常见问题</div>
   </div>
</template>

<script>
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'pockets',
    data() {
        return {
            amounts: '',
            accountNo: '',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_POCKETS_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_POCKETS_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLET_POCKETS_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_WALLET_POCKETS_A04'
                }
            ]
        };
    },
    mounted() {
        this.getPockets();
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        getPockets() {
            api.pocketsApi.pocketsQuery({
            }).then((data) => {
                this.amounts = data.accountBalance;
                this.accountNo = data.accountNo;
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
            });
        },
        toRecharge() {
            this.$router.push({
                name: 'recharges',
                query: {
                    accountNo: this.accountNo
                }
            });
        },
        toChangeWithdrawal() {
            this.$router.push({
                name: 'changeWithdrawal',
                query: {
                    amounts: this.amounts
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
    .contains {
        .name {
            height: 120px;
            opacity: 1;
            font-size: 34px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            line-height: 120px;
            border-top:20px solid #f5f5f5;
        }
        .amount {
            height: 84px;
            opacity: 1;
            font-size: 60px;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 84px;
            margin-top: 22px;
        }
        .bill {
            // width: 150px;
            margin: 54px auto 0;
            font-size: 30px;
            display: flex;
            justify-content:center;
            align-items: center;
            span {
                font-weight: 500;
                text-align: left;
                color: #999999;;
            }
            img{
                width: 20px;
                height: 21px;
                margin-left: 10px;
            }
        }
        .recharge {
            width: 360px;
            height: 80px;
            opacity: 1;
            background: #0195ff;
            border-radius: 8px;
            font-size: 36px;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 80px;
            margin: 296px auto 30px;
        }
        .withdraw {
            width: 360px;
            height: 80px;
            opacity: 1;
            border: 1px solid #238ff2;
            border-radius: 9px;
            margin: auto;
            font-size: 36px;
            font-weight: 400;
            text-align: center;
            color: #238ff2;
            line-height: 80px;
        }
        .problem {
            width: 112px;
            height: 40px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            line-height: 40px;
            margin: 205px auto 0;
        }
    }
</style>
