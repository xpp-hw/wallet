<template>
    <div v-show="bcmSign.isShow" class="bcmSign">
        <div ref="info" class="info" @scroll="onscroll">
            <!-- 交通银行太平洋借记卡章程 -->
            <div id="a1" class="title-item">
                <span class="titleTxt">交通银行股份有限公司标准个人电子支付业务开通协议</span>
            </div>
            <div class="content">
                <div style="text-indent: 2em; margin-bottom: 1rem">
                    <p style="color: black;text-align: center"><strong>请客户认真阅读本协议全文，尤其是带有▲▲标记的条款。</strong></p>
                    <p style="color: black;text-align: center;margin-bottom: 0.2rem"><strong>如有疑义，请及时拨打交通银行客户服务热线95559咨询。</strong></p>
                    <p>
                        交通银行太平洋个人借记卡、准贷记卡或贷记卡(以下简称“太平洋卡”)持卡人（以下称“您”）就开通标准电子支付（以下简称“电子支付”）业务与您拟开通电子支付业务的太平洋个人借记卡、准贷记卡或贷记卡的开户网点所属交通银行分行（以下称“银行”）达成本协议。
                    </p>
                    <p>
                        <strong>第一条  定义</strong>
                    </p>
                    <p>
                        1.1“电子支付”指您通过互联网向卖方购买商品或服务，通过卖方或第三方支付服务商跳转银行电子支付平台（以下简称“支付平台”，网址为：pbank.95559.com.cn或pay.95559.com.cn）办理的交易款项在线支付业务。该业务由卖方或第三方支付服务商向银行发送含交易款项的具体订单信息，您在支付平台输入银行显示并要求您输入的支付验证要素，经银行验证通过后，银行按订单信息载明的交易金额，从您的太平洋个人借记卡、准贷记卡或贷记卡中将交易款项划转至卖方或第三方支付服务商指定帐户。本项协议涉及的电子支付业务种类仅指您需进入支付平台，并在支付平台内通过包括但不仅限于卡交易密码及核心要素的验证后，方可完成的电子支付业务。您开通其他种类支付业务需另行签署相关协议。
                    </p>
                    <p>
                        1.2 “卖方”指通过互联网出售商品或提供服务的一方。
                    </p>
                    <p>
                        1.3“第三方支付服务商”指为您与卖方的商品或服务交易提供交易资金划拨渠道的一方。
                    </p>
                    <p>
                        1.4“验证要素”分为签约验证要素和支付验证要素。签约验证要素是指您签署本协议、申请开通电子支付业务时银行需要验证的信息，包括但不限于您本人的太平洋个人借记卡、准贷记卡或贷记卡卡号、卡有效期（适用于准贷记卡或贷记卡）、卡校验码（适用于准贷记卡或贷记卡）、卡交易密码、动态密码或电子签名、您的有效身份证件或身份证明文件类型、证件号码等；支付验证要素是指您在使用电子支付功能支付交易款项时，银行需验证的信息，包括但不限于您已开通电子支付业务的太平洋个人借记卡、准贷记卡或贷记卡银行卡号、卡有效期（适用于准贷记卡或贷记卡）、动态密码或电子签名、卡交易密码等。
                    </p>
                    <p>
                        办理签约或具体支付所需的具体验证要素以支付平台页面当时显示并要求您输入或选择的信息为准。
                    </p>
                    <p>
                        在签约及支付环节，动态密码或电子签名为核心验证要素（以下简称“核心要素”）。
                    </p>
                    <p>
                        1.5“动态密码”是指由银行编制并发送至您在银行留存手机号码的一种一次性密码。
                    </p>
                    <p>
                        1.6电子签名是指数据电文中以电子形式所含、所附用于识别签名人身份并表明签名人认可其中内容的数据。 
                    </p>
                    <p>
                        1.7数据电文是指以电子、光学、磁或者类似手段生成、发送、接收或者储存的信息。
                    </p>
                    <p>
                        <strong>
                            ▲▲第二条  规则
                        </strong>
                    </p>
                    <p>
                        2.1您通过支付平台或个人网银签署本协议，申请为指定太平洋卡开通电子支付功能的，签约验证要素是银行确认您身份的唯一依据，全部签约验证要素通过验证后，银行即为您指定的太平洋卡开通电子支付功能。
                    </p>
                    <p>
                        2.2凡在支付平台通过全部支付验证要素验证后进行的付款操作，均视同您本人所为，所产生的电子交易信息记录为该项交易的有效凭证。对银行验证全部支付验证要素无误并已执行的支付指令，您不得要求变更或撤销。您应承担由此产生的一切后果。
                    </p>
                    <p>
                        2.3凡卡片交易密码当日连续错误输入次数超过银行规定次数的，该卡将被锁定，无法继续使用。请您携带该卡与开卡时的有效身份证件前往银行营业网点柜面办理解锁手续。
                    </p>
                    <p>
                        2.4您应当妥善保管您的有效身份证件或身份证明文件、太平洋卡、卡交易密码、手机（如有）及其内置的用户身份识别卡（SIM/UIM卡）和识别密码（PIN码）、验证要素等身份认证要素。因保管不当导致PIN码、验证要素被他人知悉对您造成的一切损失由您自行承担。
                    </p>
                    <p>
                        2.5银行有权单方面设置或调整电子支付交易限额，具体交易限额以银行门户网站、自助银行、网上银行网页当时发布的《交通银行股份有限公司个人电子银行交易规则》（包括其后修改及替代，以下简称“《交易规则》”）为准。您可在银行规定的最高支付限额之内，登录我行网银自行设置或调整您太平洋卡的支付交易限额。在任何情况下，支付金额不得超过银行或您设置的电子支付交易限额。
                    </p>
                    <p>
                        2.6银行仅提供您与卖方之间商品或服务交易款项的支付结算服务。您与卖方、第三方支付服务商任意两方间因商品/服务交易（包括但不限于商品/服务质量、商品交付或服务提供等）发生的争议均由您与相关方自行协商解决，银行对此不承担任何责任。
                    </p>
                    <p>
                        2.7您办理电子支付业务应遵守适用的法律法规、监管规定，不将电子支付业务用于法律法规禁止或限制交易的商品或服务的购买、虚假交易、洗钱、套现或任何其他非法活动，不应利用本业务侵害任何第三方的合法权益。您有义务无条件按银行要求配合进行相关调查。
                    </p>
                    <p>
                        2.8银行通过银行门户网站、自助银行、网上银行网页等渠道发布的《交易规则》和业务操作提示（包括其后的修改和替代）是本协议的组成部分。您办理电子支付业务应遵守本协议及该等《交易规则》、操作提示。
                    </p>
                    <p>
                        2.9银行有权单方面变更、暂停本协议项下电子支付服务，有权单方面修改、终止本协议（包括相关《交易规则》和业务操作提示），并于执行前通过银行门户网站进行公告。相关公告经发布视为您已收到。您在公告执行后继续办理电子支付业务的，视同接受协议及相关服务内容的修改及变更。
                    </p>
                    <p>
                        2.10您应按银行公布的收费要求按时足额支付电子支付服务费及其他各类相关费用。银行有权单方面变更收费项目、标准、收取方式等收费要求。银行公告变更收费要求的，您在公告执行后继续办理电子支付业务的，视同接受变更内容。
                    </p>
                    <p>
                        2.11对于因下述任一情况导致对您的任何损害及产生的任何损失，银行不承担任何责任：
                    </p>
                    <p>
                        （1）银行因以下任一情况未及时正确扣划交易款项：指定太平洋卡账户余额或额度不足或账户内资金被依法冻结或扣划；指定太平洋卡处于被挂失、止付、注销等非正常状态；银行收到的交易信息未载明交易金额或信息不明确、不完整、存在乱码或有其他不符合银行规定的情形；拟支付金额大于银行规定的或您设置的支付限额；由于网络、电讯连接、系统设备的有效性、稳定性和安全性发生问题（包括但不限于不可抗力、网络流量、通讯故障、停电、电脑病毒或黑客攻击等非银行所能控制的原因）；因卖方或第三方支付服务商的原因导致相关服务中断或延迟。
                    </p>
                    <p>
                        （2）银行对银行系统进行调试、升级、维护或改造，并因此暂停提供本协议项下电子支付业务功能。
                    </p>
                    <p>
                        （3）银行根据本协议约定单方面终止本协议。
                    </p>
                    <p>
                        2.12如您违反本协议约定，银行有权采取以下一种、多种或全部措施：
                    </p>
                    <p>
                        （1）暂停提供本协议项下电子支付业务功能；
                    </p>
                    <p>
                        （2）暂停提供您与银行签订的其他全部电子支付业务开通协议项下电子支付服务；
                    </p>
                    <p>
                        （3）单方面终止本协议； 
                    </p>
                    <p>
                        （4）单方面终止您与银行签订的其他全部电子支付业务开通协议；
                    </p>
                    <p>
                        （5）取消您的太平洋卡用卡资格。
                    </p>
                    <p>
                        <strong>第三条  协议的生效和终止</strong>
                    </p>
                    <p>
                        3.1本协议自您在本页面点击“确认开通”后生效。
                    </p>
                    <p>
                        3.2任何一方均有权终止本协议：
                    </p>
                    <p>
                        （1）如您需终止本协议，请您通过银行柜面或个人网银办妥相关电子支付功能的关闭手续；
                    </p>
                    <p>
                        （2）如您违反本协议约定，银行有权不经通知立即终止本协议；
                    </p>
                    <p>
                        （3）除前款约定外，银行需终止本协议的，本协议自银行公告后终止。
                    </p>
                    <p>
                        本协议终止后，银行在终止前所收到的支付请求仍有效。银行不退还已收取的服务费及其他相关费用（如有）。 
                    </p>
                    <p>
                        <strong>第四条  法律适用和争议解决</strong>
                    </p>
                    <p>
                        本协议的生效、履行及解释均适用中国法律（为本协议之目的，不包括香港、澳门特别行政区法律和台湾地区法律）。本协议项下争议向银行所在地有管辖权的人民法院起诉。
                    </p>
                    <p>
                       <strong>
                            您在本页面点击"确认开通"，视同您已通读本协议全部条款，您签署本协议时对所有内容无疑问异议，理解协议条款尤其是带▲▲标记条款的含义及其法律后果。
                       </strong> 
                    </p>
                </div>
            </div>
        </div>
        <md-button
            id="A09"
            :inactive="disab"
            class="checkProtocol"
            @click="closeAgree"
        >我已阅读并知晓
        </md-button>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import * as store2 from '@/common/localstore';
