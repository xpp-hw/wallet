<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2023-11-17 09:12:27
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2023-11-21 14:04:44
 * @FilePath: \wallet\src\views\telephoneCharges\savebillActivity.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="wrap">
        <div class="topBg"></div>

        <div v-if="showBanks">
            <div class="guangfa" v-if="guangfa == '0'">
                <div class="joinBtn" @click="goLook(1)"></div>
            </div>
            <div class="xingwang" v-if="xingwang == '0'">
                <div class="joinBtn" @click="goLook(2)"></div>
            </div>
            <div class="pufa" v-if="pufa == '0'">
                <div class="tips">每月最高领</div>
                <div class="joinBtn" @click="goLook(3)"></div>
            </div>
        </div>

        <div class="noActivity" v-if="!showBanks">
            <p style="font-size: 0.36rem;text-align: center;color: #020202;margin-top: 1.3rem;font-weight: 600;">活动逐步开放中！</p>
            <p style="font-size: 0.3rem;text-align: center;color: #909399;margin-top: 0.4rem;">敬请期待</p>
            <img src="@/assets/images/savebillActivity/noneBg.png" alt="">
            <div class="goOther" @click="goLook(4)"></div>
        </div>

        <div class="awating" v-if="awating"></div>

    </div>
</template>

<script>

import api from '@/common/apiUrls';
export default {
    name: 'savebillActivity',
    data() {
        return {
            showBanks: true,
            bankList: [],
            guangfa: '0',
            xingwang: '0',
            pufa: '0',
            awating: false,
        }
    },
    mounted() {
        this.hfbQuery()
    },
    methods: {
        hfbQuery() {
            // 广发银行 CGB_bankCode
            // 新网 xingwang_bankCode
            // 浦发 SPDB_bankCode
            this.$store.commit('LOADING',true);
            this.awating = true;
            api.hfbCheck({
                activityNos:"CGB_bankCode,xingwang_bankCode,SPDB_bankCode"
            })
            .then(data => {
                this.bankList = data.data;
                this.bankList.forEach(item => {
                    if(item.activityNo == 'CGB_bankCode'){
                        // 广发银行
                        this.guangfa = item.status
                    } else if(item.activityNo == 'SPDB_bankCode') {
                        // 浦发
                        this.pufa = item.status
                    } else if(item.activityNo == 'xingwang_bankCode') {
                        // 新网
                        this.xingwang = item.status
                    }
                })
                if(this.guangfa == '1' && this.pufa == '1' && this.xingwang == '1') {
                    this.showBanks = false
                }
                setTimeout(() => {
                    this.$store.commit('LOADING',false);
                    this.awating = false
                },100)
            })
            .catch(err => {
                setTimeout(() => {
                    this.$store.commit('LOADING',false);
                    this.awating = false
                },100)
            })
        },
        goLook(type) {
            switch (type) {
                case 1 :
                    this.$router.push({
                        name: 'gfBankMargin',
                    })
                    break;
                case 2 :
                    this.$router.push({
                        name: 'earnestMoney',
                    })
                    break;
                case 3 :
                    this.$router.push({
                        name: 'newDescription',
                    })
                    break;
                case 4 :
                    this.$router.push({
                        name: 'newFortune',
                        query: {
                            parchn: 'jrbxcs',
                            gytype: '001652'
                        }
                    })
                    break;
            }
            
        }
    }
}
</script>

<style scoped lang="less">
.wrap {
    min-height: 100vh;
    box-sizing: border-box;
    padding-bottom: 66px;
    background: #FFF2E1;
    .topBg {
        width: 100%;
        height: 395px;
        background: url('~@/assets/images/savebillActivity/topBg.png') no-repeat;
        background-size: 100%;
    }
    .guangfa {
        position: relative;
        width: 702px;
        height: 515px;
        background: url('~@/assets/images/savebillActivity/guangfa_bankBg.png') no-repeat;
        background-size: 100%;
        margin: 7px auto 0;
    }
    .xingwang {
        position: relative;
        width: 702px;
        height: 515px;
        background: url('~@/assets/images/savebillActivity/xingwang_bankBg.png') no-repeat;
        background-size: 100%;
        margin: 20px auto 0;
    }
    .pufa {
        position: relative;
        width: 702px;
        height: 575px;
        background: url('~@/assets/images/savebillActivity/pufa_bankBg.png') no-repeat;
        background-size: 100%;
        margin: 20px auto 0;
        .tips {
            position: absolute;
            right: 29px;
            top: 167px;
            font-size: 22px;
            text-align: center;
            color: #020202;
        }
    }
    .noActivity{
        width: 702px;
        height: 942px;
        margin: 17px auto 22px;
        border-radius: 24px 24px 24px 24px;
        background: #ffffff;
        overflow: auto;
        img {
            width: 566px;
            height: 420px;
            margin: 28px 0 0 65px;
        }
        .goOther {
            width: 495px;
            height: 96px;
            background: url('~@/assets/images/savebillActivity/otherBtn.png') no-repeat;
            background-size: 100%;
            margin: 30px auto 0;
        }
    }
    .joinBtn {
        position: absolute;
        bottom: 70px;
        left: 100px;
        width: 504px;
        height: 94px;
        background: url('~@/assets/images/savebillActivity/joinBtn.png') no-repeat;
        background-size: 100%;
    }
}
.awating {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 999;
}
</style>