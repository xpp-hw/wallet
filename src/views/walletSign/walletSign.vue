<template>
    <div>
        <div class="container walletsign" id="container">
            <div class="account-index-wrapper">
                <div class="walletsign-info">
                    <p>账号签约</p>
                    <p>
                        签约账号 <span>{{ showmob }}</span>
                    </p>
                </div>
                <p class="sign-note">
                    此手机号为您当前登录手机号，签约成功后，即可使用当前手机号查看钱包账户。
                </p>
                <div class="sign-note" style="padding-top: 0.1rem">
                    <md-agree
                        v-model="agreeConf.checked"
                        :disabled="agreeConf.disabled"
                        :size="agreeConf.size"
                        icon-type="circle"
                        @change="
                            onChange(agreeConf.name, agreeConf.checked, $event)
                        "
                    >
                        我已同意并阅读<span
                            style="color: #00a4e2"
                            @click="selfAgree()"
                            >《移动钱包业务受理协议》</span
                        >
                    </md-agree>
                </div>
                <button
                    class="getcode"
                    id="A02"
                    @click="getcode"
                    :style="{
                        background: this.agreeConf.checked
                            ? '#0195ff'
                            : '#dbdbdb',
                    }"
                >
                    {{ smsMsg }}
                </button>
                <p class="bottom-logo">移动钱包</p>
                <div class="loading-toast" id="isZqq" v-if="loading">
                    <img src="@/assets/images/loading-toast.gif" alt="" />
                </div>
                <!-- 短信验证码 -->
                <div class="infor_container" v-if="inforShow">
                    <div class="infor_box">
                        <p class="infor_title">您正在操作钱包账户签约</p>
                        <p class="title_note">请输入短信验证码</p>
                        <p class="infor_mobile">
                            已发送短信验证码至<i>{{ showmob }}</i>
                        </p>
                        <div class="mobile_box">
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <!--                            <p></p>-->
                            <!--                            <p></p>-->
                            <input
                                type="number"
                                v-model="smsCode"
                                class="infor_ipt"
                                maxlength="6"
                                onkeyup="value=value.replace(/[^\d]/g,'')"
                                oninput="if(value.length>4)value=value.slice(0,4)"
                            />
                        </div>
                        <button
                            type="button"
                            class="infor_djs"
                            :disabled="send"
                            @click="getcode()"
                        >
                            重新获取 {{ countdown }}s
                        </button>
                        <!--                        <div-->
                        <!--                            class="voice"-->
                        <!--                            style="-->
                        <!--                                text-left: center;-->
                        <!--                                margin-top: 0.35rem;-->
                        <!--                                margin-bottom: 0.25rem;-->
                        <!--                                font-size: 0.24rem;-->
                        <!--                            "-->
                        <!--                        >-->
                        <!--                            收不到短信验证码？点击试试<span-->
                        <!--                                :style="[-->
                        <!--                                    {-->
                        <!--                                        color:-->
                        <!--                                            countdown == 60-->
                        <!--                                                ? '#1FA3EE'-->
                        <!--                                                : '#C6C6C6',-->
                        <!--                                    },-->
                        <!--                                    {-->
                        <!--                                        'text-decoration':-->
                        <!--                                            countdown == 60-->
                        <!--                                                ? 'underline #1FA3EE'-->
                        <!--                                                : 'none',-->
                        <!--                                    },-->
                        <!--                                ]"-->
                        <!--                                @click="getcode('voice')"-->
                        <!--                                >语音验证码</span-->
                        <!--                            >-->
                        <!--                        </div>-->
                        <div class="infor_buttons">
                            <p
                                class="infor_not"
                                id="A03"
                                @click="inforShow = false"
                            >
                                取消
                            </p>
                            <p
                                class="infor_sure"
                                id="A04"
                                :class="btnconfirm ? 'unbtn' : ''"
                                @click="checkInfor"
                            >
                                确定
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pop" v-if="popShow" ref="info" @scroll="onscroll">
            <div id="a6" class="title-item">
                <span class="titleTxt">移动钱包业务受理协议</span>
            </div>
            <div class="content">
                <img style="width: 2.11rem;height: 0.62rem;" alt="" src="@/assets/images/newRights/img_1.png" />
                <p>
                    受理日期：{{ date.year }}年{{ date.month }}月{{
                        date.day
                    }}日
                </p>
                <p>手机号码：{{ mobNo }}</p>
                <p>客户名称：{{ userName }}</p>
                <ul>
                    <li>鉴权方式：统一认证+短信验证码</li>
                    <li>受理类型：业务办理</li>
                    <li>
                        受理时间：{{ date.year }}-{{ date.month }}-{{
                            date.day
                        }}
                        {{ date.hour }}:{{ date.minute }}:{{ date.second }}
                    </li>
                    <li>受理渠道：此APP</li>
                    <li>商品名称：移动钱包</li>
                    <li>业务详情：</li>
                </ul>
                <div class="text">
                    <div v-html="agreementContent" ref="getHeight"></div>

                    <div style="width: 100%; height: 2rem; text-align: right">
                        <img
                            alt=""
                            :src="city"
                            style="
                                width: 2rem;
                                height: auto;
                                transform: rotate(-45deg);
                            "
                        />
                    </div>
                    <h4>甲方：{{ userName }}</h4>
                    <h4>
                        乙方：中国移动通信集团江苏有限公司{{ cityName }}分公司
                    </h4>
                    <img alt="" src="@/assets/images/newRights/img.png" />
                </div>
            </div>
            <div
                class="popBtn"
                :style="{ background: !disab ? '#0195ff' : '' }"
                @click="
                    disab ? '' : (popShow = false);
                    agree = true;
                    agreeConf.checked = true;
                "
            >
                我已阅读并知晓
            </div>
        </div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import { Agree } from 'mand-mobile';

