<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2022-09-20 09:23:37
 * @LastEditors: Mr.Zhao 1914689669@qq.com
 * @LastEditTime: 2023-03-15 11:52:37
 * @FilePath: \wallet\src\views\nbBank\nbBankDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="nbBank">
        <div class="topBg">
            <div class="giftTile" v-if="showTile == 'heka'">
                <p>核卡礼</p>
                <p>核卡通过即送10GB流量</p>
            </div>
            <div class="giftTile" v-if="showTile == 'kaika'">
                <p>开卡礼</p>
                <p>达标送100元话费</p>
            </div>
            <div class="giftTile" v-if="showTile == 'shoushua'">
                <p>首刷礼</p>
                <p>达标送100元话费</p>
            </div>
            <div class="giftTile" v-if="showTile == 'dongka'">
                <p>动卡礼</p>
                <p>达标可享1积分兑换视听<br />会员月卡</p>
            </div>
        </div>
        <div
            class="content"
            :class="{ content2: showTile == 'shoushua' || showTile == 'kaika' }"
        >
            <div class="tickets" v-if="showTile == 'heka'">
                <div class="text" v-if="hekadabiao">已达标</div>
                <div class="text" v-else>未达标</div>
                <img
                    class="tickets_pic"
                    src="~@/assets/images/nbBank/detail/tickets_1.png"
                    alt=""
                />
                <div v-if="hekadabiao">
                    <img
                        class="btn"
                        src="~@/assets/images/nbBank/detail/sentBtn.png"
                        alt=""
                    />
                </div>
                <div v-else @click="btnApply('heka')" id="A01" class="btn">
                    <img
                        src="~@/assets/images/nbBank/detail/goApply.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="tickets" v-if="showTile == 'kaika'">
                <div class="text" v-if="kaikadabiao">已达标</div>
                <div class="text" v-else>未达标</div>
                <img
                    class="tickets_pic"
                    src="~@/assets/images/nbBank/detail/tickets_2.png"
                    alt=""
                />
                <div v-if="kaikadabiao">
                    <img
                        class="btn"
                        src="~@/assets/images/nbBank/detail/sentBtn.png"
                        alt=""
                    />
                </div>
                <div v-else class="btn" @click="btnApply('kaika')" id="A01">
                    <img
                        src="~@/assets/images/nbBank/detail/goRecharge.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="tickets" v-if="showTile == 'shoushua'">
                <!-- <div class="text" v-if="dabiao">已达标</div>
                <div class="text" v-else>未达标</div> -->
                <img
                    class="tickets_pic"
                    src="~@/assets/images/nbBank/detail/tickets_3.png"
                    alt=""
                />
                <div v-if="shoushuadabiao">
                    <img
                        class="btn"
                        src="~@/assets/images/nbBank/detail/sentBtn.png"
                        alt=""
                    />
                </div>
                <div v-else class="btn" @click="btnApply('shoushua')" id="A01">
                    <img
                        src="~@/assets/images/nbBank/detail/goRecive.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="tickets" v-if="showTile == 'dongka'">
                <!-- <div class="text" v-if="dabiao">已达标</div>
                <div class="text" v-else>未达标</div> -->
                <img
                    class="tickets_pic"
                    src="~@/assets/images/nbBank/detail/tickets_4.png"
                    alt=""
                />
                <!-- <div v-if="dongkadabiao">
                    <img
                        class="btn"
                        src="~@/assets/images/nbBank/detail/sentBtn.png"
                        alt=""
                    />
                </div> -->
                <div
                    v-if="!dongkadabiao"
                    class="btn"
                    @click="btnApply('dongka')"
                    id="A01"
                >
                    <img
                        src="~@/assets/images/nbBank/detail/goRecive.png"
                        alt=""
                    />
                </div>
            </div>
            <!-- 核卡 -->
            <div class="rulesText" v-if="showTile == 'heka'">
                <div class="activityTime"></div>
                <p>即日起至2023年12月31日</p>
                <div class="activityRules"></div>
                <p>
                    1、活动期间，通过江苏移动渠道申请，首次成为宁波银行&中国移动联名信用卡持卡用户，
                    <span>送10GB的国内（不含港澳台）通用流量，</span>
                    将于核卡成功后3个工作日到账，到账后立即生效，当月底失效；
                </p>
                <p>
                    2、客户可通过此APP-查询服务-套餐余量查询对应流量发放和使用记录；所赠流量不可滚
                    存、兑换、共享或赠送他人使用。
                </p>
            </div>

            <!-- 首刷 -->
            <div
                class="rulesText"
                :class="{ rulesText2: showTile == 'shoushua' }"
                v-if="showTile == 'shoushua'"
            >
                <div class="activityTime"></div>
                <p>即日起至2023年12月31日</p>
                <div class="activityRules"></div>
                <p>
                    1、活动期间，通过江苏移动渠道申请宁波银行&中国移动联名信用卡，且成功核卡的宁波银行信用卡新客户（即从未持有宁波银行信用卡（公务卡和尊尚卡除外），或曾持有但已销户超6个月的用户），核卡60天之内，通过支付宝/微信快捷支付方式任意消费，或通过此APP绑定该卡进行话费充值，<span
                        >完成3笔单笔88元（含）以上的消费，送100元话费。</span
                    >
                </p>
                <p>
                    2、达标用户获赠的100元话费，将于客户领取后3个工作日充值到账。客户可登录“此APP-充值中心-充值记录”中查询。
                </p>
                <p>
                    3、达标用户获赠的100元话费达标次日即可领取，领取有效期为达标后60天内，每位客户限领1次。如到期未领取，则视为持卡人自动放弃本次权益，不予补发及补偿。
                </p>
                <p>4、赠送的话费不可转赠，不可兑换现金，不提供发票。</p>
            </div>

            <!-- 开卡 -->
            <div
                class="rulesText"
                :class="{ rulesText2: showTile == 'kaika' }"
                v-if="showTile == 'kaika'"
            >
                <div class="activityTime"></div>
                <p>即日起至2023年12月31日</p>
                <div class="activityRules"></div>
                <p>
                    1、活动期间，通过江苏移动渠道申请宁波银行&中国移动联名信用卡，且成功核卡的宁波银行信用卡新客户（即从未持有宁波银行信用卡（公务卡和尊尚卡除外），或曾持有但已销户超6个月的用户），
                    <span>核卡30天之内，首刷任意金额，送100元话费。</span>
                </p>
                <p>
                    2、达标用户获赠的100元话费，将于3个工作日充值到账。客户可登录
                    “此APP-充值中心—充值记录”中查询。
                </p>
                <p>3、赠送的话费不可转赠，不可兑换现金，不提供发票。</p>
            </div>

            <!-- 动卡 -->
            <div class="rulesText" v-if="showTile == 'dongka'">
                <div class="activityTime"></div>
                <p>即日起至2023年12月31日</p>
                <div class="activityRules"></div>
                <p>
                    1、活动期间，通过江苏移动渠道申请宁波银行&中国移动联名信用卡，且成功核卡的用户，核卡后12个月内，每月完成3笔单笔88元（含）以上的消费，
                    <span
                        >可1积分（中国移动商城积分或和积分）兑换视听月会员权益（腾讯视频、网易云音乐、哔哩哔哩、优酷视频、爱奇艺、喜马拉雅）六选一</span
                    >
                    ，每位客户每月限领1次，最多可领12次。
                </p>
                <p>
                    2、消费达标T+2日即可领取权益，权益领取有效期30天，到期后将自动失效。如到期未领取，则视为持卡人自动放弃本次权益，不予补发及补偿。
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog, Button, Toast } from 'mand-mobile';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';

