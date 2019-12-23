import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

const originalPush = VueRouter.prototype.push;
//同一个路由跳转到相同的时候不会报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//路由插件的注册
Vue.use(VueRouter);

const LOGIN_PAGE_NAME = "login";
const REGISTER_PAGE_NAME = "register";

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
    console.warn("load title warning!");
  }
  //默认token存在
  const token = localStorage.getItem("token");

  //如果要跳转的是用户注册页面，直接跳转
  if (to.name === REGISTER_PAGE_NAME) {
    next();
  } else {
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME, // 跳转到登录页
        query: {
          redirect: to.fullPath
        }
      });
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      next(); // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        name: "home" // 跳转到home页
      });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
