const state = {
    isShow: '0'
};

const mutations = {
    // eslint-disable-next-line no-shadow
    setFirstEnter(state, data) {
        state.isShow = data;
    }
};

export default {
    state,
    mutations
};
