<template>
    <div>
        <div class="container unwind-wallet" id="container">
            <div class="account-index-wrapper">
                <div class="unwind-info">
                    <p>您正在操作解约钱包账户</p>
                    <div>为保证您的账户安全，请输入您的身份证后6位。</div>
                    <ul>
                        <li>身份证号验证</li>
                        <li>短信验证</li>
                    </ul>
                </div>
                <div class="unwind-agreement">
                    <div class="agreement-info">
                        <label class="is-agreement">
                            <p :class="{ xy_false: isXy, xy_true: isYx }" @click="checkbox"></p>
                        </label>
                        <div class="agreement-link">我已了解并同意以下信息：</div>
                    </div>
                    <div class="agreement-dets">
                        如您解约成功后，无法在江苏移动掌厅内，查看钱包账户信息；您可至对应的账户所在的银行，查看您的账户信息，或者您可以在解约完成后，点击开通钱包账户，再次签约您的所有账户
                    </div>
                    <button class="unwind-btn actunwind-btn" v-if="isYx" @click="startjy">开始解约</button>
                    <button class="unwind-btn" v-else>开始解约</button>
                </div>
            </div>
            <!--解约提醒-->
            <div class="unwind-remind" v-if="remindjy">
                <div class="filter"></div>
                <div class="unwind-reconfirm">
                    <p class="remind-title">解约提醒</p>
                    <div class="remind-advice">
                        <p>您当前钱包余额大于0，</p>
                        <p>建议您先提现所有的零钱至银行卡后，</p>
                        <p>再次尝试解约。</p>
                        <div class="remind-option">
                            <button class="remind-unwind" @click="gojy">跳过 直接解约</button>
                            <button class="remind-tixian" @click="gotixian">去提现</button>
                        </div>
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
    name: 'walletUnwind',
    components: {
        mdHeader
    },
    data() {
        return {
            isXy: true,
            isYx: false,
            remindjy: false,
            logmobile: '',
            balance: '',
            acctyp: ''
        };
    },
    mounted() {
        this.acctyp = this.$route.query.acctyp || '';
        document.body.style.backgroundColor = '#f5f5f5';
    },
    created() {
        this.logmobile = store2.default.get('usrmob');
    },
    methods: {
        checkbox() {
            this.isYx = !this.isYx;
        },
        startjy() {
            if (this.acctyp) {
                this.gojy();
            } else {
                this.getBalance();
            }
        },
        // 查询钱包余额
        getBalance() {
            const that = this;
            api.queryBalance({
                mobileNo: this.logmobile
            })
                .then((data) => {
                    console.log(data);
                    this.balance = data.accountBalance;
                    if (data.accountBalance > 0) {
                        this.remindjy = true;
                    } else if (data.accountBalance === '0.00') {
                        that.gojy();
                    }
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
        // 去解约
        gojy() {
            this.$router.push(
                {
                    name: 'walletUnwdValiID',
                    query: {
                        acctyp: this.acctyp
                    }
                }
            );
        },
        // 去提现
        gotixian() {
            this.$router.push(
                {
                    name: 'changeWithdrawal',
                    query: {
                        amounts: this.balance
                    }
                }
            );
        }
    }
};
</script>

<style scoped lang="less">
.unwind-info{
    p{
        padding-top:.44rem;
        margin-bottom:.2rem;
        font-size:.36rem;
        font-weight:600;
        color:#333;
        margin-left:.3rem;
    }
    div{
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
            border-bottom:1px solid #979797;
            font-size:.32rem;
            color:#333;
            margin:auto;
            line-height:1.04rem;
        }
    }
}
.unwind-agreement{
  width:100%;
  height:3.77rem;
  background:#fff;
  position:fixed;
  bottom:0;
  left:0;
  text-align:center;
  .agreement-info{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding-right: 0.2rem;
      margin-top: 0.2rem;
        .xy_false {
            width: 0.31rem;
            height: 0.31rem;
            background: url('../../assets/images/check-off.png') no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
            border-radius: 50%;
        }
        .xy_true {
            width: 0.31rem;
            height: 0.31rem;
            background: url('../../assets/images/check-on.png') no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
            border-radius: 50%;
        }
        .is-agreement {
            display: block;
            margin-left: 0.3rem;
        }
        .is-agreement p {
            font-size: 0.24rem;
            color: #666;
        }
  }
  .agreement-dets{
    width:6rem;
    margin:.1rem auto .3rem;
    color:#999;
    font-size:.24rem;
    text-align:left;
  }
}
.unwind-btn{
  width: 6.9rem;
  height: .9rem;
  opacity: 1;
  background: #8ec4f6;
  border-radius: .1rem;
  color:#fff;
  font-size:.36rem;
  pointer-events:none;
  border:none;
}
.actunwind-btn{
  background: #0195ff;
  pointer-events:inherit;
}
.unwind-remind{
    width:100%;
    .filter{
        width:100%;
        height:100%;
        background:rgba(0,0,0,.6);
        position:fixed;
        top:0;
        left:0;
    }
    .unwind-reconfirm{
        width:6.8rem;
        height:4.2rem;
        background:#fff;
        border-radius:.1rem;
        margin-left:.35rem;
        position:absolute;
        top:30%;
        .remind-title{
            width:6rem;
            height:1rem;
            border-bottom:1px solid #e6e6e6;
            margin-left:.4rem;
            text-align:center;
            line-height:1rem;
            color:#333;
            font-size:.38rem;
        }
        .remind-advice{
            margin-top:.22rem;
            p{
                font-size:.28rem;
                color:#333;
                text-align:center;
                line-height:1.6;
            }
            .remind-option{
                margin-top:.3rem;
            }
            button{
                width:2.8rem;
                height:.75rem;
                border:1px solid #0195ff;
                border-radius:.08rem;
                background:none;
                margin-left:.4rem;
                font-size:.32rem;
            }
            .remind-unwind{
                color:#0195ff;
                font-weight:500;
            }
            .remind-tixian{
                color:#fff;
                font-weight:500;
                background:#0195ff;
            }
        }
    }
}
</style>
