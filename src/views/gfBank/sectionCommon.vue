<!--
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-05-14 11:23:01
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-05-14 17:16:43
 * @FilePath: \wallet\src\views\gfBank\sectionCommon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="sectionCommon">
        <div>
            <div class="section_nav">
                <img src="@/assets/images/gfBank/left_bg.png" alt="">
                <p>活动资格领取</p>
                <img src="@/assets/images/gfBank/right_bg.png" alt="">
            </div>
            <div class="section_card" v-for="item in textList1">
                <div class="ask_nav">
                    <div class="ask">问</div>
                    <p>{{item.title}}</p>
                </div>
                <div class="answer_nav">
                    <div class="answer">答</div>
                    <p>
                        <span style="font-weight: 600;color: #FE5433;">{{item.bold}}</span>
                        <span>{{item.text}}</span>
                    </p>
                </div>
            </div>
            <div class="section_nav">
                <img src="@/assets/images/gfBank/left_bg.png" alt="">
                <p>消费判断</p>
                <img src="@/assets/images/gfBank/right_bg.png" alt="">
            </div>
            <div class="section_card" v-for="item in textList2">
                <div class="ask_nav">
                    <div class="ask">问</div>
                    <p>{{item.title}}</p>
                </div>
                <div class="answer_nav">
                    <div class="answer">答</div>
                    <p>
                        <span>{{item.text1}}</span>
                        <span style="color: #FE5433;">{{item.red}}</span>
                        <span>{{item.text2}}</span>
                    </p>
                </div>
            </div>
            <div class="section_nav">
                <img src="@/assets/images/gfBank/left_bg.png" alt="">
                <p>奖励返现</p>
                <img src="@/assets/images/gfBank/right_bg.png" alt="">
            </div>
            <div class="section_card" v-for="item in textList3">
                <div class="ask_nav">
                    <div class="ask">问</div>
                    <p>{{item.title}}</p>
                </div>
                <div class="answer_nav">
                    <div class="answer">答</div>
                    <p>
                        <span v-if="item.bold" style="font-weight: 600;color: #FE5433;">{{item.bold}}</span>
                        <span>{{item.text}}</span>
                    </p>
                </div>
            </div>
            <div class="section_nav">
                <img src="@/assets/images/gfBank/left_bg.png" alt="">
                <p>优惠券领取</p>
                <img src="@/assets/images/gfBank/right_bg.png" alt="">
            </div>
            <div class="section_card">
                <div class="ask_nav">
                    <div class="ask">问</div>
                    <p>如何领取/使用25元车主服务优惠券？</p>
                </div>
                <div class="answer_nav">
                    <div class="answer">答</div>
                    <div style="flex: 1;">
                        <p>
                            领取路径：登录“发现精彩”APP-车生活-车主卡专区-加油返现/绿色出行优惠。
                        </p>
                        <p style="margin-top: 0.1rem;"> 
                            使用路径：进入服务兑换专区后，选择所需购买服务，并在调取“广发收银台”页面后勾选使用25元车主服务优惠券，即可享受立减优惠券。具体可选车主服务内容以实际页面展示为准。
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            textList1: [
                {
                    title: "1.领取活动资格、消费以及加油的时间是否有严格的先后顺序？",
                    bold: "没有严格先后顺序。",
                    text: "客户当月任意时间完成以下条件，均可享受对应档次加油/绿色出行返现奖励：（1）当月登录“发现精彩APP-车主卡专区领取资格；（2）当月持活动指定卡种累计消费/分期金额达标。"
                },
                {
                    title: "2.领取活动资格后，月度累计非加油类消费、加油类消费必须要用活动指定卡种消费吗?",
                    bold: "需要。",
                    text: "月度累计非加油类消费、加油类消费必须使用活动指定卡种付款消费；若客户同时持有多张活动指定卡种，且分别满足活动条件，将合并计算返现奖励上限。"
                },
                {
                    title: "3.华为车主版客户若在华为端(华为钱包)完成资格领取，是否还需要在“发现精彩”APP重新领取资格?",
                    bold: "无需重复领取。",
                    text: "华为车主版持卡客户可通过以下方式二选一领取资格：（1）华为钱包-huawei card -权益-达标礼-加油返现；（2）“发现精彩”APP-“广发华为卡专区”-华为卡车主版加油返现。"
                },
            ],
            textList2: [
                {
                    title: "1.如何判断加油类消费?",
                    text1: "加油类消费通过消费统计时交易描述判定，其中消费统计时交易描述中包含",
                    red: "“石油”“加油”“油站”“石化”“海油”“壳牌”",
                    text2: "可判定为充电类消费，具体以银行系统判断为准。"
                },
                {
                    title: "2.如何判断充电类消费？",
                    text1: "充电类消费通过消费统计时交易描述判定，其中消费统计时交易描述中包含",
                    red: "“星星充电”“特来电”“E充电”“国网电动”",
                    text2: "可判定为充电类消费，具体以银行系统判断为准。"
                },
                {
                    title: "3.如何判断高速通行类消费?",
                    text1: "高速通行类消费通过银行ETC供应商支持开通的支付端特约商户编码或消费统计时交易描述判定，其中消费统计时交易描述中包含",
                    red: "“ETC”“联合电子服务”“高速”“通行宝”“粤通卡”",
                    text2: "可判定为高速通行类消费，具体以银行系统判断为准。"
                },
                {
                    title: "4.如何查询消费交易描述（加油类/充电类/高速通行类）?",
                    text1: "客户可通过“发现精彩”APP-“我的”“账单查询”查询消费交易描述，包含上述交易描述关键字即可判定为符合条件。",
                    red: "",
                    text2: ""
                },
                {
                    title: "5.如何判断计积分消费?",
                    text1: "积分计算规则以广发银行网站公布为准。不计积分行业请登录广发信用卡官网(card.cgbchina.com.cn)-“服务指南”-“办卡指南”一“了解信用卡”-查询“鸿利积分划”。",
                    red: "",
                    text2: ""
                },
               
            ],
            textList3: [
                {
                    title: "1.奖励什么时候到账？如何查询？",
                    text: "活动返现奖励将于达标次月底前，以免还款签账额的形式返还至客户参与此活动的卡片账户。客户达标后，将收到“发现精彩APP或“广发信用卡”官方微信的奖励消息，返现奖励将在5个工作日内返还至客户的账户，具体可通过“发现精彩”APP-“我的”“账单查询”查询。"
                },
                {
                    title: "2.免还款签账额如何使用?",
                    text: "免还款签账额不可提现、不可转让，可用于抵扣客户名下的车主金卡本期欠款,若免还款签账额抵扣后仍有剩余，将自动抵扣下期欠款。"
                },
                {
                    title: "3.持有活动指定卡片的主卡及附属卡，分别有加油交易，如何计算返现奖励?",
                    text: "加油返现活动主附卡合并计算返现，返现奖励统一导入到主卡账户。主附卡合计返还免还款签账额不超过活动返现金额上限。"
                },
                {
                    title: "4.哪些消费不可享加油返现或绿色出行优惠活动?",
                    text: "（1）撤销、退货、风险商户交易如不计积分商户交易等消费，均不可参与加油返现或绿色出现优惠活动；（2）0费率分期订单、退货分期订单或提前还款分期订单均不可参与分期享加油返现活动。"
                },
                {
                    title: "5.加油享10%返现活动中的非加油类计积分消费，是否可以累积到首周周五享10%加油返现?",
                    bold: "可累计。",
                    text: "客户满足活动一非加油类计积分消费1000元的交易额度，可同步进入活动二非加油类计积分消费2000元的交易额度中。"
                },
               
            ],
        };
    },
    methods: {
    }
};
</script>

