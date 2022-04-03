import { createStore } from "vuex"
import http from "../api/http"
import {
  fetchColumns,
  fetchColumnDetail,
  fetchPosts,
  fetchPost,
  createPost,
  deletePost,
  userLogin,
  fetchCurrentUserInformation,
  register,
  modifyUser,
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
    userInformation: { data: {}, isLogin: false },
    token: localStorage.getItem("token") || "",
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
      const { columnId, currentPage = 1, pageSize = 3 } = params
      // 给结构属性赋值默认值
      let result = await fetchPosts(columnId, currentPage, pageSize)
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
    async createPost({ state, commit }, data) {
      let result = await createPost(data)
      commit("createPost", result)
    },
    // async deletePost({ state, commit }, id) {
    //   commit("deletePost", await deletePost(id))
    // },
    async userLogin({ state, commit }, params) {
      let result = await userLogin(params)
      commit("userLogin", result)
    },
    async fetchCurrentUserInformation({ state, commit }) {
      let result = await fetchCurrentUserInformation()
      commit("fetchCurrentUserInformation", result)
    },
    async loginAndfetch({ dispatch }, loginData) {
      return dispatch("userLogin", loginData).then(() => {
        return dispatch("fetchCurrentUserInformation")
      })
    },
    async register({ commit }, params) {
      let result = await register(params)
      commit("register", result)
      console.log(result)
    },
  },
  mutations: {
    fetchColumns(state, rawData) {
      const { data } = state.columns
      const { list, count, currentPage } = rawData.data
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
    fetchOtherComponentsHeight(state, rawData) {
      state.otherHeight = rawData
    },
    fetchColumnDetail(state, rawData) {
      state.columns.data[rawData.data._id] = rawData.data
    },
    fetchPosts(state, rawData) {
      const { data } = state.post
      const { list, pageSize, count, currentPage } = rawData.data
      state.post = {
        data: { ...data, ...list },
        total: count,
        pageSize,
        currentPage,
      }
    },
    fetchPost(state, rawData) {
      state.post.data[rawData.data._id] = rawData.data
    },
    createPost(state, newPost) {
      state.post.data[newPost._id] = newPost
    },
    userLogin(state, rawData) {
      state.token = rawData.data.token
      http.defaults.headers.common.Authorization = `Bearer ${rawData.data.token}`
      localStorage.setItem("token", rawData.data.token)
      console.log("登录成功!")
    },
    fetchCurrentUserInformation(state, rawData) {
      state.userInformation = {
        isLogin: true,
        data: rawData.data,
      }
    },
    register(state, rawData) {},
    userLogout(state) {
      state.token = ""
      state.userInformation = { isLogin: false }
      localStorage.removeItem("token")
      delete http.defaults.headers.common.Authorization
    },
  },
  getters: {
    // getters这里要备用一个{}因为可能出现数据还没返回就读取的情况
    getColumnDetailById: (state) => (id) => {
      return state.columns.data[id] || {}
    },
    getPostById: (state) => (id) => {
      return state.post.data[id] || {}
    },
  },
})
