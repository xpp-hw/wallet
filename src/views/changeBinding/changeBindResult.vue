<template>
    <div>
        <div class="container changebind" id="container">
            <div class="account-index-wrapper">
                <div class="bind-result">
                    <div class="bind-success" v-if=" result == 0">
                        <img src="@/assets/images/wallet-icon7.png" alt="">
                        <p>换绑成功</p>
                        <p>恭喜，手机号换绑成功，您可使用当前账号登录钱包账户了，原账号将不再支持登录。</p>
                    </div>
                    <div class="bind-fail" v-if=" result == 1">
                        <img src="@/assets/images/wallet-icon8.png" alt="">
                        <p>换绑失败</p>
                        <p>抱歉，换绑失败，您可稍后重新尝试。</p>
                    </div>
                </div>
                <button class="confirm" id="A01" v-if=" result == 0" @click="confirm">确定</button>
                <button class="confirm" id="A02" v-if=" result == 1" @click="confirm">确定</button>
                <p class="bottom-logo">移动钱包</p>
            </div>
        </div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'changeBindResult',
    components: {
        mdHeader
    },
    data() {
        return {
            result: '',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_CHANGEBINDINGRESULT_01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_CHANGEBINDINGRESULT_02'
                }
            ]
        };
    },
    created() {
        this.result = this.$route.query.result;
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        confirm() {
            this.$router.push(
                {
                    name: 'index'
                }
            );
        }
    }
};
</script>

<style scoped lang="less">
.bind-success, .bind-fail{
    width:100%;
    text-align:center;
}
.bind-success img, .bind-fail img{
    width:2.1rem;
    height:1.69rem;
    margin:1.24rem auto .71rem;
    display:block;
}
.bind-success p:nth-of-type(1), .bind-fail p:nth-of-type(1){
    font-size:.4rem;
    color:#333;
    font-weight:500;
    margin-bottom:.3rem;
}
.bind-success p:nth-of-type(2), .bind-fail p:nth-of-type(2){
    font-size:.28rem;
    color:#888;
    font-weight:400;
    width:6.16rem;
    text-align:center;
    margin:0 auto;
    line-height:1.6;
}
.confirm{
    position: fixed;
    bottom:2.09rem;
    width:4rem;
    left:1.75rem;
    background:#0195ff;
    border-radius:.1rem;
    color:#fff;
    font-size:.36rem;
    height:.9rem;
    border:none;
}
.bottom-logo{
    position: fixed;
    bottom:.82rem;
    text-align:center;
    color:#d7d7d7;
    font-size:.36rem;
    width:100%;
}
</style>
