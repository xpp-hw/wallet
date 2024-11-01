<template>
  <div class="nbBank" :class="{'nbBank2':bankaShow}">
    <div class="wrap-top">

    </div>
    <div class="bg3"  v-if="!lotteryShow"></div>
    <div :class="{'no-lottery':nochouj}"></div>
    <div :class="{'wrap-middle':choujBtn,'wrap-middle2':nochouj}" v-if="lotteryShow">
      <!-- wrap-middle2 -->
      <div class="activity-cont" style="display: flex; justify-content: center;">
      <lottery-list
        ref="lottery1"
        @onend="onend"
        :list="list"
        :circleTimes="3"
        velocity="invariance"
        @onsubmit="request('lottery1')"
        class="lottery1"
        id="C01"
      ></lottery-list>
      </div>
      <div class="lottery-text lottery-text2">(你有{{ cjNum }}张抽奖机会)</div>

    </div>
    <div class="wrap-bottom">
      <!-- 核卡礼 -->
      <div class="wrap-box">
        <div class="wrap-cont">
          <p class="title1">核卡礼<span :class="[hekaIconShow ? 'title1-icon title1-icondabiao': 'title1-icon']" ></span></p>
          <p class="cont1">
            通过江苏移动渠道申请宁波银行&中国移动
            联名信用卡，且成功核卡的客户，
            <span class="cont2">赠送10GB流量。</span>
          </p>
        </div>
        <div class="wrap-img">
          <img src="../../assets/images/nbBank/10G_1.png" />
          <div class="look-detail" @click="btnDetail('heka')" id="D01">查看详情 ></div>
        </div>
      </div>

      <!-- 开卡礼 -->

      <div class="wrap-box">
        <div class="wrap-cont">
          <p class="title1">开卡礼<span :class="[kaikaIconShow ? 'title1-icon title1-icondabiao': 'title1-icon']"></span></p>
          <p class="cont1">
            核卡30天内，首刷任意金额，<span class="cont3" >赠送100元话费。</span>
          </p>
        </div>
        <div class="wrap-img">
          <img src="../../assets/images/nbBank/100yuan_1.png" />
          <div class="look-detail" @click="btnDetail('kaika')" id="E01">查看详情 ></div>
        </div>
      </div>

      <!-- 首刷礼 -->

      <div class="wrap-box wrap-box3">
        <div class="wrap-cont">
          <p class="title1">首刷礼<span :class="[shoushuaIconShow ? 'title1-icon title1-icon3': 'title1-icon title1-icon2']"></span></p>
          <p class="cont1">
            核卡60天内，完成3笔单笔88元（含）及以上的金额消费，<span class="cont3" >赠送100元话费。</span>
          </p>
        </div>
        <div class="wrap-img">
          <img src="../../assets/images/nbBank/100yuan_1.png" />
          <div class="look-detail" @click="btnDetail('shoushua')" id="F01">查看详情 ></div>
        </div>
      </div>

      <!-- 动卡礼 -->

      <div class="wrap-box wrap-box4">
        <div class="wrap-cont">
          <p class="title1">动卡礼<span class="title1-icon title1-icon3"></span></p>
          <p class="cont1">
            核卡后12个月内，每月完成3笔单笔88元
            （含）以上的消费，<span class="cont3" >可1积分（中国移动
            商城积分或和积分）兑换视听会员月卡，
            最高可享12次。</span>
          </p>
        </div>
        <div class="wrap-img_2">
          <img src="../../assets/images/nbBank/video_1.png" />
          <div class="look-detail" @click="btnDetail('dongka')" id="G01">查看详情 ></div>
        </div>
      </div>


    </div>
    <div class="bottom-bg">
      <div class="text">注：达标状态在用户达标后2个工作日内更新</div>
      <div class="text2">具体活动时间与条款细则以宁波银行及江苏移动</br>活动页面公示为准</div>
    </div>
    <!-- 核卡礼返回未达标时，展示 -->
    <div class="fixed-bottom" v-if="bankaShow">
      <div class="btn-banka" @click="btnBanka" id="B01">
      </div>
    </div>
    <!-- 10秒悬浮 -->
    <div class="clock-img" v-if="cjClock">
      <div class="time-text" :class="{'time-text2': timeText === 10}">{{timeText}}</div>


    </div>
    <!-- 抽奖弹窗 -->
    <div class="cjTan" v-if="cjTanShow"></div>

    <!-- 活动规则 -->
    <div class="act-rules" @click="btnRules" id="A01"></div>

    <!-- 活动规则弹窗 -->
    <div  class="act-rules-bg" v-if="actRulesShow"></div>
    <div class="act-rules-cont" v-if="actRulesShow">
      <div class="act-rules-details">
        <p><span class="act-rules-title">一、活动时间</span><br/>
        即日起-2023年12月31日</p>
        <p><span class="act-rules-title">二、活动对象</span><br/>
        通过江苏移动渠道申请宁波银行&中国移动联名信用卡，且成功核卡的江苏移动用户（暂不支持无线公话、无线商话、全额代付家庭副号用户参与）， 是否符合活动条件以活动页提示为准。
        <p><span class="act-rules-title">三、活动内容</span><br/>
        （1）用户进入宁波银行&中国移动联名信用卡页面，完成浏览活动页达10秒可获得1次抽奖机会，奖品为随机流量。每位用户仅1次抽奖机会。<br/>
            （2）核卡礼：通过江苏移动渠道申请宁波银行&中国移动联名信用卡，且成功核卡的客户，赠送10GB流量。<br/>
            （3）开卡礼：通过江苏移动渠道申请宁波银行&中国移动联名信用卡，且成功核卡的宁波银行信用卡新客户（即从未持有宁波银行信用卡（公务卡和尊尚卡除外），或曾持有但已销户超6个月的用户），核卡30天之内，首刷任意金额，送100元话费。<br/>
            （4）首刷礼：通过江苏移动渠道申请宁波银行&中国移动联名信用卡，且成功核卡的宁波银行信用卡新客户（即从未持有宁波银行信用卡（公务卡和尊尚卡除外），或曾持有但已销户超6个月的用户），核卡60天之内，通过支付宝/微信快捷支付方式任意消费，或通过此APP绑定该卡进行话费充值，完成3笔单笔88元（含）以上的消费，送100元话费。<br/>
            （5）动卡礼：通过江苏移动渠道申请宁波银行&中国移动联名信用卡，且成功核卡的用户，核卡后12个月内，每月完成3笔单笔88元（含）以上的消费，可1积分（中国移动商城积分或和积分）兑换视听月会员权益（腾讯视频、网易云音乐、哔哩哔哩、优酷视频、爱奇艺、喜马拉雅）六选一，每位客户每月限领1次，最多可领12次。</p>
        <p><span class="act-rules-title">四、办理渠道</span><br/>
        此APP</p>
        <p><span class="act-rules-title">五、奖品说明</span><br/>
        （1）本活动赠送的流量为国内（不含港澳台）通用流量，将于活动参与成功后3个工作日内赠送至参与活动的江苏移动号码。奖励发放时号码不得更换且必须处于正常状态，到账后立即生效，当月底失效，请注意查收短信。客户可通过此APP-查询服务-套餐余量查询对应流量发放和使用记录。所赠流量不可滚存、兑换、共享或赠送他人使用。参与活动获得的流量适用于国内移动数据流量封顶规则。<br/>
        （2）开卡礼达标用户获赠的话费，将于达标后3个工作日充值到账。首刷礼达标用户获赠的话费，将于客户领取后3个工作日充值到账。客户可登录“此APP-充值中心-充值记录”中查询。赠送的话费不可转赠，不可兑换现金，不提供发票。<br/>
         （3）首刷礼达标用户获赠的话费次日即可领取，领取有效期为达标后60天内，每位客户限领1次。如到期未领取，则视为持卡人自动放弃本次权益，不予补发及补偿。<br/>
        （4）视听月会员权益消费达标后T+2日即可领取，领取有效期30天，到期后将自动失效。如到期未领取，则视为持卡人自动放弃本次权益，不予补发及补偿。 </p>
        <p><span class="act-rules-title">六、注意事项</span><br/>
        （1）同一登录手机号码、充值手机号码及信用卡卡号视为同一用户。<br/>
        （2）参与活动的号码状态必须正常，报停的客户须先报开，欠停的客户、后付费有历史欠费的客户，须缴清欠费后，才能参加本活动。如用户当月预约变更主体产品，有可能导致无法参与活动。如用户已经参与移动其他活动导致冲突，将导致无法参加活动，具体以办理时页面展示为准。<br/>
        （3）中奖用户在享受活动奖品优惠期间不得办理销户、过户、报停业务。<br/>
            （4）参与活动的客户如因欠费停机、主动停机、销户、过户或办理与活动存在冲突的业务等因素造成无法获得奖品的情况，移动公司不予补发。<br/>
            （5）持卡人如有下述情况，包括但不限于：卡片或账户出现逾期、冻结、止付、注销等非正常状态，涉嫌进行虚假交易或违法交易的，涉嫌恶意套现的，将取消其参加资格。<br/>
            （6）每月最后一天21:30至次日凌晨1:00为系统升级维护时间，可能导致业务无法办理。<br/>
        （7）宁波银行有权在法律允许的范围内对活动规则作出适当调整。</p>
      </div>
      <div class="btn-close" @click="actRulesClose" id="A02"></div>

    </div>
    <!-- 抽中弹窗 -->

    <div class="zhongjiang-bg" v-if="zhongjiangShow"></div>
    <div class="zhongjiang-wrap" v-if="zhongjiangShow">
      <div class="zjtan-title1">恭喜抽中<span v-if="zhongjiang888">888M</span><span v-else-if="zhongjiang88">88M</span><span v-else-if="zhongjiang188">188M</span><span v-else-if="zhongjiang388">388M</span><span v-else-if="zhongjiang1">1GB</span>流量</div>
      <div class="zjtan-title2">申请信用卡再得<span style="color:#FD4555;">10GB流量</span></div>
      <div class="zjtan-title3"><span class="font50">10</span>GB</div>
      <div class="zjtan-title4">全国通用流量</div>
      <div class="btn-zhuanfuli" id="H01" @click="btnDetail('zhuanfuliheka')">

      </div>


      <div class="btn-close" @click="zhongjiangClose" id="H02"></div>

    </div>


  </div>

