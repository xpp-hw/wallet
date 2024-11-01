<template>
    <div class="contain">
         <div class="mainContain">
             <div class="quota">
               <p class="phoneBill">{{ orderType | orderTypeFlag(orderType) }}</p>
               <p class="money">{{amount}}</p>
             </div>
             <md-field>
                 <md-detail-item title="交易类型" :content="transactionType > 0 ? '收入' : '支出'" :id="transactionType > 0 ? 'A02' : ''"/>
                 <md-detail-item title="交易时间" :content="orderTime" />
                 <md-detail-item title="流水单号" :content="orderNo" />
                 <md-detail-item title="用户名称" :content="userName" />
                 <md-detail-item title="备注" :content="orderStatus | orderStatusFlag(orderStatus)" />
             </md-field>
         </div>
         <div class="tips">移动钱包</div>
    </div>
</template>

<script>
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'billDetail',
    components: {
    },
    data() {
        return {
            orderType: this.$route.query.orderType,
            amount: this.$route.query.amount,
            transactionType: this.$route.query.transactionType,
            orderTime: this.$route.query.orderTime,
            orderNo: this.$route.query.orderNo,
            userName: '江苏移动掌上营业厅',
            orderStatus: this.$route.query.orderStatus,
            touchArr: [
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_BILLDETAIL_A02'
                }
            ]
        };
    },
    filters: {
        orderTypeFlag(value) {
            switch (value) {
                case '01':
                    return '充值';
                case '02':
                    return '提现';
                case '03':
                    return '支付';
                case '04':
                    return '退款';
                default:
                    return value;
            }
        },
        orderStatusFlag(value) {
            switch (value) {
                case '01':
                    return '处理中';
                case '02':
                    return '交易失败';
                case '03':
                    return '交易完成';
                default:
                    return value;
            }
        }
    },
    mounted() {
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
    }
};
</script>
<style lang="less" scoped>
.contain {
    .mainContain {
        background: #FFF;
        border-top: 20px solid #f5f5f5;
        .quota {
            height: 262px;
            border-bottom: 1px solid #eeeeee;
            .phoneBill{
                height: 100px;
                opacity: 1;
                font-size: 34px;
                font-weight: 400;
                text-align: center;
                color: #333333;
                line-height: 100px;
            }
            .money {
                height: 84px;
                opacity: 1;
                font-size: 60px;
                font-weight: 500;
                text-align: center;
                color: #333333;
                line-height: 84px;
            }
        }
        /deep/.md-field{
            height: 403px;
            .md-field-content{
                padding: 20px 0;
                .md-detail-item{
                    padding-top: 15px;
                    padding-bottom: 15px;
                    align-items: unset;
                    .md-detail-title{
                        color: #6D7278;
                    }
                    .md-detail-content{
                        color: #13252E;
                        word-break: break-all;
                        text-align: right;
                    }
                }
            }
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
        margin: 388px auto 0;
    }
}
</style>
