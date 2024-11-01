<template>
    <div class="contaioner">
        <!-- <div class="account-warp">
            <div class="account-video" @click="play">
                <div class="fenmian" :class="{ fenmian2: jtImg }">
                    <div v-show="imgshow"></div>
                </div>
                <video
                    src="@/assets/video/2.mp4"
                    controls
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="true"
                    playsinline
                    webkit-playsinline
                    poster="@/assets/images/accountVideoImg.png"
                    ref="video"
                ></video>
            </div>
        </div> -->
        <div class="hebao">
            <div class="top">
                <span>零钱账户</span>
            </div>
            <div class="content">
                <div
                    id="C01"
                    style="background:#FFF1F9"
                    class="contentList"
                    @click="goHeBao(b2cStatus)"
                >
                    <img
                        class="cardImg"
                        src="../../assets/images/banks/hebao_icon.png"
                    />
                    <div class="main">
                        <p class="account">零钱 <span>支付账户</span></p>
                        <p class="code">手机号码：{{ mobileNo || "" }}</p>
                    </div>
                    <div  class="btn" :style="b2cStatus =='5'?'': b2cStatus =='3'?'':'background:#00aeff'">{{b2cStatus =='5'?'去查看':b2cStatus =='3'?'去查看':'去开通'}}</div>
                </div>
            </div>
        </div>
        <div class="smallchange">
            <div class="top">
                <span>电子账户</span>
                <span id="A01" class="set" @click="setIntoInfor">设置</span>
            </div>
            <div class="content">
              <template v-for="(item, idx) in changeList">
                <div
                    :id="'B0' + (idx + 1)"
                    :key="idx"
                    :style="{ background: colorList[idx % 4] }"
                    class="contentList"
                    @click="goOpenOrSearch(item)"
                    v-if="(item.orgCode !== 'CMB' && item.orgCode !== 'BOCM') || (item.orgCode == 'BOCM' && item.accsts !== '00' && item.accsts !== '02' && item.accsts !== '09') || item.accsts == '01'" 
                >
                  <div class="cardImg"><img :src="item.image" /></div>
                  <div class="main">
                      <p class="account">
                          {{ item.orgName }} <span>电子账户</span>
                      </p>
                      <p
                          v-if="item.accsts == '01' || item.accsts == '03'"
                          class="code"
                      >
                          {{ item.accNbr }}
                          <img
                              v-if="item.defaultAccFlg == '01'"
                              alt=""
                              src="../../assets/images/banks/defaultAccount.png"
                          />
                      </p>
                      <p v-else-if="item.accsts == '00'" class="openBtn btn">
                          去开通
                      </p>
                  </div>
                  <div v-if="item.accsts == '01'" class="btn">去查看</div>
                  <p v-else-if="item.accsts == '03'" class="btn" id="freeze">
                      冻结中
                  </p>
                </div>
              </template>
            </div>
        </div>
        <!-- 数币账户区域 -->
        <div class="shubi" v-if="shubiList.length > 0">
           <div class="top">
                <span>数币账户</span>
            </div>
           <div class="content">
                <div
                    v-for="(item, idx) in shubiList"
                    :key="idx"
                    style="background: #fff"
                    class="contentList"
                >
                    <div class="cardImg"><img :src="getImg(item.bankCode)" /></div>
                    <div class="main">
                        <p class="account">
                            {{ item.debtorAgentName }}钱包 <span>({{item.walletId}})</span>
                        </p>
                        <p class="code">
                            {{ item.mobile }}
                        </p>
                    </div>
                      <div class="shubiImg"><img src="../../assets/images/banks/shubi_icon.png" /></div>
                </div>
            </div>
        </div>

        <!-- 交行养老金区域 -->
        <div class="BOCM_Pension" style="padding-bottom:1.6rem">
            <div class="top">
                <span>养老金资金账户</span>
            </div>
            <div @click="gobocmPension">
                <div
                    v-for="(item, idx) in changeList"
                    :key="idx"
                >
                    <div v-if="item.orgName.indexOf('交通') > -1" class="BOCM_contaioner">
                        <div class="cardImg">
                            <img :src="item.image" />
                        </div>
                        <div class="main">
                            <p class="account">
                                {{ item.orgName }} <span>养老金资金账户</span>
                            </p>
                            <p v-if="bocmPensionSts == '1'" class="openBtn btn" style="background: #F47B87;">去缴存</p>
                            <p v-else-if="bocmPensionSts == '3'" class="openBtn btn">
                                开户中
                            </p>
                            <p v-else-if="bocmPensionSts == '2' || bocmPensionSts == '4' || bocmPensionSts == '5'" class="openBtn btn">
                                去开通
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 删除银联绑定的银行卡 -->
        <md-popup
            v-model="defaultDeleteShow"
            class="defaultAnddelete"
            position="bottom"
        >
            <div class="pouContain">
                <div
                    id="E01"
                    class="setDefault"
                    style="text-align: center"
                    @click="orbabay"
                >
                    解除绑定
                </div>
                <div
                    id="E02"
                    class="deleteBank"
                    style="text-align: center"
                    @click="noUnBindCard"
                >
                    取消
                </div>
            </div>
        </md-popup>
        <!-- 删除银行卡输入手机号 -->
        <md-dialog
            :id="msgDialog.btns.id"
            v-model="msgDialog.open"
            :btns="msgDialog.btns"
            :closable="false"
            class="msgDialog"
            title="请输入短信验证码"
        >
            <p class="msgTips">已发送至开户银行卡预留手机号</p>
            <md-codebox v-model="msgCode" :mask="false" :maxlength="4" system />
            <button
                :disabled="attcode"
                class="errorTips"
                @click="getTimeOutShow"
            >
                {{ errorTips }}
            </button>
        </md-dialog>
        <div v-if="babyPop" class="babyPopup">
            <div class="box">
                <div class="top">温馨提示</div>
                <div class="mid">
                    当前的账户是"小宝花"付款的主账户，删除后将无法付款，确认是否进行删除？
                </div>
                <div class="bottom">
                    <div class="left" @click="noUnBindCard">取消</div>
                    <div class="right" @click="unBindCard">确认</div>
                </div>
            </div>
        </div>
        <babycheck
            v-if="babyGetCode"
            :Hfbtype="'02'"
            @closeCodeModel="closeCodeModel"
        ></babycheck>
        <div v-if="llbPop" class="babyPopup">
            <div class="box">
                <div class="top">温馨提示</div>
                <div class="mid">你已参加流量宝活动，请先关闭</div>
                <div class="bottom">
                    <div class="left" @click="noUnBindCard">取消</div>
                    <div class="right" @click="llbsure">确认</div>
                </div>
            </div>
        </div>
        <checkCode
            v-if="llbCheck"
            :Hfbtype="'02'"
            @closeCodeModel="closeCodeModel"
        ></checkCode>
        <div v-if="isShowKuang" class="maskBox">
            <div class="kuang">
                <p class="tips">温馨提示</p>
                <div class="hr"></div>
                <div class="contentBox">
                    <p class="content">
                        <span v-if="freeze == 'spdb' || freeze == 'SPDB'"
                            >账户已冻结，请携带个人银行卡到浦发网点解除冻结</span
                        >
                        <span v-else
                            >账户已冻结，请登录招商银行手机银行APP，点击【银行卡】-【联名钱包】-【移动钱包】-【解除冻结】</span
                        >
                    </p>
                </div>
                <div class="btn" @click="isShowKuang = false">知道了</div>
            </div>
        </div>

        <md-popup v-model="showPop" :mask-closable="false">
            <div class="gotoSetLoose" >
                <div class="loseTitle">温馨提示</div>
                <div class="cont">
                    <p>{{ errorMessage }}</p>
                    <div class="btnBox">
                        <md-button type="default" size="small" @click="confuse">知道了</md-button>
                    </div>
                </div>
            </div>
        </md-popup>

    </div>