export default {
    name: 'nbBank',
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button
    },
    data() {
        return {
            showTile: 'heka',
            hekadabiao: false,
            shoushuadabiao: false,
            kaikadabiao: false,
            dongkadabiao: false,
            touchArrheka: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_NBBANKDETAIL_HEKA_01_A01'
                }
            ],
            touchArrshoushua: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_NBBANKDETAIL_DONGKA_01_A01'
                }
            ],
            touchArrkaika: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_NBBANKDETAIL_SHOUSHUA_01_A01'
                }
            ],
            touchArrdongka: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_NBBANKDETAIL_YUEYUE_01_A01'
                }
            ]
        };
    },
    mounted() {
        if (this.$route.query.details == 'heka') {
            this.showTile == 'heka';
            this.getFun();
            initPageJs('NBBANKDETAIL_HEKA_01', this.touchArrheka);
        } else if (this.$route.query.details == 'shoushua') {
            this.showTile = 'shoushua';
            this.getFun();
            initPageJs('NBBANKDETAIL_DONGKA_01', this.touchArrshoushua);
        } else if (this.$route.query.details == 'kaika') {
            this.showTile = 'kaika';
            this.getFun();
            initPageJs('NBBANKDETAIL_SHOUSHUA_01', this.touchArrkaika);
        } else if (this.$route.query.details == 'dongka') {
            this.showTile = 'dongka';
            this.getFun();
            initPageJs('NBBANKDETAIL_YUEYUE_01', this.touchArrdongka);
        }
    },
    created() {
        // this.getFun();
    },
    methods: {
        getFun() {
            const mobNo = store2.default.get('usrmob') || '';
            api.getCreditCardActInfo({
                mobNo,
                orgCode: 'nbcb'
            })
                .then((res) => {
                    // 核卡 heKaFlag
                    if (res.heKaFlag == '1') {
                        this.hekadabiao = true;
                    } else {
                        this.hekadabiao = false;
                    }

                    // 首刷 movingCardFlag

                    if (res.movingCardFlag == '1') {
                        this.shoushuadabiao = true;
                    } else {
                        this.shoushuadabiao = false;
                    }

                    // 开卡 firstBrushFlag
                    if (res.firstBrushFlag == '1') {
                        this.kaikadabiao = true;
                    } else {
                        this.kaikadabiao = false;
                    }
                })
                .catch((err) => {
                    // this.nochouj = true
                    console.log(err);
                });
        },
        btnApply(val) {
            if (val == 'heka') {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2022111514002167698&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
            } else if (val == 'shoushua') {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2022111514070289663&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
            } else if (val == 'kaika') {
                window.location.href = 'https://wap.js.10086.cn/vw/WSCZYL';
            } else if (val == 'dongka') {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2022111514165179549&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
            }
        }
    }
};
</script>
<style scoped lang="less">
.nbBank {
    position: relative;
    width: 750px;
    height: 1539px;
    background: rgba(246, 248, 250, 1);
    .topBg {
        // position: relative;
        width: 100%;
        height: 637px;
        background: url("~@/assets/images/nbBank/detail/top_bg.png") no-repeat;
        background-size: 100% 100%;
        .giftTile {
            position: absolute;
            top: 168px;
            left: 46px;
            width: 400px;
            height: 200px;
            p:first-of-type {
                text-align: center;
                font-size: 36px;
                line-height: 64px;
                color: #213d8c;
                font-weight: bold;
            }
            p:last-of-type {
                text-align: center;
                font-size: 28px;
                line-height: 64px;
                color: #213d8c;
                font-weight: 500;
            }
        }
    }
    .content {
        position: absolute;
        bottom: 74px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 702px;
        height: 863px;
        border-radius: 40px 40px 40px 40px;
        background: rgba(255, 255, 255, 1);
        margin: 0 auto;
        z-index: 999;
        .tickets {
            position: relative;
            margin: 21px;
            .text {
                position: absolute;
                bottom: 50px;
                left: 230px;
                font-size: 29px;
                color: #666666;
            }
            .tickets_pic {
                width: 660px;
                height: 180px;
            }
            .btn {
                position: absolute;
                right: 30px;
                bottom: 23px;
                width: 129px;
                height: 127px;
                img {
                    width: 129px;
                    height: 127px;
                }
            }
        }
        .rulesText {
            width: 609px;
            height: 538px;
            border-radius: 24px 24px 24px 24px;
            background: rgba(246, 248, 250, 1);
            //margin: 11px 22px 22px 22px;
            padding: 22px;
            .activityTime {
                margin-top: 20px;
                margin-bottom: 23px;
                width: 137px;
                height: 30px;
                background: url("~@/assets/images/nbBank/detail/activityTime.png")
                    no-repeat;
                background-size: 100% 100%;
            }
            .activityRules {
                margin-top: 44px;
                margin-bottom: 26px;
                width: 137px;
                height: 30px;
                background: url("~@/assets/images/nbBank/detail/activityRules.png")
                    no-repeat;
                background-size: 100% 100%;
            }
            p {
                font-size: 26px;
                color: #666666;
                text-align: justify;
                line-height: 40px;
            }
            span {
                font-weight: bold;
                color: #ff2d45;
            }
            p:nth-of-type(2),
            p:nth-of-type(3) {
                line-height: 40px;
            }
        }
        .rulesText2 {
            height: 8.5rem;
        }
    }
    .content2 {
        height: 11.5rem;
    }
}
</style>
