<template>
    <div class="wrap" :style="{ overflow: tankuang ? '' : 'hidden' }">
        <div class="header"></div>
        <div class="checkEnergy">
            <div :class="isOil ? 'underBackground' : 'newEnergyBackground' "></div>
            <div :class="isOil ? 'onOil' : 'Oil' " @click="isOil = !isOil"></div>
            <div :class="isOil ? 'newEnergy' : 'onNewEnergy' " @click="isOil = !isOil"></div>
        </div>

        <div :class="isOil ? 'middleBody' : 'middleBody_2' ">
            <div :class="isOil ? 'oilDetail' : 'newEnergyDetail' ">
                <div v-if="isOil" class="detail1" @click="showTankuang"></div>
                <div v-if="isOil" class="detail2" @click="showTankuang">
                </div>
                <div v-else class="detail3" @click="showTankuang"></div>
            </div>
            <div :class="isOil ? 'oilDiscount' : 'newEnergyDiscount' "></div>
            <div class="plus"></div>
            <div class="plusOther" v-if="!isOil">
                <div class="tips1" style="margin-top: 0.3rem;" @click="showTankuang"></div>
                <div class="otherTips">
                    <div class="tipImg" v-for=" (item,index) in imgList" :key="index" @click="showTankuang">
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="tips1"  @click="showTankuang"></div>
                <div class="otherTips">
                    <div class="tipImg" v-for=" (item,index) in imgList" :key="index" @click="showTankuang">
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="bottomButton" v-if="!tankuang">
            <p v-if="isOil">燃油车主权益，仅限申请车主卡时勾选“加油享返现”可享。</p>
            <p v-else>新能源车主权益，仅限申请车主卡时勾选“绿色出行优惠”可享。</p>
            <div class="btn" @click="goApply">
                <div class="btn_jiaobiao"></div>
            </div>
        </div>

        <tankuang ref="popup" :isShow="tankuang" @close="closed"></tankuang>

    </div>
</template>

<script>
import tankuang from "./tankuang.vue"

export default {
    name: "carOwnerCard",
    components: {
        tankuang
    },
    data() {
        return {
            isOil: true,
            imgList: [
                require("@/assets/images/gfBank/img1.png"),
                require("@/assets/images/gfBank/img2.png"),
                require("@/assets/images/gfBank/img3.png"),
                require("@/assets/images/gfBank/img4.png")
            ],
            tankuang: false,
        };
    },
    methods: {
        showTankuang() {
            this.tankuang = true
            setTimeout(() => {
                this.$refs.popup.scrollToTop()
            })
        },
        goApply() {
            let type = this.$route.query.gfyhbjk
            if(type) {
                window.location.href = `https://n.95508.com/${type}`
            } else {
                window.location.href = "https://n.95508.com/8FjZW3V1W"
            }
            
        },
        closed() {
            this.tankuang = false;
        },
        scrollToView() {
            this.tankuang = true;
            setTimeout(() => {
                this.$refs.popup.scrollToBottom()
            })
        },
    }
};
</script>

