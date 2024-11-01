<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-05-08 15:17:32
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-05-15 09:15:06
 * @FilePath: \wallet\src\views\gfBank\fishCard.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="wrap">
        <div class="bg1">
            <div class="activityRules" @click="showRules"></div>
        </div>
        <div class="bg2"></div>
        <div class="bg3"></div>
        <div class="bg4">
            <p class="details" @click="showDetails"></p>
        </div>
        <div class="btn1" @click="applyFishCard"></div>
        <div class="btn2" @click="applyDragonCard">
            <div class="jiaobiao"></div>
        </div>

        <div class="tankuang" v-if="tankuang">
            <div class="headerBg">
                <p v-if="isShow">广发银行有鱼潮系列白金卡</p>
                <p v-else>广发信用卡新客限时礼遇</p>
                <div class="close" @click="closeRules"></div>
            </div>
            <div class="content">
                <div class="title_line"  v-if="isShow">
                    <img src="@/assets/images/gfBank/left_bg.png" alt="">
                    <p>活动规则</p>
                    <img src="@/assets/images/gfBank/right_bg.png" alt="">
                </div>
                <!-- // 活动规则 -->
                <div v-if="isShow" id="rules" class="rulesContent" v-html="agreementContent1"></div>
                <!-- // 了解详情 -->
                <div v-if="!isShow" class="rulesContent" v-html="agreementContent2"></div>
            </div>
        </div>

    </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    name: "fishCard",
    data() {
        return {
            tankuang: false,
            agreementContent1: "", // 活动规则
            agreementContent2: "", // 了解详情
            isShow: true,
        }
    },
    mounted() {
        // 了解详情
        this.queryAgreement('gfxykxkhhdgz')
        // 活动规则
        this.queryAgreement('gfyycxlbjkcpgz')
    },
    methods: {
        showRules() {
            this.tankuang = true;
            this.isShow = true;
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = 'hidden'
        },
        showDetails() {
            this.tankuang = true;
            this.isShow = false;
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = 'hidden'
        },
        queryAgreement(code) {
            api.huataiAgreement({
                businessCode: code
            })
            .then((res) => {
                if(code == 'gfyycxlbjkcpgz') {
                    this.agreementContent1 = res.content.replace(/px/g,'').replace(/line-height/g,'')
                } else {
                    this.agreementContent2 = res.content.replace(/px/g,'').replace(/line-height/g,'')
                }
            })
        },
        closeRules() {
            this.tankuang = false;
            document.documentElement.style.overflow = "";
            document.body.style.overflow = ''
        },
        // 申请有鱼潮白金卡
        applyFishCard() {
            let type = this.$route.query.yycbjk
            if(type) {
                window.location.href = `https://n.95508.com/${type}`
            } else {
                window.location.href = "https://n.95508.com/yFywi3t1Q"
            }
        },
        // 申请龙年限定白金卡
        applyDragonCard() {
            let type = this.$route.query.lnxdbjk
            if(type) {
                window.location.href = `https://n.95508.com/${type}`
            } else {
                window.location.href = "https://n.95508.com/p0XLLk3KO"
            }
        }
    },
}
</script>

<style scoped lang="less">
.wrap {
    background: #54AAFF;
    overflow: hidden;
}
.bg1 {
    position: relative;
    width: 100%;
    height: 948px;
    background: url('~@/assets/images/gfBank/fish_bg1.png') no-repeat;
    background-size: 100%;
    .activityRules {
        position: absolute;
        top: 190px;
        right: 0;
        width: 60px;
        height: 69px;
        background: url('~@/assets/images/gfBank/fish_rules.png') no-repeat;
        background-size: 100%;
    }
}
.bg2 {
    width: 700px;
    height: 496px;
    background: url('~@/assets/images/gfBank/fish_bg2.png') no-repeat;
    background-size: 100%;
    margin: 9px auto 18px;
}
.bg3 {
    width: 700px;
    height: 496px;
    background: url('~@/assets/images/gfBank/fish_bg3.png') no-repeat;
    background-size: 100%;
    margin: 18px auto 24px;
}
.bg4 {
    position: relative;
    width: 700px;
    height: 456px;
    background: url('~@/assets/images/gfBank/fish_bg4.png') no-repeat;
    background-size: 100%;
    margin: 0 auto 30px;
    .details {
        position: absolute;
        left: 120px;
        top: 150px;
        width: 140px;
        height: 60px;
    }
}
.btn1 {
    width: 556px;
    height: 131px;
    background: url('~@/assets/images/gfBank/fish_btn1.png') no-repeat;
    background-size: 100%;
    margin: 0 auto 18px;
}
.btn2 {
    position: relative;
    width: 561px;
    height: 118px;
    background: url('~@/assets/images/gfBank/fish_btn2.png') no-repeat;
    background-size: 100%;
    margin: 0 auto 70px;
    .jiaobiao {
        position: absolute;
        top: -28px;
        right: -42px;
        width: 236px;
        height: 53px;
        background: url('~@/assets/images/gfBank/fish_jiaobiao.png') no-repeat;
        background-size: 100%;
    }
}
.tankuang {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(2, 2, 2, 0.7);
    z-index: 999;
    .headerBg {
        position: relative;
        width: 100%;
        height: 120px;
        background: url('~@/assets/images/gfBank/fish_toastBg.png') no-repeat;
        background-size: 100%;
        .close {
            position: absolute;
            top: 35px;
            right: 40px;
            width: 38px;
            height: 38px;
            background: url('~@/assets/images/gfBank/close.png') no-repeat;
            background-size: 100%;
        }
        p {
            font-size: 34px;
            text-align: center;
            color: #06374E;
            letter-spacing: 7px;
            font-weight: 600;
            line-height: 120px;
        }
    }
    .content {
        width: 100%;
        height: 750px;
        background: #FFFFFF;
        margin: -2px 0 0 0;
        box-sizing: border-box;
        padding: 0 40px;
        .title_line {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32px;
            text-align: left;
            color: #32737F;
            letter-spacing: 6px;
            font-weight: 600;
            margin: 0px 0 20px;
            p {
                margin: 0 32px;
            }
            img {
                width: 146px;
                height: 12px;
            }
        }
        .p1 {
            color: #5d6568;
            font-size: 24px;
            text-align: left;
            line-height: 36px;
            letter-spacing: 5px;
            margin: 0 0 30px 0;
        }
        .p1:nth-of-type(1) {
            margin: 38px 0 30px 0;
        }
    }
}
.rulesContent {
    width: 100%;
    height: 600px;
    overflow: scroll;
    font-size: 24px;
    text-align: left;
    line-height: 36px;
    letter-spacing: 5px;
}
</style>
<style scoped>
/deep/ #rules td {
    border: 2px solid black;
}
</style>
