<template>
  <div class="container">
    <div class="wrapper">
      <img class="demo" src="@/assets/demo/demo-100vh.jpg" />
      <img class="code" src="@/assets/demo/code-100vh.png" />
    </div>

    <div class="wrapper">
      <img class="demo" src="@/assets/demo/demo-set.jpg" />
      <img class="code" src="@/assets/demo/code-set-1.png" />
      <img class="code" src="@/assets/demo/code-set-2.png" />
    </div>

    <div class="wrapper">
      <img class="demo" src="@/assets/demo/demo-100dvh.jpg" />
      <img class="code" src="@/assets/demo/code-100dvh.png" />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 2%;
  background-color: black;
}

.wrapper {
  width: 33.33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
}

.demo {
  width: 45%;
}

.code {
  width: 60%;
  margin-top: 2%;
}
</style>