<style lang="less" scoped>
.sectionCommon {
    margin-top: -200px;
}
.section_nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 35px 0 20px 0;
    p {
        font-size: 32px;
        text-align: left;
        color: #508791;
        letter-spacing: 6px;
        margin: 0 24px 0 24px;
        font-weight: 600;
    }
    img {
        width: 145px;
        height: 12px;
    }
}
.section_card {
    width: 701px;
    border-radius: 16px 16px 16px 16px;
    background: #ffffff;
    margin: 12px auto 0;
    box-sizing: border-box;
    padding: 19px 18px 28px 17px;
    .ask_nav {
        display: flex;
        p {
            flex: 1;
            color: #26333C;
            font-weight: 600;
            font-size: 25px;
            text-align: left;
            line-height: 30px;
        }
    }
    .answer_nav {
        display: flex;
        margin: 16px 0 0 0;
        p {
            flex: 1;
            color: #4E5256;
            font-weight: 600;
            font-size: 25px;
            text-align: left;
            line-height: 30px;
        }
    }
    .ask {
        width: 34px;
        height: 34px;
        line-height: 34px;
        border-radius: 8px 8px 8px 8px;
        background: #508791;
        font-size: 21px;
        text-align: center;
        color: #FFFFFF;
        margin-right: 15px;
    }
    .answer {
        width: 34px;
        height: 34px;
        line-height: 34px;
        border-radius: 8px 8px 8px 8px;
        background: #12CFF4;
        font-size: 21px;
        text-align: center;
        color: #FFFFFF;
        margin-right: 15px;
    }
}
</style>