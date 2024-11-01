<template>
    <div>
        <div class="container unwind-wallet" id="container">
            <div class="account-index-wrapper">
                <div class="unwind-info">
                    <p>您正在操作钱包销户</p>
                    <div>为保证您的账户安全，请输入您的身份证后6位。</div>
                    <ul>
                        <li v-if="orgCode == 'BOCM'">人脸识别验证</li>
                        <li>身份证号验证</li>
                        <li>短信验证</li>
                    </ul>
                </div>
                <div class="unwind-agreement">
                    <div class="agreement-info">
                        <label class="is-agreement">
                            <p :class="{ xy_false: isXy, xy_true: isYx }" @click="checkbox"></p>
                        </label>
                        <div class="agreement-link">我已了解并同意以下信息：</div>
                    </div>
                    <div class="agreement-dets" v-if="orgCode != 'BOCM'">
                        如您销户成功后，您在银行开立的三类电子账户将被注销无法使用；如想再次使用需在江苏移动移动钱包进行开户操作，并开户成功后才可继续使用。
                    </div>
                    <div class="agreement-dets" v-if="orgCode == 'BOCM'">
                        如您销户成功后，您在银行开立的二三类电子账户将被注销无法使用;如想再次使用需在中国移动江苏APP进行开户操作，并开户成功后才可继续使用
                    </div>
                    <button class="unwind-btn actunwind-btn" v-if="isYx" @click="startxh">开始销户</button>
                    <button class="unwind-btn" v-else>开始销户</button>
                </div>
            </div>
        </div>
        <md-popup
            v-model="authorization.isPopupShow.bottom"
            position="bottom"
            :mask-closable="false"
        >
            <md-popup-title-bar
                large-radius
                title="人脸识别认证"
            ></md-popup-title-bar>
            <div class="authorizationBox">
                <img src="@/assets/images/BOCM/rlsb.png" alt="" />
                <div class="text">
                    为加强个人信息核验，保障您的账户资金安全
                    您将授权交通银行采集和使用您的脸部信息进行身份识别
                </div>
                <div class="agreement">
                    <md-agree
                        v-model="agreeConf.checked"
                        :disabled="agreeConf.disabled"
                        :size="agreeConf.size"
                        icon-type="square"
                        @change="
                            onChange(agreeConf.name, agreeConf.checked, $event)
                        "
                    >
                        我已阅读并同意<span style="color: #1b7aee" @click="readPop = true"
                            >《人脸识别服务授权书》</span
                        >
                    </md-agree>
                </div>
                <div
                    class="ok"
                    :class="{ not: !agreeConf.checked }"
                    @click="goFace"
                >
                    授权
                </div>
                <div class="no" @click="hideAuthorization('bottom')">
                    暂不授权
                </div>
            </div>
        </md-popup>
        <div class="readPop" v-if="readPop">
            <h2>人脸识别服务协议</h2>
            <p>
                欢迎您使用人脸识别功能，本服务协议是中国移动通信集团江苏有限公司（以下简称“江苏移动”或“我们”）与用户（以下简称“您”）为明确服务内容而签订的有效协议。在接受本协议之前，请仔细阅读本协议的全部内容。
            </p>
            <h3>一、功能说明</h3>
            <p>
                为保障用户账户的安全，提供更好的服务，我们在提供部分产品及服务之前，采用人脸识别核身验证功能对用户的身份进行认证，用于验证操作人是否为账户持有者本人，通过人脸识别结果评估是否为用户提供产品或服务。该功能由交行股份有限公司机构提供核验数据及技术支持。
            </p>
            <h3>二、授权与许可</h3>
            <p>
                如您点击“授权”或以其他方式选择接受本协议规则，则视为您在使用人脸识别服务时，同意并授权我们获取、使用您在申请开通交通银行二类户服务过程中所提供的个人信息（包括姓名、身份证号）及人脸影像数据，并提供给合法存有您信息的第三方合作机构进行比对核验，以核验您的身份。如您不同意本协议的任何内容，或者无法准确理解协议内容的解释，请不要进行后续操作。
            </p>
            <h3>三、信息安全声明</h3>
            <p>
                我们承诺对您的个人信息严格保密，并基于国家监管部门认可的加密算法进行数据加密传输，数据加密存储。如因不可抗力、计算机黑客袭击、系统故障、通讯故障、电脑病毒、恶意程序攻击及其他不可归因于江苏移动的情况而导致用户损失的，我们不承担任何责任。江苏移动与合作机构签订保密合同，并要求合作伙伴做好用户信息安全保障，承诺尽到信息安全保护义务。
            </p>
            <h3>四、协议的效力及变更</h3>
            <p>
                本协议在签署后立即生效，您在中国移动江苏移动APP点击“授权”或以其他方式选择接受本协议规则，即视为对本协议的签订。在不损害用户利益的前提下，江苏移动保留修改或增补本协议内容的权利，无需另行单独通知您。若您在本协议内容通知变更后继续办理相关业务的，表示您已充分阅读、理解并接受变更后的协议内容，也将遵循变更后的协议内容办理相关业务。若您不同意变更后的协议内容，您应向江苏移动提出终止本协议并停止办理相关业务。
            </p>
            <div class="btn" @click="haveRead">我已阅读并知晓</div>
        </div>
    </div>
