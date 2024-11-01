<template>

    <div class="warp">
        <popup v-show="popupShow"></popup>
        <div :style="bg" class="content-warp">
            <div v-if="$route.query.stuId" class="pay" @click="gopay">交易明细</div>
            <div class="content">
                <!--                设备ID-->
                <div class="studyId">

                    <div class="left">
                        <sup>※</sup>设备ID
                    </div>
                    <div v-if="synFlag=='01'" id="A01" class="click"
                         @click="goScan">
                    </div>
                    <div class="right" @click="getID">
                        <input v-model="ID" :class="{untext:untext.one}" class="first" disabled placeholder="请通过扫码设备上的二维码获取" type="text">
                        <img v-if="synFlag=='01'&&!scanIn" alt="" src="@/assets/images/babyFlower/icon-saoyisao.png" @click="goScan">
                    </div>
                </div>
                <div class="name">
                    <p><sub>※</sub>昵称</p>
                    <input id="B01" v-model="name" placeholder="（请输入学生昵称）" type="text">
                </div>
                <!--                账户-->
                <div class="account">
                    <p><sup>※</sup>付款账户</p>
                    <div class="right">
                        <img v-if="flag" :src="bank.logoImage" alt="" @click="showPopUp('bottom')">
                        <p v-if="flag" id="C02" :class="{untext:untext.two}" style="margin-right: 0.05rem" @click="showPopUp('bottom')">{{ bank.bnknm }}</p>
                        <p v-if="!flag" id="C01" @click="getAccount"><span>暂无付款账户，<span style="color:#FDA034">立即绑卡</span></span></p> <i class="md-icon icon-font arrowIco md-icon-arrow-right arrow-left md" data-v-7aaeb914=""></i>
                    </div>
                </div>
                <!--                日额度-->
                <div class="limit">
                    <div class="left">
                        <div class="top"><sup>※</sup>每日可用额度（元）</div>
                        <div class="bottom"><sub>※</sub>￥ <input id="D01" v-model="day" oninput="if(value>200)value=200;if(value<0)value=0" placeholder="支付最高上限200元" type="number" @blur="outErr('day')" @input="numbers"></div>
                        <div v-show="err.day" class="err">每日可用额度未设置</div>
                        <div v-show="dayBYmonth" class="err">每日可用额度不可超过每月可用额度</div>

                    </div>
                    <div class="right">
                        <div @click="set(1,50)">￥50</div>
                        <div @click="set(1,100)">￥100</div>
                        <div @click="set(1,200)">￥200</div>
                    </div>
                </div>
                <!--                周额度-->
                <div class="limit">
                    <div class="left">
                        <div class="top"><sup>※</sup>每月可用额度（元）</div>
                        <div class="bottom"><sub>※</sub>￥ <input id="D02" v-model="month" oninput="if(value>1000)value=1000;if(value<0)value=0" placeholder="支付最高上限1000元" type="number" @blur="outErr('month')" ></div>
                        <div v-show="err.month" class="err">每月可用额度未设置</div>
                    </div>
                    <div class="right">
                        <div @click="set(2,200)">￥200</div>
                        <div @click="set(2,500)">￥500</div>
                        <div @click="set(2,1000)">￥1000</div>
                    </div>
                </div>
                <!--                免密支付-->
                <div class="limit">
                    <div class="left">
                        <div class="top"><sup>※</sup>免密支付金额（元）</div>
                        <div class="bottom" @click="errSupres"><sub>※</sub>￥ <input id="E01" v-model="free" :disabled="input" placeholder="不超过每日可用额度" type="number" @blur="outErr('free')" ></div>
                        <div v-show="err.free1" class="err">免密支付金额未设置</div>
                        <div v-show="err.free2" class="err">请先设置每日可用额度</div>
                        <div v-show="err.free3" class="err">不超过每日可用额度</div>
                    </div>
                    <div class="right">
                        <div @click="set(3,50)">￥50</div>
                        <div @click="set(3,100)">￥100</div>
                        <div @click="set(3,200)">￥200</div>
                    </div>
                </div>
            </div>
            <div class="message">
                <p>消费短信通知</p>
                <md-switch
                    :id="isActive?'F02':'F01'"
                    v-model="isActive"
                    @change="handler('switch0', isActive, $event)"
                ></md-switch>
            </div>
            <!--            提交-->
            <div :id="synFlag == '01' ? 'G01' : 'G02'" :class="{true:isTrue}" class="submit" @click="therePassword">
                {{ synFlag == '01' ? '立刻设置' : '修改设置' }}
            </div>
        </div>
        <md-popup
            v-model="isPopupShow.bottom"
            position="bottom"
        >
            <md-popup-title-bar
                cancel-text='<i class="md-icon icon-font arrowIco md-icon-arrow-left arrow-left md" data-v-7aaeb914=""></i>'
                large-radius
                title="选择付款银行卡"
                @cancel="hidePopUp('bottom')"
                @confirm="hidePopUp('bottom')"
            ></md-popup-title-bar>
            <div class="md-example-popup md-example-popup-bottom">
                <div v-for="(item,index) in banks" :key="index" class="bank" @click="check(item)">
                    <img :src="item.logoImage" alt="">
                    <span>{{ item.bnknm }} (尾号{{ item.cardno.substr(item.cardno.length - 4) }})</span>
                </div>
            </div>
        </md-popup>
        <!--        <scan></scan>-->
        <div v-if="isSuccess.show" class="success">
            <div class="text">{{ isSuccess.text }}</div>
        </div>
        <!-- 密码支付 -->
        <div

            v-show="sfot===2"
            class="passwordPopusMask"
        >
            <div class="passwordPopus">
                <p class="popupTitle">请输入支付密码</p>
                <span class="colse" @click="cancleChange">X</span>
                <div class="hr"></div>
                <input
                    id="tradePin"
                    v-model.number="changeVal"
                    maxlength="6"
                    name="tradePin"
                    placeholder=""
                    type="text"
                />
                <p class="smallTips">
                    忘记支付密码?请<span class="setUp" @click="setUp(2)">找回</span
                >支付密码
                </p>
            </div>
            <div id="login_keyboard" style="position: relative"></div>

        </div>
        <passwordPage v-if="sfot==2" @childByVal="childByVal"></passwordPage>

    </div>
