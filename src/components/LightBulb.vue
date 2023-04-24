<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="light">
    <div class="bulb" :style="{ background: props.color }"></div>
    <div class="base" :style="{ borderLeftColor: props.color }"></div>
  </div>
</template>

<style scoped>
.light {
  display: flex;
  align-items: center;
  transform: rotate(90deg);
}

.bulb {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}

.base {
  width: 10rem;
  height: 5rem;
  background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.15) 0) 0 50% /
      50% 100%,
    repeating-linear-gradient(90deg, #bbb 0, #bbb, #bbb 20%, #999 20%, #999 40%)
      0 50% / 50% 100%,
    radial-gradient(circle at 50% 50%, #888 25%, transparent 25%);
  background-repeat: no-repeat;
  border: 0.25rem solid transparent;
  border-left: 0.4rem solid;
  border-right: 0 solid transparent;
  transform: translateX(-7.5%);
}
</style>
