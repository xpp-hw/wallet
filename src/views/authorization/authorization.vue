<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2023-03-02 14:36:31
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2023-10-13 09:38:23
 * @FilePath: \loans\src\views\authorization\authorization.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box">
        <md-popup v-model="isPopupShow.bottom" position="bottom">
            <md-popup-title-bar title="服务授权" large-radius @confirm="hidePopUp('bottom')" @cancel="hidePopUp('bottom')"></md-popup-title-bar>
            <div class="container">
                <div class="pic">
                    <div class="pic1"></div>
                    <div class="pic3"></div>
                    <div class="pic2"></div>
                </div>
                <p class="text1">授权<span style="color: #227DF6;">钱小乐</span>获取您的以下信息，用于为您提供产品和服务。</p>
                <p class="text2">·授权使用您的手机号办理业务</p>
                <p class="text3">·获取设备信息、位置信息进行服务匹配</p>
                <div class="checkDiv">
                    <!-- <label> -->
                        <p :class="isCheck ? 'check' : 'checkOff' " @click="checkClose()"></p>
                    <!-- </label> -->
                    <span>同意</span>
                    <span v-for="(item,index) in linkList" :key="index">
                        <a href="javascript:;" style="color: #238FF2;" @click="goLink(item.content)">《{{item.title}}》</a>
                    </span>
                </div>
                <div class="btn1" @click="confirm('bottom')">确认授权</div>
                <div class="btn2" @click="hidePopUp('bottom')">暂不授权</div>
            </div>
        </md-popup>
        <loading ref="loading"></loading>
    </div>
</template>

<script>
import api from "@/common/apiUrls"
import {Popup, PopupTitleBar} from "mand-mobile"
import * as store2 from "@/common/localstore"
import loading from "@/components/loading"
export default {
    name: "authorization",
    components: {
        [Popup.name]:Popup,
        [PopupTitleBar.name]:PopupTitleBar,
        loading,
    },
    data() {
        return {
            version: "",
            isPopupShow:{
                bottom: false,
            },
            isCheck: false,
            linkList: [],
            channelCode: "",
            isClick: true,
            accessSource: '00'
        }
    },
    created() {
        if(this.$client.LEADEON) {
            this.accessSource = '01'
        } else if(this.$client.JSMCC) {
            this.accessSource = '02'
        } else {
            this.accessSource = '00'
        }
        const agentStr = navigator.userAgent || '';
        let link = "https://fintech.12580life.com/fintech-h5/fortuneCenter/authorization"
        if(!this.$client.JSMCC && agentStr.indexOf('leadeon') < 0) {
            this.$router.push({
                name: 'browserJump',
                query: {
                    jumpUrl: link
                }
            });
        } else {
            this.$store.commit("LOADING",true);
            const u = navigator.userAgent;
            if (u.indexOf("Mac OS X") > -1) {
                // ios
                const regStrsaf = /OS [\d._]*/gi;
                let verinfo = u.match(regStrsaf);
                verinfo = `${verinfo}''`
                    .replace(/[^0-9|_.]/gi, "")
                    .replace(/_/gi, ".");
                this.version = `IOS${verinfo}`;
                this.channelCode = "IOS";
            } else if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
                // android
                const andstr = u.substr(
                    u.indexOf("Android") + 8,
                    u.indexOf(";", u.indexOf("Android")) - u.indexOf("Android") - 8
                );
                this.version = `Android${andstr}`;
                this.channelCode = "ANDROID";
            }
            console.log(u, "         ---version---", this.version);
            this.sqQuery()
        }
    },
    methods: {
        hidePopUp(type) {
            this.$set(this.isPopupShow,type,false);
        },
        checkClose() {
            this.isCheck = !this.isCheck;
        },
        confirm(type) {
            let arrInfo = {"isIos":true,"osVersionl":this.version}
            let jsonInfo = JSON.stringify(arrInfo);  
            if(this.channelCode == "IOS") {
                arrInfo.isIos = true;
            } else {
                arrInfo.isIos = false;
            }
            if(!this.isCheck || !this.isClick) {
                return
            }
            this.$store.commit("LOADING",true);
            this.isClick = false; 
            let recordUrl = window.location.href;
            let recordIndex
            if( recordUrl.indexOf('?') > -1) {
                recordIndex = recordUrl.indexOf('?')
            } else {
                recordIndex = recordUrl.length
            }
            recordUrl = recordUrl.slice(0, recordIndex);
            api.authorizationQuery({
                deviceInfo: jsonInfo,
                channelId: "cj_jsyd1_main1",
                phone: store2.default.get("usrmob") || "",
                tokenId: store2.default.get("loginTokenId") || "",
                confirmAuthFlag: "0",
                parentChannel: this.$route.query.parchn || "",
                childChannel: this.$route.query.gytype || "",
                pageUrl: recordUrl || "",
                accessSource: this.accessSource,
            })
            .then(data => {
                console.log('---data---',data);
                this.$store.commit("LOADING",false);
                window.location.href = data.url;
                this.isClick = true; 
                this.$set(this.isPopupShow,type,false);
            })
            .catch(err => {
                console.log('---err---',err);
                this.$store.commit("LOADING",false);
                this.isClick = true; 
                this.$set(this.isPopupShow,type,false);
            })
        },
        goLink(link) {
            window.location.href = link;
        },
        sqQuery() {
            let arrInfo = {"isIos":true,"osVersionl":this.version}
            if(this.channelCode == "IOS") {
                arrInfo.isIos = true;
            } else {
                arrInfo.isIos = false;
            }
            let recordUrl = window.location.href;
            let recordIndex
            if( recordUrl.indexOf('?') > -1) {
                recordIndex = recordUrl.indexOf('?')
            } else {
                recordIndex = recordUrl.length
            }
            recordUrl = recordUrl.slice(0, recordIndex);
            let jsonInfo = JSON.stringify(arrInfo)
            api.authorizationQuery({
                deviceInfo: jsonInfo,
                channelId: "cj_jsyd1_main1",
                phone: store2.default.get("usrmob") || "",
                tokenId: store2.default.get("loginTokenId") || "",
                confirmAuthFlag: "1",
                parentChannel: this.$route.query.parchn || "",
                childChannel: this.$route.query.gytype || "",
                pageUrl: recordUrl || "",
                accessSource: this.accessSource,
            })
            .then(data => {
                console.log('---data---',data);
                this.$store.commit("LOADING",false);
                if(data.msgCd == "BUS00000") {
                    if(data.authFlag == 0) {
                        window.location.href = data.url;
                    }else {
                    this.linkList = data.agreementList;
                    this.$set(this.isPopupShow,"bottom",true);
                    }
                }
            })
            .catch(err => {
                console.log('---err---',err);
                this.$store.commit("LOADING",false);
            })
        }
    }
}

