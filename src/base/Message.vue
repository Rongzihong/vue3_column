<template>
  <transition name="slide-fade">
    <div class="message-container">
      <div class="message-content">
        <div class="message-icon" v-if="config.icon">
          <i class="config icon"></i>
        </div>
        <span v-text="config.content"></span>
        <div class="option" v-if="!config.close">
          <i class="ri-close-fill" @click="onClose"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { toRefs, reactive, toRef } from "vue"
export default {
  props: {
    config: { type: Object, default: () => {} },
    remove: { type: Function, default: () => {} },
  },
  setup(props) {
    const state = reactive({
      visibled: false,
    })

    const onOpen = (config) => {
      setTimeout(() => {
        state.visibled = true
      }, 10)
    }
    if (config.duration !== 0) {
      setTimeout(() => {
        onclose()
      }, config.duration)
    }
    onOpen(props.config)

    const onClose = () => {
      state.visibled = false
      setTimeout(() => {
        props.remove()
      }, 200)
    }
    return {
      ...toRefs(state),
      onOpen,
      onClose,
    }
  },
}
</script>

<style>
.message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  z-index: 9999;
  transform: translateZ(9999px);
  padding-top: 28px;
  transition: top 0.4s ease;
}

.message-container {
  margin-bottom: 14px;
}

.message-icon {
  display: inline-block;
}

i {
  font-size: 18px;
  font-weight: 400;
  margin-top: -3px;
  margin-right: 6px;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
}
.ri-checkbox-circle-fill {
  color: #58c05b;
}
.ri-close-circle-fill {
  color: #fd4f4d;
}

.message-content {
  display: inline-block;
  padding: 4px 18px;
  height: 34px;
  text-align: left;
  line-height: 34px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
  color: #595959;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #ffffff;
}
.option {
  display: inline-block;
  pointer-events: all;
  margin-left: 18px;
}

.option i {
  font-size: 18px;
  font-weight: 400;
  margin-top: -3px;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  cursor: pointer;
  color: #d9d9d9;
  transition: color 0.2s ease;
}

.option:hover {
  color: #ff7c75;
  transition: color 0.2s ease;
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
