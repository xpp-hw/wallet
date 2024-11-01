<template>
    <div>
        <div class="container unwind-wallet" id="container">
            <div class="account-index-wrapper">
                <div class="unwind-info">
                    <p>身份证号验证</p>
                    <div class="unwind-note">为保证您的账户安全，请输入您的身份证后6位。</div>
                    <ul>
                        <li><span>登录账号: </span><span class="usrmob">{{showmob}}</span></li>
                        <li class="valiid">
                            <span>身份证号: </span>
                            <span style="float:right;">{{firstNo}}********</span>
                            <div class="id_box">
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <input type="text" v-model="lastidno" class="infor_id" maxlength="6" v-on:input="watchCode"/>
                            </div>
                        </li>
                    </ul>
                    <div class="warm-note">如您换绑成功，则无法使用账号{{showmob}}，登录钱包账户</div>
                </div>
                <button class="send-code" :class="[actsend ? '' : 'actsend-code']" :disabled="actsend" @click="getcode">发送验证码</button>

            </div>
            <div class="loading-toast" v-if="loadpic" id="isZqq">
                <img src="@/assets/images/loading-toast.gif" alt="">
            </div>
            <!-- 短信验证码 -->
            <div class="infor_container" v-if="inforShow">
                <div class="infor_box">
                    <p class="infor_title">请输入短信验证码</p>
                    <p class="infor_mobile">
                    已发送验证码至手机<i>{{ showmob }}</i>
                    </p>
                    <div class="mobile_box">
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <input type="text" v-model="smsCode" class="infor_ipt" maxlength="6" />
                    </div>
                    <button type="button" class="infor_djs" :class="[send ? '' : 'actbtn']" :disabled="send" @click="getcode">
                    {{smsMsg}}
                    </button>
                    <div class="infor_buttons">
                        <p class="infor_not" @click="cancel">取消</p>
                        <p class="infor_sure" :class="btnconfirm ? 'unbtn':''" @click="checkInfor">提交</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import api from '@/common/apiUrls';
// import InputWithValidation from '@/components/InputWithValidation';
import * as store2 from '@/common/localstore';

