<template>
    <div class="wrap">
        <div class="bg1">
            <div class="activityRules" @click="showRules"></div>
            <div class="myPrize" @click="showPrize"></div>
        </div>
        <div class="bg2">
            <div class="chongzhi"></div>
            <div class="zs">当日充值多笔仅享1次话费领取资格</div>
            <div class="hb">
                <div class="hb1"></div>
                <div class="hb2"></div>
            </div>
            <!-- 充值 -->
            <div class="chongzhiBtn" v-if=" (!ordList || ordList.length < 1) || (!ordList[0].ordno && !ordList[1].ordno)" @click="paySure">
                <div class="jiaobiao"></div>
            </div>
            <!-- 领取 -->
            <div class="noPay" v-else>
                <div class="firstPay " :class="ordList[0].txsts == '1' || ordList[0].txsts == '2' ? 'hasLingqu' : 'goLingqu' " @click="receive(ordList[0].ordno)"></div>
                <div v-if="ordList.length < 2 " class="secPay gochongzhi" @click="paySure"></div>
                <div v-else class="secPay" :class="ordList[1].txsts == '1' || ordList[1].txsts == '2' ? 'hasLingqu' : 'goLingqu' " @click="receive(ordList[1].ordno)"></div>
            </div>

            <div class="tips">*记得回到活动页面领话费哦～</div>
        </div>
        <div class="bt2"></div>
        <div class="bg3" :class=" chooseBar == '1' ? 'barHeight2' : chooseBar == '2' ? 'barHeight3' : '' ">
            <div class="titleBar">
                <p :class=" chooseBar == '0' ? 'chooseBar' : '' " @click="chooseBar = '0'">认识</p>
                <p :class=" chooseBar == '1' ? 'chooseBar' : '' " @click="chooseBar = '1' ">开通</p>
                <p :class=" chooseBar == '2' ? 'chooseBar' : '' " @click="chooseBar = '2' ">使用</p>
            </div>
            <div class="bar1" v-if="chooseBar == '0' ">
                <div class="num1"></div>
                <p class="numTitle">什么是数字人民币</p>
                <p style="color: #797A7C;font-size: 0.26rem;line-height: 1.5;">数字人民币是由中国人民银行发行的<span style="color: #FE571D;">数字形式的法定货币</span>，与纸钞硬币等价，具有价值特征和法偿性。</p>
                <div class="num2"></div>
                <p class="numTitle">数字人民币的特点</p>
                <div class="intruduce">
                    <div style="display: flex;">
                        <img src="../../assets/images/ZS_shubi/icon1.png" alt="" style="width: 0.87rem;height: 0.87rem;margin: 0.46rem 0.33rem 0.13rem 0.22rem">
                        <div>
                            <p style="color:#712805;font-size: 0.30rem;font-weight: 600;margin: 0.36rem 0 0 0">支付更快捷</p>
                            <p style="font-size: 0.26rem;color: #797A7C;font-weight: 900;margin-top: 0.08rem;line-height: 1.3">和现金人民币一样，支付即结算，无需经过第三方平台。</p>
                        </div>
                    </div>
                    <div style="display: flex;margin-top: 0.1rem">
                        <img src="../../assets/images/ZS_shubi/iocn2.png" alt="" style="width: 0.87rem;height: 0.87rem;margin: 0.46rem 0.33rem 0.13rem 0.22rem">
                        <div>
                            <p style="color:#712805;font-size: 0.3rem;font-weight: 600;margin: 0.36rem 0 0 0">支付使用更方便</p>
                            <p style="font-size: 0.26rem;color: #797A7C;font-weight: 900;margin-top: 0.08rem;line-height: 1.3">可以通过手机等电子设备进行支付，收、付款双方没有网络也可支付。</p>
                        </div>
                    </div>
                    <div style="display: flex;margin: 0.1rem 0 0.1rem 0;">
                        <img src="../../assets/images/ZS_shubi/icon3.png" alt="" style="width: 0.87rem;height: 0.87rem;margin: 0.46rem 0.33rem 0.13rem 0.22rem">
                        <div>
                            <p style="color:#712805;font-size: 0.3rem;font-weight: 600;margin: 0.36rem 0 0 0">安全可靠</p>
                            <p style="font-size: 0.26rem;color: #797A7C;font-weight: 900;margin: 0.08rem 0 0.1rem 0;line-height: 1.3">数字人民币采取高级加密技术，可以有效防止资金损失和交易过程中的信息泄露。</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bar2" v-if="chooseBar == '1' ">
                <div class="num1"></div>
                <p class="numTitle">下载APP</p>
                <p style="color: #797A7C;font-size: 0.26rem;line-height: 1.5;">应用商店搜索“数字人民币”</p>
                <div style="width: 4.11rem;height: 3.5rem;margin: 0.26rem auto 0">
                    <img src="../../assets/images/ZS_shubi/tu1.png" alt="" style="width: 100%;height: 100%;">
                </div>

                <div class="num2" style="margin-top: 0.26rem;"></div>
                <p class="numTitle">注册开通</p>
                <p style="font-size: 0.26rem;color: #797A7C;font-weight: 900;margin-top: 0.08rem;line-height: 1.3">操作路径:数字人民币app—<span style="color: #FE571D;">我的—开通/添加钱包—选择招商银行</span>，输入手机号等<span style="color: #FE571D;">身份识别信息</span>，完成注册开通。</p>
                <div style="width: 4.11rem;height: 3.69rem;margin: 0.26rem auto 0">
                    <img src="../../assets/images/ZS_shubi/tu2.png" alt="" style="width: 100%;height: 100%;">
                </div>
                <p style="width: 100%;text-align: center;color: #797A7C;font-size: 0.26rem;line-height: 1.5;margin-top: 0.38rem">请使用{{userNumber}}登陆数字人民币app</p>

                <div class="num3" style="margin-top: 0.3rem"></div>
                <p class="numTitle">钱包充值</p>
                <p style="color: #797A7C;font-size: 0.26rem;line-height: 1.5;margin-bottom: 0.24rem;">充值钱包余额后即可使用</p>
                <div style="display: flex;justify-content: space-between;">
                    <img src="../../assets/images/ZS_shubi/tu3-1.png" alt="" style="width: 3.15rem;height: 3.22rem;">
                    <img src="../../assets/images/ZS_shubi/tu3-2.png" alt="" style="width: 3.15rem;height: 3.22rem;">
                </div>
                <p style="color: #797A7C;font-size: 0.26rem;width: 100%;text-align: center;margin-top: 0.37rem;">绑定银行卡充钱后即升级为二类钱包</p>
                <p style="color: #797A7C;font-size: 0.26rem;width: 100%;text-align: center;margin: 0.1rem 0 0.2rem 0;">也可选择手机银行转入</p>

            </div>
            <div class="bar3" v-if="chooseBar == '2' ">
                <p style="color: #797A7C;font-size: 0.28rem;line-height: 1.5;margin-bottom: 0.24rem;">为保证活动奖品顺利到账，开通招商银行数字人民币钱包的手机号码需与<span style="color: #FE571D;">被充值号码一致。</span></p>
                <div class="num1"></div>
                <p class="numTitle">进入充值中心收银台</p>
                <p style="color: #797A7C;font-size: 0.26rem;line-height: 1.5;margin-bottom: 0.24rem;">选择数字人民币支付-选择招商银行钱包</p>
                <div style="width: 4.32rem;margin: 0.36rem auto 0">
                    <img src="../../assets/images/ZS_shubi/tu.png" alt="" style="width: 100%;height: 100%;">
                </div>
            </div>
        </div>


        <div class="tankuang" v-if="tankuang">
            <div class="rules" v-if="toast1">
                <span class="rulesTile">活动规则</span>
                <div class="rulesText" v-html="agreementContent.replace(/px/g,'')"></div>
            </div>
            <div class="prize" v-if="toast2">
                <span>我的奖品</span>
                <div class="content">
                    <div v-for="(item,index) in rightList" :key="index" style="display: flex;justify-content: space-between;margin-top: 0.1rem;background: #FDF9F3;">
                        <p>{{item.actnm}}</p>
                        <p>{{item.txdt}}</p>
                        <p :class="item.txsts == '已领取' ? 'marSty' : '' ">{{item.txsts}}</p>
                    </div>
                </div>
            </div>
            <div class="prize_2" v-if="toast3">
                <span>我的奖品</span>
                <div class="btn" @click="paySure"></div>
            </div>
            <div class="suc" v-if="toast4">
                <div class="ok" @click="closeTankuang"></div>
            </div>
            <div class="error" v-if="toast5">
                <span>啊哦 网络崩溃了~</span>
                <div class="wait" @click="closeTankuang"></div>
            </div>
            <div class="finish" v-if="toast6">
                <span>看看其他活动吧！</span>
                <div class="btn" @click="closeTankuang"></div>
            </div>
            <div class="fail" v-if="toast7">
                <span>您来晚了，奖品已发放完了~</span>
                <div class="btn" @click="closeTankuang"></div>
            </div>
            <div class="saleOut" v-if="toast8">
                <div class="btn1" @click="closeTankuang"></div>
                <div class="btn2" @click="goPay"></div>
            </div>
            <div class="close" @click="closeTankuang"></div>
        </div>
    </div>
