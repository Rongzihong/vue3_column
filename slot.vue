<template>
  <son>
    <template #header>
      <!-- 父组件向子组件传递的东西~ -->
    </template>
    <template #default>
      <!-- 这个就是默认插槽~ -->
      <p>A paragraph fro the main content.</p>
    </template>
    <template #footer>
      <p>Here is some contact infomation</p>
    </template>
    <!-- <template #[]>
      这个就是动态插槽名
    </template> -->
  </son>
</template>

<script>
export default {}
</script>

<style></style>
