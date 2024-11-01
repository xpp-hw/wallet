<template>
  <div class="baiRongLoan_contaion">
    <div v-if="showFlag" class="content_body" :style="homePageBg.logo ? {backgroundImage: 'url(' + homePageBg.logo + ')',backgroundSize: '100% 100%',backgroundRepeat: 'no-repeat'} : ''">
      <div class="prize_bg" @click="prizeFlag = true"></div>
      <div class="rules_bg" @click="rulesClick"></div>
      <div class="btn" @click="showPop"></div>
      <div class="ruleContent" v-html="agreementContent"></div>
    </div>
    <activePop v-if="popFlag" :popDate="popDate" @closePop="closePop"></activePop>
    <prizePop v-if="prizeFlag" @closePrize='closePrize'></prizePop>
    <div v-if="loading" class="loading-toast">
      <img alt="" src="@/assets/images/loading-toast.gif" />
    </div>
  </div>
</template>
<script>
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import activeText from './compoments/activeText.vue';
import activePop from './compoments/activePop.vue';
import prizePop from './compoments/prizePop.vue';
// 活动类型
// 1:授信通过时间在活动上线日期之前,不满足活动参与条件，仍可正常申请其他贷款信息
// 2:活动1已发送，活动2已发送，已参与活动，继续申请借钱将不再享受活动奖品
// 3:活动1已发送，活动2未发送，已获得5G流量，继续申请放款，可获得20元话费
// 4:审核拒绝,未通过授信，前往借钱专区，继续申请其他贷款产品
// 5:授信审核中，查询审核进度.
// 6:未授权或者未进件,回到百融首页
// 7:活动1发送成功，恭喜您获得10GB流量，继续申请放款可获得20元话费
// 8:活动2发送成功，恭喜已领取全部礼包，权益将在放款后3日自动发放到账户
// "9", "活动2已发送，活动3已发送，已参与活动，继续申请借钱将不再享受活动奖品"
// "10", "你已获得流量5GB，不支持领取当前10GB”,是否继续借款,若成功放款，奖品将于3日内自动发放到账户
// 11，你已获得流量10GB，继续申请放款，可获得20元话费
// 12, 恭喜你成功参与活动，奖品将在放款后三个工作日内发放，请关注短信通知
export default {
    components: {
        activeText,
        activePop,
        prizePop
    },
    data() {
        return {
            popFlag: false,
            popDate: {
                type: '',
                text: ''
            },
            loading: false,
            showRules: false,
            accessSource: '00',
            agreementContent: '',
            prizeFlag: false, // 奖品列表弹窗
            homePageBg: {},
            showFlag: false
        };
    },
    mounted() {
        this.queryAgreementContent();
        this.getBackgroundImage();
    },
    created() {
      api.getEncrypt({})
      .then((data) => {
        let emsKey = data.encryptKey || ''
        if(process.env.VUE_APP_ENV == 'local' || process.env.VUE_APP_ENV == 'sit') {
          gdp('setUserId', emsKey); // 此处填写用户手机号
        } else {
          if(this.$client.LEADEON) {
            gdp('setUserId', emsKey); // 此处填写用户手机号
          }
        }
      })
    },
    methods: {
        // 获取首页背景
        getBackgroundImage() {
            this.$store.commit('LOADING', true);
            api.baiRong.getBackgroundImage({ activityNo: 'DKJOLY', floorType: '0' }).then((res) => {
                if (res.body.length > 0) {
                    this.homePageBg = res.body.find(item => item.floorType === '0');
                }
            }).finally(() => {
                this.showFlag = true;
                this.$store.commit('LOADING', false);
            });
        },
        rulesClick() {
            this.$router.push({
                name: 'baiRongLoanRules'
            });
        },
        showPopup(type) {
            if (!type) {
                this.showRules = true;
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            } else {
                this.showRules = false;
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
            }
        },
        showPop() {
            this.query();
        },
        closePop() {
            this.popFlag = false;
        },
        closePrize() {
            this.prizeFlag = false;
        },
        query() {
            if (this.$client.LEADEON) {
                this.accessSource = '01';
            } else if (this.$client.JSMCC) {
                this.accessSource = '02';
            } else {
                this.accessSource = '00';
            }
            let recordUrl = window.location.href;
            let recordIndex;
            if (recordUrl.indexOf('?') > -1) {
                recordIndex = recordUrl.indexOf('?');
            } else {
                recordIndex = recordUrl.length;
            }
            recordUrl = recordUrl.slice(0, recordIndex);
            const params = {
                mobile: store2.default.get('usrmob') || '',
                tokenId: store2.default.get('loginTokenId') || '',
                parentChannel: this.$route.query.parchn || '',
                childChannel: this.$route.query.gytype || '',
                pageUrl: recordUrl || '',
                accessSource: this.accessSource
            };
            this.loading = true;
            api.baiRong.receiveQuotaAndAward(params).then((res) => {
                this.loading = false;
                if (res.msgCd === 'BUS00000') {
                    this.popDate.type = res.sendStatus;
                    if (this.popDate.type === '6') {
                        this.$router.push({
                            name: 'authorization',
                            query: {
                                parchn: this.$route.query.parchn,
                                gytype: this.$route.query.gytype
                            }
                        });
                    } else if (this.popDate.type !== '6' && this.popDate.type) {
                        if (this.popDate.type === '10') {
                            this.popDate.text = '你已获得流量5GB，不支持领取当前10GB！继续申请放款，可获得20元话费';
                        } else if (this.popDate.type === '11') {
                            this.popDate.text = '你已获得流量10GB，继续申请放款，可获得20元话费';
                        }
                        this.popFlag = true;
                    }
                }
            }).catch((err) => {
                this.$toast.info(err.msgInfo);
                this.loading = false;
            });
        },
        // 获取规则
        queryAgreementContent() {
            api.baiRong.bairongQueryAgreementList().then((res) => {
                this.agreementContent = res.data.agreementList[0].agreementContent.replace(/font-size/g, '').replace(/font-family/g, '').replace(/line-height/g, '');
            });
        }
    }
};
</script>
<style lang="less" scoped>
.baiRongLoan_contaion {
  width: 100%;
  min-height: 100vh;
  position: relative;
  .content_body{
    background-image: url("../../assets/images/baiRongLoan/content_bg2.png");
    background-size: 100% 100%;
    height: 2320px;
    .ruleContent {
      position: absolute;
      bottom: 130px;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 888px;
      overflow: scroll;
      font-size: 24px;
      text-align: justify;
      line-height: 38px;
    }
    .prize_bg{
      position: absolute;
      right: 0;
      top: 30px;
      height: 93px;
      width: 72px;
      background-size: 100%;
    }
    .rules_bg{
      position: absolute;
      right: 0;
      top: 140px;
      height: 93px;
      width: 72px;
      background-size: 100%;
    }
    .btn {
      height: 135px;
      width: 476px;
      position: absolute;
      top: 980px;
      left: 50%;
      transform: translate(-50%);
      z-index: 9;
    }
  }
  .top_bg {
    background-image: url(../../assets/images/baiRongLoan/top_banner.png);
    background-size: 100% 100%;
    height: 985px;
    position: relative;

  }
  .body_contaion {
    padding: 0 16px;
    .body_class {
      text-align: center;
      position: relative;
      padding: 130px 0 0 0;
      margin-top: -330px;
      .understand_bg{
        background-image: url('../../assets/images/baiRongLoan/understand_bg.png');
         background-size: 100%;
         height: 160px;
         margin-bottom: 27px;
      }
      .baody_bg{
        background-image: url('../../assets/images/baiRongLoan/body_banner.png');
        background-size: 100%;
        height: 339px;
      }

    }
  }

  .foot_contaion {
    padding: 16px;
    margin-top: 25px;
    position: relative;
    .foot_title{
       background: url('../../assets/images/baiRongLoan/signIn_title.png') no-repeat;
       height: 72px;
       width: 701px;
       background-size: 100%;
       position: absolute;
       top: 15px;
       left: 50%;
       transform: translate(-50%);
    }
    .foot_bg {
      background: url('../../assets/images/baiRongLoan/bairong_sign_bg.png') no-repeat;
      height: 989px;
      background-size: 100%;
      border-radius: 26px;
      .box_title {
        background-image: url(../../assets/images/baiRongLoan/active_icon.png);
        background-size: 100%;
        height: 72px;

        margin: 0 auto;
      }
    }
  }
}

