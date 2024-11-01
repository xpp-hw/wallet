<template>
    <div class="wrap">
     <div class="bigpic">
      <img src="../../assets/images/bigEarnestMoney/bigpic.png" alt="">
      <p class="text">尊敬的{{tel}}用户，您好</p>
      <div class="rules" @click="gotopage('/earnestMoneyRules')">
          <img src="../../assets/images/bigEarnestMoney/rules.png" alt="">
      </div>
      <div :class="bgbtn" @click="changeShow" v-if="this.state==='解冻失败' || this.state==='办理中' ">
        <p>{{state}}</p>
      </div>
      <div class="bgbtn" @click="changeShow" v-else>
        <img :src='bgbtn' alt="">
      </div>
     </div>
     <div class="content">
      <div class="senbackground">
       <p class="freeze"> <span class="text1">冻结6个月</span> <span class="text2">15000元原路返还</span></p>
       <div class="save">
          <img src="../../assets/images/bigEarnestMoney/content.png" alt="">
          <span class="mount_text">6个月</span>
       </div>
       <div class="info">
         <p class="textbox">每月话费充值进：</p>
         <p class="tel">{{phone}}</p>
       </div>
       <div class="example">
       <div class="examplebox">
          <p class="e_text">小帅转入<span>15000元</span>保证金，冻结<span>6个月,</span>并承诺在网6个月,
            即可<span>每月获赠40元话费</span>且直充到账, <span>总计240元</span>话费。
            6个月后保证金全额返还。
          </p>
       </div>
       </div>
      </div>
    </div>
    <div class="money" @click="gotopage('/earnestMoneyDetail')">
        <img src="../../assets/images/bigEarnestMoney/mymoney.png" alt="">
   </div>
     <div class="footer">
      <div class="stepbox">
        <div class="step_text">
          <p>立即办理</p>
          <p>转入<span>15000元</span></p>
          <p>每月<span>返40元</span>话费</p>
          <p>满6个月<span>全额返还</span></p>
        </div>
      </div>
      <!-- 其他活动 -->
      <!-- <div class="activebox">
       <div class="title">
        <img src="../../assets/images/bigEarnestMoney/title.png" alt="">
       </div>
       <div class="flow" @click="toUrl(0)">
        <img src="../../assets/images/bigEarnestMoney/flow.png" alt="">
       </div>
       <div class="phone_cost" @click="toUrl(1)">
        <img src="../../assets//images/bigEarnestMoney/gethuafei.png" alt="">
       </div>
      </div> -->
     </div>
     <md-popup v-model="isPopupShow.bottom" position="bottom" :mask-closable="false">
      <div class="popup_bottom">
        <p class="p1">授权页面</p>
        <p class="p2">需要您授权以下信息给<span style="color: #05a3f8;">中国移动金融科技有限公司</span></p>
        <p class="p3">*手机号码信息</p>
        <div class="btnLine">
          <p class="cancel" @click="hidePopUp">取消</p>
          <p class="sure" @click="agree">同意</p>
        </div>
      </div>
    </md-popup>
     <div class="mask" v-if="Toast1">
        <div class="modal1">
            <h2 class="title">温馨提示</h2>
            <p class="text">{{cause}}</p>
            <p class="btn" @click="Toast1=false"></p>
        </div>
     </div>
     <!-- <div class="mask" v-if="Toast2">
        <div class="modal1">
            <h2 class="title">温馨提示</h2>
            <p class="text">机会只有一次哦～</p>
            <p class="btn" @click="Toast2=false"></p>
        </div>
     </div>
     <div class="mask" v-if="Toast3">
        <div class="modal2">
            <h2 class="title">温馨提示</h2>
            <p class="text">号码状态异常，请恢复后才可领取奖励～</p>
            <p class="btn" @click="Toast3=false"></p>
        </div>
     </div>
     <div class="mask" v-if="Toast4">
        <div class="modal3">
            <h2 class="title">请注意</h2>
            <p class="text">提前支取需<span>扣除已发放奖励～</span></p>
            <div class="btn_group">
              <p class="think" @click="Toast4=false"></p>
              <p class="continue">继续操作</p>
            </div>
        </div>
     </div> -->
     <div class="mask" v-if="Toast5">
        <div class="modal4">
            <h2 class="title">温馨提示</h2>
            <p class="text">{{cause}}</p>
            <div class="btn_group">
              <p class="cancel" @click="Toast5=false"></p>
              <p class="ok" @click="Toast5=false"></p>
            </div>
        </div>
     </div>
    </div>
