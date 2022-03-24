import axios from "axios";
import nprogress from "nprogress"
import "nprogress/nprogress.css"

const http = axios.create({
  baseURL: "/api",
  timeout: 10000,
})

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

http.interceptors.request.use(config => {
  nprogress.start()
  return config
})

http.interceptors.response.use(res => {
  nprogress.done()
  return res.data
}, err => {
  return Promise.reject(err)
})



export default http