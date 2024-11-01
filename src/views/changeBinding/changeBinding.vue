<template>
    <div>
        <div class="container wallet-sign" id="container">
            <div class="sign">
                <div class="sign_body">
                    <div class="sign_title">身份证号验证</div>
                    <div class="input-tip">为保证您的账户安全，请输入您的身份证号。</div>
                    <div class="sign_label sign_phone" style="padding: 0.26rem 0.3rem;">
                        <div class="sign_label-name">换绑手机</div>
                        <div class="sign_label-input">
                            <input type="text" class="" id="isNewMobile" disabled v-model="showmob">
                        </div>
                    </div>
                    <div class="divider" style="width: 6.9rem;margin: 0 auto;"></div>
                    <div class="sign_label sign_id" style="padding: 0.26rem 0.3rem;">
                        <div class="sign_label-name">身份证号</div>
                        <div class="sign_label-input">
                            <input type="text" class="idCard" placeholder="请输入当前登录账号的身份证号"
                                v-model="idno" maxlength="18" id="isCardNo">
                        </div>
                    </div>
                </div>
                <div class="sign_tip" id="isOldMobile">如您换绑成功，则无法使用账号{{showmob}}，登录钱包账户</div>
                <a class="btn btn_get-code js-getCode" :class="idno.length==18 ? 'btn-on':''" id="A02"  @click="getcode">发送验证码</a>
                <p class="bottom-logo">移动钱包</p>
            </div>
            <!-- loading -->
            <div class="loading-toast" style="display: none" id="isZqq">
                <img src="@/assets/images/loading-toast.gif" alt="">
            </div>
            <!-- 短信验证码 -->
            <div class="infor_container" v-if="inforShow">
                <div class="infor_box">
                    <p class="infor_title">换绑手机号验证</p>
                    <p class="title_note">请输入短信验证码</p>
                    <p class="infor_mobile">
                    已发送短信验证码至<i>{{ showmob }}</i>
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
                    <button type="button" class="infor_djs" :disabled="send" @click="getcode">
                    重新获取 {{ countdown }}s
                    </button>
                    <div class="infor_buttons">
                        <p class="infor_not" id="A04" @click="inforShow = false">取消</p>
                        <p class="infor_sure" :class="btnconfirm ? 'unbtn':''" id="A03" @click="checkInfor">确定</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
