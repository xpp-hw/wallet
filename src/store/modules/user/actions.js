// eslint-disable-next-line import/no-cycle
export default {
    updateUserinfo() {
    },
    checkLoginState({ commit, dispatch, state }, data = {}) {
        const { userInfo } = state;

        if ((!userInfo || Object.keys(userInfo).length === 0) || data.updateCache) {
            commit('CLSUSERINFO');
            return dispatch('updateUserinfo', data);
        }

        return Promise.resolve();
    }
};
