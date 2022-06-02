<template>
  <div ref="createRef" class="create">
    <h4>新建文章</h4>
    <div class="upload" type="file" @click="uploadImg" ref="preview">
      <img alt="" v-if="imagePreviewUrl" :src="imagePreviewUrl" />
      <h3 v-else>点击上传头图</h3>
      <input
        type="file"
        accept="image/*"
        multiple
        ref="file"
        @change="onChangeFile"
      />
    </div>

    <div class="form-floating mb-4">
      <input
        type="text"
        class="form-control"
        id="floatingTitle"
        placeholder="Password"
        v-model="title"
      />
      <label for="floatingTitle">请输入文章标题</label>
    </div>
    <div class="form-floating mb-4">
      <textarea
        class="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea2"
        style="height: 15rem"
        v-model="details"
      ></textarea>
      <label for="floatingTextarea2">请输入文章详情</label>
    </div>
    <button class="btn btn-primary" @click="submitPost">提交文章</button>
  </div>
</template>

<script>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import http from "../api/http"
export default {
  name: "Create",
  setup() {
    const file = ref(null)
    const store = useStore()
    const router = useRouter()
    const createRef = ref(null)
    const title = ref("")
    const details = ref("")
    const preview = ref(null)
    const uploadImg = () => {
      file.value.click()
    }
    let axiosImg = new FormData()
    const onChangeFile = (event) => {
      const currentTarget = event.target
      if (currentTarget.files) {
        const file = currentTarget.files[0]
        createImagePreview(file)
        axiosImg.append("file", file)
        http
          .post("/upload", axiosImg, {
            headers: {
              "Content-Type": "mutipart/form-data",
            },
          })
          .then((res) => {
            payload.image = res.data._id
          })
      }
    }

    const { column, _id } = store.state.userInformation.data

    const payload = {
      title: "",
      content: "",
      column,
      image: "",
      author: _id,
    }

    const submitPost = () => {
      //加上...相当于解开一个对象，然后往后添加东西~！！！！
      store
        .dispatch("createPost", {
          ...payload,
          ...{ title: title.value, content: details.value },
        })
        .then((res) => {
          alert("已新建文章~2秒后跳转到新建文章详细页")
          setTimeout(() => {
            router.push(`/detail/${column}`)
          }, 2000)
        })
    }
    const imagePreviewUrl = ref(null)
    const createImagePreview = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        imagePreviewUrl.value = event.target?.result
      }
    }

    return {
      uploadImg,
      createRef,
      file,
      title,
      details,
      preview,
      onChangeFile,
      imagePreviewUrl,
      submitPost,
      payload,
    }
  },
}
</script>

<style scoped>
.create {
  min-height: 45.5rem;
  width: 50%;
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

.upload img {
  max-width: 100%;
  max-height: 100%;
}

input[type="file"] {
  display: none;
}
</style>
