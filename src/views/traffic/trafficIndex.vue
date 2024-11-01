<template>
    <div class="warp">
        <div id="D01" class="exple" @click="goRecords">
            <img alt="" src="@/assets/images/traddic/exple.png" />
        </div>
        <div class="head">
            <div class="top">
                钱包余额
                <div class="img" @click="eye = !eye">
                    <img
                        v-if="eye"
                        alt=""
                        src="@/assets/images/traddic/eyeopen.png"
                    />
                    <img
                        v-else
                        alt=""
                        src="@/assets/images/traddic/eyeclose.png"
                    />
                </div>
            </div>
            <div class="mid">
                <span>{{ eye ? money : "****" }}</span>
                <div id="A01" class="btn" @click="goRecharge">充值</div>
            </div>
            <div class="bottom">
                <div class="left">
                    <p>可领取流量（GB）</p>
                    <div class="btn">
                        <span>{{ eye ? GB + ".00" : "****" }}</span>
                        <div
                            v-if="GB > 0"
                            id="B01"
                            class="get"
                            @click="pop(true)"
                        >
                            领取
                        </div>
                    </div>
                </div>
                <div class="right" @click="goRecord">
                    <p>已领取流量（GB）</p>
                    <div class="btn">{{ eye ? getGB + ".00" : "****" }}</div>
                </div>
            </div>
        </div>
        <div class="concent">
            <div v-if="status == 2" class="title">
                活动中断，请于今日24点前确保余额≥1000元
            </div>
            <div v-if="status == 3" class="title">
                活动已终止，你可以：重新参与此活动
            </div>
            <div v-if="Number(money) < 1000 && status == 0" class="title">
                活动还未生效，钱包余额≥1000元后次日生效
            </div>
            <div v-if="Number(money) >= 1000 && status == 0" class="title">
                活动于<span class="red">{{ nextDate.month }}</span
                >月<span class="red">{{ nextDate.day }}</span
                >日正式生效
            </div>
            <div v-if="status == 4" class="title">
                距离本次达标还差<span style="color: red">{{ days }}</span
                >天
            </div>
            <div v-if="status == 1" class="title">
                你已达标
                <span class="red">{{ frequency }}</span>
                次，距离本次达标还差<span style="color: red">{{ days }}</span
                >天
            </div>
            <div v-if="status == 5" class="title">
                你已达标
                <span class="red">{{ frequency }}</span> 次，下次活动将于
                <span class="red">{{ nextDate.month }}</span
                >月<span class="red">{{ nextDate.day }}</span
                >日开始生效
            </div>
            <div class="main">
                <div class="top">
                    <p>当前达标状态</p>
                    <span v-if="Number(money) >= 1000 && status != 3"
                        >已连续<span class="red">{{ 30 - days }}</span
                        >天</span
                    >
                </div>
                <div class="mid">
                    <div class="date">
                        {{ Number(money) >= 1000 ? today : "" }}
                    </div>
                    <div class="img">
                        <img
                            v-if="schedule == 100"
                            alt=""
                            src="@/assets/images/traddic/get.png"
                        />
                        <img
                            v-else
                            alt=""
                            src="@/assets/images/traddic/give.png"
                        />
                    </div>
                    <div class="barwarp">
                        <img
                            v-if="status == 2 || status == 3"
                            alt=""
                            src="@/assets/images/traddic/stop.png"
                        />
                        <div
                            v-else
                            :style="'--precent:' + schedule"
                            class="bar"
                        ></div>
                    </div>
                </div>
                <div class="bottom">
                    <div :class="{ nored: Number(money) < 1000 }" class="left">
                        钱包余额≥1000元
                    </div>
                    <div v-if="schedule == 100" class="left">
                        已达标 可领5GB流量
                    </div>
                    <div v-else class="right">连续30天即可领5GB流量</div>
                </div>
            </div>
            <div class="fitter">
                <div class="top">活动说明</div>
                <div class="text" v-html="rulesContent.replace(/px/g,'')">
                </div>
            </div>
        </div>
        <div v-if="popshow" class="popwarp">
            <div v-if="err" class="pop">
                <div class="top">
                    本次领取
                    <div>
                        <input
                            v-model="receiveGB"
                            onafterpaste="this.value=this.value.replace(/\D/g,'')"
                            onkeyup="this.value=this.value.replace(/\D/g,'')"
                            type="number"
                        />
                        <div class="img">
                            <div class="itop" @click="add(true)"></div>
                            <div class="ileft" @click="add(false)"></div>
                        </div>
                    </div>
                    GB流量
                </div>
                <div class="text">
                    流量将于3个工作日内到账<br />
                    到账号立即生效 月底失效<br />
                    单次最高可领10GB流量<br />
                </div>
                <div class="btn">
                    <div id="C02" @click="pop(false)">取消</div>
                    <div id="C01" @click="receive">确定</div>
                </div>
            </div>
            <div v-else class="err">
                <div id="C04" @click="pop(false)">取消</div>
                <div id="C03" @click="pop(false)">确定</div>
            </div>
        </div>

    </div>
