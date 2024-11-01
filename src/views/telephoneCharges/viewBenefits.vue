<template>
    <div class="content">
        <div id="D01" class="exple" @click="isShowModel = true">
            <img alt="" src="@/assets/images/traddic/exples.png" />
        </div>
        <div class="rulesModel" v-if="isShowModel">
            <div class="rulesCont">
                <div class="content" v-html="rulesContent.replace(/px/g,'')"></div>
            </div>
            <div class="closeBtn" @click="isShowModel = false">X</div>
        </div>
        <div class="main">
            <div class="telephoneCard">
                <div class="top">
                    <div class="item">
                        <div class="tit">
                            <span>钱包余额</span>
                            <div class="md-example-item-s" style="display:inline-block" @click="isShowNum">
                                <md-icon :name="visibleShow" size="lg"></md-icon>
                            </div>
                        </div>
                        <div v-if="!isShowCharge" class="num" style="text-align:center">
                            <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                        </div>
                        <div v-else class="num">
                            <span style="font-weight: 700;">{{ visibleShow === 'visible' ? money : noShowNum }}</span>
                            <div class="btn" @click="recharge">充值</div>
                        </div>
                    </div>
                    <!-- <div class="item">
                        <div class="tit">
                            <span>待领取话费(元)</span>
                        </div>
                        <div v-if="!isShowIncome" class="num" style="text-align:center">
                            <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                        </div>
                        <div v-else class="num">
                            <span>{{ visibleShow === 'visible' ? profit : noShowNum }}</span>
                            <div v-if="profit && Number(profit) >= 0.01" class="btn" @click="receivIncome">领取</div>
                        </div>
                    </div> -->
                </div>
                <div class="bottom">
                    <div class="yesterday" style="width: 2.85rem;">
                        <p class="tit">待领取话费(元)</p>
                        <div style="display: flex;align-items: center;">
                            <p class="num">
                                {{ visibleShow === 'visible' ? profit : noShowNum }}
                            </p>
                            <div v-if="profit && Number(profit) >= 0.01" class="receive" @click="receivIncome('01')">领取</div>
                        </div>
                    </div>
                    <div class="total" style="width: 2.85rem;margin-left: 1rem;">
                        <p class="tit">待领取流量(GB)</p>
                        <div style="display: flex;align-items: center;">
                            <p class="num">
                                {{ visibleShow === 'visible' ? lprofit : noShowNum }}
                            </p>
                            <div v-if="profit && Number(lprofit) >= 0.01" class="receive" @click="receiveTankuang('02')">领取</div>
                        </div>
                    </div>
                    <!-- <div class="income">
                        <p class="tit">已领取话费(元)</p>
                        <p class="num" @click="jumpToTotal('income')">{{ visibleShow === 'visible' ? incomeList.income : noShowNum }}</p>
                    </div> -->
                </div>
            </div>

            <div class="card2">
                <div class="square">
                    <p>昨日话费(元)</p>
                    <p class="edu">{{ visibleShow === 'visible' ? incomeList.yesterday : noShowNum }}</p>
                </div>
                <div class="square">
                    <p>累计话费(元)</p>
                    <p class="edu" @click="jumpToTotal('totalBill')">{{ visibleShow === 'visible' ? incomeList.totalget : noShowNum }}</p>
                </div>
                <div class="square">
                    <p>已领取话费(元)</p>
                    <p class="edu" @click="jumpToTotal('incomeBill')">{{ visibleShow === 'visible' ? incomeList.income : noShowNum }}</p>
                </div>
            </div>
            <div class="card3">
                <div class="square">
                    <p>昨日流量(GB)</p>
                    <p class="edu">{{ visibleShow === 'visible' ? lincomeList.lyesterday : noShowNum }}</p>
                </div>
                <div class="square">
                    <p>累计流量(GB)</p>
                    <p class="edu" @click="jumpToTotal('totalFlow')">{{ visibleShow === 'visible' ? lincomeList.ltotalget : noShowNum }}</p>
                </div>
                <div class="square">
                    <p>已领取流量(GB)</p>
                    <p class="edu" @click="jumpToTotal('incomeFlow')">{{ visibleShow === 'visible' ? lincomeList.lincome : noShowNum }}</p>
                </div>
            </div>

            <div class="text">
                <div style="display: flex;justify-content: flex-start;">
                    <div class="org_square"></div>
                    <p class="tit">活动说明</p>
                </div>
                <!-- <p>1、钱包账户余额不超过2000元；</p>
                <p>将以您钱包账户余额为基准计算话费赠送金额和流量，账户余额达1000元起计，活动期间，您可于参与活动T+2日起至话费宝页面领取赠送的权益， <span style="font-weight: 600;">话费权益领取有效期为当月，流量权益领取有效期为当日。</span> </p>
                <p>3、赠送话费金额以钱包账户日终（当日23:30-次日03:00）余额年化不低于3%测算，流量每日可领100MB；</p>
                <p>4、话费单次最高可领取金额为10元，高于10元可分多次领取；</p>
                <p>领取后的权益将于3个工作日内发放至您钱包开户手机号对应的优惠账本，不可转账、提现、开票，不可用于话费购物或参加其他活动；所赠话费不可滚存、兑换、共享或赠送他人使用，当月有效；赠送流量符合国内移动数据流量封顶规则。</p>
                <p>6、用户在领取话费或流量当月不得办理销户、过户、报停业务；</p>
                <p>7、领取成功后，话费请至“充值中心-充值记录”中查询到账情况；流量至在“中国移动江苏APP-查询服务-套餐余量”查询对应流量发放和使用记录。{{ minMoney > 0 ? '；' : '。' }}</p>
                <p v-if="minMoney > 0">8、自2022年2月16日起，参与话费宝活动用户钱包余额>={{ minMoney }}元享话费赠送。</p> -->
                <div class="activityContent" v-html="activityContent.replace(/px/g,'')"></div>
            </div>
        </div>
        <!-- 领取成功提示 -->
        <md-popup v-model="isReactiveSucc">
            <div class="reactiveModel">
                <div class="loseTitle" v-if="reactiveType == '01' ">话费领取成功！</div>
                <div class="loseTitle" v-else-if="reactiveType == '02' ">流量领取成功！</div>
                <div class="loseTitle" v-else>领取成功！</div>
                <div class="cont">
                    <p> （预计3个工作日内到账）</p>
                    <md-button size="small" type="default" @click="isReactiveSucc = false">知道了</md-button>
                </div>
            </div>
        </md-popup>
        <!-- 领取失败提示 -->
        <md-popup v-model="isReactiveFail">
            <div class="reactiveModel">
                <div class="loseTitle" v-if="reactiveType == '01' ">话费领取失败！</div>
                <div class="loseTitle" v-else-if="reactiveType == '02' ">流量领取失败！</div>
                <div class="loseTitle" v-else>领取失败！</div>
                <div class="cont">
                    <p>{{ errReason }}</p>
                    <md-button size="small" type="default" @click="isReactiveFail = false">知道了</md-button>
                </div>
            </div>
        </md-popup>

        <div class="tankuang" v-if="tankuang">
            <div class="toast1">
                <p>是否领取{{lprofit}}GB流量？</p>
                <div class="buttonList">
                    <div class="cancel" @click="tankuang = false">取消</div>
                    <div class="sure" @click="receivIncome(receiveType)"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';

