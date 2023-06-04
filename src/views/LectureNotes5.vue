<script setup>
import { reactive } from "vue";

const list = ["123", "132", "213", "231", "312", "321"];

const count = reactive({
  sort: {
    123: 0,
    132: 0,
    213: 0,
    231: 0,
    312: 0,
    321: 0,
  },
  fisherYates: {
    123: 0,
    132: 0,
    213: 0,
    231: 0,
    312: 0,
    321: 0,
  },
});

const runTime = reactive({
  sort: 0,
  fisherYates: 0,
});

const setRunTime = (key, val) => {
  runTime[key] = val;
};

const sortShuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const fisherYatesShuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const shuffleMap = {
  sort: sortShuffle,
  fisherYates: fisherYatesShuffle,
};

const shuffle = (type) => {
  const start = performance.now();

  for (let i = 0; i < 1000000; i++) {
    const arr = [1, 2, 3];
    shuffleMap[type](arr);
    count[type][arr.join("")]++;
  }

  const end = performance.now();
  setRunTime(type, end - start);
};
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <img src="@/assets/demo/sortShuffle.png" />
      <p>Sort</p>
      <p>Time ➡️ {{ runTime["sort"] }}ms</p>
      <div v-for="(item, index) in list" :key="index">
        <p>{{ item }} ➡️ {{ count.sort[item] }}</p>
      </div>
      <p class="rocket" @click="shuffle('sort')">🚀</p>
    </div>

    <div class="wrapper">
      <img src="@/assets/demo/fisherYatesShuffle.png" />
      <p>Fisher-Yates</p>
      <p>Time ➡️ {{ runTime["fisherYates"] }}ms</p>
      <div v-for="(item, index) in list" :key="index">
        <p>{{ item }} ➡️ {{ count.fisherYates[item] }}</p>
      </div>
      <p class="rocket" @click="shuffle('fisherYates')">🚀</p>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

.container {
  width: 100%;
  height: 100%;
  display: flex;
  padding-bottom: 5%;
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

img {
  width: 50%;
  margin-bottom: 2.5%;
}

.rocket {
  cursor: pointer;
}

p {
  color: white;
  font-size: 4vmin;
  font-family: "Acme", sans-serif;
  margin: 4px 0;
}
</style>
