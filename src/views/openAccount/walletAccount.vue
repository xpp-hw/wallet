<template>
    <div class="box">
        <!-- <div class="headNav">
          <span class="leftBack" @click="showPopUp('center','back')">
              <md-icon class="arrowIco" name="arrow-left"></md-icon>
              <span>返 回</span>
          </span>
          <span class="titleTxt">{{ this.$route.meta.title }}</span>
      </div> -->
        <div class="skeleton" v-if="skeleton">
            <img src="@/assets/images/skeleton.jpg" alt="" />
        </div>
        <div class="container gray" id="container" style="width: 100%;height: 100%;">
            <div class="account-index-wrapper" v-if="hasShow" style="width: 100%;height: 100%;position: relative;">
                <div class="open-progress">
                    <div class="progress-pic">
                        <img
                            src="../../assets/images/openBanks/shenfen.png"
                            alt=""
                        />
                        <div class="progress-line"></div>
                        <img
                            src="../../assets/images/openBanks/cards_fake.png"
                            alt=""
                        />
                        <div class="progress-line"></div>
                        <img
                            src="../../assets/images/openBanks/wancheng_fake.png"
                            alt=""
                        />
                    </div>
                    <div class="txt-progress">
                        <span class="act-progress">身份信息</span
                        ><span style="margin-right: 30px">银行卡</span
                        ><span style="margin-right: 6px">完成</span>
                    </div>
                </div>
                <div class="account-form">
                    <div class="form__section">
                        <div class="login__block">
                            <label class="form__block">
                                <span class="form__label login__form-label"
                                    >开户手机号</span
                                >
                                <span class="form__main">
                                    <input
                                        type="text"
                                        class="form__input"
                                        id="userPhone"
                                        v-model="usrmob"
                                        disabled=""
                                    />
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="form__section">
                        <!-- 有身份证信息时 -->
                        <div class="login__block" v-if="isGroupNum === '0'">
                            <label class="form__block">
                                <span class="form__label login__form-label"
                                    >姓名</span
                                >
                                <span class="form__main">
                                    <input
                                        type="text"
                                        class="form__input"
                                        id="userName"
                                        v-model="usrname"
                                        style="-webkit-text-fill-color: #666"
                                        disabled=""
                                    />
                                </span>
                            </label>
                        </div>
                        <!-- 无身份证信息时 -->
                        <div class="login__block" v-if="isGroupNum === '1'">
                            <label class="form__block">
                                <span class="form__label login__form-label"
                                    >姓名</span
                                >
                                <span class="form__main">
                                    <md-input-item
                                        type="text"
                                        pattern="\d*"
                                        inputmode="decimal"
                                        class="form__input"
                                        id="A03"
                                        placeholder="请输入姓名"
                                        required=""
                                        v-model="usrname"
                                        align="right"
                                        maxlength="50"
                                        v-on:input="watchMob"
                                        @blur="inputNameWarning"
                                    ></md-input-item>
                                </span>
                            </label>
                            <div
                                class="input-error bank-card-error"
                                v-if="hasInputName"
                            >
                                请输入姓名
                            </div>
                        </div>
                        <!-- 有身份证信息时 -->
                        <div class="login__block" v-if="isGroupNum === '0'">
                            <label class="form__block">
                                <span class="form__label login__form-label"
                                    >身份证号</span
                                >
                                <span class="form__main">
                                    <input
                                        type="text"
                                        class="form__input"
                                        id="userCode"
                                        style="-webkit-text-fill-color: #666"
                                        v-model="usridno"
                                        required=""
                                        disabled=""
                                    />
                                </span>
                            </label>
                        </div>
                        <!-- 无身份证信息时 -->
                        <div class="login__block" v-if="isGroupNum === '1'">
                            <label class="form__block">
                                <span class="form__label login__form-label"
                                    >身份证号</span
                                >
                                <span class="form__main">
                                    <md-input-item
                                        type="text"
                                        pattern="\d*"
                                        inputmode="decimal"
                                        class="form__input"
                                        id="userCode"
                                        placeholder="请输入身份证号码"
                                        required=""
                                        v-model="usridno"
                                        align="right"
                                        maxlength="18"
                                        v-on:input="watchNumberID"
                                        @blur="inputNumberWarning"
                                    ></md-input-item>
                                </span>
                            </label>
                            <div
                                class="input-error bank-card-error"
                                v-if="hasInputNumber"
                            >
                                请输入身份证号码
                            </div>
                            <div
                                class="input-error bank-card-error"
                                v-if="isTrueNumber"
                            >
                                请输入正确的身份证号码
                            </div>
                        </div>
                        <div class="login__block">
                            <label class="form__block">
                                <span class="form__label login__form-label"
                                    >税收居民类型</span
                                >
                                <span class="form__main">
                                    <input
                                        type="button"
                                        class="form__input"
                                        id="sslx"
                                        v-model="taxobj"
                                        required=""
                                        @click="showPopUp('bottom', 'tax')"
                                        style="padding-right: 0.3rem"
                                    />
                                    <img
                                        src="@/assets/images/wallet-icon1.png"
                                        class="arrow-new"
                                    />
                                </span>
                            </label>
                        </div>
                        <!-- <div class="login__block">
              <label class="form__block">
                <span class="form__label login__form-label">银行卡号</span>
                <span class="form__main"> -->
                        <!-- <input type="number" pattern="\d*" inputmode="decimal" class="form__input" id="cardNo" placeholder="请填写一张借记卡(不支持信用卡)" required=""
                                        v-model="bankno" maxlength="19" v-on:input="watchNo()"> -->
                        <!-- <md-input-item
                    class="form__input"
                    id="A02"
                    type="bankCard"
                    v-model="bankno"
                    maxlength="19"
                    align="right"
                    placeholder="请填写一张借记卡(不支持信用卡)"
                    @change="watchNo"
                    @blur="InputBanknoWarning"
                  ></md-input-item>
                </span>
              </label>
              <div class="input-error bank-card-error" v-if="hasInputBankno">
                请输入银行卡号
              </div>
            </div> -->
                        <!-- <div class="bank-card-current bank-card-error" v-if="supportbk">
              抱歉，暂不支持该银行，
              <a href="javascript:;" class="link" @click="viewbanks" id="A08"
                >点击查看支持的银行卡</a
              >
            </div> -->
                        <!-- <div class="login__block bank_line">
              <label class="form__block">
                <span class="form__label login__form-label">银行名称</span>
                <span class="form__main bank_name">{{ bankname }}</span>
              </label>
            </div> -->
                        <!-- <div class="login__block">
              <label class="form__block">
                <span class="form__label login__form-label">银行预留手机号</span>
                <span class="form__main">
                  <md-input-item
                    type="phone"
                    pattern="\d*"
                    inputmode="decimal"
                    class="form__input"
                    id="A03"
                    placeholder="请输入银行卡预留手机号"
                    required=""
                    v-model="cardPhone"
                    align="right"
                    maxlength="11"
                    v-on:input="watchMob"
                    @blur="inputPhoneWarning"
                   ></md-input-item>
                </span>
              </label>
              <div class="input-error bank-card-error" v-if="hasInputPhone">
                请输入银行预留手机号
              </div> -->
                        <!-- </div> -->
                    </div>
                </div>
                <!-- <div class="recommend-wallet" v-if="bankabled"> -->
                <div class="recommend-wallet" v-if="noShow || comeCode">
                    <div class="juxing">
                        <!-- <img
                            src="../../assets/images/openBanks/juxing.png"
                            alt=""
                        /> -->
                    </div>
                    <span class="recommend-tit"
                        >账户服务由江苏移动&{{ ckedbank }}共同提供</span
                    >
                    <!-- <div class="recommend-bank" @click="showPopUp('bottom','ebank')" id="A04"> -->
                    <div class="recommend-bank" id="A04">
                        <!-- <span>{{ckedbank}}</span> -->
                        <!-- <img  src="@/assets/images/wallet-icon1.png" class="arrow-new"/> -->
                    </div>
                </div>
                <button
                    v-if="height"
                    :class="allright ? '' : 'actcodebtn'"
                    class="change-btn"
                    @click="nextPage"
                    id="A07"
                >
                    下一步
                </button>
            </div>
            <!-- 选择零钱服务银行、税收类型 -->
            <md-popup v-model="isPopupShow.bottom" position="bottom">
                <md-popup-title-bar
                    :title="poptitle"
                    cancel-text="关闭"
                    large-radius
                    @cancel="hidePopUp('bottom')"
                ></md-popup-title-bar>
                <div class="md-example-popup md-example-popup-bottom">
                    <div class="lingbank" v-if="bankchoose">
                        <div class="popup-bank-main">
                            <div class="cell" @click="choosebank(1)">
                                <div class="bank-info">招商银行</div>
                            </div>
                            <div
                                class="divider"
                                style="border-color: #d5d5d5"
                            ></div>
                            <div class="cell pufa-bank" @click="choosebank(2)">
                                <div class="bank-info">浦发银行</div>
                            </div>
                            <div
                                class="divider pufa-bankline"
                                style="border-color: #d5d5d5"
                            ></div>
                        </div>
                    </div>
                    <div class="taxck" v-if="taxchoose">
                        <div class="popup-bank-main">
                            <div class="cell" @click="chooseown('owncountry')">
                                <div class="bank-info">本国税收居民</div>
                            </div>
                            <div
                                class="divider"
                                style="border-color: #d5d5d5"
                            ></div>
                            <div
                                class="cell"
                                @click="showPopUp('center', 'others')"
                            >
                                <div class="bank-info">他国税收居民</div>
                            </div>
                            <div
                                class="divider"
                                style="border-color: #d5d5d5"
                            ></div>
                        </div>
                    </div>
                </div>
            </md-popup>
            <!-- loading -->
            <div class="loading-toast" v-if="loading">
                <img src="@/assets/images/loading-toast.gif" alt="" />
            </div>
            <!-- 他国税收居民提醒 （一个按钮）-->
            <md-popup v-model="isPopupShow.center">
                <div class="md-example-popup md-example-popup-center faxnote">
                    <div class="faxremind" v-show="faxremind">
                        <div class="popup-normal__head">
                            <h3 class="popup-normal__title" id="errorTit">
                                提醒
                            </h3>
                        </div>
                        <div class="divider"></div>
                        <div class="popup-main" id="errorMes">
                            抱歉，您属于他国税收居民，暂时不<br />支持开通钱包账户
                        </div>
                        <button
                            class="btn btn-sure"
                            id="errorBtn"
                            @click="hidePopUp('center')"
                        >
                            确认
                        </button>
                    </div>
                    <div class="backremind" v-show="backremind">
                        <div class="popup-normal__head">
                            <h3 class="popup-normal__title" id="popup_title2">
                                提醒
                            </h3>
                        </div>
                        <div class="divider"></div>
                        <div class="popup-main" id="popup-main2">
                            您还有一步操作就可完成开户了<br />并且可<span
                                style="color: #ff1010"
                                >享受10元话费</span
                            >加送的优惠，<br />确认要退出吗？
                        </div>
                        <div class="alert-actions">
                            <button
                                class="btn btn-quit"
                                id="popup-qx"
                                @click="hidePopUp('center')"
                            >
                                取消
                            </button>
                            <button
                                class="btn btn-sure"
                                id="A01"
                                @click="confirmback"
                            >
                                确认
                            </button>
                        </div>
                    </div>
                    <div class="backremind" v-show="gosign">
                        <div class="popup-normal__head">
                            <h3 class="popup-normal__title" id="popup_title2">
                                签约提醒
                            </h3>
                        </div>
                        <div class="divider"></div>
                        <div class="popup-main" id="popup-main2">
                            您的手机号{{
                                usrmob
                            }}下存在电子账户，点击确认，签约账户；<br />签约成功后，即可查看您的钱包账户。
                        </div>
                        <div class="alert-actions">
                            <button
                                class="btn btn-quit"
                                id="popup-qx"
                                @click="goIndex"
                            >
                                取消
                            </button>
                            <button
                                class="btn btn-sure"
                                id="popup-qd"
                                @click="confirmSign"
                            >
                                确认签约
                            </button>
                        </div>
                    </div>
                    <div class="backremind" v-show="gobind && changeTipsMobile">
                        <div class="popup-normal__head">
                            <h3 class="popup-normal__title" id="popup_title2">
                                温馨提示
                            </h3>
                        </div>
                        <div class="divider"></div>
                        <div
                            class="popup-main"
                            id="popup-main2"
                            style="width: 5.5rem"
                        >
                            您的
                            {{
                                changeTipsMobile.replace(
                                    /(\d{3})\d{4}(\d{4})/,
                                    "$1****$2"
                                )
                            }}
                            手机号下已开通移动钱包，请使用该号码操作。
                        </div>
                        <div
                            class="alert-actions"
                            style="justify-content: center"
                        >
                            <button
                                class="btn btn-quit"
                                id="popup-qx"
                                @click="goIndex"
                            >
                                知道了
                            </button>
                        </div>
                    </div>
                </div>
            </md-popup>
            <!-- 银行 -->
            <div
                class="popup popup-bottom popup-banks"
                id="popup-banks"
                v-if="showbanks"
            >
                <div class="popup-bottom__head">
                    <a href="javascript:;" class="close" @click="hidebanks"></a>
                    <h3 class="popup-bottom__title">支持绑定的银行列表</h3>
                </div>
                <div class="popup-banks-main">
                    <img
                        src="@/assets/images/banks_title.png"
                        class="banks-title"
                        alt=""
                    />
                    <div class="banks-scroll" id="bankslist">
                        <img
                            src="@/assets/images/banks.png"
                            class="banks-pic"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <!-- /银行 -->
            <!-- 权限 -->
            <div
                class="popup popup-bottom popup-power"
                id="popup-power"
                style="display: none"
            >
                <div class="popup-transfor__head">招商银行 申请</div>
                <div class="popup-power-main">
                    <div class="tit">获取以下权限为你提供服务</div>
                    <p class="power-item">
                        您的姓名、手机号、证件号用于开通账户；
                    </p>
                    <p class="power-item">
                        您的位置信息、手机识别码用于账户安全识别；
                    </p>
                    <br />
                    <p class="power-item" style="display: none">
                        本次授权成功后，后续将不再重复申请授权；
                    </p>
                    <p class="agree">
                        同意<a href="agreement.html" class="link-xy" id="A03"
                            >《服务授权协议》</a
                        >
                    </p>
                    <div class="actions">
                        <button
                            class="btn"
                            id="btn-noagree"
                            onclick='Popup.hide("#popup-power");'
                        >
                            拒绝
                        </button>
                        <button
                            class="btn btn-agree"
                            style="font-size: 0.34rem"
                        >
                            同意
                        </button>
                    </div>
                </div>
            </div>
            <!-- /权限 -->
            <!-- 招商银行一网通用户服务协议 -->
            <div
                class="agreement-wrap"
                id="pop-agreement"
                v-show="serviceagree"
            >
                <div class="agreement">
                    <h1 class="head">招商银行“一网通账户”服务协议</h1>
                    <div style="text-indent: 2em">
                        <p>
                            欢迎使用招商银行一网通用户服务。您在使用一网通用户服务时，即表示您接受下列条款和条件的约束（以下称“服务条款”），请认真阅读以下条款：
                        </p>
                        <p>
                            1、客户要尊重网上道德，遵守《全国人大常委会关于维护互联网安全的决定》及中华人民共和国其他各项有关法律法规
                            。
                        </p>
                        <p>
                            2、一切因客户本人的行为而产生的法律责任均由客户本人自担。
                        </p>
                        <p>
                            3、客户在注册时提供完整详实的个人资料，客户注册的数据日后如有变更时，请随时更新。客户提供的个人资料若有填写不实，或原有数据已不真实而未及时更新，或有任何误导的嫌疑，招商银行保留随时终止客户登录资格及使用各项服务的权利。
                        </p>
                        <p>
                            4、客户必须注意保密客户本人的敏感信息不外泄，由于客户个人原因导致敏感信息外泄而引起的损失，招商银行概不负责赔偿。
                        </p>
                        <p>
                            5、您同意并授权招商银行为了保障您的交易安全、预防您的账户被他人不法侵害，可以向依法设立的电信运营商等合法机构（包括但不限于中国电信、中国移动、中国联通等外部合作机构），查询、使用或提供您包括但不限于您的地理位置、行为、设备等相关信息，并保留相关资料。招商银行依法对您的相关信息承担保密责任，并保证要求合作机构对您的相关信息承担保密责任。
                        </p>
                        <p>
                            6、您知晓且有权选择是否同意接受招商银行通过招商银行App站内推送、短信、电子邮件或电话等方式向您推送服务及商业性信息。如您不同意接受上述服务或商业性信息，可通过招商银行客户服务电话95555或相应信息推送渠道指引的退订方式进行取消
                        </p>
                        <p>
                            7、招商银行保留随时更改、停止或终止各项服务内容的权利，且无事先通知义务。
                        </p>
                        <p>
                            8、如您有任何疑问或意见，可拨打招商银行咨询投诉电话95555。
                        </p>
                    </div>
                </div>
                <button class="agreement-btn" @click="serviceconf" id="A09">
                    确认
                </button>
            </div>
        </div>
        <md-popup v-model="checkOpen">
            <div class="gotoSetLoose">
                <div class="loseTitle">温馨提示</div>
                <div class="cont">
                    <p>{{ checkCont }}</p>
                    <div class="btnBox">
                        <md-button
                            type="default"
                            size="small"
                            @click="checkOpen = false"
                            >知道了</md-button
                        >
                    </div>
                </div>
            </div>
        </md-popup>
        <!-- 弹框 -->
        <md-popup v-model="isTrueLeave" class="leaveModel">
            <div class="cont">
                <div class="top">温馨提示</div>
                <div class="text md-example-popup md-example-popup-center">
                    {{ tipsTxt }}
                </div>
                <div class="btnBox">
                    <div class="btn btnCancel" @click="trueLeave" id="B01">
                        一会再来
                    </div>
                    <div class="btn" @click="isTrueLeave = false" id="B02">
                        继续开户
                    </div>
                </div>
            </div>
        </md-popup>
        <!-- 设置默认卡 -->
        <md-popup v-model="defalutPopupShow">
            <div class="gotoSetLoose">
                <div class="loseTitle">提示</div>
                <div class="cont">
                    <p>为了确保您的支付体验， 请先设置默认零钱账户~</p>
                    <md-button
                        type="default"
                        size="small"
                        @click="setDefaultBank()"
                        >去设置</md-button
                    >
                </div>
            </div>
        </md-popup>
    </div>
