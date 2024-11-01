<template>
  <div class="myMoney_container">
    <div class="top_bg">
      <p>余额（元）</p>
      <p class="money">{{b2cData.accountBalance}}</p>
      <p class='WithdrawalMoney'>可提现金额：¥ {{b2cData.settleBalance || '0.00'}}</p>
      <div class="triangle"></div>
      <div class="type_wrap">
        <div class="type_wrap_item" v-for="(item, index) in bannerList" :key="index" @click="goUrl(item)">
          <img :src="item.icon" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>

      <div class="swiperList" v-if="false" >
        <md-swiper
          @before-change="beforeChange"
          @after-change="afterChange"
          ref="swiper"
          :is-prevent="false"
          :useNative-driver="false"
        >
          <md-swiper-item :key="$index" v-for="(item, $index) in simple">
            <div class="banner-item" :style="{ background: `${item.color}` }">
              {{ item.text }}
            </div>
          </md-swiper-item>
        </md-swiper>
      </div>
      <div class="bank_wrap" >
        <p class="title">银行卡管理</p>
        <template v-if="b2cData.bankCardList.length != 0">
        <div class="bank_list" v-for="(item,index) in b2cData.bankCardList" :key="index" @click="changeBankStatus(item)">
          <div class="bg_zz"></div>
          <div class="bg_zz" :style="{'background':item.backColor}"></div>
          <div class="icon_wrap" >
            <div class="top">
              <img class="top_icon" :src="item.iconPath" alt="" srcset="">
              <!-- <span>{{item.bankName}}</span> -->
              <img class="right_icon" :src="item.iconPath" alt="" srcset="">
            </div>
          </div>
          <div class="text_wrap">
            <p>{{item.bankName}} <span>{{item.bankCardType}}</span> </p>
            <p>{{item.bankCardNo}}</p>
          </div>
        </div>
        </template>
        <template v-if="moreFlag">
          <div class="bank_list" v-for="(item,index) in b2cData.bankMoreList" :key="index" @click="changeBankStatus(item)">
            <div class="bg_zz"></div>
            <div class="bg_zz" :style="{'background':item.backColor}"></div>
            <div class="icon_wrap" >
              <div class="top">
                <img class="top_icon" :src="item.iconPath" alt="" srcset="">
                <span>{{item.bankName}}</span>
                <img class="right_icon" :src="item.iconPath" alt="" srcset="">
              </div>
            </div>
            <div class="text_wrap">
              <p>{{item.bankName}} <span>{{item.bankCardType}}</span> </p>
              <p>{{item.bankCardNo}}</p>
            </div>
          </div>
        </template>
      </div>
        <div class="move_btn" v-if="b2cData.bankMoreList.length != 0">
          <div v-if="!moreFlag" @click="moreFlag = true">
          查看更多<md-icon name="arrow-down" size="sm"></md-icon>
          </div>
           <div v-else @click="moreFlag = false">
          收起<md-icon name="arrow-up" size="sm"></md-icon>
          </div>
        </div>
        <div class="blank_btn"  @click="bindCard">
          <!-- <div class="jb_class"></div> -->
          <img src="../../assets/images/B2Cwallet/addBank_btn.png" alt="" srcset="">
        </div>
    </div>
      <!-- 删除银联绑定的银行卡 -->
        <md-popup
            v-model="defaultDeleteShow"
            class="defaultAnddelete"
            position="bottom"
        >
            <div class="pouContain">
                <div
                    id="E01"
                    class="setDefault"
                    style="text-align: center"
                    @click="orbabay"
                >
                    解除绑定
                </div>
                <div
                    id="E02"
                    class="deleteBank"
                    style="text-align: center"
                    @click="noUnBindCard"
                >
                    取消
                </div>
            </div>
        </md-popup>
          <!-- 删除银行卡输入手机号 -->
        <md-dialog
            v-model="msgDialog.open"
            :btns="msgDialog.btns"
            :closable="false"
            class="msgDialog"
            title="请输入短信验证码"
        >
            <p class="msgTips">已发送至当前登录手机号码</p>
            <md-codebox v-model="msgCode" :mask="false" :maxlength="4" system />
            <button
                :disabled="attcode"
                class="errorTips"
                @click="getTimeOutShow"
            >
                {{ errorTips }}
            </button>
        </md-dialog>
        <md-dialog
          :closable="false"
          v-model="basicDialog.open"
          :btns="basicDialog.btns"
        >
          <div style="text-align: center;line-height:1.5">您当前未绑定可提现的借记卡请先绑定银行卡～</div>
        </md-dialog>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from 'mand-mobile';