</template>

<script>
import api from "@/common/apiUrls";
import { initPageJs } from "@/common/Page2435_1_fn.js";
export default {
    name: "traddicHome",
    components: {},
    data() {
        return {
            loading: true,
            eye: false,
            schedule: 0, //进度条
            money: 1000, //余额
            status: 1, //1正常 2中断 3终止
            days: 0, //剩余天数
            frequency: 0, //达标次数
            today: "", //今日
            nextDate: {
                month: "0",
                day: "0",
            }, //下次生效日期
            GB: 0, //流量
            getGB: 0, //领取流量
            receiveGB: 0, //领取流量
            popshow: false, //弹窗
            err: true, //错误弹窗
            touchArr: [
                {
                    id: "A01",
                    touchCode: "WAP_T_TRADDIC_HOME_01_A01",
                },
                {
                    id: "B01",
                    touchCode: "WAP_T_TRADDIC_HOME_01_B01",
                },
                {
                    id: "C01",
                    touchCode: "WAP_T_TRADDIC_HOME_01_C01",
                },
                {
                    id: "C02",
                    touchCode: "WAP_T_TRADDIC_HOME_01_C02",
                },
                {
                    id: "C03",
                    touchCode: "WAP_T_TRADDIC_HOME_01_C03",
                },
                {
                    id: "C04",
                    touchCode: "WAP_T_TRADDIC_HOME_01_C04",
                },
            ],
            rulesContent: '',
            canClick: true
        };
    },
    watch: {
        receiveGB(val) {
            if (val > this.GB) {
                this.receiveGB = this.GB;
            } else if (val < 0) {
                this.receiveGB = 0;
            }
        },
    },
    mounted() {
        window.onpopstate = () => {
            this.$router.go(-2);
        };
    },
    created() {
        // if (window.location.href.indexOf("#reloaded") == -1) {
        //     window.location.href = window.location.href + "#reloaded";
        //     window.location.reload();
        //     console.log(1)
        // }
        this.initBalance();
        this.initInfo();
        let time = new Date();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        this.today = month + "月" + day + "日";
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.queryRules()
    },
    methods: {
        queryRules() {
            api.huataiAgreement({
                businessCode: "llbhdsm",
                businessType: 'WHOLE'
            })
                .then((res) => {
                    this.rulesContent = res.content;
                });
        },
        goRecord() {
            // this.$router.push({
            //     path: '/traddicRecording'
            // });
            window.location.href =
                "https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicRecording";
        },
        //弹窗
        pop(state) {
            this.err = true;
            this.popshow = state;
        },
        //领取流量
        receive() {
            // this.$store.commit("LOADING",true);
            if(this.receiveGB == 0) {
                this.$toast.info("请输入领取流量");
                return;
            }
            if(!this.canClick) {
                return
            }
            this.canClick = false;
            api.llb
                .receivePin({
                    receiveFlow: this.receiveGB,
                })
                .then((res) => {
                    this.$store.commit("LOADING",false);
                    this.canClick = true;
                    // console.log(res);
                    this.$toast.info("流量领取成功");
                    this.pop(false);
                    this.initInfo();
                })
                .catch((err) => {
                    this.$store.commit("LOADING",false);
                    this.canClick = true;
                    // console.log(err);
                    this.err = false;
                });
        },
        //加减
        add(state) {
            if (state) {
                if (this.receiveGB >= this.GB) return;
                this.receiveGB++;
            } else {
                if (this.receiveGB > 1) {
                    this.receiveGB--;
                }
            }
        },
        //余额查询
        initBalance() {
            api.llb.initBalance().then((res) => {
                // console.log(res);
                this.money = res.balance;
            });
        },
        //信息
        initInfo() {
            api.llb.initInfo().then((res) => {
                console.log(res);
                this.GB = res.lastFlow;
                this.frequency = res.reachTheStandard;
                this.getGB = res.receivedFlow;
                if (res.startTime) {
                    this.nextDate = {
                        month: res.startTime.slice(4, 6),
                        day: res.startTime.slice(6, 8),
                    };
                }
                this.status = res.status;
                this.days = Number(res.surplusDays);
                this.schedule = ((30 - this.days) / 30) * 100;
                console.log("状态为" + this.status);
            });
        },
        //去充值
        goRecharge() {
            window.sessionStorage.setItem("backPage", "traddicHome");
            this.$router.push({
                path: "/recharge/recharges",
                query: {
                    orgCode: "SPDB",
                },
            });
            // window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/recharge/recharges?orgCode=SPDB';
        },
        //活动规则
        goRecords() {
            this.$router.push({
                path: "/traddicRule",
            });
        },
    },
    destroyed() {
        window.onpopstate = null;
    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    min-height: 100vh;
    background: #f1f6f7;
    position: relative;
    .exple {
        width: 155px;
        position: absolute;
        right: 0;
        top: 50px;

        img {
            width: 100%;
            height: auto;
        }
    }
    .head {
        width: 100%;
        height: 455px;
        background: #f1f6f7 url("~@/assets/images/traddic/head.png") no-repeat;
        background-size: 100% 100%;
        padding-top: 103px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
            font-size: 32px;
            display: flex;

            .img {
                width: 38px;
                height: 22px;
                margin-left: 8px;

                img {
                    width: 38px;
                    height: 22px;
                }
            }
        }

        .mid {
            display: flex;
            font-size: 74px;
            align-items: center;
            margin-top: 20px;
            margin-bottom: 44px;

            .btn {
                width: 135px;
                height: 61px;
                background: #2094fc;
                border-radius: 31px;
                font-size: 34px;
                color: #ffffff;
                line-height: 61px;
                text-align: center;
                margin-left: 20px;
            }
        }

        .bottom {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0 80px;
            box-sizing: border-box;
            font-size: 30px;

            > div {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .btn {
                font-weight: bold;
                font-size: 50px;
                margin-top: 10px;
                display: flex;
                align-items: center;

                .get {
                    width: 135px;
                    height: 61px;
                    background: #2094fc;
                    border-radius: 31px;
                    font-size: 34px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 61px;
                    margin-left: 10px;
                }
            }
        }
    }

    .concent {
        width: 100%;
        height: 1008px;
        background: white;
        margin-top: 35px;
        min-height: calc(100vh - 490px);
        padding: 35px 26px;
        box-sizing: border-box;
        border-radius: 20px 20px 0 0;

        .title {
            width: 652px;
            height: 45px;
            font-weight: 500;
            font-size: 28px;
            margin-left: 10px;
            color: #3d3e3e;

            .red {
                color: #ff001d;
            }
        }

        .main {
            width: 698px;
            height: 314px;
            background-image: linear-gradient(-19deg, #fcf2e9 0%, #f1dac9 100%);
            border-radius: 20px;
            margin-top: 20px;
            padding: 0 30px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;

            .top {
                margin-top: 26px;
                width: 100%;
                display: flex;
                justify-content: space-between;

                p {
                    font-size: 36px;
                    color: #4f2f24;
                }

                span {
                    font-size: 24px;
                    color: #565656;

                    .red {
                        color: red;
                    }
                }
            }

            .mid {
                width: 100%;
                margin-top: 28px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                .date {
                    font-weight: 500;
                    font-size: 28px;
                    margin-top: 34px;
                }

                .img {
                    width: 86px;
                    height: 85px;
                    margin-right: 36px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .barwarp {
                    width: 100%;
                    height: 18px;

                    img {
                        margin-top: -32px;
                        width: 638px;
                        height: 59px;
                    }

                    .bar {
                        background: #fbd8b8;
                        border-radius: 8px;
                        width: 100%;
                        height: 18px;
                    }

                    .bar::before {
                        display: block;
                        height: 18px;
                        border-radius: 8px;
                        counter-reset: progress var(--precent);
                        content: counter(progress);
                        width: calc(1% * var(--precent));
                        color: rgba(000, 000, 000, 0);
                        background-image: linear-gradient(
                            270deg,
                            #ff722b 6%,
                            #ff001d 95%
                        );
                        text-align: center;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
            }

            .bottom {
                width: 100%;
                display: flex;
                margin-top: 24px;
                justify-content: space-between;

                .left {
                    //width: 233px;
                    padding: 0 20px;
                    height: 30px;
                    line-height: 30px;
                    font-weight: 500;
                    font-size: 24px;
                    color: #ff001c;
                    border: 1px solid #ff001c;
                    border-radius: 30px;
                    text-align: center;
                    line-height: 30px;
                }

                .nored {
                    color: #565656;
                    border: 1px solid #565656;
                }

                .right {
                    width: 282px;
                    height: 30px;
                    font-weight: 500;
                    font-size: 24px;
                    color: #565656;
                    border: 1px solid #565656;
                    border-radius: 30px;
                    text-align: center;
                    line-height: 30px;
                }
            }
        }

        .fitter {
            margin-top: 35px;
            width: 100%;

            .top {
                height: 76px;
                background-image: linear-gradient(
                    0deg,
                    #ffffff 50%,
                    #e2f1ff 100%
                );
                border-radius: 20px;
                font-weight: 500;
                font-size: 30px;
                color: #3d3e3e;
                padding: 20px 20px;
                box-sizing: border-box;
            }

            .text {
                width: 680px;
                //height: 471px;
                font-weight: 500;
                font-size: 24px;
                color: #3d3e3e;
                padding: 20px 20px;
                box-sizing: border-box;
                line-height: 45px;
                text-align: justify;
            }
        }
    }

    .red {
        color: red;
    }

    .popwarp {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .pop {
            width: 544px;
            height: 671px;
            background: url("~@/assets/images/traddic/GB.png") no-repeat;
            background-size: 100% 100%;
            padding: 0 67px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;

            .top {
                margin-top: 312px;
                font-size: 35.28px;
                display: flex;
                align-items: center;

                > div {
                    background: #fefefe;
                    border: 1px solid #d8d8d8;
                    padding: 0 5px;
                    height: 43px;
                    display: flex;
                    box-sizing: border-box;
                    margin: 0 5px;
                }

                input {
                    width: 80px;
                    height: 43px;
                    border-radius: 1px;
                    //text-indent: 10px;
                    box-sizing: border-box;
                    text-align: center;
                    border: none;
                    outline: none;
                }

                .img {
                    width: 15px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;

                    //height: 43px;

                    div {
                        border-top: 10px solid #636972;
                        border-bottom: 10px solid transparent;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                    }

                    .itop {
                        border-top: 10px solid transparent;
                        border-bottom: 10px solid #636972;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        margin-top: -10px;
                    }

                    .ileft {
                        margin-bottom: -10px;
                    }
                }
            }

            .text {
                margin-top: 31px;
                width: 311px;
                height: 156px;
                font-weight: 400;
                font-size: 26px;
                color: #636972;
                letter-spacing: 0;
                text-align: center;
                line-height: 52px;
            }

            .btn {
                width: 100%;
                display: flex;
                justify-content: space-between;

                div {
                    width: 181px;
                    height: 78px;
                    //border-radius: 1px solid transparent;
                    border-radius: 78px;
                    text-align: center;
                    line-height: 78px;
                    background: #d9d9d9;
                    font-size: 32px;
                }

                div:nth-child(2) {
                    background: #00b5fe;
                    color: white;
                }
            }
        }

        .err {
            width: 540px;
            height: 563px;
            background: url("~@/assets/images/traddic/err.png");
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 32px 66px;
            box-sizing: border-box;

            div {
                width: 181px;
                height: 78px;
                //border-radius: 1px solid transparent;
                border-radius: 78px;
                text-align: center;
                line-height: 78px;
                background: #d9d9d9;
                font-size: 32px;
            }

            div:nth-child(2) {
                background: #00b5fe;
                color: white;
            }
        }
    }
}

.loading-toast {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: white;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
