<template>
  <div class="rules_container">
    <p><span class="yellow_bg">活动名称:</span>省钱包限时开通有礼</p>
    <p><span class="yellow_bg">活动时间:</span>即日起-2023年12月31日，如有调整以本页面规则说明为准。</p>
    <p><span class="yellow_bg">活动对象:</span>仅限已开通省钱包10元版业务的江苏移动用户参加，实际以系统校验结果为准（无线公话、无线商话、全额代付家庭副号除外）。</p>
    <p><span class="yellow_bg">活动细则:</span></p>
    <p>（1）活动期间，成功开通“省钱包10元版”的客户，每月业务账单出账成功后，可至本活动页领取10元话费，<span class="red">每月一次，单用户最多可领三次，</span>累计最高可领30元话费。<span class="red">10元话费权益<span class="yellowBg">每日10:00开抢</span>，每日限量50份，领完即止。</span>因数量有限，不保证客户必定可成功领取，以页面提示为准，如当日未能成功领取，可于次日再尝试领取。</p>
    <p>（2）您需使用办理业务的江苏移动号码登录活动页，主动领取奖品，当月奖品仅可在当月领取，不可延续至次月，过期未领取视为放弃，后续不可补领。</p>
    <template v-if="moreFlag">
      <p>（3）点击“立即领取”后，如当月业务账单已出，奖品将于领取之日起3个工作日内发放。具体到账时间以“中国移动APP-充值中心-充话费-充值记录”为准。此话费不可转赠，不可兑换现金，赠送的话费不提供发票。</p>
      <p>（4）本活动为江苏移动为省钱包客户提供的免费回馈，因平台、系统、网络以及客户自身原因等可能会产生无法正常参与活动、无法打开页面、奖品发放失败或延迟等问题，江苏移动秉承客户之上的原则将积极为客户解决，但客户不得以相关问题为依据要求江苏移动承担任何责任。</p>
      <p>（5）每个号码仅有一次活动参与机会。</p>
      <p>（6）根据活动开展情况，江苏移动有权随时对活动内提供的赠品内容、数量、获取规则及活动开展时间进行调整，实际活动内容以页面实时展现内容为准，客户有权根据活动内容选择参与或不参与。</p>
      <p>（7）客户在参与活动期间不得办理过户、停机、销号、离网、携号转网等，领取前需保持手机号码状态正常，停机、预销户等异常状态将无法领取，或不符合某项优惠的领取资格，或某项优惠已达到领取上限等因素，造成奖励无法到账，移动公司不予补发。赠送话费可能会与客户现有的营销活动、业务等产生冲突导致无法领取成功，实际以领取时系统校验结果为准。</p>
      <p>（8）参与活动的号码状态必须正常，报停的客户需先报开，欠停的客户、后付费有历史欠费的客户，须缴清欠费后，才能参加本活动。</p>
      <p>（9）凡参与本活动者，视为接受活动的所有规则，如发现甲方通过不正当途径参加活动，我公司有权终止该客户参加本次活动，并取消获奖资格。中国移动江苏公司有权在法律允许范围内对活动规则作出适当调整。</p>
      <p>（10）每月最后一天21：30至次日凌晨1：00为系统升级维护时间，可能导致业务无法办理或话费领取失败，请避开该时段办理或领取，由此造成的奖励无法到账，移动公司不予补发。</p>
      <p>（11）其他活动未尽事宜，详询10086。</p>
    </template>
    <div class="more_btn" v-if="!moreFlag" @click="moreClick">展开更多</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            moreFlag: false
        };
    },
    methods: {
        moreClick() {
            this.moreFlag = true;
        }
    }
};
</script>

<style lang="less" scoped>
.rules_container {
  font-size: 26px;
  color: #9a3f0c;
  font-weight: 500;
  line-height: 1.6;
  .yellow_bg {
    background-image: linear-gradient(
      to left,
      #ffffff 0%,
      #fef8dc 30%,
      #f7ebac 100%
    );
  }
  .more_btn {
    text-align: center;
    padding-top: 30px;
    &::after {
      content: "";
      display: inline-block;
      background: url("../../../assets/images/saveMoneyActive/more_btn.png")
        no-repeat;
      background-size: 100%;
      width: 21px;
      height: 12px;
      padding-bottom: 2px;
      margin-left: 5px;
    }
  }
}
.red{
  color: red;
}
.yellowBg{
  background: rgb(255, 255, 94);
}
</style>
