import {
  setName,
  setToken,
  setUserInfo,
  clearUserInfo
} from "../mutations-type";
export default {
  namespaced: true,
  state: {
    name: localStorage.getItem("name"),
    token: localStorage.getItem("token"),
    userInfo: {
      userState: false,
      email: "",
      userName: "",
      id: ""
    }
  },
  getters: {
    userState: state => {
      return state.userInfo.userState;
    },
    userName: state => {
      return state.userInfo.userName;
    },
    email: state => {
      return state.userInfo.email;
    }
  },
  mutations: {
    [setName](state, name) {
      state.name = name;
      localStorage.setItem("name", name);
    },
    [setToken](state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    [setUserInfo](state, userInfo) {
      state.userInfo.email = userInfo.email;
      state.userInfo.id = userInfo.id;
      state.userInfo.userState = true;
      state.userInfo.userName = userInfo.name;
    },
    [clearUserInfo](state) {
      state.userInfo = {
        userState: false,
        email: "",
        userName: "",
        id: ""
      }
    }
  },
  actions: {
    handleLogIn({ commit }, user) {
      commit(setName, user.name);
      commit(setToken, user.token);
      commit(setUserInfo, user.userInfo);
    },
    handleLogOut({ commit }) {
      commit(setName, "");
      commit(setToken, "");
      commit(clearUserInfo);
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("token");
    },
    handleUpdateUser({ commit }, userInfo) {
      commit(setUserInfo, userInfo);
    }
  }
};
