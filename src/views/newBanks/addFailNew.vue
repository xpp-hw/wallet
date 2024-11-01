<template>
    <div class="contains">
        <div class="sucImg">
            <img src="../../assets/images/newBanks/shibai-img.png" alt="" />
        </div>
        <div class="errText">
          <p>{{msgInfo}}</p></div>
        <!-- <div class="tips">银行卡添加失败</div> -->
        <md-button class="confirmBtn" id="A01" @click="jumpUrl">确定</md-button>
        <!-- <md-button class="confirmBtn" id="A01" >确定</md-button> -->
        <!-- 页面回调地址 -->
    </div>
</template>

<script>
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'addFailNew',
    components: {},
    data() {
        return {
            dealChn: '',
            ZFbackID: '',
            msgInfo: '',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_ADDFAILNEW_01_A01'
                }
            ]
        };
    },

    mounted() {
        //  获取地址栏的参数
        this.dealChn = this.$route.query.dealChn;
        // 支付项目返回地址id
        this.ZFbackID = this.$route.query.ZFbackID || '';
        this.msgInfo = this.$route.query.msgInfo || '';
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },

    methods: {
        jumpUrl() {
            this.$router.push({
                name: 'addNewBanks',
                query: {
                    dealChn: this.dealChn,
                    ZFbackID: this.ZFbackID
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.contains {
    height: 100%;
    background: #f2f2f2;
    min-height: 100vh;
    overflow: hidden;
    .sucImg {
        width: 568px;
        height: 438px;
        opacity: 1;
        margin: 0 auto;
        padding-top: 64px;
        img {
            width: 100%;
            width: 100%;
        }
    }
    .errText{
      text-align: center;
      color: #0195ff;
      font-weight: 500;
      font-size: 30px;
      width: 65%;
      margin: auto;
      word-break:break-all;//英文
	    white-space:pre-wrap;//中文
    }
    .tips {
        height: 48px;
        opacity: 1;
        font-size: 34px;
        font-weight: 500;
        text-align: center;
        color: #333333;
        line-height: 48px;
    }
    .confirmBtn {
        width: 503px;
        height: 89px;
        opacity: 1;
        background: #0195ff;
        border-radius: 10px;
        font-size: 40px;
        font-weight: 500;
        color: #ffffff;
        margin: 718px auto 0;
        border-radius: 44px;
    }
}
</style>