export default {
    data() {
        return {
            isShowModel:false,
            visibleShow: 'visible',
            noShowNum: '****',
            money: '',
            profit: '0.00',
            lprofit: '0.00',
            incomeList: {
                yesterday: '暂无',
                totalget: '0.00',
                income: '0.00'
            },
            lincomeList: {
                lyesterday: '暂无',
                ltotalget: '0.00',
                lincome: '0.00'
            },
            // 余额和话费收益是否显示
            isShowCharge: false,
            isShowIncome: false,
            // 领取结果弹框显示
            isReactiveSucc: false,
            reactiveType: '',
            isReactiveFail: false,
            myJumpBank: null,
            timer: null,
            errReason: '',
            minMoney: 0,
            noreceive: '0.00',
            tankuang: false,
            receiveType: '',
            rulesContent: '',
            activityContent: '',
            isClick: true,
        };
    },
    mounted() {
        api.hfb.initBalance()
            .then((res) => {
                this.money = res.balance;
                this.isShowCharge = true;
            })
            .catch(() => {
                this.$toast.info('获取余额失败');
            });
        this.getRewordNum();
        this.getMybank();
        window.onpopstate = () => {
            this.$router.go(-2);
        };
        this.getMoneyNum();
        this.getNewWallet();
        this.queryRules();
        this.activityText();
    },
    methods: {
        activityText() {
            api.huataiAgreement({
                businessCode: "hfbhdsm",
                businessType: 'WHOLE'
            })
            .then((res) => {
                this.activityContent = res.content.replace(/Calibri/g,'').replace(/宋体/g,'');
            });
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
        receiveTankuang(type) {
            if(type == '02') {
                this.tankuang = true;
            }
            this.receiveType = type
        },
        // 获取话费
        getRewordNum(data) {
            api.hfb.initInfo()
                .then((res) => {
                    this.profit = res.pendingIncome;
                    this.lprofit = this.changeNum(res.lpendingIncome)
                    this.isShowIncome = true;
                    const yesterdayCome = (!res.yesterdayIncome || res.yesterdayIncome === '0.00') ? '暂无' : res.yesterdayIncome;
                    const lyesterdayCome = (!res.lyesterdayIncome || res.lyesterdayIncome === '0MB') ? '暂无' : res.lyesterdayIncome;
                    // 话费
                    this.incomeList = {
                        yesterday: yesterdayCome,
                        totalget: res.totalIncome,
                        income: res.receivedIncome
                    };
                    // 流量
                    this.lincomeList = {
                        lyesterday: this.changeNum(lyesterdayCome),
                        ltotalget: this.changeNum(res.ltotalIncome),
                        lincome: this.changeNum(res.lreceivedIncome)
                    };
                })
                .catch(() => {
                    if(data == 'noToast') {
                        return
                    }
                    this.$toast.info('获取话费失败');
                });
        },
        changeNum(num) {
            let oldNum = num;
            if(oldNum.indexOf('MB') > -1) {
                oldNum = num.slice(0,-2)
                num = Number(oldNum) / 1000
            } else if(oldNum.indexOf('GB') > -1) {
                num =  oldNum.slice(0,-2)
            }
            if(num == 0) {
                num = '0.00'
            }
            return num
        },
        // 是否显示余额
        isShowNum() {
            if (this.visibleShow === 'visible') {
                this.visibleShow = 'invisible';
            } else {
                this.visibleShow = 'visible';
            }
        },
        getMybank() {
            api.looseChange.qryAllAcc({ mobile: store2.default.get('usrmob') })
                .then((res) => {
                    for (let i = 0; i < res.list.length; i += 1) {
                        if (res.list[i].accNbr == null) {
                            res.list.splice(i, 1);
                        }
                    }
                    if (res.list.length > 0) {
                        // eslint-disable-next-line prefer-destructuring
                        this.myJumpBank = res.list[0];
                        res.list.forEach((item) => {
                            if (item.defaultAccFlg === '01') {
                                this.myJumpBank = item;
                            }
                        });
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        // 点击充值
        recharge() {
            window.sessionStorage.setItem('backPage', 'viewBenefits');
            if (this.myJumpBank) {
                clearInterval(this.timer);
                this.$router.push({
                    name: 'moveWallet',
                    query: {
                        accNbr: this.myJumpBank.accNbr,
                        fullAccNbr: this.myJumpBank.fullAccNbr
                    }
                });
            } else {
                this.timer = setInterval(() => {
                    this.recharge();
                }, 1000);
            }
        },
        // 点击领取按钮
        receivIncome(type) {
            if(!this.isClick) {
                return
            }
            this.$store.commit('LOADING',true)
            this.isClick = false;
            this.tankuang = false;
            api.hfb.receivePin({
                rightType: type
            })
                .then(() => {
                    this.$store.commit('LOADING',false)
                    this.isClick = true;
                    // 领取成功
                    this.isReactiveSucc = true;
                    this.reactiveType = type;
                    this.getRewordNum('noToast');
                })
                .catch((err) => {
                    this.$store.commit('LOADING',false)
                    this.isClick = true;
                    this.errReason = err.msgInfo;
                    this.isReactiveFail = true;
                    this.getRewordNum('noToast');
                });
        },
        // 跳转话费详情
        jumpToTotal(data) {
            if (data === 'totalBill') { 
                // 累计话费
                this.$router.push({
                    name: 'cumRight',
                    query:{
                        type: data
                    }
                });
            } else if (data === 'incomeBill') {
                // 已领取话费
                this.$router.push({
                    name: 'getRight',
                    query:{
                        type: data
                    }
                });
            } else if (data === 'totalFlow') { 
                // 累计流量
                this.$router.push({
                    name: 'cumRight',
                    query:{
                        type: data
                    }
                });
            } else if (data === 'incomeFlow') {
                // 已领取流量
                this.$router.push({
                    name: 'getRight',
                    query:{
                        type: data
                    }
                });
            }
        },
        // 获取收益领取金额
        getMoneyNum() {
            api.hfbConfig({})
                .then((res) => {
                    this.minMoney = res.configAmount / 100;
                });
        },
        // 开通话费宝后重新获取钱包账户信息
        getNewWallet() {
            const changeList = [];
            api.qrySmallChangeAcc({ refreshFlag: '1' })
                .then((res) => {
                    // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                    const walletNum = Number(res.totalBalance)
                        .toFixed(2);
                    res.list.forEach((item) => {
                        if (item.fullAccNbr && item.defaultAccFlg === '01' && item.orgCode !== 'ICBC-DIGICCY') {
                            changeList.unshift(item);
                        } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                            changeList.push(item);
                        }
                    });
                    store2.default.set('walletNum', walletNum);
                    store2.default.set('qbBankListsInfo', changeList);
                })
                .catch((err) => {
                    store2.default.set('walletNum', '0.00');
                    store2.default.set('qbBankListsInfo', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
    },
    destroyed() {
        window.onpopstate = null;
    }
};
</script>
<style lang="less" scoped>
.content {
    //height: 100vh;
    //background: #F4F5F7;
    .exple {
        width: 139px;
        height: 54px;
        position: absolute;
        right: 0;
        top: 30px;

        img {
            width: 100%;
            height: auto;
        }
    }
    .rulesModel{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        // background: rgba(0, 0, 0, 0.8);
        background: #444;
        z-index: 999;
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
    .main {
        box-sizing: border-box;
        width: 100%;
        height: 633px;
        background: url('../../assets/images/telephoneCharges/bg_2.png') no-repeat;
        background-size: 100%;
        padding: 118px 24px 0 24px;

        .telephoneCard {
            width: 702px;
            height: 356px;
            background: url('../../assets/images/telephoneCharges/bg_3.png') no-repeat;
            background-size: 100%;

            .top {
                padding: 30px 30px 0 30px;
                display: flex;
                justify-content: space-between;

                .md-example-item-s {
                    position: absolute;
                    left: 1.2rem;
                }
            }

            .bottom {
                display: flex;
                padding: 10px 30px;

                .num {
                    font-size: 44px;
                    font-weight: 700;
                    line-height: 0.9rem;
                    text-align: center;
                }
                .receive {
                    margin-left: 80px;
                    width: 108px;
                    height: 46px;
                    line-height: 46px;
                    background: #E5A05F;
                    border-radius: 50px;
                    color: #FFFFFF;
                    font-size: 26px;
                    text-align: center;
                }
            }

            .tit {
                min-width: 0.26rem;
                color: #888888;
                font-size: 0.26rem;
                line-height: 0.37rem;
                position: relative;
            }

            .num {
                display: flex;
                align-items: center;
                font-size: 65px;
                color: #3D3E3E;
                font-weight: 400;
                span {
                    line-height: 1.33rem;
                }

                .btn {
                    margin-left: 50px;
                    width: 170px;
                    height: 60px;
                    line-height: 60px;
                    background: #E5A05F;
                    border-radius: 50px;
                    color: #FFFFFF;
                    font-size: 32px;
                    text-align: center;
                }
            }
        }

        .card2 {
            display: flex;
            justify-content: space-around;
            box-sizing: border-box;
            padding: 23px 0 0 0px;
            margin-top: 24px;
            width: 702px;
            height: 157px;
            background-image: linear-gradient(180deg, #FFFFFF 32%, #FFF7EF 100%);
            box-shadow: inset 0 2px 0 0 #ffffff80;
            border-radius: 7px;
            .square {
                color: #7B7B7B;
                font-size: 26px;
                .edu {
                    color: #D78940;
                    font-size: 44px;
                    font-weight: 700;
                    margin-top: 27px;
                }
            }
        }
        .card3 {
            display: flex;
            justify-content: space-around;
            box-sizing: border-box;
            padding: 23px 0 0 0px;
            width: 702px;
            height: 157px;
            background: #FFFFFF;
            box-shadow: inset 0 2px 0 0 #ffffff80;
            border-radius: 0 0 16px 16px;
            .square {
                color: #7B7B7B;
                font-size: 26px;
                .edu {
                    color: #D78940;
                    font-size: 44px;
                    font-weight: 700;
                    margin-top: 27px;
                }
            }
        }
        .text {
            margin-top: 0.3rem;
            color: #666666;
            font-size: 0.24rem;
            line-height: 0.37rem;

            .tit {
                color: #3D3E3E;
                font-size: 0.28rem;
                font-weight: 600;
            }
        }
    }

    .reactiveModel {
        width: 5rem;
        background-color: #fff;
        border-radius: 10px;
        padding: .3rem;

        .loseTitle {
            width: 100%;
            height: .6rem;
            text-align: center;
            line-height: .4rem;
            font-size: .38rem;
            text-align: center;
            border-bottom: 0.01rem solid #E1E1E1;
        }

        .cont {
            width: 4rem;
            margin: 0 auto;

            p {
                font-size: 0.3rem;
                margin: 0.5rem auto;
                text-align: center;
            }
        }
    }
}
.org_square {
    margin-right: 14px;
    width: 10px;
    height: 32px;
    background: url('../../assets/images/telephoneCharges/square.png') no-repeat;
    background-size: 100%;
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
    .toast1 {
        width: 565px;
        height: 415px;
        background: url('../../assets/images/telephoneCharges/toast1.png') no-repeat;
        background-size: 100%;
        .buttonList {
            display: flex;
            justify-content: space-evenly;
            margin-top: 103px;
        }
        .sure {
            width: 200px;
            height: 70px;
            background: url('../../assets/images/telephoneCharges/sure.png') no-repeat;
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
        p {
            color: #996446;
            font-size: 32px;
            text-align: center;
            font-weight: 500;
            margin-top: 118px;
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
/deep/ .main .text .activityContent {
    font-size: 23px;
    line-height: 1.5;
    p {
        margin-top: 5px;
    }
}
</style>