import simple from 'mand-mobile/components/swiper/demo/data/simple';
import api from '@/common/apiUrls';

export default {
    components: {
        [Swiper.name]: Swiper,
        [SwiperItem.name]: SwiperItem
    },
    data() {
        return {
            moreFlag: false,
            defaultDeleteShow: false, // 设置卡删除弹窗
            msgCode: '',
            attcode: true,
            errorTips: '60',
            sec: 61,
            msgDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        id: 'E04',
                        handler: () => {
                            this.msgDialog.open = false;
                            this.msgCode = '';
                        }
                    },
                    {
                        text: '提交',
                        id: 'E03',
                        handler: () => {
                            this.commitDeleteBank();
                        }
                    }
                ]
            },
            simple,
            bannerList: [
                {
                    id: '1',
                    name: '充值',
                    icon: require('../../assets/images/B2Cwallet/cz_icon.png'),
                    url: 'https://p.10086.cn/waph5/balance/wapRechage',
                    type: '04'
                },
                {
                    id: '2',
                    name: '提现',
                    icon: require('../../assets/images/B2Cwallet/tx_icon.png'),
                    url: 'https://p.10086.cn/waph5/balance/withdrawal',
                    type: '05'
                },
                {
                    id: '3',
                    name: '转账',
                    icon: require('../../assets/images/B2Cwallet/zz_icon.png'),
                    url: 'https://p.10086.cn/waph5/transfer/transferIndex',
                    type: '03'
                }, {
                    id: '4',
                    name: '明细',
                    icon: require('../../assets/images/B2Cwallet/mx_icon.png'),
                    url: 'https://p.10086.cn/waph5/transfer/transferIndex',
                    type: ''
                }
            ],
            b2cData: {
                accountBalance: '0.00',
                bankCardList: [],
                bankMoreList: [],
                foreignToken: '',
                settleBalance: '',
                userNo: ''
            },
            bankData: {},
            userType: '', // P等于已实名
            basicDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        handler: () => {
                            this.basicDialog.open = false;
                        }
                    },
                    {
                        text: '确定',
                        handler: this.bindCard
                    }
                ]
            }
        };
    },
    mounted() {
        this.getInfoList();
        console.log(this, '----');
    },
    methods: {
        changeBankStatus(item) {
            this.bankData = item;
            this.defaultDeleteShow = true;
        },
        // 解除绑定
        orbabay() {
            this.defaultDeleteShow = false;
            this.msgDialog.open = true;

            // 调用倒计时方法
            this.getTimeOutShow();
        },
        // 提交删除银行卡
        commitDeleteBank() {
            this.$store.commit('LOADING', true);
            api.B2CWallet
                .unbind({
                    smsJrn: this.smsJrn, // 短信流水[上一接口返回]
                    smsCode: this.msgCode, // 短信验证码
                    agreementNo: this.bankData.agreementNo
                    // accFlg: this.whichCard.accFlg // 绑卡列表返回
                })
                .then(() => {
                    this.$store.commit('LOADING', false);
                    // this.queryBankList("new");
                    this.msgDialog.open = false;
                    this.$toast.info('银行卡删除成功', 3000, true);
                    this.getInfoList();
                })
                .catch((data) => {
                    this.$store.commit('LOADING', false);
                    this.$toast.info(
                        data.msgInfo || '快看看，出错啦',
                        3000,
                        true
                    );
                });
        },
        // 重新获取文案变倒计时效果再次发送验证码
        getTimeOutShow() {
            if (this.errorTips === '重新获取' || this.errorTips === '60') {
                // 调用倒计时方法
                this.timesContral();
                this.unBindsms(); // 下发验证码接口
            }
        },
        timesContral() {
            this.attcode = true;
            const timer = setInterval(() => {
                this.sec = this.sec - 1;
                this.errorTips = `${this.sec} s`;
                if (this.sec === 0) {
                    clearInterval(timer);
                    this.errorTips = '重新获取';
                    this.attcode = false;
                    this.sec = 61;
                }
            }, 1000);
        },
        // 解绑下发验证码smsJrn
        unBindsms() {
            api.B2CWallet
                .unbindSms(this.bankData)
                .then((res) => {
                    this.smsJrn = res.smsJrn; // 返回短信流水
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        // 取消解除绑定卡片
        noUnBindCard() {
            this.defaultDeleteShow = false;
        },
        goUrl(item) {
            if (item.id === '1') { // 充值
                this.$router.push({
                    name: 'pocketRecharge'
                });
            } else if (item.id === '2') { // 提现
                const isDebitCard = this.b2cData.bankCardList.filter(item => item.bankCardType === '借记卡');
                if (isDebitCard.length === 0) {
                    this.basicDialog.open = true;
                    return;
                }
                this.$router.push({
                    name: 'pocketWithdrawal'
                });
            } else if (item.id === '3') { // 转账
                this.$router.push({
                    name: 'pocketTransferAccounts',
                    query: {
                        userNo: this.b2cData.userNo
                    }
                });
            } else if (item.id === '4') { // 明细
                this.$router.push({
                    name: 'pocketDetail'
                });
            }
        },
        // 获取和包信息
        getInfoList() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.infoList().then((res) => {
                this.$store.commit('LOADING', false);
                this.b2cStatus = res.state;
                const list = [];
                const morelist = [];
                if (res.bankCardList) {
                    res.bankCardList.forEach((element, index) => {
                        if (index <= 3) {
                            list.push(element);
                        } else {
                            morelist.push(element);
                        }
                    });
                }
                this.b2cData.bankCardList = list;
                this.b2cData.bankMoreList = morelist;
                this.b2cData.accountBalance = res.accountBalance || '0.00';
                this.b2cData.settleBalance = res.settleBalance || '0.00';
                this.b2cData.userNo = res.userNo || '';
            }).catch((err) => {
                this.$store.commit('LOADING', false);
                this.b2cStatus = err.state;
            });

            // 查询用户是否实名
            api.B2CWallet.certificationInfo().then((res) => {
                this.userType = res.userType;
            });
        },
        bindCard() {
            this.$store.commit('LOADING', true);
            const RETURN_URL = window.location.href;
            if (this.userType == 'P') {
                api.B2CWallet.tokenApply({ tokenType: '01' }).then((res) => {
                    this.$store.commit('LOADING', false);
                    const url = `https://www.cmpay.com/front-msa/bind-bank-card/quickBind?RETURN_FLG=5&RETURN_URL=${RETURN_URL}&typeId=10010&ssoToken=${res.foreignToken}&SUBMIT_TYPE=ajax&HEADER_FLG=1`;
                    window.location.href = url;
                }).catch((err) => {
                    this.$store.commit('LOADING', false);
                });
            } else {
                this.$store.commit('LOADING', false);
                this.$router.push({
                    name: 'accountName'
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
.myMoney_container {
  background: #f7f8fa;
  height: 100vh;
  overflow-y: auto;
  font-size: 32px;
  .top_bg {
    background: url("../../assets/images/B2Cwallet/money_bg.png") no-repeat;
    background-size: 100%;
    height: 646px;
    text-align: center;
    padding: 68px 24px 33px;
     color: #fff;
    .money {
      font-weight: 700;
      font-size: 88px;
      margin-top: 22px;

    }
    .WithdrawalMoney{
      font-size: 28px;
      margin-top: 10px;
    }
    .triangle {
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 25px solid #fff;
      margin: auto;
      margin-bottom: -3px;
      margin-top: 25px;
    }
    .type_wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      color: #1f1f1f;
      padding: 15px 20px;
      box-shadow: 1px 1px 6px 0 #dfe8f0;
      border-radius: 30px;
      flex-wrap: wrap;
      .type_wrap_item {
        display: flex;
        align-items: center;
        width: 50%;
        border-bottom: 1px solid #EEEEEE;
        border-right: 1px solid #EEEEEE;
        padding: 0.15rem 0 0.15rem 0.4rem;
        box-sizing: border-box;
        &:nth-child(2n){
           border-right: 0;
        }
        &:nth-child(3){
           border-bottom: 0;
        }
         &:nth-child(4){
           border-bottom: 0;
        }
        img {
          width: 41px;
          height: 41px;
          margin-right: 20px;
        }
      }
    }
    .swiperList {
      height: 192px;
      margin: 35px 0;
      .banner-item {
        border-radius: 20px;
        height: 192px;
      }
    }
    .bank_wrap{
      .title{
        margin-top: 36px;
      }
      p{
        font-weight: 500;
        font-size: 32px;
        color: #1E1E1E;
        text-align: left;
      }
      .bank_list{
        display: flex;
        padding: 18px 20px 27px;
        background: #F2F6FB;
        margin-top: 24px;
        align-items: center;
        position: relative;
        border-radius: 10px;
        box-shadow: 2px 3px 8px 0 #e5e5e5;
        .icon_wrap{
          width: 190px;
          height: 120px;
          margin-right: 37px;
          text-align: left;
          padding: 20px 0 20px 20px;
          border-radius: 15px;
          color: #000;
          position: relative;
          box-sizing: border-box;
          .top{
            display: flex;
            align-items: center;
            .top_icon{
              width: 45px;
              height: 45px;
              margin-right: 10px;
            }
            span{
              font-size: 20px;
              color: #ffffff;
              font-weight: bold;
            }
          }
          .right_icon{
            position: absolute;
            width: 80px;
            height: 100px;
            right: 0;
            bottom: 0;
            opacity: 0.2;
          }
        }
        .bg_zz{
          position: absolute;
          width: 190px;
          height: 120px;
          background: linear-gradient(#bababa,#000000);
          opacity: 0.6;
          border-radius: 15px;
        }
        .text_wrap{
          p{
            &:nth-child(1){
              font-weight: 400;
              font-size: 30px;
              color: #4D4D4D;
              span{
                font-size: 24px;
              }
            }
            &:nth-child(2){
              font-weight: 400;
              font-size: 26px;
              color: #7C7C7C;
              margin-top: 10px;
            }
          }
        }
      }
    }
    .move_btn{
      color: #AEAEAE;
      font-size: 24px;
      padding: 27px 0 0;
      .md-icon{
        margin-left: 10px;
      }
    }
    .blank_btn{
      padding: 60px 0;
      position: relative;
      .jb_class{
        width: 206px;
        height: 50px;
        background: url('../../assets/images/B2Cwallet/2GB_icon.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 60px;
        right: 8px;
      }
      img{
        width: 686px;
        height: 86px;
      }
    }
  }
  /deep/ .defaultAnddelete {
    .pouTitle {
        border-radius: 36px 36px 0px 0px;
        background: #ffffff;
        height: 106px;
        width: 100%;
        font-size: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
        border: 1px solid #d5d5d5;

        img {
            margin-left: 30px;
            width: 36px;
            height: 36px;
        }

        span {
            width: 100%;
            text-align: center;
            font-weight: 500;
            color: #333333;
            font-size: 30px;
            font-weight: 400;
        }
    }

    .pouContain {
        // height: 265px;
        background: #ffffff;

        .setDefault {
            height: 96px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }

        .deleteBank {
            height: 96px;
            opacity: 1;
            background: #ffffff;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }
    }
}
}
.msgDialog {
    /deep/ .md-popup {
        .md-popup-box {
            .md-dialog-content {
                width: 640px;
                border-radius: 20px;

                .md-dialog-body {
                    color: #13252e;
                    font-size: 30px;
                    text-align: center;
                    padding: 0;
                    min-height: 430px;
                    display: unset;

                    .md-dialog-title {
                        font-size: 32px;
                        color: #333;
                        font-weight: 600;
                        margin: 60px 0 20px;
                    }

                    .msgTips {
                        font-size: 26px;
                        color: #999;
                    }

                    .errorTips {
                        background: #ffffff;
                        width: 200px;
                        margin-left: 220px;
                        margin-bottom: 20px;
                    }

                    .md-codebox-wrapper {
                        margin: 40px 0 30px;

                        .md-codebox {
                            .md-codebox-box:last-child {
                                margin-right: 0;
                            }

                            .md-codebox-box {
                                &:before {
                                    border-bottom: none;
                                }

                                flex: 0 1 80px;
                                width: 80px;
                                height: 80px;
                                // background: #F5F5F5;
                                border: 2px solid #0195ff !important;
                                border-radius: 8px;
                                margin-right: 15px;
                                color: #333;
                                font-size: 42px;
                                font-weight: 600;
                                margin-left: 0;
                                line-height: 80px !important;
                                // border: none;
                            }
                        }
                    }

                    .errorTips {
                        color: #0195ff;
                        font-size: 24px;
                        word-break: break-all;
                        height: 50px;
                    }
                }

                .md-dialog-actions {
                    .md-dialog-btn {
                        color: #0195ff;
                        width: 2.8rem;
                        opacity: 1;
                        background: #ffffff;
                        border: 0.02rem solid #0195ff;
                        border-radius: 0.08rem;
                        font-weight: 500;
                        height: 0.75rem;
                        margin-top: 0.2rem;
                        margin-right: 30px;
                        margin-left: 30px;
                        // &.disabled{
                        //     color: #0195ff!important;
                        // }
                    }

                    .md-dialog-btn:last-child {
                        // color: #0195ff;
                        width: 200px;
                        height: 0.75rem;
                        opacity: 1;
                        background: #0195ff;
                        border-radius: 8px;
                        margin-top: 0.2rem;
                        margin-bottom: 40px;
                        margin-right: 30px;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}
</style>
