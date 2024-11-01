<template>
    <div class="wrap">
        <div class="wrap-inner">
            <div class="top-bg">
                <div class="activity-time">活动时间：即日起-2023年6月30日</div>
                <div class="my-prizes" id="B01" @click="prizeBtn"></div>
                <div class="activity-rules" id="A01" @click="actRulesBtn"></div>
            </div>
            <div class="banka">
                <div class="banka-btn" id="C01" @click="bankaBtn"></div>
            </div>
            <!--            <div class="youhui-title"></div>-->
            <!--            <div class="banks-list">-->
            <!--                <div class="list1" id="D01" @click="list1Go">-->
            <!--                    <p class="detail1">申请N Card且成功核卡</p>-->
            <!--                    <p class="detail2">-->
            <!--                        充值10元赠<span class="money">50</span>元话费-->
            <!--                    </p>-->
            <!--                </div>-->
            <!--                <div class="list2" id="D02" @click="list2Go">-->
            <!--                    <p class="detail1">首绑N Card并支付任意金额</p>-->
            <!--                    <p class="detail2">-->
            <!--                        加赠<span class="money">3</span>元话费-->
            <!--                    </p>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>

        <!-- 无奖品 -->
        <div class="no-prize-bg" v-if="noPrizeShow"></div>
        <div class="no-prize-cont" v-if="noPrizeShow">
            <div class="ok-btn" id="B02" @click="okBtn"></div>
        </div>

        <!-- 奖品展示 -->
        <div class="myPrize-bg" v-if="myPrizeShow"></div>
        <div class="myPrize-cont" v-if="myPrizeShow">
            <div v-if="myPrizeShow" class="myPrize-top"></div>
            <div class="myPrize-cont-details">
                <div class="myPrize-list-wrap" v-for="item in prizeList">
                    <div
                        class="myPrize-list"
                        :class="{ myPrizeBg2g: myPrizeBg2g }"
                    >
                        <div class="myPrize-date">{{ item.ordDate }}</div>
                    </div>
                </div>
                <div class="define-btn" id="B03" @click="defineBtn">确定</div>
            </div>
        </div>
        <!-- 已绑卡提示 -->
        <div class="banka-tipsbg" v-if="bankatanShow"></div>
        <div class="banka-cont" v-if="bankatanShow">
            <div class="banka-text">
                <p>您已成功绑定{{ bankNum }}张银行卡</p>
                <p>继续绑卡无法叠加享受优惠</p>
            </div>
            <div class="btns">
                <div class="cancel-btn" id="C02" @click="cancelBtn">取消</div>
                <div class="goon-btn" id="C03" @click="goonBtn">继续绑卡</div>
            </div>
        </div>
        <!-- 活动规则 -->
        <div class="rules-bg" v-if="rulestanShow"></div>
        <div class="rules-cont" v-if="rulestanShow">
            <div class="rules-details">
                <div class="rules-details-text">
                    1、活动时间：即日起-2023年6月30日<br />
                    2、活动对象：移动钱包用户<br />
                    3、活动内容：活动期间，在移动钱包银行卡账户中成功添加本人名下任一银行卡，享每月2GB流量赠送，最高可获赠8GB流量。示例如下：<br />
                </div>
                <div class="baodan"></div>
                <div class="rules-details-text">
                    4、流量奖品说明：新增绑卡成功后，当月流量于3个工作日内赠送，后续流量将于每月10日前赠送。若活动期间解绑银行卡，则当月及后续月份无法享受流量赠送。流量到账后立即生效，当月底失效。届时可在“此APP-查询服务-套餐余量”查询对应流量发放和使用记录；所赠流量不可滚存、兑换、共享或赠送他人使用。<br />
                    5、其他注意事项：
                    （1）同一用户仅限参加一次，绑定多张卡仅享受1次赠送。<br />
                    （2）参与活动的号码状态必须正常，报停的客户须先报开，欠停的客户、后付费有历史欠费的客户，须缴清欠费后，才能参加本活动。如用户当月预约变更主体产品，有可能导致无法参与活动。如用户已经参与移动其他活动导致冲突，将导致无法参加活动，具体以办理时页面展示为准。<br />
                    （3）每月最后一天21：30至次日凌晨1：00为系统升级维护时间，可能导致业务无法办理。<br />
                    （4）中奖用户在享受活动奖品优惠期间不得办理销户、过户、报停业务。
                </div>
            </div>
            <div class="confirm-btn" id="A02" @click="confirmBtn">确定</div>
        </div>
    </div>
