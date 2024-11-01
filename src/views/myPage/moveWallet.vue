<template>
    <div class="moveWallets">
        <!-- 已开户状态 -->
        <div class="bankCard" v-if="isShow">
            <div
                class="bg-blue"
                :style="'background-image:url(' + bgImg + ');'"
            >
            </div>
            <div class="topBankInfo">
                <p class="set"></p>
                <div class="showBanks">
                    <!-- <div class="itemBank"> -->
                    <!-- <div class="prevBank" v-if="prevImg" :style="'background:url('+prevImg+') no-repeat top right;background-size:cover;'"></div> -->
                    <!-- </div> -->
                    <div class="swiper">
                        <md-swiper
                            @after-change="afterChange"
                            @before-change="beforeChange"
                            ref="swiper"
                            :is-prevent="true"
                            :has-dots="false"
                            :autoplay="0"
                            :is-loop="false"
                            :default-index="this.bankIdx"
                        >
                            <md-swiper-item
                                class="swiperItem"
                                :class="bankIdx == idx ? 'bankActive' : ''"
                                :key="idx"
                                v-for="(item, idx) in myBanks"
                            >
                                <div class="itemBank">
                                    <div
                                        class="prevBank"
                                        v-if="prevImg"
                                        :style="
                                            'background:url(' +
                                            prevImg +
                                            ') no-repeat top right;background-size:cover;'
                                        "
                                    ></div>
                                </div>
                                <div>
                                    <span
                                        class="deafult"
                                        v-if="item.defaultAccFlg === '01'"
                                        >默认账户</span
                                    >
                                    <img :src="item.image" alt="" />
                                </div>
                                <div class="itemBank">
                                    <div
                                        class="nextBank"
                                        v-if="nextImg"
                                        :style="
                                            'background:url(' +
                                            nextImg +
                                            ') no-repeat top left;background-size:cover;'
                                        "
                                    ></div>
                                </div>
                            </md-swiper-item>
                        </md-swiper>
                    </div>
                    <!-- <div class="itemBank"> -->
                    <!-- <div class="nextBank" v-if="nextImg" :style="'background:url('+nextImg+') no-repeat top left;background-size:cover;'"></div> -->
                    <!-- </div> -->
                </div>
                <div class="bankCode">
                    <p v-if="accNbr">{{ accNbr }}</p>
                    <p
                        v-if="accNbr"
                        class="complete"
                        @click="showFullCard = true"
                        id="C01"
                    >
                        查看完整卡号
                    </p>
                    <p>{{ bankIdx + 1 }}/{{ myBanks.length }}</p>
                </div>
                <p class="tips" v-if="bankcs == 'BOCM'">{{orgName}}Ⅱ类户，由江苏移动和{{orgName}}共同提供服务</p>
                <p class="tips" v-else>{{orgName}}Ⅲ类户，由江苏移动和{{orgName}}共同提供服务</p>
            </div>
            <div class="bottomCont" v-if="fullCardNum">
                <div class="balance">
                    <span>账户余额</span>
                    <span
                        v-if="!isRefresh"
                        style="
                            margin-left: 0.2rem;
                            color: #3e3e3e;
                            font-size: 0.36rem;
                            font-weight: 500;
                        "
                    >
                        {{
                            visibleShow == "visible"
                                ? balanceMoney
                                : inbalanceMoney
                        }}
                    </span>
                    <div
                        v-else
                        style="
                            margin-left: 0.2rem;
                            display: inline-block;
                            min-width: 0.6rem;
                            vertical-align: top;
                        "
                    >
                        <md-icon
                            name="spinner"
                            size="lg"
                            style="-webkit-filter: invert(1)"
                        ></md-icon>
                    </div>
                    <div
                        @click="refreshBalanceMoney"
                        style="margin-left: 0.2rem; display: inline-block"
                    >
                        <img
                            style="width: 0.3rem; height: 0.3rem"
                            src="../../assets/images/newIndex/refresh_2.png"
                            alt=""
                        />
                    </div>
                    <div class="md-example-item-s" @click="visibleBalance">
                        <md-icon :name="visibleShow" size="lg"></md-icon>
                    </div>
                </div>

                <div class="btn" v-if="isShow">
                    <md-button
                        type="primary"
                        class="withdraw primaryBtn"
                        size="small"
                        @click="withdrawDeposit"
                        id="C02"
                        >提现</md-button
                    >
                    <md-button
                        type="primary"
                        class="skype primaryBtn"
                        size="small"
                        @click="cellularPhone"
                        id="C03"
                        >充值</md-button
                    >
                    <md-button
                        type="primary"
                        class="detailinquire primaryBtn"
                        size="small"
                        @click="IumpDetailinquire"
                        id="D01"
                        >明细查询</md-button
                    >
                    <md-button
                        type="primary"
                        class="detailinquire primaryBtn"
                        size="small"
                        @click="bankManage"
                        id="E01"
                        >绑卡管理</md-button
                    >
                </div>

                <div class="tabTop" v-if="isllb">
                    <div class="onlyOne">专属权益</div>
                    <div class="zsqy">
                        <div
                            class="qyCard"
                            v-for="(item, idx) in zsqyList"
                            :key="idx"
                            @click="jumpToGet"
                            :id="idx > 8 ? 'F' + (idx + 1) : 'F0' + (idx + 1)"
                        >
                            <div class="cont">
                                <p class="title">{{ item.title }}</p>
                                <p class="text">名额有限，先到先得</p>
                                <p class="time">{{ item.time }}</p>
                                <div class="qyBtn">立即使用</div>
                            </div>
                        </div>
                        <div
                            class="isOpeneService"
                            v-if="llbOpen"
                            @click="goHfb"
                            id="I01"
                        >
                            <img
                                src="../../assets/images/banks/zsqy_icon.png"
                                alt=""
                            />
                            <div class="cont">
                                <p class="title">账户有余额 月月领流量</p>
                                <p>每达标30天可领5GB</p>
                            </div>
                            <div class="ywBtn">去查看</div>
                        </div>
                        <div
                            class="isOpeneService"
                            v-if="!llbOpen"
                            @click="goHfb"
                            id="I01"
                        >
                            <img
                                src="../../assets/images/banks/zsqy_icon.png"
                                alt=""
                            />
                            <div class="cont">
                                <p class="title">账户有余额 月月领流量</p>
                                <p>每达标30天可领5GB</p>
                            </div>
                            <div class="ywBtn">去开通</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottomCont" v-else>
                <div class="tips" @click="goOpenWallet">
                    您暂无电子账户，快去开通吧~
                </div>
                <!-- <div class="tips" @click="goOpenWallet">现在开通电子账户赠送话费，去开通吧 ></div> -->
            </div>
        </div>
        <div class="numBank" v-else>
            <div class="banklooseChange">
                <div class="bankImg">
                    <img src="../../assets/images/icbcBank.png" />
                </div>
                <span v-if="cirte">{{ status }}</span>
                <em
                    style="
                        color: black;
                        width: 3rem;
                        font-size: 0.23rem;
                        bottom: 1rem;
                    "
                    >账户ID:{{ accNbr }}</em
                >
            </div>
            <div class="balance moneyCont">
                <div class="tit">
                    <span>账户余额</span>
                    <div class="md-example-item-s" @click="visibleBalance">
                        <md-icon :name="visibleShow" size="lg"></md-icon>
                    </div>
                </div>
                <p class="num">
                    {{
                        visibleShow == "visible" ? balanceMoney : inbalanceMoney
                    }}
                </p>
                <div class="btnBox">
                    <div class="btn" @click="showTips">转账</div>
                    <div class="btn" @click="showTips">收付</div>
                    <div class="tips" v-if="isShowTips">
                        该功能暂未开放，请下载“数字人民币”APP体验
                    </div>
                </div>
                <img
                    class="icbcImg"
                    src="@/assets/images/banks/bankimages/icbc_icon.png"
                    alt=""
                />
            </div>
        </div>

        <!-- 查看完整卡号 -->
        <md-popup class="lookEle" v-model="showFullCard" position="center">
            <div class="pouContain">
                <div class="title">
                    <span>您的电子账户卡号</span>
                </div>
                <div class="tipss">{{ fullCardNum }}</div>
                <div class="btns">
                    <div class="setDefault" @click="copyFullCard()">复制</div>
                    <div class="deleteBank" @click="showFullCard = false">
                        确定
                    </div>
                </div>
            </div>
        </md-popup>
        <!-- 设置默认卡删除绑定的银行卡 -->
        <md-popup
            class="defaultAnddelete"
            v-model="defaultDeleteShow"
            position="bottom"
        >
            <div class="pouTitle">
                <div @click="closeDefaultDelet">
                    <img src="../../assets/images/banks/close.png" alt />
                </div>
                <span>管理银行&nbsp;&nbsp;&nbsp;{{ clickBank }}</span>
            </div>
            <div class="pouContain">
                <div class="setDefault" @click="setDefaultBank()">
                    设置默认卡
                </div>
                <div class="deleteBank" @click="deleteBank()">删除此银行卡</div>
            </div>
        </md-popup>
        <!-- 删除银行卡确定弹窗 -->
        <md-popup class="deletePop" v-model="deletePopShow" position="center">
            <div class="pouContain">
                <div class="title">
                    <img
                        @click="closeDelet"
                        src="../../assets/images/banks/close.png"
                        alt
                    />
                    <span>提醒</span>
                </div>
                <div class="tipss">确认删除此银行卡吗？</div>
                <div class="btns">
                    <div class="setDefault" id="B02" @click="cancelDelete()">
                        否
                    </div>
                    <div
                        class="deleteBank"
                        id="D03"
                        @click="confirmDelete()"
                        :disabled="delcard"
                    >
                        是
                    </div>
                </div>
            </div>
        </md-popup>
        <!-- 删除银行卡输入手机号 -->
        <md-dialog
            title="请输入短信验证码"
            :closable="false"
            :id="msgDialog.btns.id"
            v-model="msgDialog.open"
            :btns="msgDialog.btns"
            class="msgDialog"
        >
            <p class="msgTips">已发送至开户银行卡预留手机号</p>
            <md-codebox :mask="false" :maxlength="6" v-model="msgCode" system />
            <button class="errorTips" :disabled="attcode" @click="codeClick">
                {{ errorTips }}
            </button>
        </md-dialog>
        <!-- 默认卡弹窗 -->
        <md-popup
            class="defaultPopup"
            v-model="defalutPopupShow"
            position="bottom"
        >
            <md-popup-title-bar
                only-close
                large-radius
                title="提示"
                title-align="center"
                @cancel="defalutPopupShow = false"
            ></md-popup-title-bar>
            <!-- <div class="pouTitle">
        <div @click="closeDefaultPopup">
          <img src="../../assets/images/banks/close.png" alt />
        </div>
        <span>提示</span>
      </div> -->
            <div class="containPop">
                钱包账户必须绑定一张默认银行卡才可使用，且不可删除，如果您想更换默认卡可绑定其他银行卡后点击卡面进行设置
            </div>
        </md-popup>
    </div>
