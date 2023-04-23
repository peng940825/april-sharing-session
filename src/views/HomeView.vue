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
  <p>{{ innerWidth }}, {{ innerHeight }}</p>
  <p>{{ outerWidth }}, {{ outerHeight }}</p>
</template>
