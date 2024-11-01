<template>
  <div :class="showTipsModel ? 'showModel' : ''" class="walletCardcenter">
    <pull-refresh :isrefresh="isrefresh" @refresh="refreshAllInfo('noLoading')" v-model="isrefresh">
      <div class="newHeader">
        <div class="listOne">
          <div class="myWallet">
            <div>我的钱包</div>
            <div id="A01" @click="isShowNum">
              <img
                v-if="!visibleShow"
                alt=""
                class="eye"
                src="../../assets/images/newIndex/close_eye.png"
              />
              <img
                v-else
                alt=""
                class="eye openEye"
                src="../../assets/images/newIndex/open_eye.png"
              />
            </div>
            <!-- 暂时隐藏刷新图标 -->
            <!-- <div id="A02" @click="refreshAllInfo('loading')">
                            <img class="refresh" src="../../assets/images/newIndex/refresh.png" />
                        </div> -->
            <!-- 小喇叭 -->

            <div
              class="zero"
              :class="{ zeroOn: zero }"
              @click="!zero ? (zeroShow = true) : ''"
            >
              <span v-if="zero">{{ usrmob }}</span>
            </div>
            <div class="zeroBox" v-if="zeroShow">
              <div class="box">
                <div class="top">温馨提示</div>
                <div class="text" v-if="!zero">
                  您未激活移动钱包功能（0元/月）<br />
                  现在激活每月可享5元充值券
                </div>
                <div class="btn">
                  <div class="left" @click="zeroShow = false;">取消</div>
                  <div class="right" @click="goZero">去激活</div>
                </div>
              </div>
            </div>
            <!-- 0元包未开通弹窗 -->
            <!-- <div class="zeroBox" v-if="zeroAuto">
              <div class="box">
                <div class="top">限时福利</div>
                <div class="text texts">
                  开通移动钱包功能（0元/月）<br />
                  每月可享5元充值券
                </div>
                <div class="btn">
                  <div class="left" @click="zeroAuto = false;$store.commit('setFirstEnter', '2');">取消</div>
                  <div class="right" @click="goZero">去开通</div>
                </div>
              </div>
            </div> -->
            <!-- 和包未开通弹窗 -->
            <!-- <div class="zeroBox" v-if="hebaoAuto">
              <div class="box">
                <div class="top">限时福利</div>
                <div class="text texts">
                  开通零钱账户<br />
                  享绑卡支付送1GB流量
                </div>
                <div class="btn">
                  <div class="left" @click="hebaoAuto = false;$store.commit('setFirstEnter', '2');">取消</div>
                  <div class="right" @click="hbCheck(b2cStatus)">去开通</div>
                </div>
              </div>
            </div> -->
          </div>
          <div class="right-top">
            <div class="laba" @click="reloadYP()">
              <audio
                ref="audio"
                src="../../assets/vedio/wallet_music.mp3"
                @ended="isEnded()"
              ></audio>
              <div class="smallLaba" v-if="showLaba"></div>
              <div class="movingLaba" v-if="!showLaba">
                <img src="../../assets/images/laba_moving.gif" alt="" />
              </div>
            </div>
            <div id="A03" @click="searchAllAccount">
              查看全部账户
              <div class="more"></div>
            </div>
          </div>
        </div>
        <div class="listHb">
          <div class="hb_item">
            <!-- 零钱 -->
            <template v-if="visibleShow">
              <span
                v-if="b2cStatus != 5"
                class="hb_br"
                @click="hbCheck(b2cStatus)"
              >
                {{ b2cStatusData[b2cStatus] }}
              </span>
              <span v-else class="hb_num" @click="hbCheck(b2cStatus)">
                {{ b2cData.accountBalance }}
              </span>
            </template>
            <p v-else id="B02" class="topTxt" @click="hbCheck(b2cStatus)">
              {{ noShowNum }}
            </p>
            <p
              v-if="jbShowList.hebao && visibleShow"
              class="topTip"
              id="B07"
              @click.stop="showTips('04')"
            >
              {{ jbShowList.hebao }}
            </p>
            <p class="hb_nm" @click="hbCheck(b2cStatus)">零钱(元)</p>
          </div>
          <!-- 银行卡 -->
          <div class="hb_item">
            <p v-if="visibleShow" id="B02" class="hb_num" @click="searchBank">
              <span>{{
                b2cData.bankCardList.length || 0
              }}</span>
            </p>
            <p v-else id="B02" class="topTxt" @click="searchBank">
              {{ noShowNum }}
            </p>
            <p
              v-if="jbShowList.bank && visibleShow"
              class="topTip"
              id="B07"
              @click="showTips('02')"
            >
              {{ jbShowList.bank }}
            </p>
            <p class="hb_nm" @click="searchBank">银行卡(张)</p>
          </div>
        </div>
        <div class="listTwo">
          <!-- 话费余额 -->
          <div :class="visibleShow ? 'changeWidth' : ''">
            <p v-if="visibleShow" id="B03" class="topTxt" @click="goBalance">
              <md-icon v-if="eyesLoading1" name="spinner" size="sm" color='#fff' ></md-icon>
              <span v-else>{{ hfBalance || '--' }}</span>
            </p>
            <p v-else id="B03" class="topTxt" @click="goBalance">
              {{ noShowNum }}
            </p>
            <p @click="goBalance">话费(元)</p>
          </div>

          <!-- 电子账户 -->
          <div :class="visibleShow ? 'changeWidth' : ''">
            <div v-if="visibleShow" style="position: relative">
              <!-- <p
                v-if="isOpen === '00'"
                id="B01"
                class="topBtn"
                @click="goWallet"
              >
                开通
              </p> -->
              <p
                v-if="isOpen === '01' || isOpen === '00' || isOpen == ''"
                id="B01"
                class="topTxt"
                @click="goWallet"
              >
                {{ walletNum }}
              </p>
              <p v-else-if="isOpen === '02'" id="B01" class="topBtn">开通中</p>
              <p
                id="B01"
                v-else-if="isOpen === '03'"
                :style="{ 'z-index': freezePop ? 9999 : '' }"
                class="topBtn"
                @click="freezePop = !freezePop"
              >
                冻结
              </p>
            </div>
            <p
              v-else
              id="I01"
              class="topTxt"
              @click="goWallet"
              :class="{ pf: freezePop }"
            >
              {{ noShowNum }}
            </p>
            <p
              v-if="jbShowList.wallet && visibleShow"
              class="topTip"
              id="B07"
              @click="showTips('01')"
            >
              {{ jbShowList.wallet }}
            </p>
            <p  @click="goWallet">电子账户(个)</p>
          </div>
          <!-- 银行卡 -->
          <div>
            <p
              v-if="visibleShow"
              id="B02"
              class="topTxt"
              @click="countCoinsClick"
            >
              <md-icon v-if="eyesLoading2" name="spinner" size="sm" color='#fff' ></md-icon>
              <span v-else>{{ shubiList.length }}</span>
            </p>
            <p v-else id="B02" class="topTxt" @click="countCoinsClick">
              {{ noShowNum }}
            </p>
             <p
              v-if="jbShowList.shubi && visibleShow"
              class="topTip"
              id="B07"
              @click="showTips('05')"
            >
              {{ jbShowList.shubi  }}
            </p>
            <p  @click="countCoinsClick">数币账户(个)</p>
          </div>
          <!-- 权益 -->
          <div>
            <p v-if="visibleShow" id="B06" class="topTxt" @click="goInterests">
              {{ hadGetQY }}
            </p>
            <p v-else id="B06" class="topTxt" @click="goInterests">
              {{ noShowNum }}
            </p>
            <p
              v-if="notGetQY > 0 && jbShowList.quanyi && visibleShow"
              id="B07"
              class="topTip"
              @click="showTips('03')"
            >
              {{ notGetQY }}张待领取
            </p>
            <p id="B06" @click="goInterests">权益(张)</p>
          </div>
        </div>
        <div class="listThird">
          <div id="C01" class="item" @click="marshalling_3">
            <img src="../../assets/images/fortune_new/icon_1.png" />
            <p>借钱</p>
          </div>
          <div id="C02" class="item" :class="$client.JSMCC ? 'item2_1':'item2'" @click="paymentCode">
            <template v-if="$client.JSMCC">
              <img  src="../../assets/images/fortune_new/icon_2_1.png" />
              <p>付款码</p>
            </template>
            <template v-else>
              <img src="../../assets/images/fortune_new/icon_2.png" />
              <p>保险权益</p>
            </template>
          </div>
          <div id="C03" class="item item3" @click="marshalling_1">
            <img src="../../assets/images/fortune_new/icon_3.png" />
            <p>话费自动充</p>
          </div>
          <div id="C04" class="item item3" @click="marshalling_2">
            <img src="../../assets/images/hfb_icon.png" />
            <p>话费宝</p>
          </div>
          <div id="C05" class="item item3" @click="goCard">
            <img src="../../assets/images/fortune_new/icon_4.png" />
            <p>流量宝</p>
          </div>
        </div>
      </div>
      <section class="body">
        <!-- 权益升级 -->
        <div class="rightsUp">
          <div class="title">
            <span class="t1">精选权益包</span>
            <span class="t2">|</span>
            <span class="t3">领特惠充值券 享优质生活服务</span>
          </div>
          <md-swiper
            :autoplay="0"
            :has-dots="true"
            :is-prevent="false"
            @before-change="beforeChange"
            @after-change="afterChange"
          >
            <md-swiper-item v-for="(el, index) in selectedSwiperList" :key="index">
              <div class="swiper_wrap" :style="el.children.length == 1?'justify-content: flex-start;margin-left:0.05rem':''">
                <div
                  class="insurance1"
                  v-for="(item, index1) in el.children"
                  :key="index1"
                  :id="item.id"
                  :class="maxIndex ? 'bigIndex' : 'zeroIndex'"
                  @click="goOpen(item)"
                >
                  <img class="top_icon" :src="item.icon" alt="" />
                  <p>{{ item.name }}</p>
                  <div class="rightsContent">
                    <div
                      class="wrights"
                      v-for="data in item.wrightsList"
                      :key="data.icon"
                    >
                      <div
                        class="wrightsImg"
                        :style="{
                          backgroundImage: `url(${data.icon})`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '100% 100%',
                        }"
                      ></div>
                      <p>{{ data.name }}</p>
                      <p>{{ data.text }}</p>
                    </div>
                  </div>
                  <div
                    id="D01"
                    v-if="!item.isOpen"
                    class="btn"
                    v-html="item.text"
                  ></div>
                  <div id="D01" v-else class="btn">去查看</div>
                  <!-- <img v-if="item.type === 'health' && !item.isOpen" class="subscript_class" src="../../assets/images/fortune_new/health_subscript.gif" alt=""> -->
                </div>
              </div>
            </md-swiper-item>
          </md-swiper>
        </div>
        <!-- 广告位1 -->
        <div class="adver1" v-if="centralSectionFlag">
          <md-swiper
            ref="swiper1"
            :is-prevent="false"
            :useNative-driver="false"
            dragable
          >
            <md-swiper-item v-for="(item,index) in centralSection" :key="index">
              <div :id="'E0'+(index+1)" @click="topBanner(item.pageUrl)">
                <img :src="item.pageImg" class="banner_img" />
              </div>
            </md-swiper-item>

          </md-swiper>
        </div>
        <!-- 热门推荐 -->
        <div class="recommend">
          <ul class="popularTitle">
            <li>热门推荐</li>
          </ul>
          <div class="cards">
            <div :id="'F0'+ (index+1)" v-for="(item,index) in hotBannerList" :key="index" @click="recommendClick(item.pageUrl)">
              <img :src="item.pageImg" />
            </div>
          </div>
        </div>
        <!-- 金融超市 -->
        <div class="financeMarket">
          <div class="title">
            <span class="t1">金融超市</span>
            <span class="t2">|</span>
            <span class="t3">即开即用，按次收费</span>
          </div>
          <div class="content">
            <div
              class="q1"
              v-for="(item, index) in adver_2"
              :key="index + 100"
              :id="'G0' + (index + 1)"
              @click="golink(item.link)"
              :style="{backgroundImage:'url('+item.icon+')' }"
            >
              <!-- <img :src="item.icon" alt="" /> -->
              <div class="details">
                <p>{{ item.name }}</p>
                <p>{{ item.descript }}</p>
                <p
                  :class="
                    item.money != '0.01' && item.money != '1' ? 'weiyi' : ''
                  "
                >
                  <span>￥</span>{{ item.money
                  }}<span v-if="item.money != '0.01' && item.money != '1' && item.money != '0'"
                    >/年起</span
                  >
                  <span v-if="item.money == '0'">/月</span>
                  <span v-if="item.money == '1'">/起</span>
                </p>
              </div>
              <!-- <div class="go" @click="golink(item.link)"></div> -->
            </div>
          </div>
        </div>
        <div class="foot_card">
          <div class="card_item1" id="I01"
            @click="goBbanner('1')">
            <p>年化利率低至7.2%</p>
            <p><span>极速放款</span><span>大平台有保障</span></p>
            <div class="btn1"></div>
          </div>
          <div class="card_item2" id="I03" @click="goBbanner('2')">
             <p>享300元话费流量</p>
             <p>江苏银行信用卡</p>
             <div class="btn2"></div>
          </div>
        </div>
        <div class="walletBegin_foot">
          <img
            src="@/assets/images/fortune_new/walletBegin.png"
            alt=""
            srcset=""
          />
          <p class="problem" @click="$router.push({ name: 'problemDetail' })">
            常见问题
          </p>
        </div>
      </section>
    </pull-refresh>
    <div v-show="showTipsModel" class="jbsmModel">
      <div class="cont">
        <p class="title">温馨提示</p>
        <div id="modelText" class="text"></div>
        <div class="btn" @click="showTipsModel = false">确认</div>
      </div>
    </div>
    <!-- 首次进入弹窗 -->
    <div class="first_wrap" v-if="!firstFlag">
      <div class="first_one" :style="topHeardFlag?'top: 1.64rem;':''" v-if="stepIndex === 1">
        <img
          src="../../assets/images/fortune_new/first_one.png"
          alt=""
          srcset=""
        />
        <p @click="nextTo(2)">下一步</p>
      </div>
      <div class="first_two" :style="topHeardFlag?'top: 1.64rem;':''" v-if="stepIndex === 2">
        <img
          src="../../assets/images/fortune_new/first_two.png"
          alt=""
          srcset=""
        />
        <p @click="nextTo(3)">下一步</p>
      </div>
      <div class="first_three" :style="topHeardFlag?'top: 3.1rem;':''" v-if="stepIndex === 3">
        <img
          src="../../assets/images/fortune_new/first_three.png"
          alt=""
          srcset=""
        />
        <p @click="nextTo(4)">我知道了</p>
      </div>
    </div>
    <!-- 开始绑定loading效果 -->
    <div v-if="loading" class="loading-toast">
      <img alt="" src="@/assets/images/loading-toast.gif" />
    </div>
    <digitalPop v-if="digitalFlag" @digitalClose='digitalClose'></digitalPop>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import {
    Button, Dialog, Swiper, SwiperItem, Icon
} from 'mand-mobile';
import * as store2 from '@/common/localstore';
import pullRefresh from '@/components/pullRefresh.vue';
import { swiperList, touchArr, upSwiperList } from './data';
import digitalPop from './compoments/digitalPop.vue';

