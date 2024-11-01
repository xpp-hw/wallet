<template>
    <div>
        <div class="imgcard">
            <!-- <img src="../../assets/images/telephoneCharges/bg_1.png" alt=""> -->
            <div @click="isShowModel = true" class="p1">账户每月最高可领<span>6.6元话费</span> + <span>3GB流量</span></div>
            <div @click="isShowModel = true" class="rules"></div>
        </div>
        <md-agree class="isAgree" v-model="checked"  @change="hadReadCont">
            我已同意并阅读<span class="readtit" @click.stop="readCont">{{readTitle}}</span>
        </md-agree>
        <div @click="jumpNext" class="btn"></div>
        <div class="rulesModel" v-if="isShowModel">
            <div class="rulesCont">
                <div class="content" v-html="rulesContent.replace(/px/g,'')"></div>
            </div>
            <div class="closeBtn" @click="isShowModel = false">X</div>
        </div>
        <div class="bgWhite" v-if="isShow"></div>
        <!-- 不具备话费开通条件 -->
        <md-popup v-model="noOpenCondition">
            <div class="gotoSetLoose">
            <div class="loseTitle">温馨提示</div>
            <div class="cont">
            <p>{{tipsCont}}</p>
            <md-button type="default" size="small" @click="closeOpenConditionModel">知道了</md-button>
            </div>
            </div>
        </md-popup>
        <check-code-model v-if="showCodeCheck" :Hfbtype="Hfbtype" @closeCodeModel="closeCodeModel"></check-code-model>
        <!-- loading -->
      <div class="loading-toast" v-if="loading">
        <img src="@/assets/images/loading-toast.gif" alt="" />
      </div>

      <div class="tankuang" v-if="tankuang">
        <!-- 未开通浦发银行 -->
        <div class="toast1" v-if="toast1">
            <p class="p1">您还没开通浦发银行电子账户</p>
            <div class="hr"></div>
            <p class="p2">只有开通浦发银行电子账户才能参加活动</p>
            <div class="buttonList">
                <div class="cancel" @click="closeTankuang">放弃开通</div>
                <div class="sure" @click="goSPDB">去开通</div>
            </div>
        </div>
        <!-- 开通流量宝 -->
        <div class="toast2" v-if="toast2">
            <div class="buttonList">
                <div class="cancel" @click="closeTankuang">放弃开通</div>
                <!-- 去开通 -->
                <div class="sure" @click="goOpen"></div> 
            </div>
        </div>
        <!-- 领权益 -->
      </div>

      <div class="toastTankuang" v-if="toast3">
        <div class="toast3">
            <div class="p1">
                您的流量宝活动存在未领取的权益，是否前往领取？
            </div>
            <div class="buttonList">
                <div class="cancel" @click="cancelReceive">放弃领取</div>
                <div class="sure" @click="goLlb">去领取</div>
            </div>
        </div>
      </div>

    </div>
</template>

<script>
import { Agree } from 'mand-mobile';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import checkCodeModel from '@/components/checkCodeModel.vue';

