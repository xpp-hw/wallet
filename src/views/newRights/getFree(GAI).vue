<template>
  <div class="body-bg" title="钱包权益专区202203">
  <div class="walletWrap">
    <div class="walletBanner">
      <!-- <img src="@/assets/images/rightsFree/banner1.png" width="100%" alt="钱包权益月月领"> -->
      <div class="myRights" @click="rightsBtnFun('myRights')" title="我的权益" id="A01"></div>
      <div class="businessDescription" @click="businessDesc" id="B01" title="业务说明"></div>
    </div>
    <div class="enjoyEveryMonth">
      <div class="yueyuexiang">
      <div class="left">
        <div class="btn">
          <button v-if="qiangLBtn" :disabled="isDisabled" class="qiangBtn" id="C01" @click="rightsBtnFun('10001')"></button>
          <button v-else class="qiangBtn2" @click="rightsBtnFunOk()"></button>
        </div>
      </div>
      <div class="right">
        <div class="btn">
          <button v-if="qiangRBtn" :disabled="isDisabled" class="qiangBtn" @click="rightsBtnFun('10006')" id="C02"></button>
          <button v-else class="qiangBtn2" @click="rightsBtnFunOk()"></button>
        </div>
      </div>
      </div>
    </div>
    <div class="enjoyEveryMonth">
      <div class="walletSpecial">
      <div class="left">
        <div class="btn" id="D01" @click="rightsBtnFun('10002')">
          <div v-if="walletSpecialLBtn" class="btnBg btnBg4"></div>
          <div v-else class="btnBg btnBg5"></div>
        </div>
      </div>
      <div class="right">
        <div class="btn" @click="rightsBtnFun('10003')" id="D02">
          <div v-if="walletSpecialRBtn" class="btnBg btnBg4"></div>
          <div v-else class="btnBg btnBg5"></div>
        </div>
      </div>
      </div>
    </div>
    <div class="enjoyEveryMonth">
      <a href="https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent" class="walletActivity"></a>
    </div>
    <div class="enjoyEveryMonth">
      <div class="massiveDiscounts">
        <div class="massiveDiscountsWrap">
          <div class="massiveDiscountsLine">
            <!-- <div class="massiveDiscountsBox">
            <div class="btnDraw">
              <div v-if="drawT3" id="E01" :disabled="isDisabled" @click="rightsBtnFun('10004')" class="btnBg btnBg3"></div>
              <div v-else class="btnBg2" @click="rightsBtnFunOk()"></div>
            </div>
            </div> -->
            <div class="massiveDiscountsBox">
              <div class="btnDraw" id="E04" @click="rightsBtnFun('qsd')">
                <div v-if="drawqsd" class="btnBg"></div>
                <div v-else class="btnBg2"></div>
              </div>
            </div>
            <div class="massiveDiscountsBox">
              <div class="btnDraw" id="E02" @click="rightsBtnFun('njyh')">
                <div v-if="drawNjyh" class="btnBg"></div>
                <div v-else class="btnBg2"></div>
              </div>
            </div>
          </div>
          <div class="massiveDiscountsLine massiveDiscountsLine2">
            <div class="massiveDiscountsBox">
              <div class="btnDraw" id="E03" @click="rightsBtnFun('phdj')" >
                <div v-if="drawPh" class="btnBg"></div>
                <div v-else class="btnBg2"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!--业务说明弹窗-->
  <div class="businessBg" v-show="businessShow"></div>
  <div class="businessWrap" v-show="businessShow">
    <div class="businessClose" @click="businessCloseFun"></div>
    <div class="businessBox">
      <div class="businessCont">
        <span></span>
      <p class="businessContD"><span>活动时间：</span>即日起至2022年6月30日。</p>
      <p class="businessContD"><span>活动对象：</span>限江苏移动钱包用户。</p>
      <p class="businessContD"><span>活动内容：</span>成功开通移动钱包的客户，在活动期间，每自然月可登录掌上营业厅，在“移动钱包专属权益”页面领取权益，具体权益内容详见页面说明，热门资源数量有限，领完即止，权益不定期更新。
      </p class="businessContD">
      <p class="businessContD"><span>温馨提示</span><br/>