.loading-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 999;
  border: 999px solid transparent;

  img {
    width: 1.2rem;
  }
}

.newBg {
  position: relative;
  width: 100%;
  height: 1504px;
  // background-image: url('../../assets/images/baiRongLoan/newBg1.png');
  background-size: 100% 100%;

  .newPrize {
    position: absolute;
    bottom: 297px;
    left: 70px;
    width: 612px;
    height: 300px;
    background-image: url('../../assets/images/baiRongLoan/newPrize.png');
    background-size: 100%;
  }

  .newBtn {
    position: absolute;
    bottom: 129px;
    left: 110px;
    width: 523px;
    height: 134px;
    background-image: url('../../assets/images/baiRongLoan/newBtn.png');
    background-size: 100%;
  }

  .newRules {
    position: absolute;
    top: 124px;
    right: -5px;
    width: 101px;
    height: 38px;
    background-image: url('../../assets/images/baiRongLoan/newRules.png');
    background-size: 100% 100%;
  }
}

.tankuang {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(2, 2, 2, 0.7);
  z-index: 999;
  .rules {
    box-sizing: border-box;
    padding: 96px 50px 0 50px;
    width: 602px;
    height: 709px;
    background-image: url('../../assets/images/baiRongLoan/rulesBg.png');
    background-size: 100%;
    .textArea {
      color: #275070;
      font-size: 26px;
      line-height: 40px;
      height: 550px;
      overflow: scroll;
    }
  }
  .close {
    margin: 50px 0 0 0;
    width: 74px;
    height: 74px;
    background-image: url('../../assets/images/baiRongLoan/关闭.png');
    background-size: 100%;
  }
}
</style>
