<!--
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2022-12-05 15:11:14
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-05-29 16:58:00
 * @FilePath: \wallet\src\views\BOCM\submitID.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="box">
        <h5>请扫描您本人真实有效的二代身份证信息</h5>
        <div class="ID up">
            <div class="idImg" v-for="(item, index) in imageList['reader0']" :key="index">
                <img :src="item" alt="">
            </div>
            <md-image-reader name="reader0" @select="onReaderSelect" @complete="onReaderComplete" @error="onReaderError"
                is-multiple></md-image-reader>
            <div class="mic">
            </div>
            <p v-if="!isSelect">点击拍摄身份证头像面</p>
            <p v-if="isSelect">点击修改身份证头像面</p>
        </div>
        <div class="ID down">
            <div class="idImg" v-for="(item, index) in imageList['reader1']" :key="index">
                <img :src="item" alt="">
            </div>
            <md-image-reader name="reader1" @select="onReaderSelect" @complete="onReaderComplete" @error="onReaderError"
                is-multiple></md-image-reader>
            <div class="mic"></div>
            <p v-if="!isSelect_2">点击拍摄身份证国徽面</p>
            <p v-if="isSelect_2">点击修改身份证国徽面</p>
        </div>
        <div class="textArea">
            <p class="tips">请保证身份证四角完整，信息清晰可见。<span @click="open()">查看示例图</span></p>
            <p class="tips_2">我们会依法保护您的个人信息安全；此信息仅用于身份验证、开通账户服务；</p>
            <div class="dashed"></div>
            <p class="tips_3"> <span style="color: red;">您即将开通交通银行二类账户</span> ，账户服务由江苏移动&交通银行共同提供</p>
            <div class="xieyi">
                <label>
                    <p :class="isGou ? 'check' : 'checkOff'" @click="check()"></p>
                </label>
                <div>
                    <p class="tips_4">
                        我已阅读并同意
                        <template v-if="!displayConfigurationName">
                          <a href="javascript: ;" @click.prevent="goXieyi(1)">《交通银行太平洋借记卡章程》</a>
                          <a href="javascript: ;" @click.prevent="goXieyi(2)">《交通银行太平洋个人借记卡领用合约》</a>
                          <a href="javascript: ;" @click.prevent="goXieyi(3)">《个人人民币银行结算账户管理协议》</a>
                          <a href="javascript: ;" @click.prevent="goXieyi(4)">《用户授权协议》</a>
                          <a href="javascript: ;" @click.prevent="goXieyi(6)">《和包授权协议》</a>
                          <a href="javascript: ;" @click.prevent="goXieyi(7)">《和包隐私权政策》</a>
                          <a href="javascript: ;" @click.prevent="goXieyi(8)">《和包支付业务用户服务协议》</a>
                        </template>
                        <template v-else>
                           <a href="javascript: ;" @click.prevent="goXieyi(1)">{{displayConfigurationName}}</a>
                        </template>
                        <a href="javascript: ;" @click.prevent="goXieyi(5)">《移动钱包业务受理协议》</a>
                    </p>
                    <p class="tips_4">
                        1.本人充分了解并清楚知晓出租、出借、出售、购买账户的相关法律责任和惩戒措施，承诺依法依规开立和使用本人账户。<span style="color: rgb(0 98 219);font-size: 0.22rem;" @click="details1">查看详细解释</span>
                    </p>
                    <p class="tips_4">
                        2.本人承诺仅为中国税收居民，不是美国个人也不是其他国家（地区）税收居民。<span style="color: rgb(0 98 219);font-size: 0.22rem;" @click="details2">查看详细解释</span>
                    </p>
                </div>
            </div>
            <div :class="!checkSubmit ? 'submit_lock' : lock ? 'lock' : 'submit'" @click="submit()">提交</div>
        </div>
        <!-- 弹框 -->
        <div class="tankuang" v-if="tankuang">
            <div class="tips" v-if="tips">
                <div class="btn" @click="close()">我已知晓</div>
            </div>
            <div class="tishi" v-if="tishi">
                <h5>提醒</h5>
                <hr>
                <p>身份证校验失败</p>
                <p>请重新拍摄上传</p>
                <div class="btn" @click="close()">确认</div>
            </div>
            <div class="sweetToast" v-if="sweetTips">
                <h5>温馨提示</h5>
                <hr>
                <p>当前登录的手机号码非无锡移动用户，开户后无法获得活动奖励，是否继续？</p>
                <div style="width: 100%;display: flex;justify-content: space-evenly;margin-bottom: 0.4rem;">
                    <div class="cancelBtn" @click="cancelOpen">取消开户</div>
                    <div class="confirmBtn" @click="close()">继续开户</div>
                </div>
            </div>
            <div class="sweetToast" v-if="sweetTips_2">
                <h5>温馨提示</h5>
                <hr>
                <p>您已经不是交行新用户哦，开户后无法获得奖励，是否继续？</p>
                <div style="width: 100%;display: flex;justify-content: space-evenly;margin-bottom: 0.4rem;">
                    <div class="cancelBtn" @click="close()">取消开户</div>
                    <div class="confirmBtn" @click="continueRec">继续开户</div>
                </div>
            </div>
        </div>
        <div class="loading-toast" v-if="loading">
            <img src="@/assets/images/loading-toast.gif" alt="" />
        </div>

        <md-popup v-model="showPop" :mask-closable="false">
            <div class="gotoSetLoose" v-if="hasAccount">
                <div class="loseTitle">温馨提示</div>
                <div class="cont">
                    <p>已有开户中账号，无法再开户</p>
                    <div class="btnBox">
                        <md-button type="default" size="small" @click="confuse">知道了</md-button>
                    </div>
                </div>
            </div>
            <div class="faxnote" v-if="goSign">
                <div class="backremind">
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
            </div>
            <div class="detailExplain" v-if="explain1">
                <div class="explainTitle">详细说明</div>
                <hr>
                <p class="explainContent">
                    自2019年4月1日起，经设区的市级及以上公安机关认定的出租、出借、出售、购买银行账户(含银行卡)的单位和个人及相关组织者，假冒他人身份或者虚构代理关系开立银行账户的单位和个人，5年内暂停其银行账户非柜面业务，不得新开账户，并将承担相关法律责任。人民银行将上述单位和个人信息移送金融信用信息基础数据库并向社会公布。
                </p>
                <div class="explainBtn" @click="confirm">确认</div>
            </div>
            <div class="detailExplain" v-if="explain2">
                <div class="explainTitle">详细说明</div>
                <hr>
                <div class="explainContent">
                    <p>
                        1.中国税收居民是指在中国境内有住所，或者无住所而在一个纳税年度内在中国境内居住累计满183天的个人。在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。
                    </p>
                    <p style="word-wrap: break-word;
                    word-break: break-all;">
                        2.非居民是指中国税收居民以外的个人。其他国家(地区)税收居民身份认定规则及纳税人识别号相关信息请参见国家税务总局网站。(http://www.chinatax.gov.cn/aeoi_index.html)。
                    </p>
                    <p>
                        3.美国个人是指具有美国国籍，持有美国绿卡或者在美国长期停留的个人。在美国长期停留是指:当年在美国停留31天以上，并在3年内累计超过183天。累计方式是当年每一天算一天，去年每一天算1/3天，前一年每一天算1/6天。
                    </p>
                </div>
                <div class="explainBtn" @click="confirm">确认</div>
            </div>
        </md-popup>
        <bcm-agreement
            v-if="bcmShow"
            :siver="val"
            v-on:isFalseBcm="isFalseBcm"
            :isDisplayConfiguration='isDisplayConfiguration'
            :displayConfigurationAgreementCont='displayConfigurationAgreementCont'
        >
        </bcm-agreement>
    </div>
</template>

<script>
import * as store2 from '@/common/localstore';
import {
    Icon, ImageReader, Tag, Toast
} from 'mand-mobile';
import bcmAgreement from '@/components/bcmAgreement.vue';
import api from '@/common/apiUrls';
import { compressImage } from '@/common/yasuoImg_new.js';

export default {
    name: 'submitID',
    components: {
        [Icon.name]: Icon,
        [ImageReader.name]: ImageReader,
        [Tag.name]: Tag,
        bcmAgreement
    },
    data() {
        return {
            val: '',
            bcmShow: false,
            explain1: false,
            explain2: false,
            showPop: false,
            queryList: '',
            lock: false,
            loading: false,
            imgStr: [],
            tankuang: false,
            tishi: false,
            tips: false,
            isSelect: false,
            isSelect_2: false,
            isGou: false,
            checkSubmit: false,
            imageList: {
                reader0: [],
                reader1: []
            },
            hasAccount: false,
            goSign: false,
            usrmob: store2.default.get('usrmob').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            typeid: '10010',
            localSign: '',
            userType: '',
            cityCode: '',
            sweetTips: false,
            sweetTips_2: false,
            bcmShow:false,
            displayConfigurationName:'',//配置协议名称
            displayConfigurationAgreementCont:'',// 配置的协议内容
            isDisplayConfiguration:false //是否显示配置的协议
        };
    },
    mounted() {
        // this.localSign = this.$route.query.localSign;
        // if( this.localSign) {
        //     this.showPop = true;
        //     this.goSign = true;
        // }
        // this.$store.commit('LOADING', true);
        if (window.sessionStorage.getItem('imageList')) {
            this.showUserInfo();
        }
        if (store2.default.get('isFlaseBcm')) {
            this.isGou = true;
            store2.default.remove('isFlaseBcm');
            this.checkBtn();
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (from.name == 'khEmpower') {
                // 获取银行机构开户情况
                api.bannerCheck({
                    orgCode: 'BOCM'
                })
                    .then((data) => {
                        const type = data.openPreType;
                        vm.cityCode = data.cityCode;
                        if (vm.cityCode && vm.cityCode != '19') {
                            vm.tankuang = true;
                            vm.sweetTips = true;
                        }
                        if (type === 'sign') {
                        // 去签约
                            vm.showPop = true;
                            vm.goSign = true;
                        }
                        // if(data.openPreType === '2') {
                        //     this.showPop = true;
                        //     this.goSign = true;
                        // }
                    })
                    .catch((err) => {
                    });
            }
        });
    },
    created() {
        // this.checkNewUser();
        this.queryOpen();
        // this.queryAccount();
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
        }
        this.getAgreement()
    },
    methods: {
        // 获取协议
        getAgreement() {
            api.huataiAgreement({
                businessCode: 'jr-jhkhxy'
            }).then((res) => {
                this.isDisplayConfiguration = true
                this.displayConfigurationName = res.agreementName
                this.displayConfigurationAgreementCont = res.content.replaceAll(
                    'px',
                    ''
                );
            })
        },
        continueRec() {
            // window.location.href = `https://fintech.12580life.com${process.env.BASE_URL}BOCM/identityInformation?${this.queryList}`;
            this.$router.push({
                name: 'identityInformation',
                query: {
                    queryData: encodeURIComponent(JSON.stringify(this.queryList))
                }
            });
        },
        cancelOpen() {
            this.close();
            this.$router.go(-1);
        },
        confirmSign() {
            this.showPop = false;
            this.hasAccount = false;
            this.goSign = false;

            this.$router.push({
                name: 'walletSign',
                query: {
                    typeId: this.typeid
                }
            });
        },
        // 取消换绑跳转首页
        goIndex() {
            this.showPop = false;
            this.hasAccount = false;
            this.goSign = false;

            // if (this.gourl) {
            // this.$router.push({
            //     name: "newFortune",
            // });
            // } else {
            window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/newFortune?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            // }
        },
        isFalseBcm(a) {
            store2.default.set('isFlaseBcm', true);
            store2.default.set('hadclick', '01');
            this.bcmShow = false;
            this.isGou = true;
            this.checkBtn();
        },
        confuse() {
            this.showPop = false;
            this.hasAccount = false;
            this.goSign = false;
            this.$router.go(-1);
        },
        queryOpen() {
            this.$store.commit('LOADING', true);
            if (!store2.default.get('qbBankListsInfo') || store2.default.get('qbBankListsInfo').length < 1) {
                api.qrySmallChangeAcc()
                // 零钱账户查询
                    .then((data) => {
                        this.$store.commit('LOADING', false);
                        console.log('+++++', data);
                        data.list.forEach((sss) => {
                            if (sss.orgCode == 'BOCM' && sss.accsts == '01') {
                                this.showPop = true;
                                this.hasAccount = true;
                            }
                        });
                    })
                    .catch((err) => {
                        this.$store.commit('LOADING', false);
                    });
            } else {
                this.$store.commit('LOADING', false);
                store2.default.get('qbBankListsInfo').forEach((sss) => {
                    if (sss.orgCode == 'BOCM' && sss.accsts == '01') {
                        this.showPop = true;
                        this.hasAccount = true;
                    }
                });
            }
        },
        queryAccount() {
            // 获取银行机构开户情况
            api.bannerCheck({
                orgCode: 'BOCM'
            })
                .then((data) => {
                    this.$store.commit('LOADING', false);
                    const type = data.openPreType;
                    this.cityCode = data.cityCode;
                    if (this.cityCode && this.cityCode != '19') {
                        // this.tankuang = true;
                        // this.sweetTips = true;
                    }
                    if (type === 'sign') {
                    // 去签约
                        this.showPop = true;
                        this.goSign = true;
                    }
                // if(data.openPreType === '2') {
                //     this.showPop = true;
                //     this.goSign = true;
                // }
                })
                .catch(() => {
                    this.$store.commit('LOADING', false);
                });
        },
        saveUserInfo() {
            const data = {
                imageList: this.imageList
            };
            window.sessionStorage.setItem('imageList', JSON.stringify(data));
        },
        showUserInfo() {
            const data = JSON.parse(window.sessionStorage.getItem('imageList'));
            this.imageList = data.imageList;
            window.sessionStorage.removeItem('imageList');
        },
        submit() {
            // this.loading = true;
            this.$store.commit('LOADING', true);
            this.lock = true;
            api.BOCM.sendViewDate({
                frontImage: this.imageList.reader0[0].slice(23),
                backImage: this.imageList.reader1[0].slice(23)
            })
                .then((res) => {
                    this.$store.commit('LOADING', false);
                    this.lock = false;
                    // let str = '';
                    // const arr = 'userName,idNo,genderTpCode,imageOrderNo,nation,validDate,address';
                    // Object.keys(res).forEach((item) => {
                    //     if (arr.includes(item)) {
                    //         res[item] = `${item}=${res[item]}&`;
                    //         str += res[item];
                    //     }
                    // });
                    // this.queryList = str;
                    this.queryList = {
                        userName: res.userName,
                        idNo: res.idNo,
                        genderTpCode: res.genderTpCode,
                        imageOrderNo: res.imageOrderNo,
                        nation: res.nation,
                        validDate: res.validDate,
                        address: res.address
                    };
                    this.checkNewUser();
                })
                .catch((err) => {
                    // this.loading = false;
                    this.$store.commit('LOADING', false);
                    this.lock = false;
                    console.log(err);
                    this.$toast.info(err.msgInfo);
                });
        },
        // 查询是否为交行新户
        checkNewUser() {
            api.checkNewUser({})
                .then((data) => {
                    this.userType = data.userType;
                    if (this.userType == '1') {
                    // 非新户
                        this.tankuang = true;
                        this.sweetTips_2 = true;
                    } else if (this.userType == '0') {
                    // 新户
                        this.continueRec();
                    }
                })
                .catch((err) => {
                    this.$toast.info(err.msgInfo);
                });
        },
        goXieyi(a) {
            this.saveUserInfo()
            this.$store.commit('bcmAgreement', true);
            this.val = a;
            this.bcmShow = true;
        },
        checkBtn() {
            if (this.isGou && this.imageList.reader0.length > 0 && this.imageList.reader1.length > 0) {
                this.checkSubmit = true;
            } else {
                this.checkSubmit = false;
            }
        },
        onReaderSelect(name, { files }) {
            console.log('name', name);
            this.onDeleteImage(name, '0');
            files.forEach((file) => {
                // console.log('[Mand Mobile] ImageReader Selected:', 'File Name ' + file.name)
            });
            Toast.loading('图片读取中...');
        },
        onReaderComplete(name, { dataUrl, file }) {
            Toast.hide();
            compressImage(dataUrl, {
                width: 750,
                quality: 0.7
            })
                .then((result) => {
                    this.imgStr = result;
                });
            // console.log(this.imgStr)
            // console.log('[Mand Mobile] ImageReader Complete:', 'File Name ' + file.name)
            setTimeout(() => {
                const demoImageList = this.imageList[name] || [];
                demoImageList.push(this.imgStr);
                this.$set(this.imageList, name, demoImageList);
                this.checkBtn();
            }, 100);
            if (name == 'reader0') {
                this.isSelect = true;
            } else {
                this.isSelect_2 = true;
            }
        },
        onReaderError(name, { msg }) {
            Toast.failed(msg);
        },
        onDeleteImage(name, index) {
            const demoImageList = this.imageList[name] || [];
            demoImageList.splice(index, 1);
            this.$set(this.imageList, name, demoImageList);
            if (name == 'reader0') {
                this.isSelect = false;
            } else {
                this.isSelect_2 = false;
            }
            this.checkBtn();
        },
        open() {
            this.tankuang = true;
            this.tips = true;
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.height = '100%';
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100%';
        },
        close() {
            this.tankuang = false;
            this.tips = false;
            this.tishi = false;
            this.sweetTips = false;
            this.sweetTips_2 = false;
            document.documentElement.style.overflow = 'visible';
            document.documentElement.style.height = 'auto';
            document.body.style.overflow = 'visible';
            document.body.style.height = 'auto';
        },
        check() {
            // this.saveUserInfo();
            if (store2.default.get('bcmxieyi')) {
                this.isGou = !this.isGou;
                this.checkBtn();
            } else {
                this.goXieyi(1);
            }
        },
        details1() {
            this.showPop = true;
            this.explain1 = true;
        },
        details2() {
            this.showPop = true;
            this.explain2 = true;
        },
        confirm() {
            this.showPop = false;
            this.explain1 = false;
            this.explain2 = false;
        }
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background-color:#F6F6F6;');
    },
    destroyed() {
        Toast.hide();
    },
};

