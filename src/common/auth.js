// import router from '@/router/index';
import { getCookie } from '@/common/cookie';
import qs from 'qs';

export function getQueryString(name) {
    const reg = `(^|&)${name}=([^&]*)(&|$)`;
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export function getUAObj() {
    const obj = qs.parse(navigator.userAgent);
    console.log(obj);
    if (!obj.ch) {
        obj.ch = getQueryString('ch');
    }
    return obj;
}

export function DispatchLoginPage(toPath, callback) {
    if (callback && typeof callback === 'function') {
        callback();
    }
    console.log('path:', toPath);
    console.log('syncChannel:', getCookie('ch'));
    console.log('document.cookie:', document.cookie);
    console.log('VUE_APP_ENV:', process.env.VUE_APP_ENV);
    if (process.env.VUE_APP_ENV !== 'sit' && process.env.VUE_APP_ENV !== 'uat') {
        // console.log(' router.history:', router.history);
        // const wicthLogin = 'login';
        // router.replace({
        //     name: wicthLogin,
        //     query: { redirect: toPath || router.history.current.fullPath }
        // });
        return;
    }
    const chs = getUAObj().ch;
    console.log(getUAObj().platform);
    if (getUAObj().platform === 'android' || chs === '02') {
        // buy.buyImmediately();
    } else if (getUAObj().platform === 'iphone' || chs === '03') {
        window.location.href = 'phonestore://jumpToLogin';
    } else {
        setTimeout(() => {
            window.location.replace(`https://wap.js.10086.cn/login.thtml?redirectURL=${window.location.href}`);
        }, 50);
    }
}
