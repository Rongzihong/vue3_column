<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col-6 center">
        <img src="../assets/专栏.svg" alt="" />
        <h2>随心写作，自由表达</h2>
        <button type="buttton" class="btn btn-primary">开始写文章</button>
      </div>
      <div class="col"></div>
    </div>
    <h4>发现精彩</h4>
  </div>
  <div class="container">
    <div class="row">
      <div class="mb-4 col-4" v-for="item in list" :key="item._id">
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
            <img
              :src="item.avatar.url"
              :alt="item.title"
              class="rounded-circle border border-light my-3"
            />
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text text-left">{{ item.description }}</p>
          </div>
          <router-link
            :to="`/detail/${item._id}`"
            class="btn btn-outline-primary mx-auto mb-3"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <div
    class="d-grid gap-2 col-4 mx-auto button-style"
    v-if="Object.keys(list).length != total"
  >
    <button class="btn btn-outline-primary mt-3" @click="loadMore">
      加载更多
    </button>
  </div>
</template>

<script>
import { onMounted, computed } from "vue"
import { useStore } from "vuex"
export default {
  name: "Home",
  setup() {
    const total = computed(() => store.state.columns.total)
    const store = useStore()
    const list = computed(() => store.state.columns.data)
    onMounted(() => {
      store.dispatch("fetchColumns")
    })
    const params = {
      currentPage: 1,
      pageSize: 11,
    }
    const loadMore = () => {
      store.dispatch("fetchColumns", params)
    }
    return {
      list,
      loadMore,
      total,
    }
  },
}
</script>

<style scoped>
.my-img {
  width: 50px;
  height: 50px;
}

.border-light {
  border-color: #f8f9fa;
}

.card-title {
  margin-bottom: 0.5rem;
}
.card-body {
  flex: 1 1 auto;
  /* 放大收缩 */
}

.card {
  position: relative;
}

.center {
  margin-top: 2rem;
  height: 400px;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.center > * {
  margin: 0.7rem 0;
}

.center img {
  max-width: 50%;
}
.card-body img {
  width: 50px;
  height: 50px;
}

.center h2 {
  font-family: "Arial";
  font-weight: lighter;
}

h4 {
  margin-top: 2rem;
  text-align: center;
  font-weight: 300;
}

.list {
  display: grid;
  margin: 2rem 8rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  /* justify-items: center; */
  /* border: 1px solid rebeccapurple; */
}

.list-container {
  /* width: 25rem; */
  /* min-width: 10rem; */
  height: 15rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.list-container h5 {
  font-weight: 350;
  font-size: 1.2rem;
}

.list-container p {
  align-self: flex-start;
  margin-left: 1rem;
  margin-right: 1rem;
  color: #6c757d;
  font-size: 0.85rem;
}

.circle img {
  max-width: 4rem;
  max-height: 4rem;
  border-radius: 2rem;
  margin-bottom: 1.2rem;
}

.button-style {
  margin-bottom: 3rem;
}
</style>
