<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <button type="button" :class="['retro-button', props.type]">
    {{ props.text }}
  </button>
</template>

<style scoped>
.retro-button {
  width: 320px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  color: white;
  font-size: 30px;
}

.retro-button:before,
.retro-button:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
}

.retro-button:before {
  top: -6px;
  left: 0;
  border-top: 6px solid black;
  border-bottom: 6px solid black;
}

.retro-button:after {
  top: 0;
  left: -6px;
  border-left: 6px solid black;
  border-right: 6px solid black;
}

/* ✅ start */

.start {
  background: #92cd41;
  box-shadow: inset -4px -4px 0px 0px #4aa52e;
}

.start:hover,
.start:focus {
  background: #76c442;
  box-shadow: inset -6px -6px 0px 0px #4aa52e;
}

.start:active {
  box-shadow: inset 4px 4px 0px 0px #4aa52e;
}

/* ✅ click me */

.click-me {
  background: #f7d51d;
  box-shadow: inset -4px -4px 0px 0px #e59400;
}

.click-me:hover,
.click-me:focus {
  background: #f2c409;
  box-shadow: inset -6px -6px 0px 0px #e59400;
}

.click-me:active {
  box-shadow: inset 4px 4px 0px 0px #e59400;
}

/* ✅ restart */

.restart {
  background: #3b82f6;
  box-shadow: inset -4px -4px 0px 0px #1e40af;
}

.restart:hover,
.restart:focus {
  background: #3b82f6;
  box-shadow: inset -6px -6px 0px 0px #1e40af;
}

.restart:active {
  box-shadow: inset 4px 4px 0px 0px #1e40af;
}
</style>
