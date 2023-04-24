<script setup>
import { ref } from "vue";

import poster from "@/assets/image/poster.jpg";

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
      <!-- <img class="image" :src="poster" /> -->

      <div
        class="box"
        draggable="true"
        @dragstart="onDargStart"
        @drag="onDrag"
        @dragenter="onDragEnter"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        @dragend="onDragEnd"
        :style="{ backgroundImage: `url(${poster})` }"
      ></div>
    </div>

    <div class="bottom">
      <div v-for="item in data" :key="item" class="wrapper">
        <LightBulbVue :color="item.open ? item.color : 'white'" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

.container {
  width: 100%;
  height: 100%;
  position: relative;
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
  width: 300px;
  border-radius: 8px;
  cursor: move;
}

.box {
  width: 300px;
  height: 75%;
  background-color: cadetblue;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  cursor: move;
}

.wrapper {
  width: 16.67%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  color: white;
  font-size: 64px;
  font-family: "Acme", sans-serif;
}
</style>
