/*
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2022-11-18 08:57:12
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-08-13 11:03:50
 * @FilePath: \wallet\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import loading from './modules/loading';
import agreement from './modules/agreement';
import cmbagreement from './modules/cmbagreement';
import pufaClientAccount from './modules/pufaClientAccount';
import pufaEaccount from './modules/pufaEaccount';
import pufaEbank from './modules/pufaEbank';
import pufaFastPay from './modules/pufaFastPay';
import pufaKhXuzhi from './modules/pufaKhXuzhi';
import commonservice from './modules/commonservice';
import pufazixun from './modules/pufazixun';
import comprehensiveSi from './modules/comprehensiveSi';
import comprehensiveQi from './modules/comprehensiveQi';
import zeroAuto from './modules/zeroAuto';
import bcmAgreement from './modules/bcmAgreement';
import bcmSign from './modules/bcmSign';
import firstEnter from './modules/firstEnter';
import payeeData from './modules/payeeData';
import activityOffline from './modules/activityOffline';
import newFortune from './modules/newFortune';
import financeSportsMeeting from './modules/financeSportsMeeting';
import testingPage from './modules/testingPage';
// Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        user,
        loading,
        agreement,
        cmbagreement,
        pufaClientAccount,
        pufaEaccount,
        pufaEbank,
        pufaFastPay,
        pufaKhXuzhi,
        commonservice,
        pufazixun,
        comprehensiveSi,
        comprehensiveQi,
        zeroAuto,
        bcmAgreement,
        bcmSign,
        firstEnter,
        payeeData,
        activityOffline,
        newFortune,
        financeSportsMeeting,
        testingPage
    }
});
