<template>
    <div class="contains">
        <div v-if="flowShow">
            <div class="sucImg">
                <img
                    src="../../assets/images/newBanks/chengong-img.png"
                    alt=""
                />
            </div>
            <div class="flow-bg">
                <div class="flow-img"></div>
                <div class="flow-cont">
                    <p class="prize-explain">奖品说明：</p>
                    1、后续流量将于每月10日前赠送。流量到账后立即生效，当月月底失效。若活动期间解绑银行卡，则解绑当月及后续月份无法享受流量赠送。<br />
                    2、您可在“此APP-查询服务-套餐余量”查询对应流量发放和使用记录。<br />
                </div>
            </div>

            <!-- <div class="tips">银行卡添加成功</div> -->
            <md-button class="confirmBtn" id="A01" @click="jumpUrl"
                >确定</md-button
            >
            <div class="zeroBox" @click="goZero"></div>

            <!-- 页面回调地址 -->
        </div>
        <div v-else>
            <div class="sucImg">
                <img
                    src="../../assets/images/newBanks/chengong-img.png"
                    alt=""
                />
            </div>
            <!-- <div class="tips">银行卡添加成功</div> -->
            <md-button class="confirmBtn" id="A01" @click="jumpUrl"
                >确定</md-button
            >
            <!-- 页面回调地址 -->
            <div class="zeroBox" @click="goZero"></div>
        </div>
    </div>
</template>

<script>
import api from "@/common/apiUrls";
import * as store2 from "@/common/localstore";
import { initPageJs } from "@/common/Page2435_1_fn.js";

export default {
    name: "addSucNew",
    components: {},
    data() {
        return {
            zero: false,
            flowShow: false,
            backUrl: "",
            dealChn: "",
            ZFbackID: "",
            sucFlag: "",
            touchArr: [],
        };
    },

    mounted() {
        this.getZero();
        //  获取地址栏的参数
        this.dealChn = this.$route.query.dealChn;
        // 支付项目返回地址id
        this.ZFbackID = this.$route.query.ZFbackID || "";
        this.sucFlag = this.$route.query.sucFlag;
        this.getYLnwewBank();
        this.getBackUrl({
            dealChn: this.dealChn,
        });

        let data = {};
        // 活动编号
        // data.mobNo = store2.default.get("usrmob") || "";
        data.mobNo = "15952033807";
        // 渠道号
        data.chnNo = "08";
        // api.getPrizeInfo({ ...data })
        //     .then((res) => {
        //         if (res.msgCd === "BUS00000") {
        //             this.flowShow = true;
        //         } else if (res.msgCd === "BUS70011") {
        //             this.flowShow = false;
        //         }
        //     })
        //     .catch((err) => {
        //         this.$toast.info(err.msgInfo);
        //     });
        if (this.sucFlag == "0") {
            this.flowShow = false;
            this.touchArr.push({
                id: "A01",
                touchCode: "WAP_T_ADDSUCNEW_WJ_01_A01",
            });
            initPageJs("WAP_L_ADDSUCNEW_WJ_01", this.touchArr);
        } else if (this.sucFlag == "1") {
            this.flowShow = true;
            this.touchArr.push({
                id: "A01",
                touchCode: "WAP_T_ADDSUCNEW_YJ_01_A01",
            });
            initPageJs("WAP_L_ADDSUCNEW_YJ_01", this.touchArr);
        }
    },
    methods: {
        getBackUrl(data) {
            api.newBank
                .backUrl(data)
                .then((res) => {
                    this.backUrl = res.backUrl;
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        jumpUrl() {
            if (this.backUrl && this.ZFbackID) {
                window.location.href = `${this.backUrl}?ORD_NO=${this.ZFbackID}`;
            } else if (this.backUrl) {
                window.location.href = this.backUrl;
            } else {
                // this.$router.push({
                //     name: "walletCardcenter",
                // });

                // this.$router.push({
                //     name: "myYLBanks",
                // });
                if (this.dealChn !== "" && this.dealChn !== undefined) {
                    this.$router.push({
                        name: "myYLBanks",
                        query: {
                            dealChn: this.dealChn,
                        },
                    });
                } else {
                    this.$router.push({
                        name: "myYLBanks",
                        query: {
                            dealChn: "10010",
                        },
                    });
                }
            }
        },
        // 重新获取银联银行卡信息
        getYLnwewBank() {
            api.wapAcplist({})
                .then((res) => {
                    store2.default.set("ylBankListsInfo", res.usrBnkInfos);
                })
                .catch((err) => {
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        //零元包福利
        getZero() {
            api.indexZero().then((res) => {
                if (res.firstOpenFlg == "0") {
                    this.zero = true;
                }
            });
        },
        //去零元包
        goZero() {
            window.location.href =
                'https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
        },
    },
};
</script>
<style lang="less" scoped>
.contains {
    height: 100%;
    background: #f2f2f2;
    min-height: 100vh;
    overflow: hidden;
    .sucImg {
        width: 568px;
        height: 438px;
        opacity: 1;
        margin: 0 auto;
        padding-top: 64px;
        img {
            width: 100%;
            width: 100%;
        }
    }
    .tips {
        height: 48px;
        opacity: 1;
        font-size: 34px;
        font-weight: 500;
        text-align: center;
        color: #333333;
        line-height: 48px;
    }
    .confirmBtn {
        width: 503px;
        height: 89px;
        opacity: 1;
        background: #0195ff;
        border-radius: 10px;
        font-size: 40px;
        font-weight: 500;
        color: #ffffff;
        margin: 120px auto 0;
        border-radius: 44px;
    }
    .flow-bg {
        width: 610px;
        height: 503px;
        border-radius: 10px;
        margin: 39px auto;
        background: #fff;
        padding-top: 56px;
    }
    .flow-img {
        background: url("../../assets/images/newBanks/flow-img.png") no-repeat;
        background-size: 100% 100%;
        width: 435px;
        height: 187px;
        margin: 0 auto;
    }
    .flow-cont {
        color: #333333;
        padding: 36px 45px 0 40px;
        line-height: 33px;
        font-size: 22px;
    }
    .prize-explain {
        font-size: 26px;
        padding-bottom: 19px;
    }
    .zeroBox {
        width: 664px;
        height: 158px;
        margin: 46px auto 0;
        background: url("~@/assets/images/newBanks/fiveYuan.png") no-repeat;
        background-size: 100% 100%;
    }
}
</style>
