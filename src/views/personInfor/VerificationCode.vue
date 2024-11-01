<template>
    <div class="VerificationCode_box">
        <p class="bigtitle">输入短信验证码</p>
        <p class="smalltitle">我们已发送短信验证码到你的手机号</p>
        <p class="strong">{{ phone }}</p>
        <input
            type="number"
            id="numCode"
            placeholder="请输入验证码"
            maxlength="6"
            text="number"
            @input="numcode"
            v-model="numVal"
        />
        <span class="tishi">如果未收到验证码或验证码失效，请返回重试</span>
        <div class="btn" @click="compare">提交</div>
        <popups :popusList="poplis" v-on:isShow="isShow"></popups>
    </div>
</template>

<script>
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import popups from '../../components/popups.vue';

export default {
    components: {
        popups
    },
    data() {
        return {
            numVal: '',
            phone: store2.default
                .get('usrmob')
                .replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            poplis: {
                title: '设置成功',
                content: '支付密码设置成功，请牢记',
                alone: '确认',
                showMask: false,
                show: true
            },
            smsText: '',
            timer: null,
            attcode: true,
            sec: 61
        };
    },
    mounted() {
        // this.obtain();
    },
    methods: {
        numcode() {
            console.log(this.numVal);
        },
        // obtain() {
        //   if (!this.timer) {
        //     this.attcode = true;
        //     this.timesContral();
        //     this.timer = setInterval(this.timesContral, 1000);
        //   }
        // },
        compare() {
            console.log('提交');
            // 支付密码新建/变更
            api.paymentApi
                .SettingModification({
                    optjrn: this.$route.params.sun,
                    smscode: this.numVal
                })
                .then((data) => {
                    console.log(data);
                    if (data.code === 'RMP0000') {
                        this.poplis.showMask = true;
                    } else {
                        this.$toast.info(data.msg, 3000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.$toast.info('请输入正确的验证码', 3000);
                });
        },
        isShow() {
            this.$router.push({ name: 'newFortune' });
        }
        // timesContral() {
        //   if (this.sec > 0 && this.sec <= 61) {
        //     this.sec -= 1;
        //     if (this.sec !== 0) {
        //       this.attcode = true;
        //       this.smsText = `${this.sec} s`;
        //     } else {
        //       clearInterval(this.timer);
        //       this.attcode = false;
        //       this.smsText = "获取验证码";
        //       this.sec = 61;
        //       this.timer = null;
        //     }
        //   }
        // },
    }
};
</script>

<style lang="less" scoped>
.VerificationCode_box {
    height: 100vh;
    background-color: #f5f5f5;
    padding-top: 150px;
    p {
        text-align: center;
    }
    .bigtitle {
        margin-top: 70px;
        font-size: 50px;
    }
    .smalltitle {
        margin-top: 30px;
        font-size: 35px;
        color: #999999;
    }
    .strong {
        margin-top: 20px;
        font-size: 40px;
        font-weight: 500;
    }
    .tishi {
        display: block;
        text-align: center;
        font-size: 30px;
        padding-top: 50px;
        color: #999999;
    }
}
#numCode {
    padding-left: 70px;
    width: 100%;
    height: 110px;
    font-size: 32px;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    text-align: left;
    line-height: 110px;
    letter-spacing: -1px;
    border: none;
    margin-top: 100px;
}

.btn {
    width: 650px;
    height: 90px;
    margin: auto;
    background: #0195ff;
    border-radius: 8px;
    font-size: 36px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 90px;
    margin-top: 100px;
}
input::-webkit-input-placeholder {
    color: #d9d9d9;
}
input::-moz-input-placeholder {
    color: #d9d9d9;
}
input::-ms-input-placeholder {
    color: #d9d9d9;
}
</style>
