<template>
    <div class="warp">
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
        <div class="header">请确认您的身份证扫描结果</div>
        <!--        基本信息-->
        <div class="top">
            <div class="item">
                <div>姓名</div>
                <div>{{ queryList.userName }}</div>
            </div>
            <div class="item">
                <div>身份证号</div>
                <div>{{ queryList.idNo }}</div>
            </div>
            <div class="item">
                <div>性别</div>
                <div>{{ queryList.genderTpCode == "1" ? "男" : "女" }}</div>
            </div>
            <div class="item">
                <div>民族</div>
                <div>{{ queryList.nation }}</div>
            </div>
            <div class="item">
                <div>证件有效期</div>
                <div>
                    {{ queryList.validDate}}
                </div>
            </div>
        </div>
        <!--        可更改信息-->
        <div class="change">
            <div class="typeOfTax item">
                <md-field title="税收类型">
                    <md-field-item
                        :content="type.value"
                        @click="typeShow"
                        arrow
                        solid
                    />
                </md-field>
                <md-selector
                    v-model="type.show"
                    default-value="1"
                    :data="type.data"
                    max-height="4.2rem"
                    title="选择税收类型"
                    large-radius
                    @choose="typeChoose"
                    @cancel="BodyScroll(false)"
                ></md-selector>
            </div>
            <div class="job item">
                <md-field title="职业">
                    <md-field-item
                        :content="job.value"
                        @click="showPopUp('bottom')"
                        arrow
                        solid
                        placeholder='请选择职业信息'
                    />
                </md-field>
                <md-popup v-model="job.isPopupShow.bottom" position="bottom">
                    <md-popup-title-bar
                        only-close
                        large-radius
                        title="职业信息"
                        @confirm="hidePopUp('bottom')"
                        @cancel="hidePopUp('bottom')"
                    ></md-popup-title-bar>
                    <div class="jobBox">
                        <div class="left">
                            <div
                                class="list"
                                :class="{ active: job.active == index }"
                                v-for="(item, index) in job.data"
                                @click="jobChoose(index)"
                                :key="item.code"
                            >
                                {{ item.label }}
                            </div>
                        </div>
                        <div class="right">
                            <div
                                class="list"
                                v-for="(i, index) in job.children"
                                :key="i.code"
                                :class="{ color: job.color == index }"
                                @click="jobChooses(i.label, index, i.code)"
                            >
                                <span>{{ i.label }}</span>
                                <!-- <input class="custom" v-if="i.label == '其他'" type="text" v-model="jobValue" :oninput="changeVale()"> -->
                            </div>
                        </div>
                    </div>
                </md-popup>
            </div>
            <div class="mailingAddress item">
                <md-field title="通讯地址">
                    <md-field-item
                        :content="mailingAddress.value"
                        @click="showPopUps('bottom')"
                        arrow
                        solid
                        placeholder='请选择省市区'
                    />
                </md-field>
                <md-popup
                    v-model="mailingAddress.isPopupShow.bottom"
                    position="bottom"
                >
                    <md-popup-title-bar
                        only-close
                        large-radius
                        title="所在地区"
                        @confirm="hidePopUps('bottom')"
                        @cancel="hidePopUps('bottom')"
                    ></md-popup-title-bar>
                    <div class="mailingAddressBox">
                        <v-distpicker
                            type="mobile"
                            @province="onChangeProvince"
                            @city="onChangeCity"
                            @area="onChangeArea"
                        ></v-distpicker>
                    </div>
                </md-popup>
            </div>
            <div class="address">
                <input
                    type="text"
                    placeholder="详细地址"
                    v-on:input="ipsEvent"
                    v-model="queryList.address"
                />
                <p
                  v-if="!queryList.address"
                  class="error"
                >
                  请填写详细地址
                </p>
            </div>
        </div>
        <!--        提交-->
        <div class="submitWarp">
            <div
                class="submit"
                @click="submit"
                :class="{ submitSure: submitSure }"
            >
                下一步：进入人脸识别
            </div>
        </div>

        <!--        授权弹窗-->
        <!--        <div class="agreementWarp">-->
        <!--            -->
        <!--        </div>-->
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
                        我已阅读并同意<span
                            style="color: #1b7aee"
                            @click="readPop = true"
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
        <md-dialog
            title="提醒"
            :closable="false"
            v-model="slotDialog.open"
            :btns="slotDialog.btns"
            >
            抱歉，您属于他国税收居民，暂时不支持开通钱包账户
        </md-dialog>
    </div>