</script>

<style lang="less" scoped>
.box {
    h5 {
        font-size: 30px;
        color: #333333;
        font-weight: 500;
        text-align: center;
        margin-top: 52px;
    }

    .ID {
        position: relative;
        width: 666px;
        height: 380px;
        margin: 30px auto 0;

        p {
            font-size: 0.285rem;
            position: absolute;
            bottom: 29px;
            right: 166.75px;
        }

        .mic {
            position: absolute;
            bottom: 29px;
            left: 166.75px;
            width: 33px;
            height: 32px;
            background: url('../../assets/images/BOCM/mic.png') no-repeat;
            background-size: 100%;
        }

        .idImg {
            position: absolute;
            left: 40px;
            top: 20px;
            width: 580px;
            height: 275px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .up {
        background: url('../../assets/images/BOCM/ID_1.png') no-repeat;
        background-size: 100%;
    }

    .down {
        background: url('../../assets/images/BOCM/ID_2.png') no-repeat;
        background-size: 100%;
    }

    .textArea {
        margin: 24px 0 0 0;
        padding: 0 25px 0 42px;

        .tips {
            font-size: 26px;
            line-height: 36px;

            span {
                font-size: 26px;
                color: #1B7AEE;
            }
        }

        .tips_2 {
            font-size: 20px;
            margin: 10px 0 0 0;
            color: #9FA9B6;
            text-align: left;
            line-height: 36px;
        }

        .dashed {
            border: 1px #CCC dashed;
            margin: 30px 0;
        }

        .tips_3 {
            font-size: 22px;
            color: #9FA9B6;
            line-height: 36px;
        }

        .xieyi {
            display: flex;
            margin-top: 10px;

            .checkOff {
                width: 30px;
                height: 30px;
                background: url("../../assets/images/check-off.png") no-repeat;
                background-size: 100%;
                margin-right: 20px;
                border-radius: 50%;
            }

            .check {
                width: 30px;
                height: 30px;
                background: url("../../assets/images/check-on.png") no-repeat;
                background-size: 100%;
                margin-right: 20px;
                border-radius: 50%;
            }

            .tips_4 {
                color: #979899;
                font-size: 20px;
                line-height: 34px;
            }
        }

        .submit_lock {
            margin: 63px auto 88px;
            width: 646px;
            height: 100px;
            background: #CBCCD0;
            border-radius: 55px;
            text-align: center;
            font-size: 36px;
            line-height: 100px;
            color: #FFFFFF;
            pointer-events: none;
        }

        .lock {
            margin: 63px auto 88px;
            width: 646px;
            height: 100px;
            background: #1B7AEE;
            border-radius: 55px;
            text-align: center;
            font-size: 36px;
            line-height: 100px;
            color: #FFFFFF;
            pointer-events: none;
        }

        .submit {
            margin: 63px auto 88px;
            width: 646px;
            height: 100px;
            background: #1B7AEE;
            border-radius: 55px;
            text-align: center;
            font-size: 36px;
            line-height: 100px;
            color: #FFFFFF;
            pointer-events: visible;
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

        .tips {
            position: relative;
            width: 650px;
            height: 868px;
            background: url('../../assets/images/BOCM/tipsBg.png') no-repeat;
            background-size: 100%;
        }

        .tishi {
            position: relative;
            width: 565px;
            height: 525px;
            border-radius: 25.5px;
            background: #FFFFFF;
            padding: 0 20px;

            h5 {
                font-size: 38px;
                text-align: center;
                color: #000000;
                margin: 30px 0;
            }

            p {
                font-size: 32px;
                color: #393939;
                line-height: 86px;
                text-align: center;
                margin-top: 10px;
            }
        }
        .sweetToast {
            position: relative;
            width: 565px;
            border-radius: 25.5px;
            background: #FFFFFF;
            padding: 0 20px;

            h5 {
                font-size: 38px;
                text-align: center;
                color: #000000;
                margin: 30px 0;
            }

            p {
                font-size: 32px;
                color: #393939;
                line-height: 1.5;
                text-align: center;
                margin: 20px 0 40px 0;
            }
            .cancelBtn {
                width: 180px;
                height: 60px;
                line-height: 60px;
                border: 1px solid #CCC;
                border-radius: 10px;
                font-size: 28px;
                text-align: center;
            }
            .confirmBtn {
                width: 180px;
                height: 60px;
                line-height: 60px;
                border-radius: 10px;
                background: #009BD8;
                color: white;
                font-size: 28px;
                text-align: center;
            }
        }

        .btn {
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            width: 400px;
            height: 90px;
            border-radius: 55px;
            background: #1B7AEE;
            color: #FFFFFF;
            font-size: 36px;
            text-align: center;
            line-height: 90px;
        }
    }

    .loading-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 99999;
        transform: translate(-50%, -50%);
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
 .alert-actions {
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
 .alert-actions .btn {
    display: block;
    width: 2.42rem;
    height: 0.82rem;
    border-radius: 0.08rem;
    border: 1px solid #999999;
    color: #999;
    font-size: 0.32rem;
    background: #fff;
}
 .alert-actions .btn-sure {
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
        padding-top: 5px;
        width: 6px;
        height: 20px;
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
.detailExplain {
    width: 6.5rem;
    background-color: #fff;
    border-radius: 25px;
    padding: 25px;
    text-align: center;
    box-sizing: border-box;
    font-size: 28px;
    letter-spacing: 1.8px;
    .explainTitle {
        font-size: 30px;
        font-weight: 600;
        margin: 10px 0 20px 0;
    }
    .explainContent {
        text-align: justify;
        box-sizing: border-box;
        padding: 0 12px 0 20px;
        margin: 25px 0;
        //text-align: left;
        line-height: 40px;
        letter-spacing: 2px;
        p {
            margin-top: 5px;
        }
    }
    .explainBtn {
        width: 380px;
        height: 80px;
        line-height: 80px;
        border-radius: 50px;
        text-align: center;
        color: #FFFFFF;
        background: #1B7AEE;
        margin: 40px auto 30px;
        font-size: 35px;
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
        //width: 4rem;
        //height: 0.75rem;
        //opacity: 1;
        //background: #0195ff;
        //border-radius: 0.08rem;
        //color: #fff;
        //font-size: 0.36rem;
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
</style>
