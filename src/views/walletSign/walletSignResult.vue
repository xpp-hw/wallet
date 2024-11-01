<template>
    <div>
        <div class="container wallet-sign" id="container">
            <div class="account-index-wrapper">
                <div class="unwind-result">
                    <div class="sign-success" v-if=" result == 0">
                        <img src="@/assets/images/wallet-icon3.png" alt="">
                        <p>签约成功</p>
                        <p>恭喜，签约成功，您现在可以在此手机号下登录钱包账户了。</p>
                    </div>
                    <div class="sign-fail" v-if="result == 1">
                        <img src="@/assets/images/wallet-icon4.png" alt="">
                        <p>签约失败</p>
                        <p>{{reason}}</p>
                    </div>
                </div>
                <button class="confirm" id="A01" v-if=" result == 0" @click="confirm">确定</button>
                <button class="confirm" id="A02" v-if="result == 1" @click="confirm">确定</button>
                <p class="bottom-logo">移动钱包</p>
            </div>
        </div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import api from '@/common/apiUrls';

export default {
    name: 'walletSignResult',
    components: {
        mdHeader
    },
    data() {
        return {
            result: '',
            reason: '抱歉，签约失败，您可稍后重新尝试。',
            typeid: '',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_WALLETSIGNRESULT_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_WALLETSIGNRESULT_A02'
                }
            ],
            dealChn: '',
            backUrl: '',
            ZFbackID: ''
        };
    },
    created() {
        this.result = this.$route.query.result;
        if (this.$route.query.reason) {
            this.reason = this.$route.query.reason;
        }
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
        }
        this.dealChn = this.$route.query.dealChn;
        this.ZFbackID = this.$route.query.ZFbackID || '';
        this.getBackUrl({
            dealChn: this.dealChn
        });
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        // 返回地址
        getBackUrl(data) {
            api.newBank
                .backUrl(data)
                .then((res) => {
                    this.backUrl = res.backUrl;
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        confirm() {
            if (this.backUrl && this.ZFbackID) {
                window.location.href = `${this.backUrl}?ORD_NO=${this.ZFbackID}`;
            } else if (this.backUrl) {
                window.location.href = this.backUrl;
            } else {
                if (this.typeid === 'hfb') {
                    this.$router.push({
                        name: 'description'
                    });
                } else {
                    this.$router.push({
                        name: 'newFortune'
                    });
                }
            }
        }
    }
};
</script>
<style scoped lang="less">
.sign-success, .sign-fail{
    width:100%;
    text-align:center;
}
.sign-success img, .sign-fail img{
    width:2.1rem;
    height:1.69rem;
    margin:1.24rem auto .71rem;
    display:block;
}
.sign-success p:nth-of-type(1), .sign-fail p:nth-of-type(1){
    font-size:.4rem;
    color:#333;
    font-weight:500;
    margin-bottom:.3rem;
}
.sign-success p:nth-of-type(2), .sign-fail p:nth-of-type(2){
    font-size:.28rem;
    color:#888;
    font-weight:400;
    width:4.76rem;
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
