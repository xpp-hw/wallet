<template>
    <div class="contain">
        <div class="mainContain">
            <md-tabs class="tabs">
                <md-tab-pane class="content" name="p1" label="全部">
                    <div v-for="item in allDetails" :key="item.orderTime">
                        <div class="containItem" @click="seeDetails(item)">
                            <div class="left">
                                <div class="titleStatus">
                                    <span class="title">{{item.orderType | orderTypeFlag(item.orderType)}}<span v-if="item.orderStatus === '02'" class="status">失败</span></span>
                                </div>
                                <div class="times">{{item.orderTime}}</div>
                            </div>
                            <div class="right">
                                <span :class ="item.amount > 0 ? 'spanActive' : 'spanDefault'">{{item.amount}}</span>
                                <img src="../../assets/images/arrows.png" alt="">
                            </div>
                        </div>
                    </div>
                </md-tab-pane>
                <md-tab-pane class="content" name="p2" label="收入" id="A02">
                    <div v-for="item in incomeDetails" :key="item.orderTime">
                        <div class="containItem" @click="incomeSeeDetails(item)">
                            <div class="left">
                                <div class="titleStatus">
                                    <span class="title">{{ item.orderType | orderTypeFlag(item.orderType) }}<span v-if="item.orderStatus === '02'" class="status">失败</span></span>
                                </div>
                                <div class="times">{{item.orderTime}}</div>
                            </div>
                            <div class="right spanActive">
                                <span style="color:#34b614">{{item.amount}}</span>
                                <img src="../../assets/images/arrows.png" alt="">
                            </div>
                        </div>
                    </div>
                </md-tab-pane>
                <md-tab-pane class="content" name="p3" label="支出">
                    <div v-for="(item,index) in expendDetails" :key="index">
                        <div class="containItem"  @click="expendSeeDetails(item)">
                            <div class="left">
                                <div class="titleStatus">
                                    <span class="title">{{item.orderType | orderTypeFlag(item.orderType)}}<span v-if="item.orderStatus === '02'" class="status">失败</span></span>
                                </div>
                                <div class="times">{{item.orderTime}}</div>
                            </div>
                            <div class="right">
                                <span>{{item.amount}}</span>
                                <img src="../../assets/images/arrows.png" alt="">
                            </div>
                        </div>
                    </div>
                </md-tab-pane>
                <div class='noMore'>我可是有底线的～</div>
            </md-tabs>
        </div>
        <div class="tips">移动钱包</div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'pockDetails',
    components: {
        mdHeader
    },
    data() {
        return {
            allDetails: [],
            incomeDetails: [],
            expendDetails: [],
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_BILLDETAIL_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_BILLDETAIL_A02'
                },
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_POCKDETAILS_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_POCKDETAILS_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_POCKDETAILS_A03'
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
        this.getPocketsList();
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        getPocketsList() {
            api.pocketsApi.pocketsDetailQuery({
                orgCode: this.$route.query.orgCode
            }).then((data) => {
                const incomeBillList = []; // 收入
                const expendBillList = []; // 支出
                if (data.walletOrderInfo && data.walletOrderInfo.length > 0) {
                    this.allDetails = data.walletOrderInfo;
                    data.walletOrderInfo.forEach((i) => {
                        if (i.amount > 0) { // 收入
                            incomeBillList.push(i);
                            this.incomeDetails = incomeBillList;
                        }
                        if (i.amount < 0) { // 收入
                            expendBillList.push(i);
                            this.expendDetails = expendBillList;
                        }
                    });
                }
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
            });
        },
        seeDetails(e) {
            this.$router.push({
                name: 'billDetail',
                query: {
                    orderType: e.orderType,
                    amount: e.amount, // 金额amount
                    transactionType: e.amount, // 交易类型
                    orderTime: e.orderTime, // 订单时间
                    orderNo: e.orderNo, // 订单号
                    orderStatus: e.orderStatus
                }
            });
        },
        incomeSeeDetails(e) {
            this.$router.push({
                name: 'billDetail',
                query: {
                    orderType: e.orderType,
                    amount: e.amount, // 金额amount
                    transactionType: e.amount, // 交易类型
                    orderTime: e.orderTime, // 订单时间
                    orderNo: e.orderNo, // 订单号
                    orderStatus: e.orderStatus
                }
            });
        },
        expendSeeDetails(e) {
            this.$router.push({
                name: 'billDetail',
                query: {
                    orderType: e.orderType,
                    amount: e.amount, // 金额amount
                    transactionType: e.amount, // 交易类型
                    orderTime: e.orderTime, // 订单时间
                    orderNo: e.orderNo, // 订单号
                    orderStatus: e.orderStatus
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.contain {
    .mainHeader {
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 9999;
    }
    .mainContain {
        .tabs {
            background: #FFF;
            margin-bottom: 182px;
            .containItem {
                width: 690px;
                opacity: 1;
                border-bottom: 1px solid #d8d8d8;
                display: flex;
                justify-content: space-between;
                padding-top: 26px;
                padding-bottom: 26px;
                .left {
                    height: 85px;
                    .titleStatus {
                        opacity: 1;
                        font-weight: 400;
                        color: #333333;
                        .title {
                            position: relative;
                            font-size: 32px;
                            .status {
                                position: absolute;
                                top:1px;
                                display: inline-block;
                                width: 50px;
                                height: 30px;
                                line-height: 32px;
                                height: 32px;
                                background: red;
                                padding-left: 5px;
                                padding-right: 5px;
                                opacity: 1;
                                border-radius: 3px;
                                color: #FFF;
                                font-size: 18px;
                                margin-left: 20px;
                        }
                        }

                    }
                    .times {
                        width: 244px;
                        height: 33px;
                        opacity: 1;
                        font-size: 24px;
                        font-weight: 400;
                        text-align: left;
                        color: #999999;
                        line-height: 33px;
                        margin-top: 5px;
                    }
                }
                .right {
                    display: flex;
                    justify-content:left;
                    align-items: center;
                    .spanDefault {
                        height: 50px;
                        opacity: 1;
                        font-size: 36px;
                        font-weight: 500;
                        text-align: right;
                        color: #333333;
                        line-height: 50px;
                    }
                    .spanActive {
                        height: 50px;
                        opacity: 1;
                        font-size: 36px;
                        font-weight: 500;
                        text-align: right;
                        color: #34b614;
                        line-height: 50px;
                    }
                    img {
                        width: 20px;
                        height: 21px;
                        opacity: 1;
                        margin-left: 15px;
                    }
                }
            }
            /deep/.md-tab-bar {
                position: relative;
                padding-left:0px;
                padding-right:0px;
                background: #FFF;
                font-size: 32px;
                border-bottom: 2px solid #f5f5f5;
                width: 100%;
                position: fixed;
                z-index: 9999;
            }
            /deep/.content {
                font-size: 32px;
                line-height: 1.5;
                box-sizing: border-box;
                padding-left: 30px;
                padding-right: 30px;
                margin-top: 128px;
                /deep/.md-tabs-content {
                    min-height: 200px;
                    background: #FFF;
                }
            }
            /deep/.md-tab-bar-item.is-active {
                color: #238FF2;
            }
            /deep/.md-tab-bar-ink {
                position: absolute;
                bottom: 0;
                left: 0;
                display: block;
                height: 0.03rem;
                background-color: #238FF2;
                -webkit-transition: all 300ms;
                transition: all 300ms;
            }
            .noMore {
                height: 100px;
                opacity: 1;
                font-size: 26px;
                font-weight: 400;
                text-align: center;
                color: #999999;
                line-height: 100px;
                background: #f5f5f5;
            }
        }
    }
    .tips {
        width: 100%;
        height: 182px;
        opacity: 1;
        font-size: 36px;
        font-weight: 500;
        text-align: center;
        color: #d7d7d7;
        line-height: 182px;
        letter-spacing: -1px;
        background: #f5f5f5;
        position: fixed;
        bottom: 0;

    }
}
</style>