</template>

<script>
import api from "../../common/apiUrls";
import * as store2 from '@/common/localstore';
export default {
    name: "ZS_shubi",
    data() {
        return {
            chooseBar: '0',
            tankuang: false,
            toast1: false,
            toast2: false,
            toast3: false,
            toast4: false,
            toast5: false,
            toast6: false,
            toast7: false,
            toast8: false,
            ordList: [],
            rightList: [],
            isClick: true,
            agreementContent: '',
            userNumber: store2.default.get('usrmob').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        }
    },
    created() {
        this.huataiAgreement()
        this.rightQueryList()
        this.queryOrd()
    },
    methods: {
        huataiAgreement() {
            api.huataiAgreement({
                businessCode: "zssbhdgz",
                businessType: 'WHOLE'
            })
            .then((res) => {
                this.agreementContent = res.content
            });
        },
        showRules() {
            this.tankuang = true;
            this.toast1 = true;
            this.overHidden(false);
        },
        showPrize() {
            if(this.rightList.length > 0) {
                this.tankuang = true;
                this.toast2 = true;
                this.overHidden(false);
            } else {
                this.tankuang = true;
                this.toast3 = true;
                this.overHidden(false);
            }
        },
        paySure() {
            this.tankuang = true;
            this.toast8 = true;
        },
        goPay() {
            this.closeTankuang()
            window.location.href = 'https://wap.js.10086.cn/vw/WSCZYL?payType=28'
            // window.location.href = 'http://wap.js.10086.cn/vw/WSCZYLOne?shareToken=PtsgYEZ/5H3LAVo/Ip2ocA==&rm=ydc'
        },
        receive(id) {
            if(!this.isClick) {
                return
            }
            this.isClick = false;
            this.$store.commit('LOADING', true);
            api.rightReceive({
                ordno: id
            })
            .then(res => {
                this.$store.commit('LOADING', false);
                console.log('--receive--',res)
                this.isClick = true;
                if(res.msgCd == 'RPM99806') {
                    // 活动结束
                    this.tankuang = true;
                    this.toast6 = true;
                    this.overHidden(false);
                } else if(res.msgInfo.indexOf('已抢完') > -1) {
                    // 已领完
                    this.tankuang = true;
                    this.toast7 = true;
                } else {
                    this.rightQueryList();
                    this.queryOrd(id);
                }
            })
            .catch(err => {
                this.$store.commit('LOADING', false);
                this.isClick = true;
                if(err.msgInfo.indexOf('已抢完') > -1) {
                    // 已领完
                    this.tankuang = true;
                    this.toast7 = true;
                } else {
                    this.$toast.info(err.msgInfo)
                }
            })
        },
        closeTankuang() {
            this.tankuang = false;
            this.toast1 = false;
            this.toast2 = false;
            this.toast3 = false;
            this.toast4 = false;
            this.toast5 = false;
            this.toast6 = false;
            this.toast7 = false;
            this.toast8 = false;
            this.overHidden(true)
        },
        overHidden(type) {
            if(type) {
                document.documentElement.style.overflow = ''
                document.body.style.overflow = ''
            } else {
                document.documentElement.style.overflow = 'hidden'
                document.body.style.overflow = 'hidden'
            }
        },
        // 订单查询
        queryOrd(id) {
            api.queryOrd()
            .then(res =>{
                console.log('++',res);
                this.ordList = res.orderList
                this.ordList.sort(function (a,b) {
                   return a.ordno - b.ordno
                })
                if(id) {
                    this.ordList.forEach(data => {
                        if(data.ordno == id) {
                            if(data.txsts == '1') {
                                this.tankuang = true;
                                this.toast4 = true;
                                this.overHidden(false);
                            } else {
                                this.$toast.info('请检查手机号是否符合活动要求')
                            }
                        }
                    })
                }
            })
            .cathch(err => {
                console.log('------',err)
            })
        },
        // 奖品查询
        rightQueryList() {
            api.rightQueryList({
                capchl: 'DCPAY'
            })
            .then(res => {
                console.log('++',res);
                this.rightList = res.rightList;
                this.rightList.forEach(data => {
                    if(data.txsts == '1') {
                        data.txsts = '已领取'
                    } else {
                        data.txsts = '领取失败'
                    }
                    data.txdt = data.txdt.slice(0,4) + '.' + data.txdt.slice(4,6) + '.' + data.txdt.slice(6,8)
                })
            })
            .catch(err => {
                console.log('------',err)
            })
        },
    }
}

