<template>
    <div class="contains">
        <div class="mainContain">
            <div class="topBankBg"></div>

            <div class="fa_InfoBox">
                <div class="add">
                    请添加您本人的银行卡
                    <img src="../../assets/images/newBanks/card-icon.png" />
                </div>
                <div class="InfoBox">
                    <div class="Info">
                        <div class="manname">持卡人姓名</div>
                        <div class="name">{{ userName }}</div>
                    </div>
                </div>

                <ValidationObserver ref="form" v-slot="{ invalid }">
                    <div class="InfoBox">
                        <div class="Info">
                            <div class="manname">银行卡号</div>
                            <div class="name" style="color: #aaa">
                                <!-- <ValidationObserver ref="form" v-slot="{ invalid }"> -->
                                <div style="width: 4.9rem; display: flex">
                                    <InputWithValidation
                                        style="width: 80%"
                                        :hasNoBorder="hasNoBorder"
                                        type="bankCard"
                                        placeholder="请输入您本人的银行卡号"
                                        v-model="formData.bankNo"
                                        maxlength="19"
                                        name="银行卡号"
                                        @change="bankComfirm"
                                    ></InputWithValidation>
                                    <!-- <div class="back" @click.stop="jiaobiaoBack">
                    <img alt="" src="../../assets/images/openBanks/right.png" />
                  </div> -->
                                    <div
                                        class="xiangji"
                                        @click="showTankuang = true"
                                    >
                                        <img
                                            alt=""
                                            src="../../assets/images/openBanks/xiangji.png"
                                        />
                                    </div>
                                </div>
                                <!-- </ValidationObserver> -->
                            </div>
                        </div>
                    </div>
                    <div class="InfoBox" v-if="showBankType">
                        <div class="Info" style="display: flex">
                            <div class="manname">银行卡类型</div>
                            <div class="bankcardSty">
                                <div
                                    class="bankcardSty-btn left"
                                    :class="{ on: pickerValue1 === '01' }"
                                    @click="pickerStr('01')"
                                    id="A01"
                                >
                                    储蓄卡
                                </div>
                                <div
                                    class="bankcardSty-btn"
                                    :class="{ on: pickerValue1 === '02' }"
                                    @click="pickerStr('02')"
                                    id="A02"
                                >
                                    信用卡
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="InfoBox" style="border: none">
                        <div class="Info">
                            <div class="manname">预留手机号</div>
                            <div
                                class="name"
                                style="padding-right: 20px; color: #aaa"
                            >
                                <!-- <ValidationObserver ref="form" v-slot="{ invalid }"> -->

                                <InputWithValidation
                                    :hasNoBorder="hasNoBorder"
                                    type="phone"
                                    placeholder="请输入银行卡对应的预留手机号"
                                    v-model="formData.userMbl"
                                    maxlength="11"
                                    @change="phoneComfirm"
                                ></InputWithValidation>
                            </div>

                            <!-- :btns="msgDialog.btns" mask-closable -->
                            <md-dialog
                                title="请输入短信验证码"
                                :closable="true"
                                v-model="msgDialog.open"
                                class="msgDialog"
                                @hide="hideFun"
                            >
                                <!-- <p class="errorTipss">已发送至手机{{codesendTips}}</p> -->
                                <p
                                    class="errorTipss"
                                    style="text-align: center; color: #333"
                                >
                                    验证码短信已发送至{{ userMobile }}手机
                                </p>

                                <div
                                    style="
                                        height: 0.75rem;
                                        margin-top: 20px;
                                        border-radius: 5px;
                                        border: 1px solid #ededed;
                                        position: relative;
                                        width: 90%;
                                        margin: 20px auto;
                                    "
                                >
                                    <input
                                        class="removeNumStyle"
                                        style="
                                            width: 50%;
                                            height: 95%;
                                            border: none;
                                            padding-left: 10px;
                                            padding-top: 1px;
                                            border-top-left-radius: 30px;
                                        "
                                        type="number"
                                        novalidate="novalidate"
                                        pattern="[0-9]*"
                                        v-model="smsCode"
                                        onkeyup="value=value.replace(/[^\d]/g,'')"
                                    />

                                    <md-button
                                        class="smsBtn"
                                        style="
                                            width: 42%;
                                            height: 100%;
                                            display: inline-block;
                                            border-radius: 0;
                                            box-sizing: border-box;
                                            border-top-right-radius: 5px;
                                            border-bottom-right-radius: 5px;
                                            position: absolute;
                                            right: 0;
                                        "
                                        :type="
                                            buttonType ? 'default' : 'disabled'
                                        "
                                        :style="
                                            buttonStyle
                                                ? '{color:#fff}'
                                                : '{color: #238ff2}'
                                        "
                                        @click="getTimeOutShow"
                                        >{{ buttonTxt }}</md-button
                                    >
                                </div>
                                <!--                                <div-->
                                <!--                                    class="voice"-->
                                <!--                                    style="-->
                                <!--                                        text-align: center;-->
                                <!--                                        margin-top: 0.35rem;-->
                                <!--                                        margin-bottom: 0.25rem;-->
                                <!--                                        font-size: 0.24rem;-->
                                <!--                                    "-->
                                <!--                                >-->
                                <!--                                    收不到短信验证码？点击试试<span-->
                                <!--                                        :style="[-->
                                <!--                                            {-->
                                <!--                                                color: buttonType-->
                                <!--                                                    ? '#1FA3EE'-->
                                <!--                                                    : '#C6C6C6',-->
                                <!--                                            },-->
                                <!--                                            {-->
                                <!--                                                'text-decoration': buttonType-->
                                <!--                                                    ? 'underline #1FA3EE'-->
                                <!--                                                    : 'none',-->
                                <!--                                            },-->
                                <!--                                        ]"-->
                                <!--                                        @click="getVideShow"-->
                                <!--                                        >语音验证码</span-->
                                <!--                                    >-->
                                <!--                                </div>-->
                                <md-button
                                    style="
                                        width: 60%;
                                        margin: 20px auto 10px auto;
                                    "
                                    @click="bindCard"
                                    :type="
                                        smsButtonFlag ? 'default' : 'disabled'
                                    "
                                    >提交绑卡</md-button
                                >
                            </md-dialog>
                        </div>
                    </div>
                </ValidationObserver>
                <div class="sign-note" style="padding: 0.1rem 0.3rem 0 0.3rem">
                    <md-agree
                        v-model="agreeConf.checked"
                        :disabled="agreeConf.disabled"
                        :size="agreeConf.size"
                        icon-type="circle"
                        @change="
                            onChange(agreeConf.name, agreeConf.checked, $event)
                        "
                    >
                        我已同意并阅读<span
                            style="color: #00a4e2"
                            @click="selfAgree()"
                            >《移动钱包业务受理协议》</span
                        >
                    </md-agree>
                </div>
                <p style="color:#aaa;font-size: 0.22rem;padding: 0.1rem 0 0 0.4rem;line-height:0.3rem"> 温馨提示：推荐绑定中国银行、农业银行、交通银行、邮政储蓄、中信银行、平安银行、民生银行、浦发银行、南京银行<br/>
                是否绑卡成功以页面提示为准</p>

                <!-- 按钮 -->
                <div style="margin-top: 30px">
                    <md-button
                        class="wapBtn"
                        id="B01"
                        ref="button"
                        :type="asd"
                        @click="submitInfo()"
                        >下一步</md-button
                    >
                </div>
            </div>

            <div
                class="md-example-child md-example-child-picker md-example-child-picker-2"
            >
                <md-picker
                    ref="picker0"
                    v-model="isPickerShow0"
                    :data="pickerData0"
                    large-radius
                    @confirm="onPickerConfirm(0)"
                    title="证件类型"
                ></md-picker>
            </div>

            <div class="other">
                <!-- 轮播图 -->
                <!-- <div class="bankCards">
          <div class="md-example-child md-example-child-swiper md-example-child-swiper-0">
            <md-swiper ref="swiper_2" :is-prevent="false" :useNative-driver="false" dragable>
              <md-swiper-item>
                <div id="C01" @click="bottomBannner(0)">
                  <img :src="bankEquity[0]" class="banner_img" />
                </div>
              </md-swiper-item>
              <md-swiper-item>
                <div id="C02" @click="bottomBannner(1)">
                  <img :src="bankEquity[1]" class="banner_img" />
                </div>
              </md-swiper-item>
              <md-swiper-item>
                <div id="C03" @click="bottomBannner(2)">
                  <img :src="bankEquity[2]" class="banner_img" />
                </div>
              </md-swiper-item>
            </md-swiper>
          </div>
        </div> -->
                <div class="bannerActivity">
                    <div id="C01" @click="bottomBannner(0)">
                        <img :src="bankEquity[0]" class="banner_img" />
                    </div>
                    <div id="C02" @click="bottomBannner(1)" class="banner">
                        <img :src="bankEquity[1]" class="banner_img" />
                    </div>
                    <!-- 民生银行下架 -->
                    <!-- <div id="C03" @click="bottomBannner(2)" class="banner">
                        <img :src="bankEquity[2]" class="banner_img" />
                    </div> -->
                </div>

                <!-- 活动说明 -->
                <div class="activity-explain">
                    <div class="activity-explain-title"></div>
                    <div class="activity-explain-cont">
                        1、活动时间：<span class="detail"
                            >即日起-2023年06月30日</span
                        ><br />
                        2、活动对象：<span class="detail">移动钱包用户</span
                        ><br />
                        3、活动内容：<span class="detail"
                            >活动期间，在移动钱包银行卡账户中成功添加本人名下任一银行卡，享每月2GB流量赠送，最高可获赠8GB流量。</span
                        ><br />
                        <div class="more" @click="showOrhidden()" v-if="isShow">
                            展开更多
                            <div class="down"></div>
                        </div>
                        <div v-if="hiddenText">
                            示例如下：<br />
                            <div class="baodan"></div>
                            4、流量奖品说明：
                            <span class="detail">
                                新增绑卡成功后，当月流量于3个工作日内赠送，后续流量将于每月10日前赠送。若活动期间解绑银行卡，则当月及后续月份无法享受流量赠送。流量到账后立即生效，当月底失效。届时可在“此APP-查询服务-套餐余量”查询对应流量发放和使用记录；所赠流量不可滚存、兑换、共享或赠送他人使用。 </span
                            ><br />
                            5、其他注意事项：<br />
                            <span class="detail">
                                （1）同一用户仅限参加一次，绑定多张卡仅享受1次赠送。</span
                            ><br />
                            <span class="detail">
                                （2）参与活动的号码状态必须正常，报停的客户须先报开，欠停的客户、后付费有历史欠费的客户，须缴清欠费后，才能参加本活动。如用户当月预约变更主体产品，有可能导致无法参与活动。如用户已经参与移动其他活动导致冲突，将导致无法参加活动，具体以办理时页面展示为准。</span
                            ><br />
                            <span class="detail">
                                （3）每月最后一天21：30至次日凌晨1：00为系统升级维护时间，可能导致业务无法办理。</span
                            ><br />
                            <span class="detail">
                                （4）中奖用户在享受活动奖品优惠期间不得办理销户、过户、报停业务。</span
                            ><br />
                            <span class="detail">
                                （5）用户参与活动即视为理解并同意本活动细则。</span
                            >
                            <p
                                class="stowText"
                                v-if="!isShow"
                                @click="showOrhidden()"
                            >
                                收起
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 开始绑定loading效果 -->
            <div class="loading-toast" v-if="loading">
                <img
                    v-if="$client.IOS"
                    src="@/assets/images/loading-toast.gif"
                    alt=""
                />
                <img
                    v-else
                    src="@/assets/images/loading-toast.gif"
                    width="60"
                    alt=""
                />
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
        <div class="pop" v-show="popShow" ref="info" @scroll="onscroll">
            <div id="a6" class="title-item">
                <span class="titleTxt">移动钱包业务受理协议</span>
            </div>
            <div class="content">
                <img style="width: 2.11rem;height: 0.62rem;" alt="" src="@/assets/images/newRights/img_1.png" />
                <p>
                    受理日期：{{ date.year }}年{{ date.month }}月{{
                        date.day
                    }}日
                </p>
                <p>手机号码：{{ mobNo }}</p>
                <p>客户名称：{{ userNames }}</p>
                <ul>
                    <li>鉴权方式：统一认证+短信验证码</li>
                    <li>受理类型：业务办理</li>
                    <li>
                        受理时间：{{ date.year }}-{{ date.month }}-{{
                            date.day
                        }}
                        {{ date.hour }}:{{ date.minute }}:{{ date.second }}
                    </li>
                    <li>受理渠道：此APP</li>
                    <li>商品名称：移动钱包</li>
                    <li>业务详情：</li>
                </ul>
                <div class="text">
                    <div
                        ref="getHeight"
                        class="agrement"
                        v-html="agreementContent"
                    ></div>
                    <div style="width: 100%; height: 2rem; text-align: right">
                        <img
                            alt=""
                            :src="city"
                            style="
                                width: 2rem;
                                height: auto;
                                transform: rotate(-45deg);
                            "
                        />
                    </div>
                    <h4>甲方：{{ userNames }}</h4>
                    <h4>
                        乙方：中国移动通信集团江苏有限公司{{ cityName }}分公司
                    </h4>
                    <img alt="" src="@/assets/images/newRights/img.png" />
                </div>
            </div>
            <div
                class="popBtn"
                :style="{ background: !disab ? '#0195ff' : '' }"
                @click="
                    disab ? '' : (popShow = false);
                    agree = true;
                    agreeConf.checked = true;
                "
            >
                我已阅读并知晓
            </div>
        </div>
    </div>
