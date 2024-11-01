<template>
    <div ref="cont" class="cont">
        <!-- <div>
            <div class="top">“话费宝”活动参与协议</div>
            <p>
                <span
                    class="main">欢迎您与中国移动通信集团江苏有限公司（以下简称“江苏移动”或者“我们”）订立服务协议（以下简称“本协议”）。需要特别提醒您的是，我们对重要条款进行了加粗以便您重点阅读和关注。请您确认签署本协议之前，务必充分阅读本协议所有条款，尤其是加粗部分。</span>
                    如您对本协议内容及页面提示信息有疑问，请您暂停后续操作，您可以通过电话客服（10086）等方式咨询，以便我们为您解答和说明。 如您通过页面点击或我们认可的其他方式确认本协议即表示您已同意本协议。
            </p>
            <p>
                <span class="main">1、本活动限江苏移动手机用户参与，非实名制客户、M-Free卡客户、20元封顶、CMWAP免费类客户、 金卡快捷通、快捷通、随E行、无线固话、无线通、专业卡、合并付费副号码、号码销户及停机客户除外。</span>
            </p>
            <p>
                <span class="main">2、钱包账户余额不得超过2000元人民币。</span>
            </p>
            <p>
                <span class="main" style="font-weight: bold;color: red">3、</span>
                <b style="font-weight: bold;color: red">为了便于您参与“话费宝”活动，</b>
                <span class="main"
                      style="font-weight: bold;color: red">需要您同意授权我们每日查询一次您在中国移动江苏APP上开立的钱包账户余额信息，以便于我们根据您的钱包账户日终（当日23:30—次日03:00）余额计算出赠送给您的话费金额和流量，余额达1000元以上赠送话费金额按照您日终余额年化不低于3%测算，余额不足1000元不给予话费及流量赠送</span>
                      。我们在处理您的个人信息前，向您告知下列事项：
            </p>
            <p class="list">（1）个人信息处理者的名称和联系方式：中国移动通信集团江苏有限公司，10086；</p>
            <p class="list">（2）您的个人信息的处理目的、处理方式，处理的个人信息种类、保存期限：处理目的是为了计算赠送的话费金额、处理方式是查询、处理的个人信息种类是钱包账户余额信息、保存期限是为实现处理目的所必要的最短时间；</p>
            <p class="list">（3）您行使权利的方式和程序：您依法享有法律法规规定的权利，如您觉得权益受损，可以依法行使；</p>
            <p class="list">（4）您的钱包账户余额信息是我们计算赠送话费的基础，如不查询将无法计算出赠送话费金额。我们将对您的钱包账户余额信息采取严格保护措施，不会对您的个人权益产生不利影响。</p>
            <p class="list">前款规定事项发生变更的，我们会将变更部分通过公告或客户端消息等方式告知您。</p>
            <p>
                <span
                    class="main">4、确认参与“话费宝”活动后，从T+2日开始，在活动期间您可以在江苏移动掌厅APP-【移动钱包】-【话费宝】页面领取我们赠送给您的权益，其中话费权益领取有效期为当月，流量权益领取有效期为当日。</span>
            </p>
            <p>
                <span class="main">5、领取成功后，权益将于3个工作日内发放至您钱包开户手机号对应的优惠账本，</span>
                <span class="main" style="font-weight: bold;color: red">到账后立即生效，当月底失效。其中赠送的话费不可转账、提现、开票，不可用于话费购物或参加其他活动；所赠流量不可滚存、兑换、共享或赠送他人使用；赠送流量符合国内移动数据流量封顶规则。</span>
            </p>
            <p>
                <span class="main">6、在领取权益当月，您无法办理手机号销户、过户、停机业务。</span>
            </p>
            <p>
                7、如我们对本协议进行变更，我们将通过公告或客户端消息等方式予以通知，该变更自通知载明的生效时间开始生效。若您无法同意变更修改后的协议内容，您有权停止使用相关服务；双方协商一致的，也可另行变更相关服务和对应协议内容。
            </p>
            <p class="list">本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本协议产生的争议，均应依照中华人民共和国法律予以处理，并由被告住所地人民法院管辖。</p>
        </div> -->
        <div class="xieyiText" v-html="xieyiContent.replace(/px/g,'')"></div>
        <div :class="{canClick:isCanclick}" class="btn" @click="hasRead">我已阅读并知晓</div>
    </div>
</template>

<script>
import { Toast } from 'mand-mobile';
import api from '@/common/apiUrls';

export default {
    data() {
        return {
            isCanclick: true,
            isBottom: false,
            isBackSelect: false,
            isRadio: false,
            textBox: {},
            xieyiContent: ''
        };
    },
    created() {
        this.isRadio = this.$route.query.isRadio;
    },
    mounted() {
        this.queryXieyi();
        this.isBackSelect = this.$route.query.isBackSelect || false;
        this.hasread = this.$route.query.hasread || false;
        if (!this.hasread) {
            Toast.info('请滑动文字到底阅读完协议');
            this.isCanclick = false;
        }
        this.handleScroll();
        this.$nextTick(() => {
            this.textBox = this.$refs.cont;
            const boxHeight = this.textBox.clientHeight;
            const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (boxHeight < windowHeight) {
                this.isBottom = true;
            }
        });
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        queryXieyi() {
            api.huataiAgreement({
                businessCode: "hfbhdcyxy",
                businessType: 'WHOLE'
            })
            .then((res) => {
                this.xieyiContent = res.content;
            });
        },
        handleScroll() {
            // 获取滚动时的高度,可视区的高度,滚动条的总高度
            // 变量scrollTop是滚动条滚动时，距离顶部的距离
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 变量windowHeight是可视区的高度
            const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            // 变量scrollHeight是滚动条的总高度
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if (scrollTop + windowHeight + 10 >= scrollHeight) {
                // 把距离顶部的距离加上可视区域的高度 等于或者大于滚动条的总高度就是到达底部
                this.isCanclick = true;
            }
        },
        hasRead() {
            if (this.isCanclick) {
                this.$router.replace({
                    name: 'newDescription',
                    query: {
                        hasread: this.isCanclick,
                        isRadio: this.isRadio,
                        ...this.$route.query
                    }
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
/deep/.xieyiText {
    font-size: 30px;
    line-height: 1.5;
    margin-bottom: 30px;
    p {
        margin-top: 5px;
    }
}
.cont {
    padding: 0.3rem 0 1.2rem 0.3rem;
    line-height: 0.37rem;
    word-break: break-all;

    .top {
        text-align: center;
        font-weight: 600;
        font-size: 0.35rem;
        line-height: 0.8rem;
    }

    .main {
        font-weight: 600;
    }

    p {
        font-size: 0.3rem;
        line-height: 0.4rem;
        margin-bottom: 0.1rem;
    }

    .list {
        text-indent: 2em;
    }

    p:last-of-type {
        margin-bottom: 1rem;
    }

    .btn {
        width: 6.9rem;
        height: 0.82rem;
        font-size: 0.36rem;
        line-height: 0.82rem;
        color: #fff;
        background: #9bc9f3;
        text-align: center;
        border-radius: 0.08rem;
        position: fixed;
        bottom: 20px;
    }

    .canClick {
        background: #238FF2;
    }
}
</style>
