<template>
    <div class="wrap">
     <div class="bg">
        <div class="user">尊敬的{{phone}}用户，您好</div>
     </div>
     <div class="article">
     <div v-html="agreementContent"></div>
     </div>
     </div>
</template>

<script>
import * as store2 from "@/common/localstore";
import api from '../../common/apiUrls'
    export default {
        name:'earnestMoneyRules',
        data(){
         return{
            title:'大额保证金',
            phone:'',
            agreementContent: ''
         }
        },
        methods: {
            getAgreement() {
            api.huataiAgreement({
                businessCode: 'debzjhdgz'
            }).then((res) => {
                this.agreementContent = res.content.replaceAll(
                    'px',
                    ''
                );
            });
        }
        },
        computed: {
    },
    mounted() {
        //手机号脱敏
        this.phone=this.tel=store2.default.get("usrmob").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        this.getAgreement()
    },
    }
</script>

<style lang="less" scoped>
.wrap{
    box-sizing: border-box;
    width: 100%;
    position: relative;
    background: #f9f9f9;
    .bg{
    width: 100%;
    height: 550px;
    box-sizing: border-box;
    background: url(../../assets/images/bigEarnestMoney/bg.png) no-repeat;
    background-size: cover;
    position: relative;
    left: 0;
    .user{
        width: 312px;
        height: 23px;
        font-size: 22px;
        color: #fff;
        position: absolute;
        left: 39px;
        top: 40px;
    }
}
.article{
    width: 702px;
    height: 1228px;
    position: absolute;
    left: 24px;
    top: 100px;
    background-color: #fff;
    padding-top: 38px;
    padding-left: 25px;
    padding-right: 32px;
    border-radius: 20px;
    box-sizing: border-box;
}
}
</style>