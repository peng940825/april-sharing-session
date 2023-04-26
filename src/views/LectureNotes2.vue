<script setup>
import { ref } from "vue";

import LightBulbVue from "@/components/LightBulb.vue";

const data = ref([
  {
    name: "Start",
    color: "#FF0000",
    open: false,
  },
  {
    name: "Drag",
    color: "#FF7D00",
    open: false,
  },
  {
    name: "Enter",
    color: "#FFFF00",
    open: false,
  },
  {
    name: "Over",
    color: "#00FF00",
    open: false,
  },
  {
    name: "Leave",
    color: "#0000FF",
    open: false,
  },
  {
    name: "Drop",
    color: "#00FFFF",
    open: false,
  },
  {
    name: "End",
    color: "#FF00FF",
    open: false,
  },
]);

const setOpen = (key, bol) => {
  data.value.find((item) => item.name === key).open = bol;
};

const sleep = (time) => {
  return new Promise((res) => setTimeout(() => res(time), time));
};

const onDargStart = () => {
  setOpen("Start", true);
  console.log("Start");
};

const onDrag = async () => {
  setOpen("Drag", true);
  await sleep(50);
  setOpen("Drag", false);
  console.log("Drag");
};

const onDragEnter = () => {
  setOpen("Enter", true);
  console.log("Enter");
};

const onDragOver = async (e) => {
  e.preventDefault();
  setOpen("Over", true);
  await sleep(50);
  setOpen("Over", false);
  console.log("Over");
};

const onDragLeave = () => {
  setOpen("Leave", true);
  console.log("Leave");
};

const onDrop = () => {
  setOpen("Drop", true);
  console.log("Drop");
};

const onDragEnd = () => {
  setOpen("End", true);
  console.log("End");
};
</script>

<template>
  <div class="container">
    <div class="top">
      <div
        class="image"
        draggable="true"
        @dragstart="onDargStart"
        @drag="onDrag"
        @dragenter="onDragEnter"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        @dragend="onDragEnd"
      ></div>
    </div>

    <div class="bottom">
      <div v-for="item in data" :key="item" class="bulb-wrapper">
        <LightBulbVue :color="item.open ? item.color : 'white'" />
        <p :style="{ color: item.open ? item.color : 'white' }">
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

.container {
  width: 100%;
  height: 100%;
  background-color: black;
}

.top,
.bottom {
  width: 100%;
  height: 50%;
  display: flex;
}

.top {
  align-items: center;
  justify-content: center;
}

.image {
  height: 90%;
  aspect-ratio: 1 / 1.78;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("@/assets/image/poster.jpg");
}

.bulb-wrapper {
  width: 14.285%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}

p {
  color: white;
  font-size: 5vmin;
  font-family: "Acme", sans-serif;
  margin: 0;
}
</style>
