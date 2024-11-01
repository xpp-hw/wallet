<template>
    <div class="agreement" v-show="pufaKhXuzhi.isShow">
        <div class="info">
            <div class="title">
                <span class="titleTxt">上海浦东发展银行个人开户申请书</span>
                <p class="titleTxt">开户须知</p>
            </div>
            <div class="content">
                <div style="text-indent: 2em;margin-bottom:1rem;">
                    <p>一、本须知适用于申请人在上海浦东发展银行（以下简称“浦发银行”）开立各类存折、存单和借记卡业务。</p>
                    <p>二、申请人自愿在浦发银行开立个人银行账户的，须遵守国家法律法规、政策及浦发银行的相关业务规章制度的有关规定。</p>
                    <p>三、申请人开立个人银行账户时须保证向浦发银行提供符合《个人存款账户实名制规定》（中华人民共和国国务院令）【第285号】）及其他相关规定的所需资料，并保证据实、完整、合法地填写开户申请书及其他相关资料。如由他人代为开立个人银行账户，则代办人须保证向浦发银行提供的账户申请人证件及其他相关文件均符合《个人存款账户实名制规定》及其他相关规定，保证在开户申请书填写的账户申请人资料和代办人资料均真实、有效、完整、合法，同时还须保证账户申请人同意和遵守申请书和开户须知的规定。</p>
                    <p>四、申请人达到我行贵宾客户等级要求时可申请相应等级贵宾卡。</p>
                    <p>五、申请人同意浦发银行对个人账户的管理或其他服务收取服务费用，具体收费内容和收费标准以浦发银行对外通告为准。</p>
                    <p>六、申请人同意浦发银行有权对账户余额为零的借记卡、各类存折、存单予以单方面销户且无需预先通知申请人。</p>
                    <p>七、申请人于开户时预留的个人资料发生变动时，应及时书面通知浦发银行进行修改，因申请人未及时通知浦发银行，造成业务不能如期办理及其他后果的，申请人自行承担相关责任。</p>
                    <p>八、申请人同意借记卡、活期一本通的人民币活期账户自动设置为个人结算账户，当有外币资金入账时，借记卡、活期一本通将自动开立相应外币活期储蓄账户。申请人保证其对个人结算账户以及外币活期储蓄账户的使用遵守中国人民银行、国家外汇管理局等金融监管机构有关账户管理的规定，并定期与浦发银行核对账务。</p>
                    <p>九、借记卡、各类存折、存单遗失、被盗或密码遗忘、泄露的，申请人应及时向浦发银行申请挂失，申请人在申请挂失（含口头挂失）前账户资金被支取，由申请人自行承担相关责任。</p>
                    <p>十、申请人在银行进行余额查询、打印时，所显示的余额可能包含申请人因使用P0S消费等行为已经发生支付的金额（因商户结算周期等原因，消费金额尚未被扣除）。</p>
                    <p>十一、申请人应妥善保管账号、密码等资料，不得将本人账户转借给他人使用。因申请人本人资料泄露或将本人账户转借他人使用产生的风险，损失及其他后果均由申请人自行承担。</p>
                    <p>十二、浦发银行仅通过我行特别号码95528、106980095528、106905695528向客户发送所有短信通知和其他信息，申请人务必注意识别，以防范虚假短信。</p>
                    <p>十三、因通讯异常及其他不可抗力因素或申请人原因造成的风险和损失，浦发银行不承担责任。</p>
                    <p>十四、在申请人开立于浦发银行的任何账户的存续期间，若发现申请人涉嫌参与洗钱、恐怖融资或扩散（大规模杀伤性武器）融资等活动，浦发银行有权对该账户采取中止服务和／或销户等措施，且不承担任何责任。洗钱、恐怖融资或扩散（大规模杀伤性武器）融资等活动，是指联合国安理会、反洗钱金融行动特别工作组、中国、美国、欧盟等国际组织或国家认定的洗钱、恐怖融资或扩散（大规模杀伤性武器）融资行为。</p>
                    <p>十五、申请人通过开立于浦发银行的任何账户所办理的业务，如涉嫌参与前述洗钱、恐怖融资或扩散（大规模杀伤性武器）融资等活动，导致浦发银行向申请人提供服务时遭受损失的，申请人应向浦发银行承担赔偿责任。赔偿责任的范围包括但不限于浦发银行由于申请人的活动被境内外司法机关裁判承担的损失，境内外政府机构或监管机关对于浦发银行为申请人的活动提供服务所进行的处罚以及浦发银行为应对上述情形采取措施所产生的一切费用和损失等。</p>
                    <p>十六、借记卡支取（付）方式默认为凭密码交易，申请人开户后自动享有ATM存取款、商户消费等功能，享有通过电话银行、网上银行、ATM及自助终端渠道查询账户、修改密码、口头挂失等服务；凭密码支取的存折账户也自动享有通过电话银行、网上银行、ATM、自助终端等自助渠道查询账户、修改密码、口头挂失等服务。申请人同意，如浦发银行对个人账户推出新的其他服务功能，除浦发银行规定需要申请人到柜台办理确认外，申请人已开立的账户均自动享有该项服务功能。</p>
                    <p>十七、申请人已完全知悉并接受浦发银行借记卡章程及领用协议的全部内容，并保证遵守浦发银行借记卡章程及领用协议的规定。申请人如违反借记卡章程及领用协议的任何规定,浦发银行有权根据借记卡章程及领用协议的规定对其采取相应措施。</p>
                    <p>十八、申请人同意借记卡、定期一本通、定期存单中的整存整取定期存款到期后由本行代为自动转存。</p>
                    <p>十九、申请人所持借记卡每日在ATM机上提款的最高限额和次数按监管机构的规定执行。浦发银行有权根据监管机构的政策和规定、自身业务发展的需要、风险控制以及申请人的实际情况等因素对限额进行调整，届时浦发银行将通过网站（www.spdb.com.cn）或以网点公告等形式进行提示以供申请人查询，自公告发出后即视已通知到申请人，浦发银行无需书面通知申请人。</p>
                    <p>二十、申请人办理本行借记卡联名卡时，除遵守以上各条款之外，还须遵守浦发银行有关联名卡的管理规定，并同意浦发银行将其申请资料提供给联名单位。</p>
                    <p>二十一、说明：①中国内地税收居民：定义请见国家税务总局网站（http://www.chinatax.gov.cn/aeoi_index.html）的相关定义。②非居民：是指中国内地税收居民以外的个人。其他国家（地区）税收居民身份认定规则及纳税人识别号相关信息请参见国家税务总局网站（http://www.chinatax.gov.cn/aeoi_index.html）。③军人、武装警察无需填写税收居民身份声明。</p>
                    <p>二十二、在浦发银行为申请人提供产品或服务所必需的情形下，申请人自愿同意并授权浦发银行在符合法律法规及监管规定的前提下采集、传输、处理、保存申请人的姓名、证件号码、银行卡号、手机号等相关个人信息，主要用于为申请人提供开立各类存折、存单和借记卡等产品或服务，以及保障申请人账户及交易的安全。我行将按照法律法规和监管规定采取措施，保障申请人的个人信息安全。</p>
                    <p>申请人如对本须知或相关服务存在疑问、投诉、建议或对个人信息提出查询、更正、删除请求，可拨打浦发银行电话95528、或登录官方网站（www.spdb.com.cn）、或通过手机银行APP、或通过浦发银行各营业网点咨询或反映。受理申请人的问题后，我行将在15日内给予答复。</p>
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
    name: 'pufaKhXuzhi',
    components: {
        mdHeader
    },
    computed: {
        ...mapState(['pufaKhXuzhi'])
    },
    methods: {
        returnAgree() {
            this.$store.commit('pufaKhXuzhi', false);
        },
        closeAgree() {
            this.$store.commit('pufaKhXuzhi', false);
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