</template>

<script>
import api from "@/common/apiUrls";
import { initPageJs } from "@/common/Page2435_1_fn.js";
import * as store2 from "@/common/localstore";

export default {
    name: "newBanksPhoneBill",
    components: {},
    data() {
        return {
            dealChn: "bkhd",
            myPrizeBg2g: true,
            prizeList: [],
            rulestanShow: false,
            bankNum: "1",
            myPrizeShow: false,
            noPrizeShow: false,
            bankatanShow: false,
            touchArr: [
                {
                    id: "A01",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_A01",
                },
                {
                    id: "A02",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_A02",
                },
                {
                    id: "B01",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_B01",
                },
                {
                    id: "B02",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_B02",
                },
                {
                    id: "B03",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_B03",
                },
                {
                    id: "C01",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_C01",
                },
                {
                    id: "C02",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_C02",
                },
                {
                    id: "C03",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_C03",
                },
                {
                    id: "D01",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_D01",
                },
                {
                    id: "D02",
                    touchCode: "WAP_T_NEWBANKSPHONEBILL_01_D02",
                },
            ],
        };
    },

    mounted() {},
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
        if (
            this.$route.query.dealChn !== "" &&
            this.$route.query.dealChn !== undefined
        ) {
            this.dealChn = this.$route.query.dealChn;
        } else {
            this.dealChn = "bkhd";
        }
    },
    methods: {
        bankaBtn() {
            // 立即绑卡 调用接口，已绑卡，显示弹窗提示 无直接跳绑卡
            api.getacpInfo({})
                .then((res) => {
                    if (res.usrBnkInfos.length > 0) {
                        this.bankatanShow = true;
                    } else {
                        this.bankatanShow = false;
                        window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/newBanks/addNewBanks?dealChn=${this.dealChn}&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
                    }
                })
                .catch((err) => {
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        list1Go() {
            window.location.href =
                "https://upay.12580life.com/upay/wps/service/NewCupToBannerPage.xhtml?PAG_TYP=1";
        },
        list2Go() {
            window.location.href = "https://wap.js.10086.cn/vw/WSCZYL";
        },
        prizeBtn() {
            //查奖品的情况

            let data = {};
            // 活动编号
            data.mobNo = store2.default.get("usrmob") || "";
            // data.mobNo = "15952033807";
            // 渠道号
            data.chnNo = "08";
            api.getPrizeInfo({ ...data })
                .then((res) => {
                    if (
                        res.msgCd == "BUS00000" &&
                        res.prizeTjnInfo.length !== 0
                    ) {
                        this.noPrizeShow = false;
                        this.myPrizeShow = true;
                        this.prizeList = res.prizeTjnInfo;
                        // this.prizeList = [
                        //     {
                        //         atyId: "ATY221018000097531",
                        //         tjnId: "1666062787387254581",
                        //         ordTye: "02",
                        //         ordAmt: "2GB",
                        //         ordDate: "2022年10月18日 ",
                        //     },
                        //     {
                        //         atyId: "ATY221018000097531",
                        //         tjnId: "1666062787387254581",
                        //         ordTye: "02",
                        //         ordAmt: "2GB",
                        //         ordDate: "2022年10月18日 ",
                        //     },
                        //     {
                        //         atyId: "ATY221018000097531",
                        //         tjnId: "1666062787387254581",
                        //         ordTye: "02",
                        //         ordAmt: "2GB",
                        //         ordDate: "2022年10月18日 ",
                        //     },
                        //     {
                        //         atyId: "ATY221018000097531",
                        //         tjnId: "1666062787387254581",
                        //         ordTye: "02",
                        //         ordAmt: "2GB",
                        //         ordDate: "2022年10月18日 ",
                        //     },
                        // ];
                        this.prizeList.map((i) => {
                            if (i.ordTye === "02") {
                                this.myPrizeBg2g = true;
                            } else {
                                this.myPrizeBg2g = false;
                            }
                        });
                    } else {
                        this.myPrizeShow = false;
                        this.noPrizeShow = true;
                    }
                })
                .catch((err) => {
                    // this.$toast.info(err.msgInfo);
                    // 订单不存在
                    this.myPrizeShow = false;
                    this.noPrizeShow = true;
                });
        },
        okBtn() {
            this.noPrizeShow = false;
        },
        actRulesBtn() {
            this.rulestanShow = true;
        },
        defineBtn() {
            this.myPrizeShow = false;
        },
        cancelBtn() {
            this.bankatanShow = false;
        },
        goonBtn() {
            //继续绑卡
            window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/newBanks/addNewBanks?dealChn=${this.dealChn}&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
        },
        confirmBtn() {
            this.rulestanShow = false;
        },
    },
};
</script>

<style lang="less" scoped>
.wrap {
    height: 1624px;
    overflow: hidden;
    position: relative;
    background: url("../../assets/images/newBanks/bg.png") no-repeat;
    background-size: 100% 100%;
    .wrap-inner {
    }

    .top-bg {
        //background: url("../../assets/images/newBanks/top-bg.png") no-repeat;
        //background-size: 100% 100%;
        height: 1039px;
        position: relative;
        .activity-time {
            padding-top: 270px;
            text-align: center;
            color: #f85935;
            font-size: 26px;
        }
        .my-prizes {
            background: url("../../assets/images/newBanks/myPrizeBg.png")
                no-repeat;
            background-size: 100% 100%;
            width: 46px;
            height: 130px;
            position: absolute;
            right: 0;
            top: 260px;
        }
        .activity-rules {
            background: url("../../assets/images/newBanks/activityRules.png")
                no-repeat;
            background-size: 100% 100%;
            width: 46px;
            height: 130px;
            position: absolute;
            right: 0;
            top: 400px;
        }
    }
    .banka {
        margin-top: 210px;
    }
    .banka-btn {
        background: url("../../assets/images/newBanks/bangka-btn.png") no-repeat;
        background-size: 100% 100%;
        width: 523px;
        height: 103px;
        margin: 20px auto 36px;
    }
    .youhui-title {
        background: url("../../assets/images/newBanks/title-bg.png") no-repeat;
        background-size: 100% 100%;
        width: 694px;
        height: 71px;
        margin: 0 auto;
    }
    .banks-list {
        .list1 {
            background: url("../../assets/images/newBanks/listbg1.png")
                no-repeat;
            background-size: 100% 100%;
            width: 577px;
            height: 132px;
            margin: 31px auto 19px;
            padding-top: 30px;
            padding-left: 69px;
            .detail1 {
                color: #868686;
                font-size: 24px;
                padding-bottom: 20px;
            }
            .detail2 {
                color: #333;
                font-size: 28px;
                font-weight: 500;
            }
            .money {
                font-size: 30px;
                color: #fe5b10;
            }
        }
        .list2 {
            background: url("../../assets/images/newBanks/listbg2.png")
                no-repeat;
            background-size: 100% 100%;
            width: 577px;
            height: 132px;
            padding-left: 69px;
            padding-top: 30px;
            margin: 0 auto 42px;
            .detail1 {
                color: #868686;
                font-size: 24px;
                padding-bottom: 20px;
            }
            .detail2 {
                color: #333;
                font-size: 28px;
                font-weight: 500;
            }
            .money {
                font-size: 30px;
                color: #f63045;
            }
        }
    }
    .no-prize-bg {
        background: #000;
        opacity: 0.78;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .no-prize-cont {
        background: url("../../assets/images/newBanks/no-prize.png") no-repeat;
        background-size: 100% 100%;
        width: 522px;
        height: 599px;
        position: absolute;
        top: 400px;
        left: 50%;
        margin-left: -261px;
        .ok-btn {
            width: 368px;
            height: 80px;
            position: absolute;
            bottom: 0;
            left: 100px;
        }
    }
    .myPrize-bg {
        background: #000;
        opacity: 0.78;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .myPrize-cont {
        width: 594px;
        position: absolute;
        top: 200px;
        left: 50%;
        margin-left: -297px;
        .myPrize-cont-details {
            background: linear-gradient(#fcdf97, #fff);
            position: absolute;
            left: 10px;
            right: 0;
            width: 573.5px;
            padding-bottom: 40px;
            border-radius: 0 0 30px 30px;
            top: 386px;
            overflow: scroll;
            max-height: 900px;
        }
    }
    .myPrize-top {
        background: url("../../assets/images/newBanks/myprize-topbg.png")
            no-repeat;
        background-size: 100% 100%;
        height: 396px;
    }

    .myPrize-list {
        width: 435px;
        height: 187px;
        margin: 0 auto;
    }
    .myPrizeBg2g {
        background: url("../../assets/images/newBanks/2gbg.png") no-repeat;
        background-size: 100% 100%;
    }
    .myPrize-date {
        font-size: 26px;
        color: #fff;
        padding-top: 100px;
        padding-left: 65px;
    }
    .define-btn {
        background: #fc7f1c;
        width: 368px;
        height: 80px;
        border-radius: 40px 40px 40px 40px;
        color: #fff;
        font-size: 42px;
        font-weight: Bold;
        text-align: center;
        line-height: 70px;
        margin: 0 auto;
    }
    .banka-tipsbg {
        background: #000;
        opacity: 0.78;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .btns {
        display: flex;
        justify-content: center;
        margin-top: 100px;
    }
    .banka-cont {
        background: url("../../assets/images/newBanks/bangkaBg.png") no-repeat;
        background-size: 100% 100%;
        width: 594px;
        height: 768px;
        position: absolute;
        top: 400px;
        left: 50%;
        margin-left: -297px;
    }
    .cancel-btn {
        width: 190px;
        height: 80px;
        border-radius: 40px 40px 40px 40px;
        background: #a9a9a9;
        color: #fff;
        text-align: center;
        margin-right: 20px;
        font-size: 42px;
        font-weight: 500;
        line-height: 80px;
    }
    .goon-btn {
        width: 278px;
        height: 80px;
        border-radius: 40px 40px 40px 40px;
        background: #fc7f1c;
        color: #fff;
        text-align: center;
        font-size: 42px;
        font-weight: 500;
        line-height: 80px;
    }
    .banka-text {
        font-size: 32px;
        text-align: center;
        color: #666666;
        margin-top: 450px;
        line-height: 48px;
    }
    .rules-bg {
        background: #000;
        opacity: 0.78;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .rules-cont {
        background: url("../../assets/images/newBanks/huodongtanbg.png")
            no-repeat;
        background-size: 100% 100%;
        width: 594px;
        height: 1243px;
        position: absolute;
        top: 200px;
        left: 50%;
        margin-left: -297px;
    }
    .rules-details {
        margin-top: 400px;
        padding: 0 62px 0 57px;
        height: 7rem;
        overflow: scroll;
    }
    .baodan {
        background: url("../../assets/images/form_1.png") no-repeat;
        background-size: 100% 100%;
        width: 482px;
        height: 152px;
        margin: 20px 0;
    }
    .rules-details-text {
        color: #575757;
        font-size: 24px;
        line-height: 34px;
        font-weight: 500;
    }
    .confirm-btn {
        width: 368px;
        height: 80px;
        border-radius: 40px 40px 40px 40px;
        background: #fc7f1c;
        color: #fff;
        text-align: center;
        font-size: 42px;
        font-weight: 500;
        line-height: 80px;
        margin: 50px auto 0;
    }
}
</style>
