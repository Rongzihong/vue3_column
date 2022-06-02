<template>
  <div class="edit">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: editUser }" @click="userMode"
          >更新个人资料</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: !editUser }" @click="columnMode"
          >更新专栏信息</a
        >
      </li>
    </ul>
    <h4>编辑个人资料</h4>
    <div class="upload" @click="upload">
      <img :src="imagePreviewUrl ? imagePreviewUrl : user.avatar?.url" alt="" />
      <input type="file" accept="image/*" ref="file" @change="onChangeFile" />
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        v-model="nickName"
      />
      <label for="floatingInput">请输入名称</label>
    </div>
    <div class="form-floating mb-4">
      <textarea
        class="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea"
        style="height: 10rem"
        v-model="description"
      ></textarea>
      <label for="floatingTextarea">请输入简介信息</label>
    </div>
    <button class="btn btn-primary" @click="submit">提交修改</button>
  </div>
</template>

<script>
import { ref, computed, toRaw, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import http from "../api/http"
export default {
  name: "Edit",
  setup() {
    const editUser = ref(true)
    const file = ref(null)
    const store = useStore()
    const column = computed(() => {
      // return store.getters.getColumnDetailById(user.value.column)
    })
    const router = useRouter()
    const route = useRoute()
    const nickName = ref("")
    const user = computed(() => store.state.userInformation.data)
    const description = ref("")
    const upload = () => {
      file.value.click()
    }
    const userMode = () => {
      editUser.value = true
    }
    const columnMode = () => {
      editUser.value = false
    }
    const axiosImg = new FormData()
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
            payload.avatar._id = res.data._id
            payload.avatar.url = res.data.url
          })
      }
    }
    const judgeImgAttribute = () => {
      imagePreviewUrl ? imagePreviewUrl : user.value.avatar?.url
      if (imagePreviewUrl) {
        return imagePreviewUrl
      } else {
        if (editUser.value) {
          return user.value.avatar?.url
        } else {
          return column
        }
      }
    }
    onMounted(() => {
      const test = computed(() => store.getters.getPostById(route.params.id))
      console.log(test.value)
    })
    const imagePreviewUrl = ref(null)
    const createImagePreview = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        imagePreviewUrl.value = event.target?.result
      }
    }
    const payload = user.value
    const submit = () => {
      http
        .patch(`/user/${payload._id}`, {
          ...toRaw(payload), 
          ...{ nickName: nickName.value, description: description.value },
        })
        .then((res) => {
          alert("修改成功~2秒后跳转至首页")
          setTimeout(() => {
            store.dispatch("fetchCurrentUserInformation")
            router.push("/")
          }, 2000)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return {
      file,
      nickName,
      user,
      description,
      submit,
      upload,
      onChangeFile,
      imagePreviewUrl,
      editUser,
      userMode,
      columnMode,
      judgeImgAttribute,
      column,
    }
  },
}
</script>

<style scoped>
.edit {
  min-height: 45.5rem;
  width: 40%;
  margin: 3rem auto;
}
.nav {
  margin-bottom: 2rem;
}

li > a {
  cursor: pointer;
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
  margin: 1rem auto 2.5rem auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload h4 {
  color: #6c757d;
  font-weight: 350;
}

.upload input {
  display: none;
}

.upload img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
