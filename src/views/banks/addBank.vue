<template>
   <div class="contains">
        <div class="mainContain">
            <div v-if="orgCode == 'BOCM'" class="title">更换绑定银行卡</div>
            <div v-else class="title">添加绑定银行卡</div>
            <div class="add">请添加**{{manname}}的银行卡号</div>
            <div class="manname">
                <span>{{bankName}}</span>
                <img v-show="!baklogo" src="../../assets/images/banks/focus.png" alt="">
                <img v-show="baklogo" :src="`../static/images/banks/bankimages/icon_${bankImgUrl}.png`" alt="">
            </div>
            <ValidationObserver ref="form" v-slot="{ invalid }">
                <div class="infoBox">
                    <div class="addbankInput">
                        <InputWithValidation
                            ref="bankNo"
                            name="卡号"
                            type="bankCard"
                            placeholder="请填写一张借记卡(不支持信用卡)"
                            rules="required|bankNo"
                            clearable
                            v-model="formData.bankNo"
                            maxlength="21">
                        </InputWithValidation>
                        <div class="pic">
                            <div v-if="showJiaobiao">
                                <div class="back" v-if="showIcon" @click="showIcon = false,showPopup = true">
                                    <img src="../../assets/images/openBanks/right.png" alt="">
                                </div>
                                <div class="down" v-if="!showIcon" @click="showIcon = true,showPopup = false">
                                    <img src="../../assets/images/openBanks/down.png" alt="">
                                </div>
                            </div>
                            <div class="xiangji" @click="showTankuang = true">
                                <img src="../../assets/images/openBanks/xiangji.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="checkSupportBank" v-show="standBank">
                        <span>暂不支持此银行，请更换银行卡，点击</span><span class="seeBank" @click="seeBank()">查看支持银行</span>
                    </div>
                    <div class="queryBankType" v-show="xingyongcard">
                        <span>暂不支持信用卡绑定，请更换一张储蓄卡</span>
                    </div>
                    <div class="queryBankType" v-show="yufucard">
                        <span>暂不支持预付卡绑定，请更换一张储蓄卡</span>
                    </div>
                    <div class="reservedPhone">预留手机号码</div>
                    <InputWithValidation
                        type="phone"
                        title=""
                        placeholder="银行预留手机号码"
                        name="手机号"
                        rules="required|phoneNo"
                        clearable
                        v-model="formData.userMbl"
                        ref="userMbl"
                        >
                    </InputWithValidation>
                </div>
                <div class="msg">我们会依法保护您的信息安全</div>
                <md-button class="wapBtn" id="A02" ref="button" :type="invalid ? 'disabled' : 'default'" @click="submitInfo()">发送验证码</md-button>
            </ValidationObserver>
        </div>
        <md-dialog
            title="请输入短信验证码"
            :closable="false"
            v-model="msgDialog.open"
            :btns="msgDialog.btns"
            class="msgDialog"
            >
            <p class="errorTipss">已发送至手机{{codesendTips}}</p>
            <md-codebox
                :mask="false"
                :maxlength="6"
                v-model="msgCode"
                system
                />
            <button class="errorTips" :disabled="attcode" @click="codeClick">{{errorTips}}</button>
        </md-dialog>
        <md-popup v-model="isHadPay">
            <div class="gotoSetLoose">
            <div class="loseTitle">温馨提示</div>
            <div class="cont">
                <p>请求处理中，实际结果为银行返回为准</p>
                <div class="btnBox">
                <md-button class="wapBtn" type="default"  @click="goBack">确定</md-button>
                </div>
            </div>
            </div>
        </md-popup>
        <div class="loading-toast" v-if="loading">
            <img src="@/assets/images/loading-toast.gif" alt="" />
        </div>
        <!-- 弹框 -->
        <div class="tankuang" v-if="showTankuang">
            <div class="pic_bg" v-if="!submitError">
                <div class="cha" @click="reSubmit(),showTankuang = false"></div>
                <div class="zxj_icon" v-if="imageList['reader0'].length == 0">
                    <md-image-reader
                        name="reader0"
                        @select="onReaderSelect"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        :mime="mimes"
                    ></md-image-reader>
                </div>
                <div class="bankPic" v-for="(item,index) in imageList['reader0']" :key="index" 
                    :style="{
                    backgroundImage: `url(${item})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'}">
                </div>
            </div>
            <!-- 上传失败弹框 -->
            <div 
                v-if="submitError"
                class="pic_bg" 
                :style="{
                backgroundImage: `url(${updateFail})`,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'}">
                <div class="reload" @click="reSubmit()"></div>
                <div class="zxj_icon" v-if="imageList['reader0'].length == 0">
                    <md-image-reader
                        name="reader0"
                        @select="onReaderSelect"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        :mime="mimes"
                    ></md-image-reader>
                </div>
                <div class="bankPic" v-for="(item,index) in imageList['reader0']" :key="index" 
                    :style="{
                    backgroundImage: `url(${item})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'}">
                </div>
            </div>
            <button type="button" class="submit" :class="submitPic ? 'actcodebtn' : ''"  @click="submit" >确认提交</button>
        </div>
        <!-- 弹出层 -->
        <md-popup v-model="showPopup" :hasMask="true" position="bottom" :maskClosable="false">
            <div class="addBanks">
                <div class="title">
                    <div class="tianjia" @click="showPopup = false,showIcon = true"><img src="../../assets/images/openBanks/icon_tianjia.png" alt=""></div>
                    <p>请选择需要添加的银行卡</p>
                </div>
                <div class="content">
                    <div class="bankCards" v-for="(item,index) in chuxuCards" :key="index">
                        <div class="banksimg" style="display:flex;justify-content: flex-start;;width:750px">
                            <img :src="item.logoImage" alt="">
                            <p>{{item.bnknm+item.cardtyp}}({{item.cardno}})</p>
                        </div>
                        <div class="round" v-if="showRound" @click="roundOrgou(item,index)" :class="showGou ==index ? 'noRound' : '' ">
                            <img src="../../assets/images/openBanks/round.png" alt="">
                        </div>
                        <div class="round" v-if="showGou == index">
                            <img src="../../assets/images/openBanks/gou.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </md-popup>
   </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import InputWithValidation from '@/components/InputWithValidation';
