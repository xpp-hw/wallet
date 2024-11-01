import * as store2 from '@/common/localstore';

export function setGdp(type, ele) {
    if (ele) {
        const data = JSON.parse(decodeURIComponent(window.atob(ele)));
        if (data.WT_event) {
            gdp('track', type, { WT_et: 'clk', ...data });
        }
    }
}

export function intGdp(attributes) {
    if (attributes) {
        const channelId = getQueryString('channelId');
        gdp('track', 'pageview', { WT_event: 'H5PageShow', WT_channelid: channelId, ...attributes });
    }
}
export function outGdp(attributes) {
    if (attributes) {
        gdp('track', 'pageview', { WT_event: 'H5PageHide', ...attributes });
    }
}
// 在一级掌厅app内全局变量采集
const ua = navigator.userAgent.toLowerCase();
export function setGeneralPropsApp(data) {
    if (ua.match(/leadeon/i) == 'leadeon') {
        const {
            cid, clientID, province, city, userBrand, loginProvince, loginCity
        } = data;
        gdp('setGeneralProps', {
            WT_cid: cid,
            WT_clientID: clientID,
            WT_prov: province, // 用户登陆省份和定位省份取最新值，例如：311
            WT_city: city, // 用户登陆地市和定位地市取最新值，例如：0310
            WT_userBrand: userBrand, // 用户的品牌，01、全球通 02、神州行 03、动感地带 09、其他品牌
            WT_loginProvince: loginProvince, // 登录号码归属地省编码，例如：311
            WT_loginCity: loginCity// 登录号码归属地市编码，例如：0310
        });
    } else {
      return
        gdp('setGeneralProps', {
            WT_userBrand: '01', // 用户的品牌，01、全球通 02、神州行 03、动感地带 09、其他品牌、
            WT_loginProvince: '250', // 登录号码归属地省编码，例如：311
            WT_loginCity: '025'// 登录号码归属地市编码，例如：0310
        });
    }
}
function getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return '';
}