</template>

<script>
import {
    Field, FieldItem, TabPicker, Popup, PopupTitleBar, Button, Icon, Dialog, Agree
} from 'mand-mobile';
import api from "@/common/apiUrls.js";

import VDistpicker from 'v-distpicker';

export default {
    name: 'identityInformation',
    components: {
        [Agree.name]: Agree,
        [Field.name]: Field,
        [FieldItem.name]: FieldItem,
        [TabPicker.name]: TabPicker,
        [Popup.name]: Popup,
        [PopupTitleBar.name]: PopupTitleBar,
        [Button.name]: Button,
        [Icon.name]: Icon,
        VDistpicker,
        Dialog
    },
    data() {
        return {
            jobValue: '其他',
            readPop: false,
            read: false,
            slotDialog: {
                open: false,
                btns: [
                    {
                        text: '确定'
                    }
                ]
            },
            type: {
                show: false,
                data: [
                    {
                        value: '1',
                        text: '本国税收居民'
                    },
                    {
                        value: '2',
                        text: '他国税收居民'
                    },
                    {
                        value: '3',
                        text: '其他'
                    }
                ],
                value: '本国税收居民'
            },
            job: {
                isPopupShow: {},
                show: false,
                data: [
                    {
                        label: '国家公务员及企事业单位负责人 ',
                        code: '000',
                        children: [
                            {
                                label: '国家公务员',
                                code: '001'
                            },
                            {
                                label: '事业单位负责人',
                                code: '002'
                            },
                            {
                                label: '企业负责人',
                                code: '003'
                            }
                        ]
                    },
                    {
                        label: '专业技术人员 ',
                        code: '100',
                        children: [
                            {
                                label: '科学研究人员',
                                code: '101'
                            },
                            {
                                label: '工程技术人员',
                                code: '102'
                            },
                            {
                                label: '农业技术人员',
                                code: '103'
                            },
                            {
                                label: '飞机和船舶技术人员',
                                code: '104'
                            },
                            {
                                label: '卫生专业技术人员',
                                code: '105'
                            },
                            {
                                label: '经济业务人员',
                                code: '106'
                            },
                            {
                                label: '金融业务人员',
                                code: '107'
                            },
                            {
                                label: '法律专业人员',
                                code: '108'
                            },
                            {
                                label: '教学人员',
                                code: '109'
                            },
                            {
                                label: '文学艺术工作人员',
                                code: '110'
                            },
                            {
                                label: '体育工作人员',
                                code: '111'
                            },
                            {
                                label: '新闻出版、文化工作人员',
                                code: '112'
                            },
                            {
                                label: '宗教职业者',
                                code: '113'
                            },
                            {
                                label: '其他专业技术人员',
                                code: '114'
                            }
                        ]
                    },
                    {
                        label: '公司职员和事业单位员工',
                        code: '',
                        children: [
                            {
                                label: '行政办公人员',
                                code: '201'
                            },
                            {
                                label: '安全保卫和消防人员',
                                code: '202'
                            },
                            {
                                label: '邮政和电信业务人员',
                                code: '203'
                            },
                            {
                                label: '其他办事人员和有关人员',
                                code: '204'
                            },
                            {
                                label: '外国使领馆人员',
                                code: '205'
                            },
                            {
                                label: '慈善机构工作人员',
                                code: '206'
                            }
                        ]
                    },
                    {
                        label: '商业、服务业人员',
                        code: '300',
                        children: [
                            {
                                label: '购销人员',
                                code: '301'
                            },
                            {
                                label: '仓储人员',
                                code: '302'
                            },
                            {
                                label: '餐饮服务人员',
                                code: '303'
                            },
                            {
                                label: '饭店、旅游及健身娱乐场所服务人员',
                                code: '304'
                            },
                            {
                                label: '运输服务人员',
                                code: '305'
                            },
                            {
                                label: '医疗卫生辅助服务人员',
                                code: '306'
                            },
                            {
                                label: '社会服务和居民生活服务人员',
                                code: '307'
                            },
                            {
                                label: '其他商业、服务业人员',
                                code: '308'
                            },
                            {
                                label: '珠宝、贵金属、艺术品收藏及拍卖人员',
                                code: '309'
                            },
                            {
                                label: '废旧物资回收人员',
                                code: '310'
                            }
                        ]
                    },
                    {
                        label: '农、林、牧、渔、水利业生产人员 ',
                        code: '400',
                        children: [
                            {
                                label: '农民',
                                code: '401'
                            },
                            {
                                label: '林业生产及野生动植物保护人员',
                                code: '402'
                            },
                            {
                                label: '畜牧业生产人员',
                                code: '403'
                            },
                            {
                                label: '渔业生产人员',
                                code: '404'
                            },
                            {
                                label: '水利设施管理养护人员',
                                code: '405'
                            },
                            {
                                label: '其他农、林、牧、渔、水利业生产人员',
                                code: '406'
                            }
                        ]
                    },
                    {
                        label: '工人',
                        code: '500',
                        children: [
                            {
                                label: '勘探及矿物开采人员',
                                code: '501'
                            },
                            {
                                label: '金属冶炼、轧制人员',
                                code: '502'
                            },
                            {
                                label: '化工产品生产人员',
                                code: '503'
                            },
                            {
                                label: '机械制造加工人员',
                                code: '504'
                            },
                            {
                                label: '机电产品装配人员',
                                code: '505'
                            },
                            {
                                label: '机械设备修理人员',
                                code: '506'
                            },
                            {
                                label: '电力设备安装、运行、检修及供电人员',
                                code: '507'
                            },
                            {
                                label: '电子元器件与设备制造、装配、调试及维修人员',
                                code: '508'
                            },
                            {
                                label: '橡胶和塑料制品生产人员',
                                code: '509'
                            },
                            {
                                label: '纺织、针织、印染人员',
                                code: '510'
                            },
                            {
                                label: '裁剪、缝纫和皮革、毛皮制品加工制作人员',
                                code: '511'
                            },
                            {
                                label: '粮油、食品、饮料生产加工及饲料生产加工人员',
                                code: '512'
                            },
                            {
                                label: '烟草及其制品加工人员',
                                code: '513'
                            },
                            {
                                label: '药品生产人员',
                                code: '514'
                            },
                            {
                                label: '木材加工、人造板生产、木制品制作及制浆、造纸和纸制品生产加工人员',
                                code: '515'
                            },
                            {
                                label: '建筑材料生产、加工人员',
                                code: '516'
                            },
                            {
                                label: '玻璃、陶瓷、搪瓷及其制品生产加工人员',
                                code: '517'
                            },
                            {
                                label: '广播影视制品制作、播放及文物保护作业人员',
                                code: '518'
                            },
                            {
                                label: '印刷人员',
                                code: '519'
                            },
                            {
                                label: '工艺、美术品制作人员',
                                code: '520'
                            },
                            {
                                label: '文化教育、体育用品制作人员',
                                code: '521'
                            },
                            {
                                label: '工程施工人员',
                                code: '522'
                            },
                            {
                                label: '运输设备操作人员及有关人员',
                                code: '523'
                            },
                            {
                                label: '环境监测与废物处理人员',
                                code: '524'
                            },
                            {
                                label: '检验、计量人员',
                                code: '525'
                            },
                            {
                                label: '其他生产、运输设备操作人员及有关人员',
                                code: '226'
                            }
                        ]
                    },
                    {
                        label: '军人/武警',
                        code: '600',
                        children: [
                            {
                                label: '军人/武警',
                                code: '600'
                            }
                        ]
                    },
                    {
                        label: '自由职业',
                        code: '700',
                        children: [
                            {
                                label: '自由职业',
                                code: '702'
                            },
                            {
                                label: '私营业主',
                                code: '703'
                            }
                        ]
                    },
                    {
                        label: '其他',
                        code: '900',
                        children: [
                            {
                                label: '离退休人员',
                                code: '995'
                            },
                            {
                                label: '学生',
                                code: '997'
                            }
                        ]
                    }
                ],
                value: '国家公务员',
                code: '',
                children: [],
                active: '-1',
                color: '-1'
            },
            mailingAddress: {
                isPopupShow: {},
                show: false,
                value: '',
                province: '',
                city: '',
                area: ''
            },
            // address: "",
            submitSure: false,
            authorization: {
                isPopupShow: {}
            },
            agreeConf: {
                checked: false,
                name: 'agree5',
                size: 'md',
                disabled: false,
                introduction: '方形勾选框未选中状态'
            },
            queryList: {
                userName: '',
                idNo: '',
                genderTpCode: '',
                imageOrderNo: '',
                nation: '',
                validDate: '',
                address: '',
                sslx: 'N',
                job: '',
                workCode: '',
                areaName: '',
                cityName: '',
                district: '',
                livingOrderNo: '',
                orgcode: "BOCM"
            },
        };
    },
    mounted() {
        let queryList = {}
        if(this.$route.query.queryData) {
            queryList = JSON.parse(decodeURIComponent(this.$route.query.queryData))
            console.log(queryList,'+++++')
            this.queryList.userName = queryList.userName || ''
            this.queryList.idNo = queryList.idNo || ''
            this.queryList.genderTpCode = queryList.genderTpCode || ''
            this.queryList.imageOrderNo = queryList.imageOrderNo || ''
            this.queryList.nation = queryList.nation || ''
            this.queryList.validDate = queryList.validDate || ''
            this.queryList.address = queryList.address || ''
        }
    },
    created() {
        const banksInfo = JSON.parse(window.sessionStorage.getItem('banksInfo'));
        if (banksInfo) {
            console.log(banksInfo);
            this.queryList.job = banksInfo.job;
            this.job.value = banksInfo.job;
            this.queryList.workCode = banksInfo.workCode;
            this.queryList.areaName = banksInfo.areaName;
            this.queryList.cityName = banksInfo.cityName;
            this.queryList.district = banksInfo.district;
            this.queryList.address = banksInfo.address;
            this.mailingAddress.value = banksInfo.areaName + banksInfo.cityName + banksInfo.district || '';
            this.read = true;
            this.agreeConf.checked = true;
        } else {
            this.jobChoose(0);
            this.jobChooses(
                this.job.children[0].label,
                0,
                this.job.children[0].code
            );
        }
    },
    watch: {
        mailingAddress: {
            handler(newVal, oldVal) {
                console.log(newVal, '-=-=-=-=-');
                if (
                    newVal.value != ''
                    && this.queryList.address.length != 0
                ) {
                    console.log('****---');
                    this.submitSure = true;
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        typeShow() {
            this.type.show = true;
            this.BodyScroll(true);
        },
        // alert() {
        //     Dialog.alert({
        //         title: '提醒',
        //         content: '抱歉，您属于他国税收居民，暂时不支持开通钱包账户',
        //         confirmText: '确定',
        //         onConfirm: () => this.BodyScroll(false),
        //     })
        // },
        typeChoose({ value, text }) {
            if (text == '他国税收居民') {
                // this.alert();
                this.slotDialog.open = true;
                this.type.value = '本国税收类型';
                if (value == '2') {
                    this.type.data[0].value = '2';
                    this.type.data[1].value = '1';
                } else {
                    this.type.data[0].value = '1';
                    this.type.data[1].value = '2';
                }
            } else {
                this.type.value = text;
                this.BodyScroll(false);
            }
        },
        showPopUp(type) {
            this.$set(this.job.isPopupShow, type, true);
            this.BodyScroll(true);
        },
        hidePopUp(type) {
            this.$set(this.job.isPopupShow, type, false);
            this.BodyScroll(false);
        },
        showPopUps(type) {
            this.$set(this.mailingAddress.isPopupShow, type, true);
            // this.BodyScroll(true);
        },
        hidePopUps(type) {
            this.$set(this.mailingAddress.isPopupShow, type, false);
            this.BodyScroll(false);
        },
        showAuthorization(type) {
            this.$set(this.authorization.isPopupShow, type, true);
            this.BodyScroll(true);
        },
        hideAuthorization(type) {
            this.$set(this.authorization.isPopupShow, type, false);
            this.BodyScroll(false);
        },
        // 阻止蒙层下滚动
        BodyScroll(popShow) {
            if (!popShow) {
                // 不显示
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
            } else {
                // 显示
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
            }
        },
        jobChoose(index) {
            this.job.children = this.job.data[index].children;
            this.job.active = index;
            this.job.color = '-1';
            console.log(this.job.children);
        },
        // changeVale() {
        //     this.job.value = this.jobValue;
        //     this.queryList.job = this.jobValue;
        // },
        jobChooses(text, index, code) {
            // if(text == "其他") {
            //     this.job.value = this.jobValue;
            //     this.job.color = index;
            //     this.job.code = code;
            //     this.queryList.workCode = code;
            //     this.queryList.job = this.jobValue;
            //     return
            // }
            this.job.value = text;
            this.job.color = index;
            this.job.code = code;
            this.queryList.workCode = code;
            this.queryList.job = text;
            this.$set(this.job.isPopupShow, 'bottom', false);
            this.BodyScroll(false);
        },
        onChangeProvince(a) {
            console.log(a);
            this.mailingAddress.province = a.value;
            console.log(a);
            this.queryList.areaName = a.value;
        },
        onChangeCity(a) {
            console.log(a);
            this.mailingAddress.city = a.value;
            this.queryList.cityName = a.value;
        },
        onChangeArea(a) {
            console.log(a);
            this.mailingAddress.area = a.value;
            this.queryList.district = a.value;
            if (this.mailingAddress.province == this.mailingAddress.city) {
                this.mailingAddress.value = this.mailingAddress.province + this.mailingAddress.area;
            } else {
                this.mailingAddress.value = this.mailingAddress.province
                    + this.mailingAddress.city
                    + this.mailingAddress.area;
            }
            this.$set(this.mailingAddress.isPopupShow, 'bottom', false);
        },
        ipsEvent() {
            console.log(999);
            if (this.queryList.address.length == 0) {
                this.submitSure = false;
            } else if (this.mailingAddress.value != '') {
                this.submitSure = true;
            }
        },
        // 授权校验
        submit() {
            if (this.submitSure) {
                console.log(1);
                this.showAuthorization('bottom');
            }
        },
        onChange(name, checked) {
            if (!this.read) {
                // console.log(999);
                this.readPop = true;
            }
            // console.log(
            //     `agree name = ${name} is ${checked ? "checked" : "unchecked"}`
            // );
        },
        goFace() {
            if (this.agreeConf.checked && this.read) {
                this.hideAuthorization('bottom');
                // console.log(this.queryList);
                // this.$router.push({
                //     name: 'faceRecognition',
                //     query: {
                //         ...this.queryList
                //     }
                // });
                var backUrl
                // faceType = "CANCEL_ACCOUNT";  销户
                // faceType = "OPEN_ACCOUNT";   开户
                if(process.env.VUE_APP_ENV == 'local') {
                    backUrl = 'http://192.168.100.167:8080/fintech-h5/fortuneCenter/openAccount/walletOpenAccValiCode'
                } else {
                    backUrl = `https://fintech.12580life.com${process.env.BASE_URL}openAccount/walletOpenAccValiCode`
                }
                api.BOCM.face({
                    backUrl: backUrl,
                    faceType: 'OPEN_ACCOUNT'
                })
                .then(res => {
                    this.queryList.livingOrderNo = res.livingOrderNo;
                    console.log(res.livingOrderNo,'--------')
                    window.location.href = res.url
                    window.sessionStorage.setItem('saveQuery',JSON.stringify(this.queryList))
                })
                .catch((err) => {
                    window.sessionStorage.setItem('saveQuery',JSON.stringify(this.queryList))
                    if(err.msgInfo) {
                        this.$toast.info(err.msgInfo,3000);
                    } else {
                        this.$toast.info('系统开小差了，请重新尝试~',3000);
                    }
                })
            }
        },
        haveRead() {
            this.read = true;
            this.readPop = false;
            this.agreeConf.checked = true;
        }
    }
};
</script>

<style lang="less" scoped>
.warp {
    width: 100%;
    min-height: 100vh;
    background: #f9f9fb;
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
    .header {
        width: 408px;
        height: 48px;
        font-weight: 400;
        font-size: 34px;
        color: #171717;
        padding: 50px 321px 26px 21px;
    }
    .top {
        width: 100%;
        height: 493px;
        background: #ffffff;
        padding: 0 27.5px;
        box-sizing: border-box;
        margin-bottom: 30px;
        .item {
            width: 100%;
            height: 98px;
            border-bottom: 1px solid #e1e1e1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 400;
            font-size: 32px;
            color: #171717;
        }
    }
    .change {
        width: 100%;
        background: #ffffff;
        padding-bottom: 40px;
        box-sizing: border-box;
        .item {
            padding: 29px 0 25.5px;
            box-sizing: border-box;
            width: 100%;
            height: 159px;
            border-bottom: 1px solid #e1e1e1;
            margin-bottom: 30px;
            /deep/ .md-field {
                .md-field-header {
                    font-weight: 400;
                    font-size: 28px;
                    color: #171717;
                    margin-bottom: 20px;
                }
                .md-field-title {
                    font-size: 28px;
                    color: #171717;
                }
                .md-field-content {
                    font-size: 32px;
                    color: #171717;
                    .md-field-item-control {
                        font-size: 32px;
                    }
                }
            }
        }
    }
    .typeOfTax {
        /deep/ .md-popup-box {
            .title-bar-title {
                &:before {
                    content: "";
                    position: absolute;
                    z-index: 2;
                    -webkit-transform-origin: 100% 50%;
                    transform-origin: 100% 50%;
                    -webkit-transform: scaleY(0.5) translateY(100%);
                    transform: scaleY(0.5) translateY(100%);
                    bottom: 0;
                    left: 0;
                    right: auto;
                    top: auto;
                    width: 100%;
                    border-bottom: solid 0.02rem #e1e1e1;
                    -webkit-transform-origin: 50% 100%;
                    transform-origin: 50% 100%;
                }
                .title {
                    font-weight: 400;
                    font-size: 36px;
                    color: #333333;
                }
            }
            .no-border {
                visibility: hidden;
            }
            .md-cell-item-body::before {
                border-bottom: solid 0.02rem #e1e1e1;
            }
            p {
                text-align: left;
            }
        }
    }
    .jobBox {
        background: #ffffff;
        display: flex;
        padding-bottom: 67px;
        margin-top: -2px;
        padding-top: 20px;
        .list {
            //width: 100%;
            height: 80px;
            box-sizing: border-box;
            font-size: 24px;

            color: #333333;
            position: relative;
        }
        //.active{
        //
        //}
        .left {
            width: 308px;
            height: 960px;
            border-right: 1px solid #eaeaea;
            padding-left: 12px;
            padding-right: 20px;
            box-sizing: border-box;
            .list {
                width: 266px;
                font-weight: 500;
            }
            .active {
                &:before {
                    content: "";
                    position: absolute;
                    top: 2px;
                    left: -12px;
                    width: 8px;
                    height: 25px;
                    background: #1b7aee;
                    border-radius: 0 2px 2px 0;
                    border-radius: 0 2px 2px 0;
                }
            }
        }
        .right {
            padding-left: 22px;
            height: 976px;
            overflow-y: scroll;
            -ms-overflow-style: none;
            overflow: -moz-scrollbars-none;
            font-weight: 400;
            &::-webkit-scrollbar {
                width: 0 !important;
            }
            .color {
                color: #1b7aee;
            }
        }
        .custom {
            width: 80%;
            border: 2px solid #666666;
            text-indent: 10px;
        }
    }
    .mailingAddress {
        /deep/ .md-popup-box {
            width: 100%;
            height: 897px;
            .md-popup-title-bar .title-bar-title {
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .md-popup-title-bar .title-bar-title p.title {
                font-weight: 500;
                font-size: 32px;
                color: #999999;
                text-align: center;
            }
            .distpicker-address-wrapper .address-container ul {
                height: 706px;
                min-height: 706px;
                overflow-y: scroll;
                li {
                    height: 72px;
                    line-height: 72px;
                    font-weight: 400;
                    font-size: 30px;
                    color: #333333;
                    padding-left: 36px;
                }
            }
            .distpicker-address-wrapper .address-header {
                height: 90px;
                background: #f6f6f6;
                margin-top: -1px;
                margin-bottom: -1px;
                ul {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    li {
                        border: none;
                        font-weight: 400;
                        font-size: 34px;
                        color: #333333;
                        text-align: center;
                        width: 25%;
                        padding: 0;
                    }
                    li:nth-child(2) {
                        width: 50%;
                    }
                    .active {
                        color: #1b7aee;
                    }
                }
            }
        }
    }
    .address {
        width: 100%;
        height: 97px;
        padding: 0 30px;
        box-sizing: border-box;

        input {
            width: 100%;
            height: 100%;
            line-height: 100%;
            outline: none;
            border: none;
            font-weight: 400;
            font-size: 32px;
            border-bottom: 1px solid #e1e1e1;
            //color: #909396;
            &::placeholder {
                color: #909396;
            }
        }
    }
    .submitWarp {
        width: 100%;
        height: 271px;
        display: flex;
        justify-content: center;
        align-items: center;
        .submit {
            width: 646px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            background: #bdd9f8;
            border-radius: 55px;
            font-weight: 400;
            font-size: 36px;
            color: #ffffff;
        }
        .submitSure {
            background: #1b7aee;
        }
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
}
/deep/ .md-dialog-body {
    text-align: center;
}
  .error{
    float: left;
    width: 100%;
    color :#ff0000;
    position: relative;
    border-top: 1px solid;
    font-size: 24px;
    padding-top: 5px;
  }
  .error1{
    float: left;
    width: 100%;
    color :#ff0000;
    margin-left:30px;
    margin-top: -28px;
  }
</style>
