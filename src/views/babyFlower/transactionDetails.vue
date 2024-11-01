<template>
    <div class="warp">
        <div :style="bg" class="content-warp">
            <div class="content">
                <div class="top">
                    <div class="month" @click="open">
                        <b>{{ date.month }}</b>
                        <span>月</span>
                        <img alt="" src="@/assets/images/babyFlower/down.png">
                    </div>
                </div>
                <div class="mid">
                    <ul>
                        <li @click="type('expenditure')"><p id="A01" :class="{expenditure:expenditure}">支出</p></li>
                        <li @click="type"><p id="B01" :class="{expenditure:!expenditure}">退款</p></li>
                    </ul>
                </div>
                <div class="button">
                    <!--                    付款-->
                    <div v-for="item in pay" v-if="expenditure" class="item">
                        <div class="left">
                            <div class="l-top"><span>消费金额</span>
                                <p :class="{err:item.sts != '交易成功'}">{{ item.sts == '交易成功' ? '成功' : '失败' }}</p></div>
                            <p class="l-bottom"><span>{{ item.time.slice(0, 4) }}-{{ item.time.slice(4, 6) }}-{{ item.time.slice(6, 8) }}</span> <span>{{ item.time.slice(8, 10) }}:{{ item.time.slice(10, 12) }}:{{
                                    item.time.slice(12, 14)
                                }}</span></p>
                        </div>
                        <div class="right">{{ item.orderAmt }}</div>
                    </div>
                    <!--                    退款-->
                    <div v-for="item in refund" v-if="!expenditure" class="item">
                        <div class="left">
                            <div class="l-top"><span>消费金额</span>
                                <p :class="{err:1==2}">成功</p></div>
                            <p class="l-bottom"><span>{{ item.time.slice(0, 4) }}-{{ item.time.slice(4, 6) }}-{{ item.time.slice(6, 8) }}</span> <span>{{ item.time.slice(8, 10) }}:{{ item.time.slice(10, 12) }}:{{
                                    item.time.slice(12, 14)
                                }}</span></p>
                        </div>
                        <div class="right">+{{ item.orderAmt }}</div>
                    </div>
                </div>
            </div>
        </div>
        <timePicker v-if="time" :date="date.year+'/'+date.month+'/9'" @cancel="colese" @sure="sure"></timePicker>
    </div>

</template>

<script>
import timePicker from '@/views/babyFlower/timePicker';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'transactionDetails',
    components: {
        timePicker
    },
    data() {
        return {
            bg: {
                backgroundImage: `url(${require('@/assets/images/babyFlower/detailsbg.png')})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% auto'
            },
            expenditure: true,
            time: false,
            date: {},
            pay: [],
            refund: [],
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_BABYFLOWER_DETAILS_01_A01'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_BABYFLOWER_DETAILS_01_B01'
                }
            ]
        };
    },
    mounted() {
        this.getdate();
        this.get();
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    watch: {
        date(val) {
            this.get();
        }
    },
    methods: {
        //打开时间选择器
        open() {
            this.time = true;
        },
        //关闭时间选择器
        colese() {
            this.time = false;
        },
        sure(date) {
            this.colese();

            this.date = {
                year: date.slice(0, 4),
                month: date.slice(5, 7)
            };
            console.log(this.date);
        },
        type(data) {
            if (data == 'expenditure') {
                this.expenditure = true;
                console.log(1);
            } else {
                this.expenditure = false;
                console.log(2);
            }
        },
        // 获取时间
        getdate() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            this.date = {
                year: year,
                month: month
            };
        },
        // 获取交易明细
        get() {
            api.ordInfoInfoQuery({
                'stuId': this.$route.query.stuId
            })
                .then(res => {
                    let str = String(this.date.year) + String(this.date.month);
                    console.log(str);
                    this.pay = res.list.filter(item => item.typ == '付款' && item.time.slice(0, 6) == str);
                    this.refund = res.list.filter(item => item.typ == '退款' && item.time.slice(0, 6) == str);
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });

        }
    }


};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    background-color: #F7F7F7;
    min-height: 100vh;

    .content-warp {
        width: 100%;
        height: 1176px;
        padding-top: 24px;
        box-sizing: border-box;

        .content {
            width: 700px;
            height: 1395px;
            border-radius: 30px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            position: relative;

            .top {
                width: 699px;
                height: 90px;
                border-radius: 30px 30px 0 0;
                display: flex;
                align-items: center;
                background: rgba(255, 255, 255, 0.5);
                position: relative;

                .month {
                    display: flex;
                    align-items: baseline;
                    padding-left: 33px;

                    b {
                        font-size: 44px;
                        font-weight: 500;
                    }

                    span {
                        font-size: 32px;
                    }

                    img {
                        width: 30px;
                        height: 17px;
                        margin-left: 13px;
                    }
                }
            }


            .mid {
                background-color: white;
                height: 80px;
                width: 100%;

                ul {
                    height: 78px;
                    width: 675px;
                    margin: 0 auto;
                    display: flex;
                    border-bottom: 2px solid #B5B4B4;

                    li {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        p {
                            color: #B5B4B4;
                            font-weight: Bold;
                            width: 120px;
                            height: 75px;
                            line-height: 75px;
                            letter-spacing: 5px;
                            text-align: center;
                            font-size: 40px;
                            border-bottom: 4px solid rgba(255, 156, 0, 0);
                        }

                        .expenditure {
                            border-bottom: 4px solid rgba(255, 156, 0, 1);
                            color: rgba(255, 156, 0, 1);
                        }
                    }
                }
            }

            .button {
                flex: 1;
                background: white;

                .item {
                    width: 674px;
                    margin: 0 auto;
                    display: flex;
                    height: 139px;
                    align-items: center;
                    border-bottom: 2px solid #B5B4B4;

                    .left {
                        margin-right: 272px;
                        margin-left: 20px;

                        .l-top {
                            color: #333333;
                            display: flex;
                            font-size: 32px;

                            p {
                                background: rgba(2, 179, 132, 1);
                                border-radius: 6px;
                                color: white;
                                width: 70px;
                                height: 28px;
                                font-size: 20px;
                                text-align: center;
                                line-height: 28px;
                                margin-left: 15px;
                            }

                            .err {
                                background: rgba(233, 2, 2, 1)
                            }
                        }

                        .l-bottom {
                            margin-top: 19px;
                            font-size: 22px;
                            color: #A5A5A5;
                        }

                    }

                    .right {
                        font-size: 36px;
                        color: #333333;
                        font-weight: 500;
                    }
                }
            }
        }
    }

}
</style>
