<template>
    <div class="contain">
       <p class="top title">账号挂接</p>
       <div class="top">
         <span>挂接账号</span>
         <span>{{phone}}</span>
       </div>

       <p class="tips">此手机号码为您当前登录手机号，挂接成功后，即可在掌厅查看您的数字人民币账户</p>
       <div class="btn" @click="getMsm">获取验证码</div>
      <md-popup v-model="checkUserPopup" :mask-closable="false">
        <div class="checkUserPopup">
          <div class="popupTitle">您正在操作数字人民币账户挂接</div>
          <ValidationObserver ref="form" slot="{ invalid }">
            <div class="wapField">
              <div class="phoneNumber">
                <div class="userMbl">手机号:&nbsp;&nbsp;&nbsp;{{ phone }}</div>
                <button
                  class="getCode"
                  slot="right"
                  :disabled="attcode"
                  @click="codeClick"
                >
                  {{ smsText }}
                </button>
              </div>
              <InputWithValidation
                class="yard"
                type="digit"
                title="验证码"
                placeholder="请输入验证码"
                name="验证码"
                rules="required"
                clearable
                maxlength="6"
                @change="watchNo"
                v-model="verifyCode"
                ref="verifyCode"
              >
              </InputWithValidation>
              <div class="btns">
                <md-button class="cancel" id="A03" @click="cancleChange"
                  >取消</md-button
                >
                <md-button
                  class="determine"
                  id="A04"
                  :class="btnconfirm ? 'unbtn' : ''"
                  @click="submitData"
                  >确定</md-button
                >
              </div>
            </div>
          </ValidationObserver>
        </div>
      </md-popup>
    </div>
</template>

<script>
import InputWithValidation from '@/components/InputWithValidation';
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            phone: this.$route.query.phone,
            checkUserPopup: false,
            attcode: false,
            smsText: '获取验证码',
            sec: 60,
            verifyCode: '', // 短信验证码
            smsSerial: '', // 短信流水号
            btnconfirm: true,
            isSecond: false
        };
    },
    components: {
        InputWithValidation
    },
    mounted() {
        this.phone = this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.isSecond = this.$route.query.isSecond === '00';
    },
    methods: {
        getMsm() {
            // 获取验证码
            this.checkUserPopup = true;
            // 发送验证码
            this.sendMsg();
        },
        codeClick() {
            if (!this.timer) {
                this.attcode = true;
                this.timesContral();
                this.timer = setInterval(this.timesContral, 1000);
            }
        },
        timesContral() {
            if (this.sec > 0 && this.sec <= 60) {
                this.sec -= 1;
                if (this.sec !== 0) {
                    this.attcode = true;
                    this.smsText = `${this.sec} s`;
                } else {
                    clearInterval(this.timer);
                    this.attcode = false;
                    this.smsText = '获取验证码';
                    this.sec = 60;
                    this.timer = null;
                }
            }
        },
        watchNo() {
            if (this.verifyCode.length === 6) {
                this.btnconfirm = false;
            } else {
                this.btnconfirm = true;
            }
        },
        cancleChange() {
            this.checkUserPopup = false;
            this.verifyCode = '';
        },
        submitData() {
            this.isDisable = true;
            this.btnconfirm = true;
            let isSucc = '';
            const confirmName = this.isSecond ? 'secondAgreeConfirm' : 'agreeConfirm';
            // 校验验证码，挂接接口
            api.hookUp[confirmName]({
                smsSerial: this.smsSerial, // （短信流水号）
                verifyCode: this.verifyCode // （短信验证码）
            }).then((res) => {
                if (res.data) {
                    console.log(res.data.errorCode);
                    const code = res.data.errorCode;
                    this.$toast.info(res.data.errorMsg);
                    if (code !== '9011' && code !== '9043') {
                        // 挂接失败
                        isSucc = '00';
                        this.$router.push({
                            name: 'hookResult',
                            query: {
                                isSucc,
                                reason: res.data.errorMsg
                            }
                        });
                    }
                } else {
                    // 挂接成功;
                    isSucc = '01';
                    this.$router.push({
                        name: 'hookResult',
                        query: {
                            isSucc
                        }
                    });
                }
            }).catch((err) => {
                this.$toast.info(err.msgInfo);
                // 挂接失败;
                isSucc = '00';
                this.$router.push({
                    name: 'hookResult',
                    query: {
                        isSucc,
                        reason: err.msgInfo
                    }
                });
            });
        },
        // 发送验证码接口
        sendMsg() {
            const reqName = this.isSecond ? 'secondAgreeReq' : 'agreeReq';
            api.hookUp[reqName]({}).then((res) => {
                if (res.data && res.data.errorCode && res.data.errorMsg) {
                    this.$toast.info(res.data.errorMsg);
                    return;
                }
                this.codeClick(); // 发送验证码成功，倒计时
                this.smsSerial = res.data.smsSerial;
                this.$toast.info('已发送验证码', 2000, true);
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.contain{
  width: 100%;
  height: 100vh;
  background: #eee;
  .top.title{
    font-size: 0.4rem;
    line-height: 1.8rem;
    color: #333;
  }
  .top{
    background: #ffffff;
    padding: 0 0.3rem;
    font-weight: 600;
    line-height: 1rem;
    font-size: 0.32rem;
    color: #555;
    span:first-of-type{
      margin-right: 0.6rem;
    }
  }
  .tips{
    font-weight: 600;
    padding: 0.3rem;
    font-size: 0.29rem;
    line-height: 0.5rem;
    color: #555;
    text-align: left;
  }
  .btn{
    width: 4rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.34rem;
    text-align: center;
    background: #0195ff;
    border-radius: 10px;
    color: #ffffff;
    position: fixed;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
  }
}

.checkUserPopup {
    width: 640px;
    opacity: 1;
    background: #ffffff;
    border-radius: 8px;
    .popupTitle {
      height: 90px;
      font-size: 34px;
      font-weight: 500;
      text-align: center;
      color: #333333;
      line-height: 90px;
    }
    .wapField {
      padding:0 25px 25px;
      .phoneNumber {
        height: 80px;
        display: flex;
        justify-content: space-between;
        padding-top: 25px;
        padding-right: 20px;
        border-top: 2px solid #f5f5f5;
        border-bottom: 2px solid #f5f5f5;
        .userMbl {
          width: 350px;
          height: 54px;
          opacity: 1;
          font-size: 30px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 54px;
        }
        .getCode {
          text-align: center;
          font-size: 28px;
          font-weight: 400;
          color: #667afa;
          background: #ffffff;
          border: 0;
          width: 150px;
          height: 54px;
          opacity: 1;
          border: 1px solid #238ff2;
          border-radius: 9px;
        }
      }
      .btns {
        margin-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        display: flex;
        justify-content: space-between;
        .cancel {
          width: 242px;
          height: 75px;
          opacity: 1;
          border: 1px solid #0195ff;
          border-radius: 10px;
          background: #ffffff;
          font-size: 32px;
          font-weight: 400;
          text-align: left;
          color: #0195ff;
          line-height: 75px;
          letter-spacing: -1px;
        }
        .determine {
          width: 242px;
          height: 75px;
          font-size: 32px;
        }
      }
      .unbtn{
          background: #8ec4f6;
          pointer-events:none;
      }
    }
  }
</style>
