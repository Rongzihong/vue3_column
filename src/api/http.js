import axios from "axios"
// import nprogress from "nprogress"
// import "nprogress/nprogress.css"
import store from "../store"

const http = axios.create({
  baseURL: "/api",
  timeout: 10000,
})

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

http.interceptors.request.use((config) => {
  // nprogress.start()
  store.commit("setLoading", true)
  return config
})

http.interceptors.response.use(
  (res) => {
    // nprogress.done()
    store.commit("setLoading", false)
    return res.data
  },
  (err) => {
    store.commit("setLoading", false)
    return Promise.reject(err)
  }
)

export default http
