<template>
  <div>
    <div class="min_container" @scroll="scrollEvent">
      <div v-show="indexShow">
        <div class="newheader">
          <div
            class="account_sts"
            :style="{
              backgroundImage: `url(../fortuneCenter/static/images/home/tophead_${bgImgUrl}_bg.png)`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            <div @click="setInfo" class="config-btn" id="A02">设置</div>
            <div class="noaccount" v-if="openStatus == 0">
              <div>
                <span style="font-size:0.28rem">开通钱包账户</span><span  style="font-size:0.34rem">新客开户+首充话费 <i> 送20元</i></span>
              </div>
              <button @click="goopen" id="C01">去开户</button>
            </div>
            <div class="noaccount" v-if="openStatus == 1">
              <div>
                <span  style="font-size:0.28rem">开通钱包账户</span><span  style="font-size:0.34rem">新客开户+首充话费 <i> 送20元</i></span>
              </div>
              <button class="opening">开户中</button>
            </div>
            <div class="account-list" v-if="openStatus == 2">
              <div class="account-list-child">
                <div
                  class="myassets"
                  style="display: flex; color: #286de5; align-items: center"
                >
                  <span
                    style="
                      color: #286de5;
                      font-size: 0.36rem;
                      margin-left: 0.26rem;
                      margin-top: 0.22rem;
                    "
                    >我的钱包</span
                  >
                  <img
                    src="../../assets/images/wallet-icon9.png"
                    alt=""
                    @click="switchmoney"
                    style="
                      width: 0.32rem;
                      height: 0.32rem;
                      margin-top: 0.2rem;
                      margin-left: 0.15rem;
                    "
                  />
                   <div class="frozen_account" v-if="frozen" @touchstart="showFrozenTips"  @click="showFrozenTips">
                      <div class="cont">
                        <img src="../../assets/images/warn.png" />
                        <div  v-if="orgcode == 'spdb' || orgcode == 'SPDB'" class="scroll"><span v-for="k in 2" :key="k">您的钱包账户已冻结，请联系浦发银行处理</span></div>
                        <div  v-else class="scroll"><span v-for="k in 2" :key="k">您的钱包账户已冻结，请联系招商银行处理</span></div>
                      </div>
                      <div class="frozenModel" v-if="frozenTips">
                        <span v-if="orgcode == 'spdb' || orgcode == 'SPDB'">账户已冻结，请携带个人银行卡到浦发网点解除冻结</span>
                        <span v-else>账户已冻结，请登录招商银行手机银行APP，点击【银行卡】-【联名钱包】-【移动钱包】-【解除冻结】</span>
                      </div>
                    </div>
                </div>
                <ul class="wallet_info">
                  <li>
                    <div id="C02" @click="goBanlance">
                      <span>{{ balance }}</span
                      ><span>零钱</span>
                    </div>
                    <!-- 功能未开发，暂时隐藏 -->
                    <!-- <span class="no-stop" v-if="nostop">不停机</span> -->
                  </li>
                  <li @click="goBanks" id="C03">
                    <span>{{ banknum }}</span
                    ><span>银行卡</span>
                  </li>
                  <li @click="gochf">
                    <img
                      src="../../assets/images/icon10.png"
                      class="zdc"
                    /><span class="chf">话费自动充</span>
                  </li>
                  <!-- 功能未开发，暂时隐藏 -->
                  <!-- <li id="C04">
                                    <img src="../../assets/images/paycode.png" alt=""><span class="codetxt">付款码</span>
                                </li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="bxcs_tab">
          <div class="tab_title">
            <div
              class="
                md-example-child
                md-example-child-tabs
                md-example-child-tab-bar-0
              "
            >
              <md-tab-bar
                v-model="current"
                :items="tabitems"
                :id="tabid"
                @change="onChange"
              />
            </div>
            <div
              class="
                md-example-child
                md-example-child-scroll-view
                md-example-child-scroll-view-1
              "
            >
              <md-scroll-view
                ref="scrollView"
                :scrolling-y="false"
                :touch-angle="80"
                :is-prevent="false"
              >
                <div class="scroll-view-list" :style="{ width: listwd }">
                  <a
                    href="#"
                    v-for="(item, $index) in list"
                    :key="$index"
                    :id="item.id"
                    @click="goLink(item.linkUrl)"
                  >
                    <img :src="item.picUrl" alt="" class="scroll-view-item" />
                  </a>
                </div>
              </md-scroll-view>
            </div>
          </div>
          <div class="ad_news" v-if="adtxt.length > 0">
            <img :src="bgpic" class="bgpic" />
            <div id="ad_news">
              <div
                class="
                  md-example-child
                  md-example-child-swiper
                  md-example-child-swiper-1
                "
              >
                <md-swiper
                  :default-index="1"
                  :dragable="false"
                  :autoplay="5000"
                  :has-dots="false"
                  :is-prevent="false"
                  transition="slideY"
                >
                  <md-swiper-item :key="$index" v-for="(item, $index) in adtxt">
                    <a :href="item.linkUrl" class="banner-item" id="E01">{{
                      item.txt
                    }}</a>
                  </md-swiper-item>
                </md-swiper>
              </div>
            </div>
          </div>
          <div class="hotaction" v-if="hotactions.length > 0">
            <div class="jkbz_box">
              <p class="jkbz_title">热门推荐</p>
              <!-- <div class="jkbz_jump">
                        <a href="" id="F05">
                        <p class="jump_text" >更多</p>
                        <img src="../../assets/images/icon_arrow.png" class="img_jump" alt="">
                        </a>
                    </div> -->
            </div>
            <div class="hotactions">
              <div class="hotcontainer">
                <div
                  class="hotcontent"
                  v-for="(list, index) in hotactions"
                  :key="index"
                >
                  <a :href="list.linkUrl" :id="`F0${index + 1}`">
                    <div>
                      <p>{{ list.txt }}</p>
                      <p>{{ list.txt2 }}</p>
                    </div>
                    <img :src="list.picUrl" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- 轮播banner -->
          <div class="bd_banner" v-if="bannerList.length > 0">
            <div class="md-example-child md-example-child-swiper md-example-child-swiper-2">
                <md-swiper
                ref="swiper"
                :autoplay="5000"
                :is-prevent="false"
                :useNative-driver="false"
                >
                <md-swiper-item :key="$index" v-for="(item, $index) in bannerList">
                    <div class="banner-item"><a :href="item.linkUrl" :id="item.id"><img :src="item.picUrl" class="banner_img" alt=""></a></div>
                </md-swiper-item>
                </md-swiper>
            </div>
          </div>
          <!-- 轻松借钱 -->
          <div class="borrow-money" v-if="borrowMoney.length > 0">
            <div class="jkbz_box">
              <p class="jkbz_title">轻松借钱</p>
              <div class="jkbz_jump">
                <a
                  href="https://wap.js.10086.cn/ex/finance/dicp/temp/fawnFinance/html/bank.html"
                  id="H02"
                >
                  <p class="jump_text">更多</p>
                  <img
                    src="../../assets/images/icon_arrow.png"
                    class="img_jump"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div class="banner_money">
              <div
                class="
                  md-example-child
                  md-example-child-swiper
                  md-example-child-swiper-2
                "
              >
                <md-swiper :autoplay="5000" transition="fade" ref="swiper">
                  <md-swiper-item
                    :key="$index"
                    v-for="(item, $index) in borrowMoney"
                  >
                    <a :href="item.linkUrl" id="H01"
                      ><img :src="item.picUrl" class="banner_img" alt=""
                    /></a>
                  </md-swiper-item>
                </md-swiper>
              </div>
            </div>
          </div>
          <!-- 热门信用卡 (移动触点配置不了，暂时去掉)-->
          <!--<div class="hotcard">
                <div class="jkbz_box">
                    <p class="jkbz_title">热门信用卡</p>
                    <div class="jkbz_jump">
                        <p class="jump_text" >更多</p>
                        <img src="../../assets/images/icon_arrow.png" class="img_jump" alt="">
                    </div>
                </div>
                <div class="hotcard-list">
                    <div class="hotcard-list-info" v-for="(cardlist,index) in hotcards" :key="index">
                        <img :src="cardlist.picsrc" alt="" class="hotcard-img">
                        <div class="info">
                            <p>{{cardlist.title}}</p>
                            <p>{{cardlist.description}}</p>
                        </div>
                        <div class="apply">申请</div>
                    </div>
                </div>
            </div>-->
          <div>
            <!-- 1分抢购 -->
            <div class="sale_section">
              <div class="sale_container" v-if="saleList.length > 0">
                <div class="jkbz_box">
                  <p class="jkbz_title">吃货福利</p>
                  <div class="jkbz_jump">
                    <a
                      href="https://fintech.12580life.com/fintech-h5/tripartite/gdCatAuthorization?goods_id=gdmm_gdshouquan"
                      id="K05"
                    >
                      <p class="jump_text">更多</p>
                      <img
                        src="../../assets/images/icon_arrow.png"
                        class="img_jump"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div class="sale_product_list">
                  <div
                    class="sale_product"
                    v-for="(item, index) in saleList"
                    :key="index"
                  >
                    <a :href="item.linkUrl" :id="`K0${index + 1}`">
                      <img :src="item.picUrl" class="img_jump" alt="" />
                      <p style="text-decoration:line-through">{{ item.txt }}</p>
                      <p>{{ item.txt2 }}</p>
                    </a>
                  </div>
                </div>
              </div>
              <div class="sale_container" v-if="gdsList.length > 0">
                <div class="jkbz_box">
                  <p class="jkbz_title">9.9好货</p>
                  <div class="jkbz_jump">
                    <a
                      href="https://fintech.12580life.com/fintech-h5/tripartite/gdCatAuthorization?goods_id=gdmm_gdshouquan"
                      id="L05"
                    >
                      <p class="jump_text">更多</p>
                      <img
                        src="../../assets/images/icon_arrow.png"
                        class="img_jump"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div class="sale_product_list">
                  <div
                    class="sale_product"
                    v-for="(item, index) in gdsList"
                    :key="index"
                  >
                    <a :href="item.linkUrl" :id="`L0${index + 1}`">
                      <img :src="item.picUrl" class="img_jump" alt="" />
                      <p style="text-decoration:line-through">{{ item.txt }}</p>
                      <p>{{ item.txt2 }}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- 保险超市 -->
            <div class="sumarket" v-if="insmarketList.length > 0">
              <div class="jkbz_box" style="margin-bottom: 0">
                <p class="jkbz_title">保险超市</p>
                <div class="jkbz_jump">
                  <a
                    href="https://wap.js.10086.cn/ex/finance/dicp/temp/insuranceSumarket/html/index.html?rm=ydc"
                    id="I01"
                  >
                    <p class="jump_text">更多</p>
                    <img
                      src="../../assets/images/icon_arrow.png"
                      class="img_jump"
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div class="market_tab">
                <div class="tab_title">
                  <div
                    class="
                      md-example-child
                      md-example-child-tabs
                      md-example-child-tab-bar-0
                    "
                  >
                    <md-tab-bar
                      v-model="currentmarket"
                      :items="marketitems"
                      :id="marketid"
                      @change="bxChange"
                    />
                  </div>
                </div>
                <div class="tab_list">
                  <div
                    class="tab_insurance"
                    v-for="(list, index) in insmarketList"
                    :key="index"
                  >
                    <a :href="list.linkUrl" :id="list.id">
                      <img :src="list.picUrl" class="tab_img" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- 金融百科 -->
            <div class="wallet_article" v-if="articleList.length > 0">
              <div class="jkbz_box">
                <p class="jkbz_title">金融百科</p>
              </div>
              <div class="wallet_article_list" :style="showall">
                <div
                  class="wallet_articles"
                  v-for="(item, index) in articleList"
                  :key="index"
                >
                  <a :href="item.linkUrl" :id="`M0${index + 1}`">
                    <img :src="item.picUrl" alt="" />
                    <div>
                      <p>{{ item.txt }}</p>
                      <p>{{ item.txt2 }}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- 金融百科 -->
          <div class="wallet_article" v-if="articleList.length > 0">
            <div class="jkbz_box">
              <p class="jkbz_title">金融百科</p>
            </div>
            <div class="wallet_article_list" :style="showall">
              <div
                class="wallet_articles"
                v-for="(item, index) in articleList"
                :key="index"
              >
                <a :href="item.linkUrl" :id="`M0${index + 1}`">
                  <img :src="item.picUrl" alt="" />
                  <div>
                    <p>{{ item.txt }}</p>
                    <p>{{ item.txt2 }}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="lazy_load">
            <div class="up_box" v-if="loadopt">
              <div class="flzq_up" v-if="loadup">
                <p class="up_slide">上滑加载</p>
              </div>
              <div class="load_box" v-if="loadpic">
                <p class="loading"></p>
              </div>
            </div>
          </div>
          <p class="wallet_title">移动钱包</p>
        </div>
      </div>
      <!-- 我的 -->
      <openan-account
        v-show="!indexShow"
        :citycode="citycode"
        :usrmobile="usrmobile"
        :useraccsts="useraccsts"
        :mobVersion="mobVersion"
        :hasaccount="hasaccount"
        :orgcode="orgcode"
        :fromPage="fromPage"
        @getmyBanks="myBanks = $event"
      ></openan-account>
      <!-- 背景 -->
      <div class="skeleton" v-if="defalutPopupShow">
        <img src="@/assets/images/skeleton.jpg" alt="" />
      </div>
      <!-- 设置默认卡 -->
       <md-popup v-model="defalutPopupShow">
        <div
        class="md-example-popup md-example-popup-center gotoSetLoose"
      >
      <div class="loseTitle">提示</div>
        <p>
          为了确保您的支付体验， 请先设置零钱账户~
        </p>
        <md-button type="default" size="small" @click="setDefaultBank()"
          >去设置</md-button
        >
      </div>
    </md-popup>
    <!-- 码店-钱包已开户/正在开户，弹框关闭页面 -->
    <div v-if="madinModel" class="madinCloseBg skeleton">
      <md-popup v-model="madinModel">
        <div class="md-example-popup md-example-popup-center gotoSetLoose">
          <div class="loseTitle">提示</div>
          <div class="cont">
            <p>{{openStatus == 2 ? madinTxt_1 : madinTxt_2}}</p>
            <md-button type="default" size="small" @click="closePage">知道了</md-button>
          </div>
        </div>
      </md-popup>
    </div>
      <div
        v-if="isShowBottomBtn"
        class="
          md-example-child md-example-child-tabs md-example-child-tab-bar-4
          navigation
        "
      >
        <md-tab-bar
          class="bottomTab"
          v-model="current"
          :items="items"
          :has-ink="false"
          @change="onTabChange"
        >
          <template slot="item" slot-scope="{ item }">
            <div class="custom-item">
              <div class="icon">
                <md-icon :name="item.icon" />
              </div>
              <div class="text">
                <span v-text="item.label"></span>
              </div>
            </div>
          </template>
        </md-tab-bar>
      </div>
    </div>
    <!-- 计时图标 -->
    <div v-if="readStatusModel">
      <read-status :icon="iconSrc" :time = "readStatusTime" :isFinish="isFinish" @receive="getReward"></read-status>
    </div>
  </div>