<style scoped lang="less">
.wrap {
    width: 100%;
    position: relative;
    background: #F5F5F5;
    //overflow: hidden;
}
.header {
    width: 100%;
    height: 472px;
    background: url('~@/assets/images/gfBank/headerBg.png') no-repeat;
    background-size: 100%;
}
.middleBody {
    position: relative;
    z-index: 6;
    width: 702px;
    height: 1036px;
    //margin: -189px auto 0;
    margin: -24px auto 250px;
    background: url('~@/assets/images/gfBank/bodyBg.png') no-repeat;
    background-size: 100%;
    overflow: hidden;
    .oilDetail {
        position: relative;
        width: 678px;
        height: 445px;
        background: url('~@/assets/images/gfBank/oilContent.png') no-repeat;
        background-size: 100%;
        margin: 30px auto 0;
    }
    .newEnergyDetail {
        position: relative;
        width: 678px;
        height: 371px;
        background: url('~@/assets/images/gfBank/newEnergyContent.png') no-repeat;
        background-size: 100%;
        margin: 30px auto 0;
    }
    .oilDiscount {
        position: absolute;
        top: -5px;
        right: 28px;
        width: 148px;
        height: 148px;
        background: url('~@/assets/images/gfBank/oilDiscount.png') no-repeat;
        background-size: 100%;
    }
    .newEnergyDiscount {
        position: absolute;
        top: -5px;
        right: 28px;
        width: 148px;
        height: 148px;
        background: url('~@/assets/images/gfBank/newEnergyDiscount.png') no-repeat;
        background-size: 100%;
    }
    .plus {
        position: relative;
        width: 65px;
        height: 67px;
        background: url('~@/assets/images/gfBank/plus.png') no-repeat;
        background-size: 100%;
        margin: -20px auto 0;
    }
    .tips1 {
        width: 660px;
        height: 140px;
        background: url('~@/assets/images/gfBank/tips1.png') no-repeat;
        background-size: 100%;
        margin: 2px auto 10px;
    }
    .otherTips {
        box-sizing: border-box;
        padding: 0 11px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .tipImg {
            width: 324px;
            height: 149px;
            margin: 0 0 12px 0;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
.middleBody_2 {
    position: relative;
    z-index: 6;
    width: 702px;
    height: 960px;
    margin: -24px auto 250px;
    border-radius: 20px 20px 20px 20px;
    background: #ffffff;
    overflow: hidden;
    .oilDetail {
        position: relative;
        width: 678px;
        height: 445px;
        background: url('~@/assets/images/gfBank/oilContent.png') no-repeat;
        background-size: 100%;
        margin: 30px auto 0;
    }
    .newEnergyDetail {
        position: relative;
        width: 678px;
        height: 371px;
        background: url('~@/assets/images/gfBank/newEnergyContent.png') no-repeat;
        background-size: 100%;
        margin: 30px auto 0;
    }
    .oilDiscount {
        position: absolute;
        top: -5px;
        right: 28px;
        width: 148px;
        height: 148px;
        background: url('~@/assets/images/gfBank/oilDiscount.png') no-repeat;
        background-size: 100%;
    }
    .newEnergyDiscount {
        position: absolute;
        top: -5px;
        right: 28px;
        width: 148px;
        height: 148px;
        background: url('~@/assets/images/gfBank/newEnergyDiscount.png') no-repeat;
        background-size: 100%;
    }
    .plus {
        position: relative;
        width: 65px;
        height: 67px;
        background: url('~@/assets/images/gfBank/plus.png') no-repeat;
        background-size: 100%;
        margin: -20px auto 0;
    }
    .tips1 {
        width: 660px;
        height: 140px;
        background: url('~@/assets/images/gfBank/tips1.png') no-repeat;
        background-size: 100%;
        margin: 2px auto 10px;
    }
    .otherTips {
        box-sizing: border-box;
        //padding: 0 11px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .tipImg {
            width: 324px;
            height: 149px;
            margin: 0 0 12px 0;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .plusOther {
        width: 677px;
        height: 520px;
        border-radius: 28px 28px 28px 28px;
        background: #f2f9ff;
        box-shadow: 2px 1px 4px 0 #c3e0ff69;
        margin: -30px auto 0;
        overflow: hidden;
    }
}

.checkEnergy {
    display: flex;
    position: relative;
    z-index: 5;
    width: 702px;
    margin: -270px auto 0;
    .underBackground {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        width: 50%;
        height: 100%;
        background: #E5E9F0;
        z-index: 5;
    }
    .newEnergyBackground {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        width: 50%;
        height: 100%;
        background: #FFFFFF;
        z-index: 5;
    }
}
.newEnergy {
    width: 371px;
    height: 100px;
    background: url('~@/assets/images/gfBank/newEnergy.png') no-repeat;
    background-size: 100%;
    z-index: 6;
}
.onNewEnergy {
    width: 371px;
    height: 100px;
    background: url('~@/assets/images/gfBank/onNewEnergy.png') no-repeat;
    background-size: 100%;
    z-index: 6;
}
.Oil {
    width: 375px;
    height: 99px;
    background: url('~@/assets/images/gfBank/oil.png') no-repeat;
    background-size: 100%;
    z-index: 6;
}
.onOil {
    width: 375px;
    height: 82px;
    background: url('~@/assets/images/gfBank/onOil.png') no-repeat;
    background-size: 100%;
    z-index: 6;
}
.bottomButton {
    position: fixed;
    bottom: 0;
    width: 750px;
    height: 214px;
    background: #ffffff;
    z-index: 10;
    overflow: hidden;
    .btn {
        position: relative;
        width: 515px;
        height: 127px;
        background: url('~@/assets/images/gfBank/btn.png') no-repeat;
        background-size: 100%;
        margin: 18px auto 0;
    }
    .btn_jiaobiao {
        position: absolute;
        top: -3px;
        right: -20px;
        width: 150px;
        height: 47px;
        background: url('~@/assets/images/gfBank/btn_jiaobiao.png') no-repeat;
        background-size: 100%;
    }
    p {
        font-size: 20px;
        text-align: center;
        color: #8C8889;
        margin: 25px auto 0;
    }
}
.detail1 {
    position: absolute;
    left: 150px;
    top: 200px;
    width: 400px;
    height: 100px;
}
.detail2 {
    position: absolute;
    left: 150px;
    top: 300px;
    width: 500px;
    height: 100px;
}
.detail3 {
    position: absolute;
    left: 150px;
    top: 220px;
    width: 450px;
    height: 100px;
}

</style>