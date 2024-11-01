import store from '@/common/localstore';

export default {
    userInfo: store('userInfo') || {},
    userTree: store('userTree') || {}
};
