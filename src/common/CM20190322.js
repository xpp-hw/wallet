/* eslint-disable */
import '@/common/jquery.min.js';
import {setGdp,intGdp,outGdp} from './setGdp2023'
const userAgent = navigator.userAgent
const userAgentL = userAgent.toLowerCase()
export function CMWT() {
    (function () {
        const _xwbd_cfg = window.$$XWDB_CM;
        const _logserver_cfg = {};
        let _page_cfg = {};
        const _pageStream_cfg = [];
        const theRequest = {};
        const _setting = {};
        const _userEvent_load = [];
        const _userEvent_unload = [];
        const _boundSymbol = '\u0001';
        const _emptySymbol = '';
        const _replacelSymbol = '_';
        const _vidExpires = 63072000000;
        const _vidDomain = '/';
        const _homeEnvirName = 'home';
        const _XHR_timeout = 2000;
        const _pageName_default = 'NULL';
        const _cookiePid = '_xwbd_page';
        const _cookieSid = 'XWBD_SESSIONID';
        const _collectActiveFlag = 'collectReady';
        const _apiName = '$$XWBD_API';
        let _cache_cookie = {}; const
            _cache_page = {
                appID: '',
                techType: '',
                channelType: '',
                version: '',
                sessionID: '',
                userType: '',
                userLabel: '',
                userGroup: '',
                envirSID: '',
                homeEnvirSID: '',
                envirCode: '',
                pageVID: '',
                pageCode: '',
                areaVID: '',
                areaCode: '',
                touchVID: '',
                touchCode: '',
                nextPageVID: '',
                nextAreaCode: '',
                nextPageCode: '',
                inDate: '',
                inTime: '',
                outDate: '',
                outTime: '',
                sourceType: '',
                sourcePointName: '',
                attributes:{}
            };
        const cacheJson = JSON.parse(JSON.stringify(_cache_page));

        const Global = function () {
            const oThis = this;

            oThis.isCookieEnabled = function () {
                return !!navigator.cookieEnabled;
            };

            oThis.trim = function (str) {
                if (!str) {
                    return '';
                }
                str += '';
                return str.replace(/(^\s*)|(\s*$)/g, '');
            };

            oThis.isEmptyObject = function (e) {
                let t;
                for (t in e) return !1;
                return !0;
            };

            oThis.isJsonString = function (str) {
                try {
                    if (typeof JSON.parse(str) === 'object') {
                        return true;
                    }
                } catch (e) {
                }
                return false;
            };


            oThis.strToCacheObj = function (str) {
                const strArry = str.split('#');
                let i = 0;
                for (const key in cacheJson) {
                    cacheJson[key] = strArry[i];
                    i++;
                }

                return cacheJson;
            };

            oThis.jsonToString = function (jsonObj) {
                if (window.JSON) {
                    return JSON.stringify(jsonObj);
                }
                let jStr = '{ ';
                for (const item in jsonObj) {
                    jStr += `"${item}":"${jsonObj[item]}",`;
                }
                jStr = jStr.substring(0, jStr.length - 1);
                jStr += ' }';
                return jStr;
            };

            oThis.stringToJson = function (str) {
                let obj = null;
                if (str) {
                    if (window.JSON) {
                        try {
                            obj = JSON.parse(str);
                        } catch (e) {
                            try {
                                obj = eval(`(${str})`);
                            } catch (e) {
                            }
                        }
                    } else {
                        try {
                            obj = eval(`(${str})`);
                        } catch (e) {
                        }
                    }
                }
                return obj;
            };

            oThis.browser = function () {
                const browser = {};
                browser.mozilla = false;
                browser.webkit = false;
                browser.opera = false;
                browser.msie = false;

                const nAgt = navigator.userAgent;
                browser.name = navigator.appName;
                browser.fullVersion = `${parseFloat(navigator.appVersion)}`;
                browser.majorVersion = parseInt(navigator.appVersion, 10);
                let nameOffset; let verOffset; let
                    ix;

                // In Opera, the true version is after "Opera" or after "Version"
                if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                    browser.opera = true;
                    browser.name = 'Opera';
                    browser.fullVersion = nAgt.substring(verOffset + 6);
                    if ((verOffset = nAgt.indexOf('Version')) != -1) browser.fullVersion = nAgt.substring(verOffset + 8);
                }
                // In MSIE, the true version is after "MSIE" in userAgent
                else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                    browser.msie = true;
                    browser.name = 'Microsoft Internet Explorer';
                    browser.fullVersion = nAgt.substring(verOffset + 5);
                }
                // In Chrome, the true version is after "Chrome"
                else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                    browser.webkit = true;
                    browser.name = 'Chrome';
                    browser.fullVersion = nAgt.substring(verOffset + 7);
                }
                // In Safari, the true version is after "Safari" or after "Version"
                else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                    browser.webkit = true;
                    browser.name = 'Safari';
                    browser.fullVersion = nAgt.substring(verOffset + 7);
                    if ((verOffset = nAgt.indexOf('Version')) != -1) browser.fullVersion = nAgt.substring(verOffset + 8);
                }
                // In Firefox, the true version is after "Firefox"
                else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                    browser.mozilla = true;
                    browser.name = 'Firefox';
                    browser.fullVersion = nAgt.substring(verOffset + 8);
                }
                // In most other browsers, "name/version" is at the end of userAgent
                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                    browser.name = nAgt.substring(nameOffset, verOffset);
                    browser.fullVersion = nAgt.substring(verOffset + 1);
                    if (browser.name.toLowerCase() == browser.name.toUpperCase()) {
                        browser.name = navigator.appName;
                    }
                }
                // trim the fullVersion string at semicolon/space if present
                if ((ix = browser.fullVersion.indexOf(';')) != -1) browser.fullVersion = browser.fullVersion.substring(0, ix);
                if ((ix = browser.fullVersion.indexOf(' ')) != -1) browser.fullVersion = browser.fullVersion.substring(0, ix);

                browser.majorVersion = parseInt(`${browser.fullVersion}`, 10);
                if (isNaN(browser.majorVersion)) {
                    browser.fullVersion = `${parseFloat(navigator.appVersion)}`;
                    browser.majorVersion = parseInt(navigator.appVersion, 10);
                }
                browser.version = browser.majorVersion;
                return browser;
            };

            oThis.AddListener = function (element, type, listener, useCapture) {
                if (element.addEventListener) {
                    element.addEventListener(type, listener, !!useCapture);
                } else {
                    element.attachEvent && element.attachEvent(`on${type}`, listener);
                }
            };

            oThis.emptyFunction = function () {
            };

            oThis.uuid = function (prefix) {
                let rootRandom = `${100 + Math.floor(Math.random() * 100)}`;
                rootRandom = rootRandom.substring(1);
                let mainRandom = `${1000 + Math.floor(Math.random() * 1000)}`;
                mainRandom = mainRandom.substring(1);
                const date = $Global.dateFormater(new Date(), 'yyyyMMddHHmmssSSS');
                return prefix.concat(date.substring(4)).concat(rootRandom).concat(mainRandom);
            };

            oThis.preZeroFill = function (num, size) {
                if (num >= Math.pow(10, size)) { // 如果num本身位数不小于size位
                    return num.toString();
                }
                const _str = Array(size + 1).join('0') + num;
                return _str.slice(_str.length - size);
            };

            oThis.dateFormater = function (date, pattern) {
                if (!date) {
                    return '';
                }
                const month = date.getMonth() + 1;
                const nowday = date.getDate();
                const hh = date.getHours();
                const mm = date.getMinutes();
                const ss = date.getSeconds();
                const ms = date.getMilliseconds();
                return pattern.replace('yyyy', date.getFullYear()).replace('MM', oThis.preZeroFill(month, 2)).replace('dd', oThis.preZeroFill(nowday, 2)).replace('HH', oThis.preZeroFill(hh, 2))
                    .replace('mm', oThis.preZeroFill(mm, 2))
                    .replace('ss', oThis.preZeroFill(ss, 2))
                    .replace('SSS', oThis.preZeroFill(ms, 3));
            };

            oThis.getAllUnEffectivedEles = function () {
                const results = [];
                const touchs = $configTool.getConfigTouchs();
                for (let i = 0; i < touchs.length; i++) {
                    const touch = touchs[i];
                    // var ele = document.getElementById(touch.id);
                    // var ele = document.getElementById(touch.id);
                    // 优化修改滑动轮播banner部分元素未注册click事件
                    const eles = $(`[id=${touch.id}]`);
                    for (let j = 0; j < eles.length; j++) {
                        const ele = eles[j];
                        if (!ele || !touch.touchCode ) {
                              //  alert(touch.id +"未定义");
                            // ele.setAttribute('attributes',window.btoa(encodeURIComponent(JSON.stringify({}))) )
                            continue;
                        } else {
                            if (touch.isAdd) {
                                ele.removeAttribute(_collectActiveFlag);
                                ele.removeAttribute('touchVID');
                                ele.removeAttribute('touchCode');
                                ele.removeAttribute('businessName');
                                ele.removeAttribute('unknownPageCode');
                                ele.removeAttribute('nextPageCode');
                                ele.removeAttribute('attributes');
                                
                                touch.isAdd = false;
                              }
                              if (!ele.getAttribute(_collectActiveFlag)) {
                                // ele.setAttribute(_collectActiveFlag, "true");
                                ele.setAttribute('touchVID', $Global.uuid('T'));
                                ele.setAttribute('touchCode', touch.touchCode);
                                if(touch.data){
                                  ele.setAttribute('attributes',window.btoa(encodeURIComponent(JSON.stringify(touch.data))) )
                                }
                                touch.businessName ? ele.setAttribute('businessName', touch.businessName) : null;
                                touch.unknownPageCode ? ele.setAttribute('unknownPageCode', touch.unknownPageCode) : null;
                                touch.nextPageCode ? ele.setAttribute('nextPageCode', touch.nextPageCode) : null;
                                touch.nextAreaCode != undefined ? ele.setAttribute('nextAreaCode', touch.nextAreaCode) : null;
                            }
                        }
                        results.push(ele);
                    }
                }
                return results;
            };

            oThis.mouseCoords = function (ev) {
                if (ev.pageX || ev.pageY) {
                    return {
                        x: ev.pageX,
                        y: ev.pageY
                    };
                }
                return {
                    x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                    y: ev.clientY + document.body.scrollTop - document.body.clientTop
                };
            };

            oThis.judgeValue = function (str) {
                if (str && $Global.trim(str) != '') {
                    return str;
                }
                return _emptySymbol;
            };

            oThis.getRequest = function (name) {
                if (!name) return '';

                if (location.search.indexOf('?') != -1 && $Global.isEmptyObject(theRequest)) {
                    const url = location.search;
                    if (url.indexOf('?') != -1) {
                        const str = url.substr(1);
                        const strs = str.split('&');
                        for (let i = 0; i < strs.length; i++) {
                            if (strs[i].split('=')[1]) theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
                        }
                    }
                }
                if (theRequest && theRequest[name] != undefined) return theRequest[name];

                return '';
            };

            oThis.getResolution = function () {
                return `${window.screen.width}*${window.screen.height}`;
            };

            oThis.getMetaValue = function (val) {
                const metas = document.getElementsByTagName('meta');
                if (metas && metas.length && metas.length > 0) {
                    for (let i = 0; i < metas.length; i++) {
                        if (metas[i].name && metas[i].name == val) {
                            return metas[i].content;
                        }
                    }
                }
                return '';
            };

            oThis.detectOS = function () {
                const result = {
                    os: '7',
                    version: 'other'
                };
                const sUserAgent = navigator.userAgent;
                result.version = navigator.platform;
                const isWin = (navigator.platform == 'Win32') || (navigator.platform == 'Windows');
                const isMac = (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC') || (navigator.platform == 'Macintosh') || (navigator.platform == 'MacIntel');
                if (isMac) result.os = '2';
                const isUnix = (navigator.platform == 'X11') && !isWin && !isMac;
                if (isUnix) result.os = '5';
                const isLinux = (String(navigator.platform).indexOf('Linux') > -1);
                if (isLinux) result.os = '6';
                if (isWin) {
                    result.os = '1';
                    const isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
                    if (isWin2K) result.version = 'Win2000';
                    const isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
                    if (isWinXP) result.version = 'WinXP';
                    const isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
                    if (isWin2003) result.version = 'Win2003';
                    const isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
                    if (isWinVista) result.version = 'WinVista';
                    const isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
                    if (isWin7) result.version = 'Win7';
                    const isWin8 = sUserAgent.indexOf('Windows NT 6.2') > -1 || sUserAgent.indexOf('Windows 8') > -1;
                    if (isWin8) result.version = 'Win8';
                }
                return result;
            };
        };
        var $Global = new Global();

        const configTool = function () {
            const oThis = this;

            oThis.isCollect = function () {
                if (!_xwbd_cfg) return false;
                if (!$Global.isCookieEnabled()) return false;

                return _xwbd_cfg.collect == true;
            };

            oThis.getHostCfg = function () {
                // set _logserver_cfg
                const logservers = _xwbd_cfg.url;
                for (const i in logservers) {
                    const server = logservers[i];
                    const { events } = server;
                    for (const j in events) {
                        const event = events[j];
                        _logserver_cfg[event] = {};
                        _logserver_cfg[event].url = server.logServer;
                        _logserver_cfg[event].method = server.method;
                    }
                }
                if ($Global.isEmptyObject(_logserver_cfg)) return false;
                return true;
            };

            oThis.getPageCfg = function () {
                // set _page_cfg
                const { pages } = _xwbd_cfg;
                for (var i in pages) {
                    const page = pages[i];
                    if (location.href.indexOf(page.url) >= 0) {
                        _page_cfg = page;
                        break;
                    }
                }
                $configTool.applyUserSetting();
                if ($Global.isEmptyObject(_page_cfg)) return false;

                // set _pageStream_cfg
                const pageStreams = _xwbd_cfg.pageStream;
                for (var i in pageStreams) {
                    const pageStream = pageStreams[i];
                    if (pageStream.endPageCode == _page_cfg.pageCode) {
                        _pageStream_cfg.push(pageStream);
                    }
                }

                return true;
            };

            oThis.isForwardStream = function () {
                if (!_cache_cookie.pageCode) return true;

                for (const i in _pageStream_cfg) {
                    const stream = _pageStream_cfg[i];
                    if (stream.startPageCode == _cache_cookie.pageCode
                        && stream.startAreaCode == _cache_cookie.areaCode
                        && stream.endAreaCode == _cache_page.areaCode) {
                        return true;
                    }
                }
                return false;
            };


            oThis.getEnvirCode = function (areaCode) {
                if ($Global.isEmptyObject(_page_cfg.envir)) return '';

                for (const i in _page_cfg.envir) {
                    const envir = _page_cfg.envir[i];
                    if (envir.areaCode == areaCode) return envir.envirCode;
                }
                return '';
            };

            oThis.applyUserSetting = function () {
                if (!$Global.isEmptyObject(_setting)) {
                    for (const param in _setting) {
                        _page_cfg[param] = _setting[param];
                    }
                }
            };

            oThis.getConfigTouchs = function () {
                const configTouchs = $Global.isEmptyObject(_page_cfg.touch) ? [] : _page_cfg.touch;
                const userTouchs = $Global.isEmptyObject(_setting.touch) ? [] : _setting.touch;

                if (userTouchs.length > 0) {
                    for (let i = 0; i < configTouchs.length; i++) {
                        let inConfig = false;
                        for (let j = 0; j < userTouchs.length; j++) {
                            if (configTouchs[i].id == userTouchs[j].id) {
                                inConfig = true;
                                break;
                            }
                        }
                        if (!inConfig) userTouchs.push(configTouchs[i]);
                    }
                    _page_cfg.touch = userTouchs;
                    _setting.touch = [];
                }

                return $Global.isEmptyObject(_page_cfg.touch) ? [] : _page_cfg.touch;
            };
        };
        var $configTool = new configTool();

        const Cookie = function () {
            const oThis = this;

            oThis.setCookie = function (cookieName, cookieVal, cookieExpire, cookiePath) {
                let cookieString = `${cookieName}=${encodeURIComponent(cookieVal)}`;
                // 判断是否设置过期时间
                if (cookieExpire > 0) {
                    const date = new Date();
                    date.setTime(date.getTime() + cookieExpire);
                    cookieString = `${cookieString}; expires=${date.toUTCString()}`;
                }

                if (cookiePath != '') {
                    cookieString = `${cookieString}; path=${cookiePath}`;
                }

                document.cookie = cookieString;
            };


            oThis.getCookie = function (cookie_name) {
                const results = document.cookie.match(`(^|;) ?${cookie_name}=([^;]*)(;|$)`);

                if (results) return (decodeURIComponent(results[2]));
                return '';
            };

            oThis.clearCookie = function (cookieName) {
                oThis.setCookie(cookieName, '', 1, _vidDomain);
            };

            oThis.getCookieOrStorage = function (cookie_name) {
                let cookie_str = '';
                if (window.sessionStorage) {
                    cookie_str = sessionStorage[cookie_name];
                }

                if (!cookie_str) {
                    cookie_str = oThis.getCookie(cookie_name);
                }

                return cookie_str;
            };

            oThis.getCachedCookie = function () {
                let cookie_str = '';
                if (window.sessionStorage) {
                    cookie_str = sessionStorage[_cookiePid];
                }

                if (!cookie_str) {
                    cookie_str = oThis.getCookie(_cookiePid);
                    if (!$Global.isJsonString(cookie_str)) {
                        // 将cookie中字符串拆分为数组后 转化为json对象
                        cookie_str = $Global.jsonToString($Global.strToCacheObj(cookie_str));
                    }
                }

                let _cookie = $Global.stringToJson(cookie_str);
                if (!_cookie) _cookie = {};

                if ($Global.getRequest('AppID')) {
                    _cookie.techType = $Global.getRequest('techType') || _cookie.techType || _xwbd_cfg.techType || '';
                    _cookie.channelType = $Global.getRequest('channelType') || _cookie.channelType || '';
                    _cookie.version = $Global.getRequest('version') || _cookie.version || '';
                    _cookie.appID = $Global.getRequest('appID');
                    _cookie.sessionID = $Global.getRequest('sessionID') || _cookie.sessionID || '';
                    _cookie.userType = $Global.getRequest('userType') || _cookie.userType || '';
                    _cookie.userLabel = $Global.getRequest('userLabel') || _cookie.userLabel || '';
                    _cookie.userGroup = $Global.getRequest('userGroup') || _cookie.userGroup || '';
                    _cookie.envirSID = $Global.getRequest('envirSID') || _cookie.envirSID || '';
                    _cookie.envirCode = $Global.getRequest('envirCode') || _cookie.envirCode || '';
                    _cookie.pageVID = $Global.getRequest('pageVID') || _cookie.pageVID || '';
                    _cookie.pageCode = $Global.getRequest('pageCode') || _cookie.pageCode || '';
                    _cookie.areaVID = $Global.getRequest('areaVID') || _cookie.areaVID || '';
                    _cookie.areaCode = $Global.getRequest('areaCode') || _cookie.areaCode || '';
                    // _cookie.nextAreaCode = $Global.getRequest("nextAreaCode") || _cookie.nextAreaCode || "";
                    // _cookie.touchCode = $Global.getRequest("touchCode") || _cookie.touchCode || "";
                }

                if (_cookie.appID) return _cookie;
                return {};
            };

            oThis.saveCachedCookie = function () {
                const cookie_str = $Global.jsonToString(_cache_page);
                if (window.sessionStorage && !oThis.getCookie(_cookiePid)) {
                    sessionStorage[_cookiePid] = cookie_str;
                } else {
                    oThis.setCookie(_cookiePid, cookie_str, 0, _vidDomain);
                }
            };
        };
        const $cookie = new Cookie();

        const Ajax = function () {
            const oThis = this;

            oThis.send = function (url, paramName, param, method, mark, callback) {
                let rate = false;
                if (_xwbd_cfg.collectRate && typeof _xwbd_cfg.collectRate === 'number') {
                    if (Math.random() * 100 < _xwbd_cfg.collectRate) {
                        rate = true;
                    }
                }

                if (rate && (mark || _page_cfg.collect == undefined || _page_cfg.collect == true)) oThis.sendByRequest(url, paramName, param, method, callback);
            };

            oThis.sendByRequest = function (url, paramName, param, method, callback) {
                if (!param) {
                    return;
                }

                let request;
                let Request = window.XDomainRequest;

                if (method == 'GET') {
                    param = encodeURIComponent(param);
                    url = `${url}?log=${param}`;
                    param = null;
                }
                // debuggers
                if (Request) {
                    request = new Request();
                    request.open(method, url);
                } else if (Request = window.XMLHttpRequest) {
                    Request = new Request();
                    if ('withCredentials' in Request) {
                        request = Request;
                        request.open(method, url, true);
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    }
                }
                if (request) {
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            callback && callback();
                            request = null;
                        }
                    };

                    request.send(param);

                    // setTimeout(function () {
                    //     if (request)
                    //         request.abort();
                    // }, _XHR_timeout);

                    return true;
                }
                return false;
            };
        };
        const $Ajax = new Ajax();

        const eventHander = function () {
            const oThis = this;

            oThis.doInitEvent = function () {
                const eventName = 'init';
                const _log_paramers = {};
                if (oThis.doPublic(eventName, _log_paramers)) {
                    _log_paramers.inDate = _cache_page.inDate;
                    _log_paramers.inTime = _cache_page.inTime;
                    const browser = $Global.browser();
                    _log_paramers.device = browser.name || _emptySymbol;
                    _log_paramers.clientIP = _emptySymbol;
                    _log_paramers.clientVer = _emptySymbol;
                    _log_paramers.deviceType = browser.version || _emptySymbol;
                    _log_paramers.resolution = $Global.getResolution();
                    const os = $Global.detectOS();
                    _log_paramers.os = os.version || _emptySymbol;
                    _log_paramers.osVer = os.os || _emptySymbol;

                    const logger = oThis.createLogStr(_log_paramers);
                    $Ajax.send(_logserver_cfg[eventName].url, '', logger, _logserver_cfg[eventName].method);
                }
            };

            oThis.doEnvirEvent = function () {
                const eventName = 'envir';
                const _log_paramers = {};
                if (oThis.doPublic(eventName, _log_paramers)) {
                    _log_paramers.lastEnvirSID = _cache_cookie.envirSID || _emptySymbol;
                    _log_paramers.lastEnvirCode = _cache_cookie.envirCode || _emptySymbol;
                    _log_paramers.pageVID = _cache_page.pageVID;
                    _log_paramers.pageCode = _cache_page.pageCode;
                    _log_paramers.areaVID = _cache_page.areaVID;
                    _log_paramers.areaCode = _cache_page.areaCode;
                    _log_paramers.sourceType = _cache_page.sourceType;
                    _log_paramers.sourcePointName = _cache_page.sourcePointName;

                    const logger = oThis.createLogStr(_log_paramers);
                    $Ajax.send(_logserver_cfg[eventName].url, '', logger, _logserver_cfg[eventName].method);
                }
            };

            oThis.doPageEvent = function () {
                         
                const eventName = 'page';
                const _log_paramers = {};
                if (oThis.doPublic(eventName, _log_paramers)) {
                    // 页面刷新不发送日志
                    if (_cache_page.pageVID == _cache_cookie.pageVID && _cache_page.areaVID == _cache_cookie.areaVID) return;
                    _log_paramers.pageVID = _cache_page.pageVID;
                    _log_paramers.pageCode = _cache_page.pageCode;
                    _log_paramers.areaVID = _cache_page.areaVID;
                    _log_paramers.areaCode = _cache_page.areaCode;
                    _log_paramers.lastPageVID = _cache_cookie.pageVID || _emptySymbol;
                    _log_paramers.lastPageCode = _cache_cookie.pageCode || _emptySymbol;
                    _log_paramers.lastAreaVID = _cache_cookie.areaVID || _emptySymbol;
                    _log_paramers.lastAreaCode = _cache_cookie.areaCode || _emptySymbol;
                    _log_paramers.forward = $configTool.isForwardStream();
                    _log_paramers.url = location.href;
                    _log_paramers.sourceType = _cache_page.sourceType;
                    _log_paramers.sourcePointName = _cache_page.sourcePointName;
                    _log_paramers.inDate = _cache_page.inDate;
                    _log_paramers.inTime = _cache_page.inTime;
                    _log_paramers.onloadTime = '-1';
                    _log_paramers.requestTime = '-1';
                    _log_paramers.blankTime = '-1';

                    if (window.performance && window.performance.timing) {
                        _log_paramers.onloadTime = `${window.performance.timing.domComplete - window.performance.timing.navigationStart}`;
                        _log_paramers.requestTime = `${window.performance.timing.responseEnd - window.performance.timing.connectStart}`;
                        // TODO 白屏时间
                    }

                    const logger = oThis.createLogStr(_log_paramers);
                    //一级掌厅插码
                    intGdp(_xwbd_cfg.pages[0].attributes)
                    $Ajax.send(_logserver_cfg[eventName].url, '', logger, _logserver_cfg[eventName].method);
                }
            };

            oThis.doOutPageEvent = function () {
                const eventName = 'outPage';
                const _log_paramers = {};
                if (oThis.doPublic(eventName, _log_paramers)) {
                    _log_paramers.pageVID = _cache_page.pageVID;
                    _log_paramers.pageCode = _cache_page.pageCode;
                    _log_paramers.areaVID = _cache_page.areaVID;
                    _log_paramers.areaCode = _cache_page.areaCode;
                    _log_paramers.inDate = _cache_page.inDate;
                    _log_paramers.inTime = _cache_page.inTime;
                    _log_paramers.outDate = $Global.dateFormater(new Date(), 'yyyyMMdd');
                    _log_paramers.outTime = $Global.dateFormater(new Date(), 'HHmmssSSS');
                    _cache_page.outDate = _log_paramers.outDate;
                    _cache_page.outTime = _log_paramers.outTime;

                    const logger = oThis.createLogStr(_log_paramers);
                    outGdp(_xwbd_cfg.pages[0].attributes)
                    $Ajax.send(_logserver_cfg[eventName].url, '', logger, _logserver_cfg[eventName].method);
                }
            };

            oThis.doTouchEvent = function (event, ele) {
                const eventName = 'touch';
                const _log_paramers = {};
                const _attributes_params = {}
                if (oThis.doPublic(eventName, _log_paramers)) {
                    _log_paramers.pageVID = _cache_page.pageVID;
                    _log_paramers.pageCode = _cache_page.pageCode;
                    _log_paramers.areaVID = _cache_page.areaVID;
                    _log_paramers.areaCode = _cache_page.areaCode;
                    _log_paramers.touchVID = ele.getAttribute('touchVID') || _emptySymbol;
                    _log_paramers.touchCode = ele.getAttribute('touchCode') || _emptySymbol;
                    _attributes_params.attributes = ele.getAttribute('attributes') || _emptySymbol;
                    _log_paramers.date = $Global.dateFormater(new Date(), 'yyyyMMdd');
                    _log_paramers.time = $Global.dateFormater(new Date(), 'HHmmssSSS');
                    _log_paramers.lastTouchVID = _cache_page.touchVID || _cache_cookie.touchVID || _emptySymbol;
                    _log_paramers.lastTouchCode = _cache_page.touchCode || _cache_cookie.touchCode || _emptySymbol;
                    _log_paramers.touchType = ele.tagName || _emptySymbol;
                    _log_paramers.x = event.clientX || _emptySymbol;
                    _log_paramers.y = event.clientY || _emptySymbol;
                    const logger = oThis.createLogStr(_log_paramers);
                    setGdp('clk',_attributes_params.attributes)
                    $Ajax.send(_logserver_cfg[eventName].url, '', logger, _logserver_cfg[eventName].method);
                }

                _cache_page.touchVID = ele.getAttribute('touchVID');
                _cache_page.touchCode = ele.getAttribute('touchCode');
                _cache_page.attributes = window.btoa(encodeURIComponent(JSON.stringify($configTool.getConfigTouchs())))
               
                if (ele.getAttribute('nextAreaCode') != null && ele.getAttribute('nextPageCode')) {
                    _cache_page.nextAreaCode = ele.getAttribute('nextAreaCode');
                    _cache_page.nextPageCode = ele.getAttribute('nextPageCode');
                }

                if (ele.getAttribute('nextAreaCode') != null && !ele.getAttribute('nextPageCode')) {
                    _cache_cookie.touchVID = _cache_page.touchVID;
                    _cache_cookie.touchCode = _cache_page.touchCode;
                    _cache_cookie.attributes = _cache_page.attributes
                    _cache_cookie.areaVID = _cache_page.areaVID;
                    _cache_cookie.areaCode = _cache_page.areaCode;
                    _cache_cookie.pageVID = _cache_page.pageVID;
                    _cache_cookie.pageCode = _cache_page.pageCode;
                    _cache_cookie.envirSID = _cache_page.envirSID;
                    _cache_cookie.envirCode = _cache_page.envirCode;

                    _cache_page.inDate = $Global.dateFormater(new Date(), 'yyyyMMdd');
                    _cache_page.inTime = $Global.dateFormater(new Date(), 'HHmmssSSS');

                    _cache_page.pageVID = _cache_page.nextPageVID;
                    _cache_page.nextPageVID = $Global.uuid('P');
                    _cache_page.areaVID = $Global.uuid('L');
                    _cache_page.areaCode = ele.getAttribute('nextAreaCode');

                    // 处理环境事件
                    _cache_page.envirCode = $configTool.getEnvirCode(_cache_page.areaCode) || '';
                    if (_cache_page.envirCode == '') {
                        _cache_page.envirCode = _cache_cookie.envirCode;
                    } else if (_cache_page.envirCode != _cache_cookie.envirCode) {
                        _cache_page.envirCode == _homeEnvirName ? _cache_page.envirSID = _cache_page.homeEnvirSID : _cache_page.envirSID = $Global.uuid('E');
                        _cache_page.sourceType = 2;
                        _cache_page.sourcePointName = _cache_page.touchCode;
                        $EventHander.doEnvirEvent();
                    }
                } else if (ele.getAttribute('unknownPageCode') != null) {
                    // TODO 未知页面日志
                }

                $cookie.saveCachedCookie();
            };


            oThis.doUserEvent = function (userEventConfig) {
                if (userEventConfig && userEventConfig.paramers != null) {
                    const _log_paramers = new Array(26);
                    const defaultValue = 'NONE';

                    _log_paramers[0] = userEventConfig.eventName || defaultValue;
                    _log_paramers[1] = _cache_page.techType || defaultValue;
                    _log_paramers[2] = userEventConfig.paramers.channelType || _cache_page.channelType || defaultValue;
                    _log_paramers[3] = _xwbd_cfg.version || defaultValue;

                    _log_paramers[4] = userEventConfig.paramers.appID || _cache_page.appID || defaultValue;
                    _log_paramers[5] = userEventConfig.paramers.sessionID || _cache_page.sessionID || defaultValue;
                    _log_paramers[6] = userEventConfig.paramers.userType || defaultValue;
                    _log_paramers[7] = userEventConfig.paramers.userLabel || defaultValue;
                    _log_paramers[8] = userEventConfig.paramers.userGroup || defaultValue;
                    _log_paramers[9] = userEventConfig.paramers.envirSID || _cache_page.envirSID || defaultValue;
                    _log_paramers[10] = userEventConfig.paramers.envirCode || _cache_page.envirCode || defaultValue;

                    _log_paramers[11] = userEventConfig.paramers.moduleID || defaultValue;
                    _log_paramers[12] = userEventConfig.paramers.activityID || defaultValue;
                    _log_paramers[13] = userEventConfig.paramers.targetUser || defaultValue;
                    _log_paramers[14] = userEventConfig.paramers.date || defaultValue;
                    _log_paramers[15] = userEventConfig.paramers.time || defaultValue;
                    _log_paramers[16] = userEventConfig.paramers.procType || defaultValue;
                    _log_paramers[17] = userEventConfig.paramers.prizeID || defaultValue;
                    _log_paramers[18] = userEventConfig.paramers.pageVID || _cache_page.pageVID || defaultValue;
                    _log_paramers[19] = userEventConfig.paramers.pageCode || _cache_page.pageCode || defaultValue;
                    _log_paramers[20] = userEventConfig.paramers.areaVID || _cache_page.areaVID || defaultValue;
                    _log_paramers[21] = userEventConfig.paramers.areaCode || _cache_page.areaCode || defaultValue;
                    _log_paramers[22] = userEventConfig.paramers.sourceType || _cache_page.sourceType || defaultValue;
                    _log_paramers[23] = userEventConfig.paramers.sourcePointName || _cache_page.sourcePointName || defaultValue;
                    _log_paramers[24] = userEventConfig.paramers.backFlag || defaultValue;
                    _log_paramers[25] = defaultValue;

                    let logger = '';
                    for (let i = 0; i < 26; i++) {
                        let str = `${_log_paramers[i]}`;
                        while (str.indexOf(_boundSymbol) != -1) {
                            str = str.replace(_boundSymbol, _replacelSymbol);
                        }
                        logger += (_boundSymbol + str);
                    }

                    if (logger.length > 0) logger = logger.substring(1);

                    $Ajax.send(userEventConfig.url, '', logger, userEventConfig.method, true);
                }
            };

            oThis.doUserEvent_old = function (userEventConfig) {
                const _log_paramers = {};
                _log_paramers.event = userEventConfig.eventName || _emptySymbol;
                _log_paramers.techType = _cache_page.techType || _emptySymbol;
                _log_paramers.channelType = _cache_page.channelType || _emptySymbol;
                _log_paramers.version = _cache_page.version || _emptySymbol;

                if (userEventConfig.eventType == 'business') {
                    _log_paramers.appID = _cache_page.appID || _emptySymbol;
                    _log_paramers.sessionID = _cache_page.sessionID || _emptySymbol;
                    _log_paramers.userType = _cache_page.userType || _emptySymbol;
                    _log_paramers.userLabel = _cache_page.userLabel || _emptySymbol;
                    _log_paramers.userGroup = _cache_page.userGroup || _emptySymbol;
                    _log_paramers.envirSID = _cache_page.envirSID || _emptySymbol;
                    _log_paramers.envirCode = _cache_page.envirCode || _emptySymbol;
                }

                for (const param in userEventConfig.paramers) {
                    _log_paramers[param] = $EventHander.handleUserParam(userEventConfig.paramers[param]);
                }

                const logger = oThis.createLogStr(_log_paramers);

                $Ajax.send(userEventConfig.url, '', logger, userEventConfig.method, true);
            };

            oThis.doPublic = function (eventName, _log_paramers) {
                if (!_logserver_cfg[eventName] || !_logserver_cfg[eventName].url) return false;

                _log_paramers.event = eventName || _emptySymbol;
                _log_paramers.techType = _cache_page.techType || _emptySymbol;
                _log_paramers.channelType = _cache_page.channelType || _emptySymbol;
                _log_paramers.version = _cache_page.version || _emptySymbol;
                _log_paramers.appID = _cache_page.appID || _emptySymbol;
                _log_paramers.sessionID = _cache_page.sessionID || _emptySymbol;
                if (eventName != 'init') {
                    _log_paramers.userType = _cache_page.userType || _emptySymbol;
                    _log_paramers.userLabel = _cache_page.userLabel || _emptySymbol;
                    _log_paramers.userGroup = _cache_page.userGroup || _emptySymbol;
                    _log_paramers.envirSID = _cache_page.envirSID || _emptySymbol;
                    _log_paramers.envirCode = _cache_page.envirCode || _emptySymbol;
                    if (eventName != 'plan') {
                        _log_paramers.linkID = _emptySymbol;
                    }
                }
                return true;
            };

            // 增加自定义日志20181018
            oThis.doPlanEvent = function (id, businessCode, source, type) {
                const eventName = 'plan';
                const _log_paramers = {};
                if (oThis.doPublic(eventName, _log_paramers)) {
                    _log_paramers.pageCode = _cache_page.pageCode;
                    _log_paramers.id = id;
                    _log_paramers.businessCode = businessCode;
                    _log_paramers.source = source;
                    _log_paramers.type = type;

                    const logger = oThis.createLogStr(_log_paramers);

                    $Ajax.send(_logserver_cfg[eventName].url, '', logger, _logserver_cfg[eventName].method);
                }
            };


            oThis.createLogStr = function (logBean) {
                const logStr = [];
                for (const param in logBean) {
                    let str = `${logBean[param]}`;
                    while (str.indexOf(_boundSymbol) != -1) {
                        str = str.replace(_boundSymbol, _replacelSymbol);
                    }
                    logStr.push(str);
                }
                if (logStr.length == 0) return _emptySymbol;
                return logStr.join(_boundSymbol);
            };

            oThis.handleUserParam = function (param) {
                let result = '';
                if (typeof param === 'string') {
                    if (param.trim().indexOf('${') == 0) {
                        const results = param.match(/^\$\{(.*)\.(.*)\}$/);
                        if (results) {
                            const ele = document.getElementById(results[1].trim());
                            result = ele ? ele.getAttribute(results[2].trim()) : '';
                        }
                    } else {
                        result = param;
                    }
                }
                return result || _emptySymbol;
            };
        };

        var $EventHander = new eventHander();

        const xwbd_api = function () {
            const oThis = this;

            oThis.changeArea = function (p_areaCode, element) {
                if (arguments.length == 0) return;

                $EventHander.doOutPageEvent();

                const touchObj = element ? (typeof (element) === 'object' ? element : document.getElementById(element)) : null;

                if (touchObj && typeof (touchObj.getAttribute) === 'function' && touchObj.getAttribute('touchVID')) {
                    _cache_cookie.touchVID = touchObj.getAttribute('touchVID');
                    _cache_cookie.touchCode = touchObj.getAttribute('touchCode');
                    _cache_cookie.attributes = touchObj.getAttribute('attributes');
                } else {
                    _cache_cookie.touchVID = _cache_page.touchVID;
                    _cache_cookie.touchCode = _cache_page.touchCode;
                    _cache_cookie.attributes = _cache_page.attributes;
                }

                _cache_cookie.areaVID = _cache_page.areaVID;
                _cache_cookie.areaCode = _cache_page.areaCode;
                _cache_cookie.pageVID = _cache_page.pageVID;
                _cache_cookie.pageCode = _cache_page.pageCode;
                _cache_cookie.envirSID = _cache_page.envirSID;
                _cache_cookie.envirCode = _cache_page.envirCode;

                _cache_page.inDate = $Global.dateFormater(new Date(), 'yyyyMMdd');
                _cache_page.inTime = $Global.dateFormater(new Date(), 'HHmmssSSS');

                _cache_page.pageVID = _cache_page.nextPageVID;
                _cache_page.nextPageVID = $Global.uuid('P');
                _cache_page.areaVID = $Global.uuid('L');
                _cache_page.areaCode = p_areaCode;

                // 处理环境事件
                _cache_page.envirCode = $configTool.getEnvirCode(_cache_page.areaCode) || '';
                if (_cache_page.envirCode == '') {
                    _cache_page.envirCode = _cache_cookie.envirCode;
                } else if (_cache_page.envirCode != _cache_cookie.envirCode) {
                    _cache_page.envirCode == _homeEnvirName ? _cache_page.envirSID = _cache_page.homeEnvirSID : _cache_page.envirSID = $Global.uuid('E');
                    _cache_page.sourceType = 2;
                    _cache_page.sourcePointName = _cache_page.touchCode;
                    $EventHander.doEnvirEvent();
                }

                $cookie.saveCachedCookie();

                $EventHander.doPageEvent();
            };

            oThis.getChannel = function () {
                const chName = _xwbd_cfg ? (_xwbd_cfg.cookieName ? _xwbd_cfg.cookieName.ch : '') : '';
                if (chName) return $cookie.getCookie(chName);
                return '';
            };

            oThis.getBid = function (type) {
                let tmp = '';

                if (type) tmp = _cache_page.nextPageVID;// nextPageVID--nextPageID
                else tmp = _cache_page.pageVID;

                return tmp || 'EMPTY';
            };

            oThis.getPageInfo = function (name) {
                if (_cache_page[name]) return _cache_page[name];
                return '';
            };

            oThis.getLastPageInfo = function (name) {
                if (_cache_cookie[name]) return _cache_page[name];
                return '';
            };

            oThis.userEvents = function (config) {
                if (typeof config !== 'object' || !(config instanceof Array)) return;

                for (const i in config) {
                    $xwbd_api.handldUserEvent(config[i]);
                }
            };

            oThis.touchs = function (config) {
                if (typeof config !== 'object' || !(config instanceof Array)) return;

                _setting.touch = [];
                for (const i in config) {
                    _setting.touch.push(config[i]);
                }
            };

            oThis.pageConfig = function (config) {
                if (typeof config !== 'object') return;

                for (const param in config) {
                    _setting[param] = config[param] || '';
                }
            };

            // 提供自定义日志接口
            oThis.doPlanLogs = function (id, businessCode, source, type) {
                //  if (typeof config != "object")
                //    return;

                $EventHander.doPlanEvent(id, businessCode, source, type);
            };

            oThis.handldUserEvent = function (obj) {
                if (arguments.length == 0) return;

                let { eventType } = obj;
                if (typeof eventType !== 'string' || (eventType != 'simple' && eventType != 'business')) eventType = 'simple';

                const { url } = obj;
                if (typeof url !== 'string' || url.indexOf('http') < 0) return;

                let { method } = obj;
                if (typeof method !== 'string' || (method != 'GET' && method != 'POST')) method = 'POST';

                const { eventName } = obj;
                if (typeof eventName !== 'string') return;

                const { triggerTypes } = obj;
                if (typeof triggerTypes !== 'object' || !(triggerTypes instanceof Array)) return;

                const { paramers } = obj;
                if (typeof paramers !== 'object') return;

                const userEventConfig = {};
                userEventConfig.eventType = eventType;
                userEventConfig.url = url;
                userEventConfig.method = method;
                userEventConfig.eventName = eventName;
                userEventConfig.paramers = paramers;

                for (const i in triggerTypes) {
                    const triggerType = triggerTypes[i];

                    if (typeof triggerType !== 'string') continue;

                    if (triggerType == 'now') {
                        $EventHander.doUserEvent(userEventConfig);
                    } else if (triggerType == 'load') {
                        userEventConfig.type = 'load';
                        _userEvent_load.push(userEventConfig);
                    } else if (triggerType == 'click') {
                        const eleId = obj.triggerElements;
                        if (typeof eleId !== 'object' || !(eleId instanceof Array)) continue;

                        for (const j in eleId) {
                            const ele = document.getElementById(eleId[j]);
                            if (ele) {
                                $Global.AddListener(ele, 'click', () => {
                                    $EventHander.doUserEvent(userEventConfig);
                                });
                            }
                        }
                    } else if (triggerType == 'unload') {
                        userEventConfig.type = 'unload';
                        _userEvent_unload.push(userEventConfig);
                    }
                }
            };
        };

        var $xwbd_api = new xwbd_api();

        const Register = function () {
            const oThis = this;

            oThis.bindElements = function () {
                const eles = $Global.getAllUnEffectivedEles();
                for (let i = 0; i < eles.length; i++) {
                    if (!eles[i].getAttribute(_collectActiveFlag)) {
                        if (eles[i].getAttribute('businessName')) {
                            const bid = _cache_page.envirSID + eles[i].getAttribute('businessName');
                            eles[i].setAttribute('businessID', bid);
                            const hid = document.getElementById(eles[i].getAttribute('businessName'));
                            if (hid) hid.value = bid;
                        }

                        $Global.AddListener(eles[i], 'click', function (event) {
                            if (this.getAttribute('nextAreaCode') != null && !this.getAttribute('nextPageCode')) {
                                $EventHander.doOutPageEvent();
                            }

                            const e = event || window.event;
                            $EventHander.doTouchEvent(e, this);

                            if (this.getAttribute('nextAreaCode') != null && !this.getAttribute('nextPageCode')) {
                                $EventHander.doPageEvent();
                            }
                            return true;
                        });

                        eles[i].setAttribute(_collectActiveFlag, 'true');
                    }
                }
            };

            oThis.loadScrpit = function (jsurl, sid, callback) {
                const nodeHead = document.getElementsByTagName('head')[0];
                let nodeScript = null;
                if (document.getElementById(sid) == null) {
                    nodeScript = document.createElement('script');
                    nodeScript.setAttribute('type', 'text/javascript');
                    nodeScript.setAttribute('src', jsurl);
                    nodeScript.setAttribute('id', sid);
                    nodeScript.onload = nodeScript.onreadystatechange = function () {
                        if (!nodeScript.readyState || nodeScript.readyState == 'loaded' || nodeScript.readyState == 'complete') {
                            nodeScript.onload = nodeScript.onreadystatechange = null;
                            callback();
                        }
                    };
                    nodeHead.appendChild(nodeScript);
                }
            };

            oThis.initSession = function () {
                // 获取cookie值
                if ($Global.isEmptyObject(_cache_cookie)) _cache_cookie = $cookie.getCachedCookie();

                let channel = '';
                // 获取url参数
                if (_xwbd_cfg.urlParam && _xwbd_cfg.cookieName && _xwbd_cfg.cookieName.ch && $Global.getRequest(_xwbd_cfg.urlParam.channel)) {
                    $cookie.setCookie(_xwbd_cfg.cookieName.ch, $Global.getRequest(_xwbd_cfg.urlParam.channel), 0, _vidDomain);
                    channel = $Global.getRequest(_xwbd_cfg.urlParam.channel);
                }

                _cache_page.userGroup = '';
                if ($cookie.getCookie('userMobileForBigData')) {
                    _cache_page.userType = '1';
                    _cache_page.userLabel = $cookie.getCookie('userMobileForBigData');
                } else {
                    _cache_page.userType = '0';
                    _cache_page.userLabel = '';
                }

                _cache_page.inDate = $Global.dateFormater(new Date(), 'yyyyMMdd');
                _cache_page.inTime = $Global.dateFormater(new Date(), 'HHmmssSSS');

                _cache_page.appID = _cache_cookie.appID || $Global.uuid('A');
                _cache_page.techType = _cache_cookie.techType || _xwbd_cfg.techType || '';
                _cache_page.channelType = channel || _cache_cookie.channelType || '';
                _cache_page.version = _cache_cookie.version || _xwbd_cfg.version || '';
                _cache_page.sessionID = _cache_cookie.sessionID || $Global.uuid('S');
                _cache_page.pageCode = _pageName_default;
               
                // 存储cookie
                $cookie.saveCachedCookie();
            };

            oThis.initPage = function () {
                // 获取cookie值
                if ($Global.isEmptyObject(_cache_cookie)) _cache_cookie = $cookie.getCachedCookie();

                _cache_page.pageCode = _page_cfg.pageCode || '';
                if (_cache_cookie.nextPageCode && _cache_page.pageCode == _cache_cookie.nextPageCode) {
                    _cache_page.areaCode = _cache_cookie.nextAreaCode;
                }
                _cache_page.areaCode = _cache_page.areaCode || _page_cfg.defaultAreaCode || '';

                if (_cache_page.pageCode == _cache_cookie.pageCode && _cache_page.areaCode == _cache_cookie.areaCode) {
                    _cache_page.pageVID = _cache_cookie.pageVID;
                    _cache_page.nextPageVID = _cache_cookie.nextPageVID;
                    _cache_page.areaVID = _cache_cookie.areaVID;
                } else {
                    _cache_page.pageVID = _cache_cookie.nextPageVID || $Global.uuid('P');
                    _cache_page.nextPageVID = $Global.uuid('P');
                    _cache_page.areaVID = $Global.uuid('L');
                }

                _cache_page.envirCode = $configTool.getEnvirCode(_cache_page.areaCode) || '';

                _cache_page.sourcePointName = '';
                _cache_page.sourceType = '0';

                _cache_page.homeEnvirSID = _cache_cookie.homeEnvirSID || $Global.uuid('E');
                // 判断环境ID
                let envirSID = '';

                // 新session 重新生成 envirSID homeEnvirSID
                if (!$cookie.getCookie(_cookieSid)) {
                    envirSID = $Global.uuid('E');
                    if (document.referrer) {
                        _cache_page.sourcePointName = document.referrer || '';
                        _cache_page.sourceType = '1';
                    } else {
                        _cache_page.sourcePointName = '';
                        _cache_page.sourceType = '0';
                    }
                } else {
                    // 新环境重新生成envirSID
                    if (!_cache_cookie.envirCode || _cache_page.envirCode != _cache_cookie.envirCode) {
                        envirSID = $Global.uuid('E');
                        if (_xwbd_cfg.hostname && document.referrer.indexOf(_xwbd_cfg.hostname) >= 0) {
                            _cache_page.sourcePointName = _cache_cookie.touchCode || '';
                            _cache_page.sourceType = '2';
                        } else {
                            _cache_page.sourcePointName = document.referrer || '';
                            _cache_page.sourceType = '1';
                        }
                    } else {
                        envirSID = _cache_cookie.envirSID;
                        _cache_page.sourcePointName = _cache_cookie.sourcePointName || '';
                        _cache_page.sourceType = _cache_cookie.sourceType || '';
                    }
                }
                // 如果为根环境 环境ID不变
                if (_cache_page.envirCode == _homeEnvirName) {
                    envirSID = _cache_page.homeEnvirSID || '';
                }
                // 配置文件未找到环境名称 则为公用环境 延续上一环境的环境ID和名称已经来源 没有上一页面信息则为未知
                else if (_cache_page.envirCode == '') {
                    envirSID = _cache_cookie.envirSID || '';
                    _cache_page.envirCode = _cache_cookie.envirCode || '';
                    if (_cache_cookie.sourceType) {
                        _cache_page.sourcePointName = _cache_cookie.sourcePointName || '';
                        _cache_page.sourceType = _cache_cookie.sourceType || '';
                    }
                }


                // 通过URL获取到了ch 则覆盖来源
                let channel = '';
                if (_xwbd_cfg.urlParam && _xwbd_cfg.cookieName && _xwbd_cfg.cookieName.ch && $Global.getRequest(_xwbd_cfg.urlParam.channel)) {
                    $cookie.setCookie(_xwbd_cfg.cookieName.ch, $Global.getRequest(_xwbd_cfg.urlParam.channel), 0, _vidDomain);
                    channel = $Global.getRequest(_xwbd_cfg.urlParam.channel);
                }
                if (channel) {
                    _cache_page.sourcePointName = document.referrer || '';
                    _cache_page.sourceType = '1';
                }
                _cache_page.envirSID = envirSID || '';

                // 存储cookie
                $cookie.saveCachedCookie();
            };


            oThis.doInPageEvent = function () {
                // 根据sessionID 处理初始化事件
                if (!$cookie.getCookie(_cookieSid)) {
                    $EventHander.doInitEvent();
                    $cookie.setCookie(_cookieSid, _cache_page.sessionID, 0, _vidDomain);
                }

                // 处理环境事件
                if (!_cache_cookie.envirCode || _cache_page.envirCode != _cache_cookie.envirCode) {
                    if (_cache_page.envirCode != '') {
                        $EventHander.doEnvirEvent();
                    }
                }

                // 处理页面事件
                $EventHander.doPageEvent();

                // 处理用户自定义事件
                for (const i in _userEvent_load) {
                    $EventHander.doUserEvent(_userEvent_load[i]);
                }
            };

            oThis.onPageLoaded = function () {
                // 绑定点击事件
                $Register.bindElements();
                setInterval(() => {
                    $Register.bindElements();
                    //  $Register.handleAllHref();
                }, 2000);
            };


            oThis.windowUnload = function () {
                // 缓存页面信息
                _cache_page.outDate = _cache_page.outDate || $Global.dateFormater(new Date(), 'yyyyMMdd');
                _cache_page.outTime = _cache_page.outDate || $Global.dateFormater(new Date(), 'HHmmssSSS');

                $cookie.saveCachedCookie();

                // 处理页面退出事件
                $EventHander.doOutPageEvent();

                // 处理用户自定义事件
                for (const i in _userEvent_unload) {
                    $EventHander.doUserEvent(_userEvent_unload[i]);
                }
            };
        };
        var $Register = new Register();

        (function () {
          // 注册API方法
          window[_apiName] = $xwbd_api;
          
          // 采集判断
          if (!$configTool.isCollect()) return;
          
          // 初始化公共信息
          $Register.initSession();
          
          // 获取配置
          if (!$configTool.getHostCfg()) return;
          
          if (!$configTool.getPageCfg()) return;
          
          // 初始化页面信息
          $Register.initPage();
          
          // 处理进入页面事件
          $Register.doInPageEvent();
            // 加载页面事件
            if (document.all) {
                window.attachEvent('onload', $Register.onPageLoaded);// IE中
            } else {
                if (document.readyState == 'complete') {
                    $Register.bindElements();
                    setInterval(() => {
                        $Register.bindElements();
                        //  $Register.handleAllHref();
                    }, 2000);
                } else {
                    window.addEventListener('load', $Register.onPageLoaded, false);// firefox
                }
            }

            // 绑定退出事件
            if (document.all) {
                window.attachEvent('onbeforeunload', $Register.windowUnload);// IE中
            } else {
                window.addEventListener('beforeunload', $Register.windowUnload, false);//

                if ($Global.browser().mozilla) window.addEventListener('unload', $Register.windowUnload, false);// firefox
            }
        }());
    }());
}
