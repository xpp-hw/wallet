/*
 * @Author: 赵宏峰 zhao_hf@hisuntech.com
 * @Date: 2024-04-02 16:07:42
 * @LastEditors: 赵宏峰 zhao_hf@hisuntech.com
 * @LastEditTime: 2024-08-16 10:23:45
 * @FilePath: \wallet\src\store\modules\newFortune.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import api from "@/common/apiUrls";
import * as store2 from '@/common/localstore';

const state = {
    topPreInfo: JSON.parse(window.sessionStorage.getItem('topPreInfo')) || {},
    gridList: JSON.parse(window.sessionStorage.getItem('gridList')) || {},
    middleAdverLeftInfo: JSON.parse(window.sessionStorage.getItem('middleAdverLeftInfo')) || {},
    middleAdverRightInfo: JSON.parse(window.sessionStorage.getItem('middleAdverRightInfo')) || {},
    overflowInfo: JSON.parse(window.sessionStorage.getItem('overflowInfo')) || {},
    welfarePreInfo: JSON.parse(window.sessionStorage.getItem('welfarePreInfo')) || {},
    upsideAdverInfo: JSON.parse(window.sessionStorage.getItem('upsideAdverInfo')) || {},
    caloriePreInfo: JSON.parse(window.sessionStorage.getItem('caloriePreInfo')) || {},
};

const mutations = {
    setTopPreInfo(state, data) {
        state.topPreInfo = data;
        window.sessionStorage.setItem('topPreInfo', JSON.stringify(data));
    },
    setGridList(state, data) {
        state.gridList = data;
        window.sessionStorage.setItem('gridList', JSON.stringify(data));
    },
    setMiddleAdverLeftInfo(state, data) {
        state.middleAdverLeftInfo = data;
        window.sessionStorage.setItem('middleAdverLeftInfo', JSON.stringify(data));
    },
    setMiddleAdverRightInfo(state, data) {
        state.middleAdverRightInfo = data;
        window.sessionStorage.setItem('middleAdverRightInfo', JSON.stringify(data));
    },
    setOverflowInfo(state, data) {
        state.overflowInfo = data;
        window.sessionStorage.setItem('overflowInfo', JSON.stringify(data));
    },
    setWelfarePreInfo(state, data) {
        state.welfarePreInfo = data;
        window.sessionStorage.setItem('welfarePreInfo', JSON.stringify(data));
    },
    setUpsideAdverInfo(state, data) {
        state.upsideAdverInfo = data;
        window.sessionStorage.setItem('upsideAdverInfo', JSON.stringify(data));
    },
    setCaloriePreInfo(state, data) {
        state.caloriePreInfo = data;
        window.sessionStorage.setItem('caloriePreInfo', JSON.stringify(data));
    },
};

const actions = {
    async getWalletPageConf(ctx, info) {
        try {
            let date = new Date().getTime();
            let compare;
            if (info.localType == '04') {
                compare = (date - ctx.state.middleAdverRightInfo.date) / 1000 / 60 / 60;

            } else {
                compare = (date - ctx.state[info.infoName].date) / 1000 / 60 / 60;
            }
            console.log(compare);
            if (compare <= 0.5) { return }
            const data = await api.walletPageConf(info.localType);
            if (info.localType == '04') {
                let middleAdverLeftInfo = data.list.filter((item) => {
                    return item.location == "01";
                });
                ctx.commit('setMiddleAdverLeftInfo', {
                    date,
                    list: middleAdverLeftInfo
                });

                let middleAdverRightInfo = data.list.filter((item) => {
                    return item.location == "02";
                });
                ctx.commit('setMiddleAdverRightInfo', {
                    date,
                    list: middleAdverRightInfo
                });
            } else if (info.localType == '01') {
                ctx.commit(info.name, { date, ...data.list[0] });
            } else {
                ctx.commit(info.name, { date, list: data.list });
            }
            return data.list;
        } catch (error) {
            console.log(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
