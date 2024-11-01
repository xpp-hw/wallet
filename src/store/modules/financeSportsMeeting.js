const state = {
   activityList: [
    {
      activityTaskInf:[],
      status:'1' //0开启，1停用    
    },
    {
      activityTaskInf:[],
      status:'1', //0开启，1停用
    },
    {
      activityTaskInf:[],
      status:'1' //0开启，1停用    
    },
    {
      activityTaskInf:[],
      status:'1' //0开启，1停用    
    },
   ],
   lotteryNumData:{}
};
const mutations = {
  // eslint-disable-next-line no-shadow
  SETACTIVITYLIST(state, data) {
    data.forEach((item,index)=>{
      state.activityList.splice(index, 1, item);
    })
  },

  SETLOTTERYNUMDATA(state, data) {
    state.lotteryNumData = data;
  }
};
const actions = {
  setLotteryNumData({ commit }, data) {
    commit('SETLOTTERYNUMDATA', data);
  }
};
export default {
  state,
  actions,
  mutations
};