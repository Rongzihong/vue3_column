<template>
  <div class="create">
    <h4>新建文章</h4>
    <div class="upload" type="file">
      <h3>点击上传头图</h3>
    </div>
    <div class="form-floating mb-4">
      <input
        type="text"
        class="form-control"
        id="floatingTitle"
        placeholder="Password"
      />
      <label for="floatingTitle">请输入文章标题</label>
    </div>
    <div class="form-floating mb-4">
      <textarea
        class="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea2"
        style="height: 15rem"
      ></textarea>
      <label for="floatingTextarea2">请输入文章详情</label>
    </div>
    <button class="btn btn-primary">提交文章</button>
  </div>
</template>

<script>
export default {
  name: "Create",
}
</script>

<style scoped>
.create {
  height: 43rem;
  width: 60%;
  margin: 3rem auto;
}

h4 {
  font-weight: 350;
  margin-bottom: 1rem;
}

.upload {
  background-color: #eee;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  cursor: pointer;
}

.upload h3 {
  color: #6c757d;
  font-weight: 350;
}
</style>
