<template>
    <div class="checkCode_box">
        <div class="content">
            <p class="bigtitle">输入短信验证码</p>
            <p class="strong">
                <span class="label">手机号：</span>
                <span>{{ phone }}</span>
                <button
                    :class="[send ? '' : 'actbtn']"
                    :disabled="send"
                    class="getbtn"
                    @click="getCheckCode"
                >
                    {{ smsMsg }}
                </button>
            </p>
            <p class="strong">
                <span class="label">验证码：</span>
                <input
                    id="numCode"
                    v-model="numVal"
                    maxlength="4"
                    placeholder="请输入验证码"
                    text="number"
                    type="number"
                />
            </p>
            <!--            <div class="voice">收不到短信验证码？点击试试<span :class="{blue:!send}" @click="getVoiceCode">语音验证码</span></div>-->
            <p class="btnBox">
                <button class="btn" @click="cancleBtn">取消</button>
                <button
                    :class="numValLengthTrue ? 'btnSure' : 'btnFail'"
                    class="btn"
                    @click="confirmBtn"
                >
                    确认
                </button>
            </p>
        </div>
    </div>
</template>

<script>
import api from "@/common/apiUrls";
import * as store2 from "@/common/localstore";
import popups from "@/components/popups.vue";

export default {
    name: "checkCodeModel",
    components: {
        popups,
    },
    props: {
        Hfbtype: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            numVal: "",
            numValLengthTrue: false,
            phone: store2.default
                .get("usrmob")
                .replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
            smsMsg: "获取验证码",
            timer: null,
            attcode: true,
            send: false,
            countdown: 60,
            smsJrn: "",
            canClick: true,
        };
    },
    mounted() {
        this.smsMsg = "获取验证码";
        this.countdown = 60;
        this.canClick = true;
        this.getCheckCode();
    },
    watch: {
        numVal(val) {
            if (val.length > 4) {
                this.numVal = val.substring(0, 4);
            }
            if (val.length !== 4) {
                this.numValLengthTrue = false;
            } else {
                this.numValLengthTrue = true;
            }
        },
    },
    methods: {
        // 获取验证码
        getCheckCode() {
            // 可以点击
            if (this.smsMsg.indexOf("s") === -1 && this.canClick) {
                this.canClick = false;
                api.getXbhSmsCode({ type: this.Hfbtype })
                    .then((res) => {
                        this.canClick = true;
                        if (res.msgCd.indexOf("00000") > -1) {
                            this.getValidStr();
                            this.timer = setInterval(this.getValidStr, 1000);
                            this.smsJrn = res.smsJrn;
                        } else {
                            this.$toast.info(res.msgInfo);
                        }
                    })
                    .catch((err) => {
                        this.canClick = true;
                        this.$toast.info(err.msgInfo);
                    });
            }
        },
        // 获取语音验证码
        getVoiceCode() {
            if (this.send) {
                return;
            }
            // 可以点击
            if (this.smsMsg.indexOf("s") === -1 && this.canClick) {
                this.canClick = false;
                api.getXbhSmsCode({ type: this.Hfbtype, smsType: "1" })
                    .then((res) => {
                        this.canClick = true;
                        if (res.msgCd.indexOf("00000") > -1) {
                            this.getValidStr();
                            this.timer = setInterval(this.getValidStr, 1000);
                            this.smsJrn = res.smsJrn;
                        } else {
                            this.$toast.info(res.msgInfo);
                        }
                    })
                    .catch((err) => {
                        this.canClick = true;
                        this.$toast.info(err.msgInfo);
                    });
            }
        },
        // 获取验证码按钮的提示
        getValidStr() {
            if (this.countdown > 0 && this.countdown <= 60) {
                this.countdown -= 1;
                const times = this.countdown;
                if (this.countdown !== 0) {
                    this.send = true;
                    this.smsMsg = `${times}s`;
                } else {
                    clearInterval(this.timer);
                    this.send = false;
                    this.smsMsg = "重新获取";
                    this.countdown = 60;
                    this.timer = null;
                }
            }
        },
        // 取消按钮
        cancleBtn() {
            clearInterval(this.timer);
            this.send = false;
            this.smsMsg = "重新获取";
            this.countdown = 60;
            this.timer = null;
            this.$emit("closeCodeModel", "fail");
        },
        // 验证码校验
        confirmBtn() {
            if (this.numVal.length !== 4) {
                this.$toast.info("请输入4位验证码");
                return;
            }
            if (this.Hfbtype === "02") {
                // 关闭小宝花
                // console.log(store2.default.get('usrmob'), this.numVal, this.smsJrn);
                api.accountInfoClose({
                    mobNo: store2.default.get("usrmob"),
                    smsCode: this.numVal,
                    smsJrn: this.smsJrn,
                })
                    .then(() => {
                        this.$toast.info("关闭小宝花成功");
                        this.$emit("closeCodeModel", "succ");
                    })
                    .catch((err) => {
                        this.$toast.info(err.msgInfo, 3000);
                    });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.checkCode_box {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 99;

    .content {
        background: #ffffff;
        margin: 4rem 0.3rem 0;
        border-radius: 0.3rem;
        padding-bottom: 0.5rem;
        .voice {
            margin-left: 35px;
            margin-top: 25px;
            font-size: 24px;
            font-weight: 500;
            span {
                color: #c6c6c6;
            }
            .blue {
                color: #1fa3ee;
                text-decoration: underline #1fa3ee;
            }
        }
        p {
            margin: 0 0.2rem;
            border-bottom: 1px solid #ccc;
            line-height: 1.2rem;
        }

        .bigtitle {
            font-size: 0.36rem;
            font-weight: 600;
            text-align: center;
        }

        .strong {
            font-size: 0.32rem;
            font-weight: 500;

            .label {
                display: inline-block;
                margin: 0 0.2rem;
            }

            .getbtn {
                height: 0.8rem;
                width: 6em;
                line-height: 0.8rem;
                float: right;
                margin-top: 0.2rem;
                border: 0.01rem solid #0195ff;
                border-radius: 0.08rem;
                background: #ffffff;
                color: #666;
            }

            .actbtn {
                color: #0195ff;
            }
        }

        .btnBox {
            display: flex;
            margin: 0 0.2rem;
            justify-content: space-around;
            font-size: 0.36rem;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: center;
            line-height: 0.9rem;
            margin-top: 0.5rem;
            border: 0;

            .btn {
                width: 2.5rem;
                color: #0195ff;
                border-radius: 0.08rem;
                border: 0.01rem solid #0195ff;
                background: #ffffff;
            }

            .btnSure {
                background: #0195ff;
                color: #ffffff;
            }

            .btnFail {
                background: #bce0fa;
                color: #ffffff;
            }
        }
    }
}

#numCode {
    // height: 110px;
    font-size: 32px;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    text-align: left;
    // line-height: 110px;
    letter-spacing: -1px;
    border: none;
}

input::-webkit-input-placeholder {
    color: #d9d9d9;
}

input::-moz-input-placeholder {
    color: #d9d9d9;
}

input::-ms-input-placeholder {
    color: #d9d9d9;
}
</style>
