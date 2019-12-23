import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import { errorHandler } from "@/lib/error";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "@/store";

import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";

import "verify5-css";
// import {Message} from 'element-ui';

Vue.config.productionTip = false;
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = error => errorHandler(error, this);

Vue.use(ElementUI);
Vue.use(vuescroll);
// Vue.use(Message);

// Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