export default {
    name: 'walletSign',
    components: {
        mdHeader,
        [Agree.name]: Agree
    },
    data() {
        return {
            disab: true,
            mobile: '',
            showmob: '',
            inforShow: false,
            // 倒计时秒数
            countdown: 60,
            // 定时器
            timer: null,
            smsMsg: '获取验证码',
            // 发送按钮可否点击
            send: false,
            smsCode: '',
            loading: false,
            btnconfirm: true,
            smsjrn: '', // 短信下发时会返回短信流水
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_WALLETSIGN_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_WALLETSIGN_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLET_WALLETSIGN_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_WALLET_WALLETSIGN_A04'
                }
            ],
            typeid: '',
            acctyp: '',
            agreeConf: {
                checked: false,
                name: 'agree4',
                size: 'md',
                disabled: false,
                introduction: '方形勾选框选中状态'
            },
            agree: false,
            popShow: false,
            date: {
                year: new Date().getFullYear(),
                month:
                    Number(new Date().getMonth() + 1) < 10
                        ? `0${Number(new Date().getMonth() + 1)}`
                        : Number(new Date().getMonth() + 1),
                day:
                    Number(new Date().getDate()) < 10
                        ? `0${Number(new Date().getDate())}`
                        : Number(new Date().getDate()),
                hour:
                    Number(new Date().getHours()) < 10
                        ? `0${Number(new Date().getHours())}`
                        : Number(new Date().getHours()),
                minute:
                    Number(new Date().getMinutes()) < 10
                        ? `0${Number(new Date().getMinutes())}`
                        : Number(new Date().getMinutes()),
                second:
                    Number(new Date().getSeconds()) < 10
                        ? `0${Number(new Date().getSeconds())}`
                        : Number(new Date().getSeconds())
            }, // 日期
            mobNo: '',
            userName: '',
            city: '',
            cityName: '',
            agreementContent: ''
        };
    },
    watch: {
        popShow(newV) {
            if (newV) {
                // console.log(this.$refs.getHeight.offsetHeight);
                if (this.$refs.getHeight.offsetHeight == '0') {
                    this.disab = false;
                }
            }
        },
        smsCode: {
            handler(val) {
                this.btnconfirm = !(val && val.length === 4);
            }
        }
    },
    mounted() {
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
        }
        document.body.style.backgroundColor = '#f5f5f5';
    },
    created() {
        this.acctyp = this.$route.query.acctyp || '';
        this.mobile = store2.default.get('usrmob');
        this.showmob = this.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.getCity();
        this.getAgreement();
    },
    methods: {
        getcode(type) {
            if (!this.agreeConf.checked) {
                // this.$toast.info("请同意并阅读《移动钱包业务受理协议》", 3000);
                return;
            }
            let data;
            if (type) {
                data = {
                    acctyp: this.acctyp,
                    mblno: '', // 原手机号，换绑的时候必传，签约非必传
                    smsType: '1'
                };
            } else {
                data = {
                    acctyp: this.acctyp,
                    mblno: '' // 原手机号，换绑的时候必传，签约非必传
                };
            }
            api.sendSigncode(data)
                .then((data) => {
                    console.log(data);
                    this.userDetermine();
                    this.smsjrn = data.smstjn;
                    this.inforShow = true;
                })
                .catch((err) => {
                    if (err.msgCd !== 'BUS00000') {
                        this.$toast.info(err.msgInfo);
                        if (err.msgCd === 'BUS20017') {
                            // 用户未登录，跳转登录
                        }
                    }
                });
        },
        userDetermine() {
            if (!this.timer) {
                // this.getcode()
                this.getValidStr();
                this.timer = setInterval(this.getValidStr, 1000);
            }
        },

        getValidStr() {
            if (this.countdown > 0 && this.countdown <= 60) {
                this.countdown -= 1;
                if (this.countdown !== 0) {
                    this.send = true;
                    this.smsMsg = `${this.countdown}秒后重新获取`;
                } else {
                    clearInterval(this.timer);
                    this.send = false;
                    this.countdown = 60;
                    this.smsMsg = '获取验证码';
                    this.timer = null;
                }
            }
        },
        checkInfor() {
            this.btnconfirm = true;
            if (this.smsCode.length === 4) {
                api.valiSigncode({
                    smsjrn: this.smsjrn,
                    yzm: this.smsCode,
                    mblno: this.mobile,
                    acctyp: this.acctyp
                })
                    .then((data) => {
                        console.log(data);
                        this.$router.push({
                            name: 'walletSignResult',
                            query: {
                                result: 0,
                                typeId: this.typeid,
                                dealChn: this.$route.query.dealChn
                            }
                        });
                    })
                    .catch((err) => {
                        if (err.msgCd === 'BUS20017') {
                            // 用户未登录，跳转登录
                        } else {
                            // if (err.msgInfo.indexOf('短信') !== -1 || err.msgInfo.indexOf('验证码') !== -1) {
                            //     this.$toast.info(err.msgInfo);
                            // } else {
                            //     this.$router.push(
                            //         {
                            //             name: 'walletSignResult',
                            //             query: {
                            //                 result: 1,
                            //                 reason: err.msgInfo
                            //             }
                            //         }
                            //     );
                            // }
                            this.$router.push({
                                name: 'walletSignResult',
                                query: {
                                    result: 1,
                                    reason: err.msgInfo,
                                    typeId: this.typeid,
                                    dealChn: this.$route.query.dealChn
                                }
                            });
                        }
                    });
            }
        },
        onChange(name, checked) {
            if (!this.agree && checked) {
                this.selfAgree();
            }
        },
        getCity() {
            api.getUserNo()
                .then((res) => {
                    this.city = require(`../../assets/images/zhang/${
                        res.cityNo
                    }.png`);
                    switch (res.cityNo) {
                        case '11':
                            this.cityName = '苏州';
                            break;
                        case '12':
                            this.cityName = '淮安';
                            break;
                        case '13':
                            this.cityName = '宿迁';
                            break;
                        case '14':
                            this.cityName = '南京';
                            break;
                        case '15':
                            this.cityName = '连云港';
                        case '16':
                            this.cityName = '徐州';
                            break;
                        case '17':
                            this.cityName = '常州';
                            break;
                        case '18':
                            this.cityName = '镇江';
                            break;
                        case '19':
                            this.cityName = '无锡';
                            break;
                        case '20':
                            this.cityName = '南通';
                            break;
                        case '21':
                            this.cityName = '泰州';
                            break;
                        case '22':
                            this.cityName = '盐城';
                            break;
                        case '23':
                            this.cityName = '扬州';
                            break;
                    }
                    this.mobNo = res.mobile.replace(
                        /(\d{3})\d{4}(\d{4})/,
                        '$1****$2'
                    );
                    const nu = res.userName.length - 1;
                    for (let i = 0; i < nu; i++) {
                        this.userName += '*';
                    }

                    this.userName += res.userName.slice(-1);
                })
                .catch((err) => {
                    console.log('------******-----');
                });
        },
        getAgreement() {
            api.agreement()
                .then((res) => {
                    this.agreementContent = res.agreementContent.replaceAll(
                        'px',
                        ''
                    );
                    if (this.agreementContent == '') {
                        this.disab = false;
                    }
                })
                .catch((err) => {
                    this.disab = false;
                });
        },
        onscroll() {
            const hgt = this.$refs.info.scrollHeight;
            const clihgt = this.$refs.info.clientHeight;
            const scrHgt = this.$refs.info.scrollTop;
            // eslint-disable-next-line radix
            if (parseInt(hgt - scrHgt - 30) < clihgt) {
                this.disab = false;
            }
        },
        selfAgree() {
            this.popShow = true;
            if (this.disab === true && this.agree === false) {
                this.$toast.info('请滑动文字到底阅读完协议');
                console.log(999);
            }
        }
    }
};
</script>

