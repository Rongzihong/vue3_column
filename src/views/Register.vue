<template>
  <div class="register" ref="registerRef">
    <form class="row g-3 needs-validation" novalidate>
      <h4>注册账户</h4>
      <div class="col-md-12">
        <label for="inputEmail" class="form-label">邮箱地址</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          required
          v-model="registerInfo.email"
        />
        <div class="invalid-feedback">电子邮箱地址不能为空</div>
      </div>
      <div class="col-md-12">
        <label for="inputPassword" class="form-label">昵称</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          v-model="registerInfo.nickName"
          required
        />
        <div class="invalid-feedback">昵称不能为空</div>
      </div>
      <div class="col-12">
        <label for="inputPassword2" class="form-label">密码</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword2"
          v-model="registerInfo.password"
          required
        />
        <div class="invalid-feedback">密码不能为空</div>
      </div>
      <div class="col-12">
        <label for="confirmPassword" class="form-label">确认密码</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="registerInfo.verifyPsd"
          required
        />
        <div class="invalid-feedback">重复密码不能为空</div>
      </div>

      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="gridCheck" />
          <label class="form-check-label" for="gridCheck"> 点我确认注册 </label>
        </div>
      </div>

      <router-link to="/login">已经有账户了？去登录</router-link>

      <div class="d-grid gap-2 col-12 mx-auto">
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="toRegister"
        >
          注册新用户
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRaw } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
// import {} from "bootstrap/js/dist/"

export default {
  name: "Register",
  setup() {
    const registerRef = ref(null)
    const store = useStore()
    const router = useRouter()
    const registerInfo = reactive({
      email: "",
      nickName: "",
      password: "",
      verifyPsd: "",
    })
    const toRegister = () => {
      const { email, nickName, password } = registerInfo
      // console.log({ email, nickName, password })
      store
        .dispatch("register", { email, nickName, password })
        .then((res) => {
          alert("注册成功!!!已自动登录~2秒后跳转到首页")
          setTimeout(() => {
            router.push("/home")
          }, 2000)
        })
        .catch((err) => {
          console.log("唔知点该,注册失败哦")
        })
    }
    onMounted(() => {
      registerRef.value.style.height =
        document.documentElement.clientHeight -
        store.state.otherHeight -
        80 +
        "px"
    })
    window.addEventListener("resize", () => {
      registerRef.value.style.height =
        document.documentElement.clientHeight -
        store.state.otherHeight -
        80 +
        "px"
    })
    return {
      registerRef,
      registerInfo,
      toRegister,
    }
  },
}
</script>

<style scoped>
.register {
  margin: 3rem auto;
  /* border: 1px solid saddlebrown; */
  min-height: 33rem;
  width: 20rem;
}
h4 {
  font-weight: 300;
  text-align: center;
}

button {
  margin-top: 0.5rem;
}
</style>
