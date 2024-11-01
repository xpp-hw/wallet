/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import * as url from 'url';
import request from './ajax';

const userAgentL = navigator.userAgent.toLowerCase();
function setUrlParameter(data) {
    const params = {
        channelNew: '1000000002110700006'
    };
    if (userAgentL.indexOf('leadeon') > -1) {
        return { ...params, ...data };
    }
    return data;
}
const api = {
    // 宁波银行，信用卡活动参与记录查询
    getCreditCardActInfo(data) {
        return request(
            'post',
            '/fintech/wallet/v1/nbBank/getCreditCardActInfo',
            data
        );
    },

    // 宁波银行，抽奖接口
    getLottery(data) {
        return request('post', '/fintech/wallet/v1/nbBank/lottery', data);
    },
    // 获取省份
    getProvince() {
        return request('get', '/fintech/wallet/v1/common/province-city');
    },
    // 查询用户是否开户
    getIndexCode(data) {
        return request(
            'post',
            '/fintech/wallet/v1/user/account-status-info',
            data
        );
    },
    // 开户页面信息查询
    queryOpenAccount() {
        return request('post', '/fintech/wallet/v1/initSignInfo', {});
    },
    // 钱包权益功能
    getRightsCode() {
        return request(
            'post',
            '/fintech/wallet/v1/right/usrAccountStsQuery',
            {}
        );
    },
    queryusrRevRightSts() {
        return request(
            'post',
            '/fintech/wallet/v1/right/usrRevRightStsQuery',
            {}
        );
    },
    receiveUsrRightPost(data) {
        return request(
            'post',
            '/fintech/wallet/v1/right/usrRightReceive',
            data
        );
    },
    // 开户前置校验
    getInitinfo(data) {
        return request('post', '/fintech/wallet/v1/openPreCheck', data);
    },
    getMobileCheck() {
        return request(
            'post',
            '/fintech/wallet/v1/openPreCheck/mobileCheck',
            {}
        );
    },
    // 开户校验银行卡号
    checkUsrBank(data) {
        return request('post', '/fintech/wallet/v1/checkOwnerBanks', data);
    },
    // 开户短信验证码获取
    sendMsgOpenAcct(data) {
        return request(
            'post',
            '/fintech/wallet/v1/sendMessageForOpenAccount',
            data
        );
    },
    // 开户验证码校验
    valiOpenAcctCode(data) {
        return request('post', '/fintech/wallet/v1/submitForOpenAccount', setUrlParameter(data));
    },
    // 签约短信验证码获取
    sendSigncode(data) {
        return request(
            'post',
            '/fintech/wallet/v1/sendOprtAccountMessage',
            data
        );
    },
    // 签约验证码校验
    valiSigncode(data) {
        return request('post', '/fintech/wallet/v1/oprtAccountSubmit', data);
    },
    // 解绑短信下发
    unwindSendCode(data) {
        return request('post', '/fintech/wallet/v1/unwind/send-sms', data);
    },
    // 解绑短信校验
    unwindValiCode(data) {
        return request('post', '/fintech/wallet/v1/unwind/submit', data);
    },
    // 换绑短信验证码获取
    cgBindSendCode(data) {
        return request(
            'post',
            '/fintech/wallet/v1/sendChangeAccMblMessage',
            data
        );
    },
    // 换绑短信验证码校验
    cgBindValiCode(data) {
        return request(
            'post',
            '/fintech/wallet/v1/submitChangeAccMblMessage',
            data
        );
    },
    // 零钱余额查询
    queryBalance(data) {
        return request(
            'post',
            '/fintech/wallet/v1/account/query-balance',
            data
        );
    },
    // 销户短信验证码下发
    cancelAccSms(data) {
        return request('post', '/fintech/wallet/v1/cancelAcc/send-sms', data);
    },
    // 销户提交
    cancelAccValiCode(data) {
        return request('post', '/fintech/wallet/v1/cancelAcc/submit', data);
    },
    // 根据typeId获取返回地址
    getBackAddress(data) {
        return request('post', '/fintech/wallet/v1/getBackUrl', data);
    },
    // 银行卡识别
    BankIdentification(data) {
        return request('post', '/fintech/wallet/v1/card/identity', data);
    },
    // 数字货币
    digiccyApi: {
        register() {
            return request('get', '/fintech/wallet/v1/digiccy/register');
        },
        getInfo() {
            return request('get', '/fintech/wallet/v1/digiccy/getInfo');
        },
        getConfig() {
            return request('get', '/fintech/wallet/v1/digiccy/getConfig');
        },
        getList(data) {
            return request('get', '/fintech/wallet/v1/ecny/account/list', data);
        }
    },
    pocketsApi: {
        // 零钱,账单详情
        pocketsQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/account/query-balance',
                data
            );
        },
        pocketsDetailQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/account/balance-detail',
                data
            );
        }
        // billDetailQuery(data) {
        //     return request('get', '/fintech/salesman/v1/order', data);
        // }
    },
    changeWithdrowApi: {
        // 提现
        // queryBankList(data) { // 查询银行卡信息
        //     return request('post', '/wallet/v1/user/account-status-info', data);
        // },
        queryMsm(data) {
            // 短信下发
            return request('post', '/fintech/wallet/v1/advance/send-sms', data);
        },
        submitWithdrow(data) {
            // 发起请求
            return request('post', '/fintech/wallet/v1/advance/submit', data);
        },
        submitWithdrowResult(data) {
            // 查询结果
            return request(
                'post',
                '/fintech/wallet/v1/advance/status-query',
                data
            );
        }
    },
    rechargeApi: {
        // 充值
        queryBankList(data) {
            // 查询银行卡信息
            return request(
                'post',
                '/fintech/wallet/v1/user/account-status-info',
                data
            );
        },
        queryMsm(data) {
            // 短信下发
            return request(
                'post',
                '/fintech/wallet/v1/recharge/send-sms',
                data
            );
        },
        submitRecharge(data) {
            // 进行请求
            return request('post', '/fintech/wallet/v1/recharge/submit', data);
        },
        submitRechargeResult(data) {
            // 查询结果
            return request(
                'post',
                '/fintech/wallet/v1/recharge/status-query',
                data
            );
        }
    },
    paymentApi: {
        // 支付密码
        PaymentPasswordAcceptance(data) {
            // 支付密码受理
            return request('post', '/fintech/wallet/v1/payPwd/accept', data);
        },
        SettingModification(data) {
            // 支付密码新建/变更
            return request('post', '/fintech/wallet/v1/payPwd/start', data);
        },
        ModifyVerification(data) {
            // 支付密码变更信息校验
            return request('post', '/fintech/wallet/v1/payPwd/startChk', data);
        },
        StatusQuery(data) {
            // 支付密码状态查询
            return request(
                'post',
                '/fintech/wallet/v1/payPwd/status-query',
                data
            );
        },
        PaymentPasswordVerification(data) {
            // 原支付密码校验
            return request('post', '/fintech/wallet/v1/payPwd/chk', data);
        },
        WeakCipherTest(data) {
            // 弱密码检验
            return request('post', '/fintech/wallet/v1/payPwd/wekchk', data);
        }
    },
    personInfor: {
        // 个人信息
    },
    banksApi: {
        // 我的银行卡
        queryToken(data) {
            // 查询token
            return request('post', '/fintech/wallet/v1/user/login', data);
        },
        queryElectronic(data) {
            // 查询电子银行卡
            return request(
                'post',
                '/fintech/wallet/v1/account/query-balance',
                data
            );
        },
        queryBankList(data) {
            // 查询银行卡信息
            return request(
                'post',
                '/fintech/wallet/v1/user/account-status-info',
                data
            );
        },
        setBank(data) {
            // 设置默认银行卡
            return request(
                'post',
                '/fintech/wallet/v1/card/default-setting',
                data
            );
        },
        queryBankMsm(data) {
            // 短信下发添加和删除同一个
            return request('post', '/fintech/wallet/v1/card/send-sms', data);
        },
        deleteBank(data) {
            // 删除银行卡提交
            return request('post', '/fintech/wallet/v1/card/unbind', data);
        },
        addBank(data) {
            // 添加银行卡提交
            return request('post', '/fintech/wallet/v1/card/bind', data);
        },
        addStatus(data) {
            // 添加银行卡提交状态查询
            return request(
                'post',
                '/fintech/wallet/v1/card/result-query',
                data
            );
        },
        bankStatus(data) {
            // 添加银行卡校验归属
            return request('post', '/fintech/wallet/v1/checkOwnerBanks', data);
        },
        queryBankType(data) {
            // 查询银行卡类型
            return request('post', '/fintech/wallet/v1/card/getCardType', data);
        }
    },
    looseChange: {
        // 零钱账户
        setDefAcc(data) {
            // 默认零钱账户
            return request('post', '/fintech/wallet/v1/setDefAcc', data);
        },
        qryAllAcc(data) {
            // 查询用户所有零钱账户信息
            return request('post', '/fintech/wallet/v1/qryAllAcc', data);
        }
    },
    hfb: {
        // 话费宝
        initBalance() {
            // 话费宝首页余额信息
            return request('post', '/fintech/wallet/v1/hfb/initBalance');
        },
        initInfo() {
            // 话费宝开通首页信息
            return request('post', '/fintech/wallet/v1/hfb/initInfo');
        },
        closePin(data) {
            // 话费宝关闭
            return request('post', '/fintech/wallet/v1/hfb/closePin', data);
        },
        qualificationChk(data) {
            // 话费宝开通资格校验
            return request(
                'post',
                '/fintech/wallet/v1/hfb/qualificationChk',
                data
            );
        },
        receivePin(data) {
            // 话费宝领取
            return request('post', '/fintech/wallet/v1/hfb/receivePin', data);
        },
        startPin(data) {
            // 话费宝开通
            return request('post', '/fintech/wallet/v1/hfb/startPin', data);
        },
        income(data) {
            // 话费宝收益记录查询
            return request('post', '/fintech/wallet/v1/hfb/record/income', data);
        },
        receive(data) {
            // 话费宝领取记录查询
            return request('post', '/fintech/wallet/v1/hfb/record/receive', data);
        },
        getHfbSmsCode(data) {
            // 话费宝获取开通或者关闭验证码
            return request(
                'post',
                '/fintech/wallet/v1/hfb/getHfbSmsCode',
                data
            );
        }
    },
    // 招商仁和健康金加保
    renheLogin(data) {
        //
        return request('post', '/fintech/tripartite/v1/user/login', data);
    },
    addPolicy(data) {
        return request('post', '/fintech/tripartite/v1/zsrh/addPolicy', data);
    },
    // 获取银行机构开户情况
    bannerCheck(data) {
        return request('post', '/fintech/wallet/v1/banner/check', data);
    },
    // 金融授权通用接口
    addEmpower(data) {
        return request('post', 'fintech/wallet/v1/user/auth', data);
    },
    // 用户手机号查询
    getUserPhone(data) {
        return request('get', '/fintech/wallet/v1/user/info', data);
    },
    // 页面挽留
    leaveKhPage(data) {
        return request('post', 'fintech/wallet/v1/user/retain', data);
    },
    // 页面挽留,发送短信
    leaveKhSms(data) {
        return request('post', 'fintech/wallet/v1/user/sms', data);
    },
    // 专属权益，10元话费
    ticketUseSts(data) {
        return request(
            'post',
            'fintech/wallet/v1/activity/ticketUseSts-query',
            data
        );
    },
    // 获取开户失败原因
    openResult(data) {
        return request('post', 'fintech/wallet/v1/open/result', data);
    },
    // 系统维护公告
    maintenanceBulletin(data) {
        return request('post', 'fintech/tripartite/v1/loans/getNotice', data);
    },
    // 系统维护公告(仅首页)
    getFirstPageNotice(data) {
        return request('post', '/fintech/tripartite/v1/loans/getFirstPageNotice', data);
    },
    // 微信分享接口
    sharingInterface(data) {
        return request('post', '/fintech/tripartite/v1/wxShare/getToken', data);
    },
    // 获取话费宝收益领取金额
    hfbConfig(data) {
        return request('post', '/fintech/wallet/v1/hfb/config', data);
    },
    // 获取开户结果页用户是否首次开户
    firstCheck(data) {
        return request('post', '/fintech/wallet/v1/open/firstCheck', data);
    },

    // 钱包一分购活动
    // 用户权益列表及领取状态查询：
    usrRevRightStsQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/right/usrRevRightStsQuery',
            data
        );
    },
    // 下单接口
    rightPayOrder(data) {
        return request('post', '/fintech/wallet/v1/right/rightPayOrder', data);
    },
    // 下单接口
    usrRightDetailsQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/right/usrRightDetailsQuery',
            data
        );
    },
    hookUp: {
        // 挂接
        agreeReq(data) {
            // 挂接请求短信下发
            return request(
                'post',
                '/fintech/wallet/v1/digiccy/agree-req',
                data
            );
        },
        agreeConfirm(data) {
            // 挂接确认
            return request(
                'post',
                '/fintech/wallet/v1/digiccy/agree-confirm',
                data
            );
        },
        secondAgreeReq(data) {
            // 重复挂接短信下发
            return request(
                'post',
                '/fintech/wallet/v1/digiccy/second/agree-req',
                data
            );
        },
        secondAgreeConfirm(data) {
            // 重复挂接确认
            return request(
                'post',
                '/fintech/wallet/v1/digiccy/second/agree-confirm',
                data
            );
        }
    },
    // 获取触点内容
    getWapTouch(data) {
        return request('post', '/fintech/wallet/v1/common/getWapTouch', data);
    },
    // 零钱账户查询
    qrySmallChangeAcc(data) {
        return request('post', '/fintech/wallet/v1/qrySmallChangeAcc', data);
    },
    // 权益账户查询接口
    rightAccountQuery(data) {
        return request('post', '/fintech/wallet/v1/rightAccountQuery', data);
    },
    // 移动钱包角标内容查询接口
    cornerContentQuery(data) {
        return request('post', '/fintech/wallet/v1/cornerContentQuery', data);
    },
    // 卡面信息查询
    cardImageQuery(data) {
        return request('post', '/fintech/wallet/v1/cardImageQuery', data);
    },
    // 快捷银行卡信息 - 对接支付项目
    wapAcplist(data) {
        return request('post', '/fintech/wallet/v1/wap/acp-list', data);
    },
    // 营销中心活动发放记录查询接口

    getPrizeInfo(data) {
        return request(
            'post',
            '/fintech/wallet/v1/activity/getPrizeInfoList',
            data
        );
    },
    // 银行卡快捷绑卡记录查询接口
    getacpInfo(data) {
        return request('post', '/fintech/wallet/v1/wap/acp-list', data);
    },
    // 银行卡绑定页面改造
    newBank: {
        // 签约
        // 获取用户登录信息
        getUserLogin() {
            return request('post', '/fintech/wallet/v1/wap/get-user-login');
        },
        // 银联代收签约短信
        acpSendSms(data) {
            return request('post', '/fintech/wallet/v1/wap/acp-send-sms', data);
        },
        // 银联代收签约
        acpSign(data) {
            return request('post', '/fintech/wallet/v1/wap/acp-sign', data);
        },
        // 解约
        // 银联代收解约下发短信
        acpRescindSms(data) {
            return request(
                'post',
                '/fintech/wallet/v1/wap/acp-rescind-sms',
                data
            );
        },
        // 银联代收解约下发短信
        acpRescin(data) {
            return request('post', '/fintech/wallet/v1/wap/acp-rescind', data);
        },
        // 绑卡列表
        acpList(data) {
            return request('post', '/fintech/wallet/v1/wap/acp-list', data);
        },
        // 绑卡列表 银行卡不脱敏
        walAcpList(data) {
            return request('post', '/fintech/wallet/v1/wap/wal-acp-list', data);
        },
        // 页面返回地址
        backUrl(data) {
            return request('post', '/fintech/wallet/v1/wap/getBackUrl', data);
        }
    },

    // 首页弹窗点击逻辑
    clickStatistics(data) {
        return request(
            'post',
            '/fintech/wallet/v1/deploy/clickStatistics',
            data
        );
    },
    // 对接萌鹿乐园
    mengLuTask(data) {
        return request('post', '/fintech/wallet/v1/menglu/doEBeanTask', data);
    },
    // 查询是否为流失用户
    queryLostuser() {
        return request('post', '/fintech/wallet/v1/recharge/lostuser');
    },
    // 查询是否为新用户
    queryNewuser() {
        return request('post', '/fintech/wallet/v1/recharge/newuser');
    },
    // 查询是否为企微用户
    getEnterpriseMicroActivityUser() {
        return request(
            'post',
            '/fintech/wallet/v1/microActivity/getEnterpriseMicroActivityUser'
        );
    },
    // 企微用户领取
    QiWeiGet(data) {
        return request(
            'post',
            '/fintech/wallet/v1/microActivity/getRigntNew',
            data
        );
    },
    // 流失用户领取权益
    getRigntLost(data) {
        return request('post', `/fintech/wallet/v1/recharge/getRigntLost?parentChannel=${data.parentChannel}&childChannel=${data.childChannel}&accessSource=${data.accessSource}`);
    },
    // 新用户领取权益
    getRigntNew(data) {
        return request('post', `/fintech/wallet/v1/recharge/getRigntNew?parentChannel=${data.parentChannel}&childChannel=${data.childChannel}&accessSource=${data.accessSource}`);
    },
    // 和包余额查询
    balanceQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/hePackage/balanceQuery',
            data
        );
    },
    // 小宝花账户信息查询
    accountInfoQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/studentCard/accountInfoQuery',
            data
        );
    },
    // 小宝花账户信息同步
    accountInfoSyn(data) {
        return request(
            'post',
            '/fintech/wallet/v1/studentCard/accountInfoSyn',
            data
        );
    },
    // 小宝花绑卡列表查询
    flowerAcplist(data) {
        return request('post', '/fintech/wallet/v1/studentCard/acp-list', data);
    },
    // 小宝花交易明细查询
    ordInfoInfoQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/studentCard/ordInfoInfoQuery',
            data
        );
    },
    // 关闭小宝花验证码
    getXbhSmsCode(data) {
        return request(
            'post',
            '/fintech/wallet/v1/studentCard/getXbhSmsCode',
            data
        );
    },
    // 小宝花账户关闭
    accountInfoClose(data) {
        return request(
            'post',
            '/fintech/wallet/v1/studentCard/accountInfoClose',
            data
        );
    },
    // 小宝花解密接口
    decrypt(data) {
        return request('post', '/fintech/wallet/v1/studentCard/decrypt', data);
    },
    // 查询有无领取过元券
    getWalletOpenPrizeInfo(data) {
        return request(
            'post',
            '/fintech/wallet/v1/activity/getWalletOpenPrizeInfo',
            data
        );
    },
    // 用户0元包状态查询
    zeroPackageQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/right/zeroPackageQuery',
            data
        );
    },
    // 用户开户状态查询
    usrAccountStsQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/right/usrAccountStsQuery',
            data
        );
    },
    // 短信下发接口
    newSmsSend(data) {
        return request('post', '/fintech/wallet/v1/right/newSmsSend', data);
    },
    // 开通零元包
    zeroPackageTransaction(data) {
        return request(
            'post',
            '/fintech/wallet/v1/right/zeroPackageTransaction',
            setUrlParameter(data)
        );
    },
    // 计算权益领取数量
    usrRevRightNum(data) {
        return request(
            'post',
            '/fintech/wallet/v1/right/usrRevRightStsQuery',
            data
        );
    },
    // 0元包开通下发优惠卷
    zeroOpenCoupons() {
        return request('poset', '/fintech/wallet/v1/right/zeroOpenCoupons');
    },
    // 用户权益领取
    usrRightReceive(data) {
        return request(
            'post',
            '/fintech/wallet/v1/right/usrRightReceive',
            data
        );
    },
    llb: {
        // 流量宝开通资格校验
        discharge(data) {
            return request(
                'post',
                '/fintech/wallet/v1/llb/qualificationChk',
                data
            );
        },
        // 流量宝开通验证码下发
        getHfbSmsCode(data) {
            return request(
                'post',
                '/fintech/wallet/v1/llb/getHfbSmsCode',
                data
            );
        },
        // 流量宝开通
        startPin(data) {
            return request('post', '/fintech/wallet/v1/llb/startPin', data);
        },
        // 流量宝关闭

        closePin(data) {
            return request('post', '/fintech/wallet/v1/llb/closePin', data);
        },
        // 余额查询
        initBalance(data) {
            return request('post', '/fintech/wallet/v1/llb/initBalance', data);
        },
        // 流量宝信息查询
        initInfo(data) {
            return request('post', '/fintech/wallet/v1/llb/initInfo', data);
        },
        // 流量宝领取
        receivePin(data) {
            return request('post', '/fintech/wallet/v1/llb/receivePin', data);
        },
        // 流量宝领取记录查询
        receive(data) {
            return request(
                'post',
                '/fintech/wallet/v1/llb/record/receive',
                data
            );
        }
    },
    getUserNo(data) {
        return request('post', '/fintech/wallet/v1/user/get-user-login', data);
    },
    Bank: {
        // 活动领取记录查询
        getPrizeInfo(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/getPrizeInfo',
                data
            );
        },
        // 权益领取发放接口
        getReceive(data) {
            return request('post', '/fintech/wallet/v1/right/receive', data);
        }
    },
    blindBox: {
        /* 查询活动状态 */
        usrOnePayAccStsQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/usrOnePayAccStsQuery',
                data
            );
        },
        /* 下单 */
        rightPayOrder(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/rightPayOrder',
                data
            );
        },
        /* 抽奖状态查询 */
        usrRightDetailsQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/usrRightDetailsQuery',
                data
            );
        },
        /* 奖品查询 */
        usrOnePayOrderQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/usrOnePayOrderQuery',
                data
            );
        }
    },
    // 话费余额查询
    qryCallBalance(data) {
        return request('post', '/fintech/wallet/v1/qryCallBalance', data);
    },
    autoRecharge: {
        // 多账户查询
        queryAcc(data) {
            return request(
                'post',
                '/fintech/wallet/v1/epay/walletAccQuery',
                data
            );
        },
        // 易充值关系查询
        walletEpayQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/epay/walletEpayQuery',
                data
            );
        },
        // 易充值短信下发
        walletEpaySms(data) {
            return request(
                'post',
                '/fintech/wallet/v1/epay/walletEpaySms',
                data
            );
        },
        // 易充值短信验证
        walletEpaychkSms(data) {
            return request(
                'post',
                '/fintech/wallet/v1/epay/walletEpaychkSms',
                data
            );
        },
        // 易充值办理
        walletEpayDeal(data) {
            return request(
                'post',
                '/fintech/wallet/v1/epay/walletEpayDeal',
                data
            );
        },
        // 和包签约状态查询
        cmpaySignStsQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpaysign/cmpaySignStsQuery',
                data
            );
        },
        // 和包签约链接获取
        cmpayGetSignUrl(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpaysign/cmpayGetSignUrl',
                data
            );
        },
        // 签约结果查询
        usrSignStsQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpaysign/usrSignStsQuery',
                data
            );
        },
        // 易充值校验接口
        checkbusinessdeal(data) {
            return request(
                'post',
                '/fintech/wallet/v1/epay/checkbusinessdeal',
                data
            );
        },
        // 模板查询接口
        easyPayTempQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/epay/easyPayTempQuery',
                data
            );
        },
        // 微信签约地址
        wechatGetSignUrl(data) {
            return request(
                'post',
                '/fintech/wallet/v1/wechatsign/getSignUrl',
                data
            );
        },
        // 微信签约卡号查询
        wechatSignUserQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/wechatsign/wechatSignUserQuery',
                data
            );
        },
        // 微信签约结果查询
        wechatSignStsQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/wechatsign/signStsQuery',
                data
            );
        },
        // 判断支付方式显示或隐藏
        easyPayDisplayQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/epay/easyPayDisplayQuery',
                data
            );
        }
    },

    // 业务单获取
    agreement(data) {
        return request(
            'post',
            '/fintech/wallet/v1/zeroPackage/agreement',
            data
        );
    },
    // 首页零元包
    indexZero(data) {
        return request(
            'post',
            '/fintech/wallet/v1/zeroPackage/zeroPackageQuery',
            data
        );
    },
    save: {
        provWalletQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/provWalletQuery',
                data
            );
        },
        provWalletAgr(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/provWalletAgr',
                data
            );
        },
        provWalletSmsSend(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/provWalletSmsSend',
                data
            );
        },
        provWalletDeal(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/provWalletDeal',
                setUrlParameter(data)
            );
        },
        provWalletRightQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/provWalletRightQuery',
                data
            );
        },
        provWalletRightRecive(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/provWalletRightRecive',
                data
            );
        },
        provWalletRightRecord(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/provWalletRightRecord',
                data
            );
        },
        // 和生活已领取权益查询
        provWalletHlifeRightQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/provWalletHlifeRightQuery',
                data
            );
        },
        rightUsrReceiveQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/right/rightUsrReceiveQuery',
                data
            );
        }
    },
    baiRong: {
        // 百融领取额度和奖品接口
        receiveQuotaAndAward(data) {
            return request(
                'post',
                '/fintech/wallet/v1/bairong/receiveQuotaAndAward',
                data
            );
        },
        // 百融协议
        bairongQueryAgreementList(data) {
            return request(
                'post',
                '/fintech/wallet/v1/bairong/queryAgreementList',
                data,
            );
        },
        // 百融奖品接口
        getMyPrizeList(data) {
            return request(
                'post',
                '/fintech/wallet/v1/bairong/getMyPrizeList',
                data,
            );
        },
        // 百融背景图片获取
        getBackgroundImage(data) {
            return request(
                'post',
                '/fintech/wallet/v1/loanfloor/getLoanFloorConf',
                data,
            );
        }
    },
    authorizationQuery(data) {
        return request(
            'post',
            'fintech/wallet/v1/bairong/authorizationQuery',
            data
        );
    },
    queryAgreementList(data) {
        return request(
            'post',
            '/fintech/jkwy/user/v1/agreement/queryAgreementList',
            data
        );
    },
    huataiPrize(data) {
        return request(
            'post',
            '/fintech/wallet/v1/huatai/prize/list',
            data
        );
    },
    huataiSend(data) {
        return request(
            'post',
            '/fintech/wallet/v1/huatai/prize/send',
            data
        );
    },
    huataiAgreement(data) {
        return request(
            'post',
            '/fintech/wallet/v1/business/agreement/content',
            data
        );
    },
    // 下发短信
    huataiWalletSmsCode(data) {
        return request(
            'post',
            '/fintech/wallet/v1/huataiSaveBusiness/walletSmsCode',
            data
        );
    },
    // 下发语音短信
    huataiWalletVoiceSmsCode(data) {
        return request(
            'post',
            '/fintech/wallet/v1/huataiSaveBusiness/walletVoiceSmsCode',
            data
        );
    },
    // 短信验证含订购业务功能
    huataiWalletSmsCodeVerify(data) {
        return request(
            'post',
            '/fintech/wallet/v1/huataiSaveBusiness/walletSmsCodeVerify',
            data
        );
    },
    // 业务受理单协议
    huataiQueryAgreementList(data) {
        return request(
            'post',
            '/fintech/wallet/v1/huataiSaveBusiness/queryAgreementList',
            data
        );
    },
    getDealInfo(data) {
        return request(
            'post',
            '/fintech/wallet/v1/wallet-ins/getDealInfo',
            data
        );
    },
    BOCM: {
        sendViewDate(data) {
            return request(
                'post',
                '/fintech/wallet/v1/viewData/sendViewDate',
                data
            );
        },
        face(data) {
            return request(
                'post',
                '/fintech/wallet/v1/faceRecognition/face',
                data
            );
        },
        SMS(data) {
            return request(
                'post',
                '/fintech/wallet/v1/BocmFiance/SMS',
                data
            );
        },
        Signed(data) {
            return request(
                'post',
                '/fintech/wallet/v1/BocmFiance/Signed',
                data
            );
        },
        changebindjt(data) {
            return request(
                'post',
                '/fintech/wallet/v1/card/changebindjt',
                data
            );
        }
    },
    // 银联签约获取url
    cupSignGetlink(data) {
        return request(
            'post',
            '/fintech/wallet/v1/frontcup/cup_sign_getlink',
            data
        );
    },
    // 银联签约结果返回
    cupSignStsQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/frontcup/cupSignStsQuery',
            data
        );
    },
    BOCMActivity: {
        // 新户标识查询接口
        newUserFlagQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/bocm/newUserFlagQuery',
                data
            );
        },
        // 权益领取记录查询
        walletOpenActivityQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/bocm/walletOpenActivityQuery',
                data
            );
        },
        // 开户权益领取接口
        receive(data) {
            return request(
                'post',
                '/fintech/wallet/v1/bocm/receive',
                data
            );
        }
    },
    B2CWallet: {
        // 查询和包账户信息接口
        infoList(data) {
            return request(
                'get',
                '/fintech/wallet/v1/cmpay/account/info',
            );
        },
        // 和包账户注册和授权接口
        registerAndAuth(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/registerAndAuth',
                data
            );
        },
        // 和包账户实名接口
        certification(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/certification',
                data
            );
        },
        // 和包账户实名信息查询接口
        certificationInfo(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/certificationInfo',
                data
            );
        },
        // 和包账户token申请接口
        tokenApply(data) {
            return request(
                'get',
                '/fintech/wallet/v1/cmpay/login/tokenApply',
                data
            );
        },
        // 和包账户授权接口
        setAuth(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/auth',
                data
            );
        },
        // 和包账户银行卡解绑短信发送接口
        unbindSms(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/bankCard/unbindSms',
                data
            );
        },
        // 和包账户银行卡解绑接口
        unbind(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/bankCard/unbind',
                data
            );
        },
        // 和包账户充转提订单列表查询接口
        orderList(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/orderList',
                data
            );
        },
        // 和包账户充转提订单结果查询接口
        orderResult(data) {
            return request(
                'get',
                `/fintech/wallet/v1/cmpay/account/orderDetail/${data}`,
            );
        },
        // 和包账户充值接口
        recharge(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/recharge',
                data
            );
        },
        // 和包账户转账前置校验接口
        PreCheck(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/transfer/PreCheck',
                data
            );
        },
        // 和包账户转账接口
        accountTransfer(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/transfer/accountTransfer',
                data
            );
        },
        // 和包账户转账用户姓名获取接口
        payeeName(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/transfer/payeeName',
                data
            );
        },
        // 和包账户转账用户姓名校验接口
        payeeNameCheck(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/transfer/payeeNameCheck',
                data
            );
        },
        // 和包账户提现接口
        withdraw(data) {
            return request(
                'post',
                '/fintech/wallet/v1/cmpay/account/withdraw',
                data
            );
        }
    },

    // E豆任务完成通知接口
    doSigninEBeanTask(data) {
        return request(
            'post',
            '/fintech/wallet/v1/onePoint/doSigninEBeanTask',
            data
        );
    },
    // 省心财经是否订购
    sxcjCheck(data) {
        return request(
            'post',
            '/fintech/wallet/v1/huatai/prize/check',
            data
        );
    },
    // 分销码统计
    statisticCode(data) {
        return request(
            'post',
            '/fintech/wallet/v1/user/statisticCode',
            data,
        );
    },
    // 和包活动奖品查询
    hbPrizeList(data) {
        return request(
            'get',
            '/fintech/wallet/v1/activity/prizeList',
            data,
        );
    },
    // 灵活计费
    flexibleBilling: {
        // 产品信息查询接口
        queryProductInfo(data) {
            return request(
                'post',
                '/fintech/wallet/v1/product-center/queryProductInfo',
                data,
            );
        },
        // 获取权益信息接口
        queryBenefitInfo(data) {
            return request(
                'post',
                '/fintech/wallet/v1/product-center/queryUserBenefitInfo',
                data,
            );
        },
        // 用户权益领取接口
        userBenefitReceive(data) {
            return request(
                'post',
                '/fintech/wallet/v1/product-center/userBenefitReceive',
                data,
            );
        },
        // 产品支付校验接口
        payCheck(data) {
            return request(
                'post',
                '/fintech/wallet/v1/product-center/pay/payCheck',
                data,
            );
        },
        // 产品支付申请接口
        payApply(data) {
            return request(
                'post',
                '/fintech/wallet/v1/product-center/pay/payApply',
                data,
            );
        }
    },
    // 数币订单查询
    queryOrd(data) {
        return request(
            'post',
            '/fintech/wallet/v1/dcpay/queryOrd',
            data,
        );
    },
    // 数币领取
    rightReceive(data) {
        return request(
            'post',
            '/fintech/wallet/v1/dcpay/rightReceive',
            data,
        );
    },
    // 数币领取记录查询
    rightQueryList(data) {
        return request(
            'post',
            '/fintech/wallet/v1/dcpay/rightQueryList',
            data,
        );
    },
    // 是否具备更换绑卡条件查询接口
    bandCardquery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/card/change-bandCard-query',
            data,
        );
    },
    // 省钱包送30元话费活动领取记录查询接口
    thirtyPrizeList(data) {
        return request(
            'post',
            '/fintech/wallet/v1/provWallet/thirtyPrizeList',
            data,
        );
    },
    // 省钱包送30元话费活动领取记录查询接口
    receiveThirty(data) {
        return request(
            'post',
            '/fintech/wallet/v1/provWallet/receiveThirty',
            data,
        );
    },
    // 数币领取记录查询
    walletPageBanner(data) {
        return request(
            'post',
            '/fintech/wallet/v1/walletPageConf/banner',
        );
    },
    // 省钱包天猫券状态查询接口
    tamllCouponState(data) {
        return request(
            'post',
            '/fintech/wallet/v1/provWallet/tamllCouponState',
            data,
        );
    },
    // 省钱包天猫券领取接口
    receiveTmallCoupon(data) {
        return request(
            'post',
            '/fintech/wallet/v1/provWallet/receiveTmallCoupon',
            data,
        );
    },
    // 交通银行新户校验
    checkNewUser(data) {
        return request(
            'post',
            '/fintech/wallet/v1/bocm/checkNewUser',
            data,
        );
    },
    // 广发奖品记录
    freezeDataList(data) {
        return request(
            'post',
            '/fintech/wallet/v1/gfhfb/freezeDataList',
            data,
        );
    },
    // 广发查询投保状态
    freezeStatusCheck(data) {
        return request(
            'post',
            '/fintech/wallet/v1/gfhfb/freezeStatusCheck',
            data,
        );
    },
    // 查询聚合页接口
    hfbCheck(data) {
        return request(
            'post',
            '/fintech/wallet/v1/hfbjhy/check',
            data,
        );
    },

    // 大额保证金
    Bzj: {
        // 资产查询
        assetQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/LargeMargin/asset/query',
                data,
            );
        },
        // 权益查询
        equityQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/LargeMargin/equity/query',
                data
            );
        },
        // 订单状态查询
        orderStsQuery(data) {
            return request(
                'post',
                '/fintech/wallet/v1/LargeMargin/orderStsQuery',
                data,
            );
        },
        // 下单申请
        LargeMargin() {
            return request(
                'post',
                '/fintech/wallet/v1/LargeMargin/payOrder',
            );
        },
        // 退货申请
        payRefund(data) {
            return request(
                'post',
                '/fintech/wallet/v1/LargeMargin/payRefund',
                data,
            );
        },
        // 解冻申请
        orderThaw(data) {
            return request(
                'post',
                '/fintech/wallet/v1/LargeMargin/orderThaw',
                data,
            );
        },
        // 权益领取
        rightsEquities(data) {
            return request(
                'post',
                '/fintech/wallet/v1/LargeMargin/rightsReceive',
                data,
            );
        }
    },
    // 全局页面活动下线查询
    pagedownline(data) {
        return request(
            'post',
            '/fintech/wallet/v1/pagedownline/check',
            data,
        );
    },
    // u+ 权益 ajwy登录
    uAddHealthcareTokenLogin(data) {
        return request(
            'post',
            '/fintech/ajwy/user/login',
            data,
        );
    },
    // u+ 权益 贷款登录
    uAddLoansTokenLogin(data) {
        return request(
            'post',
            '/fintech/loans/v1/user/login',
            data,
        );
    },
    // u+ 权益 省钱保登录
    uAddInsuranceTokenLogin(data) {
        return request(
            'post',
            '/fintech/insurance-wallet/v1/user/login',
            data,
        );
    },
    // 获取钱包首页楼层配置
    walletPageConf(locationType) {
        return request(
            'post',
            `/fintech/wallet/v1/walletPageConf/config/${locationType}`,
        );
    },
    // 信用卡专区查询
    getDataList(data) {
        return request(
            'post',
            '/fintech/wallet/v1/creditcard/getDataList',
            data,
        );
    },
    // 交行养老金预校验
    pensionPreCheck(data) {
        return request(
            'post',
            '/fintech/wallet/v1/BocmPension/preCheck',
            data,
        );
    },
    // 养老金开户状态查询
    openStsQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/BocmPension/openStsQuery',
            data,
        );
    },
    // 账户下单
    accountOrder(data) {
        return request(
            'post',
            '/fintech/wallet/v1/BocmPension/accountOrder',
            data,
        );
    },
    // 养老金账户影像上送
    pensionSendViewDate(data) {
        return request(
            'post',
            '/fintech/wallet/v1/viewData/sendViewDate',
            data,
        );
    },
    // 养老金缴存
    pensionDeposit(data) {
        return request(
            'post',
            '/fintech/wallet/v1/BocmPension/pensionDeposit',
            data,
        );
    },
    // 养老金新户发放
    newUserReceive(data) {
        return request(
            'post',
            '/fintech/wallet/v1/BocmPension/receive',
            data,
        );
    },
    // 信用卡专区查询
    getDataList(data) {
        return request(
            'post',
            '/fintech/wallet/v1/creditcard/getDataList',
            data,
        );
    },
    
    //金融天天领活动
    financeSportsMeeting:{
      //抽奖接口
      dayActivityLottery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/dayActivity/lottery',
            data,
        );
      },
      //累计及抽奖次数查询
      getLotteryNum(data) {
        return request(
            'post',
            '/fintech/wallet/v1/dayActivity/getLotteryNum',
            data,
        );
      },
      //活动及对应任务列表查询
      activityTaskQuery(data) {
        return request(
            'post',
            '/fintech/wallet/v1/dayActivity/activityTaskQuery',
            data,
        );
      },
      //累计奖品及列表查询
      getPrizeInfoList(data) {
        return request(
            'post',
            '/fintech/wallet/v1/dayActivity/getPrizeInfoList',
            data,
        );
      },
      //活动任务浏览通知接口
      atyTaskBrowsNotify(data) {
        return request(
            'post',
            '/fintech/wallet/v1/dayActivity/atyTaskBrowsNotify',
            data,
        );
      },
      // 贷款楼层
      getfloorinfo(data) {
        return request(
          'post',
          '/fintech/loans/v1/loannewcustomers/getfloorinfo',
          data,
        );
      },
    },
    // 内测版页面查询
    checkTestPage(data) {
      return request(
        'post',
        '/fintech/wallet/v1/pageCloseBeta/check',
        data
      );
    },
    // 惠民贷是否首次点击校验
    ygdPreCheck(data) {
      return request(
        'post',
        '/fintech/wallet/v1/BocmPension/ygdPreCheck',
        data
      );
    },
    // 获取惠民贷URL
    getYGDUrl(data) {
      return request(
        'post',
        '/fintech/wallet/v1/BocmPension/getYGDUrl',
        data
      );
    },
    // 移动钱包(0元包)开通状态及新客标识查询
    queryZeroPackageState(data) {
      return request(
        'post',
        '/fintech/wallet/v1/newZeroPackage/queryZeroPackageState',
        data
      );
    },
    // 翻牌次数及翻牌记录查询
    queryFlipRec(data) {
      return request(
        'post',
        '/fintech/wallet/v1/newZeroPackage/queryFlipRec',
        data
      );
    },
    // 活动翻牌领取接囗
    receiveFlipRight(data) {
      return request(
        'post',
        '/fintech/wallet/v1/newZeroPackage/receiveFlipRight',
        data
      );
    },
    // 邀请记录同步
    syncInviteInfo(data) {
      return request(
        'post',
        '/fintech/wallet/v1/newZeroPackage/syncInviteInfo',
        data
      );
    },
    // 查询邀请记录
    queryInviteRec(data) {
      return request(
        'post',
        '/fintech/wallet/v1/newZeroPackage/queryInviteRec',
        data
      );
    },
    // 加密手机号
    EncryptInviter(data) {
      return request(
        'post',
        '/fintech/wallet/v1/newZeroPackage/getEncryptInviter',
        data
      );
    },
    // 招商一网通查询支付次数
    orderCountQuery(data) {
        return request('post', '/fintech/wallet/v1/orderpay/orderCountQuery', data);
    },
    // 获取跳转地址
    queryH5Apply(data) {
      return request(
        'post',
        '/fintech/wallet/v1/authLogin/apply',
        data
      );
    },
    // 获取页面配置
    queryH5AuthPageConf(data) {
      return request(
        'post',
        '/fintech/wallet/v1/authLogin/queryH5AuthPageConf',
        data
      );
    },
    // 获取加密手机号(一级插码用)
    getEncrypt(data) {
      return request(
        'post',
        '/fintech/wallet/v1/encrypt',
        data
      );
    },
};

export default api;
