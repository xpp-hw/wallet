<template>
  <div class="wrap">
    <div class="header">
      <p class="tips">尊敬的客户{{ mobile }}，你好！</p>
      <div class="top top1">
        <a href="#1">业务说明</a>
      </div>
      <div class="top top2" @click="showRule">活动规则</div>
      <div class="top top3" @click="showPrizeDetail">奖品明细</div>
    </div>

    <!-- 新人开通 -->
    <div class="draw_new" v-if="newCust">
      <!-- 无缝滚动 -->
      <div class="seamless-warp" style="z-index: 11"></div>
      <vue-seamless-scroll
        :data="listData"
        :class-option="classOption"
        class="seamless-warp"
      >
        <div class="item">
          <li v-for="(item, index) in listData" :key="index">
            <div class="itemLine">
              <img
                src="@/assets/images/newRights/flow/seamlessIcon.png"
                alt=""
              />
              <div class="rightLine" v-if="item > 100 && item <= 600">
                **{{ item }}获得1元话费券
              </div>
              <div class="rightLine" v-else-if="item > 600 && item <= 1000">
                **{{ item }}获得10元话费券
              </div>
              <!-- <div class="rightLine" v-else-if="item > 700 && item <= 850">
                **{{ item }}获得666MB流量
              </div>
              <div class="rightLine" v-else-if="item > 850 && item < 1000">
                **{{ item }}获得200E豆
              </div> -->
            </div>
          </li>
        </div>
      </vue-seamless-scroll>

      <div class="chanceSum">
        <p style="color: #333333; text-align: left; font-weight: 700">
          {{ custOpenState ? "您还有" : "您将获得" }}
        </p>
        <p class="chance">{{ newCustNum }}</p>
        <p style="color: #333333; text-align: left; font-weight: 700">
          次翻牌机会
        </p>
      </div>

      <div
        v-if="newCustList < 1"
        class="newPeopleFlow"
        @click="sweepPrize('0')"
      ></div>
      <div class="invitePrizeNav" v-else style="margin: 1.42rem auto 0">
        <div
          v-for="item in newCustList"
          @click="showCardRule(item)"
          style="position: relative"
        >
          <img
            :src="require(`@/assets/images/newRights/flow/${item.imgUrl}.png`)"
            alt=""
          />
          <div class="prizeState_btn" @click.stop="goUse(item)">
            <!-- prizeType: 奖品类型 2-流量；3-话费券；8-E豆 , -->
            <!-- useSts: 券类型为0-话费券时返回 使用状态 0：未使用 1：已使用 2：已过期 -->
            <div
              class="btn"
              v-if="item.prizeType == '3' || item.prizeType == '8'"
            >
              {{
                item.useSts == "0"
                  ? "去使用"
                  : item.useSts == "1"
                  ? "已使用"
                  : "已过期"
              }}
            </div>
            <div class="btn" v-else-if="item.prizeType == '2'">已发放</div>
          </div>
        </div>
        <div
          @click="sweepPrize('0')"
          v-for="data in 4 - newCustList.length"
          style="margin-left: 0.02rem; display: flex; max-height: 2.4rem"
        >
          <img
            v-if="newCustList.length < 2"
            src="@/assets/images/newRights/flow/newCust_card1.png"
            alt=""
          />
          <img
            v-else
            src="@/assets/images/newRights/flow/newCust_card2.png"
            alt=""
          />
        </div>
      </div>

      <p class="tips">
        活动面向首次成功开通移动钱包的江苏移动用户(不含退订后重新开通)。
      </p>
    </div>

    <!-- 邀好友 -->
    <div class="draw_old" :style="{ margin: !newCust ? '-6.1rem auto 0' : '' }">
      <div class="friendTop"></div>
      <!-- 无缝滚动 -->
      <div class="seamless-warp" style="z-index: 11"></div>
      <vue-seamless-scroll
        :data="listData2"
        :class-option="classOption"
        class="seamless-warp"
      >
        <div class="item">
          <li v-for="(item, index) in listData2" :key="index">
            <div class="itemLine">
              <img
                src="@/assets/images/newRights/flow/seamlessIcon.png"
                alt=""
              />
              <div class="rightLine" v-if="item > 100 && item <= 400">
                **{{ item }}获得5元话费券
              </div>
              <div class="rightLine" v-else-if="item > 400 && item <= 700">
                **{{ item }}获得2元话费券
              </div>
              <div class="rightLine" v-else-if="item > 700 && item <= 850">
                **{{ item }}获得666MB流量
              </div>
              <div class="rightLine" v-else-if="item > 850 && item < 1000">
                **{{ item }}获得200E豆
              </div>
            </div>
          </li>
        </div>
      </vue-seamless-scroll>

      <div class="chanceSum">
        <p style="color: #333333; text-align: left; font-weight: 700">您还有</p>
        <p class="chance">{{ inviteNum }}</p>
        <p style="color: #333333; text-align: left; font-weight: 700">
          次翻牌机会
        </p>
      </div>

      <div
        v-if="invitePrizeList.length < 1"
        class="old_PeopleFlow"
        @click="sweepPrize('1')"
      ></div>
      <div
        ref="cont"
        v-else
        :class="
          isShowCards ? 'inviteOldPrizeNav inviteHead' : 'inviteOldPrizeNav'
        "
      >
        <div v-if="invitePrizeList.length > 3" style="display: flex">
          <div
            @click="sweepPrize('1')"
            style="margin-left: 0.02rem; display: flex; max-height: 2.4rem"
          >
            <img src="@/assets/images/newRights/flow/friends_card.png" alt="" />
          </div>
        </div>
        <div v-else style="display: flex">
          <div
            @click="sweepPrize('1')"
            v-for="data in 4 - invitePrizeList.length"
            style="margin-left: 0.02rem; display: flex; max-height: 2.4rem"
          >
            <img src="@/assets/images/newRights/flow/friends_card.png" alt="" />
          </div>
        </div>
        <!-- <div v-if="isShowCards" style="display: flex">
          <div
            v-for="item in invitePrizeList.slice(3)"
            @click="showCardRule(item)"
            style="position: relative"
          >
            <img
              :src="
                require(`@/assets/images/newRights/flow/${item.imgUrl}.png`)
              "
              alt=""
            />
            <div class="prizeState_btn" @click.stop="goUse(item)">
              prizeType: 奖品类型 2-流量；3-话费券；8-E豆 ,
              useSts: 券类型为0-话费券时返回 使用状态 0：未使用 1：已使用 2：已过期
              <div
                class="btn"
                v-if="item.prizeType == '3' || item.prizeType == '8'"
              >
                {{
                  item.useSts == "0"
                    ? "去使用"
                    : item.useSts == "1"
                    ? "已使用"
                    : "已过期"
                }}
              </div>
              <div class="btn" v-else-if="item.prizeType == '2'">已发放</div>
            </div>
          </div>
        </div> -->
        <div
          v-for="item in invitePrizeList"
          @click="showCardRule(item)"
          style="position: relative"
        >
          <img
            :src="require(`@/assets/images/newRights/flow/${item.imgUrl}.png`)"
            alt=""
          />
          <div class="prizeState_btn" @click.stop="goUse(item)">
            <!-- prizeType: 奖品类型 2-流量；3-话费券；8-E豆 , -->
            <!-- useSts: 券类型为0-话费券时返回 使用状态 0：未使用 1：已使用 2：已过期 -->
            <div
              class="btn"
              v-if="item.prizeType == '3' || item.prizeType == '8'"
            >
              {{
                item.useSts == "0"
                  ? "去使用"
                  : item.useSts == "1"
                  ? "已使用"
                  : "已过期"
              }}
            </div>
            <div class="btn" v-else-if="item.prizeType == '2'">已发放</div>
          </div>
        </div>
      </div>
      <!-- 查看更多 -->
      <div
        v-if="invitePrizeList.length > 3 && !isShowCards"
        class="showCards"
        @click="isShowCards = !isShowCards"
      >
        向左滑动
      </div>

      <div class="invitationBtn" @click="invitaFriends">邀请微信好友</div>

      <div class="faceToface" @click="showSweepCode">
        <img src="@/assets/images/newRights/flow/sweep.png" alt="" />
        <p>面对面扫码</p>
      </div>

      <div class="old_bottomNav">
        <div style="display: flex; align-items: center">
          <img class="img1" src="@/assets/images/newRights/flow/1.png" alt="" />
          <p>
            <span>分享邀请</span>
            <span>新客好友</span>
          </p>
        </div>

        <img
          class="img2"
          src="@/assets/images/newRights/flow/jiantou.png"
          alt=""
        />

        <div style="display: flex; align-items: center">
          <img class="img1" src="@/assets/images/newRights/flow/2.png" alt="" />
          <p>
            <span>每邀1位新客</span>
            <span>开通移动钱包</span>
          </p>
        </div>

        <img
          class="img2"
          src="@/assets/images/newRights/flow/jiantou.png"
          alt=""
        />

        <div style="display: flex; align-items: center">
          <img class="img1" src="@/assets/images/newRights/flow/3.png" alt="" />
          <p>
            <span>您和好友分别</span>
            <span>获得翻牌机会</span>
          </p>
        </div>
      </div>

      <div class="line"></div>

      <p class="bottomTips">
        每邀请1位新客(需为江苏移动用户，不含退订后重新开通)成功开通移动钱包，您获得1次翻牌机会，新客首月获得2次翻牌机会。
      </p>

      <div class="inviteDetail" v-if="custOpenState">
        <p class="invite_title">
          <img src="@/assets/images/newRights/flow/invite_left.png" alt="" />
          <span>邀请明细</span>
          <img src="@/assets/images/newRights/flow/invite_right.png" alt="" />
        </p>

        <!-- 当月记录 -->
        <div
          v-if="inviteList.length > 0"
          style="margin-top: 0.2rem; overflow: scroll; max-height: 3.2rem"
        >
          <div class="prizeLine" v-for="item in inviteList">
            <div style="display: flex; justify-content: space-between">
              <p>{{ item.inviteTime }}</p>
              <p style="margin-left: 0.6rem">{{ item.invitee }}</p>
            </div>
            <!-- inviteState   邀请状态 0-开通成功; 1-待开通 -->
            <!-- newCustFlag   新客标识 0-新客; 1-非新客 -->
            <p
              class="btn1"
              v-if="item.inviteState == '0' && item.newCustFlag == '0'"
              style="min-width: 30%"
            >
              开通成功
            </p>
            <div
              style="min-width: 30%; display: flex; justify-content: center"
              v-if="item.inviteState == '1' && item.newCustFlag == '0'"
            >
              <div class="btn2_out" @click="invitaFriends">
                <p class="btn2">去提醒好友开通</p>
              </div>
            </div>
            <p
              class="btn3"
              v-if="item.newCustFlag == '1' && item.inviteState == '1'"
              style="min-width: 30%"
            >
              非新客(无效)
            </p>
          </div>
        </div>
        <p v-if="inviteList.length < 1" class="invite_content">暂无记录</p>

        <!-- 历史记录 -->
        <!-- <div
          :class="showHistory ? 'historyMore' : 'historyMore marginBottom'"
          @click="showHistory = !showHistory"
        >
          <p>查看更多</p>
          <p v-if="showHistory" class="ioc"></p>
          <p v-else class="ioc_2"></p>
        </div>
        <div
          v-if="historyList.length > 0 && showHistory"
          style="margin-bottom: 0.2rem; overflow: scroll; max-height: 100px"
        >
          <div class="prizeLine" v-for="item in historyList">
            <div style="display: flex; justify-content: space-between">
              <p>{{ item.inviteTime }}</p>
              <p style="margin-left: 0.6rem">{{ item.invitee }}</p>
            </div>
            inviteState   邀请状态 0-开通成功; 1-待开通
            newCustFlag   新客标识 0-新客; 1-非新客
            <p
              class="btn1"
              v-if="item.newCustFlag == '0' && item.inviteState == '0'"
              style="min-width: 30%"
            >
              开通成功
            </p>
            <div
              style="min-width: 30%; display: flex; justify-content: center"
              v-if="item.newCustFlag == '0' && item.inviteState == '1'"
            >
              <div class="btn2_out" @click="invitaFriends">
                <p class="btn2">去提醒好友开通</p>
              </div>
            </div>
            <p
              class="btn3"
              v-if="item.newCustFlag == '1' && item.inviteState == '1'"
              style="min-width: 30%"
            >
              非新客(无效)
            </p>
          </div>
        </div>
        <p
          v-if="historyList.length < 1 && showHistory"
          class="invite_content"
          style="margin: 0.18rem auto 0.36rem"
        >
          暂无记录
        </p> -->
      </div>
    </div>

    <!-- 加享额外权益 -->
    <div class="other">
      <div class="otherEquity"></div>
      <div class="nav1">
        <div class="topNav">
          <p style="margin: 0.05rem 0 0.2rem">
            <span class="nav_title">钱包专属特权</span>
            <span class="nav_title2">权益免费领，流量优惠购</span>
          </p>
          <div style="display: flex; justify-content: space-between">
            <div class="top_left" @click="goActivityUrl('1')">
              <p class="jiaobiao">月月享</p>
              <p style="color: #021ba3; font-size: 0.28rem; font-weight: 700">
                月月1分钱抢1GB
              </p>
              <p
                style="font-size: 0.22rem; color: #666666; margin-top: 0.17rem"
              >
                绑定电子账户享福利
              </p>
              <p class="qiang_btn">马上抢</p>
              <p class="flowImg">
                <span>流量</span>
                <span>1GB</span>
              </p>
            </div>
            <div class="top_right" @click="goActivityUrl('2')">
              <p>
                <span
                  style="color: #603723; font-size: 0.28rem; font-weight: 700"
                  >最高领5GB/月</span
                >
              </p>
              <p
                style="font-size: 0.22rem; color: #666666; margin-top: 0.17rem"
              >
                用电子账户攒钱返流量
              </p>
              <p class="open_btn">立即办理</p>
              <p class="flowImg"></p>
            </div>
          </div>
        </div>
        <div class="bottomNav">
          <p style="margin: 0.05rem 0 0.2rem">
            <span class="nav_title">更多超值优惠</span>
            <span class="nav_title2">限时送好礼，每期各不同</span>
          </p>
          <div style="display: flex; justify-content: space-between">
            <div class="superValue" @click="goActivityUrl('3')">
              <p class="imag"></p>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-evenly;
                  align-items: flex-start;
                "
              >
                <p class="f1">存保证金</p>
                <p class="f2">赚80元话费</p>
                <p class="f3">立即办理</p>
              </div>
            </div>
            <div class="superValue" @click="goActivityUrl('4')">
              <p class="imag2"></p>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-evenly;
                  align-items: flex-start;
                "
              >
                <p class="f1">轻松借钱</p>
                <p class="f2">送20元话费</p>
                <p class="f3">立即办理</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 业务说明 -->
    <div class="businessDesc" id="1">
      <div class="yewuSm"></div>
      <!-- <div class="tapNav">
        <div class="descTap">
          <p class="tapText">业务说明</p>
          <p class="squareTop square"></p>
          <p class="squareBtm square2"></p>
        </div>
      </div> -->

      <div class="businessContent">
        <div
          :class="showTotal ? 'businessAgree total' : 'businessAgree'"
          v-html="agreementContent"
        ></div>
        <div class="showMore" v-if="!showTotal" @click="showTotal = true">
          <p>查看更多</p>
          <p class="ioc"></p>
        </div>
      </div>
    </div>

    <!-- <div class="topBg">
      <img alt="" src="@/assets/images/newRights/topBg.png" />
    </div> -->
    <!-- <div class="content_title">开通移动钱包享以下权益</div>
    <div class="content">
      <div class="privilege">
        <div
          class="privilege_item"
          v-for="(item, index) in privilegeList"
          :key="index"
          :style="{ backgroundImage: 'url(' + item.background + ')' }"
          @click="jumpLink(item)"
        >
          <div class="privilege_item_btn">{{ item.btn }}</div>
          <div class="privilege_item_subscript" v-if="item.subscript">
            {{ item.subscript }}
          </div>
        </div>
      </div>
      <div class="valueDiscounts">
        <div
          class="valueDiscounts_item"
          v-for="(item, index) in valueDiscountsList"
          :key="index"
          :style="{ backgroundImage: 'url(' + item.background + ')' }"
          @click="jumpLink(item)"
        >
          <div class="valueDiscounts_item_btn">{{ item.btn }}</div>
        </div>
      </div>
    </div> -->
    <!-- <div id="1" class="content_title" style="margin: 0.2rem 0">温馨提示</div> -->
    <!-- <div class="rulerText">
      <div class="contents">
        <div
          v-html="agreementContent"
          :style="showText ? 'height:180px; overflow: hidden;' : ''"
        ></div>
        <div class="check_text" v-show="showText" @click="showText = false">
          点击展开
          <md-icon name="arrow-down" size="sm"></md-icon>
        </div>

        <div class="check_text" v-show="!showText" @click="showText = true">
          点击收起
          <md-icon name="arrow-up" size="sm"></md-icon>
        </div>
      </div>
      <div class="bottomText">
        <img
          style="width: 4rem"
          alt=""
          src="@/assets/images/newRights/bottomText.png"
        />
      </div>
    </div> -->
    <!-- <div
      v-if="!isopen"
      id="F04"
      class="bottomOpenBtn"
      @click="open('text', 1)"
      :class="{ line: isFirstZero }"
    >
      <img alt="" src="@/assets/images/newRights/open.png" />
    </div> -->
    <div class="openBtn" v-if="!custOpenState">
      <div class="btn">
        <p class="clickNav" @click="open('text', 1)"></p>
      </div>
      <p>
        <img src="@/assets/images/newRights/flow/warning.png" alt="" />
        <span style="margin: 0 0 0 0.09rem"
          >订购后预计3分钟生效，退订次月生效，按月自动续订</span
        >
      </p>
    </div>

    <pop
      v-show="popshow"
      ref="child"
      :dealCh="dealCh"
      :countdown="countdown"
      :pop-info="popInfo"
      :userName="userName"
      :inviter="invinterCode"
      @getMsgCode="getMsgCode"
      @goresults="goresults"
      @submit="ispopshow"
    ></pop>
    <div v-if="loading" class="loading-toast">
      <img alt="" src="@/assets/images/loading-toast.gif" />
    </div>

    <div
      :class="isShare ? 'tankuang isShareBg' : 'tankuang'"
      v-show="showPopup"
      @click="otherAreaShow($event)"
    >
      <!-- 链接失效 -->
      <div class="toast1" v-if="urlTimeOUt">
        <div class="title">温馨提示</div>
        <div class="text1">当前分享链接已失效</div>
        <div class="text2">点击下方按钮重新进入活动~</div>
        <div class="btn" @click="reLoading">立即查看</div>
      </div>
      <!-- 奖品记录页 -->
      <div class="toast2" v-if="showPrize">
        <div class="title">奖品记录</div>
        <div
          v-if="prizeList.length > 0"
          style="margin-top: 0.78rem; height: 3.2rem; overflow: scroll"
        >
          <div
            class="prizeItem"
            v-for="(item, index) in prizeList"
            :key="index"
          >
            <div style="display: flex; justify-content: space-between">
              <p>{{ item.flipTime }}</p>
              <p style="margin-left: 0.3rem">
                {{ item.prizeAmt + item.prizeUnit
                }}{{
                  item.prizeType == "2"
                    ? "流量"
                    : item.prizeType == "3"
                    ? "话费券"
                    : item.prizeType == "8"
                    ? "E豆"
                    : ""
                }}
              </p>
            </div>
            <p class="prizeBtn" @click="goUrl(item)">
              <!-- useSts   使用状态 0：未使用 1：已使用 2：已过期 -->
              {{
                item.useSts == "0"
                  ? "去查看"
                  : item.useSts == "1"
                  ? "已使用"
                  : "已过期"
              }}
            </p>
          </div>
        </div>
        <p v-if="prizeList.length > 0" class="prizeTip">
          （中奖后3个工作日内到账，可前往查询到账情况）
        </p>
        <p v-else class="noPrize">暂无记录</p>

        <div class="close" @click="hiddePop()"></div>
      </div>
      <!-- 剩余翻牌机会 -->
      <div class="toast1" v-if="surplusChance">
        <div class="title">温馨提示</div>
        <div class="text1">
          您当前翻牌机会为
          <span style="color: #ec6b03; font-size: 0.32rem">0</span>
          次，邀请新客开通
        </div>
        <div class="text2">移动钱包，可以增加翻牌机会哦~</div>
        <div class="text2" style="margin-top: 0.2rem">
          （每月最多可获得10次翻牌机会）
        </div>
        <div class="btn" @click="hiddePop()">好的，我知道了</div>
        <div class="close" @click="hiddePop()"></div>
      </div>
      <!-- 翻牌机会已用完 -->
      <div class="toast1" v-if="chanceNone">
        <div class="title">温馨提示</div>
        <div class="text1">您的新客翻牌机会已用完，</div>
        <div class="text2">继续参与邀新客活动，得翻牌机会哦！</div>
        <div class="btn" @click="hiddePop()">好的，我知道了</div>
        <div class="close" @click="hiddePop()"></div>
      </div>
      <!-- 奖品规则 -->
      <div class="toast3" v-if="prizeRule">
        <div class="title">{{ ruleName }}</div>
        <div class="btn" @click="hiddePop()">好的，我知道了</div>
        <div class="content" v-html="ruleAgreement"></div>
        <div class="close" @click="hiddePop()"></div>
      </div>
      <!-- 扫码 -->
      <div class="toast4" v-if="showQrCOde">
        <div class="close" @click="hiddePop()"></div>
        <!-- 二维码显示界面 -->
        <vue-qr
          class="body_qr"
          ref="qrCode"
          :text="QR.text"
          :color-dark="QR.randomColor"
          :callback="qrCodeCallback"
        ></vue-qr>
        <a
          class="downLoad"
          :href="exportLink"
          @click="handleQrCode()"
          :download="downloadFilename"
        ></a>
      </div>

      <div class="sweepGif" v-show="showGif" @click="hiddePop()">
        <img
          :src="require(`@/assets/images/newRights/flow/${sweepGifUrl}.gif`)"
          alt=""
        />
      </div>

      <div class="shareImg" v-if="isShare" ref="mask">
        <img src="@/assets/images/newRights/flow/shareBg.png" alt="" />
      </div>
    </div>

    <div v-if="showBox" class="loadingBox">
      <img alt="" src="@/assets/images/loading-toast.gif" />
    </div>
  </div>