1、话费自动充和话费宝为移动钱包附加功能，客户需主动点击办理，转至对应业务页面开通服务后方可享受，具体以页面说明为准。</br>
2、“充值优惠月月享”中用户领取的为话费充值券，优惠券当月生效月底自动失效，仅限使用移动钱包充话费时使用，不可转赠，不可兑换现金，成功使用无法撤销，为他人充值时无法使用。本券不与其他充值优惠活动同享，具体使用规则详见优惠券使用说明。</br>
3、所有权益均需客户保持手机号码状态正常，部分权益需客户在活动期内登录页面主动领取，具体领取结果以页面提示为准。领取成功后将于24小时内发放至开通业务的手机号账户中，领取成功后不支持退换货、不兑现、不找零。</br>
4、每月权益领取资格保留到当月月底，若过期未领则视为客户主动放弃，次月不予补发。</br>
5、.江苏移动基于第三方的合法授权，向客户提供第三方权益的获取资格，而非权益本身。实际提供权益服务的主体为第三方，第三方对其权益资费、服务内容等的承诺责任，与江苏移动无关。用户与第三方产生纠纷的，由用户与第三方自行处理，与江苏移动无关。如因国家政策原因或第三方调整权益资费、服务内容，江苏移动有权在合理期间，将该权益从页面中剔除，该剔除行为不视为江苏移动违约。部分第三方权益的使用须以您激活或绑定您在三方的用户账号为前提，您可根据权益页面相应指引进行操作。您未完成相应操作致使您无法使用该权益的，不视为江苏移动违约，江苏移动也无义务因您未享受到该服务而向您提供任何退费或服务补偿。</br>
6、江苏移动根据自身及第三方的业务发展情况，有权对产品提供的形式、权益种类和资费进行调整。</br>
7、所含权益将持续更新，实际可领权益种类以页面展示为准，部分权益数量有限、先到先得。</br>
8、部分权益可能存在协议到期，商品调整或下架，请以实际页面展示为准，移动公司将不另行通知。</br>
9、客户如因欠费停机、主动停机、销户、过户、离网，或不符合某项权益的领取资格，或某项权益已达到领取/续费上限等因素，造成权益无法领取的情况，移动公司不予补发，后果由客户自行承担。
      </p>
    </div>
    </div>
    <div class="iKnow" @click="iKonwFun"></div>
    <md-dialog
    v-model = "openShow"
    title = "我的权益"
    content="您当前暂未开通钱包服务，是否前往开通"
    :btns="quanyiBtns"
    ></md-dialog>
  </div>
    <div class="loading-toast" v-if="drawLoading">
        <img src="@/assets/images/rightsFree/loading.gif" alt="" />
    </div>
  </div>

</template>

<script>
import { Dialog, Button, Toast } from 'mand-mobile';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';


