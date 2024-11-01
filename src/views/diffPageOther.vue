<template>
    <div class="container-bg">
        <div class="yw-main">
            <img src="../assets/images/ywDuanwai.png" class="dw-img" />
            <div class="dw-wrap">请在中国移动</div>
            <div class="dw-info">江苏掌厅</div>
            <div class="dw-info">APP中打开！</div>
        </div>
    </div>
</template>

<script>
import * as store2 from "@/common/localstore";

export default {
    name: "ywPageDuanwai",

    data() {
        return {
            ywIphone: "",
        };
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="less">
.container-bg {
    width: 100%;
    height: 100%;
    font-family: PingFang-SC, -apple-system-font, Helvetica Neue, sans-serif;
}
.container-main {
    background: url("../assets/images/ywBg.jpg") no-repeat;
    background-size: 100% 100%;
    height: 2128px;
    .top-wrap {
        position: relative;
        height: 614px;
    }
    .yw-iphone {
        font-size: 34px;
        color: #1d1e20;
        position: absolute;
        left: 130px;
        top: 60px;
    }
    .welconme-info {
        font-size: 18px;
        margin-left: 40px;
        border: 1px solid #1d1e20;
        padding: 5px 10px;
        text-align: center;
        border-radius: 20px 20px 20px 20px;
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
    }
    .njyh-wrap {
        width: 540px;
        height: 88px;
        position: absolute;
        top: 475px;
        left: 110px;
    }
    .jq-wrap {
        height: 576px;
        padding-top: 96px;

        .bank-item {
            height: 190px;
            position: relative;
            .item-btn {
                width: 190px;
                height: 51px;
                background-image: linear-gradient(
                    90deg,
                    #758efb 0%,
                    #4a74f8 100%
                );
                border-radius: 44px;
                border-radius: 25px;
                color: #fff;
                position: absolute;
                right: 50px;
                top: 60px;
                line-height: 51px;
                text-align: center;
            }
        }
    }
    .banka-wrap {
        padding-top: 92px;
        .banka-item {
            height: 205px;
            margin-bottom: 20px;
            position: relative;
            .item-btn {
                width: 152px;
                height: 40px;
                background-image: linear-gradient(
                    90deg,
                    #758efb 0%,
                    #4a74f8 100%
                );
                border-radius: 35px;
                border-radius: 20px;
                color: #fff;
                position: absolute;
                right: 100px;
                top: 110px;
                line-height: 40px;
                text-align: center;
            }
        }
    }
}
.yw-main {
    padding-top: 264px;
    text-align: center;

    .dw-img {
        width: 530px;
        height: 482px;
    }
    .dw-wrap {
        width: 306px;
        height: 89px;
        border: 2px solid #979797;
        border-radius: 50px;
        font-weight: Bold;
        font-size: 34px;
        color: #333333;
        margin: 50px auto 30px;
        line-height: 89px;
    }
    .dw-info {
        font-weight: Bold;
        font-size: 30px;
        color: #333333;
        line-height: 60px;
    }
}
</style>