export default {
    data() {
        return {
            checked: false,
            hasread: false,
            isShowModel: false,
            isBackSelect: false,
            readTitle: '《“话费宝”活动参与协议》',
            tipsCont: '',
            isShow: true,
            code: '',
            noOpenCondition: false,
            openStatus: '0', // 开户状态 0未开户 1开户中 2已开户 3其他状态
            showCodeCheck: false,
            isCanOpenHfb: true, // 是否具备开通话费吧资格
            loading: false, // 加载动画
            Hfbtype: '01',
            typeId: '',
            minMoney: 0,
            toast1: false,
            toast2: false,
            toast3: false,
            tankuang: false,
            isllb: false,
            GB: '', // 可领取流量
            rulesContent: '',
            xieyiContent: '',
            isSPDB: false,
        };
    },
    components: {
        [Agree.name]: Agree,
        checkCodeModel
    },
    created() {
        this.typeId = this.$route.query.typeId || 'hfb';
        // 获取金额
        this.getMoneyNum();
    },
    mounted() {
        // this.checkRight();
        // 先查询话费宝开通资格
        this.showHfb();
        this.queryOpen();
        this.queryRules();
        this.queryllb()
        // this.hasread = this.$route.query.hasread || false;
        // this.checked = this.$route.query.isRadio || false;
        // if (this.hasread && this.checked) {
        //     document.getElementsByClassName('md-agree-icon')[0].classList.add('checked');
        // }
    },
    beforeRouteEnter(from,to,next) {
        next(vm => {
            if(to.name == 'agreement') {
                vm.checked = true;
                vm.hasread = true;
            }
        })
    },
    methods: {
        queryllb() {
            // 判断是否开通了流量宝
            api.llb.discharge()
            .then((res) => {
                if (res.code == '02') {
                    // 已开通
                    this.isllb = true;
                    // this.tankuang = true;
                    // this.toast2 = true;
                } else {
                    this.isllb = false;
                    // this.$toast.info(data.msg || data.msgInfo);
                }
            })
            .catch(() => {
                // this.$toast.info(data.msg || data.msgInfo);
            })
        },
        queryRules() {
            api.huataiAgreement({
                businessCode: "hfbhdgz",
                businessType: 'WHOLE'
            })
            .then((res) => {
                this.rulesContent = res.content;
            });
        },
        goSPDB() {
            this.$router.push({
                path: '/openAccount/khEmpower',
                query: {
                    tyId: 'hfb',
                    orgCode: 'SPDB',
                }
            })
        },
        goLlb() {
            this.$router.push({
                path: '/traddicIndex'
            })
        },
        cancelReceive() {
            // 流量宝关闭
            api.llb.closePin()
            .then(data => {
                // this.isllb = false;
                this.queryllb()
                this.queryOpen()
                this.$toast.info('流量宝活动关闭成功',3000);
                setTimeout(() => {
                    this.closeTankuang();
                    this.toast3 = false;
                },3200)
            })
            .catch(err => {
                this.$toast.info(err.msgInfo);
                this.closeTankuang();
                this.toast3 = false;
                this.queryllb()
                this.queryOpen()
            })
        },
        queryOpen() {
            // 流量宝收益查询
            api.llb.initInfo()
            .then(res => {
                this.GB = Number(res.lastFlow)
            })
        },
        goOpen() {
            if(this.GB > 0) {
                this.toast3 = true;
            } else {
                this.cancelReceive()
            }
        },
        readCont() {
            this.hasread = true;
            this.$router.push({
                name: 'agreement',
                query: {
                    isRadio: true,
                    ...this.$route.query
                }
            });
        },
        // 点击确定
        jumpNext() {
            if (!this.hasread) {
                this.$router.push({ 
                  name: 'agreement',
                  query: {
                    ...this.$route.query
                  }
                });
            } else if (!this.checked) {
                this.$toast.info('请先勾选协议');
            } else {
                // 开始校验开户信息
                this.checkRight();
            }
        },
        // 校验资格
        checkRight() {
            this.loading = true;
            // （1）首先查询账户信息
            api.qrySmallChangeAcc().then((data) => {
                // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                if (data.list && data.list.length > 0) {
                    data.list.forEach(item => {
                        if(item.orgCode == 'SPDB') {
                            this.isSPDB = true;
                            if(item.accsts == '01') {
                                // 已开户
                                this.openStatus = '2';
                            } else if(item.accsts == '00') {
                                // 未开户
                                this.openStatus = '0';
                            } else if(item.accsts == '04') {
                                // 开户中
                                this.openStatus = '1';
                            } else {
                                // 其他原因
                                this.openStatus = '3';
                            }
                        } else {
                            // 未开户
                            // this.openStatus = '0';
                        }
                    })
                }

                this.loading = false;

                if(this.isllb) {
                    this.tankuang = true;
                    this.toast2 = true;
                    return
                }
                if (this.openStatus === '0') {
                    // 未开通
                    this.tankuang = true;
                    this.toast1 = true;
                } else if (this.openStatus === '1') {
                    this.tipsCont = '您的账户正在开通中，请稍后重试';
                    this.noOpenCondition = true;
                } else if (this.openStatus === '3') {
                    this.tipsCont = '对不起，您的移动钱包账户不具备话费宝开通条件哦~';
                    this.noOpenCondition = true;
                } else if (this.openStatus === '2' && this.isCanOpenHfb && this.isSPDB) {
                    // 已开户,开始验证码校验
                    this.showCodeCheck = true;
                } else {
                    this.tipsCont = '对不起，您的移动钱包账户不具备话费宝开通条件哦~';
                    this.noOpenCondition = true;
                }
            }).catch((err) => {
                this.loading = false;
                console.log(err.msgInfo);
                // this.$toast.info(err.msgInfo);
            });
        },
        // // 校验资格
        // checkRight() {
        //     this.loading = true;
        //     // （1）首先查询账户信息
        //     api.queryOpenAccount().then((data) => {
        //         // accsts:00 未开户，01正常，02销户，03冻结，04开户中，09开户失败，10本地解约
        //         // 签约关系state:0不存在，1存在（判断身份证存不存在，不存在就是没开户，存在就判断登录手机号与接口返回的手机号是否一样，一样的就走去签约，手机号不一样就去换绑）；2开户中
        //         if (data.state === '0') {
        //             if (data.accsts === '04') {
        //                 // 开户中
        //                 this.openStatus = '1';
        //             } else {
        //                 // 未开户
        //                 this.openStatus = '0';
        //             }
        //         } else if (data.state === '1') {
        //             if (data.accsts === '00' || data.accsts === '09' || data.accsts === '02') {
        //                 // 未开户
        //                 this.openStatus = '0';
        //             } else if (data.accsts === '01') {
        //                 // 已开户
        //                 this.openStatus = '2';
        //             } else if (data.accsts === '04') {
        //                 // 开户中
        //                 this.openStatus = '1';
        //             } else {
        //                 // 其他原因
        //                 this.openStatus = '3';
        //             }
        //         }
        //         store2.default.set('usrmob', data.usrid);
        //         this.loading = false;
        //         if(this.isllb) {
        //             this.tankuang = true;
        //             this.toast2 = true;
        //             return
        //         }
        //         if (this.openStatus === '0') {
        //             // this.$toast.info('您未开通移动钱包,即将进入移动钱包开户页面');
        //             // setTimeout(() => {
        //             //     this.$router.push({
        //             //         name: 'walletAccount',
        //             //         query: {
        //             //             typeId: this.typeId,
        //             //             sourceChannel:this.$route.query.sourceChannel||''
        //             //         }
        //             //     });
        //             // }, 2500);
        //             this.tankuang = true;
        //             this.toast1 = true;
        //             // 未开通
        //         } else if (this.openStatus === '1') {
        //             this.tipsCont = '您的账户正在开通中，请稍后重试';
        //             this.noOpenCondition = true;
        //         } else if (this.openStatus === '3') {
        //             this.tipsCont = '对不起，您的移动钱包账户不具备话费宝开通条件哦~';
        //             this.noOpenCondition = true;
        //         } else if(this.openStatus === '2' && data.orgcode != 'SPDB') {
        //             // 未开通浦发
        //             this.tankuang = true;
        //             this.toast1 = true;
        //         } else if (this.openStatus === '2' && this.isCanOpenHfb && data.orgcode == 'SPDB') {
        //             // 已开户,开始验证码校验
        //             this.showCodeCheck = true;
        //         } else {
        //             this.tipsCont = '对不起，您的移动钱包账户不具备话费宝开通条件哦~';
        //             this.noOpenCondition = true;
        //         }
        //     }).catch((err) => {
        //         this.loading = false;
        //         console.log(err.msgInfo);
        //         // this.$toast.info(err.msgInfo);
        //     });
        // },
        // 短信验证
        checkCode() {

        },
        // 关闭短信验证弹框后，验证通过开通话费宝
        closeCodeModel(val) {
            this.showCodeCheck = false;
            this.loading = false;
            if (val === 'succ') {
                // 验证码校验通过，开通话费宝成功，跳转页面
                this.$router.push({ name: 'viewBenefits' });
            }
        },
        hadReadCont() {
            if (!this.hasread && this.checked) {
                this.$router.push({
                    name: 'agreement',
                    query: {
                        isRadio: true,
                        ...this.$route.query
                    }
                });
            }
        },
        closeOpenConditionModel() {
            this.noOpenCondition = false;
            this.isShow = false;
            this.isCanOpenHfb = false;
        },
        showHfb() {
            this.loading = true;
            api.hfb.qualificationChk({
                entryTx: '',
                mobileNo: store2.default.get('usrmob')
            }).then((data) => {
                this.loading = false;
                if (data.code === '00') { // 不具备开通资格
                    this.isShow = false;
                    this.isCanOpenHfb = false;
                } else if (data.code === '01') { // 具备开通资格
                    this.isShow = false;
                    this.isCanOpenHfb = true;
                } else if (data.code === '02') { // 已开通
                    this.$router.replace({ 
                      name: 'viewBenefits' ,
                      query: this.$route.query
                      });
                } else if (data.code === '03') { // 已解约
                    this.isShow = false;
                    this.isCanOpenHfb = false;
                } else {
                    this.$toast.info(data.msg || data.msgInfo);
                }
            }).catch((err) => {
                this.loading = false;
                this.$toast.info(err.msg || err.msgInfo);
            });
        },
        // 获取收益领取金额
        getMoneyNum() {
            api.hfbConfig({}).then((res) => {
                this.minMoney = res.configAmount / 100;
            });
        },
        closeTankuang() {
            this.tankuang = false;
            this.toast1 = false;
            this.toast2 = false;
        },
    }
};
</script>
<style lang="less" scoped>
.imgcard{
    position: relative;
    overflow: hidden;
    width: 750px;
    height: 1013px;
    background: url('../../assets/images/telephoneCharges/bg_1.png') no-repeat;
    background-size: 100%;
    img{
        width: 100%;
        margin: auto;
    }
    .p1 {
        width: 420px;
        margin: 515px auto 0;
        color: #793B0A;
        font-size: 34px;
        text-align: center;
        span {
            color: #AB4011;
            font-weight: 700;
        }
    }
    .rules{
        position: absolute;
        top: 88px;
        right: 0;
        width: 136px;
        height: 50px;
        background: url('../../assets/images/telephoneCharges/rulesBg.png') no-repeat;
        background-size: 100%;
    }
}
.isAgree{
    margin: 0.37rem 0.42rem 0.22rem;
    font-size: 0.26rem;
    color: #888888;
    .readtit{
        color: #B26643;
    }
}
.btn{
    width: 630px;
    height: 106px;
    background: url('../../assets/images/telephoneCharges/confirmBtn.png') no-repeat;
    background-size: 100%;
    margin: 40px auto 0;
}
.canNot{
    background: #bbb;
}
/deep/.md-agree-icon .md-agree-icon-container .md-icon.md-icon-check{
    color:#888888
}
.rulesModel{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    // background: rgba(0, 0, 0, 0.8);
    background: #444;
    .rulesCont{
        width: 5.9rem;
        height: 5.78rem;
        padding: 0 0.27rem;
        padding-top: 1.44rem;
        background: url('../../assets/images/rules_bg.png') no-repeat;
        background-size: 100% 100%;
        margin: 2.24rem auto 0.29rem;
        .tit{
            font-size: 0.32rem;
            line-height: 0.45rem;
            color: #863900;
            display: flex;
            align-items:center;
            .num{
                width: 0.3rem;
                height: 0.3rem;
                font-size: 0.2rem;
                display: inline-block;
                line-height: 0.3rem;
                text-align: center;
                border-radius: 50%;
                color: #fff;
                background: #994100;
                margin-right: 0.1rem;
            }
        }
        .text{
            font-size: 0.28rem;
            color: #C97A39;
            line-height: 0.4rem;
            padding-bottom: 0.33rem;
            margin-left: 0.4rem;
        }
        .text_1{
            padding-bottom: 0.1rem;
        }
    }
    .closeBtn{
        width: 0.82rem;
        height: 0.82rem;
        line-height: 0.82rem;
        font-size: 0.36rem;
        color: #fff;
        border: 0.02rem solid #fff;
        border-radius: 50%;
        text-align: center;
        margin: 0 auto;
    }
}
.bgWhite{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    background: #eee;
}
.gotoSetLoose{
  width: 5rem;
  background-color: #fff;
  border-radius: 10px;
  padding: .3rem;
  .loseTitle{
    width: 100%;
    height: .6rem;
    text-align: center;
    line-height: .4rem;
    font-size: .38rem;
    text-align: center;
    border-bottom: 0.01rem solid #E1E1E1;
  }
  p{
    font-size: 0.3rem;
    margin-bottom: 30px;
  }
  .cont{
    width: 4rem;
    margin: 0.34rem auto;
  }
}
.loading-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
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
    .toast1 {
        width: 565px;
        height: 510px;
        background: url('../../assets/images/telephoneCharges/toast2.png') no-repeat;
        background-size: 100%;
        .buttonList {
            display: flex;
            justify-content: space-evenly;
            margin-top: 74px;
        }
        .sure {
            width: 200px;
            height: 70px;
            line-height: 70px;
            background-image: linear-gradient(90deg, #FE774D 0%, #F32F0F 100%);
            border-radius: 35px;
            color: #FFFFFF;
            font-size: 28px;
            font-weight: 600;
            text-align: center;
        }
        .cancel {
            width: 200px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #9A6749;
            border-radius: 35px;
            color: #9A6749;
            font-size: 28px;
            font-weight: 600;
            text-align: center;
        }
        .p1 {
            color: #996446;
            font-size: 32px;
            text-align: center;
            font-weight: 500;
            margin-top: 118px;
        }
        .hr {
            width: 430px;
            height: 1px;
            border-bottom: 2px dashed  #F8D4B7;
            margin: 41px auto 25px ;
        }
        .p2 {
            width: 348px;
            color: #7D7D7D;
            font-size: 28px;
            text-align: center;
            font-weight: 500;
            margin: 0 auto;
            line-height: 1.6;
        }
    }
    .toast2 {
        width: 585px;
        height: 610px;
        background: url('../../assets/images/telephoneCharges/toast3.png') no-repeat;
        background-size: 100%;
        .buttonList {
            display: flex;
            justify-content: space-evenly;
            margin-top: 495px;
        }
        .sure {
            width: 334px;
            height: 70px;
            background: url('../../assets/images/telephoneCharges/sure_2.png') no-repeat;
            background-size: 100%;
        }
        .cancel {
            width: 200px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #9A6749;
            border-radius: 35px;
            color: #9A6749;
            font-size: 28px;
            font-weight: 600;
            text-align: center;
        }
    }
}
.toastTankuang {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(2, 2, 2, 0.8);
    z-index: 999;
    .toast3 {
        width: 565px;
        height: 460px;
        background: url('../../assets/images/telephoneCharges/toast4.png') no-repeat;
        background-size: 100%;
        .buttonList {
            display: flex;
            justify-content: space-evenly;
            margin-top: 82px;
        }
        .sure {
            width: 200px;
            height: 70px;
            line-height: 70px;
            background-image: linear-gradient(90deg, #FE774D 0%, #F32F0F 100%);
            border-radius: 35px;
            color: #FFFFFF;
            font-size: 28px;
            font-weight: 600;
            text-align: center;
        }
        .cancel {
            width: 200px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #9A6749;
            border-radius: 35px;
            color: #9A6749;
            font-size: 28px;
            font-weight: 600;
            text-align: center;
        }
        .p1 {
            width: 540px;
            margin: 130px auto 0;
            color: #996446;
            font-size: 32px;
            text-align: center;
            font-weight: 500;
            line-height: 1.6;
        }
    }
}
/deep/ .rulesModel .rulesCont .content{
    width: 590px;
    height: 530px;
    overflow: scroll;
    font-size: 28px;
    line-height: 1.5;
}
</style>
