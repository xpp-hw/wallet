<template>
  <div class="main">
    <div class="top">
      <div class="onecent_banner"></div>
      <div class="content">
        <!-- 招行专享福利专区 -->
        <!-- <div class="zsbank_area"> -->
          <!-- 5元话费 -->
          <!-- <div class="fiveyuan">
            马上抢
            <div class="robnow" v-if="goodsone == '00'">
              <div @click="getActivity(code1)" id="C01">
                <img src="../../assets/images/zsbank_oneCent/mashangqiang.png" alt="" class="mashangqiang">
              </div>
            </div>
            已购买
            <div class="robnow" v-if="goodsone == '01'">
              <img src="../../assets/images/zsbank_oneCent/Purchased.png" alt="" class="purchased">
              <div @click="checkActivity" id="C02">
                <img src="../../assets/images/zsbank_oneCent/quchakan.png" alt="" class="gocheck">
              </div>
            </div>
            已售罄
            <div class="saleout" v-if="goodsone == '02'">
              <img src="../../assets/images/zsbank_oneCent/saleout.png" alt="" class="saleoutpic">
              <img src="../../assets/images/zsbank_oneCent/mashangqiang.png" alt="" class="opacitymsq">
            </div>
          </div> -->
          <!-- 1G流量 -->
          <!-- <div class="oneG"> -->
            <!-- 马上抢 -->
            <!-- <div class="saleout" v-if="goodstwo == '00'">
              <p>¥<span>0.01</span></p>
              <div @click="getActivity(code2)" id="D01">
                <img src="../../assets/images/zsbank_oneCent/mashangqiang.png" alt="" class="msqimg">
              </div>
            </div> -->
            <!-- 已购买 -->
            <!-- <div class="saleout" v-if="goodstwo == '01'">
              <img src="../../assets/images/zsbank_oneCent/Purchased.png" alt="" class="purchased">
              <div @click="checkActivity" id="D02">
                <img src="../../assets/images/zsbank_oneCent/quchakan.png" alt="" class="quchakan">
              </div>
            </div> -->
            <!-- 已售罄 -->
            <!-- <div class="saleoutarea" v-if="goodstwo == '02'">
              <img src="../../assets/images/zsbank_oneCent/saleout.png" alt="" class="saleoutpic">
              <img src="../../assets/images/zsbank_oneCent/mashangqiang.png" alt="" class="opacitymsq">
            </div>
          </div> -->
        <!-- </div> -->
        <!-- 钱包客户每月福利 -->
        <div class="wallet_area">
          <!-- <div class="twoyuan">
            马上抢
            <div class="gocheck" v-if="goodsthree == '00'">
              <p>¥<span>0.01</span></p>
              <div @click="getActivity(code3)" id="E01">
                <img src="../../assets/images/zsbank_oneCent/mashangqiang.png" alt="" class="mashangqiang">
              </div>
            </div>
            去查看
            <div class="gocheck" v-if="goodsthree == '01'">
              <img src="../../assets/images/zsbank_oneCent/Purchased.png" alt="" class="purchased">
              <div @click="checkActivity" id="E02">
                <img src="../../assets/images/zsbank_oneCent/quchakan.png" alt="" class="quchakan">
              </div>
            </div>
            已售罄
            <div class="saleout" v-if="goodsthree == '02'">
              <img src="../../assets/images/zsbank_oneCent/saleout.png" alt="" class="saleoutpic">
              <img src="../../assets/images/zsbank_oneCent/mashangqiang.png" alt="" class="opacitymsq">
            </div>
          </div> -->
          <div class="oneG">
            <!-- 马上抢 -->
            <div class="saleout" v-if="goodstwo == '00'">
              <!-- <p>¥<span>0.01</span></p> -->
              <div @click="getActivity(code2)" id="D01">
                <img src="../../assets/images/zsbank_oneCent/mashangqiang.png" alt="" class="msqimg">
              </div>
            </div>
            <!-- 已购买 -->
            <div class="saleout" v-if="goodstwo == '01'">
              <img src="../../assets/images/zsbank_oneCent/Purchased.png" alt="" class="purchased">
              <div @click="checkActivity" id="D02">
                <img src="../../assets/images/zsbank_oneCent/quchakan.png" alt="" class="quchakan">
              </div>
            </div>
            <!-- 已售罄 -->
            <div class="saleoutarea" v-if="goodstwo == '02'">
              <img src="../../assets/images/zsbank_oneCent/saleout.png" alt="" class="saleoutpic">
              <img src="../../assets/images/zsbank_oneCent/mashangqiang.png" alt="" class="opacitymsq">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rules" id="A01" @click="rulesModel = true">
      活动说明
      <!-- <img src="../../assets/images/zsbank_oneCent/shuoming.png" alt=""> -->
    </div>
    <div class="share" id="A02" @click="goShare">
      分享
      <!-- <img src="../../assets/images/zsbank_oneCent/fenxiang.png" alt=""> -->
    </div>
    <div class="bottom">
    <!-- 更多优惠 -->
      <div class="morediscount">
        <img src="../../assets/images/zsbank_oneCent/more.png" alt="" class="morepic">
      </div>
      <div class="activitycontent">
        <div @click="jumpTo(1)">
          <img src="../../assets/images/oneCentBanner/banner1_2.png" alt="">
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <!-- 领取成功弹框 -->
    <div class="model getSuccess" v-if="getSuccess">
      <div class="content" v-if="getFive">
        <div class="btn"  @click="checkActivity" id="C03">
          <img src="../../assets/images/zsbank_oneCent/tankuang/wuYuan/qushiyong.png" alt="">
        </div>
        <div class="close"  @click="getSuccess = false" id="C04">
          <img src="../../assets/images/zsbank_oneCent/tankuang/dankuangguanbianniu.png" alt="">
        </div>
      </div>
      <!-- 抢到两元 -->
      <div class="contenttwo" v-if="getTwo">
        <div class="btn"  @click="checkActivity" id="D03">
          <img src="../../assets/images/zsbank_oneCent/tankuang/twoYuan/qushiyong.png" alt="">
        </div>
        <div class="close"  @click="getSuccess = false" id="D04">
          <img src="../../assets/images/zsbank_oneCent/tankuang/dankuangguanbianniu.png" alt="">
        </div>
      </div>
      <!-- 抢到1G -->
      <div class="contentone" v-if="getOneG">
        <div class="btn" @click="getSuccess = false" id="E03">
          <img src="../../assets/images/zsbank_oneCent/tankuang/oneG/haode.png" alt="">
        </div>
        <div class="close"  @click="getSuccess = false" id="E04">
          <img src="../../assets/images/zsbank_oneCent/tankuang/dankuangguanbianniu.png" alt="">
        </div>
      </div>
    </div>
    <!-- 分享弹框 -->
    <div class="model shareModel" v-if="shareModel">
      <img class="arrow" src="../../assets/images/onecent/arrow.png" alt="">
      <img class="imgCont" src="../../assets/images/onecent/shareModel.png" alt="">
      <div class="btn" @click="shareModel = false"></div>
    </div>
    <!-- 活动规则弹框  -->
    <div class="model rulesModel"  v-if="rulesModel">
      <div class="content" >
        <div class="conatin" id="rulesCont" v-html="agreementContent">
        </div>
        <div class="closeIcon" @click="rulesModel=false">
          <img src="../../assets/images/onecent/close.png" alt="" >
        </div>
      </div>
    </div>
    <!-- 券已领完 -->
    <div class="model kongModel" v-if="kongModel">
      <div class="content">
        <div class="btn"  :id="lingwan" @click="kongModel = false">
          <img src="../../assets/images/zsbank_oneCent/tankuang/finishCoupons/haode.png" alt="">
        </div>
        <div class="close"  @click="kongModel = false">
          <img src="../../assets/images/zsbank_oneCent/tankuang/dankuangguanbianniu.png" alt="">
        </div>
      </div>
    </div>
    <!-- 开通移动钱包弹框 -->
    <div class="model openModel" v-if="openModel">
      <div class="content">
        <div class="btnBox">
          <div class="btn" :id="next" @click="openModel = false">
            <img src="../../assets/images/zsbank_oneCent/tankuang/openWallet/xiacizaishuo.png" alt="">
          </div>
          <div class="btn" :id="kaitong" @click="rightOpen">
            <img src="../../assets/images/zsbank_oneCent/tankuang/openWallet/kaitong.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 修改钱包账户弹框 -->
    <div class="model changeModel" v-if="changeModel">
      <div class="content">
        <div class="btn"  @click="changeBinding" :id="changeCard">
            <img src="../../assets/images/zsbank_oneCent/tankuang/quxiugai/quxiugai.png" alt="">
        </div>
        <div class="close"  @click="changeModel = false" :id="changeClose">
          <img src="../../assets/images/zsbank_oneCent/tankuang/dankuangguanbianniu.png" alt="">
        </div>
      </div>
    </div>
    <!-- 开通招商银行电子账户 -->
    <div class="model changezsModel" v-if="changezsModel">
      <div class="content">
        <div class="btn"  @click="rightOpen" :id="openZs">
          <img src="../../assets/images/zsbank_oneCent/tankuang/openzsbank/lijikaitong.png" alt="">
        </div>
        <div class="close"  @click="changezsModel = false" :id="closeZs">
          <img src="../../assets/images/zsbank_oneCent/tankuang/dankuangguanbianniu.png" alt="">
        </div>
      </div>
    </div>
    <!-- 网络异常弹框 -->
    <div class="model networkErr" v-if="networkErr">
      <div class="content">
        <div class="btn">
          <!-- 返回主页 -->
          <img src="../../assets/images/zsbank_oneCent/tankuang/networkErr/fanhuizhuye.png" alt="" id="B04">
          <!-- 刷新重试 -->
          <div id="B03" @click="reload">
            <img src="../../assets/images/zsbank_oneCent/tankuang/networkErr/shuaxinchongshi.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 当日/月抢购次数已达上限 -->
    <div class="model timeLimit" v-if="timeLimit">
      <!-- 当日已达上限 -->
      <div class="daylimit" v-if="daylimit">
        <div class="btn" @click="(timeLimit = false),(daylimit = false)" :id="shangxian">
          <img src="../../assets/images/zsbank_oneCent/tankuang/haode.png" alt="">
        </div>
      </div>
      <!-- 当月已达上限 -->
      <div class="monthlimit" v-if="monthlimit">
        <div class="btn"  @click="(timeLimit = false),(monthlimit = false)" id="E12">
          <img src="../../assets/images/zsbank_oneCent/tankuang/haode.png" alt="">
        </div>
      </div>
    </div>
    <!-- 加载效果 -->
    <div class="model loading" :style=" this.ordno?'':'background:#fff;'" v-if="drawLoading">
      <div  class="cont" style="background:#fff;">
        <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        <p>Loading...</p>
      </div>
    </div>
    <div v-if="loading" class="loading-toast">
      <img alt="" src="@/assets/images/loading-toast.gif"/>
    </div>
    <div class="shareModel_2" v-if="isShow">
      <img src="~@/assets/images/openBlindBox/shareTips.png" alt="">
      <div class="btn" @click="isShow = false">知道了</div>
    </div>
    <eBean v-if="isMengChong" :mengchongtxt="mengchongtxt"></eBean>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import eBean from './eBean.vue';

