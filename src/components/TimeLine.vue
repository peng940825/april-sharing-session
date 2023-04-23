<script setup>
import { computed } from "vue";

const props = defineProps({
  second: {
    type: Number,
    default: 0,
  },
  millisecond: {
    type: Number,
    default: 0,
  },
});

const format = (num) => (num < 10 ? `0${num}` : num);

const prettierTime = computed(() => {
  const min = format(parseInt(props.second / 60));
  const sec = format(min > 0 ? props.second - min * 60 : props.second);
  const ms = format(props.millisecond);
  return `${min}:${sec}.${ms}`;
});
</script>

<template>
  <p>{{ prettierTime }}</p>
</template>

<style scoped>
p {
  color: white;

  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
