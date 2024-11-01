<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2022-12-28 09:17:55
 * @LastEditors: Mr.Zhao 1914689669@qq.com
 * @LastEditTime: 2023-06-08 05:32:51
 * @FilePath: \wallet\src\views\BOCM\signResult.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box">
        <div :class="signSuc == '1' ? 'suc' : 'fail'"></div>
        <p v-if="signSuc =='1'" class="text">签约成功</p>
        <p v-if="signSuc == '0'" class="text">签约失败</p>
        <p v-if="signSuc == '1'" class="text_2">恭喜，签约成功，您现在可以在此手机号下正常使用钱包账户支付了。</p>
        <p v-if="signSuc == '0'" class="text_2">{{reason}}</p>
        <div class="btn" @click="confirm()">确定</div>
    </div>
</template>

<script>
import * as store2 from "@/common/localstore";
import api from '@/common/apiUrls';
export default {
    name: "signResult",
    data() {
        return {
            signSuc: "",
            reason: "抱歉，签约失败，您可稍后重新尝试签约。",
            typeid: '',
            accNbr: "",
            fullAccNbr: "",
            orgName: "",
        }
    },
    created() {
        if(this.$route.query.result == '1') {
            this.signSuc = true;
        } else if(this.$route.query.result == '0'){
            this.signSuc = false;
        }
        if(this.$route.query.reason) {
            this.reason = this.$route.query.reason;
        }
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
        }
    },
    mounted() {
        const changeList = []
        api.qrySmallChangeAcc({})
        .then(data => {
            data.list.forEach(res => {
                if(res.orgCode == "BOCM") {
                    this.accNbr = res.accNbr
                    this.fullAccNbr = res.fullAccNbr
                    this.orgName = res.orgName
                }
                if (
                    res.fullAccNbr &&
                    res.defaultAccFlg === "01" &&
                    res.orgCode !== "ICBC-DIGICCY"
                    ) {
                        changeList.unshift(res);
                    } else if (res.fullAccNbr && res.orgCode !== "ICBC-DIGICCY") {
                        changeList.push(res);
                    }
                window.sessionStorage.setItem("qbBankListsInfos", JSON.stringify(changeList))
            })
        })
        
    },
    methods: {
        confirm() {
            if(this.signSuc == '1') {
                store2.default.set("signAlready",true)
            }
            if (this.typeid === 'hfb') {
                this.$router.push({
                    name: 'description'
                });
            } else {
                // this.$router.push({
                //     name: 'walletCardcenter'
                // });
                // window.history.go(-2)
                // this.$router.push({
                //     name: "newFortune",
                // });
                window.location.replace("https://fintech.12580life.com/fintech-h5/fortuneCenter/newFortune")
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .suc {
        width: 278px;
        height: 212px;
        margin: 112px auto 94px;
        background: url('../../assets/images/signSuc.png') no-repeat;
        background-size: 100%;
    }
    .fail {
        width: 278px;
        height: 212px;
        margin: 112px auto 94px;
        background: url('../../assets/images/signFail.png') no-repeat;
        background-size: 100%;
    }
    .text {
        font-weight: 600;
        font-size: 40px;
        color: #333333;
        text-align: center;
        margin-bottom: 24px;
    }
    .text_2 {
        width: 534px;
        font-size: 28px;
        color: #999999;
        text-align: center;
        line-height: 48px;
        margin: 0 auto;
    }
    .btn {
        position: fixed;
        bottom: 300px;
        left: 50%;
        transform: translateX(-50%);
        width: 660px;
        height: 100px;
        line-height: 100px;
        font-size: 36px;
        font-weight: 500;
        background: #1B7AEE;
        border-radius: 50px;
        text-align: center;
        color: #f1f1f1;
    }
</style>