</template>
<script src="@/common/jquery.min.js"></script>
<script>
import api from "@/common/apiUrls";
// import store from '@/common/localstore';
// import InputWithValidation from '@/components/InputWithValidation';
import {
    Popup,
    PopupTitleBar,
    Button,
    Icon,
    InputItem,
    Picker,
} from "mand-mobile";
import { initPageJs } from "@/common/Page2435_1_fn.js";
import * as store2 from "@/common/localstore";
import { getCookie } from "@/common/cookie";

export default {
    name: "walletAccount",
    components: {
        [Popup.name]: Popup,
        [PopupTitleBar.name]: PopupTitleBar,
        [Button.name]: Button,
        [Icon.name]: Icon,
        [InputItem.name]: InputItem,
        [Picker.name]: Picker,
    },
    data() {
        return {
            isPopupShow: {},
            serviceagree: false,
            commonservice: false,
            pufaservice: true,
            cmbservice: false,
            taxchoose: true,
            bankchoose: false,
            skeleton: true,
            loading: false, // 加载中动画
            poptitle: "选择税收类型",
            ckedbank: "招商银行",
            faxremind: true, // 他国税收居民提醒
            backremind: false,
            gosign: false, // 去签约提醒
            gobind: false, // 去换绑提醒
            taxobj: "本国税收居民",
            sslx: "N", // 税收类型
            supportbk: false,
            showbanks: false,
            pufazixun: false, // 浦发资讯服务
            usrmob: "", // 开户手机号
            usrname: "", // 开户姓名
            usridno: "", // 用户身份证
            bankno: "",
            isXy: true,
            isYx: false,
            bankabled: false,
            idfaOrImei: "",
            orgcode: "SPDB",
            logmob: "",
            othermob: "",
            cardPhone: "", // 银行预留手机号
            bankcd: "",
            bankname: "", // 银行名称
            allright: true, // 页面信息是否都正确
            typeid: "10010", // 渠道号
            sourceChannel: "",
            touchArr: [
                {
                    id: "A01",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A01",
                },
                {
                    id: "A02",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A02",
                },
                {
                    id: "A03",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A03",
                },
                {
                    id: "A04",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A04",
                },
                {
                    id: "A05",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A05",
                },
                {
                    id: "A06",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A06",
                },
                {
                    id: "A07",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A07",
                },
                {
                    id: "A08",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A08",
                },
                {
                    id: "A09",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_A09",
                },
                {
                    id: "B01",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_B01",
                },
                {
                    id: "B02",
                    touchCode: "WAP_T_OPENACCOUNT_INPUT_B02",
                },
            ],
            list: [0, 0, 0, 0, 0, 0, 0],
            isList: [0, 0, 0, 0, 0, 0, 0],
            cont: "下一条",
            isInactive: true,
            count: 0,
            isCount: 0,
            isShow: 0,
            refs: ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg"],
            orgBank: "",
            comeBank: "",
            comeCode: "", // 银行编码
            gotoSetLoose: false,
            usrmobile: "",
            val: "",
            valQi: "",
            orShow: false,
            orShowQi: false,
            fxmobile: "",
            checkOpen: false,
            checkCont: "",
            isTrueLeave: false,
            hasInputBankno: false,
            hasInputPhone: false,
            hasInputName: false,
            hasInputNumber: false,
            isTrueNumber: false,
            gourl: "",
            tipsTxt: "",
            myBanks: [],
            isGroupNum: "",
            noShow: true,
            isClickBack: false, //监听点击返回只点击一次
            defalutPopupShow: false, //是否存在默认零钱账户
            changeTipsMobile: "",
            ZFbackID: "",
            cardType: "",
            hasShow: true,
            typeid:'',
            secGeneration: false, // 是否非二代身份证
            originalHeight: 0, //屏幕原始高度
            screenHeight: 0, //屏幕实时高度
            height: true 
        };
    },
    mounted() {

        //获取首次进入页面的原始高度
        this.originalHeight = document.documentElement.clientHeight;
        //监听页面高度实时变化
        window.addEventListener('resize', this.watchResize);

        if (this.$route.query.orgCode == "SPDB") {
            this.ckedbank = "浦发银行";
        } else if (this.$route.query.orgCode == "CMB") {
            this.ckedbank = "招商银行";
        }
        this.cardType = this.$route.query.orgName;
        //   (^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)
        document.body.style.backgroundColor = "#f9fafb";
        // 协议返回，显示相关数据
        if (store2.default.get("isFlaseQi")) {
            this.isYx = true;
            this.isFlaseQi = store2.default.get("isFlaseQi");
            store2.default.remove("isFlaseQi");
            this.checkBtnShow();
        }
        if (store2.default.get("isFlase")) {
            this.isYx = true;
            this.isFlaseQi = store2.default.get("isFlase");
            store2.default.remove("isFlase");
            this.checkBtnShow();
        }
        if (window.sessionStorage.getItem("userInfo")) {
            this.showUserInfo();
        }
        if (store2.default.get("hadclick") === "01") {
            this.isYx = true;
            this.checkBtnShow();
            if (store2.default.get("FromXyNum")) {
                store2.default.set(
                    "FromXyNum",
                    store2.default.get("FromXyNum") + 1
                );
            } else {
                store2.default.set("FromXyNum", 1);
            }
            store2.default.remove("hadclick");
        }
        setTimeout(() => {
          this.skeleton = false;
        },6000)
    },
    created() {
        this.usrmobile = store2.default.get("usrmob") || '';
        this.logmob = store2.default.get("usrmob");

        this.othermob = this.$route.query.mobile || "";

        this.sourceChannel = this.$route.query.sourcechannel || "";
        console.log("9+++++++++9", this.sourceChannel, "--------");
        if (this.logmob) {
            this.usrmob = this.logmob.replace(
                /(\d{3})\d{4}(\d{4})/,
                "$1****$2"
            );
        } else if (this.othermob) {
            this.usrmob = this.othermob.replace(
                /(\d{3})\d{4}(\d{4})/,
                "$1****$2"
            );
        }
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
            this.fxmobile = this.$route.query.fxmobile || "";
        }

        this.comeCode = this.$route.query.orgCode || "";
        this.comeBank = this.$route.query.orgName || "";
        // 支付项目返回地址id
        this.ZFbackID = this.$route.query.ZFbackID || "";
        // 先查询零钱账户情况
        this.getAllLoose();
        // this.isMobileCheck();
        console.log(this.isGroupNum, "this.isGroupNum");
        // if(this.comeCode){
        //   this.getUsrDataType();
        // }
        initPageJs(this.$route.meta.pageName, this.touchArr);

        if (!this.gourl) {
            this.getBackurl();
        }
        api.leaveKhPage({ cahnnel: "WALLET_OPEN_LEAVE" })
            .then((res) => {
                this.tipsTxt = res.body.retainInfo;
            })
            .catch((err) => {
                this.tipsTxt = res.err.retainInfo;
            });
        // 监听返回按钮
        if (window.history && window.history.pushState) {
            // history.pushState(null, null, document.URL);
            // window.addEventListener("popstate", this.listenerFun, false);
        }
    },
    methods: {
        isMobileCheck() {
            api.getMobileCheck()
                .then((data) => {
                    this.isGroupNum = data.isGroupNum;
                    if (data.isGroupNum === "1") {
                        this.noShow = false;
                        this.skeleton = false;
                        if (window.sessionStorage.getItem("userInfo")) {
                            this.showUserInfo();
                        }
                    } else {
                        if (!this.comeCode) {
                            this.getUsrData();
                            this.getUsrDataType();
                        } else {
                            api.getInitinfo({
                                orgcode: this.comeCode,
                                userName: this.usrname,
                                cardNo: this.usridno,
                            }).then((data) => {
                                this.changeTipsMobile = data.mblno || '';
                            })
                            .catch(err => {
                                // this.$toast.info(err.msgInfo)
                            })
                            this.getUsrDataType();
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        isFlaseQi(a) {
            this.orShowQi = a;
            this.isYx = !a;
            this.checkBtnShow();
        },
        listenerFun() {
            // if(this.skeleton){
            this.$router.go(-1);
            return true;
            // }
            // this.isTrueLeave = true;
            // return false;
        },
        isFlase(a) {
            this.orShow = a;
            this.isYx = !a;
            this.checkBtnShow();
        },
        qiIsShow(a) {
            this.orShowQi = true;
            this.$store.commit("comprehensiveQi", true);
            this.valQi = a;
            this.saveUserInfo();
            this.$router.push({
                name: "comprehensive",
                query: {
                    ...this.$route.query,
                    orShowQi: true,
                    orShow: false,
                    val: a,
                },
            });
        },
        siIsShow(a) {
            this.orShow = true;
            this.$store.commit("comprehensiveSi", true);
            this.val = a;
            this.saveUserInfo();
            this.$router.push({
                name: "comprehensive",
                query: {
                    ...this.$route.query,
                    orShowQi: false,
                    orShow: true,
                    val: a,
                },
            });
        },
        getdefLoose() {
            api.looseChange
                .qryAllAcc({
                    entryTx: "",
                    // 测试传，生产不传
                    mobile: this.usrmobile,
                })
                .then((res) => {
                    console.log(res);
                    // defaultAccFlg
                    const defArr = [];
                    for (var i = 0; i < res.list.length; i += 1) {
                        defArr.push(res.list[i].defaultAccFlg);
                    }
                    if (res.list[i].accNbr == null) {
                        res.list.splice(i, 1);
                    }
                    if (defArr.indexOf("01") == "-1") {
                        this.gotoSetLoose = true;
                        console.log("没有默认零钱");
                    } else {
                        this.gotoSetLoose = false;
                        console.log("有默认零钱");
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        getUsrDataType() {
            var idCardNo = this.usridno;
            var userName = this.usrname;
            console.log("-=-=-=", idCardNo, userName);
            if (this.isGroupNum == "0") {
                (idCardNo = ""), (userName = "");
            }
            const that = this;
            api.bannerCheck({
                orgCode: this.comeCode.toUpperCase(),
                cardNo: idCardNo,
                userName: userName,
            })
                .then((res) => {
                    const type = res.openPreType;
                    if (type === "change") {
                        // 去换绑
                        that.showPopUp("center", "bind");
                        return false;
                    }
                    if (type === "sign") {
                        // 去签约
                        this.showPopUp("center", "sign");
                        return false;
                    }
                    if (type === "frozen") {
                        // 冻结
                        this.checkCont = "您的账户已冻结";
                        this.checkOpen = true;
                        this.allright = true;
                        return false;
                    }
                    if (type === "opening") {
                        // 开户中
                        this.checkCont = "正在开户中，请稍等。";
                        this.checkOpen = true;
                        this.allright = true;
                        return false;
                    }
                    if (type === "openAccount") {
                        if (this.isGroupNum == "0") {
                            this.usrname = res.relName;
                            this.usridno = res.icNo;
                        }
                        this.checkBtnShow();
                        // 去开户
                        if (this.comeCode.toUpperCase() == "SPDB") {
                            this.skeleton = false;
                            this.pufaservice = true;
                            this.cmbservice = false;
                            this.bankabled = true;
                            this.ckedbank = "浦发银行";
                            this.orgcode = "SPDB";
                        } else if (this.comeCode.toUpperCase() == "CMB") {
                            this.skeleton = false;
                            this.pufaservice = false;
                            this.cmbservice = true;
                            this.bankabled = false;
                            this.ckedbank = "招商银行";
                            this.orgcode = "CMB";
                        }
                    }
                })
                .catch((err) => {
                    if (err.msgInfo === "暂无开户资格") {
                        if (this.comeCode.toUpperCase() === "SPDB") {
                            this.checkCont = "仅限浦发银行新客户参加哦~";
                        } else {
                            this.checkCont = "您不具备招商开户资格哦~";
                        }
                        this.checkOpen = true;
                    }else if(err.msgInfo.indexOf('非二代身份证用户请输入证件号码') > -1) {
                        this.secGeneration = true;
                        this.skeleton = false;
                        this.isGroupNum = '1'
                        this.$forceUpdate()
                    } else {
                        this.checkCont = err.msgInfo;
                        this.checkOpen = true;
                    }
                    this.allright = true;
                    return false;
                });
        },
        getUsrData() {
            if (this.isGroupNum === "0") {
                this.usrname = "";
                this.usridno = "";
            }
            const that = this;
            api.getInitinfo({
                orgcode: this.comeCode,
                userName: this.usrname,
                cardNo: this.usridno,
            })
                .then((data) => {
                    // console.log(data);
                    // openPreType 0开户，1换绑，2签约(手机号与接口返回手机号是否一致，一致就去签约，不一致就去换绑)
                    // console.log(data.openPreType);
                    this.isGroupNum = data.isGroupNum;
                    this.changeTipsMobile = data.mblno || '';
                    if (data.icNo === null || data.icNo === "") {
                        this.noShow = false;
                    } else {
                        this.noShow = true;
                    }
                    if (data.isGroupNum === "0") {
                        this.usrname = data.relName;
                        this.usridno = data.icNo;
                        this.checkBtnShow();
                    }
                    if (data.openPreType === "1" && this.isGroupNum === "0") {
                        // 去换绑
                        that.showPopUp("center", "bind");
                    } else if (
                        data.openPreType === "1" &&
                        this.isGroupNum === "1"
                    ) {
                        this.$toast.info(
                            "当前身份证已绑定其他钱包账户，暂无法继续开户!"
                        );
                    } else if (data.openPreType === "2") {
                        // 去签约
                        this.showPopUp("center", "sign");
                    } else if (data.openPreType === "3") {
                        this.gotoSetLoose = true;
                    } else {
                        this.skeleton = false;
                    }
                    store2.default.set("kaihumob", data.mblno);
                    if (data.cmbFlg && data.spdbFlg) {
                        this.pufaservice = false;
                        this.cmbservice = true;
                        this.bankabled = false;
                        this.ckedbank = "招商银行";
                        this.orgcode = "CMB";
                    } else if (data.cmbFlg && !data.spdbFlg) {
                        this.pufaservice = false;
                        this.cmbservice = true;
                        this.bankabled = false;
                        this.ckedbank = "招商银行";
                        this.orgcode = "CMB";
                    } else if (data.spdbFlg && !data.cmbFlg) {
                        this.pufaservice = true;
                        this.cmbservice = false;
                        this.bankabled = false;
                        this.ckedbank = "浦发银行";
                        this.orgcode = "SPDB";
                    }
                    if (this.comeBank != "" || this.comeBank != undefined) {
                        if (this.comeBank == "招商银行") {
                            this.ckedbank = "招商银行";
                            this.pufaservice = false;
                            this.cmbservice = true;
                            this.bankabled = false;
                            this.orgcode = "CMB";
                        } else if (this.comeBank == "浦发银行") {
                            this.pufaservice = true;
                            this.cmbservice = false;
                            this.bankabled = false;
                            this.ckedbank = "浦发银行";
                            this.orgcode = "SPDB";
                        }
                    }
                })
                .catch((err) => {
                    console.log(1111111);
                    this.$toast.info(err.msgInfo);
                    if (err.msgInfo === "证件号错误") {
                        this.isTrueNumber = true;
                    }
                    // console.log(this.isGroupNum,'isGroupNum');
                    // if(this.isGroupNum==='0'){
                    //   this.skeleton = true;
                    //   this.$toast.info(err.msgInfo);
                    // }else{
                    //     if (err.msgCd !== "BUS00000" && !this.comeCode) {
                    //     this.$toast.info(err.msgInfo);
                    //     if(err.msgInfo==="证件号错误"){
                    //         this.isTrueNumber = true
                    //     }
                    //     if (err.msgCd === "BUS20017") {
                    //       // 用户未登录，跳转登录
                    //     }
                    //   }
                    // }
                });
        },
        showPopUp(type, tp) {
            this.$set(this.isPopupShow, type, true);
            // console.log(tp);
            if (tp === "tax") {
                this.taxchoose = true;
                this.bankchoose = false;
                this.poptitle = "选择税收类型";
            } else if (tp === "ebank") {
                this.bankchoose = true;
                this.taxchoose = false;
                this.poptitle = "选择零钱服务银行";
            } else if (tp === "others") {
                this.faxremind = true;
                this.gosign = false;
                this.gobind = false;
                this.backremind = false;
            } else if (tp === "sign") {
                // 签约提醒
                this.gosign = true;
                this.faxremind = false;
                this.backremind = false;
                this.gobind = false;
                this.hasShow = false;
            } else if (tp === "bind") {
                // 换绑提醒
                this.gobind = true;
                this.gosign = false;
                this.faxremind = false;
                this.backremind = false;
            } else if (tp === "back") {
                // 返回提醒
                this.gobind = false;
                this.gosign = false;
                this.faxremind = false;
                this.backremind = true;
            }
        },
        hidePopUp(type) {
            this.$set(this.isPopupShow, type, false);
        },
        serviceconf() {
            this.serviceagree = false;
            return this.serviceagree;
        },
        // 选择零钱机构
        choosebank(tp) {
            if (tp === 1) {
                this.ckedbank = "招商银行";
                this.cmbservice = true;
                this.pufaservice = false;
                this.orgcode = "CMB";
            } else if (tp === 2) {
                this.ckedbank = "浦发银行";
                this.cmbservice = false;
                this.pufaservice = true;
                this.orgcode = "SPDB";
            }
            this.hidePopUp("bottom");
        },

        // 选择本国居民
        chooseown(obj) {
            if (obj === "owncountry") {
                this.taxobj = "本国税收居民";
                this.sslx = "N";
                this.hidePopUp("bottom");
            }
            this.checkBtnShow();
        },
        // 展示支持银行
        viewbanks() {
            this.showbanks = true;
        },
        // 隐藏支持银行
        hidebanks() {
            this.showbanks = false;
        },
        // 校验银行卡号
        watchNo(name, value) {
            this.bankno = value;
            console.log(this.bankno);
            if (this.bankno === "") {
                this.supportbk = false;
                return false;
            }
            this.hasInputBankno = false;
            if (this.bankno.length >= 16 && this.bankno.length <= 20) {
                api.checkUsrBank({
                    cardNo: this.bankno,
                    orgcode: this.orgcode,
                })
                    .then((data) => {
                        // console.log(data);
                        this.supportbk = false;
                        this.bankname = data.bankName;
                        this.bankcd = data.bankCode;
                        this.checkBtnShow();
                    })
                    .catch((err) => {
                        if (err.msgCd === "BUS20017") {
                            // 用户未登录，跳转登录
                        } else if (err.msgCd === "BUS070010") {
                            this.supportbk = true;
                        } else {
                            this.$toast.info(err.msgInfo);
                        }
                    });
            } else if (this.bankno.length > 19) {
                this.bankno = this.bankno.slice(0, 19);
            }
        },
        // 校验预留手机号,用户名
        watchMob() {
            this.checkBtnShow();
            if (this.usrname === "" || this.usridno.length < 18) {
                this.noShow = false;
            }
        },
        watchNumberID() {
            this.hasInputNumber = false;
            const idcardReg =
                /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            if (this.usridno.length >= 18) {
                this.usridno = this.usridno.slice(0, 18);
                console.log(this.usridno.length);
                if (idcardReg.test(this.usridno)) {
                    console.log("合法");
                    this.isTrueNumber = false;
                } else {
                    console.log("不合法");
                    this.isTrueNumber = true;
                }
            } else {
                this.isTrueNumber = false;
            }
            if (this.usrname === "" || this.usridno.length < 18) {
                this.noShow = false;
            }
            this.checkBtnShow();
        },
        // 下一步
        nextPage() {
            this.loading = true;
            // this.allright = false; // 提交之后不可再点击
            if(this.secGeneration) {
                // 非二代身份证
                api.getInitinfo({
                    orgcode: this.comeCode,
                    userName: this.usrname,
                    cardNo: this.usridno,
                }).then((data) => {
                    this.loading = false
                    this.$router.push({
                        name: "walletOpenAccValiCode",
                        query: {
                            sourceChannel: this.sourceChannel,
                            orgName: this.cardType,
                            bankno: this.bankno,
                            orgcode: this.orgcode,
                            sslx: this.sslx,
                            cardPhone: this.cardPhone,
                            bankCd: this.bankcd,
                            typeId: this.typeid,
                            fxmobile: this.fxmobile,
                            ZFbackID: this.ZFbackID,
                            idCardNo: this.usridno,
                            userName: this.usrname,
                            isGroupNum: this.isGroupNum,
                        },
                    });
                }).catch((err) => {
                    this.loading = false
                    this.checkCont = err.msgInfo;
                    this.checkOpen = true;
                    return
                })
            } else {
                this.$router.push({
                    name: "walletOpenAccValiCode",
                    query: {
                        sourceChannel: this.sourceChannel,
                        orgName: this.cardType,
                        bankno: this.bankno,
                        orgcode: this.orgcode,
                        sslx: this.sslx,
                        cardPhone: this.cardPhone,
                        bankCd: this.bankcd,
                        typeId: this.typeid,
                        fxmobile: this.fxmobile,
                        ZFbackID: this.ZFbackID,
                        idCardNo: this.usridno,
                        userName: this.usrname,
                        isGroupNum: this.isGroupNum,
                    },
                });
            }
            // let numberID;
            // let userName;
            // if(this.isGroupNum==='0'){
            //     numberID = ''
            //     userName = ''
            // }else{
            //     numberID = this.usridno
            //     userName = this.usrname
            // }
            // this.saveUserInfo();
            let madianData = {};
            if (this.typeid === "madian") {
                // eslint-disable-next-line no-const-assign
                madianData = {
                    jobNum: store2.default.get("madianJobNum"),
                    userBusiNum: store2.default.get("madianUserbusiNum"),
                };
            }
            // api.sendMsgOpenAcct(Object.assign({
            //     bsm: "",
            //     callbackurl: "http://baidu.com",
            //     cardNo: this.bankno,
            //     bankNum: this.bankcd,
            //     devicecos: "",
            //     orgcode: this.orgcode,
            //     cardPhone: this.cardPhone,
            //     sslx: this.sslx,
            //     typeId: this.typeid,
            //     fxmobile: this.fxmobile,
            //     idCardNo: numberID,
            //     userName: userName
            //   },madianData))
            //   .then((data) => {
            //     console.log(data);
            //     store2.default.set('FromXyNum','')
            //     this.loading = false;
            //     this.allright = true;
            //     this.$router.push({
            //       name: "walletOpenAccValiCode",
            //       query: {
            //         bankno: this.bankno,
            //         orgcode: this.orgcode,
            //         sslx: this.sslx,
            //         cardPhone: this.cardPhone,
            //         bankCd: this.bankcd,
            //         typeId: this.typeid,
            //         fxmobile: this.fxmobile,
            //         ZFbackID:this.ZFbackID
            //       },
            //     });
            //   })
            //   .catch((err) => {
            //     // console.log(err);
            //     this.loading = false;
            //     this.allright = true;
            //     if (err.msgCd !== "BUS00000") {
            //       this.$toast.info(err.msgInfo);
            //       if (err.msgCd === "BUS20017") {
            //         // 用户未登录，跳转登录
            //       }
            //     }
            //   });
        },
        // 点击勾选协议
        checkbox() {
            if (store2.default.get("xieyi")) {
                this.isYx = !this.isYx;
                this.checkBtnShow();
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
        },

        // 检验验证码是否可点击
        checkBtnShow() {
            if (
                this.usrmob &&
                this.usrname &&
                this.usridno.length >= 18 &&
                !this.isTrueNumber
            ) {
                this.allright = false;
                this.noShow = true;
            } else {
                this.allright = true;
                this.noShow = false;
            }
        },
        // 跳转换绑
        gochangeBind() {
            this.$router.push({
                name: "changeBinding",
            });
        },
        // 跳转签约
        confirmSign() {
            this.$router.push({
                name: "walletSign",
                query: {
                    typeId: this.typeid,
                },
            });
        },
        // 取消换绑跳转首页
        goIndex() {
            if (this.gourl) {
                this.$router.push({
                    // name: "walletCardcenter",
                    name: "newFortune",
                });
            } else {
                window.location.href = this.gourl;
            }
        },
        // 确认返回
        confirmback() {
            this.$router.go(-1);
        },
        toSetUp() {
            this.$router.push("/myPage/looseChange");
        },
        getQueryString(name) {
            const reg = `(^|&)${name}=([^&]*)(&|$)`;
            const r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        // 保存用户信息
        saveUserInfo() {
            var data = {
                taxobj: this.taxobj,
                bankno: this.bankno,
                bankname: this.bankname,
                cardPhone: this.cardPhone,
                bankcd: this.bankcd,
                usrname: this.usrname,
                usridno: this.usridno,
            };
            window.sessionStorage.setItem("userInfo", JSON.stringify(data));
        },
        // 显示用户数据
        showUserInfo() {
            var data = JSON.parse(window.sessionStorage.getItem("userInfo"));
            this.taxobj = data.taxobj;
            this.bankno = data.bankno;
            this.bankname = data.bankname;
            this.cardPhone = data.cardPhone;
            this.bankcd = data.bankcd;
            this.usrname = data.usrname;
            this.usridno = data.usridno;
            window.sessionStorage.removeItem("userInfo");
        },
        // 根据typeId获取返回地址
        getBackurl() {
            api.getBackAddress({
                typeId: this.typeid,
                fxmobile: this.fxmobile,
                testBody: "pro", // 生产是pro,测试是test
            })
                .then((data) => {
                    console.log(data);
                    this.gourl = data.resultObj;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 离开开户页面
        trueLeave() {
            if (!this.isClickBack) {
                this.isClickBack = true;
                api.leaveKhSms({}).then(() => {});
                const FromXyNum = store2.default.get("FromXyNum") || "";
                if (FromXyNum) {
                    this.$router.go(-(FromXyNum + 1));
                } else {
                    this.$router.go(-1);
                }
                store2.default.set("FromXyNum", "");
            }
        },
        // 点击输入框未填写离开时，显示提示
        InputBanknoWarning() {
            if (!this.bankno) {
                this.hasInputBankno = true;
            } else {
                this.hasInputBankno = false;
            }
        },
        // 点击输入框未填写离开时，显示提示
        inputPhoneWarning() {
            if (!this.cardPhone) {
                this.hasInputPhone = true;
            } else {
                this.hasInputPhone = false;
            }
        },
        inputNameWarning() {
            if (!this.usrname) {
                this.hasInputName = true;
            } else {
                this.hasInputName = false;
            }
            if (this.userName !== "" && this.usridno.length === 18) {
                if (!this.comeCode) {
                    this.getUsrData();
                } else {
                    if(!this.secGeneration) {
                        this.getUsrDataType();
                    }
                }
            }
        },
        inputNumberWarning() {
            if (!this.usridno) {
                this.hasInputNumber = true;
            } else {
                this.hasInputNumber = false;
            }
            if (this.usridno.length !== 18 && this.usridno.length !== 0) {
                this.isTrueNumber = true;
            } else {
                this.isTrueNumber = false;
            }
            if (this.userName !== "" && this.usridno.length === 18) {
                if (!this.comeCode) {
                    this.getUsrData();
                } else {
                    if(!this.secGeneration) {
                        this.getUsrDataType();
                    }
                }
            }
        },
        // 去设置默认零钱账户
        setDefaultBank() {
            this.$router.push({ name: "looseChange" });
        },
        // 查询所有零钱账户
        getAllLoose() {
            api.looseChange
                .qryAllAcc({
                    entryTx: "",
                    // 测试传，生产不传
                    mobile: this.usrmobile,
                })
                .then((res) => {
                    this.myBanks = res.list;
                    var isDefaultAcc = false;
                    // eslint-disable-next-line prefer-destructuring
                    for (let i = 0; i < this.myBanks.length; i += 1) {
                        if (
                            this.myBanks[i].accNbr == null ||
                            this.myBanks[i].orgCode === "ICBC-DIGICCY"
                        ) {
                            this.myBanks.splice(i, 1);
                            i -= 1;
                        } else if (this.myBanks[i].defaultAccFlg === "01") {
                            isDefaultAcc = true;
                        }
                    }

                    if (!isDefaultAcc && this.myBanks.length > 0) {
                        this.defalutPopupShow = true;
                    } else {
                        this.isMobileCheck();
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        //监听的内容--实时变化的窗口高度
        watchResize() {
            this.screenHeight = document.documentElement.clientHeight;
        },
    },
    beforeDestroy() {
        this.$store.commit("comprehensiveSi", false);
        this.$store.commit("comprehensiveQi", false);
        window.removeEventListener("popstate", this.listenerFun, false);
    },
    watch: {
        //监听屏幕高度变化
        screenHeight(newHeight) { 
            this.height = this.originalHeight <= newHeight;
        }
    },
    beforeDestroy() {
        // 销毁
        window.removeEventListener("resize", this.watchResize);
    }
};
</script>

<style scoped lang="less">
.box {
    height: 100vh;
    background: #f5f5f5;
}
.account-index-wrapper {
    overflow-x: hidden;
    background: #f5f5f5;
}
.headNav {
    background-color: #fff;
    text-align: center;
    height: 88px;
    line-height: 88px;
    position: relative;
    .leftBack {
        .arrowIco {
            color: #238ff2;
            font-size: 34px;
            position: absolute;
            left: 36px;
            top: 50%;
            transform: translateY(-50%);
        }
        span {
            position: absolute;
            left: 80px;
            top: 50%;
            transform: translateY(-50%);
            width: 100px;
            height: 48px;
            opacity: 1;
            font-size: 34px;
            font-weight: 400;
            text-align: left;
            color: #238ff2;
            line-height: 48px;
        }
    }
    .titleTxt {
        color: #13252e;
        font-size: 36px;
    }

    .titleR {
        color: #553cd9;
        font-size: 28px;
        position: absolute;
        right: 30px;
    }
}
.account-index-wrapper .header {
    height: 1.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 0.3rem;
}
.account-index-wrapper .header .icon {
    display: inline-block;
    width: 0.78rem;
    height: 0.78rem;
    border-radius: 50%;
}
.account-index-wrapper .header .head-inner {
    margin-left: 0.16rem;
}
.account-index-wrapper .header .head-tit {
    font-size: 0.36rem;
    color: #171717;
    font-weight: 500;
}
.account-index-wrapper .header .head-content {
    font-size: 0.24rem;
    color: #171717;
    margin-top: 0.16rem;
}
.account-index-wrapper .header .highlight {
    color: #ff1414;
}
.account-index-wrapper .head-tip {
    height: 1.18rem;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    background-color: #fff;
}
.account-index-wrapper .head-tip-content {
    padding: 0.16rem 0.2rem;
    color: #fff;
    background-color: #fc8d8b;
    border-radius: 0.1rem;
    font-size: 0.24rem;
    position: relative;
    top: 0.42rem;
    left: 0.3rem;
}
.account-index-wrapper .head-tip-content::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 0.18rem solid transparent;
    border-right: 0.18rem solid transparent;
    border-bottom: 0.18rem solid #fc8d8b;
    top: -0.16rem;
    left: 0.2rem;
}
.account-index-wrapper .change-btn.off {
    background: rgba(0, 0, 0, 0.2);
}
.account-index-wrapper .change-btn {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.47rem;
    width: 6.9rem;
    height: 0.94rem;
    //background: #238ff2;
    border-radius: 0.08rem;
    font-size: 0.34rem;
    border: 0;
    color: #fff;
    background: #8ec4f6;
    pointer-events: none;
}
.account-index-wrapper .actcodebtn {
    background: #0195ff;
    pointer-events: inherit;
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
    margin-left: 0.55rem;
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
.agreement {
    margin-top: 0.4rem;
    padding: 0rem 0.9rem 0.6rem;
    height: 81%;
    overflow: hidden;
    overflow-y: scroll;
    p {
        font-size: 0.26rem;
        color: #666666;
        line-height: 0.4rem;
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
.is-agreement {
    display: block;
    margin-left: 0.3rem;
}
.is-agreement input {
    display: none;
}
.is-agreement p {
    font-size: 0.24rem;
    color: #666;
}
.is-agreement p a {
    color: #238ff2;
}
.is-agreement input[type="checkbox"] + p::before {
    content: "";
    display: inline-block;
    width: 0.31rem;
    height: 0.31rem;
    background: url(../../assets/images/check-off.png) no-repeat;
    background-size: 100% 100%;
    margin-right: 0.13rem;
    vertical-align: middle;
    margin-top: 4px;
}
.is-agreement input[type="checkbox"]:checked + p::before {
    content: "";
    display: inline-block;
    width: 0.31rem;
    height: 0.31rem;
    background: url(../../assets/images/check-on.png) no-repeat;
    background-size: 100% 100%;
    margin-right: 0.13rem;
    vertical-align: middle;
    margin-top: 4px;
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
.loading-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 1.2rem;
}
.toast {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 5.4rem;
    height: 0.8rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0.4rem;
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.8rem;
    text-align: center;
    margin-top: 3rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.popup-alert__content {
    overflow: hidden;
}
.popup-alert .popup-main {
    font-size: 0.28rem;
    color: #333;
    padding: 0.3rem 0.24rem;
    letter-spacing: -1px;
    text-align: center;
    line-height: 1.5;
}
.popup-alert .btn-sure {
    width: 4.6rem;
    height: 0.82rem;
    background: #238ff2;
    border-radius: 0.08rem;
    font-size: 0.32rem;
    color: #fff;
    display: block;
    margin: 0.3rem auto;
}
.md-example-popup .alert-actions {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.25rem 0.2rem 0.4rem;
    width: 5.4rem;
    margin: 0 auto;
}
.md-example-popup .alert-actions .btn {
    display: block;
    width: 2.42rem;
    height: 0.82rem;
    border-radius: 0.08rem;
    border: 1px solid #999999;
    color: #999;
    font-size: 0.32rem;
    background: #fff;
}
.md-example-popup .alert-actions .btn-sure {
    background: #238ff2;
    color: #fff;
    border: 1px solid #238ff2;
    margin: 0;
}
.agreement-wrap {
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
}
.agreement-wrap .head {
    font-size: 0.36rem;
    color: #333;
    text-align: center;
    font-weight: 700;
    line-height: 0.5rem;
    margin-bottom: 0.2rem;
}
.agreement-wrap em {
    font-weight: 700;
    color: #666666;
}
.agreement-wrap .agreement-btn {
    width: 6rem;
    height: 0.9rem;
    background: #0195ff;
    border-radius: 0.08rem;
    font-size: 0.32rem;
    color: #fff;
    display: block;
    margin: 0.3rem auto;
    font-weight: 700;
    border: none;
}
.opening {
    text-align: center;
    border-top: 0.2rem solid #f5f5f5;
}
.opening .loading-pic {
    width: 1.22rem;
    height: 1.22rem;
    margin-top: 1.14rem;
}
.opening .ctx {
    font-size: 0.4rem;
    color: #333;
    line-height: 0.4rem;
    margin-top: 0.46rem;
    font-weight: 500;
}
.opening .tip {
    font-size: 0.3rem;
    color: #888;
    line-height: 0.45rem;
    margin: 0.54rem auto 0;
}
.opening .btn {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2.64rem;
    width: 4rem;
    height: 0.94rem;
    background: #238ff2;
    border-radius: 0.08rem;
    font-size: 0.34rem;
    border: 0;
    color: #fff;
}
.opening .off {
    background: rgba(35, 143, 242, 0.6);
}
.opening .btn span {
    margin-left: 0.2rem;
}
.opening-result-header {
    height: 5.44rem;
    background: url(../../assets/images/opening-bg.png) no-repeat;
    background-size: 100% 100%;
    color: #fff;
    text-align: center;
}
.opening-result-header .icon {
    width: 1.24rem;
    margin-top: 0.87rem;
}
.opening-result-header .h3 {
    font-size: 0.4rem;
    margin-top: 0.4rem;
}
.opening-result-header .h4 {
    font-size: 0.3rem;
    margin-top: 0.2rem;
}
.opening-result .opening-result-btn {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.3rem;
    width: 4rem;
    height: 0.94rem;
    background: #fff;
    border-radius: 0.47rem;
    font-size: 0.34rem;
    border: 0;
    color: #999999;
    border: 1px solid #dddddd;
}
.opening-result .quan-group {
    padding: 0.5rem 0.3rem;
}
.opening-result .quan-group img {
    margin-bottom: 0.2rem;
}
.skeleton {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    width: 100%;
    z-index: 2;
    img {
        width: 100%;
        height: 100%;
    }
}
.bank_info {
    display: inline-block;
    width: 0.36rem;
    height: 0.36rem;
    margin-left: 0.1rem;
    vertical-align: middle;
    background: url(../../assets/images/bank-help.png) no-repeat;
    background-size: 100% 100%;
}
.bank-card-current {
    background: url(../../assets/images/bank-bg.png) no-repeat;
    background-size: 100% 100%;
    height: 0.86rem;
    display: flex;
    justify-content: flex-start;
    font-size: 0.26rem;
    color: #666;
    align-items: center;
    padding: 0.3rem 0.2rem 0.1rem 0.2rem;
    box-sizing: border-box;
    margin-top: -0.2rem;
}
.bank-card-current img {
    display: inline-block;
    width: 0.36rem;
    height: 0.36rem;
    margin: 0 0.1rem;
}
.bank-card-error {
    color: #ff1414;
}
.bank-card-error .link {
    color: #238ff2;
}
.sl_pop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 32;
}
.sl_content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5.3rem;
    background: #ffffff;
    border-radius: 0.2rem;
    padding-bottom: 0.3rem;
}
.sl_con {
    width: 100%;
    height: 4.7rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    box-sizing: border-box;
    overflow: auto;
    font-size: 0.26rem;
    color: #333;
    line-height: 0.4rem;
}
.sl_btns {
    position: absolute;
    left: 50%;
    top: 77%;
    transform: translateX(-50%);
    width: 4rem;
    height: 0.7rem;
    background: #4e95ff;
    border-radius: 0.5rem;
    font-size: 0.36rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.7rem;
    letter-spacing: 0.02rem;
}
.sl_tit {
    font-size: 0.3rem;
    color: #000000;
    text-align: center;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    font-weight: 700;
}
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
}
.arrow-new {
    float: right;
    position: absolute;
    right: 0rem;
    top: 0.35rem;
    width: 0.26rem;
    height: 0.26rem;
}
.bank_note {
    width: 100%;
    height: 0.7rem;
    background: #f5f5f5;
    border-radius: 0.1rem;
    position: relative;
    top: -0.1rem;
    line-height: 0.7rem;
    display: none;
}
.triangle-up {
    width: 0;
    height: 0;
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
    border-bottom: 0.3rem solid #f5f5f5;
    position: absolute;
    top: -0.2rem;
    left: 0.8rem;
}
.bank_note p {
    font-size: 0.26rem;
    color: #ff1414;
    padding-left: 0.4rem;
    a {
        color: #0195ff;
    }
}
.account-index-wrapper .unbtn {
    background: #8ec4f6;
    pointer-events: none;
}
.recommend-wallet {
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 0.2rem;
    margin-top: 0.28rem;
    margin-bottom: 0.5rem;
    .juxing {
        margin-top: 10px;
        width: 6px;
        height: 20px;
        background: url("../../assets/images/openBanks/juxing.png") no-repeat;
        background-size: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    span {
        padding: 0 0 0 10px;
    }
}
.recommend-tit {
    font-size: 0.3rem;
    color: #888888;
    padding-left: 0.2rem;
}
.recommend-bank {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    // margin-left: 0.55rem;
    position: relative;
    text-align: right;
}
.recommend-bank span {
    // margin-right:.3rem;
    font-size: 0.24rem;
    color: #333;
}
.recommend-bank img {
    top: 0.05rem;
}
.agreement-outer {
    margin-bottom: 0.2rem;
}
.account-index-wrapper .change-btn {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%);
}
.wallet_top_header {
    width: 100%;
    height: 0.9rem;
    background: #fff;
    text-align: center;
    position: relative;
    line-height: 0.8rem;
    .back {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        color: #238ff2;
        font-size: 0.32rem;
        display: flex;
        img {
            width: 0.2rem;
            height: 0.33rem;
            margin-left: 0.3rem;
            display: block;
            margin-top: 0.2rem;
            margin-right: 0.1rem;
        }
    }
    span {
        font-size: 0.36rem;
        color: #333;
        font-weight: 500;
    }
}
.progress-pic div.actline {
    background: #0195ff;
}
.txt-progress span.act-progress {
    margin-left: -0.2rem;
    color: #0195ff;
}
#popup-msgCode {
    margin: 0 auto;
}
.openaccount .account-index-wrapper {
    background: #fff;
}
.verification_code-form .form_title {
    font-size: 0.36rem;
    color: #171717;
}
.verification_code-form .code-tip {
    font-size: 0.28rem;
}
.openaccount {
    height: initial;
}
.codebtn {
    width: 6.9rem;
    height: 0.9rem;
    background: #8ec4f6;
    border-radius: 0.1rem;
    color: #fff;
    margin: 4rem auto 0;
    margin-left: 0.3rem;
    pointer-events: none;
    font-size: 0.36rem;
    font-weight: 500;
}

.opening-account {
    width: 100%;
    margin-top: 0.5rem;
    text-align: center;
}
.opening-account img {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
    margin: 0 auto;
}
.opening-account p:nth-of-type(1) {
    font-size: 0.4rem;
    color: #333;
    padding-top: 0.4rem;
    font-weight: 500;
}
.opening-account .tip {
    font-size: 0.28rem;
    color: #888888;
    padding-top: 0.1rem;
}
.md-popup-title-bar {
    .title {
        font-size: 0.36rem;
        color: #333;
    }
}
.md-example-popup-bottom {
    width: 100%;
    padding: 0.05rem 0 1rem;
    position: relative;
    font-size: 0.28rem;
    font-family: DINPro;
    font-weight: 500;
    box-sizing: border-box;
    background-color: #fff;
    .cell {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 0.96rem;
        .bank-info {
            font-size: 0.28rem;
            color: #333;
        }
    }
}
.faxnote {
    width: 6.8rem;
    height: auto;
    opacity: 1;
    background: #ffffff;
    border-radius: 8px;
    text-align: center;
    .popup-normal__title {
        width: 6rem;
        height: 1rem;
        line-height: 1rem;
        // border-bottom:1px solid #e1e1e1;
        font-size: 0.38rem;
        color: #333;
        margin: 0 auto;
    }
    .popup-main {
        width: 5rem;
        text-align: center;
        margin: 0.48rem auto 0.23rem;
        font-size: 0.28rem;
        color: #333;
        line-height: 0.42rem;
    }
    .btn-sure {
        width: 4rem;
        height: 0.75rem;
        opacity: 1;
        background: #0195ff;
        border-radius: 0.08rem;
        color: #fff;
        font-size: 0.36rem;
    }
}
.popup-bank-main {
    padding: 0 0.29rem;
    .cell {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 0.96rem;
        .icon {
            width: 0.44rem;
            height: 0.44rem;
            margin-right: 0.16rem;
        }
        .bank-info {
            font-size: 0.28rem;
            color: #333;
        }
    }
}
.divider {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #969799;
    font-size: 14px;
    line-height: 24px;
    border-color: #eeeeee;
    border-style: solid;
    border-width: 0;
}
.divider::before {
    content: "";
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 1px;
    border-color: inherit;
    border-style: inherit;
    border-width: 1px 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
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
.skeleton {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 2;
    img {
        vertical-align: top;
        max-width: 100%;
    }
}
.pfnote {
    font-size: 0.24rem;
    color: #999;
    line-height: 1.5;
}
.gotoSetLoose {
    width: 5rem;
    background-color: #fff;
    border-radius: 10px;
    padding: 0.3rem;
    .loseTitle {
        width: 100%;
        height: 0.6rem;
        text-align: center;
        line-height: 0.4rem;
        font-size: 0.38rem;
        text-align: center;
    }
    p {
        font-size: 0.3rem;
        margin-bottom: 30px;
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
.input-error {
    padding: 0.2rem;
    border-top: 0.02rem solid #ff1414;
    font-size: 0.26rem;
    background: #f5f5f5;
}
.leaveModel {
    background: rgba(0, 0, 0, 0.5);
    .cont {
        width: 5rem;
        background: #ffffff;
        padding: 0.4rem;
        text-align: center;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        .top {
            font-size: 0.36rem;
            padding-bottom: 0.3rem;
            border-bottom: 0.01rem solid #999;
        }
        .text {
            padding: 0.4rem;
            line-height: 0.4rem;
            font-family: none;
        }
        .btnBox {
            display: flex;
            justify-content: space-between;
            .btn {
                width: 2rem;
                background: #008bff;
                color: #ffffff;
                line-height: 0.7rem;
                border-radius: 0.1rem;
            }
            .btnCancel {
                background: #ccc;
                color: #333;
            }
        }
    }
}
/deep/.md-field-item-title,
/deep/.md-input-item-input,
/deep/.md-field-item-control {
    font-size: 0.3rem;
}

</style>