</script>

<style scoped lang="less">
.wrap {
    background: #FEF8EF;
    overflow: hidden;
}
.bg1 {
    position: relative;
    width: 100%;
    height: 883px;
    background: url('~@/assets/images/ZS_shubi/bg_1.png') no-repeat;
    background-size: 100%;
    .activityRules {
        position: absolute;
        top: 240px;
        right: -5px;
        width: 93px;
        height: 38px;
        background: url('~@/assets/images/ZS_shubi/activityRules.png') no-repeat;
        background-size: 100%;
    }
    .myPrize {
        position: absolute;
        top: 290px;
        right: -5px;
        width: 93px;
        height: 38px;
        background: url('~@/assets/images/ZS_shubi/myPrize.png') no-repeat;
        background-size: 100%;
    }
}
.bg2 {
    position: relative;
    width: 705px;
    height: 662px;
    border-radius: 40px 40px 40px 40px;
    background: #FFFFFF;
    margin: -223px auto 0;
    box-shadow: 0px 0px 50px 0px rgba(246, 219, 178, 100);
    .chongzhi {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        top: -20px;
        width: 348px;
        height: 75px;
        background: url('~@/assets/images/ZS_shubi/chongzhi.png') no-repeat;
        background-size: 100%;
    }
    .zs {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        top: 70px;
        width: 589px;
        height: 25px;
        background: url('~@/assets/images/ZS_shubi/zs.png') no-repeat;
        background-size: 100%;
        color: #712805;
        font-size: 28px;
        text-align: center;
        line-height: 1;
    }
    .hb1 {
        position: absolute;
        left: 46px;
        top: 124px;
        width: 284px;
        height: 261px;
        background: url('~@/assets/images/ZS_shubi/hb1_1.png') no-repeat;
        background-size: 100%;
    }
    .hb2 {
        position: absolute;
        right: 46px;
        top: 124px;
        width: 284px;
        height: 261px;
        background: url('~@/assets/images/ZS_shubi/hb1_1.png') no-repeat;
        background-size: 100%;
    }
    .chongzhiBtn {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        bottom: 100px;
        width: 422px;
        height: 113px;
        background: url('~@/assets/images/ZS_shubi/chongzhiBtn.png') no-repeat;
        background-size: 100%;
        .jiaobiao {
            position: absolute;
            right: 0;
            top: -35px;
            width: 159px;
            height: 49px;
            background: url('~@/assets/images/ZS_shubi/jiaobiao.png') no-repeat;
            background-size: 100%;
        }
    }
    .tips {
        position: absolute;
        bottom: 42px;
        width: 100%;
        color: #712805;
        font-size: 28px;
        text-align: center;
    }
    .goLingqu {
        position: absolute;
        width: 265px;
        height: 75px;
        background: url('~@/assets/images/ZS_shubi/goLinqu.png') no-repeat;
        background-size: 100%;
    }
    .hasLingqu {
        position: absolute;
        width: 265px;
        height: 75px;
        background: url('~@/assets/images/ZS_shubi/hasLingqu.png') no-repeat;
        background-size: 100%;
        pointer-events: none;
    }
    .gochongzhi {
        position: absolute;
        width: 265px;
        height: 75px;
        background: url('~@/assets/images/ZS_shubi/gopayBtn.png') no-repeat;
        background-size: 100% 100%;
    }
    .firstPay {
        top: 448px;
        left: 56px;
    }
    .secPay {
        top: 448px;
        right: 53px;
    }
}
.bt2 {
    margin: 50px auto 28px;
    width: 612px;
    height: 38px;
    background: url('~@/assets/images/ZS_shubi/bt2.png') no-repeat;
    background-size: 100%;
}
.bg3 {
    overflow: auto;
    box-sizing: border-box;
    padding: 36px 12px 0 36px;
    width: 705px;
    //height: 992px;
    border-radius: 40px 40px 40px 40px;
    background: #FFFFFF;
    margin: 0 auto 63px;
    box-shadow: 0px 0px 50px 0px rgba(246, 219, 178, 100);
    .titleBar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 28px;
        p {
            width: 202px;
            height: 77px;
            line-height: 77px;
            color: #7B7A79;
            font-size: 32px;
            font-weight: 500;
            text-align: center;
        }
        .chooseBar {
            background-image: linear-gradient(0deg, #FFFFFF 0%, #FFD676 100%);
            border-radius: 18px 18px 18px 18px;
            color: #221906;
            font-weight: 700;
        }
    }
    .num1 {
        width: 110px;
        height: 81px;
        background: url('~@/assets/images/ZS_shubi/01.png') no-repeat;
        background-size: 100%;
    }
    .num2 {
        margin-top: 40px;
        width: 123px;
        height: 81px;
        background: url('~@/assets/images/ZS_shubi/02.png') no-repeat;
        background-size: 100%;
    }
    .num3 {
        margin-top: 40px;
        width: 123px;
        height: 81px;
        background: url('~@/assets/images/ZS_shubi/03.png') no-repeat;
        background-size: 100%;
    }
    .numTitle {
        color: #712805;
        font-size: 34px;
        font-weight: 900;
        margin: -40px 0 20px 0;
    }
    .intruduce {
        box-sizing: border-box;
        padding: 0 17px 0 0;
        width: 650px;
        //height: 503px;
        border-radius: 20px 20px 20px 20px;
        margin: 0 0 10px -8px;
        background: #fdf9f3;
    }
}
.barHeight2 {
    //height: 1992px;
}
.barHeight3 {
    //height: 892px;
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
    background: rgba(2, 2, 2, 0.8);
    z-index: 999;
    .rules {
        position: relative;
        width: 686px;
        height: 816px;
        background: url('~@/assets/images/ZS_shubi/toast1.png') no-repeat;
        background-size: 100%;
        .rulesTile {
            position: absolute;
            top: 32px;
            left: 50%;
            transform: translateX(-50%);
            color: #681300;
            font-size: 38px;
            font-weight: 900;
        }
        .rulesText {
            width: 528px;
            height: 580px;
            margin: 140px auto 0;
            font-size: 30px;
            font-weight: 500;
            text-align: left;
            line-height: 1.6;
            overflow: scroll;
            .title {
                margin-top: 5px;
            }
        }
    }
    .prize {
        position: relative;
        width: 686px;
        height: 526px;
        background: url('~@/assets/images/ZS_shubi/toast2.png') no-repeat;
        background-size: 100%;
        span {
            position: absolute;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            color: #681300;
            font-size: 38px;
            font-weight: 900;
        }
        .content {
            overflow: scroll;
            position: absolute;
            left: 80px;
            top: 220px;
            width: 520px;
            height: 140px;
            background: #FFFFFF;
            p {
                color: #712805;
                font-size: 34px;
                font-weight: 700;
            }
        }
    }
    .prize_2 {
        position: relative;
        width: 686px;
        height: 526px;
        background: url('~@/assets/images/ZS_shubi/toast3.png') no-repeat;
        background-size: 100%;
        span {
            position: absolute;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            color: #681300;
            font-size: 38px;
            font-weight: 900;
        }
        .btn {
            position: absolute;
            left: 210px;
            bottom: 121px;
            width: 265px;
            height: 75px;
            background: url('~@/assets/images/ZS_shubi/gopayBtn.png') no-repeat;
            background-size: 100%;
        }
    }
    .suc {
        position: relative;
        width: 686px;
        height: 691px;
        background: url('~@/assets/images/ZS_shubi/suc.png') no-repeat;
        background-size: 100%;
        .ok {
            position: absolute;
            left: 212px;
            bottom: 125px;
            width: 265px;
            height: 75px;
            background: url('~@/assets/images/ZS_shubi/ok.png') no-repeat;
            background-size: 100%;
        }
    }
    .error {
        position: relative;
        width: 686px;
        height: 572px;
        background: url('~@/assets/images/ZS_shubi/error_2.png') no-repeat;
        background-size: 100%;
        span {
            position: absolute;
            left: 220px;
            bottom: 247px;
            color: #681300;
            font-weight: 600;
            font-size: 32px;
        }
        .wait {
            position: absolute;
            left: 212px;
            bottom: 105px;
            width: 265px;
            height: 75px;
            background: url('~@/assets/images/ZS_shubi/wait.png') no-repeat;
            background-size: 100%;
        }
    }
    .finish {
        position: relative;
        width: 686px;
        height: 582px;
        background: url('~@/assets/images/ZS_shubi/finish.png') no-repeat;
        background-size: 100%;
        span {
            position: absolute;
            left: 226px;
            bottom: 237px;
            color: #681300;
            font-weight: 600;
            font-size: 32px;
        }
        .btn {
            position: absolute;
            left: 212px;
            bottom: 105px;
            width: 265px;
            height: 75px;
            background: url('~@/assets/images/ZS_shubi/iknow.png') no-repeat;
            background-size: 100%;
        }
    }
    .fail {
        position: relative;
        width: 686px;
        height: 582px;
        background: url('~@/assets/images/ZS_shubi/failBg.png') no-repeat;
        background-size: 100%;
        span {
            position: absolute;
            left: 153px;
            bottom: 237px;
            color: #681300;
            font-weight: 600;
            font-size: 32px;
        }
        .btn {
            position: absolute;
            left: 211px;
            bottom: 105px;
            width: 265px;
            height: 75px;
            background: url('~@/assets/images/ZS_shubi/iknow.png') no-repeat;
            background-size: 100%;
        }
    }
    .saleOut {
        position: relative;
        width: 686px;
        height: 693px;
        background: url('~@/assets/images/ZS_shubi/saleOut_bg.png') no-repeat;
        background-size: 100%;
        .btn1 {
            position: absolute;
            top: 436px;
            left: 99px;
            width: 222px;
            height: 75px;
            background: url('~@/assets/images/ZS_shubi/cancel_btn.png') no-repeat;
            background-size: 100%;
        }
        .btn2 {
            position: absolute;
            top: 436px;
            right: 99px;
            width: 222px;
            height: 75px;
            background: url('~@/assets/images/ZS_shubi/sure_btn.png') no-repeat;
            background-size: 100%;
        }
    }
    .close {
        margin: 20px 0 0 0;
        width: 53px;
        height: 53px;
        background: url('~@/assets/images/ZS_shubi/close.png') no-repeat;
        background-size: 100%;
    }
}
.marSty {
    margin-left: 34px;
}
</style>