<script setup>
import { ref } from "vue";

const boxRef = ref(null);

const trackRef = ref(null);

const lineXRef = ref(null);

const lineYRef = ref(null);

const trackPos = ref({
  top: 0,
  left: 0,
});

const hoverTarget = ref({
  box: false,
  lineX: false,
  lineY: false,
});

const setTrackPos = (top, left) => {
  trackPos.value.top = top;
  trackPos.value.left = left;
};

const setHoverTarget = (key, val) => {
  hoverTarget.value[key] = val;
};

const onMouseMove = (e) => {
  const [y, x] = [e.clientY, e.clientX];
  setTrackPos(y, x);

  const lineYPos = lineYRef.value.getBoundingClientRect();
  if (x >= lineYPos.left && x <= lineYPos.right) {
    setHoverTarget("lineY", true);
  } else {
    setHoverTarget("lineY", false);
  }

  const lineXPos = lineXRef.value.getBoundingClientRect();
  if (y >= lineXPos.top && y <= lineXPos.bottom) {
    setHoverTarget("lineX", true);
  } else {
    setHoverTarget("lineX", false);
  }

  const boxPos = boxRef.value.getBoundingClientRect();
  if (
    y >= boxPos.top &&
    y <= boxPos.bottom &&
    x >= boxPos.left &&
    x <= boxPos.right
  ) {
    setHoverTarget("box", true);
  } else {
    setHoverTarget("box", false);
  }
};
</script>

<template>
  <div class="container" @mousemove="onMouseMove">
    <!-- box -->
    <div
      ref="boxRef"
      class="box"
      :style="{ background: hoverTarget.box ? '#be185d' : '#1b1b1b' }"
    ></div>

    <!-- px -->
    <p v-for="num in 4" :key="num" class="px">200px</p>

    <!-- line -->
    <div
      ref="lineXRef"
      class="line-x"
      :style="{ background: hoverTarget.lineX ? '#1d4ed8' : '' }"
    ></div>
    <div
      ref="lineYRef"
      class="line-y"
      :style="{ background: hoverTarget.lineY ? '#047857' : '' }"
    ></div>

    <!-- track -->
    <div
      ref="trackRef"
      class="track"
      :style="{
        top: `${trackPos.top - 8}px`,
        left: `${trackPos.left - 8}px`,
      }"
    >
      <div class="pos-area">
        <span class="pos-x">X:{{ trackPos.left }}</span>
        <span class="pos-y">Y:{{ trackPos.top }}</span>
      </div>
    </div>

    <!-- magnifier -->
    <div class="magnifier">
      <p class="magnifier-text">X:{{ trackPos.left }}</p>
      <p class="magnifier-text">Y:{{ trackPos.top }}</p>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.box {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 200px;
  left: 200px;
  z-index: 3;
}

.px {
  position: absolute;
  margin: 0;
  z-index: 21;
}

.px:nth-of-type(1) {
  top: 90px;
  left: 410px;
}

.px:nth-of-type(2) {
  top: 290px;
  left: 410px;
}

.px:nth-of-type(3) {
  top: 410px;
  left: 275px;
}

.px:nth-of-type(4) {
  top: 410px;
  left: 75px;
}

.line-x {
  width: 100%;
  height: 200px;
  position: absolute;
  top: 200px;
  left: 0;
  border-top: 1px solid #1b1b1b;
  border-bottom: 1px solid #1b1b1b;
}

.line-y {
  width: 200px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 200px;
  border-left: 1px solid #1b1b1b;
  border-right: 1px solid #1b1b1b;
}

.track {
  width: 16px;
  height: 16px;
  position: absolute;
  border-radius: 50%;
  background-color: #c2410c;
  z-index: 7;
}

.pos-area {
  position: relative;
}

.pos-x,
.pos-y {
  font-size: 12px;
  position: absolute;
}

.pos-x {
  top: -8px;
  left: 24px;
}

.pos-y {
  top: 8px;
  left: 24px;
}

.magnifier {
  width: 20%;
  aspect-ratio: 1;
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
}

.magnifier-text {
  color: white;
  font-size: 10vmin;
  font-family: "Acme", sans-serif;
  margin: 0;
}
</style>
