import { createRouter, createWebHistory } from "vue-router"
import http from "../api/http"
import store from "../store"
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/postdetail/:id",
    component: () => import("../views/PostDetail.vue")
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
    meta: { requiredLogin: true }
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: { redirectAlreadyLogin: true }
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: { redirectAlreadyLogin: true }

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

router.beforeEach((to, from, next) => {
  const { userInformation } = store.state
  const token = localStorage.getItem("token")
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  // 没有登录
  if (!userInformation.isLogin) {
    if (token) {
      http.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch("loginAndfetch").then(() => {
        if (redirectAlreadyLogin) {
          next("/")
        } else {
          next()
        }
      }).catch(err => {
        console.log(err);
        store.commit("userLogout")
        next("login")
      })
    } else {
      if (requiredLogin) {
        next("login")
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next("/")
    } else {
      next()
    }
  }
})