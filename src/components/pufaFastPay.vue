<template>
    <div class="agreement" v-show="pufaFastPay.isShow">
        <div class="info">
            <div class="title">
                <span class="titleTxt">上海浦东发展银行个人网上快捷支付业务客户服务协议</span>
            </div>
            <div class="content">
                <div style="text-indent: 2em;margin-bottom:1rem;">
                    <p>为明确双方权利和义务，本着平等互利的原则，就上海浦东发展银行（以下简称“浦发银行”或“银行”）向个人客户（以下简称“客户”）提供个人网上快捷支付业务相关事宜达成本协议，以资共同遵守。</p>
                    <p><strong>第一条 业务定义</strong></p>
                    <p>下列用语在本协议中的含义为：</p>
                    <p>“个人银行账户”，指客户在浦发银行开立的借记卡、准信用卡、信用卡、活期一本通、电子账户等个人人民币结算账户，浦发银行规定不允许用于消费的银行账户除外。</p>
                    <p>“快捷支付”指客户提供姓名、银行卡号、手机号码、身份证件类型及号码、信用卡有效期等信息，由银行完成身份验证后，建立客户指定个人银行账户与客户在支付机构申请的支付账户或其在一般电子商户指定会员账户（“支付机构”、“一般电子商户”和“基金销售机构”等以下合称“商户”）的签约关系，客户授权银行按照商户的交易指令从客户签约的个人银行账户上主动扣划资金的一种支付方式。签约和使用渠道包括但不限于：计算机、手机、电话、掌上电脑、电视、自助终端等设备，具体以银行及商户提供的快捷支付业务约定为准。</p>
                    <p>“手机号码”指客户与银行签约“及时语”服务的手机号码，如未签约及时语则为客户开立个人银行账户时预留信息中的手机号码。</p>
                    <p><strong>第二条 权利和义务</strong></p>
                    <p>一、客户应确保用于"快捷支付"签约的个人银行账户为本人开立本人所有，保证在签约过程中提供的信息真实、准确、完整、有效，确保支付行为符合法律法规和监管机构规定且未侵犯任何第三方合法权益，否则因此造成银行或任何第三方损失的，由客户负责赔偿并承担全部法律责任。</p>
                    <p><strong>二、客户知晓因银行提供服务所需，同意并授权将签约过程中所填写的包括但不限于姓名、银行卡号、手机号码、身份证件类型及号码、信用卡有效期等要素用于身份验证，并同意将指定银行卡号与商户开立的商户账号建立签约关系。</strong>银行及商户承诺对客户签约信息保密，但法律法规或监管机构另有要求的除外。<strong>银行保留变更上述要素作为验证标准的权利。</strong></p>
                    <p>三、“快捷支付”签约成功后，即视为客户授权银行按照商户的交易指令从签约个人银行账户上主动扣划资金，无需经客户同意。由此导致的所有争议均由客户与商户之间协商解决，与银行无关。</p>
                    <p>四、客户承诺并同意签约使用的个人银行账户至少开通一种由银行提供的即时通知服务，包括但不限于手机短信通知、微信通知等。同时客户承诺相关即时通知的手机号码、微信号等关联信息为本人所有，否则因此所造成客户的损失，银行不承担责任。</p>
                    <p>五、客户应妥善保管个人银行账户开户户名、开户类型、与之相关的证件类型及证件号码、手机号码、固定电话、通信地址等相关信息，如遗失个人银行账户或泄露上述相关信息，客户应及时通知银行并办理挂失或销户等相关手续，减少可能发生的损失。<strong>挂失或销户前的损失，以及因客户</strong>个人银行账户<strong>密码、商户账号密码、商户支付密码和手机动态密码、数字证书、U-KEY、银行卡泄露或丢失等所致损失，由客户自行承担。</strong></p>
                    <p>六、客户可通过银行网上银行、手机银行等渠道自助查询业务签约情况并对借记卡账户支付限额进行管理。任何情况下，客户设置的支付限额不应超过银行及商户设置的最大支付限额，如实际支付金额大于支付限额，银行有权拒绝执行交易指令。客户同意银行保留根据业务发展需要设置或变更最大支付限额的权利。</p>
                    <p>七、客户不得利用快捷支付业务进行套现、虚假交易、洗钱等违反法律法规和监管规定的行为，且有义务配合银行进行相关调查。如若客户拒绝配合进行相关调查或银行认为存在或涉嫌虚假交易、洗钱、套现或任何其他非法活动、欺诈或违反诚信原则的行为、或违反本协议约定的，银行有权采取以下一种、多种或全部措施：</p>
                    <p>（1）中止或终止提供本协议项下服务；</p>
                    <p>（2）终止本协议；</p>
                    <p>（3）取消客户的用卡资格。</p>
                    <p>若因客户的前述行为造成银行或任何第三方损失的，客户应负责赔偿并承担全部法律责任。</p>
                    <p>八、银行若因以下原因未执行商户的交易指令，无须承担任何责任：</p>
                    <p>（1）客户签约个人银行账户存款余额不足或授信额度不足；</p>
                    <p>（2）客户签约个人银行账户内资金被依法冻结或扣划；</p>
                    <p>（3）客户签约个人银行账户非正常状态；</p>
                    <p>（4）客户未按照银行的有关规定正确操作；</p>
                    <p>（5）客户的行为出于欺诈或其它非法目的；</p>
                    <p><strong>第三条&nbsp;&nbsp;不可抗力</strong></p>
                    <p>对于由于不可抗力因素（包括但不限于自然灾害、意外事故、战争等）或系统故障、供电故障、通讯故障或网络故障等其他非银行所能控制的事件引起的本业务功能丧失、延迟等以及监管部门政策变化等造成银行无法或延后履行或部分履行本协议的有关义务的，银行不承担责任。</p>
                    <p><strong>第四条法律适用条款</strong></p>
                    <p>本协议适用中华人民共和国法律（为本协议之目的，在此不包含中国香港特别行政区、中国澳门特别行政区和中国台湾地区）法律；法律无明文规定的，可适用通行的金融惯例。</p>
                    <p>本协议是银行的其他既有协议和约定的补充而非替代文件，如本协议与其他既有协议和约定不一致的，应以本协议为准。</p>
                    <p><strong>第五条 差错和争议的解决</strong></p>
                    <p>银行仅为客户提供安全可靠的支付结算服务，依据商户提供的交易指令实施资金扣划。对于因购买商品或服务而产生的一切关于商品、服务及费用扣收的争议均由客户与商户自行协商解决，与银行无关。</p>
                    <p>双方在履行本协议的过程中，如发生争议，应尽量协商解决。协商不成的，任何一方均应向银行所在地有管辖权的人民法院提起诉讼，双方另有约定的除外。</p>
                    <p><strong>第六条 协议的终止</strong></p>
                    <p>如因签约卡/折注销、补（换）卡/折等任何原因导致卡/折号变更，已建立的“快捷支付”签约关系自动终止。客户也可通过商户网站或浦发银行网上银行、手机银行主动发起解除签约关系的申请。</p>
                    <p>“快捷支付”签约关系一旦解除，本协议即告终止。协议终止前商户已发送银行处理的交易指令仍有效，客户应承担相应后果。</p>
                    <p>银行提供的服务受客户签约个人银行账户状态的制约，如该卡由于挂失、止付、有效期到期等原因不能正常使用，相关服务自动中止。客户签约个人银行账户状态恢复正常时，银行重新提供相应服务。若客户注册个人银行账户因换卡等原因发生卡号变更，则相关服务自动终止。如需延续服务，客户须使用新卡号进行注册签约。</p>
                    <p><strong>第七条 协议的效力和生效</strong></p>
                    <p><strong>本协议自客户确认接受即视为签署并生效。</strong></p>
                    <p>银行有权变更、暂停本协议项下服务，有权修改、终止本协议，并于执行前通过银行网站等官方渠道进行公告。公告期内如有疑议客户可随时解除协议，客户在公告执行后继续办理个人网上支付业务的，视同接受有关本协议变更的内容。</p>
                    <p><strong>第八条 其它</strong></p>
                    <p>上述条款中未尽事项适用《上海浦东发展银行电子银行章程》《上海浦东发展银行电子银行个人客户服务协议》中的约定。客户确认，在签署本协议前，已就全部条款进行了详细地阅读，对本协议的全部条款均无疑义。客户使用银行电子银行服务即视为客户已了解并完全接受《上海浦东发展银行电子银行章程》《上海浦东发展银行电子银行个人客户服务协议》。</p>
                </div>
            </div>
        </div>
        <md-button class="checkProtocol" @click="closeAgree" id="A09">确认</md-button>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import { mapState } from 'vuex';