export default {
    name: 'rightsFree',
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button
    },
    data() {
        return {
            isDisabled: false,
            openShow: false,
            walletSpecialLBtn: true,
            walletSpecialRBtn: false,
            qiangLBtn: true,
            qiangRBtn: true,
            yiqiangBtn: false,
            businessShow: false,
            drawT3: true,
            drawPh: true,
            drawqsd: true,
            drawNjyh: true,
            drawjqqd: true,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_RIGHTSFREE_01_A01'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_RIGHTSFREE_01_B01'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_RIGHTSFREE_01_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_RIGHTSFREE_01_C02'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_RIGHTSFREE_01_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_RIGHTSFREE_01_D02'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_RIGHTSFREE_01_E01'
                },
                {
                    id: 'E02',
                    touchCode: 'WAP_T_RIGHTSFREE_01_E02'
                },
                {
                    id: 'E03',
                    touchCode: 'WAP_T_RIGHTSFREE_01_E03'
                },
                {
                    id: 'E04',
                    touchCode: 'WAP_T_RIGHTSFREE_01_E04'
                }
            ],
            quanyiBtns: [
                {
                    text: '取消',
                    handler: () => {
                        this.openShow = false;
                        this.queryusrRevRightSts();
                    }
                },
                {
                    text: '确定',
                    handler: () => {
                        this.confirmBtn();
                    }
                }
            ],
            code1: '10001',
            code2: '10002',
            code3: '10003',
            code4: '10004',
            code5: '10005',
            code6: '10006',
            drawLoading: false
        };
    },
    mounted() {
        this.queryusrRevRightSts();
        //      const rightInfoList = [
        //                   {rightCode: "10005", rightSts: "00", rightDesc: "浦惠到家"},
        // {rightCode: "10005", rightSts: "00", rightDesc: "浦惠到家"},
        // {rightCode: "10001", rightSts: "00", rightDesc: "充10送1优惠券（钱包专属）"},
        // {rightCode: "10002", rightSts: "01", rightDesc: "话费自动充，不停机服务"},
        // {rightCode: "10003", rightSts: "02", rightDesc: "钱包有余额，天天领话费"},
        // {rightCode: "10006", rightSts: "00", rightDesc: "充50送5优惠券（钱包专属"},
        // {rightCode: "10004", rightSts: "00", rightDesc: "T3出行30元打车券"}
        // ]
        //                 rightInfoList.map(i=>{
        //                   let codeDetail = i.rightCode
        //                   let rightStsDetail = i.rightSts
        //                   this.drawDetailFun(codeDetail,rightStsDetail)
        //                    console.log('用户权益code---',codeDetail,rightStsDetail);
        //                 })
    },
    created() {
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        rightsBtnFunOk() {
            this.drawLoading = true;
            setTimeout(() => {
                this.drawLoading = false;
            }, 1000);
            this.showTextToast('每月只领取一次，可下月再领');
        },
        rightsBtnFun(strText) {
            this.getRightsFun(strText);
            // 防止重复点击
            this.isDisabled = true;
            setTimeout(() => {
                this.isDisabled = false;
            }, 1000);
        },

        confirmBtn() {
            // 跳钱包开通页面
            this.$router.push({
                name: 'khEmpower',
                query: { typeId: 'qbqyhd' }
            });
        },


        // 进入页面判断是否开通钱包
        getRightsFun(textStr) {
            //       let datamock = {
            //         actSts: "01",

            //         msgCd: "BUS00000",
            //         msgId: null,
            //         msgInfo: "transaction is success",

            //       }
            //       if(datamock.actSts =='01' ){
            // this.receiveUsrRight(textStr)
            //       }
            api.getRightsCode({})
                .then((data) => {
                    this.drawLoading = false;
                    console.log('是否开通钱包---', data);

                    if (data.actSts == '00') {
                        // 未开户，弹窗提醒
                        this.openShow = true;
                    } else if (data.actSts == '01') {
                        this.openShow = false;
                        // 已开户直接下一步操作
                        if (textStr == 'njyh') {
                            window.location.href = 'https://upay.12580life.com/upay/wps/service/NewCupToBannerPage.xhtml?PAG_TYP=1';
                        } else if (textStr == 'qsd') {
                            window.location.href = 'https://wap.js.10086.cn/ex/finance/dicp/temp/fawnFinance/html/bank.html';
                        } else if (textStr == 'myRights') {
                            window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html';
                        } else if (textStr == '10003') {
                            window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/telephoneCharges/description?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype;
                        } else if (textStr == '10002') {
                            window.location.href = 'https://wap.js.10086.cn/vw/QBYCZ/qbyczIndex';
                        } else if (textStr == 'phdj') {
                            // window.location.href = 'https://huamairj.com/puhuispring/index?channelCode=80a5f19ce3c54a5b986aa654c1271bf4';
                            // 替换9.9元活动链接
                            // window.location.href = 'https://phwap.spdbph.com/h/page/1238467299/a06ee8b6ed6f4221a2a1de469525690e';
                            window.location.href = 'https://phwap.spdbph.com/h/page/1238467299/b728a180bd164f88a6229930e6fd2dfc';
                        } else {
                            this.receiveUsrRight(textStr);
                        }
                    } else if (data.actSts == '02') {
                        // 正在开户
                        this.openShow = false;
                        this.showTextToast('正在开户');
                    } else if (data.actSts == '03') {
                        // 账户异常
                        this.openShow = false;
                        this.$toast.info('您的银行电子账户异常！');
                    }
                })
                .catch((err) => {
                    this.drawLoading = false;
                    console.log(err);
                });
        },
        // 用户权益状态查询
        queryusrRevRightSts() {
            this.drawLoading = true;
            api.queryusrRevRightSts({})
                .then((data) => {
                    this.drawLoading = false;
                    data.rightInfoList.map((i) => {
                        const codeDetail = i.rightCode;
                        const rightStsDetail = i.rightSts;
                        this.drawDetailFun(codeDetail, rightStsDetail);
                        console.log('用户权益code---', codeDetail, rightStsDetail);
                    });
                })
                .catch((err) => {
                    this.drawLoading = false;
                    console.log(err);
                });
        },
        // 判断领取状态
        drawDetailFun(codeDetails, rightSts) {
            switch (codeDetails) {
                case this.code6:
                    if (rightSts == '00') {
                        // 50元减5未领取
                        this.qiangRBtn = true;
                    } else if (rightSts == '01') {
                        // 按钮置为已领取
                        this.qiangRBtn = false;
                    } else {
                        // 状态异常
                        this.qiangRBtn = false;
                    }
                    break;
                case this.code5:
                    // 无券敬请期待
                    // if(rightSts== '00'){
                    //     //浦惠未领取

                    //   }else if(rightSts== '01'){
                    //     //按钮置为已领取
                    //     //按钮不可点击

                    //   }else{
                    //     //状态异常
                    //     //提示当月已领完，请下月领取

                    //   }
                    break;
                case this.code4:
                    if (rightSts == '00') {
                        // t3未领取
                        this.drawT3 = true;
                    } else if (rightSts == '01') {
                        // 按钮置为已领取
                        // 暗提示
                        this.drawT3 = false;
                    } else {
                        // 状态异常
                        this.drawT3 = false;
                    }
                    break;
                case this.code3:
                    if (rightSts == '00') {
                        // 钱包有余额都是未开通
                        this.walletSpecialRBtn = true;
                    } else if (rightSts == '01') {
                        // 按钮置为查看权益
                        this.walletSpecialRBtn = false;
                    } else {
                        // 状态异常
                        this.walletSpecialRBtn = true;
                    }
                    break;
                case this.code2:
                    if (rightSts == '00') {
                        // 话费自动充未开通
                        this.walletSpecialLBtn = true;
                    } else if (rightSts == '01') {
                        // 按钮置为查看权益
                        this.walletSpecialLBtn = false;
                    } else {
                        // 状态异常
                        this.walletSpecialLBtn = true;
                    }
                    break;
                default:
                    if (rightSts == '00') {
                        // 1元话费未领取
                        this.qiangLBtn = true;
                    } else if (rightSts == '01') {
                        // 按钮置为已领取
                        this.qiangLBtn = false;
                    } else {
                        // 状态异常
                        this.qiangLBtn = false;
                        // this.showTextToast('当月已领完，请下月领取')
                    }
                    break;
            }
        },
        showTextToast(text) {
            Toast.info(text);
        },
        // 上传数据，用户权益领取
        receiveUsrRight(textStr) {
            this.drawLoading = true;
            api.receiveUsrRightPost({
                rightCode: textStr
            })
                .then((data) => {
                    setTimeout(() => {
                        this.drawLoading = false;
                    }, 1000);
                    // 改按钮状态
                    console.log('用户权益领取提交---', data);
                    if (data.msgCd !== 'BUS00000') {
                        this.showTextToast(data.msgInfo);
                    } else {
                        this.showTextToast('领取成功！');
                        // 重新获取状态
                        this.queryusrRevRightSts();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setTimeout(() => {
                        this.drawLoading = false;
                    }, 1000);
                    console.log('用户权益领取提交---', err);
                    if (err.msgCd !== 'BUS00000') {
                        this.showTextToast(err.msgInfo);

                        // this.queryusrRevRightSts()
                    } else {
                        this.showTextToast('领取成功！');
                        // 重新获取状态
                        this.queryusrRevRightSts();
                    }
                });
        },
        businessDesc() {
            this.businessShow = true;
        },
        businessCloseFun() {
            this.businessShow = false;
        },
        iKonwFun() {
            this.businessShow = false;
        }
    }
};
</script>
<style scoped lang="less">