</template>


<script>
// import api from '@/common/apiUrls';
import { Field, FieldItem, TabPicker } from "mand-mobile";
import { Popup, PopupTitleBar, Button, Icon } from "mand-mobile";
import { Agree } from "mand-mobile";
import api from '@/common/apiUrls';

export default {
    name: 'accountCancellation',
    components: {
        [Agree.name]: Agree,
        [Field.name]: Field,
        [FieldItem.name]: FieldItem,
        [TabPicker.name]: TabPicker,
        [Popup.name]: Popup,
        [PopupTitleBar.name]: PopupTitleBar,
        [Button.name]: Button,
        [Icon.name]: Icon,
    },
    data() {
        return {
            readPop: false,
            read: false,
            isXy: true,
            isYx: false,
            orgCode: '',
            authorization: {
                isPopupShow: {},
            },
            agreeConf: {
                checked: false,
                name: "agree5",
                size: "md",
                disabled: false,
                introduction: "方形勾选框未选中状态",
            },
            queryList: {},
        };
    },
    mounted() {
        document.body.style.backgroundColor = '#f5f5f5';
        this.orgCode = this.$route.query.orgCode;
    },
    methods: {
        hideAuthorization(type) {
            this.$set(this.authorization.isPopupShow, type, false);
            this.BodyScroll(false);
        },
        // 阻止蒙层下滚动
        BodyScroll(popShow) {
            if (!popShow) {
                // 不显示
                document.documentElement.style.overflow = "";
                document.body.style.overflow = "";
            } else {
                // 显示
                document.documentElement.style.overflow = "hidden";
                document.body.style.overflow = "hidden";
            }
        },
        goFace() {
            this.queryList.orgcode = this.orgCode || '';
            if (this.agreeConf.checked) {
                this.hideAuthorization("bottom");
                // this.$router.push({
                //     name: "faceRecognition",
                //     query: {
                //         ...this.$route.query,
                //         accountFrom: true,
                //     },
                // });
                var backUrl
                // faceType = "CANCEL_ACCOUNT";  销户
                // faceType = "OPEN_ACCOUNT";   开户
                if(process.env.VUE_APP_ENV == 'local') {
                    backUrl = 'http://192.168.100.167:8080/fintech-h5/fortuneCenter/accountCancellation/cancellValiID'
                } else {
                    backUrl = `https://fintech.12580life.com${process.env.BASE_URL}accountCancellation/cancellValiID`
                }
                api.BOCM.face({
                    backUrl: backUrl,
                    faceType: 'CANCEL_ACCOUNT'
                })
                .then(res => {
                    window.location.href = res.url
                    this.queryList.livingOrderNo = res.livingOrderNo;
                    window.sessionStorage.setItem('saveCancelQuery',JSON.stringify(this.queryList))
                })
                .catch((err) => {
                    window.sessionStorage.setItem('saveCancelQuery',JSON.stringify(this.queryList))
                    if(err.msgInfo) {
                        this.$toast.info(err.msgInfo,3000);
                    } else {
                        this.$toast.info('系统开小差了，请重新尝试~',3000);
                    }
                })
            }
        },
        onChange(name, checked) {
            if (!this.read) {
                // console.log(999);
                this.readPop = true;
            }
        },
        checkbox() {
            this.isYx = !this.isYx;
        },
        startxh() {
            if(this.orgCode == 'BOCM') {
                this.showAuthorization("bottom");
            } else {
                this.$router.push(
                {
                    name: 'cancellValiID',
                    query: {
                        ...this.$route.query,
                        orgCode: this.$route.query.orgCode
                    }
                }
            );
            }
        },
        showAuthorization(type) {
            this.$set(this.authorization.isPopupShow, type, true);
            this.BodyScroll(true);
        },
        haveRead() {
            this.read = true;
            this.readPop = false;
            this.agreeConf.checked = true;
        },
    }
};
</script>

