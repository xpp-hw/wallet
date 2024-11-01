const state = {
    list: [1, 2, 3, 4, 5, 6, 7]
};


const mutations = {
    // eslint-disable-next-line no-shadow
    compulsory(state, data) {
        if (typeof data === 'boolean') {
            state.isShow = data;
            state.type = '';
        } else {
            state.isShow = data.isShow;
            state.type = data.type;
        }
    }
};

export default {
    state,
    mutations
};
