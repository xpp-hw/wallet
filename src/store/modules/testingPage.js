const state = {
    isShow: false
};


const mutations = {
    // eslint-disable-next-line no-shadow
    setTestingPage(state, data) {
        state.isShow = data;
    }
};

export default {
    state,
    mutations
};
