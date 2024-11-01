<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-05-13 15:39:08
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-07-10 23:05:33
 * @FilePath: \wallet\src\views\bocmPension\deposit.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="warp">

    </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            backUrl: "",
            bocmPensionSts: "",
        };
    },
    beforeRouteEnter(to,from,next) {
        next(vm => {
            var backUrl
            if(process.env.VUE_APP_ENV == 'local') {
                backUrl = `http://192.168.100.167:8080/fintech-h5/fortuneCenter${from.fullPath}`
            } else if(process.env.VUE_APP_ENV == 'sit') {
                backUrl = `https://fintech.12580life.com${process.env.BASE_URL}${from.fullPath.slice(1)}`
            } else {
                backUrl = `https://fintech.12580life.com${process.env.BASE_URL}${from.fullPath.slice(1)}`
            }
            vm.backUrl = backUrl
        })
    },
    mounted() {
        this.openQuery()
    },
    methods: {
        // 开户状态
        openQuery() {
            this.$store.commit('LOADING', true);
            api.openStsQuery({})
            .then(data => {
                this.$store.commit('LOADING', false);
                // openStatus 开户状态 1-已开户 2-未开户 3-开户中 4-已销户 5-开户失败
                if(data.openStatus == '2' || data.openStatus == '4' || data.openStatus == '5' ) {
                    this.$toast.info('您尚未开通养老金资金账户，即将进入开通页面',2000)
                    setTimeout(() => {
                        this.$router.push({
                            name: "IDcardSubmit"
                        })
                    },2000)
                } else if(data.openStatus == '1'){
                    this.depositQuery()
                }
                
            })
            .catch(() => {
                this.$store.commit('LOADING', false);
                this.$toast.info('系统开小差了，请稍后重新尝试',3000)
                setTimeout(() => {
                    this.$router.go(-1)
                },3000)
            })
        },
        // 缴存查询
        depositQuery() {
            this.$store.commit('LOADING', true);
            api.pensionDeposit({
                backUrl: this.backUrl
            })
            .then(res =>{
                this.$store.commit('LOADING', false);
                if(res.pageUrl) {
                    window.location.href = res.pageUrl
                    this.$store.commit('LOADING', true);
                } else {
                    this.$toast.info(res.msgInfo,3000)
                }
            })
            .catch((err) => {
                this.$store.commit('LOADING', false);
                this.$toast.info(err.msgInfo,3000)
                setTimeout(() => {
                    this.$router.go(-1)
                },3500)
            })
        }
    },
    destroyed() {
        this.$store.commit('LOADING', false);
    }
};
</script>

<style scoped lang="less"> 
.warp {
    width: 100%;
    min-height: 100vh;
    background: #f7f7f7;
}
</style>