</template>

<script>
import api from '@/common/apiUrls';
import { initPageJs } from '@/common/Page2435_1_fn.js';
import * as store2 from '@/common/localstore';
import pullRefresh from '@/components/pullRefresh.vue';
import pop from './pop';
import VueQr from 'vue-qr'
import prizeListVue from '../openBlindBox/prizeList.vue';
import { initWx } from '@/common/isShare';
import { init } from '@/common/trnasit.js';
import { isWeiXinScene } from '@/common/publicFunc.js';

export default {
  name: 'getFree',
  components: {
    pop,
    pullRefresh,
    VueQr
  },
  computed: {
    classOption() {
      // IE浏览器会卡顿
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: this.listData.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        delay: 0
      }
    }
  },
  data() {
    return {
      invinterCode: '',
      showBox: false,
      isShowCards: true,
      showHistory: true,
      sweepGifUrl: "inviteSweep_200E",
      downloadFilename: "",
      exportLink: "",
      QR: {
        content: '', // 输入框输入的内容
        text: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree', // 二维码实际内容
        logoSrc: '', // 二维码中间的图片
        randomColor: 'black', // 二维码颜色
        qrCodeUrl: '', // 存放生成的二维码url
        isShowDialog: false, // 上传的图片预览dialog
        imageUrl: '' // 上传图片的临时显示链接
      },
      ruleAgreement: "",
      ruleName: "",
      prizeRule: false,
      chanceNone: false,
      showTotal: false,
      surplusChance: false,
      showPrize: false,
      urlTimeOUt: false,
      showQrCOde: false,
      showGif: false,
      isShare: false,
      showPopup: false,
      prizeList: [],
      invitePrizeList: [],
      newCustList: [],
      inviteNum: 0,
      newCustNum: 2,
      activeIndex: 1,
      showText: true,
      message: '',
      saleOut: false,
      code2: '10015', // 1GB流量
      isOpenWallet: '00',
      goodsthree: '', // 商品3状态：00->马上抢，01->已购买，02->已售罄
      loading: false,
      newFive: false, // 新5元充值券标识
      isFirstZero: false,
      mobile: '',
      popshow: false,
      isopen: false, // 是否开通0元包
      isopenWallet: true, // 是否开通移动钱包
      cmbAccountFlag: '', // 是否是招行默认开户行，（0：招行已开非默认，1：是，2：招行未开 3：未知）
      preferential: {
        one: 1, // 10送1
        two: 1, // 50送5
        three: 1, // 1gb
        four: 1 // 2元
      },
      popInfo: {
        type: 'img',
        state: 1
      },
      isDisabled: false,
      topSpace: 0,
      bodyDoc: document.body,
      get: 0, // 已经领取的权益数量
      notget: 0, // 待领取的权益数量
      countdown: 60, // 倒计时
      userName: '', // 用户名
      payUrl: '', // 支付订单地址
      sessionId: '', // 订单编号
      canClick: true, // 是否可以点击
      ordno: '', // 订单编号
      isCanclick: true, // 是否可以点击
      dealCh: '', // 渠道编码
      touchArr: [
        {
          id: 'A01',
          touchCode: 'WAP_T_RIGHTSFREE_01_A01'
        },
        {
          id: 'B01',
          touchCode: 'WAP_T_RIGHTSFREE_01_B01'
        },
        {
          id: 'C01',
          touchCode: 'WAP_T_RIGHTSFREE_01_C01'
        },
        {
          id: 'C02',
          touchCode: 'WAP_T_RIGHTSFREE_01_C02'
        },
        {
          id: 'D01',
          touchCode: 'WAP_T_RIGHTSFREE_01_D01'
        },
        {
          id: 'D02',
          touchCode: 'WAP_T_RIGHTSFREE_01_D02'
        },
        {
          id: 'E01',
          touchCode: 'WAP_T_RIGHTSFREE_01_E01'
        },
        {
          id: 'E02',
          touchCode: 'WAP_T_RIGHTSFREE_01_E02'
        },
        {
          id: 'E03',
          touchCode: 'WAP_T_RIGHTSFREE_01_E03'
        },
        {
          id: 'E04',
          touchCode: 'WAP_T_RIGHTSFREE_01_E04'
        },
        {
          id: 'F01',
          touchCode: 'WAP_T_RIGHTSFREE_01_F01'
        },
        {
          id: 'F02',
          touchCode: 'WAP_T_RIGHTSFREE_01_F02'
        },
        {
          id: 'F03',
          touchCode: 'WAP_T_RIGHTSFREE_01_F03'
        },
        {
          id: 'F04',
          touchCode: 'WAP_T_RIGHTSFREE_01_F04'
        }
      ],
      fromPath: '',
      city: '',
      queryCount: 0,
      // privilegeList: [
      //   {
      //     background: require('../../assets/images/newRights/privilege_1.png'),
      //     subscript: '月月享',
      //     btn: '马上抢',
      //     url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?parchn=1fg&gytype=001609'
      //   },
      //   {
      //     background: require('../../assets/images/newRights/privilege_2.png'),
      //     subscript: '',
      //     btn: '立即办理',
      //     url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicHome?parchn=ztllb&gytype=001609'
      //   },
      //   {
      //     background: require('../../assets/images/newRights/privilege_3.png'),
      //     subscript: '',
      //     btn: '立即开通',
      //     url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/autoRecharge?parchn=hfzdc&gytype=001609'
      //   }
      // ],
      // valueDiscountsList: [
      //   {
      //     background: require('../../assets/images/newRights/valueDiscounts_2.png'),
      //     btn: '立即办理',
      //     url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/gfBankMargin?parchn=gfhfbhd&gytype=001608'
      //   },
      //   {
      //     background: require('../../assets/images/newRights/valueDiscounts_1.png'),
      //     btn: '立即办理',
      //     url: 'https://fintech.12580life.com/fintech-h5/fortuneCenter/baiRongLoan?parchn=dkhd&gytype=001608'
      //   }
      // ],
      agreementContent: '',
      listData: [],
      listData2: [],
      newCust: false,
      custOpenState: false,
      historyList: [],
      monthList: [],
      invinter: '',
      inviteList: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      vm.fromPath = from.path;
      if (vm.$client.JSMCC) {
        if (vm.$client.ANDROID) {
          // 安卓端
          window.native_obj.setWebViewTitle('开通钱包领权益');
        } else if (vm.$client.IOS) {
          // IOS端
          vm.showTitlte();
        }
      }
      if (from.name == 'rightresults') {
        if (vm.$route.query.resState == 1) {
          vm.custOpenState = true;
        }
        // window.location.reload();
        vm.showBox = true;
        setTimeout(() => {
          // 账户状态
          vm.queryAccState('waiting')
        }, 2500)
      }
    });
  },
  mounted() {
    this.dealCh = this.$route.query.dealCh || '';
    this.getUserZero();
    this.mobile = `${store2.default
      .get('usrmob')
      .slice(0, 3)}****${store2.default.get('usrmob').slice(7)}`;
    this.BodyScroll(true);
    this.getAgreement('ydqb0yb');

    for (var i = 0; i < 30; i++) {
      let ram = Math.random() * 0.9 + 0.1;
      let ram2 = Math.floor(ram * 1000);
      this.listData.push(ram2);
    }
    for (var i = 0; i < 30; i++) {
      let ram = Math.random() * 0.9 + 0.1;
      let ram2 = Math.floor(ram * 1000);
      this.listData2.push(ram2);
    }

    // 账户状态
    this.queryAccState('')
    // this.saveInviteInfo()
    // 获取加密手机号
    this.getInviter()
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
    this.loading = true;
    this.ordno = this.$route.query.ordno || '';
    if (this.ordno) {
      // 链接上带有订单编号，说明是从支付订单页跳过来的
      // （1）查询订单是否支付成功，若成功显示弹框
      this.searchById(this.ordno);
    }
    initPageJs(this.$route.meta.pageName, this.touchArr);

    this.invinterCode = this.$route.query.inviter || '';
    let mob = this.$route.query.inviter || '';
    let inviteDate = this.$route.query.inviteDate || '';
    if (mob && inviteDate) {
      let nowDate = new Date().getMonth() + 11;
      if (nowDate == inviteDate.length) {
        this.saveInviteInfo(mob)
      } else {
        this.showPopup = true;
        this.urlTimeOUt = true;
      }
    }

  },
  watch: {
    // queryCount: {
    //   handler(newValue) {
    //     if (newValue >= 1) {
    //       this.loading = false;
    //     }
    //   },
    //   deep: true
    // }
  },
  methods: {

    scroll(e) {
      console.log(e);
      this.isShowCards = true;
    },
    otherAreaShow(e) {
      if (!this.isShare) {
        return
      }
      if (!this.$refs.mask.contains(e.target)) {
        this.hiddePop()
      }
    },
    // 获取加密手机号
    getInviter() {
      api.EncryptInviter({})
        .then((data) => {
          this.invinter = data.encryptData
        })
    },
    // 邀请记录查询
    queryinviteList() {
      api.queryInviteRec({})
        .then((data) => {
          let monthlist = data.monthList || []
          let historylist = data.historyList || []
          if (monthlist.length > 0) {
            monthlist.forEach(item => {
              item.sortTime = item.inviteTime
              if (item.newCustFlag == '1' && item.inviteState == '0') {

              } else {
                this.monthList.push(item)
              }
            })
            this.setSortTime(this.monthList)
          }
          if (historylist.length > 0) {
            console.log(historylist, '---+++---')
            historylist.forEach(item => {
              item.sortTime = item.inviteTime
              if (item.newCustFlag == '1' && item.inviteState == '0') {

              } else {
                this.historyList.push(item)
              }
            })
            this.setSortTime(this.historyList)
          }
          this.setDateTime(this.monthList)
          this.setDateTime(this.historyList)

          this.inviteList = [...this.monthList, ...this.historyList]

        })
    },
    setSortTime(data) {
      if (data.length < 1) {
        return
      }
      data.forEach(item => {
        item.sortTime = item.sortTime.replace("-", '').replace("-", '').replace(" ", '').replace(":", '').replace(":", '')
      })
      data.sort(function (a, b) {
        return b.sortTime - a.sortTime
      })
      return data
    },
    setDateTime(data) {
      if (data.length < 1) {
        return
      }
      data.forEach(item => {
        console.log(item, '10')
        item.inviteTime = item.inviteTime.slice(5, -3)
        item.inviteTime = item.inviteTime.replace("-", '月').replace(" ", "日 ")
      })
      return data
    },
    // 同步邀请记录
    saveInviteInfo(data) {
      api.syncInviteInfo({
        inviter: data || null
      })
        .then(() => {

        })
        .catch(() => {
        })
    },
    //抽奖次数查询
    querySweepSum(typ) {
      if (!typ) {
        this.loading = true;
      }
      api.queryFlipRec({})
        .then(data => {
          this.loading = false;
          if (data.inviteFlipList && data.inviteFlipList.length > 0) {
            data.inviteFlipList.forEach(invite => {
              if (invite.flipTime) {
                invite.timmer = invite.flipTime.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '')
              }
            })
            data.inviteFlipList.sort(function (a, b) {
              return a.timmer - b.timmer
            })
          }
          if (data.newCustFlipList && data.newCustFlipList.length > 0) {
            data.newCustFlipList.forEach(newcust => {
              if (newcust.flipTime) {
                newcust.timmer = newcust.flipTime.replace('-', '').replace('-', '').replace(' ', '').replace(':', '').replace(':', '')
              }
            })
            data.newCustFlipList.sort(function (a, b) {
              return a.timmer - b.timmer
            })
          }
          this.newCustList = data.newCustFlipList || [];
          this.invitePrizeList = data.inviteFlipList || [];
          this.prizeList = [...this.newCustList, ...this.invitePrizeList];
          // inviteFlipNum 邀请用户可翻牌数量    newCustFlipNum  新客可翻牌数量
          this.newCustNum = data.newCustFlipNum ? Number(data.newCustFlipNum) : 0
          this.inviteNum = data.inviteFlipNum ? Number(data.inviteFlipNum) : 0
          if (this.invitePrizeList.length > 0) {
            this.invitePrizeList.forEach(item => {
              // prizeAmt: 奖品面额 ,
              // prizeType: 奖品类型 2-流量；3-话费券；8-E豆 
              if (item.prizeAmt && item.prizeType != '2') {
                item.prizeAmt = item.prizeAmt / 100
              }
              if (item.prizeType == '3' && item.prizeAmt == '5') {
                item.imgUrl = 'invite_prize1'
              } else if (item.prizeType == '3' && item.prizeAmt == '2') {
                item.imgUrl = 'invite_prize2'
              } else if (item.prizeType == '2') {
                item.imgUrl = 'invite_prize3'
              } else if (item.prizeType == '8') {
                item.imgUrl = 'invite_prize4'
              } else {
                item.imgUrl = 'invite_prize1'
              }
            })
          }
          if (this.newCustList.length > 0) {
            this.newCustList.forEach(item => {
              // prizeAmt: 奖品面额 ,
              // prizeType: 奖品类型 2-流量；3-话费券；8-E豆 
              if (item.prizeAmt && item.prizeType != '2') {
                item.prizeAmt = item.prizeAmt / 100
              }
              if (item.prizeType == '3' && item.prizeAmt == '5') {
                item.imgUrl = 'newCust_prize1'
              } else if (item.prizeType == '3' && item.prizeAmt == '2') {
                item.imgUrl = 'newCust_prize2'
              } if (item.prizeType == '3' && item.prizeAmt == '10') {
                item.imgUrl = 'newCust_prize5'
              } else if (item.prizeType == '3' && item.prizeAmt == '1') {
                item.imgUrl = 'newCust_prize6'
              } else if (item.prizeType == '2') {
                item.imgUrl = 'newCust_prize3'
              } else if (item.prizeType == '8') {
                item.imgUrl = 'newCust_prize4'
              } else {
                item.imgUrl = 'newCust_prize1'
              }
            })
          }
          if (this.prizeList.length > 0) {
            this.prizeList.forEach(p => {
              p.flipTime = p.flipTime.slice(5, -3)
              p.flipTime = p.flipTime.replace("-", '月').replace(" ", "日 ")
            })
            this.prizeList.sort(function (a, b) {
              return b.timmer - a.timmer
            })
          }
          if (this.invitePrizeList.length > 0) {
            this.invitePrizeList.sort(function (a, b) {
              return b.timmer - a.timmer
            })
          }

          if (this.invitePrizeList.length > 0) {
            let y = new Date().getFullYear() + ''
            let m = new Date().getMonth() + 1 + ''
            if (m < 10) {
              m = `0${m}`
            }
            let dateTime = Number(y + m)
            this.invitePrizeList = this.invitePrizeList.filter(inData => (inData.timmer.slice(0, 6) == dateTime))
          }
          // if (this.newCustList.length > 0) {
          //   let y = new Date().getFullYear() + ''
          //   let m = new Date().getMonth() + 1 + ''
          //   if (m < 10) {
          //     m = `0${m}`
          //   }
          //   let dateTime = Number(y + m)
          //   this.newCustList = this.newCustList.filter(cust => (cust.timmer.slice(0, 6) == dateTime))
          // }

          if (this.invitePrizeList.length > 3) {
            this.isShowCards = false;
          } else {
            this.isShowCards = true;
          }
          this.$nextTick(() => {
            if (this.invitePrizeList.length < 1) {

            } else {
              this.$refs.cont.addEventListener('scroll', this.scroll)
            }
          })
        })
        .catch(() => {
          this.loading = false;
        })
    },
    // 卡面规则
    showCardRule(typ) {
      if (typ.prizeType == '2') {
        // 流量券
        this.getAgreement('lljpsysm')
        this.showPopup = true;
        this.prizeRule = true;
        this.BodyScroll(false)
      } else if (typ.prizeType == '3') {
        // 话费券
        this.getAgreement('hfqsysm')
        this.showPopup = true;
        this.prizeRule = true;
        this.BodyScroll(false)
      } else if (typ.prizeType == '8') {
        // E豆
        this.getAgreement('edjpsysm')
        this.showPopup = true;
        this.prizeRule = true;
        this.BodyScroll(false)
      }
    },
    // 去使用
    goUse(data) {
      // useSts: 券类型为0 - 话费券时返回 使用状态 0：未使用 1：已使用 2：已过期
      if (!data.useSts || data.useSts == '1' || data.useSts == '2') {
        return
      }
      if (data.prizeType == '3') {
        // 话费券
        window.location.href = 'https://h.app.coc.10086.cn/activity/transit/transferDownload.html?functionCode=CN00052'
      } else if (data.prizeType == '2') {
        // 流量券
        // window.location.href = 'https://h.app.coc.10086.cn/activity/transit/transferDownload.html?functionCode=CN00052'
      } else if (data.prizeType == '8') {
        // E豆
        window.location.href = 'https://wap.js.10086.cn/nact/resource/2504/html/index.html?ch=7x39'
      }
    },
    // 翻牌
    sweepPrize(typ) {
      if (this.custOpenState) {
        // 已开通
        if (typ == '0') {
          // 新户抽奖
          if (this.newCustNum > 0) {
            this.sweepApi(typ)
          } else {
            this.showPopup = true;
            this.chanceNone = true;
          }
        } else {
          // 邀请抽奖
          if (this.inviteNum > 0) {
            this.sweepApi(typ)
          } else {
            this.showPopup = true;
            this.surplusChance = true;
          }
        }
      } else {
        this.$toast.info('请您先开通移动钱包（0元/月），再参与活动哦！');
      }
    },
    // 调用抽奖接口
    sweepApi(typ) {
      this.loading = true;
      api.receiveFlipRight({
        flipType: typ
      })
        .then((res) => {
          this.loading = false;
          if (res.msgCd == "BUS00000") {
            this.BodyScroll(false)
            //    prizeType    3-话费券；2-流量；8-E豆 
            if (typ == '1') {
              // 邀请用户抽奖
              if (res.prizeType == '3') {
                if (res.prizeAmt == '5' || res.prizeAmt == '500') {
                  this.sweepGifUrl = 'inviteSweep_5yuan'
                } else if (res.prizeAmt == '2' || res.prizeAmt == '200') {
                  this.sweepGifUrl = 'inviteSweep_2yuan'
                }
              } else if (res.prizeType == '2') {
                this.sweepGifUrl = 'inviteSweep_666MB'
              } else if (res.prizeType == '8') {
                this.sweepGifUrl = 'inviteSweep_200E'
              }
              this.showPopup = true;
              this.showGif = true;
            } else if (typ == '0') {
              // 新户抽奖
              if (res.prizeType == '3') {
                if (res.prizeAmt == '5' || res.prizeAmt == '500') {
                  this.sweepGifUrl = 'newSweep_5yuan'
                } else if (res.prizeAmt == '2' || res.prizeAmt == '200') {
                  this.sweepGifUrl = 'newSweep_200E'
                } else if (res.prizeAmt == '10' || res.prizeAmt == '1000') {
                  this.sweepGifUrl = 'newSweep_10yuan'
                } else if (res.prizeAmt == '1' || res.prizeAmt == '100') {
                  this.sweepGifUrl = 'newSweep_1yuan'
                }
              } else if (res.prizeType == '2') {
                this.sweepGifUrl = 'newSweep_666MB'
              } else if (res.prizeType == '8') {
                this.sweepGifUrl = 'newSweep_200E'
              }
              this.showPopup = true;
              this.showGif = true;
            }
          } else if (res.errMsg || res.msgInfo) {
            this.$toast.info(res.errMsg || res.msgInfo)
          }
          //  抽奖次数奖品列表查询
          this.querySweepSum('noLoading')
        })
        .catch((err) => {
          this.$toast.info(err.errMsg || err.msgInfo)
          this.querySweepSum('noLoading')
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 下载二维码
    handleQrCode() {
      let name = new Date().getTime()
      let Qrcode = this.$refs.qrCode
      this.exportLink = Qrcode.$el.currentSrc
      this.downloadFilename = name
    },
    qrCodeCallback(url) {
      this.QR.qrCodeUrl = url
    },
    // 扫码弹框
    showSweepCode() {
      // let mobNo = store2.default.get('usrmob')
      // if (mobNo) {
      //   mobNo = window.btoa(mobNo)
      // }
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      var str = "";
      var sum = new Date().getMonth() + 11
      for (let i = 0; i < sum; i++) {
        str += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      console.log(str.length)
      if (!this.custOpenState) {
        this.$toast.info('请您先开通移动钱包（0元/月），再参与活动哦！');
        return
      }
      this.showPopup = true;
      this.showQrCOde = true;
      if (process.env.VUE_APP_ENV === "local" || process.env.VUE_APP_ENV === "sit") {
        this.QR.text = `https://fintech.12580life.com/fintech-uat/fortuneCenter/member/rightsfree?inviter=${this.invinter}&inviteDate=${str}`
      } else {
        this.QR.text = `https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?inviter=${this.invinter}&inviteDate=${str}`
      }
    },
    isSharingInterface() {
      let appId = null;
      let timestamp = null;
      let nonceStr = null;
      let signature = null;

      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      var str = "";
      var sum = new Date().getMonth() + 11
      for (let i = 0; i < sum; i++) {
        str += chars[Math.round(Math.random() * (chars.length - 1))];
      }

      let link = ""
      let title = "翻牌赢话费券！"
      let content = "您的好友邀您来翻牌，10元、5元、666MB流量…更多惊喜好礼等你拿！"
      let imgUrl = "https://fintech.12580life.com/fintech/image/wallet/shareBg.png"
      if (process.env.VUE_APP_ENV === "local" || process.env.VUE_APP_ENV === "sit") {
        link = `https://fintech.12580life.com/fintech-uat/fortuneCenter/member/rightsfree?inviter=${this.invinter}&inviteDate=${str}`
      } else {
        link = `https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?inviter=${this.invinter}&inviteDate=${str}`
      }

      api.sharingInterface({
        shareUrl: window.location.href
      })
        .then((data) => {
          appId = data.appId;
          timestamp = data.timestamp;
          nonceStr = data.nonceStr;
          signature = data.signature;

          this.showPopup = true;
          this.isShare = true;

          if (appId) {
            initWx(
              appId,
              timestamp,
              nonceStr,
              signature,
              link,
              content,
              title,
              imgUrl
            );
          }
          if (!this.$client.JSMCC && !this.$client.LEADEON) {
            init(this.$route.meta.title);
          }
        })
        .catch((err) => {
          if (!this.$client.JSMCC && !this.$client.LEADEON) {
            init(this.$route.meta.title);
          }
        });
    },
    // 邀请好友 
    invitaFriends() {
      if (!this.custOpenState) {
        this.$toast.info('请您先开通移动钱包（0元/月），再参与活动哦！');
        return
      }

      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      var str = "";
      var sum = new Date().getMonth() + 11
      for (let i = 0; i < sum; i++) {
        str += chars[Math.round(Math.random() * (chars.length - 1))];
      }

      if (isWeiXinScene()) {
        this.isSharingInterface()
        return
      } else if (!this.$client.JSMCC && !this.$client.LEADEON) {
        this.$toast.info('只能在中国移动APP或微信环境下进行活动分享哦~')
        return
      }

      if (process.env.VUE_APP_ENV === "local" || process.env.VUE_APP_ENV === "sit") {
        leadeon.shareMessage({
          debug: false,
          title: '翻牌赢话费券！', //分享标题 -必传(V4.3变更)
          link: `https://fintech.12580life.com/fintech-uat/fortuneCenter/member/rightsfree?inviter=${this.invinter}&inviteDate=${str}`, //分享链接,参数中如果有中文，需要对参数进行编码 -必传(V4.3变更)
          /** imgUrl和base64Image只能传一个，若两个字段同时存在，优先取base64Image并认为是大图分享 **/
          imgUrl: 'https://fintech.12580life.com/fintech/image/wallet/shareBg.png', //分享图标 -图文分享必传(V4.3变更)
          content: '您的好友邀您来翻牌，10元、5元、666MB流量…更多惊喜好礼等你拿！', //分享内容 -必传(V4.3变更)
        })
      } else {
        leadeon.shareMessage({
          debug: false,
          title: '翻牌赢话费券！', //分享标题 -必传(V4.3变更)
          link: `https://fintech.12580life.com/fintech-h5/fortuneCenter/member/rightsfree?inviter=${this.invinter}&inviteDate=${str}`, //分享链接,参数中如果有中文，需要对参数进行编码 -必传(V4.3变更)
          /** imgUrl和base64Image只能传一个，若两个字段同时存在，优先取base64Image并认为是大图分享 **/
          imgUrl: 'https://fintech.12580life.com/fintech/image/wallet/shareBg.png', //分享图标 -图文分享必传(V4.3变更)
          content: '您的好友邀您来翻牌，10元、5元、666MB流量…更多惊喜好礼等你拿！', //分享内容 -必传(V4.3变更)
        })
      }
    },
    goUrl(data) {
      if (data.useSts == '0' || data.useSts == '1') {
        if (data.prizeType == '2') {
          // 流量余额查询
          window.location.href = 'https://h.app.coc.10086.cn/cmcc-app/setMealSurplus/setMealSurplusNew.html'
        } else if (data.prizeType == '3') {
          // 卡券中心
          window.location.href = 'https://touch.10086.cn/i/mobile/mycoupons.html'
        } else if (data.prizeType == '8') {
          // E豆小店
          window.location.href = 'https://wap.js.10086.cn/nact/resource/2504/html/index.html?ch=7x39'
        }
      }
      // 一级充值中心
      // window.location.href = 'https://h.app.coc.10086.cn/activity/transit/transferDownload.html?functionCode=CN00052'

    },
    goActivityUrl(type) {
      if (!this.custOpenState) {
        // this.$toast.info('请您先开通移动钱包（0元/月），再翻牌哦！');
        return
      }
      if (type == '1') {
        window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?parchn=1fg&gytype=001609'
      } else if (type == '2') {
        window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/traddicHome?parchn=ztllb&gytype=001609'
      } else if (type == '3') {
        window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/gfBankMargin?parchn=gfhfbhd&gytype=001608'
      } else if (type == '4') {
        window.location.href = 'https://fintech.12580life.com/fintech-h5/fortuneCenter/baiRongLoan?parchn=dkhd&gytype=001608'
      }
    },
    // 查询是否新户
    queryAccState(type) {
      this.loading = true;
      api.queryZeroPackageState({})
        .then(data => {
          this.loading = false;
          // newCustFlag  新客标识:0-是;1-否
          // openState  开通状态 0-已开通;1-未开通
          this.newCust = data.newCustFlag == '0' ? true : false;
          this.custOpenState = data.openState == '0' ? true : false;
          if (this.custOpenState) {
            this.querySweepSum('')
            this.queryinviteList()
          }
          if (type == 'waiting') {
            this.showBox = false;
          }
        })
        .catch(() => {
          this.loading = false;
          if (type == 'waiting') {
            this.showBox = false;
          }
        })
    },
    hiddePop() {
      this.showPopup = false;
      this.surplusChance = false;
      this.showPrize = false;
      this.urlTimeOUt = false;
      this.showQrCOde = false;
      this.showGif = false;
      this.isShare = false;
      this.chanceNone = false;
      this.prizeRule = false;
      this.BodyScroll(true)
      this.sweepGifUrl = "toast"
    },
    // 活动规则
    showRule() {
      this.getAgreement('ydqbhdgz')
      this.showPopup = true;
      this.prizeRule = true;
      this.BodyScroll(false)
    },
    // 奖品明细
    showPrizeDetail() {
      this.showPopup = true;
      this.showPrize = true;
      this.BodyScroll(false)
    },
    // jumpLink(item) {
    //   if (this.isopen) {
    //     window.location.href = item.url;
    //   } else {
    //     this.$toast.info('请先开通0元包');
    //   }
    // },
    // 获取协议内容
    getAgreement(code) {
      this.loading = true;
      api.huataiAgreement({
        businessCode: code,
        businessType: 'WHOLE'
      }).then((res) => {
        this.loading = false;
        if (res.content && code == 'ydqb0yb') {
          this.agreementContent = res.content.replace(/font-size/g, '').replace(/font-family/g, '').replace(/line-height/g, '')
        } else if (res.content) {
          this.ruleName = res.agreementName;
          this.ruleAgreement = res.content.replace(/font-size/g, '').replace(/font-family/g, '').replace(/line-height/g, '')
        }
      }).catch(() => {
        this.loading = false;
      })
    },
    // goGonggao() {
    //   this.$router.push({
    //     path: '/member/exple',
    //     query: {
    //       parchn: this.$route.query.parchn,
    //       gytype: this.$route.query.gytype
    //     }
    //   });
    // },
    // goShuoming() {
    //   this.$router.push({
    //     path: '/member/exple',
    //     query: {
    //       parchn: this.$route.query.parchn,
    //       gytype: this.$route.query.gytype
    //     }
    //   });
    // },
    // 获取开户状态
    // getUsrAccountState() {
    //   api.getRightsCode({})
    //     .then((data) => {
    //       this.queryCount += 1;
    //       if (data.actSts === '00') {
    //         // 未开户
    //         this.isOpenWallet = '00';
    //       } else if (data.actSts === '01') {
    //         // 已开户
    //         this.isOpenWallet = '01';
    //       } else if (data.actSts === '02') {
    //         // 正在开户
    //         this.isOpenWallet = '02';
    //         this.$toast.info('正在开户,请稍后重试');
    //       } else if (data.actSts === '03') {
    //         // 账户异常
    //         this.isOpenWallet = '03';
    //         this.$toast.info('您的账户状态异常，请前往对应银行APP解除限制，具体参照活动说明：第六点（账户异常解决方式）');
    //       }
    //     })
    //     .catch((err) => {
    //       this.queryCount += 1;
    //       this.$toast.info(err.msgInfo);
    //       console.log('----error----', err);
    //     });
    // },
    // 一分1G流量下单
    // placeOrder(code) {
    //   if (this.goodsthree === '01') {
    //     return this.$toast.info('本月已购买，请勿重复提交！');
    //   }
    //   this.loading = true;
    //   api.rightPayOrder({ rightCode: code, sourcePage: '02' })
    //     .then((res) => {
    //       this.loading = false;
    //       if (res.payurl) {
    //         window.location.href = res.payurl;
    //       } else {
    //         this.$toast.info('未获取到跳转地址，请稍后重试');
    //       }
    //     })
    //     .catch((err) => {
    //       this.loading = false;
    //       this.$toast.info(err.msgInfo);
    //     });
    // },
    // 领取活动
    // async getActivity(code) {
    //   // 以前的逻辑不用，直接跳路由
    //   this.$router.push({
    //     name: 'oneCent'
    //   });
    // },
    // 跳转开通钱包
    // rightOpen() {
    //   this.$router.push({
    //     name: 'khEmpower',
    //     query: {
    //       typeId: this.$route.query.typeId || 'zerogou',
    //       orgCode: 'CMB',
    //       sourceChannel: this.$route.query.sourceChannel || '',
    //       parchn: this.$route.query.parchn,
    //       gytype: this.$route.query.gytype
    //     }
    //   });
    // },

    // linkBank() {
    //   window.location.href = 'https://fintech.12580life.com/fintech-h5/insurance/worryFinance?parchn=sxcjdg&gytype=001609';
    // },
    ispopshow(state, type) {
      console.log(state);
      console.log(type);
      if (state) {
        this.popInfo.state = type;
        if (type == 1) {
          this.$refs.child.getMsgCode();
        }
      } else {
        this.popshow = false;
        this.BodyScroll(true);
      }
    },
    // 开起弹窗
    open(type, state) {
      this.BodyScroll(false);
      this.popshow = true;
      this.popInfo = {
        type,
        state
      };
    },
    // 验证码倒计时
    getMsgCode() {
      this.countdown = 59;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown == 0) {
          clearInterval(timer);
          this.countdown = 60;
        }
      }, 1000);
    },
    // 我的权益
    // 进入页面判断是否开通钱包
    // getRightsFun() {
    //   if (this.isopen) {
    //     // 是否开通0元包
    //     window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html';
    //   } else {
    //     // this.open('img', 9);
    //   }
    // },
    // 海量优惠免费领,钱包专属特权
    // gofree(url) {
    //   if (!this.isopen) {
    //     this.open('img', 9);
    //     return;
    //   }
    //   // if (!this.isopenWallet) {
    //   //     this.open('img', 1);
    //   //     return;
    //   // }
    //   window.location.href = url;
    // },
    // 阻止蒙层下滑动
    BodyScroll(isState) {
      if (isState) {
        // 不显示
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      } else {
        // 显示
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }
    },
    // 查询钱包0元包业务开通状态
    getUserZero() {
      api.zeroPackageQuery()
        .then((res) => {
          this.userName = res.name;
          if (res.actSts == '2') {
            this.isopen = true; // 已开通0元包
          } else if (res.actSts == '4') {
            this.isopen = true; // 已开通0元包预约关闭（下月）
          } else {
            this.isopen = false; // 未开通0元包
          }
        })
        .catch((err) => {
        });
    },
    // 用户开户状态查询
    // usrAccountStsQuery() {
    //   api.usrAccountStsQuery().then((res) => {
    //     this.queryCount += 1;
    //     if (res.actSts == '01') {
    //       // 钱包已经开户
    //       this.isopenWallet = true;
    //     } else {
    //       this.isopenWallet = false;
    //     }
    //     this.cmbAccountFlag = res.cmbAccountFlag;
    //   }).catch((err) => {
    //     this.queryCount += 1;
    //   });
    // },
    // 计算权益领取数量
    // usrRevRightNum() {
    //   api.usrRevRightNum({ rightFlag: '10' })
    //     .then((res) => {
    //       this.queryCount += 1;
    //       // console.log(res.rightInfoList);
    //       this.get = Number(res.countNum);
    //       this.notget = 6 - this.get;
    //       console.log(this.notget);
    //       res.rightInfoList.forEach((item) => {
    //         if (item.rightCode === '10017') {
    //           // 2元充值券
    //           // 权益状态
    //           this.goodsthree = item.rightSts;
    //           if (this.goodsthree === '00') {
    //             this.goodsthree = item.soldOutFlag === '1'
    //               ? '02'
    //               : item.rightSts;
    //           }
    //         }
    //         if (
    //           this.isopen
    //           && this.preferential.two == 2
    //           && this.preferential.four == 2
    //         ) {
    //           return;
    //         }
    //         this.rightState(
    //           item.rightCode,
    //           item.soldOutFlag,
    //           item.rightSts
    //         );
    //       });
    //     })
    //     .catch((err) => {
    //       this.queryCount += 1;
    //       console.log(22222222, err);
    //     });
    // },
    // 权益状态
    // rightState(rightCode, soldOutFlag, rightSts) {
    //   // console.log(1);
    //   switch (rightCode) {
    //     case '10015': // 1G流量包
    //       if (soldOutFlag == 1) {
    //         // 抢完
    //         this.preferential.three = 3;
    //       } else if (rightSts == '00') {
    //         // 未领取
    //         this.preferential.three = 1;
    //       } else if (rightSts == '01') {
    //         // 已领取
    //         this.preferential.three = 2;
    //       }
    //       break;
    //     case '10017': // 两元话费券
    //       // if (soldOutFlag == 1) {
    //       //     this.saleOut = true;
    //       //     // 抢完
    //       //     this.preferential.four = 3;
    //       // } else
    //       if (rightSts == '00') {
    //         // 未领取
    //         if (this.isopen) {
    //           this.preferential.four = 3;
    //         } else {
    //           this.preferential.four = 1;
    //         }
    //       } else if (rightSts == '02') {
    //         if (this.isopen) {
    //           this.preferential.four = 3;
    //         } else {
    //           this.preferential.four = 1;
    //         }
    //       } else {
    //         // 已领取
    //         this.preferential.four = 2;
    //       }
    //       break;
    //     case '10001': // 冲10送1
    //       if (soldOutFlag == 1) {
    //         // 抢完
    //         this.preferential.one = 3;
    //       } else if (rightSts == '00') {
    //         // 未领取
    //         this.preferential.one = 1;
    //       } else if (rightSts == '01') {
    //         // 已领取
    //         this.preferential.one = 2;
    //       }
    //       break;
    //     case '10006':
    //       // if (soldOutFlag == 1) {
    //       //     this.saleOut = true;
    //       //     // 抢完
    //       //     this.preferential.two = 3;
    //       // } else
    //       if (rightSts == '00') {
    //         // 未领取
    //         if (this.isopen) {
    //           this.preferential.two = 3;
    //         } else {
    //           this.preferential.two = 1;
    //         }
    //         // this.newFive = false;
    //       } else if (rightSts == '02') {
    //         if (this.isopen) {
    //           this.preferential.two = 3;
    //         } else {
    //           this.preferential.two = 1;
    //         }
    //       } else {
    //         // 已领取
    //         this.preferential.two = 2;
    //         // this.newFive = true;
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    // },
    // //权益状态判断
    // rightStateFun(item)

    // 钱包权益弹窗
    // walletPOP(data, index) {
    //   if (this.isopen) {
    //     // 是否开通0元包
    //     // if (this.isopenWallet) {//是否开通钱包
    //     if (data == 'preferential') {
    //       this.walletPOPone(index);
    //     } else {
    //       this.walletPOPtwo(index);
    //     }
    //     // } else {
    //     //     this.open('img', 1);
    //     // }
    //   } else {
    //     // this.open('img', 9);
    //   }
    // },
    // 优惠卷弹窗
    // walletPOPone(index) {
    //   switch (this.preferential[index]) {
    //     case 3:
    //       // if(this.saleOut) {
    //       //     this.open('img', 6);
    //       //     return
    //       // }
    //       if (!this.isCanclick) return;
    //       this.isCanclick = false;
    //       this.$toast.info('领取中...');
    //       if (index == 'four') {
    //         // 10送2
    //         api.usrRightReceive({
    //           rightCode: '10017'
    //         })
    //           .then((res) => {
    //             if (res.sysCode === 'BUS00000') {
    //               this.usrRevRightNum();
    //               this.open('img', 7);
    //             } else {
    //               this.$toast.info(res.resMsg);
    //             }
    //             this.isCanclick = true;
    //           })
    //           .catch((err) => {
    //             this.$toast.info(err.msgInfo);
    //             console.log(err);
    //             this.isCanclick = true;
    //           });
    //       } else {
    //         // 50送5
    //         api.usrRightReceive({
    //           rightCode: '10006'
    //         })
    //           .then((res) => {
    //             if (res.sysCode === 'BUS00000') {
    //               this.usrRevRightNum();
    //               this.open('img', 11);
    //             } else {
    //               this.$toast.info(res.resMsg);
    //             }
    //             this.isCanclick = true;
    //           })
    //           .catch((err) => {
    //             this.$toast.info(err.msgInfo);
    //             console.log(err);
    //             this.isCanclick = true;
    //           });
    //       }
    //       break;
    //     case 2:
    //       // this.open('img', 5);
    //       window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html';
    //       break;
    //     case 1:
    //       // this.open('img', 6);
    //       break;
    //   }
    // },
    // 1分购弹窗
    // walletPOPtwo(index) {
    //   switch (this.preferential[index]) {
    //     case 1:
    //       if (index == 'three') {
    //         if (this.cmbAccountFlag == '0') {
    //           this.open('img', 2);
    //           return;
    //         }
    //         if (this.cmbAccountFlag == '2') {
    //           this.open('img', 3);
    //           return;
    //         }
    //         // 下单一分1GB
    //         if (this.canClick) {
    //           window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?typeId=0yb001?sourceChannel=${this.$route.query.sourceChannel || ''}&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
    //         }
    //       } else {
    //         // 下单一分2元券
    //         if (this.canClick) {
    //           window.location.href = `https://fintech.12580life.com/fintech-h5/fortuneCenter/oneCent?typeId=0yb001?sourceChannel=${this.$route.query.sourceChannel || ''}&parchn=${this.$route.query.parchn}&gytype=${this.$route.query.gytype}`;
    //         }
    //       }
    //       break;
    //     case 2:
    //       if (index == 'four') {
    //         this.open('img', 5);
    //       } else {
    //         this.open('img', 4);
    //       }
    //       break;
    //     case 3:
    //       this.open('img', 6);
    //       break;
    //   }
    // },
    // 去结果页
    goresults(state, info) {
      this.queryAccState('')
      this.popshow = false;
      this.BodyScroll(true);
      let inviterCode = this.$route.query.inviter || ''
      this.$router.push({
        path: '/member/results',
        query: {
          state,
          msgInfo: info,
          inviter: inviterCode
        }
      });
    },
    // 根据订单号查询是否成功
    searchById(id) {
      api.usrRightDetailsQuery({ sessionid: id })
        .then((res) => {
          if (res.receiveSts === '01') {
            if (res.rightCode == '10015') {
              this.open('img', 8);
            } else if (res.rightCode == '10017') {
              this.open('img', 7);
            }
          } else {
            this.$toast.info('支付失败');
          }
        })
        .catch((err) => {
          this.$toast.info(err.msgInfo);
        });
    },
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        // eslint-disable-next-line no-undef
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      const WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'https://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(() => {
        document.documentElementNaNpxoveChild(WVJBIframe);
      }, 0);
      return null;
    },
    showTitlte() {
      // 调用方式
      // const data = { iewcontrollertitle: '移动钱包' };
      this.setupWebViewJavascriptBridge((WebViewJavascriptBridge) => {
        WebViewJavascriptBridge.callHandler(
          'appNavTitle',
          '移动钱包'
        );
      });
    },
    reLoading() {
      // if(process.env.VUE_APP_ENV == 'sit') {

      // }
      let url = window.location.href
      let index = window.location.href.indexOf('?')
      url = url.slice(0, index)
      console.log(url)
      window.location.href = url
    }
    // 使用五元券
    // goNewFive() {
    //   if (this.newFive) {
    //     window.location.href = 'https://wap.js.10086.cn/kqzx/resource/wap/html_mycard/mycoupon.html';
    //   }
    // },
    // 五元券状态
    // getFive() {
    //   api.getWalletOpenPrizeInfo({
    //     // 生产新户
    //     // activityId: 'ATY221227007234511',
    //     // 测试新户
    //     activityId: 'ATY221222000111507',
    //     chnNo: '02',
    //     mobNo: store2.default.get('usrmob')
    //   })
    //     .then((res) => {
    //       this.queryCount += 1;
    //       // console.log(res.receiveTime)
    //       // this.newFive=true
    //       // console.log('新户')
    //       // this.preferential.two = 2;
    //       // this.preferential.four = 2;
    //       this.timeCompare(res.receiveTime);
    //     })
    //     .catch((err) => {
    //       api.getWalletOpenPrizeInfo({
    //         // 生产五元券
    //         // activityId: 'ATY220330000840520',
    //         // 测试五元券
    //         activityId: 'ATY220324000002011',
    //         chnNo: '02',
    //         mobNo: store2.default.get('usrmob')
    //       })
    //         .then((res) => {
    //           this.queryCount += 1;
    //           // console.log(res.receiveTime)
    //           // this.newFive=true
    //           // console.log('非新户')
    //           // this.preferential.two = 2;
    //           // this.preferential.four = 2;
    //           this.timeCompare(res.receiveTime);
    //         })
    //         .catch((err) => {
    //           this.queryCount += 1;
    //           console.log(err);
    //         });
    //     });
    // },
    // 时间对比
    // timeCompare(receiveTime) {
    //   const time = new Date();
    //   let date = String(time.getFullYear()) + String(time.getMonth() + 1);
    //   if ((date = receiveTime.slice(0, 7))) {
    //     this.newFive = true;
    //     console.log('可以领了');
    //   }
    //   console.log(date);
    // },
    // checkTwo() {
    //   api.usrRevRightNum({ rightFlag: '10' })
    //     .then((res) => {
    //       this.queryCount += 1;
    //       res.rightInfoList.forEach((item) => {
    //         switch (item.rightCode) {
    //           case '10027':
    //             if (
    //               item.rightSts == '01'
    //               || item.rightSts == '02'
    //             ) {
    //               this.preferential.four = 2;
    //               this.preferential.two = 2;
    //             }
    //             break;
    //           case '10028':
    //             if (
    //               item.rightSts == '01'
    //               || item.rightSts == '02'
    //             ) {
    //               this.preferential.four = 2;
    //               this.preferential.two = 2;
    //             }
    //             break;
    //           default:
    //             break;
    //         }
    //       });
    //     })
    //     .catch((err) => {
    //       this.queryCount += 1;
    //       console.log(1, err);
    //     });
    // }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background: #fdedc0;
  background-size: 100% 100%;
  .header {
    position: relative;
    width: 100%;
    height: 1138px;
    background: url("~@/assets/images/newRights/flow/headBg_new.png") no-repeat;
    background-size: 100%;
    overflow: hidden;
    .tips {
      margin: 16px 0 480px 20px;
      font-weight: 500;
      font-size: 22px;
      text-align: left;
      color: #353535;
    }
    .top {
      position: absolute;
      width: 100px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px 0 0 15px;
      opacity: 0.6;
      background: #000000;
      font-weight: 500;
      font-size: 20px;
      text-align: center;
      color: #ffffff;
      a {
        color: #ffffff;
        text-decoration: none;
      }
    }
    .top1 {
      top: 27px;
      right: 0px;
    }
    .top2 {
      top: 67px;
      right: 0px;
    }
    .top3 {
      top: 107px;
      right: 0px;
    }
  }
  .seamless-warp {
    position: absolute;
    top: 30px;
    right: 20px;
    width: 240px;
    height: 80px;
    overflow: hidden;
    z-index: 2;
    .itemLine {
      height: 40px;
      position: relative;
      img {
        top: -5px;
        left: 5px;
        position: absolute;
        width: 38px;
        height: 36px;
        z-index: 2;
      }
      .rightLine {
        position: absolute;
        right: 0;
        width: 220px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px 15px 15px 15px;
        opacity: 0.4;
        background: #000000;
        font-size: 18px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
  .chanceSum {
    position: absolute;
    left: 36px;
    top: 90px;
    display: flex;
    align-items: stretch;
    z-index: 2;
    .chance {
      width: 46px;
      height: 26px;
      line-height: 30px;
      border-radius: 13px 13px 13px 13px;
      background: linear-gradient(to bottom, #ff930a, #ffd200);
      font-size: 25px;
      text-align: center;
      color: #ffffff;
      box-shadow: 0 3px 7px 0 #ee28147d;
      margin: 0 5px;
      font-weight: 700;
    }
  }
  .draw_new {
    overflow: hidden;
    position: relative;
    width: 734px;
    height: 449px;
    background: url("~@/assets/images/newRights/flow/draw1.png") no-repeat;
    background-size: 100%;
    margin: -610px auto 0;
    .tips {
      font-weight: 500;
      font-size: 18px;
      text-align: left;
      color: #7c7c7c;
      margin-left: 34px;
    }
    .newPeopleFlow {
      width: 697px;
      height: 241px;
      background: url("~@/assets/images/newRights/flow/new_flow.png") no-repeat;
      background-size: 100%;
      margin: 142px auto 0;
    }
    .chance {
      background: linear-gradient(to bottom, #fd2729, #fd9e24) !important;
    }
    .seamless-warp {
      top: 50px !important;
    }
    .chanceSum {
      top: 100px !important;
    }
  }
  .draw_old {
    box-sizing: border-box;
    padding: 142px 0 20px 0;
    position: relative;
    width: 726px;
    //height: 938px;
    //background: url("~@/assets/images/newRights/flow/draw2.png") no-repeat;
    //background-size: 100%;
    background: linear-gradient(to bottom, #ffffff, #fffae1);
    margin: 30px auto;
    border-radius: 20px;
    .friendTop {
      position: absolute;
      top: -25px;
      left: 0;
      width: 100%;
      height: 159px;
      background: url("~@/assets/images/newRights/flow/friendsBg.png") no-repeat;
      background-size: 100%;
      z-index: 2;
    }
    .old_PeopleFlow {
      width: 697px;
      height: 241px;
      background: url("~@/assets/images/newRights/flow/old_flow.png") no-repeat;
      background-size: 100%;
      margin: 0 auto;
    }
    .invitationBtn {
      width: 610px;
      height: 65px;
      line-height: 65px;
      border-radius: 32.5px 32.5px 32.5px 32.5px;
      background: linear-gradient(to bottom, #ffa914, #f25d3b);
      margin: 20px auto 15px;
      font-weight: 600;
      font-size: 34px;
      text-align: center;
      color: #fefeff;
      letter-spacing: 4px;
    }
    .faceToface {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 612px;
      height: 67px;
      border-radius: 32.5px 32.5px 32.5px 32.5px;
      border: 2px #fdd10b solid;
      margin: 0 auto;
      font-weight: 500;
      font-size: 26px;
      text-align: center;
      color: #666666;
      img {
        width: 34px;
        height: 34px;
        margin-right: 10px;
      }
    }
    .old_bottomNav {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 26px;
      .img1 {
        width: 54px;
        height: 58px;
      }
      .img2 {
        width: 19px;
        height: 20px;
      }
      p {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      span {
        color: #333333;
        font-size: 20px;
        text-align: left;
      }
    }
    .line {
      width: 695px;
      height: 1px;
      background: #ffe2a3;
      margin: 20px auto 15px;
    }
    .bottomTips {
      font-weight: 500;
      font-size: 18px;
      text-align: justify;
      color: #7c7c7c;
      margin: 0 55px;
    }
    .inviteDetail {
      box-sizing: border-box;
      padding: 24px 0 10px 0;
      width: 692px;
      //height: 183px;
      background: url("~@/assets/images/newRights/flow/invite_detail.png")
        no-repeat;
      background-size: 100% 100%;
      margin: 20px auto;
      overflow: auto;
      .invite_title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 28px;
        text-align: left;
        color: #ffb311;
        img {
          width: 74px;
          height: 10px;
        }
        span {
          margin: 0 10px;
        }
      }
      .invite_content {
        font-weight: 500;
        font-size: 22px;
        text-align: center;
        color: #939393;
        margin: 50px auto;
      }
      .historyMore {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 35px auto 0;
        color: #ff8f02;
        font-weight: 500;
        font-size: 24px;
        .ioc {
          border: 10px solid transparent;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top-color: #646668;
          margin: 6px 0 0 10px;
        }
        .ioc_2 {
          border: 10px solid transparent;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom-color: #646668;
          margin: -6px 0 0 10px;
        }
      }
      .marginBottom {
        margin-bottom: 20px !important;
      }
      .prizeLine {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        font-size: 26px;
        text-align: left;
        color: #59636e;
        box-sizing: border-box;
        padding: 0 0 0 35px;
        margin: 16px 0 0 0;
        .btn1 {
          font-size: 22px;
          text-align: center;
          color: #cc4a02;
        }
        .btn2_out {
          display: flex;
          align-items: center;
          justify-content: center;
          align-items: flex-start;
          border-radius: 20px;
          width: 164px;
          height: 36px;
          background: #ffffff;
          box-shadow: 0 3px 6px 0 #e6b033;
        }
        .btn2 {
          display: flex;
          justify-content: center;
          width: 160px;
          height: 34px;
          line-height: 34px;
          border-radius: 17px 17px 17px 17px;
          font-size: 20px;
          text-align: center;
          color: #ffffff;
          font-weight: 500;
          background: linear-gradient(to bottom, #fdc005, #f86900);
        }
        .btn3 {
          font-size: 22px;
          text-align: center;
          color: #8c8c8c;
        }
      }
    }
    .showCards {
      position: absolute;
      top: 142px;
      left: -2%;
      width: 50px;
      height: 245px;
      color: #7c7c7c;
      writing-mode: vertical-rl;
      text-orientation: upright;
      font-size: 22px;
      letter-spacing: 10px;
      text-align: center;
    }
  }
  .inviteOldPrizeNav {
    display: flex;
    flex-direction: row-reverse;
    box-sizing: border-box;
    padding: 0 0 0 12px;
    overflow-x: scroll;
    transform: translateX(50px);
    width: 92%;
    img {
      width: 175px;
      height: 240px;
    }
    .prizeState_btn {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      width: 126px;
      height: 36px;
      border-radius: 18px 18px 18px 18px;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 3px 6px 0 #e6b033;
      .btn {
        background: linear-gradient(to bottom, #ff566e, #ff5529, #ff9745);
        width: 122px;
        height: 32px;
        line-height: 32px;
        font-size: 22px;
        text-align: center;
        color: #ffffff;
        border-radius: 18px;
      }
    }
  }
  .invitePrizeNav {
    display: flex;
    box-sizing: border-box;
    padding: 0 0 0 12px;
    overflow-x: scroll;
    img {
      width: 175px;
      height: 240px;
    }
    .prizeState_btn {
      position: absolute;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%);
      width: 126px;
      height: 36px;
      border-radius: 18px 18px 18px 18px;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 3px 6px 0 #e6b033;
      .btn {
        background: linear-gradient(to bottom, #ff566e, #ff5529, #ff9745);
        width: 122px;
        height: 32px;
        line-height: 32px;
        font-size: 22px;
        text-align: center;
        color: #ffffff;
        border-radius: 18px;
      }
    }
  }
  .inviteHead {
    position: relative;
    //overflow: visible !important;
    width: 100% !important;
    transform: translateX(-5px) !important;
  }
  .other {
    position: relative;
    background: linear-gradient(to bottom, transparent, #fcd5a1, #fdedc0);
    .nav1 {
      width: 720px;
      height: 629px;
      border-radius: 20px 20px 20px 20px;
      margin: -92px auto 0;
      background: rgba(255, 255, 255, 0.3);
      overflow: auto;
      .topNav {
        box-sizing: border-box;
        padding: 20px;
        width: 700px;
        height: 349px;
        border-radius: 20px 20px 20px 20px;
        opacity: 0.9;
        background: #fcf9f9;
        margin: 10px auto;
        .top_left {
          position: relative;
          box-sizing: border-box;
          padding: 25px 0 0 12px;
          width: 325px;
          height: 250px;
          border-radius: 20px 20px 20px 20px;
          background: linear-gradient(to bottom, #cee5fc, #dcedfb);
          .jiaobiao {
            position: absolute;
            top: 16px;
            right: 18px;
            width: 58px;
            height: 20px;
            line-height: 20px;
            border-radius: 10.08px 10px 10px 0;
            background: #ff0000;
            text-align: center;
            font-size: 14px;
            color: #ffffff;
          }
          .qiang_btn {
            position: absolute;
            left: 25px;
            bottom: 43px;
            width: 110px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px 20px 20px 20px;
            background: linear-gradient(to right, #fd9e24, #fd2729);
            font-size: 20px;
            text-align: center;
            color: #ffffff;
          }
          .flowImg {
            display: flex;
            flex-direction: column;
            position: absolute;
            right: 36px;
            bottom: 16px;
            width: 121px;
            height: 142px;
            background: url("~@/assets/images/newRights/flow/flowBg1.png")
              no-repeat;
            background-size: 100%;
            span:nth-of-type(1) {
              font-size: 17.99px;
              text-align: center;
              color: #9d5122;
              margin: 11px auto 8px;
              transform: rotate(-4deg);
            }
            span:nth-of-type(2) {
              text-align: center;
              font-size: 27.6px;
              color: #f24b44;
              letter-spacing: 2px;
              font-weight: 700;
              transform: rotate(-2deg);
            }
          }
        }
        .top_right {
          box-sizing: border-box;
          padding: 25px 0 0 12px;
          position: relative;
          width: 325px;
          height: 250px;
          border-radius: 20px 20px 20px 20px;
          box-shadow: 1px 1px 1px 0 #ffdcdd;
          background: linear-gradient(to bottom, #ffe3dd, #ffeeed);
          .open_btn {
            position: absolute;
            left: 25px;
            bottom: 43px;
            width: 110px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px 20px 20px 20px;
            background: linear-gradient(to right, #fd9e24, #fd2729);
            font-size: 20px;
            text-align: center;
            color: #ffffff;
          }
          .flowImg {
            position: absolute;
            right: 24px;
            bottom: 0px;
            width: 121px;
            height: 142px;
            background: url("~@/assets/images/newRights/flow/flowBg2.png")
              no-repeat;
            background-size: 100%;
          }
        }
      }
      .nav_title {
        font-weight: 900;
        font-size: 30px;
        text-align: left;
        color: #4d1a00;
      }
      .nav_title2 {
        font-weight: 500;
        font-size: 24px;
        text-align: center;
        color: #883911;
        margin-left: 20px;
      }
      .bottomNav {
        box-sizing: border-box;
        padding: 18px;
        width: 700px;
        height: 250px;
        border-radius: 20px 20px 20px 20px;
        opacity: 0.9;
        background: #fcf9f9;
        margin: 0 auto;
        .superValue {
          display: flex;
          justify-content: space-evenly;
          width: 327px;
          height: 154px;
          background: url("~@/assets/images/newRights/flow/moreBg.png")
            no-repeat;
          background-size: 100%;
          .imag {
            margin: 15px;
            width: 113px;
            height: 116px;
            background: url("~@/assets/images/newRights/flow/more2.png")
              no-repeat;
            background-size: 100%;
          }
          .imag2 {
            margin: 15px;
            width: 113px;
            height: 116px;
            background: url("~@/assets/images/newRights/flow/more3.png")
              no-repeat;
            background-size: 100%;
          }
          .f1 {
            font-size: 26px;
            text-align: center;
            color: #491400;
            font-weight: 900;
          }
          .f2 {
            font-size: 24px;
            text-align: center;
            color: #666666;
          }
          .f3 {
            width: 120px;
            height: 36px;
            line-height: 36px;
            border-radius: 18px 18px 18px 18px;
            background: linear-gradient(to right, #ff7214, #f23e3b);
            font-size: 20px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
    }
  }
  .businessDesc {
    position: relative;
    width: 710px;
    //height: 870px;
    border-radius: 20px 20px 20px 20px;
    margin: 30px auto 300px;
    background: rgba(255, 255, 255, 0.3);
    overflow: auto;
    .yewuSm {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 254px;
      height: 53px;
      background: url("~@/assets/images/newRights/flow/yewuSm.png") no-repeat;
      background-size: 100%;
      z-index: 2;
    }
    .tapNav {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 690px;
      height: 54px;
      //background: rgba(255, 255, 255, 0.3);
      z-index: 2;
    }
    .descTap {
      position: relative;
      width: 34%;
      height: 100%;
      line-height: 53.03px;
      border-radius: 0 0 25px 25px;
      background: linear-gradient(to right, #fd9e24, #fd6827);
      font-size: 34.59px;
      text-align: center;
      color: #ffffff;
      font-weight: 900;
      margin: 0 auto;
      .square {
        width: 20px;
        height: 100%;
        position: absolute;
        top: 0;
        background: #fd9e24;
      }
      .square2 {
        width: 20px;
        height: 100%;
        position: absolute;
        top: 0;
        background: #fd6827;
      }
      .square::after {
        content: "";
        width: 110%;
        height: 110%;
        background: #fcf9f9;
        position: absolute;
        bottom: -5px;
        right: 0px;
      }
      .square2::after {
        content: "";
        width: 110%;
        height: 110%;
        background: #fcf9f9;
        position: absolute;
        bottom: -5px;
        right: -1px;
      }
      .squareTop {
        left: -20px;
      }
      .squareBtm {
        right: -20px;
      }
      .squareTop::after {
        border-radius: 0 70% 0 0;
      }
      .squareBtm::after {
        border-radius: 70% 0 0 0;
      }
    }
    .businessContent {
      overflow: auto;
      box-sizing: border-box;
      padding: 78px 28px 50px 22px;
      width: 690px;
      //height: 850px;
      border-radius: 20px 20px 20px 20px;
      opacity: 0.9;
      background: #fcf9f9;
      margin: 10px auto;
      .businessAgree {
        width: 640px;
        height: 650px;
        overflow: hidden;
        font-size: 26px;
        line-height: 40px;
      }
      .total {
        height: auto !important;
      }
      .showMore {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 50px auto 0;
        .ioc {
          border: 10px solid transparent;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top-color: #646668;
          margin: 5px 0 0 5px;
        }
      }
    }
  }
  .otherEquity {
    width: 100%;
    height: 194px;
    background: url("~@/assets/images/newRights/flow/otherBg.png") no-repeat;
    background-size: 100%;
    margin: 30px auto 0;
  }

  .content_title {
    font-size: 0.36rem;
    font-weight: bold;
    color: #a2420a;
    text-align: center;
    &::before {
      display: inline-block;
      content: "";
      width: 58px;
      height: 47px;
      background: url("../../assets//images/newRights/left_star.png") no-repeat;
      background-size: 100%;
      margin-right: 10px;
    }
    &::after {
      display: inline-block;
      content: "";
      width: 34px;
      height: 42px;
      background: url("../../assets//images/newRights/right_star.png") no-repeat;
      background-size: 100%;
      margin-left: 10px;
    }
  }
  .content {
    width: 100%;
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: center;
    // margin-top: -210px;
    //flex-direction: column;
    //权益
    .rightsAndInterests {
      width: 682px;
      height: 182px;
      background: url("~@/assets/images/newRights/quanyi@2x.png") no-repeat;
      background-size: 100% auto;
      padding: 10px 0 0 0;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 34px;
      font-weight: bold;
      color: #943a04;
      position: relative;

      .left {
        margin-left: 50px;
        height: 69px;
      }

      .right {
        margin-right: 70px;
        height: 69px;
      }

      span {
        margin: 0 5px 10px;
        font-size: 53.55px;
      }

      b {
        font-size: 40px;
      }

      .text {
        width: 630px;
        height: 40px;
        background: url("~@/assets/images/newRights/7@2x.png") no-repeat;
        background-size: 100% auto;
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;

        img {
          width: 21px;
          height: 21px;
          margin: 0 10px;
        }

        marquee {
          flex: 1;
          font-size: 20px;
          color: #cc7a48;
        }

        .announcement {
          width: 70px;
          height: 30px;
          border-radius: 15px 15px 15px 15px;
          background: rgba(207, 142, 106, 1);
          font-size: 20px;
          font-weight: 500;
          color: white;
          text-align: center;
          line-height: 30px;
          margin: 0 8px;
        }
      }
    }

    //优惠
    .preferential {
      width: 680px;
      height: 533px;
      background: url("~@/assets/images/newRights/bg@2x(1).png") no-repeat;
      background-size: 100% auto;
      margin-top: 20px;
      padding-top: 88px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      div {
        width: 576px;
        height: 205px;
        position: relative;
        &::after {
          content: "";
          display: inline-block;
          background: url("~@/assets/images/newRights/limit_icon.png") no-repeat;
          background-size: 100%;
          height: 75px;
          width: 75px;
          position: absolute;
          top: -15px;
          right: -15px;
        }
      }

      img {
        width: 576px;
        height: 205px;
      }
    }

    //特权
    .privilege {
      width: 680px;
      height: 619px;
      background: url("~@/assets/images/newRights/privilege_bg.png") no-repeat;
      background-size: 100% auto;
      margin-top: 31px;
      padding: 88px 15px 0px 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .privilege_item {
        width: 100%;
        background-size: 100% 100%;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 20px;
        position: relative;
        .privilege_item_btn {
          background: #f34b45;
          padding: 8px 10px;
          width: 130px;
          color: #fff;
          font-size: 28px;
          text-align: center;
          border-radius: 30px;
        }
        .privilege_item_subscript {
          position: absolute;
          right: 0px;
          top: 0px;
          width: 100px;
          background-image: linear-gradient(90deg, #f09956 0%, #d47047 100%);
          color: #fff;
          border-radius: 0 10px 0 10px;
          font-size: 25px;
          text-align: center;
          padding: 2px 0;
        }
      }
    }
    .valueDiscounts {
      width: 680px;
      height: 256px;
      background: url("~@/assets/images/newRights/valueDiscounts_bg.png")
        no-repeat;
      background-size: 100% auto;
      margin-top: 20px;
      padding: 88px 10px 20px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .valueDiscounts_item {
        width: 320px;
        height: 140px;
        background-size: 100%;
        padding: 85px 30px 15px 160px;
        box-sizing: border-box;
      }
      .valueDiscounts_item_btn {
        background: #f34b45;
        padding: 5px 0px;
        width: 120px;
        color: #fff;
        font-size: 22px;
        text-align: center;
        border-radius: 30px;
      }
    }
  }
  .rulerText {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 35px 35px;
    box-sizing: border-box;
    .bottomText {
      margin: 50px 0 100px 0;
    }
    .title {
      display: flex;
      align-items: center;
      //margin-bottom: 33px;
      height: 40px;
      justify-content: center;
      padding: 20px 0;
      div {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #f48961;
        margin: 0 5px;
      }
      p {
        font-weight: 700;
        font-size: 32px;
        color: #f8652f;
      }
    }
    .contents {
      width: 100%;
      padding: 30px 35px 0;
      box-sizing: border-box;
      font-size: 26px;
      line-height: 39px;
      //font-weight: 700;
      color: #824702;
      background: rgb(255, 255, 255);
      border-radius: 15px;

      h2 {
        text-align: center;
        margin-top: 10px;
        font-weight: 700;
      }
      h3 {
        line-height: 45px;
        margin-top: 15px;
        margin-bottom: 10px;
      }
      p {
        line-height: 39.5px;
        text-align: justify;
      }
      .table {
        margin: 0 -25px;
        #customers {
          font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
          width: 100%;
          border-collapse: collapse;
        }
        #customers td,
        #customers th {
          font-size: 22px;
          border: 1px solid #824702;
          text-align: center;
          //padding: 3px 7px 2px 7px;
        }
        #customers th {
          font-size: 20px;
          text-align: center;
          padding: 5px 5px;
          color: #824702;
        }
      }
      .check_text {
        text-align: center;
        margin: 30px 0;
        cursor: pointer;
        font-weight: bold;
      }
      .red {
        color: red;
      }
    }
  }

  .bottomOpenBtn {
    width: 681px;
    height: 105px;
    //position: -webkit-sticky;
    //position: sticky; /*兼容*/
    position: fixed;
    margin: 0 auto;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);

    img {
      width: 100%;
      height: 100%;
    }
  }
  .line {
    //position: relative;
    &:before {
      //content: "";
      //position: absolute;
      //width: 428px;
      //height: 121px;
      //background: url("~@/assets/images/newRights/open.gif") no-repeat;
      //background-size: 100% auto;
      //top: -125px;
      //left: 277px;
    }
  }
}

.loading-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1000;
  border: 999px solid transparent;

  img {
    width: 1.2rem;
  }
}
.pop {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.openBtn {
  box-sizing: border-box;
  padding: 26px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 236px;
  background: #ffffff;
  z-index: 3;
  .btn {
    position: relative;
    width: 724px;
    height: 154px;
    background: url("~@/assets/images/newRights/flow/btn_new.png") no-repeat;
    background-size: 100%;
    margin: 0 auto;
    .clickNav {
      position: absolute;
      right: 40px;
      top: 20px;
      width: 230px;
      height: 70px;
    }
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    color: #a7a6a6;
    margin: 12px 0 0 0;
    img {
      width: 16px;
      height: 16px;
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
  background: rgba(2, 2, 2, 0.9);
  z-index: 999;
  .toast1 {
    position: relative;
    width: 587px;
    height: 622px;
    background: url("~@/assets/images/newRights/flow/toast1.png") no-repeat;
    background-size: 100%;
    .title {
      font-size: 38px;
      text-align: center;
      color: #001534;
      letter-spacing: 8px;
      margin: 183px auto 0;
      font-weight: 700;
    }
    .text1 {
      color: #59636e;
      font-size: 26px;
      text-align: center;
      letter-spacing: 3px;
      margin: 60px auto 10px;
      font-weight: 600;
    }
    .text2 {
      color: #59636e;
      font-size: 26px;
      text-align: center;
      letter-spacing: 3px;
      font-weight: 600;
    }
    .btn {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      min-width: 300px;
      height: 74px;
      line-height: 74px;
      border-radius: 12px 12px 12px 12px;
      background: #3778e7;
      font-size: 30px;
      text-align: center;
      color: #ffffff;
      letter-spacing: 3px;
    }
  }
  .toast2 {
    position: relative;
    width: 587px;
    height: 664px;
    background: url("~@/assets/images/newRights/flow/toast2.png") no-repeat;
    background-size: 100%;
    .title {
      font-size: 38px;
      text-align: center;
      color: #001534;
      letter-spacing: 8px;
      margin: 94px auto 0;
      font-weight: 700;
    }
    .noPrize {
      font-size: 26px;
      text-align: center;
      color: #59636e;
      margin: 200px auto 0;
    }
    .prizeItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 26px;
      text-align: left;
      color: #59636e;
      box-sizing: border-box;
      padding: 0 35px;
      margin: 16px 0 0 0;
      .prizeBtn {
        width: 116px;
        height: 36px;
        line-height: 36px;
        border-radius: 18px 18px 18px 18px;
        background: #3778e7;
        font-size: 22px;
        text-align: center;
        color: #ffffff;
      }
    }
    .prizeTip {
      font-size: 20px;
      text-align: center;
      color: #59636e;
      margin: 50px 0 0 0;
    }
    .close {
      position: absolute;
      top: -80px;
      right: 10px;
    }
  }
  .toast3 {
    box-sizing: border-box;
    padding: 98px 48px 0;
    position: relative;
    width: 587px;
    height: 896px;
    background: url("~@/assets/images/newRights/flow/rulesBg.png") no-repeat;
    background-size: 100%;
    .title {
      font-size: 38px;
      text-align: center;
      color: #001534;
      letter-spacing: 8px;
      margin: 0 auto 50px;
      font-weight: 700;
    }
    .content {
      width: 492px;
      height: 515px;
      overflow: scroll;
      line-height: 1.8;
    }
    .btn {
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      min-width: 300px;
      height: 74px;
      line-height: 74px;
      border-radius: 12px 12px 12px 12px;
      background: #3778e7;
      font-size: 30px;
      text-align: center;
      color: #ffffff;
      letter-spacing: 3px;
    }
  }
  .toast4 {
    position: relative;
    width: 587px;
    height: 860px;
    background: url("~@/assets/images/newRights/flow/sweepQr.png") no-repeat;
    background-size: 100%;
    .body_qr {
      position: absolute;
      top: 365px;
      left: 50%;
      transform: translateX(-50%);
      width: 315px;
      height: 315px;
    }
    .downLoad {
      width: 50px;
      height: 50px;
      position: absolute;
      bottom: 80px;
      right: 120px;
    }
    .close {
      top: 900px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .close {
    position: absolute;
    top: -80px;
    right: 10px;
    width: 44px;
    height: 44px;
    background: url("~@/assets/images/newRights/flow/closeIcon.png") no-repeat;
    background-size: 100%;
  }
  .sweepGif {
    width: 100%;
    height: 1624px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .shareImg {
    position: absolute;
    right: 20px;
    top: 50px;
    width: 510px;
    height: 770px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.isShareBg {
  background: rgba(2, 2, 2, 0.7) !important;
}
.loadingBox {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1000;
  border: 999px solid transparent;
  background: #f2f2f2;

  img {
    width: 120px;
  }
}
</style>
<style lang="less">
.md-toast .md-toast-text {
  white-space: normal !important;
  text-overflow: unset !important;
  overflow: auto !important;
}
</style>
