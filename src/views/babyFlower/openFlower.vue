<template>
    <div class="warp">
        <div :style="bg" class="content">
            <!--            协议-->
            <div class="agreement">
                <div id="A01" class="img" @click="agree">
                    <img v-show="flag" alt="" src="@/assets/images/check-on.png">
                    <img v-show="!flag" id="B02" alt="" src="@/assets/images/check-off.png">
                </div>
                <div class="text">
                    我已同意并阅读 <span id="B01" @click="agree(1)">《“小宝花”开通协议》</span> <span id="B02" @click="agree(1,true)">《“银联
                    二维码”开通协议》</span>
                </div>
            </div>
            <!--            提交按钮-->
            <div id="C01" :class="{butsucces:flag}" class="submit" @click="submit">
                开通小宝花
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mand-mobile';
import { initPageJs } from '@/common/Page2435_1_fn.js';
export default {
    name: 'index',
    components: {
        Toast
    },
    data() {
        return {
            flag: false,
            protocol: false,
            bg: {
                backgroundImage: `url(${require('@/assets/images/babyFlower/babyFlowerbg.png')})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
            },
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_BABYFLOWER_OPEN_01_A01'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_BABYFLOWER_OPEN_01_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_BABYFLOWER_OPEN_01_B02'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_BABYFLOWER_OPEN_01_C01'
                }
            ]
        };
    },
    mounted() {
        console.log(this.$route.query.hasread);
        if (this.$route.query.hasread) {
            this.flag = true;
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        // 同意协议
        agree(type, position) {
            if (type == 1) {
                if (this.$route.query.hasread) {
                    if (position) {
                        this.$router.push({
                            name: 'openAgreement',
                            query: {
                                ...this.$route.query,
                                flag: 1,
                                position: position
                            }
                        });
                    } else {
                        this.$router.push({
                            name: 'openAgreement',
                            query: {
                                ...this.$route.query,
                                flag: 1
                            }
                        });
                    }

                } else {
                    this.$router.push({
                        name: 'openAgreement',
                        query: {
                            ...this.$route.query,
                        }
                    });
                }

                return;
            }
            if (this.flag) {
                this.flag = false;
            } else {
                if (this.$route.query.hasread) {
                    this.flag = true;
                } else {
                    this.$router.push({
                        name: 'openAgreement',
                        query: {
                            ...this.$route.query,
                        }
                    });
                }
            }

        },
        //开通小宝花
        submit() {
            if (this.flag) {
                this.$router.push({
                    path:'setting',
                    query:{
                        ...this.$route.query,
                    }
                });
            } else {
                Toast({
                    content: '请勾选同意协议'
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
.warp {
    min-height: 100vh;
    width: 100%;
    background-color: #F8F8F8;

    .content {
        width: 100%;
        height: 1208px;
        padding-top: 943px;
        box-sizing: border-box;
    }

    .agreement {
        width: 598px;
        height: 70px;
        margin: 0 auto;
        display: flex;

        .img {
            width: 30px;
            height: 30px;
            margin-top: 8px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .text {
            flex: 1;
            margin-left: 20px;
            font-family: Source Han Sans CN;
            color: #000000;
            font-size: 25px;
            font-weight: 400;

            span {
                color: #F68310;
                line-height: 40px;
            }
        }
    }

    .submit {
        margin: 26px auto 0;
        width: 688px;
        height: 79px;
        text-align: center;
        line-height: 79px;
        border-radius: 28px 28px 28px 28px;
        background-color: #DADCE0;
        font-size: 34px;
        letter-spacing: 6px;
        color: #FFFFFF;
    }

    .butsucces {
        background: rgba(255, 176, 52, 1);
    }

}


</style>
