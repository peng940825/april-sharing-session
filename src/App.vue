<script setup>
import { onMounted } from "vue";

const setDocVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onMounted(() => {
  setDocVh();
  window.addEventListener("resize", setDocVh);
});
</script>

<template>
  <RouterView />
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  overflow: hidden;
}
</style>
