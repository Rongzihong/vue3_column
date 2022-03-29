import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./router"
import store from "./store"
import dayjs from "dayjs"

const app = createApp(App)
app.use(router)
app.use(store)
app.use(dayjs)
app.mount("#app")
