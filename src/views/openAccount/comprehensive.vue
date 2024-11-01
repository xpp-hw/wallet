<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2022-11-18 08:59:30
 * @LastEditors: Mr.Zhao 1914689669@qq.com
 * @LastEditTime: 2023-03-14 10:16:33
 * @FilePath: \wallet\src\views\openAccount\comprehensive.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <comprehensiveSi
      v-if="orShow"
      :siver="val"
      v-on:isFlase="isFlase"
    ></comprehensiveSi>
    <comprehensiveQi
      v-if="orShowQi"
      :siver="val"
      v-on:isFlaseQi="isFlaseQi"
    ></comprehensiveQi>
    <bcm-agreement
        v-if="bcmShow"
        :siver="val"
        v-on:isFalseBcm="isFalseBcm"
    >
    </bcm-agreement>
    <bcm-Sign
        v-if="signShow"
        :siver="val"
        v-on:isFalseSign="isFalseSign"
    >
    </bcm-Sign>
  </div>
</template>
<script>
import comprehensiveSi from '@/components/comprehensiveSi.vue';
import comprehensiveQi from '@/components/comprehensiveQi.vue';
import bcmAgreement from '@/components/bcmAgreement.vue';
import bcmSign from '@/components/bcmSign.vue';
import * as store2 from '@/common/localstore';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import BcmAgreement from '../../components/bcmAgreement.vue';

export default {
    name: 'comprehensive',
    data() {
        return {
            signShow: "",
            bcmShow: false,
            orShow: '',
            orShowQi: '',
            val: '',
            isYx: '',
            touchArr: [
                {
                    id: 'A09',
                    touchCode: 'WAP_T_OPENACCOUNT_INPUT_A09'
                }
            ]
        };
    },
    components: {
        comprehensiveSi,
        comprehensiveQi,
        bcmAgreement,
        bcmSign,
    },
    mounted() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.orShowQi = this.$route.query.orShowQi === 'true' || this.$route.query.orShowQi === true;
        this.orShow = this.$route.query.orShow === 'true' || this.$route.query.orShow === true;
        this.bcmShow = this.$route.query.bcmShow === 'true' || this.$route.query.bcmShow === true;
        this.signShow = this.$route.query.signShow === 'true' || this.$route.query.signShow === true;
        this.val = this.$route.query.val;
        if (this.orShowQi) {
            this.$store.commit('comprehensiveQi', true);
        } else if(this.orShow){
            this.$store.commit('comprehensiveSi', true);
        } else if(this.bcmShow) {
            this.$store.commit('bcmAgreement', true);
        } else {
            this.$store.commit('bcmSign', true);
        }
    },
    methods: {
        isFlaseQi(a) {
            this.orShowQi = a;
            this.isYx = !a;
            store2.default.set('isFlaseQi', false);
            store2.default.set('isAgreeQi', true);
            store2.default.set('hadclick', '01');
            this.$router.go(-1);
        },
        isFlase(a) {
            this.orShow = a;
            this.isYx = !a;
            store2.default.set('isFlase', false);
            store2.default.set('hadclick', '01');
            this.$router.go(-1);
        },
        isFalseBcm(a) {
            this.orShow = a;
            this.isYx = !a;
            store2.default.set('isFlaseBcm', true);
            store2.default.set('hadclick', '01');
            this.$router.go(-1);
        },
        isFalseSign(a) {
            this.orShow = a;
            this.isYx = !a;
            store2.default.set('isFalseSign', true);
            store2.default.set('hadclick', '01');
            this.$router.go(-1);
        },
    },
    beforeRouteLeave(to, from, next) {
        next();
    }
};
</script>
<style lang="less" scoped>

</style>
