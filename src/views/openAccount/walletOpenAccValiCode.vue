<template>
    <div class="box">
        <div id="container" class="container openaccount">
            <div class="account-index-wrapper">
                <div class="open-progress">
                    <div class="progress-pic">
                        <img
                            alt=""
                            src="../../assets/images/openBanks/shenfen.png"
                        />
                        <div class="progress-line actline"></div>
                        <img
                            alt=""
                            src="../../assets/images/openBanks/cards.png"
                        />
                        <div class="progress-line"></div>
                        <img
                            alt=""
                            src="../../assets/images/openBanks/wancheng_fake.png"
                        />
                    </div>
                    <div class="txt-progress">
                        <span class="act-progress">身份信息</span
                        ><span class="act-progress" style="margin-right: 0.2rem"
                            >银行卡</span
                        ><span style="margin-right: 0.1rem">完成</span>
                    </div>
                </div>
                <div class="account-form">
                    <div class="login__block">
                        <label class="form__block">
                            <span class="form__label login__form-label"
                                >银行卡号</span
                            >
                            <span class="form__main">
                                <!-- <input type="number" pattern="\d*" inputmode="decimal" class="form__input" id="cardNo" placeholder="请填写一张借记卡(不支持信用卡)" required=""
                                                    v-model="bankno" maxlength="19" v-on:input="watchNo()"> -->
                                <md-input-item
                                    v-model="bankno"
                                    align="right"
                                    class="form__input"
                                    maxlength="19"
                                    placeholder="请填写一张借记卡(不支持信用卡)"
                                    type="bankCard"
                                    @blur="inputBanknoWarning"
                                    @change="watchNo"
                                ></md-input-item>
                            </span>
                        </label>
                        <div class="pic">
                            <div v-if="showJiaobiao">
                                <div
                                    v-if="showIcon"
                                    class="back"
                                    @click.stop="jiaobiaoBack"
                                >
                                    <img
                                        alt=""
                                        src="../../assets/images/openBanks/right.png"
                                    />
                                </div>
                                <div
                                    v-if="!showIcon"
                                    class="down"
                                    @click.stop="jiaobiaoDown"
                                >
                                    <img
                                        alt=""
                                        src="../../assets/images/openBanks/down.png"
                                    />
                                </div>
                            </div>
                            <div class="xiangji" @click="showTankuang = true">
                                <img
                                    alt=""
                                    src="../../assets/images/openBanks/xiangji.png"
                                />
                            </div>
                        </div>

                        <div
                            v-if="hasInputBankno"
                            class="input-error bank-card-error"
                        >
                            请输入银行卡号
                        </div>
                    </div>
                    <div
                        v-if="supportbk"
                        class="bank-card-current bank-card-error"
                    >
                        抱歉，暂不支持该银行，
                        <a
                            id="A08"
                            class="link"
                            href="javascript:;"
                            @click="viewbanks"
                            >点击查看支持的银行卡</a
                        >
                    </div>
                    <div class="login__block bank_line">
                        <label class="form__block">
                            <span class="form__label login__form-label"
                                >银行名称</span
                            >
                            <span class="form__main bank_name">{{
                                bankname
                            }}</span>
                        </label>
                    </div>
                    <div class="login__block">
                        <label class="form__block">
                            <span class="form__label login__form-label"
                                >银行预留手机号</span
                            >
                            <span class="form__main">
                                <md-input-item
                                    v-model="cardPhone"
                                    align="right"
                                    class="form__input"
                                    inputmode="decimal"
                                    maxlength="11"
                                    pattern="\d*"
                                    placeholder="请输入银行卡预留手机号"
                                    required=""
                                    type="phone"
                                    @blur="inputPhoneWarning"
                                    v-on:input="watchMob"
                                ></md-input-item>
                            </span>
                        </label>
                        <div
                            v-if="hasInputPhone"
                            class="input-error bank-card-error"
                        >
                            请输入银行预留手机号
                        </div>
                    </div>
                </div>
                <!-- 短信验证码 -->
                <!-- 短信验证码 -->
                <!-- <div class="infor_container" >
                <div class="infor_box">
                    <p class="infor_title">请输入短信验证码</p>
                    <p class="infor_mobile">
                    短信已发送至<i>{{ showmob }}</i>
                    </p>
                    <div class="mobile_box">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <input type="text" v-model="smsCode" class="infor_ipt" maxlength="6" id="A02" />
                    </div>
                    <button type="button" class="infor_djs" :class="[send ? '' : 'actbtn']" :disabled="send" @click="userDetermine()" id="A03">
                    {{smsMsg}}
                    </button>
                </div>
                </div> -->

                <div v-if="noShow" class="agreement-outer">
                    <div class="agreement-info">
                        <label class="is-agreement">
                            <p
                                id="A05"
                                :class="{ xy_false: isXy, xy_true: isYx }"
                                @click="checkbox"
                            ></p>
                        </label>
                    </div>
                    <div id="A06" class="agreement-link">
                        <div v-if="cmbservice" class="cmbbank">
                            <!-- 原判断 -->
                            <!-- v-if="cmbservice" -->
                            <span>我已阅读并同意</span>
                            <a href="javascript:;" @click="siIsShow(1)"
                                >《招商银行一网通用户服务协议》</a
                            >
                            <a href="javascript:;" @click.prevent="siIsShow(2)"
                                >《一网通账户用户授权协议》</a
                            >
                            <a href="javascript:;" @click.prevent="siIsShow(3)"
                                >《一网通账户开户须知》</a
                            >
                            <a href="javascript:;" @click.prevent="siIsShow(4)"
                                >《招商银行“一网通”用户支付服务协议》</a
                            >
                            <a href="javascript:;" @click="siIsShow(5)"
                                >《用户授权协议》</a
                            >
                            <a href="javascript:;" @click="siIsShow(6)"
                                >《移动钱包业务受理协议》</a
                            >
                            <a href="javascript:;" @click="siIsShow(7)"
                                >《和包授权协议》</a
                            >
                            <a href="javascript:;" @click="siIsShow(8)"
                                >《和包隐私权政策》</a
                            >
                            <a href="javascript:;" @click="siIsShow(9)"
                                >《和包支付业务用户服务协议》</a
                            >

                            <p class="pfnote">
                                本人充分了解并清楚知晓出租、出借、出售、购买账户的相关法律责任和惩戒措施，承诺依法依规开立和使用本人账户。
                            </p>
                            <p
                                class="pfnote"
                                style="color: red; font-weight: bold"
                            >
                                同意开通招商银行电子账户，开户不收取任何费用。知晓并同意江苏移动将本人身份及银行卡信息提供招商银行进行包括但不限于监管及发卡机构的验证，并将开户生成的卡号提供给江苏移动。
                            </p>
                        </div>
                        <div v-if="pufaservice" class="pufabank">
                            <!-- 原判断 -->
                            <!-- v-if="pufaservice" -->
                            <span>我已阅读并同意</span>
                          <template  v-if="!displayConfigurationName">
                            <a href="javascript:;" @click.prevent="qiIsShow(1)"
                                >《浦发银行借记卡服务协议》</a
                            >
                            <a href="javascript:;" @click.prevent="qiIsShow(2)"
                                >《浦发银行电子银行个人客户服务协议》</a
                            >
                            <a href="javascript:;" @click.prevent="qiIsShow(3)"
                                >《浦发银行借记卡章程》</a
                            >
                            <a href="javascript:;" @click.prevent="qiIsShow(4)"
                                >《浦发银行个人网上快捷支付业务客户服务协议》</a
                            >
                            <a href="javascript:;" @click.prevent="qiIsShow(5)"
                                >《浦发银行个人开户申请书开户须知》</a
                            >
                            <!--                            <a href="javascript:;" @click.prevent="qiIsShow(6)"-->
                            <!--                                >《浦发银行资讯服务》</a-->
                            <!--                            >-->
                            <a href="javascript:;" @click="qiIsShow(7)"
                                >《用户授权协议》</a
                            >
                             <a href="javascript:;" @click="qiIsShow(9)"
                                >《和包授权协议》</a
                            >
                            <a href="javascript:;" @click="qiIsShow(10)"
                                >《和包隐私权政策》</a
                            >
                            <a href="javascript:;" @click="qiIsShow(11)"
                                >《和包支付业务用户服务协议》</a
                            >
                          </template>
                          <template v-else>
                           <a href="javascript: ;" @click.prevent="qiIsShow(1)">{{displayConfigurationName}}</a>
                          </template>
                            <a href="javascript:;" @click="qiIsShow(8)"
                                >《移动钱包业务受理协议》</a
                            >
                            <p class="pfnote">
                                本人充分了解并清楚知晓出租、出借、出售、购买账户的相关法律责任和惩戒措施，承诺依法依规开立和使用本人账户。
                            </p>
                            <p
                                class="pfnote"
                                style="color: red; font-weight: bold"
                            >
                                同意开通浦发银行电子账户，开户不收取任何费用。知晓并同意江苏移动将本人身份及银行卡信息提供浦发银行进行包括但不限于监管及发卡机构的验证，并将开户生成的卡号提供给江苏移动。
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    v-if="hideshow"
                    :class="btnconfirm ? '' : 'actcodebtn'"
                    class="codebtn"
                    type="button"
                    @click="userDetermine"
                >
                    获取验证码
                </button>
            </div>
        </div>

        <!-- 弹框 -->
        <div v-if="showTankuang" class="tankuang">
            <div v-if="!submitError" class="pic_bg">
                <div
                    class="cha"
                    @click="reSubmit(), (showTankuang = false)"
                ></div>
                <div
                    v-if="imageList['reader0'].length == 0"
                    id="B01"
                    class="zxj_icon"
                >
                    <md-image-reader
                        :mime="mimes"
                        name="reader0"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        @select="onReaderSelect"
                    ></md-image-reader>
                </div>
                <div
                    v-for="(item, index) in imageList['reader0']"
                    :key="index"
                    :style="{
                        backgroundImage: `url(${item})`,
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }"
                    class="bankPic"
                ></div>
            </div>
            <!-- 上传失败弹框 -->
            <div
                v-if="submitError"
                :style="{
                    backgroundImage: `url(${updateFail})`,
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }"
                class="pic_bg"
            >
                <div id="E01" class="reload" @click="reSubmit"></div>
                <div v-if="imageList['reader0'].length == 0" class="zxj_icon">
                    <md-image-reader
                        :mime="mimes"
                        name="reader0"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        @select="onReaderSelect"
                    ></md-image-reader>
                </div>
                <div
                    v-for="(item, index) in imageList['reader0']"
                    :key="index"
                    :style="{
                        backgroundImage: `url(${item})`,
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }"
                    class="bankPic"
                ></div>
            </div>
            <button
                id="D01"
                :class="submitPic ? 'actcodebtn' : ''"
                class="submit"
                type="button"
                @click="submit"
            >
                确认提交
            </button>
        </div>
        <!-- 发送验证码弹框 -->
        <div v-if="showYZM" class="tankuang">
            <div class="main">
                <div class="title">请输入短信验证码</div>
                <p class="cardPhone">
                    已发送至手机<span>{{
                        cardPhone.replace(/(\d{3})\d*(\d{4})/, "$1****$2")
                    }}</span>
                </p>
                <div class="phoneNum">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <input
                        id="A02"
                        v-model="lastidno"
                        class="infor_ipt"
                        maxlength="6"
                        type="text"
                        v-on:input="watchCode"
                    />
                </div>
                <p v-if="resend" class="resend">
                    <span>{{ seconds }}</span
                    >秒后可点击此重新发送
                </p>
                <p
                    v-if="!resend"
                    id="A03"
                    class="resend"
                    @click="userDetermine"
                >
                    点此重新发送
                </p>
                <div class="btns">
                    <button
                        class="quxiao"
                        type="button"
                        @click="cancelYZM"
                    >
                        取消
                    </button>
                    <button
                        id="A04"
                        :class="[actsend ? '' : 'actsend-code']"
                        class="tijiao"
                        type="button"
                        @click="checkInfor()"
                    >
                        提交
                    </button>
                </div>
            </div>
        </div>
        <!-- 弹出层 -->
        <md-popup
            v-model="showPopup"
            :hasMask="true"
            :maskClosable="false"
            position="bottom"
        >
            <div class="addBanks">
                <div class="title">
                    <div
                        class="tianjia"
                        @click="(showPopup = false), (showIcon = !showIcon)"
                    >
                        <img
                            alt=""
                            src="../../assets/images/openBanks/icon_tianjia.png"
                        />
                    </div>
                    <p>请选择需要添加的银行卡</p>
                </div>
                <div class="content">
                    <div
                        v-for="(item, index) in chuxuCards"
                        :key="index"
                        class="bankCards"
                    >
                        <div
                            class="banksimg"
                            style="
                                display: flex;
                                justify-content: flex-start;
                                width: 750px;
                            "
                        >
                            <img :src="item.logoImage" alt="" />
                            <p>
                                {{ item.bnknm + item.cardtyp }}({{
                                    item.cardno
                                }})
                            </p>
                        </div>
                        <div
                            v-if="showRound"
                            :class="showGou == index ? 'noRound' : ''"
                            class="round"
                            @click="roundOrgou(item, index)"
                        >
                            <img
                                alt=""
                                src="@/assets/images/openBanks/round.png"
                            />
                        </div>
                        <div v-if="showGou == index" class="round">
                            <img
                                alt=""
                                src="@/assets/images/openBanks/gou.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </md-popup>
        <!-- 银行 -->
        <div
            v-if="showbanks"
            id="popup-banks"
            class="popup popup-bottom popup-banks"
        >
            <div class="popup-bottom__head">
                <a
                    class="close"
                    href="javascript:;"
                    @click="showbanks = false"
                ></a>
                <h3 class="popup-bottom__title">支持绑定的银行列表</h3>
            </div>
            <div class="popup-banks-main">
                <img
                    alt=""
                    class="banks-title"
                    src="@/assets/images/banks_title.png"
                />
                <div id="bankslist" class="banks-scroll">
                    <img
                        alt=""
                        class="banks-pic"
                        src="@/assets/images/banks.png"
                    />
                </div>
            </div>
        </div>

        <comprehensiveSi
            v-if="orShow"
            :siver="val"
            v-on:isFlase="isFlase"
        ></comprehensiveSi>
        <comprehensiveQi
            v-if="orShowQi"
            :siver="val"
            v-on:isFlaseQi="isFlaseQi"
            :isDisplayConfiguration='isDisplayConfiguration'
            :displayConfigurationAgreementCont='displayConfigurationAgreementCont'
        ></comprehensiveQi>

    </div>
