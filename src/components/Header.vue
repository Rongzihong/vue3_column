<template>
  <nav class="navbar">
    <div class="wapper">
      <h3 @click="backHome">之乎者也</h3>
      <div v-if="!logined">
        <button
          type="button"
          @click="toLoginPage"
          class="btn btn-outline-light btn-sm"
        >
          登录
        </button>
        <button
          type="button"
          @click="toRegisterPage"
          class="btn register btn-outline-light btn-sm"
        >
          注册
        </button>
      </div>
      <div v-else class="dropdown">
        <button
          class="btn btn-outline-light dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          你好,{{ userInfo.nickName }}
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">新建文章</a></li>
          <li><a class="dropdown-item" href="#">我的专栏</a></li>
          <li><a class="dropdown-item" href="#">编辑资料</a></li>
          <li><a class="dropdown-item" href="#">退出登录</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import "bootstrap/js/dist/dropdown"
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
export default {
  name: "Header",
  setup() {
    const router = useRouter()
    const store = useStore()
    const backHome = () => {
      router.push("/")
    }
    const logined = computed(() => {
      return store.state.userInformation.isLogin
    })
    const userInfo = computed(() => {
      return store.state.userInformation.data
    })
    const toRegisterPage = () => {
      router.push("/register")
    }
    const toLoginPage = () => {
      router.push("/login")
    }
    return {
      backHome,
      toRegisterPage,
      toLoginPage,
      logined,
      userInfo,
    }
  },
}
</script>

<style scoped>
.navbar {
  color: #ffff;
  background-color: #0d6efd;
  height: 4rem;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); */
}

.wapper {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  padding-top: 0.5rem;
  cursor: pointer;
  font-weight: 300;
  /* margin-left: 8rem; */
  font-size: 1.5rem;
  letter-spacing: 0.005px;
}

div > button {
  margin-left: 1rem;
}
/* div :nth-child(2) {
  margin-right: 12rem;
} */
/* .register {
  margin-right: 12rem;
} */
</style>
