import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";

import LectureNotes1 from "@/views/LectureNotes1.vue";
import LectureNotes2 from "@/views/LectureNotes2.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/lecture-notes-1",
      name: "LectureNotes1",
      component: LectureNotes1,
    },
    {
      path: "/lecture-notes-2",
      name: "LectureNotes2",
      component: LectureNotes2,
    },
  ],
});

export default router;
