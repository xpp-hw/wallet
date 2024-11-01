<template>
  <div class="box">
    <div class="rules" id="A01" @click="(tankuang = true), (showRules = true)"></div>
    <!-- 立即领取 -->
    <div class="lijilingqu" id="A02" v-if="lingquNow" @click="QiWeiGet()" ref="lijilingqu"></div>
    <!-- 不符合条件 -->
    <div class="bufuhe" id="A03" v-if="bufuhe" @click="(tankuang = true), (sorry = true)"></div>
    <!-- 已领取 -->
    <div class="yilingqu" id="B01" v-if="yilingqu" @click="toSee()"></div>
    <div class="tips" v-if="yilingqu">如已使用，请忽略</div>
    <!-- 弹框 -->
    <div class="tankuang" v-if="tankuang">
      <!-- 领取成功 -->
      <div class="lingqu_suc" v-if="lingqu_suc">
        <div class="suc_bg" style="overflow: hidden;">
          <p style="margin-top: 2.06rem;">请前往中国移动江苏APP-充值中心</p>
          <p style="margin-top: 0.3rem;">或我的优惠券中使用，谢谢～</p>
        </div>
        <div class="chongzhi" @click="lingquSuc" id="A04"></div>
        <div class="close" @click="lingquSuc"></div>
      </div>
      <!-- 很遗憾 不符合 -->
      <div class="sorry" v-if="sorry">
        <div class="sorry_bg"></div>
        <div class="toSee" @click="SorrytoSee" id="B02"></div>
        <div class="close" @click="lingquSorry"></div>
      </div>
      <!-- 领取失败 -->
      <div class="lingqu_fail" v-if="lingqu_fail">
        <div class="fail_bg"></div>
        <div class="haode" @click="lingquFail"></div>
        <div class="close" @click="lingquFail"></div>
      </div>
      <!-- 温馨提示 已参与 -->
      <div class="yicanyu" v-if="yicanyu">
        <div class="canyu_bg"></div>
        <div class="toSee" @click="yicanyuClick"></div>
        <div class="close" @click="yicanyuClick"></div>
      </div>
      <div class="showRules" v-if="showRules">
        <div class="rules_bg"></div>
        <div class="rulesText">
          <p class="textTitle">一、活动时间</p>
          <p>即日起-本月底</p>
          <p class="textTitle">二、活动对象</p>
          <p>已关注绑定号码归属地移动公司企业微信的江苏移动用户(无线公话、无线商话、全额代付家庭副号， 具体以实际活动页面提示为准)</p>
          <p class="textTitle">三、活动内容</p>
          <p>用户进入活动页，点击“立即领券”按钮，符合活动参与条件即可成功领取1张充值券（充值满100送10元话费）。每用户限享一次领取机会，充值券当月有效，过期未用不补发。</p>
          <p class="textTitle">五、注意事项</p>
          <p>
            1、参与活动的号码状态必须正常，报停的客户须先报开，欠停的客户、后付费有历史欠费的客户，须缴清欠费后，才能参加本活动。如用户当月预约变更主体产品，有可能导致无法参与活动。如用户已经参与移动其他活动导致冲突，将导致无法参加活动，具体以办理时页面展示为准。<br>
            2、成功领券后，根据页面提示跳转至优惠券中心使用，限领取号码使用，不支持为他人充值使用。不支持转赠、提现、话费支付，需在有效期内使用，到期自动失效。<br>
            3、全额代付费的副号、家庭账户的副号无法使用充值优惠券，充值优惠券可能与您已有资费产品、业务套餐、营销活动存在冲突，充值券能否成功使用以页面提示为准。<br>
            4、其他使用说明详见此APP优惠券中心通用规则或充值中心-充值需知-充值券券面说明。<br>
            5、中奖用户在享受活动奖品优惠期间不得办理销户、过户、报停业务。<br>
            6、中国移动江苏公司有权在法律允许的范围内对活动规则作出适当调整。详询10086。<br>
            7、您通过本软件参加的商业活动与Apple Inc.无关。
          </p>
          <p class="textTitle">话费充值券：</p>
          <p>
            （1）话费充值券仅限充话费时使用，不可转赠，不可兑换现金，成功使用无法撤销，为他人充值时无法使用；<br>
            （2）话费充值券可在“江苏移动充值中心”微信小程序、此APP为持券号码充值指定档次话费时获得相应话费赠送，充值卡或物联网充值不支持使用本券；<br>
            （3）本券不与其他充值优惠活动同享；充值的本金与获得的话费不可用于话费支付或参加其他活动；<br>
            （4）如您当日使用优惠券未充值成功，则该券锁定，一般20分钟后解锁；<br>
            （5）本券可能与您已有的业务套餐、营销活动存在冲突，能否成功使用以页面提示为准；<br>
            （6）其他使用说明详见“通用规则”；您可登录“此APP-优惠券-我的优惠券”中查看通用规则，使用优惠券。<br>
          </p>
        </div>
        <div class="close" @click="(tankuang = false), (showRules = false)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import api from '../../common/apiUrls';

