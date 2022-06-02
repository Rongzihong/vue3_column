import { onMounted, onUnmounted } from "vue"

export default (nodeId) => {
  const node = document.createElement("div")
  node.id = nodeId
  document.body.appendChild(node)
  onUnmounted(() => {
    document.body.removeChild(node)
  })
}
