import '@/common/jquery.min.js';
import router from '@/router';

let u;
let isAndroid;
let isIOS;
let isIpad;
let isIPhone;
let toUrl;
let title;

export const init = (tit, data) => {
    u = navigator.userAgent;
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
    isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    isIpad = u.indexOf('iPad') > -1; // 是否iPad
    isIPhone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1; // 是否为iPhone或者QQHD浏览器
    toUrl = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[0] : window.location.href;
    title = tit;
    const btn = document.getElementById('launch-btn');

    if (isWeiXinScene()) {
    } else { // 浏览器环境
        // 普通按钮
        normalButton(btn);
    }
};
function normalButton(btn) {
    const newEl = document.createElement('button');
    // newEl.innerHTML = '打开APP'
    newEl.innerHTML = '点击前往';
    newEl.setAttribute('class', 'openBtn');
    newEl.setAttribute('id', 'btn41');
    btn.parentNode.replaceChild(newEl, btn);
    const newbtn = document.getElementById('btn41');
    newbtn.addEventListener('click', (e) => {
        openAPP();
    });
}

// 判断是否是微信环境
function isWeiXinScene() {
    // 判断是否是微信环境
    if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
        return true;
    }
    return false;
}
// 获取App内的url
function getAppUrl(url, title) {
    let extInfo = '';
    if (isAndroid) {
        extInfo = url;
    } else if (isIOS || isIpad || isIPhone) {
        extInfo = `jsmcc://H/5?json={\"urlorClass\":\"${url}\",\"type\":\"0\",\"description\":\"0\",\"isLoigin\":\"1\",\"title\":\"${title}\",\"isShare\":\"0\",\"isurlComplete\":\"1\"}`;
    }
    return extInfo;
}
// 当前微信版本
function getWXVersion() {
    return (navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i))[1];
}

function openAPP() {
    if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
        // window.location.href="http://wap.js.10086.cn/XZ_ZJBB@107868.thtml";
        window.location = `http://wap.js.10086.cn/new_weixin_act/transit/getShare?url=${toUrl}&title=${title}`;
    } else {
        appDownload();
    }
}
// 立即下载

function appDownload() {
    const pageUrl = toUrl;
    // 根据机型下载
    const protocolStr = document.location.protocol == 'https:' ? 'https://' : 'http://';
    if (isAndroid) {
        var ifrSrc = `${'jsmcc://H/5' + "?json={'urlorClass':'"}${pageUrl}','type':'0','description':'0','isLogin':'1','title':'${title}','isurlComplete':'1','isShare':'0'}`;
        // 使用iframe方式触发jsmcc://
        var ifr = document.createElement('iframe');
        ifr.src = ifrSrc;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        // 当iframe加载5秒后，无论是否能切换到APP窗口（未安装或者版本不对，是不会打开APP的），页面继续跳转
        setTimeout(() => {
            window.location.href = `${protocolStr}wap.js.10086.cn/userfiles/wapapp/jsmcc.apk`;
            // 当然也可以回退到前一页面
            // window.history.go(-1);
        }, 3000);
    } else if (isIOS || isIpad || isIPhone) {
        // eslint-disable-next-line no-redeclare
        var ifrSrc = `${'jsmcc://H/5' + "?json={'urlorClass':'"}${pageUrl}','type':'0','description':'0','isLogin':'1','title':'${title}','isurlComplete':'0','isShare':'0'}`;
        // 使用iframe方式触发jsmcc://
        // eslint-disable-next-line no-redeclare
        var ifr = document.createElement('iframe');
        window.location = ifrSrc;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        // 当iframe加载5秒后，无论是否能切换到APP窗口（未安装或者版本不对，是不会打开APP的），页面继续跳转
        setTimeout(() => {
            window.location.href = 'https://itunes.apple.com/cn/app/id446332125?mt=8&t';
            // 当然也可以回退到前一页面
            // window.history.go(-1);
        }, 3000);
    } else {
        // 电脑端 不做处理
    }
}

/*
        * 版本号比较方法
        * 传入两个字符串，当前版本号：curV；比较版本号：reqV
        * 调用方法举例：compare("1.1","1.2")，将返回false
        */
function compare(curV, reqV) {
    if (curV && reqV) {
        // 将两个版本号拆成数字
        const arr1 = curV.split('.');
        const arr2 = reqV.split('.');
        const minLength = Math.min(arr1.length, arr2.length);
        let position = 0;
        let diff = 0;
        // 依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
        while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
            position++;
        }
        diff = (diff != 0) ? diff : (arr1.length - arr2.length);
        // 若curV大于reqV，则返回true
        return diff > 0;
    }
    // 输入为空
    console.log('版本号不能为空');
    return false;
}