</template>

<script>
import { Popup, PopupTitleBar, Toast } from 'mand-mobile';
import api from '@/common/apiUrls.js';
import * as store2 from '@/common/localstore';
import promptlybtn from '../../assets/images/bigEarnestMoney/promptlybtn.png';
import successbtn from '../../assets/images/bigEarnestMoney/successbtn.png';
import refundbtn from '../../assets/images/bigEarnestMoney/refundbtn.png';

export default {
    name: 'earnestMoneyIndex',
    components: {
        [Popup.name]: Popup,
        [PopupTitleBar.name]: PopupTitleBar
    },
    data() {
        return {
            title: '大额保证金',
            phone: '',
            tel: '',
            state: '立即办理',
            bgbtn: promptlybtn,
            isPopupShow: {},
            Toast1: false,
            // Toast2:false,
            // Toast3:false ,
            // Toast4:false,
            Toast5: false,
            cause: '',
            jumpurl: '',
            bindCard: [], // 和包绑卡列表
            getJKResult: 0,
            b2cStatus: '1' // 1.未注册 2.未授权 3.已授权且二次放号 4.未签约 5.已签约
        };
    },
    watch: {
        getJKResult: {
            handler(newValue) {
                if (newValue >= 2) {
                    this.$store.commit('LOADING', false);
                }
            },
            // 深度监测
            deep: true
        }
    },
    methods: {
        toUrl(num) {
            const url = [`https://fintech.12580life.com${process.env.BASE_URL}bindCardActive/hbActive?parchn=bkzfsll&gytype=001654`, `https://fintech.12580life.com${process.env.BASE_URL}saveMoneyIndex?parchn=sqb10dg&gytype=001654`];
            window.location.href = url[num];
        },
        // 获取和包信息
        getInfoList() {
            api.B2CWallet.infoList().then((res) => {
                this.b2cStatus = res.state;
                this.bindCard = res.bankCardList || [];
            }).catch((err) => {
                this.b2cStatus = err.state;
            }).finally(() => {
                this.getJKResult += 1;
            });
        },
        // 和包签约/注册
        hbCheck(type) {
            switch (type) {
                case '1':// 未注册
                    this.$router.push({ name: 'hbOpen', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}earnestMoney` } });
                    break;
                case '2':// 未授权
                    this.$router.push({ name: 'hbEmpower', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}earnestMoney` } });
                    break;
                case '3':// 已授权且二次放号
                    this.$router.push({ name: 'hbEmpower', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}earnestMoney` } });
                    break;
                case '4':// 未签约
                    this.$router.push({ path: '/B2CWallet/accountSigning', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}earnestMoney` } });
                    break;
                case '5':// 已授权
                    // 查询用户是否实名
                    this.$store.commit('LOADING', true);
                    api.B2CWallet.certificationInfo().then((res) => {
                        if (res.userType == 'P') {
                            if (this.bindCard.length === 0) {
                                this.$toast.info('您暂未绑定银行卡，正在跳转绑卡页面！');
                                setTimeout(() => {
                                    this.$router.push({ name: 'bindCard', query: { backUrl: `https://fintech.12580life.com${process.env.BASE_URL}earnestMoney` } });
                                }, 1500);
                            } else {
                                this.$set(this.isPopupShow, 'bottom', true);
                            }
                        } else {
                            this.$toast.info('您暂未实名，正在跳转实名页面！');
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'accountName',
                                    query: {
                                        backUrl: `https://fintech.12580life.com${process.env.BASE_URL}earnestMoney`
                                    }
                                });
                            }, 1500);
                        }
                    }).catch((err) => {
                    }).finally(() => {
                        this.$store.commit('LOADING', false);
                    });
                    break;
            }
        },

        // 按钮点击
        changeShow() {
            if (this.state === '立即办理') {
                this.showPopUp();
            } else if (this.state === '解冻失败') {
                this.Toast5 = true;
            } else if (this.state === '办理中') {
                window.location.href = this.jumpurl;
            }
        },
        gotopage(url) {
            this.$router.push(url);
        },
        showPopUp() {
            this.hbCheck(this.b2cStatus);
            // this.$set(this.isPopupShow, 'bottom', true);
        },
        hidePopUp() {
            this.$set(this.isPopupShow, 'bottom', false);
            this.checked = false;
        },
        // 下单
        agree() {
            this.hidePopUp();
            this.$store.commit('LOADING', true);
            api.Bzj.LargeMargin()
                .then(((data) => {
                    console.log(data);
                    if (data.msgCd === 'BUS00000') {
                        window.location.href = data.jumpurl;
                    } else {
                        this.Toast1 = true;
                        this.cause = data.msgInfo;
                    }
                }))
                .catch(() => {
                    Toast.info('网络开小差啦，请稍后重试');
                })
                .finally(() => {
                    this.$store.commit('LOADING', false);
                });
        },
        // 查询用户状态
        async orderStsQuery() {
            this.$store.commit('LOADING', true);
            try {
                const data = await api.Bzj.orderStsQuery({
                    mobileNo: this.phone
                });
                this.cause = data.errmsg;
                this.jumpurl = data.jumpurl;
                switch (data.ordsts) {
                    case '09':
                    case '07':
                    case '03':
                    case '06':
                    case '12':
                        this.bgbtn = promptlybtn;
                        this.state = '立即办理';
                        break;
                    case '05':
                        this.bgbtn = successbtn;
                        this.state = '办理成功';
                        break;
                    case '08':
                    case '11':
                        this.bgbtn = refundbtn;
                        this.state = '退单中';
                        break;
                    case '10':
                    case '13':
                        this.bgbtn = 'o_buttom';
                        this.state = '解冻失败';
                        break;
                    case '01':
                    case '02':
                    case '04':
                        this.bgbtn = 'g_buttom';
                        this.state = '办理中';
                        break;
                    default:
                        this.bgbtn = promptlybtn;
                        this.state = '立即办理';
                        break;
                }
            } catch (error) {

            } finally {
                this.getJKResult += 1;
            }
        }
    },
    created() {
        this.tel = store2.default.get('usrmob').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.phone = store2.default.get('usrmob');
        this.orderStsQuery();
        this.getInfoList();
    },
    mounted() {

    }
};
</script>

