<template>
    <div class="warp">
        <div class="content">
            <img v-if="state == 'true'" alt="" src="@/assets/images/babyFlower/smile.png">
            <img v-if="state != 'true'" alt="" src="@/assets/images/babyFlower/cry.png">
            <div class="text">开通{{ this.state == 'true' ? '成功' : '失败' }}</div>
            <p v-if="state!='true'">{{ msgInfo ? msgInfo : '系统出小差了，请稍后重新尝试' }} </p>
            <div :id="this.state == 'true' ? 'A01' : 'B01' " class="button" @click="goindex">完成</div>
        </div>
    </div>
</template>

<script>
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'myCard',
    components: {},
    data() {
        return {
            state: this.$route.query.state,
            msgInfo: this.$route.query.msgInfo,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_BABYFLOWER_MYCARD_01_A01'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_BABYFLOWER_MYCARD_01_B01'
                }
            ]
        };
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        goindex() {
            this.$router.push('index');
        }
    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    height: 100%;

    .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 416px;
            height: auto;
            margin-top: 115px;


        }

        p {
            font-size: 30px;
            margin-top: 20px;
            color: #929292;
        }

        .text {
            font-weight: 500;
            font-size: 40px;
            color: #F15921;
        }

        .button {
            margin-top: 65px;
            width: 688px;
            height: 79px;
            border-radius: 20px 20px 20px 20px;
            background: rgba(255, 176, 52, 1);
            font-size: 34px;
            text-align: center;
            line-height: 79px;
            color: white;
        }
    }
}

</style>
