<template>
    <pull-refresh :isrefresh="isrefresh" @refresh="getInfoRefresh">
        <div>
            <div class="insterests">
                <md-tab-bar v-model="current" :items="items" class="tabBanner" @change="onTabChange"></md-tab-bar>
                <md-swiper
                    ref="swiper_1"
                    :autoplay="0"
                    :has-dots="false"
                    :is-loop="false"
                    :is-prevent="false"
                    @before-change="onSwiperChange"
                >
                    <md-swiper-item>
                        <div v-if="notGet.length>0">
                            <div v-for="(item, idx) in notGet" :id="idx > 8 ? 'B' + (idx+1) : 'B0' + (idx+1)" :key="idx" class="qyCard noGetCard" @click="goNotGet(item.jumpAddr)">
                                <div v-if="item.rightDesc && item.rightDesc.indexOf('打车')>-1" class="T3Cont cont">
                                    <div class="text">
                                        <p>{{ item.mtitle }}</p>
                                        <p>{{ item.stitle }}</p>
                                    </div>
                                    <div class="btn">立即领取</div>
                                </div>
                                <div v-else-if="item.rightDesc && item.rightDesc.indexOf('加油')>-1" class="zshCont cont">
                                    <div class="text">
                                        <p>{{ item.mtitle }}</p>
                                        <p>{{ item.stitle }}</p>
                                    </div>
                                    <div class="btn">立即领取</div>
                                </div>
                                <div v-else :class="idx%2 === 0 ? 'listTwo' : ''" class="cont">
                                    <div class="text">
                                        <p>{{ item.mtitle }}</p>
                                        <p>{{ item.stitle }}</p>
                                    </div>
                                    <div class="btn">立即领取</div>
                                </div>
                            </div>
                        </div>

                        <div v-if="notGet.length == 0" class="noData" style="margin-top: 1.84rem;">
                            <img alt="" src="../../assets/images/banks/interests/none_2.png">
                            <p>敬请期待！</p>
                        </div>

                        <!-- <div v-else class="noData">
                            <img alt="" src="../../assets/images/noData.png">
                            <p>暂无已领取的权益</p>
                        </div> -->

                        <!-- <div :class="notGet.length%2 === 0 ? 'blueCss' : ''" class="zeroYuan" @click="goZeroTag">
                            <div class="text">
                                <p>三大权益免费领 </p>
                                <p>月月享5元充值券</p>
                            </div>
                            <div class="btn">立即领取</div>
                        </div> -->

                    </md-swiper-item>
                    <md-swiper-item>
                        <div v-if="hadGet.length>0">
                            <div v-for="(item, idx) in hadGet" :id="idx > 8 ? 'A' + (idx+1) : 'A0' + (idx+1)" :key="idx" class="qyCard" @click="goHadGet(item.ordTye)">
                                <div v-if="item.rightDesc && item.rightDesc.indexOf('T3出行')>-1" class="T3Cont cont">
                                    <div class="text">
                                        <p>{{item.ordAmt}}{{ item.ordTye == '01' ? '话费' : item.ordTye == '02' ? '流量' : '充值券'  }}</p>
                                        <p>名额有限，先到先得</p>
                                        <p v-if="item.ordTye == '03' || item.ordTye == '04'">{{ item.time }}</p>
                                    </div>
                                    <div class="btn">立即查看</div>
                                </div>
                                <div v-else-if="item.rightDesc && item.rightDesc.indexOf('加油')>-1" class="zshCont cont">
                                    <div class="text">
                                        <p>{{item.ordAmt}}{{ item.ordTye == '01' ? '话费' : item.ordTye == '02' ? '流量' : '充值券'  }}</p>
                                        <p>名额有限，先到先得</p>
                                        <p v-if="item.ordTye == '03' || item.ordTye == '04'">{{ item.time }}</p>
                                    </div>
                                    <div class="btn">立即查看</div>
                                </div>
                                <div v-else :class="idx%2 === 0 ? 'listTwo' : ''" class="cont">
                                    <div class="text">
                                        <p>{{item.ordAmt}}{{ item.ordTye == '01' ? '话费' : item.ordTye == '02' ? '流量' : '充值券'  }}</p>
                                        <p>名额有限，先到先得</p>
                                        <p v-if="item.ordTye == '03' || item.ordTye == '04'">{{ item.time }}</p>
                                    </div>
                                    <div class="btn">立即查看</div>
                                </div>
                            </div>
                        </div>
                        <!-- <div v-if="isHfb" class="qyCard">
                            <div class="zshCont cont">
                                <div class="text">
                                    <p>最高10元/月</p>
                                    <p>账户有余额，天天领话费</p>
                                </div>
                                <div class="btn" @click="goHfb">立即查看</div>
                            </div>
                        </div> -->

                        <div v-if="hadGet.length == 0" class="noData">
                            <img style="width: 4.93rem;height: 4.52rem;" alt="" src="../../assets/images/banks/interests/none_1.png">
                            <!-- <p>敬请期待！</p> -->
                        </div>

                    </md-swiper-item>

                </md-swiper>
            </div>
            <div class="bottomTip">
                <div v-if="isBottom" class="text">已滑动到底部</div>
            </div>
        </div>
    </pull-refresh>


