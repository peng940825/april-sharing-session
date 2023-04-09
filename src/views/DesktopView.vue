<script setup>
import { ref } from "vue";

const data = ref([
  {
    key: 0,
    src: "/src/assets/helen0.jpg",
  },
  {
    key: 1,
    src: "/src/assets/helen1.jpg",
  },
  {
    key: 2,
    src: "/src/assets/helen2.jpg",
  },
  {
    key: 3,
    src: "/src/assets/helen3.jpg",
  },
  {
    key: 4,
    src: "/src/assets/helen4.jpg",
  },
]);

const onDragStart = (e) => {
  e.target.className += " hold";
};

const onDragEnter = (e) => {
  e.preventDefault();

  const holdDom = document.querySelector(".hold");
  const holdIdx = +holdDom.dataset.key;

  const enterIdx = +e.target.dataset.key;
  const enterDom = document.querySelector(`[data-key="${enterIdx}"]`);

  [data.value[holdIdx], data.value[enterIdx]] = [
    data.value[enterIdx],
    data.value[holdIdx],
  ];

  [[holdDom.dataset.key], [enterDom.dataset.key]] = [
    [enterDom.dataset.key],
    [holdDom.dataset.key],
  ];
};

const onDragOver = (e) => {
  e.preventDefault();
};

const onDragLeave = () => {};

const onDrop = () => {
  console.log(data.value.map((item) => item.key));
};

const onDragEnd = (e) => {
  e.target.className = "image";

  console.log(checkPass());
};

const checkPass = () => {
  let res = true;
  data.value.reduce((acc, cur) => {
    if (acc.key >= cur.key) res = false;
    return cur;
  });
  return res;
};
</script>

<template>
  <div class="information"></div>

  <div class="gaming-zone">
    <div v-for="item in data" :key="item.key" class="wrapper">
      <div
        class="image"
        draggable="true"
        :data-key="item.key"
        @dragstart="onDragStart"
        @dragenter="onDragEnter"
        @dragover="onDragOver"
        @drop="onDrop"
        @dragend="onDragEnd"
        @dragleave="onDragLeave"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchEnd="onTouchEnd"
        :style="{ backgroundImage: `url(${item.src})` }"
      ></div>
    </div>

    <!-- <video src="/src/assets/video1.mp4" type="video/mp4" muted autoplay></video> -->
  </div>
</template>

<style scoped>
.information {
  width: 100%;
  height: 12.5%;
  background-color: yellow;
}

.gaming-zone {
  width: 100%;
  height: 87.5%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: blue;
}

.wrapper {
  width: 240px;
  height: 240px;
  position: relative;
  margin-right: 16px;
}

.wrapper:last-of-type {
  margin-right: 0;
}

.image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: move;
}

video {
  width: 95%;
  height: 95%;
}
</style>
