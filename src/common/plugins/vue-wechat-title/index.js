import setWechatTitle from './change-web-title';

const install = (Vue) => {
    Vue.directive('wechat-title', (el, binding) => {
        setWechatTitle(binding.value, el.getAttribute('img-set') || null);
    });
};

export default install;
