<template>
   <div class="contains">
            <div class="mainContain">
                <div class="title">零钱转帐充值操作步骤</div>
                <div class="guidMsg">
                <div class="firstStep">
                    <div class="description">
                        <div class="number">1</div>
                        <div class="instructions">进入【我的银行】页面，点击【电子卡】，再<br>点击【复制卡号】</div>
                    </div>
                    <div class="imgs">
                        <img src="../../assets/images/recharge/firstStep.png" alt="">
                        <img class="rightImg" src="../../assets/images/recharge/secondStep.png" alt="">
                    </div>
                </div>
                <div class="secondStep">
                    <div class="description">
                        <div class="number">2</div>
                        <div class="instructions">打开任意银行APP或网银，选择【转账】功能</div>
                    </div>
                    <div class="imgs">
                        <img src="../../assets/images/recharge/thirdStep.png" alt="">
                    </div>
                </div>
                <div class="thirdStep secondStep">
                    <div class="description">
                        <div class="number">3</div>
                        <div class="instructions">粘贴钱包卡号，输入转账金额</div>
                    </div>
                    <div class="imgs">
                        <img src="../../assets/images/recharge/fourthStep.png" alt="">
                        <img class="rightImg" src="../../assets/images/recharge/fiveStep.png" alt="">
                    </div>
                </div>
                <div class="fourStep secondStep">
                    <div class="description">
                        <div class="number">4</div>
                        <div class="instructions">转账成功，进入钱包【首页】查看余额</div>
                    </div>
                    <div class="imgs">
                        <img src="../../assets/images/recharge/sixthStep.png" alt="">
                    </div>
                </div>
                </div>
            </div>
        <div class="copyBtn" id="A01" @click="copyCard()">复制卡号</div>
   </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
// import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'rechargeGuide',
    components: {
        mdHeader
    },
    data() {
        return {
            accountNo: this.$route.query.accountNo,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_RECHARGEGUIDE_A01'
                }
            ]
        };
    },
    mounted() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        copyCard() {
            console.log(this.accountNo);
            this.$copyText(this.accountNo).then(() => {
                this.$toast.info('复制成功', 3000, true);
            }).catch(() => {
                this.$toast.info('复制成功', 3000, true);
            });
        }
    }
};
</script>
<style lang="less" scoped>
    .contains {
        .mainhead {
            width: 100%;
            position: fixed;
            top: 0;
        }
        .mainContain {
            // border-top: 20px solid #f5f5f5;
            // margin-top: 88px;
            margin-bottom: 105px;
            .title {
                height: 89px;
                margin-top: 20px;
                padding-left: 30px;
                padding-right: 30px;
                background: #ffffff;
                border-bottom: 1px solid #E1E1E1;
                line-height: 89px;
                font-size: 32px;
                font-weight: 500;
                text-align: left;
                color: #333333;
            }
            .guidMsg {
                background: #ffffff;
                padding: 0px 30px 0 30px;
                .firstStep {
                    padding-top: 30px;
                    height: 365px;
                    .description {
                        height: 85px;
                        display: flex;
                        justify-content: space-between;
                        .number {
                            width: 50px;
                            height: 50px;
                            opacity: 1;
                            background: #0195ff;
                            border-radius: 50%;
                            font-size: 30px;
                            font-weight: 500;
                            text-align: center;
                            color: #ffffff;
                            line-height: 50px;
                        }
                        .instructions{
                            width: 615px;
                            height: 84px;
                            opacity: 1;
                            font-size: 30px;
                            font-weight: 400;
                            text-align: left;
                            color: #333333;
                        }
                    }
                    .imgs {
                        display: flex;
                        justify-content: center;
                        img {
                            width: 277px;
                            height: 277px;
                        }
                        .rightImg {
                            margin-left: 15px;
                        }
                    }
                }
                .secondStep {
                    margin-top: 27px;
                    height: 327px;
                    .description {
                        height: 50px;
                        display: flex;
                        justify-content: space-between;
                        .number {
                            width: 50px;
                            height: 50px;
                            opacity: 1;
                            background: #0195ff;
                            border-radius: 50%;
                            font-size: 30px;
                            font-weight: 500;
                            text-align: center;
                            color: #ffffff;
                            line-height: 50px;
                        }
                        .instructions{
                            width: 615px;
                            height: 50px;
                            opacity: 1;
                            font-size: 30px;
                            font-weight: 400;
                            text-align: left;
                            color: #333333;
                        }
                    }
                    .imgs {
                        display: flex;
                        justify-content: center;
                        img {
                            width: 277px;
                            height: 277px;
                        }
                    }
                }
            }
        }
        .copyBtn {
            position: fixed;
            bottom: 0;
            width: 750px;
            height: 100px;
            opacity: 1;
            background: #0195ff;
            font-size: 36px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 100px;
        }
  }
</style>
