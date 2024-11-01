<template>
  <div class="moveWallets">
    <!-- <div class="header">
      <span class="back" @click="goBack">
        <div class="md-example-item-s">
          <md-icon name="arrow-left" size="lg"></md-icon>
        </div>
      </span>
      <span class="movewallet">移动钱包</span>
      <span class="setting" @click="setIntoLooseAccount">设置</span>
    </div>-->
    <!-- 已开户状态 -->
    <div class="bankCard" v-if="isShow">
      <div class="banklooseChange">
        <img :src="image" alt style="width: 100%; margin-top: 20px" />
        <span v-if="defaultAccFlg == '01' && isShow">零钱账户</span>
        <span v-if="orgName == '工行银行数字货币' && cirte">{{ status }}</span>
        <em
          v-if="orgName == '工行银行数字货币'"
          style="color: black; width: 3rem; font-size: 0.23rem"
        >账户ID:{{ accNbr }}</em>
        <em v-else>{{ accNbr }}</em>
        <p v-if="orgName !== '工行银行数字货币'" @click="showFullCard = true" id="C01">查看完整卡号</p>
      </div>
      <div class="balance">
        <span>账户余额</span>
        <span style="margin-left: 60px; color: #474747">
          {{visibleShow == 'visible'? balanceMoney : inbalanceMoney}}
        </span>
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
        >提现</md-button>
        <md-button
          type="primary"
          class="skype primaryBtn"
          size="small"
          @click="cellularPhone"
          id="C03"
        >充值</md-button>
        <md-button
          type="primary"
          class="detailinquire primaryBtn"
          size="small"
          @click="IumpDetailinquire"
          id="D01"
        >交易查询</md-button>
      </div>

      <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-6" v-if="isShow">
        <!-- <md-tab-bar v-model="current" :items="items"></md-tab-bar> -->
        <div style="font-size:.3rem;margin:0.4rem 0">绑定卡管理</div>
        <!-- <div v-if="current == 0" style="font-size:24px">专属权益</div> -->
        <div>
          <ul class="defaultBankCard">
            <li
              v-for="(item, index) in myBanks"
              :key="index"
              @click="managingBankCards(item.defaultFlag,item)"
            >
              <div
                :style="{
                  backgroundImage: `url(../static/images/banks/bankimages/icon_${item.bankCode}_bg.png)`,

                  height: '2.38rem',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
                alt
              ></div>
              <i
                :style="{
                  backgroundImage: `url(../static/images/banks/bankimages/icon_${item.bankCode}.png)`,
                  width: '.6rem',
                  height: '.6rem',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
              ></i>
              <div class="top">
                <span>{{ item.bankName }}</span>
                <span>储蓄卡</span>
              </div>
              <p>{{ item.cardNo }}</p>
              <img v-if="item.defaultFlag == '00'" src="../../assets/images/banks/default.png" alt />
              <strong v-if="item.defaultFlag == '00'">默认卡</strong>
            </li>
          </ul>
          <md-button type="default" @click="addBankInfo">
            <img
              src="../../assets/images/add.png"
              alt
              style="margin-right: 15px; width: 0.5rem"
              id="D02"
            />
            添加银行卡
          </md-button>
        </div>
      </div>
    </div>
    <div class="numBank" v-else>
      <div class="banklooseChange">
        <div class="bankImg">
          <img src="../../assets/images/icbcBank.png" />
        </div>
        <span v-if="cirte">{{ status }}</span>
        <em style="color: black; width: 3rem; font-size: 0.23rem;bottom:1rem">账户ID:{{ accNbr }}</em>
      </div>
      <div class="balance moneyCont">
        <div class="tit">
          <span>账户余额</span>
          <div class="md-example-item-s" @click="visibleBalance">
            <md-icon :name="visibleShow" size="lg"></md-icon>
          </div>
        </div>
        <p class="num">{{visibleShow == 'visible'? balanceMoney : inbalanceMoney}}</p>
        <div class="btnBox">
          <div class="btn" @click="showTips">转账</div>
          <div class="btn" @click="showTips">收付</div>
          <div class="tips" v-if="isShowTips">该功能暂未开放，请下载“数字人民币”APP体验</div>
        </div>
        <img class="icbcImg" src="@/assets/images/banks/bankimages/icbc_icon.png" alt="">
      </div>

    </div>

    <!-- 查看完整卡号 -->
    <md-popup class="lookEle" v-model="showFullCard" position="center">
      <div class="pouContain">
        <div class="title">
          <span>您的电子账户卡号</span>
        </div>
        <div class="tipss">{{fullCardNum}}</div>
        <div class="btns">
          <div class="setDefault" @click="copyFullCard()">复制</div>
          <div class="deleteBank" @click="showFullCard = false">确定</div>
        </div>
      </div>
    </md-popup>
    <!-- 设置默认卡删除绑定的银行卡 -->
    <md-popup class="defaultAnddelete" v-model="defaultDeleteShow" position="bottom">
      <div class="pouTitle">
        <div @click="closeDefaultDelet">
          <img src="../../assets/images/banks/close.png" alt />
        </div>
        <span>管理银行&nbsp;&nbsp;&nbsp;{{ clickBank }}</span>
      </div>
      <div class="pouContain">
        <div class="setDefault" @click="setDefaultBank()">设置默认卡</div>
        <div class="deleteBank" @click="deleteBank()">删除此银行卡</div>
      </div>
    </md-popup>
    <!-- 删除银行卡确定弹窗 -->
    <md-popup class="deletePop" v-model="deletePopShow" position="center">
      <div class="pouContain">
        <div class="title">
          <img @click="closeDelet" src="../../assets/images/banks/close.png" alt />
          <span>提醒</span>
        </div>
        <div class="tipss">确认删除此银行卡吗？</div>
        <div class="btns">
          <div class="setDefault" id="B02" @click="cancelDelete()">否</div>
          <div class="deleteBank" id="D03" @click="confirmDelete()" :disabled="delcard">是</div>
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
      <button class="errorTips" :disabled="attcode" @click="codeClick">{{ errorTips }}</button>
    </md-dialog>
    <!-- 默认卡弹窗 -->
    <md-popup class="defaultPopup" v-model="defalutPopupShow" position="bottom">
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
      <div class="containPop">钱包账户必须绑定一张默认银行卡才可使用，且不可删除，如果您想更换默认卡可绑定其他银行卡后点击卡面进行设置</div>
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
            electronicBcImgUrl: '',
            balanceMoney: '',
            inbalanceMoney: '*****',
            showFullCard: false,
            current: 0,
            items: [
                // { name: 0, label: "专属权益", id: "A01" },
                { name: 1, label: '绑定卡管理', id: 'A02' }
            ],
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
            isRefresh: false
        };
    },
    created() {
        console.log(this.$route.query.orgName);
        this.accNbr = this.$route.query.accNbr;
        this.orgName = this.$route.query.orgName;
        this.fullCardNum = this.$route.query.fullAccNbr;
        this.getMybanks();
        this.mobile = store2.default.get('usrmob');
        // this.getBankInfo();
        // this.getBalance();
        initPageJs(this.$route.meta.pageName, this.touchArr);
        if (this.orgName === '工行银行数字货币' || this.orgName === '工行数货' || this.orgName === '工行数币') {
            this.isShow = false;
        } else {
            this.isShow = true;
        }
    },
    watch: {
        msgCode: {
            handler(val) {
                this.msgDialog.btns[1].disabled = !(val && val.length === 6);
            }
        }
    },
    methods: {
        // 轮播图切换后效果
        afterChange() {
            this.bankIdx = this.$refs.swiper.getIndex();
            this.getIsOpenYW(this.bankIdx);
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
            api.ticketUseSts(data).then((res) => {
                res.prizeTjnInfo.forEach((item) => {
                    if (item.useSts === '0') {
                        const priAmt = item.priAmt.indexOf('.') > -1 ? item.priAmt.split('.')[0] : item.priAmt;
                        const time = `${this.handelTime(item.beginTime)} 至 ${this.handelTime(item.endTime)}`;
                        this.zsqyList.push({
                            title: `${priAmt}元话费充值券`,
                            time
                        });
                    }
                });
            }).catch((err) => {
                this.$toast.info(err.msgInfo);
            });
        },
        // 专属权益点击跳转
        jumpToGet() {
            window.location.href = 'https://wap.js.10086.cn/vw/WSCZYL';
        },
        handelTime(time) {
            if (time) {
                return `${time.slice(0, 4)}-${time.slice(4, 6)}-${time.slice(6, 8)} ${time.slice(8, 10)}:${time.slice(10, 12)}:${time.slice(12, 14)}`;
            }
            return '';
        },
        // 获取账户列表信息
        getWalletList() {
            this.qbListInfo = store2.default.get('qbBankListsInfo');
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
                        this.qbListInfo.push({
                            orgName: item.orgname,
                            image: item.image,
                            orgCode: item.orgcode,
                            accsts: '00'
                        });
                    }
                });
            }
            for (let i = 0; i < this.qbListInfo.length; i += 1) {
                if (this.qbListInfo[i].fullAccNbr === this.fullCardNum && this.fullCardNum) {
                    this.getIsOpenYW(i);
                    this.bankIdx = i;
                } else if (this.qbListInfo[i].defaultAccFlg === '01' && !this.fullCardNum) {
                    this.getIsOpenYW(i);
                    this.bankIdx = i;
                }
            }
        },
        // 获取对应账户的话费宝信息
        getIsOpenYW(i) {
            console.log(1111111111111);
            console.log(i);
            const item = this.qbListInfo[i];
            this.bgImg = item.image;
            this.accNbr = item.accNbr;
            this.fullCardNum = item.fullAccNbr;
            this.orgCode = item.orgCode;
            this.balanceMoney = Number(item.balanceamt).toFixed(2);
            this.orgName = item.orgName;
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
                name: 'description'
            });
        },
        getInfo() {
            api.digiccyApi
                .getInfo()
                .then((data) => {
                    console.log(data);
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
                    console.log(err);
                    this.$toast.info(err.msgInfo);
                });
        },
        getMybanks() {
            api.looseChange.qryAllAcc({ mobile: this.mobile }).then((res) => {
                for (let i = 0; i < res.list.length; i += 1) {
                    if (res.list[i].accNbr === this.accNbr && res.list[i].fullAccNbr === this.fullCardNum) {
                        this.defaultAccFlg = res.list[i].defaultAccFlg;
                        this.orgCode = res.list[i].orgCode;
                        this.orgName = res.list[i].orgName;
                        this.image = res.list[i].image;
                        console.log(this.image);
                        this.getBankInfo();
                        if (this.orgName === '工行银行数字货币' || this.orgName === '工行数货' || this.orgName === '工行数币') {
                            this.getInfo();
                        } else {
                            this.getBalance();
                        }
                    }
                }
            }).catch((err) => {
                this.hasGetMoney = true;
                this.$toast.info(err.msgInfo);
            });
        },
        // 获取绑定卡列表
        getBankInfo() {
            api.banksApi
                .queryBankList({
                    entryTx: '',
                    mobile: this.mobile,
                    orgCode: this.orgCode
                })
                .then((res) => {
                    // console.log(res);
                    this.myBanks = res.boundCardInfoDTOS;
                    console.log(this.myBanks);
                });
        },
        goBack() {
            this.$router.push('/index');
        },
        showBalance() {
            console.log(456);
            // this.balanceMoney = "";
            // this.getBalance();
        },
        visibleBalance() {
            // balanceMoney
            console.log(this.balanceMoney);
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
            this.$router.push('/pocket/pockDetails');
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
                    orgCode: this.orgCode
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
                    this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
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
                    this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
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
            console.log(otem);
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
            api.banksApi.deleteBank({
                boundCardId: this.seleBoundCardId,
                smsCode: this.msgCode
            }).then(() => {
                this.getBankInfo();
                this.msgDialog.open = false;
                this.$toast.info('银行卡删除成功', 3000, true);
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
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
            api.qrySmallChangeAcc().then((res) => {
                this.isRefresh = false;
                const changeList = [];
                // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                res.list.forEach((item) => {
                    if (item.fullAccNbr && item.defaultAccFlg === '01' && item.orgCode !== 'ICBC-DIGICCY') {
                        changeList.unshift(item);
                    } else if (item.fullAccNbr && item.orgCode !== 'ICBC-DIGICCY') {
                        changeList.push(item);
                    }
                });
                store2.default.set('qbBankListsInfo', changeList);
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
                            this.qbListInfo.push({
                                orgName: item.orgname,
                                image: item.image,
                                orgCode: item.orgcode,
                                accsts: '00'
                            });
                        }
                    });
                }
                this.balanceMoney = Number(this.qbListInfo[this.bankIdx].balanceamt).toFixed(2);
            }).catch((err) => {
                this.isRefresh = false;
                console.log(err.msgInfo);
                // this.$toast.info(err.msgInfo);
            });
        }
    }
};
</script>

