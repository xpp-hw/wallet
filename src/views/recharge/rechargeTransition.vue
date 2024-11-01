<template>
   <div class="contains">
        <img src="../../assets/images/recharge/change_loading.gif" alt="">
        <p class="continu">充值中，请稍等…</p>
        <div class="tips">移动钱包</div>
   </div>
</template>

<script>
import api from '@/common/apiUrls';
import mdHeader from '@/components/mdHeader';

export default {
    name: 'rechargeTransition',
    components: {
        mdHeader
    },
    data() {
        return {
            timer: null,
            addNum: 0,
            typeId: ''
        };
    },
    mounted() {
        this.typeId = this.$route.query.typeId || '';
        this.rechargeResult();
    },
    methods: {
        rechargeResult() {
            console.log('充值状态查询');
            api.rechargeApi.submitRechargeResult({
                // smsCode: this.$route.query.smsCode,
                // smsJrn: this.$route.query.smsJrn
            }).then((data) => {
                console.log('充值状态查询data>>>', data);
                if (data.transStatus === '02') { // 跳转失败页
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    this.$router.replace({
                        name: 'rechargeFail',
                        query: {
                            resultMsg: data.resultMsg,
                            amount: data.amount,
                            bankInfo: data.bankInfo,
                            orderNo: data.orderNo,
                            accountNo: this.$route.query.accountNo
                        }
                    });
                } else if (data.transStatus === '03') {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    this.$router.replace({
                        name: 'rechargeSuccess',
                        query: {
                            amount: data.amount,
                            bankInfo: data.bankInfo,
                            orderNo: data.orderNo,
                            typeId: this.typeId
                        }
                    });
                } else {
                    this.addNum += 1;
                    if (!this.timer) {
                        this.timer = setInterval(() => {
                            this.rechargeResult();
                        }, 5000);
                    } else {
                        if (this.addNum > 2) {
                            clearInterval(this.timer);
                            this.$router.replace({
                                name: 'rechargeSuccess',
                                query: {
                                    amount: data.amount,
                                    bankInfo: data.bankInfo,
                                    orderNo: data.orderNo,
                                    isSucc: '00',
                                    typeId: this.typeId
                                }
                            });
                        }
                    }
                }
            }).catch((data) => {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.$toast.info(data.msgInfo || '请稍后再试', 3000, true);
            });
        }
    }
};
</script>
<style lang="less" scoped>
.contains {
    img {
        margin: 130px 265px 25px 265px;
        width: 220px;
        height: 210px;
        opacity: 1;
    }
    .continu {
        margin: auto;
        width: 272px;
        height: 48px;
        opacity: 1;
        font-size: 34px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 48px;
    }
    .tips {
        width: 300px;
        height: 50px;
        opacity: 1;
        font-size: 36px;
        font-weight: 500;
        text-align: center;
        color: #d7d7d7;
        line-height: 50px;
        letter-spacing: -1px;
        margin: 672px auto 0;
    }
}
</style>