.body-bg{
    position: absolute;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    overflow-y: hidden;
    // background-color: #100e56;
    background: url(../../assets/images/rightsFree/bg03.png) top center no-repeat;
    background-size: 100% 100%;
    height: 1697px;

  }
.walletWrap{
  position: relative;
  height: 100%;
  // background: #100e56;
  // padding-bottom: 130px;
}
.walletBanner{
  position: relative;
  height: 425px;
}
.myRights{
  position:absolute;
  right: 0;
  bottom: 160px;
  height: 40px;
  width: 110px;
}
.businessDescription{
  position:absolute;
  right: 0;
  bottom: 110px;
  height: 40px;
  width: 110px;
}
.enjoyEveryMonth{


  // img{
  //   width: 100%;
  //   display: block;
  //   margin: 0 auto;
  //   vertical-align: bottom;
  // }

}
.yueyuexiang{
  // margin-top:-1px;
  // background: url(../../assets/images/rightsFree/yueyuexiang.png) no-repeat;
  // background-size: 100% 100%;
  // height: 260px;
  position: relative;
  height: 260px;
  width: 100%;
  display: flex;

  .left{
    width: 50%;
    height: 100%;
    .btn{
      position: absolute;
      left: 240px;
      top: 120px;
      img{
        width: 83px;
        height: 83px;
      }
    }

  }
  .right{
    width: 50%;
    height: 100%;
    .btn{
      position: absolute;
      right: 80px;
      top: 120px;
      img{
        width: 93px;
        height: 73px;
      }
    }

  }

}