<style lang="less" scoped>
.wrap{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image:linear-gradient(to bottom, #FEF7EA,#FFE9D9);
    .bigpic{
      width: 100%;
      height: 820px;
      position: relative;
      box-sizing: border-box;
      margin-bottom: 9px;
      z-index: 10;
      img {
        width: 100%;
        height: 100%;
      }
      .text{
        position: absolute;
        left: 26px;
        top: 25px;
        font-weight: 500;
        height: 23px;
        font-size: 22px;
        color: #5D2306;
      }
      .rules{
        width: 48px;
        height: 102px;
        position: absolute;
        right: 0;
        top: 125px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .bgbtn{
        width: 422px;
        height: 162px;
        position: absolute;
        left: 180px;
        bottom: 4px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .o_buttom{
        width: 422px;
        height: 162px;
        position: absolute;
        left: 180px;
        bottom: 12px;
        background: url(../../assets/images/bigEarnestMoney/o_buttom.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 60px;
        font-weight: 900;
        color: #FFF;
      }
      .g_buttom{
        width: 422px;
        height: 162px;
        position: absolute;
        left: 180px;
        bottom: 12px;
        background: url(../../assets/images/bigEarnestMoney/g_buttom.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 60px;
        font-weight: 900;
        color: #FFF;
      }
    }
    .content{
      width: 100%;
      height: 808px;
      position: relative;
      left: 0;
      top: -210px;
      box-sizing: border-box;


      .senbackground{
        width: 701px;
        height: 520px;
        margin-left: 24px;
        position: relative;
        background: url(../../assets/images/bigEarnestMoney/senbackground.png)no-repeat ;
        background-size: cover;
        top: 113px;
        margin-top: 113px;
        .freeze{
          padding-top: 46px;
          margin-left: 279px;
          color: #b3540d;
          font-size: 26px;
          .text1{
            font-weight: 900;
            text-align: center;
            line-height: 26.04px;
          }
          .text2{
            font-weight: 500;
            text-align: center;
            line-height: 26.04px;
          }
        }
      .save{
        width: 665px;
        height: 253px;
        position: absolute;
        left: 19px;
        top: 108px;
        img{
        width: 100%;
        height: 100%;
        }
        .mount_text{
          position: absolute;
          top: 0.42rem;
          right: 0.5rem;
          font-size: .33rem;
          font-weight: 600;
          color: #a7421f;
        }
      }
      .info{
        width: 577px;
        height: 97px;
        position: absolute;
        left: 56px;
        top: 397px;
        display: flex;
        .textbox{
          font-weight: 700;
          width: 225px;
          line-height: 97px;
          font-size: 28px;
          color: #B3540D ;
          margin-right: 24px;
        }
        .tel{
          width: 328px;
          height: 97px;
          background-color: #F1F7F9;
          border-radius: 26px 26px 26px 26px;
          font-weight: 400;
          line-height: 97px;
          opacity: 0.4;
          font-size: 36px;
          text-align: center;
          color: #060606
        }
      }

      }
      .example{
        width: 701px;
        position: absolute;
        top: 547px;
        background-image: url(../../assets/images/bigEarnestMoney/example.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-bottom: 0.3rem;
        box-sizing: border-box;
        .examplebox{
          width: 664px;
          box-sizing: border-box;
          border-radius: 20px;
          background-color: #FDF2DCFF;
          margin-top: 101px;
          margin-left: 18px;
          overflow: hidden;
          padding: 20px 20px;
          .e_text{
            color: #444444;
            font-weight: 500;
            font-size: 26px;
            text-align: center;
            line-height: 2;
            box-sizing: border-box;
          span{
            color: #B73409;
          }
        }
        }

      }

    }
    .money{
      width: 142px;
      height: 142px;
      position: fixed;
      z-index: 100;
      right: 0;
      top: 820px;
      img{
       width: 100%;
       height: 100%;
 }
      }
    .footer{
      width: 100%;
      // height: 1072px;
      background: #ffe9d9;
      overflow: hidden;
      padding-left: 22px;
      box-sizing: border-box;

    .stepbox{
      width: 701px;
      height: 350px;
      background: url(../../assets/images/bigEarnestMoney/step.png) no-repeat ;
      background-size: cover;
      // margin-top: 184px;
      overflow: hidden;
      margin-bottom: 28px;
      .step_text{
        width: 648px;
        height: 70px;
        margin-top: 229px;
        margin-left: 31px;
        display: flex;
        justify-content: space-between;
        p{
          width: 138px;
          height: 68px;
          color: #a93f00ff;
          font-weight: 500;
          font-size: 27px;
          text-align: center;
          line-height: 40px;
          letter-spacing: 5px;
          span{
            color: #FF4200FF;
          }
        }
      }
    }
    .activebox{
      width: 702px;
      height: 456px;
      margin-bottom: 64px;
      img{
          width: 100%;
          height: 100%;
        }
      .title{
        width: 287px;
        height: 93px;
        margin: 0 auto;
        margin-bottom: 21px;

      }
      .flow{
        width: 702px;
        height: 160px;
        margin-bottom: 22px;
      }
      .phone_cost{
        width: 701px;
        height: 160px;
      }
    }
    }
    .mask{
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      .modal1{
        width: 596px;
        height: 651px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: url(../../assets/images/bigEarnestMoney/modal2.png) no-repeat;
        background-size: 100% 100%;
        .title{
          margin-top: 182px;
          margin-bottom: 40px;
          font-weight: 500;
          font-size: 48px;
          text-align: center;
          color: #1C1A1B;
        }
        .text{
          color: #565c5b;
          font-weight: 400;
          font-size: 36px;
          text-align: center;
          margin-bottom: 160px;
        }
        .btn{
          width: 313px;
          height: 113px;
          margin: 0 auto;
          background: url(../../assets/images/bigEarnestMoney/aware.png) no-repeat;
          background-size: cover;
        }
      }
      // .modal2{
      //   width: 596px;
      //   height: 651px;
      //   position: absolute;
      //   left: 50%;
      //   top: 50%;
      //   transform: translate(-50%,-50%);
      //   background: url(../../assets/images/bigEarnestMoney/modal1.png) no-repeat;
      //   background-size: 100% 100%;
      //   .title{
      //     margin-top: 182px;
      //     margin-bottom: 40px;
      //     font-weight: 500;
      //     font-size: 48px;
      //     text-align: center;
      //     color: #1C1A1B;
      //   }
      //   .text{
      //     color: #565c5b;
      //     font-weight: 400;
      //     width: 487px;
      //     font-size: 36px;
      //     margin: 0 auto;
      //     text-align: center;
      //     margin-bottom: 80px;
      //     line-height: 60px;
      //   }
      //   .btn{
      //     width: 313px;
      //     height: 113px;
      //     margin: 0 auto;
      //     background: url(../../assets/images/bigEarnestMoney/aware.png) no-repeat;
      //     background-size: cover;
      //   }
      // }
      // .modal3{
      //   width: 596px;
      //   height: 651px;
      //   position: absolute;
      //   left: 50%;
      //   top: 50%;
      //   transform: translate(-50%,-50%);
      //   background: url(../../assets/images/bigEarnestMoney/modal1.png) no-repeat;
      //   background-size: 100% 100%;
      //   .title{
      //     margin-top: 182px;
      //     margin-bottom: 40px;
      //     font-weight: 500;
      //     font-size: 48px;
      //     text-align: center;
      //     color: #1C1A1B;
      //   }
      //   .text{
      //     color: #565c5b;
      //     font-weight: 400;
      //     width: 487px;
      //     font-size: 36px;
      //     margin: 0 auto;
      //     text-align: center;
      //     margin-bottom: 140px;
      //     line-height: 60px;
      //     span{
      //       color: #F6623C;
      //     }
      //   }
      //   .btn_group{
      //     width: 480px;
      //     height: 82px;
      //     margin: 0 auto;
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: center;
      //     .think{
      //       width: 230px;
      //       height: 82px;
      //       background: url(../../assets/images/bigEarnestMoney/think.png) no-repeat;
      //       background-size: cover;
      //     }
      //     .continue{
      //       width: 230px;
      //       text-align: center;
      //       line-height: 82px;
      //       box-sizing: border-box;
      //       border: 1px solid #6C6C6C;
      //       border-radius: 38px;
      //       color: #F06F03;
      //       font-size: 32px;
      //     }
      //   }
      // }
      .modal4{
        width: 596px;
        height: 651px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: url(../../assets/images/bigEarnestMoney/modal1.png) no-repeat;
        background-size: 100% 100%;
        .title{
          margin-top: 152px;
          margin-bottom: 40px;
          font-weight: 500;
          font-size: 48px;
          text-align: center;
          color: #1C1A1B;
        }
        .text{
          color: #565c5b;
          font-weight: 400;
          width: 487px;
          font-size: 36px;
          margin: 0 auto;
          text-align: center;
          line-height: 60px;
        }
        .btn_group{
          width: 480px;
          height: 82px;
          margin: 0 auto;
          position: absolute;
          left: 60px;
          top: 500px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .cancel{
            width: 230px;
            height: 82px;
            background: url(../../assets/images/bigEarnestMoney/cancel.png) no-repeat;
            background-size: cover;
          }
          .ok{
            width: 230px;
            height: 82px;
            background: url(../../assets/images/bigEarnestMoney/ok.png) no-repeat;
            background-size: cover;
          }
        }
      }
    }
}
.popup_bottom {
  position: relative;
  z-index: 200000;
  box-sizing: border-box;
  padding: 0 40px;
  overflow: auto;
  text-align: center;
  background-color: #FFF;
  border-radius: 5px 5px 0 0;

  .p1 {
    font-weight: bold;
    font-size: 34px;
    margin: 20px auto;
    color: black;
  }

  .p2 {
    text-align: left;
    color: rgb(56, 55, 55);
    font-size: 30px;
    margin: 60px 0 10px 0;
  }

  .p3 {
    text-align: left;
    color: black;
    font-size: 25px;
    line-height: 1.2;
  }
  .radio{
    display: flex;
    align-items: center;
    p{
      margin-left: 10px;
      font-size: 25px;
    }
  }
  .btnLine {
    display: flex;
    margin: 60px 0 40px 0;
    justify-content: space-between;
    .cancel {
      width: 275px;
      height: 60px;
      line-height: 60px;
      border-radius: 8px;
      border: 1px solid #333;
      color: #CCC;
      font-size: 28px;
    }

    .sure {
      width: 275px;
      height: 60px;
      line-height: 60px;
      border-radius: 8px;
      background: #149BD4;
      color: #f1f1f1;
      font-size: 28px;
    }
  }
}

</style>
