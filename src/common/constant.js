import URI from 'urijs';

const APIDOMAIN = '';

const gotoWechatAuth = (appid = '', redirectUri = '', scope = 'snsapi_base') => {
    const redirectURI = URI(redirectUri).removeQuery('code').removeQuery('state').toString();
    const wechatAuthorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=${scope}&state=cmpay#wechat_redirect`;

    window.location.replace(wechatAuthorizeUrl);
};

export {
    APIDOMAIN, gotoWechatAuth
};
