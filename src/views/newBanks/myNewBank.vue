<template>
   <div class="contains">
       <div class="mainContain">

           <!-- v-if="bankData!=null&&bankData.length >0" -->

            <div class="bindingCard" >
                <!-- 绑定卡 -->
                <div class="bindingTitle">我的银行卡</div>
                 <!-- <div class="defaultBindingImg" :style="{backgroundImage: `url(../static/images/banks/bankimages/icon_${bankCode}_bg.png)`,width:'6.86rem', height:'2.58rem', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}" @click= "defaultCardPoupo">
                    <div class="bankName">
                        <div class="name">
                              <img :src="`../static/images/banks/bankimages/icon_${bankCode}.png`" alt="">
                             <span>{{defaultBankName}}</span>
                        </div>
                        <div class="defaultCard">默认卡</div>
                    </div>
                   <div class="bankNub">{{defaultBankNub}}</div>
                </div> -->
                <!-- <div class="bindingImg" v-for="(item, index) in bankData" :key="index" :style="{backgroundImage: `url(../static/images/banks/bankimages/icon_${item.backImage}_bg.png)`,width:'6.86rem', height:'2.58rem', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}" @click= 'changeBankStatus(item)'> -->
                <div class="bindingImg" v-for="(item, index) in bankData" :key="index" :style="{backgroundImage: `url(${item.backImage})`,width:'6.86rem', height:'2.58rem', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}" @click= 'changeBankStatus(item)'>
                    <div class="name">
                        <!-- <img :src="`../static/images/banks/bankimages/icon_${item.logoImage}.png`" alt=""> -->
                       <img :src="item.logoImage" alt="">
                        <span style="color:#fff">{{item.bnknm}}</span>
                        <span style="margin-left:10px">{{item.cardtyp}}</span>
                    </div>
                    <div class="bankNub" style="color:#fff" >{{item.cardno}}</div>
                </div>
            </div>



            <div class="addBank" id="A05" @click="addBank">
                <img src="../../assets/images/banks/addBank.png" alt="">
                <span>添加银行卡</span>
            </div>
       </div>
        <!-- 设置默认卡删除绑定的银行卡 -->
        <md-popup class="defaultAnddelete" v-model="defaultDeleteShow" position="bottom">
            <div class="pouContain">
                <div class="setDefault" style="text-align:center;font-size:18px" id="A03" @click="unBindCard">解除绑定</div>
                <div class="deleteBank" style="text-align:center;font-size:18px" id="A04" @click="noUnBindCard">取消</div>
            </div>
        </md-popup>
        <!-- 解绑银行卡输入验证码 -->
         <md-dialog
                title="请输入短信验证码"
                :closable="true"
                v-model="msgDialog.open"
                class="msgDialog"
                 @hide ='hideFun' 
              >
                <!-- <p class="errorTipss">已发送至手机{{codesendTips}}</p> -->
                <p class="errorTipss" style="text-align: center; color: #333">
                  验证码短信已发送至银行卡预留手机号
                </p>
                <div
                style="
                     height: 0.75rem;
                    margin-top: 20px;
                    border-radius: 5px;
                    border: 1px solid #ededed;
                    position: relative;
                    width:80%;
                    margin:20px auto;
                  "
                >  
                  <input
                    class="removeNumStyle"
                    style="width: 50%; height: 95%; border: none;margin-right:120px;padding-top:1px;padding-left:8px;border-top-left-radius:30px"
                    type="text"
                    novalidate="novalidate"
                    pattern="[0-9]*"
                    v-model="msgCode"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                  />
                  <md-button
                    style="width: 40%;
                            height: 100%;
                            display: inline-block;
                            border-radius: 0;
                            box-sizing: border-box;
                            border-top-right-radius: 5px;
                            border-bottom-right-radius: 5px;
                            position: absolute;
                            right: 0;"
                    @click="getTimeOutShow"
                   :type="buttonType ? 'default':'disabled'"
                   :style="buttonStyle ? '{color:#fff}' : '{color: #238ff2}'"
                    >{{buttonTxt}}</md-button
                  >
                </div>

                <md-button
                  style="width: 60%; margin: 30px auto 30px auto"
                  @click="commitDeleteBank"
                  :type="smsButtonFlag ? 'default' : 'disabled'"
                  >提交</md-button
                >
              </md-dialog>

              <!-- 开始绑定loading效果 -->
            <div class="loading-toast" v-if="loading">
                <img src="@/assets/images/loading-toast.gif" alt="" />
            </div>
   </div>
