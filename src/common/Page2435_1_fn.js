/* eslint-disable */
import { CMWT } from '@/common/CM20190322.js';

export function initPageJs(codee, touchArr,data) {
    const pname = window.location.href;
    const protocolStr = document.location.protocol == 'https:' ? 'https://' : 'http://';
    window.$$XWDB_CM = {
        //    公共参数
        version: 'ACT',
        techType: 'H5',
        channel: 'wap',
        hostname: 'wap.js.10086.cn',
        // 总控是否采集
        collect: true,
        collectRate: 100,
        // 上传日志的服务器地址
        url: [
            {
                logServer: `${protocolStr}wap.js.10086.cn/bigdata/v3/init`,
                method: 'POST',
                events: ['init']
            },
            {
                logServer: `${protocolStr}wap.js.10086.cn/bigdata/v3/envir`,
                method: 'POST',
                events: ['envir']
            },
            {
                logServer: `${protocolStr}wap.js.10086.cn/bigdata/v3/inPage`,
                method: 'POST',
                events: ['page']
            }, {
                logServer: `${protocolStr}wap.js.10086.cn/bigdata/v3/outPage`,
                method: 'POST',
                events: ['outPage']
            },
            {
                logServer: `${protocolStr}wap.js.10086.cn/bigdata/v3/touch`,
                method: 'POST',
                events: ['touch']
            }, {
                logServer: `${protocolStr}wap.js.10086.cn/bigdata/v3/c_plan`,
                method: 'POST',
                events: ['plan']
            }
        ],
        // 需要向cookie中写入的参数的名称
        cookieName: {
            userInfo: 'userMobileForBigData',
            ch: '_XWBD_channel'
        },
        // 需要从URL中获得的参数的名称
        urlParam: {
            channel: 'ch'
        },
        // 母亲节宣传页具体页面
        pages: [
            {
                // 办业务大厅
                // url: protocolStr + 'wap.js.10086.cn/YWFLNEW.thtml',
                url: pname,
                collect: true,
                pageCode: `WAP_P_${codee}`,
                attributes:data,
                envir: [
                    {
                        envirCode: '30',
                        areaCode: ''
                    }
                ],
                touch: touchArr
            }

        ],
        pageStream: [

        ]
    };
    CMWT();
    console.log(`${window.$$XWDB_CM.pages[0].url}00`);
}