</template>

<script>
import { Dialog, Button, Toast } from 'mand-mobile';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';


export default {
    name: 'nbBank',
    components: {
        [Dialog.name]: Dialog,
        [Button.name]: Button
    },
    data() {
        return {
        // icon开关
            hekaIconShow: false,
            shoushuaIconShow: false,
            kaikaIconShow: false,
            dongkaIconShow: true,
            choujBtn: false,
            nochouj: true,
            zhongjiang888: false,
            zhongjiang88: false,
            zhongjiang388: false,
            zhongjiang188: false,
            zhongjiang1: true,
            bankaShow: false,
            lotteryShow: false,
            zhongjiangShow: false,
            actRulesShow: false,
            cjClock: false,
            cjTanShow: false,
            timeText: 10,
            cjNum: '0',
            goHeka: null,


            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_A02'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_B01'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_C01'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_D01'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_E01'
                },
                {
                    id: 'F01',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_F01'
                },
                {
                    id: 'G01',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_G01'
                },
                {
                    id: 'H01',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_H01'
                },
                {
                    id: 'H02',
                    touchCode: 'WAP_T_NBBANK_JOINTLY_01_H02'
                }
            ],
            sysCodeVal: '',
            list: [
                {
                    label: '88M',
                    cont: '88M',
                    image: require('../../assets/images/nbBank/88m.png')
                },
                {
                    label: '188M',
                    cont: '188M',
                    image: require('../../assets/images/nbBank/188m.png')

                },
                {
                    label: '388M',
                    cont: '388M',
                    image: require('../../assets/images/nbBank/388m.png')

                },
                {
                    label: '888M',
                    cont: '888M',
                    image: require('../../assets/images/nbBank/888m.png')

                },
                {
                    label: '88M',
                    cont: '88M',
                    image: require('../../assets/images/nbBank/88m.png')

                },
                {
                    label: '1GB',
                    cont: '1GB',
                    image: require('../../assets/images/nbBank/1gb.png')
                }
            ],
            numVal: ''

        };
    },
    mounted() {
        // 首次进入，并浏览10s后才展示clock
        // 本地存储记录下
        if (store2.default.get('clockNoShow') == '1') {
        //  debugger
            this.cjClock = false;
            this.nochouj = false;
            this.choujBtn = true;
            this.cjNum = '1';
        } else {
            // 清掉缓存
            // debugger
            this.cjClock = true;
            this.nochouj = true;
            this.choujBtn = false;
            this.cjNum = '0';
        }

        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    created() {
        this.getFun();
    },
    methods: {
        // 信用卡查询
        getFun() {
            const mobNo = store2.default.get('usrmob') || '';
            api.getCreditCardActInfo({
                mobNo,
                orgCode: 'nbcb'
            })
                .then((res) => {
                    // debugger
                    // 抽奖标识 0：未完成 1：已完成
                    if (res.lotteryFlag == '1') {
                        this.lotteryShow = false;
                        store2.default.set('clockNoShow', '1');
                        this.cjClock = false;
                        clearInterval(this.timer);
                    } else {
                        this.lotteryShow = true;
                        // store2.default.set('clockNoShow',false)

                        if (this.cjClock === true) {
                            this.getTime();
                        }
                    }

                    // 核卡 heKaFlag
                    if (res.heKaFlag == '1') {
                        this.hekaIconShow = true;
                        this.bankaShow = false;
                    } else {
                        this.hekaIconShow = false;
                        // 显示点击办卡
                        this.bankaShow = true;
                    }

                    // 首刷 movingCardFlag

                    if (res.movingCardFlag == '1') {
                        this.shoushuaIconShow = true;
                    } else {
                        this.shoushuaIconShow = false;
                    }

                    // 开卡 firstBrushFlag
                    if (res.firstBrushFlag == '1') {
                        this.kaikaIconShow = true;
                    } else {
                        this.kaikaIconShow = false;
                    }
                })
                .catch((err) => {
                // this.nochouj = true
                    console.log(err);
                });
        },

        getTime() {
            this.timer = setInterval(() => {
                this.timeText--;
                if (this.timeText === 0) {
                    clearInterval(this.timer);
                    // 获得一张抽奖券,2s后消失，按钮可点击
                    this.cjTanShow = true;
                    setTimeout(() => {
                        this.cjTanShow = false;
                    }, 2000);
                    this.choujBtn = true;
                    this.nochouj = false;
                    this.cjNum = 1;
                    this.cjClock = false;
                    store2.default.set('clockNoShow', '1');
                }
            }, 1000);
        },

        rndNum(min, max) {
            if (min > max) min = [max, (max = min)][0];
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        request(name) {
        // debugger
            api.getLottery({})
                .then((res) => {
                    this.sysCodeVal = res.sysCode;

                    if (res && res.prizeName !== null && res.msgCd == 'BUS00000') {
                        if (res.prizeName == '88M流量') {
                            this.numVal = 4;
                            // this.onend(this.list[0])
                            // alert('4')
                        // debugger
                        } else if (res.prizeName = '188M流量') {
                            this.numVal = 1;
                            // this.onend(this.list[1])
                            // alert('1')
                        // debugger
                        } else if (res.prizeName = '388M流量') {
                            this.numVal = 2;
                            // this.onend(this.list[2])
                            // alert('2')
                        // debugger
                        } else if (res.prizeName = '888M流量') {
                            this.numVal = 3;
                            // this.onend(this.list[3])
                            // alert('3')
                        // debugger
                        } else if (res.prizeName = '1GB流量') {
                            this.numVal = 5;
                            // this.onend(this.list[5])
                            // alert('5')
                        // debugger
                        } else {
                            // alert('99')
                            this.zhongjiangShow = false;
                            // debugger
                            // 已参与抽奖toast
                            // alert(res.msgInfo)
                            console.log(res.msgInfo);
                        }
                    } else {
                        // debugger
                        // alert('null')
                        // alert(res.msgInfo)
                        Toast.info(res.msgInfo);
                        console.log(res.msgInfo);
                        this.zhongjiangShow = false;
                        // setTimeout(()=>{
                        // },5000)
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    // debugger
                    // alert('catch')
                    // alert(err.msgInfo)
                    Toast.info(err.msgInfo);
                    clearTimeout(this.goHeka);
                    // setTimeout(()=>{

                    // },5000)
                    window.location.reload();


                    this.sysCodeVal = err.sysCode;
                    this.zhongjiangShow = false;
                    this.nochouj = true;
                    this.cjNum = 0;
                    console.log(err);
                    // this.onend({label:err.msgInfo})
                });
            // mock
            // let res ={
            //   prizeName:"宁波银行信用卡活动抽奖388流量"
            // }
            // if(res.prizeName.indexOf('宁波银行信用卡活动抽奖388流量')> -1){
            //   this.numVal = 2
            // }
            // 模拟抽奖请求
            setTimeout(() => {
                const luckyIndex = this.rndNum(0, 5);
                console.log(luckyIndex);
                this.$refs[name].go(this.numVal);
                // this.$refs[name].go(luckyIndex);
            }, 100);
        },
        // 抽奖动画结束
        onend(data) {
            console.log('抽奖结果回调：', data);
            if (this.sysCodeVal !== 'BUS00000') {
                //  debugger
                // alert('!BUS00000')
                // alert(data.label)
                this.zhongjiangShow = false;
                clearTimeout(this.goHeka);
            } else if (data) {
                //  debugger
                // alert('BUS00000')
                // alert(data.label)
                this.zhongjiangShow = true;
                this.nochouj = true;
                this.choujBtn = false;
                this.cjNum = 0;
                // 本地存储的clockNoShow
                // store2.default.set('clockNoShow','1')


                // 5s后自动跳核卡详情
                this.goHeka = setTimeout(() => {
                    // this.$router.push({
                    //   name:'nbBankDetail',
                    //   query: {
                    //     details:'heka',
                    //     // status: this.hekaIconShow
                    //   }
                    // })
                    window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankDetail?details=heka&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
                }, 5000);
            } else {
                this.zhongjiangShow = false;
            }
            if (data.cont == '1GB') {
                this.zhongjiang88 = false;
                this.zhongjiang188 = false;
                this.zhongjiang388 = false;
                this.zhongjiang888 = false;
                this.zhongjiang1 = true;
            } else if (data.cont == '88M') {
                this.zhongjiang88 = true;
                this.zhongjiang188 = false;
                this.zhongjiang388 = false;
                this.zhongjiang888 = false;
                this.zhongjiang1 = false;
            } else if (data.cont == '188M') {
                this.zhongjiang1 = false;
                this.zhongjiang188 = true;
                this.zhongjiang88 = false;
                this.zhongjiang388 = false;
                this.zhongjiang888 = false;
            } else if (data.cont == '388M') {
                this.zhongjiang388 = true;
                this.zhongjiang1 = false;
                this.zhongjiang188 = false;
                this.zhongjiang88 = false;
                this.zhongjiang888 = false;
            } else if (data.cont == '888M') {
                this.zhongjiang888 = true;
                this.zhongjiang1 = false;
                this.zhongjiang188 = false;
                this.zhongjiang388 = false;
                this.zhongjiang88 = false;
            }
        },
        btnDetail(tVal) {
        // 核卡详情
            if (tVal == 'heka') {
                // this.$router.push({
                //   name:'nbBankDetail',
                //   query: {
                //     details:'heka',
                //     // status: this.hekaIconShow
                //   }
                // })
                window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankDetail?details=heka&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            } else if (tVal == 'zhuanfuliheka') {
                //  赚福利点击
                // this.$router.push({
                //   name:'nbBankDetail',
                //   query: {
                //     details:'heka',
                //     // status: this.hekaIconShow
                //   }
                // })
                window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankDetail?details=heka&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            } else if (tVal == 'shoushua') {
                // 首刷详情
                // this.$router.push({
                //   name:'nbBankDetail',
                //   query: {
                //     details:'shoushua',
                //     // status: this.shoushuaIconShow
                //   }
                // })
                window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankDetail?details=shoushua&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            } else if (tVal == 'kaika') {
                // 开卡详情
                // this.$router.push({
                //   name:'nbBankDetail',
                //   query: {
                //     details:'kaika',
                //     // status: this.kaikaIconShow
                //   }
                // })
                window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankDetail?details=kaika&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            } else {
                // 动卡详情
                // this.$router.push({
                //   name:'nbBankDetail',
                //   query: {
                //     details:'dongka',
                //     // status: this.dongkaIconShow
                //   }
                // })
                window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankDetail?details=dongka&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            }
        },
        // 点击办卡
        btnBanka() {
        // 核卡详情
        // this.$router.push({
        //   name:'nbBankDetail',
        //   query: {
        //     details:'heka',
        //     // status: this.hekaIconShow
        //   }
        // })
            window.location.href = `https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2022111514002167698&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            // window.location.href='https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankDetail?details=heka'
        },
        // 活动规则
        btnRules() {
            this.actRulesShow = true;
        },
        actRulesClose() {
            this.actRulesShow = false;
        },
        zhongjiangClose() {
            this.zhongjiangShow = false;
            // 清除
            clearTimeout(this.goHeka);
        },
        zhuanfuli() {
            clearTimeout(this.goHeka);
        }


    }
};
</script>
<style scoped lang="less">
.nbBank{
  position: relative;
  background: #6144FF;
}
.nbBank2{
  padding-bottom: 160px;
}
.wrap-top{
  background: url(../../assets/images/nbBank/bg1.jpg) top center no-repeat;
  background-size: 100% 100%;
  height: 271px;
}
.bg3 {
  width: 750px;
  height: 41px;
  margin-top: -2px;
  background: url(../../assets/images/nbBank/bg3.jpg) no-repeat;
  background-size: 100% ;
}
.no-lottery{
  background: #000;
  width: 100%;
  height: 853px;
  opacity: 0;
  position: absolute;

}
.wrap-middle{
  background: url(../../assets/images/nbBank/bg2.jpg) top center no-repeat;
  background-size: 100% 100%;
  height: 853px;
}
.wrap-middle2{
  background: url(../../assets/images/nbBank/bg22.jpg) top center no-repeat;
  background-size: 100% 100%;
  height: 853px;
}
.wrap-bottom{
  margin-top: -1px;
  background: url(../../assets/images/nbBank/bg4_2.jpg) top center no-repeat;
  background-size: 100% 100%;
  height: 878px;
  padding-top: 100px;
  .wrap-box{
    display:flex;
    height: 160px;
    padding: 20px 70px;
    .look-detail {
      position: absolute;
      bottom: 10px;
      left: -10px;
      width: 120px;
      color: #FF6F2D;
      font-size: 24px;
    }
    .wrap-img{
      position: relative;
      margin: 0 10px 0 40px;
      img{
        width: 90px;
        height: 110px;
      }
    }
    .wrap-img_2{
      position: relative;
      margin: 40px 10px 0 60px;
      img{
        width: 90px;
        height: 68px;
        margin-bottom: 10px;
      }
    }

    .wrap-cont{
      .title1{
        color: #2200B8;
        font-size: 33px;
        font-weight: bold;
      }
      .title1-icon{
        background: url(../../assets/images/nbBank/weidabiao-icon.png) top center no-repeat;
        background-size: 100% 100%;
        width: 122px;
        height: 38px;
        display: inline-block;
        margin-left: 16px;
      }
      .title1-icon2{
        background: url(../../assets/images/nbBank/weilingqu-icon.png) top center no-repeat;
        background-size: 100% 100%;
      }
      .title1-icon3{
        background: url(../../assets/images/nbBank/lingqu-icon.png) top center no-repeat;
        background-size: 100% 100%;
      }
      .title1-icondabiao{
        background: url(../../assets/images/nbBank/dabiao-icon.png) top center no-repeat;
        background-size: 100% 100%;
      }
      .cont1{
        padding-top: 5px;
        font-size: 25px;
        color: #2200B8;
        line-height: 36px;


      }
      .cont2{
        padding-top: 15px;
        color: #FF4F61;

      }
      .cont3{
        color:#FF4F61
      }
      .btn-detail{
        background: url(../../assets/images/nbBank/btn-detail.png) top center no-repeat;
        background-size: 100% 100%;
        width: 173px;
        height: 56px;
        margin-top: 35px;
      }


    }


  }
  .wrap-box2{
    padding-top: 50px;
  }
}
.activity-cont{
  padding-top: 230px;
}
// 抽奖样式start

 /* 为了防止样式重叠 建议给组件加上自定义的class类名 */
  .lottery1 {
    /* 奖品列表的蒙层，根据抽奖动画选中的位置被显示出来 */
    ::v-deep .prize__item__mask {
      // background-color: rgba(0, 0, 205, 0.4);
      background: url(../../assets/images/nbBank/on-bg.png) top center no-repeat;
      background-size: 100% 100%;
    }
    /* 奖品图样式 */
    ::v-deep .prize__item__image {
      width: 100%;
      height: 100%;
    }
    /* 九宫格组件样式 为了跟随羡慕的自适应方案 */
    ::v-deep .lattice__lottery__box {
      margin: 0 auto;
      width: 500px;
    }
    /* 奖品块样式 为了跟随羡慕的自适应方案 */
    ::v-deep .lattice__lottery__item {
      width: 161px;
      height: 162px;
      margin-bottom: 30px;
      font-size: 18px;
      border: none;
      span{
        display: none;
      }
    }
    /* 抽奖按钮 */
    ::v-deep .lattice__lottery__btn {
      width: 420px;
      height: 100px;


      /* lottery-list 组件的抽奖按钮 */
      &.list {
        margin-top: 70px;
      }
    }
    /* 抽奖动画处于选中状态的奖品块样式 */
    ::v-deep .lattice__lottery__actItem {
      background-color: rebeccapurple;
      color: white;
    }
  }


  /deep/.lattice__lottery__btn{
    border: 0;
  }
  /deep/.lattice__lottery__btn span{
    font-size: 0;
  }

// 抽奖样式end
.lottery-text{
  text-align: center;
  color: #A02C04;
  position: absolute;
  top: 1020px;
  left: 50%;
  margin-left: -100px;
}
.lottery-text2{
  color: #666;
  font-size:24px
}


.clock-img{
  position: fixed;
  right: 10px;
  top: 1050px;
  background: url(../../assets/images/nbBank/fu2.png  ) top center no-repeat;
  background-size: 100% 100%;
  width: 144px;
  height: 176px;

  .time-text{
    padding-top: 66px;
    padding-left: 60px;
    color: #fff;
    font-size: 40px;
    font-weight: bold;
  }
  .time-text2{
    padding-left: 48px;
  }

}
.cjTan{
  background: url(../../assets/images/nbBank/fu1.png) top center no-repeat;
  background-size: 100% 100%;
  width: 589px;
  height: 272px;
  position: absolute;
  top: 700px;
  left: 50%;
  margin-left: -2.94rem;
}
.bottom-bg{
  background: url(../../assets/images/nbBank/bg6.png) top center no-repeat;
  background-size: 100% 100%;
  height: 183px;
  .text{
    color: #fff;
    font-size: 22px;
    text-align: center;
    padding: 22px 0 37px;
  }
  .text2{
    color: #fff;
    font-size: 22px;
    text-align: center;
  }

}
.fixed-bottom{
  height:160px;
  background: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.btn-banka{
  background: url(../../assets/images/nbBank/btn-banka.png) #fff top center no-repeat;
  background-size: 100% 100%;
  width: 548px;
  height: 79px;
  margin: 37px auto 0;
}
.act-rules{
  background: url(../../assets/images/nbBank/activity-rules.png) top center no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 0;
  top: 100px;
  width: 43px;
  height: 124px;

}
.act-rules-bg{
  background: #000;
  opacity: 0.78;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.act-rules-cont{
  background: url(../../assets/images/nbBank/guize-bg.png) top center no-repeat;
  background-size: 100% 100%;
  width: 530px;
  height: 484px;
  position: absolute;
  padding: 120px 40px 80px;
  top: 300px;
  left: 50%;
  margin-left: -305px;
  color:#555555;
  font-size: 26px;
  line-height: 38px;
  // p{
  //   text-indent: 40px;
  // }
}
.act-rules-details{
  overflow: scroll;
  height: 500px;
}
.act-rules-title{
  font-weight: bold;
}
.btn-close{
  background: url(../../assets/images/nbBank/btn-close.png) top center no-repeat;
  background-size: 100% 100%;
  width: 68px;
  height: 68px;
  margin: 100px auto 0;

}
.zhongjiang-bg{
  background: #000;
  opacity: 0.78;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.zhongjiang-wrap{
  background: url(../../assets/images/nbBank/chouzhong-bg.png) top center no-repeat;
  background-size: 100% 100%;
  width: 530px;
  height: 604px;
  position: absolute;
  top: 300px;
  left: 50%;
  margin-left: -265px;
  text-align: center;
  .zjtan-title1{
    color: #3557F0;
    font-size: 36px;
    font-weight: Bold;
    padding-top: 95px;
  }
  .zjtan-title2{
    color: #3557F0;
    font-size: 36px;
    font-weight: Bold;
    padding-top: 34px;
  }
  .zjtan-title3{
    color:#AA3406;
    font-size: 37px;
    font-weight: Bold;
    padding-top: 90px;

  }
  .font50{
    font-size: 50px;
  }
  .zjtan-title4{
    color:#AA3406;
    font-size: 29px;
    font-weight: Bold;
    padding-top: 30px;
  }

  .btn-close{
    background: url(../../assets/images/nbBank/btn-close.png) top center no-repeat;
    background-size: 100% 100%;
    width: 68px;
    height: 68px;
    margin: 200px auto 0;

}

.btn-zhuanfuli{
    position: absolute;
    bottom: 40px;
    left: 60px;
    width: 400px;
    height: 80px;
}

}
</style>
