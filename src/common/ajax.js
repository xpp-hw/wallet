/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import axios from 'axios';
import router from '@/router';
import * as store2 from '@/common/localstore';
import { delectQueryString } from '@/common/cookie';

// import * as store2 from '@/common/localstore';

// 跳转登录对象
// const typeUrl = {
//     sale: 'sale',
//     client: 'clientLogin'
// };
/**
 * [request Ajax 公共库]
 * @param  {[String]} url   [api 缩写名]
 * @param  {[Object]} paramsObj [Post 参数]
 * @param  {[String]} contentType [内容类型]
 */

export default function request(
    methods = 'post',
    url = '',
    paramsObj = {},
    contentType = 'application/json; charset=UTF-8'
) {
    const http = axios.create();
    // const saleToken = store2.default.get('userinfo') ? store2.default.get('userinfo').saleToken : '';
    // const userToken = store2.default.get('userinfo') ? store2.default.get('userinfo').userToken : '';

    return new Promise((resolve, reject) => {
        const method = methods.toLowerCase();
        const paramsObjs = paramsObj;
        const { nonrelogin } = paramsObjs;
        var overTime = 120000
        delete paramsObjs.nonrelogin;
        let dataName = 'data';
        if (method === 'get') {
            dataName = 'params';
        }
        if(url.indexOf('BocmPension/preCheck') > -1 || url.indexOf('BocmPension/openStsQuery') > -1 || url.indexOf('BocmPension/accountOrder') > -1 ) {
            overTime = 8000
        }

        const baseURL = '/';
        http({
            baseURL,
            method,
            url,
            [dataName]: paramsObjs,
            responseType: 'json',
            timeout: overTime,
            headers: {
                'Content-Type': contentType,
                'X-Requested-With': 'XMLHttpRequest',
                'x-wallet-auth-token': store2.default.get('loginSesion') || ''
            }
        })
            .then((res) => {
                // console.log(res);
                // console.log(router);
                // console.log(router.currentRoute.fullPath);
                const status = Number(res.status) || 200;
                if (status === 401) {
                    store2.default.set('loginSesion', null);
                    const pageUrl = window.location.href;
                    // const curUrl = pageUrl.substr(0, pageUrl.indexOf('?') + 1);
                    const curUrl = delectQueryString(pageUrl, 'tokenid');
                    window.location.assign(curUrl);
                }

                let resData = res.data;
                if (resData.msgCd && resData.msgCd.substr(-5) === '00000') {
                    return resolve(resData);
                }
                if (resData.msgCd === 'BUS20017' || resData.msgCd === 'BUS070002') {
                    const ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/leadeon/i) == 'leadeon') {
                        store2.default.set('loginSesion', null);
                        window.location.reload();
                    } else {
                        store2.default.set('loginSesion', null);
                        store2.default.set('saveEnter', null);
                        router.replace({
                            name: 'login',
                            query: { redirect: router.currentRoute.fullPath }
                        }).catch(() => {
                        });
                    }
                    return reject(resData);
                }

                if (!resData.msgInfo) {
                    resData = Object.assign({}, resData, { msgCd: 'FRONT000', msgInfo: '错误码提示数据异常！' });
                }
                return reject(resData);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(router.fullPath);
                let res = {};
                if (error.msgInfo) {
                    res = error;
                } else if (error.response || error.message) {
                    const errText = `，${(error.response
                        && error.response.status)
                        || error.message}`;
                    res = { msgCd: 'FRONT000', msgInfo: `服务器出问题了${errText}！` };
                    // debugger
                    if (error.response.status === 401 && !nonrelogin) {
                        const ua = navigator.userAgent.toLowerCase();
                        if (ua.match(/leadeon/i) == 'leadeon') {
                            store2.default.set('loginSesion', null);
                            window.location.reload();
                        } else {
                            store2.default.set('loginSesion', null);
                            const pageUrl = window.location.href;
                            // const curUrl = pageUrl.substr(0, pageUrl.indexOf('?') + 1);
                            const curUrl = delectQueryString(pageUrl, 'tokenid');
                            window.location.assign(curUrl);
                        }
                    }
                } else {
                    res = { msgInfo: error };
                }
                console.log(error); // eslint-disable-line
                return reject(res);
            });
    });
}
