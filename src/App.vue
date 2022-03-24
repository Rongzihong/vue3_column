<template>
  <Header ref="headerRef" />
  <router-view></router-view>
  <Footer ref="footerRef" />
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"

import { onMounted, ref } from "vue"
import { useStore } from "vuex"
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup() {
    let store = useStore()

    const headerRef = ref("null")
    const footerRef = ref("null")
    onMounted(() => {
      const otherHeight =
        headerRef.value.$el.clientHeight + footerRef.value.$el.clientHeight

      store.commit("fetchOtherComponentsHeight", otherHeight)
    })

    return { headerRef, footerRef }
  },
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