</template>

<script>
import {
    Swiper,
    SwiperItem,
    Picker,
    Field,
    FieldItem,
    InputItem,
    Codebox,
    ImageReader,
    Toast,
    Agree
} from 'mand-mobile';
import InputWithValidation from '@/components/InputWithValidation';
import api from '@/common/apiUrls';
import * as store2 from '@/common/localstore';
import simple from 'mand-mobile/components/swiper/demo/data/simple';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import { compressImage } from '@/common/yasuoImg.js';


export default {
    name: 'addNewBanks',
    components: {
        [Picker.name]: Picker,
        [Field.name]: Field,
        [FieldItem.name]: FieldItem,
        [InputItem.name]: InputItem,
        [Codebox.name]: Codebox,
        [ImageReader.name]: ImageReader,
        InputWithValidation,
        [Agree.name]: Agree
    },
    data() {
        return {
            disab: true,
            isShow: true,
            hiddenText: false,
            showBankType: false,
            showTankuang: false,
            submitError: false,
            submitPic: false,
            imageList: {
                reader0: []
            },
            mimes: ['bmp', 'jpg', 'png', 'gif', 'webp', 'heif', 'heic', 'jpeg'],
            updateFail: require('../../assets/images/openBanks/error_bg.png'),
            sucFlag: '0',
            hasNoBorder: true,
            bankEquity: [
                require('../../assets/images/newBanks/nbBank.png'),
                require('../../assets/images/newBanks/jsBank.png'),
                require('../../assets/images/newBanks/njBank.png')
            ],
            simple,
            isPickerShow0: false,
            isPickerShow1: false,
            pickerData0: [
                [
                    { text: '储蓄卡', value: '01' },
                    { text: '信用卡', value: '02' }
                ]
            ],
            pickerValue0: '储蓄卡',
            pickerValue1: '',
            formData: {
                bankNo: '',
                userMbl: ''
            },
            msgDialog: {
                open: false,
                btns: [
                    {
                        text: '提交绑卡',
                        id: 'A03',
                        disabled: false
                    }
                ]
            },
            channelCode: '', // 渠道编码
            mobVersion: '', // 版本号
            dealChn: '', // 渠道编码
            userName: '', // 用户姓名
            userNames: '',
            cardSuccess: false, // 卡号校验成功标志
            phoneSucess: false, // 手机号校验成功标志
            asd: 'disabled',
            smsCode: null, // 验证码
            cardId: null, // 返回卡号
            smsButtonFlag: false, // 验证码按钮
            userMobile: '', // 验证码上方的手机号
            buttonTxt: '重新获取', // 按钮文案
            buttonType: false, // 按钮可不可点击disabled;default
            buttonStyle: false, // 控制按钮文案颜色
            loading: false, // 加载中
            flag: false, // 定时器标志
            singlenTimer: null,
            ZFbackID: '',
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_ADDNEWBANKS_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_ADDNEWBANKS_01_A02'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_ADDNEWBANKS_01_B01'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_ADDNEWBANKS_01_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_ADDNEWBANKS_01_C02'
                },
                {
                    id: 'C03',
                    touchCode: 'WAP_T_ADDNEWBANKS_01_C03'
                }
            ],
            agreeConf: {
                checked: false,
                name: 'agree4',
                size: 'md',
                disabled: false,
                introduction: '方形勾选框选中状态'
            },
            agree: false,
            popShow: false,
            date: {
                year: new Date().getFullYear(),
                month:
                    Number(new Date().getMonth() + 1) < 10
                        ? `0${Number(new Date().getMonth() + 1)}`
                        : Number(new Date().getMonth() + 1),
                day:
                    Number(new Date().getDate()) < 10
                        ? `0${Number(new Date().getDate())}`
                        : Number(new Date().getDate()),
                hour:
                    Number(new Date().getHours()) < 10
                        ? `0${Number(new Date().getHours())}`
                        : Number(new Date().getHours()),
                minute:
                    Number(new Date().getMinutes()) < 10
                        ? `0${Number(new Date().getMinutes())}`
                        : Number(new Date().getMinutes()),
                second:
                    Number(new Date().getSeconds()) < 10
                        ? `0${Number(new Date().getSeconds())}`
                        : Number(new Date().getSeconds())
            }, // 日期
            mobNo: store2.default.get('usrmob'),
            city: '',
            cityName: '',
            agreementContent: ''
        };
    },
    watch: {
        cardSuccess(newV) {
            if (newV && this.phoneSucess && this.agreeConf.checked) {
                this.asd = 'default';
            }
        },
        phoneSucess(newV) {
            if (newV && this.cardSuccess && this.agreeConf.checked) {
                this.asd = 'default';
            }
        },
        'agreeConf.checked': {
            handler(newV) {
                if (newV && this.cardSuccess && this.phoneSucess) {
                    this.asd = 'default';
                }
            }
        },
        smsCode(newv) {
            this.smsCode = newv.replace(/[^0-9]/gi, '');
            if (newv && newv.length > 6) {
                this.smsCode = newv.slice(0, 6);
            }
            if (`${newv}`.length < 6) {
                this.smsButtonFlag = false;
            } else {
                this.smsButtonFlag = true;
            }
        },
        immediate: true,
        deep: true
    },
    created() {
        // let height = this.$refs.getHeight.offsetHeight;
        // console.log(this.$refs.getHeight.offsetHeight);
        this.getUserName();
        this.getCity();
        this.getAgreement();
    },
    mounted() {
        initPageJs(this.$route.meta.pageName, this.touchArr);

        store2.default.get('userMobile', this.userMobile);

        // 获取地址栏渠道编码
        this.dealChn = this.$route.query.dealChn;
        // if(store2.default.get("begindealChn") !== ''){
        //   // debugger
        //   this.dealChn = store2.default.get("begindealChn")
        //   console.log('store中',this.dealChn)
        // }else{
        //   this.dealChn = this.$route.query.dealChn;
        //   console.log('链接中',this.dealChn)

        // }

        // 支付项目返回地址id
        this.ZFbackID = this.$route.query.ZFbackID || '';
    },
    methods: {
        showOrhidden() {
            this.isShow = !this.isShow;
            this.hiddenText = !this.hiddenText;
        },
        // 上传图片
        submit() {
            this.loading = true;
            this.submitPic = false;
            api.BankIdentification({
                imgStr: this.imgStr
            })
                .then((res) => {
                    this.loading = false;
                    if (!res.cardNum) {
                        this.submitError = true;
                    } else {
                        this.showTankuang = false;
                        this.submitError = false;
                        this.formData.bankNo = res.cardNum;
                        this.submitPic = false;
                        this.showBankType = true;
                        this.imageList.reader0.splice(0, 1);
                        if (res.cardType === '借记卡') {
                            this.pickerValue1 = '01';
                        } else {
                            this.pickerValue1 = '02';
                        }
                        this.bankComfirm();
                    }
                })
                .catch((err) => {
                    this.loading = false;
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
        },

        pickerStr(s) {
            if (s == '01') {
                this.pickerValue1 = '01';
            } else {
                this.pickerValue1 = '02';
            }
        },
        bottomBannner(idx) {
            const link = [
                'https://fintech.12580life.com/fintech-h5/fortuneCenter/nbBankJointly?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype,
                'https://fintech.12580life.com/fintech-h5/healthcare/transitionPage?pageId=230620134827029002&parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype,
                'https://fintech.12580life.com/fintech-h5/fortuneCenter/livelihoodBank?parchn=' + this.$route.query.parchn + '&gytype=' + this.$route.query.gytype,
            ];
            window.location.href = link[idx];
        },
        onPickerConfirm(index) {
            const values = this.$refs[`picker${index}`].getColumnValues();
            let res = '';
            let val = '';
            values.forEach((value) => {
                value && (res += `${value.text || value.label} `);
                value && (val = value.value);
            });
            this[`pickerValue${index}`] = res;
            this.pickerValue1 = val;
        },
        // 点击下一步获取验证码
        submitInfo() {
            if (!this.agreeConf.checked) {
                this.$toast.info('请同意并阅读《移动钱包业务受理协议》', 3000);
                return;
            }
            // 显示加密手机号
            const { userMbl } = this.formData;
            const mobile = `${userMbl.substring(0, 3)}****${userMbl.substring(
                7,
                11
            )}`;
            this.userMobile = mobile;
            console.log('提交');
            // 获取验证码
            if (
                this.formData.bankNo.length !== 16
                && this.formData.bankNo.length !== 19
            ) {
                return this.$toast.info('请检查银行卡是否正确');
            }
            if (!this.pickerValue1) {
                return this.$toast.info('请选择银行卡类型');
            }

            this.getSmsInfo({
                accNo: this.formData.bankNo, // 卡号
                cardTyp: this.pickerValue1, // 银行卡类型  01 储蓄卡 02 信用卡
                phoneNo: this.formData.userMbl, // 预留手机号
                dealChn: this.dealChn // 渠道 外部在链接中带给我们的
            });

            //  this.msgDialog.open = true;
            this.timeOutShow(); // 倒计时效果
        },
        // 提交签约并绑卡
        bindCard() {
            this.loading = true;
            this.sendBindCard({ cardId: this.cardId, smsCode: this.smsCode });
        },

        // 表单校验
        bankComfirm() {
            const { bankNo } = this.formData;
            if (bankNo == '' || bankNo == null) {
                this.asd = 'disabled';
                this.cardSuccess = false;
                this.$toast.info('银行卡不能为空');
            } else {
                this.cardSuccess = true;
            }
            if (bankNo.length === 16 || bankNo.length === 19) {
                this.getBankType();
            } else {
                this.pickerValue1 = '';
            }
        },
        // 获取银行卡类型
        getBankType() {
            api.banksApi
                .queryBankType({
                    accNo: this.formData.bankNo
                })
                .then((res) => {
                    if (res.fbankCardType == '贷记卡') {
                        this.showBankType = true;
                        this.pickerValue1 = '02';
                    } else if (
                        res.fbankCardType == '预付卡'
                        || res.fbankCardType == '准贷记卡'
                    ) {
                        this.pickerValue1 = '';
                        this.showBankType = true;
                    } else if (res.fbankCardType == '借记卡') {
                        this.showBankType = true;
                        this.pickerValue1 = '01';
                    }
                })
                .catch((err) => {
                    this.$toast.info(`${err.msgInfo},请检查银行卡是否正确`);
                    this.showBankType = true;
                    console.log('---error---', err);
                });
        },
        phoneComfirm() {
            const phoneNo = this.formData.userMbl;
            if (phoneNo == '' || phoneNo == null) {
                this.phoneSucess = false;
                this.asd = 'disabled';
                this.$toast.info('手机号不能空');
            } else {
                this.phoneSucess = true;
            }
        },

        // 用户姓名信息
        getUserName() {
            api.newBank
                .getUserLogin()
                .then((res) => {
                    console.log(res.userName);
                    if (res) {
                        this.userName = res.userName;
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },

        // 获取验证码
        getSmsInfo(data) {
            this.loading = true;
            api.newBank
                .acpSendSms(data)
                .then((res) => {
                    // 显示验证码
                    this.msgDialog.open = true;
                    res.cardId && (this.cardId = res.cardId);
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    this.$toast.info(err.msgInfo);
                });
        },
        // 签约
        sendBindCard(data) {
            api.newBank
                .acpSign(data)
                .then((res) => {
                    this.loading = false;
                    this.sucFlag = res.flowFlag; // 0:无 1：有
                    this.$router.push(
                        `/newBanks/addSucNew?dealChn=${this.dealChn}&ZFbackID=${this.ZFbackID}&sucFlag=${this.sucFlag}`
                    );
                })
                .catch((err) => {
                    this.loading = false;
                    this.$toast.info(err.msgInfo); // 报绑卡错误原因
                    this.$router.push(
                        `/newBanks/addFailNew?dealChn=${this.dealChn}&ZFbackID=${this.ZFbackID}&msgInfo=${err.msgInfo}`
                    );
                });
        },

        // 倒计时效果
        timeOutShow() {
            if (this.singlenTimer) {
                clearInterval(this.singlenTimer);
                this.singlenTimer = null;
            }
            this.flag = false;
            // 重新获取按钮
            let timer = null;
            let a = 60;
            this.buttonType = false;
            this.buttonStyle = false;
            this.buttonTxt = `重新获取${a}s`;
            // alert(timer)  //null
            if (!timer) {
                timer = setInterval(() => {
                    // this.flag && clearInterval(timer)
                    if (!this.singlenTimer) {
                        this.singlenTimer = timer;
                    }
                    console.log(a);
                    a--;
                    this.buttonTxt = `重新获取${a}s`;
                    // 重新获取有几秒展示就不可点击
                    // this.buttonType = false
                    // this.buttonStyle = false  || this.flag ==true
                    if (a === 0) {
                        clearInterval(timer);
                        timer = null;
                        this.buttonTxt = '重新获取';
                        this.buttonType = true;
                        this.buttonStyle = true;
                    }
                }, 1000);
            }
        },

        // 重新获取文案变倒计时效果再次发送验证码
        getTimeOutShow() {
            this.timeOutShow(); // 倒计时
            this.getSmsInfo({
                accNo: this.formData.bankNo, // 卡号
                cardTyp: this.pickerValue1, // 银行卡类型  01 储蓄卡 02 信用卡
                phoneNo: this.formData.userMbl, // 预留手机号
                dealChn: this.dealChn // 渠道 外部在链接中带给我们的
            }); // 下发验证码
        },
        // 语音验证码
        getVideShow() {
            this.timeOutShow(); // 倒计时
            this.getSmsInfo({
                accNo: this.formData.bankNo, // 卡号
                cardTyp: this.pickerValue1, // 银行卡类型  01 储蓄卡 02 信用卡
                phoneNo: this.formData.userMbl, // 预留手机号
                dealChn: this.dealChn, // 渠道 外部在链接中带给我们的
                smsType: '1'
            }); // 下发验证码
        },

        // 隐藏触发函数
        hideFun() {
            this.flag = true;
            this.smsCode = '';
            if (this.singlenTimer) {
                clearInterval(this.singlenTimer);
                this.singlenTimer = null;
            }
        },
        onChange(name, checked) {
            if (!this.agree && checked) {
                this.selfAgree();
            }
        },
        getCity() {
            api.getUserNo()
                .then((res) => {
                    this.city = require(`../../assets/images/zhang/${
                        res.cityNo
                    }.png`);
                    switch (res.cityNo) {
                        case '11':
                            this.cityName = '苏州';
                            break;
                        case '12':
                            this.cityName = '淮安';
                            break;
                        case '13':
                            this.cityName = '宿迁';
                            break;
                        case '14':
                            this.cityName = '南京';
                            break;
                        case '15':
                            this.cityName = '连云港';
                        case '16':
                            this.cityName = '徐州';
                            break;
                        case '17':
                            this.cityName = '常州';
                            break;
                        case '18':
                            this.cityName = '镇江';
                            break;
                        case '19':
                            this.cityName = '无锡';
                            break;
                        case '20':
                            this.cityName = '南通';
                            break;
                        case '21':
                            this.cityName = '泰州';
                            break;
                        case '22':
                            this.cityName = '盐城';
                            break;
                        case '23':
                            this.cityName = '扬州';
                            break;
                    }
                    this.mobNo = res.mobile.replace(
                        /(\d{3})\d{4}(\d{4})/,
                        '$1****$2'
                    );
                    const nu = res.userName.length - 1;
                    for (let i = 0; i < nu; i++) {
                        this.userNames += '*';
                    }

                    this.userNames += res.userName.slice(-1);
                })
                .catch((err) => {
                    console.log('------******-----');
                });
        },
        getAgreement() {
            api.agreement()
                .then((res) => {
                    // console.log(999);
                    // console.log(res.agreementContent);
                    this.agreementContent = res.agreementContent.replaceAll(
                        'px',
                        ''
                    );
                    if (this.agreementContent == '') {
                        this.disab = false;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.disab = false;
                });
        },
        onscroll() {
            console.log(999);
            const hgt = this.$refs.info.scrollHeight;
            const clihgt = this.$refs.info.clientHeight;
            const scrHgt = this.$refs.info.scrollTop;
            // eslint-disable-next-line radix
            if (parseInt(hgt - scrHgt - 30) < clihgt) {
                this.disab = false;
            }
        },
        selfAgree() {
            this.popShow = true;
            if (this.disab === true && this.agree === false) {
                this.$toast.info('请滑动文字到底阅读完协议');
                console.log(999);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.pop {
    width: 100vw;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    background: white;
    z-index: 99;
    overflow-y: scroll;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    padding: 0 30px;
    padding-top: 40px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
        width: 0 !important;
    }
    p {
        font-size: 0.26rem;
        color: #666666;
        line-height: 0.4rem;
    }
    .title-item {
        background-color: #fff;
        text-align: center;
        position: relative;
        font-size: 0.36rem;
        color: #333;
        font-weight: 700;
        margin-bottom: 0.2rem;

        .arrowIco {
            position: absolute;
            left: 36px;
            top: 50%;
            transform: translateY(-50%);
        }

        .titleTxt {
            color: #13252e;
            font-size: 36px;
        }
    }
    .content {
        margin: 30px;
        font-size: 26px;
        line-height: 40px;

        .serviceProtocol {
            font-size: 36px;
            color: #333333;
            font-weight: 600;
            line-height: 50px;
            text-align: center;
            margin-bottom: 20px;
        }

        .serviceContent {
            text-indent: 72px;
        }

        .smallTitle {
            font-size: 26px;
            text-align: left;
            font-weight: 600;
            color: #333333;
            line-height: 40px;
        }

        .secondTitle {
            font-size: 26px;
            font-weight: 600;
            text-align: left;
            color: #333333;
            line-height: 40px;
        }

        .company {
            font-size: 26px;
            font-weight: 600;
            text-align: right;
        }

        .serviceTime {
            font-size: 26px;
            font-weight: 600;
            text-align: right;
            margin-right: 104px;
        }

        .whiteBlock {
            width: 100%;
            height: 100px;
        }

        //.md-button {
        //    position: -webkit-sticky;
        //    width: 700px;
        //    bottom: 0;
        //    left: 50%;
        //    transform: translateX(-50%);
        //}

        .agrement {
            span {
                font-size: 50px;
            }
        }
    }
    .popBtn {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.32rem;
        font-weight: 500;
        background: #efefef;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.3rem auto;
        position: sticky;
        bottom: 30px;
    }
}
.contains {
    background-color: #f8f8f8;
    width: 750px;
    overflow-x: hidden;
    box-sizing: border-box;
    .mainContain {
        padding: 30px;
            background: url("../../assets/images/newBanks/topBanksbg.png") no-repeat;
            background-size: 100% 600px;
            height: 100%;
        .topBankBg {
            // width: 750px;
            position: relative;
        }
        .add {
            height: 56px;
            opacity: 1;
            font-size: 36px;
            font-weight: 400;
            text-align: left;
            color: #333;
            line-height: 86px;
            padding-left: 30px;
            padding-right: 30px;
            padding-bottom: 50px;
            img {
                position: absolute;
                right: 40px;
                top: 50px;
            }
        }
        .fa_InfoBox {
            // border-top: 1px solid #ededed;
            // border-bottom: 1px solid #ededed;
            background: #fff;
            // position: absolute;
            // top: 0;
            // left: 30px;
            // right: 30px;
            padding-bottom: 30px;

            .InfoBox {
                // width: 100%;
                height: 100px;
                padding: 0 30px;
                border-bottom: 1px solid #f1f1f1;

                .Info {
                    width: 690px;
                    height: 100%;
                    margin-left: 30px;
                    font-size: 30px;
                    margin: 0 auto;

                    .manname {
                        display: inline-block;
                        // width:150px;
                        height: 100%;
                        line-height: 100px;
                        color: #333;
                    }
                    .name {
                        width: 4.9rem;
                        height: 100%;
                        line-height: 100px;
                        display: inline-block;
                        float: right;
                        color: #333;
                        padding-right: 80px;
                        box-sizing: border-box;
                        position: relative;
                        .icon {
                            position: absolute;
                            right: 0;
                            top: 35px;
                            // width: 30px;
                            height: 40%;
                        }
                        .back {
                            margin-right: 10px;

                            img {
                                width: 14px;
                                height: 24px;
                            }
                        }
                        .xiangji {
                            margin-top: 5px;
                            img {
                                width: 38px;
                                height: 32px;
                            }
                        }
                    }

                    .md-field-item-content {
                        width: 1090px;
                        margin-left: -50px;
                        color: #333;
                    }
                }
            }
        }
        .wapBtn {
            width: 610px;
            height: 74px;
            opacity: 1;
            // background: #8ec4f6;
            border-radius: 10px;
            margin: 0 auto;
        }
        /deep/ .md-field-item-control .md-input-item-fake {
            line-height: 80px;
            margin-top: -20px;
        }

        .removeNumStyle::-webkit-outer-spin-button,
        .removeNumStyle::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
            margin: 0;
        }
        .smsBtn {
            width: 42%;
            height: 100%;
            display: inline-block;
            border-radius: 0;
            box-sizing: border-box;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            position: absolute;
            right: 0;
        }
        .loading-toast {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 9999;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }
        .bankCards {
            // margin: 0 30px;
            /deep/ .md-example-child-swiper-0 {
                width: 100%;
                height: 160px;
                margin-top: 15px;
                border: 1px solid transparent;

                .banner_img {
                    width: 690px;
                    height: 174px;
                }

                .md-swiper-indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50px;
                    margin: 0 10px;
                }

                .md-swiper-indicators {
                    bottom: -30px;
                }
            }
        }
        .bannerActivity {
            img {
                width: 690px;
                height: 174px;
            }
            .banner {
                margin-top: 30px;
            }
        }
        .activity-explain {
            .activity-explain-title {
                background: url("../../assets/images/newBanks/huodongTitle.png")
                    no-repeat;
                background-size: 100% 100%;
                width: 380px;
                height: 85px;
                margin: 45px auto 60px;
            }
            .activity-explain-cont {
                padding-left: 56px;
                padding-right: 67px;
                line-height: 36px;
                color: #000;
                padding-bottom: 60px;
                font-size: 20px;
                span {
                    color: #717171;
                }
            }
            .more {
                display: flex;
                text-align: center;
                color: #98999a;
                font-size: 22px;
                justify-content: center;
                margin-top: 10px;
                .down {
                    width: 13px;
                    height: 7px;
                    background: url("../../assets/images/newBanks/down.png")
                        no-repeat;
                    background-size: 100% 100%;
                    margin: 12px 0 0 15px;
                }
            }
            .stowText {
                text-align: center;
                color: #98999a;
                font-size: 22px;
                margin-top: 10px;
            }
            .baodan {
                background: url("../../assets/images/form_2.png") no-repeat;
                background-size: 100% 100%;
                width: 580px;
                height: 196px;
                margin-bottom: 26px;
                margin-right: 71px;
                margin-top: 10px;
            }
        }
        .other {
          margin-top: 40px;
            // margin: 50px 30px 0;
        }
        .bankcardSty {
            display: flex;
            margin-top: 23px;
            margin-left: 50px;
            .bankcardSty-btn {
                color: #ffffff;
                width: 151px;
                height: 52px;
                border-radius: 26px;
                line-height: 46px;
                font-size: 28px;
                text-align: center;
                background: #dddddd;
            }
            .on {
                background: #238ff2;
            }
            .left {
                margin-right: 20px;
            }
        }
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
            }
        }

        .pic_bg {
            position: relative;
            width: 530px;
            height: 402px;
            background: url("../../assets/images/openBanks/pic_bg.png")
                no-repeat;
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
    .sign-note{
      font-size: 26px;
    }
}
</style>