export default {
    name: 'pufaFastPay',
    components: {
        mdHeader
    },
    computed: {
        ...mapState(['pufaFastPay'])
    },
    methods: {
        returnAgree() {
            this.$store.commit('PUFAFASTPAY', false);
        },
        closeAgree() {
            this.$store.commit('PUFAFASTPAY', false);
        }
    }
};
</script>

<style scoped lang="less">
.agreement {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 999;
    height:100%!important;
    margin-top:0!important;
    padding: .5rem 0.74rem 0.6rem!important;
    .info{
        height:81%;
        overflow-y: scroll;
        margin-top:.4rem;
    }
    p{
        font-size: 0.26rem;
        color: #666666;
        line-height: 0.4rem;
    }
    .title{
        background-color: #FFF;
        text-align: center;
        position: relative;
        font-size: 0.36rem;
        color: #333;
        font-weight: 700;
        margin-bottom: 0.2rem;
        .arrowIco{
            position:absolute;
            left:36px;
            top:50%;
            transform:translateY(-50%);
        }

        .titleTxt{
            color: #13252E;
            font-size: 36px;
        }
    }
    .content{
        margin: 30px;
        font-size: 26px;
        line-height: 40px;
        .serviceProtocol{
            font-size: 36px;
            color: #333333;
            font-weight: 600;
            line-height: 50px;
            text-align: center;
            margin-bottom: 20px;
        }
        .serviceContent{
            text-indent: 72px;
        }
        .smallTitle{
            font-size: 26px;
            text-align: left;
            font-weight: 600;
            color: #333333;
            line-height: 40px;
        }
        .secondTitle{
            font-size: 26px;
            font-weight: 600;
            text-align: left;
            color: #333333;
            line-height: 40px;
        }
        .company{
            font-size: 26px;
            font-weight: 600;
            text-align: right;
        }
        .serviceTime{
            font-size: 26px;
            font-weight: 600;
            text-align: right;
            margin-right: 104px;
        }
        .whiteBlock{
            width: 100%;
            height: 100px;
        }
        .checkProtocol{
            position: fixed;
            width: 700px;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}
.md-button.block{
    margin:.3rem auto;
}
</style>
