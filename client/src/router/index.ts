import { createRouter, createWebHistory } from "vue-router";
import indexPage from "@/pages/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: indexPage,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login.vue"),
    },
    {
      path: "/verify-phone",
      name: "verify",
      component: () => import("@/pages/verify.vue"),
    },
  ],
});

export default router;
