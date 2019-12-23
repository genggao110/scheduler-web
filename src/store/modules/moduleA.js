import { increment } from "../mutations-type";
export default {
  namespaced: true,
  state: {
    count: 1
  },
  getters: {},
  //commit mutation ,同步
  mutations: {
    [increment](state, payload) {
      state.count += payload;
    }
  },
  //dispatch action ，异步
  actions: {}
};
