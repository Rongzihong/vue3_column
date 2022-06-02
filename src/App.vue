<template>
  <Header ref="headerRef" />
  <router-view></router-view>
  <loader
    v-if="isLoading"
    text="拼命加载中"
    background="rgba(0, 0, 0, 0.8)"
  ></loader>
  <Footer ref="footerRef" />
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import Footer from "./components/Footer.vue"
import Header from "./components/Header.vue"
import Loader from "./base/Loader.vue"

import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Loader,
  },
  setup() {
    let store = useStore()
    const isLoading = computed(() => store.state.loading)
    const headerRef = ref("null")
    const footerRef = ref("null")
    onMounted(() => {
      console.log(isLoading.value)
      const otherHeight =
        headerRef.value.$el.clientHeight + footerRef.value.$el.clientHeight

      store.commit("fetchOtherComponentsHeight", otherHeight)
    })

    return { headerRef, footerRef, isLoading }
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
