const state = {
    payeeMobile: '',
    payeeUserNo: ''
};


const mutations = {
    // eslint-disable-next-line no-shadow
    setPayeeMobile(state, data) {
        state.payeeMobile = data;
    },
    setPayeeUserNo(state, data) {
        state.payeeUserNo = data;
    }
};

export default {
    state,
    mutations
};
