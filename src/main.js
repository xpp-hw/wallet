import Vue from 'vue';
import FastClick from 'fastclick';
import 'normalize.css';
import {
    Button,
    Icon,
    InputItem,
    Field,
    FieldItem,
    Dialog,
    ScrollView,
    ScrollViewMore,
    Swiper,
    SwiperItem,
    TabBar,
    PopupTitleBar,
    DetailItem,
    Popup,
    Selector,
    Tabs,
    TabPane,
    CellItem,
    Codebox
} from 'mand-mobile';

import { ValidationObserver } from 'vee-validate';
// import Toast from '@/common/plugins/toast';

import App from '@/App';
import router from '@/router';
import store from '@/store';

import vuewechattitle from '@/common/plugins/vue-wechat-title';
import 'mand-mobile/components/_style/global.styl';
import '@/common/validateConfig';
import * as filter from '@/common/filter';
import VueClipboard from 'vue-clipboard2';
// import KeyouCryptography from './common/keyou-crypto-min.js';
// import './common/whiteStyle.css';
// 抽奖组件
// import LatticeLottery from 'lattice-lottery';
const LatticeLottery = () => import('lattice-lottery');
import 'lattice-lottery/lib/lattice-lottery.css';
// 无缝滚动
// import scroll from 'vue-seamless-scroll'
const scroll = () => import('vue-seamless-scroll');
Vue.use(LatticeLottery);
Vue.use(scroll)

// Vue.prototype.$KeyouCryptography = KeyouCryptography;
const allSettled = require('promise.allsettled');

allSettled.shim();

Vue.use(vuewechattitle);
Vue.use(VueClipboard);

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(InputItem.name, InputItem);
Vue.component(Field.name, Field);
Vue.component(FieldItem.name, FieldItem);
Vue.component(DetailItem.name, DetailItem);
Vue.component(Dialog.name, Dialog);
Vue.component(Codebox.name, Codebox);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(CellItem.name, CellItem);
Vue.component(Selector.name, Selector);
Vue.component(ScrollView.name, ScrollView);
Vue.component(ScrollViewMore.name, ScrollViewMore);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component(Swiper.name, Swiper);
Vue.component(SwiperItem.name, SwiperItem);
Vue.component(TabBar.name, TabBar);
Vue.component(Popup.name, Popup);
Vue.component(PopupTitleBar.name, PopupTitleBar);

Vue.prototype.$toast = () => import('@/common/plugins/toast');
// Vue.prototype.$dialog = Dialog;

// userAgent 客户端
const { userAgent } = navigator;
const userAgentL = userAgent.toLowerCase();
// eslint-disable-next-line no-multi-assign
Vue.prototype.$client = Vue.client = {
    IE: userAgentL.indexOf('msie') > -1 && !userAgentL.indexOf('opera') > -1,
    GECKO:
        userAgentL.indexOf('gecko') > -1 && !userAgentL.indexOf('khtml') > -1, // 火狐内核
    WEBKIT: userAgentL.indexOf('applewebkit') > -1, // 苹果、谷歌内核
    OPERA:
        userAgentL.indexOf('opera') > -1 && userAgentL.indexOf('presto') > -1, // opera内核
    TRIDENT: userAgentL.indexOf('trident') > -1, // IE内核
    MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    MOBILEDEVICE: !!userAgentL.match(
        /iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i
    ), // 是否为移动终端
    IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    ANDROID: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1, // android终端或者uc浏览器
    IPHONE: userAgent.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    IPAD: userAgent.indexOf('iPad') > -1, // 是否iPad
    // WEBAPP: !userAgent.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
    QQBROWSER: userAgent.indexOf('QQBrowser') > -1, // 是否QQ浏览器
    WEIXIN: userAgent.indexOf('MicroMessenger') > -1, // 是否微信
    // QQ: userAgent.match(/\sQQ/i) === ' qq', // 是否QQ
    QQ: !!userAgent.match(/QQ\/[0-9]/i), // 是否QQ
    WEIBO: userAgent.match(/WeiBo/i) == 'weibo', // 微博
    ALIPAY: userAgent.indexOf('AlipayClient') > -1,
    JSMCC: userAgentL.indexOf('jsmcc') > -1, // jsyd营业厅
    LEADEON: userAgentL.indexOf('leadeon') > -1 // 移动营业厅
};

// 实例化Vue的filter
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]));

if ('addEventListener' in document && 'ontouchstart' in window) {
    FastClick.prototype.focus = function focus(targetElement) {
        targetElement.focus();
    };
    document.addEventListener(
        'DOMContentLoaded',
        () => {
            FastClick.attach(document.body, {
                tapDelay: 10
            });
        },
        false
    );
}
Vue.config.productionTip = false;

/* eslint-disable no-new */
window.wVue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

// (function (w) {
new (function (w) {
    const r = document.documentElement;
    let t = '';
    const f = function () {
        const c = r.clientWidth;
        // r.style.fontSize = (c > w ? w : c < 320 ? 320 : c) / w * 100 + 'px';
        if (c > w) {
            if (w < 320) {
                r.style.fontSize = `${(320 / w) * 100}px`;
            } else {
                r.style.fontSize = `${(c / w) * 100}px`;
            }
        } else {
            if (c < 320) {
                r.style.fontSize = `${(320 / w) * 100}px`;
            } else {
                r.style.fontSize = `${(c / w) * 100}px`;
            }
        }
    };
    const s = function () {
        clearTimeout(t);
        t = setTimeout(f, 100);
    };
    window.addEventListener('resize', s);
    f();
})(750);

window.ztLoginCallBack = function () {
    window.location.reload();
};
