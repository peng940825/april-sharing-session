import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
import DesktopView from "../views/DesktopView.vue";
import MobileView from "../views/MobileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/test",
      name: "Test",
      component: TestView,
    },
    {
      path: "/desktop",
      name: "Desktop",
      component: DesktopView,
    },
    {
      path: "/mobile",
      name: "mobile",
      component: MobileView,
    },
  ],
});

export default router;
