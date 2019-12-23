import { setName, setToken } from "../mutations-type";
export default {
  namespaced: true,
  state: {
    name: localStorage.getItem("name"),
    token: localStorage.getItem("token")
  },
  getters: {},
  mutations: {
    [setName](state, name) {
      state.name = name;
      localStorage.setItem("name", name);
    },
    [setToken](state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    }
  },
  actions: {
    handleLogIn({ commit }, user) {
      commit(setName, user.name);
      commit(setToken, user.token);
    }
  }
};
