import { createRouter, createWebHistory } from "vue-router"
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/edit",
    component: () => import("../views/Edit.vue"),
  },
  {
    path: "/detail/:id",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/create",
    component: () => import("../views/Create.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
  },
]
export const router = createRouter({
  routes,
  history: createWebHistory(),
})
