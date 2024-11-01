import * as store2 from '@/common/localstore';
// 判断系统
export const getAppsystem = () => {
    const u = window.navigator.userAgent;
    let appsystemID = '';
    if (u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1 || u.indexOf('iPod') > -1) {
        appsystemID = 'ios';
    } else if (u.indexOf('Android') > -1) {
        appsystemID = 'android';
    }
    return appsystemID;
};

// 集成分享面板
export const sharePlugin = (title = '', url = '', subTitle = '') => {
    const app = getAppsystem();
    if (app === 'ios') {
        window.location.href = `cyberapp://IOSShare#IOSShareTitle=${title}#IOSShareURL=${url}#IOSShareDetails=${subTitle}`;
    } else if (app === 'android') {
        if (typeof (window.MobileWalletShare) !== 'undefined' && typeof (window.MobileWalletShare.startShare) === 'function') {
            window.MobileWalletShare.startShare(title, url, subTitle);
        }
    }
};

/**
 *  分享到微信好友  回调方法 shareCallback | javascript:shareCallback(%b)
 */
export const toshareWechat = (title = '', url = '', subTitle = '', logoBase64 = '') => {
    const app = getAppsystem();
    if (app === 'ios') {
        if (typeof (window.shareToWeChat) === 'function') {
            window.shareToWeChat(title, url, subTitle, logoBase64);
        }
    } else if (app === 'android') {
        if (typeof (window.MobileWalletShare) !== 'undefined' && typeof (window.MobileWalletShare.directToWeiXin) === 'function') {
            window.MobileWalletShare.directToWeiXin(title, url, subTitle, 'javascript:shareCallback(%b)', logoBase64); // eslint-disable-line
        }
    }
};
/**
 *  分享到QQ  回调方法 shareCallback | javascript:shareCallback(%b)
 */
export const toshareQQ = (title = '', url = '', subTitle = '') => {
    const app = getAppsystem();
    if (app === 'ios') {
        if (typeof (window.shareToQQ) === 'function') {
            window.shareToQQ(title, url, subTitle);
        }
    } else if (app === 'android') {
        if (typeof (window.MobileWalletShare) !== 'undefined' && typeof (window.MobileWalletShare.shareToQQ) === 'function') {
            window.MobileWalletShare.shareToQQ(title, url, subTitle, 'javascript:shareCallback(%b)'); // eslint-disable-line
        }
    }
};

// 关闭webview
export const closeWebView = () => {
    const app = getAppsystem();
    if (app === 'ios') {
        window.location.href = 'activity://CMPWebViewPop';
    } else if (app === 'android') {
        if (typeof (goActivity) !== 'undefined' && typeof (window.goActivity.closeWebView) === 'function') {
            window.goActivity.closeWebView();
        }
    }
};

// 新开webview
export const openWebView = (url = '') => {
    const app = getAppsystem();
    if (app === 'ios') {
        window.location.href = `activity://goWeb?url=${url}`;
    } else if (app === 'android') {
        if (typeof (goActivity) !== 'undefined' && typeof (window.goActivity.goWeb) === 'function') {
            window.goActivity.goWeb(url);
        }
    }
};

// 新开webview 不做单点登录
export const openWebViewNoLogin = (url = '') => {
    const app = getAppsystem();
    if (app === 'ios') {
        if (window.hebaoWkjs && typeof (window.hebaoWkjs.doCall) === 'function') {
            window.hebaoWkjs.doCall('allmethods', (x) => {
                if (x.includes('goWebNoLogin')) { // 有方法
                    window.hebaoWkjs.doCall('goWebNoLogin', {
                        target: url
                    });
                }
            });
        } else if (typeof (window.goWebNoLogin) === 'function') {
            window.goWebNoLogin(url);
        }
    } else if (app === 'android') {
        if (typeof (goActivity) !== 'undefined' && typeof (window.goActivity.goWebNoLogin) === 'function') {
            window.goActivity.goWebNoLogin(url);
        }
    }
};

// 微信登录授权
export const doLoginWeChat = () => { // 需要定义 window.weChatCallbak 回调
    const app = getAppsystem();
    if (app === 'ios') {
        if (window.hebaoWkjs && typeof (window.hebaoWkjs.doCall) === 'function') {
            window.hebaoWkjs.doCall('allmethods', (x) => {
                if (x.includes('doLoginWeChat')) { // 有方法
                    window.hebaoWkjs.doCall('doLoginWeChat', (e) => {
                        // eslint-disable-next-line no-unused-expressions
                        window.weChatCallbak && window.weChatCallbak(e);
                    });
                }
            });
        }
    } else if (app === 'android') {
        if (typeof (goActivity) !== 'undefined' && typeof (window.goActivity.doLoginWeChat) === 'function') {
            // eslint-disable-next-line no-script-url
            window.goActivity.doLoginWeChat('javascript:window.weChatCallbak("%s","%s","%s")');
        }
    }
};

// 获取打开页面设备
export const browser = {
    // eslint-disable-next-line func-names
    versions: (function () {
        const u = navigator.userAgent.toLowerCase();
        // 移动终端浏览器版本信息
        return {
            trident: u.indexOf('trident') > -1, // IE内核
            presto: u.indexOf('presto') > -1, // opera内核
            webKit: u.indexOf('appleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
            iPhone: u.indexOf('iphone') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('ipad') > -1, // 是否iPad
            webApp: u.indexOf('safari') === -1, // 是否web应该程序，没有头部与底部
            JSMCC: u.indexOf('jsmcc') > -1// jsyd营业厅
        };
    }()),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

// 判断是否是微信环境
export const isWeiXinScene = () => {
    // 判断是否是微信环境
    if (navigator.userAgent.indexOf('MicroMessenger') !== -1) {
        return true;
    }
    return false;
};

// 拉起端内

export const appJumpTo = (jumpUrl, title) => {
    // 根据机型下载
    const app = getAppsystem();
    if (app === 'android') {
        // eslint-disable-next-line no-useless-escape
        const ifrSrc = `jsmcc://H/5?json={\"urlorClass\":\"${jumpUrl}\",\"type\":\"0\",\"description\":\"0\",\"isLogin\":\"1\",\"title\":\"${title}\",\"isurlComplete\":\"1\",\"isShare\":\"0\"}`;
        // 使用iframe方式触发jsmcc://
        const ifr = document.createElement('iframe');
        ifr.src = ifrSrc;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    } else if (app === 'ios') {
        // eslint-disable-next-line no-useless-escape
        const ifrSrc = `jsmcc://H/5?json={\"urlorClass\":\"${jumpUrl}\",\"type\":\"0\",\"description\":\"0\",\"isLogin\":\"1\",\"title\":\"${title}\",\"isurlComplete\":\"0\",\"isShare\":\"0\"}`;
        // 使用iframe方式触发jsmcc://
        const ifr = document.createElement('iframe');
        window.location = ifrSrc;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    } else {
        // 电脑端 不做处理
    }
};

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        // eslint-disable-next-line no-undef
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    console.log(window.WVJBCallbacks);
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
        document.documentElementNaNpxoveChild(WVJBIframe);
    }, 0);
    return true;
}


// IOS获取token
export const iosGetToken = () => {
    // 调用方式
    setupWebViewJavascriptBridge((WebViewJavascriptBridge) => {
        WebViewJavascriptBridge.callHandler('TYRZToken', (response) => {
            store2.default.set('pagetokenid', response.token);
        });
    });
};

// 日期格式化
export function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/')
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}