import { mapState } from 'vuex';

export default {
    props: ['siver'],
    name: 'bcmSign',
    components: {
        mdHeader
    },
    data() {
        return {
            disab: true
        };
    },
    computed: {
        ...mapState(['bcmSign'])
    },
    mounted() {
        if (this.siver) {
            document.getElementById(`a${this.siver}`)
                .scrollIntoView();
        } else {
            document.getElementById('a1')
                .scrollIntoView();
        }
        if (store2.default.get('signxieyi') == true) {
            this.disab = false;
        } else {
            this.$toast.info('请滑动文字到底阅读完协议');
        }
    },
    methods: {
        returnAgree() {
            this.$store.commit('bcmSign', false);
        },
        closeAgree() {
            this.$store.commit('bcmSign', false);
            store2.default.set('signxieyi', true);
            this.$emit('isFalseSign', false);
        },
        onscroll() {
            const hgt = this.$refs.info.scrollHeight;
            const clihgt = this.$refs.info.clientHeight;
            const scrHgt = this.$refs.info.scrollTop;
            // eslint-disable-next-line radix
            if (parseInt(hgt - scrHgt - 100) < clihgt) {
                this.disab = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.bcmSign {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 999;
    height: 100% !important;
    margin-top: 0 !important;
    padding: 0.5rem 0.74rem 0.6rem !important;

    .info {
        height: 81%;
        overflow-x: hidden;
        overflow-y: scroll;
        margin-top: 0.4rem;
    }

    p {
        font-size: 0.26rem;
        color: #666666;
        line-height: 0.4rem;
    }

    .title-item {
        background-color: #fff;
        text-align: center;
        position: relative;
        font-size: 0.36rem;
        color: #333;
        font-weight: 700;
        margin-bottom: 0.2rem;

        .arrowIco {
            position: absolute;
            left: 36px;
            top: 50%;
            transform: translateY(-50%);
        }

        .titleTxt {
            color: #13252e;
            font-size: 36px;
        }
    }

    .content {
        margin: 30px;
        font-size: 26px;
        line-height: 40px;

        .serviceProtocol {
            font-size: 36px;
            color: #333333;
            font-weight: 600;
            line-height: 50px;
            text-align: center;
            margin-bottom: 20px;
        }

        .serviceContent {
            text-indent: 72px;
        }

        .smallTitle {
            font-size: 26px;
            text-align: left;
            font-weight: 600;
            color: #333333;
            line-height: 40px;
        }

        .secondTitle {
            font-size: 26px;
            font-weight: 600;
            text-align: left;
            color: #333333;
            line-height: 40px;
        }

        .company {
            font-size: 26px;
            font-weight: 600;
            text-align: right;
        }

        .serviceTime {
            font-size: 26px;
            font-weight: 600;
            text-align: right;
            margin-right: 104px;
        }

        .whiteBlock {
            width: 100%;
            height: 100px;
        }

        .checkProtocol {
            position: fixed;
            width: 700px;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}

.md-button.block {
    margin: 0.3rem auto;
}
</style>
