<template>
  <div ref="loginRef" class="login">
    <form class="row g-3">
      <h4>登录账户</h4>
      <div class="col-md-12">
        <label for="inputEmail" class="form-label">邮箱地址</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          v-model="email"
        />
      </div>
      <div class="col-12">
        <label for="inputPassword" class="form-label">密码</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          v-model="password"
        />
      </div>

      <router-link to="/register">还没有账户？去注册一个新的吧！</router-link>

      <div class="d-grid col-12 mx-auto">
        <button type="submit" class="btn btn-primary" @click.prevent="toLogin">
          登录
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
export default {
  name: "Login",
  setup() {
    const store = useStore()
    const router = useRouter()
    const loginRef = ref(null)
    const password = ref("")
    const email = ref("")
    const toLogin = () => {
      store
        .dispatch("loginAndfetch", {
          email: email.value,
          password: password.value,
        })
        .then(() => {
          alert("登录成功!2秒后跳转到首页~")
          setTimeout(() => {
            router.push("/home")
          }, 2000)
        })
    }
    onMounted(() => {
      loginRef.value.style.height =
        document.documentElement.clientHeight -
        store.state.otherHeight -
        80 +
        "px"
    })
    window.addEventListener("resize", () => {
      loginRef.value.style.height =
        document.documentElement.clientHeight -
        store.state.otherHeight -
        80 +
        "px"
    })
    return {
      loginRef,
      email,
      password,
      toLogin,
    }
  },
}
</script>

<style scoped>
.login {
  margin: 3rem auto;
  /* border: 1px solid saddlebrown; */
  min-height: 20rem;
  width: 20rem;
  /* background-color: honeydew; */
}
h4 {
  font-weight: 300;
  text-align: center;
}
button {
  margin-top: 0.5rem;
}
</style>