</template>

<script>
import * as store2 from '@/common/localstore';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';

export default {
    data() {
        return {
            bankcs: '',
            ispf: false,
            isllb: false,
            llbOpen: false,
            electronicBcImgUrl: '',
            balanceMoney: '',
            inbalanceMoney: '*****',
            showFullCard: false,
            current: 0,
            isOpen: '',
            accNbr: '',
            defaultAccFlg: '',
            orgCode: '',
            orgName: '',
            fullCardNum: '',
            isPopupShow: false, // 默认卡弹窗
            defaultDeleteShow: false, // 设置默认卡删除弹窗
            clickBank: '',
            msgDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        id: 'B04',
                        handler: () => {
                            this.msgDialog.open = false;
                            this.msgCode = '';
                        }
                    },
                    {
                        text: '下一步',
                        id: 'B03',
                        handler: () => {
                            this.commitDeleteBank();
                        }
                    }
                ]
            },
            errorTips: '60',
            sec: '61',
            deletePopShow: false,
            delcard: false,
            attcode: true,
            msgCode: '',
            myBanks: [],
            image: '',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_A02'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_B04'
                },
                {
                    id: 'B05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_B05'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_C02'
                },
                {
                    id: 'C03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_C03'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_D02'
                },
                {
                    id: 'D03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_D03'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_E01'
                },
                {
                    id: 'F01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F01'
                },
                {
                    id: 'F02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F02'
                },
                {
                    id: 'F03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F03'
                },
                {
                    id: 'F04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F04'
                },
                {
                    id: 'F05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F05'
                },
                {
                    id: 'F06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F06'
                },
                {
                    id: 'F07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F07'
                },
                {
                    id: 'F08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F08'
                },
                {
                    id: 'F09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F09'
                },
                {
                    id: 'F10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F10'
                },
                {
                    id: 'F11',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_F11'
                },
                {
                    id: 'G01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G01'
                },
                {
                    id: 'G02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G02'
                },
                {
                    id: 'G03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G03'
                },
                {
                    id: 'G04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G04'
                },
                {
                    id: 'G05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G05'
                },
                {
                    id: 'G06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G06'
                },
                {
                    id: 'G07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G07'
                },
                {
                    id: 'G08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G08'
                },
                {
                    id: 'G09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G09'
                },
                {
                    id: 'G10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G10'
                },
                {
                    id: 'G11',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_G11'
                },
                {
                    id: 'H01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H01'
                },
                {
                    id: 'H02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H02'
                },
                {
                    id: 'H03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H03'
                },
                {
                    id: 'H04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H04'
                },
                {
                    id: 'H05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H05'
                },
                {
                    id: 'H06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H06'
                },
                {
                    id: 'H07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H07'
                },
                {
                    id: 'H08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H08'
                },
                {
                    id: 'H09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H09'
                },
                {
                    id: 'H10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H10'
                },
                {
                    id: 'H11',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_H11'
                },
                {
                    id: 'I01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_I01'
                },
                {
                    id: 'I02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_I02'
                },
                {
                    id: 'I03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_MOVEWALLET_I03'
                }
            ],
            defalutPopupShow: false,
            mobile: '',
            visibleShow: 'visible',
            seleBankCode: '',
            seleBoundCardId: '',
            isShow: true,
            cirte: false,
            status: '',
            isShowTips: false,
            hasGetMoney: false,
            imgUrl: '',
            prevImg: '',
            nextImg: '',
            bankIdx: 0,
            zsqyList: [],
            qbListInfo: [],
            bgImg: '',
            isRefresh: false,
            cacheImgList: store2.default.get('bankImgList')
        };
    },
    created() {
        console.log(this.$route.query.orgName);
        this.accNbr = this.$route.query.accNbr;
        this.orgName = this.$route.query.orgName;
        this.fullCardNum = this.$route.query.fullAccNbr;
        this.mobile = store2.default.get('usrmob');
        this.getWalletList();
        if (this.orgName === '浦发银行') {
            this.isllb = true;
        }
        this.discharge();
        this.myBanks = this.qbListInfo;
        if(this.myBanks && this.myBanks.length > 0) {
          this.myBanks = this.myBanks.filter(data => (data.accsts == '01' || data.orgCode == 'SPDB'))
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);
        if (
            this.orgName === '工行银行数字货币'
            || this.orgName === '工行数货'
            || this.orgName === '工行数币'
        ) {
            this.isShow = false;
            this.getInfo();
        } else {
            this.isShow = true;
        }
        this.getZSQYList();
    },
    watch: {
        msgCode: {
            handler(val) {
                this.msgDialog.btns[1].disabled = !(val && val.length === 6);
            }
        },
        cacheImgList: {
            handler(val) {
                console.log('cacheImgList', val);
            },
            deep: true,
            immediate: true
        }
    },
    beforeRouteEnter(from, to, next) {
        if (to.name == 'allAccount') {
            sessionStorage.removeItem('swiperIndex');
        }
        next();
    },
    methods: {
        // 查询首页头部显示信息
        getTopShowInfo() {
            const changeList = [];
            this.$store.commit('LOADING', true);
            api.qrySmallChangeAcc({ refreshFlag: '1' })
                .then((res) => {
                    this.$store.commit('LOADING', false);
                    // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                    res.list.forEach((item) => {
                        if (
                            item.fullAccNbr
              && item.defaultAccFlg === '01'
              && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            changeList.unshift(item);
                        } else if (
                            item.fullAccNbr
              && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            changeList.push(item);
                        }
                    });
                    sessionStorage.setItem('qbBankListsInfos', JSON.stringify(changeList));
                    store2.default.set('qbBankListsInfo', changeList);
                })
                .catch((err) => {
                    this.$store.commit('LOADING', false);
                    store2.default.set('qbBankListsInfo', []);
                });
        },
        // 轮播图切换后效果
        afterChange() {
            this.bankIdx = this.$refs.swiper.getIndex();
            this.getIsOpenYW('swiper', this.bankIdx);

            if (this.orgName == '浦发银行') {
                this.isllb = true;
                console.log(99999);
            } else {
                this.isllb = false;
            }
        },
        beforeChange() {
            this.prevImg = '';
            this.nextImg = '';
        },
        onTabChange(item, index) {
            this.$refs.swiper_1.goto(index);
        },
        // 获取专属权益
        // 专属权益，10元话费
        getZSQYList() {
            const data = {
                atyIdList: ['ATY211206000004005'],
                userMobile: store2.default.get('usrmob')
            };
            api.ticketUseSts(data)
                .then((res) => {
                    res.prizeTjnInfo.forEach((item) => {
                        if (item.useSts === '0') {
                            const priAmt = item.priAmt.indexOf('.') > -1
                                ? item.priAmt.split('.')[0]
                                : item.priAmt;
                            const time = `${this.handelTime(
                                item.beginTime
                            )} 至 ${this.handelTime(item.endTime)}`;
                            this.zsqyList.push({
                                title: `${priAmt}元话费充值券`,
                                time
                            });
                        }
                    });
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        // 专属权益点击跳转
        jumpToGet() {
            window.location.href = 'https://wap.js.10086.cn/vw/WSCZYL';
        },
        handelTime(time) {
            if (time) {
                return `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(
                    6,
                    8
                )} ${time.slice(8, 10)}:${time.slice(10, 12)}:${time.slice(
                    12,
                    14
                )}`;
            }
            return '';
        },
        // 获取账户列表信息
        getWalletList() {
            // this.qbListInfo = store2.default.get("qbBankListsInfo");
            this.qbListInfo = JSON.parse(
                sessionStorage.getItem('qbBankListsInfos')
            ) || [];
            const imgList = store2.default.get('bankImgList') || [];
            if (this.qbListInfo.length < imgList.length) {
                imgList.forEach((item) => {
                    let isHad = false;
                    this.qbListInfo.forEach((part) => {
                        if (part.orgCode === item.orgcode) {
                            isHad = true;
                        }
                    });
                    if (!isHad) {
                        if (item.orgcode == 'BOCM') {
                            this.qbListInfo.unshift({
                                orgName: item.orgname,
                                image: item.image,
                                orgCode: item.orgcode,
                                accsts: '00'
                            });
                        } else {
                            this.qbListInfo.push({
                                orgName: item.orgname,
                                image: item.image,
                                orgCode: item.orgcode,
                                accsts: '00'
                            });
                        }
                    }
                });
                if(this.qbListInfo && this.qbListInfo.length > 0) {
                  this.qbListInfo = this.qbListInfo.filter(data => (data.accsts == '01' || data.orgCode == 'SPDB'))
                }
            }
            for (let i = 0; i < this.qbListInfo.length; i += 1) {
                if (
                    this.qbListInfo[i].fullAccNbr === this.fullCardNum
                    && this.fullCardNum
                ) {
                    this.getIsOpenYW(' ', i);
                    this.bankIdx = i;
                } else if (
                    this.qbListInfo[i].defaultAccFlg === '01'
                    && !this.fullCardNum
                ) {
                    this.getIsOpenYW(' ', i);
                    this.bankIdx = i;
                } else if (this.qbListInfo[i].defaultAccFlg === '00' && !this.fullCardNum) {
                    this.getIsOpenYW(' ', i);
                    this.bankIdx = i;
                }
            }
            if (JSON.parse(window.sessionStorage.getItem('swiperIndex'))) {
                this.bankIdx = JSON.parse(window.sessionStorage.getItem('swiperIndex'));
                // sessionStorage.removeItem("swiperIndex")
            }
        },
        // 获取对应账户的话费宝信息
        getIsOpenYW(data, i) {
            console.log(i);
            if (data == 'swiper') {
                window.sessionStorage.setItem('swiperIndex', JSON.stringify(i));
            }
            if (JSON.parse(window.sessionStorage.getItem('swiperIndex'))) {
                i = JSON.parse(window.sessionStorage.getItem('swiperIndex'));
            }
            // if(i==0&&this.isShow){
            //     this.isllb=true
            // }else {
            //     this.isllb=false
            // }
            const item = this.qbListInfo[i];
            this.bgImg = item.image;
            this.accNbr = item.accNbr;
            this.fullCardNum = item.fullAccNbr;
            this.orgCode = item.orgCode;
            this.balanceMoney = Number(item.balanceamt).toFixed(2);
            this.orgName = item.orgName;
            console.log(this.orgName);
            if (this.orgName == '交通银行') {
                this.bankcs = 'BOCM';
            } else {
                this.bankcs = ' ';
            }
            if (item.hfbStatus === '1') {
                this.isOpen = '00';
            } else {
                this.isOpen = '01';
            }
            if (this.qbListInfo.length < 2) {
                this.prevImg = '';
                this.nextImg = '';
            } else if (i === this.qbListInfo.length - 1) {
                this.nextImg = '';
                this.prevImg = this.qbListInfo[i - 1].image;
            } else if (i === 0) {
                this.prevImg = '';
                this.nextImg = this.qbListInfo[i + 1].image;
            } else {
                this.prevImg = this.qbListInfo[i - 1].image;
                this.nextImg = this.qbListInfo[i + 1].image;
            }
        },
        goHfb() {
            this.$router.push({
                name: 'traddicHome'
            });
        },
        getInfo() {
            api.digiccyApi
                .getInfo()
                .then((data) => {
                    if (!data.data.balance) {
                        this.balanceMoney = '0.00';
                    } else {
                        this.balanceMoney = data.data.balance;
                    }
                    this.accNbr = data.data.walletId;
                    if (data.data.wallteStatus == '3') {
                        this.cirte = true;
                        this.status = '已挂失';
                    } else if (data.data.wallteStatus == '4') {
                        this.cirte = true;
                        this.status = '已冻结';
                    } else if (data.data.wallteStatus == '5') {
                        this.cirte = true;
                        this.status = '已止付';
                    } else {
                        this.cirte = false;
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        // getMybanks() {
        //     api.looseChange
        //         .qryAllAcc({ mobile: this.mobile })
        //         .then((res) => {
        //             for (let i = 0; i < res.list.length; i += 1) {
        //                 if (
        //                     res.list[i].accNbr === this.accNbr
        //                     && res.list[i].fullAccNbr === this.fullCardNum
        //                 ) {
        //                     this.defaultAccFlg = res.list[i].defaultAccFlg;
        //                     this.orgCode = res.list[i].orgCode;
        //                     this.orgName = res.list[i].orgName;
        //                     this.image = res.list[i].image;
        //                     this.getBankInfo();
        //                     if (
        //                         this.orgName === '工行银行数字货币'
        //                         || this.orgName === '工行数货'
        //                         || this.orgName === '工行数币'
        //                     ) {
        //                         this.getInfo();
        //                     } else {
        //                         this.getBalance();
        //                     }
        //                 }
        //             }
        //         })
        //         .catch((err) => {
        //             this.hasGetMoney = true;
        //             this.$toast.info(err.msgInfo);
        //         });
        // },
        // 获取绑定卡列表
        getBankInfo() {
            api.banksApi
                .queryBankList({
                    entryTx: '',
                    mobile: this.mobile,
                    orgCode: this.orgCode
                })
                .then((res) => {
                    this.myBanks = res.boundCardInfoDTOS;
                    if(this.myBanks && this.myBanks.length > 0) {
                      this.myBanks = this.myBanks.filter(data => (data.accsts == '01' || data.orgCode == 'SPDB'))
                    }
                });
        },
        goBack() {
            this.$router.push('/index');
        },
        showBalance() {
            // this.balanceMoney = "";
            // this.getBalance();
        },
        visibleBalance() {
            // balanceMoney
            if (this.visibleShow == 'visible') {
                this.visibleShow = 'invisible';
                // this.balanceMoney = '*****';
            } else {
                this.visibleShow = 'visible';
                // if (this.orgName == '工行银行数字货币') {
                //     this.getInfo();
                // } else {
                //     this.getBalance();
                // }
            }
        },
        // 交易查询
        IumpDetailinquire() {
            this.$router.push({
                name: 'pockDetails',
                query: {
                    orgCode: this.orgCode
                }
            });
        },
        bankManage() {
            this.$router.push({
                name: 'myBanks',
                query: {
                    orgCode: this.orgCode
                }
            });
        },
        // 提现
        withdrawDeposit() {
            this.$router.push({
                name: 'changeWithdrawal',
                query: {
                    amounts: this.balanceMoney,
                    orgCode: this.orgCode
                }
            });
        },
        // 充值
        cellularPhone() {
            this.$router.push({
                name: 'recharges',
                query: {
                    orgCode: this.orgCode,
                    orgName: this.orgName
                }
            });
        },
        // 查看完整卡号
        lookFullCard() {
            this.showFullCard = true;
        },
        // 复制完整卡号
        copyFullCard() {
            const input = document.createElement('input');
            // 将input的值设置为需要复制的内容
            input.value = this.fullCardNum;
            // 添加input标签
            document.body.appendChild(input);
            // 选中input标签
            input.select();
            // 执行复制
            document.execCommand('copy');
            // 成功提示信息
            this.$toast.info('复制成功');
            // 移除input标签
            document.body.removeChild(input);
            this.showFullCard = false;
        },
        fullCardSubmit() {
            this.showFullCard = false;
        },
        // 查看余额
        getBalance() {
            api.queryBalance({
                entryTx: '',
                // 测试传，生产不传
                mobileNo: store2.default.get('usrmob'),
                orgCode: this.orgCode
            })
                .then((res) => {
                    this.hasGetMoney = true;
                    if (res.msgCd === 'BUS00000') {
                        this.balanceMoney = res.accountBalance;
                    } else {
                        this.$toast.info(res.msgInfo);
                    }
                })
                .catch((err) => {
                    this.hasGetMoney = true;
                    this.$toast.info(err.msgInfo);
                });
        },
        // 添加银行卡
        addBankInfo() {
            // this.$router.push('/banks/addBank');
            this.$router.push({
                name: 'addBank',
                query: {
                    orgCode: this.orgCode
                }
            });
        },
        closeDefaultCard() {
            this.isPopupShow = false;
        },
        closeDefaultDelet() {
            this.defaultDeleteShow = false;
        },
        setDefaultBank() {
            // 设置默认银行卡
            api.banksApi
                .setBank({
                    boundCardId: this.seleBoundCardId,
                    // entryTx: "",
                    // 测试传，生产不传
                    mobile: this.mobile,
                    orgCode: this.seleBankCode
                })
                .then(() => {
                    this.$toast.info('默认卡设置成功', 3000, true);
                    this.clickBank = this.activeClickBank;
                    this.boundCardId = this.activeBoundCardId;
                    this.bankCode = this.activeBankCode;
                    this.getBankInfo();
                    this.defaultDeleteShow = false;
                })
                .catch((data) => {
                    this.$toast.info(
                        data.msgInfo || '快看看，出错啦',
                        3000,
                        true
                    );
                });
        },
        deleteBank() {
            this.defaultDeleteShow = false;
            this.deletePopShow = true;
        },
        confirmDelete() {
            this.getVerificationCode();
        },
        closeDefaultPopup() {
            this.defalutPopupShow = false;
        },
        getVerificationCode() {
            this.timesContral();
            api.banksApi
                .queryBankMsm({
                    applyType: '02',
                    boundMobile: store2.default.get('usrmob')
                })
                .then(() => {
                    this.deletePopShow = false;
                    this.msgDialog.open = true;
                })
                .catch((data) => {
                    this.$toast.info(
                        data.msgInfo || '快看看，出错啦',
                        3000,
                        true
                    );
                });
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
        cancelDelete() {
            this.deletePopShow = false;
        },
        codeClick() {
            this.getVerificationCode();
        },
        closeDelet() {
            this.deletePopShow = false;
        },
        managingBankCards(defaultFlag, otem) {
            this.seleBankCode = otem.bankCode;
            this.seleBoundCardId = otem.boundCardId;
            if (defaultFlag == '00') {
                this.defalutPopupShow = true;
            } else {
                this.defaultDeleteShow = true;
            }
        },
        showTips() {
            this.isShowTips = true;
            setTimeout(() => {
                this.isShowTips = false;
            }, 3000);
        },
        // 提交删除银行卡
        commitDeleteBank() {
            this.msgDialog.btns[1].disabled = true;
            api.banksApi
                .deleteBank({
                    boundCardId: this.seleBoundCardId,
                    smsCode: this.msgCode
                })
                .then(() => {
                    this.getBankInfo();
                    this.msgDialog.open = false;
                    this.$toast.info('银行卡删除成功', 3000, true);
                })
                .catch((data) => {
                    this.$toast.info(
                        data.msgInfo || '快看看，出错啦',
                        3000,
                        true
                    );
                });
        },
        goOpenWallet() {
            this.$router.push({
                name: 'khEmpower',
                query: {
                    typeId: '10010',
                    orgCode: this.orgCode
                }
            });
        },
        refreshBalanceMoney() {
            // this.$toast.info('请稍等...');
            this.balanceMoney = '';
            this.isRefresh = true;
            api.qrySmallChangeAcc({ refreshFlag: '1' })
                .then((res) => {
                    this.isRefresh = false;
                    const changeList = [];
                    // 电子账户开通标识(00:未开户 01:开户正常 04:开户中)
                    res.list.forEach((item) => {
                        if (
                            item.fullAccNbr
                          && item.defaultAccFlg === '01'
                          && item.orgCode == 'BOCM'
                          && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            changeList.unshift(item);
                        } else if (
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
                    this.qbListInfo = changeList;
                    const imgList = store2.default.get('bankImgList');
                    if (this.qbListInfo.length < imgList.length) {
                        imgList.forEach((item) => {
                            let isHad = false;
                            this.qbListInfo.forEach((part) => {
                                if (part.orgCode === item.orgcode) {
                                    isHad = true;
                                }
                            });
                            if (!isHad) {
                                if (item.orgcode == 'BOCM') {
                                    this.qbListInfo.unshift({
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: '00'
                                    });
                                } else {
                                    this.qbListInfo.push({
                                        orgName: item.orgname,
                                        image: item.image,
                                        orgCode: item.orgcode,
                                        accsts: '00'
                                    });
                                }
                            }
                        });
                    }
                    if(this.qbListInfo && this.qbListInfo.length > 0) {
                      this.qbListInfo = this.qbListInfo.filter(data => (data.accsts == '01' || data.orgCode == 'SPDB'))
                    }
                    this.balanceMoney = Number(this.qbListInfo[this.bankIdx].balanceamt).toFixed(2);
                    store2.default.set('qbBankListsInfo', changeList);
                })
                .catch((err) => {
                    this.isRefresh = false;
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },

        // 流量宝开通资格校验
        discharge() {
            api.llb.discharge().then((res) => {
                console.log(res.code);
                if (res.code == '02') {
                    // 开通了
                    this.llbOpen = true;
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.moveWallets {
    width: 100vw;
    height: 100vh;
    background: #fff;
}
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
.bankCard {
    position: relative;
    .bg-blue {
        width: 100%;
        height: 650px;
        background: url("../../assets/images/banks/ceshi.png") no-repeat 10% 80%;
        background-size: 130% 130%;
        filter: blur(15px);
        backdrop-filter:blur(15px);
    }
    .topBankInfo {
        width: 100%;
        height: 650px;
        position: absolute;
        top: 0;
        left: 0;
        .set {
            float: right;
            font-size: 24px;
            color: #333333;
            padding: 10px 32px;
            font-weight: 400;
        }
        .showBanks {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 50px;
            .itemBank {
                width: 20px;
                height: 340px;
                .prevBank,
                .nextBank {
                    width: 20px;
                    height: 340px;
                    border-radius: 30px 0 0 30px;
                }
                .prevBank {
                    border-radius: 0 30px 30px 0;
                    background-position: top right;
                }
            }
            .swiper {
                // width: 610px;
                width: 100%;
                height: 400px;
                // margin-left: 30px;
                position: relative;
                /deep/.md-swiper-item {
                    // width: 610px !important;
                    // height: 400px;
                    // margin-right: 40px;
                }
                .swiperItem {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                // /deep/.md-swiper-item:first-of-type.bankActive{
                //     margin-left: 60px;
                // }
                img {
                    width: 610px;
                    height: 388px;
                    border-radius: 30px;
                }
                .deafult {
                    width: 89px;
                    height: 35px;
                    line-height: 35px;
                    display: inline-block;
                    background: #c5484d;
                    color: #fff;
                    border-radius: 12px 0px 0px 12px;
                    position: absolute;
                    top: 100px;
                    right: 74px;
                    font-size: 18px;
                    text-align: center;
                }
            }
        }
        .bankCode {
            margin: 20px 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 30px;
            font-weight: 500;
            color: #ffffff;
            .complete {
                width: 180px;
                height: 30px;
                background: #c5484d;
                border-radius: 12px;
                margin-left: 15px;
                font-size: 18px;
                line-height: 30px;
                text-align: center;
            }
            p:last-of-type {
                flex-grow: 1;
                font-size: 24px;
                text-align: right;
            }
        }
        .tips {
            font-size: 21px;
            margin: 20px 60px;
            color: #ffffff;
            white-space: nowrap;
        }
    }
    .bottomCont {
        position: relative;
        top: -80px;
        background: #fff;
        border-radius: 30px 30px 0 0;
        min-height: 200px;
        .tips {
            color: #0099ff;
            font-size: 21px;
            text-align: center;
            padding: 30px 0 20px 0;
            border-bottom: 1px dashed #666;
        }
    }
    .balance {
        height: 50px;
        line-height: 50px;
        padding: 30px 30px 20px;
        color: #3e3e3e;
        // border-bottom: 1px dashed #666;
        span {
            font-size: 0.28rem;
        }
        .md-example-item-s {
            float: right;
            color: #969696;
        }
    }
    .btn {
        overflow: hidden;
        display: flex;
        margin-top: 20px;
        padding: 0 30px;
        justify-content: space-between;
    }
    .tabTop {
        /deep/.md-tab-bar {
            padding: 0;
        }
        .onlyOne {
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 36px;
            color: #333333;
            padding: 38px 30px 20px;
        }
        .qyCard {
            width: 686px;
            height: 196px;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            background: url("../../assets/images/banks/zsqyBg.png") no-repeat;
            background-size: 100% 100%;
            margin: 10px auto;
            .cont {
                margin-left: 200px;
                padding-top: 40px;
                .title {
                    font-size: 36px;
                    color: #b16930;
                    font-weight: 600;
                }
                .text {
                    font-size: 24px;
                    color: #c9864d;
                    margin-top: 15px;
                }
                .time {
                    font-size: 20px;
                    color: #969494;
                    margin-top: 26px;
                }
                .qyBtn {
                    width: 120px;
                    height: 42px;
                    line-height: 42px;
                    color: #bd641e;
                    text-align: center;
                    background: #fff;
                    position: absolute;
                    top: 70px;
                    right: 40px;
                    font-size: 22px;
                    border-radius: 20px;
                }
            }
        }
        .isOpeneService {
            width: 686px;
            height: 120px;
            margin: 10px auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            & > img {
                width: 138px;
                height: 120px;
            }
            .cont {
                margin-left: 35px;
                flex-grow: 1;
                font-size: 24px;
                color: #999999;
                font-weight: 500;
                .title {
                    font-size: 30px;
                    color: #333333;
                    font-weight: 600;
                    margin-bottom: 20px;
                    font-family: PingFang-SC-Bold;
                }
            }
            .ywBtn {
                width: 120px;
                height: 45px;
                line-height: 45px;
                border-radius: 12px;
                font-size: 20px;
                background: #d64531;
                color: #fff;
                text-align: center;
                position: absolute;
                top: 49px;
                right: 40px;
            }
        }
    }

    .primaryBtn {
        width: 140px;
        height: 50px;
        background-color: #f9fafb;
        color: #2f86f6;
        // border: 1px solid #159BD5;
        font-size: 26px;
        text-align: center;
        border-radius: 0.05rem;
    }
}
.numBank {
    height: 100vh;
    background-image: linear-gradient(180deg, #c23736 0%, #f9f9f9 62%);
    padding: 0.5rem 0.3rem 0;
    .bankImg {
        width: 6.9rem;
        border-radius: 0.3rem;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .moneyCont {
        height: auto;
        width: 5.9rem;
        position: relative;
        background: #ffffff;
        border-radius: 0.3rem;
        margin-top: -0.9rem;
        padding: 0.5rem;
        font-size: 0.3rem;
        color: #333333;
        font-weight: 600;
        .tit {
            display: flex;
            span {
                margin-right: 0.2rem;
            }
        }
        .num {
            font-size: 0.64rem;
            font-weight: 900;
            margin-top: 0.4rem;
        }
        .btnBox {
            display: flex;
            justify-content: space-between;
            margin-top: 1.1rem;
            margin-bottom: 0.4rem;
            position: relative;
            .btn {
                width: 2.8rem;
                height: 1.04rem;
                border: 0.01rem solid #d8d8d8;
                border-radius: 0.16rem;
                text-align: center;
                line-height: 1.04rem;
            }
            .btn:nth-of-type(2) {
                background: #ee4635;
                color: #fff;
            }
            .tips {
                min-width: 6.4rem;
                height: 0.78rem;
                line-height: 0.78rem;
                font-size: 0.26rem;
                text-align: center;
                position: absolute;
                top: -1rem;
                left: -0.25rem;
                background: rgba(0, 0, 0, 0.8);
                color: #fff;
                border-radius: 0.39rem;
                font-weight: normal;
            }
        }
        .icbcImg {
            width: 2.9rem;
            height: 0.46rem;
        }
    }
}
.banklooseChange {
    position: relative;
    span {
        position: absolute;
        top: 0.5rem;
        right: 0;
        color: #000;
        width: 1.58rem;
        height: 0.57rem;
        line-height: 0.57rem;
        text-align: center;
        border-radius: 0.29rem 0 0 0.29rem;
        background-color: #d6d5d9;
        font-size: 0.28rem;
    }
    em {
        position: absolute;
        bottom: 60px;
        left: 40px;
        width: 2.55rem;
        height: 0.37rem;
        color: #fff;
        font-size: 0.26rem;
        font-style: normal;
    }
    p {
        position: absolute;
        bottom: 0.59rem;
        left: 2.9rem;
        width: 1.51rem;
        height: 0.4rem;
        line-height: 0.4rem;
        background-color: #d6d5d9;
        border-radius: 0.2rem;
        font-size: 0.2rem;
        text-align: center;
    }
}
.defaultBankCard {
    width: 100%;
    margin-bottom: 20px;
    i {
        position: absolute;
        width: 60px;
        height: 60px;
        margin-top: -2rem;
        margin-left: 40px;
    }
    .top {
        position: absolute;
        margin-top: -1.9rem;
        margin-left: 1.2rem;
        color: #fff;
        font-size: 0.34rem;
        span {
            min-width: 1.35rem;
            display: inline-block;
            margin-right: 0.15rem;
        }
    }
    p {
        position: absolute;
        margin-top: -90px;
        margin-left: 100px;
        color: #fff;
        font-size: 0.5rem;
    }
    img {
        position: absolute;
        right: 0;
        width: 1.56rem;
        height: 0.5rem;
        margin-top: -2.4rem;
        margin-right: 0.4rem;
    }
    strong {
        position: relative;
        top: -2.3rem;
        right: -5.7rem;
        display: inline-block;
        color: #fff;
        font-style: normal;
        font-size: 0.28rem;
        z-index: 4;
    }
}
.defaultCard {
    width: 156px;
    height: 50px;
    opacity: 1;
    border-radius: 0px 0px 0px 0px 12px;
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 50px;
    background-image: url(../../assets/images/banks/default.png);
    background-size: 100% 100%;
}
/deep/.defaultCard {
    .pouTitle {
        border-radius: 36px 36px 0px 0px;
        background: #ffffff;
        height: 106px;
        width: 100%;
        font-size: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
        span {
            font-weight: 500;
            text-align: left;
            color: #333333;
            margin-left: 275px;
            font-size: 30px;
            font-weight: 400;
        }
        img {
            margin-left: 30px;
            width: 36px;
            height: 36px;
        }
    }
    .containPop {
        height: 200px;
        opacity: 1;
        background: #ffffff;
        font-size: 28px;
        font-weight: 400;
        text-align: left;
        color: #333333;
        padding-top: 30px;
        padding-left: 77px;
        padding-right: 77px;
        border-top: 1px solid #d5d5d5;
    }
}
/deep/.defaultAnddelete {
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
        height: 265px;
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
// 短信验证码
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
                        margin-left: 200px;
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
/deep/.deletePop {
    .pouContain {
        background: #ffffff;
        width: 620px;
        padding: 30px 30px 50px 30px;
        border-radius: 15px;
        .title {
            font-size: 30px;
            display: flex;
            justify-content: left;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 30px;
            span {
                width: 100%;
                text-align: center;
                font-weight: 500;
                // text-align: left;
                color: #333333;
                // margin-left: 275px;
                font-size: 30px;
                font-weight: 400;
            }
            img {
                width: 36px;
                height: 36px;
            }
        }
        .tipss {
            height: 138px;
            opacity: 1;
            font-size: 28px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            line-height: 138px;
            border-bottom: 1px solid #e1e1e1;
        }
        .btns {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            .setDefault {
                width: 280px;
                height: 75px;
                opacity: 1;
                background: #0195ff;
                border-radius: 8px;
                text-align: center;
                line-height: 75px;
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
            }
            .deleteBank {
                width: 280px;
                height: 75px;
                opacity: 1;
                background: #0195ff;
                border-radius: 8px;
                text-align: center;
                line-height: 75px;
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
            }
        }
    }
}
.md-tab-bar {
    background: none;
}
/deep/.bxcs_tab .scroll-view-container .md-tab-bar-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // width:2.6rem!important;
}
/deep/.bxcs_tab .md-tab-bar-list .md-tab-bar-item {
    flex: inherit;
    margin: 0;
}
/deep/.md-tab-bar-item.is-active {
    color: #00aaee !important;
}
/deep/.md-tab-bar-ink {
    background: none;
    background-image: url(../../assets/images/tab_bg.png);
    background-repeat: no-repeat;
    background-size: 0.36rem 0.09rem;
    background-position: center;
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    height: 0.18rem;
    -webkit-transition: all 300ms;
    transition: all 300ms;
}
/deep/.defaultPopup {
    .pouTitle {
        border-radius: 36px 36px 0px 0px;
        background: #ffffff;
        height: 106px;
        width: 100%;
        font-size: 30px;
        display: flex;
        justify-content: left;
        align-items: center;
        span {
            font-weight: 500;
            text-align: left;
            color: #333333;
            margin-left: 275px;
            font-size: 30px;
            font-weight: 400;
        }
        img {
            margin-left: 30px;
            width: 36px;
            height: 36px;
        }
    }
    .containPop {
        height: 200px;
        opacity: 1;
        background: #ffffff;
        font-size: 28px;
        font-weight: 400;
        text-align: left;
        color: #333333;
        padding-top: 30px;
        padding-left: 77px;
        padding-right: 77px;
        border-top: 1px solid #d5d5d5;
    }
}
/deep/.lookEle {
    .pouContain {
        background: #ffffff;
        width: 620px;
        padding: 30px 30px 50px 30px;
        border-radius: 20px;
        .title {
            font-size: 30px;
            display: flex;
            justify-content: left;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 30px;
            span {
                display: inline-block;
                width: 100%;
                text-align: center;
                font-weight: 500;
                color: #333333;
                // margin-left: 25px;
                font-size: 30px;
            }
            img {
                width: 36px;
                height: 36px;
            }
        }
        .tipss {
            height: 138px;
            opacity: 1;
            font-size: 36px;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 138px;
            border-bottom: 1px solid #e1e1e1;
            font-size: 36px;
        }
        .btns {
            height: 65px;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            .setDefault {
                width: 280px;
                height: 75px;
                opacity: 1;
                background: #0195ff;
                border-radius: 8px;
                text-align: center;
                line-height: 75px;
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
            }
            .deleteBank {
                width: 280px;
                height: 75px;
                opacity: 1;
                background: #0195ff;
                border-radius: 8px;
                text-align: center;
                line-height: 75px;
                font-size: 32px;
                font-weight: 500;
                color: #ffffff;
            }
        }
    }
}

.tabbar {
    padding: 0;
    width: 3.2rem !important;
}
.tabbar /deep/.md-tab-bar-ink {
    width: 50% !important;
}
.tabbar /deep/.md-tab-bar-start,
.tabbar /deep/.md-tab-bar-end {
    display: none;
}
</style>