</template>

<script>
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import pullRefresh from '@/components/pullRefresh.vue';

export default {
    data() {
        return {
            isHfb: false,
            current: 1,
            items: [
                {
                    name: 1,
                    label: '待领取'
                },
                {
                    name: 0,
                    label: '已领取'
                }

            ],
            hadGet: [],
            notGet: [],
            qyList: [],
            isBottom: false,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A04'
                },
                {
                    id: 'A05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A05'
                },
                {
                    id: 'A06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A06'
                },
                {
                    id: 'A07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A07'
                },
                {
                    id: 'A08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A08'
                },
                {
                    id: 'A09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A09'
                },
                {
                    id: 'A10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A10'
                },
                {
                    id: 'A11',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_A11'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B04'
                },
                {
                    id: 'B05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B05'
                },
                {
                    id: 'B06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B06'
                },
                {
                    id: 'B07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B07'
                },
                {
                    id: 'B08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B08'
                },
                {
                    id: 'B09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B09'
                },
                {
                    id: 'B10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B10'
                },
                {
                    id: 'B11',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MYINTERESTS_B11'
                }
            ],
            isrefresh: false
        };
    },
    components: { pullRefresh },
    created() {
        this.getQYList();
        window.addEventListener('scroll', this.scrollBottom);
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.hadGet.push();
        this.showHfb();
    },
    methods: {
        goZeroTag() {
            window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?dealCh=0yb01&typeId=0yb001&ch=0106';
        },
        onSwiperChange(from, to) {
            this.current = to;
        },
        onTabChange(item, index) {
            this.$refs.swiper_1.goto(index);
        },
        // 获取权益列表
        getQYList() {
            this.hadGet = [];
            this.notGet = [];
            console.log(store2.default.get('qyList'));
            if (!store2.default.get('qyList')) {
                api.rightAccountQuery({})
                    .then((res) => {
                        this.qyList = res.list;
                        this.qyList.forEach((item) => {
                            item.time = `${this.handelTime(item.beginTime)} 至 ${this.handelTime(item.endTime)}`;
                            if (item.receiveSts === '1') {
                                this.hadGet.push(item);
                            } else {
                                // debugger
                                this.notGet.push(item);
                            }
                        });
                        this.hadGet.forEach(data => {
                            if(data.ordAmt.indexOf('元') > -1) {
                                data.ordAmt = Math.trunc(data.ordAmt.slice(0,-1)) + '元'
                            }
                        })
                        this.notGet.sort(function(a,b) {
                            return a.sorting - b.sorting
                        })
                        this.hadGet.sort(function(a,b) {
                            return a.sorting - b.sorting
                        })
                    })
                    .catch((err) => {
                        console.log(err.msgInfo);
                        this.$toast.info(err.msgInfo);
                    });
            } else {
                this.qyList = store2.default.get('qyList');
                this.qyList.forEach((item) => {
                    item.time = item.endTime ? `${this.handelTime(item.beginTime)} 至 ${this.handelTime(item.endTime)}` : '';
                    console.log(item.time);
                    if (item.receiveSts === '1') {
                        this.hadGet.push(item);
                    } else {
                        // debugger
                        this.notGet.push(item);
                    }
                });
                this.hadGet.forEach(data => {
                    if(data.ordAmt.indexOf('元') > -1) {
                        data.ordAmt = Math.trunc(data.ordAmt.slice(0,-1)) + '元'
                    }
                })
                this.notGet.sort(function(a,b) {
                    return a.sorting - b.sorting
                })
                this.hadGet.sort(function(a,b) {
                    return a.sorting - b.sorting
                })
            }
        },
        handelTime(time) {
            if (time) {
                return `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)} ${time.slice(8, 10)}:${time.slice(10, 12)}:${time.slice(12, 14)}`;
            }
            return '';
        },
        scrollBottom() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const { clientHeight } = document.documentElement;
            const { scrollHeight } = document.documentElement;
            if (scrollTop + clientHeight + 10 >= scrollHeight) {
                this.isBottom = true;
                setTimeout(() => {
                    this.isBottom = false;
                }, 3000);
            }
        },
        goHadGet(sts) {
            // window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html';
            // ordTye  01 话费  02 流量   03 04 优惠券
            if(sts == '01') {
                window.location.href = 'https://wap.js.10086.cn/vw/navbar/WSCZNEWHISTORY'
            } else if (sts == '02') {
                window.location.href = 'https://wap.js.10086.cn/LLCZJL.thtml'
            } else if (sts == '03' || sts == '04') {
                if(this.$client.LEADEON) {
                    // 一级
                    window.location.href = 'https://dx.10086.cn/bE4jDQ'
                } else if(this.$client.JSMCC) {
                    // 掌厅
                    window.location.href = 'http://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html?cardType=0&useType=1&rm=ydc'
                } else {
                    // 其他
                    window.location.href = 'http://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html?cardType=0&useType=1&rm=ydc'
                }
            }
        },
        goNotGet(val) {
            console.log(val,'+++++++++++')
            window.location.href = val;
            // window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            // if (val.indexOf('出行66元') > -1 || val.indexOf('加油') > -1) {
            //     window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent';
            // } else {

            //     window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree';
            // }
        },
        // 重新获取数据
        getInfoRefresh() {
            this.isrefresh = true;
            api.rightAccountQuery({ refreshFlag: '1' })
                .then((res) => {
                    this.hadGet.splice(0);
                    this.notGet.splice(0);
                    this.qyList = res.list;
                    this.qyList.forEach((item) => {
                        item.time = item.endTime ? `${this.handelTime(item.beginTime)} 至 ${this.handelTime(item.endTime)}` : '';
                        console.log(item.time);
                        if (item.receiveSts === '1') {
                            this.hadGet.push(item);
                        } else {
                            // debugger
                            this.notGet.push(item);
                        }
                    });
                    this.isrefresh = false;
                    this.notGet.sort(function(a,b) {
                        return a.sorting - b.sorting
                    })
                    this.hadGet.sort(function(a,b) {
                        return a.sorting - b.sorting
                    })
                    this.hadGet.forEach(data => {
                        if(data.ordAmt.indexOf('元') > -1) {
                            data.ordAmt = Math.trunc(data.ordAmt.slice(0,-1)) + '元'
                        }
                    })
                    store2.default.set('qyList', this.qyList);
                })
                .catch((err) => {
                    this.isrefresh = false;
                    console.log(err.msgInfo);
                    this.$toast.info(err.msgInfo);
                });
        },
        // 去话费宝
        goHfb() {
            window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/telephoneCharges/description';
        },
        showHfb() {
            api.hfb.qualificationChk({
                entryTx: '',
                mobileNo: store2.default.get('usrmob')
            })
                .then((data) => {
                    console.log(999999999999999, data);
                    if (data.code === '02') { // 已开通
                        this.isHfb = true;
                    }
                })
                .catch((err) => {
                    this.loading = false;
                    this.$toast.info(err.msg || err.msgInfo);
                });
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollBottom);
    }
};
</script>

