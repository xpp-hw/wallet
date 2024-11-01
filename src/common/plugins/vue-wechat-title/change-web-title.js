const setWechatTitle = (title, img) => {
    if (title === undefined) {
        return false;
    }

    document.title = title;
    const mobile = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(mobile)) {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        // 替换成站标favicon路径或者任意存在的较小的图片即可
        iframe.setAttribute('src', img || '');
        const iframeCallback = () => {
            setTimeout(() => {
                iframe.removeEventListener('load', iframeCallback);
                document.body.removeChild(iframe);
            }, 0);
        };
        iframe.addEventListener('load', iframeCallback);
        document.body.appendChild(iframe);

        if (typeof (CmpChangeTitle) === 'function') {
            window.CmpChangeTitle(title);
        }
    }

    return true;
};

export default setWechatTitle;
