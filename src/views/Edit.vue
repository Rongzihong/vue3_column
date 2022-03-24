<template>
  <div class="edit">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active">更新个人资料</a>
      </li>
      <li class="nav-item">
        <a class="nav-link">更新专栏信息</a>
      </li>
    </ul>
    <h4>编辑个人资料</h4>
    <div class="upload">
      <h4>点击上传头像</h4>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
      />
      <label for="floatingInput">请输入名称</label>
    </div>
    <div class="form-floating mb-4">
      <textarea
        class="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea"
        style="height: 10rem"
      ></textarea>
      <label for="floatingTextarea">请输入简介信息</label>
    </div>
    <button class="btn btn-primary">提交修改</button>
  </div>
</template>

<script>
import { onMounted } from "vue"
export default {
  name: "Edit",
  setup() {
    onMounted(() => {
      console.log("gsdfga")
    })
  },
}
</script>

<style scoped>
.edit {
  height: 43rem;
  width: 40%;
  margin: 3rem auto;
}
.nav {
  margin-bottom: 2rem;
}

h4 {
  font-size: 1.2rem;
  padding-left: 0.5rem;
  font-weight: 350;
}
.upload {
  background-color: #eee;
  /* /* border: 1px solid #eee; */
  height: 12rem;
  width: 12rem;
  border-radius: 50%;
  margin: 1rem auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload h4 {
  color: #6c757d;
  font-weight: 350;
}
</style>
