<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-03-19 15:39:47
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-08-09 01:48:50
 * @FilePath: \wallet\src\views\miniProgramCallback\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
  </div>
</template>

<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>

export default {
    data() {
        return {
            tokenid: '',
            backUrl: '/pages/index/index'
        };
    },
    mounted() {
        this.$store.commit('LOADING', true);
        this.tokenid = this.$route.query.tokenid;
        if (this.$route.query.backUrl) {
            this.backUrl = this.$route.query.backUrl;
        }
        if (!this.$route.query.tokenid) {
            this.login();
        } else {
            this.black();
        }
    },
    methods: {
        login() {
            const pageUrl = encodeURIComponent(
                `https://fintech.12580life.com/fintech-h5/fortuneCenter/miniProgramCallback?backUrl=${this.backUrl}`
            );
            const url = `https://wap.js.10086.cn/vw/JRGY/DLTZ?autoauth=jtauth&redirectURL=${pageUrl}`;
            window.location.href = url;
        },
        black() {
            wx.miniProgram.navigateTo({
                url: `/${this.backUrl}?tokenId=${this.tokenid}`
            });
        }
    }
};
</script>

<style>
</style>
