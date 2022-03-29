<template>
  <div class="post-detail">
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item active">
          <router-link to="/home">首页</router-link>
        </li>
        <li class="breadcrumb-item active">
          <router-link to="/login">专栏首页</router-link>
        </li>
        <li class="breadcrumb-item">gfdsfsd</li>
      </ol>
    </nav>
    <img src="../assets/狗狗.jpeg" alt="" />
    <h2>看了这么多年美剧，我为什么还是没法摆脱字幕？</h2>
    <p class="space"></p>
    <div class="intro">
      <img src="../assets/滑稽.jpeg" alt="" />
      <!-- <div class="text-intro">
        <p>Maxime_Nienow</p>
        <span>Implemented secondary concept</span>
      </div> -->
      <i>发表于：2020-08-21 19:20:00</i>
    </div>
    <p class="space"></p>
  </div>
</template>

<script>
export default {
  name: "PostDtail",
}
</script>

<style scoped>
.post-detail {
  margin: 1rem auto;
  width: 35%;
}

nav {
  margin-top: 2rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
  padding: 0.8rem 0.8rem 0.002rem 0.8rem;
  --bs-breadcrumb-divider: url(
    &#34;data:image/svg + xml,
    %3Csvgxmlns="http://www.w3.org/2000/svg"width="8"height="8"%3E%3Cpathd="M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z"fill="currentColor"/%3E%3C/svg%3E&#34;
  );
  margin-bottom: 2.5rem;
}
img {
  width: 100%;
  height: 20rem;
  border-radius: 0.3rem;
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 350;
}
.space {
  margin: 0;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1rem;
}
.intro {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.intro img {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
/* .text-intro {
  display: flex;
  flex-direction: column;
} */
</style>