</template>

<script src="@/common/jquery.min.js"></script>
<script>
//
// import { Field, Icon } from 'mand-mobile';
import api from '@/common/apiUrls';
import axios from 'axios';
import qs from 'qs';
import { getCookie } from '@/common/cookie';
// import store from '@/common/localstore';
// import InputWithValidation from '@/components/InputWithValidation';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import pic1 from '@/assets/images/welfare-1.png';
import pic2 from '@/assets/images/adnews.png';
import * as store2 from '@/common/localstore';
import {
    Swiper, SwiperItem, ScrollView, TabBar
} from 'mand-mobile';
import readStatus from '@/components/ReadStatus.vue';
import icon from '@/assets/images/pv_woman.png';
import OpenanAccount from '../myPage/openanAccount.vue';

export default {
    name: 'index',
    components: {
        [Swiper.name]: Swiper,
        [SwiperItem.name]: SwiperItem,
        [ScrollView.name]: ScrollView,
        [TabBar.name]: TabBar,
        OpenanAccount,
        readStatus
    },
    data() {
        return {
            current: 1,
            items: [
                { name: 1, label: '首页', icon: 'home' },
                { name: 2, label: '我的', icon: 'user' }
            ],
            indexShow: true,
            myShow: false,
            bannerList: [],
            list: [],
            alltablists: [],
            adtxt: [],
            hotactions: [],
            borrowMoney: [],
            zijibx: [],
            fumubx: [],
            zinvbx: [],
            insmarketList: [],
            hotcards: [
                {
                    title: '广发小黄鸭卡',
                    description: '首刷享开卡礼',
                    picsrc: pic1
                },
                {
                    title: '广发小黄鸭卡',
                    description: '首刷享开卡礼',
                    picsrc: pic1
                },
                {
                    title: '广发小黄鸭卡',
                    description: '首刷享开卡礼',
                    picsrc: pic1
                }
            ],
            saleList: [],
            gdsList: [],
            articleList: [],
            hasaccount: false,
            noopened: true,
            openStatus: '4', // 开户状态0未开户1开户中2已开户
            opensts: '去开户',
            frozen: false,
            current: 1,
            bgpic: pic2,
            more_show: true,
            loading: false,
            switchflag: false,
            balance: '0.00',
            lastbalance: '0.00',
            nostop: true,
            banknum: '0',
            channelCode: '', // 渠道编码
            mobVersion: '', // 版本号
            citycode: '14', // 地区编码
            usrmobile: '',
            orgcode: '',
            loadopt: true,
            loadup: true,
            loadpic: false,
            showall: {
                overflow: 'hidden',
                height: '4.4rem'
            },
            listwd: '1900px',
            bgImgUrl: '2',
            tabitems: [],
            currentmarket: 1,
            marketid: 'I02',
            tabid: 'D01',
            marketitems: [],
            typeid: '10010', // 渠道号
            touchArr: [
                {
                    id: 'A01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_A01'
                },
                {
                    id: 'A02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_A02'
                },
                {
                    id: 'B01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_B01'
                },
                {
                    id: 'B02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_B02'
                },
                {
                    id: 'B03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_B03'
                },
                {
                    id: 'B04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_B04'
                },
                {
                    id: 'B05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_B05'
                },
                {
                    id: 'C01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_C01'
                },
                {
                    id: 'C02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_C02'
                },
                {
                    id: 'C03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_C03'
                },
                {
                    id: 'C04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_C04'
                },
                {
                    id: 'D01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D01'
                },
                {
                    id: 'D02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D02'
                },
                {
                    id: 'D03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D03'
                },
                {
                    id: 'D04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D04'
                },
                {
                    id: 'D05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D05'
                },
                {
                    id: 'D06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D06'
                },
                {
                    id: 'D07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D07'
                },
                {
                    id: 'D08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D08'
                },
                {
                    id: 'D09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D09'
                },
                {
                    id: 'D10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D10'
                },
                {
                    id: 'D11',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D11'
                },
                {
                    id: 'D12',
                    touchCode: 'WAP_T_FORTUNE_CENTER_D12'
                },
                {
                    id: 'E01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_E01'
                },
                {
                    id: 'F01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_F01'
                },
                {
                    id: 'F02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_F02'
                },
                {
                    id: 'F03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_F03'
                },
                {
                    id: 'F04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_F04'
                },
                {
                    id: 'F05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_F05'
                },
                {
                    id: 'G01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_G01'
                },
                {
                    id: 'G02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_G02'
                },
                {
                    id: 'G03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_G03'
                },
                {
                    id: 'G04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_G04'
                },
                {
                    id: 'G05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_G05'
                },
                {
                    id: 'H01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_H01'
                },
                {
                    id: 'H02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_H02'
                },
                {
                    id: 'I01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I01'
                },
                {
                    id: 'I02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I02'
                },
                {
                    id: 'I03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I03'
                },
                {
                    id: 'I04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I04'
                },
                {
                    id: 'I05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I05'
                },
                {
                    id: 'I06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I06'
                },
                {
                    id: 'I07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I07'
                },
                {
                    id: 'I08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I08'
                },
                {
                    id: 'I09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I09'
                },
                {
                    id: 'I10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I10'
                },
                {
                    id: 'I11',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I11'
                },
                {
                    id: 'I12',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I12'
                },
                {
                    id: 'I13',
                    touchCode: 'WAP_T_FORTUNE_CENTER_I13'
                },
                {
                    id: 'J01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_J01'
                },
                {
                    id: 'J02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_J02'
                },
                {
                    id: 'J03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_J03'
                },
                {
                    id: 'J04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_J04'
                },
                {
                    id: 'K01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_K01'
                },
                {
                    id: 'K02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_K02'
                },
                {
                    id: 'K03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_K03'
                },
                {
                    id: 'K04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_K04'
                },
                {
                    id: 'K05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_K05'
                },
                {
                    id: 'L01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_L01'
                },
                {
                    id: 'L02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_L02'
                },
                {
                    id: 'L03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_L03'
                },
                {
                    id: 'L04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_L04'
                },
                {
                    id: 'L05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_L05'
                },
                {
                    id: 'M01',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M01'
                },
                {
                    id: 'M02',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M02'
                },
                {
                    id: 'M03',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M03'
                },
                {
                    id: 'M04',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M04'
                },
                {
                    id: 'M05',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M05'
                },
                {
                    id: 'M06',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M06'
                },
                {
                    id: 'M07',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M07'
                },
                {
                    id: 'M08',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M08'
                },
                {
                    id: 'M09',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M09'
                },
                {
                    id: 'M10',
                    touchCode: 'WAP_T_FORTUNE_CENTER_M10'
                }
            ],
            isdefloose: '',
            defalutPopupShow: false,
            clickBank: '',
            myBanks: [],
            useraccsts: '',
            fxmobile: '',
            madinModel: false,
            madinTxt_1: '您已存在移动钱包账户，无法再次开通哦~',
            madinTxt_2: '您的移动钱包账户正在开通中，请耐心等待哦~',
            noOpenCondition: false, // 是否具备话费宝开通条件
            noLh: false,
            iconSrc: icon,
            readStatusModel: false,
            isFinish:false,
            readStatusTime: 0,
            timeItem: null,
            frozenTips:false, //冻结是否显示提示
            isShowBottomBtn:true, //是否显示底部切换按钮
            fromPage:''
        };
    },
    mounted() {
        // 根据地址，判断是否显示我的页面
        const url = window.location.href;
        const list = url.split('?')[1].split('&');
        list.forEach((item) => {
            if (item.split('=')[0] === 'mypage' && item.split('=')[1]) {
                this.indexShow = false;
                this.myShow = true;
                this.$route.meta.title = '银行卡';
                document.title = '银行卡';
                this.isShowBottomBtn = false;
            }
        });
        if (this.$route.query.myShow) {
            this.indexShow = false;
        }
        // 结束
        document.body.style.backgroundColor = '#f9fafb';
        window.triggerSwiper3 = () => {
            this.goto();
        };
        // 浮标计时
        if(window.sessionStorage.getItem('isFinish') === true){
          this.isFinish = window.sessionStorage.getItem('isFinish');
          this.readStatusTime = 15;
        }
        if(this.$route.query.channel === 'cmrh'){  //判断是否是仁和跳转过来
          this.readStatusModel = true;
          if (window.sessionStorage.getItem('time') && window.sessionStorage.getItem('time') !== 'NaN') {
            // eslint-disable-next-line radix
            this.readStatusTime = parseInt(window.sessionStorage.getItem('time'));
          }
          this.timeItem = setInterval(() => {
              if (this.readStatusTime > 14) {
                  clearInterval(this.timeItem);
              } else {
                  this.readStatusTime = this.readStatusTime + 1;
                  window.sessionStorage.setItem('time', this.readStatusTime);
              }
          }, 1000);
          window.onbeforeunload =  () => {
            window.sessionStorage.setItem('time', this.readStatusTime);
            clearInterval(t);
          };
        }
        // 是否是从卡证中心跳转过来
        if(this.$route.query.fromPage){
          this.fromPage = this.$route.query.fromPage
        }

    },
    created() {
        if (this.$route.query.typeId) {
            this.typeid = this.$route.query.typeId;
            this.fxmobile = this.$route.query.fxmobile;
        }
        if(this.$route.query.typeId === 'madian' && this.$route.query.jobNumber){
            store2.default.set('madianJobNum', this.$route.query.jobNumber);
            store2.default.set('madianUserbusiNum', '2100000029');
        }
        this.usrmobile = store2.default.get('usrmob');
        this.getParams();
        this.initData();
        initPageJs(this.$route.meta.pageName, this.touchArr);
        // this.getIndexData();
    },
    methods: {
        closeDefaultPopup() {
            this.defalutPopupShow = false;
        },
        setDefaultBank() {
            this.$router.push({ name: 'looseChange' });
        },
        onTabChange(index) {
            if (index.label == '首页') {
                this.indexShow = true;
                this.myShow = false;
                this.$route.meta.title = '财富中心';
                document.title = '财富中心';
            } else if (index.label == '我的') {
                this.indexShow = false;
                this.myShow = true;
                this.$route.meta.title = '银行卡';
                document.title = '银行卡';
            }
        },
        initData() {
            // 查询账户信息
            api
                .queryOpenAccount()
                .then((data) => {
                    this.useraccsts = data.accsts;
                    // accsts:00 未开户，01正常，02销户，03冻结，04开户中，09开户失败，10本地解约
                    // 签约关系state:0不存在，1存在（判断身份证存不存在，不存在就是没开户，存在就判断登录手机号与接口返回的手机号是否一样，一样的就走去签约，手机号不一样就去换绑）；2开户中
                    if (data.state === '0') {
                        if (data.accsts === '04') {
                            // 开户中
                            this.opensts = '开户中';
                            this.hasaccount = true;
                            this.openStatus = '1';
                            this.bgImgUrl = '2';
                            store2.default.set('hasaccount', true);
                        } else if(data.accsts === '03'){
                            // 已冻结
                            this.orgcode = data.orgcode;
                            this.noopened = false;
                            this.frozen = true;
                            this.openStatus = '2';
                            this.bgImgUrl = '1';
                        }else {
                            // 未开户
                            this.opensts = '未开户';
                            this.hasaccount = false;
                            this.openStatus = '0';
                            this.bgImgUrl = '2';
                            store2.default.set('hasaccount', false);
                        }
                    } else if (data.state === '1') {
                        if (data.accsts === '00') {
                            // 未开户
                            this.opensts = '未开户';
                            this.hasaccount = false;
                            this.openStatus = '0';
                            this.bgImgUrl = '2';
                            store2.default.set('hasaccount', false);
                        } else if (data.accsts === '01') {
                            // 已开户
                            this.noopened = false;
                            this.openStatus = '2';
                            this.hasaccount = true;
                            this.bgImgUrl = '1';
                            this.orgcode = data.orgcode;
                            store2.default.set('hasaccount', true);
                        } else if (data.accsts === '03') {
                            // 已冻结
                            this.orgcode = data.orgcode;
                            this.noopened = false;
                            this.frozen = true;
                            this.openStatus = '2';
                            this.bgImgUrl = '1';
                        } else if (data.accsts === '04') {
                            // 开户中
                            this.opensts = '开户中';
                            this.hasaccount = true;
                            this.openStatus = '1';
                            this.bgImgUrl = '2';
                        } else if (data.accsts === '09') {
                            // 未开户
                            this.opensts = '未开户';
                            this.hasaccount = false;
                            this.openStatus = '0';
                            this.bgImgUrl = '2';
                            store2.default.set('hasaccount', false);
                        }
                    }
                    if (data.balanceamt) {
                        this.balance = data.balanceamt;
                        this.lastbalance = data.balanceamt;
                    }
                    if (data.balanceamt === '0.00') {
                        this.nostop = true;
                    }
                    if (data.bankNum) {
                        this.banknum = data.bankNum;
                    }
                    if (data.lastSixId) {
                        store2.default.set('lastsixid', data.lastSixId);
                    }else{
                        store2.default.set('lastsixid', '');
                    }
                    if (data.userCode) {
                        store2.default.set('firstfourid', data.userCode.slice(0, 4));
                    }
                    if (data.fullCrpName) {
                        store2.default.set('nickname', data.fullCrpName);
                    }
                    if (data.crpName) {
                        store2.default.set('crpName', data.crpName);
                    }
                    store2.default.set('usrmob', data.usrid);
                    this.usrmobile = data.usrid;
                    this.citycode = data.cityCode;
                    this.getIndexData();
                    // 判断是否是码店
                    if (this.typeid === 'madian' && this.openStatus !== '0' && this.openStatus !== 0) {
                        this.madinModel = true;
                    } else {
                        this.madinModel = false;
                    }
                })
                .catch((err) => {
                    console.log(err.msgInfo);
                    // this.$toast.info(err.msgInfo);
                    if (err.cityCode) {
                        this.citycode = err.cityCode;
                    }
                    this.getIndexData();
                });
        },
        getParams() {
            // 获取渠道编码
            const u = navigator.userAgent;
            let version = '';
            if (u.indexOf('Mac OS X') > -1) {
                // ios
                const regStrsaf = /OS [\d._]*/gi;
                let verinfo = u.match(regStrsaf);
                verinfo = `${verinfo}''`.replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
                version = `IOS${verinfo}`;
                this.channelCode = 'IOS';
            } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                // android
                const andstr = u.substr(
                    u.indexOf('Android') + 8,
                    u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8
                );
                version = `Android${andstr}`;
                this.channelCode = 'ANDROID';
            } else if (u.indexOf('BB10') > -1) {
                // 黑莓bb10系统
                const berry = u.substr(
                    u.indexOf('BB10') + 5,
                    u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5
                );
                version = `blackberry${berry}`;
                this.channelCode = 'ANDROID';
            } else if (u.indexOf('IEMobile') > -1) {
                // windows phone
                const windowphone = u.substr(
                    u.indexOf('IEMobile') + 9,
                    u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9
                );
                version = `winphone${windowphone}`;
            } else {
                const userAgent = navigator.userAgent.toLowerCase();
                if (userAgent.indexOf('windows nt 5.0') > -1) {
                    version = 'Windows 2000';
                } else if (
                    userAgent.indexOf('windows nt 5.1') > -1
          || userAgent.indexOf('windows nt 5.2') > -1
                ) {
                    version = 'Windows XP';
                } else if (userAgent.indexOf('windows nt 6.0') > -1) {
                    version = 'Windows Vista';
                } else if (
                    userAgent.indexOf('windows nt 6.1') > -1
          || userAgent.indexOf('windows 7') > -1
                ) {
                    version = 'Windows 7';
                } else if (
                    userAgent.indexOf('windows nt 6.2') > -1
          || userAgent.indexOf('windows 8') > -1
                ) {
                    version = 'Windows 8';
                } else if (userAgent.indexOf('windows nt 6.3') > -1) {
                    version = 'Windows 8.1';
                } else if (
                    userAgent.indexOf('windows nt 6.2') > -1
          || userAgent.indexOf('windows nt 10.0') > -1
                ) {
                    version = 'Windows 10';
                } else {
                    version = 'Unknown';
                }
                this.channelCode = 'WAP';
            }
            this.mobVersion = version;

        },
        // 零钱开关
        switchmoney() {
            if (this.switchflag) {
                this.balance = this.lastbalance;
            } else {
                this.balance = '******';
            }
            this.switchflag = !this.switchflag;
        },
        // 返回
        clickLeft() {
            if (this.$listeners.clickLeft) {
                this.$emit('clickLeft');
            } else {
                this.$router.go(-1);
            }
        },
        // 设置
        setInfo() {
            let jyparam = '';
            let pfparam = '';
            let bankOrgCode = this.myBanks.map((bank) => bank.orgCode);
            if (this.hasaccount) {
                jyparam = '1';
                pfparam = this.orgcode;
            } else {
                jyparam = '0';
            }

            this.$router.push({
                name: 'basicInfo',
                query: {
                    jyparams: jyparam,
                    pfparams: pfparam,
                    banks:bankOrgCode.join(','),
                    isShowSet: this.myBanks.length > 0 ? '01' : '02'
                }
            });
        },
        goBanlance() {
            this.$router.push({
                name: 'pockets'
            });
        },
        goBanks() {
            this.$router.push({
                name: 'myBanks'
            });
        },
        gochf() {
            window.location.href = 'https://wap.js.10086.cn/vw/QBYCZ';
        },
        // 获取首页数据
        getIndexData() {
            const postDatas = {
                channelNum: 'WAP', // this.channelCode
                regionNum: this.citycode, // this.citycode
                pageNum: 'CFZX',
                mobileNum: this.usrmobile, // this.usrmobile
                version: this.mobVersion // this.mobVersion
            };
            axios({
                method: 'post',
                url: 'https://wap.js.10086.cn/jsmccClient/cd/market_content/api/v1/market_content.page.query', // 路径
                data: postDatas,
                transformRequest: [
                    function (data) {
                        let ret = '';
                        ret = qs.stringify(data);
                        return ret;
                    }
                ],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                   if (res.data.retcode === '0') {
                        const datas = res.data.retobj;
                        const tabdatas = [];
                        const tabpics = [];

                        for (let i = 0; i < datas.length;i++) {
                            if (datas[i].contactNum === 'CFZXTJTABMC_W') {
                                for (let v = 0; v < datas[i].content.length; v += 1) {
                                    const m = v + 1;
                                    tabdatas.push({
                                        name: v + 1,
                                        label: datas[i].content[v].txt,
                                        contentNum: datas[i].content[v].contentNum,
                                        endTime: datas[i].content[v].endTime,
                                        insertCode: datas[i].content[v].insertCode,
                                        id: `D0${m}`
                                    });
                                }
                                this.tabitems = tabdatas;
                            }
                        }

                        for (let i = 0; i < datas.length;i++) {
                            // tab切换图片
                            const imgarr = [];
                            if (datas[i].contactNum === 'CFZXTJTABK_W') {
                                for (let a = 0; a < datas[i].content.length; a += 1) {
                                    const b = a + 4;
                                    datas[i].content[a].id = `D0${b}`;
                                    imgarr.push(datas[i].content[a]);
                                    if (
                                        datas[i].content[a].contentName.indexOf(
                                            tabdatas[0].label
                                        ) !== -1
                                    ) {
                                        tabpics.push(datas[i].content[a]);
                                    }
                                }
                                this.list = tabpics;
                                // let totalwd = tabpics.length * 231;
                                let totalwd = tabpics.length * 462;
                                totalwd = `${totalwd}px`;
                                this.listwd = totalwd;
                                this.alltablists = imgarr;
                            }
                            // 广告
                            if (datas[i].contactNum === 'CFZXJRZSTJW_W') {
                                this.adtxt = datas[i].content;
                            }
                            // 热门推荐
                            if (datas[i].contactNum === 'CFZXRMTJW_W') {
                                this.hotactions = datas[i].content;
                            }
                            // 保险超市tab
                            const bxabs = [];
                            if (datas[i].contactNum === 'CFZXBXCSTAB_W') {
                                for (let w = 0; w < datas[i].content.length; w += 1) {
                                    const r = w + 1;
                                    bxabs.push({
                                        name: w + 1,
                                        label: datas[i].content[w].contentName,
                                        id: `I0${r}`
                                    });
                                }
                                this.marketitems = bxabs;
                            }
                            // 自己保险
                            const zjarr = [];
                            if (datas[i].contactNum === 'CFZXJKBZLCTABYGZJPO_W') {
                                for (let j = 0; j < datas[i].content.length; j += 1) {
                                    const a = j + 5;
                                    datas[i].content[j].id = `I0${a}`;
                                    zjarr.push(datas[i].content[j]);
                                }
                                this.zijibx = zjarr;
                                this.insmarketList = zjarr;
                            }
                            // 父母保险
                            const fmarr = [];
                            if (datas[i].contactNum === 'CFZXJKBZLCTABSGFM_W') {
                                for (let j = 0; j < datas[i].content.length; j += 1) {
                                    const a = j + 8;
                                    datas[i].content[j].id = `I0${a}`;
                                    fmarr.push(datas[i].content[j]);
                                }
                                this.fumubx = fmarr;
                            }
                            // 子女保险
                            const znarr = [];
                            if (datas[i].contactNum === 'CFZXJKBZLCTABEGZN_W') {
                                for (let j = 0; j < datas[i].content.length; j += 1) {
                                    const a = j + 11;
                                    datas[i].content[j].id = `I${a}`;
                                    znarr.push(datas[i].content[j]);
                                }
                                this.zinvbx = znarr;
                            }
                            // 轮播图
                            const bannerarr = [];
                            if (datas[i].contactNum === 'CFZXZBGGW_W') {
                                for (let j = 0; j < datas[i].content.length; j += 1) {
                                    const a = j + 1;
                                    datas[i].content[j].id = `G0${a}`;
                                    bannerarr.push(datas[i].content[j]);
                                }
                                this.bannerList = bannerarr;
                            }
                            // 轻松借钱
                            if (datas[i].contactNum === 'CFZXQSJQ_W') {
                                this.borrowMoney = datas[i].content;
                            }
                            // 一分抢购
                            if (datas[i].contactNum === 'CFZXYFQG_W') {
                                this.saleList = datas[i].content;
                            }
                            // 9.9好货
                            if (datas[i].contactNum === 'CFZXJDJHH_W') {
                                this.gdsList = datas[i].content;
                            }
                            // 金融百科
                            if (datas[i].contactNum === 'CFZXJRBK_W') {
                                this.articleList = datas[i].content;
                                if (datas[i].content.length <= 2) {
                                    this.loadopt = false;
                                }
                            }
                        }
                    }
                })
                .catch(() => {});
        },
        // 保险超市切换
        bxChange(item) {
            if (item.label === '给父母') {
                this.insmarketList = this.fumubx;
                this.marketid = 'I03';
            } else if (item.label === '给子女') {
                this.insmarketList = this.zinvbx;
                this.marketid = 'I04';
            } else {
                this.insmarketList = this.zijibx;
                this.marketid = 'I02';
            }
        },
        scrollEvent(eve) {
            const that = this;
            if (
                eve.srcElement.scrollTop + eve.srcElement.offsetHeight
        > eve.srcElement.scrollHeight - 100
            ) {
                this.loadup = false;
                this.loadpic = true;
                setTimeout(() => {
                    that.loadopt = false;
                    that.showall = {
                        overflow: 'inherit',
                        height: 'inherit'
                    };
                }, 1000);
            }
        },
        // 借钱专属福利切换
        onChange(item) {
            const tabpic = [];
            this.alltablists.forEach((i) => {
                if (i.contentName.indexOf(item.label) !== -1) {
                    tabpic.push(i);
                }
            });
            this.tabid = item.id;
            this.list = tabpic;
        },
        // 保险超市切换
        bxChange(item) {
            if (item.label === '给父母') {
                this.insmarketList = this.fumubx;
                this.marketid = 'I03';
            } else if (item.label === '给子女') {
                this.insmarketList = this.zinvbx;
                this.marketid = 'I04';
            } else {
                this.insmarketList = this.zijibx;
                this.marketid = 'I02';
            }
        },
        scrollEvent(eve) {
            const that = this;
            if (
                eve.srcElement.scrollTop + eve.srcElement.offsetHeight
        > eve.srcElement.scrollHeight - 100
            ) {
                this.loadup = false;
                this.loadpic = true;
                setTimeout(() => {
                    that.loadopt = false;
                    that.showall = {
                        overflow: 'inherit',
                        height: 'inherit'
                    };
                }, 1000);
            }
        },
        goto() {
            this.$refs.swiper.goto(2);
        },
        goopen() {
            if (this.myBanks.length === 1 && this.myBanks[0].defaultAccFlg === '00') {
                this.defalutPopupShow = true;
                return;
            }
            if (!this.hasaccount) {
                this.$router.push({
                    name: 'walletAccount',
                    query: {
                        typeId: this.typeid,
                        fxmobile: this.fxmobile
                    }
                });
            } else {
                this.$router.push({
                    name: 'walletOpenAccResult'
                });
            }
        },
         goLink(linkUrl) {
             window.location.href = linkUrl;
            // if (linkUrl.indexOf('telephoneCharges/description') > -1) {
            //     window.location.href = window.location.href.replace('index', 'telephoneCharges/description');
            // } else {
            //     window.location.href = linkUrl;
            // }
        },
        // 码店关闭跳转页面
        closePage() {
            let url = window.location.href.split('?')[0];
            const list = window.location.href.split('?')[1].split('&');
            list.forEach((item) => {
                if (item.indexOf('tokenid') !== -1) {
                    url += `?${item}`;
                }
            });
            window.location.href = url;
        },
        // 计时结束 - 点击获取奖励
        getReward() {
          const cmtokenid = getCookie('cmtokenid');
          // pagetokenid测试环境测试用，生产换成cmtokenid
          let pagetokenid = this.getQueryString('tokenid');
          let loginToken;
          if (cmtokenid != null && cmtokenid !== '') {
            loginToken = cmtokenid;
          } else if (pagetokenid != null && pagetokenid !== '') {
            loginToken = pagetokenid;
          }
          api.renheLogin({tokenId: loginToken}).then((res) => {
                api.addPolicy({mobileNo: this.usrmobile}).then((res) => {
                  this.isFinish = true;
                  this.$toast.info('领取奖励成功');
                   window.sessionStorage.setItem('isFinish', true);
                }).catch((err) => {
                  this.$toast.info(err.msgInfo);
                })
          }).catch((err) => {
            this.$toast.info(err.msgInfo);
          })

        },
        getQueryString(name) {
          const reg = `(^|&)${name}=([^&]*)(&|$)`;
          const r = window.location.search.substr(1).match(reg);
          if (r != null) return unescape(r[2]);
          return null;
        },
        // 冻结状态-显示提示
        showFrozenTips(){
          this.frozenTips = true;
          setTimeout(() => {
            this.frozenTips = false
          },3000)
        }
    },
    beforeRouteLeave (to, from, next) {
      if(this.readStatusTime > 0){
        window.sessionStorage.setItem('time', this.readStatusTime);
        clearInterval(this.timeItem);
      }
      next()
    }
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
.config-btn {
  position: absolute;
  right: 0.2rem;
  padding: 20px;
  font-size: 30px;
  color: #286de5;
}
.newheader {
  width: 100%;
  // height:3.5rem;
  height: 3.07rem;
  background: url(../../assets/images/bg.png) no-repeat;
  background-size: contain;
  position: relative;
  .header {
    position: relative;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .arrowIco {
      display: block !important;
      font-size: 0.4rem;
      margin-left: 0.4rem;
      font-weight: 700;
    }
    span {
      font-size: 0.36rem;
    }
    span:nth-of-type(2) {
      font-size: 0.3rem;
      margin-right: 0.4rem;
    }
  }
  .account_sts {
    width: 6.65rem;
    height: 2.64rem;
    // background:url(../../assets/images/tophead.png);
    background-repeat: no-repeat;
    margin: 0 auto;
    background-size: contain;
    position: absolute;
    left: 0.425rem;
    bottom: -0.03rem;
    .noaccount {
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        flex-direction: column;
        margin-top: 0.5rem;
        margin-left: 0.4rem;
        span {
          color: #2b70e7;
          font-weight: 600;
          font-size: 0.4rem;
          i {
            color: #eb8700;
          }
        }
        span:nth-of-type(1) {
          font-size: 0.3rem;
          padding-bottom: 0.2rem;
          font-weight: 400;
        }
      }
      button {
        color: #009dff;
        background: #fff;
        width: 1.73rem;
        height: 0.64rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 0.3rem;
        margin-top: 0.9rem;
        margin-right: 0.2rem;
        font-weight: 700;
      }
      .opening {
        color: #fff;
        background: #8abafd;
      }
    }
    .account-list {
      width: 100%;
      height: 2.19rem;
      .account-list-child {
        width: 6.65rem;
        height: 2.19rem;
        border-radius: 0.16rem;
        margin: 0 auto;
        .myassets {
          display: flex;
          color: #286de5;
          align-items: center;
          span {
            color: #286de5;
            font-size: 0.36rem;
            margin-left: 0.26rem;
            margin-top: 0.22rem;
            white-space: nowrap;
          }
          img {
            width: 0.32rem;
            height: 0.32rem;
            margin-top: 0.2rem;
            margin-left: 0.15rem;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
        .frozen_account {
          .cont{
            width: 3.3rem;
            align-items: center;
            display: flex;
            padding-right: 1rem;
            white-space: nowrap;
            overflow: hidden;
            img {
              width: 0.25rem;
              height: 0.25rem;
              margin-right: 0.05rem;
            }
            .scroll {
              user-select: none;
              white-space: nowrap;
              overflow: hidden;
              padding-left: 0.08rem;
              padding-top: 0.05rem;
              margin-left: 0;
              span {
                color: #f45151;
                font-size: 0.22rem;
                margin-top: 0.2rem;
                display: inline-block;
                width: auto;
                animation: 10s lunbo linear infinite normal;
              }
            }

            @keyframes lunbo {
              0% {
                transform: translateX(0px);
              }
              100% {
                transform: translateX(-100%);
              }
            }
          }
          .frozenModel span{
            user-select: none;
            width: 3.5rem;
            background: #fff;
            padding: 0.2rem;
            border-radius: 0.1rem;
            font-size: 0.22rem;
            color: #000;
            white-space: inherit;
            position: absolute;
            left: 1rem;
            top: 0.8rem;
            z-index: 9999;
            border: 0.01rem solid #f45151;
          }
          .frozenModel::after{
            content: '';
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            background: #fff;
            border: 0.01rem solid #f45151;
            border-bottom: 0;
            border-right: 0;
            transform: rotate(45deg);
            position: absolute;
            top: 0.9rem;
            left: 3rem;
            z-index: 9999;
          }
        }
      }
    }
  }
}
.md-example-child-swiper-2 {
  height: 1.7rem;
  .banner-item {
    float: left;
    width: 100%;
    height: 100%;
    line-height: 0.25rem;
    text-align: center;
    font-size: 0.28rem;
    color: #fff;
    box-align: center;
    align-items: center;
    box-pack: center;
    justify-content: center;
    text-decoration-line: none;
  }
}
.md-example-child-scroll-view-1 {
  height: 2.25rem;
  margin: 0.2rem auto 0.3rem;
  .md-scroll-view {
    display: flex;
    align-items: center;
    .scroll-view-list {
      display: flex;
      .scroll-view-item {
        width: 4.37rem;
        height: 2.25rem;
        margin-left: 0.25rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.md-tab-bar {
  background: none;
}
/deep/.bxcs_tab .scroll-view-container .md-tab-bar-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // width:2.6rem!important;
}
/deep/.bxcs_tab .md-tab-bar-list .md-tab-bar-item {
  flex: inherit;
  margin: 0;
}
/deep/.md-tab-bar-item.is-active {
  color: #008bff !important;
}
/deep/.md-tab-bar-ink {
  background: none;
  background-image: url(../../assets/images/tab_bg.png);
  background-repeat: no-repeat;
  background-size: 0.36rem 0.09rem;
  background-position: center;
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  height: 0.18rem;
  -webkit-transition: all 300ms;
  transition: all 300ms;
}
.md-example-child-swiper-1 {
  height: 0.8rem;
  .banner-item {
    float: left;
    width: 100%;
    height: 100%;
    line-height: 0.8rem;
    text-align: left;
    font-size: 0.32rem;
    color: #2a6fe6;
    box-align: center;
    align-items: center;
    box-pack: center;
    justify-content: center;
    text-decoration-line: none;
    text-indent: 0.8rem;
    font-style: oblique;
    font-weight: 700;
  }
}
.wallet_title {
  font-size: 0.36rem;
  color: #d6d6d6;
  text-align: center;
  padding-bottom: 0.88rem;
  font-weight: 500;
}
.min_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
.account-index-wrapper {
  width: 100%;
  height: 4.2rem;
  background: linear-gradient(180deg, #e1efff 0%, #feffff 84%, #ffffff 100%);
  .account-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 0.88rem;
      height: 0.88rem;
      margin-left: 0.42rem;
      margin-right: 0.48rem;
      padding-top: 0.63rem;
    }
    .account-name {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding-top: 0.63rem;
      span:nth-of-type(1) {
        color: #333;
        font-weight: 600;
        font-size: 0.3rem;
        line-height: 0.42rem;
      }
      span:nth-of-type(2) {
        font-size: 0.22rem;
        color: #666;
        line-height: 0.3rem;
        padding-top: 0.08rem;
      }
    }
    .open-account {
      width: 1.73rem;
      height: 0.64rem;
      background: #008bff;
      color: #fff;
      font-size: 0.34rem;
      border-radius: 0.34rem;
      margin-top: 0.63rem;
      margin-right: 0.43rem;
      border: none;
    }
    .opening-account {
      background: #a2d5ff;
      pointer-events: none;
    }
  }
}
.bxcs_tab {
  // width:2.6rem;
  overflow: hidden;
  margin-top: 0.1rem;
}
.tab_title {
  width: 100%;
}
.tab_ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 2.6rem;
}
.tab_ul li {
  display: flex;
  height: 0.7rem;
  font-size: 0.32rem;
  color: #333333;
}
.tab_name {
  color: #008bff !important;
  font-size: 0.32rem !important;
  background-image: url(../../assets/images/tab_bg.png);
  background-repeat: no-repeat;
  background-size: 0.66rem 0.09rem;
  background-position: center bottom;
}
.jr_box {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 0.1rem;
}
.jr_box::-webkit-scrollbar {
  width: 0rem;
  height: 0rem;
  display: none;
}
.jr_ul {
  display: flex;
  padding-left: 0.05rem;
  li {
    width: 4.37rem;
    height: 2.25rem;
    margin-left: 0.25rem;
    img {
      width: 100%;
    }
  }
}
.jr_ban01 {
  display: block;
  width: 4.56rem;
  height: 2.4rem;
  border-radius: 0.2rem;
}
.ad_news {
  width: 7.1rem;
  height: 0.8rem;
  // background-image:url(../../assets/images/ad_news.png)!important;
  // background-repeat:no-repeat;
  // background-size:cover;
  margin: 0.4rem auto;
  position: relative;
  .bgpic {
    width: 100%;
    height: 100%;
  }
  ul {
    margin-left: 0.8rem;
    height: 0.8rem;
    margin-right: 0.8rem;
    line-height: 0.8rem;
    li {
      height: 0.8rem;
      font-size: 0.32rem;
      color: #2a6fe6;
      font-weight: 700;
      a {
        font-style: oblique;
      }
    }
  }
}
#ad_news {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.jkbz_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.jkbz_title {
  font-size: 0.32rem;
  color: #333333;
  font-weight: 700;
}
.jkbz_jump {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .jump_text {
    font-size: 0.24rem;
    color: #999999;
    margin-right: 0.1rem;
  }
  .img_jump {
    display: block;
    width: 0.11rem;
    height: 0.23rem;
  }
}
.hotactions {
  width: 7.1rem;
  margin: 0.2rem auto;
}
.hotcontainer {
  margin-bottom: 0.25rem;
}
.hotcontent {
  width: 3.4rem;
  height: 1.46rem;
  background: #fff;
  border-radius: 0.16rem;
  float: left;
  margin-bottom: 0.2rem;
  a {
    width: 3.4rem;
    height: 1.46rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  div {
    display: flex;
    flex-direction: column;
    p:nth-of-type(1) {
      font-size: 0.3rem;
      color: #333;
      font-weight: 700;
      padding-left: 0.2rem;
    }
    p:nth-of-type(2) {
      font-size: 0.22rem;
      color: #999;
      font-weight: 400;
      padding-left: 0.2rem;
      padding-top: 0.05rem;
    }
  }
  img {
    width: 1.12rem;
    height: 1.12rem;
    margin-right: 0.2rem;
  }
}
.hotcontent:nth-of-type(2n-1) {
  margin-right: 0.25rem;
}
.bd_banner {
  width: 7.1rem;
  height: 1.7rem;
  margin: 0.2rem auto 0.3rem;
  clear: both;
}
.banner_img {
  display: block;
  width: 7.1rem;
  height: 1.7rem;
  border-radius: 0.1rem;
  margin: 0 auto;
}
.banner_money {
  width: 100%;
  height: 2.5rem;
  margin-top: 0.2rem;
  .md-example-child-swiper-2,
  .money-pic {
    height: 2.5rem;
  }
  img {
    width: 7.1rem;
    height: 100%;
    margin: 0 auto;
    display: block;
  }
  .banner_img {
    display: block;
    width: 7.1rem;
    height: 2.5rem;
    border-radius: 0.1rem;
    margin: 0 auto;
  }
}
.market_tab {
  width: 100%;
  height: inherit;
  overflow: hidden;
  margin: 0 auto;
  background: url(../../assets/images/market-bg.png) no-repeat;
  background-size: cover;
  .tab_title {
    width: 100%;
    margin-top: 0.3rem;
  }
  .tab_ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0.8rem;
      font-size: 0.32rem;
      color: #999999;
    }
  }
}
.tab_name {
  color: #008bff;
  font-size: 0.32rem !important;
  background-image: url(../../assets/images/tab_bg.png);
  background-repeat: no-repeat;
  background-size: 0.4rem 0.1rem;
  background-position: center 96%;
}
.tab_insurance {
  width: 6.66rem;
  height: 1.79rem;
  border-bottom: 1px solid #eee;
  margin: 0 auto;
  a {
    display: block;
    justify-content: space-between;
    align-items: center;
    width: 6.66rem;
    height: 1.79rem;
    img {
      width: 6.66rem;
      height: 1.15rem;
      margin-top: 0.3rem;
    }
  }
}
.tab_insurance:last-child {
  border-bottom: none;
}
.tab_img {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.4rem;
}
.tab_detail {
  display: flex;
  flex-direction: column;
  flex: 1;
  p {
    color: #333;
    font-size: 0.3rem;
  }
  div {
    display: flex;
    margin-top: 0.1rem;
    img {
      width: 0.31rem;
      height: 0.31rem;
      margin-right: 0.15rem;
    }
    span {
      color: #999;
      font-size: 0.24rem;
    }
  }
}
.tab_price {
  font-weight: 600;
  text-align: right;
  color: #e74050;
  line-height: 0.48rem;
  font-size: 0.34rem;
  margin-right: 0.2rem;
}
.hotcard-list {
  width: 7.1rem;
  height: 4.5rem;
  background: url(../../assets/images/card_bg.png) no-repeat;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.16rem;
  box-shadow: 0 0 20px -7px#ddd;
}
.hotcard-list-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 6.67rem;
  border-bottom: 1px solid#eee;
  margin: 0 auto;
  height: 1.5rem;
}
.hotcard-list-info:last-child {
  border-bottom: none;
}
.hotcard-list-info .hotcard-img {
  width: 1.45rem;
  height: 0.9rem;
  margin-right: 0.6rem;
}
.hotcard-list-info .info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.apply {
  width: 1.25rem;
  height: 0.51rem;
  background: #668bff;
  border-radius: 0.32rem;
  color: #fff;
  text-align: center;
  line-height: 0.51rem;
}
.sale_section {
  width: 7.1rem;
  margin: 0 auto;
  display: flex;
}
.sale_product {
  width: 1.62rem;
  height: 2.33rem;
  background: #fff;
  border-radius: 0.03rem;
  background: #fff;
  display: flex;
  margin-bottom: 0.2rem;
  border-radius: 0.08rem;
  float: left;
  a {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}
.sale_product:nth-of-type(2n-1) {
  margin-right: 0.2rem;
}
.sale_product img {
  width: 0.8rem;
  height: 1.05rem;
  display: block;
  margin: 0.25rem auto 0.15rem;
}
.sale_product p:nth-of-type(1) {
  font-size: 0.22rem;
  font-weight: 500;
  color: #333;
  text-align: center;
}
.sale_product p:nth-of-type(2) {
  font-size: 0.25rem;
  color: #e74050;
  text-align: center;
}
.sale_container {
  width: 50%;
}
.wallet_article {
  clear: both;
}
.wallet_article_list {
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  height: 4.4rem;
}
.wallet_articles {
  width: 7.1rem;
  height: 2.01rem;
  background: #fff;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 0.2rem;
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  img {
    width: 1.96rem;
    height: 1.21rem;
    border-radius: 0.08rem;
    margin-left: 0.22rem;
    margin-right: 0.39rem;
  }
  div {
    display: flex;
    flex-direction: column;
    p:nth-of-type(1) {
      font-size: 0.3rem;
      font-weight: 500;
      color: #333;
    }
    p:nth-of-type(2) {
      font-size: 0.23rem;
      font-weight: 500;
      color: #666;
      padding-top: 0.1rem;
    }
  }
}
.wallet_article_list {
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  height: 4.4rem;
}
.wallet_articles {
  width: 7.1rem;
  height: 2.01rem;
  background: #fff;
  display: flex;
  align-items: center;
  position: relative;
  div {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  img {
    width: 0.48rem !important;
    height: 0.48rem !important;
    margin-top: 0.42rem;
  }
  span:nth-of-type(1) {
    font-size: 0.46rem;
    font-weight: 600;
    margin-top: 0.36rem;
    color: #286de5;
  }
  span:nth-of-type(2),
  span.codetxt {
    font-size: 0.26rem;
    font-weight: 400;
    margin-top: 0.15rem;
    color: #286de5;
  }
  .no-stop {
    background: #f45151;
    font-size: 0.2rem !important;
    color: #fff !important;
    position: absolute;
    top: 0.4rem;
    padding: 0.05rem 0.1rem;
    font-weight: 400 !important;
    margin-top: 0 !important;
    right: -0.4rem;
    border-radius: 0.15rem 0.15rem 0.15rem 0;
  }
}
.lazy_load {
  width: 100%;
  height: 1.1rem;
  overflow: hidden;
}
.flzq_up {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  margin: 0 auto;
}
.md-example-child-tab-bar-4 {
  .custom-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1;
    .text {
      font-size: 20px;
    }
  }
}
.up_jt {
  display: block;
  width: 0.18rem;
  height: 0.16rem;
}
.load_box {
  width: 100%;
  margin-top: 0.2rem;
}
.navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 4;
  /deep/ .md-tab-bar {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    background-color: #fff !important;
  }
  /deep/ .md-tab-bar-list {
    width: 100% !important;
  }
}
.loading {
  width: 0.3rem;
  height: 0.3rem;
  background: url(../../assets/images/loading1.gif) no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  padding: 0;
}
.up_slide {
  font-size: 0.22rem;
  color: #888888;
}
.wallet_title {
  font-size: 0.36rem;
  color: #d6d6d6;
  text-align: center;
  padding-bottom: 0.88rem;
  font-weight: 500;
}
.no-account {
  width: 100%;
  height: 100%;
}
.wallet_info {
  width: 100%;
  border-radius: 0.16rem;
  display: flex;
  margin-top: .1rem;
  li {
    width: 50%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    position: relative;
    div {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
    img {
      width: 0.48rem !important;
      height: 0.48rem !important;
      margin-top: 0.42rem;
    }
    .zdc {
      width: 0.4rem !important;
      height: inherit !important;
      // margin-top:.38rem;
    }
    span:nth-of-type(1) {
      font-size: 0.46rem;
      font-weight: 600;
      margin-top: 0.36rem;
      color: #286de5;
    }
    span:nth-of-type(2),
    span.codetxt,
    span:nth-of-type(1).chf {
      font-size: 0.26rem;
      font-weight: 400;
      margin-top: 0.15rem;
      color: #286de5;
    }
    .no-stop {
      background: #f45151;
      font-size: 0.2rem !important;
      color: #fff !important;
      position: absolute;
      top: 0.4rem;
      padding: 0.05rem 0.1rem;
      font-weight: 400 !important;
      margin-top: 0 !important;
      right: -0.4rem;
      border-radius: 0.15rem 0.15rem 0.15rem 0;
      z-index: 999;
    }
  }
}
.gotoSetLoose{
  width: 5rem;
  background-color: #fff;
  border-radius: 10px;
  padding: .3rem;
  .loseTitle{
    width: 100%;
    height: .6rem;
    text-align: center;
    line-height: .4rem;
    font-size: .38rem;
    text-align: center;
  }
  p{
    font-size: 0.3rem;
    margin-bottom: 30px;
  }
}
.skeleton {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
  img{
    width:100%;
    height:100%;
  }
}
.madinCloseBg{
  background: #666;
  text-align: center;
  .loseTitle{
    border-bottom: 0.01rem solid #999;
    margin-bottom: 0.4rem;
  }
  .cont{
    padding: 0 0.3rem;
  }
}
.openCondition{
  .loseTitle{
    border-bottom: 0.01rem solid #E1E1E1;
  }
  .cont{
    width: 4rem;
    margin: 0.34rem auto;
  }
}
</style>
