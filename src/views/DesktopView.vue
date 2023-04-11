<script setup>
import { ref } from "vue";

import image1 from "@/assets/helen0.jpg";
import image2 from "@/assets/helen1.jpg";
import image3 from "@/assets/helen2.jpg";
import image4 from "@/assets/helen3.jpg";
import image5 from "@/assets/helen4.jpg";

const data = ref([
  {
    key: 0,
    src: image1,
  },
  {
    key: 1,
    src: image2,
  },
  {
    key: 2,
    src: image3,
  },
  {
    key: 3,
    src: image4,
  },
  {
    key: 4,
    src: image5,
  },
]);

const onDragStart = (e) => {
  e.target.className += " hold";
};

const onDragEnter = (e) => {
  // e.preventDefault();

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

const onDrop = () => {
  console.log("pass =>", checkPass());
  console.log(
    "new data =>",
    data.value.map((item) => item.key)
  );
};

const onDragEnd = (e) => {
  e.target.className = "image";
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
    <div
      v-for="item in data"
      :key="item.key"
      :data-key="item.key"
      class="image"
      draggable="true"
      @dragstart="onDragStart"
      @dragenter="onDragEnter"
      @dragover="onDragOver"
      @drop="onDrop"
      @dragend="onDragEnd"
      :style="{ backgroundImage: `url(${item.src})` }"
    ></div>
  </div>
</template>

<style scoped>
.information {
  height: 12.5%;

  background-color: yellow;
}

.gaming-zone {
  height: 87.5%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: blue;
}

.image {
  width: 240px;
  height: 240px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  cursor: move;
  margin-right: 16px;
  border-radius: 8px;
}

.image:last-of-type {
  margin-right: 0;
}
</style>
