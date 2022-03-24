<template>
  <div class="column">
    <div class="intro">
      <img src="../assets/滑稽.jpeg" alt="" />
      <h4>Vehicle攻城狮</h4>
      <p>半吊子系统和程序狗，沉迷高端理论，日渐消瘦。</p>
    </div>
    <!-- <hr /> -->
    <p class="space"></p>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    <div class="card mb-4">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="../assets/狗狗.jpeg"
            class="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-grid gap-2 d-xl-flex justify-content-md-center">
      <button class="btn btn-outline-primary" type="button">加载更多</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Column",
}
</script>

<style scoped>
.column > * {
  margin: 0 1rem;
}

.intro {
  margin-bottom: 1.5rem;
}
.space {
  margin: 0;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 2rem;
}
.intro img {
  border-radius: 50%;
  height: 8rem;
  width: 8rem;
  margin-top: 1rem;
  margin-right: 1rem;
  float: left;
}

h4 {
  margin-top: 3rem;
}

p {
  color: #6c757d;
}

.column {
  margin: 1rem auto;
  width: 40%;
  display: flex;
  flex-direction: column;
}

button {
  /* margin: 0; */
  text-align: center;
}
</style>
