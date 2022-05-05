import { createRouter, createWebHistory } from "vue-router";
import api from "@/lib/api";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/pages/chat-page.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login-page.vue"),
    },
    {
      path: "/verify-phone",
      name: "verify",
      component: () => import("@/pages/verify-page.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const path = to.path;
    const accessPathWithoutToken = ["/login", "/verify-phone"];
    if (token) {
      await api.post("verify", { token });
      // if verify success then go to chat
      // warn: using next ('/chat') causes infinite redirection loop
      if (path === "/chat") return next();
      if (path !== '/chat') return next("/chat");
    }
    if (accessPathWithoutToken.includes(path)) return next();
    if (!token) return next("/login");
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token"); 
    next("/login");
  }
});

export default router;