<style lang="less" scoped>
.insterests {
    padding: 0 40px;

    /deep/ .md-tab-bar {
        padding: 0;
    }

    .tabBanner {
        margin-bottom: 30px;

        /deep/ .md-tab-bar-item {
            font-size: 36px;
            min-height: 120px;
            border-bottom: 1px solid #666;
        }

        /deep/ .md-tab-bar-ink {
            width: 20% !important;
            left: -8%;
        }
    }

    .noData {
        position: relative;
        text-align: center;
        margin-top: 100px;
        font-size: 30px;
        color: #666;
        line-height: 60px;

        img {
            width: 383px;
            height: 368px;
        }
        p {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            font-size: 32px;
            color: #979797;
            letter-spacing: 2.79px;
            text-align: center;
        }
    }

    .qyCard {
        height: 170px;
        margin-bottom: 10px;
        overflow: hidden;
        padding: 5px;
        position: relative;

        .cont {
            height: 170px;
            background: url('../../assets/images/banks/interests/hf_1.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;

            .text {
                margin-left: 200px;
                font-size: 24px;
                color: #EF8B5A;
                font-size: 24px;
                text-align: left;
                line-height: initial;

                p:first-of-type {
                    margin-top: 33px;
                    font-size: 36px;
                    color: #B05344;
                    font-weight: 600;
                    width: 330px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                p:nth-of-type(2) {
                    margin-top: 15px;
                }

                p:nth-of-type(3) {
                    margin-top: 10px;
                    font-size: 21px;
                    color: #969494;
                    white-space: nowrap;
                }
            }

            .btn {
                width: 120px;
                height: 42px;
                line-height: 42px;
                color: #BD641E;
                text-align: center;
                background: #fff;
                font-size: 22px;
                border-radius: 20px;
                position: absolute;
                top: 84px;
                right: 40px;
                flex-shrink: 0;
            }
        }

        .T3Cont {
            background: url('../../assets/images/banks/interests/t3.png') no-repeat;
            background-size: 100% 100%;

            .text {
                color: #B16930;

                p:first-of-type {
                    color: #C9864D;
                }
            }
        }

        .zshCont {
            background: url('../../assets/images/banks/interests/zsh.png') no-repeat;
            background-size: 100% 100%;

            .text {
                color: #2D64A0;

                p:first-of-type {
                    color: #5888BC;
                }
            }
        }

        .listTwo {
            background: url('../../assets/images/banks/interests/hf_2.png') no-repeat;
            background-size: 100% 100%;

            .text {
                color: #2D64A0;

                p:first-of-type {
                    color: #5888BC;
                }
            }
        }
    }

    .noGetCard {
        height: 196px;

        .cont {
            height: 196px;
            background: url('../../assets/images/banks/interests/hf2_1.png') no-repeat;
            background-size: 100% 100%;
            position: relative;

            .btn {
                margin: 0;
                position: absolute;
                top: 70px;
                right: 40px;
            }
        }

        .T3Cont {
            background: url('../../assets/images/banks/interests/t3_2.png') no-repeat;
            background-size: 100% 100%;
        }

        .zshCont {
            background: url('../../assets/images/banks/interests/zsh_2.png') no-repeat;
            background-size: 100% 100%;
        }

        .listTwo {
            background: url('../../assets/images/banks/interests/hf2_2.png') no-repeat;
            background-size: 100% 100%;
        }
    }
}

.bottomTip {
    width: 100%;
    height: 60px;
    color: #999;
    font-size: 26px;
    text-align: center;
    margin-top: 60px;

    .text {
        line-height: 40px;
        border-top: 1px dashed #333;
    }
}

.md-tab-bar {
    background: none;
}

.zeroYuan {
    height: 196px;
    background: url('../../assets/images/banks/interests/hf2_1.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .text {
        height: 196px;
        margin-left: 200px;
        margin-top: 33px;
        font-size: 24px;
        color: #EF8B5A;
        font-size: 24px;
        text-align: left;
        line-height: initial;

        p:first-of-type {
            padding-top: 0.33rem;
            font-size: 36px;
            color: #B05344;
            font-weight: 600;
            width: 330px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        p:nth-of-type(2) {
            margin-top: 15px;
        }

        p:nth-of-type(3) {
            margin-top: 10px;
            font-size: 21px;
            color: #969494;
            white-space: nowrap;
        }
    }
    .btn {
        width: 120px;
        height: 42px;
        line-height: 42px;
        color: #BD641E;
        text-align: center;
        background: #fff;
        font-size: 22px;
        border-radius: 20px;
        position: absolute;
        top: 84px;
        right: 40px;
        flex-shrink: 0;
    }
}
.blueCss {
    background: url('../../assets/images/banks/interests/hf2_2.png') no-repeat;
    background-size: 100% 100%;

    .text {
        color: #2D64A0;

        p:first-of-type {
            color: #5888BC;
        }
    }
}

</style>
