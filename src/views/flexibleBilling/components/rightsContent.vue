<template>
  <div class="rights-content">
    <!-- <template #rightsTop> -->
    <div class="rights-top">
      <div class="left-user">尊敬的{{ noSensitiveMobile }}用户</div>
      <div class="right-rights" @click="$router.push(`/flexibleBilling/${rightsType}/myRights`)">我的权益</div>
      <div class="top-content">
        {{ rights.topContent }}
      </div>
    </div>
    <!-- </template> -->
    <div class="rights-ticket">
      <!-- <template #ticket> -->
      <div
        class="ticket"
        :style="{
          backgroundImage: `url(${rights.ticketImgUrl})`,
        }"
      ></div>
      <!-- </template> -->
    </div>
    <div class="rights-details">
      <!-- <template #details> -->
      <div
        class="details"
        :style="{
          backgroundImage: `url(${rights.detailsImgUrl})`,
          height: isLook ? 'auto' : '7rem',
        }"
      >
        <div
          class="details-content"
          :style="{
            background: isLook ? '#fff' : '',
            height: isLook ? 'auto' : '4.8rem',
            paddingBottom: isLook ? '0.5rem' : '',
          }"
        >
          <!-- T3 权益 -->
          <div v-if="rightsType == 'T3Rights'" class="T3-details">
            <p class="content-title">
              T3出行打车100元券包，价值约
              100元，用户可随机获得以下组合券。具体如下：
            </p>
            &nbsp;&nbsp;
            <p>（1）95折最高减22元1张</p>
            &nbsp;&nbsp;
            <p>（2）88折最高减10元2张（6-24点使用）</p>
            &nbsp;&nbsp;
            <p>（3）9折最高减18元1张（19-24点&10-17点使用）</p>
            &nbsp;&nbsp;
            <p>（4）92折最高减20元2张（10-17点使用）</p>
            <p>具体请以实际到账内容为准。</p>
            <p>1、权益有效期</p>
            <p>
              权益预计将于领取后24小时内下发，有效期为7天或15天（具体以T3出行小程序或APP内实际收到的券页面展示为准），权益内容以实际到账为准。
            </p>
            <p>2、使用说明</p>
            <p>
              方法1：用户支付宝搜索“T3出行”小程序，点击左上角头像【个人中心】-钱包-查看【优惠券】。
            </p>
            <p>
              方法2：用户下载T3出行app，点击左上角头像【个人中心】-查看【优惠券】。
            </p>
            <p>3、客服联系方式</p>
            <p>
              客服咨询热线950520。在线客服联系：T3出行小程序左上角【我的】-【在线客服】。
            </p>
            <p>4、温馨提示</p>
            &nbsp;&nbsp;
            <p>（1）每个用户限领取1份，先到先得，派完即止。</p>
            &nbsp;&nbsp;
            <p>
              （2）若您近期在其他渠道已领取过类似优惠，将无法下发成功，敬请谅解。
            </p>
            &nbsp;&nbsp;
            <p>（3）权益内容以T3app内实际到账权益为准。</p>
            &nbsp;&nbsp;
            <p>（4）每笔订单限用一张优惠券，不可叠加使用。</p>
          </div>
          <!-- 永辉 权益 -->
          <div v-else-if="rightsType == 'yhRights'" class="yh-details">
            <p class="content-title">永辉超市20元券包</p>
            <p>
              权益包括如下：8折（封顶5元）全场券，满39减5元菜券，满59减10元肉券，可在永辉生活APP使用。
            </p>
            <p>*具体请以实际到账内容为准。</p>
            <p>1、权益有效期</p>
            <p>
              权益预计将于领取后24小时内，下发至领取权益的手机号码，有效期30天（具体以永辉生活显示为准），不可叠加使用。
            </p>
            <p>2、使用说明</p>
            &nbsp;&nbsp;
            <p>
              （1）用户将收到权益下发短信，复制兑换码，登录永辉生活APP/小程序，进入【我的】-【红包礼券】-【兑换优惠券】-【请输入兑换码】，粘贴兑换码点击【兑换】即可；
            </p>
            &nbsp;&nbsp;
            <p>
              （2）购物券可在“永辉生活”的永辉红标超市、永辉绿标超市、永辉到家业态线上下单使用。永辉生活优惠券兑换码不兑换现金、丢失不挂失、不补办，请妥善保管兑换码，切勿泄露。
            </p>
            &nbsp;&nbsp;
            <p>
              （3）超市产品有每日订购上限（同款产品限1笔，不同款产品限3笔），已达上限将暂时无法订购，请您24小时后再试；超市会不定时进行权益产品的上下架调整，可购买产品以页面展示为准。
            </p>
            <p>3、温馨提示</p>
            &nbsp;&nbsp;
            <p>（1）每个用户限领取1份，先到先得，派完即止。</p>
            &nbsp;&nbsp;
            <p>
              （2）若您近期在其他渠道已领取过类似优惠，将无法下发成功，敬请谅解。
            </p>
            &nbsp;&nbsp;
            <p>
              （3）一个订单只能使用一张购物券，不能叠加。购物券领取到账户中后不得提现，不得转赠他人，不得为他人付款，不得拆分使用。
            </p>
            <p>4、客服联系方式</p>
            <p>
              客服咨询热线：400-010-0017（服务时间为09:00-22:00，节假日无休）。
            </p>
          </div>
        </div>
        <div v-if="!isLook" class="lookImg" @click="isLook = true"></div>
      </div>
      <!-- </template> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "RightsContent",
  data() {
    return {
      isLook: false,
    };
  },
  inject: ["rightsType", "rights"],
  props: {
    noSensitiveMobile: {
      type: String,
      required: true,
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
.rights-content {
  .rights-top {
    position: relative;
    width: 750px;
    height: 281px;
    background: url("~@/assets/images/flexibleBilling/rights-top.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    font-family: OPPOSans-M;
    font-weight: 500;
    overflow: hidden;
    .left-user {
      position: absolute;
      top: 20px;
      left: 24px;
      width: 340px;
      height: 40px;
      background-image: linear-gradient(90deg, #fff0c5 25%, #f5f6d8 80%);
      border-radius: 20px;
      font-size: 24px;
      color: #666666;
      line-height: 40px;
    }
    .right-rights {
      display: inline-block;
      position: absolute;
      top: 16px;
      right: 0;
      width: 128px;
      height: 40px;
      opacity: 0.64;
      background: #ffffff;
      border-radius: 20px 0 0 20px;
      font-family: OPPOSans-M;
      font-weight: 500;
      font-size: 24px;
      color: #666666;
      text-align: center;
      line-height: 40px;
    }
    .top-content {
      margin-top: 187px;
      font-size: 30px;
      color: #222222;
      letter-spacing: 3px;
      line-height: 40px;
    }
  }
  .rights-ticket {
    padding: 40px 25px;
    .ticket {
      width: 700px;
      height: 180px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .rights-details {
    padding: 0 20px;
    .details {
      position: relative;
      width: 710px;
      // height: 700px;
      padding-top: 100px;
      background-repeat: no-repeat;
      background-size: 710px 700px;
      box-sizing: border-box;
      .details-content {
        padding: 0px 35px;
        border-radius: 0 0 0.2rem 0.2rem;
        color: #333333;
        font-size: 28px;
        font-face: SourceHanSansCN;
        font-weight: 500;
        line-height: 43px;
        letter-spacing: 0;
        paragraph-spacing: 0;
        text-align: justify;
        overflow: hidden;
        .content-title {
          font-weight: 700;
        }
      }
      .lookImg {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        width: 170px;
        height: 36px;
        background: url("~@/assets/images/flexibleBilling/look.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>