<style scoped lang="less">
.readPop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    background: white;
    z-index: 99999;
    padding: 30px;
    box-sizing: border-box;
    h2 {
        text-align: center;
        font-size: 0.36rem;
        color: #333;
        font-weight: 700;
        margin-bottom: 0.2rem;
    }
    h3 {
        font-size: 0.32rem;
        margin-bottom: 0.1rem;
        margin-top: 0.2rem;
    }
    p {
        font-size: 0.26rem;
        color: #666666;
        line-height: 0.4rem;
        text-indent: 0.52rem;
    }
    .btn {
        width: 6.9rem;
        height: 0.82rem;
        font-size: 0.36rem;
        line-height: 0.82rem;
        color: #fff;
        background: #238ff2;
        text-align: center;
        border-radius: 0.08rem;
        margin-top: 40px;
    }
}
.unwind-info{
    p{
        padding-top:.44rem;
        margin-bottom:.2rem;
        font-size:.36rem;
        font-weight:600;
        color:#333;
        margin-left:.3rem;
    }
    div{
        width:100%;
        height:.56rem;
        line-height:.56rem;
        font-size:.24rem;
        background: rgba(35,143,242,0.10);
        color:#238ff2;
        text-indent: .3rem;
    }
    ul{
        width:100%;
        li{
            width:6.9rem;
            height:1.04rem;
            border-bottom:1px solid #979797;
            font-size:.32rem;
            color:#333;
            margin:auto;
            line-height:1.04rem;
        }
    }
}
.unwind-agreement{
  width:100%;
  height:3.77rem;
  background:#fff;
  position:fixed;
  bottom:0;
  left:0;
  text-align:center;
  .agreement-info{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding-right: 0.2rem;
      margin-top: 0.2rem;
        .xy_false {
            width: 0.31rem;
            height: 0.31rem;
            background: url('../../assets/images/check-off.png') no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
            border-radius: 50%;
        }
        .xy_true {
            width: 0.31rem;
            height: 0.31rem;
            background: url('../../assets/images/check-on.png') no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
            border-radius: 50%;
        }
        .is-agreement {
            display: block;
            margin-left: 0.3rem;
        }
        .is-agreement p {
            font-size: 0.24rem;
            color: #666;
        }
  }
  .agreement-dets{
    width:6rem;
    margin:.1rem auto .3rem;
    color:#999;
    font-size:.24rem;
    text-align:left;
  }
}
.unwind-btn{
  width: 6.9rem;
  height: .9rem;
  opacity: 1;
  background: #8ec4f6;
  border-radius: .1rem;
  color:#fff;
  font-size:.36rem;
  pointer-events:none;
  border:none;
}
.actunwind-btn{
  background: #0195ff;
  pointer-events:inherit;
}
.authorizationBox {
    height: 947px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 329px;
        height: 329px;
        margin-top: 23px;
        margin-bottom: 18px;
    }
    .text {
        width: 650px;
        height: 173px;
        font-weight: 400;
        font-size: 28px;
        color: #383838;
        letter-spacing: 1px;
        text-align: center;
        line-height: 54px;
    }
    .agreement {
        font-size: 22px;
    }
    .ok {
        width: 627px;
        height: 90px;
        background: #1b7aee;
        border-radius: 12px;
        text-align: center;
        line-height: 90px;
        margin-top: 57px;
        font-weight: 400;
        font-size: 36px;
        color: #ffffff;
    }
    .not {
        background: #bdd9f8;
    }
    .no {
        margin-top: 40px;
        width: 627px;
        height: 90px;
        border: 2px solid #1b7aee;
        text-align: center;
        line-height: 90px;
        border-radius: 12px;
        font-weight: 400;
        font-size: 36px;
        color: #1b7aee;
    }
}
</style>
