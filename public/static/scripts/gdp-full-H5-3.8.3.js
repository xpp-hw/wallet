!(function (e, t) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = t() : typeof define === 'function' && define.amd ? define(t) : (e = typeof globalThis !== 'undefined' ? globalThis : e || self).gdp = t();
}(this, (() => {
    const e = ['web', 'wxwv', 'minp', 'alip', 'baidup', 'qq', 'bytedance'];
    const t = {
        autotrack: {
            type: 'boolean',
            default: !0
        },
        compress: {
            type: 'boolean',
            default: !0
        },
        dataCollect: {
            type: 'boolean',
            default: !0
        },
        debug: {
            type: 'boolean',
            default: !1
        },
        hashtag: {
            type: 'boolean',
            default: !1
        },
        touch: {
            type: 'boolean',
            default: !1
        },
        version: {
            type: 'string',
            default: '1.0.0'
        },
        platform: {
            type: 'string',
            default: 'web'
        },
        cookieDomain: {
            type: 'string',
            default: ''
        }
    };
    const i = {
        enableIdMapping: {
            type: 'boolean',
            default: !1
        },
        gtouchHost: {
            type: 'string',
            default: ''
        },
        host: {
            type: 'string',
            default: ''
        },
        ignoreFields: {
            type: 'array',
            default: []
        },
        penetrateHybrid: {
            type: 'boolean',
            default: !0
        },
        scheme: {
            type: 'string',
            default: location.protocol.indexOf('http') > -1 ? location.protocol.replace(':', '') : 'https'
        },
        sessionExpires: {
            type: 'number',
            default: 30
        },
        performance: {
            type: 'object',
            default: {
                monitor: !0,
                exception: !0
            }
        },
        embeddedIgnore: {
            type: 'array',
            default: []
        }
    };
    const n = {};
    const r = ['clearUserId', 'getGioInfo', 'getLocation', 'getOption', 'init', 'setDataCollect', 'setOption', 'setUserId', 'track', 'setGeneralProps', 'clearGeneralProps', 'enableDebug', 'enableHT', 'setAutotrack', 'setTrackerHost', 'setTrackerScheme', 'setUserAttributes', 'getVisitorId', 'getDeviceId', 'registerPlugins', 'getPlugins', 'sendPage', 'sendVisit', 'trackTimerStart', 'trackTimerPause', 'trackTimerResume', 'trackTimerEnd', 'removeTimer', 'clearTrackTimer'];
    const s = ['autotrack', 'dataCollect', 'dataSourceId', 'debug', 'host', 'hashtag', 'scheme'];
    const o = {
        autotrack: '无埋点采集',
        dataCollect: '数据采集',
        debug: '调试模式'
    };
    const a = ['send', 'setConfig', 'collectImp', 'setPlatformProfile'];
    const d = ['screenHeight', 'screenWidth'];
    const l = {
        click: 'VIEW_CLICK',
        change: 'VIEW_CHANGE',
        submit: 'FORM_SUBMIT'
    };
    let c; let h; let u; let g; let p; let f; let m; const v = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
    const I = typeof Array.from === 'function' ? Array.from : (h || (h = 1, u = function (e) {
        return typeof e === 'function';
    }, g = function (e) {
        const t = (function (e) {
            const t = Number(e);
            return isNaN(t) ? 0 : t !== 0 && isFinite(t) ? (t > 0 ? 1 : -1) * Math.floor(Math.abs(t)) : t;
        }(e));
        return Math.min(Math.max(t, 0), 9007199254740991);
    }, p = function (e) {
        if (e != null) {
            if (['string', 'number', 'boolean', 'symbol'].indexOf(typeof e) > -1) return Symbol.iterator;
            if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in e) return Symbol.iterator;
            if ('@@iterator' in e) return '@@iterator';
        }
    }, f = function (e, t) {
        if (e != null && t != null) {
            const i = e[t];
            if (i == null) return;
            if (!u(i)) throw new TypeError(`${i} is not a function`);
            return i;
        }
    }, m = function (e) {
        const t = e.next();
        return !t.done && t;
    }, c = function (e) {
        let t; let i; let n; const r = this;
        const s = arguments.length > 1 ? arguments[1] : void 0;
        if (void 0 !== s) {
            if (!u(s)) throw new TypeError('Array.from: when provided, the second argument must be a function');
            arguments.length > 2 && (t = arguments[2]);
        }
        const o = f(e, p(e));
        if (void 0 !== o) {
            i = u(r) ? Object(new r()) : [];
            let a; let d; const
                l = o.call(e);
            if (l == null) throw new TypeError('Array.from requires an array-like or iterable object');
            for (n = 0; ;) {
                if (!(a = m(l))) return i.length = n, i;
                d = a.value, i[n] = s ? s.call(t, d, n) : d, n++;
            }
        } else {
            const c = Object(e);
            if (e == null) throw new TypeError('Array.from requires an array-like object - not null or undefined');
            let h; const
                v = g(c.length);
            for (i = u(r) ? Object(new r(v)) : Array(v), n = 0; v > n;) h = c[n], i[n] = s ? s.call(t, h, n) : h, n++;
            i.length = v;
        }
        return i;
    }), c);
    const w = e => L(['undefined', 'null'], X(e));
    const O = e => X(e) === 'string';
    const b = e => X(e) === 'number';
    const y = (e) => {
        const t = Number(e);
        return t != t;
    };
    const E = e => X(e) === 'boolean';
    const S = e => X(e) === 'object' && !w(e);
    const _ = e => X(e) === 'regexp';
    const T = e => X(e) === 'function';
    const N = e => Array.isArray(e) && X(e) === 'array';
    const C = e => X(e) === 'date';
    const A = (e) => {
        try {
            return k(e)[0];
        } catch (e) {

        }
    };
    const x = (e) => {
        try {
            const t = k(e);
            return t[t.length - 1];
        } catch (e) {

        }
    };
    const P = (e, t = 1) => (N(e) && b(t) ? e.slice(t > 0 ? t : 1, e.length) : e);
    const D = (e) => {
        if (N(e)) {
            let t = 0;
            const i = [];
            for (const n of e) n && !$(n) && (i[t++] = n);
            return i;
        }
        return e;
    };
    const R = (e, t) => {
        let i;
        return N(e) && e.forEach(((e) => {
            t(e) && void 0 === i && (i = e);
        })), i;
    };
    const L = (e, t) => (X(e) === 'array' || X(e) === 'string') && e.indexOf(t) >= 0;
    const k = I;
    const j = e => (w(e) ? '' : `${e}`);
    const U = (e, t) => (typeof e === 'string' ? e.split(t) : e);
    const G = (e) => {
        if (O(e)) {
            const t = U(e, '');
            return `${A(t).toLowerCase()}${P(t).join('')}`;
        }
        return e;
    };
    const q = (e, t) => !!O(e) && e.slice(0, t.length) === t;
    const H = (e, t) => {
        if (O(e)) {
            const {
                length: i
            } = e;
            let n = i;
            n > i && (n = i);
            const r = n;
            return n -= t.length, n >= 0 && e.slice(n, r) === t;
        }
        return !1;
    };
    const B = {}.hasOwnProperty;
    const K = (e, t) => !w(e) && B.call(e, t);
    const V = e => (S(e) ? Object.keys(e) : []);
    const W = (e, t) => {
        V(e).forEach((i => t(e[i], i)));
    };
    const M = (e, t) => {
        const i = V(e);
        return !(!S(e) || !S(t) || i.length !== V(t).length || L(i.map(((i, n) => (S(e[i]) ? M(e[i], t[i]) : e[i] === t[i]))), !1));
    };
    const F = (e, t) => {
        if (!S(e)) return !1;
        try {
            return X(t) === 'string' ? delete e[t] : X(t) === 'array' ? t.map((t => delete e[t])) : (_(t) && V(e).forEach(((i) => {
                t.test(i) && F(e, i);
            })), !0);
        } catch (e) {
            return !1;
        }
    };
    const $ = e => (N(e) ? e.length === 0 : S(e) ? V(e).length === 0 : !e);
    const X = e => ({}.toString.call(e).slice(8, -1).toLowerCase());
    const z = Object.freeze({
        __proto__: null,
        isNil: w,
        isString: O,
        isNumber: b,
        isNaN: y,
        isBoolean: E,
        isObject: S,
        isRegExp: _,
        isFunction: T,
        isArray: N,
        isDate: C,
        fixed: (e, t) => (b(e) ? Number(e.toFixed(b(t) ? t : 2)) : O(e) && j(Number(e)) !== 'NaN' ? Number(Number(e).toFixed(b(t) ? t : 2)) : e),
        head: A,
        last: x,
        drop: P,
        dropWhile: (e, t) => (N(e) ? e.filter((e => !t(e))) : e),
        compact: D,
        find: R,
        includes: L,
        arrayFrom: k,
        toString: j,
        split: U,
        lowerFirst: G,
        upperFirst: (e) => {
            if (O(e)) {
                const t = U(e, '');
                return `${A(t).toUpperCase()}${P(t).join('')}`;
            }
            return e;
        },
        startsWith: q,
        endsWith: H,
        hasOwnProperty: B,
        has: K,
        keys: V,
        forEach: W,
        isEqual: M,
        get: (e, t, i) => {
            let n = e;
            return S(e) ? (t.split('.').forEach(((e) => {
                n = n ? n[e] : i;
            })), n) : i;
        },
        unset: F,
        isEmpty: $,
        typeOf: X,
        formatDate: (e) => {
            if (C(e)) {
                const t = e => (e < 10 ? `0${e}` : e);
                return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}:${t(e.getSeconds())}.${t(e.getMilliseconds())}`;
            }
            return e;
        }
    });
    const J = (e, t) => {
        console.log(`%c [GrowingIO]：${e}`, {
            info: 'color: #3B82F6;',
            error: 'color: #EF4444;',
            warn: 'color: #F59E0B;',
            success: 'color: #10B981;'
        }[t] || '');
    };
    const Z = (e) => {
        try {
            return e();
        } catch (e) {

        }
    };
    const Y = (e) => {
        const t = {};
        return S(e) && W(e, ((e, i) => {
            let n;
            const r = j(i).slice(0, 100);
            S(e) ? t[r] = Y(e) : N(e) ? (t[r] = e.slice(0, 100), ((n = window.vds) === null || void 0 === n ? void 0 : n.gioEnvironment) === 'cdp' && (t[r] = t[r].join('||'))) : t[r] = w(e) ? '' : j(e).slice(0, 1e3);
        })), t;
    };
    const Q = (e, t, i, n = {}) => {
        document.addEventListener ? e.addEventListener(t, i, Object.assign(Object.assign({}, {
            capture: !0
        }), n)) : e.attachEvent ? e.attachEvent(`on${t}`, i) : e[`on${t}`] = i;
    };
    const ee = (e, t) => (O(e) && !$(e) && e.match(/^[a-zA-Z_][0-9a-zA-Z_]{0,100}$/) ? t() : (J('事件名格式不正确，只能包含数字、字母和下划线，且不能以数字开头，字符总长度不能超过100!', 'error'), !1));
    const te = Object.freeze({
        __proto__: null,
        consoleText: J,
        niceTry: Z,
        limitObject: Y,
        addListener: Q,
        flattenObject: (e = {}) => {
            const t = Object.assign({}, e);
            return V(t).forEach(((e) => {
                S(t[e]) ? (V(t[e]).forEach(((i) => {
                    t[`${e}_${i}`] = j(t[e][i]);
                })), F(t, e)) : N(t[e]) ? (t[e].forEach(((i, n) => {
                    S(i) ? V(i).forEach(((r) => {
                        t[`${e}_${n}_${r}`] = j(i[r]);
                    })) : t[`${e}_${n}`] = j(i);
                })), F(t, e)) : w(t[e]) || t[e] === '' ? F(t, e) : t[e] = j(t[e]);
            })), t;
        },
        eventNameValidate: ee
    });
    const ie = e => O(e) && e.length > 0 || b(e) && e > 0;
    const ne = (e) => {
        let t;
        return e.vdsConfig || e.gioSDKInitialized || ((t = window.vds) === null || void 0 === t ? void 0 : t.gioSDKInitialized) ? (J('SDK重复初始化，请检查是否重复加载SDK或接入其他平台SDK导致冲突!', 'warn'), !1) : !(L(['', 'localhost', '127.0.0.1'], location.hostname) && !window._gr_ignore_local_rule && (J('当前SDK不允许在本地环境初始化!', 'warn'), 1));
    };
    const re = e => !$(D(e)) || (J('SDK初始化失败，请使用 gdp("init", "您的GrowingIO项目 accountId", "您项目的 dataSourceId", options); 进行初始化!', 'error'), !1);
    const se = (e) => {
        const t = A(e);
        let i = x(e);
        return ie(j(t).trim()) ? (S(i) && i || (i = {}), {
            projectId: t,
            userOptions: i
        }) : (J('SDK初始化失败，accountId 参数不合法!', 'error'), !1);
    };
    const oe = (e) => {
        const t = e[1];
        const i = e[2];
        const n = x(e);
        return t && O(t) ? S(n) && n.host ? {
            dataSourceId: t,
            appId: O(i) ? i : '',
            cdpOptions: n
        } : (J('SDK初始化失败，未在配置中指定 host!', 'error'), !1) : (J('SDK初始化失败，dataSourceId 参数不合法!', 'error'), !1);
    };
    const ae = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/i;
    const de = /^(https?:\/\/)|(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    const le = 'SDK_INITIALIZED';
    const ce = 'USERID_UPDATE';
    const he = 'USERKEY_UPDATE';
    const ue = 'SESSIONID_UPDATE';
    const ge = {};
    const pe = {}.hasOwnProperty;

    function fe(e) {
        try {
            return decodeURIComponent(e.replace(/\+/g, ' '));
        } catch (e) {
            return null;
        }
    }

    function me(e) {
        try {
            return encodeURIComponent(e);
        } catch (e) {
            return null;
        }
    }
    ge.stringify = function (e, t) {
        t = t || '';
        let i; let n; const
            r = [];
        for (n in typeof t !== 'string' && (t = '?'), e) {
            if (pe.call(e, n)) {
                if ((i = e[n]) || i != null && !isNaN(i) || (i = ''), n = me(n), i = me(i), n === null || i === null) continue;
                r.push(`${n}=${i}`);
            }
        } return r.length ? t + r.join('&') : '';
    }, ge.parse = function (e) {
        for (var t, i = /([^=?#&]+)=?([^&]*)/g, n = {}; t = i.exec(e);) {
            const r = fe(t[1]);
            const s = fe(t[2]);
            r === null || s === null || r in n || (n[r] = s);
        }
        return n;
    };
    const ve = {
        name: 'gioCompress',
        method: class {
            constructor(e) {
                this.growingIO = e, this._compress = function (e, t, i) {
                    if (e === null) return '';
                    let n; let r; let s; const o = {};
                    const a = {};
                    let d = '';
                    let l = '';
                    let c = '';
                    let h = 2;
                    let u = 3;
                    let g = 2;
                    const p = [];
                    let f = 0;
                    let m = 0;
                    for (s = 0; s < e.length; s += 1) {
                        if (d = e.charAt(s), {}.hasOwnProperty.call(o, d) || (o[d] = u++, a[d] = !0), l = c + d, {}.hasOwnProperty.call(o, l)) c = l;
                        else {
                            if ({}.hasOwnProperty.call(a, c)) {
                                if (c.charCodeAt(0) < 256) {
                                    for (n = 0; g > n; n++) f <<= 1, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++;
                                    for (r = c.charCodeAt(0), n = 0; n < 8; n++) f = f << 1 | 1 & r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r >>= 1;
                                } else {
                                    for (r = 1, n = 0; g > n; n++) f = f << 1 | r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r = 0;
                                    for (r = c.charCodeAt(0), n = 0; n < 16; n++) f = f << 1 | 1 & r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r >>= 1;
                                }
                                h--, h === 0 && (h = Math.pow(2, g), g++), delete a[c];
                            } else for (r = o[c], n = 0; g > n; n++) f = f << 1 | 1 & r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r >>= 1;
                            h--, h === 0 && (h = Math.pow(2, g), g++), o[l] = u++, c = `${d}`;
                        }
                    } if (c !== '') {
                        if ({}.hasOwnProperty.call(a, c)) {
                            if (c.charCodeAt(0) < 256) {
                                for (n = 0; g > n; n++) f <<= 1, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++;
                                for (r = c.charCodeAt(0), n = 0; n < 8; n++) f = f << 1 | 1 & r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r >>= 1;
                            } else {
                                for (r = 1, n = 0; g > n; n++) f = f << 1 | r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r = 0;
                                for (r = c.charCodeAt(0), n = 0; n < 16; n++) f = f << 1 | 1 & r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r >>= 1;
                            }
                            h--, h === 0 && (h = Math.pow(2, g), g++), delete a[c];
                        } else for (r = o[c], n = 0; g > n; n++) f = f << 1 | 1 & r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r >>= 1;
                        h--, h === 0 && (h = Math.pow(2, g), g++);
                    }
                    for (r = 2, n = 0; g > n; n++) f = f << 1 | 1 & r, m === t - 1 ? (m = 0, p.push(i(f)), f = 0) : m++, r >>= 1;
                    for (;;) {
                        if (f <<= 1, m === t - 1) {
                            p.push(i(f));
                            break;
                        }
                        m++;
                    }
                    return p.join('');
                }, this.compress = (e) => {
                    const t = this;
                    return this._compress(e, 16, (e => t.f(e)));
                }, this.compressToUTF16 = (e) => {
                    const t = this;
                    return e === null ? '' : `${this._compress(e, 15, (e => t.f(e + 32)))} `;
                }, this.compressToUint8Array = (e) => {
                    const t = this.compress(e);
                    const i = new Uint8Array(2 * t.length);
                    for (let e = 0, n = t.length; n > e; e++) {
                        const n = t.charCodeAt(e);
                        i[2 * e] = n >>> 8, i[2 * e + 1] = n % 256;
                    }
                    return i;
                }, this.compressToEncodedURIComponent = e => (e == null ? '' : this._compress(e, 6, (function (e) {
                    return this.keyStrUriSafe.charAt(e);
                }))), this.f = String.fromCharCode, this.keyStrUriSafe = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$';
            }
        }
    };
    const Ie = {
        name: 'gioCustomTracking',
        method: class {
            constructor(e) {
                this.growingIO = e, this.getValidResourceItem = (e) => {
                    if (e && S(e) && e.id && e.key) {
                        const t = {
                            id: O(e.id) ? e.id : j(e.id),
                            key: O(e.key) ? e.key : j(e.key)
                        };
                        return e.attributes && (t.attributes = e.attributes), t;
                    }
                }, this.getDynamicAttributes = e => (w(e) || V(e).forEach(((t) => {
                    T(e[t]) ? e[t] = e[t]() : S(e[t]) ? F(e, t) : N(e[t]) || (e[t] = j(e[t]));
                })), e), this.buildCustomEvent = (e, t, i, n) => {
                    ee(e, (() => {
                        const {
                            dataStore: {
                                eventContextBuilder: r,
                                eventConverter: s,
                                currentPage: o
                            }
                        } = this.growingIO;
                        let a = Object.assign({
                            eventType: 'CUSTOM',
                            eventName: e,
                            pageShowTimestamp: o == null ? void 0 : o.time,
                            attributes: Y(this.getDynamicAttributes(S(t) && !$(t) ? t : void 0)),
                            resourceItem: Y(this.getValidResourceItem(i))
                        }, r());
                        $(n) || (a = Object.assign(Object.assign({}, a), n)), s(a);
                    }));
                }, this.buildUserAttributesEvent = (e, t) => {
                    const {
                        dataStore: {
                            eventContextBuilder: i,
                            eventConverter: n
                        }
                    } = this.growingIO;
                    let r = Object.assign({
                        eventType: 'LOGIN_USER_ATTRIBUTES',
                        attributes: Y(e)
                    }, i());
                    $(t) || (r = Object.assign(Object.assign({}, r), t)), n(r);
                };
            }
        }
    };
    const we = {
        gioprojectid: 'projectId',
        giodatacollect: 'dataCollect',
        gioappid: 'domain',
        giodatasourceid: 'dataSourceId',
        gios: 'sessionId',
        giou: 'uid',
        giocs1: 'userId',
        gioid: 'gioId',
        giouserkey: 'userKey',
        gioappchannel: 'appChannel',
        giodevicebrand: 'deviceBrand',
        giodevicemodel: 'deviceModel',
        giodevicetype: 'deviceType',
        giolanguage: 'language',
        gionetworkstate: 'networkState',
        giooperatingsystem: 'operatingSystem',
        gioplatform: 'platform',
        gioplatformversion: 'platformVersion',
        gioscreenheight: 'screenHeight',
        gioscreenwidth: 'screenWidth'
    };
    const Oe = ['giodatasourceid', 'gioplatform', 'gioappchannel', 'giodevicebrand', 'giodevicemodel', 'giodevicetype', 'giolanguage', 'gionetworkstate', 'giooperatingsystem', 'gioplatformversion', 'gioscreenheight', 'gioscreenwidth'];
    const be = ['giocs1', 'gios', 'giou', 'gioid', 'giouserkey'];
    const ye = 'gio_search_cookie_gioenc';
    const Ee = {
        name: 'gioEmbeddedAdapter',
        method: class {
            constructor(e) {
                this.growingIO = e, this.main = (e) => {
                    let t;
                    const {
                        projectId: i,
                        appId: n
                    } = e; const
                        r = this.getGQS();
                    let s = !1;
                    return this.qsFrom !== 'none' && r.gioprojectid === i && r.gioappid === n && ($(r) ? this.growingIO.storage.removeItem(ye) : this.growingIO.storage.setItem(ye, ge.stringify(r)), K(r, 'giodatacollect') && (this.growingIO.vdsConfig.dataCollect = L(['true', !0], r.giodatacollect)), (t = this.growingIO.emitter) === null || void 0 === t || t.on('SDK_INITIALIZED', (() => {
                        const {
                            userStore: e,
                            vdsConfig: {
                                sessionExpires: t
                            },
                            dataStore: {
                                eventContextBuilderInst: i
                            }
                        } = this.growingIO;
                        be.forEach(((t) => {
                            let i;
                            e[we[t]] = (i = r[t]) !== null && void 0 !== i ? i : '';
                        })), window.setInterval((() => {
                            e.sessionId = r.gios;
                        }), 0.8 * t * 60 * 1e3), Oe.forEach(((e) => {
                            K(r, e) && (i.minpExtraParams[we[e]] = r[e]);
                        }));
                    })), this.growingIO.setUserId = () => {}, this.growingIO.clearUserId = () => {}, K(r, 'giodatacollect') && (this.growingIO.setDataCollect = () => {}, this.growingIO.setOption = () => {}), s = !0), this.gioURLRewrite(), s;
                }, this.getGQS = () => {
                    const {
                        hashtag: e
                    } = this.growingIO.vdsConfig; const t = this.growingIO.storage.getItem(ye); const i = window.location.search; const n = window.location.hash; const r = e ? n.substring(n.indexOf('?') + 1) : ''; const s = ge.parse(i); const o = ge.parse(r); const
                        a = ge.parse((t || '').replace('gioenc-', ''));
                    let d = {};
                    if (K(s, 'gioprojectid')) d = s, this.qsFrom = 'search';
                    else if (K(o, 'gioprojectid')) d = o, this.qsFrom = 'hash';
                    else {
                        if (!K(a, 'gioprojectid')) return this.qsFrom = 'none', {};
                        d = a, this.qsFrom = 'cookie';
                    }
                    const l = {};
                    const c = {};
                    const h = ['gioappid', 'gioprojectid', 'giodatacollect', ...be, ...Oe];
                    return V(d).forEach(((e) => {
                        const t = e.toLowerCase();
                        L(h, t) ? L(['', 'undefined', 'null', void 0, null], d[e]) || (l[t] = d[e], L(['true', 'TRUE', !0], d[e]) && (l[t] = !0), L(['false', 'FALSE', !1], d[e]) && (l[t] = !1)) : c[e] = d[e];
                    })), this.gqs = l, this.ngqs = c, l;
                }, this.gioURLRewrite = () => {
                    const {
                        hashtag: e
                    } = this.growingIO.vdsConfig;
                    let t = window.location.search;
                    let i = window.location.hash;
                    let n = !1;
                    if (this.qsFrom === 'search' && (t = ge.stringify(this.ngqs, !0), n = !0), e && this.qsFrom === 'hash' && (i = `${i.split('?')[0]}${ge.stringify(this.ngqs, !0)}`, n = !0), n) {
                        const e = `${window.location.pathname}${t || ''}${i || ''}`;
                        window.history.replaceState(null, document.title, e);
                    }
                }, this.gqs = {}, this.ngqs = {}, this.qsFrom = 'search';
            }
        }
    };
    const Se = {};
    const _e = {};
    !(function (e) {
        const t = v && v.__spreadArray || function (e, t, i) {
            if (i || arguments.length === 2) for (var n, r = 0, s = t.length; s > r; r++) !n && r in t || (n || (n = [].slice.call(t, 0, r)), n[r] = t[r]);
            return e.concat(n || [].slice.call(t));
        };
        Object.defineProperty(e, '__esModule', {
            value: !0
        }), e.GROWING_TITLE_OLD = e.GROWING_TITLE = e.GROWING_GTITLE = e.GROWING_CDP_INDEX = e.GROWING_INDEX_OLD = e.GROWING_INDEX = e.GROWING_CONTAINER = e.GROWING_TRACK = e.GROWING_IGNORE = e.VALID_CLASS_SELECTOR = e.VALID_ID_SELECTOR = e.EXCLUDE_CLASS_RE = e.UNSUPPORTED_TAGS = e.TEXT_NODE = e.UNSUPPORTED_CLICK_TAGS = e.SUPPORTED_ICON_TAGS = e.SUPPORTED_CHANGE_TYPES = e.SUPPORTED_CLICK_INPUT_TYPES = e.SUPPORTED_CONTAINER_TAGS = e.LIST_TAGS = void 0, e.LIST_TAGS = ['TR', 'LI', 'DL'], e.SUPPORTED_CONTAINER_TAGS = t(['A', 'BUTTON'], e.LIST_TAGS, !0), e.SUPPORTED_CLICK_INPUT_TYPES = ['button', 'submit', 'reset'], e.SUPPORTED_CHANGE_TYPES = ['radio', 'checkbox', 'search'], e.SUPPORTED_ICON_TAGS = ['I', 'EM', 'svg', 'IMG'], e.UNSUPPORTED_CLICK_TAGS = ['TEXTAREA', 'HTML', 'BODY'], e.TEXT_NODE = ['I', 'SPAN', 'EM', 'B', 'STRONG'], e.UNSUPPORTED_TAGS = ['tspan', 'text', 'g', 'rect', 'path', 'defs', 'clippath', 'desc', 'title', 'math', 'use'], e.EXCLUDE_CLASS_RE = /(^| |[^ ]+\-)(clear|clearfix|active|hover|enabled|current|selected|unselected|hidden|display|focus|disabled|undisabled|open|checked|unchecked|undefined|null|ng-|growing-)[^\. ]*/g, e.VALID_ID_SELECTOR = /^[a-zA-Z-\_][a-zA-Z\-\_0-9]+$/, e.VALID_CLASS_SELECTOR = /^([a-zA-Z\-\_0-9]+)$/, e.GROWING_IGNORE = 'data-growing-ignore', e.GROWING_TRACK = 'data-growing-track', e.GROWING_CONTAINER = 'data-growing-container', e.GROWING_INDEX = 'data-growing-index', e.GROWING_INDEX_OLD = 'data-growing-idx', e.GROWING_CDP_INDEX = 'data-index', e.GROWING_GTITLE = 'data-growing-title', e.GROWING_TITLE = 'data-title', e.GROWING_TITLE_OLD = 'growing-title';
    }(_e));
    const Te = {};
    const Ne = {};
    Object.defineProperty(Ne, '__esModule', {
        value: !0
    }), Ne.lastFindIndex = Ne.findIndex = Ne.arrayEquals = Ne.rmBlank = Ne.normalizePath = Ne.splitNoEmpty = Ne.filterText = void 0, Ne.filterText = function (e, t) {
        if (void 0 === t && (t = !0), e && ((e = e.replace(/[\n \t]+/g, ' ').trim()) == null ? void 0 : e.length)) return e.slice(0, t ? 50 : void 0);
    }, Ne.splitNoEmpty = function (e, t) {
        return e ? e.split(t).filter((e => !!e)) : [];
    }, Ne.normalizePath = function (e) {
        const t = e.length;
        return t > 1 && e.charAt(t - 1) === '/' ? e.slice(0, t - 1) : e;
    }, Ne.rmBlank = function (e) {
        return e ? e.replace(/[\n \t]+/g, '') : '';
    }, Ne.arrayEquals = function (e, t) {
        if (!e || !t) return !1;
        if (e.length !== t.length) return !1;
        for (let i = 0, n = e.length; n > i; i++) if (e[i] !== t[i]) return !1;
        return !0;
    }, Ne.findIndex = function (e, t) {
        if (e == null || typeof t !== 'function') return -1;
        for (let i = 0; i < e.length; i++) {
            const n = e[i];
            if (t.call(void 0, n)) return i;
        }
        return -1;
    }, Ne.lastFindIndex = function (e, t) {
        if (e == null || typeof t !== 'function') return -1;
        for (let i = e.length - 1; i >= 0; i--) {
            const n = e[i];
            if (t.call(void 0, n)) return i;
        }
        return -1;
    },
    (function (e) {
        const t = v && v.__spreadArray || function (e, t, i) {
            if (i || arguments.length === 2) for (var n, r = 0, s = t.length; s > r; r++) !n && r in t || (n || (n = [].slice.call(t, 0, r)), n[r] = t[r]);
            return e.concat(n || [].slice.call(t));
        };
        const i = v && v.__importDefault || function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        };
        Object.defineProperty(e, '__esModule', {
            value: !0
        }), e.removeDiffTagOnHeadAndTail = e.computeXpath = e.getMarkIndex = e.getEffectiveNode = e.isIgnore = e.depthInside = e.changeableInput = e.clickableInput = e.onlyContainsTextChildren = e.onlyContainsIconChildren = e.supportIconTag = e.isContainerTag = e.isListTag = e.isParentOfLeaf = e.isLeaf = e.getChildren = e.getDeepChildren = e.findParent = e.isRootNode = e.hasValidAttribute = void 0;
        const n = Ne;
        const r = _e;
        const s = i(I);
        e.hasValidAttribute = function (e, t) {
            return e instanceof Element && e.hasAttribute(t) && e.getAttribute(t) !== 'false';
        }, e.isRootNode = function (e) {
            return !e || ['BODY', 'HTML', '#document'].indexOf(e.nodeName) !== -1;
        }, e.findParent = function (t, i) {
            for (let n = t.parentNode; n && !(0, e.isRootNode)(n);) {
                if (i(n)) return n;
                n = n.parentNode;
            }
        }, e.getDeepChildren = function (i) {
            return (0, s.default)((i == null ? void 0 : i.childNodes) || []).reduce(((i, n) => (n instanceof Element ? t(t(t([], i, !0), [n], !1), (0, e.getDeepChildren)(n), !0) : i)), []);
        }, e.getChildren = function (e) {
            return (0, s.default)((e == null ? void 0 : e.childNodes) || []).filter((e => e instanceof Element));
        }, e.isLeaf = function (t) {
            return !t.hasChildNodes() || t.nodeName === 'svg' || (0, e.getChildren)(t).length === 0;
        }, e.isParentOfLeaf = function (t) {
            return !(!t.hasChildNodes() || t.nodeName === 'svg') && (0, s.default)(t.childNodes).filter((t => !(0, e.isLeaf)(t))).length === 0;
        }, e.isListTag = function (e) {
            return r.LIST_TAGS.indexOf(e.nodeName) !== -1;
        }, e.isContainerTag = function (t) {
            return (0, e.hasValidAttribute)(t, r.GROWING_CONTAINER) || r.SUPPORTED_CONTAINER_TAGS.indexOf(t.nodeName) !== -1;
        }, e.supportIconTag = function (e) {
            const t = e.nodeName;
            return r.SUPPORTED_ICON_TAGS.indexOf(t) !== -1;
        }, e.onlyContainsIconChildren = function (t) {
            if (t.textContent) return !1;
            const i = (0, e.getChildren)(t);
            if (i.length === 0) return !1;
            for (let n = 0, r = i; n < r.length; n++) {
                const s = r[n];
                if (!(0, e.supportIconTag)(s) && s.nodeName !== 'SPAN') return !1;
            }
            return !0;
        }, e.onlyContainsTextChildren = function (t) {
            return (0, e.getChildren)(t).length !== 0 && !(0, e.getDeepChildren)(t).map((e => e.tagName)).some((e => r.TEXT_NODE.indexOf(e) === -1));
        }, e.clickableInput = function (e) {
            return e instanceof HTMLInputElement && e.tagName === 'INPUT' && r.SUPPORTED_CLICK_INPUT_TYPES.indexOf(e.type) !== -1;
        }, e.changeableInput = function (e) {
            return e instanceof HTMLInputElement && e.tagName === 'INPUT' && r.SUPPORTED_CHANGE_TYPES.indexOf(e.type) !== -1;
        }, e.depthInside = function (t, i, n) {
            if (void 0 === i && (i = 4), void 0 === n && (n = 1), n > i) return !1;
            for (let r = t.tagName === 'svg' ? [] : (0, e.getChildren)(t), s = 0; s < r.length; s++) {
                const o = r[s];
                if (!(0, e.depthInside)(o, i, n + 1)) return !1;
            }
            return i >= n;
        }, e.isIgnore = function (t) {
            if (!(t instanceof Element) || (0, e.hasValidAttribute)(t, r.GROWING_IGNORE)) return !0;
            for (let i = t.parentNode; i && !(0, e.isRootNode)(i);) {
                if ((0, e.hasValidAttribute)(i, r.GROWING_IGNORE)) return !0;
                i = i.parentNode;
            }
            return !1;
        }, e.getEffectiveNode = function (t) {
            for (var i, n; t && (n = void 0, !((i = t) instanceof Element && r.UNSUPPORTED_TAGS.indexOf((n = i.tagName) === null || void 0 === n ? void 0 : n.toLowerCase()) === -1)) && t.parentNode;) t = t.parentNode;
            let s; const
                o = t.parentNode;
            return !(0, e.isRootNode)(o) && ((0, e.onlyContainsIconChildren)(o) || (s = o).tagName === 'BUTTON' && (0, e.onlyContainsTextChildren)(s)) ? o : t;
        }, e.getMarkIndex = function (e) {
            if (e instanceof Element) {
                const t = e.getAttribute(r.GROWING_INDEX) || e.getAttribute(r.GROWING_INDEX_OLD) || e.getAttribute(r.GROWING_CDP_INDEX);
                if (t) {
                    if (/^\d{1,10}$/.test(t) && +t > 0 && +t < 2147483647) return +t;
                    window.console.error('[GioNode]：标记的index不符合规范（index必须是大于0且小于2147483647的整数字）。', t);
                }
            }
        }, e.computeXpath = function (e) {
            for (var t = e.parentPaths(!0), i = Math.min(t.length, +(t.length >= 10) + 4), n = ['', '', ''], r = 0; r < t.length; r++) {
                const s = t[r].path;
                const o = t[r].name;
                n[0] = s + n[0], n[2] = '/'.concat(o) + n[2], i > r && (n[1] = s + n[1]);
            }
            return n;
        }, e.removeDiffTagOnHeadAndTail = function (e, t) {
            const i = function (e) {
                return e.nodeName === t.nodeName;
            };
            const r = (0, n.findIndex)(e, i);
            const s = (0, n.lastFindIndex)(e, i);
            return r === -1 || s === -1 ? [] : e.slice(r, s + 1);
        };
    }(Te));
    const Ce = {};
    const Ae = {};
    Object.defineProperty(Ae, '__esModule', {
        value: !0
    });
    const xe = _e;
    const Pe = Ne;
    const De = Te;

    function Re(e) {
        let t;
        if (e instanceof Element) {
            const i = e.getAttribute('name');
            if (i) return [i];
            if (e.hasAttribute('class')) {
                const n = (t = e.getAttribute('class')) === null || void 0 === t ? void 0 : t.replace(xe.EXCLUDE_CLASS_RE, '').trim();
                if (n == null ? void 0 : n.length) {
                    return n.split(/\s+/).filter((e => xe.VALID_CLASS_SELECTOR.test(e) && !e.match(/[a-z][A-Z][a-z][A-Z]/) && !e.match(/[0-9][0-9][0-9][0-9]/))).sort();
                }
            }
        }
        return [];
    }
    const Le = (function () {
        function e(e) {
            let t;
            this.node = e, this.tagName = this.node.nodeName, this.name = this.tagName.toLowerCase(), this.id = (t = this.node).id && xe.VALID_ID_SELECTOR.test(t.id) ? t.id : null, this.classList = Re(this.node), this.guessListAndIndex();
        }
        return e.prototype.guessListAndIndex = function () {
            let e; const
                t = this;
            this._tagList = (0, De.isListTag)(this.node);
            const i = (0, De.removeDiffTagOnHeadAndTail)((0, De.getChildren)(this.node.parentNode), this.node);
            if (this._tagList && (s = i.filter((e => e.tagName === t.tagName)).indexOf(this.node)) !== -1 && (this._index = s + 1), i.length >= 3 && ((e = this.classList) === null || void 0 === e ? void 0 : e.length)) {
                for (var n = 0, r = 0, s = 1; s <= i.length; s++) {
                    const o = i[s - 1];
                    if (o.tagName !== this.tagName) {
                        r = 0;
                        break;
                    }(0, Pe.arrayEquals)(this.classList, Re(o)) && (r += 1), this.node === o && (n = s);
                }
                r < 3 || (this._pseudoList = !0, this._index = this._index || n);
            }
        }, Object.defineProperty(e.prototype, 'path', {
            get() {
                let e;
                return this._path || (this._path = '/'.concat(this.name), this.id && (this._path += '#'.concat(this.id)), ((e = this.classList) === null || void 0 === e ? void 0 : e.length) && (this._path += '.'.concat(this.classList.join('.')))), this._path;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'pseudoList', {
            get() {
                return !!this._pseudoList;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'list', {
            get() {
                return !!this._tagList || !!this._pseudoList;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'index', {
            get() {
                return (0, De.getMarkIndex)(this.node) || this._index;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'container', {
            get() {
                return (0, De.isContainerTag)(this.node) || this.list;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'parent', {
            get() {
                return this.node.parentNode ? new e(this.node.parentNode) : null;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.parentPaths = function (e) {
            void 0 === e && (e = !1);
            for (var t = e ? [this] : [], i = this.parent; i && !(0, De.isRootNode)(i.node);) t.push(i), i = i.parent;
            return t;
        }, e;
    }());
    Ae.default = Le;
    const ke = {};
    Object.defineProperty(ke, '__esModule', {
        value: !0
    }), ke.getElementHref = ke.getImgHref = ke.getAnchorHref = void 0;
    const je = Ne;

    function Ue(e) {
        if (e.hasAttribute('href')) {
            const t = e.getAttribute('href');
            if (t && t.indexOf('javascript') !== 0) return (0, je.normalizePath)(t.slice(0, 320));
        }
    }

    function Ge(e) {
        if (e.src && e.src.indexOf('data:image') === -1) return e.src;
    }
    ke.getAnchorHref = Ue, ke.getImgHref = Ge, ke.getElementHref = function (e) {
        const t = e;
        if (t) {
            switch (e.nodeName.toLowerCase()) {
                case 'a':
                    return Ue(t);
                case 'img':
                    return Ge(t);
            }
        }
    };
    const qe = {};
    const He = v && v.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        };
    };
    Object.defineProperty(qe, '__esModule', {
        value: !0
    }), qe.getElementContent = qe.getFormContent = void 0;
    const Be = Te;
    const Ke = ke;
    const Ve = _e;
    const We = He(Ae);
    const Me = Ne;
    const Fe = He(I);
    const $e = function (e) {
        return e.htmlFor || e.getAttribute('for');
    };
    const Xe = function (e) {
        const t = e.getAttribute(Ve.GROWING_GTITLE) || e.getAttribute(Ve.GROWING_TITLE) || e.getAttribute(Ve.GROWING_TITLE_OLD) || e.getAttribute('title');
        return t == null ? void 0 : t.trim();
    };

    function ze(e) {
        const t = e.node;
        return e.list ? Je(t) : (0, Me.filterText)(t.textContent) || void 0;
    }

    function Je(e) {
        for (var t = void 0, i = !1, n = 0, r = (0, Fe.default)(e.childNodes); n < r.length; n++) {
            const s = r[n];
            if (s.nodeType === Node.TEXT_NODE) {
                const o = (0, Me.filterText)(s.textContent);
                if (o) return o;
            }
            if (s.nodeType === Node.ELEMENT_NODE && ['INPUT', 'SELECT'].indexOf(s.nodeName) === -1) {
                if (new We.default(s).pseudoList) return;
                i = (0, Be.onlyContainsIconChildren)(s) || (0, Be.supportIconTag)(s);
                let a = Ye(s);
                if (i) t = a, i = !1;
                else if (a || (a = Je(s)), a) return a;
            }
        }
        return t;
    }

    function Ze(e) {
        for (let t = e.getElementsByTagName('input'), i = 0, n = (0, Fe.default)(t); i < n.length; i++) {
            const r = n[i];
            if ((r.type === 'search' || r.type === 'text' && (r.id === 'q' || r.id.indexOf('search') !== -1 || r.name === 'q' || r.name.indexOf('search') !== -1)) && !(0, Be.isIgnore)(r)) {
                const s = Ye(r);
                if (s) return s;
            }
        }
    }

    function Ye(e) {
        return (function (e) {
            const t = e;
            if (t) {
                const i = Xe(t);
                if (i) return i;
                let n; let r; let s; const
                    o = new We.default(e);
                switch (e.nodeName.toLowerCase()) {
                    case 'a':
                        return (function (e) {
                            if (((0, Be.isLeaf)(e) || (0, Be.onlyContainsIconChildren)(e)) && e.textContent) {
                                const t = (0, Me.filterText)(e.textContent);
                                if (t) return t;
                            }
                            const i = (0, Ke.getAnchorHref)(e);
                            if (i) {
                                const n = i.indexOf('?');
                                return n > -1 ? i.slice(0, n) : i;
                            }
                        }(t));
                    case 'svg':
                        return (function (e) {
                            for (let t = 0, i = (0, Fe.default)(e.childNodes); t < i.length; t++) {
                                const n = i[t];
                                if (n.nodeType === Node.ELEMENT_NODE && n.tagName.toLowerCase() === 'use' && n.hasAttribute('xlink:href')) return n.getAttribute('xlink:href');
                            }
                        }(t));
                    case 'button':
                        return ((s = (r = t).name) === null || void 0 === s ? void 0 : s.length) ? r.name : (0, Me.filterText)(r.textContent) || Je(r);
                    case 'img':
                        return (function (e) {
                            if (e.alt) return e.alt;
                            const t = (0, Ke.getImgHref)(e);
                            if (t) {
                                const i = t.split('?')[0].split('/');
                                if (i.length > 0) return i[i.length - 1];
                            }
                        }(t));
                    case 'label':
                        return ze(o);
                    case 'input':
                        return (function (e) {
                            if ((0, Be.clickableInput)(e)) return e.value;
                            if (e.type !== 'password' && (0, Be.hasValidAttribute)(e, Ve.GROWING_TRACK)) return e.value;
                            if ((0, Be.changeableInput)(e)) {
                                let t = (0, Be.findParent)(e, (e => e.nodeName === 'LABEL'));
                                if (!t && e.id) {
                                    for (let i = document.body.getElementsByTagName('label'), n = 0; n < i.length; n++) {
                                        const r = i[n];
                                        if ($e(r) === e.id) {
                                            t = r;
                                            break;
                                        }
                                    }
                                }
                                if (t) {
                                    const s = ze(new We.default(t));
                                    if (s && s.length > 0) return `${s} (${e.checked})`;
                                }
                                return e.value;
                            }
                        }(t));
                    case 'select':
                        return n = t, (0, Fe.default)(n.options).filter((e => e.selected)).map((e => e.label)).join(', ') || n.value;
                    case 'form':
                        return Ze(t);
                }
                return (0, Be.isLeaf)(t) ? (function (e) {
                    const t = (0, Me.filterText)(e.textContent);
                    if (t) return t;
                }(t)) : (0, Be.isParentOfLeaf)(t) && !(0, Be.onlyContainsIconChildren)(t) ? (function (e) {
                    for (var t = '', i = 0, n = (0, Fe.default)(e.childNodes); i < n.length; i++) {
                        const r = n[i];
                        t += `${r.nodeType === Node.TEXT_NODE && r.textContent ? r.textContent.trim() : ''} `;
                    }
                    return (0, Me.filterText)(t, !1);
                }(t)) : o.container || (0, Be.onlyContainsIconChildren)(e) ? Je(t) : void 0;
            }
        }(e)) || void 0;
    }
    qe.getFormContent = Ze, qe.getElementContent = Ye;
    let Qe; const et = v && v.__extends || (Qe = function (e, t) {
        return Qe = Object.setPrototypeOf || {
            __proto__: []
        }
            instanceof Array && function (e, t) {
            e.__proto__ = t;
        } || function (e, t) {
            for (const i in t)({}).hasOwnProperty.call(t, i) && (e[i] = t[i]);
        }, Qe(e, t);
    }, function (e, t) {
        if (typeof t !== 'function' && t !== null) throw new TypeError(`Class extends value ${t} is not a constructor or null`);

        function i() {
            this.constructor = e;
        }
        Qe(e, t), e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
    });
    const tt = v && v.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        };
    };
    Object.defineProperty(Ce, '__esModule', {
        value: !0
    });
    const it = tt(Ae);
    const nt = ke;
    const rt = qe;
    const st = Te;
    const ot = (function (e) {
        function t(t) {
            const i = e.call(this, t) || this;
            i.node = t;
            const n = (0, st.computeXpath)(i);
            const r = n[0];
            const s = n[1];
            const o = n[2];
            return i.fullXpath = r, i.xpath = s, i.skeleton = o, i;
        }
        return et(t, e), Object.defineProperty(t.prototype, 'href', {
            get() {
                return (0, nt.getElementHref)(this.node);
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(t.prototype, 'content', {
            get() {
                return (0, rt.getElementContent)(this.node);
            },
            enumerable: !1,
            configurable: !0
        }), t;
    }(it.default));
    Ce.default = ot;
    var at = v && v.__assign || function () {
        return at = Object.assign || function (e) {
            for (var t, i = 1, n = arguments.length; n > i; i++) for (const r in t = arguments[i])({}).hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e;
        }, at.apply(this, arguments);
    };
    const dt = v && v.__importDefault || function (e) {
        return e && e.__esModule ? e : {
            default: e
        };
    };
    Object.defineProperty(Se, '__esModule', {
        value: !0
    });
    const lt = _e;
    const ct = Te;
    const ht = dt(Ce);
    const ut = (function () {
        function e(e, t, i) {
            void 0 === t && (t = null), void 0 === i && (i = !0), this.origin = e, this.action = t, this.direct = i, this.target = t === 'self' ? e : (0, ct.getEffectiveNode)(e), this.ignore = (0, ct.isIgnore)(this.target), this.vnode = new ht.default(this.target), this.tagName = this.vnode.tagName;
        }
        return Object.defineProperty(e.prototype, 'content', {
            get() {
                return this.vnode.content;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'href', {
            get() {
                return this.vnode.href;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'index', {
            get() {
                return this.vnode.index;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.inferParentIndex = function () {
            const t = this;
            return this.parentIndex || (0, ct.findParent)(this.target, ((i) => {
                const n = new e(i, t.action, !1);
                n.traceable() && n.index && (t.parentIndex = n.index);
            })), this.parentIndex;
        }, Object.defineProperty(e.prototype, 'xpath', {
            get() {
                return this.vnode.xpath;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'fullXpath', {
            get() {
                return this.vnode.fullXpath;
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, 'skeleton', {
            get() {
                return this.vnode.skeleton;
            },
            enumerable: !1,
            configurable: !0
        }), e.prototype.info = function (e) {
            return void 0 === e && (e = !0), e && this.inferParentIndex(), {
                skeleton: this.skeleton,
                fullXpath: this.fullXpath,
                xpath: this.xpath,
                content: this.content,
                href: this.href,
                index: this.parentIndex || this.index
            };
        }, e.prototype.traceable = function () {
            if (this.ignore) return !1;
            if (this.direct) {
                if (this.action === 'click' || this.action === 'hover') {
                    if (lt.UNSUPPORTED_CLICK_TAGS.indexOf(this.target.tagName) !== -1) return !1;
                    if (this.target.tagName === 'INPUT' && !(0, ct.clickableInput)(this.target)) return !1;
                    if (!(0, ct.isContainerTag)(this.target) && !(0, ct.depthInside)(this.target, 5)) return !1;
                }
                return !0;
            }
            return this.vnode.container;
        }, e.prototype.trackNodes = function () {
            if (!this.traceable()) return [];
            const e = [this];
            if (this.action !== 'submit') {
                for (let t = this.parentElement; t;) {
                    if (t.ignore) return [];
                    t.traceable() && e.unshift(t), t = t.parentElement;
                }
            }
            let i = void 0;
            return e.map(((e) => {
                const t = e.info(!1);
                const n = t.index;
                return !i && n && (i = n), at(at({}, t), {
                    index: i || n
                });
            }));
        }, Object.defineProperty(e.prototype, 'parentElement', {
            get() {
                const t = this.target.parentNode;
                if (t && t.nodeName && !(0, ct.isRootNode)(t)) return new e(t, this.action, !1);
            },
            enumerable: !1,
            configurable: !0
        }), e;
    }());
    const gt = Se.default = ut;
    class pt {
        constructor(e) {
            this.handler = e;
            const t = navigator.userAgent;
            const i = /chrome/i.exec(t);
            const n = /android/i.exec(t);
            this.hasTouch = 'ontouchstart' in window && !(i && !n);
        }

        main() {
            const e = this.hasTouch ? ['touchstart'] : ['mousedown'];
            const t = this.hasTouch ? ['touchend', 'touchcancel'] : ['mouseup', 'mouseleave'];
            const i = this.hasTouch ? ['touchmove'] : ['mousemove'];
            for (const t of e) Q(window, t, this.touchStartHandler.bind(this));
            for (const e of i) Q(window, e, this.touchMoveHandler.bind(this));
            for (const e of t) Q(window, e, this.touchStopHandler.bind(this));
        }

        touchStartHandler(e) {
            if (e.which > 1) return;
            const t = +Date.now();
            this.safeguard !== t && (this.touchTimeout && clearTimeout(this.touchTimeout), this.safeguard = t, this.touchEvent = {
                time: t,
                target: e.target,
                x: this._page('x', e),
                y: this._page('y', e),
                isTrusted: !0,
                type: 'click'
            });
        }

        touchMoveHandler(e) {
            const t = Math.abs(this._page('x', e) - (this.touchEvent && this.touchEvent.x) || 0);
            const i = Math.abs(this._page('y', e) - (this.touchEvent && this.touchEvent.y) || 0);
            (t > 10 || i > 10) && (this.touchEvent = null);
        }

        touchStopHandler(e) {
            const t = +Date.now() - (this.touchEvent && this.touchEvent.time) || 0;
            this.touchEvent && t < 200 ? this.touchTimeout = setTimeout((() => {
                this.handler(this.touchEvent), this.touchEvent = null;
            }), 200) : this.touchEvent && t >= 200 && t < 700 && (this.handler(this.touchEvent), this.touchEvent = null);
        }

        _page(e, t) {
            return (this.hasTouch ? t.touches[0] : t)[`page${e.toUpperCase()}`];
        }
    }
    const ft = {
        name: 'gioEventAutoTracking',
        method: class {
            constructor(e) {
                this.growingIO = e, this.main = () => {
                    Q(document, 'submit', this._handleAction), Q(document, 'change', this._handleAction);
                    const {
                        vdsConfig: e
                    } = this.growingIO;
                    e.touch ? new pt(this._handleAction).main() : Q(document, 'click', this._handleAction);
                }, this._handleAction = (e, t) => {
                    const {
                        vdsConfig: i,
                        emitter: n
                    } = this.growingIO;
                    if (!i.autotrack) return !1;
                    const r = e.target;
                    if (!r) return !1;
                    let s = new gt(r, e.type, !0).trackNodes();
                    if (e.type !== 'click' && (s = $(x(s)) ? [] : [x(s)]), $(s)) return !1;
                    n == null || n.emit('onComposeBefore', {
                        event: t,
                        params: e != null ? e : {}
                    }), s.forEach(((t) => {
                        const {
                            fullXpath: n,
                            index: r,
                            content: s,
                            href: o
                        } = t;
                        if (!q(t.fullXpath || '', '/div#__vconsole') && !q(t.fullXpath || '', '/div#__giokit') && (i.debug && console.log('Action：', e.type, Date.now()), n)) {
                            const {
                                dataStore: {
                                    eventContextBuilder: t,
                                    eventConverter: i,
                                    currentPage: a
                                }
                            } = this.growingIO;
                            i(Object.assign(Object.assign({
                                eventType: l[e.type],
                                element: [{
                                    xpath: n,
                                    index: r,
                                    textValue: s,
                                    hyperlink: o
                                }]
                            }, t()), {
                                pageShowTimestamp: a.time
                            }));
                        }
                    }));
                };
            }
        }
    };
    const mt = ['VIEW_CLICK', 'VIEW_CHANGE', 'FORM_SUBMIT', 'PAGE', 'CUSTOM', 'LOGIN_USER_ATTRIBUTES'];
    const vt = ['LOGIN_USER_ATTRIBUTES'];
    const It = {
        name: 'gioHybridAdapter',
        method: class {
            constructor(e) {
                this.growingIO = e, this.penetrateHybrid = !0, this.main = (e) => {
                    let t;
                    this.projectId = e.projectId, E(e.penetrateHybrid) && (this.penetrateHybrid = e.penetrateHybrid), this._initHybridBridge();
                    const i = this.projectId === ((t = this.hybridConfig) === null || void 0 === t ? void 0 : t.projectId);
                    if (i) {
                        const {
                            emitter: e
                        } = this.growingIO;
                        e == null || e.on(ce, (({
                            newUserId: e,
                            oldUserId: t,
                            userKey: i
                        }) => {
                            this.penetrateHybrid && (!e && t ? i ? this._clearNativeUserIdAndUserKey() : this._clearNativeUserId() : i ? this._setNativeUserIdAndUserKey(j(e), j(i)) : this._setNativeUserId(j(e)));
                        })), e == null || e.on(he, (({
                            newUserKey: e,
                            oldUserKey: t,
                            userId: i
                        }) => {
                            this.penetrateHybrid && (!e && t ? this._clearNativeUserIdAndUserKey() : this._setNativeUserIdAndUserKey(j(i), j(e)));
                        }));
                    }
                    return i;
                }, this._initHybridBridge = () => {
                    let e; let t; let
                        i;
                    this.hasHybridBridge = !!window.GrowingWebViewJavascriptBridge, this.hasHybridBridge && (((e = window === null || void 0 === window ? void 0 : window.GrowingWebViewJavascriptBridge) === null || void 0 === e ? void 0 : e.configuration) || (window.GrowingWebViewJavascriptBridge.configuration = JSON.parse(window.GrowingWebViewJavascriptBridge.getConfiguration())), ((t = window === null || void 0 === window ? void 0 : window.GrowingWebViewJavascriptBridge) === null || void 0 === t ? void 0 : t.configuration) && (this.hybridConfig = (i = window === null || void 0 === window ? void 0 : window.GrowingWebViewJavascriptBridge) === null || void 0 === i ? void 0 : i.configuration));
                }, this.onSendBefore = ({
                    requestData: e
                }) => {
                    let t; let
                        i;
                    this.hasHybridBridge && L(mt, e.eventType) && (L(vt, e.eventType) ? this.penetrateHybrid && ((t = window.GrowingWebViewJavascriptBridge) === null || void 0 === t || t.dispatchEvent(JSON.stringify(this.processAttributes(e)))) : (this.penetrateHybrid || (F(e, 'userId'), F(e, 'userKey'), F(e, 'cs1')), (i = window.GrowingWebViewJavascriptBridge) === null || void 0 === i || i.dispatchEvent(JSON.stringify(this.processAttributes(e)))));
                }, this.processAttributes = e => (W(e, ((t, i) => {
                    S(t) || N(t) ? W(e[i], ((t, n) => {
                        S(t) || N(t) ? e[i][n] = JSON.stringify(t) : e[i][n] = j(t);
                    })) : e[i] = j(t);
                })), e), this._setNativeUserId = (e) => {
                    Z((() => window.GrowingWebViewJavascriptBridge.setNativeUserId(e)));
                }, this._clearNativeUserId = () => {
                    Z((() => window.GrowingWebViewJavascriptBridge.clearNativeUserId()));
                }, this._setNativeUserIdAndUserKey = (e, t) => {
                    Z((() => window.GrowingWebViewJavascriptBridge.setNativeUserIdAndUserKey(e, t)));
                }, this._clearNativeUserIdAndUserKey = () => {
                    Z((() => window.GrowingWebViewJavascriptBridge.clearNativeUserIdAndUserKey()));
                };
            }
        }
    };
    const wt = ['i', 'span', 'em', 'b', 'strong', 'svg'];
    let Ot;
    !(function (e) {
        e[e.OUTER = 0] = 'OUTER', e[e.INNER_COVERED = 1] = 'INNER_COVERED', e[e.INNER_SHOW = 2] = 'INNER_SHOW';
    }(Ot || (Ot = {})));
    const bt = ['HR', 'BR', 'SCRIPT', 'NOSCRIPT', 'STYLE', 'HEAD', 'BASE', 'LINK', 'META', 'TITLE', 'BODY', 'HTML', 'TEMPLATE', 'CODE', ..._e.UNSUPPORTED_CLICK_TAGS];
    const yt = ['SELECT', 'A', 'BUTTON', 'INPUT', 'IMG', 'FORM'];
    const Et = (e, t, i) => document.elementFromPoint(t, i) === e;
    class St {
        constructor(e, t, i) {
            this.node = e, this.parentNodeDesc = t, this.devicesInfo = i, this.proxy = new gt(e), this.tagName = this.node.tagName, this.name = this.tagName.toLowerCase(), this.isIgnore = !!this.node.dataset.growingIgnore, this.isUnSupported = bt.indexOf(this.tagName) !== -1, this.rect = this.computeWindowRect();
        }

        info() {
            const e = this.desc();
            e.zLevel += this.devicesInfo.webviewZLevel;
            const t = this.getDeviceRect(this.rect);
            return F(e, 'isContainer'), Object.assign(Object.assign(Object.assign({}, e), t), {
                parentXPath: this.parentNodeDesc.isContainer ? this.parentNodeDesc.xpath : void 0,
                href: this.proxy.href,
                content: this.proxy.content,
                nodeType: this.nodeType()
            });
        }

        nodeType() {
            return this.name !== 'input' || Te.changeableInput(this.node) ? this.node.tagName : 'INPUT_BTN';
        }

        desc() {
            return {
                index: this.parentNodeDesc.index || this.proxy.index,
                zLevel: this.zLevel(),
                xpath: this.proxy.xpath,
                isContainer: this.isDefinedContainer()
            };
        }

        cssVisible() {
            const e = this.computedStyle();
            return Number(e.opacity) > 0 && e.visibility === 'visible' && e.display !== 'none';
        }

        viewportStatus() {
            const {
                top: e,
                left: t,
                width: i,
                height: n
            } = this.rect; const
                {
                    winWidth: r,
                    winHeight: s
                } = this.devicesInfo;
            if (i <= 0 || n <= 0) return Ot.OUTER;
            const o = this.node;
            return s > e && r > t && i > 0 && n > 0 ? Et(o, t + i / 2, e + n / 2) || Et(o, t + 1, e + 1) || Et(o, t + i - 1, e + 1) || Et(o, t + 1, e + n - 1) || Et(o, t + i - 1, e + n - 1) ? Ot.INNER_SHOW : Ot.INNER_COVERED : Ot.OUTER;
        }

        isCircleable() {
            return this.proxy.target === this.proxy.origin && (!!this.isDefinedContainer() || !(this.name === 'input' && this.node instanceof HTMLInputElement && this.node.type === 'password') && (yt.indexOf(this.name) !== -1 || (Te.isLeaf(this.node) ? !this.isBigBlank() : this.hasBackgroundImage() && Te.depthInside(this.node, 4))));
        }

        isSimpleContainer() {
            return this.name === 'select' || this.isDefaultContainer() && ((function (e, t) {
                if (e.children.length === 0) return !1;
                for (const i of k(e.children)) if (t.indexOf(i.tagName.toLowerCase()) === -1) return !1;
                return !0;
            }(this.node, wt)) || !this.node.childElementCount);
        }

        isDefinedContainer() {
            let e;
            return w(this.isContainer) ? this.isDefaultContainer() || this.isMarkContainer() || Te.isParentOfLeaf(this.node) && (!!((e = this.node.innerText) === null || void 0 === e ? void 0 : e.trim().length) || (function (e) {
                const t = e.attributes;
                if (t.length > 0) {
                    for (let e = 0; e < t.length; e++) {
                        const i = t[e].value;
                        if (i && i !== 'false') return !0;
                    }
                }
                return !1;
            }(this.node))) || this.name === 'select' : !!this.isContainer;
        }

        isDefaultContainer() {
            return _e.SUPPORTED_CONTAINER_TAGS.indexOf(this.tagName) !== -1 || Te.clickableInput(this.node);
        }

        isMarkContainer() {
            return this.node.hasAttribute('data-growing-container') || this.node.hasAttribute('growing-container');
        }

        isBigBlank() {
            let e; let
                t;
            const i = (t = (e = this.node.innerText) === null || void 0 === e ? void 0 : e.trim().length) !== null && void 0 !== t ? t : 0;
            const {
                width: n,
                height: r
            } = this.rect;
            const {
                winWidth: s,
                winHeight: o
            } = this.devicesInfo;
            return !i && (n > s >> 1 || r > o >> 1);
        }

        hasBackgroundImage() {
            const e = this.computedStyle().backgroundImage;
            return !!e && e !== 'none' && e.length > 0;
        }

        zLevel() {
            const e = this.computedStyle();
            const t = e.zIndex;
            if (t !== 'auto') return Number(t || '0') + this.parentNodeDesc.zLevel;
            switch (e.position) {
                case 'relative':
                    return this.parentNodeDesc.zLevel + 2;
                case 'sticky':
                    return this.parentNodeDesc.zLevel + 3;
                case 'absolute':
                    return this.parentNodeDesc.zLevel + 4;
                case 'fixed':
                    return this.parentNodeDesc.zLevel + 5;
                default:
                    return this.parentNodeDesc.zLevel + 1;
            }
        }

        computeWindowRect() {
            if (this.rect) return this.rect;
            const e = this.node.getBoundingClientRect();
            const t = e.top;
            const i = e.bottom;
            const n = e.left;
            let r = e.right - n;
            let s = i - t;
            return t < 0 ? s = t + s : t + s > this.devicesInfo.winHeight && (s = this.devicesInfo.winHeight - t), n < 0 ? r = n + r : n + r > this.devicesInfo.winWidth && (r = this.devicesInfo.winWidth - n), this.rect = {
                top: t,
                left: n,
                width: r,
                height: s
            }, this.rect;
        }

        computedStyle() {
            return window.getComputedStyle(this.node);
        }

        getDeviceRect(e) {
            const {
                scale: t,
                webviewTop: i,
                webviewLeft: n
            } = this.devicesInfo;
            return {
                top: e.top * t + i,
                left: e.left * t + n,
                width: e.width * t,
                height: e.height * t
            };
        }
    }
    const _t = ['DOMContentLoaded', 'onreadystatechange'];
    const Tt = ['scroll', 'resize', 'load', 'beforeunload', 'popstate', 'hashchange', 'pagehide', 'unload'];
    class Nt {
        constructor(e) {
            this.growingIO = e, this.addDomChangeListener();
        }

        getDomTree(e, t, i, n, r, s) {
            const o = (function (e, t, i, n, r) {
                const s = document.documentElement.clientWidth;
                return {
                    winWidth: s,
                    winHeight: document.documentElement.clientHeight,
                    scale: i / s,
                    webviewTop: t,
                    webviewLeft: e,
                    webviewWidth: i,
                    webviewHeight: n,
                    webviewZLevel: r
                };
            }(e, t, i, n, r));
            const a = this.getElementsByParent(s || document.body, {
                isContainer: !1,
                zLevel: 0
            }, o);
            const {
                domain: d,
                path: l,
                query: c,
                title: h
            } = this.growingIO.dataStore.currentPage;
            return {
                page: {
                    domain: d,
                    path: l,
                    query: c,
                    title: h
                },
                elements: a
            };
        }

        getElementsByParent(e, t, i) {
            const n = [];
            return [].slice.call(e.childNodes, 0).filter((e => e.nodeType === 1)).forEach(((e) => {
                const r = new St(e, t, i);
                if (r.cssVisible() && !r.isIgnore) {
                    switch (r.viewportStatus()) {
                        case Ot.INNER_SHOW:
                            r.isCircleable() && n.push(r.info());
                            break;
                        case Ot.INNER_COVERED:
                            r.isDefaultContainer() && n.push(r.info());
                    }
                    r.isSimpleContainer() || [].push.apply(n, this.getElementsByParent(e, r.desc(), i));
                }
            })), n;
        }

        addDomChangeListener() {
            let e;
            const t = (t = '') => () => {
                let i;
                t === 'beforeunload' && e && e.disconnect(), (i = window.GrowingWebViewJavascriptBridge) === null || void 0 === i || i.onDomChanged();
            };
            e = new MutationObserver(t('mutation')), e.observe(document.body, {
                attributes: !0,
                characterData: !0,
                childList: !0,
                subtree: !0
            }), _t.forEach(((e) => {
                Q(document, e, t(e));
            })), Tt.forEach(((e) => {
                Q(window, e, t(e));
            }));
        }
    }
    class Ct {
        constructor(e) {
            let t;
            this.growingIO = e, (t = this.growingIO.emitter) === null || void 0 === t || t.on(le, (() => {
                if (window.GrowingWebViewJavascriptBridge) {
                    const e = this;
                    window.GrowingWebViewJavascriptBridge.getDomTree = function () {
                        if (arguments.length >= 4) return Ct.bindGetDomTree(e.growingIO), Ct.domHelper.getDomTree.apply(Ct.domHelper, arguments);
                    };
                }
            }));
        }

        static bindGetDomTree(e) {
            this.domHelper || (this.domHelper = new Nt(e), window.GrowingWebViewJavascriptBridge.getDomTree = this.domHelper.getDomTree.bind(this.domHelper));
        }
    }
    const At = {
        name: 'gioHybridCircle',
        method: Ct
    };

    function xt(e) {
        for (let t = 1; arguments.length > t; t++) {
            const i = arguments[t];
            for (const n in i) e[n] = i[n];
        }
        return e;
    }
    const Pt = (function e(t, i) {
        function n(e, n, r) {
            if (typeof document !== 'undefined') {
                typeof (r = xt({}, i, r)).expires === 'number' && (r.expires = new Date(Date.now() + 864e5 * r.expires)), r.expires && (r.expires = r.expires.toUTCString()), e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                let s = '';
                for (const o in r) r[o] && (s += `; ${o}`, !0 !== r[o] && (s += `=${r[o].split(';')[0]}`));
                return document.cookie = `${e}=${t.write(n, e)}${s}`;
            }
        }
        return Object.create({
            set: n,
            get(e) {
                if (typeof document !== 'undefined' && (!arguments.length || e)) {
                    for (var i = document.cookie ? document.cookie.split('; ') : [], n = {}, r = 0; r < i.length; r++) {
                        const s = i[r].split('=');
                        const o = s.slice(1).join('=');
                        try {
                            const a = decodeURIComponent(s[0]);
                            if (n[a] = t.read(o, a), e === a) break;
                        } catch (e) {}
                    }
                    return e ? n[e] : n;
                }
            },
            remove(e, t) {
                n(e, '', xt({}, t, {
                    expires: -1
                }));
            },
            withAttributes(t) {
                return e(this.converter, xt({}, this.attributes, t));
            },
            withConverter(t) {
                return e(xt({}, this.converter, t), this.attributes);
            }
        }, {
            attributes: {
                value: Object.freeze(i)
            },
            converter: {
                value: Object.freeze(t)
            }
        });
    }({
        read(e) {
            return e[0] === '"' && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
        },
        write(e) {
            return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
        }
    }, {
        path: '/'
    }));
    const Dt = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ((e) => {
        const t = 16 * Math.random() | 0;
        return (e === 'x' ? t : 3 & t | 8).toString(16);
    }));
    const Rt = () => {
        let e;
        const t = !!((e = window === null || void 0 === window ? void 0 : window.navigator) === null || void 0 === e ? void 0 : e.sendBeacon);
        const i = window.navigator.userAgent;
        if (i.match(/(iPad|iPhone|iPod)/g)) {
            const e = Lt(i);
            return t && e > 13;
        }
        return t;
    };
    const Lt = (e) => {
        const t = e.toLowerCase().match(/cpu.*os (.*?) like mac os/i);
        return !t || t.length < 2 ? 0 : +t[1].split('_').slice(0, 2).join('.');
    };
    const kt = (e) => {
        Pt.set('gioCookie', 'yes', {
            domain: e
        });
        const t = !!Pt.get('gioCookie', {
            domain: e
        });
        return Pt.remove('gioCookie', {
            domain: e
        }), t;
    };
    const jt = e => (H(e, '_gioenc') ? e.slice(0, -7) : e);
    const Ut = e => y(Number(e)) && Z((() => JSON.parse(e))) || e;
    const Gt = {
        name: 'gioImpressionTracking',
        method: class {
            constructor(e) {
                let t;
                this.growingIO = e, this.documentReady = !1, this.main = (e) => {
                    e === 'listener' ? (this.documentReady = !0, this.growingIO.gioSDKInitialized && this.initMutationObserver()) : e === 'emitter' && this.documentReady && this.initMutationObserver();
                }, this.initIntersectionObserver = () => {
                    this.intersectionObserver = new IntersectionObserver(((e) => {
                        $(e) || e.map(((e) => {
                            const {
                                dataset: t
                            } = e.target;
                            if (e.intersectionRatio > 0) {
                                const {
                                    eventId: e,
                                    properties: i,
                                    items: n
                                } = this.getImpressionProperties(t); const
                                    r = t.id;
                                if (r) {
                                    if (t.gioImpType === 'once' && K(this.sentImps, r)) return;
                                    this.sentImps[r] = {
                                        eventId: e,
                                        properties: i,
                                        items: n
                                    };
                                }
                                e && this.growingIO.track(e, i, n);
                            }
                        }));
                    }));
                }, this.initMutationObserver = () => {
                    if (this.mutationObserver) return !1;
                    const e = document.querySelectorAll('[data-gio-imp-track]');
                    k(e).map(((e) => {
                        let t;
                        (t = this.intersectionObserver) === null || void 0 === t || t.observe(e);
                    })), this.mutationObserver = new MutationObserver((e => e.map(((e) => {
                        let t;
                        if (e.type === 'attributes') {
                            const {
                                dataset: i
                            } = e.target;
                            if (i.gioImpTrack) return (t = this.intersectionObserver) === null || void 0 === t ? void 0 : t.observe(e.target);
                        }
                    })))), this.mutationObserver.observe(document.body, {
                        attributes: !0,
                        childList: !0,
                        subtree: !0,
                        attributeOldValue: !0,
                        attributeFilter: ['data-gio-imp-track', 'data-gio-imp-attrs', 'data-gio-imp-items', /^data-gio-track-[a-z]+$/i]
                    });
                }, this.getImpressionProperties = (e) => {
                    let t = {
                        eventId: void 0,
                        properties: {}
                    };
                    if (!(e == null ? void 0 : e.gioImpTrack)) return t;
                    if (t.eventId = e.gioImpTrack, K(e, 'gioImpAttrs')) t.properties = Z((() => (S(e.gioImpAttrs) ? e.gioImpAttrs : JSON.parse(e.gioImpAttrs)))), t.items = Z((() => (S(e.gioImpItems) ? e.gioImpItems : JSON.parse(e.gioImpItems))));
                    else {
                        const i = /^gioTrack(.+)/;
                        for (const n in e) {
                            let r;
                            const s = n.match(i);
                            s && (r = G(s[1]), r !== 'track' && (t.properties[r] = e[n]));
                        }
                    }
                    return t.properties = Y(t.properties), t.items = Y(t.items), /^\w+$/.test(t.eventId) && !Number.isInteger(Number(A(t.eventId.split('')))) || (t.eventId = null, t = {}), t;
                }, this.sentImps = {}, window.ActiveXObject || 'ActiveXObject' in window || navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1 || navigator.userAgent.indexOf('Trident') > -1 && navigator.userAgent.indexOf('rv:11.0') > -1 ? J('IE浏览器不支持半自动埋点，gioImpressionTracking已自动关闭！', 'warn') : (this.initIntersectionObserver(), Q(document, 'readystatechange', (() => {
                    L(['interactive', 'complete'], document.readyState) && this.main('listener');
                }), {
                    once: !0
                }), (t = this.growingIO.emitter) === null || void 0 === t || t.on(le, (() => this.main('emitter'))), Q(window, 'unload', (() => {
                    this.intersectionObserver.disconnect(), this.mutationObserver.disconnect();
                })));
            }
        }
    };
    const qt = {
        name: 'gioWebCircle',
        method: class {
            constructor(e) {
                let t;
                this.growingIO = e, this.injectCircle = (e, t) => {
                    const i = document.createElement('link');
                    const n = document.createElement('script');
                    i.rel = 'stylesheet', i.href = e, n.src = t, document.head.appendChild(i), document.head.appendChild(n);
                }, (t = this.growingIO.emitter) === null || void 0 === t || t.on(le, (() => {
                    window.addEventListener('message', ((e) => {
                        const {
                            data: t,
                            source: i
                        } = e; const
                            n = window.vds;
                        if (t && i) {
                            const e = i.vds;
                            const r = t.cssURL;
                            const s = t.jsURL;
                            e && t.type === 'SDK_INJECT_CIRCLE_SCRIPT' && n.projectId === e.projectId && n.dataSourceId === e.dataSourceId && this.injectCircle(r, s);
                        }
                    }));
                }));
            }
        }
    };
    const Ht = ['gioPerformance'];
    class Bt {
        constructor(e) {
            let t; let i; let n; let
                r;
            this.growingIO = e, this.innerPluginInit = () => {
                let e;
                Ht.forEach(((e) => {
                    let t;
                    return F((t = this.pluginsContext) === null || void 0 === t ? void 0 : t.plugins, e);
                })), V((e = this.pluginsContext) === null || void 0 === e ? void 0 : e.plugins).forEach(((e) => {
                    let t;
                    const {
                        name: i,
                        method: n
                    } = (t = this.pluginsContext) === null || void 0 === t ? void 0 : t.plugins[e];
                    R(this.pluginItems, (e => e.name === i)) || this.pluginItems.push({
                        name: G(i || e),
                        method: n || ((e) => {})
                    });
                })), $(this.pluginItems) || this.installAll();
            }, this.install = (e, t, i) => {
                let n; let
                    r;
                const s = t || R(this.pluginItems, (t => t.name === e));
                if (((n = this.growingIO) === null || void 0 === n ? void 0 : n.plugins)[e]) return J(`重复加载插件 ${e} 或插件重名，已跳过加载!`, 'warn'), !1;
                if (!s) return J(`插件加载失败!不存在名为 ${e} 的插件!`, 'error'), !1;
                try {
                    return ((r = this.growingIO) === null || void 0 === r ? void 0 : r.plugins)[e] = new s.method(this.growingIO, i), this.growingIO.gioEnvironment === 'cdp' && t && J(`加载插件：${e}`, 'info'), !0;
                } catch (e) {
                    return J(`插件加载异常：${e}`, 'error'), !1;
                }
            }, this.installAll = (e) => {
                (e || this.pluginItems).forEach((t => this.install(t.name, e ? t : void 0, e ? t == null ? void 0 : t.options : void 0)));
            }, this.uninstall = (e) => {
                let t;
                F(this.pluginItems, e);
                const i = F((t = this.growingIO) === null || void 0 === t ? void 0 : t.plugins, e);
                return i || J(`卸载插件 ${e} 失败!`, 'error'), i;
            }, this.uninstallAll = () => {
                this.pluginItems.forEach((e => this.uninstall(e.name)));
            }, this.lifeError = (e, t) => J(`插件执行错误 ${e.name} ${t}`, 'error'), this.onComposeBefore = (e) => {
                this.pluginItems.forEach(((t) => {
                    let i;
                    const n = (i = this.growingIO.plugins[t.name]) === null || void 0 === i ? void 0 : i.onComposeBefore;
                    if (n && T(n)) {
                        try {
                            n(e);
                        } catch (e) {
                            this.lifeError(t, e);
                        }
                    }
                }));
            }, this.onComposeAfter = (e) => {
                this.pluginItems.forEach(((t) => {
                    let i;
                    const n = (i = this.growingIO.plugins[t.name]) === null || void 0 === i ? void 0 : i.onComposeAfter;
                    if (n && T(n)) {
                        try {
                            n(e);
                        } catch (e) {
                            this.lifeError(t, e);
                        }
                    }
                }));
            }, this.onSendBefore = (e) => {
                this.pluginItems.forEach(((t) => {
                    let i;
                    const n = (i = this.growingIO.plugins[t.name]) === null || void 0 === i ? void 0 : i.onSendBefore;
                    if (n && T(n)) {
                        try {
                            n(e);
                        } catch (e) {
                            this.lifeError(t, e);
                        }
                    }
                }));
            }, this.onSendAfter = (e) => {
                this.pluginItems.forEach(((t) => {
                    let i;
                    const n = (i = this.growingIO.plugins[t.name]) === null || void 0 === i ? void 0 : i.onSendAfter;
                    if (n && T(n)) {
                        try {
                            n(e);
                        } catch (e) {
                            this.lifeError(t, e);
                        }
                    }
                }));
            }, this.pluginsContext = {
                plugins: {}
            }, this.pluginItems = [], (t = this.growingIO.emitter) === null || void 0 === t || t.on('onComposeBefore', this.onComposeBefore), (i = this.growingIO.emitter) === null || void 0 === i || i.on('onComposeAfter', this.onComposeAfter), (n = this.growingIO.emitter) === null || void 0 === n || n.on('onSendBefore', this.onSendBefore), (r = this.growingIO.emitter) === null || void 0 === r || r.on('onSendAfter', this.onSendAfter);
        }
    }
    class Kt extends Bt {
        constructor(e) {
            super(e), this.growingIO = e, this.growingIO.gioSDKFull = !0, this.pluginsContext = {
                plugins: {
                    gioCompress: ve,
                    gioCustomTracking: Ie,
                    gioEmbeddedAdapter: Ee,
                    gioEventAutoTracking: ft,
                    gioHybridAdapter: It,
                    gioHybridCircle: At,
                    gioImpressionTracking: Gt,
                    gioWebCircle: qt
                }
            };
        }
    }
    const Vt = {
        A: 1,
        a: 1,
        Z: 1,
        z: 1,
        '@': 1,
        '{': 1
    };
    const Wt = e => (w(e) ? e : Z((() => `gioenc-${Ft(e)}`)) || e);
    const Mt = e => O(e) && q(e, 'gioenc-') && Z((() => Ft(e.replace('gioenc-', '')))) || e;
    const Ft = e => (e = e || '').split('').map((e => (Vt[e] ? e : $t(e)))).join('');
    const $t = (e) => {
        if (/[0-9]/.test(e)) return 1 ^ +e; {
            const t = e.charCodeAt(0);
            return String.fromCharCode(1 ^ t);
        }
    };
    class Xt {
        constructor() {
            this.getItem = (e) => {
                const t = Z((() => JSON.parse(localStorage.getItem(jt(e)) || ''))) || {};
                return S(t) && t.expiredAt > +Date.now() ? Ut(Mt(t.value)) : void 0;
            }, this.setItem = (e, t, i) => {
                const n = i != null ? i : +new Date(9999, 12);
                localStorage.setItem(jt(e), JSON.stringify({
                    value: O(t) && t.length && H(e, '_gioenc') ? Wt(t) : t,
                    expiredAt: n
                }));
            }, this.removeItem = e => localStorage.removeItem(jt(e)), this.hasItem = e => !!localStorage.getItem(jt(e)), this.getKeys = () => k(Array(localStorage.length)).map(((e, t) => localStorage.key(t))), this.type = 'localStorage';
        }
    }
    const zt = {};
    let Jt;
    const Zt = (() => {
        const e = window.location.hostname;
        const t = Z((() => {
            const t = e.split('.');
            const i = x(t);
            if (e !== 'localhost' && (y(Number(i)) || Number(i) < 0 || Number(i) > 255)) return [`.${t.slice(-2).join('.')}`, `.${t.slice(-3).join('.')}`];
        })) || [e];
        let i = '';
        return t.some((e => !!kt(e) && (i = e, !0))), i;
    })();
    Jt = !L(['', 'localhost', '127.0.0.1'], window.location.hostname) && L(['http:', 'https:'], window.location.protocol) && Zt ? new class {
        constructor(e) {
            this.domain = e, this.getItem = e => Ut(Mt(Pt.get(jt(e)))), this.setItem = (e, t, i) => {
                let n;
                n = O(t) ? t.length ? H(e, '_gioenc') ? Wt(t) : t : '' : JSON.stringify(t), Pt.set(jt(e), n, {
                    expires: i ? new Date(i) : 3650,
                    domain: this.domain
                });
            }, this.removeItem = (e) => {
                Pt.remove(jt(e), {
                    domain: this.domain
                });
            }, this.hasItem = e => L(V(Pt.get()), jt(e)), this.getKeys = () => V(Pt.get()), this.type = 'Cookie';
        }
    }(Zt) : ((e) => {
        try {
            const e = window.localStorage;
            const t = '__storage_test__';
            return e.setItem(t, t), e.removeItem(t), !0;
        } catch (e) {
            return !1;
        }
    })() ? new Xt() : new class {
            constructor() {
                this.getItem = (e) => {
                    const t = Z((() => JSON.parse(zt[jt(e)] || '')));
                    return S(t) && t.expiredAt > +Date.now() ? Ut(Mt(t.value)) : void 0;
                }, this.setItem = (e, t, i) => {
                    const n = i != null ? i : +new Date(9999, 12);
                    zt[jt(e)] = JSON.stringify({
                        value: O(t) && t.length ? Wt(t) : t,
                        expiredAt: n
                    });
                }, this.removeItem = e => F(zt, jt(e)), this.hasItem = e => K(zt, jt(e)), this.getKeys = () => V(zt), this.type = 'memory';
            }
        }();
    const Yt = Jt;
    class Qt {
        constructor() {
            let e;
            this.trackingId = 'g0', this.init = (e) => {
                let t; let i; let n; let r; let s; let
                    o;
                J('Gio Web SDK 初始化中...', 'info');
                const {
                    initOptions: a,
                    currentPage: d,
                    sendVisit: l,
                    sendPage: c
                } = this.dataStore;
                a(e), this.useEmbeddedInherit = (i = (t = this.plugins) === null || void 0 === t ? void 0 : t.gioEmbeddedAdapter) === null || void 0 === i ? void 0 : i.main(e), this.useHybridInherit = (r = (n = this.plugins) === null || void 0 === n ? void 0 : n.gioHybridAdapter) === null || void 0 === r ? void 0 : r.main(e), this == null || this.initCallback(), d.hookHistory(), d.parsePage(), (s = this.emitter) === null || void 0 === s || s.emit(le, this), J('Gio Web SDK 初始化完成！', 'success'), this.useEmbeddedInherit || l(), c(), this.gioSDKInitialized = !0, this.vdsConfig.gioSDKInitialized = !0, window[this.vds] = this.vdsConfig, (o = this.emitter) === null || void 0 === o || o.emit('SDK_INITIALIZED_COMPLATE', this);
            }, this.setOption = (e, t) => {
                if (L(s, e)) {
                    const i = this.dataStore.setOption(e, t);
                    return i && o[e] && J(`已${t ? '开启' : '关闭'}${o[e]}`, 'info'), i;
                }
                return J(`不存在可修改的配置项：${e}，请检查后重试!`, 'warn'), !1;
            }, this.getOption = e => this.dataStore.getOption(e), this.setGeneralProps = (e) => {
                S(e) && !$(e) ? (this.dataStore.generalProps = Object.assign(Object.assign({}, this.dataStore.generalProps), e), V(this.dataStore.generalProps).forEach(((e) => {
                    L([void 0, null], this.dataStore.generalProps[e]) && (this.dataStore.generalProps[e] = '');
                }))) : this.callError('setGeneralProps');
            }, this.clearGeneralProps = (e) => {
                N(e) && !$(e) ? e.forEach(((e) => {
                    F(this.dataStore.generalProps, e);
                })) : this.dataStore.generalProps = {};
            }, this.reissuePage = () => {
                this.dataStore.sendPage();
            }, this.notRecommended = () => J("不推荐的方法使用，建议使用 gio('setOption', [optionName], [value])!", 'info'), this.callError = (e, t = !0, i = '参数不合法') => J(`${t ? '调用' : '设置'} ${e} 失败，${i}!`, 'warn'), this.gioEnvironment = 'cdp', this.sdkVersion = '3.8.3', this.vds = window.gioCompatibilityVds ? 'gdp_vds' : 'vds', this.utils = Object.assign(Object.assign(Object.assign({}, z), te), {
                qs: ge
            }), this.emitter = {
                all: e = e || new Map(),
                on(t, i) {
                    const n = e.get(t);
                    n ? n.push(i) : e.set(t, [i]);
                },
                off(t, i) {
                    const n = e.get(t);
                    n && (i ? n.splice(n.indexOf(i) >>> 0, 1) : e.set(t, []));
                },
                emit(t, i) {
                    let n = e.get(t);
                    n && n.slice().map(((e) => {
                        e(i);
                    })), (n = e.get('*')) && n.slice().map(((e) => {
                        e(t, i);
                    }));
                }
            }, this.gioSDKInitialized = !1, this.storage = Yt, this.plugins = new Kt(this), this.plugins.innerPluginInit();
        }
    }
    class ei {
        constructor(e) {
            let t;
            this.growingIO = e;
            const {
                projectId: i
            } = this.growingIO.vdsConfig; const
                {
                    getItem: n,
                    setItem: r,
                    getKeys: s,
                    removeItem: o
                } = this.growingIO.storage;
            this.getItem = n, this.setItem = r, this.getKeys = s, this.removeItem = o, this.sIdStorageName = `${i}_gdp_session_id`, this.uidStorageName = 'gdp_user_id_gioenc', this.userIdStorageName = `${i}_gdp_cs1_gioenc`, this.userKeyStorageName = `${i}_gdp_user_key_gioenc`, this.gioIdStorageName = `${i}_gdp_gio_id_gioenc`, (t = this.growingIO.emitter) === null || void 0 === t || t.on(ue, (() => {
                this.growingIO.gioSDKInitialized && (this.growingIO.dataStore.sendVisit(!0), this.growingIO.dataStore.sendPage(!0));
            }));
        }

        get sessionId() {
            return this.getItem(this.sIdStorageName) || (this.sessionId = Dt(), this.sessionId);
        }

        set sessionId(e) {
            let t;
            e || (e = Dt());
            const i = this.getItem(this.sIdStorageName) || this.prevSessionId;
            const {
                sessionExpires: n = 30
            } = this.growingIO.vdsConfig;
            this.setItem(this.sIdStorageName, e, +Date.now() + 60 * n * 1e3), i !== e && (this.getKeys().filter((e => /.+_gdp_session_id_.+/.test(e))).forEach(((e) => {
                this.removeItem(e);
            })), (t = this.growingIO.emitter) === null || void 0 === t || t.emit(ue, {
                newSessionId: e,
                oldSessionId: i
            })), this.prevSessionId = e;
        }

        get uid() {
            return this.getItem(this.uidStorageName) || (this.uid = Dt(), this.uid);
        }

        set uid(e) {
            let t;
            const i = this.getItem(this.uidStorageName) || this.prevUId;
            this.setItem(this.uidStorageName, e), i !== e && ((t = this.growingIO.emitter) === null || void 0 === t || t.emit('UID_UPDATE', {
                newUId: e,
                oldUId: i
            })), this.prevUId = e;
        }

        get userId() {
            return this.getItem(this.userIdStorageName) || '';
        }

        set userId(e) {
            let t;
            const i = this.getItem(this.userIdStorageName) || this.prevUserId;
            this.setItem(this.userIdStorageName, e), i !== e && ((t = this.growingIO.emitter) === null || void 0 === t || t.emit(ce, {
                newUserId: e,
                oldUserId: i,
                userKey: this.userKey
            })), e && (this.gioId = e), this.prevUserId = e;
        }

        get userKey() {
            return this.getItem(this.userKeyStorageName) || '';
        }

        set userKey(e) {
            let t;
            const i = this.getItem(this.userKeyStorageName) || this.prevUserKey;
            this.setItem(this.userKeyStorageName, e), i !== e && ((t = this.growingIO.emitter) === null || void 0 === t || t.emit(he, {
                newUserKey: e,
                oldUserKey: i,
                userId: this.userId
            })), this.prevUserKey = e;
        }

        get gioId() {
            return this.getItem(this.gioIdStorageName) || '';
        }

        set gioId(e) {
            let t;
            const i = this.getItem(this.gioIdStorageName) || this.prevGioId;
            this.setItem(this.gioIdStorageName, e), i !== e && ((t = this.growingIO.emitter) === null || void 0 === t || t.emit('GIOID_UPDATE', {
                newGioId: e,
                oldGioId: i
            })), this.prevGioId = e;
        }
    }
    class ti {
        constructor(e) {
            this.growingIO = e, this.main = () => {
                let e;
                const {
                    sdkVersion: t,
                    useEmbeddedInherit: i,
                    vdsConfig: n,
                    userStore: r,
                    dataStore: s,
                    trackingId: o
                } = this.growingIO; const
                    {
                        path: a,
                        query: d
                    } = s.currentPage;
                const l = {
                    appVersion: n.version,
                    dataSourceId: n.dataSourceId,
                    deviceId: r.uid,
                    domain: i ? n.appId : window.location.host,
                    gioId: r.gioId,
                    language: navigator.language,
                    path: a,
                    platform: n.platform,
                    query: d,
                    referralPage: ((e = s.lastPageEvent) === null || void 0 === e ? void 0 : e.referralPage) || '',
                    screenHeight: window.screen.height,
                    screenWidth: window.screen.width,
                    sdkVersion: t,
                    sessionId: r.sessionId,
                    timestamp: +Date.now(),
                    title: document.title.slice(0, 255),
                    userId: r.userId
                };
                if (n.enableIdMapping && (l.userKey = r.userKey), $(n.ignoreFields) || n.ignoreFields.forEach(((e) => {
                    F(l, e);
                })), i && !$(this.minpExtraParams)) {
                    const e = Object.assign({}, l);
                    W(Object.assign(Object.assign({}, l), this.minpExtraParams), ((t, i) => {
                        let r;
                        L(n.embeddedIgnore, i) ? (l[i] = e[i], i === 'domain' && (l[i] = window.location.host)) : l[i] = (r = this.minpExtraParams[i]) !== null && void 0 !== r ? r : l[i];
                    }));
                }
                return l.trackingId = o, l;
            }, this.minpExtraParams = {};
        }
    }
    class ii {
        constructor(e) {
            this.growingIO = e, this.parsePage = () => {
                const {
                    hashtag: e
                } = this.growingIO.vdsConfig; const t = location.pathname; const i = location.search; const n = location.hash; const
                    r = n.indexOf('?');
                this.domain = window.location.host, this.title = document.title.slice(0, 255), this.time = +Date.now(), this.path = t, this.query = i, e && (r > -1 ? (this.path += n.slice(0, r), this.query = `${this.query}&${n.slice(r + 1)}`) : this.path += n), this.query && L(['?', '&'], this.query.charAt(0)) && (this.query = this.query.slice(1));
            }, this._getNoHashHref = () => {
                const {
                    protocol: e,
                    host: t,
                    pathname: i,
                    search: n
                } = window.location;
                return `${e}://${t}${i}${n}`;
            }, this.pageListener = () => {
                const {
                    hashtag: e
                } = this.growingIO.vdsConfig;
                let t = window.location.href;
                let i = this.lastHref;
                e || (t = this._getNoHashHref(), i = this.lastNoHashHref), i !== t && (this.parsePage(), this.buildPageEvent());
            }, this.hookHistory = () => {
                const e = window.history.pushState;
                const t = window.history.replaceState;
                const i = this;
                e && Z((() => window.history.pushState = function () {
                    e.apply(window.history, arguments), setTimeout(i.pageListener);
                })), t && Z((() => window.history.replaceState = function () {
                    t.apply(window.history, arguments), setTimeout(i.pageListener);
                })), Q(window, 'popstate', this.pageListener);
                const {
                    hashtag: n
                } = this.growingIO.vdsConfig;
                n && Q(window, 'hashchange', this.pageListener);
            }, this.buildPageEvent = (e) => {
                const {
                    dataStore: {
                        lastPageEvent: t,
                        eventContextBuilder: i,
                        eventConverter: n
                    }
                } = this.growingIO;
                let r = Object.assign(Object.assign({
                    eventType: 'PAGE'
                }, i()), {
                    protocolType: location.protocol.substring(0, location.protocol.length - 1),
                    referralPage: (t == null ? void 0 : t.path) === this.path && (t == null ? void 0 : t.query) === this.query ? t == null ? void 0 : t.referralPage : (t == null ? void 0 : t.path) ? this.lastHref : document.referrer
                });
                $(e) || (r = Object.assign(Object.assign({}, r), e)), r.timestamp = this.time, n(r), this.lastHref = window.location.href, this.lastNoHashHref = this._getNoHashHref(), this.lastLocation = Object.assign({}, window.location);
            }, this.title = document.title.slice(0, 255), this.lastLocation = Object.assign({}, window.location);
        }
    }
    const ni = {
        referralPage: document.referrer
    };
    class ri {
        constructor(r) {
            let a; let
                l;
            this.growingIO = r, this.ALLOW_SETTING = Object.assign(Object.assign({}, t), this.growingIO.gioEnvironment === 'saas' ? n : i), this.allowOptKeys = Object.keys(this.ALLOW_SETTING), this.trackTimers = {}, this.initStorageId = () => {
                const e = this.growingIO.storage.getItem(this.seqStorageIdName) || {};
                let t = Object.assign({}, e);
                F(t, 'globalKey'), t = S(t) && !w(t) ? t : {}, this._esid = {}, V(t).forEach(((e) => {
                    this._esid[e] = y(Number(t[e])) || t[e] >= 1e9 || t[e] < 1 ? 1 : t[e];
                })), M(t, this._esid) || this.setSequenceIds('esid', this._esid);
                const i = Number(e.globalKey);
                this._gsid = y(i) || i >= 1e9 || i < 1 ? 1 : i, i !== this._gsid && this.setSequenceIds('gsid', this._gsid);
            }, this.setSequenceIds = (e, t) => {
                let i = this.growingIO.storage.getItem(this.seqStorageIdName) || {};
                e === 'gsid' ? i.globalKey = t : i = Object.assign(Object.assign({}, i), t), this.growingIO.storage.setItem(this.seqStorageIdName, i);
            }, this.initOptions = (t) => {
                let i; let n; let r; let s; let a; let l; let
                    c;
                const {
                    projectId: h,
                    dataSourceId: u,
                    appId: g
                } = t;
                this.initialDataSourceId = u;
                const p = {};
                this.allowOptKeys.forEach(((i) => {
                    const n = this.ALLOW_SETTING[i].type;
                    let r = N(n) ? !L(n, X(t[i])) : X(t[i]) !== n;
                    i !== 'platform' || L(e, t[i]) || (r = !0), r ? p[i] = this.ALLOW_SETTING[i].default : i === 'ignoreFields' ? p.ignoreFields = t.ignoreFields.filter((e => L(d, e))) : (p[i] = t[i], L(['dataCollect', 'autotrack'], i) && (p[i] || J(`已关闭${o[i]}`, 'info')));
                })), p.sessionExpires = Math.round(p.sessionExpires), (y(p.sessionExpires) || p.sessionExpires < 1 || p.sessionExpires > 360) && (p.sessionExpires = 30), this.growingIO.storage.type === 'Cookie' && p.cookieDomain && kt(p.cookieDomain) && (this.growingIO.storage.domain = p.cookieDomain), this.growingIO.vdsConfig = Object.assign(Object.assign(Object.assign({}, (i = window.vds) !== null && void 0 !== i ? i : {}), p), {
                    projectId: h,
                    dataSourceId: u,
                    appId: g,
                    performance: {
                        monitor: (r = (n = p.performance) === null || void 0 === n ? void 0 : n.monitor) === null || void 0 === r || r,
                        exception: (a = (s = p.performance) === null || void 0 === s ? void 0 : s.exception) === null || void 0 === a || a,
                        network: (c = (l = p.performance) === null || void 0 === l ? void 0 : l.network) !== null && void 0 !== c && c
                    }
                }), window.vds = this.growingIO.vdsConfig, this.seqStorageIdName = `${h}_gdp_sequence_ids`;
            }, this.setOption = (e, t) => {
                let i;
                const {
                    vdsConfig: n,
                    callError: r,
                    uploader: o,
                    emitter: a
                } = this.growingIO; const d = O(e) && L(s, e); const l = d && typeof t === (((i = this.ALLOW_SETTING[e]) === null || void 0 === i ? void 0 : i.type) || 'string'); const
                    c = Object.assign({}, n);
                return d && l ? (n[e] = t, e === 'dataCollect' && c.dataCollect !== t && (t ? (this.sendVisit(!0), this.sendPage()) : this.growingIO.clearTrackTimer()), L(['host', 'scheme'], e) && (o == null || o.generateHost()), a == null || a.emit('OPTION_CHANGE', {
                    optionName: e,
                    optionValue: t
                }), window.vds[e] = t, !0) : (r(`setOption > ${e}`), !1);
            }, this.getOption = (e) => {
                const {
                    vdsConfig: t,
                    callError: i
                } = this.growingIO;
                return e && K(t, j(e)) ? t[j(e)] : w(e) ? Object.assign({}, t) : void i(`getOption > ${e}`);
            }, this.sendVisit = (e) => {
                const {
                    userStore: {
                        sessionId: t
                    },
                    vdsConfig: {
                        projectId: i,
                        dataCollect: n
                    },
                    storage: r
                } = this.growingIO;
                if (n) {
                    const n = `${i}_gdp_session_id_${t}`;
                    const s = r.getItem(n);
                    !e && L([!0, 'true'], s) || (this.buildVisitEvent(), r.setItem(n, !0));
                }
            }, this.buildVisitEvent = (e) => {
                const {
                    dataStore: {
                        eventContextBuilder: t,
                        eventConverter: i
                    }
                } = this.growingIO; const
                    n = this.lastVisitEvent;
                let r = Object.assign(Object.assign({
                    eventType: 'VISIT'
                }, t()), {
                    referralPage: n.referralPage
                });
                $(e) || (r.session = (e == null ? void 0 : e.session) || r.session, r.trackingId = e == null ? void 0 : e.trackingId, r = Object.assign(Object.assign({}, r), e)), (n == null ? void 0 : n.path) && (r.title = n.title, r.path = n.path, r.query = n.query, r.timestamp = n.timestamp), i(r);
            }, this.sendPage = (e) => {
                e && this.currentPage.parsePage(), this.currentPage.buildPageEvent();
            }, this.buildErrorEvent = (e) => {
                const {
                    dataStore: {
                        eventContextBuilder: t,
                        eventConverter: i
                    }
                } = this.growingIO;
                i(Object.assign({
                    eventType: 'CUSTOM',
                    pageShowTimestamp: this.currentPage.time,
                    eventName: 'onError',
                    attributes: e
                }, t()));
            }, this.currentPage = new ii(this.growingIO), this.eventContextBuilderInst = new ti(this.growingIO), this.eventContextBuilder = this.eventContextBuilderInst.main, this.generalProps = {}, this.localStore = new Xt(), this._lastVisitEvent = ni, (a = this.growingIO.emitter) === null || void 0 === a || a.on('onComposeAfter', (({
                composedEvent: e
            }) => {
                e.eventType !== 'VISIT' && e.t !== 'vst' || e.trackingId !== this.growingIO.trackingId || (this.lastVisitEvent = e, this._lastVisitEvent = e);
            })), this.lastPageEvent = {}, (l = this.growingIO.emitter) === null || void 0 === l || l.on('onComposeAfter', (({
                composedEvent: e
            }) => {
                e.eventType !== 'PAGE' && e.t !== 'page' || e.trackingId !== this.growingIO.trackingId || (this.lastPageEvent = e);
            }));
        }

        get esid() {
            const e = this.growingIO.storage.getItem(this.seqStorageIdName) || {};
            let t = Object.assign({}, e);
            return F(t, 'globalKey'), t = S(t) && !w(t) ? t : {}, this._esid = {}, V(t).forEach(((e) => {
                this._esid[e] = y(Number(t[e])) || t[e] >= 1e9 || t[e] < 1 ? 1 : t[e];
            })), this._esid;
        }

        set esid(e) {
            const t = {};
            V(e).forEach(((i) => {
                t[i] = y(e[i]) || e[i] >= 1e9 || e[i] < 1 ? 1 : e[i];
            })), M(this._esid, t) || (this._esid = t, this.setSequenceIds('esid', this._esid));
        }

        get gsid() {
            const e = this.growingIO.storage.getItem(this.seqStorageIdName) || {};
            const t = Number(e.globalKey);
            return this._gsid = y(t) || t >= 1e9 || t < 1 ? 1 : t, this._gsid;
        }

        set gsid(e) {
            y(Number(e)) || e >= 1e9 || e < 1 ? this._gsid = 1 : this._gsid = e, this.setSequenceIds('gsid', this._gsid);
        }

        get lastVisitEvent() {
            let e;
            const {
                sessionId: t
            } = this.growingIO.userStore;
            return this._lastVisitEvent.path ? (t !== this._lastVisitEvent.sessionId && (this._lastVisitEvent = ni), this._lastVisitEvent) : (e = Z((() => this.localStore.getItem(`${t}_gdp_last_vst_gioenc`)))) !== null && void 0 !== e ? e : ni;
        }

        set lastVisitEvent(e) {
            this.localStore.getKeys().filter((e => /.+_gdp_last_vst/.test(e))).forEach(((e) => {
                this.localStore.removeItem(e);
            }));
            const {
                sessionId: t
            } = this.growingIO.userStore;
            this.localStore.setItem(`${t}_gdp_last_vst_gioenc`, JSON.stringify(e));
        }
    }
    class si extends ri {
        constructor(e) {
            super(e), this.growingIO = e, this.eventConverter = (e) => {
                let t;
                const {
                    vdsConfig: i,
                    dataStore: n,
                    uploader: r
                } = this.growingIO;
                if (i.dataCollect) {
                    e.trackingId === this.growingIO.trackingId && (e.globalSequenceId = n.gsid, e.eventSequenceId = n.esid[e.eventType] || 1);
                    const i = {};
                    W(e, ((e, t) => {
                        let n;
                        if (t === 'element') {
                            const t = (n = A(e)) !== null && void 0 !== n ? n : {};
                            W(t, ((e, t) => {
                                $(e) && e !== 0 || (i[t] = e);
                            }));
                        } else ($(e) || w(e)) && e !== 0 || (i[t] = e);
                    })), e.trackingId === this.growingIO.trackingId && (this.growingIO.dataStore.gsid += 1, this.growingIO.dataStore.esid = Object.assign(Object.assign({}, this.growingIO.dataStore.esid), {
                        [i.eventType]: (this.growingIO.dataStore.esid[i.eventType] || 1) + 1
                    })), (t = this.growingIO.emitter) === null || void 0 === t || t.emit('onComposeAfter', {
                        composedEvent: Object.assign({}, i)
                    }), e.trackingId === this.growingIO.trackingId && r.commitRequest(i);
                }
            };
        }
    }
    class oi {
        constructor(e) {
            this.growingIO = e, this.commitRequest = (e) => {
                const t = Object.assign({}, e);
                this.requestQueue.push(Object.assign(Object.assign({}, t), {
                    requestType: Rt() ? 'Beacon' : 'XHR'
                })), this.initiateRequest();
            }, this.initiateRequest = () => {
                let e; let
                    t;
                if ([...this.requestQueue].length > 0 && this.requestingNum < this.requestLimit) {
                    const {
                        vdsConfig: i,
                        emitter: n,
                        plugins: r,
                        useHybridInherit: s
                    } = this.growingIO;
                    if (this.requestQueue = [...this.requestQueue].filter((e => (this.retryIds[e.globalSequenceId || e.esid] || 0) <= this.retryLimit)), $(this.requestQueue)) return;
                    const o = this.requestQueue.shift();
                    const {
                        requestType: a
                    } = o;
                    if (n == null || n.emit('onSendBefore', {
                        requestData: o
                    }), F(o, ['requestType', 'trackingId']), i.debug && console.log('[GrowingIO Debug]:', JSON.stringify(o, null, 2).replace(/\"/g, (() => {
                        const e = window.navigator.userAgent;
                        return /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome\/(\d+\.\d+)/i.test(e);
                    })() ? '' : '"')), this.requestingNum += 1, s) return this.requestSuccessFn(o), !1;
                    let d = Object.assign({}, o);
                    switch (i.compress && ((e = r == null ? void 0 : r.gioCompress) === null || void 0 === e ? void 0 : e.compressToUint8Array) ? (this.compressType = '1', d = (t = r == null ? void 0 : r.gioCompress) === null || void 0 === t ? void 0 : t.compressToUint8Array(JSON.stringify([d]))) : (this.compressType = '0', d = JSON.stringify([d])), a) {
                        case 'Beacon':
                        default:
                            this.sendByBeacon(o, d);
                            break;
                        case 'XHR':
                            this.sendByXHR(o, d);
                            break;
                        case 'Image':
                            this.sendByImage(o, d);
                    }
                }
            }, this.generateURL = () => `${this.requestURL}?stm=${+Date.now()}&compress=${this.compressType}`, this.sendByBeacon = (e, t) => {
                navigator.sendBeacon(this.generateURL(), t) ? this.requestSuccessFn(e) : this.requestFailFn(e, 'Beacon');
            }, this.sendByXHR = (e, t) => {
                let i;
                const n = L(['unload', 'beforeunload', 'pagehide'], (i = window === null || void 0 === window ? void 0 : window.event) === null || void 0 === i ? void 0 : i.type);
                const r = new XMLHttpRequest();
                if (r) {
                    return r.open('POST', this.generateURL(), n), r.onreadystatechange = () => {
                        r.readyState === 4 && r.status === 204 ? this.requestSuccessFn(e) : this.requestFailFn(e, 'XHR');
                    }, r.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8'), void r.send(t);
                }
                if (window === null || void 0 === window ? void 0 : window.XDomainRequest) {
                    const i = new window.XDomainRequest();
                    i.open('POST', this.generateURL().replace('https://', 'http://'), n), i.onload = () => {
                        i.status === 204 ? this.requestSuccessFn(e) : this.requestFailFn(e, 'XHR');
                    }, i.onerror = i.ontimeout = () => {
                        this.requestFailFn(e, 'XHR');
                    }, i.send(t);
                }
            }, this.sendByImage = (e, t) => {
                const i = `${this.generateURL()}&data=${t}`;
                const n = document.createElement('img');
                n.width = 1, n.height = 1, n.onload = () => {
                    this.requestSuccessFn(e), this.clearImage(n);
                }, n.onerror = n.onabort = () => {
                    this.requestFailFn(e, 'Image'), this.clearImage(n);
                }, n.src = i;
            }, this.clearImage = (e) => {
                e.src = '', e.onload = () => {}, e.onerror = e.onerabort = () => {}, e = null;
            }, this.requestSuccessFn = (e) => {
                let t;
                this.requestingNum -= 1;
                const i = e.globalSequenceId || e.esid || -1;
                this.retryIds[i] && (this.retryIds[i] = 0), this.growingIO.userStore.sessionId = this.growingIO.userStore.sessionId, (t = this.growingIO.emitter) === null || void 0 === t || t.emit('onSendAfter', {
                    requestData: e
                }), this.initiateRequest();
            }, this.requestFailFn = (e, t) => {
                this.requestingNum -= 1;
                const i = e.globalSequenceId || e.esid || -1;
                this.retryIds[i] || (this.retryIds[i] = 0), this.retryIds[i] += 1;
                const n = this.requestQueue.some((t => t.globalSequenceId === e.globalSequenceId && t.esid === e.esid));
                let r = t;
                this.retryIds[i] < this.retryLimit + 1 || (r = t === 'Beacon' ? 'XHR' : t === 'XHR' ? 'Image' : void 0, this.retryIds[i] = 0), !n && r && this.requestQueue.push(Object.assign(Object.assign({}, e), {
                    requestType: r
                }));
            }, this.requestQueue = [], this.requestLimit = 10, this.requestTimeout = 5e3, this.retryLimit = 1, this.retryIds = {}, this.requestingNum = 0, this.requestURL = '';
        }
    }
    class ai extends oi {
        constructor(e) {
            super(e), this.growingIO = e, this.generateHost = () => {
                let {
                    scheme: e,
                    host: t = '',
                    projectId: i
                } = this.growingIO.vdsConfig;
                e ? H(j(e), '://') || (e += '://') : e = `${location.protocol.indexOf('http') > -1 ? location.protocol.replace(':', '') : 'https'}//`, q(t, 'http') && (t = t.substring(t.indexOf('://') + (H(j(e), '://') ? 3 : 0))), this.requestURL = `${e}${t}/v3/projects/${i}/collect`;
            }, this.requestURL = '', this.generateHost();
        }
    }
    class di extends Qt {
        constructor() {
            super(), this.registerPlugins = (e) => {
                N(e) ? (e.forEach(((t, i) => {
                    let n; let
                        r;
                    $(t) || w(t) ? J('插件不合法，跳过加载!', 'warn') : ((n = t.js) === null || void 0 === n ? void 0 : n.default) && (e[i] = Object.assign(Object.assign({}, (r = t.js) === null || void 0 === r ? void 0 : r.default), {
                        options: t.options
                    }));
                })), e = D(e), this.plugins.pluginItems = [...this.plugins.pluginItems, ...e], this.plugins.installAll(e)) : J('插件注册失败，请检查!', 'error');
            }, this.getPlugins = () => this.plugins.pluginItems, this.initCallback = () => {
                let e; let
                    t;
                this.userStore = new ei(this), this.uploader = new ai(this), (t = (e = this.plugins) === null || void 0 === e ? void 0 : e.gioEventAutoTracking) === null || void 0 === t || t.main(), this.vdsConfig.enableIdMapping || (this.userStore.userKey = '');
            }, this.setTrackerScheme = (e) => {
                L(['http', 'https'], e) ? (this.dataStore.setOption('scheme', e), this.notRecommended()) : this.callError('scheme', !1);
            }, this.setTrackerHost = (e) => {
                ae.test(e) || de.test(e) ? (this.dataStore.setOption('host', e), this.notRecommended()) : this.callError('host', !1);
            }, this.setDataCollect = (e) => {
                this.setOption('dataCollect', !!e), this.notRecommended();
            }, this.setAutotrack = (e) => {
                this.setOption('autotrack', !!e), this.notRecommended();
            }, this.enableDebug = (e) => {
                this.setOption('debug', !!e), this.notRecommended();
            }, this.enableHT = (e) => {
                this.setOption('hashtag', !!e), this.notRecommended();
            }, this.getVisitorId = () => this.userStore.uid, this.getDeviceId = () => this.userStore.uid, this.setUserAttributes = (e, t) => {
                let i; let
                    n;
                !$(e) && S(e) ? (n = (i = this.plugins) === null || void 0 === i ? void 0 : i.gioCustomTracking) === null || void 0 === n || n.buildUserAttributesEvent(e, t) : this.callError('setUserAttributes');
            }, this.setUserId = (e, t) => {
                if (ie(j(e).trim())) {
                    const i = this.userStore.gioId;
                    this.vdsConfig.enableIdMapping && (this.userStore.userKey = !w(t) && j(t).length > 0 ? j(t).slice(0, 1e3) : ''), e = j(e).slice(0, 1e3), this.userStore.userId = e, i && i !== e && (this.userStore.sessionId = ''), i || i === e || this.dataStore.sendVisit(!0);
                } else this.clearUserId(), this.callError('setUserId');
            }, this.clearUserId = () => {
                this.userStore.userId = '', this.userStore.userKey = '';
            }, this.track = (e, t, i, n) => {
                let r; let
                    s;
                (((s = (r = this.plugins) === null || void 0 === r ? void 0 : r.gioCustomTracking) === null || void 0 === s ? void 0 : s.buildCustomEvent) || function () {})(e, Object.assign(Object.assign({}, this.dataStore.generalProps), S(t) && !$(t) ? t : {}), i, n);
            }, this.sendPage = e => this.dataStore.currentPage.buildPageEvent(e), this.sendVisit = e => this.dataStore.buildVisitEvent(e), this.trackTimerStart = (e, t) => {
                this.vdsConfig.dataCollect && ee(e, (() => {
                    const i = Dt();
                    T(t) ? (this.dataStore.trackTimers[i] = {
                        eventName: e,
                        leng: 0,
                        start: +Date.now()
                    }, t(i)) : J('回调方法不合法，返回timerId失败!');
                }));
            }, this.trackTimerPause = (e) => {
                if (e && this.dataStore.trackTimers[e]) {
                    const t = this.dataStore.trackTimers[e];
                    t.start && (t.leng += (+Date.now() - t.start)), t.start = 0;
                }
            }, this.trackTimerResume = (e) => {
                if (e && this.dataStore.trackTimers[e]) {
                    const t = this.dataStore.trackTimers[e];
                    t.start === 0 && (t.start = +Date.now());
                }
            }, this.trackTimerEnd = (e, t) => {
                if (this.vdsConfig.dataCollect) {
                    const i = 864e5;
                    if (e && this.dataStore.trackTimers[e]) {
                        const n = this.dataStore.trackTimers[e];
                        if (n.start !== 0) {
                            const e = +Date.now() - n.start;
                            n.leng = e > 0 ? n.leng + e : 0;
                        }
                        this.track(n.eventName, Object.assign(Object.assign({}, t), {
                            event_duration: n.leng > i ? 0 : n.leng / 1e3
                        })), this.removeTimer(e);
                    } else J('未查找到对应的计时器，请检查!', 'error');
                }
            }, this.removeTimer = (e) => {
                e && this.dataStore.trackTimers[e] && delete this.dataStore.trackTimers[e];
            }, this.clearTrackTimer = () => {
                this.dataStore.trackTimers = {};
            }, this.dataStore = new si(this);
        }
    }
    let li;
    return (function () {
        let e; let t; let i; let n; let
            s;
        const o = window.gioCompatibilityVds ? 'gdp_vds' : 'vds';
        if ((e = window[o]) === null || void 0 === e ? void 0 : e.gioSDKInstalled) return li = window.gdp, void J('SDK重复加载，请检查是否重复加载SDK或接入其他平台SDK导致冲突!', 'warn');
        window[o] = Object.assign(Object.assign({}, (t = window[o]) !== null && void 0 !== t ? t : {}), {
            gioSDKInstalled: !0
        });
        const d = new di();
        li = function () {
            let e;
            const t = arguments[0];
            if (O(t) && L(r, t) && d[t]) {
                const e = P(k(arguments));
                if (t === 'init') {
                    if (!ne(d)) return;
                    if (!re(e)) return;
                    const t = se(e);
                    if (!t) return;
                    const i = oe(e);
                    if (!i) return;
                    const {
                        projectId: n
                    } = t; const
                        {
                            dataSourceId: r,
                            appId: s,
                            cdpOptions: o
                        } = i;
                    d.init(Object.assign(Object.assign({}, o), {
                        projectId: n,
                        dataSourceId: r,
                        appId: s
                    }));
                } else if (t === 'registerPlugins') d.registerPlugins(e[0]);
                else {
                    if (d.gioSDKInitialized && d.vdsConfig) return d[t](...e);
                    J('SDK未初始化!', 'error');
                }
            } else L(a, t) ? J(`方法 ${j(t)} 已被弃用，请移除!`, 'warn') : J(`不存在名为 ${j(t)} 的方法调用!`, 'error');
            window[o] = Object.assign(Object.assign({}, window[o]), {
                _gr_ignore_local_rule: (e = window._gr_ignore_local_rule) !== null && void 0 !== e && e,
                gioEnvironment: 'cdp',
                gioSDKVersion: d.sdkVersion,
                gioSDKFull: d.gioSDKFull,
                canIUse: e => L(r, e) && d[e]
            });
        };
        const l = (i = window === null || void 0 === window ? void 0 : window.gdp) === null || void 0 === i ? void 0 : i.q;
        const c = (n = window === null || void 0 === window ? void 0 : window.gdp) === null || void 0 === n ? void 0 : n.e;
        const h = (s = window === null || void 0 === window ? void 0 : window.gdp) === null || void 0 === s ? void 0 : s.ef;
        window.gdp = li, window.gdp.e = c, window.gdp.ef = h, N(l) && !$(l) && l.forEach(((e) => {
            li.apply(null, e);
        }));
    }()), li;
})));