</template>

<script>
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import babycheck from '@/views/babyFlower/getCode.vue';
import checkCode from '@/views/traffic/checkCode';

export default {
    components: {
        babycheck,
        checkCode
    },
    data() {
        return {
            showPop: false,
            errorMessage: '您已成功开通交通银行养老金资金账户，请前往交行APP > 点击全部 > 选择投资理财专区 > 点击养老专区',
            walletNum: '',
            freeze: '',
            isShowKuang: false,
            imgshow: true,
            jtImg: true,
            babyGetCode: false,
            changeList: [],
            hebaoList: [],
            ylBankList: [],
            shubiList: [], // 数币集合
            colorList: ['#FFFAF6', '#F3F4F8', '#FFF1F9', '#F7F4FE'],
            defaultBg: require('../../assets/images/banks/default_bg.png'),
            mobileNo: '',
            hasaccount: '',
            defaultOrgcode: '',
            defaultDeleteShow: false, // 设置卡删除弹窗
            msgDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        id: 'E04',
                        handler: () => {
                            this.msgDialog.open = false;
                            this.msgCode = '';
                        }
                    },
                    {
                        text: '提交',
                        id: 'E03',
                        handler: () => {
                            this.commitDeleteBank();
                        }
                    }
                ]
            },
            msgCode: '',
            smsJrn: '',
            whichCard: {}, // 表示哪张卡
            codesendTips: store2.default
                .get('usrmob')
                .replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            errorTips: '60',
            sec: 61,
            attcode: true,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_A01'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_B04'
                },
                {
                    id: 'B05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_B05'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_C02'
                },
                {
                    id: 'C03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_C03'
                },
                {
                    id: 'C04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_C04'
                },
                {
                    id: 'C05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_C05'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D02'
                },
                {
                    id: 'D03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D03'
                },
                {
                    id: 'D04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D04'
                },
                {
                    id: 'D05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D05'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D02'
                },
                {
                    id: 'D03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D03'
                },
                {
                    id: 'D04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D04'
                },
                {
                    id: 'D05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D05'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D02'
                },
                {
                    id: 'D03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D03'
                },
                {
                    id: 'D04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D04'
                },
                {
                    id: 'D05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D05'
                },
                {
                    id: 'D06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D06'
                },
                {
                    id: 'D07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D07'
                },
                {
                    id: 'D08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D08'
                },
                {
                    id: 'D09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D09'
                },
                {
                    id: 'D10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D10'
                },
                {
                    id: 'D11',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_D11'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_E01'
                },
                {
                    id: 'E02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_E02'
                },
                {
                    id: 'E03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_E03'
                },
                {
                    id: 'E04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_ALLACCOUNT_E04'
                }
            ],
            babyPop: false,
            babyList: [],
            llbPop: false,
            isllb: false,
            llbCheck: false,
            accountPlus: 0,
            localSign: '',
            b2cStatus: '1',
            bocmPensionSts: ''
        };
    },
    created() {
        this.$store.commit('LOADING', true);
        this.queryCardList()
        this.queryAccount();
        this.hasaccount = this.$route.query.hasaccount;
        this.mobileNo = store2.default
            .get('usrmob')
            .replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.getChangeList();
        // this.getBankList();
        this.getCmbList();// 获取数币信息
        this.getInfoRefresh();
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.getbaby();
        this.isOpenllb();
        this.getInfoList(); // 获取和包信息
        this.queryPensionAcc() // 交行养老金开户状态
    },
    mounted() {
        // // 监听视频完
        // this.$refs.video.addEventListener('ended', () => {
        //     console.log('video is ended');
        //     this.jtImg = true;
        // });
    },

    methods: {
      queryCardList() {
        if (!store2.default.get('bankImgList') || store2.default.get('bankImgList').length < 1) {
          // 获取卡面信息
          api.cardImageQuery({ accountType: '01' })
          .then((res) => {
            this.accountPlus++
            const imgList = res.list;
            store2.default.set('bankImgList', imgList);
          })
          .catch((err) => {
            this.accountPlus++
            store2.default.set('bankImgList', []);
            console.log(err.msgInfo);
          });
        } else {
          this.accountPlus++
        }
      },
        queryPensionAcc() {
            this.$store.commit('LOADING', true);
            api.openStsQuery({})
            .then(data => {
                this.$store.commit('LOADING', false);
                // openStatus 开户状态 1-已开户 2-未开户 3-开户中 4-已销户 5-开户失败
                this.bocmPensionSts = data.openStatus || '2'
            })
            .catch(() => {
                this.$store.commit('LOADING', false);
            })
        },
        getImg(id) {
            try {
                // return require(`../../assets/images/banks/bankimages/icon_${id}.png`);
                if (id == 'BOCM') {
                    return 'https://upay.12580life.com/upay/wps/images/banks/icon_BCOM.png';
                }
                if (id == 'Tenpay') {
                    return 'https://upay.12580life.com/upay/wps/images/banks/QQ.png';
                }
                if (id == 'MYBANK') {
                    return 'https://upay.12580life.com/upay/wps/images/banks/WS.png';
                }
                return `https://upay.12580life.com/upay/wps/images/banks/icon_${id}.png`;
            } catch (e) {
                return require('@/assets/images/account-icon.png');
            // 图片找不到时，使用默认图片
            }
        },
        // 获取和包信息
        getInfoList() {
            this.$store.commit('LOADING', true);
            api.B2CWallet.infoList().then((res) => {
                this.$store.commit('LOADING', false);
                this.b2cStatus = res.state;
            }).catch((err) => {
                this.$store.commit('LOADING', false);
                this.b2cStatus = err.state;
            });
        },
        queryAccount() {
            api.getInitinfo({
                orgcode: 'BOCM'
            })
                .then((data) => {
                    this.accountPlus++;
                    if (data.openPreType === '2') {
                    // this.showPop = true;
                    // this.goSign = true;
                        this.localSign = true;
                    }
                })
                .catch(() => {
                    this.accountPlus++;
                });
        },
        play() {
            this.imgshow = !this.imgshow;
            if (this.$refs.video.paused) {
                this.$refs.video.play();
                this.jtImg = false;
            } else {
                this.$refs.video.pause();
                this.jtImg = true;
            }
        },
        // 获取零钱账户信息
        getChangeList() {
            const qbBankListsIn = JSON.parse(sessionStorage.getItem('qbBankListsInfos') || '[]');
            if (!qbBankListsIn || qbBankListsIn.length < 1) {
                api.qrySmallChangeAcc({})
                    .then((res) => {
                        this.changeList = [];
                        res.list.forEach((item) => {
                            if (
                                item.fullAccNbr
                                && item.defaultAccFlg === '01'
                                && item.orgCode !== 'ICBC-DIGICCY'
                            ) {
                                this.changeList.unshift(item);
                                this.defaultOrgcode = item.orgCode;
                            } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                                if (this.changeList.length == 0) {
                                    this.changeList.push(item);
                                } else if (this.changeList.length == 1) {
                                    if (this.changeList[0].defaultAccFlg != '01') {
                                        if (item.orgCode == 'BOCM') {
                                            this.changeList.unshift(item);
                                        } else {
                                            this.changeList.push(item);
                                        }
                                    } else if (this.changeList[0].defaultAccFlg == '01') {
                                        this.changeList.push(item);
                                    }
                                } else if (this.changeList.length == 2) {
                                    if (this.changeList[0].defaultAccFlg != '01') {
                                        if (item.orgCode == 'BOCM') {
                                            this.changeList.unshift(item);
                                        } else if (item.orgCode == 'CMB') {
                                            console.log(this.changeList, '111');
                                            this.changeList.splice(1, 0, item);
                                        } else {
                                            this.changeList.push(item);
                                        }
                                    } else if (this.changeList[0].defaultAccFlg == '01') {
                                        if (item.orgCode == 'BOCM') {
                                            this.changeList.splice(1, 0, item);
                                        } else if (item.orgCode == 'CMB') {
                                            if (this.changeList[1].orgCode == 'SPDB') {
                                                this.changeList.splice(1, 0, item);
                                            } else {
                                                this.changeList.push(item);
                                            }
                                        } else {
                                            this.changeList.push(item);
                                        }
                                    }
                                }
                            }
                        });
                        store2.default.set('qbBankListsInfo', this.changeList);
                        window.sessionStorage.setItem('qbBankListsInfos', JSON.stringify(this.changeList));
                        setTimeout(() => {
                            this.getBankImg();
                        });
                    })
                    .catch((err) => {
                        console.log(err.msgInfo);
                        this.accountPlus++;
                        // this.$toast.info(err.msgInfo);
                        setTimeout(() => {
                            this.getBankImg();
                        });
                    });
            } else {
                this.changeList = [];
                const qbBankListsInfos = JSON.parse(sessionStorage.getItem('qbBankListsInfos') || '[]');
                qbBankListsInfos.forEach(
                    (item) => {
                        if (
                            item.fullAccNbr
                                && item.defaultAccFlg === '01'
                                && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            this.changeList.unshift(item);
                            this.defaultOrgcode = item.orgCode;
                        } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                            if (this.changeList.length == 0) {
                                this.changeList.push(item);
                            } else if (this.changeList.length == 1) {
                                if (this.changeList[0].defaultAccFlg != '01') {
                                    if (item.orgCode == 'BOCM') {
                                        this.changeList.unshift(item);
                                    } else {
                                        this.changeList.push(item);
                                    }
                                } else if (this.changeList[0].defaultAccFlg == '01') {
                                    this.changeList.push(item);
                                }
                            } else if (this.changeList.length == 2) {
                                if (this.changeList[0].defaultAccFlg != '01') {
                                    if (item.orgCode == 'BOCM') {
                                        this.changeList.unshift(item);
                                    } else if (item.orgCode == 'CMB') {
                                        this.changeList.splice(1, 0, item);
                                    } else {
                                        this.changeList.push(item);
                                    }
                                } else if (this.changeList[0].defaultAccFlg == '01') {
                                    if (item.orgCode == 'BOCM') {
                                        this.changeList.splice(1, 0, item);
                                    } else if (item.orgCode == 'CMB') {
                                        if (this.changeList[1].orgCode == 'SPDB') {
                                            this.changeList.splice(1, 0, item);
                                        } else {
                                            this.changeList.push(item);
                                        }
                                    } else {
                                        this.changeList.push(item);
                                    }
                                }
                            }
                        }
                    }
                );
                setTimeout(() => {
                    this.getBankImg();
                }, 1000);
            }
            console.log(this.changeList);
        },
        // 获取银联银行卡信息
        getBankList() {
            if (!store2.default.get('qbBankListsInfo') || store2.default.get('qbBankListsInfo').length < 1) {
                api.newBank
                    .acpList({})
                    .then((res) => {
                        if (res.usrBnkInfos && res.usrBnkInfos.length > 0) {
                            this.ylBankList = res.usrBnkInfos.filter((item) => {
                                if (
                                    (item.accFlg && item.accFlg === '04')
                                    || (item.accFlg && item.accFlg === '05')
                                ) {
                                    return true;
                                }
                            });
                        }
                    })
                    .catch((data) => {
                        this.$toast.info(
                            data.msgInfo || '查询失败，请稍后再试',
                            3000,
                            true
                        );
                    });
            } else {
                this.ylBankList = store2.default
                    .get('ylBankListsInfo')
                    .filter((item) => {
                        if (
                            (item.accFlg && item.accFlg === '04')
                            || (item.accFlg && item.accFlg === '05')
                        ) {
                            return true;
                        }
                    });
            }
        },
        getCmbList() {
            api.digiccyApi.getList({ channelId: 'cmb' }).then((res) => {
                res.list.forEach((item) => {
                    item.channelId = item.channelId.toUpperCase();
                });
                this.shubiList = res.list;
            });
        },
        // 获取卡面信息
        getBankImg() {
            const bankList = JSON.parse(JSON.stringify(this.changeList) || '[]');
            const lengthNum = bankList.length;
            if (!store2.default.get('bankImgList')) {
                api.cardImageQuery({ accountType: '01' })
                    .then((res) => {
                        const imgList = res.list;
                        store2.default.set('bankImgList', imgList);
                        if (bankList.length < imgList.length) {
                            imgList.forEach((item) => {
                                let isHad = false;
                                bankList.forEach((part) => {
                                    if (part.orgCode === item.orgcode) {
                                        isHad = true;
                                    }
                                });
                                let a = '00';
                                if (
                                    store2.default.get('djList')
                                    && store2.default
                                        .get('djList')
                                        .filter(
                                            i => i.orgCode == item.orgcode
                                        ).length > 0
                                ) {
                                    a = store2.default
                                        .get('djList')
                                        .filter(
                                            i => i.orgCode == item.orgcode
                                        )[0].accsts;
                                }
                                if (!isHad) {
                                    if (item.orgcode == 'BOCM') {
                                        if (lengthNum == 0) {
                                            bankList.unshift({
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        } else if (lengthNum == 1) {
                                            bankList.splice(1, 0, {
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        } else {
                                            bankList.push({
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        }
                                    } else if (item.orgcode == 'CMB') {
                                        if (lengthNum == 0) {
                                            if (bankList.length > 0) {
                                                if (bankList[0].orgCode == 'BOCM') {
                                                    bankList.splice(1, 0, {
                                                        orgName: item.orgname,
                                                        image: item.image,
                                                        orgCode: item.orgcode,
                                                        accsts: a
                                                    });
                                                } else if (bankList[0].orgCode == 'SPDB') {
                                                    bankList.unshift({
                                                        orgName: item.orgname,
                                                        image: item.image,
                                                        orgCode: item.orgcode,
                                                        accsts: a
                                                    });
                                                }
                                            } else {
                                                bankList.push({
                                                    orgName: item.orgname,
                                                    image: item.image,
                                                    orgCode: item.orgcode,
                                                    accsts: a
                                                });
                                            }
                                        } else if (lengthNum == 1) {
                                            if (bankList.length > 0) {
                                                bankList.splice(1, 0, {
                                                    orgName: item.orgname,
                                                    image: item.image,
                                                    orgCode: item.orgcode,
                                                    accsts: a
                                                });
                                            } else {
                                                bankList.push({
                                                    orgName: item.orgname,
                                                    image: item.image,
                                                    orgCode: item.orgcode,
                                                    accsts: a
                                                });
                                            }
                                        }
                                    } else if (item.orgcode == 'SPDB') {
                                        console.log(11111111111);
                                        bankList.push({
                                            orgName: item.orgname,
                                            image: item.image,
                                            orgCode: item.orgcode,
                                            accsts: '00'
                                        });
                                    }
                                    this.changeList = bankList;
                                    console.log(this.changeList, '+++', bankList, '----');
                                }
                            });
                        }
                        this.accountPlus++;
                    })
                    .catch((err) => {
                        console.log(err.msgInfo);
                        this.accountPlus++;
                    });
            } else {
                const imgList = store2.default.get('bankImgList');
                if (bankList.length < imgList.length) {
                    imgList.forEach((item) => {
                        let isHad = false;
                        bankList.forEach((part) => {
                            if (part.orgCode === item.orgcode) {
                                isHad = true;
                            }
                        });
                        console.log(isHad);
                        let a = '00';
                        if (
                            store2.default.get('djList')
                            && store2.default
                                .get('djList')
                                .filter(i => i.orgCode == item.orgcode)
                                .length > 0
                        ) {
                            a = store2.default
                                .get('djList')
                                .filter(
                                    i => i.orgCode == item.orgcode
                                )[0].accsts;
                        }
                        if (!isHad) {
                            if (item.orgcode == 'BOCM') {
                                if (lengthNum == 0) {
                                    bankList.unshift({
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: a
                                    });
                                } else if (lengthNum == 1) {
                                    bankList.splice(1, 0, {
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: a
                                    });
                                } else {
                                    bankList.push({
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: a
                                    });
                                }
                            } else if (item.orgcode == 'CMB') {
                                if (lengthNum == 0) {
                                    if (bankList.length > 0) {
                                        if (bankList[0].orgCode == 'BOCM') {
                                            bankList.splice(1, 0, {
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        } else if (bankList[0].orgCode == 'SPDB') {
                                            bankList.unshift({
                                                orgName: item.orgname,
                                                image: item.image,
                                                orgCode: item.orgcode,
                                                accsts: a
                                            });
                                        }
                                    } else {
                                        bankList.push({
                                            orgName: item.orgname,
                                            image: item.image,
                                            orgCode: item.orgcode,
                                            accsts: a
                                        });
                                    }
                                } else if (lengthNum == 1) {
                                    if (bankList.length > 0) {
                                        bankList.splice(1, 0, {
                                            orgName: item.orgname,
                                            image: item.image,
                                            orgCode: item.orgcode,
                                            accsts: a
                                        });
                                    } else {
                                        bankList.push({
                                            orgName: item.orgname,
                                            image: item.image,
                                            orgCode: item.orgcode,
                                            accsts: a
                                        });
                                    }
                                } else {
                                    bankList.push({
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: a
                                    });
                                }
                            } else if (item.orgcode == 'SPDB') {
                                console.log(11111111111, bankList);
                                bankList.push({
                                    orgName: item.orgname,
                                    image: item.image,
                                    orgCode: item.orgcode,
                                    accsts: '00'
                                });
                            }
                            this.changeList = bankList;
                            console.log(this.changeList, '+++', bankList, '----');
                        }
                    });
                }
                this.accountPlus++;
            }
            console.log('111111111', this.changeList);
            // var arrList = this.changeList
            // this.changeList = []
            // if(arrList.length > 0) {
            //     arrList.forEach(data => {
            //         if(data.orgCode != "BOCM") {
            //             this.changeList.push(data)
            //         }
            //     })
            // }
        },
        goOpenOrSearch(item) {
            if (item.accsts === '01') {
                // 去查看
                this.$router.push({
                    name: 'moveWallet',
                    query: {
                        accNbr: item.accNbr,
                        fullAccNbr: item.fullAccNbr,
                        orgName: item.orgName
                    }
                });
            } else if (item.accsts === '00') {
                let tyid;
                if (this.$route.query.typeId) {
                    tyid = this.$route.query.typeId;
                } else {
                    tyid = '10010';
                }
                // 去开通
                this.$router.push({
                    name: 'khEmpower',
                    query: {
                        typeId: tyid,
                        orgCode: item.orgCode,
                        sourcechannel: this.$route.query.sourcechannel || '',
                        localSign: this.localSign
                    }
                });
            } else if (item.accsts == '03') {
                this.freeze = item.orgCode;
                this.isShowKuang = true;
            }
        },
        goHeBao(type) {
            console.log(type);
            switch (type) {
                case '1':// 未注册
                    this.$router.push({ name: 'hbOpen' });
                    break;
                case '2':// 未授权
                    this.$router.push({ name: 'hbEmpower' });
                    break;
                case '3':// 已授权且二次放号
                    if (this.b2cData.realType === '1') {
                        this.$router.push({
                            name: 'myMoney'
                        });
                    } else {
                        this.$router.push({
                            name: 'accountName'
                        });
                    }
                    break;
                case '4':// 未签约
                    this.$router.push({ name: 'accountSigning' });
                    break;
                case '5':// 已授权
                    this.$router.push({ name: 'myMoney' });
                    break;
            }
        },
        addBank() {
            // this.$router.push({
            //   name: "addNewBanks",
            //   query: {
            //     dealChn: "10010",
            //   },
            // });
            if (
                this.$route.query.dealChn !== ''
                && this.$route.query.dealChn !== undefined
            ) {
                // debugger
                this.$router.push({
                    name: 'addNewBanks',
                    query: {
                        dealChn: this.$route.query.dealChn
                    }
                });
            } else {
                // debugger
                this.$router.push({
                    name: 'addNewBanks',
                    query: {
                        dealChn: '10010'
                    }
                });
            }
        },
        setIntoInfor() {
            let jyparam = '';
            let pfparam = '';
            // const list = store2.default.get("qbBankListsInfo");
            const list = JSON.parse(sessionStorage.getItem('qbBankListsInfos') || '[]');
            const bankOrgCode = list.map(bank => bank.orgCode);
            if (this.hasaccount === '01') {
                jyparam = '1';
                pfparam = this.defaultOrgcode;
            } else {
                jyparam = '0';
            }
            this.$router.push({
                name: 'basicInfo',
                query: {
                    jyparams: jyparam,
                    pfparams: pfparam,
                    banks: bankOrgCode.join(','),
                    isShowSet: list.length > 0 ? '01' : '02'
                }
            });
        },
        // 提交删除银行卡
        commitDeleteBank() {
            this.msgDialog.btns[1].disabled = true;
            this.loading = true;
            api.newBank
                .acpRescin({
                    smsJrn: this.smsJrn, // 短信流水[上一接口返回]
                    smsCode: this.msgCode, // 短信验证码
                    accFlg: this.whichCard.accFlg // 绑卡列表返回
                })
                .then(() => {
                    this.loading = false;
                    // this.queryBankList("new");
                    this.msgDialog.open = false;
                    this.$toast.info('银行卡删除成功', 3000, true);
                    this.getYLnwewBank();
                })
                .catch((data) => {
                    this.loading = false;
                    this.$toast.info(
                        data.msgInfo || '快看看，出错啦',
                        3000,
                        true
                    );
                });
        },
        // 解除绑定前判断是否是小宝花账号
        orbabay() {
            this.defaultDeleteShow = false;
            let isbaby = false; // 是否是宝宝卡
            console.log(this.whichCard.bnknm);
            this.babyList.forEach((item) => {
                if (item == this.whichCard.cardid) {
                    isbaby = true;
                }
            });
            if (isbaby) {
                this.babyPop = true;
            } else {
                this.unBindCard();
            }
        },
        closeBaby() {
            this.babyGetCode = true;
            this.babyPop = false;
        },
        closeCodeModel(data) {
            this.babyGetCode = false;
            this.llbCheck = false;
            window.location.reload();
        },
        // 判断是否开通了流量宝
        isOpenllb() {
            api.llb.discharge().then((res) => {
                // console.log(res.code);
                if (res.code == '02') {
                    this.isllb = true;
                }
            });
        },
        llbsure() {
            this.llbPop = false;
            this.llbCheck = true;
        },
        // 解除绑定卡片
        unBindCard() {
            this.defaultDeleteShow = false;
            this.babyPop = false;
            if (this.isllb && this.whichCard.bnknm == '浦发银行') {
                this.llbPop = true;
                return;
            }
            this.msgDialog.open = true;
            this.unBindsms({ cardId: this.whichCard.cardid }); // 下发验证码接口
            // 调用倒计时方法
            this.timesContral();
        },
        // 取消解除绑定卡片
        noUnBindCard() {
            this.babyPop = false;
            this.llbPop = false;
            this.defaultDeleteShow = false;
            this.whiteCard = '';
        },
        // 重新获取文案变倒计时效果再次发送验证码
        getTimeOutShow() {
            if (this.errorTips === '重新获取') {
                // 调用倒计时方法
                this.timesContral();
                this.unBindsms({ cardId: this.whichCard.cardid }); // 下发验证码接口
            }
        },
        timesContral() {
            this.attcode = true;
            const timer = setInterval(() => {
                this.sec = this.sec - 1;
                this.errorTips = `${this.sec} s`;
                if (this.sec === 0) {
                    clearInterval(timer);
                    this.errorTips = '重新获取';
                    this.attcode = false;
                    this.sec = 61;
                }
            }, 1000);
        },
        // 解绑下发验证码smsJrn
        unBindsms(data) {
            api.newBank
                .acpRescindSms(data)
                .then((res) => {
                    this.smsJrn = res.smsJrn; // 返回短信流水
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        // 重新获取银联银行卡信息
        getYLnwewBank() {
            api.wapAcplist({ refreshFlag: '1' })
                .then((res) => {
                    store2.default.set('ylBankListsInfo', res.usrBnkInfos);
                    if (res.usrBnkInfos && res.usrBnkInfos.length > 0) {
                        this.ylBankList = res.usrBnkInfos.filter((item) => {
                            if (
                                (item.accFlg && item.accFlg === '04')
                                || (item.accFlg && item.accFlg === '05')
                            ) {
                                return true;
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        changeBankStatus(e) {
            this.defaultDeleteShow = true;
            this.clickBank = `${e.bnknm} (尾号${e.cardno.substring(
                e.cardno.length - 4,
                e.cardno.length
            )})`;
            this.boundCardId = e.boundCardId;
            this.whichCard = e; // 哪张卡
        },
        // 重新获取数据
        getInfoRefresh() {
            const changeList = [];
            api.qrySmallChangeAcc({}).then((res) => {
                // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                if (res.totalBalance) {
                    this.walletNum = Number(res.totalBalance).toFixed(2);
                }
                res.list.forEach((item) => {
                    if (
                        item.fullAccNbr
                        && item.defaultAccFlg === '01'
                        && item.orgCode !== 'ICBC-DIGICCY'
                    ) {
                        changeList.unshift(item);
                    } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                        changeList.push(item);
                    }
                });
                window.sessionStorage.setItem('qbBankListsInfos', JSON.stringify(changeList));
                store2.default.set('walletNum', this.walletNum);
                store2.default.set('qbBankListsInfo', changeList);
            });
        },
        // 获取小宝花账号
        getbaby() {
            api.accountInfoQuery()
                .then((res) => {
                    console.log(res.list);
                    res.list.forEach((item) => {
                        this.babyList.push(item.dePayAccount);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        gobocmPension() {
            if(this.bocmPensionSts == '1') {
                // this.showPop = true;
                this.$router.push({
                    name: 'deposit'
                })
            } else if(this.bocmPensionSts == '2' || this.bocmPensionSts == '4' || this.bocmPensionSts == '5') {
                this.$router.push({
                    path: "/bocmPension/empowerMiddle",
                    query: {}
                })
            }
        },
        confuse() {
            this.showPop = false
        }
    },
    watch: {
        // changeList:{
        //     handler(newVal,old){
        //         if(this.changeList.length == 3) {
        //             this.$store.commit("LOADING",false)
        //         }
        //     }
        // },
        accountPlus: {
            handler(newVal, old) {
                if (newVal > 2) {
                    this.$store.commit('LOADING', false);
                }
            }
        },
    },
    destroyed() {
        this.$store.commit('LOADING', false);
    }
};
</script>

<style lang="less" scoped>
.contaioner{
  background: #F7F8FA;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 30px;
}
.account-warp {
    width: 100%;
    margin: 40px auto;
}
.account-video {
    width: -moz-calc(100% - 60px);
    width: -webkit-calc(100% - 60px);
    width: calc(100% - 60px);
    position: relative;
    margin: 0 30px;
    height: 320px;

    video {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .fenmian {
        // width: 100%;
        // height: 100%;
        // position: absolute;
        // z-index: 999;
        width: -moz-calc(100% + 2px);
        width: -webkit-calc(100% + 2px);
        width: calc(100% + 2px);
        height: -moz-calc(100% + 1px);
        height: -webkit-calc(100% + 1px);
        height: calc(100% + 1px);
        position: absolute;
        z-index: 999;
        left: -1px;

        div {
            width: 100%;
            height: 100%;
            // background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 100px;
            height: 100px;
        }
    }
    .fenmian2 {
        background: url(../../assets/images/accountVideoImg.png) #fff no-repeat;
        background-size: 100% 100%;
    }
}

.smallchange,
.hebao,
.shubi,
.bankcard {
    font-family: PingFangSC-Medium;
}

.top {
    height: 42px;
    line-height: 42px;
    display: flex;
    justify-content: space-between;
    padding: 30px;
    color: #1e1e1e;
    font-weight: 600;
    font-size: 30px;

    .set {
        font-size: 24px;
        font-weight: 400;
        color: #333333;
    }
}

.content {
    .contentList {
        height: 160px;
        margin: 0 30px 20px;
        padding: 0 21px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        border-radius: 12px;

        .cardImg {
            width: 170px;
            height: 108px;

            img {
                width: 170px;
                height: 108px;
            }
        }
        .shubiImg{
          img {
               width: 180px;
                height: 114px;
            }
        }
        .imgCont {
            display: flex;
            align-self: center;
            position: absolute;
            top: 35px;
            left: 35px;

            img {
                width: 20px;
                height: 20px;
                margin-top: 5px;
            }

            span {
                line-height: 30px;
                margin-left: 10px;
                color: #fff;
                font-size: 12px;
            }
        }

        .btn {
            width: 95px;
            height: 30px;
            line-height: 30px;
            background: #e58985;
            color: #fff;
            font-size: 20px;
            text-align: center;
            border-radius: 12px;
        }

        .main {
            flex-grow: 1;
            padding-left: 20px;

            .account {
                font-size: 30px;
                color: #4d4d4d;
                font-weight: 400;
                line-height: 42px;

                span {
                    font-size: 24px;
                    color: #7c7c7c;
                    margin-left: 20px;
                }
            }

            .code {
                font-size: 24px;
                color: #7c7c7c;
                margin-top: 10px;

                img {
                    width: 72px;
                    height: 21px;
                }
            }

            .openBtn {
                background: #00aaee;
                margin-top: 10px;
            }
        }
    }

    .contentList:last-of-type {
        margin-bottom: 0;
    }
}

.hebao .content .contentList .cardImg {
    width: 96px;
    height: 96px;
}
.shubi .content .contentList .cardImg {
    width: 87px;
    height: 85px;
    img{
       width: 87px;
    height: 85px;
    }
}
.noBank {
    height: 160px;
    display: flex;
    margin: 0 0.3rem 0.2rem;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: url("../../assets/images/banks/bankXC.png") no-repeat;
    background-size: 100% 100%;

    .cont {
        margin-left: 207px;
        font-size: 20px;
        font-weight: 500;
        color: #cc6200;

        .title {
            font-size: 28px;
            font-weight: 600;
            color: #bf6824;
            margin-bottom: 20px;
        }
    }

    .btn {
        width: 110px;
        height: 50px;
        line-height: 50px;
        border: 2px solid #f09949;
        border-radius: 8px;
        font-size: 24px;
        text-align: center;
        color: #f09949;
        background: #fff;
        margin-right: 30px;
    }
}

.addBtn {
    height: 76px;
    line-height: 76px;
    margin: 50px 30px;
    border: 2px solid #009bff;
    border-radius: 12px;
    font-size: 30px;
    color: #00a4e2;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 36px;
        height: 36px;
        margin-right: 6px;
    }
}

/deep/ .defaultAnddelete {
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
            width: 100%;
            text-align: center;
            font-weight: 500;
            color: #333333;
            font-size: 30px;
            font-weight: 400;
        }
    }

    .pouContain {
        // height: 265px;
        background: #ffffff;

        .setDefault {
            height: 96px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }

        .deleteBank {
            height: 96px;
            opacity: 1;
            background: #ffffff;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }
    }
}

/deep/ .defaultAnddelete {
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
            width: 100%;
            text-align: center;
            font-weight: 500;
            color: #333333;
            font-size: 30px;
            font-weight: 400;
        }
    }

    .pouContain {
        // height: 265px;
        background: #ffffff;

        .setDefault {
            height: 96px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }

        .deleteBank {
            height: 96px;
            opacity: 1;
            background: #ffffff;
            font-size: 28px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            padding-left: 30px;
            line-height: 96px;
            border: 1px solid #d5d5d5;
        }
    }
}

.msgDialog {
    /deep/ .md-popup {
        .md-popup-box {
            .md-dialog-content {
                width: 640px;
                border-radius: 20px;

                .md-dialog-body {
                    color: #13252e;
                    font-size: 30px;
                    text-align: center;
                    padding: 0;
                    min-height: 430px;
                    display: unset;

                    .md-dialog-title {
                        font-size: 32px;
                        color: #333;
                        font-weight: 600;
                        margin: 60px 0 20px;
                    }

                    .msgTips {
                        font-size: 26px;
                        color: #999;
                    }

                    .errorTips {
                        background: #ffffff;
                        width: 200px;
                        margin-left: 220px;
                        margin-bottom: 20px;
                    }

                    .md-codebox-wrapper {
                        margin: 40px 0 30px;

                        .md-codebox {
                            .md-codebox-box:last-child {
                                margin-right: 0;
                            }

                            .md-codebox-box {
                                &:before {
                                    border-bottom: none;
                                }

                                flex: 0 1 80px;
                                width: 80px;
                                height: 80px;
                                // background: #F5F5F5;
                                border: 2px solid #0195ff !important;
                                border-radius: 8px;
                                margin-right: 15px;
                                color: #333;
                                font-size: 42px;
                                font-weight: 600;
                                margin-left: 0;
                                line-height: 80px !important;
                                // border: none;
                            }
                        }
                    }

                    .errorTips {
                        color: #0195ff;
                        font-size: 24px;
                        word-break: break-all;
                        height: 50px;
                    }
                }

                .md-dialog-actions {
                    .md-dialog-btn {
                        color: #0195ff;
                        width: 2.8rem;
                        opacity: 1;
                        background: #ffffff;
                        border: 0.02rem solid #0195ff;
                        border-radius: 0.08rem;
                        font-weight: 500;
                        height: 0.75rem;
                        margin-top: 0.2rem;
                        margin-right: 30px;
                        margin-left: 30px;
                        // &.disabled{
                        //     color: #0195ff!important;
                        // }
                    }

                    .md-dialog-btn:last-child {
                        // color: #0195ff;
                        width: 200px;
                        height: 0.75rem;
                        opacity: 1;
                        background: #0195ff;
                        border-radius: 8px;
                        margin-top: 0.2rem;
                        margin-bottom: 40px;
                        margin-right: 30px;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}

.babyPopup {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
        width: 650px;
        height: 400px;
        box-sizing: border-box;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;
        flex-wrap: wrap;
        border-radius: 20px;

        .top {
            font-size: 36px;
        }

        .mid {
            font-size: 32px;
        }

        .bottom {
            width: 100%;
            padding: 0 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            div {
                width: 200px;
                height: 80px;
                border: 2px solid #ffab00;
                border-radius: 10px;
                text-align: center;
                line-height: 80px;
                font-size: 32px;
                color: #ffab00;
            }

            .right {
                background: #ffab00;
                color: white;
            }
        }
    }
}
.maskBox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(5, 5, 5, 0.6);

    .kuang {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 561px;
        height: 425px;
        background: #ffffff;
        border-radius: 25.2px;
        padding: 0.3rem;
    }

    .tips {
        text-align: center;
        font-size: 0.4rem;
    }

    .hr {
        height: 0.01rem;
        margin: 0.3rem auto;
        background-color: #dddddd;
    }

    .contentBox {
        display: flex;
        align-items: center;
        height: 1.5rem;
        overflow-y: scroll;

        .content {
            width: 100%;
            font-size: 28px;

            font-weight: 500;
            line-height: 50px;
        }
    }

    .btn {
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translate(-50%, -50%);
        bottom: 0.25rem;
        width: 341px;
        height: 70px;
        background: #238ff2;
        border-radius: 38px;
        color: white;
        font-size: 0.32rem;
        line-height: 0.8rem;
        text-align: center;
    }
}
#freeze {
    background-color: #a5abb7;
}
.BOCM_Pension {
    .BOCM_contaioner {
        height: 160px;
        margin: 0 30px 20px;
        padding: 0 21px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        border-radius: 12px;
        background: rgb(255, 250, 246);

        .cardImg {
            width: 170px;
            height: 108px;

            img {
                width: 170px;
                height: 108px;
            }
        }
        .imgCont {
            display: flex;
            align-self: center;
            position: absolute;
            top: 35px;
            left: 35px;

            img {
                width: 20px;
                height: 20px;
                margin-top: 5px;
            }

            span {
                line-height: 30px;
                margin-left: 10px;
                color: #fff;
                font-size: 12px;
            }
        }

        .btn {
            width: 95px;
            height: 30px;
            line-height: 30px;
            background: #e58985;
            color: #fff;
            font-size: 20px;
            text-align: center;
            border-radius: 12px;
        }

        .main {
            flex-grow: 1;
            padding-left: 20px;

            .account {
                font-size: 30px;
                color: #4d4d4d;
                font-weight: 400;
                line-height: 42px;

                span {
                    font-size: 24px;
                    margin-left: 20px;
                    color: #7C7C7C;
                    font-weight: 700;
                }
            }

            .code {
                font-size: 24px;
                color: #7c7c7c;
                margin-top: 10px;

                img {
                    width: 72px;
                    height: 21px;
                }
            }

            .openBtn {
                background: #00aaee;
                margin-top: 10px;
            }
        }
    }
}
.gotoSetLoose {
    width: 600px;
    background-color: #fff;
    border-radius: 25px;
    text-align: center;
    overflow: auto;

    .loseTitle {
        width: 100%;
        height: 75px;
        line-height: 75px;
        text-align: center;
        font-size: 0.38rem;
        text-align: center;
        border-bottom: 2px solid #e1e1e1;
    }

    p {
        font-size: 30px;
        margin-bottom: 50px;
        text-align: left;
    }

    .cont {
        margin: 35px auto;
        padding: 0 20px;
    }

    .btnBox {
        display: flex;
        justify-content: space-evenly;
        margin: 0 0 40px 0;

        /deep/.md-button.small {
            width: 2.5rem;
        }
    }
}
</style>
