<script setup>
import { ref } from "vue";

const showHoldImage = ref(false);

const diff = ref({
  top: 0,
  left: 0,
});

const holdImagePos = ref({
  top: 0,
  left: 0,
});

const setShowHoldImage = (val) => {
  showHoldImage.value = val;
};

const setDiff = (top, left) => {
  diff.value.top = top;
  diff.value.left = left;
};

const setHoldImagePos = (top, left) => {
  holdImagePos.value.top = top;
  holdImagePos.value.left = left;
};

const onMouseDown = (e) => {
  const [x, y] = [e.clientX, e.clientY];
  const bound = document.querySelector(".image").getBoundingClientRect();

  if (
    y >= bound.top &&
    y <= bound.bottom &&
    x >= bound.left &&
    x <= bound.right
  ) {
    const diffY = y - bound.top;
    const top = y - diffY;
    const diffX = x - bound.left;
    const left = x - diffX;
    setHoldImagePos(top, left);
    setDiff(diffY, diffX);
    setShowHoldImage(true);

    // setHoldImagePos(y, x);
    // setShowHoldImage(true);
  }
};

const onMouseMove = (e) => {
  const [x, y] = [e.clientX, e.clientY];

  if (showHoldImage.value) {
    const top = y - diff.value.top;
    const left = x - diff.value.left;
    setHoldImagePos(top, left);

    // setHoldImagePos(y, x);
  }
};

const onMouseUp = () => {
  setShowHoldImage(false);
  setHoldImagePos(0, 0);
  setDiff(0, 0);
};
</script>

<template>
  <div
    class="container"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
  >
    <img class="omg" src="@/assets/demo/omg.jpg" />

    <div class="image"></div>

    <div
      v-show="showHoldImage"
      class="hold-image"
      :style="{ top: `${holdImagePos.top}px`, left: `${holdImagePos.left}px` }"
    ></div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}

.omg {
  width: 21%;
  position: absolute;
  top: 2%;
  left: 1%;
}

.image,
.hold-image {
  height: 75%;
  aspect-ratio: 1 / 1.78;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.image {
  background-image: url("@/assets/image/poster.jpg");
}

.hold-image {
  position: absolute;
  background-image: url("@/assets/demo/helen.jpg");
}
</style>
