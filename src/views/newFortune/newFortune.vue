<template>
  <div :class="showTipsModel ? 'showModel' : ''" class="walletCardcenter">
    <!-- <pull-refresh
      :isrefresh="isrefresh"
      @refresh="refreshAllInfo('noLoading')"
      v-model="isrefresh"
    > -->
      <!-- 头部 -->
      <div
        class="newHeader"
        :style="{
          backgroundImage: `url(${topPreInfo.logo})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <div class="listOne">
          <div class="myWallet">
            <div>我的钱包</div>
            <div id="A01" @click="isShowNum">
              <img
                v-if="!visibleShow"
                alt=""
                class="eye"
                src="../../assets/images/newIndex/close_eye.png"
              />
              <img
                v-else
                alt=""
                class="eye openEye"
                src="../../assets/images/newIndex/open_eye.png"
              />
            </div>
            <div
              v-if="zeroCheck"
              class="zero"
              :class="{ zeroOn: zero }"
              @click="!zero ? (zeroShow = true) : ''"
            >
              <span v-if="zero">{{ usrmob }}</span>
            </div>
            <!-- <div class="zeroBox" v-if="zeroShow">
              <div class="box">
                <div class="top">温馨提示</div>
                <div class="text" v-if="!zero">
                  您未激活移动钱包功能（0元/月）<br />
                  现在激活每月可享5元充值券
                </div>
                <div class="btn">
                  <div class="left" @click="zeroShow = false">取消</div>
                  <div class="right" @click="goZero">去激活</div>
                </div>
              </div>
            </div> -->
          </div>
          <div class="right-top">
            <!-- <div class="laba" @click="reloadYP()">
              <audio
                ref="audio"
                src="../../assets/vedio/wallet_music.mp3"
                @ended="isEnded()"
              ></audio>
              <div class="smallLaba" v-if="showLaba"></div>
              <div class="movingLaba" v-if="!showLaba">
                <img src="../../assets/images/laba_moving.gif" alt="" />
              </div>
            </div> -->
            <div id="A03" @click="searchAllAccount">
              查看全部账户
              <div class="more"></div>
            </div>
          </div>
        </div>
        <div class="listHb">
          <!-- 零钱 -->
          <div class="hb_item">
            <p
              v-if="jbShowList.hebao && visibleShow"
              class="topTip"
              id="B07"
              @click.stop="showTips('04')"
            >
              {{ jbShowList.hebao }}
            </p>
            <p class="hb_nm" @click="hbCheck(b2cStatus)">零钱(元)</p>
            <template v-if="visibleShow">
              <div class="mg-top">
                <md-icon
                  v-if="eyesLoading3"
                  name="spinner"
                  size="sm"
                  color="#fff"
                ></md-icon>
                <span
                  v-else-if="b2cStatus != 5"
                  class="hb_br"
                  @click="hbCheck(b2cStatus)"
                >
                  {{ b2cStatusData[b2cStatus] }}
                </span>
                <span v-else class="hb_num" @click="hbCheck(b2cStatus)">
                  {{ b2cData.accountBalance }}
                </span>
              </div>
            </template>
            <p
              v-else
              id="B02"
              class="topTxt mg-top"
              @click="hbCheck(b2cStatus)"
            >
              {{ noShowNum }}
            </p>
          </div>
          <!-- 电子账户 -->
          <div class="hb_item">
            <p
              v-if="jbShowList.wallet && visibleShow"
              class="topTip tip-custom"
              id="B07"
              @click="showTips('01')"
            >
              {{ jbShowList.wallet }}
            </p>
            <p class="hb_nm" @click="goWallet">电子账户(个)</p>
            <div class="mg-top" v-if="visibleShow" style="position: relative">
              <p
                v-if="isOpen === '01' || isOpen === '00' || isOpen == ''"
                id="B01"
                class="hb_num"
                @click="goWallet"
              >
                {{ walletNum }}
              </p>
              <p v-else-if="isOpen === '02'" id="B01" class="hb_br">开通中</p>
              <p
                id="B01"
                v-else-if="isOpen === '03'"
                :style="{ 'z-index': freezePop ? 9999 : '' }"
                class="hb_br"
                @click="freezePop = !freezePop"
              >
                冻结
              </p>
            </div>
            <p
              v-else
              id="I01"
              class="topTxt mg-top"
              @click="goWallet"
              :class="{ pf: freezePop }"
            >
              {{ noShowNum }}
            </p>
          </div>
          <!-- 数币账户 -->
          <div class="hb_item">
            <p
              v-if="jbShowList.shubi && visibleShow"
              class="topTip tip-custom"
              id="B07"
              @click="showTips('05')"
            >
              {{ jbShowList.shubi }}
            </p>
            <p class="hb_nm" @click="countCoinsClick">数币账户(个)</p>
            <p
              v-if="visibleShow"
              class="mg-top"
              id="B02"
              @click="countCoinsClick"
            >
              <md-icon
                v-if="eyesLoading2"
                name="spinner"
                size="sm"
                color="#fff"
              ></md-icon>
              <span class="hb_num" v-else>{{ shubiList.length }}</span>
            </p>
            <p v-else id="B02" class="topTxt mg-top" @click="countCoinsClick">
              {{ noShowNum }}
            </p>
          </div>
          <!-- 话费余额 -->
          <div class="hb_item">
            <p class="hb_nm" @click="goBalance">话费(元)</p>
            <p v-if="visibleShow" class="mg-top" id="B03" @click="goBalance">
              <md-icon
                v-if="eyesLoading1"
                name="spinner"
                size="sm"
                color="#fff"
              ></md-icon>
              <span class="hb_num" v-else>{{ hfBalance || "--" }}</span>
            </p>
            <p v-else id="B03" class="topTxt mg-top" @click="goBalance">
              {{ noShowNum }}
            </p>
          </div>
        </div>
        <!-- 顶部热区跳转 -->
        <a class="top-href" :href="topPreInfo.jumpUrl"></a>
        <div class="body-list">
          <!-- 宫格 -->
          <gridList></gridList>
          <section class="body">
            <!-- 上部广告位 -->
            <upsideAdver></upsideAdver>
            <middleAdver></middleAdver>
            <welfarePre></welfarePre>
            <caloriePre></caloriePre>
            <overflowRights></overflowRights>
            <div class="walletBegin_foot">
              <img
                src="@/assets/images/fortune_new/walletBegin.png"
                alt=""
                srcset=""
              />
              <p
                class="problem"
                @click="$router.push({ name: 'problemDetail' })"
              >
                常见问题
              </p>
            </div>
          </section>
        </div>
      </div>
    <!-- </pull-refresh> -->
    <div v-show="showTipsModel" class="jbsmModel">
      <div class="cont">
        <p class="title">温馨提示</p>
        <div id="modelText" class="text"></div>
        <div class="btn" @click="showTipsModel = false">确认</div>
      </div>
    </div>

    <!-- 开始绑定loading效果 -->
    <div v-if="loading" class="loading-toast">
      <img alt="" src="@/assets/images/loading-toast.gif" />
    </div>
    <digitalPop v-if="digitalFlag" @digitalClose="digitalClose"></digitalPop>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import {
     Dialog, Swiper, SwiperItem
} from 'mand-mobile';
import * as store2 from '@/common/localstore';
import pullRefresh from '@/components/pullRefresh.vue';
import { mapState } from 'vuex';
import { touchArr } from './data';
// import digitalPop from './compoments/digitalPop.vue';
import gridList from './compoments/gridList.vue';
import upsideAdver from './compoments/upsideAdver.vue';
import middleAdver from './compoments/middleAdver.vue';
import welfarePre from './compoments/welfarePre.vue';
import caloriePre from './compoments/caloriePre.vue';
import overflowRights from './compoments/overflowRights.vue';
// import { compressImage } from '@/common/yasuoImg.js';
export default {
    name: 'newFortune',
    components: {
        [Swiper.name]: Swiper,
        [SwiperItem.name]: SwiperItem,
        [Dialog.name]: Dialog,
        pullRefresh,
        digitalPop: () => import('./compoments/digitalPop.vue'),
        gridList,
        upsideAdver,
        middleAdver,
        welfarePre,
        caloriePre,
        overflowRights
    },
    data() {
        return {
            localTypeList: [
                { label: '顶部广告位', value: '01' },
                { label: '宫格区域', value: '02' },
                { label: '上部广告位', value: '03' },
                { label: '中部广告位', value: '04' },
                { label: '福利专区', value: '05' },
                { label: '热卡专区', value: '06' },
                { label: '超值权益', value: '07' }
            ],
            eyesLoading1: false,
            eyesLoading2: false,
            eyesLoading3: false,
            digitalFlag: false,
            selectedSwiperList: [],
            stepIndex: 1,
            loading: false,
            maxIndex: false,
            lastImg: true,
            nextImg: true,
            showTipsModel: false,
            isCheck: true,
            centralSection: [
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_1.png'),
                    pageUrl:
            'https://fintech.12580life.com/fintech-h5/fortuneCenter/bindCardActive/hbActive?parchn=bkzfsll&gytype=001633'
                },
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_2_1.png'),
                    pageUrl:
            'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?parchn=1fg&gytype=001633'
                },
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_3_1.png'),
                    pageUrl:
            'https://fintech.12580life.com/fintech-h5/fortuneCenter/walletActivity?parchn=qbhdjhy&gytype=001633'
                },
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_6_3.png'),
                    pageUrl:
            'https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?dealCh=0yb01&typeId=0yb001&ch=0106&parchn=ydqb0ydg&gytype=001633' // 5
                },

                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_6_2.png'),
                    pageUrl:
            'https://mweis.maxwealthfl.com/lightweight/#/?shId=175&shCode=ZGYD0000'
                },
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_6_5.png'),
                    pageUrl:
            'https://fintech.12580life.com/fintech-h5/healthcare/yihuibaoActivity?parchn=yhb&gytype=001013'
                }
            ],
            freezePop: false,
            usrmob: '',
            zero: false,
            zeroShow: false,
            hfBalance: '0', // 话费余额
            touchArr: Object.freeze(touchArr),
            visibleShow: false,
            noShowNum: '****',
            walletNum: 0,
            isOpen: '', // 是否已开通钱包账户
            jbShowList: {
                // 角标是否显示
                wallet: '',
                hebao: '',
                shubi: ''
            },
            jbTipsList: {
                // 角标是否显示
                wallet: '',
                hebao: '',
                bank: '',
                quanyi: '',
                shubi: ''
            },
            qyList: [],
            hadGetQY: 0,
            notGetQY: 0,
            getJKResult: 0,
            isrefresh: false,
            showLaba: true,
            isSystem: '',
            b2cStatus: '1', // 1.未注册 2.未授权 3.已授权且二次放号 4.未签约 5.已签约
            b2cStatusData: {
                1: '开通',
                2: '授权',
                3: '授权',
                4: '开通',
                5: '已授权'
            },
            b2cData: {
                accountBalance: '0',
                bankCardList: [],
                realType: '0'
            },
            shubiList: [],
            zeroCheck: false
        };
    },
    provide() {
        return {
            golink: this.golink,
            walletPageConf: this.walletPageConf
        };
    },
    computed: {
        ...mapState({
            topPreInfo: state => state.newFortune.topPreInfo
        })
    },
    async created() {
        const u = navigator.userAgent;
        if (u.indexOf('Mac OS X') > -1) {
            this.isSystem = 'ios';
        } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            this.isSystem = 'android';
        }
        // this.getZero(); // 获取零元包状态
        const ua = navigator.userAgent.toLowerCase();
        this.isAndroidAndInapp = (ua.indexOf('android') > -1 || ua.indexOf('linux') > -1)
      && ua.indexOf('jsmcc') > -1;
        this.getTopShowInfo({}, 'loading'); // 查询电子账户信息-------
        // topPreInfo
        await this.walletPageConf({
            name: 'setTopPreInfo',
            infoName: 'topPreInfo',
            localType: '01'
        });
    },
    watch: {
        getJKResult: {
            handler(newValue) {
                console.log(newValue);
                if (newValue >= 1) {
                    this.loading = false;
                    this.isrefresh = false;
                }
            },
            // 深度监测
            deep: true
        }
    },
    mounted() {
        initPageJs(
            this.$route.meta.pageName,
            this.touchArr,
            this.$route.meta.attributes
        );
        // this.getCard();
        // 设置标题
        const showGuide = store2.default.get('showGuide');
        if (showGuide !== null && showGuide !== '') {
            this.showMask = showGuide;
        }
        window.triggerSwiper0 = () => {
            this.goto();
        };
        window.triggerSwiper1 = () => {
            this.play();
        };
        window.triggerSwiper2 = () => {
            this.stop();
        };
        const mask = document.getElementsByClassName('mask')[0]; // 弹窗dom对象
        if (mask) {
            mask.addEventListener(
                'touchmove',
                (e) => {
                    e.preventDefault();
                },
                false
            );
        }
    },
    methods: {
        async walletPageConf(info) {
            try {
                this.$store.dispatch('newFortune/getWalletPageConf', info);
            } catch (error) {
                console.log(error);
            }
        },
        // 数币
        async countCoinsClick() {
            if (this.shubiList.length === 0) {
                const res = await api.digiccyApi.getList({ channelId: 'cmb' });
                this.shubiList = res.list || [];
            }
            if (this.shubiList.length > 0) {
                this.$router.push({
                    name: 'digitalPayment',
                    query: {
                        parchn: 'wdsb',
                        gytype: '001629'
                    }
                });
            } else {
                this.digitalFlag = true;
            }
        },
        digitalClose() {
            this.digitalFlag = false;
        },

        // 查询数币
        getCmbList() {
            api.digiccyApi.getList({ channelId: 'cmb' }).then((res) => {
                this.shubiList = res.list || [];
                this.eyesLoading2 = false;
            });
        },
        // 和包签约/注册
        hbCheck(type) {
            switch (type) {
                case '1': // 未注册
                    this.$router.push({
                        name: 'hbOpen',
                        query: { parchn: 'lqhbzcsq', gytype: '001625' }
                    });
                    break;
                case '2': // 未授权
                    this.$router.push({
                        name: 'hbEmpower',
                        query: { parchn: 'lqhbzc', gytype: '001625' }
                    });
                    break;
                case '3': // 已授权且二次放号
                    this.$router.push({
                        name: 'hbEmpower',
                        query: { parchn: 'lqhbzc', gytype: '001625' }
                    });
                    break;
                case '4': // 未签约
                    this.$router.push({ name: 'accountSigning' });
                    break;
                case '5': // 已授权
                    this.$router.push({
                        name: 'myMoney',
                        query: { parchn: 'lqhb', gytype: '001625' }
                    });
                    break;
            }
        },
        // 获取和包信息
        getInfoList() {
            api.B2CWallet.infoList()
                .then((res) => {
                    this.eyesLoading3 = false;
                    this.b2cStatus = res.state;
                    if (this.b2cStatus != '5') {
                        this.b2cData.bankCardList = [];
                    } else {
                        this.b2cData.bankCardList = res.bankCardList || [];
                    }
                    this.b2cData.accountBalance = res.accountBalance || '0';
                    this.b2cData.realType = res.realType || '0';
                })
                .catch((err) => {
                  this.eyesLoading3 = false;
                });
        },
        reloadYP() {
            if (this.is_play) {
                this.$refs.audio.pause();
                this.showLaba = true;
                this.is_play = false;
            } else {
                this.$refs.audio.play();
                this.showLaba = false;
                this.is_play = true;
            }
        },
        // 音频播放完毕
        isEnded() {
            if (this.$refs.audio.ended) {
                console.log(this.$refs.audio.ended);
                this.showLaba = true;
            }
        },
        topBanner(url) {
            window.location.href = url;
        },
        goWallet() {
            if (this.isOpen === '00') {
                let tyid;
                if (this.$route.query.tyId) {
                    tyid = this.$route.query.tyId;
                } else {
                    tyid = '10010';
                }
                this.$router.push({
                    name: 'khEmpower',
                    query: {
                        typeId: tyid,
                        sourcechannel: this.$route.query.sourcechannel || '',
                        parchn: 'dzzhkh',
                        gytype: '001628'
                    }
                });
            } else if (this.isOpen === '01') {
                this.$router.push({
                    name: 'moveWallet',
                    query: {
                        parchn: 'wdlq',
                        gytype: '001628'
                    }
                });
            } else if (this.isOpen === '03') {
                this.freezePop = !this.freezePop;
            }
        },
        golink(data) {
            if (!data) {
                return;
            }
            window.location.href = data;
        },
        // 查看全部账户列表
        searchAllAccount() {
            if (this.$route.query.tyId && this.$route.query.sourcechannel) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        typeId: this.$route.query.tyId,
                        sourcechannel: this.$route.query.sourcechannel,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
            } else if (this.$route.query.tyId) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        typeId: this.$route.query.tyId,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
            } else if (this.$route.query.sourcechannel) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        sourcechannel: this.$route.query.sourcechannel,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
            } else if (this.$route.query.dealChn) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        dealChn: this.$route.query.dealChn,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
            } else {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
            }
        },
        refreshAllInfo(isLoad) {
            this.getJKResult = 1;
            this.getTopShowInfo({ refreshFlag: '1' }, isLoad);
        },
        // 查询首页头部显示信息
        getTopShowInfo(data, isLoad) {
            if (isLoad === 'loading') {
                this.loading = true;
            } else {
                this.isrefresh = true;
            }

            const getData = data || {};
            const changeList = [];
            api
                .qrySmallChangeAcc(getData)
                .then((res) => {
                    this.isrefresh = false;
                    // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                    this.getJKResult += 1;
                    this.isOpen = res.openFlag;
                    store2.default.set('djList', res.list);
                    const Num = res.list.filter(item => item.accsts === '01');
                    this.walletNum = Num.length || 0;

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
                    sessionStorage.setItem(
                        'qbBankListsInfos',
                        JSON.stringify(changeList)
                    );
                    if(res.openFlag == '01') {
                      if(res.list && res.list.length > 0) {
                        res.list.forEach(s => {
                          if(!s.userCode) {
                            return
                          }
                          store2.default.set('firstfourid', s.userCode.slice(0, 4));
                        })
                      }
                    }
                    store2.default.set('qbBankListsInfo', changeList);
                    // 查询角标信息
                    // this.queryCornerContent(this.isOpen);
                })
                .catch((err) => {
                    this.getJKResult += 1;
                    store2.default.set('qbBankListsInfo', []);
                    console.log(err);
                    // this.$toast.info(err.msgInfo);
                });

            // 获取卡面信息
            // api
            //     .cardImageQuery({ accountType: '01' })
            //     .then((res) => {
            //         this.getJKResult += 1;
            //         const imgList = res.list;
            //         store2.default.set('bankImgList', imgList);
            //     })
            //     .catch((err) => {
            //         this.getJKResult += 1;
            //         store2.default.set('bankImgList', []);
            //         console.log(err.msgInfo);
            //         // this.$toast.info(err.msgInfo);
            //     });
        },
        // 获取角标信息
        queryCornerContent(defaultAccFlg) {
            this.jbShowList = {
                // 角标是否显示
                wallet: '',
                hebao: '',
                shubi: ''
            };
            api
                .cornerContentQuery({})
                .then((res) => {
                    this.getJKResult += 1;
                    res.list.forEach((item) => {
                        if (
                            item.accountType === '01'
              && item.showFlag === '1'
              && item.businessType === '01'
              && defaultAccFlg != '01'
                        ) {
                            // 钱包
                            this.jbShowList.wallet = item.angularContent;
                            this.jbTipsList.wallet = item.atyDesc || '';
                        } else if (
                            item.accountType === '04'
              && item.showFlag === '1'
              && item.businessType === '01'
                        ) {
                            // 和包
                            this.jbShowList.hebao = item.angularContent;
                            this.jbTipsList.hebao = item.atyDesc || '';
                        } else if (
                            item.accountType === '05'
              && item.showFlag === '1'
              && item.businessType === '01'
                        ) {
                            // 数币
                            this.jbShowList.shubi = item.angularContent;
                            this.jbTipsList.shubi = item.atyDesc || '';
                        }
                        store2.default.set('usrmob', res.mobileNo);
                    });
                })
                .catch((err) => {
                    this.getJKResult += 1;
                    store2.default.set('usrmob', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },

        // 是否显示零钱
        isShowNum() {
            this.visibleShow = !this.visibleShow;
            if (this.visibleShow) {
                if (this.hfBalance === '0') {
                    this.eyesLoading1 = true;
                    this.getBalance(); // 查询话费余额------
                }
                if (this.shubiList.length === 0) {
                    this.eyesLoading2 = true;
                    this.getCmbList(); // 查询数币---------
                }
                if(!this.usrmob) {
                  this.getZero()
                }
                if(this.b2cData.realType == '0' || this.b2cData.accountBalance == '0' || this.b2cData.bankCardList.length < 1) {
                  this.eyesLoading3 = true;
                  this.getInfoList();
                }
                // if (this.hadGetQY === 0 && this.notGetQY === 0) {
                //   this.rightAccountQuery();
                // }
                // 查询角标信息
                this.queryCornerContent(this.isOpen);
            }
            const timer = setTimeout(() => {
                clearTimeout(timer);
                this.eyesLoading1 = false;
                this.eyesLoading2 = false;
                this.eyesLoading3 = false;
            }, 5000);
        },
        rightAccountQuery() {
            this.hadGetQY = 0;
            this.notGetQY = 0;
            this.qyList = [];
            api
                .rightAccountQuery({})
                .then((res) => {
                    this.getJKResult += 1;
                    this.qyList = res.list;
                    this.qyList.forEach((item) => {
                        if (item.receiveSts === '1') {
                            this.hadGetQY += 1;
                        } else {
                            this.notGetQY += 1;
                        }
                    });
                    store2.default.set('qyList', this.qyList);
                })
                .catch((err) => {
                    this.getJKResult += 1;
                    store2.default.set('qyList', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        // 去余额查看
        goBalance() {
            if (this.$client.LEADEON) {
                window.location.href = 'https://h.app.coc.10086.cn/cmcc-app/personalBill/phoneBillsNew.html';
            } else {
                window.location.href = 'https://wap.js.10086.cn/vw/navbar/ZDCX2020';
            }
        },
        // 获取话费余额
        getBalance() {
            api
                .qryCallBalance()
                .then((res) => {
                    this.eyesLoading1 = false;
                    console.log('++++++', res);
                    if (res.mobilBalance) {
                        this.hfBalance = (Number(res.mobilBalance) / 100).toFixed(2);
                    }
                })
                .catch((err) => {
                    console.log(`${err}********`);
                });
        },
        // 获取身份信息
        getCard() {
            api
                .queryOpenAccount()
                .then((data) => {
                    if (data.userCode) {
                        store2.default.set('firstfourid', data.userCode.slice(0, 4));
                    }
                })
                .catch((err) => {
                    // this.$toast.info(err.msgInfo);
                    console.log(err.msgInfo);
                    if (err.cityCode) {
                        this.citycode = err.cityCode;
                    }
                });
        },
        // 获取零元包状态
        getZero() {
            api.indexZero().then((res) => {
                this.zeroCheck = true;
                this.usrmob = res.mblNo;
                if (res.actSts == '1') {
                    this.zero = false;
                } else {
                    this.zero = true;
                }
                
                window.localStorage.setItem('walletActSts', res.actSts);
            });
        },
        // 去开通零元包
        goZero() {
            window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
        },
        // 点击角标显示提示弹框
        showTips(val) {
            const dom = document.getElementById('modelText');
            if (val === '01') {
                dom.innerHTML = this.jbTipsList.wallet;
            } else if (val === '02') {
                dom.innerHTML = this.jbTipsList.bank;
            } else if (val === '03') {
                dom.innerHTML = this.jbTipsList.quanyi;
            } else if (val === '04') {
                dom.innerHTML = this.jbTipsList.hebao;
            } else if (val === '05') {
                dom.innerHTML = this.jbTipsList.shubi;
            }
            if (dom.innerHTML !== '') {
                this.showTipsModel = true;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.walletCardcenter {
  overflow-x: hidden;
  position: relative;
  background: #f9fafb;
  height: 100vh;
  overflow-y: auto;
  .newHeader {
    width: 100%;
    height: 484px;
    background-color: #e6e6e6;
    position: relative;
    margin-bottom: 60px;
    .top-href {
      display: block;
      width: 100%;
      height: 220px;
    }
    .listOne,
    .listHb,
    .myWallet {
      display: flex;
      justify-content: space-between;
      text-align: center;
    }

    .listOne {
      height: 40px;
      line-height: 40px;
      padding: 20px 40px;
      font-size: 24px;
      color: #fff;

      .myWallet {
        color: #fff;
        white-space: nowrap;
        font-weight: 600;
        font-size: 30px;
        align-items: center;

        .eye {
          width: 32px;
          height: 18px;
          margin: 0 10px;
        }

        .openEye {
          width: 36px;
          height: 21px;
        }

        .refresh {
          width: 28px;
          height: 28px;
          margin-left: 10px;
        }
      }
      .right-top {
        display: flex;
        justify-content: center;
        align-items: center;
        .laba {
          .smallLaba {
            margin-right: 20px;
            width: 31px;
            height: 28px;
            background: url("../../assets/images/laba_static.png") no-repeat;
            background-size: 100%;
            vertical-align: bottom;
          }

          .movingLaba {
            margin-right: 20px;

            img {
              width: 30px;
              height: 24px;
            }
          }
        }
        .more {
          display: inline-block;
          width: 14px;
          height: 14px;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(135deg);
        }
      }
    }

    .body-list {
      position: absolute;
      top: 422px;
      left: 50%;
      z-index: 99;
      transform: translateX(-50%);
      .body {
      }
    }

    .listHb {
      color: #ffe2cb;
      font-size: 30px;
      margin-top: 33px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .hb_item {
        flex: 1;
        position: relative;
        text-align: center;
        .mg-top {
          margin-top: 10px;
        }
        .hb_br {
          font-size: 30px;
          border: 2px solid #ffffff;
          // height: 45px;
          line-height: 45px;
          padding: 1px 20px;
          border-radius: 18px;
          font-weight: bold;
        }
        .hb_num {
          font-family: DIN-Bold;
          font-weight: 700;
          font-size: 34px;
          color: #ffffff;
        }
        .hb_nm {
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          font-size: 26px;
          color: #ffffff;
          text-align: center;
        }
        .topTip {
          position: absolute;
          top: -35px;
          left: 75%;
          font-size: 20px;
          font-weight: 500;
          background-image: linear-gradient(180deg, #fd3938 0%, #ff2b36 100%);
          border-radius: 10px 10px 10px 0;
          color: #fff;
          padding: 6px 12px;
          display: inline-block;
          white-space: nowrap;
          zoom: 0.8;
        }
        .tip-custom {
          left: 85%;
        }
      }
    }

    .zero {
      width: 85px;
      height: 27px;
      margin-left: 13px;
      //margin-top: 5px;
      background: url("~@/assets/images/newIndex/zeroNo.png") no-repeat;
      background-size: 100% auto;
    }

    .zeroOn {
      width: 148px;
      height: 31px;
      margin-left: 10px;
      //margin-top: 3px;
      background: url("~@/assets/images/newIndex/zeroOn.png") no-repeat;
      background-size: 100% auto;
      font-weight: 700;
      font-size: 18px;
      color: #985a17;
      padding-left: 31px;
      box-sizing: border-box;
      line-height: 33px;
    }

    .zeroBox {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.65);
      z-index: 999999999999;
      display: flex;
      align-items: center;
      justify-content: center;

      .box {
        width: 585px;
        height: 425px;
        background: #ffffff;
        border-radius: 25.2px;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        .top {
          width: 100%;
          height: 91px;
          background: #eaf6ff;
          line-height: 103px;
          font-weight: 400;
          font-size: 38px;
          color: #1b7aee;
        }

        .text {
          width: 509px;
          height: 120px;
          margin-top: 46px;
          margin-bottom: 41px;
          text-align: center;
          line-height: 60px;
          font-weight: 400;
          font-size: 32px;
          color: #393939;
          font-family: PingFangSC-Regular;
        }

        .texts {
          width: 442px;
        }

        .btn {
          width: 100%;
          padding: 0 29px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          font-weight: 400;

          .left {
            width: 250px;
            height: 80px;
            border: 2px solid #1b7aee;
            border-radius: 55px;
            text-align: center;
            line-height: 80px;
            font-size: 36px;
            color: #1b7aee;
          }

          .right {
            width: 250px;
            height: 80px;
            background: #1b7aee;
            border-radius: 55px;
            text-align: center;
            line-height: 80px;
            font-size: 36px;
            color: #ffffff;
          }
        }
      }
    }
  }

  .body {
    width: 100%;
    .walletBegin_foot {
      margin-top: 50px;
      text-align: center;
      img {
        width: 416px;
        height: 32px;
      }
      .problem {
        font-weight: 600;
        font-size: 0.22rem;
        color: #0098ff;
        letter-spacing: 0;
        margin-bottom: 0.56rem;
        margin-top: 0.2rem;
        text-decoration: underline;
      }
    }
  }
}

.jbsmModel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);

  .cont {
    width: 500px;
    // height: 600px;
    border-radius: 20px;
    background: #fff;
    padding-bottom: 20px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      text-align: center;
      height: 80px;
      line-height: 80px;
      font-size: 36px;
      font-weight: 500;
      border-bottom: 1px solid #00aaee;
    }

    .text {
      min-height: 80px;
      // height: 380px;
      padding: 20px;
      overflow: auto;
      font-size: 26px;
      line-height: 40px;
      white-space: pre-line;
      word-break: break-all;
    }

    .btn {
      width: 300px;
      height: 60px;
      line-height: 60px;
      color: #fff;
      background: #00aaee;
      text-align: center;
      margin: 20px auto 0;
      font-size: 36px;
      border-radius: 20px;
    }
  }
}

.showModel {
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
</style>
