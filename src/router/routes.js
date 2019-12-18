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
    component: () => import("@/views/home")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about")
  },
  {
    path: "/study",
    name: "study",
    component: () => import("@/views/study")
  }
];
