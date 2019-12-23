import { updateList } from "../mutations-type";
export default {
  namespaced: true,
  state: {
    list: [
      {
        id: 1,
        name: "张三",
        sex: 1
      },
      {
        id: 2,
        name: "李四",
        sex: 0
      },
      {
        id: 3,
        name: "王五",
        sex: 1
      }
    ]
  },
  getters: {
    fileterList: (state, getters) => {
      return state.list.map(item => {
        item.sexName = item.sex === 1 ? "男" : "女";
        return item;
      });
    }
  },
  mutations: {
    [updateList](state, payload) {
      state.list = payload;
    }
  },
  actions: {
    getList({ commit }, payload) {
      commit("updateList", list);
    }
  }
};