</template>

<script>
import popup from '@/views/babyFlower/popup.vue';
import { Popup, PopupTitleBar, Switch, Toast } from 'mand-mobile';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import passwordPage from '../../components/passwordPage.vue';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    name: 'setting',
    components: {
        passwordPage,
        popup,
        [Switch.name]: Switch,
        [Popup.name]: Popup,
        [PopupTitleBar.name]: PopupTitleBar
    },
    data() {
        return {
            scanIn:false,
            dayBYmonth:false,
            changeVal: '',
            checkUserPopup: false,
            checkUserPopup1: false,
            sfot: '',
            IsPassword: '',
            title: 1,
            ID: '',
            name: '',
            day: '',
            month: '',
            free: '',
            flag: true,
            account: '',
            smsFlag: '',//短信服务
            openSts: '01',//开通状态
            mobile: '',//手机号
            isTrue: false,
            orAll: 0,
            popupShow: false,
            bank: {},//银行卡
            banks: [],
            synFlag: '01',//同步标识  01：新增  02：修改
            bg: {
                backgroundImage: `url(${require('@/assets/images/babyFlower/detailsbg.png')})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% auto'
            },
            isActive: false,
            isPopupShow: {},
            err: {
                day: false,
                month: false,
                free1: false,
                free2: false,
                free3: false

            },
            input: true,
            untext: {
                one: false,
                two: false
            },
            isSuccess: {
                show: false,
                text: ''
            },
            lock: false,
            KeyouCryptography: null,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_A01'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_B01'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_C02'
                },
                {
                    id: 'C03',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_C03'
                },
                {
                    id: 'C04',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_C04'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_C01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_D02'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_E01'
                },
                {
                    id: 'F01',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_F01'
                },
                {
                    id: 'F02',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_F02'
                },
                {
                    id: 'G01',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_G01'
                },
                {
                    id: 'G02',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_G02'
                },
                {
                    id: 'H01',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_H01'
                },
                {
                    id: 'H02',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_H02'
                },
                {
                    id: 'H03',
                    touchCode: 'WAP_T_BABYFLOWER_SETTING_01_H02'
                }
            ]
        };
    },
    watch: {
        orAll(val) {
            this.quick();

        },
        // day(oldVal,newVal){
        //     console.log(1)
        //     if (newVal!=''&&newVal!=null){
        //         this.err.free1=false
        //     }
        // }

    },
    created() {
        this.mobile = store2.default.get('usrmob');
        this.getpayStatusQuery();
        this.orAll++;
        if (this.$route.query.stuId) {
            this.orAll++;
            this.synFlag = '02';
            console.log(this.$route.query.stuId);
            api.accountInfoQuery({
                stuId: this.$route.query.stuId
            })
                .then(res => {
                    console.log(res);
                    this.day = res.list[0].dailyLimit;
                    this.account = res.list[0].dePayAccount;
                    this.free = res.list[0].freePayLimit;
                    this.mobile = res.list[0].mobNo;
                    this.month = res.list[0].monthlyLimit;
                    this.name = res.list[0].nickName;
                    this.openSts = res.list[0].openSts;
                    this.smsFlag = res.list[0].smsFlag;
                    this.ID = res.list[0].stuId;
                    if (res.list[0].smsFlag == 1) {
                        this.isActive = true;
                    }

                });
        }else if(sessionStorage.getItem('babyID')){
            this.orAll++;
            this.synFlag = '02';
            console.log(this.$route.query.stuId);
            api.accountInfoQuery({
                stuId: sessionStorage.getItem('babyID')
            })
                .then(res => {
                    console.log(res);
                    this.day = res.list[0].dailyLimit;
                    this.account = res.list[0].dePayAccount;
                    this.free = res.list[0].freePayLimit;
                    this.mobile = res.list[0].mobNo;
                    this.month = res.list[0].monthlyLimit;
                    this.name = res.list[0].nickName;
                    this.openSts = res.list[0].openSts;
                    this.smsFlag = res.list[0].smsFlag;
                    this.ID = res.list[0].stuId;
                    if (res.list[0].smsFlag == 1) {
                        this.isActive = true;
                    }
                    sessionStorage.removeItem('babyID')
                });
        }
        api.flowerAcplist({})
            .then(res => {
                if (res.usrBnkInfos.length == 0) {
                    this.flag = false;
                } else {
                    this.flag = true;
                    this.banks = res.usrBnkInfos;
                    if (this.$route.query.stuId) {
                        console.log('111111111111111111', this.banks);
                        this.banks.forEach(item => {
                            if (item.cardid == this.account) {
                                this.bank = item;
                                this.quick();
                            }else {
                                this.bank=this.banks[0]
                                this.account = this.bank.cardid;
                                this.quick();
                            }
                        });
                    } else {
                        this.bank = this.banks[0];
                        // console.log('222222222222222222', this.bank.cardid);
                        this.account = this.bank.cardid;
                    }
                    console.log(this.banks);
                    // console.log(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
        if (this.$route.query.code) {
            api.decrypt({ stuId: this.$route.query.code })
                .then(res => {
                    console.log(res.stuId);
                    this.ID = res.stuId;
                    this.scanIn=true
                })
                .catch(err => {
                    console.log(err);
                });
            // this.ID = this.$route.query.result;
        }
        if (sessionStorage.getItem('babyCode')) {
            api.decrypt({ stuId: sessionStorage.getItem('babyCode') })
                .then(res => {
                    console.log(res.stuId);
                    this.ID = res.stuId;
                    this.scanIn=true
                    sessionStorage.removeItem('babyCode')
                })
                .catch(err => {
                    console.log(err);
                });
            // this.ID = this.$route.query.result;
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);

    },
    methods: {
        // 获取ID
        getID() {
            if(!flag){
                return
            }
            this.orAll++;
        },
        //获取账户
        getAccount() {
            console.log('开始')
            if(this.$route.query.stuId){
                sessionStorage.setItem('babyID',this.$route.query.stuId)
            }
            if(this.$route.query.code){
                sessionStorage.setItem('babyCode',this.$route.query.code)
            }

            this.orAll++;
            if (!this.flag) {
                this.$router.push({
                    name: 'addNewBanks',
                    query: {
                        dealChn: 'xiaobaohua'
                    }
                });
            }

        },
        // 设置额度
        set(type, num) {
            this.orAll++;
            // console.log(this.orAll);

            if (type == 1) {
                this.day = num;
                this.numbers();
                this.number()
                this.input = false;
                console.log(999)
                if (this.day != '' || this.day != null) {
                    this.err.day = false;
                    this.err.free2=false
                }
            } else if (type == 2) {
                this.month = num;
                if (this.month != '' || this.month != null) {
                    this.err.month = false;
                }
            } else if (type == 3) {
                this.free = num;
                this.numbers();
                if (this.day == null || this.day == '') {
                    this.err.free1 = false;
                    this.err.free2 = true;
                } else if (this.free != '' || this.free != null) {
                    this.err.free1 = false;
                    this.err.free2 = false;
                }

                if (this.day != null && this.day != '' && num > this.day) {
                    if (this.lock) return;
                    this.lock = true;
                    this.err.free3 = true;
                    // 三秒后消失
                    setTimeout(() => {
                        this.err.free3 = false;
                        this.lock = false;
                    }, 1000);
                }

            }


        },
        //短信服务
        handler(name, active) {
            // console.log(this.isActive);
            if (this.isActive) {
                this.smsFlag = 1;
            } else {
                this.smsFlag = 0;
            }
        },
        //消除错误提示
        outErr(name) {
            // this.numbers();
            this.number();
            if (this[`${name}`] != '' && this[`${name}`] != null) {
                if (name == 'free') {
                    this.err.free1 = false;
                } else {
                    this.err[`${name}`] = false;
                }
                if (name == 'day') {
                    this.input = false;
                    this.err.free2 = false;
                }
            } else {
                if(name='day'&&this.month!=''&&this.month!=null){
                    this.number()
                    return
                }
                this.err[`${name}`] = true;
            }
        },
        // 特殊情况
        errSupres() {
            if (this.day == null || this.day == '') {
                this.err.free1 = false;
                this.err.free2 = true;
            }
        },
        // 提交
        submit() {
            this.orAll++;
            if (this.isTrue) {
                console.log(1);
                api.accountInfoSyn({
                    dailyLimit: this.day,
                    dePayAccount: this.account,
                    freePayLimit: this.free,
                    mobNo: this.mobile,
                    monthlyLimit: this.month,
                    nickName: this.name,
                    openSts: this.openSts,
                    smsFlag: this.smsFlag,
                    stuId: this.ID,
                    synFlag: this.synFlag
                })
                    .then(res => {
                        console.log(res);
                        if (res.msgCd == 'BUS00000') {
                            if (this.$route.query.stuId) {
                                this.isSuccess.show = true;
                                this.isSuccess.text = '修改成功';
                                setTimeout(() => {
                                    this.isSuccess.show = false;
                                }, 1500);
                            } else {
                                sessionStorage.removeItem('alreadySee')

                                this.$router.push({
                                    path: 'myCard',
                                    query: {
                                        state: true
                                    }
                                });
                            }

                        }
                    })
                    .catch(err => {
                        console.log(err);
                        if (this.$route.query.stuId) {
                            this.isSuccess.show = true;
                            this.isSuccess.text = '修改失败,请重试';
                            setTimeout(() => {
                                this.isSuccess.show = false;
                            }, 1500);

                        } else {
                            this.$router.push({
                                path: 'myCard',
                                query: {
                                    state: false,
                                    msgInfo: err.msgInfo
                                }
                            });
                        }
                    });

            } else {
                if (this.ID == '' || this.ID == null) {
                    this.untext.one = true;
                }
                if (this.account == '' || this.account == null) {
                    this.untext.two = true;
                }
                if (this.day == '' || this.day == null) {
                    this.dayBYmonth=false
                    this.err.day = true;

                }
                if (this.month == '' || this.month == null) {
                    this.err.month = true;
                }
                if (this.free == '' || this.free == null) {
                    this.err.free2 = false;
                    this.err.free1 = true;
                }
            }
        },
        // 数字限制
        number() {
            this.orAll++;
            // console.log(this.orAll);
            // this.err.free1=false
            if (Number(this.free) > Number(this.day)) {
                this.free = this.day;
            }

            if(this.month!=''&&this.month!=null){
                if (Number(this.day) > Number(this.month)) {
                    this.day = ''
                    this.err.day = false;
                    this.dayBYmonth=true

            setTimeout(() => {
                this.dayBYmonth = false;
                this.err.day = true;
            }, 2000);

        }
            }

        },
        numbers() {
            this.orAll++;
            if (Number(this.free) > Number(this.day)) {
                this.free = this.day;
            }
            // if(this.month!=''&&this.month!=null){
            //     if (Number(this.day) > Number(this.month)) {
            //         this.day = ''
            //     }
            // }

        },
        //判断信息填完整
        quick() {
            if (this.ID != '' && this.account != '' && this.day != null && this.day != '' && this.month != null && this.month != '' && this.free != null && this.free != '') {
                this.isTrue = true;
            } else {
                this.isTrue = false;
            }
        },
        check(name) {//选择银行卡
            this.orAll++;
            this.$set(this.isPopupShow, 'bottom', false);
            this.bank = name;
            this.account = name.cardid;
            // console.log(name);
        },
        showPopUp(type) {
            this.$set(this.isPopupShow, type, true);
            console.log(1111);
        },
        hidePopUp(type) {
            this.$set(this.isPopupShow, type, false);
        },
//去扫码
        goScan() {
            sessionStorage.setItem('alreadySee','1')
            // alert(sessionStorage.getItem('alreadySee'))
            // window.location.href = 'jsmcc//H/28';
            window.location.href = 'jsmcc://H/28';

            // console.log(9999999999999);
            // this.$router.push({
            //     name: 'scan'
            // });
        },
        // 去交易明细
        gopay() {
            this.$router.push({
                name: 'transactionDetails',
                query: {
                    stuId: this.ID
                }
            });
        },
        //获取支付密码
        getpayStatusQuery() {
            // 查询用户是否设置支付密码
            api.paymentApi
                .StatusQuery({
                    entryTx: '',
                    mobileNo: this.mobile // store2.default.get("usrmob");
                })
                .then((data) => {
                    console.log(data.pwdsts, '支付密码状态');
                    if (data.pwdsts === '00') {
                        this.IsPassword = 2;
                    } else if (data.pwdsts === '01') {
                        this.IsPassword = 1;
                    } else if (data.pwdsts === '02') {
                        this.IsPassword = 1;
                        // this.$toast.info('您的密码已锁定', 3000);
                    } else if (data.pwdsts === '03') {
                        this.IsPassword = 1;
                        // this.$toast.info('您的密码已冻结', 3000);
                    }
                })
                .catch((err) => {
                    if (err.pwdsts === null) {
                        this.IsPassword = 3;
                        // this.$toast.info(err.msgInfo, 3000);
                    }
                });
        },
        //设置密码
        therePassword() {
            if (!this.isTrue) {
                return;
            }
            if (this.IsPassword === 2) {
                console.log(this.IsPassword);
                sessionStorage.setItem('babyUrl',window.location.href)
                this.$toast.info('请先设置密码', 3000);
                this.$router.push({
                    path: `/setPassword/${this.title}`
                });
            } else {
                this.sfot = 2;
                console.log(11);
                // this.submit();
            }
        },
        cancleChange() {
            this.sfot = '';
        },
        setUp(y) {
            if (y === 1) {
                this.$router.push({
                    path: '/setPassword/1'
                });
            } else {
                this.$router.push({
                    name: 'changePassword'
                });
            }
        },
        childByVal(val) {
            store2.default.set('mima', val.mima);
            const title = 2;
            api.paymentApi
                .PaymentPasswordVerification({
                    encpwd: val.mima,
                    usrid: store2.default.get('usrmob') // store2.default.get("usrmob");
                })
                .then((data) => {
                    console.log(data);
                    if (data.code == 'RMP0000') {
                        this.sfot = '';
                        this.submit();
                    } else {
                        Toast.info('支付密码输入有误，请重新输入');
                        this.reload();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    background-color: #F7F7F7;
    min-height: 100vh;

    .content-warp {
        width: 100%;
        //height: 1176px;
        padding-top: 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;

        .pay {
            margin-left: 480px;
            margin-bottom: 31px;
            font-size: 30px;
        }

        .content {
            width: 688px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 1);
            padding: 0 20px;
            box-sizing: border-box;
            color: #000000;


            > div {
                display: flex;
                justify-content: space-between;
                border-bottom: 2px solid #F6F6F6;
                align-items: center;
                position: relative;

                .err {
                    position: absolute;
                    bottom: 10px;
                    left: 60px;
                    color: red;
                    font-size: 22px;
                }

                sup {
                    color: red;
                    margin-right: 5px;
                }

                sub {
                    color: white;
                    margin-right: 5px;
                }

                p {
                    font-size: 28px;
                    color: #000000;
                }

                input {

                    width: 240px;
                    height: 40px;
                    border: none;
                    outline: none;
                    font-size: 26px;
                    background-color: white;


                    ::placeholder {
                        font-size: 26px;
                        color: #C8C8C8;
                        text-align: right;
                    }
                }
            }

            .studyId {
                width: 100%;
                height: 104px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 28px;
                position: relative;
                //border-bottom: 2px solid #F6F6F6;
                input {
                    width: 400px;
                }

                .click {
                    width: 35px;
                    height: 35px;
                    position: absolute;
                    right: 0
                }

                .right {
                    display: flex;
                    align-items: center;

                    .first {
                        text-align: right;
                    }


                    img {
                        width: 35px;
                        height: 35px;
                        margin-left: 12px;
                    }
                }

            }

            .name {
                height: 85px;
                width: 100%;
                //border-bottom: 2px solid #F6F6F6;
                input {
                    text-align: right;
                }
            }

            .account {
                height: 85px;
                width: 100%;

                .right {
                    display: flex;
                    align-items: center;
                    color: #C8C8C8;
                    font-size: 26px;

                    img {
                        width: 30px;
                        height: 30px;
                        margin-right: 15px;
                    }
                }
            }

            .limit {
                height: 160px;
                font-size: 28px;

                .top {
                    margin-bottom: 10px;
                }

                .right {
                    display: flex;

                    div {
                        width: 90px;
                        height: 34px;
                        border-radius: 4px 4px 4px 4px;
                        border: 2px solid #FDA034;
                        font-size: 26px;
                        color: #FDA034;
                        text-align: center;
                        line-height: 34px;
                        margin-left: 10px;
                        margin-top: 10px;
                    }
                }
            }
        }

        .message {
            width: 690px;
            height: 77px;
            border-radius: 10px 10px 10px 10px;
            background-color: white;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;

            .md-switch.active {
                background-color: #FDA034;
            }

            p {
                font-size: 32px;
            }
        }

        .submit {
            width: 688px;
            height: 79px;
            border-radius: 20px 20px 20px 20px;
            background-color: #DBDBDB;
            //background: rgba(255, 176, 52, 1);
            margin-top: 160px;
            text-align: center;
            line-height: 79px;
            font-size: 34px;
            color: white;
            letter-spacing: 6px;
        }

        .true {
            background: rgba(255, 176, 52, 1);

        }
    }

    .md-example-popup-bottom {
        background-color: white;
        padding-bottom: 0.98rem;

        .bank {
            height: 0.98rem;
            background: #fff;
            font-size: .3rem;
            display: flex;
            justify-content: left;
            -webkit-box-align: center;
            align-items: center;
            border: 1px solid #d5d5d5;
            padding-left: 0.3rem;
            padding-right: 0.3rem;
        }

        img {
            width: 0.36rem;
            height: 0.36rem;
        }

        span {
            text-align: left;
            color: #333;
            margin-left: 0.2rem;
            font-size: .3rem;
            font-weight: 400;
        }
    }

    .untext::placeholder {
        color: red;
        font-size: 28px;
        font-weight: bold;
    }

    .success {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;

        .text {
            width: 384px;
            height: 95px;
            border-radius: 47px 47.5px 47.5px 47.5px;
            background: rgba(0, 0, 0, 1);
            font-size: 40px;
            line-height: 95px;
            text-align: center;
            color: white;
        }
    }

    .passwordPopusMask {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.75);

        /deep/ .isSelectorShow {
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
                    font-weight: 500;
                    text-align: left;
                    color: #333333;
                    margin-left: 209px;
                    font-size: 30px;
                    font-weight: 400;
                }
            }

            .pouContain {
                height: 98px;
                background: #ffffff;
                font-size: 30px;
                display: flex;
                justify-content: left;
                align-items: center;
                border: 1px solid #d5d5d5;
                padding-left: 30px;
                padding-right: 30px;

                img {
                    width: 36px;
                    height: 36px;
                }

                span {
                    font-weight: 500;
                    text-align: left;
                    color: #333333;
                    margin-left: 20px;
                    font-size: 30px;
                    font-weight: 400;
                }
            }

            .kong {
                height: 98px;
                background-color: #ffffff;
            }
        }

        .unbtn {
            background: #8ec4f6;
            pointer-events: none;
        }

        .smallTips {
            //   width: 408px;
            height: 42px;
            font-size: 30px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            margin: 20px auto;
            color: #666666;
            line-height: 42px;
        }

        .setUp {
            color: #238ff2;
        }

        #tradePin {
            display: block;
            width: 85%;
            height: 88px;
            font-size: 30px;
            margin: auto;
            padding-left: 20px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 40px;
            border: 1px solid #e5e5e5;
        }

        .popupTitle {
            height: 90px;
            font-size: 34px;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 90px;
        }

        .passwordPopus {
            position: absolute;
            top: 250px;
            left: 30px;
            width: 640px;
            padding: 25px;
            border-radius: 8px;
            background-color: #ffffff;
        }

        .hr {
            width: 600px;
            height: 1px;
            margin-bottom: 50px;
            background: #e6e6e6;
        }

        .colse {
            position: absolute;
            top: 5px;
            right: 40px;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 40px;
            color: #999999;
        }
    }

    .passwordPage {
        font-family: PingFangSC, PingFangSC-Medium;

        .isTitle {
            height: 56px;
            font-size: 40px;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 56px;
            padding-top: 80px;
            margin: auto;
        }

        #tradePin {
            display: block;
            width: 85%;
            height: 88px;
            font-size: 30px;
            margin: 40px auto;
            padding-left: 20px;
            border-radius: 20px;
            text-align: center;
            border: 1px solid black;
        }

        .briefVal {
            height: 42px;
            font-size: 30px;
            font-weight: 400;
            text-align: center;
            color: #999999;
            line-height: 42px;
            margin-top: 40px;
        }

        #login_keyboard {
            width: 100%;
            height: 448px;
        }
    }

}


</style>
