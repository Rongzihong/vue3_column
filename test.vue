<template>
  <div class="pop-message" :style="style[type]" v-show="visible">
    <i class="icon" :class="[style[type].icon]"></i>
    <span class="text"> {{ str }}</span>
  </div>
</template>
<script setup>
import { onMounted, defineProps } from "vue"

const prop = defineProps({
  type: {
    type: String,
    default: "success",
  },
  str: {
    type: String,
    default: "登录成功",
  },
})

const style = {
  warn: {
    // icon: "icon-warning",
    color: "#E6A23C",
    backgroundColor: "rgb(253, 246, 236)",
    borderColor: "rgb(250, 236, 216)",
  },
  error: {
    // icon: "icon-shanchu",
    color: "#F56C6C",
    backgroundColor: "rgb(254, 240, 240)",
    borderColor: "rgb(253, 226, 226)",
  },
  success: {
    // icon: "icon-queren2",
    color: "#67C23A",
    backgroundColor: "rgb(240, 249, 235)",
    borderColor: "rgb(225, 243, 216)",
  },
}
const visible = ref(false)
</script>