.walletSpecial{
  // background: url(../../assets/images/rightsFree/qianbao.png) no-repeat;
  // background-size: 100% 100%;
  width: 100%;
  height: 260px;
  position: relative;
  display: flex;
  .left{
    width: 50%;
    height: 100%;
    .btn{
      position: absolute;
      top: 190px;
      left: 205px;
      img{
        width: 110px;
        height: 30px;
      }
    }
  }
  .right{
    width: 50%;
    height: 100%;
    .btn{
      position: absolute;
      top: 190px;
      right: 90px;
      img{
        width: 110px;
        height: 30px;
      }
    }
  }

}
.walletActivity{
  width: 100%;
  height: 205px;
  display: block;
}
.massiveDiscounts{
  // background: url(../../assets/images/rightsFree/hailiangyouhui.png) no-repeat;
  // background-size: 100% 100%;
  height: 370px;
  margin-top: 10px;

.massiveDiscountsWrap{
  // width: 100%;
  padding: 110px 50px 30px;
  display: flex;


  .massiveDiscountsBox{
    width: 316px;
    height: 102px;
    margin-right: 16px;
    margin-bottom: 30px;
    position: relative;

    .btnDraw{
      position: absolute;
      top: 48px;
      left: 160px;
      img{
        width: 110px;
        height: 30px;
      }
    }

  }
}
}


.businessBg{
    background: #000;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
.businessWrap{
    position: absolute;
    top: 0;
    left: 0;
    z-Index: 9999;
    background: url(../../assets/images/rightsFree/popBg.png) top center no-repeat;
    background-size: 100% 100%;

  .businessClose{
    position: absolute;
    right: 120px;
    top: 180px;
    width: 60px;
    height: 60px;
  }
  .businessBox{
    height: 593px;
    overflow: hidden;
    padding: 285px 90px 400px;
  }
  .businessCont{
    height: 577px;
    overflow-y: scroll;
    .businessContD{
      line-height: 30px;
      span{
        color:#7e4a01;
      }
    }
  }
  .iKnow{
    position: absolute;
    left: 50%;
    bottom: 280px;
    margin-left: -100px;
    height: 60px;
    width: 200px;

  }
}
.loading-toast{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    margin-left: -60px;

    // transform: translate(-50%, -50%);
    img{
      width: 120px;
    }
}
.btnBg{
    background: url(../../assets/images/rightsFree/lijichakan.png) top center no-repeat;
    background-size: 100% 100%;
    width: 120px;
    height: 36px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    font-size: 18px;
    font-weight: 600;
}
.btnBg2{
    background: url(../../assets/images/rightsFree/yilingqu.png) top center no-repeat;
    background-size: 100% 100%;
    width: 120px;
    height: 36px;
}
.btnBg3{
    background: url(../../assets/images/rightsFree/lijilingqu.png) top center no-repeat;
    background-size: 100% 100%;
    width: 120px;
    height: 36px;
}
.btnBg4{
    background: url(../../assets/images/rightsFree/lijikaitong.png) top center no-repeat;
    background-size: 100% 100%;
    width: 120px;
    height: 36px;
}
.btnBg5{
    background: url(../../assets/images/rightsFree/ckqy.png) top center no-repeat;
    background-size: 100% 100%;
    // background: #000;
    // border-radius: 20px 20px 20px 20px;
    width: 120px;
    height: 36px;

}
.qiangBtn{
    background: url(../../assets/images/rightsFree/qiang.png) top center no-repeat;
    background-size: 100% 100%;
    width: 83px;
    height: 83px;
}
.qiangBtn2{
    background: url(../../assets/images/rightsFree/yiqiangwan.png) top center no-repeat;
    background-size: 100% 100%;
    width: 83px;
    height: 83px;
    // margin-top: 10px;
    // background: #f0f0f0;
    // border-radius: 50%;
    // width: 80px;
    // height: 80px;
    // color:#888;
    // padding: 5px;
}
.massiveDiscounts .massiveDiscountsWrap .massiveDiscountsLine2{
  .btnDraw{
    left: 150px;
  }
}
</style>
