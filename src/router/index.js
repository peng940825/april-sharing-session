import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import MobileView from "@/views/MobileView.vue";
import DesktopView from "@/views/DesktopView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/mobile",
      name: "mobile",
      component: MobileView,
    },
    {
      path: "/desktop",
      name: "Desktop",
      component: DesktopView,
    },
  ],
});

export default router;
