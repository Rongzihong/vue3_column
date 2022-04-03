import { createRouter, createWebHistory } from "vue-router"
import http from "../api/http"
import store from "../store"
//    在路径前加分号说明是否要参数?
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/postdetail/:id",
    component: () => import("../views/PostDetail.vue"),
  },
  {
    path: "/edit/:id",
    component: () => import("../views/Edit.vue"),
  },
  {
    path: "/detail/:id",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/create",
    component: () => import("../views/Create.vue"),
    meta: { requiredLogin: true },
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: { redirectAlreadyLogin: true },
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
    meta: { redirectAlreadyLogin: true },
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
  const { userInformation, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!userInformation.isLogin) {
    if (token) {
      http.defaults.headers.common.Authorization = `Bearer ${token}`
      store
        .dispatch("fetchCurrentUserInformation")
        .then(() => {
          if (redirectAlreadyLogin) {
            next("/")
          } else {
            next()
          }
        })
        .catch((err) => {
          console.log(err)
          store.commit("userLogout")
          next("login")
        })
    } else {
      if (requiredLogin) {
        next("login?redirect=" + to.path)
        // next("login?redirect=")
        // 一定不要忘了等号啊,query参数是什么=什么的!一定要有等号啊!
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
