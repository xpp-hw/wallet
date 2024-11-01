import store from '@/common/localstore';

export default {
    SETUSERINFO(state, data) {
        const saveData = Object.assign({}, state.userInfo, data);
        store('userinfo', saveData);
        state.userInfo = saveData;
    },
    SETUSERTREE(state, data) {
        const saveData = Object.assign({}, state.userTree, data);
        store('userTree', saveData);
        state.userTree = saveData;
    },
    CLSUSERINFO(state) {
        state.userInfo = {};
        store.remove('userinfo');
        state.userTree = {};
        store.remove('userTree');
    }
};
