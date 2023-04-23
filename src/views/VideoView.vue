<script setup>
import { ref, onMounted } from "vue";

import videojs from "video.js";

import video from "@/assets/video.mp4";

import "video.js/dist/video-js.min.css";

let videoPlayer = null;

const videoRef = ref(null);

const options = {
  preload: "auto",
  controls: false,
  playsinline: true,
  bigPlayButton: false,
  sources: [
    {
      src: video,
      // src: "https://firebasestorage.googleapis.com/v0/b/juntify-fd26d.appspot.com/o/%E6%88%91%E7%AB%99%E5%9C%A8%E9%9B%B2%E6%9E%97.mp4?alt=media&token=a452977a-07f3-4440-8214-35942f751c54",
      type: "video/mp4",
    },
  ],
};

const onReady = () => {
  console.log("ready");
};

const playVideo = () => {
  videoPlayer.play();
};

onMounted(() => {
  videoPlayer = videojs(videoRef.value, options, onReady);
});
</script>

<template>
  <div class="container">
    <button type="button" @click="playVideo">播放</button>
    <video ref="videoRef" class="video-js"></video>
  </div>
</template>

<style scoped>
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

button {
  width: 64px;
  height: 32px;

  position: absolute;
  top: 32px;
  left: auto;
}
</style>
