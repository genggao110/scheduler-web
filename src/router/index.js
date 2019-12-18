import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//路由插件的注册
Vue.use(VueRouter);

const router = new VueRouter({
  //使用什么方式切换路由
  mode: "history",
  base: "/",
  routes
});

// 全局的路由钩子函数，路由跳转前的钩子函数
router.beforeEach((to, from, next) => {
  try {
    document.title = to.meta.title;
  } catch (e) {
    console.warn("load title warning");
  }
});

export default router;
