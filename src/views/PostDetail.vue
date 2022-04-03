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

    <div class="button-group">
      <button class="btn btn-outline-info" type="button">编辑</button>
      <button class="btn btn-outline-danger" type="button">删除</button>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
export default {
  name: "PostDtail",
  setup() {
    const route = useRoute()
    const store = useStore()

    const post = computed(() => store.getters.getPostById(route.params.id))
    onMounted(() => {
      store.dispatch("fetchPost", route.params.id)
    })
    return { post }
  },
}
</script>

<style scoped>
.post-detail {
  margin: 1rem auto;
  width: 35%;
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
  margin-top: 3rem;
}

button:first-of-type {
  margin-right: 0.5rem;
}
</style>
