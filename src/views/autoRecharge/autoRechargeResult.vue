<template>
    <div class="contaion">
        <div class="box">
            <img
                v-if="successType == '1'"
                class="img1"
                src="../../assets/images/autoRecharge/relieve_icon.png"
                alt=""
            />
             <img
                v-if="successType == '2'"
                class="img1"
                src="../../assets/images/autoRecharge/sucess_icon.png"
                alt=""
            />
             <img
                v-if="successType == '3'"
                class="img1"
                src="../../assets/images/autoRecharge/error_icon.png"
                alt=""
            />
               <img
                v-if="successType == '4'"
                class="img1"
                src="../../assets/images/autoRecharge/error_icon.png"
                alt=""
            />
            <div class="text" v-if="successType == '1'">你已完成解约</div>
            <div class="text" v-if="successType == '2'">签约成功</div>
            <div class="text" v-if="successType == '3'">签约失败</div>
            <div class="text" v-if="successType == '4'">解约失败</div>
            <md-button size="small" type="primary" round @click="backClick"
                >返回首页</md-button
            >
        </div>
    </div>
</template>
<script>
import { Button } from 'mand-mobile';
import api from '@/common/apiUrls';

export default {
    components: {
        [Button.name]: Button
    },

    data() {
        return {
            successType: ''
        };
    },
    mounted() {
        this.successType = this.$route.query.successType;
        if (this.$route.query.signJrnNo) {
            this.hbqueryResult();
        }
    },
    methods: {
        hbqueryResult() {
            api.autoRecharge.usrSignStsQuery({ signJrnNo: this.$route.query.signJrnNo }).then((res) => {
                this.successType = res.signSts === '01' ? '2' : '3';
            });
        },
        backClick() {
            this.$router.push({
                name: 'autoRecharge'
            });
        }
    }
};
</script>
<style lang="less" scoped>
.contaion {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 9999;
    background: #fff !important;
    position: fixed;
    top: 0;
    left: 0;
    padding: 100px;
    box-sizing: border-box;
    .box {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .img1 {
            width: 278px;
            height: 212px;
            margin: 10px 0 60px;
        }
        .text {
            width: 100%;
            text-align: center;
            font-weight: bold;
        }
        .md-button {
            margin-top: 160px;
        }
    }
}
</style>