</template>

<script>
import Header from '@/components/header';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';

export default {
    name: 'myNewBank',
    components: {
        Header
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
            bankData: [],                        // 绑卡列表
            isPopupShow: false, // 默认卡弹窗
            defaultDeleteShow: false, // 设置默认卡删除弹窗
            boundCardId: '',
            clickBank: '',
            bankCode: '',
            deletePopShow: false,
            elePopShow: false,
            msgDialog: {
                    open: false,
                    btns: [
                    {
                        handler: () => {
                    // this.commitDeleteBank();
                        },
                        disabled: false,
                    },
                    ],
                    },
            msgCode: '',
            codesendTips: store2.default.get('usrmob').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            errorTips: '60',
            sec: 61,
            attcode: true,
            delcard: false,
            smsJrn:  ''  ,     //短信流水 
            whichCard:{}  ,    //表示哪张卡
            smsButtonFlag:false,//提交
            buttonTxt:'重新获取' ,    //按钮文案
            buttonType:false ,    //按钮可不可点击disabled;default
            buttonStyle:false ,     //控制按钮文案颜色
            loading:false  ,   //加载框
            flag :false  ,     //定时器变量
            dealChn:''
        };
    },
   watch: {
        msgCode: {
            handler(val) {
                this.msgCode = val.replace(/[^0-9]/ig,'')
                if(val && val.length>6) {
                     this.msgCode=val.slice(0,6)
                }   
                 if(val && val.length==6){
                    this.smsButtonFlag = true
                 }else{
                     this.smsButtonFlag = false
                 }
            },
            deep:true,
            immediate:true

        }
    },
    
    mounted() {
        this.queryBankList();
        let myDealChn=  this.$route.query.dealChn || ''    //获取渠道编码
        if(myDealChn !== '' && myDealChn !== undefined){
            this.dealChn = myDealChn
        }else{
            this.dealChn = '10001'
        }
    },
    methods: {
        queryBankList() { // 获取绑定卡列表
            api.newBank.acpList({
            }).then((res) => {
                 if(res.usrBnkInfos && res.usrBnkInfos.length>0){
                this.bankData = res.usrBnkInfos.filter((item)=>{
                        if(item.accFlg && item.accFlg==='04'){
                            return true
                        }
                        // return true
                    })
                    console.log(this.bankData)
                 }   
            }).catch((data) => {
                this.$toast.info(data.msgInfo || '查询失败，请稍后再试', 3000, true);
            });
        },
        changeBankStatus(e) {
            this.defaultDeleteShow = true;
            this.clickBank = `${e.bnknm} (尾号${e.cardno.substring((e.cardno.length - 4), e.cardno.length)})`;
            this.boundCardId = e.boundCardId;
            this.whichCard = e        //哪张卡
        },
        deleteBank() {
            this.defaultDeleteShow = false;
            this.deletePopShow = true;
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
            this.loading = true
            api.newBank.acpRescin({
                smsJrn : this.smsJrn  ,     //短信流水[上一接口返回]
                smsCode : this.msgCode ,      //短信验证码
                accFlg  :  this.whichCard.accFlg ,       //绑卡列表返回
            }).then(() => {
                this.loading = false
                this.msgDialog.open = false;
                // this.$toast.info('银行卡删除成功', 3000, true);
                this.queryBankList();
            }).catch((data) => {
                this.loading = false
                this.$toast.info(data.msgInfo || '快看看，出错啦', 3000, true);
            });
        },

        // 进入添加银行卡页面
        addBank() {
            this.$router.push({
                name: 'addNewBanks',
                query: {
                    dealChn : this.dealChn
                }
            });
        },
        // 解除绑定卡片
        unBindCard(){
            this.defaultDeleteShow=false,
            this.msgDialog.open=true
            this.unBindsms({cardId:this.whichCard.cardid})        //下发验证码接口
           //调用倒计时方法
           this.timeOutShow() 
        },
        // 取消解除绑定卡片
        noUnBindCard(){
            this.defaultDeleteShow = false
            this.whiteCard = ''
        },
        // 解绑下发验证码
        unBindsms(data){
            api.newBank
            .acpRescindSms(data)
            .then((res)=>{
             this.smsJrn = res.smsJrn   //返回短信流水
            })
            .catch((err)=>{
                this.$toast.info(err.msgInfo)
            })
        },
        // 倒计时效果
        timeOutShow(){
                this.flag = false
             // 重新获取按钮
                var timer = null
                let a = 60
                this.buttonType = false  
                this.buttonStyle = false  
                this.buttonTxt = `重新获取${a}s`
                // alert(timer)  //null
                if (!timer) {
                    timer = setInterval(()=> {
                        console.log(a)
                        a--
                        this.buttonTxt = `重新获取${a}s`
                        // 重新获取有几秒展示就不可点击
                        // this.buttonType = false  
                        // this.buttonStyle = false  
                        if (a === 0 || this.flag == true) {
                            clearInterval(timer)
                            timer = null
                        this.buttonTxt = '重新获取'
                        this.buttonType = true
                        this.buttonStyle = true
                        }
                    }, 1000)
                }
        },
        // 重新获取文案变倒计时效果再次发送验证码
        getTimeOutShow(){
            this.timeOutShow()  //倒计时
            this.unBindsms({cardId:this.whichCard.cardid})  //下发验证码
        },
        // 隐藏触发函数
        hideFun(){
            this.flag = true
            this.msgCode = ''
        }

        
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
                    padding-top: 40px;
                    padding-bottom: 40px;
                    .bankName {
                        height: 60px;
                        padding-left: 20px;
                        padding-right: 20px;
                        display: flex;
                        justify-content: space-between;
                        .name {
                            font-size: 34px;
                            display: flex;
                            justify-content:center;
                            align-items: center;
                            img{
                                // z-index: 9999;
                                width: 60px;
                                height: 60px;
                                margin-right: 20px;
                            }
                            span {
                                font-weight: 500;
                                text-align: left;
                                color: #ffffff;
                            }

                        }
                        .kind {
                            height: 60px;
                            line-height: 60px;
                            font-size: 28px;
                            font-weight: 500;
                            color: #ffffff;
                        }
                    }
                    .bankNub {
                        height: 70px;
                        margin-top: 28px;
                        text-align: center;
                        line-height: 70px;
                        font-size: 50px;
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
                    .bankName {
                        padding-left: 20px;
                        display: flex;
                        justify-content: space-between;
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
                        .name {
                            margin-top: 40px;
                            width: 400px;
                            font-size: 34px;
                            display: flex;
                            justify-content:left;
                            align-items: center;
                            img{
                                width: 60px;
                                height: 60px;
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
                        text-align: center;
                        line-height: 60px;
                        font-size: 50px;
                        font-weight: 400;
                        color: #ffffff;
                        margin-top: 40px;
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
                        font-size: 34px;
                        display: flex;
                        justify-content:left;
                        align-items: center;
                        img{
                            width: 60px;
                            height: 60px;
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
                        top:150px;
                        height: 70px;
                        width: 100%;
                        text-align: center;
                        line-height: 70px;
                        font-size: 50px;
                        font-weight: 400;
                        color: #ffffff;
                    }
                }
            }
            .addBank {
                margin-top: 30px;
                width: 6.86rem;
                height: 91px;
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

    .loading-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    // width: 1.2rem;
    }
</style>
