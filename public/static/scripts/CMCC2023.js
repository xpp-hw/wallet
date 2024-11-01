/*
 * @Author: zhf 1914689669@.com
 * @Date: 2023-05-17 23:22:28
 * @LastEditors: zhf 1914689669@.com
 * @LastEditTime: 2023-08-01 16:00:36
 * @FilePath: \wallet\public\static\scripts\CMCC2023.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const ADDRESS = window.location.href.includes('fintech-uat') ? 'https://fintech.12580life.com/fintech-uat/fortuneCenter/static/scripts/gdp-full-H5-3.8.3.js' : 'https://fintech.12580life.com/fintech-h5/fortuneCenter/static/scripts/gdp-full-H5-3.8.3.js'; // 此部分替换为您的js文件路径
!(function (e, n, t, c, i) {
    (e[i] = e[i]
    || function () {
        (e[i].q = e[i].q || []).push(arguments);
    }),
    (t = n.createElement('script'));
    s = n.getElementsByTagName('script')[0];
    (t.async = 1), (t.src = c), s.parentNode.insertBefore(t, s);
}(
    window,
    document,
    'script',
    ADDRESS, // 此部分替换为您的js文件路径
    'gdp'
));
window._gr_ignore_local_rule = true;
gdp('init', '9e4e5fa7244c6b6e', 'ae2308d5a08258b6', {
    autotrack: false, // 关闭无埋点事件发送，生产环境设置为关闭
    host: 'jiguang.coc.10086.cn',
    scheme: 'https',
    debug: false, // 开启测试模式，控制台可看到数据，生产环境请勿添加此参数。
    compress: true // 开启数据压缩模式，整体报文加密，需要抓包查看报文时设置为false，生产环境设置为true。
});
