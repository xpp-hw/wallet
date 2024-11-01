<template>
    <div class="warp">
        <div id="D01" class="exple" @click="goRecord">
            <img alt="" src="@/assets/images/traddic/exple.png" />
        </div>
        <div class="top">
            <img alt="" src="@/assets/images/traddic/indexTop.png" />
        </div>
        <div class="mid">
            <img alt="" src="@/assets/images/traddic/indexMid.png" />
        </div>
        <div id="A01" class="text">
            <div class="img" @click="checkAgree">
                <img
                    v-if="check"
                    alt=""
                    src="@/assets/images/traddic/check.png"
                />
                <img v-else alt="" src="@/assets/images/traddic/noCheck.png" />
            </div>
            <p>
                我已阅读并同意
                <span style="color: #5f8ef6" @click="checkAgree('text')"
                    >《流量宝服务开通协议》</span
                >
            </p>
        </div>
        <div id="C01" class="bottom" @click="open">
            <img alt="" src="@/assets/images/traddic/indenBtn.png" />
        </div>
        <!--        //弹窗-->
        <pop
            v-if="popshow"
            :isCanGet="isCanGet"
            :popType="popType"
            @closePop="closePop"
        ></pop>
        <checkCode
            v-if="isCheck"
            :Hfbtype="'01'"
            @closeCodeModel="closeCodeModel"
        ></checkCode>
        <closeHfb
            v-if="hfbPop"
            :Hfbtype="'02'"
            @closeCodeModel="closeCode"
        ></closeHfb>
        <div v-if="loading" class="loading-toast">
            <img alt="" src="@/assets/images/loading-toast.gif" />
        </div>
    </div>
</template>

<script>
import pop from "./pop.vue";
import api from "@/common/apiUrls";
import checkCode from "@/views/traffic/checkCode";
import closeHfb from "@/components/checkCodeModel.vue";
import { initPageJs } from "@/common/Page2435_1_fn.js";

export default {
    name: "trafficIndex",
    components: {
        pop,
        checkCode,
        closeHfb,
    },
    data() {
        return {
            loading: true,
            check: false, //是否勾选协议
            popshow: false, //是否显示弹窗
            popType: "one", //弹窗类型
            isCan: false, //是否可以开通流量宝
            isCanGet: false, //是否有未领取的话费宝权益
            isCheck: false, //是否显示验证码
            hfb: false,
            touchArr: [
                {
                    id: "A01",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_A01",
                },
                {
                    id: "B01",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_B01",
                },
                {
                    id: "B02",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_B02",
                },
                {
                    id: "B03",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_B03",
                },
                {
                    id: "B04",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_B04",
                },
                {
                    id: "B05",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_B05",
                },
                {
                    id: "C01",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_C01",
                },
                {
                    id: "D01",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_D01",
                },
                {
                    id: "E01",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_E01",
                },
                {
                    id: "F01",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_F01",
                },
                {
                    id: "F02",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_F02",
                },
                {
                    id: "G01",
                    touchCode: "WAP_T_TRADDIC_INDEX_01_G01",
                },
            ],
            hfbPop: false,
        };
    },
    mounted() {
        if (this.$route.query.check) {
            this.check = true;
        }
        this.discharge();
        this.hfbRight();
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        //勾选协议
        checkAgree(data) {
            console.log(111);
            this.check = !this.check;
            if (data == "text" && this.$route.query.check) {
                this.$router.push({
                    path: "/traddicProtocol",
                    query: {
                        state: true,
                        ...this.$route.query
                    },
                });
                return;
            }
            if (this.check) {
                if (this.$route.query.check) {
                    return;
                }
                this.$router.push({
                    path: "/traddicProtocol",
                    query: {
                        ...this.$route.query
                    },
                });
            }
        },
        //关闭验证码
        closeCodeModel(data) {
            console.log(data);
            this.isCheck = false;
            if (data == "succ") {
                // sessionStorage.setItem()
                this.$router.push({
                    path: "/traddicIndex",
                    query:{
                      ...this.$route.query
                    }
                });
            }
        },
        closeCode(data) {
            this.hfbPop = false;
            this.discharge();
        },
        //活动规则
        goRecord() {
            this.$router.push({
                path: "/traddicRule",
                query:{
                    ...this.$route.query
                }
            });
        },

        //关闭弹窗
        closePop(data) {
            this.popshow = false;
            if (data == "hfb") {
                this.hfbPop = true;
            }
        },
        //开通业务
        open() {
            if (!this.check) {
                this.$toast.info("请先勾选协议");
                return;
            }
            if (this.isCan) {
                this.isCheck = true;
            } else {
                this.popshow = true;
            }
        },
        //流量宝开通资格校验
        discharge() {
            api.llb.discharge().then((res) => {
                console.log(res.code);
                if (res.code == "04") {
                    //未开通了浦发钱包
                    this.popType = "three";
                } else if (res.code == "05") {
                    //开通了话费宝
                    this.popType = "one";
                } else if (res.code == "00" || res.code == "03") {
                    //没有开通钱包
                    this.popType = "two";
                } else if (res.code == "01") {
                    //具备开通资格
                    this.isCan = true;
                } else if (res.code == "02") {
                    this.$router.replace({ 
                      name: "traddicIndex",
                      query: this.$route.query
                     });
                }
                this.loading = false;
            });
        },
        //是否有话费宝未领取
        hfbRight() {
            api.hfb.initInfo().then((res) => {
                if (res.pendingIncome != 0) {
                    this.isCanGet = true;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: marker;

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

    .top {
        width: 750px;

        img {
            width: 100%;
            height: auto;
        }
    }

    .mid {
        width: 750px;
        margin-top: 13px;
        padding: 0 25px;
        box-sizing: border-box;

        img {
            width: 100%;
            height: auto;
        }
    }

    .text {
        display: flex;
        align-items: center;
        margin-top: 35px;
        margin-bottom: 22px;
        font-size: 28px;

        .img {
            width: 28px;
            height: 28px;
            margin-right: 10px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .bottom {
        width: 638px;

        img {
            width: 100%;
            height: auto;
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
