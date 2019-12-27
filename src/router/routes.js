export default [
  {
    path: "*",
    name: "error_404",
    meta: {
      title: "404-页面不存在"
    },
    component: () => import("@/views/error-page")
  },
  {
    path: "/",
    name: "home",
    meta: {
      title: "Scheduler-web"
    },
    component: () => import("@/views/home"),
    children: [
      {
        path: "",
        redirect: "home"
      },
      {
        path: "home",
        name: "Home",
        meta: {
          title: "首页"
        },
        component: () => import("@/views/about")
      }
    ]
  },
  {
    path: "/study",
    name: "study",
    meta: {
      title: "Study"
    },
    component: () => import("@/views/study")
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login"
    },
    component: () => import("@/views/login")
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "Register"
    },
    component: () => import("@/views/register")
  },
  {
    path: "/reset",
    name: "reset",
    meta: {
      title: "Reset_Password"
    },
    component: () => import("@/views/reset")
  }
];
