/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import Vue from 'vue';
import Router from 'vue-router';
import * as store2 from '@/common/localstore';
import { delCookie, getCookie, setCookieNotTimeOut } from '@/common/cookie';
import api from '@/common/apiUrls';
import { setGeneralPropsApp } from '@/common/setGdp2023';
import store from '@/store';
// import { DispatchLoginPage } from '@/common/auth';

if (!process || process.env.NODE_ENV !== 'test') {
    // Vue.use(Router);
}

const router = new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    routes: [
        // {
        //     path: '*',
        //     name: 'notfound',
        //     component: () => import('@/views/common/page404'),
        //     meta: { requiresAuth: false, title: '404' }
        // },
        {
            path: '*',
            name: 'newFortune',
            component: () => import('@/views/newFortune/newFortune'),
            meta: {
                requiresAuth: true,
                title: '财富中心'
            }
        },
        {
            // 自动把空路径重定向
            path: '/',
            redirect: '/newFortune'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/login'),
            meta: {
                requiresAuth: false,
                title: '财富中心'
            }
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('@/views/index/index'),
            meta: {
                requiresAuth: true,
                title: '财富中心',
                pageName: 'FORTUNE_CENTER_01'
            }
        },
        // 异网页面
        {
            path: '/diffPage',
            name: 'diffPage',
            component: () => import('@/views/diffPage'),
            meta: {
                requiresAuth: true,
                title: '移动钱包',
                pageName: 'DIFFPAGE_01'
            }
        },
        // 异网页面端外
        {
            path: '/diffPageOther',
            name: 'diffPageOther',
            component: () => import('@/views/diffPageOther'),
            meta: {
                requiresAuth: true,
                title: '异网金融端外',
                pageName: ''
            }
        },
        {
            path: '/allAccount',
            name: 'allAccount',
            component: () => import('@/views/allAccount/allAccount'),
            meta: {
                requiresAuth: true,
                title: '我的钱包账户',
                pageName: 'FORTUNE_CENTER_ALLACCOUNT'
            }
        },
        {
            path: '/myInterests',
            name: 'myInterests',
            component: () => import('@/views/myInterests/myInterests'),
            meta: {
                requiresAuth: true,
                title: '我的权益',
                pageName: 'FORTUNE_CENTER_MYINTERESTS'
            }
        },
        // 0元购
        {
            path: '/member/rightsfree',
            name: 'rightsfree',
            component: () => import('@/views/newRights/getFree'),
            meta: {
                requiresAuth: true,
                title: '开通钱包领权益',
                pageName: 'RIGHTSFREE_01',
                keepAlive: true
            }
        },
        // 0元购办理结果
        {
            path: '/member/results',
            name: 'rightresults',
            component: () => import('@/views/newRights/results'),
            meta: {
                requiresAuth: true,
                title: '办理结果'
            }
        },
        {
            path: '/member/exple',
            name: 'rightexple',
            component: () => import('@/views/newRights/exple'),
            meta: {
                requiresAuth: true,
                title: '业务说明'
            }
        },
        // 活动聚合页
        {
            path: '/walletActivity',
            name: 'walletActivity',
            component: () => import('@/views/walletActivity/walletActivity'),
            meta: {
                requiresAuth: true,
                title: '钱包多重好礼',
                pageName: 'FORTUNE_CENTER_WALLETACTIVITY_01'
            }
        },
        // 话费派对
        {
            path: '/financeActivity',
            name: 'financeActivity',
            component: () => import('@/views/financeActivity/financeActivity'),
            meta: {
                requiresAuth: true,
                title: '话费派对',
                pageName: 'FINANCEACTIVITY_01'
            }
        },
        // 金融活动聚合页
        {
            path: '/browserJump',
            name: 'browserJump',
            component: () => import('@/views/walletActivity/browserJump'),
            meta: {
                requiresAuth: false,
                title: '跳转页'
            }
        },
        // 一分购活动
        {
            path: '/oneCent',
            name: 'oneCent',
            component: () => import('@/views/walletActivity/oneCent'),
            meta: {
                requiresAuth: true,
                title: '1分福利购',
                pageName: 'ONECENT_01',
                describe:
                    '1分钱抢2元话费充值券、10元加油券。数量有限，先到先得！'
            }
        },
        // 开通电子账户
        {
            path: '/openAccount',
            component: () => import('@/views/openAccount/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 授权页
                    path: 'khEmpower',
                    name: 'khEmpower',
                    component: () => import('@/views/openAccount/khEmpower'),
                    meta: {
                        requiresAuth: true,
                        title: '开通电子账户',
                        pageName: 'OPENACCOUNT_KHEMPOWER_01'
                    }
                },
                {
                    // 开户页
                    path: 'walletAccount',
                    name: 'walletAccount',
                    component: () => import('@/views/openAccount/walletAccount'),
                    meta: {
                        requiresAuth: true,
                        title: '开通电子账户',
                        pageName: 'OPENACCOUNT_INPUT_01'
                    }
                },
                {
                    // 开户协议页面
                    path: 'comprehensive',
                    name: 'comprehensive',
                    component: () => import('@/views/openAccount/comprehensive'),
                    meta: {
                        requiresAuth: true,
                        title: '开通电子账户',
                        pageName: 'OPENACCOUNT_COMPREHENSIVE_01'
                    }
                },
                {
                    // 开通电子账户结果页
                    path: 'walletOpenAccResult',
                    name: 'walletOpenAccResult',
                    component: () => import('@/views/openAccount/walletOpenAccResult'),
                    meta: {
                        requiresAuth: true,
                        title: '开通电子账户',
                        pageName: 'WALLETOPENACCRESULT_01'
                    }
                },
                {
                    // 开通电子账户验证
                    path: 'walletOpenAccValiCode',
                    name: 'walletOpenAccValiCode',
                    component: () => import('@/views/openAccount/walletOpenAccValiCode'),
                    meta: {
                        requiresAuth: true,
                        title: '开通电子账户',
                        pageName: 'OPENACCOUNT_VALCODE_01'
                    }
                }
            ]
        },
        // 账号签约
        {
            path: '/walletSign',
            component: () => import('@/views/walletSign/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 签约
                    path: 'walletSign',
                    name: 'walletSign',
                    component: () => import('@/views/walletSign/walletSign'),
                    meta: {
                        requiresAuth: true,
                        title: '账号签约',
                        pageName: 'WALLET_WALLETSIGN_01'
                    }
                },
                {
                    // 结果页
                    path: 'walletSignResult',
                    name: 'walletSignResult',
                    component: () => import('@/views/walletSign/walletSignResult'),
                    meta: {
                        requiresAuth: true,
                        title: '账号签约',
                        pageName: 'WALLET_WALLETSIGNRESULT_01'
                    }
                }
            ]
        },
        // 解约
        {
            path: '/walletUnwind',
            component: () => import('@/views/walletUnwind/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 解约引导页
                    path: 'walletUnwind',
                    name: 'walletUnwind',
                    component: () => import('@/views/walletUnwind/walletUnwind'),
                    meta: {
                        requiresAuth: true,
                        title: '钱包解约'
                    }
                },
                {
                    // 解约身份验证
                    path: 'walletUnwdValiID',
                    name: 'walletUnwdValiID',
                    component: () => import('@/views/walletUnwind/walletUnwdValiID'),
                    meta: {
                        requiresAuth: true,
                        title: '钱包解约'
                    }
                },
                {
                    // 解约结果页
                    path: 'walletUnwdResult',
                    name: 'walletUnwdResult',
                    component: () => import('@/views/walletUnwind/walletUnwdResult'),
                    meta: {
                        requiresAuth: true,
                        title: '钱包解约'
                    }
                }
            ]
        },
        // 换绑
        {
            path: '/changeBinding',
            component: () => import('@/views/changeBinding/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 换绑验证
                    path: 'changeBinding',
                    name: 'changeBinding',
                    component: () => import('@/views/changeBinding/changeBinding'),
                    meta: {
                        requiresAuth: true,
                        title: '换绑手机',
                        pageName: 'WALLET_CHANGEBINDING_01'
                    }
                },
                {
                    // 换绑结果页
                    path: 'changeBindResult',
                    name: 'changeBindResult',
                    component: () => import('@/views/changeBinding/changeBindResult'),
                    meta: {
                        requiresAuth: true,
                        title: '换绑手机',
                        pageName: 'WALLET_CHANGEBINDINGRESULT_01'
                    }
                }
            ]
        },
        // 销户
        {
            path: '/accountCancellation',
            component: () => import('@/views/accountCancellation/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 销户首页
                    path: 'accountCancellation',
                    name: 'accountCancellation',
                    component: () => import(
                        '@/views/accountCancellation/accountCancellation'
                    ),
                    meta: {
                        requiresAuth: true,
                        title: '钱包销户'
                    }
                },
                {
                    // 销户验证
                    path: 'cancellValiID',
                    name: 'cancellValiID',
                    component: () => import('@/views/accountCancellation/cancellValiID'),
                    meta: {
                        requiresAuth: true,
                        title: '钱包销户'
                    }
                },
                {
                    // 销户结果页
                    path: 'cancellResult',
                    name: 'cancellResult',
                    component: () => import('@/views/accountCancellation/cancellResult'),
                    meta: {
                        requiresAuth: true,
                        title: '钱包销户'
                    }
                }
            ]
        },
        // 零钱余额和详情
        {
            path: '/pocket',
            component: () => import('@/views/pocket/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 零钱详情
                    path: 'pockets',
                    name: 'pockets',
                    component: () => import('@/views/pocket/pockets'),
                    meta: {
                        requiresAuth: true,
                        title: '零钱',
                        pageName: 'WALLET_POCKETS_01'
                    }
                },
                {
                    // 零钱明细
                    path: 'pockDetails',
                    name: 'pockDetails',
                    component: () => import('@/views/pocket/pockDetails'),
                    meta: {
                        requiresAuth: true,
                        title: '零钱明细',
                        bgcolor: 'grayBackground',
                        pageName: 'FORTUNE_CENTER_POCKDETAILS'
                    }
                },
                {
                    // 账单详情
                    path: 'billDetail',
                    name: 'billDetail',
                    component: () => import('@/views/pocket/billDetail'),
                    meta: {
                        requiresAuth: true,
                        title: '账单详情',
                        bgcolor: 'grayBackground',
                        pageName: 'WALLET_BILLDETAIL_01'
                    }
                }
            ]
        },
        // 零钱充值
        {
            path: '/recharge',
            component: () => import('@/views/recharge/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 充值页
                    path: 'recharges',
                    name: 'recharges',
                    component: () => import('@/views/recharge/recharges'),
                    meta: {
                        requiresAuth: true,
                        title: '充值',
                        bgcolor: 'grayBackground',
                        pageName: 'WALLET_RECHARGE_01'
                    }
                },
                {
                    // 充值指引页
                    path: 'rechargeGuide',
                    name: 'rechargeGuide',
                    component: () => import('@/views/recharge/rechargeGuide'),
                    meta: {
                        requiresAuth: true,
                        title: '手动转账指引',
                        pageName: 'WALLET_RECHARGEGUIDE_01'
                    }
                },
                {
                    // 充值过度页
                    path: 'rechargeTransition',
                    name: 'rechargeTransition',
                    component: () => import('@/views/recharge/rechargeTransition'),
                    meta: {
                        requiresAuth: true,
                        title: '充值结果'
                    }
                },
                {
                    // 充值结果成功
                    path: 'rechargeSuccess',
                    name: 'rechargeSuccess',
                    component: () => import('@/views/recharge/rechargeSuccess'),
                    meta: {
                        requiresAuth: true,
                        title: '充值结果',
                        pageName: 'WALLET_RECHARGESUCCESS_01'
                    }
                },
                {
                    // 充值结果失败
                    path: 'rechargeFail',
                    name: 'rechargeFail',
                    component: () => import('@/views/recharge/rechargeFail'),
                    meta: {
                        requiresAuth: true,
                        title: '充值结果',
                        pageName: 'WALLET_RECHARGEFAIL_01'
                    }
                }
            ]
        },
        // 零钱提现
        {
            path: '/withdraw',
            component: () => import('@/views/withdraw/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 提现页
                    path: 'changeWithdrawal',
                    name: 'changeWithdrawal',
                    component: () => import('@/views/withdraw/changeWithdrawal'),
                    meta: {
                        requiresAuth: false,
                        title: '零钱提现',
                        bgcolor: 'grayBackground',
                        pageName: 'WALLET_RECHARGEWIDTHDRAWAL_01'
                    }
                },
                {
                    // 提现过渡页
                    path: 'withdrawalTransition',
                    name: 'withdrawalTransition',
                    component: () => import('@/views/withdraw/withdrawalTransition'),
                    meta: {
                        requiresAuth: true,
                        title: '提现结果'
                    }
                },
                {
                    // 提现结果成功
                    path: 'withdrawalSuccess',
                    name: 'withdrawalSuccess',
                    component: () => import('@/views/withdraw/withdrawalSuccess'),
                    meta: {
                        requiresAuth: true,
                        title: '提现结果',
                        pageName: 'WALLET_WIDTHDRAWALSUCCESS_01'
                    }
                },
                {
                    // 提现结果失败
                    path: 'withdrawalFail',
                    name: 'withdrawalFail',
                    component: () => import('@/views/withdraw/withdrawalFail'),
                    meta: {
                        requiresAuth: true,
                        title: '提现结果',
                        pageName: 'WALLET_WIDTHDRAWALFAIL_01'
                    }
                }
            ]
        },
        // 个人信息
        {
            path: '/personInfor',
            component: () => import('@/views/personInfor/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 基本信息
                    path: 'basicInfo',
                    name: 'basicInfo',
                    component: () => import('@/views/personInfor/basicInfo'),
                    meta: {
                        requiresAuth: true,
                        title: '个人信息',
                        bgcolor: 'grayBackground'
                    }
                },
                {
                    // 设置昵称
                    path: 'setNickname',
                    name: 'setNickname',
                    component: () => import('@/views/personInfor/setNickname'),
                    meta: {
                        requiresAuth: true,
                        title: '设置昵称',
                        bgcolor: 'grayBackground'
                    }
                },
                {
                    // 常见问题
                    path: 'problemDetail',
                    name: 'problemDetail',
                    component: () => import('@/views/personInfor/problemDetail'),
                    meta: {
                        requiresAuth: true,
                        title: '常见问题'
                    }
                },
                // 设置密码
                {
                    path: '/setPassword/:title',
                    name: 'setPassword',
                    component: () => import('@/views/personInfor/setPassword'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/reconfirm/:title',
                    name: 'reconfirm',
                    component: () => import('@/views/personInfor/reconfirm'),
                    meta: { requiresAuth: true }
                },
                // 修改密码
                {
                    path: 'changePassword',
                    name: 'changePassword',
                    component: () => import('@/views/personInfor/changePassword'),
                    meta: {
                        requiresAuth: true,
                        title: '支付密码设置',
                        bgcolor: 'grayBackground'
                    }
                },
                // 身份验证
                {
                    path: '/authentication/:a',
                    name: 'authentication',
                    component: () => import('@/views/personInfor/authentication'),
                    meta: { requiresAuth: true }
                },
                // 支付密码的短信验证
                {
                    path: '/VerificationCode/:sun',
                    name: 'VerificationCode',
                    component: () => import('@/views/personInfor/VerificationCode'),
                    meta: {
                        requiresAuth: false,
                        title: '短信验证'
                    }
                }
            ]
        },
        // 我的银行卡
        {
            path: '/banks',
            component: () => import('@/views/banks/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 银行卡
                    path: 'myBanks',
                    name: 'myBanks',
                    component: () => import('@/views/banks/myBanks'),
                    meta: {
                        requiresAuth: true,
                        title: '绑卡管理',
                        pageName: 'WALLET_MYBANKS_01'
                    }
                },
                {
                    // 银行卡
                    path: 'myYLBanks',
                    name: 'myYLBanks',
                    component: () => import('@/views/banks/myYLBanks'),
                    meta: {
                        requiresAuth: true,
                        title: '我的银行卡',
                        pageName: 'FORTUNE_CENTER_MYYLBANKS'
                    }
                },
                {
                    // 添加银行卡
                    path: 'addBank',
                    name: 'addBank',
                    component: () => import('@/views/banks/addBank'),
                    meta: {
                        requiresAuth: true,
                        title: '添加银行卡',
                        pageName: 'WALLET_ADDBANK_01'
                    }
                },
                {
                    // 添加成功
                    path: 'addSuc',
                    name: 'addSuc',
                    component: () => import('@/views/banks/addSuc'),
                    meta: {
                        requiresAuth: true,
                        title: '添加银行卡',
                        bgcolor: 'grayBackground',
                        pageName: 'WALLET_ADDSUCCESS_01'
                    }
                },
                {
                    // 添加失败
                    path: 'addFail',
                    name: 'addFail',
                    component: () => import('@/views/banks/addFail'),
                    meta: {
                        requiresAuth: true,
                        title: '添加银行卡',
                        bgcolor: 'grayBackground',
                        pageName: 'WALLET_ADDFAIL_01'
                    }
                },
                {
                    // 支持的银行卡supportbank
                    path: 'supportBank',
                    name: 'supportBank',
                    component: () => import('@/views/banks/supportBank'),
                    meta: {
                        requiresAuth: true,
                        title: ''
                    }
                }
            ]
        },
        // 我的
        {
            path: '/myPage',
            component: () => import('@/views/myPage/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 未开户
                    path: 'openanAccount',
                    name: 'openanAccount',
                    component: () => import('@/views/myPage/openanAccount'),
                    meta: {
                        requiresAuth: true,
                        title: '我的钱包开户状态',
                        pageName: 'FORTUNE_CENTER_INDEX'
                    }
                },
                {
                    // 未开户
                    path: 'digiccyOpenAccResult',
                    name: 'digiccyOpenAccResult',
                    component: () => import('@/views/myPage/digiccyOpenAccResult'),
                    meta: {
                        requiresAuth: false,
                        title: '数字货币开户结果页',
                        pageName: 'FORTUNE_CENTER_INDEX'
                    }
                },
                {
                    // 中间页
                    path: 'currencyPage',
                    name: 'currencyPage',
                    component: () => import('@/views/myPage/currencyPage'),
                    meta: {
                        requiresAuth: true,
                        title: '数字人民币介绍'
                    }
                },
                // // 我的钱包银行卡
                // {
                //     path: 'moveWallet',
                //     name: 'moveWallet',
                //     component: () => import('@/views/myPage/moveWallet'),
                //     meta: {
                //         requiresAuth: true,
                //         title: '我的零钱账户',
                //         pageName: 'FORTUNE_CENTER_MOVEWALLET'
                //     }
                // },
                // 我的零钱账户
                {
                    path: 'moveWallet',
                    name: 'moveWallet',
                    component: () => import('@/views/myPage/moveWallet'),
                    meta: {
                        requiresAuth: true,
                        title: '我的电子账户',
                        pageName: 'FORTUNE_CENTER_MOVEWALLET'
                    }
                },
                // 零钱账户
                {
                    path: 'looseChange',
                    name: 'looseChange',
                    component: () => import('@/views/myPage/looseChange'),
                    meta: {
                        requiresAuth: true,
                        title: '设置默认电子账户',
                        pageName: 'WALLET_MYBANKS_01'
                    }
                },
                // 选择销户账户
                {
                    path: 'looseWallet',
                    name: 'looseWallet',
                    component: () => import('@/views/myPage/looseWallet'),
                    meta: {
                        requiresAuth: true,
                        title: '选择电子账户销户'
                    }
                }
            ]
        },
        // 灵活计费 T3，永辉等权益
        {
            path: '/flexibleBilling/:rightsType',
            component: () => import('@/views/flexibleBilling/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    path: '',
                    name: 'FlexibleBilling',
                    component: () => import('@/views/flexibleBilling/index.vue'),
                    meta: {
                        requiresAuth: true,
                        title: '产品详情'
                    }
                },
                {
                    path: 'myRights',
                    name: 'FlexibleBillingMyRights',
                    component: () => import('@/views/flexibleBilling/myRights.vue'),
                    meta: {
                        requiresAuth: true,
                        title: '我的权益'
                    }
                },
                {
                    path: 'transactionResult',
                    name: 'FlexibleBillingTransactionResult',
                    component: () => import('@/views/flexibleBilling/transactionResult.vue'),
                    meta: {
                        requiresAuth: true,
                        title: '订单成功页'
                    }
                }
            ],
            props: true
        },
        // 话费宝
        {
            path: '/telephoneCharges',
            component: () => import('@/views/telephoneCharges/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 查看收益
                    path: 'viewBenefits',
                    name: 'viewBenefits',
                    component: () => import('@/views/telephoneCharges/viewBenefits'),
                    meta: {
                        requiresAuth: true,
                        title: '话费宝'
                    }
                },
                {
                    // 话费宝
                    path: 'description',
                    name: 'description',
                    component: () => import('@/views/telephoneCharges/description'),
                    meta: {
                        requiresAuth: true,
                        title: '话费宝'
                    }
                },
                {
                    // 话费宝
                    path: 'newDescription',
                    name: 'newDescription',
                    component: () => import('@/views/telephoneCharges/newDescription'),
                    meta: {
                        requiresAuth: true,
                        title: '话费宝'
                    }
                },
                {
                    // 《“话费宝”活动参与协议》
                    path: 'agreement',
                    name: 'agreement',
                    component: () => import('@/views/telephoneCharges/agreement'),
                    meta: {
                        requiresAuth: true,
                        title: '《“话费宝”活动参与协议》'
                    }
                },
                {
                    // 累计收益
                    path: 'cumRight',
                    name: 'cumRight',
                    component: () => import('@/views/telephoneCharges/cumRight'),
                    meta: {
                        requiresAuth: false,
                        title: '累计话费'
                    }
                },
                {
                    // 已领取收益
                    path: 'getRight',
                    name: 'getRight',
                    component: () => import('@/views/telephoneCharges/getRight'),
                    meta: {
                        requiresAuth: true,
                        title: '已领取话费'
                    }
                }
            ]
        },
        // 数字人民币挂接功能
        {
            path: '/hookUp',
            component: () => import('@/views/hookUp/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    // 账号挂接
                    path: 'hookHandling',
                    name: 'hookHandling',
                    component: () => import('@/views/hookUp/hookHandling'),
                    meta: {
                        requiresAuth: true,
                        title: '账号挂接'
                    }
                },
                {
                    // 账号挂接结果
                    path: 'hookResult',
                    name: 'hookResult',
                    component: () => import('@/views/hookUp/hookResult'),
                    meta: {
                        requiresAuth: true,
                        title: '账号挂接'
                    }
                }
            ]
        },

        // 新添加银行卡
        {
            path: '/newBanks',
            component: () => import('@/views/myPage/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    path: 'addNewBanks',
                    name: 'addNewBanks',
                    component: () => import('@/views/newBanks/addNewBanks'),
                    meta: {
                        requiresAuth: true,
                        title: '添加银行卡',
                        pageName: 'ADDNEWBANKS_01'
                    }
                },
                {
                    path: 'addSucNew',
                    name: 'addSucNew',
                    component: () => import('@/views/newBanks/addSucNew'),
                    meta: {
                        requiresAuth: true,
                        title: '添加结果',
                        pageName: 'ADDSUCNEW_01'
                    }
                },
                {
                    path: 'addFailNew',
                    name: 'addFailNew',
                    component: () => import('@/views/newBanks/addFailNew'),
                    meta: {
                        requiresAuth: true,
                        title: '添加结果',
                        pageName: 'ADDFAILNEW_01'
                    }
                },
                {
                    path: 'myNewBank',
                    name: 'myNewBank',
                    component: () => import('@/views/newBanks/myNewBank'),
                    meta: {
                        requiresAuth: true,
                        title: '我的银行卡'
                    }
                }
            ]
        },
        // 绑定银行卡送流量
        {
            path: '/newBanksPhoneBill',
            name: 'newBanksPhoneBill',
            component: () => import('@/views/newBanks/newBanksPhoneBill'),
            meta: {
                requiresAuth: true,
                title: '绑定银行卡送流量',
                pageName: 'NEWBANKSPHONEBILL_01'
            }
        },
        {
            path: '/newBanksResult',
            name: 'newBanksResult',
            component: () => import('@/views/newBanks/newBanksResult'),
            meta: {
                requiresAuth: true,
                title: '绑定银行卡结果页',
                pageName: ''
            }
        },

        // 宁波银行联名信用卡
        {
            path: '/nbBankJointly',
            name: 'nbBankJointly',
            component: () => import('@/views/nbBank/nbBankJointly'),
            meta: {
                requiresAuth: true,
                title: '宁波银行&中国移动联名卡',
                pageName: 'NBBANK_JOINTLY_01'
            }
        },
        {
            path: '/nbBankDetail',
            name: 'nbBankDetail',
            component: () => import('@/views/nbBank/nbBankDetail'),
            meta: {
                requiresAuth: true,
                title: '宁波银行&中国移动联名卡',
                pageName: ''
            }
        },
        {
            path: '/livelihoodBank',
            name: 'livelihoodBank',
            component: () => import('@/views/nbBank/livelihoodBank'),
            meta: {
                requiresAuth: true,
                title: '民生银行联名信用卡',
                pageName: 'LIVELIHOODBANK_01'
            }
        },
        // 小宝花
        {
            path: '/babyFlower',
            component: () => import('@/views/babyFlower/routerView'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                // 首页
                {
                    path: 'index',
                    name: 'babyindex',
                    component: () => import('@/views/babyFlower/index'),
                    meta: {
                        requiresAuth: true,
                        title: '小宝花账户'
                    }
                },
                // 开通小宝花
                {
                    path: 'openFlower',
                    name: 'openFlower',
                    component: () => import('@/views/babyFlower/openFlower'),
                    meta: {
                        requiresAuth: true,
                        title: '小宝花'
                    }
                },
                // 开通协议
                {
                    path: 'openAgreement',
                    name: 'openAgreement',
                    component: () => import('@/views/babyFlower/agreement'),
                    meta: {
                        requiresAuth: true,
                        title: '小宝花开通协议'
                    }
                },
                // 交易明细
                {
                    path: 'transactionDetails',
                    name: 'transactionDetails',
                    component: () => import('@/views/babyFlower/transactionDetails'),
                    meta: {
                        requiresAuth: true,
                        title: '交易明细'
                    }
                },
                // 设置小宝花
                {
                    path: 'setting',
                    name: 'setting',
                    component: () => import('@/views/babyFlower/setting'),
                    meta: {
                        requiresAuth: true,
                        title: '小宝花设置'
                    }
                },
                // 扫描二维码
                {
                    path: 'scan',
                    name: 'scan',
                    component: () => import('@/views/babyFlower/scan'),
                    meta: {
                        requiresAuth: true,
                        title: '扫描二维码'
                    }
                },
                // 我的银行卡
                {
                    path: 'myCard',
                    name: 'myCard',
                    component: () => import('@/views/babyFlower/myCard'),
                    meta: {
                        requiresAuth: true,
                        title: '我的银行卡'
                    }
                },
                {
                    path: 'timePicker',
                    name: 'timePicker',
                    component: () => import('@/views/babyFlower/timePicker')
                }
            ]
        },
        {
            // 新人有礼
            path: '/newPeople',
            name: 'newPeople',
            component: () => import('@/views/newPeople/newPeople'),
            meta: {
                requiresAuth: true,
                title: '新人有礼',
                pageName: 'NEWPEOPLE_01'
            }
        },
        {
            // 企微用户活动
            path: '/Qiwei',
            name: 'Qiwei',
            component: () => import('@/views/newPeople/Qiwei'),
            meta: {
                requiresAuth: true,
                title: '企微用户特惠',
                pageName: 'QIWEI_01'
            }
        },
        {
            // 感恩回馈
            path: '/gratitude',
            name: 'gratitude',
            component: () => import('@/views/gratitude/gratitude'),
            meta: {
                requiresAuth: true,
                title: '感恩回馈',
                pageName: 'GRATITUDE_01'
            }
        },
        // 流量宝首页
        {
            path: '/traddicIndex',
            name: 'traddicIndex',
            component: () => import('@/views/traffic/trafficIndex.vue'),
            meta: {
                requiresAuth: true,
                title: '流量宝',
                pageName: 'TRADDIC_HOME_01'
            }
        },
        // 流量宝开通
        {
            path: '/traddicHome',
            name: 'traddicHome',
            component: () => import('@/views/traffic/traddicHome.vue'),
            meta: {
                requiresAuth: true,
                title: '流量宝',
                pageName: 'TRADDIC_INDEX_01'
            }
        },
        // 流量宝协议
        {
            path: '/traddicProtocol',
            name: 'traddicProtocol',
            component: () => import('@/views/traffic/traddicProtocol.vue'),
            meta: {
                requiresAuth: true,
                title: '流量宝',
                pageName: 'TRADDIC_PROTOCOL_01'
            }
        },
        // 流量宝规则
        {
            path: '/traddicRule',
            name: 'traddicRule',
            component: () => import('@/views/traffic/traddicRule.vue'),
            meta: {
                requiresAuth: true,
                title: '流量宝',
                pageName: 'TRADDIC_RULE_01'
            }
        },
        // 流量宝领取记录
        {
            path: '/traddicRecording',
            name: 'traddicRecording',
            component: () => import('@/views/traffic/traddicRecording.vue'),
            meta: {
                requiresAuth: true,
                title: '流量宝',
                pageName: 'TRADDIC_RECORDING_01'
            }
        },
        // 1元拆盲盒
        {
            path: '/openBlindBox',
            name: 'openBlindBox',
            component: () => import('@/views/openBlindBox/openBlindBox.vue'),
            meta: {
                requiresAuth: true,
                title: '1元拆盲盒',
                pageName: 'TRADDIC_RECORDING_01'
            }
        },
        // 奖品列表页
        {
            path: '/prizeList',
            name: 'prizeList',
            component: () => import('@/views/openBlindBox/prizeList.vue'),
            meta: {
                requiresAuth: true,
                title: '我的奖品',
                pageName: 'TRADDIC_RECORDING_01'
            }
        },
        // 话费易充值值
        {
            path: '/autoRecharge',
            name: 'autoRecharge',
            component: () => import('@/views/autoRecharge/index.vue'),
            meta: {
                requiresAuth: true,
                title: '话费易充值',
                pageName: ''
            }
        },
        // 话费易充值值结果页
        {
            path: '/autoRechargeResult',
            name: 'autoRechargeResult',
            component: () => import('@/views/autoRecharge/autoRechargeResult.vue'),
            meta: {
                requiresAuth: true,
                title: '话费易充值',
                pageName: ''
            }
        },
        // 话费易充值值历史记录
        {
            path: '/autoHistoryList',
            name: 'autoHistoryList',
            component: () => import('@/views/autoRecharge/autoHistoryList.vue'),
            meta: {
                requiresAuth: true,
                title: '我的奖品',
                pageName: ''
            }
        },
        // 话费自动微信解绑
        {
            path: '/weChatTerminationOfContract',
            name: 'weChatTerminationOfContract',
            component: () => import('@/views/autoRecharge/weChatTerminationOfContract.vue'),
            meta: {
                requiresAuth: true,
                title: '话费易充值',
                pageName: ''
            }
        },
        // 话费易充值值微信结果页
        {
            path: '/autoRechargeWechatResult',
            name: 'autoRechargeWechatResult',
            component: () => import('@/views/autoRecharge/autoRechargeWechatResult.vue'),
            meta: {
                requiresAuth: true,
                title: '话费易充值',
                pageName: ''
            }
        },
        // 优+
        {
            path: '/uAdd',
            name: 'uAdd',
            component: () => import('@/views/uAdd/uAdd.vue'),
            meta: {
                requiresAuth: true,
                title: '移动钱包',
                pageName: ''
            }
        },
        {
            path: '/middleVideo',
            name: 'middleVideo',
            component: () => import('@/views/middleVideo/middleVideo.vue'),
            meta: {
                requiresAuth: true,
                title: '额度申请',
                pageName: ''
            }
        },
        {
            path: '/transitPage',
            name: 'transitPage',
            component: () => import('@/views/Transit/transitPage.vue'),
            meta: {
                requiresAuth: true,
                title: '',
                pageName: ''
            }
        },
        {
            path: '/baiRongLoan',
            name: 'baiRongLoan',
            component: () => import('@/views/baiRongLoan/index.vue'),
            meta: {
                requiresAuth: true,
                title: '借钱限时礼遇',
                pageName: ''
            }
        },
        {
            path: '/baiRongLoanRules',
            name: 'baiRongLoanRules',
            component: () => import('@/views/baiRongLoan/baiRongLoanRules.vue'),
            meta: {
                requiresAuth: true,
                title: '借钱限时礼遇',
                pageName: ''
            }
        },
        {
            path: '/authorization',
            name: 'authorization',
            component: () => import('@/views/authorization/authorization'),
            meta: { requiresAuth: true, title: '授权页' }
        },
        {
            path: '/insuranceMid',
            name: 'insuranceMid',
            component: () => import('@/views/insuranceMid/index'),
            meta: { requiresAuth: true, title: '平安车险', pageName: 'INSURANCEMID_01' }
        },
        {
            path: '/newFortune',
            name: 'newFortune',
            component: () => import('@/views/newFortune/newFortune'),
            meta: {
                requiresAuth: true,
                title: '钱包·财富',
                pageName: 'NEWFORTUNE_01',
                attributes: {
                    WT_et: 'pageview',
                    WT_event: 'H5PageShow'
                }
            }
        },
        {
            path: '/BOCM',
            name: 'BOCM',
            component: () => import('@/views/BOCM/routerView.vue'),
            meta: {
                requiresAuth: true,
                title: '开通电子账户'
            },
            children: [
                {
                    path: 'identityInformation',
                    name: 'identityInformation',
                    component: () => import('@/views/BOCM/identityInformation.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'faceRecognition',
                    name: 'faceRecognition',
                    component: () => import('@/views/BOCM/faceRecognition.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'submitID',
                    name: 'submitID',
                    component: () => import('@/views/BOCM/submitID.vue'),
                    meta: {
                        requiresAuth: true,
                        title: '开通电子账户',
                        pageName: 'TRADDIC_RECORDING_01'
                    }
                },
                {
                    path: 'accountSign',
                    name: 'accountSign',
                    component: () => import('@/views/BOCM/accountSign.vue'),
                    meta: {
                        requiresAuth: true,
                        title: '快捷支付签约',
                        pageName: 'TRADDIC_RECORDING_01'
                    }
                },
                {
                    path: 'signResult',
                    name: 'signResult',
                    component: () => import('@/views/BOCM/signResult.vue'),
                    meta: {
                        requiresAuth: true,
                        title: '快捷支付签约',
                        pageName: 'TRADDIC_RECORDING_01'
                    }
                }
            ]

        },
        {
            path: '/B2CWallet',
            name: 'B2CWallet',
            component: () => import('@/views/B2CWallet/routerView.vue'),
            meta: {
                requiresAuth: true,
                title: '开通零钱账户'
            },
            children: [
                {
                    path: 'hbEmpower',
                    name: 'hbEmpower',
                    component: () => import('@/views/B2CWallet/hbEmpower.vue'),
                    meta: {
                        title: '信息授权',
                        requiresAuth: true
                    }
                },
                {
                    path: 'accountName',
                    name: 'accountName',
                    component: () => import('@/views/B2CWallet/accountName.vue'),
                    meta: {
                        title: '账户实名',
                        requiresAuth: true
                    }
                },
                {
                    path: 'accountSigning',
                    name: 'accountSigning',
                    component: () => import('@/views/B2CWallet/accountSigning.vue'),
                    meta: {
                        title: '签约提醒',
                        requiresAuth: true
                    }
                },
                {
                    path: 'myMoney',
                    name: 'myMoney',
                    component: () => import('@/views/B2CWallet/myMoney.vue'),
                    meta: {
                        title: '我的零钱',
                        requiresAuth: true
                    }
                },
                {
                    path: 'signingResult',
                    name: 'signingResult',
                    component: () => import('@/views/B2CWallet/signingResult.vue'),
                    meta: {
                        title: '签约状态',
                        requiresAuth: true
                    }
                },
                {
                    path: 'hbOpen',
                    name: 'hbOpen',
                    component: () => import('@/views/B2CWallet/hbOpen.vue'),
                    meta: {
                        title: '和包开通',
                        requiresAuth: true
                    }
                },
                {
                    path: 'middlePage',
                    name: 'middlePage',
                    component: () => import('@/views/B2CWallet/middlePage.vue'),
                    meta: {
                        title: '和包授权',
                        requiresAuth: true
                    }
                },
                {
                    path: 'bindCard',
                    name: 'bindCard',
                    component: () => import('@/views/B2CWallet/bindCard.vue'),
                    meta: {
                        title: '和包绑卡',
                        requiresAuth: true
                    }
                },
                {
                    path: 'pocketRecharge',
                    name: 'pocketRecharge',
                    component: () => import('@/views/B2CWallet/pocketRecharge.vue'),
                    meta: {
                        title: '零钱充值',
                        requiresAuth: true
                    }
                },
                {
                    path: 'pocketWithdrawal',
                    name: 'pocketWithdrawal',
                    component: () => import('@/views/B2CWallet/pocketWithdrawal.vue'),
                    meta: {
                        title: '零钱提现',
                        requiresAuth: true
                    }
                },
                {
                    path: 'pocketTransferAccounts',
                    name: 'pocketTransferAccounts',
                    component: () => import('@/views/B2CWallet/pocketTransferAccounts.vue'),
                    meta: {
                        title: '转账到和包',
                        requiresAuth: true
                    }
                },
                {
                    path: 'pocketTransferConfirm',
                    name: 'pocketTransferConfirm',
                    component: () => import('@/views/B2CWallet/pocketTransferConfirm.vue'),
                    meta: {
                        title: '转账到和包',
                        requiresAuth: true
                    }
                },
                {
                    path: 'pocketDetail',
                    name: 'pocketDetail',
                    component: () => import('@/views/B2CWallet/pocketDetail.vue'),
                    meta: {
                        title: '零钱明细',
                        requiresAuth: true
                    }
                },
                {
                    path: 'billingDetails',
                    name: 'billingDetails',
                    component: () => import('@/views/B2CWallet/billingDetails.vue'),
                    meta: {
                        title: '账单详情',
                        requiresAuth: true
                    }
                },
                {
                    path: 'pocketResult',
                    name: 'pocketResult',
                    component: () => import('@/views/B2CWallet/pocketResult.vue'),
                    meta: {
                        title: '结果',
                        requiresAuth: true
                    }
                }
            ]

        },
        {
            path: '/BOCMActivity',
            name: 'BOCMActivity',
            component: () => import('@/views/BOCMActivity/index.vue'),
            meta: {
                requiresAuth: true,
                title: '送10元话费券'
            }
        },
        {
            path: '/cupWallet',
            name: 'cupWallet',
            component: () => import('@/views/cupWallet/routerView.vue'),
            meta: {
                requiresAuth: true,
                title: '签约'
            },
            children: [
                {
                    path: 'accountSigning',
                    name: 'accountSigning',
                    component: () => import('@/views/cupWallet/accountSigning.vue'),
                    meta: {
                        title: '签约提醒',
                        requiresAuth: true
                    }
                },
                {
                    path: 'signingResult',
                    name: 'signingResult',
                    component: () => import('@/views/cupWallet/signingResult.vue'),
                    meta: {
                        title: '签约状态',
                        requiresAuth: true
                    }
                }
            ]

        },
        {
            path: '/digitalPayment',
            name: 'digitalPayment',
            component: () => import('@/views/digitalPayment/digitalPayment.vue'),
            meta: {
                requiresAuth: true,
                title: '我的数字人民币'
            }
        },
        {
            path: '/bindCardActive',
            name: 'bindCardActive',
            component: () => import('@/views/cupWallet/routerView.vue'),
            meta: {
                requiresAuth: true,
                title: '绑卡活动'
            },
            children: [
                {
                    path: 'hbActive',
                    name: 'hbActive',
                    component: () => import('@/views/bindCardActive/hbActive.vue'),
                    meta: {
                        title: '绑卡支付送流量',
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/saveMoneyActive',
            name: 'saveMoneyActive',
            component: () => import('@/views/saveMoneyActive/saveMoneyActive.vue'),
            meta: {
                requiresAuth: true,
                title: '省钱包',
                pageName: '',
                attributes: {
                    WT_et: 'pageview',
                    WT_event: 'H5PageShow',
                    WT_mc_ev: '231013_S11FS'
                }
            }
        },
        {
            path: '/jumpPage',
            name: 'jumpPage',
            component: () => import('@/views/jumpPage/jumpPage'),
            meta: { requiresAuth: false, title: '跳转页' }
        },
        {
            path: '/floorMiddlePage',
            name: 'floorMiddlePage',
            component: () => import('@/views/floorMiddlePage/floorMiddlePage.vue'),
            meta: {
                requiresAuth: true,
                title: '我的电子账户',
                pageName: ''
            }
        },
        // 招商数币
        {
            path: '/zsDcpay',
            name: 'zsDcpay',
            component: () => import('@/views/ZS_shubi/routerView.vue'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('@/views/ZS_shubi/index.vue'),
                    meta: {
                        title: '数字人民币',
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/registerSendPoints',
            name: 'registerSendPoints',
            component: () => import('@/views/registerSendPoints/index.vue'),
            meta: {
                requiresAuth: true,
                title: '领300积分 兑爆款好货',
                pageName: ''
            }
        },
        {
            path: '/gfBankMargin',
            name: 'gfBankMargin',
            component: () => import('@/views/gfBankMargin/index.vue'),
            meta: {
                requiresAuth: true,
                title: '广发银行话费宝活动',
                pageName: ''
            }
        },
        {
            // 话费宝攒钱赚话费活动
            path: '/savebillActivity',
            name: 'savebillActivity',
            component: () => import('@/views/telephoneCharges/savebillActivity'),
            meta: {
                requiresAuth: true,
                title: '话费宝'
            }
        },
        // 大额保证金
        {
            path: '/earnestMoney',
            name: 'earnestMoney',
            component: () => import('@/views/earnestMoney/index.vue'),
            meta: {
                requiresAuth: true,
                pageName: '',
                title: '大额保证金'
            }
        },
        // 大额保证金规则
        {
            path: '/earnestMoneyRules',
            name: 'earnestMoneyRules',
            component: () => import('@/views/earnestMoney/earnestMoneyRules'),
            meta: {
                requiresAuth: true,
                pageName: '',
                title: '大额保证金'
            }
        },
        // 大额保证金我的钱
        {
            path: '/earnestMoneyDetail',
            name: 'earnestMoneyDetail',
            component: () => import('@/views/earnestMoney/earnestMoneyDetail'),
            meta: {
                requiresAuth: true,
                pageName: '',
                title: '大额保证金'
            }
        },
        {
            path: '/miniProgramCallback',
            name: 'miniProgramCallback',
            component: () => import('@/views/miniProgramCallback/index.vue'),
            meta: {
                requiresAuth: true,
                title: '登录',
                pageName: ''
            }
        },
        // 广发银行信用卡活动
        {
            path: '/gfBank',
            name: 'gfBank',
            component: () => import('@/views/gfBank/routerView.vue'),
            meta: {
                requiresAuth: true,
                title: ''
            },
            children: [
                {
                    path: 'carOwnerCard',
                    name: 'carOwnerCard',
                    component: () => import('@/views/gfBank/carOwnerCard.vue'),
                    meta: {
                        title: '广发车主精英白金卡',
                        requiresAuth: true
                    }
                },
                {
                    path: 'fishCard',
                    name: 'fishCard',
                    component: () => import('@/views/gfBank/fishCard.vue'),
                    meta: {
                        title: '广发银行有鱼潮系列白金卡',
                        requiresAuth: true
                    }
                },
            ]
        },
        {
            path: '/creditCardZone',
            name: 'creditCardZone',
            component: () => import('@/views/creditCardZone.vue'),
            meta: {
                requiresAuth: true,
                title: '信用卡专区',
            }
        },
        // 交行养老金
        {
          path: '/bocmPension',
          name: 'bocmPension',
          component: () => import('@/views/bocmPension/routerView.vue'),
          meta: {
              requiresAuth: true,
              title: '开通养老金资金账户'
          },
          children: [
              {
                  path: 'information',
                  name: 'information',
                  component: () => import('@/views/bocmPension/information.vue'),
                  meta: {
                      requiresAuth: true,
                      title: '开通养老金资金账户'
                  }
              },
              {
                  path: 'faceInfoPage',
                  name: 'faceInfoPage',
                  component: () => import('@/views/bocmPension/faceInfoPage.vue'),
                  meta: {
                      requiresAuth: true,
                      title: '开通养老金资金账户'
                  }
              },
              {
                  path: 'IDcardSubmit',
                  name: 'IDcardSubmit',
                  component: () => import('@/views/bocmPension/IDcardSubmit.vue'),
                  meta: {
                      requiresAuth: true,
                      pageName: '',
                      title: '开通养老金资金账户'
                  }
              },
              {
                  path: 'empowerMiddle',
                  name: 'empowerMiddle',
                  component: () => import('@/views/bocmPension/empowerMiddle.vue'),
                  meta: {
                      requiresAuth: true,
                      pageName: '',
                      noApp: true,
                  }
              },
              {
                path: 'deposit',
                name: 'deposit',
                component: () => import('@/views/bocmPension/deposit.vue'),
                meta: {
                    requiresAuth: true,
                    pageName: '',
                    noApp: true,
                }
              },
              {
                path: 'bcomPensionActivity',
                name: 'bcomPensionActivity',
                component: () => import('@/views/bocmPension/bcomPensionActivity.vue'),
                meta: {
                    requiresAuth: true,
                    pageName: '个人养老金资金账户',
                    noApp: true,
                }
            },
          ]
        },
        {
          path: '/financeSportsMeeting',
          name: 'financeSportsMeeting',
          component: () => import('@/views/financeSportsMeeting/index.vue'),
          meta: {
              requiresAuth: true,
              title: '金融运动会',
          }
        },
        {
          // 交行惠民贷
          path: '/benefitPersonLoan',
          name: 'benefitPersonLoan',
          component: () => import('@/views/benefitPersonLoan/index'),
          meta: { requiresAuth: true, title: '借钱' }
        },
        {
            path: '/marketing',
            name: 'marketing',
            component: () => import('@/views/marketing/marketing.vue'),
            meta: {
              title: '招行一网通', // 银联前台版
              requiresAuth: true,
            }
          },
          {
            path: '/marketingRecord',
            name: 'marketingRecord',
            component: () => import('@/views/marketing/marketingRecord.vue'),
            meta: {
              title: '招行一网通', // 银联前台版
              requiresAuth: true,
            }
          }
    ]
});

export function getQueryString(name) {
    const reg = `(^|&)${name}=([^&]*)(&|$)`;
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export function getAgentString(name) {
    const reg = `(^|&)${name}=([^&]*)(&|$)`;
    const r = navigator.userAgent.toLowerCase().substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export function delectQueryString(url, paraName) {
    const arrObj = url.split('?');
    if (arrObj.length > 1) {
        const arrPara = arrObj[1].split('&');
        let arr = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=');
            if (arr != null && arr[0] === paraName) {
                arrPara.splice(i, 1);
                // eslint-disable-next-line no-plusplus
                i--;
            }
        }
        if (arrPara.length === 0) {
            return arrObj[0];
        }
        return `${arrObj[0]}?${arrPara.join('&')}`;
    }
    return url;
}
// 一级手厅js
// 判断版本号是否大于等于7.5.6
export function versionJudgment(version) {
    const stp = version.split('.');
    if (stp[0] > 7) {
        return true;
    }
    if (stp[0] == 7 && stp[1] > 5) {
        return true;
    } if (stp[0] == 7 && stp[1] == 5 && stp[2] > 5) {
        return true;
    }

    return false;
}

export function getQueryVariable(variable) {
    const url = window.location.href;
    if (url.indexOf('?') >= 0) { // 判断url地址中是否包含link字符串
        const query = document.location.href.split('?')[1];
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (pair[0] == variable) {
                pair[1] = pair[1].indexOf('#') >= 0 ? pair[1].split('#')[0] : pair[1];
                return pair[1];
            }
        }
        return (false);
    }
    return (false);
}
// 链接加参数
function addOrgToUrl(key, val) {
    let url = window.location.href;
    if (url.indexOf(key) > -1) {
        const re = eval(`/(${key}=)([^&]*)/gi`);
        url = url.replace(re, `${key}=${val}`);
    } else {
        const paraStr = `${key}=${val}`;
        const idx = url.indexOf('?');
        if (idx < 0) {
            url += '?';
        } else if (idx >= 0 && idx != url.length - 1) {
            url += '&';
        }
        url += paraStr;
    }
    return url;
}
// // 设置参数
// function setUrlParameter(to) {
//     penetrateUrl.forEach((item) => {
//         if (to.fullPath.toUpperCase().includes(item.toUpperCase())) {
//             if (!getQueryString('CH')) {
//                 window.location.href = addOrgToUrl('CH', '7X');
//             }
//         }
//     });
// }
const penetrateUrl = ['/openAccount/khEmpower', '/member/rightsfree', '/banks/myYLBanks'];

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    // if (onResolve || onReject) return originalPush.call(this,location,onResolve,onReject)
    return originalPush.call(this, location).catch(err => err);
};

// 全局活动下线
function pagedownline(to) {
    return new Promise((resolve, reject) => {
        const pageUrl = `https://fintech.12580life.com${process.env.BASE_URL}${to.path.slice(1)}`;
        api.pagedownline({ pageUrl }).then((res) => {
            // 0是未下线 1是已下线
            res.body.state === '0' ? store.commit('setActivityOffline', false) : store.commit('setActivityOffline', true);
            resolve(res.body.state);
        }).catch((err) => {
            resolve('0');
        });
    });
}

// 内测版页面查询
function checkTestPage(to) {
  const pageUrl = `https://fintech.12580life.com${process.env.BASE_URL}${to.path.slice(1)}`;
  api.checkTestPage({ pageUrl }).then((res) => {
    //  closeBetaFlag  是否为内测版 0:是 1:否
    //  whiteListFlag  是否为白名单 0:是 1:否
    if(res.closeBetaFlag == '1' && res.whiteListFlag == '1') {
      store.commit('setTestingPage', false)
    } else if(res.closeBetaFlag == '0' && res.whiteListFlag == '1'){
      store.commit('setTestingPage', true)
    } else if(res.closeBetaFlag == '0' && res.whiteListFlag == '0'){
      store.commit('setTestingPage', false)
    }
  })
  .catch((err) => {
    store.commit('setTestingPage', false)
  });
}

// 设置分销码
function setDistributionCode(to) {
    // 分销码统计
    if (to.query.gytype && to.query.parchn) {
        const userAgent = navigator.userAgent || '';
        let accessSource;
        if (userAgent.toLowerCase().indexOf('leadeon') > -1) {
            accessSource = '01';
        } else if (userAgent.toLowerCase().indexOf('jsmcc') > -1) {
            accessSource = '02';
        } else {
            accessSource = '00';
        }
        let url = window.location.href;
        const index = url.indexOf('?');
        url = url.slice(0, index);
        api.statisticCode({
            pageUrl: `https://fintech.12580life.com/fintech-h5/fortuneCenter${to.path}`,
            pageLevel: '1',
            parentChannel: to.query.parchn || '',
            childChannel: to.query.gytype.slice(0, 6) || '',
            accessSource
        });
    }
}

// router.beforeEach(async (to, from, next) => {
//     // 全局活动下线，已下线无需登录
//     const pagedownlineStatus = 0;
//     // if (pagedownlineStatus === '1') {
//     //     to.meta.title = '温馨提示';
//     //     next();
//     //     return;
//     // }

//     store2.default.set('toPath', to.path);
//     store2.default.set('isRequiresAuth', to.meta.requiresAuth);
//     // 地址拼接typeId
//     const beforeUrl = store2.default.set('locationHref');
//     const isGo = to.name !== 'walletCardcenter' && to.name !== 'index';
//     // 优+ iframe登录优化
//     if (to.name === 'uAdd') {
//         window.sessionStorage.setItem('isuAdd', 'uAdd');
//     }
//     const isuAddFlag = !!window.sessionStorage.getItem('isuAdd');

//     if (from.query.gytype && from.query.parchn) {
//         if (!to.query.gytype) {
//             to.query.gytype = from.query.gytype;
//         }
//         if (!to.query.parchn) {
//             to.query.parchn = from.query.parchn;
//         }
//     }
//     if (from.query.dealChn && !to.query.dealChn) {
//         router.push({
//             path: to.path,
//             query: {
//                 ...to.query,
//                 dealChn: from.query.dealChn
//             }
//         });
//     }
//     if (
//         beforeUrl
//       && beforeUrl.indexOf('typeId') > -1
//       && !from.query.typeId
//       && !to.query.typeId
//       && isGo
//     ) {
//         const reg = beforeUrl.split('?')[1].split('&');
//         reg.forEach((item) => {
//             if (item.indexOf('typeId=') > -1) {
//                 router.push({
//                     path: to.path,
//                     query: {
//                         ...to.query,
//                         typeId: item.split('=')[1]
//                     }
//                 });
//             }
//         });
//     }
//     if (from.query.typeId && !to.query.typeId && isGo) {
//         router.push({
//             path: to.path,
//             query: {
//                 ...to.query,
//                 typeId: from.query.typeId
//             }
//         });
//     }
//     // const cmtokenid = getCookie('cmtokenid');
//     // 如果cookie中没有就从userAgent中去
//     const agentStr = navigator.userAgent || '';
//     let accessSource;
//     if (agentStr.toLowerCase().indexOf('leadeon') > -1) {
//         accessSource = '01';
//     } else if (agentStr.toLowerCase().indexOf('jsmcc') > -1) {
//         accessSource = '02';
//     } else {
//         accessSource = '00';
//     }
//     if (agentStr.indexOf('leadeon') == -1) {
//         setGeneralPropsApp();
//     }
//     let temp = [];
//     let cmtokenid = '';
//     // 异网用户判断
//     let YWLoginCookie = '';
//     // let ywcrmtoken = ''
//     if (agentStr.indexOf('cmtokenid') >= 0 && !getCookie('cmtokenid')) {
//         temp = agentStr.split('cmtokenid=');
//         temp = temp[1].split('&');
//         cmtokenid = temp[0];
//     } else if (getCookie('cmtokenid')) {
//         cmtokenid = getCookie('cmtokenid');
//     } else {
//         // 浏览器中返回
//         // if(getCookie('ywcrmtoken')){
//         //   ywcrmtoken = getCookie('ywcrmtoken')
//         // }
//         // YWLoginCookie = "ODNIBcx1Ve0R3kOpFWUtkQ== "
//         // zhangting异网从cookie中取
//         if (getCookie('YWLoginCookie')) {
//             YWLoginCookie = getCookie('YWLoginCookie');
//         }
//     }
//     const localCmtokenid = store2.default.get('localCmtokenid');
//     // 客户端刷新tokenid则更新本地token缓存
//     if (localCmtokenid !== cmtokenid) {
//         store2.default.set('localCmtokenid', cmtokenid);
//         // 切换手机后，重新走login接口
//         store2.default.set('loginSesion', null);
//     }
//     // pagetokenid测试环境测试用，生产换成cmtokenid
//     const pagetokenid = getQueryString('tokenid');

//     if (to.meta.bgcolor) {
//         window.document.body.className = to.meta.bgcolor;
//     } else {
//         window.document.body.className = '';
//     }

//     // 根据pagetokenid和cmtokenid选取单点登录token,优先选择cmtokenid
//     let loginToken;
//     if (cmtokenid != null && cmtokenid !== '') {
//         loginToken = cmtokenid;
//         store2.default.set('localCmtokenid', cmtokenid);
//         console.log('cmtokenid----', cmtokenid);
//     } else if (pagetokenid != null && pagetokenid !== '') {
//         loginToken = pagetokenid;
//         console.log('pagetokenid----', pagetokenid);
//     }
//     console.log('loginToken----', loginToken);

//     let token = store2.default.get('loginSesion');
//     console.log('token----', token);

//     // 跳转开户页前先进入授权页
//     if (
//         to.name === 'walletAccount'
//       && from.name !== 'walletOpenAccValiCode'
//       && from.name !== 'walletAccount'
//       && from.name !== 'khEmpower'
//       && from.name !== 'comprehensive'
//       && from.name !== 'walletOpenAccResult'
//       && to.query.pageFrom !== 'khEmpower'
//     ) {
//         router.push({
//             name: 'khEmpower',
//             query: {
//                 ...to.query
//             }
//         });
//     }
//     store2.default.set('saveEnter', loginToken);
//     let uAddLogin;
//     if (to.name == 'uAdd') {
//         uAddLogin = to.query.token || '';
//     }
//     if (to.meta.requiresAuth) {
//         let leadeonToken = '';
//         if (agentStr.indexOf('leadeon') >= 0 && !isuAddFlag) {
//             // 大网认证
//             // 一级手厅中国移动提供
//             // 第一步，从URL读取token
//             leadeonToken = decodeURIComponent(getQueryVariable('token')) || '';
//             if (!(!leadeonToken || leadeonToken == 'false')) {
//                 // 如果有值，则调用后台接口，后台接口调用移动认证uniTokenvalidate接口获取手机号并实现单点登录
//                 return;
//             }

//             // 第二步 判断是否是掌厅端内。
//             const ua = navigator.userAgent.toLowerCase();
//             const sourceIdVal = '039014';
//             const pageUrlB = encodeURIComponent(
//                 delectQueryString(window.location.href, 'tokenid')
//             );
//             if (ua.match(/leadeon/i) == 'leadeon') {
//                 // 在手机营业厅的webview内
//                 leadeon.userStatus({
//                     success(res) {
//                         const { status } = res; // 本网登录状态：0未登录；1服务密码登录；2短信验证码登录
//                         if (status == 1 || status == 2) {
//                             // 会话校验
//                             leadeon.checkSessionIsvalid({
//                                 success(res1) {
//                                     const status1 = res1.status; // 字符串类型，状态：0 校验失败；1 校验成功。
//                                     if (status1 == 1) {
//                                         // 获取客户端用户信息
//                                         leadeon.getUserInfo({
//                                             success(res2) {
//                                                 const { version } = res2; // 客户端版本号

//                                                 gdp('setUserId', res2.phoneNumber);
//                                                 gdp('setGeneralProps', {
//                                                     WT_cid: res2.cid || '',
//                                                     WT_clientID: res2.clientID || '',
//                                                     WT_prov: res2.province || '', // 用户登陆省份和定位省份取最新值，例如：311
//                                                     WT_city: res2.city || '', // 用户登陆地市和定位地市取最新值，例如：0310
//                                                     WT_userBrand: res2.userBrand || '', // 用户的品牌，01、全球通 02、神州行 03、动感地带 09、其他品牌
//                                                     WT_loginProvince: res2.loginProvince || '', // 登录号码归属地省编码，例如：311
//                                                     WT_loginCity: res2.loginCity || ''// 登录号码归属地市编码，例如：0310
//                                                 });
//                                                 if (versionJudgment(version)) {
//                                                     // 走大网认证（移动认证）单点流程，通过js方法主动请求token
//                                                     leadeon.getYDRZToken({
//                                                         debug: false,
//                                                         sourceId: sourceIdVal, // 目标业务平台sourceId
//                                                         success(res3) {
//                                                             // 是否有凭证
//                                                             if (res3.token) {
//                                                                 // 如果有值，则调用后台接口，后台接口调用移动认证uniTokenvalidate接口获取手机号并实现单点登录
//                                                                 leadeonToken = res3.token;
//                                                                 // 大网拿到token，走内部单点登录接口
//                                                                 api.banksApi
//                                                                     .queryToken({
//                                                                         tokenId: leadeonToken,
//                                                                         userFlag: '3' // 一级手厅用户
//                                                                     })
//                                                                     .then((data) => {
//                                                                         // 分销码统计
//                                                                         // setDistributionCode(to);
//                                                                         // if( pagedownlineStatus == 0) {
//                                                                         //   // 页面未下线
//                                                                         //   checkTestPage(to);
//                                                                         // }
//                                                                         next();
//                                                                         store2.default.set('loginSesion', data.body.sessionId);
//                                                                         store2.default.set('loginTokenId', leadeonToken);
//                                                                         if (data.body.loginName) {
//                                                                             store2.default.set(
//                                                                                 'usrmob',
//                                                                                 data.body.loginName.split('-')[1]
//                                                                             );
//                                                                             setCookieNotTimeOut(
//                                                                                 'userMobileForBigData',
//                                                                                 data.body.loginName.split('-')[1]
//                                                                             );
//                                                                         }
//                                                                     })
//                                                                     .catch((res) => {
//                                                                         if (res && res.msgInfo) {
//                                                                             this.$toast.info(res.msgInfo);
//                                                                         }

//                                                                         // 重新刷新进页面
//                                                                         window.location.reload();
//                                                                     });
//                                                             } else {
//                                                                 window.location.replace = `https://portal.cmpassport.com/sso-aggregator/index.html?channelID=12006&fromPlatformID=1&sourceID=${sourceIdVal}&backUrl=${pageUrlB}`;
//                                                             }
//                                                         },
//                                                         error(res) {

//                                                         }
//                                                     });
//                                                 } else {
//                                                     window.location.replace = `https://portal.cmpassport.com/sso-aggregator/index.html?channelID=12006&fromPlatformID=1&sourceID=${sourceIdVal}&backUrl=${pageUrlB}`;
//                                                 }
//                                             },
//                                             error(res2) { }
//                                         });
//                                     } else {
//                                         leadeon.overTime();// 会话失效，拉起登录
//                                     }
//                                 },
//                                 error(res1) { }
//                             });
//                         } else {
//                             leadeon.showLogin();// 非登录状态拉起登录
//                         }
//                     },
//                     error(res) { }
//                 });
//             } else {
//                 window.location.replace = `https://portal.cmpassport.com/sso-aggregator/index.html?channelID=12006&fromPlatformID=1&sourceID=${sourceIdVal}&backUrl=${pageUrlB}`;
//             }
//         } else {
//             if (token != null && token !== '') {
//                 // 分销码统计
//                 // setDistributionCode(to);
//                 // if( pagedownlineStatus == 0) {
//                 //   // 页面未下线
//                 //   checkTestPage(to);
//                 // }
//                 next();
//                 return;
//             }
//             // 优+登录token为空转跳登录页
//             if (to.name === 'uAdd' && uAddLogin !== '') {
//                 api.banksApi
//                     .queryToken({
//                         token: uAddLogin,
//                         userFlag: '2' // jsyd用户
//                     })
//                     .then((data) => {
//                         token = data.body.sessionId;
//                         store2.default.set('loginSesion', token);
//                         store2.default.set('saveEnter', loginToken);
//                         // store2.default.set('saveEnter', null);
//                         store2.default.set('loginTokenId', loginToken);
//                         if (data.body.loginName) {
//                             store2.default.set(
//                                 'usrmob',
//                                 data.body.loginName.split('-')[1]
//                             );
//                             setCookieNotTimeOut(
//                                 'userMobileForBigData',
//                                 data.body.loginName.split('-')[1]
//                             );
//                         }
//                         // 分销码统计
//                         // setDistributionCode(to);
//                         // if( pagedownlineStatus == 0) {
//                         //   // 页面未下线
//                         //   checkTestPage(to);
//                         // }
//                         next();
//                     })
//                     .catch(() => {
//                         store2.default.remove('saveEnter');
//                         router.replace({
//                             name: 'login',
//                             query: { redirect: to.fullPath }
//                         });
//                         delCookie('userMobileForBigData');
//                         // delCookie('cmtokenid');
//                         // window.location.replace(delectQueryString(window.location.href, 'tokenid'));
//                     });
//                 return;
//             }
//             // 有登录token时候走的内部单点登录接口
//             api.banksApi
//                 .queryToken({
//                     tokenId: loginToken,
//                     userFlag: '0' // jsyd用户
//                 })
//                 .then((data) => {
//                     token = data.body.sessionId;
//                     store2.default.set('loginSesion', token);
//                     store2.default.set('saveEnter', loginToken);
//                     // store2.default.set('saveEnter', null);
//                     store2.default.set('loginTokenId', loginToken);
//                     if (data.body.loginName) {
//                         store2.default.set(
//                             'usrmob',
//                             data.body.loginName.split('-')[1]
//                         );
//                         setCookieNotTimeOut(
//                             'userMobileForBigData',
//                             data.body.loginName.split('-')[1]
//                         );
//                     }
//                     // 分销码统计
//                     // setDistributionCode(to);
//                     // if( pagedownlineStatus == 0) {
//                     //   // 页面未下线
//                     //   checkTestPage(to);
//                     // }
//                     next();
//                 })
//                 .catch(() => {
//                     store2.default.remove('saveEnter');
//                     store2.default.set('loginSesion', null);
//                     // router.replace({
//                     //     name: "login",
//                     //     query: { redirect: to.fullPath },
//                     // });
//                     if (Vue.client.JSMCC) {
//                         // 安卓端
//                         if (Vue.client.ANDROID) {
//                             window.buy.getOneKeyToken();
//                             window.buy.buyImmediately();
//                         } else if (Vue.client.IOS) {
//                             // IOS端
//                             iosGetToken();
//                             window.location.href = 'phonestore://jumpToLogin';
//                         }
//                     } else {
//                         const pageUrl = encodeURIComponent(
//                             delectQueryString(window.location.href, 'tokenid')
//                         );
//                         const url = `https://wap.js.10086.cn/vw/JRGY/DLTZ?autoauth=jtauth&redirectURL=${pageUrl}`;
//                         console.log('url---99', url);
//                         window.location.assign(url);
//                     }
//                     delCookie('userMobileForBigData');
//                 });
//         }
//     } else {
//         next();
//     }
// });
router.beforeEach((to, from, next) => {
    next();
})

export default router;
