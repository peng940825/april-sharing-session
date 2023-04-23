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

const format = (num) => {
  return num < 10 ? `0${num}` : num;
};

const splitTime = computed(() => {
  const min = format(parseInt(props.second / 60));
  const sec = format(min > 0 ? props.second - min * 60 : props.second);
  const ms = format(props.millisecond);
  return `${min}:${sec}.${ms}`.split("");
});
</script>

<template>
  <div class="time-line">
    <span v-for="(char, idx) in splitTime" :key="idx">{{ char }}</span>
  </div>
</template>

<style scoped>
.time-line {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
}

span {
  margin-right: 8px;
}

span:last-of-type {
  margin-right: 0;
}

span:nth-of-type(3),
span:nth-of-type(6) {
  color: white;
}

span:nth-of-type(1),
span:nth-of-type(2),
span:nth-of-type(4),
span:nth-of-type(5),
span:nth-of-type(7),
span:nth-of-type(8) {
  padding: 8px;
  border-radius: 4px;
  background-color: white;
}
</style>