</script>

<style lang="less" scoped>
.box {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #CCC;
    .container {
        background-color: #FFFF;
        padding: 40px 45px 50px 45px;
    }
    .btn1 {
        width: 628px;
        height: 80px;
        background: #238FF2;
        border-radius: 45.5px;
        margin: 28px 0;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
        letter-spacing: 1.07px;
        color: #F1F1F1;
    }
    .btn2 {
        width: 628px;
        height: 80px;
        border: 1px solid #B1B1B1;
        border-radius: 45.5px;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
        letter-spacing: 1.07px;
        color: #B1B1B1;
    }
    .checkDiv {
        display: flex;
        margin-top: 42px;
        color: #A2A3A8;
        font-size: 22px;
        p {
            margin-right: 12px;
            margin-top: -2px
        }
    }
    .check {
        width: 30px;
        height: 30px;
        background: url("~@/assets/images/authorization/check-on.png") no-repeat;
        background-size: 100%;
    }
    .checkOff {
        width: 30px;
        height: 30px;
        background: url("~@/assets/images/authorization/check-off.png") no-repeat;
        background-size: 100%;
    }
    .text1 {
        margin: 24px 0;
        font-size: 28px;
    }
    .text2 {
        font-size: 28px;
        color: #A2A3A8;
    }
    .text3 {
        font-size: 28px;
        color: #A2A3A8;
        margin: 20px 0 0 0 ;
    }
    .pic {
        display: flex;
        justify-content: center;
        align-items: center;
        .pic1 {
            width: 131px;
            height: 131px;
            background: url("~@/assets/images/authorization/pic_1.png") no-repeat;
            background-size: 100%;
        }
        .pic3 {
            width: 61px;
            height: 53px;
            background: url("~@/assets/images/authorization/pic_3.png") no-repeat;
            background-size: 100%;
            margin: 0 24px;
        }
        .pic2 {
            width: 131px;
            height: 131px;
            background: url("~@/assets/images/authorization/pic_2.png") no-repeat;
            background-size: 100%;
        }
    }
}
</style>
