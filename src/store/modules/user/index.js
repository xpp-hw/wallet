import state from './state';
import mutations from './mutations';
// eslint-disable-next-line import/no-cycle
import actions from './actions';

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
