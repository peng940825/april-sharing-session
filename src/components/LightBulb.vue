<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="bulb" :style="{ background: props.color }">
    <div class="base" :style="{ borderLeftColor: props.color }"></div>
  </div>
</template>

<style scoped>
.bulb {
  width: 55%;
  height: auto;
  position: relative;
  border-radius: 50%;
  aspect-ratio: 1;
}

.base {
  width: 75%;
  height: 50%;

  position: absolute;
  bottom: -55%;
  left: 12.5%;

  background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.15) 0) 0 50% /
      50% 100%,
    repeating-linear-gradient(90deg, #bbb 0, #bbb, #bbb 20%, #999 20%, #999 40%)
      0 50% / 50% 100%,
    radial-gradient(circle at 50% 50%, #888 25%, transparent 25%);
  background-repeat: no-repeat;

  border: 0.25rem solid transparent;
  border-left: 0.4rem solid;
  border-right: 0 solid transparent;

  transform: rotate(90deg);
}
</style>
