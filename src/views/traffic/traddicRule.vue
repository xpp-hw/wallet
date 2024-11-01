<!--
 * @Author: zhf 1914689669@.com
 * @Date: 2023-05-09 10:27:46
 * @LastEditors: zhf 1914689669@.com
 * @LastEditTime: 2023-09-13 10:23:06
 * @FilePath: \wallet\src\views\traffic\traddicRule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="warp" v-html="rulesContent.replace(/px/g,'')">
    </div>
</template>

<script>
import { initPageJs } from '@/common/Page2435_1_fn.js';
import api from "@/common/apiUrls";

export default {
    name: 'traddicRule',
    components: {},
    data() {
        return {
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_TRADDIC_RULE_01_A01'
                }
            ],
            rulesContent: '',
        };
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.queryRules()
    },
    methods: {
        queryRules() {
            api.huataiAgreement({
                businessCode: "llbhdgz",
                businessType: 'WHOLE'
            })
                .then((res) => {
                    this.rulesContent = res.content;
                });
        },
    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    min-height: 100vh;
    padding: 20px 48px;
    box-sizing: border-box;
    font-size: 30px;
    line-height: 1.5;
    h2 {
        margin: 20px 0;
        font-size: 30px;
    }

    p {
        font-size: 28px;
        line-height: 45px;
    }
}
</style>
