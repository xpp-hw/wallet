<!--
 * @Author: zhf 1914689669@.com
 * @Date: 2022-11-18 08:57:12
 * @LastEditors: zhf 1914689669@.com
 * @LastEditTime: 2023-09-07 09:26:37
 * @FilePath: \wallet\src\views\banks\addSuc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
   <div class="contains">
        <div class="sucImg">
             <img src="../../assets/images/banks/addSuc.png" alt="">
        </div>
        <div class="tips" v-if="code == '03' ">银行卡更换成功</div>
        <div class="tips" v-else>银行卡添加成功</div>
        <md-button class="confirmBtn" id="A01" @click="$router.push({ name: 'myBanks'})">确定</md-button>
   </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'addSuc',
    components: {
        mdHeader
    },
    data() {
        return {
            code: "",
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_ADDSUCCESS_A01'
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