<style scoped lang="less">
.moveWallets {
  width: 100vw;
  height: 100vh;
  background-color: #f9fafb;
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
  background-color: #f9fafb;
  padding: 0 40px;
  .balance {
    height: 50px;
    line-height: 50px;
    padding: 30px 30px 20px;
    color: #3E3E3E;
    // border-bottom: 1px dashed #666;
    span {
      color: #969696;
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
  }
  .md-tab-bar {
    background-color: #f9fafb;
    margin: 40px 0;
  }
  .primaryBtn {
    flex: 1;
    margin: 0 20px;
    background-color: #f9fafb;
    color: #0195ff;
    font-size: 0.28rem;
    text-align: center;
    border-radius: 0.05rem;
  }
}
.numBank{
  height: 100vh;
  background-image: linear-gradient(180deg, #C23736 0%, #F9F9F9 62%);
  padding: 0.5rem 0.3rem 0;
  .bankImg{
    width: 6.9rem;
    border-radius: 0.3rem;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .moneyCont{
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
    .tit{
      display: flex;
      span{
        margin-right: 0.2rem;
      }
    }
    .num{
      font-size: 0.64rem;
      font-weight: 900;
      margin-top: 0.4rem;
    }
    .btnBox{
      display: flex;
      justify-content: space-between;
      margin-top: 1.1rem;
      margin-bottom: 0.4rem;
      position: relative;
      .btn{
        width: 2.8rem;
        height: 1.04rem;
        border: 0.01rem solid #D8D8D8;
        border-radius: 0.16rem;
        text-align: center;
        line-height: 1.04rem;
      }
      .btn:nth-of-type(2){
        background: #EE4635;
        color: #fff;
      }
      .tips{
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
    .icbcImg{
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
  color: #008bff !important;
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
.qyCard {
  // height: 1.5rem;
  box-shadow: 0px 0px 0.2rem 0px #ddd;
  border-radius: 0.2rem;
  margin-bottom: 0.3rem;
  padding: 0.3rem;
  display: flex;
  position: relative;
  img {
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 0.26rem;
  }
  .title {
    font-size: 0.3rem;
    color: #333333;
    font-weight: 600;
    line-height: 0.42rem;
  }
  .text {
    font-size: 0.24rem;
    color: #999999;
    margin-top: 0.1rem;
  }
  .time {
    font-size: 0.2rem;
    color: #aaa;
    margin-top: 0.31rem;
  }
  .btn {
    height: 0.61rem;
    padding: 0 0.4rem;
    background: #44b4f8;
    line-height: 0.61rem;
    text-align: center;
    color: #fff;
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.26rem;
    font-weight: 600;
    border-radius: 0.31rem;
  }
}
</style>
