<script setup>
import { ref, onMounted } from "vue";

const innerWidth = ref(null);
const innerHeight = ref(null);

const outerWidth = ref(null);
const outerHeight = ref(null);

onMounted(() => {
  innerWidth.value = window.innerWidth;
  innerHeight.value = window.innerHeight;

  outerWidth.value = window.outerWidth;
  outerHeight.value = window.outerHeight;
});
</script>

<template>
  <p>Home View</p>
  <p>Jun</p>
  <p>{{ innerWidth }}, {{ innerHeight }}</p>
  <p>{{ outerWidth }}, {{ outerHeight }}</p>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display&display=swap");

p {
  font-size: 48px;
  font-family: "Sedgwick Ave Display", cursive;
  text-align: center;
}
</style>