export default {
    data() {
        return {
            isShow: false,
            loading: false,
            kaitong: '',
            next: '',
            changeCard: '',
            changeClose: '',
            openZs: '',
            closeZs: '',
            lingwan: '',
            shangxian: '',
            goodsone: '', // 商品1状态：00->马上抢，01->已购买，02->已售罄
            goodstwo: '', // 商品2状态：00->马上抢，01->已购买，02->已售罄
            goodsthree: '', // 商品3状态：00->马上抢，01->已购买，02->已售罄
            shareModel: false, // 分享
            rulesModel: false, // 活动说明
            openModel: false,
            drawLoading: false,
            isOpenWallet: '00',
            rightInfoList: [],
            // code1: '10009',  t3出行活动编码
            // code2: '10008',  中石化活动编码
            code1: '10016', // 5充值券
            code2: '10015', // 1GB流量
            code3: '10017', // 2元充值券
            payUrl: '', // 支付订单地址
            sessionId: '', // 订单编号
            successItem: 1,
            ordno: '',
            fxmobile: '',
            timer: null,
            timeNum: 0,
            canClick: true,
            kongModel: false, // 券已领完
            changezsModel: false, // 开通招商银行电子账户
            changeModel: false, // 修改钱包账户弹框
            timeLimit: false, // 领取上限
            daylimit: false, // 当日领取上限
            monthlimit: false, // 当月领取上限
            networkErr: false, // 网络异常
            getSuccess: false, // 抢券成功
            getFive: false, // 抢到5元
            getTwo: false, // 抢到2元
            getOneG: false, // 抢到1G
            zsBankModel: '', // 是否开通招商银行账户
            buyChanceFlag1: '', // 是否有购买机会
            cmbActivity1: '', // 是否招行活动
            buyChanceFlag2: '',
            cmbActivity2: '',
            buyChanceFlag3: '',
            cmbActivity3: '',
            typeId: 'yifengou',
            eBeanTimer: null,
            isMengChong: false,
            mengchongtxt: {
                num: 10,
                uptxt: '浏览10秒',
                downtxt: '得E豆'
            }, // 弹窗文案
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_ONECENT_01_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_ONECENT_01_A02'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_ONECENT_01_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_ONECENT_01_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_ONECENT_01_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_ONECENT_01_B04'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_ONECENT_01_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_ONECENT_01_C02'
                },
                {
                    id: 'C03',
                    touchCode: 'WAP_T_ONECENT_01_C03'
                },
                {
                    id: 'C04',
                    touchCode: 'WAP_T_ONECENT_01_C04'
                },
                {
                    id: 'C05',
                    touchCode: 'WAP_T_ONECENT_01_C05'
                },
                {
                    id: 'C06',
                    touchCode: 'WAP_T_ONECENT_01_C06'
                },
                {
                    id: 'C07',
                    touchCode: 'WAP_T_ONECENT_01_C07'
                },
                {
                    id: 'C08',
                    touchCode: 'WAP_T_ONECENT_01_C08'
                },
                {
                    id: 'C09',
                    touchCode: 'WAP_T_ONECENT_01_C09'
                },
                {
                    id: 'C10',
                    touchCode: 'WAP_T_ONECENT_01_C10'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_ONECENT_01_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_ONECENT_01_D02'
                },
                {
                    id: 'D03',
                    touchCode: 'WAP_T_ONECENT_01_D03'
                },
                {
                    id: 'D04',
                    touchCode: 'WAP_T_ONECENT_01_D04'
                },
                {
                    id: 'D05',
                    touchCode: 'WAP_T_ONECENT_01_D05'
                },
                {
                    id: 'D06',
                    touchCode: 'WAP_T_ONECENT_01_D06'
                },
                {
                    id: 'D07',
                    touchCode: 'WAP_T_ONECENT_01_D07'
                },
                {
                    id: 'D08',
                    touchCode: 'WAP_T_ONECENT_01_D08'
                },
                {
                    id: 'D09',
                    touchCode: 'WAP_T_ONECENT_01_D09'
                },
                {
                    id: 'D10',
                    touchCode: 'WAP_T_ONECENT_01_D10'
                },
                {
                    id: 'D11',
                    touchCode: 'WAP_T_ONECENT_01_D11'
                },
                {
                    id: 'D12',
                    touchCode: 'WAP_T_ONECENT_01_D12'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_ONECENT_01_E01'
                },
                {
                    id: 'E02',
                    touchCode: 'WAP_T_ONECENT_01_E02'
                },
                {
                    id: 'E03',
                    touchCode: 'WAP_T_ONECENT_01_E03'
                },
                {
                    id: 'E04',
                    touchCode: 'WAP_T_ONECENT_01_E04'
                },
                {
                    id: 'E05',
                    touchCode: 'WAP_T_ONECENT_01_E05'
                },
                {
                    id: 'E06',
                    touchCode: 'WAP_T_ONECENT_01_E06'
                },
                {
                    id: 'E07',
                    touchCode: 'WAP_T_ONECENT_01_E07'
                },
                {
                    id: 'E08',
                    touchCode: 'WAP_T_ONECENT_01_E08'
                },
                {
                    id: 'E09',
                    touchCode: 'WAP_T_ONECENT_01_E09'
                },
                {
                    id: 'E10',
                    touchCode: 'WAP_T_ONECENT_01_E10'
                },
                {
                    id: 'E11',
                    touchCode: 'WAP_T_ONECENT_01_E11'
                },
                {
                    id: 'E12',
                    touchCode: 'WAP_T_ONECENT_01_E12'
                },
                {
                    id: 'F01',
                    touchCode: 'WAP_T_ONECENT_01_F01'
                },
                {
                    id: 'F02',
                    touchCode: 'WAP_T_ONECENT_01_F02'
                },
                {
                    id: 'F03',
                    touchCode: 'WAP_T_ONECENT_01_F03'
                },
                {
                    id: 'F04',
                    touchCode: 'WAP_T_ONECENT_01_F04'
                },
                {
                    id: 'F05',
                    touchCode: 'WAP_T_ONECENT_01_F05'
                },
                {
                    id: 'F06',
                    touchCode: 'WAP_T_ONECENT_01_F06'
                },
                {
                    id: 'F07',
                    touchCode: 'WAP_T_ONECENT_01_F07'
                },
                {
                    id: 'F08',
                    touchCode: 'WAP_T_ONECENT_01_F08'
                },
                {
                    id: 'F09',
                    touchCode: 'WAP_T_ONECENT_01_F09'
                },
                {
                    id: 'F10',
                    touchCode: 'WAP_T_ONECENT_01_F10'
                },
                {
                    id: 'F11',
                    touchCode: 'WAP_T_ONECENT_01_F11'
                },
                {
                    id: 'F12',
                    touchCode: 'WAP_T_ONECENT_01_F12'
                }
            ],
            agreementContent: ''
        };
    },
    components: {
        eBean
    },
    created() {
      api.getEncrypt({})
      .then((data) => {
        let emsKey = data.encryptKey || ''
        if(process.env.VUE_APP_ENV == 'local' || process.env.VUE_APP_ENV == 'sit') {
          gdp('setUserId', emsKey); // 此处填写用户手机号
        } else {
          if(this.$client.LEADEON) {
            gdp('setUserId', emsKey); // 此处填写用户手机号
          }
        }
      })
        if (this.$route.query.typeId) {
            this.typeId = this.$route.query.typeId;
        }

        this.drawLoading = true;
        this.ordno = this.$route.query.ordno || '';
        this.fxmobile = this.$route.query.fxmobile || '';
        this.getUsrAccountState(); // 获取开户状态
        this.getRightList(); // 用户权益列表及领取状态
        this.getAgreement();// 获取活动规则
        if (this.ordno) {
        // 链接上带有订单编号，说明是从支付订单页跳过来的
        // （1）查询订单是否支付成功，若成功显示弹框
            this.searchById(this.ordno);
        }
        initPageJs(this.$route.meta.pageName, this.touchArr);
        // gdp('setUserId', '13921442403'); // 此处填写用户手机号
    },
    mounted() {
        if (this.$route.query.task2510Id == this.task2510Id && !!this.$route.query.task2510Status) {
            this.$route.query.task2510Status == '1' ? '已完成' : this.showEBean();
        }
    },
    beforeDestroy() {
        clearInterval(this.eBeanTimer);
    },
    computed: {
        task2510Id() {
            if (
                process.env.VUE_APP_ENV == 'local'
          || process.env.VUE_APP_ENV == 'sit'
            ) {
                return 'act_task_01';
            } if (process.env.VUE_APP_ENV == 'prod') {
                return 'act_task_23';
            }
        }
    },
    methods: {
        getAgreement() {
            api.huataiAgreement({
                businessCode: 'yfghdsm'
            }).then((res) => {
                this.agreementContent = res.content.replaceAll(
                    'px',
                    ''
                );
                this.agreementContent = res.content.replaceAll(
                    'text-wrap: nowrap',
                    'text-wrap: wrap'
                );
            });
        },

        // 获取开户状态
        getUsrAccountState() {
            api.getRightsCode({}).then((data) => {
                if (!this.ordno) {
                    this.drawLoading = false;
                }
                console.log('是否开通钱包---', data);
                if (data.cmbAccountFlag == 0) {
                    this.zsBankModel = '00'; // 招行已开非默认
                } else if (data.cmbAccountFlag == 1) {
                    this.zsBankModel = '01'; // 是默认账户
                } else if (data.cmbAccountFlag == 2) {
                    this.zsBankModel = '02'; // 招行未开
                } else if (data.cmbAccountFlag == 3) {
                    this.zsBankModel = '03'; // 未知
                }
                if (data.actSts === '00') {
                // 未开户
                    this.isOpenWallet = '00';
                } else if (data.actSts === '01') {
                // 已开户
                    this.isOpenWallet = '01';
                } else if (data.actSts === '02') {
                // 正在开户
                    this.isOpenWallet = '02';
                    // this.$toast.info('正在开户,请稍后重试');
                } else if (data.actSts === '03') {
                // 账户异常
                    this.isOpenWallet = '03';
                    this.$toast.info('您的账户状态异常，请前往招商银行APP解除账户限制，具体参见活动说明：第五点（账户异常解决方式）');
                }
            }).catch((err) => {
              this.drawLoading = false;
              setTimeout(() => {
                this.$store.commit('LOADING', false);
                this.$toast.info(err.msgInfo); 
              },300)
            });
        },
        // 用户权益列表及领取状态
        getRightList() {
            this.$store.commit('LOADING', true);
            api.usrRevRightStsQuery({ rightFlag: '3' }).then((res) => {
                this.rightInfoList = res.rightInfoList;
                console.log(this.rightInfoList);
                this.rightInfoList.forEach((item) => {
                    if (item.rightCode === this.code1) { // 5元充值券
                        this.cmbActivity1 = item.cmbActivity; // 是否是招行活动
                        this.buyChanceFlag1 = item.buyChanceFlag; // 是否有购买机会
                        // 权益状态
                        this.goodsone = item.rightSts;
                        if (this.goodsone === '00') {
                            this.goodsone = item.soldOutFlag === '1' ? '02' : item.rightSts;
                        }
                    } else if (item.rightCode === this.code2) { // 1GB流量
                        this.cmbActivity2 = item.cmbActivity;
                        this.buyChanceFlag2 = item.buyChanceFlag;
                        // 权益状态
                        this.goodstwo = item.rightSts;
                        if (this.goodstwo === '00') {
                            this.goodstwo = item.soldOutFlag === '1' ? '02' : item.rightSts;
                        }
                    } else if (item.rightCode === this.code3) { // 2元充值券
                        this.cmbActivity3 = item.cmbActivity;
                        this.buyChanceFlag3 = item.buyChanceFlag;
                        // 权益状态
                        this.goodsthree = item.rightSts;
                        if (this.goodsthree === '00') {
                            this.goodsthree = item.soldOutFlag === '1' ? '02' : item.rightSts;
                        }
                    }
                });
            }).catch((err) => {
                this.$toast.info(err.msgInfo);
            }).finally(() => {
                this.$store.commit('LOADING', false);
            });
        },
        // 领取活动
        async getActivity(code) {
            if (code == '10016') {
                this.kaitong = 'B01';
                this.next = 'B02';
                this.changeCard = 'C05';
                this.changeClose = 'C06';
                this.openZs = 'C07';
                this.closeZs = 'C08';
                this.lingwan = 'C09';
                this.shangxian = 'C10';
            }
            if (code == '10015') {
                this.kaitong = 'D05';
                this.next = 'D06';
                this.changeCard = 'D07';
                this.changeClose = 'D08';
                this.openZs = 'D09';
                this.closeZs = 'D010';
                this.lingwan = 'D11';
                this.shangxian = 'D12';
            }
            if (code == '10017') {
                this.kaitong = 'E05';
                this.next = 'E06';
                this.changeCard = 'E07';
                this.changeClose = 'E08';
                this.openZs = 'E09';
                this.closeZs = 'E10';
                this.lingwan = 'E11';
                this.shangxian = 'E12';
            }
            // （1）先查询是否开户
            if (this.isOpenWallet === '00') { // 未开户
                this.openModel = true;
            } else if (this.isOpenWallet === '01') { // 已开户
                this.getRightList();
                if (code == '10016') { // 招行活动
                    if (this.zsBankModel == '01') { // 默认招行账户
                    // 查询是否有购买机会
                    // if(this.buyChanceFlag1 != '1' || this.buyChanceFlag2 != '1') {
                    //   this.timeLimit = true
                    //   this.daylimit = true
                    //   return
                    // }
                        this.loading = true;
                        if (this.canClick) {
                            // 下单
                            this.placeOrder(code);
                        }
                    } else if (this.zsBankModel == '00') {
                        this.changeModel = true; // 修改默认账户
                    } else if (this.zsBankModel == '02') {
                        this.changezsModel = true; // 开通招行账户
                    }
                } else {
                    this.loading = true;
                    if (this.canClick) {
                        // 下单
                        this.placeOrder(code);
                    }
                }
            } else if (this.isOpenWallet === '02') { // 正在开户中
                this.$toast.info('正在开户,请稍后重试');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else if (this.isOpenWallet === '03') {
                // 冻结
                this.$toast.info('您的账户状态异常，请前往招商银行APP解除账户限制，具体参见活动说明：第五点（账户异常解决方式）');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        },
        // 跳转开通钱包
        rightOpen() {
            this.$router.push({
                name: 'khEmpower',
                query: {
                    typeId: this.typeId,
                    orgCode: 'CMB',
                    sourceChannel: this.$route.query.sourceChannel || '',
                    parchn: this.$route.query.parchn,
                    gytype: this.$route.query.gytype
                }
            });
        },
        // 换绑
        changeBinding() {
            this.$router.push({
                path: '/myPage/looseChange',
                query: {
                    parchn: this.$route.query.parchn,
                    gytype: this.$route.query.gytype
                }
            });
        },
        // 下单
        placeOrder(code) {
            this.canClick = false;
            api.rightPayOrder({
                rightCode: code,
                sourcePage: '01',
                parentChannel: this.$route.query.parchn || '',
                childChannel: this.$route.query.gytype || '',
                fxmobile: this.fxmobile
            }).then((res) => {
                this.loading = false;
                this.payUrl = res.payurl;
                this.sessionId = res.sessionId;
                console.log(this.payUrl);
                console.log(this.sessionId);
                this.canClick = true;
                if (this.payUrl) {
                    if (code == '10016') {
                        this.$toast.info('5元话费充值券，将于用户支付成功后次日发放。');
                        setTimeout(() => {
                            window.location.href = this.payUrl;
                        }, 2800);
                    } else {
                        window.location.href = this.payUrl;
                    }
                } else {
                    this.$toast.info('未获取到跳转地址，请稍后重试');
                }
            }).catch((err) => {
                this.loading = false;
                this.canClick = true;
                // if(err.msgCd == 'BUS07839') {
                //   this.timeLimit = true
                //   this.daylimit = true
                // }
                // if(err.msgCd == 'BUS07840') {
                //   this.$toast.info('对不起，您不是特邀用户，暂无法参加此活动');
                // }
                if (err.msgCd === 'BUS07836') {
                    // 券已抢完
                    this.kongModel = true;
                    // eslint-disable-next-line no-unused-expressions
                    if (code === this.code1) {
                        this.goodsone = '02';
                    } else if (code === this.code2) {
                        this.goodstwo = '02';
                    } else if (code === this.code3) {
                        this.goodsthree = '02';
                    }
                } else if (err.msgCd == 'BUS07839') {
                    this.timeLimit = true;
                    this.daylimit = true;
                } else {
                    this.$toast.info(err.msgInfo);
                }
            });
        },
        // 已领取活动，点击去查看
        checkActivity() {
            window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html';
        },
        showEBean() {
            this.isMengChong = true;
            this.eBeanTimer = setInterval(async () => {
                if (this.mengchongtxt.num == 1) {
                    try {
                        const data = await api.doSigninEBeanTask({ taskid: this.task2510Id });
                        // const data= await api.doSigninEBeanTask({taskid: 'act_task_23'});
                        console.log(data);
                        if (data.msgCd == 'BUS00000') {
                            this.mengchongtxt = {
                                num: 10,
                                uptxt: '任务完成',
                                downtxt: ''
                            };
                        } else {
                            this.mengchongtxt = {
                                num: 10,
                                uptxt: '任务失败',
                                downtxt: ''
                            };
                        }
                        return;
                    } catch (error) {
                        console.log(error);
                        this.mengchongtxt = {
                            num: 10,
                            uptxt: '任务失败',
                            downtxt: ''
                        };
                        return;
                    } finally {
                        clearInterval(this.eBeanTimer);
                        return;
                    }
                }
                this.mengchongtxt.num -= 1;
                this.mengchongtxt.uptxt = `浏览${this.mengchongtxt.num}秒`;
                console.log(this.mengchongtxt.num);
            }, 1000);
        },
        // 活动规则内容，点击滚动
        // goDown() {
        //     const dom = document.getElementById('rulesCont');
        //     if (dom.scrollTop < dom.scrollHeight) {
        //         document.getElementById('rulesCont').scrollTop = dom.scrollTop + 100;
        //     }
        // },
        // 根据订单号查询是否成功
        searchById(id) {
            this.timeNum += 1;
            api.usrRightDetailsQuery({ sessionid: id })
                .then((res) => {
                    if (res.receiveSts === '01') {
                        if (this.timer) {
                            clearInterval(this.timer);
                        }
                        this.drawLoading = false;
                        this.successItem = res.rightCode === this.code1 ? '0' : '1';
                        this.getSuccess = true;
                        if (res.rightCode === this.code1) {
                            this.getFive = true;
                        } else if (res.rightCode === this.code2) {
                            this.getOneG = true;
                        } else if (res.rightCode === this.code3) {
                            this.getTwo = true;
                        }
                    } else if (res.receiveSts === '03') {
                        this.drawLoading = false;
                        this.$toast.info('充值券将于三个工作日发放’');
                    } else {
                        if (!this.timer) {
                            this.timer = setInterval(() => {
                                if (this.timeNum >= 4) {
                                    this.drawLoading = false;
                                    clearInterval(this.timer);
                                }
                                this.searchById(id);
                            }, 4000);
                        }
                    }
                }).catch((err) => {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    this.drawLoading = false;
                    console.log(err.msgInfo);
                });
        },
        goShare() {
            if (this.$client.JSMCC) {
                const content = '1分钱抢2元话费充值券、1GB通用流量。数量有限，先到先得！';
                const url = window.location.href.indexOf('?') ? window.location.href.split('?')[0] : window.location.href;
                const title = '一分福利购';
                if (this.$client.ANDROID) {
                    // 安卓端
                    window.clientObject.newShare(content, url, title, '');
                } else if (this.$client.IOS) {
                    // IOS端
                    window.location.href = `ecmcwebshare://mobilePhoneMall??content=${content}#shareUrl=${url}#title=${title}`;
                }
            } else {
                this.isShow = true;
            }
        },
        jumpTo(banners) {
            if (banners == 1) {
                this.$router.push({
                    name: 'savebillActivity',
                    query: {
                        parchn: this.$route.query.parchn,
                        gytype: this.$route.query.gytype
                    }
                });
            } else if (banners == 2) {
                window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/financeActivity?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            } else if (banners == 3) {
                window.location.href = 'https://poc.51pinzhi.cn/jsm_loan/activity_entry';
            } else {
                window.location.href = 'https://upay.12580life.com/upay/wps/service/NewCupToBannerPage.xhtml?PAG_TYP=1';
            }
        },
        reload() {
            window.location.reload();
        }
    }
};
</script>

<style lang="less">
  .main{
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: #FFCC78;
    height: 100vh;
    .top{
      width: 100%;
      background-color: #FFCC78;

      .onecent_banner {
        width: 100%;
        height: 603px;
        background:url('../../assets/images/zsbank_oneCent/banner.png') no-repeat;
        background-size: 100% 100%;
      }
      .content{
        // margin-top:-15px;
        padding:0 20px;
        .zsbank_area{
          box-sizing: border-box;
          width: 100%;
          height: 384px;
          padding: 30px 20px 0 20px;
          background:url('../../assets/images/zsbank_oneCent/fulizhuanqu.png') no-repeat;
          background-size: 100% 100%;
          .fiveyuan {
            width: 100%;
            height: 200px;
            margin-top: 110px;
            background:url('../../assets/images/zsbank_oneCent/5yuan.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
             position: relative;
            .robnow {
             padding-left: 430px;
              text-align: center;
              .purchased{
                position: absolute;
                width: 109px;
                height: 52px;
               top: 20px;
               right: 30px;
              }
              p {
                color: #4495F5;
                font-size: 35px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 5px;
                span {
                  font-size: 48px;
                  margin-left: 10px;
                }
              }
              img {
                width: 209px;
                height: 77px;
              }
            }
            .saleout {
              padding-left: 430px;
              .saleoutpic {
                position: absolute;
                top: 42px;
                left: 480px;
                width: 120px;
                height: 120px;
              }
              .opacitymsq {
                opacity: .5;
                width: 209px;
                height: 77px;
              }
            }
          }
          .oneG {
            width: 100%;
            height: 200px;
            margin-top: 20px;
            background:url('../../assets/images/zsbank_oneCent/1GB\ .png') no-repeat;
            background-size: 100% 100%;
            .saleout {
               padding-top: 20px;
              padding-left: 400px;
              height: 140px;
              text-align: center;
              .purchased{
                width: 120px;
                height: 50px;
                margin-bottom: 10px;
              }
              p {
                color: #4495F5;
                font-size: 35px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 5px;
                span {
                  font-size: 48px;
                  margin-left: 10px;
                }
              }
              .msqimg {
                width: 209px;
                height: 77px;
              }
              .quchakan {
                width: 209px;
                height: 77px;
              }
              .saleoutpic {
                position: absolute;
                top: 30px;
                left: 475px;
                width: 120px;
                height: 120px;
              }
            }
            .saleoutarea {
              position: relative;
              height: 140px;
              padding-top: 35px;
              padding-left: 400px;
              .saleoutpic {
                position: absolute;
                left: 480px;
                width: 120px;
                height: 120px;
              }
              .opacitymsq {
                position: absolute;
                top: 100px;
                width: 209px;
                height: 77px;
                opacity: .5;
              }
            }
          }
        }
        .wallet_area {
          width: 722px;
          height: 373px;
          background:url('../../assets/images/zsbank_oneCent/meiyuefuli.png') no-repeat;
          background-size: 100% 100%;
          overflow: hidden;
          margin-top: 40px;
          padding: 0 20px;
          box-sizing: border-box;
          .twoyuan {
            width: 649px;
            height: 202px;
            background:url('../../assets/images/zsbank_oneCent/2yuan.png') no-repeat;
            background-size: 100% 100%;
            margin: 105px 0 0 26px;
            .gocheck {
              padding-top: 45px;
              padding-left: 400px;
              height: 140px;
              text-align: center;
              p {
                color: #4495F5;
                font-size: 35px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 5px;
                span {
                  font-size: 48px;
                  margin-left: 10px;
                }
              }
              .purchased{
                width: 120px;
                height: 50px;
                margin-bottom: 10px;
              }
              .quchakan {
                width: 209px;
                height: 77px;
              }
              .mashangqiang {
                width: 209px;
                height: 77px;

              }
            }
            .saleout {
              position: relative;
              height: 140px;
              padding-top: 20px;
              padding-left: 400px;
              .saleoutpic {
                position: absolute;
                left: 480px;
                width: 120px;
                height: 120px;
              }
              .opacitymsq {
                position: relative;
                top:65px;
                width: 209px;
                height: 77px;
                opacity: .5;
              }
            }
          }
          .oneG {
            width: 100%;
            height: 197px;
            margin-top: 105px;
            background:url('../../assets/images/zsbank_oneCent/1GB_2.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            position: relative;
            .saleout {
              padding-left: 430px;
              text-align: center;
              .purchased{
                 position: absolute;
                width: 109px;
                height: 52px;
               top: 20px;
               right: 30px;
              }
              p {
                color: #4495F5;
                font-size: 35px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 5px;
                span {
                  font-size: 48px;
                  margin-left: 10px;
                }
              }
              .msqimg {
                width: 209px;
                height: 77px;
              }
              .quchakan {
                width: 209px;
                height: 77px;
              }
              .saleoutpic {
                position: absolute;
                top: 30px;
                left: 475px;
                width: 120px;
                height: 120px;
              }
            }
            .saleoutarea {
               padding-left: 430px;
              .saleoutpic {
                  position: absolute;
                top: 42px;
                left: 480px;
                width: 120px;
                height: 120px;
              }
              .opacitymsq {
                opacity: .5;
                width: 209px;
                height: 77px;
              }
            }
          }
        }
        .item{
          width: 342px;
          height: 314px;
          position: relative;
          .state{
            width: 330px;
            height: 90px;
            position: absolute;
            top: 210px;
            left: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            .tips{
              // width: 96px;
              height: 26px;
              padding: 0 5px;
              line-height: 26px;
              color: #fff;
              background: #70ae44;
              font-size: 16px;
              border-radius: 30px;
              position: absolute;
              top: 6px;
              left: 0;
            }
            .tips::after{
              content: '';
              width: 0;
              height: 0;
              border-top: 6px solid #70ae44;
              border-right: 6px solid #70ae44;
              border-bottom: 6px solid #70ae44;
              border-left: 6px solid #70ae44;
              position: absolute;
              bottom: -3px;
              right: 10px;
              transform: rotate(45deg);
            }
            .price{
              color: #e56c09;
              font-size: 40px;
              font-weight: 600;
            }
            .btn{
              width: 115px;
              height: 45px;
              color: #fff;
              border-radius: 20px;
              text-align: center;
              line-height: 45px;
              font-weight: 600;
              background: #70ae44;
              font-size: 22px;
              margin: 0 10px;
            }
          }
          .state_1{
            height: 70px;
            padding-top: 20px;
          }
          .state_2{
            .btn{
              background: #c6dfb4;
            }
            .icon{
              width: 134px;
              height: 136px;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
          .state_3{
            .icon{
              width: 83px;
              height: 86px;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
        }
        .item_one{
          background: url('../../assets/images/onecent/item_one.png') no-repeat;
          background-size: 100% 100%;
        }
        .item_two{
          background: url('../../assets/images/onecent/item_two.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .bottom{
      background-color: #FFCC78;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .morediscount{
        text-align: center;
        margin-top: 45px;
        .morepic {
          width: 338px;
          height: 44px;
        }
      }
      .activitycontent {
        margin: 25px auto;
        img {
          width: 697px;
          height: 228px;
          margin-bottom: 23px;
        }
      }
    }
    .rules,.share{
      width: 135px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      position: absolute;
      top: 81px;
      right: 0;
      background: rgba(0, 0, 0, .3);
      border-radius: 22px 0 0 22px;
      color: #fff;
      font-size: 24px;

    }
    .share{
      top: 145px;
      width: 95px;
    }
    .rules img {
      width: 108px;
      height: 41px;
    }
    .share img {
      width: 81px;
      height: 41px;
    }
    .model{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      .content{
        position: relative;
        top: 45%;
        transform: translateY(-50%);
        text-align: center;
        width: 702px;
        height: 407px;
        background: url('../../assets/images/onecent/bg_true.png') no-repeat;
        background-size: 100% 100%;
        padding-top: 350px;
        padding-left: 25px;
        .textTop{
          color: #70AE44;
          font-weight: 400;
          font-size: 34px;
          margin-top: 40px;
        }
        .text{
          font-size: 28px;
          margin-top: 30px;
        }
        .close{
          margin-top: 100px;
          margin-left: -25px;
          img{
            width: 71px;
            height: 71px;
          }
        }
      }
    }
    .getSuccess{
      .content{
        width: 650px;
        height: 464px;
        padding-left: 0;
        margin: 0 25px 0 50px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/wuYuan/gongxi5_tankuang.png') no-repeat;
        background-size: 100% 100%;
        .btn {
            height: 80px;
            padding-top: 300px;
          img{
            width: 285px;
            height: 80px;
          }
        }
        .close {
          padding-top: 20px;
        }
      }
      .contenttwo{
        position: relative;
        height: 800px;
        width: 650px;
        margin-top: 200px;
        margin-left: 48px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/twoYuan/gongxi2_tankuang.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          position: absolute;
            left: 180px;
            top: 330px;
            padding-top: 300px;
          img{
            width: 285px;
            height: 80px;
          }
        }
        .close {
          position: absolute;
          left: 280px;
          top: 840px;
          img{
            width: 70px;
            height: 70px;
          }
        }
      }
      .contentone{
        position: relative;
        height: 900px;
        width: 650px;
        margin-top: 200px;
        margin-left: 48px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/oneG/gongxi_tankuang.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          position: absolute;
            left: 180px;
            top: 360px;
            padding-top: 400px;
          img{
            width: 285px;
            height: 80px;

          }
        }
        .close {
          position: absolute;
          left: 280px;
          top: 940px;
          img{
            width: 70px;
            height: 70px;
          }
        }
      }
    }
    .shareModel{
      .arrow{
        width: 255px;
        height: 193px;
        position: absolute;
        top: 42px;
        right: 13px;
      }
      .imgCont{
        width: 545px;
        height: 421px;
        position: absolute;
        top: 228px;
        left: 50%;
        transform: translateX(-50%);
      }
      .btn{
        width: 400px;
        height: 80px;
        position: absolute;
        top: 454px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .rulesModel{
      .content{
        width: 600px;
        height: 709px;
        padding-top: 70px;
        padding-left: 0;
        margin: 0 0 0 75px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/rules.png') no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        .conatin{
          width: 540px;
          height: 570px;
          margin:20px auto;
          overflow: scroll;
          // border: 1px solid red;
          line-height: 1.5;
          text-align: left;
          font-size: 22px;
          span {
            color: #FF0101;
            //text-decoration: underline;
          }
        }
        .more{
          width: 32px;
          height: 32px;
        }
        .text {
          color: #517AE5;
          font-size: 42px;
          font-weight: 500;
        }
        .closeIcon{
          width: 100px;
          margin: 120px auto 0 !important;
          img{
            width: 69px;
            height: 69px;
          }
        }
      }

    }
    .kongModel{
      .content{
        position: relative;
        width: 600px;
        height: 422px;
        padding-top: 300px;
        margin-left: 60px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/finishCoupons/finish_tankuang.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          position: absolute;
            top: 540px;
            right: 110px;
          img {
            width: 400px;
            height: 100px;
          }
        }
        .close {
          position: absolute;
          top:680px;
          left: 300px;
        }
      }
    }
    .openModel{
      .content{
        position: relative;
        width: 650px;
        height: 464px;
        padding-left: 0;
        margin: 0 25px 0 50px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/openWallet/wallet_tankuang.png') no-repeat;
        background-size: 100% 100%;
        .btnBox{
          position: absolute;
          bottom: 50px;
          left: 100px;
          display: flex;
          width: 400px;
          margin: 40px auto;
          justify-content: space-between;
          img {
            width: 230px;
            height: 80px;
            padding-right: 30px;
          }
        }
      }
    }
    .changeModel {
      .content{
        position: relative;
        width: 650px;
        height: 464px;
        padding-left: 0;
        margin: 0 25px 0 50px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/quxiugai/change_tankuang.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          position: absolute;
            top: 630px;
            left: 130px;
          img {
            width: 400px;
            height: 100px;
          }
        }
        .close {
          position: absolute;
          left: 320px;
          top: 780px;
        }
      }

    }
    .changezsModel {
      .content {
        position: relative;
        width: 650px;
        height: 464px;
        padding-left: 0;
        margin: 0 25px 0 50px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/openzsbank/zsbank_tankuang.png') no-repeat;
        background-size: 100% 100%;
      }
      .btn {
        position: absolute;
        top: 640px;
        left: 130px;
          img {
            width: 400px;
            height: 100px;
          }
        }
        .close {
          position: absolute;
          left: 320px;
          top: 780px;
        }
    }
    .networkErr {
      .content {
        position: relative;
        width: 650px;
        height: 464px;
        padding-left: 0;
        margin: 0 25px 0 50px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/networkErr/inter_tankuang.png') no-repeat;
        background-size: 100% 100%;
        .btn {
          padding-top: 280px;
          img {
            height: 80px;
            width: 250px;
            padding-left: 20px;
          }
        }
      }
    }
    .timeLimit{
      .daylimit {
        width: 600px;
        height: 700px;
        margin-left: 75px;
        margin-top: 200px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/daylimit.png') no-repeat;
        background-size: 100% 100%;
        .btn{
          width: 285px;
            height: 74px;
            padding-top: 540px;
            padding-left: 155px;
          img {
            width: 285px;
            height: 74px;
          }
        }
      }
      .monthlimit {
        width: 600px;
        height: 700px;
        margin-left: 75px;
        margin-top: 200px;
        background: url('../../assets/images/zsbank_oneCent/tankuang/monthlimit.png') no-repeat;
        background-size: 100% 100%;
        .btn{
          width: 285px;
            height: 74px;
            padding-top: 540px;
            padding-left: 155px;
          img {
            width: 285px;
            height: 74px;
          }
        }
      }
    }
    .loading{
      .cont{
        width: 200px;
        height: 200px;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
      }
    }
  }
  .loading-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 999;
    border: 999px solid transparent;

    img {
        width: 1.2rem;
    }
  }
  .shareModel_2{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background: rgba(2, 2, 2, 0.7);
    img{
      width: 5.37rem;
      height: 2.77rem;
      margin-left: 1.53rem;
      margin-top: 0.1rem;
    }
    .btn{
      width: 1.5rem;
      line-height: 0.6rem;
      border: 0.01rem solid #fff;
      color: #fff;
      border-radius: 0.1rem;
      margin: auto;
      text-align: center;
      font-size: 0.28rem;
    }
  }
.md-toast .md-toast-text {
    white-space: normal !important;
    text-overflow: unset !important;
    overflow: auto !important;
}
.red{
  color: red;
}
</style>