export default {
    name: 'walletUnwdValiID',
    components: {
        mdHeader
    },
    data() {
        return {
            lastidno: '',
            mobile: '',
            showmob: '',
            inforShow: false,
            // 倒计时秒数
            countdown: 60,
            // 定时器
            timer: null,
            // 发送按钮可否点击
            send: false,
            actsend: true,
            smsCode: '',
            loadpic: false,
            smsMsg: '获取验证码',
            smsJrn: '', // 下发短信流水
            firstNo: '',
            btnconfirm: true,
            acctyp: ''
        };
    },
    watch: {
        smsCode: {
            handler(val) {
                this.btnconfirm = !(val && val.length === 6);
            }
        }
    },
    mounted() {
        document.body.style.backgroundColor = '#f5f5f5';
    },
    created() {
        this.firstNo = store2.default.get('firstfourid');
        this.mobile = store2.default.get('usrmob');
        this.showmob = this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.acctyp = this.$route.query.acctyp || '';
    },
    methods: {
        getcode() {
            if (this.countdown > 0 && this.countdown < 60) {
                this.$toast.info('操作过于频繁，请稍后重试');
                return;
            }
            api.unwindSendCode({
                mobileNo: this.mobile,
                acctyp: this.acctyp
            })
                .then((data) => {
                    console.log(data);
                    this.smsJrn = data.smsTjn;
                    this.userDetermine();
                    this.inforShow = true;
                })
                .catch((err) => {
                    if (err.msgCd !== 'BUS00000') {
                        this.$toast.info(err.msgInfo);
                        if (err.msgCd === 'BUS20017') {
                            // 用户未登录，跳转登录
                        }
                    }
                });
        },
        userDetermine() {
            if (!this.timer) {
                this.getValidStr();
                this.timer = setInterval(this.getValidStr, 1000);
            }
        },
        getValidStr() {
            if (this.countdown > 0 && this.countdown <= 60) {
                this.countdown -= 1;
                const times = this.countdown;
                if (this.countdown !== 0) {
                    this.send = true;
                    this.actsend = true;
                    this.smsMsg = `重新获取(${times}s)`;
                } else {
                    clearInterval(this.timer);
                    this.send = false;
                    this.smsMsg = '重新获取';
                    this.countdown = 60;
                    this.actsend = false;
                    this.timer = null;
                }
            }
        },
        checkInfor() {
            this.btnconfirm = true;
            if (this.smsCode.length === 6) {
                api.unwindValiCode({
                    mobileNo: this.mobile,
                    smsJrn: this.smsJrn,
                    smsCode: this.smsCode,
                    acctyp: this.acctyp
                })
                    .then((data) => {
                        console.log(data);
                        if (data.msgCd === 'wallet00000') {
                            this.$router.push(
                                {
                                    name: 'walletUnwdResult',
                                    query: {
                                        result: 0
                                    }
                                }
                            );
                        }
                    })
                    .catch((err) => {
                        if (err.msgCd === 'BUS20017') {
                            // 用户未登录，跳转登录
                        } else {
                            if (err.msgInfo.indexOf('短信') !== -1) {
                                this.$toast.info(err.msgInfo);
                            } else {
                                this.$router.push(
                                    {
                                        name: 'walletUnwdResult',
                                        query: {
                                            result: 1
                                        }
                                    }
                                );
                            }
                        }
                    });
            } else {
                this.$toast.info('验证码输入错误，请重试');
            }
        },
        watchCode() {
            if (this.lastidno.length === 6) {
                const realid = store2.default.get('lastsixid');
                console.log(this.lastidno);
                console.log(realid);
                if (this.lastidno === realid || realid === '' || realid === null) {
                    this.actsend = false;
                } else {
                    this.actsend = true;
                    this.$toast.info('身份证验证失败，请重试');
                }
            }
        },
        cancel() {
            this.inforShow = false;
        }
    }
};
</script>
<style scoped lang="less">
#popup-verification_code{
    margin-left:.3rem;
    position:fixed;
    top:30%;
}
.popup-verification_code .popup-normal__title{
    text-align:center;
    font-size:.38rem;
}
.verification_code-form .form_title{
    text-align:center;
    font-size:.3rem;
    margin-bottom:.3rem;
}
.verification_code-form .get-code-btn{
    margin-top:.2rem;
    margin-bottom:.2rem;
}
.valiid{
    display:flex;
    .id_box{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width:3.6rem;
        height: 0.8rem;
        p {
            width: 0.82rem;
            height: 0.6rem;
            font-size: 0.32rem;
            color: #000000;
            text-align: center;
            background:#fff;
            padding:0;
            margin: 0 0.05rem;
            border-radius:.06rem;
        }
    }
    .infor_id {
        position: absolute;
        left: 0;
        top: 0;
        width: 108%;
        height: 100%;
        border: 0;
        outline: none;
        font-size: 0.32rem;
        color: #000000;
        letter-spacing: 0.425rem;
        text-indent: 0.2rem;
        background: transparent;
        z-index: 46;
        color: transparent;
        caret-color: transparent;
        text-shadow: 0 0 0 #000;
    }
}
.infor_container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
    .infor_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 6.9rem;
        background: #ffffff;
        border-radius: 0.15rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        box-sizing: border-box;
    }
    .infor_title {
        font-size: 0.4rem;
        color: #333333;
        font-weight: 700;
        padding-top: 0.4rem;
        padding-bottom: 0.2rem;
        border-bottom: 0.02rem solid #e4e4e4;
        margin-bottom: 0.3rem;
        text-align:center;
    }
    .infor_mobile {
        font-size: 0.3rem;
        color: #999999;
        text-align:center;
        margin-bottom:.4rem;
        i{
            font-style: normal;
        }
    }
    .mobile_box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 0.8rem;
        margin-bottom: 0.2rem;
        margin-top:.2rem;
        p {
            width: 0.82rem;
            height: 0.82rem;
            font-size: 0.32rem;
            color: #000000;
            text-align: center;
            border: 0.02rem solid #e5e5e5;
            margin: 0 0.1rem;
        }
    }
    .infor_ipt {
        position: absolute;
        left: 0;
        top: 0;
        width: 108%;
        height: 100%;
        border: 0;
        outline: none;
        font-size: 0.32rem;
        color: #000000;
        letter-spacing: 0.88rem;
        text-indent: 0.4rem;
        background: transparent;
        z-index: 46;
        color: transparent;
        caret-color: transparent;
        text-shadow: 0 0 0 #000;
    }
    .infor_main {
        width: 100%;
    }
    .infor_bototm {
        width: 100%;
        height: 0.76rem;
    }
    .infor_djs {
        font-size: 0.34rem;
        color: #999999;
        border: 0;
        background: none;
        display: block;
        margin: 0 auto;
        margin-top:.4rem;
    }
    .actbtn{
        color: #0195ff;
    }
    .infor_buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 0.6rem;
        padding-top: 0.76rem;
        p {
            width: 2.9rem;
            height: 0.82rem;
            border-radius: 0.15rem;
            font-size: 0.36rem;
            text-align: center;
            line-height: 0.82rem;
        }
        .infor_not {
            color: #999999;
            background: #ffffff;
            border: 0.02rem solid #828282;
        }

        .infor_sure {
            color: #ffffff;
            background: #238ff2;
        }
        .unbtn{
            background: #8ec4f6;
            pointer-events:none;
        }
    }
}
.unwind-info{
    p{
        padding-top:.44rem;
        margin-bottom:.2rem;
        font-size:.36rem;
        font-weight:600;
        color:#333;
        margin-left:.3rem;
    }
    .unwind-note{
        width:100%;
        height:.56rem;
        line-height:.56rem;
        font-size:.24rem;
        background: rgba(35,143,242,0.10);
        color:#238ff2;
        text-indent: .3rem;
    }
    ul{
        width:100%;
        li{
            width:6.9rem;
            height:1.04rem;
            font-size:.32rem;
            color:#333;
            margin:auto;
            line-height:1.04rem;
            justify-content: space-between;
        }
        .usrmob{
            float:right;
        }
    }
}
.loading-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 1.2rem;
    z-index: 999;
    border: 999px solid transparent;
}
.warm-note{
    width:6.9rem;
    color:#666;
    font-size:.28rem;
    margin-left:.3rem;
    margin-top:.3rem;
}
.send-code{
    width: 6.9rem;
    height: .9rem;
    background: #8ec4f6;
    border-radius: .1rem;
    position: fixed;
    left:.3rem;
    bottom:1.8rem;
    color:#fff;
    pointer-events: none;
    font-size:.36rem;
    font-weight:500;
    border:none;
  }
.actsend-code{
    background: #0195ff;
    pointer-events: inherit;
}
</style>
