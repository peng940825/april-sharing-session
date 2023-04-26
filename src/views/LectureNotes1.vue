<template>
  <div class="container">
    <div class="wrapper">
      <img class="code" src="@/assets/demo/draggable.png" />

      <img class="image" src="@/assets/image/poster.jpg" draggable="true" />
      <!-- <div class="image" draggable="true"></div> -->
    </div>

    <div class="wrapper">
      <img class="code" src="@/assets/demo/noDraggable.png" />

      <div class="image"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  padding-bottom: 2.5%;
  background-color: black;
}

.wrapper {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;
}

.code {
  max-width: 37%;
  margin-bottom: 2.5%;
}

.image {
  width: 37%;
  aspect-ratio: 1 / 1.78;
}

.image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("@/assets/image/poster.jpg");
}
</style>
