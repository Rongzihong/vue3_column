import { createStore } from "vuex"
import { fetchColumns, fetchColumnDetail } from "../api/index"

// 测试数据
// import http from "../api/http"
// // http.get('/columns?currentPage=1&pageSize=6').then(res => {
// //   console.log(res)
// // })
// http.get("/columns/5f3e86d62c56ee13bb83096b").then((res) => {
//   console.log(res)
// })

export default createStore({
  state: {
    columns: { currentPage: 0 },
    otherHeight: 0,
    columnDetailObjecct: {},
  },
  actions: {
    async fetchColumns({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      if (state.columns.currentPage < currentPage) {
        let result = await fetchColumns(currentPage, pageSize)
        commit("fetchColumns", result.data) 
      }
    },
    async fetchColumnDetail({ commit }, id) {
      // if (!state.columns.data[id]) {
      //   let result = await fetchColumnDetail(id)
      //   commit(fetchColumnDetail, result.data)
      //   console.log(result.data);
      // }
      let result = await fetchColumnDetail(id)
      commit("fetchColumnDetail", result.data)
    },
  },
  mutations: {
    fetchColumns(state, rawDate) {
      // const { data } = state.columns
      // const { list, count, currentPage } = rawDate.data
      // state.columns = {
      //   data: { ...data, ...list },
      //   total: count,
      //   currentPage: currentPage + 1
      // }
      state.columns = rawDate
    },
    fetchOtherComponentsHeight(state, rawDate) {
      state.otherHeight = rawDate
    },
    // fetchColumnDetail(state, rawDate) {
    //   state.columnDetail = rawDate
    // },
    fetchColumnDetail(state, rawDate) {
      state.columnDetailObjecct = rawDate
    },
  },
  getters: {},
})
