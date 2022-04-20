import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/pages/chat.vue"),
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
