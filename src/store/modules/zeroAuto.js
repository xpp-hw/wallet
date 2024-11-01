const state = {
    isShow: false,
    type: "",
};

const mutations = {
    // eslint-disable-next-line no-shadow
    zeroAuto(state, data) {
        if (typeof data === "boolean") {
            state.isShow = data;
            state.type = "";
        } else {
            state.isShow = data.isShow;
            state.type = data.type;
        }
    },
};

export default {
    state,
    mutations,
};
