import http from "./src/api/http";
import { router } from "./src/router";
import store from "./src/store";

router.beforeEach((to, from, next) => {
  const { userInformation, token } = store.state
  if (!userInformation.isLogin) {
    // 本地有token但是没有登录
    if (token) {
      http.defaults.headers.common.Authorization = `Bearer {token}`
      console.log(http.defaults.headers.common.Authorization);
    }
  }
})