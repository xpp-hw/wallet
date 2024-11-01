
// eslint-disable-next-line import/prefer-default-export
export function initWx(isAppId, isTimestamp, isNonceStr, isSignature, invitelink, describe, title, linkUrl) {
    if (!describe) {
        // eslint-disable-next-line no-param-reassign
        describe = '我发现一个内容很不错，就想分享给你一起看看。';
    }
    if (typeof window !== 'undefined') {
        const wx = require('weixin-js-sdk');
        wx.config(
            {
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: isAppId, // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: isTimestamp, // 必填，生成签名的时间戳
                nonceStr: isNonceStr, // 必填，生成签名的随机串
                signature: isSignature, // 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'onMenuShareQQ'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            }

        );


        wx.ready(() => {
            let url = 'https://img-blog.csdnimg.cn/29ae296a5cdd4defb77222a69d79c8c7.png#pic_center'
            // 需在用户可能点击分享按钮前就先调用
            // 分享到朋友圈
            // eslint-disable-next-line no-unused-expressions
            wx.onMenuShareQQ
                && wx.onMenuShareQQ(
                    {
                        title: title || "", // 分享标题
                        desc: describe, // 分享描述
                        link: invitelink || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: linkUrl || url, // 分享图标
                        success() {
                            //   alert('分享成功')
                            // 用户确认分享后执行的回调函数
                        },
                        cancel() {
                            //   alert('分享失败')
                            // 用户取消分享后执行的回调函数
                        }
                    }
                );
            // eslint-disable-next-line no-unused-expressions
            wx.onMenuShareTimeline
                && wx.onMenuShareTimeline(
                    {
                        title: title || "", // 分享标题
                        desc: describe, // 分享描述
                        link: invitelink || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: linkUrl || url, // 分享图标
                        success() {
                            //   alert('分享成功')
                            // 用户确认分享后执行的回调函数
                        },
                        cancel() {
                            //   alert('分享失败')
                            // 用户取消分享后执行的回调函数
                        }
                    }
                );
            // 分享给朋友
            // eslint-disable-next-line no-unused-expressions
            wx.onMenuShareAppMessage
                && wx.onMenuShareAppMessage(
                    {
                        title: title || "", // 分享标题
                        desc: describe, // 分享描述
                        link: invitelink || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: linkUrl || url, // 分享图标
                        success() {
                            //   alert('分享成功')
                            // 用户确认分享后执行的回调函数
                        },
                        cancel() {
                            //   alert('分享失败')
                            // 用户取消分享后执行的回调函数
                        }
                    }
                );
            // eslint-disable-next-line no-unused-expressions
            wx.updateAppMessageShareData
                && wx.updateAppMessageShareData(
                    {
                        title: title || "", // 分享标题
                        desc: describe, // 分享描述
                        link: invitelink || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: linkUrl || url, // 分享图标
                        success() {
                            //   alert('分享成功')
                            // 用户确认分享后执行的回调函数
                        },
                        cancel() {
                            //   alert('分享失败')
                            // 用户取消分享后执行的回调函数
                        }
                    }
                );
            // eslint-disable-next-line no-unused-expressions
            wx.updateTimelineShareData
             && wx.updateTimelineShareData(
                 {
                    title: title || "", // 分享标题
                    desc: describe, // 分享描述
                    link: invitelink || window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                    imgUrl: linkUrl || url, // 分享图标
                    success() {
                         //   alert('分享成功')
                         // 用户确认分享后执行的回调函数
                    },
                    cancel() {
                        //   alert('分享失败')
                        // 用户取消分享后执行的回调函数
                    }
                 }
             );
        });

        wx.error((res) => {
            console.log(res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    }
}
