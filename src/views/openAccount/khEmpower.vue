<template>
    <div>
        <div v-if="isShow" class="allow_container">
            <div class="authorizationButton" v-if="!authorizationFlag" @click="authorizationFlag = true">立即开通</div>
            <div class="allow_bg" v-if="authorizationFlag"></div>
            <div class="allow_box" v-if="authorizationFlag">
                <p class="allow_title1">{{ title }} <span>申请</span></p>
                <p class="allow_title2">获取以下权限为你提供服务</p>
                <p class="allow_text">您的姓名、手机号、身份证号、银行卡号、IP地址、设备信息用于<span style="color: red;font-weight: bold">开通</span>钱包账户</p>
                <div class="checkbox_btns">
                    <p id="A02" class="btn1" @click="confuse">拒绝</p>
                    <p id="A01" class="btn2" @click="confirm">同意</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/common/apiUrls';
import { Agree } from 'mand-mobile';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';

export default {
    name: 'jsyhApplyfor',
    components: {
        [Agree.name]: Agree
    },
    data() {
        return {
            bocmFlg: false,
            showAgreement: false, // 是否显示协议内容
            hasRead: false, // 是否已阅读过
            clickRadio: false,
            isShow: false, // 是否显示授权页
            atyNo: '',
            phone: '',
            title: '江苏移动',
            queryData: {},
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_OPENACCOUNT_KHEMPOWER_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_OPENACCOUNT_KHEMPOWER_A02'
                }
            ],
            cityCode: '',
            cmbFlg: false,
            spdbFlg: false,
            authorizationFlag: false
        };
    },
    mounted() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.isShow = true;
        this.queryData = this.$route.query;
        if (this.queryData.orgCode === 'CMB') {
            this.queryData.orgCode = 'SPDB';
        }
        this.checkBcm();
        if (this.$route.query.typeId === 'madian' && this.$route.query.jobNumber) {
            store2.default.set('madianJobNum', this.$route.query.jobNumber);
            store2.default.set('madianUserbusiNum', '2100000029');
        }
        if (window.sessionStorage.getItem('userInfo')) {
            window.sessionStorage.removeItem('userInfo');
        }
    },
    methods: {
        checkBcm() {
            api.getInitinfo({
                orgcode: this.queryData.orgCode
            })
                .then((data) => {
                    this.bocmFlg = data.bocmFlg;
                    this.cmbFlg = data.cmbFlg;
                    this.spdbFlg = data.spdbFlg;
                    this.cityCode = data.cityCode;
                });
        },
        // 新增授权信息
        addActivity() {
            api.addEmpower({ channel: 'WALLET_AUTH', parentChannel: this.$route.query.parchn || '', childChannel: this.$route.query.gytype || '' })
                .then(() => {});
            if (
                this.queryData.typeId == 'bcmact'
              && this.queryData.orgCode == 'BOCM'
            ) {
                this.$router.push({
                    name: 'submitID',
                    query: {
                        ...this.queryData,
                        pageFrom: 'khEmpower',
                        parchn: this.$route.query.parchn,
                        gytype: this.$route.query.gytype,
                        cityCode: this.cityCode
                    }
                });
            } else if (this.queryData.orgCode && this.queryData.orgCode == 'BOCM') {
                this.$router.push({
                    name: 'submitID',
                    query: {
                        ...this.queryData,
                        pageFrom: 'khEmpower',
                        parchn: this.$route.query.parchn,
                        gytype: this.$route.query.gytype,
                        cityCode: this.cityCode
                    }
                });
                // window.location.href = "https://fintech.12580life.com/fintech-h5/fortuneCenter/BOCM/submitID?typeId" + this.$route.query.typeId
            } else if (this.queryData.orgCode) {
                this.$router.push({
                    name: 'walletAccount',
                    query: {
                        ...this.queryData,
                        pageFrom: 'khEmpower',
                        parchn: this.$route.query.parchn,
                        gytype: this.$route.query.gytype
                    }
                });
            } else {
                if (this.bocmFlg && !this.spdbFlg && !this.cmbFlg) {
                    this.$router.push({
                        name: 'submitID',
                        query: {
                            ...this.queryData,
                            pageFrom: 'khEmpower',
                            parchn: this.$route.query.parchn,
                            gytype: this.$route.query.gytype,
                            cityCode: this.cityCode
                        }
                    });
                    // window.location.href = "https://fintech.12580life.com/fintech-h5/fortuneCenter/BOCM/submitID?typeId" + this.$route.query.typeId
                } else {
                    // 三个false推荐浦发
                    this.queryData.orgCode = 'SPDB';
                    this.$router.push({
                        name: 'walletAccount',
                        query: {
                            ...this.queryData,
                            pageFrom: 'khEmpower',
                            parchn: this.$route.query.parchn,
                            gytype: this.$route.query.gytype
                        }
                    });
                }
            }
        },
        jumpAgreement() {
            this.showAgreement = true;
            this.clickRadio = false;
        },
        confirm() {
            this.addActivity();
        },
        confuse() {
            if (this.$route.query.closeType == 'qblc') {
                leadeon.closeCurrentWebView({
                    debug: false,
                    success(res) {},
                    error(res) {}
                });
            } else {
                this.$router.go(-1);
            }
        },
        agreeClick() {
            this.hasRead = true;
            this.showAgreement = false;
        }
    }
};
</script>

<style lang="less" scoped>
.allow_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // background: #555;
    background: url('../../assets/images/openAccount/khEmpower_bg2.png') no-repeat;
    background-size: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 1010px;
    .authorizationButton{
      height: 105px;
      width: 454px;
      background: #427bf6;
      border-radius: 80px;
      font-size: 38px;
      color: #ffffff;
      font-weight: 800;
      border: 5px solid #6294ff;
      line-height: 95px;
      text-align: center;
      margin: auto;
      box-sizing: border-box;
    }
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
