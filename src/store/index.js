import { createStore } from "vuex"
import {
  fetchColumns,
  fetchColumnDetail,
  fetchPosts,
  fetchPost,
} from "../api/index"
// 测试数据
// import http from "../api/http"
// // http.get('/columns?currentPage=1&pageSize=7').then(res => {
// //   console.log(res)
// // })
// http
//   .get("/posts/5f3fade0c9875c2cd848a2cf/")
//   // .get("/columns/5f3e86d62c56ee13bb83096b/posts?currentPage=1&pageSize=5")
//   // .get("/columns?currentPage=1&pageSize=5")
//   .then((res) => {
//     console.log(res)
//   })

export default createStore({
  state: {
    columns: { currentPage: 0, total: 0, data: {} },
    otherHeight: 0,
    post: { data: {}, total: 0, currentPage: 0, pageSize: 0 },
  },
  actions: {
    async fetchColumns({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      // console.log(params);
      if (state.columns.currentPage <= currentPage) {
        let result = await fetchColumns(currentPage, pageSize)
        commit("fetchColumns", result)
      }
    },
    async fetchColumnDetail({ state, commit }, id) {
      if (!state.columns.data[id]) {
        let result = await fetchColumnDetail(id)
        commit("fetchColumnDetail", result)
      }
    },
    async fetchPosts({ state, commit }, params = {}) {
      const { columnId, currentPage = 1, pageSize = 5 } = params
      // 给结构属性赋值默认值
      let result = await fetchPosts(columnId, currentPage, pageSize)
      console.log(result)
      commit("fetchPosts", result)
    },

    async fetchPost({ state, commit }, id) {
      const currentPost = state.post.data[id]
      if (!currentPost || !currentPost.content) {
        const result = await fetchPost(id)
        commit("fetchPost", result)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    },
  },
  mutations: {
    fetchColumns(state, rawdata) {
      const { data } = state.columns
      const { list, count, currentPage } = rawdata.data
      // console.log(list instanceof Array)
      const arrToobj = (list) => {
        return list.reduce((previousValue, currentValue) => {
          // console.log(previousValue, currentValue)
          if (currentValue._id) {
            previousValue[currentValue._id] = currentValue
            // console.log(currentValue._id)
          }
          return previousValue
        }, {})
      }
      // console.log(arrToobj(list))
      state.columns = {
        data: {
          ...data,
          ...arrToobj(list),
        },
        total: count,
        currentPage: currentPage * 1,
      }
    },
    fetchOtherComponentsHeight(state, rawdata) {
      state.otherHeight = rawdata
    },
    fetchColumnDetail(state, rawdata) {
      state.columns.data[rawdata.data._id] = rawdata.data
    },
    fetchPosts(state, rawdata) {
      const { data } = state.post
      const { list, pageSize, count, currentPage } = rawdata.data
      state.post = {
        data: { ...data, ...list },
        total: count,
        pageSize,
        currentPage,
      }
    },
    fetchPost(state, rawdata) {
      state.post.data[rawdata.data._id] = rawdata.data
    },
  },
  getters: {
    getColumnDetailById: (state) => (id) => {
      return state.columns.data[id] || {}
    },
    getPostById: (state) => (id) => {
      return state.post.data[id] || {}
    },
  },
})
