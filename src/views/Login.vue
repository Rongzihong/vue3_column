<template>
  <div ref="loginRef" class="login">
    <form class="row g-3">
      <h4>登录账户</h4>
      <div class="col-md-12">
        <label for="inputEmail4" class="form-label">邮箱地址</label>
        <input type="email" class="form-control" id="inputEmail4" />
      </div>
      <div class="col-12">
        <label for="inputPassword" class="form-label">密码</label>
        <input type="password" class="form-control" id="inputPassword" />
      </div>

      <router-link to="/register">还没有账户？去注册一个新的吧！</router-link>

      <div class="d-grid col-12 mx-auto">
        <button type="submit" class="btn btn-primary">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, ref } from "vue"

export default {
  // props: ["calculateHeight"],  
  name: "Login",
  // setup(props) {
  //   const loginRef = ref("null")
  //   let clientHeight = ref("")

  //   onMounted(() => {
  //     clientHeight.value = `${document.documentElement.clientHeight}`
  //     alert(clientHeight.value)
  //     // alert(loginRef.value.clientHeight)
  //     // loginRef.value.style.height =
  //     //   clientHeight.value - props.calculateHeight() + "px"
  //     // alert(loginRef.value)
  //   })

  //   return {
  //     loginRef,
  //     clientHeight,
  //   }
  // },
}
</script>

<style scoped>
.login {
  margin: 3rem auto;
  /* border: 1px solid saddlebrown; */
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
