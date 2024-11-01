<template>
    <div class="box">
        <div id="1"></div>
        <div class="tankuang" v-if="isShow">
            <div class="content">
                <div class="head">
                    <div style="display: flex;justify-content: space-around;align-items: center;">
                        <div :class="isCheck == '0' ? 'onDetailBtn' : 'detailBtn' " @click="checkBtn(0)"></div>
                        <div :class="isCheck == '1' ? 'onQuestionBtn' : 'questionBtn' " @click="checkBtn(1)"></div>
                        <div :class="isCheck == '2' ? 'onRuleBtn' : 'ruleBtn' " @click="checkBtn(2)"></div>
                        <div class="drop" @click="close"></div>
                    </div>
                </div>

                <!-- 权益详情 -->
                <div v-if="isCheck == '0' ">
                    <div style="margin-top: -1.6rem;">
                        <div class="detailTop"></div>
                        <div class="detailBottom"></div>
                        <div id="2"></div>
                    </div>
                </div>

                <!-- 常见问题 -->
                <section-common v-if="isCheck == '1' "></section-common>

                <!-- 活动规则 -->
                <div class="section" v-if="isCheck == '2'">
                    <div style="margin-top: -1.6rem;">
                        <div class="overSection" v-html="agreementContent">
                    </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="knowBtn" @click="close"></div>
                </div>
                
            </div>
        </div>

    </div>
</template>

<script>
import sectionCommon from "./sectionCommon.vue"
import api from '@/common/apiUrls';

export default {
    name: "carOwnerCard",
    components: {
        sectionCommon
    },
    data() {
        return {
            isCheck: '0',
            agreementContent: ""
        }
    },
    props: {
        isShow: {
            type: Boolean,
            default: true
        },
    }, 
    methods: {
        checkBtn(typ) {
            this.isCheck = typ;
        },
        close() {
            this.isCheck = '0'
            this.$emit('close')
        },
        scrollToTop() {
            document.getElementById('1').scrollIntoView();
        },
        scrollToBottom() {
            document.getElementById('2').scrollIntoView();
        }
    },
    watch: {
        isShow: {
            handler(newV) {
                if(newV === true) {
                    api.huataiAgreement({
                        businessCode: 'gfczjybjkhd'
                    })
                    .then((res) => {
                        this.agreementContent = res.content.replace(/px/g,'')
                    })
                }
            },
            deep: true,
        }
    }
}
</script>


<style scoped lang="less">
.box {
    position: absolute;
    top: 0;
    z-index: 9999;
    width: 100%;
    background: rgba(2, 2, 2, 0.7);
}
.tankuang {
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    
    z-index: 999;
    .content {
        margin-top: 500px;
        background: #F5F8FA;
        .head {
            width: 750px;
            height: 295px;
            background: url('~@/assets/images/gfBank/tankuang_headerBg.png') no-repeat;
            background-size: 100%;
            padding: 39px 20px 0 20px;
            box-sizing: border-box;
            margin-top: -30px;
            .onDetailBtn {
                width: 187px;
                height: 62px;
                background: url('~@/assets/images/gfBank/onDetailBtn.png') no-repeat;
                background-size: 100%;
            }
            .detailBtn {
                width: 187px;
                height: 62px;
                background: url('~@/assets/images/gfBank/detailBtn.png') no-repeat;
                background-size: 100%;
            }
            .onQuestionBtn {
                width: 187px;
                height: 62px;
                background: url('~@/assets/images/gfBank/onQuestionBtn.png') no-repeat;
                background-size: 100%;
            }
            .questionBtn {
                width: 187px;
                height: 62px;
                background: url('~@/assets/images/gfBank/questionBtn.png') no-repeat;
                background-size: 100%;
            }
            .onRuleBtn {
                width: 187px;
                height: 62px;
                background: url('~@/assets/images/gfBank/onRuleBtn.png') no-repeat;
                background-size: 100%;
            }
            .ruleBtn {
                width: 187px;
                height: 62px;
                background: url('~@/assets/images/gfBank/ruleBtn.png') no-repeat;
                background-size: 100%;
            }
            .drop {
                width: 36px;
                height: 22px;
                background: url('~@/assets/images/gfBank/drop.png') no-repeat;
                background-size: 100%;
            }
        }
        .section {
            .overSection {
                box-sizing: border-box;
                padding: 0 20px;
            }
            .title {
                font-size: 25px;
                text-align: left;
                color: #26333C;
                font-weight: 600;
                margin: 32px 0 0 0;
            }
            p {
                font-size: 22px;
                text-align: left;
                color: #4E5256;
                line-height: 1.4;
            }
        }
        .bottom {
            background: #F5F8FA;
            //margin: -33px 0 0 0;
            overflow: hidden;
        }
        .knowBtn {
            width: 508px;
            height: 85px;
            background: url('~@/assets/images/gfBank/knowBtn.png') no-repeat;
            background-size: 100%;
            margin: 36px auto 50px;
        }       
    }
    .detailTop {
        width: 712px;
        height: 548px;
        background: url('~@/assets/images/gfBank/detail_topBg.png') no-repeat;
        background-size: 100%;
        margin: 0 auto;
    }
    .detailBottom {
        width: 712px;
        height: 1114px;
        background: url('~@/assets/images/gfBank/detail_bottomBg.png') no-repeat;
        background-size: 100%;
        margin: 0 auto;
    }
}
</style>
<style scoped>
/deep/ td {
    border: 2px solid black;
}
</style>