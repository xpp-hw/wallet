<template>
  <div>
    <div v-if="isShow" class="allow_container">
      <div class="allow_box">
        <p class="allow_title1">和包 <span>申请</span></p>
        <p class="allow_title2">获取以下信息为您提供服务</p>
        <p class="allow_text">
          您的姓名、身份证信息、手机号码、入网时间用于注册授权和包账户
        </p>
        <div class="xieyi">
            <div :class="isGou ? 'check' : 'checkOff'" @click="checkClick"></div>
          <div>
            <p class="tips_4">
              我已阅读并同意
              <a href="javascript: ;" @click.prevent="goXieyi(1)"
                >《和包授权协议》</a
              >
              <a href="javascript: ;" @click.prevent="goXieyi(4)"
                >《和包支付业务用户服务协议》</a>
               <a href="javascript: ;" @click.prevent="goXieyi(3)"
                >《移动钱包业务受理协议》</a>
              <a href="javascript: ;" @click.prevent="goXieyi(2)"
                >《和包隐私权政策》</a>
            </p>
          </div>
        </div>
        <div class="checkbox_btns">
          <p id="A02" class="btn1" @click="confuse">拒绝</p>
          <p id="A01" v-if="isGou" class="btn2" @click="confirm">同意</p>
          <p id="A01" v-else class="btn2" style="background: #afafaf;">同意</p>
        </div>
      </div>
    </div>
    <div class="failWrap" v-if="failFlag">
      <div class="wrap">
        <div class="title">温馨提示</div>
        <div class="text">授权失败，{{failMsg}}</div>
        <span class="btn" @click="confuse">知道了</span>
      </div>
    </div>
    <hebaoAgreement v-if="xieyiFlag" @isFalseSign='isFalseSign' :siver='siver' :showList='showList'></hebaoAgreement>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import {
    Agree, Icon, ImageReader, Tag, Toast
} from 'mand-mobile';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import hebaoAgreement from '@/components/hebaoAgreement';

export default {
    name: 'jsyhApplyfor',
    components: {
        [Agree.name]: Agree,
        [Icon.name]: Icon,
        [ImageReader.name]: ImageReader,
        [Tag.name]: Tag,
        hebaoAgreement
    },
    data() {
        return {
            isGou: false,
            bcmShow: true,
            bocmFlg: false,
            showAgreement: false, // 是否显示协议内容
            hasRead: false, // 是否已阅读过
            clickRadio: false,
            isShow: false, // 是否显示授权页
            atyNo: '',
            phone: '',
            queryData: {},
            failFlag: false,
            failMsg: '',
            xieyiFlag: false,
            siver: 1,
            dealChn: '',
            backUrl: '',
            ZFbackID: '',
            showList: ['1', '2', '3', '4'],
            accessSource: '00'
        };
    },
    mounted() {
        this.isShow = true;
        this.dealChn = this.$route.query.dealChn;
        this.ZFbackID = this.$route.query.ZFbackID || '';
        this.getBackUrl({
            dealChn: this.dealChn
        });
        if (this.$client.LEADEON) {
            this.accessSource = '01';
        } else if (this.$client.JSMCC) {
            this.accessSource = '02';
        } else {
            this.accessSource = '00';
        }
    },
    methods: {
        // 返回地址
        getBackUrl(data) {
            api.newBank
                .backUrl(data)
                .then((res) => {
                    if (res.backUrl) {
                        this.backUrl = res.backUrl;
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        goXieyi(val) {
            this.siver = val;
            store2.default.set('signxieyi', false);
            this.xieyiFlag = true;
        },
        isFalseSign(val) {
            this.xieyiFlag = val;
            this.isGou = true;
        },
        // 新增授权信息
        addActivity() {
            this.$store.commit('LOADING', true);
            let recordUrl = window.location.href;
            let recordIndex;
            if (recordUrl.indexOf('?') > -1) {
                recordIndex = recordUrl.indexOf('?');
            } else {
                recordIndex = recordUrl.length;
            }
            recordUrl = recordUrl.slice(0, recordIndex);
            api.B2CWallet.registerAndAuth({
                parentChannel: this.$route.query.parchn || null,
                childChannel: this.$route.query.gytype || null,
                pageUrl: recordUrl || '',
                accessSource: this.accessSource
            })
                .then((res) => {
                    this.$store.commit('LOADING', false);
                    if (this.backUrl && this.ZFbackID) {
                        this.$toast.info('注册成功，正在返回页面！');
                        setTimeout(() => {
                            window.location.href = `${this.backUrl}?ORD_NO=${this.ZFbackID}`;
                        }, 2000);
                    } else if (this.backUrl) {
                        this.$toast.info('注册成功，正在返回页面！');
                        setTimeout(() => {
                            window.location.href = this.backUrl;
                        }, 2000);
                    } else {
                        this.$toast.info('注册成功，正在进入零钱详情页！');
                        setTimeout(() => {
                            this.$router.push({
                                name: 'myMoney'
                            });
                        }, 2000);
                    }
                })
                .catch((err) => {
                    this.$store.commit('LOADING', false);
                    this.failMsg = err.msgInfo;
                    this.failFlag = true;
                    this.isShow = false;
                });
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
        },
        checkClick() {
            if (!this.isGou) {
                this.goXieyi(1);
            }
            this.isGou = !this.isGou;
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
  background: #555;
  overflow: hidden;
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
}

.allow_box > p,
.allow_box > div {
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
  margin-bottom: 0.4rem;
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
  margin-top: 50px;
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
  .xieyi {
    display: flex;
    margin-top: 10px;
    .checkOff {
      width: 60px;
      height: 60px;
      background: url("../../assets/images/B2Cwallet/check-off.png") no-repeat;
      background-size: 100%;
      margin-right: 20px;
    }

    .check {
      width: 60px;
      height: 60px;
      background: url("../../assets/images/B2Cwallet/check-on.png") no-repeat;
      background-size: 100%;
      margin-right: 20px;
    }

    .tips_4 {
      color: #020202;
      font-size: 24px;
      line-height: 34px;
      a{
        color: #238FF2;
      }
    }
  }
    .failWrap{
      position: fixed;
      height: 100vh;
      width: 100%;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.36);
      .wrap{
        width: 70%;
        padding: 40px 60px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 20px;
        text-align: center;
        .title{
          font-size: 36px;
          font-weight: bold;
        }
        .text{
          margin: 30px 0 50px;
          text-align: left;
          font-size: 30px;
        }
        .btn{
          font-size: 30px;
          padding: 10px 40px;
          background: #008bff;
          border-radius: 10px;
          color: #fff;
        }
      }
    }
</style>
