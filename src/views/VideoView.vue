<template>
  <div class="container">
    <video
      ref="videoRef"
      class="video"
      src="@/assets/video.mp4"
      preload="auto"
      controls
    ></video>
  </div>
</template>

<style>
.container {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

video {
  width: 300px;
  height: 540px;
}
</style>
