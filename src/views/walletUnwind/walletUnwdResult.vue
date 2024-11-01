<template>
    <div>
        <div class="container unwind-wallet" id="container">
            <div class="account-index-wrapper">
                <div class="unwind-result">
                    <div class="unwind-success" v-if=" result == 0">
                        <img src="@/assets/images/wallet-icon3.png" alt="">
                        <p>解约成功</p>
                        <p>您可至对应的账户所在的公司，查看您的账户信息，或者您可以在钱包首页，点击开通钱包账户，再次签约您的所有账户。</p>
                    </div>
                    <div class="unwind-fail" v-if=" result == 1">
                        <img src="@/assets/images/wallet-icon4.png" alt="">
                        <p>解约失败</p>
                        <p>抱歉，解约失败，您可稍后重新尝试。</p>
                    </div>
                </div>
                <button class="confirm" @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';

export default {
    name: 'walletUnwdResult',
    components: {
        mdHeader
    },
    data() {
        return {
            result: ''
        };
    },
    created() {
        this.result = this.$route.query.result;
    },
    methods: {
        confirm() {
            this.$router.push(
                {
                    name: 'newFortune'
                }
            );
        }
    }
};
</script>

<style scoped lang="less">
.unwind-success, .unwind-fail{
    width:100%;
    text-align:center;
}
.unwind-success img, .unwind-fail img{
    width:2.43rem;
    height:1.81rem;
    margin:.7rem auto .26rem;
    display:block;
}
.unwind-success p:nth-of-type(1), .unwind-fail p:nth-of-type(1){
    font-size:.4rem;
    color:#333;
    font-weight:500;
    margin-bottom:.3rem;
}
.unwind-success p:nth-of-type(2), .unwind-fail p:nth-of-type(2){
    font-size:.26rem;
    color:#adadad;
    font-weight:500;
    width:5.89rem;
    text-align:center;
    margin:0 auto;
    line-height:1.6;
}
.confirm{
    position: fixed;
    bottom:1.8rem;
    width:6.9rem;
    left:.3rem;
    background:#0195ff;
    border-radius:.1rem;
    color:#fff;
    font-size:.36rem;
    height:.9rem;
    border:none;
}
</style>
