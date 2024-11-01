<template>
    <div>
        <div class="bocmNew_bg">
            <div class="activateBtn" @click="isShow = true"></div>
        </div>
        <div v-if="isShow" class="allow_container">
            <div class="allow_box" v-if="authorizationFlag">
                <p class="allow_title1">{{ title }} <span>申请</span></p>
                <p class="allow_title2">获取以下权限为你提供服务</p>
                <p class="allow_text">您的姓名、手机号、身份证信息、IP地址。设备信息用于<span style="color: red;font-weight: bold">开通</span>养老金资金账户</p>
                <div class="checkbox_btns">
                    <p id="A02" class="btn1" @click="isShow = false">拒绝</p>
                    <p id="A01" class="btn2" @click="confirm">同意</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/common/apiUrls';

export default {
    name: 'empowerMiddle',
    data() {
        return {
            isShow: false, // 是否显示授权页
            title: '江苏移动',
            authorizationFlag: false,
        };
    },
    mounted() {
        // this.isShow = true;
        this.authorizationFlag = true;
        if (window.sessionStorage.getItem('userInfo')) {
            window.sessionStorage.removeItem('userInfo');
        }
    },
    beforeRouteEnter(to,from,next) {
        var backUrl
        if(process.env.VUE_APP_ENV == 'local') {
            backUrl = `http://192.168.100.167:8080/fintech-h5/fortuneCenter${from.fullPath}`
        } else if(process.env.VUE_APP_ENV == 'sit') {
            backUrl = `https://fintech.12580life.com${process.env.BASE_URL}${from.fullPath.slice(1)}`
        } else {
            backUrl = `https://fintech.12580life.com${process.env.BASE_URL}${from.fullPath.slice(1)}`
        }
        window.sessionStorage.setItem('bocm_backUrl',backUrl)
        next()
    },
    methods: {
        confuse() {
            this.$router.go(-1)
        },
        confirm() {
            this.$router.push({
                name: "IDcardSubmit"
            })
        }
    }
};
</script>

<style lang="less" scoped>
.bocmNew_bg {
    position: relative;
    width: 100%;
    height: 1493px;
    background: url('~@/assets/images/BOCM/pensionBg.png') no-repeat;
    background-size: 100%;
    .activateBtn {
        width: 600px;
        height: 100px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 65px;
    }
}
.allow_container {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(2, 2, 2, 0.7);
    z-index: 3;
}
.allow_bg{
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
  width: 100%;
  height: 100%;
}
.allow_box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    background: #ffffff;
    border-radius: 0.2rem 0.2rem 0 0;
    // padding-left: 0.37rem;
    // padding-right: 0.33rem;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 2;
}

.allow_box > p, .allow_box > div {
    padding: 0 0.4rem;
}

.allow_title1 {
    font-size: 0.3rem;
    color: #222222;
    margin-bottom: 0.25rem;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #008bff;
    font-weight: 500;
    background: rgba(0, 139, 255, 0.16);

}

.allow_title1 span {
    font-weight: inherit;
}

.allow_title2 {
    font-size: 0.36rem;
    color: #000000;
    font-weight: 500;
    margin: 0.5rem 0 0.3rem;
}

.allow_text {
    font-size: 0.26rem;
    color: #999;
    line-height: 0.35rem;
    margin-bottom: 0.6rem;
}

.selsetBox {
    font-weight: 500;
    margin-bottom: 0.2rem;
    font-size: 0.26rem;
}

/deep/ .md-agree-icon .md-agree-icon-container .md-icon.md-icon-check {
    color: #008bff;
}

/deep/ .md-agree-icon.checked .md-agree-icon-container .md-icon-checked {
    color: #008bff;
}

/deep/ .md-agree-content a {
    color: #008bff;
}

.cir_box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.2rem;
}

.allow_number {
    font-size: 0.24rem;
    color: #999999;
}

.checkbox_box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 0.5rem;
}

.choose_img {
    display: block;
    width: 0.3rem;
    height: 0.3rem;
}

.checkbox_text {
    font-size: 0.26rem;
    color: #666666;
    margin-left: 0.23rem;
}

.checkbox_i {
    font-size: 0.26rem;
    color: #df5f5f;
}

.checkbox_btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    margin-bottom: 0.4rem;
}

.checkbox_btns p {
    width: 3.15rem;
    height: 0.88rem;
    border-radius: 0.15rem;
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.88rem;
}

.btn1 {
    color: #999;
    border: 0.02rem solid #999;
}

.btn2 {
    color: #ffffff;
    background: #008bff;
}

.model {
    background: #555;

    .cont {
        width: 5rem;
        background: #ffffff;
        padding: 0.4rem;
        text-align: center;
        font-size: 0.28rem;
        border-radius: 0.1rem;

        .top {
            font-size: 0.36rem;
            padding-bottom: 0.3rem;
            border-bottom: 0.01rem solid #999;
        }

        .text {
            padding: 0.4rem;
            line-height: 0.4rem;
            font-family: none;
        }

        .btn {
            background: #008bff;
            color: #ffffff;
            margin: 0 0.6rem;
            line-height: 0.7rem;
            border-radius: 0.1rem;
        }
    }
}

</style>
