<template>
  <div class="post-detail">
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item active">
          <router-link to="/home">首页</router-link>
        </li>
        <li class="breadcrumb-item active">
          <router-link :to="`/detail/${post.column}`">专栏首页</router-link>
        </li>
        <li class="breadcrumb-item">{{ post.title }}</li>
      </ol>
    </nav>
    <img :src="post.image?.url" alt="" />
    <h2>{{ post.title }}</h2>
    <p class="space"></p>
    <div class="intro">
      <div class="text-big-intro">
        <img :src="post.author?.avatar?.url" alt="" />
        <div class="text-intro">
          <p>{{ post.author?.nickName }}</p>
          <span>{{ post.author?.description }}</span>
        </div>
      </div>
      <i>发表于：{{ post.createdAt }}</i>
    </div>
    <p class="space"></p>
    <div v-html="post.content"></div>

    <div class="button-group" v-if="post.author?._id == user?._id">
      <button class="btn btn-outline-info" type="button">编辑</button>
      <button
        class="btn btn-outline-danger"
        type="button"
        @click.prevent="modalIsVisible = true"
      >
        删除
      </button>
    </div>
    <modal
      v-if="modalIsVisible"
      title="删除文章"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import Modal from "../base/Modal"
import { useStore } from "vuex"

import http from "../api/http"
export default {
  name: "PostDtail",
  components: {
    Modal,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const post = computed(() => store.getters.getPostById(route.params.id))
    const user = computed(() => store.state.userInformation.data)
    onMounted(() => {
      store.dispatch("fetchPost", route.params.id)
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store
        .dispatch("deletePost", post.value._id)
        .then((res) => {
          alert("删除成功~2秒后为你跳转到专栏")
          setTimeout(() => {
            router.push(`/detail/${post.value.column}`)
          }, 2000)
        })
        .catch((err) => {
          console.log("唔知点该，删除失败~", err)
        })
    }
    // v-if="post._id=user._id"
    return { post, user, hideAndDelete, modalIsVisible }
  },
  // slot是插口，放在子组件的~
}
</script>

<style scoped>
.post-detail {
  margin: 1rem auto;
  width: 35%;
  min-height: 42.6rem;
}

@media screen and (max-width: 1460px) {
  .post-detail {
    width: 40%;
  }
}

nav {
  margin-top: 2rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
  padding: 0.8rem 0.8rem 0.002rem 0.8rem;

  margin-bottom: 2.5rem;
}
img {
  width: 100%;
  /* height: 25rem; */
  border-radius: 0.3rem;
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 350;
}
.space {
  margin: 0;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 3rem;
}
.intro {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.post-detail > p:first-of-type {
  margin-bottom: 0;
}

.text-big-intro {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.intro img {
  margin-top: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  height: 50px;
  width: 50px;
}
.text-intro {
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: center; */
}
p {
  margin-bottom: 0;
}

span,
i {
  color: #6c757d;
}

.button-group {
  margin-top: 13rem;
  /* bottom: 10%; */
  /* position: absolute; */
}

button:first-of-type {
  margin-right: 0.5rem;
}
</style>