import debounce from 'lodash/debounce';
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import { compressImage } from '@/common/yasuoImg.js';
import CryptoJS from 'crypto-js';
import {
    InputItem,
    Field,
    Dialog,
    Icon,
    ImageReader,
    Tag,
    Toast,
    DatePicker,
  } from 'mand-mobile'
export default {
    name: 'addBank',
    components: {
        mdHeader,
        InputWithValidation,
        [ImageReader.name]: ImageReader,
    },
    data() {
        return {
            chuxuCards:[],
            passwordList:[],
            encodePasswordList:[],
            submitPic: false,
            mimes: ['bmp', 'jpg', 'png', 'gif', 'webp', 'heif', 'heic', 'jpeg'],
            showTankuang:false, 
            submitError: false,
            updateFail: require('../../assets/images/openBanks/error_bg.png'),
            imageList:{
                reader0:[]
            },
            usrBnkInfos:[], // ecp银行卡列表
            showJiaobiao:false,
            showIcon:true,
            showPopup:false,
            showRound:true,
            showGou:100,
            baklogo: false,
            bankImgUrl: '',
            bankName: '银行卡',
            // manname: '**',
            manname: store2.default.get('loginName'),
            amounts: '',
            bankCode: '',
            formData: {
                bankNo: '',
                userMbl: ''
            },
            msgDialog: {
                open: false,
                btns: [
                    {
                        text: '取消',
                        id: 'A04',
                        handler: () => {
                            this.msgDialog.open = false;
                            this.msgCode  = "";
                        }
                    },
                    {
                        text: '下一步',
                        id: 'A03',
                        handler: () => {
                            this.submitBankInfo();
                        },
                        disabled: true
                    }
                ]
            },
            msgCode: '',
            codesendTips: '',
            errorTips: '',
            sec: 61,
            standBank: false, // 不支持的银行
            xingyongcard: false,
            yufucard: false,
            attcode: true,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_WALLET_ADDBANK_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_WALLET_ADDBANK_A01'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_WALLET_ADDBANK_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_WALLET_ADDBANK_A04'
                }
            ],
            cardList: [],
            orgCode: '',
            loading: false,
            isHadPay: false,
            AddNum: 0,
            Khmobile: '',
            codeType: ''
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
        if(this.codeType == '03') {
            // this.$route.meta.title = '更换银行卡'
            document.title = '更换银行卡';
        }
    },
    created() {
        this.queryWalAcpList(); // 获取加密银行卡
        this.queryAcpList(); // 银行快捷绑卡查询
        this.orgCode = this.$route.query.orgCode || '';
        this.Khmobile = store2.default.get('usrmob').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.codeType = this.$route.query.applyType || '';
        Object.keys(this.formData).forEach((name) => {
            this.$watch(`formData.${name}`, debounce(function check() {
                if (this.formData.bankNo.length > 15) {
                    this.checkBankStatus();
                    this.getBankType();
                }
                if (this.formData.bankNo && this.formData.userMbl.length === 11) {
                    this.$refs.form.validate();
                }
            }, 500));
        });
        initPageJs(this.$route.meta.pageName, this.touchArr);
    },
    methods: {
        // 获取加密银行卡
        queryWalAcpList() {
            api.newBank.walAcpList({})
            .then((res) => {
                this.encodePasswordList = res.usrBnkInfos;
                console.log(res.usrBnkInfos,'---encodePasswordList---',this.encodePasswordList)
                this.aesDecode(this.encodePasswordList);
            })
            .catch((err) => {
                console.log(err)
            })
        },
        aesDecode(encodePassword) {
            encodePassword.forEach((res) => {
                var d = res.cardno.substr(9);
                var key = CryptoJS.enc.Latin1.parse('idhnlsjd02n239n2');
                var iv = CryptoJS.enc.Latin1.parse('63jdh9s2l0vhryuy');
                var decrypted = CryptoJS.AES.decrypt(d, key, {
                    iv : iv,
                    padding : CryptoJS.pad.ZeroPadding
                });
                var password = decrypted.toString(CryptoJS.enc.Utf8);
                if(res.cardtyp === "储蓄卡") {
                    this.passwordList.push(password);
                }
                return password;
            })
            console.log(this.passwordList)
        },
        onReaderSelect(name, {files}) {
            files.forEach(file => {
                console.log('[Mand Mobile] ImageReader Selected:', 'File Name ' + file.name)
            })
            Toast.loading('图片读取中...')
        },
        onReaderComplete(name, {dataUrl, file}) {
            Toast.hide();
            compressImage(dataUrl, {
                width: 750,
                quality: 1
                })
                .then(result => {
                this.imgStr = result;
            })
            this.imgStr = dataUrl
            setTimeout(() => {
                const demoImageList = this.imageList[name] || []
                demoImageList.push(dataUrl)
                this.$set(this.imageList, name, demoImageList)
                this.submitPic = true;
            }, 100)
        },
        onReaderError(name, {msg}) {
            Toast.failed(msg)
        },
        // 上传图片
        submit() {
            this.submitPic = false;
            api.BankIdentification({
                imgStr:this.imgStr
            })
            .then((res) => {
                this.formData.bankNo = res.cardNum;
                this.showTankuang = false;
                this.submitPic = false;
                Toast.succeed('上传成功');
                this.imageList['reader0'].splice(0,1)
            })
            .catch((err) => {
                this.submitError = true;
                this.submitPic = false;
                Toast.failed(err.msgInfo)
                console.log(err)
            })
        },
        // 重新上传图片
        reSubmit() {
            this.imageList['reader0'].splice(0,1);
            this.submitError = false;
            this.submitPic = false
        },
        // 点击圆显示勾
        roundOrgou(item,index) {
            this.showGou = index;
            console.log(this.passwordList)
            this.formData.bankNo = this.passwordList[index]; // 加密银行卡列表
            this.showPopup = false;
            this.showIcon = !this.showIcon
        },
        // 银行快捷绑卡查询
        queryAcpList() {
            api.newBank.acpList({})
            .then((res) =>{
                res.usrBnkInfos.forEach((item) => {
                    if(item.cardtyp === "储蓄卡") {
                        this.chuxuCards.push(item)
                    }
                })
                if(this.chuxuCards.length > 0) {
                    this.showJiaobiao = true;
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        submitInfo() {
            console.log('提交');
            // this.msgDialog.open = true;
            this.getBankMsm();
        },
        checkBankStatus() {
            console.log('查看支持的银行卡');
            // 添加银行卡校验归属
            api.banksApi.bankStatus({
                orgcode: this.orgCode,
                cardNo: this.formData.bankNo,
                mobile: store2.default.get('usrmob')
            }).then((data) => {
                this.standBank = false;
                this.baklogo = true;
                this.bankName = data.bankName;
                this.bankCode = data.bankCode;
                this.bankImgUrl = data.bankCode;
            }).catch((err) => {
                console.log('error',err);
                this.standBank = true;
            });
        },
        getBankType() {
            api.banksApi.queryBankType({
                accNo: this.formData.bankNo
            })
            .then ((res) => {
                if(res.fbankCardType == '贷记卡' || res.fbankCardType == '准贷记卡') {
                    this.xingyongcard = true
                } else if(res.fbankCardType == '预付卡' ) {
                    this.yufucard = true
                } else if(res.fbankCardType == '借记卡' ) {
                    this.yufucard = false
                    this.xingyongcard = false
                } 
            })
            .catch((err) => {
                console.log('---error---',err)
            })
        },
        getBankMsm() {
            let typeStr = "01"
            if(this.orgCode == "BOCM" || this.codeType == '03') {
                typeStr = "03"
            }
            this.codesendTips = this.formData.userMbl.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            // 短信下发添加和删除同一个
            api.banksApi.queryBankMsm({
                applyType: typeStr,
                boundMobile: this.formData.userMbl,
                organizationCode: this.orgCode,
                cardNo:this.formData.bankNo
            }).then(() => {
                this.msgDialog.open = true;
                this.timesContral();
                this.$toast.info('已发送验证码', 2000, true);
            }).catch((data) => {
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
        codeClick() {
            this.getBankMsm();
        },
        submitBankInfo() { // 提交
            this.loading = true;
            this.msgDialog.btns[1].disabled = true;
            // 添加银行卡提交
            api.banksApi.addBank({
                bankCode: this.bankCode,
                boundMobile: this.formData.userMbl,
                cardNo: this.formData.bankNo,
                smsCode: this.msgCode
            }).then(() => {
                this.checkAddStatus();
            }).catch((data) => {
                this.loading = false;
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
                this.checkAddStatus();
            });
        },
        checkAddStatus() {
            var strType = "01"
            if(this.orgCode == 'BOCM' || this.codeType == '03') {
                strType = "03"
            }
            // 添加银行卡提交状态查询
            api.banksApi.addStatus({
                queryType: strType
            }).then((data) => {
                if (data.operationStatus === '01') {
                    // 处理中
                    this.AddNum += 1;
                    if (this.AddNum > 5) {
                        this.loading = false;
                        this.msgDialog.open = false;
                        this.isHadPay = true;
                    } else {
                        setTimeout(() => {
                            this.checkAddStatus();
                        }, 5000);
                    }
                } else if (data.operationStatus === '00') {
                    // 成功
                    this.msgDialog.open = false;
                    this.loading = false;
                    let addText = '添加银行卡成功'
                    if(this.codeType == '03') {
                        addText = '银行卡更换成功'
                    }
                    this.$toast.info(addText, 3000, true);
                    this.$router.push({
                        name: 'addSuc',
                        query: {
                            codeType: this.codeType
                        } 
                    });
                } else if (data.operationStatus === '02') {
                    // 失败
                    this.loading = false;
                    this.$router.push({ 
                        name: 'addFail',
                        query: {
                            codeType: this.codeType
                        } 
                    });
                }
            }).catch((data) => {
                this.loading = false;
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
                this.$router.push({ 
                    name: 'addFail',
                    query: {
                        codeType: this.codeType
                    }  
                });
            });
        },
        // 查看银行卡
        searchAddBank() {

        },
        getCodeAgain() {
            this.getBankMsm();
        },
        seeBank() {
            console.log('chan');
            this.$router.push({ name: 'supportBank' });
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>
<style lang="less" scoped>
    .contains {
        .mainContain {
            .title {
                height: 114px;
                opacity: 1;
                font-size: 36px;
                font-weight: 600;
                text-align: left;
                color: #333333;
                line-height: 114px;
                padding-left: 30px;
                padding-right: 30px;
            }
            .add {
                height: 56px;
                opacity: 1;
                font-size: 24px;
                font-weight: 400;
                text-align: left;
                color: #238ff2;
                line-height: 56px;
                background: rgba(35,143,242,0.10);
                padding-left: 30px;
                padding-right: 30px;
            }
            .manname {
                font-size: 34px;
                margin-top: 13px;
                padding-left: 30px;
                display: flex;
                justify-content:left;
                align-items: center;
                span {
                    font-size: 28px;
                    font-weight: 400;
                    text-align: center;
                    color: #333333;
                }
                img{
                    width: 28px;
                    height: 28px;
                    margin-left: 11px;
                }
            }
            .infoBox {
                padding-left: 30px;
                padding-right: 30px;
                .addbankInput {
                    position: relative;
                }
                 .pic {
                    position: absolute;
                    right: 50px;
                    top: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 5px;
                    margin-left: 7px;
                    .back {
                        width: 28px;
                        height: 28px;
                        margin-left : 6px;
                        margin-right : 6px;
                        img {
                            width: 14px;
                            height: 24px;
                        }
                    }
                    .down {
                        margin-left : 6px;
                        margin-right : 6px;
                        margin-top: -5px;
                        width: 28px;
                        height: 28px;
                        img {
                            width: 24px;
                            height: 14px;
                        }
                    }
                    .xiangji {
                        width: 38px;
                        height: 38px;
                        img {
                            width: 38px;
                            height: 32px;
                        }
                    }
                }
                .checkSupportBank {
                    width: 598px;
                    height: 40px;
                    opacity: 1;
                    font-size: 26px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #ff1414;
                    line-height: 40px;
                    margin-top: 10px;
                    .seeBank {
                        color: #238ff2;
                    }
                }
                .queryBankType{
                    width: 598px;
                    height: 40px;
                    opacity: 1;
                    font-size: 26px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    text-align: left;
                    color: #ff1414;
                    line-height: 40px;
                    margin-top: 10px;
                }
                .reservedPhone {
                    height: 100px;
                    line-height: 100px;
                    font-size: 28px;
                    font-weight: 500;
                }
            }
            .msg {
                width: 338px;
                height: 37px;
                opacity: 1;
                font-size: 26px;
                font-weight: 400;
                text-align: left;
                color: #666666;
                line-height: 37px;
                padding-left: 30px;
                margin-top: 33px;
            }
            .wapBtn {
                width: 690px;
                height: 90px;
                opacity: 1;
                // background: #8ec4f6;
                border-radius: 10px;
                margin: 494px auto 0;
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
                    // .errorTipss {
                    //     background: #ffffff;
                    //     width: 200px;
                    //     margin-left: 200px;
                    //     margin-bottom: 20px;
                    // }
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
                        background: #ffffff;
                        width: 200px;
                        margin-left: 200px;
                        margin-bottom: 20px;
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
                        height: 0.75rem;
                        opacity: 1;
                        background: #ffffff;
                        border: 0.02rem solid #0195ff;
                        border-radius: 0.08rem;
                        font-weight: 500;
                        margin-top: .23rem;
                        margin-right: 30px;
                        margin-left: 30px;
                        // &.disabled{
                        //     color: #0195ff!important;
                        // }
                    }
                    .md-dialog-btn:last-child{
                        // color: #0195ff;
                        width: 200px;
                        height: 75px;
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
.loading-toast{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99999;
    transform: translate(-50%, -50%);
}
.addBanks {
    position: relative;
    width: 100%;
    height: 447px;
    background: #f1f1f1;
    border-radius: 20px 20px 0 0;
    .title {
        display: flex;
        justify-content: center;
        border-bottom: 2px solid #CCC;
        padding: 30px 30px;
        .tianjia {
            position: absolute;
            left: 30px;
            top: 30px;
            img {
                width: 40px;
                height: 40px;
            }
        }
        p {
            font-size: 30px;
            font-weight: bold;
            line-height: 42px;
        }
    }
    .content {
        .bankCards {
            display: flex;
            align-items: center;
            margin: 5px 30px;
            padding: 15px;
            border-bottom: 2px solid #CCC;
            p {
                font-size: 26px;
                font-weight: 500;
                line-height: 37px;
                margin-left: 20px;
            }
            .banksimg {
                width: 50px;
                height: 45.62px;
                margin-left: -10px;
                img {
                    width: 49.47px;
                    height: 45.62px;
                }
            }
            .round {

                width: 36px;
                height: 36px;
                img {
                    width: 36px;
                    height: 36px;
                }
            }
            .noRound {
                display: none;
            }
        }
        .bankCards:last-child{
            border-bottom: none;
        }
    }
}
.actcodebtn{
        background: #0195ff;
        pointer-events: inherit;
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
    background: rgba(2, 2, 2, 0.7);
    z-index: 999;
    .main {
        width: 630px;
        height: 560px;
        background: #FFFFFF;
        .title {
            font-size: 35px;
            line-height: 100px;
            text-align: center;
            margin: 0 20px;
            border-bottom: 1px solid #ccc;
        }
        .cardPhone {
            text-align: center;
            padding: 20px 0;
        }
        .phoneNum {
            position: relative;
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            p {
                display: inline-block;
                width: 65px;
                height: 65px;
                border: 2px solid #CCC;
                border-radius: 5px;
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
                letter-spacing: 0.88rem;
                text-indent: 0.4rem;
                background: transparent;
                z-index: 46;
                color: transparent;
                caret-color: transparent;
                text-shadow: 0 0 0 #000;
            }
        }
        .resend {
            margin-top: 80px;
            text-align: center;
            color: #CCC;
        }
    }
    .pic_bg {
        position: relative;
        width: 530px;
        height: 402px;
        background: url('../../assets/images/openBanks/pic_bg.png') no-repeat;
        background-size: 100%;
        .cha {
            position: absolute;
            right: 10px;
            top: 15px;
            width: 40px;
            height: 40px;
            background: url('../../assets/images/openBanks/icon_tianjia.png') no-repeat;
            background-size: 100%;
        }
        .bankPic {
            position: absolute;
            bottom: 40px;
            left: 55px;
            width: 420px;
            height: 258px;
            background-color: rgba(2, 2, 2, 0.3);
            border-radius: 10px;
        }
    }
    .submit {
        width: 550px;
        height: 60px;
        margin-top: 76px;
        background: #8ec4f6;
        border-radius: .1rem;
        color:#fff;
        pointer-events: none;
        font-size:22px;
        font-weight:500;
        border:none;
    }
    .reload{
        width: 40px;
        height: 30px;
        position:absolute;
        left:430px;
        top:35px
    }
    .zxj_icon{
        position: absolute;
        top: 176px;
        left: 213px;
        width: 102px;
        height: 102px;
        background: url('../../assets/images/openBanks/xiangji_icon.png') no-repeat;
        background-size: 100%;
    }
    .actcodebtn{
        background: #0195ff;
        pointer-events: inherit;
    }
    .btns {
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
        .actsend-code {
            background: #0195ff;
            pointer-events: inherit;
        }
    }
    .quxiao {
        width: 250px;
        height: 70px;
        background: white;
        border: 2px solid #0195ff;
        border-radius: 5px;
        color: #49BFFF;
    }
    .tijiao {
        width: 250px;
        height: 70px;
        pointer-events: none;
        background: #8EC4F6;
        color: #F2F2F2;
        border-radius: 5px;
    }
}

</style>
