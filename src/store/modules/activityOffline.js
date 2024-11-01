const state = {
    isShow: false
};


const mutations = {
    // eslint-disable-next-line no-shadow
    setActivityOffline(state, data) {
        state.isShow = data;
    }
};

export default {
    state,
    mutations
};
