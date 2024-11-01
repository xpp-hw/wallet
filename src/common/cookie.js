export function setCookie(name, value, expire) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + expire);
    if (process.env.VUE_APP_ENV !== 'production') {
        // document.cookie = name + '=' + escape(value) + '; expires=' + date.toGMTString();
        document.cookie = `${name}'='${escape(value)}'; expires='${date.toGMTString()}`;
        return;
    }
    // document.cookie = name + '=' + escape(value) + ';domain=.js.10086.cn;expires=' + date.toGMTString();
    document.cookie = `${name}'='${escape(value)}';domain=.js.10086.cn;expires='${date.toGMTString()}`;
}

// export function getCookie(str) {
//     if (document.cookie.length > 0) {
//         // let cstart = document.cookie.indexOf(str + '=');
//         let cstart = document.cookie.indexOf(`${str}'='`);
//         if (cstart !== -1) {
//             cstart = cstart + str.length + 1;
//             let cend = document.cookie.indexOf(';', cstart);
//             if (cend === -1) cend = document.cookie.length;
//             return unescape(document.cookie.substring(cstart, cend));
//         }
//     }
//     return '';
// }

export function getCookie(str) {
    const name = `${str}=`;
    const cookie = document.cookie.toString();
    const ca = cookie.split(';');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function delCookie(delname) {
    if (process.env.VUE_APP_ENV !== 'production') {
        // document.cookie = delname+'='+getCookie(delname)+';expires='+(new Date(1))+';path=/';
        document.cookie = `${delname}'='${getCookie(delname)}';expires='${(new Date(1))}';path=/'`;
        return;
    }
    // document.cookie = delname+'='+getCookie(delname)+';expires='+(new Date(1))+';path=/;domain=.js.10086.cn';
    document.cookie = `${delname}'='${getCookie(delname)}';expires='${(new Date(1))}';path=/;domain=.js.10086.
    cn'`;
}

export function setCookieNotTimeOut(setname, value) {
    if (value === undefined) return;
    delCookie(setname);
    gdp('setUserId', value);
    if (process.env.VUE_APP_ENV !== 'production') {
        // document.cookie = setname + '=' + escape(value) + ';path=/;';
        document.cookie = `${setname}=${escape(value)};path=/;`;
        return;
    }
    // document.cookie = setname + '=' + escape(value) + ';path=/;domain=.js.10086.cn';
    document.cookie = `${setname}=${escape(value)};path=/;domain=.js.10086.cn`;
}

export function delectQueryString(url, paraName) {
    const arrObj = url.split('?');
    if (arrObj.length > 1) {
        const arrPara = arrObj[1].split('&');
        let arr = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=');
            if (arr != null && arr[0] === paraName) {
                arrPara.splice(i, 1);
                // eslint-disable-next-line no-plusplus
                i--;
            }
        }
        if (arrPara.length === 0) {
            return arrObj[0];
        }
        return `${arrObj[0]}?${arrPara.join('&')}`;
    }
    return url;
}
