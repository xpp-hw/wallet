<template>
   <div class="contains">
        <div class="sucImg">
             <img src="../../assets/images/banks/addFail.png" alt="">
        </div>
        <div class="tips" v-if="code == '03' ">抱歉，添加失败，请稍后重试</div>
        <div class="tips" v-else>抱歉，添加失败，请稍后重试</div>
        <md-button class="confirmBtn" id="A01" @click="$router.push({ name: 'myBanks'})">确定</md-button>
   </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'addFail',
    components: {
        mdHeader
    },
    data() {
        return {
            code: '',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_ADDFAIL_A01'
                }
            ]
        };
    },
    created() {
        this.code = this.$route.query.codeType
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style lang="less" scoped>
.contains {
    .sucImg {
        width: 186px;
        height: 127px;
        opacity: 1;
        margin: 165px auto 65px;
        img {
            width: 100%;
            width: 100%;
        }
    }
    .tips {
        height: 48px;
        opacity: 1;
        font-size: 34px;
        font-weight: 500;
        text-align: center;
        color: #333333;
        line-height: 48px;
    }
    .confirmBtn {
        width: 690px;
        height: 90px;
        opacity: 1;
        background: #0195ff;
        border-radius: 10px;
        font-size: 36px;
        font-weight: 500;
        color: #ffffff;
        margin: 534px auto 0;
    }
}
</style>
