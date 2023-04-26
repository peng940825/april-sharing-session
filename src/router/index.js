import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";

import LectureNotes1 from "@/views/LectureNotes1.vue";
import LectureNotes2 from "@/views/LectureNotes2.vue";
import LectureNotes3 from "@/views/LectureNotes3.vue";
import LectureNotes4 from "@/views/LectureNotes4.vue";
import LectureNotes5 from "@/views/LectureNotes5.vue";
import LectureNotes6 from "@/views/LectureNotes6.vue";

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
    {
      path: "/lecture-notes-3",
      name: "LectureNotes3",
      component: LectureNotes3,
    },
    {
      path: "/lecture-notes-4",
      name: "LectureNotes4",
      component: LectureNotes4,
    },
    {
      path: "/lecture-notes-5",
      name: "LectureNotes5",
      component: LectureNotes5,
    },
    {
      path: "/lecture-notes-6",
      name: "LectureNotes6",
      component: LectureNotes6,
    },
  ],
});

export default router;
