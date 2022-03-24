<template>
  <div class="register">
    <form class="row g-3 needs-validation" novalidate>
      <h4>注册账户</h4>
      <div class="col-md-12">
        <label for="inputEmail" class="form-label">邮箱地址</label>
        <input type="email" class="form-control" id="inputEmail" required />
        <div class="invalid-feedback">电子邮箱地址不能为空</div>
      </div>
      <div class="col-md-12">
        <label for="inputPassword4" class="form-label">昵称</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword4"
          required
        />
        <div class="invalid-feedback">昵称不能为空</div>
      </div>
      <div class="col-12">
        <label for="inputPassword" class="form-label">密码</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
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
        <button type="submit" class="btn btn-primary">注册新用户</button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted } from "vue"
// import {} from "bootstrap/js/dist/"

export default {
  name: "Register",
  setup() {
    onMounted(() => {
      ;(function () {
        "use strict"

        var forms = document.querySelectorAll(".needs-validation")

        Array.prototype.slice.call(forms).forEach(function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }

              form.classList.add("was-validated")
            },
            false
          )
        })
      })()
    })
  },
}
</script>

<style scoped>
.register {
  margin: 3rem auto;
  /* border: 1px solid saddlebrown; */
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
