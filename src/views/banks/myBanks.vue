<template>
   <div class="contains">
       <div class="mainContain">
            <div class="electronicAccount" >
            <div class="electronicTitle">我的电子账户</div>
            <div class="electronicImg" :style="{backgroundImage:`url(../static/images/banks/electronicImg/icon_${electronicBcImgUrl}_bg.png)`, backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}" id="A02" @click= 'elePopShow = true'>
                <div class="bankName">
                    <div class="name">
                         <img :src="`../static/images/banks/electronicImg/icon_${electronicImgUrl}.png`" alt="">
                         <span>{{organizationName}}</span>
                    </div>
                    <div class="kind" v-if="orgCode == 'BOCM'">Ⅱ类</div>
                    <div class="kind" v-else>Ⅲ类</div>
                </div>
                <div class="bankNub">{{`${electronicAccount.substr(0, 4) + '******' + electronicAccount.substr(-4)}`}}</div>
            </div>
            </div>
            <div class="bindingCard">
                <div class="bindingTitle">绑定卡</div>
                 <div class="defaultBindingImg" :style="{backgroundImage: `url(../static/images/banks/bankimages/icon_${bankCode}_bg.png)`, backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}" @click= "defaultCardPoupo">
                    <div class="bankName">
                        <div class="name">
                              <img :src="`../static/images/banks/bankimages/icon_${bankCode}.png`" alt="">
                             <span>{{defaultBankName}}</span>
                        </div>
                        <div class="defaultCard">默认卡</div>
                    </div>
                   <div class="bankNub">{{defaultBankNub}}</div>
                </div>
                <div class="bindingImg" v-for="(item, index) in bankData" :key="index" :style="{backgroundImage: `url(../static/images/banks/bankimages/icon_${item.bankCode}_bg.png)`,width:'6.86rem', height:'1.8rem', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}" @click= 'changeBankStatus(item)'>
                    <div class="name">
                        <img :src="`../static/images/banks/bankimages/icon_${item.bankCode}.png`" alt="">
                        <span>{{item.bankName}}</span>
                    </div>
                    <div class="bankNub">{{item.cardNo}}</div>
                </div>
            </div>
            <div v-if="orgCode != 'BOCM'" class="addBank" id="A05" @click="addBank">
                <!-- <img v-if="electronicImgUrl == 'BOCM'" src="../../assets/images/banks/icon_change.png" alt="">
                <img v-else src="../../assets/images/banks/addBank.png" alt="">
                <span v-if="electronicImgUrl == 'BOCM'">更换绑定卡</span>
                <span v-else>添加银行卡</span> -->
                <img src="../../assets/images/banks/icon_change.png" alt="">
                <span v-if="orgCode == 'SPDB' ">更换绑定卡</span>
                <span v-if="orgCode == 'CMB' ">添加绑定卡</span>
            </div>
       </div>
       <!-- 查看电子银行卡弹窗 -->
        <md-popup class="lookEle" v-model="elePopShow" position="center">
            <div class="pouContain">
                <div class="title">
                    <!-- <img @click="elePopShow = false" src="../../assets/images/banks/close.png" alt=""> -->
                    <span>您的电子账户卡号</span>
                </div>
                <div class="tipss">{{electronicAccount}}</div>
                <div class="btns">
                    <div class="setDefault" id="A01" @click="copyEle()">复制</div>
                    <div class="deleteBank" @click="elePopShow = false">确定</div>
                </div>
            </div>
        </md-popup>
       <!-- 默认卡弹窗 -->
        <md-popup class="defaultCard" v-model="isPopupShow" position="bottom">
            <md-popup-title-bar
                only-close
                large-radius
                title="提示"
                title-align="center"
                @cancel="isPopupShow = false"
            ></md-popup-title-bar>
            <!-- <div class="pouTitle">
                <img @click="closeDefaultCard" src="../../assets/images/banks/close.png" alt="">
                <span>提示</span>
            </div> -->
            <div class="containPop">
                钱包账户必须绑定一张默认银行卡才可使用，且不可删除。其中招商银行电子账户您想更换默认卡可绑定其他银行卡后点击卡面进行设置；浦发或交通银行可点击页面更换绑定卡按钮完成操作
            </div>
        </md-popup>
        <!-- 设置默认卡删除绑定的银行卡 -->
        <md-popup class="defaultAnddelete" v-model="defaultDeleteShow" position="bottom">
            <div class="pouTitle">
                <img @click="closeDefaultDelet" src="../../assets/images/banks/close.png" alt="">
                <span>管理银行&nbsp;&nbsp;&nbsp;{{clickBank}}</span>
            </div>
            <div class="pouContain">
                <div class="setDefault" id="A03" @click="setDefaultBank()">设置默认卡</div>
                <div class="deleteBank" id="A04" @click="deleteBank()">删除此银行卡</div>
            </div>
        </md-popup>
        <!-- 删除银行卡确定弹窗 -->
        <md-popup class="deletePop" v-model="deletePopShow" position="center">
            <div class="pouContain">
                <div class="title">
                    <img @click="closeDelet" src="../../assets/images/banks/close.png" alt="">
                    <span>提醒</span>
                </div>
                <div class="tipss">确认删除此银行卡吗？</div>
                <div class="btns">
                    <div class="setDefault" id="B02" @click="cancelDelete()">否</div>
                    <div class="deleteBank" id="B01" @click="confirmDelete()" :disabled="delcard">是</div>
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
            <md-codebox
                :mask="false"
                :maxlength="6"
                v-model="msgCode"
                system
                />
            <button class="errorTips" :disabled="attcode" @click="codeClick">{{errorTips}}</button>
        </md-dialog>

        <md-popup v-model="showPop" :mask-closable="false">
            <div class="gotoSetLoose">
                <div class="loseTitle">温馨提示</div>
                <div class="cont">
                    <p>{{tipsText}}</p>
                    <div class="btnBox">
                        <md-button type="default" size="small" @click="showPop = false">知道啦</md-button>
                    </div>
                </div>
            </div>
        </md-popup>

   </div>
