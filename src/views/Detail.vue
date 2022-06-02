<template>
  <div class="column">
    <div class="intro">
      <img :src="column?.avatar?.url" alt="" />
      <h4>{{ column.title }}</h4>
      <p>{{ column.description }}</p>
    </div>
    <!-- <hr /> -->
    <p class="space"></p>
    <div class="content-card" v-for="item in post" :key="item.key">
      <a @click="toPost(item._id)">{{ item.title }}</a>
      <div class="content-card-body">
        <img :src="item.image?.url" alt="" />
        <p>{{ item.excerpt }}</p>
      </div>
      <span>{{ item.createdAt }}</span>
    </div>
    <div
      class="d-grid gap-2 d-xl-flex justify-content-md-center"
      v-if="Object.keys(post).length != total"
    >
      <button class="btn btn-outline-primary" type="button" @click="showMore">
        加载更多
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, toRaw } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
export default {
  name: "Detail",
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    onMounted(() => {
      console.log(column.value, route.params.id)
    })
    const column = computed(() => {
      return store.getters.getColumnDetailById(route.params.id)
    })
    const post = computed(() => {
      return store.state.post.data
    })
    const total = computed(() => {
      return store.state.post.total
    })
    const params = {
      columnId: route.params.id,
      pageSize: 3,
      currentPage: 1,
    }

    const toPost = (id) => {
      router.push(`/postdetail/${id}`)
    }

    const showMore = () => {
      store.dispatch("fetchPosts", {
        columnId: route.params.id,
        pageSize:
          Object.keys(toRaw(post.value)).length + 3 < total.value
            ? Object.keys(toRaw(post.value)).length + 3
            : total.value,
        currentPage: params.currentPage,
      })
    }

    onMounted(() => {
      store.dispatch("fetchColumnDetail", route.params.id)
      store.dispatch("fetchPosts", params)
    })

    return { column, post, toPost, showMore, total }
  },
}
</script>

<style scoped>
.column > * {
  margin: 0 1rem;
}

.content-card {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* .content-card:last-child {
  margin-bottom: 3rem !important;
  background-color: rebeccapurple;
} */

.content-card > * {
  margin: 0.5rem 1rem;
}

.content-card a {
  text-decoration: none;
  color: #1a1a1a;
  font-size: 1.5rem;
  cursor: pointer;
}
.content-card a:hover {
  color: #0d6efd;
}

.content-card-body {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 7.5rem;
}

.content-card img {
  width: 200px;
  height: 100%;
  border-radius: 0.3rem;
  margin-right: 1rem;
  /* float: left; */
}

.content-card span {
  color: #6c757d;
  font-size: 0.9rem;
}

.intro {
  margin-bottom: 1rem;
}
.space {
  margin: 0;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 2rem;
}
.intro img {
  border-radius: 50%;
  height: 8rem;
  width: 8rem;
  margin-top: 1rem;
  margin-right: 1rem;
  float: left;
}

h4 {
  margin-top: 3rem;
}

p {
  color: #6c757d;
}

.column {
  margin: 1rem auto;
  width: 40%;
  display: flex;
  flex-direction: column;
}

button {
  /* margin: 0; */
  text-align: center;
}
</style>