export default {
    data() {
        return {
            sourceID: '',
            // sorryTankuang: false,
            // yicanyuTankuang: false,
            /* 按钮 */
            yilingqu: false,
            lingquNow: false,
            bufuhe: true,
            /* 弹框 */
            tankuang: false,
            lingqu_suc: false,
            sorry: false,
            lingqu_fail: false,
            yicanyu: false,
            showRules: false,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_QIWEI_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_QIWEI_01_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_QIWEI_01_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_QIWEI_01_A04'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_QIWEI_01_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_QIWEI_01_B02'
                }
            ]
        };
    },
    created() {
    // 查询是否为企微用户
        this.getEnterpriseMicroActivityUser();
        initPageJs(this.$route.meta.pageName, this.touchArr);
    // this.getTest();
    },
    mounted() {
        if (this.$route.query.sourceID) {
            this.sourceID = this.$route.query.sourceID;
        }
        console.log(this.sourceID);
    },
    beforeRouteEnter(to, from, next) {
        if (to.name == 'newPeople') {
            api
                .getEnterpriseMicroActivityUser()
                .then((res) => {
                    console.log('---', res);
                    if (res.usrTyp == '01') {
                        /* 不满足 */
                        this.bufuhe = true;
                        // this.sorryTankuang = true;
                    } else if (res.usrTyp == '02') {
                        /* 满足未领取 */
                        this.lingquNow = true;
                    } else if (res.usrTyp == '03') {
                        /* 已领取 */
                        this.yilingqu = true;
                        // this.yicanyuTankuang = true;
                    }
                })
                .catch((err) => {
                    console.log('+++', err);
                    if (err.usrTyp == '01') {
                        /* 不满足 */
                        this.bufuhe = true;
                        // this.sorryTankuang = true;
                    } else if (err.usrTyp == '02') {
                        /* 满足未领取 */
                        this.lingquNow = true;
                    } else if (err.usrTyp == '03') {
                        /* 已领取 */
                        this.yilingqu = true;
                        // this.yicanyuTankuang = true;
                    }
                });
        }
        next();
    },
    methods: {
    // 查询是否为企微用户
        getEnterpriseMicroActivityUser() {
            this.yilingqu = false;
            this.lingquNow = false;
            this.bufuhe = false;
            api
                .getEnterpriseMicroActivityUser()
                .then((res) => {
                    console.log('---', res);
                    if (res.usrTyp == '01') {
                        /* 不满足 */
                        this.bufuhe = true;
                        // this.sorryTankuang = true;
                    } else if (res.usrTyp == '02') {
                        /* 满足未领取 */
                        this.lingquNow = true;
                    } else if (res.usrTyp == '03') {
                        /* 已领取 */
                        this.yilingqu = true;
                        // this.yicanyuTankuang = true;
                    }
                })
                .catch((err) => {
                    console.log('+++', err);
                    if (err.usrTyp == '01') {
                        /* 不满足 */
                        this.bufuhe = true;
                        // this.sorryTankuang = true;
                    } else if (err.usrTyp == '02') {
                        /* 满足未领取 */
                        this.lingquNow = true;
                    } else if (err.usrTyp == '03') {
                        /* 已领取 */
                        this.yilingqu = true;
                        // this.yicanyuTankuang = true;
                    }
                });
        },
        lingquFail() {
            this.tankuang = false;
            this.lingqu_fail = false;
            this.$router.go(0);
        },
        lingquSuc() {
            this.tankuang = false;
            this.lingqu_suc = false;
            this.$router.go(0);
        },
        lingquSorry() {
            this.tankuang = false;
            this.sorry = false;
            this.$router.go(0);
        },
        yicanyuClick() {
            this.tankuang = false;
            this.yicanyu = false;
            this.$router.go(0);
        },
        go() {
            this.lingqu_suc = false;
            this.takuang = false;
            window.location.href = 'https://p.12580life.com/fintech-h5/financialmemb/toWechat?code=&from=wx_xcxsy&sourceID=A02';
        },
        toSee() {
            // this.tankuang = false;
            // this.yicanyu = false;
            // window.location.href =
            //   "https://p.12580life.com/fintech-h5/financialmemb/toWechat?code=&from=wx_xcxsy&sourceID=A02";
            this.tankuang = true;
            this.lingqu_suc = true;
        },
        SorrytoSee() {
            this.tankuang = false;
            this.sorry = false;
            window.location.href = 'https://p.12580life.com/fintech-h5/financialmemb/toWechat?code=&from=wx_xcxsy&sourceID=A02';
        },
        chongzhi() {
            this.lingqu_suc = false;
            this.tankuang = false;
            window.location.href = 'https://p.12580life.com/fintech-h5/financialmemb/toWechat?code=&from=wx_xcxsy&sourceID=A02';
        },
        // 企微用户领取权益
        QiWeiGet() {
            this.lingqu_suc = false;
            this.sorry = false;
            this.lingqu_fail = false;
            this.yicanyu = false;
            this.showRules = false;
            this.$refs.lijilingqu.className = 'pointerNone';
            // this.getNewuser();
            // if(this.sorryTankuang) {
            //     this.tankuang = true;
            //     this.sorry = true;
            // } else if(this.yicanyuTankuang) {
            //     this.tankuang = true;
            //     this.yicanyu = true;
            // }

            api
                .QiWeiGet({
                    sourceID: this.sourceID
                })
                .then((res) => {
                    this.$refs.lijilingqu.className = 'pointerAuto';
                    console.log('---', res);
                    if (res.rightSts == '01') {
                        /* 领取成功 */
                        this.tankuang = true;
                        this.lingqu_suc = true;
                    } else if (res.rightSts == '02') {
                        /* 领取失败 */
                        this.tankuang = true;
                        this.lingqu_fail = true;
                    }
                })
                .catch((err) => {
                    this.$refs.lijilingqu.className = 'pointerAuto';
                    console.log('+++', err);
                    this.tankuang = true;
                    this.lingqu_fail = true;
                });
        },
        /* mock数据模拟 */
        getTest(test) {
            axios
                .get('/user/userInfo')
                .then((res) => {
                    console.log('zzzzzzz', res);
                    if (res.data.usrTyp == '02') {
                        console.log('-------------', this.yilingqu);
                        /* 满足未领取 */
                        this.lingquNow = true;
                    }
                    if (test == 1) {
                        if (res.data.rightSts == '01') {
                            /* 领取成功 */
                            this.tankuang = true;
                            this.lingqu_suc = true;
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.tankuang = true;
                    this.lingqu_fail = true;
                });
        }
    }
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
  width: 750px;
  height: 1512px;
  background: url("../../assets/images/newPeople/bg_2.png") no-repeat;
  background-size: 100%;
  .tips {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 160px;
    font-size: 28px;
    color: #b66a4b;
  }
  .rules {
    position: absolute;
    right: 0;
    top: 380px;
    background: url("../../assets/images/newPeople/rules_2.png") no-repeat;
    background-size: 100%;
    width: 61px;
    height: 148px;
  }

  .lijilingqu {
    position: absolute;
    left: 85px;
    bottom: 220px;
    background: url("../../assets/images/newPeople/lingquBtn.png") no-repeat;
    background-size: 100%;
    width: 588px;
    height: 113px;
  }

  .bufuhe {
    position: absolute;
    left: 85px;
    bottom: 220px;
    width: 588px;
    height: 113px;
    background: url("../../assets/images/newPeople/bufuhe.png") no-repeat;
    background-size: 100%;
  }

  .yilingqu {
    position: absolute;
    left: 85px;
    bottom: 220px;
    width: 588px;
    height: 113px;
    background: url("../../assets/images/newPeople/goUse.png") no-repeat;
    background-size: 100%;
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
  .lingqu_suc {
    position: relative;
    .suc_bg {
      box-sizing: border-box;
      padding: 0 29px 0 46px;
      font-size: 32px;
      text-align: center;
      color: #991600;
      width: 566px;
      height: 608px;
      background: url("../../assets/images/newPeople/sucBg_3.png") no-repeat;
      background-size: 100%;
    }
    .go {
      position: absolute;
      top: 280px;
      left: 337px;
      width: 80px;
      height: 80px;
    }
    .chongzhi {
      position: absolute;
      bottom: 65px;
      left: 50%;
      transform: translateX(-50%);
      width: 431px;
      height: 105px;
      background: url("../../assets/images/newPeople/toSee_2.png") no-repeat;
      background-size: 100%;
    }
    .close {
      position: absolute;
      bottom: -120px;
      left: 240px;
      width: 81px;
      height: 81px;
      background: url("../../assets/images/newPeople/close.png") no-repeat;
      background-size: 100%;
    }
  }
  .sorry {
    position: relative;
    .sorry_bg {
      width: 566px;
      height: 677px;
      background: url("../../assets/images/newPeople/sorry_2.png") no-repeat;
      background-size: 100%;
    }
    .toSee {
      position: absolute;
      bottom: 56px;
      left: 50%;
      transform: translateX(-50%);
      width: 431px;
      height: 105px;
      background: url("../../assets/images/newPeople/toSee.png") no-repeat;
      background-size: 100%;
    }
    .close {
      position: absolute;
      top: 720px;
      left: 235px;
      width: 81px;
      height: 81px;
      background: url("../../assets/images/newPeople/close.png") no-repeat;
      background-size: 100%;
    }
  }
  .lingqu_fail {
    position: relative;
    .fail_bg {
      width: 566px;
      height: 677px;
      background: url("../../assets/images/newPeople/fail_bg.png") no-repeat;
      background-size: 100%;
    }
    .haode {
      position: absolute;
      bottom: 200px;
      left: 50%;
      transform: translateX(-50%);
      width: 291px;
      height: 83px;
      background: url("../../assets/images/newPeople/haode.png") no-repeat;
      background-size: 100%;
    }

    .close {
      position: absolute;
      top: 580px;
      left: 238px;
      width: 81px;
      height: 81px;
      background: url("../../assets/images/newPeople/close.png") no-repeat;
      background-size: 100%;
    }
  }
  .yicanyu {
    position: relative;
    .canyu_bg {
      width: 566px;
      height: 608px;
      background: url("../../assets/images/newPeople/yicanyu_2.png") no-repeat;
      background-size: 100%;
    }
    .toSee {
      position: absolute;
      top: 432px;
      left: 50%;
      transform: translateX(-50%);
      width: 431px;
      height: 105px;
      background: url("../../assets/images/newPeople/toSee_2.png") no-repeat;
      background-size: 100%;
    }
    .close {
      position: absolute;
      top: 670px;
      left: 240px;
      width: 81px;
      height: 81px;
      background: url("../../assets/images/newPeople/close.png") no-repeat;
      background-size: 100%;
    }
  }
  .showRules {
    position: relative;
    .rules_bg {
      width: 566px;
      height: 671px;
      background: url("../../assets/images/newPeople/rulesBg_2.png") no-repeat;
      background-size: 100%;
    }
    .close {
      position: absolute;
      top: 720px;
      left: 238px;
      width: 81px;
      height: 81px;
      background: url("../../assets/images/newPeople/close.png") no-repeat;
      background-size: 100%;
    }
    .rulesText {
      position: absolute;
      top: 80px;
      left: 40px;
      width: 500px;
      height: 550px;
      white-space: normal;
      word-wrap: break-word;
      overflow-y: scroll;
      color: #c36639;
      font-size: 30px;
      font-weight: 500;
      line-height: 40px;
      .textTitle {
        font-weight: 900;
      }
    }
  }
}
.pointerNone {
  position: absolute;
  left: 85px;
  bottom: 220px;
  background: url("../../assets/images/newPeople/lingquBtn.png") no-repeat;
  background-size: 100%;
  width: 588px;
  height: 113px;
  pointer-events: none;
}
.pointerAuto {
  position: absolute;
  left: 85px;
  bottom: 220px;
  background: url("../../assets/images/newPeople/lingquBtn.png") no-repeat;
  background-size: 100%;
  width: 588px;
  height: 113px;
  pointer-events: auto;
}
</style>