</template>

<script>
import Header from '@/components/header';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import { Dialog } from 'mand-mobile'
export default {
    name: 'myBanks',
    components: {
        Header,
        Dialog
    },
    data() {
        return {
            organizationCode: '',
            electronicImgUrl: '',
            electronicBcImgUrl: '',
            defaultBcImgUrl: '',
            imageUrl: '',
            electronicAccount: '',
            organizationName: '', // 电子账户名称
            defaultBankNub: '',
            defaultBankName: '',
            bankData: [],
            isPopupShow: false, // 默认卡弹窗
            defaultDeleteShow: false, // 设置默认卡删除弹窗
            boundCardId: '',
            boundCardId_new: '',
            clickBank: '',
            bankCode: '',
            deletePopShow: false,
            elePopShow: false,
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
            msgCode: '',
            codesendTips: store2.default.get('usrmob').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            errorTips: '60',
            sec: 61,
            attcode: true,
            delcard: false,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_MYBANKS_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_MYBANKS_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLET_MYBANKS_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_WALLET_MYBANKS_A04'
                },
                {
                    id: 'A05',
                    touchCode: 'WAP_T_WALLET_MYBANKS_A05'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_WALLET_MYBANKS_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_WALLET_MYBANKS_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_WALLET_MYBANKS_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_WALLET_MYBANKS_B04'
                }
            ],
            orgCode: '',
            showPop: false,
            tipsText: ''
        };
    },
    watch: {
        msgCode: {
            handler(val) {
                this.msgDialog.btns[1].disabled = !(val && val.length === 6);
            }
        }
    },
    mounted() {
        this.getElectronicBank();
        this.queryBankList();
    },
    created() {
        console.log(this.$route.meta.pageName);
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.orgCode = this.$route.query.orgCode || '';
    },
    methods: {
        seeElectroniCard() {
            this.basicDialog.open = true;
        },
        copyEle() {
            this.$copyText(this.electronicAccount).then(() => {
                this.$toast.info('复制成功', 3000, true);
            }).catch(() => {
                this.$toast.info('复制失败', 3000, true);
            });
        },
        getElectronicBank() { // 获取电子账户
            api.banksApi.queryElectronic({ orgCode: this.orgCode }).then((data) => {
                this.electronicAccount = data.accountNo;
                this.organizationName = data.organizationName;
                this.electronicImgUrl = data.organizationCode;
                this.electronicBcImgUrl = data.organizationCode;
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '快看看，出错啦啦啦啦啦啦', 3000, true);
            });
        },
        // 是否具备更换绑卡条件查询接口
        bandCardquery() {
            api.bandCardquery({
                mobileNo: store2.default.get('usrmob'),
                orgCode: 'SPDB'
            })
            .then(data => {
                // 0-是 1-否
                if(data.changeFlag == '1') {
                    this.showPop = true;
                    this.tipsText = '您的手机号24小时内只可发起一次换卡操作哦，请稍后再试~'
                } else if(data.changeFlag == '0') {
                    this.$router.push({
                        name: 'addBank',
                        query: {
                            orgCode: 'SPDB',
                            applyType: '03'
                        }
                    })
                }
            })
            .catch(res => {
                this.showPop = true;
                this.tipsText = res.msgInfo
            })
        },
        queryAllbank() {
            api.banksApi.queryBankList().then((data) => {
                let allAccount = data.boundCardInfoDTOS
                if(allAccount && allAccount.length > 1) {
                    this.showPop = true;
                    this.tipsText = '您的手机号已绑定多张银行卡，请先解绑至一张卡后再进行更换绑定卡操作。'
                } else if(!allAccount || allAccount.length <= 1) {
                    this.bandCardquery()
                }
            }).catch((data) => {
                this.showPop = true;
                this.tipsText = data.msgInfo
            });
        },
        queryBankList() { // 获取绑定卡列表
            api.banksApi.queryBankList({ orgCode: this.orgCode }).then((data) => {
                console.log('全部卡', data.boundCardInfoDTOS);
                store2.default.set('orgcode', data.organizationCode);
                const tempPayways = [];
                if (data.boundCardInfoDTOS && data.boundCardInfoDTOS.length > 0) {
                    data.boundCardInfoDTOS.forEach((i) => {
                        if(i.bankCode == "BOCM") {
                            this.boundCardId_new = i.boundCardId
                        }
                        if (i.defaultFlag === '00') {
                            this.defaultBankNub = i.cardNo;
                            this.defaultBankName = i.bankName;
                            this.bankCode = i.bankCode;
                        } else {
                            tempPayways.push({
                                bankName: i.bankName,
                                cardNo: i.cardNo,
                                boundCardId: i.boundCardId,
                                bankCode: i.bankCode
                            });
                        }
                    });
                }
                this.bankData = tempPayways;
                console.log('其他卡', tempPayways);
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '查询失败，请稍后再试', 3000, true);
            });
        },
        changeBankStatus(e) {
            this.defaultDeleteShow = true;
            // this.activeClickBank = `${e.bankName} (尾号${e.cardNo.substring((e.cardNo.length - 4), e.cardNo.length)})`;
            // this.activeBoundCardId = e.boundCardId;
            // this.activeBankCode = e.bankCode;
            this.clickBank = `${e.bankName} (尾号${e.cardNo.substring((e.cardNo.length - 4), e.cardNo.length)})`;
            this.boundCardId = e.boundCardId;
            // this.bankCode = e.bankCode;
        },
        defaultCardPoupo() {
            this.isPopupShow = true;
        },
        closeDefaultCard() {
            this.isPopupShow = false;
        },
        closeDefaultDelet() {
            this.defaultDeleteShow = false;
        },
        setDefaultBank() { // 设置默认银行卡
            api.banksApi.setBank({
                boundCardId: this.boundCardId
                // boundCardId: this.activeBoundCardId
            }).then(() => {
                this.$toast.info('默认卡设置成功', 3000, true);
                this.clickBank = this.activeClickBank;
                this.boundCardId = this.activeBoundCardId;
                this.bankCode = this.activeBankCode;
                this.queryBankList();
                this.defaultDeleteShow = false;
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
            });
        },
        deleteBank() {
            this.defaultDeleteShow = false;
            this.deletePopShow = true;
        },
        cancelDelete() {
            this.deletePopShow = false;
        },
        confirmDelete() {
            this.getVerificationCode();
        },
        closeDelet() {
            this.deletePopShow = false;
        },
        getVerificationCode() {
            this.timesContral();
            api.banksApi.queryBankMsm({
                applyType: '02',
                boundMobile: store2.default.get('usrmob')
            }).then(() => {
                this.deletePopShow = false;
                this.msgDialog.open = true;
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
            });
        },
        codeClick() {
            this.getVerificationCode();
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
        // 提交删除银行卡
        commitDeleteBank() {
            this.msgDialog.btns[1].disabled = true;
            api.banksApi.deleteBank({
                boundCardId: this.boundCardId,
                smsCode: this.msgCode
            }).then(() => {
                this.queryBankList();
                this.msgDialog.open = false;
                this.$toast.info('银行卡删除成功', 3000, true);
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
            });
        },
        addBank() {
            if(this.electronicImgUrl == 'BOCM') {
                this.confirm()
            } else if(this.orgCode == 'SPDB') {
                // this.$router.push({
                //     name: 'addBank',
                //     query: {
                //         orgCode: store2.default.get('orgcode')
                //     }
                // });
                this.queryAllbank()
            } else if(this.orgCode == 'CMB') {
                this.$router.push({
                    name: 'addBank',
                    query: {
                        orgCode: this.orgCode
                    }
                });
            }
        },
        confirm() {
            Dialog.confirm({
                title: '提醒',
                content: '确定是否需要更换绑定卡？',
                confirmText: '确认',
                onConfirm: () => this.$router.push({
                    name: 'addBank',
                    query: {
                        orgCode: store2.default.get('orgcode'),
                        boundCardId_new: this.boundCardId_new
                    }
                })
            })
        },
    }
};
</script>
<style lang="less" scoped>
    .contains {
        .mainContain {
            padding-left: 30px;
            padding-right: 30px;
            .electronicAccount {
                // height: 325px;
                .electronicTitle {
                    height: 95px;
                    opacity: 1;
                    font-size: 32px;
                    font-weight: 500;
                    text-align: left;
                    color: #333333;
                    line-height: 95px;
                }
                .electronicImg {
                    width: 686px;
                    height: 180px;
                    .bankName {
                        padding: 43px 33px 0 33px;
                        display: flex;
                        justify-content: space-between;
                        .name {
                            font-size: 30px;
                            display: flex;
                            justify-content:center;
                            align-items: center;
                            img{
                                // z-index: 9999;
                                width: 35px;
                                height: 35px;
                                margin-right: 20px;
                            }
                            span {
                                font-weight: 500;
                                text-align: left;
                                color: #ffffff;
                            }

                        }
                        .kind {
                            font-size: 28px;
                            font-weight: 500;
                            color: #ffffff;
                        }
                    }
                    .bankNub {
                        height: 70px;
                        margin-top: 10px;
                        margin-left: 80px;
                        font-size: 36px;
                        font-weight: 400;
                        color: #ffffff;
                    }
                }
            }
            .bindingCard {
                .bindingTitle {
                    height: 95px;
                    line-height: 95px;
                    font-size: 32px;
                    font-weight: 500;
                    text-align: left;
                    color: #333333;
                }
                .defaultBindingImg {
                    width: 686px;
                    height: 180px;
                    .bankName {
                        display: flex;
                        justify-content: space-between;
                        .defaultCard {
                            width: 100px;
                            height: 50px;
                            opacity: 1;
                            border-radius: 0px 0px 0px 0px 12px;
                            font-size: 26px;
                            font-weight: 500;
                            padding-left: 56px;
                            color: #ffffff;
                            line-height: 50px;
                            background-image: url(../../assets/images/banks/default.png);
                            background-size: 100% 100%;
                        }
                        .name {
                            padding: 43px 33px 0 33px;
                            width: 400px;
                            font-size: 30px;
                            display: flex;
                            justify-content:left;
                            align-items: center;
                            img{
                                width: 35px;
                                height: 35px;
                                margin-right: 20px;
                            }
                            span {
                                font-weight: 500;
                                text-align: left;
                                color: #ffffff;
                            }
                        }
                    }
                    .bankNub {
                        height: 70px;
                        margin-top: 10px;
                        margin-left: 80px;
                        font-size: 36px;
                        font-weight: 400;
                        color: #ffffff;
                    }
                }
                .bindingImg {
                    margin-top: 20px;
                    position: relative;
                    .name {
                        position: absolute;
                        top: 40px;
                        left: 30px;
                        width: 400px;
                        font-size: 30px;
                        display: flex;
                        justify-content:left;
                        align-items: center;
                        img{
                            width: 35px;
                            height: 35px;
                            margin-right: 20px;
                        }
                        span {
                            font-weight: 500;
                            text-align: left;
                            color: #ffffff;
                        }
                    }
                    .bankNub {
                        position: absolute;
                        top:80px;
                        height: 70px;
                        width: 100%;
                        padding-left: 86px;
                        line-height: 70px;
                        font-size: 36px;
                        font-weight: 400;
                        color: #ffffff;
                    }
                }
            }
            .addBank {
                margin-top: 30px;
                width: 6.86rem;
                height: 76px;
                opacity: 1;
                border: 2px solid #0195ff;
                border-radius: 14px;
                font-size: 34px;
                display: flex;
                justify-content:center;
                align-items: center;
                img{
                    width: 36px;
                    height: 36px;
                    margin-right: 20px;
                }
                span {
                    font-weight: 500;
                    text-align: left;
                    color: #0195ff;
                    font-size: 30px;
                }
            }
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
                justify-content:left;
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
                img{
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
    /deep/.defaultCard {
        .pouTitle {
            border-radius: 36px 36px 0px 0px;
            background: #ffffff;
            height: 106px;
            width: 100%;
            font-size: 30px;
            display: flex;
            justify-content:left;
            align-items: center;
            span {
                font-weight: 500;
                text-align: left;
                color: #333333;
                margin-left: 275px;
                font-size: 30px;
                font-weight: 400;
            }
            img{
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
            justify-content:left;
            align-items: center;
            border: 1px solid #d5d5d5;
            img{
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
                border: 1px solid #D5D5D5;
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
    /deep/.deletePop {
        .pouContain {
            background: #ffffff;
            width: 620px;
            padding: 30px 30px 50px 30px;
            border-radius: 15px;
            .title {
                font-size: 30px;
                display: flex;
                justify-content:left;
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
                img{
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
    // 短信验证码
.msgDialog{
    /deep/ .md-popup{
        .md-popup-box{
            .md-dialog-content{
                width: 640px;
                border-radius: 20px;
                .md-dialog-body{
                    color: #13252E;
                    font-size: 30px;
                    text-align: center;
                    padding: 0;
                    min-height: 430px;
                    display: unset;
                    .md-dialog-title{
                        font-size: 32px;
                        color: #333;
                        font-weight: 600;
                        margin: 60px 0 20px;
                    }
                    .msgTips{
                        font-size: 26px;
                        color: #999;
                    }
                    .errorTips {
                            background: #ffffff;
                            width: 200px;
                            margin-left: 200px;
                            margin-bottom: 20px;
                    }
                    .md-codebox-wrapper{
                        margin: 40px 0 30px;
                        .md-codebox{
                            .md-codebox-box:last-child{
                                margin-right: 0;
                            }
                            .md-codebox-box{
                                &:before{
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
                    .errorTips{
                        color: #0195ff;
                        font-size: 24px;
                        word-break: break-all;
                        height: 50px;
                    }
                }
                .md-dialog-actions{
                    .md-dialog-btn{
                        color: #0195ff;
                        width: 2.8rem;
                        opacity: 1;
                        background: #ffffff;
                        border: 0.02rem solid #0195ff;
                        border-radius: 0.08rem;
                        font-weight: 500;
                        height: .75rem;
                        margin-top: .2rem;
                        margin-right: 30px;
                        margin-left: 30px;
                        // &.disabled{
                        //     color: #0195ff!important;
                        // }
                    }
                    .md-dialog-btn:last-child{
                        // color: #0195ff;
                        width: 200px;
                        height: .75rem;
                        opacity: 1;
                        background: #0195ff;
                        border-radius: 8px;
                        margin-top: .2rem;
                        margin-bottom: 40px;
                        margin-right: 30px;
                        color: #ffffff;
                    }
                }
            }
        }
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
        text-align: left;
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
</style>
