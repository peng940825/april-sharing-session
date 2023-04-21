import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import VideoView from "@/views/VideoView.vue";
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
      path: "/video",
      name: "Video",
      component: VideoView,
    },
    {
      path: "/desktop",
      name: "Desktop",
      component: DesktopView,
    },
  ],
});

export default router;
