import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/characters",
    name: "Characters",
    component: () => import("../views/Characters.vue"),
  },
  {
    path: "/episodes",
    name: "Episodes",
    component: () => import("../views/Episodes.vue"),
  },
  {
    path: "/locations",
    name: "Locations",
    component: () => import("../views/Locations.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
