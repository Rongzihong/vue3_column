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
          v-model="emailRef.val"
          @blur="validateEmail"
        />
      </div>
      <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>
      <div class="col-12">
        <label for="inputPassword" class="form-label">密码</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          v-model="passwordRef.val"
          @blur="validatePassword"
        />
      </div>
      <div class="form-text" v-if="passwordRef.error">
        {{ passwordRef.message }}
      </div>

      <router-link to="/register">还没有账户？去注册一个新的吧！</router-link>

      <div class="d-grid col-12 mx-auto">
        <button type="submit" class="btn btn-primary" @click.prevent="login">
          登录
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default {
  name: "Login",
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const loginRef = ref(null)
    const password = ref("")
    const email = ref("")
    const emailRef = reactive({
      val: "",
      error: false,
      message: "",
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === "") {
        emailRef.error = true
        emailRef.message = "邮箱不能为空！"
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = "无效邮箱！"
      } else {
        emailRef.error = false
      }
    }

    const passwordRef = reactive({
      val: "",
      error: false,
      message: "",
    })

    const validatePassword = () => {
      if (passwordRef.val.trim() === "") {
        passwordRef.error = true
        passwordRef.message = "密码不能为空!"
      } else {
        passwordRef.error = false
      }
    }
    const login = () => {
      store
        .dispatch("loginAndfetch", {
          email: emailRef.val,
          password: passwordRef.val,
        })
        .then(() => {
          alert("登录成功~")
          // 重定向跳转,就是在没有登录状态的情况下进入需要登录页面那么在成功登录后会自动跳转到前页面
          let toPath = route.query.redirect || "/home"
          router.push(toPath)
        })
        .catch((err) => {
          console.log(err)
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
      login,
      emailRef,
      validateEmail,
      validatePassword,
      passwordRef,
    }
  },
}
</script>

<style scoped>
.login {
  margin: 3rem auto;
  /* border: 1px solid saddlebrown; */
  min-height: 24rem;
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

.form-text {
  color: red !important;
}
</style>