export default {
    name: 'newFortune',
    components: {
        [Swiper.name]: Swiper,
        [SwiperItem.name]: SwiperItem,
        [Dialog.name]: Dialog,
        [Button.name]: Button,
        [Icon.name]: Icon,
        pullRefresh,
        digitalPop
    },
    data() {
        return {
            eyesLoading1: false,
            eyesLoading2: false,
            digitalFlag: false,
            selectedSwiperList: [],
            firstFlag: true,
            stepIndex: 1,
            loading: false,
            maxIndex: false,
            lastImg: true,
            nextImg: true,
            showTipsModel: false,
            isCheck: true,
            centralSection: [
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_1.png'),
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/bindCardActive/hbActive?parchn=bkzfsll&gytype=001633'
                },
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_2_1.png'),
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?parchn=1fg&gytype=001633'
                },
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_3_1.png'),
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/walletActivity?parchn=qbhdjhy&gytype=001633'
                },
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_6_3.png'),
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?dealCh=0yb01&typeId=0yb001&ch=0106&parchn=ydqb0ydg&gytype=001633' // 5
                },

                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_6_2.png'),
                    pageUrl: 'https://mweis.maxwealthfl.com/lightweight/#/?shId=175&shCode=ZGYD0000'
                },
                {
                    pageImg: require('../../assets/images/newIndex/zbbanner/banner_6_5.png'),
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/healthcare/yihuibaoActivity?parchn=yhb&gytype=001013'
                }
            ],
            wrihtsList: [
                { icon: require('../../assets/images/fortune_new/wrights1.png'), name: '1分福利购', text: '月月享话费流量' },
                { icon: require('../../assets/images/fortune_new/wrights2.png'), name: '充10元送2元', text: '配送到家' },
                { icon: require('../../assets/images/fortune_new/wrights3.png'), name: '享5元充值券', text: '移动钱包权益' },
                { icon: require('../../assets/images/fortune_new/wrights4.png'), name: '300元话费流量', text: '江苏银行信用卡活动' },
                { icon: require('../../assets/images/fortune_new/wrights5.png'), name: '领5GB/月', text: '流量宝' }
            ],
            bankImg: [
                {
                    icon: require('../../assets/images/fortune_new/bank2.png'), name: '宁波银行信用卡', money: '500元', link: ''
                },
                {
                    icon: require('../../assets/images/fortune_new/bank3.png'), name: '江苏银行信用卡', money: '300元', link: ''
                }
            ],
            // adver_1: [
            //     require('../../assets/images/fortune_new/q1.png'),
            //     require('../../assets/images/fortune_new/q2.png'),
            //     require('../../assets/images/fortune_new/q3.png'),
            //     require('../../assets/images/fortune_new/q4.png'),
            // ],
            adver_2: [
                {
                    icon: require('../../assets/images/fortune_new/q6.png'), name: '1GB流量', descript: '每月可抢1次', money: '0.01', link: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?parchn=1fg&gytype=001636'
                },
                {
                    icon: require('../../assets/images/fortune_new/q7.png'), name: '女神守护保', descript: '女性原发癌给付', money: '65', link: 'https://aquarius-h5.haida2001.com/api/sl/omwmoBpSEQep'
                },
                {
                    icon: require('../../assets/images/fortune_new/q8.png'), name: '安心出行意外险', descript: '海陆空全覆盖', money: '1', link: 'https://aquarius-client.haida2001.com/insure/products/accident/anxin?tenantId=100830&channelId=128018&agentId=48001&feeRateId=1024055&productCode=AXCXJTYWX&coverPeriodType=4&coverPeriod=30&premPeriodType=4&premPeriod=-1&relationship=0'
                }
                // {
                //     icon: require('../../assets/images/fortune_new/q9.png'), name: '青云卫少儿重疾', descript: '保198种疾病', money: '258', link: 'https://h5.lecheng18.com/product/index_159.html#/?productId=159&companyNo=000001&perCode=751&agentCode=LC451375'
                // },
                // {
                //     icon: require('../../assets/images/fortune_new/q10.png'), name: '中老年医疗险', descript: '守护您的钱袋子', money: '623', link: 'https://product.zhongbaounion.com/common/insure.html?productId=1521742195861315584&channelId=1535095936162373632&agencyId=1655485509238308864'
                // }
            ],
            freezePop: false,
            usrmob: '',
            zero: false,
            zeroOk: false,
            zeroShow: false,
            zeroAuto: false,
            hebaoAuto: false,
            hfBalance: '0', // 话费余额
            touchArr: Object.freeze(touchArr),
            visibleShow: false,
            noShowNum: '****',
            walletNum: 0,
            orgName: '',
            isOpen: '', // 是否已开通钱包账户
            isOpenCont: false,
            canClick: false,
            orgcode: '',
            jbShowList: {
                // 角标是否显示
                wallet: '',
                hebao: '',
                bank: '',
                quanyi: '',
                shubi: ''
            },
            jbTipsList: {
                // 角标是否显示
                wallet: '',
                hebao: '',
                bank: '',
                quanyi: '',
                shubi: ''
            },
            qyList: [],
            hadGetQY: 0,
            notGetQY: 0,
            ylBankList: [],
            getJKResult: 0,
            isrefresh: false,
            healthRights: false,
            ajwyRights: false,
            zeroYuan: false,
            showLaba: true,
            swiperIndex: 0,
            biaoshi: true,
            isSystem: '',
            b2cStatus: '1', // 1.未注册 2.未授权 3.已授权且二次放号 4.未签约 5.已签约
            b2cStatusData: {
                1: '开通',
                2: '授权',
                3: '授权',
                4: '开通',
                5: '已授权'
            },
            b2cData: {
                accountBalance: '0',
                bankCardList: [],
                realType: '0'
            },
            shubiList: [],
            topHeardFlag: false,
            hotBannerList: [
                {
                    pageSort: '1',
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/healthcare/transitionPage?pageId=230620134827029002&parchn=jrbxcs&gytype=001383',
                    pageImg: require('@/assets/images/fortune_new/hot1.png')
                },
                {
                    pageSort: '2',
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/telephoneCharges/newDescription?parchn=hfb&gytype=001635',
                    pageImg: require('@/assets/images/fortune_new/hot2.png')
                },
                {
                    pageSort: '3',
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/insurance/saveMoneyIndex?parchn=sqb10dg&gytype=001635',
                    pageImg: require('@/assets/images/fortune_new/hot3.png')
                },
                {
                    pageSort: '4',
                    pageUrl: 'https://fintech.12580life.com/fintech-h5/healthcare/yihuibaoActivity?parchn=yhb&gytype=001013',
                    pageImg: require('@/assets/images/fortune_new/hot6.png')
                }
            ],
            centralSectionFlag: true
        };
    },
    created() {
        // 省钱包业务将于2月29日24点停售业务，此逻辑2月底才生效
        if (new Date().getTime() > 1708500000000) {
            this.selectedSwiperList = upSwiperList;
        } else {
            this.selectedSwiperList = swiperList;
        }

        const u = navigator.userAgent;
        if (u.indexOf('Mac OS X') > -1) {
            this.isSystem = 'ios';
        } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            this.isSystem = 'android';
        }
        this.queryRights(); // 查询权益包健康无忧
        this.queryZero(); // 查询权益包0元包
        // this.getBalance(); // 查询话费余额------
        this.getZero(); // 获取零元包状态
        this.querySxcjCheck();// 查询省心财经是否订购
        this.provWalletQuery();// 查询省钱包是否开通
        // this.isOpenWallet();
        const ua = navigator.userAgent.toLowerCase();
        this.isAndroidAndInapp = (ua.indexOf('android') > -1 || ua.indexOf('linux') > -1)
      && ua.indexOf('jsmcc') > -1;
        // 去掉安卓版小蓝卡banner
        // if (this.isAndroidAndInapp) {
        //     this.centralSection.push(this.addImg);
        // }
        this.getTopShowInfo({}, 'loading'); // 查询电子账户信息-------
    },
    watch: {
        getJKResult: {
            handler(newValue) {
                if (newValue >= 4) {
                    this.loading = false;
                    this.isrefresh = false;
                }
            },
            // 深度监测
            deep: true
        }
    },
    mounted() {
        if (document.getElementsByClassName('walletCardcenter')[0].offsetTop >= 58) {
            this.topHeardFlag = true;
        }
        this.setFirstFlag();
        initPageJs(this.$route.meta.pageName, this.touchArr, this.$route.meta.attributes);
        // this.getCmbList();// 查询数币---------
        this.getCard();
        this.getWalletPageBanner(); // 获取banner
        // this.reloadYP();
        // 设置标题
        const showGuide = store2.default.get('showGuide');
        if (showGuide !== null && showGuide !== '') {
            this.showMask = showGuide;
        }
        window.triggerSwiper0 = () => {
            this.goto();
        };
        window.triggerSwiper1 = () => {
            this.play();
        };
        window.triggerSwiper2 = () => {
            this.stop();
        };
        const mask = document.getElementsByClassName('mask')[0]; // 弹窗dom对象
        if (mask) {
            mask.addEventListener(
                'touchmove',
                (e) => {
                    e.preventDefault();
                },
                false
            );
        }
    },
    methods: {
        // 获取缓存配置banner
        getWalletPageBanner() {
            const bannerGetTime = localStorage.getItem('bannerGetTime');
            const hotBannerList = JSON.parse(localStorage.getItem('hotBannerList') || '[]');
            const centralSection = JSON.parse(localStorage.getItem('centralSection') || '[]');
            if (new Date().getTime() < bannerGetTime) {
                if (hotBannerList.length > 0) {
                    this.hotBannerList = hotBannerList;
                }
                if (centralSection.length > 0) {
                    this.centralSection = centralSection;
                }
                if (hotBannerList.length == 0 && centralSection.length == 0) {
                    this.getBanner();
                }
                this.getJKResult += 1;
            } else {
                this.getBanner();
            }
        },
        // 获取配置banner
        getBanner() {
            this.centralSectionFlag = false;
            api.walletPageBanner().then((res) => {
                // 热门推荐
                let hotBanner = [];
                hotBanner = res.list.filter(item => item.bannerPosition === '热门推荐');
                hotBanner.sort((a, b) => a.pageSort - b.pageSort);
                if (hotBanner.length > 0) {
                    this.hotBannerList = hotBanner;
                    localStorage.setItem('hotBannerList', JSON.stringify(this.hotBannerList));
                }
                // 中部banner
                let centerBanner = [];
                centerBanner = res.list.filter(item => item.bannerPosition === '中部banner');
                if (centerBanner.length > 0) {
                    this.centralSection = centerBanner;
                    localStorage.setItem('centralSection', JSON.stringify(this.centralSection));
                }
                this.centralSectionFlag = true;
                this.getJKResult += 1;
                localStorage.setItem('bannerGetTime', new Date().getTime() + 60 * 60 * 2 * 1000);
            }).catch((err) => {
                this.getJKResult += 1;
                this.centralSectionFlag = true;
            });
        },
        // 查询省钱包是否开通
        provWalletQuery() {
            api.save.provWalletQuery().then((res) => {
                if (res.actSts != '1') {
                    this.selectedSwiperList.forEach((item) => {
                        item.children.forEach((el) => {
                            if (el.type === 'sqb') {
                                el.isOpen = true;
                            }
                        });
                    });
                }
            });
        },
        // 数币
        async  countCoinsClick() {
            if (this.shubiList.length === 0) {
                const res = await api.digiccyApi.getList({ channelId: 'cmb' });
                this.shubiList = res.list || [];
            }
            if (this.shubiList.length > 0) {
                this.$router.push({
                    name: 'digitalPayment',
                    query: {
                        parchn: 'wdsb',
                        gytype: '001629'
                    }
                });
            } else {
                this.digitalFlag = true;
            }
        },
        digitalClose() {
            this.digitalFlag = false;
        },
        // 查询数币
        getCmbList() {
            api.digiccyApi.getList({ channelId: 'cmb' }).then((res) => {
                this.shubiList = res.list || [];
                this.eyesLoading2 = false;
            });
        },
        // 和包签约/注册
        hbCheck(type) {
            switch (type) {
                case '1':// 未注册
                    this.$router.push({ name: 'hbOpen', query: { parchn: 'lqhbzcsq', gytype: '001625' } });
                    break;
                case '2':// 未授权
                    this.$router.push({ name: 'hbEmpower', query: { parchn: 'lqhbzc', gytype: '001625' } });
                    break;
                case '3':// 已授权且二次放号
                    this.$router.push({ name: 'hbEmpower', query: { parchn: 'lqhbzc', gytype: '001625' } });
                    break;
                case '4':// 未签约
                    this.$router.push({ name: 'accountSigning' });
                    break;
                case '5':// 已授权
                    this.$router.push({ name: 'myMoney', query: { parchn: 'lqhb', gytype: '001625' } });
                    break;
            }
        },
        // 获取和包信息
        getInfoList(zeroType) {
            api.B2CWallet.infoList().then((res) => {
                this.getJKResult += 1;
                this.b2cStatus = res.state;
                if (this.b2cStatus != '5') {
                    this.b2cData.bankCardList = [];
                    if (this.firstFlag && zeroType != '1') {
                        this.isShowHebao();
                    }
                } else {
                    this.b2cData.bankCardList = res.bankCardList || [];
                }
                this.b2cData.accountBalance = res.accountBalance || '0';
                this.b2cData.realType = res.realType || '0';
            }).catch((err) => {
                this.getJKResult += 1;
            });
        },
        goOpen(item) {
            if (item.type === 'wallet') {
                window.location.href = `https://fintech.12580life.com${process.env.BASE_URL}member/rightsfree?dealCh=0yb01&typeId=0yb001&ch=0106&parchn=ydqb0ydg&gytype=001632`;
            } else if (item.type === 'health') {
                if (!item.isOpen) {
                    window.location.href = 'https://fintech.12580life.com/fintech-h5/healthcare/homeTenBill?type=jrcs&parchn=wydg&gytype=001632';
                } else {
                    window.location.href = `https://fintech.12580life.com/fintech-h5/healthcare/newTenrights?type=ZT&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
                }
            } else if (item.type === 'sxcj') {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/insurance/worryFinance';
            } else if (item.type === 'ajwy') {
                if (!item.isOpen) {
                    window.location.href = `https://fintech.12580life.com/fintech-h5/ajwy/index?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
                } else {
                    window.location.href = `https://fintech.12580life.com/fintech-h5/ajwy/rights?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
                }
            } else if (item.type === 'sqb') {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/insurance/saveMoneyIndex?parchn=sqb10dg&gytype=001632';
            }
        },
        reloadYP() {
            if (this.is_play) {
                this.$refs.audio.pause();
                this.showLaba = true;
                this.is_play = false;
            } else {
                this.$refs.audio.play();
                this.showLaba = false;
                this.is_play = true;
            }
        },
        // 音频播放完毕
        isEnded() {
            if (this.$refs.audio.ended) {
                console.log(this.$refs.audio.ended);
                this.showLaba = true;
            }
        },
        beforeChange(from, to) {
            console.log(from, to);
        },
        afterChange(from, to) {
            // console.log(this.swiperIndex)
            // this.lastImg = true;
            // this.nextImg = true;
            // this.swiperIndex = to;
            // console.log(from,to,this.swiperIndex)
        },
        queryZero() {
            api.zeroPackageQuery()
                .then((res) => {
                    if (res.actSts == '2') {
                        this.selectedSwiperList.forEach((item) => {
                            item.children.forEach((el) => {
                                if (el.type === 'wallet') {
                                    el.isOpen = true;
                                }
                            });
                        });
                    }
                });
        },
        queryRights() {
            api.getDealInfo({ bizTypeCode: 'JKWY010' })
                .then((res) => {
                    if (res.data && res.data.hasDeal) {
                        this.selectedSwiperList.forEach((item) => {
                            item.children.forEach((el) => {
                                if (el.type === 'health') {
                                    el.isOpen = true;
                                }
                            });
                        });
                    }
                })
                .catch(() => {

                });
            api.getDealInfo({ bizTypeCode: 'AJWY20Y' })
                .then((res) => {
                    if (res.data && res.data.hasDeal) {
                        this.selectedSwiperList.forEach((item) => {
                            item.children.forEach((el) => {
                                if (el.type === 'ajwy') {
                                    el.isOpen = true;
                                }
                            });
                        });
                    }
                })
                .catch(() => {

                });
        },
        // 查询省心财经是否订购
        querySxcjCheck() {
            api.sxcjCheck({ mobile: store2.default.get('usrmob') }).then((res) => {
                if (res.state === '1') {
                    this.selectedSwiperList.forEach((item) => {
                        item.children.forEach((el) => {
                            if (el.type === 'sxcj') {
                                el.isOpen = true;
                            }
                        });
                    });
                }
            });
        },
        topBanner(url) {
            window.location.href = url;
        },
        goWallet() {
            if (this.isOpen === '00') {
                let tyid;
                if (this.$route.query.tyId) {
                    tyid = this.$route.query.tyId;
                } else {
                    tyid = '10010';
                }
                this.$router.push({
                    name: 'khEmpower',
                    query: {
                        typeId: tyid,
                        sourcechannel: this.$route.query.sourcechannel || '',
                        parchn: 'dzzhkh',
                        gytype: '001628'
                    }
                });
            } else if (this.isOpen === '01') {
                this.$router.push({
                    name: 'moveWallet',
                    query: {
                        parchn: 'wdlq',
                        gytype: '001628'
                    }
                });
            } else if (this.isOpen === '03') {
                this.freezePop = !this.freezePop;
            }
        },
        goInterests() {
            // debugger;
            if (this.notGetQY == 0) {
                api.rightAccountQuery({})
                    .then((res) => {
                        res.list.forEach((item) => {
                            if (item.receiveSts !== '1') {
                                this.notGetQY += 1;
                            }
                        });
                        window.location.href = `https://fintech.12580life.com/fintech-h5/healthcare/walletRights?rightsNum=${this.notGetQY}&parchn=qbqyzq&gytype=001630`;
                    })
                    .catch((err) => {
                        store2.default.set('qyList', []);
                        console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                    });
            } else {
                window.location.href = `https://fintech.12580life.com/fintech-h5/healthcare/walletRights?rightsNum=${this.notGetQY}&parchn=qbqyzq&gytype=001630`;
            }
        },
        golink(data) {
            window.location.href = data;
        },
        // 查看全部账户列表
        searchAllAccount() {
            if (this.$route.query.tyId && this.$route.query.sourcechannel) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        typeId: this.$route.query.tyId,
                        sourcechannel: this.$route.query.sourcechannel,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
                // const link1 = `https://fintech.12580life.com/fintech-h5/fortuneCenter/allAccount?hasaccount=${this.isOpen}&typeId=${this.$route.query.typeId}&sourcechannel=${this.$route.query.sourcechannel}`;
                // if (this.isSystem == 'ios') {
                //     window.open(link1, '_blank');
                // } else {
                //     window.location.href = link1;
                // }
            } else if (this.$route.query.tyId) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        typeId: this.$route.query.tyId,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
                // const link1 = `https://fintech.12580life.com/fintech-h5/fortuneCenter/allAccount?hasaccount=${this.isOpen}&typeId=${this.$route.query.typeId}`;
                // if (this.isSystem == 'ios') {
                //     window.open(link1, '_blank');
                // } else {
                //     window.location.href = link1;
                // }
            } else if (this.$route.query.sourcechannel) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        sourcechannel: this.$route.query.sourcechannel,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
                // const link1 = `https://fintech.12580life.com/fintech-h5/fortuneCenter/allAccount?hasaccount=${this.isOpen}&sourcechannel=${this.$route.query.sourcechannel}`;
                // if (this.isSystem == 'ios') {
                //     window.open(link1, '_blank');
                // } else {
                //     window.location.href = link1;
                // }
            } else if (this.$route.query.dealChn) {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        dealChn: this.$route.query.dealChn,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
                // const link1 = `https://fintech.12580life.com/fintech-h5/fortuneCenter/allAccount?hasaccount=${this.isOpen}&dealChn=${this.$route.query.dealChn}`;
                // if (this.isSystem == 'ios') {
                //     window.open(link1, '_blank');
                // } else {
                //     window.location.href = link1;
                // }
            } else {
                this.$router.push({
                    name: 'allAccount',
                    query: {
                        hasaccount: this.isOpen,
                        parchn: 'wdqbzh',
                        gytype: '001624'
                    }
                });
                // const link1 = `https://fintech.12580life.com/fintech-h5/fortuneCenter/allAccount?hasaccount=${this.isOpen}`;
                // if (this.isSystem == 'ios') {
                //     window.open(link1, '_blank');
                // } else {
                //     window.location.href = link1;
                // }
            }
        },
        // 查看银行卡
        searchBank() {
            if (this.b2cData.bankCardList.length === 0) {
                this.$router.push({ name: 'middlePage' });
            } else {
                this.$router.push({ name: 'myMoney' });
            }
        },
        // 查看银联银行卡
        cardBag() {
            // this.$router.push({
            //     name: "myYLBanks",
            // });
            if (
                this.$route.query.dealChn !== ''
        && this.$route.query.dealChn !== undefined
            ) {
                this.$router.push({
                    name: 'myYLBanks',
                    query: {
                        dealChn: this.$route.query.dealChn
                    }
                });
            } else {
                this.$router.push({
                    name: 'myYLBanks',
                    query: {
                        dealChn: '10010'
                    }
                });
            }
        },
        // 查看和包
        goHeBao() {
            window.location.href = 'https://wap.js.10086.cn/HBZFPAGE.thtml?BUS_CHANNEL=147010';
        },
        refreshAllInfo(isLoad) {
            this.getJKResult = 0;
            this.getTopShowInfo({ refreshFlag: '1' }, isLoad);
        },
        // 查询首页头部显示信息
        getTopShowInfo(data, isLoad) {
            if (isLoad === 'loading') {
                this.loading = true;
            } else {
                this.isrefresh = true;
            }

            const getData = data || {};
            const changeList = [];
            api.qrySmallChangeAcc(getData)
                .then((res) => {
                    this.isrefresh = false;
                    // 零钱账户开通标识(00:未开户 01:开户正常 04:开户中)
                    this.getJKResult += 1;
                    this.isOpen = res.openFlag;
                    store2.default.set('djList', res.list);
                    const Num = res.list.filter(
                        item => item.accsts === '01'
                    );
                    this.walletNum = Num.length || 0;
                    // if (Num.length > 0) {
                    //     this.walletNum = Number(Num[0].balanceamt).toFixed(2);
                    // }

                    res.list.forEach((item) => {
                        if (
                            item.fullAccNbr
              && item.defaultAccFlg === '01'
              && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            changeList.unshift(item);
                        } else if (
                            item.fullAccNbr
              && item.orgCode !== 'ICBC-DIGICCY'
                        ) {
                            changeList.push(item);
                        }
                    });
                    sessionStorage.setItem('qbBankListsInfos', JSON.stringify(changeList));
                    store2.default.set('qbBankListsInfo', changeList);
                    // 查询角标信息
                    this.queryCornerContent(this.isOpen);
                })
                .catch((err) => {
                    this.getJKResult += 1;
                    store2.default.set('qbBankListsInfo', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });

            // 获取卡面信息
            api.cardImageQuery({ accountType: '01' })
                .then((res) => {
                    this.getJKResult += 1;
                    const imgList = res.list;
                    store2.default.set('bankImgList', imgList);
                })
                .catch((err) => {
                    this.getJKResult += 1;
                    store2.default.set('bankImgList', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        // 获取角标信息
        queryCornerContent(defaultAccFlg) {
            this.jbShowList = {
                // 角标是否显示
                wallet: '',
                hebao: '',
                bank: '',
                quanyi: '',
                shubi: ''
            };
            api.cornerContentQuery({})
                .then((res) => {
                    this.getJKResult += 1;
                    res.list.forEach((item) => {
                        if (
                            item.accountType === '01'
              && item.showFlag === '1'
              && item.businessType === '01'
              && defaultAccFlg != '01'
                        ) {
                            // 钱包
                            this.jbShowList.wallet = item.angularContent;
                            this.jbTipsList.wallet = item.atyDesc || '';
                        } else if (
                            item.accountType === '02'
              && item.showFlag === '1'
              && item.businessType === '01'
                        ) {
                            // 银行卡
                            this.jbShowList.bank = item.angularContent;
                            this.jbTipsList.bank = item.atyDesc || '';
                        } else if (
                            item.accountType === '03'
              && item.showFlag === '1'
              && item.businessType === '01'
                        ) {
                            // 权益
                            this.jbShowList.quanyi = item.angularContent;
                            this.jbTipsList.quanyi = item.atyDesc || '';
                        } else if (
                            item.accountType === '04'
              && item.showFlag === '1'
              && item.businessType === '01'
                        ) {
                            // 和包
                            this.jbShowList.hebao = item.angularContent;
                            this.jbTipsList.hebao = item.atyDesc || '';
                        } else if (
                            item.accountType === '05'
              && item.showFlag === '1'
              && item.businessType === '01'
                        ) {
                            // 数币
                            this.jbShowList.shubi = item.angularContent;
                            this.jbTipsList.shubi = item.atyDesc || '';
                        }
                        store2.default.set('usrmob', res.mobileNo);
                    });
                })
                .catch((err) => {
                    this.getJKResult += 1;
                    store2.default.set('usrmob', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        paymentCode() {
            if (this.$client.JSMCC) {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/tripartite/judgeVersion?way=pay';
            } else {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/healthcare/newTenrights?parchn=10yjkwyqyym&gytype=001631';
            }
        },
        goCard() {
            window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicHome?parchn=ztllb&gytype=001631';
        },

        // 宫格位
        marshalling_1() {
            this.$router.push({
                name: 'autoRecharge',
                query: {
                    parchn: 'hfzdc',
                    gytype: '001631'
                }
            });
        },
        marshalling_2() {
            this.$router.push({
                name: 'savebillActivity',
                query: {
                    parchn: 'hfb',
                    gytype: '001631'
                }
            });
        },
        marshalling_3() {
            // this.$router.push({
            //     name: 'authorization'
            // });
            // this.$router.push({
            //     name: 'baiRongLoan',
            //     query: {
            //       parchn: 'dkhd',
            //       gytype: '001631'
            //     }
            // });
            window.location.href = 'https://fintech.12580life.com/fintech-h5/loans/loansCenter?parchn=dkhdjhy&gytype=001631';
        },
        marshalling_4() {
            window.location.href = `https://fintech.12580life.com/fintech-h5/healthcare/insurance/supermarket?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
        },
        marshalling_5() {
            this.$router.push({
                name: 'rightsfree',
                query: {
                    dealCh: '0yb01',
                    typeId: '0yb001',
                    ch: '0106'
                }
            });
        },
        // 是否显示零钱
        isShowNum() {
            this.visibleShow = !this.visibleShow;
            if (this.visibleShow) {
                if (this.hfBalance === '0') {
                    this.eyesLoading1 = true;
                    this.getBalance(); // 查询话费余额------
                }
                if (this.shubiList.length === 0) {
                    this.eyesLoading2 = true;
                    this.getCmbList();// 查询数币---------
                }
                if (this.hadGetQY === 0 && this.notGetQY === 0) {
                    this.rightAccountQuery();
                }
            }
            const timer = setTimeout(() => {
                clearTimeout(timer);
                this.eyesLoading1 = false;
                this.eyesLoading2 = false;
            }, 5000);
        },
        rightAccountQuery() {
            this.hadGetQY = 0;
            this.notGetQY = 0;
            this.qyList = [];
            api.rightAccountQuery({})
                .then((res) => {
                    this.getJKResult += 1;
                    this.qyList = res.list;
                    this.qyList.forEach((item) => {
                        if (item.receiveSts === '1') {
                            this.hadGetQY += 1;
                        } else {
                            this.notGetQY += 1;
                        }
                    });
                    store2.default.set('qyList', this.qyList);
                })
                .catch((err) => {
                    this.getJKResult += 1;
                    store2.default.set('qyList', []);
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                });
        },
        // 去余额查看
        goBalance() {
            if (this.$client.LEADEON) {
                window.location.href = 'https://h.app.coc.10086.cn/cmcc-app/personalBill/phoneBillsNew.html';
            } else {
                window.location.href = 'https://wap.js.10086.cn/vw/navbar/ZDCX2020';
            }
        },
        // 获取话费余额
        getBalance() {
            console.log('------');
            api.qryCallBalance()
                .then((res) => {
                    this.eyesLoading1 = false;
                    console.log('++++++', res);
                    if (res.mobilBalance) {
                        this.hfBalance = (
                            Number(res.mobilBalance) / 100
                        ).toFixed(2);
                    }
                })
                .catch((err) => {
                    console.log('********');
                });
        },
        // 获取身份信息
        getCard() {
            api.queryOpenAccount()
                .then((data) => {
                    if (data.userCode) {
                        store2.default.set(
                            'firstfourid',
                            data.userCode.slice(0, 4)
                        );
                    }
                })
                .catch((err) => {
                    // this.$toast.info(err.msgInfo);
                    console.log(err.msgInfo);
                    if (err.cityCode) {
                        this.citycode = err.cityCode;
                    }
                });
        },
        // 获取零元包状态
        getZero() {
            api.indexZero().then((res) => {
                this.usrmob = res.mblNo;
                if (res.actSts == '1') {
                    this.zero = false;
                    if (this.firstFlag) {
                        this.isShowZero();
                    }
                } else {
                    this.zero = true;
                }
                this.getInfoList(res.actSts);
                window.localStorage.setItem('walletActSts', res.actSts);
                this.zeroOk = true;
            });
        },
        // 获取第一次进入首页引导弹窗
        setFirstFlag() {
            this.firstFlag = JSON.parse(window.localStorage.getItem('firstFlag'));
        },
        isShowZero() {
            const kie = JSON.parse(window.localStorage.getItem('zeroAuto'));
            if (kie) {
                const T = new Date();
                if (T.getMonth() != kie.m || T.getDate() != kie.d) {
                    this.zeroAuto = true;
                    const V = {
                        m: T.getMonth(),
                        d: T.getDate()
                    };
                    window.localStorage.setItem('zeroAuto', JSON.stringify(V));
                } else {
                    this.$store.commit('setFirstEnter', '2');
                    this.zeroAuto = false;
                }
            } else {
                this.zeroAuto = true;
                const T = new Date();
                const V = {
                    m: T.getMonth(),
                    d: T.getDate()
                };
                window.localStorage.setItem('zeroAuto', JSON.stringify(V));
            }
        },
        isShowHebao() {
            if (!this.zeroAuto) {
                const kie = JSON.parse(window.localStorage.getItem('hebaoAuto'));
                if (kie) {
                    const T = new Date();
                    if (T.getMonth() != kie.m || T.getDate() != kie.d) {
                        this.hebaoAuto = true;
                        const V = {
                            m: T.getMonth(),
                            d: T.getDate()
                        };
                        window.localStorage.setItem('hebaoAuto', JSON.stringify(V));
                    } else {
                        this.$store.commit('setFirstEnter', '2');
                        this.hebaoAuto = false;
                    }
                } else {
                    this.hebaoAuto = true;
                    const T = new Date();
                    const V = {
                        m: T.getMonth(),
                        d: T.getDate()
                    };
                    window.localStorage.setItem('hebaoAuto', JSON.stringify(V));
                }
            }
        },
        // 去开通零元包
        goZero() {
            window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
        },
        rmtj() {
            this.$router.push({
                name: 'financeActivity'
            });
        },
        recommendClick(url) {
            window.location.href = url;
        },
        recommend_1() {
            window.location.href = `https://fintech.12580life.com/fintech-h5/loans/transitionPage?tokenId=2022090111303269605&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            // this.$router.push({
            //     name: 'newBanksPhoneBill'
            // });
        },
        recommend_3() {
            this.$router.push({
                name: 'traddicHome',
                query: {
                    parchn: 'llb',
                    gytype: '001635'
                }
            });
        },
        recommend_2() {
            window.location.href = 'https://fintech.12580life.com/fintech-h5/insurance/saveMoneyIndex?parchn=sqb10dg&gytype=001635';
        },
        recommend_4() {
            window.location.href = 'https://fintech.12580life.com/fintech-h5/healthcare/newSpecialActivity?parchn=wyly&gytype=001635';
        },
        // 点击角标显示提示弹框
        showTips(val) {
            const dom = document.getElementById('modelText');
            if (val === '01') {
                dom.innerHTML = this.jbTipsList.wallet;
            } else if (val === '02') {
                dom.innerHTML = this.jbTipsList.bank;
            } else if (val === '03') {
                dom.innerHTML = this.jbTipsList.quanyi;
            } else if (val === '04') {
                dom.innerHTML = this.jbTipsList.hebao;
            } else if (val === '05') {
                dom.innerHTML = this.jbTipsList.shubi;
            }
            if (dom.innerHTML !== '') {
                this.showTipsModel = true;
            }
        },
        goBbanner(index) {
            if (index == '1') {
                window.location.href = 'https://fintech.12580life.com/fintech-h5/loans/loansCenter?parchn=dkhdjhy&gytype=001637';
            } else if (index == '2') {
                window.location.href = `https://fintech.12580life.com/fintech-h5/healthcare/transitionPage?pageId=230620134827029002&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
            }
        },
        nextTo(index) {
            if (index === 4) {
                this.firstFlag = true;
                localStorage.setItem('firstFlag', true);
                this.$store.commit('setFirstEnter', '1');
                this.getZero();
            } else {
                this.stepIndex = index;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.walletCardcenter {
  overflow-x: hidden;
  position: relative;
  background: #f4f5f8;
  height: 100vh;
  overflow-y: auto;
  .newHeader {
    width: 100%;
    height: 400px;
    background: url("../../assets/images/newIndex/bg_top.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 60px;

    .listOne,
    .listTwo,
    .listThird,
    .listHb,
    .myWallet {
      display: flex;
      justify-content: space-between;
      text-align: center;
    }

    .listOne {
      height: 40px;
      line-height: 40px;
      padding: 20px 40px;
      font-size: 24px;
      color: #fff;

      .myWallet {
        color: #fff;
        white-space: nowrap;
        font-weight: 600;
        font-size: 30px;
        align-items: center;

        .eye {
          width: 32px;
          height: 18px;
          margin: 0 10px;
        }

        .openEye {
          width: 36px;
          height: 21px;
        }

        .refresh {
          width: 28px;
          height: 28px;
          margin-left: 10px;
        }
      }
      .right-top {
        display: flex;
        justify-content: center;
        align-items: center;
        .laba {
          .smallLaba {
            margin-right: 20px;
            width: 31px;
            height: 28px;
            background: url("../../assets/images/laba_static.png") no-repeat;
            background-size: 100%;
            vertical-align: bottom;
          }

          .movingLaba {
            margin-right: 20px;

            img {
              width: 30px;
              height: 24px;
            }
          }
        }
        .more {
          display: inline-block;
          width: 14px;
          height: 14px;
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(135deg);
        }
      }
    }

    .listTwo {
      padding: 30px 60px 30px 60px;
      color: #ffe2cb;
      font-size: 26px;
      align-items: flex-start;
      position: relative;

      & > div {
        min-width: 130px;
        position: relative;
      }

      .changeWidth {
        // flex-grow: 1;
      }

      .topBtn {
        height: 33px;
        line-height: 33px;
        display: inline-block;
        padding: 0 20px;
        font-size: 21px;
        font-weight: 500;
        color: #ffe2cb;
        border: 1px solid #ffe2cb;
        border-radius: 16px;
        margin-top: 10px;
        white-space: nowrap;
      }

      .topTxt {
        color: #ffe2cb;
        font-size: 32px;
        margin-top: 5px;
        font-weight: 500;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
      }

      .pf {
        position: absolute;
        z-index: 9999;
        left: 50%;
        transform: translateX(-50%);
      }

      .topTip {
        position: absolute;
        top: -30px;
        left: 50%;
        font-size: 20px;
        font-weight: 500;
        background-image: linear-gradient(180deg, #fd3938 0%, #ff2b36 100%);
        border-radius: 10px 10px 10px 0;
        color: #fff;
        padding: 6px 12px;
        display: inline-block;
        white-space: nowrap;
        zoom: 0.8;
      }
    }

    .listfour {
      margin-top: 25px;
      display: flex;

      .accountList {
        width: 25%;

        p {
          font-weight: 500;
          font-size: 26px;
          color: #ffe2cb;
          text-align: center;
        }

        p:first-of-type {
          font-weight: 500;
          font-size: 32px;
          color: #ffe2cb;
          text-align: center;
          margin-bottom: 7px;
        }
      }
    }

    .listThird {
      width: 640px;
      height: 188px;
      background: #fff;
      border-radius: 30px;
      position: absolute;
      top: 340px;
      left: 50%;
      z-index: 99;
      transform: translateX(-50%);
      padding: 0 32px;

      .item {
        margin-top: 36px;

        img {
          width: 76px;
          height: 76px;
        }

        p {
          font-size: 22px;
          margin-top: 23px;
          color: #333333;
          font-weight: 500;
        }
      }

      .item2 {
        img {
          width: 72px;
          height: 80px;
        }

        p {
          margin-top: 19px;
        }
      }
       .item2_1 {
        img {
          width: 72px;
          height: 72px;
        }

        p {
          margin-top: 27px;
        }
      }
      .item3 {
        img {
          width: 57px;
          height: 79px;
        }

        p {
          margin-top: 20px;
        }
      }

      .item4 {
        margin-top: 46px;

        img {
          width: 78px;
          height: 58px;
        }

        p {
          margin-top: 31px;
        }
      }
    }
    .listHb {
      color: #ffe2cb;
      font-size: 30px;
      margin: 20px 0;
      .hb_item {
        width: 50%;
        position: relative;
        text-align: center;
        .hb_br {
          font-size: 30px;
          border: 2px solid #ffe2cb;
          // height: 45px;
          line-height: 45px;
          padding: 1px 20px;
          border-radius: 18px;
          font-weight: bold;
        }
        .hb_num {
          font-weight: 700;
          font-size: 40px;
        }
        .hb_nm {
          margin-top: 10px;
        }
        .topTip {
          position: absolute;
          top: -35px;
          left: 52%;
          font-size: 20px;
          font-weight: 500;
          background-image: linear-gradient(180deg, #fd3938 0%, #ff2b36 100%);
          border-radius: 10px 10px 10px 0;
          color: #fff;
          padding: 6px 12px;
          display: inline-block;
          white-space: nowrap;
          zoom: 0.8;
        }
      }
    }

    .zero {
      width: 85px;
      height: 27px;
      margin-left: 13px;
      //margin-top: 5px;
      background: url("~@/assets/images/newIndex/zeroNo.png") no-repeat;
      background-size: 100% auto;
    }

    .zeroOn {
      width: 148px;
      height: 31px;
      margin-left: 10px;
      //margin-top: 3px;
      background: url("~@/assets/images/newIndex/zeroOn.png") no-repeat;
      background-size: 100% auto;
      font-weight: 700;
      font-size: 18px;
      color: #985a17;
      padding-left: 31px;
      box-sizing: border-box;
      line-height: 33px;
    }

    .zeroBox {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.65);
      z-index: 999999999999;
      display: flex;
      align-items: center;
      justify-content: center;

      .box {
        width: 585px;
        height: 425px;
        background: #ffffff;
        border-radius: 25.2px;
        color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;

        .top {
          width: 100%;
          height: 91px;
          background: #eaf6ff;
          line-height: 103px;
          font-weight: 400;
          font-size: 38px;
          color: #1b7aee;
        }

        .text {
          width: 509px;
          height: 120px;
          margin-top: 46px;
          margin-bottom: 41px;
          text-align: center;
          line-height: 60px;
          font-weight: 400;
          font-size: 32px;
          color: #393939;
          font-family: PingFangSC-Regular;
        }

        .texts {
          width: 442px;
        }

        .btn {
          width: 100%;
          padding: 0 29px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          font-weight: 400;

          .left {
            width: 250px;
            height: 80px;
            border: 2px solid #1b7aee;
            border-radius: 55px;
            text-align: center;
            line-height: 80px;
            font-size: 36px;
            color: #1b7aee;
          }

          .right {
            width: 250px;
            height: 80px;
            background: #1b7aee;
            border-radius: 55px;
            text-align: center;
            line-height: 80px;
            font-size: 36px;
            color: #ffffff;
          }
        }
      }
    }
  }

  .body {
    width: 700px;
    margin: 152px auto 0;

    .rightsUp {
      width: 100%;
      background-image: linear-gradient(180deg, #fbeacb 0%, #f6f7fa 46%);
      box-shadow: 0 6px 8px 0 #e7e7e7;
      border-radius: 24px;
      border-radius: 24px;
      padding-bottom: 30px;
      .title {
        padding: 29px 0 20px 18px;

        .t1 {
          font-weight: 600;
          font-size: 34px;
          color: #1d1d1d;
        }

        .t2 {
          color: #999999;
          margin-left: 18px;
          font-size: 34px;
        }

        .t3 {
          font-size: 24px;
          color: #1d1d1d;
          margin-left: 18px;
        }
      }
        /deep/ .md-swiper-indicators{
          bottom: -20px !important;
        }
    }

    .last {
      position: relative;
      width: 103px;
      height: 464px;
      border-radius: 0 16px 16px 0;
      margin-left: -2px;
      overflow: hidden;
      img {
        object-fit: cover;
        object-position: top right;
      }
      .lefts1 {
        .icon {
          position: absolute;
          top: 95px;
          left: 0;
          width: 45px;
          height: 70px;
        }

        .icon2 {
          position: absolute;
          top: 239px;
          left: 0;
          width: 45px;
          height: 70px;
        }

        div:nth-of-type(1) {
          position: absolute;
          top: 175px;
          right: 28px;
          font-size: 24px;
          color: #393a3b;
          white-space: nowrap;
        }

        div:nth-of-type(2) {
          position: absolute;
          top: 210px;
          right: 25px;
          font-size: 20px;
          color: #a1a2a3;
          white-space: nowrap;
        }

        div:nth-of-type(3) {
          position: absolute;
          top: 311px;
          right: 23px;
          font-size: 24px;
          color: #393a3b;
          white-space: nowrap;
        }

        div:nth-of-type(4) {
          position: absolute;
          top: 345px;
          right: 28px;
          font-size: 20px;
          color: #a1a2a3;
          white-space: nowrap;
        }
      }
    }
    .swiper_wrap {
      display: flex;
      justify-content: space-around;
    }
    .insurance1 {
      width: 48.5%;
      background: #ffffff;
      box-shadow: 2px 2px 8px 0 #e2e3e6, inset 0 2px 1px 0 #ffffff80;
      border-radius: 16px;
      padding: 0 10px 20px;
      box-sizing: border-box;
      text-align: center;
      position: relative;
      .top_icon {
        width: 248px;
        height: 51px;
      }
      p:nth-of-type(1) {
        font-weight: 400;
        font-size: 24px;
        color: #9e735d;
        text-align: center;
      }

      p:nth-of-type(2) {
        font-weight: 300;
        font-size: 18px;
        color: #a1a2a3;
        text-align: center;
      }

      .rightsContent {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .wrights {
        width: 33.3%;
        margin-top: 18px;
        overflow: hidden;
        &:nth-child(4) {
          width: 45%;
        }
        &:nth-child(5) {
          width: 45%;
        }
        .wrightsImg {
          width: 68px;
          height: 68px;
          margin: 0 auto;
        }
        p:nth-of-type(1) {
          font-weight: 400;
          font-size: 20px;
          color: #393a3b;
          letter-spacing: 0.1px;
          text-align: center;
          // zoom: 0.9;
          margin-top: 15px;
          overflow: hidden;
          white-space: nowrap;
          // text-overflow: ellipsis;
        }
        p:nth-of-type(2) {
          font-weight: 400;
          font-size: 18px;
          color: #a1a2a3;
          letter-spacing: 0;
          text-align: center;
          // zoom: 0.9;
          margin-top: 6px;
          overflow: hidden;
          white-space: nowrap;
          zoom: .9;
        }
      }

      .btn {
        width: 192px;
        height: 46.08px;
        line-height: 46.08px;
        background-image: linear-gradient(
          90deg,
          #ffd9ba 8%,
          #fbb08d 100%,
          #fbb08d 100%
        );
        border-radius: 28px;
        margin: 30px auto 0;
        text-align: center;
        color: #632400;
        font-size: 22.46px;
        font-weight: 600;

        span {
          font-weight: 700;
          font-size: 34.56px;
        }
      }
      .subscript_class{
        width: 120px;
        position: absolute;
        bottom: 60px;
        right: 45px;
      }
    }

    .next {
      position: relative;
      width: 103px;
      height: 464px;
      border-radius: 16px 0 0 16px;
      img {
        object-fit: cover;
        object-position: top left;
      }
      .lefts1 {
        .icon {
          position: absolute;
          top: 95px;
          right: 0;
          width: 45px;
          height: 70px;
        }

        .icon2 {
          position: absolute;
          top: 239px;
          right: 0;
          width: 45px;
          height: 70px;
        }

        div:nth-of-type(1) {
          position: absolute;
          top: 175px;
          left: 28px;
          font-size: 24px;
          color: #393a3b;
          white-space: nowrap;
        }

        div:nth-of-type(2) {
          position: absolute;
          top: 210px;
          left: 25px;
          font-size: 20px;
          color: #a1a2a3;
          white-space: nowrap;
        }

        div:nth-of-type(3) {
          position: absolute;
          top: 311px;
          left: 23px;
          font-size: 24px;
          color: #393a3b;
          white-space: nowrap;
        }

        div:nth-of-type(4) {
          position: absolute;
          top: 345px;
          left: 28px;
          font-size: 20px;
          color: #a1a2a3;
          white-space: nowrap;
        }
      }
    }

    .adver1 {
      width: 702px;
      height: 172px;
      border-radius: 24px;
      margin: 24px 0;
    }
    .adver1 img {
      width: 700px;
      height: 172px;
    }

    .recommend {
      width: 702px;
      background: #ffffff;
      box-shadow: 0 2px 5px 0 #f5f5f5;
      border-radius: 24px;
      padding-bottom: 20px;
      .popularTitle {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 25px 20px 0px 23px;

        li:nth-child(1) {
          height: 42px;
          font-family: PingFangSC-Semibold;
          font-weight: Semibold;
          font-size: 30px;
          color: #333333;
          text-align: center;
          font-weight: 600;
        }

        li:nth-child(2) {
          width: 44px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .circle {
            display: inline-block;
            background: #333333;
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }

          .circle.big {
            width: 12px;
            height: 12px;
          }
        }
      }

      .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 10px;

        div {
          width: 330px;
          height: 118px;
          margin-top: 20px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .financeMarket {
      width: 702px;
      border-radius: 24px;
      background: url("../../assets/images/fortune_new/bg_2.png") no-repeat;
      background-size: 100% 130%;
      margin: 24px 0 10px 0;
      .title {
        padding: 29px 0 29px 18px;

        .t1 {
          font-weight: 600;
          font-size: 34px;
          color: #1d1d1d;
        }

        .t2 {
          color: #b1894e;
          margin-left: 18px;
          font-size: 34px;
        }

        .t3 {
          font-size: 24px;
          color: #b1894e;
          margin-left: 18px;
        }
      }

      .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        width: 100%;

        .q1 {
          position: relative;
          display: flex;
          width: 206px;
          height: 210px;
          background: #fff;
          border-radius: 10px;
          margin-bottom: 14px;
          background-size: 100%;
          img {
            width: 102px;
            height: 142px;
            margin: 18px 0 0 12px;
          }

          .details {
            margin: 20px 0 0 10px;

            p:nth-of-type(1) {
              font-weight: 600;
              font-size: 28px;
              color: #612704;
              letter-spacing: -1px;
            }

            p:nth-of-type(2) {
              font-weight: 500;
              font-size: 24px;
              color: #8c8c8c;
              margin-top: 16px;
            }

            p:nth-of-type(3) {
              font-weight: 500;
              font-size: 30px;
              color: #ef4034;
              margin-top: 56px;

              span {
                font-size: 22px;
              }
            }
          }

          .go {
            position: absolute;
            bottom: 22px;
            right: 5px;
            width: 63px;
            height: 28px;
            background: url("../../assets/images/fortune_new/GO.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .foot_card{
      width: 100%;
      height: 383px;
      background: url("../../assets/images/fortune_new/foot_card_bg.png")
          no-repeat;
      background-size: 100%;
      display: flex;
      margin-bottom: 43px;
      .card_item1{
        width: 50%;
        height: 383px;
        padding: 198px 0 32px 43px;
        box-sizing: border-box;
        p:nth-of-type(1){
          font-size: 20px;
          color: #858687;
        }
        p:nth-of-type(2){
          font-size: 18px;
          color: #B06742;
          margin-top: 18px;
          margin-bottom: 40px;
          span{
            background: #FFF3E6;
            padding: 2px 3px;
            margin-right: 10px;
          }
        }
         .btn1 {
            width: 112px;
            height: 41px;
            background: url("../../assets/images/fortune_new/btn1.png")
              no-repeat;
            background-size: 100% 100%;
          }
      }
      .card_item2{
        width: 50%;
        height: 383px;
        box-sizing: border-box;
        padding: 95px 0 32px 20px;
         p:nth-of-type(1){
          font-weight: 600;
          font-size: 26px;
          color: #B06742;
        }
        p:nth-of-type(2){
          font-size: 20px;
          color: #929292;
          margin-top: 18px;
          margin-bottom: 132px;
          span{
            background: #FFF3E6;
            padding: 2px 3px;
            margin-right: 10px;
          }
        }
         .btn2 {
            width: 112px;
            height: 41px;
            background: url("../../assets/images/fortune_new/btn2.png")
              no-repeat;
            background-size: 100% 100%;
          }
      }
    }
  }
}

.jbsmModel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);

  .cont {
    width: 500px;
    // height: 600px;
    border-radius: 20px;
    background: #fff;
    padding-bottom: 20px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      text-align: center;
      height: 80px;
      line-height: 80px;
      font-size: 36px;
      font-weight: 500;
      border-bottom: 1px solid #00aaee;
    }

    .text {
      min-height: 80px;
      // height: 380px;
      padding: 20px;
      overflow: auto;
      font-size: 26px;
      line-height: 40px;
      white-space: pre-line;
      word-break: break-all;
    }

    .btn {
      width: 300px;
      height: 60px;
      line-height: 60px;
      color: #fff;
      background: #00aaee;
      text-align: center;
      margin: 20px auto 0;
      font-size: 36px;
      border-radius: 20px;
    }
  }
}
.walletBegin_foot {
  text-align: center;
  img {
    width: 416px;
    height: 32px;
  }
  .problem {
    font-weight: 600;
    font-size: 0.22rem;
    color: #0098ff;
    letter-spacing: 0;
    margin-bottom: 0.56rem;
    margin-top: 0.2rem;
    text-decoration: underline;
  }
}
.flexbetween {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.juzhong {
  display: flex;
  justify-content: center;
}
.showModel {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.bigIndex {
  z-index: 10;
}
.zeroIndex {
  z-index: 1;
}
.weiyi {
  margin-left: -8px;
}
/deep/ .md-swiper-item {
  //padding-right: 2px;
}
.first_wrap {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100vh;
  z-index: 999;
  .first_one {
    position: absolute;
    top: 64px;
    left: 58px;
    img {
      width: 633px;
      height: 444px;
    }
    p {
      position: absolute;
      right: 150px;
      width: 207px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background: #fff;
      color: #000;
      border-radius: 35px;
      margin-top: 60px;
      font-size: 28px;
      font-weight: 500;
    }
  }
  .first_two {
    position: absolute;
    top: 64px;
    left: 58px;
    img {
      width: 648px;
      height: 360px;
    }
    p {
      position: absolute;
      left: 150px;
      width: 207px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background: #fff;
      color: #000;
      border-radius: 35px;
      margin-top: 60px;
      font-size: 28px;
      font-weight: 500;
    }
  }
  .first_three {
    position: absolute;
    top: 200px;
    left: 91px;
    img {
      width: 526px;
      height: 423px;
    }
    p {
      position: absolute;
      left: 120px;
      width: 207px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background: #fff;
      color: #000;
      border-radius: 35px;
      margin-top: 60px;
      font-size: 28px;
      font-weight: 500;
    }
  }
}
.b2cModel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);

  .cont {
    width: 562px;
    // height: 600px;
    border-radius: 20px;
    background: #fff;
    padding-bottom: 20px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    .title {
      text-align: center;
      height: 91px;
      line-height: 91px;
      font-size: 38px;
      background: #eaf6ff;
      border-radius: 20px 20px 0 0;
      color: #1b7aee;
    }

    .text {
      padding: 35px;
      font-size: 32px;
      color: #393939;
      letter-spacing: 1px;
      line-height: 58px;
    }
    .foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 35px;
      .btn {
        width: 230px;
        height: 80px;
        border: 2px solid #1b7aee;
        border-radius: 55px;
        font-size: 36px;
        color: #1b7aee;
        text-align: center;
        line-height: 80px;
      }
      .btnSubmit {
        width: 230px;
        height: 80px;
        background: #1b7aee;
        border-radius: 55px;
        font-size: 36px;
        color: #ffffff;
        text-align: center;
        line-height: 80px;
      }
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
  /deep/.md-swiper-indicator{
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    /deep/ .md-swiper-indicator-active{
      width: 16px;
      height: 8px;
      background: #636465;
      border-radius: 4px;
    }
</style>
