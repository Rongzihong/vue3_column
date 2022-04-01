<template>
  <nav class="navbar">
    <div class="wapper">
      <router-link to="/" class="logo">之乎者也</router-link>
      <!-- {{ column }} -->
      <div v-if="!logined">
        <router-link to="/login" class="btn btn-outline-light btn-sm"
          >登录</router-link
        >
        <router-link
          to="/register"
          class="btn ml-1 register btn-outline-light btn-sm"
          >注册</router-link
        >
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
          <li><a class="dropdown-item" href="/create">新建文章</a></li>
          <li>
            <a class="dropdown-item" :href="`/detail/${userInfo.column}`"
              >我的专栏</a
            >
          </li>
          <li>
            <a class="dropdown-item" :href="`/edit/${userInfo._id}`"
              >编辑资料</a
            >
          </li>
          <li><a class="dropdown-item" @click="logout">退出登录</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import "bootstrap/js/dist/dropdown"
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  name: "Header",
  setup() {
    const store = useStore()
    const logined = computed(() => {
      return store.state.userInformation.isLogin
    })
    const userInfo = computed(() => {
      return store.state.userInformation.data
    })

    const logout = () => {
      store.commit("userLogout")
    }

    return {
      logined,
      userInfo,
      logout,
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

.logo {
  cursor: pointer;
  font-weight: 350;
  /* margin-left: 8rem; */
  font-size: 1.5rem;
  letter-spacing: 0.005px;
  text-decoration: none;
  color: #1a1a1a;
}

.ml-1 {
  margin-left: 1rem;
}
/* div :nth-child(2) {
  margin-right: 12rem;
} */
/* .register {
  margin-right: 12rem;
} */
</style>
