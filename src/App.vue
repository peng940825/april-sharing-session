<script setup>
import { onMounted } from "vue";

const setDocumentVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onMounted(() => {
  setDocumentVh();
  window.addEventListener("resize", setDocumentVh);
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
  background-color: #082f49;
}

#app {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  position: relative;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}
</style>
