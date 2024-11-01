<template>
    <div class="popwarp">
        <div class="content">
            <div v-if="state" :class="popType" class="img">
                <div :id="one" class="left" @click="closePop">放弃开通</div>
                <div :id="two" class="right" @click="go">去开通 <span>{{ popType == 'one' ? '(需先关闭话费宝)' : '' }}</span></div>
            </div>
            <div v-if="!state" class="text">
                <div class="head">
                    温馨提示
                </div>
                <p>你的话费宝账户存在未领取的权益，请先完成领取</p>
                <div class="btn">
                    <div @click="closePop">取消</div>
                    <div style="color: white;background: #009bd8" @click="getCharges">前往领取</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'pop',
    props: ['isCanGet', 'popType'],
    components: {},
    data() {
        return {
            state: true,
            one: '',
            two: ''
        };
    },
    created() {
        console.log(this.popType);
        if (this.popType == 'one') {
            this.two = 'F01';
            this.one = 'E01';
        }
        if (this.popType == 'three') {
            this.one = 'F02';
            this.two = 'G01';
        }

    },
    methods: {
        //关闭弹窗
        closePop() {
            this.$emit('closePop');
        },
        //开通业务
        go() {
            switch (this.popType) {
                case 'one':
                    if (this.isCanGet) {
                        this.state = false;
                    } else {
                        this.$emit('closePop', 'hfb');
                    }
                    break;
                default:
                    let sourceChannel=this.$route.query.sourceChannel||''
                    window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/openAccount/khEmpower?typeId=liuliangbao&orgCode=SPDB&sourceChannel='+sourceChannel + '&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
                    break;
            }
        },
        //领取话费宝权益
        getCharges() {
            window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/telephoneCharges/viewBenefits?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
        }
    }
};
</script>

<style lang="less" scoped>
.popwarp {
    width: 100vw;
    height: 100vh;
    background: rgba(24, 28, 35, 0.5);
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .img {
        width: 560px;
        height: 623px;
        background-size: 100% auto;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 513px 57px 0;

        div {
            width: 211px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-weight: bold;
            border-radius: 60px;

            span {
                font-size: 24px;
                margin-left: 5px;
            }
        }


        .left {
            background: #e1e3e5;
        }

        .right {
            background: #4596f1;
            color: white;
        }
    }

    .one {
        height: 734px;
        padding: 622px 16px 0;
        background: url('~@/assets/images/traddic/one_2.png') no-repeat;
        background-size: 100%;

        .left {
            Width: 180px;
            font-size: 28px;
        }

        .right {
            width: 327px;
            font-size: 28px;
            background: #f07c7c;
        }
    }

    .two {
        background-image: url('~@/assets/images/traddic/two.png')
    }

    .three {
        background-image: url('~@/assets/images/traddic/three.png')
    }

    .text {
        width: 480px;
        height: 250px;
        background: white;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .head {
            font-size: 32px;
            font-weight: bold;
        }

        p {
            font-size: 30px;
            line-height: 40px;
            margin-top: 20px;
            margin-bottom: 40px;
        }

        .btn {
            width: 100%;
            display: flex;
            padding: 10px;
            justify-content: space-between;

            div {
                width: 220px;
                height: 60px;
                font-size: 30px;
                border-radius: 10px;
                background: #e1e3e5;
                color: #4596f1;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }


}
</style>
