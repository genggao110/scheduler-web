import Vue from "vue";
import Vuex from "vuex";
import moduleA from "./modules/moduleA";
import moduleB from "./modules/moduleB";
import User from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moduleA,
    moduleB,
    User
  }
});
