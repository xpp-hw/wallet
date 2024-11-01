<template>
  <div>
    <!-- <div class="header">
      <span class="movewallet">移动钱包</span>

    </div>-->

    <!-- 未开户状态 -->
    <div class="notOpenAccount">
      <ul v-if="fromPage != 'walletCardcenter'" class="nitOpenIcon" style="margin-top: 0.3rem">
        <li
          v-for="(item, index) in speedDial"
          :key="index"
          @click="jumpExternal(item)"
          :id="item.id"
        >
          <img :src="item.picUrl" alt style="width: 0.8rem; height: 0.8rem; margin-bottom: 0.1rem" />
          <br />
          <span>{{ item.txt }}</span>
        </li>
      </ul>

      <div v-if="fromPage != 'walletCardcenter'" class="md-example-child md-example-child-swiper md-example-child-swiper-0 swiperImg">
        <md-swiper
          @before-change="beforeChange"
          @after-change="afterChange"
          ref="swiper"
          :is-prevent="false"
          :useNative-driver="false"
          dragable
        >
          <md-swiper-item :key="$index" v-for="(item, $index) in bannerImg" style="width: 100%">
            <a :href="item.linkUrl" :id="item.id">
              <div class="banner-item">
                <img :src="item.picUrl" alt style="width: 100%; height: 100%; border-radius: 15px" />
              </div>
            </a>
          </md-swiper-item>
        </md-swiper>
      </div>

      <!-- 我的钱包 -->
      <div v-if="fromPage != 'walletCardcenter'" style="overflow: hidden; margin-bottom: 0.5rem; margin-top: 0.2rem">
        <h4 style="font-size: 0.32rem; color: #333333; font-weight: 700; float: left">我的钱包</h4>
        <span
          class="setting"
          @click.stop="setIntoLooseAccount"
          style="float: right; font-size: 0.3rem"
          v-if="isShowSet"
        >设置</span>
      </div>

       <!-- 我的银行卡，卡证中心跳转过来->显示 -->
       <div v-if="!isNokh && fromPage == 'walletCardcenter'" style="overflow: hidden; margin-bottom: 0.5rem; margin-top: 0.4rem">
        <h4 style="font-size: 0.34rem; color: #333333; font-weight: 600; float: left">我的银行卡</h4>
        <span
          class="setting"
          @click.stop="setIntoInfor"
          style="float: right; font-size: 0.34rem; font-weight: 400;"
          v-if="!waitShowBanks && !waitShowOpens"
        >设置</span>
      </div>

      <div v-if="waitShowBanks" style="text-align:center;"><md-icon name="spinner" size="lg" style="-webkit-filter:invert(1);"></md-icon></div>
      <ul class="bankCards">
        <li v-for="(item, index) in myBanks" :key="index">
          <div @click.stop="intoLooseChange(item)">
            <img :src="item.image" alt style="width: 100%" />
          </div>
          <span
            v-if="item.defaultAccFlg == '01' && (item.orgName !== '工行银行数字货币' && item.orgName !== '工行数货')"
            @click.stop="intoLooseChange(item)"
          >零钱账户</span>
          <span v-if="circles" @click.stop="intoLooseChange(item)">{{ account }}</span>
          <p
            @click.stop="intoLooseChange(item)"
            v-if="(item.orgName !== '工行银行数字货币' && item.orgName !== '工行数货')"
          >{{ item.accNbr }}</p>
          <p
            v-if="item.orgName == '工行银行数字货币' || item.orgName == '工行数货'"
            class="idys"
            @click.stop="intoLooseChange(item)"
          >ID: {{ item.accNbr }}</p>
        </li>
      </ul>

      <!-- 开户位 -->
      <div v-if="waitShowOpens" style="text-align:center;"><md-icon name="spinner" size="lg" style="-webkit-filter:invert(1);"></md-icon></div>
      <ul class="goOpenAccount" :class="{'changeSize':isNokh, 'centerItem': (isNokh && fromPage == 'walletCardcenter')}"  v-show="openShow">
        <li
          v-for="(item, index) in openWindow"
          :key="index"
          @click="goOpenWindow(item)"
          :id="item.id"
        >
          <a href="javascript:;">
            <img :src="item.picUrl" alt style="border-radius: 15px" />
          </a>

          <!-- <p>每月5元话费免费领</p> -->
          <!-- <md-button type="default" size="small" >去开户</md-button> -->
          <div class="noKhtxt" v-if="isNokh">您暂未开通银行电子账户</div>
          <div class="noKhtxt" v-if="isNokh" @click="goOpenWindow(item)">开户即得<span style="color:#E74050;">10元话费</span>，快<span style="color:#33a4fc;text-decoration:underline">去开户</span>吧 ></div>
        </li>
      </ul>
      <!-- 开户校验资格 -->
      <md-popup v-model="checkOpen">
        <div class="gotoSetLoose">
          <div class="loseTitle">温馨提示</div>
          <div class="cont">
            <p>{{ checkCont }}</p>
            <div class="btnBox">
              <md-button type="default" size="small" @click="checkOpen = false">知道了</md-button>
              <md-button
                v-if="isShowJumpBtn"
                type="default"
                size="small"
                @click="checkThenJump"
              >{{ checkBtnTxt }}</md-button>
            </div>
          </div>
        </div>
      </md-popup>
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import axios from 'axios';
import qs from 'qs';
import * as store2 from '@/common/localstore';
import simple from 'mand-mobile/components/swiper/demo/data/simple';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    props: {
        mobVersion: {
            type: String,
            default: ''
        },
        citycode: {
            type: String,
            default: ''
        },
        usrmobile: {
            type: String,
            default: ''
        },
        useraccsts: {
            type: String,
            default: ''
        },
        fromPage: {
            type: String,
            default: ''
        },
        hasaccount: {
            type: Boolean,
            default: false
        },
        orgcode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            balanceMoney: 45632,
            inbalanceMoney: '*****',
            simple,
            current: 0,
            intoAccount: false,
            notOpenAccount: true,
            isPopupShow: {
                center: false
            },
            myBanks: [],
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A04'
                },
                {
                    id: 'A05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A05'
                },
                {
                    id: 'A06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A06'
                },
                {
                    id: 'A07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A07'
                },
                {
                    id: 'A08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A08'
                },
                {
                    id: 'A09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A09'
                },
                {
                    id: 'A10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_A10'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_B04'
                },
                {
                    id: 'B05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_B05'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_C02'
                },
                {
                    id: 'C03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_C03'
                },
                {
                    id: 'C04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_C04'
                },
                {
                    id: 'C05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_INDEX_C05'
                }
            ],
            opensts: '去开户',
            //  首页宫格
            speedDial: [],
            // 首页轮播图
            bannerImg: [],
            //  首页开户位
            openWindow: [],
            jumpUrl: '',
            orgNameBank: [],
            openShow: false,
            isShowSet: false,
            // 开户校验弹框内容
            checkOpen: false,
            checkCont: '',
            checkBtnTxt: '',
            isShowJumpBtn: false,
            checkThenJumpLink: null,
            navg: '',
            isShowkuang: false,
            isNokh: false,
            noKhImg: require('../../assets/images/nokh_bg.png'),
            locateInformation: false, // 定位信息是否为苏州
            circles: false, // 工商银行内容是否显示
            account: '已挂失',
            client: '',
            adcode: '',
            latitude: '', // 纬度
            longitude: '', // 经度
            waitShowBanks: true,
            waitShowOpens: true
        };
    },
    created() {
        this.usrmobile = store2.default.get('usrmob');
        // this.getAllLoose();
        // this.getInitBank();
        // this.getmyData();
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    mounted() {
        if (this.$route.query.refresh == 1) {
            this.getmyData();
        }
    },
    watch: {
        useraccsts: {
            immediate: true,
            handler() {
                if (this.useraccsts) {
                    this.getmyData();
                }
            }
        }
    },
    methods: {
        onGetInfo() {
            api.digiccyApi
                .getInfo()
                .then((res) => {
                    console.log(res, 'getInfo');
                    if (res.data.walletStatus == '3') {
                        this.circles = true;
                        this.account = '已挂失';
                    } else if (res.data.walletStatus == '4') {
                        this.circles = true;
                        this.account = '已冻结';
                    } else if (res.data.walletStatus == '5') {
                        this.circles = true;
                        this.account = '已止付';
                    } else {
                        this.circles = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getLocation() {
            const { userAgent } = navigator;
            const userAgentL = userAgent.toLowerCase();
            const client = {
                IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                ANDROID: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1, // android终端或者uc浏览器
                IPHONE: userAgent.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
                IPAD: userAgent.indexOf('iPad') > -1, // 是否iPad
                JSMCC: userAgentL.indexOf('jsmcc') > -1 // jsyd营业厅
            };
            if (client.JSMCC) {
                if (client.ANDROID) {
                    this.androidGetLocation();
                } else {
                    this.iosGetLocation();
                }
            }
        },
        androidGetLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                        this.sendSuccessMessage('getLocation', { lat: position.coords.latitude, lon: position.coords.longitude });
                        /**
                         "经度" : position.coords.longitude;
                         "纬度" : position.coords.latitude;
                         "准确度" : position.coords.accuracy;
                         "海拔" : position.coords.altitude;
                         "海拔准确度" : position.coords.altitudeAcuracy;
                         "行进方向" : position.coords.heading;
                         "地面速度" : position.coords.speed;* */
                    },
                    (error) => {
                        console.log(error);
                    },
                    {
                        enableHighAcuracy: false, // 指示浏览器获取高精度的位置，默认为false
                        timeout: 5000, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                        maximumAge: 2000 // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
                    }
                );
            } else {
                this.$toast('此浏览器不支持定位!');
            }
        },
        iosGetLocation() {
            // 调用方式
            this.setupWebViewJavascriptBridge((WebViewJavascriptBridge) => {
                WebViewJavascriptBridge.callHandler('LocationInfo', (response) => {
                    this.latitude = response.latitude;
                    this.longitude = response.longitude;
                    this.sendSuccessMessage('getLocation', { lat: response.latitude, lon: response.longitude });
                });
            });
        },
        setupWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            console.log(window.WVJBCallbacks);
            const WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(() => {
                document.documentElementNaNpxoveChild(WVJBIframe);
            }, 0);
        },
        sendSuccessMessage(cmd, resultObj) {
            AMap.plugin('AMap.Geocoder', () => {
                const geocoder = new AMap.Geocoder({
                    city: '全国'
                });
                const lonlat = [resultObj.lon, resultObj.lat];
                geocoder.getAddress(lonlat, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        this.adCode = result.regeocode.addressComponent.adcode; // 320106
                        store2.default.set('adcode', this.adCode);
                    } else {
                        this.$toast('获取所在城市失败!');
                    }
                });
            });
        },
        getmyData() {
            const postDatas = {
                channelNum: 'WAP', // this.channelCode
                regionNum: this.citycode, // this.citycode
                pageNum: 'YDQBSY',
                mobileNum: this.usrmobile, // this.usrmobile
                version: this.mobVersion // this.mobVersion
            };
            axios({
                method: 'post',
                url: 'https://wap.js.10086.cn/jsmccClient/cd/market_content/api/v1/market_content.page.query', // 路径
                data: postDatas,
                transformRequest: [
                    // eslint-disable-next-line func-names
                    function (data) {
                        let ret = '';
                        ret = qs.stringify(data);
                        return ret;
                    }
                ],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                if (res.data.retcode === '0') {
                    const datas = res.data.retobj;
                    for (let i = 0; i < datas.length; i += 1) {
                        // 首页宫格
                        if (datas[i].contactNum === 'YDQBSYGG_W') {
                            this.speedDial = datas[i].content;
                            this.speedDial.forEach((item) => {
                                // eslint-disable-next-line no-param-reassign
                                item.id = `A0${item.sortNum}`;
                            });
                        }
                        // 首页轮播图
                        if (datas[i].contactNum === 'YDQBSYBANNERW_W') {
                            this.bannerImg = datas[i].content;
                            this.bannerImg.forEach((item) => {
                                // eslint-disable-next-line no-param-reassign
                                item.id = `B0${item.sortNum}`;
                            });
                        }
                        // 开户位
                        if (datas[i].contactNum === 'YDQBSYZBKHW_W') {
                            this.openWindow = datas[i].content;
                            console.log(this.openWindow, 'this.openWindow');
                            this.openWindow.forEach((item) => {
                                // eslint-disable-next-line no-param-reassign
                                item.id = `C0${item.sortNum}`;
                            });
                            this.getAllLoose();
                        }
                    }
                }
            });
        },
        jumpExternal(value) {
            window.location.href = value.linkUrl;
        },
        goBack() {
            this.$router.go(-1);
        },

        setValue(id, value) {
            // eslint-disable-next-line no-unused-expressions
            document.querySelector(id) && (document.querySelector(id).innerHTML = value);
        },
        beforeChange(from, to) {
            this.setValue('#valueSwiper0', from);
            this.setValue('#valueSwiper1', to);
        },
        afterChange(from, to) {
            this.setValue('#valueSwiper2', from);
            this.setValue('#valueSwiper3', to);
        },
        fn(index) {
            this.setValue('#valueSwiper4', index);
        },
        goto() {
            this.$refs.swiper.goto(2);
        },
        play() {
            this.$refs.swiper.play();
        },
        stop() {
            this.$refs.swiper.stop();
        },
        onSwiperChange(from, to) {
            this.current = to;
        },
        intoLooseChange(bankCord) {
            // console.log(bankCord);
            this.$router.push({
                name: 'moveWallet',
                query: {
                    accNbr: bankCord.accNbr,
                    fullAccNbr: bankCord.fullAccNbr,
                    orgName: bankCord.orgName
                }
            });
            // this.intoAccount = true;
            this.notOpenAccount = false;
        },
        lookFullCard() {
            this.isPopupShow.center = true;
        },
        // 设置
        setIntoLooseAccount() {
            this.$router.push({
                name: 'looseChange'
            });
        },
        // 查询所有零钱账户
        getAllLoose() {
            api.looseChange
                .qryAllAcc({
                    entryTx: '',
                    // 测试传，生产不传
                    mobile: this.usrmobile
                })
                .then((res) => {
                    const orgNameArr = [];
                    this.myBanks = res.list;
                    // eslint-disable-next-line prefer-destructuring
                    for (let i = 0; i < this.myBanks.length; i += 1) {
                        orgNameArr.push(this.myBanks[i].orgName);
                        if (this.myBanks[i].orgName && (this.myBanks[i].orgName === '工行银行数字货币' || this.myBanks[i].orgName === '工行数货' || this.myBanks[i].orgName === '工行数币')) {
                            this.onGetInfo();
                        }
                        if (this.myBanks[i].accNbr == null || (!this.hasaccount && this.myBanks[i].orgCode !== 'ICBC-DIGICCY')) {
                            this.myBanks.splice(i, 1);
                            i -= 1;
                        }
                    }
                    console.log(this.myBanks);
                    this.$emit('getmyBanks', this.myBanks);
                    this.waitShowBanks = false;
                    this.waitShowOpens = false;
                    // 判断是否显示“设置”按钮
                    if (this.myBanks.length === 0 || (this.myBanks.length === 1 && this.myBanks[0].defaultAccFlg === '00') || (this.myBanks.length === 1 && this.myBanks[0].orgCode === 'ICBC-DIGICCY')) {
                        this.isShowSet = false;
                    } else {
                        this.isShowSet = true;
                    }
                    if (this.myBanks.length === 0 || this.myBanks === null) {
                        if (this.useraccsts === '00' || this.useraccsts === '09') {
                            this.isNokh = true;
                            for (let i = 0; i < this.openWindow.length; i += 1) {
                                if (this.openWindow[i].contentName === '移动钱包首页开户宣传-零钱账户') {
                                    this.openWindow[i].picUrl = this.noKhImg;
                                    this.openWindow = [this.openWindow[i]];
                                    this.openShow = true;
                                }
                            }
                        } else {
                            this.isNokh = false;
                            for (let i = 0; i < this.openWindow.length; i += 1) {
                                if (this.openWindow[i].contentName === '移动钱包首页开户宣传-零钱账户') {
                                    this.openWindow.splice(i, 1);
                                    this.openShow = true;
                                }
                            }
                        }
                    } else {
                        this.isNokh = false;
                        for (let j = 0; j < this.openWindow.length; j += 1) {
                            if (this.openWindow[j].contentName === '移动钱包首页开户宣传-零钱账户') {
                                this.openWindow.splice(j, 1);
                                j -= 1;
                            } else {
                                for (let o = 0; o < this.myBanks.length; o += 1) {
                                    if (this.openWindow[j].contentName === '移动钱包首页开户宣传-浦发银行' && this.myBanks[o].orgName === '浦发银行') {
                                        this.openWindow.splice(j, 1);
                                        j -= 1;
                                        break;
                                    } else if (this.openWindow[j].contentName === '移动钱包首页开户宣传-招商银行' && this.myBanks[o].orgName === '招商银行') {
                                        this.openWindow.splice(j, 1);
                                        j -= 1;
                                        break;
                                    } else if (this.openWindow[j].contentName === '移动钱包首页开户宣传-工商银行' && (this.myBanks[o].orgName === '工行银行数字货币' || this.myBanks[o].orgName === '工行数货' || this.myBanks[o].orgName === '工行数币')) {
                                        this.openWindow.splice(j, 1);
                                        j -= 1;
                                        break;
                                    }
                                }
                            }
                            api.digiccyApi
                                .getConfig()
                                .then((data) => {
                                    console.log(data.data.digiccyEnabled, 'data.data.digiccyEnabled');
                                    if (data.data.digiccyEnabled) {
                                        this.getLocation();
                                        if (data.data.locationLockSuzhou) {
                                        // 320500 苏州编码 320106 南京编码
                                            if (store2.default.get('adcode') !== '320500') {
                                                for (let c = 0; c < this.openWindow; c += 1) {
                                                    if (this.openWindow[c].contentName === '移动钱包首页开户宣传-工商银行') {
                                                        this.openWindow.splice(c, 1);
                                                        c -= 1;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        for (let a = 0; a < this.openWindow; a += 1) {
                                            if (this.openWindow[a].contentName === '移动钱包首页开户宣传-工商银行') {
                                                this.openWindow.splice(a, 1);
                                                a -= 1;
                                                break;
                                            }
                                        }
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                        this.openShow = true;
                    }
                }).catch((err) => {
                    this.waitShowBanks = false;
                    this.waitShowOpens = false;
                    this.$toast.info(err.msgInfo);
                });
        },
        goOpenWindow(value) {
            if (value.contentName === '移动钱包首页开户宣传-工商银行') {
                //  定位开关
                this.$router.push({
                    name: 'currencyPage'
                });
            } else {
                if (value.contentName.split('-')[1] == '零钱账户') {
                    this.$router.push({
                        name: 'walletAccount'
                    });
                    return;
                }
                const jumpName = value.contentName.split('-')[1];
                let orgCode = '';
                const val = value.linkUrl.split('?')[1].split('&')[1];
                if (val) {
                    orgCode = val;
                } else {
                    orgCode = 'orgcode=spdb';
                }
                // 校验开户资格
                orgCode = orgCode.split('=')[1].toUpperCase();
                const SetDefault = [];
                this.myBanks.forEach((item) => {
                    if (item.defaultAccFlg === '01' && item.accNbr) {
                        SetDefault.push(item);
                    }
                    if (item.orgCode.toUpperCase() === orgCode) {
                        this.checkCont = '您已开户成功，请勿重复操作哦~';
                        this.isShowJumpBtn = false;
                        this.checkOpen = true;
                        return false;
                    }
                });
                api.bannerCheck({
                    orgCode
                })
                    .then((res) => {
                        const type = res.openPreType;
                        if (type === 'change') {
                            // 去换绑
                            this.checkCont = `您的${this.usrmobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}手机号下已开通移动钱包，请使用该号码操作`;
                            this.isShowJumpBtn = false;
                            this.checkOpen = true;
                            return false;
                        }
                        if (type === 'sign') {
                            this.checkCont = '您的手机号i下存在电子账户，点击确认，签约账户；签约成功后，即可查看您的零钱账户。';
                            this.checkBtnTxt = '确认签约';
                            this.isShowJumpBtn = true;
                            this.checkThenJumpLink = { name: 'walletSign' };
                            this.checkOpen = true;
                            return false;
                        }
                        if (type === 'frozen') {
                            // 冻结
                            this.checkCont = '您的账户已冻结';
                            this.isShowJumpBtn = false;
                            this.checkOpen = true;
                            return false;
                        }
                        if (type === 'opening') {
                            // 开户中
                            this.checkCont = '正在开户中，请稍等。';
                            this.isShowJumpBtn = false;
                            this.checkOpen = true;
                            return false;
                        }
                        if (type === 'openAccount') {
                            // 去开户
                            this.$router.push({
                                name: 'walletAccount',
                                query: {
                                    typeId: 10010,
                                    orgName: jumpName,
                                    orgCode
                                }
                            });
                        }
                    })
                    .catch((err) => {
                        if (err.msgInfo === '暂无开户资格') {
                            if (orgCode.toUpperCase() === 'SPDB') {
                                this.checkCont = '仅限浦发银行新客户参加哦~';
                            } else {
                                this.checkCont = '您不具备招商开户资格哦~';
                            }
                        } else {
                            this.checkCont = err.msgInfo;
                        }
                        this.isShowJumpBtn = false;
                        this.checkOpen = true;
                        return false;
                    });
            }
        },
        checkThenJump() {
            this.$router.push(this.checkThenJumpLink);
        },
        setIntoInfor() {
            let jyparam = '';
            let pfparam = '';
            const bankOrgCode = this.myBanks.map(bank => bank.orgCode);
            if (this.hasaccount) {
                jyparam = '1';
                pfparam = this.orgcode;
            } else {
                jyparam = '0';
            }
            this.$router.push({
                name: 'basicInfo',
                query: {
                    jyparams: jyparam,
                    pfparams: pfparam,
                    banks: bankOrgCode.join(','),
                    isShowSet: this.isShowSet ? '01' : '02'
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.header {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background-color: #fff;
  .back {
    position: absolute;
    left: 40px;
    font-size: 30px;
  }
  .movewallet {
    font-size: 34px;
    font-weight: 700;
    margin: 0 auto;
  }
  .setting {
    position: absolute;
    right: 40px;
    font-size: 30px;
  }
}

.swiperImg {
  .banner-item {
    border-radius: 15px;
  }
}
.md-swiper,
.md-swiper-box {
  height: 2rem;
}
.notOpenAccount {
  overflow: hidden;
  padding: 0 40px;
  .nitOpenIcon {
    padding: 20px 0;
    width: 100%;
    li {
      display: inline-block;
      width: 20%;
      text-align: center;
      margin-bottom: 0.2rem;
      span {
        // dispaly: inline-block;
        margin-bottom: 0.2rem;
        font-size: 26px;
      }
    }
  }
  .bankCards {
    // overflow: hidden;
    width: 100%;
    margin-bottom: 0.5rem;
    li {
      display: block;
      position: relative;
    }
    :nth-child(1) {
      position: relative;
      border-radius: 0.3rem;
      width: 100%;
    }
    :nth-child(1) span {
      display: block;
      margin-top: -3.9rem;
      position: absolute;
      right: 0;
      color: #000;
      width: 1.57rem;
      height: 0.57rem;
      line-height: 0.57rem;
      text-align: center;
      border-radius: 0.29rem 0 0 0.29rem;
      background-color: #d6d5d9;
      font-size: 0.28rem;
      z-index: 2;
    }
    :nth-child(1) p {
      position: absolute;
      left: 20px;
      margin-top: -3.1rem;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 5px;
      border-radius: 30px;
      font-size: 30px;
      color: #333333;
    }
    :nth-child(2) {
      margin-top: -2.4rem;
      border-radius: 0.3rem;
    }
    :nth-child(2) span {
      display: block;
      margin-top: -390px;
      position: absolute;
      right: 0.4rem;
      color: #000;
      width: 1.5rem;
      height: 49px;
      line-height: 49px;
      text-align: center;
      border-radius: 14pt 0 0 14pt;
      background-color: #d6d5d9;
      font-size: 30px;
      z-index: 2;
    }
    :nth-child(2) p {
      position: absolute;
      left: 20px;
      margin-top: -3.1rem;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 5px;
      border-radius: 30px;
      font-size: 30px;
      color: #333333;
    }
    :nth-child(3) {
      margin-top: -2.4rem;
      border-radius: 0.3rem;
    }
    :nth-child(3) span {
      display: block;
      margin-top: -390px;
      position: absolute;
      right: 0;
      color: #000;
      width: 1.5rem;
      height: 49px;
      line-height: 49px;
      text-align: center;
      border-radius: 14pt 0 0 14pt;
      background-color: #d6d5d9;
      font-size: 30px;
      z-index: 2;
    }
    :nth-child(3) p {
      position: absolute;
      left: 20px;
      margin-top: -340px;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 5px;
      border-radius: 30px;
      font-size: 30px;
      color: #333333;
    }
    :nth-child(4) {
      margin-top: -2.4rem;
      border-radius: 0.3rem;
    }
    :nth-child(4) span {
      display: block;
      margin-top: -390px;
      position: absolute;
      right: 0;
      color: #000;
      width: 1.5rem;
      height: 49px;
      line-height: 49px;
      text-align: center;
      border-radius: 14pt 0 0 14pt;
      background-color: #d6d5d9;
      font-size: 30px;
      z-index: 2;
    }
    :nth-child(4) p {
      position: absolute;
      left: 20px;
      margin-top: -340px;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 5px;
      border-radius: 30px;
      font-size: 30px;
      color: #333333;
    }
    :nth-child(5) {
      margin-top: -2.4rem;
      border-radius: 0.3rem;
    }
    :nth-child(5) span {
      display: block;
      margin-top: -390px;
      position: absolute;
      right: 0;
      color: #000;
      width: 1.5rem;
      height: 49px;
      line-height: 49px;
      text-align: center;
      border-radius: 14pt 0 0 14pt;
      background-color: #d6d5d9;
      font-size: 30px;
      z-index: 2;
    }
    :nth-child(5) p {
      position: absolute;
      left: 20px;
      margin-top: -340px;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 5px;
      border-radius: 30px;
      font-size: 30px;
      color: #333333;
    }
  }
  .goOpenAccount {
    position: relative;
    // margin-top : .3rem;
    margin-bottom: 2rem;

    li {
      width: 100%;
      height: 1.375rem;
      // background-color: #eaf1ff;
      line-height: 1.375rem;
      margin-bottom: 0.3rem;
      img {
        width: 100%;
        height: 100%;
      }
    }

    li p {
      float: left;
      font-size: 32px;
      margin-left: 60px;
    }
    li .md-button {
      width: 110px;
      float: right;
      margin-right: 40px;
      margin-top: 40px;
      background-color: #44b4f8;
      color: #fff;
    }
  }
  .changeSize {
    height: auto;
    li {
      height: auto;
      img {
        width: 80%;
        height: auto;
        margin-left: 10%;
      }
      .noKhtxt {
        line-height: 0.4rem;
        text-align: center;
        font-weight: 400;
        font-size: 0.25rem;
        color: #333333;
        font-family: PingFangSC-Regular;
      }
      .noKhtxt:first-of-type {
        margin-top: -0.4rem;
      }
      .noKhtxt:last-of-type {
        font-size: 0.3rem;
        margin-top: 0.1rem;
      }
    }
  }
  .centerItem{
      margin-top: 2.43rem;
  }
}
.md-example-child-swiper-0 {
  height: 250px;
  .banner-item {
    float: left;
    width: 100%;
    height: 100%;
    line-height: 250px;
    text-align: center;
    font-size: 28px;
    color: #fff;
    box-align: center;
    align-items: center;
    box-pack: center;
    justify-content: center;
    text-decoration-line: none;
  }
}
.gotoSetLoose {
  width: 5rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 0.3rem;
  text-align: center;
  .loseTitle {
    width: 100%;
    height: 0.6rem;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.38rem;
    text-align: center;
    border-bottom: 0.01rem solid #e1e1e1;
  }
  p {
    font-size: 0.3rem;
    margin-bottom: 30px;
  }
  .cont {
    width: 4rem;
    margin: 0.34rem auto;
  }
  .btnBox {
    display: flex;
    justify-content: space-evenly;
    /deep/.md-button.small {
      width: 1.5rem;
    }
  }
}
.idys {
  bottom: 0.5rem;
}
</style>
