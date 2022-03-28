<template>
  <nav class="navbar">
    <div class="wapper">
      <h3 @click="backHome">之乎者也</h3>
      <div>
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
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router"

export default {
  name: "Header",
  setup() {
    const router = useRouter()
    const backHome = () => {
      router.push("/")
    }
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
}

h3 {
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
