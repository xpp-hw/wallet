<template>
   <div class="contains">
        <div class="mainContain">
            <div class="problemItem" v-for="(item,index) in dataList" :key="index">
                <div class="navigation" @click="containSwitch(index)">
                    <div class="left">
                        <span class="number">{{index+1}}</span>
                        <span class="title">{{item.title}}</span>
                    </div>
                    <div class="right">
                        <img v-show="!item.flag" src="../../assets/images/arrows.png" alt="">
                        <img class="downArrow" v-show="item.flag" src="../../assets/images/arrows.png" alt="">
                    </div>
                </div>
                <div class="details" v-show="item.flag" v-html="item.contain">

                </div>
            </div>
            <div class="foot_oldBank" style='text-align:center' v-if="ylBankList.length > 0">
              <p @click="$router.push({'name':'myYLBanks'})">原银行卡账户解绑入口</p>
            </div>
        </div>
    </div>
</template>

<script>
import mdHeader from '@/components/mdHeader';
import * as store2 from '@/common/localstore';
import api from '@/common/apiUrls';
// import api from '@/common/apiUrls';
export default {
    name: 'problemDetail',
    components: {
        mdHeader
    },
    data() {
        return {
            ylBankList: [],
            dataList: [
                {
                    title: '什么是移动钱包？',
                    contain: '移动钱包是江苏移动与各银行、第三方支付机构合作，由零钱（和包支付账户）、银行卡（和包账户绑定的银行卡）、电子账户（银行Ⅱ、Ⅲ类户）以及用户权益组成，账户免费开立并使用。',
                    flag: false
                },
                {
                    title: '什么是零钱？',
                    contain: '零钱账户是中移动金融科技有限公司提供的支付账户，可提供充值、提现及转账服务。',
                    flag: false
                },
                {
                    title: '什么是电子账户？',
                    contain: ' 电子账户是用户开立的银行电子账户（Ⅱ、Ⅲ类户），由江苏移动与合作银行联合提供服务，账户归属银行管理，由江苏移动开展基于账户的活动，可进行支付、充值、提现。',
                    flag: false
                },
                {
                    title: '什么是银行卡？',
                    contain: '银行卡是用户和包账户绑定的银行借记卡或者信用卡，可以直接通过绑定银行卡进行支付，用户可以进行添加和解绑，路径：首页仪表盘【钱包】-【银行卡】-【我的银行卡】。',
                    flag: false
                },
                {
                    title: '什么是话费宝？',
                    contain: ' 话费宝是移动钱包-电子账户的增值服务，用户开通话费宝以后，移动公司将根据用户零钱账户余额为用户赠送话费，余额越多送的越多，存入2000元余额，每月最高可领10元话费，开通后第三天即可登录掌厅领取话费。',
                    flag: false
                },
                {
                    title: '电子账户如何充值/提现？',
                    contain: '登录掌厅APP-首页仪表盘【钱包】-【电子账户】，点击电子账户，进入电子账户详情页进行充值提现，可左右滑动切换账户。',
                    flag: false
                },
                {
                    title: '电子账户充值失败怎么办？',
                    contain: '方案一：请客户确保电子账户下绑定的银行卡状态正常，通过绑定卡手机银行APP向电子账户转账。转账步骤：<br>1、查询电子账号：登录掌厅APP-首页仪表盘【钱包】-【零钱】-我的电子账户-【查看完整卡号】-【复制】卡号。 <br>2、转账：打开绑定卡手机银行，如您绑定的银行卡为中国银行，则打开中国银行手机银行APP转账，收款人姓名为本人姓名，收款人账号为第一步复制账号，输入转账金额，点击转账按步骤完成即可。 <br>方案二：新增绑定卡：登录掌厅APP-首页仪表盘【钱包】-【电子账户】-【绑卡管理】-【添加银行卡】，绑定成功后在我的银行卡页面点击该卡设置为默认卡，返回我的电子账户点击【充值】选择该卡充值即可。',
                    flag: false
                },
                {
                    title: '电子账户充值支持哪些银行？有限额吗？',
                    contain: '所有成功绑定的储蓄卡都可以为电子账户充值，绑定储蓄卡往电子账户充值无限额限制，但需要确保电子账户余额不超过2000元。',
                    flag: false
                },
                {
                    title: '电子账户提现失败怎么办？',
                    contain: '请您不要担心，您的资金不会丢失，如果您提现过程中报错，可根据错误信息联系电子账户归属银行处理；如果您的资金已从电子账户扣款，未入账绑定储蓄卡，可联系绑定卡归属银行进行查询。',
                    flag: false
                },
                {
                    title: '电子账户支付限额是多少？',
                    contain: '每一个电子账户余额不能超过2000元，支付日累计限额2000元，年累计限额50000元。',
                    flag: false
                },
                {
                    title: '电子账户冻结怎么办？',
                    contain: '可能是您在银行留存信息不全导致账户状态为中止所有业务，或者开通电子账户后超半年无资金交易，请前往银行网点或者下载银行手机银行维护信息。',
                    flag: false
                },
                {
                    title: '电子账户如何销户？',
                    contain: '请确认您的账户归属银行，各银行电子账户销户流程如下：<br>招商银行账户：在掌厅APP将账户资金提现，确保钱包账户余额0，登录招商银行手机银行APP，进入【我的】/【银行卡】/【联名钱包】，点击【掌厅钱包】/【注销】，按照页面提示进行销户操作即可；<br>浦发银行账户：登录掌厅APP-首页仪表盘【钱包】-【查看全部账户】-【设置】-【钱包销户】，根据页面提示销户即可。（如您已解约，请点击【去开户】按钮按提示签约后再销户）',
                    flag: false
                },
                {
                    title: '零钱账户绑定的银行卡账户如何解绑？',
                    contain: '登录掌厅APP-首页仪表盘【钱包】-【银行卡】，点击银行卡，进入我的银行卡账户详情页，点击已绑定的银行卡账户进行解绑流程；',
                    flag: false
                },
                {
                    title: '零钱账户如何销户？',
                    contain: '零钱账户本质和包支付账户，需要在和包客户端操作，路径如下：下载或登录和包app-》我的-》设置按钮-》账户与安全-》自助销户，按照页面提示进行注销即可。',
                    flag: false
                },
                {
                    title: '原银行卡账户如何解绑？',
                    contain: '登录掌厅APP-首页仪表盘【钱包】-【钱包财富】，页面滑至底部，点击【常见问题】，进入页面底部显示【原银行卡账户解绑入口】，点击进入页面选择已绑定的银行卡账户进行解绑流程；',
                    flag: false
                }
            ]
        };
    },
    mounted() {
        this.getBankList();
    },
    methods: {
        containSwitch(i) {
            this.dataList[i].flag = !this.dataList[i].flag;
            this.dataList.forEach((item, index) => {
                if (index !== i) {
                    item.flag = false;
                }
            });
        },
        jieyue() {
            if (store2.default.get('hasaccount')) {
                this.$router.push(
                    {
                        name: 'walletUnwind'
                    }
                );
            }
        },
        getBankList() {
            // 获取绑定卡列表
            if (!store2.default.get('ylBankListsInfo')) {
                api.newBank
                    .acpList({})
                    .then((res) => {
                        store2.default.set('ylBankListsInfo', res.usrBnkInfos);
                        if (res.usrBnkInfos && res.usrBnkInfos.length > 0) {
                            this.ylBankList = res.usrBnkInfos.filter((item) => {
                                if (
                                    (item.accFlg && item.accFlg === '04')
                                    || (item.accFlg && item.accFlg === '05')
                                ) {
                                    return true;
                                }
                            });
                        }
                    })
                    .catch((data) => {
                        this.$toast.info(
                            data.msgInfo || '查询失败，请稍后再试',
                            3000,
                            true
                        );
                    });
            } else {
                this.ylBankList = store2.default
                    .get('ylBankListsInfo')
                    .filter((item) => {
                        if (
                            (item.accFlg && item.accFlg === '04')
                            || (item.accFlg && item.accFlg === '05')
                        ) {
                            return true;
                        }
                    });
            }
        }
    }
};
</script>
<style lang="less" scoped>
    .contains {
        .mainHeader {
            width: 100%;
            position: fixed;
            top: 0,
        }
        .mainContain {
            // margin-top: 88px;
            padding-bottom: 60px;
            .problemItem {
                .navigation {
                    opacity: 1;
                    background: #ffffff;
                    border-bottom: 1px solid #979797;
                    padding: 30px;
                    display: flex;
                    justify-content: space-between;
                    .left {
                        display: flex;
                        justify-content: space-between;
                        .number {
                            width: 45px;
                            height: 45px;
                            opacity: 1;
                            background: rgba(0,0,0,0.08);
                            border-radius: 50%;
                            font-size: 26px;
                            font-weight: 400;
                            text-align: center;
                            color: #333333;
                            line-height: 45px;
                            margin-right: 20px;
                        }
                        .title {
                            height: 45px;
                            opacity: 1;
                            font-size: 32px;
                            font-weight: 400;
                            text-align: left;
                            color: #333333;
                            line-height: 45px;
                        }
                    }
                    .right {
                        width: 16px;
                        height: 26px;
                        opacity: 1;
                        margin-top: 15px;
                        img {
                            width: 15px;
                            height: 28px;
                        }
                        .downArrow {
                            transform: rotate(90deg);
                        }
                    }
                }
                .details {
                    opacity: 1;
                    background: #f9fafb;
                    padding: 25px 50px 30px 87px;
                    font-size: 22px;
                    span{
                        font-weight:700;
                    }
                }
            }
        }
        .foot_oldBank{
          margin-top: 25px;
          font-size: 28px;
          p{
            text-decoration:underline;
            color: #0087ff;
          }
        }
    }
</style>
