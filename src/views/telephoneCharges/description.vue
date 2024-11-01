<template>
    <div>
        <div class="imgcard">
            <img src="../../assets/images/description.png" alt="">
            <div @click="isShowModel = true" class="rules">活动规则</div>
        </div>
        <md-agree class="isAgree" v-model="checked"  @change="hadReadCont">
            我已同意并阅读<span class="readtit" @click.stop="readCont">{{readTitle}}</span>
        </md-agree>
        <div @click="jumpNext" class="btn">确认</div>
        <div class="rulesModel" v-if="isShowModel">
            <div class="rulesCont">
                <div style="height:5rem;overflow:auto">
                    <div class="tit">
                        <span class="num">1</span>
                        <span>活动时间</span>
                    </div>
                    <div class="text">
                        即日起-2023年3月31日
                    </div>
                    <div class="tit">
                        <span  class="num">2</span>
                        <span>活动对象</span>
                    </div>
                    <div class="text">
                        江苏移动手机用户（非实名制客户、M-Free卡客户、20元封顶、CMWAP免费类客户、 金卡快捷通、快捷通、随E行、无线固话、无线通、专业卡、合并付费副号码、号码销户及停机客户除外）
                    </div>
                    <div class="tit">
                        <span  class="num">3</span>
                        <span>活动说明</span>
                    </div>
                    <div class="text text_1">（1）参加活动后，江苏移动将以您钱包账户余额为基准计算话费赠送金额，您可于参与活动T+2日至掌厅 - 仪表盘【钱包】-【话费宝】领取赠送的话费；</div>
                    <div class="text text_1">（2）赠送话费金额以钱包账户日终（当日23:30-次日03:00）余额年化不低于5%测算；</div>
                    <div class="text text_1">（3）钱包单账户余额不超过2000元；</div>
                    <div class="text text_1">（4）江苏移动赠送给您的话费随时可领取，领取后将于3个工作日内发放至您钱包开户手机号对应的优惠账本，不可转账、提现、开票，不可用于话费购物或参加其他活动。</div>
                    <div class="text text_1">（5）在领取话费当月，您无法办理手机号销户、过户、停机业务。</div>
                </div>
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

      <md-popup v-model="showPop" :mask-closable="false">
        <div class="gotoSetLoose">
            <div class="loseTitle">温馨提示</div>
            <div class="cont">
                <p style="text-align: center;">活动已下线</p>
                <!-- <div class="btnBox">
                    <md-button type="default" size="small" @click="confuse">知道了</md-button>
                </div> -->
            </div>
        </div>
    </md-popup>

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
            openStatus: '', // 开户状态 0未开户 1开户中 2已开户 3其他状态
            showCodeCheck: false,
            isCanOpenHfb: true, // 是否具备开通话费吧资格
            loading: false, // 加载动画
            Hfbtype: '01',
            typeId: '',
            minMoney: 0,
            showPop: true,
        };
    },
    components: {
        [Agree.name]: Agree,
        checkCodeModel
    },
    created() {
        this.typeId = this.$route.query.typeId || 'hfb';
        // 获取金额
        // this.getMoneyNum();
    },
    mounted() {
        // this.checkRight();
        // 先查询话费宝开通资格
        // this.showHfb();
        this.hasread = this.$route.query.hasread || false;
        this.checked = this.$route.query.isRadio || false;
        if (this.hasread && this.checked) {
            document.getElementsByClassName('md-agree-icon')[0].classList.add('checked');
        }
    },
    methods: {
        readCont() {
            this.hasread = true;
            this.$router.push({
                name: 'agreement',
                query: {
                    isRadio: false
                }
            });
        },
        // 点击确定
        jumpNext() {
            if (!this.hasread) {
                this.$router.push({ name: 'agreement' });
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
            api.queryOpenAccount().then((data) => {
                // accsts:00 未开户，01正常，02销户，03冻结，04开户中，09开户失败，10本地解约
                // 签约关系state:0不存在，1存在（判断身份证存不存在，不存在就是没开户，存在就判断登录手机号与接口返回的手机号是否一样，一样的就走去签约，手机号不一样就去换绑）；2开户中
                if (data.state === '0') {
                    if (data.accsts === '04') {
                        // 开户中
                        this.openStatus = '1';
                    } else {
                        // 未开户
                        this.openStatus = '0';
                    }
                } else if (data.state === '1') {
                    if (data.accsts === '00' || data.accsts === '09' || data.accsts === '02') {
                        // 未开户
                        this.openStatus = '0';
                    } else if (data.accsts === '01') {
                        // 已开户
                        this.openStatus = '2';
                    } else if (data.accsts === '04') {
                        // 开户中
                        this.openStatus = '1';
                    } else {
                        // 其他原因
                        this.openStatus = '3';
                    }
                }
                store2.default.set('usrmob', data.usrid);
                this.loading = false;
                if (this.openStatus === '0') {
                    this.$toast.info('您未开通移动钱包,即将进入移动钱包开户页面');
                    setTimeout(() => {
                        this.$router.push({
                            name: 'walletAccount',
                            query: {
                                typeId: this.typeId,
                                sourceChannel:this.$route.query.sourceChannel||''
                            }
                        });
                    }, 2500);
                } else if (this.openStatus === '1') {
                    this.tipsCont = '您的账户正在开通中，请稍后重试';
                    this.noOpenCondition = true;
                } else if (this.openStatus === '3') {
                    this.tipsCont = '对不起，您的移动钱包账户不具备话费宝开通条件哦~';
                    this.noOpenCondition = true;
                } else if (this.openStatus === '2' && this.isCanOpenHfb) {
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
                        isRadio: true
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
                    this.$router.replace({ name: 'viewBenefits' });
                } else if (data.code === '03') { // 已解约
                    this.isShow = false;
                    this.isCanOpenHfb = false;
                } else {
                    this.$toast.info(data.msg || data.msgInfo);
                }
            }).catch((err) => {
                this.loading = false;
                // this.$toast.info(err.msg || err.msgInfo);
            });
        },
        // 获取收益领取金额
        getMoneyNum() {
            api.hfbConfig({}).then((res) => {
                this.minMoney = res.configAmount / 100;
            });
        }
    }
};
</script>
<style lang="less" scoped>
.imgcard{
    background: url('../../assets/images/description_bg.png') no-repeat;
    padding: 0.87rem 0.25rem 0;
    background-size: contain;
    position: relative;
    img{
        width: 100%;
        margin: auto;
    }
    .rules{
        width: 2.01rem;
        height: 0.6rem;
        border: 2px solid #ae601f;
        color: #ae601f;
        font-size: 0.34rem;
        text-align: center;
        line-height: 0.6rem;
        border-radius: 0.49rem;
        position: absolute;
        font-weight: 400;
        top: 4.5rem;
        left: 2.78rem;
    }
}
.isAgree{
    margin: 0.37rem 0.42rem 0.22rem;
    font-size: 0.26rem;
    color: #888888;
    .readtit{
        color: #643F2B;
    }
}
.btn{
    width: 6.9rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.36rem;
    text-align: center;
    background-image: linear-gradient(#FFDEB4, #DC946C);
    color: #fff;
    margin: 0 auto;
    border-radius: 0.5rem;
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

</style>