<style scoped lang="less">
.pop {
    width: 100vw;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    background: white;
    z-index: 99;
    overflow-y: scroll;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    padding: 0 30px;
    padding-top: 40px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
        width: 0 !important;
    }
    p {
        font-size: 0.26rem;
        color: #666666;
        line-height: 0.4rem;
    }
    .title-item {
        background-color: #fff;
        text-align: center;
        position: relative;
        font-size: 0.36rem;
        color: #333;
        font-weight: 700;
        margin-bottom: 0.2rem;

        .arrowIco {
            position: absolute;
            left: 36px;
            top: 50%;
            transform: translateY(-50%);
        }

        .titleTxt {
            color: #13252e;
            font-size: 36px;
        }
    }
    .content {
        margin: 30px;
        font-size: 26px;
        line-height: 40px;

        .serviceProtocol {
            font-size: 36px;
            color: #333333;
            font-weight: 600;
            line-height: 50px;
            text-align: center;
            margin-bottom: 20px;
        }

        .serviceContent {
            text-indent: 72px;
        }

        .smallTitle {
            font-size: 26px;
            text-align: left;
            font-weight: 600;
            color: #333333;
            line-height: 40px;
        }

        .secondTitle {
            font-size: 26px;
            font-weight: 600;
            text-align: left;
            color: #333333;
            line-height: 40px;
        }

        .company {
            font-size: 26px;
            font-weight: 600;
            text-align: right;
        }

        .serviceTime {
            font-size: 26px;
            font-weight: 600;
            text-align: right;
            margin-right: 104px;
        }

        .whiteBlock {
            width: 100%;
            height: 100px;
        }

        //.md-button {
        //    position: -webkit-sticky;
        //    width: 700px;
        //    bottom: 0;
        //    left: 50%;
        //    transform: translateX(-50%);
        //}

        .agrement {
            span {
                font-size: 50px;
            }
        }
    }
    .popBtn {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.32rem;
        font-weight: 500;
        background: #efefef;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.3rem auto;
        position: sticky;
        bottom: 30px;
    }
}
.walletsign-info {
    width: 100%;
    background: #fff;
}
.walletsign-info p:nth-of-type(1) {
    font-size: 0.54rem;
    color: #333;
    padding-left: 0.3rem;
    padding-top: 0.58rem;
    padding-bottom: 0.7rem;
    font-weight: 500;
}
.walletsign-info p:nth-of-type(2) {
    font-size: 0.32rem;
    color: #333;
    padding-left: 0.3rem;
    padding-bottom: 0.3rem;
}
.walletsign-info p:nth-of-type(2) span {
    padding-left: 0.4rem;
}
.sign-note {
    width: 6.87rem;
    margin: 0 auto;
    font-size: 0.28rem;
    color: #999;
    line-height: 1.5;
    padding-top: 0.4rem;
}
.getcode {
    position: fixed;
    bottom: 2.9rem;
    width: 4rem;
    left: 1.75rem;
    background: #0195ff;
    border-radius: 0.1rem;
    color: #fff;
    font-size: 0.36rem;
    height: 0.9rem;
    border: none;
}
.bottom-logo {
    position: fixed;
    bottom: 0.82rem;
    text-align: center;
    color: #d7d7d7;
    font-size: 0.36rem;
    width: 100%;
}
.infor_container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
    .infor_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 6.9rem;
        background: #ffffff;
        border-radius: 0.15rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        box-sizing: border-box;
    }
    .infor_title {
        font-size: 0.3rem;
        color: #333333;
        padding-top: 0.4rem;
        padding-bottom: 0.2rem;
        border-bottom: 0.02rem solid #e4e4e4;
        margin-bottom: 0.2rem;
    }
    .title_note {
        font-size: 0.4rem;
        color: #333333;
        font-weight: 700;
        padding-top: 0.2rem;
        margin-bottom: 0.2rem;
    }
    .infor_mobile {
        font-size: 0.3rem;
        color: #999999;
        i {
            font-style: normal;
        }
    }
    .mobile_box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 0.8rem;
        margin-bottom: 0.2rem;
        margin-top: 0.2rem;
        p {
            width: 1.23rem;
            height: 0.6rem;
            font-size: 0.32rem;
            color: #000000;
            text-align: center;
            border-bottom: 0.02rem solid #dbdbdb;
            margin: 0 0.1rem;
        }
    }
    .infor_ipt {
        position: absolute;
        left: 0;
        top: 0;
        width: 108%;
        height: 100%;
        border: 0;
        outline: none;
        font-size: 0.32rem;
        color: #000000;
        letter-spacing: 1.23rem;
        text-indent: 1rem;
        background: transparent;
        z-index: 46;
        color: transparent;
        caret-color: transparent;
        text-shadow: 0 0 0 #000;
    }
    .infor_main {
        width: 100%;
    }

    .infor_bototm {
        width: 100%;
        height: 0.76rem;
    }
    .infor_djs {
        font-size: 0.24rem;
        color: #999999;
        border: 0;
        background: none;
        display: block;
        margin-bottom: 0.2rem;
    }
    .infor_buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 0.35rem;
        padding-top: 0.15rem;
        p {
            width: 2.9rem;
            height: 0.82rem;
            border-radius: 0.15rem;
            font-size: 0.36rem;
            text-align: center;
            line-height: 0.82rem;
        }
        .infor_not {
            color: #999999;
            background: #ffffff;
            border: 0.02rem solid #828282;
        }

        .infor_sure {
            color: #ffffff;
            background: #238ff2;
        }
        .unbtn {
            background: #8ec4f6;
            pointer-events: none;
        }
    }
}
</style>