// import InputWithValidation from '@/components/InputWithValidation';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'changeBinding',
    components: {
        mdHeader
    },
    data() {
        return {
            mobile: '',
            showmob: '',
            inforShow: false,
            // 倒计时秒数
            countdown: 60,
            // 定时器
            timer: null,
            // 发送按钮可否点击
            send: false,
            smsCode: '',
            idno: '',
            smsjrn: '',
            kaihumob: '',
            btnconfirm: true,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_CHANGEBINDING_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_CHANGEBINDING_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLET_CHANGEBINDING_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_WALLET_CHANGEBINDING_A04'
                }
            ]
        };
    },
    mounted() {
        document.body.style.backgroundColor = '#f5f5f5';
    },
    watch: {
        smsCode: {
            handler(val) {
                this.btnconfirm = !(val && val.length === 6);
            }
        }
    },
    created() {
        this.mobile = store2.default.get('usrmob');
        this.showmob = this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.kaihumob = store2.default.get('kaihumob');
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        getcode() {
            api.cgBindSendCode({
                icNo: this.idno,
                mblno: this.kaihumob // 原手机号
            })
                .then((data) => {
                    console.log(data);
                    this.userDetermine();
                    this.inforShow = true;
                    this.smsjrn = data.smstjn;
                })
                .catch((err) => {
                    if (err.msgCd === 'BUS20017') {
                        // 用户未登录，跳转登录
                    } else {
                        this.$toast.info(err.msgInfo);
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
                if (this.countdown !== 0) {
                    this.send = true;
                } else {
                    clearInterval(this.timer);
                    this.send = false;
                    this.countdown = 60;
                    this.timer = null;
                }
            }
        },
        checkInfor() {
            this.btnconfirm = true;
            api.cgBindValiCode({
                smsjrn: this.smsjrn,
                mblno: this.kaihumob, // 原手机号
                yzm: this.smsCode
            })
                .then((data) => {
                    console.log(data);
                    this.$router.push(
                        {
                            name: 'changeBindResult',
                            query: {
                                result: 0
                            }
                        }
                    );
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
                                    name: 'changeBindResult',
                                    query: {
                                        result: 1
                                    }
                                }
                            );
                        }
                    }
                });
        }
    }
};
</script>
<style scoped lang="less">
.sign .btn{
    position:fixed;
}
.bottom-logo{
    position: fixed;
    bottom:.82rem;
    text-align:center;
    color:#d7d7d7;
    font-size:.36rem;
    width:100%;
}
.warm-note{
    width:6.9rem;
    color:#666;
    font-size:.28rem;
    margin-left:.3rem;
    margin-top:.3rem;
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
        font-size: 0.3rem;
        color: #333333;
        padding-top: 0.4rem;
        padding-bottom: 0.2rem;
        border-bottom: 0.02rem solid #e4e4e4;
        margin-bottom: 0.2rem;
    }
    .title_note {
        font-size: 0.4rem;
        color: #333333;
        font-weight: 700;
        padding-top: 0.4rem;
        padding-bottom: 0.2rem;
        margin-bottom: 0.2rem;
    }
    .infor_mobile {
        font-size: 0.3rem;
        color: #999999;
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
            height: 0.6rem;
            font-size: 0.32rem;
            color: #000000;
            text-align: center;
            border-bottom: 0.02rem solid #dbdbdb;
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
        letter-spacing: 0.85rem;
        text-indent: 0.5rem;
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
        font-size: 0.24rem;
        color: #999999;
        border: 0;
        background: none;
        display: block;
        margin-bottom: 0.2rem;
    }
    .infor_buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 0.35rem;
        padding-top: 0.15rem;
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
.sign_body {
  background: #fff;
}
.sign_title {
  padding: 0.3rem 0.3rem 0.26rem 0.3rem;
  font-size: 0.54rem;
  color: #333;
  font-weight: 700;
}
.sign_label {
  padding: 0.15rem 0.3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.32rem;
  color: #333;
  height: 0.54rem;
}
.sign_label-name {
  width: 1.66rem;
}
.sign_label-input {
  flex: 1;
  input {
        font-size: 0.32rem;
        color: #333;
        appearance: none;
        background: transparent;
        width: 100%;
        border: none;
    }
}
.sign_label input[type="text"]:disabled {
  -webkit-opacity: 1;
  opacity: 1;
  color: #333;
  -webkit-text-fill-color: #333;
}
.sign .sign_id .idCard {
    caret-color: #238FF2;
}
.sign .sign_id input::-webkit-input-placeholder {
    color: #D9D9D9;
}
.sign_tip {
    font-size: 0.28rem;
    color: #999;
    padding: 0.4rem 0.32rem;
}
.sign .input-tip {
    color: #238FF2;
    font-size: 0.26rem;
    height: 0.68rem;
    line-height: 0.68rem;
    text-indent: 0.3rem;
    background-color: rgba(35, 143, 242, 0.1);
}
.btn {
    display: block;
    width: 4rem;
    height: 0.9rem;
    border-radius: 0.08rem;
    font-size: 0.36rem;
    color: #fff;
    text-align: center;
}
.btn_get-code {
    position: fixed;
    bottom: 1.89rem;
    left: 50%;
    margin-left: -2rem;
    line-height: 0.9rem;
    background: rgba(0, 0, 0, 0.2);
}
.btn_get-code.btn-on {
    background: #238FF2;
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
.toast {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 5.4rem;
    height: 0.8rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0.4rem;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.8rem;
    text-align: center;
    margin-top: 3rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 998;
}
.form_code-body {
    position: relative;
}
.hidden_input {
    border: 1px solid red;
    width: 100%;
    position: absolute;
    z-index: 2;
    top: 0.6rem;
    left: 0;
    right: 0;
    height: 32px;
    opacity: 0;
}
.verification_code-form .form_title {
    font-size: 0.4rem;
    color: #333;
    font-weight: 500;
    margin-top: 0.3rem;
}
.verification_code-form .code-tip {
    font-size: 0.3rem;
    color: #999;
    margin-top: 0.2rem;
}
.verification_code-form .get-code-btn {
    border: none;
    background-color: transparent;
    color: #999;
    font-size: 0.24rem;
}
.verification_code-form .get-code-btn.light {
    color: #238FF2;
}
.verification_code-form .verification_code-actions {
    line-height: 0.82rem;
    padding-left: 0;
    padding-right: 0;
}
.verification_code-form .verification_code-actions .btn {
    padding: 0;
    width: 2.95rem;
}
.sign .btn {
    position: absolute;
    z-index: 2;
    left: 50%;
    margin-left: -2rem;
    bottom: 2.09rem;
}
</style>