</template>

<script>
import comprehensiveSi from '@/components/comprehensiveSi.vue';
import comprehensiveQi from '@/components/comprehensiveQi.vue';
import mdHeader from '@/components/mdHeader';
import api from '@/common/apiUrls';
// import InputWithValidation from '@/components/InputWithValidation';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import { compressImage } from '@/common/yasuoImg.js';
import CryptoJS from 'crypto-js';
import {
    DatePicker,
    Field,
    Icon,
    ImageReader,
    InputItem,
    Tag,
    Toast
} from 'mand-mobile';

export default {
    name: 'walletOpenAccValiCode',
    components: {
        mdHeader,
        [InputItem.name]: InputItem,
        [Field.name]: Field,
        [Icon.name]: Icon,
        [ImageReader.name]: ImageReader,
        [Tag.name]: Tag,
        [DatePicker.name]: DatePicker,
        comprehensiveSi,
        comprehensiveQi
    },
    data() {
        return {
            val: '',
            orShow: '',
            orShowQi: '',
            isClick: false,
            userName: '',
            idCardNo: '',
            bankcd: '',
            chuxuCards: [],
            showbanks: false,
            encodePassword: '',
            encodePasswordList: [], // 加密银行卡好列表
            passwordList: [],
            showJiaobiao: false,
            showRound: true,
            showGou: 100,
            usrBnkInfos: [], // ecp银行卡列表
            showPopup: false, // 显示弹出层
            lastidno: '',
            actsend: true,
            resend: true,
            showYZM: false,
            seconds: 60,
            showIcon: true,
            submitError: false,
            updateFail: require('../../assets/images/openBanks/error_bg.png'),
            imgStr: '',
            submitPic: false,
            imageList: {
                reader0: []
            },
            mimes: ['bmp', 'jpg', 'png', 'gif', 'webp', 'heif', 'heic', 'jpeg'],
            showTankuang: false,
            noShow: true,
            isXy: true,
            isYx: false,
            cmbservice: false,
            pufaservice: true,
            orShow: false,
            orShowQi: false,
            hasInputBankno: false,
            supportbk: false,
            bankname: '', // 银行名称
            hasInputPhone: false,
            mobile: '',
            // 倒计时秒数
            countdown: 60,
            // 定时器
            timer: null,
            // 发送按钮可否点击
            send: false,
            smsCode: '',
            smsMsg: '获取验证码',
            bankno: '',
            bankCd: '',
            orgcode: '',
            cardPhone: '',
            showmob: '',
            sslx: '',
            sourceChannel: '',
            typeid: '10010', // 渠道号
            btnconfirm: true,
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_OPENACCOUNT_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_OPENACCOUNT_VALCODE_A02'
                },
                {
                    id: 'A03',
                    touchCode: 'WAP_T_OPENACCOUNT_VALCODE_A03'
                },
                {
                    id: 'A04',
                    touchCode: 'WAP_T_OPENACCOUNT_VALCODE_A04'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_OPENACCOUNT_01_B01'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_OPENACCOUNT_01_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_OPENACCOUNT_01_C02'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_OPENACCOUNT_01_E01'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_OPENACCOUNT_01_F01'
                },
                {
                    id: 'H02',
                    touchCode: 'WAP_T_WALLETCARDCENTER_01_H02'
                }
            ],
            fxmobile: '',
            isFistOpen: '', // 是否为第一次开户
            ZFbackID: '',
            docmHeight:
                document.documentElement.clientHeight
                || document.body.clientHeight,
            showHeight:
                document.documentElement.clientHeight
                || document.body.clientHeight,
            hideshow: true,
            accessSource: '00',
            timmer: null,
            querydataList: '',
            displayConfigurationName:'',//配置协议名称
            displayConfigurationAgreementCont:'',// 配置的协议内容
            isDisplayConfiguration:false //是否显示配置的协议
        };
    },
    // watch: {
    //     smsCode: {
    //         handler(val) {
    //             this.btnconfirm = !(val && val.length === 6);
    //         }
    //     }
    // },

    watch: {
        // 监听显示高度
        showHeight() {
            if (this.docmHeight > this.showHeight) {
                // 隐藏
                this.hideshow = false;
            } else {
                // 显示
                this.hideshow = true;
            }
        },
        bankno(newVal, Val) {
            if (this.orgcode == 'BOCM') {
                this.btnconfirm = !(
                    this.bankname
                    && newVal.length >= 16
                    && newVal.length <= 19
                    && this.cardPhone.length && this.cardPhone.length >= 11
                );
            } else {
                this.btnconfirm = !(
                    this.isYx
                    && this.bankname
                    && newVal.length >= 16
                    && newVal.length <= 19
                    && this.cardPhone.length && this.cardPhone.length >= 11
                    && this.orgcode != 'BOCM'
                );
            }
        },
        cardPhone(newVal, Val) {
            if (this.orgcode == 'BOCM') {
                this.btnconfirm = !(
                    this.bankname
                    && this.bankno.length >= 16
                    && this.bankno.length <= 19
                    && newVal.length >= 11
                );
            } else {
                this.btnconfirm = !(
                    this.isYx
                    && this.bankname
                    && this.bankno.length >= 16
                    && this.bankno.length <= 19
                    && newVal.length >= 11
                    && this.orgcode != 'BOCM'
                );
                console.log(this.btnconfirm);
            }
        }
    },
    created() {
        this.querydataList = window.sessionStorage.getItem("saveQuery") || ''
        var data = {}
        if(this.querydataList) {
            data = JSON.parse(this.querydataList)
        }
        console.log(data,'---------------------')
        // console.log('++++++++++++++',this.$route.query.sourceChannel)
        this.queryAcpList(); // 银行快捷绑卡查询
        this.queryWalAcpList(); // 加密银行卡号查询
        // this.bankno = this.$route.query.bankno;
        this.orgcode = this.$route.query.orgcode || data.orgcode || null;
        this.cardPhone = this.$route.query.cardPhone;
        this.sslx = this.$route.query.sslx || data.sslx || null;
        this.bankCd = this.$route.query.bankCd;
        this.mobile = store2.default.get('usrmob');
        console.log(
            '----------------------------',
            this.$route.query.isGroupNum,
            '+++++',
            this.$route.query.idCardNo,
            this.$route.query.userName
        );

        if (this.$route.query.isGroupNum == '1') {
            this.idCardNo = this.$route.query.idCardNo;
            this.userName = this.$route.query.userName || data.userName || '';
        }
        // this.showmob = this.cardPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        // 支付项目返回地址id
        this.ZFbackID = this.$route.query.ZFbackID || '';
        this.sourceChannel = this.$route.query.sourceChannel || '';
        // console.log('7777777777',this.$route.query.sourceChannel,'777777777')
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
            this.fxmobile = this.$route.query.fxmobile;
        }
        this.getValidStr();
        this.timer = setInterval(this.getValidStr, 1000);
        initPageJs(this.$route.meta.pageName, this.touchArr);
        this.getIsFirst();
        if (this.orgcode == 'CMB') {
            this.cmbservice = true;
            this.pufaservice = false;
        } else if (this.orgcode == 'SPDB') {
            this.cmbservice = false;
            this.pufaservice = true;
        } else if (this.orgcode == 'BOCM') {
            this.noShow = false;
            // this.cmbservice = false;
            // this.pufaservice = false;
        }
        if (this.$client.LEADEON) {
            this.accessSource = '01';
        } else if (this.$client.JSMCC) {
            this.accessSource = '02';
        } else {
            this.accessSource = '00';
        }
    },
    mounted() {
        if (store2.default.get('isYx')) {
            this.isYx = store2.default.get('isYx');
            this.checkBtnShow();
            setTimeout(() => {
                store2.default.remove('isYx');
            }, 500);
        }
        if (window.sessionStorage.getItem('banksInfo')) {
            this.showUserInfo();
        }
        // 监听事件
        window.onresize = () => (() => {
            this.showHeight = document.documentElement.clientHeight
                    || document.body.clientHeight;
        })();
        this.checkBtnShow();
        this.getAgreement()
    },
    methods: {
       // 获取协议
        getAgreement() {
            api.huataiAgreement({
                businessCode: 'jr-pfkhxy'
            }).then((res) => {
                this.isDisplayConfiguration = true
                this.displayConfigurationName = res.agreementName
                this.displayConfigurationAgreementCont = res.content.replaceAll(
                    'px',
                    ''
                );
            })
        },
        isFlaseQi(a) {
            // this.orShowQi = a;
            // this.isYx = !a;
            store2.default.set('isFlaseQi', false);
            store2.default.set('isAgreeQi', true);
            store2.default.set('hadclick', '01');
            this.orShowQi = '';
            this.isYx = true;
            this.checkBtnShow();
        },
        isFlase(a) {
            // this.orShow = a;
            // this.isYx = !a;
            store2.default.set('isFlase', false);
            store2.default.set('hadclick', '01');
            this.orShow = '';
            this.isYx = true;
            this.checkBtnShow();
        },
        // 保存用户信息
        saveUserInfo() {
            var item = {}
            if(this.querydataList) {
                item = JSON.parse(this.querydataList)
            }
            const data = {
                taxobj: this.taxobj,
                bankno: this.bankno,
                bankname: this.bankname,
                cardPhone: this.cardPhone,
                bankcd: this.bankcd,
                usrname: this.usrname,
                usridno: this.usridno,
                job: this.$route.query.job || '',
                workCode: this.$route.query.workCode || item.workCode || '',
                areaName: this.$route.query.areaName || item.areaName || '',
                cityName: this.$route.query.cityName || item.cityName || '',
                district: this.$route.query.district || item.district || '',
                sourceChannel: this.sourceChannel || '',
                address: this.$route.query.address || item.address || ''
            };
            window.sessionStorage.setItem('banksInfo', JSON.stringify(data));
        },
        // 显示用户数据
        showUserInfo() {
            const data = JSON.parse(window.sessionStorage.getItem('banksInfo'));
            this.taxobj = data.taxobj;
            this.bankno = data.bankno;
            this.bankname = data.bankname;
            this.cardPhone = data.cardPhone;
            this.bankcd = data.bankcd;
            this.usrname = data.usrname;
            this.usridno = data.usridno;
            window.sessionStorage.removeItem('banksInfo');
        },
        jiaobiaoBack() {
            this.showIcon = !this.showIcon;
            this.showPopup = true;
        },
        jiaobiaoDown() {
            this.showIcon = !this.showIcon;
            this.showPopup = false;
        },
        // 点击圆显示勾
        roundOrgou(item, index) {
            this.showGou = index;
            console.log(this.passwordList);
            this.bankno = this.passwordList[index]; // 加密银行卡列表
            // this.bankno = item.cardno;  // ecp银行卡列表
            this.bankname = item.bnknm;
            this.showPopup = false;
            this.showIcon = !this.showIcon;
        },
        // 上传图片
        submit() {
            this.submitPic = false;
            api.BankIdentification({
                imgStr: this.imgStr
            })
                .then((res) => {
                    if (res.cardNum == '' || res.bank == '') {
                        this.submitError = true;
                        this.submitPic = false;
                    } else {
                        this.bankno = res.cardNum;
                        this.showTankuang = false;
                        this.imageList.reader0.splice(0, 1);
                        this.watchNo();
                    }
                })
                .catch((err) => {
                    this.submitError = true;
                    this.submitPic = false;
                    Toast.failed(err.msgInfo);
                    console.log(err);
                });
        },
        // 重新上传图片
        reSubmit() {
            this.imageList.reader0.splice(0, 1);
            this.submitError = false;
            this.submitPic = false;
        },
        // 点击输入框未填写离开时，显示提示
        inputPhoneWarning() {
            if (!this.cardPhone) {
                this.hasInputPhone = true;
            } else {
                this.hasInputPhone = false;
            }
        },
        // 校验验证码长度
        watchCode() {
            if (this.lastidno.length === 6) {
                this.actsend = false;
            }
        },
        // 校验预留手机号,用户名
        watchMob() {
            this.checkBtnShow();
            // if(this.usrname===''||this.usridno.length<18){
            //     this.noShow = false
            // }
        },
        // 点击输入框未填写离开时，显示提示
        inputBanknoWarning() {
            if (!this.bankno) {
                this.hasInputBankno = true;
            } else {
                this.hasInputBankno = false;
            }
        },
        // 展示支持银行
        viewbanks() {
            this.showbanks = true;
        },
        // 校验银行卡号
        watchNo(name, value) {
            // this.bankno = value;
            if (this.bankno === '') {
                this.supportbk = false;
                return false;
            }
            this.hasInputBankno = false;
            console.log(this.bankno, '银行卡长度', this.bankno.length);
            if (this.bankno.length == 1) {
                this.$nextTick(() => {
                    this.bankname = '';
                });
            } else if (this.bankno.length >= 16 && this.bankno.length <= 20) {
                // api.BankIdentification({
                //     imgStr:this.imgStr
                // })
                // .then((res) => {
                //     this.bankno = res.cardNum;
                //     this.bankname = res.bank
                // })
                // .catch((err) => {
                //     this.$toast.info(err.msgInfo);
                // })
                api.checkUsrBank({
                    cardNo: this.bankno,
                    orgcode: this.orgcode
                })
                    .then((data) => {
                        console.log(data);
                        this.supportbk = false;
                        this.bankname = data.bankName;
                        this.bankcd = data.bankCode;
                        this.checkBtnShow();
                    })
                    .catch((err) => {
                        if (err.msgCd === 'BUS20017') {
                            // 用户未登录，跳转登录
                        } else if (err.msgCd === 'BUS070010') {
                            this.supportbk = true;
                        } else {
                            this.$toast.info(err.msgInfo);
                        }
                    });
            } else if (this.bankno.length > 19) {
                this.bankno = this.bankno.slice(0, 19);
            }
            this.checkBtnShow();
        },
        // 银行快捷绑卡查询
        queryAcpList() {
            api.newBank
                .acpList({})
                .then((res) => {
                    res.usrBnkInfos.forEach((item) => {
                        if (item.cardtyp === '储蓄卡') {
                            this.chuxuCards.push(item);
                        }
                    });
                    if (this.chuxuCards.length > 0) {
                        this.showJiaobiao = true;
                    }
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 获取加密银行卡
        queryWalAcpList() {
            api.newBank
                .walAcpList({})
                .then((res) => {
                    this.encodePasswordList = res.usrBnkInfos;
                    console.log(
                        res.usrBnkInfos,
                        '---encodePasswordList---',
                        this.encodePasswordList
                    );
                    this.aesDecode(this.encodePasswordList);
                })
                .catch((err) => {
                    console.log('error', err);
                });
        },
        aesDecode(encodePassword) {
            encodePassword.forEach((res) => {
                const d = res.cardno.substr(9);
                const key = CryptoJS.enc.Latin1.parse('idhnlsjd02n239n2');
                const iv = CryptoJS.enc.Latin1.parse('63jdh9s2l0vhryuy');
                const decrypted = CryptoJS.AES.decrypt(d, key, {
                    iv,
                    padding: CryptoJS.pad.ZeroPadding
                });
                const password = decrypted.toString(CryptoJS.enc.Utf8);
                if (res.cardtyp === '储蓄卡') {
                    this.passwordList.push(password);
                }
                return password;
            });
            console.log(this.passwordList);
        },
        // 点击勾选协议
        checkbox() {
            this.saveUserInfo();
            if (store2.default.get('xieyi')) {
                this.isYx = !this.isYx;
            } else {
                if (this.cmbservice) {
                    // this.$store.commit("comprehensiveSi", true);
                    this.siIsShow(1);
                }
                if (this.pufaservice) {
                    // this.$store.commit("comprehensiveQi", true);
                    this.qiIsShow(1);
                }
                this.orShow = true;
                this.orShowQi = true;
            }
            console.log('我保存了', this.isYx);
            this.checkBtnShow();
            store2.default.set('isYx', this.isYx);
        },
        // 检验验证码是否可点击
        checkBtnShow() {
            if (
                this.bankno
                && this.cardPhone.length >= 11
                && this.isYx
                && this.bankname
                && this.orgcode != 'BOCM'
            ) {
                this.btnconfirm = false;
            } else if (
                this.orgcode == 'BOCM'
                && this.bankno
                && this.cardPhone.length >= 11
                && this.bankname
            ) {
                this.btnconfirm = false;
            } else {
                this.btnconfirm = true;
            }
        },
        siIsShow(a) {
            this.orShow = true;
            this.$store.commit('comprehensiveSi', true);
            this.val = a;
            this.saveUserInfo();
            // this.$router.push({
            //     name: 'comprehensive',
            //     query: {
            //         ...this.$route.query,
            //         orShowQi: false,
            //         orShow: true,
            //         val: a
            //     }
            // });
            store2.default.set('isYx', this.isYx);
        },
        qiIsShow(a) {
            this.orShowQi = true;
            this.$store.commit('comprehensiveQi', true);
            this.val = a;
            this.saveUserInfo();
            // this.$router.push({
            //     name: 'comprehensive',
            //     query: {
            //         ...this.$route.query,
            //         orShowQi: true,
            //         orShow: false,
            //         val: a
            //     }
            // });
            store2.default.set('isYx', this.isYx);
        },
        // 发送开户短信
        userDetermine() {
            this.timeoutChangeStyle();
            this.saveUserInfo();
            this.resend = true;
            // this.btnconfirm = true;
            this.showYZM = true;
            console.log(999);
            if (this.orgcode == 'BOCM') {
                var data = JSON.parse(this.querydataList)
                api.sendMsgOpenAcct({
                    sslx: this.$route.query.sslx || data.sslx,
                    bsm: '',
                    devicecos: '',
                    callbackurl: 'http://baidu.com',
                    cardNo: this.bankno,
                    bankNum: this.bankcd,
                    orgcode: this.orgcode,
                    cardPhone: this.cardPhone,
                    fxmobile: this.fxmobile,
                    imageOrderNo: this.$route.query.imageOrderNo || data.imageOrderNo || null,
                    address: this.$route.query.address || data.address || null,
                    cityName: this.$route.query.cityName || data.cityName || null,
                    livingOrderNo: this.$route.query.livingOrderNo || data.livingOrderNo || null,
                    workCode: this.$route.query.workCode || data.workCode || null,
                    areaName: this.$route.query.areaName || data.areaName || null,
                    district: this.$route.query.district || data.district || null,
                    sourceChannel: this.sourceChannel,
                    userName: this.$route.query.userName || data.userName || null,
                    typeId: this.typeid
                })
                    .then((data) => {
                        console.log(data);
                        if (!this.timer) {
                            this.getValidStr();
                            this.timer = setInterval(this.getValidStr, 1000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.msgCd !== 'BUS00000') {
                            this.$toast.info(err.msgInfo);
                            if (err.msgCd === 'BUS20017') {
                                // 用户未登录，跳转登录
                            }
                        }
                    });
                return;
            }
            let madianData = {};
            if (this.typeid === 'madian') {
                madianData = {
                    jobNum: store2.default.get('madianJobNum'),
                    userBusiNum: store2.default.get('madianUserbusiNum')
                };
            }
            api.sendMsgOpenAcct(
                Object.assign({
                    bsm: '',
                    callbackurl: 'http://baidu.com',
                    cardNo: this.bankno,
                    bankNum: this.bankcd,
                    devicecos: '',
                    orgcode: this.orgcode,
                    cardPhone: this.cardPhone,
                    sslx: this.sslx,
                    typeId: this.typeid,
                    fxmobile: this.fxmobile,
                    idCardNo: this.idCardNo,
                    userName: this.userName,
                    sourceChannel: this.sourceChannel
                }),
                madianData
            )
                .then((data) => {
                    console.log(data);
                    if (!this.timer) {
                        this.getValidStr();
                        this.timer = setInterval(this.getValidStr, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if (err.msgCd !== 'BUS00000') {
                        this.$toast.info(err.msgInfo);
                        if (err.msgCd === 'BUS20017') {
                            // 用户未登录，跳转登录
                        }
                    }
                });
        },
        getValidStr() {
            if (this.countdown > 0 && this.countdown <= 60) {
                this.countdown -= 1;
                const times = this.countdown;
                if (this.countdown !== 0) {
                    this.send = true;
                    this.smsMsg = `重新获取(${times}s)`;
                } else {
                    clearInterval(this.timer);
                    this.send = false;
                    this.smsMsg = '重新获取';
                    this.countdown = 60;
                    this.timer = null;
                }
            }
        },
        // 开户验证码校验
        checkInfor() {
            if (this.isClick) {
                return;
            }
            let recordUrl = window.location.href;
            let recordIndex
            if( recordUrl.indexOf('?') > -1) {
                recordIndex = recordUrl.indexOf('?')
            } else {
                recordIndex = recordUrl.length
            }
            recordUrl = recordUrl.slice(0, recordIndex);
            this.$store.commit('LOADING', true);
            this.isClick = true;
            api.valiOpenAcctCode({
                smscode: this.lastidno,
                parentChannel: this.$route.query.parchn || '',
                childChannel: this.$route.query.gytype || '',
                pageUrl: window.location.href || '',
                accessSource: this.accessSource,
                orgCode: this.orgcode
            })
                .then((data) => {
                    this.$store.commit('LOADING', false);
                    console.log(data);
                    this.isClick = false;
                    this.$router.push({
                        name: 'walletOpenAccResult',
                        query: {
                            typeId: this.typeid,
                            fxmobile: this.fxmobile,
                            orgcode: this.orgcode,
                            isFistOpen: this.isFistOpen,
                            ZFbackID: this.ZFbackID
                        }
                    });
                })
                .catch((err) => {
                    this.$store.commit('LOADING', false);
                    this.isClick = false;
                    if (err.msgCd !== 'BUS00000') {
                        if (err.msgInfo.indexOf('验证码') !== -1) {
                            this.$toast.info(err.msgInfo);
                        } else if (err.msgCd === '-53') {
                            this.$router.push({
                                name: 'walletOpenAccResult',
                                query: {
                                    openfail: 1,
                                    failreason: '银行系统维护中，请次日重试',
                                    typeId: this.typeid,
                                    fxmobile: this.fxmobile,
                                    orgcode: this.orgcode,
                                    isFistOpen: this.isFistOpen,
                                    ZFbackID: this.ZFbackID
                                }
                            });
                        } else {
                            this.$router.push({
                                name: 'walletOpenAccResult',
                                query: {
                                    openfail: 1,
                                    failreason: err.msgInfo,
                                    typeId: this.typeid,
                                    fxmobile: this.fxmobile,
                                    orgcode: this.orgcode,
                                    isFistOpen: this.isFistOpen,
                                    ZFbackID: this.ZFbackID
                                }
                            });
                        }
                    }
                });
        },
        // 倒计时
        timeoutChangeStyle() {
            // if (this.seconds == 0) {
            //     this.resend = false;
            //     this.seconds = 60;
            // } else {
            //     setTimeout(() => {
            //         this.timeoutChangeStyle();
            //     }, 1000);
            // }
            // this.seconds--;
            this.timmer = setInterval(() => {
                this.seconds--;
                if(this.seconds == 0) {
                    clearInterval(this.timmer);
                    this.resend = false;
                    this.seconds = 60;
                }
            },1000)
        },
        cancelYZM() {
            this.showYZM = false;
            clearInterval(this.timmer);
            this.resend = false;
            this.seconds = 60;
        },
        getIsFirst() {
            api.firstCheck({
                orgCode: this.orgcode,
                mblNo: this.mobile
            })
                .then((res) => {
                    if (res.isNewFlag === '1' || res.isNewFlag === 1) {
                        this.isFistOpen = '1';
                    } else {
                        this.isFistOpen = '0';
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo || '请稍后再试', 3000, true);
                });
        },
        onReaderSelect(name, { files }) {
            files.forEach((file) => {
                console.log(
                    '[Mand Mobile] ImageReader Selected:',
                    `File Name ${file.name}`
                );
            });
            Toast.loading('图片读取中...');
        },
        onReaderComplete(name, { dataUrl, file }) {
            Toast.hide();
            compressImage(dataUrl, {
                width: 750,
                quality: 1
            }).then((result) => {
                this.imgStr = result;
            });
            // this.imgStr = dataUrl;
            // console.log(this.imgStr);
            setTimeout(() => {
                const demoImageList = this.imageList[name] || [];
                demoImageList.push(dataUrl);
                this.$set(this.imageList, name, demoImageList);
                this.submitPic = true;
            }, 100);
        },
        onReaderError(name, { msg }) {
            Toast.failed(msg);
        }
    },
    destroyed() {
        store2.default.set('isAgreeQi', false);
        window.sessionStorage.setItem("saveQuery",'')
    }
};
</script>
<style lang="less" scoped>
.box {
    height: 100vh;
    background: #f6f6f6;
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
        background: #ffffff;

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
            font-size: 36px;
            //font-size: ;
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
                border: 2px solid #ccc;
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
            color: #ccc;
            font-size: 24px;
        }
    }

    .pic_bg {
        position: relative;
        width: 530px;
        height: 402px;
        background: url("../../assets/images/openBanks/pic_bg.png") no-repeat;
        background-size: 100%;

        .cha {
            position: absolute;
            right: 10px;
            top: 15px;
            width: 40px;
            height: 40px;
            background: url("../../assets/images/openBanks/icon_tianjia.png")
                no-repeat;
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
        border-radius: 0.1rem;
        color: #fff;
        pointer-events: none;
        font-size: 22px;
        font-weight: 500;
        border: none;
    }

    .reload {
        width: 40px;
        height: 30px;
        position: absolute;
        left: 430px;
        top: 35px;
    }

    .zxj_icon {
        position: absolute;
        top: 176px;
        left: 213px;
        width: 102px;
        height: 102px;
        background: url("../../assets/images/openBanks/xiangji_icon.png")
            no-repeat;
        background-size: 100%;
    }

    .actcodebtn {
        background: #0195ff;
        pointer-events: inherit;
    }

    .btns {
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
        font-size: 36px;

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
        color: #49bfff;
    }

    .tijiao {
        width: 250px;
        height: 70px;
        pointer-events: none;
        background: #8ec4f6;
        color: #f2f2f2;
        border-radius: 5px;
    }
}

.account-index-wrapper {
    background: #f5f5f5;

    .open-progress {
        width: 100%;
        height: 2.7rem;
        background: #fff;

        .progress-pic {
            width: 6.4rem;
            margin: 0 auto;
            display: flex;
            align-items: center;
            margin-bottom: 0.28rem;

            img {
                width: 0.79rem;
                height: 0.79rem;
                margin-top: 0.75rem;
            }

            div {
                width: 2rem;
                height: 0.04rem;
                background: #cdcdcd;
                border-radius: 0.05rem;
                margin-top: 0.7rem;
                margin-top: 0.7rem;
                margin-left: 0.05rem;
                margin-right: 0.05rem;
            }

            .actline {
                background: #0195ff;
            }
        }

        .txt-progress {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 6.4rem;
            margin: 0 auto;

            span {
                color: #999;
                font-size: 0.32rem;
            }

            .act-progress {
                color: #0195ff;
            }
        }
    }

    .account-form {
        font-size: 0.32rem;
        margin-top: 0.2rem;
        color: #171717;
        background: #fff;
    }

    .account-form .form__section {
        padding: 0 0.2rem;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
    }

    .account-form .login__block {
        position: relative;
        margin: 0 auto;
        border-bottom: 1px solid #e1e1e1;
    }

    .account-form .login__block:nth-last-of-type(1) {
        border-bottom: 0;
    }

    .account-form .form__block {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height: 1rem;
        line-height: 1rem;
        padding: 0 0.2rem;
    }

    .account-form .form__main {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin-left: 20px;
        position: relative;
        text-align: right;
    }

    .account-form .form__main input {
        text-align: right;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        font-size: 0.3rem;
        color: #666666;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: none;
    }

    .account-form .form__main ::-webkit-input-placeholder {
        color: #c2c2c2;
    }

    .account-form .form__main input:disabled {
        -webkit-opacity: 1;
        opacity: 1;
        color: #666;
        -webkit-text-fill-color: #666;
    }

    .account-form .arrow {
        width: 0.15rem;
        height: 0.15rem;
        margin-left: 0.12rem;
        border-right: 0.03rem solid #999;
        border-top: 0.03rem solid #999;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        border-left: 0.03rem solid transparent;
        border-bottom: 0.03rem solid transparent;
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        float: right;
        position: absolute;
        right: 0rem;
        top: 0.4rem;
    }

    .account-form .vertify-code {
        position: absolute;
        right: -0.2rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        height: 100%;
        color: #238ff2;
        font-size: 0.3rem;
        border-left: 1px solid #e1e1e1;
        width: 2.2rem;
        top: 0;
    }

    .account-form .vertify-code-gray {
        color: #666;
        background-color: #efefef;
    }

    .login__block .pic {
        position: absolute;
        top: 30px;
        right: 30px;
        display: flex;
        justify-content: center;
        margin-top: 5px;
        margin-left: 7px;

        .back {
            margin-left: 10px;
            margin-right: 10px;

            img {
                width: 14px;
                height: 24px;
            }
        }

        .down {
            margin-right: 6px;
            margin-top: -5px;

            img {
                width: 24px;
                height: 14px;
            }
        }

        .xiangji {
            img {
                width: 38px;
                height: 32px;
            }
        }
    }

    .agreement-outer {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding-right: 0.2rem;
        margin-top: 0.2rem;

        .agreement-info {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 0.1rem;

            .xy_false {
                width: 0.31rem;
                height: 0.31rem;
                background: url("../../assets/images/check-off.png") no-repeat;
                background-size: 100% 100%;
                margin-right: 0.2rem;
                border-radius: 50%;
            }

            .xy_true {
                width: 0.31rem;
                height: 0.31rem;
                background: url("../../assets/images/check-on.png") no-repeat;
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
    }

    .input-error {
        padding: 0.2rem;
        border-top: 0.02rem solid #ff1414;
        font-size: 0.26rem;
        background: #f5f5f5;
    }

    .bank-card-error {
        text-indent: 20px;
        color: #ff1414;
    }

    .bank-card-error .link {
        color: #238ff2;
    }

    .agreement-link {
        font-size: 0.28rem;
        color: #666;
        line-height: 1.8;
    }

    .agreement-link a {
        color: #238ff2;
        text-decoration: none;
    }

    .pfnote {
        font-size: 0.24rem;
        color: #999;
        line-height: 1.5;
    }

    .codebtn {
        position: fixed;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%);
        width: 6.9rem;
        height: 0.9rem;
        background: #8ec4f6;
        border-radius: 0.1rem;
        color: #fff;
        pointer-events: none;
        font-size: 0.36rem;
        font-weight: 500;
        border: none;
    }

    .actcodebtn {
        background: #0195ff;
        pointer-events: inherit;
    }
}

.infor_container {
    width: 100%;
    height: 100%;

    .infor_box {
        width: 6.9rem;
        background: #ffffff;
        border-radius: 0.15rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .infor_title {
        font-size: 0.4rem;
        color: #333333;
        font-weight: 700;
        padding-top: 0.4rem;
        padding-bottom: 0.2rem;
    }

    .infor_mobile {
        font-size: 0.3rem;
        color: #999999;

        i {
            font-style: normal;
        }
    }

    .mobile_box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 0.8rem;
        margin-bottom: 0.2rem;
        margin-top: 0.2rem;

        p {
            width: 0.9rem;
            height: 0.6rem;
            font-size: 0.32rem;
            color: #000000;
            text-align: center;
            border-bottom: 0.02rem solid #dbdbdb;
            margin: 0 0.1rem;
        }
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
        letter-spacing: 0.92rem;
        text-indent: 0.6rem;
        background: transparent;
        z-index: 46;
        color: transparent;
        caret-color: transparent;
        text-shadow: 0 0 0 #000;
    }

    .infor_main {
        width: 100%;
    }

    .infor_bototm {
        width: 100%;
        height: 0.76rem;
    }

    .infor_djs {
        font-size: 0.24rem;
        color: #999999;
        border: 0;
        background: none;
        display: block;
        margin-bottom: 0.2rem;
    }

    .actbtn {
        color: #0195ff;
    }

    .infor_buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 0.35rem;
        padding-top: 0.15rem;

        p {
            width: 2.9rem;
            height: 0.78rem;
            border-radius: 0.15rem;
            font-size: 0.36rem;
            text-align: center;
            line-height: 0.78rem;
        }
    }
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
        border-bottom: 2px solid #ccc;
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
            border-bottom: 2px solid #ccc;

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

        .bankCards:last-child {
            border-bottom: none;
        }
    }
}

#popup-banks {
    display: block;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;

    img {
        vertical-align: top;
        max-width: 100%;
    }
}

.popup-banks {
    min-height: 10.64rem;
    background-color: #fff;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
}

.popup-banks .popup-bottom__head {
    position: relative;
}

.popup-banks .close {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    z-index: 2;
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background: url(../../assets/images/bank_close_icon.png) no-repeat;
    background-size: 100%;
}

.popup-banks .popup-bottom__title {
    font-size: 0.34rem;
    color: #333;
    line-height: 1.3rem;
    text-align: center;
}

.popup-banks .popup-banks-main {
    width: 6.5rem;
    margin: 0 auto;
}

.popup-banks .banks-scroll {
    max-height: 8rem;
    overflow-y: scroll;
}

.popup-banks .banks-scroll {
    max-height: 11rem;
}

/deep/ .md-input-item.right .md-input-item-input {
    text-align: right;
    width: 450px;
}
</style>
