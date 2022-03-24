import { createStore } from "vuex"
import { fetchColumns } from "../api/index"

// 测试数据
// import http from "../api/http"
// http.get('/columns?currentPage=1&pageSize=6').then(res => {
//   console.log(res)
// })

export default createStore({
  state: {
    columns: { currentPage: 0 },
    otherHeight: 0,
  },
  actions: {
    async fetchColumns({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params
      if (state.columns.currentPage < currentPage) {
        let result = await fetchColumns(currentPage, pageSize)
        commit("fetchColumns", result.data)
      }
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
  },
  getters: {},
})
